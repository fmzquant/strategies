
> Name

EMA反向买卖策略EMA-Reverse-Buy-Sell-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bd6acdeb8fbfc5362b.png)
[trans]

## 概述

该策略是一个基于均线的趋势跟踪策略。它使用两个不同周期的EMA均线,即21周期和55周期的EMA均线。当短期EMA线上穿长期EMA线时产生买入信号;当短期EMA线下穿长期EMA线时产生卖出信号。

除此之外,策略还结合了反向买卖、ATR止损和反转止盈来提高策略的稳定性和盈利能力。

## 策略原理  

1. 使用21周期和55周期两条EMA均线。 21EMA代表短期趋势,55EMA代表长期趋势。  

2. 当短期EMA线上穿长期EMA线时,表示短期趋势转换为上升趋势,产生买入信号。  

3. 当短期EMA下穿长期EMA时,表示短期趋势转换为下降趋势,产生卖出信号。  

4. 反向买卖:只在价格小于开盘价时产生买入信号,只在价格大于开盘价时产生卖出信号。这是为了在短期回调时买入,在短期反弹时卖出,从而获利。  

5. ATR止损:使用ATR指标的N倍来设置止损位。这可以根据市场波动度来动态调整止损。 

6. 反转止盈:使用买入价减去ATR的N倍作为止盈位。这是利用价位重新测试前支持转抵抗的特征来止盈。

## 策略优势

1. 使用双EMA判断主要趋势方向,能捕捉中长线趋势。

2. 反向交易,适合趋势回调短线操作。

3. ATR止损,可以根据市场波动性设置止损。

4. 反转止盈,设置在重要技术位附近,增加止盈概率。

5. 策略逻辑简单清晰,容易理解和修改。

6. 可供数字货币等具有高波动性市场使用。

## 风险及解决方案

1. 双EMA均线产生错误信号的概率大,可适当延长均线周期。

2. 反向交易容易止损,可调整止损比较宽松。  

3. 市场常有假突破,可加入其他指标过滤信号。 

4. 止盈风险大,可人工及时移除止盈单。

## 策略优化建议  

1. 加入MACD,KD等指标判断超买超卖区域,过滤入场时机。  

2. 添加更多均线,例如120周期EMA,综合判断趋势。

3. 对买入和卖出分别设置滑点,优化入场价位。  

4. 针对数字货币的高波动特点,可适当放宽ATR的止损幅度。

5. 优化ATR倍数和移动止损方案,以求取最大盈利和最小回撤。


## 总结

该策略整体来说是一个较为简单的双EMA均线策略,核心思路是利用EMA判断趋势方向。策略的优点是逻辑简洁,参数调整灵活,可适用于中长线趋势和短线反转。我们也分析了该策略可能存在的风险和应对方法,以及未来的几点优化建议。总体而言,该策略有一定的实用性和拓展空间,但需要根据不同市场调整参数使用。
||

## Overview  

This is a trend following strategy based on EMA lines. It uses two EMA lines with different periods, 21 and 55. When the faster EMA line crosses above the slower EMA line, a buy signal is generated. When the faster EMA crosses below the slower one, a sell signal is generated.

In addition, the strategy incorporates reverse trading, ATR stop loss, and reversal take profit to enhance its stability and profitability.  

## Strategy Logic   

1. Use 21 and 55 period EMA lines. 21 EMA represents short-term trend and 55 EMA represents long-term trend.   

2. When 21 EMA crosses above 55 EMA, it indicates the short-term trend changes to upward, generating a buy signal.  

3. When 21 EMA crosses below 55 EMA, it indicates the short-term trend turns downward, generating a sell signal.   

4. Reverse trading: only buy when price is below open price, and only sell when price is above open price. This aims to buy on short-term pullbacks and sell on rebounds.  

5. ATR stop loss: use N times ATR to set stop loss price. This dynamically adjusts stop loss based on market volatility.  

6. Reversal take profit: use entry price minus N times ATR as profit target. This takes advantage of price retesting previous support-turned-resistance area.  

## Advantages of the Strategy  

1. Captures mid- to long-term trends using dual EMA.  

2. Reverse trading suits short-term pullback trades of trends.   

3. ATR stop adapts to market volatility.  

4. Reversal take profit sits near important technical levels with higher probability.   

5. Simple and clear logic, easy to understand and modify.  

6. Applicable for high volatile markets like cryptocurrencies.  

## Risks and Solutions   

1. Dual EMA may generate false signals. Can lengthen EMA periods.  

2. Reverse trades prone to stop loss. Can loosen stop loss a bit.

3. Fake breakouts happen frequently. Add other filters.  

4. High risk on take profit. Manually remove take profit orders in time.  

## Optimization Suggestions    

1. Add indicators like MACD, KD to filter signals in overbought/oversold zones.   

2. Add more EMA like 120 period EMA to judge trend comprehensively.  

3. Set different slippage for longs and shorts to better entry price.  

4. Loosen ATR stop loss for highly volatile crypto trading.  

5. Optimize ATR multiplier and trailing stop mechanisms for maximum profit and minimum drawdown.

## Conclusion  

In conclusion, this is a relatively simple dual EMA trend following strategy. Its strength lies in clean logic, flexible parameters, applicability in mid- to long-term trends and short-term reversals. We also analyzed its potential weaknesses and solutions, along with several recommendations for future improvements. Overall speaking, this strategy is practical to some extent and has room to evolve, but its parameters need adjustments for different markets.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TheHulkTrading

// Simple EMA strategy, based on ema55+ema21 and ATR(Average True Range) and it enters a deal from ema55 when the other entry conditions are met


//@version=4
strategy("Simple Ema_ATR Strategy HulkTrading", overlay=true)

atr_multiplier = input(2, minval=1, title="ATR Multiplier") // ATR Multiplier. Recommended values between 1..4


emaFast=ema(close,21)
emaSlow=ema(close,55)

//Basically long and short conditions

//If long: 
// 1) close must be less than open (because we are searching for a pullback)
// 2) emaFast(21) must be bigger than emaSlow(55) - for a trend detection
// 3) Difference between emaFast and emaSlow must be greater than ATR(14) - for excluding flat
longCond = close < open and emaFast > emaSlow and abs(emaSlow-emaFast) > atr(14)  

//For short conditions are opposite
shortCond = close > open and emaFast < emaSlow and abs(emaSlow-emaFast) > atr(14) 

//Stop levels and take profits, based on ATR multiplier

stop_level_long = strategy.position_avg_price - atr_multiplier*atr(14)
take_level_long = strategy.position_avg_price + atr_multiplier*atr(14)
stop_level_short = strategy.position_avg_price + atr_multiplier*atr(14)
take_level_short = strategy.position_avg_price - atr_multiplier*atr(14)


//Entries and exits 
strategy.entry("Long", strategy.long, when=longCond, limit = emaSlow)
strategy.exit("Stop Loss/TP","Long", stop=stop_level_long, limit = take_level_long)
strategy.entry("Short", strategy.short, when=shortCond, limit = emaSlow)
strategy.exit("Stop Loss/TP","Short", stop=stop_level_short, limit = take_level_short)


```

> Detail

https://www.fmz.com/strategy/433587

> Last Modified

2023-11-28 16:54:14
