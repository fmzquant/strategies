
> Name

Double-Decker-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e026de35749ac10592.png)
 ## Overview

The Double Decker RSI trading strategy is a quantitative trading strategy based on the Relative Strength Index (RSI). This strategy utilizes both fast and slow RSI as trading signals to achieve double confirmation and aims to improve signal quality and filter out false signals.  

## Strategy Logic  

This strategy employs two RSI with different periods as the main trading indicators. The fast RSI has a period of 5 days and is used to capture short-term overbought and oversold situations. The slow RSI has a period of 14 days and is used to determine the medium to long term trend and key support/resistance levels.

The specific trading rules are:

1. When the fast RSI crosses above 70 and the slow RSI is above 50, go long. When the fast RSI crosses below 30 and the slow RSI is below 50, go short.

2. The stop loss for long positions is when the fast RSI crosses below 55. The stop loss for short positions is when the fast RSI crosses above 45.

By combining fast and slow RSI, this strategy achieves complementarity between different timeframes, and can effectively identify overbought/oversold conditions while confirming the medium to long term trend, thus generating high quality trading signals. The double RSI filter mechanism also helps reduce false breakout noises.  

## Advantage Analysis

The biggest advantage of the Double Decker RSI strategy is that it can effectively filter out false signals and improve signal quality, thus reducing unnecessary trades and lowering trading frequency. The specific advantages are:

1. The combination of fast and slow RSI identifies short, medium and long-term overbought/oversold points, improving signal accuracy.  

2. The double RSI filter mechanism effectively reduces noise and avoids being trapped.

3. Low trading frequency helps reduce transaction costs and slippage loss.  

4. The stop loss mechanism controls single loss and maximum drawdown.

## Risk Analysis  

The Double Decker RSI strategy also carries certain risks, mainly from the following aspects:

1. The lagging nature of RSI itself may cause trade delay.  

2. The double filter mechanism may miss some trading opportunities.

3. It cannot completely avoid systemic risks in extreme market conditions.

The following methods can be used to mitigate the above risks:

1. Appropriately adjust the parameters of the fast RSI to increase sensitivity.

2. Optimize entry and stop loss conditions to balance risk and return.  

3. Use in combination with trend-following systems, machine learning algorithms etc.

## Optimization Directions

There is still room for further optimization of the Double Decker RSI strategy, mainly in the following directions:

1. Dynamic optimization of RSI parameters to automatically adjust based on market conditions.

2. Add a volatility-based risk control module.   

3. Incorporate alternative signals like text mining, social data etc.  

4. Use machine learning models to assist in filtering signals.

Through the above optimizations, the strategy's profitability, robustness and adaptiveness can be further improved.  

## Conclusion  

In general, the Double Decker RSI strategy is a very practical quantitative trading strategy. It combines trend tracking, overbought/oversold identification, and dual filtering mechanisms to form a relatively complete trading system. This strategy performs remarkably in controlling risk and reducing trading frequency, making it suitable for medium to long term holding. With continuous optimization and iteration, the Double Decker RSI strategy has the potential to become an important component of next-generation quantitative strategies.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Slow RSI Period|
|v_input_2|5|Fast RSI Period|
|v_input_3|2000|Backtest Start Year|
|v_input_4|2021|Backtest End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-30 00:00:00
end: 2024-01-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Ankit_Quant
//@version=4

// ********************************************************************************************************
// This was coded live during webinar on Backtesting in Tradingview 
// That was held on 16-Jan-21
// Aim of this strategy is to code a Double Decker RSI Strategy - Rules of Strategy are given in Description
// *********************************************************************************************************

// Identifier of strategy or an indicator (study())
strategy(title="Strategy- Double Decker RSI",shorttitle='Strategy - Double Decker RSI',overlay=true)

// ********************
// INPUTS
// ********************
// RSI Lookback Periods
slowRSI=input(defval=14,title='Slow RSI Period',type=input.integer)
fastRSI=input(defval=5,title='Fast RSI Period',type=input.integer)

// Time Period Backtesting Input
start_year=input(defval=2000,title='Backtest Start Year',type=input.integer)
end_year=input(defval=2021,title='Backtest End Year',type=input.integer)

//Specific Years to Test Starategy
timeFilter=true


// Trade Conditions and signals
long = rsi(close,fastRSI)>70 and rsi(close,slowRSI)>50
short = rsi(close,fastRSI)<40 and rsi(close,slowRSI)<50
long_exit=rsi(close,fastRSI)<55
short_exit=rsi(close,fastRSI)>45

//positionSize - 1 Unit (also default setting)
positionSize=1

// Trade Firing - Entries and Exits 
if(timeFilter)
    if(long and strategy.position_size<=0)
        strategy.entry(id='Long',long=strategy.long,qty=positionSize)
    if(short and strategy.position_size>=0)
        strategy.entry(id="Short",long=strategy.short,qty=positionSize)
    if(long_exit and strategy.position_size>0)
        strategy.close_all(comment='Ex')
    if(short_exit and strategy.position_size<0)
        strategy.close_all(comment='Ex')


// Plot on Charts the Buy Sell Labels
plotshape(strategy.position_size<1 and long,style=shape.labelup,location=location.belowbar,color=color.green,size=size.tiny,text='Long',textcolor=color.white)
plotshape(strategy.position_size>-1 and short,style=shape.labeldown,location=location.abovebar,color=color.red,size=size.tiny,text='Short',textcolor=color.white)
plotshape(strategy.position_size<0 and short_exit?1:0,style=shape.labelup,location=location.belowbar,color=color.maroon,size=size.tiny,text='ExShort',textcolor=color.white)
plotshape(strategy.position_size>0 and long_exit?1:0,style=shape.labeldown,location=location.abovebar,color=color.olive,size=size.tiny,text='ExLong',textcolor=color.white)


```

> Detail

https://www.fmz.com/strategy/440428

> Last Modified

2024-01-30 15:21:47
