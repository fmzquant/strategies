
> Name

123-Reversal-Moving-Average-Envelope-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/204f0d864c85de36eec.png)



## Overview

The 123 Reversal Moving Average Envelope Strategy is a quantitative trading strategy that combines 123 reversal trading techniques and moving average envelope indicators. It integrates the strengths of catching market reversal opportunities using reversals and determining trend direction with moving average envelopes, achieving steady profits.

## Strategy Logic

The strategy consists of two parts:

The first part is the 123 reversal strategy. Its trading signals come from the KDJ oscillator. Specifically, if the closing price is lower than the previous close for two consecutive trading days, and the 9-day slow K line is below 50, a buy signal is generated; if the closing price is higher than the previous close for two consecutive trading days, and the 9-day fast K line is above 50, a sell signal is generated.

The second part is the moving average envelope strategy. It uses moving averages and envelope lines above and below the moving averages to determine trends. Specifically, if the closing price is higher than the upper band, a buy signal is generated; if the closing price is lower than the lower band, a sell signal is generated.

The strategy combines the above two types of trading signals. It will only open long positions when 123 reversals and moving average envelopes both give buy signals; it will only open short positions when both give sell signals. This filters out some invalid signals and reduces trading frequency while improving profitability.

## Advantage Analysis 

- Combines reversal and trend to improve profitability

    The 123 reversal strategy excels at catching reversal opportunities near key support and resistance levels. The moving average envelope strategy accurately determines trend direction. Using both improves the probability of catching reversals at high-probability price levels.
    
- Double filter reduces trading frequency

    Trades are only taken when both indicators give signals. This avoids interference from excessive invalid signals from a single indicator and thus reduces trading frequency and costs.

- Customizable parameters provide flexibility

    The adjustable parameters allow users to tailor the strategy to market conditions and personal preferences for improved adaptability.

- One-sided trading simplifies operations

    The strategy only goes long or short, without reverse positions. This simplifies the logic and reduces risks from being whipsawed.

## Risk Analysis

- Reversals struggle in persistent trends

    The strategy relies mainly on reversals for profits. During long trending periods, it may produce continuous losses.

- Parameter optimization is difficult

    The multiple adjustable parameters pose optimization challenges. Improper parameter combinations may degrade performance. 

- High turnover increases trade risks

    Frequent position changes allow locking in small profits but also increase costs and risks from overtrading.

- No drawdown limit

    The lack of a stop loss means no limit on maximum drawdown. Black swan events could cause severe losses.

## Optimization Directions

- Add stop loss
    
    Implement a moving or trailing stop loss to limit drawdowns. Stopping out early during abnormal market moves protects capital.
    
- Optimize parameters

    Backtest and forward test to find optimum parameters for higher stability. Consider dynamic optimization for improved adaptability.

- Add signal filters

    Adding filters like MACD and Bollinger Bands can validate signals and further improve quality while reducing unwanted trades.

- Reduce trade frequency

    Modestly relaxing reversal conditions and adjusting moving average settings to lower turnover can reduce costs and risks.

## Conclusion

The 123 Reversal Moving Average Envelope Strategy combines the strengths of reversal trading and trend following for steady risk-adjusted outperformance. Further optimizations can improve parameter robustness for even better results. Its effective synthesis of multiple signal types makes it suitable for trends and ranges, and worthwhile for quant traders to study and implement.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- MA Envelope ----|
|v_input_7|18|LengthMA|
|v_input_8|0.2|PercentShift|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-10-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/03/2021
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
// Moving Average Envelopes are percentage-based envelopes set above and 
// below a moving average. The moving average, which forms the base for 
// this indicator, can be a simple or exponential moving average. Each 
// envelope is then set the same percentage above or below the moving average. 
// This creates parallel bands that follow price action. With a moving average 
// as the base, Moving Average Envelopes can be used as a trend following indicator. 
// However, this indicator is not limited to just trend following. The envelopes 
// can also be used to identify overbought and oversold levels when the trend is 
// relatively flat. 
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


MAE(Length,PercentShift) =>
    pos = 0.0
    xSMA = sma(close, Length)
    xHighBand = xSMA + (xSMA * PercentShift / 100)
    xLowBand = xSMA - (xSMA * PercentShift / 100)
    pos := iff(close > xHighBand, 1,
             iff(close <xLowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Moving Average Envelopes", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- MA Envelope ----")
LengthMA = input(18, minval=1)
PercentShift = input(0.2, minval = 0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMAE = MAE(LengthMA,PercentShift)
pos = iff(posReversal123 == 1 and posMAE == 1 , 1,
	   iff(posReversal123 == -1 and posMAE == -1, -1, 0)) 
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

https://www.fmz.com/strategy/429771

> Last Modified

2023-10-20 16:05:43
