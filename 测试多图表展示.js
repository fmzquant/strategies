/*
策略出处: https://www.botvs.com/strategy/38203
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
        },{
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

    var chart = Chart([cfgA, cfgB]);
    chart.reset()
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
        // update相当于重置了图表的配置
        chart.update([cfgA, cfgB]);
        chart.add([0, [new Date().getTime(), ticker.Buy]]);
        chart.add([1, [new Date().getTime(), ticker.Sell]]);
        // 相当于更新第二个图表的第一个数据序列
        chart.add([2, [new Date().getTime(), diff]]);
    }
}
