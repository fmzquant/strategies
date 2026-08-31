
> Name

Fast-and-Slow-Kurtosis-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



### Overview

This strategy uses the crossover of fast and slow Kurtosis lines to generate trading signals. Kurtosis reflects market sentiment and can detect reversal opportunities. The fast line is more sensitive to short-term changes while the slow line filtrates noise. Together they form a stable trading system. 

### Strategy Logic

The core indicators and rules are:

1. Kurtosis value: Reflects the steepness of price distribution.

2. Fast Kurtosis line: Kurtosis calculated with short moving average.

3. Slow Kurtosis line: Kurtosis calculated with long moving average.

4. Long signal: Fast line crosses above slow line.

5. Exit long: Fast line crosses below slow line.

6. Short signal: Fast line crosses below slow line. 

7. Exit short: Fast line crosses above slow line.

The strategy combines trend and mean-reversion in a simple and intuitive system.

### Advantages

Compared to single Kurtosis, the main pros are:

1. Fast/slow combo avoids false signals.

2. Fast line captures turns, slow line filters noise.

3. Simple to implement without complex indicators.

4. Flexible Kurtosis MA tuning.

5. Reversal option adapts to different markets.

6. Clear rules, easy to execute. 

7. Avoids chasing tops/bottoms, controls risk.

8. Good potential with parameter tuning.

### Risks

Despite the merits, risks to consider:

1. Lag in Kurtosis, cannot avoid all losses.

2. MA settings significantly impact performance.

3. No volume filter, risk of false breakouts.

4. Reliance on historical data, need robustness.

5. No stops in place, uncontrolled loss per trade. 

6. Overfitting risk from excessive optimization. 

7. Performance degradation from changing markets.

8. Need to monitor reward/risk ratios and trade frequency.

### Enhancements

Based on the analysis, enhancements may include:

1. Evaluating MA parameters impact on strategy.

2. Adding volume confirmation to avoid false breaks.

3. Implementing stop loss and take profit rules. 

4. Robustness testing across markets.

5. Incorporating machine learning techniques.

6. Optimizing risk management strategies.

7. Combining with other indicators for robust signals.

8. Regular re-testing to prevent overfitting.

9. Adjusting position sizing and frequency to lower transaction costs.

### Conclusion

This strategy uses Kurtosis crossover for a simple and intuitive system. But continual improvements and optimizations are key for any strategy to adapt to changing markets. Through systematic optimization, strategy stability and profitability can be enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|BuyZone|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-16 00:00:00
end: 2023-09-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version = 2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/12/2016
// This indicator plots the Fast & Slow Kurtosis. The Kurtosis is a market
// sentiment indicator. The Kurtosis is constructed from three different parts.
// The Kurtosis, the Fast Kurtosis(FK), and the Fast/Slow Kurtosis(FSK).
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="FSK (Fast and Slow Kurtosis) Backtest", shorttitle="FSK (Fast and Slow Kurtosis)")
BuyZone = input(0)
reverse = input(false, title="Trade reverse")
hline(BuyZone, color=green, linestyle=line)
xMOM_R = mom(mom(close, 3), 1)
xMOM_RAvr = ema(xMOM_R, 65)
xMOM_RWAvr = wma(xMOM_RAvr, 3)
pos =	iff(xMOM_RAvr > BuyZone and xMOM_RWAvr > BuyZone, 1,-1) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xMOM_RAvr, color=blue, title="FK")
plot(xMOM_RWAvr, color=red, title="FSK")
```

> Detail

https://www.fmz.com/strategy/427673

> Last Modified

2023-09-23 15:27:59
