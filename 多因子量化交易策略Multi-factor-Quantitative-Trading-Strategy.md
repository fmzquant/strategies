
> Name

多因子量化交易策略Multi-factor-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

一种多因子量化交易策略,该策略综合考虑了均线因子和振荡指标因子,以控制风险提高稳定性。本文将详细介绍该交易策略的原理、优势以及可能存在的风险。

## 策略原理

本策略主要由三大模块组成:

1. 均线因子

使用5条不同周期的EMA均线(8日、13日、21日、34日、55日)构建趋势滤波器。均线由短至长排列,只有当短周期均线上穿长周期均线时,才具有趋势特征并产生交易信号。

2. 振荡指标因子

同时结合RSI和Stochastic两大振荡指标对突破进行验证,避免在震荡市场中产生大量假突破。

RSI的参数为14,当RSI在40-70区间时符合做多条件,在30-60区间时符合做空条件。

Stochastic参数为(14,3,3),当K线在20-80区间时符合做多条件,在5-95区间时符合做空条件。 

3. 入场及出场逻辑

只有当均线因子和振荡指标因子同时符合条件时,才会触发入场信号;当任一因子不再符合条件时,则产生出场信号。

整个策略采用严格的多因子过滤机制,在保持较高胜率的同时也确保了交易信号的稳定可靠。

## 策略优势

- 多因子设计有效过滤了市场噪音,避免了过度交易
- 同时考虑趋势因子和反转因子,兼具趋势跟踪和点位交易的优点
- 结合均线与振荡指标,可以在趋势中捕捉反转点位
- 优化空间大,可以通过调整参数获得更好的策略效果

## 风险提示 

- 多因子策略信号频率较低,可能错失部分交易机会
- 均线产生滞后,应结合较短周期指标进行验证
- 振荡指标容易产生虚假信号,应仅作为辅助因子
- 需要定期优化参数以适应市场环境的变化

## 总结

本策略成功融合了趋势跟踪和反转交易的优点,多因子模型有效控制了风险,可以获得稳定的超额收益。这是一种非常实用的量化交易策略模型,值得人工智能社区进行深入研究与应用。

||

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

[/trans]



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
