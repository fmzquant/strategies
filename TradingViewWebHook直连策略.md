
> 策略名称

TradingViewWebHook直连策略

> 策略作者

小小梦

> 策略描述

相关文章：https://www.fmz.com/bbs-topic/5969

由于HTTPServer本身有些坑，考虑使用ThreadingHTTPServer代替。
参考：https://docs.python.org/3.7/library/http.server.html
需要Python3.7版本。

HTTPServer问题的资料：
https://www.zybuluo.com/JunQiu/note/1350528

> 策略参数



|参数|默认值|描述|
|----|----|----|
|AccessKey|$$$__enc__$$$|AccessKey密钥|
|SecretKey|$$$__enc__$$$|SecretKey密钥|
|ContractType||合约ID|
|Port|80|服务的监听端口号|
|UseMarketOrderForCTP|true|商品期货使用市价单|


> 源码 (python)

``` python
'''
请求格式：http://x.x.x.x:xxxx/data?access_key=xxx&secret_key=yyy&type=buy&amount=0.001
策略机器人参数：
- 类型：加密字符串，AccessKey , SecretKey ，可以用FMZ平台的低权限的API KEY，或者自己生成KEY也可以。
- 类型：字符串，合约ID，ContractType
- 类型：数值，端口号，Port
'''

import _thread
import json
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

def url2Dict(url):
    query = urlparse(url).query  
    params = parse_qs(query)  
    result = {key: params[key][0] for key in params}  
    return result

class Executor(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            dictParam = url2Dict(self.path)
            Log("测试", dictParam)
        except Exception as e:
            Log("Provider do_GET error, e:", e)
    def do_POST(self):
        try:
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            dictParam = url2Dict(self.path)
            
            # 校验
            if len(dictParam) == 4 and dictParam["access_key"] == AccessKey and dictParam["secret_key"] == SecretKey:
                del dictParam["access_key"]
                del dictParam["secret_key"]
                Log("接收到请求", "参数：", dictParam, "#FF0000")
                '''
                map[access_key:xxx amount:0.001 secret_key:yyy type:buy]
                '''
                isSpot = True
                if exchange.GetName().find("Futures") != -1:
                    if ContractType != "":
                        exchange.SetContractType(ContractType)
                        isSpot = False 
                    else :
                        raise "未设置期货合约"
                                
                q = None
                if exchange.GetName() == "Futures_CTP" and UseMarketOrderForCTP == False:
                    q = ext.NewTaskQueue()
                
                if isSpot and dictParam["type"] == "buy":
                    exchange.Buy(-1, float(dictParam["amount"]))
                    Log(exchange.GetAccount())
                elif isSpot and dictParam["type"] == "sell":
                    exchange.Sell(-1, float(dictParam["amount"]))
                    Log(exchange.GetAccount())
                elif not isSpot and dictParam["type"] == "long":
                    exchange.SetDirection("buy")
                    if not q:
                        exchange.Buy(-1, float(dictParam["amount"]))
                    else :
                        q.pushTask(exchange, ContractType, "buy", float(dictParam["amount"]), lambda task, ret: Log(task["desc"], ret, "#FF0000"))
                    Log("持仓：", exchange.GetPosition())
                elif not isSpot and dictParam["type"] == "short":
                    exchange.SetDirection("sell")
                    if not q:
                        exchange.Sell(-1, float(dictParam["amount"]))
                    else :
                        q.pushTask(exchange, ContractType, "sell", float(dictParam["amount"]), lambda task, ret: Log(task["desc"], ret, "#FF0000"))
                    Log("持仓：", exchange.GetPosition())
                elif not isSpot and dictParam["type"] == "cover_long":
                    exchange.SetDirection("closebuy")
                    if not q:
                        exchange.Sell(-1, float(dictParam["amount"]))
                    else :
                        q.pushTask(exchange, ContractType, "closebuy", float(dictParam["amount"]), lambda task, ret: Log(task["desc"], ret, "#FF0000"))
                    Log("持仓：", exchange.GetPosition())
                elif not isSpot and dictParam["type"] == "cover_short":
                    exchange.SetDirection("closesell")
                    if not q:
                        exchange.Buy(-1, float(dictParam["amount"]))
                    else :
                        q.pushTask(exchange, ContractType, "closesell", float(dictParam["amount"]), lambda task, ret: Log(task["desc"], ret, "#FF0000"))
                    Log("持仓：", exchange.GetPosition())
                
                if q is not None:
                    while q.size() > 0:
                        q.poll()
                        Sleep(500)
                
            # 写入数据应答
            self.wfile.write(json.dumps({"state": "ok"}).encode())
        except Exception as e:
            Log("Provider do_POST error, e:", e)


def createServer(host):
    try:
        server = ThreadingHTTPServer(host, Executor)
        Log("Starting server, listen at: %s:%s" % host)
        server.serve_forever()
    except Exception as e:
        Log("createServer error, e:", e)
        raise Exception("stop")

def main():
    # 开启一个线程
    try:
        _thread.start_new_thread(createServer, (("0.0.0.0", Port), ))         # VPS服务器上测试        
    except Exception as e:        
        Log("错误信息：", e)
        raise Exception("stop")    
    Log("账户资产信息：", _C(exchange.GetAccount))
    while True:
        if exchange.GetName() == "Futures_CTP":
            if exchange.IO("status"):
                LogStatus(_D(), "CTP连接")
            else:
                LogStatus(_D(), "CTP未连接")
        else:
            LogStatus(_D())
        Sleep(2000)
```

> 策略出处

https://www.fmz.com/strategy/221850

> 更新时间

2020-12-18 11:18:06
