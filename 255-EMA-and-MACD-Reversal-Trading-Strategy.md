
> Name

255-EMA-and-MACD-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the 255-period EMA and MACD indicator to identify reversal trading opportunities. It enters reverse positions when the price is far from the 255 EMA and MACD crossover happens.

## Strategy Logic

1. The 255-period EMA is used to determine the mid-to-long term trend direction. The price being far from the EMA represents overbought/oversold area.

2. Upper and lower bands are set based on the EMA, with the band width dynamically adjusted by the ATR indicator. 

3. When the price is above the upper band, it's in the overbought region. When below the lower band, it's in the oversold region. These are situations to anticipate reversals.

4. The MACD indicator uses standard parameters (12, 26, 9). MACD crossover is bullish signal and death cross is bearish signal.

5. Combined with EMA overbought/oversold and MACD signals, reverse positions are taken when the price is far from EMA and MACD reversal happens.

## Advantage Analysis 

1. The 255-period EMA can determine mid-to-long term trends quite well.

2. MACD crossovers can sensitively capture short-term reversal opportunities.

3. The EMA bands help identify overbought/oversold regions to avoid trend chasing. 

4. Reverse trading allows early entries ahead of price reversals, with some plan-based traits.

5. Dynamic ATR stop loss can effectively control risks.

## Risk Analysis

1. MACD signals may have false reversals, leading to unnecessary losses.

2. Reversals are likely to fail in strong trending scenarios, so blind reversals should be avoided.

3. Stop loss set too tight may get stopped out prematurely, while too wide may result in insufficient risk control.

4. Improper parameter tuning can also impact strategy performance, requiring iterative optimization.

5. Trading costs may also affect final profitability and should be considered.


## Optimization Directions

1. Test different EMA periods to find a better mid-to-long term trend gauge.

2. Try combining other indicators with EMA to identify overbought/oversold, e.g. Bollinger Bands, KD, RSI. 

3. Optimize MACD parameters for better sensitivity or stability.

4. Test other stop loss methods, like trailing stop to lock in profits.

5. Optimize parameters across different products and timeframes for robustness. 

6. Incorporate trend strength filter to avoid reversals in strong trends.

## Conclusion

This strategy combines EMA mid-to-long trend and MACD short-term reversals, trading reverse at overbought/oversold regions. It's a basic reversal strategy with pros and cons. Further parameter tuning and risk control can turn it into an efficient trading system. But any strategy needs adaptive adjustments per market environments, not mechanical signals.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Trade Reverse|
|v_input_2|true|EMA Reverse Entry|
|v_input_3|255|EMA Length|
|v_input_4|5|EMA Expander|
|v_input_5|true|MACD Mult|
|v_input_6|true|Use Swing Lo/Hi Stop Loss & Take Profit|
|v_input_7|20|Swing Lo/Hi Lookback|
|v_input_8|false|SL Expander|
|v_input_9|false|TP Expander|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-09-19 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © bufirolas

//--- From 15 Trading Examples by Trader Alyx ---
// Seems like this strategy works better if we reverse the EMA filter logic.

// "Description: This basic scalping strategy allows you to enter the market based upon sentiment
// provided by the EMA, set at 255 periods. When price is trading below the 255 EMA, you would
// look to enter a LONG BUY positions, and when price is trading above the 255 EMA, you would
// look to enter a SELL SHORT position. The MACD lagging indicator will show you clear signals for
// when to do this. When the MACD lines cross in a bullish manner and price is below the 255
// EMA, buy. When the MACD lines cross in a bearish manner and price is above the 255 EMA,
// sell.
// NOTE: Make sure that price is trading away from the 255EMA before entering a LONG or SHORT
// position. As you can see in the chart below, the clearest signs for trade entry were presented
// when price was trading AWAY from the 255EMA"

//@version=4
// strategy("255 EMA Strategy", overlay=true, pyramiding=1, default_qty_type=strategy.cash, default_qty_value=100, commission_value = 0.04, initial_capital=100)

//Inputs
i_reverse=input(false, title="Trade Reverse")
i_EMAreverse=input(true, title="EMA Reverse Entry")
i_EMAlength=input(defval=255, title="EMA Length")
i_EMAexpander=input(defval=5, title="EMA Expander")
i_MACDmult=input(defval=1, minval=1, title="MACD Mult")

//SL & TP Calculations
i_SL=input(true, title="Use Swing Lo/Hi Stop Loss & Take Profit")
i_SwingLookback=input(20, title="Swing Lo/Hi Lookback")
i_SLExpander=input(defval=0, step=.2, title="SL Expander")*.01
i_TPExpander=input(defval=0, step=.2, title="TP Expander")*.01


//Strategy Variables
EMA=ema(close,i_EMAlength)
[macdLine, signalLine, histLine]=macd(close, 12*i_MACDmult, 26*i_MACDmult, 9*i_MACDmult)
EMAupper=EMA+((atr(100))*i_EMAexpander)
EMAlower=EMA-((atr(100))*i_EMAexpander)

//SL & TP Variables
SwingLow=lowest(i_SwingLookback)
SwingHigh=highest(i_SwingLookback)

//Calculations
EMAbuy=i_EMAreverse ? close > EMAupper : close < EMAlower
EMAsell=i_EMAreverse ? close < EMAlower : close > EMAupper
MACDbuy=crossover(macdLine, signalLine)
MACDsell=crossunder(macdLine, signalLine)

//SL & TP Calculations
bought=strategy.position_size != strategy.position_size[1]
lSL=valuewhen(bought, SwingLow, 0)*(1-i_SLExpander)
sSL=valuewhen(bought, SwingHigh, 0)*(1+i_SLExpander)
lTP=strategy.position_avg_price + (strategy.position_avg_price-(valuewhen(bought, SwingLow, 0))*(1-i_TPExpander))
sTP=strategy.position_avg_price - (valuewhen(bought, SwingHigh, 0) - strategy.position_avg_price)*(1+i_TPExpander*100)
islong=strategy.position_size > 0
isshort=strategy.position_size < 0
SL= islong ? lSL : isshort ? sSL : na
TP= islong ? lTP : isshort ? sTP : na


//Entries
strategy.entry("long", long=not i_reverse?true:false, when=EMAbuy and MACDbuy)
strategy.entry("short", long=not i_reverse?false:true, when=EMAsell and MACDsell)

//Exits
if i_SL
    strategy.exit("longexit", "long", stop=SL, limit=TP)
    strategy.exit("shortexit", "short", stop=SL, limit=TP)

//Plots
plot(EMA, "EMA", color=color.white, linewidth=2)
plot(EMAupper, "EMA Upper Band")
plot(EMAlower, "EMA Lower Band")
plot(i_SL ? SL : na, color=color.red, style=plot.style_cross, title="SL")
plot(i_SL ? TP : na, color=color.green, style=plot.style_cross, title="TP")




```

> Detail

https://www.fmz.com/strategy/427379

> Last Modified

2023-09-20 15:08:14
