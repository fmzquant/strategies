
> Name

Gann-Double-Channel-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description




This strategy is based on Gann's double channel theory. Gann believed that stock prices fluctuate within a channel, constructed by moving average plus/minus volatility bands. When the price breaks through the channel, it signals a trend reversal. This strategy employs this theory by building a double channel system to identify trend turns and make trades.

Strategy Logic

1. Construct inner and outer Gann channels. The inner channel uses 81-day MA with 1x standard deviation band. The outer channel uses 81-day MA with 2x standard deviation band.

2. When close breaks above the inner channel, go long. This indicates the price may start a new uptrend.

3. When close breaks below the inner channel, go short. This indicates the price may start a new downtrend. 

4. The outer channel acts as a stop loss. If long triggered by inner breakout, close position if price falls back below the outer lower band. If short triggered by inner breakout, close position if price rises back above the outer upper band.

Advantages of this strategy:

1. The double channel system can identify trend reversal more accurately. The widening bands help avoid false breakouts.

2. Breakout trading follows the trend.

3. The double channel stop loss helps control risks.

Risks of this strategy:

1. During market churning, the channel may get broken repeatedly, generating false signals. Fine tune parameters to keep the channel stable.

2. Breakout signals tend to happen near highs and lows. Be mindful of entry levels. 

3. Stop loss points being too close may get triggered by short-term fluctuations. Consider relaxing the stop loss range.

In conclusion, this strategy identifies trend reversals using double Gann channels, adopts a breakout trading approach, and balances profit-taking with risk control. With optimized parameters and strict risk management, it can achieve good results. But no technical strategy works in all market conditions. Investors should apply it with caution and align it with their own risk tolerance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|375|tim|
|v_input_2|81|length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|true|Band1|
|v_input_5|2|Band2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-01-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("[VJ] Gann Double Band Buy Sell", overlay=true)
tim=input('375')
//skip buying near upper band and selling near lower band
out1 = security(syminfo.tickerid, tim, open)
out2 = security(syminfo.tickerid, tim, close)

// gann 81, 1 & 81, 2 as channel
length = input(81, minval=1)
src = input(close, title="Source")

Band1 = input(1.0, minval=0.001, maxval=10, step=0.1)
basis = sma(src, length)
dev = Band1 * stdev(src, length)
upper = basis + dev
lower = basis - dev

Band2 = input(2.0, minval=0.001, maxval=10, step=0.1)
dev2 = Band2 * stdev(src, length)
upper2 = basis + dev2
lower2 = basis - dev2

plot(basis, color=black ,linewidth=3 )
p1a = plot(upper, color=green,linewidth=2)
p1b = plot(lower, color=green,linewidth=2)

p2a = plot(upper2, color=blue, linewidth=3)
p2b = plot(lower2, color=blue, linewidth=3)



longCondition = crossover(security(syminfo.tickerid, tim, close),security(syminfo.tickerid, tim, open)) and close < upper
if (longCondition)
    strategy.entry("long", strategy.long)
shortCondition = crossunder(security(syminfo.tickerid, tim, close),security(syminfo.tickerid, tim, open)) and close > lower
if (shortCondition)
    strategy.entry("short", strategy.short)




```

> Detail

https://www.fmz.com/strategy/426478

> Last Modified

2023-09-12 14:34:16
