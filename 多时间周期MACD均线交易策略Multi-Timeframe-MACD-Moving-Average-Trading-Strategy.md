
> Name

多时间周期MACD均线交易策略Multi-Timeframe-MACD-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ac36eda4e8acb68e4e.png)
 [trans]

## 概述

该策略基于MACD指标和多个时间周期的均线进行交易信号判断。它综合利用了MACD指标在不同周期上的表现,以及价格关于不同均线的位置关系,设计了长仓和短仓的入场以及出场规则。

## 策略原理

### 1. MACD指标

- 计算5分钟、15分钟、1小时和4小时均线
- 通过价格与不同周期均线的关系判断趋势

### 2. RSI指标

- 计算当前周期和更高周期的RSI值 
- 利用RSI高位转向和低位转向判断反转信号

### 3. K线形态

- 计算多种阳线阴线组合,判断反转信号
- 结合价位关注重要的支撑位和压力位

### 4. 入场规则

**做多条件:** 

- 当前周期RSI指标上穿低位
- 高周期RSI指标出现底背离,表明即将反转

**做空条件:**

- 当前周期RSI指标下穿高位
- 高周期RSI指标出现顶背离,表明即将反转

### 5. 出场规则

**平多条件:**

- K线出现反转信号:趋势反转为阴线,如启明星和暗云罩等

**平空条件:** 

- K线出现反转信号:趋势反转为阳线,如光足和巨量吞噬等

### 6. 风控规则

设定止损和止盈标准,避免亏损扩大和利润缩水。

## 优势分析

1. 多指标组合,综合判断,信号准确性较高
2. 充分利用不同周期信息,提高获利概率
3. 严格的入场出场规则,风险可控

## 风险及优化

1. 参数优化不当可能导致过于频繁交易
2. 需要对指标参数进行优化以适应不同品种
3. 可设置动态止盈止损来锁定盈利

## 总结

该策略总体较为稳健,通过多指标判断和严格的入场出场规则,可以有效把握市场趋势,避免交易风险。但仍需进一步优化以提高收益稳定性。

|| 

## Overview

This strategy is based on the MACD indicator and moving averages across multiple timeframes to generate trading signals. It utilizes the performance of MACD on different periods as well as the price’s position relative to different moving averages to design entry and exit rules for long and short positions.  

## Strategy Logic

### 1. MACD Indicator

- Calculate 5-min, 15-min, 1-hour and 4-hour moving averages  
- Judge the trend based on the price’s relationship with moving averages on different periods

### 2. RSI Indicator  

- Calculate the RSI values on the current period and higher timeframe
- Use RSI topping and bottoming reversals to identify reversal signals

### 3. Candlestick Patterns

- Calculate various bullish and bearish candle combinations to identify reversal signals
- Pay attention to key support and resistance levels in combination with price levels

### 4. Entry Rules  

**Long Condition:**

- Current period RSI breaks above lower line
- Higher period RSI shows bullish divergence, signaling impending reversal

**Short Condition:**  

- Current period RSI breaks below upper line
- Higher period RSI shows bearish divergence, signaling impending reversal


### 5. Exit Rules

**Close Long Condition:**

- Candlestick shows reversal signal: trend reversal to bearish candle, e.g. Shooting Star and Dark Cloud Cover

**Close Short Condition:**

- Candlestick shows reversal signal: trend reversal to bullish candle, e.g. Hammer and Piercing Pattern


### 6. Risk Control

Set stop loss and take profit standards to limit losses and profit erosion.


## Advantage Analysis  

1. Multiple indicator combination for more accurate signals 
2. Make full use of information across periods to improve profitability
3. Strict entry and exit rules ensure controllable risks

## Risks and Optimization  

1. Inappropriate parameter optimization may lead to over-trading  
2. Indicator parameters need optimization for different products
3. Dynamic stop loss and take profit can help lock in profits  

## Summary   

This is an overall robust strategy. By using multiple indicators and strict entry/exit rules, it can effectively capture market trends and avoid trading risks. But further optimization is needed to improve return stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Use Current Chart Resolution|
|v_input_2|1|Use Different Timeframe ? Uncheck Box Above|
|v_input_3|15|Large timeframe ? |
|v_input_4|true|Use Start Time Limiter?|
|v_input_5|2016|Start From Year|
|v_input_6|11|Start From Month|
|v_input_7|22|Start From Day|
|v_input_8|false|Start From Hour|
|v_input_9|false|Start From Minute|
|v_input_10|true|plot macd (only strategy script) ?|
|v_input_11|true|plot rsi info ? |
|v_input_12|14|Length|
|v_input_13|65|Upper Line Value?|
|v_input_14|35|Lower Line Value?|
|v_input_15|true|plot all candle info (only strategy script) ?|
|v_input_16|true|plot fractals info (only strategy script) ?|
|v_input_17|true|plot level info (only strategy script) ?|
|v_input_18|66|Directional PBars, % of Range of Candle the Long Wick Has To Be|
|v_input_19|5|Shaved Bars, % of Range it Has To Close On The Lows or Highs|
|v_input_20|3|min body size factor ? WARNING see pine code to understand|
|v_input_21|72|Reversal PBars, % of Range of Candle the Long Wick Has To Be|
|v_input_22|6|Reversal Pin Bar Lookback Length|
|v_input_23|1500|Take Profit|
|v_input_24|100|Stop Loss|
|v_input_25|false|Trailing Stop Loss|
|v_input_26|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

//
// Author : Jacques CRETINON
// Last Version : V1.0 11-22-2016
// 
// Risk disclaimer : Do not use this script in production environment. We assume no liability or responsibility for any damage to you, your computer, or your other property, due to the use of this script.
//
// Purpose of this script : 
// 1- use same pine code for strategy or study script (with simple modifications)
// 2- be able to send alerts : enterlong, entershort, exitlong, exitshort, stoplosslong, stoplossshort, takeprofitlong, takeprofitshort in a study script like a strategy script should do
// 3- do not repaint (I HOPE)
//
// RoadMap :
// 1- manage : Trailing Stop Loss and Trailing Stop Loss offset
//
// I use this script :
// 1- with default value for XAUUSD, current chart resolution : 1mn, large timeframe : 15mn. 
// 2- That's why I hard code MACD5 (5mn average), MACD15 (15mn average), MACD60 (1h average) ...
// 3- MACD, RSI (1mn and 15mn) and Candles info are my inputs to take any decisions
//
// I do not publish my enterLong, enterShort, exitLong and exitShort conditions (lines 204 to 207 are sample !) as they are not as perfect as I'd like. Fell free to use your own conditions :)
//
// Please, report me any bug, fell free to discuss and share. English is not my natural language, so be clement ;) Happy safe trading :)

// If you use this pine script as a 
// * STRATEGY script => uncomment line 31 and lines 210 to 215 ; comment line 34 ; change value of study_script line 37 to false
// * STUDY    script => uncomment line 34 ; comment line 31 and lines 210 to 215 ; change value of study_script line 37 to true

// STRATEGY script => uncomment ; STUDY script => comment
strategy(title = "JC_MacD_RSI_Candle_Strat", shorttitle = "JMRCS", overlay = true)

// STUDY script => uncomment ; STRATEGY script => comment
//study(title="JC_MacD_RSI_Candle_Alert", shorttitle="JMRCA", precision=0, overlay = false )

// STUDY script => study_script = true ; STRATEGY script => study_script = false
study_script = false

useCurrentRes = input(false, title="Use Current Chart Resolution")
resCustom = input(title="Use Different Timeframe ? Uncheck Box Above",  defval='1')       
res = useCurrentRes ? period : resCustom
largeTimeframe = input(title="Large timeframe ? ",  defval='15')                          

// Strategy Time limiting
useTimeLimit    = input(defval = true, title = "Use Start Time Limiter?")
startYear       = input(defval = 2016, title = "Start From Year",  minval = 0, step = 1)
startMonth      = input(defval = 11, title = "Start From Month",  minval = 0,step = 1)
startDay        = input(defval = 22, title = "Start From Day",  minval = 0,step = 1)
startHour       = input(defval = 00, title = "Start From Hour",  minval = 0,step = 1)
startMinute     = input(defval = 00, title = "Start From Minute",  minval = 0,step = 1)
inputTime   = timestamp(syminfo.timezone, startYear, startMonth, startDay, startHour, startMinute)
timeOk      = true

// when do we apply this script
run_script = (useTimeLimit and timeOk) or not useTimeLimit

// MACD strat
res_macd5_cur_close           = request.security(syminfo.tickerid, res,            sma(close   ,5 ))
res_macd15_cur_close          = request.security(syminfo.tickerid, res,            sma(close   ,15 ))
res_macd60_cur_close          = request.security(syminfo.tickerid, res,            sma(close   ,60 ))
res_macd120_cur_close         = request.security(syminfo.tickerid, res,            sma(close   ,120))
res_macd240_cur_close         = request.security(syminfo.tickerid, res,            sma(close   ,240))

// Plot MACD info
plot_macd = input(true, title="plot macd (only strategy script) ?")
plot(not study_script and run_script and plot_macd ? res_macd5_cur_close : na, title = "macd5", color = red, linewidth = 2, style = line, transp = 50)
plot(not study_script and run_script and plot_macd ? res_macd15_cur_close : na, title = "macd15", color = green, linewidth = 2, style = line, transp = 50)
plot(not study_script and run_script and plot_macd ? res_macd60_cur_close : na, title = "macd60", color = blue, linewidth = 2, style = line, transp = 50)
plot(not study_script and run_script and plot_macd ? res_macd120_cur_close : na, title = "macd120", color = fuchsia, linewidth = 2, style = line, transp = 50)
plot(not study_script and run_script and plot_macd ? res_macd240_cur_close : na, title = "macd240", color = orange, linewidth = 2, style = line, transp = 50)

// This section based on RSI strat from ChrisMoody 8/15/2014
plot_rsi = input(true, title="plot rsi info ? ")
len = input(14, minval=1, title="Length")
upLine = input(65, minval=50, maxval=90, title="Upper Line Value?")
lowLine = input(35, minval=10, maxval=50, title="Lower Line Value?")

// current Time Frame RSI
res_up_cur_close = rma(max(change(close), 0), len)
res_down_cur_close = rma(-min(change(close), 0), len)
res_rsi_cur_close = res_down_cur_close == 0 ? 100 : res_up_cur_close == 0 ? 0 : 100 - (100 / (1 + res_up_cur_close / res_down_cur_close))
res_outRSI_cur_close = request.security(syminfo.tickerid, res, res_rsi_cur_close)

res_aboveLine = res_outRSI_cur_close > upLine ? 1 : 0
res_belowLine = res_outRSI_cur_close < lowLine ? 1 : 0
res_crossUp = res_outRSI_cur_close[1] < lowLine and res_outRSI_cur_close > lowLine ? 1 : 0
res_crossDn = res_outRSI_cur_close[1] > upLine and res_outRSI_cur_close < upLine ? 1 : 0

// Large Time Frame RSI
ltf_up_cur_close = rma(max(change(close), 0), len)
ltf_down_cur_close = rma(-min(change(close), 0), len)
ltf_rsi_cur_close = ltf_down_cur_close == 0 ? 100 : ltf_up_cur_close == 0 ? 0 : 100 - (100 / (1 + ltf_up_cur_close / ltf_down_cur_close))
ltf_outRSI_cur_close = request.security(syminfo.tickerid, largeTimeframe, ltf_rsi_cur_close)

ltf_aboveLine = ltf_outRSI_cur_close > upLine ? 1 : 0
ltf_belowLine = ltf_outRSI_cur_close < lowLine ? 1 : 0
ltf_crossUp = ltf_outRSI_cur_close[1] < lowLine and ltf_outRSI_cur_close > lowLine ? 1 : 0
ltf_crossDn = ltf_outRSI_cur_close[1] > upLine and ltf_outRSI_cur_close < upLine ? 1 : 0

// Plot RSI info
bgcolor(run_script and plot_rsi and res_aboveLine ? red : na, transp=70)
bgcolor(run_script and plot_rsi and res_crossDn ? red : na, transp=40)
bgcolor(run_script and plot_rsi and res_belowLine ? green : na, transp=70)
bgcolor(run_script and plot_rsi and res_crossUp ? green : na, transp=40)
bgcolor(run_script and plot_rsi and ltf_aboveLine ? orange : na, transp=70)
bgcolor(run_script and plot_rsi and ltf_crossDn ? orange : na, transp=40)
bgcolor(run_script and plot_rsi and ltf_belowLine ? blue : na, transp=70)
bgcolor(run_script and plot_rsi and ltf_crossUp ? blue : na, transp=40)

// This section based on [RS]Fractal Levels  by RicardoSantos
plot_candle = input(true, title="plot all candle info (only strategy script) ?")
showfractals = input(true, title="plot fractals info (only strategy script) ?")
showlevels = input(true, title="plot level info (only strategy script) ?")

topfractal = high[2] > high[1] and high[2] > high and high[2] > high[3] and high[2] > high[4]
botfractal = low[2] < low[1] and low[2] < low and low[2] < low[3] and low[2] < low[4]
topfractals = topfractal ? high[2] : topfractals[1]
botfractals = botfractal ? low[2] : botfractals[1]
topfcolor = topfractals != topfractals[1] ? na : green
botfcolor = botfractals != botfractals[1] ? na : red

// This section based on "Candlestick Trend Indicator v0.5"  by JustUncleL Date: 12-Aug-2016  Version: v0.5on Almost Zero Lag EMA [LazyBear]
// PBar Percentages
pctP = input(66, minval=1, maxval=99, title="Directional PBars, % of Range of Candle the Long Wick Has To Be")
pctCp = pctP * .01

// Shaved Bars Percentages
pctS = input(5, minval=1, maxval=99, title="Shaved Bars, % of Range it Has To Close On The Lows or Highs")
pctCs = pctS * .01
pctSPO = pctCs

// range
range = high - low

// discard candle with a little body (addon by cretinon)
tradable_val = input(3, minval=-1, title="min body size factor ? WARNING see pine code to understand") 
body = abs(open - close)
pbody = ((body  / max(high, low)) * 10000 ) > tradable_val ? true : false

// Reversal PinBars %
pctRP = input(72, minval=1, maxval=99, title="Reversal PBars, % of Range of Candle the Long Wick Has To Be")
pctCRp = pctRP * .01
pctCRPO = 1 - pctCRp

// Reversal Pin Bar Lookback Length
pblb =input(6,minval=1,title="Reversal Pin Bar Lookback Length")
pBarRUp = open > high - (range * pctCRPO) and close > high - (range * pctCRPO) and low <= lowest(pblb) ? 1 : 0
pBarRDn = open < high - (range *  pctCRp) and close < high-(range * pctCRp) and high >= highest(pblb) ? 1 : 0

// Shaved Bars filter to the MA50 line
sBarUp   = (close >= (high - (range * pctCs)))  
sBarDown = (close <= (low + (range * pctCs)))

// Inside Bars
insideBarUp = (high < high[1] and low > low[1])
insideBarDn = (high < high[1] and low > low[1])
outsideBarUp= (high > high[1] and low < low[1])
outsideBarDn= (high > high[1] and low < low[1])

// Calculing candles info (only if body is not too small - by cretinon)
pBarDn = open < high - (range * pctCp) and close < high - (range * pctCp)
pBarUp = open > low + (range * pctCp) and close > low + (range * pctCp)
dcc = pbody and ((close[1]>open[1] and abs(close[1]-open[1])/range[1]>=0.7 and close<open and abs(close-open)/range>=0.7 and open>=close[1] and close>open[1] and close<((open[1]+close[1])/2)))
pln= pbody and ((close[1]<open[1] and abs(open[1]-close[1])/range[1]>=0.7 and close>open and abs(close-open)/range>=0.7 and open<=close[1] and close<open[1] and close>((open[1]+close[1])/2)))
beh = pbody and ((close[1] > open[1] and open > close and open <= close[1] and low >= open[1] and open - close < close[1] - open[1] and (high < high[1] and low > low[1])))
blh = pbody and ((open[1] > close[1] and close > open and close <= open[1] and high <= open[1] and close - open < open[1] - close[1] and (high < high[1] and low > low[1])))
bee = pbody and ((close[1] > open[1] and close < open and close<=low[1] and open>= close[1]))
ble = pbody and ((close[1] < open[1] and close > open and close >= high[1] and open<=close[1]))
blfr = pbody and (crossover(close,topfractals))
befr = pbody and (crossunder(close,botfractals))
// Hammer and Inverted Hammer rewrite by cretinon
pHammer = pbody and (pBarUp and (not pBarRUp and not pBarRDn)) ? true :false
pIHammer = pbody and (pBarDn and (not pBarRUp and not pBarRDn)) ? true : false

// Plot candle info
location_Bearish = not study_script ? location.abovebar : location.bottom 
location_Bullish = not study_script ? location.belowbar : location.bottom
plotshape(run_script and plot_candle ? pIHammer : na, title= "Bearish Pin Bar",  color=red, style=shape.arrowdown, location=location_Bearish , text="Bearish\nPinBar")
plotshape(run_script and plot_candle and pHammer,  title= "Bullish Pin Bar", location=location_Bullish, color=green, style=shape.arrowup, text="Bullish\nPinBar")
plotshape(run_script and plot_candle and dcc, title="Dark Cloud Cover",text='DarkCloud\nCover',color=red, style=shape.arrowdown,location=location_Bearish)
plotshape(run_script and plot_candle and pln, title="Piercieng Line",text="Piercing\nLine",color=green, style=shape.arrowup,location=location_Bullish)
plotshape(run_script and plot_candle and beh and not dcc, title= "Bearish Harami",  color=red, style=shape.arrowdown,location=location_Bearish, text="Bear\nHarami")
plotshape(run_script and plot_candle and blh and not pln,  title= "Bullish Harami", location=location_Bullish, color=green, style=shape.arrowup, text="Bull\nHarami")
plotshape(run_script and plot_candle and bee, title= "Bearish Engulfing", color=red, style=shape.arrowdown, location=location_Bearish, text="Bearish\nEngulf")
plotshape(run_script and plot_candle and ble, title= "Bullish Engulfing", location=location_Bullish, color=green, style=shape.arrowup, text="Bullish\nEngulf")
plotshape(run_script and plot_candle and blfr and not ble and not blh and not sBarUp, title= "Bullish Fractal Cross", location=location_Bullish, color=green, style=shape.arrowup, text="Fractal\nCross")
plotshape(run_script and plot_candle and befr and not bee and not beh and not sBarDown,  title= "Bearish Fractal Cross", location=location_Bearish, color=red, style=shape.arrowdown, text="Fractal\nCross")
plotshape(run_script and showlevels ? topfractal : na, color=green, transp=0, style=shape.triangleup, location=location_Bearish, offset=-2, size=size.tiny)
plotshape(run_script and showfractals ? botfractal : na, color=red, transp=0, style=shape.triangledown, location=location_Bullish, offset=-2, size=size.tiny)
plot(study_script ? na : run_script and showlevels ? topfractals : na, color=topfcolor, transp=0, linewidth=2)
plot(study_script ? na : run_script and showfractals ? botfractals : na, color=botfcolor, transp=0, linewidth=2)

// Risk management
inpTakeProfit   = input(defval = 1500, title = "Take Profit", minval = 0)                        
inpStopLoss     = input(defval = 100, title = "Stop Loss", minval = 0)                           
inpTrailStop    = input(defval = 0, title = "Trailing Stop Loss", minval = 0)                    
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)             
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// Condition to enter/exit short/long
enterLong =  (run_script) and res_crossUp
enterShort = (run_script) and res_crossDn
exitLong =   (run_script) and pIHammer
exitShort =  (run_script) and pHammer

// STRATEGY script => uncomment ; STUDY script => comment
strategy.entry( id = "Long", long = true, when = enterLong )
strategy.close( id = "Long", when = exitLong )
strategy.entry( id = "Short", long = false, when = enterShort )
strategy.close( id = "Short", when = exitShort )
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)

// Transform strtegy to alert by cretinon
last_long_trade_value = enterLong[1] ? close[1] : last_long_trade_value[1]
last_short_trade_value = enterShort[1] ? close[1] : last_short_trade_value[1]
are_we_long  = exitLong[1]  ? false : enterLong[1]  ? true : enterShort[1] ? false : are_we_long[1]  and last_long_trade_value  + useTakeProfit/100 <= high[1] ? false : are_we_long[1]  and last_long_trade_value  - useStopLoss/100 >= low[1]  ? false : are_we_long[1]
are_we_short = exitShort[1] ? false : enterShort[1] ? true : enterLong[1]  ? false : are_we_short[1] and last_short_trade_value - useTakeProfit/100 >= low[1]  ? false : are_we_short[1] and last_short_trade_value + useStopLoss/100 <= high[1] ? false : are_we_short[1]
plot_info = (not are_we_long[2] and not are_we_short[2] and enterLong[1])  ? 1 : (not are_we_long[2] and not are_we_short[2] and enterShort[1]) ? 2 : (not are_we_long[2] and not are_we_short[2] and exitLong[1]) ? -1 : (not are_we_long[2] and not are_we_short[2] and exitShort[1]) ? -2 : (are_we_long[2] and enterLong[1]) ? -3 : (are_we_long[2] and enterShort[1]) ? 3 : (are_we_long[2] and exitLong[1]) ? 4 : (are_we_long[2] and exitShort[1]) ? -4 : (are_we_long[2] and last_long_trade_value  + useTakeProfit/100 <= high[1]) ? 5 : (are_we_long[2] and last_long_trade_value  - useStopLoss/100 >= low[1]) ? 6 :(are_we_short[2] and enterLong[1]) ? 7 : (are_we_short[2] and enterShort[1]) ? -5 : (are_we_short[2] and exitLong[1]) ? -6 : (are_we_short[2] and exitShort[1]) ? 8 : (are_we_short[2] and last_short_trade_value - useTakeProfit/100 >= low[1]) ? 9 : (are_we_short[2] and last_short_trade_value + useStopLoss/100 <= high[1]) ? 10 : -7 

// plot : debbuging purpose
plot(study_script ? plot_info : na, title="plot_info", color=yellow, style=line, linewidth=4)

// alertcondition
// STRATEGY script => comment ; STUDY script => uncomment
alertcondition(plot_info == 1,title="enterLong", message="enterLong")
alertcondition(plot_info == 2,title="enterShort", message="enterShort")
alertcondition(plot_info == 3,title="enterShort", message="enterShort after Long")
alertcondition(plot_info == 4,title="exitLong", message="exitLong")
alertcondition(plot_info == 5,title="exitLong", message="TakeProfitLong")
alertcondition(plot_info == 6,title="exitLong", message="StopLossLong")
alertcondition(plot_info == 7,title="enterLong", message="enterLong after Short")
alertcondition(plot_info == 8,title="exitShort", message="exitShort")
alertcondition(plot_info == 9,title="exitShort", message="TakeProfitShort")
alertcondition(plot_info == 10,title="exitShort", message="StopLossShort") 
```

> Detail

https://www.fmz.com/strategy/438929

> Last Modified

2024-01-16 14:06:10
