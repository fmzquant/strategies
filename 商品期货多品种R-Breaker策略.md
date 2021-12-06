
> 策略名称

商品期货多品种R-Breaker策略

> 策略作者

雨幕

> 策略描述

- 只支持操作CTP商品期货
- 支持自动或手动恢复进度
- 可同时操作多个不同品种
- 增加时间段区分与各种网络错误问题的应对处理

基于[CTP商品期货多品种海龟交易策略](https://www.fmz.cn/strategy/17289)修改，用于学习。

相关文章：
https://www.fmz.cn/digest-topic/8047


> 策略参数



|参数|默认值|描述|
|----|----|----|
|Instruments|rb888,MA888,jd888|合约列表|
|LoopInterval|3|轮询周期(秒)|
|RMode|0|进度恢复模式: 自动|手动|
|VMStatus|{}|手动恢复字符串|
|WXPush|true|推送交易信息|
|MaxTaskRetry|5|开仓最多重试次数|
|KeepRatio|10|预留保证金比例|
|isReset|false|重置所有数据|




|按钮|默认值|描述|
|----|----|----|
|暂停/继续|__button__|暂停/继续|


> 源码 (javascript)

``` javascript
/*backtest
start: 2021-06-01 09:00:00
end: 2021-09-25 15:00:00
period: 1d
basePeriod: 5m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["Instruments","rb2201,MA201,j2201,i2201,p2201,AP201"]]
*/

// 类库交易对象
var _bot = $.NewPositionManager()
// 画图相关全局变量
var arrChart = []
var Index = 0

var Manager = {
    New: function(needRestore, symbol, keepBalance, index) {
        var symbolDetail = _C(exchange.SetContractType, symbol)
        if (symbolDetail.VolumeMultiple == 0 || symbolDetail.MaxLimitOrderVolume == 0 || symbolDetail.MinLimitOrderVolume == 0 || symbolDetail.LongMarginRatio == 0 || symbolDetail.ShortMarginRatio == 0) {
            Log(symbolDetail)
            throw "合约信息异常"
        } else {
            Log("合约", symbolDetail.InstrumentName, "一手", symbolDetail.VolumeMultiple, "份, 最大下单量", symbolDetail.MaxLimitOrderVolume, "保证金率:", _N(symbolDetail.LongMarginRatio), _N(symbolDetail.ShortMarginRatio), "交割日期", symbolDetail.StartDelivDate)
        }

        // 声明枚举量
        var ACT_IDLE = 0
        var ACT_LONG = 1
        var ACT_SHORT = 2
        var ACT_COVER = 3

        var ERR_SUCCESS = 0
        var ERR_SET_SYMBOL = 1
        var ERR_GET_ORDERS = 2
        var ERR_GET_POS = 3
        var ERR_TRADE = 4
        var ERR_GET_DEPTH = 5
        var ERR_NOT_TRADING = 6
        var errMsg = ["成功", "切换合约失败", "获取订单失败", "获取持仓失败", "交易下单失败", "获取深度失败", "不在交易时间"]

        // 构造对象
        var obj = {
            symbol: symbol,
            keepBalance: keepBalance,
        }

        // 初始化任务对象
        obj.task = {
            action: ACT_IDLE,
            amount: 0,
            dealAmount: 0,
            avgPrice: 0,
            preCost: 0,
            preAmount: 0,
            init: false,
            retry: 0,
            desc: "空闲",
            onFinish: null
        }

        obj.lastPrice = 0
        obj.symbolDetail = symbolDetail

        // 策略运行时数据
        obj.currHigh = null 
        obj.currLow = null 
        obj.pivot = null 
        obj.resistancePrice1 = null
        obj.resistancePrice2 = null 
        obj.resistancePrice3 = null 
        obj.strutPrice1 = null 
        obj.strutPrice2 = null 
        obj.strutPrice3 = null 
        obj.records = null 
        obj.index = index
        obj.preBarTime = 0
        obj.backhand = 0
        obj.isBannedTrade = false

        // 持仓状态信息
        obj.status = {
            symbol: symbol,
            recordsLen: 0,
            vm: [],
            open: 0,
            cover: 0,
            st: 0,
            marketPosition: 0,
            lastPrice: 0,
            holdPrice: 0,
            holdAmount: 0,
            holdProfit: 0,

            symbolDetail: symbolDetail,
            lastErr: "",
            lastErrTime: "",
            // 可以增加一些显示的数值属性
            currHigh: null,
            currLow: null,
            pivot: null,
            resistancePrice1: null,
            resistancePrice2: null,
            resistancePrice3: null,
            strutPrice1: null,
            strutPrice2: null,
            strutPrice3: null,

            isTrading: false
        }

        // 设置错误的功能函数
        obj.setLastError = function(err) {
            if (typeof(err) === 'undefined' || err === '') {
                obj.status.lastErr = ""
                obj.status.lastErrTime = ""
                return
            }
            var t = new Date()
            obj.status.lastErr = err
            obj.status.lastErrTime = t.toLocaleString()
        }

        // 恢复函数
        obj.reset = function(marketPosition) {
            if (typeof(marketPosition) !== 'undefined') {
                obj.marketPosition = marketPosition
                var pos = _bot.GetPosition(obj.symbol, marketPosition > 0 ? PD_LONG : PD_SHORT)
                if (pos) {
                    obj.holdPrice = pos.Price
                    obj.holdAmount = pos.Amount
                    Log(obj.symbol, "仓位", pos)
                } else {
                    throw "恢复" + obj.symbol + "的持仓状态出错, 没有找到仓位信息"
                }
                Log("恢复", obj.symbol, "持仓均价:", obj.holdPrice, "持仓数量:", obj.holdAmount)
                obj.status.vm = [obj.marketPosition]
            } else {
                obj.marketPosition = 0
                obj.holdPrice = 0                
                obj.holdAmount = 0
                obj.holdProfit = 0
            }
            obj.holdProfit = 0
            obj.lastErr = ""
            obj.lastErrTime = ""
        }

        // 更新状态，返回用于显示的状态数据
        obj.Status = function() {            
            obj.status.marketPosition = obj.marketPosition
            obj.status.holdPrice = obj.holdPrice
            obj.status.holdAmount = obj.holdAmount
            obj.status.lastPrice = obj.lastPrice
            if (obj.lastPrice > 0 && obj.holdAmount > 0 && obj.marketPosition !== 0) {
                // 计算收益
                obj.status.holdProfit = _N((obj.lastPrice - obj.holdPrice) * obj.holdAmount * symbolDetail.VolumeMultiple, 4) * (obj.marketPosition > 0 ? 1 : -1)
            } else {
                obj.status.holdProfit = 0
            }
            return obj.status
        }

        // 处理交易的逻辑层面，设置交易任务的函数
        obj.setTask = function(action, amount, onFinish) {
            obj.task.init = false
            obj.task.retry = 0
            obj.task.action = action
            obj.task.preAmount = 0
            obj.task.preCost = 0
            obj.task.amount = typeof(amount) === 'number' ? amount : 0
            obj.task.onFinish = onFinish
            if (action == ACT_IDLE) {
                obj.task.desc = "空闲"
                obj.task.onFinish = null
            } else {
                if (action !== ACT_COVER) {
                    obj.task.desc = (action == ACT_LONG ? "加多仓" : "加空仓") + "(" + amount + ")"
                } else {
                    obj.task.desc = "平仓"
                }
                Log("接收到任务", obj.symbol, obj.task.desc)
                // process immediately
                obj.Poll(true)
            }
        }

        // 处理交易任务的函数
        obj.processTask = function() {
            var insDetail = exchange.SetContractType(obj.symbol)
            if (!insDetail) {
                return ERR_SET_SYMBOL
            }
            var SlideTick = 1
            var ret = false
            if (obj.task.action == ACT_COVER) {
                var hasPosition = false
                do {
                    if (!$.IsTrading(obj.symbol)) {
                        return ERR_NOT_TRADING
                    }
                    hasPosition = false
                    var positions = exchange.GetPosition()
                    if (!positions) {
                        return ERR_GET_POS
                    }
                    var depth = exchange.GetDepth()
                    if (!depth) {
                        return ERR_GET_DEPTH
                    }
                    var orderId = null
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i].ContractType !== obj.symbol) {
                            continue
                        }
                        var amount = Math.min(insDetail.MaxLimitOrderVolume, positions[i].Amount)
                        if (positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) {
                            exchange.SetDirection(positions[i].Type == PD_LONG ? "closebuy_today" : "closebuy")
                            orderId = exchange.Sell(_N(depth.Bids[0].Price - (insDetail.PriceTick * SlideTick), 2), Math.min(amount, depth.Bids[0].Amount), obj.symbol, positions[i].Type == PD_LONG ? "平今" : "平昨", 'Bid', depth.Bids[0])
                            hasPosition = true
                        } else if (positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) {
                            exchange.SetDirection(positions[i].Type == PD_SHORT ? "closesell_today" : "closesell")
                            orderId = exchange.Buy(_N(depth.Asks[0].Price + (insDetail.PriceTick * SlideTick), 2), Math.min(amount, depth.Asks[0].Amount), obj.symbol, positions[i].Type == PD_SHORT ? "平今" : "平昨", 'Ask', depth.Asks[0])
                            hasPosition = true
                        }
                    }
                    if (hasPosition) {
                        if (!orderId) {
                            return ERR_TRADE
                        }
                        Sleep(1000)
                        while (true) {
                            // Wait order, not retry
                            var orders = exchange.GetOrders()
                            if (!orders) {
                                return ERR_GET_ORDERS
                            }
                            if (orders.length == 0) {
                                break
                            }
                            for (var i = 0; i < orders.length; i++) {
                                exchange.CancelOrder(orders[i].Id)
                                Sleep(500)
                            }
                        }
                    }
                } while (hasPosition)
                ret = true
            } else if (obj.task.action == ACT_LONG || obj.task.action == ACT_SHORT) {
                do {
                    if (!$.IsTrading(obj.symbol)) {
                        return ERR_NOT_TRADING
                    }
                    Sleep(1000)
                    while (true) {
                        // Wait order, not retry
                        var orders = exchange.GetOrders()
                        if (!orders) {
                            return ERR_GET_ORDERS
                        }
                        if (orders.length == 0) {
                            break
                        }
                        for (var i = 0; i < orders.length; i++) {
                            exchange.CancelOrder(orders[i].Id)
                            Sleep(500)
                        }
                    }
                    var positions = exchange.GetPosition()
                    // Error
                    if (!positions) {
                        return ERR_GET_POS
                    }
                    // search position
                    var pos = null
                    for (var i = 0; i < positions.length; i++) {
                        if (positions[i].ContractType == obj.symbol && (((positions[i].Type == PD_LONG || positions[i].Type == PD_LONG_YD) && obj.task.action == ACT_LONG) || ((positions[i].Type == PD_SHORT || positions[i].Type == PD_SHORT_YD) && obj.task.action == ACT_SHORT))) {
                            if (!pos) {
                                pos = positions[i]
                                pos.Cost = positions[i].Price * positions[i].Amount
                            } else {
                                pos.Amount += positions[i].Amount
                                pos.Profit += positions[i].Profit
                                pos.Cost += positions[i].Price * positions[i].Amount
                            }
                        }
                    }
                    // record pre position
                    if (!obj.task.init) {
                        obj.task.init = true
                        if (pos) {
                            obj.task.preAmount = pos.Amount
                            obj.task.preCost = pos.Cost
                        } else {
                            obj.task.preAmount = 0
                            obj.task.preCost = 0
                        }
                    }
                    var remain = obj.task.amount
                    if (pos) {
                        obj.task.dealAmount = pos.Amount - obj.task.preAmount
                        remain = parseInt(obj.task.amount - obj.task.dealAmount)
                        if (remain <= 0 || obj.task.retry >= MaxTaskRetry) {
                            ret = {
                                price: (pos.Cost - obj.task.preCost) / (pos.Amount - obj.task.preAmount),
                                amount: (pos.Amount - obj.task.preAmount),
                                position: pos
                            }
                            break
                        }
                    } else if (obj.task.retry >= MaxTaskRetry) {
                        ret = null
                        break
                    }

                    var depth = exchange.GetDepth()
                    if (!depth) {
                        return ERR_GET_DEPTH
                    }
                    var orderId = null
                    if (obj.task.action == ACT_LONG) {
                        exchange.SetDirection("buy")
                        orderId = exchange.Buy(_N(depth.Asks[0].Price + (insDetail.PriceTick * SlideTick), 2), Math.min(remain, depth.Asks[0].Amount), obj.symbol, 'Ask', depth.Asks[0])
                    } else {
                        exchange.SetDirection("sell")
                        orderId = exchange.Sell(_N(depth.Bids[0].Price - (insDetail.PriceTick * SlideTick), 2), Math.min(remain, depth.Bids[0].Amount), obj.symbol, 'Bid', depth.Bids[0])
                    }
                    // symbol not in trading or other else happend
                    if (!orderId) {
                        obj.task.retry++
                        return ERR_TRADE
                    }
                } while (true)
            }
            if (obj.task.onFinish) {
                obj.task.onFinish(ret)
            }
            obj.setTask(ACT_IDLE)
            return ERR_SUCCESS
        }

        // 策略逻辑执行函数
        obj.Poll = function(subroutine) {
        	// 判断交易时段
            obj.status.isTrading = $.IsTrading(obj.symbol)
            if (!obj.status.isTrading) {
                return
            }

            // 执行下单交易任务
            if (obj.task.action != ACT_IDLE) {
                var retCode = obj.processTask()
                if (obj.task.action != ACT_IDLE) {
                    obj.setLastError("任务没有处理成功: " + errMsg[retCode] + ", " + obj.task.desc + ", 重试: " + obj.task.retry)
                } else {
                    obj.setLastError()
                }
                return
            }
            // 调用Poll时如果设置了subroutine参数，只运行到此处，这个是程序设计的一个小技巧
            if (typeof(subroutine) !== 'undefined' && subroutine) {
                return
            }

            // 根据参数设置微信推送
            var suffix = WXPush ? '@' : ''
            // switch symbol
            _C(exchange.SetContractType, obj.symbol)

            // 获取K线数据
            var records = exchange.GetRecords(PERIOD_D1)
            if (!records) {
                obj.setLastError("获取K线失败")
                return
            }
            obj.status.recordsLen = records.length

            if (records.length < 2) {
                obj.setLastError("K线数据长度不足2")
                return
            }

            // 0: IDLE 空闲, 1: LONG 做多, 2: SHORT 做空, 3: CoverALL 当前合约全部平仓。opCode 是操作码，以下策略逻辑检测到条件后设置对应的操作码
            var opCode = 0
            var lastPrice = records[records.length - 1].Close
            obj.lastPrice = lastPrice

            // 记录当日最高最低价
            obj.currHigh = records[records.length - 1].High 
            obj.currLow = records[records.length - 1].Low
            obj.status.currHigh = obj.currHigh 
            obj.status.currLow = obj.currLow

            // 计算阻力位、支撑位
            obj.records = records
            var preBar = records[records.length - 2]
            obj.pivot = (preBar.High + preBar.Low + preBar.Close) / 3
            obj.resistancePrice1 = 2 * obj.pivot - preBar.Low
            obj.resistancePrice2 = obj.pivot + (preBar.High - preBar.Low)
            obj.resistancePrice3 = preBar.High + 2 * (obj.pivot - preBar.Low)
            obj.strutPrice1 = 2 * obj.pivot - preBar.High
            obj.strutPrice2 = obj.pivot - (preBar.High - preBar.Low)
            obj.strutPrice3 = preBar.Low - 2 * (preBar.High - obj.pivot)
            // 更新obj.status
            obj.status.pivot = obj.pivot
            obj.status.resistancePrice1 = obj.resistancePrice1
            obj.status.resistancePrice2 = obj.resistancePrice2
            obj.status.resistancePrice3 = obj.resistancePrice3
            obj.status.strutPrice1 = obj.strutPrice1
            obj.status.strutPrice2 = obj.strutPrice2
            obj.status.strutPrice3 = obj.strutPrice3
            
            // 下午收盘清仓
            if (new Date().getHours() == 14 && new Date().getMinutes() > 58 && obj.marketPosition != 0) {
            	// 设置回调，清空保存的持久化数据
                obj.setTask(ACT_COVER, 0, function(ret) {
                    obj.reset()
                    _G(obj.symbol, null)
                })
                obj.isBannedTrade = true 
                return
            }

            // 临近收盘禁止开仓
            if (records[records.length - 1].Time != obj.preBarTime) {
                obj.isBannedTrade = false 
            }
            if (obj.isBannedTrade) {
                return 
            }

            // 策略逻辑
            // 不持仓时
            if (obj.marketPosition === 0) {
                // 根据交易逻辑赋值opCode信号，程序后续根据信号处理
                if(lastPrice > obj.resistancePrice3 || obj.backhand > 0) {           
                    opCode = 1
                } else if (lastPrice < obj.strutPrice3 || obj.backhand < 0) {   
                    opCode = 2
                }
                // 反手后重置
                if (obj.backhand != 0) {
                    obj.backhand = 0
                }
            } else {
                if(obj.marketPosition > 0 && (obj.currHigh > obj.resistancePrice2 && lastPrice < obj.resistancePrice1 || lastPrice < obj.strutPrice3)) {           // 持多仓
                    opCode = 3
                    // 平仓后反手做空
                    obj.backhand = -1
                } else if (obj.marketPosition < 0 && (obj.currLow < obj.strutPrice2 && lastPrice > obj.strutPrice1 || lastPrice > obj.resistancePrice3)) {         // 持空仓
                    opCode = 3
                    // 平仓后反手做多
                    obj.backhand = 1   
                }
            }
            
            // 如果不触发任何条件，操作码为0，返回
            if (opCode == 0) {
                return
            }

            // 执行平仓
            if (opCode == 3) {
                obj.setTask(ACT_COVER, 0, function(ret) {   
                    obj.reset()
                    _G(obj.symbol, null)
                })
                return
            }

            var account = _bot.GetAccount()
            var canOpen = parseInt((account.Balance-obj.keepBalance) / (opCode == 1 ? obj.symbolDetail.LongMarginRatio : obj.symbolDetail.ShortMarginRatio) / (lastPrice * 1.2) / obj.symbolDetail.VolumeMultiple)
            var unit = Math.min(1, canOpen)    
            // 设置交易任务
            obj.setTask((opCode == 1 ? ACT_LONG : ACT_SHORT), unit, function(ret) {
                if (!ret) {
                    obj.setLastError("下单失败")
                    return
                }                
                obj.holdPrice = ret.position.Price
                obj.holdAmount = ret.position.Amount
                obj.marketPosition += opCode == 1 ? 1 : -1
                obj.status.vm = [obj.marketPosition]
                _G(obj.symbol, obj.status.vm)
            })
        }

        // 增加图表结构
        obj.objChart = {                                        
            __isStock: true,    
            extension: {
                layout: 'single', 
                height: 600, 
            },
            title : { text : obj.symbol},
            yAxis: {
                plotLines: [
                    {value: 0,color: 'red',width: 1,label: {text: '阻力1',align: 'center'}}, 
                    {value: 0,color: 'red',width: 1,label: {text: '阻力2',align: 'center'}}, 
                    {value: 0,color: 'red',width: 1,label: {text: '阻力3',align: 'center'}}, 
                    {value: 0,color: 'green',width: 1,label: {text: '支撑1',align: 'center'}},
                    {value: 0,color: 'green',width: 1,label: {text: '支撑2',align: 'center'}},
                    {value: 0,color: 'green',width: 1,label: {text: '支撑3',align: 'center'}},
                ]
            },
            xAxis: { type: 'datetime'},            
            series : [                                          
                {                                      
                    type: 'candlestick',                         
                    name: 'k',   
                    id: 'k',                                     
                    data: []                                           
                }
            ]
        }

        // 新增画图函数
        obj.PlotRecords = function(chart) {
            var r = obj.records
            if(!r || r.length < 2) {
                return 
            }
            for (var j = 0; j < r.length; j++) {
                if (r[j].Time == obj.preBarTime) {    
                    chart.add(obj.index, [r[j].Time, r[j].Open, r[j].High, r[j].Low, r[j].Close], -1)  
                } else if (r[j].Time > obj.preBarTime) {   
                    obj.preBarTime = r[j].Time             
                    chart.add(obj.index, [r[j].Time, r[j].Open, r[j].High, r[j].Low, r[j].Close])
                }
            }
            obj.objChart.yAxis.plotLines[0].value = _N(obj.resistancePrice1, 3)  // 阻力1
            obj.objChart.yAxis.plotLines[0].label.text = "阻力1：" + _N(obj.resistancePrice1, 3)
            obj.objChart.yAxis.plotLines[1].value = _N(obj.resistancePrice2, 3)
            obj.objChart.yAxis.plotLines[1].label.text = "阻力2：" + _N(obj.resistancePrice2, 3)
            obj.objChart.yAxis.plotLines[2].value = _N(obj.resistancePrice3, 3)
            obj.objChart.yAxis.plotLines[2].label.text = "阻力3：" + _N(obj.resistancePrice3, 3)

            obj.objChart.yAxis.plotLines[3].value = _N(obj.strutPrice1, 3)       // 支撑1
            obj.objChart.yAxis.plotLines[3].label.text = "支撑1：" + _N(obj.strutPrice1, 3)
            obj.objChart.yAxis.plotLines[4].value = _N(obj.strutPrice2, 3)
            obj.objChart.yAxis.plotLines[4].label.text = "支撑2：" + _N(obj.strutPrice2, 3)
            obj.objChart.yAxis.plotLines[5].value = _N(obj.strutPrice3, 3)
            obj.objChart.yAxis.plotLines[5].label.text = "支撑3：" + _N(obj.strutPrice3, 3)
        }

        // 对象构造函数New函数的其它处理工作
        var vm = null
        if (RMode === 0) {
            vm = _G(obj.symbol)
        } else {
            vm = JSON.parse(VMStatus)[obj.symbol]
        }
        if (vm) {
            Log("准备恢复进度, 当前合约状态为", vm)
            obj.reset(vm[0])
        } else {
            if (needRestore) {
                Log("没有找到" + obj.symbol + "的进度恢复信息")
            }
            obj.reset()
        }
        return obj
    }
}

function onexit() {
    Log("已退出策略...")
}

function main() {
    if (isReset) {
        _G(null)
        LogReset(1)
        LogProfitReset()
        LogVacuum()
        Log("重置所有数据", "#FF0000")
    }

    if (exchange.GetName().indexOf('CTP') == -1) {
        throw "只支持商品期货CTP"
    }
    SetErrorFilter("login|ready|流控|连接失败|初始|Timeout")
    var mode = exchange.IO("mode", 0)
    if (typeof(mode) !== 'number') {
        throw "切换模式失败, 请更新到最新托管者!"
    }
    while (!exchange.IO("status")) {
        Sleep(3000)
        LogStatus("正在等待与交易服务器连接, " + new Date())
    }
    var positions = _C(exchange.GetPosition)
    if (positions.length > 0) {
        Log("检测到当前持有仓位, 系统将开始尝试恢复进度...")
        Log("持仓信息", positions)
    }

    var initAccount = _bot.GetAccount()
    // 恢复记录
    var recoveryInitAcc = _G("initAccount")
    if (!recoveryInitAcc) {
    	// 不存在恢复的数据，使用当前数据初始化
        _G("initAccount", initAccount)
    } else {
    	// 存在恢复的数据，恢复初始账户数据
    	initAccount = recoveryInitAcc
    }

    var initMargin = JSON.parse(exchange.GetRawJSON()).CurrMargin
    var keepBalance = _N((initAccount.Balance + initMargin) * (KeepRatio/100), 3)
    Log("资产信息", initAccount, "保留资金:", keepBalance)
    
    var tts = []
    var filter = []
    var arr = Instruments.split(',')
    for (var i = 0; i < arr.length; i++) {
        var symbol = arr[i].replace(/^\s+/g, "").replace(/\s+$/g, "")
        if (typeof(filter[symbol]) !== 'undefined') {
            throw symbol + "已经存在，请检查参数!"
        }
        filter[symbol] = true
        var hasPosition = false
        for (var j = 0; j < positions.length; j++) {
            if (positions[j].ContractType == symbol) {
                hasPosition = true
                break
            }
        }

        var obj = Manager.New(hasPosition, symbol, keepBalance, Index)
        tts.push(obj)
        arrChart.push(obj.objChart)
        // 图表数据系列索引
        Index += 1   
    }

    // 创建图表对象
    var chart = Chart(arrChart)
    chart.reset()
    
    var printProfitTS = 0
    var preTotalHold = -1
    var lastStatus = ''
    while (true) {
    	// 交互
    	var cmd = GetCommand()
    	if (cmd) {
            if (cmd === "暂停/继续") {
                Log("暂停交易中...")
                while (GetCommand() !== "暂停/继续") {
                    Sleep(1000)
                }
                Log("继续交易中...")
            }
            Log("交互命令：", cmd)
            var arr = cmd.split(":") 
            if(arr[0] == "cover") {
            	var index = parseFloat(arr[1])
            	// 对指定的交易所对象，执行平仓
                tts[index].setTask(ACT_COVER, 0, function(ret) {
                    tts[index].reset()
                    _G(tts[index].symbol, null)
                })
            }
        }
        while (!exchange.IO("status")) {
            Sleep(3000)
            LogStatus("正在等待与交易服务器连接, " + new Date() + "\n" + lastStatus)
        }

        var tblStatus = {
            type: "table",
            title: "持仓信息",
            cols: ["合约名称", "持仓方向", "持仓均价", "持仓数量", "持仓盈亏", "加仓次数", "当前价格", "操作"],
            rows: []
        }
        var tblMarket = {
            type: "table",
            title: "运行状态",
            cols: ["合约名称", "合约乘数", "保证金率", "交易时间", "柱线长度", "异常描述", "发生时间"],
            rows: []
        }
        var totalHold = 0
        var vmStatus = {}
        var ts = new Date().getTime()
        var holdSymbol = 0
        for (var i = 0; i < tts.length; i++) {
            tts[i].Poll()
            var d = tts[i].Status()
            if (d.holdAmount > 0) {
                vmStatus[d.symbol] = d.vm
                holdSymbol++
            }            
            tblStatus.rows.push([d.symbolDetail.InstrumentName, d.holdAmount == 0 ? '--' : (d.marketPosition > 0 ? '多' : '空'), d.holdPrice, d.holdAmount, d.holdProfit, Math.abs(d.marketPosition), d.lastPrice, {'type':'button', 'cmd': 'cover:' + String(i), 'name': '平仓'}])  // 加入交互按钮
            tblMarket.rows.push([d.symbolDetail.InstrumentName, d.symbolDetail.VolumeMultiple, _N(d.symbolDetail.LongMarginRatio, 4) + '/' + _N(d.symbolDetail.ShortMarginRatio, 4), (d.isTrading ? '是#0000ff' : '否#ff0000'), d.recordsLen, d.lastErr, d.lastErrTime])
            totalHold += Math.abs(d.holdAmount)
            // 写入画图数据
            tts[i].PlotRecords(chart)
        }
        // 更新图表
        chart.update(arrChart)

        // 显示状态栏信息
        var now = new Date()
        var elapsed = now.getTime() - ts
        var tblAssets = _bot.GetAccount(true)
        var nowAccount = _bot.Account()       
        if (tblAssets.rows.length > 10) {
            // replace AccountId
            tblAssets.rows[0] = ["InitAccount", "初始资产", initAccount]
        } else {
            tblAssets.rows.unshift(["NowAccount", "当前可用", nowAccount], ["InitAccount", "初始资产", initAccount])
        }
        lastStatus = '`' + JSON.stringify([tblStatus, tblMarket, tblAssets]) + '`\n轮询耗时: ' + elapsed + ' 毫秒, 当前时间: ' + now.toLocaleString() + ', 星期' + ['日', '一', '二', '三', '四', '五', '六'][now.getDay()] + ", 持有品种个数: " + holdSymbol
        if (totalHold > 0) {
            lastStatus += "\n手动恢复字符串: " + JSON.stringify(vmStatus)
        }
        LogStatus(lastStatus)
        preTotalHold = totalHold

        // 定时打印一次
        if (ts - printProfitTS > 1000 * 60 * 60 * 24 && !IsVirtual()) {
            LogProfit(nowAccount.Info.Balance - initAccount.Info.Balance)
            printProfitTS = ts
        }
        Sleep(LoopInterval * 1000)
    }
}
```

> 策略出处

https://www.fmz.cn/strategy/319255

> 更新时间

2021-10-26 10:17:55
