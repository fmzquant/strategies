
> Name

基于RSI指标的趋势回调交易策略Trend-Retracement-Trading-Strategy-Based-on-RSI-Indicator

> Author

ChaoZhang

> Strategy Description






This strategy is named "Trend Retracement Trading Strategy Based on RSI Indicator". It uses the RSI indicator to gauge overbought/oversold levels, and combines optimized parameter settings to trade pullbacks and catch local reversals within strong trends.

The RSI indicator judges if prices are overbought or oversold. RSI above 70 suggests overbought state, while below 30 is oversold. This strategy generates sell signals when RSI reaches 96, and buy signals when RSI breaks below 4. These optimized parameters are better suited for capturing temporary reversals within strong trends compared to traditional RSI levels.

After entry, the strategy utilizes profit taking and stop loss mechanisms. Long positions are closed when RSI rebounds to 80 after reversal, and short positions closed when RSI drops to 20, effectively locking in retracement profits. Trailing stop loss also ensures capital preservation after entry.

The advantage of this strategy is utilizing RSI's sensitivity in judgementesulting trend pullbacks and reversals, and improving performance through parameter optimization and profit taking/stop loss. However, no single indicator is perfect, and trend, support and resistance analysis should be combined.

In conclusion, the RSI is a simple and practical tool for gauging overbought/oversold conditions. Through parameter optimization and strict risk management, its effectiveness can be enhanced for trend retracement trading. But traders still need flexibility in strategy adjustment, as different markets require different parameter settings.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|RSI Period|
|v_input_2|96|Sell Level|
|v_input_3|4|Buy Level|
|v_input_4|20|Take Profit Level Sell|
|v_input_5|80|Take Profit Level Buy|
|v_input_6|100|Trailing Stop Offset (pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © corderomoraj


//@version=5
strategy("Good Mode RSI v2", overlay=true)

// Parámetros de la estrategia
rsiPeriod = input(2, "RSI Period")
sellLevel = input(96, "Sell Level")
buyLevel = input(4, "Buy Level")
takeProfitLevelSell = input(20, "Take Profit Level Sell")
takeProfitLevelBuy = input(80, "Take Profit Level Buy")
var float trailingStopPrice = na
var float trailingStopOffset = input(100, "Trailing Stop Offset (pips)")

// Capital inicial
initialCapital = 250
positionSize = initialCapital * 0.015

// Condiciones de entrada y salida
rsi = ta.rsi(close, rsiPeriod)

// Condiciones de entrada y salida para la orden de venta
sellCondition = rsi > sellLevel
closeSellCondition = rsi < takeProfitLevelSell

// Condiciones de entrada y salida para la orden de compra
buyCondition = rsi < buyLevel
closeBuyCondition = rsi > takeProfitLevelBuy

// Trailing Stop para las posiciones de venta
if strategy.position_size < 0
    if low < trailingStopPrice
        trailingStopPrice := low
    strategy.exit("Sell", "Sell", trail_offset = trailingStopOffset * syminfo.mintick, trail_price = trailingStopPrice)

// Trailing Stop para las posiciones de compra
if strategy.position_size > 0
    if high > trailingStopPrice
        trailingStopPrice := high
    strategy.exit("Buy", "Buy", trail_offset = trailingStopOffset * syminfo.mintick, trail_price = trailingStopPrice)

// Ejecutar orden de venta
if (sellCondition)
    strategy.entry("Sell", strategy.short, qty = positionSize)
    trailingStopPrice := high

// Cerrar orden de venta
if (closeSellCondition)
    strategy.close("Sell")

// Ejecutar orden de compra
if (buyCondition)
    strategy.entry("Buy", strategy.long, qty = positionSize)
    trailingStopPrice := low

// Cerrar orden de compra
if (closeBuyCondition)
    strategy.close("Buy")

```

> Detail

https://www.fmz.com/strategy/426593

> Last Modified

2023-09-13 15:33:26
