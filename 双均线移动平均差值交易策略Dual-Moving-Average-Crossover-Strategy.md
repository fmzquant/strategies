
> Name

双均线移动平均差值交易策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/151a908ab9dc1a6a980.png)

[trans]


## 概述

这个策略基于双均线的移动平均线差值来产生交易信号。它计算快速周期和慢速周期两条均线,当快线从下方向上突破慢线时,产生买入信号;当快线从上方向下跌破慢线时,产生卖出信号。

## 原理解析

该策略的核心逻辑是计算两条移动平均线SMA(len1)和SMA(len2),以及它们的差值dif。其中len1代表短期均线周期,len2代表长期均线周期。短期均线能更快地响应价格变化,长期均线更能反映长期趋势。

当短期均线从下方上穿长期均线时,表示短期价格开始上涨超过长期趋势,可以买入;当从上方下穿长期均线时,表示短期价格开始下跌低于长期趋势,可以卖出。

为了过滤误操作,策略还引入out3作为交易信号线。out3是短期均线与价格中值的差值sma平滑处理后的结果。仅仅当out3穿越dif时才产生交易信号。

具体来说,long变量在out3向上穿越dif时为正值,作为买入信号;short变量在out3向下穿越dif时为负值,作为卖出信号。strategy.entry根据long信号产生买入订单,strategy.close根据short信号产生卖出平仓订单。

## 优势分析

这是一个非常简单直观的跟踪趋势的策略。它采用双均线周期不同造成均线交叉的方式来捕捉趋势转换点,可以比单均线系统更可靠。并且引入交易信号线的过滤可以一定程度上避免震荡市场中产生的假信号。

相比于移动止损等方式,它采用趋势跟踪理念,可以最大程度获利,在趋势longer的时候不会被止损出场。同时它也会控制亏损,在趋势反转的时候及时平仓。

该策略参数较少,容易掌握和调整,适合作为初学者学习算法交易的入门策略。

## 风险及改进

该策略最大的风险在于双均线的周期参数不当而造成交易信号错误。如果短期均线周期len1过长,将错过趋势开始阶段的机会;如果过短则会增加假信号的概率。长期均线len2如果过长,将延迟做出仓位调整;如果过短则容易被市场震荡干扰。

可以通过调整len1和len2的参数来获得最佳组合,也可以尝试引入自适应均线来动态调整周期。此外也可以通过优化过滤器参数来减少假信号。

趋势跟踪策略还需要注意控制单笔亏损大小,可以设置止损点或引入仓位管理来优化。

## 总结

双均线差值策略是一个非常典型的趋势跟踪策略代表。它简单的双均线交叉系统带来稳定的信号源,配合过滤器可以有效避免被市场震荡干扰。通过优化均线周期参数可以获得较好的策略表现。这个策略非常适合作为算法交易的入门策略来学习。

||


## Overview

This strategy generates trading signals based on the difference between two moving averages with different timeframes. It calculates a faster SMA and a slower SMA, and produces buy signals when the fast SMA crosses above the slow SMA from below, and sell signals when the fast SMA crosses below the slow SMA from above.

## How It Works 

The core logic of this strategy is to compute two moving averages, SMA(len1) and SMA(len2), and their difference dif. Here len1 represents the period of the faster MA and len2 the slower MA. The faster MA responds quicker to price changes while the slower MA reflects the long term trend better.

When the faster MA crosses above the slower MA from below, it indicates the short term price has started to rise above the long term trend, and thus a long entry can be taken. When the faster MA crosses below the slower MA from above, it signals the short term price has started to fall below the trend, and a short position can be entered.

To filter out false signals, the strategy also uses out3 as the trading signal line, which is the smoothed difference between the faster MA and price midpoint. Only when out3 crosses dif will trades be triggered. 

Specifically, the long variable holds positive values when out3 crosses above dif, giving buy signals. The short variable holds negative values when out3 crosses below dif, generating sell signals. strategy.entry entries long when long signal occurs, and strategy.close closes long when short signal emerges.

## Advantage Analysis

This is a very simple and intuitive strategy to follow trends. It uses the crossover of two MAs of different periods to identify trend reversal points, which can be more reliable than a single MA system. The filter of trading signal line also helps avoid false signals in choppy markets to some extent.

Compared to stop loss, it adopts a trend following mindset to maximize profits during longer trends without being stopped out. At the same time, it also controls losses by closing positions in time when trend reverses.

This strategy has few parameters and is easy to understand and tune, making it suitable as a beginner's algo trading strategy.

## Risks and Improvements

The biggest risk of this strategy is improperly chosen MA periods resulting in bad signals. If len1 is too long, early trend moves will be missed; if too short, whipsaws increase. If len2 is too long, position adjustments will be delayed; if too short, it may be disturbed by market noise.

The parameters can be optimized by trying different len1 and len2 values to find the best combination. Adaptive MAs can also be tested to dynamically change periods. The filter can also be improved to further reduce false signals.

Trend following strategies should also control loss on single trades, through stop loss or position sizing. 

## Conclusion

The dual MA crossover strategy is a quintessential trend following representative. Its simple dual MA crossover system provides steady signals, while the filter helps avoid noise. With optimized MA periods, it can achieve good performance. The strategy serves well as a beginner's algo trading strategy to learn.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Length1|
|v_input_2|100|Length2|
|v_input_3|true|Smoothing|
|v_input_4_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//by afrazium
//@version=3
strategy(title="SMA Diff strat", shorttitle="SMAD STR", overlay=false, initial_capital=1, precision=8, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, calc_on_order_fills= false, calc_on_every_tick=false, pyramiding=0)
len1 = input(50, minval=1, title="Length1"), len2 = input(100, minval=1, title="Length2"), smo = input(1, minval=1, title="Smoothing")
src = input(ohlc4, title="Source")

mid = src
expr1 = sma(src, len1), expr2 = sma(src, len2)
dif = (expr1 - expr2), out1 = (mid - expr1), out2 = (mid - expr2), out3 = sma(out1, smo)

long = crossover(out3, dif) ? out3 : na, short = crossunder(out3, dif) ? out3 : na

plot(out3, color=black, linewidth=2), hline(0)
clr = out2 >= out1 ? lime : red, plot(dif, color=clr, linewidth=2)
plot(long, title = 'Crossover', color = green, style = circles, linewidth=4), plot(short, title = 'Crossunder', color = red, style = circles, linewidth=4)

strategy.entry("buy", strategy.long, when=crossover(out1, dif))
strategy.close("buy", when=crossunder(out1, dif))

//plot(out2, color=blue, linewidth=2)
//A = plot(mid/10, color=red, linewidth=1, transp=100), B = plot(mid/20, color=red, linewidth=1, transp=100)
//C = plot(-mid/10, color=green, linewidth=1, transp=100), D = plot(-mid/20, color=green, linewidth=1, transp=100)
//fill(A, B, color=red), fill(C, D, color=green)


```

> Detail

https://www.fmz.com/strategy/429464

> Last Modified

2023-10-17 13:54:05
