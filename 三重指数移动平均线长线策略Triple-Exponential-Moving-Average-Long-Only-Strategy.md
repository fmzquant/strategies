
> Name

三重指数移动平均线长线策略Triple-Exponential-Moving-Average-Long-Only-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/956037267034eed70d.png)


## Overview

The Triple Exponential Moving Average Long Only Strategy is a long-term trend following strategy based on the Triple Exponential Moving Average (TEMA) indicator. It uses TEMA to filter out short-term market noise and identify mid-to-long-term trend directions. The strategy goes long when price crosses above TEMA and exits when price falls below TEMA. It is suitable for investors interested in mid-to-long term trend trading.

## Strategy Logic

The strategy identifies mid-to-long term trends using the TEMA indicator. TEMA is a smoothed trend indicator derived from triple exponential smoothing of the standard EMA. EMA itself has some noise filtering effect. TEMA further reduces short-term noise by smoothing three EMAs of different periods. 

Specifically, the strategy first calculates the EMA (ema1) of period fastEmaPeriod, then calculates another EMA (ema2) of ema1 using the same period, and finally calculates ema3 based on ema2. The final TEMA is calculated as: TEMA = 3 * (ema1 - ema2) + ema3. The strategy goes long when price crosses above TEMA and exits when price falls below TEMA.

Through multiple exponential smoothing, TEMA can effectively identify mid-to-long term trend directions despite zigzags and reversals, filtering out short-term noise. Thus it is well-suited for long-term trend following strategies.

## Advantage Analysis

- TEMA effectively identifies mid-to-long term trends and filters out short-term noise, avoiding whipsaws.

- Only long positions avoid unlimited downside risks of shorting. 

- Percentage position sizing flexibly sizes positions based on account size for risk control.

- Time window backtesting optimizes parameters on specific historical periods.

## Risk Analysis

- Severe black swan events may cause sharp reversals during long holding periods, leading to large losses.

- TEMA may fail to signal trend changes for timely stop loss. 

- Percentage sizing does not limit per trade loss size, requiring stops.

- Backtesting risks overfitting, optimized parameters may not fit future markets.

## Improvement Directions

- Add volatility metrics to robustify parameters.

- Implement stop loss to control single trade loss size.

- Optimize position sizing to lower size during drawdowns. 

- Add cross-timeframe Tendency indicators to improve trend accuracy.

- Test different holding period parameters for optimum.

## Conclusion

In summary, the Triple EMA Long Only Strategy identifies trend directions via the TEMA indicator, holds long-term positions to avoid short-term noise, stays only long to avoid unlimited downside, and effectively catches mid-to-long term trends. However, risks exist requiring optimizations to improve robustness. Overall it suits investors with some risk tolerance favoring trend trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Fast TEMA Period|
|v_input_2|true|From Month|
|v_input_3|4|From Day|
|v_input_4|2010|From Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-08 00:00:00
end: 2023-11-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TEMA_System_long_only", overlay=true)

//Collect inputs parameters

fastEmaPeriod = input(7, minval=1, title="Fast TEMA Period")

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 4, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2010, title = "From Year", minval = 2000)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2000)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

fastEma = ema(close, fastEmaPeriod)

//convert EMA into TEMA

ema1 = ema(close, fastEmaPeriod)
ema2 = ema(ema1, fastEmaPeriod)
ema3 = ema(ema2, fastEmaPeriod)

fastTEMA = 3 * (ema1 - ema2) + ema3


buy  = close > fastTEMA
sell = close < fastTEMA

plot(fastTEMA, title = 'TEMA', linewidth=3, color=white)

if window()
    strategy.entry("long",strategy.long, when = buy)
    strategy.close("long", when = sell )
```

> Detail

https://www.fmz.com/strategy/432179

> Last Modified

2023-11-15 10:54:39
