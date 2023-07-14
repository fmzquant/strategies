
> Name

订单同步管理系统类库Single-Server

> Author

小小梦

> Strategy Description

相关文章：
https://www.fmz.com/digest-topic/8932
https://www.fmz.com/digest-topic/8946

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|config1||跟单配置1|
|config2||跟单配置2|
|config3||跟单配置3|
|config4||跟单配置4|
|config5||跟单配置5|
|amountPrecision|3|跟单量精度|


> Source (javascript)

``` javascript
// 全局变量
var keyName_label = "label"
var keyName_robotId = "robotId"
var keyName_extendAccessKey = "extendAccessKey"
var keyName_extendSecretKey = "extendSecretKey"
var fmzExtendApis = parseConfigs([config1, config2, config3, config4, config5])
var mapInitRefPosAmount = {}

function parseConfigs(configs) {
    var arr = []
    _.each(configs, function(config) {
        if (config == "") {
            return 
        }
        var strArr = config.split(",")
        if (strArr.length != 4) {
            throw "configs error!"
        }
        var obj = {}
        obj[keyName_label] = strArr[0]
        obj[keyName_robotId] = strArr[1]
        obj[keyName_extendAccessKey] = strArr[2]
        obj[keyName_extendSecretKey] = strArr[3]
        arr.push(obj)
    })
    return arr 
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
    var timestamp = new Date().getTime()
    return {ts: timestamp, long: longPosAmount, short: shortPosAmount}
}

function sendCommandRobotMsg (robotId, accessKey, secretKey, msg) {
    // https://www.fmz.com/api/v1?access_key=xxx&secret_key=yyyy&method=CommandRobot&args=[186515,"ok12345"]
    var url = "https://www.fmz.com/api/v1?access_key=" + accessKey + "&secret_key=" + secretKey + "&method=CommandRobot&args=[" + robotId + ',"' + msg + '"]'
    Log(url)
    var ret = HttpQuery(url)
    return ret 
}

function follow(nowPosAmount, symbol, ct, type, delta) {
    var msg = ""
    var nowAmount = type == PD_LONG ? nowPosAmount.long : nowPosAmount.short
    if (delta > 0) {
        // 开仓
        var tradeDirection = type == PD_LONG ? "buy" : "sell"
        // 发送信号
        msg = symbol + "," + ct + "," + tradeDirection + "," + Math.abs(delta)        
    } else if (delta < 0) {
        // 平仓
        var tradeDirection = type == PD_LONG ? "closebuy" : "closesell"
        if (nowAmount <= 0) {
            Log("未检测到持仓")
            return 
        }
        // 发送信号
        msg = symbol + "," + ct + "," + tradeDirection + "," + Math.abs(delta)
    } else {
        throw "错误"
    }
    if (msg) {
        _.each(fmzExtendApis, function(extendApiConfig) {
            var ret = sendCommandRobotMsg(extendApiConfig[keyName_robotId], extendApiConfig[keyName_extendAccessKey], extendApiConfig[keyName_extendSecretKey], msg)
            Log("调用CommandRobot接口，", "label:", extendApiConfig[keyName_label], "， msg:", msg, "， ret:", ret)
            Sleep(1000)
        })
    }
}

$.PosMonitor = function(exIndex, symbol, ct) {    
    // fmzExtendApis 如果为空数组，即没有需要推送的配置，也不需要监控，直接返回
    if (fmzExtendApis.length == 0) {
        return 
    }

    var ts = new Date().getTime()
    var ex = exchanges[exIndex]
    // 判断ex类型
    var exName = ex.GetName()
    var isFutures = exName.includes("Futures_")
    var exType = isFutures ? "futures" : "spot"
    if (!isFutures) {
        throw "仅支持期货跟单"
    }

    if (exType == "futures") {
        // 缓存 symbol ct
        var buffSymbol = ex.GetCurrency()
        var buffCt = ex.GetContractType()

        // 切换到对应的交易对、合约代码
        ex.SetCurrency(symbol)
        if (!ex.SetContractType(ct)) {
            throw "SetContractType failed"
        }

        // 监控持仓
        var keyInitRefPosAmount = "refPos-" + exIndex + "-" + symbol + "-" + ct    // refPos-exIndex-symbol-contractType
        var initRefPosAmount = mapInitRefPosAmount[keyInitRefPosAmount]
        if (!initRefPosAmount) {
            // 没有初始化数据，初始化          
            mapInitRefPosAmount[keyInitRefPosAmount] = getPosAmount(_C(ex.GetPosition), ct)
            initRefPosAmount = mapInitRefPosAmount[keyInitRefPosAmount]
        }

        // 监控
        var nowRefPosAmount = getPosAmount(_C(ex.GetPosition), ct)
        // 计算仓位变动
        var longPosDelta = _N(nowRefPosAmount.long - initRefPosAmount.long, amountPrecision)
        var shortPosDelta = _N(nowRefPosAmount.short - initRefPosAmount.short, amountPrecision)

        // 检测变动
        if (!(longPosDelta == 0 && shortPosDelta == 0)) {
            // 执行多头动作
            if (longPosDelta != 0) {
                Log(ex.GetName(), ex.GetLabel(), symbol, ct, "执行多头跟单，变动量：", longPosDelta)
                follow(nowRefPosAmount, symbol, ct, PD_LONG, longPosDelta)
            }
            // 执行空头动作
            if (shortPosDelta != 0) {
                Log(ex.GetName(), ex.GetLabel(), symbol, ct, "执行空头跟单，变动量：", shortPosDelta)
                follow(nowRefPosAmount, symbol, ct, PD_SHORT, shortPosDelta)
            }

            // 执行跟单操作后，更新
            mapInitRefPosAmount[keyInitRefPosAmount] = nowRefPosAmount
        }

        // 恢复 symbol ct
        ex.SetCurrency(buffSymbol)
        ex.SetContractType(buffCt)
    } else if (exType == "spot") {
        // 现货
        ct = "spot"  // 设置为现货
    }
}

$.getTbl = function() {
    var tbl = {
        "type" : "table", 
        "title" : "同步数据", 
        "cols" : [], 
        "rows" : []
    }
    // 构造表头
    tbl.cols.push("监控账户:refPos-exIndex-symbol-contractType")
    tbl.cols.push(`监控持仓:{"时间戳":xxx,"多头持仓量":xxx,"空头持仓量":xxx}`)
    _.each(fmzExtendApis, function(extendApiData, index) {
        tbl.cols.push(keyName_robotId + "-" + index)
    })
    
    // 写入数据
    _.each(mapInitRefPosAmount, function(initRefPosAmount, key) {
        var arr = [key, JSON.stringify(initRefPosAmount)]
        _.each(fmzExtendApis, function(extendApiData) {
            arr.push(extendApiData[keyName_robotId])
        })
        tbl.rows.push(arr)
    })

    return tbl
}

// 引用该模板类库的策略调用范例
function main() {
    // 清除所有日志
    LogReset(1)

    // 切换到OKEX 模拟盘测试
    // exchanges[0].IO("simulate", true)

    // 设置合约
    exchanges[0].SetCurrency("ETH_USDT")
    exchanges[0].SetContractType("swap")

    // 定时交易时间间隔
    var tradeInterval = 1000 * 60 * 3        // 三分钟交易一次，用于观察跟单信号
    var lastTradeTS = new Date().getTime()
    
    while (true) {
        // 策略其它逻辑...

        // 用于测试的模拟交易触发
        var ts = new Date().getTime()
        if (ts - lastTradeTS > tradeInterval) {
            Log("模拟带单策略发生交易，持仓变化", "#FF0000")
            exchanges[0].SetDirection("closesell")
            exchanges[0].Buy(-1, 0.003)
            lastTradeTS = ts
        }

        // 使用模板的接口函数
        $.PosMonitor(0, "ETH_USDT", "swap")    // 可以设置多个监控，监控带单策略上的不同的exchange对象  
        var tbl = $.getTbl()
        
        // 显示状态栏
        LogStatus(_D(), "\n" + "`" + JSON.stringify(tbl) + "`")
        Sleep(1000)
    }
}

```

> Detail

https://www.fmz.com/strategy/345171

> Last Modified

2022-02-16 14:47:15
