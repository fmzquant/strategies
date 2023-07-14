
> Name

TradingView信号执行策略2教学-Copy

> Author

mikejia

> Strategy Description

相关文章：https://www.fmz.com/digest-topic/9794

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|SleepInterval|true|循环间隔|
|FMZ_AccessKey|xxx|FMZ平台的AccessKey|
|FMZ_SecretKey|xxx|FMZ平台的SecretKey|
|maxBuffSignalRowDisplay|20|最大信号显示行数|
|isLogReset|false|重置所有日志|




|Button|Default|Description|
|----|----|----|
|TestSignal|{"Flag":"45M103Buy","Exchange":1,"Currency":"BTC_USDT","ContractType":"swap","Price":"10000","Action":"buy","Amount":"0"}|测试信号|
|evalCode|Log(exchange.GetName())|执行Javascript代码|


> Source (javascript)

``` javascript
//信号结构
var Template = {
    Flag: "45M103Buy",     // 标识,可随意指定
    Exchange: 1,           // 指定交易所交易对
    Currency: "BTC_USDT",  // 交易对
    ContractType: "swap",  // 合约类型,swap,quarter,next_quarter,现货填写spot
    Price: "{{close}}",    // 开仓或者平仓价格,-1为市价
    Action: "buy",         // 交易类型[ buy:现货买入 , sell:现货卖出 , long:期货做多 , short:期货做空 , closesell:期货买入平空 , closebuy:期货卖出平多]
    Amount: "0",           // 交易量
}

var BaseUrl = "https://www.fmz.com/api/v1"   // FMZ扩展API接口地址 
var RobotId = _G()                           // 当前实盘ID
var Success = "#5cb85c"    // 成功颜色
var Danger = "#ff0000"     // 危险颜色
var Warning = "#f0ad4e"    // 警告颜色
var buffSignal = []

// 校验信号消息格式
function DiffObject(object1, object2) {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)
    if (keys1.length !== keys2.length) {
        return false
    }
    for (let i = 0; i < keys1.length; i++) {
        if (keys1[i] !== keys2[i]) {
            return false
        }
    }
    return true
}

function CheckSignal(Signal) {
    Signal.Price = parseFloat(Signal.Price)
    Signal.Amount = parseFloat(Signal.Amount)
    if (Signal.Exchange <= 0 || !Number.isInteger(Signal.Exchange)) {
        Log("交易所最小编号为1，并且为整数", Danger)
        return
    }
    if (Signal.Amount <= 0 || typeof(Signal.Amount) != "number") {
        Log("交易量不能小于0，并且为数值类型", typeof(Signal.Amount), Danger)
        return
    }
    if (typeof(Signal.Price) != "number") {
        Log("价格必须是数值", Danger)
        return
    }
    if (Signal.ContractType == "spot" && Signal.Action != "buy" && Signal.Action != "sell") {
        Log("指令为操作现货，Action错误，Action：", Signal.Action, Danger)
        return 
    }
    if (Signal.ContractType != "spot" && Signal.Action != "long" && Signal.Action != "short" && Signal.Action != "closesell" && Signal.Action != "closebuy") {
        Log("指令为操作期货，Action错误，Action：", Signal.Action, Danger)
        return 
    }
    return true
}

function commandRobot(url, accessKey, secretKey, robotId, cmd) {
    // https://www.fmz.com/api/v1?access_key=xxx&secret_key=xxx&method=CommandRobot&args=[xxx,+""]
    url = url + '?access_key=' + accessKey + '&secret_key=' + secretKey + '&method=CommandRobot&args=[' + robotId + ',+""]'
    var postData = {
        method:'POST', 
        data:cmd
    }
    var headers = "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36\nContent-Type: application/json"
    var ret = HttpQuery(url, postData, "", headers)
    Log("模拟TradingView的webhook请求，发送用于测试的POST请求：", url, "body:", cmd, "应答：", ret)
}

function createManager() {
    var self = {}
    self.tasks = []
    
    self.process = function() {
        var processed = 0
        if (self.tasks.length > 0) {
            _.each(self.tasks, function(task) {
                if (!task.finished) {
                    processed++
                    self.pollTask(task)
                }
            })
            if (processed == 0) {
                self.tasks = []
            }
        }
    }
    
    self.newTask = function(signal) {
        // {"Flag":"45M103Buy","Exchange":1,"Currency":"BTC_USDT","ContractType":"swap","Price":"10000","Action":"buy","Amount":"0"}
        var task = {}
        task.Flag = signal["Flag"]
        task.Exchange = signal["Exchange"]
        task.Currency = signal["Currency"]
        task.ContractType = signal["ContractType"]
        task.Price = signal["Price"]
        task.Action = signal["Action"]
        task.Amount = signal["Amount"]
        task.exchangeIdx = signal["Exchange"] - 1
        task.pricePrecision = null
        task.amountPrecision = null 
        task.error = null 
        task.exchangeLabel = exchanges[task.exchangeIdx].GetLabel()
        task.finished = false 
        
        Log("创建任务：", task)
        self.tasks.push(task)
    }
    
    self.getPrecision = function(n) {
        var precision = null 
        var arr = n.toString().split(".")
        if (arr.length == 1) {
            precision = 0
        } else if (arr.length == 2) {
            precision = arr[1].length
        } 
        return precision
    }
    
    self.pollTask = function(task) {
        var e = exchanges[task.exchangeIdx]
        var name = e.GetName()
        var isFutures = true
        e.SetCurrency(task.Currency)
        if (task.ContractType != "spot" && name.indexOf("Futures_") != -1) {
            // 非现货，则设置合约
            e.SetContractType(task.ContractType)
        } else if (task.ContractType == "spot" && name.indexOf("Futures_") == -1) {
            isFutures = false 
        } else {
            task.error = "指令中的ContractType与配置的交易所对象类型不匹配"
            task.finished = true
            return 
        }
        
        var depth = e.GetDepth()
        if (!depth || !depth.Bids || !depth.Asks) {
            task.error = "订单薄数据异常"
            return 
        }
        
        if (depth.Bids.length == 0 && depth.Asks.length == 0) {
            task.error = "盘口无订单"
            return 
        }
        
        _.each([depth.Bids, depth.Asks], function(arr) {
            _.each(arr, function(order) {
                var pricePrecision = self.getPrecision(order.Price)
                var amountPrecision = self.getPrecision(order.Amount)
                if (Number.isInteger(pricePrecision) && !Number.isInteger(self.pricePrecision)) {
                    self.pricePrecision = pricePrecision
                } else if (Number.isInteger(self.pricePrecision) && Number.isInteger(pricePrecision) && pricePrecision > self.pricePrecision) {
                    self.pricePrecision = pricePrecision
                }
                if (Number.isInteger(amountPrecision) && !Number.isInteger(self.amountPrecision)) {
                    self.amountPrecision = amountPrecision
                } else if (Number.isInteger(self.amountPrecision) && Number.isInteger(amountPrecision) && amountPrecision > self.amountPrecision) {
                    self.amountPrecision = amountPrecision
                }
            })
        })

        if (!Number.isInteger(self.pricePrecision) || !Number.isInteger(self.amountPrecision)) {
            task.err = "获取精度失败"
            return 
        }
        
        e.SetPrecision(self.pricePrecision, self.amountPrecision)
        
        // buy:现货买入 , sell:现货卖出 , long:期货做多 , short:期货做空 , closesell:期货买入平空 , closebuy:期货卖出平多
        var direction = null 
        var tradeFunc = null 
        if (isFutures) {
            switch (task.Action) {
                case "long": 
                    direction = "buy"
                    tradeFunc = e.Buy 
                    break
                case "short": 
                    direction = "sell"
                    tradeFunc = e.Sell
                    break
                case "closesell": 
                    direction = "closesell"
                    tradeFunc = e.Buy 
                    break
                case "closebuy": 
                    direction = "closebuy"
                    tradeFunc = e.Sell
                    break
            }
            if (!direction || !tradeFunc) {
                task.error = "交易方向错误：" + task.Action
                task.finished = true
                return 
            }
            e.SetDirection(direction)
        } else {
            if (task.Action == "buy") {
                tradeFunc = e.Buy 
            } else if (task.Action == "sell") {
                tradeFunc = e.Sell 
            } else {
                task.error = "交易方向错误：" + task.Action
                task.finished = true
                return 
            }
        }
        var id = tradeFunc(task.Price, task.Amount)
        if (!id) {
            task.error = "下单失败"
        }
        
        task.finished = true
    }
    
    return self
}

var manager = createManager()
function HandleCommand(signal) {
    // 检测是否收到交互指令
    if (signal) {
        Log("收到交互指令：", signal)     // 收到交互指令，打印交互指令
    } else {
        return                            // 没有收到时直接返回，不做处理
    }
    
    // 检测交互指令是否是测试指令，测试指令可以由当前策略交互控件发出来进行测试
    if (signal.indexOf("TestSignal") != -1) {
        signal = signal.replace("TestSignal:", "")
        // 调用FMZ扩展API接口，模拟Trading View的webhook，交互按钮TestSignal发送的消息：{"Flag":"45M103Buy","Exchange":1,"Currency":"BTC_USDT","ContractType":"swap","Price":"10000","Action":"buy","Amount":"0"}
        commandRobot(BaseUrl, FMZ_AccessKey, FMZ_SecretKey, RobotId, signal)
    } else if (signal.indexOf("evalCode") != -1) {
        var js = signal.split(':', 2)[1]
        Log("执行调试代码:", js)
        eval(js)
    } else {
        // 处理信号指令
        objSignal = JSON.parse(signal)
        if (DiffObject(Template, objSignal)) {
            Log("接收到交易信号指令：", objSignal)
            buffSignal.push(objSignal)
            
            // 检查交易量、交易所编号
            if (!CheckSignal(objSignal)) {
                return
            }
            
            // 创建任务
            manager.newTask(objSignal)
        } else {
            Log("指令无法识别", signal)
        }
    }
}

function main() {
    if (isLogReset) {
        LogReset(1)
    }
    
    Log("WebHook地址:", "https://www.fmz.com/api/v1?access_key=" + FMZ_AccessKey + "&secret_key=" + FMZ_SecretKey + "&method=CommandRobot&args=[" + RobotId + ',+""]', Danger)
    Log("交易类型[ buy:现货买入 , sell:现货卖出 , long:期货做多 , short:期货做空 , closesell:期货买入平空 , closebuy:期货卖出平多]", Danger)
    Log("指令模板:", JSON.stringify(Template), Danger)
    
    while (true) {
        try {
            // 处理交互
            HandleCommand(GetCommand())
            
            // 处理任务
            manager.process()
            
            if (buffSignal.length > maxBuffSignalRowDisplay) {
                buffSignal.shift()
            }
            var buffSignalTbl = {
                "type" : "table",
                "title" : "信号记录",
                "cols" : ["Flag", "Exchange", "Currency", "ContractType", "Price", "Action", "Amount"],
                "rows" : []
            }
            for (var i = buffSignal.length - 1 ; i >= 0 ; i--) {
                buffSignalTbl.rows.push([buffSignal[i].Flag, buffSignal[i].Exchange, buffSignal[i].Currency, buffSignal[i].ContractType, buffSignal[i].Price, buffSignal[i].Action, buffSignal[i].Amount])
            }
            LogStatus(_D(), "\n", "`" + JSON.stringify(buffSignalTbl) + "`")
            Sleep(1000 * SleepInterval)
        } catch (error) {
            Log("e.name:", error.name, "e.stack:", error.stack, "e.message:", error.message)
            Sleep(1000 * 10)
        }
    }
}

```

> Detail

https://www.fmz.com/strategy/413340

> Last Modified

2023-05-09 18:26:32
