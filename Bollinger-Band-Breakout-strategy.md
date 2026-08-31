
> Name

Bollinger-Band-Breakout-strategy

> Author

ChaoZhang

> Strategy Description

Strategy Principles

This strategy trades based on Bollinger Band breakouts. The Bollinger Bands consist of a middle band, upper band and lower band. The middle band is an n-period moving average, while the upper and lower bands are calculated by adding/subtracting x standard deviations from the middle band. A breakout above the upper band indicates an uptrend, while a breakout below the lower band signals a downtrend. The key parameters for constructing the Bollinger Bands are the middle band period n and standard deviation multiplier m. Typical values are 20 periods and 1.5x standard deviations. The settings of n and m directly affect the width of the bands, and therefore the frequency of breakout signals. The period n can be set between 10-20, while the standard deviation multiplier m can be set between 1-2x. More conservative parameter settings generally mean fewer but more reliable breakout signals.

The advantage of this strategy is using Bollinger Bands to determine market trends and volatility, and entering based on breakout signals and exiting on pullbacks. However, issues like band lagging, unreliable breakout signals, and lack of stop loss exist. Overall, this strategy works better in markets with clear trends, but should be used cautiously. Optimization of parameters, adding stops, and signal filters can improve the stability of the strategy.

In summary, while the Bollinger Band breakout strategy has some merits, it also carries significant risks. Only with proper optimization, risk control and money management can this strategy be applied in live trading in a stable manner.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Period|
|v_input_2|1.5|Standard Deviation|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-04 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Bollinger Band Breakout", shorttitle = "BB-BO",default_qty_type = strategy.percent_of_equity,default_qty_value = 100, overlay=true)
source = close
length = input(20, minval=1, title = "Period") //Length of the Bollinger Band 
mult = input(1.5, minval=0.001, maxval=50, title = "Standard Deviation") // Use 1.5 SD for 20 period MA; Use 2 SD for 10 period MA 

basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

if (crossover(source, upper))
    strategy.entry("Long", strategy.long)


if(crossunder(source, basis))
    strategy.close("Long")

plot(basis, color=color.red,title= "SMA")
p1 = plot(upper, color=color.blue,title= "UB")
p2 = plot(lower, color=color.blue,title= "LB")
fill(p1, p2)

```

> Detail

https://www.fmz.com/strategy/426339

> Last Modified

2023-09-11 12:24:43
