
> Name

DCA-Dual-Moving-Average-Turtle-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8c106d842892738e54.png)


#### Overview
The DCA Dual Moving Average Turtle Trading Strategy is a quantitative trading strategy based on the crossover of two moving averages and Dollar Cost Averaging (DCA). The strategy uses two Simple Moving Averages (SMAs) with different periods as buy and sell signals. When the fast SMA crosses above the slow SMA, a buy signal is generated, and when the fast SMA crosses below the slow SMA, a sell signal is generated. The strategy aims to capture medium to long-term market trends while reducing risks associated with market volatility through the use of DCA.

#### Strategy Principles
1. Calculate the fast SMA and slow SMA.
2. When the fast SMA crosses above the slow SMA, a buy signal is generated, and the strategy buys a fixed amount (DCA amount).
3. When the fast SMA crosses below the slow SMA, a sell signal is generated, and the strategy sells all holdings.
4. At each DCA interval (e.g., 14 days), the strategy buys an additional fixed amount to lower the average holding cost.
5. The strategy reduces the average buying cost through DCA while capturing market trends using SMA crossovers.

#### Strategy Advantages
1. Dual moving average crossovers can effectively capture medium to long-term market trends.
2. The DCA method can lower the average buying cost and reduce risks associated with market volatility.
3. The strategy logic is simple, easy to implement, and optimize.
4. Applicable to most markets and assets, with strong versatility.

#### Strategy Risks
1. During market fluctuations or unclear trends, frequent crossovers may lead to excessive trading signals, increasing trading costs.
2. Although the DCA method can lower the average buying cost, it may increase potential losses in a persistently declining market.
3. The strategy relies on historical data and may lose effectiveness when significant market changes occur.

#### Strategy Optimization Directions
1. Optimize the SMA period parameters to find the most suitable parameter combinations for specific markets and assets.
2. Introduce other technical indicators, such as RSI and MACD, to assist in judging market trends and signal reliability.
3. Optimize the DCA amount and interval based on market characteristics and risk preferences.
4. Incorporate stop-loss and take-profit mechanisms to control risks and returns for individual trades.

#### Summary
The DCA Dual Moving Average Turtle Trading Strategy captures market trends through dual moving average crossovers and reduces buying costs and risks using the DCA method. The strategy is simple, widely applicable, but requires attention to parameter optimization and risk control in practical applications. By introducing other technical indicators, optimizing DCA parameters, and incorporating stop-loss and take-profit mechanisms, the strategy's performance and stability can be further enhanced.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Hızlı SMA Dönemi|
|v_input_2|28|Yavaş SMA Dönemi|
|v_input_3|100|DCA Miktarı|
|v_input_4|14|DCA Aralığı (Gün)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-21 00:00:00
end: 2024-04-28 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © loggolitasarim

//@version=5
strategy("DCA YSMA HSMA Stratejisi", overlay=true, calc_on_every_tick=true)

// Parametreler
sma_fast = input(14, "Hızlı SMA Dönemi")
sma_slow = input(28, "Yavaş SMA Dönemi")
dca_amount = input(100, "DCA Miktarı")
dca_interval = input(14, "DCA Aralığı (Gün)")

// Hızlı ve yavaş SMA hesaplamaları
fast_sma = ta.sma(close, sma_fast)
slow_sma = ta.sma(close, sma_slow)

// DCA hesaplamaları
var float dca_average_price = na
var int dca_count = na

if (bar_index % dca_interval == 0)
    dca_count := nz(dca_count, 0) + 1
    dca_average_price := nz(dca_average_price, close) * (dca_count - 1) + close
    dca_average_price /= dca_count

// Alım ve satım sinyalleri
longCondition = ta.crossover(fast_sma, slow_sma)
shortCondition = ta.crossunder(fast_sma, slow_sma)

if (longCondition)
    strategy.entry("Alım", strategy.long, qty=dca_amount)
if (shortCondition)
    strategy.entry("Satım", strategy.short)

// Grafik
plot(fast_sma, "Hızlı SMA", color=color.blue)
plot(slow_sma, "Yavaş SMA", color=color.red)

// Uyarılar
alertcondition(longCondition, "Alım Sinyali", "Alım Sinyali")
alertcondition(shortCondition, "Satım Sinyali", "Satım Sinyali")

```

> Detail

https://www.fmz.com/strategy/449814

> Last Modified

2024-04-29 14:26:59
