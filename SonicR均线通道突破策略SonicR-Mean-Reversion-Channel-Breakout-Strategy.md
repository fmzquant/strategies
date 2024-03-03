
> Name

SonicR均线通道突破策略SonicR-Mean-Reversion-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略基于SonicR系统的理念,通过均线通道识别趋势方向,并在通道突破时入场,实现趋势跟踪操作。该策略结合均线通道和移动均线指标,进行机械化的趋势交易。

策略原理:

1. 计算均线通道,通道中轴为收盘价的均线,通道上轨和下轨分别为高点和低点的均线。

2. 计算更长周期的移动平均线,作为交易信号线。

3. 当收盘价由下向上突破信号线时,进行做多操作。

4. 当收盘价由上向下突破信号线时,进行做空操作。

5. 使用通道填充可视化呈现均线通道。

该策略的优势:

1. 均线通道可以清晰判断价格趋势和突破。

2. 移动平均线过滤了短期市场噪音。

3. 策略规则简单易行,避免人为情绪影响。

该策略的风险:

1. 均线和移动平均线存在滞后性,可能错过最佳入场点。

2. 需要优化参数,以免出现过多无效信号。

3. 机械交易策略回撤可能较大,需要资金管理。

总之,该策略基于SonicR理念,识别均线通道方向,进行机械化的突破交易。简单的规则有利于系统化交易,但需注意优化和风险控制,方能稳定获得长期收益。

||

This strategy identifies trends using mean reversion channels based on the SonicR system and trades breakouts for trend following. It combines channel and moving average indicators for systematic trend trading. 

Strategy Logic:

1. Calculate mean reversion channel with close EMA as midline and high/low EMAs as upper/lower bands.

2. Calculate a longer period moving average line as trading signal line.

3. Go long when close breaks above signal line. 

4. Go short when close breaks below signal line.

5. Use channel fill for visualization.

Advantages:

1. Channels clearly define trends and breakouts.

2. Moving averages filter out short-term noise.

3. Simple rules avoid emotional interference.

Risks:

1. Lagging channels and moving averages may miss best entries.

2. Parameter tuning needed to avoid excessive false signals.

3. Mechanical systems can face larger drawdowns, requiring risk management.

In summary, this SonicR-based strategy identifies channel direction for systematic breakout trading. The simple rules benefit algorithmic trading but still require optimization and risk control for steady long-term gains.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|89|EMA Signal|
|v_input_2|34|High Low channel Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-11 00:00:00
end: 2022-11-12 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//Sonic R
// strategy("SonicR",shorttitle="Sonic R",overlay=true,default_qty_value=10000,initial_capital=1000,currency=currency.USD)
EMA = input(defval=89, title="EMA Signal")
HiLoLen     = input(34, minval=2,title="High Low channel Length")
pacC        = ema(close,HiLoLen)
pacL        = ema(low,HiLoLen)
pacH        = ema(high,HiLoLen)
DODGERBLUE = #1E90FFFF
// Plot the Price Action Channel (PAC) base on EMA high,low and close
L=plot(pacL, color=DODGERBLUE, linewidth=1, title="High PAC EMA",transp=50)
H=plot(pacH, color=DODGERBLUE, linewidth=1, title="Low PAC EMA",transp=50)
C=plot(pacC, color=DODGERBLUE, linewidth=2, title="Close PAC EMA",transp=0)
fill(L,H, color=aqua,transp=90,title="Fill HiLo PAC")
//Moving Average
signalMA =ema(close,EMA)
plot(signalMA,title="EMA Signal",color=white,linewidth=4,style=line)
//Strategy
goLong() => crossover(pacC,signalMA)
strategy.entry(id = "Go to Buy", long = true, when = goLong())
goShort() => crossunder(pacC,signalMA)
strategy.entry(id = "Go to Sell", long = false, when = goShort())

```

> Detail

https://www.fmz.com/strategy/426486

> Last Modified

2023-09-12 15:09:57
