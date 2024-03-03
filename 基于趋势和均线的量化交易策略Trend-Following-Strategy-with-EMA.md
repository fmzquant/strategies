
> Name

基于趋势和均线的量化交易策略Trend-Following-Strategy-with-EMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9b636e63b8ca085910.png)
[trans]

## 概述

该策略的名称为“Trend Following with EMA”,即基于趋势和均线的量化交易策略。它结合了趋势跟踪和指数移动平均线(EMA)两种技术指标,用于识别股票或者其他金融产品的价格趋势,并据此进行买入和卖出操作。

## 策略原理  

该策略的主要逻辑是:

1. 使用长度为180周期的低点和收盘价的交叉来判断价格上升趋势。当低点上穿收盘价时,表示价格开始上升,形成趋势,此时做多;

2. 当价格从下降趋势转为上升趋势时,即收盘价上穿开盘价,并且EMA线下方时,也做多;  

3. 当价格从上升趋势转为下降趋势时,即收盘价下穿开盘价时,平掉多头仓位;

4. 使用长度为180周期的高点和EMA的交叉来判断价格下降趋势。当高点下穿EMA线且高点低于EMA线时,做空;

5. 当价格从上升趋势转为下降趋势时,即收盘价下穿开盘价,并且EMA线上方时,也做空;

6. 当价格从下降趋势转为上升趋势时,即收盘价上穿开盘价时,平掉空头仓位。

## 策略优势分析

该策略结合趋势跟踪和均线指标,可以有效捕捉价格趋势的转折点,具有以下优势:  

1. 趋势跟踪部分可以确定价格趋势的方向,减少错误操作的概率;
2. 均线部分可以有效滤波价格小幅波动的噪音,识别出较大幅度的趋势;  
3. 结合两种指标可以提高交易信号的可靠性,避免假阳性;
4. 参数设置合理灵活,可调整周期长度以适应不同品种和交易风格。

## 风险分析

该策略也存在一定的风险:

1. 在价格波动剧烈的场景下,EMA均线会有较大滞后,可能错过最佳入场时机;
2. 趋势判断指标对参数敏感,不同周期设置会导致交易信号和收益不同;
3. 多头空头仓位的切换频率可能过高,增加交易滑点和手续费的损耗。  

对应风险的解决方案是:

1. 优化EMA均线的周期参数,降低滞后概率;
2. 进行参数优化,找到最适合该品种的周期参数;
3. 设置止损止盈条件,避免过于频繁切换仓位。

## 策略优化方向  

该策略可以从以下几个方面进行优化:

1. 增加基于波动率的仓位管理模块,可以根据市场波动情况动态调整仓位;
2. 增加机器学习模型判断价格趋势,取代简单交叉判断,提高准确性;  
3. 结合 fundamentals 数据refine 交易信号,避免在公司业绩变化时产生错误信号;
4. 进行多品种参数优化,寻找最佳周期参数组合,提高稳定性和最大化收益。

## 总结

该策略整体来说是一种典型的趋势跟踪策略,利用价格本身的特征指标判断方向并跟踪趋势。它简单有效,容易实现,适合作为量化交易的入门策略。但也存在一些问题,比如指标滞后、参数敏感性等。这些问题都是可以通过引入更多数据源、使用机器学习等方式得到改进。所以该策略有很大的拓展与优化空间,是一种值得推荐的高频量化交易策略。

||

## Overview  

The name of this strategy is “Trend Following with EMA”, which is a quantitative trading strategy based on trend following and exponential moving average (EMA) technical indicators. It combines trend tracking and EMA to identify the price trend of stocks or other financial products, and makes buy and sell decisions accordingly.  

## Strategy Logic

The main logic of this strategy is:

1. Use the crossover between the 180-period low and close price to determine the upward trend. When the low crosses above the close price, it indicates the price starts to rise and a trend is formed, a long position will be opened at this point;  

2. When the price changes from a downward trend to an upward trend, that is, the close price crosses above the open price and the EMA line is below, a long position will also be opened;

3. When the price changes from an upward trend to a downward trend, that is, the close price crosses below the open price, the existing long position will be closed;

4. Use the crossover between the 180-period high and EMA to determine the downward trend. When the high crosses below the EMA and the high is lower than the EMA, a short position will be opened;  

5. When the price changes from an upward trend to a downward trend, that is, the close price crosses below the open price and the EMA line is above, a short position will also be opened; 

6. When the price changes from a downward trend to an upward trend, that is, the close price crosses above the open price, the existing short position will be closed.

## Advantage Analysis   

This strategy combines trend following and moving average indicators, which can effectively capture the turning points of price trends. The advantages are:

1. The trend following part can determine the direction of the price trend and reduce the probability of wrong operations;
2. The moving average part can effectively filter out small price fluctuations and identify larger amplitude trends;
3. Combining the two indicators can improve the reliability of trading signals and avoid false positives; 
4. The parameter settings are reasonable and flexible to adapt to different products and trading styles.

## Risk Analysis

This strategy also has some risks:  

1. In scenarios of violent price fluctuations, there will be a lag in the EMA, which may miss the best entry point;
2. Trend judging indicators are sensitive to parameters. Different cycle settings will lead to different trading signals and returns;
3. The switching frequency of long and short positions may be too high, increasing slippage and commission costs.

The solutions to the risks are:

1. Optimize the cycle parameter of the EMA to reduce the lag probability;
2. Conduct parameter optimization to find the most suitable cycle parameters for the product; 
3. Set stop loss and take profit conditions to avoid excessively frequent position switching.

## Optimization Directions   

The strategy can be optimized in the following aspects:

1. Add a position management module based on volatility to dynamically adjust positions according to market volatility;
2. Add machine learning models to judge price trends, replacing simple crossover judgments to improve accuracy;
3. Refine trading signals by incorporating fundamentals data to avoid wrong signals when company performance changes;
4. Conduct multi-product parameter optimization to find the best parameter combination for cycles and improve stability and maximize returns.

## Conclusion  

In general, this is a typical trend following strategy that uses the characteristics of price itself to determine direction and track trends. It is simple, effective, easy to implement, and suitable as a beginner quantitative trading strategy. However, there are some problems like indicator lag and parameter sensitivity. These issues can be improved by introducing more data sources and using machine learning. So there is great potential for expansion and optimization of this strategy. It is a recommended high-frequency quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|180|Period for trend|
|v_input_2|180|EMA period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-05 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Trend + EMA", overlay=true, initial_capital=10000, currency=currency.USD, pyramiding=0)

tim=input("180", title="Period for trend")
ema_period=input(180, title="EMA period")

opn = request.security(syminfo.tickerid, tim, open)
cls = request.security(syminfo.tickerid, tim, close)

emaline = ema(close, ema_period)

plot(opn, color=red)
plot(cls, color=green)
plot(emaline, color=black)

if (crossover(low, emaline))
    strategy.entry("long", strategy.long)

if (crossover(cls, opn) and emaline < opn and strategy.position_size == 0)
    strategy.entry("long", strategy.long)

if (crossunder(cls, opn) and strategy.position_size > 0)
    strategy.close_all()

if (crossunder(high, emaline) and high < emaline)
    strategy.entry("short", strategy.short)

if (crossunder(cls, opn) and emaline > opn and strategy.position_size == 0)
    strategy.entry("short", strategy.short)

if (crossover(cls, opn) and strategy.position_size < 0)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/434485

> Last Modified

2023-12-06 17:55:42
