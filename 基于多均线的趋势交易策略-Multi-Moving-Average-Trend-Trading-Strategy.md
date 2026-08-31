
> Name

基于多均线的趋势交易策略-Multi-Moving-Average-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15593b7294f644ce99a.png)


#### Overview

This article introduces a trend trading strategy based on multiple moving averages called the "Multi-Moving Average Trend Trading Strategy". The strategy is primarily applied to the Nasdaq futures market and captures upward market trends by analyzing the price position relative to long, medium, and short-term moving averages. It also closes all positions at a specific time each day.

The strategy employs three simple moving averages (SMAs): long-term (default 200 periods), medium-term (default 21 periods), and short-term (default 9 periods). A buy signal is triggered when the price is above the long-term and medium-term moving averages and crosses above the short-term moving average, provided there are no open positions. The strategy also sets fixed-point stop-gain and stop-loss levels to manage risk. Additionally, all positions are closed at 17:00 each trading day.

#### Strategy Principle

1. Calculate the long-term (default 200 periods), medium-term (default 21 periods), and short-term (default 9 periods) simple moving averages.

2. Determine if the current price is above the long-term and medium-term moving averages.

3. Check if the current price crosses above the short-term moving average.

4. When conditions 2 and 3 are both satisfied, and there are no open positions, a buy signal is triggered.

5. After buying, set fixed-point stop-gain and stop-loss levels. Close the position when the price reaches either level.

6. Close all positions at 17:00 each trading day.

#### Strategy Advantages

1. Simple and easy to understand: The strategy is based on moving averages, making it straightforward to comprehend and implement.

2. Trend following: By analyzing the price position relative to moving averages of different periods, the strategy effectively captures upward market trends.

3. Risk control: The strategy incorporates fixed-point stop-gain and stop-loss levels, helping to manage risk for individual trades.

4. Automatic position closing: The strategy automatically closes all positions at a specific time each trading day, avoiding overnight risks.

#### Strategy Risks

1. Parameter optimization: The strategy's performance may be sensitive to the moving average period parameters, requiring optimization for different markets and instruments.

2. Choppy markets: In choppy market conditions, frequent crossover signals may lead to suboptimal strategy performance.

3. Slippage risk: During high market volatility, fixed-point stop-gain and stop-loss levels may not execute as intended, resulting in slippage risk.

#### Strategy Optimization Directions

1. Dynamic stop-gain and stop-loss: Adjust stop-gain and stop-loss levels dynamically based on market volatility or price trends to optimize the risk-reward ratio.

2. Trend filters: Incorporate additional technical indicators, such as the ADX, to confirm trend strength and filter out false signals in choppy markets.

3. Multi-instrument adaptation: Refine the strategy to adapt to different futures instruments and market characteristics.

4. Money management: Introduce more sophisticated money management rules, such as position sizing and risk control, to enhance the strategy's robustness.

#### Summary

The "Multi-Moving Average Trend Trading Strategy" is a simple and easy-to-understand trend-following strategy that captures upward market trends by analyzing the price position relative to moving averages of different periods. The strategy incorporates fixed-point stop-gain and stop-loss levels and automatically closes all positions at a specific time each day to manage risk. However, the strategy may underperform in choppy markets and faces challenges such as parameter optimization and slippage risk. Future optimizations can focus on dynamic stop-gain and stop-loss levels, trend filters, multi-instrument adaptation, and money management to further improve the strategy's robustness and adaptability.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Médias Móveis de MarcosJR", overlay=true)

// Inputs para data inicial e final
start_year = input.int(2020, title="Ano Inicial")
start_month = input.int(1, title="Mês Inicial")
start_day = input.int(1, title="Dia Inicial")

end_year = input.int(2020, title="Ano Final")
end_month = input.int(12, title="Mês Final")
end_day = input.int(31, title="Dia Final")

// Convertendo dia, mês e ano para timestamp
start_date = timestamp(start_year, start_month, start_day, 00, 00)
end_date = timestamp(end_year, end_month, end_day, 23, 59)

// Condição para verificar se a data está dentro do intervalo especificado
date_within_range = true

// Parâmetros para os períodos das médias móveis
ma_short_period = input.int(9, title="MA Curta")
ma_medium_period = input.int(21, title="MA Média")
ma_long_period = input.int(200, title="MA Longa")

// Definindo médias móveis
ma_short = ta.sma(close, ma_short_period)
ma_medium = ta.sma(close, ma_medium_period)
ma_long = ta.sma(close, ma_long_period)

// Plotando as médias móveis no gráfico com espessura aumentada
plot(ma_short, color=color.blue, title="MA Curta", linewidth=2)
plot(ma_medium, color=color.orange, title="MA Média", linewidth=2)
plot(ma_long, color=color.red, title="MA Longa", linewidth=2)

// Verificando se o preço está acima das médias móveis
above_ma_long = close > ma_long
above_ma_medium = close > ma_medium

// Verificando se o preço tocou na média móvel curta
touch_ma_short = ta.crossover(close, ma_short)

// Condições de compra
buy_condition = date_within_range and above_ma_long and above_ma_medium and touch_ma_short

// Sinais de entrada e saída de compra
var float entry_price = na
if (buy_condition and strategy.opentrades == 0) // Verifica se não há operações em andamento
    entry_price := close // Define o preço de entrada ao comprar

// Parâmetros para o tamanho do stop gain e stop loss em pontos
stop_gain_points = input.int(100, title="Stop Gain (pontos)", minval=1)
stop_loss_points = input.int(100, title="Stop Loss (pontos)", minval=1)

// Calcular o preço de saída alvo (Stop Gain) e de stop loss
target_price = entry_price + stop_gain_points * syminfo.mintick
stop_loss_price = entry_price - stop_loss_points * syminfo.mintick

// Sair da operação de compra quando o preço atingir o stop gain ou stop loss
if (strategy.position_size > 0)
    strategy.exit("Venda", "Compra", limit=target_price, stop=stop_loss_price)

// Sinais de entrada de compra
if (buy_condition and strategy.opentrades == 0) // Verifica se não há operações em andamento
    strategy.entry("Compra", strategy.long)

// Plotando setas de compra
plotshape(series=buy_condition, title="Sinal de Compra", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)

// Função para verificar se é 17:00 do mesmo dia
is_17_oclock_same_day = hour == 17 and minute == 0 and hour[1] < 17

// Sair de todas as operações às 17:00 do mesmo dia
if (is_17_oclock_same_day)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/451074

> Last Modified

2024-05-11 17:32:49
