
> Name

动量捕捉通道策略Momentum-Capture-Channel-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/651191a78692be312c.png)
 [trans]

### 概述

动量捕捉通道策略是一个基于Donchian通道的变体。它由最高价带,最低价带和作为最高价带和最低价带平均值的基线组成。这个策略在趋势性品种的周线和日线时间框架上非常有用。这就是QuantCT应用中使用的实现。

您可以将操作模式设置为多空或仅多头。

您还可以设置固定止损或忽略它,以便该策略仅根据入市和退出信号进行操作。

### 策略原理

这个策略的核心逻辑是基于Donchian通道指标。Donchian通道由20天内的最高价,最低价和收盘价的平均值组成。根据价格突破通道上下轨来判断趋势方向和可能的反转。

本策略是Donchian通道的变体。它由最高价带,最低价带和作为最高价带和最低价带平均值的基线组成。具体逻辑如下:

1. 计算一定周期内的最高价和最低价作为通道上下轨
2. 计算上下轨的平均值作为基线
3. 当价格突破上轨时,做多
4. 当价格跌破基线时,平多仓
5. 当价格跌破下轨时,做空(若允许空头)
6. 当价格重新夺回基线时,平空仓

该策略的优势在于能够有效捕捉价格的趋势动量。通过等待价格突破上下轨来判断真正的趋势启动,可以避免被谈头造成不必要的损失。

### 优势分析

1. 捕捉价格趋势动量,实现盈利增长
2. 避免被假突破套牢,减少不必要损失 
3. 可以灵活调整参数,适用于不同品种
4. 可选择仅做多或全仓操作,满足不同需求
5. 集成止损机制,可以有效控制单笔损失

### 风险分析

1. 捕捉趋势的同时,也会放大突破失败的损失
2. 止损设置过于宽松,单笔损失可能扩大
3. 参数设置不当可能导致频繁交易,增加交易成本
4. 突破信号判断存在一定滞后,可能错过最优入场点

解决方法:

1. 选择止损比例要慎重,既要控制损失,也要给趋势足够的空间
2. 增大参数周期数值,降低交易频率
3. 结合其他指标判断趋势信号可靠性,选择更优入场时机

### 优化方向 

1. 整合其它指标判断入场时机 
2. 动态调整止损位置
3. 根据品种特性优化参数设置
4. 结合机器学习判断突破的成功率
5. 增加仓位管理逻辑

### 总结

动量捕捉通道策略通过捕捉价格趋势提供了可观的盈利机会。同时,它也具有一定的风险,需要适当调整参数进行风险控制。通过不断优化入场时机选择和止损逻辑,该策略可以成为一个非常出色的趋势跟随系统。它简单的交易规则和清晰的信号判断,使其易于理解和实现,非常适合新手交易者。

|| 

### Overview

The Momentum Capture Channel Strategy is a variation of the Donchian Channel trading strategy. It consists of a highest-high band, a lowest-low band, and a baseline which averages the highest-high and lowest-low bands. This strategy works very well on trending instruments across weekly and daily timeframes. This is the implementation used in the QuantCT app.  

You can set the operation mode to Long/Short or Long-only.

You can also set a fixed stop-loss or ignore it so the strategy acts solely based on entry and exit signals.

### Strategy Logic

The core logic of this strategy is based on the Donchian Channel indicator. The Donchian Channel consists of the highest high, lowest low, and closing price average over the past 20 days. Trend direction and potential reversals are judged by price breaking through the upper and lower bands of the channel.

This strategy is a variation on the Donchian Channel. It consists of a highest-high band, a lowest-low band, and a baseline which averages the highest-high and lowest-low bands. The specific logic is:

1. Calculate the highest high and lowest low over a certain period as the upper and lower bands of the channel
2. Calculate the average of the upper and lower bands as the baseline
3. Go long when price breaks above the upper band 
4. Close long position when price breaks below the baseline
5. Go short when price breaks below the lower band (if shorting is allowed)
6. Close short position when price reclaims the baseline

The advantage of this strategy is it can effectively capture the momentum of price trends. By waiting for price to break the upper/lower bands to determine the real start of a trend, unnecessary losses from fakeouts can be avoided.  

### Advantage Analysis

1. Captures price trend momentum for profit growth
2. Avoids unnecessary losses from being trapped by fake breakouts
3. Flexible parameter adjustment makes it suitable for different products  
4. Can choose Long-only or fully traded to suit different needs
5. Integrated stop-loss mechanism effectively controls per trade loss

### Risk Analysis  

1. While capturing trends, failed breakouts also amplify losses
2. Stop-loss set too wide could lead to enlarged per trade loss
3. Improper parameter settings may lead to overtrading and increased transaction costs  
4. Breakout signal judgement has some lag, could miss best entry points  

Solutions:

1. Choose stop-loss percentage carefully to control loss yet give trend enough room
2. Increase parameter period values to reduce trading frequency  
3. Incorporate other indicators to judge signal reliability, select better entry timing

### Optimization Directions

1. Incorporate other indicators to determine entry timing
2. Dynamically adjust stop-loss placement  
3. Optimize parameter settings based on instrument characteristics 
4. Incorporate machine learning to judge breakout success rate
5. Add position sizing logic

### Conclusion

The Momentum Capture Channel strategy provides considerable profit opportunities by capturing price trends. At the same time, it also has certain risks that need to be controlled by properly adjusting parameters. By continually optimizing entry timing selection and stop-loss logic, this strategy can become an excellent trend following system. Its simple trading rules and clear signal judgement make it easy to understand and implement, highly suitable for novice traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|High Period|
|v_input_2|10|Low Period|
|v_input_3|false|Long Only|
|v_input_4|5|Stop-loss (%)|
|v_input_5|false|Use Stop-Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © QuantCT

//@version=4
strategy("Donchian Channel Strategy Idea",
         shorttitle="Donchian", 
         overlay=true,
         pyramiding=0,     
         default_qty_type=strategy.percent_of_equity, 
         default_qty_value=100, 
         initial_capital=1000,           
         commission_type=strategy.commission.percent, 
         commission_value=0.075)

// ____ Inputs

high_period = input(title="High Period", defval=10) 
low_period = input(title="Low Period", defval=10)
long_only = input(title="Long Only", defval=false)
slp = input(title="Stop-loss (%)", minval=1.0, maxval=25.0, defval=5.0)
use_sl = input(title="Use Stop-Loss", defval=false)

// ____ Logic

highest_high = highest(high, high_period)
lowest_low = lowest(low, low_period)
base_line = (highest_high + lowest_low) / 2
    
enter_long = (close > highest_high[1])
exit_long = (close < base_line)
enter_short = (close < lowest_low[1])
exit_short = (close > base_line)

strategy.entry("Long", strategy.long, when=enter_long)
strategy.close("Long", when=exit_long) 
if (not long_only)
    strategy.entry("Short", strategy.short, when=enter_short)
    strategy.close("Short", when=exit_short) 
   
// ____ SL

sl_long = strategy.position_avg_price * (1- (slp/100))
sl_short = strategy.position_avg_price * (1 + (slp/100))
if (use_sl)
    strategy.exit(id="SL", from_entry="Long", stop=sl_long)
    strategy.exit(id="SL", from_entry="Short", stop=sl_short)
    
// ____ Plots

colors = 
 strategy.position_size > 0 ? #27D600 :
 strategy.position_size < 0 ? #E30202 :
 color.orange

highest_high_plot = plot(highest_high, color=colors)
lowest_low_plot = plot(lowest_low, color=colors)
plot(base_line, color=color.silver)
fill(highest_high_plot, lowest_low_plot, color=colors, transp=90)







```

> Detail

https://www.fmz.com/strategy/435981

> Last Modified

2023-12-20 15:46:40
