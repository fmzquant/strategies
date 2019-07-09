
> 策略名称

Deribit websocket 范例

> 策略作者

小小梦





> 源码 (javascript)

``` javascript
var client = null
var deribitAcc = {}                               // 可以设置个全局对象保存 token 

function WS_GetAccount() {                        // 获取账户 某个币种 的资产信息
    var msg = {
        "jsonrpc": "2.0",
        "id": 2515,
        "method": "private/get_account_summary",
        "params": {
            "currency": "ETH",
            "extended": true
        }
    }

    client.write(JSON.stringify(msg))
    var ret = client.read()
    Log(ret, "#FF0000")
}

function WS_GetToken() {                          // 认证 ，并且获取 token 
    var msg = {
        "jsonrpc": "2.0",
        "id": 9929,
        "method": "public/auth",
        "params": {
            "grant_type": "client_credentials",
            "client_id": "XXXXXXX",                             // 申请 API KEY 时获取
            "client_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXX"       // 申请 API KEY 时获取
        }
    }
    while (1) {
        client.write(JSON.stringify(msg))
        var ret = client.read()
        try {
            var jsonObj = JSON.parse(ret)
            if (jsonObj) {
                deribitAcc.accessToken = jsonObj.result.access_token
                deribitAcc.refToken = jsonObj.result.refresh_token
                break
            }
        } catch (e) {
            Log("error:", e)
        }
    }
    Log("更新 deribitAcc accessToken , refToken:", deribitAcc)
}

function WS_Depth() {                                     // 访问 get_order_book 公共 频道，获取 订单薄深度数据
    var msg = {
        "jsonrpc": "2.0",
        "id": 8772,
        "method": "public/get_order_book",
        "params": {
            "instrument_name": "BTC-PERPETUAL",           // 指定，获取 BTC 永续合约的深度数据
            "depth": 5
        }
    }

    client.write(JSON.stringify(msg))
    var ret = client.read()
    Log("depth : ", ret)
}

function main() {
    client = Dial("wss://www.deribit.com/ws/api/v2")
    WS_GetToken()

    WS_GetAccount()
    WS_Depth()

}

function onexit() {
    Log("关闭 ws 连接")
    client.close()
}
```

> 策略出处

https://www.fmz.com/strategy/147765

> 更新时间

2019-05-15 18:37:40
