
> Name

破底回补策略Bottom-Fishing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10b6780cb1b83528b7c.png)
[trans]
## 概述

破底回补策略是一种典型的低买高卖策略。它利用RSI指标识别超卖点,在价格下跌到一定程度后发出买入信号,以较低的价格 Accumulate 代币;当价格重新上涨时,通过设定 RSI 退出阈值来实现盈利了结。该策略适用于中长线持有,可以有效过滤震荡行情中的假突破,实现持币成本的优化。

## 策略原理  

该策略主要基于 RSI 指标来识别超卖点。RSI 指标的正常范围在 0 到 100 之间。当 RSI 指标下跌到设定的入场阈值 35 以下时,发出买入信号;当 RSI 指标重新上涨到设定的退出阈值 65 以上时,发出卖出信号。这样可以在价格趋势反转的时候及时入场和退出, implementing 实现低买高卖。

另外,策略中还引入了 100 周期的简单移动平均线,与 RSI 指标形成组合条件,只有当价格下跌到移动平均线以下,同时 RSI 进入超卖区域,才会触发买入信号。这可以有效过滤部分假突破情况,减少不必要的交易。

## 策略优势

- 利用 RSI 有效识别超卖超买点,在反转点入场,可获得较优买入成本
- 结合移动平均线过滤误信号,避免追高
- 适合中长线持有,可挖掘潜在上涨趋势  

## 策略风险及解决方案

- 存在一定的延迟,可能错过快速反转的机会
    - 适当缩短 RSI 计算周期,加快指标反应
- 震荡行情中可能出现较多平仓亏损
    - 调整移动平均线周期,或取消移动平均线
    - 适当放宽 RSI 入场退出参数

## 策略优化方向  

- 测试不同币种和时间周期参数优化
- 尝试结合其他指标判断,如 MACD、布林带等
- 动态调整 RSI 参数或移动平均线参数
- 优化仓位管理策略

## 总结

破底回补策略整体来说是一个稳健实用的低买高卖策略。通过 RSI 和移动平均线的双重过滤,可以有效抑制误信号,在优化后的参数下,可以获得较低的持币成本。与此同时,适当优化指标参数,调整仓位策略,有望获得更高的资金使用效率。

||

## Overview

The bottom fishing strategy is a typical low buying and high selling strategy. It utilizes the RSI indicator to identify oversold points and issues a buy signal when the price drops to a certain extent, in order to accumulate tokens at a lower price. When the price rebounds, it realizes profits by setting the RSI exit threshold. This strategy is suitable for medium and long term holding. It can effectively filter out false breakouts in volatile markets and optimize the cost basis of holdings.  

## Strategy Logic 

This strategy mainly relies on the RSI indicator to identify oversold conditions. The normal range of the RSI indicator is from 0 to 100. When the RSI indicator falls below the set entry threshold of 35, a buy signal is issued. When the RSI indicator rises back above the set exit threshold of 65, a sell signal is issued. This allows timely entry and exit at trend reversal points to implement low buying and high selling.

In addition, a 100-period simple moving average is also introduced in the strategy to form a combined condition with the RSI indicator. Only when the price drops below the moving average while the RSI enters the oversold zone will the buy signal be triggered. This can help filter out false breakouts to some extent and reduce unnecessary trades.   

## Advantages of the Strategy

- Effectively identify oversold and overbought points with RSI for entry at reversal points, obtaining better cost basis  

- Filter out false signals by combining with moving average, avoiding buying at the peak

- Suitable for medium to long term holding, able to discover potential uptrends   

## Risks and Solutions  

- There is a certain lag, possibly missing out fast reversal opportunities 
    - Shorten RSI calculation period appropriately to speed up indicator reaction

- More break-even or losing closes may occur in ranging markets
    - Adjust moving average period or remove moving average
    - Relax RSI entry and exit parameters appropriately  

## Optimization Directions 

- Test parameters optimization on different coins and time frames

- Try combining other indicators such as MACD, Bollinger Bands etc. 

- Dynamically adjust RSI parameters or moving average parameters
  
- Optimize position sizing strategies

## Summary  

The bottom fishing strategy is an overall robust and practical low buying and high selling strategy. By double filtering with RSI and moving average, it can effectively curb false signals and obtain lower cost basis with optimized parameters. At the same time, appropriately optimizing indicator parameters and adjusting position strategies may lead to higher capital usage efficiency.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|35|RSI Entry|
|v_input_9|65|RSI Close|
|v_input_10|100|v_input_10|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=4
strategy(shorttitle='Optimized RSI Strategy',title='Optimized RSI Strategy - Buy The Dips (by Coinrule)', overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"



// RSI inputs and calculations
lengthRSI = (14)
RSI = rsi(close, lengthRSI)

RSI_entry = input(35, title = 'RSI Entry', minval=1)
RSI_exit = input(65, title = 'RSI Close', minval=1)

//Calculate Moving Averages
movingaverage_signal = sma(close, input(100))

//Entry 
strategy.entry(id="long", long = true, when = RSI< RSI_entry and close < movingaverage_signal and window())

//Exit
//RSI
strategy.close("long", when = RSI > RSI_exit and window())

plot (movingaverage_signal)

```

> Detail

https://www.fmz.com/strategy/439241

> Last Modified

2024-01-18 15:44:10
