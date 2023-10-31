
> Name

SummerPlot10

> Author

夏天不打你





> Source (javascript)

``` javascript


//#region 版本更新
/*
------------  【1.0 版本】   ---------------------
----------- 2023.3.14 --------------
1、初版。
----------- 2023.3.16 --------------
1、调整时间范围选择器。
*/
//#endregion

var _Cfgs = [];
var _Chart = null;

function init() {
    _Chart = Chart([]);
    _Chart.reset();
    Log("SummerPlot init finished.");
}

function setChart(title, line, col, is_single, series_type, is_stock) {
    let char = _Cfgs.find(item => item?.title?.text === title);
    if (char) {
        char.extension.col = col;
        char.extension.layout = is_single ? 'single' : 'group';
        return char;
    } else {
        _Cfgs.push({
            __isStock: is_stock,
            tooltip: {
                xDateFormat: '%Y-%m-%d %H:%M:%S, %A'                // 提示加日期格式
            },
            legend: {
                enabled: true,                                      // 曲线用户可选
            },
            extension: {
                layout: is_single ? 'single' : 'group',
                col: col,
            },
            title: {
                text: title
            },
            xAxis: {
                type: 'datetime'
            },
            series: [{
                name: line,
                data: [],
                type: series_type,
            }],
            //#region 设置时间范围可选
            rangeSelector: {
                buttons: [{
                    type: 'day',
                    count: 1,
                    text: '1d'
                }, {
                    type: 'day',
                    count: 7,
                    text: '7d'
                }, {
                    type: 'month',
                    count: 1,
                    text: '1M'
                }, {
                    type: 'month',
                    count: 3,
                    text: '3M'
                }, {
                    type: 'month',
                    count: 6,
                    text: '6M'
                }, {
                    type: 'year',
                    count: 1,
                    text: '1Y'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                selected: 2,
                inputEnabled: true
            },
            //#endregion
        });
    }
    return _Cfgs[_Cfgs.length - 1];
}

function getSeriesIndex(title, line, series_type) {
    let index = -1, cfg_index = -1, last_series_index = -1;
    for (let i = 0; i < _Cfgs.length; i++) {
        for (let j = 0; j < _Cfgs[i].series.length; j++) {
            index++;
            if (_Cfgs[i].title.text === title) {
                cfg_index = i;                              // 记录对应图表的下标
                last_series_index = index;                  // 记录对应图表的最后一个下标
                if (_Cfgs[i].series[j].name === line && _Cfgs[i].series[j].type === series_type) {
                    // 找到对应的曲线，直接返回下标
                    return index;
                }
            }
        }
    }
    // 如果没有对应曲线
    _Cfgs[cfg_index].series.push({
        name: line,
        data: [],
        type: series_type,
    });
    return (last_series_index + 1);
}

$.PlotLineSummer = function(title, line, dot, date, col, is_single) {
    setChart(title, line, col, is_single, 'line', true);
    let index = getSeriesIndex(title, line, 'line');
    _Chart.add(index, [date, dot]);
    _Chart.update(_Cfgs);
}

$.PlotBarSummer = function(title, line, dot, date, col, is_single) {
    setChart(title, line, col, is_single, 'column', true);
    let index = getSeriesIndex(title, line, 'column');
    _Chart.add(index, [date, dot]);
    _Chart.update(_Cfgs);
}

$.PlotPieSummer = function(title, line, data, col, is_single) {
    let chart = setChart(title, line, col, is_single, 'pie', false);
    chart.series[0].data = data;
    _Chart.update(_Cfgs);
}

function main() {
    let count = 0;
    while (true) {
        Sleep(1000)
        let ticker = exchange.GetTicker()
        if (!ticker) {
            continue;
        }
        let diff = ticker.Sell - ticker.Buy;
        let time = new Date().getTime()
        $.PlotLineSummer('盘口图表', '买一', ticker.Buy, time, 12, true);
        $.PlotLineSummer('盘口图表', '卖一', ticker.Sell, time, 12, true);
        $.PlotBarSummer('差价图', '差价1', diff, time, 12, true);
        $.PlotBarSummer('差价图', '差价2', diff * 2, time, 12, true);
        $.PlotLineSummer('盘口图表2', '买一', ticker.Buy, time, 8, true);
        $.PlotLineSummer('盘口图表2', '卖一', ticker.Sell, time, 8, true);
        $.PlotLineSummer('盘口图表3', '买一', ticker.Buy, time, 4, true);
        $.PlotLineSummer('盘口图表3', '卖一', ticker.Sell, time, 4, true);
        let data = [["A", 25 + (++count)],
                    ["B", 25 - count],
                    ["C", 25],
                    ["D", 25]];
        $.PlotPieSummer('饼图1', '饼图1', data, 6, true);
        $.PlotPieSummer('饼图2', '饼图2', data, 6, true);
    }
}
```

> Detail

https://www.fmz.com/strategy/404014

> Last Modified

2023-08-09 13:04:14
