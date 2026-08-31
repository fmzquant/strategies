
> Name

多时间帧布林带加密货币策略Multi-timeframe-Bollinger-Bands-Crypto-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/691c599e08238f0325.png)

## Overview

This strategy applies Bollinger Bands indicator across 1 minute, 3 minutes, 5 minutes and 15 minutes timeframes to analyze price movements of cryptocurrencies, in order to identify buying and selling opportunities. It uses the 5-minute prices of Bitcoin as a benchmark for the overall cryptocurrency market sentiment. When Bitcoin price breaks above the upper band, the market is considered to be bullish. When the price breaks below the lower band, the market is considered to be bearish. The strategy looks for upper or lower band breakouts across different cryptos and timeframes. These breakout patterns usually signify shifts in market sentiment and trends, thus providing entry and exit signals.  

## Strategy Logic

The strategy calculates Bollinger Bands simultaneously on the 1-minute, 3-minute, 5-minute and 15-minute timeframes. The Bollinger Bands consist of an n-day (default 20-day) moving average and a number of standard deviations (default 1.5x) above and below it. The moving average represents the average price of the crypto over a period of time and the standard deviation measures the volatility. When prices approach or break above the upper band, it indicates the market is overextended and volatility is expanding, signaling a potential reversal downwards. When prices approach or break below the lower band, it signals the market is oversold with expanding volatility and a potential upwards reversal.  

Leveraging this feature of Bollinger Bands, the strategy judges the latest market developments across different time horizons - 1 minute, 3 minutes, 5 minutes and 15 minutes. When there is an upper or lower band breakout in the 3-minute or 5-minute timeframes, plus confirming signs in the 1-minute and 15-minute timeframes, the strategy determines a latest buy or sell signal is triggered. In addition, the strategy also refers to the 5-minute prices of Bitcoin to gauge the overall market trend and sentiment (bullish/bearish bias) in the entire crypto market. Based on these factors, the strategy decides whether to go long or short.

After entering trades, the strategy also sets profit taking and stop loss conditions. If the entry price rises or falls by 25%, take profit will be triggered. If the price moves more than 25% against the entry direction, stop loss will be triggered.

## Advantages

1. The strategy incorporates both short-term and mid-term market views - 1 minute and 5 minutes for latest updates, 15 minutes for mid-term trend, avoiding being misled by temporary market fluctuations.  

2. The strategy monitors breakouts of the middle band, upper band and lower band, minimizing missed opportunities.

3. Bitcoin serves as a benchmark and barometer for overall market conditions and sentiments, enhancing decision accuracy.  

4. Profit taking and stop loss mechanisms effectively control risks.

## Risks

1. Bollinger Band breakouts have some lagging attributes and may miss best entry timing.  

2. The strategy is vulnerable to market-wide systemic risks like passwords black swan events.

3. Despite profit taking and stop loss in place, losses can still exceed stop loss margin under extreme events.

4. Inappropriate parameter settings like time period, standard deviation multiplier can lead to poor signal quality.

Corresponding solutions:

1. Incorporate more indicators to determine optimal entry timing.  

2. Enhance assessment of market-level systemic risks.  

3. Reduce position sizing and stop loss margin for each trade.

4. Optimize parameter settings via backtesting.

## Enhancement Opportunities

1. Add more timeframes like 30-minute or 60-minute Bollinger Bands.  

2. Select Bollinger Bands parameters more fitting to the characteristics of each crypto.

3. Incorporate trading volume for result verification, as trading volumes validate price movement reliability.  

4. Combine other indicators like Stoch RSI, MACD to improve decision accuracy. These indicators can significantly enhance judging actual market movements.

5. Compare price movements and correlations between cryptos and pick the ones with most room to maneuver. 

6. Optimize profit taking and stop loss mechanisms by statistical analysis of historical performance to determine optimal settings.

## Conclusion

This is a multi-timeframe Bollinger Bands cryptocurrency trading strategy. It focuses on price developments across short-term and mid-term time horizons, leveraging Bollinger Bands to gauge the MULTI bullish/bearish status of the market. Meanwhile, it uses Bitcoin's price levels as benchmarks and references to help determine the overall trend in the broader cryptocurrency market. With its versatility in incorporating multiple timeframes, plus robust profit taking and stop loss mechanisms, this strategy can effectively capitalize opportunities and control risks. Going forward, its performance can be further enhanced by optimizations like integrating more indicators and fine-tuning parameters via backtesting.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_string_1|0|Basis MA Type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|1.5|StdDev|
|v_input_int_2|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(shorttitle="Crypto BB", title="Multi-Interval Bollinger Band Crypto Strategy", overlay=true)
length = input.int(20, minval=1)
maType = input.string("SMA", "Basis MA Type", options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
src = input(close, title="Source")
mult = input.float(1.5, minval=0.001, maxval=50, title="StdDev")

interval1m = request.security(syminfo.tickerid, '1', src)
interval3m = request.security(syminfo.tickerid, '3', src)
interval5m = request.security(syminfo.tickerid, '5', src)
interval15m = request.security(syminfo.tickerid, '5', src)
btcinterval5m = request.security("BTC_USDT:swap", "5", src)
bitcoinSignal = 'flat'

var entryPrice = 0.000

ma(source, length, _type) =>
    switch _type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

bitcoinBasis = ma(btcinterval5m, length, maType)
bitcoinDev = ta.stdev(btcinterval5m, length)
bitcoinUpper = bitcoinBasis + bitcoinDev
bitcoinLower = bitcoinBasis - bitcoinDev

basis1m = ma(interval1m, length, maType)
basis3m = ma(interval3m, length, maType)
basis5m = ma(interval5m, length, maType)
basis15m = ma(interval5m, length, maType)
dev1m = mult * ta.stdev(interval1m, length)
dev3m = mult * ta.stdev(interval3m, length)
dev5m = mult * ta.stdev(interval5m, length)
upper1m = basis1m + dev1m
lower1m = basis1m - dev1m
upper3m = basis3m + dev3m
lower3m = basis3m - dev3m
upper5m = basis5m + dev5m
lower5m = basis5m - dev5m
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis3m, "Basis 3 minute", color=#2962FF, offset = offset)
p3upper = plot(upper3m, "Upper", color=#2962FF, offset = offset)
p3lower = plot(lower3m, "Lower", color=#2962FF, offset = offset)

//Exit protocols
if strategy.opentrades != 0 and strategy.opentrades.entry_id(0) == 'Buy'
    entryPrice := strategy.opentrades.entry_price(0)
    if ((interval1m - entryPrice)/entryPrice) * 30 > .25
        strategy.close('Buy', comment='Take Profit on Buy')
    if ((interval1m - entryPrice)/entryPrice) * 30 < -.25
        strategy.close('Buy', comment='Stop Loss on Buy')

if strategy.opentrades != 0 and strategy.opentrades.entry_id(0) == 'Sell'
    entryPrice := strategy.opentrades.entry_price(0)
    if ((entryPrice - interval1m)/entryPrice) * 30 > .25
        strategy.close('Sell', comment='Take Profit on Sell')
    if ((entryPrice - interval1m)/entryPrice) * 30 < -.25
        strategy.close('Sell', comment='Stop Loss on Sell')

//Bitcoin Analysis
if (btcinterval5m < bitcoinUpper and btcinterval5m[1] > bitcoinUpper[1] and btcinterval5m[2] < bitcoinUpper[2] and btcinterval5m[3] < bitcoinUpper[3])
    bitcoinSignal := 'Bear'
if (btcinterval5m > bitcoinUpper and btcinterval5m[1] < bitcoinUpper[1] and btcinterval5m[2] > bitcoinUpper[2] and btcinterval5m[3] > bitcoinUpper[3])
    bitcoinSignal := 'Bull'

//Short protocols
if (interval3m < basis3m and interval3m[1] > basis3m[1] and interval3m[2] < basis3m[2] and interval3m[3] < basis3m[3]) or 
 (interval5m < basis5m and interval5m[1] > basis5m[1] and interval5m[2] < basis5m[2] and interval5m[3] < basis5m[3]) 
  and strategy.opentrades.entry_id(0) != 'Sell'
   and src < basis1m and src < basis15m
    if strategy.opentrades.entry_id(0) == 'Buy'
        strategy.close('Buy', 'Basis Band Bearish Reversal')
    //strategy.order('Sell', strategy.short, comment = 'Basis band fractal rejection', stop = (upper1m + basis1m)/2)

if (interval3m < upper3m and interval3m[1] > upper3m[1] and interval3m[2] < upper3m[2] and interval3m[3] < upper3m[3]) or 
 (interval5m < upper5m and interval5m[1] > upper5m[1] and interval5m[2] < upper5m[2] and interval5m[3] < upper5m[3]) 
  and strategy.opentrades.entry_id(0) != 'Sell' and bitcoinSignal == 'Bear' and src < upper1m  and src < basis15m
    if strategy.opentrades.entry_id(0) == 'Buy'
        strategy.close('Buy', 'Bearish Trend Reversal')
    strategy.order('Sell', strategy.short, comment = 'Upper band fractal rejection', stop = (upper1m + basis1m)/2)

if (interval3m > basis3m and interval3m[1] < basis3m[1] and interval3m[2] > basis3m[2] and interval3m[3] > basis3m[3]) or 
 (interval5m > basis5m and interval5m[1] < basis5m[1] and interval5m[2] > basis5m[2] and interval5m[3] > basis5m[3]) and strategy.opentrades.entry_id(0) != 'Buy' 
  and src > basis1m  and src > basis15m
    if strategy.opentrades.entry_id(0) == 'Sell'
        strategy.close('Sell', 'Basis Band Bullish Reversal')
    //strategy.order('Buy', strategy.long, comment = 'Basis band fractal rejection', stop = (lower1m + basis1m)/2)

if (interval3m > lower3m and interval3m[1] < lower3m[1] and interval3m[2] > lower3m[2] and interval3m[3] > lower3m[3]) or 
 (interval5m > lower5m and interval5m[1] < lower5m[1] and interval5m[2] > lower5m[2] and interval5m[3] > basis5m[3]) and strategy.opentrades.entry_id(0) != 'Buy' 
  and src > lower1m  and src > basis15m and bitcoinSignal == 'Bull' 
    if strategy.opentrades.entry_id(0) == 'Sell'
        strategy.close('Sell', 'Bullish Trend Reversal')
    strategy.order('Buy', strategy.long, comment = 'Lower band fractal rejection', stop = (lower1m + basis1m)/2)
```

> Detail

https://www.fmz.com/strategy/442925

> Last Modified

2024-02-27 14:13:39
