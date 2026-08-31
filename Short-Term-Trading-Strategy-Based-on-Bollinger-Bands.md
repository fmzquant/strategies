
> Name

Short-Term-Trading-Strategy-Based-on-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c37c8c6a6f7f29ce1f.png)

## Overview

This strategy uses Bollinger Bands indicator to determine trading signals and set stop profit/loss levels. It goes long when price touches the middle band from below and goes short when price touches the middle band from above. It sets 0.5% take profit and 3% stop loss, belonging to short-term trading strategy.

## Strategy Logic  

The middle band of Bollinger Bands is the N-day simple moving average of closing price. The upper band is middle band + K times N-day standard deviation of closing price. The lower band is middle band - K times N-day standard deviation of closing price. It goes long when price breaks above the middle band from below, and goes short when price breaks below the middle band from above. It opens fixed size for each trade and sets 0.5% take profit and 3% stop loss.

## Advantage Analysis

1. Using Bollinger Bands to determine trading signals can effectively capture price breakouts.  
2. Adopting short-term trading, the trading cycle is very short which allows quickly switching directions.
3. Fixed size position and stop profit/loss setting manage risks well per trade.

## Risk Analysis  

1. Bollinger Bands is sensitive to market volatility. Improper parameter settings may lead to more signals but lower win rate. 
2. High frequency trading can significantly reduce profit margin if commissions are comparatively high.  
3. Improper stop profit/loss setting may lead to premature stop loss or miss bigger profits.  

Solutions:

1. Optimize parameters to find best combination.  
2. Select securities with lower commissions.
3. Optimize stop profit/loss levels through backtesting.  

## Optimization  

1. Combine with other indicators like K line patterns and MACD to filter signals and improve win rate. 
2. Add more types of take profit like trailing stop or partial closing to expand profit potential.
3. Optimize parameters of Bollinger Bands and stop profit/loss levels to find best combination.  

## Conclusion  

The overall logic of this strategy is clear. Using Bollinger Bands to determine signals is effective. However, high trading frequency and limited profit space per trade. It's recommended to combine trend indicators to filter signals and optimize parameters to improve strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Longitud|
|v_input_2|2|Multiplicador|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estrategia Bollinger Bands", shorttitle="BB Strategy", overlay=true)

// Parámetros de las Bandas de Bollinger
length = input(20, title="Longitud")
mult = input(2.0, title="Multiplicador")

// Calcula las Bandas de Bollinger
basis = ta.sma(close, length)
upper_band = basis + mult * ta.stdev(close, length)
lower_band = basis - mult * ta.stdev(close, length)

// Condiciones para realizar operaciones
price_touches_basis_up = ta.crossover(close, basis)
price_touches_basis_down = ta.crossunder(close, basis)

// Lógica de la estrategia
if (price_touches_basis_up)
    strategy.entry("Compra", strategy.long, qty = 1)
    
if (price_touches_basis_down)
    strategy.entry("Venta", strategy.short, qty = 1)

// Lógica para cerrar la operación con un movimiento del 0,5% (take profit) o 3% (stop loss)
target_profit = 0.005 // Actualizado a 0.5%
stop_loss = 0.03

if (strategy.position_size > 0)
    strategy.exit("Take Profit/Close", from_entry = "Compra", profit = close * (1 + target_profit))
    strategy.exit("Stop Loss/Close", from_entry = "Compra", loss = close * (1 - stop_loss))

if (strategy.position_size < 0)
    strategy.exit("Take Profit/Close", from_entry = "Venta", profit = close * (1 - target_profit))
    strategy.exit("Stop Loss/Close", from_entry = "Venta", loss = close * (1 + stop_loss))

// Dibuja las Bandas de Bollinger en el gráfico
plot(upper_band, color=color.blue, title="Upper Band")
plot(lower_band, color=color.red, title="Lower Band")
plot(basis, color=color.green, title="Basis")

```

> Detail

https://www.fmz.com/strategy/443252

> Last Modified

2024-03-01 13:29:47
