
> Name

Stochastic-RSI-Double-Strategy

> Author

ChaoZhang

> Strategy Description

This strategy combines the classic RSI strategy to sell when the RSI increases over 70 (or to buy when it falls below 30), with the classic Stochastic Slow strategy to sell when the Stochastic oscillator exceeds the value of 80 (and to buy when this value is below 20).

This simple strategy only triggers when both the RSI and the Stochastic are together in a overbought or oversold condition. The one hour chart of the S&P 500 worked quite well recently with this double strategy.

By the way this strategy should not be confused with the 'Stochastic RSI', which measures the RSI only.

All trading involves high risk; past performance is not necessarily indicative of future results.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/7d33b6438e380b1a22.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|lookback length of Stochastic|
|v_input_2|80|Stochastic overbought condition|
|v_input_3|20|Stochastic oversold condition|
|v_input_4|3|smoothing of Stochastic %K |
|v_input_5|3|moving average of Stochastic %K|
|v_input_6|14|lookback length of RSI|
|v_input_7|70|RSI overbought condition|
|v_input_8|30|RSI oversold condition|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-24 00:00:00
end: 2022-05-23 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Stochastic + RSI, Double Strategy (by ChartArt)", shorttitle="CA_-_RSI_Stoch_Strat", overlay=true)

// ChartArt's Stochastic Slow + Relative Strength Index, Double Strategy
//
// Version 1.0
// Idea by ChartArt on October 23, 2015.
//
// This strategy combines the classic RSI
// strategy to sell when the RSI increases
// over 70 (or to buy when it falls below 30),
// with the classic Stochastic Slow strategy
// to sell when the Stochastic oscillator
// exceeds the value of 80 (and to buy when
// this value is below 20).
//
// This simple strategy only triggers when
// both the RSI and the Stochastic are together
// in overbought or oversold conditions.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/


///////////// Stochastic Slow
Stochlength = input(14, minval=1, title="lookback length of Stochastic")
StochOverBought = input(80, title="Stochastic overbought condition")
StochOverSold = input(20, title="Stochastic oversold condition")
smoothK = input(3, title="smoothing of Stochastic %K ")
smoothD = input(3, title="moving average of Stochastic %K")
k = sma(stoch(close, high, low, Stochlength), smoothK)
d = sma(k, smoothD)

 
///////////// RSI 
RSIlength = input( 14, minval=1 , title="lookback length of RSI")
RSIOverBought = input( 70  , title="RSI overbought condition")
RSIOverSold = input( 30  , title="RSI oversold condition")
RSIprice = close
vrsi = rsi(RSIprice, RSIlength)


///////////// Double strategy: RSI strategy + Stochastic strategy

if (not na(k) and not na(d))
    if (crossover(k,d) and k < StochOverSold)
        if (not na(vrsi)) and (crossover(vrsi, RSIOverSold))
            strategy.entry("LONG", strategy.long, comment="StochLE + RsiLE")
 
 
if (crossunder(k,d) and k > StochOverBought)
    if (crossunder(vrsi, RSIOverBought))
        strategy.entry("SHORT", strategy.short, comment="StochSE + RsiSE")
 
 
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/365671

> Last Modified

2022-05-25 16:12:14
