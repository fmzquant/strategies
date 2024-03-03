
> Name

动量指标和趋势跟踪趋势策略Momentum-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/126e84c1d7dc8fdd516.png)
 [trans]

### 概述

该策略融合了动量指标和趋势跟踪,目的是识别股价中期的强势上涨或下跌趋势,并在趋势开始阶段就进入场内。策略首先计算价格的20日动量指标,然后进行标准化处理得到0到1区间的标准化动量值。同时计算20日简单移动均线作为中期趋势的代表。当标准化动量大于0.5并且股价高于中期趋势时,做多;当标准化动量小于0.5并且股价低于中期趋势时,做空。

### 策略原理  

该策略的核心指标是价格的20日动量差值。动量差值定义为:(今日收盘价 - 20日前收盘价)/ 20日前收盘价。该指标反映了价格20天内的涨跌幅度。为了规避不同股票价差悬殊的问题,这里对动量差值进行了标准化处理,方法是:先找出最近100天中的最高和最低动量差值,再计算当前动量差值在这个极差内的比例,得到0到1的标准化动量值。标准化处理可以更好地反映出价格的涨跌力度。  

此外,策略还引入20日简单移动均线来判断中期趋势的方向。移动平均线是视觉直观的趋势判断工具。当价格于移动平均线之上时,视为处于上涨趋势;价格低于移动平均线时,属于下跌趋势。  

综合标准化动量指标和中期趋势判断,该策略拟捕捉股票中期明显的涨跌阶段。具体逻辑是:如果标准化动量大于0.5,说明股价近期正在加速上涨;同时价格高于20日移动平均线,代表中期依然是上涨趋势,这时做多;相反,如果标准化动量小于0.5,价格正在加速下跌;同时价格也低于20日均线,中期也处于下跌趋势,这时做空。

以上就是策略判断的基本逻辑。对于入场点,策略在动量和趋势同向时直接入场。对于止损,设置了一个固定的最小止损点,即买入最高价+最小价格变动单位,卖出最低价-最小价格变动单位,防止无效浮亏。

### 优势分析

该策略最大的优势在于同时利用两个指标进行判断,可以有效过滤掉一些误入场的情况。仅仅依靠动量指标容易产生假信号,而加入中期趋势指标则可以验证动量信号的有效性,避免在震荡行情中被套。同样,单纯跟踪趋势指标也会漏掉趋势中的部分机会,加入动量指标则可以识别趋势开始加速的时机。所以,两个指标的配合使用可以使策略更加稳健。

另一个优势是,策略选择20日周期进行计算。这种中期参数设定,可以减少高频交易的次数,有利于抓取中长线的价差机会。同时也可以过滤掉短期市场噪音的影响。

### 风险分析

该策略的主要风险在于动量和趋势可能会发生背离。当趋势和动量不一致时,会造成错误信号。例如,股价处于下跌趋势,但短期内发生反弹拉升,可能导致动量指标产生误导信号。这时如果直接做多就可能遭遇亏损。

此外,策略的止损设置也较为简单,无法完全规避风险。如果行情出现大幅跳空,固定点数的止损可能会被直接突破,应对不足。

### 优化方向  

该策略有以下几个主要的优化方向:

1. 加入更多指标进行综合判断。例如MACD,KD,布林带等。这可以检验动量信号的有效性,避免出现误导信号。

2. 动态调整止损位置。可以根据ATR指标实时设置浮动止损,或者利用期权定价理论计算合理的止损线。这可以减少止损被套的概率。

3. 优化参数周期。当前策略采用20日周期计算指标。可以测试更多的参数组合,找到最佳周期参数。

4. 区分买入卖出动量差值的判断标准。当前是使用同一个0.5的标准。可以分别测试买入和卖出的最佳参数。

5. 加入交易量过滤。例如只在成交量放大的情况下发出信号。这可以避免一些量能不足的假突破。

### 总结  

本策略综合运用趋势分析和动量指标,在中长线捕捉价格动量变化带来的交易机会。相比单一指标,多指标组合可以提高判断的准确性和盈利空间。止损规则简单直接,可以快速止损控制风险。如果进一步优化指标参数设定、止损方式、和加入更多辅助判断条件,可以使策略更加灵活和适应不同市况。总的来说,这是一个非常有前景和拓展空间的量化策略思路。

||

### Overview  

This strategy incorporates momentum indicators and trend tracking to identify the mid-term uptrend or downtrend of stock prices and take positions at the beginning stage of trends. The strategy firstly computes the 20-day momentum indicator of price, then processes it into a normalized momentum value ranging from 0 to 1. Meanwhile, the 20-day simple moving average is calculated as a representative of the mid-term trend. When the normalized momentum is larger than 0.5 and the price is above the mid-term trendline, go long. When the normalized momentum is less than 0.5 and the price is below the mid-term trendline, go short.

### Strategy Logic  

The core indicator of this strategy is the 20-day momentum difference of price. The momentum difference is defined as: (today's close – close 20 days ago) / close 20 days ago. This metric reflects the percentage increase or decrease of price over the last 20 days. To solve the issue of vastly different price ranges across stocks, the raw momentum difference is normalized to a 0 to 1 scale by the following process: first find the maximum and minimum values of momentum difference in the past 100 days, then calculate the percentage position of current difference within this range, resulting in a normalized momentum score between 0 and 1. The normalization can better capture the magnitude of price movement.

In addition, the 20-day simple moving average is included to determine the mid-term trend direction. Moving averages are visually intuitive tools for trend analysis. When the price is above the moving average line, it signals an uptrend. When below the line, it indicates a downtrend.   

By combining the normalized momentum indicator and mid-term trend judgment, this strategy aims to capture significant bullish and bearish stages in the mid-term horizon. The logic is: if normalized momentum is larger than 0.5, it means the price is accelerating with an uptrend recently. Meanwhile, if the price stays above 20-day MA, then the mid-term is still an uptrend. Under this condition, go long. On the contrary, if normalized momentum drops below 0.5, it signals an accelerating downtrend recently. Also, with the price below 20-day MA, the mid-term is bearish. Then we should go short.  

The above describes the core decision logic. For entries, the strategy simply enters the market when observing aligned momentum and trend signals. For stop loss, a fixed stop is set at the highest price + minimum tick size for longs, and lowest price - minimum tick size for shorts, in order to prevent inefficient floating losses.

### Advantage Analysis 

The biggest advantage of this strategy is utilizing two indicators for confirmation, which can effectively filter out some false entries in whipsaws. Relying solely on momentum signals tends to produce fake signals occasionally. By adding the condition of mid-term trend, the validity of momentum signals can be verified to avoid being trapped in ranging markets. Similarly, just following the trend may miss some opportunities at the beginning of trend accelerations, while combining momentum can capture such turns in a timely fashion. So the two indicators complement each other to form more robust decisions.  

Another advantage is the choice of 20-day period. This mid-term parameter helps reduce trading frequency compared to faster frequencies, allowing the strategy to capture larger swings over the medium-long term. Meanwhile, it can also filter out short-term market noises.

### Risk Analysis

The major risk of this strategy lies in the divergence between momentum and trend. Misalignments may lead to incorrect signals. For instance, during a downtrend, short-term bounces could push momentum upwards temporarily. If going straight long, it may encounter losses.  

In addition, the stop-loss mechanism is relatively simple and may fail to fully contain risks. In case of huge price gaps, the fixed loss size could be gapped through directly, proving inadequate reaction.

### Optimization Directions   

Here are some major optimization directions for this strategy:

1. Introduce more indicators for cross-examination, such as MACD, KD, Bollinger Bands etc. This can help verify the validity of momentum signals and avoid false signals.  

2. Dynamically adjust stop loss levels, through ATR or options pricing models for example. This may reduce the chance of stops being hit.

3. Optimize parameter periods. The current 20-day parameters can be tested for enhancements.

4. Differentiate buy and sell threshold of momentum difference. Currently 0.5 is used for both. The optimal levels may differ. 

5. Add trading volume filter to avoid false breakouts with insufficient volumes.

### Conclusion   

This strategy combines trend analysis and momentum indicators to capture trading opportunities arising from momentum changes over the medium-long term. Compared to single indicator systems, the multiple indicator approach improves accuracy and profitability. The simple stop mechanism facilitates quick risk control. Further optimizations on parameter tuning, stop-loss techniques and auxiliary conditions can enhance flexibility and adaptiveness to varying market regimes. Overall, it represents a promising quantitative strategy with expansion potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|lookback|
|v_input_3|0|Bar color scheme: 1|2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-29 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Momentum Strategy, rev.2", overlay=true)

//
// Data
//
src = input(close)
lookback = input(20)
cscheme=input(1, title="Bar color scheme", options=[1,2])

//
// Functions
//
momentum(ts, p) => (ts - ts[p]) / ts[p]

normalize(src, len) =>
    hi  = highest(src, len)
    lo  = lowest(src, len)
    res = (src - lo)/(hi - lo)

//
// Main
//
price = close
mid = sma(src, lookback)
mom = normalize(momentum(price, lookback),100)

//
// Bar Colors
//
clr1 = cscheme==1?black: red
clr2 = cscheme==1?white: green
barcolor(close < open ? clr1 : clr2)

//
// Strategy
//
if (mom > .5 and price > mid )
    strategy.entry("MomLE", strategy.long, stop=high+syminfo.mintick, comment="MomLE")
else
    strategy.cancel("MomLE")

if (mom < .5 and price < mid )
    strategy.entry("MomSE", strategy.short, stop=low-syminfo.mintick, comment="MomSE")
else
    strategy.cancel("MomSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/440370

> Last Modified

2024-01-29 16:38:22
