
> Name

基于收盘价差异的短线交易策略Closing-Price-Difference-Based-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过分析两天的收盘价差异,判断未来价格运动方向,实现短线交易。策略简单直观,易于实施,适合短线交易者。

## 策略原理

该策略的核心逻辑是比较今天的收盘价和昨天的收盘价。具体来说:

1. 计算今天收盘价和昨天收盘价的差额
2. 如果差额大于设定的阈值,则今天的价格相对昨天上涨,做多;
3. 如果差额小于负的设定阈值,则今天的价格相对昨天下跌,做空;
4. 否则,保持昨日的持仓。

这里的关键是设定合理的阈值。如果阈值设置过大,将错过较小的价格波动;如果阈值过小,将因正常波动而引发过多非理性交易。策略采用可调节的阈值设计,默认值为0.004,步长0.001,可以根据历史数据进行测试,选择合适的阈值。

总的来说,该策略捕捉价格在连续两个交易日之间的变化,通过阈值过滤正常波动,判断未来可能的价格趋势方向,以此进行短线交易。策略思路简单直观,容易理解和实现。

## 策略优势

- 思路简单直观,容易理解和实现
- 无需复杂技术指标,降低经验门槛
- 采用收盘价,可有效过滤白噪音,增加信号稳定性  
- 可调阈值设计,可以优化找到最佳参数
- 适合短线交易,快速捕捉价格变化
- 可在多种市场环境下运行

## 策略风险

- 收盘价存在跳空缺口的概率,可能错过价格变化
- 依赖单一指标,可能漏掉其他重要信息
- 阈值设定不当,将产生过多错误交易信号
- 短线操作频繁,交易成本可能较高  
- 需要密切关注,及时调整参数

要解决这些风险,可以考虑:

1. 结合其他指标,如交易量,增强信号的准确性
2. 加入止损逻辑,控制单次损失
3. 优化参数,提高信号质量
4. 适当延长交易周期,降低操作频率
5. 加大仓位管理,以提高盈利

## 策略优化方向 

该策略可以考虑从以下几个方向进行优化:

1. **多种时间周期回测** - 采用不同的时间周期(日线、4小时、1小时等)回测策略参数,选择最优时间周期和参数。

2. **结合波动率指标** - 加入考虑价格波动率的指标,如ATR,可以更好地建立动态阈值。

3. **加入止损逻辑** - 设定合理的止损点,以控制单次损失。

4. **优化仓位管理** - 优化建仓的仓位大小和加仓规则,在保证止损的同时,提高盈利。

5. **考虑交易成本** - 在回测中加入交易手续费,滑点等交易成本考量,使回测更贴近实盘。

6. **引入机器学习** - 应用机器学习算法提取更多特征,建立更强大的交易信号。

## 总结

本策略基于收盘价差异判断未来价格趋势,采用简单直观的思路设计短线交易策略。策略容易实现,适合短线操作,但可能存在一定亏损风险。通过多种优化手段,可以提高策略稳定性和盈利能力。本策略为基础策略,可为进一步研究提供思路和参考。

||


## Overview

This strategy judges the future price movement by analyzing the difference between closing prices of two consecutive days, aiming to implement short-term trading. The strategy is simple and intuitive, easy to implement, and suitable for short-term traders.

## Strategy Logic

The core logic of this strategy is to compare today's closing price with yesterday's closing price. Specifically:

1. Calculate the difference between today's closing price and yesterday's closing price.  
2. If the difference is greater than the set threshold, then today's price has risen relative to yesterday's, go long.
3. If the difference is less than the negative set threshold, then today's price has fallen relative to yesterday's, go short.  
4. Otherwise, maintain yesterday's position.

The key here is to set a reasonable threshold. If the threshold is too large, it will miss smaller price fluctuations. If the threshold is too small, it will trigger excessive irrational trading due to normal fluctuations. The strategy adopts an adjustable threshold design with a default value of 0.004 and a step of 0.001. Appropriate thresholds can be selected through backtesting based on historical data.

In summary, this strategy captures price changes between two consecutive trading days, judges possible future price trends by filtering out normal fluctuations through thresholds, and thus conducts short-term trading. The strategy idea is simple and intuitive, easy to understand and implement.

## Advantages of the Strategy

- Simple and intuitive idea, easy to understand and implement
- No complex technical indicators, low experience threshold 
- Use closing price, effectively filter out noise, increase signal stability
- Adjustable threshold design allows finding the optimal parameter  
- Suitable for short-term trading, quickly capture price changes
- Can run in various market environments

## Risks of the Strategy

- Probability of price gap in closing price, may miss price changes
- Rely on a single indicator, may miss other important information
- Improper threshold setting will generate excessive false trading signals
- Frequent short-term operations, transaction costs may be higher
- Need close monitoring and timely adjustment of parameters

To address these risks, consider:

1. Combine other indicators, such as trading volume, to enhance signal accuracy
2. Add stop loss logic to control single loss
3. Optimize parameters to improve signal quality
4. Appropriately extend trading cycle to reduce operating frequency 
5. Increase position management to improve profitability

## Optimization Directions

The strategy can be optimized in the following aspects:

1. **Multi-timeframe backtesting** - Use different timeframes (daily, 4-hour, 1-hour, etc.) to backtest parameters and select optimal timeframe and parameters.

2. **Combine volatility indicators** - Add indicators that consider price volatility, such as ATR, to better establish dynamic thresholds.  

3. **Add stop loss logic** - Set reasonable stop loss points to control single loss.

4. **Optimize position management** - Optimize the size of initial positions and add-on rules to increase profitability while ensuring stop loss.

5. **Consider trading costs** - Add trading costs like commissions and slippage in backtesting to be closer to live trading.

6. **Introduce machine learning** - Apply machine learning algorithms to extract more features and build stronger trading signals.

## Conclusion

This strategy judges future price trends based on closing price differences, using a simple and intuitive approach to design short-term trading strategies. The strategy is easy to implement and suitable for short-term operations, but may have some loss risks. Various optimization methods can improve the stability and profitability of the strategy. As a basic strategy, it can provide ideas and references for further research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.004|Price Difference Threshold repainting results|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Daily Close Comparison Strategy (by ChartArt) repainting results", shorttitle="CA_-_Daily_Close_Strat", overlay=false)

// ChartArt's Daily Close Comparison Strategy
//
// Version 1.0
// Idea by ChartArt on February 28, 2016.
//
// This strategy is equal to the very
// popular "ANN Strategy" coded by sirolf2009,
// but without the Artificial Neural Network (ANN).
//
// Main difference besides stripping out the ANN
// is that I use close prices instead of OHLC4 prices.
// And the default threshold is set to 0 instead of 0.0014
// with a step of 0.001 instead of 0.0001.
//
// This strategy goes long if the close of the current day
// is larger than the close price of the last day.
// If the inverse logic is true, the strategy
// goes short (last close larger current close).
//
// This simple strategy does not have any
// stop loss or take profit money management logic.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/
// 
//  __             __  ___       __  ___ 
// /  ` |__|  /\  |__)  |   /\  |__)  |  
// \__, |  | /~~\ |  \  |  /~~\ |  \  |  
// 
// 

threshold = input(title="Price Difference Threshold repainting results", type=float, defval=0.004, step=0.001)

getDiff() =>
    yesterday=security(syminfo.tickerid, 'D', close[1])
    today=security(syminfo.tickerid, 'D', close)
    delta=today-yesterday
    percentage=delta/yesterday
    
closeDiff = getDiff()
 
buying = closeDiff > threshold ? true : closeDiff < -threshold ? false : buying[1]

hline(0, title="zero line")

bgcolor(buying ? green : red, transp=25)
plot(closeDiff, color=silver, style=area, transp=75)
plot(closeDiff, color=aqua, title="prediction")

longCondition = buying
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = buying != true
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/428082

> Last Modified

2023-09-28 15:08:39
