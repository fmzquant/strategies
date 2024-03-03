
> Name

多时间周期过滤趋势跟踪策略Multiple-Timeframe-Filtered-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略通过合理运用移动平均线、相对强弱指数(RSI)、均线方向等多种技术指标,实现对趋势的精准判断。在双移动平均多空判断的基础上,增加了RSI指标的多空过滤,避免假突破。同时,通过不同周期均线的联合观察,可有效识别趋势方向。策略优化空间大,可适用于不同品种和周期。

## 策略原理

本策略主要基于以下技术指标运作:

1. 双移动平均线:快速移动均线和慢速移动均线的金叉看涨,死叉看跌。本策略中采用EMA指标计算移动平均线。

2. RSI指标:RSI高位回落看跌机会,低位回升看涨机会。本策略中采用RSI指标的多空逻辑进行趋势过滤。

3. 均线方向:长线与短线的方向对比,可以判断趋势。本策略中采用200周期EMA判断长线方向。

交易逻辑如下:

1. 快速EMA上穿慢速EMA,做多;快速EMA下穿慢速EMA,做空。

2. RSI指标高位回落 Adds做空机会,低位回升Adds做多机会。

3. 仅在长线(200日EMA)方向一致时入场,如长线上涨只做多,长线下跌只做空。

4. 采用止盈止损Exit策略。

## 优势分析

本策略具有以下优势:

1. 多种技术指标联合使用,可有效确认趋势方向,减少假突破operationopportunities。

2. 增加RSI指标的多空过滤,可避免趋势反转的whipsaw。

3. 采用短中长线趋势判断,可提高entry的时间性和方向性。 

4. Stop loss设定了风险控制措施,可控制单笔损失。

5. 可调整参数实现多周期适应性,适合不同交易品种。

## 风险分析

本策略也存在一定的风险:

1. 大趋势市场中,短期调整可能触发止损。可适当放宽止损范围,或采用移动止损追踪止损。

2. 震荡趋势中,假突破可能导致亏损。可适当加大RSI参数的过滤区间,或采用Donchian通道等指标进行辅助。

3. 参数优化不当可能导致过于频繁交易,需要针对不同品种谨慎测试优化参数。

4. 本策略仅基于技术指标交易,需结合基本面分析确定大趋势方向。

## 优化方向

本策略可从以下几个方面进行优化:

1. 调整移动平均线周期,适应不同周期行情。

2. 优化RSI的参数,改进多空选择的准确性。

3. 测试添加Bollinger Bands, Keltner Channels等指标,提高突破的成功率。

4. 尝试将止损改为移动止损或атель止损,以更好跟踪趋势。

5. 研究在趋势较弱时采用范围突破操作,降低误交易概率。

6. 根据不同品种特点,设定合理的止盈止损数值,控制风险。

7. 添加交易量控制,避免单笔投入过大。

## 总结

本策略总体思路清晰、易于实施,在参数优化后可适用于多种品种和周期,具有较强的跟踪趋势能力。但需要注意控制风险,防止在震荡行情中被套。可根据行情特点和个人偏好,对策略进行定制化优化。

||


## Overview

This strategy accurately judges the trend by reasonably applying moving averages, relative strength index (RSI), moving average directions and other technical indicators. Based on the long and short judgment of double moving averages, RSI indicators are added for long and short filtering to avoid false breakouts. Meanwhile, the trend direction can be effectively identified by jointly observing moving averages of different cycles. The strategy has large optimization space and can be applied to different trading varieties and cycles.

## Strategy Principle 

The strategy mainly operates based on the following technical indicators:

1. Double moving average: Golden cross of fast and slow moving averages indicates long signal, while death cross means short signal. EMA is used to calculate moving averages in this strategy.

2. RSI indicator: Decline from high RSI levels suggests short opportunities, while rebound from low levels suggests long opportunities. RSI logic is used for trend filtering in this strategy.

3. Moving average direction: Comparing directions of long and short moving averages can determine the trend. 200-period EMA is used to determine the long-term direction in this strategy.

The trading logic is as follows:

1. Go long when fast EMA crosses above slow EMA, and go short when fast EMA crosses below slow EMA. 

2. Decline from high RSI levels adds short opportunities, while rebound from low levels adds long opportunities.

3. Only enter trades in the direction consistent with the long-term trend (200-day EMA), i.e. only go long in uptrend and short in downtrend.

4. Use take profit and stop loss to exit positions.

## Advantage Analysis

The advantages of this strategy include:

1. The combination of multiple technical indicators helps confirm the trend direction and reduce false breakout opportunities.

2. Adding RSI filter avoids whipsaws when the trend reverses.

3. Using short, medium and long-term trends helps improve the timeliness and directionality of entry.

4. The stop loss setting provides risk control to limit the loss for a single trade.

5. Adjustable parameters allow adaptability to multi-timeframe trading for different products.

## Risk Analysis

There are also some risks in this strategy:

1. Stop loss may be triggered by short-term pullbacks in a strong trend. Wider stop loss range or moving/trailing stop loss could be used.

2. False breakouts in range-bound market may lead to losses. Wider RSI filtering range or additional indicators like Donchian Channels could help.

3. Improper parameter optimization may lead to over-trading. Careful testing and optimization are needed for different products. 

4. This strategy relies solely on technicals. Fundamental analysis is needed to determine the major trend.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Adjust moving average periods to adapt to different market cycles.

2. Optimize RSI parameters to improve the accuracy of long/short selection. 

3. Test additional indicators like Bollinger Bands and Keltner Channels to improve breakout success rate.

4. Experiment with moving or trailing stop loss to better track the trend.

5. Study range breakout operations to reduce false signals when trend is weak.

6. Set reasonable stop loss and take profit values based on product characteristics to control risks.

7. Add trade size control to avoid oversized single bets.

## Summary

The strategy has clear logic and is easy to implement. With proper parameter tuning, it can be applied to various products and cycles with strong trend following capacity. Risk control is important to avoid being trapped in range-bound markets. Customized optimizations can be done based on market conditions and personal preferences.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|Fast MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|14|Fast MA Period|
|v_input_3_open|0|Slow MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|21|Slow MA Period|
|v_input_5|false|Invert Trade Direction?|
|v_input_6|100000000|Take Profit|
|v_input_7|5000|Stop Loss|
|v_input_8|1000|Trailing Stop Loss|
|v_input_9|false|Trailing Stop Loss Offset|
|v_input_10_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|12|MACD fast moving average|
|v_input_12|26|MACD slow moving average|
|v_input_13|9|MACD signal line moving average|
|v_input_14|200|Very slow moving average|
|v_input_15|true|Enable Bar Color?|
|v_input_16|true|Enable Moving Averages?|
|v_input_17|true|Enable Background Color?|
|v_input_18|5|Period|
|v_input_19|74|RSI Overbought|
|v_input_20|24|RSI Oversold|
|v_input_21|20|length|
|v_input_22|2|mult|
|v_input_23|9|turningPeriods|
|v_input_24|26|standardPeriods|
|v_input_25|52|leadingSpan2Periods|
|v_input_26|26|displacement|
|v_input_27|false|Show PPO peak/trough triangles?|
|v_input_28|true|Use long term divergences?|
|v_input_29|55|Lookback Period|
|v_input_30|12|PPO Fast|
|v_input_31|26|PPO Slow|
|v_input_32|9|PPO Signal|
|v_input_33|2|PPO Smooth|
|v_input_34|100|Period|
|v_input_35|60|Doji, Min % of Range of Candle for Wicks|
|v_input_36|false|Doji, Previous Candle Min Pip Body Size|
|v_input_37|true|Show Price Action Bar Names|
|v_input_38|false|Highlight Harami & Doji Bars|
|v_input_39|false|Show Only Harami Style Doji's|
|v_input_40|true|Generate Alert for Harami & Doji Bars|
|v_input_41|true|Use Heikin Ashi Candles for Calculations|
|v_input_42|3|Doji, Number of Lookback Bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Nostradamus by Wicksell 2.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// MACD + EMA 200 *** estratégia de compra e venda (RSI, EMA, SMA) *** Doji Harami *** sobrecompra e sobrevenda *** Direção de tendência *** Divergência *** Ichimoku


// === Entradas gerais ===
// Curto
maFastSource   = input(defval = open, title = "Fast MA Source")
maFastLength   = input(defval = 14, title = "Fast MA Period", minval = 1)
// long ma
maSlowSource   = input(defval = open, title = "Slow MA Source")
maSlowLength   = input(defval = 21, title = "Slow MA Period", minval = 1)

// === Entradas relacionado a estratégia ===
tradeInvert     = input(defval = false, title = "Invert Trade Direction?")
// Entrada de riscos
inpTakeProfit   = input(defval = 100000000, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 5000, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 1000, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)

// === Valores de gerenciamento de riscos ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === Configurações de série ===
/// 
maFast = ema(maFastSource, maFastLength)
maSlow = ema(maSlowSource, maSlowLength)


// === Lógica ===
// is fast ma above slow ma?
aboveBelow = maFast >= maSlow ? true : false
// are we inverting our trade direction?
tradeDirection = tradeInvert ? aboveBelow ? false : true : aboveBelow ? true : false




// MACD + EMA 200



// Input
source = input(close)
fastLength = input(12, minval=1, title="MACD fast moving average")
slowLength=input(26,minval=1, title="MACD slow moving average")
signalLength=input(9,minval=1, title="MACD signal line moving average")
veryslowLength=input(200,minval=1, title="Very slow moving average")
switch1=input(true, title="Enable Bar Color?")
switch2=input(true, title="Enable Moving Averages?")
switch3=input(true, title="Enable Background Color?")

// Calculation
fastMA = sma(source, fastLength)
slowMA = sma(source, slowLength)
veryslowMA = sma(source, veryslowLength)
macd = fastMA - slowMA
signal = sma(macd, signalLength)
hist = macd - signal

// Colors
MAtrendcolor = change(veryslowMA) > 0 ? green : red
trendcolor = fastMA > slowMA and change(veryslowMA) > 0 and close > slowMA ? green : fastMA < slowMA and change(veryslowMA) < 0 and close < slowMA ? red : blue
bartrendcolor = close > fastMA and close > slowMA and close > veryslowMA and change(slowMA) > 0 ? green : close < fastMA and close < slowMA and close < veryslowMA and change(slowMA) < 0 ? red : blue
backgroundcolor = slowMA > veryslowMA and crossover(hist, 0) and macd > 0 and fastMA > slowMA and close[slowLength] > veryslowMA ? green : slowMA < veryslowMA and crossunder(hist, 0) and macd < 0 and fastMA < slowMA and close[slowLength] < veryslowMA ? red : na
bgcolor(switch3?backgroundcolor:na,transp=80)
barcolor(switch1?bartrendcolor:na)

// Output
F=plot(switch2?fastMA:na,color=trendcolor)
W=plot(switch2?slowMA:na,color=trendcolor,linewidth=2)
V=plot(switch2?veryslowMA:na,color=MAtrendcolor,linewidth=4)
fill(F,V,color=gray)


// estratégia de compra e venda wicksell


// Estratégia longo 
longEntry() => rsi(close, 2) <= 20 and close >= sma(close, 200) and ema(close, 20)
longExit() => ema(close, 80) and rsi(close, 2) >= 80


strategy.entry(id = "Compra", long = true, when = longEntry())
strategy.close(id = "Compra", when = longExit())
strategy.exit("Feche a ordem", from_entry = "Venda", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)

// Estratégia curta
shortEntry() => rsi(close, 2) >= 80 and close <= sma(close, 200) and ema(close, 80)
shortExit() => low <= ema(close, 20) and rsi(close, 2) <= 10


strategy.entry(id = "Venda", long = false, when = shortEntry())
strategy.close(id = "Venda", when = shortExit())
strategy.exit("feche a ordem", from_entry = "Compra", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)




// Sobrecompra e Sobrevenda



backtime = input(title='Period',  defval=5)
overbought = input(title='RSI Overbought',  defval=74)
oversold = input(title='RSI Oversold',  defval=24)

calcSpread(k) =>
    ((high[k] - low[k]) / high[k])*100

isOversold(k) =>
    key = k <= 1 ? 0 : k - 1
    rsi(close[k], backtime) <= oversold and volume[k] >= volume[key]

isOverbought(k) =>
    key = k <= 1 ? 0 : k - 1
    rsi(close[k], backtime) >= overbought and volume[k] >= volume[key]

plotshape(isOverbought(1) and isOverbought(0), style=shape.labeldown, location=location.abovebar, color=#ff0000)
plotshape(isOversold(1) and isOversold(0), style=shape.labelup, location=location.belowbar, color=green)


// Bandas

// Script created by JoinFree
// BollingerBands added for reference
// Buy Long when you see a Green colour bar 
// Sell Short when you see a Red colour bar
mysignal = ema(close, 12) - ema(close, 26)
barcolor(mysignal[0] > mysignal[1] ? green : red)
length = input(20, minval=1), mult = input(2.0, minval=0.001, maxval=50)
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev
p1 = plot(upper, color=white)
p2 = plot(lower, color=white)
fill(p1, p2)



// Padrão candle


delta = close - open
gap = open - close[1]
is_up = delta >= 0
high_len = is_up ? high - close : high - open
low_len = is_up ? open - low : close - low
mod_delta = delta<0 ? -delta:delta
avg_mod = (mod_delta + mod_delta[1] + mod_delta[2] + mod_delta[3] + mod_delta[4] + mod_delta[5] + mod_delta[6] + mod_delta[7] + mod_delta[8] + mod_delta[9])/10

// ENGULF
is_bearish_engulf = -delta > delta[1]*2 and delta[1] > 0 and delta < 0 and delta[2] > 0
is_bullish_engulf = delta > -delta[1]*2 and delta[1] < 0 and delta > 0 and delta[2] < 0
plotshape(is_bearish_engulf, style=shape.triangledown, location=location.abovebar, color=white, title='bearish_englf')
plotshape(is_bearish_engulf, style=shape.triangledown, location=location.abovebar, color=white, title='bearish_englf')
plotshape(is_bullish_engulf, style=shape.triangleup, location=location.belowbar, color=yellow, title='bullish_englf')

// DOJI
is_doji_up = delta*10 < mod_delta and (high-low) > mod_delta*10 and delta[1] < 0
is_doji_down = delta*10 < mod_delta and (high-low) > mod_delta*10 and delta[1] > 0
plotshape(is_doji_down, style=shape.triangledown, location=location.abovebar, color=white, title='doji_down')
plotshape(is_doji_down, style=shape.triangledown, location=location.abovebar, color=white, title='doji_down')
plotshape(is_doji_up, style=shape.triangleup, location=location.belowbar, color=yellow, title='doji_up')

// DOJI DRAGONFLY
is_doji_dr_up = delta*10 < mod_delta and low_len*10 < mod_delta and high_len > mod_delta*5 and delta[1] < 0
is_doji_dr_down = delta*10 < mod_delta and high_len*10 < mod_delta and low_len > mod_delta*5 and delta[1] > 0
plotshape(is_doji_dr_down, style=shape.triangledown, location=location.abovebar, color=white, title='doji_dr_down')
plotshape(is_doji_dr_down, style=shape.triangledown, location=location.abovebar, color=white, title='doji_dr_down')
plotshape(is_doji_dr_up, style=shape.triangleup, location=location.belowbar, color=yellow, title='doji_dr_up')

// 3 SAME TICK
same_up = delta > mod_delta*2 and delta[1] > mod_delta[1]*2 and delta[2] > mod_delta[2]*2 and is_up 
same_down = delta*2 < mod_delta and (high-low) > mod_delta*10 and delta[1] > 0
plotshape(same_down, style=shape.triangledown, location=location.abovebar, color=white, title='3_same_down')
plotshape(same_down, style=shape.triangledown, location=location.abovebar, color=white, title='3_same_down')
plotshape(same_up, style=shape.triangleup, location=location.belowbar, color=yellow, title='3_same_up', offset=2)
plotshape(same_up, style=shape.triangleup, location=location.belowbar, color=yellow, title='3_same_up')
plotshape(same_up, style=shape.triangleup, location=location.belowbar, color=yellow, title='3_same_up', offset=1)

// ichimoku

turningPeriods = input(9, minval=1), standardPeriods = input(26, minval=1)
leadingSpan2Periods = input(52, minval=1), displacement = input(26, minval=1)
donchian(len) => avg(lowest(len), highest(len))
turning = donchian(turningPeriods)
standard = donchian(standardPeriods)
leadingSpan1 = avg(turning, standard)
leadingSpan2 = donchian(leadingSpan2Periods)
 
plot(turning, title = 'Tenkan-Sen (9 Period)', linewidth=4, color=white)
plot(standard, title = 'Kinjun-Sen (26 Period)', linewidth=4, color=orange)

 
spanColor = leadingSpan1>=leadingSpan2 ? lime : red

p3 = plot(leadingSpan1, title = 'Senkou Span A (26 Period)', linewidth=4, offset = displacement, color=spanColor)
p4 = plot(leadingSpan2, title = 'Senkou Span B (52 Period)', linewidth=4, offset = displacement, color=spanColor)
 
fill(p3, p4, color=silver, transp=40, title='Kumo (Cloud)')




// direção de tendência



//izole dip - Isolated Bottom
d02=low
d12=low[1]
izdip2=low[2]
d32=low[3]
d42=low[4]
h32=high[3]
h22=high[2]

//izole tepe - Isolated Peak
t02=high
t12=high[1]
iztepe2=high[2]
t32=high[3]
t42=high[4]
L32=low[3]
L22=low[2]



izotepe1=iff((iztepe2>t02 and iztepe2>=t12 and iztepe2>t32 and iztepe2>t42 and low[1]>min(L32,L22) and low<min(L32,L22)),-1,na)
izotepe2=iff(t12>t02 and t12>iztepe2 and t12>t32 and low<min(L22,low[1]),-2,na)

izodip1=iff((izdip2<d02 and izdip2<d12 and izdip2<d32 and izdip2<d42 and high[1]<max(h32,h22) and high>max(h32,h22)),1,na)
izodip2=iff(d12<d02 and d12<izdip2 and d12<d32 and high>max(h22,high[1]),1,na)


plotarrow(izotepe1, colordown=white, offset = -2, transp=60)
plotarrow(izotepe2, colordown=white, offset = -1, transp=60)
plotarrow(izodip1, colorup=yellow, offset = -2, transp=40)
plotarrow(izodip2, colorup=yellow, offset = -1, transp=40)




// detector de divergência



//@version=2
//Credit to https://www.tradingview.com/script/p3oqCa56-Pekipek-s-PPO-Divergence-BETA/ (I just changed the visuals and added alerts)


topbots = input(false, title="Show PPO peak/trough triangles?")
long_term_div = input(true, title="Use long term divergences?")
div_lookback_period = input(55, minval=1, title="Lookback Period")
fastLength1 = input(12, minval=1, title="PPO Fast")
slowLength1=input(26, minval=1, title="PPO Slow")
signalLength1=input(9,minval=1, title="PPO Signal")
smoother = input(2,minval=1, title="PPO Smooth")
fastMA1 = ema(source, fastLength1)
slowMA1 = ema(source, slowLength1)
macd3 = fastMA1 - slowMA1
macd4=(macd3/slowMA1)*100
d = sma(macd4, smoother) // smoothing PPO
 
bullishPrice = low 

priceMins = bullishPrice > bullishPrice[1] and bullishPrice[1] < bullishPrice[2] or low[1] == low[2] and low[1] < low and low[1] < low[3] or low[1] == low[2] and low[1] == low[3] and low[1] < low and low[1] < low[4] or low[1] == low[2] and low[1] == low[3] and low[1] and low[1] == low[4] and low[1] < low and low[1] < low[5] // this line identifies bottoms and plateaus in the price
oscMins= d > d[1] and d[1] < d[2] // this line identifies bottoms in the PPO

BottomPointsInPPO = oscMins

bearishPrice = high
priceMax = bearishPrice < bearishPrice[1] and bearishPrice[1] > bearishPrice[2] or high[1] == high[2] and high[1] > high and high[1] > high[3] or high[1] == high[2] and high[1] == high[3] and high[1] > high and high[1] > high[4] or high[1] == high[2] and high[1] == high[3] and high[1] and high[1] == high[4] and high[1] > high and high[1] > high[5]  // this line identifies tops in the price
oscMax = d < d[1] and d[1] > d[2]   // this line identifies tops in the PPO

TopPointsInPPO = oscMax

currenttrough4=valuewhen (oscMins, d[1], 0) // identifies the value of PPO at the most recent BOTTOM in the PPO
lasttrough4=valuewhen (oscMins, d[1], 1) // NOT USED identifies the value of PPO at the second most recent BOTTOM in the PPO
currenttrough5=valuewhen (oscMax, d[1], 0) // identifies the value of PPO at the most recent TOP in the PPO
lasttrough5=valuewhen (oscMax, d[1], 1) // NOT USED identifies the value of PPO at the second most recent TOP in the PPO

currenttrough6=valuewhen (priceMins, low[1], 0) // this line identifies the low (price) at the most recent bottom in the Price
lasttrough6=valuewhen (priceMins, low[1], 1) // NOT USED this line identifies the low (price) at the second most recent bottom in the Price
currenttrough7=valuewhen (priceMax, high[1], 0) // this line identifies the high (price) at the most recent top in the Price
lasttrough7=valuewhen (priceMax, high[1], 1) // NOT USED this line identifies the high (price) at the second most recent top in the Price

delayedlow = priceMins and barssince(oscMins) < 3 ? low[1] : na
delayedhigh = priceMax and barssince(oscMax) < 3 ? high[1] : na

// only take tops/bottoms in price when tops/bottoms are less than 5 bars away
filter = barssince(priceMins) < 5 ? lowest(currenttrough6, 4) : na
filter2 = barssince(priceMax) < 5 ? highest(currenttrough7, 4) : na

//delayedbottom/top when oscillator bottom/top is earlier than price bottom/top
y11 = valuewhen(oscMins, delayedlow, 0)
y12 = valuewhen(oscMax, delayedhigh, 0)

// only take tops/bottoms in price when tops/bottoms are less than 5 bars away, since 2nd most recent top/bottom in osc
y2=valuewhen(oscMax, filter2, 1) // identifies the highest high in the tops of price with 5 bar lookback period SINCE the SECOND most recent top in PPO
y6=valuewhen(oscMins, filter, 1) // identifies the lowest low in the bottoms of price with 5 bar lookback period SINCE the SECOND most recent bottom in PPO

long_term_bull_filt = valuewhen(priceMins, lowest(div_lookback_period), 1)
long_term_bear_filt = valuewhen(priceMax, highest(div_lookback_period), 1)

y3=valuewhen(oscMax, currenttrough5, 0) // identifies the value of PPO in the most recent top of PPO 
y4=valuewhen(oscMax, currenttrough5, 1) // identifies the value of PPO in the second most recent top of PPO 

y7=valuewhen(oscMins, currenttrough4, 0) // identifies the value of PPO in the most recent bottom of PPO
y8=valuewhen(oscMins, currenttrough4, 1) // identifies the value of PPO in the SECOND most recent bottom of PPO

y9=valuewhen(oscMins, currenttrough6, 0)
y10=valuewhen(oscMax, currenttrough7, 0)

bulldiv= BottomPointsInPPO ? d[1] : na // plots dots at bottoms in the PPO
beardiv= TopPointsInPPO ? d[1]: na // plots dots at tops in the PPO

i = currenttrough5 < highest(d, div_lookback_period) // long term bearish oscilator divergence
i2 = y10 > long_term_bear_filt // long term bearish top divergence
i3 = delayedhigh > long_term_bear_filt // long term bearish delayedhigh divergence

i4 = currenttrough4 > lowest(d, div_lookback_period) // long term bullish osc divergence
i5 = y9 < long_term_bull_filt // long term bullish bottom div
i6 = delayedlow < long_term_bull_filt // long term bullish delayedbottom div

//plot(0, color=gray)
//plot(d, color=black)
//plot(bulldiv, title = "Bottoms", color=maroon, style=circles, linewidth=3, offset= -1)
//plot(beardiv, title = "Tops", color=green, style=circles, linewidth=3, offset= -1)


bearishdiv1 = (y10 > y2 and oscMax and y3 < y4) ? true : false
bearishdiv2 = (delayedhigh > y2 and y3 < y4) ? true : false
bearishdiv3 = (long_term_div and oscMax and i and i2) ? true : false
bearishdiv4 = (long_term_div and i and i3) ? true : false

bullishdiv1 = (y9 < y6 and oscMins and y7 > y8) ? true : false
bullishdiv2 = (delayedlow < y6 and y7 > y8) ? true : false
bullishdiv3 = (long_term_div and oscMins and i4 and i5) ? true : false
bullishdiv4 = (long_term_div and i4 and i6) ? true : false

bearish = bearishdiv1 or bearishdiv2 or bearishdiv3 or bearishdiv4
bullish = bullishdiv1 or bullishdiv2 or bullishdiv3 or bullishdiv4
 
greendot = beardiv != 0 ? true : false
reddot = bulldiv != 0 ? true : false


plotshape(bearish ? d : na, text='▼\nP', style=shape.labeldown, location=location.abovebar, color=maroon, textcolor=white, offset=0)
plotshape(bullish ? d : na, text='P\n▲', style=shape.labelup, location=location.belowbar, color=green, textcolor=white, offset=0)
plotshape(topbots and greendot ? d : na, text='', style=shape.triangledown, location=location.abovebar, color=maroon, offset=-1)
plotshape(topbots and reddot ? d : na, text='', style=shape.triangleup, location=location.belowbar, color=green, offset=-1)

//barcolor(bearishdiv1 or bearishdiv2 or bearishdiv3 or bearishdiv4 ? orange : na)
//barcolor(bullishdiv1 or bullishdiv2 or bullishdiv3 or bullishdiv4 ? fuchsia : na)
//barcolor(#dedcdc)



// compra e venda por ema



r7=input(100, title="Period",  minval=1)
b7=ema(close,r7)
buy7=close>b7 and low<=b7 and open>b7 or open<b7 and close>b7
sell7=close<b7 and high>=b7 and open<b7 or open>b7 and close<b7
plotshape(buy7, color=green, location=location.belowbar, style=shape.arrowup, transp=10, text="Buy")
plotshape(sell7, color=red, location=location.abovebar, style=shape.arrowdown, transp=10, text="Sell")



// doji harami


pctDw = input(60,minval=0,maxval=90,title="Doji, Min % of Range of Candle for Wicks")
pipMin= input(0,minval=0,title="Doji, Previous Candle Min Pip Body Size")
sname=input(true,title="Show Price Action Bar Names")
cbar = input(false,title="Highlight Harami & Doji Bars")
sHm    = input(false,title="Show Only Harami Style Doji's")
setalm = input(true, title="Generate Alert for Harami & Doji Bars")
uha   =input(true, title="Use Heikin Ashi Candles for Calculations")
bars = input(3,minval=1,maxval=3,step=1, title="Doji, Number of Lookback Bars")
//
// Use only Heikinashi Candles for all calculations
srcclose = uha ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
srcopen = uha ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
srchigh = uha ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
srclow = uha ?security(heikinashi(syminfo.tickerid), timeframe.period, low) : low

//
pip = syminfo.mintick
range = srchigh - srclow


// Calculate Doji/Harami Candles
pctCDw = (pctDw/2) * 0.01
pctCDb = (100-pctDw) * 0.01

//Lookback Candles for bulls or bears
lbBull = bars==1? srcopen[1]>srcclose[1]: bars==2? (srcopen[1]>srcclose[1] and srcopen[2]>srcclose[2]): bars==3?(srcopen[1]>srcclose[1] and srcopen[2]>srcclose[2] and srcopen[3]>srcclose[3]):false
lbBear = bars==1? srcopen[1]<srcclose[1]: bars==2? (srcopen[1]<srcclose[1] and srcopen[2]<srcclose[2]): bars==3?(srcopen[1]<srcclose[1] and srcopen[2]<srcclose[2] and srcopen[3]<srcclose[3]):false

//Lookback Candle Size only if mininum size is > 0
lbSize = pipMin==0? true : bars==1 ? (abs(srcopen[1]-srcclose[1])>pipMin*pip) :
  bars==2 ? (abs(srcopen[1]-srcclose[1])>pipMin*pip and abs(srcopen[2]-srcclose[2])>pipMin*pip) :
  bars==3 ? (abs(srcopen[1]-srcclose[1])>pipMin*pip and abs(srcopen[2]-srcclose[2])>pipMin*pip and abs(srcopen[3]-srcclose[3])>pipMin*pip) :
  false

dojiBu = (srcopen[1] >= max(srcclose,srcopen) and srcclose[1]<=min(srcclose,srcopen)) and lbSize and
  (abs(srcclose-srcopen)<range*pctCDb and (srchigh-max(srcclose,srcopen))>(pctCDw*range) and (min(srcclose,srcopen)-srclow)>(pctCDw*range))? 1 : 0

dojiBe = (srcclose[1] >= max(srcclose,srcopen) and srcopen[1]<=min(srcclose,srcopen)) and lbSize and
  (abs(srcclose-srcopen)<range*pctCDb and (srchigh-max(srcclose,srcopen))>(pctCDw*range) and (min(srcclose,srcopen)-srclow)>(pctCDw*range))? 1 : 0
  
haramiBull = (srcopen<=srcclose or (max(srcclose,srcopen)-min(srcclose,srcopen))<pip*0.5) and lbBull and dojiBu
haramiBear = (srcopen>=srcclose or (max(srcclose,srcopen)-min(srcclose,srcopen))<pip*0.5) and lbBear and dojiBe

dojiBull = not sHm and not haramiBull and not haramiBear and lbBull and dojiBu
dojiBear = not sHm and not haramiBull and not haramiBear and lbBear and dojiBe

//
plotshape(haramiBear and sname?srchigh:na,title="Bearish Harami",text='Bearish\nHarami',color=red, style=shape.arrowdown,location=location.abovebar)
plotshape(haramiBear and cbar?max(srcopen,srcclose):na,title="Bear Colour Harami",color=red, style=shape.circle,location=location.absolute,size=size.normal)
//
plotshape(haramiBull and sname?srclow:na,title="Bullish Harami",text='Bullish\nHarami',color=green, style=shape.arrowup,location=location.belowbar)
plotshape(haramiBull and cbar?max(srcopen,srcclose):na,title="Bull Colour Harami",color=green, style=shape.circle,location=location.absolute,size=size.normal)
//
plotshape(dojiBear and sname?srchigh:na,title="Bearish Doji",text='Bearish\nDoji',color=fuchsia, style=shape.arrowdown,location=location.abovebar)
plotshape(dojiBear and cbar?max(srcopen,srcclose):na,title="Bear Colour Doji",color=fuchsia, style=shape.circle,location=location.absolute,size=size.normal)
//
plotshape(dojiBull and sname?srclow:na,title="Bullish Doji",text='Bullish\nDoji',color=aqua, style=shape.arrowup,location=location.belowbar)
plotshape(dojiBull and cbar?max(srcopen,srcclose):na,title="Bull Colour Doji",color=aqua, style=shape.circle,location=location.absolute,size=size.normal)

// Only Alert harami Doji's
bcolor = haramiBull ? 1 : haramiBear ? 2 : dojiBull ? 3 : dojiBear ? 4 : 0
baralert = setalm and bcolor>0
alertcondition(baralert,title="PACDOJI Alert",message="PACDOJI Alert")

//
plotshape(na(baralert[1])?na:baralert[1], transp=0,style=shape.circle,location=location.bottom, offset=-1,title="Bar Alert Confirmed", 
  color=bcolor[1]==1 ? green : bcolor[1]==2? red : bcolor[1]==3? aqua : bcolor[1]==4? fuchsia : na)

//
```

> Detail

https://www.fmz.com/strategy/427928

> Last Modified

2023-09-26 20:36:57
