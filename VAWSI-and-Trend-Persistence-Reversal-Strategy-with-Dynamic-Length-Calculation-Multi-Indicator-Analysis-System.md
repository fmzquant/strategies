
> Name

VAWSI-and-Trend-Persistence-Reversal-Strategy-with-Dynamic-Length-Calculation-Multi-Indicator-Analysis-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14bc2f0af974998ae61.png)


#### Overview

This strategy is a comprehensive analysis system combining multiple indicators, primarily based on VAWSI (Volume and ATR Weighted Strength Index), Trend Persistence Indicator, and a modified ATR to assess market trends and potential reversal points. The strategy also incorporates dynamic length calculation to adapt to different market conditions. It manages risk by setting dynamic stop-loss and take-profit levels and executes trades when potential reversal signals are identified.

The core of this strategy lies in its use of multiple custom indicators to measure the strength, duration, and volatility of market trends, thereby identifying optimal trading opportunities. It is particularly suited for markets with clear trends but also includes adaptive mechanisms to handle various market states.

#### Strategy Principles

1. VAWSI Indicator: An original indicator similar to RSI but using VAWMA (Volume and ATR Weighted Moving Average) instead of RMA. It measures the strength of emerging trends.

2. Trend Persistence Indicator: Another original indicator that measures how long a trend has persisted. It calculates the maximum deviation of the source from the highest/lowest over a specified length, then creates a cumulative measure and strength index from this deviation.

3. Modified ATR: Takes the maximum of high-low and |source - previous source|, then takes the absolute value of its change and normalizes it with the source.

4. Dynamic Length Calculation: Utilizes BlackCat1402's dynamic length calculation method to adjust indicator length parameters based on market conditions.

5. Composite Analysis: Combines readings from VAWSI, Trend Persistence, and ATR to generate a composite indicator. Lower final values indicate imminent reversal, while higher values suggest unstable or choppy markets.

6. Dynamic Stop-Loss/Take-Profit: Calculates dynamic stop-loss and take-profit levels based on the composite indicator and current trend direction.

7. Trade Signals: Confirms crossovers and generates trade signals when price fully crosses the calculated threshold line.

#### Strategy Advantages

1. Multi-dimensional Analysis: By combining multiple indicators, the strategy can analyze the market from different angles, improving decision accuracy.

2. Adaptability: Dynamic length calculation allows the strategy to adapt to different market conditions, enhancing its flexibility.

3. Risk Management: Dynamic stop-loss and take-profit settings help better control risk and adapt to market changes.

4. Original Indicators: VAWSI and Trend Persistence indicators provide unique market insights that might capture signals overlooked by traditional indicators.

5. Anti-Repainting: Use of barstate.isconfirmed ensures signals don't repaint, improving backtesting accuracy.

6. Customizability: Multiple adjustable parameters allow the strategy to be adapted for different trading instruments and timeframes.

#### Strategy Risks

1. Over-optimization: The large number of parameters may lead to over-optimization, potentially performing poorly in live trading.

2. Market Adaptability: While performing well in certain markets, it may not be suitable for all market conditions, especially in low-volatility markets.

3. Complexity: The strategy's complexity may make it difficult to understand and maintain, increasing the risk of operational errors.

4. Computation Intensive: Multiple custom indicators and dynamic calculations may result in high computational load, affecting execution speed.

5. Reliance on Historical Data: The strategy uses a large amount of historical data for calculations, which may lead to lag in some situations.

#### Optimization Directions

1. Parameter Optimization: Use machine learning algorithms to optimize various weight and length parameters to improve strategy performance under different market conditions.

2. Market State Recognition: Add a market state recognition module to automatically adjust strategy parameters in different market environments.

3. Signal Filtering: Introduce additional filtering mechanisms, such as trend strength thresholds, to reduce false signals.

4. Volume Analysis: Deepen volume analysis, possibly introducing volume pattern recognition to enhance signal reliability.

5. Multi-timeframe Analysis: Integrate signals from multiple timeframes to improve the robustness of trading decisions.

6. Risk Management Optimization: Implement more sophisticated risk management strategies, such as dynamic position sizing and multi-level stop-losses.

7. Computational Efficiency: Optimize code to improve calculation efficiency, especially when processing large amounts of historical data.

#### Conclusion

The VAWSI and Trend Persistence Reversal Strategy is a complex and comprehensive trading system that combines multiple innovative indicators and dynamic parameter adjustments. Its strengths lie in multi-dimensional market analysis and adaptability, allowing it to seek potential reversal opportunities under various market conditions. However, the strategy's complexity also brings challenges in terms of over-optimization and adaptability.

Through further optimization, especially in parameter adjustment, market state recognition, and risk management, this strategy has the potential to become a powerful trading tool. However, users should note that no strategy is perfect, and continuous monitoring and adjustment are necessary. In practical application, it is recommended to conduct thorough testing on demo accounts and to combine this strategy with other analytical tools and market knowledge to make trading decisions.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-21 00:00:00
end: 2024-06-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("VAWSI and Trend Persistance Reversal", overlay=true, max_bars_back = 4999, process_orders_on_close = true)


//INPUTS
sltp = input.float(title = "Minimum SL/TP", defval = 5.0)
rsi_weight = input.float(title = "Wawsi weight", defval = 100.0)
half_weight= input.float(title = "Trend Persistence Weight", defval = 79.0)
atr_weight = input.float(title = "ATR Weight", defval = 20.0)
com_mult = input.float(title = "Combination Mult", defval = 1, step = .001)
smoothing = input.int(title = "Trend Persistence smooth length", defval = 3)
CycPart = input.float(1.1, step = .001, title = "Length Cycle Decimal")
src = close
hclose = request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, src)

//BlackCat1402's Dynamic Length Calculation
EhlersHoDyDC(Price, CycPart) =>
    // Vars: 
    Smooth = 0.00
    Detrender = 0.00
    I1 = 0.00
    Q1 = 0.00
    jI = 0.00
    jQ = 0.00
    I2 = 0.00
    Q2 = 0.00
    Re = 0.00
    Im = 0.00
    Period = 0.00
    SmoothPeriod = 0.00
    pi = 2 * math.asin(1)
    DomCycle = 0.0

    //Hilbert Transform
    Smooth := bar_index > 5 ? (4 * Price + 3 * nz(Price[1]) + 2 * nz(Price[2]) + nz(Price[3])) / 10 : Smooth
    Detrender := bar_index > 5 ? (.0962 * Smooth + .5769 * nz(Smooth[2]) - .5769 * nz(Smooth[4]) - .0962 * nz(Smooth[6])) * (.075 * nz(Period[1]) + .54) : Detrender
    //Compute InPhase and Quadrature components
    Q1 := bar_index > 5 ? (.0962 * Detrender + .5769 * nz(Detrender[2]) - .5769 * nz(Detrender[4]) - .0962 * nz(Detrender[6])) * (.075 * nz(Period[1]) + .54) : Q1
    I1 := bar_index > 5 ? nz(Detrender[3]) : I1

    //Advance the phase of I1 and Q1 by 90 degrees
    jI := (.0962 * I1 + .5769 * nz(I1[2]) - .5769 * nz(I1[4]) - .0962 * nz(I1[6])) * (.075 * nz(Period[1]) + .54)
    jQ := (.0962 * Q1 + .5769 * nz(Q1[2]) - .5769 * nz(Q1[4]) - .0962 * nz(Q1[6])) * (.075 * nz(Period[1]) + .54)

    //Phasor addition for 3 bar averaging
    I2 := I1 - jQ
    Q2 := Q1 + jI

    //Smooth the I and Q components before applying the discriminator
    I2 := .2 * I2 + .8 * nz(I2[1])
    Q2 := .2 * Q2 + .8 * nz(Q2[1])

    //Homodyne Discriminator
    Re := I2 * nz(I2[1]) + Q2 * nz(Q2[1])
    Im := I2 * nz(Q2[1]) - Q2 * nz(I2[1])
    Re := .2 * Re + .8 * nz(Re[1])
    Im := .2 * Im + .8 * nz(Im[1])

    Period := Im != 0 and Re != 0 ? 2 * pi / math.atan(Im / Re) : Period
    Period := Period > 1.5 * nz(Period[1]) ? 1.5 * nz(Period[1]) : Period
    Period := Period < .67 * nz(Period[1]) ? .67 * nz(Period[1]) : Period
    //Limit Period to be within the bounds of 6 bar and 50 bar cycles
    Period := Period < 6 ? 6 : Period
    Period := Period > 50 ? 50 : Period
    Period := .2 * Period + .8 * nz(Period[1])
    SmoothPeriod := .33 * Period + .67 * nz(SmoothPeriod[1])
    //it can add filter to Period here
    DomCycle := math.ceil(CycPart * SmoothPeriod) > 34 ? 34 : math.ceil(CycPart * SmoothPeriod) < 1 ? 1 : math.ceil(CycPart * SmoothPeriod)
    DomCycle

wma(src, length) =>
    wma = 0.0
    sum = 0.0
    norm = length * (length + 1) / 2
    for i = 0 to length - 1
        sum := sum + src[i] * (length - i)
    wma := sum / norm


length = math.round(math.ceil(EhlersHoDyDC(hclose,CycPart)))

// Traditional Function initialization
highest_custom(src, length) =>
    x = src
    for i = 0 to math.min(length, 4999)
        if src[i] > x
            x := src[i]
    x
lowest_custom(src, length) => 
    x = src
    for i = 0 to math.min(length, 4999)
        if src[i] < x
            x := src[i]
    x

rma(src, len) =>
    sum = 0.0
    for i = 0 to len - 1
        math.min(1, len)
        sum += src[i]
    rma = sum / len
    rma := nz(rma[1]) * (len - 1) / len + src / len
    
sma(src, length) =>
    math.sum(src, length) / length

hln(src, length) =>
    TR = math.max(math.abs(src - src[1]), high - low)
    TR := src / math.abs(ta.change(rma(TR, length)))
    TR := (1 / TR) * 100

vawma(src, length) =>
    atr = ta.atr(1)
    aavg = sma(atr, length)
    vavg = sma(volume, length)
    weighted_sum = 0.0
    sum_weights = 0.0
    weighted = 0.0
    for i = 0 to length
        weight = ((volume[i] / vavg + (atr[i]) / aavg) / 2)
        weighted_sum += src[i] * weight
        sum_weights += weight
    a = (weighted_sum / sum_weights)

vawsi(src, len) =>
    rmaUp = vawma(math.max(ta.change(src), 0), len)
    rmaDown = vawma(-math.min(ta.change(src), 0), len)
    rsi = 100 - (100 / (1 + rmaUp / rmaDown))

trendPersistence(src, length, smoothing) =>
    trendu = math.abs(src - highest_custom(src, length))
    trendd = math.abs(src - lowest_custom(src, length))
    trendu := wma(trendu, smoothing)
    trendd := wma(trendd, smoothing)
    trendu := ta.change(ta.cum(trendu))
    trendd := ta.change(ta.cum(trendd))
    trend = wma(math.max(trendu, trendd), smoothing)
    rmaUp = rma(math.max(ta.change(trend), 0), length)
    rmaDown = rma(-math.min(ta.change(trend), 0), length)
    rsi = 100 - (100 / (1 + rmaUp / rmaDown))

//Strategy Calculations
sl = ((100 - sltp) / 100) * close
tp = ((100 + sltp) / 100) * close

var bool crossup = na
var bool crossdown = na
var float dir = na
var float BearGuy = 0

BullGuy = ta.barssince(crossup or crossdown)
if na(BullGuy)
    BearGuy += 1
else
    BearGuy := math.min(BullGuy, 4999)


rsiw = rsi_weight / 100
cew = half_weight / 100
atrw = atr_weight / 100

atr = hln(hclose, length) * atrw
ce = 1 / trendPersistence(hclose, length, smoothing)
com = 1 / math.max(math.abs(vawsi(hclose, length) - 50) * 2, 20)

comfin = (((com * rsiw) + (ce * cew) - atr)) * com_mult

lower = highest_custom(math.min((math.max(highest_custom(src, BearGuy) * (1 - comfin), sl)), src[1]), BearGuy)
upper = lowest_custom(math.max((math.min(lowest_custom(src, BearGuy) * (1 + comfin), tp)), src[1]), BearGuy)

var float thresh = na

if na(thresh)
    thresh := lower
if na(dir)
    dir := 1
if crossdown
    dir := -1
if crossup
    dir := 1
if dir == 1
    thresh := lower
if dir == -1
    thresh := upper

crossup := ta.crossover(hclose, thresh) and barstate.isconfirmed
crossdown := ta.crossunder(hclose, thresh) and barstate.isconfirmed

//STRATEGY
if crossup
    strategy.entry("long", strategy.long)
if crossdown
    strategy.entry("Short", strategy.short)

//PLOTTING
col = hclose > thresh ? color.lime : color.red
plot(thresh, linewidth = 2, color = color.new(col[1], 0))


```

> Detail

https://www.fmz.com/strategy/454745

> Last Modified

2024-06-21 15:36:43
