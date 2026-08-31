
> Name

Bi-directional-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ffdf232038d0ba4df8.png)



## Overview

The bi-directional reversal strategy is a simple Bitcoin trading strategy that sets stop-loss buy orders based on the previous day's trading range. The core idea of this strategy is that if the opening price on the current day is higher than the previous day's closing price, set a stop-loss buy near the high; if the opening price is lower than the previous day's closing price, set a stop-loss buy near the low. 

## Strategy Logic

The strategy first calculates the trading range of the previous day, which is the highest price minus the lowest price. After the opening of the current day, it judges whether the price is higher or lower than the previous day's closing price. If higher, the stop-loss buy price is set to the opening price plus 0.6 times the previous day's range. If lower, the stop-loss buy price is set to the opening price plus 1.8 times the previous day's range. The strategy will open a long position when the stop loss is triggered, and close the position before the end of the current day. 

Specifically, the strategy contains two entry rules:

1. If the opening price of the current day is higher than the previous day's closing price (longCond1 satisfied), and within the backtest time window (window() satisfied), set a stop-loss buy at the opening price plus 0.6 times the previous day's range (strategy.long1).

2. If the opening price of the current day is lower than the previous day's closing price (longCond2 satisfied), and within the backtest window, set a stop-loss buy at the opening price plus 1.8 times the previous day's range (strategy.long2).

The strategy will open a long position when either of the above stop losses is triggered, and close the position before the end of the day using strategy.close_all().

## Advantage Analysis 

The bi-directional reversal strategy has the following advantages:

1. Captures reversal movements without directional bias. The strategy considers both upside and downside, capturing reversal breakouts in either direction.

2. Controllable risk with stop loss. The predetermined stop loss effectively limits the maximum loss per trade. 

3. Avoids overnight risk by closing all positions daily. Closing out before the end of each day eliminates the risk of huge overnight price swings.

4. Higher trading frequency for short-term trading. Holding positions for only one day ensures a high frequency of trades.

5. Simple and clear logic, easy to understand and implement.

## Risk Analysis

However, there are also some risks to note for the strategy:

1. Improper stop loss distance may result in stop loss being hit. If the stop loss is too tight, it could get stopped out prematurely in extreme market conditions.

2. High trading frequency may incur significant transaction costs. The daily opening and closing of positions can accumulate considerable commission fees.

3. Prone to being stopped out in choppy ranging markets. Stop losses tend to be triggered more frequently in whipsaw conditions.

4. Unable to ride trending moves. The strategy is more suited for reversals, unable to capture profits from trend continuations.

## Enhancement Opportunities 

Some ways the strategy can be enhanced:

1. Optimize stop loss distance. Test different stop levels to find optimal stop loss points. Also consider dynamic stops based on market volatility.

2. Add trend filters. Check larger timeframe trends before entry to avoid counter-trend trades. 

3. Improve entry rules. Consider adding volume or momentum indicators to increase entry precision.

4. Introduce position management. Test trailing stops or trend following exits to ride profitable trends.

5. Test different products. The strategy may work better with higher volatility products.

6. Utilize machine learning techniques. Optimize parameters like stops and entries using ML algorithms.

## Conclusion

Overall, the bi-directional reversal strategy is a very simple and practical short-term strategy concept. It can effectively capture reversal opportunities in both upside and downside moves. However, risks like stop loss distance and entry rules need to be optimized to reduce risks and improve robustness. With key refinements, the strategy can become a very useful short-term trading tool.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|length|
|v_input_2|1.1|Stop Loss Percent|
|v_input_3|9|Profit Percent|
|v_input_4|true|From Month|
|v_input_5|true|From Day|
|v_input_6|2018|From Year|
|v_input_7|3|To Month|
|v_input_8|true|To Day|
|v_input_9|2029|To Year|
|v_input_10|true|End of Session Close Out?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Simple strat", shorttitle="Simple Strat", overlay=true)

// X001TK R1 strategy
//
// 
// This strategy combines the special approach in previous daily range trading
//
// This strategy goes long on stop buy order which is calculated as previous day range
// multiplied by special number.
//
// This pure strategy does not have any
// stop loss or take profit money management logic.
//
// Exit rule is simple. We close the position on market close or next day open
//
// 
// 
//
// Input
length = input(10, minval=1)
stopLossPercent=input(1.1,"Stop Loss Percent")
profitPercent=input(9,"Profit Percent")


// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 2000)
ToMonth   = input(defval = 3, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2029, title = "To Year", minval = 2017)
ses_cls = input(defval=true, title="End of Session Close Out?")


// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"


// === STRATEGY ===
// conditions
longCond1 = close>close[1]
longCond2 = close<close[1]


strategy.entry("long1", strategy.long, when=longCond1==true and window()==true, stop=close+(high - low)*0.6)
strategy.entry("long2", strategy.long, when=longCond2==true and window()==true, stop=close+(high - low)*1.8)
strategy.close_all(when=ses_cls)

// === /STRATEGY ===
```

> Detail

https://www.fmz.com/strategy/430891

> Last Modified

2023-11-02 16:47:08
