
> 策略名称

CTA策略之orderflow订单流策略(2)

> 策略作者

程文

> 策略描述

### 一、摘要
在上一个章节中，我们初步认识了OrderFlow订单流以及其分类，大概包括市场深度数据、成交量分布(VP)、足迹图(Footprint Chart)、成交明细(Sales Details)等等，并利用代码实现一个足迹图(Footprint Chart)K线图表，这对于了解OrderFlow订单流数据结构和原理很有帮助。本章节我们将继续探索OrderFlow订单流，以足迹图(Footprint Chart)为主，开发一系列的交易策略。

### 二、订单流数据分类
在交易中，可以利用的订单流数据大致可以分为两类，一类是未成交的订单流(市场深度数据)，另一类是已成交的订单流(Footprint足迹图，也称为成交痕迹)。而成交量分布(VP)和成交明细(Sales Details)严格来说并不算是订单流的应用。

 ![IMG](https://www.fmz.com/upload/asset/3999e86794a740e64803.png) 

其中市场深度数据是市场中尚未成交的订单流数据，这些数据就是各交易软件中常见的五档行情(如上图所示)。做过交易的都知道，这些数据通常变化无常，有时候突然来一个大单，又突然凭空消失，存在很强的欺骗和诱导作用。对于散户来说，很难从中汲取出有效的规律，所以本系列教程主要以足迹图(Footprint Chart)为主。

足迹图(Footprint Chart)展示了已经成交的订单流数据，相比市场深度L2数据而言，其数据是客观的存在，真实可靠。足迹图(Footprint Chart)是由Tick数据换算而成，实时记录市场买卖方的每个tick订单，可以让交易者及时看到市场微观结构，比如：价格变化、订单类型、流动性，从而辅助交易决策。

### 三、足迹图的微观构成
 ![IMG](https://www.fmz.com/upload/asset/399cd31abdffb9313f1b.png) 
足迹图(Footprint Chart)是基于真实的Tick行情来计算，详细的数据都附加在K线上，当鼠标悬停在K线上时，即可呈现量能足迹数据(如上图所示)。方块中的数据就是其计算结果，总共分为两列，箭头左边一列是当前K线所有的价格点位，依次由大到小向上排列。

箭头右边一列就是每个价格水平的交易量，细分为买入交易量和卖出交易量，并用使用分隔符“▲、▼、♦”分隔。在分隔符的左边是主动卖出的成交量，在分隔符的右边就是主动买入的成交量。当某个价位主动买入量大于主动卖出量，分隔符为“▲”，表示向上；当某个价位主动买入量小于主动卖出量，分隔符为“▼”，表示向下；当某个价位主动买入量等于主动卖出量，分隔符为“♦”，表示相等；

最后在最上方是所有买入和卖出的成交量之和，并以“◉”表示；在最下方则是主动买入量与主动卖出量的差，以“⊗”表示。这样可以很直观的看出K线的整体成交量和多头与空头的力量悬殊对比。

### 四、买卖均衡与价格背离

影响价格的涨跌有很多种因素，包括：供求关系、经济周期、政府政策、政治因素、社会因素、季节性因素、市场情绪、外汇政策等等...但这些因素最终都要落实到交易中，也就是买方和卖方。理论上当买方成交量大于卖方成交量，价格就会上涨；当卖方成交量大于买方成交量，价格就会下跌。
 ![IMG](https://www.fmz.com/upload/asset/39034f080ac7efead306.png) 
也就是说成交量是先行于价格的，买卖双方成交量的多少是原因，价格的变化是结果。如果卖方成交量大于买方成交量，理论上价格应该下跌，但实际上价格却是上涨，那么此时买卖力量均衡与价格产生了背离；如果买方成交量大于买方成交量，理论上价格应该上涨，但实际上价格却是下跌，那么此时买卖力量均衡与价格产生了背离；


### 五、策略逻辑
通过观察发现，量增价涨是一种常态，大部分K线都保持这种规律，而买卖均衡与价格背离却是一种偶然。接下来我们利用买卖均衡与价格背离这种现象，看能不能发现交易的秘密。以下是策略逻辑：

- 多头开仓：如果当前无持仓，并且收盘价大于开盘价，并且主动买量小于主动卖量
- 空头开仓：如果当前无持仓，并且收盘价小于开盘价，并且主动买量大于主动卖量
- 多头平仓：如果有多头持仓，并且利润超过100
- 空头平仓：如果有空头持仓，并且利润超过100

### 六、策略回测
- 回测开始日期：2021-06-01
- 回测结束日期：2021-07-01
- 数据品种：螺纹钢主力连续
- 数据周期：一分钟
- 滑点：开平仓各2跳

**回测配置**
 ![IMG](https://www.fmz.com/upload/asset/39485c6f6686a066c03e.png) 

**回测绩效**
 ![IMG](https://www.fmz.com/upload/asset/3973756f7cb4e84e4d50.png) 

**收益概览**
 ![IMG](https://www.fmz.com/upload/asset/3a2df5d05a159239468a.png) 

> 策略参数



|参数|默认值|描述|
|----|----|----|
|contractCode|rb888|合约代码|


> 源码 (javascript)

``` javascript
/*backtest
start: 2021-06-01 00:00:00
end: 2021-07-01 23:59:00
period: 1h
basePeriod: 1h
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
    arr = []
    lastTime = 0
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
            arr.push({
                'open': bar.open,
                'close': bar.close,
                'diff': initiativeBuy - initiativeSell
            })
            if (arr.length > 2) {
                arr.shift()
            }
            let position = exchange.GetPosition()
            let holdAmount = 0
            let profit = 0
            if (position.length > 0) {
                if (position[0].Type == 0 || position[0].Type == 2) {
                    holdAmount = position[0].Amount
                } else {
                    holdAmount = -position[0].Amount
                }
                profit = position[0].Profit
            }
            if (bar.time != lastTime) {
                lastOpen = arr[0].open
                lastClose = arr[0].close
                diff = arr[0].diff
                lastTime = bar.time
                priceDiff = lastClose - lastOpen
                volDiff = diff
                if (holdAmount == 0 && priceDiff > 0 && volDiff < 0) {
                    Log('多开')
                    exchange.SetDirection("buy")
                    exchange.Buy(arr[1].close, 1)
                }
                if (holdAmount == 0 && priceDiff < 0 && volDiff > 0) {
                    Log('空开')
                    exchange.SetDirection("sell")
                    exchange.Sell(arr[1].close - 1, 1)
                }
                if (holdAmount > 0 && profit > 100) {
                    Log('多平')
                    exchange.SetDirection("closebuy")
                    exchange.Sell(arr[1].close - 1, holdAmount)
                }
                if (holdAmount < 0 && profit > 100) {
                    Log('空平')
                    exchange.SetDirection("closesell")
                    exchange.Buy(arr[1].close, -holdAmount)
                }
            }
            
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

https://www.fmz.com/strategy/299037

> 更新时间

2021-07-16 17:22:50
