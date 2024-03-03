
> Name

同级高低策略Same-High-Low-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略基于K线出现同级高低点的形态进行交易。当出现一周K线的双底或双顶形态时,作为交易信号的触发条件。

具体交易逻辑是:

1. 判断当前K线或前一K线的最高价等于最高价的前两K线

2. 判断当前K线或前一K线的最低价等于最低价的前两K线

3. 双底形态出现时,当价格低点突破则做多

4. 双顶形态出现时,当价格高点突破则做空

5. 止损点设置为突破点附近,止盈点为ATR指标值乘以系数

该策略试图抓取突破同级高低点后价格的趋势运行机会。通过止损止盈策略控制风险。

## 策略优势

- 同级高低易识别,突破信号明确

- ATR止盈方式可动态跟踪趋势

- 规则简单清晰,可控的风险

## 策略风险

- 同级高低形成较为少见

- 止损点过于接近,存在被止损风险

- 需要关注ATR参数的设定

## 总结

该策略通过捕捉同级高低突破机会进行趋势交易。但需关注止损止盈策略的设定,以及交易频率问题。


||

## Strategy Logic

This strategy trades based on price patterns forming same high/low levels. Consecutive weekly double bottom or double top formations trigger trades. 

The logic is:

1. Identify current or prior bar high/low equaling the high/low 2 bars earlier 

2. Double bottom pattern triggers long on low breakout

3. Double top pattern triggers short on high breakout 

4. Stop loss placed near breakout level, take profit based on ATR multiple

It aims to capitalize on trend resumption after breaking same high/low levels. Stops and profit targets control risk.

## Advantages

- Same high/low easy to identify, clear breakout signals

- ATR-based profit take dynamically trails trends

- Simple rules, defined risk

## Risks 

- Same high/low patterns less common

- Stops too close risk being stopped out

- ATR parameter setting needs attention

## Summary

This strategy catches trend trades from same high/low breakouts. But stop/profit tuning and lower frequency requires consideration.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|5|ATR length for abnormal candles|
|v_input_int_2|14|(?Strategy Settings)ATR length for take profit|
|v_input_int_3|5|ATR multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cherepanovvsb

//@version=5
strategy("SHL", overlay=true, margin_long=100, margin_short=100,initial_capital=100,default_qty_type = strategy.cash,default_qty_value =40,commission_type = strategy.commission.percent,commission_value =0.04,currency="EUR", process_orders_on_close=true)
atr = input.int(title="ATR length for abnormal candles", defval=5)
plotshape(low == low[1], style=shape.triangleup, location=location.belowbar, color=color.blue, title="1 Setup")
plotshape(high==high[1], style=shape.triangledown, location=location.abovebar, color=color.blue, title="1 Setup")
plotshape(low == low[1] and low[1]==low[2], style=shape.triangleup, location=location.belowbar, color=color.red, title="Triple Setup")
plotshape(low==high[1] or low==high[2] or low==high[3] or low==high[4] or low==high[5] or low==high[6], style=shape.triangleup, location=location.belowbar, color=color.green, title="Mirror Setup")
plotshape(high==low[1] or high==low[2] or high==low[3] or high==low[4] or high==low[5] or high==low[6], style=shape.triangledown, location=location.abovebar, color=color.green, title="Mirror Setup")
barcolor(high-low>2*ta.atr(atr)? color.yellow:na)


ATRlenght   = input.int(title="ATR length for take profit", defval=14, group="Strategy Settings")
rewardMultiplier= input.int(title="ATR multiplier", defval=5, group="Strategy Settings")

// Get ATR
atr1 = ta.atr(ATRlenght)

validlow =  low[1] == low[2] and not na(atr1)
validhigh = high[1]==high[2] and not na(atr1)

validlong = validlow and strategy.position_size == 0 and low[1]<low 
validshort = validhigh and strategy.position_size == 0 and high[1]>high

// Calculate Entrance, SL/TP
longStopPrice = low[1]-syminfo.mintick
longStopDistance = close - longStopPrice
longTargetPrice = close + (longStopDistance * rewardMultiplier)
shortStopPrice = high[1]+syminfo.mintick
shortStopDistance = shortStopPrice - close
shortTargetPrice = close - (shortStopDistance * rewardMultiplier)
var tradeStopPrice = 0.0
var tradeTargetPrice = 0.0
if validlong 
    tradeStopPrice := longStopPrice
    tradeTargetPrice := longTargetPrice
if validshort 
    tradeStopPrice := shortStopPrice
    tradeTargetPrice := shortTargetPrice
strategy.entry ("Long", strategy.long,1, when=validlong)
strategy.entry ("Short", strategy.short,1, when=validshort)

strategy.exit(id="Long Exit", from_entry="Long", limit=tradeTargetPrice, stop=tradeStopPrice, when=strategy.position_size > 0)
strategy.exit(id="Short Exit", from_entry="Short", limit=tradeTargetPrice, stop=tradeStopPrice, when=strategy.position_size < 0)

plot(strategy.position_size != 0 or validlong or validshort ? tradeStopPrice : na, title="Trade Stop Price", color=color.red, style=plot.style_linebr, transp=0)
plot(strategy.position_size != 0 or validlong or validshort ? tradeTargetPrice : na, title="Trade Target Price", color=color.green, style=plot.style_linebr, transp=0)
```

> Detail

https://www.fmz.com/strategy/426830

> Last Modified

2023-09-14 17:53:17
