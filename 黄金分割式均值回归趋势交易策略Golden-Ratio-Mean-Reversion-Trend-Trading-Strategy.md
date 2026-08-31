
> Name

黄金分割式均值回归趋势交易策略Golden-Ratio-Mean-Reversion-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1498dc7ed0566b21594.png)

## Overview

The golden ratio mean reversion trend trading strategy identifies stronger trend directions using channel indicators and moving averages, and opens positions in the trend direction after prices pullback to a certain ratio. This strategy is suitable for markets with stronger trend characteristics and can perform well in trending markets.

## Strategy Logic  

The core indicators of this strategy include channel indicators, moving averages and pullback trigger lines. Specifically:

1. The channel indicator is calculated from highest high and lowest low to identify the price channel.
2. The moving average is used to determine the overall trend direction of prices.
3. The pullback trigger line then opens positions after prices bounce back from the channel boundary by a certain ratio.

When price touches the bottom of the channel, the strategy records the lowest point as a reference point and sets allow sell signal. When prices rise, once the rise reaches the pullback ratio, short positions will be opened around the rebound point.

Conversely, when price reaches the top of the channel, the strategy records the highest point as a reference point and sets allow buy signal. When prices fall, if the decline meets the pullback ratio requirement, long positions are opened around that point.

Therefore, the trading logic of this strategy is to track the price channel and intervene in the existing trend when reversal signals appear. This belongs to a common routine of mean reversion trend trading strategies.

## Advantage Analysis 

The main advantages of this strategy are:

1. It can perform well in strong trending markets.
2. The aggressiveness of entering trades can be adjusted through the pullback ratio parameter.  
3. Reasonable drawdown control can limit single trade loss.

Specifically, because the strategy mainly opens positions at trend reversal points, it works better in markets with larger price fluctuations and more obvious trends. In addition, adjusting the pullback ratio parameter can control the aggressiveness level of the strategy to follow trends. Finally, stop loss can control single trade loss very well.   

## Risk Analysis

The main risks of this strategy also include:  

1. The strategy is sensitive to the trend characteristics of the trading instruments.
2. Improper pullback ratio settings may lead to over-aggressiveness or over-conservativeness. 
3. Position holding time may be too long, overnight risk needs attention.

Specifically, if the trading instrument used in the strategy has weaker trend and smaller fluctuation, the performance may be compromised. In addition, too large or too small pullback ratio will affect strategy performance. Finally, as the position holding time span of the strategy may be longer, overnight risk control also needs attention.

To avoid the above risks, consider optimizing the following aspects:

1. Select trading instruments with more obvious trend characteristics.
2. Adjust the pullback ratio parameter to find the best parameter combination.
3. Set profit taking exits to reasonably control holding time.  

## Conclusion  

The golden ratio mean reversion trend trading strategy judges price trends and pullback signals through simple indicators, opens positions to track trends in strong markets, and belongs to a typical trend system. This strategy has large parameter tuning space, can adapt to more market environments through optimization, and the risk control is also reasonable. Therefore, it is a strategy idea worth verifying and improving in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Channel Period|
|v_input_2|0.5|Percent Pull Back Trigger|
|v_input_3|50|Trend MA Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-30 00:00:00
end: 2023-12-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//
// A port of the TradeStation EasyLanguage code for a mean-revision strategy described at
//     http://traders.com/Documentation/FEEDbk_docs/2017/01/TradersTips.html
//
// "In “Mean-Reversion Swing Trading,” which appeared in the December 2016 issue of STOCKS & COMMODITIES, author Ken Calhoun
//  describes a trading methodology where the trader attempts to enter an existing trend after there has been a pullback. 
//  He suggests looking for 50% pullbacks in strong trends and waiting for price to move back in the direction of the trend
//  before entering the trade."
//
//  See Also:
//    - 9 Mistakes Quants Make that Cause Backtests to Lie (https://blog.quantopian.com/9-mistakes-quants-make-that-cause-backtests-to-lie-by-tucker-balch-ph-d/)
//    - When Backtests Meet Reality (http://financial-hacker.com/Backtest.pdf)
//    - Why MT4 backtesting does not work (http://www.stevehopwoodforex.com/phpBB3/viewtopic.php?f=28&t=4020)
//
// 
// -----------------------------------------------------------------------------
// Copyright 2018 sherwind
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License can be found here
// <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//

strategy("Mean-Reversion Swing Trading Strategy v1", shorttitle="MRST Strategy v1", overlay=true)
channel_len  = input(defval=20, title="Channel Period", minval=1)
pullback_pct = input(defval=0.5, title="Percent Pull Back Trigger", minval=0.01, maxval=1, step=0.01)
trend_filter_len = input(defval=50, title="Trend MA Period", minval=1)


upper_band = highest(high, channel_len)
lower_band = lowest(low, channel_len)
trend      = sma(close, trend_filter_len)

low_ref  = 0.0
low_ref  :=  nz(low_ref[1])
high_ref = 0.0
high_ref := nz(high_ref[1])
long_ok  = false
long_ok  := nz(long_ok[1])
short_ok = false
short_ok := nz(short_ok[1])
long_ok2 = false
long_ok2  := nz(long_ok2[1])

if (low == lower_band)
    low_ref  := low
    long_ok  := false
    short_ok := true
    long_ok2 := false

if (high == upper_band)
    high_ref := high
    long_ok  := true
    short_ok := false
    long_ok2  := true

// Pull Back Level
trigger = long_ok2 ? high_ref - pullback_pct * (high_ref - low_ref) : low_ref + pullback_pct * (high_ref - low_ref)

plot(upper_band, title="Upper Band", color=long_ok2?green:red)
plot(lower_band, title="Lower Band", color=long_ok2?green:red)
plot(trigger, title="Trigger", color=purple)
plot(trend, title="Trend", color=orange)

enter_long = long_ok[1] and long_ok and crossover(close, trigger) and close > trend and strategy.position_size <= 0
enter_short = short_ok[1] and short_ok and crossunder(close, trigger) and close < trend and strategy.position_size >= 0

if (enter_long)
    long_ok := false
    strategy.entry("pullback-long", strategy.long, stop=close, comment="pullback-long")
else
    strategy.cancel("pullback-long")

if (enter_short)
	short_ok := false
    strategy.entry("pullback-short", strategy.short, stop=close, comment="pullback-short")
else
    strategy.cancel("pullback-short")

strategy.exit("exit-long", "pullback-long", limit=upper_band, stop=lower_band)
strategy.exit("exit-short", "pullback-short", limit=lower_band, stop=upper_band)

```

> Detail

https://www.fmz.com/strategy/434526

> Last Modified

2023-12-07 11:03:20
