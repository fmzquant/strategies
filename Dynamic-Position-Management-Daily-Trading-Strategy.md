
> Name

Dynamic-Position-Management-Daily-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d050c11fab1eb2a458.png)


#### Overview
This strategy employs a consistent daily trading approach, focusing on capturing small profit targets while maintaining strict risk management. The strategy has been backtested from the year 2021, demonstrating robust performance with a 100% win rate. The main idea of the strategy is to open new long or short positions at the start of each trading day based on the previous day's market conditions. Key parameters include a 0.3% profit target and a 0.2% stop loss, with an initial capital of $1000 and a commission of 0.1% per trade.

#### Strategy Principles
The core principle of this strategy is to open new long or short positions at the beginning of each trading day based on the market trends of the previous trading day. Specifically, if there were no positions on the previous day, the strategy will open a long position at the start of the new day. If there is already a long position, the strategy checks if the 0.3% profit target has been reached and closes the position if it has. For short positions, the strategy checks if the 0.2% stop loss has been hit, and if so, it closes the short position and simultaneously opens a new long position to replace it. This ensures that the strategy always maintains exposure to the market.

#### Strategy Advantages
This daily trading strategy has several notable advantages:

1. 100% win rate: Over 36 closed trades, the strategy achieved a 100% win rate, highlighting its consistent performance.
2. Dynamic position management: In case of a short position stop-loss, a new long position is immediately opened to replace it, ensuring continuous market exposure.
3. Strict risk management: The strategy sets a 0.3% profit target and a 0.2% stop loss, effectively controlling risk.
4. Regular market participation: The strategy opens positions at the start of each day, ensuring regular participation in the market.
5. Robust backtesting results: Backtesting from the year 2021 shows robust performance, with a net profit of 22.2% and a maximum drawdown of 13.75%.

#### Strategy Risks
Despite the impressive performance and risk control demonstrated by the strategy, there are some potential risks to consider:

1. Possibility of consecutive losses: While the backtesting results are impressive, past performance does not guarantee future results. Consecutive losing trades could erode profits.
2. Black swan events: The strategy may be vulnerable to unexpected events and extreme market volatility, leading to losses beyond expectations.
3. Leverage risk: The strategy employs 200% leverage on each trade, which amplifies potential returns but also increases risk.

To mitigate these risks, diversification could be considered by applying similar strategies across different markets and asset classes. Regular monitoring and adjustment of strategy parameters are also important to adapt to changing market conditions.

#### Strategy Optimization Directions
1. Parameter optimization: The profit target, stop loss, and other key parameters could be further refined through additional backtesting and optimization to achieve optimal performance under different market conditions.
2. Diversification: Expanding the strategy to other markets and asset classes could enhance overall returns and reduce risk.
3. Dynamic position sizing: Dynamically adjusting position sizes based on market volatility or other factors could further optimize risk-adjusted returns.
4. Additional filters: Introducing additional technical indicators or market sentiment indicators as filters could improve the quality of trading signals.

#### Conclusion
Overall, this daily trading strategy offers a balanced approach to intraday trading with a strong emphasis on risk management and consistent profitability. It is suitable for traders seeking a systematic and disciplined trading methodology. The strategy has demonstrated impressive backtesting results, with a 100% win rate and robust risk-adjusted returns. However, it is important to recognize that past performance does not guarantee future results, and managing risk and adapting to market changes are crucial. With further optimization and enhancements, this strategy could be a valuable addition to any trader's toolbox.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-22 00:00:00
end: 2024-05-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Daily AUD-JPY Trading", overlay=true, initial_capital=1000, currency="AUD", default_qty_type=strategy.percent_of_equity, default_qty_value=200, commission_type=strategy.commission.percent, commission_value=0.1)

// Input parameters
profit_target = input(0.3, title="Profit Target (%)") / 100
loss_target = input(0.2, title="Loss Target (%)") / 100
start_year = input(2021, title="Start Year")

// Calculate daily open and close
new_day = ta.change(time("D"))

var float entry_price_long = na
var float entry_price_short = na
var bool position_long_open = false
var bool position_short_open = false

// Date check
trade_start = timestamp(start_year, 1, 1, 0, 0)

if new_day and time >= trade_start
    // If there was a previous long position, check for profit target
    if position_long_open
        current_profit_long = (close - entry_price_long) / entry_price_long
        if current_profit_long >= profit_target
            strategy.close("AUD Trade Long", comment="Take Profit Long")
            position_long_open := false
    
    // If there was a previous short position, check for profit target
    if position_short_open
        current_profit_short = (entry_price_short - close) / entry_price_short
        if current_profit_short >= profit_target
            strategy.close("AUD Trade Short", comment="Take Profit Short")
            position_short_open := false

    // Check for daily loss condition for short positions
    if position_short_open
        current_loss_short = (close - entry_price_short) / entry_price_short
        if current_loss_short <= -loss_target
            strategy.close("AUD Trade Short", comment="Stop Loss Short")
            position_short_open := false
            
            // Open a new long position to replace the stopped short position
            strategy.entry("AUD Trade Long Replacement", strategy.long)
            entry_price_long := close
            position_long_open := true

    // Open a new long position at the start of the new day if no long position is open
    if not position_long_open and not position_short_open
        strategy.entry("AUD Trade Long", strategy.long)
        entry_price_long := close
        position_long_open := true

    // Open a new short position at the start of the new day if no short position is open
    if not position_short_open and not position_long_open
        strategy.entry("AUD Trade Short", strategy.short)
        entry_price_short := close
        position_short_open := true

// Check for continuous profit condition for long positions
if position_long_open
    current_profit_long = (close - entry_price_long) / entry_price_long
    if current_profit_long >= profit_target
        strategy.close("AUD Trade Long", comment="Take Profit Long")
        position_long_open := false

// Check for continuous profit condition for short positions
if position_short_open
    current_profit_short = (entry_price_short - close) / entry_price_short
    if current_profit_short >= profit_target
        strategy.close("AUD Trade Short", comment="Take Profit Short")
        position_short_open := false

// Plot the entry prices on the chart
plot(position_long_open ? entry_price_long : na, title="Entry Price Long", color=color.green, linewidth=2)
plot(position_short_open ? entry_price_short : na, title="Entry Price Short", color=color.red, linewidth=2)

// Display current profit/loss percentage for long positions
var label profit_label_long = na
if position_long_open and not na(entry_price_long)
    current_profit_long = (close - entry_price_long) / entry_price_long * 100
    label.delete(profit_label_long)
    profit_label_long := label.new(x=time, y=high, text="Long P/L: " + str.tostring(current_profit_long, format.percent), style=label.style_label_down, color=color.white, textcolor=color.black,xloc=xloc.bar_time)

// Display current profit/loss percentage for short positions
var label profit_label_short = na
if position_short_open and not na(entry_price_short)
    current_profit_short = (entry_price_short - close) / entry_price_short * 100
    label.delete(profit_label_short)
    profit_label_short := label.new(x=time, y=high, text="Short P/L: " + str.tostring(current_profit_short, format.percent), style=label.style_label_down, color=color.white, textcolor=color.black,xloc=xloc.bar_time)
```

> Detail

https://www.fmz.com/strategy/452698

> Last Modified

2024-05-28 11:21:52
