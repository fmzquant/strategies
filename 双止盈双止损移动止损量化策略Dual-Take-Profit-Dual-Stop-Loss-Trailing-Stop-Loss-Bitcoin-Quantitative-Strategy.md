
> Name

双止盈双止损移动止损量化策略Dual-Take-Profit-Dual-Stop-Loss-Trailing-Stop-Loss-Bitcoin-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16ffc41e2489eb75f4b.png)
 [trans]

## 概述

本策略是一个基于双止盈、双止损和移动止损的比特币量化交易策略。该策略通过EMA和WMA的交叉作为入场信号,采取双止盈双止损的风险管理方法,在第一个止盈点达到后,采取移动止损保证部分利润,继续追求更大利润。

## 策略原理

当EMA从下方上穿WMA时,做多入场;当EMA从上方下穿WMA时,做空入场。  

止盈方面,设定两个止盈点,第一个止盈点设置为入场点之上20个点,第二个止盈点设置为入场点之上40个点。  

止损方面,同样设定两个止损点,第一个止损点设置为入场点之下20个点,第二个止损点设置为入场点本身。

当价格首先触及第一个止盈点时,平掉50%的头寸,并把止损点移至入场点,继续追求第二个止盈点的更大利润。

这样,该策略会有三种结果:  
1. 价格首先触及止损点,损失2%本金;
2. 价格首先触及第一个止盈点,获得1%利润,之后触及第二个止损点,最终获得1%利润;  
3. 价格首先触及第一个止盈点,获得1%利润,之后继续运行触及第二个止盈点,最终获得3%利润。

## 优势分析

该策略最大的优势在于风险管理体系。通过设置双止盈双止损,可以在获得部分利润后,采取移动止损来锁定利润,继续追求更大利润。这可以显著提高盈利能力。

另一个优势是,该策略将单次交易的结果细分为三种情况,降低了单次损失的概率,使整体收益更加平稳。普通策略只有两种结果,要么止损掉2%,要么获得比2%更大的盈利。而本策略有三种结果,分别是损失2%、获得1%和获得3%。这也更好地控制了尾部风险。

## 风险分析

本策略的风险主要来自止损点的设置。止损距离过于宽松,可能导致单次损失过大;而止损距离过于狭窄,则容易被市场噪音击出。这需要根据不同品种的特性和波动率来设定合适的止损距离。

另一个风险是在第一个止盈点后仍持有头寸的部分存在亏损风险。如果亏损超过第一个止盈的利润,会抵消掉部分或全部利润。这需要严格执行移动止损来锁定利润。

## 优化方向

本策略可以从以下几个方面进行优化:

1. 测试不同的参数组合,寻找最优的参数设置。例如可以测试15个点、25个点的止盈止损距离。

2. 尝试其他指标组合,如KDJ、MACD等的指标信号来决定入场。

3. 对第一个止盈点平仓的仓位比例进行优化,是50%适合还是30%或70%更优。

4. 测试移动止损的跟踪速度设置,确保在保证盈利的前提下尽可能缩小亏损空间。

## 总结

本策略整体来说非常稳健,通过双止盈双止损和移动止损,可以显著提高盈利水平,降低尾部风险。优化的空间也比较大,通过参数调整和指标组合还可以获得更好的效果。总的来说,本策略适合那些追求高额稳定收益的投资者。

||

## Overview

This is a Bitcoin quantitative trading strategy based on dual take profit, dual stop loss and trailing stop loss. It uses EMA and WMA crossover as entry signals, adopts dual take profit and dual stop loss risk management methodology, and applies trailing stop loss after the first take profit is achieved to lock in partial profits while seeking greater profits.   

## Strategy Logic

Long entry when EMA crosses over WMA from below, and short entry when EMA crosses under WMA from above.

On the profit side, there are two take profit targets. The first take profit is set at 20 pips above the entry price, and the second take profit is set at 40 pips above the entry price.  

On the stop loss side, there are also two stop losses. The first stop loss is set at 20 pips below the entry price, and the second stop loss is set at the entry price itself.

When the first take profit is triggered, 50% of the position will be closed, and stop loss will be trailed to the entry price to lock in profits, while seeking for greater profits from the second take profit target.

As such, there can be three possible outcomes for each trade:
1. Price hits stop loss first, lose 2% capital. 
2. Price hits first take profit first for 1% profit, then hits second stop loss, end up with 1% profit.
3. Price hits first take profit first for 1% profit, continues to run and hits second take profit, end up with 3% profit.  

## Advantage Analysis  

The biggest advantage of this strategy lies in its risk management methodology. By setting dual take profits and dual stop losses, it can lock in partial profits after the first take profit is achieved, while continuing to seek greater profits. This can significantly improve the profitability.  

Another advantage is that by dividing a single trade into three possible outcomes, it lowers the probability of maximum loss, making the overall returns more consistent. Typical strategies have only two outcomes - either hit 2% stop loss or win more than 2%. This strategy has three outcomes - lose 2%, win 1%, and win 3%, which also better controls the tail risks.

## Risk Analysis

The main risks of this strategy come from the stop loss setting. If the stop loss distance is too wide, it may result in oversized single trade loss. If the stop loss distance is too tight, it may get stopped out prematurely by market noises. Proper stop loss distance needs to be set based on the characteristics and volatility of different trading instruments.  

Another risk is the remaining position after first take profit still carries loss risks. If the subsequent loss exceeds the first take profit, it will offset parts or all of the realized profits. This needs to be addressed by strictly trailing the stop loss to protect profits locked. 

## Optimization Directions  

The following areas can be optimized for the strategy:

1. Test different parameter combinations to find optimum parameters, such as testing 15 pips, 25 pips take profit/stop loss distances.  

2. Try other technical indicator combinations for entry signals, such as KDJ, MACD crossover.

3. Optimize percentage of position closed at first take profit, such as 50% may not be optimal, 30% or 70% could perform better potentially.  

4. Test different settings for trailing stop loss speed to balance locking in profits and giving prices enough room to fluctuate.  

## Conclusion  

In conclusion, this is an overall robust strategy, which can significantly improve profitability and reduce tail risks through the dual take profit, dual stop loss and trailing stop loss mechanisms. There is also ample room for optimization via parameter tuning and technical indicator engineering to achieve even better performance. It is suitable for investors who pursue high and steady investment gains.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Buy|
|v_input_2|true|Sell|
|v_input_3|2020|Start year|
|v_input_4|true|Start month|
|v_input_5|true|Start day|
|v_input_6|false|Start hour|
|v_input_7|false|Start minute|
|v_input_8|false|set end time?|
|v_input_9|2019|end year|
|v_input_10|12|end month|
|v_input_11|31|end day|
|v_input_12|23|end hour|
|v_input_13|59|end minute|
|v_input_14|10|EMA period|
|v_input_15|20|WMA period|
|v_input_16|20|pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-11 00:00:00
end: 2024-01-18 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SL1 Pips after TP1 (MA)", commission_type=strategy.commission.cash_per_order, overlay=true)

// Strategy
Buy  = input(true)
Sell = input(true)

// Date Range
start_year    = input(title='Start year'   ,defval=2020)
start_month   = input(title='Start month'  ,defval=1)
start_day     = input(title='Start day'    ,defval=1)
start_hour    = input(title='Start hour'   ,defval=0)
start_minute  = input(title='Start minute' ,defval=0)
end_time      = input(title='set end time?',defval=false)
end_year      = input(title='end year'     ,defval=2019)
end_month     = input(title='end month'    ,defval=12)
end_day       = input(title='end day'      ,defval=31)
end_hour      = input(title='end hour'     ,defval=23)
end_minute    = input(title='end minute'   ,defval=59)

// MA
ema_period = input(title='EMA period',defval=10)
wma_period = input(title='WMA period',defval=20)
ema        = ema(close,ema_period)
wma        = wma(close,wma_period)

// Entry Condition
buy =
 crossover(ema,wma) and
 nz(strategy.position_size) == 0 and Buy
 
sell =
 crossunder(ema,wma) and
 nz(strategy.position_size) == 0 and Sell

// Pips
pip = input(20)*10*syminfo.mintick

// Trading parameters //
var bool  LS  = na
var bool  SS  = na
var float EP  = na
var float TVL = na
var float TVS = na
var float TSL = na
var float TSS = na
var float TP1 = na
var float TP2 = na
var float SL1 = na
var float SL2 = na

if buy or sell and strategy.position_size == 0
    EP  := close
    SL1 := EP - pip     * (sell?-1:1)
    SL2 := EP - pip     * (sell?-1:1)
    TP1 := EP + pip     * (sell?-1:1)
    TP2 := EP + pip * 2 * (sell?-1:1) 
   
// current trade direction    
LS := buy  or strategy.position_size > 0
SS := sell or strategy.position_size < 0

// adjust trade parameters and trailing stop calculations
TVL := max(TP1,open) - pip[1]
TVS := min(TP1,open) + pip[1]
TSL := open[1] > TSL[1] ? max(TVL,TSL[1]):TVL 
TSS := open[1] < TSS[1] ? min(TVS,TSS[1]):TVS

if LS and high > TP1
    if open <= TP1
        SL2:=min(EP,TSL)
    
if SS and low < TP1
    if open >= TP1
        SL2:=max(EP,TSS)

// Closing conditions
close_long  = LS and open < SL2
close_short = SS and open > SL2

// Buy
strategy.entry("buy"  , strategy.long, when=buy and not SS)
strategy.exit ("exit1", from_entry="buy", stop=SL1, limit=TP1, qty_percent=1)
strategy.exit ("exit2", from_entry="buy", stop=SL2, limit=TP2)

// Sell
strategy.entry("sell" , strategy.short, when=sell and not LS)
strategy.exit ("exit3", from_entry="sell", stop=SL1, limit=TP1, qty_percent=1)
strategy.exit ("exit4", from_entry="sell", stop=SL2, limit=TP2)

// Plots
a=plot(strategy.position_size >  0 ? SL1 : na, color=#dc143c, style=plot.style_linebr)
b=plot(strategy.position_size <  0 ? SL1 : na, color=#dc143c, style=plot.style_linebr) 
c=plot(strategy.position_size >  0 ? TP1 : na, color=#00ced1, style=plot.style_linebr) 
d=plot(strategy.position_size <  0 ? TP1 : na, color=#00ced1, style=plot.style_linebr) 
e=plot(strategy.position_size >  0 ? TP2 : na, color=#00ced1, style=plot.style_linebr) 
f=plot(strategy.position_size <  0 ? TP2 : na, color=#00ced1, style=plot.style_linebr) 
g=plot(strategy.position_size >= 0 ? na  : EP, color=#ffffff, style=plot.style_linebr) 
h=plot(strategy.position_size <= 0 ? na  : EP, color=#ffffff, style=plot.style_linebr) 

plot(ema,title="ema",color=#fff176)
plot(wma,title="wma",color=#00ced1)

```

> Detail

https://www.fmz.com/strategy/439360

> Last Modified

2024-01-19 15:07:04
