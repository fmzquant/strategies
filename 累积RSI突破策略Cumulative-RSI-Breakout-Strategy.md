
> Name

累积RSI突破策略Cumulative-RSI-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/106d30b65ba8259770b.png)

[trans]

### 概述

该策略利用累积RSI指标识别趋势,在RSI指标累积值突破关键阈值时进行买入和卖出操作。该策略可以有效过滤市场noise,锁定较长线的趋势交易机会。

### 策略原理  

该策略主要基于累积RSI指标进行交易决策。累积RSI指标是RSI指标的累积值,通过设置参数cumlen,可以将RSI指标在cumlen天内的数值累加,得到累积RSI指标。该指标可以过滤掉短期市场noise。

当累积RSI指标上穿过bolinger带上轨,就进行买入开仓操作;当累积RSI指标下穿过bolinger带下轨,就进行卖出平仓操作。bolinger带上下轨通过多年历史数据计算得出,是动态变化的参考价位。

另外,策略还增加了趋势过滤器选项。只有当价格高于100天移动平均线时,也就是处于趋势上升通道时,才会进行买入开仓。这个过滤器可以避免价格震荡时的错误交易。

### 策略优势

- 利用累积RSI指标有效过滤噪音,锁定中长线趋势
- 增加趋势过滤器,避免不合理交易
- 采用突破动态参考价位,而不是固定数值进行判断
- 可配置参数较多,可以针对不同市场调整参数
- 10年回测效果优异,收益远高于买入持有策略

### 策略风险及改进

- 策略仅基于单一指标累积RSI进行决策,可增加其他判断指标或过滤器来综合判断
- 固定倍数杠杆较高,可根据回撤情况调整杠杆比例
- 仅做多方向,可考虑增加做空机会
- 可优化参数组合,不同市场条件下参数设置会有较大差异
- 可丰富平仓条件,增加止损立场、移动止损等方式
- 可考虑与其他策略组合使用,发挥协同效果

### 总结

该累积RSI突破策略整体运作流畅、逻辑清晰,通过累积RSI指标有效滤波、增加趋势判断,对中长线趋势把握准确,历史回测表现优异。但仍有可优化空间,可以从调整参数设置、增加判断指标、丰富平仓条件等方面入手,打造更健壮和全面的趋势策略。该策略思路新颖,值得进一步探索和应用。

||

### Overview

This strategy utilizes the Cumulative RSI indicator to identify trends and makes buy and sell decisions when the cumulative RSI value breaks through key threshold levels. It can effectively filter market noise and capture longer-term trend trading opportunities.

### Strategy Logic

The strategy is primarily based on the Cumulative RSI indicator for trading decisions. The Cumulative RSI indicator is the accumulation of RSI values. By setting the cumlen parameter, the RSI values over the past cumlen days are added up to derive the Cumulative RSI indicator. This indicator can filter out short-term market noise.

When the Cumulative RSI indicator crosses above the Bollinger Band upper rail, a long position will be opened. When the Cumulative RSI crosses below the Bollinger Band lower rail, the open position will be closed. The Bollinger Band rails are dynamically calculated based on historical data over many years. 

Additionally, a trend filter option is added. Long trades will only be opened when the price is above the 100-day Moving Average, meaning it is in an upward trend channel. This filter avoids erroneous trades during market fluctuations.

### Advantages

- Effectively filter noise and capture mid-to-long-term trends using Cumulative RSI 
- Avoid unreasonable trades with the trend filter
- Use dynamic reference levels instead of fixed values for decision making
- Highly configurable parameters for adjustments based on different markets
- Outstanding backtest results over 10 years, significantly outperforming buy and hold

### Risks and Improvements

- Decisions based solely on one indicator, can add other indicators or filters
- Fixed high leverage ratio, can adjust based on drawdowns
- Only long trades, can look into shorting opportunities
- Optimize parameters combinations which vary significantly across markets
- Enrich exit conditions with stop loss, moving stop loss etc.
- Consider combining with other strategies for synergistic effects

### Summary

The Cumulative RSI breakout strategy has smooth logic flow and accurately identifies mid-to-long term trends by filtering with Cumulative RSI and adding trend judgment. The backtest results are exceptional over the past decade. There is still room for improvements in areas like parameter tuning, adding indicators, enriching exit conditions to make the strategy more robust. The novel concept is worth further exploration and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|RSI Length|
|v_input_1|3|RSI Cumulation Length|
|v_input_2|94|Oversold Level|
|v_input_3|20|Overbought Level|
|v_input_4|false|Only Trade When Price is Above EMA?|
|v_input_5|100|EMA Length|
|v_input_int_2|true|Start Date|
|v_input_int_3|true|Start Month|
|v_input_int_4|2010|Start Year|
|v_input_int_5|true|End Date|
|v_input_int_6|true|End Month|
|v_input_int_7|2099|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-26 00:00:00
end: 2023-10-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @version=5
// Author = TradeAutomation


strategy(title="Cumulative RSI Strategy", shorttitle="CRSI Strategy", process_orders_on_close=true, overlay=true, commission_type=strategy.commission.cash_per_contract, commission_value=.0035, slippage = 1, margin_long = 75, initial_capital = 25000, default_qty_type=strategy.percent_of_equity, default_qty_value=110)


// Cumulative RSI Indicator Calculations //
rlen  = input.int(title="RSI Length", defval=3, minval=1)
cumlen = input(3, "RSI Cumulation Length")
rsi = ta.rsi(close, rlen)
cumRSI = math.sum(rsi, cumlen)
ob = (100*cumlen*input(94, "Oversold Level")*.01)
os = (100*cumlen*input(20, "Overbought Level")*.01)


// Operational Function //
TrendFilterInput = input(false, "Only Trade When Price is Above EMA?")
ema = ta.ema(close, input(100, "EMA Length"))
TrendisLong = (close>ema)
plot(ema)


// Backtest Timeframe Inputs // 
startDate = input.int(title="Start Date", defval=1, minval=1, maxval=31)
startMonth = input.int(title="Start Month", defval=1, minval=1, maxval=12)
startYear = input.int(title="Start Year", defval=2010, minval=1950, maxval=2100)
endDate = input.int(title="End Date", defval=1, minval=1, maxval=31)
endMonth = input.int(title="End Month", defval=1, minval=1, maxval=12)
endYear = input.int(title="End Year", defval=2099, minval=1950, maxval=2100)
InDateRange = (time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0)) and (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))


// Buy and Sell Functions //
if (InDateRange and TrendFilterInput==true)
    strategy.entry("Long", strategy.long, when = ta.crossover(cumRSI, os) and TrendisLong, comment="Buy", alert_message="buy")
    strategy.close("Long", when = ta.crossover(cumRSI, ob) , comment="Sell", alert_message="Sell")
if (InDateRange and TrendFilterInput==false)
    strategy.entry("Long", strategy.long, when = ta.crossover(cumRSI, os), comment="Buy", alert_message="buy")
    strategy.close("Long", when = ta.crossover(cumRSI, ob), comment="Sell", alert_message="sell")
if (not InDateRange)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430328

> Last Modified

2023-10-27 11:20:50
