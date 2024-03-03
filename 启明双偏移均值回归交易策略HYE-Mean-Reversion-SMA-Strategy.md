
> Name

启明双偏移均值回归交易策略HYE-Mean-Reversion-SMA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1afbc5f1b00bdc7aacb.png)
 [trans]

## 概述

启明双偏移均值回归交易策略(HYE Mean Reversion SMA Strategy)是一个利用简单移动平均线和相对强弱指标的均值回归交易策略。该策略运用价格偏离移动平均线一定幅度时,结合RSI指标过滤信号,产生买入和卖出信号,属于短线交易策略。

## 策略原理  

该策略主要基于以下规则:

1. 当2期简单移动均线相对5期简单移动均线下降3%时,视为股票价格偏离均值,产生买入信号;

2. 当2期简单移动均线上穿5期简单移动均线时,视为价格回归均值,产生卖出信号;

3. 结合5期RSI指标的指数移动平均线,只有当RSI低于30时才产生买入信号,当RSI高于70时才产生卖出信号,从而避免不必要的交易。

该策略主要思路是利用价格短期内的波动去捕捉均值回归机会。当价格下跌一定幅度时买入,等价格重新回到均线附近时卖出,实现盈利。同时,RSI指标可用来识别超买超卖情况,过滤掉一些噪音交易信号。

## 策略优势分析  

该策略具有以下几点优势:

1. 操作简单,容易实施,监控成本低;

2. 利用价格偏离移动平均线的特征,捕捉短线均值回归机会,历史回测效果良好;  

3. RSI指标可有效过滤噪音交易,避免追高杀跌;

4. 可灵活调整参数,适应不同市场环境;

5. 可仅做多,仅做空或双向交易,可满足不同偏好。

## 风险分析

该策略也存在一些风险:  

1. 回归交易依赖于价格能够回归至均线,如果发生价格剧烈变动,止损风险较大;

2. 参数设置不当可能导致过于频繁交易或漏失机会;

3. 策略表现与市场相关性较大,在横盘及震荡市中表现较差。

对策:

1. 合理设置止损,控制单笔损失;

2. 参数逐步优化,评估收益回撤比; 

3. 结合股指增强策略的适应性。

## 优化方向  

该策略可从以下几个方面进行优化:

1. 测试不同的移动平均线组合,寻找最优参数;

2. 尝试结合其他指标识别趋势,提高策略胜率;  

3. 增加止损机制,降低策略最大回撤;

4. 优化买卖规则,提高盈利因子;

5. 结合机器学习技术建立自适应的参数。

## 总结  

启明双偏移均值回归交易策略是一个简单实用的短线均值回归策略。它利用价格相对移动平均线的偏差产生交易信号,同时用RSI指标过滤掉噪音,在回测中表现优异。该策略操作简单,容易实施,可根据市场环境调整参数,适合短线追踪均值回归的投资者。但也应注意回归不确定性及止损风险,需合理优化以适应不同市况。总体来说,该策略为量化交易提供了一个值得参考的均值回归策略模板。

||


## Overview  

The HYE Mean Reversion SMA Strategy is a mean reversion trading strategy using simple moving averages and the relative strength index (RSI). It generates buy and sell signals when the price deviates from the moving average by a certain percentage, combined with RSI indicator filtering. It is a short-term trading strategy.  

## Strategy Logic  

The strategy is mainly based on the following rules:  

1. When the 2-period simple moving average falls 3% below the 5-period simple moving average, it is considered the price deviates from the mean and a buy signal is generated.  

2. When the 2-period SMA crosses over the 5-period SMA, it is considered the price reverts to the mean and a sell signal is generated.
 
3. Combined with the exponential moving average of 5-period RSI, buy signals are only generated when RSI is below 30 and sell signals when RSI is above 70, to avoid unnecessary trading.  

The main idea is to capture mean reversion opportunities by using short-term price fluctuations. Buy when the price drops by a certain percentage, sell when the price reverts near the moving average, to make a profit. Meanwhile, the RSI indicator can identify overbought and oversold conditions to filter out some noisy trading signals.   

## Advantage Analysis   

The strategy has the following advantages:  

1. Simple to implement with low monitoring costs.  

2. Captures short-term mean reversion opportunities using price deviation from moving averages. Good backtest performances historically.
   
3. RSI indicator can effectively filter noise trading and avoid chasing peaks and killing valleys.  

4. Flexible parameter adjustment adaptable to different market environments. 

5. Supports long only, short only or both directions trading to suit different preferences.  

## Risk Analysis   

There are also some risks:   

1. Mean reversion relies on the price reverting to the moving average. There are high stop loss risks if drastic price changes occur.  

2. Improper parameter settings may lead to over-trading or missing opportunities.  

3. Performance is highly correlated with the market. Underperforms in range-bound and volatile markets.  

Countermeasures:  

1. Set proper stop loss to control single trade loss.  

2. Gradually optimize parameters and evaluate risk adjusted returns.

3. Combine with stock index to enhance adaptivity.  

## Optimization Directions    

The strategy can be optimized in the following aspects:  

1. Test different moving average combinations to find optimal parameters.  

2. Try incorporating other indicators to identify trends and improve win rate.   

3. Add stop loss mechanisms to reduce maximum drawdown. 

4. Optimize entry and exit rules to improve profit factors.  

5. Adopt machine learning techniques to build adaptive parameters.  

## Conclusion   

The HYE Mean Reversion SMA Strategy is a simple and practical short-term mean reversion strategy. It uses the price deviation from moving averages to generate trading signals, filtering out noise with RSI indicator. It demonstrated good backtest performances. The strategy is easy to implement with adjustable parameters adaptive to different market environments. But the uncertainty of reversion and stop loss risks should be noted, necessitating proper optimization for different market conditions. Overall, it provides a good reference mean reversion strategy template for quantitative trading.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0|Trade Direction: Long Only|Short Only|Both|
|v_input_3|2|Small Moving Average|
|v_input_4|5|Big Moving Average|
|v_input_5|3|Percent below to buy %|
|v_input_6|3|Percent above to sell %|
|v_input_7|2|Rsi Period|
|v_input_8|30|Maximum Rsi Level for Buy|
|v_input_9|70|Minimum Rsi Level for Sell|
|v_input_10|true|Start Date|
|v_input_11|true|Start Month|
|v_input_12|2020|Start Year|
|v_input_13|31|End Date|
|v_input_14|12|End Month|
|v_input_15|2021|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-08 00:00:00
end: 2023-12-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4

strategy("HYE Mean Reversion SMA [Strategy]", overlay = true )
  
//Strategy inputs
source = input(title = "Source", defval = close)
tradeDirection = input(title="Trade Direction", type=input.string,
     options=["Long Only", "Short Only", "Both"], defval="Long Only") 
smallMAPeriod = input(title = "Small Moving Average", defval = 2)
bigMAPeriod = input(title = "Big Moving Average", defval = 5)
percentBelowToBuy = input(title = "Percent below to buy %", defval = 3)
percentAboveToSell = input(title = "Percent above to sell %", defval = 3)
rsiPeriod = input(title = "Rsi Period", defval = 2)
rsiLevelforBuy = input(title = "Maximum Rsi Level for Buy", defval = 30)
rsiLevelforSell = input(title = "Minimum Rsi Level for Sell", defval = 70)
     
longOK  = (tradeDirection == "Long Only") or (tradeDirection == "Both")
shortOK = (tradeDirection == "Short Only") or (tradeDirection == "Both")

// Make input options that configure backtest date range
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer,
     defval=2020, minval=1800, maxval=2100)

endDate = input(title="End Date", type=input.integer,
     defval=31, minval=1, maxval=31)
endMonth = input(title="End Month", type=input.integer,
     defval=12, minval=1, maxval=12)
endYear = input(title="End Year", type=input.integer,
     defval=2021, minval=1800, maxval=2100)
     
inDateRange = true

//Strategy calculation 
rsiValue = rsi(source, rsiPeriod)
rsiEMA   = ema(rsiValue, 5)
smallMA = sma(source, smallMAPeriod)
bigMA =  sma(source, bigMAPeriod) 
buyMA = ((100 - percentBelowToBuy) / 100) * sma(source, bigMAPeriod)[0]
sellMA = ((100 + percentAboveToSell) / 100) * sma(source, bigMAPeriod)[0]

if(crossunder(smallMA, buyMA) and rsiEMA < rsiLevelforBuy and inDateRange and longOK)
    strategy.entry("BUY", strategy.long) 

if(crossover(smallMA, bigMA) or not inDateRange)
    strategy.close("BUY")

if(crossover(smallMA, sellMA) and rsiEMA > rsiLevelforSell and inDateRange and shortOK)
    strategy.entry("SELL", strategy.short)

if(crossunder(smallMA, bigMA) or not inDateRange)
    strategy.close("SELL")


```

> Detail

https://www.fmz.com/strategy/435520

> Last Modified

2023-12-15 16:51:23
