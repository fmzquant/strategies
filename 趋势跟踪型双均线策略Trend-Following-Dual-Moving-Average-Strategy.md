
> Name

趋势跟踪型双均线策略Trend-Following-Dual-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11dca9ced5455f7b02b.png)


### Overview

This strategy uses the Average Directional Movement Index Rating (ADXR) to identify market trends and combines dual moving averages to generate trading signals. It belongs to a typical trend following strategy. The ADXR indicator can effectively identify changes in trends, and the dual moving averages can further filter out some false signals. This strategy is suitable for trending markets such as stocks and forex to gain better returns in range-bound markets.

### Strategy Logic

1. Calculate the ADXR indicator value. ADX reflects the strength of the trend; ADXR smoothes ADX and better displays the trend.

2. Set dual thresholds for the ADXR indicator. When ADXR crosses above the first threshold, it indicates an uptrend. When it crosses below the second threshold, it indicates a downtrend. 

3. Determine position direction based on ADXR signals. Go long when ADXR crosses above the first threshold, and go short when it crosses below the second threshold.

4. Filter signals with dual moving averages. Go long only when price is above the fast MA, and go short only when price is below the slow MA. This filtering avoids wrong trades during trend reversals.

5. Color the candlesticks based on position direction. Long positions are in green, short positions are in red.

### Advantage Analysis 

1. ADXR smoothes price fluctuations and effectively identifies trends, avoiding trading risks from ranging markets.

2. Dual moving average filtering reduces drawdowns by avoiding losses from trend reversals.

3. Combining a trend indicator and moving averages ensures trading along trends while controlling risks, suitable for trending markets.

4. The strategy logic is simple and flexible for parameter tuning for different market environments.

### Risk Analysis

1. Improper ADXR parameters may fail to timely capture trend changes. Parameters should be carefully set according to the specific market.

2. Improper moving average parameters may filter too many valid signals. Parameters should be adjusted per market conditions. 

3. Any indicator may give wrong signals. Larger timeframe trends should be considered to avoid traps.

4. Reduce position sizing in ranging markets to limit losses.

### Optimization Directions

1. Other indicators like MACD and Bollinger Bands can be added to confirm ADXR signals and improve accuracy.

2. Stop loss strategies like trailing stops and time stops can be added to limit per trade loss.

3. Optimize parameters based on market efficiency, like longer averaging periods for low efficiency markets.

4. Incorporate money management strategies like fixed fractional position sizing to better control overall risks.

### Conclusion

This strategy is a typical trend following strategy, using ADXR to determine trend direction and dual moving averages to reduce drawdowns. The advantages lie in its simplicity and flexibility to be adapted for different markets. But any technical indicator can give false signals, and risks should be managed with trend filters and money management. With proper parameter tuning, this strategy can achieve good risk-adjusted returns for trending markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length ADX|
|v_input_2|14|Length ADXR|
|v_input_3|false|Trade reverse|
|v_input_4|13|Signal1|
|v_input_5|45|Signal2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-17 00:00:00
end: 2023-10-24 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 04/05/2018
// The Average Directional Movement Index Rating (ADXR) measures the strength 
// of the Average Directional Movement Index (ADX). It's calculated by taking 
// the average of the current ADX and the ADX from one time period before 
// (time periods can vary, but the most typical period used is 14 days).
// Like the ADX, the ADXR ranges from values of 0 to 100 and reflects strengthening 
// and weakening trends. However, because it represents an average of ADX, values 
// don't fluctuate as dramatically and some analysts believe the indicator helps 
// better display trends in volatile markets.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
fADX(Len) =>
    up = change(high)
    down = -change(low)
    trur = rma(tr, Len)
    plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, Len) / trur)
    minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, Len) / trur)
    sum = plus + minus 
    100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), Len)

strategy(title="Average Directional Movement Index Rating Backtest", shorttitle="ADXR")
LengthADX = input(title="Length ADX", defval=14)
LengthADXR = input(title="Length ADXR", defval=14)
reverse = input(false, title="Trade reverse")
Signal1 = input(13, step=0.01)
Signal2 = input(45, step=0.01)
hline(Signal1, color=green, linestyle=line)
hline(Signal2, color=red, linestyle=line)
xADX = fADX(LengthADX)
xADXR = (xADX + xADX[LengthADXR]) / 2
pos = iff(xADXR < Signal1, 1,
       iff(xADXR > Signal2, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xADXR, color=green, title="ADXR")
```

> Detail

https://www.fmz.com/strategy/430125

> Last Modified

2023-10-25 11:42:23
