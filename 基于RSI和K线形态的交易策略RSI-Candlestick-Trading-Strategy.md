
> Name

基于RSI和K线形态的交易策略RSI-Candlestick-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略结合了相对强弱指数(RSI)指标和K线形态模式,在RSI达到超买超卖区域时,识别特定的K线形态作为入场信号,实现趋势跟踪。

## 策略原理

1. 计算RSI指标的值,以30为超卖线,70为超买线。

2. 在RSI上穿30时看做超卖信号,在RSI下穿70时看做超买信号。

3. 在上述信号出现时,判断当前K线或前一根K线是否形成白色/黑色实体、锤头/吊颈线等特定形态。

4. 如果同时满足RSI信号和K线形态条件,则产生买入/卖出信号。

5. 对应的,如果形成多头形态如锤头线等,在RSI超卖时买入;如果形成空头形态如射击星等,在RSI超买时卖出。

6. 识别出双线形态、三线形态等较复杂的组合Candlestick模式,作为入场信号。

7. RSI回穿中线也作为平仓信号。

## 策略优势

1. 结合指标和形态,过滤假信号,提高入场的准确性。

2. 识别K线形态,能捕捉较明显的趋势转折点。

3. 利用RSI的超买超卖区域发出信号,增加获利机会。

4. 识别双三线形态组合,能抓住趋势较强的转折点。

5. RSI回穿中线作为止损/止盈信号,有利锁定盈利。

## 策略风险

1. RSI指标存在滞后,可能错过转折点。

2. 部分K线形态信号较弱,可能存在虚假信号。

3. 未考虑突破前高点、回测前低点作为止损止盈信号,存在亏损风险。

4. 未设置移动止损,大幅逆转可能导致亏损扩大。

5. 回测数据不足,可能对参数优化结果产生偏差。

## 策略优化方向

1. 结合其他指标过滤入场信号,如MACD、布林带等。

2. 添加趋势线作为止损止盈。

3. 根据回测结果优化RSI参数,寻找最佳参数组合。 

4. 优化止损止盈策略,如追踪止损、区间止损等。

5. 测试更长时间周期的数据,评估参数稳定性。

6. 根据不同品种、市场情况调整参数。

## 总结

本策略整合RSI指标和K线形态识别的优势,在超买超卖点挑选高质量信号入场,达到趋势跟踪的效果。同时识别一些较强的组合形态信号,可提高获利概率。但存在一定滞后、假信号的风险,需要与其他手段配合使用,并继续优化。总体来说,该策略融合了多个利多策略思想,如果参数调优到位,应可获得较好的效果。

||


## Overview

This strategy combines the Relative Strength Index (RSI) indicator with candlestick patterns to identify trend-following entry signals when RSI reaches overbought or oversold levels.

## How It Works

1. Calculate RSI values, with 70 as overbought line and 30 as oversold line.

2. View RSI crossing above 30 as oversold signal, and RSI crossing below 70 as overbought signal.

3. When above signals occur, check if the current or previous candle forms specific patterns like white/black marubozu, hammer/hanging man etc. 

4. If both RSI signal and candlestick condition are met, generate buy/sell signals.

5. Correspondingly, buy on oversold RSI when bullish patterns like hammer occur, and sell on overbought RSI when bearish patterns like shooting star occur.

6. Identify complex combination patterns like tweezer, morning/evening stars for entry signals.

7. RSI crossing midline acts as exit signal.

## Advantages

1. Combining indicator and pattern filters fake signals and improves entry accuracy.

2. Candlestick pattern captures significant trend reversal points. 

3. RSI overbought/oversold signals increase winning opportunities.

4. Double/Triple candlestick combos catch stronger reversals.

5. RSI cross midline helps lock in profits.

## Risks

1. RSI lag may miss reversal points. 

2. Some candlestick signals are weak and give false signals.

3. No stop loss based on recent high/low, risks uncontrolled loss.

4. No trailing stop loss, huge adverse move may enlarge loss.

5. Insufficient backtest data may bias parameter optimization.

## Optimization

1. Add other filters like MACD, Bollinger Bands.

2. Add trendline for stop loss/profit taking.

3. Optimize RSI parameters based on backtest results.

4. Enhance stops like trailing stop, zone stop etc.

5. Test longer datasets to evaluate parameter robustness. 

6. Adjust parameters for different products and market regimes.

## Conclusion

This strategy integrates the strengths of RSI and candlestick pattern recognition to enter on high quality signals at overbought/oversold turning points for trend-following. Strong combo patterns also improve odds. But risks like lag and false signals remain, requiring combination with other techniques and further optimization. Overall it blends multiple winning ideas and may achieve good results if properly parameterized.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|55|RSI Bullish Criteria|
|v_input_3|45|RSI Bearish Criteria|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-15 00:00:00
end: 2023-09-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

/////////////////////////////////////
//@version=2
//@author=sb
strategy("RSI-candlestick Strategy", overlay=true)
src = hlc3, len = input(14, minval=1, title="Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
//plot(rsi, color=purple)
//band1 = hline(70)
//band0 = hline(30)
//band2 = hline(50,linestyle=dotted,color=silver)
//fill(band1, band0, color=#cc99ff, transp=70)
//end premade RSI
oversold = rsi < 30
overbought = rsi > 70
barcolor(oversold? #7fff00 : overbought? red : na )
//
//
level_70 = 70
level_70rsi = rsi > level_70 ? rsi : level_70
level_30 = 30
level_30rsi = rsi < 30 ? rsi : level_30

level_50 = 50
//


//p1 = plot(series=level_70, color=red, linewidth=1, transp=100)
//p2 = plot(series=level_70rsi, color=red, linewidth=1, transp=100)
//p3 = plot(series=level_30, color=green, linewidth=1, transp=100)
//p4 = plot(series=level_30rsi, color=green, linewidth=1, transp=100)
//fill(p1, p2, color=red, transp=50)
//fill(p3, p4, color=#7fff00, transp=50)




/////////////////////////////////////


bullishcriteria = input(title="RSI Bullish Criteria",  defval=55, minval=50, maxval=100)
bearishcriteria = input(title="RSI Bearish Criteria",  defval=45, minval=0, maxval=50)

range = high - low
body = abs(close - open)
oc2 = min(close, open) + body/2
upperwick = high - max(open, close)
lowerwick = min(open, close) - low

isUp = close > open
isTrendUp = rsi(close, 14) >= bullishcriteria
isTrendDown = rsi(close, 14) <= bearishcriteria
isDoji = abs(close-open)/(high-low) < 0.05

// Single Candlestick Pattern
// white marubozu
wm = (isUp) and (upperwick <= 0.05*body) and (lowerwick <= 0.05*body) and isTrendDown
plotshape(wm, color=green, style=shape.triangleup, location=location.belowbar, title='white marubozu',text='wm')
if (not na(rsi))
    if (crossover(rsi, level_30) and (wm or wm[1]))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
// black marubozu
bm = (not isUp) and (upperwick <= 0.05*body) and (lowerwick <= 0.05*body) and isTrendUp
plotshape(bm, color=red, style=shape.triangledown, location=location.abovebar, title='black marubozu',text='bm')

if (not na(rsi))
    if (crossunder(rsi, level_70)and (bm or bm[1]))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
// hammer
h = (isUp) and (lowerwick >= 2*body) and (upperwick <= 0.1*body) and isTrendDown
plotshape(h, color=green, style=shape.triangleup, location=location.belowbar, title='hammer',text='h')

if (not na(rsi))
    if (crossover(rsi, level_30) and (h or h[1]))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
// hanging man
hm = (not isUp) and (lowerwick >= 2*body) and (upperwick <= 0.1*body) and isTrendUp
plotshape(hm, color=red, style=shape.triangledown, location=location.abovebar, title='hanging man',text='hm')

if (not na(rsi))
    if (crossunder(rsi, level_70)and (hm or hm[1]))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
        
// inverted hammer
ih = (isUp) and (upperwick >= 2*body) and (lowerwick <= 0.1*body) and isTrendDown
plotshape(ih, color=green, style=shape.triangleup, location=location.belowbar, title='inverted hammer',text='ih')

//if (not na(rsi))
//    if (crossover(rsi, level_30) and (ih or ih[1]))
//        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
        
// shooting star
ss = (not isUp) and (upperwick >= 2*body) and (lowerwick <= 0.1*body) and isTrendUp
plotshape(ss, color=red, style=shape.triangledown, location=location.abovebar, title='shooting star',text='ss')

if (not na(rsi))
    if (crossunder(rsi, level_70)and (ss or ss[1]))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
        
// Double Candlestick Pattern
// bullish engulfing
bulle = not isDoji[1] and (not isUp[1] and isUp) and (close > open[1] and open < close[1]) and isTrendDown
plotshape(bulle, color=green, style=shape.triangleup, location=location.belowbar, title='bullish engulfing', text='e')

// bearish engulfing
beare = not isDoji[1] and (isUp[1] and not isUp) and (open > close[1] and close < open[1]) and isTrendUp
plotshape(beare, color=red, style=shape.triangledown, location=location.abovebar, title='bearish engulfing',text='e')

// tweezer bottom
twb = (not isUp[1] and isUp) and (min(lowerwick,lowerwick[1])/max(lowerwick,lowerwick[1]) >= 0.99) and (min(low,low[1])/max(low,low[1]) >= 0.99) and isTrendDown
plotshape(twb, color=green, style=shape.triangleup, location=location.belowbar, title='tweezer bottom', text='tb')

if (not na(rsi))
    if (crossover(rsi, level_30) and (twb or twb[1]))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
        
// tweezer top
twt = (isUp[1] and not isUp) and (min(upperwick,upperwick[1])/max(upperwick,upperwick[1]) >= 0.99) and (min(high,high[1])/max(high,high[1]) >= 0.99) and isTrendUp
plotshape(twt, color=red, style=shape.triangledown, location=location.abovebar, title='tweezer top',text='tt')

if (not na(rsi))
    if (crossunder(rsi, level_70)and (twt or twt[1]))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
// Trible Candlestick Pattern
// three white soldier
tws = (not isUp[3] and isUp[2] and isUp[1] and isUp) and (body[1]>body[2]) and (upperwick<0.1*body and lowerwick<0.1*body) and isTrendDown
plotshape(tws, color=green, style=shape.triangleup, location=location.belowbar, title='three white soldiers',text='tws')

if (not na(rsi))
    if (crossover(rsi, level_30) and (tws or tws[1]))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
        
// three black crows
tbc = (isUp[3] and not isUp[2] and not isUp[1] and not isUp) and (body[1]>body[2]) and (upperwick<0.1*body and lowerwick<0.1*body) and isTrendUp
plotshape(tbc, color=red, style=shape.triangledown, location=location.abovebar, title='three black crows',text='tbc')

if (not na(rsi))
    if (crossunder(rsi, level_70)and (tbc or tbc[1]))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
        
// morning star
ms = (not isUp[1]) and (abs(close[1]-open[1])/(high[1]-low[1]) < 0.1) and (close > oc2[2] and close < open[2]) and isTrendDown
plotshape(ms, color=green, style=shape.triangleup, location=location.belowbar, title='morning star',text='ms')

if (not na(rsi))
    if (crossover(rsi, level_30) and (ms or ms[1]))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
        
// evening star
es = (isUp[1]) and (abs(close[1]-open[1])/(high[1]-low[1]) < 0.1) and (close < oc2[2] and close > open[2]) and isTrendUp
plotshape(es, color=red, style=shape.triangledown, location=location.abovebar, title='evening star',text='es')

//if (not na(rsi))
//    if (crossunder(rsi, level_70)and (es or es[1]))
//        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
        
// three inside up
tiu = (not isUp[2]) and (close[1] > oc2[2] and close[1] < open[2]) and (close > high[2]) and isTrendDown
plotshape(tiu, color=green, style=shape.triangleup, location=location.belowbar, title='three inside up',text='tiu')

if (not na(rsi))
    if (crossover(rsi, level_30) and (tiu or tiu[1]))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
        
// three inside down
tid = (isUp[2]) and (close[1] < oc2[2] and close[1] > open[2]) and (close < low[2]) and isTrendUp
plotshape(tid, color=red, style=shape.triangledown, location=location.abovebar, title='three inside down',text='tid')

if (not na(rsi))
    if (crossunder(rsi, level_70)and (tid or tid[1]))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
        
if (not na(rsi))
    if (crossover(rsi, level_70))
        //strategy.exit("RsiSE")
        //if(chk[1]==0 or chk[2]==0 or chk[3]==0 or chk[4]==0 or chk[5]==0 or chk[6]==0 or chk[7]==0 or chk[8]==0 or chk[9]==0 or chk[10]==0)
        //if(crossover(col[1],zero) or crossover(col[2],zero) or crossover(col[3],zero) or crossover(col[4],zero) or crossover(col[5],zero) or crossover(col[6],zero) or crossover(col[7],zero) or crossover(col[8],zero))
        //strategy.entry("RsiLE", strategy.long,0, comment="RsiLE")
        strategy.entry("RsiSE", strategy.short,0, comment="RsiSE")

    if (crossunder(rsi, level_30))
        //strategy.entry("RsiSE", strategy.short,0, comment="RsiSE")
        strategy.entry("RsiLE", strategy.long,0, comment="RsiLE")

//if (not na(rsi))
//    if (crossover(rsi, level_50))
        //strategy.exit("RsiSE")
        //if(chk[1]==0 or chk[2]==0 or chk[3]==0 or chk[4]==0 or chk[5]==0 or chk[6]==0 or chk[7]==0 or chk[8]==0 or chk[9]==0 or chk[10]==0)
        //if(crossover(col[1],zero) or crossover(col[2],zero) or crossover(col[3],zero) or crossover(col[4],zero) or crossover(col[5],zero) or crossover(col[6],zero) or crossover(col[7],zero) or crossover(col[8],zero))
//        strategy.entry("RsiSE", strategy.short,0, comment="RsiSE")
//    else
//        strategy.exit("RsiSE")
//    if (crossunder(rsi, level_50))
//        strategy.entry("RsiLE", strategy.long,0, comment="RsiLE")
//    else
//        strategy.exit("RsiLE")
```

> Detail

https://www.fmz.com/strategy/427616

> Last Modified

2023-09-22 17:10:39
