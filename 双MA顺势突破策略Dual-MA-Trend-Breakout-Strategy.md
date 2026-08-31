
> Name

双MA顺势突破策略Dual-MA-Trend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10eb974855f680c012d.png)


## Overview  

The Dual MA Trend Breakout strategy is a quantitative trading strategy that uses two moving averages of different periods to determine the trend and generate entry signals. It mainly judges the overall trend direction through the slow MA and uses the fast MA for entry filtering. When the direction of the larger timeframe trend is consistent, it selects reversal bars to enter, in order to pursue higher win rate and profitability.

## Strategy Logic

The strategy consists of the following main parts:

**Trend Judgement**: Calculates the 21-period MA, defined as the slow MA. Its position is relatively stable and can be used to judge the overall trend direction. When prices rise close to this MA, it is an upward trend. When prices fall close to this MA, it is a downward trend.

**Entry Filtering**: Calculates the 5-period MA, defined as the fast MA. Only when the price breaks through both the slow MA and the fast MA, the trading signal is triggered. This design mainly further filters the possibility of false breakouts. 

**Candle Filtering**: The strategy only goes long when the current candle is bearish, or goes short when the current candle is bullish. This considers that using reversal bars for entry can obtain higher success rate. It also combines the fast RSI indicator to avoid entering in overbought or oversold areas.

**Pyramiding Filter**: For the crypto market, the strategy additionally includes a tripling volatility breakout condition to capture oversold opportunities in significant downtrends.  

**Stop Loss**: The strategy supports moving stop loss. After opening positions, the stop loss will be updated in real-time based on the set percentage.

## Advantage Analysis 

The advantages of this strategy include:

1. The dual MA design is simple and practical, easy to understand and master;
2. Reliable trend judgment by combing fast and slow MAs; 
3. Reversal bar entry improves trading win rate;
4. The overall methodology is conservative and stable, suitable for all timeframes;
5. Supports moving stop loss to control risks;
6. Specially considers the characteristics of the crypto market by adding oversold pyramiding opportunities to obtain excess returns.

## Risk Analysis

The strategy also has some risks:

1. During range-bound dual MA periods, there will be multiple small wins and losses.
2. Reversal bar entry may have low win rate in some timeframes.
3. The crypto market has high volatility and high chance of stop loss being triggered. 
4. Oversold pyramiding opportunities are not many, with high return volatility.

To address these risks, optimizations can be made in the following aspects:

1. Add more entry conditions to avoid ineffective whipsaws;
2. Adjust timeframe or add other indicators for filtering; 
3. Optimize stop loss algorithms to track near midline;
4. Evaluate actual performance of oversold pyramiding strategies. 

## Optimization Directions

The main aspects to optimize this strategy include:

1. **Parameter Optimization**: Systematically backtest to find optimal fast and slow MA period combinations to improve risk-adjusted returns.

2. **Pattern Recognition**: Add other indicators like KDJ, MACD to identify more reliable reversal signals.  

3. **Stop Loss Optimization**: Develop floating or trailing stop loss algorithms to lower chance of being stopped out.

4. **Machine Learning**: Collect and label more historical data to automatically generate trading rules using ML.

5. **Position Sizing**: Dynamically adjust position sizing based on market conditions.

## Conclusion   

The Dual MA Trend Breakout Strategy is generally a simple and practical trend following strategy. Compared to complex machine learning algorithms, this strategy is easier to interpret and master, with higher reliability. With parameter tuning, feature expansion and ML augmentation, this strategy has great potential for improvement and is a great starting point for quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|false|stops|
|v_input_4|5|Stop, %|
|v_input_5|false|Use OHLC4|
|v_input_6|true|Use fast MA Filter|
|v_input_7|5|fast MA Period|
|v_input_8|21|slow MA Period|
|v_input_9|2|Bars Q|
|v_input_10|false|Need trend Background?|
|v_input_11|false|Need entry arrows?|
|v_input_12|true|Need extreme? (crypto/fiat only!!!)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-31 00:00:00
end: 2024-01-07 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's Trend MAs Strategy v2.0 +CB", shorttitle = "Trend MAs str 2.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

//Settings
needlong = input(true, "long")
needshort = input(true, "short")
needstops = input(false, "stops")
stoppercent = input(5, defval = 5, minval = 1, maxval = 50, title = "Stop, %")
useohlc4 = input(false, defval = false, title = "Use OHLC4")
usefastsma = input(true, "Use fast MA Filter")
fastlen = input(5, defval = 5, minval = 1, maxval = 50, title = "fast MA Period")
slowlen = input(21, defval = 20, minval = 2, maxval = 200, title = "slow MA Period")
bars = input(2, defval = 2, minval = 0, maxval = 3, title = "Bars Q")
needbg = input(false, defval = false, title = "Need trend Background?")
needarr = input(false, defval = false, title = "Need entry arrows?")
needex = input(true, defval = true, title = "Need extreme? (crypto/fiat only!!!)")

src = useohlc4 == true ? ohlc4 : close

//PriceChannel 1
lasthigh = highest(src, slowlen)
lastlow = lowest(src, slowlen)
center = (lasthigh + lastlow) / 2

//PriceChannel 2
lasthigh2 = highest(src, fastlen)
lastlow2 = lowest(src, fastlen)
center2 = (lasthigh2 + lastlow2) / 2

//Trend
trend = low > center and low[1] > center[1] ? 1 : high < center and high[1] < center[1] ? -1 : trend[1]

//Bars
bar = close > open ? 1 : close < open ? -1 : 0
redbars = bars == 0 ? 1 : bars == 1 and bar == -1 ? 1 : bars == 2 and bar == -1 and bar[1] == -1 ? 1 : bars == 3 and bar == -1 and bar[1] == -1 and bar[2] == -1 ? 1 : 0
greenbars = bars == 0 ? 1 : bars == 1 and bar == 1 ? 1 : bars == 2 and bar == 1 and bar[1] == 1 ? 1 : bars == 3 and bar == 1 and bar[1] == 1 and bar[2] == 1 ? 1 : 0

//Fast RSI
fastup = rma(max(change(close), 0), 2)
fastdown = rma(-min(change(close), 0), 2)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//CryptoBottom
mac = sma(close, 10)
len = abs(close - mac)
sma = sma(len, 100)
max = max(open, close)
min = min(open, close)
up3 = close < open and len > sma * 3 and min < min[1] and fastrsi < 10 ? 1 : 0

//Signals
up = trend == 1 and (low < center2 or usefastsma == false) and (redbars == 1) ? 1 : 0
dn = trend == -1 and (high > center2 or usefastsma == false) and (greenbars == 1) ? 1 : 0

up2 = high < center and high < center2 and bar == -1 ? 1 : 0
dn2 = low > center and low > center2 and bar == 1 ? 0 : 0

//Lines
plot(center, color = blue, linewidth = 3, transp = 0, title = "Slow MA")
plot(center2, color = red, linewidth = 3, transp = 0, title = "PriceChannel 2")

//Arrows
plotarrow(up == 1 and needarr == true ? 1 : 0, colorup = black, colordown = black, transp = 0)
plotarrow(dn == 1 and needarr == true ? -1 : 0, colorup = black, colordown = black, transp = 0)

//Background
col = needbg == false ? na : trend == 1 ? lime : red
bgcolor(col, transp = 90)

//Alerts
alertcondition(up == 1, title='buy', message='Uptrend')
alertcondition(dn == 1, title='sell', message='Downtrend')

//Trading
stoplong = up == 1 and needstops == true ? close - (close / 100 * stoppercent) : stoplong[1]
stopshort = dn == 1 and needstops == true ? close + (close / 100 * stoppercent) : stopshort[1]

longCondition = up == 1 or (up2 == 1 and needex == true) or up3 == 1
if (longCondition)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)
    strategy.exit("Stop Long", "Long", stop = stoplong)

shortCondition = dn == 1
if (shortCondition)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    strategy.exit("Stop Short", "Short", stop = stopshort)
```

> Detail

https://www.fmz.com/strategy/438058

> Last Modified

2024-01-08 16:43:38
