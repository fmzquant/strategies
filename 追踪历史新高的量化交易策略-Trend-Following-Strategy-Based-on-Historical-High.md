
> Name

追踪历史新高的量化交易策略-Trend-Following-Strategy-Based-on-Historical-High

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1170d40a18b2a653de2.png)
 [trans]

### 概述

该策略主要是追踪证券的历史最高价格,当价格回落到最高价格的一定百分比时买入,当价格重新突破历史最高价时卖出,属于趋势跟踪策略。

### 策略原理   

该策略首先记录证券自2011年1月1日至今的最高价格,定义为highestHigh变量。然后它绘制该最高价格的水平线allTimeHigh。

在运行过程中,每天判断当日的最高价格是否创新高,如果创新高,则更新highestHigh变量和重绘allTimeHigh水平线。

该策略有3条重要的水平线:

1. buyzone=highestHigh\*0.9:最高价的90%水平,代表强势回吸机会

2. buyzone2=highestHigh\*0.8:最高价的80%水平,代表比较有吸引力的回吸位置  

3. sellzone=highestHigh\*0.99:最高价的99%水平,代表判断趋势反转的机会

当价格下跌至80%水平线(buyzone2)时发出买入信号;当价格重新突破历史最高价的99%水平线(sellzone)时发出卖出平仓信号。

该策略的主要判断依据就是追踪历史最高价以及不同比例水平线,属于典型的趋势跟踪策略。

### 优势分析

该策略最大的优势在于能捕捉长期的上涨趋势,通过等待回吸再入场,达到低买高卖的效果。具体优势如下:

1. 能抓住股票长期上涨趋势的机会,追踪最高价是判断趋势的重要依据

2. 回吸最高价的80%这个位置代表风险回报比最优,既能确保上涨后的利润空间,也限制了下跌的风险 

3. 99%的历史最高价作为止损线,让利润最大化同时控制风险

4. 可用来检验股票是否进入结构性上涨机会,最高新高代表企业实力增强

5. 参数可调整空间大,可针对不同股票个性化优化

所以该策略最大限度利用股票上涨趋势带来的收益,而避开短期调整的风险,属于风险收益比很好的趋势跟踪策略。

### 风险分析

该策略的主要风险在于买入后价格可能再创新低,继续下跌的概率。主要风险包括:

1. 买入后价格继续下跌急跌停的概率,可能面临亏损

2. 最高价其实代表着热点追涨杀跌的高点,继续上涨动力可能不足

3. 如果参数设置不当,止损点过高过低都存在不同问题 

4. 交易频率可能较低,容易受外部环境影响比如大盘走势

5. 没有考虑个股的基本面与估值情况,选择买入股票的依据较弱

主要的解决方法是:合理评估股票的基本面,确保选股质量;调整参数如买入比例,止损点以优化策略;考虑与其他策略合并实施等。

### 优化方向  

该策略的主要优化方向在于参数调整,选股规则,止损方式的改进。具体如下:

1. 优化买入和止损的技术指标,如考虑KD,MACD等指标避开高位

2. 改进选股规则,加入基本面与估值指标,确保选股质量 

3. 动态调整参数比例,和大盘联动确保参数的合理性

4. 设置移动止损或时间止损,优化止损方式与止损位置

5. 考虑与其他因子策略合并,形成多因子模型,提高稳定性

6. 加入量能指标判断力度,避免选择股票上涨后期低迷期

因此该策略的优化方向主要在于选股规则,参数调整,止损方式的改进,在原有追踪趋势的基础上,进一步提高稳定性和风险调整收益。

### 总结  

该策略属于典型的追踪历史新高进行趋势跟踪的策略。它能有效抓住股票长期上涨趋势,通过技术回吸的方式获得较优的风险收益比。但由于没有考虑基本面因素,稳定性和抗风险能力较弱。关键的优化方向在于改进选股规则,调整参数止损,优化止损机制等方法。如果通过多因子模型与其他策略联合使用,则可以形成一个风险收益比极佳的量化选股与交易策略。

||

### Overview

This strategy mainly tracks the historical highest price of securities. It buys when the price falls back to a certain percentage of the highest price and sells when the price breaks through the historical highest price again. It belongs to the trend following strategy.

### Strategy Principle  

The strategy first records the highest price of the security from January 1, 2011 to the present, which is defined as the highestHigh variable. Then it draws the horizontal line allTimeHigh of this highest price.

During operation, it judges whether the highest price of the day has hit a new high every day. If it hits a new high, it updates the highestHigh variable and redraws the allTimeHigh horizontal line.

There are 3 important horizontal lines in this strategy:

1. buyzone=highestHigh\*0.9: 90% of the highest price, representing the opportunity of strong pullback 

2. buyzone2=highestHigh\*0.8: 80% of the highest price, representing a relatively attractive pullback position

3. sellzone=highestHigh\*0.99: 99% of the highest price, representing the opportunity to determine the trend reversal

It sends a buy signal when the price falls to the 80% line (buyzone2); it sends a sell signal when the price breaks through the 99% line (sellzone) of the historical highest price again.

The main judgment of this strategy is to track the historical highest price and different ratio level lines. It belongs to a typical trend following strategy.

### Advantage Analysis 

The biggest advantage of this strategy is that it can capture long-term uptrends. By waiting for pullbacks and then entering, it achieves the effect of buying low and selling high. The specific advantages are as follows:

1. It can capture the long-term uptrend opportunities of stocks. Tracking the highest price is an important basis for judging trends.

2. The position of 80% pullback of the highest price represents the optimal risk-return ratio, which can ensure the profit margin after the rise while limiting the risk of decline

3. The 99% of historical high acts as a stop loss line to maximize profits while controlling risks

4. Can be used to test whether the stock has entered a structural upward trend opportunity. The new high of highest price represents the strengthening of corporate strength  

5. Large adjustable parameter space can be optimized personally for different stocks

Therefore, this strategy maximizes the returns from the uptrend of stocks while avoiding the short-term adjustment risks. It is a trend following strategy with very good risk-reward ratio.

### Risk Analysis

The main risk of this strategy is the probability that the price may hit a new low and continue to decline after buying. The main risks include:  

1. The probability of continued decline or limit down after buying, may face losses

2. The highest price actually represents the frenzy of chasing rises and killing falls, the momentum for continued upside may be insufficient  

3. If the parameters are set improperly, there will be different problems if the stop loss point is too high or too low

4. Trading frequency may be low, vulnerable to external environmental impacts such as market trends

5. It does not consider the fundamentals and valuation of individual stocks, and the basis for selecting stocks to buy is weak

The main solution is: rationally evaluate the fundamentals to ensure stock selection quality; adjust parameters such as purchase ratio and stop loss to optimize strategies; consider combining with other strategies, etc.

### Optimization Directions  

The main optimization directions of this strategy are parameter adjustment, stock selection rules, and improvement of stop-loss methods. Specifically:

1. Optimize buy and stop loss technical indicators, such as KD, MACD to avoid high points  

2. Improve stock selection rules, add fundamentals and valuation metrics to ensure stock quality

3. Dynamically adjust parameter ratios and link with the broader market to ensure the rationality of parameters  

4. Set moving stop loss or time stop loss to optimize stop loss methods and positions  

5. Consider combining with other factor strategies to form multi-factor models and improve stability

6. Add momentum indicators to avoid low prosperity periods after the rise of the stock

Therefore, the main optimization directions are to improve stock selection rules, parameter adjustment, and stop-loss methods, while further improving stability and risk-adjusted returns on the basis of following trends.

### Summary  

This strategy belongs to the typical trend following strategy based on historical new highs. It can effectively capture the long-term uptrend of stocks through technical pullbacks to obtain a superior risk-reward ratio. But due to the lack of consideration of fundamentals, the stability and risk resistance are weaker. The key optimization directions are to improve stock selection rules, adjust parameters and stop losses, and optimize stop-loss mechanisms. If used in conjunction with other strategies through a multi-factor model, it can form a quantitative stock selection and trading strategy with optimal risk-reward ratio.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|All-time-high line widths|
|v_input_2|fuchsia|All-time-high line color|
|v_input_3|6|Years back to search for an ATH|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-21 00:00:00
end: 2024-01-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("All-time-high", "ATH", overlay=true, initial_capital=10000, default_qty_value=100, default_qty_type=strategy.percent_of_equity, pyramiding=1, commission_type=strategy.commission.cash_per_contract, commission_value=0.000)

// input
Athlw = input(title="All-time-high line widths", type=input.integer, defval=4, minval=0, maxval=4)
Athlc = input(title="All-time-high line color", type=input.color, defval=color.new(color.fuchsia,50))
years = input(title="Years back to search for an ATH", type=input.integer, defval=6,minval=0, maxval=100)

var float   highestHigh = 0
// var line    allTimeHigh = line.new(na, na, na, na, extend=extend.both, color=Athlc, width=Athlw)

if high > highestHigh
    highestHigh := high

// if barstate.islast
//     line.set_xy1(allTimeHigh, bar_index-1, highestHigh)
//     line.set_xy2(allTimeHigh, bar_index,   highestHigh)

plot(highestHigh)
buyzone=highestHigh*0.9
buyzone2=highestHigh*0.8
buyzone3=highestHigh*0.7
sellzone=highestHigh*0.99

plot(buyzone, color=color.red)
plot(buyzone2, color=color.white)
plot(buyzone3, color=color.green)

begin = timestamp(2011,1,1,0,0)
end = timestamp(2022,4,19,0,0)

longCondition = close<buyzone2
if (longCondition)
    strategy.entry("Buy", strategy.long)
closeCondition = close>sellzone
if (closeCondition)
    strategy.close("Buy", strategy.long)

```

> Detail

https://www.fmz.com/strategy/439594

> Last Modified

2024-01-22 08:59:34
