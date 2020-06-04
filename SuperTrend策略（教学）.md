
> 策略名称

SuperTrend策略（教学）

> 策略作者

小小梦

> 策略描述

相关文章：https://www.fmz.com/bbs-topic/5438

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Amount|true|一次开仓量|
|TradeInterval|2000|交易接口访问轮询间隔|
|PriceTick|0.5|品种的一跳价格|
|Symbol|quarter|合约代码|
|pd|45|SuperTrend 参数pd|
|factor|3|SuperTrend 参数factor|


> 源码 (javascript)

``` javascript
/*backtest
start: 2019-08-01 00:00:00
end: 2020-03-11 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
*/

// 全局变量
var OpenAmount = 0                                                  // 开仓后持仓的数量
var KeepAmount = 0                                                  // 保留仓位
var IDLE = 0
var LONG = 1
var SHORT = 2
var COVERLONG = 3
var COVERSHORT = 4
var COVERLONG_PART = 5
var COVERSHORT_PART = 6
var OPENLONG = 7
var OPENSHORT = 8

var State = IDLE

// 交易逻辑部分
function GetPosition(posType) {
    var positions = _C(exchange.GetPosition)
    /*
    if(positions.length > 1){
        throw "positions error:" + JSON.stringify(positions)
    }
    */
    var count = 0
    for(var j = 0; j < positions.length; j++){
        if(positions[j].ContractType == Symbol){
            count++
        }
    }

    if(count > 1){
        throw "positions error:" + JSON.stringify(positions)
    }

    for (var i = 0; i < positions.length; i++) {
        if (positions[i].ContractType == Symbol && positions[i].Type === posType) {
            return [positions[i].Price, positions[i].Amount];
        }
    }
    
    Sleep(TradeInterval);
    return [0, 0]
}

function CancelPendingOrders() {
    while (true) {
        var orders = _C(exchange.GetOrders)
        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
            Sleep(TradeInterval);
        }
        if (orders.length === 0) {
            break;
        }
    }
}

function Trade(Type, Price, Amount, CurrPos, OnePriceTick){    // 处理交易
    if(Type == OPENLONG || Type == OPENSHORT){              // 处理开仓
        exchange.SetDirection(Type == OPENLONG ? "buy" : "sell")
        var pfnOpen = Type == OPENLONG ? exchange.Buy : exchange.Sell
        var idOpen = pfnOpen(Price, Amount, CurrPos, OnePriceTick, Type)
        Sleep(TradeInterval)
        if(idOpen) {
            exchange.CancelOrder(idOpen)
        } else {
            CancelPendingOrders()
        }
    } else if(Type == COVERLONG || Type == COVERSHORT){     // 处理平仓
        exchange.SetDirection(Type == COVERLONG ? "closebuy" : "closesell")
        var pfnCover = Type == COVERLONG ? exchange.Sell : exchange.Buy
        var idCover = pfnCover(Price, Amount, CurrPos, OnePriceTick, Type)
        Sleep(TradeInterval)
        if(idCover){
            exchange.CancelOrder(idCover)
        } else {
            CancelPendingOrders()
        }
    } else {
        throw "Type error:" + Type
    }
}

function SuperTrend(r, period, multiplier) {
    // atr
    var atr = talib.ATR(r, period)

    // baseUp , baseDown
    var baseUp = []
    var baseDown = []
    for (var i = 0; i < r.length; i++) {
        if (isNaN(atr[i])) {
            baseUp.push(NaN)
            baseDown.push(NaN)
            continue
        }
        baseUp.push((r[i].High + r[i].Low) / 2 + multiplier * atr[i])
        baseDown.push((r[i].High + r[i].Low) / 2 - multiplier * atr[i])
    }

    // fiUp , fiDown
    var fiUp = []
    var fiDown = []
    var prevFiUp = 0
    var prevFiDown = 0
    for (var i = 0; i < r.length; i++) {
        if (isNaN(baseUp[i])) {
            fiUp.push(NaN)
        } else {
            fiUp.push(baseUp[i] < prevFiUp || r[i - 1].Close > prevFiUp ? baseUp[i] : prevFiUp)
            prevFiUp = fiUp[i]
        }

        if (isNaN(baseDown[i])) {
            fiDown.push(NaN)
        } else {
            fiDown.push(baseDown[i] > prevFiDown || r[i - 1].Close < prevFiDown ? baseDown[i] : prevFiDown)
            prevFiDown = fiDown[i]
        }
    }

    var st = []
    var prevSt = NaN
    for (var i = 0; i < r.length; i++) {
        if (i < period) {
            st.push(NaN)
            continue
        }

        var nowSt = 0
        if (((isNaN(prevSt) && isNaN(fiUp[i - 1])) || prevSt == fiUp[i - 1]) && r[i].Close <= fiUp[i]) {
            nowSt = fiUp[i]
        } else if (((isNaN(prevSt) && isNaN(fiUp[i - 1])) || prevSt == fiUp[i - 1]) && r[i].Close > fiUp[i]) {
            nowSt = fiDown[i]
        } else if (((isNaN(prevSt) && isNaN(fiDown[i - 1])) || prevSt == fiDown[i - 1]) && r[i].Close >= fiDown[i]) {
            nowSt = fiDown[i]
        } else if (((isNaN(prevSt) && isNaN(fiDown[i - 1])) || prevSt == fiDown[i - 1]) && r[i].Close < fiDown[i]) {
            nowSt = fiUp[i]
        }

        st.push(nowSt)
        prevSt = st[i]
    }

    var up = []
    var down = []
    for (var i = 0; i < r.length; i++) {
        if (isNaN(st[i])) {
            up.push(st[i])
            down.push(st[i])
        }

        if (r[i].Close < st[i]) {
            down.push(st[i])
            up.push(NaN)
        } else {
            down.push(NaN)
            up.push(st[i])
        }
    }

    return [up, down]
}

var preTime = 0
function main() {
    exchange.SetContractType(Symbol)
    
    while (1) {
        var r = _C(exchange.GetRecords)
        var currBar = r[r.length - 1]
        if (r.length < pd) {
            Sleep(5000)
            continue    
        }
        
        var st = SuperTrend(r, pd, factor)
             
        $.PlotRecords(r, "K")
        $.PlotLine("L", st[0][st[0].length - 2], r[r.length - 2].Time)
        $.PlotLine("S", st[1][st[1].length - 2], r[r.length - 2].Time)
        
        if(!isNaN(st[0][st[0].length - 2]) && isNaN(st[0][st[0].length - 3])){  
            if (State == SHORT) {
                State = COVERSHORT
            } else if(State == IDLE) {
                State = OPENLONG
            }
        }

        if(!isNaN(st[1][st[1].length - 2]) && isNaN(st[1][st[1].length - 3])){  
            if (State == LONG) {
                State = COVERLONG 
            } else if (State == IDLE) {
                State = OPENSHORT
            }
        }

        // 执行信号
        var pos = null
        var price = null
        if(State == OPENLONG){                          // 开多仓
            pos = GetPosition(PD_LONG)                  // 检查持仓
                                                        // 判断是不是 满足状态，如果满足 修改状态
            if(pos[1] >= Amount){                       // 持仓超过或者等于参数设置的 开仓量
                Sleep(1000)
                $.PlotFlag(currBar.Time, "开多仓", 'OL') // 标记
                
                OpenAmount = pos[1]                     // 记录开仓数
                State = LONG                            // 标记为 做多状态
                continue
            }
            price = currBar.Close - (currBar.Close % PriceTick) + PriceTick * 2     // 计算价格
            Trade(OPENLONG, price, Amount - pos[1], pos, PriceTick)                 // 下单函数 (Type, Price, Amount, CurrPos, PriceTick)
        }

        if(State == OPENSHORT){                         // 开空仓
            pos = GetPosition(PD_SHORT)                 // 检查持仓
            if(pos[1] >= Amount){
                Sleep(1000)
                $.PlotFlag(currBar.Time, "开空仓", 'OS')
                
                OpenAmount = pos[1]
                State = SHORT
                continue
            }
            price = currBar.Close - (currBar.Close % PriceTick) - PriceTick * 2
            Trade(OPENSHORT, price, Amount - pos[1], pos, PriceTick)
        }

        if(State == COVERLONG){                                         // 处理平多仓
            pos = GetPosition(PD_LONG)                                  // 获取持仓信息
            if(pos[1] == 0){                                            // 判断持仓是否为 0
                $.PlotFlag(currBar.Time, "平多仓", '----CL')             // 标记
                State = IDLE
                continue
            }
            price = currBar.Close - (currBar.Close % PriceTick) - PriceTick * 2
            Trade(COVERLONG, price, pos[1], pos, PriceTick)
        }
    
        if(State == COVERSHORT){                                        // 处理做多仓
            pos = GetPosition(PD_SHORT)
            if(pos[1] == 0){
                $.PlotFlag(currBar.Time, "平空仓", '----CS')
                State = IDLE
                continue
            }
            price = currBar.Close - (currBar.Close % PriceTick) + PriceTick * 2
            Trade(COVERSHORT, price, pos[1], pos, PriceTick)
        }

        if(State == COVERLONG_PART) {                                   // 部分平多仓
            pos = GetPosition(PD_LONG)                                  // 获取持仓
            if(pos[1] <= KeepAmount){                                   // 持仓小于等于 保持量，本次平仓完成
                $.PlotFlag(currBar.Time, "平多仓,保留：" + KeepAmount, '----CL')     // 标记
                State = pos[1] == 0 ? IDLE : LONG                                  // 更新状态
                continue
            }
            price = currBar.Close - (currBar.Close % PriceTick) - PriceTick * 2
            Trade(COVERLONG, price, pos[1] - KeepAmount, pos, PriceTick)
        }

        if(State == COVERSHORT_PART){
            pos = GetPosition(PD_SHORT)
            if(pos[1] <= KeepAmount){
                $.PlotFlag(currBar.Time, "平空仓,保留：" + KeepAmount, '----CS')
                State = pos[1] == 0 ? IDLE : SHORT
                continue
            }
            price = currBar.Close - (currBar.Close % PriceTick) + PriceTick * 2
            Trade(COVERSHORT, price, pos[1] - KeepAmount, pos, PriceTick)
        }

        LogStatus(_D())
        Sleep(1000)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/201837

> 更新时间

2020-04-24 14:34:33
