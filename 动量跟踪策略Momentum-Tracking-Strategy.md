
> Name

动量跟踪策略Momentum-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15d9fb7b7f1360e0296.png)


## Overview

This strategy utilizes the body size of candlesticks and the trend momentum indicator EMA to determine market trends and implement automated trading for buying low and selling high. Its basic idea is to chase rises in an uptrend and add long positions on dips in a downtrend.  

## Strategy Logic

1. Classify candlesticks into crumbs, small candles, and big candles based on body size.  
2. When EMA is rising, if a big red candle appears, it indicates a market correction. At this point, close long positions.   
3. When EMA is falling, if a big green candle appears, it means the market is stabilizing. At this point, add to long positions.
4. Dynamically adjust positions based on real-time monitoring of candlestick changes and EMA trends.

## Advantage Analysis 

1. The strategy idea is straightforward and easy to understand by judging market structure through simple indicators.   
2. The strategy has few parameters and is not prone to overfitting, resulting in high stability.
3. It implements the logic of buying low and selling high and delivers noticeable profits during significant market fluctuations.  
4. It takes both trends and reversals into account and can respond promptly to changes in market conditions.   

## Risks and Optimization

1. It does not consider the absolute amplitude of asset prices, which may lead to stop-loss risks. ATR can be incorporated for stop-loss.  
2. It does not consider the basis issue of cryptocurrencies and can be tested on more trading pairs.   
3. Machine learning algorithms can be introduced to assist in judging candlestick patterns.  
4. Trading volume indicators can be used to screen varieties.
5. Different time frame parameter tuning can be tested.  

## Conclusion

The overall idea of this strategy is straightforward and easy to understand, with “momentum” and “tracking” as its main features. It determines the main market direction through the simple EMABOLL indicator and uses candlestick bodies to judge local adjustments, realizing efficient trading by buying low and selling high. The strategy has high stability and performs exceptionally well in cryptocurrencies, making it worthwhile for further testing and optimization.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-23 00:00:00
end: 2023-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//Author @divonn1994

strategy(title='Trend Follower Strategy v2 [divonn1994]', shorttitle='TrendFollowStrategyV2', overlay=false, pyramiding=0, default_qty_value=100, default_qty_type=strategy.percent_of_equity, precision=7, currency=currency.USD, commission_value=0.1, commission_type=strategy.commission.percent, initial_capital=100)

//Important Constants for Classifying Candle Size----------------------------------------------------------------------------------------------------------------------------------------------

timesBigger = 2
crumbSize = 1400
crumbSize2 = 2100
bigCandleSize = 3800

//Key Alerts and Classifications of Candle Size and EMAs---------------------------------------------------------------------------------------------------------------------------------------

emaAlert = ta.ema(close, 8) > ta.ema(open, 8) ? 1 : 0 
CandleSize = close * 1 - open * 1
previousCandleSize = close[1] * 1 - open[1] * 1
greenCandle = close > open ? 1 : 0
previousGreenCandle = close[1] > open[1] ? 1 : 0

crumb = (greenCandle==1 and CandleSize<=crumbSize) or (greenCandle==0 and -CandleSize<=crumbSize) ? 1 : 0
bigCrumb = (greenCandle==1 and CandleSize<=crumbSize2 and CandleSize>crumbSize) or (greenCandle==0 and -CandleSize<=crumbSize2 and -CandleSize>crumbSize) ? 1 : 0
previousCandleIsSmallCrumb = (previousGreenCandle==1 and previousCandleSize<=crumbSize) or (previousGreenCandle==0 and -previousCandleSize<=crumbSize) ? 1 : 0
previousCandleIsBigCrumb = (previousGreenCandle==1 and previousCandleSize<=crumbSize2 and previousCandleSize>crumbSize) or (previousGreenCandle==0 and -previousCandleSize<=crumbSize2 and -previousCandleSize>crumbSize) ? 1 : 0

bigCandle = (greenCandle==1 and previousCandleIsBigCrumb==1 and CandleSize>=math.abs(timesBigger*previousCandleSize)) or (greenCandle==1 and previousCandleIsSmallCrumb==1 and CandleSize>=bigCandleSize) or (greenCandle==1 and previousCandleIsSmallCrumb==0 and previousCandleIsBigCrumb==0 and CandleSize>=math.abs(timesBigger*previousCandleSize)) ? 1 : 0

//Engine (Secret Sauce)------------------------------------------------------------------------------------------------------------------------------------------------------------------------

buy = (crumb==0 and bigCrumb==0 and greenCandle==0) or (greenCandle==1 and bigCandle==1) or (emaAlert==0) ? 0 : 1

//Strategy-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if ta.crossover(buy, 0.5)
    strategy.entry('long', strategy.long, comment='long')
if ta.crossunder(buy, 0.5)
    strategy.close('long')

//Plot Strategy Behavior-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

plot(buy, color=color.new(color.silver, 0))
plot(0.5, color=color.new(color.fuchsia, 0))
```

> Detail

https://www.fmz.com/strategy/432989

> Last Modified

2023-11-23 13:47:02
