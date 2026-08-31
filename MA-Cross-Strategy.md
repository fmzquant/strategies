
> Name

MA-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a5f9e9bff71f86c984.png)


#### Overview
This article introduces a quantitative trading strategy based on the moving average crossover principle. The strategy determines the long/short direction by comparing the price with the moving average, and sets take profit and stop loss levels to control risk. The strategy code is written in Pine Script and integrates with the Dhan trading platform API, enabling automated trading of strategy signals.

#### Strategy Principle
The core of this strategy is the moving average. It calculates the simple moving average of the closing price over a certain period as the basis for judging the trend. When the price crosses above the moving average, it generates a long signal, and when it crosses below, it generates a short signal. The exrem function is used to filter out continuous duplicate signals and improve signal quality. The strategy sets corresponding take profit and stop loss levels based on the current position direction and the relationship between the price and the moving average, controlling the risk and return of each trade.

#### Strategy Advantages
Moving average crossover is a simple and easy-to-use trend-following method that can effectively capture medium to long-term market trends. With reasonable parameter settings, the strategy can obtain stable returns in trending markets. The setting of take profit and stop loss helps control drawdowns and improve the risk-reward ratio. The strategy code logic is clear, using function modularization, with strong readability and scalability. In addition, the strategy integrates the Dhan platform API to realize automated order execution, improving execution efficiency.

#### Strategy Risks
Moving averages are inherently lagging indicators. During market turning points, signals may be delayed, leading to missed optimal trading opportunities or false signals. Improper parameter settings will affect strategy performance and need to be optimized according to different market characteristics and timeframes. Fixed percentage take profit and stop loss may not adapt to changes in market volatility, and there is also a risk of losses due to improper parameter settings.

#### Strategy Optimization Directions
1. Multiple moving averages of different timeframes can be combined to improve signal reliability, such as double or triple moving average crossovers.
2. The setting of take profit and stop loss can be further optimized, such as dynamically adjusting based on volatility indicators like ATR, or adopting trailing stop strategies. 
3. More filtering conditions can be added, such as price breakthroughs of important support/resistance levels, changes in trading volume, etc., to improve signal quality.
4. In actual application, it is necessary to conduct proper backtesting and validation of the strategy and manage funds to control single trade risk and overall drawdown.

#### Summary
The moving average crossover strategy is a simple and practical quantitative trading strategy that can profit in trending markets through trend tracking and stop loss control. However, the strategy itself has certain limitations and needs to be optimized and improved according to market characteristics and risk preferences. In practical application, it is also necessary to pay attention to strict discipline execution and proper risk control. Strategy programming can utilize professional languages such as Pine Script and integrate trading platform APIs to realize automated strategy execution.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © syam-mohan-vs @ T7 - wwww.t7wealth.com www.t7trade.com
//This is an educational code done to describe the fundemantals of pine scritpting language and integration with Indian discount broker Dhan. This strategy is not tested or recommended for live trading. 

//@version=5
strategy("Pine & Dhan - Moving Average Crossover Strategy", overlay=true)

//Remove excess signals
exrem(condition1, condition2) =>
    temp = false
    temp := na(temp[1]) ? false : not temp[1] and condition1 ? true : temp[1] and condition2 ? false : temp[1]
    ta.change(temp) == true ? true : false

// Define MA period
ma_period = input(20, title = "MA Length")

// Define target and stop loss levels
target_percentage = input.float(title="Target Profit (%)", defval=2.0)
stop_loss_percentage = input.float(title="Stop Loss (%)", defval=1.0)

// Calculate the MA
ma = ta.sma(close, ma_period)

// Entry conditions
long_entry = close >= ma
short_entry = close < ma

// Calculate target and stop loss prices
target_price = long_entry ? strategy.position_avg_price + (close * (target_percentage / 100)) : strategy.position_avg_price - (close * (target_percentage / 100)) 
stop_loss_price = short_entry ? strategy.position_avg_price + (close * (stop_loss_percentage/ 100)) : strategy.position_avg_price - (close * (stop_loss_percentage / 100)) 

long_entry := exrem(long_entry,short_entry)
short_entry := exrem(short_entry,long_entry)

// Plot the MA
plot(ma, color=color.blue, linewidth=2, title="MA")

// Plot the entry and exit signals
plotshape(long_entry, style=shape.arrowup, color=color.green, size=size.small,location = location.belowbar)
plotshape(short_entry, style=shape.arrowdown, color=color.red, size=size.small,location = location.abovebar)

//Find absolute value of positon size to exit position properly
size = math.abs(strategy.position_size)

//Replace these four JSON strings with those generated from user Dhan account
long_msg = '{"secret":"C0B2u","alertType":"multi_leg_order","order_legs":[{"transactionType":"B","orderType":"MKT","quantity":"1","exchange":"NSE","symbol":"NIFTY1!","instrument":"FUT","productType":"I","sort_order":"1","price":"0"}]}'
long_exit_msg = '{"secret":"C0B2u","alertType":"multi_leg_order","order_legs":[{"transactionType":"S","orderType":"MKT","quantity":"1","exchange":"NSE","symbol":"NIFTY1!","instrument":"FUT","productType":"M","sort_order":"1","price":"0"}]}'
short_msg = '{"secret":"C0B2u","alertType":"multi_leg_order","order_legs":[{"transactionType":"S","orderType":"MKT","quantity":"1","exchange":"NSE","symbol":"NIFTY1!","instrument":"FUT","productType":"M","sort_order":"1","price":"0"}]}'
short_exit_msg = '{"secret":"C0B2u","alertType":"multi_leg_order","order_legs":[{"transactionType":"B","orderType":"MKT","quantity":"1","exchange":"NSE","symbol":"NIFTY1!","instrument":"FUT","productType":"M","sort_order":"1","price":"0"}]}'

// Submit orders based on signals
if(strategy.position_size == 0)
    if long_entry 
        strategy.order("Long", strategy.long,alert_message=long_msg)          

    if short_entry
        strategy.order("Short", strategy.short,alert_message=short_msg)        
    
if(strategy.position_size > 0)
    
    if(short_entry)
        strategy.order("Short", strategy.short, qty = size, alert_message=short_msg)     
    else
        strategy.exit("Long Exit", from_entry="Long", qty = size, stop=stop_loss_price, limit= target_price, alert_message=long_exit_msg)

if(strategy.position_size < 0)
    
    if(long_entry)
        strategy.order("Long", strategy.long, qty = size, alert_message=long_msg)    
    else           
        strategy.exit("Short Exit", from_entry="Short", qty = size, stop=stop_loss_price, limit= target_price, alert_message=short_exit_msg) 


```

> Detail

https://www.fmz.com/strategy/453247

> Last Modified

2024-06-03 11:25:43
