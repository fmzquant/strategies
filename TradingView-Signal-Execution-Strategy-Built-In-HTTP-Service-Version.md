
> Name

TradingView-Signal-Execution-Strategy-Built-In-HTTP-Service-Version

> Author

发明者量化-小小梦

> Strategy Description

Related article:

> https://www.fmz.com/digest-topic/10556

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|port|Port used by the built-in HTTP service.|Port|
|ipWhiteList|IP address whitelist. If left unset, no validation is performed.|IP address whitelist|
|passPhrase|If left unset, no validation is performed.|Verification passphrase|
|serverIP|Server IP address.|Server IP|
|SleepInterval|Main loop polling interval.|Polling interval|
|maxBuffSignalRowDisplay|Maximum number of displayed signal rows.|Maximum displayed signal rows|
|initCode|Code executed during initialization. For example, to test a simulated environment, switch the Binance futures base URL with exchange.SetBase("https://testnet.binancefuture.com"); or switch to the OKX simulated environment with exchange.IO("simulate", true).|Initialization code to execute|
|isResetLog|Reset log|Reset log|

|Button|Default|Description|
|----|----|----|
|TestSignal|Signal test.|Signal test|

> Source (javascript)

``` javascript
//信号结构
var Template = {
    Flag: "45M103Buy",     // 标识,可随意指定
    Exchange: 1,           // 指定交易所交易对
    Currency: "BTC_USDT",  // 交易对
    ContractType: "spot",  // 合约类型,swap,quarter,next_quarter,现货填写spot
    Price: "{{close}}",    // 开仓或者平仓价格,-1为市价
    Action: "buy",         // 交易类型[ buy:现货买入 , sell:现货卖出 , long:期货做多 , short:期货做空 , closesell:期货买入平空 , closebuy:期货卖出平多]
    Amount: "1",           // 交易量
}

var Success = "#5cb85c"    // 成功颜色
var Danger = "#ff0000"     // 危险颜色
var Warning = "#f0ad4e"    // 警告颜色
var buffSignal = []

// Http服务
function serverFunc(ctx, ipWhiteList, passPhrase) {
    var path = ctx.path()
    if (path == "/CommandRobot") {
        // 校验IP地址
        var fromIP = ctx.remoteAddr().split(":")[0]        
        if (ipWhiteList && ipWhiteList.length > 0) {
            var ipList = ipWhiteList.split(",")
            if (!ipList.includes(fromIP)) {
                ctx.setStatus(500)
                ctx.write("IP address not in white list")
                Log("500 Error: IP address not in white list", "#FF0000")
                return 
            }
        }

        // 校验口令
        var pass = ctx.rawQuery().length > 0 ? ctx.query("passPhrase") : ""
        if (passPhrase && passPhrase.length > 0) {
            if (pass != passPhrase) {
                ctx.setStatus(500)
                ctx.write("Authentication failed")
                Log("500 Error: Authentication failed", "#FF0000")
                return 
            }
        }

        var body = JSON.parse(ctx.body())
        threading.mainThread().postMessage(JSON.stringify(body))
        ctx.write("OK")
        // 200
    } else {
        ctx.setStatus(404)
    }
}

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

// 信号处理对象
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

function main() {
    // 重置日志信息
    if (isResetLog) {
        LogReset(1)
    }

    Log("交易类型[ buy:现货买入 , sell:现货卖出 , long:期货做多 , short:期货做空 , closesell:期货买入平空 , closebuy:期货卖出平多]", Danger)
    Log("指令模板:", JSON.stringify(Template), Danger)    
    if (!passPhrase || passPhrase.length == 0) {
        Log("webhook url:", `http://${serverIP}:${port}/CommandRobot`)
    } else {
        Log("webhook url:", `http://${serverIP}:${port}/CommandRobot?passPhrase=${passPhrase}`)
    }

    // 创建Http内置服务
    __Serve("http://0.0.0.0:" + port, serverFunc, ipWhiteList, passPhrase)

    // 初始化执行的代码
    if (initCode && initCode.length > 0) {
        try {
            Log("执行初始化代码：", initCode)
            eval(initCode)
        } catch(error) {
            Log("e.name:", error.name, "e.stack:", error.stack, "e.message:", error.message)
        }
    }    

    // 创建信号管理对象
    var manager = createManager()
    
    while (true) {
        try {
            // 检测交互控件，用于测试
            var cmd = GetCommand()
            if (cmd) {
                // 发送Http请求，模拟测试
                var arrCmd = cmd.split(":", 2)
                if (arrCmd[0] == "TestSignal") {
                    // {"Flag":"TestSignal","Exchange":1,"Currency":"BTC_USDT","ContractType":"swap","Price":"10000","Action":"long","Amount":"1"}
                    var signal = cmd.replace("TestSignal:", "")
                    if (!passPhrase || passPhrase.length == 0) {
                        var ret = HttpQuery(`http://${serverIP}:${port}/CommandRobot`, {"method": "POST", "body": signal})
                        Log("测试请求的应答:", ret)
                    } else {
                        var ret = HttpQuery(`http://${serverIP}:${port}/CommandRobot?passPhrase=${passPhrase}`, {"method": "POST", "body": signal})
                        Log("测试请求的应答:", ret)
                    }                    
                }
            }

            // 检测内置Http服务收到请求之后通知主线程的消息，写入manager对象的任务队列
            var msg = threading.mainThread().peekMessage(-1)
            if (msg) {
                Log("收到消息 msg:", msg)
                var objSignal = JSON.parse(msg)
                if (DiffObject(Template, objSignal)) {
                    Log("接收到交易信号指令：", objSignal)
                    buffSignal.push(objSignal)
                    
                    // 检查交易量、交易所编号
                    if (!CheckSignal(objSignal)) {
                        continue
                    }
                    
                    // 创建任务
                    if (objSignal["Flag"] == "TestSignal") {
                        Log("收到测试消息：", JSON.stringify(objSignal))
                    } else {
                        manager.newTask(objSignal)
                    }                    
                } else {
                    Log("指令无法识别", signal)
                }
            } else {
                Sleep(1000 * SleepInterval)
            }

            // 处理任务
            manager.process()
            
            // 状态栏显示信号
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
        } catch (error) {
            Log("e.name:", error.name, "e.stack:", error.stack, "e.message:", error.message)
        }        
    }
}

```

> Detail

https://www.fmz.com/strategy/475235

> Last Modified

2024-12-17 16:05:06
