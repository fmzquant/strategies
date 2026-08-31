
> Name

A-Multi-Period-Trading-Strategy-Based-on-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11e7b4d9c2b705d8d7b.png)


## Overview

This strategy combines three indicators - moving averages, Bollinger Bands and the Relative Strength Index (RSI) for multi-period stock trading. It considers crossovers of fast and slow moving averages, RSI below 50 and close price below BB middle band when buying. It considers RSI above 70 and close price above BB upper band when selling.

## Strategy Logic  

The strategy mainly utilizes three indicators for decision making. Firstly, the MACD indicator comprised of fast and slow moving averages. Crossovers of the fast line above the slow line generate buy signals. Secondly, the Bollinger Bands with middle, upper and lower bands. Prices near the lower band present buying opportunities in swing lows, while prices near the upper band present selling opportunities at swing highs. Lastly, the RSI reflects the velocity and rate of change of the price action and identifies potential swing highs and swing lows.

Specifically, the strategy first requires the fast moving average crossing above the slow moving average, indicating strengthening uptrend that suggests buying. It also requires RSI below 50, showing the price may be in oversold levels and presenting buying opportunities. In addition, it requires the close price below BB middle band, indicating the price swing low and a good entry point.   

For profit taking and stop loss, when RSI rises above 70, it indicates the price may be in overbought levels and uptrend momentum is waning, suitable for taking profit. Also when close price rises above BB upper band, it signals elevated risk of pullback, appropriate for profit taking.

## Advantages

The strategy combines the strengths of moving averages, Bollinger Bands and RSI to more precisely decide entry and exit points. The main advantages are:

1. Moving averages determine price uptrend momentum. BB middle band pinpoints swing lows for entry. RSI avoids buying at price peaks. The three together provide relatively ideal buying opportunities during price uptrends.  

2. The combination of RSI and BB upper band captures price swing highs well for taking profit to avoid overbought conditions.

3. Multi-period assessments allow capturing trading opportunities across timeframes to maximize profits. 

4. The logical trading rules make the strategy easily understandable for medium to long term investments.

## Risks

Despite combining indicators to improve decision accuracy, key risks exist:

1. Parameter setting risks. The parameters for the indicators need empirical adjustment. Inadequate tuning impacts strategy performance.

2. More suitable for bull markets. In bear markets, speed of price falls may make stop losses ineffective.

3. Single stock risks remain despite portfolio. Need to diversify investments across assets.  

4. Potentially excessive trading frequency. Optimal parameter setting may result in frequent trades, incurring higher transaction costs and taxes.

Solutions:

1. Adjust parameters based on backtests to achieve suitable signal frequency.  

2. Tune moving average periods to moderate entry frequency and minimize losses.  

3. Diversify investments across more assets to minimize single stock risks.  

4. Relax buying and profit-taking criteria moderately to reduce trade frequency.

## Enhancement Opportunities

There remains further room for optimizations:

1. Add more filters like volume to ensure amplified volumes on buys, improving decision accuracy.

2. Incorporate position sizing modules to dynamically size positions based on market conditions.

3. Utilize deep learning algorithms to auto-tune parameters through training across large datasets.

4. Introduce more timeframes for judgments to expand applicability.

## Conclusion

Overall the strategy has clear, easy-to-understand logic, synergizing indicators to reduce false signals. Further parameter tuning and adding indicators can continue enhancing robustness and decision precision. It suits medium to long term investments and quantitative trading. Nonetheless, no strategy eliminates market risks fully. Appropriate position sizing and stop loss levels are always necessary.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Version: 1.0.1|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|12|(?MACD)Fast Length|
|v_input_4|26|Slow Length|
|v_input_5|9|Signal Smoothing|
|v_input_6|0|Oscillator MA Type: EMA|SMA|
|v_input_7|0|Signal Line MA Type: EMA|SMA|
|v_input_8|20|(?Bollindger Bands)Length|
|v_input_9|2|StdDev|
|v_input_10|14|(?RSI)Length|
|v_input_11|false|(?Stop Loss)╔══════   Enable   ══════╗|
|v_input_12|0|Based on: Percent|ATR|
|v_input_13|10|ATR   Mult|
|v_input_14|14|Length|
|v_input_15|10|Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-25 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//
//@author Alorse
//@version=4
strategy("MACD + BB + RSI [Alorse]", shorttitle="BB + MACD + RSI [Alorse]", overlay=true, pyramiding=0, currency=currency.USD, default_qty_type=strategy.percent_of_equity, initial_capital=1000, default_qty_value=20, commission_type=strategy.commission.percent, commission_value=0.01) 

txtVer = "1.0.1"
version = input(title="Version", type=input.string, defval=txtVer, options=[txtVer], tooltip="This is informational only, nothing will change.")
src = input(title="Source", type=input.source, defval=close)

// MACD
fast_length = input(title="Fast Length", type=input.integer, defval=12, group="MACD")
slow_length = input(title="Slow Length", type=input.integer, defval=26, group="MACD")
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9, group="MACD")
sma_source = input(title="Oscillator MA Type", type=input.string, defval="EMA", options=["SMA", "EMA"], group="MACD")
sma_signal = input(title="Signal Line MA Type", type=input.string, defval="EMA", options=["SMA", "EMA"], group="MACD")
fast_ma = sma_source == "SMA" ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source == "SMA" ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? sma(macd, signal_length) : ema(macd, signal_length)

// Bollinger Bands
bbGroup = "Bollindger Bands"
length = input(20, title="Length", group=bbGroup)
mult = input(2.0, title="StdDev", minval=0.001, maxval=5, group=bbGroup)

basis = sma(src, length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev

// RSI
rsiGroup = "RSI"
lenRSI = input(14, title="Length", minval=1, group=rsiGroup)
// lessThan = input(50, title="Less than", minval=1 , maxval=100, group=rsiGroup)
RSI = rsi(src, lenRSI)

// Strategy Conditions
buy = crossover(macd, signal) and RSI < 50 and close < basis
sell = RSI > 70 and close > upper


// Stop Loss
slGroup = "Stop Loss"
useSL = input(false, title="╔══════   Enable   ══════╗", group=slGroup, tooltip="If you are using this strategy for Scalping or Futures market, we do not recommend using Stop Loss.")
SLbased = input(title="Based on", type=input.string, defval="Percent", options=["ATR", "Percent"], group=slGroup, tooltip="ATR: Average True Range\nPercent: eg. 5%.")
multiATR = input(10.0, title="ATR   Mult", type=input.float, group=slGroup, inline="atr")
lengthATR = input(14, title="Length", type=input.integer, group=slGroup, inline="atr")
SLPercent = input(10, title="Percent", type=input.float, group=slGroup) * 0.01

longStop = 0.0
shortStop = 0.0

if SLbased == "ATR"
    longStop := valuewhen(buy, low, 0) - (valuewhen(buy, rma(tr(true), lengthATR), 0) * multiATR)
    longStopPrev = nz(longStop[1], longStop)
    longStop := close[1] > longStopPrev ? max(longStop, longStopPrev) : longStop

    shortStop := (valuewhen(sell, rma(tr(true), lengthATR), 0) * multiATR) + valuewhen(sell, high, 0)
    shortStopPrev = nz(shortStop[1], shortStop)
    shortStop := close[1] > shortStopPrev ? max(shortStop, shortStopPrev) : shortStop
if SLbased == "Percent"
    longStop  := strategy.position_avg_price * (1 - SLPercent)
    shortStop := strategy.position_avg_price * (1 + SLPercent)

strategy.entry("Long", true, when=buy)
strategy.close("Long", when=sell, comment="Exit")

if useSL
    strategy.exit("Stop Loss", "Long", stop=longStop)

```

> Detail

https://www.fmz.com/strategy/436593

> Last Modified

2023-12-26 10:13:34
