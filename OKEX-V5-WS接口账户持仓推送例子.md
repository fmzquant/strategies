
> Name

OKEX-V5-WS接口账户持仓推送例子

> Author

小小梦

> Strategy Description

## OKEX V5 WS接口账户持仓推送例子

OKEX V5 WS接口私有接口使用范例，策略参数```accessKey```、```secretKey```、```passphrase```。其中```passphrase```是在交易所网站创建APIKEY时填写的秘钥口令。策略例子首先登陆验证，然后订阅了所有持仓信息。定时发送ping，交易所服务器会响应pong。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|accessKey|$$$__enc__$$$|accessKey|
|secretKey|$$$__enc__$$$|secretKey|
|passphrase|$$$__enc__$$$|passphrase|


> Source (javascript)

``` javascript
function getLogin(pAccessKey, pSecretKey, pPassphrase) {
    // 签名函数，用于登录
    var ts = (new Date().getTime() / 1000) + ""
    var login = {
        "op": "login",
        "args":[{
            "apiKey"    : pAccessKey,
            "passphrase" : pPassphrase,
            "timestamp" : ts,
            "sign" : exchange.HMAC("sha256", "base64", ts + "GET" + "/users/self/verify", pSecretKey)
        }]
    }    
    return login
}

var client_private = null 
function main() {
    // 因为read函数使用了超时设置，过滤超时的报错，否则会有冗余错误输出
    SetErrorFilter("timeout")
    
    // 持仓频道订阅信息
    var posSubscribe = {
        "op": "subscribe",
        "args": [{
            "channel": "positions",
            "instType": "ANY"
        }]
    }

    var payload = JSON.stringify(getLogin(accessKey, secretKey, passphrase))
    client_private = Dial("wss://ws.okex.com:8443/ws/v5/private|reconnect=true&payload=" + payload)
    Sleep(3000)  // 登录时，不能立即订阅私有频道，需要等待服务器反应
    if (client_private) {        
        client_private.write(JSON.stringify(posSubscribe))
        var lastPingTS = new Date().getTime()
        while (true) {
            var buf = client_private.read(2000)
            if (buf) {
                Log(buf)    
            }
            // 发送心跳包
            var nowPingTS = new Date().getTime()
            if (nowPingTS - lastPingTS > 10 * 1000) {
                client_private.write("ping")
                lastPingTS = nowPingTS
            }            
        }        
    }
}

function onexit() {    
    var ret = client_private.close()
    Log("关闭连接！", ret)
}
```

> Detail

https://www.fmz.com/strategy/313116

> Last Modified

2021-09-03 11:49:54
