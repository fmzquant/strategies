
> Name

MA99接触与动态止损策略-MA99-Touch-and-Dynamic-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/673f558bdac0e91900.png)


#### Overview
This strategy is based on the 99-period Simple Moving Average (MA99) to determine trading signals. When the price touches the MA99, a position can be opened without requiring confirmation from two candles. The stop-loss uses a dynamic approach, meaning that when the price breaks through the MA99 and is confirmed in the next candle, the position is closed for stop-loss. This strategy aims to capture price fluctuations around the MA99 while controlling risk through dynamic stop-loss.

#### Strategy Principles
1. Calculate the 99-period Simple Moving Average MA99.
2. Determine if the current price touches the MA99, i.e., the lowest price is less than or equal to MA99, and the highest price is greater than or equal to MA99.
3. If the price touches MA99 and the closing price is above MA99, go long; if the price touches MA99 and the closing price is below MA99, go short.
4. For long positions, if the closing price falls below MA99 and is confirmed again in the next candle, close the position; for short positions, if the closing price breaks above MA99 and is confirmed again in the next candle, close the position.
5. Each time a position is opened, set the current MA99 as the stop-loss price; reset the stop-loss price after each position is closed.

#### Strategy Advantages
1. Simple and easy to use: This strategy is based on a single indicator, MA99, with clear and straightforward rules that are easy to understand and implement.
2. Dynamic stop-loss: Compared to fixed stop-loss, dynamic stop-loss can better adapt to market changes and control risk in a timely manner.
3. Trend following: MA99 represents the medium to long-term trend. Opening positions when the price touches MA99 allows for trading in the direction of the main trend.
4. Noise reduction: Compared to using shorter-period moving averages, the 99-period moving average can effectively filter out short-term fluctuation noise.

#### Strategy Risks
1. Parameter optimization: This strategy only uses the parameter of 99, which may not be the optimal parameter. It requires backtesting and optimization to determine the best parameters.
2. Choppy markets: In choppy markets, prices may frequently fluctuate around MA99, potentially leading to frequent trades and losses.
3. Trend reversal: When the trend reverses and the price breaks through MA99, this strategy may continue to hold positions in the wrong direction, resulting in losses.
4. Slippage costs: Frequent trading may incur higher slippage and transaction costs, affecting strategy profitability.

#### Strategy Optimization Directions
1. Introduce trend filters: When determining entry signals, other trend indicators such as MACD, ADX, etc., can be incorporated to confirm trend strength and direction, improving entry quality.
2. Optimize parameters: Optimize parameters such as the MA period and stop-loss conditions to find the best parameter combination and improve strategy robustness.
3. Incorporate position sizing: Dynamically adjust position size based on factors such as market trend strength and volatility to control drawdown risk.
4. Consider trading costs: When backtesting and live trading, consider cost factors such as trading slippage and commissions to evaluate the strategy's actual performance.

#### Summary
The MA99 Touch and Dynamic Stop-Loss Strategy opens positions based on the relationship between price and MA99 and uses dynamic stop-loss to control risk. This strategy is simple and easy to use, capable of following medium to long-term trends, but may face the problem of frequent trading in choppy markets. By introducing other indicators for filtering, optimizing parameters, managing positions, and considering costs, the performance and robustness of this strategy can be further improved.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-04-23 00:00:00
end: 2024-04-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/


//@version=5
strategy("MA99 Temas ve Dinamik Stop-Loss Stratejisi", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// MA99 hesaplayalım
ma99 = ta.sma(close, 99)
plot(ma99, color=color.blue, title="MA99")

// Fiyatın MA99'a temas edip etmediğini kontrol edelim
priceTouchedMA99 = (low <= ma99 and high >= ma99)

// Long ve short koşullarını tanımlayalım
longCondition = priceTouchedMA99 and close > ma99
shortCondition = priceTouchedMA99 and close < ma99

var float longStopLoss = na
var float shortStopLoss = na

var int longStopTriggered = 0
var int shortStopTriggered = 0

// Alım veya satım sinyallerine göre işlemleri başlatalım ve stop-loss ayarlayalım
if (longCondition)
    strategy.entry("Long Entry", strategy.long)
    longStopLoss := ma99
    longStopTriggered := 0

if (shortCondition)
    strategy.entry("Short Entry", strategy.short)
    shortStopLoss := ma99
    shortStopTriggered := 0

// Stop-loss koşullarını ve iki mum kuralını kontrol edelim
if (not na(longStopLoss))
    if (close < longStopLoss)
        longStopTriggered := 1
    else
        longStopTriggered := 0

    if (longStopTriggered[1] == 1 and close < longStopLoss)  // Bir önceki mumda tetiklendi ve hala altında
        strategy.close("Long Entry", comment="Stop Loss Long")
        longStopLoss := na
        longStopTriggered := 0

if (not na(shortStopLoss))
    if (close > shortStopLoss)
        shortStopTriggered := 1
    else
        shortStopTriggered := 0

    if (shortStopTriggered[1] == 1 and close > shortStopLoss)  // Bir önceki mumda tetiklendi ve hala üstünde
        strategy.close("Short Entry", comment="Stop Loss Short")
        shortStopLoss := na
        shortStopTriggered := 0
```

> Detail

https://www.fmz.com/strategy/449843

> Last Modified

2024-04-29 16:59:41
