
> Name

SeamlessConnWS

> Author

小小梦

> Strategy Description

https://www.fmz.com/bbs-topic/4328

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|IsUsedWebSocket|false|是否启用WebSocket|
|Hook_GetTicker|false|Hook行情接口GetTicker|


> Source (javascript)

``` javascript
function WSConnecter_Huobi (method, symbol) {
    // wss : wss://api.huobi.pro/ws
    /* Subscribe 
    {
        "sub": "market.btcusdt.detail",
    }
    */
    /* Subscribe string
        '{"sub": "market.btcusdt.detail"}'
    */

    var strSubscribe = ""
    if (method == "GetTicker") {
        symbol = symbol.toLowerCase()
        symbol = symbol.replace("_", "")
        strSubscribe = '{"sub": "market.' + symbol + '.detail"}'   // symbol : btcusdt
    } else {
        throw "未实现：" + method + "方法！"
    }
    
    var self = {}
    self.method = method
    self.pingCount = 0
    Log("Dial函数链接：", "wss://api.huobi.pro/ws|compress=gzip&mode=recv&reconnect=true&payload=" + strSubscribe)
    Log("订阅信息：", strSubscribe)
    self.client = Dial("wss://api.huobi.pro/ws|compress=gzip&mode=recv&reconnect=true&payload=" + strSubscribe)
    self.client.write(strSubscribe)
    
    self.Read = function () {
        try {
            var ret = self.client.read()
            var objRet = JSON.parse(ret)
            if (objRet.ping) {
                var pong = {"pong" : objRet.ping}
                // Log("huobiConn 收到心跳包，发送pong:", JSON.stringify(pong))                
                self.client.write(JSON.stringify(pong))
                self.pingCount++
                return null
            } else {
                /* 封装成FMZ的ticker结构
                {
                    "ch":"market.btcusdt.detail",
                    "ts":1569477791639,
                    "tick":{
                        "id":205028275148,
                        "low":8217,
                        "high":8624.87,
                        "open":8517.89,
                        "close":8386.36,
                        "vol":361804831.52344716,
                        "amount":43197.45945060976,
                        "version":205028275148,
                        "count":335763
                    }
                }
                */
                var ticker = {}
                if (!objRet.tick) {
                    return null
                }
                
                ticker.Info = objRet.tick
                ticker.High = objRet.tick.high
                ticker.Low = objRet.tick.low
                ticker.Last = objRet.tick.close
                ticker.Volume = objRet.tick.vol
                ticker.Buy = objRet.tick.close
                ticker.Sell = objRet.tick.close
                ticker.Time = objRet.ts
                
                return ticker
            }
        } catch (e) {
            Log("error:", e)
            return null
        }
    }
    
    self.Close = function () {
        self.client.close()
        Log("method:", self.method, "断开ws链接")
    }
    
    return self
}

function WSConnecter_Binance (method, symbol) {
    // wss : wss://stream.binance.com:9443
    // /ws/<streamName>
    // Stream 名称: <symbol>@ticker
    // /ws/btcusdt@ticker

    var strSubscribe = ""
    if (method == "GetTicker") {
        symbol = symbol.toLowerCase()
        symbol = symbol.replace("_", "")
        strSubscribe = "/ws/" + symbol + "@ticker"
    } else {
        throw "未实现：" + method + "方法！"
    }    
    
    var self = {}
    self.pingCount = 0
    self.method = method
    Log("Dial函数链接：", "wss://stream.binance.com:9443" + strSubscribe + "|reconnect=true")
    self.client = Dial("wss://stream.binance.com:9443" + strSubscribe + "|reconnect=true")
    
    self.Read = function () {
        try {
            var ret = self.client.read()
            var objRet = JSON.parse(ret)
            if (objRet.ping) {
                var pong = {"pong" : objRet.ping}
                Log("binanceConn 收到心跳包，发送pong:", JSON.stringify(pong))                
                self.client.write(JSON.stringify(pong))
                self.pingCount++
                return null
            } else {
                /*
                {
                    "e":"24hrTicker",
                    "E":1569479950378,
                    "s":"BTCUSDT",
                    "p":"-72.67000000",
                    "P":"-0.855",
                    "w":"8380.87678669",
                    "x":"8504.99000000",
                    "c":"8430.98000000",
                    "Q":"0.10865300",
                    "b":"8430.02000000",          //  Buy1
                    "B":"2.00000000",
                    "a":"8431.00000000",
                    "A":"0.24020700",
                    "o":"8503.65000000",
                    "h":"8629.96000000",
                    "l":"8215.64000000",
                    "v":"52091.18312400",
                    "q":"436569787.43499342",
                    "O":1569393550372,
                    "C":1569479950372,
                    "F":182689950,
                    "L":183168699,
                    "n":478750
                }
                */

                var ticker = {}
                ticker.Info = objRet
                ticker.Buy = objRet.b
                ticker.Sell = objRet.a
                ticker.High = objRet.h
                ticker.Low = objRet.l
                ticker.Volume = objRet.v
                ticker.Last = objRet.c
                ticker.Time = objRet.E
                
                Log("推送行情：", ticker)   // 测试
                
                return ticker
            }
        } catch (e) {
            Log("error:", e)
            return null
        }
    }
    
    self.Close = function () {
        self.client.close()
        Log("断开ws链接")
    }
    
    return self
}


var _DictConnectCreater = {
    "Huobi" : WSConnecter_Huobi,
    "Binance" : WSConnecter_Binance,
}

var _ConnMap = {}

function init () {
    if (IsUsedWebSocket) {
        var connectCreater = null
        if (exchanges.length != 1) {
            Log("切换为ws接口只针对 exchange 交易所对象（即第一个添加的交易所对象）")
        }
        var isFound = false 
        for (var name in _DictConnectCreater) {
            if (exchange.GetName() == name) {
                connectCreater = _DictConnectCreater[name]
                isFound = true
            }
        }

        if (!isFound) {
            throw "没有找到实现"
        }
        
        if (Hook_GetTicker) {
            var symbol = exchange.GetCurrency()
            _ConnMap.GetTicker = connectCreater("GetTicker", symbol)
            exchange.GetTicker = function () {
                return _C(_ConnMap.GetTicker.Read)
            }
        }
        // ... 
        
    }
}

/* 不会触发
function onexit(){
    for (var method in _ConnMap) {
        _ConnMap[method].Close()
    }
}
*/

// 测试
function main () {


}
```

> Detail

https://www.fmz.com/strategy/167755

> Last Modified

2019-09-26 17:00:42
