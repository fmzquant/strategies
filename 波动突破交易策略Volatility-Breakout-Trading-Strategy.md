
> Name

波动突破交易策略Volatility-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/197c44bc52a0e2761ab.png)

## Overview

The Volatility Breakout Trading Strategy is a single price action based strategy. It generates buy and sell signals by analyzing price and volume changes. This strategy can also be combined with alerts to trigger orders on other exchanges or systems. 

## Strategy Logic

This strategy analyzes the close, open, high and low prices of candlesticks to determine price trends and momentum. 

Specifically, it checks if the closing prices of the most recent 3 candlesticks are continuously higher or lower than the opening prices. If so, it indicates prices are breaking out up or down consecutively, generating a trending market.

In addition, this strategy tracks the maximum volume over a certain period. If the current candlestick's volume exceeds the maximum value over the recent period, it suggests surging trading volume and strong forces entering the market.

When price breaks out on three consecutive candlesticks and trading volume expands, the strategy will produce buy or sell signals.

## Advantages

This is a simple yet effective strategy utilizing price action and volume signals. The main advantages are:

1. Clear logic, easy to understand and implement
2. Highly sensitive to volatile market changes, catching shifts timely  
3. Requires only basic candlestick and volume data, no complex algorithms
4. Flexible parameters adaptable to different products and timeframes 
5. Low cost, suitable for small account investors

## Risk Analysis   

There are also some potential risks:

1. No price forecasting, some blindness exists
2. Prone to false signals from accidental touches
3. May generate improper signals in range-bound markets
4. No stop loss mechanism, risks expanding losses

To mitigate these risks, one may consider adding moving stop loss, optimizing parameter combinations, or combining with other indicators or strategies.

## Optimization Directions

As a basic strategy, there is still large room for optimization:  

1. Add stop loss mechanisms to control losses
2. Optimize parameters to suit more products and periods
3. Add other indicators to filter signals
4. Combine with trend tracking strategies for automatic trend adjustment
5. Incorporate machine learning algorithms for dynamic parameter and signal optimization
6. Build in quantitative research and feedback modules for continuous evolution  

## Conclusion

In conclusion, this is a very practical price action based strategy. It has the merits of being intuitive, easy to understand and implement at low costs. Meanwhile, it also has certain blindness and needs further optimizations and combinations for enhanced performance. Overall this is a valuable strategy concept worthy of in-depth research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Volume length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-03-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SPAS", overlay=true, pyramiding=5, calc_on_order_fills=true)

int signal_hh = 0
int signal_ll = 0

if close[1] >= open[1] and close[2] >= open[2] and close[3] >= open[3]
    signal_hh := 1

if close[1] <= open[1] and close[2] <= open[2] and close[3] <= open[3]
    signal_ll := 1

plotchar(signal_hh, char='H', size=size.tiny, location=location.abovebar)
plotchar(signal_ll, char='L', size=size.tiny, location=location.abovebar)

int signal_vol = 0
float max_volume = 0.0
int vol_length = input(title="Volume length", type=input.integer, defval=3)

for i = vol_length to 1
    if volume[i] > max_volume
        max_volume := volume[i]

if volume[0] > max_volume
    signal_vol := 1

plotchar(signal_vol, char='V', size=size.tiny, location=location.bottom)

int signal_buy = 0
int signal_sell = 0

if signal_hh and signal_vol
    signal_buy := 1
    label.new(bar_index, high, "B", color=color.green)
    strategy.entry("buy", strategy.long, 5)//, when=strategy.position_size <= 0)

if signal_ll and signal_vol
    signal_sell := 1
    label.new(bar_index, low, "S", color=color.red)
    strategy.entry("sell", strategy.short, 5)//, when=strategy.position_size > 0)

//plotchar(signal_buy, char='B', color=color.green, size=size.tiny, location=location.abovebar)
plotarrow(signal_buy, colorup=color.green, colordown=color.orange, transp=0, maxheight=20)

//plotchar(signal_sell, char='S', color=color.red, size=size.tiny, location=location.abovebar)
plotarrow(signal_sell * -1, colorup=color.green, colordown=color.orange, transp=0, maxheight=20)


```

> Detail

https://www.fmz.com/strategy/434975

> Last Modified

2023-12-11 14:20:48
