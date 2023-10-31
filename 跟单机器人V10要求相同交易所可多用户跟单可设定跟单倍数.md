
> Name

跟单机器人V10要求相同交易所可多用户跟单可设定跟单倍数

> Author

guohwa



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|refCurrency|ETH_USDT|跟单交易对|
|refCt|swap|跟单合约|
|isSimulate|false|是否使用模拟盘|
|pricePrecision|2|价格精度|
|amountPrecision|2|下单量精度|


> Source (javascript)

``` javascript
/*backtest
start: 2021-03-18 00:00:00
end: 2021-04-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"},{"eid":"Futures_OKCoin","currency":"BTC_USD"},{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
*/

//var followRatio = 2; // 设置跟单的比例，范围0-100自定义
var followRatios = [1, 3, 4]; //多个跟单账户，分别设置不同的跟单比例，第一个为参考账户默认为1

function test() {
    // 测试函数
    var ts = new Date().getTime()    
    if (ts % (1000 * 60 * 60 * 6) > 1000 * 60 * 60 * 5.5) {
        Sleep(1000 * 60 * 10)
    	var nowPosAmount = getPosAmount(_C(exchange.GetPosition), refCt)
    	var longPosAmount = nowPosAmount.long
    	var shortPosAmount = nowPosAmount.short
        var x = Math.random()
        if (x > 0.7) {
        	exchange.SetDirection("buy")
            exchange.Buy(-1, _N(Math.max(1, x * 10), 0), "参考账户测试开单#FF0000")
        } else if(x < 0.2) {
        	exchange.SetDirection("sell")
            exchange.Sell(-1, _N(Math.max(1, x * 10), 0), "参考账户测试开单#FF0000")
        } else if(x >= 0.2 && x <= 0.5 && longPosAmount > 4) {
        	exchange.SetDirection("closebuy")
        	exchange.Sell(-1, longPosAmount, "参考账户测试平仓#FF0000")
        } else if(shortPosAmount > 4) {
        	exchange.SetDirection("closesell")
        	exchange.Buy(-1, _N(shortPosAmount / 2, 0), "参考账户测试平仓#FF0000")
        }
    }
}

function getPosAmount(pos, ct) {
    var longPosAmount = 0
    var shortPosAmount = 0
    _.each(pos, function(ele) {
    	if (ele.ContractType == ct && ele.Type == PD_LONG) {
    		longPosAmount = ele.Amount
    	} else if (ele.ContractType == ct && ele.Type == PD_SHORT) {
    		shortPosAmount = ele.Amount
    	}
    })
    return {long: longPosAmount, short: shortPosAmount}
}

function trade(e, ct, type, delta) {
    var nowPosAmount = getPosAmount(_C(e.GetPosition), ct)
    var nowAmount = type == PD_LONG ? nowPosAmount.long : nowPosAmount.short
    if (delta > 0) {
        // 开仓
        var tradeFunc = type == PD_LONG ? e.Buy : e.Sell
        e.SetDirection(type == PD_LONG ? "buy" : "sell")
        tradeFunc(-1, delta)
    } else if (delta < 0) {
        // 平仓
        var tradeFunc = type == PD_LONG ? e.Sell : e.Buy
        e.SetDirection(type == PD_LONG ? "closebuy" : "closesell")
        if (nowAmount <= 0) {
        	Log("未检测到持仓")
        	return 
        }
        tradeFunc(-1, Math.min(nowAmount, Math.abs(delta)))
    } else {
    	throw "错误"
    }
}

function main() {
    LogReset(1)
    if (exchanges.length < 2) {
        throw "没有跟单的交易所"
    }
    var exName = exchange.GetName()
    // 检测参考交易所
    if (!exName.includes("Futures_")) {
        throw "仅支持期货跟单"
    }
    Log("开始监控", exName, "交易所", "#FF0000")
    
    // 检测跟单交易所
    for (var i = 1 ; i < exchanges.length ; i++) {
        if (exchanges[i].GetName() != exName) {
            throw "跟单的期货交易所和参考交易所不同！"
        }
    }
    
    // 设置交易对、合约
    _.each(exchanges, function(e) {
    	if (!IsVirtual()) {
    		e.SetCurrency(refCurrency)
            if (isSimulate) {
                if (e.GetName() == "Futures_OKCoin") {
                    e.IO("simulate", true)
                }
            }
    	}
        e.SetContractType(refCt)
        // 设置精度
        e.SetPrecision(pricePrecision, amountPrecision)
        Log("设置", e.GetName(), e.GetLabel(), "价格精度：", pricePrecision, "下单量精度：", amountPrecision)
    })

    var initRefPosAmount = getPosAmount(_C(exchange.GetPosition), refCt)
    while(true) {
        if (IsVirtual()) {    // 回测时才模拟
        	test()            // 测试函数，模拟参考账户主动交易，触发跟单账户跟单        
        }
    	Sleep(500)
        var nowRefPosAmount = getPosAmount(_C(exchange.GetPosition), refCt)
        var tbl = {
            type : "table", 
            title : "持仓",
            cols : ["名称", "标签", "多仓", "空仓", "账户资产（Stocks）", "账户资产（Balance）"],
            rows : []
        }
        _.each(exchanges, function(e) {
            var pos = getPosAmount(_C(e.GetPosition), refCt)
            var acc = _C(e.GetAccount)
            tbl.rows.push([e.GetName(), e.GetLabel(), pos.long, pos.short, acc.Stocks, acc.Balance])
        })
        LogStatus(_D(), "\n`" + JSON.stringify(tbl) + "`")
        
        // 计算仓位变动量
        var longPosDelta = nowRefPosAmount.long - initRefPosAmount.long
        var shortPosDelta = nowRefPosAmount.short - initRefPosAmount.short

        // 检测变动
        if (longPosDelta == 0 && shortPosDelta == 0) {
        	continue
        } else if(nowRefPosAmount.long == 0 && nowRefPosAmount.short == 0){
            // 参考账户多头、空头仓位都为0，跟单账户准备执行市价全平操作
            for (var i = 1; i < exchanges.length; i++) {
                // 获取跟单账户的持仓信息
                var followPos = getPosAmount(_C(exchanges[i].GetPosition), refCt);
                // 如果存在多头仓位，则执行市价全平操作
                if (followPos.long > 0) {
                    //exchanges[i].SetDirection("closesell");
                    exchanges[i].SetDirection("closebuy");
                    exchanges[i].Sell(-1, followPos.long, "参考交易所仓位为0，跟单交易所市价全平");
                }
                // 如果存在空头仓位，则执行市价全平操作
                if (followPos.short > 0) {
                    //exchanges[i].SetDirection("closebuy");
                    exchanges[i].SetDirection("closesell");
                    exchanges[i].Buy(-1, followPos.short, "参考交易所仓位为0，跟单交易所市价全平");
                }
            }
        } else {
        	// 检测到仓位变动
        	for (var i = 1 ; i < exchanges.length ; i++) {
        		// 执行多头动作
        		if (longPosDelta != 0) {
        			var longDelta = Math.round(longPosDelta * followRatio);
        			Log(exchanges[i].GetName(), exchanges[i].GetLabel(), "执行多头跟单，变动量：", longDelta)
        		    trade(exchanges[i], refCt, PD_LONG, longDelta)
        		}
        		// 执行空头动作
        		if (shortPosDelta != 0) {
        			var shortDelta = Math.round(shortPosDelta * followRatio);
        			Log(exchanges[i].GetName(), exchanges[i].GetLabel(), "执行空头跟单，变动量：", shortDelta)
        		    trade(exchanges[i], refCt, PD_SHORT, shortDelta)
        		}                
        	}
        }

        // 执行跟单操作后，更新
        initRefPosAmount = nowRefPosAmount

    }
}

```

> Detail

https://www.fmz.com/strategy/423776

> Last Modified

2023-08-14 10:57:29
