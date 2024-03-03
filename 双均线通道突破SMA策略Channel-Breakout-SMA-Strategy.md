
> Name

双均线通道突破SMA策略Channel-Breakout-SMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1adc180d76f82166ec4.png)

[trans]

本策略基于通道突破原理,并利用均线交叉作为退出信号,适用于期货和指数交易。

### 策略原理

1. 计算一定周期内的最高价和最低价,构建上下通道。

2. 当价格突破上通道时,做多;当价格突破下通道时,做空。

3. 计算快速期和慢速期两条SMA均线。

4. 做多时,快速期SMA上穿慢速期SMA,平多仓;做空时,快速期SMA下穿慢速期SMA,平空仓。

### 优势分析

1. 结合通道和均线系统,可以提高获利概率。

2. 利用通道判断轮动ankel定阶段,利用均线判断趋势结束。

3. 均线过滤可以避免whipsaw,减少不必要交易。

4. 通道范围参数可调,适应不同周期和波动率市场。

### 风险分析

1. 通道范围设定不当,可能错过突破机会或产生更多假突破。

2. 均线参数设定不当,可能过早或过晚退出仓位。

3. 需考虑合理仓位规模管理,避免单笔损失过大。

4. 需留意突破后是否有效,防止追高杀跌。

### 优化方向

1. 测试不同参数下策略收益率和胜率,优化通道范围和均线周期。

2. 结合趋势指标过滤突破信号,提高突破成功率。 

3. 增加仓位管理机制,比如固定份额、马丁格尔等。

4. 增加止损机制来控制单笔损失。

### 总结

本策略利用通道判断市场轮动和热点,均线判断趋势结束,合理参数设定可以在强势市场实现稳定收益。但需要防止whipsaw可能带来的亏损,同时优化仓位和风险管理非常关键。通过参数调整、信号过滤及风险控制手段的运用,可以进一步增强策略稳定性。

|| 

## Overview

This strategy is based on channel breakout and uses moving average crossover as exit signal. It works well on futures and indices.

### Strategy Logic

1. Calculate highest high and lowest low over certain periods to construct upper and lower channel. 

2. Go long when price breaks above upper channel; go short when price breaks below lower channel.

3. Calculate fast and slow SMA lines. 

4. If long, close long when fast SMA crosses below slow SMA; If short, close short when fast SMA crosses above slow SMA.

### Advantage Analysis 

1. Combining channel and moving average system can improve profitability.

2. Channel judges rotation and SMA judges trend exhaustion. 

3. SMA filter avoids whipsaws and reduces unnecessary trades.

4. Adjustable channel range fits different periods and volatility.

### Risk Analysis

1. Improper channel range may miss breakout or generate false breakout. 

2. Improper SMA parameters may exit early or late.

3. Need reasonable position sizing to limit single loss. 

4. Watch for valid breakout, avoid chasing high/selling low.

### Optimization

1. Test parameters to optimize channel range and SMA periods. 

2. Add trend filter to improve breakout success rate.

3. Add position sizing such as fixed fraction and Martingale. 

4. Add stop loss to control single loss.

### Summary

This strategy capitalizes on channel and SMA to achieve steady gains in strong trends. But whipsaw losses must be avoided and position sizing is critical. Further enhancements on parameter tuning, signal filtering and risk management will improve robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-13 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © anshuanshu333

//@version=4

// strategy("ChBrkOutStrategySMA", overlay=true, initial_capital = 200000)
length = input(title="Length", type=input.integer, minval=1, maxval=1000, defval=7)
     
fastSMA = sma(close,9)
slowSMA = sma(close,21)

upBound = highest(high, length)
downBound = lowest(low, length)

boundLongEntry = ((close >= upBound) or (high >= upBound)) and fastSMA>slowSMA and (close > open)
boundShortEntry =((close <= downBound) or (low <= downBound)) and fastSMA<slowSMA and (close <open)

u=plot(upBound, title = "Upper Bound",color=color.blue, linewidth=1)
l=plot(downBound, title = "Lower Bound",color=color.red, linewidth=1)
plot(fastSMA,title = "Fast SMA", color = color.red, linewidth =2)
plot(slowSMA,title = "Slow SMA" ,color = color.green, linewidth =1)
fill(u,l, transp=95)
plot(avg(upBound,downBound), title = "Avg", color=color.gray,linewidth =1)

     
if (boundLongEntry )
    strategy.entry("LE", long = true)
    
if (boundShortEntry)
    strategy.entry("SE", long = false)
    
SmaLongExit = crossunder(fastSMA,slowSMA)
SmaShortExit = crossover(fastSMA,slowSMA)

    
//Close TRades   
if (strategy.position_size > 0)
    strategy.close(id="LE",when= SmaLongExit)
if (strategy.position_size < 0)
    strategy.close(id="SE",when= SmaShortExit)
```

> Detail

https://www.fmz.com/strategy/429964

> Last Modified

2023-10-23 17:08:51
