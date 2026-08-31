
> Name

基于信噪比和均线的量化交易策略Signal-to-Noise-Moving-Average-Trading-Strategy-Based-on-Quantitative-Trading

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ceae36f6d74fcdedf8.png)

## I. Strategy Name  
Signal-to-Noise Moving Average Trading Strategy

## II. Strategy Overview
This strategy realizes quantitative trading by calculating the signal-to-noise ratio over a certain period and combining it with moving average trading signals. The basic idea is:  

1. Calculate the signal-to-noise ratio over a certain period (adjustable)  
2. Apply moving average to smooth the signal-to-noise ratio
3. Compare current signal-to-noise ratio with moving average value to generate trading signals  
4. Long or short based on trading signals

## III. Strategy Principle  
1. The formula for calculating signal-to-noise ratio (StN) is: StN = -10*log(Σ(1/close)/n), where n is the length of the period
2. Apply Simple Moving Average (SMA) to the signal-to-noise ratio to obtain smoothed StN
3. Compare current StN with smoothed SMAStN:
   (1) If SMAStN > StN, go short
   (2) If SMAStN < StN, go long
   (3) Otherwise, close position
   
## IV. Advantage Analysis
The main advantages of this strategy are:
1. StN can judge market fluctuation and risk, SMA has noise reduction capability 
2. Combining StN to judge market risk and SMA to generate trading signals makes use of the advantages of different indicators
3. Adjustable parameters to adapt to different market conditions
4. Stdout signals directly indicate long or short, intuitive judgment of market characteristics

## V. Risk Analysis
There are also some risks with this strategy:
1. Crossing judgment between StN and MA exists deviation risk
2. Improper period settings may cause false signals
3. Relative fewer short opportunities, optimizable via parameter adjustment 
4. Extreme fluctuations caused by black swan events may trigger stop loss

Solutions:
1. Adjust MA parameters to avoid over-smoothing
2. Optimize period parameters and test adaptability in different markets
3. Adjust short conditions to provide more short opportunities 
4. Set stop loss to control maximum losses

## VI. Optimization Direction
The strategy can be optimized in the following ways:
1. Test combination of more types of moving averages
2. Add stop loss mechanism to control risks
3. Add position management, adjust positions based on fluctuations
4. Incorporate more factors to improve stability
5. Use machine learning methods to automatically optimize parameters

## VII. Summary
This strategy realizes quantitative trading by judging market risk via signal-to-noise ratio and generating trading signals from moving average. Compared to single technical indicators, this strategy integrates the advantages of both StN and SMA to improve stability while controlling risks. With parameter optimization and machine learning, this strategy has great potential for improvement and is a reliable and effective quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Days|
|v_input_2|7|Smooth|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-25 00:00:00
end: 2023-12-29 10:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HPotter 05/01/2021
// The signal-to-noise (S/N) ratio. 
// And Simple Moving Average.
// Thank you for idea BlockchainYahoo
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors. 
////////////////////////////////////////////////////////////
SignalToNoise(length) =>
    StN = 0.0
    for i = 1 to length-1
        StN := StN + (1/close[i])/length
    StN := -10*log(StN)

strategy(title="Backtest Signal To Noise ", shorttitle="StoN", overlay=false)
length = input(title="Days", type=input.integer, defval=21, minval=2)
Smooth =  input(title="Smooth", type=input.integer, defval=7, minval=2)
reverse = input(false, title="Trade reverse")
StN = SignalToNoise(length)
SMAStN = sma(StN, Smooth)
pos = iff(SMAStN[1] > StN[1] , -1,
	   iff(SMAStN[1] < StN[1], 1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
plot(StN, title='StN' )
plot(SMAStN, title='Smooth', color=#00ff00)
```

> Detail

https://www.fmz.com/strategy/437403

> Last Modified

2024-01-02 12:24:35
