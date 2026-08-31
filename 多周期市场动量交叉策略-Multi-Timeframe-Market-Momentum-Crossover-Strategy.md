
> Name

多周期市场动量交叉策略-Multi-Timeframe-Market-Momentum-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13877ae445139d93699.png)


#### Overview

This strategy is a long-short trading system based on the MACD indicator, specifically designed for 15-minute charts. It generates trading signals using MACD line and signal line crossovers, restricting trading to specific market open hours. The strategy employs a fixed proportion risk management method, dynamically adjusting the risk exposure for each trade based on account size.

#### Strategy Principles

1. MACD Indicator Calculation: Uses standard MACD settings with 12-period fast line, 26-period slow line, and 9-period signal line.

2. Trade Signal Generation:
   - Short Signal: When the MACD line crosses above the signal line and the MACD line is above the zero line.
   - Long Signal: When the MACD line crosses below the signal line and the MACD line is below the zero line.

3. Trading Time Restriction: Executes trades only during London market (08:00-17:00 GMT) and New York market (13:30-20:00 GMT) open hours.

4. Risk Management:
   - Uses fixed proportion risk management, risking 1% of the total account value per trade.
   - Sets stop loss at 10 points and take profit at 15 points.
   - Dynamically calculates the number of contracts for each trade based on current account size.

5. Trade Execution: Enters trades with market orders, simultaneously setting stop loss and take profit orders.

#### Strategy Advantages

1. Market Momentum Capture: MACD indicator effectively captures market momentum changes, helping identify potential trend reversal points.

2. Risk Control: Fixed proportion risk management ensures that each trade's risk matches the account size, promoting long-term capital growth.

3. Time Filtering: Restricting trading hours helps avoid false signals during low liquidity periods, improving trade quality.

4. Adaptability: The strategy automatically adjusts trade size based on account size, suitable for traders with different capital amounts.

5. Clear Entry and Exit Rules: Clear signal generation logic and fixed stop loss and take profit settings reduce the need for manual intervention.

#### Strategy Risks

1. Sideways Market Risk: In range-bound markets, MACD may generate frequent crossover signals, leading to overtrading and consecutive losses.

2. Slippage Risk: Using market orders for entry may face slippage, especially in fast-moving markets.

3. Fixed Stop Loss Risk: Fixed point stop losses may not be flexible enough during high volatility periods, potentially leading to premature stopouts.

4. Missing Big Moves: Strict take profit settings may cause the strategy to miss out on the majority of profits from significant trend moves.

5. Time Window Limitation: Trading only during specific time periods may miss potential opportunities in other sessions.

#### Strategy Optimization Directions

1. Multi-Timeframe Confirmation: Introduce trend confirmation from longer timeframes (e.g., 1-hour or 4-hour) to improve trade signal reliability.

2. Dynamic Stop Loss: Consider using the ATR (Average True Range) indicator to set dynamic stop losses, adapting to changes in market volatility.

3. Incorporate Additional Technical Indicators: Such as RSI (Relative Strength Index) or moving averages as filters for MACD signals to reduce false signals.

4. Optimize Trading Time Windows: Through backtesting analysis, identify optimal trading periods, potentially adjusting seasonally based on different market conditions.

5. Improve Take Profit Strategy: Implement trailing stops or partial profit protection mechanisms to capture larger trends while securing partial profits.

6. Volatility Adjustment: Dynamically adjust trade size and stop loss levels based on market volatility, reducing risk exposure during high volatility periods.

7. Add Fundamental Filters: Consider the impact of important economic data releases on the market, pausing trading before and after key data announcements.

#### Conclusion

The Multi-Timeframe Market Momentum Crossover Strategy is an adaptive trading system based on the MACD indicator, enhancing trade quality through time-restricted trading and strict risk management. The strategy's main advantages lie in its clear signal generation logic and dynamic risk management method, making it suitable for trading accounts of various sizes. However, the strategy also faces risks such as overtrading in sideways markets and missing out on big trends.

By introducing multi-timeframe confirmation, dynamic stop losses, and additional technical indicators, the strategy has the potential to further improve its performance and stability. Particularly, adding volatility adjustments and improved take profit strategies can help the strategy better adapt to different market conditions. Additionally, considering fundamental factors can increase the strategy's comprehensiveness.

Overall, this strategy provides traders with a robust framework that can be personalized and optimized to meet specific risk preferences and trading objectives. Continuous backtesting and live trading validation will be key to ensuring the strategy's long-term effectiveness.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-28 00:00:00
end: 2024-07-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("交易霸傑15掏金策略", overlay=true)

// 設置參數
fastLength = input.int(12, title="MACD 快線長度")
slowLength = input.int(26, title="MACD 慢線長度")
signalSmoothing = input.int(9, title="MACD 信號線平滑")
riskPercentage = input.float(2, title="每筆交易的風險比例 (%)")
stopLossPoints = 10
takeProfitPoints = 15

// 設置倫敦和紐約市場的開盤時間
londonOpen = timestamp("GMT+0", year, month, dayofmonth, 8, 0)
londonClose = timestamp("GMT+0", year, month, dayofmonth, 17, 0)
nyOpen = timestamp("GMT+0", year, month, dayofmonth, 13, 30)
nyClose = timestamp("GMT+0", year, month, dayofmonth, 20, 0)

// 計算MACD
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalSmoothing)
macdHist = macdLine - signalLine

// 畫出MACD線
hline(0, "0軸", color=color.gray)
plot(macdLine, color=color.blue, title="MACD 快線")
plot(signalLine, color=color.red, title="MACD 慢線")
plot(macdHist, color=color.green, style=plot.style_histogram, title="MACD Histogram")

// 動態計算每筆交易的風險和止損、止盈點數
capital = strategy.equity
riskAmount = capital * (riskPercentage / 100)
contracts = 1
stopLossValue = stopLossPoints * syminfo.mintick
takeProfitValue = takeProfitPoints * syminfo.mintick

// 確定是否在交易時段內
isLondonOpen = (time >= londonOpen and time <= londonClose)
isNyOpen = (time >= nyOpen and time <= nyClose)

// 偏空進場條件
shortCondition = ta.crossover(signalLine, macdLine) and macdLine > 0 and (isLondonOpen or isNyOpen)
if (shortCondition)
    strategy.entry("Short", strategy.short, qty=contracts)
    strategy.exit("Take Profit/Stop Loss", "Short", limit=close - takeProfitValue, stop=close + stopLossValue)

// 偏多進場條件
longCondition = ta.crossunder(signalLine, macdLine) and macdLine < 0 and (isLondonOpen or isNyOpen)
if (longCondition)
    strategy.entry("Long", strategy.long, qty=contracts)
    strategy.exit("Take Profit/Stop Loss", "Long", limit=close + takeProfitValue, stop=close - stopLossValue)


```

> Detail

https://www.fmz.com/strategy/458076

> Last Modified

2024-07-29 17:10:05
