
> Name

基于枢轴指标的趋势操纵策略Pivot-Detector-Oscillator-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/66316b17ca9b6ddb0d.png)


## Overview

This strategy is based on the Pivot Detector Oscillator to determine the current trend direction and manipulate the trend reversely using RSI to follow the trend.

## Strategy Logic

This strategy uses SMA and RSI to construct the Pivot Detector Oscillator. The calculation method is as follows:

1. Calculate N-day SMA 
2. Calculate M-day RSI
3. When close price is above SMA, Pivot Detector Oscillator = (RSI - 35) / (85 - 35)
4. When close price is below SMA, Pivot Detector Oscillator = (RSI - 20) / (70 - 20)
5. Determine trend direction based on Pivot Detector Oscillator value
   - >50 means bullish
   - <50 means bearish

According to the Pivot Detector Oscillator signal, reverse manipulate the trend, i.e. go short when bullish and go long when bearish, to follow the trend direction. 

The key of this strategy is using the Pivot Detector Oscillator to determine the trend direction and reverse manipulate to track the market trend.

## Advantage Analysis

The main advantages of this strategy are:

1. The Pivot Detector Oscillator can accurately determine the trend direction. It comprehensively considers SMA and RSI, and can accurately identify trend reversal points.

2. The reverse manipulation strategy can effectively follow the trend. It can reverse operation in time when trend reversal happens to follow the trend.

3. The RSI parameter setting can adjust the sensitivity. Smaller RSI parameter makes it more sensitive to market changes.

4. The SMA period can be flexibly adjusted for trend analysis over different timeframes. 

5. The long/short direction can be switched to adapt to different market conditions.

6. High capital utilization efficiency without requiring large capital.

## Risk Analysis

There are also some risks:

1. Risk of misjudgment of the Pivot Detector Oscillator. Divergence may cause wrong judgments.

2. High risk of loss in reverse manipulation strategies. Strict stop loss is required. 

3. Unable to reverse operation in time in strong trend conditions, potentially missing the trend.

4. Improper parameter settings may cause over-sensitivity or sluggishness. 

5. Frequent trading leads to high transaction costs.

Risk management measures:

1. Set reasonable SMA period to avoid misjudgment.

2. Strict stop loss to control single loss.  

3. Using partial position to reduce risk.

4. Parameter optimization to find optimal parameters.

5. Optimize stop loss strategy to reduce loss.

## Improvement Directions

This strategy can be improved from the following aspects:

1. Optimize indicator parameters to find the optimal combination.

2. Optimize stop loss strategies such as trailing stop loss. 

3. Add other indicators like MACD, KDJ to filter signals.

4. Use machine learning methods to automatically optimize, like evolutionary algorithms, reinforcement learning.

5. Combine volume analysis for timing.

6. Model-based stop loss based on price fluctuation models. 

7. Optimize stop loss using high frequency data.

## Summary

This strategy uses the Pivot Detector Oscillator to determine the trend direction and reverse manipulation to follow the trend. The advantages are accuracy, flexibility, high capital utilization efficiency, but there are also risks of misjudgment and loss. Further improvements on parameter optimization and stop loss can enhance profitability and stability. Overall this is a typical quantitative trading strategy with clear logic and worth in-depth researching.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Length_MA|
|v_input_2|14|Length_RSI|
|v_input_3|100|UpBand|
|v_input_4|false|DownBand|
|v_input_5|50|MidlleBand|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 03/10/2017
// The Pivot Detector Oscillator, by Giorgos E. Siligardos
// The related article is copyrighted material from Stocks & Commodities 2009 Sep
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="The Pivot Detector Oscillator, by Giorgos E. Siligardos")
Length_MA = input(200, minval=1)
Length_RSI = input(14, minval=1)
UpBand = input(100, minval=1)
DownBand = input(0)
MidlleBand = input(50)
reverse = input(false, title="Trade reverse")
// hline(MidlleBand, color=black, linestyle=dashed)
// hline(UpBand, color=red, linestyle=line)
// hline(DownBand, color=green, linestyle=line)
xMA = sma(close, Length_MA)
xRSI = rsi(close, Length_RSI)
nRes = iff(close > xMA, (xRSI - 35) / (85-35), 
         iff(close <= xMA, (xRSI - 20) / (70 - 20), 0))
pos = iff(nRes * 100 > 50, 1,
	   iff(nRes * 100 < 50, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )       
plot(nRes * 100, color=blue, title="Pivot Detector Oscillator")
```

> Detail

https://www.fmz.com/strategy/430669

> Last Modified

2023-10-31 14:47:05
