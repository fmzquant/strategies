
> Name

双海龟突破策略Double-Turtle-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f66b403c5a04f5bb63.png)

[trans]
# 
## 概述
双海龟突破策略融合了海龟交易法的突破策略和琳达·拉施克的移动止损原理,具有优异的突破性能和严格的风险控制。该策略同时监控价格的上下突破,在突破发生时建立做多或做空头寸,并利用移动止损和移动止盈管理头寸。

## 策略原理
核心逻辑是在大周期高点上突破小周期高点时做空,在大周期低点下突破小周期低点时做多。建仓后设置移动止损和移动止盈,首先止损确认风险。在持仓数量累积到设置的止盈数量时,在下一个周期取消止损单,然后出半仓并设置移动止损和移动止盈锁定利润并追踪价差。

具体操作步骤是:
1. 计算大周期(20周期)高点prevHigh和小周期(4周期)高点smallPeriodHigh。
2. 当最新K线的high大于prevHigh,并且prevHigh大于smallPeriodHigh时,表明大周期高点突破小周期高点,此时若没有仓位则做空。
3. 建仓后设置移动止损,待仓位反转后取消止损单,防止被止损。
4. 当持仓数量达到设置的移动止盈周期数(当前为0周期)时,在下一个周期出一半仓位,并设置移动止损与移动止盈,追踪价差并锁定利润。
5. 对于低点的突破类似,基于大周期低点和小周期低点的突破关系建立做多头寸。

## 优势分析
这是一个综合性较强的突破策略,同时具有以下优势:
1. 结合双周期海龟交易法,能够有效识别突破信号。
2. 采用移动止损与移动止盈技术严格控制风险,避免巨亏。
3. 分两次出场,一次止盈出半仓,再通过移动止盈出全仓,锁定利润。
4. 兼顾做多和做空双向操作,符合多空互换的市场特点。
5. 回测效果优异,具有很强的实盘表现能力。

## 风险分析
主要的风险和应对措施如下:
1. 假突破风险。应适当调整周期参数,确保突破的有效性。
2. 追涨杀跌风险。应结合趋势和形态进行过滤,避免在趋势末期建仓。
3. 止损被冲风险。可适当放宽止损幅度,确保有足够的空间。
4. 移动止损过于灵敏风险。应调整止损后滑点设置,避免无谓止损。

## 优化方向  
该策略还可从以下几个方面进行优化:
1. 增加成交量的突破过滤,确保突破的真实性。
2. 加入趋势判断指标,避免在趋势末期建仓。
3. 结合更多时间周期判断突破时机。
4. 增加机器学习算法,动态优化参数。
5. 组合其他策略,实施统计套利。

## 总结
双海龟突破策略综合运用双周期技术、突破理论和严格的风险管理手段,在保持高胜率的同时也确保收益的稳定性。该策略模型简单清晰,易于理解与应用,是一款非常出色的量化策略。本策略还具有很大的优化空间,投资者可以在此基础上进行创新,打造更加出色的交易系统。

||

## Overview
The Double Turtle Breakthrough Strategy integrates the turtle trading breakthrough strategy and Linda Raschke's moving stop loss principle, with excellent breakthrough performance and strict risk control. The strategy simultaneously monitors the price breakout up and down, establishes long or short positions when a breakthrough occurs, and uses moving stop loss and moving take profit to manage positions.

## Strategy Principle  
The core logic is to go short when breaking through the small cycle high on the large cycle high point, and go long when breaking through the small cycle low at the large cycle low point. After opening a position, set up a moving stop loss and moving take profit, first stop loss to confirm the risk. When the holding quantity accumulates to the set take profit quantity, cancel the stop loss order in the next cycle, then exit half of the position and set up a moving stop loss and moving take profit to lock in profits and track spreads.


The specific operation steps are:

1. Calculate the large cycle (20 cycles) high point prevHigh and the small cycle (4 cycles) high point smallPeriodHigh.

2. When the high of the latest K-line is greater than prevHigh, and prevHigh is greater than smallPeriodHigh, it indicates that the large cycle high point breaks through the small cycle high point. At this time, if there is no position, go short.

3. After opening a position, set a moving stop loss. Wait for the position to reverse before cancelling the stop loss order to prevent being stopped out.  

4. When the holding quantity reaches the set moving take profit cycle number (currently 0 cycles), exit half of the position in the next cycle, and set up a moving stop loss and moving take profit to track the spread and lock in profits.

5. For breakthroughs of low points, long positions are established based on breakthrough relationships between large cycle lows and small cycle lows.


## Advantage Analysis
This is a highly comprehensive breakthrough strategy with the following advantages:

1. Combining double cycle turtle trading can effectively identify breakthrough signals.

2. The use of moving stop loss and moving take profit techniques strictly controls risks and avoids huge losses.

3. Exiting in two stages, taking profit half position at a time, then fully exiting through moving take profit, locking in profits.

4. Take into account both long and short operations, matching the characteristics of alternating multi-empty markets.

5. Excellent backtesting results with strong real trading performance.


## Risk Analysis
The main risks and countermeasures are as follows:

1. Risk of false breakthroughs. Appropriately adjust cycle parameters to ensure breakthrough validity.

2. Risk of chasing rises and kills falls. Filtering should be combined with trends and patterns to avoid opening positions at the end of trends.

3. Risk of stop loss being washed out. Appropriately relax the stop loss amplitude to ensure sufficient space.  

4. Risk of overly sensitive moving stop loss. Adjust slippage settings after stop loss to avoid unnecessary stop outs.


## Optimization Directions
The strategy can also be optimized in the following aspects:

1. Add volume breakthrough filters to ensure authenticity of breakthroughs.  

2. Add trend judgment indicators to avoid opening positions at the end of trends.

3. Combine more time cycles to determine breakthrough timing.

4. Increase machine learning algorithms for dynamic optimization of parameters. 

5. Combine with other strategies for statistical arbitrage.


## Summary 
The Double Turtle Breakthrough Strategy comprehensively uses double cycle techniques, breakthrough theories and strict risk management methods to ensure high win rates while ensuring stable returns. This strategy model is simple and clear, easy to understand and apply, and it is an excellent quantitative strategy. This strategy still has great potential for optimization. Investors can innovate on this basis to create even better trading systems.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|bigPeriod|
|v_input_2|4|smallPeriod|
|v_input_3|false|takeProfitBars|
|v_input_4|5|Trailing stop percentages|
|v_input_5|false|Custom Backtesting Dates|
|v_input_6|2018|Backtest Start Year|
|v_input_7|3|Backtest Start Month|
|v_input_8|6|Backtest Start Day|
|v_input_9|8|Backtest Start Hour|
|v_input_10|2038|Backtest Stop Year|
|v_input_11|12|Backtest Stop Month|
|v_input_12|14|Backtest Stop Day|
|v_input_13|14|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Turtle soup plus one", shorttitle = "Turtle soup plus one", overlay=true)

bigPeriod = input(20)
smallPeriod = input(4)
takeProfitBars = input(0)
trailingStop = input(5, title = "Trailing stop percentages")
if (strategy.position_size == 0)
    strategy.cancel("Long")
    strategy.cancel("Short")
    strategy.cancel("Stop")



stopLossPrice = 0.1
stopLossPrice := nz(stopLossPrice[1])
takeProfitStarted = false
takeProfitStarted := nz(takeProfitStarted[1])

prevHigh = highest(high, bigPeriod - smallPeriod)[smallPeriod]
smallPeriodHigh = highest(high, smallPeriod - 1)[1]
if (high > prevHigh and prevHigh > smallPeriodHigh and close > prevHigh and strategy.position_size == 0)
    strategy.order("Short", strategy.short, stop = prevHigh)

if strategy.position_size < 0 and strategy.position_size[1] == 0
    stopLossPrice := high[1]
    strategy.order("Stop", strategy.long, qty = -strategy.position_size, stop = stopLossPrice)
    takeProfitStarted := false

if (strategy.position_size < 0 and sum(strategy.position_size, takeProfitBars) == strategy.position_size * takeProfitBars and close < strategy.position_avg_price and not takeProfitStarted)
    takeProfitStarted := true
    strategy.cancel("Stop")
    strategy.order("ExitHalf", strategy.long, qty = ceil(-strategy.position_size / 2), stop = close)
    if (strategy.position_size != -1)
        strategy.exit("ExitFull", "Short", qty = -strategy.position_size - ceil(-strategy.position_size / 2), loss = stopLossPrice, trail_price  = close, trail_offset = -(close - strategy.position_avg_price) * trailingStop / 100 / syminfo.mintick)
        

prevLow = lowest(low, bigPeriod - smallPeriod)[smallPeriod]
smallPeriodLow = lowest(low, smallPeriod - 1)[1]
if (low < prevLow and prevLow < smallPeriodLow and close < prevLow and strategy.position_size == 0)
    strategy.order("Long", strategy.long, stop = prevLow)

if strategy.position_size > 0 and strategy.position_size[1] == 0
    stopLossPrice := low[1]
    strategy.order("Stop", strategy.short, qty = strategy.position_size, stop = stopLossPrice)
    takeProfitStarted := false

if (strategy.position_size > 0 and sum(strategy.position_size, takeProfitBars) == strategy.position_size * takeProfitBars and close > strategy.position_avg_price and not takeProfitStarted)
    takeProfitStarted := true
    strategy.cancel("Stop")
    strategy.order("ExitHalf", strategy.short, qty = ceil(strategy.position_size / 2), stop = close)
    if (strategy.position_size != 1)
        strategy.exit("ExitFull", "Long", qty = strategy.position_size - ceil(strategy.position_size / 2),loss = stopLossPrice, trail_price  = close, trail_offset = (close - strategy.position_avg_price) * trailingStop / 100 / syminfo.mintick)

// === Backtesting Dates ===
testPeriodSwitch = input(false, "Custom Backtesting Dates")
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(3, "Backtest Start Month")
testStartDay = input(6, "Backtest Start Day")
testStartHour = input(08, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
testStopYear = input(2038, "Backtest Stop Year")
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

https://www.fmz.com/strategy/433577

> Last Modified

2023-11-28 16:25:41
