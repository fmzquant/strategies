
> Name

坎夫曼自适应移动平均趋势跟踪策略Kaufmans-Adaptive-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18fcf961760176b1c98.png)
[trans]

## 概述

该策略运用坎夫曼自适应移动平均线(KAMA)来判断趋势方向,以捕捉中长线趋势为主。当KAMA线上涨时做多,当KAMA线下跌时做空。该策略融合了移动平均线的趋势跟踪功能和坎夫曼自适应平均线的动态调整特性,旨在提高交易信号的质量。

## 策略原理

该策略的核心指标是坎夫曼自适应移动平均线(KAMA)。KAMA根据市场波动度的大小来动态调整自己的加权因子,从而提高曲线的灵敏度。具体来说,当市场波动加大时,KAMA的曲线变得更加平滑;当市场波动减小时,KAMA的曲线变得更加灵敏。这样可以过滤掉部分噪音,同时又可以及时捕捉新的趋势转折。

策略首先计算KAMA的值。然后判断KAMA线的多空状态:当close价格上穿KAMA线时产生买入信号;当close价格下穿KAMA线时产生卖出信号。根据这些交易信号开仓做多做空。

## 优势分析

该策略最大的优势在于利用KAMA指标进行趋势判断。KAMA指标本身就具有很强的趋势跟踪能力,它可以动态调整参数来适应市场状况,从而产生更可靠的交易信号。相比简单移动平均线和指数移动平均线,KAMA指标可以更好地识别趋势,减少虚假信号。

另外,该策略只利用KAMA的多空状态来判断趋势方向。没有设置额外的过滤条件,这简化了策略逻辑,也使参数较少,降低了过度优化的风险,有利于参数稳定性和跨市场适应性。

## 风险分析

该策略主要风险在于KAMA本身作为滞后指标,交易信号产生时市场趋势可能已经发生反转。这会导致止损风险。另外,KAMA曲线当中也会出现短期的震荡态势,这可能产生一些频繁的错误信号。

为降低风险,可以考虑结合其他指标来确认交易信号,比如波动率指标、成交量指标等。也可以适当调整参数,Identification使KAMA曲线更加平滑。

## 优化方向  

该策略优化空间还很大,主要可以从以下几个方面入手:

1. 结合其他指标进行信号过滤,如MACD、震荡指标等,提高信号质量

2. 增加止损策略,利用移动止损或余额曲线止损来控制单笔损失

3. 优化参数,使KAMA更有效地捕捉趋势

4. 增加多时间周期分析,利用更高时间周期确定大趋势方向

5. 利用机器学习方法自动优化参数,使参数适应不同品种

## 总结

该策略整体思路清晰,通过KAMA指标判断趋势方向,具有趋势跟踪能力强、逻辑简单、参数较少等优点。但也存在滞后识别趋势反转的风险。可以通过多种方式来优化该策略,使其效果更好,适应性更广。

||

## Overview

This strategy uses Kaufman's Adaptive Moving Average (KAMA) to determine the trend direction for catching medium-to-long term trends. It goes long when the KAMA line moves up and goes short when the KAMA line moves down. The strategy combines the trend tracking capability of moving averages and the dynamic adjustment feature of KAMA to improve the quality of trading signals.  

## Strategy Logic

The core indicator of this strategy is Kaufman's Adaptive Moving Average (KAMA). KAMA dynamically adjusts its weighting factor based on the magnitude of market volatility, thereby improving the sensitivity of the curve. Specifically, when market volatility increases, the KAMA curve becomes smoother; when market volatility decreases, the KAMA curve becomes more sensitive. This filters out some noise while still capturing new trend reversals in a timely manner.

The strategy first calculates the value of KAMA. Then it determines the long/short state of the KAMA line: a buy signal is generated when the close price crosses above the KAMA line, and a sell signal is generated when the close price crosses below the KAMA line. Positions are opened based on these trading signals.  

## Advantage Analysis 

The biggest advantage of this strategy is the use of the KAMA indicator for trend determination. The KAMA indicator itself has very strong trend tracking capability. It can dynamically adjust parameters to adapt to market conditions, thereby producing more reliable trading signals compared to simple moving averages and exponential moving averages.

In addition, the strategy only uses the long/short state of KAMA to determine the trend direction. There are no additional filters, which simplifies the strategy logic and reduces the number of parameters, lowering the risk of overfitting and improving stability and adaptability across markets.

## Risk Analysis

The main risk of this strategy is that KAMA is a lagging indicator, so the market trend may have already reversed by the time the trading signals are generated, leading to stop loss risks. In addition, there can be short-term oscillations in the KAMA curve, which may produce some frequent false signals. 

To mitigate risks, other indicators may be combined to confirm trading signals, such as volatility indicators, volume indicators, etc. The parameters can also be adjusted to make the KAMA curve smoother.

## Optimization Directions

There is still large room for optimizing this strategy, mainly in the following aspects:

1. Combine other indicators for signal filtering, such as MACD, oscillators etc, to improve signal quality. 

2. Add stop loss strategies like moving stop loss or equity curve based stops to control single trade loss.

3. Optimize parameters to make KAMA more effective at catching trends. 

4. Add multi-timeframe analysis to determine major trend direction using higher timeframes.

5. Use machine learning methods to auto optimize parameters for adapting across instruments.

## Conclusion

The overall logic of this strategy is clear, using KAMA indicator to determine trend direction. It has advantages like strong trend tracking capability, simple logic and fewer parameters. But it also has the risk of lagging in identifying trend reversals. The strategy can be improved in many ways to make it more effective and adaptable.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot|
|v_input_4|3|length|
|v_input_5|2|fast|
|v_input_6|30|slow|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|0|Type: Trend|Crossing|
|v_input_9|1900|From Year|
|v_input_10|2100|To Year|
|v_input_11|true|From Month|
|v_input_12|12|To Month|
|v_input_13|true|From day|
|v_input_14|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=3
strategy(title = "Noro's KAMA Strategy", shorttitle="KAMA str", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot")
length = input(3, minval = 1) 
fast = input(2, minval = 1)
slow = input(30, minval = 1)
src = input(title = "Source",  defval = close)
type = input(defval = "Trend", options = ["Trend", "Crossing"], title = "Type")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//KAMA
volatility = sum(abs(src-src[1]), length)
change = abs(src[1]-src[length])
er = iff(volatility != 0, change/volatility, 0)
fastSC = 2/(fast+1)
slowSC = 2/(slow+1)
sc = pow((er*(fastSC-slowSC))+slowSC, 2)
bid = hl2
kama = 0.0
kama := nz(kama[1])+(sc*(bid-nz(kama[1])))
plot(kama, color = black, title = "KAMA", trackprice = false, style = line, linewidth = 3)

//Signals
up = false
dn = false
up := (type == "Crossing" and kama > kama[1]) or (type == "Trend" and close > kama)
dn := (type == "Crossing" and kama < kama[1]) or (type == "Trend" and close < kama)

//Trading
size = strategy.position_size
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]
if up
    strategy.entry("L", strategy.long, needlong ? lot : 0, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if dn
    strategy.entry("S", strategy.short, needshort ? lot : 0, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
```

> Detail

https://www.fmz.com/strategy/435280

> Last Modified

2023-12-13 17:25:33
