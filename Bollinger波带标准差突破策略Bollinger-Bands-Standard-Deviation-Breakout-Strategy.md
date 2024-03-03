
> Name

Bollinger波带标准差突破策略Bollinger-Bands-Standard-Deviation-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18b9dabaeb5e5761cc6.png)

[trans]

### 概述

该策略基于经典的Bollinger波带指标,当价格收盘突破上轨时做多,当价格收盘突破下轨时做空,属于趋势跟踪突破策略。

### 策略原理  

1. 基准线为55日简单移动平均线。
2. 上轨和下轨分别为基准线上下各一个标准差。 
3. 当价格收盘突破上轨时产生做多信号。
4. 当价格收盘突破下轨时产生做空信号。
5. 采用标准差而不是经典的两倍标准差,降低了风险。

### 优势分析

1. 使用标准差而不是固定值降低了风险。
2. 55日移动平均线能较好地体现中期趋势。  
3. 收盘突破过滤假突破。
4. 易于通过多时间周期分析来确定趋势方向。

### 风险分析 

1. 容易产生震荡小利。
2. 需要考虑手续费的影响。
3. 突破信号可能是假突破。  
4. 可能出现亏损滑点。

可通过设置止损,考虑交易手续费,或添加指标过滤来降低风险。

### 优化方向

1. 优化基准线参数,寻找最佳均线。
2. 优化标准差大小,找到最佳参数。
3. 添加量价指标等辅助判断。  
4. 添加止损机制。

### 总结  

该策略整体逻辑清晰,通过标准差带宽度调整风险,收盘突破避免假突破。但仍需注意防止震荡亏损,可通过止损、增加过滤器等方式进行优化。

||

### Overview  

This strategy is based on the classic Bollinger Bands indicator. It goes long when the price closes above the upper band and goes short when the price closes below the lower band. It belongs to the trend following breakout strategy.   

### Strategy Logic   

1. The baseline is 55-day simple moving average.   
2. The upper and lower bands are one standard deviation above and below the baseline respectively.    
3. A long signal is generated when the price closes above the upper band.    
4. A short signal is generated when the price closes below the lower band.   
5. Using one standard deviation instead of the classic two standard deviations reduces the risk.    

### Advantage Analysis   

1. Using standard deviation instead of fixed value reduces risk.    
2. The 55-day moving average can better reflect the medium-term trend.     
3. Close breakout filters out false breakouts.    
4. Easy to determine trend direction through multi-timeframe analysis.    

### Risk Analysis

1. Prone to churning small profits.  
2. Need to consider the impact of transaction fees.   
3. Breakout signals may be false breakouts.   
4. Slippage loss may occur.   

Risks can be mitigated by setting stop loss, considering transaction fees, or adding indicator filters.  

### Optimization Directions   

1. Optimize baseline parameters to find the best moving average.   
2. Optimize the standard deviation size to find the optimal parameters.   
3. Add auxiliary volume indicators for judgement.     
4. Add stop loss mechanism.   

### Summary   

The overall logic of this strategy is clear. It adjusts risk through the standard deviation band width and avoids false breakouts using close breakout. But it is still necessary to prevent oscillating losses by using stop loss, adding filters etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|55|SMA length|
|v_input_3|true|Standard Deviation|
|v_input_4|true|Color Bars|
|v_input_5|true|╔═══ Time Range to BackTest ═══╗|
|v_input_6|true|From Month|
|v_input_7|true|From Day|
|v_input_8|2018|From Year|
|v_input_9|true|To Month|
|v_input_10|true|To Day|
|v_input_11|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-13 00:00:00
end: 2023-11-20 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//┌───── •••• ─────┐//
//   TradeChartist  //
//└───── •••• ─────┘//

//Bollinger Bands is a classic indicator that uses a simple moving average of 20 periods along with upper and lower bands that are 2 standard deviations away from the basis line. 
//These bands help visualize price volatility and trend based on where the price is in relation to the bands.

//This Bollinger Bands filter plots a long signal when price closes above the upper band and plots a short signal when price closes below the lower band. 
//It doesn't take into account any other parameters such as Volume/RSI/fundamentals etc, so user must use discretion based on confirmations from another indicator or based on fundamentals.

//This filter's default is 55 SMA and 1 standard deviation, but can be changed based on asset type

//It is definitely worth reading the 22 rules of Bollinger Bands written by John Bollinger. 


strategy(shorttitle="BB Breakout Strategy", title="Bollinger Bands Filter", overlay=true, 
             pyramiding=1, currency=currency.NONE , 
             initial_capital = 10000, default_qty_type = strategy.percent_of_equity, 
             default_qty_value=100, calc_on_every_tick= true, process_orders_on_close=false)

src         = input(close, title = "Source")
length      = input(55, minval=1, title = "SMA length")// 20 for classis Bollinger Bands SMA line (basis)


mult        = input(1., minval=0.236, maxval=2, title="Standard Deviation")//2 for Classic Bollinger Bands //Maxval = 2 as higher the deviation, higher the risk
basis       = sma(src, length)
dev         = mult * stdev(src,length)

CC          = input(true, "Color Bars")


upper       = basis + dev
lower       = basis - dev

//Conditions for Long and Short - Extra filter condition can be used such as RSI or CCI etc.

short       = src<lower// and rsi(close,14)<40
long        = src>upper// and rsi(close,14)>60

L1          = barssince(long)
S1          = barssince(short)

longSignal  = L1<S1 and not (L1<S1)[1]
shortSignal = S1<L1 and not (S1<L1)[1]

//Plots and Fills



////Long/Short shapes with text
// plotshape(S1<L1 and not (S1<L1)[1]?close:na, text = "sᴇʟʟ", textcolor=#ff0100, color=#ff0100, style=shape.triangledown, size=size.small, location=location.abovebar, transp=0, title = "SELL", editable = true)
// plotshape(L1<S1 and not (L1<S1)[1]?close:na, text = "ʙᴜʏ", textcolor = #008000, color=#008000, style=shape.triangleup, size=size.small, location=location.belowbar, transp=0, title = "BUY", editable = true)  


// plotshape(shortSignal?close:na, color=#ff0100, style=shape.triangledown, size=size.small, location=location.abovebar, transp=0, title = "Short Signal", editable = true)
// plotshape(longSignal?close:na, color=#008000, style=shape.triangleup, size=size.small, location=location.belowbar, transp=0, title = "Long Signal", editable = true)  



p1          = plot(upper, color=#ff0000, display=display.all, transp=75, title = "Upper Band")
p2          = plot(lower, color=#008000, display=display.all, transp=75, title = "Lower Band")


p           = plot(basis, color=L1<S1?#008000:S1<L1?#ff0000:na, linewidth=2, editable=false, title="Basis")


fill(p,p1, color=color.teal, transp=85, title = "Top Fill") //fill for basis-upper
fill(p,p2, color=color.orange, transp=85, title = "Bottom Fill")//fill for basis-lower


//Barcolor

bcol        = src>upper?color.new(#8ceb07,0): 
             src<lower?color.new(#ff0000,0):
             src>basis?color.green:
             src<basis?color.red:na


barcolor(CC?bcol:na, editable=false, title = "Color Bars")



// //Alerts ----  // Use 'Once per bar close'

// alertcondition(condition=longSignal, title="Long - BB Filter", message='BB Filter Long @ {{close}}') // Use 'Once per bar close'
// alertcondition(condition=shortSignal, title="Short - BB Filter", message='BB Filter Short @ {{close}}')  // Use 'Once per bar close'

Notestart1 = input(true, "╔═══ Time Range to BackTest ═══╗") 


// === INPUT BACKTEST RANGE ===
FromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
FromDay = input(defval=1, title="From Day", minval=1, maxval=31)
FromYear = input(defval=2018, title="From Year", minval=2015)
ToMonth = input(defval=1, title="To Month", minval=1, maxval=12)
ToDay = input(defval=1, title="To Day", minval=1, maxval=31)
ToYear = input(defval=9999, title="To Year", minval=2010)

// === FUNCTION EXAMPLE === 
start = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)  // backtest finish window
window() =>  // create function "within window of time"
    time >= start and time <= finish ? true : false 

if(window())
    strategy.entry("Long", long=true, when =  longSignal)
    // strategy.close("Long", when = (short and S3==0), comment = "Close Long")

if(window())
    strategy.entry("Short", long=false, when = shortSignal)
    // strategy.close("Short", when = (long and L3==0), comment = "Close Short")


```

> Detail

https://www.fmz.com/strategy/432809

> Last Modified

2023-11-21 17:14:04
