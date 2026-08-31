
> Name

Multi-Timeframe-Exponential-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16290c907cc0ab6b1aa.png)


#### Overview

This Multi-Timeframe Exponential Moving Average Crossover Strategy is an automated trading system based on EMA crossover signals. It utilizes EMAs from different timeframes to generate trading signals and incorporates stop-loss and take-profit mechanisms for risk management. The strategy primarily relies on crossovers between fast and slow EMAs, as well as a higher timeframe EMA, to identify potential trading opportunities.

#### Strategy Principles

The core principle of this strategy is to use Exponential Moving Averages (EMAs) from multiple timeframes to identify market trends and generate trading signals. Specifically:

1. It uses a 9-period EMA as the fast line, a 50-period EMA as the slow line, and a 100-period EMA on a 15-minute timeframe as the higher timeframe reference.

2. Buy signal conditions:
   - Fast EMA crosses above the slow EMA, and the fast EMA is above the higher timeframe EMA; or
   - Fast EMA crosses above the higher timeframe EMA.

3. Sell signal conditions:
   - Fast EMA crosses below the slow EMA, and the fast EMA is below the higher timeframe EMA; or
   - Fast EMA crosses below the higher timeframe EMA.

4. Trade management:
   - Sets fixed stop-loss (SL) and take-profit (TP) levels.
   - When price reaches the first take-profit level (TP1), it closes 25% of the position and moves the stop-loss to breakeven.
   - The remaining position continues to run until the second take-profit level (TP2) or stop-loss is hit.

5. Trading time control:
   - Allows setting specific trading hours and trading days.

#### Strategy Advantages

1. Multi-timeframe analysis: Combining EMAs from different timeframes helps reduce false signals and improve trade quality.

2. Trend following: Effectively captures market trends through EMA crossovers and relative positions.

3. Risk management: Employs fixed stop-loss and stepped take-profit strategy, limiting potential losses while allowing profits to run.

4. Flexibility: EMA parameters, stop-loss, and take-profit levels can be adjusted for different markets and trading styles.

5. Automation: The strategy can be fully automated using the TradingView platform and PineConnector.

6. Time management: Ability to set specific trading hours and days to avoid trading in unfavorable market conditions.

#### Strategy Risks

1. Lag: EMAs are inherently lagging indicators and may not react quickly enough in volatile markets.

2. False signals: In ranging markets, EMA crossovers may produce frequent false signals, leading to overtrading.

3. Fixed stop-loss: Using fixed-point stop-losses may not be suitable for all market conditions, sometimes being too large or too small.

4. Dependency on historical data: The strategy's effectiveness is highly dependent on market behavior during the backtesting period, which may differ in the future.

5. Market adaptability: While the strategy performs well on some currency pairs, it may not be as effective on others.

#### Strategy Optimization Directions

1. Dynamic parameter adjustment: Consider dynamically adjusting EMA periods, stop-loss, and take-profit levels based on market volatility.

2. Additional filtering conditions: Introduce extra technical or sentiment indicators to filter trade signals and reduce false positives.

3. Improved stop-loss strategy: Implement trailing stops or ATR-based dynamic stop-losses to better adapt to market volatility.

4. Optimize trading times: Conduct more detailed time analysis to find the best trading hours and dates.

5. Enhanced position sizing: Adjust position sizes based on market volatility and account risk.

6. Multi-currency correlation analysis: Consider correlations between multiple currency pairs to avoid overexposure to similar market risks.

7. Machine learning integration: Utilize machine learning algorithms to optimize parameter selection and signal generation processes.

#### Conclusion

The Multi-Timeframe Exponential Moving Average Crossover Strategy is an automated trading system that combines trend following with risk management. By leveraging EMA crossover signals from different timeframes, the strategy aims to capture market trends and execute trades at appropriate times. While the strategy performs well under certain market conditions, it still has inherent risks and limitations. To further enhance the strategy's robustness and adaptability, considerations can be made to introduce dynamic parameter adjustments, additional filtering conditions, and more sophisticated risk management techniques. Overall, this strategy provides a solid starting point for quantitative traders, which can be further optimized and customized according to individual needs and market characteristics.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-07-30 00:00:00
end: 2024-07-29 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Miles Multi TF EMA Strategy v 1", overlay=true)

Fast = input.int(9, "Fast EMA")
Xslow = input.int(50, "Slow EMA")

var bool inTrade = false // Ensure inTrade is declared and initialized
var int tradeDirection = 0
var float buy_slPrice = na
var float buy_tp1Price = na
var float buy_tp2Price = na
var float sell_slPrice = na
var float sell_tp1Price = na
var float sell_tp2Price = na
var bool tp1Hit = false
var bool buytp1Hit = false
var bool selltp1Hit = false
var float entryPrice = na
var float lastSignalBar = na
fastEMA = ta.ema(close, Fast)
XslowEMA = ta.ema(close, Xslow)
var int step = 0

// Example SL and TP settings (adjust according to your strategy)
slPips = input.int(150, "Stop Loss")
tp1Pips = input.int(75, "Take Profit 1")
tp2Pips = input.int(150, "Take Profit 2")
beoff = input.int(25, "Breakeven Offset")

// Define the higher time frame
higherTimeFrame = input.timeframe("15", "Higher Timeframe EMA")

// Fetch the EMA from the higher time frame
higherTimeFrameEMA = request.security(syminfo.tickerid, higherTimeFrame, ta.ema(close, 100))

// Input for trading start and end times, allowing end time to extend beyond midnight
startHour = input.int(1, "Start Hour", minval=0, maxval=23)
endHour = input.int(25, "End Hour", minval=0, maxval=47) // Extend maxval to 47 to allow specifying times into the next day

// Adjust endHour to be within 24-hour format using modulo operation
adjustedEndHour = endHour % 24

// Function to determine if the current time is within the trading hours
isTradingTime(currentHour) =>
    if startHour < adjustedEndHour
        currentHour >= startHour and currentHour < adjustedEndHour
    else
        currentHour >= startHour or currentHour < adjustedEndHour

// Get the current hour in the exchange's timezone
currentHour = hour(time, "Australia/Sydney")

// Check if the current time is within the trading hours
trading = isTradingTime(currentHour)

// Plot background color if within trading hours
bgcolor(trading ? color.new(color.blue, 90) : na)

// Inputs for trading days
tradeOnMonday = input.bool(true, "Trade on Monday")
tradeOnTuesday = input.bool(true, "Trade on Tuesday")
tradeOnWednesday = input.bool(true, "Trade on Wednesday")
tradeOnThursday = input.bool(true, "Trade on Thursday")
tradeOnFriday = input.bool(true, "Trade on Friday")

// Current time checks
currentDayOfWeek = dayofweek(time, "Australia/Sydney")

// Check if current time is within trading hours
isTradingHour = (currentHour >= startHour and currentHour < endHour)

// Check if trading is enabled for the current day of the week
isTradingDay = (currentDayOfWeek == dayofweek.monday and tradeOnMonday) or 
               (currentDayOfWeek == dayofweek.tuesday and tradeOnTuesday) or 
               (currentDayOfWeek == dayofweek.wednesday and tradeOnWednesday) or 
               (currentDayOfWeek == dayofweek.thursday and tradeOnThursday) or 
               (currentDayOfWeek == dayofweek.friday and tradeOnFriday)

// Combined check for trading time and day
isTradingTime = isTradingHour and isTradingDay

buySignal = false
sellSignal = false

// Conditions
if (step == 0 or step == 4) and ta.crossover(fastEMA, XslowEMA) and fastEMA > higherTimeFrameEMA
    step := 1

if (step == 0 or step == 4) and ta.crossover(fastEMA, higherTimeFrameEMA)
    step := 1

if step == 3 and ta.crossover(fastEMA, XslowEMA) and fastEMA > higherTimeFrameEMA
    step := 3

if step == 2 and ta.crossover(fastEMA, XslowEMA) and fastEMA > higherTimeFrameEMA
    step := 1

if (step == 0 or step == 3) and ta.crossunder(fastEMA, XslowEMA) and fastEMA < higherTimeFrameEMA
    step := 2

if (step == 0 or step == 3) and ta.crossunder(fastEMA, higherTimeFrameEMA)
    step := 2

if step == 4 and ta.crossunder(fastEMA, XslowEMA) and fastEMA < higherTimeFrameEMA
    step := 4

if step == 1 and ta.crossunder(fastEMA, XslowEMA) and fastEMA < higherTimeFrameEMA
    step := 2

// For buy signals
if step == 1 and isTradingTime and fastEMA > ta.ema(close, Xslow) and fastEMA > higherTimeFrameEMA
    buySignal := true
    inTrade := true
    entryPrice := close
    tradeDirection := 1
    buytp1Hit := false
    lastSignalBar := bar_index
    buy_slPrice := entryPrice - slPips * syminfo.mintick
    buy_tp1Price := entryPrice + tp1Pips * syminfo.mintick // Set TP1
    buy_tp2Price := entryPrice + tp2Pips * syminfo.mintick // Set TP2
    tp1Hit := false
    step := 3
    strategy.entry("Buy", strategy.long, stop=buy_slPrice, limit=buy_tp1Price)

if step == 2 and isTradingTime and fastEMA < ta.ema(close, Xslow) and fastEMA < higherTimeFrameEMA
    sellSignal := true
    inTrade := true
    entryPrice := close
    tradeDirection := -1
    lastSignalBar := bar_index
    selltp1Hit := false
    sell_slPrice := entryPrice + slPips * syminfo.mintick
    sell_tp1Price := entryPrice - tp1Pips * syminfo.mintick // Set TP1
    sell_tp2Price := entryPrice - tp2Pips * syminfo.mintick // Set TP2
    tp1Hit := false
    step := 4
    strategy.entry("Sell", strategy.short, stop=sell_slPrice, limit=sell_tp1Price)

// Move SL to breakeven once TP1 is hit and close 25% of the trade
if (ta.valuewhen(strategy.position_size != 0, strategy.position_size, 0) > 0)
    if high >= buy_tp1Price and not tp1Hit
        tp1Hit := true
        buy_slPrice := entryPrice + beoff * syminfo.mintick
        strategy.close("Buy", qty_percent = 25, comment = "TP1 Hit")
        strategy.exit("Close", from_entry="Buy", stop=buy_slPrice, limit=buy_tp2Price)
        
if (ta.valuewhen(strategy.position_size != 0, strategy.position_size, 0) < 0)
    if low <= sell_tp1Price and not tp1Hit
        tp1Hit := true
        sell_slPrice := entryPrice - beoff * syminfo.mintick
        strategy.close("Sell", qty_percent = 25, comment = "TP1 Hit")
        strategy.exit("Close", from_entry="Sell", stop=sell_slPrice, limit=sell_tp2Price)

// Managing the trade after it's initiated
if inTrade and tradeDirection == 1 and sellSignal
    inTrade := false
    tradeDirection := 0
    buy_slPrice := na
    buy_tp1Price := na
    buy_tp2Price := na
    tp1Hit := false
    step := 2

if inTrade and tradeDirection == -1 and buySignal
    inTrade := false
    tradeDirection := 0
    sell_slPrice := na
    sell_slPrice := na
    sell_tp2Price := na
    tp1Hit := false
    step := 1

if inTrade and tradeDirection == 1 and step == 1
    step := 0

if inTrade and tradeDirection == -1 and step == 2
    step := 0

if inTrade and tradeDirection == 1 and (bar_index - lastSignalBar) >= 1
    if high >= buy_tp1Price and not tp1Hit
        tp1Hit := true
        buytp1Hit := true
        lastSignalBar := bar_index
        buy_slPrice := entryPrice + beoff * syminfo.mintick
        step := 3

    if low <= buy_slPrice and not tp1Hit and (bar_index - lastSignalBar) >= 1
        strategy.close("Buy", qty_percent = 100, comment = "SL Hit")
        inTrade := false
        tradeDirection := 0
        buy_slPrice := na
        buy_tp1Price := na
        buy_tp2Price := na
        tp1Hit := false
        buytp1Hit := false
        step := 0

if inTrade and tradeDirection == 1 and tp1Hit and (bar_index - lastSignalBar) >= 1
    if low <= buy_slPrice
        inTrade := false
        tradeDirection := 0
        buy_slPrice := na
        buy_tp1Price := na
        buy_tp2Price := na
        tp1Hit := false
        buytp1Hit := false
        step := 0

    if high >= buy_tp2Price and (bar_index - lastSignalBar) >= 1
        inTrade := false
        tradeDirection := 0
        buy_slPrice := na
        buy_tp1Price := na
        buy_tp2Price := na
        tp1Hit := false
        buytp1Hit := false
        step := 0

if inTrade and tradeDirection == -1 and (bar_index - lastSignalBar) >= 1
    if low <= sell_tp1Price and not tp1Hit
        tp1Hit := true
        lastSignalBar := bar_index
        selltp1Hit := true
        sell_slPrice := entryPrice - beoff * syminfo.mintick
        step := 4

    if high >= sell_slPrice and not tp1Hit and (bar_index - lastSignalBar) >= 1
        strategy.close("Sell", qty_percent = 100, comment = "SL Hit")
        inTrade := false
        tradeDirection := 0
        sell_slPrice := na
        sell_tp1Price := na
        sell_tp2Price := na
        tp1Hit := false
        selltp1Hit := false
        step := 0

if inTrade and tradeDirection == -1 and tp1Hit  and (bar_index - lastSignalBar) >= 1
    if high >= sell_slPrice
        inTrade := false
        tradeDirection := 0
        sell_slPrice := na
        sell_tp1Price := na
        sell_tp2Price := na
        tp1Hit := false
        selltp1Hit := false
        step := 0
    if low <= sell_tp2Price
        inTrade := false
        tradeDirection := 0
        sell_slPrice := na
        sell_tp1Price := na
        sell_tp2Price := na
        tp1Hit := false
        selltp1Hit := false
        step := 0
```

> Detail

https://www.fmz.com/strategy/458141

> Last Modified

2024-07-30 12:02:23
