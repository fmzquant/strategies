
> Name

量化趋势跟踪交易策略Quant-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
这种策略通过集成多个指标包括均线、区间滤波器、ADX、抛物线止损、量价rancesar、MACD和交易量,构建长线和短线的交易信号。具体来说,策略会同时监控快线JMA、中线MACD、慢线ADX、量价指标RSI、止损指标SAR以及区间滤波器,只有当快中慢多个时间轴上的趋势指标都发出一致信号时,才会做出交易决策。这可以过滤掉部分假信号,避免不必要的失误交易。 

进入信号条件包括:
1. 快线JMA上涨且中线MACD大于0
2. 慢线ADX上的+DI线超过-DI线,表明目前处于趋势状态
3. SAR下穿价格,给出看涨信号 
4. RSI高于中轨,表明目前处于超买状态
5. 区间滤波器价格突破上轨
6. 成交量大幅放量

只要上述条件同时满足,就表明大趋势进入看涨状态,这时策略会选择适当时机建立好多单,进行趋势跟踪。

止盈条件也会同时监控多个指标,包括移动止盈、缩量止盈、时间止盈等。这保证了跟踪止盈的顺畅进行,避免过早离场或者止盈过于滞后。 

整体来说,这种多指标集成的量化策略,可以充分发掘市场中的趋势机会,使得资金配置效率大大提高。同时,策略参数优化空间也非常大,用户可以根据自身需求,对参数组合进行调整,从而获得更加可靠的交易系统。

当然,这类趋势跟踪策略也存在一定的风险。具体来说主要有:

1. 回撤风险:跟踪过程中可能出现一定程度的回撤,需要心理承受能力

2. 震荡风险:震荡行情中,可能产生多次小幅止损,降低盈利水平

3. 突破失败风险:跟踪的趋势突破信号可能是假突破,需要及时止损控制损失

4. 参数风险:参数设置不当也可能导致策略效果差强人意

5. 过优化风险:针对历史数据过度优化,可能导致参数不具有普适性

6. 交易成本风险:交易次数较多时,手续费也会对盈利造成一定影响


总体来说,这种量化趋势跟踪策略,可以通过参数调整获得稳定而高效的交易系统,值得推荐。但用户在使用过程中,也要注意控制交易风险,进行适度优化,以获得长期稳定收益。

||

This strategy integrates multiple indicators including moving averages, range filters, ADX, parabolic SAR, volume-weighted RSI, MACD, and trading volume to construct long and short trading signals. Specifically, the strategy monitors fast line JMA, medium line MACD, slow line ADX, volume-weighted indicator RSI, stop-loss indicator SAR, and range filter at the same time. It only makes trading decisions when trend indicators on multiple timeframes give consistent signals. This filters out some false signals and avoids unnecessary loss trades.

The entry signal conditions include:

1. Fast line JMA rising and medium line MACD above 0
2. Slow line ADX +DI line above -DI line, indicating a trending state  
3. SAR below price, giving a bullish signal
4. RSI above the median line, indicating an overbought state
5. Price breaking through the upper band of the range filter
6. Trading volume surging  

As long as the above conditions are met at the same time, it indicates that the major trend has entered a bullish state. The strategy will then choose appropriate timing to build up multiple positions for trend tracking.

The take profit conditions also monitor multiple indicators simultaneously, including moving stop loss, volume contraction stop loss, time stop loss, etc. This ensures smooth tracking stop losses, avoiding premature exit or lagging stop loss.

Overall, this multi-indicator integrated quant strategy can fully discover trend opportunities in the market, greatly improving capital allocation efficiency. The strategy optimization space is also very large. Users can adjust the parameter combination according to their own needs to obtain a more reliable trading system.

Of course, this type of trend tracking strategy also carries certain risks, mainly:

1. Drawdown risk: There may be some drawdown during tracking that requires psychological endurance.

2. Whipsaw risk: Multiple small stop losses may occur in sideways markets, reducing profitability.

3. Failed breakout risk: The tracked trend breakout signal may be a false one and needs to be stopped out in time to control losses.

4. Parameter risk: Improper parameter settings may also lead to poor strategy performance. 

5. Overfitting risk: Excessive optimization for historical data may result in non-universal parameters.

6. Transaction cost risk: High trading frequency may also have a certain impact on profits.

In summary, by adjusting parameters, this quantitative trend tracking strategy can obtain a stable and efficient trading system worth recommending. But users should also pay attention to controlling trading risks and proper optimization during use for long-term steady gains.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|LONG / SHORT: BOTH|LONG|SHORT|
|v_input_2|true|JURIK MOVING AVERAGE|
|v_input_3|18|JMA LENGTH|
|v_input_4|21|JMA PHASE|
|v_input_5|2|JMA POWER|
|v_input_6|true|RANGE FILTER|
|v_input_7|28|SAMPLING PERIOD|
|v_input_8|1.6|RANGE MULTIPLIER|
|v_input_9|true|ORIGINAL AVERAGE DIRECTIONAL INDEX|
|v_input_10|16|ADX LENGTH|
|v_input_11|17|ADX THRESHOLD|
|v_input_12|true|PARABOLIC SAR|
|v_input_13|0.22|SAR STAR|
|v_input_14|0.2|SAR INC|
|v_input_15|0.12|SAR MAX|
|v_input_16|true|RSI VOLUME WEIGHTED|
|v_input_17|21|RSI LENGHT|
|v_input_18|52|RSI CENTER LINE|
|v_input_19|true|MOVING AVERAGE CONVERGENCE / DIVERGENCE|
|v_input_20|7|MACD FAST LENGTH|
|v_input_21|16|MACD SLOW LENGTH|
|v_input_22|10|MACD SIGNAL SMOOTHING|
|v_input_23|true|UNCONFIRMED FIRST ENTRY ?|
|v_input_24|false|UNCONFIRMED XL/XS|
|v_input_25|0.7|TAKE PROFIT 1 %|
|v_input_26|1.8|TAKE PROFIT 2 %|
|v_input_27|true|TAKE PROFIT FOR PUMPS % |
|v_input_28|false|ACTIVATE STOP LOSS|
|v_input_29|4|STOP LOSS %|
|v_input_30|true|BACKTEST ?|
|v_input_31|2019|BACKTEST START YEAR|
|v_input_32|6|BACKTEST START MONTH|
|v_input_33|true|BACKTEST START DAY|
|v_input_34|2222|BACKTEST STOP YEAR|
|v_input_35|12|BACKTEST STOP MONTH|
|v_input_36|31|BACKTEST STOP DAY|
|v_input_37|0|CONTRACTS ₿ / CASH $: CONTRACTS|CASH|
|v_input_38|0.5|QUANTITY 1ST TP|
|v_input_39|0.5|QUANTITY 2ND TP|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © XaviZ

//@version=4
strategy(title = "SuPeR-RePaNoCHa #2TP#", overlay = true, initial_capital = 10000, pyramiding = 100, currency = "USD",
   calc_on_order_fills = false, calc_on_every_tick = false, default_qty_type = strategy.fixed, default_qty_value = 1, commission_value = 0.03)

//study(title="SuPeR-RePaNoCHa #2TP#", overlay=true)

// VARIABLES
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

var bool longCond = na, var bool shortCond = na
var bool XlongCond = na, var bool XshortCond = na
var int CondIni_long0 = 0, var int CondIni_short0 = 0
var int CondIni_long = 0, var int CondIni_short = 0
var int CondIniX0 = 0, var int CondIniX = 0
var float last_open_longCondition = na, var float last_open_shortCondition = na
var int last_longCondition0 = na, var int last_shortCondition0 = na
var int last_longCondition = na, var int last_shortCondition = na
var int last_XlongCondition0 = na, var int last_XshortCondition0 = na
var int last_XlongCondition = na, var int last_XshortCondition = na
var bool long_tp = na, var bool short_tp = na
var bool long_tp2 = na, var bool short_tp2 = na
var bool long_tp_pump_last_minute = na, var bool short_tp_pump_last_minute = na
var bool long_tp_pump = na, var bool short_tp_pump = na
var int last_long_tp = na, var int last_short_tp = na
var int last_long_tp_pump = na, var int last_short_tp_pump = na
var int last_long_tp2 = na, var int last_short_tp2 = na
var int CondIni_long_sl = 0, var int CondIni_short_sl = 0
var bool Final_Long_sl0 = na, var bool Final_Short_sl0 = na
var bool Final_Long_sl = na, var bool Final_Short_sl = na
var int last_long_sl = na, var int last_short_sl = na
var bool Final_XlongCondition0 = na, var bool Final_XshortCondition0 = na
var bool Final_XlongCondition = na, var bool Final_XshortCondition = na
var int CondIni_Xlong0 = 0, var int CondIni_Xshort0 = 0
var int CondIni_Xlong = 0, var int CondIni_Xshort = 0
var bool Final_longCondition0 = na, var bool Final_shortCondition0 = na
var bool Final_longCondition = na, var bool Final_shortCondition = na
var bool BT_Final_longCondition = na, var bool BT_Final_shortCondition = na
var bool Final_Long_tp = na, var bool Final_Short_tp = na
var bool Final_Long_tp2 = na, var bool Final_Short_tp2 = na
var bool Final_Long_tp_pump = na, var bool Final_Short_tp_pump = na
var bool JMA_longCond = na, var bool JMA_shortCond = na
var bool RF_longCond = na, var bool RF_shortCond = na
var bool ADX_longCond = na, var bool ADX_shortCond = na
var bool SAR_longCond = na, var bool SAR_shortCond = na
var bool RSI_longCond = na, var bool RSI_shortCond = na
var bool MACD_longCond = na, var bool MACD_shortCond = na
var bool JMA_XlongCond = na, var bool JMA_XshortCond = na
var bool RF_XlongCond = na, var bool RF_XshortCond = na
var bool ADX_XlongCond = na, var bool ADX_XshortCond = na
var bool SAR_XlongCond = na, var bool SAR_XshortCond = na

// INITIAL SETTINGS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Position = input("BOTH", "LONG / SHORT", options = ["BOTH","LONG","SHORT"])
src = hlc3, src2 = hl2
is_Long = Position == "SHORT" ? na : true
is_Short = Position == "LONG" ? na : true

// JURIK MOVING AVERAGE
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_JMA = input(true, "JURIK MOVING AVERAGE")
length = input(18, title="JMA LENGTH", type=input.integer, minval = 0)
phase = input(21, title="JMA PHASE", type=input.integer, minval = 0)
power = input(2, title="JMA POWER", type=input.float, minval = 0, step = 0.5)

JMA(src)=>
    phaseRatio = phase < -100 ? 0.5 : phase > 100 ? 2.5 : phase / 100 + 1.5
    beta = 0.45 * (length - 1) / (0.45 * (length - 1) + 2)
    alpha = pow(beta, power)
    jma = 0.0
    e0 = 0.0
    e0 := (1 - alpha) * src + alpha * nz(e0[1])
    e1 = 0.0
    e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
    e2 = 0.0
    e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
    jma := e2 + nz(jma[1])

JMA_Rising = JMA(src) > JMA(src)[1]
JMA_Falling = JMA(src) < JMA(src)[1]
JMA_Rising2 = JMA(src2) > JMA(src2)[1]
JMA_Falling2 = JMA(src2) < JMA(src2)[1]

JMA_color = JMA_Rising ? color.green : JMA_Falling ? color.red : color.yellow

plot(Act_JMA ? JMA(src) : na, color=JMA_color, linewidth = 3, title= "JMA")

// RANGE FILTER
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_RF = input(true, "RANGE FILTER")
per = input(defval=28, title="SAMPLING PERIOD", minval=1)
mult = input(defval=1.6, title="RANGE MULTIPLIER", minval=0.1, step = 0.1)

Range_filter(_src, _per, _mult)=>
    var float _upward = 0.0
    var float _downward = 0.0
    wper = (_per*2) - 1
    avrng = ema(abs(_src - _src[1]), _per)
    _smoothrng = ema(avrng, wper)*_mult
    _filt = _src
    _filt := _src > nz(_filt[1]) ? ((_src-_smoothrng) < nz(_filt[1]) ? nz(_filt[1]) : (_src-_smoothrng)) : ((_src+_smoothrng) > nz(_filt[1]) ? nz(_filt[1]) : (_src+_smoothrng))
    _upward := _filt > _filt[1] ? nz(_upward[1]) + 1 : _filt < _filt[1] ? 0 : nz(_upward[1])
    _downward := _filt < _filt[1] ? nz(_downward[1]) + 1 : _filt > _filt[1] ? 0 : nz(_downward[1])
    [_smoothrng,_filt,_upward,_downward]

[smoothrng, filt, upward, downward] = Range_filter(src, per, mult)
[_, _, upward2, downward2] = Range_filter(src2, per, mult)

hband = filt + smoothrng
lband = filt - smoothrng

filtcolor = upward > 0 ? color.lime : downward > 0 ? color.red : color.orange
filtplot = plot(Act_RF ? filt : na, color = filtcolor, linewidth = 3, title="Range Filter", editable = false)

hbandplot = plot(Act_RF ? hband : na, color = color.aqua, transp = 60, title = "High Target", editable = false)
lbandplot = plot(Act_RF ? lband : na, color = color.aqua, transp = 60, title = "Low Target", editable = false)

fill(hbandplot, filtplot, color = color.aqua, title = "High Target Range", editable = false)
fill(lbandplot, filtplot, color = color.aqua, title = "Low Target Range", editable = false)

// ADX
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_ADX = input(true, "ORIGINAL AVERAGE DIRECTIONAL INDEX")
ADX_len = input(16, title="ADX LENGTH", type=input.integer, minval = 1)
th = input(17, title="ADX THRESHOLD", type=input.integer, minval = 0)

calcADX(_len)=>
    up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, _len)
	_plus = fixnan(100 * rma(plusDM, _len) / truerange)
	_minus = fixnan(100 * rma(minusDM, _len) / truerange)
	sum = _plus + _minus
	_adx = 100 * rma(abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
    [_plus,_minus,_adx] 
    
[DIPlus,DIMinus,ADX] = calcADX(ADX_len)

macol = DIPlus > DIMinus and ADX > th ? color.lime : DIPlus < DIMinus and ADX > th ? color.red : color.orange
barcolor(color = Act_ADX ? macol : na, title = "ADX")

// SAR
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_SAR = input(true, "PARABOLIC SAR")
Sst = input (0.22, "SAR STAR", step=0.01, minval = 0.01)
Sinc = input (0.2, "SAR INC", step=0.01, minval = 0.01)
Smax = input (0.12, "SAR MAX", step=0.01, minval = 0.01)

SAR = sar(Sst, Sinc, Smax)

plot(Act_SAR ? SAR : na, color = macol, style = plot.style_cross, title = "SAR") 

// RSI VOLUME WEIGHTED
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_RSI = input(true, "RSI VOLUME WEIGHTED")
RSI_len = input(21, "RSI LENGHT", minval = 1)
RSI_obos = input(52,title="RSI CENTER LINE", type=input.integer, minval = 1)

WiMA(src, length) => 
    var float MA_s=0.0
    MA_s:=(src + nz(MA_s[1] * (length-1)))/length
    MA_s

RSI_Volume(fv, length) =>	
	up=iff(fv>fv[1],abs(fv-fv[1])*volume,0)
	dn=iff(fv<fv[1],abs(fv-fv[1])*volume,0)
	upt=WiMA(up,length)
	dnt=WiMA(dn,length)
	100*(upt/(upt+dnt))

RSI_V = RSI_Volume(src, RSI_len)

// MACD
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_MACD = input(true, "MOVING AVERAGE CONVERGENCE / DIVERGENCE")
fast_length = input(7, title="MACD FAST LENGTH", type=input.integer, minval = 1)
slow_length = input(16, title="MACD SLOW LENGTH", type=input.integer, minval = 1)
signal_length = input(10, title="MACD SIGNAL SMOOTHING", type=input.integer, minval = 1, maxval = 50)

[_,_,hist] = macd(src,fast_length,slow_length,signal_length)

// STRATEGY
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_not_conf = input(true, "UNCONFIRMED FIRST ENTRY ?")
Act_not_conf_X = input(false, "UNCONFIRMED XL/XS")

JMA_longCond := (Act_JMA ? ((JMA_Rising) or (JMA_Rising2)) : RF_longCond) 
RF_longCond := (Act_RF ? ((high > hband and upward > 0) or (high > hband and upward2 > 0)) : ADX_longCond)
ADX_longCond := (Act_ADX ? (DIPlus > DIMinus and ADX > th) : SAR_longCond)
SAR_longCond := (Act_SAR ? (SAR < close) : RSI_longCond)
RSI_longCond := (Act_RSI ? (RSI_V > RSI_obos) : MACD_longCond)
MACD_longCond := (Act_MACD ? (hist > 0) : JMA_longCond)

JMA_shortCond := (Act_JMA ? ((JMA_Falling) or (JMA_Falling2)) : RF_shortCond) 
RF_shortCond := (Act_RF ? ((low < lband and downward > 0) or (low < lband and downward2 > 0)) : ADX_shortCond)
ADX_shortCond := (Act_ADX ? (DIPlus < DIMinus and ADX > th) : SAR_shortCond)
SAR_shortCond := (Act_SAR ? (SAR > close) : RSI_shortCond)
RSI_shortCond := (Act_RSI ? (RSI_V < RSI_obos) : MACD_shortCond)
MACD_shortCond := (Act_MACD ? (hist < 0) : JMA_shortCond)

longCond := JMA_longCond and RF_longCond and ADX_longCond and SAR_longCond and RSI_longCond and MACD_longCond and volume > sma(volume,30)*0.5
shortCond := JMA_shortCond and RF_shortCond and ADX_shortCond and SAR_shortCond and RSI_shortCond and MACD_shortCond and volume > sma(volume,30)*0.5

JMA_XlongCond := (Act_JMA ? ((JMA_Falling) or (JMA_Falling2)) : RF_XlongCond) 
RF_XlongCond := (Act_RF ? ((low < lband and downward > 0) or (low < lband and downward2 > 0)) : ADX_XlongCond)
ADX_XlongCond := (Act_ADX ? (DIPlus > DIMinus and ADX > th) : SAR_XlongCond)
SAR_XlongCond := (Act_SAR ? (SAR > close) : JMA_XlongCond)

JMA_XshortCond := (Act_JMA ? ((JMA_Rising) or (JMA_Rising2)) : RF_XshortCond) 
RF_XshortCond := (Act_RF ? ((high > hband and upward > 0) or (high > hband and upward2 > 0)) : ADX_XshortCond)
ADX_XshortCond := (Act_ADX ? (DIPlus < DIMinus and ADX > th) : SAR_XshortCond)
SAR_XshortCond := (Act_SAR ? (SAR < close) : JMA_XshortCond)

XlongCond := JMA_XlongCond and RF_XlongCond and ADX_XlongCond and SAR_XlongCond
XshortCond := JMA_XshortCond and RF_XshortCond and ADX_XshortCond and SAR_XshortCond

CondIni_long0 := longCond ? 1 : shortCond ? -1 : CondIni_long0[1]
CondIni_short0 := longCond ? 1 : shortCond ? -1 : CondIni_short0[1]

longCondition0 = (longCond and CondIni_long0[1] == -1)
shortCondition0 = (shortCond and CondIni_short0[1] == 1)

CondIni_long := longCond[1] ? 1 : shortCond[1] ? -1 : CondIni_long[1]
CondIni_short := longCond[1] ? 1 : shortCond[1] ? -1 : CondIni_short[1]

longCondition = (longCond[1] and CondIni_long[1] == -1)
shortCondition = (shortCond[1] and CondIni_short[1] == 1)

CondIniX0 := XlongCond ? 1 : XshortCond ? -1 : CondIniX0[1]

XlongCondition0 = XlongCond and CondIniX0[1] == -1
XshortCondition0 = XshortCond and CondIniX0[1] == 1

CondIniX := XlongCond[1] ? 1 : XshortCond[1] ? -1 : CondIniX[1]

XlongCondition = XlongCond[1] and CondIniX[1] == -1
XshortCondition = XshortCond[1] and CondIniX[1] == 1

// Get the price of the last opened long or short

last_open_long0 = max(SAR[1],hband)
last_open_short0 = min(SAR[1],lband)

last_open_longCondition := longCondition0 and not longCondition ? max(last_open_long0,open) : longCondition ? open : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition0 and not shortCondition ? min(last_open_short0, open) : shortCondition ? open : nz(last_open_shortCondition[1])

// Check if your last postion was a long or a short

last_longCondition0 := longCondition0 ? time : nz(last_longCondition0[1])
last_shortCondition0 := shortCondition0 ? time : nz(last_shortCondition0[1])

in_longCondition0 = last_longCondition0 > last_shortCondition0
in_shortCondition0 = last_shortCondition0 > last_longCondition0

last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])

in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition

last_XlongCondition0 := XlongCondition0 ? time : nz(last_XlongCondition0[1])
last_XshortCondition0 := XshortCondition0 ? time : nz(last_XshortCondition0[1])

in_longConditionX0 = last_longCondition > last_XlongCondition0
in_shortConditionX0 = last_shortCondition > last_XshortCondition0

last_XlongCondition := XlongCondition ? time : nz(last_XlongCondition[1])
last_XshortCondition := XshortCondition ? time : nz(last_XshortCondition[1])

in_longConditionX = last_longCondition > last_XlongCondition
in_shortConditionX = last_shortCondition > last_XshortCondition

// TAKE PROFIT 1
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

tp = input(0.7, "TAKE PROFIT 1 %", type = input.float, step = 0.1) 

// TP Conditions

long_tp := (is_Long and high > (last_open_longCondition*(1+(tp/100))) and not (shortCondition0 and Act_not_conf) and in_longCondition and in_longConditionX)
short_tp := (is_Short and low < (last_open_shortCondition*(1-(tp/100))) and not (longCondition0 and Act_not_conf) and in_shortCondition and in_shortConditionX)

// Get the time of the last tp close

last_long_tp := long_tp ? time : nz(last_long_tp[1])
last_short_tp := short_tp ? time : nz(last_short_tp[1])

Final_Long_tp := (long_tp and last_longCondition > nz(last_long_tp[1]) and last_longCondition > nz(last_long_sl[1]))
Final_Short_tp := (short_tp and last_shortCondition > nz(last_short_tp[1]) and last_shortCondition > nz(last_short_sl[1]))

// TAKE PROFIT 2
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

tp2 = input(1.8, "TAKE PROFIT 2 %", type = input.float, step = 0.1) 

// TP Conditions

long_tp2 := (is_Long and high > (last_open_longCondition*(1+(tp2/100))) and not (shortCondition0 and Act_not_conf) and in_longCondition and in_longConditionX)
short_tp2 := (is_Short and low < (last_open_shortCondition*(1-(tp2/100))) and not (longCondition0 and Act_not_conf) and in_shortCondition and in_shortConditionX)

// Get the time of the last tp2 close

last_long_tp2 := long_tp2 ? time : nz(last_long_tp2[1])
last_short_tp2 := short_tp2 ? time : nz(last_short_tp2[1])

Final_Long_tp2 := (long_tp2 and last_longCondition > nz(last_long_tp2[1]) and last_longCondition > nz(last_long_sl[1]))
Final_Short_tp2 := (short_tp2 and last_shortCondition > nz(last_short_tp2[1]) and last_shortCondition > nz(last_short_sl[1]))
   
// Tp for Pumps

tp_pump = input(1.0, "TAKE PROFIT FOR PUMPS % ", type = input.float, step = 0.1)

long_tp_pump := is_Long and longCondition0 and not longCondition and high > last_open_longCondition*(1+(tp_pump/100)) and Act_not_conf
short_tp_pump := is_Short and shortCondition0 and not shortCondition and low < last_open_shortCondition*(1-(tp_pump/100)) and Act_not_conf

// Get the time of the last ts close

last_long_tp_pump := long_tp_pump ? time : nz(last_long_tp2[1])
last_short_tp_pump := short_tp_pump ? time : nz(last_short_tp2[1])

Final_Long_tp_pump := (long_tp_pump and last_longCondition > nz(last_long_tp_pump[1]) and last_longCondition > nz(last_long_sl[1]))
Final_Short_tp_pump := (short_tp_pump and last_shortCondition > nz(last_short_tp_pump[1]) and last_shortCondition > nz(last_short_sl[1]))

// STOP LOSS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_sl = input(false, "ACTIVATE STOP LOSS")
sl = input(4.0, "STOP LOSS %", type = input.float, step = 0.1)

long_sl = Act_sl and is_Long and low <= ((1-(sl/100))*last_open_longCondition) and not (open < ((1-(sl/100))*last_open_longCondition)) 
short_sl = Act_sl and is_Short and high >= ((1+(sl/100))*last_open_shortCondition) and not (open > ((1+(sl/100))*last_open_shortCondition))

// Sl

Final_Long_sl0 := Position == "BOTH" ? long_sl and CondIni_long_sl[1] == -1 and not Final_Long_tp2 and not shortCondition and not (shortCondition0 and Act_not_conf) : 
   long_sl and CondIni_long_sl[1] == -1 and not Final_Long_tp2
   
Final_Short_sl0 := Position == "BOTH" ? short_sl and CondIni_short_sl[1] == -1 and not Final_Short_tp2 and not longCondition and not (longCondition0 and Act_not_conf) : 
   short_sl and CondIni_short_sl[1] == -1 and not Final_Short_tp2

// Get the time of the last sl close

last_long_sl := Final_Long_sl ? time : nz(last_long_sl[1])
last_short_sl := Final_Short_sl ? time : nz(last_short_sl[1])

Final_Long_sl := Final_Long_sl0 and last_longCondition > nz(last_long_tp2[1]) and last_longCondition > nz(last_long_sl[1])
Final_Short_sl := Final_Short_sl0 and last_shortCondition > nz(last_short_tp2[1]) and last_shortCondition > nz(last_short_sl[1])

// SIGNALS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// long & short

Final_longCondition0 := is_Long and  longCondition0 and not longCondition and nz(CondIni_long0[1]) == -1 and Act_not_conf
Final_shortCondition0 := is_Short and shortCondition0 and not shortCondition and nz(CondIni_short0[1]) == 1 and Act_not_conf

plotshape(Final_longCondition0, title = "Not_Conf Long Signal", text = "?", style=shape.triangleup, location=location.belowbar, color = color.blue, transp = 0, size=size.tiny)
plotshape(Final_shortCondition0, title = "Not_Conf Short Signal", text = "?", style=shape.triangledown, location=location.abovebar, color = #FF0000, transp = 0, size=size.tiny)

Final_longCondition := is_Long and longCondition and not Final_shortCondition0 //and not (Final_longCondition0[1] and not Final_Long_ts_pump[1])
Final_shortCondition := is_Short and shortCondition and not Final_longCondition0 //and not (Final_shortCondition0[1] and not Final_Short_ts_pump[1])

plotshape(Final_longCondition, title = "Long Signal", style=shape.triangleup, location=location.belowbar, color = color.blue, transp = 0, size=size.tiny)
plotshape(Final_shortCondition, title = "Short Signal", style=shape.triangledown, location=location.abovebar, color = #FF0000, transp = 0, size=size.tiny)

// Xlong0 & Xshort0

CondIni_Xlong0 := Final_Long_tp or Final_Short_tp or Final_Long_sl or Final_XlongCondition0 or Final_shortCondition0 or Final_shortCondition ? 1 : 
   Final_longCondition0 or Final_longCondition ? -1 : nz(CondIni_Xlong0[1])
   
CondIni_Xshort0 := Final_Long_tp or Final_Short_tp or Final_Short_sl or Final_XshortCondition0 or Final_longCondition0 or Final_longCondition ? 1 : 
   Final_shortCondition0 or Final_shortCondition ? -1 : nz(CondIni_Xshort0[1])

Final_XlongCondition0 := (Position == "SHORT" ? na : Position == "BOTH" ? (XlongCondition0 and last_longCondition > last_XlongCondition0[1]) : 
   ((shortCondition0 and last_longCondition > last_shortCondition0[1]) or (XlongCondition0 and last_longCondition > last_XlongCondition0[1]))) 
   and CondIni_Xlong0 == -1 and not Final_longCondition0 and not Final_shortCondition0 and not Final_longCondition and not Final_shortCondition
   
Final_XshortCondition0 := (Position == "LONG" ? na : Position == "BOTH" ? (XshortCondition0 and last_shortCondition > last_XshortCondition0[1]) :
   ((longCondition0 and last_shortCondition > last_longCondition0[1]) or (XshortCondition0 and last_shortCondition > last_XshortCondition0[1]))) 
   and CondIni_Xshort0 == -1 and not Final_longCondition0 and not Final_shortCondition0 and not Final_longCondition and not Final_shortCondition
   
// Xlong & Xshort

CondIni_Xlong := Final_Long_tp or Final_Short_tp or Final_Long_sl or Final_XlongCondition or Final_shortCondition0 or Final_shortCondition ? 1 : 
   Final_longCondition0 or Final_longCondition ? -1 : nz(CondIni_Xlong[1])
   
CondIni_Xshort := Final_Long_tp or Final_Short_tp or Final_Short_sl or Final_XshortCondition or Final_longCondition0 or Final_longCondition ? 1 : 
   Final_shortCondition0 or Final_shortCondition ? -1 : nz(CondIni_Xshort[1])

Final_XlongCondition := (Position == "SHORT" ? na : Position == "BOTH" ? (XlongCondition and last_longCondition > last_XlongCondition[1]) : 
   ((shortCondition and last_longCondition > last_shortCondition[1]) or (XlongCondition and last_longCondition > last_XlongCondition[1]))) 
   and CondIni_Xlong == -1 and not Final_longCondition0 and not Final_shortCondition0
   
Final_XshortCondition := (Position == "LONG" ? na : Position == "BOTH" ? (XshortCondition and last_shortCondition > last_XshortCondition[1]) :
   ((longCondition and last_shortCondition > last_longCondition[1]) or (XshortCondition and last_shortCondition > last_XshortCondition[1]))) 
   and CondIni_Xshort == -1 and not Final_longCondition0 and not Final_shortCondition0
   
Final_XL = (Final_XlongCondition0 and Act_not_conf_X) or (Final_XlongCondition and not Act_not_conf_X)
Final_XS = (Final_XshortCondition0 and Act_not_conf_X) or (Final_XshortCondition and not Act_not_conf_X)

plotshape(Final_XL, title = "XL Signal", text = "XL", style=shape.triangledown, location=location.abovebar, color = color.orange, transp = 0, size=size.tiny)
plotshape(Final_XS, title = "XS Signal", text = "XS", style=shape.triangleup, location=location.belowbar, color = color.aqua, transp = 0, size=size.tiny)

// TP

plotshape(Final_Long_tp and not Final_Long_tp2, text ="TP", title="Take Profit Long", style=shape.triangledown, location=location.abovebar, color = color.red, editable = false, transp = 0) 
plotshape(Final_Short_tp and not Final_Short_tp2, text ="TP", title="Take Profit Short", style=shape.triangleup, location=location.belowbar, color = color.lime, editable = false, transp = 0) 

ltp = iff(Final_Long_tp, last_open_longCondition*(1+(tp/100)), na), plot(ltp, style = plot.style_cross, linewidth=3, color = color.white, editable = false)
stp = iff(Final_Short_tp, last_open_shortCondition*(1-(tp/100)), na), plot(stp, style = plot.style_cross, linewidth=3, color = color.white, editable = false)

// TP2

plotshape(Final_Long_tp2 and not Final_Long_tp, text ="TP2", title="Take Profit Long 2", style=shape.triangledown, location=location.abovebar, color = color.red, editable = false, transp = 0) 
plotshape(Final_Short_tp2 and not Final_Short_tp, text ="TP2", title="Take Profit Short 2", style=shape.triangleup, location=location.belowbar, color = color.lime, editable = false, transp = 0) 

ltp2 = iff(Final_Long_tp2, last_open_longCondition*(1+(tp2/100)), na), plot(ltp2, style = plot.style_cross, linewidth=3, color = color.white, editable = false)
stp2 = iff(Final_Short_tp2, last_open_shortCondition*(1-(tp2/100)), na), plot(stp2, style = plot.style_cross, linewidth=3, color = color.white, editable = false)

// TP & TP2

plotshape(Final_Long_tp and Final_Long_tp2, title="TP & TP2 Long", style=shape.flag, location=location.abovebar, color = color.red, editable = false, transp = 0, size=size.tiny) 
plotshape(Final_Short_tp and Final_Short_tp2, title="TP & TP2 Short", style=shape.flag, location=location.belowbar, color = color.green, editable = false, transp = 0, size=size.tiny) 

// TP on Pumps

plotshape(Final_Long_tp_pump and Final_longCondition0, text ="PUMP", title="Take Profit Long Pump", style=shape.triangledown, 
   location=location.abovebar, color = color.red, editable = false, transp = 0) 
plotshape(Final_Short_tp_pump and Final_shortCondition0, text ="PUMP", title="Take Profit Short Pump", style=shape.triangleup, 
   location=location.belowbar, color = color.lime, editable = false, transp = 0) 

ltp_pump = iff(Final_Long_tp_pump and Final_longCondition0, last_open_longCondition*(1+(tp_pump/100)), na), plot(ltp_pump, style = plot.style_cross, linewidth=3, color = color.white, editable = false)
stp_pump = iff(Final_Short_tp_pump and Final_shortCondition0, last_open_shortCondition*(1-(tp_pump/100)), na), plot(stp_pump, style = plot.style_cross, linewidth=3, color = color.white, editable = false)

// Sl

plotshape(Final_Long_sl, text ="SL", title="Stop Loss Long", style=shape.triangledown, location=location.abovebar, color = color.fuchsia, editable = false, transp = 0) 
plotshape(Final_Short_sl, text ="SL", title="Stop Loss Short", style=shape.triangleup, location=location.belowbar, color = color.fuchsia, editable = false, transp = 0) 

lsl = iff(Final_Long_sl, (1-(sl/100))*last_open_longCondition, na), plot(lsl, style = plot.style_cross, linewidth=3, color = color.white, editable = false)
ssl = iff(Final_Short_sl, (1+(sl/100))*last_open_shortCondition, na), plot(ssl, style = plot.style_cross, linewidth=3, color = color.white, editable = false)

// Final Long & Short Counter

if Final_Long_tp or Final_Long_sl or Final_XlongCondition
    CondIni_long := -1
    CondIni_long0 := -1
        
if Final_Short_tp or Final_Short_sl or Final_XshortCondition
    CondIni_short := 1
    CondIni_short0 := 1

if Final_longCondition
    CondIni_long0 := 1

if Final_shortCondition
    CondIni_short0 := -1
    
// Final SL Counter

CondIni_long_sl := Final_Long_sl or Final_shortCondition0 or Final_shortCondition or Final_XlongCondition ? 1 : Final_longCondition0 or Final_longCondition ? -1 : CondIni_long_sl[1]

CondIni_short_sl := Final_Short_sl or Final_longCondition0 or Final_longCondition or Final_XshortCondition ? 1 : Final_shortCondition0 or Final_shortCondition ? -1 : CondIni_short_sl[1]
    
// Levels

plot(is_Long and in_longCondition0 and not longCondition0 ? (last_open_longCondition*(1+(tp/100))) : na, "Long Take Profit", color = color.green, style=3, linewidth=1, editable = false)
plot(is_Short and in_shortCondition0 and not shortCondition0 ? (last_open_shortCondition*(1-(tp/100))) : na, "Short Take Profit", color =color.red , style=3, linewidth=1, editable = false)

plot(is_Long and in_longCondition0 and not longCondition0 ? (last_open_longCondition*(1+(tp2/100))) : na, "Long Take Profit 2", color = color.aqua, style=3, linewidth=1, editable = false)
plot(is_Short and in_shortCondition0 and not shortCondition0 ? (last_open_shortCondition*(1-(tp2/100))) : na, "Short Take Profit 2", color = color.orange, style=3, linewidth=1, editable = false)

// Weekend

Weekend = true
W_color = Weekend and (dayofweek == dayofweek.sunday or dayofweek == dayofweek.saturday) ? color.teal : na
bgcolor(W_color, title = "WEEKEND")

// BACKTESTING
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

Act_BT = input(true, "BACKTEST ?")

BT_Final_longCondition := Position == "SHORT" ? na : (longCondition0 and not in_longCondition) or (Final_Long_tp and longCond) or (longCondition0 and not longCondition) or
   (longCondition0 and CondIni_long[1] == -1) and not (Final_Long_tp[1] and longCond) and not (Final_Long_tp[1] and longCond[1])
BT_Final_shortCondition := Position == "LONG" ? na : (shortCondition0 and not in_shortCondition) or (Final_Short_tp and shortCond) or (shortCondition0 and not shortCondition) or
   (shortCondition0 and CondIni_short[1] == 1) and not (Final_Short_tp[1] and shortCond) and not (Final_Short_tp[1] and shortCond[1])

testStartYear = input(2019, "BACKTEST START YEAR", minval = 1980, maxval = 2222) 
testStartMonth = input(06, "BACKTEST START MONTH", minval = 1, maxval = 12)
testStartDay = input(01, "BACKTEST START DAY", minval = 1, maxval = 31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear = input(2222, "BACKTEST STOP YEAR", minval=1980, maxval = 2222)
testStopMonth = input(12, "BACKTEST STOP MONTH", minval=1, maxval=12)
testStopDay = input(31, "BACKTEST STOP DAY", minval=1, maxval=31)
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

contracts_or_cash = input("CONTRACTS", "CONTRACTS ₿ / CASH $", options = ["CONTRACTS","CASH"])
cc_factor = (contracts_or_cash == "CASH") ? open : 1
quantity_cash_1TP = input(0.5, "QUANTITY 1ST TP", type = input.float) / cc_factor
quantity_cash_2TP = input(0.5, "QUANTITY 2ND TP", type = input.float) / cc_factor

testPeriod = time >= testPeriodStart and time <= testPeriodStop ? true : false

if (BT_Final_longCondition)
    strategy.entry("long1", strategy.long, qty = quantity_cash_1TP, when = Act_BT and testPeriod)
    strategy.entry("long2", strategy.long, qty = quantity_cash_2TP, when = Act_BT and testPeriod)

if (BT_Final_shortCondition) 
    strategy.entry("short1", strategy.short, qty = quantity_cash_1TP, when = Act_BT and testPeriod)
    strategy.entry("short2", strategy.short, qty = quantity_cash_2TP, when = Act_BT and testPeriod)

strategy.exit("Tpl", "long1", profit = (abs((last_open_longCondition*(1+(tp/100)))-last_open_longCondition)/syminfo.mintick), 
   loss = Act_sl ? (abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)/syminfo.mintick) : na)
strategy.exit("Tps", "short1", profit = (abs((last_open_shortCondition*(1-(tp/100)))-last_open_shortCondition)/syminfo.mintick),
   loss = Act_sl ? (abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)/syminfo.mintick) : na)
   
strategy.exit("Tpl2", "long2", profit = (abs((last_open_longCondition*(1+(tp2/100)))-last_open_longCondition)/syminfo.mintick), 
   loss = Act_sl ? (abs((last_open_longCondition*(1-(sl/100)))-last_open_longCondition)/syminfo.mintick) : na)
strategy.exit("Tps2", "short2", profit = (abs((last_open_shortCondition*(1-(tp2/100)))-last_open_shortCondition)/syminfo.mintick),
   loss = Act_sl ? (abs((last_open_shortCondition*(1+(sl/100)))-last_open_shortCondition)/syminfo.mintick) : na)

strategy.close_all(when = Final_XlongCondition0 or Final_XshortCondition0)

// ALERTS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

//alertcondition(Final_longCondition0, title="Not_Conf Long Alert", message = "NC LONG") 

//alertcondition(Final_shortCondition0, title="Not_Conf Short Alert", message = "NC SHORT")

//alertcondition(Final_longCondition, title="Long Alert", message = "LONG") 

//alertcondition(Final_shortCondition, title="Short Alert", message = "SHORT")

//alertcondition(Final_Long_tp, title="Take Profit on Longs Alert", message = "LONG TP")

//alertcondition(Final_Short_tp, title="Take Profit on Shorts Alert", message = "SHORT TP")

//alertcondition(Final_Long_tp2, title="Take Profit2 on Longs Alert", message = "LONG TP2")

//alertcondition(Final_Short_tp2, title="Take Profit2 on Shorts Alert", message = "SHORT TP2")

//alertcondition(Final_XlongCondition or Final_Long_sl or (Final_Long_tp_pump and Act_not_conf), title="XLong/PUMP/Stop-Loss on Longs Alert", message = "XLONG/PUMP/STOP-LOSS")

//alertcondition(Final_XshortCondition or Final_Short_sl or (Final_Short_tp_pump and Act_not_conf), title="XShort/PUMP/Stop-Loss on Shorts Alert", message = "XSHORT/PUMP/STOP-LOSS")

// BTC BINANCE FUTURES

alertcondition(Final_longCondition0, title="BTC NC Long Alert", 
   message = "NC LONG | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=order b=short | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=short t=market ro=1 | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT b=long q=25% t=market")

alertcondition(Final_shortCondition0, title="BTC NC Short Alert", 
   message = "NC SHORT | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=order b=long | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=long t=market ro=1 | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT b=short q=25% t=market")

alertcondition(Final_longCondition, title="BTC Long Alert", 
   message = "LONG | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=order b=short | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=short t=market ro=1 | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT b=long q=100% t=market | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=long p=0.70% q=50% t=limit ro=1 | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=long p=1.8% q=50% t=limit ro=1")

alertcondition(Final_shortCondition, title="BTC Short Alert", 
   message = "SHORT | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=order b=long | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=long t=market ro=1 | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT b=short q=100% t=market | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=short p=-0.70% q=50% t=limit ro=1 | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=short p=-1.8% q=50% t=limit ro=1")

//alertcondition(Final_Long_tp, title="BTC Take Profit on Longs Alert", 
//   message = "LONG TP | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position q=50% t=market ro=1")

//alertcondition(Final_Short_tp, title="BTC Take Profit on Shorts Alert", 
//   message = "SHORT TP | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position q=50% t=market ro=1")

//alertcondition(Final_Long_tp2, title="BTC Take Profit on Longs Alert", 
//   message = "LONG TP2 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=long q=100% t=market ro=1")

//alertcondition(Final_Short_tp2, title="BTC Take Profit on Shorts Alert", 
//   message = "SHORT TP2 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=short q=100% t=market ro=1")

alertcondition(Final_XL or Final_Long_sl or (Final_Long_tp_pump and Act_not_conf), title="BTC XLong/PUMP/Stop-Loss on Longs Alert", 
   message = "XLONG/PUMP/STOP-LOSS | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=order b=long | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=long t=market ro=1")

alertcondition(Final_XS or Final_Short_sl or (Final_Short_tp_pump and Act_not_conf), title="BTC XShort/PUMP/Stop-Loss on Shorts Alert", 
   message = "XSHORT/PUMP/STOP-LOSS | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=order b=short | delay=1 | e=BINANCEFUTURES a=BINANCE s=BTCUSDT c=position b=short t=market ro=1")
```

> Detail

https://www.fmz.com/strategy/426892

> Last Modified

2023-09-15 12:25:12
