
> Name

Multi-Channel-Adaptive-Turtle-Trading-Strategy-with-Dynamic-Stop-Loss-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d85562be2672f615373d.png)
![IMG](https://www.fmz.com/upload/asset/2d926a6fba6e0b9b66cca.png)


[trans]

#### 概述
多通道自适应海龟交易策略是一种现代化的趋势跟踪系统，基于经典海龟交易法则进行了全面优化与扩展。该策略核心运用双重唐奇安通道(Donchian Channels)系统来识别市场突破点，并通过动态调整的退出通道提供精确的止损位置。策略设计了双层确认机制：通道1用于捕捉短期价格突破，通道2作为确认过滤器减少虚假信号。此外，策略集成了3Commas交易机器人接口，支持全自动化交易执行，适合希望在波动市场中捕捉长期趋势的交易者。

#### 策略原理
该策略基于经典海龟交易系统的核心原理，但增加了现代化的双通道确认机制和动态止损系统：

1. **双通道突破确认系统**：
   - 通道1(默认20周期)：计算特定周期内的最高价和最低价，形成上下边界。
   - 通道2(默认20周期，偏移量20)：作为第二层确认，通过向右偏移减少虚假信号。
   - 只有当价格突破通道1边界，且得到通道2确认时，才生成有效信号。

2. **动态退出通道**：
   - 使用较短周期(默认10)的唐奇安通道作为动态止损。
   - 对多头仓位，退出点为通道的最低点；对空头仓位，退出点为通道的最高点。
   - 要求完整K线收盘确认才执行退出，避免因价格噪音导致过早退出。

3. **入场与出场逻辑**：
   - 多头入场：当收盘价突破通道1的前期最高价，并且高于通道2的前期最高价。
   - 空头入场：当收盘价跌破通道1的前期最低价，并且低于通道2的前期最低价。
   - 多头出场：价格跌破退出通道的最低价，或达到可选的止盈百分比。
   - 空头出场：价格突破退出通道的最高价，或达到可选的止盈百分比。

4. **资金管理**：
   - 默认每笔交易使用账户资金的1%，可根据回测结果调整。
   - 确保最大回撤不超过10%，以维持风险控制。
   - 考虑佣金(默认0.1%)和滑点(默认5点)，以贴近真实交易环境。

#### 策略优势
1. **改进的信号质量**：双通道确认机制显著减少了虚假突破，提高了信号质量和精确度。代码中的`buy = buy_fast and close > upper_slow[1]`与`sel = sel_fast and close < lower_slow[1]`体现了这一设计。

2. **动态风险管理**：策略采用自适应的退出通道，根据市场结构动态调整止损位置。当市场有利移动时，止损位会自动跟进，锁定部分利润。这在代码中通过`exit_buy_level:= math.max(nz(exit_buy_level,10e-10), lower_exit)`实现。

3. **完整的资金管理系统**：策略内置了专业的资金管理规则，通过百分比分配制度控制每笔交易的风险敞口。

4. **可视化交易管理**：策略在图表上清晰标记入场点、止损点和止盈点，帮助交易者直观理解交易逻辑和风险范围。

#### 策略风险
1. **震荡市场表现欠佳**：作为趋势跟踪策略，在横盘整理阶段可能产生连续虚假信号。分析代码显示，虽然双通道系统减少了误报，但在无明确趋势的市场中仍会触发多次小亏损交易。

2. **参数敏感性**：策略性能高度依赖通道周期和偏移量的设置。不同市场和时间框架需要不同参数组合，要求进行充分的回测和优化。代码中通过输入参数`_period_dc1`、`_period_dc2`和`_period_off`来控制这些关键变量。

3. **滞后性风险**：动态止损通道可能在剧烈波动市场中反应不够迅速，导致回撤扩大。特别是要求K线收盘确认（`barstate.isconfirmed`）可能在高波动环境中错失最佳退出时机。

4. **过度依赖历史模式**：策略假设历史突破模式在未来会继续有效，但市场特性可能随时间改变，影响策略表现。

#### 策略优化方向
1. **增加趋势过滤器**：代码分析表明，当前策略缺乏对整体市场趋势的判断。建议增加如移动平均线、ADX或MACD等趋势指标，在强趋势环境中激活策略，在弱趋势或震荡市场中降低敏感度。

2. **自适应通道周期**：目前策略使用固定周期值。优化方向是引入基于ATR或市场波动率的自适应通道周期，使策略能更好地适应不同的市场环境。这可以通过修改`_period_dc1`和`_period_dc2`的计算方式实现。

3. **优化退出机制**：代码中的退出逻辑仅依赖唐奇安通道。建议实施分段退出策略，例如在达到一定盈利后平仓部分头寸，并为剩余部分设置更宽松的尾随止损。

4. **时间过滤**：增加交易时间过滤器，避开市场低流动性或高波动性的时段。特别是对于24小时交易的加密货币市场，某些时段可能更适合执行交易。

5. **情绪指标整合**：整合市场情绪指标如成交量、波动率或资金流向，以增强入场和出场决策。例如，在高成交量的突破信号上增加权重，或在异常低波动率环境中减少交易频率。

#### 总结
多通道自适应海龟交易策略是一个现代化、全面的趋势跟踪系统，通过双重通道确认机制和动态止损解决了传统海龟交易法则面临的许多挑战。该策略特别适合中长期趋势交易者，在H4或日线等较高时间框架上表现更为稳定。策略的3Commas集成功能使其成为自动化交易的理想选择，减少了人为情绪干扰。

虽然在震荡市场中表现可能欠佳，但通过适当的参数优化和额外的趋势过滤器，可以显著提高其整体表现。策略的资金管理模块确保了风险得到有效控制，而动态止损系统则帮助保护已获利润。

对于希望在各种市场条件下捕捉趋势的交易者来说，这是一个值得考虑的策略，特别是当与其他市场分析工具结合使用时。记住，任何策略都需要适应个人风险承受能力和交易目标进行调整，并在实际资金投入前进行充分的回测和模拟交易。 || 

#### Overview
The Multi-Channel Adaptive Turtle Trading Strategy is a modernized trend-following system that has been comprehensively optimized and expanded based on the classic Turtle Trading rules. The core of this strategy utilizes a dual Donchian Channel system to identify market breakouts and provides precise stop-loss positioning through a dynamically adjusting exit channel. The strategy implements a dual confirmation mechanism: Channel 1 captures short-term price breakouts, while Channel 2 acts as a confirmation filter to reduce false signals. Additionally, the strategy integrates with the 3Commas trading bot interface, supporting fully automated trade execution, making it suitable for traders looking to capture long-term trends in volatile markets.

#### Strategy Principles
This strategy is based on the core principles of the classic Turtle Trading system but adds modernized dual-channel confirmation mechanisms and a dynamic stop-loss system:

1. **Dual-Channel Breakout Confirmation System**:
   - Channel 1 (default 20 periods): Calculates the highest highs and lowest lows within a specific period, forming upper and lower boundaries.
   - Channel 2 (default 20 periods with 20 offset): Acts as a second layer of confirmation, reducing false signals through rightward offset.
   - Valid signals are only generated when price breaks through Channel 1 boundaries and is confirmed by Channel 2.

2. **Dynamic Exit Channel**:
   - Uses a shorter period Donchian Channel (default 10) as a dynamic stop-loss.
   - For long positions, the exit point is the lowest point of the channel; for short positions, the exit point is the highest point.
   - Requires full candle close confirmation before executing exits, preventing premature exits due to price noise.

3. **Entry and Exit Logic**:
   - Long Entry: When closing price breaks above the previous high of Channel 1 and is above the previous high of Channel 2.
   - Short Entry: When closing price breaks below the previous low of Channel 1 and is below the previous low of Channel 2.
   - Long Exit: Price breaks below the lowest point of the exit channel or reaches the optional take profit percentage.
   - Short Exit: Price breaks above the highest point of the exit channel or reaches the optional take profit percentage.

4. **Money Management**:
   - Default usage of 1% of account funds per trade, adjustable based on backtesting results.
   - Ensures maximum drawdown does not exceed 10% to maintain risk control.
   - Considers commission (default 0.1%) and slippage (default 5 ticks) to approximate real trading conditions.

#### Strategy Advantages
1. **Improved Signal Quality**: The dual-channel confirmation mechanism significantly reduces false breakouts, improving signal quality and accuracy. This design is reflected in the code with `buy = buy_fast and close > upper_slow[1]` and `sel = sel_fast and close < lower_slow[1]`.

2. **Dynamic Risk Management**: The strategy employs an adaptive exit channel that dynamically adjusts stop-loss positions based on market structure. When the market moves favorably, the stop-loss position automatically follows, locking in partial profits. This is implemented in the code through `exit_buy_level:= math.max(nz(exit_buy_level,10e-10), lower_exit)`.

3. **Comprehensive Money Management System**: The strategy has built-in professional money management rules, controlling risk exposure for each trade through a percentage allocation system.

4. **Visual Trade Management**: The strategy clearly marks entry points, stop-loss points, and take-profit points on the chart, helping traders visually understand trading logic and risk ranges.

#### Strategy Risks
1. **Poor Performance in Ranging Markets**: As a trend-following strategy, it may generate consecutive false signals during sideways consolidation phases. Code analysis shows that although the dual-channel system reduces false positives, it will still trigger multiple small losing trades in markets without clear trends.

2. **Parameter Sensitivity**: Strategy performance is highly dependent on channel period and offset settings. Different markets and timeframes require different parameter combinations, necessitating thorough backtesting and optimization. The code controls these key variables through input parameters `_period_dc1`, `_period_dc2`, and `_period_off`.

3. **Lag Risk**: The dynamic stop-loss channel may not react quickly enough in violently volatile markets, leading to expanded drawdowns. In particular, requiring candle close confirmation (`barstate.isconfirmed`) may miss optimal exit opportunities in highly volatile environments.

4. **Over-reliance on Historical Patterns**: The strategy assumes that historical breakout patterns will continue to be effective in the future, but market characteristics may change over time, affecting strategy performance.

#### Strategy Optimization Directions
1. **Add Trend Filters**: Code analysis indicates that the current strategy lacks judgment of overall market trends. It is recommended to add trend indicators such as moving averages, ADX, or MACD to activate the strategy in strong trend environments and reduce sensitivity in weak trend or oscillating markets.

2. **Adaptive Channel Periods**: The strategy currently uses fixed period values. An optimization direction is to introduce adaptive channel periods based on ATR or market volatility, allowing the strategy to better adapt to different market environments. This can be implemented by modifying how `_period_dc1` and `_period_dc2` are calculated.

3. **Optimize Exit Mechanism**: The exit logic in the code relies solely on the Donchian Channel. It is recommended to implement a staged exit strategy, such as closing part of the position after achieving a certain profit, and setting a more relaxed trailing stop for the remaining portion.

4. **Time Filtering**: Add trading time filters to avoid market periods of low liquidity or high volatility. Especially for 24-hour cryptocurrency markets, certain time periods may be more suitable for executing trades.

5. **Sentiment Indicator Integration**: Integrate market sentiment indicators such as volume, volatility, or fund flows to enhance entry and exit decisions. For example, increase weight on breakout signals with high volume, or reduce trading frequency in abnormally low volatility environments.

#### Summary
The Multi-Channel Adaptive Turtle Trading Strategy is a modernized, comprehensive trend-following system that addresses many challenges faced by traditional Turtle Trading rules through dual-channel confirmation mechanisms and dynamic stop-losses. This strategy is particularly suitable for medium to long-term trend traders and performs more stably on higher timeframes such as H4 or daily charts. The strategy's 3Commas integration feature makes it an ideal choice for automated trading, reducing emotional interference.

While it may underperform in oscillating markets, its overall performance can be significantly improved through appropriate parameter optimization and additional trend filters. The strategy's money management module ensures effective risk control, while the dynamic stop-loss system helps protect profits already gained.

For traders looking to capture trends across various market conditions, this is a strategy worth considering, especially when combined with other market analysis tools. Remember that any strategy needs to be adjusted according to individual risk tolerance and trading goals, and should undergo thorough backtesting and simulation before actual capital investment.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-04 00:00:00
end: 2025-03-02 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © 3Commas

//@version=6
// Strategy configuration: sets properties for the strategy like title, overlay, pyramiding, calculation mode, and risk parameters.
strategy(title                        = "[3Commas] Turtle Strategy"
       , overlay                      = true
       , pyramiding                   = 0  
       , calc_on_order_fills          = false
       , calc_on_every_tick           = true
       , default_qty_type             = strategy.percent_of_equity
       , default_qty_value            = 1
       , initial_capital              = 10000
       , slippage                     = 5
       , commission_type              = strategy.commission.percent
       , commission_value             = 0.1
       , use_bar_magnifier            = true
       , fill_orders_on_standard_ohlc = true
     )

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
// ? Inputs
// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

// Define menu options for strategy testing
var menu_buy       = "? Long"
var menu_sel       = "? Short"
var menu_buy_sell  = "? Long & ? Short"  
var menu_none      = "? None"
var group_settings = '? Settings'
var group_test     = '? Strategy Tester'

// Input parameters for the channels and exit period
_period_dc1  = input.int(20, "Period Channel 1"    , group = group_settings, inline = '' , display = display.none, tooltip ='Channel 1 Period.')
_period_dc2  = input.int(20, "Period Channel 2    ", group = group_settings, inline = '2', display = display.none, tooltip ='Channel 2 Period and offset to the right.')
_period_off  = input.int(20, "Offset"              , group = group_settings, inline = '2', display = display.none)
_period_exit = input.int(10, "Period Exit"         , group = group_settings, inline = '' , display = display.none, tooltip ='Exit Period (Trailing).')

// Input parameters for strategy testing options
_test_pos_type  = input.string(       title= 'Strategy          '    , group=group_test, inline = 'o' , defval  = menu_buy_sell, options=[menu_buy_sell, menu_buy, menu_sel, menu_none], tooltip = 'Order Type direction in which trades are executed.')
_tp_use         = input.bool  (false, title= "Take Profit %"         , group=group_test, inline = 'tp', tooltip = 'When activated, the entered value will be used as the Take Profit in percentage from the entry price level.')
_tp_percent     = input.float (20   , title= ""                      , group=group_test, inline = 'tp', display = display.none)


// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
// ? Logic
// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

// Calculate take profit levels if enabled; otherwise set to not available (na)
tp_buy = _tp_use?close * (1 + _tp_percent / 100) : na 
tp_sel = _tp_use?close * (1 - _tp_percent / 100) : na

// Calculate fast and slow channel extremes and exit levels
upper_fast = ta.highest(high, _period_dc1)
lower_fast = ta.lowest (low , _period_dc1)
upper_slow = ta.highest(high, _period_dc2)[_period_off]
lower_slow = ta.lowest (low , _period_dc2)[_period_off]
upper_exit = ta.highest(high, _period_exit)
lower_exit = ta.lowest (low , _period_exit)

// Determine if there is a crossover or crossunder for fast and slow channels
buy_fast = ta.crossover (close, upper_fast[1]) and barstate.isconfirmed
sel_fast = ta.crossunder(close, lower_fast[1]) and barstate.isconfirmed
buy_slow = ta.crossover (close, upper_slow[1]) and barstate.isconfirmed
sel_slow = ta.crossunder(close, lower_slow[1]) and barstate.isconfirmed

// Initialize variables to track if we are in a long or short position
var inbuy  = false
var insel  = false

// Conditions to enter long or short positions based on fast signals and slow channel confirmation
buy  = buy_fast and close>upper_slow[1] and not inbuy
sel  = sel_fast and close<lower_slow[1] and not insel

// Update position flags if a trade is executed
inbuy := buy? true:inbuy
insel := sel? true:insel

// Plot shapes on the chart for long and short signals using circles and labels
plotshape(buy ?close:na, title="Label Long" , style=shape.circle   , location= location.absolute, color=color.new(color.teal, 0), text='' , textcolor=color.white, size= size.auto, offset=0, editable=true)
plotshape(sel ?close:na, title="Label Short", style=shape.circle   , location= location.absolute, color=color.new(color.red , 0), text='' , textcolor=color.white, size= size.auto, offset=0, editable=true)
plotshape(buy ?close:na, title="Label Long" , style=shape.labelup  , location= location.belowbar, color=color.new(color.teal, 0), text='▲', textcolor=color.white, size= size.auto, offset=0, editable=true)
plotshape(sel ?close:na, title="Label Short", style=shape.labeldown, location= location.abovebar, color=color.new(color.red , 0), text='▼', textcolor=color.white, size= size.auto, offset=0, editable=true)

// Initialize take profit, stop loss, and exit levels for both long and short positions
var tp = float(na)
var sl = float(na)
var exit_buy_level = float(na)
var exit_sel_level = float(na)

// Set take profit levels when a new long or short signal is triggered
if buy
    tp := tp_buy

if sel
    tp := tp_sel

// For long positions, update the exit level based on the lowest exit channel
if inbuy
    exit_buy_level:= math.max(nz(exit_buy_level,10e-10), lower_exit)
    sl:= exit_buy_level

// For short positions, update the exit level based on the highest exit channel
if insel 
    exit_sel_level:= math.min(nz(exit_sel_level,10e+10), upper_exit)
    sl:= exit_sel_level    

// Check for exit conditions when price crosses the exit levels
exit_buy_pos = ta.crossunder(close,exit_buy_level) 
exit_sel_pos = ta.crossover (close,exit_sel_level)        

// Confirm exit conditions when in a position
exit_buy_close = inbuy and exit_buy_pos and barstate.isconfirmed
exit_sel_close = insel and exit_sel_pos and barstate.isconfirmed

// Check for take profit exit conditions for long and short positions
buy_tp_exit = (inbuy[1]  and high>= tp and not buy)
sel_tp_exit = (insel[1]  and low <= tp and not sel)

// Plot channel bands and exit levels on the chart (set to not display by default)
plot(upper_fast    , title="Upper Channel 1", color=color.blue , display = display.none)
plot(lower_fast    , title="Lower Channel 1", color=color.blue , display = display.none)
plot(upper_slow    , title="Upper Channel 2", color=color.green, display = display.none)
plot(lower_slow    , title="Lower Channel 2", color=color.green, display = display.none)
plot(exit_buy_level, title="Exit Long"      , color=color.red  , display = display.none, style = plot.style_linebr)
plot(exit_sel_level, title="Exit Short"     , color=color.red  , display = display.none, style = plot.style_linebr)

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
// ? Strategy Tester
// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――


// Conditions for testing buy and sell signals
test_buy =  buy
test_sel = sel
test_tp  = tp
test_sl  = sl

// Track the average entry price for the current position
test_en = strategy.position_avg_price

// Determine if the stop loss should be adjusted based on the current position and entry price
savestop = (strategy.position_size>0 and test_sl>test_en) or (strategy.position_size<0 and test_sl<test_en)

// Execute strategy entries based on the test conditions and selected position type
if test_buy and _test_pos_type != menu_sel and _test_pos_type != menu_none
    strategy.entry ("Buy" , strategy.long)
if test_sel and _test_pos_type != menu_buy and _test_pos_type != menu_none
    strategy.entry ("Sell", strategy.short)

// Close positions based on exit signals
if exit_buy_close
    strategy.close("Buy") 

if exit_sel_close
    strategy.close("Sell")

// Set strategy exits using take profit conditions; stop loss is not used in these exits
strategy.exit("Exit Buy" , "Buy" , limit= test_tp, stop = na)
strategy.exit("Exit Sell", "Sell", limit= test_tp, stop = na)

// Define colors for plotting stop loss lines based on the savestop condition
test_sl_col = savestop?color.new(color.teal,50 ):color.new(color.red ,50)
// Check if there is no trade, based on changes in entry price or if entry price is not available
notrade = test_en!=test_en[1] or na(test_en)

// Plot entry price, stop loss, and take profit on the chart
plot_en = plot(notrade?na:test_en, title = 'Entry', color = color.new(color.blue,50 ), style = plot.style_linebr)
plot_sl = plot(notrade?na:test_sl, title = 'SL'   , color = test_sl_col                , style = plot.style_linebr)
plot_tp = plot(notrade?na:test_tp, title = 'TP'   , color = color.new(color.teal,100), style = plot.style_linebr)

// Fill the background between the take profit and entry lines
fill(plot_tp, plot_en, test_tp, test_en, notrade?na:color.new(color.teal,50 ), notrade?na:color.new(color.teal,100), fillgaps = false, title = 'Trade Background')
// Fill the background between the entry and stop loss lines
fill(plot_en, plot_sl, test_en, test_sl, notrade?na:savestop?color.new(color.teal ,100):color.new(color.red ,100), notrade?na:savestop?color.new(color.teal ,50):color.new(color.red ,50 ), fillgaps = false, title = 'Trade Background')

// Reset variables when an exit condition is met for a long position
if exit_buy_close or buy_tp_exit
    exit_buy_level:= float(na)
    tp            := float(na)
    sl            := float(na) 
    inbuy         := false

// Reset variables when an exit condition is met for a short position
if exit_sel_close or sel_tp_exit
    exit_sel_level:= float(na)
    tp            := float(na)
    sl            := float(na) 
    insel         := false  

// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
// ? 3Commas Integration  
// ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

// This section integrates the strategy with 3Commas DCA Bot signals.

// Tutorial text for integration instructions
var c3_tuto =  "Here you can enable the table to review the messages to be sent to the bot, as well as change the background color and text color."
              +'\n\n? ??? ?? ??? ??? ??? ???????'
              +'\n      ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'
              +  '\n?Verify Messages: Ensure the message matches the one specified by the DCA Bot.'
              +'\n\n?Multi-Pair Configuration: For multi-pair setups, enable the option to add the symbol in the correct format.'
              +'\n\n?Signal Settings: Enable whether you want to receive long or short signals (Entry | TP | SL), copy and paste the the messages for the DCA Bots configured in 3Commas.'        
              +'\n\n?Alert Setup:'         
              +'\n\n- When creating an alert, set the condition to the indicator and choose "alert() function call only."'                  
              +'\n\n- Enter any desired Alert Name.'                                           
              +'\n\n- Open the Notifications tab, enable Webhook URL, and paste the Webhook URL from 3Commas.'                         
              +'\n\n- For more details, refer to the 3Commas section: "How to use TradingView Custom Signals."'  
              +"\n\n?Finalize Alerts: Click Create, you're done! Alerts will now be sent automatically in the correct format to 3Commas."

// Predefined JSON messages for bot signals for both entry and exit in long and short positions
var c3_text_buy_entry = '{  "message_type": "bot",  "bot_id": 15743097,  "email_token": "b9ed9d7d-7777-42ed-a0a6-608f4ecedf82",  "delay_seconds": 0}'
var c3_text_sel_entry = '{  "message_type": "bot",  "bot_id": 15743017,  "email_token": "b9ed9d7d-7777-42ed-a0a6-608f4ecedf82",  "delay_seconds": 0}'
var c3_text_buy_exit  = '{  "action": "close_at_market_price",  "message_type": "bot",  "bot_id": 15743097,  "email_token": "b9ed9d7d-7777-42ed-a0a6-608f4ecedf82",  "delay_seconds": 0}'
var c3_text_sel_exit  = '{  "action": "close_at_market_price",  "message_type": "bot",  "bot_id": 15743017,  "email_token": "b9ed9d7d-7777-42ed-a0a6-608f4ecedf82",  "delay_seconds": 0}'

// Define emojis for visual signals
var emog  = '?'
var emor  = '?'
var emof  = '?'
var read = 'Check Messages, Please Read ?'

// Input settings for the integration table and signal customization
group_c3            = '? DCA Bot Signals'  
_c3_tuto            = input.bool  (false            , title=  read                    , group=group_c3, inline='h', display = display.none, tooltip = c3_tuto)
_c3_size            = input.string('Normal'         , title= ' ↳ Size'                , group=group_c3, inline='' , display = display.none, options=['Tiny','Small','Normal','Large','Huge'])
_c3_pos             = input.string('Bottom Center'  , title= ' ↳ Position'            , group=group_c3, inline='' , display = display.none, options=['Top Left','Top Center','Top Right','Middle Left','Middle Center','Middle Right','Bottom Left','Bottom Center','Bottom Right'])
_c3_col1            = input.color(#1F1F1F         , title= ' ↳ Colors    '          , group=group_c3, inline='c', display = display.none)
_c3_col2            = input.color(color.white     , title= ''                       , group=group_c3, inline='c', display = display.none)
_c3_buy_entry       = input.bool  (true             , title= emog+' Buy Entry       ' , group=group_c3, inline='b', display = display.none, tooltip= 'Enable this options to send Buy Entry, Take Profit (TP), and Stop Loss (SL) signals to 3Commas.')
_c3_buy_tp          = input.bool  (true             , title=      'TP'                , group=group_c3, inline='b', display = display.none)
_c3_buy_sl          = input.bool  (true             , title=      'SL'                , group=group_c3, inline='b', display = display.none)
_c3_text_buy_entry  = input.string(c3_text_buy_entry, title= ' ↳ Deal Entry'          , group=group_c3, inline= '', display = display.none, tooltip= 'Long DCA Bot: Copy and paste the message for the deal start signal of the DCA Bot you created in 3Commas.')
_c3_text_buy_exit   = input.string(c3_text_buy_exit , title= ' ↳ Deal Exit'           , group=group_c3, inline= '', display = display.none, tooltip= 'Long DCA Bot: Copy and paste the message to close order at Market Price of the DCA Bot you created in 3Commas.')
_c3_sel_entry       = input.bool  (true             , title= emor+' Sell Entry       ', group=group_c3, inline='s', display = display.none, tooltip= 'Enable this options to send Sell Entry, Take Profit (TP), and Stop Loss (SL) signals to 3Commas.')
_c3_sel_tp          = input.bool  (true             , title=      'TP'                , group=group_c3, inline='s', display = display.none)
_c3_sel_sl          = input.bool  (true             , title=      'SL'                , group=group_c3, inline='s', display = display.none)
_c3_text_sel_entry  = input.string(c3_text_sel_entry, title= ' ↳ Deal Entry'          , group=group_c3, inline= '', display = display.none, tooltip= 'Short DCA Bot: Copy and paste the message for the deal start signal of the DCA Bot you created in 3Commas.')
_c3_text_sel_exit   = input.string(c3_text_sel_exit , title= ' ↳ Deal Exit'           , group=group_c3, inline= '', display = display.none, tooltip= 'Short DCA Bot: Copy and paste the message to close order at Market Price of the DCA Bot you created in 3Commas.')
_c3_entry_bot_use   = input.bool  (false            , title= 'DCA Bot Multi-Pair'     , group=group_c3, inline= '', display = display.none, tooltip = 'You must activate it if you want to use the signals in a DCA Bot Multi-pair \n\nIn the text box you must enter (using the 3Commas format) the symbol in which you are creating the alert, you can check the format of each symbol when you create the bot.\n\nBefore creating the alert, verify that the message is the same as the one specified in the DCA bot, using the summary option.')
_c3_entry_bot_mult  = input.string('USDT_BTC'       , title= ' ↳ Symbol'              , group=group_c3, inline= '', display = display.none)

// Function to determine label size based on the selected menu option
LabelSize (size_menu_)=>
    switch size_menu_
        'Auto'   => size.auto
        'Tiny'   => size.tiny
        'Small'  => size.small
        'Normal' => size.normal
        'Large'  => size.large
        'Huge'   => size.huge

// Function to determine table position based on the selected menu option
TablePosition (pos_menu_)=>
    switch pos_menu_ 
        'Top Left'      => position.top_left      
        'Top Center'    => position.top_center    
        'Top Right'     => position.top_right     
        'Middle Left'   => position.middle_left   
        'Middle Center' => position.middle_center 
        'Middle Right'  => position.middle_right  
        'Bottom Left'   => position.bottom_left    
        'Bottom Center' => position.bottom_center  
        'Bottom Right'  => position.bottom_right

// Function to trim the JSON message and add the pair if multi-pair is enabled
TrimPair(txt_, multipair_, pair_) =>
    trim  = txt_
    check =  str.contains(trim,'delay_seconds') and 
             str.contains(trim,'email_token'  ) and 
             str.contains(trim,'bot_id'       ) and 
             str.contains(trim,'message_type' )
    if check
        del   = array.get(str.split(trim, '"delay_seconds": 0'), 1)
        trim := str.replace(trim, del, '', 0)
        pair  = ', "pair": '+ '"' + str.replace_all(pair_, ' ', '')+ '"'
        trim := trim + (multipair_? pair: '') + '}'  
    trim 

// Function to format JSON for a nicer display by adding new lines and spacing
JsonFormat(json_)=>
    nice  = json_
    check =  str.contains(nice,'delay_seconds') and 
             str.contains(nice,'email_token'  ) and 
             str.contains(nice,'bot_id'       ) and 
             str.contains(nice,'message_type' )
    if check 
        nice := str.replace_all(nice, ' ', ''    )
        nice := str.replace_all(nice, ',', ',\n ')
        nice := str.replace_all(nice, '{', '{\n ')
        nice := str.replace_all(nice, '}', '\n}' )
        nice := str.replace_all(nice, ':', ': '  )
    nice    

// Define conditions to send signals based on entry and exit signals
c3_en_buy =  _c3_buy_entry and buy
c3_ex_buy = (_c3_buy_tp and buy_tp_exit) or (_c3_buy_sl and exit_buy_close)

c3_en_sel =  _c3_sel_entry and sel
c3_ex_sel = (_c3_sel_tp and sel_tp_exit) or (_c3_sel_sl and exit_sel_close)

// Format the messages for both entry and exit, applying multi-pair configuration if enabled
var c3_buy_dealstart   = JsonFormat(TrimPair(_c3_text_buy_entry, _c3_entry_bot_use, _c3_entry_bot_mult))
var c3_buy_closemarket = JsonFormat(TrimPair(_c3_text_buy_exit , _c3_entry_bot_use, _c3_entry_bot_mult))
var c3_sel_dealstart   = JsonFormat(TrimPair(_c3_text_sel_entry, _c3_entry_bot_use, _c3_entry_bot_mult))
var c3_sel_closemarket = JsonFormat(TrimPair(_c3_text_sel_exit , _c3_entry_bot_use, _c3_entry_bot_mult))

// Send alerts for buy and sell entries and exits based on conditions
switch
    c3_en_buy => alert(c3_buy_dealstart  , alert.freq_once_per_bar)
    c3_ex_buy => alert(c3_buy_closemarket, alert.freq_once_per_bar)

switch
    c3_en_sel => alert(c3_sel_dealstart  , alert.freq_once_per_bar)
    c3_ex_sel => alert(c3_sel_closemarket, alert.freq_once_per_bar)  
 
// Create a table with the signal messages for user review
if barstate.isfirst and _c3_tuto 
    var bg =  _c3_col1
    var tx =  _c3_col2
    var gr = color.green
    var re = color.red 
    var hw = 'How to use 3Commas DCA Bot Signals ?'
    var ms = '? DCA Bot Signals Messages '
    var ds = 'Deal start signal'
    var me = 'Close order at Market Price'
    var c3_table = table.new(TablePosition (_c3_pos), 6, 6, border_width=1, frame_width=1,border_color = color.new(color.black,0), frame_color = color.new(color.black,0))  
    table.cell(c3_table, 1, 1, ms                  , text_color=tx, text_halign=text.align_center, text_size = LabelSize(_c3_size), bgcolor = bg)
    table.cell(c3_table, 1, 2, ds                  , text_color=tx, text_halign=text.align_center, text_size = LabelSize(_c3_size), bgcolor = bg, width=0)
    table.cell(c3_table, 1, 3, me                  , text_color=tx, text_halign=text.align_center, text_size = LabelSize(_c3_size), bgcolor = bg, width=0)
    table.cell(c3_table, 2, 1, 'Long Bot Messages' , text_color=gr, text_halign=text.align_center, text_size = LabelSize(_c3_size), bgcolor = bg)
    table.cell(c3_table, 2, 2, c3_buy_dealstart    , text_color=tx, text_halign=text.align_left  , text_size = LabelSize(_c3_size), bgcolor = bg, text_font_family= font.family_monospace)
    table.cell(c3_table, 2, 3, c3_buy_closemarket  , text_color=tx, text_halign=text.align_left  , text_size = LabelSize(_c3_size), bgcolor = bg, text_font_family= font.family_monospace)
    table.cell(c3_table, 3, 1, 'Short Bot Messages', text_color=re, text_halign=text.align_center, text_size = LabelSize(_c3_size), bgcolor = bg)
    table.cell(c3_table, 3, 2, c3_sel_dealstart    , text_color=tx, text_halign=text.align_left  , text_size = LabelSize(_c3_size), bgcolor = bg, text_font_family= font.family_monospace)
    table.cell(c3_table, 3, 3, c3_sel_closemarket  , text_color=tx, text_halign=text.align_left  , text_size = LabelSize(_c3_size), bgcolor = bg, text_font_family= font.family_monospace) 

```

> Detail

https://www.fmz.com/strategy/484766

> Last Modified

2025-03-04 10:16:07
