
> Name

平均随机指标交易策略Average-Stochastic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/215fb8a0482df7bb8f2.png)
[trans]


## 概述

本策略基于平均随机指标进行交易信号判断,属于趋势跟踪策略。该策略通过计算平均随机指标%K和%D的移动平均值,在它们发生金叉时做多,发生死叉时做空,属于典型的趋势跟踪策略。

## 策略原理

1. 计算平均随机指标%K和%D的值。其中%K是根据一定周期内的收盘价计算出的随机值的移动平均,反映当前价格与一定周期内的最高价和最低价的相对位置。%D是%K的移动平均,用于确认趋势。 

2. 对%K和%D分别进行指数平滑移动平均(EMA),得到平均随机指标的平均值\_avg\_k和\_avg\_d。

3. 判断交易信号:

   - 买入信号:当\_avg\_k上穿\_avg\_d,且\_avg\_d \< 20时,做多

   - 卖出信号:当\_avg\_k下穿\_avg\_d,且\_avg\_d > 80时,做空

4. 持仓管理:

   - 多单止损:当\_avg\_d \> 80时平仓

   - 空单止损:当\_avg\_d \< 20时平仓

5. 允许同向订单最大3个,属于加仓策略

## 策略优势

1. 使用双重均线判断金叉死叉,可以有效过滤假突破,提高信号质量

2. 应用平均随机指标,能够有效跟踪价格趋势

3. 结合超买超卖区间判断,可以避免在震荡行情中频繁交易

4. 允许加仓,可以在趋势行情中获得更多收益

5. 止损策略可以控制单笔损失

## 策略风险

1. 双均线交易策略容易产生频繁交易,如果交易费用过高会影响盈利

2. 使用固定止损点可能会过早止损退出趋势

3. 加仓次数过多可能会导致亏损扩大

4. 不能有效判断趋势反转点,在趋势反转时可能出现较大亏损

5. 需要优化参数周期,不同周期效果差异很大

## 优化方向

1. 可以考虑引入趋势判断指标,避免逆势交易

2. 动态调整止损点,让止损更贴合趋势

3. 优化加仓策略,例如每单递增加仓手数

4. 结合其他指标判断趋势反转,提前退出利润

5. 针对不同品种分别测试参数优化,提高参数适应性

## 总结

本策略整体来说是一个典型的趋势跟踪策略,使用平均随机指标判断趋势方向,在趋势出现时进行加仓交易。策略优势是跟踪能力强,适合趋势行情,但需要注意防止逆势交易。通过引入趋势判断、优化止损策略、控制加仓次数等方式可以进一步优化,在参数选取合适的前提下,可以获得不错的跟踪效果。

||


## Overview 

This strategy is based on the Average Stochastic Oscillator for trading signal judgment and belongs to a trend following strategy. It calculates the moving average values of %K and %D of the Average Stochastic Oscillator. When the golden cross occurs, go long. When the death cross occurs, go short. It is a typical trend following strategy.

## Strategy Logic

1. Calculate the values of %K and %D of the Average Stochastic Oscillator. %K is the moving average of random values calculated based on closing prices over a certain period, reflecting the relative position of the current price to the highest and lowest prices over a certain period. %D is the moving average of %K used to confirm the trend.

2. Exponentially smooth moving average (EMA) is applied to %K and %D respectively to obtain the average values _avg_k and _avg_d of the Average Stochastic Oscillator. 

3. Determine trading signals:

   - Buy signal: when _avg_k crosses over _avg_d and _avg_d < 20, go long.

   - Sell signal: when _avg_k crosses below _avg_d and _avg_d > 80, go short.
   
4. Position management:

   - Long stop loss: close long when _avg_d > 80

   - Short stop loss: close short when _avg_d < 20
   
5. Allow maximum 3 orders in the same direction, which is a pyramiding strategy.

## Advantages

1. Using double moving averages to determine golden cross and death cross can effectively filter false breakouts and improve signal quality.

2. Applying Average Stochastic Oscillator can effectively track price trends. 

3. Combining overbought and oversold zones helps avoid frequent trading in range-bound market.

4. Allowing pyramiding can gain more profit in trending market. 

5. Stop loss strategy controls single loss.

## Risks

1. Dual moving average trading strategies tend to generate frequent trading, which will affect profitability if transaction costs are too high.

2. Using fixed stop loss points may stop loss too early exiting the trend.

3. Too many pyramiding may enlarge the loss. 

4. It cannot effectively determine trend reversal points and may lead to large losses when trend reverses.

5. Parameter periods need to be optimized because different periods can lead to very different results.

## Optimization

1. Consider introducing trend judgment indicators to avoid counter trend trading.

2. Dynamically adjust stop loss points to fit the trend better.

3. Optimize pyramiding strategy, for example, increase position size progressively. 

4. Incorporate other indicators to judge trend reversal and exit profit early.

5. Test parameter optimization separately for different products to improve adaptability.

## Summary

In summary, this is a typical trend following strategy. It uses Average Stochastic Oscillator to determine trend direction and pyramids when trend occurs. The advantage is strong tracking ability suitable for trending market. But it is important to avoid counter trend trading. Further optimization can be done by introducing trend judgment, optimizing stop loss strategy, controlling pyramiding times, etc. With proper parameter selection, good tracking results can be achieved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|21|%K Length|
|v_input_int_2|3|%K Smoothing|
|v_input_int_3|3|%D Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//1. AVG Stochastic Calculate
//1.1 AVG %K is calculated by apply EMA with smooth K period on Average of Original Stochastic %k & %d
//+ avg_k=ema((%k+%d)/2,smoothK)
//1.2 AVG %D is calculated by apply EMA with %d period on AVG %K
//+ avg_d=ema(avg_k,periodD)
//2. Parameter
//+ %K Length: 21
//+ %K Smoothing: 3
//+ %D Smoothing: 3
//+ Symbol: BTC/USDT
//+ Timeframe: M30
//+ Pyramiding: Maximum 3 orders at the same direction.
//3. Signal
//3.1 Buy Signal
//+ Entry: AVG %K crossover AVG %D and AVG %D < 20
//+ Exit: AVG %D > 80 
//3.2 Sell Signal
//+ Entry: AVG %K crossunder AVG %D and AVG %D > 80
//+ Exit: AVG %D < 20 
strategy(title="AVG Stochastic Strategy [M30 Backtesting]", overlay=true, pyramiding=3)
periodK = input.int(21, title="%K Length", minval=1)
smoothK = input.int(3, title="%K Smoothing", minval=1)
periodD = input.int(3, title="%D Smoothing", minval=1)
k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)
_avg_k=ta.ema(math.avg(k,d),smoothK)
_avg_d=ta.ema(_avg_k,periodD)
up=
   _avg_k[1]<_avg_d[1]
   and _avg_k>_avg_d
   and _avg_d<20
dn=
   _avg_k[1]>_avg_d[1]
   and _avg_k<_avg_d
   and _avg_d>80
var arr_val=0
if up
    arr_val:=1
    strategy.entry("Long", strategy.long)
if dn
    arr_val:=-1
    strategy.entry("Short", strategy.short)
if up[1] or dn[1]
    arr_val:=0
plotarrow(arr_val,title="Signal",colorup=color.green,colordown=color.red)
if _avg_d>80 
    strategy.close("Long")
if _avg_d<20 
    strategy.close("Short")
//EOF
```

> Detail

https://www.fmz.com/strategy/430262

> Last Modified

2023-10-26 16:20:33
