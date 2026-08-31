
> Name

RSI金叉死叉策略RSI-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18b6da5eb528ef57ef6.png)


## Overview

The RSI crossover strategy uses the crossover and crossunder of fast line and slow line of RSI indicator to determine the entry and exit points. When the fast line crosses above the slow line, it is considered as golden cross, indicating the asset is oversold and it is the signal to go long. When the fast line crosses below the slow line, it is considered as death cross, indicating the asset is overbought and it is the signal to go short. This strategy incorporates the overbought and oversold judgement of RSI indicator to avoid false signals effectively.

## Strategy Logic

This strategy first calculates the RSI indicator with RSI period set to 5. Then the fast EMA is set to 20-period EMA of RSI, and slow EMA is set to 50-period EMA of RSI. The buy signal is generated when the fast line crosses above the slow line. The sell signal is generated when the fast line crosses below the slow line. Also the overbought line is set at 70 and oversold line is set at 30 to filter some false signals.

The strategy logic is mainly based on the following points:

1. RSI indicator can judge if the asset is in overbought or oversold status. RSI above 70 is overbought zone, below 30 is oversold zone.

2. The fast EMA reacts more quickly and can determine the short term trend change of the asset. The slow EMA is more stable and can determine the mid-long term trend.

3. When fast line crosses above slow line, it indicates the asset is turning from oversold to upwards, which is the buy signal.

4. When fast line crosses below slow line, it indicates the asset is turning from overbought to downwards, which is the sell signal.

5. The overbought and oversold lines can filter some sell signals in bull market and buy signals in bear market.

6. In general, this strategy combines the strength of RSI indicator, and uses double EMAs to judge crossovers, which can capture the short term and mid-term turning points of the market and determine the trend.

## Advantages of the Strategy

The RSI crossover strategy has the following advantages:

1. Using RSI indicator to judge overbought and oversold avoids chasing highs and selling lows. 

2. The fast and slow EMA combination considers both sensitivity and stability of the operations.

3. The overbought and oversold threshold filters some noisy trading signals.

4. The strategy logic is simple and clear, easy to understand and implement, suitable for quantitative trading development.

5. It can be flexibly applied in different market environments with good backtest results.

6. Parameters like RSI period and EMA periods can be tuned to adapt to market changes.

7. The strategy risk is controllable, avoiding the risk of unilateral chasing.

## Risks of the Strategy

There are also some risks for RSI crossover strategy:

1. The risk of RSI indicator generating wrong signals, divergence may still exist.

2. The risk of double EMAs generating wrong signals, some lag exists. 

3. The improper overbought and oversold threshold may filter some good trading opportunities.

4. In range-bound market, the crossover signals are frequent, bringing high trading costs and slippage risks.

5. Unreasonable parameters setting (like RSI period, EMA periods) may miss opportunities or increase false signals.

6. Sufficient historical data is needed to generate valid signals, poor performance with insufficient data.

7. It cannot determine the market trend, may lead to losses when market reverses.

The risks can be managed by parameter tuning, proper stop loss, avoiding overtrading, accumulating enough data etc.

## Optimization Directions

The RSI crossover strategy can be optimized in the following aspects:

1. Optimize RSI parameters, test different RSI periods to better fit the market characteristics.

2. Optimize the fast and slow EMA periods to capture more opportunities.

3. Test different overbought and oversold threshold to avoid missing major trends. 

4. Incorporate other indicators to determine market trend, avoiding losses during reversals.

5. Set proper stop loss strategy to control single loss.

6. Set trading size management strategy to prevent excessive single loss.

7. Consider partial profit taking after opening positions to lock in profits.

8. Consider using pyramiding in strong trends and reduce trading in range-bound markets.

9. Test the robustness of strategy in different markets and with different parameters for multi-market validity.

With comprehensive optimizations in parameters, risk management and other aspects, the stability and profitability of RSI crossover strategy can be improved significantly.

## Summary

In summary, the RSI crossover strategy is a commonly used quantitative strategy logic. It combines the strengths of RSI indicator and uses double EMAs to generate trading signals, which can effectively determine the short term and mid-term turning points of the market. The strategy has large optimization space, controllable risks, and can be adjusted to suit different market environments, with good versatility. But the risks of generating excessive false signals should be noted, and proper risk control is needed. If tuned properly, the backtest results can be good, making it an easy to implement quantitative trading strategy choice.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|RSI Period|
|v_input_3|30|RSI Oversold|
|v_input_4|70|RSI Overbought|
|v_input_5|20|Smooth Fast Period|
|v_input_6|50|Smooth Slow Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-10-17 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © xaurr

//@version=4
strategy("RSI Cross [xaurr]", shorttitle="RSIC",overlay=false)

src  = input(title="Source", type=input.source, defval=close)

//RSI Strategy
period = input(5,"RSI Period", minval=1)
overSold = input(30,"RSI Oversold", minval=1)
overBought = input(70, "RSI Overbought", minval=1)
fastPeriod = input(20,"Smooth Fast Period")
slowPeriod = input(50,"Smooth Slow Period")


rsi = rsi(src, period)
fast = ema(rsi,fastPeriod)
slow = ema(rsi,slowPeriod)


long = crossover(fast,slow)
short = crossunder(fast,slow)


pos = 0
pos:= long ?1:short ?-1 : nz(pos[1])


plot(overSold,"RSI Oversold",color=color.green)
plot(overBought, "RSI Overbought",color=color.red)
plot(rsi, linewidth = 1, color = color.blue, title="RSI Line")

plot(fast, linewidth = 2, color = color.green, title="RSI Fast Line")
plot(slow, linewidth = 2, color = color.red, title="RSI Slow Line")

bgcolor(pos == 1 ? color.green : pos == -1 ? color.red : na)

if pos == 1
    strategy.entry("long",strategy.long)

if pos == -1
    strategy.entry("short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/429569

> Last Modified

2023-10-18 11:44:45
