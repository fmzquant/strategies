
> Name

顺势突破ADX过滤交易策略Momentum-Breakout-Strategy-with-ADX-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/179ae7c4ef9e2048aa3.png)
[trans]

## 概述

本策略是一个利用ADX指标来过滤突破信号的短线交易策略。当价格突破 Bollinger 布林带上轨,且 ADX 在下降时,做空;当价格突破 Bollinger 布林带下轨,且 ADX 在上升时,做多。该策略同时设置止损和止盈,全自动交易。

## 策略原理

本策略使用 Bollinger 布林带作为主要的突破信号。布林带上下轨代表了价格的两倍标准差,价格突破布林带通常代表价格进入强趋势阶段。另外,为了避免虚假突破,本策略新增了 ADX 指标作为过滤条件。只有当 ADX 下降时才考虑布林带上轨突破;只有当 ADX 上升时才考虑布林带下轨突破。这样可以过滤掉部分震荡行情中的假突破。 

具体来说,本策略使用长度为 33 周期的收盘价计算布林带。布林带中轨线为收盘价的 33 周期简单移动平均线,上下轨分别是中轨上下两个标准差。指标参数设置为当收盘价跌破上轨,且 8 周期 ADX 小于 15 周期 ADX 时做空;当收盘价突破下轨,且 8 周期 ADX 大于 15 周期 ADX 时做多。平仓设置为止盈 800 个点,止损 400 个点。

## 优势分析

这是一个结合趋势和次数指标过滤信号的突破策略,有以下几个优势:

1. 使用布林带判断趋势突破点,比较符合大部分交易者的习惯。
2. 增加 ADX 条件过滤,可以减少趋势震荡期间的虚假突破带来的损失。
3. 策略操作简单,容易理解和优化。
4. 自动设置止损止盈,无需人工干预,适合算法交易。

## 风险分析

本策略也存在一些风险:

1. 布林带参数设置不当可能导致信号过于频繁,交易成本增加。
2. ADX 设置不当也可能过滤掉部分有效信号。
3. 止损距离可能过大,单笔损失扩大。

为了降低这些风险,我们可以调整布林带参数,缩小布林带范围;调整 ADX 周期参数,避免过度过滤信号;适当缩小止损距离,控制单笔损失。当然,这些优化都需要经过回测验证,避免过拟合。

## 优化方向  

本策略还有进一步优化的空间:

1. 可以测试不同市场的数据,寻找最优参数组合。
2. 可以结合其他指标进一步过滤信号,例如交易量,Moving Average 等。
3. 可以采用机器学习的方法自动优化参数。
4. 可以考虑动态止损和止盈。

## 总结

本策略整体来说是一个简单实用的突破过滤策略。通过布林带判断趋势,ADX 过滤信号,可以在一定程度上规避震荡市的噪音,抓住趋势机会。优化空间还很大,值得进一步测试和改进。

||

## Overview  

This is a short-term trading strategy that utilizes the ADX indicator to filter breakout signals. It goes short when price breaks above the Upper Bollinger Band and ADX is falling, and goes long when price breaks below the Lower Bollinger Band and ADX is rising. The strategy also sets stop loss and take profit automatically for fully automated trading.

## Strategy Logic

The core of this strategy is using Bollinger Bands for breakout signals. The upper and lower bands of Bollinger Bands represent two standard deviations of price, so breakouts usually imply that price is entering a strong trend. Additionally, the ADX indicator is introduced here as a filter to avoid false breakouts. Short signals are only considered when ADX is falling while long signals are only considered when ADX is rising. This helps filtering out some whipsaws during range-bound periods.

Specifically, this strategy calculates Bollinger Bands using 33 periods of closing prices. The middle band is a 33-period simple moving average, and the upper/lower bands are placed at two standard deviations above/below the middle band. The strategy signals short when price closes below the upper band and 8-period ADX is below 15-period ADX. It signals long when price closes above the lower band and 8-period ADX is above 15-period ADX. Exits are set at 800 points profit and 400 points stop loss.  

## Advantage Analysis

As a breakout strategy incorporating trend and momentum filters, it has several advantages:

1. Using Bollinger Bands to detect breakouts aligns with most traders’ habits.  
2. The additional ADX filter helps avoid losses from whipsaws.
3. The logic is simple and easy to understand and optimize.  
4. The automated stop loss and take profit facilitates algorithm trading.

## Risk Analysis

There are also some risks with this strategy:  

1. Improper BB parameters may generate over-frequent signals and increase costs.
2. Improper ADX parameters could filter out valid signals. 
3. The stop loss distance may be too wide leading to large losses.

To mitigate these risks, we can fine-tune the BB parameter to narrow the bands, adjust the ADX periods to avoid over-filtering, and reduce the stop loss to control single-trade loss. Of course, these optimizations need to be walk-forward tested to prevent overfitting.

## Optimization Directions

There is room for further optimization:

1. Test on different market data to find the optimal parameter set.
2. Incorporate other indicators like volume and Moving Average for signal filtering.
3. Utilize machine learning methods to auto-optimize parameters. 
4. Consider dynamic stop loss and take profit.

## Conclusion

In conclusion, this is a simple and practical breakout strategy with filter. Identifying trends with BBs and filtering signals with ADX help avoid noise during range-bound periods and capture trend opportunities to some extent. There is still large room for further testing and improvement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|33|Length|
|v_input_2|2|Mult|
|v_input_3|4|ADX_Length|
|v_input_4|8|v_input_4|
|v_input_5|15|v_input_5|
|v_input_6|800|Take_Profit|
|v_input_7|400|Stop_Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Hizbullah XAUUSD Sniper", overlay=true)

Price = close

Length = input(33)
Mult = input(2)
Basis = sma(Price, Length)
StdDev = Mult * stdev(Price, Length)
Upper = Basis + StdDev
Lower = Basis - StdDev

ADX_Length = input(4)
TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
SmoothedTrueRange = sma(TrueRange, ADX_Length)
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0
SmoothedDirectionalMovementPlus = sma(DirectionalMovementPlus, ADX_Length)
SmoothedDirectionalMovementMinus = sma(DirectionalMovementMinus, ADX_Length)
DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = abs(DIPlus - DIMinus) / (DIPlus + DIMinus)*100
SmoothedADX1 = ema(DX, input(8))
SmoothedADX2 = ema(DX, input(15))

Condition1 = crossunder(Price, Upper) and SmoothedADX1 < SmoothedADX2

Take_Profit = input(800)
Stop_Loss = input(400)

strategy.entry("ShortEntry", true, when = Condition1)
strategy.exit("ShortExit", "ShortEntry", profit = Take_Profit, loss = Stop_Loss)

```

> Detail

https://www.fmz.com/strategy/437672

> Last Modified

2024-01-04 17:12:30
