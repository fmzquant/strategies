
> Name

Moving-Average-Crossover-Trading-Strategy-433446

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c0b459113bd7fc17e4.png)

### Overview

The moving average crossover trading strategy generates buy and sell signals when shorter and longer term moving averages cross. It belongs to technical analysis based trading strategies. This strategy is simple, capital efficient with smaller drawdowns, suitable for medium-long term trading.  

### Strategy Logic

This strategy calculates the 20 and 50 period Exponential Moving Average (EMA). It triggers long position when the 20 EMA crosses over 50 EMA. It triggers short position when 20 EMA crosses under 50 EMA.

EMA gives more weight to recent data. The formula is:

EMAtoday = (Pricetoday * k) + EMAyesterday * (1-k)

Where k = 2/(number of periods + 1)

When shorter term EMA crosses over longer term EMA, it indicates bullish price move to LONG. When it crosses under, it indicates bearish price reversal to SHORT.

### Pros  

The pros of this strategy:

1. Simple logic, easy to understand and execute
2. Less capital required, smaller drawdowns  
3. Flexible parameter tuning for different markets
4. Applicable to any instruments for scalping or trend trading

### Risks and Enhancements 

The risks include: 

1. Frequent trading signals during price oscillation. Filters can help.
2. Stop loss needed to avoid being trapped.
3. Parameter optimization requires more historical data.

Enhancements:

1. Adding filters like Bollinger Bands to reduce false signals
2. Adding stop loss/take profit to avoid being trapped
3. Finding optimal parameter sets for different instruments  
4. Combining with volume to confirm signals

### Conclusion  

The moving average crossover strategy is a simple yet effective technical strategy that is proven by the market. Further improvements on risk control and robustness can be achieved by parameter tuning, adding filters etc. It serves as a fundamental building block for quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|1st MA Length|
|v_input_string_1|0|1st MA Type: EMA|
|v_input_3|50|2nd MA Length|
|v_input_string_2|0|2nd MA Type: EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © brandlabng

//@version=5
//study(title="Holly Grail", overlay = true)
strategy('HG|E15m', overlay=true)
src = input(close, title='Source')

price = request.security(syminfo.tickerid, timeframe.period, src)
ma1 = input(20, title='1st MA Length')
type1 = input.string('EMA', '1st MA Type', options=['EMA'])

ma2 = input(50, title='2nd MA Length')
type2 = input.string('EMA', '2nd MA Type', options=['EMA'])

price1 = if type1 == 'EMA'
    ta.ema(price, ma1)

price2 = if type2 == 'EMA'
    ta.ema(price, ma2)


//plot(series=price, style=line,  title="Price", color=black, linewidth=1, transp=0)
plot(series=price1, style=plot.style_line, title='1st MA', color=color.new(#219ff3, 0), linewidth=2)
plot(series=price2, style=plot.style_line, title='2nd MA', color=color.new(color.purple, 0), linewidth=2)


longCondition = ta.crossover(price1, price2)
if longCondition
    strategy.entry('Long', strategy.long)

shortCondition = ta.crossunder(price1, price2)
if shortCondition
    strategy.entry('Short', strategy.short)
```

> Detail

https://www.fmz.com/strategy/433446

> Last Modified

2023-11-27 17:25:36
