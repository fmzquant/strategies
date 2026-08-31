
> Name

Market-Reversal-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/137dde99d7fe90fcb32.png)

## Overview

This strategy combines the Supertrend indicator and Fisher Transform to seek short opportunities when the market reverses. It can adjust the parameters of Supertrend and Fisher Transform for different cryptocurrencies, stocks and markets. When a sell signal appears, it shows the position size, stop loss and take profit levels. You can also change the risk amount.  

## Strategy Logic  

The strategy first calculates the Fisher Transform with a 10-period. When the Fisher line breaks through 2.5 from below, a sell signal is generated. At the same time, it calculates the 10-period Average True Range (ATR) as the channel for Supertrend. When the price crosses below the upper rail, a sell signal is generated. So the strategy combines Fisher Transform and Supertrend channel to catch short opportunities when the market reverses.   

Specifically, when the current close is below the previous upper rail and the previous close is above the lower rail of the Supertrend channel, it determines the market has reversed and generates a sell signal. At the same time, when Fisher line breaks through 2.5 from below, and the previous Fisher value is lower than the current one, it determines the trend has reversed and generates a sell signal.  

So the strategy requires both the reversal identification of Supertrend and Fisher Transform to generate the final sell signal.

## Advantages  

The strategy combines Supertrend channel and Fisher Transform, which can more accurately capture the market’s reversal points. Compared with using Supertrend or Fisher alone, it can reduce false signals and enhance the stability of the strategy.  

In addition, the strategy provides flexibility to adjust the parameters of Supertrend and Fisher. Users can select the best parameter combinations for different markets and products to fit the market purposefully. This is a customizable optimizable strategy.

The strategy also provides risk amount management. Users can conveniently adjust the risk capital for each order to meet their own risk management needs. At the same time, it automatically calculates the stop loss and profit taking levels to achieve good risk-reward ratio.

## Risks

The strategy mainly relies on the Supertrend channel to determine market structure. When the trend lasts for an extended period, the Supertrend may fail. In this case, the period or ATR multiplier of the channel should be appropriately increased.

In addition, Fisher Transform tends to generate false signals or premature signals easily. When the market fluctuation is high, the period of Fisher should be adjusted to filter out some noise.

Moreover, the overall win rate of reversal strategies may be limited. It should combine with trend following indicators to avoid opening positions in range-bound zones or participate after the trend becomes clearer. Moving averages can be added as filter to enhance the stability.   

## Enhancement Directions

The strategy can be enhanced from the following aspects:

1. Optimize the ATR period and ATR multiplier of Supertrend for the best parameter combination based on different products and market conditions.  

2. Optimize the period of Fisher to smooth the curve and prevent false signals.  

3. Add Moving Averages or Bollinger Bands as an auxiliary indicator to avoid opening positions in ranging markets.

4. Combine Fisher Transform on different timeframes to achieve more stable reversal judgment.  

5. Add position management modules such as leverage ratio, position sizing, add-on rules, etc. to control risks.

6. Incorporate machine learning methods to achieve automatic parameter optimization and strategy fitting.

## Conclusion  

The strategy integrates Supertrend and Fisher Transform with flexibility to adapt to different products by parameter adjustment, compared to single indicator strategies. It achieves more reliable signal judgment and risk control. With continuous enhancement, the strategy is promising to further improve stability and profitability. It is a high-quality strategy worth long-term tracking and accumulation.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Length|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|ATR Multiplier|
|v_input_float_2|10|Risk Amount ($)|
|v_input_3|true|Change ATR Calculation Method ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2024-02-27 03:00:00
period: 2m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend and Fisher_SHORT", overlay=true)

//This block is for  Fisher Transformation Calculation.
len = input.int(10, minval=1, title="Length") // Length is optional. 10 is good but is up to you.
high_ = ta.highest(hl2, len)
low_ = ta.lowest(hl2, len)
round_(val) => val > .99 ? .999 : val < -.99 ? -.999 : val
value = 0.0
value := round_(.66 * ((hl2 - low_) / (high_ - low_) - .5) + .67 * nz(value[1]))
fish1 = 0.0
fish1 := .5 * math.log((1 + value) / (1 - value)) + .5 * nz(fish1[1])
fish2 = fish1[1]

// Sell condition for Fisher transformation.
sell_signal = (fish1 > 2.5) and (fish2 > fish1)
durum = 0 //just for the situation.

if (sell_signal)
    durum := -1 // now it changes from 0 to -1.

// Supertrend indicator inputs and calculations (same as in the indicator)
Periods = input(title='ATR Period', defval=10) // period is 10, but you can change it
src = input(hl2, title='Source')
Multiplier = input.float(title='ATR Multiplier', step=0.1, defval=2) //atr multiplier is important. it is 2 for this strategy but you can find another for best performance 
RiskAmount = input.float(title='Risk Amount ($)', defval=10.0, minval=0.0, step=1.0) // ıf you use risk-reward method, risk is 10$ for each position. you can also change it
changeATR = input(title='Change ATR Calculation Method ?', defval=true)

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

// Calculate position size based on risk amount
riskPerContract = atr * Multiplier
contracts = RiskAmount / (riskPerContract * syminfo.mintick)

//short signal condition
sellSignal = trend == -1 and trend[1] == 1 and durum == -1

plotshape(sellSignal, title='Sell Signal', location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small) //shows the signal.

// variables
var float entryPrice = na
var float stopLoss = na
var float takeProfit = na
var float atr1 = na
var float takeProfit2 = na
var float takeProfit3 = na

//it calculates the stop level and reward profit levels using atr.
if (sellSignal)
    entryPrice := close
    atr1 := atr
    stopLoss := entryPrice + atr1 * Multiplier
    contracts := entryPrice / (stopLoss - entryPrice) * RiskAmount / entryPrice
    takeProfit := entryPrice - atr1 * Multiplier
    takeProfit2 := entryPrice - 2 * atr1 * Multiplier
    takeProfit3 := entryPrice - 3 * atr1 * Multiplier

if (sellSignal)
    strategy.entry("Sell", strategy.short, qty=1)

// 
if (close >= stopLoss)
    strategy.close("Sell", comment="Stop Loss Hit")
else if (close <= takeProfit)
    strategy.close("Sell", comment="Take Profit Hit")

// draw the stop, entry and profit levels
plot(stopLoss, title="Stop Loss", color=color.red, linewidth=1, style=plot.style_linebr)
plot(entryPrice, title="Entry Price", color=color.orange, linewidth=1, style=plot.style_linebr)
plot(takeProfit, title="Take Profit", color=color.green, linewidth=1, style=plot.style_linebr)
plot(takeProfit2, title="Take Profit 2", color=color.blue, linewidth=1, style=plot.style_linebr)
plot(takeProfit3, title="Take Profit 3", color=color.purple, linewidth=1, style=plot.style_linebr)

```

> Detail

https://www.fmz.com/strategy/443139

> Last Modified

2024-02-29 15:10:11
