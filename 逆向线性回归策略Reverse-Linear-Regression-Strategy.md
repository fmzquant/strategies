
> Name

逆向线性回归策略Reverse-Linear-Regression-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d7fa9906c97a2526b5.png)


### Overview

The reverse linear regression strategy is a reversal trading strategy based on price fluctuations. It combines linear regression analysis and AVERAGE TRUE RANGE indicator, sets the conditions for consecutive rising K-lines or consecutive falling K-lines, and takes reverse operations when linear regression analysis judges price reversal.

### Strategy Principle

The strategy first calculates the slope of linear regression. When the linear regression slope is greater than or equal to 0, it indicates that the price is in an upward trend; when it is less than 0, it indicates a downward trend in prices. At the same time, combined with the comparison between the closing price and the opening price of the last K-line, it is judged whether the last K-line rose or fell. When the linear regression slope is greater than or equal to 0 and the closing price of the last K-line is lower than the opening price, a buy signal is generated; when the linear regression slope is less than 0 and the closing price of the last K-line is higher than the opening price, a sell signal is generated. 

Through the setting of the number of consecutive rising K-lines and the number of consecutive falling K-lines, the trading frequency can be controlled. When it is determined that the number of consecutive rising K-lines reaches the set number, a sell signal is generated under the condition that the linear regression slope is less than 0 to achieve reversal trading near the high point; when it is determined that the consecutive falling K-lines reach the Setting the number, when the linear regression slope is greater than or equal to 0, a buy signal is generated to achieve reversal trading near the low point.

### Advantage Analysis

The strategy combines trend trading and reversal trading, and can carry out reversal operations at critical points, thereby obtaining the advantage after price adjustment. Linear regression analysis provides a means to determine the overall trend of prices and avoid reversing short or long positions when prices are still rising or falling. The consecutive K-line condition controls the trading frequency and operates at critical reversal points.

Compared with simple reversal strategies, this strategy combines multiple technical indicators to control transaction timing more accurately, which can effectively avoid the risk of false breaks and increase profitability.

### Risk Analysis 

The main risk faced by this strategy is the failure of reversal. If it is judged that the price reversal signal, the price continues to maintain the original trend, it will cause losses. In addition, the setting of parameters of linear regression analysis and ATR indicators will also affect the strategy's income.

Stop loss can be used to control single loss. Reasonably evaluate the frequency of market fluctuations, appropriately adjust the number of consecutive K-lines, and reduce the trading frequency. Optimize the cycle parameters of linear regression and ATR parameters to make them more in line with the characteristics of different varieties.

### Optimization Direction

The strategy can be optimized in the following aspects:

1. Add other technical indicators to improve judgment accuracy. For example, MACD, Bollinger Band, etc.

2. Increase machine learning components for automatic parameter optimization and dynamic adjustment of trading rules.  

3. Incorporate risk management mechanisms such as capital management and stop loss strategies to control trading risks.

4. Portfolio optimization that combines strategies with other unrelated strategies to reduce overall drawdowns and improve stability.

5. Expand to more varieties, evaluate parameter settings for different varieties to make the strategy more versatile.


### Summary

The reverse linear regression strategy integrates multiple technical indicators and takes reverse operations when judging the timing of price reversal. It is an effective reversal trading strategy. Through parameter optimization and enhanced risk management, the strategy can further expand profit margins and has great potential for improvement. As a typical reversal strategy idea, it provides us with valuable references.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Sell after how many bars up?|
|v_input_2|true|Buy after how many bars down?|
|v_input_3|14|ATR Length|
|v_input_4|2.33|ATR Multiplier|
|v_input_5|14|Slope Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-21 00:00:00
end: 2023-12-28 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Reverse Up/Down Strategy", currency=currency.USD, initial_capital=1000, pyramiding=2, default_qty_type=strategy.percent_of_equity, default_qty_value=100,overlay=true)

//User Options
consecutiveBarsUp   = input(title="Sell after how many bars up?",   type=input.integer, minval=1, defval=1)
consecutiveBarsDown = input(title="Buy after how many bars down?",  type=input.integer, minval=1, defval=1)
atrLength           = input(title="ATR Length",                     type=input.integer, minval=1, defval=14)
atrMult             = input(title="ATR Multiplier",                 type=input.float,   minval=0.1, defval=2.33)

//ATR Channel
adjustedATR     = sma(atr(atrLength),atrLength) * atrMult
longATR         = low - adjustedATR
shortATR        = high + adjustedATR
plot(shortATR,  title="Short ATR",  color=color.red)
plot(longATR,   title="Long ATR",   color=color.lime)


// This is the true linear regression slope rather than an approximation given by numerical differentiation
src = hlc3
len = input(defval=14, minval=1, title="Slope Length")
lrc = linreg(src, len, 0)
lrc1 = linreg(src, len,1)
lrs = (lrc-lrc1)

//Check if last candle was up or down
priceOpen = open
priceClose = close
longCondition = priceOpen > priceClose
shortCondition = priceOpen < priceClose
ups = 0.0
dns = 0.0

ups := shortCondition ? nz(ups[1]) + 1 : 0
dns := longCondition ? nz(dns[1]) + 1 : 0

if (shortCondition)
    strategy.close("buy", qty_percent=100, comment="Close")
    if (ups >= consecutiveBarsUp and lrs <= 0)
    	strategy.entry("sell", strategy.short, comment="Sell")
    	

if (longCondition)
    strategy.close("sell", qty_percent=100, comment="Close")
    if (dns >= consecutiveBarsDown and lrs >= 0)
	    strategy.entry("buy", strategy.long, comment = "Buy")

```

> Detail

https://www.fmz.com/strategy/437045

> Last Modified

2023-12-29 17:15:07
