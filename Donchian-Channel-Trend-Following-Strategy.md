
> Name

Donchian-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

## Overview  

The Donchian Channel trend following strategy is a trend following strategy based on the Donchian Channel indicator. It uses Donchian Channels of different lengths to identify price trends and generate trading signals when prices break out of the channels.  

The main idea of this strategy is to use a longer-period Donchian Channel to determine the major trend direction and a shorter-period Donchian Channel as the signal for entry and stop loss. It aims to capture medium-to-long term price trends without being misled by short-term fluctuations in the market.  

## Strategy Logic

1. Calculate the highest closing price and lowest closing price over a long period (e.g. 50 days) to build the Donchian Channel. A breakout above the upper band indicates an uptrend while a breakout below the lower band indicates a downtrend. This determines the major trend direction.  

2. Use the highest closing price and lowest closing price over a short period (e.g. 20 days) as the criteria for entry and stop loss. When price breaks out of the long-period channel, if the closing price also breaks the short-period channel, take a long/short position accordingly.

3. When holding a long position, if price falls below the short-period lower band, stop out at loss. When holding a short position, if price breaks above the short-period upper band, stop out at loss.  

4. The stop loss is set at N times ATR. This automatically adjusts based on market volatility, making it less likely for stop loss to be hit.

5. There is an option to close positions before the trading session ends or hold positions until hit stop loss. This is controlled by an input parameter.  

The strategy considers both trend identification and profit stop loss. It can capture price trends while controlling risks. It is suitable for medium-to-long term trading.

## Advantage Analysis  

1. Effectively identifies medium-to-long term trends without being interfered by short-term market noises.  

2. Automatic stop loss mechanism limits per trade loss. 

3. ATR-based stop loss adjusts stop distance based on market volatility, lowering the chance of stop loss being hit.

4. Automatically close positions when trading is not possible to manage risks.

5. Simple and clear strategy logic that is easy to understand.  

## Risk Analysis   

1. In non-trending markets, the strategy may generate more trades, increasing trading costs and chances of loss.  

2. Although having a stop loss mechanism, price gaps in volatile conditions may penetrate the stop loss point directly causing huge loss.  

3. ATR calculation is solely based on historical data and cannot precisely predict future price moves and volatility. Actual stop distance may be too wide or too narrow.  

4. Stop loss orders may not always get filled in live trading. They could be skipped in extreme volatile conditions causing loss.

## Optimization Directions   

1. Adjust Donchian Channel parameters to optimize trend identification performance.  

2. Incorporate other indicators like MACD, KDJ to confirm trading signals and improve strategy stability.

3. Add trailing stop loss to move stop loss point along with price, further limiting losses.  

4. Test the impact of different holding periods to find optimal overall results.  

5. Consider dynamically adjusting position sizing, enlarging positions in trending conditions.

## Summary   

The Donchian Channel trend following strategy integrates trend identification and risk control. It aims to generate excess returns by identifying trends while controlling tail risks with stop loss mechanisms. This strategy suits identifying and capturing medium-to-long term price trends. With parameter optimization and mechanism enhancements, it can achieve steady positive results.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Lenght: 20/10|50/20|50/50|20/20|100/100|
|v_input_bool_1|true|Permit long|
|v_input_bool_2|true|Permit short|
|v_input_float_1|0.5|Position Risk %|
|v_input_float_2|2|ATR mult|
|v_input_int_1|20|ATR Length|
|v_input_bool_3|true|Close in end|
|v_input_bool_4|true|Permit stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Donchian", overlay=true, calc_on_every_tick=true)

// =============================================================================
// VARIABLES
// =============================================================================

donch_string = input.string(title="Lenght", options = ['20/10','50/20', '50/50', '20/20', '100/100'], defval='20/10')
permit_long  = input.bool(title = 'Permit long', defval = true)
permit_short  = input.bool(title = 'Permit short', defval = true)
risk_percent = input.float(title="Position Risk %", defval=0.5, step=0.25)
stopOffset = input.float(title="ATR mult", defval=2.0, step=0.5)
atrLen = input.int(title="ATR Length", defval=20)
close_in_end  = input.bool(title = 'Close in end', defval = true)
permit_stop  = input.bool(title = 'Permit stop', defval = true)


// =============================================================================
// CALCULATIONS
// =============================================================================

donch_len_big = 
 donch_string == '50/20' ? 50 : 
 donch_string == '50/50' ? 50 : 
 donch_string == '20/20' ? 20 : 
 donch_string == '20/10' ? 20 : 
 donch_string == '100/100' ? 100 : 
 na
donch_len_small = 
 donch_string == '50/20' ? 20 : 
 donch_string == '50/50' ? 50 : 
 donch_string == '20/20' ? 20 : 
 donch_string == '20/10' ? 10 : 
 donch_string == '100/100' ? 100 : 
 na

big_maxclose = ta.highest(close, donch_len_big)
big_minclose = ta.lowest(close, donch_len_big)

small_maxclose = ta.highest(close, donch_len_small)
small_minclose = ta.lowest(close, donch_len_small)

atrValue = ta.atr(atrLen)[1]

tradeWindow  = true

// =============================================================================
// NOTOPEN QTY
// =============================================================================

risk_usd     = (risk_percent / 100) * strategy.equity
atr_currency = (atrValue * syminfo.pointvalue)
notopen_qty  = risk_usd / (stopOffset * atr_currency)

// =============================================================================
// LONG STOP
// =============================================================================

long_stop_price = 0.0
long_stop_price := 
 strategy.position_size > 0 and na(long_stop_price[1]) ? strategy.position_avg_price - stopOffset * atrValue : 
 strategy.position_size > 0 and strategy.openprofit > risk_usd ? strategy.position_avg_price:
 strategy.position_size > 0 ? long_stop_price[1] : 
 na

// =============================================================================
// SHORT STOP
// =============================================================================

short_stop_price = 0.0
short_stop_price := 
 strategy.position_size < 0 and na(short_stop_price[1]) ? strategy.position_avg_price + stopOffset * atrValue : 
 strategy.position_size < 0 and strategy.openprofit > risk_usd ? strategy.position_avg_price :
 strategy.position_size < 0 ? short_stop_price[1] : 
 na

// =============================================================================
// PLOT BG VERTICAL COLOR
// =============================================================================

cross_up = strategy.position_size <= 0 and close == big_maxclose and close >= syminfo.mintick and tradeWindow and permit_long
cross_dn =  strategy.position_size >= 0 and close == big_minclose and close >= syminfo.mintick and tradeWindow and permit_short
bg_color = cross_up ? color.green : cross_dn ? color.red : na
bg_color := color.new(bg_color, 70)
bgcolor(bg_color)

// =============================================================================
// PLOT HORIZONTAL LINES
// =============================================================================

s1 = cross_up ? na : cross_dn ? na : strategy.position_size != 0 ? strategy.position_avg_price : na
s2 = cross_up ? na : cross_dn ? na : strategy.position_size > 0 ? small_minclose : strategy.position_size < 0 ? small_maxclose : na
s3 = cross_up ? na : cross_dn ? na : not permit_stop ? na : 
 strategy.position_size > 0 ? long_stop_price : strategy.position_size < 0 ? short_stop_price : na

plot(series=big_maxclose, style=plot.style_linebr, color=color.black, linewidth=1, title="Donch Big Maxclose Black")
plot(series=big_minclose, style=plot.style_linebr, color=color.black, linewidth=1, title="Donch Big Minclose Black")

plot(series=s1, style=plot.style_linebr, color=color.yellow, linewidth=2, title="Entry Yellow")
plot(series=s2, style=plot.style_linebr, color=color.red, linewidth=1, title="Donch Small Red")
plot(series=s3, style=plot.style_linebr, color=color.fuchsia, linewidth=2, title="Stop Fuchsia")

// =============================================================================
// ENTRY ORDERS
// =============================================================================

if strategy.position_size <= 0 and close == big_maxclose and close >= syminfo.mintick and tradeWindow and permit_long
    strategy.entry("Long", strategy.long, qty=notopen_qty)

if (strategy.position_size >= 0) and close == big_minclose and close >= syminfo.mintick and tradeWindow and permit_short
    strategy.entry("Short", strategy.short, qty=notopen_qty)

// =============================================================================
// EXIT ORDERS
// =============================================================================

if strategy.position_size > 0 and permit_stop
    strategy.exit(id="Stop", from_entry="Long", stop=long_stop_price)

if strategy.position_size < 0 and permit_stop
    strategy.exit(id="Stop", from_entry="Short", stop=short_stop_price)

// ==========

if strategy.position_size > 0 and close == small_minclose and not barstate.islast
    strategy.close(id="Long", comment='Donch')

if strategy.position_size < 0 and close == small_maxclose and not barstate.islast
    strategy.close(id="Short", comment='Donch')

// ==========

if close_in_end
    if not tradeWindow
        strategy.close_all(comment='In end')

// =============================================================================
// END
// =============================================================================
```

> Detail

https://www.fmz.com/strategy/439623

> Last Modified

2024-01-22 12:30:05
