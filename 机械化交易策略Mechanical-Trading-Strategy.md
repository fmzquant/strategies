
> Name

机械化交易策略Mechanical-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans] 

## 策略原理

机械化交易策略采用一套系统化和规则化的方法来进行交易,其目的是捕捉金融市场上的短期价格波动。该策略注重根据特定条件执行交易,并预设目标利润点和止损点。

关键特征:

目标利润:策略允许你根据入场价格设定一个目标利润百分比。这个目标代表每次交易的预期利润水平。

止损:策略包含一个根据入场价格设定的止损百分比。这个水平代表每次交易可承受的最大损失,有助于风险管理。

入场条件:策略在特定时间触发交易。在这个例子中,入场条件是基于蜡烛时间为16点(即下午4点)。这个基于时间的入场条件提供了一套执行交易的系统化方法。 

仓位管理:策略根据可用资金的固定百分比来确定仓位大小。这种方法可以保证一致的风险管理,并允许潜在的组合多样化。

执行逻辑:

当满足入场条件时,即蜡烛时间为16点,策略会启动做多头寸,使用strategy.entry功能。它使用strategy.exit功能来设置退出条件,包括盈利目标的限价单和止损目标的止损单。

目标利润和止损:

目标利润水平的计算是在入场价格的基础上增加入场价格的一个百分比。这代表着这次交易的预期利润目标。相反,止损水平是通过从入场价格中减去入场价格的一个百分比来计算的。这个水平是这次交易的最大可承受损失。

通过使用这种机械化交易策略,交易者可以建立起一套原则性的系统化交易方式。预设的目标利润和止损水平提供了清晰的退出规则,有助于风险管理,并可能最大化收益。当然,任何交易策略都无法保证盈利,因此仍需谨慎分析和监控市场条件。



||

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

[/trans]

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
