
> Name

Dual-Momentum-Breakthrough-and-Volatility-Filtering-Algorithmic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11778eeb8dd21b36777.png)

### Overview

This strategy mainly uses the crossover of dual EMA momentum and DEMA momentum to identify trends, and incorporates the ATR volatility index to filter false breakouts, implementing a quantitative trading strategy with dual momentum indicators and volatility filtering.

### Strategy Principle 

The main components of this strategy include:

1. Calculate EMA and DEMA of price as dual momentum indicators. The longer period EMA reflects long-term trends, while DEMA serves as a more sensitive short-term momentum indicator. A buy signal is generated when DEMA crosses above EMA.

2. Calculate the ATR volatility index. Use the ATR value to determine market volatility and liquidity conditions. Filter momentum indicator signals when volatility is too high to avoid false breakouts.  

3. ATR volatility is judged as high or low by a parameterized moving average line. Momentum indicator signals are only triggered when ATR volatility is below the moving average line.

4. Parameters control ATR timeframe, ATR length, ATR moving average type and length etc.

5. Establish stop loss, take profit and trailing stop rules for long positions.

### Advantage Analysis

The dual EMA filter can significantly reduce false signals and overtrading compared to basic EMA cross strategies. Adding the ATR volatility index effectively filters out misleading signals from minor fluctuations and avoids being trapped.

Compared to single momentum indicators, the dual design can improve judgment effectiveness. As a more responsive short-term momentum indicator, DEMA combined with the stable long term EMA forms a reliable combo signal.

By tuning ATR parameters, appropriate volatility thresholds can be set for different tickers, improving strategy adaptability.  

### Risk Analysis

The biggest risk is that improper parameter settings may result in too few trading signals. Overly long DEMA and EMA lengths, or ATR volatility thresholds set too high, can all undermine actual strategy performance. Repeated backtests are needed to find the optimal parameter combination.  

Another potential risk is that in extreme market conditions, price swings may breach ATR parameter constraints leading to losses. Manual monitoring of market anomalies is required to pause strategy execution when necessary.  

### Optimization Directions

1. Test different momentum indicator parameter combinations to find optimum settings.  

2. Try substituting momentum indicators from dual EMA to MACD or other indicators.

3. Test different volatility index configurations, such as overall historical ATR, market volatility index etc.  

4. Add volume filtering to avoid risk from false price breakouts.

5. Optimize stop loss and take profit mechanisms for improved risk-reward ratio.

### Conclusion  

This strategy integrates momentum analysis and volatility research with a solid theoretical basis. Through parameter tuning and logic optimization, it can become a stable and reliable algorithmic trading system. With clear trade signals and controllable risks, it is worth verifying and implementing in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|DEMA LENGTH|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|25|EMA Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|false|Offset|
|v_input_6|D|ATR Timeframe|
|v_input_7|14|ATR Lookback Period|
|v_input_8|true|Show Moving Average?|
|v_input_9|0|Moving Average Type: EMA|SMA|
|v_input_10|20|Moving Average Period|
|v_input_11|50|Trail stop loss (%)|
|v_input_12|3000|Long Take Profit (%)|
|v_input_13|true|From Month|
|v_input_14|true|From Day|
|v_input_15|2017|From Year|
|v_input_16|true|To Month|
|v_input_17|true|To Day|
|v_input_18|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-21 00:00:00
end: 2023-12-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Qorbanjf

//@version=4
strategy("ORIGIN DEMA/EMA & VOL LONG ONLY", shorttitle="ORIGIN DEMA/EMA & VOL LONG", overlay=true)

// DEMA
length = input(10, minval=1, title="DEMA LENGTH")
src = input(close, title="Source")
e1 = ema(src, length)
e2 = ema(e1, length)
dema1 = 2 * e1 - e2
plot(dema1, "DEMA", color=color.yellow)

//EMA
len = input(25, minval=1, title="EMA Length")
srb = input(close, title="Source")
offset = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
ema1 = ema(srb, len)
plot(ema1, title="EMA", color=color.blue, offset=offset)


// Inputs
atrTimeFrame = input("D", title="ATR Timeframe", type=input.resolution)
atrLookback = input(defval=14,title="ATR Lookback Period",type=input.integer)
useMA = input(title = "Show Moving Average?", type = input.bool, defval = true)
maType = input(defval="EMA", options=["EMA", "SMA"], title = "Moving Average Type")
maLength = input(defval = 20, title = "Moving Average Period", minval = 1)
//longLossPerc = input(title="Long Stop Loss (%)",
    // type=input.float, minval=0.0, step=0.1, defval=1) * 0.01
longTrailPerc = input(title="Trail stop loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=50) * 0.01
longProfitPerc = input(title="Long Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=3000) / 100

// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2017, title = "From Year", minval = 2000)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2017)


// ATR Logic // atrValue = atr(atrLookback) // atrp = (atrValue/close)*100 // plot(atrp, color=color.white, linewidth=2, transp = 30)

atrValue = security(syminfo.tickerid, atrTimeFrame, atr(atrLookback))
atrp = (atrValue/close)*100

// Moving Average Logic
ma(maType, src, length) =>
    maType == "EMA" ? ema(src, length) : sma(src, length) //Ternary Operator (if maType equals EMA, then do ema calc, else do sma calc)
maFilter = security(syminfo.tickerid, atrTimeFrame, ma(maType, atrp, maLength))

// variables for enter position
enterLong = crossover(dema1, ema1) and atrp < maFilter

// variables for exit position
sale = crossunder(dema1, ema1)

// stop loss
//longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)

// trail stop
// Determine trail stop loss prices
longStopTrail = 0.0

longStopTrail := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopTrail[1])
else
    0
//Take profit Percentage
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)

//Enter trades when conditions are met
strategy.entry(id="long",
 long=strategy.long,
 when=enterLong,
 comment="long")

//
strategy.close("long", when = sale, comment = "Sell")
//place exit orders (only executed after trades are active)

strategy.exit(id="sell",
 limit = longExitPrice,
 stop = longStopTrail,
 comment = "SL/TP")


```

> Detail

https://www.fmz.com/strategy/436217

> Last Modified

2023-12-22 12:01:21
