
> Name

EMA-Crossover-for-Long-Line-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/af80d4fd31fec11607.png)

## Overview  

This strategy utilizes the crossover patterns between moving averages (MA) of different timeframes and RSI indicator to determine the timing of entries and exits in the market, aiming for long-term holding. The strategy allows real-time optimization through parameter tuning and is suitable for the long-term investment in major indices.

## Strategy Logic  

The core mechanism of this strategy is to identify entry and exit points through the golden cross and death cross of the EMA lines. It also incorporates the RSI indicator to determine overbought and oversold conditions.  

Specifically, the buy signal logic checks for the following: Price crosses below EMA20 and above EMA50, forming a golden cross, which helps identify trend reversal more precisely compared to single EMA system. Additional criteria on close price being lower than open and previous day low further filters out false breakouts.

The above buy criteria are configured with various parameters to form 4 buying rules, corresponding to different EMA periods and quantities. This allows gradual building of positions through tranche buying, achieving average costing down.

For exits, the strategy checks for death cross above EMA10, with overbought RSI signal; or death cross below EMA10, with oversold RSI signal. Profit taking rule based on certain return percentage is also implemented. Using RSI combines with EMA crossovers reduces the risk of false signals.  

## Advantage Analysis 

The biggest strength of this strategy lies in its effectiveness of identifying trend reversal points with EMA crosses, enabling trend following. Compared to single EMA system, double EMA crossovers help eliminate false signals. Additionally, the use of RSI adds confirmation before entering overbought/oversold zones, further lowering trading risks.

Another advantage is the implementation of pyramiding and average costing down. Such tranche buying distributes quantities at different price levels, ensuring maximum profit when the trend resumes. It also diversifies risks away from a single big entry position.  

## Risk Analysis

Main risks associated with this strategy includes:

1. Lagging nature of the EMA system makes it slow to react to sudden price changes, unable to exit positions in timely manner. Adding stop loss mechanisms could help mitigate such risks.

2. Lack of restrictions on buy entry timeframes may lead to premature entries, getting caught in market consolidations. This can be addressed by limiting the buy zones.

3. Pyramiding buy orders may result in oversized positions, creating vulnerability to one directional breakout risks. Adjusting water level parameters and introducing risk controls can reduce such risks.

## Enhancement Opportunities

The strategy can be further optimized in the following areas:

1. Incorporate stop loss rules to cut losses when key support levels are breached on the downside, controlling downside risks.

2. Add trading validation module to check primary trend direction, entering trades only when the overall trend points upward, avoiding countertrend risks.

3. Set tighter buy zone restrictions to prevent premature pyramiding entries before confirmations.  

4. Employ machine learning algorithms with multifactor analysis to improve entry accuracy and win rates.

## Conclusion   

In summary, this article illustrates in details a long-term quantitative strategy utilizing dual EMA crossover and RSI indicator for entry and exit signals, supported by tranche position building to maximize efficiency. The logic and parameters can be adjusted for indices and stocks across the markets, making it a versatile strategy for long-term trend following. The risk analysis and enhancement opportunities also provide references for further optimization. As the strategy becomes more sophisticated, I believe it will serve as a solid system for long-term holding in live trading environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|Quantity 1|
|v_input_int_2|2|Quantity 2|
|v_input_int_3|3|Quantity 3|
|v_input_int_4|4|Quantity 4|
|v_input_1|true|Profit Percentage|
|v_input_int_5|true|Pyramiding|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA_zorba1", shorttitle="3 NIFTY RSI EMA", overlay=true)

// Input parameters
qt1 = input.int(1, title="Quantity 1", minval=1)
qt2 = input.int(2, title="Quantity 2", minval=1)
qt3 = input.int(3, title="Quantity 3", minval=1)
qt4 = input.int(4, title="Quantity 4", minval=1)
ema10 = ta.ema(close, 10)
ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)
ema100 = ta.ema(close, 100)
ema200 = ta.ema(close, 200)

// RSI(14) condition
rsi_threshold = 65
rsi_crossed_above_70 = ta.rsi(close, 14) > rsi_threshold
rsi_crossed_above_70_two_days_ago = ta.rsi(close[5], 14) > rsi_threshold or ta.rsi(close[4], 14) > rsi_threshold or ta.rsi(close[3], 14) > rsi_threshold
rsi_crossed_above_70_yesterday = ta.rsi(close[1], 14) > rsi_threshold

// Date range filter
start_date = timestamp(year=2021, month=1, day=1)
end_date = timestamp(year=2024, month=1, day=1)
in_date_range = true

// Profit condition
profit_percentage = input(1, title="Profit Percentage")  // Adjust this value as needed

// Pyramiding setting
pyramiding = input.int(1, title="Pyramiding", minval=1, maxval=10)

// Buy conditions
buy_condition_1 = in_date_range and close < ema20 and close > ema50 and close < open and close < low[1]
buy_condition_2 = in_date_range and close < ema50 and close > ema100 and close < open and close < low[1]
buy_condition_3 = in_date_range and close < ema100 and close > ema200 and close < open and close < low[1]
buy_condition_4 = in_date_range and close < ema200 and close < open and close < low[1]

// Exit conditions
profit_condition = strategy.position_avg_price * (1 + profit_percentage / 100) <= close
exit_condition_1 = in_date_range and ((close > ema10 and ema10 > ema20 and ema10 > ema50 and ema10 > ema100 and ema10 > ema200 and close < open) and rsi_crossed_above_70_two_days_ago) and profit_condition and close < low[1] and close < low[2]
exit_condition_2 = in_date_range and ((close < ema10 and close[1] > ema10 and close < close[1] and ema10 > ema20 and ema10 > ema50 and ema10 > ema100 and ema10 > ema200 and close < open) and rsi_crossed_above_70_yesterday) and profit_condition and close < low[1] and close < low[2]

// Strategy logic
strategy.entry("Buy1", strategy.long, qty=qt1 * pyramiding, when=buy_condition_1)
strategy.entry("Buy2", strategy.long, qty=qt2 * pyramiding, when=buy_condition_2)
strategy.entry("Buy3", strategy.long, qty=qt3 * pyramiding, when=buy_condition_3)
strategy.entry("Buy4", strategy.long, qty=qt4 * pyramiding, when=buy_condition_4)

strategy.close("Buy1", when=exit_condition_1 or exit_condition_2)
strategy.close("Buy2", when=exit_condition_1 or exit_condition_2)
strategy.close("Buy3", when=exit_condition_1 or exit_condition_2)
strategy.close("Buy4", when=exit_condition_1 or exit_condition_2)

```

> Detail

https://www.fmz.com/strategy/442249

> Last Modified

2024-02-20 15:22:12
