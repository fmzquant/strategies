
> Name

双均线Stoch指标组合交易策略Dual-MA-Stoch-Indicators-Combo-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过组合运用均线指标和Stoch指标,设计一个具有趋势判断和超买超卖判定功能的量化交易系统。该策略综合多个指标的优势,进行系统化的趋势判断和机会捕捉。

策略原理:

1. 计算中长期均线(MA)和短期均线(EMA),作为确定趋势方向的技术指标。

2. 计算Stoch K值和D值,判断是否进入超买或超卖状态。

3. 当CLOSE从下向上突破MA,并且Stoch K值和D值都高于超买线时,判断为长线入场时点,做多。

4. 当CLOSE从上向下突破EMA,并且Stoch K值和D值都低于超卖线时,判断为短线入场时点,做空。

5. 以COLOR标记判断的交易方向。

该策略优势:

1. 双均线组合判断主趋势方向,可避免错误信号。

2. Stoch指标识别超买超卖区域,提高获利概率。

3. 组合使用多个指标,可以相互验证,增加信号可靠性。

该策略风险:

1. 参数优化不当,会出现交易频繁或信号不一致情况。

2. 均线和Stoch均可能出现滞后情况,导致入场过早或过晚。

3. 多指标组合虽提高可靠性,但也增加了策略复杂度。

总之,该策略通过运用均线判断趋势,Stoch判断超买超卖,进行量化交易。在参数调整优化的前提下,可以提高交易系统稳定性和可靠性。但任何量化策略都需严格的风险管理,投资者仍需审慎判断使用。

||

This strategy combines moving averages and Stoch indicators into a quantitative trading system with both trend-following and overbought/oversold detection capabilities. It integrates the strengths of multiple indicators for systematic trend identification and opportunity capture.

Strategy Logic: 

1. Calculate long-term MA and short-term EMA to determine trend direction.

2. Calculate Stoch K and D values to identify overbought/oversold levels.

3. When CLOSE breaks above MA, and Stoch K&D are above overbought line, go long. 

4. When CLOSE breaks below EMA, and Stoch K&D are below oversold line, go short.

5. Use COLOR to mark determined trade direction.

Advantages:

1. Dual MAs improve trend accuracy and avoid false signals.

2. Stoch identifies high-probability buy/sell zones. 

3. Combining indicators improves reliability through verification.

Risks:

1. Poor parameter tuning causes excessive signals or inconsistencies. 

2. Both MAs and Stoch can lag, causing premature or delayed entries.

3. More indicators mean more complexity despite improved reliability.

In summary, this strategy quantitatively trades using MAs for trend and Stoch for overbought/oversold levels. With robust parameter optimization, it can improve system stability and reliability. But prudent risk management is still required, and investors should apply discretion.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|MA (green)|
|v_input_2|25|EMA (red)|
|v_input_3|20|STOCH - K|
|v_input_4|2|STOCH - D|
|v_input_5|2|STOCH - Smooth|
|v_input_6|50|Long when Close > MA and Stoch > |
|v_input_7|80|Short when Close < EMA and Stoch < |
|v_input_8|2019|Strategy Test Start Year|
|v_input_9|true|Strategy Test Start Month|
|v_input_10|true|Strategy Test Start Day|
|v_input_11|2019|Strategy Test Stop Year|
|v_input_12|12|Strategy Test Stop Month|
|v_input_13|31|Strategy Test Stop Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// strategy("PMB2", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 20, initial_capital=1000, currency=currency.USD)
//study(title="PMB2", overlay=true)

l_ma = input(50, title="MA (green)", type=input.integer)
l_ema = input(25, title="EMA (red)", type=input.integer)

MA = sma(close,l_ma)
EMA = ema(close,l_ema)

plot(MA, color=color.green)
plot(EMA, color=color.red)

//STOCH(14,3,3)
length = input(20, minval=1, title="STOCH - K")
smoothK = input(2, minval=1, title="STOCH - D")
smoothD = input(2 , minval=1, title="STOCH - Smooth")

StkLong= input(50 , minval=1, maxval=100, title="Long when Close > MA and Stoch > ")
StkShort= input(80 , minval=1, maxval=100, title="Short when Close < EMA and Stoch < ")

k = sma(stoch(close, high, low, length), smoothK)
d = sma(k, smoothD)
//plot(k, color=color.blue, title="STOCH - K")
//plot(d, color=color.orange, title="STOCH - D")
//band180 = hline(80, title="STOCH - Banda superior")
//band120 = hline(20, title="STOCH - Banda superior")
//band100 = hline(50,  color=color.gray, editable=false, linestyle=hline.style_solid)
//fill(band180, band120, color=color.gray, transp=75, title="STOCH - Fundo")

BTStartY = input(title="Strategy Test Start Year", type=input.integer, defval=2019, minval=2010, maxval=2100)
BTStartM = input(title="Strategy Test Start Month", type=input.integer, defval=1, minval=1, maxval=12)
BTStartD = input(title="Strategy Test Start Day", type=input.integer, defval=1, minval=1, maxval=31)
BTStopY = input(title="Strategy Test Stop Year", type=input.integer, defval=2019, minval=2010, maxval=2100)
BTStopM = input(title="Strategy Test Stop Month", type=input.integer, defval=12, minval=1, maxval=12)
BTStopD = input(title="Strategy Test Stop Day", type=input.integer, defval=31, minval=1, maxval=31)

// set up min and max date for strategy test
TMin = timestamp(BTStartY, BTStartM, BTStartD, 00, 00)
TMax = timestamp(BTStopY, BTStopM, BTStopD, 00, 00)
InTime = true

bool long = false, short = false, trade = false

trade := trade[1]
long := long[1]
short := short[1]

if (crossover(close, MA) and k > StkLong and d > StkLong) // "LONG!"
//if (close > MA and k > StkLong and d > StkLong) // "LONG!"
    short := false
    long := true
    trade := true // LONG

if (crossunder(close, EMA)  and k < StkShort and d < StkShort) // "SHORT!""
//if (close < EMA and k < StkShort and d < StkShort) // "SHORT!""
    long := false
    short := true
    trade := false // SHORT


//bgcolor(FL > SH ? color.green : FH < SL ? color.red : na, transp=80)
bgcolor(trade ? color.green : color.red, transp=90)

//alertcondition((crossover(close, MA) and k > 50 and d > 50) , title='Buy', message='Buy')
//alertcondition((crossunder(close, EMA) and k > 80 and d > 80) , title='Sell', message='Sell')


if ((crossover(close, MA) and k > StkLong and d > StkLong) and InTime)
//if ((close > MA and k > StkLong and d > StkLong) and InTime)
    strategy.entry("Long", strategy.long)

if ((crossunder(close, EMA) and k < StkShort and d < StkShort)  and InTime)
//if ((close < EMA and k < StkShort and d < StkShort)  and InTime)
    strategy.entry("Short", strategy.short)
    




```

> Detail

https://www.fmz.com/strategy/426482

> Last Modified

2023-09-12 14:44:56
