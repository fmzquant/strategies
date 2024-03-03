
> Name

双重MA指标震荡价格追踪策略Dual-MA-Indicator-Oscillating-Price-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16e566fe96e1d0694f0.png)
[trans]

该策略名称为“双重MA指标震荡价格追踪策略”,其利用了SMA和EMA等多种MA移动平均线的组合,通过设置多个快慢指标对市场价格进行实时追踪,在市场出现震荡的时候可以给出交易信号。

策略概述:
该策略通过构建三组不同参数的MA指标线,分别代表市场的快、中、慢速行情,同时辅助设置滤波指标来过滤误差信号,形成长短多空判断依据。策略逻辑优化过滤方法多样,利用价均线交叉、超买超卖指标RSI、布林线突破等技术指标进行复合判断,可以有效判断价格临界点买卖点位,把握震荡行情并减小市场风险,策略具有显著优势。

策略原理:
1、设置一组快(21周期)、中(55周期)、慢(89周期)三条MA指标线代表不同时间长度的平均价格水平;
2、通过判断三条MA指标线的排列关系(快>中>慢 或 快<中<慢),来判断目前行情是处于上升或下降阶段;
3、辅以SuperTrend等判断长短线判断,增加信号的准确性;
4、根据这些信号和过滤指标的状态变化来选时交易,发出买入/卖出信号。


策略优势:
1、利用多组MA组合指标判断市场长短期运行态势,提高判断的准确性;
2、采用多种滤波方法优化买卖点位的选择,增加获利几率;
3、应用布林线、RSI等技术指标辅助突破,把握关键支撑位和反转机会;
4、根据快速MA的方向变化选择买卖方向,无需贪图反转,追击震荡行情,实现盈利;
5、交易信号通过可视化箭头和标记清晰显示,容易掌握,操作方便。

风险与防范:
1、MA均线策略对假突破概率抗性较弱;
2、复合指标之间可能存在时间差,带来信号落后的风险;
3、突破买入后,还需要进一步判断后市强势程度,防止被套;
4、实盘考虑增加止损、止盈条件,以控制单笔交易的最大损失。

策略优化:
1、测试不同MA类型和参数,寻找最优MA组合;
2、增强反转判断模块,如完善KD指标使用;
3、结合交易量指标分析,确定真实趋势;
4、扩展BIAS指标判断超买超卖区域。

总结:
在不断波动的数字货币市场中,该策略利用波段震荡来回的机会进行频繁交易,通过设定的MA指标和辅助滤波判断进行多空切换,把握市场关键反转时机。同时也可以进一步优化,增加止损模块来降低单次损失,通过策略自动化来获取长线的正向收益。

||

The strategy is named "Dual MA Indicator Oscillating Price Tracking Strategy". It utilizes the combination of SMA, EMA and other MA moving averages to track market prices in real time. When there is oscillation in the market, it can give trading signals.

Strategy Overview:
The strategy builds three groups of MA indicator lines with different parameters, representing the fast, medium and slow trends of the market. Meanwhile, filter indicators are used to filter out false signals and form the basis for long and short judgments. The strategy has diverse logical optimization and filtering methods, using technical indicators such as moving average crossovers, RSI overbought and oversold, and Bollinger Bands breakouts for composite judgment. It can effectively determine the buying and selling points of price extremes and capture oscillating trends while reducing market risks. The strategy has significant advantages.

Strategy Principles:  
1. Set up a group of fast (21 periods), medium (55 periods) and slow (89 periods) three MA indicator lines representing average price levels of different time lengths;
2. Determine whether the current trend is in an upward or downward phase by judging the arrangement relationship of the three MA indicator lines (fast > medium > slow or fast < medium < slow); 
3. Assist with judgments such as SuperTrend to increase signal accuracy;
4. Issue buy/sell signals based on changes in the status of these signals and filter indicators.

Advantages of the Strategy:
1. Use multiple MA combinations to judge long and short term market trends for more accurate judgments;
2. Adopt multiple filtering methods to optimize the selection of buying and selling points and increase profit probability;
3. Apply technical indicators such as Bollinger Bands and RSI to assist breakouts and grasp key support levels and reversal opportunities;  
4. Select the buying and selling direction according to the direction change of the fast MA without the need to be greedy for reversals, chase oscillating trends, and achieve profits;
5. Trading signals displayed clearly through visualizable arrows and markings, easy to grasp and convenient to operate.   

Risks and Prevention:  
1. MA strategies have weaker resistance to false breakout probabilities;
2. There may be time differences between combined indicators, leading to lagging signal risks;  
3. After a break-in buy, further judgment of the strength of the subsequent market is needed to prevent being trapped;
4. Consider adding stop loss and take profit in live trading to control maximum loss per trade.   

Strategy Optimization:  
1. Test different types and parameters of MA to find the optimal combination;
2. Enhance reversal judgment modules such as improving the use of the KD indicator;  
3. Incorporate trading volume indicators to determine true trends;  
4. Expand BIAS indicators to determine overbought and oversold areas.  

Conclusion:  
In the ever-fluctuating cryptocurrency market, this strategy takes the opportunity to make frequent trades during the ups and downs of market waves. By setting the MA indicators and auxiliary filtering judgments for switching between long and short positions, it grasps the key reversal timing of the market. It can also be further optimized by adding stop loss modules to reduce single losses and obtain long-term positive returns through strategy automation.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Coloured MA Type: : HullMA|EMA|WMA|VWMA|SMMA|DEMA|TEMA|SMA|ZEMA|TMA|SSMA|
|v_input_int_1|18|Coloured MA - Length|
|v_input_1_close|0|Coloured MA - Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_2|0|Fast MA Type: : EMA|SMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_int_2|21|Fast MA - Length|
|v_input_string_3|0|Medium MA Type: : EMA|SMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_int_3|55|Medium MA - Length|
|v_input_string_4|0|Slow MA Type: : EMA|SMA|WMA|VWMA|SMMA|DEMA|TEMA|HullMA|ZEMA|TMA|SSMA|
|v_input_int_4|89|Slow MA Length|
|v_input_2_close|0|3xMA and Bollinger Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_5|0|Signal Filter Option : : SuperTrend|3xMATrend|SuperTrend+3xMA|ColouredMA|No Alerts|MACross|MACross+ST|MACross+3xMA|OutsideIn:MACross|OutsideIn:MACross+ST|OutsideIn:MACross+3xMA|
|v_input_3|false|hideMALines|
|v_input_4|true|hideSuperTrend|
|v_input_5|true|hideBollingerBands|
|v_input_6|true|hideTrendDirection|
|v_input_7|false|disableFastMAFilter|
|v_input_8|false|disableMediumMAFilter|
|v_input_9|false|disableSlowMAFilter|
|v_input_int_5|20|Bollinge Bands Length|
|v_input_float_1|2|Bollinger Bands StdDevs|
|v_input_10|8|Bollinger Outside In LookBack|
|v_input_float_2|3.618|SuperTrend Factor|
|v_input_int_6|5|SuperTrend Length|
|v_input_string_6|0|BUY Marker Colour: : Green|Lime|Aqua|DodgerBlue|Gray|Yellow|
|v_input_string_7|0|SELL Marker Colour: : Maroon|Red|Fuchsia|Blue|Black|Orange|
|v_input_11|70|overbought value|
|v_input_12|30|oversold value|
|v_input_int_7|10|Length|
|v_input_int_8|12|ROCLength|
|v_input_int_9|false|Trigger|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//
// Bannos
// #NotTradingAdvice #DYOR
// Disclaimer.
// I AM NOT A FINANCIAL ADVISOR.
// THESE IDEAS ARE NOT ADVICE AND ARE FOR EDUCATION PURPOSES ONLY.
// ALWAYS DO YOUR OWN RESEARCH
//
// Author:  Adaptation from JustUncleL Big Snapper by Bannos
// Date:    May-2022
// Version: R1.0

//Description of this addon - Script using several new conditions to give Long/short and SL levels which was not proposed in the Big Snapper strategy "Big Snapper Alerts R3.0"
//"
//This strategy is based on the use of the Big Snapper outputs from the JustUncleL script and the addition of several conditions to define filtered conditions selecting signal synchrones with a trend and a rise of the volatility.
//Also the strategy proposes to define proportional stop losses and dynamic Take profit using an RSI strategy.

// After delivering the temporary ong/short signal and ploting a green or purple signal, several conditions are defined to consider a Signal is Long or short.
//Let s take the long signal as example(this is the same process with the opposite values for a short).
//step 1 - Long Definition:
    // Snapper long signal stored in the buffer variable Longbuffer to say that in a close future, we could have all conditions for a long
    // Now we need some conditions to combine with it: 
    //the second one is to be over the Ma_medium(55) 
    //and because this is not selective enough, the third one is a Volatility indicator "Chaikin Volatility" indicator giving an indication about the volatility of the price compared to the 10 last values
    // -> Using the volatility indicator gives the possibility to increase the potential rise if the volatility is higher compared to the last periods.
    //With these 3 signals, we get a robust indication about a potential long signal which is then stored in the variable "Longe"
    
    //Now we have a long signal and can give a long signal with its Stop Loss
    // The Long Signal is automatically given as the 3 conditions above are satisfied.
    // The Stop loss is a function of the last Candle sizes giving a stop below the 70% of the overall candle which can be assimilated to a Fibonacci level. Below this level it makes sense to stop the trade as the chance to recover the complete Candle is more than 60% 
    
    //Now we are in an open Long and can use all the mentioned Stop loss condition but still need a Take Profit condition
    //The take profit condition is based on a RSI strategy consisting in taking profit as soon as the RSI come back from the overbought area (which is here defined as a rsi over 70) and reaching the 63.5 level to trigger the Take Profit
    //This TP condition is only active when Long is active and when an entry value as been defined.
    
    //Entry and SL level appreas as soon as a Long or short arrow signal does appears. The Take profit will be conidtioned to the RSI.
    
    //The final step in the cycle is a reinitialization of all the values giving the possibility to detect and treat any long new signal coming from the Big Snapper signal.

//-------------------------------------------------------------------------------------------------------

strategy(title='Big Snapper Alerts R3.0 + Chaiking Volatility condition + TP RSI', shorttitle='SNAPPER Bannos', overlay=true)

// === INPUTS ===
// Coloured MA - type, length, source
typeColoured = input.string(defval='HullMA', title='Coloured MA Type: ', options=['SMA', 'EMA', 'WMA', 'VWMA', 'SMMA', 'DEMA', 'TEMA', 'HullMA', 'ZEMA', 'TMA', 'SSMA'])
lenColoured = input.int(defval=18, title='Coloured MA - Length', minval=1)
srcColoured = input(close, title='Coloured MA - Source')
// Fast MA - type, length
typeFast = input.string(defval='EMA', title='Fast MA Type: ', options=['SMA', 'EMA', 'WMA', 'VWMA', 'SMMA', 'DEMA', 'TEMA', 'HullMA', 'ZEMA', 'TMA', 'SSMA'])
lenFast = input.int(defval=21, title='Fast MA - Length', minval=1)
// Medium MA - type, length
typeMedium = input.string(defval='EMA', title='Medium MA Type: ', options=['SMA', 'EMA', 'WMA', 'VWMA', 'SMMA', 'DEMA', 'TEMA', 'HullMA', 'ZEMA', 'TMA', 'SSMA'])
lenMedium = input.int(defval=55, title='Medium MA - Length', minval=1)
// Slow MA - type, length
typeSlow = input.string(defval='EMA', title='Slow MA Type: ', options=['SMA', 'EMA', 'WMA', 'VWMA', 'SMMA', 'DEMA', 'TEMA', 'HullMA', 'ZEMA', 'TMA', 'SSMA'])
lenSlow = input.int(defval=89, title='Slow MA Length', minval=1)
// 3xMA source
ma_src = input(close, title='3xMA and Bollinger Source')
//
filterOption = input.string('SuperTrend', title='Signal Filter Option : ', options=['3xMATrend', 'SuperTrend', 'SuperTrend+3xMA', 'ColouredMA', 'No Alerts', 'MACross', 'MACross+ST', 'MACross+3xMA', 'OutsideIn:MACross', 'OutsideIn:MACross+ST', 'OutsideIn:MACross+3xMA'])
//
hideMALines = input(false)
hideSuperTrend = input(true)
hideBollingerBands = input(true)
hideTrendDirection = input(true)
//
disableFastMAFilter = input(false)
disableMediumMAFilter = input(false)
disableSlowMAFilter = input(false)
//
uKC = false  // input(false,title="Use Keltner Channel (KC) instead of Bollinger")
bbLength = input.int(20, minval=2, step=1, title='Bollinge Bands Length')
bbStddev = input.float(2.0, minval=0.5, step=0.1, title='Bollinger Bands StdDevs')
oiLength = input(8, title='Bollinger Outside In LookBack')
//
SFactor = input.float(3.618, minval=1.0, title='SuperTrend Factor')
SPd = input.int(5, minval=1, title='SuperTrend Length')
//
buyColour_ = input.string('Green', title='BUY Marker Colour: ', options=['Green', 'Lime', 'Aqua', 'DodgerBlue', 'Gray', 'Yellow'])
sellColour_ = input.string('Maroon', title='SELL Marker Colour: ', options=['Maroon', 'Red', 'Fuchsia', 'Blue', 'Black', 'Orange'])
// --- Allocate Correct Filtering Choice
// Can only be one choice
uSuperTrendFilter = filterOption == 'SuperTrend' ? true : false
u3xMATrendFilter = filterOption == '3xMATrend' ? true : false
uBothTrendFilters = filterOption == 'SuperTrend+3xMA' ? true : false
//uOIFilter           = filterOption == "OutsideIn:ClrMA" ? true : false
uOIMACrossFilter = filterOption == 'OutsideIn:MACross' ? true : false
uOI3xMAFilter = filterOption == 'OutsideIn:MACross+3xMA' ? true : false
uOISTFilter = filterOption == 'OutsideIn:MACross+ST' ? true : false
uMACrossFilter = filterOption == 'MACross' ? true : false
uMACrossSTFilter = filterOption == 'MACross+ST' ? true : false
uMACross3xMAFilter = filterOption == 'MACross+3xMA' ? true : false
// unless all 3 MAs disabled.
disable3xMAFilter = disableFastMAFilter and disableMediumMAFilter and disableSlowMAFilter
u3xMATrendFilter := disable3xMAFilter ? false : u3xMATrendFilter
// if no filters selected then must be "No Filters" option
disableAllFilters = u3xMATrendFilter or uSuperTrendFilter or uBothTrendFilters or uOI3xMAFilter or uOISTFilter or uOIMACrossFilter or uMACrossFilter or uMACrossSTFilter or uMACross3xMAFilter ? false : true
// if "No Alerts" option selected, then disable all selections
disableAllFilters := filterOption == 'No Alerts' ? false : disableAllFilters
uSuperTrendFilter := filterOption == 'No Alerts' ? false : uSuperTrendFilter
u3xMATrendFilter := filterOption == 'No Alerts' ? false : u3xMATrendFilter
uBothTrendFilters := filterOption == 'No Alerts' ? false : uBothTrendFilters
//uOIFilter           := filterOption == "No Alerts"? false : uOIFilter
uOIMACrossFilter := filterOption == 'No Alerts' ? false : uOIMACrossFilter
uOI3xMAFilter := filterOption == 'No Alerts' ? false : uOI3xMAFilter
uOISTFilter := filterOption == 'No Alerts' ? false : uOISTFilter
uMACrossFilter := filterOption == 'No Alerts' ? false : uMACrossFilter
uMACrossSTFilter := filterOption == 'No Alerts' ? false : uMACrossSTFilter
uMACross3xMAFilter := filterOption == 'No Alerts' ? false : uMACross3xMAFilter
// --- CONSTANTS ---
dodgerblue = #1E90FF
lightcoral = #F08080
buyColour = color.green  // for big Arrows, must be a constant.
sellColour = color.maroon  // for big Arrows
// Colour Selectable for Big Fat Bars.
buyclr = buyColour_ == 'Lime' ? color.lime : buyColour_ == 'Aqua' ? color.aqua : buyColour_ == 'DodgerBlue' ? dodgerblue : buyColour_ == 'Gray' ? color.gray : buyColour_ == 'Yellow' ? color.yellow : color.green
sellclr = sellColour_ == 'Red' ? color.red : sellColour_ == 'Fuchsia' ? color.fuchsia : sellColour_ == 'Blue' ? color.blue : sellColour_ == 'Black' ? color.black : sellColour_ == 'Orange' ? color.orange : color.maroon
// === /INPUTS ===
// === FUNCTIONS ===
// Returns MA input selection variant, default to SMA if blank or typo.
variant(type, src, len) =>
    v1 = ta.sma(src, len)  // Simple
    v2 = ta.ema(src, len)  // Exponential
    v3 = ta.wma(src, len)  // Weighted
    v4 = ta.vwma(src, len)  // Volume Weighted
    v5 = 0.0
    sma_1 = ta.sma(src, len)  // Smoothed
    v5 := na(v5[1]) ? sma_1 : (v5[1] * (len - 1) + src) / len
    v6 = 2 * v2 - ta.ema(v2, len)  // Double Exponential
    v7 = 3 * (v2 - ta.ema(v2, len)) + ta.ema(ta.ema(v2, len), len)  // Triple Exponential
    v8 = ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))  // Hull WMA = (2*WMA (n/2) − WMA (n)), sqrt (n))
    v11 = ta.sma(ta.sma(src, len), len)  // Triangular
    // SuperSmoother filter
    // © 2013  John F. Ehlers
    a1 = math.exp(-1.414 * 3.14159 / len)
    b1 = 2 * a1 * math.cos(1.414 * 3.14159 / len)
    c2 = b1
    c3 = -a1 * a1
    c1 = 1 - c2 - c3
    v9 = 0.0
    v9 := c1 * (src + nz(src[1])) / 2 + c2 * nz(v9[1]) + c3 * nz(v9[2])
    // Zero Lag Exponential
    e = ta.ema(v1, len)
    v10 = v1 + v1 - e
    // return variant, defaults to SMA if input invalid.
    type == 'EMA' ? v2 : type == 'WMA' ? v3 : type == 'VWMA' ? v4 : type == 'SMMA' ? v5 : type == 'DEMA' ? v6 : type == 'TEMA' ? v7 : type == 'HullMA' ? v8 : type == 'SSMA' ? v9 : type == 'ZEMA' ? v10 : type == 'TMA' ? v11 : v1
// === /FUNCTIONS ===
// === SERIES VARIABLES ===
// MA's
ma_fast = variant(typeFast, ma_src, lenFast)
ma_medium = variant(typeMedium, ma_src, lenMedium)
ma_slow = variant(typeSlow, ma_src, lenSlow)
ma_coloured = variant(typeColoured, srcColoured, lenColoured)
// Get Direction of Coloured Moving Average
clrdirection = 1
falling_1 = ta.falling(ma_coloured, 2)
clrdirection := ta.rising(ma_coloured, 2) ? 1 : falling_1 ? -1 : nz(clrdirection[1], 1)
// get 3xMA trend direction based on selections.
madirection = ma_fast > ma_medium and ma_medium > ma_slow ? 1 : ma_fast < ma_medium and ma_medium < ma_slow ? -1 : 0
madirection := disableSlowMAFilter ? ma_fast > ma_medium ? 1 : ma_fast < ma_medium ? -1 : 0 : madirection
madirection := disableMediumMAFilter ? ma_fast > ma_slow ? 1 : ma_fast < ma_slow ? -1 : 0 : madirection
madirection := disableFastMAFilter ? ma_medium > ma_slow ? 1 : ma_medium < ma_slow ? -1 : 0 : madirection
madirection := disableFastMAFilter and disableMediumMAFilter ? ma_coloured > ma_slow ? 1 : -1 : madirection
madirection := disableFastMAFilter and disableSlowMAFilter ? ma_coloured > ma_medium ? 1 : -1 : madirection
madirection := disableSlowMAFilter and disableMediumMAFilter ? ma_coloured > ma_fast ? 1 : -1 : madirection
//
// Supertrend Calculations
SUp = hl2 - SFactor * ta.atr(SPd)
SDn = hl2 + SFactor * ta.atr(SPd)
STrendUp = 0.0
STrendDown = 0.0
STrendUp := close[1] > STrendUp[1] ? math.max(SUp, STrendUp[1]) : SUp
STrendDown := close[1] < STrendDown[1] ? math.min(SDn, STrendDown[1]) : SDn
STrend = 0
STrend := close > STrendDown[1] ? 1 : close < STrendUp[1] ? -1 : nz(STrend[1], 1)
Tsl = STrend == 1 ? STrendUp : STrendDown
// Standard Bollinger or KC Bands
basis = ta.sma(ma_src, bbLength)
rangema = ta.sma(ta.tr, bbLength)
stdev_1 = ta.stdev(ma_src, bbLength)
dev = uKC ? bbStddev * rangema : bbStddev * stdev_1
// Calculate Bollinger or KC Channel
upper = basis + dev
lower = basis - dev
// Lookback for previous highest bar index
noiupper = math.abs(ta.highestbars(oiLength))
noilower = math.abs(ta.lowestbars(oiLength))
// ColouredMA OutsideIn
//oiupper = clrdirection<0 and noiupper>0 and highest(oiLength)>upper[noiupper]? 1 : 0
//oilower = clrdirection>0 and noilower>0 and lowest(oiLength)<lower[noilower]? 1 : 0
// MACross OutsideIN
oiMACrossupper = ta.crossunder(ma_fast, ma_coloured) and noiupper > 0 and ta.highest(oiLength) > upper[noiupper] ? 1 : 0
oiMACrosslower = ta.crossover(ma_fast, ma_coloured) and noilower > 0 and ta.lowest(oiLength) < lower[noilower] ? 1 : 0
// === /SERIES VARIABLES ===
// === PLOTTING ===
// All the MA's
plot(ma_coloured, title='Coloured MA', color=clrdirection < 0 ? lightcoral : color.blue, linewidth=3, transp=20)
plot(hideMALines ? na : ma_fast, title='Fast MA', color=color.new(color.lime, 20), linewidth=2)
plot(hideMALines ? na : ma_medium, title='Medium MA', color=color.new(color.red, 10), linewidth=2)
plot(hideMALines ? na : ma_slow, title='Slow MA', color=color.new(color.gray, 10), linewidth=2)
// show 3xMA Trend Direction State.
dcolour = madirection == 1 ? color.green : madirection == -1 ? color.red : color.yellow
plotshape(hideTrendDirection ? na : madirection, title='3xMA Trend Direction', location=location.bottom, style=shape.square, color=dcolour, transp=10)
// SuperTrend
plot(hideSuperTrend ? na : Tsl, color=STrend == 1 ? color.green : color.maroon, style=plot.style_line, linewidth=2, title='SuperTrend')
// Bollinger Bands
p1 = plot(hideBollingerBands ? na : upper, title='BB upper', color=color.new(dodgerblue, 20), linewidth=1)
p2 = plot(hideBollingerBands ? na : lower, title='BB lower', color=color.new(dodgerblue, 20), linewidth=1)
fill(p1, p2, color=color.new(dodgerblue, 96), title='BB fill')
// === /PLOTTING ===
// === ALERTING ===
// 3xMA Filtering
_3xmabuy = 0
_3xmasell = 0
_3xmabuy := clrdirection == 1 and close > ma_fast and madirection == 1 ? nz(_3xmabuy[1]) + 1 : clrdirection == 1 and madirection == 1 ? nz(_3xmabuy[1]) > 0 ? nz(_3xmabuy[1]) + 1 : 0 : 0
_3xmasell := clrdirection == -1 and close < ma_fast and madirection == -1 ? nz(_3xmasell[1]) + 1 : clrdirection == -1 and madirection == -1 ? nz(_3xmasell[1]) > 0 ? nz(_3xmasell[1]) + 1 : 0 : 0
//
// SuperTrend Filtering
stbuy = 0
stsell = 0
stbuy := clrdirection == 1 and STrend == 1 ? nz(stbuy[1]) + 1 : 0
stsell := clrdirection == -1 and STrend == -1 ? nz(stsell[1]) + 1 : 0
//
// 3xMA & SuperTrend Filtering
//
st3xmabuy = 0
st3xmasell = 0
st3xmabuy := (disable3xMAFilter or _3xmabuy > 0) and stbuy > 0 ? nz(st3xmabuy[1]) + 1 : 0
st3xmasell := (disable3xMAFilter or _3xmasell > 0) and stsell > 0 ? nz(st3xmasell[1]) + 1 : 0
// Bollinger Outside In using ColuredMA direction Filter.
//oibuy = 0
//oisell = 0
//oibuy  := clrdirection == 1 and oilower==1? nz(oibuy[1])+1  : 0
//oisell := clrdirection ==-1 and oiupper==1? nz(oisell[1])+1 : 0
// Bollinger Outside In using MACross signal Filter
oiMACrossbuy = 0
oiMACrosssell = 0
oiMACrossbuy := oiMACrosslower == 1 ? nz(oiMACrossbuy[1]) + 1 : 0
oiMACrosssell := oiMACrossupper == 1 ? nz(oiMACrosssell[1]) + 1 : 0
// Bollinger Outside In + 3xMA Filter
oi3xmabuy = 0
oi3xmasell = 0
oi3xmabuy := oiMACrossbuy > 0 and (disable3xMAFilter or madirection == 1) ? nz(oi3xmabuy[1]) + 1 : 0
oi3xmasell := oiMACrosssell > 0 and (disable3xMAFilter or madirection == -1) ? nz(oi3xmasell[1]) + 1 : 0
// Bollinger Outside In + SuperTrend Filter
oistbuy = 0
oistsell = 0
oistbuy := oiMACrossbuy > 0 and STrend == 1 ? nz(oistbuy[1]) + 1 : 0
oistsell := oiMACrosssell > 0 and STrend == -1 ? nz(oistsell[1]) + 1 : 0
// FastMA crossover HullMA and SuperTrend
macrossSTbuy = 0
macrossSTsell = 0
macrossSTbuy := ta.crossover(ma_fast, ma_coloured) and STrend == 1 ? nz(macrossSTbuy[1]) + 1 : 0
macrossSTsell := ta.crossunder(ma_fast, ma_coloured) and STrend == -1 ? nz(macrossSTsell[1]) + 1 : 0
// FastMA crossover HullMA and 3xMA
macross3xMAbuy = 0
macross3xMAsell = 0
macross3xMAbuy := ta.crossover(ma_fast, ma_coloured) and (disable3xMAFilter or madirection == 1) ? nz(macross3xMAbuy[1]) + 1 : 0
macross3xMAsell := ta.crossunder(ma_fast, ma_coloured) and (disable3xMAFilter or madirection == -1) ? nz(macross3xMAsell[1]) + 1 : 0
//
// Check any Alerts set
long = u3xMATrendFilter and _3xmabuy == 1 or uSuperTrendFilter and stbuy == 1 or uBothTrendFilters and st3xmabuy == 1 or uOI3xMAFilter and oi3xmabuy == 1 or uOISTFilter and oistbuy == 1 or uOIMACrossFilter and oiMACrossbuy == 1 or uMACrossSTFilter and macrossSTbuy == 1 or uMACross3xMAFilter and macross3xMAbuy == 1
short = u3xMATrendFilter and _3xmasell == 1 or uSuperTrendFilter and stsell == 1 or uBothTrendFilters and st3xmasell == 1 or uOI3xMAFilter and oi3xmasell == 1 or uOISTFilter and oistsell == 1 or uOIMACrossFilter and oiMACrosssell == 1 or uMACrossSTFilter and macrossSTsell == 1 or uMACross3xMAFilter and macross3xMAsell == 1
//
// If Alert Detected, then Draw Big fat liner
plotshape(long ? long : na, title='Long Line Marker', location=location.belowbar, style=shape.arrowup, color=buyclr, size=size.auto, text='████████████████', textcolor=buyclr, transp=20)
plotshape(short ? short : na, title='Short Line Marker', location=location.abovebar, style=shape.arrowdown, color=sellclr, size=size.auto, text='████████████████', textcolor=sellclr, transp=20)
// --- Arrow style signals
// No Filters only Hull Signals
hbuy = 0
hsell = 0
hbuy := clrdirection == 1 ? nz(hbuy[1]) + 1 : 0
hsell := clrdirection == -1 ? nz(hsell[1]) + 1 : 0
// FastMA crossover HullMA
macrossbuy = 0
macrosssell = 0
macrossbuy := ta.crossover(ma_fast, ma_coloured) ? nz(macrossbuy[1]) + 1 : 0
macrosssell := ta.crossunder(ma_fast, ma_coloured) ? nz(macrosssell[1]) + 1 : 0
//
along = disableAllFilters and hbuy == 1 or uMACrossFilter and macrossbuy == 1
ashort = disableAllFilters and hsell == 1 or uMACrossFilter and macrosssell == 1
// 
// If ColouredMA or MACross then draw big arrows
plotarrow(along ? 1 : ashort ? -1 : na, title='ColouredMA or MACross Arrow', colorup=color.new(buyColour, 20), colordown=color.new(sellColour, 20), maxheight=100, minheight=50)


//----------Input Bannos----------------------------------------------------------------------------------------------------------//
var triggerlong = 0
var triggershort = 0
var up = 0
var down = 0
var bool longe = 0
var bool shorte = 0
var SL = 0
var entryvalueup = 0.00
var entryvaluedown = 0.00
var SLfactor = 0.5/100
var SLup = 0.00
var SLdown = 0.00
var longbuffer = 0
var shortbuffer = 0

//RSI parameters
overbought = input(70, title="overbought value")
oversold = input(30, title="oversold value")
sellRsi = ta.rsi(close, 11) > overbought
buyRsi = ta.rsi(close, 11) < oversold

var tampon_overbought = 0
var tampon_oversold = 0

//condition to use RSI
if sellRsi
    tampon_overbought := 1
if buyRsi
    tampon_oversold := 1
    
//close condition SL
if entryvalueup > 0  and low < SLup
    SL := 1



//Chaikin Volatility Strategy indicator if Volatility > 0 then Long or short, otherweise no

Length = input.int(10, '', minval=1)
ROCLength = input.int(12, '',minval=1)
Trigger = input.int(0, '',minval=0)
hline(0)
hline(Trigger)
xPrice1 = high
xPrice2 = low
xPrice = xPrice1 - xPrice2
xROC_EMA = ta.roc(ta.ema(xPrice, Length), ROCLength)
var pos = 0

if xROC_EMA < Trigger
    pos := 1
    nz(pos[1], 0)

if xROC_EMA > Trigger
    pos := -1
    nz(pos[1], 0)

//-----------------------------------------------------------------------------

// plot(xROC_EMA, title="Chaikin Volatility Strategy")
// plot(longe ? 1 : 0, 'longe')
// plot(shorte ? 1 : 0, 'shorte')
plot(entryvalueup, 'entree Long')
plot(SLup, 'SL Long')

plot(entryvaluedown, 'entree Short')
plot(SLdown, 'SL Short')

// plot(entryvalueup, 'entrryvalueup')
// plot(entryvaluedown, 'entrryvaluedown')
// plot(up, 'up')
//plot(down, 'down')
// plot(ta.rsi(close, 11), 'RSI')
// plot(tampon_overbought, 'tampon Overbought')
// plot(tampon_oversold, 'tampon Oversold')
// plot( triggerlong, ' triggerlong')
//plot( triggershort, ' triggershort')
// plot(sellRsi ? 1 : 0, 'sellRsi')


//close condition TP
closelong = (tampon_overbought == 1 and ta.rsi(close, 11) < 63.8 or shorte or SL == 1)
closeshort = (tampon_oversold == 1 and ta.rsi(close, 11) > 36.2 or longe or SL == 1)


//reinit after long Close
if closelong
    up := 0
    longe := 0
    tampon_overbought := 0
    triggerlong := 0
    SL := 0
    entryvalueup := 0
    SLup := 0
    
    //reinit after short Close
if closeshort
    down := 0
    shorte := 0
    tampon_oversold := 0
    triggershort := 0
    SL := 0
    entryvaluedown := 0
    SLdown := 0

    
    
//condition sous sur MA SLOW to start
if close < ma_medium
    triggerlong := 0
    triggershort := 1
    
if close > ma_medium
    triggershort := 0
    triggerlong := 1



// Update alarm conditions

if long or along
    longbuffer := 1

if short or ashort
    shortbuffer := 1    

longe := longbuffer and triggerlong and xROC_EMA > 3.5
shorte := shortbuffer and triggershort and xROC_EMA > 3.5

// // var longe = long ? 1 : 0
// // var shorte = short ? 1 : 0

if longe == 1 and close > open 
    up := 1
    down  := 0
    entryvalueup :=close
    SLup := close - 0.7*(high - low)
    SLdown := 0
    longbuffer := 0

if shorte == 1 and close < open
    down := 1
    up := 0
    entryvaluedown := close
    SLdown := close + 0.7*(high - low)
    SLup := 0
    shortbuffer := 0

strategy.entry('longe', strategy.long, 1, when = up)
strategy.entry('shorte', strategy.short, 1, when = down)
strategy.close('longe', when= closelong)
strategy.close('shorte', when= closeshort)


// === /ALERTING ===
// === ALARMS ===
//
alertcondition(up or down or closelong or closeshort, title='Signal Alert', message='SIGNAL')
alertcondition(up, title='Long Alert', message='LONG')
alertcondition(down, title='Short Alert', message='SHORT')
alertcondition(closelong, title='close Long Alert', message='Close LONG')
alertcondition(closeshort, title='close Short Alert', message='Close SHORT')

// === /ALARMS ===




//EOF

```

> Detail

https://www.fmz.com/strategy/441066

> Last Modified

2024-02-05 12:10:18
