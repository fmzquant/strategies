
> Name

Ichimoku-Entries-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ca547c55c87963664e.png)

### Overview  

The Ichimoku Entries is a quantitative strategy that identifies trend direction using Ichimoku cloud charts, and generates trading signals in combination with Bollinger Bands and RSI indicators. This strategy mainly determines whether the market is currently in an uptrend or downtrend based on the golden cross or death cross of the Tenkan Line and Kijun Line, and thus produces entry signals for long and short positions.

### Strategy Logic   

The core of this strategy lies in the two important lines of the Ichimoku cloud chart - Tenkan Line and Kijun Line. The Tenkan Line is the average of the highest high and lowest low over the last 9 days, representing the short-term trend. The Kijun Line is the average of the highest high and lowest low over the last 26 days, representing the medium to long-term trend. When the Tenkan Line crosses above the Kijun Line, it signals an entry to go long. When the Tenkan Line falls below the Kijun Line, it signals an entry to go short. This judgments the current trend direction.

In addition to the Ichimoku cloud, the strategy also looks at the Bollinger Bands and RSI indicator to generate trading signals. It is considered a sign of abnormal price activity when the closing price breaks through the upper or lower Bollinger Bands. Filtering out some false breakouts by incorporating the RSI indicator to determine overbought or oversold conditions, valid entry signals can thus be produced.

On the exit logic, the strategy checks whether the Bollinger Bands breakout is successful and if the Trade Proximity Oscillator crosses the 0-axis, to decide on locking in profits or stopping losses.

### Advantage Analysis   

The biggest advantage of this strategy is that it combines trend determination and abnormal price fluctuations to ascertain trade direction. The Ichimoku cloud clearly reveals the trend, while Bollinger Bands capture anomalies. RSI effectively filters out false breakouts. The use of multiple coordinated indicators makes the trading signals more reliable. In addition, the stop loss and take profit logic helps lock in profits and avoid huge losses.

### Risk Analysis   

Despite having the edge to identify trends and anomalies, the strategy still poses some risks. Because it trades along with trends, plenty of false signals may emerge in ranging markets. Improper parameter settings can also deteriorate the strategy's performance. Stepwise optimization is recommended to test different parameter combinations and find the optimum values.

### Optimization Directions  

The strategy can be upgraded in the following aspects:

1. Test different parameter combinations, like Bollinger period, RSI period, etc.
2. Introduce machine learning models, dynamically output parameters based on historical data.  
3. Incorporate information flow to determine market emotion, avoid wrong moves at critical moments. 
4. Add conditional stop loss methods, like trailing stop, to preserve profits.


### Conclusion   

The Ichimoku Entries Strategy is a multi-indicator integrated trend trading strategy. By judging both trend direction and price abnormalities, it captures market rhythm fairly reliably. Although there is room for improvement, overall speaking this is a strategy with consistent performance and controllable risks. Parameter tuning and introduction of machine learning could make this strategy even more outstanding.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|20|Bollinger Bands Length|
|v_input_3|2|Bollinger Bands Multiplier|
|v_input_4|true|Stop Loss Percentage|
|v_input_5|2|Take Profit Percentage|
|v_input_6|14|Channels Length|
|v_input_7|2|Channels Multiplier|
|v_input_8|14|ATR Length|
|v_input_9|1.5|Threshold Percentage (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-30 00:00:00
end: 2024-01-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("ichi strategy", overlay=true)

// Input parameters
rsiLength = input(14, title="RSI Length")
bbLength = input(20, title="Bollinger Bands Length")
bbMultiplier = input(2, title="Bollinger Bands Multiplier")
stopLossPct = input(1, title="Stop Loss Percentage")
takeProfitPct = input(2, title="Take Profit Percentage")

// Calculate Ichimoku Cloud components
tenkan = ta.sma(high + low, 9) / 2
kijun = ta.sma(high + low, 26) / 2
senkouA = (tenkan + kijun) / 2
senkouB = ta.sma(high + low, 52) / 2

// Bollinger Bands
basis = ta.sma(close, bbLength)
upperBB = basis + bbMultiplier * ta.stdev(close, bbLength)
lowerBB = basis - bbMultiplier * ta.stdev(close, bbLength)

// RSI
rsiValue = ta.rsi(close, rsiLength)

// Trade Proximity Oscillator
length = input(14, title="Channels Length")
multiplier = input(2, title="Channels Multiplier")
atr_length = input(14, title="ATR Length")
threshold_percentage = input(1.5, title="Threshold Percentage (%)")

ma = ta.sma(close, length)
std_dev = ta.stdev(close, length)
upper_band = ma + multiplier * std_dev
lower_band = ma - multiplier * std_dev
distance_upper = close - upper_band
distance_lower = lower_band - close
atr_value = ta.atr(atr_length)
threshold = atr_value * threshold_percentage
oscillator = distance_upper - distance_lower

// Strategy logic
longCondition = close > upperBB and tenkan > kijun and ta.crossover(close, basis) and rsiValue < 70
shortCondition = close < lowerBB and tenkan < kijun and ta.crossunder(close, basis) and rsiValue > 30

strategy.entry("Long", strategy.long, when = longCondition)
strategy.entry("Short", strategy.short, when = shortCondition)

// Exit logic
longExitCondition = close < upperBB and ta.crossover(oscillator, 0)
shortExitCondition = close > lowerBB and ta.crossunder(oscillator, 0)

strategy.exit("Take Profit/Stop Loss", from_entry="Long", loss=close - close * stopLossPct / 100, profit=close + close * takeProfitPct / 100, when = longExitCondition)
strategy.exit("Take Profit/Stop Loss", from_entry="Short", loss=close + close * stopLossPct / 100, profit=close - close * takeProfitPct / 100, when = shortExitCondition)

// Plotting
plot(senkouA, color=color.green, title="Senkou A")
plot(senkouB, color=color.red, title="Senkou B")
plot(upperBB, color=color.blue, title="Upper Bollinger Band")
plot(lowerBB, color=color.blue, title="Lower Bollinger Band")

// Additional Plots
plot(tenkan, color=color.orange, title="Tenkan")
plot(kijun, color=color.purple, title="Kijun")


```

> Detail

https://www.fmz.com/strategy/440546

> Last Modified

2024-01-31 15:23:21
