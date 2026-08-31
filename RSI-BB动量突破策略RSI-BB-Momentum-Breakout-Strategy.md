
> Name

RSI-BB动量突破策略RSI-BB-Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16aac6830cf06137396.png)


## Overview

The RSI-BB momentum breakout strategy combines the Relative Strength Index (RSI) and Bollinger Bands (BB) indicators for breakout trading. It uses RSI to determine market trends and overbought/oversold levels, and BB to identify breakout points. When both RSI and BB signals align, the strategy will enter long or short trades accordingly.

## Strategy Logic

The code first computes the RSI and BB indicators. 

The RSI is calculated as:

```pine
up = rma(max(change(close), 0), 30)
down = rma(-min(change(close), 0), 30) 
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
```

Where up measures the upward price movement over 30 periods, down measures the downward price movement, and rsi is computed based on the ratio of up to down.

The BB is calculated as:

```pine 
basis = sma(close, 50)
dev = 0.2 * stdev(close, 50)
upper = basis + dev
lower = basis - dev
```

Where basis is the 50-period moving average, dev is 0.2 times the standard deviation, upper and lower are the bands.

bbi is the bollinger bandwidth index, computed as:

```pine
bbr = close>upper? 1 : close<lower? -1 : 0 
bbi = bbr - bbr[1]
```

bbr checks if close breaks upper or lower band. Breakout is 1, breakdown is -1, otherwise 0. bbi is the difference between current and previous bbr. Positive bbi indicates upward breakout, negative indicates downward.

The strategy signals are determined as: 

```
long = rsi>52 and rsi<65 and bbi>0.11 and bbi<0.7
short = rsi<48 and rsi>35 and bbi<-0.11 and bbi>-0.7 
```

Go long when RSI is between 52-65 and BBI is between 0.11 and 0.7. Go short when RSI is between 35-48 and BBI is between -0.11 and -0.7.

## Advantages

1. Combining RSI and BB provides more reliable signals. RSI gauges trend and overbought/oversold levels, BB identifies breakout.

2. 30-period RSI filters out some market noise and focuses on major trends. 

3. 50-period BB with 0.2 standard deviation helps filter out whipsaws.

4. BBI thresholds filter fake breakouts. 

5. RSI long/short zones of 52-65 and 35-48 provide some buffer to avoid missed trades.

## Risks

1. Breakout strategies are prone to being caught in whipsaws, need to manage risk with stop loss.

2. Backtest results may be overfitted, live performance may vary.

3. Extreme market moves may hit stop loss resulting in large losses.

4. RSI and BB parameters including periods and thresholds need to be optimized. 

5. Order price can significantly impact live performance.

## Enhancement Opportunities 

1. Test different combinations of RSI and BB parameters to find optimal settings.

2. Add other indicators like MACD, KD for signal filtration. 

3. Optimize RSI long/short zones to filter out more noise.

4. Optimize dynamic BBI thresholds to better filter fakeouts.

5. Add trend filter to avoid trading against major trend.

6. Test different stop loss techniques to find optimal risk control.

7. Test different order types to minimize slippage impact.

## Conclusion

The RSI-BB strategy combines the advantages of using trend and momentum indicators. Backtest results are promising but live performance may vary due to real-world factors like slippage and stop loss. Parameters and filters need to be optimized based on backtest results. Stop loss and order placement should also be evaluated for real-world effectiveness. The strategy has merit but requires ongoing enhancements and robustness testing to generate consistent results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|length|
|v_input_2|0.2|Mult Factor|
|v_input_3|0.1|alertLevel|
|v_input_4|0.75|impulseLevel|
|v_input_5|false|showRange|
|v_input_6|250|TP|
|v_input_7|20|SL|
|v_input_8|false|TS|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-03 00:00:00
end: 2023-11-02 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Based on Larry Connors RSI-2 Strategy - Lower RSI
strategy(title="Spyfrat Strat", shorttitle="SpyfratStrat", overlay=true)
src = close, 
// BB Init
source = close
length = input(50, minval=1)
mult = input(0.2, title="Mult Factor", minval=0.001, maxval=50)
alertLevel=input(0.1)
impulseLevel=input(0.75)
showRange = input(false, type=bool)
//RSI CODE
up = rma(max(change(src), 0), 30)
down = rma(-min(change(src), 0), 30)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
//BB CODE
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev
bbr = source>upper?(((source-upper)/(upper-lower))/10): source<lower?(((source-lower)/(upper-lower))/10) : 0.1
bbi = bbr - nz(bbr[1]) 
//Rule
long = rsi>52 and rsi<65 and  bbi>0.11 and bbi<0.7
short = rsi<48 and rsi>35 and  bbi<-0.11 and bbi>-0.7
//Trade Entry
strategy.entry("long", strategy.long, when=long)
strategy.entry("short", strategy.short, when=short)
//Trade Exit
TP = input(250) * 10
SL = input(20) * 10
TS = input(0) * 10
CQ = 100

TPP = (TP > 0) ? TP : na
SLP = (SL > 0) ? SL : na
TSP = (TS > 0) ? TS : na

strategy.exit("Close Long", "long", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP)
strategy.exit("Close Short", "short", qty_percent=CQ, profit=TPP, loss=SLP, trail_points=TSP)
```

> Detail

https://www.fmz.com/strategy/430977

> Last Modified

2023-11-03 15:02:19
