
> Name

High-Frequency-Hedging-Strategy-Based-on-MACD-Bar-Color-and-Linear-Regression

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b4d771e70b2b2865b5.png)



## Overview

This strategy combines MACD bar color and linear regression indicators to achieve high-frequency reversal trading, which is especially suitable for short-term arbitrage and hedging. It belongs to a typical market-neutral strategy.

## Strategy Logic

The strategy consists of the following main components:

1. MACD bar color as the trend judging indicator. When the MACD bar color is green, it indicates an upward trend, so no short orders should be placed. When the MACD bar is red, it indicates a downward trend, so no long orders should be placed.

2. Linear regression as the key trading signal indicator. Go long when price crosses above the linear regression line, and go short when price crosses below the line. 

3. PAC Channel formed by EMA of high, low and close prices to determine the direction of the linear regression line. Trading signals are only generated when the linear regression direction aligns with the channel trend.

4. EMA 89 as the stop loss line. Close positions when price crosses back above this line.

The logic for trade signals is:

Long signal: Linear regression crosses above PAC lower band AND linear regression is sloping up AND MACD bar is not red.

Short signal: Linear regression crosses below PAC upper band AND linear regression is sloping down AND MACD bar is not green.

Exit signal: Price crosses below EMA 89.

This strategy combines trend judgment and key price levels to achieve high frequency hedging trading.

## Advantage Analysis 

1. MACD bar color helps determine the major trend and avoids trading against the trend.

2. Linear regression is smooth and filters out some noise.

3. The EMA channel clearly defines bullish/bearish bias.

4. Stop loss is reasonably set to maximize profits.

5. High trading frequency makes it suitable for algorithmic trading. 

6. Achieves hedging trades and can profit from range-bound markets.

## Risk Analysis

1. Parameters of linear regression and channel need optimization, otherwise they may fail.

2. Stop loss may be triggered frequently during huge price swings. Can consider widening the stop loss range.

3. High trade frequency means transaction costs can be substantial.

4. MACD has some lag and may miss short term trend reversals. 

5. EMA channels also need continuous optimization to adapt to changing market conditions.

## Optimization Directions 

1. Adjust linear regression and channel parameters to better fit different instruments.

2. Widen stop loss range while keeping reward/risk ratio above 1.

3. Optimize MACD parameters to capture more short-term signals.

4. Try other indicators to replace linear regression, such as Bollinger Bands. 

5. Add position sizing to prevent excessive one-way losses.

6. Incorporate other indicators like RSI to filter some trade signals.

## Conclusion

This strategy combines multiple technical indicators to achieve high frequency hedging trading. Its strength lies in catching short term reversals with reasonable risk controls, making it very suitable for range-bound market conditions. At the same time, certain parameter optimization and improvements are needed to prevent overfitting. With proper management, it can become a highly practical high frequency trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|89|EMA Signal|
|v_input_2|34|High Low channel Length|
|v_input_3|9|conversionPeriods|
|v_input_4|26|Base Line|
|v_input_5|52|Lagging Span|
|v_input_6|26|displacement|
|v_input_7|12|fastLength|
|v_input_8|26|slowlength|
|v_input_9|9|MACDLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-20 00:00:00
end: 2023-10-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy("Sonic R + Linear Reg + Kumo Cloud + Barcolor MACD", overlay=true,default_qty_value=10000,initial_capital=200,currency=currency.USD, pyramiding=1)
EMA = input(defval=89, title="EMA Signal")
HiLoLen     = input(34, minval=2,title="High Low channel Length")
pacC        = ema(close,HiLoLen)
pacL        = ema(low,HiLoLen)
pacH        = ema(high,HiLoLen)
DODGERBLUE = #1E90FFFF
// Plot the Price Action Channel (PAC) base on EMA high,low and close//
L=plot(pacL, color=DODGERBLUE, linewidth=1, title="High PAC EMA",transp=90)
H=plot(pacH, color=DODGERBLUE, linewidth=1, title="Low PAC EMA",transp=90)
C=plot(pacC, color=DODGERBLUE, linewidth=2, title="Close PAC EMA",transp=80)
//Moving Average//
signalMA =ema(close,EMA)
plot(signalMA,title="EMA Signal",color=black,linewidth=3,style=line)
linereg = linreg(close, EMA, 0)
plot(linereg, color = orange, title = "Linear Regression Curve", style = line, linewidth = 1)
//////ICHIMOKU/////////
conversionPeriods = input(9),
basePeriods = input(26, minval=1, title="Base Line")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span"),
displacement = input(26, minval=1)
donchian(len) => avg(lowest(len), highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine) 
leadLine2 = donchian(laggingSpan2Periods-1)
p1 = plot(leadLine1, offset = displacement-1, color=gray,title="Senkou span A", transp=90)
p2 = plot(leadLine2, offset = displacement-1, color=gray, title="Senkou span B", transp=90)
fill(p1, p2, color = leadLine1 > leadLine2 ? green : red, title="Kumo Cloud")
///////////////// MACD BARCOLOR /////////////////////
fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)
MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD
hisup= iff(delta>delta[1] and delta>0, 1,
	     iff(delta<delta[1], -1, nz(hisup[1], 0)))
hisdown = iff(delta<delta[1] and delta<0, 1,
	     iff(delta>delta[1], -1, nz(hisdown[1], 0)))
barcolor(hisup==1 and MACD>0 ? lime: hisdown==1 and MACD<0 ? red : blue )
///////////// SIGNAL ///////////////
conbuy = iff(crossover(linereg,pacL) and rising(linereg,5), 1,
	     iff(crossover(linereg,pacH) or (crossunder(linereg,pacL) and pacL<signalMA), -1, nz(conbuy[1], 0)))
consell = iff(crossunder(linereg,pacH) and falling(linereg,5), 1,
	     iff(crossunder(linereg,pacL) or (crossover(linereg,pacH) and pacH>signalMA), -1, nz(consell[1], 0)))
golong= conbuy==1 and close>open and open<pacH and close>linereg and hisdown!=1
goshort= consell==1 and close<open and open>pacL and close<linereg and hisup!=1
if(golong)
    strategy.entry("Buy",strategy.long)
if(goshort)
    strategy.entry("Sell",strategy.short)
closelong= conbuy==-1
closeshort=consell==-1
if(closelong)
    strategy.close("Buy")
if(closeshort)
    strategy.close("Sell")
 ////////////// TP and SL//.
//SL = input(defval=200.00, title="Stop Loss Point", type=float, step=1)
//rr= input(defval=0.1,title="Reward/Risk",type=float)
//useTPandSL = input(defval = false, title = "Use exit order strategy?")
//Stop = SL
//Take=SL*rr
//Q = 100
//if(useTPandSL)
//    strategy.exit("Out Long", "Buy", qty_percent=Q, profit= Take, loss=Stop)
//    strategy.exit("Out Short", "Sell", qty_percent=Q, profit= Take, loss=Stop) 
```

> Detail

https://www.fmz.com/strategy/430322

> Last Modified

2023-10-27 10:42:54
