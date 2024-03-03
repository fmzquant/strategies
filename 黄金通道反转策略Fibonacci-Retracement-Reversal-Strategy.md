
> Name

黄金通道反转策略Fibonacci-Retracement-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1276e6357bd9d78d791.png)
[trans]


## 概述

黄金通道反转策略是一种基于黄金分割线和相对强弱指标(RSI)的量化交易策略。该策略结合黄金通道理论和超买超卖指标,在大周期趋势下进行反转操作,以期在短周期内获利。

## 策略原理

策略首先计算出黄金分割线的两个重要价格区域,即0.618倍高点和0.618倍低点。当价格接近这两个区域时,我们认为价格可能出现反转。

此外,策略还计算RSI指标判断超买超卖状态。当RSI低于30时为超卖状态,高于70时为超买状态。这两个状态也意味着价格可能反转。

综合这两个条件,策略判断买入条件为:收盘价上穿0.618倍低点 且 RSI指标低于30;卖出条件为:收盘价下穿0.618倍高点 且 RSI指标高于70。

当触发买入信号后,策略会在该点市价开仓做多;当触发卖出信号后,策略会在该点市价开仓做空。此外,策略还会设置止盈止损位,当价格向有利方向移动到一定比例后止盈,当价格向不利方向移动到一定比例后止损。

## 策略优势分析

该策略结合了趋势和反转因素,既考虑大周期趋势,也利用短周期反转获利。具有以下优势:

1. 黄金分割线具有天然的支撑阻力属性,是判断关键价格区域的有效工具。
2. RSI指标判断超买超卖状态,提示可能的反转点。
3. 做多做空信号明确,不会错过反转机会。
4. 设置止盈止损策略,可控的风险。

## 策略风险分析

该策略也存在一些风险需要防范:

1. 如果大周期没有反转,短周期反弹会造成亏损的风险。可通过放大周期判断大周期趋势来规避。
2. 反转没有发生时,设置止损可能会被触发,带来亏损。可适当放宽止损范围。
3. 反转时间可能会拖得很长,需要有足够的资金支持。

## 策略优化方向

该策略还可从以下方面进行优化:

1. 搜集更多历史数据,对关键参数如黄金分割线的范围、RSI的超买超卖线进行测试和优化,使其更符合真实市场。

2. 增加其它指标判断,形成更强有力的交易信号。如K线形态、成交量变化等。

3. 根据不同交易品种的特点,调整参数或优化规则。

4. 增加自动止损策略,跟踪价格实时变化来决定止损位置。

## 总结

黄金通道反转策略结合趋势因素和反转因素,利用短线获利的同时控制风险,是一种值得推荐的量化策略。优化后可望获取更佳回报。

||  


## Overview  

The Fibonacci Retracement Reversal strategy is a quantitative trading strategy based on Fibonacci retracement levels and the Relative Strength Index (RSI) indicator. This strategy combines the Fibonacci channel theory and overbought/oversold indicator to make reversal trades against the major trend in order to profit in the short-term cycles.  

## Strategy Logic  

The strategy first calculates two important price zones based on the 0.618 Fibonacci levels - the 0.618 times high point and 0.618 times low point. When prices approach these areas, we believe a reversal may occur.

In addition, the strategy also uses the RSI indicator to determine overbought/oversold conditions. RSI below 30 indicates oversold status while RSI above 70 suggests overbought condition. These also imply potential price reversals.

Combining the two conditions, the buy signal is triggered when: close breaks above the 0.618 times low point AND RSI is below 30; the sell signal triggers when: close breaks below the 0.618 times high point AND RSI goes over 70. 

Upon buy signal, the strategy will long at market price. Upon sell signal, it will short at market price. Also, take profit and stop loss levels are set so that the position will be closed when price moves favorably by certain percentage (take profit) or moves adversely by certain percentage (stop loss).

## Pros  

The strategy combines both trend and reversal scenarios, taking into account major trend while profiting from short-term retracement. The main advantages are:

1. Fibonacci levels have inherent support/resistance attributes, serving as effective price zone indicator.  
2. RSI overbought/oversold status suggests potential turning points.
3. Long/short signals are clear, catching reversal chances.  
4. Take profit/stop loss controls risk.

## Risks 

There are some risks to be awared of:

1. Losses may occur if no major trend reversal happens despite short-term bounces. Larger timeframe analysis can help avoid this.  
2. Stop loss may be triggered before reversal happens. Wider stop loss zone could help.
3. Reversals may sustain for long time, requiring sufficient capital support.

## Optimization  

The strategy can be further optimized by:

1. Collect more historical data to test and tune key parameters like Fibonacci zone range and RSI overbought/oversold lines for better fit to real market.

2. Incorporate more indicators to generate stronger signals, like candlestick patterns, volume changes etc.  

3. Adjust parameters or rules according to different trading instruments' characteristics.

4. Add dynamic stop loss mechanism to trail price real-time.

## Conclusion  

The Fibonacci Retracement Reversal strategy balances trend and reversal scenarios to profit in short-term while controlling risks. Further optimizations may lead to greater returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.618|Fibonacci Düzeltme Seviyesi|
|v_input_2|14|RSI Periyodu|
|v_input_3|70|RSI Satış Sinyali Seviyesi|
|v_input_4|30|RSI Alış Sinyali Seviyesi|
|v_input_5|true|Take Profit Yüzdesi|
|v_input_6|true|Stop Loss Yüzdesi|
|v_input_7|27|Fibonacci Destek Seviyesi|
|v_input_8|200|Direnç Seviyesi|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("FBS Trade", overlay=true)

// Fibonacci seviyeleri
fibonacciLevels = input(0.618, title="Fibonacci Düzeltme Seviyesi")

// RSI ayarları
rsiLength = input(14, title="RSI Periyodu")
overboughtLevel = input(70, title="RSI Satış Sinyali Seviyesi")
oversoldLevel = input(30, title="RSI Alış Sinyali Seviyesi")

// Take Profit ve Stop Loss yüzdesi
takeProfitPercent = input(1, title="Take Profit Yüzdesi") / 100
stopLossPercent = input(1, title="Stop Loss Yüzdesi") / 100

// Fibonacci seviyelerini hesapla
highFibo = high * (1 + fibonacciLevels)
lowFibo = low * (1 - fibonacciLevels)

// RSI hesaplama
rsiValue = ta.rsi(close, rsiLength)

// Alış ve satış koşulları
buyCondition = close > lowFibo and rsiValue < 30
sellCondition = close < highFibo and rsiValue > overboughtLevel

// Take Profit ve Stop Loss seviyeleri
takeProfitLong = strategy.position_avg_price * (1 + takeProfitPercent)
stopLossLong = strategy.position_avg_price * (1 - stopLossPercent)

takeProfitShort = strategy.position_avg_price * (1 - takeProfitPercent)
stopLossShort = strategy.position_avg_price * (1 + stopLossPercent)

// Alış ve satış işlemleri
if (buyCondition)
    strategy.entry("Buy", strategy.long)
if (sellCondition)
    strategy.entry("Sell", strategy.short)

// Take Profit ve Stop Loss seviyeleri
if (strategy.position_size > 0)
    strategy.exit("Take Profit/Close Buy", from_entry="Buy", limit=takeProfitLong, stop=stopLossLong)
if (strategy.position_size < 0)
    strategy.exit("Take Profit/Close Sell", from_entry="Sell", limit=takeProfitShort, stop=stopLossShort)

// Sadece mumları ve buy/sell işlemlerini göster
plot(close, color=color.black, title="Close")

// Destek ve direnç bölgeleri
supportLevel = input(27, title="Fibonacci Destek Seviyesi")
resistanceLevel = input(200, title="Direnç Seviyesi")

hline(supportLevel, "Fibonacci Destek Seviyesi", color=color.green)
hline(resistanceLevel, "Direnç Seviyesi", color=color.red)

// Trend çizgileri
var line trendLine = na
if (ta.crossover(close, highFibo))
    trendLine := line.new(bar_index[1], highFibo[1], bar_index, highFibo, color=color.green, width=2)
if (ta.crossunder(close, lowFibo))
    trendLine := line.new(bar_index[1], lowFibo[1], bar_index, lowFibo, color=color.red, width=2)

// RSI ve Fibo'yu grafiğe çizme
hline(overboughtLevel, "RSI Satış Sinyali", color=color.red, linestyle=hline.style_dashed)
hline(oversoldLevel, "RSI Alış Sinyali", color=color.green, linestyle=hline.style_dashed)
plot(rsiValue, color=color.purple, title="RSI")

// 15 dakikalıkta 3 mumda bir alarm
is15MinBar = ta.change(time('15'), 1)
if (is15MinBar % 3 == 0)
    alert("15 dakikalıkta 3 mum geçti.")

```

> Detail

https://www.fmz.com/strategy/434551

> Last Modified

2023-12-07 15:15:26
