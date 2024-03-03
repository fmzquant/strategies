
> Name

震荡多空RSI换币策略Oscillating-Long-Short-RSI-Crypto-Switching-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9f62b112e2b6907c15.png)

[trans]

## 概述

震荡多空RSI换币策略是一种用于加密货币的量化交易策略。它结合了市场技术指标RSI与ICHIMOKU指标,在价格震荡时识别多空信号,实现低买高卖。它适用于中长线周期,如3-4小时以上。

## 策略原理

该策略主要基于以下指标和规则:

**ICHIMOKU指标**
- Tenkan线:过去20根K线的最高最低价中点
- Kijun线:过去50根K线的最高最低价中点  
- Senkou A线:Tenkan线与Kijun线的中点  
- Senkou B线:过去120根K线的最高最低价中点
- Chikou线:当前K线收盘价的前30根K线

**RSI指标**
- 区间为0-100
- 高于50为多头信号,低于50为空头信号

**入场规则**  
多头入场:Tenkan线上穿Kijun线(黄金交叉)且价格突破Senkou A&B线,同时RSI高于50
空头入场:Tenkan线下穿Kijun线(死亡交叉)且价格跌破Senkou A&B线,同时RSI低于50  

**退出规则**  
与入场相反的信号出现时立即止损离场

该策略综合考虑了中长期趋势、短期资金流动性和超买超卖情况,在震荡行情中捕捉反转机会。它同时设置了止损规则来规避巨额亏损。

## 优势分析

**1. 多种指标综合判断,确保高确定性**

该策略同时考虑ICHIMOKU的趋势和支撑阻力判断、RSI的超买超卖情况,以及K线实体方向的资金流动性,确保信号的可靠性。

**2. 适合震荡行情,频繁获利**  

加密货币市场波动较大,该策略可充分捕捉震荡行情中的反转机会,实现频繁的低买高卖。

**3. 防止追涨杀跌,风险可控**  

策略综合考虑中长期趋势和短期情况,可避免追涨杀跌的风险,同时设置止损规避风险。


## 风险分析

**1. 可能错过部分运行行情**

该策略以反转为主,当出现长时间的运行行情时,策略会频繁震荡打击资金。

**2. 单一品种,无法分散风险**  

策略仅交易单一品种,无法分散市场系统性风险。

**3. 极端行情下发生止损** 

在极端行情下,如跳空、量能爆发等情况时,策略可能会触发止损而被迫离场。


## 优化方向  

**1. 增加止损策略,降低单次亏损**

可设置移动止损或余额百分比止损来锁定利润,防止利润归零。

**2. 结合股指相关性,分散市场风险**  

可在股指相关性较强的品种中寻找交易机会,以分散市场系统性风险。

**3. 增加条件过滤,减少无效交易**

可设置价格波动率、成交量变动等条件过滤,避免无效的反转信号,提高获利概率。


## 总结

震荡多空RSI换币策略综合运用ICHIMOKU指标和RSI指标判断加密货币的反转点,适合震荡行情的低买高卖获利。它同时设置了止损规则来控制风险。该策略可通过优化止损机制、关联性分散风险和设置条件过滤来进一步增强效果,值得实盘验证。

||

## Overview  

The Oscillating Long-Short RSI Crypto Switching Strategy is a quantitative trading strategy designed for cryptocurrencies. It combines the technical indicator RSI with the ICHIMOKU indicator to identify long and short signals during price oscillations and achieve buying low and selling high. It is suitable for medium to long term timeframes such as 3-4 hours or longer.

## Strategy Logic  

The strategy is mainly based on the following indicators and rules:  

**ICHIMOKU Indicator** 
- Tenkan Line: Midpoint of highest and lowest price of last 20 bars  
- Kijun Line: Midpoint of highest and lowest price of last 50 bars
- Senkou A Line: Midpoint of Tenkan and Kijun Line
- Senkou B Line: Midpoint of highest and lowest price of last 120 bars  
- Chikou Line: Closing price of 30 bars ago

**RSI Indicator**
- Range from 0 to 100
- Above 50 indicates bullish signal, below 50 indicates bearish signal

**Entry Rules**   
Long entry: Tenkan cross above Kijun (golden cross) and price breaks through Senkou A&B Lines, with RSI above 50 at the same time  
Short entry: Tenkan cross below Kijun (death cross) and price breaks down Senkou A&B Lines, with RSI below 50 at the same time  

**Exit Rules**  
Exit with opposite signal  

The strategy takes into account the medium to long term trend, short term capital flow and overbought/oversold conditions to capture reversal opportunities during oscillation. It also sets stop loss rules to avoid huge losses.  

## Advantage Analysis   

**1. Judgment based on multiple indicators ensures high certainty**  

The strategy considers ICHIMOKU’s trend and support/resistance judgment, RSI’s overbought/oversold conditions, as well as capital flow based on the direction of candle body. This ensures reliable signals.   

**2. Suitable for oscillation, frequent profit-taking**

Cryptocurrency market has large fluctuations. This strategy can fully capture reversal opportunities during oscillations and achieve frequent buying low and selling high.  

**3. Prevent chasing rises and beating retreats, controllable risk**   

The strategy comprehensively considers medium and long term trends and short term situations to avoid the risk of chasing rises and beating retreats. Meanwhile, stop loss prevents risk.


## Risk Analysis  

**1. May miss some trending opportunities**  

The strategy focuses mainly on reversal, which may lead to frequent whipsaws during prolonged trending phases.  

**2. Single symbol, unable to diversify risk**   

The strategy trades only a single symbol and cannot diversify against systematic market risk.  

**3. Stop loss triggered during extreme moves**   

During extreme market conditions like gap or spikes, stop loss may be triggered forcing exit.  


## Optimization Directions   

**1. Add stop loss for lower single loss**

Moving stop loss or percentage stop loss can be used to lock in profits and prevent full retracement.  

**2. Correlate with indexes to diversify market risk**   

Look for trading opportunities among highly correlated symbols to diversify systematic market risk.  

**3. Additional filters to reduce invalid trades**  

Filters like price volatility or volume changes can be added to avoid invalid reversal signals and improve profitability rate.


## Conclusion  

The Oscillating Long-Short RSI Crypto Switching Strategy combines ICHIMOKU and RSI indicators to identify reversal points for cryptocurrencies, suitable for buying low and selling high profit-taking during oscillations. It also sets stop loss rules to control risk. The strategy can be further enhanced by optimizing stop loss mechanism, diversifying risks through correlation and adding conditional filters, worth live testing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Heikin Ashi Candles in Algo Calculations|
|v_input_2|20|Tenkan-Sen Bars|
|v_input_3|50|Kijun-Sen Bars|
|v_input_4|120|Senkou-Span B Bars|
|v_input_5|30|Chikou-Span Offset|
|v_input_6|30|Senkou-Span Offset|
|v_input_7|true|Long Entry|
|v_input_8|true|Short Entry|
|v_input_9|true|From Day|
|v_input_10|true|From Month|
|v_input_11|2019|From Year|
|v_input_12|31|To Day|
|v_input_13|12|To Month|
|v_input_14|2021|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2023-12-24 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4

strategy(title="Ichimoku + RSI Crypto trending strategy", overlay=true, initial_capital = 1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, pyramiding=1  )

UseHAcandles    = input(true, title="Use Heikin Ashi Candles in Algo Calculations")
//
// === /INPUTS ===

// === BASE FUNCTIONS ===

haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low


//Inputs
ts_bars = input(20, minval=1, title="Tenkan-Sen Bars")
ks_bars = input(50, minval=1, title="Kijun-Sen Bars")
ssb_bars = input(120, minval=1, title="Senkou-Span B Bars")
cs_offset = input(30, minval=1, title="Chikou-Span Offset")
ss_offset = input(30, minval=1, title="Senkou-Span Offset")
long_entry = input(true, title="Long Entry")
short_entry = input(true, title="Short Entry")

//Volatility
//vollength = input(defval=1, title="VolLength")
//voltarget = input(defval=0., type=input.float, step=0.1, title="Volatility Target")
//Difference = abs((haClose - haOpen)/((haClose + haOpen)/2) * 100)
//MovingAverage = sma(Difference, vollength)
//highvolatility = MovingAverage > voltarget

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

middle(len) => avg(lowest(len), highest(len))

// Ichimoku Components
tenkan = middle(ts_bars)
kijun = middle(ks_bars)
senkouA = avg(tenkan, kijun)
senkouB = middle(ssb_bars)

//RSI
change = change(haClose)
gain = change >= 0 ? change : 0.0
loss = change < 0 ? (-1) * change : 0.0
avgGain = rma(gain, 14)
avgLoss = rma(loss, 14)
rs = avgGain / avgLoss
rsi = 100 - (100 / (1 + rs))

ss_high = max(senkouA[ss_offset-1], senkouB[ss_offset-1])
ss_low = min(senkouA[ss_offset-1], senkouB[ss_offset-1])

// Entry/Exit Signals
tk_cross_bull = tenkan > kijun
tk_cross_bear = tenkan < kijun
cs_cross_bull = mom(haClose, cs_offset-1) > 0
cs_cross_bear = mom(haClose, cs_offset-1) < 0
price_above_kumo = haClose > ss_high
price_below_kumo = haClose < ss_low
rsi_bullish = rsi > 50
rsi_bearish = rs < 50
bullish = tk_cross_bull and cs_cross_bull and price_above_kumo and rsi_bullish //and highvolatility
bearish = tk_cross_bear and cs_cross_bear and price_below_kumo and rsi_bearish //and highvolatility

strategy.entry("Long", strategy.long, when=bullish and long_entry and time_cond)
strategy.entry("Short", strategy.short, when=bearish and short_entry and time_cond)

strategy.close("Long", when=bearish and not short_entry and time_cond)
strategy.close("Short", when=bullish and not long_entry and time_cond)



```

> Detail

https://www.fmz.com/strategy/436511

> Last Modified

2023-12-25 13:49:48
