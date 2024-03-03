
> Name

基于霍尔移动平均线与K线的交易策略Trading-Strategy-Based-on-Hull-Moving-Average-and-Candlestick

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这个策略的核心思想是比较霍尔移动平均线(Hull Moving Average,HMA)与K线的数值,来产生买入和卖出信号。当HMA高于K线时买入,当HMA低于K线时卖出。

## 原理

首先,策略通过hma()函数计算出一定周期的HMA。然后,获取上一根K线的开盘价作为比较基准。如果HMA高于上一K线的开盘价,则产生买入信号;如果HMA低于上一K线的开盘价,则产生卖出信号。

策略的入场条件是,只有当价格向相反方向突破HMA时才进入场内。也就是说,只有当价格从下方突破HMA时才买入;只有当价格从上方突破HMA时才卖出。这可以避免被震荡的市场反复触发信号。

策略的出场条件是,当价格重新回落到HMA的另一侧时止损出场。例如,买入后价格跌破HMA,则止损卖出。

总体来说,这个策略利用HMA的平滑特点,识别主要趋势方向产生信号。同时,要求价格突破来过滤假信号,可以避免被市场震荡反复套牢。

## 优势分析

1. 使用HMA而不是SMA,可以更好地识别趋势,过滤震荡。

2. 突破机制可以减少被套和反复开仓的概率。

3. 采用上一K线价格而不是当前价格判断,可以避免回溯曲线绘制。

4. 规则简单清晰,适合参数优化和机器人交易。

5. 可灵活应用在任何品种和周期,具有普适性。

## 风险及改进

1. HMA参数设置不当可能导致错失趋势或者过度敏感。可以 teste不同周期参数寻找最佳值。

2. 单一指标容易被突破重试甩出局内,可以考虑结合其他指标过滤信号。

3. 止损点靠近HMA,容易被再次突破卡死,可以适当拉远至支撑阻力位。

4. 无法判断趋势方向和力度,考虑加入趋势分类指标。

5. 固定止损点导致风险收益波动大,可以试试随动止损或者资金管理。

## 总结

这个策略整体来说较为简单实用,核心思路清晰。以HMA判断主趋势方向,以突破过滤误信号。可以避免震荡市反复开仓套牢。通过参数优化可以获得不错的效果。但是作为基于单一指标的策略,可靠性和胜率还有一定局限。建议与其他技术指标或资金管理方法配合使用,可大幅提高稳定性。总的来说,该策略为量化交易提供了一个简单有效的思路,值得深入研究和应用。

||

## Overview

The core idea of this strategy is to compare the Hull Moving Average (HMA) with candlestick values to generate buy and sell signals. It will buy when HMA is above candlestick and sell when HMA is below candlestick.

## Principles 

Firstly, the strategy calculates HMA of a certain period using hma() function. Then it gets the open price of the previous candlestick as benchmark. If HMA is higher than previous candle open price, a buy signal is generated. If HMA is lower than previous candle open price, a sell signal is generated.

The entry conditions are that the price needs to break HMA in reverse direction before entering the market. That means it will buy only when price breaks above HMA from below. It will sell only when price breaks below HMA from above. This avoids being whipsawed by oscillating markets.

The exit conditions are to stop loss when price falls back to the other side of HMA. For example, if price drops below HMA after buying, it will stop loss sell.

In summary, this strategy identifies the major trend direction using the smoothness of HMA to generate signals. Meanwhile, it requires price breakout to filter false signals and avoid being whipsawed by market noise.

## Advantage Analysis 

1. Using HMA instead of SMA can better identify trends and filter noise.

2. The breakout mechanism can reduce the probability of being trapped and opening repetitive positions.

3. Adopting previous candle price rather than current price avoids curve fitting. 

4. The rules are simple and clear, suitable for parameter optimization and robot trading.

5. Can be flexibly applied to any instrument and timeframe, with universality.

## Risks and Improvements

1. Improper HMA parameter setting may miss trends or be too sensitive. Can teste different periods to find optimal values.

2. Relying on single indicator is prone to be stopped out by breakout retries, consider combining other indicators to filter signals. 

3. Stop loss is too close to HMA, may be trapped again by subsequent breakout. Can appropriately widen stop to support/resistance. 

4. Unable to determine trend direction and strength. Consider adding trend classification indicators.

5. Fixed stop loss causes large fluctuation in risk/reward. Can try adaptive stops or money management. 

## Conclusion

This strategy is relatively simple and practical overall with a clear core idea. It identifies the major trend with HMA and filters fake signals with breakout. It avoids being whipsawed by choppy markets. Proper parameter optimization can achieve decent results. However, reliability and win rate are still limited as a single indicator strategy. It's recommended to combine with other technical indicators or money management methods to significantly improve robustness. In conclusion, this strategy provides a simple and effective approach for quantitative trading, which is worth in-depth research and application.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Hull MA Period|
|v_input_2|D|Candle Resolution|
|v_input_3_open|0|Source of Price: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-21 00:00:00
end: 2023-09-20 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SeaSide420. Any timeFrame/pair , Hull Moving Average vs Candle
//@version=4
strategy("Hull Moving Average vs Candle",shorttitle="HMA-vs-Candle",overlay=true,default_qty_type=strategy.percent_of_equity,default_qty_value=100,commission_type=strategy.commission.cash_per_order,commission_value=1.00,slippage=1)
Period=input(title="Hull MA Period",type=input.integer,defval=50,minval=1)
Resolution=input(title="Candle Resolution", type=input.resolution,defval="D")
Price=input(title="Source of Price",type=input.source,defval=open)
HMA=hma(Price,Period)
Candle=security(syminfo.tickerid,Resolution,Price,barmerge.gaps_off,barmerge.lookahead_off)
change_color=HMA>Candle?color.green:color.red
plot1=plot(Candle,color=change_color,title="Candle Line",linewidth=2,transp=50)
plot2=plot(HMA[1],color=change_color,title="Hull MA Line",linewidth=2,transp=50)
fill(plot1,plot2,color=change_color,transp=50)
strategy.close("BUY",when=Price<HMA and HMA<Candle,comment="close buy entry")
strategy.close("SELL",when=Price>HMA and HMA>Candle,comment="close sell entry")
if (Price>HMA and HMA>Candle and Price>Price[1])
    strategy.entry("BUY",strategy.long)
if (Price<HMA and HMA<Candle and Price<Price[1])
    strategy.entry("SELL",strategy.short)



//                                                                   /L'-, 
//                               ,'-.           /MM . .             /  L '-, 
//     .                    _,--dMMMM\         /MMM  `..           /       '-, 
//     :             _,--,  )MMMMMMMMM),.      `QMM   ,<>         /_      '-,' 
//     ;     ___,--. \MM(    `-'   )M//MM\       `  ,',.;      .-'* ;     .' 
//     |     \MMMMMM) \MM\       ,dM//MMM/     ___ < ,; `.      )`--'    / 
//     |      \MM()M   MMM)__   /MM(/MP'  ___, \  \ `  `. `.   /__,    ,' 
//     |       MMMM/   MMMMMM( /MMMMP'__, \     | /      `. `-,_\     / 
//     |       MM     /MMM---' `--'_ \     |-'  |/         `./ .\----.___ 
//     |      /MM'   `--' __,-  \""   |-'  |_,               `.__) . .F. )-. 
//     |     `--'       \   \    |-'  |_,     _,-/            J . . . J-'-. `-., 
//     |         __  \`. |   |   |         \    / _           |. . . . \   `-.  F 
//     |   ___  /  \  | `|   '      __  \   |  /-'            F . . . . \     '` 
//     |   \  \ \  /  |        __  /  \  |  |,-'        __,- J . . . . . \ 
//     |    | /  |/     __,-  \  ) \  /  |_,-     __,--'     |. .__.----,' 
//     |    |/    ___     \    |'.  |/      __,--'           `.-;;;;;;;;;\ 
//     |     ___  \  \     |   |  `   __,--'                  /;;;;;;;;;;;;. 
//     |     \  \  |-'\    '    __,--'                       /;;;;;;;;;;;;;;\ 
// \   |      | /  |      __,--'                             `--;;/     \;-'\ 
//  \  |      |/    __,--'                                   /  /         \  \ 
//   \ |      __,--'                                        /  /           \  \ 
//    \|__,--'                                          _,-;M-K,           ,;-;\ 
//                                                     <;;;;;;;;           '-;;;; 
//                                                                                        ~ priceless artwork by SeaSide420
```

> Detail

https://www.fmz.com/strategy/427437

> Last Modified

2023-09-21 10:31:58
