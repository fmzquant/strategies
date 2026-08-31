
> Name

MACD-Robot-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11fb6a9203eba221a41.png)


### Overview

This strategy is called MACD Robot Trading Strategy. It determines the timing of buying and selling in the market by calculating the relationship between the MACD indicator's fast line and slow line, and adopts trailing stop loss to control risks.

### Strategy Principle 

This strategy is mainly developed based on the MACD indicator. The MACD indicator consists of a fast line and a slow line. The fast line is a short-term moving average and the slow line is a long-term moving average. The relationship between the two reflects the state of buying and selling in the market. When the fast line crosses above the slow line, it is a buy signal, and when it crosses below, it is a sell signal.

In this strategy, the fast line and slow line are calculated using the EMA algorithm respectively, and the periods can be customized. In order to improve the signal quality, a signal line is added, which uses the EMA algorithm to smooth the MACD value again.

When determining the timing of buying, check not only the golden cross of fast and slow lines, but also whether the absolute value of MACD is greater than the customized buy line. If yes, a buy signal is issued and trailing stop loss is used to control risks.

When determining the timing of selling, the death cross of fast and slow lines and the signal line being positive are required to be met at the same time, then a sell signal is issued to close the position.

### Advantage Analysis 

The strategy has the following advantages:

1. Using MACD indicator to determine trading signals with high reliability   
2. Increasing signal line improves signal quality
3. Trailing stop loss effectively controls risks
4. Customizable buy line adjusts strategy sensitivity  
5. All conditions are based on indicator calculation, not affected by external factors


### Risk Analysis

The strategy also has some risks:

1. MACD indicator has lagging, may miss short-term trading opportunities  
2. Improper setting of stop loss point may cause unnecessary losses
3. Parameter Tuning requires a lot of time for testing and adjustment 
4. Impact of transaction costs and slippage

These risks can be reduced by appropriately adjusting parameters, combining other indicators, etc.

### Optimization Directions

The strategy can be optimized in the following directions:

1. Combine with other indicators to filter signals, such as KDJ, RSI, etc. 
2. Add machine learning algorithms to determine entry and exit points
3. Use dynamic stop loss instead of static stop loss
4. Test and optimize MACD parameters and buy line
5. Consider the impact of transaction costs to adjust strategy

### Conclusion

Overall, this is a trend-following strategy with high reliability. By judging the trend through MACD indicator and controlling risks with trailing stop loss, stable investment returns can be obtained. NEXT STEP is to further optimize parameters, combine other indicators, and incorporate machine learning to improve strategy profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast moving average|
|v_input_2|26|Slow moving average|
|v_input_3|12|Fast Length|
|v_input_4|26|Slow Length|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|9|Signal Smoothing|
|v_input_7|false|Simple MA(Oscillator)|
|v_input_8|false|Simple MA(Signal Line)|
|v_input_9|-0.00045|Enter Long|
|v_input_10|0.0001|Close Long|
|v_input_11|0.05|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(shorttitle = "GBPUSD MACD", title = "GBPUSD MACD")
fastMA = input(title="Fast moving average",  defval = 12, minval = 7)
slowMA = input(title="Slow moving average",  defval = 26, minval = 7)
lastColor = yellow
[currMacd,_,_] = macd(close[0], fastMA, slowMA, 9)
[prevMacd,_,_] = macd(close[1], fastMA, slowMA, 9)
plotColor = currMacd > 0 ? currMacd > prevMacd ? lime : green : currMacd < prevMacd ? maroon : red
plot(currMacd, style = histogram, color = plotColor, linewidth = 3)
plot(0, title = "Zero line", linewidth = 1, color = gray)

//MACD
// Getting inputs
fast_length = input(title="Fast Length",  defval=12)
slow_length = input(title="Slow Length",  defval=26)
src = input(title="Source", defval=close)
signal_length = input(title="Signal Smoothing",  minval = 1, maxval = 50, defval =9)
sma_source = input(title="Simple MA(Oscillator)", type=bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=bool, defval=false)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal

//plot(hist, title="Histogram", style=columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
plot(macd, title="MACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)
///END OF MACD

//Long and Close Long Lines
linebuy = input(title="Enter Long", type=float, defval=-0.00045)
linesell = input(title="Close Long", type=float, defval=0.0001)

//Plot Long and Close Long Lines
plot(linebuy,color=green),plot(linesell,color=red)


//Stop Loss Input
sl_inp = input(0.05, title='Stop Loss %', type=float)/100


//Order Conditions
longCond = crossover(currMacd, linebuy)
exitLong = crossover(currMacd, signal) and signal > 0
stop_level = strategy.position_avg_price * (1 - sl_inp)


//Order Entries
strategy.entry("long", strategy.long,  when=longCond==true)
strategy.close("long", when=exitLong==true)
strategy.exit("Stop Loss", stop=stop_level)
```

> Detail

https://www.fmz.com/strategy/435768

> Last Modified

2023-12-18 17:30:15
