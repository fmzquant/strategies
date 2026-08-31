
> Name

Moving-Average-Crossover-and-MACD-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19ddff782d78fe4e696.png)



## Overview

This strategy combines the moving average crossover system and the MACD indicator to implement an automated trading strategy that goes long in trending periods and takes profit/stops out at trend reversals. The strategy name is "Moving Average Crossover and MACD Combination Strategy".

## Principle 

The strategy is mainly based on the combination of moving average crossover system and MACD indicator. Specifically, it goes long when the short-term moving average crosses over the long-term moving average, and goes short when the short-term moving average crosses below the long-term moving average. Here the 21-day EMA is used as the short-term MA and the 100-day EMA as the long-term MA.

At the same time, the MACD indicator is used to confirm trading signals. Only when the MACD DIFF line crosses over the DEA line will a long signal be triggered. And once the DIFF line crosses below the DEA line, the long position will be closed out for a stop loss.

In addition, the RSI is used to avoid excessive shorting, with a short position initiated only when the RSI is below 30%.

For stop losses, the strategy adopts a fixed percentage trailing stop method, with the long stop loss set at 1% below the entry price, and the short stop loss set at 1% above the entry price. The strategy also implements a moving profit taking exit when the floating profit of the long position reaches 3% of the entry price.

## Advantage Analysis

The biggest advantage of this strategy is using the moving average system to determine the major trend direction, then using the MACD indicator for entry signals, which can effectively filter out false breakouts. Compared to using just the moving average crossover system alone, this can reduce ineffective trade frequencies and improve win rate.

In addition, the fixed percentage stop loss and moving profit taking helps keep losses within acceptable limits, while securing profits early when possible. This can reduce account drawdown and avoid greed-induced losses in actual trading.

## Risk Analysis

The main risks of this strategy are:

1. The moving average crossover system has lagging issues, which may lead to delayed entry and missing best entry points. This can be improved by optimizing the MA parameters.

2. The MACD indicator is prone to generating false signals. Other filters such as KDJ may be added.

3. The fixed percentage stop loss sometimes cannot exit timely. Dynamic trailing stop loss can be considered. 

4. The strategy may have large drawdowns. Position sizing could be reduced to mitigate risk.

5. The strategy only goes long and cannot profit from downtrends. Shorting mechanisms could be added.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Optimize the MA parameters for more precise signals. Different MA types like EMA and SMA could be tested.

2. Add other indicators to filter MA crossover signals, such as KDJ, RSI etc, to reduce bad trades.

3. Test dynamic stop loss methods like trailing stops and ATR stops to better control risks.

4. Add shorting mechanisms so the strategy can profit from downtrends. 

5. Optimize position sizing and money management to reduce max drawdown.

6. Test performance on different products and asset classes to expand applicability.

7. Incorporate machine learning algorithms to auto-optimize parameters and reduce manual intervention.

## Conclusion

This strategy combines the strengths of moving average crossover system and MACD indicator for high profitability. Further enhancements in parameter tuning, additional filters, stop loss mechanisms, and shorting mechanisms can improve stability and reduce drawdowns. Machine learning incorporation can also expand applicability. Overall it provides a good direction for quantitative trading strategies, but still requires continual testing and optimization to become a robust strategy.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-10-23 00:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Toxic_Cat_

//@version=5
// strategy("MA_50_200_CROSS", overlay=true, margin_long=100, margin_short=100)

EMA21 = ta.ema(close, 21)
EMA100 = ta.ema(close, 100)
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)

plot(EMA21)
plot(EMA100, color = color.orange)

openLong = ta.crossover(EMA21, EMA100) and macdLine > signalLine
openShort = ta.crossunder(EMA21, EMA100) and ta.rsi(close, 14) <= 33

crossunderMACD = ta.crossunder(macdLine, signalLine)


if (strategy.opentrades < 1)
    if openLong 
        strategy.entry("L",strategy.long, 1)

   if openShort
      strategy.entry("S",strategy.short, 1)

// slose long
// if ((strategy.opentrades.entry_price(0) + strategy.opentrades.entry_price(0)*0.03) <= open) 
//     strategy.exit("profit L", "L", limit = close)

// else if strategy.opentrades.entry_price(0) - strategy.opentrades.entry_price(0)*0.01 >= open or crossunderMACD
//     strategy.exit("loss L", "L", stop = close)

// slose short
// if (strategy.opentrades.entry_price(0) - strategy.opentrades.entry_price(0)*0.03) >= open
//     strategy.exit("profit S", "S", limit = (strategy.opentrades.entry_price(0) - strategy.opentrades.entry_price(0)*0.03))

// else if strategy.opentrades.entry_price(0) + strategy.opentrades.entry_price(0)*0.01 <= open
//    strategy.exit("loss S", "S", stop = (strategy.opentrades.entry_price(0) + strategy.opentrades.entry_price(0)*0.01))
















```

> Detail

https://www.fmz.com/strategy/430030

> Last Modified

2023-10-24 13:51:02
