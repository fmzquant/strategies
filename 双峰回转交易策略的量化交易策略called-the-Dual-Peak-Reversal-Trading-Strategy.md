
> Name

双峰回转交易策略的量化交易策略called-the-Dual-Peak-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
该策略通过计算特定周期的最高价和最低价的简单移动平均线,并以此为基础发出买入和卖出信号。

双峰回转交易策略运用了技术分析中的支持与阻力理论。该策略假设,价格在突破阻力或支持时,市场力量和价格动量会发生变化。具体来说,价格超过最近一段时期的最高点时,被视为突破上方阻力;而价格跌破最近一段时间的最低点时,则被视为下方支持被击穿。这两个界限的中间点被视为价值的中枢部分。

双峰回转交易策略首先计算指定周期(默认29天)的最高价和最低价的简单移动平均。这生成两条轨道,代表着价格的上下限。然后,它计算这两条轨道之间的中间点,以确定买入和卖出的阈值。

当价格上涨突破上轨时,生成买入信号;当价格下跌突破下轨时,生成卖出信号。交易者随后会以反向方式关闭头寸,也就是在价格重新跌破上轨时卖出,价格重新涨破下轨时买入。

该策略的优势在于,它利用了突破引发的短期动量。当价格突破上下限时,短期内往往存在较大的价格波动。这为交易者提供了在突破发生后进行交易的机会。

然而,该策略也存在一些风险。首先,选定的周期长度会对结果产生很大影响。如果周期太短,轨道会过于灵敏,产生大量虚假信号。如果周期过长,则无法及时捕捉新的趋势。此外,价格突破上下限后不一定会延续趋势,存在回调的可能。交易者需要调整止损点,控制风险。

总体来说,双峰回转交易策略通过监测价格突破动力阈值的方式寻求交易机会。它把握了突破短期动量的优势,但也需要注意参数优化和风险控制。如果运用得当,该策略可以成为量化交易的有利工具。

||

This strategy generates buy and sell signals based on simple moving averages of the highest high and lowest low prices over a specified period.

The Dual Peak Reversal Trading Strategy utilizes the support and resistance theory in technical analysis. It assumes that when prices break through resistance or support levels, market forces and momentum will shift. Specifically, when prices rise above the highest point over a recent period, it is seen as breaking through overhead resistance. And when prices fall below the lowest point over a recent period, it is seen as support levels being broken. The midpoint of these two boundaries is seen as the pivotal point of value.

The Dual Peak Reversal Trading Strategy first calculates the simple moving averages of the highest high and lowest low prices over a specified period (default 29 days). This generates two bands representing the upper and lower limits of the price. It then calculates the midpoint of these two bands to determine the buy and sell thresholds. 

When prices rise above the upper band, a buy signal is generated. When prices fall below the lower band, a sell signal is generated. The trader then reverses the position, selling when prices fall back below the upper band, and buying when prices rise back above the lower band.

The advantage of this strategy is that it capitalizes on the momentum triggered by breakouts. When prices break out of the upper or lower limits, there is often significant price movement in the short term. This provides opportunities for traders to trade after the breakout occurs.

However, there are also some risks with this strategy. First, the selected lookback period has a big impact on the results. If the period is too short, the bands will be too sensitive and generate many false signals. If the period is too long, it will fail to capture new trends in a timely manner. Also, prices breaking the upper or lower limit do not always continue the trend, and some reversion is possible. Traders need to adjust stop losses to control risk.

In summary, the Dual Peak Reversal Trading Strategy seeks trading opportunities by monitoring price breakouts past momentum thresholds. It capitalizes on the advantage of breakout momentum in the short term, but also needs to pay attention to parameter optimization and risk control. When used properly, this strategy can be a beneficial tool for quantitative trading.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|29|Len|
|v_input_2|true|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v2.0 19/09/2022
// This is simple Highest high and Lowest low strategy.
// Buy when break HH+offset
// Sell when break LL+offset
// Offset = (HH-LL)/2
////////////////////////////////////////////////////////////
strategy(title='HHLL', overlay=true)
Len = input(29)
reverse = input(true, title='Trade reverse')
xHH = ta.sma(high, Len)
xLL = ta.sma(low, Len)

movevalue = (xHH - xLL) / 2
xHHM = xHH + movevalue
xLLM = xLL - movevalue

pos = 0
possig = 0
iff_1 = high > xHHM[1] and time > timestamp(2018, 01, 01, 09, 30) ? -1 : nz(pos[1], 0)
pos := low < xLLM[1] and time > timestamp(2018, 01, 01, 09, 30) ? 1 : iff_1

iff_2 = reverse and pos == -1 ? 1 : pos
possig := reverse and pos == 1 ? -1 : iff_2

if possig == 1 and possig[1] != possig and time > timestamp(2018, 01, 01, 09, 30)
    strategy.entry('Long', strategy.long)
if possig == -1 and possig[1] != possig and time > timestamp(2018, 01, 01, 09, 30)
    strategy.entry('Short', strategy.short)

barcolor(possig == -1 ? color.red : possig == 1 ? color.green : color.blue)

plot(xHHM, color=color.new(color.blue, 0), title='MA')
plot(xLLM, color=color.new(color.blue, 0), title='MA')
plot(xHH, color=color.new(color.red, 0), title='MA')
plot(xLL, color=color.new(color.red, 0), title='MA')
```

> Detail

https://www.fmz.com/strategy/426894

> Last Modified

2023-09-15 12:33:57
