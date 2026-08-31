
> Name

双均线交叉趋势策略Dual-Moving-Average-Crossover-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13f8ca6076d4578458b.png)


## Overview

The Dual Moving Average Crossover Trend strategy is a trading strategy based on moving averages. It uses the crossover of fast EMA and slow SMA lines as buy and sell signals, and combines the MACD indicator divergence to filter signals. The strategy considers multiple factors such as price, trend and momentum, forming a relatively complete trading system.

## Strategy Principle  

The strategy uses two moving averages, EMA with length of 200 days and SMA with length of 100 days. When the price breaks through both lines upwards, a buy signal is generated. When the price breaks through both lines downwards, a sell signal is generated. This can effectively filter oscillating trends and short-term pullbacks.

To further improve the reliability of signals, the MACD indicator is also introduced. When the price breaks through the EMA and SMA to form a signal, the fast line of the MACD needs to break through the slow line from below, and the MACD histogram needs to be above the 0 axis, to trigger a real buy signal. Conversely, when the fast line of the MACD breaks through the slow line from above, and the MACD histogram is below the 0 axis, it will trigger a real sell signal.   

In addition, stop loss and take profit are set in the strategy. After the strategy opens a position, the stop loss point and take profit point will be calculated and set according to the percentage set by the user. This can effectively control the risk of a single trade.

In summary, this strategy comprehensively considers multiple indicators, sets strict filtering conditions for buy and sell signals, and adopts stop loss and take profit to manage risks, forming a relatively rigorous and complete trading system.

## Advantage Analysis

The Dual Moving Average Crossover Trend strategy has the following advantages:

1. Combining multiple indicators, comprehensively considering price, trend and momentum, and setting strict filtering conditions for signals can effectively avoid false signals and improve signal reliability.

2. The use of two moving averages with different parameters can better identify market trends and filter oscillating markets. The fast EMA line is used to timely track price changes; the slow SMA line is used to determine long-term trends. The combination of the two lines works better.

3. The MACD indicator introduces customizable parameters that can be adjusted according to the characteristics of different markets and has high flexibility. The settings of the MACD ensure that trading signals are supported by price, trend and momentum at the same time, thus having very strong application value.

4. Setting stop loss and take profit points can maximize control over single trade losses and avoid excessive losses. Reasonable percentage settings for profit taking can lock in partial profits and reduce market risk exposure after making profits.

5. The parameters of this strategy can be flexibly set, and the strategy can be adjusted based on optimization results, which is very practical. There is ample space for testing and optimizating different markets and parameters.

## Risk Analysis   

The Dual Moving Average Crossover Trend Strategy also has some risks, mainly in the following areas:  

1. When the stock price shows violent fluctuations, EMA and SMA may cross falsely for many times, resulting in frequent opening and closing of trading signals. This will increase the frequency of trading and the expenditure of commissions.

2. MACD indicators may have false breakouts, especially in the process when the momentum is still unclear. In this case, the signal is also unreliable, which may cause unnecessary losses.  

3. The position and ratio of stop loss settings have a great influence on profit and loss results. If the stop loss is set too small, there is a risk of being caught; if the stop loss is set too large, the single loss may be too heavy. This requires sufficient testing to find the optimal parameters.

4. As a trend tracking indicator, the effectiveness of moving average will be discounted when prices reverse rapidly. The strategy may not have time to stop loss before being hit by the price reversal, causing greater losses.


The corresponding solutions are as follows:

1. For volatile markets, appropriately adjust parameters of moving averages, using lower parameter EMAs and SMAs to reduce crossover frequency.  

2. Increase filtering conditions such as MACD breaking above and below the zero line, which can reduce false breakouts to some extent. Combining other indicators such as KDJ and BOLL can also be considered.

3. The setting of stop loss position and ratio needs sufficient backtesting and optimization to find the optimal parameters. On this basis, continuous monitoring and dynamic adjustment should also be considered.  

4. Mechanisms can be set up to identify rapid price reversals. When abnormal reversals are spotted, emergency measures can be taken such as reducing positions or suspending trading strategies to control risk exposure.


## Optimization Directions   

There is still room for further optimization of the Dual Moving Average Crossover Trend strategy, mainly in the following aspects:

1. Test more indicators for combination to find better parameters, such as incorporating the BOLL channel and considering the impact of volatility.  

2. Optimize parameters of moving average lengths to find the best parameter combination under different market conditions. Rolling parameter optimization is also an option.

3. Set up more scientific and reasonable stop loss and take profit strategies, such as introducing trailing stop loss, or setting dynamic risk-reward ratios based on historical statistical results. This can further improve the stability of the strategy.  

4. Establish mechanisms for automatic identification and emergency response of abnormal price reversals. In extreme market conditions, proactively reduce positions or suspend strategies to avoid huge losses.

5. Expand trading varieties such as foreign exchange, cryptocurrencies and other varieties. Test robustness of parameters across different varieties to expand applicability of the strategy.  

6. Optimize capital management strategies of the strategy, such as fixed amount trading, fixed position ratio, etc. Control single trade loss risk, making the overall capital curve more stable.

## Conclusion  

The Dual Moving Average Crossover Trend Strategy comprehensively considers multiple factors. When generating trading signals, it requires support from multiple indicators such as price, trend and momentum to ensure signal reliability. The strategy also adopts moving stop loss and take profit to effectively control risks of individual trades. The flexible parameter settings of the strategy make it highly practical for automated trading.

However, no strategy can be perfect. This strategy will also encounter some difficulties in application, such as frequent trading, false breakouts, stop loss positioning, etc. To further enhance the robustness and profitability of the strategy, efforts need to be made in many aspects, including optimizing parameter portfolios, introducing new technical indicators, improving the stop loss mechanism, and so on.

In summary, the Dual Moving Average Crossover Trend Strategy forms a relatively complete and rigorous trading system. Through continuous optimization and improvement in future research and application, the strategy has the potential to achieve greater practical value.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|(?MACD Values)Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Signal Smoothing|
|v_input_5|false|Simple MA (Oscillator)|
|v_input_6|false|Simple MA (Signal Line)|
|v_input_7|200|(?Moving Averages)EMA|
|v_input_8|100|SMA|
|v_input_9|true|(?Backtest Date Range)From Month|
|v_input_10|true|From Day|
|v_input_11|2000|From Year|
|v_input_12|true|Thru Month|
|v_input_13|true|Thru Day|
|v_input_14|2099|Thru Year|
|v_input_15|2|(?TP / SL %)Profit Long %|
|v_input_16|true|Loss Long %|
|v_input_17|2|Profit Short %|
|v_input_18|true|Loss Short %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-01 00:00:00
end: 2023-11-30 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// Hi,
// This is my first strategy made by myself(except for the MACD indicator). I'm publishing this to get myself out there and for some newer people to see how a basic strategy works. All credits go to Zen&TheArtofTrading, for teaching me almost everything I know about Pinescript
// The strategy is basically an MACD crossover trend strategy. If the MACD line crosses the signal line upward, above the zero point of the histogram, while the price is above 200 EMA and 100 SMA it's a buy signal
// If the MACD line crosses the signal line downward, while below zero point of the histogram, as well as the price being below 200 EMA and 100 SMA it's a sell signal
// I used the 200 EMA and 100 SMA because I wanted to filter weak signals as much as possible when the market is ranging, if you have any suggestions to go around this better, please let me know, still learning everyday

// If you have any suggestions, tips or tricks please let me know. I'm still new to Pinescript, but having a lot of fun trying stuff out. If you see something in my code that you don't understand, feel free to ask, I'll try to answer as best as I can

// I opened the strategy with predetermined backtesting pyramiding, currency etc. This made the progress of backtesting multiple TP and SL easier. Also the commission value is from Binance Futures, I just left it in there for anyone who wants to just copy this strategy
strategy("MACD Crossover Trend Strategy Template", overlay = true )

// Determining inputs and values, I just copied the built-in MACD strategy and removed everything I didn't need, just needed the barebone indicator and added EMA + SMA inputs
fast_length = input(title = "Fast Length", type = input.integer, defval = 12, group = "MACD Values")
slow_length = input(title = "Slow Length", type = input.integer, defval = 26, group = "MACD Values")
src = input(title = "Source", type = input.source, defval = close, group = "MACD Values")
signal_length = input(title = "Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9, group = "MACD Values")
sma_source = input(title = "Simple MA (Oscillator)", type = input.bool, defval = false, group = "MACD Values")
sma_signal = input(title = "Simple MA (Signal Line)", type = input.bool, defval = false, group = "MACD Values")
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal
emaLength = input(title = "EMA", type = input.integer, defval = 200, step = 10, group = "Moving Averages")
smaLength = input(title = "SMA", type = input.integer, defval = 100, step = 10, group = "Moving Averages")

// Input backtest range, you can adjust this here or in the input options
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12, group = "Backtest Date Range")
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31, group = "Backtest Date Range")
fromYear  = input(defval = 2000, title = "From Year",       type = input.integer, minval = 1970, group = "Backtest Date Range")
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12, group = "Backtest Date Range")
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31, group = "Backtest Date Range")
thruYear  = input(defval = 2099, title = "Thru Year",       type = input.integer, minval = 1970, group = "Backtest Date Range")

// Inputs for EMA, SMA and to adjust your take profit and stop losses in the input options while backtesting, it's result of your input is calculated back to percentages
ema = ema(close, emaLength)
sma = sma(close, smaLength)
profitlong = input(title = "Profit Long %", type = input.float, defval = 2, minval = 0.1, maxval = 100, step = 0.1, group = "TP / SL %") * 0.01
losslong = input(title = "Loss Long %", type = input.float, defval = 1, minval = 0.1, maxval = 100, step = 0.1, group = "TP / SL %") * 0.01
profitshort = input(title = "Profit Short %", type = input.float, defval = 2, minval = 0.1, maxval = 100, step = 0.1, group = "TP / SL %") * 0.01
lossshort = input(title = "Loss Short %", type = input.float, defval = 1, minval = 0.1, maxval = 100, step = 0.1, group = "TP / SL %") * 0.01

// Check EMA and SMA also check the backtest range. inDataRange is a true or false statement, true if the date right now is between the parameters that's filled at the corresponding inputs
// (for example 1-1-2020 till 12-12-2020, if that specific bar is between these dates, statement is true and trade will be executed)
// If the date is not in between the given parameters, statement turns to false and it won't allow new trades and closes all current trades as seen with the strategy.close_all function
inDataRange = (time >= timestamp(syminfo.timezone, fromYear, fromMonth, fromDay, 0, 0)) and (time < timestamp(syminfo.timezone, thruYear, thruMonth, thruDay, 0, 0))
long = close > ema and close > sma and inDataRange
short = close < ema and close < sma and inDataRange

// Entry and exit signals + checking backtest date range, what the signals are supposed to do is noted at the beginning of the code
// I want a way to filter out weak signals that are ranging around the zero point of the histogram. 
// So far couldn't think of a decent way to do this over multiple symbols since the range of the histogram changes with every symbol, sometimes ranging between 0 and 1 or sometimes ranging between 0 and 1000
// I could probably use a cofficiency or something, but that's beyond my grasp at the moment
// Also I wanted a way to let my strategy determine a stop loss based on the pullback and having a 1.5 risk/reward TP on top of that. Couldn't really figure out a way to determine the pullback
if (crossover(macd, signal) and macd > 0)
    strategy.entry("Long", long = strategy.long,
     comment = "Long Buy",
     when = long)

strategy.exit("Exit Long", "Long", profit = close * profitlong / syminfo.mintick, loss = close * losslong / syminfo.mintick)


if (crossunder(macd, signal) and macd < 0)
    strategy.entry("Short", long = strategy.short,
     comment = "Short Buy",
     when = short)

strategy.exit("Exit Short", "Short", profit = close * profitshort / syminfo.mintick, loss = close * lossshort / syminfo.mintick)

// To make sure the backtesting doesn't leave a position open beyond, or before, our applied dates
if (not inDataRange)
    strategy.close_all()

// plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/434434

> Last Modified

2023-12-06 11:52:20
