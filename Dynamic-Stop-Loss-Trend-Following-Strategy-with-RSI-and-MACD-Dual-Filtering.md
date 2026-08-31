
> Name

Dynamic-Stop-Loss-Trend-Following-Strategy-with-RSI-and-MACD-Dual-Filtering

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d909e9478583b1a14d6a.png)
![IMG](https://www.fmz.com/upload/asset/2d84546213395878b9249.png)




[trans]
#### 概述
本策略是一个基于MACD和RSI双重指标过滤的趋势跟踪系统，集成了动态止损机制。该策略主要通过MACD的交叉信号产生交易机会，并使用RSI作为二次确认，同时引入了百分比止损来控制风险。策略的核心在于通过技术指标的配合使用来提高交易信号的可靠性，并通过动态止损来保护盈利。

#### 策略原理
策略采用MACD(12,26,9)和RSI(14)作为主要指标。入场信号需同时满足两个条件：MACD金叉且RSI处于超卖区域(默认40以下)时做多，MACD死叉且RSI处于超买区域(默认59以上)时做空。系统还设置了3%的动态止损，当价格向不利方向移动超过设定百分比时，会自动平仓以控制风险。此外，策略还包含了时间过滤器，允许用户设定特定的交易时间范围。

#### 策略优势
1. 双重指标过滤提高了交易信号的可靠性，减少了虚假信号。
2. 动态止损机制有效控制了每笔交易的风险。
3. 策略参数可根据不同市场条件灵活调整。
4. 时间过滤功能允许在特定时间段内执行交易。
5. 采用资金百分比持仓，有利于资金管理。

#### 策略风险
1. 在震荡市场中可能产生频繁的交易信号，增加交易成本。
2. 固定百分比止损可能在高波动性市场中导致过早平仓。
3. MACD作为滞后指标可能在快速市场中错过重要价格走势。
4. RSI阈值的设置需要针对不同市场进行优化。
5. 交易成本和滑点可能影响策略的实际表现。

#### 策略优化方向
1. 引入波动率指标来动态调整止损百分比。
2. 增加趋势强度过滤器，避免在震荡市场中过度交易。
3. 考虑添加移动止损来保护盈利。
4. 优化RSI和MACD的参数设置，使其更适应不同的市场周期。
5. 增加交易量分析，提高信号可靠性。

#### 总结
这是一个结构完整、逻辑清晰的趋势跟踪策略。通过MACD和RSI的组合使用，有效提高了交易信号的质量。动态止损的设计帮助控制风险，使策略具有良好的风险管理特性。该策略适合在趋势明确的市场中使用，但需要根据具体市场特征调整参数设置。通过建议的优化方向，策略的稳定性和可靠性还可以进一步提升。|| 

#### Overview
This strategy is a trend following system based on dual filtering with MACD and RSI indicators, integrated with a dynamic stop-loss mechanism. The strategy primarily generates trading opportunities through MACD crossover signals, uses RSI as secondary confirmation, and incorporates percentage-based stop-losses for risk control. The core strength lies in combining technical indicators to enhance signal reliability while protecting profits through dynamic stop-losses.

#### Strategy Principles
The strategy employs MACD(12,26,9) and RSI(14) as primary indicators. Entry signals require two conditions to be met simultaneously: MACD golden cross with RSI in oversold territory (default below 40) for long positions, and MACD death cross with RSI in overbought territory (default above 59) for short positions. The system includes a 3% dynamic stop-loss, automatically closing positions when price moves adversely beyond the set percentage. Additionally, the strategy incorporates a time filter allowing users to set specific trading time ranges.

#### Strategy Advantages
1. Dual indicator filtering enhances trade signal reliability and reduces false signals.
2. Dynamic stop-loss mechanism effectively controls risk for each trade.
3. Strategy parameters can be flexibly adjusted for different market conditions.
4. Time filtering functionality allows execution within specific time periods.
5. Percentage-based position sizing supports effective money management.

#### Strategy Risks
1. May generate frequent trading signals in ranging markets, increasing transaction costs.
2. Fixed percentage stop-loss might trigger premature exits in highly volatile markets.
3. MACD as a lagging indicator may miss significant price movements in fast markets.
4. RSI threshold settings require optimization for different markets.
5. Trading costs and slippage can impact actual strategy performance.

#### Optimization Directions
1. Introduce volatility indicators to dynamically adjust stop-loss percentages.
2. Add trend strength filters to avoid overtrading in ranging markets.
3. Consider implementing trailing stops to protect profits.
4. Optimize RSI and MACD parameters to better adapt to different market cycles.
5. Include volume analysis to enhance signal reliability.

#### Summary
This is a well-structured trend following strategy with clear logic. The combination of MACD and RSI effectively improves trade signal quality. The dynamic stop-loss design helps control risk, providing good risk management characteristics. The strategy is suitable for markets with clear trends but requires parameter adjustment based on specific market characteristics. Through the suggested optimization directions, the strategy's stability and reliability can be further enhanced.
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-13 10:00:00
end: 2025-02-19 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Binance","currency":"BNB_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © eagle916
//@version=5
strategy("EAG MACD + RSI Strategy",overlay=true, initial_capital = 300, default_qty_value = 10, default_qty_type = "percent_of_equity", commission_type=strategy.commission.percent, commission_value=0.1)


// Input para el RSI
rsi_length = input.int(14, title="RSI Length", minval=1)
rsi_overbought = input.int(59, title="RSI Overbought Level", minval=1, maxval=100)
rsi_oversold = input.int(40, title="RSI Oversold Level", minval=1, maxval=100)

// Input para el MACD
macd_length = input.int(12, title="MACD Length", minval=1)
macd_overbought = input.int(26, title="MACD Overbought Level", minval=1, maxval=100)
macd_signal = input.int(9, title="MACD Signal Level", minval=1, maxval=100)

// Input para el porcentaje de pérdida (stop loss)
stop_loss_percent = input.float(3.0, title="Porcentaje de Stop Loss (%)", minval=0.1, step=0.1)

// Calcular RSI
rsi_value = ta.rsi(close, rsi_length)

// Calcular MACD
[macdLine, signalLine, _] = ta.macd(close, macd_length, macd_overbought, macd_signal)
macd_crossup = ta.crossover(macdLine, signalLine)   // Cruce al alza del MACD
macd_crossdown = ta.crossunder(macdLine, signalLine) // Cruce a la baja del MACD

// Condiciones de compra y venta
buy_condition = macd_crossup and rsi_value <= rsi_oversold
sell_condition = macd_crossdown and rsi_value >= rsi_overbought


// Registrar precio de entrada
var float entry_price = na
if strategy.position_size == 0
    entry_price := na

// Mostrar señales de compra y venta en la gráfica principal
plotshape(series=buy_condition, title="Señal de Compra", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY") // Compra debajo de la vela
plotshape(series=sell_condition, title="Señal de Venta", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL") // Venta encima de la vela

// Órdenes de estrategia
if buy_condition 
    strategy.entry("Compra", strategy.long)
    entry_price := close
if sell_condition 
    strategy.entry("Venta", strategy.short)
    entry_price := close

// Calcular el precio de stop loss
long_stop_loss = entry_price * (1 - stop_loss_percent / 100)
short_stop_loss = entry_price * (1 + stop_loss_percent / 100)

// Cerrar posición si el precio va en contra el porcentaje definido por el usuario
if strategy.position_size > 0 and close < long_stop_loss
    strategy.close("Compra", comment="Stop Loss Compra")

if strategy.position_size < 0 and close > short_stop_loss
    strategy.close("Venta", comment="Stop Loss Venta")



```

> Detail

https://www.fmz.com/strategy/482891

> Last Modified

2025-02-20 16:50:43
