
> Name

RSI拉升突破策略RSI-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6c3f212f2e7a8c5405.png)

## Overview

The RSI Breakout Strategy is a quantitative trading strategy that identifies breakout points using the RSI indicator, combined with breaks of the day's high or low prices, to make buy or sell decisions. This strategy is suitable for Indian index futures such as Nifty, Bank Nifty, etc.

## Strategy Logic  

The core logic of the RSI Breakout Strategy is:  

1. Limit trading time between 10:15 am and 3:10 pm to avoid violent fluctuations at market open and close.

2. Real-time monitor breaks of the day's high and low prices. If the day's high is broken, a buy signal is generated. If the day's low is broken, a sell signal is generated.  

3. When the day's high/low is broken, check the value of the RSI indicator simultaneously. The RSI indicator can measure the overbought/oversold levels of the market. When RSI is above 50, it indicates a bull market. When RSI is below 50, it indicates a bear market. So the strategy requires RSI to align with the price breakout direction to avoid false breakouts.  

4. When buy/sell signals are triggered, set the 20-period VWMA as the stop loss line.

5. Mandatory stop loss exit after 3:10 pm every day if positions are still open.

## Advantages

The biggest advantage of the RSI Breakout Strategy is that it combines price breakout and dual confirmation from the RSI indicator to effectively identify short-term market trends. In addition, using the day's high/low prices as reference prices and RSI to determine true/false breakouts can greatly improve signal accuracy. Finally, the rigorous stop loss mechanism helps keep losses under control.

## Risks

There are some risks in the RSI Breakout Strategy:

1. The day's high/low may update slightly multiple times, which can easily cause overtrading. This can be avoided by relaxing the breakout range to avoid chasing tops/bottoms.  

2. Indian equity indices carry high policy risks that require close attention to economic policies and central bank moves. Major negative news should prompt stop loss exit.  

3. The relatively short reference cycles make the strategy prone to market noise. This can be mitigated by extending calculation cycles or adding other filters to improve signal quality.

## Optimization Directions  

The RSI Breakout Strategy can be optimized in several aspects:  

1. Add position sizing mechanisms, such as pyramiding with trend and adding positions after trailing stop loss.

2. Incorporate other indicators to filter signals, using KDJ, WR, OBV etc. to gauge market conditions and avoid trading traps.   

3. Optimize strategy parameters like breakout range, RSI threshold values, stop loss placement etc. to achieve better performance.  

4. Formulate clear entry and exit mechanisms, such as adding after pullback from initial breakout, taking partial profits etc.

## Conclusion  

The RSI Breakout Strategy utilizes high/low breakouts and RSI indications to identify short-term price trends to some extent. It is a typical breakout strategy, simple to operate with strict risk control, suitable for medium-term trading. Further optimizations can improve strategy performance for learning and adaptation.  




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-12-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Saravanan_Ragavan


// This Strategy is finding high or low breaks of the day and enter into the trader based on RSI value and time value 

//@version=4
strategy(title="HiLoExtn", shorttitle="HiLoExtn", overlay=true)


T1 = time(timeframe.period, "0915-0916")
Y = bar_index
Z1 = valuewhen(T1, bar_index, 0)
L = Y-Z1 + 1

tim = time(timeframe.period, "1015-1510")
exitt= time(timeframe.period, "1511-1530")

//VWMA 20
plot(vwma(close,20), color=color.blue)


length = L
lower = lowest(length)
upper = highest(length)
u = plot(upper, "Upper", color=color.green)
l = plot(lower, "Lower", color=color.red)


//**** RSI
len = 14
src = close
up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))




// Buy above Buy Line
if ( (upper==high) and rsi>50 and   tim and close>open )
    strategy.entry("Buy", strategy.long, comment="Buy")
    
// Exit Long Below Vwap
strategy.close("Buy", when = close < vwma(close,20) or exitt) 

// Sell above Buy Line
if ((lower==low) and rsi<50 and   tim  and close<open)
    strategy.entry("Sell", strategy.short, comment="Sell")
    
// Exit Short above Vwap    
strategy.close("Sell", when = close > vwma(close,20) or exitt)



```

> Detail

https://www.fmz.com/strategy/434977

> Last Modified

2023-12-11 14:34:54
