
> Name

牛市力量交易策略Bull-Power-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8720436b76ac76473f.png)

## Overview

The Bull Power trading strategy is a trend following strategy based on the "Bull and Bear Balance Indicator". By calculating the relationship between the current K-line and previous K-line, the strategy judges whether the current market is bullish or bearish and makes corresponding buy or sell decisions.

## Strategy Logic

The core indicator of this strategy is value. By comparing the close price, open price, highest price and lowest price of the current K-line, it determines the bullish/bearish status of the market. 

The specific formula is as below:

If Close < Open:

    If Previous Close < Current Open:  
        value = max(Highest - Previous Close, Close - Lowest)
    Else:
        value = max(Highest - Open, Close - Lowest)

If Close > Open:

    If Previous Close > Current Open:
        value = Highest - Lowest
    Else: 
        value = max(Open - Previous Close, Highest - Lowest)

If Close == Open:

    If Highest - Close > Close - Lowest:
        If Previous Close < Current Open:
            value = max(Highest - Previous Close, Close - Lowest)
        Else:
            value = Highest - Open

    If Highest - Close < Close - Lowest:
        If Previous Close > Current Open:
            value = Highest - Lowest
        Else: 
            value = max(Open - Previous Close, Highest - Lowest)
    
    Else:
        If Previous Close > Current Open:
            value = max(Highest - Open, Close - Lowest)
        Else:
            value = max(Open - Previous Close, Highest - Lowest)

The main idea is to judge the current K-line's bull/bear status by comparing price relationships. If Close < Open, it indicates bearishness. If Close > Open, it indicates bullishness.

Compare the calculated value with input parameters SellLevel and BuyLevel. If value is greater than SellLevel, the market is bearish. If value is less than BuyLevel, the market is bullish. 

Make corresponding buy or sell decisions based on the comparison result.

## Advantages

1. The strategy responds quickly and captures trend turning points in a timely manner.

2. It calculates relationship between the current K-line and previous K-line in real time to determine the market condition instead of relying on fixed indicators.

3. The strategy has few parameters which directly affect the trading logic and are easy to understand.

4. It allows flexible configuration of reverse trade logic for different market environments.

## Risks

1. The strategy is sensitive to sudden events and may generate excessive invalid trades. 

2. The value calculation is complex. It may fail in extreme cases and cause wrong signals.

3. It relies solely on a custom complex indicator, resulting in higher systemic risks.

4. No stop loss logic may lead to huge losses.

These risks can be reduced by relaxing buy/sell criteria, adding stop loss mechanisms or combining with other indicators.

## Improvement Areas

1. Incorporate other indicators to filter trade signals, e.g. MACD, KDJ etc.

2. Add liquidity indicator to avoid misaligned trading during high volatility periods.

3. Optimize SellLevel and BuyLevel parameters for different cycles and products.  

4. Add stop loss strategy to control single trade loss.

5. Use VIX to determine market volatility and adopt adaptive parameters.

## Conclusion

The Bull Power trading strategy makes real-time judgment of market bullish/bearish status based on price relationships between the current K-line and previous K-line. It captures trend changes quickly. The strategy itself is simple to understand but relies solely on a complex custom indicator. It can be optimized in various ways to make parameters adaptive to market conditions, filter false signals and control risks. In summary, this strategy suits short-term traders pursuing high response speed.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|40|SellLevel|
|v_input_2|3|BuyLevel|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2024-01-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/01/2017
//  Bull Power Indicator
//  To get more information please see "Bull And Bear Balance Indicator" 
//  by Vadim Gimelfarb. 
////////////////////////////////////////////////////////////
strategy(title = "Bull Power Strategy")
SellLevel = input(40, step=0.01)
BuyLevel = input(3, step=0.01)
reverse = input(false, title="Trade reverse")
hline(SellLevel, color=red, linestyle=line)
hline(BuyLevel, color=green, linestyle=line)
value = iff (close < open ,  
         iff (close[1] < open ,  max(high - close[1], close - low), max(high - open, close - low)),
          iff (close > open, 
           iff(close[1] > open,  high - low, max(open - close[1], high - low)), 
             iff(high - close > close - low, 
              iff (close[1] < open, max(high - close[1], close - low), high - open), 
               iff (high - close < close - low, 
                 iff(close[1] > open,  high - low, max(open - close, high - low)), 
                  iff (close[1] > open, max(high - open, close - low),
                   iff(close[1] < open, max(open - close, high - low), high - low))))))
pos = iff(value > SellLevel, -1,
	     iff(value <= BuyLevel, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))
if (possig == -1) 
    strategy.entry("Short", strategy.short)
if (possig == 1)
    strategy.entry("Long", strategy.long)
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(value, style=line, linewidth=2, color=blue)
```

> Detail

https://www.fmz.com/strategy/438467

> Last Modified

2024-01-12 12:02:49
