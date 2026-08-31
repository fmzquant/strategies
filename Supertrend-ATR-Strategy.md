
> Name

Supertrend-ATR-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5808212311efbfc128.png)

#### Overview
This is a strategy based on the Supertrend indicator and ATR indicator. The main idea of this strategy is to use the Supertrend indicator to determine the current market trend direction and make trades when the Supertrend indicator changes. At the same time, this strategy uses the ATR indicator to calculate stop loss and take profit prices, and calculates the position size based on a certain percentage of the account balance to control risk.

#### Strategy Principle
The principles of this strategy are as follows:
1. Calculate the value of the Supertrend indicator, and generate buy or sell signals when the Supertrend indicator changes.
2. Use the ATR indicator to calculate the stop loss and take profit prices. The stop loss price is the current price plus or minus the ATR value multiplied by a multiple, and the take profit price is the stop loss price multiplied by a risk-reward ratio.
3. Calculate the position size based on a certain percentage of the account balance and the stop loss price to control the risk of each trade.
4. When a buy signal is generated, open a long position, with the stop loss price being the price at which the signal is generated minus the ATR value multiplied by a multiple, and the take profit price being the price at which the signal is generated plus the ATR value multiplied by a multiple and then multiplied by the risk-reward ratio.
5. When a sell signal is generated, open a short position, with the stop loss price being the price at which the signal is generated plus the ATR value multiplied by a multiple, and the take profit price being the price at which the signal is generated minus the ATR value multiplied by a multiple and then multiplied by the risk-reward ratio.

#### Strategy Advantages
The advantages of this strategy are as follows:
1. It combines trend-following and volatility indicators to effectively capture trends while controlling risk.
2. The position size is automatically calculated based on the account balance and risk level, without the need for manual adjustment, making it easy to implement.
3. The parameters can be flexibly adjusted to suit different markets and products.

#### Strategy Risks
The risks of this strategy are as follows:
1. In a volatile market, frequent buy and sell signals may lead to high transaction costs and slippage.
2. Fixed stop loss and take profit ratios may not be able to adapt to market changes, resulting in premature stop loss or small profits.
3. The calculation of position size depends on historical volatility, which may lead to large drawdowns when volatility suddenly increases.

To address the above risks, the following measures can be taken:
1. Add more signal filtering conditions to reduce trading frequency.
2. Optimize the calculation method of stop loss and take profit, such as using trailing stop loss or dynamic take profit.
3. Introduce risk control factors in position calculation, such as reducing positions when volatility breaks out.

#### Strategy Optimization Direction
This strategy can be optimized in the following areas:
1. Introduce more technical indicators, such as MACD, RSI, etc., as auxiliary conditions for trend judgment and signal filtering to improve signal accuracy.
2. Optimize the parameters of the Supertrend indicator and ATR indicator for different markets and products to find the best parameter combination.
3. Introduce more risk control factors in position calculation, such as maximum account drawdown, maximum risk per trade, etc., to improve the robustness of the strategy.
4. Add take profit strategies, such as partial take profit, trailing take profit, etc., to allow profits to continue to grow.

The above optimizations can improve the profitability and stability of the strategy while reducing its risk, making it more adaptable to different market environments.

#### Summary
This strategy combines the Supertrend indicator and ATR indicator to effectively capture trends while controlling risk. By calculating the optimal position size, the risk of each trade is controllable. However, this strategy may generate high transaction costs and drawdowns in a volatile market. By introducing more technical indicators, optimizing parameters, adding risk control factors, and improving take profit strategies, the performance of this strategy can be further improved. Overall, this strategy is a simple and effective trend-following strategy suitable for use in trending markets.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_1|3|ATR Multiplier|
|v_input_3|true|Change ATR Calculation Method ?|
|v_input_4|true|Show Buy/Sell Signals ?|
|v_input_5|true|Highlighter On/Off ?|
|v_input_float_2|1.5|ATR multiplier|
|v_input_float_3|true|Risk:Reward|
|v_input_float_4|true|Risk Per Trade %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tradez99

//@version=5
strategy('Supertrend', overlay=true, format=format.price, precision=2)

Periods = input(title='ATR Period', defval=10)
src = input(hl2, title='Source')
Multiplier = input.float(title='ATR Multiplier', step=0.1, defval=3.0)
changeATR = input(title='Change ATR Calculation Method ?', defval=true)
showsignals = input(title='Show Buy/Sell Signals ?', defval=true)
highlighting = input(title='Highlighter On/Off ?', defval=true)
atr2 = ta.sma(ta.tr, Periods)
atr = changeATR ? ta.atr(Periods) : atr2
up = src - Multiplier * atr
up1 = nz(up[1], up)
up := close[1] > up1 ? math.max(up, up1) : up
dn = src + Multiplier * atr
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? math.min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
upPlot = plot(trend == 1 ? up : na, title='Up Trend', style=plot.style_linebr, linewidth=2, color=color.new(color.green, 0))
buySignal = trend == 1 and trend[1] == -1
plotshape(buySignal ? up : na, title='UpTrend Begins', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.green, 0))
plotshape(buySignal and showsignals ? up : na, title='Buy', text='Buy', location=location.absolute, style=shape.labelup, size=size.tiny, color=color.new(color.green, 0), textcolor=color.new(color.white, 0))
dnPlot = plot(trend == 1 ? na : dn, title='Down Trend', style=plot.style_linebr, linewidth=2, color=color.new(color.red, 0))
sellSignal = trend == -1 and trend[1] == 1
plotshape(sellSignal ? dn : na, title='DownTrend Begins', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.red, 0))
plotshape(sellSignal and showsignals ? dn : na, title='Sell', text='Sell', location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.new(color.red, 0), textcolor=color.new(color.white, 0))
mPlot = plot(ohlc4, title='', style=plot.style_circles, linewidth=0)
longFillColor = highlighting ? trend == 1 ? color.green : color.white : color.white
shortFillColor = highlighting ? trend == -1 ? color.red : color.white : color.white
//fill(mPlot, upPlot, title='UpTrend Highligter', color=longFillColor)
//fill(mPlot, dnPlot, title='DownTrend Highligter', color=shortFillColor)

multiplier = input.float(title="ATR multiplier", defval = 1.5)
rr           = input.float(title="Risk:Reward", defval=1.0)
riskPerTrade = input.float(title="Risk Per Trade %", defval=1.0)
atr3 = ta.atr(14)

//calculate stops and targets 
longstop = close - (atr3 * multiplier)
shortstop = close + (atr3 * multiplier)
longStopDistance  = close - longstop
shortStopDistance = shortstop - close
longTarget  = close + (longStopDistance * rr)
shortTarget = close - (shortStopDistance * rr)

// Save stops & targets
var t_stop = 0.0
var t_target = 0.0

longCondition = buySignal 
if (longCondition)
    t_stop := longstop
    t_target := longTarget
    positionSize = math.floor((strategy.equity * (riskPerTrade/100)) / (close - t_stop))
    strategy.entry("Long", strategy.long, qty = positionSize)

shortCondition = sellSignal 
if (shortCondition)
    t_stop := shortstop
    t_target := shortTarget
    positionSize = math.floor((strategy.equity * (riskPerTrade/100)) / (t_stop - close))  
    strategy.entry("Short", strategy.short, qty = positionSize)

strategy.exit(id="Long Exit", from_entry="Long", limit=t_target, stop=t_stop)
strategy.exit(id="Short Exit", from_entry="Short", limit=t_target, stop=t_stop)

```

> Detail

https://www.fmz.com/strategy/446525

> Last Modified

2024-03-29 11:29:15
