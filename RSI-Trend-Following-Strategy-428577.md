
> Name

RSI-Trend-Following-Strategy-428577

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy designs a long-only trading system based on the Relative Strength Index (RSI) indicator. It goes long when RSI shows golden cross and exits when RSI shows dead cross by configuring different RSI bands.

## Strategy Logic

The strategy mainly relies on the RSI indicator to generate trading signals. RSI calculates the ratio of up days versus down days over a period to reflect overbought and oversold situations. High RSI values represent overbought conditions while low RSI values represent oversold conditions. 

Specifically, the strategy sets multiple parameters of RSI to generate trading signals:

1. rsi_low: the lower band of RSI, default 30, below which is considered oversold
2. rsi_middle: the middle band of RSI, default 55
3. rsi_mhigh: the upper middle band of RSI, default 60 
4. rsi_high: the upper band of RSI, default 70, above which is considered overbought
5. rsi_top: the top level of RSI, default 75
6. rsi_period: the period to calculate RSI, default 14

After calculating the RSI values, the strategy generates trading signals as below:

1. Go long when RSI crosses above the lower or middle band
2. Exit with stop loss when RSI falls below the lower band 
3. Partially close positions when RSI falls below middle, upper middle, upper band
4. Fully close all positions when RSI exceeds the top level

By setting multiple RSI bands to capture golden cross and dead cross between overbought and oversold zones, it realizes trend following.

## Advantage Analysis

The RSI trend following strategy has several advantages:

1. The logic is clear and easy to understand, following the trend based on RSI overbought/oversold situation
2. Flexible configurable RSI parameters suit different periods and products  
3. The staged stop loss mechanism could catch big trends while controlling risks
4. No need to specify particular entry or exit timing, fully automated trading
5. RSI can combine with other indicators to expand the strategy space

## Risk Analysis

There are some risks to note for this strategy:

1. RSI has some lagging, may miss the start of big trends
2. Improper stop loss setting may cause unnecessary losses
3. Unidirectional long bias, risk of missing trend reversal  
4. Short holding periods lead to higher slippage and commission costs
5. Wrong signals when RSI divergence happens

These could be mitigated by optimizing RSI periods, combining with moving averages, setting proper stop loss, etc.

## Optimization Directions

Some ways to further optimize the strategy:

1. Optimize RSI parameters and bands to adapt to market conditions
2. Add moving average filter to avoid wrong signals from RSI lagging
3. Use price breakout for entry and RSI cross for confirmation 
4. Incorporate trend reversal detection for two-way trading
5. Enhance stop loss like averaging down positions, trailing stop loss
6. Combine trading volume to strengthen trend judgment 
7. Introduce machine learning models for dynamic RSI parameter optimization

## Conclusion

The strategy builds a simple trend following system with configurable RSI technical indicator. The logic is clear and easy to understand, parameters adjustable based on needs. But there are some risks to be aware of. Huge room for optimizations by combining with other indicators or introducing new techniques like machine learning. Overall it provides an efficient and flexible approach to quantitative trading and is worth further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|RSI lower band|
|v_input_2|55|RSI middle band|
|v_input_3|60|RSI middle high|
|v_input_4|70|RSI high|
|v_input_5|75|RSI top|
|v_input_6|14|RSI period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version= 4
// https://sauciusfinance.altervista.org, another trading idea, suggested by the fact that RSI tends to accompany the trend
strategy(title="Pure RSI long only", overlay = true, max_bars_back=500)


// INPUTS 
rsi_low = input(30, title ="RSI lower band",  minval=5, step = 1)
rsi_middle = input(55, title ="RSI middle band",  minval=10, step = 1)
rsi_mhigh = input(60, title ="RSI middle high",  minval=20, step = 1)
rsi_high = input(70, title ="RSI high",  minval=30, step = 1)
rsi_top = input(75, title ="RSI top",  minval=30, step = 1)
rsi_period = input(14, title="RSI period", minval = 1, step = 1) 
// CALCULATIONS
myrsi = rsi(close, rsi_period)

/// Entry: when RSI rises from the bottom or, after a retracement, it overcomes again the middle level of 50 
strategy.entry("Long", true, when = crossover(myrsi,rsi_low))
strategy.entry("Long", true, when = crossover(myrsi,rsi_middle))

/// EXITS: when RSI crosses under the initial bottom level (stop loss) or undergoes one of the next 3 steps : 50, 60, 70 or it's simply
// higher than 70
// you may test viceversa for short, adding level of 40

strategy.close("Long", when = crossunder(myrsi, rsi_low), comment="low")
strategy.close("Long", when = crossunder(myrsi, rsi_middle), comment="middle")
strategy.close("Long", when = crossunder(myrsi, rsi_mhigh), comment="middle-hi")
strategy.close("Long", when = crossunder(myrsi, rsi_high), comment="high")
strategy.close("Long", when = (myrsi>rsi_top), comment="top")

plotchar(myrsi, title = "myrsi", char='+', color=color.black)
// CONCLUSION: this system give notable results related to  MA & RSI trading system and it's a good alternative. The best is making
// roboadvisoring by working this two system togheter, i.e. watching both MA and levels of RSI together (you may also enter if RSI
// crosses over 30 and then wait for a confirm in MA)

```

> Detail

https://www.fmz.com/strategy/428577

> Last Modified

2023-10-07 10:02:21
