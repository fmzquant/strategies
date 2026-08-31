
> Name

Multi-Timeframe-Dynamic-Stop-Loss-EMA-Squeeze-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11b4c11b0052e85efa7.png)

[trans]
#### 概述
本策略是一个基于多时间周期分析的动态交易系统，结合了指数移动平均线(EMA)、Squeeze动量指标(SQM)和资金流向指标(CMF)进行交易信号的生成。策略的核心是通过多重时间框架的分析来确认趋势，并使用动态止损来优化风险管理。该策略采用了自适应的止损和获利方案，可以根据市场波动性自动调整交易参数。

#### 策略原理
策略使用了三个主要的技术指标组合来识别交易机会。首先，通过11周期和34周期的EMA来确定市场趋势方向。其次，使用改良版的Squeeze Momentum指标来检测市场压力和潜在的突破机会，该指标通过线性回归方法计算价格偏离度。最后，通过改良的资金流向指标(CMF)来确认交易方向，确保有足够的资金支持价格移动。策略在确认信号后会设置动态止损位，止损位会随着盈利的增加而自动调整，这种方法既保护了已有利润，又给予价格足够的波动空间。

#### 策略优势
1. 多维度信号确认：通过结合多个技术指标和时间周期的分析，显著降低了假信号的风险。
2. 智能风险管理：动态止损系统能够根据市场波动自动调整，在保护利润的同时避免过早出场。
3. 自适应性强：策略参数可以根据不同市场条件进行调整，具有良好的适应性。
4. 完整的交易闭环：从入场信号到出场管理都有明确的规则，减少了主观判断的影响。
5. 资金流向确认：通过监控资金流向来验证价格走势，提高了交易的可靠性。

#### 策略风险
1. 参数敏感性：多个技术指标的参数设置需要careful优化，不当的参数可能导致性能下降。
2. 市场环境依赖：在剧烈波动或者低流动性的市场环境下，信号质量可能会受到影响。
3. 计算复杂度：多时间周期的计算可能会导致信号延迟，影响实际交易效果。
4. 止损调整风险：动态止损在某些市场条件下可能会过于激进或保守。
5. 资金管理要求：策略需要合理的资金管理来平衡风险和收益。

#### 策略优化方向
1. 引入波动率自适应：可以根据ATR或其他波动率指标来动态调整参数，提高策略的适应性。
2. 优化信号过滤：可以添加交易量加权或时间过滤来提高信号质量。
3. 改进止损机制：可以结合支撑位和阻力位来优化止损点位的设置。
4. 增加市场环境分析：引入市场趋势强度指标，在不同市场环境下使用不同的参数设置。
5. 完善资金管理：引入仓位管理算法，根据信号强度和市场波动调整持仓比例。

#### 总结
该策略通过多维度的技术分析和智能风险管理，为交易者提供了一个系统化的交易方案。其核心优势在于结合了趋势跟踪和动态风险管理，能够在保护利润的同时捕捉市场机会。虽然策略存在一些需要优化的方面，但通过合理的参数设置和风险控制，仍然可以作为一个有效的交易工具。建议交易者在实盘使用前进行充分的回测和参数优化，并结合市场经验逐步完善交易系统。||

#### Overview
This strategy is a dynamic trading system based on multi-timeframe analysis, combining Exponential Moving Averages (EMA), Squeeze Momentum Indicator (SQM), and Money Flow Index (CMF) for signal generation. The core concept involves trend confirmation through multiple time frames and dynamic stop-loss optimization for risk management. The strategy employs an adaptive stop-loss and profit-taking scheme that automatically adjusts trading parameters based on market volatility.

#### Strategy Principles
The strategy utilizes three main technical indicators to identify trading opportunities. First, it uses 11-period and 34-period EMAs to determine market trend direction. Second, it employs a modified Squeeze Momentum indicator to detect market pressure and potential breakout opportunities, calculated through linear regression of price deviations. Finally, it confirms trade direction through a modified Money Flow indicator, ensuring sufficient capital supports price movements. The strategy sets dynamic stop-loss levels after signal confirmation, which automatically adjust as profits increase, protecting gains while allowing for price fluctuations.

#### Strategy Advantages
1. Multi-dimensional signal confirmation: Significantly reduces false signals through the integration of multiple technical indicators and timeframes.
2. Intelligent risk management: Dynamic stop-loss system automatically adjusts based on market volatility, protecting profits while avoiding premature exits.
3. High adaptability: Strategy parameters can be adjusted for different market conditions.
4. Complete trading cycle: Clear rules from entry to exit management reduce subjective judgment influence.
5. Money flow confirmation: Validates price trends through money flow monitoring, improving trade reliability.

#### Strategy Risks
1. Parameter sensitivity: Multiple technical indicator parameters require careful optimization.
2. Market environment dependence: Signal quality may be affected in highly volatile or low-liquidity markets.
3. Computational complexity: Multi-timeframe calculations may cause signal delays.
4. Stop-loss adjustment risk: Dynamic stops may become too aggressive or conservative in certain market conditions.
5. Capital management requirements: Strategy needs proper fund management to balance risk and reward.

#### Optimization Directions
1. Introduce volatility adaptation: Dynamically adjust parameters based on ATR or other volatility indicators.
2. Optimize signal filtering: Add volume weighting or time filtering to improve signal quality.
3. Improve stop-loss mechanism: Optimize stop-loss placement using support and resistance levels.
4. Enhanced market environment analysis: Introduce trend strength indicators for different market conditions.
5. Refined capital management: Implement position sizing algorithms based on signal strength and market volatility.

#### Summary
This strategy offers traders a systematic trading approach through multi-dimensional technical analysis and intelligent risk management. Its core strength lies in combining trend following with dynamic risk management, capturing market opportunities while protecting profits. While there are aspects requiring optimization, the strategy can serve as an effective trading tool with proper parameter settings and risk control. Traders are advised to conduct thorough backtesting and parameter optimization before live implementation, gradually refining the trading system based on market experience.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-10 00:00:00
end: 2024-12-09 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("LL Crypto - SUI", overlay=true)

// Parâmetros de tempo para criptomoedas
fast_ema_len = input.int(11, minval=5, title="Fast EMA")
slow_ema_len = input.int(34, minval=20, title="Slow EMA")
sqm_lengthKC = input.int(20, title="SQM KC Length")
kauf_period = input.int(20, title="Kauf Period")
kauf_mult = input.float(2, title="Kauf Mult factor")
min_profit_sl = input.float(5, minval=0.01, maxval=100.0, title="Min profit to start moving SL [%]")
longest_sl = input.float(10, minval=0.01, maxval=100.0, title="Maximum possible of SL [%]")
sl_step = input.float(0.5, minval=0.0, maxval=1.0, title="Take profit factor")

// Parâmetros adaptados para criptomoedas
CMF_length = input.int(11, minval=1, title="CMF length")
show_plots = input.bool(true, title="Show plots")

// Definir intervalos de tempo para criptomoedas
selected_timeframe = input.string(defval="15", title="Intervalo de Tempo", options=["1", "15", "60"])

lower_resolution = timeframe.period == '1' ? '1' :
                   timeframe.period == '5' ? '15' :
                   timeframe.period == '15' ? '60' :
                   timeframe.period == '60' ? '240' :
                   timeframe.period == '240' ? 'D' :
                   timeframe.period == 'D' ? 'W' : 'M'

sp_close = close[barstate.isrealtime ? 1 : 0]
sp_high = high[barstate.isrealtime ? 1 : 0]
sp_low = low[barstate.isrealtime ? 1 : 0]
sp_volume = volume[barstate.isrealtime ? 1 : 0]

// Calcular Squeeze Momentum ajustado para criptomoedas
sqm_val = ta.linreg(sp_close - math.avg(math.avg(ta.highest(sp_high, sqm_lengthKC), ta.lowest(sp_low, sqm_lengthKC)), ta.sma(sp_close, sqm_lengthKC)), sqm_lengthKC, 0)
close_low = request.security(syminfo.tickerid, lower_resolution, sp_close, lookahead=barmerge.lookahead_on)
high_low = request.security(syminfo.tickerid, lower_resolution, sp_high, lookahead=barmerge.lookahead_on)
low_low = request.security(syminfo.tickerid, lower_resolution, sp_low, lookahead=barmerge.lookahead_on)
sqm_val_low = ta.linreg(close_low - math.avg(math.avg(ta.highest(high_low, sqm_lengthKC), ta.lowest(low_low, sqm_lengthKC)), ta.sma(close_low, sqm_lengthKC)), sqm_lengthKC, 0)

// CMF adaptado para criptomoedas
ad = sp_close == sp_high and sp_close == sp_low or sp_high == sp_low ? 0 : ((2 * sp_close - sp_low - sp_high) / (sp_high - sp_low)) * sp_volume
money_flow = math.sum(ad, CMF_length) / math.sum(sp_volume, CMF_length)

// Condições de entrada para criptomoedas
low_condition_long = (sqm_val_low > sqm_val_low[1])
low_condition_short = (sqm_val_low < sqm_val_low[1])
money_flow_min = (money_flow[4] > money_flow[2]) and (money_flow[3] > money_flow[2]) and (money_flow[2] < money_flow[1]) and (money_flow[2] < money_flow)
money_flow_max = (money_flow[4] < money_flow[2]) and (money_flow[3] < money_flow[2]) and (money_flow[2] > money_flow[1]) and (money_flow[2] > money_flow)
condition_long = ((sqm_val > sqm_val[1])) and money_flow_min and ta.lowest(sqm_val, 5) < 0
condition_short = ((sqm_val < sqm_val[1])) and money_flow_max and ta.highest(sqm_val, 5) > 0
enter_long = low_condition_long and condition_long
enter_short = low_condition_short and condition_short

// Stop conditions
var float current_target_price = na
var float current_sl_price = na
var float current_target_per = na
var float current_profit_per = na

set_targets(isLong, min_profit, current_target_per, current_profit_per) =>
    float target = na
    float sl = na
    if isLong
        target := sp_close * (1.0 + current_target_per)
        sl := sp_close * (1.0 - (longest_sl / 100.0))
    else
        target := sp_close * (1.0 - current_target_per)
        sl := sp_close * (1.0 + (longest_sl / 100.0))
    [target, sl]

target_reached(isLong, min_profit, current_target_per, current_profit_per) =>
    float target = na
    float sl = na
    float profit_per = na
    float target_per = na
    if current_profit_per == na
        profit_per := (min_profit * sl_step) / 100.0
    else
        profit_per := current_profit_per + ((min_profit * sl_step) / 100.0)
    target_per := current_target_per + (min_profit / 100.0)
    if isLong
        target := strategy.position_avg_price * (1.0 + target_per)
        sl := strategy.position_avg_price * (1.0 + profit_per)
    else
        target := strategy.position_avg_price * (1.0 - target_per)
        sl := strategy.position_avg_price * (1.0 - profit_per)
    [target, sl, profit_per, target_per]

hl_diff = ta.sma(sp_high - sp_low, kauf_period)
stop_condition_long = 0.0
new_stop_condition_long = sp_low - (hl_diff * kauf_mult)
if (strategy.position_size > 0)
    if (sp_close > current_target_price)
        [target, sl, profit_per, target_per] = target_reached(true, min_profit_sl, current_target_per, current_profit_per)
        current_target_price := target
        current_sl_price := sl
        current_profit_per := profit_per
        current_target_per := target_per
    stop_condition_long := math.max(stop_condition_long[1], current_sl_price)
else
    stop_condition_long := new_stop_condition_long

stop_condition_short = 99999999.9
new_stop_condition_short = sp_high + (hl_diff * kauf_mult)
if (strategy.position_size < 0)
    if (sp_close < current_target_price)
        [target, sl, profit_per, target_per] = target_reached(false, min_profit_sl, current_target_per, current_profit_per)
        current_target_price := target
        current_sl_price := sl
        current_profit_per := profit_per
        current_target_per := target_per
    stop_condition_short := math.min(stop_condition_short[1], current_sl_price)
else
    stop_condition_short := new_stop_condition_short

// Submit entry orders
if (enter_long and (strategy.position_size <= 0))
    if (strategy.position_size < 0)
        strategy.close(id="SHORT")
    current_target_per := (min_profit_sl / 100.0)
    current_profit_per := na
    [target, sl] = set_targets(true, min_profit_sl, current_target_per, current_profit_per)
    current_target_price := target
    current_sl_price := sl
    strategy.entry(id="LONG", direction=strategy.long)

    if show_plots
        label.new(bar_index, sp_high, text="LONG\nSL: " + str.tostring(stop_condition_long), style=label.style_label_down, color=color.green)





if (enter_short and (strategy.position_size >= 0))
    if (strategy.position_size > 0)
        strategy.close(id="LONG")
    current_target_per := (min_profit_sl / 100.0)
    current_profit_per := na
    [target, sl] = set_targets(false, min_profit_sl, current_target_per, current_profit_per)
    current_target_price := target
    current_sl_price := sl
    strategy.entry(id="SHORT", direction=strategy.short)
    if show_plots
        label.new(bar_index, sp_high, text="SHORT\nSL: " + str.tostring(stop_condition_short), style=label.style_label_down, color=color.red)

if (strategy.position_size > 0)
    strategy.exit(id="EXIT LONG", stop=stop_condition_long)

if (strategy.position_size < 0)
    strategy.exit(id="EXIT SHORT", stop=stop_condition_short)

// Plot anchor trend
plotshape(low_condition_long, style=shape.triangleup, location=location.abovebar, color=color.green)
plotshape(low_condition_short, style=shape.triangledown, location=location.abovebar, color=color.red)

plotshape(condition_long, style=shape.triangleup, location=location.belowbar, color=color.green)
plotshape(condition_short, style=shape.triangledown, location=location.belowbar, color=color.red)

plotshape(enter_long, style=shape.triangleup, location=location.bottom, color=color.green)
plotshape(enter_short, style=shape.triangledown, location=location.bottom, color=color.red)

// Plot emas
plot(ta.ema(close, 20), color=color.blue, title="20 EMA")
plot(ta.ema(close, 50), color=color.orange, title="50 EMA")
plot(ta.sma(close, 200), color=color.red, title="MA 200")

// Plot stop loss values for confirmation
plot(series=(strategy.position_size > 0) and show_plots ? stop_condition_long : na, color=color.green, style=plot.style_linebr, title="Long Stop")
plot(series=(strategy.position_size < 0) and show_plots ? stop_condition_short : na, color=color.green, style=plot.style_linebr, title="Short Stop")
plot(series=(strategy.position_size < 0) and show_plots ? current_target_price : na, color=color.yellow, style=plot.style_linebr, title="Short TP")
plot(series=(strategy.position_size > 0) and show_plots ? current_target_price : na, color=color.yellow, style=plot.style_linebr, title="Long TP")

```

> Detail

https://www.fmz.com/strategy/474686

> Last Modified

2024-12-11 15:50:38
