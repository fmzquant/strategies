
> Name

双RSI配合布林带的趋势追踪策略Dual-RSI-Combined-with-Bollinger-Band-for-Trend-Following

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses dual RSI indicators to identify overbought and oversold conditions, combined with Bollinger Band breakouts to generate trading signals. It belongs to the trend-following strategy category. The goal is to improve signal reliability through combining multiple indicators, and profit from obvious trends.

## Principle Analysis

The strategy employs two RSI with different timeframes to judge short-term and long-term overbought/oversold status. Trading signals are only generated when both RSIs reach the threshold values simultaneously. This avoids false signals from a single RSI.

Bollinger Bands are also used to identify price breakouts. Only when RSI conditions are met and price breaks Boll Band upper/lower band will a trade signal be generated. The breakout confirmation helps avoid signals in non-trending markets.

Finally, fast and slow MAs are checked for trend direction. Trades are only opened when the breakout aligns with RSI signal direction.

## Advantage Analysis 

The combined use of multiple indicators helps filter out false signals, only trading obvious trends. The fast/slow MAs also facilitate trend following. The simple strategy is suitable for profiting from short-term trends.

## Risk Analysis

The main risk is failing to promptly identify trend reversals. Sharp V-shaped reversals may lead to significant losses without timely stop loss. Parameter tuning could also impact performance.

## Optimization Suggestions

1. Add stop loss strategies to exit quickly on reversals.

2. Incorporate other filters like volume to avoid false breakouts.

3. Optimize parameters to find best combination. 

4. Add machine learning models to better identify market regimes.

5. Enhance risk management including position sizing, loss control.

## Conclusion

This strategy combines dual RSI and Bollinger Bands to profit from short-term trends. While simple and straightforward, limitations exist like delayed reversal signals. Adding stop loss, signal filtering, parameter optimization can further enhance its robustness and profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|RSI|
|v_input_2|65|OSold|
|v_input_3|35|OBought|
|v_input_4|6|RSI2|
|v_input_5|65|OSold2|
|v_input_6|35|OBought2|
|v_input_7|20|Bollinger|
|v_input_8|1.7|Desv|
|v_input_9|3|Media corta|
|v_input_10|10|Media larga|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 04:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy(title = "Madrugada strat copy", overlay = true, pyramiding = 0, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, currency = currency.USD)
 
// === GENERAL INPUTS ===
// RSI 1
RSIlength = input(10,title="RSI") 
RSIoverSold = input(65,title="OSold")
RSIoverBought = input(35,title="OBought")
price = close
vrsi = rsi(price, RSIlength)
// RSI 2
RSIlength2 = input(6,title="RSI2") 
RSIoverSold2 = input(65,title="OSold2")
RSIoverBought2 = input(35,title="OBought2")
price2 = close
vrsi2 = rsi(price2, RSIlength2)

//Bollinger Bands
source = close
Bollinger = input(20, minval=1), Desv = input(1.7, minval=0.001, maxval=50)
basis = sma(source, Bollinger)
dev = Desv * stdev(source, Bollinger)
upper = basis + dev
lower = basis - dev
plot(basis, color=red, title="BB ma")
p1 = plot(upper, color=blue, title="BBajo")
p2 = plot(lower, color=blue, title="BAlto")
fill(p1, p2)

//Media movil
short = input(3, minval=1, title="Media corta")
long = input(10, minval=1, title="Media larga")
src = close
plot(sma(src, short), color=#00FF00, transp=0, linewidth=1, title="Media rapida")
plot(sma(src, long), color=white, transp=0, linewidth=2, title="Media lenta")


// === STRATEGY - LONG POSITION EXECUTION ===
enterLong() => vrsi < 30 and  vrsi2 < 27 and cross(lower, price)
exitLong() => short < long
strategy.entry(id = "Long", long = true, when = enterLong()) // use function or simple condition to decide when to get in
// === STRATEGY - SHORT POSITION EXECUTION ===
enterShort() => vrsi > 70 and vrsi2 > 70 and cross(upper, price)
strategy.entry(id = "Short", long = false, when = enterShort())


// Definición señales de compra
buy_signals = vrsi < 30 and  vrsi2 < 27 and cross(lower, price)

// Definición señales de venta
sell_signals = vrsi > 70 and vrsi2 > 70 and cross(upper, price)

// Dibuja las señales de compra venta en franjas de color
b_color = (sell_signals) ? color(red,65) : (buy_signals) ? color(green,65) : na
bgcolor(b_color)

// Dibuja las señales de compra venta coloreando las velas
barcolor(buy_signals ? white : sell_signals ? white : na)

plot(vrsi, color=white, linewidth=1)
plot(vrsi, color=white, linewidth=2)

// Crea alarmas usables desde el desplegable para poder enviar mails a haas
alertcondition(buy_signals, title='Buy-Signal', message='compra')
alertcondition(sell_signals, title='Sell-Signal', message='vende')

```

> Detail

https://www.fmz.com/strategy/427313

> Last Modified

2023-09-19 22:10:02
