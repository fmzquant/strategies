/*
策略出处: https://www.botvs.com/strategy/5379
策略名称: 传统期货差价监控 (CTP)
策略作者: Zero
策略描述:

只支持两个交易所, 可自定义差价的类型, 支持2.77托管者的自定义图表功能


参数            默认值     描述
------------  ------  ----------------------
AInstrument   au1506  主合约
BInstrument   au1512  次合约
AType         0       主合约价格类型: 上次成交价|买一价|卖一价
BType         0       次合约价格类型: 上次成交价|买一价|卖一价
Interval      2000    出错重试间隔(毫秒)
TickInterval  2000    检测频率(毫秒)
NormalDiff    0.1     普通差价
HighDiff      0.3     较高差价
*/

var __lastDiff = 0;
var __AType = ["Last", "Buy", "Sell"][AType];
var __BType = ["Last", "Buy", "Sell"][BType];

function _N(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
    var d = parseFloat(v.toFixed(Math.max(10, precision + 5)));
    s = d.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return d;
    }

    var b = Math.pow(10, precision);
    return Math.floor(d * b) / b;
}

function EnsureCall(method) {
    var r;
    while (!(r = method.apply(this, Array.prototype.slice.call(arguments).slice(1)))) {
        Sleep(Interval);
    }
    return r;
}

function onTick() {
    var a = EnsureCall(exchange.SetContractType, AInstrument);
    var tickerA = EnsureCall(exchange.GetTicker);
    var b = EnsureCall(exchange.SetContractType, BInstrument);
    var tickerB = EnsureCall(exchange.GetTicker);
    var diff = _N(tickerA[__AType] - tickerB[__BType]);
    LogStatus(a.InstrumentName, _N(tickerA[__AType]), b.InstrumentName, _N(tickerB[__BType]), "差价:", diff);
    if (__lastDiff != 0) {
        if (Math.abs(Math.abs(diff) - Math.abs(__lastDiff)) > 200) {
            return;
        }
    }
    if (diff != __lastDiff) {
        // add添加数据到series, 参数格式为[series序号, 数据];
        __chart.add([0, [new Date().getTime(), diff]]);
        __lastDiff = diff;
    }
}

function main() {
    if (exchange.GetName().indexOf("Futures_CTP") == -1) {
        throw "只支持传统期货(CTP)";
    }
    SetErrorFilter("login|ready|流控|连接失败|Timeout");
    // 传给Chart函数的必须是一个与上下文无关的结构体(附合HighStocks规则, 详情参数HighStocks使用方法)
    __chart = Chart({
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S, %A'
        },
        title: {
            text: '差价分析图'
        },
        rangeSelector: {
            buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
            }, {
                type: 'hour',
                count: 3,
                text: '3h'
            }, {
                type: 'hour',
                count: 8,
                text: '8h'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 0,
            inputEnabled: false
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            plotLines: [{
                value: NormalDiff,
                color: 'green',
                dashStyle: 'shortdash',
                width: 1,
            }, {
                value: HighDiff,
                color: 'red',
                dashStyle: 'shortdash',
                width: 1,
            }, {
                value: -NormalDiff,
                color: 'green',
                dashStyle: 'shortdash',
                width: 1,
            }, {
                value: -HighDiff,
                color: 'red',
                dashStyle: 'shortdash',
                width: 1,
            }]
        },
        series: [{
            name: '价差',
            data: [],
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
    // reset 清空所有图表之前的信息
    // __chart.reset();
    var a = EnsureCall(exchange.SetContractType, AInstrument);
    var b = EnsureCall(exchange.SetContractType, BInstrument);
    Log(a.InstrumentName + "." + __AType, "-", b.InstrumentName + "." + __BType, '差价做为收益显示到图表');
    TickInterval = Math.max(TickInterval, 50);
    Interval = Math.max(Interval, 50);
    while (true) {
        onTick();
        Sleep(TickInterval);
    }
}
