
> Name

定期定额投资策略Dollar-Cost-Averaging-Investment-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18a69f8370ec501e1f9.png)

[trans]


### 概述

定期定额投资策略是一种非常简单的投资策略,特别适合投资入门者使用。该策略的核心思想是,不管市场价格如何变动,投资者都以固定的金额,按照预定的时间间隔(如每年一次),定期购买某种资产。这种策略也称为DCA(美元成本平均法)策略。以定投美国标普500指数(SPY)为例,可以每年购买10000美元的SPY,不管当时的股市价格高低。假定投资的宏观经济环境保持良好,长期来看(例如10年),定投策略可以获得很好的资本收益。定投是入门投资者可以采用的最安全的策略,所有其他类型的策略都应该和定投策略进行对比;如果某策略无法打败定投策略的收益,那么该策略就是无用的。

### 策略原理

本策略的核心逻辑非常简单直接。投资者只需要设置两个输入参数,即每次投资的金额contribution和投资间隔frequency。策略会根据这两个参数,在不同的时间周期(小时、天、周、月)上,判断当前bar是否符合投资区间。如果符合,就根据contribution参数计算出需要购买的股数units,然后执行买入开仓操作。

以月时间周期为例,判断逻辑是当前bar的索引 % frequency == 0。 strategy.equity曲线显示了使用该策略的累计收益情况。

需要注意的是,本策略假设投资者具有至少5-10年的长期持有期。持有时间越长,收益越好。投资者唯一需要注意的是上文提到的宏观经济环境,如果不确定,请选择购买ETF,不要买入个股或加密货币。

### 优势分析

定投策略最大的优势在于其简单易执行。这让任何投资入门者都可以轻松使用,不需要复杂的数字技能或对市场的预测。定投可以帮助投资者在低点买入,在高点减少买入,从长期来看降低成本价。定投也可以减少对短期市场波动的关注,培养投资者的长期持有习惯。定投策略容易坚持执行下去,不会因为市场的大幅调整而临时更改策略。

### 风险分析

定投策略的主要风险在于持有的资产价格长期下跌,导致损失。这通常发生在整体经济萧条,或者持有的具体资产竞争力下降的情况。另一个风险是持有期不够长,无法看到长期收益的兑现。可以通过选择具有长期增长潜力的优质资产来降低这些风险,同时延长持有期至少5-10年。

### 优化方向

定投策略可以在以下方面进行优化:1)调整购买的时间周期,如将间隔改为每周或每两周一次,以平滑成本价;2)动态调整购买金额,在市场低迷时增加购买额,市场牛市时减少购买额;3)购买具有负相关的不同资产,降低整体波动性;4)结合基本面选择高质量标的,而不要盘整购买指数。

### 总结

定期定额投资策略以其简单性见长,适合任何入门投资者。它可以帮助投资者平滑进入市场,培养长期持有习惯。虽然可以通过调整购买时间、金额、标的来进行优化,但核心思路保持简单固定投资是定投策略的最大优势。所有投资策略都应以定投策略的长期表现作为基准。只要选择优质资产并坚持较长的持有期,定投策略可以为投资者带来稳定的长期增长。

||

### Overview

The dollar cost averaging investment strategy is a very simple investment approach, especially suitable for beginning investors. The core idea of this strategy is to invest a fixed amount of money at preset intervals (e.g. annually), regardless of market price fluctuations. This strategy is also known as DCA (dollar cost averaging). For example, one can invest $10,000 in SPY (S&P 500 ETF) every year, no matter the market prices. Assuming favorable macroeconomic conditions, DCA strategies can result in good capital gains over long periods, e.g. 10 years. DCA is the safest strategy for novice investors, and all other strategies should be benchmarked against DCA - if a strategy cannot beat DCA, it is useless.

### Strategy Logic

The core logic of this strategy is very straightforward. The investor only needs to set two input parameters - contribution amount and frequency. The strategy will check the current bar against these intervals (hourly, daily, weekly, monthly) to determine if investment should occur. If yes, it calculates the # of units to buy based on contribution, and opens a long position. 

For example on monthly timeframe, the logic checks if current bar index % frequency == 0. The equity curve shows the cumulative returns from this strategy.

It is important to note this strategy assumes a long holding period of at least 5-10 years. The longer the holding period, the better the returns. The only thing for investors to watch out for are the macroeconomic conditions mentioned earlier. When in doubt, buy ETFs rather than individual stocks or crypto.

### Advantage Analysis

The biggest advantage of dollar cost averaging is its simplicity, which allows any beginning investor to easily implement it without complex quantitative skills or market forecasts. DCA helps investors buy lows and reduce buys at highs, lowering cost basis over time. It also reduces short term market noise, helping to cultivate long term holding habits. DCA is easy to stick to without strategy changes due to market gyrations.

### Risk Analysis

The main risk of DCA is that the asset prices decrease for long periods, leading to losses. This usually happens when the overall economy is depressed, or the competitiveness of the specific asset held falls. Another risk is not holding for long enough periods to realize the long term gains. These risks can be mitigated by selecting quality assets with long term growth potential, and holding for at least 5-10 years.

### Improvement Areas

DCA strategies can be enhanced by: 1) Adjusting the buying frequency, e.g. weekly or biweekly to smooth cost basis; 2) Dynamically changing buy amounts, increasing during market troughs and decreasing during peaks; 3) Buying negatively correlated assets to lower overall volatility; 4) Fundamental stock picking rather than broad index funds.

### Conclusion

Dollar cost averaging strategies excel in their simplicity, making them suitable for any beginning investor. They help smooth into the markets and cultivate long term holding habits. While optimizations can be made around buying intervals, amounts, and targets, the core benefit remains the fixed investing approach. All investment strategies should be benchmarked against DCA's long term returns. By picking quality assets and holding for extended periods, DCA can provide stable long term growth for investors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10000|Contribution (USD)|
|v_input_2|12|Frequency (Months)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-25 00:00:00
end: 2023-10-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// To simplify matters for newbies, this script only computes DCA on H1, D1, W1 and M1 timeframes
// If you want a script that DCAs per x-bars, let me know in the comments.
// © TsangYouJun

//@version=4
strategy("DCA Strategy v1", overlay=false)

//user inputs
contribution = input(title="Contribution (USD)",type=input.integer,minval=1,maxval=1000000,step=1,defval=10000,confirm=false)
frequency = input(title="Frequency (Months)",type=input.integer,minval=1,maxval=1000000,step=1,defval=12,confirm=false)

//units to buy
units = contribution / close

//when to dca
hourDca = bar_index[0] % (frequency * 28 * 24)
dayDca = bar_index[0] % (frequency * 28)
weekDca = bar_index[0] % (frequency * 4)
monthDca = bar_index[0] % frequency

//when to dca
if(timeframe.period == "60" and hourDca == 0)
    strategy.order("DCA", strategy.long, units)
    
if(timeframe.period == "D" and dayDca == 0)
    strategy.order("DCA", strategy.long, units)
    
if(timeframe.period == "W" and weekDca == 0)
    strategy.order("DCA", strategy.long, units)
    
if(timeframe.period == "M" and monthDca == 0)
    strategy.order("DCA", strategy.long, units)

//plot strategy equity
// plot(strategy.equity - strategy.initial_capital, color=color.blue, linewidth=2, title="Net Profit")
```

> Detail

https://www.fmz.com/strategy/430762

> Last Modified

2023-11-01 16:24:56
