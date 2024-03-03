
> Name

RSI跨周期交易策略RSI-Cross-Cycle-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1abfb8a720274c82388.png)

[trans]

## 概述

本策略运用RSI指标的超买超卖原理,结合多周期RSI进行判断,实现跨周期操作。策略根据RSI的周期设置判断超买超卖信号,并利用RSI的移动平均线进行滤波,避免错误信号。当RSI上穿其移动平均线时产生买入信号,下穿时产生卖出信号,形成典型的均线交叉操作方式。

## 策略原理

该策略主要通过RSI指标的超买超卖判断产生交易信号。RSI指标代表相对强弱指数,它的计算公式是:RSI = 100 - (100 / (1 + RS)),其中RS等于一段时期内平均收盘涨数与平均收盘跌数的比值。RSI指数范围在0至100之间,一般认为低于30为超卖,高于70为超买。

本策略设置了一个高参数sobrecompra和一个低参数sobreventa,当RSI高于sobrecompra时判定为超买,当RSI低于sobreventa时判定为超卖。策略中sobrecompra默认值为70,sobreventa默认值为30。

为了产生买入和卖出信号,策略利用RSI指标的移动平均线进行过滤。当RSI指标上穿其移动平均线时产生买入信号Es_compra,下穿其移动平均线时产生卖出信号Es_venta。移动平均线参数periodos_media默认为14周期。

在产生买入和卖出信号后,策略开仓进行多头或空头交易。此外,策略还设置了止损和止盈,"%",以防止亏损扩大和锁定利润。

## 策略优势

1. 使用RSI指标判断超买超卖状况,避免追高杀跌。

2. 应用RSI指标的移动平均线进行滤波,避免假信号。

3. 结合RSI指标的多周期设置,实现更稳定的交易信号。

4. 设置止损止盈机制,有效控制风险。

5. 策略逻辑简单清晰,容易理解和修改。

6. 可自定义参数,适用于不同品种和周期。

## 策略风险

1. RSI指标存在滞后性,可能错过价格反转的最佳时机。

2. 移动平均线造成交易信号滞后,无法及时捕捉趋势反转。

3. 固定的超买超卖参数设置不够灵活,不同周期和品种需要调整。

4. 止损止盈设定不当可能带来亏损或漏掉利润。

5. 多头空头仓位只有1手,无法充分利用资金进行差价交易。

## 策略优化

1. 结合其他指标如MACD、KD等判断交易信号。

2. 应用自适应移动平均线追踪趋势。

3. 设置动态超买超卖参数,根据市场波动程度调整。 

4. 优化止损止盈算法,如跟踪止损等。

5. 增加仓位管理机制,根据资金规模动态调整仓位。

6. 添加趋势过滤,避免震荡市场的频繁交易。

7. 进行回测优化参数,选择最优参数组合。

## 总结

本策略以RSI指标的超买超卖为基础,运用移动平均线进行滤波产生交易信号,实现典型的跨周期交易方式。策略具有清晰的逻辑结构和参数设置,可以通过调整参数适用于不同品种和周期,是一种可靠、有效的跨周期交易策略。但RSI指标和移动平均线等工具也存在一定局限性,需要进一步优化,使策略参数更具自适应性,过滤效果更好,最大程度减少风险和提高收益。


||


## Overview

This strategy utilizes the overbought and oversold principles of the RSI indicator and combines multi-cycle RSI to generate signals, realizing cross-cycle operations. The strategy judges overbought and oversold signals according to the cycle settings of RSI, and uses the moving average of RSI for filtering to avoid wrong signals. It generates a buy signal when RSI crosses over its moving average and a sell signal when crossing below, forming a typical moving average crossover operating mode.

## Strategy Logic

The strategy mainly generates trading signals through the overbought and oversold judgments of the RSI indicator. RSI stands for Relative Strength Index, its formula is: RSI = 100 - (100 / (1 + RS)), where RS is the ratio of average closing gains over average closing losses over a period. The RSI index ranges from 0 to 100, generally regarded as oversold below 30 and overbought above 70.

The strategy sets a high parameter sobrecompra and a low parameter sobreventa. When RSI is higher than sobrecompra, it is judged as overbought. When RSI is lower than sobreventa, it is judged as oversold. The default values of sobrecompra and sobreventa in the strategy are 70 and 30 respectively.

To generate buy and sell signals, the strategy uses the moving average line of the RSI indicator for filtering. When RSI crosses over its moving average line, the buy signal Es_compra is generated. When RSI crosses below its moving average line, the sell signal Es_venta is generated. The moving average parameter periodos_media defaults to 14 periods.

After generating buy and sell signals, the strategy opens positions for long or short trading. In addition, the strategy also sets stop loss and take profit in percentage to prevent excessive losses and lock in profits.

## Advantages of the Strategy

1. Use RSI indicator to judge overbought and oversold conditions, avoiding chasing highs and selling lows.

2. Apply the moving average of RSI indicator for filtering to avoid false signals. 

3. Combine multi-cycle settings of RSI indicator to generate more stable trading signals.

4. Set stop loss and take profit mechanisms to effectively control risks.

5. The strategy logic is simple and clear, easy to understand and modify.

6. Customizable parameters, adaptable to different products and cycles.

## Risks of the Strategy

1. RSI indicator has lagging effect, may miss the best timing for price reversal.

2. Moving average causes trading signal delays, unable to capture trend reversals in time.

3. Fixed overbought and oversold parameter settings are not flexible enough, need adjustments for different cycles and products. 

4. Improper stop loss and take profit settings may lead to losses or missed profits.

5. Long and short positions are only 1 lot, unable to fully utilize funds for spread trading.

## Optimization Directions

1. Combine other indicators such as MACD, KD for trading signal judgment.

2. Apply adaptive moving average to track trends.

3. Set dynamic overbought and oversold parameters, adjust based on market volatility.

4. Optimize stop loss and take profit algorithms, such as trailing stop loss. 

5. Add position management mechanism, dynamically adjust positions based on capital size.

6. Add trend filtering to avoid frequent trading in range-bound markets.

7. Backtest to optimize parameters and select the optimal parameter combination.

## Summary

This strategy is based on the overbought and oversold principles of RSI indicator, uses moving average for filtering to generate trading signals, realizing typical cross-cycle trading. The strategy has clear logical structure and parameter settings, adaptable to different products and cycles through parameter tuning, making it a reliable and effective cross-cycle trading strategy. But limitations also exist in tools like RSI and moving average, requiring further optimizations to make strategy parameters more adaptive, filtering effects better, and risk lowered and profit increased to the maximum extent.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Nov 2020 13:30 +0000)|Start Date Filter|
|v_input_2|timestamp(1 Nov 2022 19:30 +0000)|End Date Filter|
|v_input_3|70|Sobre Compra|
|v_input_4|30|Sobre Venta|
|v_input_5|14|Periodos|
|v_input_6|14|Logintud media movil|
|v_input_7|2|SL %|
|v_input_8|5|TP %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-01 00:00:00
end: 2023-09-30 23:59:59
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © samuelkanneman

//@version=4
strategy("RSI KANNEMAN")
//////Entrada///////
i_startTime         = input(title="Start Date Filter", defval=timestamp("01 Nov 2020 13:30 +0000"), type=input.time, tooltip="Date & time to begin trading from")
i_endTime           = input(title="End Date Filter", defval=timestamp("1 Nov 2022 19:30 +0000"), type=input.time, tooltip="Date & time to stop trading")
sobrecompra= input(70, title="Sobre Compra", type=input.integer ,minval=50, maxval=100 )
sobreventa= input(30, title="Sobre Venta", type=input.integer ,minval=0, maxval=50 )
l1=hline(sobrecompra)
l2=hline(sobreventa, color=color.purple)
periodos= input(14, title="Periodos", type=input.integer ,minval=1, maxval=50 )
periodos_media= input(14, title="Logintud media movil", type=input.integer ,minval=1, maxval=200 )
var SL =0.0
var TP=0.0
StopLoss = input(2.0, title="SL %", step=0.2)
TakeProfit = input(5.0, title="TP %", step=0.2)

//////Proceso///////

mi_rsi=rsi(close,periodos)
mm_rsi=sma(mi_rsi,periodos_media)

Es_compra= crossover(mm_rsi,sobreventa)
Es_venta= crossunder(mm_rsi,sobrecompra)

comprado= strategy.position_size > 0
vendido = strategy.position_size < 0

//time to test 
dateFilter = true
//timePeriod = time >= timestamp(syminfo.timezone, 2020, 11, 1, 0, 0)


// long

if (not comprado and Es_compra and dateFilter  )
    // realizar long
    cantidad = strategy.equity/hlc3
    strategy.entry ("compra", strategy.long , cantidad)
    SL := close*(1-(StopLoss/100))
    TP := close*(1+(TakeProfit/100))
    
if close >= TP
    strategy.close ("compra" , comment="Salto TP")  

if (comprado and Es_venta  )
    strategy.close ("compra" , comment="Sobre Venta")

if close <= SL
    strategy.close ("compra" , comment="Salto SL")
    
// short

if (not vendido and Es_venta and dateFilter  )
    // realizar short
    cantidad = strategy.equity/hlc3
    strategy.entry ("venta", strategy.short , cantidad)
    SL := close*(1+(StopLoss/100))
    TP := close*(1-(TakeProfit/100))
    
if close <= TP
    strategy.close ("venta" , comment="Salto TP")  

if (vendido and Es_compra  )
    strategy.close ("venta" , comment="Sobre Compra")

if close >= SL
    strategy.close ("venta" , comment="Salto SL")

    

    
    
   ///////Salida//////
fill(l1,l2)
plot(mi_rsi)
plot(mm_rsi, color=color.yellow)

bgcolor(Es_compra ? color.blue : na , transp=0)
bgcolor(Es_venta ? color.red : na , transp=0)


// 1d 70 22 5 4 3 15    6 meses
//1h 70 20 6 4 5 7      1 mese
//15m 70 20 5 4 4 7      1 semana

```

> Detail

https://www.fmz.com/strategy/430120

> Last Modified

2023-10-25 11:20:59
