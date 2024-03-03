
> Name

可配置化双向超趋策略Configurable-Dual-direction-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
本策略名称为“可配置化双向超趋策略”。该策略利用超趋止损方式识别价格趋势,并可以分别配置做多做空的参数,实现精确的趋势追踪交易。

超趋止损的计算方式是:以ATR值乘以一个coefficients构建价格通道,通道上沿为做多止损线,通道下沿为做空止损线。价格突破通道时产生交易信号。

该策略的创新之处在于,做多和做空的参数可以独立配置:

1. ATR周期、ATR coefficients等超趋参数可分别设定;

2. 最大持仓周期也可分别配置,从而调整盈利目标;

3. 止损方式(固定百分比止损或ATR跟踪止损)也可不同设置。

这使策略可以仅做多、仅做空或双向交易,更贴合特定市场行情的需要。

该策略优势是超趋止损判断简单直观,可配置参数组合丰富。但超趋本身容易被突破,需要辅助判断。参数优化也很关键。

总之,可配置双向超趋策略提高了趋势交易的精确度,但核心思想仍是简单的参数组合,易于实盘应用。


||



This strategy is named “Configurable Dual-direction Supertrend Strategy”. It uses the Supertrend trailing stop mechanism to identify price trends, and allows separate parameter configuration for long and short trades, enabling precise trend following. 

The Supertrend calculation is: using ATR multiplied by a coefficient to build price channels. The upper band is the long stop loss and the lower band is the short stop loss. Price breaking the channel generates trade signals.

The innovation is the independent parameter configuration for long and short:

1. Supertrend parameters like ATR period and coefficient can be set separately. 

2. Maximum holding period can also be configured independently to adjust profit targets.

3. Stop loss methods (fixed percentage or ATR trailing) can also be set differently.

This allows only-long, only-short or dual-direction trading to better fit specific market conditions.

The advantages are the intuitive Supertrend mechanism and abundant configurable combinations. But Supertrend alone is prone to breaches and needs confirmation. Parameter optimization is also crucial.

In summary, the configurable dual Supertrend strategy improves trend trading precision, while keeping the core idea simple for practical application.

[/trans]


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
|v_input_8|false|═════ Super Trend L ═════|
|v_input_9|2|ATR Period|
|v_input_10|1.5|ATR Multiplier|
|v_input_11|false|═════ Super Trend S ═════|
|v_input_12|3|ATR Period|
|v_input_13|1.3|ATR Multiplier|
|v_input_14|false|═════ Rate of Change L ═════|
|v_input_15|30|ROC Length|
|v_input_16|6|ROC % Change|
|v_input_17|false|═════ Rate of Change S ═════|
|v_input_18|76|ROC Length|
|v_input_19|6|ROC % Change|
|v_input_20|false|═══════ Stop Loss L ══════|
|v_input_21|0|Stop Loss Type: Fixed|ATR Derived|
|v_input_22|6|Fixed Stop Loss %|
|v_input_23|20|ATR Stop Period|
|v_input_24|1.5|ATR Stop Multiplier|
|v_input_25|false|═══════ Stop Loss S ══════|
|v_input_26|0|Stop Loss Type: Fixed|ATR Derived|
|v_input_27|6|Fixed Stop Loss %|
|v_input_28|20|ATR Stop Period|
|v_input_29|1.5|ATR Stop Multiplier|
|v_input_30|false|══════ Longs or Shorts ═════|
|v_input_31|true|Use Longs|
|v_input_32|true|Use Shorts|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-12 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_8",true],["v_input_11",true]]
*/

//@version=4
strategy("Super Trend Daily 2.0 BF ?", overlay=true, precision=2, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

/////////////// Time Frame ///////////////
_0 = input(false,  "════════ Test Period ═══════")
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

///////////// Super Trend Long /////////////
_1 = input(false,  "═════ Super Trend L ═════")
lengthl = input(title="ATR Period", type=input.integer, defval=2)
multl = input(title="ATR Multiplier", type=input.float, step=0.1, defval=1.5)

atrl = multl * atr(lengthl)

longStopl = hl2 - atrl
longStopPrevl = nz(longStopl[1], longStopl)
longStopl :=  close[1] > longStopPrevl ? max(longStopl, longStopPrevl) : longStopl

shortStopl = hl2 + atrl
shortStopPrevl = nz(shortStopl[1], shortStopl)
shortStopl := close[1] < shortStopPrevl ? min(shortStopl, shortStopPrevl) : shortStopl

dirl = 1
dirl := nz(dirl[1], dirl)
dirl := dirl == -1 and close > shortStopPrevl ? 1 : dirl == 1 and close < longStopPrevl ? -1 : dirl

///////////// Super Trend Short /////////////
_2 = input(false,  "═════ Super Trend S ═════")
lengths = input(title="ATR Period", type=input.integer, defval=3)
mults = input(title="ATR Multiplier", type=input.float, step=0.1, defval=1.3)

atrs = mults * atr(lengths)

longStops = hl2 - atrs
longStopPrevs = nz(longStops[1], longStops)
longStops :=  close[1] > longStopPrevs ? max(longStops, longStopPrevs) : longStops

shortStops = hl2 + atrs
shortStopPrevs = nz(shortStops[1], shortStops)
shortStops := close[1] < shortStopPrevs ? min(shortStops, shortStopPrevs) : shortStops

dirs = 1
dirs := nz(dirs[1], dirs)
dirs := dirs == -1 and close > shortStopPrevs ? 1 : dirs == 1 and close < longStopPrevs ? -1 : dirs

///////////// Rate Of Change Long ///////////// 
_3 = input(false,  "═════ Rate of Change L ═════")
sourcel = close
roclengthl = input(30, "ROC Length",  minval=1)
pcntChangel = input(6, "ROC % Change", minval=1)
rocl = 100 * (sourcel - sourcel[roclengthl]) / sourcel[roclengthl]
emarocl = ema(rocl, roclengthl / 2)
isMovingl() => emarocl > (pcntChangel / 2) or emarocl < (0 - (pcntChangel / 2))

///////////// Rate Of Change Short ///////////// 
_4 = input(false,  "═════ Rate of Change S ═════")
sources = close
roclengths = input(76, "ROC Length",  minval=1)
pcntChanges = input(6, "ROC % Change", minval=1)
rocs = 100 * (sources - sources[roclengths]) / sources[roclengths]
emarocs = ema(rocs, roclengths / 2)
isMovings() => emarocs > (pcntChanges / 2) or emarocs < (0 - (pcntChanges / 2))

/////////////// Strategy /////////////// 
long = dirl == 1 and dirl[1] == -1 and isMovingl()
short = dirs == -1 and dirs[1] == 1 and isMovings()

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

/////////////// Stop Losses Long ///////////////
_5 = input(false,  "═══════ Stop Loss L ══════")
SL_typel = input("Fixed", options=["Fixed", "ATR Derived"], title="Stop Loss Type")
sl_inpl = input(6.0, title='Fixed Stop Loss %') / 100
atrLkbl = input(20, minval=1, title='ATR Stop Period')
atrMultl = input(1.5, step=0.25, title='ATR Stop Multiplier') 
atr1l = atr(atrLkbl)

longStop1l = 0.0
longStop1l :=  short_signal ? na : long_signal ? close - (atr1l * atrMultl) : longStop1l[1]

slLongl = in_long_signal ? strategy.position_avg_price * (1 - sl_inpl) : na
long_sll = in_long_signal ? slLongl : na

/////////////// Stop Losses Short ///////////////
_6 = input(false,  "═══════ Stop Loss S ══════")
SL_types = input("Fixed", options=["Fixed", "ATR Derived"], title="Stop Loss Type")
sl_inps = input(6.0, title='Fixed Stop Loss %') / 100
atrLkbs = input(20, minval=1, title='ATR Stop Period')
atrMults = input(1.5, step=0.25, title='ATR Stop Multiplier') 
atr1s = atr(atrLkbs)

shortStop1s = 0.0
shortStop1s := long_signal ? na : short_signal ? close + (atr1s * atrMults) : shortStop1s[1]

slShorts = strategy.position_avg_price * (1 + sl_inps)
short_sls = in_short_signal ? slShorts : na

_7 = input(false,  "══════ Longs or Shorts ═════")
useLongs = input(true, title="Use Longs")
useShorts = input(true, title="Use Shorts")

/////////////// Execution ///////////////
if testPeriod()
    if useLongs
        strategy.entry("L", strategy.long, when=long)
        strategy.exit("L SL", "L", stop = SL_typel == "Fixed" ? long_sll : longStop1l, when=since_longEntry > 0)
    if useShorts
        strategy.exit("S SL", "S", stop = SL_types == "Fixed" ? short_sls : shortStop1s, when=since_shortEntry > 0)
        strategy.entry("S", strategy.short, when=short)
    if not useShorts
        strategy.close("L", when=short)
    if not useLongs
        strategy.close("S", when=long)

/////////////// Plotting /////////////// 
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=30)
bgcolor(not isMovings() ? color.white : not isMovingl() ? color.aqua : na)
plot(strategy.position_size <= 0 ? na : SL_typel == "Fixed" ? long_sll : longStop1l, title="Long Stop Loss", color=color.yellow, style=plot.style_circles, linewidth=2)
plot(strategy.position_size >= 0 ? na : SL_types == "Fixed" ? short_sls : shortStop1s, title="Short Stop Loss", color=color.orange, style=plot.style_circles, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/426602

> Last Modified

2023-09-13 16:54:28
