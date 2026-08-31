
> Name

双EMA黄金交叉策略Dual-EMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11f5b4f3ac30ccf489c.png)



## Overview
The Dual EMA Crossover strategy is a typical trend following strategy. It uses two EMA lines of different periods and generates trading signals based on their crossover. When the faster EMA crosses above the slower EMA, a buy signal is generated. When the faster EMA crosses below the slower EMA, a sell signal is generated. This strategy can track medium-long term trends and capture trading opportunities in trend initiation stages.

## Strategy Logic
The key components of this strategy are:

1. Set lengths for the faster EMA and slower EMA. Here the faster EMA length is 12, slower EMA is 26.

2. Calculate the faster EMA and slower EMA. The faster EMA reacts quicker while the slower EMA is more stable. 

3. Determine EMA crossover situations to generate trading signals. When faster EMA crosses above slower EMA, a buy signal is generated. When faster EMA crosses below slower EMA, a sell signal is generated.

4. Enter trades based on signals. When going long, existing short positions are closed first before opening long positions. Vice versa.

5. Set stop loss points. When going long, stop loss is triggered if price falls below previous low by a set percentage. Vice versa.

6. Exit trades based on signals. Long positions are closed when faster EMA crosses below slower EMA. Short positions closed when faster EMA crosses above slower EMA.

The logic is simple and intuitive. EMA crossover determines trend direction and strength. Faster EMA reacts to short term price changes quickly while slower EMA responds to long term trends steadily. Crossover of the two lines is a classic way to detect trend changes.

## Advantage Analysis

The advantages of this strategy are:

1. Simple concept easy to understand and implement. EMA and crossover are recognized effective indicators and signals.

2. Can effectively track medium-long term trends and capture opportunities early.

3. Dual EMA setup avoids noise from short term market fluctuations. 

4. Has clear entry rules, exit rules and stop loss rules. No overholding positions.

5. Only needs a few parameters, not prone to overfitting. Easy parameter tuning suitable for beginners. 

6. Good backtest results, viable for live trading. Can be used standalone or combined with other strategies.

## Risk Analysis 

Some risks of this strategy:

1. Dual EMA crossover prone to generating false signals and whipsaws. Parameters need tuning to filter invalid signals.

2. Cannot handle ranging and trend reversal situations well. Needs confirmation from other indicators.

3. Dual EMA strategy tends to chase highs and sell lows. Position sizing and profit taking should be controlled.

4. Backtest results may be overfitted to some extent. Parameter sensitivity should be tested for robustness.

5. No timely stop loss can lead to large losses. Reasonable stop loss levels should be set.

6. Transaction costs may affect actual profitability. Commission factors for different products should be considered.

## Improvement Areas

Some ways to improve the strategy:

1. Optimize EMA period parameters to find best combination, using walk forward optimization and machine learning.

2. Add trend filter indicators like ADX, CCI etc. to avoid trading in uncertain trends.

3. Add volume indicators like trading volume, on balance volume to ensure real trading is driving signals.

4. Implement dynamic stop loss to automatically adjust stops based on market volatility.

5. Combine correlated products to utilize correlation for risk management. 

6. Introduce machine learning for parameter optimization, feature engineering, signal filtering etc.

7. Consider transaction costs, adjust stops and size to reduce trade frequency.

8. Customize parameters based on product characteristics to improve adaptiveness. 

9. Design composite strategy framework, combining with other strategies to improve robustness.

These improvements can make the strategy more robust and profitable for live trading.

## Conclusion
This strategy uses dual EMA crossover to generate trading signals and can effectively track medium-long term trends. The advantages lie in its simplicity and good backtest results, making it easy for beginners to use. But risks exist and should be managed through parameter optimization, adding indicators, dynamic stops, optimizing trade costs etc. The strategy can be used standalone or combined with others for added practicality.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|true|UseStopLoss|
|v_input_5|20|Stop loss percentage(0.1%)|
|v_input_6_open|0|Fast MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|12|Fast MA Period|
|v_input_8_open|0|Slow MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|26|Slow MA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-23 00:00:00
end: 2023-10-29 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy(title = "EMA Cross Strategy", shorttitle = "EMA Cross",calc_on_order_fills=true,calc_on_every_tick =true, initial_capital=21000,commission_value=.25,overlay = true,default_qty_type = strategy.percent_of_equity, default_qty_value = 100)
StartYear = input(2018, "Backtest Start Year")
StartMonth = input(1, "Backtest Start Month")
StartDay = input(1, "Backtest Start Day")
UseStopLoss = input(true,"UseStopLoss")

window() => time >=  timestamp(StartYear, StartMonth, StartDay,00,00) ? true : false

stopLoss = input(20, title = "Stop loss percentage(0.1%)")


maFastSource   = input(defval = open, title = "Fast MA Source")
maFastLength   = input(defval = 12, title = "Fast MA Period", minval = 1)
// long ma
maSlowSource   = input(defval = open, title = "Slow MA Source")
maSlowLength   = input(defval = 26, title = "Slow MA Period", minval = 1)

maFast = ema(maFastSource, maFastLength)
maSlow = ema(maSlowSource, maSlowLength)


fast = plot(maFast, title = "Fast MA", color = #7a8598, linewidth = 2, style = line, transp = 50)
slow = plot(maSlow, title = "Slow MA", color = #e08937, linewidth = 2, style = line, transp = 50)


longEMA = crossover(maFast, maSlow)
exitLong = crossunder(maFast, maSlow)

shortEMA = crossover(maSlow, maFast)
exitShort = crossover(maFast, maSlow)


if (longEMA)
    strategy.entry("LongId", strategy.long, when=window())
 
if (shortEMA)
    strategy.entry("ShortId", strategy.short, when=window())


if (UseStopLoss)
    strategy.exit("StopLoss", "LongId", loss = close * stopLoss / 1000 / syminfo.mintick)
    strategy.exit("StopLoss", "ShortId", loss = close * stopLoss / 1000 / syminfo.mintick)
```

> Detail

https://www.fmz.com/strategy/430562

> Last Modified

2023-10-30 14:36:11
