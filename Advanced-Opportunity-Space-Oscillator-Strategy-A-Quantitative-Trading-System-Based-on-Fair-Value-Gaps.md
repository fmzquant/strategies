
> Name

Advanced-Opportunity-Space-Oscillator-Strategy-A-Quantitative-Trading-System-Based-on-Fair-Value-Gaps

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8f95528677de2b601ee.png)
![IMG](https://www.fmz.com/upload/asset/2d89b5133ee61a3804494.png)


[trans]
#### 概述
这个策略是一个基于公平价值缺口(FVG)的创新性交易系统,通过识别市场中的价格差距和成交量异常来捕捉潜在的交易机会。该策略结合了动态计数机制和归一化处理,不仅能够准确识别买卖信号,还能通过可视化展示帮助交易者更好地理解市场结构。

#### 策略原理
策略的核心是通过监测连续K线之间的价格缺口来识别潜在的交易机会。具体来说:
1. 多头FVG(BFVG)形成条件是当前K线的最低价高于两根K线前的最高价
2. 空头FVG(SFVG)形成条件是当前K线的最高价低于两根K线前的最低价
3. 策略引入了基于成交量和缺口大小的验证机制,只有满足验证条件的FVG才会触发交易信号
4. 使用50个周期的动态计数窗口来累计多空FVG的数量
5. 通过归一化处理,将缺口宽度转化为更直观的指标值

#### 策略优势
1. 系统具有完善的信号验证机制,通过成交量和缺口幅度的双重确认来提高信号质量
2. 动态计数窗口可以有效捕捉市场趋势的变化
3. 归一化处理使得不同时期的信号具有可比性
4. 策略具有自动的仓位管理功能,在开新仓前会自动平掉反向持仓
5. 可视化效果优秀,便于交易者理解市场状态

#### 策略风险
1. FVG信号可能在高波动市场中产生虚假信号
2. 固定的验证参数可能不适用于所有市场环境
3. 没有设置止损和止盈机制,可能导致较大回撤
4. 频繁的交易可能带来较高的交易成本
建议通过设置适当的止损位置和引入市场环境过滤器来管理这些风险。

#### 策略优化方向
1. 引入自适应的参数调整机制,使策略能够更好地适应不同的市场环境
2. 增加趋势过滤器,在强趋势中只做单向交易
3. 设计更复杂的仓位管理系统,包括分批建仓和动态止损
4. 加入交易成本的考虑,优化交易频率
5. 结合其他技术指标来提高信号的可靠性

#### 总结
这是一个基于价格结构的创新性交易策略,通过对公平价值缺口的智能识别和验证来捕捉市场机会。策略的设计理念清晰,实现方式专业,具有良好的可扩展性。通过建议的优化方向,策略的稳定性和盈利能力有望得到进一步提升。 || 

#### Overview
This strategy is an innovative trading system based on Fair Value Gaps (FVG), designed to capture potential trading opportunities by identifying price gaps and volume anomalies in the market. The strategy combines dynamic counting mechanisms and normalization processing, not only accurately identifying buy and sell signals but also helping traders better understand market structure through visualization.

#### Strategy Principles
The core of the strategy is to identify potential trading opportunities by monitoring price gaps between consecutive candles. Specifically:
1. Bullish FVG (BFVG) forms when the current candle's low is higher than the high of two candles ago
2. Bearish FVG (SFVG) forms when the current candle's high is lower than the low of two candles ago
3. The strategy incorporates a verification mechanism based on volume and gap size, where only FVGs meeting verification conditions trigger trading signals
4. Uses a 50-period dynamic counting window to accumulate the number of bullish and bearish FVGs
5. Through normalization processing, gap widths are transformed into more intuitive indicator values

#### Strategy Advantages
1. The system has a comprehensive signal verification mechanism, improving signal quality through dual confirmation of volume and gap magnitude
2. Dynamic counting window effectively captures market trend changes
3. Normalization processing makes signals comparable across different periods
4. Strategy includes automatic position management, closing reverse positions before opening new ones
5. Excellent visualization effects, making it easier for traders to understand market conditions

#### Strategy Risks
1. FVG signals may generate false signals in highly volatile markets
2. Fixed verification parameters may not be suitable for all market environments
3. Lack of stop-loss and take-profit mechanisms may lead to significant drawdowns
4. Frequent trading may result in high transaction costs
It is recommended to manage these risks by setting appropriate stop-loss levels and introducing market environment filters.

#### Optimization Directions
1. Introduce adaptive parameter adjustment mechanisms to better adapt to different market environments
2. Add trend filters to trade only in the direction of strong trends
3. Design more sophisticated position management systems, including staged position building and dynamic stop-loss
4. Consider transaction costs and optimize trading frequency
5. Combine with other technical indicators to improve signal reliability

#### Summary
This is an innovative trading strategy based on price structure, capturing market opportunities through intelligent identification and verification of fair value gaps. The strategy's design concept is clear, implementation is professional, and it has good scalability. Through the suggested optimization directions, the strategy's stability and profitability can be further enhanced.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// ----------------------------------------------------------------------------
// This Pine Script™ code is subject to the terms of the Mozilla Public License
// 2.0 at https://mozilla.org/MPL/2.0/
// © OmegaTools
// ----------------------------------------------------------------------------

//@version=5
strategy("FVG Oscillator Strategy", 
     shorttitle="FVG Osc v5 [Strategy]", 
     overlay=false, 
     initial_capital=100000, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100)

//------------------------------------------------------------------------------
// 1) Input Parameters
//------------------------------------------------------------------------------
lnt   = input.int(50, "Bars Back")
area  = input.bool(true, "Show Areas")
upcol = input.color(#2962ff, "Positive Color")
dncol = input.color(#e91e63, "Negative Color")

//------------------------------------------------------------------------------
// 2) FVG Detection
//    bfvg = bullish FVG, sfvg = bearish FVG
//------------------------------------------------------------------------------
bfvg = low > high[2]
sfvg = high < low[2]

//------------------------------------------------------------------------------
// 3) Additional Conditions - FVG Verification (Volume, Gap Size)
//------------------------------------------------------------------------------
vol  = volume > ta.sma(volume, 10)
batr = (low - high[2]) > ta.sma(low - high[2], lnt) * 1.5
satr = (high - low[2]) > ta.sma(high - low[2], lnt) * 1.5

//------------------------------------------------------------------------------
// 4) Sum of Bullish / Bearish FVG within the Last lnt Bars
//------------------------------------------------------------------------------
countup   = math.sum(bfvg ? 1 : 0, lnt)      // +1 for each BFVG
countdown = math.sum(sfvg ? -1 : 0, lnt)     // -1 for each SFVG

//------------------------------------------------------------------------------
// 5) Verification (e.g., Require Higher Volume or Large Gap)
//------------------------------------------------------------------------------
verifyb = (bfvg and vol[1]) or (bfvg and batr)
verifys = (sfvg and vol[1]) or (sfvg and satr)

//------------------------------------------------------------------------------
// 6) Normalized Gap Values
//------------------------------------------------------------------------------
normb = ((low - high[2]) * countup * 0.75) / ta.highest(low - high[2], lnt)
norms = ((high - low[2]) * countdown * 0.75) / ta.lowest(high - low[2], lnt)

//------------------------------------------------------------------------------
// 7) Total Net FVG Count + Calculation of Maximum for fill()
//------------------------------------------------------------------------------
totcount = countup + countdown
max      = math.max(
               ta.highest(countup, 200), 
               ta.highest(math.abs(countdown), 200)
           )

//------------------------------------------------------------------------------
// 8) Plotting Values (as in an indicator – can be kept for visualization)
//------------------------------------------------------------------------------
up   = plot(countup,     "Buy FVG",  color=upcol,  display=display.none)
down = plot(countdown,   "Sell FVG", color=dncol,  display=display.none)
zero = plot(0, "", color.new(color.gray, 100), display=display.none, editable=false)

// Net Value (sum of FVG)
plot(totcount, "Net Value", color=color.new(color.gray, 50))

// Filling areas above/below zero

plot(verifyb ? normb : na, "Long Pattern Width",  color=upcol,  linewidth=1, style=plot.style_histogram)
plot(verifys ? norms : na, "Short Pattern Width", color=dncol, linewidth=1, style=plot.style_histogram)

//------------------------------------------------------------------------------
// 9) Simple Trading Logic (STRATEGY)
//------------------------------------------------------------------------------
// - If "verifyb" is detected, go long.
// - If "verifys" is detected, go short.
//
// You can extend this with Stop Loss, Take Profit, 
// closing old positions, etc.
//------------------------------------------------------------------------------
bool goLong  = verifyb
bool goShort = verifys

// Basic example: Open Long if verifyb, Open Short if verifys.
if goLong
    // First close any short position if it exists
    if strategy.position_size < 0
        strategy.close("Short FVG")
    // Then open Long
    strategy.entry("Long FVG", strategy.long)

if goShort
    // First close any long position if it exists
    if strategy.position_size > 0
        strategy.close("Long FVG")
    // Then open Short
    strategy.entry("Short FVG", strategy.short)

```

> Detail

https://www.fmz.com/strategy/483043

> Last Modified

2025-02-24 14:55:25
