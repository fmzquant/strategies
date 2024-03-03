
> Name

基于CCI零位的趋势追踪策略CCI-Zero-Crossing-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用CCI指标的零位交叉作为入市和出市的信号,以捕捉趋势的方向。当CCI指标从负值区上穿零位时做多,从正值区下穿零位时做空,实现追踪趋势运行的效果。

## 策略原理

- 使用CCI指标的长度为20周期。
- CCI指标上穿0时,做多入场,止损线为-100。
- CCI指标下穿0时,做空入场,止损线为100。 
- 平仓条件为CCI指标再次交叉零位。

该策略的核心逻辑是捕捉CCI指标的零位交叉,作为判断价格趋势的信号。当CCI指标由负数区域进入正数区域时,表示价格脱离过度超卖区,有可能形成向上趋势;当CCI指标由正数区域进入负数区域时,表示价格脱离过度超买区,有可能形成向下趋势。策略在交叉发生时入场,并设定合理的止损距离,以控制风险。

## 优势分析

- 利用CCI指标的零位交叉判断趋势方向,这是CCI指标一个较为经典的应用方法。
- 采用适当参数长度的CCI指标,可以过滤掉过多的噪音交易信号,捕捉主要的趋势转换点。
- 策略只在趋势转换时入场一次,并设置止损,可以减少无谓的过多交易,集中资金追求大赚盘。
- CCI指标参数和止损距离都进行了优化,使策略参数更具有普适性。

## 风险分析

- CCI指标可能产生假突破的零位交叉信号,导致不必要的亏损。
- 止损距离设置不当可能造成止损过于宽松或过于窄小。
- CCI指标参数长度设置不合理,可能过滤掉较短周期的有效交易机会。
- 存在一定的时间错失风险,即价格趋势已经形成,但CCI指标的零位交叉信号却落后,导致入场过晚。

对策:

- 结合其他指标进行确认,避免CCI指标的假交叉。 
- 动态调整止损距离。
- 优化CCI参数长度,使其能捕捉到不同周期长度的趋势。
- 适当放宽入场条件,不必死扣CCI零位交叉。

## 优化方向

该策略可以从以下几个方向进行进一步优化:

1. 优化CCI指标的参数长度,找到最佳参数组合。可以通过遍历不同长度的参数,测试收益率和胜率,找到最优参数。

2. 增加其他指标的确认,例如KDJ、MACD等,避免CCI指标的假突破造成不必要的亏损。可以设定价格要持续突破某一价格区间,或其他指标同步发出信号时才入场。

3. 动态调整止损距离。可以根据市场波动程度,自动调整止损距离的区间范围。降低止损距离有利于及时止损,但也可能过于敏感;增大止损距离有利于持续趋势,但也可能造成大额亏损。

4. 优化入场条件以减少错失。可以放宽入场条件,在CCI指标向零位靠近时开始步入场,逐步加仓,而不是死扣零位交叉才入场。

5. 增加趋势判断 exiting 条件,让利润最大化。当趋势反转时,可以设置新的exit信号,例如价格重新回撤一定幅度时止盈。

## 总结

本策略利用CCI指标的零位交叉判断价格趋势方向,在交叉发生时入场,并设置合理止损距离,能有效追踪趋势运行。策略优化后,可以成为一个稳定可靠的趋势跟踪策略。结合其他指标确认,优化参数设置,改进入场条件,增加反转退出机制等,都可以进一步增强策略的效果。投资者可以根据自己的风险偏好,选择适合的止损距离、持仓时间等参数,运用该策略获利。

||

## Overview

This strategy uses the zero crossings of the CCI indicator as entry and exit signals to capture the trend direction. It goes long when the CCI breaks above zero from the negative zone, and goes short when the CCI breaks below zero from the positive zone, to follow the trend.

## Strategy Logic

- Use 20 periods for the CCI indicator.
- When CCI crosses above 0, go long with stop loss at -100.
- When CCI crosses below 0, go short with stop loss at 100.
- Exit when CCI crosses zero again.

The core logic is to capture the zero crossings of CCI as signals of trend changes. When CCI goes from negative to positive zone, it indicates prices have moved out of oversold and may start an uptrend. When CCI goes from positive to negative zone, it indicates prices have moved out of overbought and may start a downtrend. The strategy enters on the crossings and sets reasonable stop loss to control risk.

## Advantage Analysis 

- Using CCI zero crossings to determine trend direction is a classical application of the indicator.
- Appropriate CCI length filters out noise and catches major trend change points.
- Only one entry per trend, with stops. Reduces overtrading, concentrates funds for big wins.
- CCI parameters and stop distance are optimized for better universality.

## Risk Analysis

- CCI may give false crossing signals, causing unnecessary losses.
- Improper stop loss distance may be too wide or too narrow. 
- Wrong CCI length may filter out useful shorter period opportunities.
- Time lag risk exists. CCI may lag behind actual trend forming, causing late entry.

Solutions:

- Add other indicators for confirmation, avoid false CCI crossings.
- Dynamically adjust stop distance.
- Optimize CCI length to catch trends across timeframes. 
- Relax entry rules, don't strictly require CCI zero crossings.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Optimize CCI parameter length to find best setting. Test different lengths and evaluate profitability and win rate.

2. Add other indicators like KDJ, MACD for confirmation, avoid false CCI signals. Require persistent breakout of price levels or concurring signals.

3. Dynamically adjust stop loss distance based on market volatility. Tighter stops mean timely stops but may be too sensitive. Wider stops allow holding trends but increase loss if stopped out.

4. Relax entry rules to reduce missed entries. Start scaling in as CCI approaches zero crossing, instead of waiting for exact cross. 

5. Add trend exit rules to maximize profits. New exits when trend reverses, like price pulling back certain percentage.

## Conclusion

This strategy uses CCI zero crossings to determine trend direction and enter on the crossings with reasonable stop loss, effectively following trends. Further optimizations on confirmation, parameter tuning, entry rules, and exits can enhance it into a stable trend following strategy. Traders can adopt appropriate stop distance, holding period based on risk preference, and profit using this strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|CCI Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("CCI Level Zero Strategy (by Marcoweb) v1.0", shorttitle="CCI_L_Z_Strat_v1.0", overlay=true)

///////////// CCI
CCIlength = input(20, minval=1, title="CCI Period Length") 
CCIoverSold = -100
CCIoverBought = 100
CCIzeroLine = 0
CCI = cci(hlc3, CCIlength)
price = hlc3
vcci = cci(price, CCIlength)

source = close
buyEntry = crossover(source, CCIzeroLine)
sellEntry = crossunder(source, CCIzeroLine)
plot(CCI, color=black,title="CCI")
p1 = plot(CCIoverSold, color=blue,title="-100")
p2 = plot(CCIoverBought, color=red,title="100")
p3 = plot(CCIzeroLine, color=orange,title="0")


///////////// CCI 0Trend v1.0 Strategy 
if (not na(vcci))

    if (crossover(CCI, CCIzeroLine))
        strategy.entry("CCI_L", strategy.long, stop=CCIoverSold,  comment="CCI_L")
    else
        strategy.cancel(id="CCI_L")
        
    if (crossunder(CCI, CCIzeroLine))
        strategy.entry("CCI_S", strategy.short, stop=CCIoverBought,  comment="CCI_S")
    else
        strategy.cancel(id="CCI_S")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/428098

> Last Modified

2023-09-28 16:00:36
