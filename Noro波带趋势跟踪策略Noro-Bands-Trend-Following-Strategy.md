
> Name

Noro波带趋势跟踪策略Noro-Bands-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略是基于Noro自制的波带指标来判断趋势方向,并结合特定规则产生交易信号的趋势跟踪策略。当价格突破波带时产生交易信号。另外结合辅助指标CryptoBottom来提高信号质量。

### 策略原理

1. 计算Noro波带。根据用户定义周期计算最近高点、低点,并计算中线、上下轨。

2. 判断趋势方向。价格位于上轨之上为看涨,位于下轨之下为看跌。

3. 生成交易信号。看涨时,价格突破下轨产生买入信号;看跌时,价格突破上轨产生卖出信号。

4. 整合CryptoBottom。当辅助指标CryptoBottom发出信号时,增加买入机会。

5. 开仓规则。用户可以选择只进行多头交易或空头交易。不选时则全仓交易。

6. 绘制Noro波带。可以显示或隐藏波带绘制。

### 优势分析

1. Noro波带有效判断趋势方向。

2. 结合波带突破产生信号,可避免假突破。

3. CryptoBottom提高买入信号质量。

4. 可自定义只做多或只做空。

5. 参数可调整适应不同周期。

### 风险分析

1. 参数设定不当可能导致波带判断失效。

2. 突破信号存在滞后。

3. CryptoBottom并非完全可靠。

4. 只做多或只做空可能错过部分机会。

- 风险1可以通过参数优化找到最佳设置。

- 风险2可以结合其他指标进行确认。

- 风险3需要检验CryptoBottom的效果。

- 风险4需要评估仅做多或仅做空的收益效果。

### 优化方向

1. 测试不同参数对Noro波带的影响。

2. 尝试其它突破指标替代Noro波带。

3. 评估止损策略。

4. 测试仅做多或仅做空的效果。 

5. 优化CryptoBottom的参数。

### 总结

该策略通过Noro波带判断趋势方向,并结合突破信号产生交易机会。CryptoBottom提升买入效果。参数优化和止损可以进一步完善该策略。

||

### Overview

This strategy uses custom Noro Bands indicator to determine trend direction and generates trading signals based on specific rules. Signals are generated when price breaks the bands. CryptoBottom indicator is also used to improve signal quality.

### Strategy Logic

1. Calculate Noro Bands. Determine recent high, low based on user period, and calculate midline and upper/lower bands.

2. Determine trend direction. Price above upper band is uptrend. Price below lower band is downtrend.

3. Generate signals. Buy signal when price breaks below lower band in uptrend. Sell signal when price breaks above upper band in downtrend.

4. Integrate CryptoBottom. Add buying opportunities when CryptoBottom signal occurs.

5. Opening position rules. Users can choose to trade only long or short. Without selection, trade both sides.

6. Plot Noro Bands. Can show or hide band plotting.

### Advantages

1. Noro Bands effectively determine trend direction.

2. Combining band breakout avoids false breakout signals. 

3. CryptoBottom improves quality of buy signals.

4. Customizable for only long or short trades.

5. Adjustable parameters suit different timeframes.

### Risks

1. Improper parameters may cause failure in band calculation.

2. Breakout signals have lag. 

3. CryptoBottom is not completely reliable.

4. Trading only one side may miss opportunities.

- Risk 1 can be addressed through parameter optimization.

- Risk 2 can be improved by combining other indicators.

- Risk 3 requires validating CryptoBottom performance.

- Risk 4 needs assessing profitability of one side trading.

### Enhancement Opportunities

1. Test parameter impact on Noro Bands.

2. Evaluate other breakout indicators instead of Noro Bands.

3. Assess stop loss strategies. 

4. Test effectiveness of only long or short trades.

5. Optimize parameters for CryptoBottom.

### Conclusion

This strategy uses Noro Bands to determine trend and breakout signals to time entries. CryptoBottom improves buying. Parameter optimization and stops can further refine the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|20|Period|
|v_input_4|true|Use Color or bar|
|v_input_5|true|Use CryptoBottom|
|v_input_6|true|Show Bands|
|v_input_7|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Strategy v1.2", shorttitle = "NoroBands str 1.2", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
color = input(true, "Use Color or bar")
usecb = input(true, "Use CryptoBottom")
needbb = input(true, defval = false, title = "Show Bands")
needbg = input(true, defval = false, title = "Show Background")
src = close

//Fast RSI
fastup = rma(max(change(src), 0), 2)
fastdown = rma(-min(change(src), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//CryptoBottom
mac = sma(close, 10)
lencb = abs(close - mac)
sma = sma(lencb, 100)
max = max(open, close)
min = min(open, close)
//dn = close > open and len > sma * 3 and max > max[1] and fastrsi > 90 ? 1 : 0

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//dist
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma

//Trend
trend = close < ld and high < hd ? -1 : close > hd and low > ld ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 90)

//Signals
up = trend == 1 and ((close < open or color == false) or close < hd) ? 1 : 0
dn = trend == -1 and ((close > open or color == false) or close > ld) ? 1 : 0 
up2 = close < open and lencb > sma * 3 and min < min[1] and fastrsi < 10 ? 1 : 0 //CryptoBottom

longCondition = up == 1 or (up2 == 1 and usecb == true)
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/427120

> Last Modified

2023-09-18 13:57:31
