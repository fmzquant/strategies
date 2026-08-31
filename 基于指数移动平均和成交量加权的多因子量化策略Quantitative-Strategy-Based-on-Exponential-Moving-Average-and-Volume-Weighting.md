
> Name

基于指数移动平均和成交量加权的多因子量化策略Quantitative-Strategy-Based-on-Exponential-Moving-Average-and-Volume-Weighting

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/db053f4d3fca863eae.png)

## Overview

This strategy is named "Quantitative Strategy Based on Exponential Moving Average and Volume Weighting". It mainly implements quantitative trading by combining the two factors of exponential moving average and volume weighting. The strategy comprehensively considers price trends, volume information and latest price information, which can effectively capture market opportunities and has certain advantages.

## Principle  

The core indicator of this strategy is nRes, which combines the exponential moving average xMAVolPrice, the exponential moving average of volume xMAVol and the latest closing price close, and is calculated by the following formula:

```
xMAVolPrice = ema(volume * close, length)
xMAVol = ema(volume, length) 
nRes = xMAVolPrice / xMAVol
```

Where xMAVolPrice is the exponential moving average of the product of closing price and volume, reflecting the combined information of price and volume; xMAVol is merely the exponential moving average of volume; nRes is the ratio of the two exponential moving averages, reflecting the adjusted price information.

The strategy determines the direction of long and short positions by comparing the size relationship between nRes and the latest closing price:  

```
if (nRes < close[1])  
    long
if (nRes > close[1]) 
    short
```

If nRes is less than the latest closing price, it means that the volume adjusted price is lower than the latest price, which is a buy signal; if nRes is greater than the latest closing price, it means that the volume adjusted price is higher than the latest price, which is a sell signal.

In summary, the strategy compares the volume adjusted price indicator nRes with the latest closing price to determine the direction of long and short positions, which is a typical quantitative trading strategy.

## Advantage Analysis   

The main advantages of this strategy are:

1. Combining multi-factor information. The strategy considers not only price information, but also combines volume information to make full use of the multi-factor characteristics of stocks to more accurately judge market trends.

2. Reduce false signals. Volume weighting can filter out some false breakouts caused by insufficient volume. This can effectively reduce unnecessary trading and avoid being trapped.

3. Better timeliness. Compared with simple moving averages, the exponential moving averages in this strategy are more sensitive to the latest data and can quickly capture recent market changes.

4. Easy to implement. The strategy idea is simple and clear, easy to understand and implement, and meets the requirements of quantitative trading.

## Risk Analysis

Although the strategy has certain advantages, it also faces the following risks:

1. Volume information is unreliable. Volume indicators are prone to manipulation and lack stability, which may be misleading.

2. Few opportunities for long and short judgment. Compared with simple trend-following strategies, the opportunities for this strategy to make judgments are relatively small, which can easily lead to insufficient trading.

3. Difficulty in parameter selection. The choice of parameters such as the moving average day length will have a great impact on the performance of the strategy. Improper selection may greatly reduce returns.

4. Risk of violent market changes. In the fast-moving market, indicator calculation may not be able to react to the latest prices in time, resulting in missing the best trading point.

The corresponding solutions: optimize parameter settings, strictly control position size, set stop loss and take profit; combine other factor indicators for verification; appropriately adjust the position holding frequency.

## Optimization Directions  

The main directions for optimizing this strategy are:

1. More flexible open positions logic. Positions can be opened when the difference between nRes and closing price is greater than a certain threshold, not just binary classification judgment, so as to seize more opportunities.

2. Increase position management mechanisms. According to market volatility, dynamically adjust the size of each trade to effectively control risks.   

3. Combine other factors. More factors can be added, such as sentiment indicators, fundamental factors, etc., to make strategy judgments more comprehensive.

4. Adaptive parameter optimization algorithms. Algorithms can be established to automatically optimize parameters such as length, so that they can adjust adaptively according to the characteristics of different cycle markets.

5. Use machine learning models. RNN and other deep learning models can be used for multivariate feature modeling to achieve end-to-end nonlinear strategies.


## Summary  

This strategy comprehensively considers factors like price and volume, and compares the volume adjusted price indicator with the latest closing price to determine the trading direction. Compared with a single indicator, it has the advantages of richer information and reducing false signals. But it also faces risks such as volume manipulation and fewer judgment timings. In the future, aspects such as optimizing opening position logic, position management, and incorporating more factors can be improved to make the strategy more effective.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|22|length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 06/03/2017
// The related article is copyrighted material from Stocks & Commodities 2009 Oct 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Combining Exponential And Volume Weighting", overlay=true)
length = input(22, minval=1)
reverse = input(false, title="Trade reverse")
xMAVolPrice = ema(volume * close, length)
xMAVol = ema(volume, length)
nRes = xMAVolPrice / xMAVol
pos = iff(nRes < close[1], 1,
	     iff(nRes > close[1], -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1 )
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nRes, color=blue)
```

> Detail

https://www.fmz.com/strategy/439987

> Last Modified

2024-01-25 15:31:21
