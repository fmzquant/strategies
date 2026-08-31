
> Name

一目均衡动力指数策略Ichimoku-Oscillator-with-Stochastic-Momentum-Index-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1cfb83485385eae6def.png)

## Overview

The Ichimoku Oscillator with Stochastic Momentum Index Strategy is a trading strategy that combines the Ichimoku indicator and the Stochastic Momentum Index (SMI). This strategy generates trading signals by calculating the Ichimoku Oscillator (IO) and the Stochastic Momentum Index, and is suitable for various markets such as stocks, commodities, indices, and different time frames.

## Strategy Principle

The core of this strategy is to calculate the Ichimoku Oscillator (IO) and the Stochastic Momentum Index (SMI). The IO indicator is calculated using different period EMAs (9, 26, 52) and a 14-day SMA, reflecting the overbought and oversold conditions of the market. The SMI indicator calculates the position of the price relative to the highest and lowest prices within a certain period, and uses nested EMAs for smoothing, also reflecting the overbought and oversold conditions of the market.

The trading signals of the strategy are as follows:

- When the SMI crosses above its signal line and the IO is greater than 0, open a long position.
- When the SMI crosses below its signal line and the IO is less than 0, open a short position.

These trading signals combine both the IO and SMI indicators, which can better capture market turning points and improve trading accuracy.

## Advantage Analysis

The Ichimoku Oscillator with Stochastic Momentum Index Strategy has the following advantages:

1. It combines two effective technical indicators, Ichimoku and Stochastic Momentum Index, which complement each other and provide a more comprehensive analysis of market trends and movements.
2. The IO indicator uses multiple period EMAs and SMAs to smooth price fluctuations and reduce noise interference.
3. The SMI indicator is an optimization based on the stochastic indicator, using nested EMAs to make the curve smoother and avoid the problem of stochastic indicator reversals.
4. The trading signals consider both the IO and SMI conditions, which can effectively filter out false signals and improve the win rate.
5. It is applicable to multiple markets and time frames, with good adaptability and stability.

## Risk Analysis

Despite the many advantages of the Ichimoku Oscillator with Stochastic Momentum Index Strategy, there are still some potential risks:

1. The strategy relies on historical data for calculation and analysis, and its adaptability to future markets may decline.
2. The IO and SMI indicators are essentially lagging indicators, and signal delays may occur when the market changes rapidly.
3. The strategy does not consider fundamental factors of the market, such as major positive or negative news, and may fail in these situations.
4. In range-bound markets, the strategy may result in frequent trading, increasing transaction costs.

To address these risks, the following measures can be taken:

1. Regularly test and adjust strategy parameters to improve adaptability.
2. Combine with other leading indicators or market information for analysis to compensate for the lag.
3. Set appropriate take-profit and stop-loss levels to control single transaction risk.
4. For range-bound markets, increase the period parameters of the IO and SMI indicators to reduce trading frequency.

## Optimization Direction

The strategy can be optimized in the following directions:

1. For the IO indicator, try more different period combinations to find more representative parameters.
2. For the SMI indicator, study different smoothing methods, such as considering the use of Wilder's smoothing method, to further reduce the lag of the indicator.
3. Appropriately incorporate other indicators such as trading volume to enrich the dimensions of trading signals.
4. Set different parameters and thresholds for different market characteristics to improve the adaptability of the strategy.
5. Combine this strategy with other strategies, such as trend strategies, mean reversion strategies, etc., to establish a strategy system and improve overall returns.

Through the above optimizations, the performance and stability of the Ichimoku Oscillator with Stochastic Momentum Index Strategy can be further improved.

## Summary

The Ichimoku Oscillator with Stochastic Momentum Index Strategy is an effective technical analysis strategy. It cleverly combines two classic indicators, Ichimoku and Stochastic Momentum Index, which complement each other and provide a relatively comprehensive analysis of the overbought and oversold conditions and trend turning points of the market, providing a basis for trading decisions. The strategy logic is clear and widely applicable, with strong practical value. Of course, any strategy has its limitations and risks. In practical application, further optimization and improvement are needed, combined with other analysis methods and risk control measures, in order to better play its role. In general, the Ichimoku Oscillator with Stochastic Momentum Index Strategy provides a new idea and method for quantitative trading, which is worthy of further exploration and research.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Percent K Length|
|v_input_2|9|Percent D Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-09 00:00:00
end: 2024-03-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © manoharbauskar

//@version=5
strategy(title='Ichimoku Oscillator with SMI', shorttitle='IOSMI', overlay = false)
io = ta.ema(hl2, 9) / 2 + ta.ema(hl2, 26) / 2 + ta.sma(close, 14) - ta.ema(hl2, 52) - ta.sma(open, 14)
plot(io, color=ta.change(io) <= 0 ? #872323 : #007F0E, style=plot.style_columns)
a = input(21, 'Percent K Length')
b = input(9, 'Percent D Length')
// Range Calculation
ll = ta.lowest(low, a)
hh = ta.highest(high, a)
diff = hh - ll
rdiff = close - (hh + ll) / 2
// Nested Moving Average for smoother curves
avgrel = ta.ema(ta.ema(rdiff, b), b)
avgdiff = ta.ema(ta.ema(diff, b), b)
// SMI calculations
SMI = avgdiff != 0 ? avgrel / (avgdiff / 2) * 100 : 0
SMIsignal = ta.ema(SMI, b)
//All PLOTS
plot(SMI, color = color.blue , title='Stochastic Momentum Index', linewidth = 2)
plot(SMIsignal, color=color.new(#FF5252, 0), title='SMI Signal Line', linewidth = 2)
plot(60, color=color.new(#00E676, 0), title='Over Bought')
plot(-60, color=color.new(#FF9800, 0), title='Over Sold')
plot(0, color=color.new(#E040FB, 0), title='Zero Line')

longCondition = SMI > SMIsignal and io > 0
if (longCondition)
    strategy.entry("Buy", strategy.long)

shortCondition = SMI < SMIsignal and io < 0
if (shortCondition)
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/444975

> Last Modified

2024-03-15 16:23:55
