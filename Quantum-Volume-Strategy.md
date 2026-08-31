
> Name

Quantum-Volume-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14095fd249a808d8083.png)


### Overview

The Quantum Volume Strategy is a trading strategy based on the Quantum Volume indicator. This strategy generates trading signals when the Quantum Volume indicator crosses above or below a threshold value over a certain period. The strategy aims to capture trending price moves driven by significant changes in trading volume.  

### Strategy Logic

The core indicator of this strategy is the Quantum Volume indicator. The Quantum Volume indicator calculates the ratio between the moving average of volume over a certain period and the moving average of volume over the previous period. By comparing the relative changes in volume, it judges the strengthening or weakening of trading momentum. When trading momentum strengthens markedly, the Quantum Volume indicator surges, usually presaging a trending price rise. When momentum weakens significantly, the Quantum Volume indicator declines sharply, often foreshadowing a trending price fall.

Specifically, this strategy first calculates the 14-period Quantum Volume indicator, then sets a threshold of 1.5 for the indicator. A buy signal is generated when the indicator crosses above the threshold, and a sell signal is generated when the indicator crosses below the threshold. The buy signal indicates expanding momentum predicting an upside price move, while the sell signal represents contracting momentum calling for a downside price move. Therefore, the strategy aims to predict trending price reversals based on momentum breakouts reflected in volume.

### Advantage Analysis 

This strategy has several key advantages:

1. Captures early trend signals. The Quantum Volume indicator, based on volume data, can early detect trend reversals driven by volume changes. Using this indicator can generate trading signals at the very beginning of emerging trends.

2. Avoids false breakouts. Relying on volume momentum, this strategy filters out false breakout signals not supported by actual trading activity, avoiding unnecessary losses. 

3. Simple parameter setting. The strategy only needs to set the parameters for the Quantum Volume indicator without complex multi-parameter optimization, making it simple and intuitive to use.

4. Flexibility. The Quantum Volume indicator has no rigid usage restrictions and can be easily incorporated into various trading systems, giving it strong adaptability.

5. Algorithm friendly. The strategy is completely rule-based with simple and systematic signal generation, making it very suitable for algorithmic and automated trading.

### Risk Analysis

Some risks of this strategy should be noted:

1. Prone to whipsaws. The Quantum Volume indicator is very sensitive to volume changes. Abnormal volume-price patterns in the market may cause whipsaw signals.

2. Needs trend identification. This strategy works best in trending markets. Other indicators should be used to identify trends and ranges to avoid wrong signals during consolidations.

3. High trading frequency. The strategy may generate frequent trades. Position sizing and trade frequency should be controlled to manage costs and risks. 

4. Strict stop loss needed. As price movements cannot be perfectly predicted, a tight stop loss is required to limit losses on individual trades.

5. Overoptimization risk. The parameters and periods of the Quantum Volume indicator can be optimized in many ways. Overoptimization should be avoided.

### Improvement Directions

The strategy can be enhanced in several aspects:

1. Add trend filters using indicators like SMA to avoid trading in ranges.

2. Implement position sizing rules based on account size to control single trade risk. 

3. Set trailing stop loss to lock in profits as price moves favorably.

4. Optimize parameters of the Quantum Volume indicator through robust backtesting. Smoothing techniques can also be tested.

5. Incorporate additional volume indicators for consensus confirmation to avoid false signals.

6. Add signal filters such as requiring 3 consecutive closes beyond thresholds to reduce unwanted trades. 

### Summary

The Quantum Volume Strategy is a representative trading strategy based on volume momentum. It forecasts trend reversals by assessing changes in momentum reflected in the Quantum Volume indicator. This strategy can effectively capture early trend opportunities and avoid chasing momentum extremes. With proper enhancements and risk management, the Quantum Volume Strategy can significantly improve the performance of quantitative trading systems. Overall, as a unique alpha source based on volume analysis, the Quantum Volume Strategy has immense practical value for algo trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Quantum Volume Period|
|v_input_2|1.5|Quantum Volume Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-12 00:00:00
end: 2023-10-19 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Quantum Volume Strategy")

// Quantum Volume indicator inputs
qvPeriod = input(14, "Quantum Volume Period")
qvThreshold = input(1.5, "Quantum Volume Threshold")

// Calculate Quantum Volume
qv = ta.sma(volume, qvPeriod) / ta.sma(volume, qvPeriod)[1]

// Entry conditions
enterLong = ta.crossover(qv, qvThreshold)
enterShort = ta.crossunder(qv, qvThreshold)

// Exit conditions
exitLong = ta.crossunder(qv, qvThreshold)
exitShort = ta.crossover(qv, qvThreshold)

// Strategy orders
if (enterLong)
    strategy.entry("Long", strategy.long)
if (enterShort)
    strategy.entry("Short", strategy.short)

if (exitLong)
    strategy.close("Long")
if (exitShort)
    strategy.close("Short")

// Plot Quantum Volume and threshold
plot(qv, title = "Quantum Volume", color = color.blue)
hline(qvThreshold, "Threshold", color = color.red)
```

> Detail

https://www.fmz.com/strategy/429775

> Last Modified

2023-10-20 16:28:44
