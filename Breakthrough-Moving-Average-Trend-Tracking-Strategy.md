
> Name

Breakthrough-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aacf7c5d1d564378b3.png)


## Overview

This strategy combines moving average, amplitude index and parabolic SAR indicator to judge the trend and confirm breakthrough points. It belongs to a typical trend following strategy. It will establish long position to track the trend when identifying an uptrend and price breakthrough. It will close position for stop loss when judging trend reversal.

## Principles  

The strategy uses double EMA to judge price trend and uses SMA as assistance. When fast EMA is above slow EMA and fast SMA is above slow SMA, it considers there is an uptrend.  

It uses parabolic SAR indicator to judge price reversal points. When PSAR goes below the highest price, it means price may reverse downwards. At this time it will close position for stop loss.

When judging an uptrend and PSAR goes above highest price, it means price keeps going up. At this time it will long to track the trend.

## Advantages

- Use double EMA with SMA to judge trend, which can filter false breakthrough.
- PSAR can effectively determine reversal points for quick stop loss.  
- Can effectively identify trend reversal points for timely establishing position to track.
- Simple and clear rules.

## Risks 

- Trend judgement may be wrong.
- The strategy needs parameter optimization for different products, otherwise chasing risk may be high.
- No consideration for trading cost.

**Solutions:**

- Optimize EMA and SMA parameters to improve judgement accuracy.
- Optimize PSAR parameters for different products.  
- Add in trading cost.

## Optimization

- Add more indicators like BOLL, MACD etc to judge trend.
- Train and optimize parameters for different products.
- Consider adding stop loss strategy.
- Optimize logics for opening position and stop loss.

## Summary  

The strategy belongs to a typical trend following strategy. The advantages are clear and simple rules and ability to identify trend reversal for timely position opening. The disadvantages are sensitivity to parameters and certain chasing risk. Overall it is worth further optimization and adjustment for live trading verification. The main optimization directions are parameter optimization, adding stop loss strategy etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|PSAR_start|
|v_input_2|0.02|PSAR_increment|
|v_input_3|0.2|PSAR_maximum|
|v_input_4|20|EMA_fast|
|v_input_5|40|EMA_slow|
|v_input_6|100|SMA_fast|
|v_input_7|200|SMA_slow|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-27 00:00:00
end: 2023-12-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Buy Dip MA & PSAR", overlay=true)

PSAR_start = input(0.02)
PSAR_increment = input(0.02)
PSAR_maximum = input(0.2)

EMA_fast = input(20)
EMA_slow = input(40)
SMA_fast = input(100)
SMA_slow = input(200)

emafast = ema(close, EMA_fast)
emaslow = ema(close, EMA_slow)
smafast = sma(close, SMA_fast)
smaslow = sma(close, SMA_slow)

psar = sar(PSAR_start, PSAR_increment, PSAR_maximum)
uptrend = emafast > emaslow and smafast > smaslow
breakdown = not uptrend

if (psar >= high and uptrend)
    strategy.entry("Buy", strategy.long, stop=psar, comment="Buy")
else
    strategy.cancel("Buy")

if (psar <= low)
    strategy.exit("Close", "Buy", stop=psar, comment="Close")
else
    strategy.cancel("Close")

if (breakdown)
    strategy.close("Buy")


plot(emafast, color=blue)
plot(emaslow, color=red)
```

> Detail

https://www.fmz.com/strategy/436879

> Last Modified

2023-12-28 15:47:21
