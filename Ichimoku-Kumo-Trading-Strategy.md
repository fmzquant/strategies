
> Name

Ichimoku-Kumo-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c8e3b01361409d556.png)


#### Overview
This strategy uses the Ichimoku Kumo indicator to determine market trends and trading signals. The strategy goes long when the price is below the Kumo cloud and goes short when the price is above the Kumo cloud. The strategy uses the ATR indicator for stop-loss and confirms entry signals with breakouts of the Kijun-sen and Senkou Span lines. The strategy aims to capture trading opportunities in strong trends while controlling risk.

#### Strategy Principle
1. Use the Kijun-sen, Tenkan-sen, and Senkou Span lines from the Ichimoku indicator to determine market trends.
2. Generate a long signal when the closing price is below the Senkou Span line and the Kijun-sen line is above the Kumo cloud.
3. Generate a short signal when the closing price is above the Senkou Span line and the Kijun-sen line is below the Kumo cloud.
4. Calculate the stop-loss position using the ATR indicator, which is the highest/lowest point of the last 5 candles minus/plus 3 times the ATR.
5. Close the position when the price breaches the stop-loss level.

#### Strategy Advantages
1. The strategy is based on the Ichimoku indicator, which provides a comprehensive analysis of market trends.
2. The strategy considers the relationship between price, Kijun-sen line, and Senkou Span line, improving the reliability of entry signals.
3. Using ATR for stop-loss allows for dynamic adjustment of the stop-loss position, better controlling risk.
4. The stop-loss setting takes into account market volatility, adapting to different market conditions.

#### Strategy Risks
1. The strategy may generate numerous false signals in choppy markets, leading to frequent trades and capital losses.
2. The strategy's performance depends on the selection of Ichimoku indicator parameters, and different parameters may produce different trading results.
3. In volatile markets, prices may quickly breach the stop-loss position, causing significant slippage and losses.

#### Strategy Optimization Directions
1. Introduce other technical indicators or price-volume analysis to assist in determining trends and entry timing, improving signal accuracy.
2. Optimize the stop-loss setting, such as considering trailing stops or moving stop-losses, to better protect account safety.
3. Incorporate position sizing into the strategy, adjusting the size of each trade based on market volatility and account risk.
4. Perform parameter optimization on the strategy to find the most suitable parameter combination for the current market conditions.

#### Summary
This strategy utilizes multiple components of the Ichimoku indicator to comprehensively analyze market trends. At the same time, the strategy uses ATR stop-loss to control risk, enhancing the strategy's robustness. However, the strategy may underperform in ranging markets and relies on parameter selection. In the future, the strategy's performance can be further improved by introducing other analysis methods, optimizing stop-loss and position sizing, and other means.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © muratatilay

//@version=5
strategy(
     "Kumo Trade Concept", 
     overlay=true,
     initial_capital=10000,
     currency=currency.USDT,
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=30,
     commission_type=strategy.commission.percent,
     commission_value=0.1,
     margin_long=10, 
     margin_short=10)


// ICHIMOKU Lines 
//  INPUTS
tenkanSenPeriods = input.int(9, minval=1, title="Tenkan-sen")
kijunSenPeriods = input.int(26, minval=1, title="Kijun-sen")
senkouBPeriod = input.int(52, minval=1, title="Senkou span B")
displacement = input.int(26, minval=1, title="Chikou span")

donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
tenkanSen = donchian(tenkanSenPeriods)
kijunSen = donchian(kijunSenPeriods)
senkouA = math.avg(tenkanSen, kijunSen)
senkouB = donchian(senkouBPeriod)

// Other Indicators
float   atrValue    = ta.atr(5)

// Calculate Senkou Span A 25 bars back
senkouA_current = math.avg(tenkanSen[25], kijunSen[25])
// Calculate Senkou Span B 25 bars back
senkouB_current = math.avg(ta.highest(senkouBPeriod)[25], ta.lowest(senkouBPeriod)[25])

// Kumo top bottom 
senkou_max = (senkouA_current >= senkouB_current) ? senkouA_current : senkouB_current
senkou_min = (senkouB_current >= senkouA_current) ? senkouA_current : senkouB_current

// Trade Setups
long_setup = (kijunSen > senkou_max) and (close < senkou_min) 
short_setup = (kijunSen < senkou_min ) and ( close > senkou_max ) 

// Check long_setup for the last 10 bars
long_setup_last_10 = false
for i = 0 to 50
    if long_setup[i]
        long_setup_last_10 := true
short_setup_last_10 = false
for i = 0 to 50
    if short_setup[i]
        short_setup_last_10 := true


closeSenkouCross = (close > senkou_max) and barstate.isconfirmed 
closeKijunCross = (close > kijunSen ) 

senkouCloseCross = close < senkou_min
kijunCloseCross = close < kijunSen


// Handle Trades
// Enter Trade
var float trailStopLong = na
var float trailStopShort = na
if ( closeSenkouCross and long_setup_last_10 and closeKijunCross ) 
    strategy.entry(id="Buy", direction = strategy.long)
    trailStopLong := na
if senkouCloseCross and short_setup_last_10 and kijunCloseCross
    strategy.entry(id="Sell", direction = strategy.short)
    trailStopShort := na


// Update trailing stop
float temp_trailStop_long = ta.highest(high, 5) - (atrValue * 3)
float temp_trailStop_short = ta.lowest(low, 5) + (atrValue * 3)
if strategy.position_size > 0
    if temp_trailStop_long > trailStopLong or na(trailStopLong)
        trailStopLong := temp_trailStop_long
if strategy.position_size < 0
    if temp_trailStop_short < trailStopShort or na(trailStopShort)
        trailStopShort := temp_trailStop_short

// Handle strategy exit
if close < trailStopLong and barstate.isconfirmed
    strategy.close("Buy", comment="Stop Long")
if close > trailStopShort and barstate.isconfirmed
    strategy.close("Sell", comment="Stop Short")


// PRINT ON CHART
plot(kijunSen, color=color.rgb(214, 58, 30), title="Kijun-sen", linewidth=2)
p1 = plot(senkouA, offset=displacement - 1, color=#A5D6A7, title="Senkou span A")
p2 = plot(senkouB, offset=displacement - 1, color=#EF9A9A, title="Senkou Span B")
fill(p1, p2, color=senkouA > senkouB ? color.rgb(67, 160, 71, 90) : color.rgb(244, 67, 54, 90))
// PRINT SETUPS
plotshape(long_setup , style=shape.circle, color=color.green, location=location.belowbar, size=size.small)
plotshape(short_setup, style=shape.circle, color=color.red, location=location.abovebar, size=size.small)

// Trail Stop
plot(strategy.position_size[1] > 0 ? trailStopLong : na, style=plot.style_linebr, color=color.purple, title="Stop Loss")
plot(strategy.position_size[1] < 0 ? trailStopShort : na, style=plot.style_linebr, color=color.purple, title="Stop Loss")

```

> Detail

https://www.fmz.com/strategy/452829

> Last Modified

2024-05-29 17:23:36
