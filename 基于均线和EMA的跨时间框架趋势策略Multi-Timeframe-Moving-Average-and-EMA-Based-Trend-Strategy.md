
> Name

基于均线和EMA的跨时间框架趋势策略Multi-Timeframe-Moving-Average-and-EMA-Based-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165a2c604b97a24919b.png)

## Overview

This strategy utilizes moving averages (MA) and EMA across different timeframes to identify and trade trends. By combining SMA, EMA of various periods, as well as candlestick bodies, it can effectively filter market noise and trade intermediate to long term trends with low risk.

## Strategy Logic 

The core idea is based on comparison of 3 SMAs of different periods to determine price momentum. Additionally, EMA is used to check if candle body is pointing up.

Specifically, the strategy employs 3 SMAs - 3-, 8-, and 10-period SMA. When price is below all 3 SMAs, it is considered a downtrend. Long signal triggers when price crosses back above the SMAs.  

Also, a 5-period EMA checks if the candle body is pointing up before entering long trades.

For exit rules, maximum number of profitable closes or maximum duration is used as stop loss mechanism.

## Advantage Analysis

By combining MAs of various timeframes, this strategy can effectively filter market noise and capture intermediate to long term trends. Optimized parameters allow decent performance in historical backtests.

Using EMA to check candle body direction reduces unnecessary slippage from buying into falling candles.  

Overall this is a stable and reliable system suitable for trend following over weeks to months.

## Risks and Mitigations  

- The strategy is sensitive to parameters. Suboptimal choice of 3 SMA or 1 EMA periods can deteriorate signal quality. Parameters need to be optimized for different instruments.

- Gap risk is not handled. Sudden fundamental news that gap prices could cause losses. Price stop loss can help mitigate such risks.

## Enhancement Opportunities

- More timeframes of MAs or EMAs can be added to further improve trend accuracy.

- Moderate price stop loss can be tested to lock in profits while reducing losses in extreme moves.

- Machine learning can dynamically optimize parameters to adapt to evolving market conditions.

## Conclusion  

The strategy is robust and reliable overall, using MA crossovers to determine trend supplemented by EMA filter. Further parameter optimization and prudent risk controls can enhance win rate and profitability. Worthy of further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Quantity|
|v_input_2|3|SMA Period 01|
|v_input_3|8|SMA Period 02|
|v_input_4|10|SMA Period 03|
|v_input_5|5|EMA Period 01|
|v_input_6|5|Max Profit Close|
|v_input_7|10|Max Total Bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Free Strategy #02 (ES / SPY)", overlay=true)

// Inputs
Quantity = input(1, minval=1, title="Quantity")
SmaPeriod01 = input(3, minval=1, title="SMA Period 01")
SmaPeriod02 = input(8, minval=1, title="SMA Period 02")
SmaPeriod03 = input(10, minval=1, title="SMA Period 03")
EmaPeriod01 = input(5, minval=1, title="EMA Period 01")
MaxProfitCloses = input(5, minval=1, title="Max Profit Close")
MaxBars = input(10, minval=1, title="Max Total Bars")

// Misc Variables
src = close
BarsSinceEntry = 0
MaxProfitCount = 0
Sma01 = sma(close, SmaPeriod01)
Sma02 = sma(close, SmaPeriod02)
Sma03 = sma(close, SmaPeriod03)
Ema01 = ema(close, EmaPeriod01)

// Conditions
Cond00 = strategy.position_size == 0
Cond01 = close < Sma03
Cond02 = close <= Sma01
Cond03 = close[1] > Sma01[1]
Cond04 = open > Ema01
Cond05 = Sma02 < Sma02[1]

// Update Exit Variables
BarsSinceEntry := Cond00 ? 0 : nz(BarsSinceEntry[1]) + 1
MaxProfitCount := Cond00 ? 0 : (close > strategy.position_avg_price and BarsSinceEntry > 1) ? nz(MaxProfitCount[1]) + 1 : nz(MaxProfitCount[1])

// Entries
strategy.entry(id="L1", long=true, qty=Quantity, when=(Cond00 and Cond01 and Cond02 and Cond03 and Cond04 and Cond05))
 
// Exits
strategy.close("L1", (BarsSinceEntry - 1 >= MaxBars or MaxProfitCount >= MaxProfitCloses))
```

> Detail

https://www.fmz.com/strategy/442397

> Last Modified

2024-02-21 15:59:43
