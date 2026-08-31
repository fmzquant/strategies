
> Name

Enhanced-Price-Volume-Trend-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e02be2412bcfe8378d.png)

[trans]
#### 概述
该策略是一个基于MACD指标和量价关系的交易系统,通过观察MACD柱状图的形态变化来判断市场趋势转折点。策略采用了动态的止盈止损机制,通过ATR指标来自适应市场波动,有效控制风险。

#### 策略原理
策略的核心逻辑建立在MACD指标的深浅柱状变化上,结合EMA和SMA双重均线系统。当MACD柱状图从深色转为浅色时,表明动量发生转变,系统会在此时进行交易。具体来说:
1. 使用快速(12)和慢速(26)均线计算MACD值
2. 通过9周期的信号线平滑MACD
3. 观察MACD柱状图的颜色深浅变化
4. 结合14周期ATR指标设置动态止盈止损

#### 策略优势
1. 指标组合科学合理,MACD能够有效捕捉趋势,ATR可以适应波动
2. 止盈止损设置灵活,通过倍数参数可以根据不同市场特点进行调整
3. 交易信号明确,通过柱状图颜色变化直观判断入场时机
4. 兼顾多空双向交易,增加了策略的适用性和盈利机会

#### 策略风险
1. MACD作为滞后指标可能错过快速行情的最佳入场点
2. 在震荡市场中可能产生虚假信号,导致频繁交易
3. ATR倍数设置不当可能导致止损过松或过紧
4. 需要合理设置资金管理,避免单笔损失过大

#### 策略优化方向
1. 引入成交量确认信号,提高信号的可靠性
2. 增加趋势过滤器,减少震荡市场中的虚假信号
3. 优化止盈止损倍数,可以根据不同时间周期动态调整
4. 加入波动率过滤,在剧烈波动时期降低交易频率
5. 考虑引入时间过滤,避免在不利时段交易

#### 总结
这是一个结合了技术分析经典指标MACD和现代风险控制方法的综合策略。通过观察MACD柱状图的形态变化来捕捉市场动量的转变,并使用ATR进行动态风险控制。策略设计合理,操作逻辑清晰,具有较好的实用价值。通过持续优化和完善,该策略有望在实战中取得更好的表现。 ||

#### Overview
This strategy is a trading system based on MACD indicator and price-volume relationship, which identifies market trend reversal points by observing changes in MACD histogram patterns. The strategy employs a dynamic profit-taking and stop-loss mechanism using the ATR indicator to adapt to market volatility and effectively control risk.

#### Strategy Principle
The core logic of the strategy is built on the color changes of MACD histogram, combined with dual EMA and SMA moving average systems. When the MACD histogram transitions from dark to light color, it indicates a momentum shift, triggering the system to execute trades. Specifically:
1. Calculate MACD values using fast(12) and slow(26) moving averages
2. Smooth MACD with a 9-period signal line
3. Monitor color depth changes in MACD histogram
4. Set dynamic profit targets and stop losses using 14-period ATR

#### Strategy Advantages
1. Scientific combination of indicators, with MACD effectively capturing trends and ATR adapting to volatility
2. Flexible profit-taking and stop-loss settings adjustable through multiplier parameters for different market characteristics
3. Clear trading signals with intuitive entry timing based on histogram color changes
4. Accommodates both long and short trading, increasing strategy versatility and profit opportunities

#### Strategy Risks
1. MACD as a lagging indicator may miss optimal entry points in rapid market movements
2. May generate false signals in ranging markets, leading to frequent trading
3. Improper ATR multiplier settings can result in stops being too loose or too tight
4. Requires proper money management to avoid excessive single-trade losses

#### Strategy Optimization Directions
1. Incorporate volume confirmation signals to improve signal reliability
2. Add trend filters to reduce false signals in ranging markets
3. Optimize profit-taking and stop-loss multipliers with dynamic adjustment based on different timeframes
4. Include volatility filtering to reduce trading frequency during highly volatile periods
5. Consider implementing time filters to avoid trading during unfavorable periods

#### Summary
This is a comprehensive strategy combining classic technical analysis indicator MACD with modern risk control methods. It captures market momentum shifts by observing MACD histogram pattern changes while using ATR for dynamic risk control. The strategy is well-designed with clear operational logic and practical value. Through continuous optimization and improvement, this strategy shows promise for better performance in real trading conditions.[/trans]



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
strategy(title="軒割MACD 空心量能不足策略", shorttitle="軒割MACD 空心量能不足策略", overlay=true)

//=== 1) 參數 ===//
fast_length   = input.int(title="Fast Length",        defval=12)
slow_length   = input.int(title="Slow Length",        defval=26)
src           = input.source(title="MACD Source",     defval=close)
signal_length = input.int(title="Signal Smoothing",   defval=9,  minval=1, maxval=50)
sma_source    = input.string(title="Oscillator MA Type", defval="EMA", options=["SMA","EMA"])
sma_signal    = input.string(title="Signal MA Type",     defval="EMA", options=["SMA","EMA"])

// 啟用多單 / 空單
useLong       = input.bool(title="啟用多單？(底部紅色)", defval=true)
useShort      = input.bool(title="啟用空單？(頂部綠色)", defval=true)

// 止盈倍數 (1~10倍 ATR)
tpATRmult     = input.int(title="止盈 ATR 倍數 (1~10)", defval=10, minval=1, maxval=500)
// 止損倍數 (1~10倍 ATR)
slATRmult     = input.int(title="止損 ATR 倍數 (1~10)", defval=3, minval=1, maxval=500)

//=== 2) MACD 計算 ===//
fast_ma  = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma  = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd     = fast_ma - slow_ma
signal   = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist     = macd - signal

//=== 3) 判斷深色/淺色（用於變化訊號）===//
darkGreen  = hist >= 0 and hist <= hist[1]   // 上方，柱子縮小或持平
lightGreen = hist >= 0 and hist >  hist[1]   // 上方，柱子變大
darkRed    = hist <  0 and hist <= hist[1]   // 下方，柱子(絕對值)變大或持平
lightRed   = hist <  0 and hist >  hist[1]   // 下方，柱子(絕對值)變小

// 由「深 → 淺」是否發生在上一根
colorChangeToLightGreen = darkGreen[1] and lightGreen
colorChangeToLightRed   = darkRed[1]   and lightRed

//=== 4) ATR 計算 (用於止盈止損) ===//
atrPeriod  = 14
atrValue   = ta.atr(atrPeriod)

//=== 5) 多單策略：深紅 → 淺紅 (底部紅色) ===//
if useLong and colorChangeToLightRed
    // 以當前 K 線 low - ATR倍數 作為多單止損
    longStopLoss   = low - (slATRmult * atrValue)
    // 以當前 close + ATR倍數 作為多單止盈
    longTakeProfit = close + (tpATRmult * atrValue)

    // 進多單
    strategy.entry("Long Entry", strategy.long, comment="多", qty=1)
    strategy.exit("平多", "Long Entry", stop=longStopLoss, limit=longTakeProfit)

//=== 6) 空單策略：深綠 → 淺綠 (頂部綠色) ===//
if useShort and colorChangeToLightGreen
    // 以當前 K 線 high + ATR倍數 作為空單止損
    shortStopLoss   = high + (slATRmult * atrValue)
    // 以當前 close - ATR倍數 作為空單止盈
    shortTakeProfit = close - (tpATRmult * atrValue)

    // 進空單
    strategy.entry("Short Entry", strategy.short, comment="空", qty=1)
    strategy.exit("平空", "Short Entry", stop=shortStopLoss, limit=shortTakeProfit)

//=== 7) 繪製 MACD 與直方圖 ===//
hline(0, "Zero Line", color=color.new(#787B86, 50))

// 長條圖顏色：
//   - 上方 (hist >= 0) 時：hist 比前一根大 (淺綠) 或小 (深綠)
//   - 下方 (hist < 0)  時：hist 比前一根大 (淺紅) 或小 (深紅)
plot(hist,title="Histogram",style=plot.style_columns,color = hist >= 0? (hist > hist[1]  ? #26A69A : #B2DFDB)   : (hist > hist[1]  ? #FFCDD2 : #FF5252)  )

// 繪製 MACD 與 Signal
plot(macd,   title="MACD",   color=#2962FF)
plot(signal, title="Signal", color=#FF6D00)

```

> Detail

https://www.fmz.com/strategy/477956

> Last Modified

2025-01-10 15:40:37
