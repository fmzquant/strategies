
> Name

移动平均线趋势跟踪策略Trend-Following-SMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/167d1201c180c7ca06e.png)


## Overview

The Trend Following SMA strategy uses a combination of simple moving average (SMA) and fast SMA to determine market trend direction and generate trading signals. It goes long when price crosses above SMA and FSMA and exits long when price crosses below. It goes short when price crosses below SMA and FSMA and exits short when price crosses above. The strategy provides dynamic no-curve-fitting trading signals to capture trend changes.

## Strategy Logic

The strategy uses sma function to calculate 50-period SMA and fast SMA fsma. fsma is calculated based on SMA plus 6 times standard deviation of price over n periods.

Two boolean variables long and short are used to record long and short positions. long is set to 1 when price crosses above sma and fsma for long entry, and -1 when price crosses below for exit. short follows the similar logic for short position.

The trend variable is used for trend determination. It is set to 1 when price is above fsma and sma for uptrend, and -1 when price is below fsma and sma for downtrend.

Trading signals of long and short are generated based on realtime trend direction. When trend changes from down to up, if price is above fsma, go long. When trend changes from up to down, if price is below sma, go short.

The strategy combines both trend following and breakout methods to capture opportunities when trend changes.

## Advantages

1. Using double confirmation of two MAs filters fake breakouts. 

2. Combining trend following and breakout catches turning points.

3. No curve fitting or optimization for dynamic trading signals. 

4. Simple and clear logic, easy to understand and modify.

5. Customizable parameters for length, multiplier for different markets.

## Risks

1. Double MA crosses may cause excessive whipsaw trades and reversals.

2. MA lag may miss early trend reversal. 

3. No stop loss mechanism to control single trade loss.

4. Improper parameter tuning leads to overtrading or lagging.

5. For Risk 1 and 2, lengthen MA periods, add drawdown stop loss.

6. For Risk 3, add percentage or order stop loss.  

7. For Risk 4, adjust parameters dynamically for different markets.

## Enhancement

1. Add trend filter using MACD, DMI to confirm trend.

2. Use KD, RSI to trade mean-reversion overbought/oversold.

3. Add overall stop loss such as trailing stop, percentage stop.

4. Add position sizing module for dynamic adjustment.

5. Optimize parameters to adapt across timeframes.

6. Introduce machine learning for auto parameter tuning.

7. Build composite strategy with additional filters. 

8. Utilize deep learning to detect complex trend patterns.

## Conclusion

The SMA trend following strategy is a simple trend trading system. It uses fast and slow MAs to assist trend direction and capture trend reversal. However, risks like whipsaw and lag exist. Future enhancements include adding filters, stops, dynamic parameters etc. Overall it serves as a good starter trend following strategy, but optimizations are needed for real-world applications to maximize its performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|6|Mult|
|v_input_4|true|Use barcolor?|
|v_input_5|false|Show plots?|
|v_input_6|false|Use triangles?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SMA STRATEGY", shorttitle="SMA TREND", overlay=true, calc_on_order_fills=true)
length = input(title="Length", type=input.integer, defval=50)
src_=input(close, title="Source", type=input.source)
mult=input(6.0, title="Mult")
barc=input(true, title="Use barcolor?")
plots=input(false, title="Show plots?")
tri=input(false, title="Use triangles?")


r(src, n)=>
    s = 0.0
    for i = 0 to n-1
        s := s + ((n-(i*2+1))/2)*src[i]
    x=s/(n*(n+1))
    x

l=sma(low, length)
h=sma(high, length)
lr= l+mult*r(low, length)
hr= h+mult*r(high, length)

trend=0
trend:=src_ > lr and src_ > hr ? 1 : src_ < lr and src_ < hr ? -1 : trend[1]

strategy.close("Long", when=trend==-1)
strategy.close("Short", when=trend==1)
strategy.entry("Long", strategy.long, when=trend==1 and src_>h)
strategy.entry("Short", strategy.short, when=trend==-1 and src_<l)

long=0
short=0
long:= trend==1 and src_>h ? 1 : trend==-1 ? -1 : long[1]
short:= trend==-1 and src_<l ? 1 : trend==1 ? -1 : short[1]

barcolor(barc? (long>0? color.green : short>0? color.red : trend>0? color.orange: trend<0 ? color.white : color.blue) : na)
plotshape(tri? close : na, style= shape.diamond, color= long>0? color.green : short>0? color.red : trend>0? color.orange: trend<0 ? color.white : color.blue, location=location.top)

//shortenter=
a1=plot(plots? l : na, color=color.blue, linewidth=1)
//longenter=
a2=plot(plots? h : na, color=color.blue, linewidth=1)
fill(a1, a2, color=color.blue)
//stopshort=
b1=plot(plots? hr : na, color=color.navy, linewidth=1)
//stoplong=
b2=plot(plots? lr : na, color=color.navy, linewidth=1)
fill(b1, b2, color=color.navy)
```

> Detail

https://www.fmz.com/strategy/430895

> Last Modified

2023-11-02 16:58:23
