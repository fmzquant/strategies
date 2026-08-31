
> Name

基于ROC的RSI交易策略RSI-Based-on-ROC-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1cdc7d1ae2b2fb579de.png)


## Overview

The RSI based on ROC trading strategy is a new type of trading strategy that combines the classic RSI indicator with the ROC indicator to form a new trading indicator - RSI/ROC. This strategy uses ROC to calculate RSI, which filters out some of the noise in prices and makes the RSI indicator more stable and reliable.

## Strategy Logic

The core indicator of this strategy is RSI/ROC, which calculates the RSI value based on the ROC indicator. The ROC indicator can display the difference between the current price and the price x periods ago, in points or as a percentage. While the RSI indicator reflects the ratio of rising days to falling days over a period of time, used to judge overbought and oversold conditions. 

The RSI/ROC indicator combines the two, first calculating the speed of price changes through ROC, and then calculating RSI based on the ROC results, which can better reflect the intrinsic trend of price rises and falls. When RSI/ROC is below 30 it is in oversold territory, and above 70 is in overbought territory, at which point reverse operations can be performed.

The strategy also sets buy zones and sell zones to divide the boundaries of high and low indicator values, and reverse trading is performed when reverse trading is enabled. Different color visual styles are set for the indicator values.

## Advantage Analysis

1. The ROC indicator can filter out some of the noise in the price data, making the RSI/ROC indicator more stable and reliable.

2. The combination of buy zones and sell zones makes it easier to identify overbought and oversold conditions.

3. The reverse trading function can be used for two different trading methods.

4. Visual styles of the indicators make them easy to judge and use.

5. RSI/ROC indicator parameters are customizable to suit different market environments.

## Risk Analysis

1. Like other technical indicators, this strategy may also give false signals.

2. RSI/ROC indicator may lag in response to sudden major news events because it references ROC.

3. Inappropriate buy zone and sell zone settings may miss trading opportunities or add unnecessary trades.

4. Pay attention to the risk of trend reversal in reverse trading mode.

5. Improper parameter settings can lead to excessive liquidation or re-entry.

6. Consider combining other indicators to mitigate some risks. Optimize parameter settings to suit different trading instruments.

## Optimization Directions

1. Combine moving average and other indicators to identify trend direction and avoid counter-trend trading.

2. Optimize RSI length and ROC length parameters to better suit the characteristics of specific trading instruments.

3. Adjust buy zone and sell zone parameters to capture important overbought and oversold signals.

4. Incorporate stop loss strategies to control single loss.

5. Consider using this strategy only in trending markets and suspend it during consolidations.

## Summary 

The RSI based on ROC trading strategy innovatively combines the ROC indicator and RSI indicator to form a new RSI/ROC indicator. This indicator can effectively filter out noise in price data and judge overbought and oversold conditions. With proper optimization and risk control, its reliability and applicability will be greater. This strategy retains the advantages of RSI while enhancing the trend judgment capability of ROC. It is a reliable and customizable trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|RSILength|
|v_input_2|20|ROCLength|
|v_input_3|30|BuyZone|
|v_input_4|70|SellZone|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-11-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 31/10/2017
// This is the new-age indicator which is version of RSI calculated upon 
// the Rate-of-change indicator.
// The name "Relative Strength Index" is slightly misleading as the RSI 
// does not compare the relative strength of two securities, but rather 
// the internal strength of a single security. A more appropriate name 
// might be "Internal Strength Index." Relative strength charts that compare 
// two market indices, which are often referred to as Comparative Relative Strength.
// And in its turn, the Rate-of-Change ("ROC") indicator displays the difference 
// between the current price and the price x-time periods ago. The difference can 
// be displayed in either points or as a percentage. The Momentum indicator displays 
// the same information, but expresses it as a ratio.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
///////////////////////////////////////////////////////////
strategy(title="RSI based on ROC", shorttitle="RSI/ROC")
RSILength = input(20, minval=1)
ROCLength = input(20, minval=1)
BuyZone = input(30, minval=1)
SellZone = input(70, minval=1)
reverse = input(false, title="Trade reverse")
xPrice = close
hline(SellZone, color=red, linestyle=line, title = "Upper")
hline(BuyZone, color=green, linestyle=line, title = "Lower")
nRes = rsi(roc(xPrice,ROCLength),RSILength)
pos = iff(nRes < BuyZone, -1,
	   iff(nRes > SellZone, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(nRes, color=blue, title="RSI/ROC")
```

> Detail

https://www.fmz.com/strategy/431226

> Last Modified

2023-11-06 10:52:31
