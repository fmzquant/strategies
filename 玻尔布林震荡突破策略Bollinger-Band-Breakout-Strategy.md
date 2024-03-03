
> Name

玻尔布林震荡突破策略Bollinger-Band-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/184e2fd7d9c4d59997a.png)
[trans]


## 概述

本策略运用玻尔布林带指标判断行情趋势,结合带宽信号寻找交易机会,旨在持续稳定增长投资组合。根据去年数据回测,该策略盈利率达78.95%,最大回撤仅-4.02%。这是我的一系列自动化策略之一,可助力投资组合稳步增长。

欢迎调整参数进行回测,也欢迎提供宝贵意见。如果满意当前结果,可将其转为学习并添加警报,实现策略自动化。这需要编码里增加警报机制。如果您对此感兴趣,我可以基于该策略创建相关学习。

## 策略原理

该策略使用玻尔布林带和带宽判断入场和出场时机。

玻尔布林带包括上线、中线和下线。中线是n日简单移动平均线,参数n默认为16。上限是中线+ k *标准偏差,下限是中线- k *标准偏差,参数k默认为3。当价格接近上限时,代表股价过高或超买。当价格接近下限时,代表股价过低或超卖。

带宽指标显示价格相对中线的波动情况。它由(上线-下线)/中线*1000计算得出。当带宽低于20时,代表行情平静或盘整;当带宽超过50时,代表波动加大。 

该策略在带宽处于20-50之间时,寻找突破下限的机会做多。做多后,止盈线设置为开仓价格的108%,或在突破上限时止损出场。

## 优势分析

该策略具有以下优势:

1. 使用玻尔布林带判断行情趋势方向,可减少假突破带来的风险

2. 带宽信号可准确定位震荡行情,避免大幅波动带来的亏损

3. 回测数据显示,在一年时间里可获得近80%的盈利率,风险收益比极高

4. 最大回撤不到5%,可有效控制风险,保持组合稳定增长

5. 策略逻辑清晰简单,容易理解实现,可广泛应用于各类数字资产

## 风险分析

该策略也存在以下风险:

1. 玻尔布林带参数设置不当,可能错过较好交易机会

2. 市场持续疯牛或熊市时,交易频率可能过低,盈利能力受限

3. 回测数据不足,实际应用中可能无法复制回测指标

4. 极端市场条件下,止损点可能被突破,造成较大亏损

5. 交易费用过高也会减少实际盈利

对应解决方法:

1. 优化参数,针对不同市场调整布林带周期等

2. 额外引入其他指标判断趋势,应对异常行情

3. 收集充分数据进行多种市场回测,验证策略稳定性

4. 适当调整止损点,防止极端行情巨亏

5. 选择手续费低廉的交易平台,减少交易费用

## 优化方向

该策略可从以下方面进行优化:

1. 增加量价确认,避免假突破 Bring in volume confirmation to avoid false breakouts

2. 结合趋势指标,识别趋势方向 Combine with trend indicators to identify trend direction

3. 使用机器学习调整参数,自动适应市场 Use machine learning to tune parameters and auto-adapt to market

4. 增加相关性过滤,避免非相关资产交易 Add correlation filter to avoid trading uncorrelated assets 

5. 优化止盈止损策略,在拉升阶段获得更多利润 Optimize take profit/stop loss for more gains during uptrends

6. 引入更多条件过滤交易信号,提高成功率 Introduce more condition filters to increase win rate

7. 测试多时间周期组合,利用多周期获利 Test multi-timeframe combinations to profit from multiple cycles

8. 构建指数化组合,扩大投资范围 Build indexed portfolio to expand exposure

9. 利用机器学习自动生成并验证新策略 Use machine learning to auto generate & validate new strategies

## 总结

该玻尔布林震荡突破策略总体回测效果良好,可在震荡行情中获得较稳定收益。策略核心思路简单清晰,容易掌握运用。但参数优化、风险控制和组合管理还需进一步提升,才能在复杂多变的市场中稳定盈利。此策略为基础型趋势跟随策略,可在其基础上引入更多技术指标和风控机制进行优化,也可与机器学习相结合实现自动化管理。整体而言,该策略为初学者打开了量化交易之门,也为专业人士提供了策略优化的可能性。

|| 


## Overview

This strategy uses Bollinger Bands to gauge market trend and combines bandwidth signal to identify trading opportunities, aiming for steady growth of the investment portfolio. Backtested with previous year's data, it achieved 78.95% profitability with maximum drawdown of only -4.02%. This is one of my series of automated strategies that helps grow my portfolio steadily.

Feel free to tweak parameters and backtest this strategy. Any comments or ideas are appreciated. 

If you are happy with the existing results and would like to automate this strategy, which can be done via alerts, you need to convert it to a study and add alerts in the code. Let me know if you are interested in that and I can create a study based on this strategy.

## Strategy Logic

This strategy uses Bollinger Bands and bandwidth to determine entries and exits.

Bollinger Bands include upper band, middle band and lower band. The middle band is a n-period simple moving average, default n = 16. The upper band is middle band + k * standard deviation, lower band is middle band - k * standard deviation, default k = 3. When price approaches upper band, it indicates overvaluation or overbought. When price approaches lower band, it indicates undervaluation or oversold.

Bandwidth indicator shows the volatility of price relative to the middle band. It is calculated by (upper band - lower band)/middle band * 1000. When bandwidth is below 20, it indicates low volatility or consolidation. When bandwidth exceeds 50, it represents increased volatility.

This strategy looks for long opportunities when bandwidth is between 20-50 and price breaks below lower band. After going long, take profit is set at 108% of entry price, or a stop loss exit when price breaks above upper band.

## Advantage Analysis

The advantages of this strategy include:

1. Bollinger Bands gauge trend direction, reducing risks from false breakouts

2. Bandwidth signal accurately locates range-bound action, avoiding large losses from big swings

3. Backtest shows nearly 80% profitability over 1 year, extremely high risk-reward ratio

4. Maximum drawdown under 5%, effectively controls risk and maintains steady portfolio growth

5. Simple and clear logic, easy to understand and implement, widely applicable to various assets

## Risk Analysis

The risks of this strategy include:

1. Poor Bollinger parameter settings may miss good trading opportunities 

2. Low trading frequency during persistent bull or bear markets, profitability constrained

3. Insufficient backtest data, actual performance may differ from backtest

4. Stop loss may be taken out during extreme moves, leading to large losses

5. High transaction costs also reduce actual profits

Solutions:

1. Optimize parameters and adjust Bollinger period based on market

2. Introduce additional indicators to handle abnormal market conditions

3. Gather sufficient data and backtest across various markets to verify stability

4. Adjust stop loss appropriately to prevent large losses from extreme moves

5. Select trading platforms with low commissions to reduce transaction costs

## Optimization Directions

This strategy can be improved in the following aspects:

1. Add volume confirmation to avoid false breakouts

2. Combine with trend indicators to identify trend direction  

3. Use machine learning to auto tune parameters and adapt to market

4. Add correlation filter to avoid trading uncorrelated assets

5. Optimize take profit/stop loss for more gains during uptrends

6. Introduce more condition filters to increase win rate

7. Test multi-timeframe combinations to profit from multiple cycles  

8. Build indexed portfolio to expand exposure

9. Use machine learning to auto generate & validate new strategies

## Conclusion

Overall this Bollinger Band breakout strategy backtested well and can produce steady returns in range-bound markets. The core logic is simple and clear, easy to grasp and apply. But further improvements in parameter optimization, risk control and portfolio management are needed for stable profits in complex markets. This is a basic trend-following strategy, and can be enhanced by introducing more technical indicators and risk management mechanisms, or combined with machine learning for automation. In summary, this strategy opens the door to algorithmic trading for beginners, and also provides possibilities for experienced traders to optimize strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|16|length|
|v_input_2|3|mult|
|v_input_3|50|BBW Upper Threshold|
|v_input_4|20|BBW Lower Threshold|
|v_input_5|2019|Backtest Start Year|
|v_input_6|true|Backtest Start Month|
|v_input_7|true|Backtest Start Day|
|v_input_8|2020|Backtest Stop Year|
|v_input_9|12|Backtest Stop Month|
|v_input_10|31|Backtest Stop Day|
|v_input_11|8|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-30 00:00:00
end: 2023-11-06 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Bollinger Bands BAT/USDT 30min", overlay=true )

/// Indicators
///Bollinger Bands
source = close
length = input(16, minval=1)
mult = input(3, step=0.1, minval=0.001, maxval=50)
basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

plot(basis, color=color.red)
p1 = plot(upper, color=color.blue)
p2 = plot(lower, color=color.blue)
fill(p1, p2)

//Bollinger bands width
bbw = (upper-lower)/basis*1000
//plot(bbw, color=color.blue)

upper_bbw_input = input(title="BBW Upper Threshold", step=1, minval=0, defval=50)
lower_bbw_input = input(title="BBW Lower Threshold", step=1, minval=0, defval=20)


// Backtesting Period
testStartYear = input(2019, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2020, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

// Take Profit
tp_inp = input(8, title='Take Profit %', step=0.1)/100
take_level = strategy.position_avg_price * (1 + tp_inp)

//Entry Strategy
entry_long = crossover(source, lower) and (bbw < upper_bbw_input) and (bbw > lower_bbw_input)
exit_long = cross(high,upper) or close < lower

if testPeriod()

    strategy.entry(id="LongBB", long=true, comment="LongBB", when=entry_long)
    strategy.exit("Take Profit Long","LongBB",limit=take_level)
    strategy.close(id="LongBB", when=exit_long )


```

> Detail

https://www.fmz.com/strategy/431394

> Last Modified

2023-11-07 15:08:36
