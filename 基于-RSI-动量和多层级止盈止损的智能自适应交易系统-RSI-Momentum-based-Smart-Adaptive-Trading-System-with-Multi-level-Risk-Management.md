
> Name

基于-RSI-动量和多层级止盈止损的智能自适应交易系统-RSI-Momentum-based-Smart-Adaptive-Trading-System-with-Multi-level-Risk-Management

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9129878f134bc27740.png)


#### Overview
This strategy is an adaptive trading system based on the Relative Strength Index (RSI), designed to capture market momentum changes by monitoring RSI's overbought and oversold zones. The system integrates intelligent position management mechanisms, including multi-level stop-loss and take-profit controls, as well as automatic position closing functionality, aiming to achieve a robust risk-reward ratio.

#### Strategy Principles
The core strategy is based on RSI overbought/oversold signals, combined with multiple trading conditions:
1. Entry signals: Generate long signals when RSI breaks above 30; generate short signals when RSI falls below 70
2. Risk Management:
   - Set fixed stop-loss (100 points loss) and profit target (150 points gain)
   - Real-time position tracking ensuring one-directional positions
   - Automatic position closing at 15:25 daily to avoid overnight risk
3. Trade Execution: System automatically executes trading orders through strategy.entry and strategy.close functions

#### Strategy Advantages
1. Clear Signals: RSI-based crossover signals are clear, easy to understand and execute
2. Comprehensive Risk Control: Integrated multi-level risk control mechanisms
3. High Automation: Fully automated from signal generation to trade execution
4. Good Visualization: Clear display of buy/sell signals and RSI levels on charts
5. High Adaptability: Parameters can be adjusted for different market characteristics

#### Strategy Risks
1. RSI signal lag may cause delayed entry timing
2. Fixed stop-loss and take-profit levels may not suit all market conditions
3. Single indicator dependency might miss other important market signals
4. Frequent trading may incur high transaction costs
Suggestions:
- Combine with other technical indicators for signal confirmation
- Dynamically adjust stop-loss and take-profit levels
- Add trading frequency limitations

#### Strategy Optimization Directions
1. Indicator Optimization:
   - Add moving averages and other trend indicators
   - Include volume indicators for signal confirmation
2. Risk Control Optimization:
   - Implement dynamic stop-loss and take-profit
   - Add maximum drawdown control
3. Execution Optimization:
   - Add position size management
   - Optimize trading time management
4. Parameter Optimization:
   - Develop adaptive parameter system
   - Implement dynamic RSI thresholds

#### Summary
The strategy captures market momentum changes through the RSI indicator, coupled with a comprehensive risk management system, achieving a fully automated trading system. While certain limitations exist, improvements through the suggested optimization directions could lead to more stable trading performance. The core advantages lie in the system's completeness and automation level, making it suitable as a basic framework for further development and optimization.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-04 00:00:00
end: 2024-11-11 00:00:00
period: 10m
basePeriod: 10m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Harmony Signal Flow By Arun", overlay=true)

// RSI settings
rsiLength = 14
rsiSource = close
rsiValue = ta.rsi(rsiSource, rsiLength)

// Define RSI levels
buyLevel = 30
sellLevel = 70

// Buy signal: RSI crosses above 30
buyCondition = ta.crossover(rsiValue, buyLevel)

// Sell signal: RSI crosses below 70
sellCondition = ta.crossunder(rsiValue, sellLevel)

// Ensure only one order at a time
if (strategy.position_size == 0) // No open positions
    if (buyCondition)
        strategy.entry("Buy", strategy.long)
    else if (sellCondition)
        strategy.entry("Sell", strategy.short)

// Stop-loss and target conditions
var float stopLossBuy = na
var float targetBuy = na
var float stopLossSell = na
var float targetSell = na

if (strategy.position_size > 0) // If there's an open buy position
    stopLossBuy := strategy.position_avg_price - 100 // Set stop-loss for buy
    targetBuy := strategy.position_avg_price + 150 // Set target for buy

    if (close <= stopLossBuy)
        strategy.close("Buy", comment="Stoploss Hit")
    else if (close >= targetBuy)
        strategy.close("Buy", comment="Target Hit")

if (strategy.position_size < 0) // If there's an open sell position
    stopLossSell := strategy.position_avg_price + 100 // Set stop-loss for sell
    targetSell := strategy.position_avg_price - 150 // Set target for sell

    if (close >= stopLossSell)
        strategy.close("Sell", comment="Stoploss Hit")
    else if (close <= targetSell)
        strategy.close("Sell", comment="Target Hit")

// Close all positions by 3:25 PM
if (hour(timenow) == 15 and minute(timenow) == 25)
    strategy.close_all(comment="Close all positions at 3:25 PM")

// Plot buy/sell signals on the chart
plotshape(buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(sellCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Plot RSI and levels
hline(buyLevel, "Buy Level", color=color.green)
hline(sellLevel, "Sell Level", color=color.red)
plot(rsiValue, "RSI", color=color.blue)

```

> Detail

https://www.fmz.com/strategy/471711

> Last Modified

2024-11-12 16:12:36
