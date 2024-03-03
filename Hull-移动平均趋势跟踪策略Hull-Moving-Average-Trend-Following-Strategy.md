
> Name

Hull-移动平均趋势跟踪策略Hull-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

Hull移动平均趋势跟踪策略是一种利用Hull移动平均线判断市场趋势方向,并发出买入和卖出信号的量化交易策略。该策略能够捕捉中长线趋势,在趋势开始阶段建立仓位,在趋势反转前平仓止盈。

## 原理

该策略同时使用Hull移动平均线和普通移动平均线判断趋势方向。当短周期Hull MA上穿长周期Hull MA时为买入信号。当短周期Hull MA下穿长周期Hull MA时为卖出信号。

普通移动平均线用来判断即时趋势方向。当短周期EMA上穿长周期EMA时为看涨,当短周期EMA下穿长周期EMA时为看跌。只有Hull MA信号和EMA同向看涨或看跌时,才会发出交易信号。

此外,该策略还利用K线实体通道判断市场波动幅度,避免在震荡市中错交易。只有价格突破通道才考虑建仓。

## 优势

- Hull移动平均线对价格变动更敏感,可以提早捕捉趋势转折。

- 组合使用Hull MA和EMA,可以过滤假信号。

- 利用K线通道判断震荡,避免在盘整中频繁交易。

- 采用趋势跟踪方式,能够持续捕捉中长线趋势的利润。

## 风险

- 移动平均线存在滞后性,可能错过趋势反转的最佳入场点位。

- 震荡势头的判断不准确,可能在盘整中错交易。

- 交易次数较少,容易受单笔损失的影响。

- 无法有效利用短线震荡获利。

## 应对方法

- 优化移动平均线的周期参数,追求及时反应趋势。

- 辅助采用其他指标判断震荡,如RSI、BBANDS等。 

- 采用积极的资金管理,控制单笔损失比例。

- 可辅助采用其他策略来捕捉短线利润。

## 总结

Hull移动平均趋势跟踪策略通过Hull MA和EMA的组合运用,能够有效跟踪中长线趋势。在获利趋势中持续累积利润,并尽早在趋势反转前止盈。这是一个简单实用的量化交易策略,值得推荐。

||

## Overview

The Hull moving average trend following strategy utilizes the Hull moving average to determine market trend direction and generate buy and sell signals. It captures mid-to-long term trends, establishes positions early in trend starts, and closes positions before trend reversals.

## Principles

The strategy uses both the Hull moving average and simple moving average to determine trend direction. When the shorter period Hull MA crosses above the longer period Hull MA, it generates a buy signal. When the shorter Hull MA crosses below the longer one, it generates a sell signal. 

The simple moving average determines real-time trend direction. When the shorter EMA crosses above the longer EMA, it indicates an uptrend. When the shorter EMA crosses below the longer EMA, it indicates a downtrend. Trades are taken only when the Hull MA and EMA signals agree on the bullish or bearish bias.

In addition, the strategy utilizes K-line body channels to gauge market fluctuation and avoid trading in consolidation. Trades are considered only when prices break out of the channel range.

## Advantages

- The Hull MA is more sensitive in detecting price changes and early trend shifts.

- Using both Hull MA and EMA eliminates false signals.

- K-line channels avoid excessive trading in sideways markets.

- Trend following allows sustained profit capture as the trend extends.

## Risks

- Moving averages have lags and may miss optimal trend reversal entry points. 

- Inaccurate consolidation detection may cause bad trades.

- Low trade frequency leads to large impact from single losing trades.

- Unable to capitalize on short-term oscillations.

## Risk Management

- Optimize MA periods for timely trend signal generation.

- Use other indicators like RSI and BBANDS to determine consolidation.

- Exercise aggressive capital management to limit loss percentage per trade.

- Complement with other strategies to harness short-term profits.

## Summary

The Hull moving average trend following strategy effectively tracks mid-to-long term trends through the combined use of Hull MA and EMA. It accumulates profits throughout profit trends and exits early before reversals. This is a simple and practical quant trading strategy worth recommending.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Candle body resistance Channel: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|false|Bar Channel On/Off|
|v_input_3|15|Support / Resistance length:|
|v_input_4|13|EMA 1|
|v_input_5|21|EMA 2|
|v_input_6|false|Display Hull MA Set:|
|v_input_7_close|0|Hull MA's Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|16|Hull MA's Base Length:|
|v_input_9|10|Hull MA's Length Scalar:|
|v_input_10|720|Piriod|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

// strategy(title='HULLMiguel 2019/ Strategy v3', shorttitle='HULLMiguel_2019_Strategy', overlay=true, pyramiding=0, default_qty_value=1000, initial_capital=1000, currency=currency.USD)

//Candle body resistance Channel-----------------------------//
len = 34
src = input(close, title="Candle body resistance Channel")
out = sma(src, len)
last8h = highest(close, 13)
lastl8 = lowest(close, 13)
bearish = cross(close,out) == 1 and falling(close, 1)
bullish = cross(close,out) == 1 and rising(close, 1)
channel2=input(false, title="Bar Channel On/Off")
ul2=plot(channel2?last8h:last8h==nz(last8h[1])?last8h:na, color=black, linewidth=1, style=linebr, title="Candle body resistance level top", offset=0)
ll2=plot(channel2?lastl8:lastl8==nz(lastl8[1])?lastl8:na, color=blue, linewidth=1, style=linebr, title="Candle body resistance level bottom", offset=0)
//fill(ul2, ll2, color=black, transp=95, title="Candle body resistance Channel")

//-----------------Support and Resistance 
RST = input(title='Support / Resistance length:',  defval=15) 
RSTT = valuewhen(high >= highest(high, RST), high, 0)
RSTB = valuewhen(low <= lowest(low, RST), low, 0)
RT2 = plot(RSTT, color=RSTT != RSTT[1] ? na : red, linewidth=1, offset=+0)
RB2 = plot(RSTB, color=RSTB != RSTB[1] ? na : green, linewidth=1, offset=0)

//--------------------Trend colour ema------------------------------------------------// 
src0 = close, len0 = input(13, minval=1, title="EMA 1")
ema0 = ema(src0, len0)
direction = rising(ema0, 2) ? +1 : falling(ema0, 2) ? -1 : 0
plot_color = direction > 0  ? lime: direction < 0 ? red : na
plot(ema0, title="EMA", style=line, linewidth=3, color = plot_color)

//-------------------- ema 2------------------------------------------------//
src02 = close, len02 = input(21, minval=1, title="EMA 2")
ema02 = ema(src02, len02)
direction2 = rising(ema02, 2) ? +1 : falling(ema02, 2) ? -1 : 0
plot_color2 = direction2 > 0  ? green: direction2 < 0 ? red : na
plot(ema02, title="EMA Signal 2", style=line, linewidth=2, color = plot_color2)

//=============Hull MA//
show_hma = input(false, title="Display Hull MA Set:")
hma_src = input(close, title="Hull MA's Source:")
hma_base_length = input(16, minval=1, title="Hull MA's Base Length:")
hma_length_scalar = input(10, minval=0, title="Hull MA's Length Scalar:")
hullma(src, length)=>wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))
plot(not show_hma ? na : hullma(hma_src, hma_base_length+hma_length_scalar*6), color=black, linewidth=5, title="Hull MA")
dif_close_hull= (close-hullma(hma_src, hma_base_length+hma_length_scalar*6))/close
Percent_dif = (dif_close_hull/(hullma(hma_src, hma_base_length+hma_length_scalar*6)))
//direction3 = Percent_dif>0 ? +1 : Percent_dif<0 ? -1 : 0
//plot_color3 = direction3 > 0  ? lime: direction3 < 0 ? red : na
//plot(dif_close_hull, title="dif close hull", style=line, linewidth=6, color = plot_color3)

//============ signal Generator ==================================//
Piriod=input('720')
ch1 = security(syminfo.tickerid, Piriod, open)
ch2 = security(syminfo.tickerid, Piriod, close)
plot(ch1, title="EMA Signal 2", style=line, linewidth=1, color = blue)
//longCondition = crossover(security(tickerid, Piriod, close),security(tickerid, Piriod, open))
//plot((close-ema02)/ema02+close)
longCondition = direction > 0 and direction2> 0

if (longCondition)
    strategy.entry("BUY", strategy.long)
//shortCondition = crossunder(security(tickerid, Piriod, close),security(tickerid, Piriod, open))
shortCondition = direction < 0 and direction2 < 0

if (shortCondition)
    strategy.entry("SELL", strategy.short)

///////////////////////////////////////////////////////////////////////////////////////////
```

> Detail

https://www.fmz.com/strategy/426991

> Last Modified

2023-09-16 18:41:33
