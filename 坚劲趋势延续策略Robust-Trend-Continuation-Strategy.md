
> Name

坚劲趋势延续策略Robust-Trend-Continuation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/175f9462d6d49224754.png)

[trans]

## 概述
该策略基于移动平均线,在趋势向上的过程中,在短期回调之后开仓做多,属于趋势跟踪类型策略。

## 策略原理
该策略使用3条不同周期的EMA线,EMA1线用于判断短期趋势,它要比其他两条EMA线周期短;EMA2线和EMA3线用于判断中长期趋势,其中EMA3线周期最长。当短期EMA1线上涨时说明处于短期上涨趋势中,EMA2线在EMA3线之上则说明中长期也处于上涨趋势中,所以这时是一个较好的做多时机点。具体来说,该策略的交易信号生成逻辑是:价格上穿EMA1线时则产生做多信号。为了进一步验证趋势稳定性,要求在产生信号的栏中,EMA2和EMA3都向上,并且最后一个bar也是上涨的,这样可以过滤掉短期调整带来的错误信号。

设置止损平仓线和止盈平仓线,可以锁定盈亏。具体来说,止损线按照ATR的值移动,止盈线也是按照ATR的值移动设置的。

## 优势分析
该策略最大优势就是能够有效捕捉中长线上涨趋势,同时也考虑了短期调整,这使得它的持仓时间和盈利空间都很可观。

另外设置了止损和止盈机制也使其风险可控。

## 风险分析
该策略最大风险在于无法判断趋势反转点,如果中长线趋势反转而短期还在上涨,这时就会产生错误的做多信号而入场,从而可能造成较大损失。

此外在盘整行情中也可能产生不必要的交易损失。

## 优化方向 
可以考虑根据具体交易品种特点,调整EMA的周期参数,使之更加匹配该品种的中长线周期。

可以结合其他指标判断短期调整的结束,避免错误入场。

可以考虑根据ATR数值的大小来调整止损系数,在ATR较大时适当放宽止损距离。

## 总结
该策略总体来说是一种表现良好的中长线趋势跟踪策略。通过移动平均线判断趋势方向、回调信号判定入场时机、止盈止损设置来锁定盈亏。但也存在一定盲目跟踪的风险,需结合交易者自身对行情的判断来决定是否入场。

||

## Overview
This strategy is based on moving averages. It goes long after a short-term correction in an upward trend. It belongs to the trend following strategy.

## Strategy Principle  
This strategy uses 3 EMA lines with different periods. The EMA1 line with shorter period is used to judge the short-term trend. The EMA2 and EMA3 lines with longer periods are used to determine the mid-long term trend, where EMA3 has the longest period. When the short-term EMA1 line goes up, it indicates that it is in a short-term upward trend. If EMA2 is above EMA3, it means the mid-long term is also in upward trend, so this is a good timing for long entry. Specifically, the trading signal is generated when the price crosses above the EMA1 line. To further verify the stability of the trend, it requires that EMA2 and EMA3 are pointing up and the last bar is also rising in the signal generation bar, which helps filter out wrong signals from short-term corrections.

The stop loss line and take profit line are set to lock in profits and losses. Specifically, the stop loss line moves according to the ATR value, and the take profit line also moves based on the ATR value.

## Advantage Analysis
The biggest advantage of this strategy is that it can effectively capture the mid-long term upward trend, while also taking into account the short-term correction, which makes its holding time and profit space considerable.

In addition, the setting of stop loss and take profit also makes its risk controllable.

## Risk Analysis  
The biggest risk of this strategy is that it cannot determine the trend reversal point. If the mid-long term trend reverses while the short term is still rising, it will generate a wrong long signal to enter the market, which may cause greater loss.

In addition, unnecessary trading losses may also occur in range-bound markets.

## Optimization Directions
Consider adjusting the cycle parameters of EMA based on the characteristics of specific trading varieties to better match the mid-long cycle of the variety.

Combining with other indicators to determine the end of short-term adjustments can avoid wrong entry.

Consider adjusting the stop loss coefficient based on the ATR value, appropriately relaxing the stop loss distance when ATR is large.


## Conclusion  
In general, this strategy is a mid-long term trend following strategy that performs well. It determines the trend direction through moving averages, entry timing through pullback signals, and locks in profits and losses through stop loss and take profit settings. But there is also a certain risk of blind trend following. Traders need to make their own judgment on the market to decide whether to enter.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|50|EMA 1 Length|
|v_input_int_2|80|EMA 2 Length|
|v_input_int_3|200|EMA 3 Length|
|v_input_2|true|numberOfCandles|
|v_input_3|3.5|slATRFactor|
|v_input_4|3.5|tpATRFactor|
|v_input_5|14|ATRLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-21 00:00:00
end: 2024-01-28 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Trend Continuation', shorttitle='Trend_Continuation', overlay=true)

// Input
price = input(close)
MA1_Length = input.int(50, step=1, title='EMA 1 Length')
MA2_Length = input.int(80, step=1, title='EMA 2 Length')
MA3_Length = input.int(200, step=1, title='EMA 3 Length')
numberOfCandles = input(1)
slATRFactor = input(3.5)
tpATRFactor = input(3.5)
ATRLength = input(14)
// switch1=input(true, title="Show Bar Color?")
// switch2=input(true, title="Show Moving Averages?")

// Calculation
MA1 = ta.ema(price, MA1_Length)
MA2 = ta.ema(price, MA2_Length)
MA3 = ta.ema(price, MA3_Length)
prev_price = close[numberOfCandles]


// Strategy
allPositive = true
for i = 0 to numberOfCandles - 1 by 1
    if close[i] < close[i + 1] or close[i] < MA1
        allPositive := false
        break


long = MA2 > MA3 and price > MA1 and ta.crossunder(prev_price, MA1) and allPositive
// short = crossover(price, MA3) or ( change(price)>0 and change(MA1)>0 and crossover(price,MA1)  and change(MA2)<0 ) 


if long
    strategy.entry('Long', strategy.long, comment='Long')

bought = strategy.position_size[0] > strategy.position_size[1]
atrAtLong = ta.valuewhen(bought, ta.atr(ATRLength), 0)


// Stop loss and take profit
slPrice = strategy.position_avg_price - slATRFactor * atrAtLong
tpPrice = strategy.position_avg_price + tpATRFactor * atrAtLong

SL = plot(slPrice, title='SL', style=plot.style_linebr, linewidth=1, color=color.new(color.red, 0))

if price >= tpPrice and price < MA1
    strategy.close('Long')

if price < strategy.position_avg_price
    strategy.exit('Stop Loss', 'Long', stop=slPrice)


// Strategy Alert
alertcondition(long, title='Long Alert', message='Go Long!')
// alertcondition(short, title='EMA Slope + EMA Cross Strategy, Short Alert', message='Go Short!')

// MA trend bar color
// up =  change(MA2)>0 and change(MA3)>0
// dn =  change(MA2)<0 and change(MA3)<0
// bar_color = up?green:dn?red:blue
// barcolor(switch1?bar_color:na)

// MA trend output color
change_1 = ta.change(MA2)
MA2_color = ta.change(MA2) > 0 ? color.lime : change_1 < 0 ? color.red : color.blue
change_2 = ta.change(MA3)
MA3_color = ta.change(MA3) > 0 ? color.lime : change_2 < 0 ? color.red : color.blue

// MA output
// EMA2 = plot(switch2?MA2:na, title="EMA 2", style=linebr, linewidth=2, color=MA2_color)
// EMA3 = plot(switch2?MA3:na, title="EMA 3", style=linebr, linewidth=4, color=MA3_color)
// fill(EMA2, EMA3, color=silver, transp=50)

color_1 = MA2 > MA3 ? color.green : color.red

EMA1 = plot(MA1, title='EMA 1', style=plot.style_linebr, linewidth=1, color=color_1)
// EMA2 = plot(MA2, title="EMA 2", style=linebr, linewidth=2, color=blue)
// EMA3 = plot(MA3, title="EMA 3", style=linebr, linewidth=3, color=red)



//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)


```

> Detail

https://www.fmz.com/strategy/440373

> Last Modified

2024-01-29 16:57:01
