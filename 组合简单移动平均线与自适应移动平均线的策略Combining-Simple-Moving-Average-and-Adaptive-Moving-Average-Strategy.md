
> Name

组合简单移动平均线与自适应移动平均线的策略Combining-Simple-Moving-Average-and-Adaptive-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

组合简单移动平均线与自适应移动平均线的策略

本文将介绍一种组合使用简单移动平均线(SMA)与自适应移动平均线(ALMA)的量化交易策略。该策略同时结合了多种技术指标,通过设定不同的参数,形成进入和退出市场的交易信号。

一、策略原理

该策略的核心是组合使用不同参数设置的SMA和ALMA。其中SMA是非常常见的趋势跟踪指标,它通过计算一段时间内的收盘价算术平均值,来表现价格趋势的方向和力度。ALMA与SMA类似,也是对历史价格进行平均,但它增加了两个可调参数α和σ,通过控制参数使其对市场变化的敏感程度高于SMA。 

该策略首先计算三条SMA,分别代表短期、中期和长期趋势。同时计算三条ALMA,代表不同时间维度下价格的均线。SMA和ALMA互相组合,形成多组指标。当短期SMA上穿中期SMA时产生买入信号,而短期SMA下穿中期SMA则产生卖出信号。结合ALMA的参数调节,可以使信号对市场的响应更快。

此外,策略还引入Relative Strength Index (RSI)来辅助判断超买超卖情况。当RSI高于设置的超买线时,视为市场超买,这时即使SMA和ALMA形成买入信号,也可能带有误导性。类似当RSI低于超卖线时,即使指标显示卖出信号,也可能会漏掉反弹机会。所以RSI的辅助判断可以避免一定的套牢风险。

综合利用SMA、ALMA和RSI多种指标的参数设定,不同参数指标之间的交叉组合,可以形成相对灵敏的交易策略信号。同时辅以RSI指标的超买超卖判断,可以进一步优化入场时机,并降低套牢概率。

二、策略优势

该策略最大的优势在于指标参数的灵活组合运用。SMA和ALMA都可灵活调整参数,代表不同的均线形态。RSI也可通过调整参数来控制信号的频繁程度。这些指标组合互补形成交易信号,可以优化入场时机选择。

相比单一的SMA指标,ALMA增强了对市场变化的灵敏度,可以更快的响应趋势转折。而RSI的辅助判断也进一步避免盲目跟随均线信号。所以该策略整体来说,具有较强的适应性和优化能力。

另一个优势是策略信号来源多样。不同时间维度上的SMA、ALMA组合互动,为策略提供了多层面的参考。这可以 Filters out noise/false signals一定程度上过滤掉市场上随机的噪音,使得信号更加可靠。

总体来说,该策略参数灵活、输出信号稳定,适合不同品种的量化交易。

三、潜在风险

尽管该策略有一定优势,但在实际运用中也存在一些风险需要注意。

首先是指标设置带来的过优化问题。SMA、ALMA和RSI都可自由调节参数,但调节不当可能会过度优化,而无法适应市场长期的结构性变化。这需要根据不同品种特点谨慎设置参数,不能一味追求短期效果。

其次是策略信号可能存在滞后。虽然ALMA的响应速度快于SMA,但终归存在一定滞后性。急激变化的市场中,这可能导致错过最优入场时机。这里需要考虑适当配以其他先行指标来优化。

最后,多指标组合带来的难以判断的交叉也需要注意。在某些时候,不同指标可能出现矛盾的信号指示。这需要根据经验清晰的优先级规则来解决。

总之,该策略并非完美,在实践中仍需要不断调整优化。但其灵活的参数设定和多指标组合优势,使其成为一种可长期应用的量化策略选型。

四、内容总结

本文详细介绍了一种组合使用SMA、ALMA和RSI的量化交易策略。该策略通过指标的灵活组合,形成对市场敏感的交易信号。相比单一指标,它具有更强的适应性和 noise filtering 能力。但我们也要注意过优化、信号滞后和判断失误等潜在问题。总体来说,该策略构建合理,可通过不断优化获取长期稳定的量化交易信号。
||


This article introduces a quantitative trading strategy that combines Simple Moving Average (SMA) and Adaptive Moving Average (ALMA). This strategy incorporates multiple technical indicators and generates trading signals based on different parameter settings.

I. Strategy Principle 

The core of this strategy is the combination of SMA and ALMA with different parameter settings. SMA is a very common trend-following indicator that shows the direction and momentum of the trend by calculating the arithmetic mean of closing prices over a period of time. ALMA is similar to SMA in averaging historical prices, but it adds two adjustable parameters, α and σ, which make it more sensitive to market changes than SMA.

The strategy first calculates three SMAs representing short-term, medium-term, and long-term trends, respectively. At the same time, it calculates three ALMAs to represent the moving averages at different timeframes. The crossovers between SMA and ALMA form multiple sets of indicators. When the short-term SMA crosses over the medium-term SMA, a buy signal is generated. When the short-term SMA crosses below the medium-term SMA, a sell signal is generated. With the adjustable parameters of ALMA, the signals can respond to the market more quickly.

In addition, the Relative Strength Index (RSI) is introduced to assist in identifying overbought and oversold conditions. When RSI is higher than the overbought threshold, the market is considered overbought. In this case, even if the SMA and ALMA generate buy signals, they may be misleading. Similarly, when RSI is lower than the oversold line, sell signals from the indicators may miss rebounds. So the auxiliary judgment of RSI can avoid certain trapping risks.

By comprehensively utilizing the parameter settings of SMA, ALMA, and RSI, as well as the cross combinations between indicators of different parameters, relatively sensitive trading strategy signals can be formed. Also, the overbought and oversold judgments from RSI can further optimize entry timing and reduce trapping probability.

II. Advantages of the Strategy  

The biggest advantage of this strategy is the flexible combination and application of indicator parameters. Both SMA and ALMA are flexible in adjusting parameters to represent different types of moving averages. RSI can also control the frequency of signals by adjusting parameters. The combination of these indicators complements each other and forms trading signals, which can optimize the timing of entries.

Compared with a single SMA indicator, ALMA enhances the sensitivity to market changes and can respond to trend reversals faster. Also, the auxiliary RSI judgment further avoids blindly following the signals from the moving averages. Therefore, this strategy overall has relatively strong adaptability and optimization capabilities.

Another advantage is the diversity of signal sources of the strategy. The interactions between SMAs and ALMAs at different timeframes provide multi-layered references for the strategy. This can filter out random market noise to some extent and make the signals more reliable. 

In general, this strategy has flexible parameters and generates stable signals, making it suitable for algorithmic trading across different products.

III. Potential Risks

Although this strategy has certain advantages, there are still some risks to note when applying it in practice.

First, overoptimization problems caused by indicator settings. SMA, ALMA, and RSI are freely adjustable, but improper tuning may lead to overoptimization and the inability to adapt to long-term structural changes in the market. This requires cautious parameter settings based on the characteristics of different products, instead of merely pursuing short-term results.

Secondly, the strategy signals may lag. Although ALMA responds faster than SMA, there is still a certain lag. In rapidly changing markets, this may result in missing the optimal entry timing. Here we may consider combining some leading indicators to optimize. 

Finally, the contradictory signals from multiple indicators need to be watched out for. At certain times, different indicators may give conflicting indications. This needs clear priority rules based on experience to resolve.

In summary, this strategy is not perfect and still requires continuous adjustment and optimization in practice. But its flexible parameter settings and advantages of multiple indicator combinations make it a viable algorithmic trading system for the long term.

IV. Summary

In this article, we have introduced in detail a quantitative trading strategy that combines SMA, ALMA, and RSI. Through flexible combinations of the indicators, it forms signals that are sensitive to the markets. Compared with single indicators, it has stronger adaptability and noise filtering capabilities. But we also need to pay attention to potential issues like overoptimization, signal lag, and judgment errors. Overall, this strategy is reasonably constructed and can generate stable algorithmic trading signals through continuous optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|═══════════════ Show Fibby MAs ═══════════════|
|v_input_2|960|MA-Cross Resolution|
|v_input_3|8|MA#1 Length|
|v_input_4|13|MA#2 Length|
|v_input_5|34|MA#3 Length|
|v_input_6|1.1|SMA LooseSqueeze Percent|
|v_input_7|false|═══════════════════ Show IIRs ═══════════════════|
|v_input_8|60|IIR Resolution|
|v_input_9|0.8|IIR Squeeze PercentClose|
|v_input_10|34|IIR Length 1|
|v_input_11|144|IIR Length 2|
|v_input_12|720|IIR Length 3|
|v_input_13|true|Show IIR1|
|v_input_14|true|Show IIR2|
|v_input_15|true|Show IIR3|
|v_input_16|true|═════════════ Show Parabolic MA Counts ════════════|
|v_input_17|true|══════════════ Show Buy/Sell Signals ══════════════|
|v_input_18|true|══════════════ Show Background Colors ══════════════|
|v_input_19|false|══════════════ Show Debug ══════════════|
|v_input_20|5|══ Bar Lookback Period ══|
|v_input_21|true|══ Percentage Lookback Period ══|
|v_input_22|true|══════════ Show misc MA Cross Strategy ══════════|
|v_input_23|13|IIRx Length: |
|v_input_24|21|IIRx Period/TF: |
|v_input_25|144|IIRx2 Length: |
|v_input_26|233|IIRx2 Period/TF: |
|v_input_27|21|Alma of IIR1 Period: |
|v_input_28|0.99|Alma Alpha Value: |
|v_input_29|8|Alma Sigma Value: |
|v_input_30|true|═══════════════════ Show RSI Arrows ═══════════════════|
|v_input_31_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_32|14|RSI Length|
|v_input_33|80|RSI Overbought Level|
|v_input_34|20|RSI Oversold Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//The plotchar UP/DOWN Arrows  is the crossover of the fastest MA and fastest IIR MAs
//
//The dots at the bottom are the two simple averages crossing over
//
//The count over/under the candles is the count of bars that the SMAs on their
//respective resolution are fanning out.
//
//The colored background indicates a squeeze, lime=kinda tight : green=very tight squeeze.  based on the 3 IIRs
//
//To answer my own question in a forum, looking at the code, i couldn't figure out how to get it from another timeframe
//and run the same calculations with the same results.  My answer in the end was to scale the chosen MA length
//in the corresponding CurrentPeriod/ChosenMAPeriod proportion.  This results in the same line in the same place when browsing through the
//different time resolutions.  Somebody might find this invaluable
//
//The counts are for MA's fanning out, or going parabolic.  Theres IIRs, Almas, one done of the other.  A lot.  
//The arrows above and below bars are from standard RSI numbers for OB/OS
//
//The IIRs changes color depending on their slope, which can be referenced easily with a variable.
//
//The backgrond on a bar-by-bar basis is colored when 2 sets of moving averages are in a squeeze, aka
//when price is consolidating.  
//
//This aims to help the trader combine conditions and entry criteria of the trade and explore these options visually.  
//They detail things from all time-frames on the current one.  I prefer it because of the fractal nature of price-action, both large and small,
//either yesterday or last year.  For best results, go long in short-term trades when the long-term trend is also up.
//and other profitable insights.  This is also a great example of an automation algorith.  
//
//The pretty ribbon is my script called 'Trading With Colors'. Use them together for fanciest results.  55/233 is my Fib Cross (golden/death)  Compare it to the classic 50/200 if
//you get bored.  I believe it simply works better, at least for Crypto.
//
//Evidently, I am a day-trader.  But this yields higher profits on larger time-frames anyways, so do play around with it. Find what works for you.

//Thanks and credit for code snippets goes to:
//matryskowal
//ChrisMoody, probably twice
//Alex Orekhov (everget)
//author=LucF and midtownsk8rguy, for PineCoders
//If you use code from this, real quick search for perhaps the original and give them a shoutout too.  I may have missed something

//Author: Sean Duffy
//@version=4
strategy(title = "Combination Parabolic MA/IIR/ALMA Strategy",
         shorttitle = "MA-QuickE", 
         overlay = true, 
         backtest_fill_limits_assumption = 0, 
         default_qty_type = strategy.cash, 
         default_qty_value = 1000, 
         initial_capital = 1000,
         currency = currency.USD,
         linktoseries = true)
        //  calc_on_order_fills = true,
        //  calc_on_every_tick = true,
// Input Variables
showFIBMAs = input(false, type=input.bool, title="═══════════════ Show Fibby MAs ═══════════════")
maRes = input(960, type=input.integer, title="MA-Cross Resolution")
mal1 = input(8, type=input.integer, title="MA#1 Length")
mal2 = input(13, type=input.integer, title="MA#2 Length")
mal3 = input(34, type=input.integer, title="MA#3 Length")
loosePercentClose = input(1.1, type=input.float, title="SMA LooseSqueeze Percent")
showIIRs = input(false, type=input.bool, title="═══════════════════ Show IIRs ═══════════════════")
iirRes = input(60, type=input.integer, title="IIR Resolution")
percentClose = input(title="IIR Squeeze PercentClose", type=input.float, defval=.8)
iirlength1 = input(title="IIR Length 1", type=input.integer, defval=34)
iirlength2 = input(title="IIR Length 2", type=input.integer, defval=144)//input(title="ATR Period", type=input.integer, defval=1)
iirlength3 = input(title="IIR Length 3", type=input.integer, defval=720)//input(title="ATR Period", type=input.integer, defval=1)
showIIR1 = input(true, type=input.bool, title="Show IIR1")
showIIR2 = input(true, type=input.bool, title="Show IIR2")
showIIR3 = input(true, type=input.bool, title="Show IIR3")
showCounts = input(true, type=input.bool, title="═════════════ Show Parabolic MA Counts ════════════")
showSignals = input(true, type=input.bool, title="══════════════ Show Buy/Sell Signals ══════════════")
showBackground = input(true, type=input.bool, title="══════════════ Show Background Colors ══════════════")
//runStrategy = input(true, type=input.bool, title="══════════════ Run Strategy  ══════════════")
debug = input(false, type=input.bool, title="══════════════ Show Debug ══════════════")

barLookbackPeriod = input(title="══ Bar Lookback Period ══", type=input.integer, defval=5)
percentageLookbackPeriod = input(title="══ Percentage Lookback Period ══", type=input.integer, defval=1)

bullcolor = color.green
bearcolor = color.red
color bgcolor = na

var bool slope1Green = na
var bool slope2Green = na
var bool slope3Green = na

var bool buySignal = na
var bool sellSignal = na
var bool bigbuySignal = na
var bool bigsellSignal = na
bool smbuySignal = false
bool smsellSignal = false
var bool insqueeze = na
var bool intightsqueeze = na
var bool infastsqueeze = na
var bool awaitingEntryIn = false

// My counting variables
var int count1 = 0
var float madist1 = 0
var int count2 = 0
var float madist2 = 0
var int sinceSmSignal = 0

var entryPrice = 0.0
var entryBarIndex = 0
var stopLossPrice = 0.0
// var updatedEntryPrice = 0.0
// var alertOpenPosition = false
// var alertClosePosition = false
// var label stopLossPriceLabel = na
// var line stopLossPriceLine = na
positionType = "LONG" // Strategy type, and the only current option

hasOpenPosition = strategy.opentrades != 0
hasNoOpenPosition = strategy.opentrades == 0

strategyClose() =>
    if (hasOpenPosition)
        if positionType == "LONG"
            strategy.close("LONG", when=true)
        else 
            strategy.close("SHORT", when=true)
strategyOpen() =>
    if (hasNoOpenPosition)
        if positionType == "LONG"
            strategy.entry("LONG", strategy.long, when=true)
        else 
            strategy.entry("SHORT", strategy.short, when=true)
checkEntry() =>
    buysignal = false
    if (hasNoOpenPosition)
        strategyOpen()
        buysignal := true
    // if (slope1Green and (trend1Green or trend2Green) and awaitingEntryIn and hasNoOpenPosition)
    //     strategyOpen()
    //     buysignal := true
    buysignal
checkExit() =>
    sellsignal = false
    // if (trend1Green == false and trend2Green == false) // to later have quicker exit strategy
    //     sellsignal := true
    //     strategyClose()
    if (hasOpenPosition)
        sellsignal := true
        strategyClose()
    sellsignal

multiplier(_adjRes, _adjLength) => // returns adjusted length
    multiplier = _adjRes/timeframe.multiplier
    round(_adjLength*multiplier)
    
    
//reset the var variables before new calculations
buySignal := false
sellSignal := false
smbuySignal := false
smsellSignal := false
bigbuySignal := false
bigsellSignal := false

ma1 = sma(close, multiplier(maRes, mal1))
ma2 = sma(close, multiplier(maRes, mal2))
ma3 = sma(close, multiplier(maRes, mal3))


madist1 := abs(ma1 - ma2)
madist2 := abs(ma1 - ma3) // check if MA's are fanning/going parabolic
if (ma1 >= ma2 and ma2 >= ma3 and madist1[0] > madist1[1]) //and abs(dataB - dataC >= madist2)  // dataA must be higher than b, and distance between gaining, same with C
    count1 := count1 + 1
else 
    count1 := 0
if (ma1 <= ma2 and ma2 <= ma3 and madist1[0] > madist1[1])  //<= madist2 and dataB <= dataC) //and abs(dataB - dataC >= madist2)  // dataA must be higher than b, and distance between gaining, same with C
    count2 := count2 + 1
else 
    count2 := 0


crossoverAB = crossover(ma1, ma2) 
crossunderAB = crossunder(ma1, ma2)

plot(showFIBMAs ? ma1 : na, linewidth=3)
plot(showFIBMAs ? ma2 : na)
plot(showFIBMAs ? ma3 : na)


// Fast Squeese Check WORK IN PROGRESS
// 
float singlePercent = close / 100 
if max(madist1, madist2) <= singlePercent*loosePercentClose
    bgcolor := color.yellow
    infastsqueeze := true
else
    infastsqueeze := false



// IIR MOVING AVERAGE
f(a) => a[0] // fixes mutable error
iirma(iirlength, iirsrc) =>
    cf = 2*tan(2*3.14159*(1/iirlength)/2)
    a0 = 8 + 8*cf + 4*pow(cf,2) + pow(cf,3)
    a1 = -24 - 8*cf + 4*pow(cf,2) + 3*pow(cf,3)
    a2 = 24 - 8*cf - 4*pow(cf,2) + 3*pow(cf,3)
    a3 = -8 + 8*cf - 4*pow(cf,2) + pow(cf,3)
    //----
    c = pow(cf,3)/a0
    d0 = -a1/a0
    d1 = -a2/a0
    d2 = -a3/a0
    //----
    out = 0.
    out := nz(c*(iirsrc + iirsrc[3]) + 3*c*(iirsrc[1] + iirsrc[2]) + d0*out[1] + d1*out[2] + d2*out[3],iirsrc)
    f(out)


iirma1 = iirma(multiplier(iirRes, iirlength1), close)
iirma2 = iirma(multiplier(iirRes, iirlength2), close)
iirma3 = iirma(multiplier(iirRes, iirlength3), close)

// adjusts length for current resolution now, length is lengthened/shortened accordingly, upholding exact placement of lines
// iirmaD1 = security(syminfo.tickerid, tostring(iirRes), iirma1, barmerge.gaps_on, barmerge.lookahead_on)
// iirmaD2 = security(syminfo.tickerid, tostring(iirRes), iirma2, barmerge.gaps_on, barmerge.lookahead_on)
// iirmaD3 = security(syminfo.tickerid, tostring(iirRes), iirma3, barmerge.gaps_on, barmerge.lookahead_on)

slope1color = slope1Green ? color.lime : color.blue
slope2color = slope2Green ? color.lime : color.blue
slope3color = slope3Green ? color.lime : color.blue

plot(showIIR1 and showIIRs ? iirma1 : na, title="IIR1", color=slope1color, linewidth=2, transp=30)
plot(showIIR2 and showIIRs ? iirma2 : na, title="IIR2", color=slope2color, linewidth=3, transp=30)
plot(showIIR3 and showIIRs ? iirma3 : na, title="IIR3", color=slope3color, linewidth=4, transp=30)

// checks slope of IIRs to create a boolean variable and and color it differently
if (iirma1[0] >= iirma1[1])
    slope1Green := true
else
    slope1Green := false
if (iirma2[0] >= iirma2[1])
    slope2Green := true
else
    slope2Green := false
if (iirma3[0] >= iirma3[1])
    slope3Green := true
else
    slope3Green := false

// calculate space between IIRs and then if the price jumps above both
//float singlePercent = close / 100  // = a single percent
var float distIIR1 = na
var float distIIR2 = na
distIIR1 := abs(iirma1 - iirma2)
distIIR2 := abs(iirma1 - iirma3)

if (distIIR1[0] < percentClose*singlePercent and close[0] >= iirma1[0])
    if close[0] >= iirma2[0] and close[0] >= iirma3[0]
        bgcolor := color.green
        insqueeze := true
        intightsqueeze := true
    else
        bgcolor := color.lime
        insqueeze := true
        intightsqueeze := false
else
    insqueeze := false
    intightsqueeze := false


// if (true)//sinceSmSignal > 0) //  cutting down on fastest MAs noise
//     sinceSmSignal := sinceSmSignal + 1
//     if (crossoverAB)
//         //checkEntry()
//         //smbuySignal := true
//         sinceSmSignal := 0
//     if (crossunderAB) // and all NOT greennot (slope1Green and slope2Green and slope3Green)
//         //checkExit()
//         //smsellSignal := true
//         sinceSmSignal := 0
// else
//     sinceSmSignal := sinceSmSignal + 1


f_draw_infopanel(_x, _y, _line, _text, _color)=>
    _rep_text = ""
    for _l = 0 to _line
        _rep_text := _rep_text + "\n"
    _rep_text := _rep_text + _text
    var label _la = na
    label.delete(_la)
    _la := label.new(
         x=_x, y=_y, 
         text=_rep_text, xloc=xloc.bar_time, yloc=yloc.price, 
         color=color.black, style=label.style_labelup, textcolor=_color, size=size.normal)

posx = timenow + round(change(time)*60)
posy = highest(50)

// CONSTRUCTION ZONE
// TODO:  program way to eliminate noise and false signals
// MAYBEDO: program it to differentiate between a moving average bump and a cross
//          I think the best way would be to calculate the tangent line... OR
//          Take the slope of both going back a couple bars and if it's close enough, its a bounce off
//          and an excellent entry signal
// program in quickest exit, 2 bars next to eachother both closing under, as to avoid a single wick from
// prompting to close the trade
// Some other time, have it move SMA up or down depending on whether trending up or down.  Then use those MA crosses

//THIS CHECKS THE SLOPE FROM CURRENT PRICE TO BACK 10 BARS
checkSlope(_series) =>  (_series[0]/_series[10])*100 // it now returns it as a percentage

doNewX = input(true, type=input.bool, title="══════════ Show misc MA Cross Strategy ══════════")

iirX = input(13, title="IIRx Length: ", type=input.integer)
iirXperiod = input(21, title="IIRx Period/TF: ", type=input.integer)

iirX2 = input(144, title="IIRx2 Length: ", type=input.integer)
iirX2period = input(233, title="IIRx2 Period/TF: ", type=input.integer) //15

almaXperiod = input(defval=21, title="Alma of IIR1 Period: ", type=input.integer)
almaXalpha = input(title="Alma Alpha Value: ", defval=.99, maxval=.99, type=input.float)
almaXsigma = input(title="Alma Sigma Value: ", defval=8, type=input.float)

iirmaOTF = iirma(multiplier(iirXperiod, iirX), close)
iirma2OTF = iirma(multiplier(iirX2period, iirX2), close)
smaOTF = alma(iirmaOTF, almaXperiod, almaXalpha, almaXsigma) // maybe dont touch, its precise  // I took the ALMA of the IIRMA, and i hope thats not cheating ;)

// I could have removed this.  the multiplier function adjusts the length to fit the current timeframe while displaying the same
// smaXOTF = security(syminfo.tickerid, smaXperiod, smaOTF, barmerge.gaps_on, barmerge.lookahead_on)
// iirmaXOTF = security(syminfo.tickerid, iirXperiod, iirmaOTF, barmerge.gaps_on, barmerge.lookahead_on)
// iirmaX2OTF = security(syminfo.tickerid, iirX2period, iirma2OTF, barmerge.gaps_on, barmerge.lookahead_on)
plot(doNewX ? smaOTF : na, title="FastMA X-Over :  ", color=color.blue, linewidth=1, transp=40)
plot(doNewX ? iirmaOTF : na, title="IIR MAx :  ", color=color.purple, linewidth=1, transp=30)
plot(doNewX ? iirma2OTF : na, title="IIR MAx :  ", color=color.purple, linewidth=2, transp=20)

iirma2Up = iirma2OTF[0] > iirma2OTF[1] // just another slope up/down variable. 

//calculate spaces between averages
distiiralma = abs(iirmaOTF - smaOTF)

crossoverFast = crossover(iirmaOTF[0], smaOTF[0]) // and (iirmaOTF[1] <= smaOTF[1])
crossunderFast = crossunder(iirmaOTF[0], smaOTF[0]) // and (iirmaOTF[1] >= smaOTF[1])

if (crossoverFast and iirma2Up == true) // and (count1 != 0))// or close[0] < (lowest(barLookbackPeriod) + singlePercent*3))) // must be at most a few percent up from a recent low.  Avoid buying highs :P
    buySignal := true
    strategyOpen()
    // if (slope1Green and slope2Green and slope3Green and infastsqueeze == false)
    //     checkEntry()
if (crossunderFast)
    sellSignal := true
    checkExit()

// I feel like I didn't cite the OG author for this panel correctly. I hope I did, but there are extentions of his/her work in multiple places.
// I could have gotten it confused.
if (debug)
    f_draw_infopanel(posx, posy, 18, "distiiralma from IIR: " + tostring(distiiralma), color.lime)
    //f_draw_infopanel(posx, posy, 16, "distiirs: " + tostring(distiirX1), color.lime)
    f_draw_infopanel(posx, posy, 14, "Value of iirmaOTF: " + tostring(iirmaOTF), color.lime)
    f_draw_infopanel(posx, posy, 6, "slope X: " + tostring(abs(100 - checkSlope(iirmaOTF))), color.lime)
    f_draw_infopanel(posx, posy, 12, "value of smaOTF: " + tostring(smaOTF), color.lime)
    f_draw_infopanel(posx, posy, 6, "slopeAlma: " + tostring(abs(100 - checkSlope(smaOTF))), color.lime)
    f_draw_infopanel(posx, posy, 2, "slopeIIR2 " + tostring(abs(100 - checkSlope(iirma2OTF))), color.lime)
    f_draw_infopanel(posx, posy, 2, "slopeIIR2 " + tostring(abs(100 - checkSlope(iirma2OTF))), color.lime)


// I kept this separate because it discludes the calculations.  Its hard to hold a train of thought while fishing for the right section
bgcolor(showBackground ? bgcolor : na)
plotshape(showSignals ? buySignal : na, location=location.bottom, style=shape.circle, text="", size=size.tiny, color=color.blue, transp=60)
plotshape(showSignals ? sellSignal : na, location=location.bottom, style=shape.circle, text="", size=size.tiny, color=color.red, transp=60)
plotchar(showSignals and smbuySignal, title="smBuy", location=location.belowbar, char='↑', size=size.tiny, color=color.green, transp=0)
plotchar(showSignals and smsellSignal, title="smSell", location=location.abovebar, char='↓', size=size.tiny, color=color.orange, transp=0)

// can not display a variable. Can only match the count to a corresponding plotchar
// to display a non-constant variable, use the debug box, which was so kindly offered up by our community.
plotchar(showCounts and count1==1, title='', char='1', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==2, title='', char='2', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==3, title='', char='3', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==4, title='', char='4', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==5, title='', char='5', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==6, title='', char='6', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==7, title='', char='7', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==8, title='', char='8', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1==9, title='', char='9', location=location.belowbar, color=#2c9e2c, transp=0)
plotchar(showCounts and count1>=10, title='', char='$', location=location.belowbar, color=#2c9e2c, transp=0)
    
plotchar(showCounts and count2==1, title='', char='1', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==2, title='', char='2', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==3, title='', char='3', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==4, title='', char='4', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==5, title='', char='5', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==6, title='', char='6', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==7, title='', char='7', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==8, title='', char='8', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2==9, title='', char='9', location=location.abovebar, color=#e91e63, transp=0)
plotchar(showCounts and count2>=10, title='', char='$', location=location.abovebar, color=#e91e63, transp=0)

showRSIind = input(true, type=input.bool, title="═══════════════════ Show RSI Arrows ═══════════════════")
// Get user input
rsiSource = input(title="RSI Source", type=input.source, defval=close)
rsiLength = input(title="RSI Length", type=input.integer, defval=14)
rsiOverbought = input(title="RSI Overbought Level", type=input.integer, defval=80)
rsiOversold = input(title="RSI Oversold Level", type=input.integer, defval=20)
// Get RSI value
rsiValue = rsi(rsiSource, rsiLength)
isRsiOB = rsiValue >= rsiOverbought
isRsiOS = rsiValue <= rsiOversold
// Plot signals to chart
plotshape(isRsiOB, title="Overbought", location=location.abovebar, color=color.red, transp=0, style=shape.triangledown)
plotshape(isRsiOS, title="Oversold", location=location.belowbar, color=color.green, transp=0, style=shape.triangleup)

//reset the var variables before new calculations
buySignal := false
sellSignal := false
smbuySignal := false
smsellSignal := false
bigbuySignal := false
bigsellSignal := false

```

> Detail

https://www.fmz.com/strategy/426838

> Last Modified

2023-09-14 18:14:34
