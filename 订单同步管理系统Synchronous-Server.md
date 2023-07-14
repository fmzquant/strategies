
> Name

订单同步管理系统Synchronous-Server

> Author

小小梦

> Strategy Description

相关文章：
https://www.fmz.com/digest-topic/8932
https://www.fmz.com/digest-topic/8946

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|specifiedAmount|-1|指定同步量|
|zoomAmountRatio|-1|同步量缩放|
|amountPrecision|2|下单量精度|
|pricePrecision|2|价格精度|
|isSimulateOKEX|false|是否使用OKEX模拟盘|




|Button|Default|Description|
|----|----|----|
|stop/restart||停止跟单|


> Source (javascript)

``` javascript
// 全局变量
var isStopFollow = false
var reStartPwd = null 

function trade(action) {
    // 切换交易对，设置合约
    exchange.SetCurrency(action.symbol)
    if (action.ct != "spot") {
        exchange.SetContractType(action.ct)        
    }    

    var retTrade = null 
    var amount = specifiedAmount == -1 ? action.amount : specifiedAmount
    amount = zoomAmountRatio == -1 ? amount : amount * zoomAmountRatio

    if (action.direction == "buy") {
        retTrade = action.ct == "spot" ? $.Buy(amount) : $.OpenLong(exchange, action.ct, amount)
    } else if (action.direction == "sell") {
    	retTrade = action.ct == "spot" ? $.Sell(amount) : $.OpenShort(exchange, action.ct, amount)
    } else if (action.direction == "closebuy") {
    	retTrade = action.ct == "spot" ? $.Sell(amount) : $.CoverLong(exchange, action.ct, amount)
    } else if (action.direction == "closesell") {
    	retTrade = action.ct == "spot" ? $.Buy(amount) : $.CoverShort(exchange, action.ct, amount)
    }
    return retTrade
}

function parseCmd(cmd) {
	var objAction = {}
	// 解析cmd ，例如：ETH_USDT,swap,buy,1
    var arr = cmd.split(",")
    if (arr.length != 4) {
    	return null 
    }
    objAction.symbol = arr[0]
    objAction.ct = arr[1]
    objAction.direction = arr[2]
    objAction.amount = arr[3]
    return objAction
}

function main() {
	// 清除所有日志
    LogReset(1)  

    if (isSimulateOKEX) {
    	exchange.IO("simulate", true)
    	Log("切换到OKEX模拟盘！")
    }

    // 设置精度
    exchange.SetPrecision(pricePrecision, amountPrecision)

    // 检查缩放、指定不能同时设置
    if (specifiedAmount != -1 && zoomAmountRatio != -1) {
    	throw "不能同时指定同步量和缩放量"
    }

    while (true) {
        var cmd = GetCommand()
        if (cmd) {
            Log("cmd: ", cmd)
            var arr = cmd.split(":")

            // 判断交互指令
            if (arr.length == 2) {
            	// 带控件的按钮
            	if (arr[0] == "stop/restart") {
            		// 暂停/重启跟单
            		if (!isStopFollow) {
            		    isStopFollow = true
            		    reStartPwd = arr[1]
            		    Log("已经停止跟单，", "设置的重启密码为：", reStartPwd, "#FF0000")
            		} else if (isStopFollow && arr[1] == reStartPwd) {
            			isStopFollow = false 
            			reStartPwd = null 
            			Log("已经重启跟单，", "清空重启密码。", "#FF0000")
            		} else if (isStopFollow && arr[1] != reStartPwd) {
            			Log("重启密码错误！")
            		}
            	}
            	continue 
            }
            
            // 允许跟单
            if (!isStopFollow) {
                // 解析跟单信号交互指令
                var objAction = parseCmd(cmd)
                if (objAction) {
            	    // 解析正确
            	    var ret = trade(objAction)
                } else {
                	Log("错误的信号指令 cmd:", cmd)
                }
            }
        }
        
        // 显示跟单情况
        LogStatus(_D(), isStopFollow ? "停止同步" : "保持同步", "\n")

        Sleep(1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/345172

> Last Modified

2022-02-16 14:47:43
