
> Name

Dual-EMA-Volatility-Adaptive-Trading-Strategy-with-Multi-Tiered-Profit-Optimization-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d85d70f5388c22408b37.png)
![IMG](https://www.fmz.com/upload/asset/2d965bb2750a6f9611bf4.png)


[trans]#### 概述
双均线波动率自适应交易策略与多级利润优化系统是一种专为短线交易者设计的高效量化交易策略。该策略核心依托于快速均线(EMA5)与慢速均线(EMA15)的交叉信号,结合RSI动量确认,并通过ATR波动率指标动态调整止损和获利水平。系统设计上采用两级获利模式,分别在不同波动率倍数处平仓,既保证了快速锁定部分利润,又能充分捕捉价格延展行情,形成完整的风险与收益管理框架。

#### 策略原理
该策略利用两条指数移动平均线(EMA)的交叉作为基础入场信号,辅以相对强弱指数(RSI)进行二次确认,再结合平均真实波幅(ATR)来设定动态的止损和获利目标。具体实现原理如下:

入场条件:
- 买入信号:当5周期EMA上穿15周期EMA,且RSI大于50时,表明短期动能向上且具有足够强度
- 卖出信号:当5周期EMA下穿15周期EMA,且RSI小于50时,表明短期动能向下且下跌趋势确认

动态风险管理:
- 止损位(SL):设定为当前价格减去1倍ATR值(多头)或加上1倍ATR值(空头)
- 第一获利目标(TP1):设定为当前价格加上1.5倍ATR值(多头)或减去1.5倍ATR值(空头),此处平仓50%仓位
- 第二获利目标(TP2):设定为当前价格加上3倍ATR值(多头)或减去3倍ATR值(空头),此处平仓剩余50%仓位

策略的核心设计理念是通过EMA交叉捕捉趋势的转折点,通过RSI过滤信号质量,并使用ATR动态调整退出水平,使策略能够自适应不同的市场波动环境。

#### 策略优势
1. 动态风险管理:使用ATR作为波动率参考基准,使策略能够自动适应不同波动率环境,在高波动市场自动拉大止损和获利空间,在低波动市场自动收紧止损和获利水平。

2. 分级获利结构:策略采用两级获利模式(1.5倍ATR和3倍ATR),在达到第一级目标时平仓50%,既保证了部分收益的快速锁定,又允许剩余头寸继续捕捉更大的走势。

3. 多重确认机制:通过EMA交叉和RSI指标的双重确认,有效过滤掉了许多假信号,提高了交易的准确性。

4. 可视化交易管理:策略在图表上清晰标注买卖信号以及动态计算的止损、获利水平,极大提高了交易的可操作性和透明度。

5. 自动化预警系统:内置的预警条件可以在触发交易信号时自动通知交易者,避免错过交易机会。

6. 参数可调适性强:策略提供了ATR倍数的自定义设置,使交易者可以根据自己的风险偏好灵活调整。

#### 策略风险
1. 快速市场反转风险:由于策略基于短周期EMA交叉,在市场剧烈波动或假突破情况下可能出现频繁的信号反转,导致连续止损。解决方法是在重大新闻公布或极端波动市场暂停交易,或增加额外的市场环境过滤条件。

2. 固定比例止损不足:虽然ATR动态调整提供了一定的适应性,但在市场结构性变化(如跳空)情况下,1倍ATR的止损可能不足以保护资金。建议在实盘中根据具体产品的历史波动特性调整ATR乘数。

3. 参数敏感性:EMA周期和RSI阈值的选择对策略表现有较大影响,不同市场条件下最优参数可能变化。建议通过历史数据回测确定适合目标市场的参数组合。

4. 盘中流动性风险:在波动较低的市场时段,ATR计算得出的止损范围可能过小,导致因价格轻微波动触发止损。可以设置最小止损点数作为底线防护。

5. 交易成本影响:策略是针对短线交易设计的,频繁交易会产生较高的交易成本。在实际应用中需权衡点差和佣金对收益的侵蚀。

#### 策略优化方向
1. 引入交易时段过滤:代码中已建议在高波动时段(如伦敦-纽约交叉时段)交易,但未在算法中硬编码这一限制。可以添加基于市场时间的过滤器,仅在最佳交易时段生成信号,避免低波动期间的假信号。

2. 优化RSI周期与阈值:当前RSI采用标准14周期和50的中间阈值,可根据具体市场特性调整RSI周期至与使用的时间框架更匹配的值,同时考虑使用非对称阈值(如多头使用55,空头使用45)以适应可能存在的市场偏向性。

3. 增加趋势过滤器:虽然EMA交叉已能提供趋势方向指示,但可以考虑增加更长周期的趋势指标(如50周期EMA)作为全局趋势过滤器,只在更大趋势方向上做单,提高成功率。

4. 动态仓位管理:目前策略使用固定仓位(0.1),可以实现基于ATR或余额比例的动态仓位管理,在不同波动率环境下自动调整仓位大小,保持风险暴露的一致性。

5. 回撤控制机制:增加基于账户权益的回撤控制逻辑,在达到特定回撤阈值后自动减小交易规模或暂停交易,保护资金安全。

6. 信号质量加权:可对信号进行质量评分(如基于EMA交叉角度、RSI读数强度等),并根据评分动态调整仓位或止损宽度,对高质量信号给予更大权重。

#### 总结
双均线波动率自适应交易策略与多级利润优化系统是一个将技术指标、动态风险管理和多级获利目标有机结合的短线交易系统。其核心优势在于适应性强、风险控制严格并具有良好的可视化和自动化特性。通过EMA交叉捕捉价格动量变化,RSI确认信号有效性,ATR动态调整出场水平,形成了一个完整的交易闭环。

该策略特别适合短线交易者在高流动性和波动性市场中应用,但使用者需注意市场条件筛选和参数优化,以应对不同市场环境的变化。通过建议的优化方向,策略还有进一步提升性能的空间,尤其是在增加趋势过滤和动态仓位管理方面。总体而言,这是一个设计合理、逻辑清晰且实用性强的量化交易策略。 || #### Overview
The Dual EMA Volatility-Adaptive Trading Strategy with Multi-Tiered Profit Optimization System is an efficient quantitative trading strategy designed for short-term traders. The core of this strategy relies on crossover signals between fast-moving average (EMA5) and slow-moving average (EMA15), combined with RSI momentum confirmation, and uses the ATR volatility indicator to dynamically adjust stop-loss and profit levels. The system employs a two-tier profit model, closing positions at different volatility multiples, which ensures both rapid securing of partial profits and the ability to capture extended price movements, forming a comprehensive risk and reward management framework.

#### Strategy Principles
This strategy utilizes the crossover of two Exponential Moving Averages (EMA) as the basic entry signal, supplemented by the Relative Strength Index (RSI) for secondary confirmation, and combines the Average True Range (ATR) to set dynamic stop-loss and profit targets. The specific implementation principles are as follows:

Entry Conditions:
- Buy Signal: When the 5-period EMA crosses above the 15-period EMA, and RSI is greater than 50, indicating upward short-term momentum with sufficient strength
- Sell Signal: When the 5-period EMA crosses below the 15-period EMA, and RSI is less than 50, indicating downward short-term momentum with confirmed downtrend

Dynamic Risk Management:
- Stop Loss (SL): Set at current price minus 1x ATR value (for long positions) or plus 1x ATR value (for short positions)
- First Profit Target (TP1): Set at current price plus 1.5x ATR value (for long positions) or minus 1.5x ATR value (for short positions), closing 50% of the position here
- Second Profit Target (TP2): Set at current price plus 3x ATR value (for long positions) or minus 3x ATR value (for short positions), closing the remaining 50% of the position

The core design philosophy of the strategy is to capture trend turning points through EMA crossovers, filter signal quality through RSI, and use ATR to dynamically adjust exit levels, enabling the strategy to adapt to different market volatility environments.

#### Strategy Advantages
1. Dynamic Risk Management: Using ATR as a volatility reference benchmark allows the strategy to automatically adapt to different volatility environments, automatically widening stop-loss and profit spaces in high-volatility markets, and automatically tightening stop-loss and profit levels in low-volatility markets.

2. Tiered Profit Structure: The strategy adopts a two-tier profit model (1.5x ATR and 3x ATR), closing 50% of the position when reaching the first tier target, which ensures both rapid locking of partial profits and allows the remaining position to continue capturing larger movements.

3. Multiple Confirmation Mechanism: Through the dual confirmation of EMA crossover and RSI indicator, many false signals are effectively filtered out, improving the accuracy of trades.

4. Visualized Trade Management: The strategy clearly marks buy and sell signals as well as dynamically calculated stop-loss and profit levels on the chart, greatly improving the operability and transparency of trading.

5. Automated Alert System: Built-in alert conditions can automatically notify traders when trading signals are triggered, avoiding missed trading opportunities.

6. Strong Parameter Adaptability: The strategy provides customizable settings for ATR multiples, allowing traders to flexibly adjust according to their risk preferences.

#### Strategy Risks
1. Rapid Market Reversal Risk: Since the strategy is based on short-period EMA crossovers, frequent signal reversals may occur during severe market fluctuations or false breakouts, leading to consecutive stop-losses. The solution is to pause trading during major news releases or extreme volatility markets, or to add additional market environment filtering conditions.

2. Fixed Proportion Stop-Loss Inadequacy: Although ATR dynamic adjustment provides a certain adaptability, in cases of structural market changes (such as gaps), a 1x ATR stop-loss may not be sufficient to protect capital. It is recommended to adjust the ATR multiplier in live trading based on the historical volatility characteristics of the specific product.

3. Parameter Sensitivity: The choice of EMA periods and RSI thresholds has a significant impact on strategy performance, and optimal parameters may change under different market conditions. It is recommended to determine suitable parameter combinations for the target market through historical data backtesting.

4. Intraday Liquidity Risk: During market sessions with lower volatility, the stop-loss range calculated by ATR may be too small, causing stop-losses to be triggered due to slight price fluctuations. A minimum stop-loss point can be set as a bottom-line protection.

5. Trading Cost Impact: The strategy is designed for short-term trading, and frequent trading will generate higher trading costs. In practical applications, the erosion of spreads and commissions on returns needs to be weighed.

#### Strategy Optimization Directions
1. Introduce Trading Session Filtering: The code already suggests trading during high volatility sessions (such as the London-New York cross session), but this restriction is not hard-coded in the algorithm. A filter based on market time can be added to generate signals only during optimal trading sessions, avoiding false signals during low volatility periods.

2. Optimize RSI Period and Threshold: The current RSI uses the standard 14-period and middle threshold of 50, which can be adjusted according to specific market characteristics to match the timeframe used, and consider using asymmetric thresholds (such as 55 for long positions and 45 for short positions) to adapt to potential market biases.

3. Add Trend Filter: Although EMA crossovers already provide trend direction indication, adding a longer-period trend indicator (such as 50-period EMA) as a global trend filter can be considered, only taking positions in the direction of the larger trend to improve success rate.

4. Dynamic Position Management: The current strategy uses a fixed position (0.1), but dynamic position management based on ATR or balance proportion can be implemented to automatically adjust position size in different volatility environments, maintaining consistency in risk exposure.

5. Drawdown Control Mechanism: Add drawdown control logic based on account equity, automatically reducing trading size or pausing trading when a specific drawdown threshold is reached, protecting capital safety.

6. Signal Quality Weighting: Signals can be scored for quality (such as based on EMA crossover angle, RSI reading strength, etc.), and position size or stop-loss width can be dynamically adjusted according to the score, giving greater weight to high-quality signals.

#### Summary
The Dual EMA Volatility-Adaptive Trading Strategy with Multi-Tiered Profit Optimization System is a short-term trading system that organically combines technical indicators, dynamic risk management, and multi-tier profit targets. Its core advantages lie in strong adaptability, strict risk control, and good visualization and automation features. By capturing price momentum changes through EMA crossovers, confirming signal validity with RSI, and dynamically adjusting exit levels with ATR, a complete trading loop is formed.

This strategy is particularly suitable for short-term traders to apply in high-liquidity and volatility markets, but users need to pay attention to market condition screening and parameter optimization to cope with changes in different market environments. Through the suggested optimization directions, there is room for further performance improvement of the strategy, especially in adding trend filtering and dynamic position management. Overall, this is a reasonably designed, logically clear, and practically strong quantitative trading strategy.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-26 00:00:00
end: 2025-02-23 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy("Scalping XAUUSD with Alerts By Fahrizal", overlay=true, default_qty_type=strategy.fixed, default_qty_value=0.1)

// Custom Inputs
tpMultiplier1 = input.float(1.5, "TP1 Multiplier (ATR)", minval=0.5, step=0.1) 
tpMultiplier2 = input.float(3.0, "TP2 Multiplier (ATR)", minval=1.0, step=0.1) 
slMultiplier = input.float(1.0, "SL Multiplier (ATR)", minval=0.5, step=0.1)   

// Indicator Definitions
emaFast = ta.ema(close, 5)   
emaSlow = ta.ema(close, 15)  
rsi = ta.rsi(close, 14)      
atr = ta.atr(14)             

// Variables to store levels
var float longSL = na
var float longTP1 = na
var float longTP2 = na
var float shortSL = na
var float shortTP1 = na
var float shortTP2 = na

// Plot to chart
plot(emaFast, color=color.green, title="EMA5")
plot(emaSlow, color=color.red, title="EMA15")

// Buy/Sell conditions
buySignal = ta.crossover(emaFast, emaSlow) and rsi > 50
sellSignal = ta.crossunder(emaFast, emaSlow) and rsi < 50

// Calculate and store TP and SL levels when signals trigger
if (buySignal)
    longSL := close - (atr * slMultiplier) 
    longTP1 := close + (atr * tpMultiplier1)
    longTP2 := close + (atr * tpMultiplier2)
    strategy.entry("Buy", strategy.long)
    strategy.exit("TP1 Long", "Buy", qty_percent=50, limit=longTP1) 
    strategy.exit("TP2 Long", "Buy", qty_percent=50, limit=longTP2) 
    strategy.exit("SL Long", "Buy", stop=longSL)                    

if (sellSignal)
    shortSL := close + (atr * slMultiplier)     
    shortTP1 := close - (atr * tpMultiplier1)   
    shortTP2 := close - (atr * tpMultiplier2)   
    strategy.entry("Sell", strategy.short)
    strategy.exit("TP1 Short", "Sell", qty_percent=50, limit=shortTP1)  
    strategy.exit("TP2 Short", "Sell", qty_percent=50, limit=shortTP2)  
    strategy.exit("SL Short", "Sell", stop=shortSL)                    

// Display signals on the chart
plotshape(buySignal, title="Buy", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(sellSignal, title="Sell", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Display levels on chart using labels
if (buySignal)
    label.new(bar_index, high, "SL: " + str.tostring(longSL, "#.##") + "\nTP1: " + str.tostring(longTP1, "#.##") + "\nTP2: " + str.tostring(longTP2, "#.##"), 
              color=color.blue, textcolor=color.white, style=label.style_label_down)
if (sellSignal)
    label.new(bar_index, low, "SL: " + str.tostring(shortSL, "#.##") + "\nTP1: " + str.tostring(shortTP1, "#.##") + "\nTP2: " + str.tostring(shortTP2, "#.##"), 
              color=color.red, textcolor=color.white, style=label.style_label_up)

// Simple notifications when positions are opened
alertcondition(buySignal, title="Buy Alert", message="Buy Signal Detected! Check chart for SL, TP1, TP2 levels.")
alertcondition(sellSignal, title="Sell Alert", message="Sell Signal Detected! Check chart for SL, TP1, TP2 levels.")

// Plot levels (optional)
plot(buySignal ? longTP1 : na, "TP1 Long", color=color.green, style=plot.style_cross)
plot(buySignal ? longTP2 : na, "TP2 Long", color=color.lime, style=plot.style_cross)
plot(buySignal ? longSL : na, "SL Long", color=color.red, style=plot.style_cross)
plot(sellSignal ? shortTP1 : na, "TP1 Short", color=color.green, style=plot.style_cross)
plot(sellSignal ? shortTP2 : na, "TP2 Short", color=color.lime, style=plot.style_cross)
plot(sellSignal ? shortSL : na, "SL Short", color=color.red, style=plot.style_cross)

```

> Detail

https://www.fmz.com/strategy/483681

> Last Modified

2025-02-27 16:38:38
