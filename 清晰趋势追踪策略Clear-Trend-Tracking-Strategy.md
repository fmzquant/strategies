
> Name

清晰趋势追踪策略Clear-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过多种技术指标的结合,实现对趋势的清晰追踪。主要包含以下几个部分:

1. 基于均线的趋势判断
2. 基于随机指标的超买超卖判断
3. 基于价量指标的资金流动判断
4. 基于波动指标的趋势质量判断
5. 基于RSI指标的背离现象判断

## 原理

该策略首先通过均线判断价格的趋势方向。具体来说,是计算一定周期内的价格平均线,以及这条平均线的带状通道。价格突破通道则提示可能的趋势反转。

然后结合随机指标中的KD指标,判断价格是否处于超买或超卖状态。超买超卖状态往往预示着价格反转的机会。

接着利用成交量的信息,通过构建价格量指标判断资金的流入流出。量能上涨预示着资金流入和趋势发展,量能下跌则代表资金流出和趋势反转。

为了判断趋势的质量,利用平均价格波动范围构建市场数据指数,再计算其EMA来判断趋势的力量。这样可以过滤掉一些假趋势。

最后,RSI指标可用于发现价格和波动的背离,这也往往预示着即将发生的趋势反转。

综合这些指标的信息,可以比较清晰地判断价格趋势。策略会在均线发生黄金交叉时构建多头仓位,死叉时构建空头仓位。

## 优势

- 多指标综合判断,过滤噪音,使趋势判断更加清晰可靠
- 加入超买超卖判断,可以确定反转的时机点
- 量能指标判断资金流动,避免假突破
- 波动指标测量趋势质量,防止被小范围震荡误导 
- RSI背离提供额外的趋势反转信号
- 代码结构清晰,易于理解和修改

## 风险

- 多指标结合判断容易出现信号冲突,需要仔细调参
- 量能上涨也可能是资金游戏导致,需谨慎判断
- 部分指标如RSI对不同品种参数需要调整
- 细小范围震荡中容易产生错误信号
- 低效市场指标效果会打折扣

风险应对措施:

- 加强参数调优,确保指标正常工作
- 增加指标权重配置,处理信号冲突  
- 根据不同品种特点调整参数
- 加大持仓比例,降低频繁交易
- 采用实盘模拟验证效果

## 优化方向

该策略可以从以下几个方面进行优化:

1. 使用机器学习方法自动优化各项参数,使指标更符合不同品种特性

2. 增加模型评估模块,根据不同市场阶段动态调整各指标权重

3. 增加自适应止损策略,能够根据市场波动程度调整止损点

4. 结合深度学习提取更多特征,实现更精确的趋势判断

5. 开发自动信号调整模块,处理指标冲突和容易产生错误信号情况

6. 增加集成模型,整合更多技术指标判断,形成系统性预测结果

7. 探索无参指标,降低指标对参数的依赖性

## 总结

该策略通过集成多种技术指标的力量,比较全面地判断价格趋势,在趋势判断策略领域具有一定优势和应用前景。但仍需不断优化提高判断准确率,降低误判风险,才能在实盘中稳定运行。未来可以进一步引入机器学习等技术进行智能化升级。

||

## Overview

This strategy combines multiple technical indicators to achieve clear trend tracking. The main components are:

1. Trend judgement based on moving averages
2. Oversold/overbought analysis using stochastic oscillator  
3. Funds flow analysis with price & volume indicators
4. Trend quality measurement using volatility index
5. Divergence detection with RSI

By synthesizing signals from these indicators, the strategy can identify trends more precisely. It will go long when golden cross happens and go short when dead cross appears.

## Principle

Firstly, moving averages and their envelopes are used to determine the trend direction. Price breaking through the envelope may signal potential trend reversal. 

Secondly, KD lines from the stochastic oscillator are used to detect oversold/overbought conditions, which usually imply opportunities for reversal.

Then, price-volume indicators are constructed to analyze the funds flow. Rising volume represents capital inflow and trend continuation, while falling volume indicates capital outflow and trend reversal.

To quantify trend quality, a volatility index is built from average price range, and its EMA measures the strength of the trend. This helps filter out fake trends.

Finally, divergences between price and RSI may also indicate upcoming trend reversals. 

By combining all these signals, the trend can be identified more precisely. The strategy will go long when golden cross between MAs appears, and go short when dead cross happens.

## Advantages

- Noise reduction and clearer signals using multiple indicators
- Oversold/overbought analysis provides good reversal timing
- Volume analysis prevents false breakouts  
- Volatility index measures trend quality to avoid choppiness
- RSI divergence offers additional reversal signal
- Clean code structure, easy to understand and modify

## Risks

- Signal conflicts may occur when combining multiple indicators, requiring careful parameter tuning
- Rising volume could also be manipulated, prudent judgement needed
- RSI parameters may need adjustment for different products
- Whipsaws and wrong signals often occur during ranging markets
- Indicator performance may degrade in inefficient markets

Risk management:

- Enhance parameter optimization for proper indicator behaviors
- Configure indicator weighting to resolve conflicts
- Adjust parameters based on product characteristics
- Increase position sizing to reduce excessive trading
- Verify performance via backtesting and paper trading

## Optimizations

This strategy can be improved in the following aspects:

1. Use machine learning to auto-tune parameters for different products

2. Add model evaluation to dynamically adjust indicator weights based on market conditions

3. Implement adaptive stop loss based on market volatility

4. Incorporate deep learning for more accurate trend prediction  

5. Build auto signal reconciliation to resolve conflicts and reduce false signals

6. Integrate more indicators for ensemble system prediction

7. Explore parameterless indicators to reduce parameter dependence

## Conclusion

This strategy leverages multiple technical indicators to achieve relatively robust trend identification, with promising application potential. However, its accuracy and risk management need continuous improvements before stable live trading. Future optimizations may incorporate machine learning and other techniques to enable intelligent automation.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Channel Length|
|v_input_2|12|Average Length|
|v_input_3|60|Over Bought Level 1|
|v_input_4|53|Over Bought Level 2|
|v_input_5|-60|Over Sold Level 1|
|v_input_6|-53|Over Sold Level 2|
|v_input_7|-100|Over Sold Level 2|
|v_input_8|3|smoothKw|
|v_input_9|3|smoothDw|
|v_input_10|14|lengthRSIw|
|v_input_11|14|lengthStochw|
|v_input_12|true|Log|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|true|Show Divergences|
|v_input_15|false|Show Hidden Divergences|
|v_input_16|false|Show Divergences Channel|
|v_input_17|false|Use Average of both K & D|
|v_input_18|60|RSI+MFI Period|
|v_input_19|190|RSI+MFI Area multiplier|
|v_input_20|0|MFRSIMA: SMA|RMA|EMA|WMA|VWMA|
|v_input_21|60|Min Bearish RSI|
|v_input_22|40|Max Bullish RSI|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Market Cipher Update 2 - updated 8th Oct 2019

//Momentum Curves with green and red dots
strategy(title="MarketCipher B", shorttitle="MarketCipher B")
n1 = input(9, "Channel Length")
n2 = input(12, "Average Length")
obLevel1 = input(60, "Over Bought Level 1")
obLevel2 = input(53, "Over Bought Level 2")
osLevel1 = input(-60, "Over Sold Level 1")
osLevel2 = input(-53, "Over Sold Level 2")
osLevel3 = input(-100, "Over Sold Level 2")

 
ap = hlc3 
esa = ema(ap, n1)
d = ema(abs(ap - esa), n1)
ci = (ap - esa) / (0.015 * d)
tci = ema(ci, n2)
 
wt1 = tci
wt2 = sma(wt1,3)

plot(0, color=gray, title="Zero Line")
plot(obLevel1, color=red, style=3, title="Bottom")
plot(osLevel1, color=green, style=3, title="Top")
plot(wt1, color=#BFE4FF, style=4, title= "Lt Blue Wave")
plot(wt2, color=#673ab7, style=4, title="Blue Wave", transp=40)
plot(wt1-wt2, color=yellow, style=4, transp=40, title="wave1-wave2")

//green dots and crosses
plotshape(crossover(wt1, wt2) and osLevel1 ? wt2 : na, title="Pos Crossover", location=location.absolute, style=shape.cross, size=size.tiny, color=#3FFF00, transp=20)
plotshape(crossover(wt2, wt1) and osLevel1 ? wt1 : na, title="Neg Crossover", location=location.absolute, style=shape.cross, size=size.tiny, color=red, transp=20)
plotshape(crossover(wt1, wt2) and wt2 < -59 ? wt2 : na, title="Pos Crossover", location=location.bottom, style=shape.circle, size=size.tiny, color=#3FFF00, transp=20)
plotshape(crossover(wt2, wt1) and wt1 > 59 ? wt2 : na, title="Neg Crossover", location=location.top, style=shape.circle, size=size.tiny, color=red, transp=20)

buy= crossover(wt1,wt2) // Define our buy/sell conditions, using pine inbuilt functions.
sell= crossover(wt2,wt1)
ordersize=floor(strategy.equity/close) // To dynamically calculate the order size as the account equity increases or decreases.
strategy.entry("long",strategy.long,ordersize,when=buy) // Buys when buy condition met
strategy.close("long", when = sell ) // Closes position when sell condition met
strategy.entry("short",strategy.short,ordersize,when=sell)
strategy.close("short",when = buy )

//soch RSI with divergences
smoothKw = input(3, minval=1)
smoothDw = input(3, minval=1)
lengthRSIw = input(14, minval=1)
lengthStochw = input(14, minval=1)
uselogw = input(true, title="Log")
srcInw = input(close,  title="Source")
showdivsw = input(true, title="Show Divergences")
showhiddenw = input(false, title="Show Hidden Divergences")
showchanw = input(false, title="Show Divergences Channel")


srcw = uselogw ? log(srcInw) : srcInw
rsi1w = rsi(srcw, lengthRSIw)
kkw = sma(stoch(rsi1w, rsi1w, rsi1w, lengthStochw), smoothKw)
dw = sma(kkw, smoothDw)
hmw = input(false, title="Use Average of both K & D")
kw = hmw ? avg(kkw, dw) : kkw

aw = plot(kkw, color=blue, linewidth=1, transp=0, title="K")
bw = plot(dw, color=orange, linewidth=1, transp=0, title="D")
fw = kkw >= dw ? blue : orange
fill(aw, bw, title="KD Fill", color=white)


//------------------------------
//@RicardoSantos' Divergence Script

f_top_fractal(_src)=>_src[4] < _src[2] and _src[3] < _src[2] and _src[2] > _src[1] and _src[2] > _src[0]
f_bot_fractal(_src)=>_src[4] > _src[2] and _src[3] > _src[2] and _src[2] < _src[1] and _src[2] < _src[0]
f_fractalize(_src)=>f_top_fractal(_src) ? 1 : f_bot_fractal(_src) ? -1 : 0
//-------------------------
fractal_top = f_fractalize(kw) > 0 ? kw[2] : na
fractal_bot = f_fractalize(kw) < 0 ? kw[2] : na

high_prev = valuewhen(fractal_top, kw[2], 0)[2]
high_price = valuewhen(fractal_top, high[2], 0)[2]
low_prev = valuewhen(fractal_bot, kw[2], 0)[2]
low_price = valuewhen(fractal_bot, low[2], 0)[2]

regular_bearish_diva = fractal_top and high[2] > high_price and kw[2] < high_prev
hidden_bearish_diva = fractal_top and high[2] < high_price and kw[2] > high_prev
regular_bullish_diva = fractal_bot and low[2] < low_price and kw[2] > low_prev
hidden_bullish_diva = fractal_bot and low[2] > low_price and kw[2] < low_prev
//-------------------------
plot(showchanw?fractal_top:na, title="Top Div Channel", offset=-2, color=gray)
plot(showchanw?fractal_bot:na, title="Bottom Div Channel", offset=-2, color=gray)

col1 = regular_bearish_diva ? red : hidden_bearish_diva and showhiddenw ? red : na
col2 = regular_bullish_diva ? green : hidden_bullish_diva and showhiddenw ? green : na
col3 = regular_bearish_diva ? red : hidden_bearish_diva and showhiddenw ? red : showchanw ? gray : na
col4 = regular_bullish_diva ? green : hidden_bullish_diva and showhiddenw ? green : showchanw ? gray : na

plot(title='H F', series=showdivsw and fractal_top ? kw[2] : na, color=col1, linewidth=2, offset=-2)
plot(title='L F', series=showdivsw and fractal_bot ? kw[2] : na, color=col2, linewidth=2, offset=-2)
plot(title='H D', series=showdivsw and fractal_top ? kw[2] : na, style=circles, color=col3, linewidth=3, offset=-2)
plot(title='L D', series=showdivsw and fractal_bot ? kw[2] : na, style=circles, color=col4, linewidth=3, offset=-2)

plotshape(title='+RBD', series=showdivsw and regular_bearish_diva ? kw[2] : na, text='R', style=shape.labeldown, location=location.absolute, color=red, textcolor=white, offset=-2)
plotshape(title='+HBD', series=showdivsw and hidden_bearish_diva and showhiddenw ? kw[2] : na, text='H', style=shape.labeldown, location=location.absolute, color=red, textcolor=white, offset=-2)
plotshape(title='-RBD', series=showdivsw and regular_bullish_diva ? kw[2] : na, text='R', style=shape.labelup, location=location.absolute, color=green, textcolor=white, offset=-2)
plotshape(title='-HBD', series=showdivsw and hidden_bullish_diva  and showhiddenw ? kw[2] : na, text='H', style=shape.labelup, location=location.absolute, color=green, textcolor=white, offset=-2)


//money flow
colorRed = #ff0000
colorGreen = #03ff00

ma(matype, src, length) =>
    if matype == "RMA"
        rma(src, length)
    else
        if matype == "SMA"
            sma(src, length)
        else
            if matype == "EMA"
                ema(src, length)
            else
                if matype == "WMA"
                    wma(src, length)
                else
                    if matype == "VWMA"
                        vwma(src, length)
                    else
                        src

rsiMFIperiod = input(60, "RSI+MFI Period")
rsiMFIMultiplier = input(190, "RSI+MFI Area multiplier")
MFRSIMA = input(defval="SMA", title="MFRSIMA", options=["RMA", "SMA", "EMA", "WMA", "VWMA"])

candleValue = (close - open) / (high - low)
MVC = ma(MFRSIMA, candleValue, rsiMFIperiod)
color_area = MVC > 0 ? green : red

RSIMFIplot = plot(MVC * rsiMFIMultiplier, title="RSI+MFI Area", color=color_area, transp=35)
fill(RSIMFIplot, plot(0), color_area, transp=50)

//rsi
//Bullish Divergence (green triangle)
//Hidden Bullish Divergence (green circle)
//Bearish Divergence (red triangle)
//Hidden Bearish Divergence (red circle)

lend = 14
bearish_div_rsi = input(60, "Min Bearish RSI",  minval=50, maxval=100)
bullish_div_rsi = input(40, "Max Bullish RSI",  minval=0, maxval=50)

// RSI code
rsi = rsi(close, lend)
plot(rsi,  color=#6DFFE1, linewidth=2, transp=0, title="RSI")

// DIVS code
xbars = 60
hb = abs(highestbars(rsi, xbars)) // Finds bar with highest value in last X bars
lb = abs(lowestbars(rsi, xbars)) // Finds bar with lowest value in last X bars

// Defining variable values, mandatory in Pine 3
max = na
max_rsi = na
min = na
min_rsi = na
bearish_div = na
bullish_div = na
hidden_bearish_div = na
hidden_bullish_div = na
div_alert = na
hidden_div_alert = na

// If bar with lowest / highest is current bar, use it's value
max := hb == 0 ? close : na(max[1]) ? close : max[1]
max_rsi := hb == 0 ? rsi : na(max_rsi[1]) ? rsi : max_rsi[1]
min := lb == 0 ? close : na(min[1]) ? close : min[1]
min_rsi := lb == 0 ? rsi : na(min_rsi[1]) ? rsi : min_rsi[1]

// Compare high of current bar being examined with previous bar's high
// If curr bar high is higher than the max bar high in the lookback window range
if close > max // we have a new high
    max := close // change variable "max" to use current bar's high value
if rsi > max_rsi // we have a new high
    max_rsi := rsi // change variable "max_rsi" to use current bar's RSI value
if close < min // we have a new low
    min := close // change variable "min" to use current bar's low value
if rsi < min_rsi // we have a new low
    min_rsi := rsi // change variable "min_rsi" to use current bar's RSI value

// Detects divergences between price and indicator with 1 candle delay so it filters out repeating divergences
if (max[1] > max[2]) and (rsi[1] < max_rsi) and (rsi <= rsi[1]) and (rsi[1] >= bearish_div_rsi)
    bearish_div := true
	div_alert := true
if (min[1] < min[2]) and (rsi[1] > min_rsi) and (rsi >= rsi[1]) and (rsi[1] <= bullish_div_rsi)
    bullish_div := true
	div_alert := true
// Hidden divergences
if (max[1] < max[2]) and (rsi[1] < max_rsi)
	hidden_bearish_div := true
	hidden_div_alert := true
if (min[1] > min[2]) and (rsi[1] > min_rsi)
	hidden_bullish_div := true
	hidden_div_alert := true
// Alerts
alertcondition(div_alert, title='RSI Divergence', message='RSI Divergence')
alertcondition(hidden_div_alert, title='Hidden RSI Divergence', message='Hidden RSI Divergence')

// Plots divergences with offest
plotshape((bearish_div ? rsi[1] + 3 : na), location=location.absolute, style=shape.diamond, color=#ff0000, size=size.tiny, transp=0, offset=0, title="RSI Bear Div")
plotshape((bullish_div ? rsi[1] - 3 : na), location=location.absolute, style=shape.diamond, color=#00ff01, size=size.tiny, transp=0, offset=0, title="RSI Bull Div")
plotshape((hidden_bearish_div ? rsi[1] + 3 : na), location=location.absolute, style=shape.circle, color=#ff0000, size=size.tiny, transp=0, offset=0, title="RSI Bear hDiv")
plotshape((hidden_bullish_div ? rsi[1] - 3 : na), location=location.absolute, style=shape.circle, color=#00ff01, size=size.tiny, transp=0, offset=0, title="RSI Bull hDiv")


//wave divergences
WTCross = cross(wt1, wt2)
WTCrossUp = wt2 - wt1 <= 0
WTCrossDown = wt2 - wt1 >= 0
WTFractal_top = f_fractalize(wt1) > 0 and wt1[2] ? wt1[2] : na
WTFractal_bot = f_fractalize(wt1) < 0 and wt1[2] ? wt1[2] : na

WTHigh_prev  = valuewhen(WTFractal_top, wt1[2], 0)[2]
WTHigh_price = valuewhen(WTFractal_top, high[2], 0)[2]
WTLow_prev  = valuewhen(WTFractal_bot, wt1, 0)[2]
WTLow_price  = valuewhen(WTFractal_bot, low[2], 0)[2]

WTRegular_bearish_div = WTFractal_top and high[2] > WTHigh_price and wt1[2] < WTHigh_prev
WTRegular_bullish_div = WTFractal_bot and low[2] < WTLow_price and wt1[2] > WTLow_prev

bearWTSignal = WTRegular_bearish_div and WTCrossDown
bullWTSignal = WTRegular_bullish_div and WTCrossUp

WTCol1 = bearWTSignal ? #ff0000 : na
WTCol2 = bullWTSignal ? #00FF00EB : na

plot(series = WTFractal_top ? wt1[2] : na, title='Bearish Divergence', color=WTCol1, linewidth=5, transp=60)
plot(series = WTFractal_bot ? wt1[2] : na, title='Bullish Divergence', color=WTCol2, linewidth=5, transp=60)


//2nd wave
WTFractal_topa = f_fractalize(wt2) > 0 and wt2[2] ? wt2[2] : na
WTFractal_bota = f_fractalize(wt2) < 0 and wt2[2] ? wt2[2] : na

WTHigh_preva  = valuewhen(WTFractal_topa, wt2[2], 0)[2]
WTHigh_pricea = valuewhen(WTFractal_topa, high[2], 0)[2]
WTLow_preva  = valuewhen(WTFractal_bota, wt2, 0)[2]
WTLow_pricea  = valuewhen(WTFractal_bota, low[2], 0)[2]


WTRegular_bearish_diva = WTFractal_topa and high[2] > WTHigh_pricea and wt2[2] < WTHigh_preva
WTRegular_bullish_diva = WTFractal_bota and low[2] < WTLow_pricea and wt2[2] > WTLow_preva

bearWTSignala = WTRegular_bearish_diva and WTCrossDown
bullWTSignala = WTRegular_bullish_diva and WTCrossUp

WTCol1a = bearWTSignala ? #ff0000 : na
WTCol2a = bullWTSignala ? #00FF00EB : na

plot(series = WTFractal_topa ? wt2[2] : na, title='Bearish Divergence', color=WTCol1a, linewidth=5, transp=60)
plot(series = WTFractal_bota ? wt2[2] : na, title='Bullish Divergence', color=WTCol2a, linewidth=5, transp=60)

```

> Detail

https://www.fmz.com/strategy/428100

> Last Modified

2023-09-28 16:07:12
