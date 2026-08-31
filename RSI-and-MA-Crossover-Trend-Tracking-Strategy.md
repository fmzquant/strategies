
> Name

RSI-and-MA-Crossover-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b61cf8e7d52c55d572.png)

#### Overview

This strategy determines market trends and entry signals by the crossover of the RSI indicator and two moving averages (MAs) of different periods. It only goes long when RSI is above its 26-period MA and goes short when RSI is below to control risks.

#### Strategy Logic

The strategy employs two MAs of 12- and 26-period. When the 12-period fast MA crosses above the 26-period slow MA, it signals an upward trend, and vice versa. The strategy goes long on golden crossover and goes short on death crossover of the two MAs.

The RSI indicator is also used to determine overbought/oversold zones. Only when RSI is higher than its 26-period MA will the strategy open long positions on golden crossover. And only when RSI is lower will it open short positions on death crossover. This avoids forced entries against overbought/oversold situations and hence controls risks.

#### Advantage Analysis  

By combining MAs and RSI for trend and timing analysis, this strategy can effectively track trends. The RSI filter reduces trade frequencies and avoids whipsaws in ranging markets. Not using a stop loss allows full trend following for higher returns.

#### Risk Analysis

Without a stop loss, losses may amplify on wrong signals. Large gap moves may also lead to heavy losses. Also, improperly set RSI filters may cause missing good entry signals.

Consider using a stop loss to control maximum losses. Fine tune RSI parameters for better filters. For volatile markets, use slower MAs to judge the trend.

#### Optimization Directions 

The strategy can be improved in the following aspects:

1. Test MA combos of different periods to find parameters best fitting current market conditions.  

2. Optimize RSI periods and filter logics for better entry timing.

3. Add other indicators like volume for better system stability.

4. Optimize stop loss strategies to balance trend following and risk control, e.g., trailing stop, percentage stop, dynamic stop etc.

#### Conclusion

The strategy is relatively simple and straightforward, using MA crossovers to determine trends and RSI to avoid forced entries, thus tracking trends for good returns. Further improvements can be made through parameter tuning and adding other filters to suit complex market environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|false|UseStopLoss|
|v_input_5|20|Stop loss percentage(0.1%)|
|v_input_6_open|0|Fast MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|12|Fast MA Period|
|v_input_8_open|0|Slow MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|26|Slow MA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy(title = "EMA Cross Strategy", shorttitle = "EMA Cross",calc_on_order_fills=true,calc_on_every_tick =true, initial_capital=21000,commission_value=.25,overlay = true,default_qty_type = strategy.percent_of_equity, default_qty_value = 100)
StartYear = input(2018, "Backtest Start Year")
StartMonth = input(1, "Backtest Start Month")
StartDay = input(1, "Backtest Start Day")
UseStopLoss = input(false,"UseStopLoss")
//rsiLong = true
rsi1 = rsi(close, 14)

window() => true

stopLoss = input(20, title = "Stop loss percentage(0.1%)")
//stopLoss = input(200, title = "Stop loss percentage(0.1%)")

maFastSource   = input(defval = open, title = "Fast MA Source")
maFastLength   = input(defval = 12, title = "Fast MA Period", minval = 1)
// long ma
maSlowSource   = input(defval = open, title = "Slow MA Source")
maSlowLength   = input(defval = 26, title = "Slow MA Period", minval = 1)

maFast = ema(maFastSource, maFastLength)
maSlow = ema(maSlowSource, maSlowLength)

//12 and 26=9%; 3 and8=2%; 26 and 55=2%; when selling on a cross under
//maFastRSI = ema(rsi1, 12)
//maSlowRSI = ema(rsi1, 26)

fast = plot(maFast, title = "Fast MA", color = #7a8598, linewidth = 2, style = line, transp = 50)
slow = plot(maSlow, title = "Slow MA", color = #e08937, linewidth = 2, style = line, transp = 50)


longEMA = crossover(maFast, maSlow)
exitLong = crossunder(maFast, maSlow) // 5% in 2018
//exitLong = crossunder(close, maFast) // 15% in 2018
//exitLong = crossunder(rsi1, maFastRSI) // 13%

shortEMA = crossover(maSlow, maFast)
exitShort = crossover(maFast, maSlow)

//if (rsi1 < ema(rsi1,7))
//rsiLong = false

//if (longEMA and (rsi1 >= highest(rsi1,10)))
//if (longEMA)
if (longEMA and (rsi1 > ema(rsi1,26)))  //RSI ema values optimal from 19 to 35
    strategy.entry("LongId", strategy.long, when=window())

//strategy.close_all(when = rsi1 > 60) // 80=26%, 90=n/a, 70=15%, 60=16% long only
//strategy.close_all(when = (shortEMA and (rsi1 <= ema(rsi1,26)))) //10% gain in 2018 long only
//strategy.close_all(when = (rsi1 <= ema(rsi1,120))) //26=17% 14=2% 42=15%
//strategy.close_all(when = (shortEMA)) // 5% gain in 2018 long only
//strategy.close_all(when = exitLong) 

//if (shortEMA and not(rsiLong))
//if (shortEMA)
if (shortEMA and (rsi1 <= ema(rsi1,26)))
    strategy.entry("ShortId", strategy.short, when=window())

if (UseStopLoss)
    strategy.exit("StopLoss", "LongId", loss = close * stopLoss / 1000 / syminfo.mintick)
    strategy.exit("StopLoss", "ShortId", loss = close * stopLoss / 1000 / syminfo.mintick)
```

> Detail

https://www.fmz.com/strategy/442251

> Last Modified

2024-02-20 15:31:15
