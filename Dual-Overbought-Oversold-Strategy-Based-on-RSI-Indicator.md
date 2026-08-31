
> Name

Dual-Overbought-Oversold-Strategy-Based-on-RSI-Indicator

> Author

ChaoZhang

> Strategy Description





This strategy is named “Dual Overbought/Oversold Strategy Based on RSI Indicator”. It uses both the RSI indicator and the Stoch RSI indicator to determine overbought and oversold conditions for more reliable trade signals.

The RSI indicator reflects overbought/oversold levels in prices. RSI above 70 suggests overbought state, while below 30 is oversold. The Stoch RSI indicator shows if the RSI itself has entered overbought or oversold zones. 

The trading logic is:

When RSI crosses above the user-defined overbought line, it signals overbought conditions for considering short trades. 

When RSI falls below the user-defined oversold line, it flags oversold conditions for considering long trades.

Meanwhile, Stoch RSI also needs to show overbought or oversold signals to confirm the corresponding entry signals.

This dual condition combines to filter more ambiguous signals and avoid false breakouts. 

The advantage of this strategy is utilizing RSI’s various derived indicators for more accurate overbought/oversold range judgment. But optimization overfitting risks should be noted. Stop loss is also indispensable.

In summary, indicator combinations need careful balancing. Reasonable usage can improve results but may also bring overoptimization risks. Traders still need flexible judgment.


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
