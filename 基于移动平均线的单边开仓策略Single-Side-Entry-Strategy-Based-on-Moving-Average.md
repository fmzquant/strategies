
> Name

基于移动平均线的单边开仓策略Single-Side-Entry-Strategy-Based-on-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18ab44eece8b6ce3cae.png)

[trans]

### 概述

该策略通过计算不同类型的移动平均线,判断价格趋势方向,实现单边开仓。当价格突破移动平均线时开仓做多或做空。

### 策略原理  

该策略允许选择7种不同的移动平均线类型,包括简单移动平均线(SMA)、指数移动平均线(EMA)、成交量加权平均线(VWMA)、双指数移动平均线(DEMA)、三指数移动平均线(TEMA)、考夫曼自适应移动平均线(KAMA)和价格通道中线。通过计算所选移动平均线和收盘价的关系来判断价格趋势方向。

当收盘价从下向上突破移动平均线时,判断为涨势,开仓做多;当收盘价从上向下突破移动平均线时,判断为跌势,开仓做空。这样可以捕捉价格趋势的转折点,实现单边开仓。

### 优势分析

该策略具有以下优势:

1. 可以选择多种移动平均线类型,灵活适应不同品种和周期。

2. 单边开仓,可以有效控制风险。

3. 顺势开仓,容易获利。

4. 容易理解和实现。

### 风险分析  

该策略也存在一些风险:  

1. 当价格在移动平均线附近震荡时,会出现多次错误信号和反向开仓。可以设置适当的止损来控制风险。  

2. 无法完全避免因价格快速上涨或下跌带来的风险。可以结合其他指标判断趋势信号。

3. 分析师需要选择合适的移动平均线参数,不合适的参数容易产生交易信号的滞后。

### 优化方向

该策略可以从以下几个方面进行优化:

1. 结合其他技术指标判断趋势信号,例如MACD、RSI等,形成交易组合。  

2. 添加止损逻辑。移动止损或挂单止损。

3. 对参数进行测试和优化,选择最佳的参数组合。例如移动平均线周期、移动平均线类型等参数。

4. 可以考虑挂单立即成交类型的进入策略,追踪趋势运行。

## 总结  

该策略基于移动平均线判断价格趋势方向,实现单边开仓。使用简单,容易实现,可以有效控制风险。但也可能出现错误信号和反向开仓的风险。通过组合其他指标判断信号,优化参数,添加止损等方式可以不断改进该策略,使之更稳定和可靠。

|| 

### Overview  

This strategy calculates different types of moving averages to determine the price trend direction and implement single-side entry. It opens long or short positions when the price breaks through the moving average.  

### Strategy Principle

The strategy allows selecting from 7 different moving average types, including Simple Moving Average (SMA), Exponential Moving Average (EMA), Volume-Weighted Moving Average (VWMA), Double Exponential Moving Average (DEMA), Triple Exponential Moving Average (TEMA), Kaufman's Adaptive Moving Average (KAMA) and Price Channel Middle Line. It judges the price trend direction based on the relationship between the selected moving average and the closing price.  

When the closing price breaks through the moving average line upward, it is judged as an uptrend and a long position is opened. When the closing price breaks through the moving average line downward, it is judged as a downtrend and a short position is opened. This can capture turning points in the price trend and achieve single-side entry.

### Advantage Analysis   

The advantages of this strategy are:

1. Various types of moving averages can be selected for flexibility to suit different products and cycles.

2. Single-side entry can effectively control risks.  

3. Entry in the trending direction is easy to profit.

4. It is easy to understand and implement.


### Risk Analysis

There are also some risks with this strategy:  

1. When the price oscillates around the moving average line, there will be multiple false signals and reverse entry positions. Proper stop loss should be set to control risks.

2. It cannot completely avoid risks caused by rapid up or down price movements. Other indicators should be combined to determine the trend signal.  

3. The analyst needs to select appropriate moving average parameters. Unsuitable parameters can easily lead to lagging of the trading signals.


### Optimization Directions  

The strategy can be optimized from the following aspects:

1. Combine with other technical indicators such as MACD, RSI to judge the trend signal and form a trading combination.

2. Add stop loss logic, such as trailing stop loss or pending order stop loss.  

3. Test and optimize parameters like moving average period, moving average type to find the optimal parameter combination.

4. Consider using MarketIfTouched order type for entry, to follow the trend.


### Summary   

The strategy determines the price trend direction based on moving averages, and implements single-side entry. It is simple to use and implement, and can effectively control risks. But there are also risks of false signals and reverse entries. It can be continually improved by combining other signal indicators, optimizing parameters, adding stop loss, to make the strategy more stable and reliable.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|30|MA length|
|v_input_4|true|Type|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|true|Antipila|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's MAs Tests v1.1", shorttitle = "MAs tests 1.1", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

needlong = input(true, "long")
needshort = input(true, "short")
len = input(30, defval = 30, minval = 2, maxval = 1000, title = "MA length")
type = input(1, defval = 1, minval = 1, maxval = 7, title = "Type")
src = input(close, defval = close, title = "Source")
anti = input(true, defval = true, title = "Antipila")

//DEMA
dema = 2 * ema(src, len) - ema(ema(close, len), len)

//TEMA
xPrice = close
xEMA1 = ema(src, len)
xEMA2 = ema(xEMA1, len)
xEMA3 = ema(xEMA2, len)
tema = 3 * xEMA1 - 3 * xEMA2 + xEMA3

//KAMA
xvnoise = abs(src - src[1])
nfastend = 0.20
nslowend = 0.05
nsignal = abs(src - src[len])
nnoise = sum(xvnoise, len)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
kama = nz(kama[1]) + nsmooth * (src - nz(kama[1]))

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

ma = type == 1 ? sma(src, len) : type == 2 ? ema(src, len) : type == 3 ? vwma(src, len) : type == 4 ? dema : type == 5 ? tema : type == 6 ? kama : type == 7 ? center : 0

plot(ma, color = blue, linewidth = 3, transp = 0)

trend = anti == false and close > ma ? 1 : anti == false and close < ma ? -1 : low > ma ? 1 : high < ma ? -1 : trend[1]

longCondition = trend == 1 and trend[1] == -1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

shortCondition = trend == -1 and trend[1] == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    
    
    
    
```

> Detail

https://www.fmz.com/strategy/436514

> Last Modified

2023-12-25 14:09:49
