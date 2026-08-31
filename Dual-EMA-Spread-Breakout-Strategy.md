
> Name

Dual-EMA-Spread-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164b8393a78e3fd1f84.png)



## Overview

The Dual EMA Spread Breakout strategy is a trend following strategy. It uses two EMA lines with different periods and makes trades when there is a sufficiently large spread between the two EMAs to capture the trend direction. This strategy works well in markets with strong trending tendencies.

## Strategy Logic

The strategy uses a fast EMA (shorter period EMA) and a slow EMA (longer period EMA) for trade signals. The specific logic is:

1. Calculate the fast EMA and slow EMA. 

2. When the fast EMA crosses above the slow EMA, and the spread between the two EMAs exceeds a threshold, go long.

3. When the fast EMA crosses below the slow EMA, and the spread between the two EMAs exceeds a threshold, go short.

4. When the price breaks back below the fast EMA, close long positions. 

5. When the price breaks back above the fast EMA, close short positions.

This way, it uses the smoothness of EMAs to identify trend direction, and the EMA spread breakout to determine precise entry timing. The larger the spread, the stronger the trend, and the bigger opportunity to trade.

## Advantages

- Utilizes the trend following nature of EMAs for trading
- EMA spread breakout helps filter false signals during ranging periods  
- Using different EMA combos reduces whipsaws in trend trading
- Can produce good returns in trending markets with proper settings

## Risks

- EMAs lag in response to price changes, may miss turn points
- Less effective in low trending markets
- Prone to stop outs in choppy markets
- Improper EMA parameters can cause excessive false signals

Risks can be reduced via EMA tuning, spread threshold, and stop loss placement.

## Enhancement Opportunities

- Optimize fast and slow EMA periods
- Test different EMA spread threshold values
- Improve stop loss strategies
- Add other filtering signals 
- Parameter tuning to find optimal settings

## Summary

The Dual EMA Spread Breakout strategy is an effective yet simple trend following strategy. It can profit nicely in trending markets but needs proper parameters. With optimization and risk management, it can fully leverage its strengths. A worthwhile trend strategy to research and apply.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.95|diffMinimum|
|v_input_2|13|Small EMA|
|v_input_3|26|Long EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("2-EMA Strategy", overlay=true, initial_capital=100, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

diffMinimum = input(0.95, step=0.01)

small_ema = input(13, title="Small EMA")
long_ema = input(26, title="Long EMA")

ema1 = ema(close, small_ema)
ema2 = ema(close, long_ema)


orderCondition = ema1 > ema2?((ema1/ema2)*100)-100 > diffMinimum:((ema2/ema1)*100)-100 > diffMinimum

longCondition = close > ema1 and ema1 > ema2
if (longCondition and orderCondition)
    strategy.entry("Long", strategy.long)

shortCondition = close < ema1 and ema1 < ema2
if (shortCondition and orderCondition)
    strategy.entry("Short", strategy.short)
    
strategy.close("Short", when=close > ema1)
strategy.close("Long", when=close < ema1)
    
plot(ema(close, small_ema), title="EMA 1", color=green, transp=0, linewidth=2)
plot(ema(close, long_ema), title="EMA 2", color=orange, transp=0, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/430132

> Last Modified

2023-10-25 12:43:59
