
> Name

Multi-Technical-Indicator-Dynamic-Wave-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a47a36da80c383b202.png)

#### Overview
This is a dynamic wave trading strategy based on multiple technical indicators, combining trend following and wave operation characteristics. The strategy seeks high-probability trading opportunities through the coordination of multiple technical indicators including EMA, ADX, RSI, and MACD. The system manages risk and profit through dynamic stop-loss and batch profit-taking methods.

#### Strategy Principle
The core logic of the strategy is based on the following key elements:
1. Trend Judgment: Uses EMA55 and EMA144 crossover relationships to determine market trend direction, combined with ADX indicator strength (threshold 30) for trend confirmation.
2. Entry Timing: Identifies oversold and overbought areas through RSI indicator (oversold 45, overbought 55) to judge pullback buying and rebound shorting opportunities.
3. Stop-Loss Mechanism: Adopts ATR-based dynamic stop-loss, with a stop-loss distance of 1.5 times ATR, which can adaptively adjust according to market volatility.
4. Profit Strategy: Uses 50-period high/low prices as profit targets, adopting a 50% position batch profit-taking approach.

#### Strategy Advantages
1. Multiple Indicator Verification: Improves trading signal reliability through the combined use of multiple indicators including EMA, ADX, and RSI.
2. Dynamic Risk Management: ATR-based dynamic stop-loss can adapt to different market environments, providing better risk control.
3. Progressive Profit-Taking: The batch profit-taking approach allows both securing partial profits and maintaining positions in strong trends.
4. Trend Confirmation: Inclusion of ADX indicator filtering helps avoid frequent trading in sideways markets.

#### Strategy Risks
1. False Breakout Risk: Misjudgments may occur during increased market volatility, suggesting the addition of volume confirmation.
2. Slippage Loss: Dynamic stop-loss may face significant slippage during rapid market movements.
3. Sideways Market Losses: Despite ADX filtering, consecutive small losses may still occur in oscillating markets.
4. Signal Lag: Multiple indicator combinations may lead to delayed entry signals, missing optimal position-building opportunities.

#### Strategy Optimization Directions
1. Indicator Parameter Optimization: Recommend historical backtesting optimization for parameters like EMA periods and RSI thresholds.
2. Stop-Loss Optimization: Consider adding trailing stop-loss for better profit protection.
3. Position Management: Suggest introducing a volatility-adaptive position management system.
4. Market Adaptability: Can add market environment classification to use different parameter combinations under different market conditions.

#### Summary
The strategy constructs a complete trading system through the coordination of multiple technical indicators. It emphasizes both trend capture and risk control, balancing risk and return through dynamic stop-loss and batch profit-taking methods. While there is room for optimization, it is overall a logically rigorous and practical trading strategy.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-18 00:00:00
end: 2025-02-17 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("专业级交易系统", overlay=true, max_labels_count=500)
// ===== 参数设置 =====
x1 = input.float(1.5,"atr倍数",step=0.1)
x2 = input.int(50,"k线数量",step=1)
// EMA参数
ema55_len = input.int(55, "EMA55长度")
ema144_len = input.int(144, "EMA144长度")
// ADX参数
adx_len = input.int(14, "ADX长度")
adx_threshold = input.float(30.0, "ADX趋势过滤")
// RSI参数
rsi_len = input.int(14, "RSI长度")
rsi_oversold = input.float(45.0, "RSI超卖阈值")
rsi_overbuy = input.float(55.0, "RSI超买阈值")
// MACD参数
macd_fast = input.int(12, "MACD快线")
macd_slow = input.int(26, "MACD慢线")
macd_signal = input.int(9, "MACD信号线")
// ===== 指标计算 =====
// EMA计算
ema55 = ta.ema(close, ema55_len)
ema144 = ta.ema(close, ema144_len)
// ADX计算（使用标准函数）
[di_plus, di_minus, adx] = ta.dmi(adx_len, adx_len)
// RSI计算
rsi = ta.rsi(close, rsi_len)
// MACD计算（修正参数顺序）
[macdLine, signalLine, histLine] = ta.macd(close, macd_fast, macd_slow, macd_signal)
// ===== 信号逻辑 =====
// 趋势条件：EMA55 > EMA144 且 ADX > 30
trendCondition = ema55 > ema144 and adx > adx_threshold
trendConditions = ema55 < ema144 and adx > adx_threshold
// 回调条件：RSI < 45 且 MACD柱状线 > -0.002
pullbackCondition = rsi < rsi_oversold 
pullbackConditions = rsi > rsi_overbuy 
// 综合信号
entrySignal = trendCondition and pullbackCondition
entrySignals = trendConditions and pullbackConditions

// ===== 可视化 =====
// 绘制EMA
plot(ema55, "EMA55", color=color.new(#FFA500, 0))
plot(ema144, "EMA144", color=color.new(#008000, 0))
//plotshape(series=entrySignal,title="买入信号",location=location.belowbar,color=color.new(color.green, 0),style=shape.labelup,text="BUY",textcolor=color.new(color.white, 0))
s = strategy.position_avg_price ,s1 = strategy.position_size
le = false
le := low < ema144 and low[1] > ema144 and ema55 > ema144 ? true : s1 > 0 ? false : le[1] 
se = false
se := high > ema144 and high[1] < ema144 and ema55 < ema144 ? true : s1 < 0 ? false : se[1]
if entrySignal and low < ema144 and close > ema144
    strategy.entry("l",strategy.long)
strategy.exit("止盈一半","l",limit= ta.highest(x2),qty_percent = 50)
if s1 > 0 and low < (close - x1*ta.atr(12))[1]
    strategy.close_all("动态止损")

if entrySignals and high > ema144 and close < ema144
    strategy.entry("s",strategy.short)   
strategy.exit("止盈一半","s",limit = ta.lowest(x2),qty_percent = 50)
if s1 < 0 and high > (close + x1*ta.atr(12))[1]
    strategy.close_all("动态止损")

//plotshape(series=entrySignal,title="买入信号",location=location.belowbar,color=color.new(color.green, 0),style=shape.labelup,text="BUY",textcolor=color.new(color.white, 0))
//plot(close+x1*ta.atr(12))
//plot(close-x1*ta.atr(12))
//bgcolor(le ? color.red:na)
```

> Detail

https://www.fmz.com/strategy/482499

> Last Modified

2025-02-18 17:13:58
