
> Name

Relative-Strength-Index-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fbcb15d8a86fa3b308.png)


## Overview

The RSI strategy is a trading strategy that utilizes the Relative Strength Index (RSI) indicator to generate trade signals. It identifies overbought and oversold conditions in the market by observing extreme RSI values, aiming to capture price reversal opportunities. It goes long when RSI enters oversold territory and goes short when RSI reaches overbought area, expecting prices to revert back to the mean from extremes.

## Strategy Logic

The RSI strategy is based on the calculation principle of the RSI indicator. RSI measures the strength of price movements by comparing the average closing price gains and average closing price losses over a period of time. Its formula is:

RSI = 100 - (100 / (1 + RS))

Where RS = Average Closing Price Gains / Average Closing Price Losses over past n days.

According to the formula, RSI value is fixed between 0 and 100. When the security price has been rising consistently, pushing RS higher, RSI will approach 100. When price has been falling persistently, making RS smaller, RSI will go near 0.

The empirical rule followed by the RSI strategy is: when RSI goes below 30, which is considered oversold area, go long; when RSI rises above 70, deemed as overbought zone, go short. By trading back and forth between the two extremes, it aims to capture opportunities of price reverting from one extreme back to the mean. 

Specifically, the strategy sets the Length parameter to define the calculation period of RSI, and the Oversold and Overbought parameters to specify the threshold values for RSI oversold/overbought zones. It generates long/short signals by checking the current RSI value against the threshold values. The reverse parameter is also available to control the trade direction.

## Advantages

The biggest advantage of the RSI strategy is its simplicity. RSI is a very common technical indicator available in most trading platforms. The strategy directly uses RSI to determine trade signals without complex math or models, which makes it really easy to understand and use.

Another advantage is the flexibility in parameter tuning. The strategy allows customizing RSI period and overbought/oversold threshold values, which helps adapt to changing market conditions. The reverse trade setting also adds flexibility.

The RSI strategy also has a higher win rate. By tracking overbought/oversold extremes, it can effectively filter out false signals during range-bound periods and ensure entering the market with an established trend. This enables the strategy to deliver superior returns in trending markets.

## Risks

The primary risk of the RSI strategy is generating false signals. When prices experience a short-term pullback within a trend rather than a full reversal, RSI may briefly poke into the overbought/oversold area and trigger wrong signals. Following such signals and trading in the opposite direction is likely to cause stops to be hit.

Another risk is RSI divergence. Price moves may have started a new trend, but RSI remains stuck in the previous overbought/oversold zone, leading to incorrect signal generation. Blindly following RSI signals in such cases could lead to failed trades. 

Also, solely relying on RSI and ignoring price action and market context introduces biases. Mechanical RSI signals may fail in irrational market conditions. 

## Improvement Directions

The RSI strategy can be enhanced in the following aspects:

1. Add filters using other indicators like MACD, Bollinger Bands to avoid false signals.

2. Incorporate stop loss to limit losses on single trades. 

3. Adjust parameters based on market trends and regimes, such as raising overbought threshold in bull market.

4. Optimize trading time to avoid major news events, only trade when trend is obvious.

5. Consider sizing up when trend accelerates to ride the trend. 

6. Add waiting period to prevent premature RSI signal reversals.

7. Introduce money management rules like fixed trade size, position sizing etc.

## Conclusion

The RSI strategy is a typical mean-reversion strategy that tracks overbought/oversold conditions. It is simple to use, customizable and can deliver decent profits when clear overextensions exist in trending markets. But inherent systematic risks call for enhancements like filtering, stop loss, parameter tuning, money management etc. When properly executed, the RSI strategy can be an effective tool for short-term traders to harvest relatively steady gains.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Length|
|v_input_2|30|Oversold|
|v_input_3|70|Overbought|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 10/01/2017
// The RSI is a very popular indicator that follows price activity. 
// It calculates an average of the positive net changes, and an average 
// of the negative net changes in the most recent bars, and it determines 
// the ratio between these averages. The result is expressed as a number 
// between 0 and 100. Commonly it is said that if the RSI has a low value, 
// for example 30 or under, the symbol is oversold. And if the RSI has a 
// high value, 70 for example, the symbol is overbought. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Strategy RSI", shorttitle="Strategy RSI", overlay = true )
Length = input(12, minval=1)
Oversold = input(30, minval=1)
Overbought = input(70, minval=1)
reverse = input(false, title="Trade reverse")
xRSI = rsi(close, Length)
pos = iff(xRSI > Overbought, 1,
	   iff(xRSI < Oversold, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
```

> Detail

https://www.fmz.com/strategy/430871

> Last Modified

2023-11-02 15:54:24
