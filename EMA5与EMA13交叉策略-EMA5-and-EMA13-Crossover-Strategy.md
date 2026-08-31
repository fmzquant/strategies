
> Name

EMA5与EMA13交叉策略-EMA5-and-EMA13-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c385d9fa6a616d7116.png)


#### Overview
This strategy uses the crossover of the 5-day Exponential Moving Average (EMA5) and the 13-day Exponential Moving Average (EMA13) to generate trading signals. When EMA5 crosses above EMA13, it generates a long signal; when EMA5 crosses below EMA13, it generates a short signal. The strategy aims to capture short-term trend changes and uses the crossover of two moving averages to determine entry and exit points.

#### Strategy Principle
The core of this strategy is to use the crossover of two Exponential Moving Averages (EMAs) with different periods to generate trading signals. EMA is a commonly used technical indicator that assigns higher weights to more recent price data, making it more responsive to price changes compared to Simple Moving Average (SMA). When the short-term EMA (e.g., EMA5) crosses above the long-term EMA (e.g., EMA13), it indicates an increase in upward price momentum, generating a long signal; conversely, when the short-term EMA crosses below the long-term EMA, it indicates an increase in downward price momentum, generating a short signal.

#### Strategy Advantages
1. Simple and easy to understand: The strategy only uses two EMA indicators, making it simple, easy to understand, and implement.
2. High adaptability: By adjusting the EMA period parameters, the strategy can adapt to different market environments and trading instruments.
3. High timeliness: Compared to SMA, EMA responds more promptly to price changes, helping to quickly capture trend changes.
4. Scalability: Based on this strategy, other technical indicators or fundamental factors can be combined to further optimize strategy performance.

#### Strategy Risks
1. False signals: In choppy markets or when trends are unclear, EMA crossovers may generate more false signals, leading to frequent trades and capital losses.
2. Lag: Although EMA has less lag compared to SMA, there is still some lag, which may miss the best entry points.
3. Lack of stop-loss: The strategy does not set explicit stop-loss conditions, which may lead to significant losses when the market reverses.
4. Parameter optimization: The selection of EMA period parameters needs to be optimized based on different markets and instruments, otherwise it may affect strategy performance.

#### Strategy Optimization Directions
1. Add trend filtering: In addition to EMA crossover signals, combine long-term trend indicators (such as EMA50) for trend filtering to reduce false signals.
2. Set stop-loss: Set dynamic stop-loss based on indicators such as ATR, or use fixed percentage stop-loss to control the maximum loss of a single trade.
3. Optimize parameters: Through backtesting on historical data, optimize EMA period parameters to find the most suitable parameter combination for the current market and instrument.
4. Combine with other indicators: Use in combination with other technical indicators (such as RSI, MACD, etc.) to improve signal confirmation and reliability.

#### Summary
The EMA5 and EMA13 crossover strategy is a simple and easy-to-use trend-following strategy that captures changes in price trends through the crossover of two EMAs with different periods. The advantages of this strategy are simplicity, high adaptability, and high timeliness, but it also has risks such as false signals, lag, and lack of stop-loss. To further optimize strategy performance, one can consider adding trend filtering, setting stop-loss, optimizing parameters, and combining with other technical indicators. In practical application, it needs to be adjusted and optimized according to specific market conditions and trading instruments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-11 00:00:00
end: 2024-05-16 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Milankacha

//@version=5
strategy('5-13 EMA by Naimesh ver04', overlay=true)

qty = input(1, 'Buy quantity')

testStartYear = input(2021, 'Backtest Start Year')
testStartMonth = input(1, 'Backtest Start Month')
testStartDay = input(1, 'Backtest Start Day')
testStartHour = input(0, 'Backtest Start Hour')
testStartMin = input(0, 'Backtest Start Minute')
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, testStartHour, testStartMin)
testStopYear = input(2099, 'Backtest Stop Year')
testStopMonth = input(1, 'Backtest Stop Month')
testStopDay = input(30, 'Backtest Stop Day')
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)
testPeriodBackground = input(title='Color Background?', defval=true)
testPeriodBackgroundColor = testPeriodBackground and time >= testPeriodStart and time <= testPeriodStop ? #00FF00 : na
testPeriod() => true


ema1 = input(5, title='Select EMA 1')
ema2 = input(13, title='Select EMA 2')
//ema3 = input(50, title='Select EMA 3')
//SL = input(70, title='Stoploss')
//TR = input(250, title='Target')

expo = ta.ema(close, ema1)
ma = ta.ema(close, ema2)
//EMA_50 = ta.ema(close, ema3)

//avg_1 = avg (expo, ma)
//s2 = ta.cross(expo, ma) ? avg_1 : na
//plot(s2, style=plot.style_line, linewidth=3, color=color.red, transp=0)

p1 = plot(expo, color=color.rgb(231, 15, 15), linewidth=2)
p2 = plot(ma, color=#0db63a, linewidth=2)
fill(p1, p2, color=color.new(color.white, 80))

longCondition = ta.crossover(expo, ma)

shortCondition = ta.crossunder(expo, ma)


if testPeriod()
    //strategy.entry('Long', strategy.long, when=longCondition)
    strategy.entry('Short', strategy.short, when=expo<ma)

//strategy.close("Long", expo<ma, comment= 'SL hit')
strategy.close("Short", expo>ma, comment= 'SL hit')



//plotshape(longCondition and close>EMA_50, title='Buy Signal', text='B', textcolor=color.new(#FFFFFF, 0), style=shape.labelup, size=size.normal, location=location.belowbar, color=color.new(#1B8112, 0))
//plotshape(shortCondition and close<EMA_50, title='Sell Signal', text='S', textcolor=color.new(#FFFFFF, 0), style=shape.labeldown, size=size.normal, location=location.abovebar, color=color.new(#FF5733, 0))


```

> Detail

https://www.fmz.com/strategy/451729

> Last Modified

2024-05-17 15:28:17
