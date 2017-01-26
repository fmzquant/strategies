/*
策略出处: https://www.botvs.com/strategy/27293
策略名称: 画线类库
策略作者: Zero
策略描述:

简化了策略图表画线的逻辑, 可以直接调用封装好的函数

* 支持画多条线
* 支持K线图
* 支持flag小图标
* 你也可以添加更多图形的支持

```
function main() {
    var isFirst = true
    while (true) {
        var records = exchange.GetRecords();
        if (records && records.length > 0) {
            $.PlotRecords(records, 'BTC')
            if (isFirst) {
                $.PlotFlag(records[records.length-1].Time, 'Start', 'S')
                isFirst = false
            }
        }
        var ticker = exchange.GetTicker()
        if (ticker) {
            $.PlotLine('Last', ticker.Last)
            $.PlotTitle('Last ' + ticker.Last)
        }
        
        Sleep(60000)
    }
}
```

*/

var chart = null
var series = []
var labelIdx = []
var preBarTime = 0
var preFlagTime = 0
var preDotTime = []

var cfg = {
    tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S, %A'
    },
    legend: {
        enabled: true,
    },
    plotOptions: {
        candlestick: {
            color: '#d75442',
            upColor: '#6ba583'
        }
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
        selected: 2,
        inputEnabled: true
    },
    series: series,
}

$.GetCfg = function() {
    return cfg
}

$.PlotHLine = function(value, label, color, style) {
    if (typeof(cfg.yAxis) === 'undefined') {
        cfg.yAxis = {
            plotLines: []
        }
    } else if (typeof(cfg.yAxis.plotLines) === 'undefined') {
        cfg.yAxis.plotLines = []
    }
    /*
    Solid
    ShortDash
    ShortDot
    ShortDashDot
    ShortDashDotDot
    Dot
    Dash
    LongDash
    DashDot
    LongDashDot
    LongDashDotDot
    */
    var obj = {
        value: value,
        color: color || 'red',
        width: 2,
        dashStyle: style || 'Solid',
        label: {
            text: label || '',
            align: 'center'
        },
    }
    var found = false
    for (var i = 0; i < cfg.yAxis.plotLines.length; i++) {
        if (cfg.yAxis.plotLines[i].label.text == label) {
            cfg.yAxis.plotLines[i] = obj
            found = true
        }
    }
    if (!found) {
        cfg.yAxis.plotLines.push(obj)
    }
    if (!chart) {
        chart = Chart(cfg)
    } else {
        chart.update(cfg)
    }
}

$.PlotRecords = function(records, title) {
    var seriesIdx = labelIdx["candlestick"];
    if (!chart) {
        chart = Chart(cfg)
    }
    if (typeof(seriesIdx) == 'undefined') {
        cfg.__isStock = true
        seriesIdx = series.length
        series.push({
            type: 'candlestick',
            name: typeof(title) == 'undefined' ? '' : title,
            id: 'primary',
            data: []
        });
        chart.update(cfg)
        labelIdx["candlestick"] = seriesIdx
    }
    if (typeof(records.Time) !== 'undefined') {
        var Bar = records;
        if (Bar.Time == preBarTime) {
            chart.add(seriesIdx, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close], -1)
        } else if (Bar.Time > preBarTime) {
            preBarTime = Bar.Time
            chart.add(seriesIdx, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close])
        }
    } else {
        for (var i = 0; i < records.length; i++) {
            if (records[i].Time == preBarTime) {
                chart.add(seriesIdx, [records[i].Time, records[i].Open, records[i].High, records[i].Low, records[i].Close], -1)
            } else if (records[i].Time > preBarTime) {
                preBarTime = records[i].Time
                chart.add(seriesIdx, [records[i].Time, records[i].Open, records[i].High, records[i].Low, records[i].Close])
            }
        }
    }
    return chart
}

$.PlotLine = function(label, dot, time) {
    if (!chart) {
        cfg.xAxis = {
            type: 'datetime'
        }
        chart = Chart(cfg)
    }
    var seriesIdx = labelIdx[label]
    if (typeof(seriesIdx) === 'undefined') {
        seriesIdx = series.length
        preDotTime[seriesIdx] = 0
        labelIdx[label] = seriesIdx;
        series.push({
            type: 'line',
            yAxis: 0,
            showInLegend: true,
            name: label,
            data: [],
            tooltip: {
                valueDecimals: 5
            }
        })
        chart.update(cfg)
    }
    if (typeof(time) == 'undefined') {
        time = new Date().getTime()
    }

    if (preDotTime[seriesIdx] != time) {
        preDotTime[seriesIdx] = time
        chart.add(seriesIdx, [time, dot])
    } else {
        chart.add(seriesIdx, [time, dot], -1)
    }

    return chart
}


$.PlotFlag = function(time, text, title, shape, color) {
    if (!chart) {
        chart = Chart(cfg)
    }
    label = "flag";
    var seriesIdx = labelIdx[label]
    if (typeof(seriesIdx) === 'undefined') {
        seriesIdx = series.length
        labelIdx[label] = seriesIdx;
        series.push({
            type: 'flags',
            onSeries: 'primary',
            data: []
        })
        chart.update(cfg)
    }

    var obj = {
        x: time,
        color: color,
        shape: shape,
        title: title,
        text: text
    }

    if (preFlagTime != time) {
        preFlagTime = time
        chart.add(seriesIdx, obj)
    } else {
        chart.add(seriesIdx, obj, -1)
    }

    return chart
}

$.PlotTitle = function(title, chartTitle) {
    cfg.subtitle = {
        text: title
    };
    if (typeof(chartTitle) !== 'undefined') {
        cfg.title = {
            text: chartTitle
        };
    }
    if (chart) {
        chart.update(cfg)
    }
}

function main() {
    var isFirst = true
    while (true) {
        var records = exchange.GetRecords();
        if (records && records.length > 0) {
            $.PlotRecords(records, 'BTC')
            if (isFirst) {
                $.PlotFlag(records[records.length - 1].Time, 'Start', 'S')
                isFirst = false
                $.PlotHLine(records[records.length - 1].Close, 'Close')
            }
        }
        var ticker = exchange.GetTicker()
        if (ticker) {
            $.PlotLine('Last', ticker.Last)
            $.PlotTitle('Last ' + ticker.Last)
        }

        Sleep(60000)
    }
}
