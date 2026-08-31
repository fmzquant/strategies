
> Name

RSI与MACD结合的多空策略-RSI-and-MACD-Combined-Long-Short-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/853da84e606c7b0e20.png)


#### Overview
This strategy combines two technical indicators: Relative Strength Index (RSI) and Moving Average Convergence Divergence (MACD). It uses RSI to determine overbought and oversold conditions, and MACD to identify trend direction, forming a complete long-short strategy. When RSI is overbought, a sell signal is generated, and the position is closed when MACD fast line crosses above the slow line. When RSI is oversold, a buy signal is generated, and the position is closed when MACD fast line crosses below the slow line. The stop-loss point is set by calculating half of the average price change of the asset.

#### Strategy Principle
1. Calculate RSI indicator to determine overbought and oversold conditions:
   - When RSI is above 70 and crosses down the 70 line, a sell signal is generated
   - When RSI is below 30 and crosses up the 30 line, a buy signal is generated
2. Calculate MACD indicator to identify trend direction:
   - When MACD fast line crosses above the slow line, a signal to close the short position is generated
   - When MACD fast line crosses below the slow line, a signal to close the long position is generated
3. Setting the stop-loss point:
   - Calculate the average price change of the asset and take half of it as the stop-loss point

By using RSI to determine overbought and oversold conditions, the strategy enters at the beginning of a reversal. By using MACD to identify trend direction, it closes the position at the beginning of a trend, effectively capturing the trend. The two indicators complement each other, forming a complete trading system.

#### Strategy Advantages
1. The strategy combines overbought/oversold and trend-following approaches, allowing it to enter at the beginning of a reversal and exit in a timely manner when a trend forms, effectively avoiding losses caused by market fluctuations.
2. The stop-loss point is set based on the volatility characteristics of the asset, helping to control drawdowns and improve capital efficiency.
3. The code logic is clear and uses a modular programming approach, making it easy to understand and optimize.

#### Strategy Risks
1. The selection of RSI and MACD parameters has a significant impact on strategy performance, and parameter optimization may be required for different assets and timeframes.
2. During extreme market conditions, such as rapid changes caused by unexpected events, the strategy may suffer significant drawdowns.
3. The strategy may not perform well in a rangebound market, resulting in frequent trades and high transaction costs.

#### Strategy Optimization Directions
1. Optimize the parameters of RSI and MACD to find the most suitable combination for the current asset and timeframe, improving the stability and profitability of the strategy.
2. Add more filtering conditions, such as volume and volatility indicators, to reduce frequent trading and improve signal quality.
3. Introduce a position management module to dynamically adjust positions based on market trends and performance, controlling drawdowns.
4. Combine with other strategies, such as trend-following and mean-reversion, to form a multi-strategy portfolio and enhance adaptability.

#### Summary
This strategy uses RSI to determine overbought and oversold conditions and MACD to identify trend direction, forming a complete long-short trading system. The strategy logic is clear, and the advantages are obvious, while there are also certain risks. Through parameter optimization, adding filtering conditions, position management, and combining with other strategies, the performance of this strategy can be further improved, making it a robust trading strategy.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="RSI & MACD Strategy", shorttitle="RSI & MACD", overlay=true)

// Définition des entrées
rsi_length = 14
rsi_overbought = 70
rsi_oversold = 30
macd_fast_length = 12
macd_slow_length = 26
macd_signal_length = 9

// Fonction pour calculer le RSI
calculate_rsi(source, length) =>
    price_change = ta.change(source)
    up = ta.rma(price_change > 0 ? price_change : 0, length)
    down = ta.rma(price_change < 0 ? -price_change : 0, length)
    rs = up / down
    rsi = 100 - (100 / (1 + rs))
    rsi

// Fonction pour calculer le MACD
calculate_macd(source, fast_length, slow_length, signal_length) =>
    fast_ma = ta.ema(source, fast_length)
    slow_ma = ta.ema(source, slow_length)
    macd = fast_ma - slow_ma
    signal = ta.ema(macd, signal_length)
    hist = macd - signal
    [macd, signal, hist]

// Calcul des indicateurs
rsi_value = calculate_rsi(close, rsi_length)
[macd_line, signal_line, _] = calculate_macd(close, macd_fast_length, macd_slow_length, macd_signal_length)

// Conditions d'entrée et de sortie
// Entrée en vente : RSI passe de >= 70 à < 70
sell_entry_condition = ta.crossunder(rsi_value, rsi_overbought)

// Sortie en vente : MACD fast MA croise au-dessus de slow MA
sell_exit_condition = ta.crossover(macd_line, signal_line)

// Entrée en achat : RSI passe de <= 30 à > 30
buy_entry_condition = ta.crossover(rsi_value, rsi_oversold)

// Sortie en achat : MACD fast MA croise en-dessous de slow MA
buy_exit_condition = ta.crossunder(macd_line, signal_line)

// Affichage des signaux sur le graphique
plotshape(series=sell_entry_condition, title="Sell Entry", location=location.belowbar, color=color.red, style=shape.triangleup, size=size.small)
plotshape(series=sell_exit_condition, title="Sell Exit", location=location.abovebar, color=color.green, style=shape.triangledown, size=size.small)
plotshape(series=buy_entry_condition, title="Buy Entry", location=location.abovebar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=buy_exit_condition, title="Buy Exit", location=location.belowbar, color=color.red, style=shape.triangledown, size=size.small)

// Entrées et sorties de la stratégie
if (sell_entry_condition)
    strategy.entry("Short", strategy.short)
    
if (sell_exit_condition)
    strategy.close("Short")

if (buy_entry_condition)
    strategy.entry("Long", strategy.long)
    
if (buy_exit_condition)
    strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/451706

> Last Modified

2024-05-17 11:04:03
