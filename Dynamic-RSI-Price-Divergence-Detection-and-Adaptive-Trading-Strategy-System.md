
> Name

Dynamic-RSI-Price-Divergence-Detection-and-Adaptive-Trading-Strategy-System

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/972eddb5a5337bb541.png)

#### Overview
This strategy is an intelligent trading system based on RSI and price divergence, which captures market reversal signals by dynamically monitoring the divergence relationship between RSI indicators and price trends. The strategy integrates Fractals theory as auxiliary confirmation and is equipped with an adaptive stop-loss and take-profit mechanism, achieving fully automated trading execution. The system supports multi-instrument, multi-timeframe applications with strong flexibility and practicality.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. RSI Divergence Detection: Identifies potential divergence patterns by comparing the highs and lows of RSI indicators and price trends. Bearish divergence sell signals form when price makes new highs while RSI doesn't; bullish divergence buy signals form when price makes new lows while RSI doesn't.
2. Fractal Confirmation: Uses Fractals theory to analyze price structure, confirming divergence validity by detecting local highs and lows to improve signal reliability.
3. Parameter Adaptation: Introduces Sensitivity parameter to dynamically adjust fractal judgment intervals, achieving adaptation to different market environments.
4. Risk Control: Integrates percentage-based Stop Loss and Take Profit mechanisms to ensure controllable risk for each trade.

#### Strategy Advantages
1. High Signal Reliability: The dual confirmation mechanism of RSI divergence and Fractals theory greatly improves trading signal accuracy.
2. Strong Adaptability: Strategy can flexibly adjust parameters according to different market conditions, showing good environmental adaptability.
3. Comprehensive Risk Management: Integrated dynamic stop-loss and take-profit mechanisms effectively control risk exposure for each trade.
4. High Automation Level: Full automation from signal identification to trade execution reduces emotional impact from human intervention.
5. Good Scalability: Strategy framework supports multi-instrument, multi-timeframe applications, facilitating portfolio investment.

#### Strategy Risks
1. Market Environment Dependency: Divergence signal reliability may decrease in trending markets, requiring additional trend filtering mechanisms.
2. Parameter Sensitivity: Key parameters like RSI thresholds and fractal judgment intervals need careful tuning, improper parameter settings may affect strategy performance.
3. Signal Lag: Waiting for complete divergence pattern formation before confirming signals may result in delayed entry timing.
4. Market Noise Interference: False divergence signals may occur in volatile markets, requiring additional filtering conditions.

#### Strategy Optimization Directions
1. Add Trend Filtering: Introduce trend judgment indicators to filter counter-trend signals in strong trend markets, improving strategy adaptability across different market environments.
2. Optimize Parameter Adaptation: Develop dynamic parameter adjustment mechanisms based on market volatility, enhancing strategy response to market changes.
3. Improve Risk Control: Introduce dynamic stop-loss mechanisms to automatically adjust stop-loss positions based on market volatility, optimizing money management effects.
4. Enhance Signal Confirmation: Build a more comprehensive signal confirmation system by combining volume, volatility, and other market microstructure indicators.

#### Summary
The strategy constructs a robust trading system through innovative combination of RSI divergence and Fractals theory. Its advantages lie in high signal reliability, strong adaptability, and comprehensive risk control mechanisms. Through continuous optimization and improvement, the strategy is expected to maintain stable performance across different market environments. When applying to live trading, it is recommended to thoroughly test and optimize parameters according to market characteristics and strictly implement risk control measures.
> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-02 00:00:00
end: 2025-01-09 00:00:00
period: 5m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//FRACTALS
//@version=5

//last : 30m 70 68 22 25 0 0 4.7 11.5

//init
capital=1000
percent=100
fees=0//in percent for each entry and exit

//Inputs
start = input(timestamp("1 Feb 2002"), "Start Time", group = "Date")
end = input(timestamp("1 Feb 2052"), "End Time", group = "Date")

//Strategy
strategy("Divergence Finder (RSI/Price) Strategy with Options", overlay = true, initial_capital=capital, default_qty_value=percent, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, calc_on_order_fills=false,process_orders_on_close=true , commission_value=fees, currency=currency.EUR, calc_on_every_tick=true, use_bar_magnifier=false)
//indicator("Divergence Finder (RSI/Price) with Options", overlay=true, max_boxes_count=200, max_bars_back=500,max_labels_count=500)


srcUp=input.source(close, "Source for Price Buy Div", group="sources")
srcDn=input.source(close, "Source for Price Sell Div", group="sources")
srcRsi=input.source(close, "Source for RSI Div", group="sources")


HighRSILimit=input.int(70, "Min RSI for Sell divergence (p1:pre last)", group="signals", inline="1", step=1)
HighRSILimit2=input.int(68, "Min RSI for Sell divergence (p2):last", group="signals", inline="1", step=1)
LowRSILimit=input.int(22, "Min RSI for Buy divergence (p1:pre last)", group="signals", inline="2", step=1)
LowRSILimit2=input.int(25, "Min RSI for Buy divergence (p2:last)", group="signals", inline="2", step=1)


minMarginP=input.float(0, "Min margin between price for displaying divergence (%)", group="signals", step=0.01)
minMarginR=input.float(0, "Min margin between RSI for displaying divergence (%)", group="signals", step=1)

nb=input.int(2, "Sensivity: Determine how many candle will be used to determine last top or bot (too high cause lag, too low cause repaint)", group="Sensivity", inline="3", step=1)


stopPer= input.float(4.7, title='Stop %', group = "Per", inline="3", step=0.01)
tpPer = input.float(11.5, title='TP %', group = "Per", inline="4", step=0.01)

//nb=2
leftBars = nb
rightBars=nb


labels=input.bool(true, "Display Divergence labels", group="Display")
draw=input.bool(true, "Display tops/bottoms")



dnFractal = (close[nb-2] < close[nb]) and (close[nb-1] < close[nb]) and (close[nb+1] < close[nb]) and (close[nb+2] < close[nb])
upFractal = (close[nb-2] > close[nb]) and (close[nb-1] > close[nb]) and (close[nb+1] > close[nb]) and (close[nb+2] > close[nb])
ph=dnFractal
pl=upFractal

plot(dnFractal and draw ? close[nb] : na, style=plot.style_line,offset=-2, color=color.lime, title="tops")
plot(upFractal and draw ? close[nb] : na,  style=plot.style_line, offset=-2, color=color.red, title="botts")

plotchar(dnFractal ? high[nb] : na, char='⮝',location=location.absolute,offset=-2, color=color.rgb(236, 255, 63), title="Down Fractal")
plotchar(upFractal ? low[nb] : na, char='⮟', location=location.absolute, offset=-2, color=color.rgb(67, 227, 255), title="Up Fractal")


float myRSI=ta.rsi(srcRsi, 14)

bool divUp=false
bool divDn=false

//compare lasts bots
p2=ta.valuewhen( ph,srcDn[nb], 0 ) //last price
p1=ta.valuewhen( ph,srcDn[nb], 1 ) //pre last price

r2=ta.valuewhen( ph,myRSI[nb], 0 )  //last rsi
r1=ta.valuewhen( ph,myRSI[nb], 1 )  //pre last rsi


if ph
    if p1 < p2// - (p2 * minMarginP)/100
        if r1 > HighRSILimit and r2 > HighRSILimit2
            if r1 > r2 + (r2 * minMarginR)/100
                divDn:=true

plot(divDn ? close:na, style=plot.style_cross, linewidth=3, color= color.red, offset=-rightBars, title="Sell Div")
if labels and divDn and strategy.position_size >= 0
    label.new(bar_index-nb,high, "Sell Divergence "+str.tostring(p1)+"   "+str.tostring(math.round(r1, 2))+"  "+str.tostring(p2)+"   "+str.tostring(math.round(r2, 2)),xloc=xloc.bar_index,yloc=yloc.abovebar, color = color.red, style = label.style_label_down)
else if divDn and strategy.position_size >= 0
    label.new(bar_index-nb,high, "Sell Divergence",xloc=xloc.bar_index,yloc=yloc.abovebar, color = color.red, style = label.style_label_down)



p2:=ta.valuewhen( pl,srcUp[nb], 0 )
p1:=ta.valuewhen( pl,srcUp[nb], 1 )

r2:=ta.valuewhen( pl,myRSI[nb], 0 )
r1:=ta.valuewhen( pl,myRSI[nb], 1 )


if pl
    if p1 > p2 + (p2 * minMarginP)/100
        if r1 < LowRSILimit and r2 < LowRSILimit2
            if r1 < r2 - (r2 * minMarginR)/100
                divUp:=true
               
plot(divUp ? close:na, style=plot.style_cross, linewidth=3, color= color.green, offset=-rightBars, title="Buy Div")
if labels and divUp and strategy.position_size <= 0
    label.new(bar_index-nb,high, "Buy Divergence "+str.tostring(p1)+"   "+str.tostring(math.round(r1, 2))+"  "+str.tostring(p2)+"   "+str.tostring(math.round(r2, 2)),xloc=xloc.bar_index,yloc=yloc.belowbar, color = color.green, style = label.style_label_up)
else if divUp and strategy.position_size <= 0
    label.new(bar_index-nb,high, "Buy Divergence",xloc=xloc.bar_index,yloc=yloc.belowbar, color = color.green, style = label.style_label_up)


//strat LONG
longEntry = divUp//  and strategy.position_size == 0
longExit = divDn//  and strategy.position_size == 0

//strat SHORT
shortEntry = divDn
shortExit = divUp

LongActive=input(true, title='Activate Long', group = "Directions", inline="2")
ShortActive=input(true, title='Activate Short', group = "Directions", inline="2")
//StopActive=input(false, title='Activate Stop', group = "Directions", inline="2")


//tpActive =  input(false, title='Activate Take Profit', group = "TP", inline="4")
//RR=input(0.5, title='Risk Reward Multiplier', group = "TP")
//QuantityTP = input(100.0, title='Trade Ammount %', group = "TP")


//calc stop
//longStop = strategy.position_avg_price * (1 - stopPer)
//shortStop = strategy.position_avg_price * (1 + stopPer)

longStop = strategy.position_avg_price - (strategy.position_avg_price * stopPer/100)
shortStop = strategy.position_avg_price + (strategy.position_avg_price * stopPer/100)

longTP = strategy.position_avg_price + (strategy.position_avg_price * tpPer/100)
shortTP = strategy.position_avg_price - (strategy.position_avg_price * tpPer/100)

//Calc TP
//longTP = ((strategy.position_avg_price-longStop)*RR+strategy.position_avg_price)
//shortTP = (strategy.position_avg_price-((shortStop-strategy.position_avg_price)*RR))


//display stops
plot(strategy.position_size > 0 ? longStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Fixed SL")
plot(strategy.position_size < 0 ? shortStop : na, style=plot.style_linebr, color=color.purple, linewidth=1, title="Short Fixed SL")


//display TP
plot(strategy.position_size > 0 ? longTP : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Long Fixed TP")
plot(strategy.position_size < 0 ? shortTP : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Short Fixed TP")

//do
if true
    //check money available
    if strategy.equity > 0
        //if tpActive //Need to put TP before Other exit
        strategy.exit("Close Long", from_entry="Long", limit=longTP,stop=longStop, comment="Close Long with : "+ str.tostring(math.round(strategy.equity)) +" $ ", qty_percent=100)
        strategy.exit("Close Short", from_entry="Short", limit=shortTP,stop=shortStop, comment="Close Short with : "+ str.tostring(math.round(strategy.equity)) +" $ ", qty_percent=100)
        //Set Stops
        //if StopActive
        //    strategy.exit("Stop Long", from_entry="Long", stop=longStop, comment="Stop Long with : "+ str.tostring(math.round(strategy.equity)) +" $ ")
        //    strategy.exit("Stop Short", from_entry="Short", stop=shortStop, comment="Stop Short with : "+ str.tostring(math.round(strategy.equity)) +" $ ")
        if longEntry
            if ShortActive
                strategy.close("Short",comment="Close Short with : "+ str.tostring(math.round(strategy.equity)) +" $ ")
                alert("Close Short")
            if LongActive
                strategy.entry("Long", strategy.long, comment="Open Long with : "+ str.tostring(math.round(strategy.equity)) +" $ ")
                alert("Open Long")
        if longExit
            if LongActive
                strategy.close("Long",comment="Close Long with : "+ str.tostring(math.round(strategy.equity)) +" $ ")
                alert("Close Long")
            if ShortActive
                strategy.entry("Short", strategy.short, comment="Open Short with : "+ str.tostring(math.round(strategy.equity)) +" $ ")
                alert("Open Short")


//alertcondition(longEntry and LongActive, title="Buy Divergence Open", message="Buy Divergence Long Opened!")
//alertcondition(longExit and ShortActive, title="Sell Divergence Open", message="Buy Divergence Short Opened!")

//alertcondition(longExit and LongActive, title="Buy Divergence Closed", message="Buy Divergence Long Closed!")
//alertcondition(longEntry and ShortActive, title="Sell Divergence Closed", message="Buy Divergence Short Closed!")

```

> Detail

https://www.fmz.com/strategy/477971

> Last Modified

2025-01-10 16:20:25
