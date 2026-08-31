
> Name

Combined-SMA-and-Bollinger-Bands-Engulfing-Pattern-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/153e8a098bd3806f243.png)

[trans]
#### 概述
本策略是一个结合了均线(SMA)、布林带(BB)和K线形态的趋势跟踪交易系统。该策略主要通过识别吞没形态作为交易信号,并结合200日均线和布林带中轨作为趋势确认指标,使用1:2的风险收益比来控制风险。

#### 策略原理
策略的核心逻辑是通过多重技术指标的配合来确认交易信号。具体来说:
1. 使用200日均线来确定总体趋势方向
2. 使用布林带中轨作为次级趋势确认
3. 通过吞没形态寻找具体入场时机
4. 采用固定的1:2风险收益比设置止损和获利目标

当价格在200日均线和布林带中轨上方出现看涨吞没形态时,系统开立多头仓位。相应地,当价格在200日均线和布林带中轨下方出现看跌吞没形态时,系统开立空头仓位。

#### 策略优势
1. 多重技术指标的配合提高了交易信号的可靠性
2. 使用经典的趋势跟踪指标,便于理解和使用
3. 固定的风险收益比有利于长期稳定获利
4. 明确的入场和出场规则,减少主观判断
5. 结合了趋势和动量分析,提高了交易成功率

#### 策略风险
1. 在震荡市场中可能产生频繁的假信号
2. 均线和布林带都是滞后指标,可能错过一些交易机会
3. 固定的风险收益比可能不适合所有市场环境
4. 在快速波动的市场中止损位可能较宽
5. 需要较大的样本量才能体现策略优势

#### 策略优化方向
1. 可以考虑根据市场波动率动态调整风险收益比
2. 增加成交量指标作为辅助确认
3. 可以添加其他技术指标来过滤假信号
4. 考虑根据不同时间周期的信号协同来优化入场时机
5. 可以引入自适应的指标参数来提高策略适应性

#### 总结
这是一个结构完整、逻辑清晰的趋势跟踪策略。通过均线、布林带和吞没形态的组合使用,既保证了交易信号的可靠性,又提供了明确的风险控制方法。虽然存在一定的滞后性,但整体而言是一个可操作性强、风险可控的交易系统。 || 

#### Overview
This strategy is a trend-following trading system that combines Moving Average (SMA), Bollinger Bands (BB), and candlestick patterns. It primarily identifies trading signals through engulfing patterns, confirmed by the 200-day moving average and Bollinger Bands middle line, while implementing a 1:2 risk-reward ratio for risk management.

#### Strategy Principles
The core logic relies on the combination of multiple technical indicators to confirm trading signals. Specifically:
1. Uses 200-day SMA to determine the overall trend direction
2. Employs Bollinger Bands middle line as secondary trend confirmation
3. Identifies specific entry points through engulfing patterns
4. Implements a fixed 1:2 risk-reward ratio for stop-loss and take-profit levels

The system enters long positions when bullish engulfing patterns appear above both the 200-day SMA and Bollinger Bands middle line. Conversely, it enters short positions when bearish engulfing patterns form below these levels.

#### Strategy Advantages
1. Multiple technical indicators increase signal reliability
2. Uses classic trend-following indicators that are easy to understand and implement
3. Fixed risk-reward ratio promotes long-term profitable trading
4. Clear entry and exit rules minimize subjective judgment
5. Combines trend and momentum analysis for improved success rate

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. SMA and Bollinger Bands are lagging indicators, potentially missing opportunities
3. Fixed risk-reward ratio might not suit all market conditions
4. Stop-loss levels may be wide in highly volatile markets
5. Requires a large sample size to demonstrate strategy effectiveness

#### Strategy Optimization
1. Consider implementing dynamic risk-reward ratios based on market volatility
2. Add volume indicators for additional confirmation
3. Incorporate additional technical indicators to filter false signals
4. Optimize entry timing through multi-timeframe signal coordination
5. Introduce adaptive indicator parameters to improve strategy flexibility

#### Summary
This is a well-structured trend-following strategy with clear logic. The combination of moving averages, Bollinger Bands, and engulfing patterns ensures reliable trading signals while providing explicit risk management methods. Despite some inherent lag, it represents a highly operable trading system with controllable risk.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-08 00:00:00
end: 2025-02-07 00:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ardhankurniawan

//@version=5
//@version=5
strategy("Engulfing Candles Strategy with Risk-Reward 1:2 by ardhankurniawan", overlay = true)

// Menyimpan harga pembukaan dan penutupan dari candle sebelumnya dan saat ini
openBarPrevious = open[1]
closeBarPrevious = close[1]
openBarCurrent = open
closeBarCurrent = close

// Menghitung SMA 200
sma200 = ta.sma(close, 200)

// Menghitung Bollinger Bands (BB) dengan periode 14 dan standar deviasi 2
length = 14
src = close
mult = 2.0
basis = ta.sma(src, length)  // Mid Bollinger Band (SMA)
dev = mult * ta.stdev(src, length)  // Standard deviation
upperBB = basis + dev
lowerBB = basis - dev
midBB = basis  // Mid Bollinger Band adalah SMA

// Kondisi Bullish Engulfing: harga pembukaan saat ini lebih rendah dari harga penutupan sebelumnya, 
// harga pembukaan saat ini lebih rendah dari harga pembukaan sebelumnya, dan harga penutupan saat ini lebih tinggi dari harga pembukaan sebelumnya.
bullishEngulfing = (openBarCurrent <= closeBarPrevious) and (openBarCurrent < openBarPrevious) and (closeBarCurrent > openBarPrevious)

// Kondisi Bearish Engulfing: harga pembukaan saat ini lebih tinggi dari harga penutupan sebelumnya, 
// harga pembukaan saat ini lebih tinggi dari harga pembukaan sebelumnya, dan harga penutupan saat ini lebih rendah dari harga pembukaan sebelumnya.
bearishEngulfing = (openBarCurrent >= closeBarPrevious) and (openBarCurrent > openBarPrevious) and (closeBarCurrent < openBarPrevious)

// Kondisi untuk membeli (buy) hanya jika Bullish Engulfing terjadi di atas SMA 200 dan Mid Bollinger Band
buyCondition = bullishEngulfing and close > sma200 and close > midBB

// Kondisi untuk menjual (sell) hanya jika Bearish Engulfing terjadi di bawah SMA 200 dan Mid Bollinger Band
sellCondition = bearishEngulfing and close < sma200 and close < midBB

// Menghitung Stop Loss dan Take Profit dengan Risk-Reward Ratio 1:2
longSL = low  // SL di low candle bullish engulfing (prev low)
longRR = (close - low) * 2  // TP dengan Risk-Reward 1:2
longTP = close + longRR  // TP untuk posisi long

shortSL = high  // SL di high candle bearish engulfing (prev high)
shortRR = (high - close) * 2  // TP dengan Risk-Reward 1:2
shortTP = close - shortRR  // TP untuk posisi short

// Strategi Buy ketika kondisi beli terpenuhi dengan SL dan TP
if buyCondition
    strategy.entry("Buy", strategy.long)  // Perintah beli ketika Bullish Engulfing terjadi di atas SMA 200 dan Mid Bollinger Band
    strategy.exit("Sell Exit", from_entry = "Buy", stop = longSL, limit = longTP)  // SL dan TP untuk posisi long

// Strategi Sell ketika kondisi jual terpenuhi dengan SL dan TP
if sellCondition
    strategy.entry("Sell", strategy.short)  // Perintah jual ketika Bearish Engulfing terjadi di bawah SMA 200 dan Mid Bollinger Band
    strategy.exit("Buy Exit", from_entry = "Sell", stop = shortSL, limit = shortTP)  // SL dan TP untuk posisi short

// Menambahkan kondisi untuk keluar dari posisi
if sellCondition
    strategy.close("Buy")  // Menutup posisi beli jika Bearish Engulfing terjadi di bawah SMA 200 dan Mid Bollinger Band
if buyCondition
    strategy.close("Sell")  // Menutup posisi jual jika Bullish Engulfing terjadi di atas SMA 200 dan Mid Bollinger Band

// Plotting SMA 200 dan Bollinger Bands
plot(sma200, color = color.blue, linewidth = 2, title = "SMA 200")
plot(upperBB, color = color.green, linewidth = 1, title = "Upper BB")
plot(lowerBB, color = color.red, linewidth = 1, title = "Lower BB")
plot(midBB, color = color.orange, linewidth = 2, title = "Mid BB")

// Alert condition
alertcondition(buyCondition, title = "Bullish Engulfing Above SMA 200 and Mid BB", message = "[CurrencyPair] [TimeFrame], Bullish Engulfing above SMA 200 and Mid Bollinger Band")
alertcondition(sellCondition, title = "Bearish Engulfing Below SMA 200 and Mid BB", message = "[CurrencyPair] [TimeFrame], Bearish Engulfing below SMA 200 and Mid Bollinger Band")

```

> Detail

https://www.fmz.com/strategy/481100

> Last Modified

2025-02-08 15:06:49
