
> Name

基于一小时TENKAN-KIJUN交叉的ADX趋势跟踪策略ADX-Based-One-Hour-TENKAN-KIJUN-Cross-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/209f44aa6c44f0cc0ed.png)

[trans]

### 概述

此策略是一个简单但盈利的趋势跟踪策略,它基于一小时时间框架上的ICHIMOKU标识系统的TENKAN线和KIJUN线的交叉来判断趋势方向,并结合ADX指标来过滤掉趋势较弱的市场从而发出交易信号。该策略主要适用于ETH/BTC等大市值altcoin的BTC交易对。

### 策略原理

该策略使用ICHIMOKU云图的Conversion Line(TENKAN线)和Base Line(KIJUN线)的交叉来判断市场趋势方向。其中,TENKAN线计算方法是过去18根K线的最近高点和最近低点的平均值,代表快速转换线;KIJUN线计算方法是过去58根K线的最近高点和最近低点的平均值,代表标准转换线。

当快速转换线从下方上穿标准转换线时,为看涨信号;当快速转换线从上方下穿标准转换线时,为看跌信号。这样可以捕捉到中短期趋势的转折。

同时,策略还结合ADX指标来过滤调整市场趋势强度。ADX指标能判断趋势的力度,当ADX值大于20时,表示当前趋势较强。所以策略只在ADX大于20时才发出交易信号。

综上,该策略通过TENKAN线和KIJUN线的交叉判断中短期趋势方向,配合ADX指标过滤假突破从而锁定真实趋势,实现追踪中长期趋势的目的。

### 优势分析

该策略主要有以下几个优势:

1. 使用ICHIMOKU云图判断趋势方向,这套指标系统本身就较为成熟和可靠,能准确判断趋势转折点。

2. 结合ADX指标过滤调整强度较弱的市场,避免在盘整中频繁交易。

3. 采用1小时线开发策略,能过滤短期市场噪音,只捕捉中长线趋势。

4. 策略较为简单直观,容易理解和跟踪,适合趋势跟踪者使用。

5. 策略回测效果较好,特别在ETH/BTC等大市值币对上表现不俗。

### 风险分析

该策略也存在一些风险需要注意:

1. ICHIMOKU云图本身对参数敏感,不同周期参数的效果差异很大,需要针对不同币对自定义最佳参数。

2. ADX指标在某些情况下会延迟给出信号,可能导致错过最佳入场时机。

3. 追踪中长线趋势策略,在震荡行情中表现不佳,容易止损。

4. 不同币对和不同时间周期该策略效果差异很大,需要根据自己擅长的品种选择使用。

5. 长期持有仓位风险大,需要适当设定止损和止盈条件。

该策略可以通过调整ADX参数,或加入MACD等其他指标来辅助过滤信号,以减少虚拟信号和提高策略稳定性。也可以通过动态调整参数以适应不同行情类型来获得更好的鲁棒性。

### 优化方向  

该策略还有以下几个主要优化方向:

1. 动态优化TENKAN线和KIJUN线的参数,使之更好适应实时行情和不同币种。

2. 优化或替换ADX指标,寻找更加灵敏和高效的趋势判断手段。

3. 加入止损止盈策略,控制单笔交易的风险收益比,避免巨亏。

4. 进行组合优化,寻找互补指标形成集成策略,提高稳定性。

5. 对代码结构进行模块化改造,增加自定义参数的灵活度,适应更多品种。

6. 添加量化风控手段,如最大回撤、相关系数等,防范极端行情的风险。

### 总结

综上所述,该策略整体而言是一个简单实用的趋势跟踪策略。它主要基于TENKAN KIJUN交叉结合ADX指标判断中长线趋势方向并发出交易信号。该策略回测效果较佳,特别适合作用在ETH/BTC等大市值币对,可以获得较为稳定的盈利。但该策略也存在一定的参数依赖性,需要针对不同币种和行情类型进行优化。同时也需要控制单笔交易风险,避免亏损扩大。总的来说,该策略为量化交易者提供了一个有价值的趋势跟踪策略参考。

||


### Overview

This is a simple yet profitable trend tracking strategy based on one-hour time frame TENKAN and KIJUN cross in the ICHIMOKU system combined with ADX indicator to filter out weak trending markets to generate trading signals. It works best on large market cap altcoin BTC pairs like ETH/BTC.

### Strategy Logic  

The strategy uses Conversion Line (TENKAN) and Base Line (KIJUN) cross in ICHIMOKU system to determine market trend direction. TENKAN line is calculated based on the average of highest high and lowest low of past 18 candles, representing fast conversion line. KIJUN line is based on 58 candle periods, standing for standard conversion line.

When TENKAN cross above KIJUN, it is a bullish signal. When TENKAN cross below KIJUN, it is a bearish signal. This aims to capture medium-term trend reversal. 

In addition, ADX indicator is used to gauge the strength of the trend. Only when ADX is above 20, indicating a strong trend, will the signal be triggered.

In summary, this strategy identifies mid-term trend direction via TENKAN and KIJUN cross, and uses ADX to filter out false breakouts, in order to track long-term trends.

### Advantage Analysis 

The main advantages of this strategy are:

1. Using mature and reliable ICHIMOKU system to determine trend direction and turning points.

2. Filtering out weak trending market using ADX to avoid whipsaws in consolidation. 

3. The one-hour timeframe filters market noise and only captures mid-to-long term trends.

4. The logic is straightforward and easy to follow for trend traders.

5. Solid backtesting results especially on high market cap coins like ETH/BTC.

### Risk Analysis

Some risks to note about this strategy:

1. ICHIMOKU parameters are sensitive, needs customization for different pairs.

2. ADX may lag in some cases, causing missed entry.

3. Underperforms in ranging markets with frequent stop loss hit. 

4. Performance varies greatly across different pairs and timeframes.

5. Long holding of positions can be risky, proper stop loss/take profit needed.

Optimization can be done via ADX parameter tuning, adding filters like MACD to reduce false signals, or dynamical adjustment of parameters for robustness.

### Optimization Directions   

Some major directions to improve the strategy:

1. Dynamic optimization of TENKAN and KIJUN parameters for better adaptation.

2. Searching for better trend indicators to replace or combine with ADX.

3. Adding stop loss/take profit to control risk/reward ratio.

4. Ensemble modeling with complementary indicators to improve stability. 

5. Modularization and flexibility for parameter tuning on more pairs.

6. Quantitative risk management e.g. max drawdown control against extreme moves.

### Conclusion

In conclusion, this is a simple yet practical trend tracking strategy, mainly based on TENKAN/KIJUN cross and ADX to identify mid-to-long term trends and generate signals. It has shown positive backtesting results, especially on high market cap BTC pairs like ETH/BTC, with relatively stable profitability. But it also relies on parameter tuning, requires per-pair optimization. Risk control per trade is also necessary to limit losses when trends reverse. Overall this offers valuable reference of a trend following strategy for algo traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|18|Conversion Line Periods (Tenkan)|
|v_input_3|58|Base Line Periods (Kijun)|
|v_input_4|14|ADX Smoothing|
|v_input_5|14|DI Length|
|v_input_6|20|threshold|
|v_input_7|3|From Day|
|v_input_8|9|From Month|
|v_input_9|2018|From Year|
|v_input_10|3|To Day|
|v_input_11|9|To Month|
|v_input_12|2019|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-07 00:00:00
end: 2023-12-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="Odin's Kraken (TK Cross Strategy)", shorttitle="Odin's Kraken", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

src = input(close, title="Source")

// define tk in ichimoku

conversionPeriods = input(18, minval=1, title="Conversion Line Periods (Tenkan)"),
basePeriods = input(58, minval=1, title="Base Line Periods (Kijun)")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)

TK_Uptrend = crossover(conversionLine,baseLine)
TK_Downtrend = crossunder(conversionLine,baseLine)

plot(conversionLine, color=lime, title="Tenkan", linewidth=3)
plot(baseLine, color=red, title="Kijun", linewidth=3)

// define ADX

adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
th = input(title="threshold", defval=20)
dirmov(len) =>
	up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)

	[plus, minus]

adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	
[plus, minus] = dirmov(dilen)
sig = adx(dilen, adxlen)

// backtesting range

// From Date Inputs
fromDay = input(defval = 3, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2018, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 3, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 9, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2019, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

// open long and short

longCondition = TK_Uptrend
if (longCondition and sig > 12 and time_cond)
    strategy.entry("LONG", strategy.long)

shortCondition = TK_Downtrend
if (shortCondition and sig > 12 and time_cond)
    strategy.entry("SHORT", strategy.short)

// close trade if backtesting criteria not met

if (not time_cond)
    strategy.close_all()



```

> Detail

https://www.fmz.com/strategy/434704

> Last Modified

2023-12-08 15:37:00
