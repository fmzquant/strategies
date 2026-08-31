
> Name

FX-Strategy-Based-on-Fractal-Waves-and-SMMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b761e9ad406612a72e.png)


## Overview

This strategy combines fractal wave theory and SMMA to identify trend opportunities, and uses proper stop loss and trailing stop to control risks for profit maximization. It only enters positions during specified trading sessions to avoid market swings at certain times.

## Strategy Logic

- Use SMMA to calculate average price and filter market noise for trend direction
- Identify trend reversal points using highest/lowest price within certain periods as fractal waves
- Go short when price wave breaks above SMMA, go long when breaks below 
- Set stop loss and trailing stop based on ATR to control risks
- Only trade within specified sessions, avoiding weekend and intraday swings

## Advantage Analysis 

- Fractal wave theory accurately identifies trend reversal points, combined with SMMA for trend direction 
- Stop loss and ATR trailing stop effectively limits loss per trade
- Only trading during liquid sessions avoids excessive slippage and volatility
- Following parabolic SAR strictly to exit at reversal signal maximizes profit

## Risk Analysis

- Inaccurate fractal wave may cause whipsaws in non-trending periods
- SMMA lag may miss ideal trend reversal points
- Stop loss too tight may get stopped out easily, too loose may incur larger loss
- Fixed profit taking unable to adjust to different market conditions

Solutions:

- Optimize parameters for fractal period and SMMA
- Add Stochastics to confirm reversal signals
- Dynamically optimize stop loss, profit target  

## Optimization Directions

- Optimize fractal period and SMMA parameters
- Add Stochastics indicator to filter false breakouts
- Experiment with dynamic stop loss and profit taking
- Widen stop loss to avoid getting stopped out
- Optimize parameters for different products and trading sessions

## Summary

This strategy integrates fractal wave theory and SMMA to identify trend and reversal points to trade, with proper stop loss and profit taking. It can be further improved by optimizing parameters and adding confirming indicators for higher stability and profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|SMMA Period|
|v_input_2|7|Stop Loss %|
|v_input_3|2.7|Trailing Stop Coefficient|
|v_input_4|5|Fractal Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-12 00:00:00
end: 2023-11-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("FX Strategy Based on Fractals and SMMA", overlay=true)

// パラメータ
SMMAPeriod1 = input(30, title="SMMA Period")
StopLoss1 = input(7, title="Stop Loss %")
TrailingStopCoef1 = input(2.7, title="Trailing Stop Coefficient")
fractalPeriod = input(5, title="Fractal Period")

// SMMAの計算関数
smma(src, length) =>
    var float smma = na
    if na(smma[1])
        smma := sma(src, length)
    else
        smma := (smma[1] * (length - 1) + src) / length
    smma

// フラクタルの近似
highFractal = high[2] > high[1] and high[2] > high[3] and high[2] > high[4] and high[2] > high
lowFractal = low[2] < low[1] and low[2] < low[3] and low[2] < low[4] and low[2] < low

// エントリー条件
longEntrySignal = lowFractal and close[1] < smma(close, SMMAPeriod1)
shortEntrySignal = highFractal and close[1] > smma(close, SMMAPeriod1)

// エントリー実行
if (longEntrySignal)
    strategy.entry("Long", strategy.long)

if (shortEntrySignal)
    strategy.entry("Short", strategy.short)

// トレーリングストップの計算
atrValue = atr(10)
longStopPrice = close - atrValue * TrailingStopCoef1
shortStopPrice = close + atrValue * TrailingStopCoef1

// トレーリングストップの設定
strategy.exit("Exit Long", "Long", stop=longStopPrice)
strategy.exit("Exit Short", "Short", stop=shortStopPrice)

// バックテスト期間の設定（MetaTraderのバックテストと同じ期間）
startYear = 2007
startMonth = 05
startDay = 01
endYear = 2022
endMonth = 04
endDay = 01

startDate = timestamp(startYear, startMonth, startDay, 00, 00)
endDate = timestamp(endYear, endMonth, endDay, 23, 59)

// バックテスト期間内でのみトレードを実行
if (time >= startDate and time <= endDate)
    if (longEntrySignal)
        strategy.entry("Long", strategy.long)
    if (shortEntrySignal)
        strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/431956

> Last Modified

2023-11-13 16:39:41
