
> Name

基于255-EMA-与-MACD-的反转交易策略255-EMA-and-MACD-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用 255 周期的 EMA 和 MACD 指标来寻找反转交易机会。当价格远离 255 EMA 时,在 MACD 发生金叉或死叉时进行反向进入。

## 策略原理

1. 使用 255 周期 EMA 作为中长期趋势的判断。价格远离 EMA 代表进入超买超卖区域。

2. EMA 上方设定上轨,EMA 下方设定下轨,轨道宽度通过 ATR 指标动态调整。

3. 当价格高于上轨时为超买区,当价格低于下轨时为超卖区。这些情况下等待反转信号出现。 

4. MACD 指标采用标准参数(12,26,9)。当 MACD 金叉时为多头信号,死叉时为空头信号。

5. 结合 EMA 超买超卖和 MACD 信号,在价格远离 EMA 时且 MACD 发生反转时,采取反向进入。

## 优势分析

1. 使用 255 周期 EMA 可以比较好地判断中长期趋势方向。

2. MACD 金叉死叉可以较敏感地捕捉短期反转机会。

3. EMA 上下轨场设定可以判断超买超卖区域,避免在趋势中随波逐流。

4. 反向交易策略,可以在价格反转前进入,具有一定的计划性。

5. 采用动态 ATR 止损可以有效控制风险。

## 风险分析

1. MACD 信号可能出现假反转,导致不必要的损失。

2. 强势趋势情况下反转失败概率较大,应避免盲目反转。

3. 止损设置过小可能导致止损被触发,设置过大可能控制风险不足。

4. 参数设置不当也会影响策略效果,需要经过反复测试优化。

5. 交易费用也会影响最终收益,需要考虑其对策略的影响。

## 优化方向

1. 可以测试不同的 EMA 周期参数,寻找更合适的中长期趋势判断指标。

2. 可以尝试其他指标结合 EMA 来判断超买超卖区域。例如布林带,KD,RSI 等。

3. MACD 参数也可以进行优化,找到更敏感或者稳定的组合参数。

4. 可以测试其他止损方式,例如 trailing 止损来锁定利润。

5. 可以根据不同品种不同周期进行参数优化,使策略更具适应性。

6. 可以结合趋势力度指标,避免强势趋势中反转。

## 总结

该策略整合 EMA 中长期趋势判断和 MACD 短期反转信号,在超买超卖区域反向交易,是一个基础的反转策略。该策略有一定的优势,但也存在一些风险需要防范。通过继续优化参数以及风险控制,该策略可以成为一个具有效率的量化交易策略。但任何策略都需要根据市场环境调整,不能橙子化,盲目跟单。

||

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

[/trans]

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
