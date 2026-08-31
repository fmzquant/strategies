
> Name

基于相对强弱指标RSI策略Momentum-Reversal-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e7840e5f1d2536073b.png)

## Overview 

This is a short-term trading strategy based on the Relative Strength Index (RSI) indicator. It utilizes RSI to identify overbought and oversold levels and combines candlestick filtering to avoid false signals, entering long and short positions at reversal points. The strategy aims to capture mean-reversion opportunities after extreme overbought or oversold conditions.

## Strategy Explanation 

### Logic

Firstly, the RSI indicator is calculated based on the closing price with a period set to 7. The overbought level is set at 70 and the oversold level is set at 30. Buy signals are generated when RSI crosses above 30 and sell signals are generated when RSI crosses below 70.

To filter out false signals, the candlestick body size needs to expand to 1-3 times of the normal range when a trading signal is triggered. Here the strategy requires 1-5 consecutive RSI bars staying in overbought or oversold levels to confirm the signal, with body expansion set to 4 times.

When RSI stays below 30 for 5 consecutive bars, a long signal is generated. If the next candle shows a bullish body expanded more than 4 times, a long position will be executed. When RSI stays above 70 for 5 consecutive bars, a short signal is generated. If the next candle shows a bearish body expanded more than 4 times, a short position will be executed.

To lock in profits, positions will be closed when the current candle direction is consistent with the position direction and the body expands 2 times.

### Advantages

1. Capturing mean-reversion after extreme levels

RSI is good at identifying overbought and oversold conditions. When a stock reaches extreme levels, there is high probability of a pullback, and extreme levels often imply an impending reversal. This strategy is able to capture such opportunities at turning points.

2. Candlestick filtering decreases false signals 

Trading purely based on RSI signals may result in many false signals. This strategy incorporates candlestick body expansion as a filter, entering positions when an enlarged body appears around reversal points, avoiding whipsaws from chaotic markets.

3. Consecutive RSI bars increase reliability

Requiring 1-5 consecutive RSI bars in overbought or oversold zone acts as a confirmation, avoiding false signals from occasional aberrant bars and improving signal reliability.

4. Flexible body expansion multiplier

The body expansion multiplier can be adjusted for different products. For stocks with large swings, the criteria can be relaxed, while for stocks with narrow ranges, it can be tightened. This allows flexible adjustments for different trading products.

### Risks

1. Potential overfitting

The parameter settings have some inherent limitations. Different products and time periods may require parameter tuning. Using fixed settings may lead to overfitting issues.

2. Low accuracy in identifying turns

RSI itself has some lagging properties. Combining with body expansion exits positions prematurely. So the accuracy of catching exact bottoms or tops is generally not very high.

3. Potentially long holding period in ranging markets

In ranging markets, RSI may trigger frequent buy and sell signals, resulting in long holding periods. Parameters should be adjusted or the strategy should be temporarily stopped in such cases.

4. Need proper position sizing strategies

As a short-term trading strategy, proper position sizing strategies should be combined, such as moving stop loss, take profit, etc, to lock in profits and control risks.

### Improvement Ideas

1. Test different parameter sets 

Different combinations of RSI parameters can be tested, such as period, overbought/oversold levels, and candlestick filters, to find optimized parameters for different products.

2. Add stop loss and take profit

Moving or percentage stop loss can be added to lock in profits. Or set stop loss based on ATR values or Donchain channels etc.

3. Combine other indicators as filters

Conditions based on MACD, KDJ and other indicators can be added to avoid wrong signals from invalid breakouts. Volatility indicators can also help identify reversal signals in trends.

4. Add trend bias

Use moving averages to gauge trend bias. Only consider trading signals that align with the trend. The strategy can be paused during range-bound markets. Trend strength indicators can also be used as filters.

## Conclusion

In summary, this RSI reversal strategy is a typical short-term trading strategy with its own pros and cons. The main advantage lies in capturing pullbacks after extremes while the main risk comes from low signal precision and long holding periods in ranges. We can improve the strategy by adjusting parameters, adding filters, optimizing stops, etc, to adapt to more products and market conditions, and achieve more steady results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|RSI Period|
|v_input_2|30|RSI limit|
|v_input_3_close|0|RSI Price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|true|RSI Bars|
|v_input_5|2018|From Year|
|v_input_6|2038|To Year|
|v_input_7|true|From Month|
|v_input_8|12|To Month|
|v_input_9|true|From day|
|v_input_10|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title = "Noro's FRSI Strategy v1.21", shorttitle = "FRSI str 1.21", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, commission_type = strategy.commission.percent, commission_value = 0.0)

//Settings
rsiperiod = input(7, defval = 7, minval = 2, maxval = 50, title = "RSI Period")
limit = input(30, defval = 30, minval = 1, maxval = 100, title = "RSI limit")
rsisrc = input(close, defval = close, title = "RSI Price")
rb = input(1, defval = 1, minval = 1, maxval = 5, title = "RSI Bars")
sps = 0
fromyear = input(2018, defval = 2018, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2038, defval = 2018, minval = 1900, maxval = 2100, title = "To Year")
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

//Signals
up = bar == -1 and sps == 0 and dnrsi and body > emabody / 4
dn = bar == 1 and sps == 0 and uprsi and body > emabody / 4
exit = bar == 1 and fastrsi > dnlimit and body > emabody / 2

//Trading
if up
    strategy.entry("Long", strategy.long, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 00, 00)))
    sps := 1

if time > timestamp(toyear, tomonth, today, 00, 00) or exit
    strategy.close_all()
    sps := 0
    
```

> Detail

https://www.fmz.com/strategy/432219

> Last Modified

2023-11-15 16:29:25
