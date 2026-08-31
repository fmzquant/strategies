
> Name

Intelligent-Time-Based-Long-Short-Rotation-Balanced-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bee661f5e30ac09fb0.png)

[trans]
#### 概述
这是一个基于时间周期的智能轮动策略,通过在指定的时间周期内进行多空轮动交易来获取收益。策略采用灵活的持仓管理机制,可以根据市场环境自动调整交易方向,同时具备风险控制功能。该策略支持多空双向交易,并可选择性开启摆动交易模式,具有较强的适应性。

#### 策略原理
策略主要通过时间周期和持仓状态来控制交易。首先通过inActivePeriod()函数确定是否在最近500根K线的有效交易区间内。在有效区间内,策略根据持仓状态(positionHeld)、已持仓时间(barsHeld)和暂停时间(barsPaused)等变量来决定交易行为。当启用摆动交易模式时,策略会在多空方向间快速轮动;当禁用摆动交易模式时,策略会在持仓3个周期后平仓并等待新的交易机会。

#### 策略优势
1. 灵活性强:支持纯多头、纯空头或者多空双向交易模式
2. 风险可控:通过时间周期限制持仓时间,避免长期持仓风险
3. 自适应性好:能够根据市场环境自动调整交易方向
4. 操作简单:交易逻辑清晰,容易理解和执行
5. 资金效率高:通过频繁轮动提高资金使用效率
6. 参数可调:关键参数均可根据实际需求灵活调整

#### 策略风险
1. 交易频繁可能带来较高的手续费支出
2. 在震荡市场中可能会产生频繁的假信号
3. 固定的持仓周期可能会错过重要的市场机会
4. 没有考虑市场趋势,可能与主趋势相反
5. 缺乏止损机制,在极端行情下可能造成较大损失

#### 策略优化方向
1. 引入波动率指标(如ATR)来动态调整持仓时间
2. 增加趋势判断指标,提高交易方向的准确性
3. 添加止损止盈机制,提高风险控制能力
4. 优化入场时机,避免在不利时间段交易
5. 引入资金管理系统,优化持仓规模
6. 加入市场情绪指标,提高交易的准确性

#### 总结
该策略通过时间周期控制和多空轮动的方式来获取市场收益,具有较强的灵活性和适应性。虽然存在一些风险,但通过合理的优化和风险控制措施,可以显著提高策略的稳定性和盈利能力。策略的核心优势在于其简单而有效的交易逻辑,适合作为基础策略进行进一步优化和扩展。

||

#### Overview
This is an intelligent rotation strategy based on time periods that seeks to generate returns through long-short rotation trading within specified time periods. The strategy employs a flexible position management mechanism that can automatically adjust trading direction according to market conditions while incorporating risk control functions. It supports bi-directional trading and optional swing trading mode, demonstrating strong adaptability.

#### Strategy Principle
The strategy primarily controls trading through time periods and position status. First, the inActivePeriod() function determines whether trading is within the effective trading interval of the last 500 bars. Within the effective interval, the strategy decides trading actions based on variables such as position status (positionHeld), holding time (barsHeld), and pause time (barsPaused). When swing trading mode is enabled, the strategy rotates quickly between long and short directions; when disabled, positions are closed after 3 periods and wait for new trading opportunities.

#### Strategy Advantages
1. High Flexibility: Supports pure long, pure short, or bi-directional trading modes
2. Controlled Risk: Limits position holding time through time periods to avoid long-term position risks
3. Good Adaptability: Automatically adjusts trading direction based on market conditions
4. Simple Operation: Clear trading logic, easy to understand and execute
5. High Capital Efficiency: Improves capital utilization through frequent rotation
6. Adjustable Parameters: Key parameters can be flexibly adjusted according to actual needs

#### Strategy Risks
1. Frequent trading may lead to high commission costs
2. May generate frequent false signals in oscillating markets
3. Fixed holding periods might miss important market opportunities
4. Market trends not considered, may trade against primary trends
5. Lack of stop-loss mechanism may cause significant losses in extreme market conditions

#### Strategy Optimization Directions
1. Introduce volatility indicators (like ATR) to dynamically adjust holding periods
2. Add trend judgment indicators to improve trading direction accuracy
3. Include stop-loss and take-profit mechanisms to enhance risk control
4. Optimize entry timing to avoid unfavorable trading periods
5. Introduce money management system to optimize position sizing
6. Add market sentiment indicators to improve trading accuracy

#### Summary
This strategy achieves market returns through time period control and long-short rotation, demonstrating strong flexibility and adaptability. While certain risks exist, the strategy's stability and profitability can be significantly improved through reasonable optimization and risk control measures. The core advantage lies in its simple yet effective trading logic, making it suitable as a foundation strategy for further optimization and expansion.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-12 00:00:00
end: 2024-11-11 00:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Tickerly Test Strategy", overlay=true)

// Inputs
longEnabled = input.bool(true, "Enable Long Trades")
shortEnabled = input.bool(true, "Enable Short Trades")
swingEnabled = input.bool(false, "Enable Swing Trading")

// Variables
var positionHeld = 0
var barsHeld = 0
var barsPaused = 0
var lastAction = "none"

// Function to determine if we're in the last 500 bars
inActivePeriod() => 
    barIndex = bar_index
    lastBarIndex = last_bar_index
    barIndex >= (lastBarIndex - 499)

// Main strategy logic
if inActivePeriod()
    if swingEnabled
        if positionHeld == 0 and barstate.isconfirmed
            if lastAction != "long"
                strategy.entry("Long", strategy.long)
                positionHeld := 1
                barsHeld := 0
                lastAction := "long"
            else
                strategy.entry("Short", strategy.short)
                positionHeld := -1
                barsHeld := 0
                lastAction := "short"
        
        if positionHeld != 0
            barsHeld += 1
            if barsHeld >= 2
                if positionHeld == 1
                    strategy.entry("Short", strategy.short)
                    positionHeld := -1
                    barsHeld := 0
                    lastAction := "short"
                else
                    strategy.entry("Long", strategy.long)
                    positionHeld := 1
                    barsHeld := 0
                    lastAction := "long"
    else
        if positionHeld == 0 and barsPaused >= 1 and barstate.isconfirmed
            if longEnabled and shortEnabled
                if lastAction != "long"
                    strategy.entry("Long", strategy.long)
                    positionHeld := 1
                    barsHeld := 0
                    barsPaused := 0
                    lastAction := "long"
                else
                    strategy.entry("Short", strategy.short)
                    positionHeld := -1
                    barsHeld := 0
                    barsPaused := 0
                    lastAction := "short"
            else if longEnabled
                strategy.entry("Long", strategy.long)
                positionHeld := 1
                barsHeld := 0
                barsPaused := 0
                lastAction := "long"
            else if shortEnabled
                strategy.entry("Short", strategy.short)
                positionHeld := -1
                barsHeld := 0
                barsPaused := 0
                lastAction := "short"
        
        if positionHeld != 0
            barsHeld += 1
            if barsHeld >= 3
                strategy.close_all()
                positionHeld := 0
                barsHeld := 0
                barsPaused := 0  // Reset pause counter when exiting a position
        else
            barsPaused += 1

// Plotting active period for visual confirmation
plot(inActivePeriod() ? 1 : 0, "Active Period", color=color.new(color.blue, 80), style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/471718

> Last Modified

2024-11-12 16:33:43
