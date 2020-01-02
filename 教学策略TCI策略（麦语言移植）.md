
> 策略名称

教学策略TCI策略（麦语言移植）

> 策略作者

小小梦





> 源码 (javascript)

``` javascript
/*backtest
start: 2019-05-01 00:00:00
end: 2019-11-12 00:00:00
period: 1d
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
*/

/* 原版麦语言策略
N1:=10;
N2:=21;
AP:=(HIGH+LOW+CLOSE)/3;
ESA:=EMA(AP,N1);
D:=EMA(ABS(AP-ESA),N1);
CI:=(AP-ESA)/(0.015*D);
TCI:=EMA(CI,N2);
WT1:TCI;
WT2:SMA(WT1,4,1);
AA:=CROSS(WT1,WT2);
BB:=CROSSDOWN(WT1,WT2);
REF(AA,1),BPK;
REF(BB,1),SPK;
*/

// 全局变量
var IDLE = 0
var LONG = 1
var SHORT = 2
var OPENLONG = 3
var OPENSHORT = 4
var COVERLONG = 5
var COVERSHORT = 6  

var BREAK = 9
var SHOCK = 10  

var _State = IDLE
var Amount = 1                 // 记录持仓数量
var TradeInterval = 500        // 轮询间隔
var PriceTick = 1              // 价格一跳
var Point = 5                  // 滑价点数
var Symbol = "quarter"  

// 临时参数
var N1 = 10
var N2 = 21

function CalcAP (r) {   // AP:=(HIGH+LOW+CLOSE)/3;
    var arrAP = []

    for (var i = 0; i < r.length; i++) {
        v = (r[i].High + r[i].Low + r[i].Close) / 3
        arrAP.push(v)
    }

    return arrAP
}

function CalcESA (ap, n1) {   // ESA:=EMA(AP,N1);
    if (ap.length <= n1) {
        return false
    }

    return TA.EMA(ap, n1)
}

function CalcD (ap, esa, n1) {    // D:=EMA(ABS(AP-ESA),N1);
    var arrABS_APminusESA = []
    if (ap.length != esa.length) {
        throw "ap.length != esa.length"
    }

    for (var i = 0; i < ap.length; i++) {
        if (ap[i] && esa[i] && !isNaN(ap[i]) && !isNaN(esa[i])) {
            v = Math.abs(ap[i] - esa[i])
            arrABS_APminusESA.push(v)
        } else {
            arrABS_APminusESA.push(NaN)
        }
    }

    if (arrABS_APminusESA.length <= n1) {
        return false
    }

    return TA.EMA(arrABS_APminusESA, n1)
}

function CalcCI (ap, esa, d) {    // CI:=(AP-ESA)/(0.015*D);
    var arrCI = []
    if (ap.length != esa.length || ap.length != d.length) {
        throw "ap.length != esa.length || ap.length != d.length"
    }
    for (var i = 0; i < ap.length; i++) {
        if (ap[i] && esa[i] && d[i] && !isNaN(ap[i]) && !isNaN(esa[i]) && !isNaN(d[i])) {
            v = (ap[i] - esa[i]) / (0.015 * d[i])
            arrCI.push(v)
        } else {
            arrCI.push(NaN)
        }
    }

    if (arrCI.length == 0) {
        return false
    }

    return arrCI
}

function CalcTCI (ci, n2) {   // TCI:=EMA(CI,N2);
    if (ci.length <= n2) {
        return false
    }

    return TA.EMA(ci, n2)
}

function SMA (arr, n, m) {
    var sma = []
    var currSMA = null
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] && !isNaN(arr[i])) {
            if (!currSMA) {
                currSMA = arr[i]
                sma.push(currSMA)
                continue
            }

            // [M*C2+(N-M)*S1]/N
            currSMA = (m * arr[i] + (n - m) * currSMA) / n
            sma.push(currSMA)
        } else {
            sma.push(NaN)
        }
    }

    return sma
}

function CalcWT2 (wt1) {    // WT2:SMA(WT1,4,1);
    if (wt1.length <= 4) {
        return false 
    }

    return SMA(wt1, 4, 1)
}

var isOK = true
var preTime = 0
function OnTick(){
    // 驱动策略的行情处理部分
    var records = _C(exchange.GetRecords)
    if (records[records.length - 1].Time == preTime) {
        if (isOK) {
            Sleep(500)
            return 
        }
    } else {
        preTime = records[records.length - 1].Time
    }

    // 计算指标
    // AP
    var ap = CalcAP(records)

    // ESA
    var esa = CalcESA(ap, N1)
    if (!esa) {
        return 
    }

    // D
    var d = CalcD(ap, esa, N1)
    if (!d) {
        return 
    }

    // CI
    var ci = CalcCI(ap, esa, d)
    if (!ci) {
        return 
    }

    // TCI
    var tci = CalcTCI(ci, N2)
    if (!tci) {
        return 
    }

    // WT1
    var wt1 = tci

    // WT2 
    var wt2 = CalcWT2(wt1)
    if (!wt2) {
        return 
    }

    // 交易信号触发处理部分
    /*
    AA:=CROSS(WT1,WT2);
    BB:=CROSSDOWN(WT1,WT2);
    REF(AA,1),BPK;
    REF(BB,1),SPK;
    */
    if (wt1.length < 3 || wt2.length < 3) {
        return 
    }

    $.PlotLine("wt1", wt1[wt1.length - 2], records[records.length - 2].Time)
    $.PlotLine("wt2", wt2[wt2.length - 2], records[records.length - 2].Time)

    if ((_State == IDLE || _State == SHORT) && wt1[wt1.length - 4] < wt2[wt2.length - 4] && wt1[wt1.length - 3] > wt2[wt2.length - 3]) {
        if (_State == IDLE) {
            _State = OPENLONG
            Log("OPENLONG")    // 测试
        }
        if (_State == SHORT) {
            _State = COVERSHORT
            Log("COVERSHORT")  // 测试
        }
        isOK = false  
    }

    if ((_State == IDLE || _State == LONG) && wt1[wt1.length - 4] > wt2[wt2.length - 4] && wt1[wt1.length - 3] < wt2[wt2.length - 3]) {
        if (_State == IDLE) {
            _State = OPENSHORT
            Log("OPENSHORT")  // 测试
        }
        if (_State == LONG) {
            _State = COVERLONG
            Log("COVERLONG")  // 测试
        }
        isOK = false   
    }

    // 执行交易逻辑
    var pos = null
    var price = null
    var currBar = records[records.length - 1]
    if(_State == OPENLONG){
        pos = GetPosition(PD_LONG)
        // 判断是不是 满足状态，如果满足 修改状态
        if(pos[1] >= Amount){
            _State = LONG
            Amount = pos[1]   // 更新实际量
            isOK = true 
            return
        }
        price = currBar.Close - (currBar.Close % PriceTick) + PriceTick * Point
        Trade(OPENLONG, price, Amount - pos[1], pos, PriceTick)                // (Type, Price, Amount, CurrPos, PriceTick)
    }  

    if(_State == OPENSHORT){
        pos = GetPosition(PD_SHORT)
        if(pos[1] >= Amount){
            _State = SHORT
            Amount = pos[1]   // 更新实际量
            isOK = true 
            return
        }
        price = currBar.Close - (currBar.Close % PriceTick) - PriceTick * Point
        Trade(OPENSHORT, price, Amount - pos[1], pos, PriceTick)
    }  

    if(_State == COVERLONG){
        pos = GetPosition(PD_LONG)
        if(pos[1] == 0){
            _State = IDLE
            return
        }
        price = currBar.Close - (currBar.Close % PriceTick) - PriceTick * Point
        Trade(COVERLONG, price, pos[1], pos, PriceTick)
    }
    
    if(_State == COVERSHORT){
        pos = GetPosition(PD_SHORT)
        if(pos[1] == 0){
            _State = IDLE
            return
        }
        price = currBar.Close - (currBar.Close % PriceTick) + PriceTick * Point
        Trade(COVERSHORT, price, pos[1], pos, PriceTick)
    }
}  

// 交易逻辑部分
function GetPosition(posType) {
    var positions = _C(exchange.GetPosition)
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
    return [0, 0];
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
    if(Type == OPENLONG || Type == OPENSHORT){                 // 处理开仓
        exchange.SetDirection(Type == OPENLONG ? "buy" : "sell")
        var pfnOpen = Type == OPENLONG ? exchange.Buy : exchange.Sell
        var idOpen = pfnOpen(Price, Amount, CurrPos, OnePriceTick, Type)
        Sleep(TradeInterval)
        if(idOpen) {
            exchange.CancelOrder(idOpen)
        } else {
            CancelPendingOrders()
        }
    } else if(Type == COVERLONG || Type == COVERSHORT){        // 处理平仓
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

function main() { 
    // 设置合约
    exchange.SetContractType(Symbol)  

    while(1){
        OnTick()
        Sleep(1000)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/174457

> 更新时间

2019-11-13 18:13:06
