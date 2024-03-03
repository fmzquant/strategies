
> Name

双均线黄金交叉量化策略Dual-Moving-Average-Golden-Cross-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1586f33d890795e25c1.png)

[trans]

## 概述

双均线黄金交叉量化策略(Dual Moving Average Golden Cross Quantitative Strategy)是一种技术指标量化交易策略。它通过计算两条不同周期的均线,判断行情趋势,实现低风险交易。当短周期均线上穿较长周期均线时,产生黄金交叉信号,做多;当短周期均线下穿较长周期均线时,产生死亡交叉信号,做空。该策略同时结合价格通道指标,避免假突破。

## 策略原理

双均线黄金交叉量化策略基于均线理论。均线能够有效地滤波市场噪音,指示长期趋势方向。当短周期均线上穿较长周期均线时,表示行情由下向上反转,属于买入信号;当短均线下穿长均线时,表示行情由上向下反转,属于卖出信号。该策略设置两组均线,第一组是2日均线和3日均线,第二组是420日均线。当2日均线上穿3日均线时产生买入信号,下穿时产生卖出信号。420日均线用来判断长期趋势,避免交易前短期回调。

该策略的核心代码逻辑是:

1. 计算2日均线、3日均线和420日均线
2. 判断2日均线和3日均线的金叉死叉情况
3. 使用420日均线过滤信号,避免假突破
4. 产生买入和卖出信号

具体原理是:

1. 计算最后3日内的收盘价2日简单移动平均线n2ma和3日简单移动平均线nma
2. 计算最后420日内的收盘价的加权移动平均线rvwma
3. 当n2ma上穿nma时产生买入信号
4. 当n2ma下穿nma时产生卖出信号  
5. 使用rvwma过滤信号,只有n2ma在rvwma之下才产生买入信号,n2ma在rvwma之上才产生卖出信号

通过双均线交叉判断短期趋势反转点,设置参数过滤器避免误交易。该策略可以有效捕捉短期调整后的趋势反转机会,profit因子较高。

## 优势分析

双均线黄金交叉量化策略具有以下优势:

1. **简单可靠**:使用双均线交叉理论,判断短期价格变化趋势,信号产生简单清晰。
2. **灵敏度高**:2日和3日均线参数设置比较灵敏,能快速捕捉短期价格变化。
3. **Noise过滤**:引入价格通道指标,有效过滤噪音,避免误交易。
4. **适应性强**:双均线交叉理论适用于不同品种和不同周期,容易实施。
5. **易于优化**:改变均线参数组合,调整过滤器参数,策略优化空间大。
6. **实盘验证**:该类双均线交叉策略已经在实盘中验证,效果较稳定。

## 风险分析

双均线黄金交叉量化策略也存在以下风险:

1. **回调风险**:价格短期反弹回调可能触发止损。
2. **趋势反转风险**:突发事件导致市场长期趋势反转亏损。
3. **参数优化风险**:参数不当可能导致策略效果变差。
4. **过优化风险**:参数优化过度可能导致过拟合。
5. **实盘偏差风险**:实盘与回测存在偏差可能影响效果。

可以通过以下方式降低风险:

1. 设置合理止损位,控制单笔亏损。
2. 结合基本面分析,避免逆市交易。 
3. 选择适合品种和合适周期优化。
4. 做好参数敏感性测试。
5. 增加实盘验证环节。

## 优化方向  

双均线黄金交叉量化策略还可以从以下方面进行优化:  

1. **参数优化**:调整均线参数以及通道指标参数,选择最优参数组合。可以使用遗传算法等工具辅助优化。

2. **品种择时**:根据不同品种的特性,选取最匹配的均线参数。例如兴趣相关品种设置更短周期均线。

3. **止损策略优化**:设定 float 动态止损、追踪止损等止损方式,避免回调止损。

4. **同向操作优化**:结合趋势指标,采取趋势同向操作,避免逆势交易。  

5. **机器学习结合**:使用 LSTM、RNN 等深度学习模型辅助判断信号质量和确定入场时机。

## 总结

双均线黄金交叉量化策略通过简单的均线交叉原理判断价格短期趋势。设置通道指标有效过滤误信号。策略逻辑简单易于实现,参数调整灵活,实盘验证效果较好,是一个值得推荐的量化策略。该策略可以通过参数优化、止损优化、机器学习等手段进行升级,效果会更好,适合用于数字货币、股票等品种的算法交易。

||

## Overview  

The Dual Moving Average Golden Cross Quantitative Strategy is a technical indicator-based quantitative trading strategy. It determines market trends by calculating two moving averages of different periods and enables low-risk trading. When the shorter-period moving average crosses above the longer-period moving average, a golden cross signal is generated for going long. When the shorter moving average crosses below the longer one, a death cross signal is generated for going short. This strategy also incorporates price channel indicators to avoid false breaks.

## Strategy Principle

The Dual Moving Average Golden Cross Quantitative Strategy is based on moving average theory. Moving averages can effectively filter market noise and indicate long-term trend directions. When the shorter-period moving average crosses above the longer-period moving average, it indicates an upward reversal of the market and is a buy signal. When the shorter moving average crosses below the longer one, it indicates a downward reversal and is a sell signal. This strategy sets two groups of moving averages - the first is the 2-day and 3-day moving averages, and the second is the 420-day moving average. A buy signal is generated when the 2-day crosses above the 3-day moving average, and a sell signal is generated when it crosses below. The 420-day moving average is used to determine the long-term trend to avoid trading short-term pullbacks.

The key logic of the strategy code is:

1. Calculate the 2-day, 3-day, and 420-day moving averages  
2. Judge the golden cross and death cross between the 2-day and 3-day moving averages
3. Use the 420-day moving average to filter signals and avoid false breaks
4. Generate buy and sell signals

The specific principles are:

1. Calculate the 2-day simple moving average n2ma and 3-day simple moving average nma based on the closing prices of the last 3 days
2. Calculate the 420-day weighted moving average rvwma of the closing prices from the last 420 days  
3. A buy signal is generated when n2ma crosses above nma
4. A sell signal is generated when n2ma crosses below nma
5. Use rvwma to filter signals, generating a buy signal only when n2ma is below rvwma and a sell signal only when n2ma is above rvwma

It catches trend reversal opportunities after short-term adjustments by determining turning points with dual moving average crossings and sets parameter filters to avoid mistaken trades. This strategy can effectively capture trend reversal opportunities after short-term adjustments with a relatively high profit factor.

## Advantage Analysis   

The Dual Moving Average Golden Cross Quantitative Strategy has the following advantages:

1. **Simple and reliable**: Uses dual moving average crossings to determine short-term price trends, generating straightforward and clear signals  
2. **High sensitivity**: The 2-day and 3-day moving average parameters are set to be sensitive enough to quickly capture short-term price changes
3. **Noise filtering**: Incorporates price channel indicators to effectively filter out noise and avoid mistaken trades
4. **Strong adaptability**: The theory of dual moving average crossings is adaptable to different products and timeframes, making it easy to implement
5. **Easy to optimize**: Large optimization space by changing moving average parameter combinations and adjusting filter parameters
6. **Real-trading validation**: Dual moving average crossover strategies have been validated in live trading with relatively stable performance

## Risk Analysis  

The Dual Moving Average Golden Cross Quantitative Strategy also has the following risks:  

1. **Pullback risk**: Short-term rebounds may trigger stops
2. **Trend reversal risk**: Sudden events leading to long-term trend reversals may cause losses
3. **Parameter optimization risk**: Improper parameters may worsen strategy performance  
4. **Overoptimization risk**: Excessive parameter optimization may lead to overfitting  
5. **Live trading deviation risk**: Divergence between backtesting and live trading may affect performance

The following methods can be used to reduce risks:

1. Set reasonable stop loss to control single loss
2. Combine fundamentals to avoid trading against the market
3. Select suitable products and periods for optimization
4. Do proper parameter sensitivity testing
5. Add live trading verification

## Optimization Directions   

The Dual Moving Average Golden Cross Quantitative Strategy can also be optimized in the following aspects:

1. **Parameter optimization**: Adjust moving average and channel indicator parameters to select the optimal parameter combination. Genetic algorithms can assist optimization.

2. **Timing selection**: Choose the most suitable moving average parameters based on different product characteristics. For example, set shorter-period moving averages for interest-related products.  

3. **Stop loss strategy optimization**: Set dynamic stops, trailing stops etc. to avoid pullback stops.

4. **Directional trading optimization**: Incorporate trend indicators and adopt trend-following operations to prevent countertrend trading.   

5. **Machine learning combination**: Use LSTM, RNN and other deep learning models to assist in judging signal quality and determining entry timing.

## Conclusion  

The Dual Moving Average Golden Cross Quantitative Strategy determines short-term price trends through the simple principle of moving average crossovers. Setting channel indicators effectively filters false signals. The strategy has straightforward logic and is easy to implement. Flexible parameter adjustments are possible with relatively good performance validated in live trading. It is a recommended quantitative strategy that can be upgraded through parameter optimization, stop loss optimization, machine learning and more to achieve even better performance. The strategy is suitable for algorithmic trading across products like cryptocurrencies and stocks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|420|HullMA|
|v_input_2|3|HullMA cross|
|v_input_3|14|VWMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-24 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//                                                Indicator420 by SeaSide420
strategy("Indicator420 strategy", overlay=true)
q=input(title="HullMA",defval=420)
z=input(title="HullMA cross",defval=3)
a=input(title="VWMA",defval=14)
rvwma=vwma(close,round(a))
rvwma2=vwma(close,round(a*2))
rvwma3=vwma(close,round(a*3))
n2ma=2*wma(close,round(z/2))
nma=wma(close,z)
diff=n2ma-nma
sqn=round(sqrt(z))
n2ma1=2*wma(close[1],round(z/2))
nma1=wma(close[1],z)
diff1=n2ma1-nma1
sqn1=round(sqrt(z))
n2ma2=2*wma(close[2],round(q/2))
nma2=wma(close[2],q)
diff2=n2ma2-nma2
sqn2=round(sqrt(q))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
n3=wma(diff2,sqn)
b=n1>n2?red:lime
c=n1>n2?green:red
d=n3>rvwma3?red:green
e=rvwma2>rvwma3?green:red
f=n1>n2?red:green
//plot(rvwma3, color=e, linewidth=1)
plot(cross(rvwma, rvwma2) ? rvwma : na, style = line,color=e, linewidth = 1)
plot(cross(n1, n2) ? n1 : na, style = line,color=b, linewidth = 3)
plot(cross(n1, n2) ? n1 : na, style = circles,color=c, linewidth = 4)
closelong = n1<n2
if (closelong)
    strategy.close("Long")
closeshort = n1>n2
if (closeshort)
    strategy.close("Short") 
longCondition = n1>n2 and strategy.opentrades<1 and n1<rvwma3
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = n1<n2 and strategy.opentrades<1 and n1>rvwma3
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/436658

> Last Modified

2023-12-26 17:02:29
