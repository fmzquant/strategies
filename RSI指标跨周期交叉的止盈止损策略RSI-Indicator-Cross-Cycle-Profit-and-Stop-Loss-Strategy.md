
> Name

RSI指标跨周期交叉的止盈止损策略RSI-Indicator-Cross-Cycle-Profit-and-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1684ed6cea6bb3d35f2.png)
[trans]

## 概述

该策略运用RSI指标实现跨周期交叉判断买入时机,并采用ATR止盈止损机制,属于趋势跟踪策略的一种。通过不同周期RSI指标交叉确定市场趋势转折点,结合收盘价判断过滤做多做空时机。止盈止损机制有效控制风险,锁定盈利。

## 策略原理  

该策略首先运用SMA平滑技术计算26周期的指数移动平均线,作为多头市场判断的基准线。然后计算RSI指标的4周期值,当其向下穿过30这个超卖区,认为行情可能反转上涨。此时再判断shortdays参数的新高能否突破longdays参数的最近一段新高,表示短期趋势走强。如果上述条件同时满足,即发出做多信号。  

入场后,以ATR指标的倍数作为止盈幅度,以收盘价高点的一定比例止损。

## 策略优势

该策略具有以下优势:

1. 使用RSI指标判断反转点,具有较好的时机抓取能力。

2. 应用新高新低机制,避免错误信号。  

3. 利用ATR止盈止损,自动追踪最优退出点。

4. 参数设置灵活,可调整至最优水平。

5. 策略思路清晰易懂,具有较强的稳定性。

## 策略风险

该策略也存在以下风险:  

1. RSI指标可能发出错误信号,导致入场时机不当。可以适当调整RSI参数,或增加其他指标过滤。

2. ATR止盈幅度可能设置过大或过小,无法锁定最大利润。可以测试更优参数组合。  

3. 止损点过于接近,可能被突破止损。可以适当放宽止损距离。

4. 回测数据不足,可能高估了策略收益率。应增加回测周期和市场环境测试。

## 策略优化

该策略可以从以下方面进行优化:

1. 测试优化RSI参数和止盈止损倍数,找到最佳参数组合。

2. 增加其他指标判断,提高策略准确率。如MACD,KD等。

3. 优化止损机制,根据ATR波动范围进行动态调整。

4. 测试在不同交易品种的表现效果。选择流动性好、波动率高的品种。

5. 比较不同止损类型的绩效。如比例止损、移动止损等。

## 总结  

本策略整体运作清晰流畅,指标选择和参数设置合理,具有较强的实用性。通过参数优化和机制改进仍有进一步提升空间。总体来说,该策略具有较高的稳定盈利能力。值得实盘调试和投入使用。

||

## Overview

This strategy uses the RSI indicator to determine the entry timing through cross-cycle judgments and adopts the ATR profit and stop mechanism for trend tracking strategies. It determines the turning point of the market trend through the cross of the RSI indicator of different cycles and combines the closing price to filter the timing of long and short positions. The profit and stop mechanism effectively controls risks and locks in profits.

## Strategy Principle

The strategy first uses the SMA smoothing technology to calculate the 26-week moving average as the benchmark for judging the bull market. Then calculate the 4-week RSI indicator value, when it crosses below 30 in the oversold area, it is considered that the market may rebound. At this time, judge whether the new high of the shortdays parameter can break through the recent new high of the longdays parameter, indicating that the short-term trend is strengthening. If the above conditions are met at the same time, a long signal is issued.

After entering the market, use the ATR indicator multiples as the profit range, and stop loss at a certain percentage of the closing price high point.

## Advantages of the Strategy

The strategy has the following advantages:

1. Use the RSI indicator to determine reversal points with good timing ability.

2. Apply the new highs and lows mechanism to avoid false signals.  

3. Use ATR to profit and stop loss to automatically track the optimal exit point.

4. Flexible parameter settings can be adjusted to optimal levels.

5. The strategy idea is clear and easy to understand, with strong stability.

## Risks of the Strategy

The strategy also has the following risks:

1. The RSI indicator may issue a wrong signal, resulting in improper timing. RSI parameters can be adjusted accordingly, or other indicators can be added for filtering.

2. The ATR profit range may be set too large or too small to lock in maximum profit. Better parameter combinations can be tested. 

3. The stop loss point is too close and may be broken stop loss. Appropriately relax the stop loss distance.

4. Insufficient backtest data may overestimate the strategy's rate of return. The backtest period and market environment test should be increased.

## Strategy Optimization  

The strategy can be optimized in the following aspects:

1. Test and optimize RSI parameters and profit and loss multiples to find the best parameter combination.

2. Increase other indicators to improve strategy accuracy. Such as MACD, KD, etc.

3. Optimize the stop loss mechanism and adjust dynamically according to the ATR fluctuation range.  

4. Test the performance effect on different trading varieties. Choose varieties with good liquidity and high volatility.

5. Compare the performance of different types of stop losses. Such as proportional stop loss, moving stop loss, etc.   

## Summary   

The overall operation of this strategy is clear and smooth, the indicator selection and parameter settings are reasonable, and it has strong practicality. There is still room for further improvement through parameter optimization and mechanism improvement. Overall, the strategy has a relatively high ability to earn stable profits. It is worth debugging in real transactions and putting into use.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|long week|
|v_input_2|21|short days high period|
|v_input_3|50|long days high period|
|v_input_4|4|rsi period|
|v_input_5|30|rsi thresh|
|v_input_6|3|profit target|
|v_input_7|2|stop target|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-05 00:00:00
end: 2024-01-18 05:20:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//A translation from info found at http://backtestwizard.com/swing-trading-system-for-stocks/
strategy("Swing Trading System RSI", overlay=true)
source = close[1]

longperiod = input(26,"long week",minval=2,maxval=500,step=1)
s = request.security(syminfo.tickerid, "W", sma(close[1], longperiod)) // 1 Day
plot(s)

shortdays = input(21,"short days high period",minval=2,maxval=500,step=1)
longdays = input(50,"long days high period",minval=2,maxval=500,step=1)
rsiperiod = input(4,"rsi period",minval=2,maxval=500,step=1)
rsithresh = input(30,"rsi thresh",minval=2,maxval=500,step=1)

highcheck = highest(source,shortdays) == highest(source,longdays)
rsicheck = crossunder(rsi(source,rsiperiod),rsithresh)

longCondition = (highcheck) and (rsicheck) and source > s
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

profittarget = input(3,"profit target",minval=2,maxval=500,step=1)
stoploss = input(2,"stop target",minval=2,maxval=500,step=1)

exitCondition1 = source > strategy.position_avg_price + (atr(50) * profittarget)
exitCondition2 = source <  strategy.position_avg_price - (atr(50) * stoploss)

if (exitCondition1)
    strategy.close_all()
if (exitCondition2)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/441157

> Last Modified

2024-02-06 11:43:11
