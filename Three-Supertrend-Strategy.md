
> Name

Three-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description


Supertrend Strategy Principle Analysis

The Supertrend strategy is a trend-following strategy that determines trend direction by calculating the Average True Range (ATR) and plotting Supertrend lines. This strategy uses three sets of parameters to plot three Supertrend lines and generate trading signals when the price breaks through the lines.

The strategy first calculates three sets of ATR and factors to plot three Supertrend lines. The ATR reflects price volatility while the factor determines the sensitivity of the Supertrend lines to price. This strategy adopts combinations of short-term, medium-term and long-term parameters to capture trend changes across different timeframes.

When the price crosses above the Supertrend line, it signals an uptrend and the strategy will go long. When the price crosses below the line, it signals a downtrend and the strategy will go short. The three Supertrend lines can generate more trading opportunities while also validating signals to reduce false signals.

In addition, the strategy uses the change function to check if the Supertrend line direction has changed. New signals are generated only when the direction changes, avoiding new trades immediately after closing positions. Finally, the strategy offers close all and cancel all functions to improve tradability.

In summary, the Supertrend strategy fully utilizes the advantages of the Supertrend indicator to capture trends across timeframes using multiple parameters sets. It also incorporates proper entry and exit systems and can serve as a reference for trend following strategies.

Supertrend Strategy Advantages

The Supertrend strategy has the following advantages:

1. Strong ability to capture trend changes - The dynamic Supertrend lines can flexibly capture trend changes in the market and avoid false signals from ranging markets.

2. Multiple parameter sets - Using three parameter sets to plot three Supertrend lines allows capturing trends across short, medium and long timeframes for more opportunities. 

3. Reversal validation mechanism - Generating new signals only when the Supertrend line direction changes avoids unnecessary whipsaws and verifies signal reliability.

4. Practical design - The close all positions and cancel all orders functions improve real-world tradability. 

5. Simple and clear logic - Using Supertrend as the basis with straightforward signal rules makes it easy to operate and test. Suitable for quantitative trading beginners.

Supertrend Strategy Risks  

The Supertrend strategy also has the following risks:

1. Prone to false signals - Frequent crosses of the Supertrend lines may generate excessive false signals and losses in ranging markets.

2. Difficult parameter optimization - Optimizing multiple parameter sets can be challenging. Unsuitable parameters may degrade performance.

3. Unable to identify trend reversal points - Relies solely on trend direction without determining potential trend reversions. Requires additional indicators.

4. Extreme events risks - Unable to effectively control risks in extreme market conditions. Requires stop loss strategies to manage risk.

5. Curve fitting bias - Optimized parameters can overfit historical data but may not remain effective in the future. Require prudent evaluation.

Supertrend Strategy Summary

Overall, the Supertrend strategy is a simple and practical trend following system. It capitalizes on the dynamic Supertrend lines to determine trend direction and uses multiple parameter sets to improve performance. The strategy mechanisms are also reasonably designed for tradability. However, issues like false signals and difficult parameter optimization requires combining with other technical indicators for improvements. In general, the Supertrend strategy works well for medium to long-term trend tracking and can serve as a reference strategy template for beginners.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Close_all_Position|
|v_input_2|false|Check To Cancel|
|v_input_3|7|ATR Length-1|
|v_input_4|1.5|Factor-1|
|v_input_5|10|ATR Length-2|
|v_input_6|2|Factor-2|
|v_input_7|20|ATR Length-3|
|v_input_8|3|Factor-3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MarketShree 

//@version=4
// strategy("Supertrend Strategy", overlay=true, default_qty_value=15)
closs_all=input(title="Close_all_Position", type=input.bool, defval=false)
cancel=input(title="Check To Cancel", type=input.bool, defval=false)

atrPeriod1 = input(7, "ATR Length-1")
factor1 = input(1.5,"Factor-1",type=input.float)
atrPeriod2 = input(10, "ATR Length-2")
factor2 = input(2, "Factor-2")
atrPeriod3 = input(20, "ATR Length-3")
factor3 = input(3, "Factor-3")

[superTrend1, direction1] = supertrend(factor1, atrPeriod1)
[superTrend2, direction2] = supertrend(factor2, atrPeriod2)
[superTrend3, direction3] = supertrend(factor3, atrPeriod3)

if change(direction1) < 0
    strategy.entry("LONG", strategy.long)

if change(direction1) > 0
    strategy.entry("SHORT", strategy.short)
strategy.close_all(when=closs_all,comment ="All postion are closed")
strategy.cancel_all(when=cancel)

if change(direction2) < 0
    strategy.entry("LONG", strategy.long)

if change(direction2) > 0
    strategy.entry("SHORT", strategy.short)
strategy.close_all(when=closs_all,comment ="All postion are closed")
strategy.cancel_all(when=cancel)
    
if change(direction3) < 0
    strategy.entry("LONG", strategy.long)

if change(direction3) > 0
    strategy.entry("SHORT", strategy.short)
strategy.close_all(when=closs_all,comment ="All postion are closed")
strategy.cancel_all(when=cancel)

colResistance = direction1 == 1 and direction1 == direction1[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport = direction1 == -1 and direction1 == direction1[1] ? color.new(color.green, 0) : color.new(color.green, 100)
plot(superTrend1, color = colResistance, linewidth=2)
plot(superTrend1, color = colSupport, linewidth=2)    

colResistance1 = direction2 == 1 and direction2 == direction2[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport1 = direction2 == -1 and direction2 == direction2[1] ? color.new(color.green, 0) : color.new(color.green, 100)
plot(superTrend2, color = colResistance, linewidth=2)
plot(superTrend2, color = colSupport, linewidth=2)

colResistance2 = direction3 == 1 and direction3 == direction3[1] ? color.new(color.red, 0) : color.new(color.red, 100)
colSupport2 = direction3 == -1 and direction3 == direction3[1] ? color.new(color.green, 0) : color.new(color.green, 100)
plot(superTrend3, color = colResistance1, linewidth=2)
plot(superTrend3, color = colSupport1, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/426928

> Last Modified

2023-09-15 15:59:15
