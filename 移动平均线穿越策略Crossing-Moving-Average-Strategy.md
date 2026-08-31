
> Name

移动平均线穿越策略Crossing-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11e8ea4d21504523c68.png)



## Overview

The crossing moving average strategy calculates moving averages of different periods and uses their crossovers as trading signals. It belongs to technical analysis strategies. This strategy combines fast, medium and slow moving averages to judge trading signals, which can effectively filter market noise and identify trends.

## Strategy Logic

The strategy calculates 3 moving averages with different periods: 34-period EMA, 89-period EMA and 200-period EMA. It first computes these 3 MAs, then plots them in different colors and linewidths for clear identification.

The trading signals are generated based on the crossovers between different MAs: when the fast MA crosses above the medium MA, it triggers the buy signal; when the fast MA crosses below the medium MA, it triggers the sell signal. This belongs to an aggressive trading strategy.

To filter out excess noise, the strategy also employs a slow MA. Only when the fast MA crosses the slow MA simultaneously will the actual buy and sell signals be triggered. For example, only when the fast MA crosses above both the medium and slow MAs will the buy signal be generated. This ensures trades only occur when significant trend changes happen.

## Advantages  

- Uses multi-period MAs to filter noise and identify big trend changes.
- Fast MA is sensitive, medium MA is stable, and slow MA filters fake breakouts. The combo identifies trend reversals well.
- Uses EMA to calculate MAs which puts more weight on recent prices and reacts better to trend changes. 
- Visualizes different MAs clearly via crossover for easy signal identification.
- Flexible strategy allowing MA period adjustments for different market environments.

## Risks

- MAs have lag and may delay signal generation.
- Strong trends may override MAs and generate excessive signals. 
- Poor MA period settings may increase trade frequency and risk.
- Extreme volatility could cause incorrect MA crossovers.
- Markets with high fees are not suitable for such high-frequency strategies.

## Enhancements

- Evaluate different MA period combinations to find optimal parameters.
- Add volatility index etc. to pause trading when huge swings occur.
- Combine with stochastic oscillator etc. to avoid buying/selling at extremes.
- Optimize entry timing by waiting for key MA pullbacks before entering. 
- Use adaptive MAs to dynamically adjust periods for better flexibility.

## Conclusion  

The crossing moving average strategy is a typical technical analysis strategy. It observes the relationship between MAs of different timeframes to determine market reversal points. The simultaneous use of fast, medium and slow MAs can both react quickly to trends and filter fake signals effectively. With proper parameter tuning, it can be flexible for different market environments. Still, lagging issues with MAs need to be considered. Overall, the strategy has an intuitive logic and is worth validating and optimizing in live markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|Fast MA|
|v_input_2|89|Medium MA|
|v_input_3|200|Slow MA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-11-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="EMA 34, 89, 200 e cruzamento das EMA", overlay=true)

// Input options
fastMALen = input(title="Fast MA",  defval=34)
midMALen  = input(title="Medium MA",  defval=89)
slowMALen = input(title="Slow MA",  defval=200)

// Calculate values
fastMA = ema(close, fastMALen)
midMA  = ema(close, midMALen)
slowMA = ema(close, slowMALen)

// Plot values
plot(series=fastMA, color=yellow,
     title="Fast MA", linewidth=3, trackprice=false)
plot(series=midMA, color=red,
     title="Mid MA", linewidth=4, trackprice=false)
plot(series=slowMA, color=white,
     title="Slow MA", linewidth=5)

// Highlight crossovers
longCondition = crossover(ema(close, 34), ema(close, 200)) 
if (longCondition)
    strategy.entry("COMPRA FINAL", strategy.long)

longCondition1 = crossover(ema(close, 34), ema(close, 89)) 
if (longCondition1)
    strategy.entry("COMPRA INICIAL", strategy.long)

shortCondition = crossunder(ema(close, 34), ema(close, 200))
if (shortCondition)
    strategy.entry("VENDE FINAL", strategy.short)
    
shortCondition1 = crossunder(ema(close, 34), ema(close, 89))
if (shortCondition1)
    strategy.entry("VENDE INICIAL", strategy.short)

```

> Detail

https://www.fmz.com/strategy/431287

> Last Modified

2023-11-06 17:01:53
