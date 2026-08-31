
> Name

MACD-Trading-Strategy-with-Adaptive-ATR-Stop-Loss

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses the MACD indicator to generate trading signals and adaptive ATR-based stop loss to control risks. It belongs to trend following strategies.

## Strategy Logic

1. MACD delta line crossover 0 produces buy and sell signals.

2. Dynamic stop loss calculated based on recent N periods of ATR, which reflects volatility.

3. Stop loss adjusts adaptively with volatility changes, widening when volatility surges.

4. Update stop loss in real-time when in positions, to lock in profits and control risks.

5. Exit positions when stop loss is triggered to manage risks.

## Advantages

1. MACD is sensitive in tracking trends.

2. Adaptive stops fit different market environments, avoiding stops too tight or loose.

3. Visual stop lines intuitively reflect risk status. 

4. Simple and clear strategy rules, easy to understand and implement.

5. Controllable drawdowns and effective risk management.

## Risks

1. MACD may generate false signals causing unnecessary losses.

2. Improper ATR parameters lead to stops too tight or loose.

3. Risk of stops being triggered too frequently. 

4. Hard to stop out timely when trend reverses.

5. Overfitting risk when optimizing parameters.

## Enhancement

1. Test MACD parameters for optimal combination.

2. Try other stop methods like trailing stops.

3. Optimize stops to balance frequency and risk control.

4. Add trend filter to prevent reversal stops.

5. Consider trading costs impact to avoid overtrading. 

6. Use slippage or enhanced stops to ensure stops triggered.

## Conclusion

This strategy trades MACD signals with adaptive ATR dynamic stops. It features controllable risks and simplicity. But MACD signals may be false, and stops need continual optimization. Overall, with parameter tuning, stop optimization etc, it can become a robust trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|13|fastLength|
|v_input_8|30|slowlength|
|v_input_9|12|MACDLength|
|v_input_10|2|ATR Stop Period|
|v_input_11|1.25|ATR Stop Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-02-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("MACD BF ?", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.0)

/////////////// Time Frame ///////////////
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() =>  true

///////////////  MACD  /////////////// 
fastLength = input(13) 
slowlength = input(30) 
MACDLength = input(12) 

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

///////////////  Strategy  /////////////// 
long = crossover(delta, 0)
short = crossunder(delta, 0)

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
atrLkb = input(2, minval=1, title='ATR Stop Period')
atrMult = input(1.25, step=0.25, title='ATR Stop Multiplier') 
atr1 = atr(atrLkb)

longStop = 0.0
longStop :=  short_signal ? na : long_signal ? close - (atr1 * atrMult) : longStop[1]
shortStop = 0.0
shortStop := long_signal ? na : short_signal ? close + (atr1 * atrMult) : shortStop[1]

/////////////// Execution /////////////// 
if testPeriod()
    strategy.entry("Long", strategy.long, when=long)
    strategy.entry("Short", strategy.short, when=short)
    strategy.exit("Long SL", "Long", stop=longStop, when=since_longEntry > 0)
    strategy.exit("Short SL", "Short", stop=shortStop, when=since_shortEntry > 0)

/////////////// Plotting /////////////// 
barcolor(long ? color.lime : short ? color.red : na)
plot(strategy.position_size <= 0 ? na : longStop, title="Long Stop Loss", color=color.yellow, style=plot.style_circles, linewidth=2)
plot(strategy.position_size >= 0 ? na : shortStop, title="Short Stop Loss", color=color.orange, style=plot.style_circles, linewidth=2)
bgcolor(strategy.position_size > 0 ? color.lime : strategy.position_size < 0 ? color.red : color.white, transp=90)
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=60)
```

> Detail

https://www.fmz.com/strategy/427383

> Last Modified

2023-09-20 15:23:00
