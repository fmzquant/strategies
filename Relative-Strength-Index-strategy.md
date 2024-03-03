
> Name

Relative-Strength-Index-strategy

> Author

ChaoZhang

> Strategy Description


This script is written in Pine Script for TradingView platform and implements a simple RSI (Relative Strength Index) strategy for trading the Litecoin (LTC) to USDT pair on Binance exchange using a 5-minute chart.

Here's a brief explanation of this strategy:

Parameters:
- RSI Length: 3, which means it calculates the RSI based on the last 3 periods.
- RSI OverSold level: 47, which means it considers the market oversold (a potential buying opportunity) when the RSI falls below 47.
- RSI OverBought Level: 56, which means it considers the market overbought (a potential selling opportunity) when the RSI rises above 56.

Operations:
- If the RSI crosses over the oversold level, the strategy enters a long position (buys).
- If the RSI crosses under the overbought level, the strategy enters a short position (sells).

This particular backtest has resulted in a profit of 391%, executed over 2400 trades, with a 42% profitability rate, a 14.6% drawdown, and a Sharpe ratio of 0.65.

However, it's important to remember that past performance doesn't guarantee future results. Also, the author suggests that additional filters can be added to this strategy to improve its performance.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|length|
|v_input_2|47|overSold|
|v_input_3|56|overBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-01 00:00:00
end: 2023-08-14 05:20:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("QuantNomad - RSI Strategy - LTCUSDT - 5m", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

length     = input(3)
overSold   = input(47)
overBought = input(56)

price = close

// 
// author: QuantNomad
// date: 2019-06-06
// RSI Strategy - LTCUSDT - 5m
// https://www.tradingview.com/u/QuantNomad/
// https://t.me/quantnomad
//

vrsi = rsi(price, length)

if (not na(vrsi))
    if (crossover(vrsi, overSold))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
    if (crossunder(vrsi, overBought))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/426141

> Last Modified

2023-09-08 16:10:13
