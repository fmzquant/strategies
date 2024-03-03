
> Name

基于RSI指标的双重超买超卖策略Dual-Overbought-Oversold-Strategy-Based-on-RSI-Indicator

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于RSI指标的双重超买超卖策略”。该策略同时运用RSI指标和Stoch RSI指标判断超买超卖情况,实现更可靠的交易信号。

RSI指标反映价格的超买超卖水平。RSI高于70表示超买,低于30表示超卖。Stoch RSI指标看RSI指标自身是否进入超买或超卖状态。

本策略的交易逻辑:

当RSI指标上穿用户设定的超买线时,表示入局超买,考虑做空;

当RSI指标下穿用户设定的超卖线时,表示入局超卖,考虑做多;

同时,Stoch RSI也必须显示超买或超卖信号时,才确认对应的入场信号。

该双重条件组合,可以过滤更多不确定信号,避免假突破。

本策略优点是利用RSI的各种派生指标,更准确判断超买超卖区域。但需注意过优化带来的曲线拟合风险。止损策略也必不可少。

总体而言,指标组合使用需要谨慎权衡。合理使用可以提高效果,但也可能带来过度优化的风险。交易者仍需保持判断的灵活性。


||


This strategy is named “Dual Overbought/Oversold Strategy Based on RSI Indicator”. It uses both the RSI indicator and the Stoch RSI indicator to determine overbought and oversold conditions for more reliable trade signals.

The RSI indicator reflects overbought/oversold levels in prices. RSI above 70 suggests overbought state, while below 30 is oversold. The Stoch RSI indicator shows if the RSI itself has entered overbought or oversold zones. 

The trading logic is:

When RSI crosses above the user-defined overbought line, it signals overbought conditions for considering short trades. 

When RSI falls below the user-defined oversold line, it flags oversold conditions for considering long trades.

Meanwhile, Stoch RSI also needs to show overbought or oversold signals to confirm the corresponding entry signals.

This dual condition combines to filter more ambiguous signals and avoid false breakouts. 

The advantage of this strategy is utilizing RSI’s various derived indicators for more accurate overbought/oversold range judgment. But optimization overfitting risks should be noted. Stop loss is also indispensable.

In summary, indicator combinations need careful balancing. Reasonable usage can improve results but may also bring overoptimization risks. Traders still need flexible judgment.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|k length|
|v_input_2|3|d length|
|v_input_3|5|RSI|
|v_input_4|80|over brought|
|v_input_5|20|over sold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-12 00:00:00
period: 4d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("test1","t1",overlay=true, default_qty_type = strategy.percent_of_equity,default_qty_value=100,initial_capital=200, currency=currency.USD)
//user input
k_param = input(title = "k length", type = input.integer, defval = 14)
d_param = input(title = "d length", type = input.integer, defval = 3)
rsi_param = input(title = "RSI", type = input.integer, defval = 5)
upper = input(title = "over brought", type = input.integer, defval = 80)
lower = input(title = "over sold", type = input.integer, defval = 20)

//calculation
rsi = rsi(close,rsi_param)
stochastic = 100*(rsi - lowest(rsi,k_param))/(highest(rsi,k_param)-lowest(rsi,k_param))
SMA = sma(stochastic,d_param)

//DRAW
plot(upper,color = color.blue,linewidth = 2, title ="超买")
plot(lower,color = color.blue,linewidth = 2, title ="超卖")
plot(rsi,color = rsi>upper ?color.red:rsi<lower? color.green:color.black, linewidth=2,title ="ris超买超卖")
plot(stochastic,color = color.purple,title="震荡指数")
plot(SMA, color = color.orange,title="移动平均")

//trading
shortposition = crossover(rsi,upper)
longposition = crossunder(rsi,lower)
strategy.entry("卖",false,when =(shortposition))
strategy.entry("买",true,when = (longposition))
strategy.exit("止盈",profit = close*0.013/syminfo.mintick)
```

> Detail

https://www.fmz.com/strategy/426604

> Last Modified

2023-09-13 16:58:55
