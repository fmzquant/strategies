
> Name

called-the-Dual-Peak-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



This strategy generates buy and sell signals based on simple moving averages of the highest high and lowest low prices over a specified period.

The Dual Peak Reversal Trading Strategy utilizes the support and resistance theory in technical analysis. It assumes that when prices break through resistance or support levels, market forces and momentum will shift. Specifically, when prices rise above the highest point over a recent period, it is seen as breaking through overhead resistance. And when prices fall below the lowest point over a recent period, it is seen as support levels being broken. The midpoint of these two boundaries is seen as the pivotal point of value.

The Dual Peak Reversal Trading Strategy first calculates the simple moving averages of the highest high and lowest low prices over a specified period (default 29 days). This generates two bands representing the upper and lower limits of the price. It then calculates the midpoint of these two bands to determine the buy and sell thresholds. 

When prices rise above the upper band, a buy signal is generated. When prices fall below the lower band, a sell signal is generated. The trader then reverses the position, selling when prices fall back below the upper band, and buying when prices rise back above the lower band.

The advantage of this strategy is that it capitalizes on the momentum triggered by breakouts. When prices break out of the upper or lower limits, there is often significant price movement in the short term. This provides opportunities for traders to trade after the breakout occurs.

However, there are also some risks with this strategy. First, the selected lookback period has a big impact on the results. If the period is too short, the bands will be too sensitive and generate many false signals. If the period is too long, it will fail to capture new trends in a timely manner. Also, prices breaking the upper or lower limit do not always continue the trend, and some reversion is possible. Traders need to adjust stop losses to control risk.

In summary, the Dual Peak Reversal Trading Strategy seeks trading opportunities by monitoring price breakouts past momentum thresholds. It capitalizes on the advantage of breakout momentum in the short term, but also needs to pay attention to parameter optimization and risk control. When used properly, this strategy can be a beneficial tool for quantitative trading.

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
