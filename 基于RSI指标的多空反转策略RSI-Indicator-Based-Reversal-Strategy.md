
> Name

基于RSI指标的多空反转策略RSI-Indicator-Based-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12962520c89bb7a119f.png)
[trans]

## 概述

该策略是基于RSI指标识别超买超卖情况下的多空反转机会。它会在RSI进入超买或超卖区域后,监测价格与RSI之间是否出现背离,以判断未来可能的反转机会。

## 策略原理

该策略使用RSI指标判断市场的超买超卖情况。当RSI进入预设的超买区或超卖区域后,会开启反转背离的监测。

具体来说,如果RSI进入超买区,则会监测价格是否出现继续走高(形成低点更高),而RSI形成低点更低的常规多头背离;或者价格出现低点更低,RSI形成低点更高的隐藏多头背离。这两种情况都预示着未来可能出现向下反转。

同理,如果RSI进入超卖区域,则会监测价格是否出现继续走低(形成高点更低),而RSI形成高点更高的常规空头背离;或者价格出现高点更高,RSI形成高点更低的隐藏空头背离。这两种情况也预示着未来可能出现向上反转。

一旦监测到上述反转信号,则会根据配置的参数,采取做多或做空的仓位操作。

## 策略优势

该策略最大的优势在于能够识别市场的极端情况,这时反转的概率较大,采用反转操作的获利空间较大。与简单跟踪趋势的策略相比,这种逆市操作的策略胜率和盈利率都会更高。

另外,策略同时集成了常规和隐藏背离的监测,可以识别更多的反转机会,避免因偶然情况导致错失良机。

## 策略风险

该策略面临的最大风险是超买超卖到更加极端的情况,即所谓“笔直上升,90度下跌”。这时继续做多或做空的概率更大,采取反转操作就很容易止损。

另外,如果参数设置不当,对超买超卖的判断存在误区,也很容易导致失误。

应对方法是合理设置超买超卖区域的界限参数,避免过于极端。另外在实盘中要适当缩小仓位规模,控制单笔止损数量。

## 策略优化方向

该策略可以从以下几个方面进行优化:

1. 结合其他指标判断超买超卖程度,避免仅凭RSI单一指标出现判断失误

2. 增加对突破前整理行情的判断逻辑,这时反转概率更大

3. 优化反转后目标利润的设置,实现更科学的 Position Sizing

4. 结合最近几年的历史行情数据,使用机器学习方法自动优化参数

5. 增加止损逻辑的优化,如及时止盈、分批止损、跟踪止损等

## 总结

该策略总体来说是一种典型的统计套利策略。它试图捕捉市场从极端情况反转回均衡状态的机会。相比追随市场趋势的策略,它的胜率与盈利率会更高,但是也面临更大的风险。通过参数优化与风险控制,可以使这种策略稳定盈利。

||

## Overview

This strategy identifies reversal opportunities after overbought or oversold situations based on the RSI indicator. It will monitor the divergence between price and RSI after RSI enters overbought or oversold zones to determine potential future reversal chances.

## Strategy Logic  

This strategy uses the RSI indicator to determine the overbought and oversold situations in the market. After RSI enters a preset overbought or oversold zone, it will start monitoring reversal divergences.   

Specifically, if RSI enters the overbought zone, it will monitor whether the price continues to rise (forming higher lows) while RSI forms lower lows - a regular bullish divergence; or the price forms lower lows and RSI forms higher lows – a hidden bullish divergence. Both situations signal potential downside reversals ahead.  

Similarly, if RSI enters the oversold zone, it will monitor whether the price continues to fall (forming lower highs) while RSI forms higher highs – a regular bearish divergence; or the price forms higher highs and RSI forms lower highs – a hidden bearish divergence. Both situations also signal potential upside reversals ahead.

Once the above reversal signals are detected, long or short positions will be taken according to the configured parameters.   

## Advantages  

The biggest advantage of this strategy is being able to identify extreme market situations where reversal probabilities are high and the profit margin for reversal operations is large. Compared to simple trend-following strategies, counter-trend strategies like this one have higher win rates and profitability.  

In addition, the strategy incorporates monitoring for both regular and hidden divergences so that more reversal opportunities can be identified and good chances will not be missed due to one-off situations.

## Risks

The biggest risk this strategy faces is even more extreme overbought or oversold situations, the so-called “straight up, 90 degrees down”. Continuing with long or short operations is more likely in such cases, and taking reversal action can easily result in stop loss.  

Besides, if the parameters are not set properly and there are errors in judging overbought and oversold situations, mistakes can easily occur.  

The way to handle this is to reasonably set the upper and lower limits for overbought and oversold zones to avoid overly extreme situations. Also scale down the position size in live trading to control the amount for a single stop loss.

## Optimization Directions   

The strategy can be optimized in the following aspects:

1. Incorporate other indicators to determine overbought and oversold conditions to avoid relying solely on RSI  

2. Add logic to identify consolidation before breakouts when reversal probability is higher 
   
3. Optimize profit target settings after reversals to enable more scientific position sizing  

4. Use machine learning methods on recent years of historical data to automatically optimize parameters  

5. Improve stop loss logic optimization, e.g. timely profit taking, staggered stop loss, trailing stop loss etc.

## Conclusion  

In conclusion, this is a typical statistical arbitrage strategy. It tries to capture opportunities when the market rebounds from extreme situations back to equilibrium. Compared to trend-following strategies, it has higher win rates and profitability but also faces greater risks. With parameter optimization and risk control this type of strategies can profit steadily.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?regular RSI settings)RSI Period|
|v_input_source_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|5|Pivot Lookback Right|
|v_input_int_3|5|Pivot Lookback Left|
|v_input_int_4|60|Max of Lookback Range|
|v_input_int_5|5|Min of Lookback Range|
|v_input_bool_1|true|Plot Bullish|
|v_input_bool_2|true|Plot Hidden Bullish|
|v_input_bool_3|true|Plot Bearish|
|v_input_bool_4|true|Plot Hidden Bearish|
|v_input_int_6|70|(?look for RSI divergence after OverBought/OverSold)OB RSI Value|
|v_input_int_7|30|OB lookback period|
|v_input_int_8|35|OS RSI Value|
|v_input_int_9|30|OS lookback period|
|v_input_int_10|60|min RSI for bear Alerts|
|v_input_int_11|50|max RSI for Bull Alerts|
|v_input_1|true|(?enable Backtester)to enable the Backtester, uncomment/comment the ? lines in the source code|
|v_input_2|true|(?Long Backtester)enable Long Backtester (to disable uncheck 'plot Bullish' and 'plot hidden Bullish as well')|
|v_input_float_1|0.5|Stop Loss %|
|v_input_float_2|2|Take Profit %|
|v_input_3|true|(?Short Backtester)enable Short Backtester (to disable uncheck 'plot Bearish' and 'plot hidden Bearish as well'|
|v_input_float_3|0.5|Stop Loss %|
|v_input_float_4|2|Take Profit %|
|v_input_int_12|true|(?Backtesting range)Start Date|
|v_input_int_13|true|Start Month|
|v_input_int_14|2016|Start Year|
|v_input_int_15|true|End Date|
|v_input_int_16|true|End Month|
|v_input_int_17|2040|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// made by Imal_Max 
// thanks to neo the crypto trader's idea
//
// thanks to JayTradingCharts RSI Divergence /w Alerts indicator for the base code. 
// we modified this to detect the divergence only if price was oversold or overbought recently and a few more settings
// also now you can backtest the settings easy

//@version=5

// ? comment out the line below to disable the alerts and enable the backtester 
//indicator(title="RSI Divergence Indicator with Alerts Overbought Oversold", shorttitle="RSI OB/OS Divergence", format=format.price, timeframe="")



// ? uncomment the line below to enable the backtester + uncomment the lines slightly below and at the bottom of the script
strategy(title="RSI Divergence Indicator with Alerts Overbought Oversold", shorttitle="RSI OB/OS Divergence", overlay=true)





len = input.int(title='RSI Period', minval=1, defval=14, group='regular RSI settings')
src = input.source(title='RSI Source', defval=close, group='regular RSI settings')
lbR = input.int(title='Pivot Lookback Right', defval=5, group='regular RSI settings')
lbL = input.int(title='Pivot Lookback Left', defval=5, group='regular RSI settings')


rangeUpper = input.int(title='Max of Lookback Range', defval=60, group='regular RSI settings')
rangeLower = input.int(title='Min of Lookback Range', defval=5, group='regular RSI settings')
plotBull = input.bool(title='Plot Bullish', defval=true, group='regular RSI settings')
plotHiddenBull = input.bool(title='Plot Hidden Bullish', defval=true, group='regular RSI settings')
plotBear = input.bool(title='Plot Bearish', defval=true, group='regular RSI settings')
plotHiddenBear = input.bool(title='Plot Hidden Bearish', defval=true, group='regular RSI settings')



// ob/os divergence settings

obvalue = input.int(title='OB RSI Value', defval=70, group='look for RSI divergence after OverBought/OverSold', inline='Input 0', tooltip="min RSI Level needed within lookback period to look for bullish divergences")
oblookback = input.int(title='OB lookback period', defval=30, group='look for RSI divergence after OverBought/OverSold', inline='Input 0')
osvalue = input.int(title='OS RSI Value', defval=35, group='look for RSI divergence after OverBought/OverSold', inline='Input 1', tooltip="max RSI Level needed within lookback period to look for bearish divergences")
oslookback = input.int(title='OS lookback period', defval=30, group='look for RSI divergence after OverBought/OverSold', inline='Input 1')
minBearRSI = input.int(title='min RSI for bear Alerts', defval=60, group='look for RSI divergence after OverBought/OverSold', tooltip="min RSI needed at the time where bearish divergence gets detected")
maxBullRSI = input.int(title='max RSI for Bull Alerts', defval=50, group='look for RSI divergence after OverBought/OverSold', tooltip="max RSI needed at the time where bullish divergence gets detected")


// Backtesteer Info
enableBacktesterInfo = input(true, title="to enable the Backtester, uncomment/comment the ? lines in the source code", group='enable Backtester')


// Backtester input stuff

// long settings - ? uncomment the 3 lines below to disable the alerts and enable the backtester 
longTrading = input(true, title="enable Long Backtester (to disable uncheck 'plot Bullish' and 'plot hidden Bullish as well')", group='Long Backtester')
longStopLoss = input.float(0.5, title='Stop Loss %', group='Long Backtester') / 100
longTakeProfit = input.float(2.0, title='Take Profit %', group='Long Backtester') / 100

// short settings - ? uncomment the 3 lines below to disable the alerts and enable the backtester 
shortTrading = input(true, title="enable Short Backtester (to disable uncheck 'plot Bearish' and 'plot hidden Bearish as well'", group='Short Backtester')
shortStopLoss = input.float(0.5, title='Stop Loss %', group='Short Backtester') / 100
shortTakeProfit = input.float(2.0, title='Take Profit %', group='Short Backtester') / 100

// Backtesting Range settings - ? uncomment the 6 lines below to disable the alerts and enable the backtester 
startDate = input.int(title='Start Date', defval=1, minval=1, maxval=31, group='Backtesting range')
startMonth = input.int(title='Start Month', defval=1, minval=1, maxval=12, group='Backtesting range')
startYear = input.int(title='Start Year', defval=2016, minval=1800, maxval=2100, group='Backtesting range')
endDate = input.int(title='End Date', defval=1, minval=1, maxval=31, group='Backtesting range')
endMonth = input.int(title='End Month', defval=1, minval=1, maxval=12, group='Backtesting range')
endYear = input.int(title='End Year', defval=2040, minval=1800, maxval=2100, group='Backtesting range')





bearColor = color.red
bullColor = color.green
hiddenBullColor = color.new(color.green, 80)
hiddenBearColor = color.new(color.red, 80)
textColor = color.white
noneColor = color.new(color.white, 100)
osc = ta.rsi(src, len)

plot(osc, title='RSI', linewidth=2, color=color.new(#00bcd4, 0))
obLevel = hline(obvalue, title='Overbought', linestyle=hline.style_dotted)
osLevel = hline(osvalue, title='Oversold', linestyle=hline.style_dotted)

minRSIline = hline(minBearRSI, title='max RSI for Bull divergence', linestyle=hline.style_dotted)
maxRSIline = hline(maxBullRSI, title='max RSI for Bull divergence', linestyle=hline.style_dotted)

fill(obLevel, minRSIline, title='Bear Zone Background', color=color.new(#f44336, 90))
fill(osLevel, maxRSIline, title='Bull Zone Background', color=color.new(#4caf50, 90))

RSI0line = hline(0, title='RSI 0 Line', linestyle=hline.style_dotted)
RSI100line = hline(100, title='RSI 100 Line', linestyle=hline.style_dotted)

fill(obLevel, RSI100line, title='Overbought Zone Background', color=color.new(#e91e63, 75))
fill(osLevel, RSI0line, title='Oversold Zone Background', color=color.new(#4caf50, 75))


plFound = na(ta.pivotlow(osc, lbL, lbR)) ? false : true
phFound = na(ta.pivothigh(osc, lbL, lbR)) ? false : true
_inRange(cond) =>
    bars = ta.barssince(cond == true)
    rangeLower <= bars and bars <= rangeUpper


// check if RSI was OS or OB recently

obHighestRsi = ta.highest(osc, oblookback)
osLowestRsi = ta.lowest(osc, oslookback)


//------------------------------------------------------------------------------
// Regular Bullish
// Osc: Higher Low

oscHL = osc[lbR] > ta.valuewhen(plFound, osc[lbR], 1) and _inRange(plFound[1])

// Price: Lower Low

priceLL = low[lbR] < ta.valuewhen(plFound, low[lbR], 1)


bullCond = plotBull and priceLL and oscHL and plFound and osLowestRsi < osvalue and osc < maxBullRSI


plot(plFound ? osc[lbR] : na, offset=-lbR, title='Regular Bullish', linewidth=2, color=bullCond ? bullColor : noneColor, transp=0)

plotshape(bullCond ? osc[lbR] : na, offset=-lbR, title='Regular Bullish Label', text=' Bull ', style=shape.labelup, location=location.absolute, color=bullColor, textcolor=textColor, transp=0)

//------------------------------------------------------------------------------
// Hidden Bullish
// Osc: Lower Low

oscLL = osc[lbR] < ta.valuewhen(plFound, osc[lbR], 1) and _inRange(plFound[1])

// Price: Higher Low

priceHL = low[lbR] > ta.valuewhen(plFound, low[lbR], 1)


hiddenBullCond = plotHiddenBull and priceHL and oscLL and plFound and osLowestRsi < osvalue and osc < maxBullRSI


plot(plFound ? osc[lbR] : na, offset=-lbR, title='Hidden Bullish', linewidth=2, color=hiddenBullCond ? hiddenBullColor : noneColor, transp=0)

plotshape(hiddenBullCond ? osc[lbR] : na, offset=-lbR, title='Hidden Bullish Label', text=' H Bull ', style=shape.labelup, location=location.absolute, color=bullColor, textcolor=textColor, transp=0)

//------------------------------------------------------------------------------
// Regular Bearish
// Osc: Lower High

oscLH = osc[lbR] < ta.valuewhen(phFound, osc[lbR], 1) and _inRange(phFound[1])

// Price: Higher High

priceHH = high[lbR] > ta.valuewhen(phFound, high[lbR], 1)

bearCond = plotBear and priceHH and oscLH and phFound and obHighestRsi > obvalue and osc > minBearRSI

plot(phFound ? osc[lbR] : na, offset=-lbR, title='Regular Bearish', linewidth=2, color=bearCond ? bearColor : noneColor, transp=0)

plotshape(bearCond ? osc[lbR] : na, offset=-lbR, title='Regular Bearish Label', text=' Bear ', style=shape.labeldown, location=location.absolute, color=bearColor, textcolor=textColor, transp=0)

//------------------------------------------------------------------------------
// Hidden Bearish
// Osc: Higher High

oscHH = osc[lbR] > ta.valuewhen(phFound, osc[lbR], 1) and _inRange(phFound[1])

// Price: Lower High

priceLH = high[lbR] < ta.valuewhen(phFound, high[lbR], 1)



hiddenBearCond = plotHiddenBear and priceLH and oscHH and phFound and obHighestRsi > obvalue and osc > minBearRSI



plot(phFound ? osc[lbR] : na, offset=-lbR, title='Hidden Bearish', linewidth=2, color=hiddenBearCond ? hiddenBearColor : noneColor, transp=0)

plotshape(hiddenBearCond ? osc[lbR] : na, offset=-lbR, title='Hidden Bearish Label', text=' H Bear ', style=shape.labeldown, location=location.absolute, color=bearColor, textcolor=textColor, transp=0)



alertcondition(bullCond, title='Bullish divergence', message='Regular Bull Div {{ticker}} XXmin')
alertcondition(bearCond, title='Bearish divergence', message='Regular Bear Div {{ticker}} XXmin')
alertcondition(hiddenBullCond, title='Hidden Bullish divergence', message='Hidden Bull Div {{ticker}} XXmin')
alertcondition(hiddenBearCond, title='Hidden Bearish divergence', message='Hidden Bear Div {{ticker}} XXmin')




// ? uncomment the all lines below for the backtester and revert for alerts
longTP = strategy.position_size > 0 ? strategy.position_avg_price * (1 + longTakeProfit) : strategy.position_size < 0 ? strategy.position_avg_price * (1 - longTakeProfit) : na
longSL = strategy.position_size > 0 ? strategy.position_avg_price * (1 - longStopLoss) : strategy.position_size < 0 ? strategy.position_avg_price * (1 + longStopLoss) : na
shortTP = strategy.position_size > 0 ? strategy.position_avg_price * (1 + shortTakeProfit) : strategy.position_size < 0 ? strategy.position_avg_price * (1 - shortTakeProfit) : na
shortSL = strategy.position_size > 0 ? strategy.position_avg_price * (1 - shortStopLoss) : strategy.position_size < 0 ? strategy.position_avg_price * (1 + shortStopLoss) : na
strategy.risk.allow_entry_in(longTrading == true and shortTrading == true ? strategy.direction.all : longTrading == true ? strategy.direction.long : shortTrading == true ? strategy.direction.short : na)
strategy.entry('Bull', strategy.long, comment='Long', when=bullCond)
strategy.entry('Bull', strategy.long, comment='Long', when=hiddenBullCond)
strategy.entry('Bear', strategy.short, comment='Short', when=bearCond)
strategy.entry('Bear', strategy.short, comment='Short', when=hiddenBearCond)
strategy.exit(id='longTP-SL', from_entry='Bull', limit=longTP, stop=longSL)
strategy.exit(id='shortTP-SL', from_entry='Bear', limit=shortTP, stop=shortSL)



```

> Detail

https://www.fmz.com/strategy/438059

> Last Modified

2024-01-08 16:47:07
