
> Name

QQE-MOD-SSL-Hybrid-Waddah-Attar-Explosion

> Author

ChaoZhang

> Strategy Description

TRADE CONDITIONS

Long entry:
QQE Mod changes to Blue (leading indicator)
SSL Hybrid is Blue and price is above MA Channel line
Waddah Attar Explosion is Green and above Explosion line

Short entry:
QQE Mod changes to Red (leading indicator)
SSL Hybrid is Red and price is below MA Channel line
Waddah Attar Explosion is Red and above Explosion line

Risk management:
Each trade risks 2% of account (configurable in settings)
SL size determined by swing low/high of previous X candles (configurable in settings)
TP is triggered on SSL Hybrid EXIT arrow signals

TIPS

Timeframe: Personally I've found best results running this on 1H timeframe.

Note: To help visual identification of trade entries and exits you may wish to add the SSL Hybrid and Waddah Attar Explosion to the chart separately. They are being used to determine trade entry/exit within the code of this strategy but it was not possible to display them in a clear way within a single panel. Make sure you set the settings of the auxiliary indicators to match what is in the settings of this indicator if you do decide to add them.

CREDITS
QQE MOD byMihkel00
SSL Hybrid by Mihkel00
Waddah Attar Explosion by shayankm


**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1bee9f9cdc8ec8fa3ad.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_3|true|Show Baseline|
|v_input_4|false|Show SSL1|
|v_input_5|true|Show ATR bands|
|v_input_6|14|ATR Period|
|v_input_float_4|true|ATR Multi|
|v_input_string_1|0|ATR Smoothing: WMA|SMA|EMA|RMA|
|v_input_string_2|0|SSL1 / Baseline Type: HMA|EMA|DEMA|TEMA|LSMA|WMA|MF|VAMA|TMA|SMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_7|60|SSL1 / Baseline Length|
|v_input_string_3|0|SSL2 / Continuation Type: JMA|EMA|DEMA|TEMA|WMA|MF|VAMA|TMA|HMA|SMA|McGinley|
|v_input_8|5|SSL 2 Length|
|v_input_string_4|0|EXIT Type: HMA|TEMA|LSMA|VAMA|TMA|DEMA|JMA|Kijun v2|McGinley|MF|
|v_input_9|15|EXIT Length|
|v_input_10_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_16|true|Kijun MOD Divider|
|v_input_11|3|* Jurik (JMA) Only - Phase|
|v_input_12|true|* Jurik (JMA) Only - Power|
|v_input_13|10|* Volatility Adjusted (VAMA) Only - Volatility lookback length|
|v_input_float_5|0.8|Modular Filter, General Filter Only - Beta|
|v_input_14|false|Modular Filter Only - Feedback|
|v_input_float_6|0.5|Modular Filter Only - Feedback Weighting|
|v_input_int_17|20|EDSMA - Super Smoother Filter Length|
|v_input_int_18|0|EDSMA - Super Smoother Filter Poles: 2|3|
|v_input_15|true|useTrueRange|
|v_input_float_7|0.2|Base Channel Multiplier|
|v_input_16|true|Color Bars|
|v_input_int_1|10|(?Strategy: Risk Management)Swing High/Low Lookback Length|
|v_input_float_1|2|Account percent loss per trade|
|v_input_int_2|2022|(?Strategy: Date Range)Start Date|
|v_input_int_3|0|start_month: 1|2|3|4|5|6|7|8|9|10|11|12|
|v_input_int_4|0|start_date: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|
|v_input_int_5|2023|End Date|
|v_input_int_6|0|end_month: 1|2|3|4|5|6|7|8|9|10|11|12|
|v_input_int_7|0|end_date: 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|
|v_input_int_8|6|(?Indicators: QQE Mod Settings)RSI Length|
|v_input_int_9|6|RSI Smoothing|
|v_input_int_10|3|Fast QQE Factor|
|v_input_int_11|3|Thresh-hold|
|v_input_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_12|50|Bollinger Length|
|v_input_float_2|0.35|BB Multiplier|
|v_input_int_13|6|RSI Length|
|v_input_int_14|5|RSI Smoothing|
|v_input_float_3|1.61|Fast QQE2 Factor|
|v_input_int_15|3|Thresh-hold|
|v_input_2_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_19|180|(?Indicators: Waddah Attar Explosion)Sensitivity|
|v_input_int_20|20|FastEMA Length|
|v_input_int_21|40|SlowEMA Length|
|v_input_int_22|20|BB Channel Length|
|v_input_float_8|2|BB Stdev Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-01-01 00:00:00
end: 2022-01-31 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// Strategy based on the 3 indicators:
//  - QQE MOD
//  - SSL Hybrid
//  - Waddah Attar Explosion
//
// Strategy was designed for the purpose of back testing. 
// See strategy documentation for info on trade entry logic.
// 
// Credits:
//  - QQE MOD: Mihkel00 (https://www.tradingview.com/u/Mihkel00/)
//  - SSL Hybrid: Mihkel00 (https://www.tradingview.com/u/Mihkel00/)
//  - Waddah Attar Explosion: shayankm (https://www.tradingview.com/u/shayankm/)

//@version=5
//strategy("QQE MOD + SSL Hybrid + Waddah Attar Explosion", overlay=false, initial_capital=1000, currency=currency.NONE, max_labels_count=500, default_qty_type=strategy.cash, commission_type=strategy.commission.percent, commission_value=0.01)

// =============================================================================
// STRATEGY INPUT SETTINGS
// =============================================================================

// ---------------
// Risk Management
// ---------------
swingLength = input.int(10, "Swing High/Low Lookback Length", group='Strategy: Risk Management', tooltip='Stop Loss is calculated by the swing high or low over the previous X candles')
accountRiskPercent = input.float(2, "Account percent loss per trade", step=0.1, group='Strategy: Risk Management', tooltip='Each trade will risk X% of the account balance')

// ----------
// Date Range
// ----------
start_year = input.int(title='Start Date', defval=2022, minval=2010, maxval=3000, group='Strategy: Date Range', inline='1')
start_month = input.int(title='', defval=1, group='Strategy: Date Range', inline='1', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
start_date = input.int(title='', defval=1, group='Strategy: Date Range', inline='1', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
end_year = input.int(title='End Date', defval=2023, minval=1800, maxval=3000, group='Strategy: Date Range', inline='2')
end_month = input.int(title='', defval=1, group='Strategy: Date Range', inline='2', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
end_date = input.int(title='', defval=1, group='Strategy: Date Range', inline='2', options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])
//in_date_range = time >= timestamp(syminfo.timezone, start_year, start_month, start_date, 0, 0) and time < timestamp(syminfo.timezone, end_year, end_month, end_date, 0, 0)

// =============================================================================
// INDICATORS
// =============================================================================

// -------
// QQE MOD
// -------
RSI_Period = input.int(6, title='RSI Length', group='Indicators: QQE Mod Settings')
SF = input.int(6, title='RSI Smoothing', group='Indicators: QQE Mod Settings')
QQE = input.int(3, title='Fast QQE Factor', group='Indicators: QQE Mod Settings')
ThreshHold = input.int(3, title='Thresh-hold', group='Indicators: QQE Mod Settings')
qqeSrc = input(close, title='RSI Source', group='Indicators: QQE Mod Settings')
Wilders_Period = RSI_Period * 2 - 1

Rsi = ta.rsi(qqeSrc, RSI_Period)
RsiMa = ta.ema(Rsi, SF)
AtrRsi = math.abs(RsiMa[1] - RsiMa)
MaAtrRsi = ta.ema(AtrRsi, Wilders_Period)
dar = ta.ema(MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? math.max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? math.min(shortband[1], newshortband) : newshortband
cross_1 = ta.cross(longband[1], RSIndex)
trend := ta.cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband

length = input.int(50, minval=1, title='Bollinger Length', group='Indicators: QQE Mod Settings')
qqeMult = input.float(0.35, minval=0.001, maxval=5, step=0.1, title='BB Multiplier', group='Indicators: QQE Mod Settings')
basis = ta.sma(FastAtrRsiTL - 50, length)
dev = qqeMult * ta.stdev(FastAtrRsiTL - 50, length)
upper = basis + dev
lower = basis - dev
//qqe_color_bar = RsiMa - 50 > upper ? #00c3ff : RsiMa - 50 < lower ? #ff0062 : color.gray

// Zero cross
QQEzlong = 0
QQEzlong := nz(QQEzlong[1])
QQEzshort = 0
QQEzshort := nz(QQEzshort[1])
QQEzlong := RSIndex >= 50 ? QQEzlong + 1 : 0
QQEzshort := RSIndex < 50 ? QQEzshort + 1 : 0

//Zero = hline(0, color=color.white, linestyle=hline.style_dotted, linewidth=1, display=display.none)

RSI_Period2 = input.int(6, title='RSI Length', group='Indicators: QQE Mod Settings')
SF2 = input.int(5, title='RSI Smoothing', group='Indicators: QQE Mod Settings')
QQE2 = input.float(1.61, title='Fast QQE2 Factor', group='Indicators: QQE Mod Settings')
ThreshHold2 = input.int(3, title='Thresh-hold', group='Indicators: QQE Mod Settings')
src2 = input(close, title='RSI Source', group='Indicators: QQE Mod Settings')
Wilders_Period2 = RSI_Period2 * 2 - 1

Rsi2 = ta.rsi(src2, RSI_Period2)
RsiMa2 = ta.ema(Rsi2, SF2)
AtrRsi2 = math.abs(RsiMa2[1] - RsiMa2)
MaAtrRsi2 = ta.ema(AtrRsi2, Wilders_Period2)
dar2 = ta.ema(MaAtrRsi2, Wilders_Period2) * QQE2
longband2 = 0.0
shortband2 = 0.0
trend2 = 0

DeltaFastAtrRsi2 = dar2
RSIndex2 = RsiMa2
newshortband2 = RSIndex2 + DeltaFastAtrRsi2
newlongband2 = RSIndex2 - DeltaFastAtrRsi2
longband2 := RSIndex2[1] > longband2[1] and RSIndex2 > longband2[1] ? math.max(longband2[1], newlongband2) : newlongband2
shortband2 := RSIndex2[1] < shortband2[1] and RSIndex2 < shortband2[1] ? math.min(shortband2[1], newshortband2) : newshortband2
cross_2 = ta.cross(longband2[1], RSIndex2)
trend2 := ta.cross(RSIndex2, shortband2[1]) ? 1 : cross_2 ? -1 : nz(trend2[1], 1)
FastAtrRsi2TL = trend2 == 1 ? longband2 : shortband2

// Zero cross
QQE2zlong = 0
QQE2zlong := nz(QQE2zlong[1])
QQE2zshort = 0
QQE2zshort := nz(QQE2zshort[1])
QQE2zlong := RSIndex2 >= 50 ? QQE2zlong + 1 : 0
QQE2zshort := RSIndex2 < 50 ? QQE2zshort + 1 : 0

hcolor2 = RsiMa2 - 50 > ThreshHold2 ? color.silver : RsiMa2 - 50 < 0 - ThreshHold2 ? color.silver : na
plot(RsiMa2 - 50, color=hcolor2, title='Histo2', style=plot.style_columns, transp=50)

Greenbar1 = RsiMa2 - 50 > ThreshHold2
Greenbar2 = RsiMa - 50 > upper
Redbar1 = RsiMa2 - 50 < 0 - ThreshHold2
Redbar2 = RsiMa - 50 < lower

plot(Greenbar1 and Greenbar2 == 1 ? RsiMa2 - 50 : na, title='QQE Up', style=plot.style_columns, color=color.new(#00c3ff, 0))
plot(Redbar1 and Redbar2 == 1 ? RsiMa2 - 50 : na, title='QQE Down', style=plot.style_columns, color=color.new(#ff0062, 0))

// ----------
// SSL HYBRID
// ----------
show_Baseline = input(title='Show Baseline', defval=true)
show_SSL1 = input(title='Show SSL1', defval=false)
show_atr = input(title='Show ATR bands', defval=true)
//ATR
atrlen = input(14, 'ATR Period')
mult = input.float(1, 'ATR Multi', step=0.1)
smoothing = input.string(title='ATR Smoothing', defval='WMA', options=['RMA', 'SMA', 'EMA', 'WMA'])

ma_function(source, atrlen) =>
    if smoothing == 'RMA'
        ta.rma(source, atrlen)
    else
        if smoothing == 'SMA'
            ta.sma(source, atrlen)
        else
            if smoothing == 'EMA'
                ta.ema(source, atrlen)
            else
                ta.wma(source, atrlen)
atr_slen = ma_function(ta.tr(true), atrlen)
////ATR Up/Low Bands
upper_band = atr_slen * mult + close
lower_band = close - atr_slen * mult

////BASELINE / SSL1 / SSL2 / EXIT MOVING AVERAGE VALUES
maType = input.string(title='SSL1 / Baseline Type', defval='HMA', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'LSMA', 'WMA', 'MF', 'VAMA', 'TMA', 'HMA', 'JMA', 'Kijun v2', 'EDSMA', 'McGinley'])
len = input(title='SSL1 / Baseline Length', defval=60)

SSL2Type = input.string(title='SSL2 / Continuation Type', defval='JMA', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'WMA', 'MF', 'VAMA', 'TMA', 'HMA', 'JMA', 'McGinley'])
len2 = input(title='SSL 2 Length', defval=5)
SSL3Type = input.string(title='EXIT Type', defval='HMA', options=['DEMA', 'TEMA', 'LSMA', 'VAMA', 'TMA', 'HMA', 'JMA', 'Kijun v2', 'McGinley', 'MF'])
len3 = input(title='EXIT Length', defval=15)
src = input(title='Source', defval=close)

tema(src, len) =>
    ema1 = ta.ema(src, len)
    ema2 = ta.ema(ema1, len)
    ema3 = ta.ema(ema2, len)
    3 * ema1 - 3 * ema2 + ema3
kidiv = input.int(defval=1, maxval=4, title='Kijun MOD Divider')

jurik_phase = input(title='* Jurik (JMA) Only - Phase', defval=3)
jurik_power = input(title='* Jurik (JMA) Only - Power', defval=1)
volatility_lookback = input(10, title='* Volatility Adjusted (VAMA) Only - Volatility lookback length')
//MF
beta = input.float(0.8, minval=0, maxval=1, step=0.1, title='Modular Filter, General Filter Only - Beta')
feedback = input(false, title='Modular Filter Only - Feedback')
z = input.float(0.5, title='Modular Filter Only - Feedback Weighting', step=0.1, minval=0, maxval=1)
//EDSMA
ssfLength = input.int(title='EDSMA - Super Smoother Filter Length', minval=1, defval=20)
ssfPoles = input.int(title='EDSMA - Super Smoother Filter Poles', defval=2, options=[2, 3])

//EDSMA
get2PoleSSF(src, length) =>
    PI = 2 * math.asin(1)
    arg = math.sqrt(2) * PI / length
    a1 = math.exp(-arg)
    b1 = 2 * a1 * math.cos(arg)
    c2 = b1
    c3 = -math.pow(a1, 2)
    c1 = 1 - c2 - c3

    ssf = 0.0
    ssf := c1 * src + c2 * nz(ssf[1]) + c3 * nz(ssf[2])
    ssf

get3PoleSSF(src, length) =>
    PI = 2 * math.asin(1)

    arg = PI / length
    a1 = math.exp(-arg)
    b1 = 2 * a1 * math.cos(1.738 * arg)
    c1 = math.pow(a1, 2)

    coef2 = b1 + c1
    coef3 = -(c1 + b1 * c1)
    coef4 = math.pow(c1, 2)
    coef1 = 1 - coef2 - coef3 - coef4

    ssf = 0.0
    ssf := coef1 * src + coef2 * nz(ssf[1]) + coef3 * nz(ssf[2]) + coef4 * nz(ssf[3])
    ssf

ma(type, src, len) =>
    float result = 0
    if type == 'TMA'
        result := ta.sma(ta.sma(src, math.ceil(len / 2)), math.floor(len / 2) + 1)
        result
    if type == 'MF'
        ts = 0.
        b = 0.
        c = 0.
        os = 0.
        //----
        alpha = 2 / (len + 1)
        a = feedback ? z * src + (1 - z) * nz(ts[1], src) : src
        //----
        b := a > alpha * a + (1 - alpha) * nz(b[1], a) ? a : alpha * a + (1 - alpha) * nz(b[1], a)
        c := a < alpha * a + (1 - alpha) * nz(c[1], a) ? a : alpha * a + (1 - alpha) * nz(c[1], a)
        os := a == b ? 1 : a == c ? 0 : os[1]
        //----
        upper = beta * b + (1 - beta) * c
        lower = beta * c + (1 - beta) * b
        ts := os * upper + (1 - os) * lower
        result := ts
        result
    if type == 'LSMA'
        result := ta.linreg(src, len, 0)
        result
    if type == 'SMA'  // Simple
        result := ta.sma(src, len)
        result
    if type == 'EMA'  // Exponential
        result := ta.ema(src, len)
        result
    if type == 'DEMA'  // Double Exponential
        e = ta.ema(src, len)
        result := 2 * e - ta.ema(e, len)
        result
    if type == 'TEMA'  // Triple Exponential
        e = ta.ema(src, len)
        result := 3 * (e - ta.ema(e, len)) + ta.ema(ta.ema(e, len), len)
        result
    if type == 'WMA'  // Weighted
        result := ta.wma(src, len)
        result
    if type == 'VAMA'  // Volatility Adjusted
        /// Copyright © 2019 to present, Joris Duyck (JD)
        mid = ta.ema(src, len)
        dev = src - mid
        vol_up = ta.highest(dev, volatility_lookback)
        vol_down = ta.lowest(dev, volatility_lookback)
        result := mid + math.avg(vol_up, vol_down)
        result
    if type == 'HMA'  // Hull
        result := ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))
        result
    if type == 'JMA'  // Jurik
        /// Copyright © 2018 Alex Orekhov (everget)
        /// Copyright © 2017 Jurik Research and Consulting.
        phaseRatio = jurik_phase < -100 ? 0.5 : jurik_phase > 100 ? 2.5 : jurik_phase / 100 + 1.5
        beta = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
        alpha = math.pow(beta, jurik_power)
        jma = 0.0
        e0 = 0.0
        e0 := (1 - alpha) * src + alpha * nz(e0[1])
        e1 = 0.0
        e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
        e2 = 0.0
        e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * math.pow(1 - alpha, 2) + math.pow(alpha, 2) * nz(e2[1])
        jma := e2 + nz(jma[1])
        result := jma
        result
    if type == 'Kijun v2'
        kijun = math.avg(ta.lowest(len), ta.highest(len))  //, (open + close)/2)
        conversionLine = math.avg(ta.lowest(len / kidiv), ta.highest(len / kidiv))
        delta = (kijun + conversionLine) / 2
        result := delta
        result
    if type == 'McGinley'
        mg = 0.0
        mg := na(mg[1]) ? ta.ema(src, len) : mg[1] + (src - mg[1]) / (len * math.pow(src / mg[1], 4))
        result := mg
        result
    if type == 'EDSMA'

        zeros = src - nz(src[2])
        avgZeros = (zeros + zeros[1]) / 2

        // Ehlers Super Smoother Filter 
        ssf = ssfPoles == 2 ? get2PoleSSF(avgZeros, ssfLength) : get3PoleSSF(avgZeros, ssfLength)

        // Rescale filter in terms of Standard Deviations
        stdev = ta.stdev(ssf, len)
        scaledFilter = stdev != 0 ? ssf / stdev : 0

        alpha = 5 * math.abs(scaledFilter) / len

        edsma = 0.0
        edsma := alpha * src + (1 - alpha) * nz(edsma[1])
        result := edsma
        result
    result

///SSL 1 and SSL2
emaHigh = ma(maType, high, len)
emaLow = ma(maType, low, len)

maHigh = ma(SSL2Type, high, len2)
maLow = ma(SSL2Type, low, len2)

///EXIT
ExitHigh = ma(SSL3Type, high, len3)
ExitLow = ma(SSL3Type, low, len3)

///Keltner Baseline Channel
BBMC = ma(maType, close, len)
useTrueRange = input(true)
multy = input.float(0.2, step=0.05, title='Base Channel Multiplier')
Keltma = ma(maType, src, len)
range_1 = useTrueRange ? ta.tr : high - low
rangema = ta.ema(range_1, len)
upperk = Keltma + rangema * multy
lowerk = Keltma - rangema * multy

//Baseline Violation Candle
open_pos = open * 1
close_pos = close * 1
difference = math.abs(close_pos - open_pos)
atr_violation = difference > atr_slen
InRange = upper_band > BBMC and lower_band < BBMC

//SSL1 VALUES
Hlv = int(na)
Hlv := close > emaHigh ? 1 : close < emaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? emaHigh : emaLow

//EXIT VALUES
Hlv3 = int(na)
Hlv3 := close > ExitHigh ? 1 : close < ExitLow ? -1 : Hlv3[1]
sslExit = Hlv3 < 0 ? ExitHigh : ExitLow
base_cross_Long = ta.crossover(close, sslExit)
base_cross_Short = ta.crossover(sslExit, close)
codiff = base_cross_Long ? 1 : base_cross_Short ? -1 : na

//COLORS
show_color_bar = input(title='Color Bars', defval=true)
color_bar = close > upperk ? #00c3ff : close < lowerk ? #ff0062 : color.gray
color_ssl1 = close > sslDown ? #00c3ff : close < sslDown ? #ff0062 : na

//PLOTS
//plotarrow(codiff, colorup=color.new(#00c3ff, 20), colordown=color.new(#ff0062, 20), title='Exit Arrows', maxheight=20, offset=0, display=display.none)
p1 = plot(0, color=color_bar, linewidth=3, title='MA Baseline', transp=0)
//barcolor(show_color_bar ? color_bar : na)

// ---------------------
// WADDAH ATTAR EXPLOSION
// ---------------------
sensitivity = input.int(180, title="Sensitivity", group='Indicators: Waddah Attar Explosion')
fastLength=input.int(20, title="FastEMA Length", group='Indicators: Waddah Attar Explosion')
slowLength=input.int(40, title="SlowEMA Length", group='Indicators: Waddah Attar Explosion')
channelLength=input.int(20, title="BB Channel Length", group='Indicators: Waddah Attar Explosion')
waeMult=input.float(2.0, title="BB Stdev Multiplier", group='Indicators: Waddah Attar Explosion')

calc_macd(source, fastLength, slowLength) =>
	fastMA = ta.ema(source, fastLength)
	slowMA = ta.ema(source, slowLength)
	fastMA - slowMA

calc_BBUpper(source, length, mult) => 
	basis = ta.sma(source, length)
	dev = mult * ta.stdev(source, length)
	basis + dev

calc_BBLower(source, length, mult) => 
	basis = ta.sma(source, length)
	dev = mult * ta.stdev(source, length)
	basis - dev

t1 = (calc_macd(close, fastLength, slowLength) - calc_macd(close[1], fastLength, slowLength))*sensitivity

e1 = (calc_BBUpper(close, channelLength, waeMult) - calc_BBLower(close, channelLength, waeMult))

trendUp = (t1 >= 0) ? t1 : 0
trendDown = (t1 < 0) ? (-1*t1) : 0

plot(trendUp, style=plot.style_columns, linewidth=1, color=(trendUp<trendUp[1]) ? color.lime : color.green, transp=45, title="UpTrend", display=display.none)
plot(trendDown, style=plot.style_columns, linewidth=1, color=(trendDown<trendDown[1]) ? color.orange : color.red, transp=45, title="DownTrend", display=display.none)
plot(e1, style=plot.style_line, linewidth=2, color=color.yellow, title="ExplosionLine", display=display.none)

// =============================================================================
// STRATEGY LOGIC
// =============================================================================

// QQE Mod
qqeGreenBar = Greenbar1 and Greenbar2
qqeRedBar = Redbar1 and Redbar2
qqeBuy = qqeGreenBar and not qqeGreenBar[1]
qqeSell = qqeRedBar and not qqeRedBar[1]

// SSL Hybrid
sslBuy = close > upperk and close > BBMC
sslSell = close < lowerk and close < BBMC

// Waddah Attar Explosion
waeBuy = trendUp > 0 and trendUp > e1
waeSell = trendDown > 0 and trendDown > e1

inLong = strategy.position_size > 0
inShort = strategy.position_size < 0

//longCondition = qqeBuy and sslBuy and waeBuy and in_date_range
//shortCondition = qqeSell and sslSell and waeSell and in_date_range

longCondition = qqeBuy and sslBuy and waeBuy
shortCondition = qqeSell and sslSell and waeSell

swingLow = ta.lowest(source=low, length=swingLength)
swingHigh = ta.highest(source=high, length=swingLength)

longStopPercent = math.abs((1 - (swingLow / close)) * 100)
shortStopPercent = math.abs((1 - (swingHigh / close)) * 100)

// Position sizing (default risk 2% per trade)
riskAmt = strategy.equity * accountRiskPercent / 100
longQty = math.abs(riskAmt / longStopPercent * 100) / close
shortQty = math.abs(riskAmt / shortStopPercent * 100) / close

if (longCondition and not inShort and not inLong)
    strategy.entry("Long", strategy.long, qty=longQty)
    strategy.exit("Long  SL/TP", from_entry="Long", stop=swingLow, alert_message='Long SL Hit')
    //buyLabel = label.new(x=bar_index, y=high[1], color=color.green, style=label.style_label_up)
    //label.set_y(id=buyLabel, y=0)
    //label.set_tooltip(id=buyLabel, tooltip="Risk Amt: " + str.tostring(riskAmt) + " Qty: " + str.tostring(longQty) + " Swing low: " + str.tostring(swingLow) + " Stop Percent: " + str.tostring(longStopPercent))

if (shortCondition and not inLong and not inShort)
    strategy.entry("Short", strategy.short, qty=shortQty)
    strategy.exit("Short  SL/TP", from_entry="Short", stop=swingHigh, alert_message='Short SL Hit')
    //sellLabel = label.new(x=bar_index, y=high[1], color=color.red, style=label.style_label_up)
    //label.set_y(id=sellLabel, y=0)
    //label.set_tooltip(id=sellLabel, tooltip="Risk Amt: " + str.tostring(riskAmt) + " Qty: " + str.tostring(shortQty) + " Swing high: " + str.tostring(swingHigh) + " Stop Percent: " + str.tostring(shortStopPercent))

openTradesInProfit() =>
    result = 0.
    for i = 0 to strategy.opentrades-1
        result += strategy.opentrades.profit(i)
    result > 0

exitLong = inLong and base_cross_Short and openTradesInProfit()
strategy.close(id = "Long", when = exitLong, comment = "Closing Long", alert_message="Long TP Hit")

exitShort = inShort and base_cross_Long and openTradesInProfit()
strategy.close(id = "Short", when = exitShort, comment = "Closing Short", alert_message="Short TP Hit")

// // =============================================================================
// // DATA WINDOW PLOTTING
// // =============================================================================

// plotchar(0, "===========", "", location = location.top, color=#141823)
// plotchar(0, "BUY SIGNALS:", "", location = location.top, color=#141823)
// plotchar(0, "===========", "", location = location.top, color=#141823)

// plotchar(qqeBuy, "QQE Mod: Buy Signal", "", location = location.top, color=qqeBuy ? color.green : color.orange)
// plotchar(sslBuy, "SSL Hybrid: Buy Signal", "", location = location.top, color=sslBuy ? color.green : color.orange)
// plotchar(waeBuy, "Waddah Attar Explosion: Buy Signal", "", location = location.top, color=waeBuy ? color.green : color.orange)
// plotchar(inLong, "inLong", "", location = location.top, color=inLong ? color.green : color.orange)
// plotchar(exitLong, "Exit Long", "", location = location.top, color=exitLong ? color.green : color.orange)

// plotchar(0, "============", "", location = location.top, color=#141823)
// plotchar(0, "SELL SIGNALS:", "", location = location.top, color=#141823)
// plotchar(0, "============", "", location = location.top, color=#141823)

// plotchar(qqeSell, "QQE Mod: Sell Signal", "", location = location.top, color=qqeSell ? color.red : color.orange)
// plotchar(sslSell, "SSL Hybrid: Sell Signal", "", location = location.top, color=sslSell ? color.red : color.orange)
// plotchar(waeSell, "Waddah Attar Explosion: Sell Signal", "", location = location.top, color=waeSell ? color.red : color.orange)
// plotchar(inShort, "inShort", "", location = location.top, color=inShort ? color.red : color.orange)
// plotchar(exitShort, "Exit Short", "", location = location.top, color=exitShort ? color.red : color.orange)

```

> Detail

https://www.fmz.com/strategy/361969

> Last Modified

2022-05-09 12:01:14
