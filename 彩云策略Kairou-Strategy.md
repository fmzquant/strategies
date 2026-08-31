
> Name

彩云策略Kairou-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8c1a342448c153134a.png)
## Overview   

The Kairou strategy is a quantitative trading strategy integrating multiple technical indicators including Ichimoku Cloud, MACD, Chaikin Money Flow (CMF), and True Strength Index (TSI). This strategy aims to discover medium and long-term trading opportunities in the market.  

## Strategy Logic  

The core idea of the Kairou strategy is to combine Ichimoku Cloud’s long/short signals, MACD’s long/short indicators, CMF’s capital flow indicators, and TSI’s strength index to judge the market trend, overbought and oversold areas. Ichimoku Cloud can clearly determine the trend direction and key support/resistance; MACD reflects the contrast of buying/selling power and the overbought/oversold phenomenon; CMF judges capital inflows and outflows; TSI shows the real buying and selling power of the market.

Specifically, the strategy makes judgments mainly based on the following indicators:  

1. Tenkan line crosses above Kijun line in Ichimoku Cloud indicating a bullish signal  
2. Chikou Span crossing above 0 indicating confirmation of a bullish signal
3. MACD histogram crossing above 0 showing strengthening of buying power  
4. CMF indicator > 0.1 indicating capital inflow  
5. TSI indicator > 0 showing stronger buying power than selling power

When the above 5 conditions are met at the same time, a long signal is generated; When conditions such as Tenkan line crossing below Kijun line are reversed, a short signal is generated.  

This strategy combines the long and short conditions of multiple indicators to avoid the noise caused by single indicator judgments. At the same time, by using Ichimoku Cloud to determine key support and resistance areas and combining the direction of the shadow of the lagging span to determine the direction of actual capital flow, it is possible to enter at the later stage of the trend and exit at key points before, thereby obtaining greater profits.

## Advantages Analysis  

The biggest advantage of the Kairou strategy is that it comprehensively uses multiple indicators to judge the overbought/oversold phenomena in the market and accurately determine the buying and selling points. Specific advantages:

1. **Improved signal accuracy through multiple indicator integration**. A single indicator is prone to false signals while this strategy effectively filters out noise and improves signal reliability by integrating Ichimoku Cloud, MACD, CMF, TSI and more.  

2. **Identify key support and resistance with Ichimoku Cloud**. Ichimoku Cloud clearly displays key support and resistance levels. The strategy can deploy long and short points around these areas to enter the market at later stages of the trend.

3. **Determine true capital flow using lagging span**. The lagging span shows divergence to spot false moves from arbitrage orders rather than real funds.   

4. **Display overbought/oversold with MACD**. MACD quickly displays overbought/oversold conditions. Together with Ichimoku Cloud levels it accurately determines long and short entry signals.

5. **Display capital flow with CMF**. The CMF indicator reflects movements of big players through volume changes avoiding misleading signals from arbitrage flows.  

6. **Show strength of buy/sell forces with TSI**. By removing price movement magnitudes, TSI accurately displays the real strength of buying/selling forces to spot bottom bounces and top drops.

## Risks and Optimization

Despite its advantages, the Kairou strategy also carries some risks worth noting. The main risks and optimization directions are as follows:  

1. **Parameter optimization**. Existing parameters may not be optimal. More systematic optimization methods can be used to find better parameters for more steady profits.  

2. **Lack of stop loss mechanism**. There is currently no stop loss mechanism. Significant market reversals could lead to uncontrolled losses. Reasonable trailing or limit order stop losses should be implemented.

3. **High trading frequency**. Multiple integrated indicators may generate excessively high trading frequencies. Parameter tuning should be used to reasonably control number of trades.

4. **Performance fluctuations**. Interactions between multiple indicators can lead to larger performance fluctuations in certain market conditions. Weighting methods from model combinations could be explored.   

5. **Signal divergence risks**. If indicators show contradicting signals, entry decisions become difficult. Such cases require manual review and analysis.

## Conclusion  

The Kairou strategy is a multi-indicator quantitative trading strategy. It takes full advantage of the complementary strengths of Ichimoku Cloud, MACD, CMF, TSI and more to uniquely determine entry and exit timing. There is also room for optimizations in aspects like stop loss mechanisms, parameter tuning, weight allocation etc. to significantly enhance the stability of strategy operations.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Tenkan-Sen Bars|
|v_input_2|30|Kijun-Sen Bars|
|v_input_3|52|Senkou-Span B Bars|
|v_input_4|26|Chikou-Span Offset|
|v_input_5|26|Senkou-Span Offset|
|v_input_6|true|Long Entry|
|v_input_7|true|Short Entry|
|v_input_8|12|Fast Length|
|v_input_9|26|Slow Length|
|v_input_10_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_11|9|Signal Smoothing|
|v_input_12|true|Simple MA(Oscillator)|
|v_input_13|false|Simple MA(Signal Line)|
|v_input_14|10|CMF Length|
|v_input_15|20|Long Length|
|v_input_16|20|Short Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-22 00:00:00
end: 2023-11-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("Ichimoku with MACD/ CMF/ TSI ", overlay=true)

//Inputs
ts_bars = input(10, minval=1, title="Tenkan-Sen Bars")
ks_bars = input(30, minval=1, title="Kijun-Sen Bars")
ssb_bars = input(52, minval=1, title="Senkou-Span B Bars")
cs_offset = input(26, minval=1, title="Chikou-Span Offset")
ss_offset = input(26, minval=1, title="Senkou-Span Offset")
long_entry = input(true, title="Long Entry")
short_entry = input(true, title="Short Entry")

middle(len) => avg(lowest(len), highest(len))

// Ichimoku Components
tenkan = middle(ts_bars)
kijun = middle(ks_bars)
senkouA = avg(tenkan, kijun)
senkouB = middle(ssb_bars)

// Plot Ichimoku Kinko Hyo
plot(tenkan, color=#0496ff, title="Tenkan-Sen")
plot(kijun, color=#991515, title="Kijun-Sen")
plot(close, offset=-cs_offset+1, color=#459915, title="Chikou-Span")
sa=plot(senkouA, offset=ss_offset-1, color=color.green, title="Senkou-Span A")
sb=plot(senkouB, offset=ss_offset-1, color=color.red, title="Senkou-Span B")
fill(sa, sb, color = senkouA > senkouB ? color.green : color.red, title="Cloud color")

ss_high = max(senkouA[ss_offset-1], senkouB[ss_offset-1])
ss_low = min(senkouA[ss_offset-1], senkouB[ss_offset-1])

// Entry/Exit Signals
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=hl2)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=true)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false)
// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00
// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal


tk_cross_bull = tenkan > kijun
tk_cross_bear = tenkan < kijun
cs_cross_bull = mom(close, cs_offset-1) > 0
cs_cross_bear = mom(close, cs_offset-1) < 0
price_above_kumo = close > ss_high
price_below_kumo = close < ss_low


//CMF
lengthA = input(10, minval=1, title="CMF Length")
ad = close==high and close==low or high==low ? 0 : ((2*close-low-high)/(high-low))*volume
mf = sum(ad, lengthA) / sum(volume, lengthA)


//TSI
long = input(title="Long Length", type=input.integer, defval=20)
short = input(title="Short Length", type=input.integer, defval=20)
price = close
double_smooth(src, long, short) =>
	fist_smooth = ema(src, long)
	ema(fist_smooth, short)
pc = change(price)
double_smoothed_pc = double_smooth(pc, long, short)
double_smoothed_abs_pc = double_smooth(abs(pc), long, short)
tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)



bullish = tk_cross_bull and cs_cross_bull and price_above_kumo and hist > 0 and mf > 0.1 and tsi_value > 0
bearish = tk_cross_bear and cs_cross_bear and price_below_kumo and hist < 0  and mf < -0.1 and tsi_value < 0



strategy.entry("Long", strategy.long, when=bullish and long_entry)
strategy.entry("Short", strategy.short, when=bearish and short_entry)

strategy.close("Long", when=bearish and not short_entry)
strategy.close("Short", when=bullish and not long_entry)
```

> Detail

https://www.fmz.com/strategy/432909

> Last Modified

2023-11-22 16:28:59
