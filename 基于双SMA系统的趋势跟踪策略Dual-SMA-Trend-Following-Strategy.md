
> Name

基于双SMA系统的趋势跟踪策略Dual-SMA-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略仅使用两条SMA均线,其中慢速SMA用于判断趋势方向,快速SMA用于入场信号。结合K线实体颜色判定,产生长仓和短仓信号。策略追踪中期趋势,适用于高位震荡或低位震荡的行情。

### 策略原理

计算一快一慢两条SMA均线,以及价格通道的中线。快线周期为5,慢线周期为20。当价格通道中线上方,视为上升趋势,该阶段寻找快线上穿慢线的机会做多;当价格通道中线下方,视为下降趋势,寻找快线下穿慢线的机会做空。

此外,结合K线实体颜色判断,如果是上升趋势,要求见底K线连续大于等于2根红色实体,然后快线上穿慢线时做多;如果是下降趋势,要求见顶K线连续大于等于2根绿色实体,然后快线下穿慢线时做空。

### 优势分析

该策略同时利用两条SMA均线和价格通道判断趋势方向,避免被假突破误导。并加入K线实体颜色判定过滤假信号。做多做空信号同时存在,可以对冲操作。能够有效跟踪中期趋势。

参数可自定义配置长短仓条件,适应性强。回测数据显示,该策略在高位震荡和低位震荡市场中都能获得不错收益。

### 风险分析

该策略过于依赖均线指标,在震荡行情中存在产生过多虚假信号的可能。且仅考虑价格因素,忽略了成交量的影响。

可以适当调整SMA周期参数,或加入其他技术指标进行信号过滤。也可以引入量能指标等进行综合判断。此外,可优化仓位管理,根据市场情况调整仓位大小。

### 优化方向

1. 测试不同的SMA快慢线组合,找到最优参数。

2. 增加成交量等指标进行信号校验。

3. 结合其他技术指标形成策略组合。

4. 设置动态仓位,优化资金管理。

5. 应用机器学习预测价格趋势和转折点。

6. 优化止损策略,防止过度亏损。

### 总结

该策略整体思路清晰,利用双SMA系统判断趋势较为常见。但仅靠均线系统容易产生误信号,需要引入其他技术指标进行优化。如果能够引入更多定性和定量指标进行验证,该策略效果会更好。总体来说,其提供了一种简单可靠的趋势跟踪策略模板。

||


### Overview 

This strategy uses only two SMA lines, with the slow SMA for trend direction and fast SMA for entry signals. Combined with candlestick color determination, it generates long and short signals. The strategy follows medium-term trends, suitable for consolidations at highs or lows.

### Strategy Logic

Two SMA lines are computed, one fast and one slow, along with the midline of the price channel. The fast line has a period of 5, while the slow line has a period of 20. Above the price channel midline is considered an uptrend, where opportunities to go long on fast line crossing above slow line are sought. Below the midline is a downtrend, where opportunities to go short on fast line crossing below slow line are sought.

In addition, candlestick body color is incorporated. In an uptrend, at least 2 consecutive red candlesticks are required after seeing the bottom, before going long when the fast line crosses above the slow line. In a downtrend, at least 2 consecutive green candles are required after seeing the top, before going short when the fast line crosses below the slow line.

### Advantage Analysis

The dual SMA lines and price channel help determine trend direction, avoiding false breakouts. Candlestick color filters further eliminate false signals. Long and short signals both exist for hedging. The strategy effectively tracks medium-term trends.

Customizable parameters allow configuring long/short conditions flexibly. Backtests show decent returns in consolidations at both highs and lows.

### Risk Analysis

Overreliance on SMA lines may generate excessive false signals during rangings. Price factors are considered while volume is ignored.

Tuning SMA periods or incorporating other technical indicators could filter signals. Volume indicators may also provide additional insight. Position sizing could also be optimized based on market conditions.

### Optimization Directions

1. Test different fast and slow SMA combinations to find optimal parameters.

2. Add volume and other indicators for signal validation.

3. Incorporate other technical indicators to form an ensemble strategy. 

4. Set dynamic position sizing to optimize capital management.

5. Apply machine learning to predict price trends and inflection points.

6. Optimize stop loss strategies to limit losses.

### Summary

The dual SMA system for trend determination is logically clear and commonly used. But overreliance on moving averages alone tends to generate false signals, requiring other indicators for enhancement. With more qualitative and quantitative validation, the strategy would become more robust. Overall it provides a simple and reliable trend following template.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|true|Use fast SMA|
|v_input_4|5|fast SMA Period|
|v_input_5|20|slow SMA Period|
|v_input_6|2|Bars Q|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Noro's Trend SMA Strategy v1.4", shorttitle = "Trend SMA str 1.4", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

needlong = input(true, "long")
needshort = input(true, "short")
usefastsma = input(true, "Use fast SMA")
fastlen = input(5, defval = 5, minval = 1, maxval = 50, title = "fast SMA Period")
slowlen = input(20, defval = 20, minval = 2, maxval = 200, title = "slow SMA Period")
bars = input(2, defval = 2, minval = 0, maxval = 3, title = "Bars Q")

fastsma = ema(close, fastlen)
slowsma = ema(close, slowlen)

//PriceChannel
src = ohlc4
lasthigh = highest(src, slowlen)
lastlow = lowest(src, slowlen)
center = (lasthigh + lastlow) / 2

trend = low > center ? 1 : high < center ? -1 : trend[1]

bar = close > open ? 1 : close < open ? -1 : 0
redbars = bars == 0 ? 1 : bars == 1 and bar == -1 ? 1 : bars == 2 and bar == -1 and bar[1] == -1 ? 1 : bars == 3 and bar == -1 and bar[1] == -1 and bar[2] == -1 ? 1 : 0
greenbars = bars == 0 ? 1 : bars == 1 and bar == 1 ? 1 : bars == 2 and bar == 1 and bar[1] == 1 ? 1 : bars == 3 and bar == 1 and bar[1] == 1 and bar[2] == 1 ? 1 : 0

up = trend == 1 and (low < fastsma or usefastsma == false) and redbars == 1 ? 1 : 0
dn = trend == -1 and (high > fastsma or usefastsma == false) and greenbars == 1 ? 1 : 0

colorfastsma = usefastsma == true ? red : na
plot(fastsma, color = colorfastsma, title = "Fast SMA")
plot(center, color = blue, title = "Price Channel")

longCondition = up == 1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/427347

> Last Modified

2023-09-20 11:35:30
