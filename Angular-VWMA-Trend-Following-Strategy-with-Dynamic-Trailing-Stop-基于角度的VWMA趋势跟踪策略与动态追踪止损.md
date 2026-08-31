
> Name

Angular-VWMA-Trend-Following-Strategy-with-Dynamic-Trailing-Stop-基于角度的VWMA趋势跟踪策略与动态追踪止损

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c7f45c6b7c70dc5eab.png)



#### Overview
This is a trend-following strategy based on Volume Weighted Moving Average (VWMA) and Exponential Moving Average (EMA), incorporating price angle analysis and dynamic trailing stop mechanism. The strategy primarily determines entry points through VWMA and fast moving average crossovers, combined with price movement angle conditions, while using percentage-based trailing stops for risk management.

#### Strategy Principles
The core logic is based on several key components:
1. 25-period VWMA as the main trend indicator
2. 8-period VWMA as the fast signal line
3. 50-period EMA for longer-term trend identification
4. 50-period EMA angle calculation (set at 45-degree threshold)
5. Optional 200-period EMA as market bias filter
Entry signals are triggered when the fast moving average crosses the main VWMA and price angle conditions are met. The strategy protects profits through a 1% dynamic trailing stop.

#### Strategy Advantages
1. Multi-timeframe validation - Strategy performs well on H1 and above, as well as M1 timeframes
2. Angle filtration - Reduces false breakouts through price movement angle conditions
3. Robust risk management - Employs percentage-based trailing stops for dynamic profit protection
4. High adaptability - Can be adjusted through parameters to suit different market conditions
5. Comprehensive trend confirmation - Uses multiple moving average crossovers for trend confirmation

#### Strategy Risks
1. Suboptimal performance in ranging markets - May generate frequent false signals in sideways markets
2. Delayed entry - Multiple confirmations may cause missing early trend opportunities
3. Poor performance on M15 timeframe - Should be avoided on this timeframe
4. Parameter sensitivity - Angle threshold and moving average period selection significantly impact strategy performance
5. Early exits from trailing stops - May result in premature stopouts in volatile markets

#### Strategy Optimization Directions
1. Implement volatility adaptation - Dynamically adjust trailing stop percentage based on market volatility
2. Add volume filters - Enhance signal quality through volume confirmation
3. Optimize angle calculation - Consider using adaptive angle thresholds
4. Incorporate market state recognition - Develop trend/range market identification mechanisms
5. Improve exit mechanisms - Optimize exit timing through price patterns and momentum indicators

#### Summary
This is a well-structured trend-following strategy that achieves good performance in major trends through the combination of angle analysis and multiple moving averages. While it has certain limitations in terms of lag and parameter sensitivity, there is room for improvement through the suggested optimization directions. It is particularly suitable for trend trading in longer timeframes.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-18 00:00:00
end: 2024-10-16 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("PVSRA Trailing Strategy with Angle Condition (40-50 degrees)", overlay=true)

// === INPUTS ===
priceData = input.source(close, title="Price Data")
maLength  = input.int(25, title="Moving Average Length", minval=2)
useBias   = input.bool(false, title="Long/Short just above/below 200 EMA")
useTrailing = input.bool(true, title="Use Trailing Stop")
trailPerc  = input.float(1.0, title="Trailing Stop Percentage", minval=0.1)
anglePeriod = input.int(14, title="Period for Angle Calculation", minval=1)

// === CÁLCULOS ===
maValue = ta.vwma(priceData, maLength)
maLong  = ta.ema(high, 50)
maShort = ta.ema(low, 50)
maFast  = ta.vwma(close, 8)
bias    = ta.ema(close, 200)
longBias  = useBias ? close > bias : true
shortBias = useBias ? close < bias : true

// === CÁLCULO DO ÂNGULO DA MÉDIA MÓVEL DE 50 ===
ma50 = ta.ema(close, 50)
angle = math.atan((ma50 - ma50[anglePeriod]) / anglePeriod) * (180 / math.pi)  // Converte radianos para graus

// === CONDIÇÃO DE ÂNGULO ===
validAngleL = angle >= 45
validAngleS = angle <= 45

// === PLOTS ===
plot(maValue, color=color.orange, title="Moving Average")
plot(maFast, color=color.green, title="Fast MA")
plot(ma50, color=color.blue, title="50 EMA")

plotshape(series=(strategy.position_size > 0) ? maValue : na,
     color=color.red, style=shape.circle, location=location.absolute,
     title="Long Stop")

plotshape(series=(strategy.position_size < 0) ? maValue : na,
     color=color.red, style=shape.cross, location=location.absolute,
     title="Short Stop")

// === CONDIÇÕES DE ENTRADA ===
enterLong  = close > maValue and ta.crossover(maFast, maValue) and close > maLong and longBias and validAngleL
enterShort = close < maValue and ta.crossunder(maFast, maValue) and close < maShort and shortBias and validAngleS

// === CONDIÇÕES DE SAÍDA ===
exitLong  = ta.crossunder(maFast, maValue) and strategy.position_size > 0
exitShort = ta.crossover(maFast, maValue) and strategy.position_size < 0

// === EXECUÇÃO DA ESTRATÉGIA ===
if (enterLong)
    strategy.entry("EL", strategy.long)

if (enterShort)
    strategy.entry("ES", strategy.short)

if (exitLong or exitShort)
    strategy.close_all()

// === TRAILING STOP ===
if (useTrailing and strategy.position_size > 0)
    trailPrice = close * (1 - trailPerc / 100)
    strategy.exit("Trailing Long", from_entry="EL", stop=trailPrice)

if (useTrailing and strategy.position_size < 0)
    trailPrice = close * (1 + trailPerc / 100)
    strategy.exit("Trailing Short", from_entry="ES", stop=trailPrice)
```

> Detail

https://www.fmz.com/strategy/482422

> Last Modified

2025-02-18 13:42:01
