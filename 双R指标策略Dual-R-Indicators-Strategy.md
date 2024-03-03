
> Name

双R指标策略Dual-R-Indicators-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用双R指标结合SMA均线,实现对USDJPY的趋势判断和交易信号产生。其中,双R指标包括Parabolic SAR止损指标和RSI超买超卖指标。该策略通过双R指标判断行情趋势和超买超卖情况,结合SMA均线实现买卖点判断。

## 原理

该策略主要运用了三个技术指标:

1. Parabolic SAR止损指标:该指标展示了当前价格的止损点,可以用来判断价格趋势和可能的反转点。代码中通过参数设置计算SAR值并绘制。

2. RSI超买超卖指标:该指标判断价格是否超买超卖。代码中设置RSI参数及超买超卖阈值,并计算绘制RSI曲线。

3. SMA均线:计算并绘制10日线和20日线的SMA均线。

结合三个指标,判断买卖点逻辑如下:

当收盘价上穿182日SMA均线,且10日SMA线上穿20日SMA线,且RSI指标由低位向上突破30超卖线时,做多;

当收盘价下穿182日SMA均线,且10日SMA线下穿20日SMA线,且RSI指标由高位向下突破70超买线时,做空。

## 优势

该策略具有以下优势:

1. 运用双R指标判断趋势方向,可以有效确认交易信号。RSI指标判断超买超卖情况,SAR止损指标判断价格趋势转折点,二者结合使用更加可靠。

2. 结合SMA均线进行入市,可以有效过滤假突破。仅仅依靠RSI指标容易造成错失交易机会,加入SMA均线判断可以减少此风险。

3. 时间周期选择15分钟,可以及时捕捉短期价格突破。日内交易以捕捉短期趋势为主,15分钟能够充分把握机会。

4. 回测数据足够充分,对策略有效性验证充分。2个半月的15分钟数据可以基本判断该策略的可靠性。

## 风险

该策略也存在一些风险:

1. 回测数据时间段太短,无法完全代表未来表现。仅仅2个半月的数据不足以完全判断策略的长期有效性。

2. RSI指标存在错触发问题。RSI指标本身可能出现脱离价格实际走势的情况,导致产生错误信号。

3. SMA均线存在滞后问题。SMA均线对价格变化响应较慢,可能错过较好入场点位。

4. 日内短线交易风险较大。日内交易受新闻事件影响较大,且存在过夜仓位风险。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加回测历史数据时间段,使之更长,如增至6个月或1年,可以更充分验证策略效果。

2. 尝试运用其他指标替代或结合RSI指标,如KDJ、MACD等,使信号更可靠。

3. 尝试SMA均线组合优化,如改为5日及20日组合,或加入更长期均线,使突破更可靠。 

4. 设置止损机制以控制单笔损失。如设置日内止损或移动止损。

5. 优化止盈策略,如移动止盈或分批止盈,锁定更多利润。

## 总结

本策略整体运用双R指标判断超买超卖情况,结合SMA均线过滤来实现日内USDJPY交易策略。该策略具有及时捕捉短期趋势的优势,但也存在回测数据不足等风险。未来可以通过增加数据时间段、优化指标参数、设置止损止盈来进一步改进策略效果。



||


## Overview

This strategy uses dual R indicators combined with SMA lines to determine trends and generate trading signals for USDJPY. The dual R indicators include Parabolic SAR trailing stop indicator and RSI overbought-oversold indicator. It judges trends and overbought-oversold situations through dual R indicators, and generates buy and sell signals with SMA lines.

## Principles 

The strategy mainly utilizes the following three technical indicators:

1. Parabolic SAR trailing stop indicator: It shows potential stop loss points and can be used to determine price trends and potential reversal points. The code calculates and plots SAR values based on parameter settings.

2. RSI overbought-oversold indicator: It judges whether prices are overbought or oversold. The code sets RSI parameters and overbought/oversold threshold values, and calculates and plots the RSI curve.

3. SMA lines: It calculates and plots the 10-day and 20-day SMA lines.

Combining the three indicators, the buy and sell point logic is as follows:

Go long when close goes above 182-day SMA line, 10-day SMA crosses above 20-day SMA, and RSI breaks through 30 oversold line from below. 

Go short when close goes below 182-day SMA line, 10-day SMA crosses below 20-day SMA, and RSI breaks through 70 overbought line from above.

## Advantages

The strategy has the following advantages:

1. Using dual R indicators to determine trend direction can effectively confirm trading signals. RSI for overbought-oversold and SAR for trend reversal work together for more reliability.

2. Adding SMA filter helps avoid false breakouts. Relying solely on RSI may miss opportunities, SMA adds confidence. 

3. 15-min timeframe captures short-term breakouts timely. For intraday trading, 15-min is optimal to capitalize on short-term trends.

4. 2.5 months of 15-min backtest data sufficiently validates strategy. 15-min data over 2.5 months can basically determine reliability.

## Risks

There are some risks:

1. Limited backtest data cannot fully represent future performance. 2.5 months is insufficient to determine long-term validity.

2. RSI may give false signals, deviating from actual price moves.

3. SMA has lagging effect. It reacts slower to price changes, missing good entry points.

4. Intraday trading has higher risks. More impacted by news and overnight position risks.

## Optimization

Some ways to optimize the strategy:

1. Expand backtest timeframe to 6 months or 1 year for more sufficient validation.

2. Try other indicators like KDJ, MACD to complement or replace RSI for more reliable signals. 

3. Optimize SMA combinations, like 5-day and 20-day, or adding longer SMAs, for more solid breakouts.

4. Add stop loss mechanisms to control single trade loss, like intraday or trailing stop loss. 

5. Optimize take profit, like trailing stop or partial profits, to lock in more gains.

## Conclusion

The strategy overall uses dual R indicators for overbought-oversold and SMA for filters to implement USDJPY intraday trading. It has advantage of catching short-term trends but also risks like insufficient backtest data. It can be further improved by expanding timeframe, optimizing parameters, adding stop loss/take profit.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|
|v_input_4|6|RSI Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Chrome", overlay=false, pyramiding = 1, commission_value = 0.01, currency = currency.USD, initial_capital = 1000)

// Parabolic Support And Resistance
start = input(0.02)
increment = input(0.02)
maximum = input(0.20)
sar = sar(start, increment, maximum)

//plot(sar, style = circles, linewidth = 2)

// (v)RSI
RSIlength = input(6,title="RSI Period Length") 
RSIoverSold = 30
RSIoverBought = 70
RSImid = 50
price = close
vrsi = rsi(price, RSIlength)
plot(vrsi)
a = hline(70)
b = hline(30)

strategy.entry("buy", strategy.long,  when = close > sma(close, 182) and sma(close, 10) > sma(close, 20) and crossover(vrsi, RSIoverSold))
strategy.entry("short", strategy.short,  when = close < sma(close, 182)  and sma(close, 10) < sma(close, 20) and crossunder(vrsi, RSIoverBought))














```

> Detail

https://www.fmz.com/strategy/428801

> Last Modified

2023-10-09 15:46:05
