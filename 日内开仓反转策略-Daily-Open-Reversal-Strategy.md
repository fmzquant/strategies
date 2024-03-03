
> Name

日内开仓反转策略-Daily-Open-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1173c8852a8a559d3b3.png)
 [trans]
### 概述

日内开仓反转策略(Daily Open Reversal Strategy)是一种基于均值反转的日内交易策略。它根据前一根K线的实体大小来判断当前K线的反转机会。如果当前K线与前一根K线的开盘价存在明显的间隙,同时实体大小超过参数设定的范围,那么就会触发做多或做空的交易信号。    

该策略最佳的交易品种是英镑和澳元的日线图形,但也可以在其他品种和时间周期进行测试优化。策略参数包括起始和结束日期、前一根K线实体大小、止损位和止盈位。

### 策略原理  

日内开仓反转策略的核心逻辑在于捕捉短期的超买超卖现象。当市场出现过度行情后,价格往往会产生反弹和回调。该策略就是利用这一均值反转的特征来获利。

具体来说,策略会判断当前K线的开盘价与前一根K线的收盘价是否存在明显的价格间隙。如果满足realbody(前一根K线)>参数设定的范围,并且当前K线属于缺口隙开盘,那么就会产生买入或卖出信号。做多信号触发条件是开盘价较上一根K线收盘价上涨超过范围且为下跌缺口;做空信号触发条件则为开盘价较上一根K线收盘价下跌超过范围且为上涨缺口。

进入仓位后,策略会设置止损位和止盈位。只要价格达到止损位就会退出仓位以控制损失;如果达到止盈位就会退出仓位以锁定利润。

### 优势分析

日内开仓反转策略具有如下优势:

1. 捕捉市场短期反转,增强获利概率

   该策略充分利用了价格的短期反转特征,在超买超卖现象出现时打开仓位,增加了获利的概率。

2. 风险可控,止损机制有效控制亏损

   策略设置了止损位,只要亏损达到事先设定的最大值就会退出仓位。这能有效限制交易的亏损风险。

3. 适用于多种品种,灵活性强

   策略适用于多种外汇品种,尤其是英镑和澳元这些波动较大的货币。同时参数可以进行调整优化,灵活性强。

4. 简单易行,适合日内交易

   该策略以日内操作为主,具有交易频次高、时间跨度短的特点。规则简单清晰,非常适合日内短线交易。

### 风险分析 

日内开仓反转策略也存在一定的风险,主要体现在:  

1. 行情延续可能导致亏损

   行情可能出现延续性很强的单边行情,这时反转信号会产生错误交易。如果反转没有成功,就会面临亏损的风险。

2. 频繁交易增加交易费用

   日内短线策略会增加交易次数。交易费用的增加也会抵消部分利润。

3. 参数设定需要测试优化

   前一根K线实体大小、止损止盈位等参数都是关键的影响因素,需要充分测试以达到最佳参数组合。

4. 持仓时间短,需要及时监控

   由于是日内策略,持仓时间很短。需要实时监控市场以便及时入场和止损。

### 优化方向

日内开仓反转策略可以从以下几个方面进行优化:

1. 优化参数,寻找最佳参数组合

   可以通过回测和模拟交易,测试不同的前一根K线实体大小、止损位和止盈位参数,找到最优参数以提高策略效率。

2. 结合多个时间周期分析

   可以在更高的时间周期确定趋势方向,避免逆势交易。也可以在更低的时间周期优化具体的买卖点。

3. 优化止损机制

   可以结合波动率指标改进止损策略,在行情出现异常波动时及时止损。或者trailing stop逐步跟踪止损等。

4. 增加过滤条件

   增加交易量、波动率等过滤条件,确保仅在充分反转迹象出现时才交易。避免无谓的反转交易。

5. 增强仓位管理

   优化仓位数量和比例,防止单笔亏损过大。同时尝试渐进进入和渐进退出的策略,降低风险。


### 总结  

日内开仓反转策略是一种典型的短期均值反转策略。它捕捉价格的超买超卖现象进行反向交易。具有风险可控、简单易行等优点。但也需要注意行情延续和频繁交易的风险。通过参数优化、止损优化、滤波条件以及仓位管理等手段可以进一步提高策略稳定性和盈利能力。它适用于喜欢日内交易的投资者。

||

### Overview  

The Daily Open Reversal Strategy is an intraday mean-reversion strategy based on the real body size of the previous candlestick to determine reversal opportunities in the current candlestick. It will trigger long or short trade signals if there is a significant gap between the open price of the current candlestick and the close price of the previous one, provided the real body size exceeds the threshold set in the parameters.

The best trading assets for this strategy are GBP and AUD daily charts, but other assets and timeframes can also be tested. The parameters include start and end dates, real body size of the previous candle, stop loss (in pips), and take profit (in pips).

### Strategy Logic

The core logic behind Daily Open Reversal Strategy is to capture short-term overbought and oversold scenarios. Prices tend to retrace and correct after excessive movements in the market. This strategy aims to capitalize on such mean reversion tendency for profits.  

Specifically, the strategy checks if there is a significant gap between the open price of the current candlestick and the close price of the previous one. If the real body size of the previous candle exceeds the threshold set in parameters, and the current candle shows an opening gap, long or short signals will be triggered. The long signal triggers when open > previous close with a down gap. The short signal triggers when open < previous close with an up gap.
  
Once entered into a position, stop loss and take profit levels are set. The position will be closed if hitting the stop loss level to control losses or take profit level to lock in gains.


### Advantage Analysis   

The Daily Open Reversal Strategy has the following key advantages:

1. Capture market short-term reversals, higher profitability

   It takes full advantage of short-term price reversals, opening positions after overbought/oversold scenarios for higher chance of gains.
   
2. Controllable risk, effective stop loss to limit losses

   The stop loss mechanism can effectively limit trading losses once they hit the preset maximum value.
   
3. Flexibility across assets  

   It is applicable to various FX pairs, especially those volatile ones like GBP and AUD. Parameters can also be adjusted for optimization flexibility.
   
4. Simplicity, suits intraday trading   

   With high trading frequency and short timeframe, it has simple and clear rules that fit intraday or day trading very well.


### Risk Analysis

There are also some inherent risks in Daily Open Reversal Strategy:

1. Trend continuation risks losses
    
   Persistent one-sided trends increase the chance of failed reversals and thus losses.

2. Higher trading costs
   
   Increased number of trades can eat up gains due to more trading costs.

3. Parameter optimization needed
    
   Parameters like previous candle real body size, stop loss and take profit levels require sufficient optimization for best results.

4. Close monitoring required

   The short holding period requires close tracking of the markets for timely entries and stop losses.


### Optimization Directions  

The Daily Open Reversal Strategy can be optimized in the following aspects:

1. Optimize parameters for best combination

   Run backtests and demo trading to determine the optimal previous candle real body size, stop loss level, take profit level for higher efficiency.

2. Incorporate multiple time frame analysis

   Establish overall trend direction in higher timeframes to avoid counter-trend trades. Optimize specific entry and exit levels in lower timeframes.
   
3. Enhance stop loss mechanisms 

   Employ volatility indicators to improve stop loss strategy for better protection in volatile markets, or trailing stop order etc.

4. Add filters 
    
   Add filters like volume, volatility to ensure reversal signals are reliable enough to trade. Avoid unnecessary reverse trades.  

5. Improve position sizing

   Optimize trade size and allocation to prevent oversized position leading to large losses. Experiment with gradual entries and exits to reduce risks.


### Conclusion   

The Daily Open Reversal is a typical short-term mean-reverting strategy that captures overbought and oversold scenarios for reverse trading. It has the advantage of controllable risks and simplicity. But trend continuation risk and high trading frequency should be noted. Further improvements can be made through parameter optimization, stop loss enhancement, adding filters and position sizing to boost its stability and profitability. It suits investors who prefer intraday trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.01|Previous Candle Range|
|v_input_2|200|Take Profit in pips|
|v_input_3|1000|Stop Loss in pips|
|v_input_4|true|Start Date|
|v_input_5|true|Start Month|
|v_input_6|2015|Start Year|
|v_input_7|31|End Date|
|v_input_8|12|End Month|
|v_input_9|2020|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-19 00:00:00
end: 2024-01-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @version=4
strategy("Daily Open Strategy", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 10000)

PrevRange = input(0.0100, type=input.float, title="Previous Candle Range")
TP = input(200, title="Take Profit in pips")
SL = input(1000, title="Stop Loss in pips")

startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer,
     defval=2015, minval=1800, maxval=2100)

endDate = input(title="End Date", type=input.integer,
     defval=31, minval=1, maxval=31)
endMonth = input(title="End Month", type=input.integer,
     defval=12, minval=1, maxval=12)
endYear = input(title="End Year", type=input.integer,
     defval=2020, minval=1800, maxval=2100)


isLong = strategy.position_size > 0
isShort = strategy.position_size < 0

longTrigger = (open-close) > PrevRange and close<open 
shortTrigger = (close-open) > PrevRange and close>open

inDateRange = true


strategy.entry(id = "Long", long = true, when = (longTrigger and not isShort and inDateRange))
strategy.exit("Exit Long", "Long", loss=SL, profit=TP) 

strategy.entry(id = "Short", long = false, when = (shortTrigger and not isLong and inDateRange))
strategy.exit("Exit Short", "Short", loss=SL, profit=TP)

```

> Detail

https://www.fmz.com/strategy/440076

> Last Modified

2024-01-26 14:35:22
