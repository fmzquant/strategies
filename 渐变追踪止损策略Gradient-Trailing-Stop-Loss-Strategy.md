
> Name

渐变追踪止损策略Gradient-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165e75c820c8188fa56.png)

[trans]

## 概述

渐变追踪止损策略通过动态调整止损线,实现风险控制和止盈截取的有机结合。它使用平均真实波动范围计算止损线,可有效跟踪股价趋势,在保护利润的同时减少不必要的止损。该策略适用于趋势较强的股票,可获得稳定收益。

## 原理

该策略使用计算平均真实波动范围(ATR)作为动态止损的基础。ATR可以有效反映股票的波动性。策略先输入ATR周期参数,典型为10天。然后计算出ATR值。股价上涨时,止损线也会随之上移,是动态追踪的;当股价下跌时,止损线保持不变,可锁定利润。同时,策略允许通过“因子”参数微调止损线与股价的距离。

具体来说,策略计算当前K线的ATR值,然后乘以“因子”参数,得到止损距离。如果股价高于止损价格,则开多仓;如果股价低于止损价格,则开空仓。这样,止损线就会紧貼股价运行,实现止损线的渐变追踪效果。

## 优势

- 动态追踪止损,可根据市场情况调整止损距离,灵活性强
- 采用ATR计算止损距离,可有效跟踪市场波动
- 策略简单易用,容易实现自动化交易
- 可自定义ATR周期和止损距离因子,适应不同交易品种
- 可平衡止损和止盈,降低不必要止损的概率

## 风险

- ATR作为动态止损依据,选择合适的参数很关键
- 止损距离过近可能增加不必要的止损概率
- 止损距离过远则无法及时止损,无法控制风险
- 策略本身无法判断市场趋势,需要人工确认买卖信号
- 需要关注ATR的计算周期是否合理,以及“因子”参数的调整

## 优化

- 可以考虑结合移动均线等指标过滤信号,降低错误交易概率
- 可以通过机器学习方法自动优化ATR周期和止损距离参数
- 可以引入自动止盈策略,结合止损来锁定利润
- 可以考虑与其它指标组合使用,验证买卖信号的可靠性
- 可以尝试改进ATR计算方法或动态调整ATR周期参数
- 可以研究不同的动态追踪止损算法,进一步优化止损效果

## 总结

渐变追踪止损策略通过动态调整止损距离,实现了风险控制与止盈截取的有效平衡。该策略操作简单,可自定义度高,适用于机器人自动交易。当然,合理的参数选择和指标组合仍需人工经验。通过进一步优化,该策略可望获取更加稳定的投资回报。

||



## Overview

The Gradient Trailing Stop Loss strategy dynamically adjusts the stop loss line to balance risk control and profit taking. It uses the Average True Range (ATR) to calculate the stop loss line and effectively tracks price trends, protecting profits while reducing unnecessary stop outs. This strategy works well for stocks with strong trends and can generate steady returns.

## Principles 

The strategy uses the Average True Range (ATR) as the basis for dynamic stop loss. ATR effectively reflects the volatility of a stock. The strategy first takes the ATR period as input, typically 10 days. Then the ATR value is calculated. As the price rises, the stop loss line also moves up to trail the price. When the price drops, the stop loss line remains unchanged to lock in profits. Also, the strategy allows fine tuning the stop loss distance from the price using a "factor" parameter.

Specifically, the strategy calculates the current ATR, then multiplies it by the "factor" to get the stop loss distance. If the price is above the stop loss price, a long position is opened. If the price is below, a short position is opened. Thus, the stop loss line closely follows the price, achieving a gradient trailing effect.

## Advantages

- Dynamic trailing stop loss adjusts stop distance based on market conditions
- ATR calculates stop distance based on market volatility  
- Simple and easy to automate trading
- Customizable ATR period and stop loss factor for different assets
- Balances between stopping loss and profit taking  
- Reduces unnecessary stop outs

## Risks

- Choosing proper ATR parameters is crucial 
- Stop loss too close may increase unnecessary stop outs
- Stop loss too far may fail to control risks
- Strategy itself cannot determine market trends
- Need to evaluate ATR period and factor settings

## Enhancements

- Add filters like moving averages to reduce false signals
- Auto-optimize ATR period and stop loss factor via machine learning
- Incorporate profit taking strategy to lock in profits  
- Combine with other indicators to verify buy/sell signals
- Research better ATR calculation or dynamic ATR period
- Explore other dynamic trailing stop algorithms 
- Further optimize the stop loss effect

## Conclusion

The Gradient Trailing Stop Loss strategy effectively balances risk and profit by dynamically adjusting the stop loss distance. With simple logic and high configurability, it is suitable for algorithmic trading. Proper parameter tuning and indicator combinations still rely on human expertise. Further optimizations can make this strategy even more profitable.
[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|Start Year|
|v_input_2|true|Start Month|
|v_input_3|true|Start Day|
|v_input_4|9999|End Year|
|v_input_5|12|End Month|
|v_input_6|31|End Day|
|v_input_7|10|ATR Length|
|v_input_float_1|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-17 00:00:00
end: 2023-10-24 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend Strategy, by Ho.J.", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=15)

// 백테스팅 시작일과 종료일 입력
startYear = input(2020, title="Start Year")
startMonth = input(1, title="Start Month")
startDay = input(1, title="Start Day")

endYear = input(9999, title="End Year")
endMonth = input(12, title="End Month")
endDay = input(31, title="End Day")

// 백테스팅 시간 범위 확인
backtestingTimeBool = (year >= startYear and month >= startMonth and dayofmonth >= startDay) and (year <= endYear and month <= endMonth and dayofmonth <= endDay)

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[_, direction] = ta.supertrend(factor, atrPeriod)

var bool longCondition = false
var bool shortCondition = false

if backtestingTimeBool
    prevDirection = direction[1]
    if direction < 0
        longCondition := false
        shortCondition := true
    else if direction > 0
        longCondition := true
        shortCondition := false

if longCondition
    strategy.entry("My Long Entry Id", strategy.long)

if shortCondition
    strategy.entry("My Short Entry Id", strategy.short)

plot(strategy.equity, title="equity", color=color.rgb(255, 255, 255), linewidth=2, style=plot.style_area)
```

> Detail

https://www.fmz.com/strategy/430148

> Last Modified

2023-10-25 14:56:28
