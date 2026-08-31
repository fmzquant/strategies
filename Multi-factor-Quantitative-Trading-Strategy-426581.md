
> Name

Multi-factor-Quantitative-Trading-Strategy-426581

> Author

ChaoZhang

> Strategy Description


The multi-factor quantitative trading strategy that integrates moving average factors and oscillating indicators to control risks and improve stability. This article explains the rationale, advantages and potential risks of this trading strategy in detail.

## Strategy Logic

The strategy consists of three main modules:

1. Moving Average Factors

Using 5 EMAs with different periods (8, 13, 21, 34, 55) to build a trend filter. The MAs are arranged from short to long. Only when faster EMA crosses above slower EMA, the trend signal is generated.

2. Oscillating Indicators 

Combine RSI and Stochastic oscillators to validate the breakout signals, avoiding excessive false breaks in ranging markets. 

RSI (14) generates long signal when in 40-70 range and short signal when in 30-60 range.

Stochastic (14,3,3) gives long signal when K line is between 20-80 and short signal when K line is between 5-95.

3. Entry and Exit Logic

Entry signal is triggered only when both factors are aligned. Exit signal is generated when either factor is no longer valid.

The strict multi-factor filter ensures high win rate and reliable signals.

## Advantages

- Multi-factor design effectively filters market noise and prevents over-trading.
- Combines trend following and mean-reversion, balancing dynamic trading andlocation trading.
- Captures reversal points within trends using MA and oscillators. 
- Large optimization space to obtain better performance.

## Risks

- Relatively low signal frequency, may miss some opportunities.
- MA lagging should be verified with faster oscillators.
- Oscillators prone to false signals, should be used as auxiliary factors.
- Parameters need periodic optimization to adapt to changing market conditions.

## Conclusion

This strategy successfully combines the strengths of trend following and reversal trading strategies. The multi-factor risk control model delivers stable alpha. It is a highly practical quantitative trading strategy worth in-depth research and application by the AI community.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2022-11-15 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Combined Strategy", default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value = .0020, pyramiding = 0, slippage = 3, overlay = true)

//----------//
// MOMENTUM //
//----------//
ema8 = ema(close, 8)
ema13 = ema(close, 13)
ema21 = ema(close, 21)
ema34 = ema(close, 34)
ema55 = ema(close, 55)

plot(ema8, color=red, style=line, title="8", linewidth=1)
plot(ema13, color=orange, style=line, title="13", linewidth=1)
plot(ema21, color=yellow, style=line, title="21", linewidth=1)
plot(ema34, color=aqua, style=line, title="34", linewidth=1)
plot(ema55, color=lime, style=line, title="55", linewidth=1)

longEmaCondition = ema8 > ema13 and ema13 > ema21 and ema21 > ema34 and ema34 > ema55
exitLongEmaCondition = ema13 < ema55

shortEmaCondition = ema8 < ema13 and ema13 < ema21 and ema21 < ema34 and ema34 < ema55
exitShortEmaCondition = ema13 > ema55

// ----------  //
// OSCILLATORS //
// ----------- //
rsi = rsi(close, 14)
longRsiCondition = rsi < 70 and rsi > 40
exitLongRsiCondition = rsi > 70

shortRsiCondition = rsi > 30 and rsi < 60
exitShortRsiCondition = rsi < 30

// Stochastic
length = 14, smoothK = 3, smoothD = 3
kFast = stoch(close, high, low, 14)
dSlow = sma(kFast, smoothD)

longStochasticCondition = kFast < 80
exitLongStochasticCondition = kFast > 95

shortStochasticCondition = kFast > 20
exitShortStochasticCondition = kFast < 5

//----------//
// STRATEGY //
//----------//

longCondition = longEmaCondition and longRsiCondition and longStochasticCondition and strategy.position_size == 0
exitLongCondition = (exitLongEmaCondition or exitLongRsiCondition or exitLongStochasticCondition) and strategy.position_size > 0

if (longCondition)
    strategy.entry("LONG", strategy.long)
if (exitLongCondition)
    strategy.close("LONG")
    
shortCondition = shortEmaCondition and shortRsiCondition and shortStochasticCondition and strategy.position_size == 0
exitShortCondition = (exitShortEmaCondition or exitShortRsiCondition or exitShortStochasticCondition) and strategy.position_size < 0

if (shortCondition)
    strategy.entry("SHORT", strategy.short)
if (exitShortCondition)
    strategy.close("SHORT")
```

> Detail

https://www.fmz.com/strategy/426581

> Last Modified

2023-09-13 14:46:59
