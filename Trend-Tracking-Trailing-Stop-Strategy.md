
> Name

Trend-Tracking-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/187fd38e20ba854e562.png)


## Overview 

The Trend Tracking Trailing Stop strategy is a quantitative trading strategy that combines trend judgment indicators and trailing stop mechanisms. This strategy uses the Supertrend indicator to determine the current trend direction, and utilizes a trailing stop line to track price changes in real time, achieving trend tracking and risk control.

## Strategy Principles

The strategy first calculates the Supertrend indicator to judge whether the current trend is up or down. The Supertrend indicator incorporates the ATR indicator and pivot point to more accurately determine the trend direction. If the Supertrend indicator judges an uptrend, a buy signal is generated. If it judges a downtrend, a sell signal is generated.

When a buy signal is generated, the strategy will open a long position. At the same time, it calculates a trailing stop line in real time. The calculation method of this stop line is the pivot point minus the ATR indicator value. As long as the current closing price is higher than this stop line, the stop line will move up in real time and maintain a reasonable stop loss position. If the price breaks through the stop line, the position will be closed out with a stop loss.

The strategy also incorporates the ADX and RSI indicators to filter unsuitable trading signals. Only when the ADX is greater than the set threshold and the RSI is at a reasonable level will the signals from the Supertrend indicator be trusted to open positions.

## Advantage Analysis  

The biggest advantage of this strategy is that it can grasp the trend direction well and achieve trend tracking. The Supertrend indicator is more accurate than simple moving averages and can quickly determine turning points. At the same time, the trailing stop mechanism can automatically adjust stop levels to maximize profit locking and effectively control risks.

In addition, the ADX and RSI indicators are added to the strategy for filtration, avoiding errors during periods of high market volatility. The ADX indicator ensures sufficient trend, and the RSI indicator avoids overbought and oversold scenarios, thereby improving profitability.

## Risk Analysis

The biggest risk of this strategy is that the trend judgment goes wrong and the Supertrend indicator issues a wrong signal. Although the Supertrend indicator is superior to simple moving averages, it is inevitable that misjudgments will occur in complex market conditions. At this point, it is necessary to rely on stop loss mechanisms to control losses.

In addition, improper strategy parameter settings can also pose risks. For example, an ATR parameter that is too large will lead to overly aggressive stop-loss line adjustments. Improper settings of the ADX and RSI parameters may also miss trading opportunities or increase the probability of wrong trades. This requires extensive historical backtesting to find the optimal parameters.


## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Try other trend judgment indicators such as DMI and KDJ in combination with the Supertrend indicator to form a "multi-factor" judgment system, which may improve judgment accuracy.

2. Increase the machine learning based adaptive parameter optimization module so that the ATR parameter, ADX parameter, RSI parameter and so on can adjust according to the real-time market instead of fixed values. 

3. Introduce sentiment indicators to replace RSI indicators for signal filtering. RSI indicators do not perform well in complex market conditions, while social sentiment indicators can better determine market enthusiasm.

4. Increase position sizing management module. According to the distance between the stop line and the current price, dynamically adjust the position size. The further away from the stop line, the greater the position size can be appropriately increased to improve profit potential.


## Conclusion

The Trend Tracking Trailing Stop strategy comprehensively employs methods such as trend analysis, trailing stops, and multi-factor filtering. While capturing trends, it strictly controls risks and is a more mature quantitative strategy. There is still great potential for optimizing this strategy to adapt it to more complex market environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|Pivot Point Period|
|v_input_3|2|ATR Factor|
|v_input_4|18|ATR Period|
|v_input_5|timestamp(1 Dec 2022)|Start Date|
|v_input_6|timestamp(12 Jan 2023)|End Date|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|false|Offset|
|v_input_9|14|length|
|v_input_10|30|overSold|
|v_input_11|65|overBought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-16 00:00:00
end: 2024-01-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bendre ADX Sup Trend", overlay = true)

///////////////////////////
// SuperTrend + Pivot Point
//////////////////////////

src =  input(close, title="EMA Source")
PPprd = input(defval = 2, title="Pivot Point Period")
AtrFactor=input(defval = 2, title = "ATR Factor")
AtrPd=input(defval = 18, title = "ATR Period")

StartDate = input(timestamp("1 Dec 2022"), title="Start Date")
EndDate = input(timestamp("12 Jan 2023"), title="End Date")

var float ph = na
var float pl = na
ph := ta.pivothigh(PPprd, PPprd)
pl :=ta.pivotlow(PPprd, PPprd)

float center = na
center := center[1]
// float lastpp = ph ? ph : pl ? pl : 0.0
float lastpp = na(ph) ? na(pl) ? na : pl : ph

if lastpp > 0
    if na(center)
        center := lastpp
    else
        center := (center * 2 + lastpp) / 3

Up = center - (AtrFactor * ta.atr(AtrPd))
Dn = center + (AtrFactor * ta.atr(AtrPd))

var float TUp = na
var float TDown = na
Trend = 0
TUp := close[1] > TUp[1] ? math.max(Up, TUp[1]) : Up
TDown := close[1] < TDown[1] ? math.min(Dn, TDown[1]) : Dn
Trend := close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
Trailingsl = Trend == 1 ? TUp : TDown

// Lines
linecolor = Trend == 1 and nz(Trend[1]) == 1 ? color.lime : Trend == -1 and nz(Trend[1]) == -1 ? color.red : na
plot(Trailingsl, color = linecolor ,  linewidth = 2, title = "PP SuperTrend")

bsignalSSPP = close > Trailingsl
ssignalSSPP = close < Trailingsl


///////
// ADX
//////

lenADX = 14
th = 14
TrueRange = math.max(math.max(high-low, math.abs(high-nz(close[1]))), math.abs(low-nz(close[1])))
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? math.max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? math.max(nz(low[1])-low, 0): 0
SmoothedTrueRange = 0.0
SmoothedTrueRange := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/lenADX) + TrueRange
SmoothedDirectionalMovementPlus = 0.0
SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/lenADX) + DirectionalMovementPlus
SmoothedDirectionalMovementMinus = 0.0
SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/lenADX) + DirectionalMovementMinus
DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = math.abs(DIPlus-DIMinus) / (DIPlus+DIMinus)*100
ADX = ta.sma(DX, lenADX)


//////
// MA
/////

lenMA = 21
srcMA = input(close, title="Source")
// offsetMA = input(title="Offset", type=input.integer, defval=0, minval=-500, maxval=500)
offsetMA = input(0, title="Offset")
outMA = ta.sma(srcMA, lenMA)

//
// RSI
//
length = input( 14 )
overSold = input( 30 )
overBought = input( 65 )
price = close
vrsi = ta.rsi(price, length)


// Buy - Sell Entries
buy = bsignalSSPP and outMA < close and ADX > th
sell = ssignalSSPP 


if (buy and vrsi > overBought)
    // .order // Tuned version
    strategy.entry("Buy", strategy.long)
    // strategy.close("Sell", "close Sell")

if (sell) and (strategy.position_size > 0)
    // strategy.entry("Sell", strategy.short)
    strategy.close("Buy", "Close Buy")

// if(sell and vrsi < overSold )
//     strategy.entry("Sell", strategy.short)

// if(buy) and (strategy.position_size > 0)
//     strategy.close("Sell", "close Sell")




```

> Detail

https://www.fmz.com/strategy/439039

> Last Modified

2024-01-17 11:19:06
