
> 策略名称

RecordsCollecter  (升级提供自定义数据源功能)

> 策略作者

小小梦

> 策略描述

相关文章：https://www.fmz.com/bbs-topic/5569

> 策略参数



|参数|默认值|描述|
|----|----|----|
|dropNames|[]|删除表的名称|


> 源码 (python)

``` python
import _thread
import pymongo
import json
import math
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

def url2Dict(url):
    query = urlparse(url).query  
    params = parse_qs(query)  
    result = {key: params[key][0] for key in params}  
    return result

class Provider(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()

            dictParam = url2Dict(self.path)
            Log("自定义数据源服务接收到请求，self.path:", self.path, "query 参数：", dictParam)
            
            # 目前回测系统只能从列表中选择交易所名称，在添加自定义数据源时，设置为币安，即：Binance
            exName = exchange.GetName()                                     
            # 注意，period为底层K线周期
            tabName = "%s_%s" % ("records", int(int(dictParam["period"]) / 1000))  
            priceRatio = math.pow(10, int(dictParam["round"]))
            amountRatio = math.pow(10, int(dictParam["vround"]))
            fromTS = int(dictParam["from"]) * int(1000)
            toTS = int(dictParam["to"]) * int(1000)
            
            
            # 连接数据库
            Log("连接数据库服务，获取数据，数据库：", exName, "表：", tabName)
            myDBClient = pymongo.MongoClient("mongodb://localhost:27017")
            ex_DB = myDBClient[exName]
            exRecords = ex_DB[tabName]
            
            
            # 要求应答的数据
            data = {
                "schema" : ["time", "open", "high", "low", "close", "vol"],
                "data" : []
            }
            
            # 构造查询条件：大于某个值{'age': {'$gt': 20}} 小于某个值{'age': {'$lt': 20}}
            dbQuery = {"$and":[{'Time': {'$gt': fromTS}}, {'Time': {'$lt': toTS}}]}
            Log("查询条件：", dbQuery, "查询条数：", exRecords.find(dbQuery).count(), "数据库总条数：", exRecords.find().count())
            
            for x in exRecords.find(dbQuery).sort("Time"):
                # 需要根据请求参数round和vround，处理数据精度
                bar = [x["Time"], int(x["Open"] * priceRatio), int(x["High"] * priceRatio), int(x["Low"] * priceRatio), int(x["Close"] * priceRatio), int(x["Volume"] * amountRatio)]
                data["data"].append(bar)
            
            Log("数据：", data, "响应回测系统请求。")
            # 写入数据应答
            self.wfile.write(json.dumps(data).encode())
        except BaseException as e:
            Log("Provider do_GET error, e:", e)


def createServer(host):
    try:
        server = HTTPServer(host, Provider)
        Log("Starting server, listen at: %s:%s" % host)
        server.serve_forever()
    except BaseException as e:
        Log("createServer error, e:", e)
        raise Exception("stop")

def main():
    LogReset(1)
    exName = exchange.GetName()
    period = exchange.GetPeriod()
    Log("收集", exName, "交易所的K线数据，", "K线周期:", period, "秒")
    
    # 连接数据库服务，服务地址 mongodb://127.0.0.1:27017 具体看服务器上安装的mongodb设置
    Log("连接托管者所在设备mongodb服务，mongodb://localhost:27017")
    myDBClient = pymongo.MongoClient("mongodb://localhost:27017")   
    # 创建数据库
    ex_DB = myDBClient[exName]
    
    # 打印目前数据库表
    collist = ex_DB.list_collection_names()
    Log("mongodb ", exName, " collist:", collist)
    
    # 检测是否删除表
    arrDropNames = json.loads(dropNames)
    if isinstance(arrDropNames, list):
        for i in range(len(arrDropNames)):
            dropName = arrDropNames[i]
            if isinstance(dropName, str):
                if not dropName in collist:
                    continue
                tab = ex_DB[dropName]
                Log("dropName:", dropName, "删除：", dropName)
                ret = tab.drop()
                collist = ex_DB.list_collection_names()
                if dropName in collist:
                    Log(dropName, "删除失败")
                else :
                    Log(dropName, "删除成功")
    
    # 开启一个线程，提供自定义数据源服务
    try:
        # _thread.start_new_thread(createServer, (("localhost", 9090), ))     # 本机测试
        _thread.start_new_thread(createServer, (("0.0.0.0", 9090), ))         # VPS服务器上测试
        Log("开启自定义数据源服务线程", "#FF0000")
    except BaseException as e:
        Log("启动自定义数据源服务失败！")
        Log("错误信息：", e)
        raise Exception("stop")
    
    # 创建records表
    ex_DB_Records = ex_DB["%s_%d" % ("records", period)]
    Log("开始收集", exName, "K线数据", "周期：", period, "打开（创建）数据库表：", "%s_%d" % ("records", period), "#FF0000")
    preBarTime = 0
    index = 1
    while True:
        r = _C(exchange.GetRecords)
        if len(r) < 2:
            Sleep(1000)
            continue
        if preBarTime == 0:
            # 首次写入所有BAR数据
            for i in range(len(r) - 1):
                bar = r[i]
                # 逐根写入，需要判断当前数据库表中是否已经有该条数据，基于时间戳检测，如果有该条数据，则跳过，没有则写入
                retQuery = ex_DB_Records.find({"Time": bar["Time"]})
                if retQuery.count() > 0:
                    continue
                
                # 写入bar到数据库表
                ex_DB_Records.insert_one({"High": bar["High"], "Low": bar["Low"], "Open": bar["Open"], "Close": bar["Close"], "Time": bar["Time"], "Volume": bar["Volume"]})                
                index += 1
            preBarTime = r[-1]["Time"]
        elif preBarTime != r[-1]["Time"]:
            bar = r[-2]
            # 写入数据前检测，数据是否已经存在，基于时间戳检测
            retQuery = ex_DB_Records.find({"Time": bar["Time"]})
            if retQuery.count() > 0:
                continue
            
            ex_DB_Records.insert_one({"High": bar["High"], "Low": bar["Low"], "Open": bar["Open"], "Close": bar["Close"], "Time": bar["Time"], "Volume": bar["Volume"]})
            index += 1
            preBarTime = r[-1]["Time"]
        LogStatus(_D(), "preBarTime:", preBarTime, "_D(preBarTime):", _D(preBarTime/1000), "index:", index)
        # 增加画图展示
        ext.PlotRecords(r, "%s_%d" % ("records", period))
        Sleep(10000)
        

```

> 策略出处

https://www.fmz.com/strategy/205143

> 更新时间

2020-05-09 15:58:04
