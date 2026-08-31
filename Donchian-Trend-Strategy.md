
> Name

Donchian-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/150399dd281e20a0def.png)


### Overview

The Donchian Trend strategy is a trend-following approach that uses the Donchian Channels indicator to identify potential entry and exit points in the market. The key parameter of this strategy is the length of the Donchian Channels, which determines the lookback period for calculating the high and low prices.

To further refine the trading signals, the strategy incorporates two moving averages – a fast MA (5-period) and a slow MA (45-period). Buy signals are generated when the fast MA crosses above the slow MA, and sell signals are generated when the fast MA crosses below the slow MA.

### Strategy Logic  

The core indicator of this strategy is the Donchian Channels. The Donchian Channels are plotted by taking the highest high and lowest low over a specified period, with the upper and lower channel lines connecting those highs and lows respectively. The width of the channels represents the volatility of the market.

The strategy utilizes the Donchian Channels to determine the trend direction. Specifically, prices above the upper channel indicate an uptrend, and the strategy will consider establishing long positions next time when prices approach the upper channel. Conversely, prices below the lower channel represent a downtrend, and the strategy will consider building short positions when prices approach the lower channel next time.

To filter false breakouts, the strategy combines fast moving average (5-period) and slow moving average (45-period) to generate trading signals. Buy signals are generated when the fast MA crosses above the slow MA. Sell signals are generated when the fast MA crosses below the slow MA.  

Stop loss exits are set based on prices approaching the Donchian Channels again after entry.

### Advantage Analysis 

A significant advantage of this strategy is that it only enters the market after a trend is firmly established, thus effectively reducing losses caused by wrongly buying into false breakouts. The Donchian Channels themselves already have very strong trend identification capabilities, and when combined with the dual moving averages for filtration, the reliability is higher.

In addition, the adjustability of the Donchian Channel parameters also provides flexibility to this strategy. The longer the channel length, the longer the reference historical data time, the more conservative the trend judgment, and the higher the probability of avoiding false breakouts, but some short-term opportunities may be missed. We can choose the channel parameters based on market conditions and personal preferences.

The maximum drawdown of this strategy is also well controlled. Thanks to its trend following properties, it can also effectively control losses during major market fluctuations.

### Risk Analysis  

The main risk of this strategy is the misjudgment of trend, thus establishing long or short positions at the wrong time. This may occur when prices have concealed a larger reversal or decline. We can reduce such situations by appropriately adjusting the moving average parameters.

Another potential risk is over-trading in range-bound markets. This will increase the number of trades and commission expenses. We can address this by increasing the stop loss margin or appropriately extending the holding period. 


### Optimization Directions

This strategy has great optimization space, mainly focused on the following aspects:

1. Donchian Channel length. We can test different parameter values to find the optimal parameters.

2. Moving average periods. We can try more combinations to find a matching set of fast and slow moving averages.  

3. Stop loss method. We can try absolute point or ATR stops.

4. Entry filters. We can add indicators like RSI, MACD etc. for filtration in addition to the basic trading signals.


### Summary  

In summary, the Donchian Trend strategy utilizes the Donchian Channels to determine the trend direction, supplemented by dual moving averages for entry, making it a steady trend following strategy. It only enters the market after the trend is clearly formed, effectively controlling losses. At the same time, the strategy has large optimization space on parameters, which can be adjusted based on market conditions. If risks are effectively controlled, this strategy has the potential to achieve steady long-term returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|42|length|
|v_input_int_2|45|emalength|
|v_input_int_3|5|emalength1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="DON-SS-TREND", overlay=true,default_qty_type = strategy.percent_of_equity,default_qty_value=100,initial_capital=1000,pyramiding=0,commission_value=0.01)//@version=5
length = input.int(42, minval=1)

lower = ta.lowest(length)
upper = ta.highest(length)
basis = math.avg(upper, lower)

updiff = upper - close
downdiff = lower - close

dontrend = updiff + downdiff   
emalength = input.int(45, minval=1)
emax = ta.ema(-dontrend,emalength)
plot(-dontrend, "DON-SS", color=color.blue,style = plot.style_histogram)
plot(emax, "EMA-SS", color=color.black)
emalength1 = input.int(5, minval=1)
emax1 = ta.ema(-dontrend,emalength1)
plot(emax1, "EMA-FF", color=color.black)

/////////////////////// STRATEGY
// Check for Long Entry
longCondition = ta.crossover(emax1,emax)  
if longCondition
    strategy.entry('Long', strategy.long, comment = "BUY")

buyclose = ta.crossunder(emax1,emax)   
// Exit condition with trailing stop and take profit
strategy.close('Long', when=buyclose, comment = "BUY STOP")

// Check for Short Entry
ShortCondition = ta.crossunder(emax1,emax)
if ShortCondition
    strategy.entry('Short', strategy.short, comment = "SELL")

sellclose = ta.crossover(emax1,emax)   
// Exit condition with trailing stop and take profit
strategy.close('Short', when=sellclose, comment = "SELL STOP")

```

> Detail

https://www.fmz.com/strategy/433561

> Last Modified

2023-11-28 15:13:00
