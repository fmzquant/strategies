
> Name

Dynamic-Support-Resistance-Bollinger-Bands-Multi-Indicator-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10280d58ad2fad7a65a.png)

[trans]
#### 概述
本策略是一个结合了动态支撑阻力、布林带和EMA21均线的多指标交叉交易策略。策略通过识别关键价格水平的突破,结合技术指标的交叉信号来进行交易决策。该策略不仅能够动态识别市场结构中的重要支撑阻力位,还能通过布林带和均线的配合来确认交易信号的可靠性。

#### 策略原理
策略主要基于以下几个核心组件:
1. 动态支撑阻力计算:使用枢轴点方法动态计算市场的支撑阻力水平,通过设定通道宽度和最小强度要求来筛选有效价格区域。
2. 布林带指标:采用20周期、2倍标准差的布林带来界定价格波动区间。
3. EMA21均线:作为中期趋势判断的参考线。
4. 交易信号生成:当价格突破支撑阻力位的同时触发布林带信号时进行交易。

#### 策略优势
1. 多维度确认:通过结合多个技术指标,提高交易信号的可靠性。
2. 动态适应:支撑阻力位会随市场结构变化而自动调整。
3. 风险管理:布林带提供了清晰的超买超卖区域界定。
4. 趋势确认:EMA21均线帮助确认中期趋势方向。
5. 可视化效果:策略提供了清晰的视觉反馈,便于分析和优化。

#### 策略风险
1. 震荡市场风险:在横盘震荡市场可能产生过多假突破信号。
2. 滞后性风险:技术指标的计算都具有一定滞后性,可能错过最佳入场时机。
3. 参数敏感性:策略效果对参数设置较为敏感,需要针对不同市场环境进行优化。
4. 假突破风险:支撑阻力位的突破可能是假突破,需要其他指标配合确认。

#### 策略优化方向
1. 引入成交量指标:在突破确认时加入成交量分析,提高信号可靠性。
2. 优化参数自适应:开发自适应参数调整机制,使策略更好地适应不同市场环境。
3. 增加止损机制:设计更完善的止损策略,控制回撤风险。
4. 加入趋势过滤:增加趋势强度判断,避免在弱趋势环境下交易。
5. 时间框架优化:研究不同时间框架组合的效果,找到最优配置。

#### 总结
该策略通过结合动态支撑阻力、布林带和EMA21均线,构建了一个相对完整的交易系统。策略的优势在于多维度信号确认和动态适应市场变化,但同时也面临参数优化和假突破风险。通过持续优化和完善风险控制机制,策略有望在实际交易中取得更好的表现。 ||

#### Overview
This strategy combines dynamic support/resistance levels with Bollinger Bands and EMA21 for a multi-indicator crossing trading approach. It identifies breakouts of key price levels while using technical indicator crossovers to make trading decisions. The strategy not only dynamically identifies important support/resistance levels in market structure but also confirms trading signals through the coordination of Bollinger Bands and moving averages.

#### Strategy Principles
The strategy is based on several core components:
1. Dynamic Support/Resistance Calculation: Uses pivot point method to dynamically calculate market support/resistance levels, filtering effective price zones through channel width and minimum strength requirements.
2. Bollinger Bands: Employs 20-period, 2 standard deviation Bollinger Bands to define price volatility ranges.
3. EMA21: Serves as a reference line for medium-term trend judgment.
4. Trade Signal Generation: Executes trades when price breaks through support/resistance levels while triggering Bollinger Band signals simultaneously.

#### Strategy Advantages
1. Multi-dimensional Confirmation: Improves trading signal reliability by combining multiple technical indicators.
2. Dynamic Adaptation: Support/resistance levels automatically adjust with market structure changes.
3. Risk Management: Bollinger Bands provide clear overbought/oversold boundary definitions.
4. Trend Confirmation: EMA21 helps confirm medium-term trend direction.
5. Visualization: Strategy provides clear visual feedback for analysis and optimization.

#### Strategy Risks
1. Choppy Market Risk: May generate excessive false breakout signals in sideways markets.
2. Lag Risk: Technical indicators have inherent calculation delays, potentially missing optimal entry points.
3. Parameter Sensitivity: Strategy performance is sensitive to parameter settings, requiring optimization for different market environments.
4. False Breakout Risk: Support/resistance breakouts may be false, requiring confirmation from other indicators.

#### Optimization Directions
1. Incorporate Volume Indicators: Add volume analysis for breakout confirmation to improve signal reliability.
2. Optimize Parameter Adaptation: Develop adaptive parameter adjustment mechanisms for better market environment adaptation.
3. Enhance Stop-Loss Mechanisms: Design more comprehensive stop-loss strategies to control drawdown risk.
4. Add Trend Filters: Increase trend strength assessment to avoid trading in weak trend environments.
5. Timeframe Optimization: Study different timeframe combinations to find optimal configurations.

#### Summary
This strategy builds a relatively complete trading system by combining dynamic support/resistance, Bollinger Bands, and EMA21. Its strengths lie in multi-dimensional signal confirmation and dynamic market adaptation, while facing challenges in parameter optimization and false breakout risks. Through continuous optimization and improvement of risk control mechanisms, the strategy shows promise for better performance in actual trading.[/trans]



> Source (PineScript)

``` pinescript
//@version=5
strategy("Support Resistance & Bollinger & EMA21", overlay=true)

// Parámetros de S/R
prd = input.int(defval=10, title='Pivot Period', minval=4, maxval=30, group='Setup')
ppsrc = input.string(defval='High/Low', title='Source', options=['High/Low', 'Close/Open'], group='Setup')
maxnumpp = input.int(defval=20, title='Maximum Number of Pivot', minval=5, maxval=100, group='Setup')
ChannelW = input.int(defval=10, title='Maximum Channel Width %', minval=1, group='Setup')
maxnumsr = input.int(defval=5, title='Maximum Number of S/R', minval=1, maxval=10, group='Setup')
min_strength = input.int(defval=2, title='Minimum Strength', minval=1, maxval=10, group='Setup')
labelloc = input.int(defval=20, title='Label Location', group='Colors', tooltip='Positive numbers reference future bars, negative numbers reference historical bars')
linestyle = input.string(defval='Solid', title='Line Style', options=['Solid', 'Dotted', 'Dashed'], group='Colors')
linewidth = input.int(defval=2, title='Line Width', minval=2, maxval=2, group='Colors')
resistancecolor = input.color(defval=color.black, title='Resistance Color', group='Colors')
supportcolor = input.color(defval=color.black, title='Support Color', group='Colors')
showpp = input(false, title='Show Point Points')

// Parámetros de Bandas de Bollinger y EMA21
periodo_bollinger = input.int(title="Periodo de Bollinger", defval=20)
multiplicador_bollinger = input.float(title="Multiplicador de Bollinger", defval=2.0)
periodo_ema21 = input.int(title="Periodo EMA21", defval=21)

// Cálculo de las Bandas de Bollinger y EMA21
[middle, superior, inferior] = ta.bb(close, periodo_bollinger, multiplicador_bollinger)
ema21 = ta.ema(close, periodo_ema21)

// Ploteo de las Bandas de Bollinger y EMA21
plot(middle, color=color.rgb(60, 60, 60), linewidth=2, title="Media Móvil de Bollinger")
plot(superior, color=color.rgb(184, 11, 8), linewidth=2, title="Banda Superior")
plot(inferior, color=color.rgb(6, 124, 4), linewidth=2, title="Banda Inferior")
plot(ema21, color=color.rgb(6, 150, 240), linewidth=1, style=plot.style_circles, title="EMA21")

// Condiciones para señales de compra y venta
senal_compra = close <= inferior
senal_venta = close >= superior

// Mostrar señales en el gráfico
plotshape(senal_compra, title="Compra", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(senal_venta, title="Venta", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Código de soporte y resistencia
float src1 = ppsrc == 'High/Low' ? high : math.max(close, open)
float src2 = ppsrc == 'High/Low' ? low : math.min(close, open)
float ph = ta.pivothigh(src1, prd, prd)
float pl = ta.pivotlow(src2, prd, prd)

plotshape(ph and showpp, text='H', style=shape.labeldown, color=na, textcolor=color.new(color.red, 0), location=location.abovebar, offset=-prd)
plotshape(pl and showpp, text='L', style=shape.labelup, color=na, textcolor=color.new(color.lime, 0), location=location.belowbar, offset=-prd)

// Calcular ancho máximo del canal S/R
prdhighest = ta.highest(300)
prdlowest = ta.lowest(300)
cwidth = (prdhighest - prdlowest) * ChannelW / 100

var pivotvals = array.new_float(0)

if ph or pl
    array.unshift(pivotvals, ph ? ph : pl)
    if array.size(pivotvals) > maxnumpp  // Limitar el tamaño del array
        array.pop(pivotvals)

get_sr_vals(ind) =>
    float lo = array.get(pivotvals, ind)
    float hi = lo
    int numpp = 0
    for y = 0 to array.size(pivotvals) - 1 by 1
        float cpp = array.get(pivotvals, y)
        float wdth = cpp <= lo ? hi - cpp : cpp - lo
        if wdth <= cwidth  // Ajusta al ancho máximo del canal?
            if cpp <= hi
                lo := math.min(lo, cpp)
            else
                hi := math.max(hi, cpp)
            numpp += 1
    [hi, lo, numpp]

var sr_up_level = array.new_float(0)
var sr_dn_level = array.new_float(0)
sr_strength = array.new_float(0)

find_loc(strength) =>
    ret = array.size(sr_strength)
    for i = ret > 0 ? array.size(sr_strength) - 1 : na to 0 by 1
        if strength <= array.get(sr_strength, i)
            break
        ret := i
    ret

check_sr(hi, lo, strength) =>
    ret = true
    for i = 0 to array.size(sr_up_level) > 0 ? array.size(sr_up_level) - 1 : na by 1
        if array.get(sr_up_level, i) >= lo and array.get(sr_up_level, i) <= hi or array.get(sr_dn_level, i) >= lo and array.get(sr_dn_level, i) <= hi
            if strength >= array.get(sr_strength, i)
                array.remove(sr_strength, i)
                array.remove(sr_up_level, i)
                array.remove(sr_dn_level, i)
                ret
            else
                ret := false
            break
    ret

// var sr_lines = array.new_line(11, na)
// var sr_labels = array.new_label(11, na)

// for x = 1 to 10 by 1
//     rate = 100 * (label.get_y(array.get(sr_labels, x)) - close) / close
//     label.set_text(array.get(sr_labels, x), text=str.tostring(label.get_y(array.get(sr_labels, x))) + '(' + str.tostring(rate, '#.##') + '%)')
//     label.set_x(array.get(sr_labels, x), x=bar_index + labelloc)
//     label.set_color(array.get(sr_labels, x), color=label.get_y(array.get(sr_labels, x)) >= close ? color.red : color.lime)
//     label.set_textcolor(array.get(sr_labels, x), textcolor=label.get_y(array.get(sr_labels, x)) >= close ? color.white : color.black)
//     label.set_style(array.get(sr_labels, x), style=label.get_y(array.get(sr_labels, x)) >= close ? label.style_label_down : label.style_label_up)
//     line.set_color(array.get(sr_lines, x), color=line.get_y1(array.get(sr_lines, x)) >= close ? resistancecolor : supportcolor)

if ph or pl
    // Debido a los nuevos cálculos, eliminar niveles S/R antiguos
    array.clear(sr_up_level)
    array.clear(sr_dn_level)
    array.clear(sr_strength)
    // Encontrar zonas S/R
    for x = 0 to array.size(pivotvals) - 1 by 1
        [hi, lo, strength] = get_sr_vals(x)
        if check_sr(hi, lo, strength)
            loc = find_loc(strength)
            // Si la fuerza está en los primeros maxnumsr sr, entonces insértala en los arrays
            if loc < maxnumsr and strength >= min_strength
                array.insert(sr_strength, loc, strength)
                array.insert(sr_up_level, loc, hi)
                array.insert(sr_dn_level, loc, lo)
                // Mantener el tamaño de los arrays = 5
                if array.size(sr_strength) > maxnumsr
                    array.pop(sr_strength)
                    array.pop(sr_up_level)
                    array.pop(sr_dn_level)

    // for x = 1 to 10 by 1
    //     line.delete(array.get(sr_lines, x))
    //     label.delete(array.get(sr_labels, x))

    for x = 0 to array.size(sr_up_level) > 0 ? array.size(sr_up_level) - 1 : na by 1
        float mid = math.round_to_mintick((array.get(sr_up_level, x) + array.get(sr_dn_level, x)) / 2)
        rate = 100 * (mid - close) / close
        // array.set(sr_labels, x + 1, label.new(x=bar_index + labelloc, y=mid, text=str.tostring(mid) + '(' + str.tostring(rate, '#.##') + '%)', color=mid >= close ? color.red : color.lime, textcolor=mid >= close ? color.white : color.black, style=mid >= close ? label.style_label_down : label.style_label_up))
        // array.set(sr_lines, x + 1, line.new(x1=bar_index, y1=mid, x2=bar_index - 1, y2=mid, extend=extend.both, color=mid >= close ? resistancecolor : supportcolor, style=line.style_solid, width=2))

f_crossed_over() =>
    ret = false
    for x = 0 to array.size(sr_up_level) > 0 ? array.size(sr_up_level) - 1 : na by 1
        float mid = math.round_to_mintick((array.get(sr_up_level, x) + array.get(sr_dn_level, x)) / 2)
        if close[1] <= mid and close > mid
            ret := true
    ret

f_crossed_under() =>
    ret = false
    for x = 0 to array.size(sr_up_level) > 0 ? array.size(sr_up_level) - 1 : na by 1
        float mid = math.round_to_mintick((array.get(sr_up_level, x) + array.get(sr_dn_level, x)) / 2)
        if close[1] >= mid and close < mid
            ret := true
    ret

crossed_over = f_crossed_over()
crossed_under = f_crossed_under()
alertcondition(crossed_over, title='Resistance Broken', message='Resistance Broken')
alertcondition(crossed_under, title='Support Broken', message='Support Broken')
alertcondition(crossed_over or crossed_under, title='Support or Resistance Broken', message='Support or Resistance Broken')

// Estrategia de compra y venta basada en el cruce de niveles S/R
if (crossed_over and senal_compra)
    strategy.entry("Compra", strategy.long)

if (crossed_under and senal_venta)
    strategy.close("Compra")
```

> Detail

https://www.fmz.com/strategy/478687

> Last Modified

2025-01-17 14:24:33
