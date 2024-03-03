
> Name

Composite-Entry-Signal-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
复合买卖点RSI交易策略

该交易策略通过结合RSI、价格变化率ROC和均线MA等多种指标,形成综合的买卖点判断机制。

具体来说,它计算3周期RSI,2周期RSI变化率,以及100周期价格变化率,取这3者的平均值作为综合RSI指标。当该复合RSI指标线突破40时生成买入信号,突破70时生成卖出信号。

这种策略的优势在于综合多个指标的优点,RSI判断超买超卖,RSI变化率显示势头,ROC反映价格变化率。但每个指标都存在滞后,组合使用也无法完全规避错误信号的风险。

总的来说,该复合买卖点RSI策略融合多种指标的优势,可以提高判断的准确性。但实盘应用时,仍需关注参数优化、止损设置等风险控制手段,才能获得长期稳定的效果。

||

This trading strategy combines RSI, rate of change ROC, and moving average MA to form an integrated mechanism for identifying entry signals. 

Specifically, it calculates a 3-period RSI, 2-period RSI change rate, and 100-period price rate of change, taking the average of these 3 as the composite RSI indicator. Buy signals are generated when the composite RSI crosses above 40, and sell signals when it crosses above 70.

The advantage of this strategy is it synergizes the strengths of multiple indicators - RSI for overbought/oversold, RSI rate of change for momentum, and ROC for price rate of change. However, each indicator has lag, and combining them cannot fully avoid the risk of false signals.

In summary, this composite entry signal RSI strategy fuses the strengths of multiple indicators to improve judgment accuracy. But for practical application, attention is still needed on risk controls like parameter optimization and stop loss settings, in order to achieve long-term stability.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
src = close, lenrsi = 3, lenupdown = 2, lenroc = 100, malengt = 2, low = 40, high = 70, a = 1, vlow = 20
updown(s) => 
    isEqual = s == s[1]
    isGrowing = s > s[1]
    ud = 0.0
    ud := isEqual ? 0 : isGrowing ? (nz(ud[1]) <= 0 ? 1 : nz(ud[1])+1) : (nz(ud[1]) >= 0 ? -1 : nz(ud[1])-1)
    ud
rsi = rsi(src, lenrsi)
updownrsi = rsi(updown(src), lenupdown)
percentrank = percentrank(roc(src, 1), lenroc)
crsi = avg(rsi, updownrsi, percentrank)
MA = sma(crsi, malengt)

band1 = 70
band0 = 40
band2 = 20

ColorMA = MA>=band0 ? lime : red

p1 = plot(MA, title="BuyNiggers", style=line, linewidth=4, color=ColorMA)

p2 = plot(low, title="idk", style=line, linewidth=2, color=blue)
p3 = plot(high, title="idk2", style=line, linewidth=2, color=orange)
p4 = plot(vlow, title="idk3", style=line, linewidth=1, color=red)

//@version=2
strategy("CMARSI")


if crossover(MA, band0)
    strategy.entry("buy", strategy.long, when=strategy.position_size <= 0)
    
if crossunder(MA, band1)
    strategy.exit("close", "buy")
    



plot(strategy.equity)

    




```

> Detail

https://www.fmz.com/strategy/426361

> Last Modified

2023-09-11 14:49:59
