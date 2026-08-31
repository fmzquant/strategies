
> Name

Dual-Moving-Average-Crossover-Strategy-430897

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1705b2c15e0d05537ed.png)
这里是使用双移动均线的趋势跟随策略的详细分析文章:



### Overview

The dual moving average crossover strategy is one of the most popular trading strategies. It utilizes the crossover of a fast moving average and a slow moving average as buy and sell signals. When the fast MA crosses above the slow MA, it generates a buy signal. When the fast MA crosses below the slow MA, it generates a sell signal. This strategy belongs to the category of traditional trend following strategies.

### Strategy Logic  

This strategy uses simple moving averages of length 10 and 13. When the 10-period SMA crosses above the 13-period SMA, a buy signal is generated. When the 10-period SMA crosses below the 13-period SMA, a sell signal is generated.

If the long condition is met while currently holding a short position, the short position will be closed first before entering a long position. Similarly, if the short condition is met while currently holding a long position, the long position will be closed first before entering a short position.

In addition, this strategy incorporates stop loss logic. For long trades, the stop loss price is calculated based on the input percentage. The same applies for short trades. When price hits the stop loss level, the current position will be exited.

### Advantage Analysis

- This strategy captures trends and follows medium to long term trend movements.

- The dual MA design helps filter out false breakouts effectively. 

- The stop loss helps control loss on individual trades.

- The strategy logic is simple and easy to understand.

- MA parameters can be adjusted for optimization.

### Risk Analysis

- As a trend following strategy, it risks being caught at trend reversals.

- MA systems can lag and miss turning points.

- Improper stop loss setting may lead to unnecessary losses.

- Dual MA crossovers do not completely eliminate false signals.

- The strategy ignores fundamentals and focuses solely on technicals.

### Improvement Directions

- The MA parameters can be optimized to find the optimal periods.

- A triple MA system could improve signal accuracy. 

- The stop loss can be made adaptive to price.

- Additional filters could be added to screen signals.

- Money management can be enhanced to limit losses.

### Conclusion

The dual moving average crossover is a simple and practical trend following strategy. It can effectively capture medium to long term trends and generate steady excess returns. But it runs the risk of being whipsawed at trend reversals. The strategy can be improved via parameter optimization, better signal filtering and enhanced risk management. Overall, it is an ideal starter strategy for novice traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Stop Loss (%)|
|v_input_2|true|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © chiragchopra91
//@version=4

strategy(title='Chirag Strategy SMA', shorttitle='CHIRAGSMA', overlay=true)

longCondition = crossover(sma(close, 10), sma(close, 13))
shortCondition = crossover(sma(close, 13), sma(close, 10))

// Set stop loss level with input options
longLossPerc = input(title="Long Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=1) * 0.01
shortLossPerc = input(title="Short Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=1) * 0.01

longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)

if longCondition
    if strategy.position_size < 0
        strategy.close('Short', comment="SHORT EXIT")
    strategy.entry('Long', strategy.long, comment="BUY")

if shortCondition
    if strategy.position_size > 0
        strategy.close('Long', comment="BUY EXIT")
    strategy.entry('Short', strategy.short, comment="SHORT")

if strategy.position_size > 0
    strategy.exit('LONG SL', stop=longStopPrice, comment="LONG SL EXIT")

if strategy.position_size < 0
    strategy.exit('SHORT SL', stop=shortStopPrice, comment="SHORT SL EXIT")
    
```

> Detail

https://www.fmz.com/strategy/430897

> Last Modified

2023-11-02 17:04:55
