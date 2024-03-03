
> Name

范围量加仓DCA策略Ranged-Volume-DCA-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略结合了范围量指标和DCA加仓机器人的策略,在范围量指标发出信号时,使用DCA机器人参数进行加仓建仓。策略试图以低成本加仓追逐趋势获利。

### 策略原理

1. 使用范围量指标判断量能突破
2. 突破时做多入场,之后在跌破阈值时加仓
3. 计算DCA机器人参数,包括安全订单价格、数量、最大安全订单数等
4. 当价格触发安全订单价格时加仓
5. 当达到盈利目标或超过最大安全订单时止盈

具体来说,该策略结合了范围量指标的量能分析和DCA机器人的加仓机制。当量能超过近期最高点时产生做多信号并入场,之后根据DCA参数在价格下跌至每层安全订单价格时加仓。策略可以追踪趋势,但有止损限制。

### 优势分析

1. 结合范围量指标判断量能,提高入场准确性
2. 加仓机制可以以低成本追踪趋势
3. 可灵活配置DCA参数,适应市场环境
4. 有止盈和止损机制,可控制风险

### 风险分析

1. 量能判断失败风险,可能入场错误方向
2. DCA加仓次数过多风险,成本和风险增大
3. 需适时调整DCA参数,否则效果可能不佳
4. 止损位置设置不当可能扩大单笔损失

可以通过优化参数配置、引入趋势过滤等方法来降低风险。

### 优化方向

1. 测试不同的量参数组合找出最佳参数
2. 优化DCA参数,适应不同品种和周期
3. 增加移动止损追踪价格实时变化 
4. 添加再入场条件在趋势放量时重新入场
5. 评估趋势过滤以避免错误方向入场
6. 比较不同止损算法优劣找出最优配置

### 总结

本策略结合范围量与DCA机制,以量能放大信号入场,并以低成本加仓跟随趋势。优点是资金利用效率高,可配置性强;缺点是严重依赖参数优化。通过参数调优、止损优化等方式可在保持优势的基础上降低风险。该策略可让交易者掌握运用指标和机器人调优交易策略的方法。

|| 

### Overview 

This strategy combines the ranged volume indicator and DCA bot strategy, taking positions when ranged volume signals trigger, using DCA bot parameters for pyramiding. It aims to follow trends with low-cost pyramiding.

### Strategy Logic

1. Use ranged volume indicator to identify volume spikes
2. Go long on spike, pyramid with safety orders when price drops below threshold 
3. Calculate DCA parameters including safety order prices, sizes, max safety orders etc.
4. Add safety orders when price triggers safety order price levels
5. Take profit when reaching profit target or max safety orders

Specifically, it combines ranged volume analysis and DCA pyramiding mechanisms. It goes long on volume spike over recent high, and pyramids with safety orders when price drops to each layer. It can track trends but with stop loss limits.

### Advantage Analysis 

1. Ranged volume improves entry accuracy  
2. Pyramiding allows low-cost trend following
3. Flexible configuration of DCA parameters  
4. Take profit and stop loss manage risks

### Risk Analysis

1. Failed volume analysis risks wrong entry
2. Too many pyramiding increases costs and risks
3. Requires timely DCA parameter tuning  
4. Improper stop loss placement may expand losses

Risks can be reduced via parameter optimization, adding trend filter etc.

### Optimization Directions

1. Test volume parameter combinations for best setup
2. Optimize DCA parameters for different products and timeframes
3. Add trailing stop loss to track price changes
4. Add re-entry rules to re-enter on trend momentum
5. Evaluate trend filter to avoid wrong direction entries 
6. Compare stop loss algorithms to find optimal configuration

### Summary

This strategy combines ranged volume and DCA mechanisms to enter on volume expansions and pyramid with low cost following trends. Pros are efficient capital use and configurability; Cons are high reliance on parameter optimization. Risks can be reduced through parameter tuning, stop loss optimization while retaining advantages. It allows traders to master using indicators and optimizing trading strategies with bots.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2015 00:00 +0000)|Start Time|
|v_input_2|timestamp(31 Dec 2050 23:59 +0000)|End Time|
|v_input_int_1|5|Volume Range Length|
|v_input_3|true|Heikin Ashi  (Try toggling for different results)|
|v_input_4|true|Show Bar Colors|
|v_input_5|true|Show Break-Out|
|v_input_6|true|Show Range|
|v_input_float_1|6|Price deviation to open safety orders (%)|
|v_input_float_2|22|Target Take Profit (%)|
|v_input_float_3|false|Trailing deviation. Default= 0.0 (%)|
|v_input_7|100|Base order|
|v_input_8|500|Safety order|
|v_input_float_4|2|Safety order volume scale|
|v_input_float_5|1.4|Safety order step scale|
|v_input_9|5|Max safety orders|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-20 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_8",500]]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Ranged Volume DCA Strategy - R3c0nTrader ver 2022-04-19
// For backtesting with 3Commas DCA Bot settings
// Thank you "EvoCrypto" for granting me permission to use "Ranged Volume" to create this strategy
// Thank you "junyou0424" for granting me permission to use "DCA Bot with SuperTrend Emulator" which I used for adding bot inputs, calculations, and strategy
//@version=5
strategy("Ranged Volume DCA Strategy - R3c0nTrader", shorttitle="Ranged Vol DCA Strategy", format=format.volume, overlay=true, pyramiding=999, default_qty_type=strategy.cash, initial_capital=50000, commission_value=0.0)

// INPUTS {
// Start and End Dates
i_startTime = input(defval=timestamp('01 Jan 2015 00:00 +0000'), title='Start Time')
i_endTime = input(defval=timestamp('31 Dec 2050 23:59 +0000'), title='End Time')
inDateRange = true

//Ranged Volume Settings
Range_Length    =   input.int(5,        title="Volume Range Length",                       minval=1)

Heikin_Ashi     =   input(true,     title="Heikin Ashi  (Try toggling for different results)")
Display_Bars    =   input(true,     title="Show Bar Colors")
Display_Break   =   input(true,     title="Show Break-Out")
Display_Range   =   input(true,     title="Show Range")

truncate(number, decimals) =>
    factor = math.pow(10, decimals)
    int(number * factor) / factor

// Strategy Inputs
//sourceInput = input.source(close, "Source")
sourceInput = close
price_deviation = input.float(6.0, title='Price deviation to open safety orders (%)', step=0.25, minval=0.0) / 100
take_profit = input.float(22.0, title='Target Take Profit (%)', step=0.5, minval=0.0) / 100
trailing = input.float(0.0, title='Trailing deviation. Default= 0.0 (%)', step=0.5, minval=0.0) / 100
base_order = input(100.0, title='Base order')
safe_order = input(500.0, title='Safety order')
safe_order_volume_scale = input.float(2.0, step=0.5, title='Safety order volume scale')
safe_order_step_scale = input.float(1.4, step=0.1, title='Safety order step scale')
max_safe_order = input(5, title='Max safety orders')

var current_so = 0
var initial_order = 0.0
var previous_high_value = 0.0
var original_ttp_value = 0.0
// Calculate our key levels
take_profit_level = strategy.position_avg_price * (1 + take_profit)

// }


// SETTINGS {
Close = Heikin_Ashi ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close) : close
//Close = Heikin_Ashi ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close) : sourceInput
Open = Heikin_Ashi ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, open) : open


Positive        =    volume
Negative        =   -volume

Highest         =   ta.highest(volume, Range_Length)
Lowest          =   ta.lowest(-volume, Range_Length)

Up              =   Highest > Highest[1] and Close > Open
Dn              =   Highest > Highest[1] and Close < Open

Volume_Color = 
 Display_Break and Up ? color.new(#ffeb3b, 20) : 
 Display_Break and Dn ? color.new(#f44336, 20) : 
 Close > Open ? color.new(#00c0ff, 20) : 
 Close < Open ? color.new(#0001f6, 20) : na
// }

//Plot bar color for volume range indicator
barcolor(Volume_Color, title='Ranged Volume Bar Coloring: (You must disable bar coloring in any studies you added or this may not work properly)')
//barcolor(Display_Bars ? Volume_Color : na)

//

// First Position
if strategy.position_size == 0 and sourceInput > 0 and (Up) and inDateRange
    strategy.entry('Long @' + str.tostring(sourceInput)+'?✋?', strategy.long, qty=base_order / sourceInput)
    initial_order := sourceInput
    current_so := 1
    previous_high_value := 0.0
    original_ttp_value := 0
    original_ttp_value

threshold = 0.0

if safe_order_step_scale == 1.0
    threshold := initial_order - initial_order * price_deviation * safe_order_step_scale * current_so
    threshold

else if current_so <= max_safe_order
    threshold := initial_order - initial_order * ((price_deviation * math.pow(safe_order_step_scale, current_so) - price_deviation) / (safe_order_step_scale - 1))
    threshold

else if current_so > max_safe_order
    threshold := initial_order - initial_order * ((price_deviation * math.pow(safe_order_step_scale, max_safe_order) - price_deviation) / (safe_order_step_scale - 1))
    threshold
    

// Average Down
if current_so > 0 and sourceInput <= threshold and current_so <= max_safe_order and previous_high_value == 0.0
    strategy.entry('?? SO ' + str.tostring(current_so) + '@' + str.tostring(sourceInput), direction=strategy.long, qty=safe_order * math.pow(safe_order_volume_scale, current_so - 1) / sourceInput)
    current_so += 1
    current_so

// Take Profit!
if take_profit_level <= sourceInput and strategy.position_size > 0 or previous_high_value > 0.0
    if trailing > 0.0
        if previous_high_value > 0.0
            if sourceInput >= previous_high_value
                previous_high_value := sourceInput
                previous_high_value
            else
                previous_high_percent = (previous_high_value - original_ttp_value) * 1.0 / original_ttp_value
                current_high_percent = (sourceInput - original_ttp_value) * 1.0 / original_ttp_value
                if previous_high_percent - current_high_percent >= trailing
                    strategy.close_all(comment='Close (trailing) @' + str.tostring(truncate(current_high_percent * 100, 3)) + '%')
                    current_so := 0
                    previous_high_value := 0
                    original_ttp_value := 0
                    original_ttp_value
        else
            previous_high_value := sourceInput
            original_ttp_value := sourceInput
            original_ttp_value
    else
        strategy.close_all(comment='? Close @' + str.tostring(sourceInput))
        current_so := 0
        previous_high_value := 0
        original_ttp_value := 0
        original_ttp_value

// Plot TP
plot(strategy.position_size > 0 ? take_profit_level : na, style=plot.style_linebr, color=color.green, linewidth=2, title="Take Profit")

// Plot All Safety Order lines except for last one as bright blue
plot(strategy.position_size > 0 and current_so <= max_safe_order and current_so > 0 ? threshold : na, style=plot.style_linebr, color=color.new(#00ffff,0), linewidth=2, title="Safety Order")

// Plot Last Safety Order Line as Red
plot(strategy.position_size > 0 and current_so > max_safe_order ? threshold : na, style=plot.style_linebr, color=color.red, linewidth=2, title="No Safety Orders Left")

// Plot Average Position Price Line as Orange
plot(strategy.position_size > 0 ? strategy.position_avg_price : na, style=plot.style_linebr, color=color.orange, linewidth=2, title="Avg Position Price")

// Fill TP Area and SO Area
h1 = plot(strategy.position_avg_price, color=color.new(#000000,100), title="Avg Price Plot Area", display=display.none, editable=false)
h2 = plot(take_profit_level, color=color.new(#000000,100), title="Take Profit Plot Area", display=display.none, editable=false)
h3 = plot(threshold, color=color.new(#000000,100), title="SO Plot Area", display=display.none, editable=false)

// TP Area
fill(h1,h2,color=color.new(#38761d,70), title="Take Profit Plot Area")
// Current SO Area
fill(h1,h3,color=color.new(#3d85c6,70), title="SO Plot Area")
```

> Detail

https://www.fmz.com/strategy/427443

> Last Modified

2023-09-21 10:41:52
