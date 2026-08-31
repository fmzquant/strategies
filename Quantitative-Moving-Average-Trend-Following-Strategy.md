
> Name

Quantitative-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


### Overview 

This strategy calculates two volume weighted moving averages as fast and slow lines. It determines the trend direction based on the difference between the two lines and takes long or short positions accordingly. The strategy is simple and effective in tracking market trends.

### Strategy Logic

1. Calculate fast and slow lines using volume weighted moving averages based on user defined fast and slow periods.

2. Calculate the difference between the fast and slow lines.

3. Determine trend direction. Crossover of fast line above slow line indicates upward trend and crossover below indicates downward trend.

4. Issue long/short signals. Go long when fast line crosses above slow line. Go short when fast line crosses below slow line.

5. Set stop loss based on user defined fixed percentage or dynamic ATR. 

6. Exit rules. Close position if stop loss is hit or reverse signal occurs.

### Advantages

1. Uses quantitative indicator to identify trends and avoid false breakouts.

2. Fast and slow line combo filters out market noise and avoids overtrading.

3. Stop loss effectively controls downside risk.

4. Simple and easy to understand logic.

5. Customizable parameters for different products and timeframes.

### Risks

1. Improper parameter setting may cause overtrading or missed trends.

2. Fixed stop loss may be too rigid for changing market conditions. 

3. Changes in volume and price relationships may impact effectiveness.

- Risk 1 can be mitigated through parameter optimization.

- Risk 2 can be addressed via dynamic ATR stop loss.

- Risk 3 needs monitoring volume changes.

### Enhancement Opportunities

1. Test different fast and slow line parameter combinations.

2. Try other volume-price indicators like OBV, William's %R etc. 

3. Add volatility based stops.

4. Evaluate combining with other indicators.

5. Test effectiveness across different trading instruments.

### Conclusion

This strategy uses fast and slow quantified moving averages to track trends with simple logic. Parameters can be optimized and stops control risk. Further evaluations on combining indicators may improve effectiveness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|════════ Test Period ═══════|
|v_input_2|2017|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|2019|Backtest Stop Year|
|v_input_6|12|Backtest Stop Month|
|v_input_7|31|Backtest Stop Day|
|v_input_8|false|════════ EVMA ═══════|
|v_input_9|5|Fast Sum Length|
|v_input_10|11|Slow Sum Length|
|v_input_11|false|════════ Stop Loss ═══════|
|v_input_12|0|Stop Loss Type: Fixed|ATR Derived|
|v_input_13|9|Fixed Stop Loss %|
|v_input_14|20|ATR Stop Period|
|v_input_15|1.5|ATR Stop Multiplier|
|v_input_16|false|══════ Longs or Shorts ═════|
|v_input_17|true|Use Longs|
|v_input_18|true|Use Shorts|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("EVWMA 6HR", overlay=false, precision=2, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)
// Credit to QuantNomad for the main idea behind this code
/////////////// Time Frame ///////////////
_1 = input(false,  "════════ Test Period ═══════")
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

///////////// EVWMA /////////////
_2 = input(false,  "════════ EVMA ═══════")

fast_sum_length = input(5, title = "Fast Sum Length",  type = input.integer)
slow_sum_length = input(11, title = "Slow Sum Length",  type = input.integer)

fast_vol_period = sum(volume, fast_sum_length)
slow_vol_period = sum(volume, slow_sum_length)

fast_evwma = 0.0
fast_evwma := ((fast_vol_period - volume) * nz(fast_evwma[1], close) + volume * close) / (fast_vol_period)
slow_evwma = 0.0
slow_evwma := ((slow_vol_period - volume) * nz(slow_evwma[1], close) + volume * close) / (slow_vol_period)

diff = fast_evwma - slow_evwma

///////////////  Strategy  /////////////// 
long = fast_evwma > slow_evwma 
short = fast_evwma < slow_evwma 

last_long = 0.0
last_short = 0.0
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = 0.0
last_open_short_signal = 0.0
last_open_long_signal := long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal := short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = 0.0
last_short_signal = 0.0
last_long_signal := long_signal ? time : nz(last_long_signal[1])
last_short_signal := short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = 0.0
last_low = 0.0
last_high := not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

since_longEntry = barssince(last_open_long_signal != last_open_long_signal[1]) 
since_shortEntry = barssince(last_open_short_signal != last_open_short_signal[1]) 

/////////////// Dynamic ATR Stop Losses ///////////////
_4 = input(false,  "════════ Stop Loss ═══════")
SL_type = input("Fixed", options=["Fixed", "ATR Derived"], title="Stop Loss Type")
sl_inp = input(9.0, title='Fixed Stop Loss %') / 100
atrLkb = input(20, minval=1, title='ATR Stop Period')
atrMult = input(1.5, step=0.25, title='ATR Stop Multiplier') 
atr1 = atr(atrLkb)

longStop1 = 0.0
longStop1 :=  short_signal ? na : long_signal ? close - (atr1 * atrMult) : longStop1[1]
shortStop1 = 0.0
shortStop1 := long_signal ? na : short_signal ? close + (atr1 * atrMult) : shortStop1[1]

slLong = in_long_signal ? strategy.position_avg_price * (1 - sl_inp) : na
slShort = strategy.position_avg_price * (1 + sl_inp)
long_sl = in_long_signal ? slLong : na
short_sl = in_short_signal ? slShort : na

_5 = input(false,  "══════ Longs or Shorts ═════")
useLongs = input(true, title="Use Longs")
useShorts = input(true, title="Use Shorts")

/////////////// Execution ///////////////
if testPeriod()
    if useLongs
        strategy.entry("L", strategy.long, when=long)
        strategy.exit("L SL", "L", stop = SL_type == "Fixed" ? long_sl : longStop1, when=since_longEntry > -1)
    if useShorts
        strategy.exit("S SL", "S", stop = SL_type == "Fixed" ? short_sl : shortStop1, when=since_shortEntry > -1)
        strategy.entry("S", strategy.short, when=short)
    if not useShorts
        strategy.close("L", when=short)
    if not useLongs
        strategy.close("S", when=long)

/////////////// Plotting /////////////// 
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=30)
p1 = plot(diff, title = "Delta", color = long ? color.lime : short ? color.red : na, transp=0)
p2 = plot(0, color = color.white)
fill(p1, p2, color = long ? color.lime : short ? color.red : na, transp=60)
```

> Detail

https://www.fmz.com/strategy/427116

> Last Modified

2023-09-18 13:23:52
