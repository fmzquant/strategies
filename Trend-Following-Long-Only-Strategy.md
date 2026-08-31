
> Name

Trend-Following-Long-Only-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f904a0be3ce94446cd.png)



## Overview

The Trend Following Long Only Strategy is a strategy that tracks price trends using dynamic moving averages. It determines the current trend by calculating the moving averages of highest and lowest prices over a period and combines it with ATR for dynamic stop loss and take profit. This strategy works well in trending markets by catching trend reversals in a timely manner for long-term holding. 

## Strategy Logic

The strategy first calculates the moving averages of highest and lowest prices over a period (default 200 days) and takes their midpoint as the baseline. Then it measures the deviation of price from the baseline. If price is above baseline by 1 ATR (0.5 times 10-day ATR by default), it is considered an uptrend. If price is below baseline by 1 ATR, it is considered a downtrend. Long or short positions are entered based on the trend state. 

When price reverts to the baseline, exit signals are triggered. Also, the dynamic ATR allows stop loss and take profit to trail the major trend, avoiding over-trading on minor fluctuations.

## Advantages

1. Dynamic averages smooth price actions effectively to identify long-term trend direction
2. ATR-based stops trail the major trend dynamically avoiding excessive sensitivity
3. Timely catches of trend reversals reduce untimely capital waste
4. Simple logic easy to implement

## Risks and Mitigation

1. May generate false signals in ranging markets
2. Improper parameter tuning may miss trend reversals  
3. Divergence between market and individual stocks should be considered

Risks can be reduced by tweaking ATR parameters, adding filters for high probability setups, and evaluating market conditions and risk appetite.

## Improvement Ideas

1. Add secondary confirmation after initial entry signals using indicators like KDJ
2. Optimize parameters based on volatility, fundamentals of individual stocks
3. Fine tune ATR multiplier based on backtests to balance profit factor and turnover rate  
4. Introduce dynamic volatility adjustment in stop loss and take profit
5. Utilize machine learning techniques for automated parameter optimization

## Summary

The Trend Following Long Only Strategy is an easy-to-use trend trading system overall. It identifies trend direction using dynamic averages and sets risk controls with ATR-based stops. It can effectively catch profitable swings in trending markets. Ranging markets should be avoided to prevent whipsaws. Further improvements can be made through parameter tuning, adding filters and integrating machine learning techniques.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Lookback Length|
|v_input_2|5|Smoother Length|
|v_input_3|10|ATR Length|
|v_input_4|0.5|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend Following Long Only Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

lookback_length = input(200, type=input.integer, minval=1, title="Lookback Length")
smoother_length = input(5, type=input.integer, minval=1, title="Smoother Length")
atr_length = input(10, type=input.integer, minval=1, title="ATR Length")
atr_multiplier = input(0.5, type=input.float, minval=0.5, title="ATR Multiplier")

vola = atr(atr_length) * atr_multiplier
price = sma(close, 3)

l = ema(lowest(low, lookback_length), smoother_length)
h = ema(highest(high, lookback_length), smoother_length)
center = (h + l) * 0.5
upper = center + vola
lower = center - vola
trend = ema(price > upper ? 1 : (price < lower ? -1 : 0), 3)
c = trend < 0 ? upper : lower

pcenter = plot(center, transp=100)
pclose = plot(close, transp=100)
pc = plot(c, transp=100)

buy_signal = crossover(trend, 0.0) 
sell_signal = crossunder(trend, 0.0)

strategy.entry("Buy", strategy.long, when=buy_signal)
strategy.close("Buy", when=sell_signal)

bgcolor(trend >= 0 ? color.green : color.red, transp=95)
fill(pc, pclose, color=trend >= 0 ? color.green : color.red)
```

> Detail

https://www.fmz.com/strategy/429491

> Last Modified

2023-10-17 15:55:41
