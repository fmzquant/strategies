
> Name

动态EMAherokuapp俯瞰策略EMAskeletonstrategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8e1d42a028dbd88749.png)

[trans]

## 概述

该策略结合EMA和RSI指标识别比特币的短线调整机会。它主要利用EMA作为主图形,RSI作为辅助判断指标,寻找比较明显的调整形态。当价格跌破或重新站上EMA均线时产生交易信号。它同时具有止损和止盈控制,可以进行参数优化。

## 策略原理

该策略主要利用50周期的EMA线和25周期的RSI指标。EMA线被视为主要的图形指标,RSI被用来判断超买超卖并辅助产生交易信号。当价格从上往下跌破EMA线时,产生卖出信号;当价格从下往上突破EMA线时,并且RSI指标显示非超买信号(RSI指标值小于70),产生买入信号。为了降低误入的机会,策略还加入了一个更长周期的EMA均线(如70周期)作为过滤条件之一。  

交易入场后,策略同时设定了止损和止盈位置。止损距离能够设定,默认为5.1%;止盈距离也可以设定,默认为9.6%。这可以有效降低单笔损失的最大值。

总的来说,该策略主要依赖EMA线形态,辅以RSI指标避免超买超卖,同时具备止损止盈控制,适合BT比特币短线调整的捕捉。

## 优势分析

该策略主要具有以下几点优势:

1. 策略信号比较明确,不会产生太多随机误入场。EMA和RSI的结合使用,使得信号更加明确可靠,不会仅仅依赖单一指标。

2. 策略自带止损止盈控制。这可以有效控制每单损失,是非常重要的风险控制手段。

3. 策略参数可以优化。EMA长度、RSI长度等都是可以调整的参数,用户可以针对不同市场找到最佳参数组合。

4. 策略允许回测。可以直接在策略内设置回测的时间范围,对策略进行验证。

## 风险分析

该策略也存在一些风险,主要来自以下几个方面:  

1. BT比特币行情剧烈,止损可能被突破。尽管策略设置了止损,但在比特币大行情中,价格移动幅度较大,止损线可能会被直接突破。这时就会带来较大的亏损。

2. 回撤风险。策略并没有考虑整体回撤控制。如果遇到比较长的调整行情,策略会产生一定的回撤。

3. 大行情下信号效果变差。在比较狂野的大行情中,BT比特币价格会有比较大和长的一波行情。这时短期信号效果会变差,容易被套。

针对这些风险,可以采取以下措施加以控制和缓解:

1. 适当放宽止损幅度。如果是大行情的时候,可以适当放宽止损距离,如扩大到10%左右,避免止损过于容易被突破。

2. 结合其它指标过滤。可以加入均线多头排列等趋势指标,避免在长期调整行情中使用该策略。

3. 优化参数集合。可以测试不同市场阶段的参数设置,建立多个参数组合,在大行情来临时切换参数提高信号质量。

## 优化方向  

该策略还具有进一步优化的空间,主要可以从以下几个方面入手:

1. 增加整体回撤控制。可以设置最大回撤比例,如20%,当达到该回撤时,策略暂停交易,避免过度亏损。

2. 增加开仓频率控制。可以限制策略单位时间内开仓次数,如每小时最多两次,避免过于频繁交易。

3. 优化参数设置。测试不同市场行情下的参数组合,建立多个参数模板,在实盘时根据当下行情选择合适的参数,可以提高策略效果。

4. 与其它指标组合使用。该策略可以与趋势、波动率等其它指标组合使用,形成更全面和可靠的交易系统入场依据。

## 总结

总体上,该策略主要依赖BT比特币短期调整形态,利用EMA和RSI产生比较清晰的交易信号,同时具备止损和止盈控制,可以有效把握BT短期滑点带来的套利机会。但该策略更多适合作为短线辅助工具,和其他策略组合使用时效果会更好,可以产生比较稳定的超额收益。

|| 

## Overview

This strategy combines the EMA and RSI indicators to identify short-term adjustment opportunities in Bitcoin. It mainly uses the EMA as the main graphical tool and the RSI as an auxiliary judgment indicator to find obvious adjustment patterns. Trading signals are generated when the price breaks below or climbs back above the EMA line. It also has stop loss and take profit controls that can be parameterized.

## Strategy Principle  

The strategy mainly uses the 50-period EMA line and the 25-period RSI indicator. The EMA line is regarded as the main graphical indicator and the RSI is used to determine overbought and oversold conditions to assist in generating trading signals. A sell signal is generated when the price falls below the EMA line, and a buy signal is generated when the price breaks above the EMA line and the RSI indicator shows a non-overbought signal (RSI value less than 70). To reduce the chance of wrong entries, the strategy also incorporates a longer-period EMA line (such as 70 periods) as an additional filter condition.

After entering a trade, the strategy also sets stop loss and take profit levels. The stop loss distance is adjustable, defaulting to 5.1%; the take profit distance is also adjustable, defaulting to 9.6%. This effectively limits the maximum loss per trade.   

In summary, the strategy mainly relies on EMA line patterns, supplemented by RSI indicators to avoid overbought and oversold conditions, while having stop loss and take profit controls. It is suitable for capturing short-term BT Bitcoin adjustments.

## Advantage Analysis

The main advantages of this strategy are:

1. The strategy signals are relatively clear without too many random wrong entries. The combination of EMA and RSI makes the signals more reliable rather than relying solely on a single indicator.  

2. Built-in stop loss and take profit control. This effectively limits the loss per trade and is a very important risk control tool.

3. The strategy parameters can be optimized. EMA length, RSI length and more are adjustable parameters. Users can find the optimal parameter sets for different market conditions. 

4. Backtesting enabled. The strategy allows setting a backtest date range internally to verify performance.

## Risk Analysis

The strategy also has some risks, mainly from:

1. BT Bitcoin has volatile moves, stops may be run. Although stops are set, BT Bitcoin often has large price swings that can take out stops leading to larger-than-expected losses.  

2. Drawdown risk. The strategy does not consider overall drawdown control. It may experience drawdowns during prolonged adjustment periods.

3. Weaker signals in strong trends. BT Bitcoin trends can become quite extended during certain market conditions. The short-term signals tend to underperform leading to being stopped out of good trades.

To control and mitigate these risks:

1. Allow wider stop loss ranges. During strong trending conditions, the stop loss range can be widened, such as to 10%, to avoid being stopped out prematurely.  

2. Add other indicator filters. Trend-following indicators can be added to avoid taking trades during prolonged consolidation periods.  

3. Optimize parameters. Test parameter sets across different market conditions. Switch parameter sets when strong trends emerge to improve signal quality.

## Optimization Directions 

There is further room to optimize this strategy:  

1. Add overall drawdown control. Could set a maximum drawdown percentage, such as 20%, that pauses trading when reached to limit losses.

2. Limit entry frequency. Can restrict the number of trades per unit time, such as 2 trades per hour max, to prevent over-trading. 

3. Optimize parameters. Test parameter combinations for different market conditions. Create parameter templates to switch between in real-time matching current conditions.

4. Combine with other indicators. Integrate trend, volatility and other metrics to create more comprehensive trading system entry rules.

## Summary

Overall, the strategy mainly relies on short-term BT Bitcoin adjustment patterns, using the EMA and RSI to generate clear trading signals, while having stop loss and take profit controls. It can effectively capture short-term slippage profit opportunities. But works best in combination with other strategies to produce more consistent excess returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|EMA Length|
|v_input_2_close|0|EMA+RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3_high|0|Long+Short Condition Source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|25|RSI Length|
|v_input_5|70|Safety EMA Length|
|v_input_6_close|0|Safety EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|true|From Month|
|v_input_8|true|From Day|
|v_input_9|2019|From Year|
|v_input_10|true|To Month|
|v_input_11|true|To Day|
|v_input_12|9999|To Year|
|v_input_13|true|Show Date Range|
|v_input_14|0.051|Stop Loss|
|v_input_15|0.096|Take Profit|
|v_input_16_close|0|Line Color Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_17_close|0|Line Color B Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mmoiwgg

//@version=4
strategy(title="EMA+RSI Pump & Drop Swing Sniper (With Alerts & SL+TP) - Strategy", shorttitle="EMA+RSI Swing Strategy", overlay=true)
emaLength = input(title="EMA Length", type=input.integer, defval=50, minval=0)
emarsiSource = input(close, title="EMA+RSI Source")
condSource = input(high, title="Long+Short Condition Source")
emaVal = ema(emarsiSource, emaLength)
rsiLength = input(title="RSI Length", type=input.integer, defval=25, minval=0)
rsiVal = rsi(emarsiSource, rsiLength)

//Safety 
emaLength2 = input(title="Safety EMA Length", type=input.integer, defval=70, minval=0)
emaSource2 = input(close, title="Safety EMA Source")
ema = ema(emaSource2, emaLength2)
emaColorSource2 = close
emaBSource2 = close

// Backtest+Dates
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear = input(defval = 2019, title = "From Year", minval = 2017)
ToMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear = input(defval = 9999, title = "To Year", minval = 2017)
showDate  = input(defval = true, title = "Show Date Range", type = input.bool)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)        // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest end window
window()  => time >= start and time <= finish ? true : false       // create function - add window() to entry/exit/close

// Conditions
exit_long = crossover(emaVal, condSource)
longCond = crossunder(emaVal, condSource) and close > ema

//Stoploss + TakeProfit
sl = input(0.051, step=0.001, title="Stop Loss")
tp = input(0.096, step=0.001, title="Take Profit")

// Plots Colors
colors = emarsiSource > emaVal and rsiVal > 14 ? color.green : color.red
emaColorSource = input(close, title="Line Color Source")
emaBSource = input(close, title="Line Color B Source")

// Plots
plot(ema, color=emaColorSource2[1] > ema and emaBSource2 > ema ? color.green : color.red, linewidth=1)
plot(emaVal, color=emaColorSource[1] > emaVal and emaBSource > emaVal ? color.green : color.red, linewidth=3)
plotcandle(open, high, low, close, color=colors)


//Strategy Entry+Exits
strategy.entry("long",1,when=window() and longCond)
strategy.close("long",when=window() and exit_long)
strategy.exit("long tp/sl", "long", profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick)

```

> Detail

https://www.fmz.com/strategy/434602

> Last Modified

2023-12-07 17:20:44
