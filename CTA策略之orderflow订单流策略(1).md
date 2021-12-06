
> 策略名称

CTA策略之orderflow订单流策略(1)

> 策略作者

程文

> 策略描述

### 一、摘要
在电子交易兴起之前，要想了解成交量是如何在K线上分配的是一件很难的事情。如今科技的发展给带给我们一种前所未有的市场分析方式，大部分软件都已经支持以Order Book方式向投资者提供价格和成交量数据，以便洞悉价格上涨或下跌背后的原因。本篇作为CTA策略之OrderFlow订单流策略系列文章的第一篇，主要详细介绍OrderFlow订单流。

### 二、OrderFlow订单流简介
在二级交易市场种，影响价格变化的因素是纷繁复杂的，并且每一个因素影响价格变化的权重都不一样，以至于很难从传统技术分析图形中推导出价格行为，因为相对于价格和成交量来说，技术分析图形相对抽象和滞后。而OrderFlow订单流工具的横空出世，使得市场更加通透。OrderFlow订单流有很多种分类，包括：市场深度(L2数据)、成交量分布(VP)、足迹图(Footprint Chart)、成交明细(Sales Details)等等，如下图所示：

1、市场深度(L2数据)
![](https://www.fmz.cn![IMG](https://www.fmz.com/upload/asset/3999e86794a740e64803.png))
  
2、成交量分布(VP)
 ![IMG](https://www.fmz.com/upload/asset/3a79d063885631ae63fb.png) 
3、足迹图(Footprint Chart)
 ![IMG](https://www.fmz.com/upload/asset/3a47a738b5ad605cbaf2.png) 
4、成交明细(Sales Details)
 ![IMG](https://www.fmz.com/upload/asset/3958802cf8b9dc05232a.png) 
 
### 三、OrderFlow订单流原理
市场充斥着各种各样的信息，好的坏的、真的假的，这些信息就像荆棘一样错纵交织，导致这些消息很难被理解，很难用正确的逻辑推导，比如利好消息出来，但价格却没有很大变动；再比如价格往往在一片质疑中走势波澜壮阔的上涨行情；牛市往往在大家都看多时结束等等。所以我们需要站在巨人的肩膀上去分析这个市场，披荆斩棘从中抽取出价格波动的真正原因。

二级交易市场由投资自组成，不管投资者使用的是基本面分析、技术分析、消息面，每一个投资者在交易时，其实都是在为自己的观点投票，所以我们看到的价格波动，实际上是投资者共同角逐的结果，如果多头和空头势均力敌，双方力量相等，不分高低，那么价格将会不涨不跌；如果多头力量大于空头力量，那么价格将会上涨；如果空头力量大于多头力量，那么价格将会下跌。如果把多头看做是买方，把空头看做是卖方，那么多头和空头供需失衡是导致价格波动的主要原因，而这一切都可以从多头和空头的成交量中窥得其中的蛛丝马迹。

### 四、订单流中的Delta结构数据
传统的日本蜡烛图(K线)有开盘价、最高价、最低价、收盘价等四个价格，K线仅仅代表这个时间段内的价格变化情况，比如小时线代表了一个小时内的价格变化情况。而Delta结构数据则是根据Tick数据，提供了K线时间段内发生的具体细节，包括K线每个价格的多头和空头成交量，可以很清晰的看见多空成交的订单。如下图所示：
 ![IMG](https://www.fmz.com/upload/asset/3a47a738b5ad605cbaf2.png) 

在上面的Delta结构数据中，每一根K线都有一个独立的Delta结构数据，在Delta结构数据方框中，最上方是这根K线总的成交量，最下方是这根K线所有多头成交量和空头成交量的差，中间则是这根K线每个价格多头成交量和空头成交量数据。如你所见Delta结构数据将K线拆分成更详细的可视化数据，从而帮助投资者理解价格变动的机制。

### 五、实盘运行
 ![IMG](https://www.fmz.com/upload/asset/39fda661e67f6ab6d0a9.png) 
### 六、总结
本篇详细介绍了OrderFlow订单流策略基础知识，以及利用发明者量化交易平台，实现了一个足迹图(Footprint Chart)策略，该策略可以直接用于商品期货实盘账户。在接下来的章节中，我们将深入研究OrderFlow订单流数据，进而开发一系列基于OrderFlow订单流数据的交易策略。

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

https://www.fmz.com/strategy/291843

> 更新时间

2021-10-26 14:09:33
