
> Name

The-Dual-Quant-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f530326709a9a1a89d.png)

This strategy combines the CCI indicator, RSI indicator and two moving averages into a compound trading system. It can capture conventional trends while using RSI crossovers to add confirmation for entries to filter out some noise.

### Strategy Principle  

The strategy mainly uses the CCI indicator to determine the trend direction. CCI readings above 100 indicate a bullish market, while those below -100 indicate a bearish market. The system uses two moving average crossovers to assist in determining the trend direction. When the fast moving average crosses above the slow moving average, it is a buy signal, and vice versa for sell signals.

After determining the bullish or bearish trend, the system then uses the crossover of two RSIs with different parameter lengths as entry verification. For example, in a bull market, if the short-period RSI crosses above the long-period RSI, it is the final buy signal. This design mainly filters out noise to avoid wrong trades triggered by short-term corrections during trends.

The strategy only opens positions during the specified trading session, actively closing all positions 15 minutes before the close to avoid overnight risk. After opening positions, trailing stops are used to lock in profits.


### Advantage Analysis  

- Combining trend judgment and indicator crossovers can effectively identify trends and filter out noise for precise entries
- Using trailing stops to actively control risks avoids being stopped out due to flash crashes
- Only opening positions during specified trading sessions avoids overnight gap risk 
- Adjustable RSI parameters can flexibly adapt to different market environments


### Risk Analysis

- CCI shows poor performance in unusually volatile markets  
- Dual RSI cross conditions are relatively strict, potentially missing some opportunities
- Trailing stops could be overly subjective, requiring parameter optimization
- Specified trading sessions may miss major overnight news gaps


### Optimization Suggestions

- Test different CCI parameter combinations to find optimal settings
- Test removing the RSI crossover condition and directly entering based on CCI 
- Backtest and optimize trailing stop parameters to find optimal settings  
- Test removing forced position closing logic and instead track profits with trailing stops during positions to maximize profits


### Summary  

This strategy comprehensively considers trend determination and indicator crossover validation to ensure signal validity while controlling risk. Through parameter optimization and logic adjustments, the strategy has further potential to expand profit opportunities and reduce missed chances. This is a very promising trading concept.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast EMA Length|
|v_input_2|20|Slow EMA Length|
|v_input_int_3|20|cciLength|
|v_input_3_hlc3|0|Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_float_1|0.5|Trail Loss($)|
|v_input_4|0930-1545|open_session|
|v_input_int_1|9|(?RSI Settings)RSI Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|20|RSI Length|
|v_input_source_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rwestbrookjr

//@version=5
strategy("EMA with RSI Cross Strategy", overlay=true)

//EMA
fastLen = input(title='Fast EMA Length', defval=9)
slowLen = input(title='Slow EMA Length', defval=20)

fastEMA = ta.ema(close, fastLen)
slowEMA = ta.ema(close, slowLen)

fema = plot(fastEMA, title='FastEMA', color=color.new(color.green, 0), linewidth=1, style=plot.style_line)
sema = plot(slowEMA, title='SlowEMA', color=color.new(color.red, 0), linewidth=1, style=plot.style_line)

fill(fema, sema, color=fastEMA > slowEMA ? color.new(#417505, 50) : color.new(#890101, 50), title='Cloud')

// Bull and Bear Alerts
//Bull = ta.crossover(fastEMA, slowEMA)
Bull = fastEMA > slowEMA
//Bear = ta.crossunder(fastEMA, slowEMA)
Bear = fastEMA < slowEMA

//RSIs
rsiLength1Input = input.int(9, minval=1, title="RSI Length", group="RSI Settings")
rsiSource1Input = input.source(close, "Source", group="RSI Settings")
rsiLength2Input = input.int(20, minval=1, title="RSI Length", group="RSI Settings")
rsiSource2Input = input.source(close, "Source", group="RSI Settings")

up1 = ta.rma(math.max(ta.change(rsiSource1Input), 0), rsiLength1Input)
down1 = ta.rma(-math.min(ta.change(rsiSource1Input), 0), rsiLength1Input)
rsi = down1 == 0 ? 100 : up1 == 0 ? 0 : 100 - (100 / (1 + up1 / down1))
up2 = ta.rma(math.max(ta.change(rsiSource2Input), 0), rsiLength2Input)
down2 = ta.rma(-math.min(ta.change(rsiSource2Input), 0), rsiLength2Input)
rsi2 = down2 == 0 ? 100 : up2 == 0 ? 0 : 100 - (100 / (1 + up2 / down2))

//CCI
cciLength = input.int(20, minval=1)
src = input(hlc3, title="Source")
ma = ta.sma(src, cciLength)
cci = (src - ma) / (0.015 * ta.dev(src, cciLength))

//Trail Stop Setup
trstp = input.float(title="Trail Loss($)", minval = 0.0, step = 0.01, defval = 0.5)

longStop = 0.0, shortStop = 0.0

longStop := if Bull
    stopValue = close - trstp
    math.max(stopValue, longStop[1])
else
    0.0

shortStop := if Bear
    stopValue = close + trstp
    math.min(stopValue, shortStop[1])
else
    999999


//Session Setup
open_session=input(defval="0930-1545")
session = time("1", open_session)
validSession=(na(session) ? 0 : 1)

//Trade Signals
longCondition = Bull and cci > 100 and ta.crossover(rsi,rsi2) and validSession
if (longCondition)
    strategy.entry("Long", strategy.long, 1)
    
//longExit = close > strategy.opentrades.entry_price(0) + 1.5 or close < strategy.opentrades.entry_price(0) - 0.75
longExit = close < longStop or not validSession
if (longExit)
    strategy.close("Long")

shortCondition = Bear and cci < 100 and ta.crossunder(rsi,rsi2) and validSession
if (shortCondition)
    strategy.entry("Short", strategy.short, 1)

//shortExit = close < strategy.opentrades.entry_price(0) - 1.5 or close > strategy.opentrades.entry_price(0) + 0.75
shortExit = close > shortStop or not validSession
if (shortExit)
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/442839

> Last Modified

2024-02-26 14:30:54
