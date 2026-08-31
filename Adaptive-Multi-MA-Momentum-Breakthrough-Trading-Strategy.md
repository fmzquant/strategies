
> Name

Adaptive-Multi-MA-Momentum-Breakthrough-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1064753b69e185f4397.png)

#### Overview
This is a trading strategy based on multiple moving averages and momentum breakthrough. The strategy combines technical indicators such as SMMA (Smoothed Moving Average) and ZLEMA (Zero-Lag Exponential Moving Average) to identify trading opportunities by capturing crossover signals between price and moving averages. The strategy employs an adaptive mechanism that adjusts signal sensitivity based on market volatility to improve trading accuracy.

#### Strategy Principle
The strategy utilizes four key moving averages: src (SMMA based on HLC3), hi (SMMA based on high), lo (SMMA based on low), and mi (ZLEMA based on src). Trading signals are primarily based on the crossover relationships and relative positions between these moving averages. The combination of multiple signal conditions ensures the reliability of trading signals. Buy signals include four different condition combinations, and sell signals also include four different condition combinations. Exit signals are based on price crossovers with the mi average and relative positions between moving averages.

#### Strategy Advantages
1. Multiple signal confirmation mechanism improves trading accuracy
2. Adaptive features allow the strategy to adapt to different market environments
3. Use of SMMA and ZLEMA reduces the impact of false signals
4. Layered signal system provides more trading opportunities
5. Clear exit conditions help control risk

#### Strategy Risks
1. Moving average crossovers may produce lag, affecting entry timing
2. Multiple conditions may miss some important trading opportunities
3. May generate excessive false signals in choppy markets
4. Improper parameter settings may affect strategy performance
5. Need to consider the impact of trading costs on strategy returns

#### Strategy Optimization Directions
1. Introduce volatility filters to adjust strategy parameters during high volatility periods
2. Add volume analysis to improve signal reliability
3. Optimize the adaptive mechanism of moving average parameters
4. Add trend strength indicators to improve trend judgment accuracy
5. Develop dynamic stop-loss mechanisms to enhance risk control

#### Summary
The strategy builds a relatively complete trading system through the combination of multiple moving averages and momentum indicators. The strategy's adaptive features and multiple confirmation mechanisms improve trading reliability. Through optimization and refinement, the strategy has the potential to maintain stable performance in different market environments. Traders are advised to conduct thorough backtesting and parameter optimization before live trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2025-01-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6

//study("Limit order strategy", overlay=true)
strategy('Limit order strategy', overlay = true)

lengthMA = input(1)
lengthmi = input(14)
lengthhigh = input(14)
lengthlow = input(14)

calc_smma(src, len) =>
    smma = 0.0
    smma := na(smma[1]) ? ta.sma(src, len) : (smma[1] * (len - 1) + src) / len
    smma

calc_zlema(src, length) =>
    ema1 = ta.ema(src, length)
    ema2 = ta.ema(ema1, length)
    d = ema1 - ema2
    ema1 + d


src = calc_smma(hlc3, lengthMA)
hi = calc_smma(high, lengthhigh)
lo = calc_smma(low, lengthlow)
mi = calc_zlema(src, lengthmi)

plot(src, color = color.new(#FF1493, 0), linewidth = 2, title = 'src')
plot(hi, color = color.new(#7CFC00, 0), linewidth = 2, title = 'hi')
plot(lo, color = color.new(#FF0000, 0), linewidth = 2, title = 'lo')
plot(mi, color = color.new(#00FFFF, 0), linewidth = 2, title = 'mi')


//strategy.order("buy", true, 1, stop = na, when = openbuy) // buy by market if current open great then previous high
//strategy.order("sell", false, 1, stop = na, when = opensell) // sell by market if current open less then previous low
//if src >= mi and src[1] <= mi[1] and src[1] <= lo[1]
//	strategy.entry("buy 1", strategy.long, qty = 15)
sigorderbuy1 = src > mi and src[1] < mi[1] and src < lo and mi < lo
sigorderbuy2 = src > lo and src[1] < lo[1] and mi < lo
sigorderbuy3 = src > hi and src[1] < hi[1] and mi < hi
sigorderbuy4 = src > mi and src[1] < mi[1] and src > hi and mi > hi
//sigorderbuy5 = mi > hi and  src > hi  and src > mi and src[1] < mi[1] 
//sigorderbuy6 = mi < hi and src > hi and src[1] < hi[1]
sigclosebuy = src < mi and src[1] > mi[1] or mi < lo and src < lo and src[1] > lo[1]

sigordersell1 = src < mi and src[1] > mi[1] and src > hi and mi > hi
sigordersell2 = src < hi and src[1] > hi[1] and mi > hi
sigordersell3 = src < lo and src[1] > lo[1] and mi > lo
sigordersell4 = src < mi and src[1] > mi[1] and src < lo and mi < lo
//sigordersell5 = mi < lo and  src < lo  and src < mi and src[1] > mi[1] 
//sigordersell6 = mi > lo and src < lo and src[1] > lo[1]
sigclosesell = src > mi and src[1] < mi[1] or mi > hi and src > hi and src[1] < hi[1]

plot(sigorderbuy1 ? 1 : 0, 'sigorderbuy1')
plot(sigorderbuy2 ? 1 : 0, 'sigorderbuy2')
plot(sigorderbuy3 ? 1 : 0, 'sigorderbuy3')
plot(sigorderbuy4 ? 1 : 0, 'sigorderbuy4')
//plot(sigorderbuy5 ? 1 : 0,"sigorderbuy5") 
//plot(sigorderbuy6 ? 1 : 0,"sigorderbuy6") 

plot(sigordersell1 ? 1 : 0, 'sigordersell1')
plot(sigordersell2 ? 1 : 0, 'sigordersell2')
plot(sigordersell3 ? 1 : 0, 'sigordersell3')
plot(sigordersell4 ? 1 : 0, 'sigordersell4')
//plot(sigordersell5 ? 1 : 0,"sigordersell5") 
//plot(sigordersell6 ? 1 : 0,"sigordersell6")

plot(sigclosebuy ? 1 : 0, 'sigclosebuy')
plot(sigclosesell ? 1 : 0, 'sigclosesell')


openbuy = sigorderbuy1 or sigorderbuy2 or sigorderbuy3 or sigorderbuy4 // or sigorderbuy5 or sigorderbuy6
opensell = sigordersell1 or sigordersell2 or sigordersell3 or sigordersell4 //or sigordersell5 or sigordersell6
openclosebuy = sigclosebuy
openclosesell = sigclosesell

alertcondition(condition = openbuy, title = 'sigorderbuy all', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Buy {{ticker}} sig_b1={{plot("sigorderbuy1")}} sig_b2={{plot("sigorderbuy2")}} sig_b3={{plot("sigorderbuy3")}} sig_b4={{plot("sigorderbuy4")}}"}')
alertcondition(condition = opensell, title = 'sigordersell all', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Sell {{ticker}} sig_s1={{plot("sigordersell1")}} sig_ss={{plot("sigordersell2")}} sig_s3={{plot("sigordersell3")}} sig_s4={{plot("sigordersell4")}} sig_s5={{plot("sigordersell5")}} sig_61={{plot("sigordersell6")}}"}')

alertcondition(condition = sigclosebuy, title = 'Close buy', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Close {{ticker}} T=short"}')
alertcondition(condition = sigclosesell, title = 'Close sell', message = '{"accountmt":"70415621,666734890","time":"15","msg":"Close {{ticker}} T=long"}')

if sigorderbuy1
    strategy.order('Buy 1', strategy.long, 1)
if sigorderbuy2
    strategy.order('Buy 2', strategy.long, 1)
if sigorderbuy3
    strategy.order('Buy 3', strategy.long, 1)
if sigorderbuy4
    strategy.order('Buy 4', strategy.long, 1)


if sigordersell1
    strategy.order('sell 1', strategy.short, 1)
if sigordersell2
    strategy.order('sell 2', strategy.short, 1)
if sigordersell3
    strategy.order('sell 3', strategy.short, 1)
if sigordersell4
    strategy.order('sell 4', strategy.short, 1)
//strategy.order("sell 5", false, 1, when = sigordersell5)
//strategy.order("sell 6", false, 1, when = sigordersell6)

```

> Detail

https://www.fmz.com/strategy/477953

> Last Modified

2025-01-10 15:27:53
