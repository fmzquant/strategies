
> Name

趋势成块策略Sizeblock-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ab51ca8479a421dd32.png)
[trans]

## 概述

趋势成块策略是一种基于价格变化百分比或跳动点数进行对角线排列的交易策略。它可以清晰地在图表上显示本地趋势和转折点。这是一个非常有用的跟踪价格方向的工具。

## 原理  

该策略的计算基于价格变动的百分比或跳动点数偏差(在“偏差”参数中表示),并以对角线行的形式显示在图表上。

每一行由基准中线、上限线和下限线组成:

- 基准中线等于上一行或下一行的上限线或下限线(如果价格在一个时间间隔内快速变化,则当前行的基准中线将大于上一行的上限线或者小于下一行的下限线一个相等的偏差数量,具体取决于价格变动方向)。在计算开始时,基准中线等于第一行的初始值。

- “数量”参数确定根据价格变动方向的上限线或下限线的偏差量,“转折”参数确定改变价格变动方向的偏差量。

构建新行的规则:

- 如果收盘价≥上限线且收盘价>开盘价,上限线会逐步上移,下限线也会上移但幅度较小。

- 如果最低价≤下限线且收盘价<开盘价,下限线会逐步下移,上限线也会下移但幅度较小。

通过调整偏差量,可以在图表上清楚地看到本地趋势和转折点。这是一个非常有用的工具来跟踪价格走势。

## 优势分析

- 可视化显示价格变化趋势,清晰识别支持阻力。

- 对角线能清楚显示突破的力度和回调的范围。

- 可根据需要调整对角线的斜率来识别不同力度的趋势。

- 能找到比较大的支持阻力,并进行突破。

- 容易看出价格的节奏变化,从而调整仓位。

## 风险分析

- 对角线并不能完全准确预测后续价格走势。

- 需要关注走势中出现的背离,对角线与实际价格可能会出现分歧。

- 不能作为孤立使用的策略,需要结合其他指标判断大趋势。

- 需要注意参数调整不当可能导致过于频繁交易。

- 回调时需要警惕反转的可能,不能机械盲目追踪。

可以适当缩小仓位规模,同时参考其他指标作为辅助判断,在大趋势下进行操作。

## 优化方向

- 可以添加仓位管理模块,在趋势不同阶段动态调整仓位。

- 可以结合波动率指标,在波动加大时降低仓位。

- 可以根据回撤比例来设置止损点,控制单笔损失。

- 可以添加过滤器,在价格出现背离时暂停交易。

- 可以划分多级别对角斜率,识别不同力度的趋势变化。

通过动态调整仓位,设定止损和过滤条件,可以更加稳定地跟踪价格趋势。

## 总结

趋势成块策略利用对角线直观显示价格趋势变化,能清楚识别支持阻力位和突破口。但不能依赖对角线独立判断,需要辅以其他指标进行综合分析,同时控制风险。这是一个非常有价值的辅助工具,能帮助交易者更好地把握市场节奏。通过优化可以使策略更加稳健高效,具有很大的应用潜力。

|| 

## Overview

The Sizeblock strategy is a trading strategy based on the percentage or tick deviation of price changes displayed in diagonal rows. It can clearly show local trends and reversal points on the chart. This is a very useful tool for tracking price direction.

## Principles

The calculation is based on the percentage or tick deviation of the price movement (indicated in the "Deviation" parameter), which is displayed on the chart in the form of rows.

The row consists of the base middle line, upper and lower limits:

- The base middle line is equal to the upper or lower limits of the previous row (if the price changes rapidly in one time interval, then the base middle line of the current row is greater than the upper limit of the previous row or less than the lower limit of the previous row by an equal number of deviations depending on the direction of price movement). At the beginning of the calculation, the base middle line is equal to the initial value of the first row. 

- The "Quantity" parameter determines the deviation for the upper or lower limits depending on the direction of the price movement, and the "U-turn" parameter determines the deviation for changing the direction of the price movement.

The rule for constructing a new row:

- If the close ≥ the upper limit and close > open, the upper limit will gradually move up, and the lower limit will also move up but less. 

- If the low ≤ the lower limit and close < open, the lower limit will gradually move down, and the upper limit will also move down but less.

By adjusting certain deviations, you can clearly see the local trend and reversal points on the chart. This is a very useful tool for tracking price direction.

## Advantages

- Visualize price change trends and clearly identify support and resistance.

- Diagonal lines clearly show the strength of breakouts and the range of pullbacks.

- The slope of diagonal lines can be adjusted as needed to identify trends of different strength.

- Can find relatively large support and resistance for breakouts.

- Easy to see changes in price rhythm and adjust position size accordingly. 

## Risks

- Diagonal lines cannot completely accurately predict subsequent price moves.

- Need to watch for divergences in trends where diagonal lines may diverge from actual prices.

- Cannot be used as an isolated strategy, needs to incorporate other indicators to determine the major trend.

- Improper parameter adjustments may lead to overly frequent trading.

- Need to beware of potential reversals during pullbacks instead of blindly chasing trends mechanically.

Can moderately reduce position sizing and refer to other indicators as auxiliary judgment within major trends.

## Optimization

- Can add position management modules to dynamically adjust positions in different trend stages.

- Can incorporate volatility indicators to reduce positions when volatility increases.

- Can set stop loss based on drawdown percentage to control single loss.

- Can add filters to pause trading when price divergences occur. 

- Can divide diagonal slopes into multiple levels to identify trend changes of different strength.

By dynamically adjusting positions, setting stops and filters, can more steadily track price trends.

## Summary

The Sizeblock strategy utilizes diagonal lines to intuitively display price trend changes and clearly identify support, resistance and breakout levels. But cannot solely rely on diagonal lines for judgment, need to incorporate analysis from other indicators and manage risks. This is a very valuable auxiliary tool to help traders better grasp market rhythm. Optimization can make the strategy more robust and efficient with great application potential.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2000 00:00 +0000)|(?Datetime)Start time|
|v_input_2|timestamp(01 Jan 2080 23:59 +0000)|Finish time|
|v_input_string_1|0|(?Main)Source: Close|HighLow|
|v_input_string_2|0|Deviation: Percentage|Ticks|
|v_input_float_1|true|Quantity|
|v_input_float_2|2|U-turn|
|v_input_string_3|0|Positions: Limit|Market|
|v_input_string_4|0|Direction: All|Buy|Sell|
|v_input_bool_1|false|Swapping|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// **********************************************************************************
// This code is invented and written by @StCogitans.
// The idea presented in this code and the rights to this code belong to @StCogitans.
// © https://www.tradingview.com/u/StCogitans
//
// Description.
// Sizeblock - a price change strategy in the form of diagonal rows.
// **********************************************************************************

// STRATEGY
string NAME        = 'Sizeblock'
string ACRONYM     = 'SB'
bool OVERLAY       = true
int PYRAMIDING     = 0
string QTY_TYPE    = strategy.percent_of_equity
float QTY_VALUE    = 100
float CAPITAL      = 100
string COM_TYPE    = strategy.commission.percent
float COM_VALUE    = 0.1
bool ON_CLOSE      = false
bool BAR_MAGNIFIER = false
bool OHLC          = true
strategy(NAME, ACRONYM, OVERLAY, pyramiding=PYRAMIDING, default_qty_type=QTY_TYPE, default_qty_value=QTY_VALUE, initial_capital=CAPITAL, commission_type=COM_TYPE, commission_value=COM_VALUE, process_orders_on_close=ON_CLOSE, use_bar_magnifier=BAR_MAGNIFIER, fill_orders_on_standard_ohlc=OHLC)

// ARGUMENTS
// Datetime
DTstart  = input(timestamp("01 Jan 2000 00:00 +0000"), 'Start time', group='Datetime')
DTfinish = input(timestamp("01 Jan 2080 23:59 +0000"), 'Finish time', group='Datetime')
DTperiod = true

// Main
dev_source = input.string('Close', title='Source', options=["Close", "HighLow"], tooltip='Price data for settlement.', group='Main')
dev_type   = input.string('Percentage', title='Deviation', options=['Percentage', 'Ticks'], tooltip='The type of deviation to calculate.', group='Main')
dev_value  = input.float(1, title='Quantity', minval=0.001, step=0.01, tooltip='Quantity to be calculated.', group='Main')
dev_back   = input.float(2, title='U-turn', minval=0.001, step=0.01, tooltip='Quantity for reversal.', group='Main')
mode       = input.string('Limit', title='Positions', options=['Limit', 'Market'], tooltip='Limit or market orders.', group='Main')
direct     = input.string('All', title='Direction', options=['All', 'Buy', 'Sell'], tooltip='The type of positions to be opened.', group='Main')
swapping   = input.bool(false, title='Swapping', tooltip='Swap points to open a new position.', group='Main')

// CALCULATION SYSTEM
Assembling(s, t, v, vb) =>

    float a = open
    float b = close
    float c = s == "HighLow" ? math.round_to_mintick(high) : math.round_to_mintick(b)
    float d = s == "HighLow" ? math.round_to_mintick(low) : math.round_to_mintick(b)

    float x = math.round_to_mintick(a)
    x := nz(x[1], x)

    float _v = t == "Ticks" ? syminfo.mintick * v : v
    float _vb = t == "Ticks" ? syminfo.mintick * vb : vb

    float h = t == "Ticks" ? math.round_to_mintick(x + _v) : math.round_to_mintick(x * (1 + _v / 100))
    float l = t == "Ticks" ? math.round_to_mintick(x - _v) : math.round_to_mintick(x * (1 - _v / 100))
    h := nz(h[1], h)
    l := nz(l[1], l)

    if t == "Ticks"
    
        if c >= h and b > a
            while c >= h
            
                x := h
                h := math.round_to_mintick(h + _v)
                l := math.round_to_mintick(x - _vb)
        
        if d <= l and b < a
            while d <= l
            
                x := l
                l := math.round_to_mintick(l - _v)
                h := math.round_to_mintick(x + _vb)

    else if t == "Percentage"
    
        if c >= h and b > a
            while c >= h
        
                x := h
                h := math.round_to_mintick(h * (1 + _v / 100))
                l := math.round_to_mintick(x * (1 - _vb / 100))

        if d <= l and b < a
            while d <= l
        
                x := l
                l := math.round_to_mintick(l * (1 - _v / 100))
                h := math.round_to_mintick(x * (1 + _vb / 100))

    [x, h, l]

[lx, lh, ll] = Assembling(dev_source, dev_type, dev_value, dev_back)

// PLOT
// Lines
plot_up   = plot(lh, color=color.new(color.green, 50), style=plot.style_line, linewidth=1)
plot_main = plot(lx, color=color.new(color.silver, 50), style=plot.style_line, linewidth=1)
plot_down = plot(ll, color=color.new(color.red, 50), style=plot.style_line, linewidth=1)

// Areas
fill(plot_up, plot_main, lh, lx, color.new(color.teal, 80), color.new(color.teal, 80))
fill(plot_main, plot_down, lx, ll, color.new(color.maroon, 80), color.new(color.maroon, 80))

// TRADING
// Alert variables
int Action = -1
int PosType = -1
int OrderType = -1
float Price = -1.0

// Direction variables
bool ifBuy = direct == "All" or direct == "Buy" ? true : false
bool ifSell = direct == "All" or direct == "Sell" ? true : false

// Market entries
if (strategy.closedtrades + strategy.opentrades == 0 or mode == "Market") and DTperiod
    if ((swapping and lx < nz(lx[1], lx)) or (not swapping and lx > nz(lx[1], lx))) and ifBuy
        Action := 1
        PosType := 1
        OrderType := 1
        Price := math.round_to_mintick(close)
        strategy.entry('Long', strategy.long)
    if ((swapping and lx > nz(lx[1], lx)) or (not swapping and lx < nz(lx[1], lx))) and ifSell
        Action := 2
        PosType := 2
        OrderType := 1
        Price := math.round_to_mintick(close)
        strategy.entry('Short', strategy.short)

// Closing positions by market
if DTperiod and mode == "Market"
    if direct == "Buy" and strategy.position_size > 0
        if swapping and lx > nz(lx[1], lx)
            Action := 2
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Long', comment='Close')
        if not swapping and lx < nz(lx[1], lx)
            Action := 2
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Long', comment='Close')
    if direct == "Sell" and strategy.position_size < 0
        if swapping and lx < nz(lx[1], lx)
            Action := 1
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Short', comment='Close')
        if not swapping and lx > nz(lx[1], lx)
            Action := 1
            PosType := 3
            OrderType := 1
            Price := math.round_to_mintick(close)
            strategy.close('Short', comment='Close')

// Limit entries and exits
if swapping and DTperiod and mode == "Limit"
    if strategy.position_size < 0
        Action := 1
        PosType := 1
        OrderType := 2
        Price := ll
        if ifBuy
            strategy.entry('Long', strategy.long, limit=ll)
        else
            PosType := 3
            strategy.exit('Exit', limit=ll)
    if strategy.position_size > 0
        Action := 2
        PosType := 2
        OrderType := 2
        Price := lh
        if ifSell
            strategy.entry('Short', strategy.short, limit=lh)
        else
            PosType := 3
            strategy.exit('Exit', limit=lh)
    if strategy.closedtrades + strategy.opentrades > 0 and strategy.position_size == 0
        if ifBuy
            Action := 1
            PosType := 1
            OrderType := 2
            Price := ll
            strategy.entry('Long', strategy.long, limit=ll)
        if ifSell
            Action := 2
            PosType := 2
            OrderType := 2
            Price := lh
            strategy.entry('Short', strategy.short, limit=lh)
if not swapping and DTperiod and mode == "Limit"
    if strategy.position_size < 0
        Action := 1
        PosType := 1
        OrderType := 2
        Price := lh
        if ifBuy
            strategy.entry('Long', strategy.long, stop=lh)
        else
            PosType := 3
            strategy.exit('Exit', stop=lh)
    if strategy.position_size > 0
        Action := 2
        PosType := 2
        OrderType := 2
        Price := ll
        if ifSell
            strategy.entry('Short', strategy.short, stop=ll)
        else
            PosType := 3
            strategy.exit('Exit', stop=ll)
    if strategy.closedtrades + strategy.opentrades > 0 and strategy.position_size == 0
        if ifBuy
            Action := 1
            PosType := 1
            OrderType := 2
            Price := lh
            strategy.entry('Long', strategy.long, stop=lh)
        if ifSell
            Action := 2
            PosType := 2
            OrderType := 2
            Price := ll
            strategy.entry('Short', strategy.short, stop=ll)

// Everything is closed and canceled
if not DTperiod
    strategy.cancel_all()
    strategy.close_all(comment='Close')

// Alerts
// Convert to string variables
string Action_Txt = Action == 1 ? "Buy" : Action == 2 ? "Sell" : na
string PosType_Txt = PosType == 1 ? "Long" : PosType == 2 ? "Short" : PosType == 3 ? "Flat" : na
string OrderType_Txt = OrderType == 1 ? "Market" : OrderType == 2 ? "Limit" : na
string Price_Txt = Price > 0 ? str.tostring(Price) : na

// Output
if not (Action == nz(Action[1], Action) and Price == nz(Price[1], Price) and OrderType == nz(OrderType[1], OrderType)) and DTperiod
    alert('{"pair": "' + syminfo.ticker + '", "direction": "' + Action_Txt + '", "entertype": "' + OrderType_Txt + '", "position": "' + PosType_Txt + '", "price": "' + Price_Txt + '"}')

// *********************
// Good job, Soldier! ;>
// *********************
```

> Detail

https://www.fmz.com/strategy/431209

> Last Modified

2023-11-06 09:20:34
