
> Name

三重SMA自适应K线交叉长线策略Twisted-SMA-Adaptive-Crossover-Long-Line-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/914ad1a68606d9041f.png)
[trans]

## 概述

本策略通过组合使用3条不同周期的简单移动平均线(SMA)与Kaufman自适应移动平均线,形成长线入场信号。当短周期SMA上穿较长周期的SMA时产生买入信号。此外,策略还结合K线实体颜色判断主趋势,只在多头趋势中产生买入信号,避免假突破。

## 策略原理

本策略使用3条不同周期的SMA,包括SMA 4、SMA 9和SMA 18。这3条SMA的交叉组合是经典的判断趋势方向的技术指标。当SMA 4上穿SMA 9,并且SMA 9上穿SMA 18时,产生长线的买入信号。

为了过滤假突破,本策略还引入了Kaufman自适应移动平均线。只有当收盘价高于自适应移动平均线,即处于多头趋势时,SMA的金叉信号才生效启动长线。

此外,本策略还使用100周期的SMA判断主趋势。当价格上穿100周期SMA时,确认进入多头趋势。策略只在主多头趋势中产生买入信号。

综上,本策略的买入信号来自以下几部分的组合:
1. SMA 4上穿SMA 9,并且SMA 9上穿SMA 18,形成短周期SMA的金叉
2. 收盘价高于Kaufman自适应移动平均线,处于多头趋势
3. 价格上穿100周期SMA,确认主多头

当上述3个条件同时满足时,产生长线买入信号。

## 优势分析

本策略具有以下几点优势:

1. 使用3重SMA交叉判断趋势,可以有效过滤噪音,提高信号的可靠性
2. 引入自适应移动平均线,避免在无明确趋势时假突破
3. 结合主趋势判断,加大获利概率,避免在震荡行情中反复打开头寸
4. 长短周期SMA交叉,形成长线信号,利于抓取较大的趋势行情
5. 适用于高周期择时,如4小时或日线级别,信号更加可靠

## 风险分析

本策略也存在一些风险:

1. 长线策略,无法在短期内及时止损,存在一定回撤风险
2. 入场信号相对稀少,可能错过部分涨幅
3. 当短期、中期和长期趋势不一致时,会产生信号错误

可以通过以下方式优化:
1. 适当缩短中长期SMA的周期,增加入场机会
2. 加入其它辅助指标,如成交量指标,确认趋势的可靠性
3. 采取科学止损,合理控制回撤

## 优化方向  

本策略还有进一步优化的空间:

1. 可以测试更多组合的SMA周期,寻找最优参数
2. 可以加入成交量的确认,避免虚假突破
3. 可以添加波动率指标,在震荡加大的场景过滤入场
4. 可以引入机器学习算法,自适应寻找最优参数
5. 可以引入情绪指标,在市场恐慌或亢奋时避免建仓

## 总结

本策略通过多重SMA交叉形成长线信号,同时结合自适应移动平均线和主趋势判断,可在趋势行情中获取较大收益,具有稳定的逻辑和较强的实战效果。但也存在一定的风险,需要继续优化以降低回撤和提高胜率。本策略为长线持仓策略,适合有耐心和风险控制能力的投资者。

|| 

## Overview  

This strategy generates long-term entry signals by combining 3 simple moving averages (SMA) of different periods with the Kaufman adaptive moving average. It produces buy signals when the shorter period SMA crosses over the longer period SMAs. In addition, the strategy also incorporates candlestick color to determine the main trend, generating buy signals only during uptrends to avoid false breakouts.  

## Strategy Logic

The strategy utilizes 3 SMAs of different periods, including SMA 4, SMA 9, and SMA 18. The crossover combinations of these 3 SMAs are classic indicators for judging trend direction. When SMA 4 crosses over SMA 9, and SMA 9 crosses over SMA 18, it produces long entry signals.

To filter out false breakouts, the Kaufman adaptive moving average is also introduced. Only when the close price is higher than the adaptive moving average, i.e. in an uptrend, will the SMA golden cross signals take effect to trigger long positions.  

In addition, a 100-period SMA is used to determine the main trend. When prices cross above the 100-period SMA, it confirms that an uptrend has begun. The strategy only produces buy signals during main uptrends.

In summary, the long entry signals of this strategy come from the combination of:

1. SMA 4 crosses over SMA 9, and SMA 9 crosses over SMA 18, forming short-term SMA golden crosses

2. Close price is higher than the Kaufman adaptive moving average, in an uptrend  

3. Prices cross above the 100-period SMA, confirming a main uptrend

When all 3 conditions are met at the same time, long entry signals are generated.

## Advantage Analysis 

The main advantages of this strategy include:  

1. Using triple SMA crosses to determine trends can effectively filter out noise and increase signal reliability  

2. Introducing adaptive moving average avoids false breakouts when there is no clear trend

3. Incorporating main trend judgment increases profit probability by avoiding repeatedly opening positions during range-bound movements  

4. Long-term and short-term SMA crosses form long line signals, which captures big trending moves  

5. Suitable for high periodicity timing such as 4-hour or daily levels, with more reliable signals

## Risk Analysis

There are also some risks with this strategy:  

1. As a long-line strategy, unable to realize profits in a timely manner, with certain drawdown risks

2. Relatively few entry signals, may miss some run-ups

3. Conflicting short-term, medium-term and long-term trends may generate erroneous signals

The following optimization methods can be adopted:

1. Appropriately reduce medium and long term SMA periods to increase entry opportunities  

2. Add other auxiliary indicators like volume to confirm trend reliability   

3. Employ prudent stops to reasonably control drawdowns

## Optimization Directions

There is further room for optimizing this strategy:

1. Test more SMA combination periods to find optimum parameters  

2. Incorporate volume confirmation to avoid false breakouts 

3. Add volatility indicators to filter entries during violent swings

4. Introduce machine learning algorithms to adaptively identify optimal parameters  

5. Add sentiment indicators to avoid taking positions during market panic or euphoria

## Conclusion  

This strategy forms long-line signals through multiple SMA crosses, combined with adaptive moving averages and main trend determinations. It can capture significant profits during trending moves with stable logic and strong practical results. But there are also risks that need to be reduced through further optimizations. As a long-term position holding strategy, it suits investors with patience and risk control capabilities. 

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_4|100|  SMA Lenght|
|v_input_int_5|25|    Lenght|
|v_input_bool_1|true|  Self Powered|
|v_input_int_1|4|(?SMA)  1-SMA Lenght|
|v_input_int_2|9|  2-SMA Lenght|
|v_input_int_3|18|  3-SMA Lenght|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-17 00:00:00
end: 2023-11-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wielkieef


//@version=5
strategy(title='twisted SMA strategy [4h] ', overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.03)

src = close

Length1 = input.int(4, title='  1-SMA Lenght', minval=1, group='SMA')
Length2 = input.int(9, title='  2-SMA Lenght', minval=1, group='SMA')
Length3 = input.int(18, title='  3-SMA Lenght', minval=1, group='SMA')
SMA1 = ta.sma(close, Length1)
SMA2 = ta.sma(close, Length2)
SMA3 = ta.sma(close, Length3)

Long_ma = SMA1 > SMA2 and SMA2 > SMA3
Short_ma = SMA1 < SMA2 and SMA2 < SMA3

LengthMainSMA = input.int(100, title='  SMA Lenght', minval=1)

SMAas = ta.sma(src, LengthMainSMA)

//  Powered Kaufman Adaptive Moving Average by alexgrover (modificated by Wielkieef)
lengthas = input.int(25, title='    Lenght')
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

long_cond = Long_ma and SMAas < close and not a_f
  
long_stop = Short_ma 

if  long_cond
    strategy.entry('BUY', strategy.long)

strategy.close_all(when=long_stop)

//by wielkieef
```

> Detail

https://www.fmz.com/strategy/433101

> Last Modified

2023-11-24 14:26:37
