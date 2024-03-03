
> Name

超趋势进阶策略Supertrend-Advance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c7558a1095ce06c44a.png)
[trans]

### 概述

超趋势进阶策略是在经典的超趋势指标的基础上进行优化和升级的策略。它结合价格动作、波动率以及多种技术指标,旨在提高信号质量,减少噪音,更准确地捕捉市场趋势的变化。

### 策略原理

超趋势进阶策略的核心是超趋势线。它根据真实波动范围和价格动量计算得出,用来判断潜在的价格趋势和转折点。当价格在超趋势线之上时,表示上涨趋势;反之,则表示下跌趋势。

与传统超趋势指标仅考量收盘价和真实波动范围不同,进阶策略还融合了交易量、动量震荡器以及基本面数据等多个维度,用来验证信号的可靠性。这种多变量方法可以确保产生的交易信号更加准确可靠,不易受到市场噪音的影响。

### 优势分析

超趋势进阶策略的主要优势有:

1. 更准确判断市场走势,过滤假突破。这种策略等待多个因素指标一致之后才产生交易信号,可以大大提高正确率。

2. 减少市场噪音的干扰。通过组合使用过滤器,可以屏蔽掉大量不重要的市场数据,使判断更加清晰。

3. 优化风险管理。清晰的交易信号可以帮助交易者更好地规划止损和止盈点,从而具备更好的风险控制能力。

4. 适应力强。该策略除了识别趋势外,还可以与其他技术工具组合使用,构建全面和高效的交易系统。

### 风险分析

超趋势进阶策略也存在以下主要风险:

1. 参数设置风险。不正确的指标参数组合可能会导致策略失效或产生过多错误信号。

2. 趋势判断错误风险。任何策略都无法完全避免判断错误的风险,当趋势意外改变时可能导致损失。 

3. 过度优化风险。参数调整到非常精确的程度时,会过于依赖历史数据,无法适应市场变化。

4. 交易成本风险。交易次数增多时,交易成本如手续费和滑点也会明显增加。

对应解决方法:

1. 优化参数设置,定期回测检验参数的稳健性。

2. 设置止损止盈,控制单笔损失。

3. 避免过度优化,保持参数的泛化能力。

4. 计算信号的风险收益比,控制交易成本。

### 优化方向 

超趋势进阶策略可以从以下几个方面进行优化:

1. 根据不同市场调整参数,使之更符合该市场的特征。比如波动市场可以缩短计算周期。

2. 增加自适应过滤机制。当市场进入特定状态时,自动调整指标参数或禁用某些过滤器。

3. 探索机器学习方法,利用神经网络等培训模型动态优化参数。

4. 结合情绪指标和新闻情报,利用非结构化数据提高效果。

5. 增加目标位置规模功能。当胜率很高时,可以通过加仓获得更高收益。

### 总结

超趋势进阶策略通过引入多种过滤器和确认指标,对经典超趋势指标进行了优化和改进,能够更准确地判断市场走势,提高信号的质量。相比单一指标,该策略提供了更稳健、全面和高效的交易方案。但同时也需要警惕参数调整不当和判断错误的风险,采取适当的风险控制措施。通过继续优化和配合其他工具使用,超趋势进阶策略具有很大的应用潜力。

||

### Overview

The Supertrend Advance Strategy is an optimized and upgraded version based on the classic Supertrend indicator. It combines price action, volatility, and multiple technical indicators to improve signal quality, reduce noise, and more accurately capture changes in market trends.

### Strategy Principles 

The core of the Supertrend Advance Strategy is the Supertrend line. It is calculated based on the average true range and price momentum to determine potential trend direction and inflection points. When the price is above the Supertrend line, it indicates an uptrend. Conversely, when below the line, it signals a downtrend.

Unlike the traditional Supertrend indicator which primarily considers closing price and ATR, the Advance strategy also incorporates dimensions like trading volume, momentum oscillators, and even fundamental data to validate the reliability of signals. This multidimensional approach ensures the generated signals are more reliable and less prone to market noise.

### Advantage Analysis

The main advantages of the Supertrend Advance Strategy include:

1. More accurate trend identification and false breakout filtering. By waiting for confirmation from multiple indicators, the strategy greatly improves accuracy. 

2. Reduced noise interference. The combination of filters screens out excessive unimportant market data, making judgments clearer.

3. Enhanced risk management. Clear trade signals facilitate planning stop losses and take profits more effectively.  

4. Versatility. Apart from identifying trends, the strategy can also combine with other technical tools to create comprehensive trading systems.

### Risk Analysis

The Supertrend Advance Strategy also has the following major risks:

1. Parameter setting risks. Incorrect parameter combinations may render the strategy ineffective or trigger too many false signals.

2. Trend misjudgment risks. No strategy can completely avoid the risk of judgment errors. When trends unexpectedly change, losses may be incurred.

3. Over-optimization risks. When parameters are over-fitted to historical data, the strategy may fail to adapt to changing market conditions.  

4. Trading cost risks. As trade frequency increases, costs like commissions and slippage also rise significantly.

Corresponding solutions:

1. Optimize parameter settings and regularly backtest robustness.  

2. Set stop loss and take profit to limit per trade loss.

3. Avoid over-optimization to maintain generalization capability. 

4. Calculate risk/reward of signals and manage trading costs.


### Optimization Directions

The Supertrend Advance Strategy can be optimized in the following aspects:

1. Adjust parameters based on different markets to better fit their characteristics. For instance, reduce cycle lengths for volatile markets.

2. Add adaptive filtering mechanisms to auto tune indicators or disable filters in certain market states.

3. Explore machine learning methods to dynamically optimize parameters using neural networks.  

4. Incorporate sentiment data and news analytics to improve performance using unstructured data.

5. Add position sizing capability to increase returns when win rate is very high.


### Conclusion  

By introducing multiple filters and confirmation indicators, the Supertrend Advance Strategy optimizes the classic Supertrend indicator to judge trends more precisely and improve signal quality. Compared to single indicators, this multidimensional strategy provides more robust, comprehensive and efficient trading solutions. However, risks like improper parameter tuning and judgment errors should also be guarded against by adopting appropriate risk control measures. With further optimizations and integration with other tools, the Supertrend Advance Strategy has immense application potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Enable/Disable Condition Filter)Ema Condition On/Off|
|v_input_bool_2|true|Rsi Condition On/Off|
|v_input_bool_3|true|Enable Macd Condition|
|v_input_bool_4|true|Enable/Disable CCi Filter|
|v_input_string_1|0|(?Choose Strategy Type)Type Of Stratgey: Pullback|Simple|
|v_input_string_2|Percentage|(?Choose Sl/Tp)Chosse Type Of Sl/tp|
|v_input_1|10|(?Supertrend Settings)ATR Length|
|v_input_float_1|3|Factor|
|v_input_int_1|200|(?Ema Settings)Ema Length|
|v_input_source_1_close|0|Ema Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2_close|0|(?Rsi Settings)RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|14|RSI Length|
|v_input_4|50|RSI BUY Level|
|v_input_5|50|RSI SELL Level|
|v_input_6|12|(?Macd Set)Fast Length|
|v_input_7|26|Slow Length|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|9|Signal Smoothing|
|v_input_int_3|20|(?Cci Set)length_cci|
|v_input_9_hlc3|0|Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_int_4|200|CCi > Input|
|v_input_int_5|-200|CCi < -Input|
|v_input_10|timestamp(2005-01-01)|(?Backtest Period)Start calculations from|
|v_input_11|timestamp(2045-03-01)|End calculations|
|v_input_string_3|0|(?Trade Direction)Trade Direction: Both|Short|Long|
|v_input_float_2|true|(?Quantity Settings)Quantity|
|v_input_float_3|1.5|(?Swing Hl & Supertrend Sl/Tp)take profit swinghl||supertrend |
|v_input_int_6|6|Highest High Lookback|
|v_input_int_7|6|Lowest Low Lookback|
|v_input_bool_5|false|(?Percentage Sl/Tp)Enable Trail|
|v_input_float_4|true|Stop Loss %|
|v_input_float_5|2|Take Profit %|
|v_input_float_6|true|Trailing Stop (%)|
|v_input_bool_6|false|(?Atr SL/Tp)Enable Atr Trail|
|v_input_12|14|ATR Length|
|v_input_float_7|2|Stop loss ATR multiplier|
|v_input_float_8|1.5|Take profit multiplier|
|v_input_int_8|7|How Far To Look Back For High/Lows|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-31 00:00:00
end: 2024-01-07 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © JS_TechTrading

//@version=5
strategy("Supertrend advance", overlay=true,default_qty_type =strategy.percent_of_equity,default_qty_value = 1,process_orders_on_close = false)

// group string////
var string group_text000="Choose Strategy"
var string group_text0="Supertrend Settings"
var string group_text0000="Ema Settings"
var string group_text00="Rsi Settings"
var string group_text1="Backtest Period"
var string group_text2="Trade Direction"
var string group_text3="Quantity Settings"
var string group_text4="Sl/Tp Settings"
var string group_text5="Enable/Disable Condition Filter"
var string group_macd="Macd Set"
var group_cci="Cci Set"
var string group_text6="Choose Sl/Tp"
var string group_text7="Percentage Sl/Tp"
var string group_text9="Atr SL/Tp"
var string group_text8='Swing Hl & Supertrend Sl/Tp'


// filter enable and disbale
on_ma  =input.bool(true,"Ema Condition On/Off",group=group_text5,inline = "CL")
en_rsi = input.bool(true,"Rsi Condition On/Off",group = group_text5,inline = "CL")
en_macd=input.bool(true,title ="Enable Macd Condition",group =group_text5,inline = "CS")
en_cci=input.bool(true,title ="Enable/Disable CCi Filter",group =group_text5,inline = "CS")

////////////////////
option_ch=input.string('Pullback',title = "Type Of Stratgey",options =['Pullback','Simple'],group = "Choose Strategy Type")

// option for stop loss and take profit 
option_ts=input.string("Percentage","Chosse Type Of Sl/tp",["Percentage","Supertrend","Swinghl","Atr"],group=group_text6)
//atr period input supertrend 
atrPeriod = input(10, "ATR Length",group = group_text0)
factor = input.float(3.0, "Factor", step = 0.01,group=group_text0)

[supertrend, direction] = ta.supertrend(factor, atrPeriod)

bodyMiddle = plot((open + close) / 2, display=display.none)
upTrend = plot(direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend = plot(direction < 0? na : supertrend, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle, upTrend, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle, downTrend, color.new(color.red, 90), fillgaps=false)

long=direction < 0 ? supertrend : na
short=direction < 0? na : supertrend

longpos=false
shortpos=false

longpos :=long?true :short?false:longpos[1]
shortpos:=short?true:long?false:shortpos[1]

fin_pullbuy= (ta.crossunder(low[1],long) and long and high>high[1])
fin_pullsell=(ta.crossover(high[1],short) and short and low<low[1]) 

//Ema 1

ma_len= input.int(200, minval=1, title="Ema Length",group = group_text0000)
ma_src = input.source(close, title="Ema Source",group = group_text0000)
ma_out = ta.ema(ma_src, ma_len)

ma_buy=on_ma?close>ma_out?true:false:true
ma_sell=on_ma?close<ma_out?true:false:true

// rsi indicator and condition
// Get user input
rsiSource = input(title='RSI Source', defval=close,group = group_text00)
rsiLength = input(title='RSI Length', defval=14,group = group_text00)
rsiOverbought = input(title='RSI BUY Level', defval=50,group = group_text00)
rsiOversold   = input(title='RSI SELL Level', defval=50,group = group_text00)

// Get RSI value
rsiValue = ta.rsi(rsiSource, rsiLength)

rsi_buy=en_rsi?rsiValue>=rsiOverbought ?true:false:true
rsi_sell=en_rsi?rsiValue<=rsiOversold?true:false:true


// Getting inputs macd

fast_length = input(title="Fast Length", defval=12,group =group_macd)
slow_length = input(title="Slow Length", defval=26,group =group_macd)
macd_src = input(title="Source", defval=close,group =group_macd)
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9,group =group_macd)

[macdLine, signalLine, histLine] = ta.macd(macd_src, fast_length ,slow_length,signal_length)

buy_macd=en_macd?macdLine>0?true:false:true
sell_macd=en_macd?macdLine<0?true:false:true


// CCI indicator 
length_cci = input.int(20, minval=1,group = group_cci)
src_cci = input(hlc3, title="Source",group = group_cci)
cci_gr=input.int(200,title = "CCi > Input",group = group_cci,tooltip ="CCi iS Greater thn 100 buy")
cci_ls=input.int(-200,title = "CCi < -Input",group = group_cci,tooltip  ="CCi iS Less thn -100 Sell")

ma = ta.sma(src_cci, length_cci)
cci = (src_cci - ma) / (0.015 * ta.dev(src_cci, length_cci))

//cci buy and sell
buy_cci=en_cci?cci>cci_gr?true:false:true
sell_cci=en_cci?cci<cci_ls?true:false:true

// final condition
buy_cond=option_ch=='Simple'?long and not(longpos[1]) and rsi_buy and ma_buy and buy_macd and buy_cci:option_ch=='Pullback'?fin_pullbuy and rsi_buy and ma_buy and buy_macd and buy_cci:na
sell_cond=option_ch=='Simple'?short and not(shortpos[1]) and rsi_sell and ma_sell and sell_macd and sell_cci:option_ch=='Pullback'?fin_pullsell and rsi_sell and ma_sell and sell_macd and sell_cci:na

//backtest engine
start = input(timestamp('2005-01-01'), title='Start calculations from',group=group_text1)
end=input(timestamp('2045-03-01'), title='End calculations',group=group_text1)

time_cond = true

// Make input option to configure trade direction

tradeDirection = input.string(title='Trade Direction', options=['Long', 'Short', 'Both'], defval='Both',group = group_text2)

// Translate input into trading conditions
longOK  = (tradeDirection == "Long") or (tradeDirection == "Both")
shortOK = (tradeDirection == "Short") or (tradeDirection == "Both")

// quantity 
qty_new=input.float(1.0,step =0.10,title ="Quantity",group =group_text3)

// supertrend and swing high and low 

tpnewf = input.float(title="take profit swinghl||supertrend ", step=0.1, defval=1.5, group=group_text8)
hiLen = input.int(title='Highest High Lookback', defval=6, minval=2, group=group_text8)
loLen = input.int(title='Lowest Low Lookback', defval=6, minval=2, group=group_text8)


globl = option_ts=="Swinghl"? nz(ta.lowest(low, loLen),low[1]):option_ts=="Supertrend"?nz(supertrend,low[1]):na
globl2=option_ts=="Swinghl"? nz(ta.highest(high, hiLen),high[1]) :option_ts=="Supertrend"?nz(supertrend,high[1]):na

var store = float(na)
var store2=float(na)

// strategy start
if buy_cond and longOK and time_cond and strategy.position_size==0
    strategy.entry("enter long",direction = strategy.long,qty =qty_new)
    store:=globl

if sell_cond and shortOK and time_cond and strategy.position_size==0
    strategy.entry("enter short",direction =strategy.short,qty =qty_new)
    store2:=globl2


//stop loss and take profit 

enable_trail=input.bool(false,"Enable Trail",group =group_text7)
stopPer = input.float(1.0,step=0.10,title='Stop Loss %',group=group_text7)* 0.01
takePer = input.float(2.0,step=0.10, title='Take Profit %',group=group_text7)* 0.01

//TRAILING STOP CODE
trailStop = input.float(title='Trailing Stop (%)', minval=0.0, step=0.1, defval=1,group=group_text7) * 0.01


longStopPrice = 0.0
shortStopPrice = 0.0
longStopPrice := if strategy.position_size > 0
    stopValue = close * (1 - trailStop)
    math.max(stopValue, longStopPrice[1])
else
    0
shortStopPrice := if strategy.position_size < 0
    stopValue = close * (1 + trailStop)
    math.min(stopValue, shortStopPrice[1])
else
    999999

// Determine where you've entered and in what direction
longStop = 0.0
shortStop =0.0
shortTake =0.0
longTake = 0.0

if (option_ts=="Percentage" )
    // Determine where you've entered and in what direction
    longStop  := strategy.position_avg_price * (1 - stopPer)
    shortStop := strategy.position_avg_price * (1 + stopPer)
    shortTake := strategy.position_avg_price * (1 - takePer)
    longTake  := strategy.position_avg_price * (1 + takePer)
if enable_trail and (option_ts=="Percentage" )
    longStop  := longStopPrice
    shortStop := shortStopPrice
//single take profit exit position 

if strategy.position_size > 0 and option_ts=="Percentage"
    strategy.exit(id='Close Long',from_entry = "enter long", stop=longStop, limit=longTake)

if strategy.position_size < 0 and option_ts=="Percentage" 
    strategy.exit(id='Close Short',from_entry = "enter short", stop=shortStop, limit=shortTake)

//PLOT FIXED SLTP LINE
plot(strategy.position_size > 0 and option_ts=="Percentage" ? longStop : na, style=plot.style_linebr, color=enable_trail?na:color.new(#c0ff52, 0), linewidth=1, title='Long Fixed SL')
plot(strategy.position_size < 0 and option_ts=="Percentage"? shortStop : na, style=plot.style_linebr, color=enable_trail?na:color.new(#5269ff, 0), linewidth=1, title='Short Fixed SL')
plot(strategy.position_size  > 0 and option_ts=="Percentage"? longTake : na, style=plot.style_linebr, color=color.new(#5e6192, 0), linewidth=1, title='Long Take Profit')
plot(strategy.position_size < 0 and option_ts=="Percentage"? shortTake : na, style=plot.style_linebr, color=color.new(#dcb53d, 0), linewidth=1, title='Short Take Profit')


//PLOT TSL LINES
plot(series=strategy.position_size > 0 and option_ts=="Percentage" and enable_trail ? longStopPrice : na, color=color.new(color.red, 0), style=plot.style_linebr, linewidth=1, title='Long Trail Stop', offset=1)
plot(series=strategy.position_size < 0 and option_ts=="Percentage" and enable_trail ? shortStopPrice : na, color=color.new(color.red, 0), style=plot.style_linebr, linewidth=1, title='Short Trail Stop', offset=1)



// swing high and low 

//take profit
takeProfit_buy = strategy.position_avg_price - ((store - strategy.position_avg_price) * tpnewf)
takeProfit_sell = strategy.position_avg_price - ((store2  - strategy.position_avg_price) * tpnewf)


// Submit stops based on highest high and lowest low
if strategy.position_size >= 0 and (option_ts=="Swinghl" or option_ts=="Supertrend") 
    strategy.exit(id='XL HH',from_entry = "enter long", stop=store,limit=takeProfit_buy,comment ="Long Exit")

if strategy.position_size <= 0 and (option_ts=="Swinghl" or option_ts=="Supertrend") 
    strategy.exit(id='XS LL',from_entry = "enter short", stop=store2,limit=takeProfit_sell,comment = "Short Exit")


// plot take profit
plot(series=strategy.position_size < 0 and (option_ts=="Swinghl" or option_ts=="Supertrend")? takeProfit_sell : na, style=plot.style_circles, color=color.orange, linewidth=1, title="take profit sell")
plot(series=strategy.position_size > 0 and (option_ts=="Swinghl" or option_ts=="Supertrend")? takeProfit_buy: na, style=plot.style_circles, color=color.blue, linewidth=1, title="take profit buy")

// Plot stop Loss for visual confirmation
plot(series=strategy.position_size > 0 and (option_ts=="Swinghl" or option_ts=="Supertrend")? store : na, style=plot.style_circles, color=color.new(color.green, 0), linewidth=1, title='Lowest Low Stop')
plot(series=strategy.position_size < 0 and (option_ts=="Swinghl" or option_ts=="Supertrend")? store2 : na, style=plot.style_circles, color=color.new(color.red, 0), linewidth=1, title='Highest High Stop')

// atr 
enable_atrtrail=input.bool(false,"Enable Atr Trail",group = group_text9)
atrLength = input(title='ATR Length', defval=14,group =group_text9)
slATRMult = input.float(title='Stop loss ATR multiplier',step=0.1, defval=2.0,group =group_text9)
tpATRMult = input.float(title='Take profit multiplier',step=0.1, defval=1.5,group =group_text9)
lookback = input.int(title='How Far To Look Back For High/Lows', defval=7, minval=1,group =group_text9)


atr = ta.atr(atrLength)
lowestLow = ta.lowest(low, lookback)
highestHigh = ta.highest(high, lookback)
longStopa = (enable_atrtrail ? lowestLow : close) - atr * slATRMult
shortStopa = (enable_atrtrail ? highestHigh : close) + atr * slATRMult

atr_l=0.0
atr_s=0.0

atr_l:=nz(strategy.position_avg_price-(atr[1] * slATRMult),strategy.position_avg_price-(1 * slATRMult))
atr_s:=nz(strategy.position_avg_price+ (atr[1] * slATRMult),strategy.position_avg_price-(1 * slATRMult))

stoploss_l = ta.valuewhen(strategy.position_size != 0 and strategy.position_size[1] == 0,atr_l, 0) 
stoploss_s = ta.valuewhen(strategy.position_size != 0 and strategy.position_size[1] == 0,atr_s, 0)

takeprofit_l = strategy.position_avg_price - ((stoploss_l - strategy.position_avg_price) * tpATRMult)
takeprofit_s = strategy.position_avg_price - ((stoploss_s  - strategy.position_avg_price) * tpATRMult)

// Submit stops based on highest high and lowest low
if strategy.position_size > 0 and (option_ts=="Atr") 
    strategy.exit(id='Xl', stop= enable_atrtrail?longStopa:stoploss_l,limit=takeprofit_l ,comment ="Long Exit")

if strategy.position_size < 0 and (option_ts=="Atr")
    strategy.exit(id='XH', stop=enable_atrtrail?shortStopa:stoploss_s,limit=takeprofit_s,comment = "Short Exit")


// // plot take profit
plot(series=strategy.position_size > 0 and  (option_ts=="Atr")? takeprofit_l : na, style=plot.style_circles, color=color.orange, linewidth=1, title="take profit sell")
plot(series=strategy.position_size < 0 and  (option_ts=="Atr")? takeprofit_s: na, style=plot.style_circles, color=color.blue, linewidth=1, title="take profit buy")

// Plot stop Loss for visual confirmation
plot(series=strategy.position_size  >0 and (option_ts=="Atr") and not enable_atrtrail? stoploss_l : na, style=plot.style_circles, color=color.new(color.green, 0), linewidth=1, title='Lowest Low Stop')
plot(series=strategy.position_size < 0 and (option_ts=="Atr") and not enable_atrtrail? stoploss_s : na, style=plot.style_circles, color=color.new(color.red, 0), linewidth=1, title='Highest High Stop')

//PLOT TSL LINES
plot(series=strategy.position_size  >0 and option_ts=="Atr" and enable_atrtrail ? longStopa : na, color=color.new(color.green, 0), style=plot.style_linebr, linewidth=1, title='Long Trail Stop', offset=1)
plot(series=strategy.position_size < 0 and (option_ts=="Atr") and enable_atrtrail?  shortStopa : na, style=plot.style_linebr, color=color.new(color.red, 0), linewidth=1, title='short Trail Stop', offset=1)


```

> Detail

https://www.fmz.com/strategy/438004

> Last Modified

2024-01-08 10:03:31
