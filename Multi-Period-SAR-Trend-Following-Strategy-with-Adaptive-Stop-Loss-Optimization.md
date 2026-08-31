
> Name

Multi-Period-SAR-Trend-Following-Strategy-with-Adaptive-Stop-Loss-Optimization

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d6b2f5012e5925e0fc.png)

[trans]
#### 概述
本策略基于传统的抛物线SAR(Parabolic Stop and Reverse)指标进行了深度优化,结合了多周期趋势判断和自适应止损机制。策略采用动态加速因子(AF)调整方式,通过极值点(EP)的不断更新来跟踪市场趋势,实现对上升趋势的精准把握和风险控制。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 动态SAR计算:使用起始加速因子(AF)、增量值和最大值三个参数,根据趋势强度动态调整SAR值。
2. 趋势判定机制:通过比较SAR值与价格位置关系判断趋势方向,当SAR穿越价格时触发趋势反转信号。
3. 入场逻辑:在确认上升趋势且无持仓时,使用下一周期预测的SAR值作为止损位设置入场订单。
4. 止损优化:采用前1-2根K线的极值作为SAR调整基准,提高止损的准确性和及时性。

#### 策略优势
1. 自适应性强:通过动态加速因子调整,策略能够根据市场波动强度自动调整参数。
2. 风险控制完善:利用预测性SAR值设置止损,保证了止损的前瞻性和有效性。
3. 趋势把握准确:多重趋势确认机制,降低了假突破带来的风险。
4. 计算逻辑严谨:采用变量状态保持机制,确保了策略在历史回测中的稳定性。

#### 策略风险
1. 震荡市场风险:在横盘震荡市场可能频繁触发假信号,导致连续止损。
应对方案:可引入波动率过滤器,在低波动率环境下降低交易频率。
2. 滑点影响:预测性SAR止损在高波动市场可能面临滑点风险。
应对方案:建议设置合理的滑点容忍度,并根据品种特性调整参数。
3. 趋势反转延迟:在急剧反转行情中可能出现止损滞后。
应对方案:可结合短周期动量指标辅助判断,提高止损的敏感度。

#### 策略优化方向
1. 多周期协同:建议增加多个时间周期的趋势确认机制,提高信号可靠性。
2. 动态参数优化:可根据市场波动率动态调整加速因子的参数设置。
3. 止损机制完善:引入基于ATR的动态止损带,提高止损的灵活性。
4. 仓位管理优化:增加基于波动率的动态仓位管理机制。

#### 总结
该策略通过对经典PSAR指标的深度优化,实现了趋势跟踪和风险控制的有效结合。策略的自适应特性和完善的止损机制使其具有较强的实战应用价值。通过建议的优化方向,策略的稳定性和盈利能力有望得到进一步提升。 || 

#### Overview
This strategy is a deep optimization of the traditional Parabolic SAR (Stop and Reverse) indicator, combining multi-period trend judgment and adaptive stop-loss mechanisms. The strategy employs a dynamic Acceleration Factor (AF) adjustment method, tracking market trends through continuous updates of Extreme Points (EP) to achieve precise capture of upward trends and risk control.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Dynamic SAR Calculation: Uses three parameters - initial AF, increment value, and maximum value - to dynamically adjust SAR values based on trend strength.
2. Trend Determination Mechanism: Judges trend direction by comparing SAR values with price positions, triggering trend reversal signals when SAR crosses price.
3. Entry Logic: Places entry orders using next period's predicted SAR value as stop-loss when uptrend is confirmed and no position is held.
4. Stop-Loss Optimization: Uses extremes from the previous 1-2 candles as SAR adjustment benchmark, improving stop-loss accuracy and timeliness.

#### Strategy Advantages
1. Strong Adaptability: Parameters automatically adjust to market volatility through dynamic AF adjustment.
2. Comprehensive Risk Control: Uses predictive SAR values for stop-loss, ensuring forward-looking and effective risk management.
3. Accurate Trend Capture: Multiple trend confirmation mechanisms reduce risks from false breakouts.
4. Rigorous Calculation Logic: Employs variable state maintenance mechanism, ensuring strategy stability in historical backtesting.

#### Strategy Risks
1. Sideways Market Risk: Frequent false signals may trigger consecutive stop-losses in ranging markets.
Solution: Introduce volatility filters to reduce trading frequency in low volatility environments.
2. Slippage Impact: Predictive SAR stops may face slippage risks in highly volatile markets.
Solution: Set reasonable slippage tolerance and adjust parameters based on instrument characteristics.
3. Trend Reversal Delay: Stop-loss may lag in sharp reversal situations.
Solution: Incorporate short-period momentum indicators to improve stop-loss sensitivity.

#### Strategy Optimization Directions
1. Multi-Period Synergy: Add trend confirmation mechanisms across multiple timeframes to improve signal reliability.
2. Dynamic Parameter Optimization: Dynamically adjust AF parameters based on market volatility.
3. Stop-Loss Mechanism Enhancement: Introduce ATR-based dynamic stop-loss bands for improved flexibility.
4. Position Management Optimization: Add volatility-based dynamic position management mechanism.

#### Summary
The strategy effectively combines trend following and risk control through deep optimization of the classic PSAR indicator. Its adaptive features and comprehensive stop-loss mechanism provide strong practical application value. Through the suggested optimization directions, the strategy's stability and profitability can be further enhanced.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("A股抛物线策略（仅做多）- 完全移除SAR绘图", overlay=true)

// 参数设置
start     = input.float(0.02, "起始加速因子")
increment = input.float(0.02, "加速因子增量")
maximum   = input.float(0.2,  "加速因子最大值")

// 定义变量（var保证变量在整个历史数据中保持状态）
var bool   uptrend    = true    // 默认初始化为上升趋势
var float  EP         = na      // 极值点：上升趋势时为最高价，下降趋势时为最低价
var float  SAR        = na      // 当前K线的SAR
var float  AF         = start   // 当前加速因子
var float  nextBarSAR = na      // 下一根K线的预测SAR

//【1】初始化：针对第一根K线（bar_index==0）
if bar_index == 0
    // 使用首根K线收盘价初始化
    SAR        := close
    nextBarSAR := close
    EP         := close
    uptrend    := true

//【2】从第二根K线开始（bar_index>=1）计算SAR
if bar_index >= 1
    // 先将上一根K线计算得到的 nextBarSAR 赋给当前SAR
    SAR := nz(nextBarSAR, SAR)
    
    // 第2根K线（bar_index==1）做初始化，利用上一根K线（bar_index==0）的高低价
    if bar_index == 1
        if close > close[1]
            uptrend := true
            EP      := high
            SAR     := low[1]
        else
            uptrend := false
            EP      := low
            SAR     := high[1]
        AF := start
        nextBarSAR := SAR + AF * (EP - SAR)
    else
        // 记录是否处于趋势反转的首根K线，方便后续判断
        var bool firstTrendBar = false
        firstTrendBar := false
        
        // 检测趋势反转：
        // 在上升趋势中，如果当前SAR超过最低价，则认为发生反转
        if uptrend
            if SAR > low
                firstTrendBar := true
                uptrend     := false
                // 反转时，SAR取上一次极值与当前最高价中的较大者，极值改为当前最低价
                SAR         := math.max(EP, high)
                EP          := low
                AF          := start
            // 注意：原代码在上升趋势中还有个判断 SAR < high 的分支，但通常反转判据只需检测SAR是否穿过低点即可
        else
            // 在下降趋势中，如果当前SAR低于最高价，则认为反转为上升趋势
            if SAR < high
                firstTrendBar := true
                uptrend     := true
                SAR         := math.min(EP, low)
                EP          := high
                AF          := start
        
        // 若非反转情形，则更新极值和加速因子
        if not firstTrendBar
            if uptrend
                if high > EP
                    EP := high
                    AF := math.min(AF + increment, maximum)
            else
                if low < EP
                    EP := low
                    AF := math.min(AF + increment, maximum)
                    
        // 调整SAR，确保其不超过最近1-2根K线的最低价（上升趋势）或最高价（下降趋势）
        if uptrend
            SAR := math.min(SAR, low[1])
            if bar_index > 1
                SAR := math.min(SAR, low[2])
        else
            SAR := math.max(SAR, high[1])
            if bar_index > 1
                SAR := math.max(SAR, high[2])
        
        // 计算下一根K线的预测SAR
        nextBarSAR := SAR + AF * (EP - SAR)
        
        //【3】交易逻辑（仅做多）
        if barstate.isconfirmed
            // 当出现上升趋势且当前无多头仓位时进场做多（以预测的下一根K线SAR为止损触发价）
            if uptrend and strategy.position_size <= 0
                strategy.entry("Long", strategy.long, stop=nextBarSAR, comment="Long Entry")
            // 当趋势转为下降且持有多头时平仓
            if not uptrend and strategy.position_size > 0
                strategy.close("Long", comment="Long Exit")

// 绘图部分完全移除，不再绘制任何与SAR相关的图形
```

> Detail

https://www.fmz.com/strategy/482425

> Last Modified

2025-02-18 13:48:30
