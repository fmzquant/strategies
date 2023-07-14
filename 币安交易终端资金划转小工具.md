
> Name

币安交易终端资金划转小工具

> Author

高频量化



> Strategy Arguments





|Button|Default|Description|
|----|----|----|
|assets|USDT|划转币种|
|amount|10|划转数量|
|typeIndex|0|划转类型: 现货账户向USDT合约账户划转|USDT合约账户向现货账户划转|现货账户向币本位合约账户划转|币本位合约账户向现货账户划转|


> Source (javascript)

``` javascript
var type = 1;
assets = "USDT" //防止没有传参数
amount = "10" //防止没有传参数
//var type = [1, 2, 3, 4][typeIndex]

function UsdtTransfer(e, cur, amount, type) {
    try {
        var base = ''
        var params = ''
        var 币种 = cur
        var 划转数量 = amount
        var exname = e.GetName() //获取交易所接口的标记
        if (exname == 'Binance') {
            Log("exname=", exname)
            // 1: 现货账户向USDT合约账户划转 
            // 2: USDT合约账户向现货账户划转
            // 3: 现货账户向币本位合约账户划转 
            // 4: 币本位合约账户向现货账户划转
            var 划转类型 = type
            //划转到现货
            //POST /sapi/v1/futures/transfer
            base ="https://api.binance.com"
            e.SetBase(base)
            var timestamp = new Date().getTime()
            params = "asset=" + 币种 + "&amount=" + 划转数量 + "&type=" + 划转类型 + "&timestamp" + timestamp
            Log("交易对:", 币种, "划转数量:", 划转数量, "划转类型:", 划转类型)
            var ret1 = e.IO("api", "POST", "/sapi/v1/futures/transfer", params)
            Log(ret1)
            return ret1
        } else if (exname == 'Futures_Binance') {
            Log("exname=", exname)
            // 1: 现货账户向USDT合约账户划转 
            // 2: USDT合约账户向现货账户划转
            // 3: 现货账户向币本位合约账户划转 
            // 4: 币本位合约账户向现货账户划转
            var x划转类型 = type
            //划转到现货
            //POST /sapi/v1/futures/transfer
            base ="https://api.binance.com"
            e.SetBase(base) //设置在现货接口
            var xtimestamp = new Date().getTime()
            params = "asset=" + 币种 + "&amount=" + 划转数量 + "&type=" + x划转类型 + "&xtimestamp" + xtimestamp
            Log("交易对:", 币种, "划转数量:", 划转数量, "x划转类型:", x划转类型)
            //var ret1 = e.IO("api", "POST", "/sapi/v1/futures/transfer" ,"",  JSON.stringify( params ) )
            var ret2 = e.IO("api", "POST", "/sapi/v1/futures/transfer", params) //发送划转
            Log(ret2)
            //需要从新切换回原来的API接口，否则容易影响到接下来的账号交易
            base = "https://fapi.binance.com" //期货的接口  
            e.SetBase(base)
            return ret2
        }
        //Log("循环一次")
    } catch (error) {
        Log(error)
    }
}

function GetCom() {
    var cmd = GetCommand()
    if (cmd) {
        var arr = cmd.split(":")
        Log(arr)
        if (arr[0] == "assets") {
            assets = arr[1]
            Log("切换为assets:", assets)
        }
        if (arr[0] == "amount") {
            amount = arr[1]
            Log("切换为amount:", amount)
        }
        if (arr[0] == "typeIndex") {
            type = Number(arr[1]) + 1
            Log("切换为type:", type)
            var feedback = UsdtTransfer(exchange, assets, amount, type)
            if(feedback){
                Log("资金划账成功")
                //Sleep(1000 * 3); // 休眠3秒
            }
        }
    }
}


function main() {
    while (true) {
        GetCom()
        Sleep(1000 * 1); // 休眠3秒
    }
}
```

> Detail

https://www.fmz.com/strategy/336595

> Last Modified

2021-12-24 15:56:36
