
> Name

币安websocket订阅永续合约行情信息

> Author

GCC





> Source (python)

``` python
import json
def main():
    LogStatus("正在连接...")
    # client = Dial("wss://stream.binance.com:9443/stream?streams=btcusdt@aggTrade/ethusdt@aggTrade|reconnect=true")    #多个交易对
    # client = Dial("wss://stream.binance.com:9443/ws/btcusdt@aggTrade|reconnect=true")    #单个交易对
    # client = Dial("wss://dstream.binance.com/ws/btcusd_perp@aggTrade|reconnect=true")    #币本位，ticker
    client = Dial("wss://fstream.binance.com/ws/btcusdt@aggTrade|reconnect=true")
    if not client:    
        Log("连接失败, 程序退出")
        return
    while True:
        buf = client.read(-2)
        Log('tt',buf)
        if buf:
            obj = json.loads(buf)
            # Log(obj)
            # Log('交易对',obj['data']['s'], ' 价格', obj['data']['p'])    #多个交易对 
            Log(obj['p'])    #测试
        Sleep(5000)
    client.close()
```

> Detail

https://www.fmz.com/strategy/327491

> Last Modified

2021-11-24 14:29:50
