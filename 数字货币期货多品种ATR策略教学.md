
> Name

数字货币期货多品种ATR策略教学

> Author

小小梦

> Strategy Description

相关文章：https://www.fmz.com/digest-topic/8726

策略移植自一个简单的麦语言策略：
```
TR:=MAX(MAX((H-L),ABS(REF(C,1)-H)),ABS(REF(C,1)-L));
ATR:=EMA(TR,LENGTH2);

MIDLINE^^EMA((H + L + C)/3,LENGTH1);
UPBAND^^MIDLINE + N*ATR;
DOWNBAND^^MIDLINE - N*ATR;


BKVOL=0 AND C>=UPBAND AND REF(C,1)<REF(UPBAND,1),BPK;
SKVOL=0 AND C<=DOWNBAND AND REF(C,1)>REF(DOWNBAND,1),SPK;

BKVOL>0 AND C<=MIDLINE,SP(BKVOL);
SKVOL>0 AND C>=MIDLINE,BP(SKVOL);
// 止损
// stop loss
C>=SKPRICE*(1+SLOSS*0.01),BP;
C<=BKPRICE*(1-SLOSS*0.01),SP;
AUTOFILTER;
```

为了多品种设计，将参数设计为一个JSON字符串：
```
var params = '[{
        "symbol" : "swap",
        "period" : 86400,
        "stopLoss" : 0.07,
        "atrPeriod" : 10,
        "emaPeriod" : 10,
        "trackRatio" : 1,
        "openRatio" : 0.1
    }, {
        "symbol" : "swap",
        "period" : 86400,
        "stopLoss" : 0.07,
        "atrPeriod" : 10,
        "emaPeriod" : 10,
        "trackRatio" : 1,
        "openRatio" : 0.1
    }]'
```

策略用到了一个模版类库：数字货币期货交易类库（测试版）

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|params||参数|
|onlyOne|true|只跑单品种|
|symbol|swap|期货合约代码|
|period|86400|K线周期秒数|
|stopLoss|0.07|止损|
|atrPeriod|10|ATR周期|
|emaPeriod|10|EMA周期|
|trackRatio|true|轨道系数|
|openRatio|0.1|开仓系数|


> Source (javascript)

``` javascript
/*backtest
start: 2021-09-01 00:00:00
end: 2022-01-06 00:00:00
period: 1d
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT","balance":1000000},{"eid":"Futures_Binance","currency":"LTC_USDT"}]
args: [["params","[{         \"symbol\" : \"swap\",         \"period\" : 86400,         \"stopLoss\" : 0.07,         \"atrPeriod\" : 10,         \"emaPeriod\" : 20,         \"trackRatio\" : 2,         \"openRatio\" : 0.1     }, {         \"symbol\" : \"swap\",         \"period\" : 86400,         \"stopLoss\" : 0.07,         \"atrPeriod\" : 10,         \"emaPeriod\" : 20,         \"trackRatio\" : 2,         \"openRatio\" : 0.1     }]"]]
*/

var arrParam = onlyOne ? [{"symbol": symbol, "period": period, "stopLoss": stopLoss, "atrPeriod": atrPeriod, "emaPeriod": emaPeriod, "trackRatio": trackRatio, "openRatio": openRatio}] : JSON.parse(params)

function createChartConfig(symbol, atrPeriod, emaPeriod, index) {
    var chart = {                                        
        __isStock: true,    
        extension: {
                layout: 'single', 
                height: 600, 
        },
        title : { text : symbol},                       
        xAxis: { type: 'datetime'},           
        series : [                                          
            {                                      
                type: 'candlestick',    // K线数据系列                         
                name: symbol,   
                id: symbol + "-" + index,
                data: []                                           
            }, {                                      
                type: 'line',           // EMA
                name: symbol + ',EMA:' + emaPeriod,          
                data: [],               
            }, {
                type: 'line',           // upBand
                name: symbol + ',upBand' + atrPeriod,
                data: []
            }, {
                type: 'line',           // downBand
                name: symbol + ',downBand' + atrPeriod,
                data: []
            }, {
                type: 'flags',
                onSeries: symbol + "-" + index,
                data: [],
            }
        ]
    }
    return chart
}

function process(e, kIndex, c) {
    var r = e.GetRecords(e.param.period)
    if (!r || r.length < e.param.atrPeriod + 2 || r.length < e.param.emaPeriod + 2) {
        return 
    }

    var atr = TA.ATR(r, e.param.atrPeriod)
    var arrAvgPrice = []
    _.each(r, function(bar) {
        arrAvgPrice.push((bar.High + bar.Low + bar.Close) / 3)
    })
    var midLine = TA.EMA(arrAvgPrice, e.param.emaPeriod)
    var upBand = []
    var downBand = [] 
    _.each(midLine, function(mid, index) {
        if (index < e.param.emaPeriod - 1 || index < e.param.atrPeriod - 1) {
            upBand.push(NaN)
            downBand.push(NaN)
            return 
        }
        upBand.push(mid + e.param.trackRatio * atr[index])
        downBand.push(mid - e.param.trackRatio * atr[index])
    })

    // 画图
    for (var i = 0 ; i < r.length ; i++) {
        if (r[i].Time == e.state.lastBarTime) {
            // 更新
            c.add(kIndex, [r[i].Time, r[i].Open, r[i].High, r[i].Low, r[i].Close], -1)
            c.add(kIndex + 1, [r[i].Time, midLine[i]], -1)
            c.add(kIndex + 2, [r[i].Time, upBand[i]], -1)
            c.add(kIndex + 3, [r[i].Time, downBand[i]], -1)
        } else if (r[i].Time > e.state.lastBarTime) {
            // 添加
            e.state.lastBarTime = r[i].Time
            c.add(kIndex, [r[i].Time, r[i].Open, r[i].High, r[i].Low, r[i].Close])  
            c.add(kIndex + 1, [r[i].Time, midLine[i]])
            c.add(kIndex + 2, [r[i].Time, upBand[i]])
            c.add(kIndex + 3, [r[i].Time, downBand[i]])
        }
    }

    // 检测持仓
    var pos = e.GetPosition()
    if (!pos) {
        return 
    }
    var holdAmount = 0
    var holdPrice = 0
    if (pos.length > 1) {
        throw "同时检测到多空持仓！"
    } else if (pos.length != 0) {
        holdAmount = pos[0].Type == PD_LONG ? pos[0].Amount : -pos[0].Amount
        holdPrice = pos[0].Price
    }

    if (e.state.preBar == -1) {
        e.state.preBar = r[r.length - 1].Time
    }
    // 检测信号
    if (e.state.preBar != r[r.length - 1].Time) {   // 收盘价模型
        if (holdAmount <= 0 && r[r.length - 3].Close < upBand[upBand.length - 3] && r[r.length - 2].Close > upBand[upBand.length - 2]) {   // 收盘价上穿上轨
            if (holdAmount < 0) {   // 持有空仓，平仓
                Log(e.GetCurrency(), "平空仓", "#FF0000")
                $.CoverShort(e, e.param.symbol, Math.abs(holdAmount))
                c.add(kIndex + 4, {x: r[r.length - 2].Time, color: 'red', shape: 'flag', title: '平', text: "平空仓"})
            }
            // 开多
            Log(e.GetCurrency(), "开多仓", "#FF0000")
            $.OpenLong(e, e.param.symbol, 10)
            c.add(kIndex + 4, {x: r[r.length - 2].Time, color: 'red', shape: 'flag', title: '多', text: "开多仓"})
        } else if (holdAmount >= 0 && r[r.length - 3].Close > downBand[downBand.length - 3] && r[r.length - 2].Close < downBand[downBand.length - 2]) {  // 收盘价下穿下轨
            if (holdAmount > 0) {   // 持有多仓，平仓
                Log(e.GetCurrency(), "平多仓", "#FF0000")
                $.CoverLong(e, e.param.symbol, Math.abs(holdAmount))
                c.add(kIndex + 4, {x: r[r.length - 2].Time, color: 'green', shape: 'flag', title: '平', text: "平多仓"})
            }
            // 开空
            Log(e.GetCurrency(), "开空仓", "#FF0000")
            $.OpenShort(e, e.param.symbol, 10)
            c.add(kIndex + 4, {x: r[r.length - 2].Time, color: 'green', shape: 'flag', title: '空', text: "开空仓"})
        } else {
            // 平仓
            if (holdAmount > 0 && (r[r.length - 2].Close <= holdPrice * (1 - e.param.stopLoss) || r[r.length - 2].Close <= midLine[midLine.length - 2])) {   // 持多仓，收盘价小于等于中线，按开仓价格止损
                Log(e.GetCurrency(), "触发中线或止损，平多仓", "#FF0000")
                $.CoverLong(e, e.param.symbol, Math.abs(holdAmount))
                c.add(kIndex + 4, {x: r[r.length - 2].Time, color: 'green', shape: 'flag', title: '平', text: "平多仓"})
            } else if (holdAmount < 0 && (r[r.length - 2].Close >= holdPrice * (1 + e.param.stopLoss) || r[r.length - 2].Close >= midLine[midLine.length - 2])) {  // 持空仓，收盘价大于等于中线，按开仓价格止损
                Log(e.GetCurrency(), "触发中线或止损，平空仓", "#FF0000")
                $.CoverShort(e, e.param.symbol, Math.abs(holdAmount))
                c.add(kIndex + 4, {x: r[r.length - 2].Time, color: 'red', shape: 'flag', title: '平', text: "平空仓"})
            }
        }
        e.state.preBar = r[r.length - 1].Time
    }
}

function main() {
    var arrChartConfig = []
    if (arrParam.length != exchanges.length) {
        throw "参数和交易所对象不匹配！"
    }
    var arrState = _G("arrState")
    _.each(exchanges, function(e, index) {
        if (e.GetName() != "Futures_Binance") {
            throw "不支持该交易所！"
        }
        e.param = arrParam[index]
        e.state = {lastBarTime: 0, symbol: e.param.symbol, currency: e.GetCurrency()}
        if (arrState) {
            if (arrState[index].symbol == e.param.symbol && arrState[index].currency == e.GetCurrency()) {
                Log("恢复：", e.state)
                e.state = arrState[index]
            } else {
                throw "恢复的数据和当前设置不匹配！"
            }
        }
        e.state.preBar = -1   // 初始设置-1
        e.SetContractType(e.param.symbol)
        Log(e.GetName(), e.GetLabel(), "设置合约：", e.param.symbol)
        arrChartConfig.push(createChartConfig(e.GetCurrency(), e.param.atrPeriod, e.param.emaPeriod, index))
    })
    var chart = Chart(arrChartConfig)
    chart.reset()

    while (true) {
        _.each(exchanges, function(e, index) {
            process(e, index + index * 4, chart)
            Sleep(500)
        })      
    }
}

function onexit() {
    // 记录 e.state
    var arrState = []
    _.each(exchanges, function(e) {
        arrState.push(e.state)
    })
    Log("记录：", arrState)
    _G("arrState", arrState)
}

```

> Detail

https://www.fmz.com/strategy/339344

> Last Modified

2022-01-22 13:35:11
