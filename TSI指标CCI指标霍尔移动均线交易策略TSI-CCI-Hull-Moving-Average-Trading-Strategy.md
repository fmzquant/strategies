
> Name

TSI指标CCI指标霍尔移动均线交易策略TSI-CCI-Hull-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过TSI指标、CCI指标以及霍尔移动均线的组合进行趋势判断和交易。TSI指标与CCI指标用于识别价格潮趋势,霍尔均线辅助确认趋势方向。做多做空信号出现时设置止盈点,实现盈利退出。

## 策略原理

计算TSI指标的曲线和信号线,当指标线上穿信号线时产生做多信号,下穿时做空信号。同时计算CCI指标,判断超买超卖区域。价格上穿霍尔均线提示多头市场,下穿为空头市场。满足TSI、CCI指标条件以及霍尔均线的突破时,采取对应做多或做空操作。设置止盈价格,到达止盈价后退出仓位。

## 优势分析

- TSI指标判断趋势方向的能力较强    
- CCI指标可有效识别超买超卖现象
- 霍尔均线过滤假突破,提高信号质量
- 设定止盈价格,可在利润最大化时退出
- 综合多种指标,提升策略稳定性

## 风险分析

- TSI、CCI等指标存在滞后性
- 霍尔均线无法完美判断转折点
- 无法准确判断价格反转时机
- 止盈设置不当可能缩减利润空间 

可通过调整指标参数,优化止盈算法等方式降低风险。

## 优化方向

- 测试TSI、CCI参数组合,提高策略灵敏度
- 考虑动态止盈、移动止盈等止盈优化
- 结合其他指标判断趋势反转点
- 在不同品种中测试,提高健壮性

## 总结

该策略综合多种指标进行趋势判断,设置止盈策略锁定利润,回测表现较好。通过参数调优等进一步完善,可成为稳定的量化交易系统。

||

## Overview

This strategy combines the TSI, CCI indicators and Hull Moving Average to determine and trade trends. TSI and CCI identify price waves while Hull MA confirms trend direction. Profit targets are set when long/short signals occur for profitable exits.

## Strategy Logic

The TSI curve and signal line are calculated. Long signal when curve crosses above line, short on downward crossover. CCI indicates overbought/oversold levels. Price crossing above Hull MA suggests bull market, and below for bear market. Long/short trades are taken when TSI, CCI and Hull MA breakout conditions align. Profit targets are set to exit positions when reached.

## Advantages  

- TSI strongly identifies trend direction
- CCI effectively detects overbought/oversold  
- Hull MA filters false breakouts improving signals
- Profit targets allow exiting at peak profitability 
- Combining multiple indicators improves robustness

## Risks

- Lag exists in TSI, CCI and other indicators
- Hull MA cannot perfectly determine turning points
- Exact price reversal timing cannot be accurately determined
- Poor profit target setting risks missing profit potential

Risks can be reduced by tuning indicators, optimizing profit algorithms etc.

## Enhancements

- Test TSI/CCI combinations to improve sensitivity
- Consider dynamic/trailing profit targets  
- Add other indicators to determine reversals
- Test across different products to improve robustness

## Conclusion

This multiple indicator strategy with profit targeting shows good backtest results. Further refinements like parameter optimization can make it a stable quant trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Long Length|
|v_input_2|50|Short Length|
|v_input_3|25|Signal Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|26|Period|
|v_input_6|100|Upper Line|
|v_input_7|-100|Lower Line|
|v_input_8|true|Start Date|
|v_input_9|true|Start Month|
|v_input_10|2018|Start Year|
|v_input_11|true|End Date|
|v_input_12|7|End Month|
|v_input_13|9999|End Year|
|v_input_14|0.5|LongProfitPercent|
|v_input_15|0.5|ShortProfitPercent|
|v_input_16_close|0|profit long source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_17_close|0|profit short source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="TSI CCI Hull", shorttitle="TSICCIHULL", default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills= false, calc_on_every_tick=true, pyramiding=0, commission_type=strategy.commission.percent, commission_value=0.018)
long = input(title="Long Length", type=input.integer, defval=50)
short = input(title="Short Length", type=input.integer, defval=50)
signal = input(title="Signal Length", type=input.integer, defval=25)
price=input(title="Source",type=input.source,defval=close)
Period=input(26, minval=1)
lineupper = input(title="Upper Line", type=input.integer, defval=100)
linelower = input(title="Lower Line", type=input.integer, defval=-100)
p=price
length= Period
double_smooth(src, long, short) =>
    fist_smooth = ema(src, long)
    ema(fist_smooth, short)
pc = change(price)
double_smoothed_pc = double_smooth(pc, long, short)
double_smoothed_abs_pc = double_smooth(abs(pc), long, short)
tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)
keh = tsi_value*5 > linelower ? color.red : color.lime
teh = ema(tsi_value*5, signal*5) > lineupper ? color.red : color.lime
meh = ema(tsi_value*5, signal*5) > tsi_value*5 ? color.red : color.lime
i1=plot(tsi_value*5, title="TSI Value", color=color.black, linewidth=1,transp=100)
i2=plot(ema(tsi_value*5, signal*5), title="TSI Signal", color=color.black, linewidth=1,transp=100)
fill(i1,i2,color=meh,transp=85)
plot(cross(tsi_value*5, ema(tsi_value*5, signal*5)) ? tsi_value*5 : na, style=plot.style_circles, color=color.black, linewidth=10)
plot(cross(tsi_value*5, ema(tsi_value*5, signal*5)) ? tsi_value*5 : na, style=plot.style_circles, color=color.white, linewidth=8,transp=0)
plot(cross(tsi_value*5, ema(tsi_value*5, signal*5)) ? tsi_value*5 : na, style=plot.style_circles, color=meh, linewidth=5)
n2ma = 2 * wma(p, round(length / 2))
nma = wma(p, length)
diff = n2ma - nma
sqn = round(sqrt(length))
n1 = wma(diff, sqn)
cci = (p - n1) / (0.015 * dev(p, length))
c = cci > 0 ? color.lime : color.red
c1 = cci > 20 ? color.lime : color.silver
c2 = cci < -20 ? color.red : color.silver
cc=plot(cci, color=c, title="CCI Line", linewidth=2)
cc2=plot(cci[1], color=color.gray, linewidth=1,transp=100)
fill(cc,cc2,color=c,transp=85)
plot(cross(20, cci) ? 20 : na, style=plot.style_cross,title="CCI cross UP",  color=c1, linewidth=2,transp=100,offset=-2)
plot(cross(-20, cci) ? -20 : na, style=plot.style_cross,title="CCI cross down",  color=c2, linewidth=2,transp=100,offset=-2)

TSI1=ema(tsi_value*5, signal*5)
TSI2=ema(tsi_value*5, signal*5)[2]

hullma_smoothed = wma(2*wma(n1, Period/2)-wma(n1, Period), round(sqrt(Period)))
//plot(hullma_smoothed*200)

// Make input options that configure backtest date range
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer,
     defval=2018, minval=1800, maxval=2100)

endDate = input(title="End Date", type=input.integer,
     defval=1, minval=1, maxval=31)
endMonth = input(title="End Month", type=input.integer,
     defval=7, minval=1, maxval=12)
endYear = input(title="End Year", type=input.integer,
     defval=9999, minval=1800, maxval=2100)
     
// Look if the close time of the current bar
// falls inside the date range
inDateRange = (time >= timestamp(syminfo.timezone, startYear,
         startMonth, startDate, 0, 0)) and
     (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))
     
LongProfitPercent=input(0.5)
ShortProfitPercent=input(0.5)
LP=(LongProfitPercent/100)+1
SP=(ShortProfitPercent/100)+1

LongProfitSource=input(title="profit long source",type=input.source,defval=close)
ShortProfitSource=input(title="profit short source",type=input.source,defval=close)

longCondition = TSI1>TSI2 and hullma_smoothed<price and cci>0
shortCondition = TSI1<TSI2 and hullma_smoothed>price and cci<0

if (longCondition and cci>cci[1] and cci > 0 and n1>n1[1] and inDateRange)
    strategy.entry("buy", strategy.long)
strategy.close("buy", when = shortCondition and cci<cci[1] and cci < 0 and n1<n1[1] or LongProfitSource>strategy.position_avg_price*LP and inDateRange)
if (shortCondition and cci<cci[1] and cci < 0 and n1<n1[1] and inDateRange)
    strategy.entry("sell", strategy.short)
strategy.close("sell", when = longCondition and cci>cci[1] and cci > 0 and n1>n1[1] or ShortProfitSource<strategy.position_avg_price/SP and inDateRange)
```

> Detail

https://www.fmz.com/strategy/427160

> Last Modified

2023-09-18 17:17:52
