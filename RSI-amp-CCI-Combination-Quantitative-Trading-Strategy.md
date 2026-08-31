
> Name

RSI-amp-CCI-Combination-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d16ca004eae218543d.png)
 ## Overview  

This strategy is named RSI &amp; CCI Combination Quantitative Trading Strategy. It mainly uses the combination of RSI indicator and CCI indicator to judge the overbought/oversold status in the market and capture reversal opportunities. Specifically, the strategy calculates the buy and sell signals of RSI, combined with CCI indicator’s trading signals, to set up the long and short entry rules. When the entry rules are met, corresponding long or short positions will be opened.

## Strategy Logic

The core logic of this strategy is to utilize both the statistical properties of RSI indicator and CCI indicator to determine whether the market is currently in an overbought or oversold state.

Firstly, the RSI part. The RSI indicator can reflect the overbought/oversold phenomena in the market. RSI greater than 70 is typically considered overbought, while less than 30 is oversold. This strategy sets two RSI indicators, a long-term RSI with default 14 periods, and a short-term RSI with 12 periods. The long-term RSI judges overall trend, while the short-term RSI tracks more sensitive turning points. When both RSI lines indicate the same direction (such as double overbought or double oversold), it means the market is in a significant imbalanced state, which provides best reversal opportunities.  

Secondly, the CCI part. The CCI indicator can also be used to identify overbought/oversold levels. CCI higher than 100 is considered overbought, while lower than -100 is oversold. This strategy utilizes this characteristic of CCI to set up entry rules: when CCI signal is consistent with the RSI indicator, the entry signal indicated by RSI will be executed.

Specifically, the entry rules are:  

1. Long entry: when RSI shows oversold area (both long and short term RSI below 30), and CCI is lower than -100, go long.

2. Short entry: when RSI shows overbought area (both long and short term RSI above 70), and CCI is higher than 100, go short.  

By the joint judgment of RSI and CCI, overbought/oversold zones can be effectively confirmed, hence enhancing the stability and profitability of the strategy.

## Advantage Analysis   

The biggest advantage of this strategy lies in the simultaneous use of both RSI and CCI statistical patterns to identify overbought/oversold signals more precisely, which provides ideal turning points to capture reversals. The concrete advantages include:

1. The combination of long and short RSI judges both trend and sensitive inflection points, which helps capture opportunities flexibly.  
2. CCI’s confirmation avoids misleading by false reversals in the market.
3. Through RSI and CCI’s joint signals, false signals can be filtered effectively, making entries more accurate.  
4. Trading reversal in overbought/oversold zones itself is a strategy idea with relatively big winning odds.
5. The strategy is simple to understand and implement, suitable for quant beginners to learn.
   
## Risk Analysis   

The major risk of this strategy is that the overbought/oversold signals indicated by RSI and CCI may not completely reflect the real reversal timing. The concrete risks include:  

1. Indicator may give false reversal signals. E.g. price fluctuation instead of trend reversal.
2. Time lag would exist even if directional correctness. Parameters change within the computing cycle cannot fully synchronize the latest price moves.  
3. Stop loss may be touched during reversals hence enlarge loss.  
4. Major trend influence is not considered which should incorporate with trend analysis in actual trading.

Corresponding solutions include:

1. Reversals with huge volume tend to perform better in confirming signals.  
2. Try optimizing parameters of RSI and CCI to lower the probability of time lags.  
3. Set stop loss properly to control single trade loss.  
4. In actual trading, combine with trend and technical analysis to avoid trading against major trends.
  

## Optimization Directions   

The strategy can be further optimized in actual trading, mainly:  

1. Test and find the optimal parameter combinations for RSI and CCI, like the long/short cycle of RSI and CCI's cycle.
2. Add other indicators to enrich entry signals, like KD, MACD etc.  
3. Add stop loss strategies, like mobile stop loss or shark fin stop loss.
4. Combine advanced win rate models to determine higher probability entry directions judging from indicator divergences.
5. Utilize machine learning algorithms to auto optimize parameters and signal weights.  
6. Test the combination strategies with trend-following systems.  
7. Add rules considering higher time frame trends and key price levels, to avoid trading against major trends.
  
Through tests and optimizations, expectancy of the strategy's profitability and stability could be further improved.


## Conclusion   

The strategy belongs to a typical reversal capturing strategy. By combining two commonly used indicators, RSI and CCI, it judges overbought/oversold levels and sets up corresponding entry rules, forming a simple practical short term trading strategy. The biggest advantage is that the joint use of the two indicators makes signal judgment more accurate, avoiding fake reversals, and grasps the best timing for reversals. Of course risks exist, requiring optimizations in indicators themselves, stop loss strategies, and collaborating with trend analysis. Overall speaking, it provides beginners a simple reliable quant approach, worth learning and practicing.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|length|
|v_input_2|12|fastLength|
|v_input_3|26|slowLength|
|v_input_4|2|signalLength|
|v_input_5_close|0|CCI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-22 00:00:00
end: 2024-01-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Author: RvZ14
//Based on Joseph Nemeth MACD+CCI strategy
//Reference reading: https://sites.google.com/site/forexjosephnemeth/home/macd-cci

strategy(title="MACD+CCI Strategy", shorttitle="macd/cci")
length = input(14, minval=1)
fastLength = input(12, minval=1), slowLength=input(26,minval=1)
signalLength=input(2,minval=1)
src = input(close, title="CCI Source")

//cci
ma = sma(src, length)
cci = (src - ma) / (0.015 * dev(src, length))
plot(cci, title = "cci", color=#5DADE2,linewidth = 1,transp = 0)
band1 = hline(100, color=gray, linewidth = 1)
band0 = hline(-100, color=gray, linewidth = 1)
fill(band1, band0, color= #F9E79F)

//macd
source = close
fastMA = ema(source, fastLength)
slowMA = ema(source, slowLength)
macd = fastMA - slowMA
signal = ema(macd, signalLength)
hist = macd - signal
plot(hist, color=#EC7063, style=histogram)
plot(macd, title = "macd", color=#5DADE2, linewidth = 1,transp = 0)
plot(signal, title = "signal", color=#F5B041,linewidth = 1,transp = 0)

longCond = cci > 100 and macd > 0 or cci > -100 and macd < 0
shortCond = cci < -100 and macd < 0 or cci < 100 and macd > 0
strategy.entry("long",strategy.long,when = longCond == true)
strategy.entry("short",strategy.short,when=shortCond == true)
```

> Detail

https://www.fmz.com/strategy/439605

> Last Modified

2024-01-22 10:33:03
