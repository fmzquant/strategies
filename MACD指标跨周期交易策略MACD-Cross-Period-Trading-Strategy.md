
> Name

MACD指标跨周期交易策略MACD-Cross-Period-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略利用MACD指标在较高周期(例如日线)形成趋势判断,并在较低周期(例如5分钟)进行具体的交易执行。这种跨周期操作,旨在提高MACD指标交易策略的可靠性。

策略原理:

1. 在高周期计算MACD指标,判断大趋势方向。

2. 在低周期寻找入场时点,当MACD上穿信号线时做多,下穿信号线时做空。

3. 结合MFI指标的超买超卖信号,进一步确认交易时点。

4. 设置止损线止盈线,进行风险管理。 

5. 优化参数,提高指标和策略稳定性。

该策略的优势:

1. 跨周期判断,避免被短期市场噪音干扰。

2. MFI指标验证,可过滤假信号,提高准确率。 

3. 止损止盈机制有助于控制单笔交易风险。

该策略的风险:

1. 跨周期操作存在滞后问题,可能错过最佳时点。

2. MACD和MFI均可能出现较多假信号,需谨慎验证。

3. 需要严格的资金管理,以对冲交易风险。

总之,该策略采用跨周期MACD判断大趋势,并利用MFI指标进行 filtring,在低周期进行交易,可提高稳定性。但跨周期滞后问题依然存在,投资者仍需谨慎操作。

||

This strategy uses MACD on higher timeframes (e.g. daily) for trend bias and trades on lower timeframes (e.g. 5-min) for execution. The cross-period approach aims to improve the reliability of basic MACD strategies. 

Strategy Logic:

1. Calculate MACD on higher timeframe for overall trend direction.

2. Enter trades on lower timeframe when MACD crosses signal line.

3. Add MFI overbought/oversold for additional signal confirmation. 

4. Use stops and take profits for risk management.

5. Optimize parameters for greater stability.

Advantages:

1. Cross-period analysis filters short-term noise.

2. MFI helps avoid false signals and improves accuracy.

3. Stop loss/take profit controls single trade risks.

Risks:

1. Cross-period operations lag, potentially missing best entries.

2. Both MACD and MFI can give false signals, require caution. 

3. Strict risk management needed to offset whipsaw risks.

In summary, this approach uses cross-period MACD for bias and MFI for filtring, trading off lower timeframes for stability. But lag issues remain so prudent trading is still required.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_14|true|Highlight Oversold/Overbought?|
|v_input_18|8|Fixed SL (%)|
|v_input_25|false|Min ATR|
|v_input_1|5|(?Strategy)Resolution|
|v_input_2|19|Period|
|v_input_3||Open Long Comment|
|v_input_4||Close Long Comment|
|v_input_5|7|(?MACD)Fast Length|
|v_input_6|23|Slow Length|
|v_input_7|10|Signal Smoothing|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|false|Simple MA(Oscillator)|
|v_input_10|false|Simple MA(Signal Line)|
|v_input_11|15|(?MFI)length|
|v_input_12|12|lower|
|v_input_13|80|upper|
|v_input_15|true|(?Trailing Profit)Enable Trailing|
|v_input_16|4|Long TP (%)|
|v_input_17|0.5|TTP Dev %%|
|v_input_19|false|(?Filters)Show Data|
|v_input_20|false|Use Trend|
|v_input_21|3|Trend EMA|
|v_input_22|false|Use RSI|
|v_input_23|34|RSI Length|
|v_input_24|50|Buy Below RSI Filter|
|v_input_26|2018|(?Backtest)Fr Year|
|v_input_27|true|Fr Month|
|v_input_28|true|Fr Day|
|v_input_29|9999|To Year|
|v_input_30|12|To Month|
|v_input_31|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-11 00:00:00
end: 2023-01-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//(c) Wunderbit Trading
//Modified by Mauricio Zuniga - Trade at your own risk
//This script was originally shared on Wunderbit website as a free open source script for the community. (https://www.tradingview.com/u/Wunderbit/)
// 
//WHAT THIS SCRIPT DOES:
//   This is a scalping script originally intended to be used on altorightmic bot trading.
//   This strategy is based on the trend-following momentum indicator. It includes the Money Flow index as an additional point for entry. 
//HOW IT DOES IT:
//   It uses a combination of MACD and MFI indicators to create entry signals.  Parameters for each indicator have been surfaced for user configurability.
//   Take profits are fixed, but stop loss uses ATR configuration to minimize losses and close profitably.
//HOW IS MY VERSION ORIGINAL:
//   I started trying to deploy this script myself in my algorithmic tradingg but ran into some issues which I have tried to address in this version.
//   Delayed Signals : The script has been refactored to use a time frame drop down.  The higher time frame can be run on a faster chart (recommended on one minute chart for fastest signal confirmation and relay to algotrading platform.  
//   Repainting Issues : All indicators have been recoded to use the security function that checks to see if the current calculation is in realtime, if it is, then it uses the previous bar for calculation.
//   If you are still experiencing repainting issues based on intended (or non intended use), please provide a report with screenshot and explanation so I can try to address.
//   Filtering :  I have added to additional filters an ABOVE EMA Filter and a BELOW RSI Filter (both can be turned on and off) 
//   Customizable Long and Clos Messages : This allows someone to use the script for algorithmic trading without having to alter code.  It also means you can use one indicator for all of your different alterts required for your bots.
//HOW TO USE IT:
//   Find a pair with high volatility - I have found it works particularly well with 3L and 3S tokens for crypto. although it the limitation is that confrigurations I have found to work typically have low R/R ratio, but very high win rate and profit factor.
//   Ieally set one minute chart for bots, but you can use other charts for manual trading.  The signal will be delayed by one bar but I have found configurations that still test well.
//   Select a time frame in configuration for your indicator calculations. 
//   I like ot use 5 and 15 minutes for scalping scenarios, but I am interested in hearing back from other community memebers.
//   Optimize your indicator without filters (trendFilter and RSI Filter)
//   Use the TrendFilter and RSI Filter to further refine your signals for entry.

//@version=4
strategy("Customizable HTF MACD Strategy v1.5", overlay=false, pyramiding=0, commission_type=strategy.commission.percent, commission_value=0.08, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.USD, calc_on_every_tick=true)

openlongcomment = "Comment In Here"
closelongcomment = ""
openshortcomment = ""
closeshortcommment = ""
//RES
res = input(title="Resolution", type=input.resolution, defval="5", group="Strategy", inline="1")
ribbon_period = input(19, "Period", step=1, group="Strategy", inline="1")
olc = input(title="Open Long Comment", type=input.string, defval="",group="Strategy", inline="2")
clc = input(title="Close Long Comment", type=input.string, defval="",group="Strategy", inline="2")
if not(olc == "")
    openlongcomment := olc
if not(clc == "")
    closelongcomment := clc


// FUNCTIONS

Ema(src,p) =>
    ema = 0.
    sf = 2/(p+1)
    ema := nz(ema[1] + sf*(src - ema[1]),src)

Sma(src,p) => a = cum(src), (a - a[max(p,0)])/max(p,0)

Atr(p, res) =>
    atr = 0.
    highHTF = security(syminfo.tickerid, res, high[barstate.isrealtime ? 1 : 0])
    lowHTF = security(syminfo.tickerid, res, low[barstate.isrealtime ? 1 : 0])
    closeHTF = security(syminfo.tickerid, res, close[barstate.isrealtime ? 1 : 0])
    Tr = max(highHTF - lowHTF, max(abs(highHTF - closeHTF[1]), abs(lowHTF - closeHTF[1])))
    atr := nz(atr[1] + (Tr - atr[1])/p,Tr)


htfClose = security(syminfo.tickerid, res, close[barstate.isrealtime ? 1 : 0])

leadLine1 = ema(htfClose, ribbon_period)
leadLine2 = sma(htfClose, ribbon_period)

// p3 = plot(leadLine1, color= #53b987, title="EMA", transp = 50, linewidth = 1)
// p4 = plot(leadLine2, color= #eb4d5c, title="SMA", transp = 50, linewidth = 1)
// fill(p3, p4, transp = 60, color = leadLine1 > leadLine2 ? #53b987 : #eb4d5c)

//Upward Trend
UT=leadLine2 < leadLine1
DT=leadLine2>leadLine1

// MACD
fast_length = input(title="Fast Length", type=input.integer, defval=7, group="MACD", inline='1')
slow_length = input(title="Slow Length", type=input.integer, defval=23, group="MACD", inline='1')
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 10, group="MACD", inline='2')
src = input(title="Source", type=input.source, defval=close, group="MACD", group="MACD", inline='2')
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false, group="MACD", inline='3')
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false, group="MACD", inline='3')

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00


srcHTF = security(syminfo.tickerid, res, src[barstate.isrealtime ? 1 : 0])
// Calculating
fast_ma = sma_source ? Sma(srcHTF, fast_length) : Ema(srcHTF, fast_length)
slow_ma = sma_source ? Sma(srcHTF, slow_length) : Ema(srcHTF, slow_length)

macd = fast_ma - slow_ma
signal = sma_signal ? Sma(macd, signal_length) : Ema(macd, signal_length)
hist = macd - signal

//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
plot(macd, title="MACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)

/// MFI

MFIsource = hlc3
MFTsourceHTF = security(syminfo.tickerid, res, MFIsource[barstate.isrealtime ? 1 : 0])
length = input(15, minval=1, group="MFI", inline='1' )
lower = input(12, minval=0, maxval=50, group="MFI", inline='1')
upper = input(80, minval=50, maxval=100, group="MFI", inline='1')

// DrawMFI_f=input(true, title="Draw MFI?", type=bool)
HighlightBreaches=input(true, title="Highlight Oversold/Overbought?")

volumeHTF = security(syminfo.tickerid, res, volume[barstate.isrealtime ? 1 : 0])

// MFI
upper_s = sum(volumeHTF * (change(MFTsourceHTF) <= 0 ? 0 : MFTsourceHTF), length)
lower_s = sum(volumeHTF * (change(MFTsourceHTF) >= 0 ? 0 : MFTsourceHTF), length)
mf = rsi(upper_s, lower_s)
mfp = plot(mf, color=color.new(color.gray,0), linewidth=1)
top = hline(upper, color=color.new(color.gray, 100), linewidth=1, editable=false)
bottom = hline(lower, color=color.new(color.gray,100), linewidth=1, editable=false)
hline(0, color=color.new(color.black,100), editable=false)
hline(100, color=color.new(color.black,100), editable=false)

// Breaches
b_color = (mf > upper) ? color.new(color.red,70) : (mf < lower) ? color.new(color.green,60) : na
bgcolor(HighlightBreaches ? b_color : na)

fill(top, bottom, color=color.gray, transp=75)

//DEPRACATED
// TAKE PROFIT AND STOP LOSS
//useTP1 = input(false, title="Use TPI", group="TP/SL", inline='1', type=input.bool)
//long_tp1_inp = input(1, title='Long TP 1 %', step=0.1, group="TP/SL", inline='1')/100
//long_tp1_qty = input(20, title="Long TP 1 Qty", step=1, group="TP/SL", inline='1')
//traling profit after goal
useTP1 = false  //these are defined because of depracation above
long_tp1_inp = 6 //these are defined because of depracation above
long_tp1_qty = 100 //these are defined because of depracation above

enableTrailing = input(defval = true, title = 'Enable Trailing', type=input.bool, tooltip = 'Enable or disable the trailing for take profit.', group = 'Trailing Profit',inline='1')
longTakeProfitPerc = input(title="Long TP (%)", type=input.float, minval=0.0, step=0.1, defval=4, group = 'Trailing Profit', inline='1') * 0.01
trailingTakeProfitDeviationPerc = input(defval = 0.5, title = 'TTP Dev %%', type=input.float, minval = 0.01, maxval = 100, step = 0.1, tooltip = 'The step to follow the price when the take profit limit is reached.', group = 'Trailing Profit', inline='1') / 100

//DEPRACATED
long_trailing =1.3 // input(1.3, title='Trailing Stop', step=0.1, group="TP/SL", inline='1', tooltip="") / 100
long_take_level_1 = strategy.position_avg_price * (1 + long_tp1_inp)
longTPPrice  = strategy.position_avg_price * (1 + longTakeProfitPerc)
longLossPerc = input(8, title="Fixed SL (%)", type=input.float, minval=0.0, step=0.1, defval=1, tooltip="Use 100 to turn off - Stop loss % even if ATR did not catch it") * 0.01
longStopPrice = strategy.position_avg_price * (1 - longLossPerc)
//DEPRACATED


// Stop Loss DEPRACATD
multiplier = 2 //input(2, "SL Mult", minval=1, step=0.1, group="TP/SL", inline='2')
ATR_period= 40 //input(40,"ATR Pd", minval=1, step=1, group="TP/SL", inline='2')
//DEPRACATED 


//FILTER LOGIC
//Display numbers
showData = input(false, title="Show Data", group="Filters", inline='3', type=input.bool, tooltip="Use this to help see numbers and help set filters")
//Only trade above this MA
aboveTrend = input(false, title="Use Trend", group="Filters", inline='1', type=input.bool)
TrendLength  = input(3, minval=1, title="Trend EMA", group="Filters", inline='1', type=input.integer)
aboveTrendFilter = ema(htfClose,TrendLength)


useRSI = input(false, title="Use RSI", group="Filters", inline='2', type=input.bool)
RSILength  = input(34, minval=1, title="RSI Length", group="Filters", inline='2') // used to calculate RSI
belowRSIFilter  = input(50, minval=1, title="Buy Below RSI Filter", group="Filters", inline='2') // only buy if its below this RSI - doesn't seem to work as expected
rsi = rsi(htfClose,RSILength)


//Filter via min ATR so you can make sure that there is enough volatility to make a profitable trade
minATR = input(0, title="Min ATR", type=input.float, minval=0.0, step=0.001, defval=1, tooltip="Use 0 to turn off - can remove periods of low volatility where less likely profitable")


if not(useRSI)
    belowRSIFilter := 100
if not(aboveTrend)
    aboveTrendFilter := 0 //should never have 0 moving average so should always be above

atr = Atr(ATR_period,res)

//show actual numbers
if bar_index % 25  == 0 and showData
    label.new(bar_index, na, "RSI = " + tostring(rsi, format.mintick) + "\nATR = "+ tostring(atr, format.mintick), yloc = yloc.abovebar, style = label.style_none, textcolor = color.white, size = size.normal)



// Strategy
entry_long=(crossover(macd,signal) or (crossover(mf,lower) and leadLine2 < leadLine1)) and rsi < belowRSIFilter and close > aboveTrendFilter and atr > minATR
entry_price_long=valuewhen(entry_long,high,0)
//SL_floating_long = entry_price_long -( (entry_price_long)*multiplier/100)//*Atr(ATR_period,res)
//SL_floating_long = entry_price_long - multiplier*Atr(ATR_period,res)
SL_floating_long = entry_price_long - multiplier*atr
exit_long= close < SL_floating_long or close < longStopPrice

bool longIsActive = entry_long or strategy.position_size > 0
// LOGIC for Trailing Profit  ============================================================================================================
float longTakeProfitPrice = na
longTakeProfitPrice := if longIsActive
    if entry_long and not (strategy.position_size > 0)
        close * (1 + longTakeProfitPerc)
    else
        nz(longTakeProfitPrice[1], close * (1 + longTakeProfitPerc))
else
    na

longTrailingTakeProfitStepTicks = longTakeProfitPrice * trailingTakeProfitDeviationPerc / syminfo.mintick
var takeProfitColor = color.new(#419388, 0) 
plot(series = longTakeProfitPrice, title = 'Long Take Profit', color = takeProfitColor, linewidth = 1, style = plot.style_linebr, offset = 1)


///// BACKTEST PERIOD ///////
testStartYear = input(2018, "Fr Year", group="Backtest", inline="1")
testStartMonth = input(1, "Fr Month", group="Backtest", inline="1")
testStartDay = input(1, "Fr Day", group="Backtest", inline="1")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(9999, "To Year", group="Backtest", inline="2")
testStopMonth = input(12, "To Month", group="Backtest", inline="2")
testStopDay = input(31, "To Day", group="Backtest", inline="2")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

if testPeriod()
    if UT
        strategy.entry("long", strategy.long, when=entry_long == true, comment=openlongcomment)
    if (useTP1)
        strategy.exit("TP1","long", qty_percent=long_tp1_qty, limit=long_take_level_1)
    //if (strategy.position_size > 0)
    if (strategy.position_size > 0) and close > longTPPrice
    //strategy.exit(id="long", profit = longTPPrice, comment=closelongcomment)
    // submit exit orders for trailing take profit price
        strategy.exit(id = 'Long Trailing Profit', from_entry = 'long',  comment=closelongcomment, limit = enableTrailing ? na : longTakeProfitPrice, trail_price = enableTrailing ? longTakeProfitPrice : na, trail_offset = enableTrailing ? longTrailingTakeProfitStepTicks : na, when = longIsActive, alert_message = 'Long(' + syminfo.ticker + '): Take Profit activated')
        strategy.exit("ATR Trail stop","long",  comment=closelongcomment,  trail_points=entry_price_long * long_trailing / syminfo.mintick, trail_offset=entry_price_long * long_trailing / syminfo.mintick)
    
    strategy.close("long", exit_long == true,  comment=closelongcomment )


```

> Detail

https://www.fmz.com/strategy/426493

> Last Modified

2023-09-12 15:39:04
