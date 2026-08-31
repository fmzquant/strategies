
> Name

Momentum-Indicator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/510332b8f537630e26.png)


## Overview

This strategy uses moving averages and the MACD indicator to identify price trends and momentum, combined with crossover signals to make trading decisions. It is a typical trend following strategy.

## Strategy Logic

This strategy uses a double moving average crossover to generate signals. The fast moving average has a length of 12 days, while the slow moving average has a length of 26 days. When the fast MA crosses above the slow MA, a golden cross is formed which gives a long signal. When the fast MA crosses below the slow MA, a death cross is formed which gives a short signal.

At the same time, this strategy uses the MACD indicator to gauge momentum. The MACD is calculated by subtracting the slow MA (26-day EMA) from the fast MA (12-day EMA), and then smoothed by a signal line (9-day EMA). When the MACD crosses above the signal line, it indicates increasing bullish momentum. When it crosses below the signal line, it indicates increasing bearish momentum. 

This strategy considers both the moving average crossover signals and the MACD indicator signals to make trading decisions. It goes long when a golden cross and a MACD crossover appear, and goes short when a death cross and MACD crossover happen.

## Advantage Analysis

1. Using double moving averages combined with MACD considers both price trend and momentum, avoiding missed trading opportunities.

2. The fast and slow moving average lengths are reasonably set to identify medium-term trends. The MACD parameters are also standard for reliably detecting momentum shifts.

3. The graphical visualization of the indicators makes trading signals clear and intuitive. Trend direction and momentum strength can be judged directly.

4. The strategy parameters are flexible for optimization. The MA lengths and MACD parameters can be adjusted for different market environments.

5. It implements trend following and can profit from sustained directional trends.

## Risk Analysis 

1. The double moving average crossover may lag, delaying entry signals.

2. MACD can give frequent false signals, needing price confirmation.

3. Death crosses in uptrends may signal corrections, existing longs should not be exited prematurely. 

4. Golden crosses in downtrends may signal rebounds, existing shorts should not be covered prematurely.

5. Strict money management should be followed, limiting position sizing to control risk.

## Optimization Directions

1. Optimize MA parameters by testing different period combinations to improve crossover reliability.

2. Optimize MACD parameters by adjusting short and long EMAs and signal line to reduce false signals.

3. Add other indicators like KDJ, BOLL for confluence to improve signal accuracy. 

4. Incorporate volume indicators to avoid false breakouts.

5. Backtest to find optimal parameter combinations based on historical data.

6. Implement stop loss strategies to strictly limit loss per trade and reduce risk.

## Summary

This strategy integrates double moving average crossover and MACD for trend trading. Optimizing parameters and following prudent money management will help achieve steady gains long-term. But false signals need to be avoided by confirming with price action. Further optimizations can improve strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|fastLength|
|v_input_2|26|slowLength|
|v_input_3|9|signalLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Moving Average Convergence/Divergence MaCD Backesting", shorttitle="MACD Backtesting", precision = 6, pyramiding = 3, default_qty_type = strategy.percent_of_equity, currency = currency.USD, commission_type = strategy.commission.percent, commission_value = 0.10, initial_capital = 1000, default_qty_value = 100)
source = close
fastLength = input(12, minval=1), slowLength=input(26,minval=1)
signalLength=input(9,minval=1)

fastMA = ema(source, fastLength)
slowMA = ema(source, slowLength)

macd = fastMA - slowMA
signal = ema(macd, signalLength)
hist = macd - signal

plot(hist, color=red, style=histogram)
plot(macd, color=blue)
plot(signal, color=orange)

buy = crossover(macd,signal)
sell = crossunder(macd,signal)

plotshape(buy, "buy", shape.triangleup, color = olive , size = size.tiny, location  = location.bottom)
plotshape(sell, "sell", shape.triangledown, color = orange , size = size.tiny, location  = location.bottom)

if (buy)
    strategy.entry("Long Trigger", true)
if(sell)    
    strategy.entry("Short Trigger", false)
if (sell)    
    strategy.exit("Close Long Trigger", "Long Trigger")
if (buy)
    strategy.exit("Close Short Trigger", "Short Trigger")



```

> Detail

https://www.fmz.com/strategy/432334

> Last Modified

2023-11-16 15:47:13
