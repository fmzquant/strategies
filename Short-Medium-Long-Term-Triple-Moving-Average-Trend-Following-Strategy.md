
> Name

Short-Medium-Long-Term-Triple-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127746d729b4d14af8b.png)


#### Overview
The "Short-Medium-Long Term Triple Moving Average Trend Following Strategy" is a quantitative investment strategy that utilizes a combination of moving averages with different periods to capture market trends and generate trading signals. The strategy is based on a 3-day low price short-term moving average, a 3-day high price short-term moving average, and a 30-day closing price medium-term moving average. By comparing the closing price's relative position to these three moving averages, the strategy determines the trend direction and issues trading signals. When the closing price falls below the 3-day low price moving average and is above the 30-day closing price moving average, a long position is entered. When the closing price breaks above the 3-day high price moving average, the position is closed.

#### Strategy Principle
The core principle of this strategy is to utilize the trend characteristics of moving averages and the crossover relationships between different period moving averages to capture market trends. The short-term 3-day low and high price moving averages can quickly react to short-term price fluctuations, while the medium-term 30-day closing price moving average reflects the trend direction at a higher level.

When the closing price falls below the 3-day low price moving average and is above the 30-day closing price moving average, it indicates a short-term pullback but a bullish medium-term trend, signaling a long entry. When the closing price breaks above the 3-day high price moving average, the short-term upward momentum is exhausted, prompting a position exit. By combining short and medium-term moving averages, the strategy can enter at the early stage of a trend and exit before the trend ends.

#### Strategy Advantages
1. Strong trend-capturing ability. The strategy utilizes the combination of short and medium-term moving averages with different periods to effectively capture medium to long-term market trends and follow the trend.
2. Timely profit-taking. By using the 30-day medium-term moving average to determine the trend direction and the 3-day short-term moving average to timely realize profits, excessive holding is avoided.
3. Simple parameters, easy to understand and optimize. The strategy only uses three moving averages, with a clear logic and parameters that are easy to optimize and test.
4. Strong adaptability. The combination of short and medium-term moving averages can adapt to markets with different fluctuation cycles and has a certain adaptability to both trending and ranging markets.

#### Strategy Risks
1. Frequent trading. The strategy may generate frequent trading signals in ranging markets, increasing trading costs.
2. Sudden event risk. If the market experiences severe abnormal fluctuations, the moving average system may fail, causing significant drawdowns.
3. Parameter invalidation risk. If the rhythm of market trends changes, the original parameters may lose effectiveness and require re-optimization.
4. Lack of position management. The strategy does not set position management and capital management rules, limiting its risk control capability.

#### Strategy Optimization Direction
1. Add position management. Dynamic position adjustment can be implemented based on trend strength, volatility, and other indicators to improve the risk-return ratio.
2. Combine with other trend indicators. Other trend-based indicators such as MACD and DMI can be introduced as supplements to improve the accuracy of trend judgment.
3. Optimize parameters. Optimize moving average parameters for different underlying assets and timeframes to find the optimal parameter combination.
4. Incorporate stop-loss. Set reasonable stop-loss levels to control the maximum loss per trade and enhance the strategy's robustness.
5. Appropriate filtering. Reduce trading frequency in ranging markets by considering the addition of volatility filtering mechanisms such as ATR.

#### Summary
The "Short-Medium-Long Term Triple Moving Average Trend Following Strategy" is a quantitative trading strategy that captures trends using moving averages with different periods. It enters at the early stage of a trend and exits before its end by comparing the price's position relative to the 3-day low price moving average, 3-day high price moving average, and 30-day moving average. The strategy's logic is simple and easy to understand, with strong adaptability. However, it also has risks such as frequent trading and lack of position management. Future improvements can be made in areas such as position management, stop-loss and profit-taking, and parameter optimization to obtain more robust returns.



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
strategy(title="Estratégia de Médias Móveis - Entrada/Saída Simples", shorttitle="MM3", overlay=true)

// Parâmetros de entrada para a data de início e final do backtest
var start_date_input = input(title="Data de Início", defval=timestamp("01 Jan 2020 00:00 +0000"))
var end_date_input = input(title="Data Final", defval=timestamp("01 Jan 2021 00:00 +0000"))

// Convertendo as datas de entrada para formato de tempo
start_date = timestamp(year(start_date_input), month(start_date_input), dayofmonth(start_date_input), 0, 0)
end_date = timestamp(year(end_date_input), month(end_date_input), dayofmonth(end_date_input), 23, 59)

// Definindo as Médias Móveis
min_ma_3 = ta.sma(low, 3)
max_ma_3 = ta.sma(high, 3)
close_ma_30 = ta.sma(close, 30)

// Condição de Entrada: Fechamento abaixo da Média de 3 Mínimas e acima da Média de 30 Fechamentos
entry_condition = close < min_ma_3 and close > close_ma_30

// Condição de Saída: Fechamento acima da Média de 3 Máximas
exit_condition = close > max_ma_3

// Sinal de Compra: Entrada na próxima vela após a condição de entrada ser verdadeira
if (entry_condition )
    strategy.entry("Buy", strategy.long)

// Sinal de Venda: Saída na próxima vela após a condição de saída ser verdadeira
if (exit_condition)
    strategy.close("Buy")

// Plotando as Médias Móveis e os Sinais de Entrada/Saída
plot(min_ma_3, color=color.red, linewidth=2, title="Média de 3 Mínimas")
plot(max_ma_3, color=color.blue, linewidth=2, title="Média de 3 Máximas")
plot(close_ma_30, color=color.orange, linewidth=2, title="Média de 30 Fechamentos")

```

> Detail

https://www.fmz.com/strategy/451032

> Last Modified

2024-05-11 12:04:27
