/*
策略出处: https://www.fmz.com/strategy/38203
策略名称: 测试多图表展示
策略作者: Zero
策略描述:

BotVS支持策略同时展现多个图表, 这是一个简单的例子. 如果不能正常展示, 请清空浏览器缓存后刷新

*/

function main() {
    var cfgA = {
        title: {
            text: '盘口图表'
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
            name: '买一',
            data: [],
        }, {
            name: '卖一',
            data: [],
        }]
    }
    var cfgB = {
        title: {
            text: '差价图'
        },
        xAxis: {
            type: 'datetime'
        },
        series: [{
            name: '差价',
            type: 'column',
            data: [],
        }]
    }

    var cfgC = {
        __isStock: false,
        title: {
            text: '饼图'
        },
        series: [{
            type: 'pie',
            name: 'one',
            data: [
                ["A", 25],
                ["B", 25],
                ["C", 25],
                ["D", 25],
            ]
        }]
    };


    var chart = Chart([cfgA, cfgB, cfgC]);
    chart.reset()
        // 为饼图清加一个数点，add只能更新通过add方式添加的数据点, 内置的数据点无法后期更新
    chart.add(3, {
        name: "ZZ",
        y: Math.random() * 100
    });
    while (true) {
        Sleep(1000)
        var ticker = exchange.GetTicker()
        if (!ticker) {
            continue;
        }
        var diff = ticker.Sell - ticker.Buy
        cfgA.subtitle = {
            text: '买一 ' + ticker.Buy + ', 卖一 ' + ticker.Sell,
        };
        cfgB.subtitle = {
            text: '价差 ' + diff,
        };
        // update实际上等于重置了图表的配置
        chart.update([cfgA, cfgB, cfgC]);
        chart.add([0, [new Date().getTime(), ticker.Buy]]);
        chart.add([1, [new Date().getTime(), ticker.Sell]]);
        // 相当于更新第二个图表的第一个数据序列
        chart.add([2, [new Date().getTime(), diff]]);
        // 相当于更新了第三个图表的第一个数据序列
        chart.add(3, {
            name: "ZZ",
            y: Math.random() * 100
        }, -1);
    }
}
