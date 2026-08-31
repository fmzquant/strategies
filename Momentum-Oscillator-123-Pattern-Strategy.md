
> Name

Momentum-Oscillator-123-Pattern-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19cd88c04434f853a9c.png)

### Overview

This strategy combines the Momentum Oscillator Index and 123 Pattern into a cumulative trading signal to improve profitability. The Momentum Oscillator tracks market volatility and adjusts RSI parameters to capture short-term trends. The 123 Pattern forms trade signals by identifying minor highs and lows of prices in the short run. The combination of both strategies allows the strategy to maintain performance across different market environments.

### Strategy Logic  

#### 123 Pattern

The 123 Pattern consists of three stages. First, the price declines for two consecutive days. Second, the price rises for the next two days. Finally, the price declines again on the third day. According to this pattern, we can determine to establish a long position when prices rise in the second stage, and a short position when prices fall back in the third stage.   

Specifically, if the closing price is higher than the previous close for two consecutive days after two days of decline, and the 9-day Stochastic Slow is below 50, it is a buy signal. If the closing price is lower than the previous close for two consecutive days after two days of increase, and the 9-day Stochastic Fast is above 50, it is a sell signal.

#### Momentum Oscillator 

The Momentum Oscillator is constructed similarly to the RSI, with the key difference being the variable periods of the momentum oscillator. The number of periods depends on recent price volatility - higher volatility leads to shorter periods, making the indicator more sensitive, while stable prices lead to longer periods to reduce false signals.

The calculation formula is: 
```
DMI = RSI(DTime)  

Where:  
DTime = 14 / 10-day SMA of standard deviation of close over past 5 days
```

It shares the same overbought/oversold thresholds as RSI:  

Overbought: DMI > 30
Oversold: DMI < 70

Buy and sell signals are generated when the DMI crosses these thresholds.  

### Advantage Analysis

1. The 123 Pattern is simple and effective. It utilizes short-term reversal patterns to enter on minor bottoms and exit on minor tops, avoiding taking positions against the trend.  

2. The Momentum Oscillator is more sensitive. Its variable period allows it to adapt to the market and timely capture turning points even during high volatility.
  
3. Both strategies help filter out false signals effectively. Checking the DMI for market context when 123 signals occur can reduce losses from trading against the trend.
   
4. Combines the strengths of both strategies. Using DMI as a filter along with the 123 Pattern greatly enhances the stability of the system.

### Risk Analysis  

1. Prone to signal whipsaws. Both DMI and 123 Pattern can generate false signals when prices are just temporarily fluctuating rather than reversing.  

2. Potentially high trading frequency. DMI's variable periods make it extremely sensitive to market noise. Parameters need proper tuning to control trade frequency.

3. 123 Pattern may miss mid-term trend opportunities. It mainly captures short-term reversals and cannot profit consistently from mid-long term trends.  

4. Need to limit max trades. Too many trades can result in heavy commission fees and slippage costs.

### Optimization Directions   

1. Optimize DMI parameters. Can test different RSI periods, threshold values to find best combination.  

2. Optimize 123 Pattern filters. Can test different Stoch parameters or other filters like MACD.

3. Add stop loss mechanisms. Appropriate stop loss sizes help limit downside on losing trades.   

4. Add position sizing rules. Fixed quantity or fixed fractional position sizing improves risk control.  

### Conclusion

This strategy combines analysis from both the Momentum Oscillator and 123 Pattern to improve trade signal performance. However, no single strategy can perfectly adapt to shifting market conditions. Investors should focus on controlling risks, constantly backtest and update parameters based on live results so that profitability can be sustained.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|RSILen|
|v_input_6|30|BuyZone|
|v_input_7|70|SellZone|
|v_input_8|30|UpLimit|
|v_input_9|5|LoLimit|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2024-01-24 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/03/2020
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
// This indicator plots Dynamic Momentum Index indicator. The Dynamic Momentum 
// Index (DMI) was developed by Tushar Chande and Stanley Kroll. The indicator 
// is covered in detail in their book The New Technical Trader.
// The DMI is identical to Welles Wilder`s Relative Strength Index except the 
// number of periods is variable rather than fixed. The variability of the time 
// periods used in the DMI is controlled by the recent volatility of prices. 
// The more volatile the prices, the more sensitive the DMI is to price changes. 
// In other words, the DMI will use more time periods during quiet markets, and 
// less during active markets. The maximum time periods the DMI can reach is 30 
// and the minimum is 3. This calculation method is similar to the Variable 
// Moving Average, also developed by Tushar Chande.
// The advantage of using a variable length time period when calculating the RSI 
// is that it overcomes the negative effects of smoothing, which often obscure short-term moves.
// The volatility index used in controlling the time periods in the DMI is based 
// on a calculation using a five period standard deviation and a ten period average 
// of the standard deviation.
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

DMI(RSILen, BuyZone,SellZone,UpLimit,LoLimit) =>
    pos = 0
    xStdDev = stdev(close, 5) 
    xSMAStdDev = sma(xStdDev, 10)
    DTime = round(14 / xSMAStdDev - 0.5)
    xDMI = iff(DTime > UpLimit, UpLimit,
             iff(DTime < LoLimit, LoLimit, DTime))
    xRSI = rsi(xDMI, RSILen)
    pos := iff(xRSI > BuyZone, 1,
             iff(xRSI < SellZone, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Dynamic Momentum Index", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
RSILen = input(14, minval=1)
BuyZone = input(30, minval=1)
SellZone = input(70, minval=1)
UpLimit = input(30, minval=1)
LoLimit = input(5, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDMI = DMI(RSILen, BuyZone,SellZone,UpLimit,LoLimit)
pos = iff(posReversal123 == 1 and posDMI == 1 , 1,
	   iff(posReversal123 == -1 and posDMI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/439977

> Last Modified

2024-01-25 14:27:29
