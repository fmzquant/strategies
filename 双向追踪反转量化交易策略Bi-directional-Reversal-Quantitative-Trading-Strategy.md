
> Name

双向追踪反转量化交易策略Bi-directional-Reversal-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127a9af0d2fb1389c56.png)

This strategy employs a bi-directional tracking mechanism, combined with price reversal signals and volume indicators, to realize automated quantitative trading. Its biggest advantage lies in reliable risk control by tracking stop loss to lock in profits and avoid loss expansion. Meanwhile, the reversal trading signals enhance the win rate of the strategy. This article will analyze in detail the principles, strengths, risks and optimization directions of this strategy.

#### Strategy Principles

This strategy consists of two sub-strategies. The first sub-strategy uses stochastic indicators to determine price reversal signals. The specific logic is:

If the close price rises for two consecutive days, and the 9-day Slow K line is lower than 50, go long; If the close price falls for two consecutive days, and the 9-day Fast K line is higher than 50, go short.

The second sub-strategy combines trading volume indicators to judge the strength of momentum. Specifically, the current trading volume is compared with the 40-day average trading volume. If the current trading volume is greater than the average, it is considered as aggressive volume up, which belongs to reversal signal for going short. If the current trading volume is less than average, it is considered as volume down, which belongs to reversal signal for going long.

The final trading signal is the intersection of the signals from the two sub-strategies. That is, a position will be opened only when both sub-strategies give out signals simultaneously. By using this "Intersection Targets" method, some noisy trades can be filtered out and the signal quality can be improved.

#### Advantages of the Strategy

1. Improved signal quality by double confirmation using dual indicators
2. Certain timing advantage with reversal trading model  
3. Judge future price movements combined with volume analysis
4. Reliable stop loss mechanism to effectively control single loss

#### Risks of the Strategy

1. Failure of reversal signals to fully filter market noise
2. Abnormal trading volume leading to invalid volume momentum judgment
3. Improper stop loss setting, causing premature stop loss or oversized stop loss
4. Lack of drawdown control mechanism, potentially shortening strategy life span

The strategy can be further optimized in the following aspects:

1. Add trend judging rules to avoid trading against trends
2. Optimize stop loss logic to realize tracking stop loss and staged stop loss
3. Add maximum drawdown limit to close strategy to avoid huge loss
4. Combine machine learning algorithms to build dynamic stop loss and position control models

In summary, this strategy is based mainly on bi-directional tracking and price reversal, plus volume momentum analysis to improve signal quality by dual confirmation. In actual application, further testing and optimization is still needed, especially to guard against the risks of stop loss and capital management, to prevent excessive drawdowns leading to wipeouts. But in general, this strategy utilizes a variety of quantitative trading techniques with clear logic, and is worth in-depth research.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|40|Length_MAVol|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/11/2020
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// Volume and SMA
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos

    
VSAVol(Length) =>
    pos = 0.0
    xSMA_vol = sma(volume, Length)
    pos := iff(volume > xSMA_vol, -1,
    	     iff(volume < xSMA_vol, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Volume SMA", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length_MAVol = input(40, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posVSAVol = VSAVol(Length_MAVol)
pos = iff(posReversal123 == 1 and posVSAVol == 1 , 1,
	   iff(posReversal123 == -1 and posVSAVol == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/442504

> Last Modified

2024-02-22 13:46:51
