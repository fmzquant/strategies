
> Name

TEMADEMAHMA组合趋势跟随策略TEMA-DEMA-HMA-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略通过TEMA、DEMA和HMA三种不同类型的移动平均线的组合应用,在中短期均线TEMA和DEMA发出金叉/死叉信号时入场,并利用长期均线HMA来判断趋势方向,过滤掉逆势交易信号。

### 策略原理

1. 计算TEMA、DEMA和HMA三条移动平均线
2. 当TEMA上穿DEMA时,做多入场
3. 当TEMA下穿DEMA时,做空入场
4. 计算长期HMA的趋势方向,只在HMA显示同向趋势时才入场

具体来说,该策略同时利用双指数移动平均线DEMA判断中期趋势,三指数移动平均线TEMA判断短期趋势,以及致密型移动平均线HMA判断长期趋势。只有当短中期在同一方向上启动(TEMA和DEMA同向突破)且长期主趋势也是同向(HMA方向与突破一致)时,才产生交易信号。

### 优势分析

1. 组合多种均线,提高判断准确性
2. HMA的趋势过滤可避免逆势交易
3. TEMA和DEMA可形成较明确的交易信号
4. 可自定义三条均线的参数,适应不同周期
5. 顺势交易,回撤风险较小

### 风险分析 

1. 三线组合较复杂,需要调优多个参数
2. HMA趋势判断可能滞后于价格
3. 存在一定程度的滞后交易风险
4. 参数不当可能增加不必要的反向交易

可通过多组参数测试找到最佳参数组合,引入止损策略,适当放宽入场条件等方式管理风险。

### 优化方向

1. 测试不同均线周期参数找出最优组合
2. 评估加入MACD等指标作为辅助判断
3. 加入移动止损以锁定利润,降低回撤
4. 研究不同品种的参数偏好,建立参数优化体系
5. 放宽入场条件,在长期趋势存在时采取趋势交易

### 总结

本策略通过组合运用多种均线指标判断趋势。优点是信号生成明确,可配置空间大;缺点是存在滞后风险及多参数依赖。通过Parameter优化、止损策略等可控制风险,发挥组合均线的优势。该策略可助力交易者全面掌握趋势交易技巧。

|| 

### Overview 

This strategy combines TEMA, DEMA and HMA moving averages to enter on TEMA/DEMA golden cross/dead cross signals, using HMA to determine trend direction to filter counter-trend trades.

### Strategy Logic

1. Calculate TEMA, DEMA and HMA moving averages  
2. Go long when TEMA crosses above DEMA
3. Go short when TEMA crosses below DEMA
4. Calculate HMA trend direction, only enter if aligning with HMA trend

Specifically, it uses DEMA to gauge medium-term trend, TEMA for short-term trend, and HMA for long-term trend. Trades are taken only when short/medium-term moves in alignment (TEMA/DEMA coordinated breakout), and long-term trend agrees (HMA direction matches breakout). 

### Advantage Analysis

1. Combining multiple moving averages improves accuracy
2. HMA trend filter avoids counter-trend trades 
3. TEMA/DEMA forms clear trading signals
4. Custom periods for three lines fit different cycles  
5. Trading with trend reduces drawdown risks

### Risk Analysis

1. Complex multi-line combination requires parameter tuning
2. HMA trend may lag price movement
3. Risks of lagging entry exist 
4. Bad parameters may increase unnecessary reverse trades

Risks can be managed by parameter optimization, stop loss, relaxing entry rules etc.

### Optimization Directions

1. Test different period combinations to find optimal parameters
2. Evaluate adding MACD etc. as auxiliary confirmation
3. Add trailing stop loss to lock in profits, reduce drawdown
4. Study parameter preferences across different products  
5. Relax entry rules to trade with long term trend

### Summary

This strategy generates signals by combining multiple moving average indicators to determine trend. Pros are clear signals and high configurability; Cons are lagging risks and parameter dependency. Risks can be controlled via parameter optimization, stop loss etc. to utilize the power of a combined moving average system. It helps traders comprehensively master trend trading techniques.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|TEMA Length|
|v_input_2|43|DEMA Length|
|v_input_3|52|Hull Length|
|v_input_4|2|Hull Trend Test Length|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tuned-com

//@version=4
strategy("TEMA/DEMA/HMA", overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=1000000, commission_type=strategy.commission.percent, commission_value=0.1)

Tlength = input(8, title="TEMA Length", minval=1)
Dlength = input(43, title="DEMA Length", minval=1)
Hlength = input(52, title="Hull Length", minval=1)
Rlength = input(2, title="Hull Trend Test Length", minval=1)


//TEMA//
ema1 = ema(close, Tlength)
ema2 = ema(ema1, Tlength)
ema3 = ema(ema2, Tlength)
tema = 3 * (ema1 - ema2) + ema3

//DEMA//
e1 = ema(close, Dlength)
e2 = ema(e1, Dlength)
dema = 2 * e1 - e2

//HMA//
hma = wma(2 * wma(close, Hlength / 2) - wma(close, Hlength), round(sqrt(Hlength)))


up = crossunder(dema, tema) and rising(hma, Rlength)
down = crossover(dema, tema) and falling(hma, Rlength)

downc = crossunder(dema, tema)
upc = crossover(dema, tema)

plot(dema, color=color.green, linewidth=2)
plot(tema, color=color.aqua, linewidth=2)

plot(hma, color=rising(hma, Rlength) ? color.green : na, linewidth=2, transp=0)
plot(hma, color=falling(hma, Rlength) ? color.red : na, linewidth=2, transp=0)

bgcolor(rising(hma, Rlength) ? color.green : na, transp=70)
bgcolor(falling(hma, Rlength) ? color.red : na, transp=70)

plotarrow(tema - dema, colorup=color.green, colordown=color.red, transp=70)



if up
    strategy.entry("Long Entry", strategy.long)

if down
    strategy.entry("Short Entry", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427449

> Last Modified

2023-09-21 10:56:41
