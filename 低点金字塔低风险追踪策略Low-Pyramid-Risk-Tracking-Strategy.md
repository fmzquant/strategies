
> Name

低点金字塔低风险追踪策略Low-Pyramid-Risk-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/190799ca3c70c5fb0ef.png)
[trans]

本策略通过组合不同指标识别价格Movement中的潜在低点,并通过金字塔追踪逐步建仓的方式降低风险。该策略同时结合了止损、止盈、移动止损等功能,可以有效控制风险。

## 策略概述

该策略首先使用RSI和EMA RSI的差值来识别价格的潜在低点。为了过滤假信号,策略还结合了移动平均线和多时间框架随机指标进行确认。一旦确认低点信号,就会在该点稍低的位置逐步建立多单,这就是追踪金字塔的思路。策略允许最多开设12个追踪订单,每个订单的数量会按顺序递增,这可以有效分散风险。所有订单会跟随一个整体止损位进行退出,同时还允许为每个订单单独设置止盈。为了进一步控制风险,该策略还设置了基于账户权益百分比的整体止损。

## 策略原理

该策略主要由低点识别模块、金字塔追踪模块、风险控制模块三个部分组成。

**低点识别模块**使用RSI指标和其EMA之间的差值来识别价格的潜在低点。为了提高准确性,还引入了移动平均线指标和多时间框架随机指标进行信号过滤。只有当价格低于移动平均线,而随机指标K线又低于30时,才会确认低点信号的有效性。

**金字塔追踪模块**是本策略的核心。一旦确认低点信号,策略就会在比该低点再低0.1%的位置开设第一单。之后只要价格继续下跌且低于平均入场价一定比例,就会继续追加多单。新增订单的数量会依次递增,例如第三个订单的数量是第一个订单的3倍。这种金字塔追踪方式可以平均风险。本策略最多允许开设12个追踪订单。

**风险控制模块**主要包括三个方面。第一是整体止损,根据最近一定周期内最高价计算的止损位。所有订单会跟随这个止损位同时止损。第二是每个订单独立的止盈设置,允许按照入场价的一定比例来止盈。第三是基于账户权益比例的整体止损,这是最强的风险控制手段。

## 策略优势

- 利用金字塔追踪降低个别订单的风险,同时分散总体风险
- 多指标组合提高低点识别的准确性
- 整体止损、止盈和移动止损功能能有效控制风险
- 权益比例止损机制保护账户免受重大损失
- 可通过调整参数找到风险与收益的平衡点

## 策略风险

- 低点识别准确性仍有一定局限,可能错过最佳入场点或进入假信号
- 追加订单时可能面临不利行情,加重亏损
- 需要较长的运行周期来体现策略的优势
- 参数设置不当可能导致风险控制不足

为降低上述风险,可以从以下几个方面进行优化:

1. 更换或增加指标,提高低点识别的准确性
2. 优化订单数量、间隔、止盈幅度等参数,减少单笔订单的风险
3. 适当缩短止损幅度,保护利润
4. 测试不同品种,选择流动性好、波动较大的品种

## 策略优化方向 

该策略仍有进一步优化的空间:

1. 尝试引入机器学习等更先进的技术识别低点
2. 根据市场状态动态调整订单数量、止损幅度等参数
3. 增加箱体内止损策略,避免亏损扩大
4. 增加重新入场机制
5. 优化股票和数字货币品种的策略参数

## 总结

本策略通过金字塔追踪的思路有效降低了单笔订单的风险,整体止损、止盈、移动止损等功能也起到了很好的风险控制作用。但低点识别等方面仍有优化空间,如果能引入更先进的技术,增加动态调参功能,再配合参数优化,本策略的收益风险比将会得到大幅提升。

||


This strategy identifies potential low points in price movement through a combination of different indicators and gradually builds positions through pyramiding to reduce risk. The strategy also incorporates functions such as stop loss, take profit, and trailing stop loss to effectively control risk.

## Strategy Overview  

The strategy first uses the difference between RSI and EMA RSI to identify potential price lows. To filter out false signals, the strategy also combines moving average and multi-timeframe stochastic indicator for confirmation. Once the low point signal is confirmed, long positions will be gradually built at slightly lower prices from that point through pyramiding. The strategy allows up to 12 tracking orders to be opened, with the size of each order increasing in sequence, which can effectively diversify risks. All orders will follow an overall stop loss to exit, while allowing to set take profit separately for each order. To further control risks, the strategy also sets an overall stop loss based on equity percentage.   

## Strategy Principle  

The strategy consists of three main modules: low point identification, pyramid tracking and risk control.

The **low point identification module** uses the difference between RSI and its EMA to identify potential price lows. To improve accuracy, moving average indicator and multi-timeframe stochastic indicators are introduced for signal filtering. Only when price is below moving average and stochastic K line is below 30, the validity of the low point signal will be confirmed.

The **pyramid tracking module** is the core of this strategy. Once the low point signal is confirmed, the strategy will open the first position at 0.1% below that low point. Afterwards, as long as price keeps falling and is below certain percentage of average entry price, more long orders will be added. The size of new orders will increase in sequence, for example the third order is 3 times the first order size. This pyramid tracking approach helps averaging risks. The strategy allows up to 12 tracking orders.   

The **risk control module** includes three aspects. First is the overall stop loss based on highest price in recent periods. All orders will follow this stop loss. Second is independent take profit setting for each order, which allows to close order based on certain percentage of entry price. Third is overall stop loss based on percentage of account equity, which is the strongest risk control method.

## Strategy Advantages  

- Pyramid tracking reduces risk of individual orders while diversifying overall risk  
- Combination of indicators improves accuracy of low point identification   
- Overall stop loss, take profit and trailing stop functions effectively control risk
- Equity stop loss protects account from significant losses  
- Parameters can be tuned to balance risk vs reward

## Strategy Risks  

- Low point identification still has some limitation, may miss best entry point or get into false signal
- Facing adverse market when adding orders may increase loss  
- Needs relatively long period to reflect the advantage   
- Inappropriate parameter setting may lead to insufficient risk control   

To reduce above risks, some aspects can be optimized:

1. Change or add indicators to improve low point identification accuracy  
2. Optimize number of orders, intervals, take profit percentage etc to lower risk per order
3. Moderately tighten stop loss level to protect profits  
4. Test different products with good liquidity and large fluctuation

## Strategy Optimization  

There is still room for further optimization of this strategy:  

1. Try introducing more advanced techniques like machine learning for low point identification
2. Dynamically adjust order quantity, stop loss level etc based on market condition  
3. Add box stop loss mechanism to avoid expanding losses
4. Add re-entry mechanism  
5. Optimize parameters for stocks and crypto currencies  

## Summary  

This strategy effectively reduces risks of individual orders through pyramid tracking approach, and overall stop loss, take profit, trailing stop functions also play very good role of risk control. But there is still room for improving low point identification and other aspects. If more advanced techniques can be introduced, dynamic adjustment of parameters can be added, combined with parameter optimization, the risk reward ratio of this strategy could be greatly improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 April 2021 20:00)|(?Backtest Window)Start Time|
|v_input_2|timestamp(01 Aug 2030 20:00)|End Time|
|v_input_float_1|100|(?Risk - Portfolio)Portfolio %|
|v_input_int_1|true|Leverage|
|v_input_string_1|0|(?Risk - Order Size)Order Size Mode: multiply|base|
|v_input_int_2|true|Order Size Divider (Multiply Mode)|
|v_input_bool_1|false|Fixed Order Size|
|v_input_float_2|true|. . Base Currency:|
|v_input_bool_2|false|(?Risk - Stop Loss)StopLoss of|
|v_input_float_3|1.5|stopLoss|
|v_input_string_2|0|% of: equity|avg_price|
|v_input_int_3|100|(?Risk - Stop Level)Stop Level Length|
|v_input_float_4|0.3|Deviatation % above Stop Level|
|v_input_bool_3|true|(?Risk - Take Profit)Take Profit/Trailing Stop|
|v_input_float_5|true|..........%|
|v_input_bool_4|true|Exit Crossover Take Profit and .....|
|v_input_string_3|0|exit_mode: stoplevel|close|
|v_input_float_6|10|Take Profit % per Order|
|v_input_int_4|12|(?Pyramiding Settings)Max Number of Orders|
|v_input_float_7|0.2|Next Order % below Avg. Price|
|v_input_int_5|false|Next Order after X candles|
|v_input_int_6|5|(?MTF LowFinder Settings)Lookback of RSI|
|v_input_int_7|true|Higher TimeFrame Multiplier RSI|
|v_input_int_8|26|MA Length / Sensitivity|
|v_input_float_8|0.1|First Order % below Low|
|v_input_int_9|100|(?Moving Average Filter)Moving Average Length|
|v_input_int_10|14|(?MTF Stochastic Filter)K|
|v_input_int_11|3|D|
|v_input_int_12|3|Smooth|
|v_input_int_13|30|MTF Stoch Filter (above gets filtered)|
|v_input_int_14|10|Higher TimeFrame Multiplier|
|v_input_bool_5|true|(?Plots)Plot Average Price|
|v_input_bool_6|false|Plot Moving Average|
|v_input_bool_7|false|Plot Trailing Stop Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © A3Sh
//@version=5

// Strategy that finds potential lows in the price action and spreads the risk by entering multiple positions at these lows.
// The low is detected based on the difference between MTF RSI and EMA based RSI, Moving Average and MTF Stochastic indicators.
// The size of each next position that is entered is multiplied by the sequential number of the position.
// Each separate position can exit when a specified take profit is triggered and re-open when detecting a new potential low.
// All positions are closed when the price action crosses over the dynamic blue stop level line.

// This strategy combines open-source code developed by fellow Tradingview community members: 
// The Lowfinder code is developed by RafaelZioni
// https://www.tradingview.com/script/GzKq2RVl-Low-finder/
// Both the MTF RSI code and the MTF Stochastic code are adapted from the MTFindicators libary written by Peter_O
// https://www.tradingview.com/script/UUVWSpXR-MTFindicators/

// The Stop Level calculation is inspired by the syminfo-mintick tutorial on Kodify.net
// https://kodify.net/tradingview/info/syminfo-mintick/

strategy("LowFinder_PyraMider", 
         overlay=true, pyramiding=99, 
         precision=2,
         initial_capital=10000, 
         default_qty_type=strategy.percent_of_equity, 
         default_qty_value=10,
         commission_type=strategy.commission.percent, 
         commission_value=0.06,
         slippage=1
         )


// Backtest Window
start_time   = input(defval=timestamp("01 April 2021 20:00"), group = "Backtest Window", title="Start Time")
end_time     = input(defval=timestamp("01 Aug 2030 20:00"),   group = "Backtest Window", title="End Time")
window() => true


// Inputs
portfolio_size  = input.float  (100,         group = 'Risk - Portfolio',       title = 'Portfolio %', step=1.0) / 100
leverage        = input.int    (1,           group = 'Risk - Portfolio',       title = 'Leverage', minval = 1)
q_mode          = input.string ('multiply',  group = 'Risk - Order Size',      title = 'Order Size Mode', options = ['base', 'multiply'], tooltip = 'Base mode: the base quantiy for each sequential order. Multiply mode: each quantity is multiplied by order number')
q_mode_m        = input.int    (1,           group = 'Risk - Order Size',      title = 'Order Size Divider (Multiply Mode)',  tooltip = 'Divide Multiply by this number to lower the sequential order sizes')
fixed_q         = input.bool   (false,       group = 'Risk - Order Size',      title = 'Fixed Order Size',     inline = '01', tooltip = 'Use with caution! Overrides all Risk calculations')
amount_q        = input.float  (1,           group = 'Risk - Order Size',      title = '. . Base Currency:',   inline = '01')
sl_on           = input.bool   (false,       group = 'Risk - Stop Loss',       title = 'StopLoss of',          inline = '03')
stopLoss        = input.float  (1.5,         group = 'Risk - Stop Loss',       title = '',   step=0.1,         inline = '03') / 100
sl_mode         = input.string ('equity',    group = 'Risk - Stop Loss',       title = '% of',  options = ['avg_price', 'equity'], inline = '03')
stop_len        = input.int    (100,         group = 'Risk - Stop Level',      title = 'Stop Level Length', tooltip = 'Lookback most recent highest high')
stop_deviation  = input.float  (0.3,         group = 'Risk - Stop Level',      title = 'Deviatation % above Stop Level', step=0.1) / 100
cond2_toggle    = input.bool   (true ,       group = 'Risk - Take Profit',     title = 'Take Profit/Trailing Stop', inline = '04')
tp_all          = input.float  (1.0,         group = 'Risk - Take Profit',     title = '..........%', step=0.1,     inline = '04') / 100
tp_on           = input.bool   (true,        group = 'Risk - Take Profit',     title = 'Exit Crossover Take Profit and .....', inline = '02')
exit_mode       = input.string ('stoplevel', group = 'Risk - Take Profit',     title = '',   options = ['close', 'stoplevel'], inline = '02')
takeProfit      = input.float  (10.0,        group = 'Risk - Take Profit',     title = 'Take Profit % per Order', tooltip = 'Each separate order exits when hit', step=0.1)
posCount        = input.int    (12,          group = 'Pyramiding Settings',    title = 'Max Number of Orders')
next_entry      = input.float  (0.2,         group = 'Pyramiding Settings',    title = 'Next Order % below Avg. Price', step=0.1)
oa_lookback     = input.int    (0,           group = 'Pyramiding Settings',    title = 'Next Order after X candles', tooltip = 'Prevents opening too much orders in a Row')
len_rsi         = input.int    (5,           group = 'MTF LowFinder Settings', title = 'Lookback of RSI')
mtf_rsi         = input.int    (1,           group = 'MTF LowFinder Settings', title = 'Higher TimeFrame Multiplier RSI',  tooltip='Multiplies the current timeframe by specified value')
ma_length       = input.int    (26,          group = 'MTF LowFinder Settings', title = 'MA Length / Sensitivity')
new_entry       = input.float  (0.1,         group = 'MTF LowFinder Settings', title = 'First Order % below Low',step=0.1, tooltip = 'Open % lower then the found low')/100
ma_signal       = input.int    (100,         group = 'Moving Average Filter',  title = 'Moving Average Length')
periodK         = input.int    (14,          group = 'MTF Stochastic Filter',  title = 'K',      minval=1)
periodD         = input.int    (3,           group = 'MTF Stochastic Filter',  title = 'D',      minval=1)
smoothK         = input.int    (3,           group = 'MTF Stochastic Filter',  title = 'Smooth', minval=1)
lower           = input.int    (30,          group = 'MTF Stochastic Filter',  title = 'MTF Stoch Filter (above gets filtered)')
mtf_stoch       = input.int    (10,          group = 'MTF Stochastic Filter',  title = 'Higher TimeFrame Multiplier', tooltip='Multiplies the current timeframe by specified value')
avg_on          = input.bool   (true,        group = 'Plots',                  title = 'Plot Average Price')
plot_ma         = input.bool   (false,       group = 'Plots',                  title = 'Plot Moving Average')
plot_ts         = input.bool   (false,       group = 'Plots',                  title = 'Plot Trailing Stop Level')


// variables //
var entry_price     = 0.0    // The entry price of the first entry
var previous_entry  = 0.0    // Stores the price of the previous entry
var iq              = 0.0    // Inititial order quantity before risk calculation
var nq              = 0.0    // Updated new quantity after the loop
var oq              = 0.0    // Old quantity at the beginning or the loop
var q               = 0.0    // Final calculated quantity used as base order size
var int order_after = 0



// Order size calaculations // 

// Order size based on max amount of pyramiding orders or fixed by user input ///
// Order size calculation based on 'base' mode or ' multiply' mode //
if fixed_q
    q := amount_q
else if q_mode == 'multiply'
    iq := (math.abs(strategy.equity * portfolio_size  / posCount) / open) * leverage
    oq := iq
    for i = 0 to posCount
        nq := oq + (iq * ( i/ q_mode_m + 1))
        oq := nq 
    q := (iq  * posCount /  oq) * iq

else
    q := (math.abs(strategy.equity * portfolio_size  / posCount) / open) * leverage

// Function to calcaulate final order size based on order size modes and round the result with 1 decimal //
quantity_mode(index,string q_mode) =>
    q_mode == 'base' ? math.round(q,1) : q_mode == 'multiply' ? math.round(q * (index/q_mode_m  + 1),1) : na



// LowFinder Calculations //
// MTF RSI by Peter_O //
rsi_mtf(float source, simple int mtf,simple int len) =>
    change_mtf=source-source[mtf]
    up_mtf = ta.rma(math.max(change_mtf, 0), len*mtf)
    down_mtf = ta.rma(-math.min(change_mtf, 0), len*mtf)
    rsi_mtf = down_mtf == 0 ? 100 : up_mtf == 0 ? 0 : 100 - (100 / (1 + up_mtf / down_mtf))

// Lowfinder by RafaelZioni //
vrsi = rsi_mtf(close,mtf_rsi,len_rsi)

pp=ta.ema(vrsi,ma_length)
dd=(vrsi-pp)*5
cc=(vrsi+dd+pp)/2

lows=ta.crossover(cc,0) 



// MTF Stoch Calcualation // MTF Stoch adapted from  Peter_O //
stoch_mtfK(source, mtf, len) =>

    k = ta.sma(ta.stoch(source, high, low, periodK * mtf), smoothK * mtf)
    
stoch_mtfD(source, mtf, len) =>

    k = ta.sma(ta.stoch(source, high, low, periodK * mtf), smoothK * mtf)
    d = ta.sma(k, periodD * mtf)
    
mtfK = stoch_mtfK(close, mtf_stoch, periodK)
mtfD = stoch_mtfD(close, mtf_stoch, periodK)



// Open next position % below average position price //
below_avg = close < (strategy.position_avg_price * (1 - (next_entry / 100)))



// Moving Average Filter //
moving_average_signal = ta.sma(close, ma_signal)
plot (plot_ma ? moving_average_signal : na, title = 'Moving Average', color = color.rgb(154, 255, 72))



// Buy Signal //
buy_signal = lows and close < moving_average_signal and mtfK < lower
// First Entry % Below lows //
if buy_signal
    entry_price := close * (1 - new_entry)



// Plot Average Price of Position//
plot (avg_on  ? strategy.position_avg_price : na, title = 'Average Price', style = plot.style_linebr, color = color.new(color.white,0), linewidth = 1)



// Take profit per Open Order //
take_profit_price = close * takeProfit / 100 / syminfo.mintick



// Calculate different Stop Level conditions to exit All //

// Stop Level Caculation //
stop_long1_level = ta.highest (high, stop_len)[1]  * (1 + stop_deviation)
stop_long2_level = ta.highest (high, stop_len)[2]  * (1 + stop_deviation)
stop_long3_level = ta.highest (high, stop_len)[3]  * (1 + stop_deviation)
stop_long4_level = ta.highest (high, stop_len)[1]  * (1 - 0.008) 
// Stop triggers //
stop_long1 = ta.crossover(close,stop_long1_level)
stop_long2 = ta.crossover(close,stop_long2_level)
stop_long4 = ta.crossunder(close,stop_long4_level)
// Exit Conditions, cond 1 only Stop Level, cond2 Trailing Stop option //
exit_condition_1 = close < strategy.position_avg_price ? stop_long1 : close > strategy.position_avg_price ? stop_long2 : na
exit_condition_2 = close < strategy.position_avg_price * (1 + tp_all) ? stop_long2 : 
                   close > strategy.position_avg_price * (1 + tp_all) ? stop_long4 :
                   close < strategy.position_avg_price ? stop_long1 : na
// Switch between conditions //
exit_conditions = cond2_toggle ? exit_condition_2 : exit_condition_1

// Exit when take profit //
ex_m = exit_mode == 'close' ? close : stop_long2_level
tp_exit = ta.crossover(ex_m, strategy.position_avg_price * (1 + tp_all)) and close > strategy.position_avg_price * 1.002

// Plot stoplevel, take profit level //
plot_stop_level    = strategy.position_size > 0 ? stop_long2_level : na
plot_trailing_stop = cond2_toggle and plot_ts and strategy.position_size > 0 and close > strategy.position_avg_price * (1 + tp_all) ? stop_long4_level : na

plot(plot_stop_level,    title = 'Stop Level',    style=plot.style_linebr, color = color.new(#41e3ff, 0), linewidth = 1)
plot(plot_trailing_stop, title = 'Trailing Stop', style=plot.style_linebr, color = color.new(#4cfca4, 0), linewidth = 1)

plot_tp_level = cond2_toggle and strategy.position_size > 0 ? strategy.position_avg_price * (1 + tp_all) : na
plot(plot_tp_level, title = 'Take Profit Level', style=plot.style_linebr, color = color.new(#ff41df, 0), linewidth = 1)



// Calculate Stop Loss based on equity and average price //
loss_equity = ((strategy.position_size * strategy.position_avg_price) - (strategy.equity * stopLoss)) / strategy.position_size
loss_avg_price = strategy.position_avg_price * (1 - stopLoss)
stop_loss = sl_mode == 'avg_price' ? loss_avg_price : loss_equity
plot(strategy.position_size > 0  and sl_on ? stop_loss : na, title = 'Stop Loss', color=color.new(color.red,0),style=plot.style_linebr, linewidth = 1)



// Enter first position //
if ta.crossunder(close,entry_price) and window() and strategy.position_size == 0
    strategy.entry('L_1', strategy.long, qty = math.round(q,1), comment = '+' + str.tostring(math.round(q,1)))
    previous_entry := close


// Enter next pyramiding positions //
if buy_signal and window() and strategy.position_size > 0 and below_avg
    order_after := order_after + 1
    for i = 1 to strategy.opentrades
        entry_comment = '+' + str.tostring((quantity_mode(i,q_mode))) // Comment with variable //
        if strategy.opentrades == i and i < posCount and order_after > oa_lookback
            entry_price := close
            entry_id = 'L_' + str.tostring(i + 1) 
            strategy.entry(id = entry_id, direction=strategy.long, limit=entry_price, qty= quantity_mode(i,q_mode), comment = entry_comment)
            previous_entry := entry_price
            order_after := 0


// Exit per Position //
if strategy.opentrades > 0 and window() 
    for i = 0 to strategy.opentrades 
        exit_comment = '-' + str.tostring(strategy.opentrades.size(i))
        exit_from = 'L_' + str.tostring(i + 1)
        exit_id = 'Exit_' + str.tostring(i + 1)
        strategy.exit(id= exit_id, from_entry= exit_from, profit = take_profit_price, comment = exit_comment)
            

// Exit All //
if exit_conditions or (tp_exit and tp_on and cond2_toggle) and window()
    strategy.close_all('Exti All')
    entry_price := 0

if ta.crossunder(close,stop_loss)  and sl_on and window()
    strategy.close_all('StopLoss')
    entry_price := 0
    




```

> Detail

https://www.fmz.com/strategy/436223

> Last Modified

2023-12-22 12:56:36
