
> Name

RSI-based-Trading-Strategy-with-Percentage-based-Take-Profit-and-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/102c8b9d6e892058312.png)


#### Overview
This strategy is based on the Relative Strength Index (RSI) technical indicator, making trading decisions by analyzing the overbought and oversold conditions of an asset. When the RSI falls below the oversold threshold, a buy signal is triggered, and when the RSI rises above the overbought threshold, a sell signal is triggered. Additionally, the strategy employs a percentage-based take profit and stop loss mechanism, controlling risk and locking in profits by setting fixed profit and loss percentages. The strategy aims to capture short-term market fluctuations and promptly close positions when the trend reverses, achieving steady returns.

#### Strategy Principle
1. Calculate the RSI indicator value for a specified period.
2. Determine if the RSI is below the oversold threshold. If so, trigger a buy signal and open a long position.
3. Calculate the entry price, stop loss price, and take profit price. The stop loss price is the entry price multiplied by (1 - stop loss percentage), and the take profit price is the entry price multiplied by (1 + take profit percentage).
4. Continuously monitor price changes during the holding period:
   - When the current price reaches the stop loss price, close the position with a stop loss.
   - When the current price reaches the take profit price, close the position with a take profit.
   - When the RSI crosses above the overbought threshold, close the position.
5. If the RSI falls below the oversold threshold again, repeat steps 2-4 to start the next trading cycle.

#### Advantage Analysis
1. Simple and easy to use: The strategy is based on the classic RSI indicator, with a simple principle that is easy to understand and implement.
2. Strong adaptability to trends: By capturing overbought and oversold market conditions using the RSI indicator, the strategy adapts to different market trends.
3. Controllable risk: Fixed percentage take profit and stop loss are used to strictly control the risk exposure of each trade.
4. Timely profit-taking: Clear profit targets are set, and positions are decisively closed when the price reaches the take profit level to prevent profit erosion.
5. Reduced frequent trading: The RSI indicator has a certain filtering function, which can filter out some noise signals and reduce frequent trading.

#### Risk Analysis
1. Parameter sensitivity: The strategy's performance is sensitive to parameters such as RSI period, overbought/oversold thresholds, and take profit/stop loss percentages, and different parameters may lead to different results.
2. Poor performance in oscillating markets: In oscillating market conditions, the RSI indicator may frequently trigger trading signals, leading to overtrading and decreased profitability.
3. Trend adjustment risk: In cases where a strong trend suddenly adjusts, fixed percentage stop loss may not protect the account in a timely manner, causing significant drawdowns.
4. Profit/loss ratio risk: Fixed percentage take profit and stop loss may lead to an unbalanced profit/loss ratio, affecting the long-term stability of the strategy.

#### Optimization Direction
1. Dynamic parameter adjustment: Dynamically optimize parameters such as RSI period, overbought/oversold thresholds, and take profit/stop loss percentages based on different market conditions to improve the strategy's adaptability.
2. Introduce trend filters: Combine other trend indicators, such as moving averages, to further confirm RSI signals and reduce false signals in oscillating markets.
3. Optimize take profit and stop loss mechanisms: Adopt more flexible take profit and stop loss methods, such as trailing stop loss or volatility-based stop loss, to enhance risk control capabilities.
4. Incorporate position sizing: Dynamically adjust the position size of each trade based on market volatility and account risk conditions to balance returns and risks.
5. Combine with other indicators: Use RSI in conjunction with other technical indicators such as MACD, Bollinger Bands, etc., to improve the reliability and robustness of signals.

#### Summary
The RSI-based trading strategy with percentage-based take profit and stop loss captures overbought and oversold market conditions, combined with a fixed percentage take profit and stop loss mechanism, promptly closing positions when the trend reverses to achieve steady returns. The strategy's principle is simple and easy to understand, with controllable risk and strong adaptability. However, it also faces issues such as parameter sensitivity, poor performance in oscillating markets, and trend adjustment risks. By dynamically adjusting parameters, introducing trend filters, optimizing take profit and stop loss mechanisms, incorporating position sizing, and combining with other indicators, the strategy's robustness and profitability can be further enhanced to better adapt to changing market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI Strategy with Adjustable TP and SL", overlay=true, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=10, 
     initial_capital=100000, 
     currency=currency.USD, 
     commission_type=strategy.commission.percent, 
     commission_value=0.1)

// RSI settings
rsiPeriod = input.int(14, title="RSI Period")
rsiOverbought = input.int(70, title="RSI Overbought Level", minval=50, maxval=100)
rsiOversold = input.int(30, title="RSI Oversold Level", minval=0, maxval=50)

// Fixed TP and SL settings
takeProfitPct = input.float(20, title="Take Profit Percentage", step=0.1) / 100
stopLossPct = input.float(5, title="Stop Loss Percentage", step=0.1) / 100

// Calculate RSI
rsiValue = ta.rsi(close, rsiPeriod)

// Plot RSI
hline(rsiOverbought, "RSI Overbought", color=color.red)
hline(rsiOversold, "RSI Oversold", color=color.green)
plot(rsiValue, title="RSI", color=color.purple)

// Entry conditions
buyCondition = ta.crossunder(rsiValue, rsiOversold)
sellCondition = ta.crossover(rsiValue, rsiOverbought)

// Calculate stop loss and take profit prices
var float entryPrice = na
var float stopLossLevel = na
var float takeProfitLevel = na

if (buyCondition)
    entryPrice := close
    stopLossLevel := entryPrice * (1 - stopLossPct)
    takeProfitLevel := entryPrice * (1 + takeProfitPct)
    strategy.entry("Buy", strategy.long)

// Close positions when TP or SL is hit
if (strategy.position_size > 0)
    if (close <= stopLossLevel)
        strategy.close("Buy", comment="Stop Loss Hit")
    if (close >= takeProfitLevel)
        strategy.close("Buy", comment="Take Profit Hit")

// Close positions when RSI crosses above overbought level
if (sellCondition)
    strategy.close("Buy", comment="RSI Overbought")

// Optional: Add alerts
alertcondition(buyCondition, title="Buy Alert", message="RSI crossed below oversold level")
alertcondition(sellCondition, title="Sell Alert", message="RSI crossed above overbought level")

```

> Detail

https://www.fmz.com/strategy/453650

> Last Modified

2024-06-07 15:04:39
