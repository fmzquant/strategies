
> Name

Triple-Bottom-Rebound-Momentum-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b99b8f40056301c2f6.png)

[trans]
#### 概述
本策略是一个基于技术分析的量化交易系统,主要通过识别市场中的三重探底形态和动量突破信号来进行交易。策略结合了移动平均线(MA)交叉、真实波动幅度(ATR)、价格通道等多个技术指标,构建了一个完整的交易系统。该策略通过程序化的方式,实现了对三重探底反弹形态的自动识别和交易执行。

#### 策略原理
策略的核心逻辑包含以下几个关键要素:
1. 使用快速(5周期)和慢速(20周期)移动平均线的交叉来确认市场趋势方向
2. 通过程序自动识别三个连续的低点(low1、low2、low3),形成三重探底形态
3. 利用ATR指标计算波动性,设置动态的止损和止盈水平
4. 在第三次探底后,当价格突破前一个反弹高点时,结合均线交叉信号确认做多时机
5. 建立平行通道来可视化价格运动区间,提供额外的市场参考
6. 在交易执行时设置基于ATR的动态止损和止盈条件

#### 策略优势
1. 结合多重技术指标,提高交易信号的可靠性
2. 使用ATR动态调整止损和止盈位置,适应市场波动性变化
3. 自动识别三重探底形态,减少主观判断的影响
4. 设置交易间隔限制,避免过度交易
5. 通过可视化工具(平行通道和标签)提供清晰的市场结构参考
6. 策略逻辑清晰,便于维护和优化

#### 策略风险
1. 在剧烈波动市场中可能出现虚假信号
2. 三重探底形态的识别过程可能受到市场噪音影响
3. 固定的ATR倍数可能不适应所有市场环境
4. 在趋势剧烈转换时期可能产生连续亏损
5. 交易间隔的设置可能错过部分有效信号

#### 策略优化方向
1. 引入成交量指标来确认反弹的有效性
2. 根据不同市场环境动态调整ATR倍数
3. 加入趋势强度过滤器,提高交易信号质量
4. 优化三重探底的识别算法,提高准确率
5. 引入市场波动周期分析,优化交易间隔设置
6. 考虑加入价格形态的对称性分析

#### 总结
该策略通过程序化方式实现了三重探底反弹突破交易策略,结合了多个技术指标和风险管理手段,具有较好的实用性。通过持续优化和改进,该策略有望在实际交易中取得更好的表现。建议在实盘交易前进行充分的回测验证,并根据具体市场情况调整参数设置。

|| 

#### Overview
This strategy is a quantitative trading system based on technical analysis, primarily focusing on identifying triple bottom patterns and momentum breakthrough signals in the market. The strategy combines multiple technical indicators including Moving Average (MA) crossovers, Average True Range (ATR), and price channels to build a complete trading system. Through programmatic implementation, it achieves automated identification of triple bottom rebound patterns and trade execution.

#### Strategy Principles
The core logic includes the following key elements:
1. Using fast (5-period) and slow (20-period) moving average crossovers to confirm market trend direction
2. Automatically identifying three consecutive low points (low1, low2, low3) to form a triple bottom pattern
3. Utilizing ATR indicator to calculate volatility and set dynamic stop-loss and take-profit levels
4. Confirming long entry signals when price breaks above previous rebound high after the third bottom, combined with MA crossover signals
5. Establishing parallel channels to visualize price movement ranges for additional market reference
6. Implementing ATR-based dynamic stop-loss and take-profit conditions during trade execution

#### Strategy Advantages
1. Combines multiple technical indicators to enhance signal reliability
2. Uses ATR to dynamically adjust stop-loss and take-profit levels, adapting to market volatility changes
3. Automates triple bottom pattern identification, reducing subjective judgment
4. Implements trade interval restrictions to prevent overtrading
5. Provides clear market structure reference through visualization tools (parallel channels and labels)
6. Features clear strategy logic for easy maintenance and optimization

#### Strategy Risks
1. May generate false signals in highly volatile markets
2. Triple bottom pattern identification process may be affected by market noise
3. Fixed ATR multipliers may not suit all market conditions
4. May experience consecutive losses during trend reversal periods
5. Trade interval settings might miss some valid signals

#### Strategy Optimization Directions
1. Incorporate volume indicators to confirm rebound validity
2. Dynamically adjust ATR multipliers based on different market conditions
3. Add trend strength filters to improve trading signal quality
4. Optimize triple bottom identification algorithm to increase accuracy
5. Incorporate market cycle analysis to optimize trade interval settings
6. Consider adding price pattern symmetry analysis

#### Summary
This strategy implements a triple bottom rebound breakthrough trading system programmatically, combining multiple technical indicators and risk management measures with good practicality. Through continuous optimization and improvement, the strategy shows promise for better performance in actual trading. It is recommended to conduct thorough backtesting before live trading and adjust parameters according to specific market conditions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy("反彈三次突破策略", overlay=true, initial_capital=100000, commission_value=0.001425, slippage=1)

// === 參數設定 ===
fast_length = input.int(5, title="快速均線週期")
slow_length = input.int(20, title="慢速均線週期")
atr_period = input.int(14, title="ATR 週期")
atr_factor = input.float(2.0, title="ATR 因子")
profit_factor = input.float(2.0, title="止盈因子")

// === 計算均線 ===
fast_ma = ta.ema(close, fast_length)
slow_ma = ta.ema(close, slow_length)

// === 均線交叉訊號 ===
long_signal = ta.crossover(fast_ma, slow_ma)
short_signal = ta.crossunder(fast_ma, slow_ma)

// === 計算 ATR ===
atr = ta.atr(atr_period)

// === 反彈三次突破策略 ===
var float low1 = na
var float low2 = na
var float low3 = na
var bool trend_down = false
var bool long_breakout = false
var line lower_line = na
var line upper_line = na

if (na(low1) or na(low2) or na(low3))
    // 初始化低點
    low1 := na
    low2 := na
    low3 := na

if (close < low3 or na(low3))
    // 更新低點
    low1 := low2
    low2 := low3
    low3 := close
    trend_down := true

if (trend_down and close > low2 and close > low1)
    // 確認反轉且第三次反彈比第二次高
    trend_down := false
    long_breakout := true

// 清除前一個反彈通道
if (not na(lower_line))
    line.delete(lower_line)
if (not na(upper_line))
    line.delete(upper_line)

// 繪製新的反彈通道
if (not na(low1) and not na(low3))    
    lower_line := line.new(x1=bar_index[2], y1=low1, x2=bar_index, y2=low3, color=color.yellow, width=2)
    upper_line := line.new(x1=bar_index[2], y1=low1 + (low3 - low1), x2=bar_index, y2=low3 + (low3 - low1), color=color.yellow, width=2)

// === 進出場條件 ===
var float last_long_exit = na
var float last_short_exit = na
var float stop_loss_long = na
var float take_profit_long = na
var float stop_loss_short = na
var float take_profit_short = na

var label stop_loss_label_long = na
var label take_profit_label_long = na
var label stop_loss_label_short = na
var label take_profit_label_short = na

if (long_signal or long_breakout)
    if na(last_short_exit) or (time - last_short_exit) > 2 * 60 * 60 * 1000  // 確保多頭出場後有一段時間間隔
        // 做多
        strategy.entry("做多", strategy.long)
        // 止損設置為最近低點下方
        stop_loss_long := low3 - atr_factor * atr
        take_profit_long := close + profit_factor * atr  // 設定止盈位置
        strategy.exit("止盈/止損", "做多", stop=stop_loss_long, limit=take_profit_long)
        last_long_exit := time  // 記錄多頭出場時間

        // 刪除之前的止盈止損標籤
        if (not na(stop_loss_label_long))
            label.delete(stop_loss_label_long)
        if (not na(take_profit_label_long))
            label.delete(take_profit_label_long)

        // 繪製新的止盈止損標籤
        stop_loss_label_long := label.new(x=bar_index, y=stop_loss_long, text=str.tostring(math.round(stop_loss_long * 10) / 10), color=color.red, style=label.style_label_down, textcolor=color.white, size=size.small)
        take_profit_label_long := label.new(x=bar_index, y=take_profit_long, text=str.tostring(math.round(take_profit_long * 10) / 10), color=color.green, style=label.style_label_up, textcolor=color.white, size=size.small)

if (short_signal)
    if na(last_long_exit) or (time - last_long_exit) > 2 * 60 * 60 * 1000  // 確保空頭出場後有一段時間間隔
        // 做空
        strategy.entry("做空", strategy.short)
        // 止損設置為最近高點上方
        stop_loss_short := high + atr_factor * atr
        take_profit_short := close - profit_factor * atr  // 設定止盈位置
        strategy.exit("止盈/止損", "做空", stop=stop_loss_short, limit=take_profit_short)
        last_short_exit := time  // 記錄空頭出場時間

        // 刪除之前的止盈止損標籤
        if (not na(stop_loss_label_short))
            label.delete(stop_loss_label_short)
        if (not na(take_profit_label_short))
            label.delete(take_profit_label_short)

        // 繪製新的止盈止損標籤
        stop_loss_label_short := label.new(x=bar_index, y=stop_loss_short, text=str.tostring(math.round(stop_loss_short * 10) / 10), color=color.red, style=label.style_label_down, textcolor=color.white, size=size.small)
        take_profit_label_short := label.new(x=bar_index, y=take_profit_short, text=str.tostring(math.round(take_profit_short * 10) / 10), color=color.green, style=label.style_label_up, textcolor=color.white, size=size.small)
```

> Detail

https://www.fmz.com/strategy/477961

> Last Modified

2025-01-10 15:49:30
