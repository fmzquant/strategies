
> Name

Stochastic动量突破策略Stochastic-Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16de112b46be3297664.png)


## Overview

The Momentum Breakout strategy mainly uses the Stochastic oscillator indicator to determine the market trend direction, combined with the ADX indicator to judge the trend strength, to generate trading signals. This strategy is mainly suitable for medium-to-long term trend trading.

## Strategy Logic

The strategy is based on two technical indicators:

1. Stochastic oscillator: used to determine the market trend direction. The Stochastic oscillator value ranges from 0 to 100. A value between 45 and 55 when the period is 14 means no clear trend. A Stochastic above 55 is a bullish signal and below 45 is a bearish signal.

2. ADX indicator: used to judge the trend strength. An ADX below 20 indicates a weak trend.

The strategy first judges if there is a clear uptrend or downtrend based on the Stochastic oscillator value. When the Stochastic is above 55, it signals an uptrend. When it's below 45, it signals a downtrend.

It then checks if the ADX is above 20 to confirm a strong trend. If ADX is above 20, it means the trend is strong enough for trend trading. If ADX is below 20, the trend is considered not obvious and no trading signals will be generated.

By combining the Stochastic oscillator and ADX, trading signals are generated when both of the following conditions are met:

1. Stochastic above 55, signaling an uptrend. 
2. ADX above 20, confirming the uptrend is strong.

Sell signals are generated when both of these conditions are met:

1. Stochastic below 45, signaling a downtrend.
2. ADX above 20, confirming the downtrend is strong.

With these rules, the strategy forms a medium-to-long term trend following system.

## Advantages

The advantages of this strategy include:

1. Catching mid-to-long term trends: By combining Stochastic and ADX, it can effectively determine the market trend direction and strength, catching the major trends.

2. Drawdown control: Only trading when the trend is clear can help control unnecessary whipsaws. 

3. Parameter tuning: The periods of Stochastic and ADX can be optimized for different markets.

4. Simplicity: The overall logic is simple and intuitive, consisting of two common technical indicators.

5. Universality: The strategy can be applied to different markets with parameter tuning.

## Risks

Some risks of the strategy:

1. Missing breakout points: As trend following indicators, Stochastic and ADX may miss potential trend reversal points and early breakout trades.

2. Trend reversal risks: They may wrongly judge the trend to be continuing near the end of a trend, missing chances to exit timely, leading to amplified losses.

3. Difficulty in parameter optimization: The parameters need to be tuned for different markets, which poses some difficulty.  

4. Whipsaws: It may generate multiple invalid signals in range-bound markets without a clear trend.

5. Divergence: When the price trend conflicts with the Stochastic oscillator trend, divergence emerges, which may lead to losing trades.

The risks could be mitigated by:

1. Adding other indicators to identify local trends and potential breakout points.

2. Incorporating trend reversal signals to exit timely when trends substantially reverse.

3. Using machine learning to automatically optimize parameters.

4. Increasing the ADX threshold to filter out weak trend signals in ranging markets. 

5. Applying additional indicators to confirm the Stochastic signals and avoid divergence trades.

## Improvement Directions

Some ways to improve the strategy:

1. Optimizing Stochastic parameters like the K and D periods to locate turning points accurately.

2. Optimizing the ADX period to determine the best parameters for judging trend strength.

3. Adding trend reversal signals such as increasing position size in Stochastic overbought/oversold zones with stop loss.

4. Combining other indicators like RSI and MACD to refine entry and exit timing.

5. Using machine learning to find the optimal parameter combinations. 

6. Implementing stop loss strategies like moving stop loss or reverse stop loss to control single trade loss.

7. Trailong stop loss: Add trailing stop loss to lock in profits as the trend extends.

8. Money management: Optimize the risk management by adjusting position sizing based on ADX strength.

## Summary

In summary, this Momentum Breakout strategy is overall a trend-following system, using Stochastic to determine the trend direction and ADX to gauge the strength, forming a medium-to-long term trading strategy. The advantages lie in catching trends and controlling drawdowns with a simple and intuitive logic. The weaknesses are potential missed early breakout trades and trend reversal risks. We can optimize it through methods like parameter tuning, adding signals, implementing stop loss to improve reward/risk while controlling risks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|55|Buy Entry/Exit Line|
|v_input_2|45|Sell Entry/Exit Line|
|v_input_3|14|Stochastic Length - Default 14|
|v_input_4|2|SMA Length - 3-day (3 by default) simple moving average of stoch|
|v_input_5|true|Custom Backtesting Dates|
|v_input_6|2019|Backtest Start Year|
|v_input_7|true|Backtest Start Month|
|v_input_8|true|Backtest Start Day|
|v_input_9|false|Backtest Start Hour|
|v_input_10|2020|Backtest Stop Year|
|v_input_11|true|Backtest Stop Month|
|v_input_12|5|Backtest Stop Day|
|v_input_13|false|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Created by Bitcoinduke
//Original Creator is Jake Bernstein 
// Link: https://school.stockcharts.com/doku.php?id=trading_strategies:stochastic_pop_drop
// Tested: XBTUSD 3h | BTCPERP FTX 3h
//@version=4
// strategy(shorttitle="Stochastic Pop and Drop", title="Pop and Drop", overlay=false, 
//      calc_on_every_tick=false, pyramiding=0, default_qty_type=strategy.cash, 
//      default_qty_value=1000, currency=currency.USD, initial_capital=1000,
//      commission_type=strategy.commission.percent, commission_value=0.075)

upper_threshold_buy = input(55, minval=50, title="Buy Entry/Exit Line")
lower_threshold_sell = input(45, maxval=50, title="Sell Entry/Exit Line")

oscillator_length = input(14, minval=1, title="Stochastic Length - Default 14")
sma_length = input(2, minval=1, title="SMA Length - 3-day (3 by default) simple moving average of stoch")

stoch_oscillator = sma(stoch(close, high, low, oscillator_length), sma_length)

//Upper and Lower Entry Lines
upper_line = upper_threshold_buy
lower_line = lower_threshold_sell

stoch_color = stoch_oscillator >= upper_line ? green : stoch_oscillator <= lower_line ? red : purple

//Charts
plot(stoch_oscillator, title="Stochastic", style=histogram, linewidth=4, color=stoch_color)
upper_threshold = plot(upper_line, title="Upper Line", style=line, linewidth=4, color=green)
lower_threshold = plot(lower_line, title="Lower Line", style=line, linewidth=4, color=red)

// Strategy Logic
LongSignal = stoch_oscillator >= upper_line and not (stoch_oscillator > lower_line and stoch_oscillator < upper_line) ? true : false
ShortSignal = stoch_oscillator <= lower_line and not (stoch_oscillator > lower_line and stoch_oscillator < upper_line) ? true : false

strategy.entry("POP_Short", strategy.short, when=ShortSignal)
strategy.entry("POP_Long", strategy.long, when=LongSignal)

// === Backtesting Dates === thanks to Trost

testPeriodSwitch = input(true, "Custom Backtesting Dates")
testStartYear = input(2019, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, testStartHour, 0)
testStopYear = input(2020, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(5, "Backtest Stop Day")
testStopHour = input(0, "Backtest Stop Hour")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, testStopHour, 0)
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
testPeriod_1 = testPeriod()
isPeriod = testPeriodSwitch == true ? testPeriod_1 : true
// === /END


```

> Detail

https://www.fmz.com/strategy/430060

> Last Modified

2023-10-24 16:35:24
