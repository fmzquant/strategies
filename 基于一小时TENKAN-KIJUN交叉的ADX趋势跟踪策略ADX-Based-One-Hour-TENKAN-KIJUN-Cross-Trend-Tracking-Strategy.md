
> Name

基于一小时TENKAN-KIJUN交叉的ADX趋势跟踪策略ADX-Based-One-Hour-TENKAN-KIJUN-Cross-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/209f44aa6c44f0cc0ed.png)



### Overview

This is a simple yet profitable trend tracking strategy based on one-hour time frame TENKAN and KIJUN cross in the ICHIMOKU system combined with ADX indicator to filter out weak trending markets to generate trading signals. It works best on large market cap altcoin BTC pairs like ETH/BTC.

### Strategy Logic  

The strategy uses Conversion Line (TENKAN) and Base Line (KIJUN) cross in ICHIMOKU system to determine market trend direction. TENKAN line is calculated based on the average of highest high and lowest low of past 18 candles, representing fast conversion line. KIJUN line is based on 58 candle periods, standing for standard conversion line.

When TENKAN cross above KIJUN, it is a bullish signal. When TENKAN cross below KIJUN, it is a bearish signal. This aims to capture medium-term trend reversal. 

In addition, ADX indicator is used to gauge the strength of the trend. Only when ADX is above 20, indicating a strong trend, will the signal be triggered.

In summary, this strategy identifies mid-term trend direction via TENKAN and KIJUN cross, and uses ADX to filter out false breakouts, in order to track long-term trends.

### Advantage Analysis 

The main advantages of this strategy are:

1. Using mature and reliable ICHIMOKU system to determine trend direction and turning points.

2. Filtering out weak trending market using ADX to avoid whipsaws in consolidation. 

3. The one-hour timeframe filters market noise and only captures mid-to-long term trends.

4. The logic is straightforward and easy to follow for trend traders.

5. Solid backtesting results especially on high market cap coins like ETH/BTC.

### Risk Analysis

Some risks to note about this strategy:

1. ICHIMOKU parameters are sensitive, needs customization for different pairs.

2. ADX may lag in some cases, causing missed entry.

3. Underperforms in ranging markets with frequent stop loss hit. 

4. Performance varies greatly across different pairs and timeframes.

5. Long holding of positions can be risky, proper stop loss/take profit needed.

Optimization can be done via ADX parameter tuning, adding filters like MACD to reduce false signals, or dynamical adjustment of parameters for robustness.

### Optimization Directions   

Some major directions to improve the strategy:

1. Dynamic optimization of TENKAN and KIJUN parameters for better adaptation.

2. Searching for better trend indicators to replace or combine with ADX.

3. Adding stop loss/take profit to control risk/reward ratio.

4. Ensemble modeling with complementary indicators to improve stability. 

5. Modularization and flexibility for parameter tuning on more pairs.

6. Quantitative risk management e.g. max drawdown control against extreme moves.

### Conclusion

In conclusion, this is a simple yet practical trend tracking strategy, mainly based on TENKAN/KIJUN cross and ADX to identify mid-to-long term trends and generate signals. It has shown positive backtesting results, especially on high market cap BTC pairs like ETH/BTC, with relatively stable profitability. But it also relies on parameter tuning, requires per-pair optimization. Risk control per trade is also necessary to limit losses when trends reverse. Overall this offers valuable reference of a trend following strategy for algo traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|18|Conversion Line Periods (Tenkan)|
|v_input_3|58|Base Line Periods (Kijun)|
|v_input_4|14|ADX Smoothing|
|v_input_5|14|DI Length|
|v_input_6|20|threshold|
|v_input_7|3|From Day|
|v_input_8|9|From Month|
|v_input_9|2018|From Year|
|v_input_10|3|To Day|
|v_input_11|9|To Month|
|v_input_12|2019|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-07 00:00:00
end: 2023-12-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="Odin's Kraken (TK Cross Strategy)", shorttitle="Odin's Kraken", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

src = input(close, title="Source")

// define tk in ichimoku

conversionPeriods = input(18, minval=1, title="Conversion Line Periods (Tenkan)"),
basePeriods = input(58, minval=1, title="Base Line Periods (Kijun)")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)

TK_Uptrend = crossover(conversionLine,baseLine)
TK_Downtrend = crossunder(conversionLine,baseLine)

plot(conversionLine, color=lime, title="Tenkan", linewidth=3)
plot(baseLine, color=red, title="Kijun", linewidth=3)

// define ADX

adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
th = input(title="threshold", defval=20)
dirmov(len) =>
	up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)

	[plus, minus]

adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	
[plus, minus] = dirmov(dilen)
sig = adx(dilen, adxlen)

// backtesting range

// From Date Inputs
fromDay = input(defval = 3, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2018, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 3, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 9, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2019, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

// open long and short

longCondition = TK_Uptrend
if (longCondition and sig > 12 and time_cond)
    strategy.entry("LONG", strategy.long)

shortCondition = TK_Downtrend
if (shortCondition and sig > 12 and time_cond)
    strategy.entry("SHORT", strategy.short)

// close trade if backtesting criteria not met

if (not time_cond)
    strategy.close_all()



```

> Detail

https://www.fmz.com/strategy/434704

> Last Modified

2023-12-08 15:37:00
