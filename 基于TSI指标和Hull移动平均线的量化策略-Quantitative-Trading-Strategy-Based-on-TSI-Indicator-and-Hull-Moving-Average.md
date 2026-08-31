
> Name

基于TSI指标和Hull移动平均线的量化策略-Quantitative-Trading-Strategy-Based-on-TSI-Indicator-and-Hull-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ae30f87a9eff12bb56.png)


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
