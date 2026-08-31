
> Name

MACD-BB-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1094e28bebe4661d193.png)


#### Overview
The MACD BB Breakout Strategy is a trading strategy based on the MACD indicator and Bollinger Bands. The strategy utilizes the MACD indicator to capture short-term market trends while using Bollinger Bands to determine overbought and oversold areas in the market. When the MACD indicator breaks above the upper Bollinger Band, the strategy enters a long position; when the MACD indicator breaks below the lower Bollinger Band, the strategy enters a short position. The strategy aims to capture short-term market trends and initiate trades in the early stages of trend formation.

#### Strategy Principle
The principle of the MACD BB Breakout Strategy is as follows:
1. Calculate the MACD indicator: Use a fast Exponential Moving Average (EMA) and a slow EMA to calculate the MACD indicator.
2. Calculate Bollinger Bands: Use the Simple Moving Average (SMA) of the MACD indicator and standard deviation to calculate the upper and lower Bollinger Bands.
3. Long signal: When the MACD indicator breaks above the upper Bollinger Band, the strategy enters a long position.
4. Short signal: When the MACD indicator breaks below the lower Bollinger Band, the strategy enters a short position.
5. Take Profit and Stop Loss: The strategy can set take profit and stop loss percentages to manage trading risk.

#### Strategy Advantages
1. Trend Capture: The MACD indicator can effectively capture short-term market trends, allowing the strategy to initiate trades in the early stages of trend formation.
2. Volatility Consideration: Bollinger Bands take into account price volatility, helping the strategy avoid false trading signals during increased market volatility.
3. Parameter Flexibility: The strategy's parameters, such as the MACD fast and slow period, Bollinger Bands period, and standard deviation multiplier, can be optimized and adjusted based on market characteristics.

#### Strategy Risks
1. Drawdown Risk: The strategy enters trades in the early stages of trend formation, which may expose it to significant drawdown risk.
2. Frequent Trading: If the parameters are not set properly, the strategy may generate excessive trading signals, leading to frequent trading and high transaction costs.
3. Parameter Optimization: The strategy's performance depends on the selection of parameters, and inappropriate parameters may result in poor performance.

#### Strategy Optimization Directions
1. Trend Confirmation: After generating a trading signal, additional indicators or price action can be used to confirm the validity of the trend, filtering out some false signals.
2. Dynamic Stop Loss: Adjust the stop loss position dynamically based on market volatility or price action to better control risk.
3. Parameter Adaptation: Utilize machine learning or optimization algorithms to achieve adaptive adjustment of strategy parameters to adapt to different market conditions.

#### Summary
The MACD BB Breakout Strategy combines the MACD indicator and Bollinger Bands to initiate trades in the early stages of trend formation. The strategy's strengths lie in its ability to capture short-term trends and consider price volatility. However, it also faces challenges such as drawdown risk, frequent trading, and parameter optimization. Through trend confirmation, dynamic stop loss, and parameter adaptation, the strategy's robustness and adaptability can be further enhanced.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|Take Profit %|
|v_input_float_2|true|Stop Loss %|
|v_input_int_1|10|BB Periods|
|v_input_float_3|true|Deviations|
|v_input_int_2|12|fastLength|
|v_input_int_3|26|slowLength|
|v_input_int_4|9|signalLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//AK MACD BB 
strategy("AK MACD BB strategy", overlay = true)

// Inputs for TP and SL
tp_percent = input.float(1.0, title="Take Profit %") / 100
sl_percent = input.float(1.0, title="Stop Loss %") / 100

length = input.int(10, minval=1, title="BB Periods")
dev = input.float(1, minval=0.0001, title="Deviations")

//MACD
fastLength = input.int(12, minval=1, title="fastLength") 
slowLength=input.int(26,minval=1)
signalLength=input.int(9,minval=1)
fastMA = ta.ema(close, fastLength)
slowMA = ta.ema(close, slowLength)
macd = fastMA - slowMA

//BollingerBands

Std = ta.stdev(macd, length)
Upper = (Std * dev + (ta.sma(macd, length)))
Lower = ((ta.sma(macd, length)) - (Std * dev))


Band1 = plot(Upper, color=color.gray, style=plot.style_line, linewidth=2,title="Upper Band")
Band2 = plot(Lower, color=color.gray, style=plot.style_line, linewidth=2,title="lower Band")
fill(Band1, Band2, color=color.blue, transp=75,title="Fill")

mc = macd >= Upper ? color.lime:color.red

// Indicator

plot(macd, color=mc, style =plot.style_circles,linewidth = 3, title="macd")
zeroline = 0 
plot(zeroline,color= color.orange,linewidth= 2,title="Zeroline")

//buy
barcolor(macd >Upper ? color.yellow:na)
//short
barcolor(macd <Lower ? color.aqua:na)
if macd > Upper
    strategy.entry("Long", strategy.long)
    // strategy.exit("Long TP/SL", "Long", limit=close * (1 + tp_percent), stop=close * (1 - sl_percent), comment = "Long Exit" )

if macd < Lower
    strategy.entry("Short", strategy.short)
    // strategy.exit("Short TP/SL", "Short", limit=close * (1 - tp_percent), stop=close * (1 + sl_percent), comment = "Short Exit")

```

> Detail

https://www.fmz.com/strategy/449446

> Last Modified

2024-04-25 17:16:28
