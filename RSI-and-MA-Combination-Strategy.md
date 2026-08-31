
> Name

RSI-and-MA-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/163ce4ff31fe3cedf6d.png)


#### Overview
This strategy combines the RSI indicator with moving averages (MA) to generate trading signals. RSI is used to determine whether the market is overbought or oversold, while MA is used to determine price trends. A buy signal is generated when RSI is overbought and the price is above the MA; a sell signal is generated when RSI is oversold or when the MA produces a death cross. In addition, the strategy introduces the Stochastic RSI indicator (StochRSI) as an auxiliary judgment, and a prompt will be marked on the chart when StochRSI generates a signal.

#### Strategy Principle
1. Calculate the RSI indicator value to determine whether the market is overbought (>70) or oversold (<30).
2. Calculate the MA of a custom period, including four types: EMA, SMA, HMA, and WMA, and determine whether to display them on the chart based on parameter settings.
3. When RSI is overbought and the closing price is higher than the MA, a buy signal is generated; when RSI is oversold or the MA produces a death cross, a sell signal is generated.
4. Introduce the StochRSI indicator as an auxiliary judgment. When StochRSI is overbought (>70) or oversold (<30), a prompt will be marked on the chart, but no actual trading signal will be generated.

#### Strategy Advantages
1. The organic combination of the two classic indicators, RSI and MA, can better capture trend movements and overbought/oversold opportunities.
2. The MA type and parameters can be freely set with high flexibility and can be adjusted according to different market characteristics.
3. The introduction of the StochRSI indicator as an auxiliary judgment provides more reference for trading decisions.
4. The code logic is clear and readable, easy to understand and secondary development.

#### Strategy Risks
1. Both RSI and MA are lagging indicators and may generate more misleading signals in the early stages of trend reversal.
2. Improper parameter settings may lead to signals being generated too early or too late, affecting overall returns.
3. Lack of stop-loss and position management may lead to greater risks when the market fluctuates dramatically.

#### Strategy Optimization Directions
1. Introduce more leading indicators such as volatility to predict trend changes in advance.
2. Filter buy and sell signals, such as requiring RSI and MA to meet certain conditions at the same time to generate signals, in order to improve signal accuracy.
3. Add stop-loss and position management modules to the strategy to control single transaction risk and overall risk.
4. Perform parameter optimization on the strategy to find the best parameter combination.
5. Consider adding different cycles or multiple varieties to fully utilize the linkage relationship between different varieties or cycles.

#### Summary
By combining the two classic indicators of RSI and MA, this strategy can capture trend movements and overbought/oversold opportunities. At the same time, it introduces the StochRSI indicator as an auxiliary judgment, and the overall idea is simple and clear. However, the strategy also has some shortcomings, such as the lack of risk control measures and the need to improve signal accuracy. In the future, the strategy can be improved by introducing more indicators, optimizing signal rules, adding risk control modules, etc., in order to obtain more robust returns.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-22 00:00:00
end: 2024-05-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI Strategy with Customizable MA and StochRSI Alert", overlay=true)

// กำหนดค่า RSI สำหรับการเปิดสัญญาณซื้อและขาย
rsiOverbought = input(70, title="RSI Overbought Level")
rsiOversold = input(30, title="RSI Oversold Level")

// เลือกชนิดของเส้นค่าเฉลี่ยเคลื่อนที่
maType = input.string("EMA", title="MA Type", options=["EMA", "SMA", "HMA", "WMA"])

// กำหนดค่าเส้นค่าเฉลี่ยเคลื่อนที่
maShortLength = input(12, title="MA Short Length")
maLongLength = input(26, title="MA Long Length")

// เลือกการแสดงผลของเส้นค่าเฉลี่ยเคลื่อนที่
showShortMA = input(true, title="Show Short Moving Average")
showLongMA = input(true, title="Show Long Moving Average")

// ฟังก์ชันสำหรับเลือกชนิดของเส้นค่าเฉลี่ยเคลื่อนที่
f_ma(src, length, type) =>
    switch type
        "SMA" => ta.sma(src, length)
        "EMA" => ta.ema(src, length)
        "HMA" => ta.hma(src, length)
        "WMA" => ta.wma(src, length)

// คำนวณค่าเส้นค่าเฉลี่ยเคลื่อนที่
maShort = showShortMA ? f_ma(close, maShortLength, maType) : na
maLong = showLongMA ? f_ma(close, maLongLength, maType) : na

// คำนวณค่า RSI
rsiValue = ta.rsi(close, 14)

// สร้างสัญญาณซื้อและขาย
buySignal = (rsiValue > rsiOverbought and ((showShortMA and showLongMA and close > maShort and maShort > maLong) or (showShortMA and not showLongMA and close > maShort) or (showLongMA and not showShortMA and close > maLong)))
sellSignal = (showShortMA and showLongMA and ta.crossover(maLong, maShort)) or (showShortMA and not showLongMA and ta.crossover(maShort, close)) or (showLongMA and not showShortMA and ta.crossover(maLong, close))

// แสดงค่าเส้นค่าเฉลี่ยเคลื่อนที่บนกราฟ
plot(maShort, color=color.red, title="MA Short")
plot(maLong, color=color.green, title="MA Long")

// คำนวณค่า Stochastic RSI
smoothK = 3
smoothD = 3
RSIlen = 14
STOlen = 14
SRsrc = close
OSlevel = 30
OBlevel = 70

rsi1 = ta.rsi(SRsrc, RSIlen)
k = ta.sma(ta.stoch(rsi1, rsi1, rsi1, STOlen), smoothK)
d = ta.sma(k, smoothD)

stochRSIOverbought = OBlevel
stochRSIOversold = OSlevel

stochRSIBuyAlert = ta.crossover(k, stochRSIOversold)
stochRSISellAlert = ta.crossunder(k, stochRSIOverbought)

// สร้างคำสั่งซื้อและขายเมื่อมีสัญญาณจาก RSI และ MA เท่านั้น
if (buySignal)
    strategy.entry("Buy", strategy.long)
if (sellSignal)
    strategy.close("Buy")

// แสดงสัญญาณเตือนจาก Stochastic RSI บนกราฟ
plotshape(series=stochRSIBuyAlert, location=location.belowbar, color=color.green, style=shape.labelup, title="StochRSI Buy Alert")
plotshape(series=stochRSISellAlert, location=location.abovebar, color=color.red, style=shape.labeldown, title="StochRSI Sell Alert")

// แสดงสัญญาณซื้อและขายจาก RSI และ MA บนกราฟ
plotshape(series=buySignal, location=location.top, color=color.green, style=shape.triangleup, title="RSI>70")
plotshape(series=sellSignal, location=location.top, color=color.red, style=shape.triangledown, title="MA crossoverDown")

```

> Detail

https://www.fmz.com/strategy/452741

> Last Modified

2024-05-28 17:34:11
