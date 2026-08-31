
> Name

TTM-Falcon-Oscillator-Reversal-Strategy-Based-on-Price-Reversion

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/199c24b66a7a5b726af.png)

## Overview  

The strategy is named "TTM Falcon Oscillator Reversal Strategy Based on Price Reversion". It is an oscillator indicator that searches for trading signals based on price reversal signals.   

The main idea of the strategy is to judge trend reversals by using price patterns. When the price forms three new highs or lows K-line bars, it is judged as a price reversal signal to take corresponding long or short positions.

## Strategy Logic  

The strategy judges price reversals by observing the closing price changes of K-line bars. The specific logic is:

1. When the closing price of the first K-line bar is lower than the second one, the signal is recorded as 1; when higher, the signal is recorded as 0.

2. If the previous signal was 1 (representing a price decline), and the closing price of either the second or the third K-line bar is lower than the first one, it is judged as a price reversal signal and a sell signal is issued.  

3. If the previous signal was 0 (representing a price rise), and the closing price of either the second or the third K-line bar is higher than the first one, it is judged as a price reversal signal and a buy signal is issued.

Through this method, the strategy can quickly judge price reversals and enter positions in time around reversal points. 

## Advantage Analysis   

The main advantages of this strategy are:

1. Fast reaction. By only comparing the size relationship among three K-line bars to judge price reversals, it can quickly determine market reversal points and enter positions in time.

2. Reduced trading frequency. Compared with other oscillator strategies, this strategy only issues signals when prices clearly reverse, which can effectively reduce unnecessary trades.

3. Large optimization space for parameters. The strategy has great potential for optimization and the K-line cycle parameters can be adjusted to adapt to different market environments.  

4. Quantifiable backtesting. The strategy can be directly implemented for automated backtesting on quantitative platforms, greatly improving test efficiency.  

5. Simple and easy to understand logic. novice traders can also easily understand and grasp the core logic of the strategy.

## Risk Analysis

The strategy also has certain risks, mainly embodied in:

1. Large price fluctuation range. When the price fluctuates too violently, the reversal signals may be inaccurate, prone to chasing highs and selling lows.  

2. Difficult parameter optimization. The choice of K-line cycle parameters has a great influence on the strategy's performance, requiring a lot of optimization to find the optimal parameter combination.

3. Excessively frequent trading. In some market environments, reversal signals may be too frequent, resulting in too many trades.  

4. Unpredictable reversal duration. The strategy cannot determine how long the new trend after price reversal will last, with the risk of inability to hold the trend.

The corresponding solutions are: appropriately adjust parameters to reduce price fluctuation ranges, fully optimize and test under various market environments, and set stop loss to control single loss.

## Optimization Directions

The main directions for optimizing this strategy include:  

1. K-line cycle optimization.  Appropriately adjust the time cycle parameters of K-line to find the optimal parameter combination.

2. Add filtering conditions. Add other auxiliary conditions before issuing signals to avoid erroneous signals. 

3. Add stop loss mechanism. Set reasonable stop loss points to control single losses.

4. Combine other indicators. Integrate signals of moving average, volatility and other indicators to improve decision accuracy.

5. Adaptive parameter optimization. Allow parameters to dynamically adjust based on market environment changes to make the strategy more robust.

Through these optimizations, the stability, win rate and profitability of the strategy can be greatly improved.  

## Conclusion  

In summary, the idea of this strategy to determine reversal points by price patterns is very simple and straightforward, with clear and easy to understand logic, and relatively large space for parameter optimization that can be adjusted according to personal preferences. But there are also certain risks that the signals may be too frequent and the holding period control improper. Through rigorous backtesting and robust parameter optimization, this strategy can become one of the efficient and profitable oscillator trading strategies.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-28 00:00:00
end: 2023-12-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v2.0 10/01/2018
// TTM scalper indicator of John Carter’s Scalper Buys and Sells. The methodology 
// is a close approximation of the one described in his book Mastering the Trade. 
// The book is highly recommended. Note the squares are not real-time but will 
// show up once the third bar has confirmed a reversal. 
//
//You can change long to short in the Input Settings
//WARNING:
//- For purpose educate only
//- This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="TTM scalper indicator", overlay = true)
reverse = input(false, title="Trade reverse")
triggerSell = iff(iff(close[1] < close,1,0) and (close[2] < close[1] or close[3] <close[1]),1,0)
triggerBuy = iff(iff(close[1] > close,1,0) and (close[2] > close[1] or close[3] > close[1]),1,0)
buySellSwitch = iff(triggerSell, 1, iff(triggerBuy, 0, nz(buySellSwitch[1])))
SBS = iff(triggerSell and buySellSwitch[1] == false, high, iff(triggerBuy and buySellSwitch[1], low, nz(SBS[1])))
clr_s = iff(triggerSell and buySellSwitch[1] == false, 1, iff(triggerBuy and buySellSwitch[1], 0, nz(clr_s[1])))
clr = iff(clr_s == 0 , red , green)
pos = iff(clr == green, 1,
       iff(clr == red, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(SBS, color=clr, title="TTM", style = circles, linewidth = 2)
```

> Detail

https://www.fmz.com/strategy/434330

> Last Modified

2023-12-05 15:07:10
