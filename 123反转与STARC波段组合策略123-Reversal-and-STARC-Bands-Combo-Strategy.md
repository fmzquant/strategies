
> Name

123反转与STARC波段组合策略123-Reversal-and-STARC-Bands-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b0f209daa7e4876f96.png)


### Overview  

This strategy generates more accurate trading signals by combining the 123 Reversal strategy and the STARC Bands strategy. The 123 Reversal strategy judges bottom rebound opportunities through K-line reversal patterns. The STARC Bands strategy uses price breakouts of bands to determine trend direction. Using both strategies can make trading signals more reliable while utilizing the advantages of each strategy.

### Strategy Logic

#### 123 Reversal Strategy

This strategy originated from page 183 of the book "How I Tripled My Money in The Futures Market" by Ulf Jensen. The trading idea is to take long positions when prices show downward reversals as opportunities for bottom rebounds, and take short positions when prices show upward reversals as opportunities for trend reversals. The specific rules are: 

Long signal: When the closing price is higher than the previous day's closing price for two consecutive days, and the 9-day moving average of slow K-line is below 50, go long.  

Short signal: When the closing price is lower than the previous day's closing price for two consecutive days, and the 9-day moving average of fast K-line is above 50, go short.

#### STARC Bands Strategy  

This strategy judges trend direction by plotting bands around a short-term simple moving average of the price. The upper band is constructed by adding average true range (ATR) above the moving average. The lower band is constructed by subtracting ATR from the moving average. Breaking above the upper band indicates an uptrend, while breaking below the lower band indicates a downtrend.  

STARC stands for Stoller Average Range Channels. The indicator is named after its creator, Manning Stoller.

### Advantage Analysis  

Using both 123 Reversal and STARC Bands strategies improves the accuracy of trading signals. The 123 Reversal strategy captures reversal opportunities. The STARC Bands strategy judges trend direction. The two strategies complement each other to reduce false signals and improve win rate.  

In addition, the 123 Reversal strategy helps avoid chasing new highs or lows after market breakouts. The STARC Bands strategy utilizes adaptive ATR bands to accommodate market changes.

### Risk Analysis

The biggest risk of this strategy is the inability to completely avoid losing trades and consecutive losses. Although combining the two strategies can reduce false signals, incorrect judgments may still occur under certain market conditions. Timely stop losses should be used then to control losses.  

Another risk lies in improper parameter settings that may lead to poor strategy performance. Parameters need to be tested and optimized according to different products and timeframes to fit their characteristics.  

### Optimization Directions  

There is room for further optimization of this strategy:

1. Add stop loss strategies, such as price stops or indicator stops to avoid large losing trades;  

2. Add entry conditions like price confirmation to avoid unfavorable entry prices;

3. Conduct parameter optimization to find the most suitable parameter combinations for the product and timeframe;  

4. Add dynamic exit ideas to adjust positions based on market changes.

### Summary  

This strategy combines the 123 Reversal and STARC Bands strategies, utilizing both strategies’ advantages in judging trend reversals and direction. It can effectively reduce false signals and improve trading efficiency. It also optimizes problems existing in using either strategy alone. Through continuous optimization, this strategy can become a stable and reliable quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- STARC Bands ----|
|v_input_7|5|LengthMA|
|v_input_8|15|LengthATR|
|v_input_9|1.33|K|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-03 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/07/2021
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
// A type of technical indicator that is created by plotting two bands around 
// a short-term simple moving average (SMA) of an underlying asset's price. 
// The upper band is created by adding a value of the average true range 
// (ATR) - a popular indicator used by technical traders - to the moving average. 
// The lower band is created by subtracting a value of the ATR from the SMA.
// STARC is an acronym for Stoller Average Range Channels. The indicator is 
// named after its creator, Manning Stoller.
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


STARC(LengthMA,LengthATR,K) =>
    pos = 0.0
    xMA = sma(close, LengthMA)
    xATR = atr(LengthATR)
    xSTARCBandUp = xMA + xATR * K
    xSTARCBandDn = xMA - xATR * K
    pos := iff(close > xSTARCBandUp, 1,
             iff(close < xSTARCBandDn, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & STARC Bands", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- STARC Bands ----")
LengthMA = input(5, minval=1)
LengthATR = input(15, minval=1)
K = input(1.33, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSTARC = STARC(LengthMA,LengthATR,K)
pos = iff(posReversal123 == 1 and posSTARC == 1 , 1,
	   iff(posReversal123 == -1 and posSTARC == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434165

> Last Modified

2023-12-04 13:38:30
