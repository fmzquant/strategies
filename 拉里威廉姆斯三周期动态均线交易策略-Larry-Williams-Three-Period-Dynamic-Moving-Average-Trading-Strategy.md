
> Name

拉里威廉姆斯三周期动态均线交易策略-Larry-Williams-Three-Period-Dynamic-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/116475a349ea13a1aa7.png)


#### Overview
This article introduces a trading strategy based on Larry Williams' three-period dynamic moving average. The strategy utilizes two exponential moving averages (EMAs) to capture price trends and generates trading signals when the closing price of three consecutive candles breaks through the EMAs. The strategy parameters are adjustable and suitable for different markets and timeframes.

#### Strategy Principles
1. Calculate two EMAs: high price EMA and low price EMA of closing prices, with adjustable periods.
2. Determine if the current time is within the set trading interval.
3. Determine if the last three candles consecutively closed above (bullish) or below (bearish) the EMAs.
4. If condition 3 is met and the position is 0, open a long position; if the opposite of condition 3 is met and a long position is held, close the position.
5. Close the position at the end of each trading day if holding a position.

#### Strategy Advantages
1. Flexible parameters: EMA periods, trading time intervals, and other parameters are adjustable to adapt to different markets.
2. Trend tracking: Utilizes EMAs and the direction of consecutive candles to identify trends, which helps capture trending markets.
3. Timely stop-loss: Immediately closes the position when the price breaks through the EMAs against the trend, controlling drawdowns.
4. Intraday position closing: Closes positions at the end of each trading day, avoiding overnight risks.

#### Strategy Risks
1. Choppy market risk: Frequent trading in trendless markets may lead to losses.
2. Parameter risk: Performance varies greatly with different parameters in different markets, requiring targeted optimization.
3. Gap risk: Opening gaps may cause slippage in the strategy's entry price, increasing risk.

#### Strategy Optimization Directions
1. Trend filters: Incorporate indicators like ATR and RSI to help assess trend strength and avoid choppy markets.
2. Dynamic parameter optimization: Dynamically adjust parameters based on recent market characteristics to improve adaptability.
3. Position management: Adjust positions based on trend strength and capital, controlling risks.
4. Incorporate stop-loss and profit-taking: Set reasonable stop-loss levels and profit targets to reduce single-trade risk.

#### Summary
Larry Williams' three-period dynamic moving average trading strategy is a trend-following strategy based on dual EMAs and the direction of consecutive candles. With parameter optimization, it can adapt to different markets. However, the strategy itself is relatively simple, performs poorly in choppy markets, and lacks risk control measures, requiring further optimization and improvement. Considering the strategy's pros and cons, it is more suitable for use in markets with clear trends and should be combined with position management and risk control measures to improve overall performance and stability.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-05 00:00:00
end: 2024-05-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Larry Williams 3 Periodos Editável de MarcosJr", overlay=true, process_orders_on_close=true)

// Parametrização do período do EMA
emaPeriodHighs = input.int(title="Highs Period", defval=3, minval=1, maxval=9999)
emaPeriodLows = input.int(title="Lows Period", defval=3, minval=1, maxval=9999)

// Parametrização da data de início e fim do período a ser coletado
startYear = input.int(title="Start Year", defval=2020)
startMonth = input.int(title="Start Month", defval=1, minval=1, maxval=12)
startDay = input.int(title="Start Day", defval=1, minval=1, maxval=31)

endYear = input.int(title="End Year", defval=2020)
endMonth = input.int(title="End Month", defval=12, minval=1, maxval=12)
endDay = input.int(title="End Day", defval=31, minval=1, maxval=31)

// Convertendo data de início e fim para timestamp
startDate = timestamp(startYear, startMonth, startDay, 00, 00)
endDate = timestamp(endYear, endMonth, endDay, 23, 59)

// EMA
emaH = ta.ema(high, emaPeriodHighs)
emaL = ta.ema(low, emaPeriodLows)

// PLOT:
// Desenha as linhas EMA no gráfico
plot(emaH, color=color.green, linewidth=2)
plot(emaL, color=color.red, linewidth=2)

// Condições
inDateRange = true

// Verifica se houve mais de três candles consecutivos do mesmo sentido
checkThreeConsecutiveCandles = (close[0] > close[1] and close[1] > close[2] and close[2] > close[3]) or (close[0] < close[1] and close[1] < close[2] and close[2] < close[3])

if(close < emaL and inDateRange and checkThreeConsecutiveCandles and barstate.isconfirmed)
    strategy.entry("Long", strategy.long, comment="Long", when=strategy.position_size == 0)
if(close > emaH and inDateRange and checkThreeConsecutiveCandles and barstate.isconfirmed)
    strategy.close("Long", comment="Close Long")

// Fechar a operação no fechamento do pregão
if(strategy.position_size > 0 and na(time_close[0]))
    strategy.close("Long", comment="Close Long")

```

> Detail

https://www.fmz.com/strategy/451075

> Last Modified

2024-05-11 17:35:22
