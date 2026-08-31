
> Name

超越移动止损盈利策略Supertrend-Moving-Stop-Loss-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c72e6112de0438872.png)

## Overview
The Supertrend Moving Stop Loss Take Profit strategy is a quantitative trading strategy based on the Supertrend indicator. The strategy constructs long and short entry and exit conditions to implement stop loss and moving take profit. The advantage of the strategy is that it can achieve higher profits in sustained trends, while locking in most of the profits through moving take profit. However, the strategy is also sensitive to breakout failures.

## Strategy Logic
This strategy is a trend following strategy based on the Supertrend indicator. The Supertrend indicator can determine the direction of the price trend. It generates buy and sell signals when the Supertrend line crosses the 0-line. Specifically, a buy signal is generated when the Supertrend line crosses above the 0-line; a sell signal is generated when the line crosses below the 0-line. The ratio between the closing price and previous day's closing price determines the moving take profit point. ATR determines the stop loss point. Thus, a moving take profit stop loss strategy is constructed based on the Supertrend indicator to determine trend direction.  

## Advantage Analysis 
The biggest advantage of this strategy is the combination of trend identification and moving take profit. The Supertrend indicator can capture trends quite accurately through 0-line crossovers. Moving take profit allows locking in most profits while the trend persists. The stop loss setting also helps to control risks. Thus, the strategy can achieve higher profits in obvious trending markets. In addition, the simple and clear logic is also an advantage of the strategy.

## Risk Analysis
The biggest risk of this strategy is its sensitivity to breakout failures. In range-bound periods, the Supertrend indicator may generate false breakouts resulting in wrongly established positions. This can easily lead to being caught in traps. Also, the moving take profit mechanism may exit positions too early, missing subsequent moves. Finally, improper stop loss settings can also be too loose or too aggressive, heightening risks. Thus, these are areas the strategy needs to guard against.

## Optimization Directions 
The strategy can be optimized from the following aspects: 1) Reasonably determine Supertrend parameters to avoid false signals; 2) Add mechanisms to judge breakout reliability, such as volume signals; 3) Optimize the parameters of moving take profit to reduce whipsaw possibility while ensuring profitability; 4) Use volatility-based dynamic stops instead of static stops; 5) Add other indicators for ensemble strategies to improve robustness.

## Conclusion
Overall, the Supertrend Moving Stop Loss Take Profit strategy is a decent trend following strategy. It can reasonably determine trend direction and has a moving take profit mechanism. But it is also sensitive to invalid breakouts and has some risks. Further optimizing parameters, judgement rules, stop mechanisms etc. can improve the strategy and make it a stable and efficient trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1500|Stop Loss Amount|
|v_input_2|15000|Profit Amount|
|v_input_3|0.91|Long Trailing Profit Taking|
|v_input_4|1.01|Short Trailing Profit Taking|
|v_input_5|10|ATR Length|
|v_input_float_1|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("ST Michael Moving TP", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=15)

// Stop loss and profit amount
stop_loss = input(1500, title="Stop Loss Amount")
profit = input (15000, title="Profit Amount")
LongTrailProfit = input (0.91, title = "Long Trailing Profit Taking")
ShortTrailProfit = input (1.01, title = "Short Trailing Profit Taking")

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[_, direction] = ta.supertrend(factor, atrPeriod)

long_condition = ta.change(direction) <0
short_condition = ta.change(direction) >0


stop_price_long = ta.valuewhen(long_condition, low[0]-stop_loss,0)
profit_price_long = ta.valuewhen(long_condition, high[0]+profit,0)
stop_price_short = ta.valuewhen(short_condition, high[0]+stop_loss,0)
profit_price_short = ta.valuewhen(short_condition, low[0]-profit,0)

atr=ta.atr(10)

intrade_long = strategy.position_size > 0
intrade_short = strategy.position_size < 0
exitConditionLong = (close < (close[1]*LongTrailProfit)) 
exitConditionShort = (close > (close[1]*ShortTrailProfit))

if (long_condition)
    strategy.entry("Long3", strategy.long)
if (intrade_long and exitConditionLong)
    strategy.close("Long3")

if (short_condition)
    strategy.entry("Short3", strategy.short)
if (intrade_short and exitConditionShort)
    strategy.close ("Short3")

if (strategy.position_size>0)
    strategy.exit("exit_long",from_entry="Long3",limit=profit_price_long,stop=stop_price_long)

if (strategy.position_size<0)
    strategy.exit("exit_short",from_entry="Short3",limit=profit_price_short,stop=stop_price_short)    
```

> Detail

https://www.fmz.com/strategy/438054

> Last Modified

2024-01-08 16:24:03
