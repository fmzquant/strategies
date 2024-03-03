
> Name

帕拉波尔振荡器寻找高点低点策略Parabola-Oscillator-Seeking-Highs-and-Lows-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f668e550c1ab221966.png)
[trans]

### 概述

该策略通过计算不同周期的均线和方差,来判断价格的趋势和波动性,实现对高点和低点的识别。

### 策略原理  

该策略的核心逻辑是计算近期不同周期的均线和方差。具体来说,分别计算最近5日、4日和3日的均线(ma,mb,mc)和方差(da,db,dc)。然后比较大小,选择方差最大的一个周期代表当前趋势。最后,用代表趋势的周期的均线乘以其方差的平方,作为最终输出的曲线wg。

这样,当价格出现向上突破或向下突破时,代表趋势的周期和方差会发生较大变化。从而使得最终输出的wg也产生较大变化,实现对高点和低点的识别。

### 优势分析

这种基于不同周期判断趋势变化的思路行之有效,可以清楚地识别出价格的转折点。相比单一周期判断,这种组合多个周期的方法可以提高判断的准确性和及时性。

计算均线和方差也非常简单有效,代码量不大,且对突发的价格变化非常敏感,从而可以快速发现突破。

### 风险分析

该策略中使用的周期较短,对于中长线而言,判断可能不够准确和全面。短期内的价格震荡可能导致误判。  

此外,均线和方差的权重设置也会影响判断效果,如果权重设置不当,则信号可能偏差。  

### 优化方向

可以尝试加入更多不同周期的计算,组成周期组合,使判断更全面。比如加入 10 日、20 日等中长期周期判断。

也可以试验不同的权重设置方案,提高权重设定的灵活性。加入参数优化,使权重可以根据市场环境自动调整,减少误判概率。

此外,还可以结合其他指标,比如成交量的异常等,避免被套利交易误导判断。

### 总结

该策略整体思路清晰易懂,使用均线和方差判断价格趋势和波动性,然后组合输出能清楚识别高点低点的曲线。这种基于多周期组合判断的方法,可以有效获取市场的长短期特征,提高对转折点的判断准确性。优化空间也很大,可从周期、权重、指标等多个方面进行调整,使策略更稳定和全面。

||

### Overview  

This strategy identifies price highs and lows by calculating moving averages and variances over different time periods to determine trend and volatility.  

### Strategy Logic

The core logic of this strategy is to compute moving averages and variances over recent different time periods. Specifically, it calculates 5-day, 4-day and 3-day moving averages (ma, mb, mc) and variances (da, db, dc). It then compares the sizes and selects the period with the highest variance to represent the current trend. Finally, it multiplies the squared variance of the representative period by its moving average to output the final curve wg.  

Thus, when price breaks out upward or downward, the representative period and its variance will change significantly, causing wg to change markedly as well, achieving identification of highs and lows.  

### Advantage Analysis

This idea of judging trend changes based on different periods is effective and can clearly identify price inflection points. Compared to single period judgment, combining multiple periods can improve accuracy and timeliness.

Calculating moving average and variance is also simple and efficient. With small code size, it is highly sensitive to sudden price changes and can detect breakouts quickly.

### Risk Analysis  

The periods used in this strategy are short. For mid- to long-term purposes, the judgment may not be accurate and comprehensive enough. Short-term price fluctuations may cause misjudgments.   

Also, the weighting of moving averages and variances affects the judgment results. If set improperly, the signals could be biased.

### Optimization Directions 

More time periods of different lengths could be added to form a combination to make the judgment more comprehensive, e.g. 10-day, 20-day for mid- to long-term purposes.

Different schemes of weights could also be tested to make the weighting setting more flexible. Parameter optimization could be introduced to auto-adjust the weights based on market conditions to reduce misjudgment probability.

In addition, other indicators could be incorporated, like abnormal trading volume, to avoid being misled by arbitrage trading.   

### Conclusion

The overall logic of this strategy is clear and easy to understand, using moving averages and variances to judge price trend and volatility, and then combining them to output a curve that can clearly identify highs and lows. Such multi-period combined judgment can effectively capture both short- and long-term market characteristics, improving the accuracy of inflection point detection. There is also large room for optimization, from aspects like periods, weights and indicators etc, to make the strategy more robust and comprehensive.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-12 00:00:00
end: 2024-02-19 00:00:00
period: 12h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("x²", overlay=false)


a1=(close[2]-close[3])/1
a2=(close[1]-close[3])/4
a3=(close[0]-close[3])/9

b1=(close[3]-close[4])/1
b2=(close[2]-close[4])/4
b3=(close[1]-close[4])/9
b4=(close[0]-close[4])/16

c1=(close[4]-close[5])/1
c2=(close[3]-close[5])/4
c3=(close[2]-close[5])/9
c4=(close[1]-close[5])/16
c5=(close[0]-close[5])/25

ma=(a1+a2+a3)/3
da=(a1-ma)*(a1-ma)
da:=da+(a2-ma)*(a2-ma)
da:=da+(a3-ma)*(a3-ma)
da:=sqrt(da)
da:=min(2, da)
da:=1-da/2
da:=max(0.001, da)


mb=(b1+b2+b3+b4)/4
db=(b1-mb)*(b1-mb)
db:=db+(b2-mb)*(b2-mb)
db:=db+(b3-mb)*(b3-mb)
db:=db+(b4-mb)*(b4-mb)
db:=sqrt(db)
db:=min(2, db)
db:=1-db/2
db:=max(0.001, db)

mc=(c1+c2+c3+c4+c5)/5
dc=(c1-mc)*(c1-mc)
dc:=dc+(c2-mc)*(c2-mc)
dc:=dc+(c3-mc)*(c3-mc)
dc:=dc+(c4-mc)*(c4-mc)
dc:=dc+(c5-mc)*(c5-mc)
dc:=sqrt(dc)
dc:=min(2, dc)
dc:=1-dc/2
dc:=max(0.001, dc)



g=close
if(da>db and da>dc)
    g:=da*da*ma
else
    if(db > da and db > dc)
        g:=db*db*mb
    else
        g:=dc*dc*mc

wg=wma(g, 2)
plot(wg)
plot(0, color=black)


longCondition = true //crossover(sma(close, 14), sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = true //crossunder(sma(close, 14), sma(close, 28))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/442261

> Last Modified

2024-02-20 16:01:12
