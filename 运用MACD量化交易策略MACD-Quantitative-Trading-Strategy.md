
> Name

运用MACD量化交易策略MACD-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18fe6a324151e70da81.png)

[trans]

#### 概述
本策略运用MACD指标构建长线交易信号,在MACD指标低于特定水平时做多,利用反转交易机会获利。

#### 策略原理
当MACD指标线低于 SIGNAL信号线且MACD绝对值低于-0.00025时产生做多信号。做多后,如果MACD线重新上穿SIGNAL线则平仓。

本策略利用MACD指标检测超卖区间,根据均线理论,股价短期内存在反转概率,根据这个概率建立做多信号。

#### 策略优势
1. 利用MACD指标判断超卖区间,具有一定的可靠性。
2. 简单的交易信号和规则,容易实施。
3. 长线持仓,不频繁交易,降低交易成本和滑点损失。

#### 策略风险
1. 反转失败风险。如果没有反转就会亏损。
2. 参数不当导致失效。MACD参数设置不当会导致产生错误信号。

可以通过优化参数减小此风险。

#### 策略优化
1. 优化MACD参数,找到最佳参数组合。
2. 测试不同持仓时间,找到最佳持仓周期。
3. 增加止损机制。

#### 总结
本策略利用MACD指标判断超卖区间形成的反转概率建立做多信号,通过长线持仓方式获利。MACD参数优化和止损机制增加可靠性。总体来说,利用较为简单的指标和规则构建了一个易于理解和实施的量化策略。

||

#### Overview
This strategy uses the MACD indicator to build long position trading signals when the MACD is below a certain level to take advantage of mean reversion opportunities.  

#### Strategy Logic
A long signal is generated when the MACD line is below the SIGNAL line and the absolute value of MACD is below -0.00025. After taking a long position, if the MACD line crosses above the SIGNAL line again, the position will be closed.

This strategy utilizes the MACD indicator to detect oversold zones. According to the theory of moving averages, there is a probability of mean reversion in the short term, and a long signal is established based on this probability.

#### Advantages
1. Utilizes the MACD indicator to judge oversold levels, which has a certain reliability. 
2. Simple trading signals and rules that are easy to implement.
3. Long holding periods means less frequent trading, reducing transaction costs and slippage.

#### Risks
1. Risk of failed mean reversion. It will lead to losses if no reversion happens.  
2. Invalid signals from poor MACD parameter selection.

This risk can be reduced through parameter optimization.

#### Enhancements  
1. Optimize MACD parameters to find best combinations.
2. Test different holding periods to find optimal duration.  
3. Add stop loss mechanisms.

#### Summary
This strategy utilizes the probability of mean reversions from oversold levels identified by the MACD indicator to generate long signals, and profits through long holding periods. Optimizing MACD parameters and adding stop losses improves reliability. In summary, it uses relatively simple indicators and rules to construct an easy to understand and implement quantitative strategy.

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


> Source (PineScript)

``` pinescript
//@version=3
strategy(title="MACD - EURUSD", shorttitle="MACD EURUSD")

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

plot(hist, title="Histogram", style=columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
plot(macd, title="MACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)

longCond = crossover(macd, signal) and macd < -0.00025
exitLong = crossover(macd, hist)


strategy.entry("long", strategy.long,  when=longCond==true)
strategy.close("long", when=exitLong==true)
```

> Detail

https://www.fmz.com/strategy/435884

> Last Modified

2023-12-19 15:11:57
