
> Name

基于TSI指标和Hull移动平均线的量化策略-Quantitative-Trading-Strategy-Based-on-TSI-Indicator-and-Hull-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ae30f87a9eff12bb56.png)
[trans]

## 概述

本策略名为“基于TSI指标和Hull移动平均线的量化交易策略”,主要思想是结合TSI指标和Hull移动平均线来识别股票、数字货币或外汇中的趋势,并在趋势开始时产生交易信号。

## 策略原理  

该策略使用TSI指标判断价格趋势和动量。TSI指标基于价格变化率的双重平滑移动平均线。当TSI值上穿其自身的移动平均线时产生买入信号,下穿时产生卖出信号。

该策略还使用Hull移动平均线判断价格趋势。Hull移动平均线通过双重加权移动平均线构建,可有效过滤市场噪音。当快线上穿慢线时判断为上涨趋势,下穿时判断为下跌趋势。  

在TSI指标发出信号的同时,如果Hull移动平均线也确认了相同方向的趋势,则产生相应的交易信号。此外,策略还检查K线实体方向以确认趋势。只有当指标信号、Hull信号和K线实体方向一致时,才会发出交易信号。

## 优势分析

该策略结合了趋势、动量和平均线多种指标,可以有效识别市场趋势的开始,避免产生大量假信号。双重平滑移动平均线也可以过滤掉部分噪音。  

相比单一指标,该策略通过组合多个指标过滤信号,可以大大提高信号质量。多个确认条件也使得策略在产生信号时具有极强的确定性。

## 风险分析  

该策略虽然可以有效识别趋势开始,但是在市场震荡时会产生一定的错误信号和过度交易。此外,参数设置不当也可能导致不必要的平仓。

为降低风险,可以适当调整 Hull 移动平均线周期或 TSI 参数,也可以加入止损来控制损失。在优化过程中需要关注信噪比以获得最佳参数。

## 优化方向

该策略可以从以下几个方面进行优化:  

1. 优化Hull移动平均线参数,平滑曲线以过滤假信号  
2. 优化 TSI 参数,平衡灵敏度与稳定性
3. 加入止损策略控制损失  
4. 调整信号长度以过滤短期噪音  
5. 测试不同的策略品种与时间周期  
6. 结合其他指标进行信号验证

## 总结  

本策略结合 TSI 指标和 Hull 移动平均线,在确定市场趋势后产生交易信号。策略具有较高的定时性和信号质量。通过参数优化和策略组合,可以大幅提高盈利能力并降低风险。该策略适合识别中长线趋势,特别是在数字货币和外汇市场中具有广阔的应用前景。

||


## Overview  

This strategy is named "Quantitative Trading Strategy Based on TSI Indicator and Hull Moving Average". The main idea is to identify trends in stocks, cryptocurrencies or forex by combining the TSI indicator and Hull moving average, and generate trading signals when a trend starts.

## Strategy Logic  

The strategy uses the TSI indicator to determine price trends and momentum. The TSI indicator is based on double smoothed moving average of price change rate. It generates buy signals when the TSI value crosses above its moving average, and sell signals when crossing below.

The strategy also uses the Hull Moving Average to determine price trends. The Hull Moving Average is constructed with double weighted moving averages and can filter out market noise effectively. An uptrend is identified when the fast line crosses above the slow line, and a downtrend when crossing below.   

When the TSI indicator generates a signal, if the Hull Moving Average confirms the trend in the same direction, corresponding trading signals will be triggered. In addition, the strategy also checks the direction of candlestick bodies to confirm the trend. Signals are generated only when indicator signal, Hull signal and candlestick body direction all aligned consistently. 

## Advantage Analysis   

By combining indicators of trend, momentum and moving averages, this strategy can effectively identify the start of market trends and avoid excessive false signals. The double smoothed moving averages also filter out some noise.  

Compared to single indicator strategies, this strategy filters signals by combining multiple indicators, which can greatly improve the quality of signals. The multiple confirmation conditions also make the signals highly reliable when triggered.  

## Risk Analysis

Although this strategy can effectively identify trend starts, it may generate some false signals and over-trading during market consolidations. Inappropriate parameter settings can also cause unnecessary exits.  

To reduce risks, Hull period or TSI parameters can be adjusted accordingly. Stops can also be added to control losses. During optimizations, attention needs to be paid to ensure a high signal-to-noise ratio for best parameters.

## Optimization Directions  

The strategy can be optimized in the following aspects:

1. Optimize Hull Moving Average parameters to smooth curves and filter fake signals  
2. Optimize TSI parameters to balance sensitivity and stability  
3. Add stop loss strategies to control loss size
4. Adjust signal length to filter short-term noise
5. Test on different products and timeframes   
6. Incorporate other indicators for signal verification

## Conclusion   

This strategy combines the TSI indicator and Hull Moving Average to generate trading signals after confirming market trends. The strategy has high timing and signal quality. Through parameter optimization and strategy combination, profitability can be largely improved while lowering risks. The strategy is suitable for identifying medium-to-long term trends, and has promising application prospects especially in cryptocurrency and forex markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|TargetPoint in $|
|v_input_2|-2000|StopLoss in $|
|v_input_3|6|Signal Length|
|v_input_4|2|HullMA cross|
|v_input_5|2|VWMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("TSI/HullMA/VWMA strategy", shorttitle="TSI/HullMA/VWMA", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=420, default_qty_value=100, calc_on_order_fills=true, calc_on_every_tick=true, pyramiding=0)
TP = input(defval=200.00, title="TargetPoint in $", type=float, step=1)
SL = input(defval=-2000.00, title="StopLoss in $", type=float, step=1)
signal = input(title="Signal Length",  defval=6)
keh=input(title="HullMA cross",defval=2)
a=input(title="VWMA",defval=2)
long=35,short=35,linebuy=4,linesell=-4,ot=1,p=ohlc4[0]
double_smooth(src, long, short) =>
    fist_smooth = ema(src, long)
    ema(fist_smooth, short)
pc = change(p)
rvwma=vwma(p,round(a))
rvwma2=vwma(p,round(a*2))
n2ma=2*wma(p,round(keh/2))
nma=wma(p,keh)
diff=n2ma-nma
sqn=round(sqrt(keh))
n2ma1=2*wma(p[1],round(keh/2))
nma1=wma(p[1],keh)
diff1=n2ma1-nma1
sqn1=round(sqrt(keh))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
hullbuy=n1>n2 and n1>n2[1] and rvwma>rvwma2
hullsell=n1<n2 and n1<n2[1] and rvwma<rvwma2
candlebuy=ohlc4[0]>ohlc4[1] and ohlc4[0]>ohlc4[2] and ohlc4[0]>ohlc4[3]
candlesell=ohlc4[0]<ohlc4[1] and ohlc4[0]<ohlc4[2] and ohlc4[0]<ohlc4[3]
double_smoothed_pc = double_smooth(pc, long, short)
double_smoothed_abs_pc = double_smooth(abs(pc), long, short)
tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)
strategy.entry("buy", true, na, when = tsi_value>ema(tsi_value, signal) and candlebuy and hullbuy)
strategy.entry("sell", false, na, when = tsi_value<ema(tsi_value, signal) and candlesell and hullsell)
strategy.close_all(when = strategy.openprofit>TP or strategy.openprofit<SL)
```

> Detail

https://www.fmz.com/strategy/435758

> Last Modified

2023-12-18 16:56:22
