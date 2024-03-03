
> Name

基于布林带和斐波那契回撤比的交易策略Bollinger-Bands-Fibonacci-Retracement-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用布林带确定价格通道,并结合斐波那契回撤比判断支持阻力位,实现自动化交易。策略识别布林带突破并追踪回撤点,在高概率回调区域进行买入或卖出操纵。

## 策略原理

1. 计算布林带中的中轨、上轨和下轨

    - 利用SMA和ATR计算中轨线、上轨线和下轨线
    
    - 布林带通道随市场波动而扩展和收缩
    
2. 计算斐波那契回撤比对应的价格位

    - 取ATR与斐波那契数列比例的乘积作为回撤比例
    
    - 根据中轨计算出多个斐波那契回撤位
    
3. 监控价格突破布林带上下轨

    - 价格突破上轨时考虑做多
    
    - 价格突破下轨时考虑做空
    
4. 在斐波那契回撤位附近设置入场和止损止盈

    - 价格回调至斐波那契回撤区时入场
    
    - 在回撤区另一边设定止损止盈
    
## 优势分析

- 布林带能清晰识别市场波动范围和趋势

- 斐波那契回撤比掌握关键支持阻力区域

- 结合指标信号可实现自动交易

- 回调入场增加成功率,避免追高杀跌

- 可通过调整参数适应不同周期及品种

## 风险分析

- 布林带突破可能是假突破,产生错误信号

- 无法准确预测价格何时会回调至斐波那契位

- 停损点选取不当可能扩大亏损

- 回调幅度过大过小都会影响策略效果

- 参数不合理或市场持续方向性时策略失败

- 优化布林带判定逻辑,更多考虑量能指标,动态调整回撤区等

## 优化方向 

- 优化布林带参数以提高对趋势和支撑阻力的判断

- 增加量能指标判断突破信号有效性 

- 利用机器学习辅助判断回调概率

- 结合更多技术指标验证交易信号

- 根据品种特点和交易时段选定合理参数

- 及时调整回撤区强度适应变化的波动性

## 总结

该策略整合布林带和斐波那契回撤比指标的优势,识别趋势方向并在高概率回调点入场。通过参数优化、增加验证指标、动态调整回撤区等方式可降低风险提升效果。策略空间仍可扩展,如加入量能指标、机器学习等提高效果,在持续优化中趋于成熟。

||


## Overview

This strategy identifies price channels using Bollinger Bands and determines support/resistance levels based on Fibonacci retracement ratios for algorithmic trading. It detects Bollinger Bands breakouts, tracks retracement levels, and enters long/short positions around high-probability pullback zones.

## Strategy Logic

1. Calculating middle, upper and lower bands of Bollinger Bands

    - Middle band is SMA, upper/lower bands are SMA +/- multiples of ATR 

    - Bollinger Bands expand and contract based on market volatility

2. Calculating Fibonacci retracement levels based on ratios

    - Retracement ratios are multiples of ATR * Fibonacci ratios

    - Multiple Fib levels are calculated based on middle band

3. Monitoring price breaking out of Bollinger Bands

    - Consider going long when price breaks above upper band
    
    - Consider going short when price breaks below lower band

4. Entering trades and setting SL/TP around Fib retracement zones

    - Enter trades when price pulls back to Fib zone

    - Set stop loss and take profit on the other side of the zone

## Advantage Analysis

- Bollinger Bands clearly identify market volatility range and trends

- Fibonacci ratios grasp key support and resistance levels  

- Combining indicators allows algorithmic trading

- Pullback entries increase probability of success and avoid chasing

- Adjustable parameters adapt to different periods and products

## Risk Analysis

- Bollinger Bands breakouts may be false signals

- Difficult to predict precisely when price will retrace to Fib levels 

- Improper stop loss placement could increase losses

- Insufficient or excessive pullback magnitude affects strategy

- Ineffective parameters or persistent trending markets could invalidate strategy

- Enhancing Bollinger Bands logic, considering volume, dynamic zone adjustment, etc.

## Optimization Directions

- Optimize Bollinger Bands parameters for better trend and S/R judgment

- Add volume indicators to validate breakout signals

- Utilize machine learning for pullback probability prediction

- Incorporate more technical indicators for signal validation

- Select reasonable parameters based on product characteristics and trading sessions

- Timely adjust pullback zone strength for changing volatility

## Conclusion

This strategy combines the strengths of Bollinger Bands and Fibonacci retracements to identify trends and enter at high-probability pullback levels. Risks can be reduced and results improved by parameter optimization, additional signal validation, dynamic zone adjustment, etc. There is room for expansion by incorporating volume, machine learning models, etc. The strategy can be further refined through continuous optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|false|Offset|
|v_input_4|1.618|Fibonacci Ratio 1|
|v_input_5|2.618|Fibonacci Ratio 2|
|v_input_6|4.236|Fibonacci Ratio 3|
|v_input_7|false|Use Reverse Buy?|
|v_input_8|0|Fibonacci Buy: Fibo 1|Fibo 2|Fibo 3|
|v_input_9|false|Use Reverse Sell?|
|v_input_10|0|Fibonacci Sell: Fibo 1|Fibo 2|Fibo 3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle="BBands Fibo", title="Bollinger Bands Fibonacci Ratios", overlay=true)

length      =   input(20, minval=1, type=input.integer, title="Length")
src         =   input(close, title="Source")
offset      =   input(0, "Offset", type = input.integer, minval = -500, maxval = 500)
fibo1       =   input(defval=1.618, title="Fibonacci Ratio 1")
fibo2       =   input(defval=2.618, title="Fibonacci Ratio 2")
fibo3       =   input(defval=4.236, title="Fibonacci Ratio 3")

fiboBuyReverse = input(false, title = "Use Reverse Buy?")
fiboBuy       =   input(options = ["Fibo 1", "Fibo 2", "Fibo 3"],defval = "Fibo 1", title="Fibonacci Buy")
fiboSellReverse = input(false, title = "Use Reverse Sell?")
fiboSell       =   input(options = ["Fibo 1", "Fibo 2", "Fibo 3"],defval = "Fibo 1", title="Fibonacci Sell")

sma = sma(src, length)
atr = atr(length)

ratio1 = atr * fibo1
ratio2 = atr * fibo2
ratio3 = atr * fibo3

upper3 = sma + ratio3
upper2 = sma + ratio2
upper1 = sma + ratio1

lower1 = sma - ratio1
lower2 = sma - ratio2
lower3 = sma - ratio3

plot(sma, style=0, title="Basis", color=color.orange, linewidth=2, offset = offset)

upp3 = plot(upper3, transp=90, title="Upper 3", color=color.teal, offset = offset)
upp2 = plot(upper2, transp=60, title="Upper 2", color=color.teal, offset = offset)
upp1 = plot(upper1, transp=30, title="Upper 1", color=color.teal, offset = offset)

low1 = plot(lower1, transp=30, title="Lower 1", color=color.teal, offset = offset)
low2 = plot(lower2, transp=60, title="Lower 2", color=color.teal, offset = offset)
low3 = plot(lower3, transp=90, title="Lower 3", color=color.teal, offset = offset)

fill(upp3, low3, title = "Background", color=color.new(color.teal, 95))

targetBuy = fiboBuy == "Fibo 1" ? upper1 : fiboBuy == "Fibo 2" ? upper2 : upper3
targetBuy := fiboBuyReverse == false ? targetBuy : fiboBuy == "Fibo 1" ? lower1 : fiboBuy == "Fibo 2" ? lower2 : lower3
buy = low < targetBuy and high > targetBuy

targetSell = fiboSell == "Fibo 1" ? lower1 : fiboSell == "Fibo 2" ? lower2 : lower3
targetSell := fiboSellReverse == false ? targetSell : fiboSell == "Fibo 1" ? upper1 : fiboSell == "Fibo 2" ? upper2 : upper3
sell = low < targetSell and high > targetSell

strategy.entry("Buy", true, when = buy)
strategy.entry("Sell", false, when = sell)

```

> Detail

https://www.fmz.com/strategy/427994

> Last Modified

2023-09-27 16:52:05
