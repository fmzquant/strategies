
> Name

多空力量平衡策略Bull-and-Bear-Balance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c391ba63e21887730a.png)


## Overview 

The Bull and Bear Balance Strategy is an improved trend following strategy. It analyzes the balance between bullish and bearish forces based on the relationship between the current bar and previous bar, and generates trading signals when the balance is broken. The idea comes from the traditional Elder Ray indicator but with improvements to judge trends more accurately.

## Strategy Logic

The core indicator of this strategy is nBBB, which reflects the balance between bullish and bearish forces of the current bar versus the previous bar. The nBBB is calculated as:

nBBB = value2 - value

Where value and value2 calculate the bullish and bearish forces of the current bar and previous bar respectively. The calculation is quite complex, involving judgments on the relationship between close, open, high and low prices. But in general, value measures the bull/bear forces of the current bar, and value2 measures that of the previous bar. Their difference reflects the change in bull/bear balance.

When nBBB falls below the threshold SellLevel, a short signal is generated. When nBBB rises above the threshold BuyLevel, a long signal is generated. The thresholds can be adjusted through parameters.

## Advantages

The main advantages of this strategy are:

1. Based on reversal signals from candlesticks, it can identify strong trend turning points. 

2. By measuring bull/bear balance, the signals are more accurate and reliable.

3. Comparing current bar with previous bar filters out some noise for clearer signals.

4. Applicable to different timeframes with good flexibility. 

5. The nBBB indicator is intuitive and signals are simple and clear.

## Risks

Some risks to note:

1. nBBB may generate false signals, requiring price confirmation. 

2. Relying solely on nBBB has blind spots, better to incorporate other indicators.

3. SellLevel and BuyLevel parameters directly impact performance and need careful optimization.

4. Signals may lag during extreme volatility, requiring risk assessment. 

5. More suitable for mid/long-term, short-term may get whipsawed.

## Enhancements

Some ways to enhance the strategy:

1. Optimize SellLevel and BuyLevel based on historical backtests for best fit.

2. Incorporate stop loss mechanisms like trailing stop loss to control risks.

3. Add other indicators like volume, stochastic etc. to improve decision accuracy. 

4. Introduce machine learning to auto-optimize parameters and generate better signals.

5. Separate parameter optimization for different products and timeframes.

## Conclusion

The Bull and Bear Balance Strategy judges trend reversals by measuring changes in bull/bear force, making it a relatively simple and practical trend following strategy. It has certain advantages but also risks. With parameter optimization, stop losses, additional indicators etc., it can be improved further. Overall it presents an interesting quantitative approach worth deeper research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-15|SellLevel|
|v_input_2|15|BuyLevel|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 03/02/2017
//    This new indicator analyzes the balance between bullish and
//    bearish sentiment.
//    One can cay that it is an improved analogue of Elder Ray indicator.
//    To get more information please see "Bull And Bear Balance Indicator" 
//    by Vadim Gimelfarb. 
////////////////////////////////////////////////////////////
strategy(title = "Bull And Bear Balance Strategy")
SellLevel = input(-15, step=0.01)
BuyLevel = input(15, step=0.01)
reverse = input(false, title="Trade reverse")
hline(SellLevel, color=red, linestyle=line)
hline(BuyLevel, color=green, linestyle=line)
value =  iff (close < open , 
          iff (close[1] > open ,  max(close - open, high - low), high - low), 
           iff (close > open, 
             iff(close[1] > open, max(close[1] - low, high - close), max(open - low, high - close)), 
              iff(high - close > close - low, 
               iff (close[1] > open, max(close[1] - open, high - low), high - low), 
                 iff (high - close < close - low, 
                  iff(close > open, max(close - low, high - close),open - low), 
                   iff (close > open, max(close[1] - open, high - close),
                     iff(close[1] < open, max(open - low, high - close), high - low))))))

value2 = iff (close < open , 
          iff (close[1] < open ,  max(high - close[1], close - low), max(high - open, close - low)), 
           iff (close > open, 
             iff(close[1] > open,  high - low, max(open - close[1], high - low)), 
              iff(high - close > close - low, 
               iff (close[1] < open, max(high - close[1], close - low), high - open), 
                 iff (high - close < close - low, 
                  iff(close[1] > open,  high - low, max(open - close, high - low)), 
                   iff (close[1] > open, max(high - open, close - low),
                     iff(close[1] < open, max(open - close, high - low), high - low))))))
nBBB = value2 - value
nBBBc = nBBB < 0 ? red : green
pos = iff(nBBB < SellLevel, -1,
	   iff(nBBB >= BuyLevel, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nBBB, style=line, linewidth=1, color=nBBBc)
plot(nBBB, style=histogram, linewidth=1, color=gray)

```

> Detail

https://www.fmz.com/strategy/430899

> Last Modified

2023-11-02 17:12:40
