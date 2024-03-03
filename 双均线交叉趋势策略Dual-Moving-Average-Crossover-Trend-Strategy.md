
> Name

双均线交叉趋势策略Dual-Moving-Average-Crossover-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13f8ca6076d4578458b.png)

[trans]

## 概述

双均线交叉趋势策略是一种基于移动平均线的交易策略。它利用快线EMA和慢线SMA的交叉作为买入和卖出信号,并结合MACD指标的背离来过滤信号。该策略同时考虑了价格、趋势和动量等多个因素,形成一个相对完整的交易体系。

## 策略原理

该策略使用EMA和SMA两条移动平均线。其中EMA长度为200天,SMA长度为100天。当价格上涨突破两条均线时产生买入信号;当价格下跌突破两条均线时产生卖出信号。这样能够有效过滤震荡趋势和短期回调。

为了进一步提高信号的可靠性,策略还引入MACD指标。在价格突破EMA和SMA形成信号时,需要MACD的快线从下方突破慢线,并且MACD柱形图处于0轴之上,才会触发真正的买入信号。反之,MACD的快线从上方突破慢线,并且MACD柱形图处于0轴之下时,才会触发真正的卖出信号。

另外,策略还设置了止损和止盈。在策略开仓后,会根据用户设置的比例来计算并设置止损点和止盈点。这样可以有效控制单笔交易的风险。

总的来说,该策略综合考虑了多个指标,对买入卖出信号设置了严格的过滤条件,并采用止损止盈管理风险,形成一个相对严谨和完整的交易体系。

## 优势分析

双均线交叉趋势策略有以下几个优势:

1. 结合多重指标,综合考量价格、趋势和动量,对信号设置了严格的过滤条件,可以有效避免虚假信号,提高信号的可靠性。

2. 采用两条不同参数的移动平均线,可以更好地识别市场趋势,过滤震荡行情。快速EMA线用于及时跟踪价格变化;慢速SMA线用于判断长期趋势。两条均线的组合使用效果更好。

3. 引入MACD指标中可设置各参数,可以按照不同市场的特点进行调整,灵活度高。MACD的设定确保交易信号同时获得价格、趋势和动量的支持,从而具有很强的应用价值。

4. 设置止损止盈点,可以最大程度地控制单笔交易的损失,避免 SIZE_MATHFUNC
单笔损失过大的风险。止盈设置合理的比例可以锁定部分利润,在盈利后降低市场风险暴露。

5. 该策略参数可以灵活设置,并可以根据优化结果对策略进行调整,实用性非常强。测试不同市场及参数的优化空间大。

## 风险分析

双均线交叉趋势策略也存在一些风险,主要集中在以下几个方面:

1. 当股价表现出剧烈震荡的时候,EMA和SMA可能出现多次的错误交叉,造成交易信号的频繁开闭。这将增加交易频率和手续费的支出。

2. MACD指标可能出现假突破的情况,特别是在震荡势头还不明朗的过程中。这种情况下信号也不可靠,可能造成不必要的损失。

3. 停止损失设置的位置和比例对盈亏结果影响很大。如果设置的止损过小,则有被套的风险;而如果设置的止损过大,则单笔损失可能过重。这需要充分测试来找到最佳参数。

4. 移动平均线作为趋势跟踪指标,在价格快速反转的时候,其指示效用会打折扣。策略可能没来得及止损就被价格翻转击中,造成较大亏损。

对应的解决方法如下:

1. 针对剧烈震荡行情,可以适当调整移动平均线的参数,使用低 parameter 的 EMA 和 SMA,减少交叉次数。

2. 增加 MACD 零轴上下突破的过滤条件,可以一定程度上减少假突破。也可以考虑加入其他指标进行组合,如 KDJ、BOLL 等。

3. 停止损失位置和比例的设置需要充分回测优化,找到最优参数。在此基础上也要考虑持续监控和动态调整。

4. 可以设置价格快速反转的识别机制。当发现异常反转时,采取缩小仓位或暂停交易策略的应急措施,控制风险敞口。

## 优化方向  

双均线交叉趋势策略还有进一步优化的空间,主要集中在以下几个方面:

1. 测试更多的指标进行组合,寻找更优的参数。例如引入BOLL通道,考虑波动率的影响等。

2. 优化移动平均线的长度参数,找到不同市场条件下的最佳参数组合。参数滚动优化也是一种选择。

3. 更科学合理地设置止盈止损策略。如引入跟踪止损,或根据历史统计结果设定动态风险回报比等。这可以进一步提高策略稳定性。

4. 建立价格异常反转的自动识别与应急机制。在极端行情中主动缩小仓位或暂停策略,避免巨额亏损。

5. 对交易品种进行扩展,如外汇、数字货币等其他品种。测试不同品种的参数健壮性,拓宽策略适用范围。

6. 优化策略的资金管理策略,如定额交易、固定仓位比例等。控制单笔损失风险,使整体资金曲线更加平稳。

## 总结

双均线交叉趋势策略综合考量多重因素,在发出交易信号时需要价格、趋势和动量多个指标的支持,从而确保信号的可靠性。策略还采用移动止损止盈,可以有效控制单笔交易的风险。该策略参数设置灵活,实用性强,适合用于自动化交易。

然而,任何策略都不可能完美。本策略在应用中也会遇到一些困难,如频繁交易、假突破和止损位置设置等问题。这需要我们从优化参数组合、引入新的技术指标组合、改进止损机制等多方面着手,进一步增强策略的稳健性和盈利能力。

总体来说,双均线交叉趋势策略形成了一个相对完整和严谨的交易体系。在以后的研究和应用中,通过持续优化和改进,该策略有望发挥更大的实战价值。

||

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

[/trans]

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
