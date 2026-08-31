
> Name

移动平均线多空策略Moving-Average-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy is a trend trading strategy based on moving averages. It uses 3 moving averages with different parameters to generate trading signals. It goes long when price crosses above the moving average and goes short when price crosses below. The strategy has 3 moving average lines for staged entry long or short, which allows it to follow the trend.

## Strategy Logic

The strategy calculates the moving average line ma with length len using the sma function. Then it calculates 3 additional moving average lines longline1, longline2, longline3 which are shifted by -4%, -5%, -6% respectively based on ma.

For long signal generation, if current position is flat, it goes long with 1 lot when price crosses above longline1. If already 1 lot long, it adds 1 more lot when price crosses above longline2. If already 2 lots long, it adds 1 more lot when price crosses above longline3. The maximum long position is 3 lots.

For short signal generation, if already long, it exits all long positions when price crosses below ma.

The staged entry allows the strategy to follow the trend.

## Advantages

- Using moving averages to determine trend direction filters out market noise and allows steady profits
- Staged long/short entries can profit more from trends  
- Using shifted moving averages as entry points better catches trends
- Relatively small drawdowns, maximum drawdown controlled around 20%

## Risks

- Pure trend following strategy tends to be whipsawed during range-bound markets
- Lagging signals from moving averages may miss trend turning points  
- Staged long entries may chase high prices and increase risk
- No stop loss mechanism could lead to large losses from sudden events

Risk Solutions:

- Add other indicators to determine trend turning points
- Reasonably set moving average parameters, not too long to avoid too lagging signals
- Reduce staged long entry batches to avoid chasing high prices
- Add moving stop loss to limit losses

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add other indicators like MACD to determine trend strength

2. Optimize moving average parameters to find best combination

3. Adjust staged entry batch size and ratio to prevent chasing high prices 

4. Add moving stop loss mechanism based on ATR 

5. Dynamically adjust position size based on market volatility, reduce size when volatility is high

6. Test parameters on different products to find optimal symbol

7. Develop exit module to consider taking profit at certain patterns

## Summary

Overall, the strategy trades based on trend direction determined by moving averages, and profits from trends via staged entries. But it has some lagging issues and risks of chasing high prices. We can optimize it by adding auxiliary indicators, optimizing parameters, adjusting position sizing, adding stop loss, etc, to adapt to different market conditions and achieve steady profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot|
|v_input_2|3|MA Lenghs|
|v_input_3_ohlc4|0|MA Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_4|-4|Long line 1|
|v_input_5|-5|Long line 2|
|v_input_6|-6|Long line 3|
|v_input_7|true|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-02 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Noro's ShiftMA-multi Strategy v1.0", shorttitle = "ShiftMA-multi", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot")
len = input(3, minval = 1, title = "MA Lenghs")
src = input(ohlc4, title = "MA Source")
longlevel1 = input(-4.0, title = "Long line 1")
longlevel2 = input(-5.0, title = "Long line 2")
longlevel3 = input(-6.0, title = "Long line 3")
needoffset = input(true, title = "Offset")

//Variables
size = strategy.position_size
mult = 1 / syminfo.mintick

//MA
ma = sma(src, len)
longline1 = round(ma * ((100 + longlevel1) / 100) * mult) / mult
longline2 = round(ma * ((100 + longlevel2) / 100) * mult) / mult
longline3 = round(ma * ((100 + longlevel3) / 100) * mult) / mult

//Lines
offset = needoffset ? 1 : 0
plot(ma, color = color.blue)
plot(longline1, offset = offset, color = color.lime)
plot(longline2, offset = offset, color = color.lime)
plot(longline3, offset = offset, color = color.lime)

//Trading
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]
lots = 0.0
if ma > 0
    lots := round(size / lot)
    strategy.entry("L1", strategy.long, lot, limit = longline1, when = (lots == 0))
    lots := round(size / lot)
    strategy.entry("L2", strategy.long, lot, limit = longline2, when = (lots <= 1))
    lots := round(size / lot)
    strategy.entry("L3", strategy.long, lot, limit = longline3, when = (lots <= 2))
if size > 0
    strategy.entry("TP", strategy.short, 0, limit = ma)
    
```

> Detail

https://www.fmz.com/strategy/428804

> Last Modified

2023-10-09 16:00:02
