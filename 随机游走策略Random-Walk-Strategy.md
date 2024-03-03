
> Name

随机游走策略Random-Walk-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

随机游走策略是一种基于随机数生成的自动交易策略。该策略使用线性同余生成器根据设置的种子随机生成数字,数字大于阈值时做多,小于阈值时做空,实现随机进入做多做空仓位。

## 策略原理

该策略主要通过以下几个部分实现随机交易:

1. 设置随机数生成的参数a、c和模数m,以及初始种子seed。

2. 定义随机数生成函数GetRandom,采用线性同余算法生成0-m之间的随机数。

3. 在每根K线时,如果当前无仓位,则比较生成的随机数大小,大于m/2时做多,否则做空。

4. 设置止损止盈条件,以百分比形式设置止损和止盈幅度。

5. 通过时间段设置回测周期。

通过上述步骤,该策略实现了完全随机的做多做空操作。当随机数大于m/2时开多单,否则开空单,然后设置止损止盈退出仓位。回测周期可自定义设置。

## 优势分析

- 策略逻辑简单清晰,容易理解实现。

- 随机交易可有效避免人为情绪影响,减少主观误操作。

- 可自定义随机数生成算法参数,调整随机性。

- 可灵活设置止损止盈条件,控制单笔损益。

- 支持回测参数优化,方便测试不同参数对总体收益的影响。

## 风险分析

- 随机交易可能长期无明确走势,收益存在不确定性。

- 无法据市场状况调整仓位,可能错过趋势机会。

- 单笔收益有限,回撤风险较大。

- 需要合理设置止损止盈比例,避免过大损失。

- 随机性可能导致频繁开平仓,增加交易费用。

- 需要充分回测验证参数设置合理性,不能盲目使用。

可通过加入趋势判断等功能,减少随机开仓次数,优化止损机制,严格控制单笔损益来降低风险。

## 优化方向

- 增加趋势判断,避免逆势开仓。

- 加入仓位管理,根据资金变化调整仓位大小。

- 优化随机数生成算法,提高随机性。

- 动态调整止损止盈幅度。

- 加入开仓频率限制。

- 多参数组合回测寻找最优参数。

## 总结

随机游走策略通过随机数控制做多做空实现机械交易。该策略随机性强,不受个人情绪影响,回避主观误操作的风险。但随机开仓也可能错过趋势机会,单笔收益有限,需优化风险控制机制。整体来说,该策略适合用来验证交易理念,了解参数设置对收益的影响,但实际应用需谨慎评估。

||


## Overview

The random walk strategy is an automated trading strategy based on random number generation. It uses a linear congruential generator to randomly generate numbers based on a set seed. When the number is greater than a threshold it goes long, when less it goes short, implementing random entry long/short.

## Strategy Logic

The main parts implementing the random trading are:

1. Set the parameters a, c and modulus m for random number generation, as well as the initial seed. 

2. Define the random number generation function GetRandom using the linear congruential algorithm to generate random numbers between 0-m.

3. On each candlestick, if there is no position, compare the generated random number size, go long when greater than m/2, otherwise go short.

4. Set stop loss and take profit conditions in percentage.

5. Set backtest period by timeframe.

Through the above steps, the strategy realizes fully random long/short operations. When random number is greater than m/2 it opens long position, otherwise it opens short, then sets stop loss and take profit to exit positions. The backtest period is customizable.

## Advantage Analysis

- Simple and clear strategy logic, easy to understand and implement.

- Random trading effectively avoids emotional impacts and reduces subjective misoperations.

- Customizable random number generation parameters to adjust randomness.

- Flexible stop loss and take profit settings to control single profit/loss.

- Supports parameters optimization through backtesting different parameters' impact on total profit.

## Risk Analysis

- Random trading may result in undefined long term trend and uncertain profitability.

- Unable to adjust positions based on market conditions, could miss trend opportunities.

- Limited single profit, high drawdown risk.

- Needs reasonable stop loss/take profit ratio to avoid significant losses.

- Frequent open/close positions due to randomness increases trading costs.

- Sufficient backtesting required to verify reasonable parameter settings, do not blindly use.

Risks could be reduced by adding trend judgment, optimizing stop loss mechanism, strictly controlling single profit/loss etc.

## Improvement Directions

- Add trend judgment to avoid trading against trend.

- Add position sizing based on capital change.

- Optimize random number generation algorithm for better randomness.

- Dynamic stop loss/take profit percentage.

- Limit order frequency. 

- Multi-parameter backtest optimization.

## Summary

The random walk strategy realizes mechanical trading through random number controlled long/short. It has strong randomness and avoids emotional impacts and subjective misoperations. But random entries may also miss trend opportunities, limited single profit, needs optimized risk control mechanisms. Overall the strategy is suitable for verifying trading ideas, evaluating parameter impacts, but careful evaluation is needed for practical use.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|seed|
|v_input_2|30|Stop loss percentage(0.1%)|
|v_input_3|30|Take profit percentage(0.1%)|
|v_input_4|false|Custom Backtesting Dates|
|v_input_5|2018|Backtest Start Year|
|v_input_6|3|Backtest Start Month|
|v_input_7|6|Backtest Start Day|
|v_input_8|8|Backtest Start Hour|
|v_input_9|2018|Backtest Stop Year|
|v_input_10|12|Backtest Stop Month|
|v_input_11|14|Backtest Stop Day|
|v_input_12|14|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-02 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//@author=Tr0sT
strategy(title = "Random strategy", shorttitle = "Random", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

a = 16
c = 10
m = 1000
GetRandom(prev) =>
    GetRandom = (a * prev + c) % m

seed = input(200, minval = 2, maxval = m)
stopLoss = input(30, title = "Stop loss percentage(0.1%)")
takeProfit = input(30, title = "Take profit percentage(0.1%)")


curRandom = na
curRandom := nz(curRandom[1]) == 0 ? seed : GetRandom(curRandom[1])
if (strategy.position_size == 0)
    if (curRandom >= m / 2)
        strategy.entry("Enter", strategy.long)
    else
        strategy.entry("Enter", strategy.short)
        
    strategy.exit("Exit", "Enter", loss = close * stopLoss / 1000 / syminfo.mintick, profit = close * takeProfit / 1000 / syminfo.mintick)            

// === Backtesting Dates ===
testPeriodSwitch = input(false, "Custom Backtesting Dates")
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(3, "Backtest Start Month")
testStartDay = input(6, "Backtest Start Day")
testStartHour = input(08, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(14, "Backtest Stop Day")
testStopHour = input(14, "Backtest Stop Hour")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,testStopHour,0)
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
isPeriod = testPeriodSwitch == true ? testPeriod() : true
// === /END
if not isPeriod
    strategy.cancel_all()
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/428805

> Last Modified

2023-10-09 16:10:24
