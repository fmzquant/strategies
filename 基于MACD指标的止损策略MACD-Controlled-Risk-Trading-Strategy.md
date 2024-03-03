
> Name

基于MACD指标的止损策略MACD-Controlled-Risk-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/187bfcf9b5aa84ddaa0.png)

[trans]


## 概述

本策略基于MACD指标设计了一个可以控制每笔交易风险的长线交易策略。相比传统的做多做空翻转策略,本策略更加注重每笔交易的风险控制。策略通过计算目标止损价位和止盈价位,设定合理的仓位大小,限制每笔交易可能造成的最大损失。这可以有效控制回撤,获得长期稳定收益。

## 原理

本策略首先计算MACD指标的macd线和signal线。当macd线从下向上突破signal线时,判断为买入信号。为过滤假突破,策略要求barssince(crossover(macd_line, signal_line)) <= 5,即突破发生在最近5根K线内。同时要求macd线和signal线均低于0,表明目前处于超卖状态,以及收盘价高于wma均线,表明趋势向上。满足上述条件时,进行买入开仓。 

对每笔交易,策略计算合理的止损价位和止盈价位。止损价位设定为最近3根K线的最低价。止盈价位设定为买入价格加上止损价位到买入价格距离的4倍。

关键的是,策略根据可承受的风险计算每笔交易的具体仓位。通过参数capital_risk设定每笔交易最大可承受的损失占总资金的百分比。然后根据止损幅度计算以美元计的仓位大小。再转换为合约数进行买入开仓。

每次交易风险控制在总资金的1%以内,可以有效控制回撤。同时,止盈位置较大,可以获得较高收益。

## 优势

- 风险控制先行,每笔交易风险可控
- 优化仓位大小,最大程度利用资金
- 止损策略可以有效控制回撤 
- 合理止盈,获利潜力较大

## 风险及改进

- MACD指标存在滞后,可能错过快速变化的趋势
- 止损或止盈位置设定不当,可能使收益减少或风险扩大
- 交易频率可能过高,交易成本增加

可以考虑:

- 整合其他指标判断趋势,避免MACD滞后问题
- 优化止损止盈算法,使其更具弹性
- 适当放宽交易频率,降低交易成本

## 总结

本策略基于MACD指标判断趋势方向,以控制风险为先导,计算合理仓位进行交易。关键在于风险控制和仓位优化,可以获得长期稳定收益。但MACD指标存在一定缺陷,止损止盈机制也需进一步优化。如果进一步优化指标运用、止损止盈设定以及降低交易频率,会使策略更加强大。

||


## Overview

This strategy designs a long-term trading strategy that controls the risk of each trade based on the MACD indicator. Compared with traditional long-short flipping strategies, this strategy focuses more on controlling the risk of each trade. By calculating reasonable stop loss and take profit levels and setting appropriate position sizes, it limits the maximum loss for each trade. This can effectively control drawdowns and achieve steady profits in the long run.

## Principles 

The strategy first calculates the MACD line and signal line of the MACD indicator. When the MACD line crosses above the signal line, it is determined as a buy signal. To filter out false breakouts, the strategy requires barssince(crossover(macd_line, signal_line)) <= 5, meaning the breakout happened within the most recent 5 bars. It also requires both the MACD and signal lines to be below 0, indicating an oversold condition, and the close to be above the WMA line, indicating an upwards trend. When the above conditions are met, a long position is opened.

For each trade, the strategy calculates reasonable stop loss and take profit levels. The stop loss is set to the lowest low of the most recent 3 bars. The take profit is set to the entry price plus 4 times the distance between the stop loss and entry price. 

The key is that the strategy calculates the specific position size based on the maximum affordable risk. The parameter capital_risk sets the percentage of total capital that can be lost for each trade. The position size in USD is then calculated based on the stop loss range. It is then converted to contracts for execution.

The risk of each trade is controlled within 1% of total capital, which can effectively control drawdowns. At the same time, the large profit target allows for higher returns.

## Advantages

- Risk control takes precedence, risk per trade is controllable
- Position sizing optimized to maximize capital usage  
- Stop loss strategy effectively controls drawdowns
- Reasonable take profit allows high profit potential

## Risks and Improvements

- MACD has lag, may miss fast trend changes
- Improper stop loss or take profit settings may reduce profits or increase risk 
- High trading frequency may increase transaction costs

Possible improvements:

- Incorporate other indicators to determine trend, avoid MACD lag
- Optimize stop loss and take profit algorithms to be more flexible
- Relax trading frequency to reduce transaction costs

## Summary

This strategy determines trend direction using the MACD, and takes risk control as the priority to trade with optimized position sizing. The keys are risk control and position sizing, which can achieve steady profits long-term. But MACD has some flaws, and the stop loss/take profit mechanisms need further optimization. Further optimizing indicator usage, stop loss/take profit settings, and reducing trading frequency can make the strategy even more powerful.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|% capital risk per trade|
|v_input_2|4|Take Profit in 'R'|
|v_input_3|150|WMA Bias Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy( "McDonalds ", shorttitle="Ur Lovin' It", initial_capital=10000, default_qty_type=strategy.cash, currency=currency.USD )

capital_risk    = input( 1.0, "% capital risk per trade" ) / 100
r_exit          = input( 4.0, "Take Profit in 'R'" )
wma_length      = input( 150, 'WMA Bias Length' )

[macd_line, signal_line, hist ] = macd(close, 12, 26, 9)

w_line = wma( close, wma_length )

golong = barssince(crossover(macd_line, signal_line)) <= 5 and ( macd_line < 0 and signal_line < 0 ) and ( close > w_line ) and strategy.opentrades == 0

float stop = na
float tp = na

// For a stop, use a recent low 
stop := golong ? lowest(low, 3)[1] : stop[1]
range = abs(close - stop)
tp := golong ? close + (r_exit * range) : tp[1]


// This is the bit that calculates how much size to use so we only lose 1% of the `strategy.equity`
how_much_willing_to_lose = strategy.equity * capital_risk
// Spread the risk across the stop range 
position_size_in_usd = how_much_willing_to_lose / (range / close)
// Sized specified in base contract
position_size_in_contracts = position_size_in_usd / close

// Enter the position
if golong
    strategy.entry("long", strategy.long, qty=position_size_in_contracts)
    strategy.exit("long exit","long", stop=stop, limit=tp)

// experimental exit strategy
// hist_strength = hist >= 0 ? ( hist[1] < hist ? 'strong' : 'weak') : ( hist[1] < hist ? 'weak' : 'strong' )
// if hist < 0 and hist_strength == 'strong' and falling( hist, 8 )
//     strategy.close("long")


plot( strategy.equity,  color=strategy.equity > 10000 ? color.green : color.red, linewidth=2 )
```

> Detail

https://www.fmz.com/strategy/430254

> Last Modified

2023-10-26 15:51:34
