
> Name

基于自适应移动平均线的趋势跟踪策略Trend-Following-Strategy-Based-on-Adaptive-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a818fb74de2803e068.png)
 [trans]
### 概述

本策略运用Kaufman自适应移动平均线(KAMA)指标设计了一个趋势跟踪交易系统。该系统可以在趋势形成时快速跟踪趋势,在震荡行情中过滤噪音。同时,系统还集成了抛物线转向系统(PSAR)和平均真实波动率追踪止损(ATR Trailing Stop)作为止损机制,具有较强的风险控制能力。

### 策略原理

- KAMA指标的长度是根据最近一段时间的市场波动率动态调整的。当价格变化大于最近噪音时,EMA窗口变短;当价格变化小于最近噪音时,EMA窗口变长。这使得KAMA可以快速跟踪趋势,而在震荡行情中过滤噪音。

- 系统主要根据最快的KAMA(KAMA 1)判断趋势方向。KAMA 1向上时做多,向下时做空。为过滤假突破,设定了KAMA过滤器。只有当KAMA 1的变化超过近期波动一个标准差时,才产生交易信号。

- 止损方面,系统提供三种可选的止损方式:基于KAMA反转、PSAR反转、ATR移动止损。投资者可以个性化选择一种或多种组合使用。

### 优势分析

- KAMA指标的独特设计使得系统可以快速捕捉新生趋势,在震荡行情中停止交易,有效控制交易频率,减少不必要的滑点和手续费损耗。

- 系统内置多种止损机制。投资者可以根据个人风险偏好,选择恰当的止损方案,有力控制单笔损失。

- 系统完全基于指标和止损线,避免常见的移位交易误入场问题。

- 多参数设定和条件组合为系统定制化提供了极大空间。用户可以因地制宜,针对不同品种和周期进行优化。

### 风险分析

- 系统没有考虑系统性风险,在极端行情中无法有效控制损失。

- 系统PARAMETERS可能需要根据不同品种不同周期进行调整,否则会产生过于激进或过于保守的结果。

- 如果仅依赖KAMA指标作为止损,在震荡行情中容易被套牢。这需要与PSAR或ATR移动止损进行组合使用才能解决。

### 优化方向

- 添加趋势过滤指标,如ADX或隐波动率指标,避免在震荡和趋势转换阶段产生错误信号。

- 针对单个品种和固定周期进行PARAMETERS优化和回测,提高稳定性。优化维度包括KAMA参数组合、止损参数等。

- 尝试MACHINE LEARNING模型代替参数优化。利用大量历史数据训练判断买卖时机和止损的神经网络或决策树模型。

- 尝试将策略移植到其它品种,如数字货币。这可能需要调整PARAMETERS或加入其他辅助指标。

### 总结

本策略集成了KAMA趋势判断和多种止损手段,能够有效跟踪趋势方向,并控制风险。KAMA指标的独特性使策略可以快速判断新生趋势方向,避免假突破问题。可定制和可优化的PARAMETERS为用户提供了极大空间进行个性化调整。如果针对单一品种单一周期进行PARAMETERS优化和MACHINE LEARNING模型集成,有望进一步提高策略表现。

||

### Overview  

This strategy employs the Kaufman Adaptive Moving Average (KAMA) indicator to design a trend following trading system. It can track trends quickly when they form and filter out noise during choppy markets. At the same time, the system also integrates Parabolic SAR (PSAR) and Average True Range Trailing Stop as stop loss mechanisms with strong risk control capabilities.

### Strategy Logic  

- The length of the KAMA indicator is dynamically adjusted based on recent market volatility. When price changes are greater than recent noise, the EMA window becomes shorter. When price changes are smaller than recent noise, the EMA window becomes longer. This allows KAMA to quickly track trends while filtering out noise during choppy markets.
  
- The system mainly judges the trend direction based on the fastest KAMA (KAMA 1). It goes long when KAMA 1 points up and goes short when KAMA 1 points down. To filter out false breaks, a KAMA filter is set. Trading signals are only generated when the change in KAMA 1 exceeds one standard deviation of recent fluctuations.  

- For stop loss, the system provides three optional stop loss methods: KAMA reversal, PSAR reversal, and ATR trailing stop. Investors can choose one or a combination to use.  

### Advantage Analysis

- The unique design of the KAMA indicator allows the system to quickly capture emerging trends, stop trading during choppy markets, effectively control trading frequency, and reduce unnecessary slippage and commission costs.

- The system has multiple built-in stop loss mechanisms. Investors can choose the appropriate stop loss scheme according to their personal risk preferences to effectively control single loss.  

- The system is entirely based on indicators and stop loss lines, avoiding common mis-entry problems caused by shifting transactions.  

- Multiple parameter settings and condition combinations provide great space for system customization. Users can optimize according to different products and frequencies.  

### Risk Analysis  

- The system does not consider systemic risks and cannot effectively control losses in extreme market conditions.  

- The system PARAMETERS may need to be adjusted according to different products and frequencies, otherwise it will produce overly aggressive or overly conservative results.  

- If relying solely on the KAMA indicator for stop loss, it is easy to get caught in whipsaws during choppy markets. This needs to be combined with PSAR or ATR trailing stop to solve.

### Optimization Directions  

- Add trend filtering indicators such as ADX or implied volatility to avoid generating wrong signals during choppy and trend transition stages.  

- Optimize and backtest PARAMETERS for individual products and fixed frequencies to improve stability. Optimization dimensions include KAMA parameter combinations, stop loss parameters, etc.  

- Try MACHINE LEARNING models instead of parameter optimization. Train neural networks or decision tree models with lots of historical data to judge entry and exit timing and stop loss.  

- Try migrating the strategy to other products such as cryptocurrencies. This may require adjusting PARAMETERS or adding other auxiliary indicators.  

### Summary  

This strategy integrates KAMA for trend judgment and multiple stop loss methods to effectively track trend directions and control risks. The uniqueness of the KAMA indicator allows the strategy to quickly determine the direction of emerging trends and avoid false breakout problems. Customizable and optimizable PARAMETERS provide users with great space for personalized adjustment. By optimizing PARAMETERS and integrating MACHINE LEARNING models for individual products and frequencies, the performance of the strategy can be further improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|KAMA 1 Stop Loss|
|v_input_3|false|ATR Trailing Stop Loss|
|v_input_4|false|PSAR Stop Loss|
|v_input_5|14|KAMA 1: Length|
|v_input_6|2|KAMA 1: Fast KAMA Length|
|v_input_7|20|KAMA 1: Slow KAMA Length|
|v_input_8|15|KAMA 2: Length 2|
|v_input_9|3|KAMA 2: Fast KAMA Length|
|v_input_10|22|KAMA 2: Slow KAMA Length|
|v_input_11|16|KAMA 3: Length 3|
|v_input_12|4|KAMA 3: Fast KAMA Length|
|v_input_13|24|KAMA 3: Slow KAMA Length|
|v_input_14|17|KAMA 4: Length|
|v_input_15|5|KAMA 4: Fast KAMA Length|
|v_input_16|26|KAMA 4: Slow KAMA Length|
|v_input_17|18|KAMA 5: Length|
|v_input_18|6|KAMA 5: Fast KAMA Length|
|v_input_19|28|KAMA 5: Slow KAMA Length|
|v_input_20|19|KAMA 6: Length|
|v_input_21|7|KAMA 6: Fast KAMA Length|
|v_input_22|30|KAMA 6: Slow KAMA Length|
|v_input_23|20|KAMA 7: Length|
|v_input_24|8|KAMA 7: Fast KAMA Length|
|v_input_25|32|KAMA 7: Slow KAMA Length|
|v_input_26|21|KAMA 8: Length|
|v_input_27|9|KAMA 8: Fast KAMA Length|
|v_input_28|34|KAMA 8: Slow KAMA Length|
|v_input_29|true|KAMA Entry Filter|
|v_input_30|0.5|KAMA Exit Filter|
|v_input_31|14|Trailing ATR Lookback Period|
|v_input_32|3|Trailing ATR Multiplier|
|v_input_33|0|Trail Mode: Trailing|Running|
|v_input_34|0|Trigger Trailing Stop On: Wick|Close|
|v_input_35|0.02|PSAR Start|
|v_input_36|0.02|PSAR Increment|
|v_input_37|0.2|PSAR Max Value|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BenHampson
// @version=4
// Credit to:
// - ChuckBanger for much of the KAMA code
// - cheatcountry for the KAMA Filter code
// - millerrh for much of the ATR Stop code
// - racer8 for much of the Position Sizing code

// I have combined aspects of their work and built upon it to form a strategy I like. 
// The KAMA, with its filter, is used for entry.
// An ATR trailing stop loss, PSAR, and the KAMA can all optionally be used as exits, or you can use a combination of the three.

strategy(title="KAMA Strategy - Kaufman's Adaptive Moving Average", shorttitle="KAMA Strategy", overlay=true)

src = input(title="Source", type=input.source, defval=close)

// Exits
KAMA1SL = input(title = 'KAMA 1 Stop Loss', type = input.bool, defval = true)
ATRTSL = input(title = 'ATR Trailing Stop Loss', type = input.bool, defval = false)
PSARSL = input(title = 'PSAR Stop Loss', type = input.bool, defval = false)

// KAMA 1 (Fastest)
length1 = input(title="KAMA 1: Length", type=input.integer, defval=14)
fastLength1 = input(title="KAMA 1: Fast KAMA Length", type=input.integer, defval=2)
slowLength1 = input(title="KAMA 1: Slow KAMA Length", type=input.integer, defval=20)

length2 = input(title="KAMA 2: Length 2", type=input.integer, defval=15)
fastLength2 = input(title="KAMA 2: Fast KAMA Length", type=input.integer, defval=3)
slowLength2 = input(title="KAMA 2: Slow KAMA Length", type=input.integer, defval=22)

length3 = input(title="KAMA 3: Length 3", type=input.integer, defval=16)
fastLength3 = input(title="KAMA 3: Fast KAMA Length", type=input.integer, defval=4)
slowLength3 = input(title="KAMA 3: Slow KAMA Length", type=input.integer, defval=24)

length4 = input(title="KAMA 4: Length", type=input.integer, defval=17)
fastLength4 = input(title="KAMA 4: Fast KAMA Length", type=input.integer, defval=5)
slowLength4 = input(title="KAMA 4: Slow KAMA Length", type=input.integer, defval=26)

// KAMA 5 (Medium)
length5 = input(title="KAMA 5: Length", type=input.integer, defval=18)
fastLength5 = input(title="KAMA 5: Fast KAMA Length", type=input.integer, defval=6)
slowLength5 = input(title="KAMA 5: Slow KAMA Length", type=input.integer, defval=28)

length6 = input(title="KAMA 6: Length", type=input.integer, defval=19)
fastLength6 = input(title="KAMA 6: Fast KAMA Length", type=input.integer, defval=7)
slowLength6 = input(title="KAMA 6: Slow KAMA Length", type=input.integer, defval=30)

length7 = input(title="KAMA 7: Length", type=input.integer, defval=20)
fastLength7 = input(title="KAMA 7: Fast KAMA Length", type=input.integer, defval=8)
slowLength7 = input(title="KAMA 7: Slow KAMA Length", type=input.integer, defval=32)

// KAMA 8 (Slowest)
length8 = input(title="KAMA 8: Length", type=input.integer, defval=21)
fastLength8 = input(title="KAMA 8: Fast KAMA Length", type=input.integer, defval=9)
slowLength8 = input(title="KAMA 8: Slow KAMA Length", type=input.integer, defval=34)

// Kaufman's Adaptive Moving Average
getKAMA(src, length1, fastLength1, slowLength1) =>
    mom = abs(change(src, length1))
    volatility = sum(abs(change(src)), length1)
    
    // Efficiency Ratio
    er = volatility != 0 ? mom / volatility : 0
    
    fastAlpha = 2 / (fastLength1 + 1)
    slowAlpha = 2 / (slowLength1 + 1)
    
    // KAMA Alpha
    sc = pow((er * (fastAlpha - slowAlpha)) + slowAlpha, 2)
    
    kama = 0.0
    kama := sc * src + (1 - sc) * nz(kama[1])
    kama

kama1 = getKAMA(src, length1, fastLength1, slowLength1)
kama2 = getKAMA(src, length2, fastLength2, slowLength2)
kama3 = getKAMA(src, length3, fastLength3, slowLength3)
kama4 = getKAMA(src, length4, fastLength4, slowLength4)
kama5 = getKAMA(src, length5, fastLength5, slowLength5)
kama6 = getKAMA(src, length6, fastLength6, slowLength6)
kama7 = getKAMA(src, length7, fastLength7, slowLength7)
kama8 = getKAMA(src, length8, fastLength8, slowLength8)

//If the kama1 has increased...
kama1delta = kama1[0] - kama1[1]
kama3delta = kama3[0] - kama3[1]
kama8delta = kama8[0] - kama8[1]

// KAMA Plots
plot(kama1, title="KAMA 1", color=#e91e63, display=display.all, linewidth=2)
plot(kama2, title="KAMA 2", color=color.red, display=display.all)
plot(kama3, title="KAMA 3", color=color.red, display=display.all)
plot(kama4, title="KAMA 4", color=color.orange, display=display.all)
plot(kama5, title="KAMA 5", color=color.orange, display=display.all)
plot(kama6, title="KAMA 6", color=color.yellow, display=display.all)
plot(kama7, title="KAMA 7", color=color.yellow, display=display.all)
plot(kama8, title="KAMA 8", color=color.white, display=display.all)



//========================================= KAMA FILTER ===========================================

// Copyright (c) 2019-present, Franklin Moormann (cheatcountry)
// Moving Average Adaptive Filter [CC] script may be freely distributed under the MIT license.

entryFilter = input(title="KAMA Entry Filter", type=input.float, defval=1, minval=0.01)
exitFilter = input(title="KAMA Exit Filter", type=input.float, defval=0.5, minval=0.01)

entryMAAF = entryFilter * stdev(kama1delta, length1)
exitMAAF = exitFilter * stdev(kama1delta, length1)
srcEma = ema(src, length1)



//========================================= TRAILING ATR STOP ====================================

// The following is an adaptation of Trailing ATR Stops by @millerrh
// He based it on scripts by @garethyeo & @SimpleCryptoLife

// Inputs

atrLookback = input(defval=14,title="Trailing ATR Lookback Period",type=input.integer)
multiplier = input(defval=3,title="Trailing ATR Multiplier",type=input.float, step=0.1, minval=0.5, maxval=4)
trailMode = input(title="Trail Mode", defval="Trailing", options=["Running", "Trailing"])
trigInput = input(title="Trigger Trailing Stop On", defval="Wick", options=["Close","Wick"]) 

// Calculate ATR
atrValue = atr(atrLookback)
atrMultiplied = atrValue * multiplier

// Plot the price minus the ATR
atrLow = low - atrMultiplied

// Calculate the low trailing ATRs every time. The trailing stop loss never goes down.
// Set them to something to start with
trailAtrLow = atrLow

// If the ATR Low has gone up AND it has gone above the trail, the low trailing ATR should also go up. If the ATR Low has gone up or down, but not below the trail, the ATR trail stays where it is
trailAtrLow := na(trailAtrLow[1]) ? trailAtrLow : atrLow >= trailAtrLow[1] ? atrLow : trailAtrLow[1]

// Trigger stop based on candle close or low
trigSupport = trigInput == "Close" ? close : trigInput == "Wick" ? low : na

// Determine if price is below support
supportHit = trigSupport <= trailAtrLow

// If price is below support, reset the trailing ATR
trailAtrLow := supportHit ? atrLow : trailAtrLow

// Plot Lines
plotLow = ATRTSL ? trailAtrLow : na
plot(plotLow, title="ATR Low", color=color.white, transp=50, style=plot.style_linebr, linewidth=1, display=display.all)



//====================================== PSAR STOP ==========================================

start = input(0.02, "PSAR Start")
increment = input(0.02, "PSAR Increment")
maximum = input(0.2, "PSAR Max Value")
psar = sar(start, increment, maximum)
psarPlot  = PSARSL ? psar : na
plot(psarPlot, "Parabolic SAR", style=plot.style_cross, color=#3A6CA8, display=display.all)



//========================================= ENTRY & EXITS =====================================================

// Entry
long = kama1delta > 0 and kama1delta > entryMAAF
strategy.entry("Buy", true, when = long) 

// Close
longClose = (PSARSL ? crossunder(close, psar) : na) or (KAMA1SL ? kama1delta < 0 and abs(kama1delta) > exitMAAF : na) or (ATRTSL ? supportHit : na)
strategy.close("Buy", when = longClose, comment = "Sell")
```

> Detail

https://www.fmz.com/strategy/440444

> Last Modified

2024-01-30 16:30:20
