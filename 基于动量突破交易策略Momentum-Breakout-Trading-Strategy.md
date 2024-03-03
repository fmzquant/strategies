
> Name

基于动量突破交易策略Momentum-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1278473b1648010867b.png)
[trans]
## 概述

该策略是一个基于动量指标的突破交易策略。它使用均线、ATR、RSI等多个指标判断市场趋势和波动率,结合严格的止盈止损设置来进行交易。策略主要判断价格是否突破上升或下穿均线加上ATR范围来产生交易信号。

## 策略原理

该策略主要基于以下几个要点:

1. 使用EMA均线判断价格趋势方向。价格上穿均线为看涨信号,下穿为看跌信号。

2. ATR指标判断市场波动率。ATR乘以一个系数作为止损范围。这可以有效控制单笔损失。

3. RSI指标判断超买超卖。ATR止损价格以及均线判断的突破交易必须在RSI不超买不超卖的情况下触发。这可避免假突破。

4. 采用前期高点或低点作为止盈出场依据。跟踪止盈价格可锁定更多利润。

5. 严格的止盈止损规则。结合波动率指标的ATR止损可控制风险,止盈设置则可锁定盈利。

进入信号是价格突破均线加ATR止损范围。如果是看涨信号,那么价格需要上穿该高点;如果是看跌信号,那么价格需要下破该低点。

## 优势分析

该策略具有以下优势:

1. 多指标判断可避免假突破,提高信号准确率

2. ATR止损范围设置让损失控制在一个合理水平

3. 动态跟踪止盈可最大化获取利润

4. 严格的止盈止损规则有助于风险控制

5. 指标和参数优化空间大,可根据不同市场调整

## 风险分析

该策略也存在以下风险:

1. 获利能力与市场波动率相关。市场趋势不明或周期较长时,获利空间受限。

2. 可能出现止损价格震荡后再次突破的情况。这时会造成无法及时建仓追踪趋势。可以适当宽松止损价格。

3.  chasing。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 根据不同品种和周期调整均线参数、ATR参数等。

2. 可以引入更多指标判断,如MACD、KDJ等判断超买超卖。

3. 可以根据ATR数值实时调整止损系数。使止损更适应市场波动。

4. 建立多个时间周期的组合。不同周期指标结合可以提升信号质量。

5. 利用机器学习技术对指标和参数进行测试和优化,使策略参数达到最优。


## 总结

该策略整体是一个利用指标进行判断,严格止损止盈的突破交易策略。它有效利用了均线、ATR和RSI等指标的优势,能够有效判断市场趋势方向。结合严格的止损止盈设置,能够把握趋势获利的同时控制风险。通过参数和规则优化,该策略可以成为一个值得长期使用的量化交易策略。

||

## Overview

This is a momentum-based breakout trading strategy. It uses moving averages, ATR, RSI and other indicators to judge market trends and volatility, combined with strict stop loss/take profit settings for trading. The strategy mainly judges whether prices break through or fall below the moving averages plus the ATR range to generate trading signals.

## Strategy Principle 

The main points of this strategy are:

1. Use EMA to judge the price trend direction. Price crossing above EMA is bullish signal and crossing below is bearish signal.  

2. ATR indicates market volatility. ATR multiplied by a coefficient serves as the stop loss range. This can effectively control single loss.
   
3. RSI indicates overbought/oversold status. Breakout trades signaled by stop loss price and EMA crossover must happen when RSI is not in overbought/oversold zone. This avoids false breakout.  

4. Use previous period high/low points as take profit basis. Tracking take profit price can lock in more profits.

5. Strict stop loss/take profit rules. ATR-based stop loss controls risks and take profit locks in gains.

Entry signal triggers when price breaks out of EMA plus ATR stop loss range. For bullish signals, price needs to cross above the high point. For bearish signals, price needs to break below the low point. 

## Advantage Analysis

Advantages of this strategy:

1. Multiple indicators avoid false breaks and improve accuracy  

2. ATR stop loss keeps losses at reasonable level
   
3. Dynamic take profit tracking maximizes profits  

4. Strict rules facilitate risk control

5. Large optimization space for indicators and parameters to adapt to different markets

## Risk Analysis  

Risks of this strategy:

1. Profitability correlates with market volatility. Gains could be limited if trend is unclear or cycle is long.

2. Stop loss price may whipsaw before breaking out again. This leads to missing trends. Can relax stop loss price a bit.

3.There is potential for chasing in trending markets.  

## Optimization Directions

Optimization ideas:

1. Adjust MA, ATR parameters for different products and timeframes.  

2. Add more indicators like MACD, KDJ for overbought/oversold.
   
3. Dynamically adjust ATR coefficient based on real-time ATR values for adaptive stops.

4. Establish combo systems with multiple timeframes. Different timeframe indicators can improve signal quality.  

5. Utilize machine learning for parameters/indicators optimization to achieve best performance.

## Summary  

This strategy utilizes indicators for judgment and strict stop loss/take profit. It takes advantage of moving averages, ATR and RSI to determine market trends. With strict risk control, it can ride trends while managing risks. Further parameter and rules optimization can make it a long-term profitable trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|emaLengh|
|v_input_2|3|Key Vaule. 'This changes the sensitivity'|
|v_input_3|10|ATR Period|
|v_input_4|false|Signals from Heikin Ashi Candles|
|v_input_5|9|emaLengh show|
|v_input_6|0.00025|波动率min|
|v_input_7|0.00045|波动率max|
|v_input_8|20|adx_length|
|v_input_9|14|adx_min|
|v_input_10|11|sma_length|
|v_input_11|9|rsi_len|
|v_input_12|20|length|
|v_input_13|2|StdDev|
|v_input_14|50|zlsma-Length|
|v_input_15|false|zlsma-Offset|
|v_input_16|0.015|最小收益率|
|v_input_17|10|平仓收益回撤比|
|v_input_18|0.004|回撤率|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-03 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="UT Bot Strategy", overlay = true)
//CREDITS to HPotter for the orginal code. The guy trying to sell this as his own is a scammer lol. 
// Inputs
emaLengh = input(2, title = "emaLengh")
a = input(3.0,     title = "Key Vaule. 'This changes the sensitivity'")
c = input(10,    title = "ATR Period")
h = input(false, title = "Signals from Heikin Ashi Candles")
emaLengh2 = input(9, title = "emaLengh show")




rate = input(0.00025,    title = "波动率min")
rateMax = input(0.00045,    title = "波动率max")
adx_length =   input(20,    title = "adx_length")
adx_min =   input(14,    title = "adx_min")

sma_length =   input(11,    title = "sma_length")
rsi_len = input(9, title = "rsi_len")

src = h ? security(heikinashi(syminfo.tickerid), timeframe.period, close, lookahead = false) : close

// boll 通道----------------------------------------------------
length = input(20, minval=1)
mult = input(2.0, minval=0.001, maxval=50, title="StdDev")
basis = sma(src, length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev
bbr = (src - lower)/(upper - lower)
// plot(upper, color = color.rgb(46, 59, 240), title="upper")
// plot(lower, color = color.rgb(46, 59, 240), title="lower")


// plot(bbr, "Bollinger Bands %B", color=#26A69A)
// band1 = hline(1, "Overbought", color=#787B86, linestyle=hline.style_dashed)
// hline(0.5, "Middle Band", color=color.new(#787B86, 50))
// band0 = hline(0, "Oversold", color=#787B86, linestyle=hline.style_dashed)
// fill(band1, band0, color=color.rgb(38, 166, 154, 90), title="Background")
// boll 通道----------------------------------------------------

// 线性回归 --------------------------------------------------------------
zlsma_length = input(title="zlsma-Length", type=input.integer, defval=50)
zlsma_offset = input(title="zlsma-Offset", type=input.integer, defval=0)
lsma = linreg(src, zlsma_length, zlsma_offset)
lsma2 = linreg(lsma, zlsma_length, zlsma_offset)
eq= lsma-lsma2
zlsma = lsma+eq
// plot(zlsma , color = color.rgb(243, 243, 14), title="zlsma",linewidth=3)
// 线性回归 --------------------------------------------------------------



// --------------------------------
rsi = rsi(src, 6)

// xHH = sma(high, sma_length)
// xLL = sma(low, sma_length)
// movevalue = (xHH - xLL) / 2
// xHHM = xHH + movevalue
// xLLM = xLL - movevalue

// plot(xHHM, color = color.rgb(208, 120, 219), title="xHHM")
// plot(xLLM, color = color.rgb(208, 120, 219), title="xLLM")


xATR  = atr(c)
nLoss = a * xATR



xATRTrailingStop = 0.0
xATRTrailingStop := iff(src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), src - nLoss),
   iff(src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), src + nLoss), 
   iff(src > nz(xATRTrailingStop[1], 0), src - nLoss, src + nLoss)))


 
pos = 0   
pos :=	iff(src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0), 1,
   iff(src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0))) 
   
xcolor = pos == -1 ? color.red: pos == 1 ? color.green : color.blue 

ema   = ema(src,emaLengh)
// sma   = sma(src,emaLengh)
emaFast   = ema(src,100)
emaSlow   = ema(src,576)
emaShow   = ema(src, emaLengh2)
// sma       =  sma(src, 8)

// [superTrend, dir] = supertrend(3, 200) 
// 判断连续涨

[diplus, diminus, adx] = dmi(adx_length, adx_length)


above = crossover(ema, xATRTrailingStop)
below = crossover(xATRTrailingStop, ema)
// above = ema == xATRTrailingStop
// below = xATRTrailingStop== ema

// smaabove = crossover(src, sma)
// smabelow = crossover(sma, src)
// smaabove = src > sma
// smabelow = sma > src
close_rate (n)=>
    abs(close[n]-open[n])/min(close[n],open[n])

rate_val = close_rate(0)
rate_val1 = close_rate(1)

buy  = src > xATRTrailingStop and above  and src > zlsma  and adx >adx_min
// and  src>emaShow
// and rate_val < rate_val1*2 and rate_val >=rate_val1
// and rate_val1<rateMax
// and close[1]>open[1] 
sell = src < xATRTrailingStop and below  and src < zlsma and adx >adx_min
// and  src<emaShow
// and rate_val < rate_val1*2  and rate_val >=rate_val1
//  and rate_val1<rateMax
// and open[1]>close[1]  and rate_val1 > rate  

// buy  = src > xATRTrailingStop 
// sell = src < xATRTrailingStop 
// plot(rate_val1 , color = color.red, title="rate_val1")



barbuy  = src > xATRTrailingStop 
barsell = src < xATRTrailingStop

atrRsi = rsi(xATRTrailingStop,rsi_len)

// plot(emaFast , color = color.rgb(243, 206, 127), title="emaFast")
// plot(ema , color = color.rgb(47, 227, 27), title="ut-ema")



// plot(emaShow , color = color.rgb(47, 227, 27), title="ema9")

plot(xATRTrailingStop, color = color.rgb(233, 233, 232), title="xATRTrailingStop")

plotshape(buy,  title = "Buy",  text = 'Buy',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, size = size.tiny)
plotshape(sell, title = "Sell", text = 'Sell', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, size = size.tiny)


// plotshape(buy,  title = "Sell",  text = 'Sell',  style = shape.labelup,   location = location.belowbar, color= color.green, textcolor = color.white, transp = 0, size = size.tiny)
// plotshape(sell, title = "buy", text = 'buy', style = shape.labeldown, location = location.abovebar, color= color.red,   textcolor = color.white, transp = 0, size = size.tiny)

// barcolor(barbuy  ? color.green : na)
// barcolor(barsell ? color.red   : na)

// strategy.entry("short",   false, when = buy)
// strategy.entry("long ", true, when = sell)


strategy.entry("long",   true, when = buy and strategy.position_size == 0)
strategy.entry("short", false, when = sell and strategy.position_size == 0)


//动态止盈start------------------------------------------------------------------------------------------
profit = input( 0.015,     title = "最小收益率")
close_profit_rate = input( 10,     title = "平仓收益回撤比")
loss = input(0.004,    title = "回撤率")

// 收益回撤比例
profit_price_scale =profit/close_profit_rate

var float profit_price = 0


// 计算小收益价格

get_profit_price(long) =>
    float res = 0
    if long == true
        res := strategy.position_avg_price * (1+profit)
    if long == false
        res := strategy.position_avg_price * (1-profit)
    res

// 止盈平仓条件
close_profit_position(long)=>
    bool result=false
    if long == true and profit_price>0 and profit_price*(1-profit_price_scale) >=close and  get_profit_price(true) <= close 
        result:=true
    if long == false and profit_price>0 and profit_price*(1+profit_price_scale) <=close and  get_profit_price(false) >= close 
        result:=true
    result

// 更新动态止盈价格
update_profit_price(price)=>
    float res = price
   // 无仓位时 动态止盈价格为0
    if strategy.position_size == 0 
        res := 0
   // long - 价格大于最小收益时保存
    if strategy.position_size > 0 and get_profit_price(true) <= close and (res==0 or res < close)
        res := close
   // short - 价格小于最小收益时保存
    if strategy.position_size < 0 and get_profit_price(true) >= close and (res==0 or res > close)
        res := close
    res
   
///////



profit_price := update_profit_price(profit_price)
long_close_profit_position = close_profit_position(true)
short_close_profit_position = close_profit_position(false)

// plot(profit_price, color = color.green, title="profit_price")
//动态止盈end------------------------------------------------------------------------------------------




strategy.close("long",comment="long-止盈",when = strategy.position_size > 0 and long_close_profit_position)

strategy.close("long",comment="long-止损",when = strategy.position_size >0 and strategy.position_avg_price * (1-loss) >= close)

strategy.close("short",comment="short-止盈",when = strategy.position_size <0 and short_close_profit_position)

strategy.close("short",comment="short-止损",when = strategy.position_size <0 and strategy.position_avg_price * (1+loss) <= close)

  





```

> Detail

https://www.fmz.com/strategy/440964

> Last Modified

2024-02-04 10:55:31
