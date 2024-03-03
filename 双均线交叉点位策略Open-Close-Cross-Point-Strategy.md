
> Name

双均线交叉点位策略Open-Close-Cross-Point-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14f7293dd41ded232b5.png)

[trans]

## 概述
双均线交叉点位策略是一种基于移动平均线的量化交易策略。它通过计算快线和慢线的交叉来判断价格趋势,并在交叉点发出买入和卖出信号。本策略采用Hull均线作为快线,而Super Smoother滤波器作为慢线。这种组合结合了均线的平滑性以及趋势判断能力,可以有效识别价格走势,产生较为可靠的交易信号。

## 策略原理  
双均线交叉点位策略的计算公式如下:
快线(Hull均线):WMA(2 * WMA(价值,n/2)-WMA(价值,n),SQRT(n))  
慢线(Super Smoother):价值三次滤波器  

其中,WMA表示加权移动平均线,SQRT表示开平方根,滤波器包含一个一阶滞后项和两个二阶滞后项。

策略通过计算快线和慢线值,判断两线之间的交叉关系,其中:  
快线上穿慢线为买入信号
快线下穿慢线为卖出信号

## 优势分析
双均线交叉点位策略结合双均线判断和点位交易的优点,可以准确抓住趋势转折点,进出场及时。相比单一均线策略,具有以下优势:
1. 双均线组合消除假信号。快线判定趋势方向和强弱,慢线过滤震荡,使信号更加可靠。  
2. Super Smoother滤波器强大的数据 fittings 能力,能有效提取价格趋势。  
3. Hull均线对价格变化敏感度高,可以及时捕捉转折。  

## 风险分析
双均线交叉点位策略也存在一定风险:
1. 在震荡行情中,可能出现较多 whipsaw 信号。可适当加宽均线间距减少假信号。
2. 双均线间距过宽会错过部分机会。需权衡捕捉信号数量与质量。   
3. 本策略更适合趋势 clearer 的品种,不宜运用在高波动产品。

## 优化方向  
双均线交叉点位策略可从以下维度进行优化:  
1. 调整均线参数,适配不同周期及波动幅度的品种。    
2. 加入附加指标或过滤器判断趋势质量,以减少 whipsaw。     
3. 结合趋势指标优化建仓比例。

## 总结
双均线交叉点位策略承袭均线策略的优点之余,拓展运用双均线判断和点位交易方式,形成一个较为先进可靠的量化交易方案。它在择时交易方面具有独特优势,值得实盘验证与应用探索。本文深入解析了该策略的原理、长处与不足,并给出了优化设想,可供参考借鉴。相信随着模型和参数的不断完善,该策略必将成为一个强大的择时工具。

||


## Overview  
The open close cross point strategy is a quantitative trading strategy based on moving average crossovers. It determines price trends by calculating crosses between fast and slow moving average lines and generates buy and sell signals at crossover points. This strategy uses Hull Moving Average as the fast line and Super Smoother filter as the slow line. This combination incorporates both the smoothness and trend determination ability of moving averages and can effectively identify price movements to produce relatively reliable trading signals.  

## Strategy Principle
The formulas for calculating the open close cross point strategy are:
Fast line (Hull MA): WMA(2 * WMA(price, n/2) - WMA(price, n), SQRT(n))
Slow line (Super Smoother Filter): Price triple filter

Where WMA is the Weighted Moving Average, SQRT is the square root, and the filter contains one first order lag term and two second order lag terms.  

The strategy judges the relationship between the fast and slow lines by calculating their values. Where:
Upward crossover of fast line is buy signal  
Downward crossover of fast line is sell signal

## Advantage Analysis  
The open close cross point strategy combines the advantages of dual moving average judgments and point trading. It can accurately capture trend turning points for timely entries and exits. Compared to single moving average strategies, it has the following advantages:

1. Dual moving average combination eliminates false signals. Fast line determines trend direction/strength, slow line filters out oscillations so signals become more reliable.   
2. Super Smoother filter has superb data fitting capabilities to effectively extract price trends.
3. Hull MA has high sensitivity to price changes and can timely spot reversals.

## Risk Analysis 
The open close cross point strategy also carries certain risks:  

1. More whipsaw signals may occur during ranging markets. Can widen interval between MAs to reduce false signals.  
2. Excessively wide intervals between MAs may miss some opportunities. Need to balance signal quantity and quality.   
3. This strategy is more suitable for products with clearer trends, not advisable for highly volatile products.  

## Optimization Directions
The open close cross point strategy can be optimized in the following dimensions:
  
1. Adjust MA parameters to suit products of different periods and volatility ranges.   
2. Add in supplementary indicators or filters to determine trend quality to reduce whipsaws.
3. Optimize position sizing by incorporating trend strength indicators.  

## Conclusion  
The open close cross point strategy inherits the advantages of moving average strategies while expanding the use of dual moving average judgments and point trading models to form a more advanced and reliable quantitative trading scheme. It has unique advantages in timing trading which deserve live testing and application exploration. This article thoroughly parses the principles, strengths and weaknesses of this strategy, and provides optimization ideas for reference. It is believed that with continuous improvements on the model and parameters, this strategy will become a formidable market timing tool.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Alternate Resolution?|
|v_input_2|3|Multiplier for Alernate Resolution|
|v_input_string_1|0|MA Type: : SMMA|EMA|DEMA|TEMA|WMA|VWMA|SMA|HullMA|LSMA|ALMA|SSMA|TMA|
|v_input_int_1|8|MA Period|
|v_input_int_2|6|Offset for LSMA / Sigma for ALMA|
|v_input_float_1|0.85|Offset for ALMA|
|v_input_3|false|Show coloured Bars to indicate Trend?|
|v_input_int_3|false|Delay Open/Close MA (Forces Non-Repainting)|
|v_input_string_2|0|What trades should be taken : : BOTH|SHORT|LONG|NONE|
|v_input_int_4|false|Initial Stop Loss Points (zero to disable)|
|v_input_int_5|false|Initial Target Profit Points (zero for disable)|
|v_input_int_6|10000|Number of Bars for Back Testing|
|v_input_4|false|- SET to ZERO for Daily or Longer Timeframes|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//

strategy(title='Open Close Cross Strategy ', shorttitle='sacinvesting', overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=10, calc_on_every_tick=false)

// === INPUTS ===
useRes = input(defval=true, title='Use Alternate Resolution?')
intRes = input(defval=3, title='Multiplier for Alernate Resolution')
stratRes = timeframe.ismonthly ? str.tostring(timeframe.multiplier * intRes, '###M') : timeframe.isweekly ? str.tostring(timeframe.multiplier * intRes, '###W') : timeframe.isdaily ? str.tostring(timeframe.multiplier * intRes, '###D') : timeframe.isintraday ? str.tostring(timeframe.multiplier * intRes, '####') : '60'
basisType = input.string(defval='SMMA', title='MA Type: ', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'WMA', 'VWMA', 'SMMA', 'HullMA', 'LSMA', 'ALMA', 'SSMA', 'TMA'])
basisLen = input.int(defval=8, title='MA Period', minval=1)
offsetSigma = input.int(defval=6, title='Offset for LSMA / Sigma for ALMA', minval=0)
offsetALMA = input.float(defval=0.85, title='Offset for ALMA', minval=0, step=0.01)
scolor = input(false, title='Show coloured Bars to indicate Trend?')
delayOffset = input.int(defval=0, title='Delay Open/Close MA (Forces Non-Repainting)', minval=0, step=1)
tradeType = input.string('BOTH', title='What trades should be taken : ', options=['LONG', 'SHORT', 'BOTH', 'NONE'])
// === /INPUTS ===

// Constants colours that include fully non-transparent option.
green100 = #008000FF
lime100 = #00FF00FF
red100 = #FF0000FF
blue100 = #0000FFFF
aqua100 = #00FFFFFF
darkred100 = #8B0000FF
gray100 = #808080FF

// === BASE FUNCTIONS ===
// Returns MA input selection variant, default to SMA if blank or typo.
variant(type, src, len, offSig, offALMA) =>
    v1 = ta.sma(src, len)  // Simple
    v2 = ta.ema(src, len)  // Exponential
    v3 = 2 * v2 - ta.ema(v2, len)  // Double Exponential
    v4 = 3 * (v2 - ta.ema(v2, len)) + ta.ema(ta.ema(v2, len), len)  // Triple Exponential
    v5 = ta.wma(src, len)  // Weighted
    v6 = ta.vwma(src, len)  // Volume Weighted
    v7 = 0.0
    sma_1 = ta.sma(src, len)  // Smoothed
    v7 := na(v7[1]) ? sma_1 : (v7[1] * (len - 1) + src) / len
    v8 = ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))  // Hull
    v9 = ta.linreg(src, len, offSig)  // Least Squares
    v10 = ta.alma(src, len, offALMA, offSig)  // Arnaud Legoux
    v11 = ta.sma(v1, len)  // Triangular (extreme smooth)
    // SuperSmoother filter
    // ©️ 2013 John F. Ehlers
    a1 = math.exp(-1.414 * 3.14159 / len)
    b1 = 2 * a1 * math.cos(1.414 * 3.14159 / len)
    c2 = b1
    c3 = -a1 * a1
    c1 = 1 - c2 - c3
    v12 = 0.0
    v12 := c1 * (src + nz(src[1])) / 2 + c2 * nz(v12[1]) + c3 * nz(v12[2])
    type == 'EMA' ? v2 : type == 'DEMA' ? v3 : type == 'TEMA' ? v4 : type == 'WMA' ? v5 : type == 'VWMA' ? v6 : type == 'SMMA' ? v7 : type == 'HullMA' ? v8 : type == 'LSMA' ? v9 : type == 'ALMA' ? v10 : type == 'TMA' ? v11 : type == 'SSMA' ? v12 : v1

// security wrapper for repeat calls
reso(exp, use, res) =>
    security_1 = request.security(syminfo.tickerid, res, exp, gaps=barmerge.gaps_off, lookahead=barmerge.lookahead_on)
    use ? security_1 : exp

// === /BASE FUNCTIONS ===

// === SERIES SETUP ===
closeSeries = variant(basisType, close[delayOffset], basisLen, offsetSigma, offsetALMA)
openSeries = variant(basisType, open[delayOffset], basisLen, offsetSigma, offsetALMA)
// === /SERIES ===

// === PLOTTING ===

// Get Alternate resolution Series if selected.
closeSeriesAlt = reso(closeSeries, useRes, stratRes)
openSeriesAlt = reso(openSeries, useRes, stratRes)
//
trendColour = closeSeriesAlt > openSeriesAlt ? color.green : color.red
bcolour = closeSeries > openSeriesAlt ? lime100 : red100
barcolor(scolor ? bcolour : na, title='Bar Colours')
closeP = plot(closeSeriesAlt, title='Close Series', color=trendColour, linewidth=2, style=plot.style_line, transp=20)
openP = plot(openSeriesAlt, title='Open Series', color=trendColour, linewidth=2, style=plot.style_line, transp=20)
fill(closeP, openP, color=trendColour, transp=80)

// === /PLOTTING ===
//
//
// === ALERT conditions
xlong = ta.crossover(closeSeriesAlt, openSeriesAlt)
xshort = ta.crossunder(closeSeriesAlt, openSeriesAlt)
longCond = xlong  // alternative: longCond[1]? false : (xlong or xlong[1]) and close>closeSeriesAlt and close>=open
shortCond = xshort  // alternative: shortCond[1]? false : (xshort or xshort[1]) and close<closeSeriesAlt and close<=open
// === /ALERT conditions.

// === STRATEGY ===
// stop loss
slPoints = input.int(defval=0, title='Initial Stop Loss Points (zero to disable)', minval=0)
tpPoints = input.int(defval=0, title='Initial Target Profit Points (zero for disable)', minval=0)
// Include bar limiting algorithm
ebar = input.int(defval=10000, title='Number of Bars for Back Testing', minval=0)
dummy = input(false, title='- SET to ZERO for Daily or Longer Timeframes')
//
// Calculate how many mars since last bar
tdays = (timenow - time) / 60000.0  // number of minutes since last bar
tdays := timeframe.ismonthly ? tdays / 1440.0 / 5.0 / 4.3 / timeframe.multiplier : timeframe.isweekly ? tdays / 1440.0 / 5.0 / timeframe.multiplier : timeframe.isdaily ? tdays / 1440.0 / timeframe.multiplier : tdays / timeframe.multiplier  // number of bars since last bar
//
//set up exit parameters
TP = tpPoints > 0 ? tpPoints : na
SL = slPoints > 0 ? slPoints : na

// Make sure we are within the bar range, Set up entries and exit conditions
if (ebar == 0 or tdays <= ebar) and tradeType != 'NONE'
    strategy.entry('long', strategy.long, when=longCond == true and tradeType != 'SHORT')
    strategy.entry('short', strategy.short, when=shortCond == true and tradeType != 'LONG')
    strategy.close('long', when=shortCond == true and tradeType == 'LONG')
    strategy.close('short', when=longCond == true and tradeType == 'SHORT')
    strategy.exit('XL', from_entry='long', profit=TP, loss=SL)
    strategy.exit('XS', from_entry='short', profit=TP, loss=SL)

// === /STRATEGY ===
// eof


```

> Detail

https://www.fmz.com/strategy/435254

> Last Modified

2023-12-13 15:51:13
