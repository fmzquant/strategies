
> Name

趋势区间突破策略Trend-Breakout-Strategy-Based-on-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/da799415f383e91839.png)


## Overview

This is a trend following strategy based on Bollinger Bands. It uses Bollinger Bands to calculate price channels and combines candlestick patterns to determine trend direction. Long/short positions will be opened when price breaks out of the Bollinger Bands. This strategy works well for stocks with obvious trends and aims to capture mid-term trend profits.

## Strategy Logic

This strategy uses the upper band, middle band and lower band of Bollinger Bands to determine price ranges. The upper and lower bands envelope price movements while the middle band is the moving average. Band width changes based on price volatility. When price breaks above the upper band, it signals an upward breakout and a long entry. When price breaks below the lower band, it signals a downward breakout and a short entry.

After determining trend direction with Bollinger Bands breakout, the strategy also confirms it with candlestick patterns. If the candle body aligns with the trend, such as bullish candle in an uptrend, a position will be opened. If the candle body shows reverse pattern, such as bearish candle in an uptrend, the signal will be ignored. This design aims to avoid false breakout risks. 

The detailed trading signals rules are:

1. Calculate upper band, middle band and lower band of Bollinger Bands to determine price range

2. When price breaks above upper band, it signals an upward/long trend

3. If the candlestick is bullish, confirm the trend and go long

4. When price breaks below lower band, it signals a downward/short trend

5. If the candlestick is bearish, confirm trend and go short 

6. Set stop loss and take profit based on percentage

By entering on Bollinger Bands breakouts and confirming with candlesticks, this strategy can effectively identify trend direction and get good entries during early trend stages. Profits are taken during mid-term trends.

## Advantage Analysis 

This is a typical trend following strategy with the following strengths:

1. Bollinger Bands are adaptive and can adjust ranges for stocks with different volatility

2. Candlestick confirmation filters out false breakouts 

3. Mid-term holding lowers trading frequency and reduces costs/slippage

4. Capturing mid-term trends avoids short-term noise and gives good risk-reward

5. Backtest results are strong and real trading is stable due to systemization

6. Strategy logic is clear and easy to understand, with room for enhancements

By determining trend with Bollinger Bands and entering on candlestick confirmation, this strategy effectively catches mid-term momentum driven by volume. It has strong practical value.

## Risk Analysis

There are also some risks to note for this strategy:

1. Failed breakout risk. Breaking Bollinger Bands has probabilistic nature and false breakouts occur

2. Reversal risk. Mid-term trends can also reverse, reasonable stops should be set

3. Parameter optimization risk. Bollinger Bands parameters and stops need tuning for different stocks  

4. Overfitting risk. Excessive parameter optimization causes curve fitting 

5. Execution risk. Divergence exists between backtest and real trading

To address these risks, the following improvements can be made:

1. Optimize Bollinger Bands parameters and width for better fit

2. Add more factors like volume to confirm the trend

3. Use dynamic stops to prevent huge loss on reversals

4. Apply walk forward analysis to avoid overfitting 

5. Improve order execution for better real trading efficiency

## Optimization Directions

This strategy can be further enhanced in the following aspects:

1. Add more indicators like KDJ, MACD to confirm signals and improve accuracy

2. Use machine learning to dynamically optimize parameters rather than fixed values

3. Set price zones around breakout points to generate more precise signals

4. Optimize exits with trailing stops or partial profit taking

5. Introduce position sizing for better risk management

6. Utilize advanced order types to improve execution results

7. Add market regime filters to shut off strategy in certain environments

By introducing more techniques and optimizations, the stability and profitability of this strategy can be further improved for even better backtest and real trading outcomes.

## Conclusion

This is a typical trend following strategy that uses Bollinger Bands as dynamic ranges to determine trend direction. Candlestick confirmation provides precise entry signals. Entries are made at early trend stages with the goal of riding mid-term momentum. 

The advantages of this strategy include using Bollinger Bands for trend, candlestick for entry confirmation, low trading frequency, and easy systemization. It also has risks like false breakouts, stop loss optimization difficulties, and execution divergence. More indicators, dynamic parameters, and advanced execution can enhance stability and real trading performance.

Overall, as a typical trend following strategy, it has a clear logic and is easy to implement with strong viability. With continuous optimizations and stringent risk control, it can become an effective module in quantitative trading systems.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|take, %|
|v_input_4|false|Counter-trend entry|
|v_input_5|20|Period|
|v_input_6|true|Show Bands|
|v_input_7|true|Show Background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=2
strategy("Noro's Bands Scalper Strategy v1.2", shorttitle = "Scalper str 1.2", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
takepercent = input(0, defval = 0, minval = 0, maxval = 1000, title = "take, %")
needct = input(false, defval = false, title = "Counter-trend entry")
len = input(20, defval = 20, minval = 2, maxval = 200, title = "Period")
needbb = input(true, defval = true, title = "Show Bands")
needbg = input(true, defval = true, title = "Show Background")
src = close

//PriceChannel 1
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//Distance
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma
hd1 = center + distsma / 2
ld1 = center - distsma / 2

//Trend
trend = close < ld and high < center ? -1 : close > hd and low > center ? 1 : trend[1]

//Lines
colo = needbb == false ? na : black
plot(hd, color = colo, linewidth = 1, transp = 0, title = "High band")
plot(center, color = colo, linewidth = 1, transp = 0, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, title = "Low band")

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 80)

//Body
body = abs(close - open)
smabody = sma(body, 100)

//Signals
bar = close > open ? 1 : close < open ? -1 : 0
up7 = trend == 1 and ((bar == -1 and bar[1] == -1) or (body > smabody and close < open)) ? 1 : 0
dn7 = trend == 1 and bar == 1 and bar[1] == 1 and close > strategy.position_avg_price * (100 + takepercent) / 100 ? 1 : 0
up8 = trend == -1 and bar == -1 and bar[1] == -1 and close < strategy.position_avg_price * (100 - takepercent) / 100 ? 1 : 0
dn8 = trend == -1 and ((bar == 1 and bar[1] == 1) or (body > smabody and close > open)) ? 1 : 0

if up7 == 1 or up8 == 1 
    strategy.entry("Long", strategy.long, needlong == false ? 0 : trend == -1 and needct == false ? 0 : na)

if dn7 == 1 or dn8 == 1
    strategy.entry("Short", strategy.short, needshort == false ? 0 : trend == 1 and needct == false ? 0 : na)
```

> Detail

https://www.fmz.com/strategy/432340

> Last Modified

2023-11-16 16:24:12
