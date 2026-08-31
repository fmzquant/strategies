
> Name

TrumpBollingerEMAcandlestick-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses Bollinger Bands, EMA and candlestick patterns for dual-line gambling trading, belonging to short-term trading strategies. 

## Principles 

The strategy consists of the following parts:

1. Bollinger Bands
Generate upper and lower rails based on closing price and standard deviation. Go short when price approaches upper rail, go long when approaching lower rail.

2. EMA 
Calculate 21-day exponential moving average and generate trading signals when price crosses EMA. 

3. Candlestick Patterns
Identify price reversal points such as bottom dark cloud cover and top piercing pattern to trigger trades.

4. Dual-line Gambling 
Go long and short simultaneously based on signals from Bollinger, EMA crossover and candlestick patterns.

The logic is:

Use Bollinger Bands to identify potential reversal points, go short at upper rail and long at lower rail. Calculate 21-day EMA and go long on golden cross, go short on death cross. Also use candlestick patterns to identify reversals, go long on bottom dark cloud and short on top piercing. Combine all three signals to make final dual-direction trading decisions.

The strategy integrates multiple confirming signals to improve efficiency of trading decisions. The advantage is higher profitability with multiple validation and timely response to reversals. 

## Advantage Analysis

The main advantages of this strategy are:

1. Improved accuracy with multiple signal confirmation

Using Bollinger, EMA and candlestick together enhances accuracy by validating signals. This helps avoid false signals and erroneous trades.

2. Timely response and capture of reversals  

The combined signals quickly identify potential reversal points for timely trading before reversals extend.

3. Higher profitability with dual-line trading

Holding both long and short positions profits from big moves in either direction. This reduces risks in one-directional markets.

4. Flexibility for short-term trading

The short-period Bollinger and EMA allow capturing short-term moves, suitable for frequent trading and responding to high-frequency fluctuations.

5. Directly usable and simple to operate

The complete strategy code makes it directly usable for live trading. Reasonable parameters selection also makes it very easy to use for individual traders.

## Risk Analysis

The potential risks are:

1. Possible consecutive stop loss

Whipsaw of Bollinger, EMA and candlestick signals may cause consecutive stop loss. Adjust parameters to ensure reasonable stop loss.

2. Higher risks in dual-line trading 

Holding both long and short can amplify losses. Sufficient capital is required to support the risks. Lower position sizing is recommended.

3. Close monitoring needed for short-term trading

Frequent short-term trading requires close tracking of the market. Set stop profit/loss to limit unexpected big losses.

4. Limited optimization space

Bollinger and EMA has relatively small optimization space. Flexibility is needed when applying parameters.

5. Common candlestick patterns can be unclear

Part of the strategy relies on candlestick signals which can be unclear at times. Combine with other indicators in such cases.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Integrate more indicator signals 

Adding other indicators like KD, MACD diversifies signal sources and improves decision accuracy.

2. Incorporate machine learning 

Use ML algorithms to analyze historical data and augment or replace some indicator signals to reduce manual intervention.

3. Optimize stop profit/loss

Introduce adaptive stop profit based on performance, and trailing stop loss to reduce risk.

4. Enhance risk management 

Optimize capital allocation, position sizing and risk control strategies according to market conditions.

5. Quantitive backtesting and optimization

Utilize backtesting and paper trading to repeatedly optimize parameters and assist live trading decisions.

6. Automated Trading

Parameterize strategy based on backtest results and incorporate into automated trading system for hand-free execution.

## Conclusion

This strategy integrates Bollinger, EMA and candlestick signals for multiple validation. The dual-line trading further improves profitability. With fast response, it is suitable for short-term frequent trading. Effective stop profit/loss and parameter optimization can further enhance performance while reducing risk. Overall, this simple and practical strategy has strong practical value.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true| Follow Code #Trump On/Off|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Design by MrPhu in August,10,2018
strategy("TrumpShipper_Long_Short V26", overlay=true)
filterFractals = input(true, title=" Follow Code #Trump On/Off")
dt = 0.0001
confidence=(request.security(syminfo.tickerid, 'D', close)-request.security(syminfo.tickerid, 'D', close[1]))/request.security(syminfo.tickerid, 'D', close[1])
prediction = confidence > dt ? true : confidence < -dt ? false : prediction[1]

if (prediction)
    strategy.exit("Close", "Short ")
    strategy.entry("Long ", strategy.long)

if (not prediction)
    strategy.exit("Close", "Long ")
    strategy.entry("Short ", strategy.short)
///////////Bollinger Band///////////////
length = 20
crc = close, title="Source"
mult = 2.0
basis = sma(crc, length)
dev = mult * stdev(crc, length)
upper = basis + dev
lower = basis - dev
spanColor = prediction ? green : red, transp=90

p1 = plot(upper, title="Short", style=line, linewidth=1, color=spanColor)
p2 = plot(lower, title="Long", style=line, linewidth=1, color=spanColor)

fill(p1, p2, color=spanColor, transp=90, title="Fill")

/////////////
Optional_TimeFrame = 'D'

M_HIGH = request.security(syminfo.tickerid, Optional_TimeFrame, high)
M_OPEN = request.security(syminfo.tickerid, Optional_TimeFrame, open)
M_LOW = request.security(syminfo.tickerid, Optional_TimeFrame, low)

H_RANGE = M_HIGH-M_OPEN
L_RANGE = M_OPEN-M_LOW

H_236 = M_HIGH - H_RANGE * 0.236
H_382 = M_HIGH - H_RANGE * 0.382
H_500 = M_HIGH - H_RANGE * 0.500
H_618 = M_HIGH - H_RANGE * 0.618
H_764 = M_HIGH - H_RANGE * 0.764

L_236 = M_LOW + L_RANGE * 0.236
L_382 = M_LOW + L_RANGE * 0.382
L_500 = M_LOW + L_RANGE * 0.500
L_618 = M_LOW + L_RANGE * 0.618
L_764 = M_LOW + L_RANGE * 0.764

pl1=plot(M_HIGH, color=M_HIGH != M_HIGH[1] ?na:black, style=line, linewidth=1, transp=80)

pl2=plot(H_236, color=H_236 != H_236[1] ?na:gray, style=line, linewidth=1, transp=80)
pl3=plot(H_382, color=H_382 != H_382[1] ?na:black, style=line, linewidth=1, transp=80)
pl4=plot(H_500, color=H_500 != H_500[1] ?na:red, style=line, linewidth=1, transp=80)
pl5=plot(H_618, color=H_618 != H_618[1] ?na:gray, style=line, linewidth=1, transp=80)
pl6=plot(H_764, color=H_764 != H_764[1] ?na:gray, style=line, linewidth=1, transp=80)

pl7=plot(M_OPEN, color=M_OPEN != M_OPEN[1] ?na:blue, style=line, linewidth=2)

pl8=plot(L_236, color=L_236 != L_236[1] ?na:gray, style=line, linewidth=1, transp=80)
pl9=plot(L_382, color=L_382 != L_382[1] ?na:black, style=line, linewidth=1, transp=80)
pl10=plot(L_500, color=L_500 != L_500[1] ?na:red, style=line, linewidth=1, transp=80)
pl11=plot(L_618, color=L_618 != L_618[1] ?na:black, style=line, linewidth=1, transp=80)
pl12=plot(L_764, color=L_764 != L_764[1] ?na:gray, style=line, linewidth=1, transp=80)

pl13=plot(M_LOW, color=M_LOW != M_LOW[1] ?na:black, style=line, linewidth=1, transp=80)

SHOW_MA = false
MA_SRC = hlc3
MA_LENGTH = 21

_MA = ema(MA_SRC, MA_LENGTH)
pl14=plot(not SHOW_MA ? na : _MA, color=teal, linewidth=2)

SHOW_SIGNALS = true

BUYX(_F) => cross(_F, MA_SRC) and rising(_MA, 1)
SELX(_F) => cross(_F, MA_SRC) and falling(_MA, 1)

SEL_SIGNAL = SELX(H_236) or SELX(H_382) or SELX(H_500) or SELX(H_618) or SELX(H_764) or SELX(L_236) or SELX(L_382) or SELX(L_500) or SELX(L_618) or SELX(H_764)

BUY_SIGNAL = BUYX(H_236) or BUYX(H_382) or BUYX(H_500) or BUYX(H_618) or BUYX(H_764) or BUYX(L_236) or BUYX(L_382) or BUYX(L_500) or BUYX(L_618) or BUYX(H_764)

//================= Chart 30m =================/////
//Jurij
h_left = 10
h_right = 10
//barCount = nz(barCount[1]) + 1
//check history and realtime PTZ
h_left_low = lowest(h_left)
h_left_high = highest(h_left)
newlow = low <= h_left_low
newhigh = high >= h_left_high
central_bar_low = low[h_right + 1]
central_bar_high = high[h_right + 1]
full_zone_low = lowest(h_left + h_right + 1)
full_zone_high = highest(h_left + h_right + 1)
central_bar_is_highest = central_bar_high >= full_zone_high
central_bar_is_lowest = central_bar_low <= full_zone_low
plotchar(central_bar_is_highest ? -1 : 0, offset=-h_right-1 ,color=red, text="Top")
plotchar(central_bar_is_lowest ? 1 : 0, offset=-h_right-1 ,location=location.belowbar, color=green, text="Bottom")
```

> Detail

https://www.fmz.com/strategy/428616

> Last Modified

2023-10-07 15:30:27
