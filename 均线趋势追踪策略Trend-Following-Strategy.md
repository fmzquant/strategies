
> Name

均线趋势追踪策略Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c824c0d077d8c43c7c.png)
[trans]


## 概述

趋势追踪策略是一种基于移动平均线的趋势跟踪交易策略。该策略使用指数移动平均线(EMA)和震荡移动平均线(HMA)的交叉来判断市场趋势方向,并相应生成买入和卖出信号。策略适用于中短线趋势交易,旨在跟踪较长时间周期内的价格趋势,而非短期震荡。

## 策略原理  

该策略使用两个不同参数的移动平均线:一个较短周期的EMA和一个较长周期的HMA。EMA能较快响应价格变动,用来判断短期趋势;HMA对价格变动响应较慢,用来判断长期趋势方向。

当短期EMA上穿长期HMA时,被视为价格进入上升趋势,该策略将在下一根K线开盘时市价买入;当短期EMA下穿长期HMA时,被视为价格进入下降趋势,该策略将在下一根K线开盘时以市价卖出。 

为了优化入市时机,策略添加了基于Heikin-Ashi的选项。开启此选项后,策略的买卖交易信号将基于Heikin-Ashi线,而非原始K线。由于Heikin-Ashi线可过滤 oscillator的原始K线,有助于减少假信号。

该策略还加入了止损设置。当持仓亏损达到预设的止损幅度时,策略将以市价止损。此举可限制单笔交易的最大损失。

## 优势分析

该策略具有以下优势:

1. 使用EMA和HMA的交叉判断趋势方向,可利用不同周期平均线的优势,提高判断准确性。

2. 基于趋势交易,不随小幅震荡反转仓位,可减少不必要的交易次数。

3. Heikin-Ashi选项可过滤假信号,优化入市时机。

4. 采用移动止损策略,可有效控制单笔交易最大损失。

5. 策略参数可自定义,用户可根据不同品种和周期进行调整,提高适应性。

## 风险分析

该策略也存在以下风险:

1. 作为趋势跟踪策略,在盘整市场表现较差。

2. 在趋势反转来临时,可能带来较大亏损。

3. 止损设定不当可能造成不必要的止损,也可能导致亏损扩大。

4. 参数设置不当也会导致交易频繁或者完全不动。

5. EMA和HMA周期设置需要针对不同品种和周期进行优化。

6. Heikin-Ashi无法完全过滤假突破的风险。

## 优化方向

该策略可从以下方面进行优化:

1. 利用更多指标组合判断趋势,如MACD,KDJ等,提高判断准确性。

2. 加入更多过滤条件,如成交量,ATR等指标,降低假突破概率。

3. 优化移动平均线的参数,使其更符合不同品种和交易周期。

4. 优化止损幅度的设置,使止损更合理,避免过于宽松或过于僵硬。

5. 考虑加入利润保护功能,如移动止盈、部分止盈等,锁定利润。

6. 测试不同的替代持仓成本计算方式,优化持仓成本的计算。

## 总结

趋势跟踪策略基于移动平均线交叉判断趋势方向,采用Heikin-Ashi和移动止损来优化策略表现。该策略适合跟踪中长线趋势,可通过参数优化和功能扩展进一步改进策略效果。但用户需要意识到反转和止损风险的存在,需要针对品种和周期进行参数测试。总体来说,该策略为利用趋势交易提供了一个普适、可定制的框架。

|| 

## Overview

The trend following strategy is a trend trading strategy based on the crossover of moving averages. It uses the crossover of an exponential moving average (EMA) and a Hull moving average (HMA) to determine the trend direction and generate trading signals accordingly. The strategy aims to follow the longer-term price trend rather than short-term oscillations.

## Strategy Logic

The strategy employs two moving averages with different parameters: a faster EMA and a slower HMA. The EMA reacts faster to price changes and is used to judge short-term trends, while the HMA responds slower and tracks long-term trend direction.

When the faster EMA crosses above the slower HMA, it is viewed as a start of an upward trend, and the strategy will place a long order at market price on the next bar open. When the EMA crosses below the HMA, it is seen as the beginning of a downward trend, and the strategy will go short at market price on the next bar open.

To optimize entry timing, the strategy incorporates a Heikin-Ashi option. When enabled, the buy and sell signals will be based on Heikin-Ashi bars instead of normal candlesticks. Heikin-Ashi bars can filter out short-term price oscillations on the original candlesticks and reduce false signals. 

The strategy also employs a stop loss setting. When the position loss reaches the preset stop loss percentage, the position will be closed out at market price, capping the maximum loss per trade.

## Advantage Analysis 

The advantages of this strategy include:

1. Using EMA and HMA crossover to determine trends can take advantage of different period moving averages and improve accuracy.

2. Trading based on trends avoids churning on minor oscillations and reduces unnecessary trades. 

3. The Heikin-Ashi option optimizes entry timing by filtering out false signals.

4. The moving stop loss effectively limits maximum loss per trade.

5. Customizable parameters allow optimization for different products and timeframes.

## Risk Analysis

The risks of this strategy include:

1. As a trend following system, it underperforms during range-bound markets.

2. It may incur large losses when a trend reversal comes.

3. Improper stop loss settings may cause unnecessary stops or magnify losses. 

4. Bad parameter tuning can lead to overtrading or inaction.

5. EMA and HMA periods need optimization for different products and timeframes.

6. Heikin-Ashi cannot completely avoid the risk of false breakouts.

## Optimization Directions

The strategy can be improved from the following aspects:

1. Utilize more indicators like MACD, KDJ to enhance trend accuracy.

2. Add more filters such as volume, ATR to reduce false breaks.

3. Optimize parameters of moving averages based on products and timeframes. 

4. Fine tune the stop loss percentage for better stop loss behavior.

5. Consider profit taking features like moving profit stop and partial profit taking.

6. Test alternative ways to calculate position cost basis for optimization.

## Summary

The trend following strategy identifies trends using moving average crossovers, and optimizes performance via Heikin-Ashi and moving stop loss. It is suitable for medium-to-long term trend trading, and can be further enhanced through parameter tuning and feature expansion. But users should be aware of the risks of reversals and improper stop loss. Overall it provides a universal and customizable framework for trend trading that works across different products and timeframes. Proper parameter testing is needed when applying it.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Heikin Ashi Source|
|v_input_2|true|Stop Loss|
|v_input_int_1|9|EMA Length|
|v_input_int_2|69|HMA Length|
|v_input_float_1|-6.5|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-11-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("????? ?????", overlay=true, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=15)

//Heikin Ashi Option
ha = input(true, title = "Heikin Ashi Source")
src = ha ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, barmerge.gaps_off, barmerge.lookahead_off) : close
usestoploss = input(true, title="Stop Loss")

//EMA
len1 = input.int(9, minval=1, title="EMA Length")
ema = ta.ema(src, len1)
emaline = plot(ema, title="EMA", color=color.blue, linewidth=2)

//HMA
len2 = input.int(69, minval=1, title="HMA Length")
hma = ta.wma(2*ta.wma(src, len2/2)-ta.wma(src, len2), math.floor(math.sqrt(len2)))
hmaline = plot(hma, title="HMA", color=color.purple, linewidth=2)
fillcolor = hma < ema ? color.blue : color.purple
fill(emaline, hmaline, title="EMA Fill", color=color.new(fillcolor, 80), editable=true)

//Stop Loss Conditions
stoplosspercent = input.float(title="Stop Loss (%)", defval=-6.5, minval=-50, maxval=0, step=.1) / 100
stoploss = strategy.position_avg_price * (1 + stoplosspercent)
stop = stoploss > close and stoploss[1] < close[1] and strategy.position_size > 0 and usestoploss

//Buy Sell Conditions
buy = hma < ema
sell = hma > ema

//Trades and Alerts
if buy
	strategy.entry("Long Position", strategy.long, comment="BUY")
//	alert("{\n\"message_type\": \"bot\",\n\"bot_id\": 6477543,\n\"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",\n\"delay_seconds\": 0\n}", alert.freq_once_per_bar)
if sell and strategy.openprofit > 0
	strategy.close("Long Position", comment="SELL")
//	alert("{\n\"action\": \"close_at_market_price\",\n\"message_type\": \"bot\",\n\"bot_id\": 6477543,\n\"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",\n\"delay_seconds\": 0\n}", alert.freq_once_per_bar)
if stop
    strategy.close("Long Position", comment="STOP")
//    alert("{\n\"action\": \"close_at_market_price\",\n\"message_type\": \"bot\",\n\"bot_id\": 6477543,\n\"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",\n\"delay_seconds\": 0\n}", alert.freq_once_per_bar)

//Alternate Labels
var pos = 0
if buy and pos <= 0
    pos := 1
if sell and pos >= 0
    pos := -1
buylabel  = pos ==  1 and (pos !=  1)[1]
selllabel = pos == -1 and (pos != -1)[1]

//Plot Labels
plotshape(buylabel,  style=shape.labelup,   location=location.belowbar, color=color.blue,   text="BUY",  textcolor=color.white, size=size.tiny)
plotshape(selllabel, style=shape.labeldown, location=location.abovebar, color=color.purple, text="SELL", textcolor=color.white, size=size.tiny)
plotshape(stop,      style=shape.labeldown, location=location.abovebar, color=color.yellow, text="STOP", textcolor=color.white, size=size.tiny)

```

> Detail

https://www.fmz.com/strategy/431224

> Last Modified

2023-11-06 10:34:19
