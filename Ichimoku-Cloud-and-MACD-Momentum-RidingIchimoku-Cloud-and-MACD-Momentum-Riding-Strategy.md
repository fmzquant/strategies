
> Name

Ichimoku-Cloud-and-MACD-Momentum-RidingIchimoku-Cloud-and-MACD-Momentum-Riding-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/148fc7accad9c45cf24.png)

[trans]

## 概述

Ichimoku Cloud and MACD Momentum Riding是一个结合Ichimoku云图指标和MACD动量指标的趋势跟踪策略。该策略利用Ichimoku云图判断趋势方向和支持与阻力位,以及MACD指标判断动量反转,在趋势中择时进入场内。同时,策略采用追踪止损来锁定利润,降低回撤。

## 策略原理

### Ichimoku云图

Ichimoku云图由转向线(Tenkan-Sen)、基准线(Kijun-Sen)、先行线(Senkou-Span A)、延迟线(Senkou-Span B)和确认线(Chikou-Span)组成。该策略使用以下信号来判断趋势方向和支持阻力:

- 价格在云图上方,为上升趋势
- 价格在云图下方,为下降趋势
- 转向线上穿基准线,为多头信号  
- 转向线下穿基准线,为空头信号

### MACD指标  

Moving Average Convergence Divergence,即MACD,是一种动量指标。该策略中MACD的快线上穿慢线为做多信号,下穿为做空信号。

### 入场与退出

当转向线上穿基准线,延迟线上穿前26根K线的收盘价,收盘价突破云图上沿,且MACD金叉时,做多入场。  

当价格上涨3%时,策略会移动止损线至当前价格的97%,以锁定利润并跟踪价格上涨。如果回撤超过3%,则止损退出。

当转向线下穿基准线,延迟线下穿前26根K线的收盘价,收盘价跌破云图下沿,且MACD死叉时,做空入场。

当价格下跌3%时,策略会移动止损线至当前价格的103%,以锁定利润并跟踪价格下跌。如果回升超过3%,则止损退出。


## 优势分析

这种策略结合趋势判断和入场时机把握,可以在趋势行情中获得较好收益。

1. Ichimoku云图可以清楚判断趋势方向。策略只在云图方向一致时入场,避免逆势操作。

2. MACD可有效判断短期动量反转。结合云图判断,可提高入场精准度。  

3. 追踪止损使得策略可在趋势中长期运行。策略可配合资金管理有效控制单笔交易风险。


## 风险分析

该策略也存在一定风险:  

1. 云图生成需要较长数据周期,在短期内判断可能不准。

2. MACD作为随价格波动的指标,容易产生误信号。应结合更多指标修正判断。  

3. 追踪止损只适合趋势行情,应适当调整止损幅度。否则在震荡行情中可能过于频繁止损。

4. 策略本身并无风控模块,用户应配合资金管理来控制亏损。


## 优化方向  

关于Ichimoku Cloud and MACD Momentum Riding策略,可从以下几个方向进行优化:

1. 优化参数,调整转向线、基准线等的周期参数,优化MACD的参数,使信号更明确。

2. 增加过滤条件,结合RSI、布林带等其他指标来验证信号,减少误判率。 

3. 增加动态止损,根据市场波动程度和风险偏好动态调整止损幅度。

4. 结合资金管理,限制单笔损失占比,有效控制总体亏损。

5. 开发自动选择合约、调仓的功能。扩大策略适应性,在更多市场中运用。


## 总结  

Ichimoku Cloud and MACD Momentum Riding策略是一个既考虑趋势判断又兼顾交易信号的量化策略。在unfinished参数优化和风控措施的配合下,该策略可以获得较好的策略收益率。它适合有一定量化和编程基础的投资人作为趋势跟踪策略使用,也为量化初学者提供了一个参考实例来学习指标结合和策略开发。


||


## Overview

The Ichimoku Cloud and MACD Momentum Riding is a trend following strategy combining the Ichimoku Cloud indicator and the MACD momentum indicator. The strategy utilizes the Ichimoku Cloud to determine trend direction and support/resistance levels, as well as the MACD indicator to detect momentum reversal, and enters the market timed during a trend. Meanwhile, the strategy adopts a trailing stop loss to lock in profits and reduce drawdowns.

## Strategy Logic  

### Ichimoku Cloud  

The Ichimoku Cloud consists of the Turning Line (Tenkan-Sen), Base Line (Kijun-Sen), Leading Span A (Senkou-Span A), Leading Span B (Senkou-Span B) and Confirmation Line (Chikou-Span). The strategy uses the following signals to determine trend direction and support/resistance:  

- Price above Cloud - Uptrend
- Price below Cloud - Downtrend 
- Turning Line crosses above Base Line - Bullish signal
- Turning Line crosses below Base Line - Bearish signal

### MACD Indicator 

The Moving Average Convergence Divergence, or MACD, is a momentum indicator. In this strategy, when MACD's fast line crosses above slow line it's a buy signal, and when fast line crosses below slow line it's a sell signal.  

### Entries and Exits  

When Turning Line crosses above Base Line, Confirmation Line crosses above close price of 26 bars ago, close price breaks above top band of Cloud, and MACD's fast line has bullish crossover over slow line, go long.   

When price rises 3%, the strategy will move stop loss to 97% of current price to lock in profits and trail the upside move. If drawdown exceeds 3%, stop out with loss.  

When Turning Line crosses below Base Line, Confirmation Line crosses below close price of 26 bars ago, close price breaks below bottom band of Cloud, and MACD's fast line has bearish crossover below slow line, go short.  

When price drops 3%, the strategy will move stop loss to 103% of current price to lock in profits and trail the downside move. If rise exceeds 3%, stop out with loss.


## Advantage Analysis  

This strategy combines trend identification and timing of entry, which can achieve good returns during trending markets.

1. Ichimoku Cloud can clearly identify trend direction. The strategy only enters aligning with Cloud direction, avoiding counter-trend trades.  

2. MACD is effective in detecting short-term momentum reversals. Combining with Cloud it improves entry accuracy.   

3. Trailing stop loss allows the strategy to keep running during a trend. Proper position sizing ensures controlled risk per trade.


## Risk Analysis   

There are also certain risks with this strategy:   

1. Cloud needs relatively long lookback periods and may give inaccurate signals in the short term.  

2. MACD oscillates with price and can generate false signals. More filters are needed to confirm signals.

3. Trailing stop loss only suits trending markets. Stop loss percentage needs to be adjusted accordingly, otherwise whipsaws may stop out too frequently during ranging markets.  

4. The strategy itself does not manage risk. User needs to implement external risk management techniques to control losses.


## Optimization Directions   

The Ichimoku Cloud and MACD Momentum Riding strategy can be optimized in the following ways:  

1. Parameter tuning - Adjust Turning Line, Base Line lookback periods, optimize MACD parameters for clearer signals.  

2. Add filtration - Use other indicators like RSI, Bollinger Bands to filter out bad signals, reducing false signals.

3. Dynamic stops - Base stop loss percentage on market volatility and risk preference.

4. Incorporate position sizing - Limit max loss per trade to control overall drawdown.  

5. Auto selecting contracts & rebalancing - Expand adaptability to more markets.


## Conclusion   

The Ichimoku Cloud and MACD Momentum Riding strategy considers both trend and timing, which can achieve good return when parameters are properly tuned and risk controls are in place. It suits investors with some programming skills as a trend following strategy, and serves as a reference to quant trading beginners for learning technical indicators and strategy development.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_int_1|9|Tenkan-Sen Bars|
|v_input_int_2|26|Kijun-Sen Bars|
|v_input_int_3|52|Senkou-Span B Bars|
|v_input_int_4|26|Chikou-Span Offset|
|v_input_int_5|26|Senkou-Span Offset|
|v_input_2|true|Long Entry|
|v_input_3|true|Short Entry|
|v_input_float_1|3|Trail Long Loss (%)|
|v_input_float_2|3|Trail Short Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-03 05:20:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Ichimoku Cloud with MACD and Trailing Stop Loss',
         overlay=true,
         initial_capital=1000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=30,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2022, 6, 1, 0, 0)


// Inputs
ts_bars = input.int(9, minval=1, title='Tenkan-Sen Bars')
ks_bars = input.int(26, minval=1, title='Kijun-Sen Bars')
ssb_bars = input.int(52, minval=1, title='Senkou-Span B Bars')
cs_offset = input.int(26, minval=1, title='Chikou-Span Offset')
ss_offset = input.int(26, minval=1, title='Senkou-Span Offset')
long_entry = input(true, title='Long Entry')
short_entry = input(true, title='Short Entry')

middle(len) => math.avg(ta.lowest(len), ta.highest(len))

// Ichimoku Components
tenkan = middle(ts_bars)
kijun = middle(ks_bars)
senkouA = math.avg(tenkan, kijun)
senkouB = middle(ssb_bars)

// Plot Ichimoku Kinko Hyo
plot(tenkan, color=color.new(#0496ff, 0), title='Tenkan-Sen')
plot(kijun, color=color.new(#991515, 0), title='Kijun-Sen')
plot(close, offset=-cs_offset + 1, color=color.new(#459915, 0), title='Chikou-Span')
sa = plot(senkouA, offset=ss_offset - 1, color=color.new(color.green, 0), title='Senkou-Span A')
sb = plot(senkouB, offset=ss_offset - 1, color=color.new(color.red, 0), title='Senkou-Span B')
fill(sa, sb, color=senkouA > senkouB ? color.green : color.red, title='Cloud color', transp=90)

ss_high = math.max(senkouA[ss_offset - 1], senkouB[ss_offset - 1])
ss_low = math.min(senkouA[ss_offset - 1], senkouB[ss_offset - 1])


// MACD
[macd, macd_signal, macd_histogram] = ta.macd(close, 12, 26, 9)


// Entry/Exit Signals
tk_cross_bull = tenkan > kijun
tk_cross_bear = tenkan < kijun
cs_cross_bull = ta.mom(close, cs_offset - 1) > 0
cs_cross_bear = ta.mom(close, cs_offset - 1) < 0
price_above_kumo = close > ss_high
price_below_kumo = close < ss_low

bullish = tk_cross_bull and cs_cross_bull and price_above_kumo and ta.crossover(macd, macd_signal)
bearish = tk_cross_bear and cs_cross_bear and price_below_kumo and ta.crossunder(macd, macd_signal)

// Configure trail stop level with input options
longTrailPerc = input.float(title='Trail Long Loss (%)', minval=0.0, step=0.1, defval=3) * 0.01
shortTrailPerc = input.float(title='Trail Short Loss (%)', minval=0.0, step=0.1, defval=3) * 0.01

// Determine trail stop loss prices
longStopPrice = 0.0
shortStopPrice = 0.0

longStopPrice := if strategy.position_size > 0
    stopValue = close * (1 - longTrailPerc)
    math.max(stopValue, longStopPrice[1])
else
    0

shortStopPrice := if strategy.position_size < 0
    stopValue = close * (1 + shortTrailPerc)
    math.min(stopValue, shortStopPrice[1])
else
    999999

strategy.entry('Long', strategy.long, when=bullish and long_entry and timePeriod)
strategy.exit('Exit', stop = longStopPrice, limit = shortStopPrice)
//strategy.close('Long', when=bearish and not short_entry)

//strategy.entry('Short', strategy.short, when=bearish and short_entry and timePeriod)
//strategy.close('Short', when=bullish and not long_entry)



```

> Detail

https://www.fmz.com/strategy/432875

> Last Modified

2023-11-22 13:59:36
