
> Name

ATR-Dynamic-Trailing-Stop-Trend-Following-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8777b94db5631ca2646.png)
![IMG](https://www.fmz.com/upload/asset/2d8aecd0ae154c5f0252b.png)




[trans]
#### 概述
该策略是一个基于ATR(平均真实波幅)动态追踪止损的趋势跟踪系统。它结合了EMA均线作为趋势过滤器,并通过调整灵敏度参数和ATR周期来控制信号的生成。系统不仅支持做多,还支持做空交易,并具有完善的获利管理机制。

#### 策略原理
1. 使用ATR指标计算价格波动幅度,并根据设定的灵敏度系数(Key Value)确定追踪止损距离
2. 通过EMA均线判断市场趋势方向,只在价格位于均线之上开多单,位于均线之下开空单
3. 当价格突破追踪止损线且符合趋势方向时,触发交易信号
4. 系统采用分段获利方式管理持仓:
   - 获利20%-50%时,将止损提升至成本价保本
   - 获利50%-80%时,部分获利了结并收紧止损位
   - 获利80%-100%时,进一步收紧止损位保护利润
   - 获利超过100%时,全部平仓获利

#### 策略优势
1. 动态追踪止损可以有效跟踪趋势,在保护利润的同时不会过早离场
2. EMA趋势过滤有效降低了假突破带来的风险
3. 分段获利机制既保证了收益兑现,又给予趋势充分发展空间
4. 支持做多做空双向交易,可以充分把握市场机会
5. 参数可调节性强,适应不同市场环境

#### 策略风险
1. 在震荡市场中可能频繁交易导致损失
2. 趋势反转初期可能产生较大回撤
3. 参数设置不当可能影响策略表现
风险控制建议:
- 建议在明显趋势市场使用
- 谨慎选择参数,可通过回测优化
- 设置最大回撤限制
- 考虑增加市场环境过滤条件

#### 策略优化方向
1. 增加市场环境识别机制,在不同市场条件下使用不同参数
2. 引入成交量等辅助指标增强信号可靠性
3. 优化获利管理机制,根据波动率动态调整获利目标
4. 增加时间过滤,避免在不利时段交易
5. 考虑加入波动率过滤,在过度波动时降低交易频率

#### 总结
这是一个结构完整、逻辑清晰的趋势跟踪系统。通过ATR动态跟踪和EMA趋势过滤的结合,在把握趋势的同时较好地控制了风险。分段获利机制的设计也体现了成熟的交易思维。策略具有较强的实用性和可扩展性,通过持续优化和完善,有望获得更好的交易效果。 ||



#### Overview
This strategy is a trend following system based on ATR (Average True Range) dynamic trailing stop. It combines EMA as trend filter and controls signal generation through adjustable sensitivity parameters and ATR period. The system supports both long and short trades with comprehensive profit management mechanism.

#### Strategy Principle
1. Uses ATR indicator to calculate price volatility and determines trailing stop distance based on set sensitivity coefficient (Key Value)
2. Uses EMA to judge market trend direction, only opening long positions above EMA and short positions below EMA
3. Triggers trading signals when price breaks through trailing stop line and aligns with trend direction
4. System employs staged profit management:
   - At 20%-50% profit, raises stop loss to breakeven
   - At 50%-80% profit, takes partial profit and tightens stop loss
   - At 80%-100% profit, further tightens stop loss to protect profits
   - Above 100% profit, closes entire position

#### Strategy Advantages
1. Dynamic trailing stop effectively follows trends while preventing premature exits
2. EMA trend filtering effectively reduces false breakout risks
3. Staged profit mechanism ensures profit realization while giving trends room to develop
4. Supports both long and short trading, fully capturing market opportunities
5. Strong parameter adjustability, adapting to different market environments

#### Strategy Risks
1. May result in losses from frequent trading in ranging markets
2. Potentially large drawdowns during trend reversal initiation
3. Improper parameter settings may affect strategy performance
Risk control suggestions:
- Recommended use in clear trending markets
- Careful parameter selection through backtesting
- Set maximum drawdown limits
- Consider adding market condition filters

#### Strategy Optimization Directions
1. Add market environment recognition mechanism to use different parameters under different market conditions
2. Introduce volume and other auxiliary indicators to enhance signal reliability
3. Optimize profit management mechanism with dynamic profit targets based on volatility
4. Add time filters to avoid trading during unfavorable periods
5. Consider adding volatility filters to reduce trading frequency during excessive volatility

#### Summary
This is a well-structured trend following system with clear logic. Through the combination of ATR dynamic tracking and EMA trend filtering, it captures trends while maintaining good risk control. The staged profit mechanism design reflects mature trading thinking. The strategy has strong practicality and extensibility, with potential for better trading results through continuous optimization and improvement.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-15 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Enhanced UT Bot with Long & Short Trades", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input Parameters
keyvalue = input.float(1.1, title="Key Value (Sensitivity)", step=0.1)
atrperiod = input.int(200, title="ATR Period")
emaPeriod = input.int(50, title="EMA Period")
roi_close = input.float(100, title="Close Trade at ROI (%)", step=1)

// ATR Calculation
src = close
xATR = ta.atr(atrperiod)
nLoss = keyvalue * xATR

// EMA for Trend Filtering
ema = ta.ema(src, emaPeriod)

// Trailing Stop Logic
var float xATRTrailingStop = na
if na(xATRTrailingStop)
    xATRTrailingStop := src - nLoss

if src > nz(xATRTrailingStop[1]) and src[1] > nz(xATRTrailingStop[1])
    xATRTrailingStop := math.max(nz(xATRTrailingStop[1]), src - nLoss)
else if src < nz(xATRTrailingStop[1]) and src[1] < nz(xATRTrailingStop[1])
    xATRTrailingStop := math.min(nz(xATRTrailingStop[1]), src + nLoss)
else
    xATRTrailingStop := src > nz(xATRTrailingStop[1]) ? src - nLoss : src + nLoss

// Buy/Sell Signal with Trend Filter
buySignal = ta.crossover(src, xATRTrailingStop) and src > ema
sellSignal = ta.crossunder(src, xATRTrailingStop) and src < ema

// Strategy Logic: Long Trades
if buySignal and strategy.position_size <= 0
    strategy.entry("Buy", strategy.long)

if sellSignal and strategy.position_size > 0
    strategy.close("Buy")

// Strategy Logic: Short Trades
if sellSignal and strategy.position_size >= 0
    strategy.entry("Sell", strategy.short)

if buySignal and strategy.position_size < 0
    strategy.close("Sell")

// ROI Calculation for Both Long and Short Trades
var float entryPrice = na
var bool isLong = na
if strategy.position_size > 0
    entryPrice := strategy.opentrades.entry_price(0)
    isLong := true
if strategy.position_size < 0
    entryPrice := strategy.opentrades.entry_price(0)
    isLong := false

// Calculate current profit
currentProfit = isLong ? (close - entryPrice) / entryPrice * 100 : (entryPrice - close) / entryPrice * 100

// Enhanced ROI Management
if strategy.position_size > 0 // Long Position
    if currentProfit >= 20 and currentProfit < 50
        stopLevel = entryPrice // Breakeven
        strategy.exit("TSL Breakeven", from_entry="Buy", stop=stopLevel)
    if currentProfit >= 50 and currentProfit < 80
        stopLevel = entryPrice * 1.30 // 30% ROI
        strategy.exit("TSL 30%", from_entry="Buy", stop=stopLevel)
        strategy.close("Partial Profit", qty_percent=50) // Take 50% profit
    if currentProfit >= 80 and currentProfit < roi_close
        stopLevel = entryPrice * 1.60 // 60% ROI
        strategy.exit("TSL 60%", from_entry="Buy", stop=stopLevel)
    if currentProfit >= roi_close
        strategy.close("Full Exit at 100% ROI")

if strategy.position_size < 0 // Short Position
    if currentProfit >= 20 and currentProfit < 50
        stopLevel = entryPrice // Breakeven
        strategy.exit("TSL Breakeven", from_entry="Sell", stop=stopLevel)
    if currentProfit >= 50 and currentProfit < 80
        stopLevel = entryPrice * 0.70 // 30% ROI (Short stop)
        strategy.exit("TSL 30%", from_entry="Sell", stop=stopLevel)
        strategy.close("Partial Profit", qty_percent=50) // Take 50% profit
    if currentProfit >= 80 and currentProfit < roi_close
        stopLevel = entryPrice * 0.40 // 60% ROI (Short stop)
        strategy.exit("TSL 60%", from_entry="Sell", stop=stopLevel)
    if currentProfit >= roi_close
        strategy.close("Full Exit at 100% ROI")

// Plotting
plot(xATRTrailingStop, color=buySignal ? color.green : sellSignal ? color.red : color.gray, title="Trailing Stop")
plot(ema, color=color.blue, title="EMA Trend Filter")
plotshape(buySignal, title="Buy Signal", style=shape.labelup, location=location.belowbar, color=color.green, text="Buy")
plotshape(sellSignal, title="Sell Signal", style=shape.labeldown, location=location.abovebar, color=color.red, text="Sell")

```

> Detail

https://www.fmz.com/strategy/482822

> Last Modified

2025-02-20 14:53:21
