
> Name

双均线RSI趋势动量策略-Dual-Moving-Average-RSI-Trend-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/db22dda680df8f0891.png)


#### Overview
This strategy is a trend-following trading system that combines dual moving averages with the RSI indicator. It determines market trend direction through crossovers of short-term and long-term moving averages while utilizing RSI indicator for optimal entry points in overbought and oversold areas, achieving a perfect combination of trend following and momentum reversal. The strategy employs percentage-based money management, investing 10% of the total account balance per trade for effective risk control.

#### Strategy Principles
The strategy uses 10-period and 50-period Simple Moving Averages (SMA) to identify trends. Buy signals are generated when the short-term MA crosses above the long-term MA and RSI is below 30, while sell signals occur when the short-term MA crosses below the long-term MA and RSI is above 70. For position closing, long positions are closed when RSI exceeds 70, and short positions are closed when RSI falls below 30. This design ensures both trend direction accuracy and timely profit-taking at price extremes.

#### Strategy Advantages
1. Combines trend and momentum confirmation to improve trade success rate
2. Implements percentage-based money management for effective risk control
3. Sets clear entry and exit conditions to avoid subjective judgment
4. Fully utilizes RSI indicator's overbought and oversold characteristics
5. Clear strategy logic that's easy to understand and execute
6. Adaptable to different market environments with strong versatility

#### Strategy Risks
1. May generate excessive false signals in ranging markets
2. RSI may remain in overbought/oversold zones during strong trends
3. Dual MA system has inherent lag
4. Fixed parameters may not suit all market conditions
Risk management recommendations:
- Set stop-loss levels
- Dynamically adjust parameters
- Add trend confirmation indicators
- Control single trade size

#### Optimization Directions
1. Introduce adaptive parameter mechanism to dynamically adjust MA periods based on market volatility
2. Add trend strength filter to avoid trading in weak trends
3. Optimize money management system to adjust position size based on market volatility
4. Incorporate additional technical indicators for trade confirmation
5. Develop dynamic stop-loss mechanism to improve capital efficiency

#### Summary
This is a quantitative trading strategy that perfectly combines trend following with momentum reversal. It uses dual moving averages to determine trend direction and RSI to find optimal entry points, ensuring both directional accuracy and timely profit-taking at price extremes. The key to strategy success lies in reasonable parameter settings and effective risk control. Through continuous optimization and improvement, the strategy has the potential to achieve stable returns across different market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-12 00:00:00
end: 2024-11-11 00:00:00
period: 5m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Super Advanced Strategy", overlay=true)

// Configuração de parâmetros
shortMAPeriod = input.int(10, title="Período da Média Móvel Curta", minval=1)
longMAPeriod = input.int(50, title="Período da Média Móvel Longa", minval=1)
rsiPeriod = input.int(14, title="Período do RSI", minval=1)

// Cálculo das Médias Móveis
shortMA = ta.sma(close, shortMAPeriod)
longMA = ta.sma(close, longMAPeriod)

// Cálculo do RSI
rsi = ta.rsi(close, rsiPeriod)

// Plotando as Médias Móveis
plot(shortMA, title="Média Móvel Curta", color=color.blue, linewidth=2)
plot(longMA, title="Média Móvel Longa", color=color.red, linewidth=2)

// Adicionando linhas horizontais para os níveis de sobrecomprado e sobrevendido
hline(70, "Sobrecomprado", color=color.red, linestyle=hline.style_dashed)
hline(30, "Sobrevendido", color=color.green, linestyle=hline.style_dashed)

// Condições de entrada
buyCondition = (shortMA > longMA) and (rsi < 30)
sellCondition = (shortMA < longMA) and (rsi > 70)

// Entradas de ordens
if (buyCondition)
    strategy.entry("Compra", strategy.long)

if (sellCondition)
    strategy.entry("Venda", strategy.short)

// Saídas de ordens
if (rsi > 70)
    strategy.close("Compra")

if (rsi < 30)
    strategy.close("Venda")

// Exibir as condições de compra e venda no gráfico
plotshape(buyCondition, style=shape.labelup, location=location.belowbar, color=color.green, size=size.small, title="Sinal de Compra", text="BUY")
plotshape(sellCondition, style=shape.labeldown, location=location.abovebar, color=color.red, size=size.small, title="Sinal de Venda", text="SELL")

```

> Detail

https://www.fmz.com/strategy/471688

> Last Modified

2024-11-12 14:34:17
