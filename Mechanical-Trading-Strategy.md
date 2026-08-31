
> Name

Mechanical-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Strategy Logic

The "Mechanical Trading Strategy" is a simple and systematic approach to trading that aims to capture short-term price movements in the financial markets. This strategy focuses on executing trades based on specific conditions and predetermined profit targets and stop loss levels. 

Key Features:

Profit Target: The strategy allows you to set a profit target as a percentage of the entry price. This target represents the desired level of profit for each trade.

Stop Loss: The strategy incorporates a stop loss level as a percentage of the entry price. This level represents the maximum acceptable loss for each trade, helping to manage risk.

Entry Condition: The strategy triggers trades at a specific time. In this case, the condition for entering a trade is based on the hour of the candle being 16 (4:00 PM). This time-based entry condition provides a systematic approach to executing trades.

Position Sizing: The strategy determines the position size based on a fixed percentage of the available equity. This approach ensures consistent risk management and allows for potential portfolio diversification. 

Execution: 

When the entry condition is met, signified by the hour being 16, the strategy initiates a long position using the strategy.entry function. It sets the exit conditions using the strategy.exit function, with a limit order for the take profit level and a stop order for the stop loss level.

Take Profit and Stop Loss:

The take profit level is calculated by adding a percentage of the entry price to the entry price itself. This represents the profit target for the trade. Conversely, the stop loss level is calculated by subtracting a percentage of the entry price from the entry price. This level represents the maximum acceptable loss for the trade.

By using this mechanical trading strategy, traders can establish a disciplined and systematic approach to their trading decisions. The predefined profit target and stop loss levels provide clear exit rules, helping to manage risk and potentially maximize returns. However, no trading strategy is guaranteed to be profitable, and careful analysis and monitoring of market conditions are always recommended.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.4|Profit Target (%)|
|v_input_2|0.2|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Mechanical Trading Strategy", overlay=true)

// Define strategy parameters
profitTarget = input(0.4, "Profit Target (%)") / 100
stopLoss = input(0.2, "Stop Loss (%)") / 100

// Define strategy variables
entryPrice = close
takeProfitLevel = entryPrice + (entryPrice * profitTarget)
stopLossLevel =  entryPrice - (entryPrice * stopLoss)
// Entry condition
if (hour(time) == 16)
    // Calculate position size based on available capital and risk tolerance
    positionSize = strategy.equity * 0.02 // Example: 2% of equity

    strategy.entry("Buy", strategy.long)
    strategy.exit("Take Profit", "Buy", limit=takeProfitLevel,stop =stopLossLevel )



```

> Detail

https://www.fmz.com/strategy/426779

> Last Modified

2023-09-14 15:19:05
