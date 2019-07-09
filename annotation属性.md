
> 策略名称

annotation属性

> 策略作者

量化新人

> 策略描述

BotVS支持策略同时展现多个图表, 这是一个简单的例子. 如果不能正常展示, 请清空浏览器缓存后刷新



> 源码 (javascript)

``` javascript
/*backtest
start: 2019-01-22 00:00:00
end: 2019-01-23 00:00:00
period: 30m
exchanges: [{"eid":"OKCoin_EN","currency":"BTC_USD"}]
*/
// function main() {
//     var cfgA = {
//         extension: {
//             layout: 'single', // 不参于分组，单独显示, 默认为分组 'group'
//             height: 300, // 指定高度
//         },
//         title: {
//             text: '盘口图表'
//         },
//         xAxis: {
//             type: 'datetime'
//         },
//         series: [{
//             name: '买一',
//             data: [],
//         }, {
//             name: '卖一',
//             data: [],
//         }]
//     }
//     var cfgB = {
//         title: {
//             text: '差价图'
//         },
//         xAxis: {
//             type: 'datetime'
//         },
//         series: [{
//             name: '差价',
//             type: 'column',
//             data: [],
//         }],
//         annotations: [{
//         shapes: [{
//             point: '0',
//             type: 'circle',
//             r: 10
//         }, {
//             point: '3',
//             type: 'rect',
//             width: 20,
//             height: 20,
//             x: -10,
//             y: -25
//         }],
//         labels: [{
//             point: {
//                 x: 6,
//                 y: 195,
//                 xAxis: 0,
//                 yAxis: 0
//             }
//         }]
//     }]
//     }

//     var cfgC = {
//         __isStock: false,
//         title: {
//             text: '饼图'
//         },
//         series: [{
//             type: 'pie',
//             name: 'one',
//             data: [
//                 ["A", 25],
//                 ["B", 25],
//                 ["C", 25],
//                 ["D", 25],
//             ]  // 指定初始数据后不需要用add函数更新, 直接更改图表配置就可以更新序列.
//         }]
//     };
//     var cfgD = {
//         extension: {
//             layout: 'single',
//             col: 8, // 指定宽度占的单元值, 总值 为12
//             height: '300px',
//         },
//         title: {
//             text: '盘口图表'
//         },
//         xAxis: {
//             type: 'datetime'
//         },
//         series: [{
//             name: '买一',
//             data: [],
//         }, {
//             name: '卖一',
//             data: [],
//         }]
//     }
//     var cfgE = {
//         __isStock: false,
//         extension: {
//             layout: 'single',
//             col: 4,
//             height: '300px',
//         },
//         title: {
//             text: '饼图2'
//         },
//         series: [{
//             type: 'pie',
//             name: 'one',
//             data: [
//                 ["A", 25],
//                 ["B", 25],
//                 ["C", 25],
//                 ["D", 25],
//             ]
//         }]
//     };

//     var chart = Chart([cfgA, cfgB, cfgC, cfgD, cfgE]);
//     chart.reset()
//         // 为饼图清加一个数点，add只能更新通过add方式添加的数据点, 内置的数据点无法后期更新
//     chart.add(3, {
//         name: "ZZ",
//         y: 25
//     });
//     while (true) {
//         Sleep(1000)
//         var ticker = exchange.GetTicker()
//         if (!ticker) {
//             continue;
//         }
//         var diff = ticker.Sell - ticker.Buy
//         cfgA.subtitle = {
//             text: '买一 ' + ticker.Buy + ', 卖一 ' + ticker.Sell,
//         };
//         cfgB.subtitle = {
//             text: '价差 ' + diff,
//         };

//         chart.add([0, [ ticker.Buy]]);
//         chart.add([1, [ ticker.Sell]]);
//         // 相当于更新第二个图表的第一个数据序列
//         chart.add([2, [new Date().getTime(), diff]]);
//         chart.add(4, [new Date().getTime(), ticker.Buy]);
//         chart.add(5, [new Date().getTime(), ticker.Buy]);
//         cfgC.series[0].data[0][1] = 789
//         cfgE.series[0].data[0][1] = 789
//         // update实际上等于重置了图表的配置
//         chart.update([cfgA, cfgB, cfgC, cfgD, cfgE]);
//     }
// }
var cfgA = {
    extension: {
        layout: 'single', // 不参于分组，单独显示, 默认为分组 'group'
        height: 300, // 指定高度
        col: 8, // 指定宽度占的单元值, 总值 为12
    },
    title: {
        text: 'stock'
    },
  
    series: [ // 数据系列，该属性保存的是 各个 数据系列（线， K线图， 标签等..）
        {
            type: 'candlestick',
            name: "line1",
            data: []
        }, // 索引为0， data 数组内存放的是该索引系列的 数据    ]
        {
            type: 'flags',
            data: [{
                x: 1548170700000,
                y: 3575.8,
                title: '1卖',
                text: 'Shape: "squarepin"'
            }],
            onSeries: 'dataseries',
            shape: 'squarepin',
            width: 16
        },
    ],
    annotations: [{
        shapes: [{
            fill: 'none',
            stroke: 'red',
            strokeWidth: 3,
            type: 'path',
            points: [{
                x: 1548167400000,
                y: 3562.59,
 
            }, {
                x: 1548171000000,
                y: 3561.34,
           
            }],
        }]
    }]

}

function main() {
    var ObjChart = Chart(cfgA); // 调用 Chart 函数，初始化 图表。
    ObjChart.reset(); // 清空
    var recordsArr = []
    while (true) {
        var nowTime = new Date().getTime(); // 获取本次轮询的 时间戳，  即一个 毫秒 的时间戳。用来确定写入到图表的X轴的位置。
        // var ticker = _C(exchange.GetTicker); // 获取行情数据
        var records = _C(exchange.GetRecords, PERIOD_M30)
        var lastKline = records[records.length - 1]
        Log("ticker:", lastKline)


        var newItem = [lastKline.Time, lastKline.Open, lastKline.High, lastKline.Low, lastKline.Close]
        recordsArr.push(newItem)

        cfgA.series[0].data = recordsArr
        ObjChart.update(cfgA);
        Sleep(2000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/149661

> 更新时间

2019-06-21 14:19:14
