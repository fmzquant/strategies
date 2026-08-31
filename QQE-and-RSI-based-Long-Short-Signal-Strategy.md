
> Name

QQE-and-RSI-based-Long-Short-Signal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a2e17479bee128bc99.png)


#### Overview
This strategy is based on the QQE indicator and the RSI indicator. It calculates the smoothed moving average and dynamic oscillation range of the RSI indicator to construct long-short signal intervals. When the RSI indicator breaks through the upper rail, it generates a long signal, and when it breaks through the lower rail, it generates a short signal. The main idea of the strategy is to use the trend characteristics of the RSI indicator and the volatility characteristics of the QQE indicator to capture changes in market trends and volatility opportunities.

#### Strategy Principle
1. Calculate the smoothed moving average RsiMa of the RSI indicator as the basis for judging the trend.
2. Calculate the absolute deviation value AtrRsi of the RSI indicator and its smoothed moving average MaAtrRsi as the basis for judging volatility.
3. Calculate the dynamic oscillation range dar according to the QQE factor, and combine it with RsiMa to construct the long-short signal intervals longband and shortband.
4. Judge the relationship between the RSI indicator and the long-short signal intervals. When the RSI indicator crosses above longband, it generates a long signal, and when it crosses below shortband, it generates a short signal.
5. Conduct trades according to the long-short signals. When a long signal is triggered, open a long position, and when a short signal is triggered, close the position.

#### Strategy Advantages
1. It combines the characteristics of the RSI indicator and the QQE indicator, which can better capture market trends and volatility opportunities.
2. It uses dynamic oscillation range to construct signal intervals, which can adapt to changes in market volatility.
3. It smooths the RSI indicator and volatility range, effectively reducing noise interference and frequent trading.
4. The logic is clear, with fewer parameters, and is suitable for further optimization and improvement.

#### Strategy Risks
1. For volatile markets and markets with low volatility, the performance of this strategy may not be ideal.
2. It lacks a clear stop-loss mechanism and may face greater drawdown risk when the market suddenly reverses.
3. Parameter settings have a greater impact on strategy performance and need to be tuned according to different markets and varieties.

#### Strategy Optimization Directions
1. Introduce clear stop-loss mechanisms, such as fixed percentage stop-loss, ATR stop-loss, etc., to control drawdown risk.
2. Optimize parameter settings. The optimal parameter combination can be found through genetic algorithms, grid search and other methods.
3. Consider introducing other indicators such as trading volume and position volume to enrich trading signals and improve strategy stability.
4. For volatile markets, consider introducing range trading or swing trading logic to enhance the adaptability of the strategy.

#### Summary
This strategy constructs long-short signals based on the RSI indicator and the QQE indicator, and has the characteristics of trend capture and volatility grasp. The strategy logic is clear, with fewer parameters, and is suitable for further optimization and improvement. However, the strategy also has certain risks, such as drawdown control and parameter setting, which need to be further improved. In the future, the strategy can be optimized from aspects such as stop-loss mechanism, parameter optimization, signal enrichment, and adaptability to different markets, so as to improve the robustness and profitability of the strategy.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-21 00:00:00
end: 2024-05-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=4
// modified by swigle
// thanks colinmck

strategy("QQE signals bot", overlay=true)


RSI_Period = input(14, title='RSI Length')
SF = input(5, title='RSI Smoothing')
QQE = input(4.236, title='Fast QQE Factor')
ThreshHold = input(10, title="Thresh-hold")

src = close
Wilders_Period = RSI_Period * 2 - 1

Rsi = rsi(src, RSI_Period)
RsiMa = ema(Rsi, SF)
AtrRsi = abs(RsiMa[1] - RsiMa)
MaAtrRsi = ema(AtrRsi, Wilders_Period)
dar = ema(MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? min(shortband[1], newshortband) : newshortband
cross_1 = cross(longband[1], RSIndex)
trend := cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband

// Find all the QQE Crosses

QQExlong = 0
QQExlong := nz(QQExlong[1])
QQExshort = 0
QQExshort := nz(QQExshort[1])
QQExlong := FastAtrRsiTL < RSIndex ? QQExlong + 1 : 0
QQExshort := FastAtrRsiTL > RSIndex ? QQExshort + 1 : 0

//Conditions

qqeLong = QQExlong == 1 ? FastAtrRsiTL[1] - 50 : na
qqeShort = QQExshort == 1 ? FastAtrRsiTL[1] - 50 : na

// Plotting

plotshape(qqeLong, title="QQE long", text="Long", textcolor=color.white, style=shape.labelup, location=location.belowbar, color=color.green, size=size.tiny)
plotshape(qqeShort, title="QQE short", text="Short", textcolor=color.white, style=shape.labeldown, location=location.abovebar, color=color.red, size=size.tiny)

// trade

//if qqeLong > 0
strategy.entry("buy long", strategy.long, 100, when=qqeLong)
    
if qqeShort > 0
    strategy.close("buy long")
    // strategy.exit("close_position", "buy long", loss=1000)
    // strategy.entry("sell", strategy.short, 1, when=strategy.position_size > 0)
    

```

> Detail

https://www.fmz.com/strategy/452613

> Last Modified

2024-05-27 15:17:45
