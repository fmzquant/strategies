
> Name

Momentum-Trend-Following-MACD-RSI-Dual-Confirmation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/1b29cb323f9699b1bee.png)

#### Overview
This strategy is a trend-following trading system that combines MACD and RSI technical indicators. It captures price trend changes using MACD while utilizing RSI for overbought/oversold confirmation, implementing a dual-signal validation approach. The strategy employs fixed money management for position control and includes a trailing stop mechanism to protect profits.

#### Strategy Principles
The core logic of the strategy is based on several key elements:
1. The MACD signal system uses shorter periods (6,13,5), increasing sensitivity to market reactions. When the MACD line crosses above the signal line, it indicates a potential upward trend.
2. RSI serves as an auxiliary confirmation tool, with 30 set as the oversold threshold. Buy signals are only triggered when the RSI value is greater than or equal to 30, avoiding frequent trading in oversold areas.
3. Money management adopts a fixed amount strategy, investing 110 quote currency per trade, with position size calculated dynamically based on current price.
4. The trailing stop mechanism is set at 2% tracking distance, effectively locking in profits and controlling drawdown risk.

#### Strategy Advantages
1. The dual technical indicator confirmation mechanism increases the reliability of trading signals and reduces interference from false signals.
2. Using shorter MACD periods improves the strategy's sensitivity and response speed to market changes.
3. Fixed amount trading simplifies money management, facilitating risk control and profit tracking.
4. The trailing stop mechanism automatically adjusts stop-loss positions, protecting profits while allowing sufficient price movement.
5. The strategy logic is clear and simple, easy to understand and maintain, while offering good scalability.

#### Strategy Risks
1. Short MACD periods may generate excessive trading signals in oscillating markets, increasing transaction costs.
2. Setting the RSI oversold threshold at 30 might miss some important trend initiation opportunities.
3. Fixed amount trading may not fully utilize account funds, affecting overall returns.
4. The 2% trailing stop distance might be too close in highly volatile markets, leading to premature exits.
5. The strategy only supports long positions, unable to profit in downward trends.

#### Strategy Optimization Directions
1. Consider dynamically adjusting MACD parameters based on different market cycles to improve adaptability.
2. Introduce volatility indicators (such as ATR) to dynamically adjust trailing stop distance, enhancing stop-loss effectiveness.
3. Consider adding short-selling mechanisms to profit in both market directions.
4. Incorporate market volume indicators to improve signal confirmation reliability.
5. Suggest implementing dynamic position management to automatically adjust trading size based on account equity and market risk levels.

#### Summary
This is a trend-following strategy based on classic technical indicators, achieving reliable trading signal generation through the combined use of MACD and RSI. The strategy's overall design is concise and practical, with good real-world application value. Through reasonable parameter optimization and functional expansion, this strategy has the potential to achieve stable trading performance across different market environments.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-11 00:00:00
end: 2024-12-11 00:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cryptohitman09

//@version=6
strategy("MACD + RSI 交易系统 - 110 美金买入", overlay=true)

// MACD 設定
fastLength = input.int(6, title="MACD Fast Length")
slowLength = input.int(13, title="MACD Slow Length")
signalSmoothing = input.int(5, title="MACD Signal Smoothing")
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalSmoothing)

// RSI 設定
rsiLength = input.int(14, title="RSI Length")  // RSI 計算週期
rsiValue = ta.rsi(close, rsiLength)  // 計算 RSI 值
rsiThresholdHigh = input.int(70, title="RSI 超買閾值")  // RSI 超買閾值
rsiThresholdLow = input.int(30, title="RSI 超賣閾值")  // RSI 超賣閾值

// 做多信号条件：MACD 線突破信号線，且 RSI 不低於 30
buySignal = (macdLine > signalLine) and (rsiValue >= rsiThresholdLow) // 只有 RSI 大於或等於 30 時才觸發買入

// 计算每次交易的仓位（每次交易目标为 110 美金的买入金额）
tradeAmount = 20010  // 每次买入110 美金
orderSize = tradeAmount / close  // 根据当前价格计算仓位大小

// 移动止损（Trailing Stop）
enableTrailingStop = input.bool(true, title="启用移动止损")
trailingStopDistance = input.float(2, title="移动止损距离 (%)") / 89500  // 增加移动止损的距离
longTrailingStop = strategy.position_avg_price * (1 - trailingStopDistance)

// 交易逻辑：仅做多
if buySignal
    strategy.entry("买入", strategy.long, qty=orderSize)
    if enableTrailingStop
        strategy.exit("卖出", from_entry="买入", trail_price=longTrailingStop, trail_offset=trailingStopDistance * close)                                                                               

// 绘制 MACD 指标
plot(macdLine, color=color.blue, title="MACD Line")
plot(signalLine, color=color.red, title="Signal Line")

// 绘制 RSI 值
plot(rsiValue, color=color.orange, title="RSI Value")
hline(rsiThresholdHigh, "RSI 超买", color=color.red)
hline(rsiThresholdLow, "RSI 超卖", color=color.green)

// 绘制买入信号
plotshape(series=buySignal, location=location.belowbar, color=color.green, style=shape.labelup, title="买入信号", text="BUY")

// 如果触发买入信号，则发送警报
if buySignal
    alert('{"secret": "eyJhbGciOiJIUzI1NiJ9.eyJzaWduYWxzX3NvdXJjZV9pZCI6MTAwMDAyfQ.G1wLNjNyUPlTqYWsIqXSWnn_M4pRCKerBm7eTpyCiH8", "max_lag": "300", "timestamp": "{{timenow}}", "trigger_price": "{{close}}", "tv_exchange": "{{exchange}}", "tv_instrument": "{{ticker}}", "action": "{{strategy.order.action}}", "bot_uuid": "493b76f0-8a3c-4633-8b2b-90c02659dd4d", "strategy_info": {"market_position": "{{strategy.market_position}}", "market_position_size": "{{strategy.market_position_size}}", "prev_market_position": "{{strategy.prev_market_position}}", "prev_market_position_size": "{{strategy.prev_market_position_size}}"}, "order": {"amount": "{{strategy.order.contracts}}", "currency_type": "base"}}', alert.freq_once_per_bar_close)












```

> Detail

https://www.fmz.com/strategy/474870

> Last Modified

2024-12-12 16:16:54
