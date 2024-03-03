
> Name

动能突破自适应均线交叉系统Adaptive-Moving-Average-Crossover-System-with-Momentum-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bb9eb4a53a8fba3af5.png)
[trans]

## 一、概述

这个策略的核心是运用自适应均线和动能指标实现突破交易。首先,策略使用热林阳线加权平均价格和三双顺滑移动平均线构建自适应均线;然后,结合动量指标,判断突破的信号,形成交易决策。

## 二、策略原理  

该策略主要由三部分组成:

1. 自适应均线的构建。策略使用热林阳线价格和三双顺滑移动平均线构建三条自适应均线。这些均线能够快速响应价格变化。  

2. 动量指标的计算。策略使用价格的三双顺滑移动平均线的差值作为动量指标。该指标能突出显示价格趋势的变化。

3. 均线的交叉作为交易信号。当快速均线上穿慢速均线时生成买入信号;当快速均线下穿慢速均线时生成卖出信号。

## 三、策略优势

这种策略结合自适应均线和动量指标,能够快速抓住价格变化趋势,并产生交易信号,主要有以下优势:  

1. 使用热林阳线价格构建自适应均线,能更快速响应价格变化。
2. 三双顺滑移动平均线能有效平滑价格数据,处理异常数据。  
3. 动量指标能清晰识别价格趋势变化点。
4. 均线交叉产生清晰的交易信号。
5. 策略参数设置灵活,可调整自适应性。

## 四、风险与对策  

1. 当价格剧烈波动时,均线交叉信号可能出现误导。可适当调整参数,过滤信号。
2. 多头市场中,策略表现更佳。空头市场中,止损保护资金。  

## 五、优化思路  

1. 可以测试更多类型的移动平均线,寻找更好的参数。
2. 可以加入附加过滤条件,避免误信号。例如增加交易量过滤。
3. 可以优化参数设置,针对不同市场调整自适应性。  

## 六、总结  

该策略整合自适应均线和动量指标,快速响应价格变化,产生简洁高效的交易信号。通过参数调整,可以灵活适应不同市场环境。这是一个非常实用的突破交易策略。

||

## I. Overview

The core of this strategy is to implement breakout trading using adaptive moving averages and momentum indicators. Firstly, the strategy constructs adaptive moving averages with Heiken Ashi weighted average price and triple exponential smoothing; then, combined with momentum indicators, it judges breakout signals and makes trading decisions.

## II. Strategy Principle 

The strategy consists of three main parts:

1. Construction of adaptive moving averages. The strategy builds three adaptive moving averages using Heiken Ashi price and triple exponential smoothing. These moving averages can respond quickly to price changes.

2. Calculation of momentum indicators. The strategy uses the difference between triple exponential smoothing of prices as the momentum indicator. This indicator can highlight changes in price trends.

3. Moving average crossover as trading signals. When the fast moving average crosses over the slow one, a buy signal is generated. When the fast crosses below the slow one, a sell signal is generated.

## III. Advantages of the Strategy

By combining adaptive moving averages and momentum indicators, this strategy can quickly capture trend changes in prices and generate trading signals. The main advantages are:

1. Heiken Ashi prices to construct adaptive moving averages can respond faster to price changes. 
2. Triple exponential smoothing can effectively smooth price data and handle outliers.
3. Momentum indicators can clearly identify trend change points in prices. 
4. Moving average crossovers generate clear trading signals.
5. Flexible parameter settings for adjustability.

## IV. Risks and Mitigations

1. Crossover signals may be misleading when prices fluctuate violently. Adjust parameters to filter signals when necessary.
2. The strategy works better in bull markets. Use stop loss to protect capital in bear markets.

## V. Optimization Directions 

1. Test more types of moving averages to find better parameters.
2. Add additional filters to avoid false signals, e.g. volume filter.
3. Optimize parameter settings for adaptability to different markets.  

## VI. Conclusion

This strategy integrates adaptive moving averages and momentum indicators to generate efficient trading signals by quickly responding to price changes. Through parameter tuning, it can be adaptive to different market environments. This is a very practical breakout trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|55|EMA LENGTH?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("YASIN Crossover Strategy", overlay=true)

EMAlength = input(55, 'EMA LENGTH?')

src = ohlc4
var float haOpen = na
haOpen := na(haOpen[1]) ? src : (src + haOpen[1]) / 2
haC = (ohlc4 + haOpen + ta.highest(high, 1) + ta.lowest(low, 1)) / 4
EMA1 = ta.ema(haC, EMAlength)
EMA2 = ta.ema(EMA1, EMAlength)
EMA3 = ta.ema(EMA2, EMAlength)
TMA1 = 3 * EMA1 - 3 * EMA2 + EMA3
EMA4 = ta.ema(TMA1, EMAlength)
EMA5 = ta.ema(EMA4, EMAlength)
EMA6 = ta.ema(EMA5, EMAlength)
TMA2 = 3 * EMA4 - 3 * EMA5 + EMA6
IPEK = TMA1 - TMA2
YASIN = TMA1 + IPEK
EMA7 = ta.ema(hlc3, EMAlength)
EMA8 = ta.ema(EMA7, EMAlength)
EMA9 = ta.ema(EMA8, EMAlength)
TMA3 = 3 * EMA7 - 3 * EMA8 + EMA9
EMA10 = ta.ema(TMA3, EMAlength)
EMA11 = ta.ema(EMA10, EMAlength)
EMA12 = ta.ema(EMA11, EMAlength)
TMA4 = 3 * EMA10 - 3 * EMA11 + EMA12
IPEK1 = TMA3 - TMA4
YASIN1 = TMA3 + IPEK1
t1 = time(timeframe.period, "0020-0030")


// بررسی شرایط سیگنال خرید و فروش
buyCondition = YASIN1 > YASIN and YASIN1[1] <= YASIN[1]
sellCondition = YASIN1 < YASIN and YASIN1[1] >= YASIN[1]

// اعمال سیگنال خرید و فروش
strategy.entry("Buy", strategy.long, when = buyCondition)
strategy.entry("Sell", strategy.short, when = sellCondition)
```

> Detail

https://www.fmz.com/strategy/442256

> Last Modified

2024-02-20 15:43:46
