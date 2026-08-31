
> Name

VWAP与超级趋势买卖策略-VWAP-and-Super-Trend-Buy-Sell-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13120e0aa416c2c1de9.png)

#### Overview
This strategy combines the VWAP (Volume Weighted Average Price) and Supertrend indicators. It determines buy and sell signals by comparing the price's position relative to the VWAP and the direction of the Supertrend indicator. A buy signal is generated when the price crosses above the VWAP and the Supertrend is positive, while a sell signal is generated when the price crosses below the VWAP and the Supertrend is negative. The strategy also avoids generating duplicate signals by recording the previous signal state until an opposite signal appears.

#### Strategy Principle
1. Calculate the VWAP indicator using the ta.vwap function, with customizable VWAP length.
2. Calculate the Supertrend indicator using the ta.supertrend function, with customizable ATR period and multiplier.
3. Determine buy condition: current price crosses above VWAP and Supertrend direction is positive.
4. Determine sell condition: current price crosses below VWAP and Supertrend direction is negative.
5. Record the previous signal state to avoid consecutive signals in the same direction. A new trading signal is generated only when the current signal differs from the previous one.

#### Strategy Advantages
1. Combines VWAP and Supertrend indicators for a more comprehensive assessment of market trends and potential turning points.
2. The VWAP indicator considers volume, better reflecting the market's true movement.
3. The Supertrend indicator has trend-following and oscillation-filtering characteristics, helping to capture major trends.
4. The mechanism to avoid duplicate signals reduces trading frequency and lowers transaction costs.

#### Strategy Risks
1. During periods of high market volatility or unclear trends, the strategy may generate more false signals.
2. The strategy's performance depends on the choice of VWAP and Supertrend parameters; different settings may lead to different results.
3. The strategy does not incorporate risk management and position sizing, which need to be combined with other measures to control risk in practical applications.

#### Strategy Optimization Directions
1. Introduce a trend confirmation mechanism, such as using moving averages or other trend indicators, to further filter signals.
2. Optimize parameter selection by backtesting historical data to find the best combination of VWAP length, ATR period, and multiplier.
3. Implement risk management measures, such as stop-loss and take-profit, to control individual trade risk.
4. Consider incorporating money management strategies, such as fixed fraction or Kelly Criterion, to optimize position sizing.

#### Summary
The VWAP and Supertrend Buy/Sell Strategy aims to comprehensively capture market trends and potential turning points by combining two different types of indicators. The strategy logic is clear and easy to implement and optimize. However, the strategy's performance depends on parameter selection and lacks risk management measures. In practical applications, further optimization and refinement are needed to adapt to different market conditions and trading requirements.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-28 00:00:00
end: 2024-06-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="VWAP and Super Trend Buy/Sell Strategy", shorttitle="VWAPST", overlay=true)


//===== VWAP =====
showVWAP = input.bool(title="Show VWAP", defval=true, group="VWAP")
VWAPSource = input.source(title="VWAP Source", defval=hl2, group="VWAP")
VWAPrice = ta.vwap(VWAPSource)
plot(showVWAP ? VWAPrice : na, color=color.teal, title="VWAP", linewidth=2)


//===== Super Trend =====
showST = input.bool(true, "Show SuperTrend Indicator", group="Super Trend")
Period = input.int(title="ATR Period", defval=10, group="Super Trend")
Multiplier = input.float(title="ATR Multiplier", defval=2.0, group="Super Trend")


// Super Trend ATR
Up = hl2 - (Multiplier * ta.atr(Period))
Dn = hl2 + (Multiplier * ta.atr(Period))
var float TUp = na
var float TDown = na
TUp := na(TUp[1]) ? Up : close[1] > TUp[1] ? math.max(Up, TUp[1]) : Up
TDown := na(TDown[1]) ? Dn : close[1] < TDown[1] ? math.min(Dn, TDown[1]) : Dn
var int Trend = na
Trend := na(Trend[1]) ? 1 : close > TDown[1] ? 1 : close < TUp[1] ? -1 : Trend[1]


Tsl = Trend == 1 ? TUp : TDown
linecolor = Trend == 1 ? color.green : color.red
plot(showST ? Tsl : na, color=linecolor, style=plot.style_line, linewidth=2, title="SuperTrend")


// Buy/Sell Conditions
var bool previousBuysignal = false
var bool previousSellsignal = false


buysignal = not previousBuysignal and Trend == 1 and close > VWAPrice
sellsignal = not previousSellsignal and Trend == -1 and close < VWAPrice


// Ensure the signals are not repetitive
if (buysignal)
    previousBuysignal := true
    previousSellsignal := false
else if (sellsignal)
    previousBuysignal := false
    previousSellsignal := true


// Execute buy and sell orders
if (buysignal)
    strategy.entry("Buy", strategy.long)
if (sellsignal)
    strategy.entry("Sell", strategy.short)


// Plot Buy/Sell Labels
//plotshape(buysignal, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY", textcolor=color.white, size=size.normal)
//plotshape(sellsignal, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL", textcolor=color.white, size=size.normal)

```

> Detail

https://www.fmz.com/strategy/453226

> Last Modified

2024-06-03 10:45:14
