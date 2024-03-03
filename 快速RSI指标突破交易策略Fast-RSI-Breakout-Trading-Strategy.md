
> Name

快速RSI指标突破交易策略Fast-RSI-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略运用快速RSI指标识别超买超卖现象,进行反转交易。该策略同时结合K线实体大小滤波,避免被卡住。策略追求快速判断超买超卖现象,及时捕捉反转机会。

策略原理:

1. 计算快速RSI指标值,设置超买超卖阈值。

2. 计算K线实体大小的EMA均值,判断实体大小。

3. RSI上穿超买线且实体大于均值一半时做多。RSI下穿超卖线且实体大于均值一半时做空。

4. RSI回穿原阈值线且实体大于均值时平仓。

5. 还可结合最小值最大值进行额外验证。

该策略的优势:

1. 快速RSI判断超买超卖迅速,避免滞后。

2. 实体大小滤波可跳过不明显的K线。

3. 最小值最大值验证可提高信号质量。

该策略的风险:

1. 实体大小滤波可能过滤掉部分有效信号。

2. RSI对震荡行情中可能出现假信号。

3. 需严格资金管理,应对反转交易的风险。

总之,该策略利用快速RSI与K线实体大小指标进行组合交易,在快速判断超买超卖的同时进行风险控制,可获得较佳效果。但需警惕过滤的问题,同时部署好资金管理手段。

||

This strategy trades RSI extremes using the fast RSI indicator and filters entries based on candle body size to avoid whipsaws. It aims for quick identification of overbought/oversold levels to capture reversals swiftly.

Strategy Logic:

1. Calculate fast RSI and set overbought/oversold thresholds.

2. Calculate EMA of candle body size for body filtering.

3. Go long when RSI crosses above overbought line and body over half of EMA. Vice versa for short.

4. Exit when RSI crosses back below original threshold and body over EMA.

5. Min/max can provide additional signal verification.

Advantages:

1. Fast RSI speeds up signal generation avoiding lag. 

2. Body size filters reduce insignificant candle noise.

3. Min/max improves signal quality.

Risks:

1. Body filtering may skip some valid signals. 

2. Whipsaws still possible for RSI in ranging markets.

3. Strict risk management required for reversal trades.

In summary, this strategy combines fast RSI and body size filtering for quicker but more robust overbought/oversold detection. But over-filtering issues remain so prudent risk controls are still needed.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|7|RSI Period|
|v_input_4|30|RSI limit|
|v_input_5_close|0|RSI Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|true|RSI Bars|
|v_input_7|false|Use Min/Max|
|v_input_8|false|Show Arrows|
|v_input_9|2018|From Year|
|v_input_10|2100|To Year|
|v_input_11|true|From Month|
|v_input_12|12|To Month|
|v_input_13|true|From day|
|v_input_14|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-11 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Noro's Fast RSI Strategy v1.3", shorttitle = "Fast RSI str 1.3", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 50, title = "RSI Period")
limit = input(30, defval = 30, minval = 1, maxval = 100, title = "RSI limit")
rsisrc = input(close, defval = close, title = "RSI Price")
rb = input(1, defval = 1, minval = 1, maxval = 5, title = "RSI Bars")
usemm = input(false, defval = false, title = "Use Min/Max")
showarr = input(false, defval = false, title = "Show Arrows")
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast RSI
fastup = rma(max(change(rsisrc), 0), rsiperiod)
fastdown = rma(-min(change(rsisrc), 0), rsiperiod)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Limits
bar = close > open ? 1 : close < open ? -1 : 0
uplimit = 100 - limit
dnlimit = limit

//RSI Bars
ur = fastrsi > uplimit
dr = fastrsi < dnlimit
uprsi = rb == 1 and ur ? 1 : rb == 2 and ur and ur[1] ? 1 : rb == 3 and ur and ur[1] and ur[2] ? 1 : rb == 4 and ur and ur[1] and ur[2] and ur[3] ? 1 : rb == 5 and ur and ur[1] and ur[2] and ur[3] and ur[4] ? 1 : 0
dnrsi = rb == 1 and dr ? 1 : rb == 2 and dr and dr[1] ? 1 : rb == 3 and dr and dr[1] and dr[2] ? 1 : rb == 4 and dr and dr[1] and dr[2] and dr[3] ? 1 : rb == 5 and dr and dr[1] and dr[2] and dr[3] and dr[4] ? 1 : 0

//Body
body = abs(close - open)
emabody = ema(body, 30)

//MinMax
min = min(close, open)
max = max(close, open)

//Signals
up1 = bar == -1 and (strategy.position_size == 0 or close < strategy.position_avg_price) and dnrsi and body > emabody / 4
dn1 = bar == 1 and (strategy.position_size == 0 or close > strategy.position_avg_price) and uprsi and body > emabody / 4
up2 = min < min[1] and bar == -1 and bar[1] == -1 and usemm
dn2 = max > max[1] and bar == 1 and bar[1] == 1 and usemm
exit = ((strategy.position_size > 0 and fastrsi > dnlimit and bar == 1) or (strategy.position_size < 0 and fastrsi < uplimit and bar == -1)) and body > emabody / 2

//Arrows
col = exit ? black : up1 or dn1 ? blue : up2 or dn2 ? red : na
needup = up1 or (up2 and usemm)
needdn = dn1 or (dn2 and usemm)
needexitup = exit and strategy.position_size < 0
needexitdn = exit and strategy.position_size > 0
plotarrow(showarr and needup ? 1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needdn ? -1 : na, colorup = blue, colordown = blue, transp = 0)
plotarrow(showarr and needexitup ? 1 : na, colorup = black, colordown = black, transp = 0)
plotarrow(showarr and needexitdn ? -1 : na, colorup = black, colordown = black, transp = 0)

//Trading
if up1 or up2
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))

if dn1 or dn2
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
    
if time > timestamp(toyear, tomonth, today, 00, 00) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/426509

> Last Modified

2023-09-12 16:34:21
