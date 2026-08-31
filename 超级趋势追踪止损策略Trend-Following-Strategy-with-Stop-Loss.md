
> Name

超级趋势追踪止损策略Trend-Following-Strategy-with-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14c9ca940d556058988.png)

### Overview

This strategy identifies price trends by calculating the Supertrend indicator and establishes long or short positions when trends change. It also sets stop loss and take profit levels to control risks.

### Strategy Principles  

This strategy uses the ta.supertrend() function to compute the Supertrend indicator. The Supertrend combines average true range and average price to determine if prices are in an uptrend or a downtrend. When prices change from a downtrend to an uptrend, the strategy detects the change in direction using ta.change() and establishes a long position. When prices flip from an uptrend to a downtrend, a short position is taken.

The stop loss level stop_loss and take profit level profit are set to place stop loss orders and take profit orders after entering positions to control risks.

Specifically, the strategy is implemented through the following steps:

1. Calculate the direction of the Supertrend indicator  
2. Check if prices have changed from a downtrend to an uptrend and establish a long position if yes
3. Check if prices have switched from an uptrend to a downtrend and take a short position if yes
4. Set stop loss price and take profit price for the long position after it is established
5. Set stop loss price and take profit price for the short position after it is established

The above steps can effectively capture trend changes and take positions at appropriate moments. The stop loss and take profit settings help control risks. Overall it is a relatively stable trend following strategy.

### Advantage Analysis 

The biggest advantage of this strategy is the ability to automatically track trend changes without the need for manual judgement. The Supertrend indicator has a filtering effect on price fluctuations and can effectively identify trends, avoiding excessive position taking in ranging markets.

In addition, the predefined stop loss and take profit levels allow automatic stop loss and profit taking, effectively capping single trade losses and locking gains. This is very important for quantitative trading strategies.

Compared to simple moving average strategies, this strategy has superior capabilities in trend identification and is more suitable for trending markets.

### Risk Analysis

The biggest risk of this strategy comes from improper parameter tuning of the Supertrend indicator. If the parameters are not set appropriately, the effectiveness of the indicator in detecting trend changes will suffer. An ATR period that is too long or a factor that is too small can both retard the reaction of the Supertrend to price moves, causing missed entry opportunities.

Also, the stop loss and take profit levels significantly impact strategy performance. A stop loss that is too tight would easily get stopped out prematurely. A take profit that is too wide may miss ideal exit points. Extensive optimization is needed to find the optimal parameter values for different market conditions and trading instruments.

Finally, like all trend following strategies, sudden trend reversals and whipsaws can still cause losses that need to be controlled through proper money management.

### Enhancement Opportunities

The following aspects of the strategy can be enhanced:

1. Optimize the parameters of the Supertrend indicator, including the ATR period and factor through backtesting.  

2. Incorporate position sizing rules based on performance metrics like return and drawdowns.  

3. Augment with machine learning models to assist in trend identification.

4. Add filters based on other indicators like moving averages and volatility measures to avoid false signals.

5. Dynamically optimize stop loss and take profit levels based on market volatility and position sizes.

The above enhancements can improve profitability, stability and risk management of the strategy. 

### Conclusion

Overall, this is a very practical trend following strategy. It automatically tracks trend changes and uses stop loss and take profit to control risks. Compared to simple moving average strategies, it has superior trend identification capability and is more suitable for trending markets. With some parameter optimization and machine learning augmentation, this strategy can achieve even better stability and profits. It deserves further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|300|Stop Loss Amount|
|v_input_2|800|Profit Amount|
|v_input_3|10|ATR Length|
|v_input_float_1|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-01-11 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend Strategy", overlay=true, default_qty_type=strategy.percent_of_equity)

// Stop loss and profit amount
stop_loss = input(300, title="Stop Loss Amount")
profit = input (800, title="Profit Amount")

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[_, direction] = ta.supertrend(factor, atrPeriod)

long_condition = ta.change(direction) <0
short_condition = ta.change(direction) >0
long_condition_1= (long_condition)?1:0
short_condition_2 = (short_condition)?1:0

stop_price_long = ta.valuewhen(long_condition, low[0]-stop_loss,0)
profit_price_long = ta.valuewhen(long_condition, high[0]+profit,0)
stop_price_short = ta.valuewhen(short_condition, high[0]+stop_loss,0)
profit_price_short = ta.valuewhen(short_condition, low[0]-profit,0)

if (long_condition)
    strategy.entry("Michael3 Long Entry Id", strategy.long)

if (short_condition)
    strategy.entry("Michael3 Short Entry Id", strategy.short)


if (strategy.position_size>0)
    strategy.exit("exit_long",from_entry="Michael3 Long Entry Id",limit=profit_price_long,stop=stop_price_long)

if (strategy.position_size<0)
    strategy.exit("exit_short",from_entry="Michael3 Short Entry Id",limit=profit_price_short,stop=stop_price_short)    
    


//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/438506

> Last Modified

2024-01-12 14:55:40
