
> Name

基于Stochastic-RSI指标的反转交易策略Reversal-Trading-Strategy-Based-on-Stochastic-RSI

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于Stochastic RSI指标的反转交易策略”。该策略利用Stochastic RSI指标识别超买超卖现象,在超买超卖极端区域出现反转时进行反向交易。

Stochastic RSI指标的计算方式是:将RSI指标的数据作为Stochastic计算的输入,得到K线和D线信号。它反映RSI指标自身的超买超卖情况。

具体交易逻辑如下:

1. 计算快速RSI,以捕捉超买超卖现象。

2. 对RSI加权移动平均,得到Stochastic RSI中的K线信号。

3. K线上穿其移动平均线时,产生买入信号;下穿时,产生卖出信号。

4. 在K线接近超买区或超卖区时,出现反转信号,考虑进行反转交易。

该策略的优势是利用Stochastic RSI指标识别反转点位。但需要优化参数组合,并防止过度交易。止损策略也必不可少。

总体来说,Stochastic RSI用于判断反转时机是一种常见而实用的方法。但交易者仍需保持对大趋势的判断力,避免在反弹中追高杀跌。



||



This strategy is named “Reversal Trading Strategy Based on Stochastic RSI”. It uses the Stochastic RSI indicator to identify overbought/oversold situations, entering reverse trades when extremes reverse.

The Stochastic RSI calculates the Stochastic oscillator on RSI values, generating K and D line signals that reflect overbought/oversold conditions in the RSI itself.

The trading logic is:

1. Calculate fast RSI to capture overbought/oversold. 

2. Apply a weighted moving average on RSI to derive Stochastic RSI K-line signal.

3. When K-line crosses above its moving average, a buy signal is generated. When crossing below, a sell signal is generated.

4. Reversal signals near overbought or oversold extremes hint at reversal trade opportunities.

The advantage of this strategy is using Stochastic RSI to identify reversal points. But parameter combinations need optimization, and overtrading should be prevented. Stop loss is also essential.

In conclusion, Stochastic RSI is a common and useful way to determine reversal timing. But traders still need overall trend judgment to avoid buying tops and selling bottoms in retracements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Heikin Ashi Candles in Algo Calculations|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|2021|From Year|
|v_input_5|12|Thru Month|
|v_input_6|30|Thru Day|
|v_input_7|2021|Thru Year|
|v_input_8|true|Show Date Range|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|80|TopBand|
|v_input_11|20|LowBand|
|v_input_12|2|RSI Length|
|v_input_13|50|MA Length|
|v_input_14|5|RSI MA Length|
|v_input_15|0|MA Type: LRC|EMA|DEMA|TEMA|SMA|WMA|MF|VAMA|TMA|HMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_16|0|RSI MA Type: TMA|EMA|DEMA|TEMA|LRC|WMA|MF|VAMA|SMA|HMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_17|true|Kijun MOD Divider|
|v_input_18|3|* Jurik (JMA) Only - Phase|
|v_input_19|true|* Jurik (JMA) Only - Power|
|v_input_20|10|* Volatility Adjusted (VAMA) Only - Volatility lookback length|
|v_input_21|0.8|Modular Filter, General Filter Only - Beta|
|v_input_22|false|Modular Filter Only - Feedback|
|v_input_23|0.5|Modular Filter Only - Feedback Weighting|
|v_input_24|20|EDSMA - Super Smoother Filter Length|
|v_input_25|0|EDSMA - Super Smoother Filter Poles: 2|3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-05 00:00:00
end: 2023-09-12 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MightyZinger
//@version=4
strategy(shorttitle="MZ SRSI",title="MightyZinger SRSI Strategy", overlay=false, pyramiding=1, calc_on_order_fills=true, calc_on_every_tick=true, default_qty_type=strategy.fixed, default_qty_value=5,commission_value=0.1)

//heiking ashi calculation
UseHAcandles    = input(true, title="Use Heikin Ashi Candles in Algo Calculations")
////
// === /INPUTS ===

// === BASE FUNCTIONS ===
haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low


//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2021, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 12,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 30,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2021, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

src = UseHAcandles ? haClose : input(close, title="Source")

TopBand = input(80, step=0.01)
LowBand = input(20, step=0.01)
lengthRSI = input(2, minval=1,title="RSI Length")
lengthMA = input(50, minval=1,title="MA Length")
lengthRSI_MA= input(5, minval=1,title="RSI MA Length")


//RSI Source
maType = input(title="MA Type", type=input.string, defval="LRC", options=["SMA","EMA","DEMA","TEMA","LRC","WMA","MF","VAMA","TMA","HMA", "JMA", "Kijun v2", "EDSMA","McGinley"])
rsiMaType = input(title="RSI MA Type", type=input.string, defval="TMA", options=["SMA","EMA","DEMA","TEMA","LRC","WMA","MF","VAMA","TMA","HMA", "JMA", "Kijun v2", "EDSMA","McGinley"])

//MA Function

//           Pre-reqs
//
tema(src, len) =>
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    ema3 = ema(ema2, len)
    (3 * ema1) - (3 * ema2) + ema3
kidiv = input(defval=1,maxval=4,  title="Kijun MOD Divider")

jurik_phase = input(title="* Jurik (JMA) Only - Phase", type=input.integer, defval=3)
jurik_power = input(title="* Jurik (JMA) Only - Power", type=input.integer, defval=1)
volatility_lookback = input(10, title="* Volatility Adjusted (VAMA) Only - Volatility lookback length")
//                  MF
beta = input(0.8,minval=0,maxval=1,step=0.1,  title="Modular Filter, General Filter Only - Beta")
feedback = input(false, title="Modular Filter Only - Feedback")
z = input(0.5,title="Modular Filter Only - Feedback Weighting",step=0.1, minval=0, maxval=1)
//EDSMA
ssfLength = input(title="EDSMA - Super Smoother Filter Length", type=input.integer, minval=1, defval=20)
ssfPoles = input(title="EDSMA - Super Smoother Filter Poles", type=input.integer, defval=2, options=[2, 3])

//----
//                  EDSMA
get2PoleSSF(src, length) =>
    PI = 2 * asin(1)
    arg = sqrt(2) * PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(arg)
    c2 = b1
    c3 = -pow(a1, 2)
    c1 = 1 - c2 - c3
    
    ssf = 0.0
    ssf := c1 * src + c2 * nz(ssf[1]) + c3 * nz(ssf[2])

get3PoleSSF(src, length) =>
    PI = 2 * asin(1)

    arg = PI / length
    a1 = exp(-arg)
    b1 = 2 * a1 * cos(1.738 * arg)
    c1 = pow(a1, 2)

    coef2 = b1 + c1
    coef3 = -(c1 + b1 * c1)
    coef4 = pow(c1, 2)
    coef1 = 1 - coef2 - coef3 - coef4

    ssf = 0.0
    ssf := coef1 * src + coef2 * nz(ssf[1]) + coef3 * nz(ssf[2]) + coef4 * nz(ssf[3])

//          MA Main function
ma(type, src, len) =>
    float result = 0
    if type=="TMA"
        result := sma(sma(src, ceil(len / 2)), floor(len / 2) + 1)
    if type=="MF"
        ts=0.,b=0.,c=0.,os=0.
        //----
        alpha = 2/(len+1)
        a = feedback ? z*src + (1-z)*nz(ts[1],src) : src
        //----
        b := a > alpha*a+(1-alpha)*nz(b[1],a) ? a : alpha*a+(1-alpha)*nz(b[1],a)
        c := a < alpha*a+(1-alpha)*nz(c[1],a) ? a : alpha*a+(1-alpha)*nz(c[1],a)
        os := a == b ? 1 : a == c ? 0 : os[1]
        //----
        upper = beta*b+(1-beta)*c
        lower = beta*c+(1-beta)*b 
        ts := os*upper+(1-os)*lower
        result := ts
    if type=="LRC"
        result := linreg(src, len, 0)
    if type=="SMA" // Simple
        result := sma(src, len)
    if type=="EMA" // Exponential
        result := ema(src, len)
    if type=="DEMA" // Double Exponential
        e = ema(src, len)
        result := 2 * e - ema(e, len)
    if type=="TEMA" // Triple Exponential
        e = ema(src, len)
        result := 3 * (e - ema(e, len)) + ema(ema(e, len), len)
    if type=="WMA" // Weighted
        result := wma(src, len)
    if type=="VAMA" // Volatility Adjusted
        /// Copyright © 2019 to present, Joris Duyck (JD)
        mid=ema(src,len)
        dev=src-mid
        vol_up=highest(dev,volatility_lookback)
        vol_down=lowest(dev,volatility_lookback)
        result := mid+avg(vol_up,vol_down)
    if type=="HMA" // Hull
        result := wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))
    if type=="JMA" // Jurik
        /// Copyright © 2018 Alex Orekhov (everget)
        /// Copyright © 2017 Jurik Research and Consulting.
        phaseRatio = jurik_phase < -100 ? 0.5 : jurik_phase > 100 ? 2.5 : jurik_phase / 100 + 1.5
        beta = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
        alpha = pow(beta, jurik_power)
        jma = 0.0
        e0 = 0.0
        e0 := (1 - alpha) * src + alpha * nz(e0[1])
        e1 = 0.0
        e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
        e2 = 0.0
        e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
        jma := e2 + nz(jma[1])
        result := jma
    if type=="Kijun v2"
        kijun = avg(lowest(len), highest(len))//, (open + close)/2)
        conversionLine = avg(lowest(len/kidiv), highest(len/kidiv))
        delta = (kijun + conversionLine)/2
        result :=delta
    if type=="McGinley"
        mg = 0.0
        mg := na(mg[1]) ? ema(src, len) : mg[1] + (src - mg[1]) / (len * pow(src/mg[1], 4))
        result :=mg
    if type=="EDSMA"
    
        zeros = src - nz(src[2])
        avgZeros = (zeros + zeros[1]) / 2
        
        // Ehlers Super Smoother Filter 
        ssf = ssfPoles == 2
             ? get2PoleSSF(avgZeros, ssfLength)
             : get3PoleSSF(avgZeros, ssfLength)
        
        // Rescale filter in terms of Standard Deviations
        stdev = stdev(ssf, len)
        scaledFilter = stdev != 0
             ? ssf / stdev
             : 0
        
        alpha = 5 * abs(scaledFilter) / len
        
        edsma = 0.0
        edsma := alpha * src + (1 - alpha) * nz(edsma[1])
        result :=  edsma
    result


//Indicator
hline(TopBand, color=color.red,linestyle=hline.style_dotted, linewidth=2)
hline(LowBand, color=color.green, linestyle=hline.style_dashed, linewidth=2)

// RSI Definition
rsiSource = ma(maType, src , lengthMA)
frsi = rsi(rsiSource, lengthRSI)
fsma = ma(rsiMaType, frsi , lengthRSI_MA)

plot(frsi,title='frsi', color= color.lime, linewidth=3)
fsmaColor=color.new(color.red, 80)
plot(fsma,title='fsma', color= fsmaColor , linewidth=3, style=plot.style_area)

//Background
bgcolor(frsi > fsma ? color.lime : color.orange, 80)

longcondition = crossover (frsi , fsma)
shortcondition = crossunder(frsi , fsma)


////////////////////////////////
//if (longcondition)
//    strategy.entry("BUY", strategy.long, when = window())
    
//if (shortcondition)
//    strategy.close("SELL", strategy.short, when = window())

strategy.entry(id="long", long = true, when = longcondition and window())
strategy.close("long", when = shortcondition and window())
```

> Detail

https://www.fmz.com/strategy/426623

> Last Modified

2023-09-13 18:00:13
