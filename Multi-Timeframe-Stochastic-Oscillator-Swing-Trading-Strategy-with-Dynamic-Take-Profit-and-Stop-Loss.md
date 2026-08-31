
> Name

Multi-Timeframe-Stochastic-Oscillator-Swing-Trading-Strategy-with-Dynamic-Take-Profit-and-Stop-Loss

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d92fc34be538376d7bb6.png)
![IMG](https://www.fmz.com/upload/asset/2d8e5e65cc0e599fe9849.png)




#### Overview
This strategy is a multi-timeframe swing trading system based on the Stochastic Oscillator. It identifies trading opportunities by combining stochastic signals from current and higher timeframes, using dynamic take-profit and stop-loss levels for risk management. The strategy is designed for volatile markets, aiming to capture short-term price movements for profit.

#### Strategy Principles
The core logic is based on several key elements:
1. Using Stochastic Oscillator confirmation on two timeframes (current and higher)
2. Looking for crossover signals in overbought/oversold zones
3. Buy conditions: K line crosses above D line in current timeframe with K<20; higher timeframe K<20 and K>D
4. Sell conditions: K line crosses below D line in current timeframe with K>80; higher timeframe K>80 and K<D
5. Dynamic take-profit and stop-loss system based on entry price, with adjustable multipliers

#### Strategy Advantages
1. Multi-timeframe signal confirmation improves reliability and reduces false signals
2. Trading in overbought/oversold zones increases probability of trend reversal
3. Dynamic TP/SL system automatically adjusts to market volatility, enhancing money management flexibility
4. Visual interface clearly displays trading signals and TP/SL levels for better understanding
5. Adjustable parameters allow adaptation to different market conditions

#### Strategy Risks
1. Frequent stop-losses may occur in highly volatile markets
2. Dual timeframe confirmation might cause missed trading opportunities
3. Fixed multiplier TP/SL may not suit all market conditions
4. Potential early profit taking in strong trends
5. Requires careful parameter optimization to balance reward and risk

#### Optimization Directions
1. Implement adaptive TP/SL mechanism based on market volatility
2. Add trend filter for adjusting trade direction in strong trends
3. Incorporate volume indicators as confirmation signals
4. Develop more sophisticated position sizing system
5. Consider adding market sentiment indicators for entry timing optimization

#### Summary
This is a comprehensive trading system combining technical analysis and risk management. Through multi-timeframe signal confirmation and dynamic TP/SL, the strategy maintains stability while offering good profit potential. However, users need to optimize parameters according to their trading style and market conditions, always maintaining strict risk control.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Swing Fairas Oil", overlay=true)

// Input parameters
kLength = input(14, title="Stochastic K Length")
dLength = input(3, title="Stochastic D Length")
smoothK = input(3, title="Smooth K")
tfHigher = input.timeframe("30", title="Higher Timeframe")
takeProfit = input(1.7, title="Take Profit Multiplier")
stopLoss = input(1.7, title="Stop Loss Multiplier")

// Calculate Stochastic Oscillator for current timeframe
k = ta.sma(ta.stoch(close, high, low, kLength), smoothK)
d = ta.sma(k, dLength)

// Calculate Stochastic Oscillator for higher timeframe
kHTF = request.security(syminfo.tickerid, tfHigher, ta.sma(ta.stoch(close, high, low, kLength), smoothK))
dHTF = request.security(syminfo.tickerid, tfHigher, ta.sma(kHTF, dLength))

// Buy and sell conditions (confirmation from two timeframes)
buyCondition = ta.crossover(k, d) and k < 20 and kHTF < 20 and kHTF > dHTF
sellCondition = ta.crossunder(k, d) and k > 80 and kHTF > 80 and kHTF < dHTF

// Define Take Profit and Stop Loss levels
longStopLoss = close * (1 - stopLoss / 100)
longTakeProfit = close * (1 + takeProfit / 100)
shortStopLoss = close * (1 + stopLoss / 100)
shortTakeProfit = close * (1 - takeProfit / 100)

// Execute Trades
if buyCondition
    strategy.entry("Long", strategy.long)
    strategy.exit("Long Exit", from_entry="Long", limit=longTakeProfit, stop=longStopLoss)
if sellCondition
    strategy.entry("Short", strategy.short)
    strategy.exit("Short Exit", from_entry="Short", limit=shortTakeProfit, stop=shortStopLoss)

// Plot buy/sell signals on candlestick chart
plotshape(series=buyCondition, location=location.belowbar, color=color.green, style=shape.labelup, size=size.small, title="Buy Signal")
plotshape(series=sellCondition, location=location.abovebar, color=color.red, style=shape.labeldown, size=size.small, title="Sell Signal")

// Highlight candles for buy and sell conditions
barcolor(buyCondition ? color.green : sellCondition ? color.red : na)

// Draw Take Profit and Stop Loss levels dynamically with labels
var float tpLevel = na
var float slLevel = na
if buyCondition
    tpLevel := longTakeProfit
    slLevel := longStopLoss

if sellCondition
    tpLevel := shortTakeProfit
    slLevel := shortStopLoss


```

> Detail

https://www.fmz.com/strategy/482837

> Last Modified

2025-02-20 14:49:38
