
> Name

基于均线反转的短线交易策略Mean-Reversion-Line-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13ecf552a13ec9eb047.png)
[trans]

## 概述

反转均线策略是一种基于均线反转的短线交易策略。它结合了布林带、RSI、CCI等多个指标,对金融市场的短线行情变化进行捕捉,实现低买高抛的交易目标。

该策略主要用于股指、外汇、贵金属等高流动性品种。它追求每单获利的最大化,同时控制总体交易的风险收益比。

## 策略原理  

1. 使用布林带判断价格离值区域。当价格接近上布林带时考虑做空,当价格接近下布林带时考虑做多。

2. 结合RSI指标判断是否超买超卖。RSI指标可以有效识别超买超卖情况。

3. CCI指标判断价格反转信号。CCI指标对异常情况较为敏感,可以有效捕捉价格反转机会。  

4. 价格上穿5日均线做多,下破5日均线做空。均线位置代表目前价格主要区间,价格与均线关系反映潜在趋势变化。

5. 进入信号确认后,快速平仓套取利润。根据回撤情况设定止损退出,实现高胜率。

## 策略优势

1. 多指标组合,提高信号准确性  

反转均线策略同时使用布林带、RSI、CCI等多个指标。这些指标都对价格变动较为敏感,组合使用可以提高信号准确性,减少错误信号。

2. 严格的入市规则,避免追涨杀跌  

策略要求指标信号和价格同步出现,避免单一指标误导。同时要求价格已明显反转,减少相关风险。  

3. 高效的止损机制,控制单笔损失

无论做多做空,策略都会设置较为严格的止损线。一旦价格向不利方向突破止损线,策略会快速止损,避免单笔大损。  

4. 合理止盈,追求每单获利最大化

策略会设置两个止盈目标,分步实现盈利。同时在止盈后采用小步调整追踪止损,扩大每单盈利空间。

## 风险分析

1. 价格剧烈波动,止损被触发

在价格剧烈波动的情况下,止损线可能会被突破,造成不必要的损失。这种情况通常发生在重大事件导致的价格异常波动中。  

可以通过扩大止损幅度来应对这种风险,同时避开重大事件发生期间操作。

2. 追涨过猛,无法反转

当涨势过猛时,价格往往会上攻太快,无法及时反转。这时如果仍然坚持做空,可能会面临追涨杀跌的风险。  

这种情况下,应暂时观望,等价格上涨势头明显减弱时才考虑介入做空。

## 优化方向  

1. 优化指标参数,提升信号准确率

可以测试不同参数组合下的回测结果,选择最佳参数。例如可以优化RSI的参数,CCI的参数等。

2. 结合量能指标,判断真实反转时机  

可以加入成交量或者布林带宽度等量能指标。这可以避免在价格只是小幅调整时就产生错误信号。

3. 优化止盈止损策略,扩大单笔盈利  

可以测试不同的止盈止损点,使每单盈利最大化。同时也要平衡风险,避免止损被轻易触发。

## 总结  

反转均线策略综合运用多种指标判断力,具有信号精确、操作规范、风险可控的特点。它适用于对市场变化敏感度高、具有较强流动性的品种,能够捕捉价格在布林带与关键均线之间的反转机会,实现低买高抛的交易目标。

在实际应用中,仍需要注意指标参数的优化,同时结合量能指标判断真实反转时点。此外,应对价格剧烈波动做好风险管理。如果运用得当,该策略可以获得较为稳定的Alpha收益。

||


## Overview

The mean reversion line strategy is a short-term trading strategy based on moving average reversals. It combines Bollinger Bands, RSI, CCI and other indicators to capture short-term market fluctuations and achieve the goal of buying low and selling high.  

The strategy is mainly used for highly liquid products such as stock indexes, forex, and precious metals. It pursues maximization of profit per trade while controlling the overall risk-return ratio of trading.

## Strategy Principle   

1. Use Bollinger Bands to judge the price deviation zones. Consider going short when the price approaches the upper Bollinger Band and consider going long when the price approaches the lower Bollinger Band.

2. Combine the RSI indicator to determine overbought and oversold conditions. The RSI indicator can effectively identify overbought and oversold situations.  

3. Use the CCI indicator to determine price reversal signals. The CCI indicator is relatively sensitive to anomalies and can effectively capture price reversal opportunities.

4. Go long when the price breaks above the 5-day moving average, and go short when it breaks below. The position of the moving average represents the current main price range, and the relationship between price and moving average reflects potential trend changes.  

5. After the entry signal is confirmed, close the position quickly to take profits. Set stop loss based on retracement to realize high win rate.

## Advantages of the Strategy  

1. Combination of multiple indicators improves signal accuracy 

The mean reversion line strategy combines Bollinger Bands, RSI, CCI and other indicators. These indicators are quite sensitive to price changes, and their combination can improve signal accuracy and reduce false signals.  

2. Strict entry rules avoid chasing trends  

The strategy requires synchronous indicator signals and prices to avoid misleading by a single indicator. It also requires obvious price reversal to reduce related risks.

3. Efficient stop loss mechanism controls single trade loss  

Whether going long or going short, the strategy will set a relatively strict stop loss line. Once the price breaks through the stop loss line in an unfavorable direction, the strategy will quickly stop loss to avoid large losses per trade.

4. Reasonable profit taking pursues maximization of profit per trade  

The strategy will set two take profit targets to realize profits in steps. At the same time, after taking profit, it will use small step adjustment tracking stop loss to expand the profit space per trade.

## Risk Analysis 

1. Price volatility triggers stop loss  

In the event of extreme price fluctuations, the stop loss line may be broken, causing unnecessary losses. Such situations usually occur during abnormal price movements caused by major events.  

This risk can be mitigated by expanding the stop loss range and avoiding operations during major events.

2. Unable to reverse after overheating rises 

When the uptrend is too fierce, prices often rise too quickly to reverse in time. Persistently going short in this case may face the risk of chasing uptrends.  

It is better to wait and see temporarily in this case, and consider going short only after the upward momentum has significantly weakened.

## Optimization Directions

1. Optimize indicator parameters to improve signal accuracy  

Backtest results can be tested under different parameter combinations to select the optimal parameters. For example, RSI parameters, CCI parameters can be optimized.

2. Incorporate volume indicators to determine true reversal timing   

Volume indicators such as trading volume or Bollinger bandwidth can be added. This can avoid generating false signals when prices are only adjusting slightly.

3. Optimize profit taking and stop loss strategies to maximize single profit  

Different profit taking and stop loss points can be tested to maximize profit per trade. At the same time, risks should also be balanced to prevent the stop loss from being easily triggered.

## Conclusion   

The mean reversion line strategy comprehensively utilizes multiple indicator judgments and has the characteristics of accurate signals, sound operations, and controllable risks. It is suitable for products that are highly sensitive to market changes and have relatively strong liquidity. It can capture price reversal opportunities between Bollinger Bands and key moving averages to achieve the goal of buying low and selling high.

In practical applications, attention should still be paid to the optimization of indicator parameters, while combining volume indicators to determine the timing of real reversals. In addition, proper risk management should be taken against extreme price fluctuations. If used properly, this strategy can obtain relatively stable alpha returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Risk Limit (%)|
|v_input_2|2|Max Drawdown (x ATR)|
|v_input_3|0|SL Based on: Close Price|Last Traded Price|
|v_input_4|3|Entry distance from signal|
|v_input_5|true|1st exit when reward is|
|v_input_6|100|1st exit quantity %|
|v_input_7|1.5|2nd exit when reward is|
|v_input_8|0.5|Trailing SL compared to original SL|
|v_input_9|true|Show BB|
|v_input_10|true|Show Signals|
|v_input_11|true|From Month|
|v_input_12|true|From Day|
|v_input_13|1990|From Year|
|v_input_14|true|Thru Month|
|v_input_15|true|Thru Day|
|v_input_16|2022|Thru Year|


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
// © sg1999

//@version=4


// >>>>>strategy name
strategy(title = "CCI-RSI MR", shorttitle = "CCI-RSI MR", overlay = true)

// >>>>input variables

// 1. risk per trade as % of initial capital
risk_limit = input(title="Risk Limit (%)", type=input.float, minval=0.1, defval=2.0, step=0.1)

// 2. drawdown
Draw_down = input(title="Max Drawdown (x ATR)", type=input.float, minval=0.5, maxval=10, defval=2.0, step=0.1)

// 3. type of stop loss to be used
original_sl_type  = input(title="SL Based on", defval="Close Price", options=["Close Price","Last Traded Price"])

// 4. entry signal validity for bollinger strategies
dist_from_signal= input(title="Entry distance from signal", type=input.integer, minval=1, maxval=20, defval=3, step=1)

// 5. multiple exit points
exit_1_pft_pct          = input(title="1st exit when reward is", type=input.float, minval=0.5, maxval=100, defval=1.0, step=0.1)
exit_1_qty_pct          = input(title="1st exit quantity %", type=input.float, minval=1, maxval=100, defval=100, step=5)
exit_2_pft_pct          = input(title="2nd exit when reward is", type=input.float, minval=0.5, maxval=100, defval=1.5, step=0.1)
sl_trail_pct            = input(title="Trailing SL compared to original SL", type=input.float, minval=0.5, maxval=100, defval=0.5, step=0.5)

//show signal bool
plotBB = input(title="Show BB", type=input.bool, defval=true)
plotSignals  = input(title="Show Signals", type=input.bool, defval=true)

// 6. date range to be used for backtesting
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 1990, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2022, title = "Thru Year",       type = input.integer, minval = 1970)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true

// >>>>>strategy variables

//input variables 
current_high = highest(high, 5)     // swing high (5 period)
current_low = lowest(low, 5)        // swing low (5 period)
current_ma = sma(close, 5)          // Simple Moving average (5 period)
atr_length = atr(20)                // ATR (20 period)  
CCI = cci(close,20)                 // CCI (20 period)
RSI = rsi(close,14)                 // RSI (14 period)
RSI_5 = sma (RSI, 5)                // Simple moving average of RSI (5 period)


// 1. for current candle

long_entry              = false 
short_entry             = false
risk_reward_ok          = false
sl_hit_flag             = false
tsl_hit_flag            = false
sl_cross                = false

// 2. across candles

var RSI_short           = false     //short signal boolean
var RSI_long            = false     //long signal boolean
var cci_sell            = false     //sellsignal crossunder boolean
var cci_buy             = false     //buy signal crossover boolean
var bar_count_long      = 0         // Number of bars after a long signal 
var bar_count_short     = 0         // Number of bars after a short signal
var candles_on_trade    = 0         
var entry_price         = 0.00
var sl_price            = 0.00
var qty                 = 0
var exit_1_qty          = 0
var exit_2_qty          = 0
var exit_1_price        = 0.0
var exit_2_price        = 0.0
var hold_high           = 0.0       // variable used to calculate Trailing sl
var hold_low            = 0.0       // variable used to calculate Trailing sl
var tsl_size            = 0.0       // Trailing Stop loss size(xR)
var sl_size             = 0.0       // Stop loss size (R)
var tsl_price           = 0.0       //Trailing stoploss price


// >>>>>strategy conditions.
// Bollinger bands (2 std)
[mBB0,uBB0,lBB0] = bb(close,20,2)
uBB0_low= lowest(uBB0,3) // lowest among upper BB of past 3 periods
lBB0_high= highest(lBB0,3) //highest among upper BB of past 3 periods


//RSI and CCI may not necessarily crossunder on the same candle
t_sell_RSI = sum( crossunder(RSI,RSI_5)? 1 : 0, 2) == 1 // checks if crossunder has happened in the last 3 candles (including the current candle)
t_sell_CCI = sum( crossunder(CCI,100)? 1 : 0, 2) == 1 //and (CCI >50)
t_buy_RSI  = sum( crossover(RSI,RSI_5)? 1 : 0, 2) == 1  //checks if crossover has happened in the last 3 candles (including the current candle)
t_buy_CCI  = sum( crossover(CCI,-100) ? 1 : 0, 2) == 1 //and (CCI<-50)

// CONDITIONS FOR A SELL signal
if t_sell_RSI and t_sell_CCI and (current_high >= uBB0_low) 
    cci_sell := true
    bar_count_short := 0
 
if  cci_sell and strategy.position_size ==0 
    bar_count_short := bar_count_short + 1
    
if  cci_sell and bar_count_short<= dist_from_signal and close <= current_ma  and strategy.position_size ==0
    RSI_short := true

//conditions for a BUY signal
if t_buy_RSI and t_buy_CCI and (current_low <= lBB0_high) // or current_low_close <= lBB01_high)
    cci_buy := true
    bar_count_long := 0

if  cci_buy and strategy.position_size ==0 
    bar_count_long := bar_count_long + 1
    
if  cci_buy and  bar_count_long<= dist_from_signal and close >= current_ma and strategy.position_size ==0
    RSI_long := true

if RSI_long and RSI_short
    RSI_long := false
    RSI_short := false



// >>>>>entry and target specifications

if strategy.position_size == 0 and RSI_short 
    short_entry         := true
    entry_price         := close
    sl_price            := current_high + syminfo.mintick // (swing high + one tick) is the stop loss
    sl_size             := abs(entry_price - sl_price)
    candles_on_trade    := 0
    tsl_size            := abs(entry_price - sl_price)*sl_trail_pct // Here sl_trail_pct is the multiple of R which is used to calculate TSL size

if strategy.position_size == 0 and RSI_long 
    long_entry          := true
    entry_price         := close
    sl_price            := current_low -  syminfo.mintick //(swing low - one tick) is the stop loss
    candles_on_trade    := 0
    sl_size             := abs(entry_price - sl_price)
    tsl_size            := abs(entry_price - sl_price)*sl_trail_pct // Here sl_trail_pct is the multiple of R which is used to calculate TSL size
    
if long_entry and short_entry
    long_entry          := false
    short_entry         := false
    
    
// >>>>risk evaluation criteria
    
//>>>>> quantity determination and exit point specifications.
    
if (long_entry or short_entry) and strategy.position_size == 0 // Based on our risk (R), no.of lots is calculated by considering a risk per trade limit formula
    qty                 := round((strategy.equity) * (risk_limit/100)/(abs(entry_price - sl_price)*syminfo.pointvalue))
    exit_1_qty          := round(qty * (exit_1_qty_pct/100))
    exit_2_qty          := qty - (exit_1_qty)
    if long_entry
        exit_1_price    := entry_price + (sl_size * exit_1_pft_pct) 
        exit_2_price    := entry_price + (sl_size * exit_2_pft_pct)
    if short_entry
        exit_1_price    := entry_price - (sl_size * exit_1_pft_pct) 
        exit_2_price    := entry_price - (sl_size * exit_2_pft_pct)
        
        
// trail SL after 1st target is hit
if abs(strategy.position_size) == 0
    hold_high   := 0
    hold_low    := 0

if strategy.position_size > 0 and high > exit_1_price
    if high > hold_high or hold_high == 0
        hold_high    := high
    tsl_price        := hold_high - tsl_size
    

if strategy.position_size < 0 and low < exit_1_price
    if low  < hold_low or hold_low == 0
        hold_low     := low
    tsl_price        := hold_low + tsl_size

    
//>>>> entry conditons

if long_entry and strategy.position_size == 0
    strategy.cancel("BUY", window())   // add another window condition which considers day time (working hours)
    strategy.order("BUY", strategy.long, qty, comment="BUY @ "+ tostring(entry_price),when=window())

if short_entry and strategy.position_size == 0
    strategy.cancel("SELL", window()) // add another window condition which considers day time (working hours)
    strategy.order("SELL", strategy.short, qty, comment="SELL @ "+ tostring(entry_price),when=window())

//>>>> exit conditons

tsl_hit_flag     := false

//exit at tsl
if strategy.position_size > 0 and close < tsl_price  and abs(strategy.position_size)!=qty 
    strategy.order("EXIT at TSL", strategy.short, abs(strategy.position_size),  comment="EXIT TSL @ "+ tostring(close))
    RSI_short                := false   
    RSI_long                 := false
    bar_count_long            := 0
    bar_count_short           := 0
    tsl_hit_flag              := true
    cci_sell := false
    cci_buy := false
    strategy.cancel("EXIT 1", true)
    strategy.cancel("EXIT 2", true)
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at SL",true)

if strategy.position_size < 0 and close > tsl_price  and abs(strategy.position_size)!=qty 
    strategy.order("EXIT at TSL", strategy.long, abs(strategy.position_size), comment="EXIT TSL @ "+ tostring(close))
    RSI_short                := false   
    RSI_long                 := false
    bar_count_long            := 0
    bar_count_short           := 0   
    tsl_hit_flag              := true
    cci_sell := false
    cci_buy := false
    strategy.cancel("EXIT 1", true)
    strategy.cancel("EXIT 2", true)
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at SL",true)

//>>>>exit at sl
    
if strategy.position_size > 0 and original_sl_type == "Close Price" and close < sl_price and abs(strategy.position_size)==qty
    strategy.cancel("EXIT at SL", true)
    strategy.order("EXIT at SL", strategy.short, abs(strategy.position_size),stop= sl_price,  comment="EXIT SL @ "+ tostring(close))
    RSI_short                := false   
    RSI_long                 := false
    bar_count_long            := 0
    bar_count_short           := 0
    cci_buy := false
    cci_sell := false
    sl_hit_flag               := true
    strategy.cancel("EXIT 1", true)
    strategy.cancel("EXIT 2", true)
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at TSL",true)
    

if strategy.position_size < 0 and original_sl_type == "Close Price" and close > sl_price and abs(strategy.position_size)==qty
    strategy.cancel("EXIT at SL", true)
    strategy.order("EXIT at SL", strategy.long, abs(strategy.position_size), stop = sl_price, comment="EXIT SL @ "+ tostring(close))
    RSI_short               := false   
    RSI_long                := false
    bar_count_long           := 0
    bar_count_short          := 0   
    cci_buy := false
    cci_sell := false
    sl_hit_flag              := true
    strategy.cancel("EXIT 1", true)
    strategy.cancel("EXIT 2", true)
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at TSL",true)
    

    
//>>>>>for ltp sl setting

if strategy.position_size > 0 and original_sl_type == "Last Traded Price" and abs(strategy.position_size) ==qty
    strategy.order("EXIT at SL", strategy.short, abs(strategy.position_size),stop= sl_price,  comment="EXIT SL @ "+ tostring(close))
    RSI_short              := false   
    RSI_long               := false
    bar_count_long          := 0
    bar_count_short         := 0
    cci_buy := false
    cci_sell := false
    strategy.cancel("EXIT 1", true)
    strategy.cancel("EXIT 2", true)
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at TSL",true)
    
if strategy.position_size < 0 and original_sl_type == "Last Traded Price" and abs(strategy.position_size) ==qty
    strategy.order("EXIT at SL", strategy.long, abs(strategy.position_size), stop = sl_price, comment="EXIT SL @ "+ tostring(close))
    RSI_short              := false   
    RSI_long               := false
    bar_count_long          := 0
    bar_count_short         := 0   
    cci_buy := false
    cci_sell := false
    strategy.cancel("EXIT 1", true)
    strategy.cancel("EXIT 2", true)
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at TSL",true)

//>>>>>exit at target

if strategy.position_size > 0 and abs(strategy.position_size) == qty and not tsl_hit_flag
    strategy.order("EXIT 1", strategy.short, exit_1_qty, limit=exit_1_price, comment="EXIT TG1 @ "+ tostring(exit_1_price))
    strategy.cancel("Exit Drawd",true)
    cci_sell := false
    cci_buy := false

if strategy.position_size > 0 and abs(strategy.position_size) < qty and abs(strategy.position_size) != qty and not tsl_hit_flag
    strategy.order("EXIT 2", strategy.short, exit_2_qty, limit=exit_2_price, comment="EXIT TG2 @ "+ tostring(exit_2_price))
    RSI_short := false   
    RSI_long  := false
    bar_count_long := 0
    bar_count_short := 0
    cci_buy := false
    cci_sell := false
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at SL", true)

if strategy.position_size < 0 and abs(strategy.position_size) == qty and not tsl_hit_flag
    strategy.order("EXIT 1", strategy.long, exit_1_qty, limit=exit_1_price, comment="EXIT TG1 @ "+ tostring(exit_1_price))
    strategy.cancel("Exit Drawd",true)
    cci_buy := false
    cci_sell := false

if strategy.position_size < 0 and abs(strategy.position_size) < qty and abs(strategy.position_size) != qty 
    strategy.order("EXIT 2", strategy.long, exit_2_qty, limit=exit_2_price, comment="EXIT TG2 @ "+ tostring(exit_2_price))
    RSI_short := false   
    RSI_long  := false
    bar_count_long := 0
    bar_count_short := 0  
    cci_buy := false
    cci_sell := false
    strategy.cancel("Exit Drawd",true)
    strategy.cancel("EXIT at SL", true)
    
//>>>>>>drawdown execution

if strategy.position_size < 0 and original_sl_type == "Close Price" and not tsl_hit_flag  
    strategy.cancel("Exit Drawd",true)
    strategy.order("Exit Drawd", strategy.long, abs(strategy.position_size), stop= (entry_price + Draw_down*atr_length)  ,comment="Drawdown exit S")
    RSI_short            := false   
    RSI_long             := false
    bar_count_long        := 0
    bar_count_short       := 0
    cci_buy := false
    cci_sell := false
   
    
if strategy.position_size > 0 and original_sl_type == "Close Price" and not tsl_hit_flag and not sl_hit_flag 
    strategy.cancel("Exit Drawd",true)
    strategy.order("Exit Drawd", strategy.short, abs(strategy.position_size), stop= (entry_price - Draw_down*atr_length)  ,comment="Drawdown exit B")
    RSI_short           := false   
    RSI_long            := false
    bar_count_long       := 0
    bar_count_short      := 0
    cci_buy := false
    cci_sell := false
    
//>>>>to add sl hit sign  

if strategy.position_size != 0 and sl_hit_flag //For symbols on chart
    sl_cross := true

//>>>>>cancel all pending orders if the trade is booked

strategy.cancel_all(strategy.position_size == 0 and not (long_entry or short_entry))

//>>>>plot indicators
p_mBB = plot(plotBB ? mBB0 : na, color=color.teal)
p_uBB = plot(plotBB ? uBB0 : na, color=color.teal, style=plot.style_stepline)
p_lBB = plot(plotBB ? lBB0 : na, color=color.teal, style=plot.style_stepline)


plot(sma(close,5), color=color.blue, title="MA")





//>>>>plot signals

plotshape(plotSignals and RSI_short, style=shape.triangledown, location=location.abovebar, color=color.red)
plotshape(plotSignals and RSI_long, style=shape.triangleup, location=location.belowbar, color=color.green)
plotshape(sl_cross, text= "Stoploss Hit",size= size.normal,style=shape.xcross , location=location.belowbar, color=color.red)

//>>>>plot signal high low
if strategy.position_size != 0
    candles_on_trade := candles_on_trade + 1

if strategy.position_size != 0 and candles_on_trade == 1
    line.new(x1=bar_index[1], y1=high[1], x2=bar_index[0], y2=high[1], color=color.black, width=2)
    line.new(x1=bar_index[1], y1=low[1],  x2=bar_index[0], y2=low[1],  color=color.black, width=2)



//>>>>end of program




```

> Detail

https://www.fmz.com/strategy/436995

> Last Modified

2023-12-29 11:33:04
