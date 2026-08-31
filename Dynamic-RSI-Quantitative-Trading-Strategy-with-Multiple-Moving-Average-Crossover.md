
> Name

Dynamic-RSI-Quantitative-Trading-Strategy-with-Multiple-Moving-Average-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fc341e6f1e099965a0.png)

[trans]
#### 概述
这是一个结合了相对强弱指数(RSI)和多种移动平均线的量化交易策略。该策略主要通过监测RSI指标上的不同类型移动平均线(包括SMA、EMA、WMA和SMMA)的交叉信号来判断市场趋势,同时结合RSI指标本身的超买超卖区间作为辅助判断依据,从而确定交易时机。

#### 策略原理
策略主要包含以下几个关键计算步骤:
1. 计算14周期的RSI指标,设定超买区域为70,超卖区域为30
2. 在RSI曲线上分别计算3条不同参数的移动平均线:
   - MA1: 20周期,可选SMA/EMA/WMA/SMMA
   - MA2: 50周期,可选SMA/EMA/WMA/SMMA  
   - MA3: 100周期,可选SMA/EMA/WMA/SMMA
3. 交易信号生成规则:
   - 买入信号:当MA2向上穿越MA3时
   - 卖出信号:当MA2向下穿越MA3时
4. 同时检测RSI指标的背离情况,为交易决策提供辅助参考

#### 策略优势
1. 多重技术指标交叉验证,提高交易信号的可靠性
2. 移动平均线类型和参数可调,具有较强的灵活性
3. RSI背离检测功能可以帮助提前发现市场转折点
4. 采用百分比仓位管理,有效控制风险
5. 可视化效果优秀,便于分析和回测

#### 策略风险
1. 移动平均线交叉可能产生滞后效应
2. 在横盘震荡市场中可能产生频繁的虚假信号
3. RSI指标在某些市场条件下的失真
4. 参数选择不当可能导致交易信号过多或过少
规避措施:
- 建议结合市场走势和交易量进行交叉验证
- 可以通过调整移动平均线参数来优化交易频率
- 设置止损和止盈来控制风险

#### 策略优化方向
1. 信号过滤优化:
- 增加趋势确认指标
- 加入成交量分析
2. 参数动态优化:
- 根据市场波动率自动调整RSI和MA参数
- 引入自适应周期计算方法
3. 风险控制优化:
- 开发动态止损止盈机制
- 设计仓位动态管理系统

#### 总结
该策略通过结合RSI和多重移动平均线,构建了一个具有较强适应性的交易系统。策略的核心优势在于多重技术指标的交叉验证和灵活的参数配置,但同时需要注意移动平均线的滞后性以及市场条件对策略表现的影响。通过持续优化和风险控制,该策略有望在实际交易中取得稳定表现。

|| 

#### Overview
This is a quantitative trading strategy that combines the Relative Strength Index (RSI) with multiple moving averages. The strategy primarily identifies market trends by monitoring crossover signals between different types of moving averages (including SMA, EMA, WMA, and SMMA) on the RSI indicator, while using RSI's overbought and oversold zones as supplementary decision criteria.

#### Strategy Principles
The strategy includes several key calculation steps:
1. Calculate 14-period RSI with overbought level at 70 and oversold level at 30
2. Calculate three different moving averages on the RSI curve:
   - MA1: 20-period, choice of SMA/EMA/WMA/SMMA
   - MA2: 50-period, choice of SMA/EMA/WMA/SMMA
   - MA3: 100-period, choice of SMA/EMA/WMA/SMMA
3. Trading signal generation rules:
   - Buy signal: When MA2 crosses above MA3
   - Sell signal: When MA2 crosses below MA3
4. Simultaneously detect RSI divergences for additional reference

#### Strategy Advantages
1. Multiple technical indicator cross-validation improves signal reliability
2. Flexible moving average types and parameters
3. RSI divergence detection helps identify market turning points early
4. Percentage-based position management for effective risk control
5. Excellent visualization for analysis and backtesting

#### Strategy Risks
1. Moving average crossovers may have lag effects
2. False signals may occur in ranging markets
3. RSI distortion under certain market conditions
4. Improper parameter selection may lead to excessive or insufficient trading signals
Risk mitigation:
- Recommend cross-validation with market trends and volume
- Optimize trading frequency through moving average parameter adjustment
- Set stop-loss and take-profit levels for risk control

#### Strategy Optimization Directions
1. Signal filtering optimization:
- Add trend confirmation indicators
- Incorporate volume analysis
2. Parameter dynamic optimization:
- Automatically adjust RSI and MA parameters based on market volatility
- Introduce adaptive period calculation methods
3. Risk control optimization:
- Develop dynamic stop-loss and take-profit mechanisms
- Design dynamic position management system

#### Summary
The strategy builds an adaptive trading system by combining RSI and multiple moving averages. Its core advantages lie in the cross-validation of multiple technical indicators and flexible parameter configuration, while attention must be paid to moving average lag and market condition impacts on strategy performance. Through continuous optimization and risk control, this strategy shows promise for stable performance in actual trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2025-01-16 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=6
strategy(title="Relative Strength Index with MA Strategy", shorttitle="RSI-MA Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=200)

// RSI Inputs
rsiLengthInput = input.int(14, minval=1, title="RSI Length", group="RSI Settings")
rsiSourceInput = input.source(close, "Source", group="RSI Settings")
calculateDivergence = input.bool(false, title="Calculate Divergence", group="RSI Settings", tooltip="Calculating divergences is needed in order for divergence alerts to fire.")

// RSI Calculation
change_rsi = ta.change(rsiSourceInput)
up = ta.rma(math.max(change_rsi, 0), rsiLengthInput)
down = ta.rma(-math.min(change_rsi, 0), rsiLengthInput)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

// RSI Plot
plot(rsi, "RSI", color=#7E57C2)
hline(70, "RSI Upper Band", color=#787B86)
hline(50, "RSI Middle Band", color=color.new(#787B86, 50))
hline(30, "RSI Lower Band", color=#787B86)
fill(hline(70), hline(30), color=color.rgb(126, 87, 194, 90), title="RSI Background Fill")

// RSI-based MA Inputs
grpRSIMovingAverages = "RSI Moving Averages"
ma1Length = input.int(20, title="MA1 Length", group=grpRSIMovingAverages)
ma2Length = input.int(50, title="MA2 Length", group=grpRSIMovingAverages)
ma3Length = input.int(100, title="MA3 Length", group=grpRSIMovingAverages)
ma1Type = input.string("SMA", title="MA1 Type", options=["SMA", "EMA", "WMA", "SMMA"], group=grpRSIMovingAverages)
ma2Type = input.string("EMA", title="MA2 Type", options=["SMA", "EMA", "WMA", "SMMA"], group=grpRSIMovingAverages)
ma3Type = input.string("WMA", title="MA3 Type", options=["SMA", "EMA", "WMA", "SMMA"], group=grpRSIMovingAverages)

// MA Calculation Function
calcMA(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "WMA" => ta.wma(source, length)
        "SMMA" => ta.rma(source, length)

// MA Calculations
ma1 = calcMA(rsi, ma1Length, ma1Type)
ma2 = calcMA(rsi, ma2Length, ma2Type)
ma3 = calcMA(rsi, ma3Length, ma3Type)

// MA Plots
plot(ma1, title="RSI MA1", color=color.blue)
plot(ma2, title="RSI MA2", color=color.green)
plot(ma3, title="RSI MA3", color=color.red)

// Divergence (Retained from original script)
lookbackRight = 5
lookbackLeft = 5
rangeUpper = 60
rangeLower = 5
bearColor = color.red
bullColor = color.green
textColor = color.white
noneColor = color.new(color.white, 100)

_inRange(bool cond) =>
    bars = ta.barssince(cond)
    rangeLower <= bars and bars <= rangeUpper

plFound = false
phFound = false

bullCond = false
bearCond = false

rsiLBR = rsi[lookbackRight]

if calculateDivergence
    // Regular Bullish
    plFound := not na(ta.pivotlow(rsi, lookbackLeft, lookbackRight))    
    rsiHL = rsiLBR > ta.valuewhen(plFound, rsiLBR, 1) and _inRange(plFound[1])
    lowLBR = low[lookbackRight]
    priceLL = lowLBR < ta.valuewhen(plFound, lowLBR, 1)
    bullCond := priceLL and rsiHL and plFound

    // Regular Bearish
    phFound := not na(ta.pivothigh(rsi, lookbackLeft, lookbackRight))
    rsiLH = rsiLBR < ta.valuewhen(phFound, rsiLBR, 1) and _inRange(phFound[1])
    highLBR = high[lookbackRight]
    priceHH = highLBR > ta.valuewhen(phFound, highLBR, 1)
    bearCond := priceHH and rsiLH and phFound

// plot(
//      plFound ? rsiLBR : na,
//      offset=-lookbackRight,
//      title="Regular Bullish",
//      linewidth=2,
//      color=(bullCond ? bullColor : noneColor),
//      display = display.pane
//      )

plotshape(
     bullCond ? rsiLBR : na,
     offset=-lookbackRight,
     title="Regular Bullish Label",
     text=" Bull ",
     style=shape.labelup,
     location=location.absolute,
     color=bullColor,
     textcolor=textColor
     )

// plot(
//      phFound ? rsiLBR : na,
//      offset=-lookbackRight,
//      title="Regular Bearish",
//      linewidth=2,
//      color=(bearCond ? bearColor : noneColor),
//      display = display.pane
//      )

plotshape(
     bearCond ? rsiLBR : na,
     offset=-lookbackRight,
     title="Regular Bearish Label",
     text=" Bear ",
     style=shape.labeldown,
     location=location.absolute,
     color=bearColor,
     textcolor=textColor
     )

alertcondition(bullCond, title='Regular Bullish Divergence', message="Found a new Regular Bullish Divergence, `Pivot Lookback Right` number of bars to the left of the current bar.")
alertcondition(bearCond, title='Regular Bearish Divergence', message='Found a new Regular Bearish Divergence, `Pivot Lookback Right` number of bars to the left of the current bar.')

// ----- MUA/BÁN -----

// Điều kiện Mua: MA2 cắt lên MA3 và MA3 < 55
buyCondition = ta.crossover(ma2, ma3) 

// Điều kiện Bán: MA2 cắt xuống MA3 và MA3 > 40
sellCondition = ta.crossunder(ma2, ma3)

// Thực hiện lệnh Mua/Bán
if (buyCondition)
    strategy.entry("Buy", strategy.long, comment="Buy Signal")

if (sellCondition)
    strategy.close("Buy", comment="Sell Signal")



// ----- KẾT THÚC -----

```

> Detail

https://www.fmz.com/strategy/478734

> Last Modified

2025-01-17 16:14:38
