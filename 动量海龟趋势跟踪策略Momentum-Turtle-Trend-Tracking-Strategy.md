
> Name

动量海龟趋势跟踪策略Momentum-Turtle-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e3de510a555ede9ddd.png)

[trans]

## 概述

动量海龟趋势跟踪策略是一个基于海龟交易法则的趋势跟踪策略。它使用海龟指标来识别趋势,并结合动量指标过滤掉部分噪音交易。这个策略的主要优点是能够抓住强劲的价格趋势,实现超额收益。

## 策略原理

这个策略使用海龟指标中的基本突破系统来判断趋势方向。具体来说,当收盘价高于过去20天的最高价时为看涨信号,这个时候做多;当收盘价低于过去20天的最低价时为看跌信号,策略进行空头。

为了过滤掉部分噪音交易,这个策略还加入了动量因子。如果价格波动度不足5个ATR,那么策略不会进入交易。这可以避免因为空头做多带来小幅度交易的损失。

在开仓后,策略使用海龟原则中的N值突破 exit 来止损。这个系统基于最近20天的最高价和最低价来设置止损位。例如多单的止损价格为过去20天最低价之下2N的ATR。策略的止盈方式比较简单,设置为账户总资产的10%。

## 优势分析

这个策略最大的优势在于它同时结合趋势跟踪和动量管理。海龟交易系统可以准确抓住价格中期趋势,避免被市场噪音干扰。而加入ATR动量过滤则可以进一步减少无谓的交易次数,从而大幅提高盈利空间。

具体来说,这个策略有以下几个优点:

1. 海龟指标判断趋势准确可靠,可以有效跟踪中期趋势
2. 动量过滤机制可以减少不必要的交易,避免输在交易次数上
3. 风险控制措施到位,可以在趋势反转时及时止损
4. 总体而言,策略参数优化充分,与海龟原则契合度高

## 风险分析

尽管这个策略的优化空间很大,但它也存在一些潜在风险需要防范:

1. 无法解决长期持仓的超额波动问题。海龟系统的position sizing没有考虑波动率因素,可能导致单笔损失过大。
2. 当行情出现剧烈反转时,止损价格可能会被突破,导致超出预期的损失。
3. 系统并没有设置盈利目标,容易出现超额持仓的情况。这会带来抱单的风险。

## 优化方向 

根据上述风险分析,这个策略还有以下几个主要的优化方向:

1. 可以考虑加入波动率调整的动态仓位算法,这样可以在持仓亏损达到一定幅度时主动减仓。
2. 增加反转机制,在形成类似头肩顶和双顶的形态时考虑减仓或反向做空。
3. 增加盈利目标设置。当累计盈利达到账户总资产的一定比例时,可以部分减仓回血。

## 总结

动量海龟趋势跟踪策略总体而言是一个非常实用的中长线趋势跟踪方案。它同时结合了海龟指标判断趋势和ATR指标的震荡过滤,可以有效锁定强劲的价格趋势。此外,策略的风险控制和参数优化也做的非常到位,可以降低回撤幅度。如果继续加入动态仓位管理、反转机制和盈利目标等模块,这个策略的效果还可以得到进一步的提升。
|| 

## Overview

The Momentum Turtle Trend Tracking strategy is a trend following strategy based on the Turtle Trading rules. It uses the Turtle Indicators to identify trends and combines momentum metrics to filter out some noise trades. The main advantage of this strategy is the ability to capture strong price trends and achieve excess returns.  

## Strategy Principle  

This strategy uses the breakout system in the Turtle Indicators to determine the trend direction. Specifically, when the closing price is higher than the highest price over the past 20 days, it is a bullish signal and goes long; when the closing price is lower than the lowest price over the past 20 days, it is a bearish signal and the strategy goes short.

To filter out some noise trades, this strategy also incorporates a momentum factor. If the price fluctuation is less than 5 ATRs, the strategy will not enter trades. This avoids losses from whipsaws in sideways markets.   

After opening positions, the strategy uses the N-breakout exits in the original Turtle rules for stop loss. This system sets the stop loss based on the highest and lowest prices over the past 20 days. For example, the stop loss for long positions would be 2N ATRs below the lowest low over the past 20 days. The profit taking for this strategy is simple - set at 10% of total account value.

## Advantage Analysis 

The biggest advantage of this strategy is that it combines both trend following and momentum management. The Turtle system can accurately capture mid-term trends in prices without being disturbed by market noise. The additional ATR momentum filter further reduces unnecessary number of trades, thus greatly increasing profit potential.   

Specifically, this strategy has the following strengths:  

1. Turtle indicators accurately identify trends and track mid-term trends.  
2. Momentum filters reduce unnecessary trades and avoid losing on trade frequency.
3. Solid risk control measures allow timely stop losses when trends reverse.  
4. Overall the strategy tuning aligns well with original Turtle principles.  

## Risk Analysis

Although there is large potential for further optimization, the strategy also carries some risks to guard against:  

1. Fails to address excessive fluctuations for long-term holdings. Turtle position sizing does not consider volatility which may lead to oversized losses.
2. Stop loss prices risk being taken out during extreme reversals, leading to higher than expected losses.  
3. Lack of profit targets means excessive holdings and risk of holding underwater positions.  

## Enhancement Opportunities  

Based on the above risks, the main optimization opportunities include:  

1. Consider dynamic position sizing models adjusted for volatility to trim size on losing trades.  
2. Add reversal mechanisms to reduce or reverse on topping patterns like head & shoulders or double tops. 
3. Add profit targets so that holdings are reduced when cumulative profits reach a % of total capital.   

## Conclusion  

Overall the Momentum Turtle Trend Tracking strategy is a robust system for mid to long term trend following. It combines Turtle indicators for trend identification and ATR filters for volatility management to capture strong trends. Additionally risk controls and parameter tuning are solid to reduce drawdowns. Further enhancements like dynamic sizing, reversals and profit taking can improve performance.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2029|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|30|roclength|
|v_input_8|7|pcntChange|
|v_input_9|2|Stop Loss %|
|v_input_10|5000|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-23 00:00:00
end: 2023-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Heiken Ashi BF ?", overlay=false, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

/////////////// Time Frame ///////////////
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2029, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

///////////// HA /////////////
haTicker = heikinashi(syminfo.tickerid)
haOpen = security(haTicker, "D", open)
haHigh = security(haTicker, "D", high)
haLow = security(haTicker, "D", low)
haClose = security(haTicker, "D", close)

///////////// Rate Of Change ///////////// 
source = close
roclength = input(30, minval=1)
pcntChange = input(7.0, minval=1)
roc = 100 * (source - source[roclength]) / source[roclength]
emaroc = ema(roc, roclength / 2)
isMoving() => emaroc > (pcntChange / 2) or emaroc < (0 - (pcntChange / 2))

/////////////// Strategy ///////////////
long = haOpen < haClose and isMoving()
short = haOpen > haClose and isMoving()

last_long = 0.0
last_short = 0.0
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = 0.0
last_open_short_signal = 0.0
last_open_long_signal := long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal := short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = 0.0
last_short_signal = 0.0
last_long_signal := long_signal ? time : nz(last_long_signal[1])
last_short_signal := short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = 0.0
last_low = 0.0
last_high := not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

sl_inp = input(2.0, title='Stop Loss %') / 100
tp_inp = input(5000.0, title='Take Profit %') / 100
 
take_level_l = strategy.position_avg_price * (1 + tp_inp)
take_level_s = strategy.position_avg_price * (1 - tp_inp)

since_longEntry = barssince(last_open_long_signal != last_open_long_signal[1])
since_shortEntry = barssince(last_open_short_signal != last_open_short_signal[1]) 

slLong = in_long_signal ? strategy.position_avg_price * (1 - sl_inp) : na
slShort = strategy.position_avg_price * (1 + sl_inp)
long_sl = in_long_signal ? slLong : na
short_sl = in_short_signal ? slShort : na

/////////////// Execution ///////////////
if testPeriod()
    strategy.entry("L",  strategy.long, when=long)
    strategy.entry("S", strategy.short, when=short)
    strategy.exit("L SL", "L", stop=long_sl, limit=take_level_l, when=since_longEntry > 0)
    strategy.exit("S SL", "S", stop=short_sl, limit=take_level_s, when=since_shortEntry > 0)

/////////////// Plotting ///////////////
plotcandle(haOpen, haHigh, haLow, haClose, title='HA Candles', color = haOpen < haClose ? color.lime : color.red)
bgcolor(isMoving() ? long ? color.lime : short ? color.red : na : color.white, transp=70)
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=50)
```

> Detail

https://www.fmz.com/strategy/432979

> Last Modified

2023-11-23 11:53:27
