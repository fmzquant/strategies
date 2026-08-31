
> Name

伽利略均线交叉策略Galileo-Galileis-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1206dde7851f7e1f48b.png)

## Overview

Galileo Galilei's moving average crossover strategy is a trading strategy based on moving averages. It generates trading signals by calculating the exponential moving average (EMA) over a specified period and comparing crossovers between the EMA and price. Sell signals are generated when the price drops below the EMA from the top down, while buy signals occur when the price breaks above the EMA from the bottom up.

## Strategy Logic

The core of Galileo Galilei's strategy lies in the exponential moving average (EMA). EMA is a type of moving average that places more weight on recent prices. Its calculation formula is:

EMA today = (Closing price today × Smoothing factor) + (EMA yesterday × (1 − Smoothing factor))

Where the smoothing factor α = (2/(number of periods + 1))

The strategy dynamically calculates the EMA based on user input period parameters. It then compares the crossovers between price and EMA to determine trading signals:  

1. When price drops below the EMA from the top down, a sell signal is generated for short trading.

2. When price breaks above the EMA from below, a buy signal is triggered for long trading.

The strategy also plots the EMA line on the chart, along with arrow markers indicating buy and sell signals.

## Advantage Analysis 

Galileo Galilei's moving average crossover strategy has the following advantages:

1. Simple logic that is easy to understand and implement, suitable for beginners.  
2. Faster response to price changes through the use of EMA.
3. Clear crossover signals without excessive whipsaws.  
4. Flexibility to adapt to different market environments by adjusting EMA parameters.
5. Defined entry and exit signals provide risk control.

## Risk Analysis

Potential risks of this strategy include:

1. More false signals may occur during high price volatility. A stop loss strategy could help optimize.
2. Reliance on a single indicator makes it vulnerable to price manipulation. Additional indicators may improve robustness.   
3. Lagging effect, especially after sudden events. Shortening EMA periods could help.
4. Unable to adapt to prolonged one-sided price trends, a common limitation among moving average strategies.

## Optimization Directions

Some ways to optimize the strategy:

1. Incorporate other indicators to construct a composite strategy for increased robustness against false signals. Examples include volume, trend indicators etc.

2. Add stop loss mechanisms like trailing stop loss or percentage-based stop loss to control single-trade loss amount.

3. Test EMAs with different parameter combinations to find optimal settings. Other moving average types could also be evaluated.  

4. Assess re-entry logic to capture rebounds after initial price reversals, improving profitability.

## Conclusion

Galileo Galilei's moving average crossover is a simple yet practical strategy with clear logic and easy operability. It is suitable for novice quant traders. With continuous improvements, its performance could become increasingly superior over time.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|11|Length|
|v_input_2_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|From Day|
|v_input_4|true|From Month|
|v_input_5|2020|From Year|
|v_input_6|true|To Day|
|v_input_7|12|To Month|
|v_input_8|2021|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © armigoldman

//@version=3
strategy(title="Galileo Galilei", shorttitle="Galileo Galilei", overlay=true, initial_capital = 100000, default_qty_type=strategy.cash, default_qty_value = 100000)
len = input(11, minval=1, title="Length")
src = input(open, title="Source")
out = ema(src, len)
plot(out, title="EMA", color=yellow)
//last8h = highest(close, 8)
//lastl8 = lowest(close, 8)

//plot(last8h, color=red, linewidth=2)
//plot(lastl8, color=green, linewidth=2)

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE

// From Date Inputs
fromDay = input(defval=1, title="From Day", minval=1, maxval=31)
fromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
fromYear = input(defval=2020, title="From Year", minval=1970)

// To Date Inputs
toDay = input(defval=1, title="To Day", minval=1, maxval=31)
toMonth = input(defval=12, title="To Month", minval=1, maxval=12)
toYear = input(defval=2021, title="To Year", minval=1970)

// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true


bearish = cross(close, out) == 1 and close[1] > close
bullish = cross(close, out) == 1 and close[1] < close

plotshape(bearish, color=white, style=shape.arrowdown, text="BEAR", location=location.abovebar)
plotshape(bullish, color=white, style=shape.arrowup, text="BULL", location=location.belowbar)

buy = if cross(close, out) == 1 and close[1] < close
    strategy.entry("BUY", strategy.long, when=time_cond)
        //strategy.close_all(when=bearish)
        // strategy.exit("exit", "Long", profit =, loss = 35)


sell = if cross(close, out) == 1 and close[1] > close
    strategy.entry("SELL", strategy.short, when=time_cond)
        //sell = if bearish
        //strategy.close_all(when=bullish)
        // strategy.exit("exit", "Long", profit = bullish, loss = 100)

profit = strategy.netprofit
if not time_cond
    strategy.close_all()

//plotshape(true, style=shape.triangleup, location=location.abovebar)

```

> Detail

https://www.fmz.com/strategy/435717

> Last Modified

2023-12-18 12:07:07
