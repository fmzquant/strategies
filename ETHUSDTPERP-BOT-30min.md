
> Name

ETHUSDTPERP-BOT-30min

> Author

a624587332



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|AVERAGE DIRECTIONAL INDEX|
|v_input_3|0|  ADX OPTION: MASANAKAMURA|CLASSIC|
|v_input_4|16|  ADX LENGTH|
|v_input_5|13.5|  ADX THRESHOLD|
|v_input_6|30|RSI lenght|
|v_input_7_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_8|31|MA Length|
|v_input_9|0|MA Type: SMA|EMA|HMA|WMA|DEMA|
|v_input_10|1.2|RVOL To Trigger Signal|
|v_input_11|0|Source Type: Price|VWAP|
|v_input_12_ohlc4|0|Price Type: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_13|14|Momentum rsi length|
|v_input_14|23|Smooth Length|
|v_input_15|11| length|
|v_input_16|7|1st EMA Smoothing Length|
|v_input_17|5|2nd EMA Smoothing Length|
|v_input_18|9|3rd SMA Smoothing Length|
|v_input_19|10|Signal Length|
|v_input_20|4.3| stop loss|
|v_input_21|100| qty percent|
|v_input_22|1.6| Take profit|


> Source (PineScript)

``` pinescript
//@version=4
strategy("ETHUSDTPERP BOT 30min", overlay=false,  pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.075)

//Source
source = input(close, title="Source")

//ADX -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Act_ADX             = input(true,       title = "AVERAGE DIRECTIONAL INDEX",            type = input.bool)
ADX_options         = input("MASANAKAMURA",  title = "  ADX OPTION",                                                                                 options = ["CLASSIC", "MASANAKAMURA"])
ADX_len             = input(16,         title = "  ADX LENGTH",                         type = input.integer,   minval = 1)
th                  = input(13.5,         title = "  ADX THRESHOLD",                      type = input.float,     minval = 0,     step = 0.5)

calcADX(_len) =>
    up              = change(high)
	down            = -change(low)
	plusDM          = na(up)   ? na : (up > down and up > 0   ? up   : 0)
    minusDM         = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange       = rma(tr, _len)
	_plus           = fixnan(100 * rma(plusDM, _len)  / truerange)
	_minus          = fixnan(100 * rma(minusDM, _len) / truerange)
	sum             = _plus + _minus
	_adx            = 100 * rma(abs(_plus - _minus) / (sum == 0 ? 1 : sum), _len)
    [_plus,_minus,_adx]

calcADX_Masanakamura(_len) =>
    SmoothedTrueRange                   = 0.0
    SmoothedDirectionalMovementPlus     = 0.0
    SmoothedDirectionalMovementMinus    = 0.0
    TrueRange                           = max(max(high - low, abs(high - nz(close[1]))), abs(low - nz(close[1])))
    DirectionalMovementPlus             = high - nz(high[1]) > nz(low[1]) - low ? max(high - nz(high[1]), 0) : 0
    DirectionalMovementMinus            = nz(low[1]) - low > high - nz(high[1]) ? max(nz(low[1]) - low, 0)   : 0
    SmoothedTrueRange                   := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1]) /_len) + TrueRange
    SmoothedDirectionalMovementPlus     := nz(SmoothedDirectionalMovementPlus[1])  - (nz(SmoothedDirectionalMovementPlus[1])  / _len) + DirectionalMovementPlus
    SmoothedDirectionalMovementMinus    := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1]) / _len) + DirectionalMovementMinus
    DIP                                 = SmoothedDirectionalMovementPlus  / SmoothedTrueRange * 100
    DIM                                 = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
    DX                                  = abs(DIP-DIM) / (DIP+DIM)*100
    adx                                 = sma(DX, _len)
    [DIP,DIM,adx]

[DIPlusC,DIMinusC,ADXC] = calcADX(ADX_len) 
[DIPlusM,DIMinusM,ADXM] = calcADX_Masanakamura(ADX_len)
DIPlus                  = ADX_options == "CLASSIC" ? DIPlusC    : DIPlusM
DIMinus                 = ADX_options == "CLASSIC" ? DIMinusC   : DIMinusM
ADX                     = ADX_options == "CLASSIC" ? ADXC       : ADXM

ADX_color = DIPlus > DIMinus and ADX > th ? color.green : DIPlus < DIMinus and ADX > th ? color.red : color.orange
barcolor(color = Act_ADX ? ADX_color : na, title = "ADX")

//RSI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

len_3 = input(30, minval=1, title="RSI lenght")
src_3 = input(hl2, "Source")
up_3 = rma(max(change(src_3), 0), len_3)
down_3 = rma(-min(change(src_3), 0), len_3)
rsi_3 = down_3 == 0 ? 100 : up_3 == 0 ? 0 : 100 - (100 / (1 + up_3 / down_3))

//VOLUME-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

maLength = input(title="MA Length", type=input.integer, defval=31, minval=1)
maType = input(title="MA Type", type=input.string, defval="SMA", options=["EMA", "SMA", "HMA", "WMA", "DEMA"])
rvolTrigger = input(title="RVOL To Trigger Signal", type=input.float, defval=1.2)

getMA(length) =>
    maPrice = ema(volume, length)
    if maType == "SMA"
        maPrice := sma(volume, length)
    if maType == "HMA"
        maPrice := hma(volume, length)
    if maType == "WMA"
        maPrice := wma(volume, length)
    if maType == "DEMA"
        e1 = ema(volume, length)
        e2 = ema(e1, length)
        maPrice := 2 * e1 - e2
    maPrice

ma = getMA(maLength)
rvol = volume / ma

//MOMENTUM-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

srcType = input("Price", options=["Price", "VWAP"],title= "Source Type")
srcPrice = input(ohlc4, "Price Type")
rsiLen = input(14, minval=1, title="Momentum rsi length")
sLen = input(23, title="Smooth Length")

src = srcType=="Price"?srcPrice:security(syminfo.tickerid, timeframe.period, vwap[barstate.isrealtime ? 1 : 0])[barstate.isrealtime ? 0 : 1]
f_dema(_src, _length) =>
	_ema0 	= ema( _src, _length)
	_ema1 	= ema(_ema0, _length)
	_dema 	= 2 * _ema0 - _ema1	

rsi1 = hma(rsi(src, rsiLen), sLen)

        
rsi2 = rsi1-50

dema1 = f_dema(rsi2, 9)
dema2 = f_dema(rsi2, 21)

bull_momentum = dema1 > 5
bear_momentum = dema1 < -5

//MACD----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

rsiLength = input(title=" length", type=input.integer, defval=11)
ema1Length = input(title="1st EMA Smoothing Length", type=input.integer, defval=7)
ema2Length = input(title="2nd EMA Smoothing Length", type=input.integer, defval=5)
smaLength = input(title="3rd SMA Smoothing Length", type=input.integer, defval=9)
signalLength = input(title="Signal Length", type=input.integer, defval=10)

smoothedRSI = ema(ema(rsi(src, rsiLength), ema1Length), ema2Length)
dosc = smoothedRSI - sma(smoothedRSI, smaLength)
signal = sma(dosc, signalLength)

bull_dosc = signal > 0
bear_dosc = signal < 0

//STRATEGY------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

LongCondt = (DIPlus > DIMinus and ADX > th) and (rsi_3 < 70) and volume > rvolTrigger * ma and bull_momentum and bull_dosc
shortCondt = (DIPlus < DIMinus and ADX > th) and (rsi_3 > 30) and volume > rvolTrigger * ma and bear_momentum and bear_dosc

if LongCondt 
    strategy.entry("L", strategy.long)
    
if shortCondt
    strategy.entry("S", strategy.short)
    
per(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input(title=" stop loss", defval=4.3, minval=0.01)
los = per(stoploss)
q=input(title=" qty percent", defval=100, minval=1)

tp=input(title=" Take profit", defval=1.6, minval=0.01)

strategy.exit("tp", qty_percent = q, profit = per(tp), loss = los)

//By wielkieef
```

> Detail

https://www.fmz.com/strategy/376260

> Last Modified

2022-08-02 23:47:12
