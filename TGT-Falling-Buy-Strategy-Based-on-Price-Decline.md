
> Name

TGT-Falling-Buy-Strategy-Based-on-Price-Decline

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1436fb3f86ec5b8f2ac.png)

#### Overview
The main idea of this strategy is to perform a buy operation by monitoring the decline in price. When the price falls by more than 5% compared to the previous period, a buy signal is triggered, and a certain amount of position is bought at the current closing price. When the price is higher than the buying price, the position is closed to take profits. This strategy takes advantage of market volatility and tries to capture short-term price rebound opportunities to make profits.

#### Strategy Principle
1. Calculate the percentage decline of the current closing price compared to the previous period's closing price.
2. If the decline exceeds 5%, a buy signal is triggered, and a certain amount of position is bought at the current closing price. The quantity purchased is calculated based on the current account balance and the buying price.
3. Record the buying price and the quantity purchased.
4. When the current price is higher than the buying price, close the position to take profits.
5. Calculate the profit and loss situation and update the account balance.
6. Mark the candlestick with a yellow color on the chart when the buy signal occurs.

#### Advantage Analysis
1. Simple and easy to understand: The strategy logic is clear and easy to understand and implement.
2. Trend capture: By buying varieties with a larger decline, it can capture the short-term rebound trend of the price.
3. Risk control: The purchase quantity is calculated based on the account balance and the current price, controlling the risk exposure of each trade.
4. Timely closing: When the price is higher than the buying price, the position is decisively closed, not holding on, controlling the risk.
5. Visual representation: The buy signal is marked with a special color on the chart, which is convenient for observation and analysis.

#### Risk Analysis
1. Frequent trading: This strategy mainly targets short-term fluctuations, and the trading frequency may be relatively high. Attention needs to be paid to the impact of transaction costs on returns.
2. Deep drawdown: If the price experiences a further significant decline after buying, it may face a certain drawdown risk.
3. Price volatility: The strategy mainly relies on price volatility, and in a market environment with low volatility, the effect of the strategy may be discounted.
4. Profit and loss balance: The strategy does not have clear requirements and controls on the win rate and loss rate, and attention needs to be paid to the overall profit and loss balancing ability of the strategy in actual operation.

#### Optimization Direction
1. Stop-loss optimization: Currently, the strategy does not set a stop-loss condition after buying. Consideration can be given to adding some stop-loss logic, such as fixed percentage stop-loss or ATR stop-loss, to further control the maximum loss of a single transaction.
2. Signal filtering: After generating a buy signal, some additional conditions can be added to filter the quality of the signal, such as combining moving average systems, RSI and other indicators, or considering price turning points, candlestick patterns, etc., to improve the win rate and reliability of the signal.
3. Position management: Currently, the strategy uses a fixed capital ratio to determine the purchase quantity. Consideration can be given to optimizing it into a more dynamic position management model, such as adjusting the purchase quantity according to factors such as price volatility and account equity curve.
4. Multi-variety collaboration: The idea of this strategy can be applied to multiple varieties. Through the correlation analysis between varieties and fund allocation management, better results may be achieved.

#### Summary
This strategy uses the short-term price decline exceeding a specific amplitude as a buy signal, capturing the rebound opportunity of the price to make profits. The logic is simple and easy to understand. The advantages of the strategy lie in trend capture and risk control, but risks such as frequent trading, deep drawdown, and price volatility also need to be noted. In the future, the strategy can be further optimized and improved from aspects such as stop-loss optimization, signal filtering, position management, and multi-variety collaboration, in order to obtain more robust results.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-01 00:00:00
end: 2024-06-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Thgoodtrader

//@version=5
strategy("TGT Falling Buy", overlay=true, margin_long=100, margin_short=100)
var float buy_price = na
var float open_price = na
var float open_weekend = na 
var float close_weekend = na 
var bool trade=false
var float balance = 1000
// Definir el precio de compra inicial y la cantidad inicial
var float qty = na
// Verificar si el día de la semana es sábado (6) o domingo (0)
es_sabado = dayofweek == 1
es_domingo = dayofweek == 7
es_viernes = dayofweek == 6

// Calcular el valor del saldo inicial
balance_initial = balance

change_percent = ((close - close[1]) / close[1]) * 100
is_last_candle_negative = close < open
is_change_above_threshold = change_percent < -5
// Cambiar el color de la última vela si cumple las condiciones
barcolor(is_last_candle_negative and is_change_above_threshold ? color.yellow : na)
bgcolor(is_last_candle_negative and is_change_above_threshold ? color.yellow : na, transp=80)
// Guardar el precio de compra cuando se cumpla la condición del 5%
if is_change_above_threshold 
    // Calcular la cantidad basada en el precio de compra y el saldo
    qty := balance / close
    // Guardar el precio de compra
    buy_price := close
    open_price := open
    strategy.entry("Buy Trading",strategy.long,qty)
    alert("Comprar BTC", alert.freq_once_per_bar_close)
    trade :=true
//if (((close - strategy.position_avg_price) / strategy.position_avg_price) * 100 ) > 2
if close > strategy.position_avg_price
    // Calcular el valor de ganancia o pérdida
    pnl = (close - strategy.position_avg_price) * qty
    // Actualizar el saldo
    balance := balance_initial + pnl
    strategy.close("Buy Trading")
alertcondition(is_change_above_threshold, title = "Buy 5% Discount", message = "Buy Position")
alertcondition(close > strategy.position_avg_price, title = "Close Trade", message = "Close Buy Position")   
```

> Detail

https://www.fmz.com/strategy/453656

> Last Modified

2024-06-07 15:33:26
