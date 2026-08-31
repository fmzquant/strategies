
> Name

Hammer-and-Shooting-Star-Pattern-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This trading strategy utilizes candlestick patterns to predict future price movement. Hammers and shooting stars are simple yet powerful patterns used widely for catching trend reversals. This strategy identifies these two patterns to capitalize on turning points in the market.

## Strategy Logic

The strategy is based on the following core principles:

1. ATR indicator filters out non-trending markets by requiring the candle size to be within a set range of ATR values. 

2. The 33.3% Fibonacci retracement level marks the point that distinguishes a hammer (closes above) from a shooting star (closes below).

3. Extra confirmation requires the pattern to complete (closing price above/below open) on an unconfirmed bar.

4. Stop loss and take profit levels are set based on ATR and a risk/reward ratio upon entry.

By combining ATR, Fibonacci, and pattern recognition, the strategy adheres to common tenets of trend trading.

## Advantage Analysis 

The key advantages of this strategy are:

1. Simple logic makes it easy to understand and implement.

2. Trading off short-term intraday patterns allows flexible holding periods. 

3. ATR filters help control risk in volatile markets. Parameters can be optimized separately for each instrument.

4. Intelligent stop loss and take profit points based on a risk/reward ratio control risk effectively.

5. Automated trade signals streamline entry and position management.

6. Applicable cross-market to many currency pairs demonstrates robustness.

## Risk Analysis

There are also several risks to consider:

1. Pattern trading has a probability of false signals that should not be blindly trusted.

2. Trading costs like commissions are unaccounted for, eating into actual profits.

3. Increased trade frequency from short-term intraday trading may incur more slippage costs. 

4. Optimized ATR parameters rely on historical data and may not always remain applicable.

5. Auto-trading risks failed order execution and should implement a retry mechanism. 

6. Poor stop loss and take profit settings could lead to over-trading or leaving money on the table.

## Optimization Opportunities

Some ways to potentially improve the strategy:

1. Additional filters like volume to increase pattern effectiveness. 

2. Incorporate commissions into stop and target tuning.

3. Dynamically optimize ATR parameters to fit changing market conditions.

4. Evaluate performance of parameters individually for each currency pair.

5. Add auto-retry mechanisms to reduce failed order execution risk. 

6. Utilize machine learning models to better identify valid patterns. 

7. Introduce a trailing stop mechanism to lock in more profits.

## Conclusion

In summary, this trading strategy integrates commonly used technical indicators with simple logic for straightforward implementation. With robust parameter optimization and risk control, it has potential for consistent profitability. However, traders should remain vigilant of risks and keep trade frequency reasonable to avoid over-trading. The strategy serves as a basic framework for further innovation to reach new levels of trading performance.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|(?Strategy Settings)>= ATR Filter|
|v_input_2|3|<= ATR Filter|
|v_input_3|true|Stop Loss ATR|
|v_input_4|true|R:R|
|v_input_5|0.333|Fib Level|
|v_input_6|timestamp(01 Jan 2000 13:30 +0000)|Start Date Filter|
|v_input_7|timestamp(1 Jan 2099 19:30 +0000)|End Date Filter|
|v_input_8|false|(?AutoView Oanda Settings)Use Oanda Demo?|
|v_input_9|true|Use Limit Order?|
|v_input_10|2|Days To Leave Limit Order|
|v_input_11|1000|Account Balance|
|v_input_12|0|Account Currency: USD|CAD|CHF|EUR|GBP|JPY|NZD|AUD|
|v_input_13|2|Risk Per Trade %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ZenAndTheArtOfTrading / PineScriptMastery
// Last Updated: 28th April, 2021
// @version=4
strategy("Hammers & Stars Strategy [v1.0]", shorttitle="HSS[v1.0]", overlay=true)

// Get user input
atrMinFilterSize = input(title=">= ATR Filter", type=input.float, defval=0.0, minval=0.0, tooltip="Minimum size of entry candle compared to ATR", group="Strategy Settings")
atrMaxFilterSize = input(title="<= ATR Filter", type=input.float, defval=3.0, minval=0.0, tooltip="Maximum size of entry candle compared to ATR", group="Strategy Settings")
stopMultiplier   = input(title="Stop Loss ATR", type=input.float, defval=1.0, tooltip="Stop loss multiplier (x ATR)", group="Strategy Settings")
rr               = input(title="R:R", type=input.float, defval=1.0, tooltip="Risk:Reward profile", group="Strategy Settings")
fibLevel         = input(title="Fib Level", type=input.float, defval=0.333, tooltip="Used to calculate upper/lower third of candle. (For example, setting it to 0.5 will mean hammers must close >= 50% mark of the total candle size)", group="Strategy Settings")
i_startTime      = input(title="Start Date Filter", defval=timestamp("01 Jan 2000 13:30 +0000"), type=input.time, tooltip="Date & time to begin trading from", group="Strategy Settings")
i_endTime        = input(title="End Date Filter", defval=timestamp("1 Jan 2099 19:30 +0000"), type=input.time, tooltip="Date & time to stop trading", group="Strategy Settings")
oandaDemo        = input(title="Use Oanda Demo?", type=input.bool, defval=false, tooltip="If turned on then oandapractice broker prefix will be used for AutoView alerts (demo account). If turned off then live account will be used", group="AutoView Oanda Settings")
limitOrder       = input(title="Use Limit Order?", type=input.bool, defval=true, tooltip="If turned on then AutoView will use limit orders. If turned off then market orders will be used", group="AutoView Oanda Settings")
gtdOrder         = input(title="Days To Leave Limit Order", type=input.integer, minval=0, defval=2, tooltip="This is your GTD setting (good til day)", group="AutoView Oanda Settings")
accountBalance   = input(title="Account Balance", type=input.float, defval=1000.0, step=100, tooltip="Your account balance (used for calculating position size)", group="AutoView Oanda Settings")
accountCurrency  = input(title="Account Currency", type=input.string, defval="USD", options=["AUD", "CAD", "CHF", "EUR", "GBP", "JPY", "NZD", "USD"], tooltip="Your account balance currency (used for calculating position size)", group="AutoView Oanda Settings")
riskPerTrade     = input(title="Risk Per Trade %", type=input.float, defval=2.0, step=0.5, tooltip="Your risk per trade as a % of your account balance", group="AutoView Oanda Settings")

// Set up AutoView broker prefix
var broker = oandaDemo ? "oandapractice" : "oanda"

// See if this bar's time happened within date filter
dateFilter = true

// Get ATR
atr = atr(14)

// Check ATR filter
atrMinFilter = abs(high - low) >= (atrMinFilterSize * atr) or atrMinFilterSize == 0.0
atrMaxFilter = abs(high - low) <= (atrMaxFilterSize * atr) or atrMaxFilterSize == 0.0
atrFilter = atrMinFilter and atrMaxFilter

// Calculate 33.3% fibonacci level for current candle
bullFib = (low - high) * fibLevel + high
bearFib = (high - low) * fibLevel + low

// Determine which price source closes or opens highest/lowest
lowestBody = close < open ? close : open
highestBody = close > open ? close : open

// Determine if we have a valid setup
validHammer = lowestBody >= bullFib and atrFilter and close != open and not na(atr)
validStar = highestBody <= bearFib and atrFilter and close != open and not na(atr)

// Check if we have confirmation for our setup
validLong = validHammer and strategy.position_size == 0 and dateFilter and barstate.isconfirmed
validShort = validStar and strategy.position_size == 0 and dateFilter and barstate.isconfirmed

//------------- DETERMINE POSITION SIZE -------------//
// Get account inputs
var tradePositionSize = 0.0
var pair = syminfo.basecurrency + "/" + syminfo.currency

// Check if our account currency is the same as the base or quote currency (for risk $ conversion purposes)
accountSameAsCounterCurrency = accountCurrency == syminfo.currency
accountSameAsBaseCurrency = accountCurrency == syminfo.basecurrency

// Check if our account currency is neither the base or quote currency (for risk $ conversion purposes)
accountNeitherCurrency = not accountSameAsCounterCurrency and not accountSameAsBaseCurrency

// Get currency conversion rates if applicable
conversionCurrencyPair = accountSameAsCounterCurrency ? syminfo.tickerid : accountNeitherCurrency ? accountCurrency + syminfo.currency : accountCurrency + syminfo.currency
conversionCurrencyRate = security(symbol=syminfo.type == "forex" ? "BTC_USDT:swap" : "BTC_USDT:swap", resolution="D", expression=close)

// Calculate position size
getPositionSize(stopLossSizePoints) =>
    riskAmount = (accountBalance * (riskPerTrade / 100)) * (accountSameAsBaseCurrency or accountNeitherCurrency ? conversionCurrencyRate : 1.0)
    riskPerPoint = (stopLossSizePoints * syminfo.pointvalue)
    positionSize = (riskAmount / riskPerPoint) / syminfo.mintick
    round(positionSize)
    
// Custom function to convert pips into whole numbers
toWhole(number) =>
    return = atr(14) < 1.0 ? (number / syminfo.mintick) / (10 / syminfo.pointvalue) : number
    return := atr(14) >= 1.0 and atr(14) < 100.0 and syminfo.currency == "JPY" ? return * 100 : return
//------------- END POSITION SIZE CODE -------------//

// Calculate our stop distance & size for the current bar
stopSize = atr * stopMultiplier
longStopPrice = low < low[1] ? low - stopSize : low[1] - stopSize
longStopDistance = close - longStopPrice
longTargetPrice = close + (longStopDistance * rr)
shortStopPrice = high > high[1] ? high + stopSize : high[1] + stopSize
shortStopDistance = shortStopPrice - close
shortTargetPrice = close - (shortStopDistance * rr)

// Save trade stop & target & position size if a valid setup is detected
var tradeStopPrice = 0.0
var tradeTargetPrice = 0.0

// Set up our GTD (good-til-day) order info
gtdTime = time + (gtdOrder * 1440 * 60 * 1000) // 86,400,000ms per day
gtdYear = year(gtdTime)
gtdMonth = month(gtdTime)
gtdDay = dayofmonth(gtdTime)
gtdString = " dt=" + tostring(gtdYear) + "-" + tostring(gtdMonth) + "-" + tostring(gtdDay)

// Detect valid long setups & trigger alert
if validLong
    tradeStopPrice := longStopPrice
    tradeTargetPrice := longTargetPrice
    tradePositionSize := getPositionSize(toWhole(longStopDistance) * 10)
    // Trigger AutoView long alert
    alert(message="e=" + broker + " b=long q="
     + tostring(tradePositionSize) 
     + " s=" + pair
     + " t=" + (limitOrder ? "limit fp=" + tostring(close) : "market")
     + " fsl=" + tostring(tradeStopPrice)
     + " ftp=" + tostring(tradeTargetPrice)
     + (gtdOrder != 0 and limitOrder ? gtdString : ""), 
     freq=alert.freq_once_per_bar_close)
   
// Detect valid short setups & trigger alert
if validShort
    tradeStopPrice := shortStopPrice
    tradeTargetPrice := shortTargetPrice
    tradePositionSize := getPositionSize(toWhole(shortStopDistance) * 10)
    // Trigger AutoView short alert
    alert(message="e=" + broker + " b=short q="
     + tostring(tradePositionSize)
     + " s=" + pair
     + " t=" + (limitOrder ? "limit fp=" + tostring(close) : "market")
     + " fsl=" + tostring(tradeStopPrice)
     + " ftp=" + tostring(tradeTargetPrice)
     + (gtdOrder != 0 and limitOrder ? gtdString : ""),
     freq=alert.freq_once_per_bar_close)

// Enter trades whenever a valid setup is detected
strategy.entry(id="Long", long=strategy.long, when=validLong)
strategy.entry(id="Short", long=strategy.short, when=validShort)

// Exit trades whenever our stop or target is hit
strategy.exit(id="Long Exit", from_entry="Long", limit=tradeTargetPrice, stop=tradeStopPrice, when=strategy.position_size > 0)
strategy.exit(id="Short Exit", from_entry="Short", limit=tradeTargetPrice, stop=tradeStopPrice, when=strategy.position_size < 0)

// Draw trade data
plot(strategy.position_size != 0 or validLong or validShort ? tradeStopPrice : na, title="Trade Stop Price", color=color.red, style=plot.style_linebr, transp=0)
plot(strategy.position_size != 0 or validLong or validShort ? tradeTargetPrice : na, title="Trade Target Price", color=color.green, style=plot.style_linebr, transp=0)
plot(strategy.position_size != 0 or validLong or validShort ? tradePositionSize : na, color=color.purple, transp=100, title="AutoView Position Size")

// Draw price action setup arrows
plotshape(validLong ? 1 : na, style=shape.triangleup, location=location.belowbar, color=color.green, title="Bullish Setup")
plotshape(validShort ? 1 : na, style=shape.triangledown, location=location.abovebar, color=color.red, title="Bearish Setup")
```

> Detail

https://www.fmz.com/strategy/428056

> Last Modified

2023-09-28 11:11:35
