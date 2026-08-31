
> Name

Fisher变换动态阈值趋势跟踪策略-Fisher-Transform-Dynamic-Threshold-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1366f18ebbe18554b9f.png)

#### Overview
The Fisher Transform Dynamic Threshold Trend Following Strategy utilizes the Fisher Transform indicator to identify changes in price trends. The strategy uses the Fisher Transform to normalize prices to a standard scale, making it easier to detect potential trend reversal points. By dynamically adjusting thresholds, the strategy adapts to different market conditions and improves the accuracy of trend recognition. When the Fisher Transform value crosses positive or negative thresholds, the strategy generates buy or sell signals to follow market trends.

#### Strategy Principle
1. Calculate Fisher Transform value: Based on historical high and low prices, normalize the current price to obtain a Fisher Transform value between -0.999 and 0.999.
2. Dynamic threshold: Dynamically adjust the threshold for buy and sell signals based on the historical volatility of the Fisher Transform value to adapt to different market states.
3. Trend determination: Determine changes in price trends by comparing the current Fisher Transform value with the values from the previous two periods.
4. Buy and sell signals: Generate a buy signal when the Fisher Transform value crosses the negative threshold from below, and generate a sell signal when the Fisher Transform value crosses the positive threshold from above.

#### Advantage Analysis
1. Dynamic threshold adjustment: Adaptively adjust buy and sell thresholds based on market volatility to improve the accuracy of trend judgment.
2. Trend tracking: The Fisher Transform indicator's trend judgment enables effective capture of market trends and trend-following trading.
3. Reduced price noise: The Fisher Transform normalizes prices, helping to reduce the impact of price noise on trend judgment.
4. Intuitive chart display: The strategy plots the Fisher Transform curve and threshold lines on the chart, allowing traders to visually observe market trends and buy/sell signals.

#### Risk Analysis
1. Parameter optimization risk: The strategy's performance depends on the selection of parameters such as the Fisher Transform period and the dynamic threshold calculation method. Different parameters may lead to different trading results.
2. Trend recognition lag: The Fisher Transform indicator has a certain lag in judging price trends, which may miss some trend movements.
3. Poor performance in choppy markets: In choppy market conditions, frequent trend changes may cause the strategy to generate more false signals, leading to suboptimal trading performance.
4. Extreme market risk: In extreme market conditions (such as rapid and substantial changes), the Fisher Transform indicator may fail, causing the strategy to make incorrect trading decisions.

#### Optimization Direction
1. Parameter optimization: Optimize key parameters such as the Fisher Transform period and dynamic threshold calculation method to improve the strategy's adaptability to different market states.
2. Signal filtering: In addition to trend recognition, introduce other technical indicators or market sentiment indicators to confirm trading signals and improve signal reliability.
3. Stop-loss and take-profit: Set reasonable stop-loss and take-profit rules to control single-trade risk and improve the strategy's risk-reward ratio.
4. Position management: Dynamically adjust position sizes based on factors such as market trend strength and price volatility to reduce holding risk.

#### Summary
The Fisher Transform Dynamic Threshold Trend Following Strategy identifies changes in price trends using the Fisher Transform indicator and dynamic thresholds, adapting to different market states. The strategy effectively captures market trends and enables trend-following trading. Its advantages include dynamic threshold adjustment, reduced price noise interference, and intuitive chart display. However, it also faces challenges such as parameter optimization risk, trend recognition lag, poor performance in choppy markets, and extreme market risk. Through measures like parameter optimization, signal filtering, stop-loss and take-profit, and position management, the strategy's robustness and profitability can be further enhanced.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Qiuboneminer -  Fisher Transform", overlay=true)

// Parámetros
Len = input.int(10, minval=1)
mult1 = input.int(1, minval=1)
threshold = 2.6

// Función Fisher Transform
fish(Length, timeMultiplier) =>
    var float nValue1 = na
    var float nFish = na
    xHL2 = hl2
    xMaxH = ta.highest(xHL2, Length * timeMultiplier)
    xMinL = ta.lowest(xHL2, Length * timeMultiplier)
    nValue1 := 0.33 * 2 * ((xHL2 - xMinL) / (xMaxH - xMinL) - 0.5) + 0.67 * nz(nValue1[1])
    nValue2 = if nValue1 > 0.99
        0.999
    else if nValue1 < -0.99
        -0.999
    else
        nValue1
    nFish := 0.5 * math.log((1 + nValue2) / (1 - nValue2)) + 0.5 * nz(nFish[1])
    nFish

// Cálculo del Fisher Transform para mult1
Fisher1 = fish(Len, mult1)

// Condiciones de entrada y salida
longCondition = Fisher1 > nz(Fisher1[1]) and nz(Fisher1[1]) <= nz(Fisher1[2]) and Fisher1 < -threshold
shortCondition = Fisher1 < nz(Fisher1[1]) and nz(Fisher1[1]) >= nz(Fisher1[2]) and Fisher1 > threshold

// Estrategia de entrada
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Ploteo del Fisher Transform
plot(Fisher1, color=(Fisher1 > nz(Fisher1[1]) ? color.rgb(34, 255, 0) : color.rgb(255, 0, 212)), title="Fisher TF:1")

// Ploteo de líneas de umbral
hline(threshold, "Umbral Superior", color=color.rgb(255, 0, 0), linestyle=hline.style_dotted)
hline(-threshold, "Umbral Inferior", color=#008704, linestyle=hline.style_dotted)

```

> Detail

https://www.fmz.com/strategy/454341

> Last Modified

2024-06-17 15:01:19
