
> Name

基于MACD和RSI指标的交叉信号策略Trading-Strategy-Based-on-MACD-and-RSI-Crossover-Signals

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/126231014c3006c5fdb.png)

[trans]

## 概述

本策略运用MACD指标判断市场趋势和寻找潜在买卖点,同时结合RSI指标确认超买超卖现象,在MACD指标发出买入/卖出信号时,只有当RSI也同时确认市场处于超卖/超买状态时,才会生成交易信号,进行买入或卖出。该策略可以有效过滤假信号,提高策略稳定性。

## 策略原理

### MACD指标计算

MACD指标由快速移动平均线(EMA)与慢速移动平均线的差值构成,反映短期和长期平均价格变动趋势的差异。本策略中,快速线的周期为12日,慢速线的周期为26日。

当快速线上穿慢速线时为金叉信号,表示市场步入上涨趋势;当快速线下穿慢速线时为死叉信号,表示市场步入下跌趋势。

### RSI指标计算 

RSI指标反映市场的超买超卖现象。本策略中,RSI的参数周期设置为14。

RSI BELOW 30 when buyers outpaced sellers for an extended period suggests ASSET was OVERSOLD. 

RSI ABOVE 70 when selling pressure outpaced buying pressure over the tracked timeline suggests ASSET was OVERBOUGHT.

当RSI低于30时表示市场处于超卖状态;当RSI高于70时,表示市场处于超买状态。

### 策略信号

仅依靠MACD指标生成交易信号时,会出现一定的假信号。本策略运用RSI指标过滤信号,只有当MACD发出信号的同时,RSI也确认市场超买超卖状态,才会生成实际的交易信号。

具体来说,当MACD形成金叉信号,如果这时RSI<=34,确认市场处于超卖状态,则产生买入信号;当MACD形成死叉信号,如果这时RSI>=75,确认市场处于超买状态,则产生卖出信号。

这种双重确认机制,可以过滤掉许多不可靠的交易信号,从而提高策略的稳定性和可靠性。

## 优势分析

### 双重指标过滤 提高信号可靠性

本策略运用MACD与RSI两个指标相结合,进行双重确认。这可以有效减少假信号的干扰,过滤掉一些不可靠的交易信号,从而提高信号的可靠性和稳定性。

### 清晰的趋势判断

MACD作为一个量价指标,可以清楚判断市场的涨跌趋势。结合RSI指标的超买超卖判断,可以准确抓住市场重要的反转点,进出仓信号明确。

### 参数优化空间大

本策略MACD和RSI的参数可以进行优化调整,适应不同周期和不同品种,优化空间较大。通过参数调整可以针对性的因地制宜,获得更好的策略效果。

### 容易理解实现

该策略运用的MACD和RSI等指标都是非常典型和常用的技术指标,易于理解,代码实现也非常简单直观。这为参数调整与优化带来了便利。

## 风险分析

### 可能错过部分交易机会

本策略采用的是比较谨慎的双重确认策略,为过滤假信号而可能错过一些单一指标条件下就可以获得利润的交易机会。

* 解决方法:适当放宽RSI的阈值范围,降低确认严格度,容许策略获得更多交易机会。

### 行情剧烈变化时发生亏损

当行情出现剧烈变化时,MACD和RSI指标都可能会延迟作出判断,导致策略生成错误的交易信号产生亏损。

* 解决方法:加入止损机制,避免单笔亏损过大;调整参数使指标对剧烈变化有一定的敏感度。

### 效果与参数设置质量高度相关

本策略的效果很大程度上取决于MACD和RSI等参数的设置。如果参数设置不当,容易获得反向的交易信号。

* 解决方法:通过回测对参数组合进行优化,找到最佳的参数设置。

## 优化方向 

### 加入止损机制管理风险

可以设置价格止损或指标止损规则,在亏损扩大到一定程度时止损出场,有效控制单笔损失。

### 调整参数适应行情特征

可以通过调整MACD的快慢线周期、RSI的超买超卖阈值等参数,优化参数设置,使其更加适合不同周期和品种的行情特征。

### 测试不同品种寻找最佳适配

可以在不同的品种如股票指数、数字货币、外汇、商品等上进行回测,找到策略效果最好的品种。

### 加入其它指标进行多维确认

可以在现有MACD和RSI的基础上,引入 stoch、OBV、CCI等其它指标,实现多指标確認,进一步提高信号质量。

## 总结

本策略基于MACD指标判断市场趋势方向和交易信号。为了过滤假信号,加入RSI指标确认超买超卖现象,只有两者同时满足条件时才产生交易信号。这种双重指标確認机制,可以有效提高信号的质量和稳定性。

通过参数优化、止损机制的应用、多指标確認等改进手段,策略的效果可以得到进一步提升。该策略操作简单,稳定性较好,是一种适合初学者实践和优化的量化交易策略。

|| 

## Overview

This strategy uses the MACD indicator to judge market trends and identify potential trading points, while combining the RSI indicator to confirm overbought/oversold conditions. Trading signals are only generated when the MACD gives a buy/sell signal and the RSI simultaneously confirms that the market is oversold/overbought. This can effectively filter out false signals and improve the stability of the strategy.

## Strategy Principles 

### MACD Indicator Calculation

The MACD indicator consists of the difference between fast EMA and slow EMA, reflecting the difference between short-term and long-term average price trends. In this strategy, the fast line period is 12 days and the slow line period is 26 days.

When the fast line crosses above the slow line, it is a golden cross signal indicating an uptrend. When the fast line crosses below the slow line, it is a death cross signal indicating a downtrend.

### RSI Indicator Calculation

The RSI indicator reflects the overbought/oversold conditions in the market. The RSI period parameter is set to 14 in this strategy. 

RSI BELOW 30 suggests the ASSET was OVERSOLD as buyers outpaced sellers for an extended period.

RSI ABOVE 70 suggests the ASSET was OVERBOUGHT as selling pressure outpaced buying pressure over the tracked timeline.

Readings below 30 indicate oversold conditions while readings above 70 indicate overbought conditions.

### Strategy Signals 

Relying solely on the MACD for trade signals can result in some false signals. This strategy uses the RSI to filter signals, only generating actual trading signals when the MACD gives a signal and the RSI simultaneously confirms overbought/oversold extremes.

Specifically, when the MACD generates a golden cross, if RSI<=34 at the same time, confirming an oversold market, a buy signal is generated. When the MACD forms a death cross, if RSI>=75, confirming an overbought market, a sell signal is generated.

This dual confirmation mechanism can filter out many unreliable trading signals, thereby improving the stability and reliability of the strategy.

## Advantage Analysis

### Dual Indicator Filtering Enhances Signal Reliability 

This strategy combines the MACD and RSI indicators for dual confirmation, which can effectively reduce interference from false signals and filter out some unreliable trade signals, thereby improving signal reliability and stability.

### Clear Trend Judgement

As a price & volume indicator, the MACD can clearly determine market uptrends and downtrends. Combined with the RSI's overbought/oversold judgement, it can accurately capture important reversal points in the market. Entry and exit signals are clear.

### Large Parameter Optimization Space

The parameters of this strategy's MACD and RSI components can be optimized and adjusted to suit different cycles and trading instruments. There is ample optimization room through parameter tuning for improved strategy performance in different markets.

### Easy to Understand and Implement

The MACD, RSI and other indicators used in this strategy are very typical and commonly used technical indicators that are easy to understand. The strategy code is also very simple and intuitive, which brings convenience for parameter adjustment and optimization.

## Risk Analysis

### May Miss Some Trading Opportunities 

This strategy adopts a relatively conservative dual confirmation approach which, in filtering out false signals, may cause some missed trading opportunities that could have resulted in profits based on a single indicator signal.

* Solution: Appropriately expand the RSI threshold range to reduce the confirmation strictness and allow the strategy to capture more trading opportunities.

### Loss Occurrence During Extreme Market Moves

In the event of extreme market volatility, both the MACD and RSI indicators may lag in making judgements, leading to incorrect trade signals generated by the strategy and losses incurred.

* Solution: Incorporate stop loss mechanisms to prevent excessive losses in single trades. Adjust parameters to build adequate sensitivity of the indicators to extreme market moves.

### Performance Depends Heavily on Parameter Settings

The performance of this strategy depends largely on the quality of the MACD, RSI and other parameter settings. Incorrect parameter configuration can easily lead to reversed trade signals. 

* Solution: Optimize parameter combinations through backtesting to locate optimal parameter settings.

## Optimization Directions

### Incorporate Stop Loss Mechanisms To Control Risks

Price or indicator based stop loss rules can be implemented to exit positions with a pre-defined allowable loss threshold, effectively capping losses on individual trades.

### Adjust Parameters To Suit Market Characteristics 

Continuous optimization of key parameters like MACD fast/slow line periods and RSI overbought/oversold thresholds to align with evolving cycle structures and peculiarities of different trading instruments.

### Test Across Assets To Discover Best Fit

Perform backtests across equity indices, cryptocurrencies, forex pairs, commodities and other assets to discover which market best suits the characteristics of the strategy.

### Incorporate Additional Indicators For Multidimensional Confirmation

Indicators like Stochastics, OBV, CCI etc. can be added on top of the MACD and RSI components for greater confirmation precision via a multidimensional signal filtering approach.

## Conclusion

This strategy determines market trends and trade signals based on the MACD indicator, while the RSI confirms overbought/oversold conditions to filter false signals. This dual confirmation mechanism can effectively improve signal quality and stability. 

Performance can be further enhanced through optimization techniques, stop losses, multiprong confirmation etc. With simple logic and good stability, it serves as a good starting strategy for novice quants to practice and optimize.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast moving average|
|v_input_2|26|Slow moving average|
|v_input_3|9|signalLength|
|v_input_4|34|RSIOverSold|
|v_input_5|75|RSIOverBought|
|v_input_6|14|Length|
|v_input_7|8|Start Date|
|v_input_8|3|Start Month|
|v_input_9|2021|Start Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-17 00:00:00
end: 2023-12-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(default_qty_type = strategy.percent_of_equity, default_qty_value = 25, pyramiding = 10, title="MACD crossover while RSI Oversold/Overbought", overlay=true, shorttitle="MACD Cross + RSI Oversold Overbought", initial_capital = 1000)

//MACD Settings
fastMA = input(title="Fast moving average",  defval = 12, minval = 7) //7 16
slowMA = input(title="Slow moving average",  defval = 26, minval = 7) //24 26 
signalLength = input(9,minval=1) //9 6

//RSI settings
RSIOverSold = input(34 ,minval=1) //26
RSIOverBought = input(75 ,minval=1) //77
src = close, len = input(14, minval=1, title="Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
wasOversold = rsi[0] <= RSIOverSold or rsi[1] <= RSIOverSold or rsi[2] <= RSIOverSold or rsi[3] <= RSIOverSold or rsi[4] <= RSIOverSold or rsi[5] <= RSIOverSold
wasOverbought = rsi[0] >= RSIOverBought or rsi[1] >= RSIOverBought or rsi[2] >= RSIOverBought or rsi[3] >= RSIOverBought or rsi[4] >= RSIOverBought or rsi[5] >= RSIOverBought


[currMacd,_,_] = macd(close[0], fastMA, slowMA, signalLength)
[prevMacd,_,_] = macd(close[1], fastMA, slowMA, signalLength)
signal = ema(currMacd, signalLength)

crossoverBear = cross(currMacd, signal) and currMacd < signal ? avg(currMacd, signal) : na
crossoverBull = cross(currMacd, signal) and currMacd > signal ? avg(currMacd, signal) : na

plotshape(crossoverBear and wasOverbought , title='MACD-BEAR', style=shape.triangledown, text='overbought', location=location.abovebar, color=orange, textcolor=orange, size=size.tiny) 
plotshape(crossoverBull and wasOversold, title='MACD-BULL', style=shape.triangleup, text='oversold', location=location.belowbar, color=lime, textcolor=lime, size=size.tiny) 

// Configure backtest start date with inputs
startDate = input(title="Start Date",
     defval=8, minval=1, maxval=31)
startMonth = input(title="Start Month",
     defval=3, minval=1, maxval=12)
startYear = input(title="Start Year",
     defval=2021, minval=1800, maxval=2100)

afterStartDate = (time >= timestamp(syminfo.timezone,
     startYear, startMonth, startDate, 0, 0))
     
if (afterStartDate==true)
    posSize = abs(strategy.position_size)
    strategy.order("long", strategy.long, when = crossoverBull and wasOversold) 
    strategy.order("long", long=false, qty=posSize/3, when = crossoverBear and wasOverbought) 

```

> Detail

https://www.fmz.com/strategy/435766

> Last Modified

2023-12-18 17:19:03
