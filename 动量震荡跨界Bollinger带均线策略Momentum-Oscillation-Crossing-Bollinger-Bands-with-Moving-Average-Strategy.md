
> Name

动量震荡跨界Bollinger带均线策略Momentum-Oscillation-Crossing-Bollinger-Bands-with-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13f8bcd85b80b7f898c.png)
[trans]

## 概述

该策略是基于Bollinger带和MACD指标的量化交易策略。它融合了两种主流的技术指标来识别交易机会,旨在在趋势行情中获得较高的胜率。

策略会在价格突破Bollinger带下轨时建立做多头寻求Trend Following,在价格突破上轨时平仓;同时利用MACD指标判断动量方向过滤虚假突破。可配置RSI指标辅助判断超买超卖进一步避免损失。

## 策略原理  

该策略主要由Bollinger带指标和MACD指标组成。

Bollinger带是根据股价的标准差计算上下轨,股价向上突破上轨时为超买信号,向下跌破下轨时为超卖信号。本策略在价格向下突破下轨时做多,跌破上轨时平仓止损。

MACD指标则判断股价的动量和方向。短期平均线突破长期平均线为买入信号,反之为卖出信号。本策略结合MACD指标来过滤Bollinger带的虚假突破。

另外,RSI指标可辅助判断是否超买超卖。RSI低位时表示超卖,可以增强买入信号,RSI高位时表示超买,可以增强卖出信号。

## 策略优势  

该策略结合了Bollinger带、MACD和RSI三种指标,可以有效判断价格趋势和波动。具有如下优势:

1. Bollinger带判断价格波动范围,能抓住Trend Following
2. MACD判断动量方向,过滤Bollinger的误报
3. RSI辅助判断超买超卖,避免建仓追高
4. 可通过参数优化获得较高胜率

## 策略风险  

该策略也存在一些风险需要警惕:  

1. 股价剧烈波动时,止损风险较大
2. 参数设置不当时,获利能力会下降  
3. 趋势行情逆转时,MACD指标会误判

对策:

1. 可适当放宽止损幅度
2. 需多次回测找到最佳参数组合 
3. 可利用更多指标预测价格转折

## 策略优化方向

该策略有以下几个主要的优化方向:  

1. 优化Bollinger带的参数,适应更多市场环境
2. 增加更多指标判断,提高策略稳定性  
3. 利用机器学习算法自动优化参数
4. 在高频数据上测试策略效果
5. 增加资金管理模块,控制单笔损失

## 总结  

本策略总体来说是一种典型的趋势跟踪策略。它结合多种技术指标增强稳定性,在判断准确时能获得不错的胜率。但也存在一定的风险需要注意。通过持续优化和调整,可以进一步提升策略表现。

||


## Overview  

This is a quantitative trading strategy based on Bollinger Bands and MACD indicators. It combines two mainstream technical indicators to identify trading opportunities, aiming to achieve higher win rate in trending markets.  

The strategy will establish long position when price breaks through the lower band of Bollinger Bands for trend following, and close position when price breaks through upper band. MACD indicator is used to filter false breakout by judging momentum direction. RSI indicator can be configured to assist in identifying overbought and oversold levels to further avoid losses.

## Strategy Logic

The strategy consists mainly of Bollinger Bands and MACD indicators.  

Bollinger Bands calculate upper and lower bands based on standard deviation of prices. Upward breakout of upper band signals overbought condition, while downward breakout of lower band signals oversold condition. This strategy goes long when price breaks down the lower band, and closes position when it breaks up the upper band.

MACD indicator judges momentum and direction of prices. Crossover of short term moving average above long term moving average is buy signal, while crossover below is sell signal. MACD helps filter false breakout of Bollinger Bands in this strategy.

Additionally, RSI indicator can assist in identifying overbought/oversold levels. Low RSI represents oversold and enhances buy signal, while high RSI represents overbought and enhances sell signal.

## Advantages of the Strategy   

The strategy combines Bollinger Bands, MACD and RSI indicators, which can effectively determine price trend and volatility. Its advantages include:

1. Bollinger Bands capture trend following when price breaks out of bands  
2. MACD filters false signals from Bollinger Bands by judging momentum
3. RSI avoids buying at peak by identifying overbought/oversold levels
4. Higher win rate can be achieved through parameter optimization

## Risks of the Strategy

There are also some risks to be aware of:   

1. High risk of stop loss when prices fluctuate violently
2. Profitability decreases with improper parameter settings
3. MACD may misjudge when trend reverses  

Countermeasures:  

1. Stop loss percentage can be loosened appropriately 
2. Extensive backtesting required to find optimum parameters
3. More indicators can be used to predict trend reversal  

## Directions for Optimization

Major directions to optimize the strategy include:

1. Optimize parameters of Bollinger Bands for more market regimes 
2. Increase indicators to improve robustness
3. Utilize machine learning to auto optimize parameters  
4. Test strategy performance on high frequency data
5. Add risk management module to limit per trade loss

## Conclusion   

Overall this is a typical trend following strategy. By combining multiple technical indicators, it improves robustness and can achieve decent win rate when signals are accurate. However risks need to be monitored. Further improvements can be made through continuous optimization and tuning.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Simple bot: simple|composite|
|v_input_2||3Commas Bot ID|
|v_input_3||Bot Email Token|
|v_input_4|10|Base order size|
|v_input_5|400|Safety order size|
|v_input_6|1.83|Safety Order Vol Scale (%)|
|v_input_7|1.55|Safety Order Step Scale (%)|
|v_input_8|2|Max Number of Safety Orders|
|v_input_9|1.54|Initial SO Deviation (%)|
|v_input_10|15|Long Stop Loss (%)|
|v_input_11|1.4|Long Take Profit (%)|
|v_input_12|21|Short MA Window|
|v_input_13|100|Long MA Window|
|v_input_14|2.2|Upper Band Offset|
|v_input_15|2.4|Lower Band Offset|
|v_input_16|0|Entrry at Cross Over/Under Lower: under|over|
|v_input_17|true|Start Date|
|v_input_18|true|Start Month|
|v_input_19|2016|Start Year|
|v_input_20|31|End Date|
|v_input_21|12|End Month|
|v_input_22|2022|End Year|
|v_input_47|true|Use long?|
|v_input_48|true|Use short?|
|v_input_23|23|(?MACD)Fast Length|
|v_input_24|16|Slow Length|
|v_input_25_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_26|9|Signal Smoothing|
|v_input_27|0|Simple MA FAST (Oscillator): EMA|DHMA|THMA|FHMA|WMA|DWMA|TWMA|FWMA|SMA|DSMA|TSMA|FSMA|HMA|DEMA|TEMA|FEMA|RMA|DRMA|TRMA|FRMA|
|v_input_28|0|Simple MA SLOW (Oscillator): EMA|DHMA|THMA|FHMA|WMA|DWMA|TWMA|FWMA|SMA|DSMA|TSMA|FSMA|HMA|DEMA|TEMA|FEMA|RMA|DRMA|TRMA|FRMA|
|v_input_29|0|Simple MA(Signal Line): EMA|DHMA|THMA|FHMA|WMA|DWMA|TWMA|FWMA|SMA|DSMA|TSMA|FSMA|HMA|DEMA|TEMA|FEMA|RMA|DRMA|TRMA|FRMA|
|v_input_30|true|(?Stress)Use stress on recent bars|
|v_input_31|0.41|Stress on recent bars|
|v_input_32|6|Level of stress|
|v_input_33|true|(?Moving Average)Use moving average (MACD)?|
|v_input_34|36|Length|
|v_input_35|0|Type MA: THMA|DHMA|HMA|FHMA|WMA|DWMA|TWMA|FWMA|SMA|DSMA|TSMA|FSMA|EMA|DEMA|TEMA|FEMA|RMA|DRMA|TRMA|FRMA|
|v_input_36|true|(?Linear Regression)Use linear regression (MACD)?|
|v_input_37|10|Length|
|v_input_38|true|Offset|
|v_input_39|false|(?Condition entry/exit)Use cross macd and signal|
|v_input_40|true|Use min/max macd|
|v_input_41|false|(?RSI)Use RSI filter?|
|v_input_42|true|Use RSI Take Profit?|
|v_input_43|22|RSI period|
|v_input_44_close|0|RSI source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_45|90|Overbought height|
|v_input_46|45|Oversold height|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-12-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tedwardd

// This strategy is intended to help users of the 3commas.io platform backtest bot performance based on a Bollinger Strategy.
// It can also be used to signal a bot to open a deal by providing the Bot ID, email token and trading pair in the strategy settings screen.
// As currently written, this strategy uses a basic Bollinger Band strategy, recommening a deal start when the closing price crosses under the lower band.
// The thick red line plotted on the chart shows the average entry price of the current deal.

strategy("[v1.3laoowai]BNB_USDT_3m_3Commas_Bollinger_Strategy_by_tedwardd", overlay=true, default_qty_type=strategy.cash, default_qty_value=1000, initial_capital=900, currency="USD", commission_value=0.1)

// 3Commas Bot settinsg
bot_type                = input(title="Simple bot", defval="simple", options=["simple", "composite"])
bot_id                  = input(title="3Commas Bot ID", defval="")
email_token             = input(title="Bot Email Token", defval="")
base_order_size         = input(title="Base order size",minval=10, step=1, defval=10)
safety_order_size       = input(title="Safety order size", minval=15, step=1, defval=400)
volume_scale            = input(title="Safety Order Vol Scale (%)", minval=0.00, step=0.01, defval=1.83)
safety_step             = input(title="Safety Order Step Scale (%)", minval=0.00, step=0.1, defval=1.55)
safety_max              = input(title="Max Number of Safety Orders", minval=0, step=1, defval=2)
initial_deviation_input = input(title="Initial SO Deviation (%)", minval=0, step=0.01, defval=1.54) * 0.01
stoploss_input          = input(title="Long Stop Loss (%)", minval=0, step=1, defval=15) * 0.01
takeprofit_input        = input(title="Long Take Profit (%)", minval=0, step=1, defval=1.4) * 0.01

// USER INPUTS
sma_short_val           = input(title="Short MA Window", defval=21)
sma_long_val            = input(title="Long MA Window", defval=100)
ubOffset                = input(title="Upper Band Offset", defval=2.2, step=0.5)
lbOffset                = input(title="Lower Band Offset", defval=2.40, step=0.5)
cross                   = input(title="Entrry at Cross Over/Under Lower", defval="under", options=["over", "under"])

// Backtesting Date Ranges
startDate  = input(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", defval=1, minval=1, maxval=12)
startYear  = input(title="Start Year", defval=2016, minval=1800, maxval=2100)
endDate    = input(title="End Date", defval=31, minval=1, maxval=31)
endMonth   = input(title="End Month", defval=12, minval=1, maxval=12)
endYear    = input(title="End Year", defval=2022, minval=1800, maxval=2100)

// VARS
short_sma        = sma(close, sma_short_val)
long_sma         = sma(close, sma_long_val)
stdDev           = stdev(close, sma_short_val)
upperBand        = short_sma + (stdDev * ubOffset)
lowerBand        = short_sma - (stdDev * lbOffset)
stoploss_value   = strategy.position_avg_price * (1 - stoploss_input)
takeprofit_value = strategy.position_avg_price * (1 + takeprofit_input)
initial_dev_val  = strategy.position_avg_price * (1 - initial_deviation_input)
inDateRange      = true

initial_deviation = close < initial_dev_val

// Market Conditions
goodBuy    = cross=="over"?crossover(close, lowerBand):crossunder(close, lowerBand) // Buy when close crossing lower band
safety     = initial_deviation and (1-(close/strategy.position_avg_price))/.01 > strategy.opentrades-1 * safety_step and strategy.opentrades <= safety_max // SO when price deviates below SO threshold %
stoploss   = close <= stoploss_value // Stoploss condition - true if closing price for current bar drops below stoploss %
takeprofit = close >= takeprofit_value // Take profit condition - true if closing price for current bar is >= take profit percentage
goodSell = crossover(high, upperBand)

// goodSell is currently unused for any practical purpose. If you wish to try it, switch these two values. 
// Doing so will make sell suggestions at high crossover upper bollinger but it does not trigger the bot to sell as written but may affect backtest results

// Plot some lines
plot(short_sma, color=color.green)
plot(upperBand)
plot(lowerBand, color=color.yellow)
plot(strategy.position_avg_price, color=color.red, linewidth=3)


// Webhook message. Defaults to string. To signal 3c bot, fill in bot_id and email_token in user settings
var enter_msg = "Enter Position"
var exit_msg  = "Exit Position"
var close_all = "Exit Position"
if bot_id != "" and email_token != ""
    if bot_type == "composite"
        enter_msg := '{"message_type": "bot", "bot_id": ' + bot_id + ', "email_token": "' + email_token + '", "delay_seconds": 0, "pair": "' + syminfo.currency + "_" + syminfo.basecurrency + '"}'
    else
        enter_msg := '{"message_type": "bot", "bot_id": ' + bot_id + ',  "email_token": "' + email_token + '", "delay_seconds": 0}'
    if bot_type == "composite"
        exit_msg := '{"message_type": "bot", "bot_id": ' + bot_id + ', "email_token": "' + email_token + '", "delay_seconds": 0, "pair": "' + syminfo.currency + "_" + syminfo.basecurrency + '", "action": "close_at_market_price"}'
    else
        exit_msg := '{"message_type": "bot", "bot_id": ' + bot_id + ', "email_token": "' + email_token + '", "delay_seconds": 0, "action": "close_at_market_price"}'
    close_all := '{"message_type": "bot", "bot_id": ' + bot_id + ', "email_token": "' + email_token + '", "delay_seconds": 0, "action": "close_at_market_price_all"}'

actual_safety_size = float(safety_order_size) // Set safety order size to starting safety
if strategy.opentrades > 1 // If we have more than two open trades we need to start scaling the safety size by the volume_scale
    actual_safety_size := (strategy.position_size - base_order_size) * volume_scale // Remove base order from total position size and scale it for next safety order

// Momentum Strategy (BTC/USDT; 1h) - MACD (with source code) by Drun30

//@version=4
// Getting inputs
fast_length = input(title="Fast Length", type=input.integer, defval=23,group="MACD")
slow_length = input(title="Slow Length", type=input.integer, defval=16,group="MACD")
src = input(title="Source", type=input.source, defval=open,group="MACD")

signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9,group="MACD")
sma_source1 = input(title="Simple MA FAST (Oscillator)", defval="EMA", options=["HMA","DHMA","THMA","FHMA","WMA","DWMA","TWMA","FWMA","SMA","DSMA","TSMA","FSMA","EMA","DEMA","TEMA","FEMA","RMA","DRMA","TRMA","FRMA"],group="MACD")
sma_source2 = input(title="Simple MA SLOW (Oscillator)", defval="EMA", options=["HMA","DHMA","THMA","FHMA","WMA","DWMA","TWMA","FWMA","SMA","DSMA","TSMA","FSMA","EMA","DEMA","TEMA","FEMA","RMA","DRMA","TRMA","FRMA"],group="MACD")

sma_signal = input(title="Simple MA(Signal Line)",defval="EMA", options=["HMA","DHMA","THMA","FHMA","WMA","DWMA","TWMA","FWMA","SMA","DSMA","TSMA","FSMA","EMA","DEMA","TEMA","FEMA","RMA","DRMA","TRMA","FRMA"],group="MACD")
// Calculating
ma(source,length,type)=>
    type=="FEMA"?4*ema(source,length)-ema(ema(ema(ema(source,length),length),length),length):type=="FSMA"?4*sma(source,length)-sma(sma(sma(sma(source,length),length),length),length):type=="FWMA"?4*wma(source,length)-wma(wma(wma(wma(source,length),length),length),length):type=="FRMA"?4*rma(source,length)-rma(rma(rma(rma(source,length),length),length),length):type=="TEMA"?3*ema(source,length)-ema(ema(ema(source,length),length),length):type=="TSMA"?3*sma(source,length)-sma(sma(sma(source,length),length),length):type=="TWMA"?3*wma(source,length)-wma(wma(wma(source,length),length),length):type=="TRMA"?3*rma(source,length)-rma(rma(rma(source,length),length),length):type=="EMA"?ema(source,length):type=="SMA"?sma(source,length):type=="WMA"?wma(source,length):type=="RMA"?rma(source,length):type=="DEMA"?2*ema(source,length)-ema(ema(source,length),length):type=="DSMA"?2*sma(source,length)-sma(sma(source,length),length):type=="DWMA"?2*wma(source,length)-wma(wma(source,length),length):type=="DRMA"?2*rma(source,length)-rma(rma(source,length),length):type=="HMA"?hma(source,length):type=="DHMA"?2*hma(source,length)-hma(hma(source,length),length):type=="THMA"?3*hma(source,length)-hma(hma(hma(source,length),length),length):type=="FHMA"?4*hma(source,length)-hma(hma(hma(hma(source,length),length),length),length):ema(source,length)
fast_ma = ma(src,fast_length,sma_source1)  
slow_ma = ma(src,slow_length,sma_source2)
macd = fast_ma - slow_ma //Differenza tra la media mobile veloce e quella lenta 
signal = ma(macd,signal_length,sma_signal) //usa o la SMA oppure la EMA sulla differenza tra la media mobile veloce e lenta
hist = macd - signal //Differenza tra la differenza precedente e la media mobile della differenza

use_stress=input(true,title="Use stress on recent bars",group="Stress")
recent_stress=input(0.41,title="Stress on recent bars",group="Stress",step=0.01,minval=0.01,maxval=0.99)
level=input(6,title="Level of stress",group="Stress")
if use_stress 
    macd:=macd*(1/(1-recent_stress))
    if not na(macd[1])
        macd:=pow((macd*(recent_stress)),level)+(1-recent_stress*macd[1])

use_ma= input(true,title="Use moving average (MACD)?",group="Moving Average")
if use_ma
    macd:=ma(macd,input(36,title="Length",group="Moving Average"),input(title="Type MA",defval="THMA", options=["HMA","DHMA","THMA","FHMA","WMA","DWMA","TWMA","FWMA","SMA","DSMA","TSMA","FSMA","EMA","DEMA","TEMA","FEMA","RMA","DRMA","TRMA","FRMA"],group="Moving Average"))

use_linreg= input(true,title="Use linear regression (MACD)?",group="Linear Regression")
if use_linreg
    macd:=linreg(macd,input(10,title="Length",group="Linear Regression"),input(1,title="Offset",group="Linear Regression"))

//macd == linea blu (differenza tra media mobile veloce e media mobile lenta)
//signal == linea arancione (media mobile dell'macd)
//hist == istogramma (differenza tra macd e media mobile)

on_cross = input(false,title="Use cross macd and signal",group="Condition entry/exit")
on_minmax = input(true,title="Use min/max macd",group="Condition entry/exit")


aperturaLong = change(macd)>0//crossover(macd,signal)
aperturashort=not (change(macd)>0)//crossunder(macd,signal)

if on_cross
    on_minmax:=false
    aperturaLong := crossover(macd,signal)
    aperturashort := crossunder(macd,signal)
if on_minmax
    on_cross:=false
    aperturaLong := change(macd)>0//crossover(macd,signal)
    aperturashort:=change(macd)<0//crossunder(macd,signal)

rsiFilter = input(false,title="Use RSI filter?",group="RSI")
rsiTP = input(true,title="Use RSI Take Profit?",group="RSI")

len=input(22,title="RSI period",group="RSI")
srcr=input(close,title="RSI source",group="RSI")
rsi=rsi(srcr,len)
ovb=input(90,title="Overbought height",group="RSI") 
ovs=input(45,title="Oversold height",group="RSI")
okLong=rsi<ovb and change(macd)>0 and change(macd)[1]<=0
okShort=rsi>ovs and change(macd)<0 and change(macd)[1]>=0
if not rsiFilter
    okLong:=true
    okShort:=true
    
usiLong=input(true,title="Use long?")
usiShort=input(true,title="Use short?")

chiusuraShort=rsi<ovs or (aperturaLong)
chiusuraLong=rsi>ovb or (aperturashort)
if rsiTP
    aperturaLong := change(macd)>0 and change(macd)[1]<=0 and rsi<ovb//crossover(macd,signal)
    aperturashort:=change(macd)<0 and change(macd)[1]>=0 and rsi>ovs//crossunder(macd,signal)

if not rsiTP
    chiusuraShort:=okLong and aperturaLong
    chiusuraLong:=okShort and aperturashort
    
//if chiusuraShort 
//    strategy.close("SHORTISSIMO")
//if usiLong and strategy.position_size<=0 and okLong and aperturaLong
//    strategy.entry("LONGHISSIMO",true)
//if chiusuraLong 
//    strategy.close("LONGHISSIMO")
//if usiShort and strategy.position_size>=0 and okShort and aperturashort
//    strategy.entry("SHORTISSIMO",false)

// Strategy Actions
//Buy
if inDateRange and goodBuy
    strategy.entry("Good Buy", strategy.long, base_order_size, when = strategy.opentrades <= 0, alert_message=enter_msg)
if inDateRange and safety
    strategy.order("Good Buy", strategy.long, actual_safety_size, when = strategy.opentrades > 0, comment = "safety order", alert_message=enter_msg)

// Sell
if inDateRange and goodSell
    strategy.close_all(comment="Good sell point", alert_message=exit_msg)
if inDateRange and stoploss
    strategy.close_all(comment="Stoploss", alert_message=exit_msg)
//if inDateRange and takeprofit
//    strategy.close_all(comment="TP Target", alert_message=exit_msg)
if usiShort and strategy.position_size>=0 and okShort and aperturashort
    strategy.close_all(comment="SHORTISSIMO", alert_message=exit_msg)
//if chiusuraShort
//    strategy.close_all(comment="SHORTISSIMO1")
```

> Detail

https://www.fmz.com/strategy/435845

> Last Modified

2023-12-19 11:34:46
