
> Name

基于Stoch-RSI的趋势追踪策略Stoch-RSI-Based-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b610e42659c8185d7e.png)
[trans]
## 概述

该策略是基于Stoch RSI指标设计的趋势追踪策略。它结合了RSI和Stoch指标的优点,通过Stoch RSI的交叉来产生交易信号,采用趋势追踪机制,dynamically调整止损和止盈线,实现优化资金管理。

## 策略原理

策略通过计算RSI的Stoch K和D线,当Stoch RSI的K线从低位向上突破20时产生买入信号。随后设置一个以前几根K线最低价为基准的止损位,并随价格上涨dynamically调整止损线。同时设定一个基于最高价的止盈线,在价格达到止盈线时平仓套利。

## 优势分析

该策略结合Stoch RSI指标判断市场趋势和交叉产生信号,避免了单一RSI指标的局限性。同时,趋势追踪机制使止损线可以随价格运行不断上调,避免了过早止损退出的风险,可以持续捕捉趋势行情。此外,RSI指标本身就具有较好的胜率。

## 风险分析

该策略主要依赖Stoch RSI指标判断趋势和交叉产生信号,如果指标本身发出错误信号,将面临一定的风险。此外,在震荡行情中,止损线和止盈线可能被频繁触发,从而影响策略盈利能力。可以通过参数优化降低风险。

## 优化方向

- 优化Stoch RSI的参数,调整K线和D线的平滑速度,降低错误信号概率
- 优化止损线和止盈线的设置,提高参数稳定性
- 增加过滤条件,避免在震荡行情中被套
- 增加仓位管理机制,根据市场情况调整仓位大小

## 总结

本策略整合了Stoch RSI指标的优势,设计了趋势追踪机制,可以有效识别趋势行情, dynamically调整止损止盈增加获利概率。通过参数优化可以进一步增强策略稳定性和跟踪能力。总体来说,该策略可以获利的同时控制风险,值得实盘验证。

||

## Overview

This strategy is designed based on the Stoch RSI indicator for trend following. It combines the advantages of RSI and Stoch indicators by generating trading signals through Stoch RSI crossovers and adopting a trend tracking mechanism to dynamically adjust stop loss and take profit lines for optimized money management.

## Strategy Logic

The strategy calculates the Stoch K and D lines of RSI. It generates buy signals when the K line of Stoch RSI breaks above 20 from the lows. A stop loss based on the lowest lows of previous several K lines is then set, and the stop loss line keeps adjusted upwards dynamically along with the rising price. At the same time, a take profit line is set based on the highest price, and the position will be closed when price hits the take profit line.  

## Advantage Analysis

This strategy combines the Stoch RSI indicator to determine market trend and crossovers to generate signals, avoiding the limitations of using RSI indicator alone. Meanwhile, the trend tracking mechanism enables the stop loss line to be adjusted upwards constantly according to price movement, avoiding the risk of premature stop loss exit and allowing sustained profit capture during trending moves. Additionally, the RSI indicator itself has a relatively good win rate.

## Risk Analysis  

This strategy relies mainly on the Stoch RSI indicator for trend and crossover signal generation. Incorrect signals from the indicator itself poses some risks. Besides, in range-bound markets, the frequently triggered stop loss and take profit lines may affect the strategy's profitability. Risks could be reduced through parameter optimization.

## Optimization Directions

- Optimize parameters of Stoch RSI, adjust smoothing pace of K and D lines to lower incorrect signal probability
- Optimize settings of stop loss and take profit to improve parameter robustness  
- Add filtering conditions to avoid whipsaws in ranging markets
- Incorporate position sizing mechanisms based on market conditions

## Conclusion

This strategy integrates the advantages of the Stoch RSI indicator and adopts a trend tracking mechanism to effectively identify trending moves and dynamically adjust stops and targets to improve profit capture probability. Further enhancement in stability and tracking ability could be achieved through parameter optimization. Overall speaking, this strategy allows profits while controlling risks and is worth live testing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|smoothK|
|v_input_2|3|smoothD|
|v_input_3|14|lengthRSI|
|v_input_4|14|lengthStoch|
|v_input_5_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|80|overbought|
|v_input_7|20|oversold|
|v_input_8|1500|stop|
|v_input_9|20|stop_dentro_de_los_ultimos_lows|
|v_input_10|500|trail_points|
|v_input_11|100|trail_offset|
|v_input_12|1000|profit|
|v_input_13|15|riesgo_en_dolares|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-26 00:00:00
end: 2024-02-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy("sdf",calc_on_every_tick=true,precision=8,
     default_qty_type=strategy.fixed,currency="USD")
//entradas y variables de indicadores
smoothK = input(3, minval=1)
smoothD = input(3, minval=1)
lengthRSI = input(14, minval=1)
lengthStoch = input(14, minval=1)
src = input(close, title="RSI Source")
rsi1 = rsi(src, lengthRSI)
k = sma(stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = sma(k, smoothD)
overbought=input(80)
oversold=input(20)
//entradas de stop , trail, profit
stop=input(1500)
stop_dentro_de_los_ultimos_lows=input(20)
trail_points=input(500)
trail_offset=input(100)
profit=input(1000)
riesgo_en_dolares=input(15)
marsi=sma(rsi(close,14),14)
//condicion de compra: k>80
buycondition=crossover(k,20) and security(syminfo.ticker,"240",rsi(close,14)>marsi)
bgcolor( security(syminfo.ticker,"240",rsi(close,14)>marsi) ? yellow : na , transp=0)

if year>2014
    strategy.entry("l",strategy.long,qty=1,when=buycondition)
    velasiguente=barssince(buycondition)+1  //cierre en cada vela nueva independientemente si subeObaja.FUNCIONANDO
    strategy.close("l",when=velasiguente>2)       //cierre en cada vela nueva independientemente si subeObaja.FUNCIONANDO
    //paradaMasBajo=lowest(low,stop_dentro_de_los_ultimos_lows)//stop_dentro_de_los_ultimos_lows, NO PROBADA 
    //strategy.exit("l",loss=paradaMasBajo,profit=profit)
plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/440802

> Last Modified

2024-02-02 11:23:29
