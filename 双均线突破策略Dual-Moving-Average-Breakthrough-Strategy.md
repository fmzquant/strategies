
> Name

双均线突破策略Dual-Moving-Average-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/125405cd37d78b391bd.png)


#### Overview

The dual moving average breakthrough strategy generates buy signals when the fast EMA crosses above the slow EMA, and closes out positions when the fast EMA crosses below the slow EMA. The strategy also incorporates the MACD indicator as an auxiliary judgment indicator. When the MACD histogram crosses above the 0-line, a buy signal is generated, which can match the moving average strategy to further verify the signal. In addition, the strategy also monitors whether the single-day increase reaches a certain percentage threshold. If the single-day increase exceeds the set threshold, a buy signal will also be generated.

In terms of exits, the strategy sets a stop loss level and take profit level. The stop loss is fixed at a certain percentage below the entry price to control the downside risk; the take profit is fixed at a certain percentage above the entry price to lock in profits.

In summary, the strategy combines multiple indicators with clear entry and exit rules, taking into account both trend following and short-term trading opportunities. It can be applied to market timing trading of highly volatile stocks after optimization.

#### Strategy Logic

The core indicators of the dual moving average breakthrough strategy are the fast EMA and the slow EMA. The EMA represents the exponential moving average, which is a trend-following indicator. The fast EMA usually has a shorter parameter to capture short-term trends, while the slow EMA usually has a longer parameter to determine the long-term trend direction. When the fast EMA crosses above the slow EMA, it indicates the strengthening of the short-term trend and suggests going long. When the fast EMA crosses below the slow EMA, it indicates the weakening of the short-term trend and suggests closing positions.

The default parameters for this strategy are 12 days for the fast EMA and 26 days for the slow EMA. This set of parameters is typical and the matching time frame is appropriate. The closing price of the stock is used as the price input to calculate the EMAs.

In addition, the strategy introduces the MACD indicator as an auxiliary judgment tool. The definition of the MACD indicator is the fast EMA (default 12 days) minus the slow EMA (default 26 days), followed by signal line smoothing of the MACD. When MACD crosses above the 0-line, it represents that short-term gains exceed long-term gains and gives a buy signal. This signal matches the moving average strategy and can play a role of verification and improve the reliability of trading signals.

Finally, the strategy monitors whether the single-day increase of the stock exceeds a preset threshold (default 8%). For highly volatile stocks, large single-day limit-ups are common market characteristics. Crossing this threshold also gives a signal to capture short-term trading opportunities.

For exits, the strategy presets a stop loss level and a take profit level. The stop loss is fixed at a certain percentage (default 5%) below the entry price to control losses. The take profit is fixed at a certain percentage (default 40%) above the entry price to lock in profits.

#### Advantage Analysis 

The dual moving average crossover strategy has the following advantages:

1. Flexible combination of trend following and short-term trading. The dual moving average itself is suitable for determining medium- and long-term trends. Adding MACD indicators and volume breakout judgments can take into account short-term trading opportunities.

2. Reliable trading signals that are easy to judge. The fast EMA crossing above the slow EMA forms a standard golden cross signal that is simple and intuitive to determine. Incorporating the MACD indicator can play a role of verification and improve signal quality.

3. Controllable risks through stop loss and take profit principles. Presetting a stop loss level can quickly cut losses and avoid huge drawdowns. Setting a take profit level also allows locking in partial profits.  

4. Adjustable parameters for strong adaptability. Parameters like fast EMA period, slow EMA period, and single-day increase threshold can be freely set. The strategy can be optimized for different stocks to improve adaptability.

#### Risk Analysis

The dual moving average crossover strategy also has the following risks:

1. Single indicator combinations may generate false signals. Both dual moving averages and MACD may have false signals and poor tracking effects. More types of indicators should be introduced for matching verification.

2. No consideration of major stop loss levels. In the event of black swan events, lack of a sufficiently large overall stop loss threshold may result in huge losses. This requires manual intervention for risk control.

3. Inappropriate EMA period settings may invalidate the strategy. If the parameters are not set properly, there will be multiple oscillations resulting in false signals. Parameters need to be tested and optimized according to stock characteristics.  

4. Imprecise timing in selecting entry and exit points. The strategy does not select the best entry and exit spots. More complex rules or machine learning techniques are required for optimization.

#### Optimization Directions 

The dual moving average crossover strategy can be optimized in the following aspects:

1. Increase verification indicators to improve signal quality. Other indicators like KDJ and BOLL can be tested to form a multi-indicator verification system to reduce false signals.

2. Increase machine learning models to identify optimal entry and exit points, collecting large amounts of historical data to build models that determine the best trading timing, lowering timing risks. 

3. Optimize EMA period parameters and test impacts on the strategy. Different parameter combinations can be grid searched to find the optimal set and improve stability.  

4. Add adaptive stop loss mechanisms based on market regime. Dynamically track the stop loss level. Relax stop loss range appropriately during special market conditions to improve win rate.

5. Optimize take profit levels by researching the optimal profit ratio, such as setting up dynamic take profit targets, appropriately setting trailing stops during bull markets etc.

## Conclusion

The dual moving average crossover strategy has a complete framework, reasonable indicator selections and parameter settings. It is a suitable trend following short-term trading strategy for highly volatile stocks. But there is room for optimization, including increasing judgment indicators, adding machine learning, and parameters optimization to further improve strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|fastLength|
|v_input_2|26|slowLength|
|v_input_3|100|baseLength|
|v_input_4|9|MACDLength|
|v_input_5|12|MACDfast|
|v_input_6|26|MACDslow|
|v_input_7|8|Gain %|
|v_input_8|5|Stop Loss %|
|v_input_9|40|Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-28 00:00:00
end: 2023-12-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Volatile Stocks", overlay=true)

//Trading Strategy for Highly Volitile Stocks//
// by @ShanghaiCrypto //

////EMA////
fastLength = input(12)
slowLength = input(26)
baseLength = input(100)
price = close

emafast = ema(price, fastLength)
emaslow = ema(price, slowLength)
emabase = ema(price, baseLength)

///MACD////
MACDLength = input(9)
MACDfast = input(12)
MACDslow = input(26)
MACD = ema(close, MACDfast) - ema(close, MACDslow)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

////PUMP////
OneCandleIncrease = input(8, title='Gain %')
pump = OneCandleIncrease/100

////Profit Capture and Stop Loss//////
stop = input(5.0, title='Stop Loss %', type=float)/100
profit = input(40.0, title='Profit %', type=float)/100
stop_level = strategy.position_avg_price * (1 - stop)
take_level = strategy.position_avg_price * (1 + profit)

////Entries/////
if crossover(emafast, emaslow)
    strategy.entry("Cross", strategy.long, comment="BUY")

if (crossover(delta, 0))
    strategy.entry("MACD", strategy.long, comment="BUY")
    
if close > (open + open*pump)
    strategy.entry("Pump", strategy.long, comment="BUY")

/////Exits/////
strategy.exit("SELL","Cross", stop=stop_level, limit=take_level)
strategy.exit("SELL","MACD", stop=stop_level, limit=take_level)
strategy.exit("SELL","Pump", stop=stop_level, limit=take_level)

////Plots////
plot(emafast, color=green)
plot(emaslow, color=red)
plot(emabase, color=yellow)
plot(take_level, color=blue)
plot(stop_level, color=orange)
```

> Detail

https://www.fmz.com/strategy/434293

> Last Modified

2023-12-05 10:46:05
