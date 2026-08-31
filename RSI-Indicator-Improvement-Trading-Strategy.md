
> Name

RSI-Indicator-Improvement-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/110663ce1b21d01ed82.png)

## 1. Strategy Overview

This strategy improves the classic RSI indicator by setting buy and sell alert lines. When the RSI indicator breaks through the alert lines, corresponding buy or sell operations are performed. At the same time, the strategy also provides long and short position switching capability.

## 2. Strategy Details  

### 1. Strategy Name: RSI Histogram Alert Strategy

This strategy triggers buy and sell signals through the RSI indicator's Histogram.

### 2. Strategy Principle  

(1) Calculate the value of the RSI indicator: 

```
RSIMain = (rsi(xPrice, RSIPeriod) - 50) * RSIHistoModify
```

where xPrice is the price series, RSIPeriod is the parameter for calculating RSI, and RSIHistoModify is a scaling factor for the RSI value.

(2) Set the buy alert line BuyAlertLevel and the sell alert line SellAlertLevel. When the RSI indicator is above the buy alert line, it is a buy signal. When it is below the sell alert line, it is a sell signal.

(3) Plot the Histogram of the RSI indicator to visualize buy and sell signals.  

(4) Set position pos. When a signal is triggered, set pos to 1 (long) or -1 (short). Positive or reverse trading can be selected.

(5) Determine entry direction and price based on the value of pos.

### 3. Advantages of the Strategy  

(1) Improves the way the RSI indicator is used and more clearly shows buy and sell signals.

(2) Customizable parameters to adjust the RSI indicator and alert lines to suit different markets.

(3) Intuitive display of buy and sell signals Histogram. 

(4) Ability to choose positive or reverse trading.

(5) The strategy idea is simple and clear, easy to understand and modify.

### 4. Risks of the Strategy

(1) Prone to generating false signals. The RSI indicator itself tends to generate false signals.

(2) No consideration of stop loss, with the risk of huge losses.  

(3) Improper parameter settings can also lead to failure.

### 5. Directions for Strategy Optimization  

(1) Combine with other indicators to filter out false signals, e.g. considering trading volume breakouts.

(2) Set up stop loss mechanisms. 

(3) Parameter optimization to find optimum parameters.  

(4) Consider combining with machine learning to automatically find optimal parameters using algorithms.

## 3. Summary  

This strategy expresses buy and sell signals more clearly and intuitively by improving the use of the RSI indicator and setting buy and sell alert lines. It has stronger practicality compared to the original RSI indicator. But there are also certain risks. Further optimizations are needed, e.g. combining other technical indicators and stop loss to reduce risks. The strategy idea is simple, suitable for beginners in quantitative trading to learn and practice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|RSIPeriod|
|v_input_2|-10|BuyAlertLevel|
|v_input_3|10|SellAlertLevel|
|v_input_4|1.5|RSIHistoModify|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-22 00:00:00
end: 2023-12-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/12/2016
// This simple indicator modified RSI
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="RSI HistoAlert Strategy")
RSIPeriod = input(13, minval=1)
BuyAlertLevel = input(-10)
SellAlertLevel = input(10)
RSIHistoModify = input(1.5)
reverse = input(false, title="Trade reverse")
hline(0, color=purple, linestyle=line)
hline(BuyAlertLevel, color=green)
hline(SellAlertLevel, color=red)
xPrice = close
RSIMain = (rsi(xPrice, RSIPeriod) - 50) * RSIHistoModify
rsiHcolor =  iff(RSIMain >= 0 , green,
              iff(RSIMain < 0, red, black))
pos = iff(RSIMain > BuyAlertLevel, 1,
	     iff(RSIMain < SellAlertLevel, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(RSIMain, color=blue, title="RSI HistoAlert")
plot(RSIMain, color=rsiHcolor, title="Histogram", style = histogram, linewidth  = 1)
```

> Detail

https://www.fmz.com/strategy/437029

> Last Modified

2023-12-29 16:23:48
