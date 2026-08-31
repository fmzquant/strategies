
> Name

三重移动平均线顺势交易策略Improved-Moving-Average-Crossover-Strategy-with-Market-Trend-Guidance

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f1cf0efdea404913fa.png)


## Overview

The improved moving average crossover strategy with market trend guidance uses three moving averages of different periods to determine market trends and trading signals. It first calculates a fast line, slow line and trend line. Buying and selling signals are generated based on golden cross and death cross of the fast and slow lines. Additionally, an trend line is introduced to judge the overall market trend direction. Trades are taken only in the direction of the trend to avoid counter-trend trades. 

## Strategy Logic

The core logic utilizes three moving averages - fast line, slow line and trend line for signal generation. The periods for the three moving averages are defined as input parameters. Golden cross (fast line crosses above slow line) and death cross (fast line crosses below slow line) between the fast and slow lines generate buy and sell signals respectively. This is based on the classic dual moving average crossover system.

The improvement comes from introducing the third moving average trend line to determine market trend direction. Buy signals are only taken on golden crosses and sell signals on death crosses when the trend direction favors the signal. For example, buy signals are only taken on golden crosses when the trend is up and sell signals only on death cross when the trend is down. This helps avoid counter-trend trades and reduces risk.

## Advantage Analysis  

Compared to the simple dual moving average strategy, this improved strategy has the following advantages:

1. Market trend guidance avoids counter-trend trades, filtering out potentially losing trades and reducing risk. 

2. Combination of multiple moving averages improves signal reliability and win rate.

3. Flexible parameter adjustments adapts to different market regimes. 

4. Simple and clear rules makes implementation straight-forward. Easier to implement than complex machine learning models.  

5. Validated indicators and logic with strong theoretical foundation and reliability.

## Risk Analysis

Despite improvements over dual MA strategy, some risks need to be considered:

1. Additional complexity from three moving averages poses optimization difficulties and risk of poor parameter tuning.

2. Lagging nature of moving averages can dull signals or cause delays.  

3. Subjective trend determination brings risk of errors in judging trend. Counter-trend trades cannot be fully avoided.

4. No position sizing or risk management features. Defaults to full position sizes.

5. Rules-based system cannot adapt like machine learning models. Lacks robustness to changing markets.

These risks can potentially be reduced through rigorous backtesting, optimization and introducing enhancements like stop losses, position sizing, machine learning adaptations etc. But risks cannot be entirely eliminated.

## Enhancement Opportunities

Some ways the strategy can be further improved:

1. Incorporate stop loss mechanisms like price based or volatility based to control loss per trade.

2. Add position sizing module to dynamically adjust positions based on drawdowns, capital usage etc. 

3. Test across multiple timeframes (daily, 60-min etc) for robustness.

4. Parameter optimization through grid search, genetic algorithms etc. Ensemble models can also combine signals from multiple models.

5. Machine learning techniques like reinforcement learning to automatically improve parameters and adaptivity. 

6. Add filters based on volumes, price spreads, volatility etc to reduce misleading signals.

## Conclusion

In conclusion, this improved moving average crossover strategy guides trades in the overall market trend direction to avoid counter-trend trades. This shows promise to improve risk-adjusted returns over the simple dual moving average crossover strategy. But further enhancements through position sizing, machine learning adaptations etc. can help optimize it further. The core principle of trend following using moving averages seems sound.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast MA Length|
|v_input_2|21|Slow MA Length|
|v_input_3|50|Trend MA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Improved Moving Average Crossover Strategy", overlay=true)

// Define input variables
fast_length = input(9, title="Fast MA Length")
slow_length = input(21, title="Slow MA Length")
trend_length = input(50, title="Trend MA Length")
src = close

// Calculate moving averages
fast_ma = ta.sma(src, fast_length)
slow_ma = ta.sma(src, slow_length)
trend_ma = ta.sma(src, trend_length)

// Plot moving averages on the chart
plot(fast_ma, color=color.blue, title="Fast MA")
plot(slow_ma, color=color.red, title="Slow MA")
plot(trend_ma, color=color.green, title="Trend MA")

// Define trend direction
is_uptrend = ta.crossover(slow_ma, trend_ma)
is_downtrend = ta.crossunder(slow_ma, trend_ma)

// Define buy and sell conditions
buy_condition = ta.crossover(fast_ma, slow_ma) and is_uptrend
sell_condition = ta.crossunder(fast_ma, slow_ma) and is_downtrend

// Execute trades based on conditions
if (buy_condition)
    strategy.entry("Buy", strategy.long)
if (sell_condition)
    strategy.close("Buy")

if (sell_condition)
    strategy.entry("Sell", strategy.short)
if (buy_condition)
    strategy.close("Sell")

```

> Detail

https://www.fmz.com/strategy/434467

> Last Modified

2023-12-06 16:29:52
