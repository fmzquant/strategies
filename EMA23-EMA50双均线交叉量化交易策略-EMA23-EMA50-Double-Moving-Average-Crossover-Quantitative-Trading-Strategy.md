
> Name

EMA23-EMA50双均线交叉量化交易策略-EMA23-EMA50-Double-Moving-Average-Crossover-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bf4787ce01d2476950.png)

#### Overview
This strategy is based on the crossover signals of EMA23 and EMA50 for trading. When EMA23 crosses above EMA50, it generates a buy signal, and when it crosses below, it generates a sell signal. The strategy also implements a stop-loss for long positions when the price falls below EMA50 and for short positions when the price rises above EMA50. Additionally, the strategy re-enters the market when the price moves back above EMA50. The strategy is suitable for the 30-minute timeframe.

#### Strategy Principles
1. Calculate the two exponential moving averages: EMA23 and EMA50.
2. Generate a buy signal when EMA23 crosses above EMA50, and a sell signal when EMA23 crosses below EMA50.
3. For long positions, implement a stop-loss if the price falls below EMA50 and the closing price is lower than the EMA50 of the previous candle.
4. For short positions, implement a stop-loss if the price rises above EMA50 and the closing price is higher than the EMA50 of the previous candle.
5. For long positions, re-enter the market if the price moves back above EMA50, with the closing price and high price both higher than EMA50, and EMA23 higher than EMA50.
6. For short positions, re-enter the market if the price moves back below EMA50, with the closing price and low price both lower than EMA50, and EMA23 lower than EMA50.
7. Set the take-profit level for long positions at 1.6 times the entry price, and for short positions at 0.75 times the entry price.

#### Strategy Advantages
1. The double moving average crossover is a simple and effective trend-following indicator that helps capture trends.
2. The stop-loss mechanism helps control risk and prevent losses from expanding.
3. The re-entry mechanism allows the strategy to capture trends again, increasing profit potential.
4. The take-profit levels help lock in profits in a timely manner.
5. The 30-minute timeframe provides more trading opportunities while also filtering out some noise.

#### Strategy Risks
1. EMA, as a trend-following indicator, has a lag and may miss the optimal entry points.
2. The placement of stop-loss levels may not be optimized, leading to premature stop-outs.
3. Frequent trading may increase transaction costs and affect profitability.
4. The strategy may generate more false signals in a ranging market.
5. Fixed take-profit levels may limit the strategy's profit potential.

#### Strategy Optimization Directions
1. Consider introducing other technical indicators to assist in trend determination and improve entry and exit points, such as MACD, RSI, etc.
2. Optimize the placement of stop-loss levels, considering the use of volatility indicators like ATR to dynamically adjust stop-loss positions.
3. Control the trading frequency by setting appropriate trade filtering conditions to reduce false signals.
4. Use different strategy parameter settings for ranging and trending markets.
5. Make take-profit levels more flexible, such as adjusting them dynamically based on market volatility, risk-reward ratio, etc.

#### Summary
This strategy is a quantitative trading strategy based on the crossover of two moving averages, EMA23 and EMA50. It captures trends through the crossover signals and implements stop-loss and re-entry mechanisms to control risk and increase profit potential. The strategy is simple and easy to understand, suitable for medium to short-term trading on the 30-minute timeframe. However, the strategy also has some limitations, such as lagging trend identification, suboptimal stop-loss placement, and poor performance in ranging markets. In the future, the strategy can be optimized by introducing more technical indicators, optimizing stop-loss positions, controlling trading frequency, differentiating between trending and ranging markets, and implementing dynamic take-profit levels to achieve more robust returns.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-20 00:00:00
end: 2024-04-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA Crossover Strategy", overlay=true)

// EMA 23 ve EMA 50'nin hesaplanması
ema23 = ta.ema(close, 23)
ema50 = ta.ema(close, 50)

// Ana alım kuralı: EMA 23 ve EMA 50'nin yukarı kesilmesi
buySignal = ta.crossover(ema23, ema50)

// Ana satış kuralı: EMA 23 ve EMA 50'nin aşağı kesilmesi
sellSignal = ta.crossunder(ema23, ema50)

// Long pozisyon stop seviyesi
longStopLoss = low < ema50 and close < ema50[1]

// Short pozisyon stop seviyesi
shortStopLoss = high > ema50 and close > ema50[1]

// Long pozisyon için tekrar giriş kuralı
longReEntry = high > ema50 and close > ema50 and close > ema50 and ema23 > ema50

// Short pozisyon için tekrar giriş kuralı
shortReEntry = low < ema50 and close < ema50 and close < ema50 and ema23 < ema50

// Long işlemde kar alma seviyesi (%60)
longTakeProfit = strategy.position_avg_price * 1.60

// Short işlemde kar alma seviyesi (%25)
shortTakeProfit = strategy.position_avg_price * 0.75

// Long işlem için yeniden giriş koşulu
longReEntryCondition = strategy.position_size <= 0 and longReEntry

// Short işlem için yeniden giriş koşulu
shortReEntryCondition = strategy.position_size >= 0 and shortReEntry

// Geriye dönük test için başlangıç tarihi (01.01.2022)
startDate = timestamp(2022, 01, 01, 00, 00)

if (time >= startDate)
    if (buySignal)
        strategy.entry("Buy", strategy.long)

    if (sellSignal)
        strategy.entry("Sell", strategy.short)

    if (strategy.position_size > 0 and (longStopLoss or close >= longTakeProfit))
        strategy.close("Buy")

    if (strategy.position_size < 0 and (shortStopLoss or close <= shortTakeProfit))
        strategy.close("Sell")

    if (longReEntryCondition)
        strategy.entry("Buy", strategy.long)

    if (shortReEntryCondition)
        strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/449519

> Last Modified

2024-04-26 15:29:21
