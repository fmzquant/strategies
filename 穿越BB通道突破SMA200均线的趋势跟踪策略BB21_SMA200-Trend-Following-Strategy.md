
> Name

穿越BB通道突破SMA200均线的趋势跟踪策略BB21_SMA200-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1697c23db743b0a12c5.png)
[trans]


## 概述

该策略结合布林带和移动平均线,设计了一个跟踪趋势的交易系统。当价格突破布林带上轨且低轨高于SMA200时做多,当价格跌破布林带下轨时部分平仓,当价格跌破SMA200时全部平仓。该策略追踪趋势,在趋势变化时及时止损。

## 策略原理

1. 计算SMA200Exponential Moving Average作为判断大趋势的指标 
2. 计算布林带,包含上轨,中轨,下轨,并填充颜色作为获利区域
3. 当布林带上下轨都高于SMA200,说明处于上升趋势
4. 当价格向上突破布林带中轨时,做多入场
5. 当价格向下跌破布林带下轨时,部分平仓
6. 当价格跌破SMA200时,说明大趋势发生反转,全部平仓
7. 设定止损点,防止亏损过大
8. 根据账户资金和可承受风险计算交易数量

该策略判断趋势存在的前提是布林带需要完全位于SMA200之上,只有在明确的上升趋势中才会选择多头方向入场。当下跌趋势来临时,通过关键点份额止损和全仓止损来控制风险。

## 优势分析

1. 使用布林带判断明确的趋势存在,而不是基于单一指标判断
2. SMA200判断大趋势方向,避免在震荡行情无谓交易
3. 部分止损让利,追踪趋势运行
4. 关键点止损及时止损,最大程度避免亏损扩大
5. 计算交易数量引入风险管理概念,防止单笔损失过大

## 风险分析 

1. 布林带上下突破产生的交易信号可能出现较高的假信号率
2. 部分止损点设置需要优化,防止过早止损
3. 止损点过小,可能出现止损过于频繁
4. SMA周期参数需要测试优化,以平衡延迟和敏感度
5. 交易数量计算方法可能需要优化,防止单笔过大

可以通过仔细测试布林带参数,优化部分止损策略,调整SMA周期参数,并引入更科学的风险管理方法来降低这些风险。

## 优化方向

1. 测试优化布林带参数,降低信号误判率
2. 研究如何设定更合适的部分止损点
3. 测试SMA周期参数的最优值
4.考虑引入自适应止损来替代固定止损点
5. 研究引入波动率定额来更科学的计算交易规模
6. 回测加入交易成本进行模拟
7. 考虑与其他指标组合使用来提高策略稳定性

## 总结

该策略整合布林带通道、SMA均线指标设计了一个较完整的趋势跟踪策略。它在判断趋势存在时比较可靠,具有较强的趋势跟踪能力。通过持续优化止损策略、降低信号误判率、引入科学的风险管理手段,该策略可以成为一个值得长期实盘跟踪的趋势策略。它为量化交易策略设计提供了一个整合多个指标的思路。

|| 
****
## Overview

This strategy combines Bollinger Bands and Moving Average to design a trend following trading system. It goes long when price breaks through the upper band of Bollinger Bands and the lower band is above SMA200, closes partial position when price breaks through the lower band, and exits all when price crosses below SMA200. The strategy follows the trend and cuts loss in time when trend changes.

## Strategy Logic

1. Calculate SMA200 as Exponential Moving Average to determine the major trend 
2. Calculate Bollinger Bands, including upper band, middle band and lower band, and fill color as profit range
3. When both upper and lower bands are above SMA200, it indicates an uptrend
4. When price breaks through the middle band of Bollinger Bands upwards, go long
5. When price breaks through the lower band downwards, close partial position
6. When price crosses below SMA200, it indicates a reversal of the major trend, close all positions
7. Set stop loss point to prevent excessive loss
8. Calculate trade size based on account capital and acceptable risk

The premise of this strategy to identify a trend is that the Bollinger Bands should be completely above SMA200, only going long when a clear uptrend presents. When downtrend comes, risk is controlled by partial stop loss and full stop loss.

## Advantage Analysis

1. Use Bollinger Bands instead of a single indicator to identify a clear trend
2. SMA200 determines major trend direction, avoids unnecessary trading in range-bound market
3. Partial stop loss to follow trend runs
4. Timely stop loss on key points to minimize loss
5. Calculate trade size introduces risk management to prevent excessive loss on a single trade

## Risk Analysis

1. Breakout signals generated from Bollinger Bands may have relatively high false signals
2. Partial stop loss points need to be optimized to prevent premature stop loss
3. If stop loss point is too tight, stop loss may be triggered too frequently 
4. SMA period needs to be tested and optimized to balance lagging and sensitivity
5. Trade size calculation method may need optimization to prevent excessive size on single trades

These risks could be reduced by carefully testing Bollinger Bands parameters, optimizing partial stop loss strategy, adjusting SMA period, and introducing more scientific risk management methods.

## Optimization Directions

1. Test and optimize Bollinger Bands parameters to lower false signals
2. Research how to set proper partial stop loss points
3. Test optimal SMA period  
4. Consider adaptive stops instead of fixed stop loss points
5. Study using volatility-based position sizing for more scientific trade size calculation
6. Backtest with trading costs to simulate real trading
7. Consider combining with other indicators to improve strategy robustness

## Conclusion

This strategy integrates Bollinger Bands and SMA to design a relatively complete trend following system. It is reliable in identifying trend existence and has strong trend tracking capability. By continuously optimizing stop loss strategy, reducing signal errors, and introducing scientific risk management techniques, this strategy can become a worthwhile system to track in live trading. It provides an approach of combining multiple indicators for quantitative trading strategy design.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|MA Length|
|v_input_2|21|BB Length|
|v_input_3_close|0|BB Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|2|StdDev|
|v_input_5|5|Stop Loss%|
|v_input_6|10|Risk % of capital  == Based on this trade size is claculated    numberOfShares = (AvailableCapital*risk/100) / stopLossPoints|
|v_input_7|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4
strategy(title="BB9_MA200_Strategy", overlay=true, pyramiding=1,     default_qty_type=strategy.cash,  initial_capital=10000, currency=currency.USD)  //default_qty_value=10, default_qty_type=strategy.fixed, 


var stopLossVal=0.00

//variables BEGIN
smaLength=input(200,title="MA Length")
bbLength=input(21,title="BB Length")  

bbsrc = input(close, title="BB Source")
mult = input(2.0, minval=0.001, maxval=50, title="StdDev")


stopLoss = input(title="Stop Loss%", defval=5, minval=1)

riskCapital = input(title="Risk % of capital  == Based on this trade size is claculated    numberOfShares = (AvailableCapital*risk/100) / stopLossPoints", defval=10, minval=1)


sma200=ema(close,smaLength)

plot(sma200, title="SMA 200", color=color.orange)


//bollinger calculation
basis = sma(bbsrc, bbLength)
dev = mult * stdev(bbsrc, bbLength)
upperBand = basis + dev
lowerBand = basis - dev
offset = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)

//plot bb
plot(basis, "Basis", color=color.teal, style=plot.style_circles , offset = offset)
p1 = plot(upperBand, "Upper", color=color.teal, offset = offset)
p2 = plot(lowerBand, "Lower", color=color.teal, offset = offset)
fill(p1, p2, title = "Background", color=color.teal, transp=95)


strategy.initial_capital = 50000

//Entry---

strategy.entry(id="LE", comment="LE capital="+tostring(strategy.initial_capital + strategy.netprofit ,"######.##"), qty=( (strategy.initial_capital + strategy.netprofit ) * riskCapital / 100)/(close*stopLoss/100) , long=true,  when=strategy.position_size<1 and upperBand>sma200 and lowerBand > sma200 and crossover(close, basis) )     //  // aroonOsc<0  //(strategy.initial_capital * 0.10)/close


barcolor(color=strategy.position_size>=1? color.blue: na)

//partial Exit
tpVal=strategy.position_size>1 ? strategy.position_avg_price * (1+(stopLoss/100) ) : 0.00
strategy.close(id="LE", comment="Partial points="+tostring(close - strategy.position_avg_price, "####.##"),  qty_percent=30 , when=abs(strategy.position_size)>=1 and close>tpVal and crossunder(lowerBand, sma200)   )   //close<ema55 and rsi5Val<20 //ema34<ema55


//close All on stop loss
//stoploss
stopLossVal:=   strategy.position_size>1 ? strategy.position_avg_price * (1-(stopLoss/100) ) : 0.00

strategy.close_all( comment="SL Exit points="+tostring(close - strategy.position_avg_price, "####.##"),  when=abs(strategy.position_size)>=1 and close < stopLossVal  )  //close<ema55 and rsi5Val<20 //ema34<ema55  //close<ema89//

strategy.close_all( comment="BB9 X SMA200 points="+tostring(close - strategy.position_avg_price, "####.##"),  when=abs(strategy.position_size)>=1 and  crossunder(basis, sma200)  )  //close<ema55 and rsi5Val<20 //ema34<ema55  //close<ema89
    
```

> Detail

https://www.fmz.com/strategy/432308

> Last Modified

2023-11-16 11:04:42
