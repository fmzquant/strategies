
> Name

Multi-Indicator-Configurable-Strategy-Generator

> Author

ChaoZhang

> Strategy Description


[trans]
多指标可配置策略生成器

该策略生成器通过组合使用EMA、RSI、Stochastic、MACD和ADX等多种指标,实现高度可配置的算法交易策略。用户可以自由选择开启或关闭每种指标,并自定义各指标的参数,从而产生适合不同市场环境的交易信号。

该策略的优势在于指标组合使用可以形成有效的过滤机制,不同指标可相互验证,减少错误信号。同时,可配置性极强,用户可以针对特定品种和周期进行详尽测试和参数优化,从而获得稳定的交易策略。

但是,过多参数组合也可能导致过度优化和曲线拟合的风险。此外,多指标组合继承了各指标自身的滞后性,可能错过最佳入场时点。因此,实盘过程中仍需持续观察测试结果并及时调整。

总之,该多指标策略生成器使得量化交易策略的建立变得更加便捷高效。但获得长期稳定策略的关键在于严格的统计验证,而非依赖参数优化。只有做到这一点,才能将生成的策略成功应用至实盘中。

||

This strategy generator combines various indicators like EMA, RSI, Stochastic, MACD and ADX to create highly configurable algorithmic trading strategies. Users can freely choose to enable or disable each indicator and customize their parameters, generating trading signals suitable for different market environments.

The advantage of this strategy is that combining indicators forms effective filters, where different indicators can verify each other and reduce false signals. Also, the high configurability allows exhaustive testing and parameter optimization on specific products and timeframes, resulting in robust strategies.

However, too many parameter combinations also risk overfitting and curve fitting. Also, combining multiple indicators inherits their inherent lagging nature, potentially missing optimal entry timing. So continuous monitoring and timely adjustment is still required in live trading.

In summary, the multi-indicator strategy generator makes building quantitative trading strategies much more efficient. But the key to obtaining stable long-term strategies lies in strict statistical verification, not reliance on parameter optimization. Only by achieving this can the generated strategies be successfully applied in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2023|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2023|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_bool_1|true|(?EMA Settings)EMA ON?|
|v_input_bool_2|false|Only 1 EMA|
|v_input_bool_3|false|Only 2 EMAs|
|v_input_int_1|50|EMA Fast Length|
|v_input_int_2|100|EMA middle Length|
|v_input_int_3|200|EMA Slow Length|
|v_input_bool_4|true|(?RSI Settings)RSI ON?|
|v_input_float_1|52|RSI SHORT|
|v_input_float_2|48|RSI LONG|
|v_input_int_4|14|RSI Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|MA Type: SMA|Bollinger Bands|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_int_5|14|MA Length|
|v_input_bool_5|true|(?Stochastic Settings)STOCHASTIC ON?|
|v_input_int_6|14|%K Length|
|v_input_int_7|true|%K Smoothing|
|v_input_int_8|3|%D Smoothing|
|v_input_bool_6|true|By Crossover?|
|v_input_float_3|50|k is greater than|
|v_input_float_4|50|k is less than|
|v_input_bool_7|true|(?MACD Settings)MACD ON?|
|v_input_timeframe_1|1|Time Frame MACD|
|v_input_7|12|Fast Length|
|v_input_8|26|Slow Length|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_9|9|Signal Smoothing|
|v_input_string_2|0|Oscillator MA Type: EMA|SMA|
|v_input_string_3|0|Signal Line MA Type: EMA|SMA|
|v_input_10|false|Add average positve histogram value?|
|v_input_11|false|Subtract average negative histogram value?|
|v_input_float_5|false| + (absolute val)|
|v_input_float_6|false| - (absolute val)|
|v_input_bool_8|true|(?ADX Settings)ADX ON?|
|v_input_12|14|ADX Smoothing|
|v_input_13|14|DI Length|
|v_input_float_7|25|ADX signal strength > |
|v_input_float_8|0.4|(?Take Profit and Stop Loss)Long Stop Loss (%)|
|v_input_float_9|0.4|Short Stop Loss (%)|
|v_input_float_10|0.5|Long Take Profit (%)|
|v_input_float_11|0.5|Short Take Profit (%)|
|v_input_int_10|0|(?Strategy Settings)How Many Trades Allowed In One Direction?: 3|2|1|4|5|6|7|8|9|10|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-08-25 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

 //@version=5
 // By Jordan Hall
// finished: 3/28/2023
strategy("Strategy Creator", overlay=true, margin_long=100, margin_short=100, pyramiding=10, default_qty_type=strategy.percent_of_equity)

///////////////////////////////////////////////////////////////////////////////////////////////////////
/// PERIOD /// 
testStartYear = input(2023, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month") 
testStartDay = input(1, "Backtest Start Day") 
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0) 
 
testStopYear = input(2023, "Backtest Stop Year") 
testStopMonth = input(12, "Backtest Stop Month") 
testStopDay = input(31, "Backtest Stop Day") 
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0) 
 
testPeriod() => 
    time >= testPeriodStart and time <= testPeriodStop ? true : false
///////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////EMA INPUTS//////////////////////////////////////////////////
EMAON = input.bool(true, "EMA ON?", group = "EMA Settings", tooltip = "Check box for on")
IS1EMA = input.bool(false,"Only 1 EMA", " USE EMA FAST LENGTH FOR INPUT", group = "EMA Settings")
IS2EMA = input.bool(false, "Only 2 EMAs", "Only leave this box checked for 2 EMAs. USE EMA MIDDLE LENGTH AND FAST LENGTH", group = "EMA Settings")
EMAFAST = input.int(50,title = "EMA Fast Length", minval = 1, maxval = 2000, group = "EMA Settings")
EMAMIDDLE = input.int(100, title= "EMA middle Length", minval = 1, maxval = 2000, group = "EMA Settings")
EMASLOW = input.int(200, title= "EMA Slow Length", minval = 1, maxval = 2000, group = "EMA Settings")
///////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////RSI/////////////////////////////////////////////////////
RSION = input.bool(true, "RSI ON?", group = "RSI Settings", tooltip = "Check box for on")
ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "Bollinger Bands" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)
//INPUTS & CALCULATIONS
RSIUL = input.float(52, "RSI SHORT", 0,100, tooltip = "RSI must be greater this number to enter a SHORT position", group = "RSI Settings")
RSILL = input.float(48, "RSI LONG", 0,100, tooltip = "RSI must be lower this number to enter a LONG position", group = "RSI Settings")
rsiLengthInput = input.int(14, minval=1, title="RSI Length", group="RSI Settings")
rsiSourceInput = input.source(close, "Source", group="RSI Settings")
maTypeInput = input.string("SMA", title="MA Type", options=["SMA", "Bollinger Bands", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="RSI Settings")
maLengthInput = input.int(14, title="MA Length", group="RSI Settings")
up = ta.rma(math.max(ta.change(rsiSourceInput), 0), rsiLengthInput)
down = ta.rma(-math.min(ta.change(rsiSourceInput), 0), rsiLengthInput)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
rsiMA = ma(rsi, maLengthInput, maTypeInput)
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// ////////////////////////////////////////////////////TSI//////////////////////////////////////////////////
// TSION = input.bool(true, "TSI ON?", group = "TSI Settings", tooltip = "Check box for on")
// TSIUL = input.float(1, "TSI SHORT", -50,50, tooltip = "TSI must be greater this number to enter a SHORT position", group = "TSI Settings")
// TSILL = input.float(-1, "TSI LONG", -50,50, tooltip = "TSI must be lower this number to enter a LONG position", group = "TSI Settings")
// long = input(title="Long Length", defval=25, group = "TSI Settings")
// short = input(title="Short Length", defval=13, group = "TSI Settings")
// signaltsi = input(title="Signal Length", defval=13,group = "TSI Settings")
// price = close
// double_smooth(src, long, short) =>
// 	fist_smooth = ta.ema(src, long)
// 	ta.ema(fist_smooth, short)
// pc = ta.change(price)
// double_smoothed_pc = double_smooth(pc, long, short)
// double_smoothed_abs_pc = double_smooth(math.abs(pc), long, short)
// tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)
// //////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////Stochastic///////////////////////////////////////////////////
STOCHON = input.bool(true, "STOCHASTIC ON?", group = "Stochastic Settings", tooltip = "Check box for on")
periodK = input.int(14, title="%K Length", minval=1,group = "Stochastic Settings")
smoothK = input.int(1, title="%K Smoothing", minval=1,group = "Stochastic Settings")
periodD = input.int(3, title="%D Smoothing", minval=1,group = "Stochastic Settings")
k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)
byValueOrByCrossover = input.bool(true, "By Crossover?", tooltip = "Check box for crossover of k>d for LONG and k<d for SHORT. If by value, input value k must be for position entry", group = "Stochastic Settings")
kValueComparisonSHORT = input.float(50, "k is greater than", 0,100, tooltip = "When k (blueline) is greater than this number, enter a SHORT postion", group = "Stochastic Settings")
kValueComparisonLONG = input.float(50, "k is less than", 0,100, tooltip = "When k (blueline) is less than this number, enter a LONG position", group = "Stochastic Settings")
///////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////MACD W/ diff timeframes////////////////////////////////////////
//Create inputs
MACDON = input.bool(true, "MACD ON?", group = "MACD Settings", tooltip = "Check box for on")
MACD_Other_TimeFrame = input.timeframe("1", title="Time Frame MACD", group = "MACD Settings")
fastAvgLength   = input(title="Fast Length", defval=12, group = "MACD Settings")
slowAvgLength   = input(title="Slow Length", defval=26, group = "MACD Settings")
src = input(title="Source", defval=close, group = "MACD Settings")
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9, group = "MACD Settings")
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"], group = "MACD Settings")
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"], group = "MACD Settings")

// Calculating MACD
fast_ma = sma_source == "SMA" ? ta.sma(src, fastAvgLength) : ta.ema(src, fastAvgLength)
slow_ma = sma_source == "SMA" ? ta.sma(src, slowAvgLength) : ta.ema(src, slowAvgLength)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal

//AVERAGES MACD
var pos_hist_cnt = 0
var pos_hist_total = 0.0
var pos_hist_avg = 0.0
var neg_hist_cnt = 0
var neg_hist_total = 0.0
var neg_hist_avg = 0.0

if (hist <0)
    neg_hist_total := neg_hist_total + hist
    neg_hist_cnt := neg_hist_cnt + 1
    neg_hist_avg := neg_hist_total / neg_hist_cnt

if (hist >0)
    pos_hist_total := pos_hist_total + hist
    pos_hist_cnt := pos_hist_cnt + 1
    pos_hist_avg := pos_hist_total / pos_hist_cnt

posavgadd = input(false, "Add average positve histogram value?", tooltip = "current histogram value must be greater than the positive average plus '+ (absolute val)' number", group = "MACD Settings")
negavgadd = input(false, "Subtract average negative histogram value?", tooltip = "current histogram value must be less than the negative average plus '- (absolute val)' number", group = "MACD Settings")
posnumber = input.float(0.0000, " + (absolute val)", tooltip = "current histogram value must be greater than this (plus positive average if checked) to enter SHORT position", group = "MACD Settings", step = 0.0001)
negnumber = input.float(0.0000, " - (absolute val)", tooltip = "current histogram value must be less than this (minus negative average if checked) to enter LONG position", group = "MACD Settings", step = 0.0001)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////// ADX///////////////////////////////////////////////////
ADXON = input.bool(true, "ADX ON?", group = "ADX Settings", tooltip = "Check box for on")
adxlen = input(14, title="ADX Smoothing", group = "ADX Settings")
dilen = input(14, title="DI Length", group = "ADX Settings")
dirmov(len) =>
	upADX = ta.change(high)
	downADX = -ta.change(low)
	plusDM = na(upADX) ? na : (upADX > downADX and upADX > 0 ? upADX : 0)
	minusDM = na(downADX) ? na : (downADX > upADX and downADX > 0 ? downADX : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)
ADXSIGNALSTRENGTH = input.float(25, "ADX signal strength > ", 0, 100, group = "ADX Settings")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////TP AND SL INPUTS AND CALCULATIONS/////////////////////////////////////
StopLossLongPercentage = input.float(title="Long Stop Loss (%)", minval=0.0, step=0.1, defval=0.4, group="Take Profit and Stop Loss") * 0.01
StopLossLongPrice  = strategy.position_avg_price * (1 - StopLossLongPercentage)

StopLossShortPercentage = input.float(title="Short Stop Loss (%)", minval=0.0, step=0.1, defval=0.4, group="Take Profit and Stop Loss") * 0.01
StopLossShortPrice  = strategy.position_avg_price * (1 + StopLossShortPercentage)

TakeProfitLongPercentage = input.float(title="Long Take Profit (%)", minval=0.0, step=0.1, defval=0.5, group="Take Profit and Stop Loss") * 0.01
TakeProfitLongPrice  = strategy.position_avg_price * (1 + TakeProfitLongPercentage)

TakeProfitShortPercentage = input.float(title="Short Take Profit (%)", minval=0.0, step=0.1, defval=0.5, group="Take Profit and Stop Loss") * 0.01
TakeProfitShortPrice  = strategy.position_avg_price * (1 - TakeProfitShortPercentage)
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////VARIABLES///////////////////////////////////////////////////
//EMAMIDDLE == SHORTER EMA LENGTH, EMASLOW == EMA LONGER LENGTH. IS1EMA == 1 EMA LINE?
//rsi == RELATIVE STRENGTH INDEX VALUE (0 to 100)
//tsi_value == TSI VALUES
//k == K% VALUE (BLUE LINE), d == D% VALUE (RED LINE)
//hist == MACD HISTOGRAM VALUES, macd == MACD VALUE, signal == SIGNAL LINE CROSSING MACD
//neg_hist-avg == NEGATIVE HISTOGRAM VALUES, pos_hist_values == POSITIVE HISTOGRAM VALUES
//adx == ADX VALUES (0 to 100)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IS1EMA = input.bool(false,"Only 1 EMA", " USE EMA FAST LENGTH FOR INPUT", group = "EMA Settings")
// IS2EMA = input.bool(false, "2 EMAs", "Only leave this box checked for 2 EMAs. USE EMA MIDDLE LENGTH AND FAST LENGTH", group = "EMA Settings")
// IS3EMA = input.bool(true, "3 EMAs", "Only leave this box checked for 3 EMAs. USE EMA FAST LENGTH AND MIDDLE AND SLOW LENGTH", group = "EMA Settings")
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////ON OR OFF////////////////////////////////////////////////////////////
                                            //EMA
HowManyEMAsLong = IS1EMA ? close > ta.ema(close, EMAFAST) : IS2EMA ? ta.ema(close, EMAFAST) > ta.ema(close, EMAMIDDLE) : ta.ema(close, EMAFAST) > ta.ema(close, EMAMIDDLE) and ta.ema(close, EMAMIDDLE) > ta.ema(close, EMASLOW)
HowManyEMAsShort = IS1EMA ? close < ta.ema(close, EMAFAST) : IS2EMA ? ta.ema(close, EMAFAST) < ta.ema(close, EMAMIDDLE) : ta.ema(close, EMAFAST) < ta.ema(close, EMAMIDDLE) and ta.ema(close, EMAMIDDLE) < ta.ema(close, EMASLOW)
EMAENTRYLONG = EMAON ? HowManyEMAsLong : true
EMAENTRYSHORT = EMAON ? HowManyEMAsShort : true
                                            //RSI
RSILONG = rsi < RSILL
RSISHORT = rsi > RSIUL
RSIENTRYLONG = RSION ? RSILONG : true
RSIENTRYSHORT = RSION ? RSISHORT : true
                                         //STOCHASTIC
STOCHLONG = byValueOrByCrossover ? (k > d) : (k < kValueComparisonLONG)
STOCHSHORT = byValueOrByCrossover ? (k < d) : (k > kValueComparisonSHORT)
STOCHENTRYLONG = STOCHON ? STOCHLONG : true
STOCHENTRYSHORT = STOCHON ? STOCHSHORT : true
                                            //MACD
HISTLONG = negavgadd ? hist < (neg_hist_avg - negnumber) : hist < negnumber
HISTSHORT = posavgadd ? hist > (pos_hist_avg + posnumber) : hist > posnumber
HISTENTRYLONG = MACDON ? HISTLONG : true
HISTENTRYSHORT = MACDON ? HISTSHORT : true
                                             //ADX
ADXLONG = sig > ADXSIGNALSTRENGTH
ADXSHORT = sig > ADXSIGNALSTRENGTH
ADXLONGENTRY = ADXON ? ADXLONG : true
ADXSHORTENTRY = ADXON ? ADXSHORT : true
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////ONE TRADE AT A TIME////////////////////////////////////////////

STRATEGYISCLOSED = strategy.opentrades == 0 ? true : false

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////HOW MANY TRADES IN A ROW////////////////////////////////////

getLastPosSign1() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-1)) : na

lastPos1Back = getLastPosSign1()
LastStrategy1BackWasLong = nz(lastPos1Back) >= 0 
LastStrategy1BackWasShort = nz(lastPos1Back) <= 0 

oneTradeInOneDirectionLong = LastStrategy1BackWasShort ? true : false
oneTradeInOneDirectionShort = LastStrategy1BackWasLong ? true : false

getLastPosSign2() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-2)) : na

lastPos2Back = getLastPosSign2()
LastStrategy2BackWasLong = nz(lastPos2Back) >= 0
LastStrategy2BackWasShort = nz(lastPos2Back) <= 0 

twoTradesInOneDirectionLong = LastStrategy2BackWasShort or oneTradeInOneDirectionLong ? true : false
twoTradesInOneDirectionShort = LastStrategy2BackWasLong or oneTradeInOneDirectionShort ? true : false

getLastPosSign3() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-3)) : na

lastPos3Back = getLastPosSign3()
LastStrategy3BackWasLong = nz(lastPos3Back) >= 0
LastStrategy3BackWasShort = nz(lastPos3Back) <= 0 

threeTradesInOneDirectionLong = LastStrategy3BackWasShort or twoTradesInOneDirectionLong ? true : false
threeTradesInOneDirectionShort = LastStrategy3BackWasLong or twoTradesInOneDirectionShort ? true : false

getLastPosSign4() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-4)) : na

lastPos4Back = getLastPosSign4()
LastStrategy4BackWasLong = nz(lastPos4Back) >= 0
LastStrategy4BackWasShort = nz(lastPos4Back) <= 0 

fourTradesInOneDirectionLong = LastStrategy4BackWasShort or threeTradesInOneDirectionLong ? true : false
fourTradesInOneDirectionShort = LastStrategy4BackWasLong or threeTradesInOneDirectionShort ? true : false

getLastPosSign5() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-5)) : na

lastPos5Back = getLastPosSign5()
LastStrategy5BackWasLong = nz(lastPos5Back) >= 0
LastStrategy5BackWasShort = nz(lastPos5Back) <= 0 

fiveTradesInOneDirectionLong = LastStrategy5BackWasShort or fourTradesInOneDirectionLong ? true : false
fiveTradesInOneDirectionShort = LastStrategy5BackWasLong or fourTradesInOneDirectionShort ? true : false

getLastPosSign6() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-6)) : na

lastPos6Back = getLastPosSign6()
LastStrategy6BackWasLong = nz(lastPos6Back) >= 0
LastStrategy6BackWasShort = nz(lastPos6Back) <= 0 

sixTradesInOneDirectionLong = LastStrategy6BackWasShort or fiveTradesInOneDirectionLong ? true : false
sixTradesInOneDirectionShort = LastStrategy6BackWasLong or fiveTradesInOneDirectionShort ? true : false

getLastPosSign7() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-7)) : na

lastPos7Back = getLastPosSign7()
LastStrategy7BackWasLong = nz(lastPos7Back) >= 0
LastStrategy7BackWasShort = nz(lastPos7Back) <= 0 

sevenTradesInOneDirectionLong = LastStrategy7BackWasShort or sixTradesInOneDirectionLong ? true : false
sevenTradesInOneDirectionShort = LastStrategy7BackWasLong or sixTradesInOneDirectionShort ? true : false

getLastPosSign8() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-8)) : na

lastPos8Back = getLastPosSign8()
LastStrategy8BackWasLong = nz(lastPos8Back) >= 0
LastStrategy8BackWasShort = nz(lastPos8Back) <= 0 

eightTradesInOneDirectionLong = LastStrategy8BackWasShort or sevenTradesInOneDirectionLong ? true : false
eightTradesInOneDirectionShort = LastStrategy8BackWasLong or sevenTradesInOneDirectionShort ? true : false

getLastPosSign9() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-9)) : na

lastPos9Back = getLastPosSign9()
LastStrategy9BackWasLong = nz(lastPos9Back) >= 0
LastStrategy9BackWasShort = nz(lastPos9Back) <= 0 

nineTradesInOneDirectionLong = LastStrategy9BackWasShort or eightTradesInOneDirectionLong ? true : false
nineTradesInOneDirectionShort = LastStrategy9BackWasLong or eightTradesInOneDirectionShort ? true : false

getLastPosSign10() =>
    strategy.closedtrades > 0 ? math.sign(strategy.closedtrades.size(strategy.closedtrades-10)) : na

lastPos10Back = getLastPosSign10()
LastStrategy10BackWasLong = nz(lastPos10Back) >= 0
LastStrategy10BackWasShort = nz(lastPos10Back) <= 0 

tenTradesInOneDirectionLong = LastStrategy10BackWasShort or nineTradesInOneDirectionLong ? true : false
tenTradesInOneDirectionShort = LastStrategy10BackWasLong or nineTradesInOneDirectionShort ? true : false



LongEntryArray = array.new<bool>()

array.push(LongEntryArray, oneTradeInOneDirectionLong)
array.push(LongEntryArray, twoTradesInOneDirectionLong)
array.push(LongEntryArray, threeTradesInOneDirectionLong)
array.push(LongEntryArray, fourTradesInOneDirectionLong)
array.push(LongEntryArray, fiveTradesInOneDirectionLong)
array.push(LongEntryArray, sixTradesInOneDirectionLong)
array.push(LongEntryArray, sevenTradesInOneDirectionLong)
array.push(LongEntryArray, eightTradesInOneDirectionLong)
array.push(LongEntryArray, nineTradesInOneDirectionLong)
array.push(LongEntryArray, tenTradesInOneDirectionLong)

ShortEntryArray = array.new<bool>()

array.push(ShortEntryArray, oneTradeInOneDirectionShort)
array.push(ShortEntryArray, twoTradesInOneDirectionShort)
array.push(ShortEntryArray, threeTradesInOneDirectionShort)
array.push(ShortEntryArray, fourTradesInOneDirectionShort)
array.push(ShortEntryArray, fiveTradesInOneDirectionShort)
array.push(ShortEntryArray, sixTradesInOneDirectionShort)
array.push(ShortEntryArray, sevenTradesInOneDirectionShort)
array.push(ShortEntryArray, eightTradesInOneDirectionShort)
array.push(ShortEntryArray, nineTradesInOneDirectionShort)
array.push(ShortEntryArray, tenTradesInOneDirectionShort)

HowManyTradesInOneDirectionInput = input.int(3,"How Many Trades Allowed In One Direction?",options = [1,2,3,4,5,6,7,8,9,10], group = "Strategy Settings")

TRADESINAROWLONG = array.get(LongEntryArray, HowManyTradesInOneDirectionInput -1)
TRADESINAROWSHORT = array.get(ShortEntryArray, HowManyTradesInOneDirectionInput -1)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////OPEN LONG///////////////////////////////////////////////////
if EMAENTRYLONG
    if RSIENTRYLONG
        if STOCHENTRYLONG
            if HISTENTRYLONG
                if ADXLONGENTRY
                    if TRADESINAROWLONG
                        if STRATEGYISCLOSED
                            if testPeriod() 
                                strategy.entry("LONG", strategy.long, comment= "ENTER LONG DEAL COMMAND HERE")
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////OPEN SHORT//////////////////////////////////////////////////
if EMAENTRYSHORT
    if RSIENTRYSHORT
        if STOCHENTRYSHORT
            if HISTENTRYSHORT
                if ADXSHORTENTRY
                    if TRADESINAROWSHORT
                        if STRATEGYISCLOSED
                            if testPeriod() 
                                strategy.entry("SHORT", strategy.short, comment= "ENTER SHORT DEAL COMMAND HERE")
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////CLOSE LONG////////////////////////////////////////////////////
if (strategy.position_size > 0)
    strategy.exit("LONG",stop=StopLossLongPrice, limit=TakeProfitLongPrice, comment_profit = "CLOSE LONG DEAL COMMAND HERE", comment_loss = "CLOSE LONG DEAL COMMAND HERE") 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////            

//////////////////////////////////////////////////CLOSE SHORT///////////////////////////////////////////////////
if (strategy.position_size < 0)
    strategy.exit("SHORT",stop=StopLossShortPrice, limit =TakeProfitShortPrice, comment_profit = "CLOSE SHORT DEAL COMMAND HERE", comment_loss = "CLOSE SHORT DEAL COMMAND HERE")
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
```

> Detail

https://www.fmz.com/strategy/426359

> Last Modified

2023-09-11 14:33:12
