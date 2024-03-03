
> Name

多尼昌趋势跟踪策略Donchian-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bdc9865aa167bb7acc.png)
 [trans]
## 概述

多尼昌趋势跟踪策略是根据文章“Black Box Trend Following – Lifting the Veil”中描述的多尼昌通道原理开发的趋势跟踪策略。该策略利用多尼昌通道判断价格趋势,根据价格创新高或创新低来建仓做多或做空。

## 策略原理

策略基于多尼昌通道指标判断趋势方向。多尼昌通道由一个较长周期的通道和一个较短周期的通道组成。当价格突破较长周期的通道时,判断为趋势开始;当价格突破较短周期的通道时,判断为趋势结束。

具体来说,较长周期通道长度为50天或20天,较短周期通道长度为50天、20天或10天。如果价格等于50天内的最高价,则开多单;如果价格等于50天内的最低价,则开空单。如果价格等于20天或10天内的最低价,则平掉多单;如果价格等于20天或10天内的最高价,则平掉空单。

这样,通过两个不同周期多尼昌通道的组合,可以在趋势开始时确定方向建仓,在趋势结束时及时止损离场。

## 优势分析

该策略主要有以下优势:

1. 捕捉趋势的能力强。通过突破多尼昌通道判断趋势开始和结束,可以有效跟踪趋势。

2. 风险控制到位。采用移动止损来控制单笔损失。

3. 参数调整灵活。可以自由选择通道的周期组合,适应不同品种和市场环境。

4. 简单明确的交易逻辑。容易理解和实施。

## 风险分析 

该策略也存在以下风险:

1. 无法适应震荡市。当趋势不明显时,将出现多次小幅度的调整,带来止损损失。

2. 突破失败风险。价格突破通道后可能再次回调,造成止损。

3. 周期选择风险。如果通道周期设定不当,将导致trading in noise。

4. 夏普比率下降风险。如果加大仓位而不调整止损幅度,将面临夏普比率下降的风险。

对应解决方法:
1. 优化参数,选择合适的通道周期组合。
2. 适当调整仓位和止损幅度,控制风险。
3. 在趋势明显的品种和市场使用该策略。

## 优化方向 

该策略可以从以下几个方向进行优化:

1. 增加过滤条件,避免whipsaws。例如结合量能指标等判断真实突破。

2. 优化通道周期的组合和仓位控制,提高盈亏比。可以引入自适应止损机制。

3. 尝试breakpoint优化,找到最佳的参数组合。

4. 增加机器学习算法,实现参数的动态优化和调整。

## 总结

多尼昌趋势跟踪策略通过双通道判断价格趋势开始和结束,采取趋势跟踪的交易方式,有效控制单笔损失。该策略参数调整灵活,易于实施,是一个非常实用的趋势跟踪策略。但也需要注意在震荡行情下的盈利能力不足以及参数选择带来的风险。通过进一步优化,可以获得更好的策略效果。

||

## Overview

The Donchian Trend Following strategy is developed based on the Donchian Channel principle described in the article "Black Box Trend Following – Lifting the Veil". This strategy uses the Donchian Channel to determine the trend direction and establishes long or short positions when prices hit new highs or lows.  

## Strategy Logic  

The strategy is based on the Donchian Channel indicator to judge the trend direction. The Donchian Channel consists of a longer period channel and a shorter period channel. When the price breaks through the longer period channel, it signals the start of a trend. When the price breaks through the shorter period channel, it signals the end of the trend.   

Specifically, the longer period channel length is 50 days or 20 days, and the shorter period channel length is 50 days, 20 days or 10 days. If the price equals the highest price in 50 days, a long position is opened. If the price equals the lowest price in 50 days, a short position is opened. If the price equals the lowest price in 20 or 10 days, long positions are closed. If the price equals the highest price in 20 or 10 days, short positions are closed.  

By combining two Donchian Channels of different periods, it can determine the direction to establish positions when a trend starts, and realize timely stop loss when the trend ends.  

## Advantage Analysis   

The main advantages of this strategy are:  

1. Strong ability to capture trends. It can track trends effectively by identifying the start and end of trends using Donchian Channel breakouts.   

2. Proper risk control. It uses a moving stop loss to control single trade loss.  

3. Flexible parameter adjustment. The combination of channel periods can be freely selected to adapt to different products and market environments.  

4. Simple and clear trading logic. It is easy to understand and implement.

## Risk Analysis

The risks of this strategy include:

1. Inability to adapt to range-bound markets. It will suffer consecutive small stop loss when the trend is unclear.  

2. Breakout failure risk. Prices may pullback after breaching the channel, causing stop loss. 

3. Period selection risk. Inappropriate channel period settings may lead to trading in noise.  

4. Sharpe ratio decline risk. Increasing position size without adjusting stop loss may lead to declining Sharpe ratio.

The solutions are:
1. Optimize parameters to select suitable channel period combinations.  
2. Adjust position size and stop loss properly to control risk.
3. Use this strategy for products and markets with obvious trends.  

## Optimization Directions

The optimization directions for this strategy:  

1. Adding filter conditions to avoid whipsaws, e.g. combining volume to judge true breakouts.

2. Optimizing channel period combination and position sizing to increase profit ratio. Adaptive stop loss can be introduced.  

3. Trying breakpoint optimization to find optimal parameter sets. 

4. Increasing machine learning algorithms for dynamic optimization and adjustment of parameters.

## Conclusion  

The Donchian Trend Following Strategy identifies the start and end of price trends using dual channels, and adopts trend following trading style with effective single trade loss control. This strategy has flexible parameter adjustment and easy implementation, making itself a very practical trend following strategy. But the insufficient profitability in range-bound markets and risks from parameter selection should be noted. Further optimizations can lead to better strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Length: 50/50|50/20|20/10|20/20|100/100|
|v_input_bool_1|true|Permit long|
|v_input_bool_2|true|Permit short|
|v_input_float_1|0.5|Position Risk %|
|v_input_float_2|2|ATR mult|
|v_input_int_1|20|ATR Length|
|v_input_bool_3|true|Close in end|
|v_input_bool_4|false|Permit stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Donchian", overlay=true,
     pyramiding=0, initial_capital=1000,
     commission_type=strategy.commission.cash_per_order,
     commission_value=2, slippage=2)

// =============================================================================
// VARIABLES
// =============================================================================

donch_string = input.string(title="Length", options = ['20/10','50/20', '50/50', '20/20', '100/100'], defval='50/50')
permit_long  = input.bool(title = 'Permit long', defval = true)
permit_short  = input.bool(title = 'Permit short', defval = true)
risk_percent = input.float(title="Position Risk %", defval=0.5, step=0.25)
stopOffset = input.float(title="ATR mult", defval=2.0, step=0.5)
atrLen = input.int(title="ATR Length", defval=20)
close_in_end  = input.bool(title = 'Close in end', defval = true)
permit_stop  = input.bool(title = 'Permit stop', defval = false)

// =============================================================================
// CALCULATIONS
// =============================================================================

donch_len_big = 
 donch_string == '50/20' ? 50 : 
 donch_string == '50/50' ? 50 : 
 donch_string == '20/20' ? 20 : 
 donch_string == '20/10' ? 20 : 
 donch_string == '100/100' ? 100 : 
 na
donch_len_small = 
 donch_string == '50/20' ? 20 : 
 donch_string == '50/50' ? 50 : 
 donch_string == '20/20' ? 20 : 
 donch_string == '20/10' ? 10 : 
 donch_string == '100/100' ? 100 : 
 na

big_maxclose = ta.highest(close, donch_len_big)
big_minclose = ta.lowest(close, donch_len_big)
small_maxclose = ta.highest(close, donch_len_small)
small_minclose = ta.lowest(close, donch_len_small)

atrValue = ta.atr(atrLen)[1]

tradeWindow  = true

// =============================================================================
// NOTOPEN QTY
// =============================================================================

risk_usd = (risk_percent / 100) * strategy.equity
atr_currency = (atrValue * syminfo.pointvalue)
notopen_qty = risk_usd / (stopOffset * atr_currency)

// =============================================================================
// LONG STOP
// =============================================================================

long_stop_price = 0.0
long_stop_price := 
 strategy.position_size > 0 and na(long_stop_price[1]) ? strategy.position_avg_price - stopOffset * atrValue : 
 strategy.position_size > 0 and strategy.openprofit > risk_usd ? strategy.position_avg_price:
 strategy.position_size > 0 ? long_stop_price[1] : 
 na

// =============================================================================
// SHORT STOP
// =============================================================================

short_stop_price = 0.0
short_stop_price := 
 strategy.position_size < 0 and na(short_stop_price[1]) ? strategy.position_avg_price + stopOffset * atrValue : 
 strategy.position_size < 0 and strategy.openprofit > risk_usd ? strategy.position_avg_price :
 strategy.position_size < 0 ? short_stop_price[1] : 
 na

// =============================================================================
// PLOT VERTICAL COLOR BAR
// =============================================================================

cross_up = strategy.position_size <= 0 and close == big_maxclose and close >= syminfo.mintick and tradeWindow and permit_long
cross_dn =  strategy.position_size >= 0 and close == big_minclose and close >= syminfo.mintick and tradeWindow and permit_short
bg_color = cross_up ? color.green : cross_dn ? color.red : na
bg_color := color.new(bg_color, 70)
bgcolor(bg_color)

// =============================================================================
// PLOT DONCHIAN LINES
// =============================================================================

s1 = cross_up ? na : cross_dn ? na : strategy.position_size != 0 ? strategy.position_avg_price : na
s2 = cross_up ? na : cross_dn ? na : strategy.position_size > 0 ? small_minclose : strategy.position_size < 0 ? small_maxclose : na
s3 = cross_up ? na : cross_dn ? na : not permit_stop ? na : 
 strategy.position_size > 0 ? long_stop_price : strategy.position_size < 0 ? short_stop_price : na

plot(series=big_maxclose, style=plot.style_linebr, color=color.black, linewidth=1, title="Donch Big Maxclose Black")
plot(series=big_minclose, style=plot.style_linebr, color=color.black, linewidth=1, title="Donch Big Minclose Black")

plot(series=s1, style=plot.style_linebr, color=color.yellow, linewidth=2, title="Entry Yellow")
plot(series=s2, style=plot.style_linebr, color=color.red, linewidth=1, title="Donch Small Red")
plot(series=s3, style=plot.style_linebr, color=color.fuchsia, linewidth=2, title="Stop Fuchsia")

// =============================================================================
// ENTRY ORDERS
// =============================================================================

if strategy.position_size <= 0 and close == big_maxclose and close >= syminfo.mintick and tradeWindow and permit_long
    strategy.entry("Long", strategy.long, qty=notopen_qty)

if strategy.position_size >= 0 and close == big_minclose and close >= syminfo.mintick and tradeWindow and permit_short
    strategy.entry("Short", strategy.short, qty=notopen_qty)

// =============================================================================
// EXIT ORDERS
// =============================================================================

if strategy.position_size > 0 and permit_stop
    strategy.exit(id="Stop", from_entry="Long", stop=long_stop_price)

if strategy.position_size < 0 and permit_stop
    strategy.exit(id="Stop", from_entry="Short", stop=short_stop_price)

// ==========

if strategy.position_size > 0 and close == small_minclose and not barstate.islast
    strategy.close(id="Long", comment='Donch')

if strategy.position_size < 0 and close == small_maxclose and not barstate.islast
    strategy.close(id="Short", comment='Donch')

// ==========

if close_in_end
    if not tradeWindow
        strategy.close_all(comment='Close in end')

// =============================================================================
// END
// =============================================================================
```

> Detail

https://www.fmz.com/strategy/440557

> Last Modified

2024-01-31 16:53:31
