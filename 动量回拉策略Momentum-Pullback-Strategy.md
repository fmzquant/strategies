
> Name

动量回拉策略Momentum-Pullback-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14e6b42ec06654e6abb.png)
[trans]

## 概述

动量回拉策略(Momentum Pullback Strategy)是一种识别RSI极端值作为动量信号的长短仓策略。与大多数RSI策略不同,该策略在极端RSI读数的方向上寻找首次回拉进行入场。

它在5日EMA(最低价)/5日EMA(最高价)的首次回拉点进行做多/空,并在滚动12根K线的最高点/最低点平仓。该滚动高点/低点机制意味着如果价格进入长期整理,止盈目标会随着每根新K线的出现而降低。最佳交易通常来自2-6根K线内完成。

建议的止损距离为入场价格的X倍ATR(可在用户输入参数中调整)。

该策略对各个时间周期和市场的稳健性较强,胜率在60%-70%之间,盈利交易规模较大。需要避免在重大经济新闻导致的波动中产生信号。

## 策略原理

1. 计算6日RSI值,寻找超过90以上(超买)和10以下(超卖)的极端点

2. 当RSI超买时,在6根K线内回拉至5日EMA(最低线)进行做多入场

3. 当RSI超卖时,在6根K线内回拉至5日EMA(最高线)进行空头入场 

4. 出场策略为移动止盈,长仓以过去12根K线的最高点为第一个出场目标,随后新K线出现时更新为新的12根K线最高点,实现滚动出场。空头相反,以滚动12根K线最低点止损。

5. 止损距离为入场价格X倍ATR,可自定义。

## 优势分析

该策略结合RSI极值作为势能信号和回拉入场,可捕捉趋势中的潜在反转点,胜率较高。

启用了移动止盈机制,可根据价格实际走势来锁定部分利润,减少回撤。

ATR止损可有效控制单笔损失。

较强的稳健性,可适用于不同市场和参数组合,容易实盘复制。

## 风险分析

如果ATR数值设置过大,可能导致止损距离过远,单笔亏损扩大。

如果发生██╗盘整理,移动止盈机制会缩减盈利空间。

如果回拉距离过深超过6根K线,会错过入场时机。

如果遇到重大经济事件,交易可能遭遇滑点或假突破。

## 优化方向  

可以测试缩短入场根数,如从6根调整为4根K线,提高入场成功率。

可以测试增加ATR倍数,进一步控制单笔止损。

可以结合量能指标,避免整理背驰带来的损失。

可以在回拉突破60分钟级别的中轴后入场,可过滤掉部分噪音。

## 总结

动量回拉策略总体来说是一个非常实用的短线捕捉策略。它结合趋势、反转、止损多个方面,既可便捷实盘操作,也具备一定的Alpha。通过参数调整和结合其他指标,可进一步提升稳定性。总的来说,该策略是量化交易的一大福音,值得学习和运用。

|| 

## Overview

The Momentum Pullback Strategy identifies extreme RSI readings as momentum signals for a long/short strategy. Unlike most RSI strategies, it looks to buy or sell the first pullback in the direction of the extreme RSI reading.

It enters long/short on the first pullback to the 5-period EMA (low)/5-period EMA (high) and exits at the rolling 12-bar high/low. The rolling high/low feature means the profit target will begin to reduce with each new bar if the price enters prolonged consolidation. The best trades tend to work within 2-6 bars.  

The suggested stop loss is X ATRs (adjustable in inputs) from the entry price.

The strategy is fairly robust across timeframes and markets with 60%-70% win rate and larger winning trades. Signals occurring from news volatility should be avoided.

## Strategy Logic

1. Calculate 6-period RSI and identify values above 90 (overbought) and below 10 (oversold).

2. When RSI is overbought, go long on a pullback to the 5-period EMA (low) within 6 bars.  

3. When RSI is oversold, go short on a pullback to the 5-period EMA (high) within 6 bars.

4. The exit strategy is a moving take profit, with the initial target being the highest high/lowest low of the past 12 bars, updating on each new bar for a rolling exit.  

5. The stop loss is X ATRs from the entry price (customizable).

## Advantage Analysis  

The strategy combines RSI extremes as momentum signals and pullback entries to capture potential reversal points in trends, with a high win rate.

The moving take profit mechanism locks in partial profits according to actual price action, reducing drawdowns.

The ATR stop helps effectively control single-trade loss.

Good robustness to apply across different markets and parameter sets for easy real trading replication.

## Risk Analysis

A too-wide stop loss if ATR multiplier set too high, increasing loss per trade.

Moving take profit mechanism may reduce profit margin if prolonged consolidation occurs.  

Missing trades if pullback extends beyond 6 bars.

Potential slippage or false breakout if major news events occur.

## Optimization Directions

Test shortening entry bar count from 6 to 4 to improve entry rate.

Test increasing ATR multiplier to further control loss per trade. 

Incorporate volume indicators to avoid losses from divergence in consolidation.

Enter on pullback break of 60min mid-point to filter noise.

## Conclusion

The Momentum Pullback Strategy is an overall very practical short-term mean reversion approach, incorporating elements of trend, reversal and risk management for easy real trading while still carrying alpha-generating potential. Further stability enhancements are possible through parameter tuning and combining additional indicators. It represents a great boon for quant trading and is well worth learning and applying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|2.75|atr stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Marcns_

//@version=5
strategy("M0PB", commission_value = 0.0004, slippage = 1, initial_capital=30000)
// commision is equal to approx $3.8 per round trip which is accurate for ES1! futures and slippage per trade is conservatively 1 tick in and 1 tick out. 

// *momentum pull back* //

// long / short strategy that identifies extreme readings on the rsi as a *momentum signal*
//Strategy buys/ sells a pullback to the 5ema(low)/ 5ema(high) and exits at rolling 12 bar high/ low. The rolling high/ low feature means that 
//if price enters into a pronlonged consolidation the profit target will begin to reduce with each new bar. The best trades tend to work within 2-6 bars
// hard stop is X atr's from postion average price. This can be adjusted in user inputs.
// built for use on 5 min & 1min intervals on: FX, Indexes, Crypto
// there is a lot of slack left in entries and exits but the overall strategy is fairly robust across timeframes and markets and has between 60%-70% winrate with larger winners.
// signals that occur from economic news volatility are best avoided.  


// define rsi
r = ta.rsi(close,6) 

// find rsi > 90
b = 0.0

if r >= 90
    b := 1.0
else
    na

// find rsi < 10
s = 0.0

if r <= 10
    s := -1.0
else
    na

// plot rsi extreme as painted background color
bgcolor(b ? color.rgb(255, 82, 82, 49): na)
bgcolor(s? color.rgb(76, 175, 79, 51): na)



// exponential moving averages for entries. note that source is high and low (normally close is def input) this creates entry bands
//entry short price using high as a source ta.ema(high,5)
es = ta.ema(high,5)

//entry long price using low as a source ta.ema(low,5)
el = ta.ema(low,5)


// long pullback entry trigger: last period above ema and current low below target ema entry 
let = 0.0

if low[1] > el[1] and low <= el
    let := 1.0
else
    na
//short entry trigger ""
set = 0.0

if high[1] < es[1] and high >= es
    set := -1.0
else
    na

// create signal "trade_l" if RSI > 90 and price pulls back to 5ema(low) within 6 bars
trade_l = 0.0

if ta.barssince(b == 1.0) < 6 and let == 1.0
    trade_l := 1.0
else
    na

plot(trade_l, "l_entry", color.green)

//create short signal "trade_s" if rsi < 10 and prices pullback to 5em(high) wihthin 6 bars
trade_s = 0.0

if ta.barssince(s == -1.0) < 6 and set == -1.0
    trade_s := -1.0
else
    na

plot(trade_s, "s_entry", color.purple)

// define price at time of trade_l signal and input value into trade_p to use for stop parems later
trade_p = strategy.position_avg_price

//indentify previous 12 bar high as part of long exit strat
// this creates a rolling 12 bar high target... a quick move back up will exit at previous swing high but if a consolidation occurs system will exit on a new 12 bar high which may be below prev local high
ph = ta.highest(12)

// inverse of above for short exit strat - previous lowest low of 12 bars as exit (rolling)
pl = ta.lowest(12)


// 1.5 atr stop below entry price (trade_p defined earlier) as part of exit strat
atr_inp = input.float(2.75, "atr stop", minval = 0.1, maxval = 6.0)

atr = ta.atr(10)

stop_l = trade_p - (atr* atr_inp)
stop_s = trade_p + (atr* atr_inp)

//strat entry long

strategy.entry("EL", strategy.long, 2, when = trade_l == 1.0)

//strat entry short

strategy.entry("ES", strategy.short, 2, when = trade_s == -1.0)   
    
//strat long exit

if strategy.position_size == 2
    strategy.exit(id = "ph", from_entry = "EL", qty = 2, limit = ph)
    if strategy.position_size == 2
        strategy.close_all(when = low[1] > stop_l[1] and low <= stop_l)

// strat short exit

if strategy.position_size == -2
    strategy.exit(id = "pl", from_entry = "ES", qty = 2, limit =pl)
    if strategy.position_size == -2
        strategy.close_all(when = high[1] < stop_s[1] and high >= stop_s)




// code below to trail remaining 50% of position //

 //if strategy.position_size == 1 
        //strategy.exit(id ="trail", from_entry = "EL", qty = 1, stop = el)
        

```

> Detail

https://www.fmz.com/strategy/435147

> Last Modified

2023-12-12 16:34:52
