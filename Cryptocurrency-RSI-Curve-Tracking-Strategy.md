
> Name

Cryptocurrency-RSI-Curve-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description



[trans]
加密货币RSI曲线跟踪策略

该策略专门为加密货币市场设计,通过组合使用超长周期RSI指标和RVI指标来判断入场和出场时机。

具体来说,当RVI指标显示处于买入区,并且超长周期RSI指标上穿超买线时,做多入场。平仓条件为RVI指标进入卖出区,RSI指标下穿超卖区时止损出场。

这种策略的优势在于超长周期RSI可以更准确地判断趋势,避免被套。RVI指标辅助判断买卖压力,提高入场精确性。止损方式可以及时止损,降低回撤。

但是,RSI和RVI指标都具有滞后性,无法及时捕捉转折点。需要适当放宽参数,或加入移动止损来应对突发事件。此外,RSI指标对复杂行情解析能力较弱。

总的来说,加密货币RSI曲线跟踪策略可配合强势趋势行情获得不错效果。但交易者仍需积极管理仓位,优化参数,并关注基本面因素,方可获得长期稳定收益。

||

This strategy is designed for the cryptocurrency market, using a combination of ultra-long period RSI and RVI indicators to determine entries and exits. 

Specifically, long entries are taken when RVI shows the buy zone, and the super long RSI crosses above overbought level. Exits occur when RVI enters sell zone, and RSI crosses below oversold level for stop loss.

The advantage of this strategy is the ultra-long RSI can more accurately determine trends to avoid whipsaws. RVI assists in gauging buy/sell pressure for higher entry precision. The stop loss method allows timely cut loss to reduce drawdowns.

However, both RSI and RVI have lagging issues, and cannot promptly capture turning points. Loosened parameters or moving stops are needed to adapt to spikes. Also, RSI has limited capabilities in decoding complex price action.

In summary, the cryptocurrency RSI curve tracking strategy can produce decent results when combined with strong trending moves. But active position management, parameter tuning, and monitoring fundamentals are still essential for traders to achieve long-term steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Period|
|v_input_2|49|BuyZone|
|v_input_3|50|SellZone|
|v_input_4|false|Trade reverse|
|v_input_5|100|risk|
|v_input_6|2.5|leverage|
|v_input_7|0.2|sl|
|v_input_8|true|tp|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

strategy(title="Crypto RSI + RVI Strategy", overlay=true, initial_capital = 1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.03, pyramiding=1  )

Period = input(100, minval=1)
BuyZone = input(49, minval=1)
SellZone = input(50, minval=1)

length=Period
MA_s=0.0
pos=0.0
possig=0.0
nU=0.0
nD=0.0
nRes=0.0
ob=SellZone
os=BuyZone

WiMA(src, length) => 
    MA_s=0.0
    MA_s:=(src + nz(MA_s[1] * (length-1)))/length
    MA_s

calc_rsi_volume(fv, length) =>    
    up=iff(fv>fv[1],abs(fv-fv[1])*volume,0)
    dn=iff(fv<fv[1],abs(fv-fv[1])*volume,0)
    upt=WiMA(up,length)
    dnt=WiMA(dn,length)
    100*(upt/(upt+dnt))

rsi_v = calc_rsi_volume(close, length)

// u=plot(ob)
// l=plot(os)
// fill(u,l,color.red)
// plot(50)
// plot(rsi_v, color=color.red, linewidth=1)

 

reverse = input(false, title="Trade reverse")
xPrice = close
StdDev = stdev(xPrice, Period)
d = iff(close > close[1], 0, StdDev)
u = iff(close > close[1], StdDev, 0)
nU := (13 * nz(nU[1],0) + u) / 14
nD := (13 * nz(nD[1],0) + d) / 14
nRes := 100 * nU / (nU + nD)
pos := iff(nRes < BuyZone, -1,
       iff(nRes > SellZone, 1, nz(pos[1], 0))) 
possig := iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))       

 


long=crossover (rsi_v,ob) and (possig == 1) 
short=crossunder(rsi_v,os) and (possig == -1)

g(v, p) => round(v * (pow(10, p))) / pow(10, p)
risk     = input(100)
leverage = input(2.5)
c = g((strategy.equity * leverage / open) * (risk / 100), 4)

strategy.entry("long",1,c,when=long)
strategy.close("long",when=short)
//strategy.entry("short",0,when=short)

 

// ------------------------- Strategy Logic --------------------------------- //
var longOpeneda = false
var shortOpeneda = false
var int timeOfBuya = na

 

longCondition= long and not longOpeneda 

if longCondition
    longOpeneda := true
    timeOfBuya := time


longExitSignala = short
exitLongCondition = longOpeneda[1] and longExitSignala

if exitLongCondition
    longOpeneda := false
    timeOfBuya := na

//plotshape(longCondition, style=shape.labelup, location=location.belowbar, color=color.color.green, size=size.tiny, title="BUY", text="BUY", textcolor=color.color.white)
//plotshape(exitLongCondition, style=shape.labeldown, location=location.abovebar, color=color.color.red, size=size.tiny, title="SELL", text="SELL", textcolor=color.color.white)
sl=input(0.2)
tp=input(1.0)
strategy.exit("long_tp/sl", "long", profit=close * tp / syminfo.mintick, loss=close * sl / syminfo.mintick, comment='long_tp/sl', alert_message = 'closelong')
strategy.exit("short_tp/sl", "short", profit=close * tp / syminfo.mintick, loss=close * sl / syminfo.mintick, comment='short_tp/sl',  alert_message = 'closeshort')

```

> Detail

https://www.fmz.com/strategy/426389

> Last Modified

2023-09-11 17:24:59
