
> Name

Dual-Indicator-Mean-Reversion-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12285df40e668473675.png)

### Overview  

This strategy generates buy and sell signals by combining a moving average indicator and a market facilitation index. It belongs to the mean reversion trading strategy category.  

### Principles  

The strategy utilizes two indicators for signal generation. The first one is the moving average indicator, specifically the combination of fast line and slow line of Stochastic Oscillator. It produces sell signal when price closes down for two consecutive days and the fast line is above the slow line. It produces buy signal when price closes up for two consecutive days and the fast line is below the slow line. By monitoring price reversal and the relationship between fast line and slow line, it aims to predict potential turning points of the price trend.  

The second indicator is the market facilitation index. It measures the efficiency of price movement by calculating the relationship between price range and volume. When the index rises, it indicates improving market liquidity and higher operation efficiency, signaling a trending market. When the index declines, it shows worsening liquidity and decreasing efficiency, implying a potential sideways ranging market or trend reversal.  

This strategy generates actual buy and sell orders when both indicators issue concordant trading signals simultaneously.  

### Advantages  

- Improved signal accuracy by requiring confirmation from two indicators, avoiding false signals  
- Combination of mean reversion indicator and trend judging indicator helps avoiding trading against major trend 
- Reduced needs for frequent parameter tuning and less manual intervention 

### Risks and Solutions  

- Difficult to capitalize on reversal opportunities if prolonged one-way uptrend or downtrend, unable to enter the market
- Can relax parameters of mean reversion indicator to increase chances of capturing buy and sell signals
- Can also scale up position size to ride the trend to compensate profits

- Inaccurate reversal signals may invalidate the strategy 
- Can optimize parameters or add signal confirmation stages to filter out false signals   

### Enhancement Areas  

- Test more parameter combinations to find optimum settings  
- Explore more mean reversion indicators, evaluate performance of different indicators
- Introduce stop loss to constrain single trade loss 
- Incorporate machine learning models trained on big data to generate more accurate reversal signals  

### Summary   

This strategy combines a mean reversion indicator and a trend judging indicator, entering the market when reversal signal emerges while respecting the major trend direction. Using dual indicator confirmation effectively eliminates false signals. Although risks exist during prolonged one-side trends and erroneous reversal signals. Further optimizations can be done via parameter tuning, stop loss, indicator upgrades and machine learning models.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- MFI ----|
|v_input_7|6.2|SellZone|
|v_input_8|true|BuyZone|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 02/02/2021
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
// The Market Facilitation Index is an indicator that relates price range to 
// volume and measures the efficency of price movement. Use the indicator to 
// determine if the market is trending. If the Market Facilitation Index increased, 
// then the market is facilitating trade and is more efficient, implying that the 
// market is trending. If the Market Facilitation Index decreased, then the market 
// is becoming less efficient, which may indicate a trading range is developing that 
// may be a trend reversal.
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


MFI(BuyZone,SellZone) =>
    pos = 0.0
    xmyVol = volume
    xmyhigh = high
    xmylow = low
    nRes = (xmyhigh - xmylow) / xmyVol * 10000
    pos := iff(nRes > BuyZone, 1,
             iff(nRes < SellZone, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & Market Facilitation Index", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- MFI ----")
SellZone = input(6.2, minval=0.01, step = 0.01)
BuyZone = input(1, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMFI = MFI(BuyZone,SellZone)
pos = iff(posReversal123 == 1 and posMFI == 1 , 1,
	   iff(posReversal123 == -1 and posMFI == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/440688

> Last Modified

2024-02-01 10:55:30
