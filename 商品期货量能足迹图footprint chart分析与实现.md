
> 策略名称

商品期货量能足迹图footprint chart分析与实现

> 策略作者

Hukybo

> 策略描述

我们都知道，在期货市场中，价格的涨跌是多空双方博弈、能量对抗的结果，期货市场的价格运动反应了期货市场能量的变化。在最初形成的盘感与美感的表象认知里，如果你尝试用自然界的能量现象解释期货市场的价格运行，会发现道理相通。能量概况数据有叫成交量分布图，它是展示每一根K线内每个价位上的主动卖量化和主动买量。通过收集Tick数据并加以汇总和换算得来的能量概况数据。用户可以基于能量概况来开发相应的指标或策略。



> 源码 (javascript)

``` javascript
/*backtest
start: 2020-03-10 00:00:00
end: 2020-03-10 23:59:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
mode: 1
*/

var NewFuturesTradeFilter = function (period) {
    var self = {} // 创建一个对象
    self.c = Chart({ // 创建Chart图表
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S, %A',
            pointFormat: '{point.tips}'
        },
        series: [{
            name: exchange.GetName(),
            type: 'candlestick',
            data: []
        }]
    })
    self.c.reset() // 清空图表数据
    self.pre = null // 用于记录上一个数据
    self.records = []
    self.feed = function (ticker) {
        if (!self.pre) { // 如果上一个数据不为真
            self.pre = ticker // 赋值为最新数据
        }
        var action = '' // 标记为空字符串
        Log('ticker', ticker)
        Log('pre', self.pre)
        if (ticker.Last >= self.pre.Sell) { // 如果最新数据的最后价格大于等于上一个数据的卖价
            action = 'buy' // 标记为buy
        } else if (ticker.Last <= self.pre.Buy) { // 如果最新数据的最后价格小于等于上一个数据的买价
            action = 'sell' // 标记为sell
        } else {
            if (ticker.Last >= ticker.Sell) { // 如果最新数据的最后价格大于等于最新数据的卖价
                action = 'buy' // 标记为buy
            } else if (ticker.Last <= ticker.Buy) { // 如果最新数据的最后价格小于等于最新数据的买价
                action = 'sell' // 标记为sell
            } else {
                action = 'both' // 标记为both
            }
        }
        // reset volume
        if (ticker.Volume < self.pre.Volume) { // 如果最新数据的成交量小于上一个数据的成交量
            self.pre.Volume = 0 // 把上一个数据的成交量赋值为0
        }
        var amount = ticker.Volume - self.pre.Volume // 最新数据的成交量减去上一个数据的成交量
        if (action != '' && amount > 0) { // 如果标记不为空字符串，并且action大于0
            var epoch = parseInt(ticker.Time / period) * period // 计算K线时间戳并取整
            var bar = null
            var pos = undefined
            if (
                self.records.length == 0 || // 如果K线长度为0或者最后一根K线时间戳小于epoch
                self.records[self.records.length - 1].time < epoch
            ) {
                bar = {
                    time: epoch,
                    data: {},
                    open: ticker.Last,
                    high: ticker.Last,
                    low: ticker.Last,
                    close: ticker.Last
                } // 把最新的数据赋值给bar
                self.records.push(bar) // 把bar添加到records数组中
            } else { // 重新给bar赋值
                bar = self.records[self.records.length - 1] // 上一个数据最后一根K线
                bar.high = Math.max(bar.high, ticker.Last) // 上一个数据最后一根K线的最高价与最新数据最后价格的最大值
                bar.low = Math.min(bar.low, ticker.Last) // 上一个数据最后一根K线的最低价与最新数据最后价格的最小值
                bar.close = ticker.Last // 最新数据的最后价格
                pos = -1
            }
            if (typeof bar.data[ticker.Last] === 'undefined') { // 如果数据为空
                bar.data[ticker.Last] = { // 重新赋值
                    buy: 0,
                    sell: 0
                }
            }
            if (action == 'both') { // 如果标记等于both
                bar.data[ticker.Last]['buy'] += amount // buy累加
                bar.data[ticker.Last]['sell'] += amount // sell累加
            } else {
                bar.data[ticker.Last][action] += amount // 标记累加
            }
            var tips = ''
            Object.keys(bar.data) // 将对象里的键放到一个数组中
                .sort() // 排序
                .reverse() // 颠倒数组中的顺序
                .forEach(function (p) { // 遍历数组
                    tips += '<br>' + p + ' ' + bar.data[p].sell + 'x' + bar.data[p].buy
                })
            self.c.add( // 添加数据
                0, {
                    x: bar.time,
                    open: bar.open,
                    high: bar.high,
                    low: bar.low,
                    close: bar.close,
                    tips: tips
                },
                pos
            )
        }
        self.pre = ticker // 重新赋值
    }
    return self // 返回对象
}


// 程序入口
function main() {
    Log(_C(exchange.SetContractType, 'MA888')) // 订阅数据
    var filt = NewFuturesTradeFilter(60000) // 创建一个对象
    while (true) { // 进入循环模式
        var ticker = exchange.GetTicker() // 获取交易所Tick数据
        if (ticker) { // 如果成功获取到Tick数据
            filt.feed(ticker) // 开始处理数据
        }
    }
}
// fmz@b2e2b8d5c639b46b31f15ea1616a024a
```

> 策略出处

https://www.fmz.com/strategy/189965

> 更新时间

2020-03-20 17:18:20
