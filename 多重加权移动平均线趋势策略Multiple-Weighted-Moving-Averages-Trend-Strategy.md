
> Name

多重加权移动平均线趋势策略Multiple-Weighted-Moving-Averages-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17fd406fa79c4e8c883.png)


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
