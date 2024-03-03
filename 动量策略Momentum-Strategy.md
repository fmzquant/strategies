
> Name

动量策略Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

[trans] 

### 概述

动量策略是一种根据价格变动趋势来进行交易的策略。该策略通过计算一定周期内的价格变动情况,判断价格运动趋势,进而产生交易信号。当价格出现上涨趋势时,产生买入信号;当价格出现下跌趋势时,产生卖出信号。本策略采用双动量指标交叉产生交易信号。

### 策略原理

该策略通过计算一定周期内的收盘价变动情况,判断价格的动量。具体来说,是计算收盘价相对于N周期之前的收盘价的变动情况。

首先计算第一个动量指标MOM0,公式为:

MOM0 = CLOSE - CLOSE[N]  

其中,CLOSE表示当前周期收盘价,CLOSE[N]表示N周期之前的收盘价。这样MOM0>0表示当前周期相对N周期之前收盘价上涨,MOM0<0表示当前周期相对N周期之前收盘价下跌。

然后计算第二个动量指标MOM1,公式为:

MOM1 = MOM0 - MOM0[1]

即计算MOM0本周期的值减去上一周期的值。MOM1>0表示MOM0上涨,MOM1<0表示MOM0下跌。

同时计算第三个动量指标MOM2,公式为:

MOM2 = CLOSE - CLOSE[1]

即计算当前周期收盘价减去上一周期的收盘价。MOM2>0表示收盘价上涨,MOM2<0表示收盘价下跌。

当MOM0>0且MOM1>0时,表示动量持续上涨,产生买入信号;当MOM0<0且MOM2<0时,表示动量持续下跌,产生卖出信号。

代码中还增加了时间条件time_cond,只有在设定的回测时间段内才会产生交易信号。另外在挂单前再检查一次条件是否仍然成立,避免信号消失后仍下单的情况。

### 优势分析

- 动量策略捕捉价格变化趋势,不受价格本身影响,避免了追高杀低的风险
- 采用双动量指标交叉,可过滤假突破,避免产生错误信号
- 增加时间和条件检查,可减少无效交易
- 简单易懂的策略原理,容易实施
- 可灵活调整参数,适用于不同市场环境

### 风险分析

- 动量指标存在滞后,可能错过转折点
- 双指标交叉增加滤波效果,但也可能错过部分机会
- 无法判断价格上涨或下跌的力度和速度
- 需要谨慎选择参数,过于敏感可能增加交易频率和滑点成本
- 效果依赖参数优化,不同时期参数需要调整

可通过缩短动量周期、引入趋势判断、或配置止损来减少风险。也可以考虑加入交易量指标进行滤波。

### 优化方向 

- 尝试不同的动量计算方式,如ROC,RSI等
- 增加趋势判断,避免反转震荡市
- 配置止损策略,控制单笔损失
- 结合交易量指标,确保有成交量支持
- 加入机器学习算法,实现参数的动态优化
- 多时间框架策略,区分短期和长期趋势
- 考虑跨市场套利,利用不同市场价格关系

### 总结

动量策略通过跟踪价格变动趋势而非价格本身,可有效判断市场热点方向,抓住价格上涨和下跌的机会。但动量具有滞后性,参数选择和组合优化对策略效果至关重要。本策略以双动量指标交叉为基础,可过滤部分噪音。可通过不断优化参数、加入新的技术指标、利用机器学习等方式进一步增强策略效果,控制风险。


||


### Overview

The momentum strategy is a trading strategy that follows the price trend based on price movement. It generates trading signals by calculating the price changes over a certain period. When the price uptrend is identified, it will trigger a buy signal. When the price downtrend is identified, it will trigger a sell signal. This strategy uses a double momentum indicator crossover to generate trading signals.

### Strategy Logic

This strategy calculates the price momentum by measuring the change of closing price compared to the closing price N periods ago. 

The first momentum indicator MOM0 is calculated as:

MOM0 = CLOSE - CLOSE[N]

where CLOSE is the current period's closing price and CLOSE[N] is the closing price N periods ago. MOM0 > 0 indicates the current closing price is higher than N periods ago, while MOM0 < 0 indicates the current closing price is lower than N periods ago.

The second momentum indicator MOM1 is calculated as:  

MOM1 = MOM0 - MOM0[1]

It calculates the difference between the current MOM0 and the previous period's MOM0. MOM1 > 0 indicates MOM0 is increasing, while MOM1 < 0 indicates MOM0 is decreasing.

The third momentum indicator MOM2 is calculated as:

MOM2 = CLOSE - CLOSE[1] 

It calculates the difference between the current closing price and the previous period's closing price. MOM2 > 0 indicates the closing price is rising, while MOM2 < 0 indicates the closing price is falling.

When MOM0 > 0 and MOM1 > 0, it indicates the momentum is consistently rising and triggers a buy signal. When MOM0 < 0 and MOM2 < 0, it indicates the momentum is consistently falling and triggers a sell signal.

The code also includes a time condition time_cond to only generate signals during the specified backtesting time range. It rechecks the condition before placing orders to avoid unwanted orders when the signal disappears.

### Advantage Analysis

- Captures price change trends regardless of price level itself, avoids chasing highs and killing lows
- The double momentum indicator crossover filters false breakouts and avoids wrong signals  
- Additional time and condition checks avoid unnecessary trades
- Simple and easy to understand logic, easy to implement
- Flexible parameters adjustable for different market environments

### Risk Analysis

- Momentum indicators have lag and may miss turning points
- The dual indicator crossover increases filtration but may also miss some opportunities  
- Unable to determine the strength and speed of price up or down
- Parameters need careful selection, overly sensitive settings may increase trade frequency and slippage cost
- Performance relies on parameter optimization, parameters need adjustment for different periods

Risks can be reduced by shortening momentum periods, adding trend determination, or configuring stop loss. Volume indicators may also be considered for additional filtration.

### Optimization Directions

- Test different momentum calculation methods like ROC, RSI etc.
- Add trend determination to avoid whipsaws in ranging markets
- Employ stop loss strategies to control single trade loss
- Combine with volume indicators to ensure volume support
- Introduce machine learning algorithms for dynamic parameter optimization
- Multi-timeframe strategies to differentiate short and long term trends
- Consider cross-market arbitrage strategies utilizing price relationships between markets

### Summary

The momentum strategy follows price change trends instead of price levels, effectively identifying market momentum directions for catching upside and downside price movements. However, momentum has lagging characteristics and parameter selection and combination optimization are crucial for strategy performance. This strategy uses dual momentum indicator crossover as a base, filtering some noise. Performance can be further enhanced and risks controlled by continuous optimization of parameters, integrating new technical indicators, and leveraging machine learning techniques.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2021-01-02T00:00:00)|Start Date|
|v_input_2|timestamp(2021-12-31T00:00:00)|End Date|
|v_input_3|12|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|true|Percent?|
|v_input_6|0|MOM Choice: MOM2|MOM1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-25 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Momentum Strategy", overlay = false, precision = 2, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash, commission_type = strategy.commission.percent, commission_value = 0, calc_on_every_tick = true)

// Calculate start/end date and time condition
startDate  = input(timestamp("2021-01-02T00:00:00"), title = "Start Date", type = input.time)
finishDate = input(timestamp("2021-12-31T00:00:00"), title = "End Date",type = input.time)
 
time_cond  = true

i_len           =       input(defval = 12,      title = "Length",       minval = 1)
i_src           =       input(defval = close,   title = "Source")
i_percent       =       input(defval = true,    title = "Percent?")
i_mom           =       input(defval = "MOM2",  title = "MOM Choice",   options = ["MOM1", "MOM2"])

momentum(seria, length, percent) =>
	_mom        =       percent ? ( (seria / seria[length]) - 1) * 100 : seria - seria[length]
	_mom

mom0        =       momentum(i_src, i_len, i_percent)
mom1        =       momentum(mom0, 1, i_percent)
mom2        =       momentum(i_src, 1, i_percent)

momX        =       mom1

if i_mom == "MOM2"
    momX    :=     mom2

if (mom0 > 0 and momX > 0 and time_cond)
    strategy.entry("MomLE", strategy.long, stop = high + syminfo.mintick, comment = "MomLE")
else
	strategy.cancel("MomLE")
if (mom0 < 0 and momX < 0 and time_cond)
	strategy.entry("MomSE", strategy.short, stop = low - syminfo.mintick, comment = "MomSE")
else
	strategy.cancel("MomSE")

plot(mom0, color = #00bcd4, title = "MOM")
plot(mom1, color = #00FF00, title = "MOM1", display = display.none)
plot(mom2, color = #00FF00, title = "MOM2")
```

> Detail

https://www.fmz.com/strategy/427877

> Last Modified

2023-09-26 15:16:56
