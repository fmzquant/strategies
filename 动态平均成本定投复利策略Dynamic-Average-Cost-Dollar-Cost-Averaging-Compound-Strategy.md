
> Name

动态平均成本定投复利策略Dynamic-Average-Cost-Dollar-Cost-Averaging-Compound-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/198c51b795f2997eeab.png)
[trans]

#### 概述

动态平均成本定投复利策略通过动态调整每次开仓的数量,在趋势开始阶段先少量开仓建仓,随着盘整深度的增加逐步加大仓位。策略采用指数函数计算每层止损价位,并在触发重新分批开新仓,从而能使持仓成本线保持以指数级下行。随着深度的增加,仓位成本可以逐步向下压缩,待价格反转之后分批止盈出场,获取更大收益。

#### 策略原理

该策略由简易的RSI超卖点位信号组合均线选时方式选择开仓时机。当RSI低于超卖线并且收盘价格小于均线时产生首单开仓信号。 首单开仓后,根据指数函数计算价格跌破幅度的下限,产生DCA信号。每次DCA后,调整持仓量使得每手头寸相等。由于持仓量和持仓成本的动态变化,这就起到了类似于杠杆放大效应。
随着DCA次数增加,持仓成本不断下滑,每次止盈只需很小幅度的反弹就能实现盈利。
在连续多单开出以后,会在均价上方绘制止损线。一旦价格重新突破向上,超过持仓均价以及止损线,则止损出场。

策略最大优势在于,随着持仓成本的不断下行,即使是盘整市,也可以累计逐步减少成本。当趋势反转后,由于持仓成本已经大大低于市价,因此能够实现更大幅度的盈利。

#### 风险与缺陷

该策略最大的风险在于初期仓位有限。如在持续下跌的趋势中,会有止损风险。因此需要设置自己可以承受的止损幅度。

另外,止损幅度的设定同样也存在两个极端。设置过大停止单位吃不到足够深度的反弹。而设置过小的止损幅度在中期调整中遭遇价格重新涨停反转的概率会比较大。所以根据不同的市场和自己的风险偏好,选择合适的止损幅度非常关键。

在DCA周期较长,形成较多层级后,如果价格大幅上涨,会面临仓位成本过高,无法止损的风险。这也需要根据自己的仓位总量和可承受的最高仓位成本来合理设置DCA层级。

#### 优化建议

1.  优化选时信号。可以测试不同的参数以及不同的指标组合,以期望选出更高胜率的信号。

2.  优化止损机制。可以测试使用 Λ 型止损或者 圆弧型止损 替代简单的移动止损, 可能获得更好的止损效果。也可以加入仓位分时的策略调整止损幅度。

3.  优化止盈方式。可以测试不同类型的移动止盈,寻找更优的止盈出场机会,从而提高总体收益率。

4.  加入防反弹机制。在止损后,可能会出现再次触发DCA信号从而重新开仓的情况。这时候可以考虑加入一定幅度的防反弹范围,避免止损后立即重新激进建仓。

#### 总结

本策略运用RSI指标判定买入时机,以及根据指数函数计算的动态止损DCA策略,实现动态调整持仓数量和持仓成本,从而在波段市场中获得价格优势。优化方案主要集中在进出场信号、止损和止盈方式等方面。总体来说,该策略运用了指数DCA的核心理念,使得持仓成本不断下移,可以在盘整期间获得更多的运作空间,在趋势行情中获得更高的收益回报。不过仍然需要根据自己的资金管理计划选择合适的参数以控制总体的仓位风险。

||

#### Overview

The dynamic average cost DCA compound strategy dynamically adjusts the quantity of each opening position. At the beginning of the trend, it first opens small positions to build a position. As the depth of consolidation increases, it gradually increases the position size. The strategy uses exponential functions to calculate stop loss price levels, and re-opens new batches when triggered, which can cause the cost of holding positions to continue to decline exponentially. As the depth increases, the cost of the positions can be gradually reduced. When the price reverses, the batch profit taking allows for greater returns.

#### Strategy Logic  

This strategy uses a simple combination of RSI oversold signals and moving averages timing to determine entry opportunities.  A first entry order is submitted when RSI drops below oversold level and close price below moving average. After the first entry, the exponential function calculates price drop percentage for next levels. Each time it triggers a DCA order, position sizing is recalculated to keep equal amount per entry. As position size and cost change dynamically, it creates a leverage effect.   

As DCA count increases, average holding cost continues to decline. Just a small rebound is enough for take profit of each position. After continuous entries submitted, a stop loss line is plotted above average holding price. Once the price breaks out above average price and stop loss line, all positions are closed.

The biggest advantage is that as the holding cost continues to decline, even during consolidation, cost can still be reduced cumulatively step by step. When trend reverses, due to much lower holding cost than market price, much bigger profit can be realized.

#### Risks and Defects  

The biggest risk is the limited position size initially. During continuous decline, there can be stop loss risk. So the stop loss percentage needs to be set reasonably based on personal risk appetite.   

In addition, setting stop loss level has two extremes. If too loose, not enough retracement can be captured. But if too tight, probability of getting stopped out during mid-term corrections increases. So choosing proper stop loss levels according to different market conditions and risk preference is crucial.

If there are too many DCA levels, when price rises substantially, extremely high holding cost may prevent effective stop loss. So maximum layers of DCA need to be set reasonably based on total capital allocation and highest cost one can endure.

#### Optimization Suggestions

1. Optimize entry timing signals, by testing parameters and other indicators combinations for higher win rate signals.  

2. Optimize stop loss mechanisms, by testing Λ trailing stop loss or curve fitted trailing stop loss to get better results. Also the levels can be adjusted dynamically based on position allocation percentage.
 
3. Optimize take profit ways. Different types of trailing take profits can be examined for better exit opportunities and higher total return.

4. Add anti-whipsaw mechanism. Sometimes DCA signal can be triggered again soon after stop loss. A whipsaw range can be added to avoid aggressive re-entries right after stops.  

#### Conclusion  
This strategy utilizes RSI to determine entries, exponential dynamic stop loss DCA mechanism to adjust position sizing and average costs dynamically, in order to gain price advantage during consolidations. The main optimization areas are focused on entry/exit signals, stop loss and take profit. The core concept of exponential DCA is implemented to shift holding cost lower continually, thus providing more room during consolidations, and achieving multiplied returns when trend emerges. But parameters still need be set carefully based on capital allocation plans to control overall position risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 April 2021 20:00)|(?Backtest Window)Start Time|
|v_input_2|timestamp(01 Aug 2030 20:00)|End Time|
|v_input_float_1|3|(?Risk)Take Profit %|
|v_input_float_2|6|Close All %|
|v_input_int_1|8|(?DCA Settings)Max Amount of Entries|
|v_input_float_3|2|Price Drop % to open First DCA Order|
|v_input_float_4|1.4|Exponential Scale DCA levels|
|v_input_int_2|4999|Lines Bar Lookback|
|v_input_bool_1|false|(?Moving Average)Plot Moving Average|
|v_input_int_3|100|MA Length|
|v_input_int_4|14|(?RSI Settings)RSI Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_5|29|Oversold, Trigger to Enter First Position|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-04 00:00:00
end: 2024-01-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0///
// © A3Sh
//@version=5

// Study of a Simple RSI based, PA (priceaveraging) and DCA strategy that opens a new position everytime it hits a specified price level below the first entry.
// The first entry is opened when the specified rsi and moving average conditions are met. 
// The following DCA levels are calculated exponentially and set, starting with a specified % of price drop. 
// The disctance between the dca levels can be changed with the exponential scale.
// Each position closes individually when it reaches a specified take profit.
// The position can re-open again when it hits the price level again.
// Each time a position is closed and reopened, the average price drops a little.
// The position stays open until the first entry closes or when the price reaches the Stop level.
// When the price reaches the Stop level, all positions will close at once.

// The RSI and MA code for opening the entry is adapted from the Optimized RSI Buy the Dips strategy, by Coinrule.
// This code is used for study purposes, but any other low/ dip finding indicator can be used.
// https://www.tradingview.com/script/Pm1WAtyI-Optimized-RSI-Strategy-Buy-The-Dips-by-Coinrule/

// Dynamic DCA layers are inspired by the Backtesting 3commas DCA Bot v2, by rouxam
// This logic gives more flexibility because you can dyanically change the amount of dca entries.
// https://www.tradingview.com/script/8d6Auyst-Backtesting-3commas-DCA-Bot-v2/

// The use of for loops to (re)open and close different entries separately is based on the Simple_Pyramiding strategy.
// https://www.tradingview.com/script/t6cNLqDN-Simple-Pyramiding/


strategy('Simple_RSI+PA+DCA', overlay=true, pyramiding=20, initial_capital=500, calc_on_order_fills=true, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.075, close_entries_rule='FIFO')

// Backtest Window //
start_time   = input(defval=timestamp("01 April 2021 20:00"), group = "Backtest Window", title="Start Time")
end_time     = input(defval=timestamp("01 Aug 2030 20:00"),   group = "Backtest Window", title="End Time")
window() => true

// Inputs //
takeProfit      = input.float  (3,           group = 'Risk',           title = 'Take Profit %', step=0.1)
takeProfitAll   = input.float  (6,           group = "Risk",           title = 'Close All %',   step=0.1)
posCount        = input.int    (8,           group = 'DCA Settings',   title = 'Max Amount of Entries')
increment       = input.float  (2,           group = 'DCA Settings',   title = 'Price Drop % to open First DCA Order', step=0.5)/100 
exponent_scale  = input.float  (1.4,         group = 'DCA Settings',   title = 'Exponential Scale DCA levels', step=0.1, minval=1.1) 
bar_lookback    = input.int    (4999,        group = 'DCA Settings',   title = 'Lines Bar Lookback', maxval = 4999)
plotMA          = input.bool   (false,       group = 'Moving Average', title = 'Plot Moving Average')
moving_average  = input.int    (100,         group = 'Moving Average', title = 'MA Length' )
rsiLengthInput  = input.int    (14,          group = 'RSI Settings',   title = "RSI Length", minval=1)
rsiSourceInput  = input.source (close,       group = 'RSI Settings',   title = 'Source')
overSold        = input.int    (29,          group = 'RSI Settings',   title = 'Oversold, Trigger to Enter First Position')

// variables //
var open_position    = true   // true when there are open positions
var entry_price      = 0.0    // the entry price of the first entry
var dca_price        = 0.0    // the price of the different dca layers
var int count        = 0      // bar counter since first open position
var int max_bar      = 0      // max bar buffer variable for DCA lines, stop lines, average price
var line dca_line    = na     // lines variable for creating dca lines

// arrays //
linesArray = array.new_float(posCount,na)  // array to store different dca price levels for creating the dca lines

// Create max bar buffer for DCA lines, Stop and average price lines //
max_bar := count >= bar_lookback ? bar_lookback : count

// Order size based on first entry and amount of DCA layers
q = (strategy.equity  / posCount + 1) / open


// Calculate Moving Averages
movingaverage_signal = ta.sma(close ,moving_average)
plot (plotMA ? movingaverage_signal : na, color = color.new(#f5ff35, 0))


// RSI calculations //
up   = ta.rma(math.max(ta.change(rsiSourceInput), 0), rsiLengthInput)
down = ta.rma(-math.min(ta.change(rsiSourceInput), 0), rsiLengthInput)
rsi  = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))


// Buy Signal (co)
co = ta.crossover(rsi, overSold) and close < movingaverage_signal


// Create a white line for average price, since the last opened position //
// average_price = line.new(x1 = bar_index - max_bar, y1 = strategy.position_avg_price, x2 = bar_index, y2 = strategy.position_avg_price, color = color.white)
    

// Stop //
// Create a red Stop level line based on a specified % above the average price //
stop_level = strategy.position_avg_price + (strategy.position_avg_price / 100 * takeProfitAll)
// stop_line  = line.new(x1 = bar_index - max_bar, y1 = stop_level, x2 = bar_index, y2 = stop_level, color = color.red)
    

// Take profit definition per open position //
take_profit_price = close * takeProfit / 100 / syminfo.mintick


// Make sure the Stop level and average price level don't excied the bar buffer to avoid errors //
// if count <= bar_lookback
//     line.set_x1(stop_line,     strategy.opentrades.entry_bar_index(strategy.opentrades - 1))
//     line.set_x1(average_price, strategy.opentrades.entry_bar_index(strategy.opentrades - 1))


// Exponential DCA Layer Calculation fucntion --> First try, needs more experimentation //
dca_price_level(index,entry_price) =>   
    entry_price * (1 - (increment * math.pow(exponent_scale, index)))


// Set  Entries //
// Open the first entry and set the entry price //
if co and strategy.position_size == 0 and window() 
    open_position := true
    entry_price   := close
    strategy.entry(id = 'FE1', direction = strategy.long, qty = q)  
    
// first_entry_line = line.new(x1 = bar_index - max_bar, y1 = entry_price, x2 = bar_index, y2 = entry_price, color = color.blue)


// Start bar counting since the position is open //
if open_position == true
    count := count + 1


// Set the DCA entries //
// Prices below 1 are not set to avoid negative prices //
if strategy.position_size > 0 and window()
    for i = 0 to strategy.opentrades
        if strategy.opentrades == i and i < posCount
            dca_price := dca_price_level(i,entry_price) > 1 ? dca_price_level(i,entry_price) : na
            entry_id = 'DCA' + str.tostring(i + 1) 
            strategy.entry(id = entry_id, direction = strategy.long, limit = dca_price, qty = q)  


// Store the values of the different dca price levels in an array and create the dca lines // 
// Prices below 1 are not stored//
if open_position==true and window() 
    for i = 1 to posCount -1
        array.push(linesArray, dca_price_level(i,entry_price) > 1 ? dca_price_level(i,entry_price) : na) 
    
    // for i = 1 to array.size(linesArray) - 1
    //     dca_line := line.new(x1 = bar_index - max_bar, y1 = array.get(linesArray, i), x2 = bar_index, y2 = array.get(linesArray, i),color = color.blue)


// Create thick line to show the last Entry price //
// last_entry_price = line.new(x1 = bar_index[5], y1 = strategy.opentrades.entry_price(strategy.opentrades - 1), x2 = bar_index, y2 = strategy.opentrades.entry_price(strategy.opentrades - 1),color = color.rgb(255, 0, 204), width = 5)


// Exit the first entry when the take profit triggered //   
if strategy.opentrades > 0 and window() 
    strategy.exit(id = 'Exit FE', from_entry = 'FE1', profit = take_profit_price)


// Exit DCA entries when take profit is triggered //
if strategy.opentrades > 0 and window() 
    for i = 0 to strategy.opentrades 
        exit_from = 'DCA' + str.tostring(i + 1)
        exit_id = 'Exit_' + str.tostring(i + 1)
        strategy.exit(id = exit_id, from_entry = exit_from, profit = take_profit_price)


// Close all positions at once when Stop is crossed //
if strategy.opentrades > 0 and ta.crossover(close,stop_level) and window() 
    strategy.close_all()


// Make sure nothing is open after alle positions are closed and set the condiftion back to be open for new entries //
if strategy.position_size[1] > 0 and strategy.position_size == 0
    strategy.cancel_all()
    strategy.close_all()
    // line.delete(average_price)
    // line.delete(stop_line)
    // line.delete(dca_line)
    open_position := false   // All position are closed, so back to false
    count := 0               // Reset bar counter



```

> Detail

https://www.fmz.com/strategy/437666

> Last Modified

2024-01-04 16:34:10
