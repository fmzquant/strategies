
> Name

动态趋势跟踪的EMA-ADX多级止盈策略-Dynamic-Trend-Following-EMA-ADX-Multi-Level-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/208f105a565e4fc6fef.png)


#### Overview
This strategy is a trend-following trading system that combines EMA and ADX indicators with multi-level take-profit and trailing stop-loss mechanisms for optimized money management. It uses EMA for trend direction determination, ADX for trend strength filtering, and implements a three-tiered take-profit mechanism for batch profit-taking, while using ATR for dynamic stop-loss adjustment to control risk.

#### Strategy Principles
The core logic includes several key components:
1. Uses 50-period EMA to determine trend direction, entering long when price crosses above EMA and short when crossing below
2. Filters weak trends using 14-period ADX, confirming valid trends when ADX>20
3. Calculates dynamic stop-loss positions based on 14-period ATR, setting stops at low-1ATR for longs and high+1ATR for shorts
4. Implements a three-tiered take-profit mechanism:
   - First tier: 30% position closes at 1x ATR
   - Second tier: 50% position closes at 2x ATR
   - Third tier: 20% position uses 3x ATR trailing stop
5. Automatically closes all remaining positions when price reaches second-tier take-profit level

#### Strategy Advantages
1. Multi-level take-profit design secures profits while maintaining exposure to larger moves
2. Trailing stop mechanism adapts to market volatility, providing dynamic risk control
3. ADX filtering effectively avoids false signals in ranging markets
4. EMA and price crossovers provide clear entry signals
5. Batch profit-taking reduces emotional volatility, supporting long-term strategy execution

#### Strategy Risks
1. May result in frequent trading and increased costs in ranging markets
2. EMA as a lagging indicator might be slow to react in rapid reversals
3. Fixed ADX threshold may need adjustment in different market conditions
4. Multi-level take-profit might reduce position size too early in strong trends
Mitigation measures:
- Dynamically adjust ADX threshold based on market cycles
- Consider adding trend confirmation indicators
- Optimize take-profit ratio parameters more precisely

#### Strategy Optimization Directions
1. Incorporate volume indicators for enhanced trend confirmation
2. Implement dynamic ADX thresholds based on market volatility
3. Optimize position allocation ratios for take-profit levels
4. Add trend strength classification with corresponding take-profit strategies
5. Consider incorporating seasonality and market cycle factors

#### Summary
This is a well-structured trend-following strategy with clear logic, balancing returns and risks through multi-level take-profits and dynamic stop-losses. The strategy design adheres to basic quantitative trading principles, offering good scalability and optimization potential. Through appropriate parameter adjustment and optimization upgrades, this strategy has the potential to maintain stable performance across different market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-06 18:40:00
end: 2025-02-17 00:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("BTC Optimized Strategy v6", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=250)

// === 參數設定 ===
lengthEMA = input(50, title="EMA 週期")
adxLength = input(14, title="ADX 週期")
atrLength = input(14, title="ATR 週期")
riskReward = input(2.0, title="風險報酬比")
tp1_ratio = input(1.0, title="TP1 (ATR 倍數)")
tp2_ratio = input(2.0, title="TP2 (ATR 倍數)")
trailATR = input(3.0, title="移動止盈 ATR 倍數")

// === 計算技術指標 ===
ema = ta.ema(close, lengthEMA)
atr = ta.atr(atrLength)

// === 計算 ADX ===
upMove = math.max(high - nz(high[1], high), 0)
downMove = math.max(nz(low[1], low) - low, 0)
tr = math.max(math.max(high - low, math.abs(high - nz(close[1], close))), math.abs(low - nz(close[1], close)))
plusDM = upMove > downMove and upMove > 0 ? upMove : 0
minusDM = downMove > upMove and downMove > 0 ? downMove : 0
plusDI = 100 * ta.rma(plusDM, adxLength) / ta.rma(tr, adxLength)
minusDI = 100 * ta.rma(minusDM, adxLength) / ta.rma(tr, adxLength)
dx = 100 * math.abs(plusDI - minusDI) / (plusDI + minusDI)
adx = ta.rma(dx, adxLength)

// === 趨勢過濾條件 ===
isTrending = adx > 20

// === 進場條件 ===
longCondition = ta.crossover(close, ema) and isTrending
shortCondition = ta.crossunder(close, ema) and isTrending

// === 計算止損、止盈價格 ===
longStopLoss = low - atr
shortStopLoss = high + atr
longTP1 = close + tp1_ratio * atr
longTP2 = close + tp2_ratio * atr
shortTP1 = close - tp1_ratio * atr
shortTP2 = close - tp2_ratio * atr

// === 設定進場和出場 ===
if longCondition
    strategy.entry("Long", strategy.long)
    strategy.exit("Long_Exit1", from_entry="Long", qty_percent=30, limit=longTP1, stop=longStopLoss)
    strategy.exit("Long_Exit2", from_entry="Long", qty_percent=50, limit=longTP2, stop=longStopLoss)
    strategy.exit("Long_Trail", from_entry="Long", qty_percent=20, 
                 trail_points=atr * trailATR, 
                 trail_offset=atr * trailATR)

if shortCondition
    strategy.entry("Short", strategy.short)
    strategy.exit("Short_Exit1", from_entry="Short", qty_percent=30, limit=shortTP1, stop=shortStopLoss)
    strategy.exit("Short_Exit2", from_entry="Short", qty_percent=50, limit=shortTP2, stop=shortStopLoss)
    strategy.exit("Short_Trail", from_entry="Short", qty_percent=20, 
                 trail_points=atr * trailATR, 
                 trail_offset=atr * trailATR)

// === 當價格超過 TP2 後，自動平倉 ===
if close >= longTP2
    strategy.close("Long")

if close <= shortTP2
    strategy.close("Short")

// === 畫圖標示 ===
plotshape(series=longCondition, location=location.belowbar, color=color.blue, style=shape.labelup, title="買入")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, title="賣出")
plot(ema, color=color.orange, title="EMA")

```

> Detail

https://www.fmz.com/strategy/482432

> Last Modified

2025-02-18 14:08:02
