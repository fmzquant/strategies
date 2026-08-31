
> Name

Dynamic-EMA-Crossover-with-Adaptive-Swing-High-Low-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8c15d0102ba398e0fae.png)
![IMG](https://www.fmz.com/upload/asset/2d8645bad6d73bdc7f953.png)




#### Overview
This strategy is a trading system based on the 22-period Exponential Moving Average (EMA) crossover signals and swing points. It generates trading signals through price-EMA crossovers and utilizes adaptive swing highs and lows for setting profit targets and stop losses. This approach ensures both trend-following functionality and flexible risk management.

#### Strategy Principles
The core logic includes several key elements:
1. Uses 22-period EMA as the main trend indicator, effectively filtering market noise
2. Triggers long signals when price closes above EMA, and short signals when below
3. Calculates swing highs and lows using 14-period historical data
4. Sets profit targets at recent swing highs and stop losses at swing lows for long trades
5. Sets profit targets at recent swing lows and stop losses at swing highs for short trades

#### Strategy Advantages
1. Strong trend adaptability: 22-period EMA effectively captures medium-term trends, avoiding excessive trading
2. Dynamic risk management: Profit targets and stop losses automatically adjust to market volatility
3. Clear execution: Trading signals are unambiguous with no grey areas
4. Reasonable risk-reward ratio: Swing points ensure relatively stable risk-reward ratios for each trade
5. Good visualization: Strategy provides clear visual signals for easy monitoring and understanding

#### Strategy Risks
1. Choppy market risk: May generate frequent false breakout signals in ranging markets
2. Slippage risk: Actual execution prices may significantly deviate from signal prices during volatile periods
3. Gap risk: Market gaps may render stops ineffective, causing unexpected losses
4. Trend reversal risk: May experience consecutive losses near major trend reversal points

#### Optimization Directions
1. Incorporate volume indicators: Can confirm signal reliability through volume analysis
2. Add trend filters: Combine with longer-period moving averages to filter counter-trend signals
3. Optimize stop loss methodology: Consider using ATR for dynamic stop loss adjustment
4. Implement time filters: Restrict trading during highly volatile periods
5. Develop signal confirmation mechanism: Integrate other technical indicators for signal confirmation

#### Summary
This is a well-structured trend-following strategy with clear logic. It generates trading signals through EMA crossovers and manages risk using swing points, forming a balanced trading system. The strategy's main advantage lies in its ability to dynamically adapt to market conditions, while its primary risks come from sudden market state changes. Through the suggested optimization directions, the strategy's stability and profitability can be further enhanced.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © GlenMabasa

//@version=6
strategy("22 EMA Crossover Strategy", overlay=true)

// Input for the EMA length
ema_length = input.int(22, title="EMA Length")

// Calculate the 22-day Exponential Moving Average
ema_22 = ta.ema(close, ema_length)

// Plot the 22 EMA
plot(ema_22, color=color.blue, title="22 EMA")

// Buy condition: Price crosses and closes above the 22 EMA
buy_condition = ta.crossover(close, ema_22) and close > ema_22

// Sell condition: Price crosses or closes below the 22 EMA
sell_condition = ta.crossunder(close, ema_22) or close < ema_22

// Swing high and swing low calculations
swing_high_length = input.int(14, title="Swing High Lookback")
swing_low_length = input.int(14, title="Swing Low Lookback")
swing_high = ta.highest(high, swing_high_length) // Previous swing high
swing_low = ta.lowest(low, swing_low_length)    // Previous swing low

// Profit target and stop loss for buys
buy_profit_target = swing_high
buy_stop_loss = swing_low

// Profit target and stop loss for sells
sell_profit_target = swing_low
sell_stop_loss = swing_high

// Plot buy and sell signals
plotshape(series=buy_condition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=sell_condition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Strategy logic for backtesting
if (buy_condition)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Take Profit/Stop Loss", "Buy", limit=buy_profit_target, stop=buy_stop_loss)

if (sell_condition)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Take Profit/Stop Loss", "Sell", limit=sell_profit_target, stop=sell_stop_loss)
```

> Detail

https://www.fmz.com/strategy/482870

> Last Modified

2025-02-27 17:32:58
