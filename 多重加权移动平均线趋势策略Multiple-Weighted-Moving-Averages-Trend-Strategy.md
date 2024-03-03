
> Name

多重加权移动平均线趋势策略Multiple-Weighted-Moving-Averages-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17fd406fa79c4e8c883.png)

[trans]

## 概述

多重加权移动平均线趋势策略是一种基于多重加权移动平均线(WMA)指标的短线交易策略。它通过计算不同周期的WMA并监测它们之间的交叉来判断市场趋势,在趋势发生反转时及时入场。该策略操作EUR/CHF货币对的3分钟K线。

## 策略原理  

该策略同时运用5条不同长度周期的WMA指标,包括1日线、2日线、3日线、5日线和29日线。根据这几条移动平均线之间的多空排列关系判断当前趋势方向。当较长周期的移动平均线(如29日线)位于较短周期的移动平均线(如1日线)之上时,说明目前处于多头趋势;反之,当较长周期的移动平均线位于较短周期线下方时,则表明目前处于空头趋势。  

在具体的交易策略中,如果所有移动平均线由上往下排列,即29日线在上,5日线在29日线下方,3日线在5日线下方,2日线在3日线下方,1日线在2日线下方,那么这表明目前处于空头趋势,应该考虑做空;相反,如果所有移动平均线由下往上排列,即1日线在上,2日线在1日线下方,3日线在2日线下方,5日线在3日线下方,29日线在5日线下方,那么这说明目前处于多头趋势,应该考虑做多。通过抓住短期内趋势发生反转的时机进行交易。

## 策略优势

这种多重WMA趋势策略最大的优势在于能够准确判断短期内的趋势转折点。与单一移动平均线相比,多重WMA策略结合多个周期判断趋势,可以有效过滤假突破,避免在市场仅仅是短期调整而退出 rng 之类的错误交易。同时,不同周期线的交叉也可以形成较强的趋势信号。相比其他复杂指标,WMA指标计算简单,对计算机要求不高,实际运用中效果也较好。

## 策略风险 

该策略主要面临两方面的风险:第一是趋势判断失误风险。在某些情况下,短期内移动平均线交叉并不一定代表真正趋势转折,可能只是短期调整,这时就容易造成交易决策失误。第二个风险是止损位置设置不合理。移动平均线策略经常要求设置较大的止损,如果止损过小则很容易就被止损出场,无法持久捕捉趋势。为控制这两个风险,我们可以适当调整移动平均线周期,优化止损位置,并结合其他指标进行确认。

## 策略优化

该策略可以从以下几个方面进行优化:第一,优化移动平均线周期参数,调整周期参数能够适应更广泛的市场情况;第二,加入其他指标进行组合,与MACD、RSI等指标组合使用可以提高信号质量;第三,优化止损策略,通过追踪止损、平均止损等方式最大限度保护利润;第四,进行参数组合测试,找出最优参数以提升绩效。通过多方面综合优化,可以全面提高策略稳定性。

## 总结  

该策略利用多重加权移动平均线指标判断短期趋势转折,抓住反转机会进行交易。它判断准确,使用简单,适合短线操作。我们通过对参数、止损、信号进行优化,可以有效控制交易风险,提高策略效果。总的来说,该策略具有很好的实盘运用价值。

||

## Overview

The multiple weighted moving averages trend strategy is a short-term trading strategy based on multiple weighted moving average (WMA) indicators. It judges market trends by calculating WMAs of different periods and monitoring crossovers between them, entering positions when trend reversals occur. The strategy trades the EUR/CHF currency pair on 3-minute charts.  

## Strategy Logic

The strategy uses 5 WMAs of different period lengths simultaneously, including 1-day, 2-day, 3-day, 5-day and 29-day WMAs. It determines current trend direction according to the long/short arrangement relationships between these moving averages. When longer period moving averages (such as 29-day MA) are above shorter period ones (such as 1-day MA), it indicates an upward trend; conversely, when longer period MAs are below shorter ones, it signals a downward trend.

In actual trading, if all MAs are arranged from top to bottom - 29-day MA at the top, 5-day MA below 29-day MA, 3-day MA below 5-day MA, 2-day MA below 3-day MA, and 1-day MA at the bottom, it means a downward trend and short positions should be considered. On the contrary, if MAs are arranged from bottom to top - 1-day MA at the top and 29-day MA at the bottom, it suggests an upward trend and long positions are warranted. Trades are executed by capturing trend reversal timing in the short run.  

## Advantage Analysis  

The biggest advantage of this multi-WMA trend strategy lies in its accuracy of capturing short-term trend turning points. Compared to single MA strategies, the multi-WMA approach combines multiple periods to determine trends, which can effectively filter false breakouts and avoid premature exits due to short-term market corrections. In addition, crosses between different period MAs can form rather strong trend signals. As opposed to other complex indicators, the WMA is simple to calculate and less demanding on computing power, yet very effective in practical use.

## Risk Analysis

The strategy faces two main risks: first, the risk of trend misjudgment. In some cases, MA crosses in the short run may not represent real trend reversals but merely temporary corrections, which can lead to wrong trading decisions. Second, unreasonable stop-loss setting. Moving average strategies often require relatively wide stop-loss ranges. If stops are too tight, positions may get frequently stopped out, unable to sustain the trend. To control the risks, we can optimize MA periods, stop-loss levels, and combine other indicators for confirmation.  

## Optimization

Several aspects of the strategy can be optimized: first, optimize MA period parameters to adapt to more market conditions; second, combine with other indicators like MACD and RSI to improve signal quality; third, adopt better stop-loss techniques like trailing stop and average stop to maximize profit protection; fourth, test parameter combinations to find optimal settings and improve performance. Comprehensive optimization across different dimensions can greatly improve strategy robustness.  

## Conclusion  

The strategy identifies short-term trend turning points using multiple weighted moving averages and trades the reversals. With accurate judgments, ease of use, and suitability for short-term trading, by optimizing parameters, stops, and signals, we can effectively control trading risks and improve strategy efficacy. Overall, the strategy has great practical value for live trading.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2023-12-19 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © kingseif

//@version=5
strategy(title="EURCHF Scalp 3 minutes", overlay=true)

// Moving Averages
len1 = 29
len2 = 5
len3 = 3
len4 = 2
len5 = 1
src = close

wma1 = ta.wma(src, len1)
wma2 = ta.wma(src, len2)
wma3 = ta.wma(src, len3)
wma4 = ta.wma(src, len4)
wma5 = ta.wma(src, len5)

// Strategy
wma_signal = wma1 > wma2 and wma2 > wma3 and wma3 > wma4 and wma4 > wma5
wma_sell_signal = wma1 < wma2 and wma2 < wma3 and wma3 < wma4 and wma4 < wma5

// Position Management
risk = 1.00
stop_loss = 0
take_profit = 0

// Long Position
if wma_signal
    strategy.entry("Buy", strategy.long)
    
    if stop_loss > 0
        strategy.exit("Sell", from_entry="Buy", loss=stop_loss)
    
    if take_profit > 0
        strategy.exit("Sell", from_entry="Buy", profit=take_profit)

// Short Position
if wma_sell_signal
    strategy.entry("Sell", strategy.short)
    
    if stop_loss > 0
        strategy.exit("Cover", from_entry="Sell", loss=stop_loss)
    
    if take_profit > 0
        strategy.exit("Cover", from_entry="Sell", profit=take_profit)

```

> Detail

https://www.fmz.com/strategy/435986

> Last Modified

2023-12-20 15:59:56
