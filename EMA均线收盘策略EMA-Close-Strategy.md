
> Name

EMA均线收盘策略EMA-Close-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the golden cross and dead cross of EMA lines combined with candlestick closing prices to determine entry and exit signals. It goes long when fast EMA lines (8-, 13-, 21-period) cross above medium-term EMA line (55-period) and closing price is above medium-term EMA; it goes short when fast EMA lines cross below medium-term EMA and closing price is below medium-term EMA. The strategy works well for daily and hourly charts.

## Strategy Logic

The strategy is based on the golden cross and dead cross principles of EMA lines. The code sets up 5 EMA lines of different periods (8-, 13-, 21-, 55-, 200-period) and visualizes them on the chart. The core logic is:

1. When 8-, 13-, 21-period EMAs cross above 55-period EMA and closing price is above 55-period EMA, go long.

2. When 8-, 13-, 21-period EMAs cross below 55-period EMA and closing price is below 55-period EMA, go short.

By using the relationship between fast and medium-term EMA lines combined with actual closing price breakout, relatively reliable entry and exit signals can be generated.

## Advantage Analysis 

The advantages of this strategy are:

1. Using EMA golden cross and dead cross can effectively capture trend changes. 

2. Incorporating closing price with EMA relationship helps filter out false breakouts.

3. Combining multiple EMAs of different periods improves signal reliability. 

4. Simple and easy-to-understand logic, suitable for beginners.

5. Customizable EMA periods adaptable to different market environments. 

6. Visualized EMA lines form intuitive trading indicators.

## Risk Analysis

Some risks also exist:

1. EMA systems have poor performance identifying ranging markets, may generate false signals.

2. Closing price with EMAs cannot completely avoid false breakouts. 

3. Improper parameter settings may lead to over-trading and increased costs.

4. Backtest bias risk, live performance may underperform.

5. No effective stop loss control, may lead to large losses.

## Improvement Directions

Some ways to further improve the strategy:

1. Add other indicators like MACD, KDJ for signal filtering.

2. Incorporate trend detection to avoid whipsaws.

3. Set stop loss to control single trade loss. 

4. Optimize EMA periods for different products.

5. Implement position sizing based on account size.

6. Seek opportunities across multiple timeframes.

## Conclusion

The EMA Close strategy is a simple yet effective trend following strategy based on EMA theory. It has strong practical value with clean code and is easy to learn for beginners, and can also be integrated into more complex systems. However, some limitations exist and further optimizations are needed to adapt to evolving markets. Overall, the EMA Close strategy provides a solid trend trading framework worth studying in depth.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|EMA #1|
|v_input_2_close|0|EMA Source #1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|13|EMA #2|
|v_input_4_close|0|EMA Source #2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|21|EMA #3|
|v_input_6_close|0|EMA Source #3: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|55|EMA #4|
|v_input_8_close|0|EMA Source #4: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|200|EMA #5|
|v_input_10_close|0|EMA Source #5: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-25 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © x11joe
strategy(title="EMA Candle Close Strategy", overlay=true,initial_capital=1000,commission_type=strategy.commission.percent,commission_value=0.26,default_qty_type=strategy.percent_of_equity,default_qty_value=100)

len1 = input(8, minval=1, title="EMA #1")
src1 = input(close, title="EMA Source #1")
out1 = ema(src1, len1)
plot(out1, title="EMA #1", color=close >= out1 ? color.gray : color.gray, linewidth = 1)

len2 = input(13, minval=1, title="EMA #2")
src2 = input(close, title="EMA Source #2")
out2 = ema(src2, len2)
plot(out2, title="EMA #2", color=close >= out2 ? color.white : color.white, linewidth = 2)

len3 = input(21, minval=1, title="EMA #3")
src3 = input(close, title="EMA Source #3")
out3 = ema(src3, len3)
plot(out3, title="EMA #3", color=close >= out3 ? color.blue : color.blue, linewidth = 3)

len4 = input(55, minval=1, title="EMA #4")
src4 = input(close, title="EMA Source #4")
out4 = ema(src4, len4)
plot(out4, title="EMA #4", color=close >= out4 ? color.yellow : color.yellow, linewidth = 3)

len5 = input(200, minval=1, title="EMA #5")
src5 = input(close, title="EMA Source #5")
out5 = ema(src5, len5)
plot(out5, title="EMA #5", color=close >= out5 ? #FF00FF : #FF00FF, linewidth = 4)

//Buying requires the 8,13 & 21 to close above the 55 and a candle closing above this.
if(out1>out4 and out2>out4 and out3>out4 and close>out4)
    strategy.entry("Long",strategy.long)
    
if(out1<out4 and out2<out4 and out3<out4 and close<out4)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/427923

> Last Modified

2023-09-26 20:09:08
