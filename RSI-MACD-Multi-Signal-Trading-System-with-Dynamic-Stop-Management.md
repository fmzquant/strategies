
> Name

RSI-MACD-Multi-Signal-Trading-System-with-Dynamic-Stop-Management

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11fc49bce391e023433.png)

#### Overview
This strategy is a technical analysis-based trading system that combines RSI (Relative Strength Index) and MACD (Moving Average Convergence Divergence) dual signal confirmation mechanism, seeking trading opportunities in overbought and oversold zones while employing dynamic stop management. The strategy is designed for short-term trading and is suitable for capturing opportunities in fast-moving markets.

#### Strategy Principle
The strategy utilizes two classic technical indicators - RSI and MACD - to construct a trading signal system. Buy signals are triggered when RSI falls below 35 (oversold zone) and MACD shows a golden cross; sell signals are triggered when RSI rises above 70 (overbought zone) and MACD shows a death cross. The system implements a risk management mechanism with 300 points stop-loss and 600 points take-profit, creating a 2:1 reward-to-risk ratio that helps achieve positive expected returns in long-term trading.

#### Strategy Advantages
1. Dual signal confirmation mechanism improves trading accuracy
2. RSI and MACD combination effectively filters false signals
3. Fixed risk-reward ratio promotes long-term stable profits
4. Adjustable strategy parameters provide good adaptability
5. Label system visualizes trading signals for backtest analysis
6. Short-term settings suitable for capturing quick opportunities

#### Strategy Risks
1. Choppy markets may generate frequent signals leading to consecutive losses
2. Fixed stop-loss may result in significant losses during volatile periods
3. RSI and MACD are lagging indicators, potentially missing optimal entry points
4. Short-term trading is susceptible to market noise
5. Lack of time filters may lead to trading during unsuitable periods

#### Strategy Optimization Directions
1. Introduce trend filters to avoid trading in ranging markets
2. Add volatility indicators for dynamic stop-loss adjustment
3. Implement trading time filters to avoid low liquidity periods
4. Consider adding signal confirmation time requirements to reduce false signals
5. Optimize position sizing system based on market volatility
6. Add trailing stop functionality for better profit protection

#### Summary
The strategy builds a relatively reliable trading system by combining RSI and MACD indicators, complemented by reasonable stop-loss and take-profit settings, showing practical application value. However, it still requires optimization based on actual market conditions, especially in risk control and signal filtering aspects. Successful strategy implementation requires traders to have a deep understanding of the market and the ability to flexibly adjust parameters to adapt to different market environments.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Scalping XAU/USD m5 (Protected)", overlay=true)

// Parâmetros do usuário
rsiPeriod = input(14, title="Período do RSI")
rsiOverbought = input(70, title="Nível de Sobrecompra do RSI")  // Ajustado para aumentar trades
rsiOversold = input(35, title="Nível de Sobrevenda do RSI")    // Ajustado para aumentar trades
macdFast = input(6, title="Média Rápida do MACD") // Ajustado para aumentar a frequência
macdSlow = input(13, title="Média Lenta do MACD")  // Ajustado para aumentar a frequência
macdSignal = input(7, title="Sinal do MACD")
lotSize = input(1, title="Tamanho do Lote")
slPips = input(300, title="Stop-Loss (pips)")  // Definido pelo usuário
tpPips = input(600, title="Take-Profit (pips)")  // Definido pelo usuário

// Cálculos do RSI e MACD
rsi = ta.rsi(close, rsiPeriod)
[macdLine, signalLine, _] = ta.macd(close, macdFast, macdSlow, macdSignal)

// Condições de compra
buyCondition = (rsi < rsiOversold) and (macdLine > signalLine) and (ta.crossover(macdLine, signalLine))

// Condições de venda
sellCondition = (rsi > rsiOverbought) and (macdLine < signalLine) and (ta.crossunder(macdLine, signalLine))

// Executa a compra
if (buyCondition)
    strategy.entry("Compra", strategy.long, qty=lotSize)
    label.new(bar_index, close, "Compra", color=color.green, style=label.style_label_up, textcolor=color.white, size=size.small)

// Executa a venda
if (sellCondition)
    strategy.entry("Venda", strategy.short, qty=lotSize)
    label.new(bar_index, close, "Venda", color=color.red, style=label.style_label_down, textcolor=color.white, size=size.small)

// Saídas com Stop-Loss e Take-Profit
if (strategy.position_size > 0)  // Para posições de compra
    strategy.exit("Saída Compra", from_entry="Compra", stop=close - slPips * syminfo.mintick, limit=close + tpPips * syminfo.mintick)

if (strategy.position_size < 0)  // Para posições de venda
    strategy.exit("Saída Venda", from_entry="Venda", stop=close + slPips * syminfo.mintick, limit=close - tpPips * syminfo.mintick)

// Plota o RSI e suas linhas de sobrecompra/sobrevenda
hline(rsiOverbought, "Sobrecompra", color=color.red)
hline(rsiOversold, "Sobrevenda", color=color.green)
plot(rsi, "RSI", color=color.blue)

// Plota o MACD
macdHist = macdLine - signalLine
plot(macdHist, title="Histograma MACD", color=color.green, style=plot.style_histogram)

```

> Detail

https://www.fmz.com/strategy/473248

> Last Modified

2024-11-28 15:47:00
