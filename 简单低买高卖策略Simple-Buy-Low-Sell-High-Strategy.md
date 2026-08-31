
> Name

简单低买高卖策略Simple-Buy-Low-Sell-High-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/880f681f79e2a7eb51.png)


## Overview  

The buy low sell high strategy is a very simple but effective long-term trading strategy. This strategy automatically buys cryptocurrencies after a major decline and sells when the increase reaches the set target, thereby making a profit during major market fluctuations.

## Strategy Principle

The core of this strategy is to judge whether the market has experienced a major decline by calculating the ups and downs of cryptocurrency prices over a given lookback period. When cryptocurrency prices have fallen sharply beyond the set threshold over the most recent period of time, it indicates that the market may be extremely panicky. The strategy will then automatically buy. In addition, this strategy also sets stop loss and take profit points that trigger automatic stop loss or take profit when prices reach these two points.

Specifically, this strategy uses the trailing_change function to calculate the overall ups and downs of cryptocurrency prices over a given lookback period. When the ups and downs of cryptocurrency prices within the last inp_lkb candles are lower than the negative value of the set parameter dip, it is the major decline that meets the buy condition. At this time, within the backtest time window, the strategy's buy order will be triggered.

After buying, this strategy will track price changes in real time and set two exit conditions: (1) When the price falls below (1 - stop loss percentage)% of the opening price, stop loss order will be triggered; (2) When the price rises above (1 + take profit percentage)% of the opening price, take profit order will be triggered.  

## Strength Analysis  

The biggest advantage of this buy low sell high strategy is that it is very simple and easy to execute. It does not require complex technical indicators, relying solely on the ups and downs of prices over a recent period to judge market conditions, making it very suitable for novice traders. At the same time, buying low and selling high is also an effective long-term strategy, especially in the highly volatile cryptocurrency market. Such contrarian trading strategies can yield considerable long-term returns.  

In addition, this strategy supports stop loss and take profit settings, which can effectively control the loss of individual trades and lock in some profits. This also makes the strategy suitable for live trading, even if the market experiences greater adverse fluctuations, the loss can be controlled within an affordable range.

## Risk Analysis 

The main risk of this strategy is that it is impossible to determine the timing of market reversals. If the market continues to decline without rebounding, the long positions opened may experience greater floating losses. Therefore, setting stop loss points is crucial. If stop loss points are set too wide, single losses can be devastating.  

Another risk to note is that if there is violent market fluctuation, prices may trigger stop loss or take profit in a short period of time. This could lead to additional trading costs. Especially when the market fluctuates sharply, it is not uncommon for prices to trigger multiple stop loss and take profit repeatedly in a short period of time.

To address the above risks, we can set a longer lookback period to ensure more stable and reliable buy signals that filter out some false signals in market fluctuations. In addition, a certain trading cool-off period can be introduced. Not opening new positions for a period of time after closing positions can also effectively reduce the problem of excessively high trading frequency caused by price fluctuations.  

## Optimization Directions  

There is still room for further optimization of this strategy, mainly in the following aspects:  

1. Dynamically adjust stop loss and take profit parameters. Stop loss range and take profit range can be adjusted dynamically based on market volatility. Have wider stop loss range during market panic and appropriately narrow take profit range when market goes upward.  

2. Combine multiple factors to determine entry timing. In addition to recent ups and downs, other factors such as changes in trading volume can be introduced to determine more reliable reversal signals.

3. Add re-entry mechanism. After stop loss or take profit, certain re-entry strategies can be set to buy back on new reversal opportunities.   

## Conclusion  

Overall, this buy low sell high strategy is well suited for highly volatile cryptocurrency markets. It captures market reversal opportunities and sets stop loss and take profit to control risks. This strategy is very simple, easy to understand and implement, making it ideal for novice traders. With further optimization, more stable strategy performance can be obtained. In summary, buying low and selling high is a long-term trading strategy worth recommending.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|true|Lookback Period|
|v_input_9|2|v_input_9|
|v_input_10|2|v_input_10|
|v_input_11|2|v_input_11|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-25 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=3
strategy(shorttitle='Buy the Dips',title='Buy the Dips (by Coinrule)', overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,  title = "From Month")     
fromDay   = input(defval = 10,    title = "From Day")       
fromYear  = input(defval = 2020, title = "From Year")       
thruMonth = input(defval = 1,    title = "Thru Month")     
thruDay   = input(defval = 1,    title = "Thru Day")     
thruYear  = input(defval = 2112, title = "Thru Year")       

showDate  = input(defval = true, title = "Show Date Range")

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

inp_lkb = input(1, title='Lookback Period')
 
perc_change(lkb) =>
    overall_change = ((close[0] - close[lkb]) / close[lkb]) * 100

// Call the function    
overall = perc_change(inp_lkb)

//Entry

dip= -(input(2))

strategy.entry(id="long", long = true, when = overall< dip and window()) 

//Exit
Stop_loss= ((input (2))/100)
Take_profit= ((input (2))/100)

longStopPrice  = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)

strategy.close("long", when = close < longStopPrice or close > longTakeProfit and window())

```

> Detail

https://www.fmz.com/strategy/436600

> Last Modified

2023-12-26 10:49:19
