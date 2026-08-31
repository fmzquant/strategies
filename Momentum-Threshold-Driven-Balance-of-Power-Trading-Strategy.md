
> Name

Momentum-Threshold-Driven-Balance-of-Power-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d89126a832612e3c19b5.png)
![IMG](https://www.fmz.com/upload/asset/2d8d2407e22ef46e2dddc.png)


[trans]
#### 概述
该策略是一个基于动量的交易系统,主要利用平衡力量(Balance of Power)指标在4小时时间周期上进行交易。通过测量买卖双方力量对比,当指标突破预设阈值时触发交易信号。策略包含动态仓位管理、可调节杠杆以及可视化交易跟踪等功能,能够有效捕捉市场趋势转折点。

#### 策略原理
策略核心是通过计算(收盘价-开盘价)/(最高价-最低价)来衡量市场买卖力量平衡。当该值接近1时表示强烈看涨动能,接近-1时表示强烈看跌压力。具体交易逻辑如下:
- 开仓条件:当平衡力量指标上穿0.8时,表明买方力量强劲,进场做多
- 平仓条件:当平衡力量指标下穿-0.8时,表明卖方压力增大,平仓出场
- 仓位管理:基于账户权益动态调整,并可设置杠杆倍数

#### 策略优势
1. 信号明确:采用固定阈值触发,避免频繁交易,聚焦高确信度信号
2. 风险可控:通过动态仓位和可调杠杆实现灵活风险管理
3. 可视化强:提供交易标记和历史记录,便于策略回测和优化
4. 适应性好:适合波动性较大的市场环境,能及时把握趋势转折

#### 策略风险
1. 滑点风险:在剧烈波动时可能面临较大滑点
2. 假突破风险:可能触发虚假突破信号导致亏损
3. 趋势依赖:在震荡市场表现可能欠佳
4. 杠杆风险:过高杠杆可能带来严重损失

#### 策略优化方向
1. 引入趋势过滤:结合其他技术指标判断大趋势方向
2. 优化阈值设置:根据不同市场环境动态调整阈值
3. 完善止损机制:增加追踪止损等风险控制手段
4. 增加时间过滤:考虑重要经济数据发布等时间因素

#### 总结
该策略通过平衡力量指标捕捉市场动量变化,结合动态仓位管理和风险控制,构建了一个相对完整的交易系统。虽然存在一定风险,但通过持续优化和完善可以进一步提升策略的稳定性和盈利能力。适合对动量交易感兴趣的交易者使用和研究。

|| 

#### Overview
This strategy is a momentum-based trading system that utilizes the Balance of Power (BoP) indicator on a 4-hour timeframe. By measuring the strength between buyers and sellers, it triggers trading signals when the indicator crosses predetermined thresholds. The strategy includes dynamic position sizing, adjustable leverage, and visual trade tracking features, effectively capturing market trend reversal points.

#### Strategy Principles
The core mechanism calculates (Close-Open)/(High-Low) to measure market force balance. Values near 1 indicate strong bullish momentum, while values near -1 suggest strong bearish pressure. The trading logic includes:
- Entry Condition: Long position when BoP crosses above 0.8, indicating strong buying pressure
- Exit Condition: Close position when BoP crosses below -0.8, showing increased selling pressure
- Position Management: Dynamic adjustment based on account equity with adjustable leverage

#### Strategy Advantages
1. Clear Signals: Fixed thresholds prevent frequent trading and focus on high-confidence signals
2. Controlled Risk: Flexible risk management through dynamic positioning and adjustable leverage
3. Strong Visualization: Provides trade markers and historical records for strategy backtesting
4. Good Adaptability: Suitable for volatile market conditions, capturing trend reversals effectively

#### Strategy Risks
1. Slippage Risk: May face significant slippage during volatile periods
2. False Breakout Risk: Potential losses from false breakthrough signals
3. Trend Dependency: May underperform in ranging markets
4. Leverage Risk: High leverage may lead to substantial losses

#### Optimization Directions
1. Trend Filtering: Incorporate additional technical indicators for trend direction
2. Threshold Optimization: Dynamically adjust thresholds based on market conditions
3. Stop-Loss Enhancement: Add trailing stop-loss and other risk control measures
4. Time Filtering: Consider important economic data releases and timing factors

#### Summary
The strategy captures market momentum changes through the Balance of Power indicator, combining dynamic position management and risk control to build a relatively complete trading system. While risks exist, continuous optimization can further enhance strategy stability and profitability. It's suitable for traders interested in momentum trading research and implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-25 00:00:00
end: 2025-02-22 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy(title="Balance of Power for US30 4H", format=format.price, precision=2, default_qty_type=strategy.percent_of_equity, default_qty_value=100, overlay=true, commission_value=0.01, max_labels_count=500, max_lines_count = 500)

leverage = input.float(5, "Leverage 1:", tooltip="Multiply your equity (100%) times the leverage.")

p = (close - open) / (high - low)
qty = strategy.equity * leverage / close

if ta.crossover(p, 0.8)
    strategy.entry("L", strategy.long, qty=qty)

if ta.crossunder(p, -0.8)
    strategy.close("L")

green   = color.new(#0097a7, 0)
red     = color.new(#ff195f, 0)
green90 = color.new(#0097a7, 85)
red90   = color.new(#ff195f, 85)

if strategy.position_size > strategy.position_size[1]
    label.new(bar_index, low * 0.999, text="▲", textcolor=green, size=size.normal, textalign=text.align_center, color=green90, style=label.style_text_outline)
    label.new(bar_index, low * 0.999, text="Buy", textcolor=green, size=size.tiny, textalign=text.align_center, color=green90, style=label.style_label_up)

if strategy.position_size < strategy.position_size[1]
    label.new(bar_index, high * 1.001, text="▼", textcolor=red, size=size.normal, textalign=text.align_center, color=red90, style=label.style_text_outline)
    label.new(bar_index, high * 1.001, text="Close", textcolor=red, size=size.tiny, textalign=text.align_center, color=red90, style=label.style_label_down)


var float tradeEntryPrice = na
var int   tradeEntryBar   = na

if strategy.position_size > 0 and strategy.position_size[1] == 0
    tradeEntryPrice := close
    tradeEntryBar   := bar_index


if strategy.position_size == 0 and strategy.position_size[1] > 0
    exitPrice = close
    exitBar   = bar_index
    tradeColor = (exitPrice - tradeEntryPrice > 0) ? green : red

    topPrice    = math.max(tradeEntryPrice, exitPrice)
    bottomPrice = math.min(tradeEntryPrice, exitPrice)

    box.new(tradeEntryBar, topPrice, exitBar, bottomPrice, border_width=0, bgcolor=color.new(tradeColor, 85))
    line.new(tradeEntryBar, topPrice, exitBar, topPrice, color=tradeColor, width=1)
    line.new(tradeEntryBar, bottomPrice, exitBar, bottomPrice, color=tradeColor, width=1)

```

> Detail

https://www.fmz.com/strategy/483504

> Last Modified

2025-02-27 16:50:22
