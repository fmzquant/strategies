
> Name

趋势跟踪均线交叉策略Trend-Tracking-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/96480b71e8a3cb4e26.png)
 [trans]
## 概述

这个策略是基于移动平均线的简单策略,它可以在不同的币对上取得不错的效果。它绘制开盘平均线和收盘平均线,当两条线交叉时决定建立或者退出多头头寸。其原理是当平均收盘价上升时建立头寸,这可能预示着未来价格会上涨。当平均收盘价下降时平掉头寸,这可能预示着未来价格会下跌。这只是一种猜测,但有时它可以非常准确的预测未来价格。

## 策略原理

这个策略首先根据设置选择移动平均线的类型,包括EMA、SMA、RMA、WMA和VWMA。然后设置移动平均线计算的周期,一般是10到250根K线。根据不同的币对,选择不同的移动平均线类型和周期数可以获得完全不同的效果。 

该策略的具体交易逻辑是:
1. 计算开盘价和收盘价的移动平均线;
2. 比较收盘价平均线和开盘价平均线的数值;
3. 如果收盘价平均线上穿开盘价平均线,则建立多头头寸;
4. 如果收盘价平均线下穿开盘价平均线,则平掉多头头寸。

建立头寸时认为是价格上涨的预兆,平仓时认为是价格下跌的预兆。

## 策略优势分析

该策略主要有以下几个优势:

1. 参数设置灵活,可以根据不同币对选择最优参数,从而针对性很强;
2. 逻辑简单,容易理解和实现;
3. 在部分币对可以获得非常高的收益率,总体来说稳定性较好;
4. 可以根据需求选择显示不同指标,自定义程度高。

## 风险分析

该策略也存在一些风险:

1. 在部分币对和参数下,收益率和稳定性都不高;
2. 无法有效响应短期价格变动,对高波动币对效果不佳;
3. 选取移动平均线周期的依据不够科学合理,有一定的主观性。

对策和优化方向:
1. 尽量选择长周期,如12小时、1天等时间周期,可以减少不必要的交易,提高稳定性;
2. 增加参数优化功能,自动测试不同参数组合,找出最优参数;
3. 增加自适应选取移动平均线周期的功能,让系统自动决定最佳周期。

## 总结

本策略总体来说逻辑简单,使用移动平均线指标判断价格趋势和转折点。它可以通过调整参数取得非常好的效果,是一种有效的趋势跟踪策略,值得进一步完善和应用。但也应注意控制风险,选择合适的币对和参数,使其发挥最大效用。

||

## Overview

This is a simple moving average based strategy that works well with different coin pairs. It plots the moving average opening price and closing price, and decides to enter a long position or exit it based on whether the two lines have crossed each other. The idea is that it enters a position when the average closing price is increasing, which may indicate upward momentum in prices. It then exits the position when the average closing price decreases, which may indicate downward momentum. This is speculative, but sometimes it can predict price action very well.

## Strategy Logic

This strategy first selects the type of moving average, including EMA, SMA, RMA, WMA and VWMA. Then it sets the lookback period for the moving average, usually between 10 and 250 bars. Different combinations of moving average type and lookback period can produce very different results for different coin pairs.

The specific trading logic is:
1. Calculate the moving average of open price and close price; 
2. Compare the moving average values between close price and open price;
3. Enter a long position if close price moving average crosses above open price moving average;  
4. Close the long position if close price moving average crosses below open price moving average.

Entering the position considers it a sign of upward price movement, while exiting considers downward price movement.

## Advantage Analysis 

The main advantages of this strategy are:

1. Flexible parameter settings that can be optimized for different coin pairs for better specificity;
2. Simple logic that is easy to understand and implement;  
3. Very high returns achievable for some coin pairs, generally good stability;
4. High customizability in displaying different indicators.

## Risk Analysis

There are also some risks with this strategy:

1. For some coin pairs and parameters, returns and stability can be low;
2. Cannot respond well to short-term price fluctuations, poor performance for high volatile coins;
3. Choice of moving average lookback period not scientific enough, somewhat subjective.

Solutions and optimization:
1. Use longer timeframes like 12H, 1D to reduce unnecessary trades and improve stability;  
2. Add parameter optimization functions to automatically test different parameter combinations for best parameters;
3. Add adaptive selection of moving average lookback period to let system automatically decide optimal period.

## Conclusion

In summary, this is a simple strategy using moving average indicators to determine price trend and inflection points. It can achieve very good results by adjusting parameters, and is an effective trend tracking strategy worth further improvement and application. But risk management should be noted, choose suitable coin pairs and parameters to maximize its usefulness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|66|(?Strategy)Moving average length (number of bars)|
|v_input_string_1|0|Moving Average type: VWMA|SMA|RMA|WMA|EMA|
|v_input_string_2|0|(?Display)Red Background Color On/Off: On|Off|
|v_input_string_3|0|Green Background Color On/Off: On|Off|
|v_input_string_4|0|Moving Average Plot On/Off: On|Off|
|v_input_int_2|true|(?Beginning of Strategy)Start Month 1-12 (set any start time to 0 for furthest date)|
|v_input_int_3|true|Start Date 1-31 (set any start time to 0 for furthest date)|
|v_input_int_4|2011|Start Year 2000-2100 (set any start time to 0 for furthest date)|
|v_input_int_5|false|(?End of Strategy)End Month 1-12 (set any end time to 0 for today's date)|
|v_input_int_6|false|End Date 1-31 (set any end time to 0 for today's date)|
|v_input_int_7|false|End Year 2000-2100 (set any end time to 0 for today's date)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//Author @divonn1994

initial_balance = 100
strategy(title='Close v Open Moving Averages Strategy', shorttitle = 'Close v Open', overlay=true, pyramiding=0, default_qty_value=100, default_qty_type=strategy.percent_of_equity, precision=7, currency=currency.USD, commission_value=0.1, commission_type=strategy.commission.percent, initial_capital=initial_balance)

//Input for number of bars for moving average, Switch to choose moving average type, Display Options and Time Frame of trading----------------------------------------------------------------

bars = input.int(66, "Moving average length (number of bars)", minval=1, group='Strategy') //66 bars and VWMA for BTCUSD on 12 Hours.. 35 bars and VWMA for BTCUSD on 1 Day
strategy = input.string("VWMA", "Moving Average type", options = ["EMA", "SMA", "RMA", "WMA", "VWMA"], group='Strategy')

redOn = input.string("On", "Red Background Color On/Off", options = ["On", "Off"], group='Display')
greenOn = input.string("On", "Green Background Color On/Off", options = ["On", "Off"], group='Display')
maOn = input.string("On", "Moving Average Plot On/Off", options = ["On", "Off"], group='Display')

startMonth = input.int(title='Start Month 1-12 (set any start time to 0 for furthest date)', defval=1, minval=0, maxval=12, group='Beginning of Strategy')
startDate = input.int(title='Start Date 1-31 (set any start time to 0 for furthest date)', defval=1, minval=0, maxval=31, group='Beginning of Strategy')
startYear = input.int(title='Start Year 2000-2100 (set any start time to 0 for furthest date)', defval=2011, minval=2000, maxval=2100, group='Beginning of Strategy')

endMonth = input.int(title='End Month 1-12 (set any end time to 0 for today\'s date)', defval=0, minval=0, maxval=12, group='End of Strategy')
endDate = input.int(title='End Date 1-31 (set any end time to 0 for today\'s date)', defval=0, minval=0, maxval=31, group='End of Strategy')
endYear = input.int(title='End Year 2000-2100 (set any end time to 0 for today\'s date)', defval=0, minval=0, maxval=2100, group='End of Strategy')

//Strategy Calculations-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

inDateRange = true

maMomentum = switch strategy
    "EMA" => (ta.ema(close, bars) > ta.ema(open, bars)) ? 1 : -1
    "SMA" => (ta.sma(close, bars) > ta.sma(open, bars)) ? 1 : -1
    "RMA" => (ta.rma(close, bars) > ta.rma(open, bars)) ? 1 : -1
    "WMA" => (ta.wma(close, bars) > ta.wma(open, bars)) ? 1 : -1
    "VWMA" => (ta.vwma(close, bars) > ta.vwma(open, bars)) ? 1 : -1
    =>
        runtime.error("No matching MA type found.")
        float(na)

openMA = switch strategy
    "EMA" => ta.ema(open, bars)
    "SMA" => ta.sma(open, bars)
    "RMA" => ta.rma(open, bars)
    "WMA" => ta.wma(open, bars)
    "VWMA" => ta.vwma(open, bars)
    =>
        runtime.error("No matching MA type found.")
        float(na)
        
closeMA = switch strategy
    "EMA" => ta.ema(close, bars)
    "SMA" => ta.sma(close, bars)
    "RMA" => ta.rma(close, bars)
    "WMA" => ta.wma(close, bars)
    "VWMA" => ta.vwma(close, bars)
    =>
        runtime.error("No matching MA type found.")
        float(na)

//Enter or Exit Positions--------------------------------------------------------------------------------------------------------------------------------------------------------------------

if ta.crossover(maMomentum, 0)
    if inDateRange
        strategy.entry('long', strategy.long, comment='long')
if ta.crossunder(maMomentum, 0)
    if inDateRange
        strategy.close('long')

//Plot Strategy Behavior---------------------------------------------------------------------------------------------------------------------------------------------------------------------

plot(series = maOn == "On" ? openMA : na, title = "Open moving Average", color = color.new(color.purple,0), linewidth=3, offset=1)
plot(series = maOn == "On" ? closeMA : na, title = "Close Moving Average", color = color.new(color.white,0), linewidth=2, offset=1)
bgcolor(color = inDateRange and (greenOn == "On") and maMomentum > 0 ? color.new(color.green,75) : inDateRange and (redOn == "On") and maMomentum <= 0 ? color.new(color.red,75) : na, offset=1)
```

> Detail

https://www.fmz.com/strategy/440372

> Last Modified

2024-01-29 16:52:46
