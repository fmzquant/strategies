
> Name

移动平均数RSI相关性加密货币趋势策略Moving-Average-RSI-Crypto-Correlation-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10424cfe19daf190eb8.png)


## Overview

This is a long-term cryptocurrency trend following strategy that combines moving average, relative strength index (RSI) and market correlation to identify mid-to-long term price trends, establish positions when trends start, pyramiding along the trends, and take profit when trend reversal signals are spotted.

## Strategy Logic  

The strategy is mainly based on three indicators:

1. Relative Strength Index (RSI): To identify overbought and oversold conditions. Above 51 is considered overbought and below 49 oversold.

2. Simple Moving Average (SMA): 9-day SMA of close price to determine trend direction. 

3. Market Correlation: Use total cryptocap as benchmark to calculate correlation with trading instrument, replacing original bars with correlation bars to improve signal quality.

Specifically, the trading rules are:

Long entry: When RSI crosses above 51 and close price is above 9-day SMA.

Short entry: When RSI crosses below 49 and close price is below 9-day SMA.

Take profit/Stop loss: 1%/0.1% for longs, 0.05%/0.03% for shorts.

There is also a time condition limiting the trading period.

## Advantage Analysis

1. Combining trend and overbought/oversold indicators effectively tracks mid-to-long term trends.

2. Market correlation improves signal quality, avoiding false trends.

3. Reasonable profit taking and stop loss prevents enlarged losses.  

4. Customizable trading period adapts to different market conditions.

## Risk Analysis  

1. Ineffective in whipsaw or short-term volatile markets.

2. Benchmark reversal may cause lagging exits in trading instruments.

3. Potentially misses reversal opportunities when only doing longs/shorts.

Solutions:

1. Add short-term indicators e.g. KC, BOLL for market regime detection and stops.

2. Enhance benchmark analysis for timely exits.

3. Trade double-sided instruments to capture reversals.

## Optimization Directions

1. Parameter tuning on RSI, SMA, profit taking/stop loss based on market statistics.

2. Evaluate more benchmark/trading combinations with higher correlation and liquidity.

3. Combine with other strategies, using this one for mid-to-long term holdings.

## Conclusion  

This is an optimized and widely-adaptable mid-to-long term cryptocurrency trend following strategy. It effectively combines trend, momentum and correlation analysis to improve trade decisions. Proper parameter tuning and composite usage can greatly enhance its stability and profitability. The long holding periods also suit the high-volatile and hard-to-precisely-capture nature of crypto markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2010|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2021|To Year|
|v_input_7|true|Use Correlation candles?|
|v_input_8|BTC_USDT:swap|symbol|
|v_input_9|50|length|
|v_input_10|51|overSold|
|v_input_11|49|overBought|
|v_input_12|0|Source: haClose|haOpen|haHigh|haLow|
|v_input_13|8|Length Moving average|
|v_input_14|true|takeProfit_long|
|v_input_15|0.1|stopLoss_long|
|v_input_16|0.05|takeProfit_short|
|v_input_17|0.03|stopLoss_short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy(title = "Crypto swing correlation", overlay = true,  pyramiding=1,initial_capital = 1, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.03)

//time
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2010, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

useCorrelation    = input(true, title="Use Correlation candles?")

symbol = input("BTC_USDT:swap", type=input.symbol)

haClose = useCorrelation ? security(symbol, timeframe.period, close) : close
haOpen  = useCorrelation ? security(symbol, timeframe.period, open) : open
haHigh  = useCorrelation ? security(symbol, timeframe.period, high) : high
haLow   = useCorrelation ? security(symbol, timeframe.period, low) : low

length = input( 50 )
overSold = input( 51 )
overBought = input( 49 )

s = input(title="Source", defval="haClose", options=["haClose", "haOpen", "haHigh", "haLow"])

price = s == "haClose" ? haClose: s == "haOpen" ? haOpen : s == "haHigh" ? haHigh : s == "haLow" ? haLow : na

len = input(8, "Length Moving average", minval=1)
src = price
ma = sma(src, len)


vrsi = rsi(price, length)
long = crossover(vrsi, overSold) and time_cond and price > ma
short = crossunder(vrsi, overBought) and time_cond and price < ma


takeProfit_long=input(1.0, step=0.005)
stopLoss_long=input(0.1, step=0.005)
takeProfit_short=input(0.05, step=0.005)
stopLoss_short=input(0.03, step=0.005)

strategy.entry("long",1,when=long)
strategy.entry("short",0,when=short)

strategy.exit("short_tp/sl", "long", profit=close * takeProfit_long / syminfo.mintick, loss=close * stopLoss_long / syminfo.mintick, comment='LONG EXIT',  alert_message = 'closeshort')
strategy.exit("short_tp/sl", "short", profit=close * takeProfit_short / syminfo.mintick, loss=close * stopLoss_short / syminfo.mintick, comment='SHORT EXIT',  alert_message = 'closeshort')

```

> Detail

https://www.fmz.com/strategy/435081

> Last Modified

2023-12-12 10:26:21
