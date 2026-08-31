
> Name

线性MACD解锁交易视图中线性回归的魔力Linear-MACD-Unlocking-the-Magic-of-Linear-Regression-in-TradingView

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1309afcc075cbc7cb6e.png)

Strategy Name: Momentum-driven Linear MACD Strategy  

Overview: This is a quantitative strategy that utilizes linear regression to predict stock prices combined with the MACD indicator. It leverages linear regression analysis on historical prices and volumes to forecast future price trends. It then uses the MACD indicator to determine entry timing when profit opportunities emerge.   

Strategy Principle:  
1. Calculate linear regression coefficients of prices: Fit a linear regression line based on historical volumes to predict future prices.   
2. Plot predicted prices: Plot the prediction line based on regression coefficients from Step 1.   
3. Generate buy signals: When predicted price is between open and close prices, and MACD is rising, produce buy signals.  
4. Generate sell signals: When MACD is falling and price is below predicted price, generate sell signals.

Advantage Analysis: 
This strategy combines statistical prediction and technical indicator judgment. It derives price prediction using linear regression, avoiding subjective speculation. Meanwhile, MACD indicator can effectively determine market momentum and capture opportunities accurately. Overall, this strategy has high systematic level, accurate prediction, and controllable risks.   

Risk Analysis:  
Linear regression relies solely on historical data and may generate incorrect signals in response to black swan events like significantly bearish news. Also, parameter settings like regression period lengths impact strategy performance. We suggest using vwma to smooth the predicted price curve to mitigate curve jitters that affect the strategy.  

Optimization Directions:  
We believe this strategy can be optimized in the following aspects:  
1. Incorporate stop loss mechanism. Cut losses when price breaks through stop loss lines by closing positions. This effectively controls losses caused by occasional incorrect signals.
2. Introduce machine learning models. Adopt more efficient models to improve prediction accuracy.  
3. Incorporate sentiment indicators. Include fear indices to determine market sentiment and improve win rate. 
4. Combine multiple timeframes. Validating predictions across periods could form a combined strategy to overcome limitations of a single timeframe.   

Conclusion:  
This strategy generates systematic trading signals by predicting prices with linear regression and determining entries with MACD indicator. Its advantages include clear predictive logic, controllable risks, and ample optimization space. We believe its performance will continue to excel through continuous optimizations and iterations. It provides inspirations on leveraging scientific prediction models to conduct quantitative trading and deserves further research and applications.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_string_1|0|Risk tolerance: LOW|HIGH|
|v_input_int_1|9|Signal Smoothing|
|v_input_string_2|0|Oscillator MA Type: EMA|SMA|
|v_input_string_3|0|Signal Line MA Type: EMA|SMA|
|v_input_3|21|Lookback|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-07 00:00:00
end: 2023-12-14 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © stocktechbot

//@version=5
strategy("Linear On MACD", overlay=true, margin_long=100, margin_short=100)



fast_length = input(title="Fast Length", defval=12)
slow_length = input(title="Slow Length", defval=26)
tolerance = input.string(title="Risk tolerance", defval = "LOW", options=["LOW", "HIGH"])

chng = 0
obv = ta.cum(math.sign(ta.change(close)) * volume)
if close < close[1] and (open < close)
    chng := 1
else if close > close[1]
    chng := 1
else
    chng := -1
obvalt = ta.cum(math.sign(chng) * volume)
//src = input(title="Source", defval=close)
src = obvalt
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9)
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"])
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])

// Calculating
fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal
//hline(0, "Zero Line", color=color.new(#787B86, 50))
//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below)))
//plot(macd, title="MACD", color=col_macd)
//plot(signal, title="Signal", color=col_signal)
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)

//Linear Regression

vol = volume

// Function to calculate linear regression
linregs(y, x, len) =>
    ybar = math.sum(y, len)/len
    xbar = math.sum(x, len)/len
    b = math.sum((x - xbar)*(y - ybar),len)/math.sum((x - xbar)*(x - xbar),len)
    a = ybar - b*xbar
    [a, b]

// Historical stock price data
price = close

// Length of linear regression
len = input(defval = 21, title = 'Lookback')

// Calculate linear regression for stock price based on volume
[a, b] = linregs(price, vol, len)

// Predicted stock price based on volume
predicted_price = a + b*vol

// Check if predicted price is between open and close
is_between = open < predicted_price and predicted_price < close


// Plot predicted stock price
plot(predicted_price, color=color.rgb(218, 27, 132), linewidth=2, title="Predicted Stock Price")
plot(ta.vwma(predicted_price,len), color=color.rgb(199, 43, 64), linewidth=2, title="Predicted Stock Price")

//BUY Signal
lincrossunder = close > predicted_price
macdrise = ta.rising(macd,2)
//macdvollong = ta.crossover(macd, signal)
//macdlong = ta.crossover(macdLine, signalLine)
macdvollong = macd > signal
macdlong = macdLine > signalLine
longCondition=false
if macdlong and macdvollong and is_between and ta.rising(predicted_price,1)
    longCondition := true

if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)
//Sell Signal
lincrossover = close < predicted_price
macdfall = ta.falling(macd,1)
macdsell = macd < signal
shortCondition = false
risklevel = predicted_price
if (tolerance == "HIGH")
    risklevel := ta.vwma(predicted_price,len)


if macdfall and macdsell and (macdLine < signalLine) and (close < risklevel)
    shortCondition := true


if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)

```

> Detail

https://www.fmz.com/strategy/435467

> Last Modified

2023-12-15 10:22:50
