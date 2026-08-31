
> Name

智能资金指数策略回测Smart-Money-Index-SMI-Strategy-Backtest

> Author

ChaoZhang

> Strategy Description


## Overview

This is a quantitative trading strategy based on the Smart Money Index (SMI). The index reflects activities of institutional funds and is used to forecast potential market trends by analyzing SMI movements. It belongs to trading strategies based on investor sentiment analysis.

## Strategy Logic

The core indicator is the Smart Money Index (SMI). Its calculation formula is:

SMI = SMA(Today's close - Today's open + Yesterday's close - Yesterday's open, N)

Where N is the parameter period. 

The SMI reflects inflows and outflows of smart money. Rising SMI indicates net inflows, meaning smart money is bullish. Falling SMI indicates net outflows, meaning smart money is bearish.

The trading strategy goes long when SMI rises and goes short when SMI falls, to follow the movements of smart money.

## Advantages

- Based on SMI, captures smart money activities
- Simple SMI calculation, easy to implement
- Reflects investor sentiment, sensitive to market changes
- Applicable across products and timeframes
- Parameter tunable for adaptability 

## Risks

- SMI itself may lag
- Prone to whipsaws relying on single indicator
- Cannot differentiate bull/bear markets, needs TA
- No effective stops, large drawdowns 
- Parameters need optimization by product and timeframe

Risks can be reduced by:

- Optimizing SMI parameter period
- Adding technical indicators for confirmation 
- Implementing stop loss/profit rules for risk control
- Parameter tuning based on product and timeframe
- Adjusting position sizing system

## Enhancement Directions

The strategy can be improved by:

1. Finding optimal SMI calculation period

2. Adding filters like MACD on SMI signals

3. Incorporating moving or fixed stops

4. Product-specific parameter optimization

5. Identifying ideal periods for different timeframes like hedge funds

6. Adjusting position sizes by market volatility

## Summary

This strategy uses the Smart Money Index to reflect market participant sentiment for trend trading. It can capture moves of institutional funds in a timely manner. However, SMI may lag and sole reliance on one indicator can be risky. Improvements can be made through parameter tuning, adding filters, implementing stops, and dynamic position sizing. This can make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|18|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 01/08/2018
// Attention:
// If you would to use this indicator on the ES, you should have intraday data 60min in your account.
//
// Smart money index (SMI) or smart money flow index is a technical analysis indicator demonstrating investors sentiment. 
// The index was invented and popularized by money manager Don Hays.[1] The indicator is based on intra-day price patterns.
// The main idea is that the majority of traders (emotional, news-driven) overreact at the beginning of the trading day 
// because of the overnight news and economic data. There is also a lot of buying on market orders and short covering at the opening. 
// Smart, experienced investors start trading closer to the end of the day having the opportunity to evaluate market performance.
// Therefore, the basic strategy is to bet against the morning price trend and bet with the evening price trend. The SMI may be calculated 
// for many markets and market indices (S&P 500, DJIA, etc.)
//
// The SMI sends no clear signal whether the market is bullish or bearish. There are also no fixed absolute or relative readings signaling 
// about the trend. Traders need to look at the SMI dynamics relative to that of the market. If, for example, SMI rises sharply when the 
// market falls, this fact would mean that smart money is buying, and the market is to revert to an uptrend soon. The opposite situation 
// is also true. A rapidly falling SMI during a bullish market means that smart money is selling and that market is to revert to a downtrend 
// soon. The SMI is, therefore, a trend-based indicator.
// Some analysts use the smart money index to claim that precious metals such as gold will continually maintain value in the future.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Smart Money Index (SMI) Backtest", shorttitle="Smart Money Index")
Length = input(18, minval=1)
reverse = input(false, title="Trade reverse")
xcloseH1 = security(syminfo.tickerid, "60", close[1])
xopenH1 =  security(syminfo.tickerid, "60", open[1])
nRes = nz(nRes[1], 1) - (open - close) + (xopenH1 - xcloseH1)
xSmaRes = sma(nRes, Length)
pos = iff(xSmaRes > nRes, 1,
       iff(xSmaRes < nRes, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xSmaRes, color=red, title="SMASMI")
plot(nRes, color=green, title="SMI")
```

> Detail

https://www.fmz.com/strategy/427518

> Last Modified

2023-09-21 21:14:02
