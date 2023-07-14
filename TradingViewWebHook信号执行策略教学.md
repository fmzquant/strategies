
> Name

TradingViewWebHook信号执行策略教学

> Author

小小梦

> Strategy Description

相关文章：https://www.fmz.com/bbs-topic/5533
B站视频链接：https://www.bilibili.com/video/BV1Wk4y1k7zz/

- 2020.7.29 更新
  增加SPK , BPK 两条指令，分别对应：卖出平多仓之后卖出开空仓，买入平空仓之后买入开多仓。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|IsMarketOrder|false|是否使用市价单|
|QuotePrecision|2|下单价格精度|
|BasePrecision|2|下单量精度|
|Ct||期货合约代码|




|Button|Default|Description|
|----|----|----|
|buy|0.01|测试买入|
|sell|0.01|测试卖出|


> Source (javascript)

``` javascript
/*
- 交互命令字符串格式
  action:amount
  action: buy , sell , long , short , cover_long , cover_short, spk , bpk
- 交易所类型
  eType变量取值: 0 spot , 1 futures

- TV文档链接
  https://www.tradingview.com/pine-script-docs/en/v4/Quickstart_guide.html
  https://cn.tradingview.com/chart/8xfTuX7F/

- TV webhook 发送请求
  https://www.fmz.com/api/v1?access_key=xxx&secret_key=yyyy&method=CommandRobot&args=[186515,"action:amount"]

- 引用类库
  引用数字货币交易类库
*/

// 参数
// var IsMarketOrder = false 
// var QuotePrecision = 2
// var BasePrecision = 2

// 期货参数
// var Ct = ""


// 全局变量
var BUY = "buy"
var SELL = "sell"
var LONG = "long"
var SHORT = "short"
var COVER_LONG = "cover_long"
var COVER_SHORT = "cover_short"
var SPK = "spk"
var BPK = "bpk"


function main() {
    // 清空日志，如不需要，可以删除
    LogReset(1)

	// 设置精度
    exchange.SetPrecision(QuotePrecision, BasePrecision)

    // 识别期货还是现货
    var eType = 0
    var eName = exchange.GetName()
    var patt = /Futures_/
    if (patt.test(eName)) {
        Log("添加的交易所为期货交易所：", eName, "#FF0000")
        eType = 1
        if (Ct == "") {
            throw "Ct 合约设置为空"
        } else {
        	Log(exchange.SetContractType(Ct), "设置合约：", Ct, "#FF0000")
        }
    } else {
    	Log("添加的交易所为现货交易所：", eName, "#32CD32")
    }
    
    var lastMsg = ""
    var acc = _C(exchange.GetAccount)
    while(true) {
        var cmd = GetCommand()
        if (cmd) {
            // 检测交互命令
            lastMsg = "命令:" + cmd + "时间:" + _D()
            var arr = cmd.split(":")
            if (arr.length != 2) {
                Log("cmd信息有误：", cmd, "#FF0000")
                continue
            }

            var action = arr[0]
            var amount = parseFloat(arr[1])

            if (eType == 0) {
                if (action == BUY) {               
                    var buyInfo = IsMarketOrder ? exchange.Buy(-1, amount) : $.Buy(amount)
                    Log("buyInfo:", buyInfo)
                } else if (action == SELL) {        
                    var sellInfo = IsMarketOrder ? exchange.Sell(-1, amount) : $.Sell(amount)
                    Log("sellInfo:", sellInfo)
                } else {
                	Log("现货交易所不支持！", "#FF0000")
                }
            } else if (eType == 1) {
            	var tradeInfo = null
            	var ticker = _C(exchange.GetTicker)
                if (action == LONG) {
                	exchange.SetDirection("buy")
                    tradeInfo = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                } else if (action == SHORT) {        
                    exchange.SetDirection("sell")
                    tradeInfo = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                } else if (action == COVER_LONG) {        
                    exchange.SetDirection("closebuy")
                    tradeInfo = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                } else if (action == COVER_SHORT) {        
                	exchange.SetDirection("closesell")
                	tradeInfo = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                } else if (action == SPK) {   // 卖出平多仓，卖出开空仓
                    exchange.SetDirection("closebuy")
                    var tradeInfo1 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    exchange.SetDirection("sell")
                    var tradeInfo2 = IsMarketOrder ? exchange.Sell(-1, amount) : exchange.Sell(ticker.Buy, amount)
                    tradeInfo = [tradeInfo1, tradeInfo2]
                } else if (action == BPK) {   // 买入平空仓，买入开多仓
                    exchange.SetDirection("closesell")
                    var tradeInfo1 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    exchange.SetDirection("buy")
                    var tradeInfo2 = IsMarketOrder ? exchange.Buy(-1, amount) : exchange.Buy(ticker.Sell, amount)
                    tradeInfo = [tradeInfo1, tradeInfo2]
                } else {
                	Log("期货交易所不支持！", "#FF0000")
                }
                if (tradeInfo) {
                    Log("tradeInfo:", tradeInfo)
                }
            } else {
            	throw "eType error, eType:" + eType
            }
            acc = _C(exchange.GetAccount)
        }
        var tbl = {
        	type : "table", 
        	title : "状态信息", 
        	cols : ["数据"], 
        	rows : []
        }
        tbl.rows.push([JSON.stringify(acc)])
        LogStatus(_D(), eName, "上次接收到的命令：", lastMsg, "\n", "`" + JSON.stringify(tbl) + "`")
    	Sleep(1000)
    }
}


```

> Detail

https://www.fmz.com/strategy/203063

> Last Modified

2020-07-29 17:10:43
