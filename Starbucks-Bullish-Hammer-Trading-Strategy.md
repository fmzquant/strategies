
> Name

Starbucks-Bullish-Hammer-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy identifies bullish hammer candlestick patterns and uses the MACD indicator to determine trend direction for trend following trades. During a bull market, go long when a bullish hammer appears while MACD is bullish. Close position when MACD turns bearish.

## Strategy Logic

Identify bullish hammer by calculating body-to-range ratio. Use MACD to determine trend direction. When MACD is bullish, go long when a bullish hammer signal appears. Set stop loss and position sizing. Exit when MACD turns bearish.

## Advantages

- Bullish hammer recognition is simple and clear
- MACD effectively identifies trend reversals  
- Following trends avoids whipsaws
- Simple and straightforward logic, easy to implement

## Risks

- Pattern recognition is imperfect, signals can be missed
- MACD trend reversal identification has lag
- Low trade frequency unsuitable for high frequency trading
- Exact reversal points cannot be determined, risks losses

Risks can be mitigated by relaxing pattern criteria, shortening MACD parameters, adding secondary indicators etc.

## Enhancements

- Optimize hammer pattern identification rules
- Test different MACD parameter settings
- Consider adding other indicators to determine reversals
- Test robustness across different products

## Conclusion

This strategy integrates pattern and indicator analysis for trend determination, enabling steady profits. Further refinements like parameter optimization can make it a practical quant trading strategy.  




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © FenixCapital

//@version=4
strategy("Starbux", overlay=true)


//VARIABLES

//Candlestick Variables
body=close-open
range=high-low
middle=(open+close)/2
abody=abs(body)
arange=abs(range)
ratio=abody/range
longcandle= (ratio>0.6)
bodytop=max(open, close)
bodybottom=min(open, close)
shadowtop=high-bodytop
shadowbottom=bodybottom-low

//Closing Variables

macd=macd(close,12,26,9)
[macdLine, signalLine, histLine] = macd(close, 12, 26, 9)
//plot(macdLine, color=color.blue)
//plot(signalLine, color=color.orange)
//plot(histLine, color=color.red, style=plot.style_histogram)

rsi=rsi(close,14)

sma50= sma(close,50)
sma200= sma(close,200)

exitrsi=rsi > 76
exitmacd=macdLine >0 and signalLine>0
//exitmacd=crossunder(macdLine,signalLine)
stopprice= crossunder(sma50,sma200)

//Candlestick Plotting
blh = (arange*0.33>=abody and close>open and shadowbottom>=abody*2 and shadowtop<=arange*0.1)
plotshape(blh, title= "Bullish Hammer", location=location.belowbar, color=color.lime, style=shape.arrowup, text="Bull\nHammer")

//beh = (arange*0.25>=abody and close<open and shadowtop>=abody*2 and shadowbottom<=arange*0.05)
//plotshape(beh, title= "Bearish Hammer", color=color.orange, style=shape.arrowdown, text="Bear\nHammer")

//bpu = (open>close and close>low and shadowbottom>2*abody)
//plotshape(bpu, title= "Black Paper Umbrella", color=color.red, style=shape.arrowdown, text="Black\nPaper\nUmbrella")

//Trend Signal
bull5= sma50 > sma200
bullmacd=macdLine>=0 and signalLine>=0
bearmacd=macdLine<= 0 and signalLine<=0

//Trading Algorithm
longCondition = blh and bearmacd and volume>volume[1]

if (longCondition)
    strategy.order("Buy", true, 1, when=longCondition)
strategy.risk.max_position_size(10)
//strategy.risk.max_drawdown(25,strategy.percent_of_equity)

exitlong = exitmacd
if (exitlong)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/427138

> Last Modified

2023-09-18 15:48:15
