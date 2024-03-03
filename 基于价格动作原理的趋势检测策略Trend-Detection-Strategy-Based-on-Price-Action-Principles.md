
> Name

基于价格动作原理的趋势检测策略Trend-Detection-Strategy-Based-on-Price-Action-Principles

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略的核心思想是根据K线的高点、收盘价之间的关系,判断当前趋势方向,并以移动平均线的方式平滑结果。当高点收盘较多时判断为上涨趋势,当低点收盘较多时判断为下跌趋势。该策略适用于任何具有一定流动性的数字资产,通过参数优化可以获得更好的效果。

### 策略原理

本策略使用M分钟线,根据收盘价与高低点的位置关系,判断该M分钟K线属于高收盘型(收盘价接近高点)、低收盘型(收盘价接近低点)还是普通型(收盘价接近中间)。 

具体来说,首先计算delt = high - close,即高点与收盘价的差值,以及height = high - low,即高低差。如果delt > height \* 2/3,则判断为高收盘型,如果delt < height/3,则判断为低收盘型,否则为普通型。

然后统计最近N根K线中,高收盘型、低收盘型和普通型的数量,计算其所占比例,并用EMA平滑得到rise、fall和middle三条曲线。rise曲线代表高收盘型K线所占比例,fall曲线代表低收盘型K线所占比例,middle曲线代表普通型K线所占比例。

当rise曲线上穿fall曲线时,表示高收盘型K线开始增多,认为行情进入上涨趋势,发出做多信号。当fall曲线下穿rise曲线时,表示低收盘型K线开始增多,认为行情进入下跌趋势,发出做空信号。

### 策略优势

这种基于价格动作判断趋势的策略,具有以下优势:

1. 原理清晰易理解,容易掌握。

2. 不依赖任何指标,纯粹根据价格本身的特征来判断趋势方向。

3. 可配置参数较少,主要是N和EMA平滑参数,易于优化。

4. 可广泛适用于任何具有一定流动性的数字资产,包括股票、外汇、加密货币等。

5. 回测效果较好,可严格控制风险。

6. 可进一步结合趋势线、支撑阻力等技术方法优化。

7. 可配置止损策略控制单笔损失。

### 策略风险

尽管该策略有一定优势,但也存在以下风险:

1. 当市场处于震荡状态时,K线类型频繁切换,可能产生虚假信号。

2. N和EMA参数设置不当可能导致错过走势或产生过多无效信号。

3. 单纯根据K线类型判断趋势方向时,存在一定滞后。

4. 无法有效过滤常见的分时图形如三角收敛、旗形等,可能发生反向突破的风险。

5. 本策略属于趋势跟踪策略,无法有效捕捉反转机会。

6. 需配合止损来控制亏损风险,否则单笔损失可能较大。

### 策略优化方向 

为降低风险提高盈利因子,本策略可从以下方面进行优化:

1. 结合波动率指标如ATR,根据市场波动率调整参数N和EMA平滑参数,避免震荡市产生过多无效信号。

2. 增加 Volume 指标判断,在大量放量的情况下过滤假突破。

3. 结合趋势线和关键支撑阻力位判断趋势方向和突破真伪。 

4. 增加多个时间周期判断,避免单一周期误判。

5. 增加反转形态识别模块,在显著反转信号出现时及时反向打开仓位。

6. 优化止损策略,根据市场波动性和风险偏好设置止损幅度。

7. 加入跟踪止损、移动止损等功能锁定利润,防止利润回吐。

### 总结

本策略基于价格动作判断趋势方向,原理清晰,回测效果较好,可广泛适用于数字资产交易。但也存在一定局限性,需要配合止损和优化来降低风险。总体来说,本策略为量化交易提供了一个简单实用的思路,值得学习借鉴。通过不断优化和组合,可望获取稳定的超额收益。

||


### Overview

The core idea of this strategy is to determine the current trend direction based on the relationship between the high point and closing price of K-line bars, and smooth the results using moving average lines. When there are more high closing bars, it is determined as an upward trend. When there are more low closing bars, it is determined as a downward trend. This strategy is suitable for any digital asset with certain liquidity, and better results can be obtained through parameter optimization.

### Strategy Logic

This strategy uses M-minute bars. According to the position relationship between the closing price and the high and low points, it is determined whether the M-minute K-line bar belongs to a high closing type (closing price close to high point), low closing type (closing price close to low point) or normal type (closing price close to middle).

Specifically, first calculate delt = high - close, which is the difference between the high point and the closing price, and height = high - low, which is the difference between high and low. If delt > height * 2/3, it is determined as a high closing type. If delt < height/3, it is determined as a low closing type, otherwise it is a normal type. 

Then count the number of high closing, low closing and normal types in the most recent N K-line bars, calculate the percentage they account for, and use EMA to smooth them into rise, fall and middle curves. The rise curve represents the percentage of high closing bars, the fall curve represents the percentage of low closing bars, and the middle curve represents the percentage of normal bars.

When the rise curve crosses above the fall curve, it means that high closing bars begin to increase, indicating the market is entering an upward trend, and a long signal is issued. When the fall curve crosses below the rise curve, it means low closing bars begin to increase, indicating the market is entering a downward trend, and a short signal is issued.

### Advantages of the Strategy

This price action based trend judgment strategy has the following advantages:

1. The principle is clear and easy to understand and master.

2. It does not rely on any indicators, but purely judges the trend direction based on the characteristics of the price itself.

3. There are few configurable parameters, mainly N and EMA smoothing parameters, which are easy to optimize.

4. It can be widely applied to any digital asset with certain liquidity, including stocks, forex, cryptocurrencies, etc.

5. The backtest results are good, and risks can be strictly controlled. 

6. It can be further combined with trendlines, support/resistance levels and other technical methods for optimization.

7. Stop loss strategies can be configured to control single loss.

### Risks of the Strategy

Despite the advantages, the strategy also has the following risks:

1. When the market is in a shock state, the K-line type switches frequently, which may generate false signals.

2. Improper N and EMA parameter settings may lead to missing trends or too many invalid signals.

3. Judging the trend direction solely based on K-line types has some lag. 

4. It cannot effectively filter common chart patterns like triangle convergence, flags, etc., with the risk of reverse breakthroughs.

5. This strategy belongs to trend following, and cannot effectively capture reversal opportunities.

6. Stop loss should be used to control the risk of loss, otherwise single loss can be large.

### Directions for Strategy Optimization

To reduce risks and improve profitability, the strategy can be optimized in the following aspects:

1. Combine volatility indicators like ATR to adjust N and EMA parameters based on market volatility, avoiding excessive invalid signals in range-bound markets.

2. Add Volume analysis to filter false breakouts in high volume conditions.

3. Combine trendlines and key support/resistance levels to determine trend direction and breakthrough authenticity.

4. Add multiple timeframe analysis to avoid misjudgments on a single timeframe.

5. Add pattern recognition modules to reverse positions in a timely manner when significant reversal signals appear.

6. Optimize stop loss strategies based on market volatility and risk preference. 

7. Add trailing stop loss, moving stop loss etc. to lock in profits and prevent giving back.

### Summary

This strategy judges trend direction based on price action. The logic is clear and backtest results are good. It can be widely applied to crypto trading. But there are also some limitations. It needs to be combined with stop loss and optimizations to reduce risk. Overall, this strategy provides a simple and practical idea for quant trading and is worth learning from. With continuous optimizations and combinations, stable excess returns can be achieved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|34|lenght|
|v_input_2|5|ema_smooth|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("trend detect", overlay=false)


lenght = input(34)
ema_smooth = input(5)

delt = high - close
height = high - low

color_plot=black
state=0

if delt > height/3*2
    state := 1
    color_plot := red
else
    if delt > height/3
        state := 2
        color_plot := blue
    else 
        state := 3
        color_plot := green
//plot(state, color=color_plot, style=histogram)
percOfType(len, state_for_count) =>
    num = 0
    for i=1 to len
        if state[i]==state_for_count
            num := num+1
    num/len*100
    
rise = ema(percOfType(lenght, 3), ema_smooth)
fall = ema(percOfType(lenght, 1), ema_smooth)
plot(rise, color = green)
plot(ema(percOfType(lenght, 2), ema_smooth), color = blue)
plot(fall, color = red)
plot(10, color=black)
plot(60, color=black)

longCondition = crossover(rise, fall)
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(rise, fall)
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427342

> Last Modified

2023-09-20 11:11:46
