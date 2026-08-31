
> Name

基于量价回落与多重止盈的先进交易策略Advanced-Strategy-with-Volume-and-Price-Pullback-Multiple-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c39a22b0e751e88101.png)


### Overview  

This strategy combines moving average crossover, relative strength index (RSI), and significantly amplified trading volume to take long/short positions after detecting certain percentage of pullback in price on high volume spikes. It sets up three-tiered take profit orders to lock in different levels of profits. There is also an optional trailing stop loss feature to capture additional profits if price continues to move favorably.  

### Principles  

Crossover of fast and slow moving averages provides early signals of trend direction change. RSI indicator assesses overbought/oversold conditions to avoid these scenarios for more robust entry signals. A significant increase over average volume signals potential price movement catching market attention. These volume spikes reinforce the strength of entry signals. After volume spike and price increase, entry orders are triggered when price and volume have retracted a specified percentage, indicating potential correction or reversal. Three staggered TP orders are used to realize profits. Each TP level closes a portion of position when reaching predetermined profit target. An optional trailing stop feature is available for each TP. Once price hits TP target, trailing stop follows position to capture more profits if price keeps moving favorably.  

Same principles apply for short entry and exit signals. This strategy facilitates both long and short trades.  

### Advantage Analysis

Main advantages of this strategy:

1. Crossover of fast/slow MAs combined with RSI form robust entry signals, avoiding overbought/oversold areas to increase winning odds.  

2. Volume spikes ensure large price swings are captured for position establishment, strengthening signal force.   

3. Price/volume pullback mechanism enhances precision of entry timing to capture reversal or upswing opportunities.  

4. Three-tiered TPs utilize price uptrend to lock in profits based on risk tolerance.   

5. Optional trailing stop allows flexibility to enable for capital preservation while retaining chance for higher profits depending on market volatility.  

6. Applicable to both long and short trades, profits can be realized in either uptrend or downtrend markets, enhancing utility.  

### Risk Analysis  

Despite careful design, trading any financial products bears risks. Caution of certain scenarios:

1. MA crossovers do not always accurately determine trend. Wrong signals may occur if inappropriate MA parameters used.  

2. Improper RSI period setting may lead to failure to avoid overbought/oversold areas. Period needs adjustment per market.   

3. Volume spikes don't necessarily perfectly match significant price changes. Volume reference standard requires fine tuning.  

4. Excessive or inadequate price/volume pullback affects entry timing. This factor also needs market-based adjustment.   

5. Preset take profit levels can't guarantee full TP orders execution. Sudden market shift may cause slippage.  

6. Overly wide trailing stop loss may prematurely exit positions forfeiting greater profits.  

These risks demand code optimization, parameter tuning, and rigorous backtests to ensure strategy reliability.  

### Optimization Directions   

Further improvements:  

1. Add other indicators like Bollinger Bands or KD to assist entry decisions, improving accuracy.    

2. Incorporate machine learning models like LSTM to establish dynamic MAs automatically adapting parameters to latest market conditions, enhancing trend capture.   

3. Build in dynamic stop loss/profit taking based on market volatility to auto adjust levels accordingly.  

4. Utilize cointegration analysis to optimally choose pullback factor per market-wide price movement vs individual stock correlations, obtaining optimal entry timing.   

5. Employ multifactor models with sentiment analysis, association rules mining etc. to select stocks with highest price/volume change correlations to implement strategy for tremendous performance lift.  

### Conclusion   

This is an excellent strategy for intermediate to short-term traders after enhancement. With increasingly robust and intelligent functions built on optimization, it bears great practical merits for live trading while striving to deliver market beating returns with risks firmly checked. As a progressively advanced quantitative strategy, it exemplifies steady and prudent trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Moving Average|
|v_input_2|26|Slow Moving Average|
|v_input_3|14|RSI Period|
|v_input_4|20|Volume MA Length|
|v_input_5|2|Volume Spike Multiplier|
|v_input_6|true|Trailing Offset (%)|
|v_input_7|50000|USDT per Trade|
|v_input_8|0.8|Retracement Factor for Entry|
|v_input_9|true|Take Profit 1 (%)|
|v_input_10|2|Take Profit 2 (%)|
|v_input_11|3|Take Profit 3 (%)|
|v_input_12|true|Use Trailing Stop for Take Profits|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-11 00:00:00
end: 2023-12-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Advanced Strategy with Volume and Price Retracement and Multi-Take Profit (USDT)", overlay=true)

// Parametreler
fastLength = input(12, minval=1, title="Fast Moving Average")
slowLength = input(26, minval=1, title="Slow Moving Average")
rsiPeriod = input(14, minval=1, title="RSI Period")
volLength = input(20, minval=1, title="Volume MA Length")
volMultiplier = input(2.0, title="Volume Spike Multiplier")
trailOffset = input(1, title="Trailing Offset (%)")
usdtPerTrade = input(50000, title="USDT per Trade")
retraceFactor = input(0.8, title="Retracement Factor for Entry")
takeProfit1 = input(1, title="Take Profit 1 (%)")
takeProfit2 = input(2, title="Take Profit 2 (%)")
takeProfit3 = input(3, title="Take Profit 3 (%)")
trailForTP = input(true, title="Use Trailing Stop for Take Profits")

// Hesaplamalar
fastMA = sma(close, fastLength)
slowMA = sma(close, slowLength)
rsi = rsi(close, rsiPeriod)
volMA = sma(volume, volLength)
volumeSpike = volume > volMA * volMultiplier

// Durum Değişkenleri ve Saklanan Değerler
var float spikeVolume = na
var float spikePrice = na
var int direction = 0

// Alım/Satım Sinyalleri
longCondition = crossover(fastMA, slowMA) and rsi < 70
shortCondition = crossunder(fastMA, slowMA) and rsi > 30

// Hacim Spike ve Fiyat Hareketinin Saklanması
if (longCondition and volumeSpike)
    spikeVolume := volume
    spikePrice := close
    direction := 1
else if (shortCondition and volumeSpike)
    spikeVolume := volume
    spikePrice := close
    direction := -1

// Retracement Kontrolü ve Giriş Emirleri
if (direction == 1 and volume < spikeVolume * retraceFactor and close < spikePrice * (1 - trailOffset / 100))
    strategy.entry("Long", strategy.long, qty=usdtPerTrade / close)
    spikeVolume := na
    direction := 0
else if (direction == -1 and volume < spikeVolume * retraceFactor and close > spikePrice * (1 + trailOffset / 100))
    strategy.entry("Short", strategy.short, qty=usdtPerTrade / close)
    spikeVolume := na
    direction := 0

// Take Profit Emirleri
if strategy.position_size > 0
    strategy.exit("TP1", "Long", limit=strategy.position_avg_price * (1 + takeProfit1 / 100), qty_percent=33, trail_offset=trailForTP ? atr(14) / 2 : na)
    strategy.exit("TP2", "Long", limit=strategy.position_avg_price * (1 + takeProfit2 / 100), qty_percent=33, trail_offset=trailForTP ? atr(14) : na)
    strategy.exit("TP3", "Long", limit=strategy.position_avg_price * (1 + takeProfit3 / 100), qty_percent=34, trail_offset=trailForTP ? atr(14) * 1.5 : na)

if strategy.position_size < 0
    strategy.exit("TP1", "Short", limit=strategy.position_avg_price * (1 - takeProfit1 / 100), qty_percent=33, trail_offset=trailForTP ? atr(14) / 2 : na)
    strategy.exit("TP2", "Short", limit=strategy.position_avg_price * (1 - takeProfit2 / 100), qty_percent=33, trail_offset=trailForTP ? atr(14) : na)
    strategy.exit("TP3", "Short", limit=strategy.position_avg_price * (1 - takeProfit3 / 100), qty_percent=34, trail_offset=trailForTP ? atr(14) * 1.5 : na)

// Pozisyon çıkışları
strategy.close("Long", when=shortCondition)
strategy.close("Short", when=longCondition)

```

> Detail

https://www.fmz.com/strategy/435131

> Last Modified

2023-12-12 15:39:19
