
> Name

Trend-Following-Strategy-Based-on-Moving-Average-and-MACD

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1036a061f2b20dfa871.png)



## Overview 

This strategy combines moving averages and the MACD indicator to determine trends and generate trading signals. It belongs to a typical trend following strategy. It uses two ZLSMA moving averages of different timeframes to determine the trend direction, and MACD crossover to generate specific buy and sell signals. This allows it to effectively capture mid-to-long term trends while avoiding being misled by short-term market noise.

## Strategy Logic

The strategy consists of the following main components:

1. Fast ZLSMA and Slow ZLSMA: Comparing ZLSMA moving averages of different timeframes determines the overall trend direction. The fast line consists of 32-period ZLSMA, and the slow line consists of 400-period ZLSMA. When the fast line crosses above the slow line, it is a bullish signal, and vice versa.

2. MACD Indicator: MACD is calculated by subtracting the slow line (26-period EMA) from the fast line (12-period EMA). The signal line is a 9-period EMA of the MACD. When MACD crosses above the signal line, it is a buy signal, and when MACD crosses below the signal line, it is a sell signal.

3. Trading signals: Buy and sell signals are generated only when the ZLSMA trend direction aligns with the MACD crossover signals. Specifically, go long when bull trend coincides with MACD golden cross, and go short when bear trend coincides with MACD death cross. 

4. Stop loss and take profit: The strategy does not currently include stop loss and take profit logic, which needs further optimization.

The combination of using moving averages to determine the major trend and MACD to time the entry can effectively filter out false breakouts and avoid being misled by short-term market noise.

## Advantage Analysis

The main advantages of this strategy are:

1. Catching trends: Using moving averages of different timeframes to determine trend direction allows trading with the trend and capturing mid-to-long term trends effectively.

2. Filtering noise: Applying the MACD indicator helps filter out short-term market noise and avoid being misled by small ranging markets. 

3. Customizable parameters: The moving average periods and MACD parameters are customizable and can be optimized for different markets.

4. Easy to implement: All indicators used are common technical indicators. The strategy logic is simple and clear, easy to understand and implement.

5. Controllable risk: With clear stop loss and take profit in place, the risk and reward of each trade can be controlled.

## Risk Analysis

The main risks of this strategy are:

1. Wrong trend determination: If the major trend is determined incorrectly, all trades can result in losses.

2. Improper parameter optimization: The moving average and MACD parameters must be thoroughly tested and optimized, otherwise the results may be unsatisfactory.

3. Lack of stop loss: Currently no stop loss is in place, posing the risk of oversized losses. 

4. Limited profit potential: As a trend following strategy, the profit potential of each trade is limited, requiring high volume to increase profitability.

5. High trading frequency: Improper parameter tuning may result in excessive trading frequency, increasing transaction costs and slippage.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add stop loss mechanism: Set proper stop loss points to strictly control the maximum loss per trade.

2. Optimize parameters: Backtest and optimize to find the optimal moving average and MACD parameter combination.

3. Lower trading frequency: Adjust parameters to ensure trading signals are only generated when the trend is pronounced.

4. Incorporate other factors: Factors like volume changes can be added to confirm trend and signals.

5. Improve entry timing: Further enhance MACD usage to increase entry accuracy. 

6. Make universally applicable: Optimize parameters to make the strategy broadly applicable across different products, expanding applicability.

## Conclusion

In conclusion, this strategy effectively captures mid-to-long term trends through simple yet effective combination of moving averages and MACD, making it a solid quantitative trading strategy foundation. But parameters need further optimization, risks require better control, and other factors should be incorporated to achieve more consistent results. It has practical value and much room for improvement.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Current Chart Resolution?|
|v_input_2|true|Show MacD & Signal Line? Also Turn Off Dots Below|
|v_input_3|true|Show Dots When MacD Crosses Signal Line?|
|v_input_4|true|Show Histogram?|
|v_input_5|true|Change MacD Line Color-Signal Line Cross?|
|v_input_6|true|MacD Histogram 4 Colors?|
|v_input_7|12|fastLength|
|v_input_8|26|slowLength|
|v_input_9|9|signalLength|
|v_input_10|32|Longueur|
|v_input_11|false|Décalage|
|v_input_12_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_13|400|Longueur|
|v_input_14|false|Décalage|
|v_input_15|0.5|Sensibilité|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-07 00:00:00
end: 2023-11-10 05:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © veryfid

//@version=5
strategy("Stratégie ZLSMA Bruno", shorttitle="Stratégie ZLSMA Bruno", overlay=false)

source = close
useCurrentRes = input(true, title="Use Current Chart Resolution?")
smd = input(true, title="Show MacD & Signal Line? Also Turn Off Dots Below")
sd = input(true, title="Show Dots When MacD Crosses Signal Line?")
sh = input(true, title="Show Histogram?")
macd_colorChange = input(true,title="Change MacD Line Color-Signal Line Cross?")
hist_colorChange = input(true,title="MacD Histogram 4 Colors?")

//res = useCurrentRes ? period : resCustom

fastLength = input(12), 
slowLength=input(26)
signalLength=input(9)

fastMA = ta.ema(source, fastLength)
slowMA = ta.ema(source, slowLength)

macd = fastMA - slowMA
signal = ta.sma(macd, signalLength)
hist = macd - signal

outMacD =  macd
outSignal = signal
outHist =  hist

histA_IsUp = outHist > outHist[1] and outHist > 0
histA_IsDown = outHist < outHist[1] and outHist > 0
histB_IsDown = outHist < outHist[1] and outHist <= 0
histB_IsUp = outHist > outHist[1] and outHist <= 0

//MacD Color Definitions
macd_IsAbove = outMacD >= outSignal
macd_IsBelow = outMacD < outSignal

//plot_color = hist_colorChange ? histA_IsUp ? aqua : histA_IsDown ? blue : histB_IsDown ? red : histB_IsUp ? maroon :yellow :gray
macd_color = macd_colorChange ? macd_IsAbove ? color.lime : color.red : color.red
//signal_color = macd_colorChange ? macd_IsAbove ? yellow : yellow : lime

circleYPosition = outSignal
 
//plot(smd and outMacD ? outMacD : na, title="MACD", color=macd_color, linewidth=4)
//plot(smd and outSignal ? outSignal : na, title="Signal Line", color=signal_color, style=line ,linewidth=2)
//plot(sh and outHist ? outHist : na, title="Histogram", color=plot_color, style=histogram, linewidth=4)
plot(sd and ta.cross(outMacD, outSignal) ? circleYPosition : na, title="Cross", style=plot.style_circles, linewidth=4, color=macd_color)
hline(0, '0 Line', linestyle=hline.style_solid, linewidth=2, color=color.white)

// Paramètres de la ZLSMA
length = input(32, title="Longueur")
offset = input(0, title="Décalage")
src = input(close, title="Source")
lsma = ta.linreg(src, length, offset)
lsma2 = ta.linreg(lsma, length, offset)
eq = lsma - lsma2
zlsma = lsma + eq

length_slow = input(400, title="Longueur")
offset_slow = input(0, title="Décalage")
lsma_slow = ta.linreg(src, length_slow, offset_slow)
lsma2_slow = ta.linreg(lsma_slow, length_slow, offset_slow)
eq_slow = lsma_slow - lsma2_slow
zlsma_slow = lsma_slow + eq_slow

// Paramètres de la sensibilité
sensitivity = input(0.5, title="Sensibilité")

// Règles de trading
longCondition = zlsma < zlsma_slow and  zlsma_slow < zlsma_slow[1] and zlsma > zlsma[1] and ta.cross(outMacD, outSignal) and  macd_color == color.lime//ta.crossover(zlsma, close) and ta.crossover(zlsma, zlsma[1]) // Croisement vers le haut
shortCondition = zlsma > zlsma_slow and  zlsma_slow > zlsma_slow[1] and zlsma < zlsma[1] and ta.cross(outMacD, outSignal) and  macd_color == color.lime   //ta.crossunder(zlsma, close) and ta.crossunder(zlsma, zlsma[1]) // Croisement vers le bas

// Entrée en position
strategy.entry("Achat", strategy.long, when=longCondition)
strategy.entry("Vente", strategy.short, when=shortCondition)
botifySignalZLSMA = longCondition ? 1 : shortCondition ? -1 : 0
plot(botifySignalZLSMA, title='Botify_signal', display=display.none)
// Sortie de position
strategy.close("Achat", when=ta.crossunder(zlsma, close)) // Close the "Achat" position
strategy.close("Vente", when=ta.crossover(zlsma, close)) // Close the "Vente" position


// Tracé de la courbe ZLSMA
plot(zlsma, color=color.yellow, linewidth=3)
plot(zlsma_slow, color=color.red, linewidth=3)


```

> Detail

https://www.fmz.com/strategy/432213

> Last Modified

2023-11-15 15:58:19
