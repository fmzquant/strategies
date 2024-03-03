
> Name

T3均线通道突破策略T3-Moving-Average-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略利用T3均线及其通道来识别趋势方向,在价格突破通道时产生交易信号。

具体交易逻辑:

1. 计算一条T3均线,表示中线

2. 计算均线的通道范围,上轨为均线加范围,下轨为均线减范围

3. 当价格上穿上轨时,做多

4. 当价格下穿下轨时,做空

5. 背景色变化代表趋势转折,辅助判断

T3均线是一种对延迟较小的均线,通道突破时反应迅速,有利于捕捉转折。该策略还利用背景色辅助判断长期趋势,综合多种因素确定交易时机。

## 策略优势

- T3均线延迟较小,反应灵敏

- 通道突破发出明确的交易信号

- 结合背景色判断,避免错 trades

## 策略风险

- 需反复测试确定合适的参数

- 突破交易容易被套,需要谨慎

- 信号频繁,可适当加大突破幅度

## 总结

该策略利用T3均线的灵敏性,在通道突破点位进行交易。辅以背景色判断长线趋势。通过参数优化,可在效率和稳定性之间取得平衡。但需注意防止过度交易。

[trans]

||

## Strategy Logic

This strategy uses a T3 moving average and its channels to identify trend direction, generating signals when price breaks the channel lines. 

The trading logic is:

1. Plot a T3 MA as the middle line 

2. Calculate the channel range around the MA as upper and lower bands

3. Go long when price breaks above the upper band 

4. Go short when price breaks below the lower band

5. Background color changes indicate trend shifts

The T3 MA has less lag and reacts faster to breakouts. The strategy also uses background color to aid long term trend judgement, combining factors for robust signals.

## Advantages

- T3 MA has less lag and faster reaction

- Clear trade signals from channel breakouts

- Background color avoids bad trades against the trend

## Risks

- Requires iterative testing to find optimal parameters

- Breakout trades prone to traps need caution 

- Frequent signals, consider wider breakouts

## Summary

This strategy capitalizes on the T3 MA's sensitivity by trading channel breakouts, with background color indicating the long-term trend. Parameter optimization can achieve a balance between efficiency and stability. But over-trading risks require prudence.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|24|DTMA Lenth|
|v_input_2_close|0|DTMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2023-04-15 00:00:00
period: 4d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Trader_7ye

//@version=4

strategy(title="T3MA_KC_7ye  Strategy", shorttitle="T3MA_KC_7ye  Strategy",max_bars_back=500,overlay=true,default_qty_type=strategy.percent_of_equity,default_qty_value=100,initial_capital=5000,currency=currency.USD)

t3(src,len)=>
    xe1 = ema(src, len)
    xe2 = ema(xe1, len)
    xe3 = ema(xe2, len)
    xe4 = ema(xe3, len)
    xe5 = ema(xe4, len)
    xe6 = ema(xe5, len)
    b = 0.7
    c1 = -b*b*b
    c2 = 3*b*b+3*b*b*b
    c3 = -6*b*b-3*b-3*b*b*b
    c4 = 1+3*b+b*b*b+3*b*b
    c1 * xe6 + c2 * xe5 + c3 * xe4 + c4 * xe3
    
 
Length = input(title="DTMA Lenth", type=input.integer, defval=24, minval=1)
xPrice = input(title="DTMA Source", type=input.source, defval=close)
T3ma=t3(xPrice,Length)

upCol = T3ma > T3ma[1] 
downCol = T3ma < T3ma[1]


range= high - low
rangema=t3(range,Length)

upper = T3ma + rangema
lower = T3ma - rangema

myColor = upCol ? color.lime : downCol ? color.red : na
plot(T3ma, color=myColor, title="T3 Slow")

c = color.blue
u = plot(upper, color=#0094FF, title="Upper")
l = plot(lower, color=#0094FF, title="Lower")
fill(u, l, color=#0094FF, transp=95, title="Background")
buySignal = upCol and ohlc4>upper
sellSignal= downCol and ohlc4<lower

//=======输出======= 
//多空颜色判断
direction=0
direction:=buySignal?1:sellSignal?-1:direction[1]
macolor=direction==1?color.green:color.red

//多信号处理为一个信号
alertlong = direction!=direction[1] and direction== 1
alertshort= direction!=direction[1] and direction==-1
bgcolor(alertshort ? color.red : alertlong?color.lime:na, transp=20)

if (alertlong)
    strategy.entry("Long", strategy.long)
if (alertshort)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/426786

> Last Modified

2023-09-14 15:51:25
