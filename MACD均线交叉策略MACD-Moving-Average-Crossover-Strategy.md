
> Name

MACD均线交叉策略MACD-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

该策略融合MACD指标和移动平均线指标,在二者给出同向信号时进行做多交易。

具体交易逻辑是:

1. 计算FAST MACD值,一般取12日指数移动平均线

2. 计算SLOW MACD值,一般取26日指数移动平均线 

3. MACD值为FAST减SLOW

4. 计算MACD的信号线,一般取9日移动平均线

5. 计算9日与26日移动平均线

6. 当MACD上穿信号线时,考虑做多

7. 当9日均线上穿26日均线时,进行做多

8. 当MACD下穿信号线且9日均线下穿26日均线时,平仓

该策略充分发挥MACD的超买超卖判断和均线的趋势跟踪能力,结合二者进行交易,以提高成功率。

## 策略优势

- MACD判断超买超卖,均线判断趋势

- 二者组合验证,提供高概率做多机会 

- 操作规则清晰,易于实施

## 策略风险

- 需反复测试确定最佳参数

- 仅做多,无法利用空头机会

- 随大趋势做多,可能扩大损失

## 总结

该策略充分发挥MACD和均线指标的优势,组合二者判断市场节奏。但仅做多和参数优化等问题需注意。

||

## Strategy Logic

This strategy combines the MACD indicator with moving averages, going long when both give aligned signals.

The logic is:

1. Compute FAST MACD, typically 12-day EMA 

2. Compute SLOW MACD, typically 26-day EMA

3. MACD is FAST minus SLOW 

4. Signal line is typically 9-day MA of MACD

5. Compute 9-day and 26-day MAs

6. Consider long when MACD crosses above signal line

7. Go long when 9-day MA crosses above 26-day MA

8. Close long when MACD crosses below signal line and 9-day MA crosses below 26-day MA

The strategy taps MACD’s overbought-oversold gauge and MA’s trend following ability, combining both for higher odds trades. 

## Advantages

- MACD judges overbought/oversold, MA determines trend

- Combination provides high-probability long opportunities

- Clear rules easy to implement

## Risks

- Requires optimization to determine best parameters

- LONG-only unable to use short opportunities

- With-trend trades may magnify losses

## Summary

This strategy utilizes MACD and MA’s strengths in judging market rhythm. But LONG-only limitations and parameter optimization warrant caution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Signal Smoothing|
|v_input_5|false|Simple MA(Oscillator)|
|v_input_6|false|Simple MA(Signal Line)|
|v_input_7|2019|From Year|
|v_input_8|true|From Month|
|v_input_9|true|From Day|
|v_input_10|9999|To Year|
|v_input_11|12|To Month|
|v_input_12|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=4
strategy("MACD Cross+MA", overlay=true)
//@version=4
// Getting inputs
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false)
// === INPUT BACKTEST RANGE ===
FromYear  = input(defval = 2019, title = "From Year", minval = 2009)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2009)
ToMonth   = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 31, title = "To Day", minval = 1, maxval = 31)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false // create function "within window of time"


// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal
//plot
plot(sma(close,9),color=color.red)
plot(sma(close,26),color=color.green)
//Condition
BMacdcondition= (macd>signal)
SMacdcondition= (macd<signal)
longCondition = crossover(sma(close, 9), sma(close, 26))
shortCondition = crossunder(sma(close, 9), sma(close, 26))
//entry
if (BMacdcondition) and window()
    (longCondition)
    strategy.entry("LONG", strategy.long)
if (shortCondition) and window()
    (SMacdcondition)
    strategy.close("LONG", qty_percent=100 , comment="หนีตาย")
```

> Detail

https://www.fmz.com/strategy/426816

> Last Modified

2023-09-14 17:03:47
