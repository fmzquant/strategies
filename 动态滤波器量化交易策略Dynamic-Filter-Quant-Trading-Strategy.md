
> Name

动态滤波器量化交易策略Dynamic-Filter-Quant-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/1236e7a319497ca218d.png)
[trans]

## 策略概述
本策略 named 动态滤波器量化交易策略(Dynamic Filter Quant Trading Strategy),主要使用范围滤波器指标结合多种技术指标,实现对加密货币BTCUSDT的自动化趋势跟踪交易。策略适用于高频量化交易,通过动态调整止损止盈来锁定利润,降低回撤。

## 策略原理
本策略的核心指标是范围滤波器(Range Filter),它基于统计价格变动范围,生成一个中线。当价格突破该中线时产生交易信号。此外,策略还结合RSI指标判断超买超卖、均线判断趋势、MACD判断动量等指标进行组合过滤,形成更可靠的交易信号。

具体来说,范围滤波器中线是根据价格变动范围的指数移动平均线得到,方向判断则是根据突破该中线的力度和速度。当价格连续数根K线突破中线时就产生强势突破信号。

RSI指标判断超买超卖状态用于确认滤波器信号。均线朝上时判断为趋势向上,朝下时则判断为趋势向下。MACD指标则判断市场动量是否足够形成趋势。

综合这几个指标的判断,可以识别出比较可靠的趋势突破点作为建立持仓的时机。

## 优势分析
本策略最大的优势是结合多种指标进行决策,而不是依赖单一技术指标,可以有效减少错误交易的概率,确保交易信号更加可靠。此外,动态调整参数也使得策略可以适应市场的变化。

另一个优势是可以进行高频交易。范围滤波器指标对小周期价格变动很敏感,这意味着策略可以在较短时间内打开和平仓,因此非常适合高频并允许在波动较大的加密货币市场获利。

## 风险分析
本策略依然存在一定的风险。首先是技术形态判断失效的风险,因为指标并不能百分之百确保价格走势。当价格出现反转时,可能会导致止损。

另一个主要风险是范围滤波器中线并不能完全过滤掉价格震荡。当出现比中线范围更大的价格波动时,中线将失效,导致产生错误信号的风险。这种情况下,可以适当宽松参数,扩大中线范围。

最后,高频交易本身也存在一定风险。当交易频率过高时,交易费用会较大,可能会抵消部分利润。这种情况下,可以适当减小交易频率和持仓时间。

## 策略优化
本策略还有进一步优化的空间。例如可以考虑结合更多指标,例如波动率指标确认趋势,落实更严格的过滤条件,以确保交易信号更加精确。或者研究不同加密货币和股票的价格行为规律,设定最适合它们的指标参数。

从交易逻辑上,也可以设置动态止损和止盈幅度。也就是说,持仓量变大时扩大止损范围锁定更多利润。或者在盈利较大时加快止盈速度。这可以在一定程度上减少回撤。

最后,可以对滤波器参数进行优化,找到一组参数使得中线范围既可以有效过滤震荡,又可以尽量捕捉到趋势转折点。这需要大量回测数据进行迭代分析。

## 总结
本策略成功结合多种指标进行判断,形成高可靠性的交易策略,适合应用于高频量化交易。经过持续优化和改进,相信可以获得稳定收益,值得进一步开发。

||

## Strategy Overview  
This strategy named Dynamic Filter Quant Trading Strategy mainly uses Range Filter indicator combined with multiple technical indicators to implement automated trend tracking trading of the cryptocurrency BTCUSDT. The strategy is suitable for high-frequency quant trading by dynamically adjusting stop loss and take profit to lock in profits and reduce drawdowns.

## Strategy Logic  
The core indicator of this strategy is Range Filter, which generates a median line based on the statistical price movement range. Trading signals are generated when the price breaks through this median line. In addition, the strategy also combines RSI indicator to judge overbought and oversold, moving average to determine the trend, MACD to judge momentum and other indicators for combined filtering to form more reliable trading signals.

Specifically, the median line of the Range Filter is obtained from the exponential moving average of the price movement range, and the directional judgement is based on the strength and speed of breaking through this median line. When the price breaks through the median line continuously over several candlesticks, a strong breakout signal is generated.  

The RSI indicator that judges the overbought and oversold state is used to confirm the filter signal. When the moving average points up, the trend is judged to be up, and when it points down, the trend is judged to be down. The MACD indicator judges whether the market momentum is sufficient to form a trend.

By combining the judgments of these indicators, relatively reliable trend breakthrough points can be identified as opportunities to establish positions.

## Advantage Analysis
The biggest advantage of this strategy is that it combines multiple indicators for decision making instead of relying on a single technical indicator, which can effectively reduce the probability of wrong trades and ensure that trading signals are more reliable. In addition, the dynamic adjustment of parameters also enables the strategy to adapt to market changes.

Another advantage is that high-frequency trading can be performed. The Range Filter indicator is very sensitive to price changes over small periods, which means that the strategy can open and close positions in a relatively short period of time, so it is very suitable for high-frequency trading and allows profits to be made in the volatile cryptocurrency market.

## Risk Analysis
This strategy still has some risks. The first is the risk that technical pattern judgments fail because indicators cannot guarantee price movements 100%. When prices reverse, it may lead to stop loss. 

Another major risk is that the median line of the Range Filter cannot completely filter out price fluctuations. When there is a larger price fluctuation beyond the range of the median line, the median line will fail, resulting in the risk of generating wrong signals. In this case, the parameters can be appropriately relaxed to expand the range of the median line.

Finally, high-frequency trading itself also carries some risks. When the trading frequency is too high, transaction costs will be relatively large, which may offset some profits. In this case, the trading frequency and holding time can be appropriately reduced.

## Optimization  
There is still room for further optimization of this strategy. For example, more indicators can be considered, such as volatility indicators to confirm trends and establish stricter filtering criteria to ensure more precise trading signals. Or study the price behavior patterns of different cryptocurrencies and stocks, and set indicator parameters that best suit them.

From the trading logic, dynamic stop loss and take profit ranges can also be set. That is to say, when the position size increases, the stop loss range can be expanded to lock in more profits. Or when the profit is relatively large, accelerate the take profit speed. This can reduce drawdowns to some extent.

Finally, the filter parameters can be optimized to find a set of parameters so that the median line range can effectively filter out fluctuations while capturing trend turning points as much as possible. This requires a lot of backtest data for iterative analysis.  

## Summary
This strategy successfully combines multiple indicators for judgment to form a highly reliable trading strategy suitable for high-frequency quantitative trading. With continuous optimization and improvement, it is believed that stable returns can be obtained and it is worth further development.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|ema_value|
|v_input_2|50|sma_value|
|v_input_int_1|80|Overbought limit of RSI|
|v_input_int_2|20|Oversold limit of RSI|
|v_input_int_3|2|Start - Default = 2 - Multiplied by .01|
|v_input_int_4|2|Step Setting (Sensitivity) - Default = 2 - Multiplied by .01|
|v_input_int_5|2|Maximum Step (Sensitivity) - Default = 2 - Multiplied by .10|
|v_input_3|true|Show Up Trending Parabolic Sar|
|v_input_4|true|Show Down Trending Parabolic Sar|
|v_input_5|false|Start and Step settings are *.01 so 2 = .02 etc, Maximum Step is *.10 so 2 = .2|
|v_input_6|false|Show Ichimoku lines|
|v_input_int_6|9|Tenkan|
|v_input_int_7|26|Kijun|
|v_input_int_8|52|Chikou|
|v_input_int_9|26|Offset|
|v_input_int_10|5|Left Bars|
|v_input_int_11|5|Right Bars|
|v_input_bool_1|true|Support/Resistance|
|v_input_color_1|lime|supcol|
|v_input_color_2|red|rescol|
|v_input_int_12|3|srlinewidth|
|v_input_bool_2|true|Change Bar Color|
|v_input_color_3|blue|bcolup|
|v_input_color_4|black|bcoldn|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_13|100|Sampling Period|
|v_input_float_1|3|Range Multiplier|
|v_input_8|true|Use Current Chart Resolution?|
|v_input_timeframe_1|60|Use Different Timeframe? Uncheck Box Above|
|v_input_9|true|Show MacD & Signal Line? Also Turn Off Dots Below|
|v_input_10|true|Show Dots When MacD Crosses Signal Line?|
|v_input_11|true|Show Histogram?|
|v_input_12|true|Change MacD Line Color-Signal Line Cross?|
|v_input_13|true|MacD Histogram 4 Colors?|
|v_input_int_14|12|fastLength|
|v_input_int_15|26|slowLength|
|v_input_int_16|9|signalLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-18 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='5cel Scalp Strategy BTCUSDT Long & Short 30 Min', shorttitle='BTCUSDT Long & Short Scalp 30m', precision=1, overlay=true)

//Swing Call - Based on RSI Overbought & Oversold
//#### Starts Here #####
ema_value = input(5)
sma_value = input(50)
ema1 = ta.ema(close, ema_value)
sma2 = ta.sma(close, sma_value)
rs = ta.rsi(close, 14)

iff_1 = high < sma2 ? color.red : color.yellow
iff_2 = low > sma2 ? color.lime : iff_1
mycolor = rs >= 85 or rs <= 15 ? color.yellow : iff_2

//For Main Strategy
bool swingCallGreen = false
bool swingCallRed = false
bool swingCallYellow = false

if rs >= 85 or rs <= 15
    //color.yellow
    swingCallGreen := false
    swingCallRed := false
    swingCallYellow := true
    swingCallYellow
else
    if low > sma2
        //color.lime
        swingCallGreen := true
        swingCallRed := false
        swingCallYellow := false
        swingCallYellow
        //color.red
    else if high < sma2
        swingCallGreen := false
        swingCallRed := true
        swingCallYellow := false
        swingCallYellow
    else
        //color.yellow
        swingCallGreen := false
        swingCallRed := false
        swingCallYellow := true
        swingCallYellow

hlong = input.int(80, title='Overbought limit of RSI', step=1)
ll = input.int(20, title='Oversold limit of RSI', step=1)

buyexit = ta.crossunder(rs, hlong)
sellexit = ta.crossover(rs, ll)

sellcall = ta.crossover(sma2, ema1) and open > close
buycall = ta.crossunder(sma2, ema1) and high > sma2
//#### Ends Here #####


//Parabolic SAR -  Trend Circles
//#### Starts Here #####
start = input.int(2, minval=0, maxval=10, title='Start - Default = 2 - Multiplied by .01')
increment = input.int(2, minval=0, maxval=10, title='Step Setting (Sensitivity) - Default = 2 - Multiplied by .01')
maximum = input.int(2, minval=1, maxval=10, title='Maximum Step (Sensitivity) - Default = 2 - Multiplied by .10')
sus = input(true, 'Show Up Trending Parabolic Sar')
sds = input(true, 'Show Down Trending Parabolic Sar')
disc = input(false, title='Start and Step settings are *.01 so 2 = .02 etc, Maximum Step is *.10 so 2 = .2')

startCalc = start * .01
incrementCalc = increment * .01
maximumCalc = maximum * .10

sarUp = ta.sar(startCalc, incrementCalc, maximumCalc)
sarDown = ta.sar(startCalc, incrementCalc, maximumCalc)

colUp = close >= sarDown ? color.lime : na
colDown = close <= sarUp ? color.red : na

parabolicSARGreen = ta.sar(startCalc, incrementCalc, maximumCalc)
parabolicSARRed = ta.sar(startCalc, incrementCalc, maximumCalc)
//#### Ends Here #####


//EMA Line
//#### Starts Here #####
ema100 = ta.ema(close, 100)
//#### Ends Here #####


// Ichimoku Cloud
//#### Starts Here #####
sCloud = input(false, 'Show Ichimoku lines')

// Colors
colorGreen = #00ff00
colorRed = #ff0000
colorTenkanViolet = #9400D3
colorKijun = #fdd8a0
colorLime = #006400
colorMaroon = #8b0000

//Periods are set to standard
tenkanPeriods = input.int(9, minval=1, title='Tenkan')
kijunPeriods = input.int(26, minval=1, title='Kijun')
chikouPeriods = input.int(52, minval=1, title='Chikou')
displacement = input.int(26, minval=1, title='Offset')

donchian(len) =>
    math.avg(ta.lowest(len), ta.highest(len))

tenkan = donchian(tenkanPeriods)
kijun = donchian(kijunPeriods)
senkouA = math.avg(tenkan, kijun)
senkouB = donchian(chikouPeriods)
displacedSenkouA = senkouA[displacement]
displacedSenkouB = senkouB[displacement]

bullishSignal = ta.crossover(tenkan, kijun)
bearishSignal = ta.crossunder(tenkan, kijun)

bullishSignalValues = bullishSignal ? tenkan : na
bearishSignalValues = bearishSignal ? tenkan : na


strongBullishSignal = bullishSignalValues > displacedSenkouA and bullishSignalValues > displacedSenkouB
neutralBullishSignal = bullishSignalValues > displacedSenkouA and bullishSignalValues < displacedSenkouB or bullishSignalValues < displacedSenkouA and bullishSignalValues > displacedSenkouB
weakBullishSignal = bullishSignalValues < displacedSenkouA and bullishSignalValues < displacedSenkouB

strongBearishSignal = bearishSignalValues < displacedSenkouA and bearishSignalValues < displacedSenkouB
neutralBearishSignal = bearishSignalValues > displacedSenkouA and bearishSignalValues < displacedSenkouB or bearishSignalValues < displacedSenkouA and bearishSignalValues > displacedSenkouB
weakBearishSignal = bearishSignalValues > displacedSenkouA and bearishSignalValues > displacedSenkouB
//#### Ends Here #####


//Higher High Lower Low Strategy
//#### Starts Here #####
lb = input.int(5, title='Left Bars', minval=1)
rb = input.int(5, title='Right Bars', minval=1)
showsupres = input.bool(true, title='Support/Resistance', inline='srcol')
supcol = input.color(color.lime, title='', inline='srcol')
rescol = input.color(color.red, title='', inline='srcol')
// srlinestyle = input.string(line.style_dotted, title='Line Style/Width', options=[line.style_solid, line.style_dashed, line.style_dotted], inline='style')
srlinewidth = input.int(3, title='', minval=1, maxval=5, inline='style')
changebarcol = input.bool(true, title='Change Bar Color', inline='bcol')
bcolup = input.color(color.blue, title='', inline='bcol')
bcoldn = input.color(color.black, title='', inline='bcol')

ph = ta.pivothigh(lb, rb)
pl = ta.pivotlow(lb, rb)

iff_3 = pl ? -1 : na  // Trend direction
hl = ph ? 1 : iff_3
iff_4 = pl ? pl : na  // similar to zigzag but may have multiple highs/lows
zz = ph ? ph : iff_4
valuewhen_1 = ta.valuewhen(hl, hl, 1)
valuewhen_2 = ta.valuewhen(zz, zz, 1)
zz := pl and hl == -1 and valuewhen_1 == -1 and pl > valuewhen_2 ? na : zz
valuewhen_3 = ta.valuewhen(hl, hl, 1)
valuewhen_4 = ta.valuewhen(zz, zz, 1)
zz := ph and hl == 1 and valuewhen_3 == 1 and ph < valuewhen_4 ? na : zz

valuewhen_5 = ta.valuewhen(hl, hl, 1)
valuewhen_6 = ta.valuewhen(zz, zz, 1)
hl := hl == -1 and valuewhen_5 == 1 and zz > valuewhen_6 ? na : hl
valuewhen_7 = ta.valuewhen(hl, hl, 1)
valuewhen_8 = ta.valuewhen(zz, zz, 1)
hl := hl == 1 and valuewhen_7 == -1 and zz < valuewhen_8 ? na : hl
zz := na(hl) ? na : zz

findprevious() =>  // finds previous three points (b, c, d, e)
    ehl = hl == 1 ? -1 : 1
    loc1 = 0.0
    loc2 = 0.0
    loc3 = 0.0
    loc4 = 0.0
    xx = 0
    for x = 1 to 1000 by 1
        if hl[x] == ehl and not na(zz[x])
            loc1 := zz[x]
            xx := x + 1
            break
    ehl := hl
    for x = xx to 1000 by 1
        if hl[x] == ehl and not na(zz[x])
            loc2 := zz[x]
            xx := x + 1
            break
    ehl := hl == 1 ? -1 : 1
    for x = xx to 1000 by 1
        if hl[x] == ehl and not na(zz[x])
            loc3 := zz[x]
            xx := x + 1
            break
    ehl := hl
    for x = xx to 1000 by 1
        if hl[x] == ehl and not na(zz[x])
            loc4 := zz[x]
            break
    [loc1, loc2, loc3, loc4]

float a = na
float b = na
float c = na
float d = na
float e = na
if not na(hl)
    [loc1, loc2, loc3, loc4] = findprevious()
    a := zz
    b := loc1
    c := loc2
    d := loc3
    e := loc4

_hh = zz and a > b and a > c and c > b and c > d
_ll = zz and a < b and a < c and c < b and c < d
_hl = zz and (a >= c and b > c and b > d and d > c and d > e or a < b and a > c and b < d)
_lh = zz and (a <= c and b < c and b < d and d < c and d < e or a > b and a < c and b > d)

plotshape(_hl, text='HL', title='Higher Low', style=shape.labelup, color=color.new(color.lime, 0), textcolor=color.new(color.black, 0), location=location.belowbar, offset=-rb)
plotshape(_hh, text='HH', title='Higher High', style=shape.labeldown, color=color.new(color.lime, 0), textcolor=color.new(color.black, 0), location=location.abovebar, offset=-rb)
plotshape(_ll, text='LL', title='Lower Low', style=shape.labelup, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), location=location.belowbar, offset=-rb)
plotshape(_lh, text='LH', title='Lower High', style=shape.labeldown, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), location=location.abovebar, offset=-rb)

float res = na
float sup = na
res := _lh ? zz : res[1]
sup := _hl ? zz : sup[1]

int trend = na
iff_5 = close < sup ? -1 : nz(trend[1])
trend := close > res ? 1 : iff_5

res := trend == 1 and _hh or trend == -1 and _lh ? zz : res
sup := trend == 1 and _hl or trend == -1 and _ll ? zz : sup
rechange = res != res[1]
suchange = sup != sup[1]

var line resline = na
var line supline = na
//#### Ends Here #####



//Range Filter 5Min
//#### Starts Here #####

src = input(defval=close, title='Source')
per = input.int(defval=100, minval=1, title='Sampling Period')

// Range Multiplier
mult = input.float(defval=3.0, minval=0.1, title='Range Multiplier')

// Smooth Average Range
smoothrng(x, t, m) =>
    wper = t * 2 - 1
    avrng = ta.ema(math.abs(x - x[1]), t)
    smoothrng = ta.ema(avrng, wper) * m
    smoothrng
smrng = smoothrng(src, per, mult)

// Range Filter
rngfilt(x, r) =>
    rngfilt = x
    rngfilt := x > nz(rngfilt[1]) ? x - r < nz(rngfilt[1]) ? nz(rngfilt[1]) : x - r : x + r > nz(rngfilt[1]) ? nz(rngfilt[1]) : x + r
    rngfilt
filt = rngfilt(src, smrng)

// Filter Direction
upward = 0.0
upward := filt > filt[1] ? nz(upward[1]) + 1 : filt < filt[1] ? 0 : nz(upward[1])
downward = 0.0
downward := filt < filt[1] ? nz(downward[1]) + 1 : filt > filt[1] ? 0 : nz(downward[1])

// Target Bands
hband = filt + smrng
lband = filt - smrng

// Colors
filtcolor = upward > 0 ? color.lime : downward > 0 ? color.red : color.orange
barcolor = src > filt and src > src[1] and upward > 0 ? color.lime : src > filt and src < src[1] and upward > 0 ? color.green : src < filt and src < src[1] and downward > 0 ? color.red : src < filt and src > src[1] and downward > 0 ? color.maroon : color.orange

// Break Outs
longCond = bool(na)
shortCond = bool(na)
longCond := src > filt and src > src[1] and upward > 0 or src > filt and src < src[1] and upward > 0
shortCond := src < filt and src < src[1] and downward > 0 or src < filt and src > src[1] and downward > 0

CondIni = 0
CondIni := longCond ? 1 : shortCond ? -1 : CondIni[1]
longCondition = longCond and CondIni[1] == -1
shortCondition = shortCond and CondIni[1] == 1
//#### Ends Here #####


//#### Starts Here #####
source = close
useCurrentRes = input(true, title='Use Current Chart Resolution?')
resCustom = input.timeframe(title='Use Different Timeframe? Uncheck Box Above', defval='60')
smd = input(true, title='Show MacD & Signal Line? Also Turn Off Dots Below')
sd = input(true, title='Show Dots When MacD Crosses Signal Line?')
sh = input(true, title='Show Histogram?')
macd_colorChange = input(true, title='Change MacD Line Color-Signal Line Cross?')
hist_colorChange = input(true, title='MacD Histogram 4 Colors?')

res1 = useCurrentRes ? timeframe.period : resCustom

fastLength = input.int(12, minval=1)
slowLength = input.int(26, minval=1)
signalLength = input.int(9, minval=1)

fastMA = ta.ema(source, fastLength)
slowMA = ta.ema(source, slowLength)

macd = fastMA - slowMA
signal = ta.sma(macd, signalLength)
hist = macd - signal

outMacD = request.security(syminfo.tickerid, res1, macd)
outSignal = request.security(syminfo.tickerid, res1, signal)
outHist = request.security(syminfo.tickerid, res1, hist)

histA_IsUp = outHist > outHist[1] and outHist > 0
histA_IsDown = outHist < outHist[1] and outHist > 0
histB_IsDown = outHist < outHist[1] and outHist <= 0
histB_IsUp = outHist > outHist[1] and outHist <= 0

//MacD Color Definitions
macd_IsAbove = outMacD >= outSignal
macd_IsBelow = outMacD < outSignal

plot_color = hist_colorChange ? histA_IsUp ? color.aqua : histA_IsDown ? color.blue : histB_IsDown ? color.red : histB_IsUp ? color.maroon : color.yellow : color.gray
macd_color = macd_colorChange ? macd_IsAbove ? color.lime : color.red : color.red
signal_color = macd_colorChange ? macd_IsAbove ? color.yellow : color.yellow : color.lime

circleYPosition = outSignal
//#### Ends Here #####


//////////////////
// Main Strategy
/////////////////
//#### Starts Here #####
var bottomText = 'Something is not ok'

bool rangeBuy = false
if longCondition
    rangeBuy := true
else
    rangeBuy := false

bool rangeSell = false
if shortCondition
    rangeSell := true
else
    rangeSell := false

bool ema100Bullish = false
bool ema100Bearish = false
bool ichimokuBearish = false
bool ichimokuBullish = false
string statusChance = 'Who knows what will happen'
string futureIchimokuTrend = 'Anything can happen'

if close > ema100
    ema100Bullish := true
    ema100Bearish := false
else
    ema100Bullish := false
    ema100Bearish := true

if displacedSenkouA > displacedSenkouB
    ichimokuBearish := false
    futureIchimokuTrend := 'Green - chance to go up'
    ichimokuBullish := true
else
    ichimokuBearish := true
    futureIchimokuTrend := 'Red - chance to go down'
    ichimokuBullish := false
    ichimokuBullish

if ema100Bullish and parabolicSARGreen
    if ichimokuBullish
        statusChance := '100%'
    else
        statusChance := '95%'
else
    if ema100Bullish and parabolicSARRed
        statusChance := '75%'
    else if ema100Bearish and parabolicSARGreen
        statusChance := '65%'
    else
        statusChance := '55%'

bool longTradePosition = false
bool shortTradePosition = false
string longTradeText = 'Now cannot say anything'

if (swingCallGreen or swingCallYellow) and ichimokuBullish and longCondition and ema100Bullish and parabolicSARGreen
    longTradePosition := true
    longTradeText := 'Bullish'

bottomText := longTradeText + ' Chance: ' + statusChance + '\n Future Trend: ' + futureIchimokuTrend
// Bottom Text

var tLog = table.new(position=position.bottom_right, rows=1, columns=2, bgcolor=color.blue, border_width=1)
table.cell(tLog, row=0, column=0, text=bottomText, text_color=color.white)
table.cell_set_text(tLog, row=0, column=0, text=bottomText)
//#### Ends Here #####

bool entryLongPosition = false
bool exitLongPosition = false

bool entryShortPosition = false
bool exitShortPosition = false

bool longPositionCount = false
bool shortPositionCount = false


if (strategy.position_size > 0)
    longPositionCount := true

if (strategy.position_size < 0)
    shortPositionCount := true
    
// Entry LONG
if (longCondition) and (not longPositionCount)
    entryLongPosition := true

// Exit LONG
if (shortCondition) and (longPositionCount)
    exitLongPosition := true
    
// Entry SHORT
if (shortCondition) and (not shortPositionCount)
    entryShortPosition := true

// Exit SHORT
if (longCondition) and (shortPositionCount)
    exitShortPosition := true

// LONG Entry & Exit
plotshape(entryLongPosition, style=shape.labeldown, location=location.abovebar, color=color.new(color.green, 0), size=size.tiny, title='buy label', text='5cel\nLONG Entry', textcolor=color.new(color.white, 0))
plotshape(exitLongPosition, style=shape.labelup, location=location.belowbar, color=color.new(color.blue, 0), size=size.tiny, title='sell label', text='5cel\nExit LONG', textcolor=color.new(color.white, 0))

//SHORT Entry & Exit
plotshape(entryShortPosition, style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny, title='buy label', text='5cel\nSHORT Entry', textcolor=color.new(color.white, 0))
plotshape(exitShortPosition, style=shape.labelup, location=location.belowbar, color=color.new(color.blue, 0), size=size.tiny, title='sell label', text='5cel\nExit SHORT', textcolor=color.new(color.white, 0))

//Get the Current Value
heikinashi_close = request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close)

if entryLongPosition
    longLabel = label.new(bar_index, high, text=str.tostring(heikinashi_close, '0.00'), color=color.orange, style=label.style_label_down, yloc=yloc.abovebar)

if entryShortPosition
    shortLabel = label.new(bar_index, high, text=str.tostring(heikinashi_close, '0.00'), color=color.orange, style=label.style_label_down, yloc=yloc.abovebar)

/// SHORT Exit
strategy.close("short", when=exitShortPosition, comment="close_short_position")

/// LONG Exit
strategy.close("long", when=exitLongPosition, comment = "close_long_position")

/// LONG Enter
strategy.entry("long", strategy.long, when=entryLongPosition, comment="open_long_position")

/// SHORT Enter
strategy.entry("short", strategy.short, when = entryShortPosition, comment="open_short_position")
```

> Detail

https://www.fmz.com/strategy/436480

> Last Modified

2023-12-25 11:10:09
