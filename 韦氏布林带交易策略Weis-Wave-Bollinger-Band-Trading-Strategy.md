
> Name

韦氏布林带交易策略Weis-Wave-Bollinger-Band-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]  

本策略融合韦氏波浪指标和布林带指标,判断市场趋势方向,并在关键 SUPPORT 位进行突破交易。属于典型的趋势突破策略。

策略原理:

1. 计算韦氏波浪,通过柱状图走势判断价格趋势。

2. 计算布林带上下轨,并当价格突破轨道时进入场内。

3. 当韦氏波浪显示多头趋势,价格突破布林带上轨时做多。

4. 当韦氏波浪显示空头趋势,价格突破布林带下轨时做空。

5. 在反向趋势出现时设置止盈止损退出场内头寸。

该策略的优势:

1. 韦氏波浪指标可有效判断主要趋势方向。

2. 布林带可发现关键的 SUPPORT 阻力位。

3. 组合使用指标,可提高判断准确性。

该策略的风险:

1. 韦氏波浪和布林带均存在滞后问题,入场点位不佳。

2. 突破交易容易被套,需要止损保护。

3. 震荡行情中难以发现持续趋势和明确突破点。

总之,该策略融合韦氏波浪和布林带判断趋势方向,在关键点位进行突破交易。能在一定程度上提高准确性,但需警惕滞后及震荡市的问题。 

||

This strategy combines the Weis Wave indicator and Bollinger Bands to determine market trend, trading breakouts at key support/resistance levels. It is a typical trend-following breakout system.

Strategy Logic:

1. Calculate Weis Wave and use column trend to determine price trend.

2. Compute BB upper/lower bands, entering trades when price breaks bands.

3. Go long when Weis Wave shows bullish trend and price breaks above BB top.

4. Go short when Weis Wave shows bearish trend and price breaks below BB bottom. 

5. Use profit/loss exits when reverse trend appears.

Advantages:

1. Weis Wave accurately assesses major trend direction.

2. BB identifies key support/resistance levels. 

3. Combining indicators improves accuracy.

Risks:

1. Both Weis Wave and BB lag, causing poor entry timing.

2. Breakouts prone to traps, requiring stops.

3. Hard to find persistent trends and clear breaks in ranging markets.

In summary, this strategy combines Weis Wave and BB for trend bias and trades breakouts. It can improve accuracy somewhat but requires caution on lags and ranging price action.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Max Intraday Loss(%)|
|v_input_2|0|Renko Assignment Method: ATR|Traditional|Part of Price|
|v_input_3|14|Value|
|v_input_4|0|Price Source: Close|Open / Close|High / Low|
|v_input_5|0|Use True Range instead of Volume: Auto|Always|Never|
|v_input_6|false|Oscillating|
|v_input_7|false|Normalize|
|v_input_8|14|length|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|2|StdDev|
|v_input_11|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © sharatgbhat

//@version=4
// strategy("Weis BB Strategy", overlay=false, default_qty_type = strategy.percent_of_equity, default_qty_value = 10,max_lines_count = 500, max_labels_count = 500)
maxIdLossPcnt = input(1, "Max Intraday Loss(%)", type=input.float)
// strategy.risk.max_intraday_loss(maxIdLossPcnt, strategy.percent_of_equity)

method = input(defval="ATR", options=["ATR", "Traditional", "Part of Price"], title="Renko Assignment Method")
methodvalue = input(defval=14.0, type=input.float, minval=0, title="Value")
pricesource = input(defval="Close", options=["Close", "Open / Close", "High / Low"], title="Price Source")
useClose = pricesource == "Close"
useOpenClose = pricesource == "Open / Close" or useClose
useTrueRange = input(defval="Auto", options=["Always", "Auto", "Never"], title="Use True Range instead of Volume")
isOscillating = input(defval=false, type=input.bool, title="Oscillating")
normalize = input(defval=false, type=input.bool, title="Normalize")
vol = useTrueRange == "Always" or useTrueRange == "Auto" and na(volume) ? tr : volume
op = useClose ? close : open
hi = useOpenClose ? close >= op ? close : op : high
lo = useOpenClose ? close <= op ? close : op : low

if method == "ATR"
    methodvalue := atr(round(methodvalue))
if method == "Part of Price"
    methodvalue := close / methodvalue

currclose = float(na)
prevclose = nz(currclose[1])
prevhigh = prevclose + methodvalue
prevlow = prevclose - methodvalue
currclose := hi > prevhigh ? hi : lo < prevlow ? lo : prevclose

direction = int(na)
direction := currclose > prevclose ? 1 : currclose < prevclose ? -1 : nz(direction[1])
directionHasChanged = change(direction) != 0
directionIsUp = direction > 0
directionIsDown = direction < 0

barcount = 1
barcount := not directionHasChanged and normalize ? barcount[1] + barcount : barcount
vol := not directionHasChanged ? vol[1] + vol : vol
res = barcount > 1 ? vol / barcount : vol

plot(isOscillating and directionIsDown ? -res : res, style=plot.style_columns, color=directionIsUp ? color.green : color.red, transp=75, linewidth=3, title="Wave Volume")

length = input(14, minval=1)
src = input(close, title="Source")
mult = input(2, minval=0.001, maxval=50, title="StdDev")
basis = sma(src, length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

MomentumBull = close>upper
MomentumBear = close<lower

if (MomentumBull and directionIsUp)
	strategy.entry("Buy", strategy.long)
if (MomentumBear and directionIsDown)
	strategy.entry("Sell", strategy.short)
    strategy.exit("exit","Buy",when=directionIsDown,qty_percent=100,profit=20,loss=10)
    strategy.exit("exit","Sell",when=directionIsUp,qty_percent=100,profit=20,loss=10)
    
```

> Detail

https://www.fmz.com/strategy/426569

> Last Modified

2023-09-13 13:55:24
