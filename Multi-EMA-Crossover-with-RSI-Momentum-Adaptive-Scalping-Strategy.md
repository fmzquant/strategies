
> Name

Multi-EMA-Crossover-with-RSI-Momentum-Adaptive-Scalping-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d99af1df8020c97609f3.png)
![IMG](https://www.fmz.com/upload/asset/2d8eed27203c4417ac866.png)



#### Overview
This strategy is a scalping trading system that combines Exponential Moving Averages (EMA) and Relative Strength Index (RSI). It identifies potential trading opportunities through multiple EMA crossover signals confirmed by RSI momentum. The strategy incorporates adaptive stop-loss and take-profit targets, optimized for 15-minute timeframe trading.

#### Strategy Principles
The strategy utilizes three EMAs (9, 21, 50 periods) and a 14-period RSI indicator. For long positions, signals are generated when the 9-period EMA crosses above the 21-period EMA, price is above the 50-period EMA, and RSI is between 40-70. For short positions, signals occur when the 9-period EMA crosses below the 21-period EMA, price is below the 50-period EMA, and RSI is between 30-60. Each trade incorporates percentage-based stop-loss and take-profit levels.

#### Strategy Advantages
1. Integration of multiple technical indicators enhances signal reliability
2. RSI filters out trades in extreme overbought/oversold areas
3. Percentage-based stop-loss and take-profit levels facilitate risk management
4. 50-period EMA serves as a trend filter, improving directional accuracy
5. Clear strategy logic, easy to understand and implement
6. Well-suited for volatile market conditions

#### Strategy Risks
1. May generate frequent false breakout signals in ranging markets
2. Multiple indicators might lead to delayed signals
3. Fixed percentage stops and targets may not suit all market conditions
4. Potential to miss significant price movements in fast markets
5. Requires continuous monitoring of market conditions for strategy effectiveness

#### Optimization Directions
1. Incorporate volume indicators to enhance signal reliability
2. Develop adaptive stop-loss and take-profit mechanisms
3. Add market volatility filters
4. Optimize dynamic adjustment of RSI ranges
5. Implement time-based filters to avoid specific trading periods

#### Summary
The strategy builds a comprehensive trading system by combining multiple technical indicators. It includes clear entry/exit signals and risk management mechanisms. The core advantage lies in improving trade reliability through multiple confirmations, but traders need to closely monitor market conditions and adjust parameters accordingly. This strategy is particularly suitable for traders with a solid technical analysis foundation.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("RSI + EMA Scalping Strategy", overlay=true)

// Input for EMAs
ema9 = ta.ema(close, 9)
ema21 = ta.ema(close, 21)
ema50 = ta.ema(close, 50)

// RSI Input
rsi = ta.rsi(close, 14)

// User-defined input for Stop Loss & Target percentages
stop_loss_percent = input.float(0.5, "Stop Loss (%)", step=0.1)
target_percent = input.float(1.0, "Target (%)", step=0.1)

// Long condition
longCondition = ta.crossover(ema9, ema21) and close > ema50 and rsi > 40 and rsi < 70
if (longCondition)
    strategy.entry("Buy", strategy.long)
    stopLossPrice = close * (1 - stop_loss_percent / 100)
    takeProfitPrice = close * (1 + target_percent / 100)
    strategy.exit("Exit Buy", "Buy", stop=stopLossPrice, limit=takeProfitPrice)


// Short condition
shortCondition = ta.crossunder(ema9, ema21) and close < ema50 and rsi < 60 and rsi > 30
if (shortCondition)
    strategy.entry("Sell", strategy.short)
    stopLossPrice = close * (1 + stop_loss_percent / 100)
    takeProfitPrice = close * (1 - target_percent / 100)
    strategy.exit("Exit Sell", "Sell", stop=stopLossPrice, limit=takeProfitPrice)


// Plot EMAs
plot(ema9, color=color.orange, linewidth=1, title="EMA 9")
plot(ema21, color=color.blue, linewidth=1, title="EMA 21")
plot(ema50, color=color.purple, linewidth=2, title="EMA 50")

```

> Detail

https://www.fmz.com/strategy/483120

> Last Modified

2025-02-21 14:27:45
