
> Name

在Pine脚本中设置杠杆策略Leveraged-RSI-Strategy-in-Pine-Script

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1705398a0459d32bcf5.png)
[trans]

#### 概述

本策略旨在解决Pine脚本回测时无法设置杠杆的问题,实现杠杆复利。策略通过计算策略权益、设置的杠杆倍数和收盘价格,动态计算开仓手数。

#### 策略原理

1. 设置精度precision,控制开仓手数精度
2. 设置杠杆倍数leverage,默认为1倍
3. 计算开仓手数:`Lev = math.max(math.round(strategy.equity * leverage / close), 0)`,使其与权益和杠杆成正比
4. 入场:当RSI指标由低位向上突破30时做多;由高位向下突破70时做空
5. 按照计算的手数Lev下单

#### 优势分析

1. 解决Pine脚本无法设置杠杆的问题
2. 权益变化与开仓手数成正比,实现杠杆复利
3. RSI指标 filtered,避免无谓交易
4. 手数计算精度precision可调,满足不同需求

#### 风险分析

1. 杠杆过高容易爆仓
2. 需适当调整杠杆、开仓手数,控制风险

#### 优化方向

1. 可测试不同参数下的稳定性
2. 可结合止损策略,进一步控制风险
3. 可考虑多因子模型,提高策略效果

#### 总结

本策略在Pine脚本中实现杠杆设置,解决回测无法模拟杠杆问题,计算开仓手数与权益挂钩,完成杠杆复利。策略简单有效,可进一步优化,值得学习。

||

#### Overview

This strategy aims to solve the problem that Pine Script cannot set leverage during backtesting to achieve compound interest with leverage. The strategy dynamically calculates the position size based on the strategy equity, set leverage ratio and closing price.  

#### Strategy Logic

1. Set precision precision to control the precision of position size
2. Set leverage ratio leverage, default is 1x
3. Calculate position size: `Lev = math.max(math.round(strategy.equity * leverage / close), 0)`, make it proportional to equity and leverage  
4. Entry signal: long when RSI breaks above 30 from below; short when RSI breaks below 70 from above
5. Place order with calculated size Lev

#### Advantage Analysis  

1. Solve the problem that Pine Script cannot set leverage
2. Position size changes proportionally with equity changes, achieving compound interest with leverage
3. RSI filtered, avoiding unnecessary trades
4. Precision precision is adjustable to meet different requirements  

#### Risk Analysis

1. Excessive leverage can easily cause liquidation
2. Need to adjust leverage and position size properly to control risk

#### Optimization Direction  

1. Can test stability under different parameters
2. Can incorporate stop loss to further control risk
3. Can consider multi-factor model to improve strategy performance   

#### Summary

This strategy implements leverage setting in Pine Script, solving the problem that backtesting cannot simulate leverage, calculates position size linked to equity to achieve compound interest with leverage. The strategy is simple and effective, can be further optimized, and worth learning.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|length|
|v_input_2|30|overSold|
|v_input_3|70|overBought|
|v_input_int_1|true|Precision|
|v_input_int_2|true|Leverage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-22 00:00:00
end: 2023-12-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RingsCherrY

//@version=5
strategy("How to use Leverage in PineScript", overlay=true, pyramiding=1, initial_capital=1000000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.04)

//////////////////////////////////////////
////////////////Indicators////////////////
//////////////////////////////////////////

length = input( 14 )
overSold = input( 30 )
overBought = input( 70 )
price = close
vrsi = ta.rsi(price, length)
co = ta.crossover(vrsi, overSold)
cu = ta.crossunder(vrsi, overBought)

//////////////////////////////////////////
/////////////////Leverage/////////////////
//////////////////////////////////////////


//The number of decimal places for each position opening, i.e., the accuracy
precision = input.int(1,title='Precision')

//Leverage, the default is 1, here is not recommended to open a high leverage

leverage = input.int(1,title='Leverage',minval = 1, maxval = 100 ,step = 1)

//Calculate the number of open contracts, here using equity for calculation, considering that everyone compound interest is used for trading equity
Lev = math.max(math.round(strategy.equity * leverage  / close , precision), 0)

if (not na(vrsi))
	if (co)
		strategy.entry("RsiLE", strategy.long,qty = Lev, comment="RsiLE")
	if (cu)
		strategy.entry("RsiSE", strategy.short,qty = Lev, comment="RsiSE")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/436988

> Last Modified

2023-12-29 10:46:35
