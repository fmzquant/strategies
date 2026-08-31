
> Name

Dual-Crossover-Trend-Following-Strategy-EMA-and-MACD-Synergistic-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b8ce3a649a9104dfc2.png)

[trans]
#### 概述
本策略是一个结合均线和MACD双重技术指标的趋势跟踪交易系统。它主要通过EMA9均线与价格的交叉,以及MACD指标中快线(DIF)与慢线(DEA)的交叉来捕捉市场趋势。同时,策略采用基于过去5根K线的自适应止损方式,并使用3.5倍风险收益比来设置盈利目标,形成了一个完整的交易系统。

#### 策略原理
策略的核心逻辑分为多空两个方向:
1. 做多条件:当收盘价从下向上突破EMA9,同时MACD的DIF线从下向上穿越DEA线时,系统发出做多信号。
2. 做空条件:当收盘价从上向下跌破EMA9,同时MACD的DIF线从上向下穿越DEA线时,系统发出做空信号。
3. 风险管理:
   - 多单止损设置在前5根K线最低点之下
   - 空单止损设置在前5根K线最高点之上
   - 利润目标为止损距离的3.5倍

#### 策略优势
1. 双重确认机制:通过均线和MACD的协同配合,能够有效过滤虚假信号,提高交易的准确性。
2. 自适应止损:基于近期价格波动设置的止损位,可以根据市场波动性自动调整保护位置。
3. 明确的风险收益比:固定3.5倍的风险收益设置,有助于长期稳定盈利。
4. 策略逻辑清晰:入场、出场条件明确,易于理解和执行。
5. 适应性强:可以根据不同市场条件调整参数。

#### 策略风险
1. 震荡市场风险:在横盘震荡市场中可能频繁出现假突破,导致连续止损。
2. 滑点风险:在快速行情中,实际止损和获利价格可能与预期有偏差。
3. 参数敏感性:EMA和MACD的周期设置对策略表现有较大影响。
4. 趋势依赖:策略在没有明确趋势的市场环境下表现可能不佳。

#### 策略优化方向
1. 加入趋势过滤器:可以引入更长周期的趋势指标,只在主趋势方向开仓。
2. 动态风险倍数:根据市场波动性自动调整风险收益比。
3. 时间过滤:加入交易时间段过滤,避开低流动性时段。
4. 仓位管理优化:可以根据信号强度动态调整持仓比例。
5. 引入波动率指标:用于动态调整止损距离。

#### 总结
该策略通过技术指标的双重确认和严格的风险管理,构建了一个完整的趋势跟踪交易系统。虽然存在一定的市场环境依赖性,但通过合理的参数优化和风险管理,策略展现出良好的适应性和稳定性。后续优化方向主要集中在趋势识别的准确性和风险管理的动态性上,以提升策略的整体表现。

|| 

#### Overview
This strategy is a trend following trading system that combines EMA and MACD dual technical indicators. It captures market trends through the crossover of EMA9 with price and the crossover of MACD fast line (DIF) with slow line (DEA). The strategy employs an adaptive stop-loss based on the past 5 candles and uses a 3.5:1 reward-risk ratio for profit targets, forming a complete trading system.

#### Strategy Principle
The core logic is divided into long and short directions:
1. Long conditions: When the closing price breaks above EMA9 from below, and MACD's DIF line crosses above the DEA line, the system generates a long signal.
2. Short conditions: When the closing price breaks below EMA9 from above, and MACD's DIF line crosses below the DEA line, the system generates a short signal.
3. Risk management:
   - Long position stop-loss is set below the lowest point of the previous 5 candles
   - Short position stop-loss is set above the highest point of the previous 5 candles
   - Profit target is set at 3.5 times the stop-loss distance

#### Strategy Advantages
1. Dual confirmation mechanism: Through the synergy of EMA and MACD, effectively filters false signals and improves trading accuracy.
2. Adaptive stop-loss: Stop-loss positions based on recent price volatility automatically adjust according to market volatility.
3. Clear risk-reward ratio: Fixed 3.5:1 risk-reward setting helps achieve long-term stable profits.
4. Clear strategy logic: Entry and exit conditions are explicit, easy to understand and execute.
5. High adaptability: Parameters can be adjusted according to different market conditions.

#### Strategy Risks
1. Choppy market risk: Frequent false breakouts may occur in sideways markets, leading to consecutive stop-losses.
2. Slippage risk: In fast-moving markets, actual stop-loss and profit prices may deviate from expectations.
3. Parameter sensitivity: EMA and MACD period settings have significant impact on strategy performance.
4. Trend dependency: Strategy may not perform well in markets without clear trends.

#### Strategy Optimization Directions
1. Add trend filter: Introduce longer-period trend indicators to only trade in the main trend direction.
2. Dynamic risk multiplier: Automatically adjust risk-reward ratio based on market volatility.
3. Time filtering: Add trading time filters to avoid low liquidity periods.
4. Position management optimization: Dynamically adjust position size based on signal strength.
5. Introduce volatility indicators: For dynamic adjustment of stop-loss distances.

#### Summary
This strategy constructs a complete trend following trading system through technical indicator dual confirmation and strict risk management. Although there is some market environment dependency, the strategy shows good adaptability and stability through reasonable parameter optimization and risk management. Future optimization directions mainly focus on improving trend identification accuracy and risk management dynamics to enhance overall strategy performance.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2025-01-16 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

// =======================
// @version=6
strategy(title="MACD + EMA9 3 h",
     shorttitle="MACD+EMA9+StopTP_5candles",
     overlay=true,
     initial_capital=100000,    // Ajuste conforme desejar
     default_qty_type=strategy.percent_of_equity,
     default_qty_value=200)      // Ajuste % de risco ou quantidade

// ----- Entradas (Inputs) -----
emaLen          = input.int(9,     "Período da EMA 9", minval=1)
macdFastLen     = input.int(12,    "Período MACD Rápido", minval=1)
macdSlowLen     = input.int(26,    "Período MACD Lento",  minval=1)
macdSignalLen   = input.int(9,     "Período MACD Signal", minval=1)
riskMultiplier  = input.float(3.5, "Fator de Multiplicação do Risco (TP)")
lookbackCandles = input.int(5,     "Quantidade de candles p/ Stop", minval=1)

// ----- Cálculo da EMA -----
ema9 = ta.ema(close, emaLen)

// ----- Cálculo do MACD -----
[macdLine, signalLine, histLine] = ta.macd(close, macdFastLen, macdSlowLen, macdSignalLen)
// DIF cruza DEA para cima ou para baixo
macdCrossover   = ta.crossover(macdLine, signalLine)   // DIF cruza DEA p/ cima
macdCrossunder  = ta.crossunder(macdLine, signalLine)  // DIF cruza DEA p/ baixo

// ----- Condições de Compra/Venda -----

// Compra quando:
// 1) Preço cruza EMA9 de baixo pra cima
// 2) MACD cruza a linha de sinal para cima
buySignal = ta.crossover(close, ema9) and macdCrossover

// Venda quando:
// 1) Preço cruza EMA9 de cima pra baixo
// 2) MACD cruza a linha de sinal para baixo
sellSignal = ta.crossunder(close, ema9) and macdCrossunder

// ----- Execução das ordens -----

// Identifica o menor e o maior preço dos últimos 'lookbackCandles' candles.
// A função ta.lowest() e ta.highest() consideram, por padrão, a barra atual também.
// Se você quiser EXCLUIR a barra atual, use low[1] / high[1] dentro do ta.lowest() / ta.highest().
lowestLow5  = ta.lowest(low, lookbackCandles)
highestHigh5= ta.highest(high, lookbackCandles)

// >>> Quando há sinal de COMPRA <<<
if (buySignal)
    // Fecha posição vendida, se existir
    strategy.close("Sell")
    // Entra comprado
    strategy.entry("Buy", strategy.long)
    
    // STOP: abaixo do menor preço dos últimos 5 candles
    stopPrice = lowestLow5
    // Risco = (preço de entrada) - (stop)
    // Note que strategy.position_avg_price só fica disponível a partir da barra seguinte.
    // Por isso, o exit costuma funcionar corretamente apenas na barra seguinte.
    // Para fins de teste, podemos usar 'close' como proxy do "entry" (ou aceitar essa limitação).
    // A forma "correta" de usar strategy.position_avg_price seria via calc_on_order_fills = true,
    // mas isso pode exigir algumas configurações adicionais.
    risk = strategy.position_avg_price - stopPrice
    
    // Take Profit = entrada + 2,5 * risco
    takeProfitPrice = strategy.position_avg_price + riskMultiplier * risk

    // Registra a saída (stop e alvo) vinculada à posição "Buy"
    strategy.exit("Exit Buy", "Buy", stop=stopPrice, limit=takeProfitPrice)

// >>> Quando há sinal de VENDA <<<
if (sellSignal)
    // Fecha posição comprada, se existir
    strategy.close("Buy")
    // Entra vendido
    strategy.entry("Sell", strategy.short)
    
    // STOP: acima do maior preço dos últimos 5 candles
    stopPrice = highestHigh5
    // Risco = (stop) - (preço de entrada)
    risk = stopPrice - strategy.position_avg_price
    
    // Take Profit = entrada - 2,5 * risco
    takeProfitPrice = strategy.position_avg_price - riskMultiplier * risk

    // Registra a saída (stop e alvo) vinculada à posição "Sell"
    strategy.exit("Exit Sell", "Sell", stop=stopPrice, limit=takeProfitPrice)

// ----- Plotagens visuais -----
plot(ema9, color=color.orange, linewidth=2, title="EMA 9")

plot(macdLine,       color=color.new(color.blue, 0),   title="MACD")
plot(signalLine,     color=color.new(color.red, 0),    title="Signal")
plot(histLine,       color=color.new(color.purple, 0), style=plot.style_histogram, title="Histogram")

// Só para auxiliar na visualização, vamos plotar a linha do lowestLow5 e highestHigh5
plot(lowestLow5,    color=color.new(color.lime, 70),  style=plot.style_line, title="Lowest 5 bars")
plot(highestHigh5,  color=color.new(color.fuchsia,70),style=plot.style_line, title="Highest 5 bars")
```

> Detail

https://www.fmz.com/strategy/478727

> Last Modified

2025-01-17 16:06:16
