
> 策略名称

RecordsCollecter  (教学)

> 策略作者

小小梦

> 策略描述

相关文章：https://www.fmz.com/bbs-topic/5425

> 策略参数



|参数|默认值|描述|
|----|----|----|
|dropNames|[]|删除表的名称|


> 源码 (python)

``` python
import pymongo
import json

def main():
    Log("测试数据收集")
    
    # 连接数据库服务
    myDBClient = pymongo.MongoClient("mongodb://localhost:27017")   # mongodb://127.0.0.1:27017
    # 创建数据库
    huobi_DB = myDBClient["huobi"]
    
    # 打印目前数据库表
    collist = huobi_DB.list_collection_names()
    Log("collist:", collist)
    
    # 检测是否删除表
    arrDropNames = json.loads(dropNames)
    if isinstance(arrDropNames, list):
        for i in range(len(arrDropNames)):
            dropName = arrDropNames[i]
            if isinstance(dropName, str):
                if not dropName in collist:
                    continue
                tab = huobi_DB[dropName]
                Log("dropName:", dropName, "删除：", dropName)
                ret = tab.drop()
                collist = huobi_DB.list_collection_names()
                if dropName in collist:
                    Log(dropName, "删除失败")
                else :
                    Log(dropName, "删除成功")
    
    # 创建records表
    huobi_DB_Records = huobi_DB["records"]
    
    # 请求数据
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
                # 逐根写入
                bar = r[i]
                huobi_DB_Records.insert_one({"index": index, "High": bar["High"], "Low": bar["Low"], "Open": bar["Open"], "Close": bar["Close"], "Time": bar["Time"], "Volume": bar["Volume"]})                
                index += 1
            preBarTime = r[-1]["Time"]
        elif preBarTime != r[-1]["Time"]:
            bar = r[-2]
            huobi_DB_Records.insert_one({"index": index, "High": bar["High"], "Low": bar["Low"], "Open": bar["Open"], "Close": bar["Close"], "Time": bar["Time"], "Volume": bar["Volume"]})
            index += 1
            preBarTime = r[-1]["Time"]
        LogStatus(_D(), "preBarTime:", preBarTime, "_D(preBarTime):", _D(preBarTime/1000), "index:", index)
        Sleep(10000)
        

```

> 策略出处

https://www.fmz.com/strategy/199120

> 更新时间

2020-04-16 15:18:28
