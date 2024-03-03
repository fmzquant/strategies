
> Name

均衡线PSAR指标交易策略Heikin-Ashi-PSAR-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略结合使用均衡线图形和PSAR指标,进行趋势判断和交易信号产生。该策略借助均衡线降噪的特点,配合PSAR指标判断趋势反转点,实现对中长线趋势的捕捉。

策略原理:

1. 计算均衡线的开盘价、收盘价、最高价、最低价。

2. 根据均衡线实体颜色判断多头和空头趋势。

3. 计算PSAR指标,当其由上向下或下向上突破时,确定趋势反转。

4. 均衡线多头时,PSAR向下突破做多;均衡线空头时,PSAR向上突破做空。 

5. PSAR根据新高新低和加速因子进行自适应调整。

该策略的优势:

1. 均衡线过滤噪音,PSAR捕捉反转。组合提高精确度。

2. PSAR参数自适应,可应对市场变化。

3. 规则清晰易行,有利于参数优化。

该策略的风险:

1. 均衡线和PSAR均存在滞后问题,可能错过最佳入场点位。

2. 震荡趋势下PSAR容易产生错误信号。

3. 需要严格的资金管理,以对冲反转交易的风险。

总之,该策略通过均衡线判断大趋势,PSAR识别具体入场时点,进行趋势追踪操作。滞后问题和假反转风险需要警惕,但可通过优化获得长期稳定回报。

||

This strategy combines Heikin-Ashi candlesticks and the PSAR indicator for trend identification and trade signals. It uses Heikin-Ashi noise filtering with PSAR for trend reversal detection, aiming to capture medium-long term trends.

Strategy Logic:

1. Calculate Heikin-Ashi open, close, high and low. 

2. Candle color determines interim bull/bear trend.

3. Calculate PSAR and identify trend reversal when it crosses Heikin-Ashi price.

4. Go long on PSAR downtrend and short on PSAR uptrend.

5. PSAR adapts based on new highs/lows and acceleration factor.

Advantages:

1. Combination improves accuracy - Heikin-Ashi filters noise, PSAR catches reversals.

2. Adaptive PSAR adjustable to changing market conditions.

3. Clear rules benefit parameter optimization.

Risks:  

1. Lagging Heikin-Ashi and PSAR may miss best entries.

2. PSAR prone to false signals in choppy trends.

3. Strict risk management needed to defend against whipsaws.

In summary, this strategy pairs Heikin-Ashi for trend context with PSAR for timing. Lag and false signals require caution but can be overcome through optimization for long-term steady gains.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|PSAR Start|
|v_input_2|0.02|PSAR Increment|
|v_input_3|0.2|PSAR Max|
|v_input_4|2018|Start Year|
|v_input_5|true|Start Month|
|v_input_6|true|Start Day|
|v_input_7|2100|End Year|
|v_input_8|true|End Month|
|v_input_9|true|End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("QuantNomad - Heikin-Ashi PSAR Strategy", shorttitle = "HA-PSAR[QN]", overlay = false)

////////////
// INPUTS //

start      = input(0.02, title = "PSAR Start")
increment  = input(0.02, title = "PSAR Increment")
maximum    = input(0.2,  title = "PSAR Max")

start_year  = input(2018, 'Start Year',  input.integer)
start_month = input(1,    'Start Month', input.integer)
start_day   = input(1,    'Start Day',   input.integer)

end_year  = input(2100, 'End Year',  input.integer)
end_month = input(1,    'End Month', input.integer)
end_day   = input(1,    'End Day',   input.integer)

date_start = timestamp(start_year, start_month, start_day, 00, 00)
date_end   = timestamp(end_year,   end_month,   end_day,   00, 00)

// if time is in correct period
time_cond = time >= date_start and time <= date_end

// Calculation HA Values 
haopen  = 0.0
haclose = (open + high + low + close) / 4
haopen := na(haopen[1]) ? (open + close) / 2 : (haopen[1] + haclose[1]) / 2
hahigh  = max(high, max(haopen, haclose))
halow   = min(low,  min(haopen, haclose))

// HA colors
hacolor = haclose > haopen ? color.green : color.red

psar        = 0.0 // PSAR
af          = 0.0 // Acceleration Factor
trend_dir   = 0   // Current direction of PSAR
ep          = 0.0 // Extreme point
trend_bars  = 0

sar_long_to_short = trend_dir[1] == 1  and haclose <= psar[1] // PSAR switches from long to short
sar_short_to_long = trend_dir[1] == -1 and haclose >= psar[1] // PSAR switches from short to long

trend_change = barstate.isfirst[1] or sar_long_to_short or sar_short_to_long

// Calculate trend direction
trend_dir    := barstate.isfirst[1] and haclose[1] > haopen[1] ? 1 : 
   barstate.isfirst[1] and haclose[1] <= haopen[1] ? -1 : 
   sar_long_to_short ? -1 : 
   sar_short_to_long ?  1 : nz(trend_dir[1])

trend_bars := sar_long_to_short ? -1 : 
              sar_short_to_long ?  1 : 
              trend_dir ==  1   ? nz(trend_bars[1]) + 1 : 
              trend_dir == -1   ? nz(trend_bars[1]) - 1 : 
              nz(trend_bars[1])

// Calculate  Acceleration Factor
af := trend_change ? start : 
   (trend_dir == 1 and hahigh > ep[1]) or  
   (trend_dir == -1 and low < ep[1]) ? 
   min(maximum, af[1] + increment) : 
   af[1]

// Calculate extreme point
ep := trend_change and trend_dir == 1 ? hahigh :  
   trend_change and trend_dir == -1 ? halow : 
   trend_dir == 1 ? max(ep[1], hahigh) : 
   min(ep[1], halow)

// Calculate PSAR
psar := barstate.isfirst[1] and haclose[1] > haopen[1] ? halow[1] : 
   barstate.isfirst[1] and haclose[1] <= haopen[1] ? hahigh[1] : 
   trend_change ? ep[1] :    
   trend_dir == 1 ? psar[1] + af * (ep - psar[1]) : psar[1] - af * (psar[1] - ep) 

plotcandle(haopen, hahigh, halow, haclose, title = "HA", color = hacolor)
plot(psar, style=plot.style_cross, color=trend_dir == 1 ? color.green : color.red,  linewidth = 2)

// Strategy
strategy.entry("long",  true,  when = sar_short_to_long and time_cond)
strategy.entry("short", false, when = sar_long_to_short and time_cond)

```

> Detail

https://www.fmz.com/strategy/426489

> Last Modified

2023-09-12 15:16:17
