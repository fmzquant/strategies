
> Name

Ichimoku-Cloud-with-MACD-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This is a cryptocurrency trading strategy that combines the Ichimoku Cloud indicator and the MACD indicator. It utilizes the Ichimoku Cloud to determine the overall trend direction and support/resistance levels, and the MACD to gauge short-term trend and momentum, generating trading signals. This strategy can effectively identify medium to long term trends and promptly adjust positions when the trend changes direction.

## Strategy Logic

The strategy uses the crossover of the conversion line and base line of the Ichimoku Cloud to determine the medium-term trend, and the MACD indicator to determine the short-term trend and momentum. 

When the conversion line crosses above the base line, it's a bullish signal and the price being above the cloud indicates a strong trend. When the conversion line crosses below the base line, it's a bearish signal and the price being below the cloud indicates a weak trend.

When the MACD histogram is above the zero line, it signals bullish momentum, and when it's below the zero line, it signals bearish momentum. When the MACD line crosses above the signal line, it generates a buy signal, and when it crosses below, it generates a sell signal.

The specific trading rules are as follows:

Long entry signal: Conversion line crosses above base line, price crosses above cloud, MACD line crosses above signal line, go long.
Long exit signal: Conversion line crosses below base line, price crosses below cloud, MACD line crosses below signal line, close long position.

Short entry signal: Conversion line crosses below base line, price crosses below cloud, MACD line crosses below signal line, go short.  
Short exit signal: Conversion line crosses above base line, price crosses above cloud, MACD line crosses above signal line, close short position.

## Advantages of the Strategy

1. The Ichimoku Cloud can determine medium to long term trends, and the MACD short term trends. Combining the two can capture trading opportunities across different timeframes.

2. The cloud levels of the Ichimoku Cloud clearly indicate support and resistance zones. 

3. The MACD is effective at gauging short term overbought and oversold conditions, avoiding whipsaws in range-bound markets.

4. The strategy parameters are optimized and can work for various cryptocurrencies, providing some robustness.

## Risks of the Strategy

1. The Ichimoku Cloud and MACD can generate false signals, requiring confirmation from other indicators.

2. Divergence often occurs in ranging markets, requiring parameter tweaking or suspending trading.

3. Thick clouds require clear breakouts before entering, potentially missing some opportunities. 

4. Insufficient backtesting data, requiring longer timeframes for parameter optimization.

Risks can be managed by confirming signals with other indicators, adjusting parameters to market conditions, or suspending trading in certain periods.

## Optimization Directions

1. Optimize Ichimoku parameters by adjusting conversion and base line periods to better fit different assets.

2. Optimize MACD parameters by adjusting fast, slow and signal smoothing periods for more accurate signals.

3. Add stop loss strategy to cut losses when drawdown reaches certain threshold.

4. Add position sizing to adjust percentage of capital risked per trade based on market conditions.

5. Test strategy on different cryptocurrency data to evaluate robustness. 

6. Incorporate additional indicators to filter out false signals.

## Conclusion

This strategy combines the strengths of the Ichimoku Cloud and MACD indicators, using conversion and base lines to determine medium-term trend direction, and the MACD to gauge short-term overbought/oversold levels, generating trading signals. The parameters can be optimized for different assets, and other indicators or stop losses added to manage risk. It works well for different cryptocurrencies, but false signals in choppy markets need to be watched out for through parameter tuning and risk management to improve robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_2|true|Stop_loss|
|v_input_3|5|Take_profit|
|v_input_int_1|9|Tenkan-Sen Bars|
|v_input_int_2|26|Kijun-Sen Bars|
|v_input_int_3|52|Senkou-Span B Bars|
|v_input_int_4|26|Chikou-Span Offset|
|v_input_int_5|26|Senkou-Span Offset|
|v_input_4|true|Long Entry|
|v_input_5|true|Short Entry|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-08 00:00:00
end: 2023-10-15 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=5
strategy('Ichimoku Cloud with MACD (By Coinrule)',
         overlay=true,
         initial_capital=1000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=30,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2022, 6, 1, 0, 0)


// Stop Loss and Take Profit for Shorting
Stop_loss = input(1) / 100
Take_profit = input(5) / 100
longStopPrice = strategy.position_avg_price * (1 - Stop_loss)
longTakeProfit = strategy.position_avg_price * (1 + Take_profit)


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

strategy.entry('Long', strategy.long, when=bullish and long_entry and timePeriod)
strategy.close('Long', when=bearish and not short_entry)

strategy.entry('Short', strategy.short, when=bearish and short_entry and timePeriod)
strategy.close('Short', when=bullish and not long_entry)



```

> Detail

https://www.fmz.com/strategy/429334

> Last Modified

2023-10-16 09:02:29
