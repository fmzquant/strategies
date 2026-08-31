
> Name

移动平均与相对强弱指标策略Moving-Average-Relative-Strength-Index-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/136b69f496fff16d058.png)



## Overview  

The Moving Average Relative Strength Index Strategy is a quantitative trading strategy that utilizes both moving average lines and the Relative Strength Index (RSI) as trading signals to capture opportunities in market trends. This strategy generates trading signals by comparing the price moving average line with the value of the RSI index to catch reversal opportunities in the market.

## Strategy Logic  

This strategy is mainly based on two indicators:

1. Simple Moving Average (SMA): reflects the average trend of prices.  
2. Relative Strength Index (RSI): reflects the strength or weakness of price performance.  

The core logic of the strategy is:

When the RSI indicator line is lower than the moving average line, it is in the oversold region and indicates the stock is underestimated, generating a buy signal. When the RSI line is higher than the moving average line, it is in the overbought region and signals the stock is overvalued, thus producing a sell signal.  

In other words, the moving average line reflects the fair value of the stock to some extent, while the RSI indicator represents the current strength or weakness of the price. When the RSI diverges from the moving average line, it implies a reversal opportunity.

Specifically, this strategy generates trading signals through the following steps:  

1. Calculate the RSI value and simple moving average of the stock price.  
2. Compare the relationship between the RSI value and the moving average line.
3. A sell signal is generated when the RSI line crosses above the moving average line.  
4. A buy signal is triggered when the RSI line crosses below the moving average line.
5. Set stop loss and trailing stop to control risks.

## Advantages of the Strategy   

By combining the trend judgment of moving averages and the overbought/oversold indication of RSI, this strategy can effectively determine inflection points in the market by leveraging the strengths of different indicators.

The main advantages are:

1. Moving averages can effectively indicate price trends. 
2. RSI can reflect overbought/oversold conditions.  
3. The combination of dual indicators improves the accuracy of identifying market turning points.
4. Stop loss can be used to control risks.

## Risks of the Strategy

There are also some risks with this strategy:

1. There is a probability of false signals from the indicators, which may cause unnecessary losses.  
2. Stop loss may be triggered during violent market swings, leading to large losses.
3. Improper parameter settings can also affect strategy performance.

To manage risks, optimizations can be made in the following ways:  

1. Adjust parameters of moving average and RSI to make indicator signals more reliable.  
2. Set stop loss appropriately wider to avoid too frequent triggering. 
3. Adopt dynamic trailing stop loss to make stop loss more flexible.

## Directions for Strategy Optimization

Further optimization directions include:

1. Test different parameter combinations across timeframes to find optimal parameters.  
2. Add other indicators like volume for filter to improve signal reliability. 
3. Optimize stop loss strategies to make stop loss more dynamic and reasonable.  
4. Incorporate deep learning models for adaptive parameter optimization.
5. Add position sizing module to dynamically adjust positions based on market conditions.

Through parameter optimization, indicator optimization, risk management optimization etc, the stability and profitability of this strategy can be continuously improved.  

## Conclusion

The Moving Average RSI Strategy utilizes both price trend and overbought/oversold analysis to effectively identify market turning points and capture reversal opportunities. This simple, practical strategy has controllable risks and is useful for quantitative trading. Further optimization can lead to even better results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|RSI Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|8|RSI Length|
|v_input_3|34|MA Period|
|v_input_4|false|Invert Trade Direction?|
|v_input_5|false|Use Initial Stop Loss?|
|v_input_6|25|Initial Stop Loss Points|
|v_input_7|true|Use Trailing Stop?|
|v_input_8|120|Trail Points|
|v_input_9|false|Use Offset For Trailing Stop?|
|v_input_10|20|Trail Offset Points|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-24 06:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy(title = "RSI versus SMA", shorttitle = "RSI vs SMA", overlay = false, pyramiding = 0, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, currency = currency.GBP)

// Revision:        1
// Author:          @JayRogers
//
// *** USE AT YOUR OWN RISK ***
// - Nothing is perfect, and all decisions by you are on your own head. And stuff.
//
// Description:
//  - It's RSI versus a Simple Moving Average.. Not sure it really needs much more description.
//  - Should not repaint - Automatically offsets by 1 bar if anything other than "open" selected as RSI source.

// === INPUTS ===
// rsi
rsiSource   = input(defval = open, title = "RSI Source")
rsiLength   = input(defval = 8, title = "RSI Length", minval = 1)
// sma
maLength    = input(defval = 34, title = "MA Period", minval = 1)
// invert trade direction
tradeInvert = input(defval = false, title = "Invert Trade Direction?")
// risk management
useStop     = input(defval = false, title = "Use Initial Stop Loss?")
slPoints    = input(defval = 25, title = "Initial Stop Loss Points", minval = 1)
useTS       = input(defval = true, title = "Use Trailing Stop?")
tslPoints   = input(defval = 120, title = "Trail Points", minval = 1)
useTSO      = input(defval = false, title = "Use Offset For Trailing Stop?")
tslOffset   = input(defval = 20, title = "Trail Offset Points", minval = 1)
// === /INPUTS ===

// === BASE FUNCTIONS ===
// delay for direction change actions
switchDelay(exp, len) =>
    average = len >= 2 ? sum(exp, len) / len : exp[1]
    up      = exp > average
    down    = exp < average
    state   = up ? true : down ? false : up[1]
// === /BASE FUNCTIONS ===

// === SERIES and VAR ===
// rsi
shunt = rsiSource == open ? 0 : 1
rsiUp = rma(max(change(rsiSource[shunt]), 0), rsiLength)
rsiDown = rma(-min(change(rsiSource[shunt]), 0), rsiLength)
rsi = (rsiDown == 0 ? 100 : rsiUp == 0 ? 0 : 100 - (100 / (1 + rsiUp / rsiDown))) - 50 // shifted 50 points to make 0 median
// sma of rsi
rsiMa   = sma(rsi, maLength)
// self explanatory..
tradeDirection = tradeInvert ? 0 <= rsiMa ? true : false : 0 >= rsiMa ? true : false
// === /SERIES ===

// === PLOTTING ===
barcolor(color = tradeDirection ? green : red, title = "Bar Colours")
// hlines
medianLine  = hline(0, title = 'Median', color = #996600,  linewidth = 1)
limitUp     = hline(25, title = 'Limit Up', color = silver,  linewidth = 1)
limitDown   = hline(-25, title = 'Limit Down', color = silver,  linewidth = 1)
// rsi and ma
rsiLine     = plot(rsi, title = 'RSI', color = purple, linewidth = 2, style = line, transp = 50)
areaLine    = plot(rsiMa, title = 'Area MA', color = silver, linewidth = 1, style = area, transp = 70)
// === /PLOTTING ===

goLong() => not tradeDirection[1] and tradeDirection
killLong() => tradeDirection[1] and not tradeDirection
strategy.entry(id = "Buy", long = true, when = goLong())
strategy.close(id = "Buy", when = killLong())

goShort() => tradeDirection[1] and not tradeDirection
killShort() => not tradeDirection[1] and tradeDirection
strategy.entry(id = "Sell", long = false, when = goShort())
strategy.close(id = "Sell", when = killShort())

if (useStop)
    strategy.exit("XSL", from_entry = "Buy", loss = slPoints)
    strategy.exit("XSS", from_entry = "Sell", loss = slPoints)
// if we're using the trailing stop
if (useTS and useTSO) // with offset
    strategy.exit("XSL", from_entry = "Buy", trail_points = tslPoints, trail_offset = tslOffset)
    strategy.exit("XSS", from_entry = "Sell", trail_points = tslPoints, trail_offset = tslOffset)
if (useTS and not useTSO) // without offset
    strategy.exit("XSL", from_entry = "Buy", trail_points = tslPoints)
    strategy.exit("XSS", from_entry = "Sell", trail_points = tslPoints)
```

> Detail

https://www.fmz.com/strategy/433547

> Last Modified

2023-11-28 14:07:46
