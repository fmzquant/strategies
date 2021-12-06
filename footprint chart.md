
> 策略名称

footprint chart

> 策略作者

程文

> 策略描述

我们都知道，在期货市场中，价格的涨跌是多空双方博弈、能量对抗的结果，期货市场的价格运动反应了期货市场能量的变化。在最初形成的盘感与美感的表象认知里，如果你尝试用自然界的能量现象解释期货市场的价格运行，会发现道理相通。能量概况数据有叫成交量分布图，它是展示每一根K线内每个价位上的主动卖量化和主动买量。通过收集Tick数据并加以汇总和换算得来的能量概况数据。用户可以基于能量概况来开发相应的指标或策略。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|contractCode|rb888|合约代码|


> 源码 (javascript)

``` javascript
/*backtest
start: 2020-03-10 00:00:00
end: 2020-03-10 23:59:00
period: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
mode: 1
*/


var NewFuturesTradeFilter = function(period) {
    var self = {} // 创建一个对象

    self.c = Chart({ // 创建Chart图表
        chart: {
            zoomType: 'x', // 缩放
            backgroundColor: '#272822',
            borderRadius: 5,
            panKey: 'shift',
            animation: false,
        },
        plotOptions: {
            candlestick: {
                color: '#00F0F0',
                lineColor: '#00F0F0',
                upColor: '#272822',
                upLineColor: '#FF3C3C'
            },
        },
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S, %A',
            pointFormat: '{point.tips}',
            borderColor: 'rgb(58, 68, 83)',
            borderRadius: 0,
        },
        series: [{
            name: exchange.GetName(),
            type: 'candlestick',
            data: []
        }],
        yAxis: {
            gridLineColor: 'red',
            gridLineDashStyle: 'Dot',
            labels: {
				style: {
					color: 'rgb(204, 214, 235)'
				}
			}
        },
        rangeSelector: {
            enabled: false
        },
        navigation: {
			buttonOptions: {
				height: 28,
				width: 33,
				symbolSize: 18,
				symbolX: 17,
				symbolY: 14,
				symbolStrokeWidth: 2,
			}
		}
    })
    self.c.reset() // 清空图表数据

    self.pre = null // 用于记录上一个数据
    self.records = []
    self.feed = function(ticker, contractCode) {
        if (!self.pre) { // 如果上一个数据不为真
            self.pre = ticker // 赋值为最新数据
        }
        var action = '' // 标记为空字符串
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
            var initiativeBuy = 0
            var initiativeSell = 0
            var sellLongMax = 0
            var buyLongMax = 0
            var sellVol = 0
            var buyVol = 0
            for (var i in bar.data) {
                sellLong = bar.data[i].sell.toString().length
                buyLong = bar.data[i].buy.toString().length
                if (sellLong > sellLongMax) {
                    sellLongMax = sellLong
                }
                if (buyLong > buyLongMax) {
                    buyLongMax = buyLong
                }
                sellVol += bar.data[i].sell
                buyVol += bar.data[i].buy
            }
            // var date = new Date(bar.time);
            // var Y = date.getFullYear() + '-';
            // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            // var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + '<br>';
            // var tips = Y + M + D + h + m
            tips = '<b>◉ ' + (sellVol + buyVol) + '</b>'
            Object.keys(bar.data) // 将对象里的键放到一个数组中
                .sort() // 排序
                .reverse() // 颠倒数组中的顺序
                .forEach(function(p) { // 遍历数组
                    pSell = bar.data[p].sell
                    pBuy = bar.data[p].buy
                    if (pSell > pBuy) {
                        arrow = ' ▼ '
                    } else if (pSell < pBuy) {
                        arrow = ' ▲ '
                    } else {
                        arrow = ' ♦ '
                    }
                    initiativeSell += pSell
                    initiativeBuy += pBuy
                    sellLongDiff = sellLongMax - pSell.toString().length
                    buyLongDiff = buyLongMax - pBuy.toString().length
                    if (sellLongDiff == 1) {
                        pSell = '0' + pSell
                    }
                    if (sellLongDiff == 2) {
                        pSell = '00' + pSell
                    }
                    if (sellLongDiff == 3) {
                        pSell = '000' + pSell
                    }
                    if (sellLongDiff == 4) {
                        pSell = '0000' + pSell
                    }
                    if (sellLongDiff == 5) {
                        pSell = '00000' + pSell
                    }
                    if (buyLongDiff == 1) {
                        pBuy = '0' + pBuy
                    }
                    if (buyLongDiff == 2) {
                        pBuy = '00' + pBuy
                    }
                    if (buyLongDiff == 3) {
                        pBuy = '000' + pBuy
                    }
                    if (buyLongDiff == 4) {
                        pBuy = '0000' + pBuy
                    }
                    if (buyLongDiff == 5) {
                        pBuy = '00000' + pBuy
                    }
                    code = contractCode.match(/[a-zA-Z]+|[0-9]+/g)[0]
                    if (code == 'IF' || code == 'j' || code == 'IC' || code == 'i' || code == 'ZC' || code == 'sc' || code == 'IH' || code == 'jm' || code == 'fb') {
                        p = parseFloat(p).toFixed(1)
                    } else if (code == 'au') {
                        p = parseFloat(p).toFixed(2)
                    } else if (code == 'T' || code == 'TF' || code == 'TS') {
                        p = parseFloat(p).toFixed(3)
                    } else {
                        p = parseInt(p)
                    }
                    tips += '<br>' + p + ' → ' + pSell + arrow + pBuy

                })
            tips += '<br>' + '<b>⊗ ' + (initiativeBuy - initiativeSell) + '</b>'
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


function main() {
    if (exchange.GetName().indexOf('CTP') == -1) {
        throw "只支持商品期货CTP";
    }
    SetErrorFilter("login|timeout|GetTicker|ready|流控|连接失败|初始|Timeout");
    while (!exchange.IO("status")) {
        Sleep(3000);
        LogStatus("正在等待与交易服务器连接, " + _D());
    }
    symbolDetail = _C(exchange.SetContractType, contractCode) // 订阅数据
    Log('交割日期：', symbolDetail['StartDelivDate'])
    Log('最小下单量：', symbolDetail['MaxLimitOrderVolume'])
    Log('最小价差：', symbolDetail['PriceTick'])
    Log('一手：', symbolDetail["VolumeMultiple"], '份')
    Log('合约代码：', symbolDetail['InstrumentID'])
    var filt = NewFuturesTradeFilter(60000) // 创建一个对象
    while (true) { // 进入循环模式
        while (!exchange.IO("status")) {
            Sleep(3000);
            LogStatus("正在等待与交易服务器连接, " + _D());
        }
        LogStatus("行情和交易服务器连接成功, " + _D());
        var ticker = exchange.GetTicker() // 获取交易所Tick数据
        if (ticker) { // 如果成功获取到Tick数据
            filt.feed(ticker, contractCode) // 开始处理数据
        }
    }
}


```

> 策略出处

https://www.fmz.cn/strategy/189965

> 更新时间

2021-05-25 10:00:37
