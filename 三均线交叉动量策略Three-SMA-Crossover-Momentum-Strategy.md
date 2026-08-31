
> Name

三均线交叉动量策略Three-SMA-Crossover-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1409ce1608b12ef217c.png)

## Overview

The Three SMA Crossover Momentum strategy is a typical technical indicator strategy that tracks market trends. It combines 16-, 36- and 72-period simple moving averages and uses their bullish and bearish crossovers to determine market trends, together with the Kaufman Adaptive Moving Average (KAMA) as a filter to take long or short positions when the trend direction is relatively clear.  

## Strategy Logic  

The core indicators of this strategy are the 16-, 36-, and 72-period simple moving averages. When the shorter-period SMA crosses over the longer-period one upwards, it signals that the market is entering an uptrend. When the shorter-period SMA crosses below the longer-period one downwards, it signals that the market is entering a downtrend. For example, when the 16-SMA crosses over the 36-SMA and 72-SMA, it is a bullish signal. And when the 16-SMA crosses below the 36-SMA and 72-SMA, it is a bearish signal.

The Kaufman Adaptive Moving Average (KAMA) serves as a filter to avoid wrong signals when the trend is unclear. The SMA crossover signals are only triggered when KAMA is in a non-accelerating or non-decelerating mode (linear phase).   

The strategy tracks the SMA crossover situations to take long or short positions when the trend is relatively clear. The long condition is 16-SMA crossing over 36-SMA and 72-SMA with linear KAMA. The short condition is 16-SMA crossing below 36-SMA and 72-SMA with linear KAMA.

## Advantage Analysis   

The advantages of this strategy are:

1. Combining multi-period SMAs can effectively track medium- and long-term market trends  
2. Introducing adaptive moving average as a filter can reduce wrong signals when the trend is unclear
3. Simple to implement, suitable for automated or program trading

## Risk Analysis   

There are also some risks with this strategy:  

1. Frequent ineffective signals may occur in ranging markets due to frequent SMA crossovers  
2. No stop loss is set, losses may expand
3. Designed for high volatile crypto markets, may underperform in less volatile markets

The risks could be reduced by tuning SMA parameters, setting stop loss constraints, or only applying to highly volatile markets.

## Optimization Directions

The strategy can be optimized in the following ways:

1. Test different combinations of SMA parameters to find the optimal
2. Add trading volume or volatility indicators as supplementary filter conditions  
3. Set up stop loss mechanisms 
4. Combine other indicators to determine entry timing  
5. Optimize position sizing, adjust risks through gradual adding and reducing positions  

## Conclusion  

The Three SMA Crossover Momentum strategy is a rather classic and practical trend-following strategy overall. It judges medium- and long-term market trends effectively through multi-period SMA crossovers and filters out some noise. It can serve as one of the timing reference indicators for positional trading. But this strategy also has some weaknesses, requiring further enhancements and optimizations to stand in more diverse markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_4|100|  Trend SMA |
|v_input_int_5|50|   KAMA Lenght|
|v_input_bool_1|true|  Self Powered|
|v_input_int_1|16|(?SMA)  1-SMA Lenght|
|v_input_int_2|36|  2-SMA Lenght|
|v_input_int_3|72|  3-SMA Lenght|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wielkieef


//@version=5
strategy(title='Three SMA-crossover strategy [30min] ', overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.cash, default_qty_value=10000, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.03)

src = close

Length1 = input.int(16, title='  1-SMA Lenght', minval=1, group='SMA')
Length2 = input.int(36, title='  2-SMA Lenght', minval=1, group='SMA')
Length3 = input.int(72, title='  3-SMA Lenght', minval=1, group='SMA')
SMA1 = ta.sma(close, Length1)
SMA2 = ta.sma(close, Length2)
SMA3 = ta.sma(close, Length3)

Long_ma = SMA1 > SMA2 and SMA2 > SMA3
Short_ma = SMA1 < SMA2 and SMA2 < SMA3

LengthMainSMA = input.int(100, title='  Trend SMA ', minval=1)

SMAas = ta.sma(src, LengthMainSMA)

//  Powered Kaufman Adaptive Moving Average by alexgrover (modificated by Wielkieef)
lengthas = input.int(50, title='   KAMA Lenght')
sp = input.bool(true, title='  Self Powered')

er = math.abs(ta.change(close, lengthas)) / math.sum(math.abs(ta.change(close)), lengthas)
pow = sp ? 1 / er : 2
per = math.pow(math.abs(ta.change(close, lengthas)) / math.sum(math.abs(ta.change(close)), lengthas), pow)
a = 0.
a := per * src + (1 - per) * nz(a[1], src)
mad4h = 0.
a_f = a / a[1] > .999 and a / a[1] < 1.001

///.

Bar_color = close > SMAas ? color.green : Long_ma ? color.blue : Short_ma ? color.maroon : color.gray

barcolor(color=Bar_color)

long_cond = Long_ma and SMAas < close and not a_f and close > a

short_cond = Short_ma and SMAas > close and not a_f and close < a
  
long_stop = Short_ma and SMAas < close

short_stop = Long_ma and SMAas > close

SMA1plot = plot(SMA1, color=Bar_color, linewidth=2)
SMA2plot = plot(SMA2, color=Bar_color, linewidth=4)
SMA3plot = plot(SMA3, color=Bar_color, linewidth=2)

fill(SMA1plot,SMA3plot,title="RANGE " ,color = color.new(Bar_color, 50))



if  long_cond
    strategy.entry('Long', strategy.long)

if  short_cond
    strategy.entry('Short', strategy.short)

strategy.close_all(when=long_stop or short_stop)



//by wielkieef
```

> Detail

https://www.fmz.com/strategy/436491

> Last Modified

2023-12-25 12:06:36
