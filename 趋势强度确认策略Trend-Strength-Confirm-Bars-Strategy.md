
> Name

趋势强度确认策略Trend-Strength-Confirm-Bars-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f71003009473fb8ebf.png)

Overview:
This strategy judges the trend direction based on the closing price direction of consecutive N candlesticks. Trading signals are generated when the closing prices of N consecutive candlesticks meet the condition. The size of N is set by the confirmBars input parameter. This strategy mainly utilizes the direction of consecutive N candlestick closing prices to determine the strength of the trend. Larger N requires more candlesticks to confirm the trend, which can filter out false breakouts but may also miss the early stage of trends.

Principle:  
The strategy tracks the relationship between the closing prices of the last candlestick and the previous one to judge the strength of price rises and falls. Specifically, it defines two variables bcount and scount to record the number of consecutive candlestick closing prices that rise and fall.  

When bcount reaches the value set by confirmBars, it means that the closing prices of confirmBars consecutive candlesticks have risen, generating a buy signal. When scount reaches the value set by confirmBars, it means that the closing prices of confirmBars consecutive candlesticks have fallen, generating a sell signal.  

By judging the direction of the closing prices of consecutive multiple candlesticks, short-term market fluctuations can be effectively filtered out, and trading signals are only generated under trends of relatively large strength.

Advantage Analysis:
1. Effectively filter out noise and confirm trends  
This strategy requires consecutive N candlesticks closing prices to meet the conditions before generating trading signals. This filters out the impact of normal market fluctuations on trading and ensures that positions are opened only under strong trends.  

2. Adjustable filtering strength parameters
By adjusting the size of the confirmBars parameter, the strength of filtering price fluctuations can be controlled. Larger parameters have better filtering effects on noise, but may also miss early trend opportunities.

Risk Analysis:  
1. May miss early trend opportunities
The strategy requires multiple consecutive candlesticks closing prices to meet conditions before generating signals, so it often misses early trend opportunities and cannot track trends in a timely manner.  

2. Prone to stop loss breakout
When the number of confirmations confirmBars is set too large, it is easy to be misled by reverse short-term lines in the early stage of the trend, resulting in stop loss breakouts.

Optimization Directions:
1. Filter fake breakouts with other indicators  
Other technical indicators such as Bollinger Bands and RSI can be used to perform secondary filtering on buy and sell signals to reduce the possibility of fake breakouts.  

2. Dynamically adjust parameters
Try to dynamically adjust the confirmBars parameter based on market conditions. Increase the parameter value in volatile markets to filter out noise; decrease the parameter value when the trend is obvious to track the trend.

Summary:  
This strategy achieves the effect of filtering shocks and confirming trends by judging the direction of closing prices of multiple consecutive candlesticks. It can effectively reduce erroneous trades caused by short-term market fluctuations and only generate trading signals when trends are obvious. By adjusting the size of the confirmBars parameter, users can balance the relationship between filtering effects and capturing trend opportunities. However, this strategy is prone to being stopped out early in trend initiation and fails to continuously track trends. It is recommended to optimize with other indicators or try dynamic parameter adjustment to pursue better returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|confirmBars|
|v_input_int_1|2019|Backtest Start Year|
|v_input_int_2|true|Backtest Start Month|
|v_input_int_3|true|Backtest Start Day|
|v_input_int_4|2023|Backtest End Year|
|v_input_int_5|12|Backtest End Month|
|v_input_int_6|31|Backtest End Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Confirm Bars Strategy [TS Trader]", overlay=true)

confirmBars = input(1)

// === INPUT BACKTEST RANGE ===
fromYear = input.int(2019, title="Backtest Start Year")
fromMonth = input.int(1, title="Backtest Start Month", minval=1, maxval=12)
fromDay = input.int(1, title="Backtest Start Day", minval=1, maxval=31)
toYear = input.int(2023, title="Backtest End Year")
toMonth = input.int(12, title="Backtest End Month", minval=1, maxval=12)
toDay = input.int(31, title="Backtest End Day", minval=1, maxval=31)

startTimestamp = timestamp(fromYear, fromMonth, fromDay, 00, 00)
endTimestamp = timestamp(toYear, toMonth, toDay, 23, 59)

inBacktestRange = true

// === STRATEGY LOGIC ===
bcount = 0
bcount := close[1] < close ? nz(bcount[1]) + 1 : 0
if (bcount == confirmBars and inBacktestRange)
    strategy.entry("Buy", strategy.long, comment="Long")

scount = 0
scount := close[1] > close ? nz(scount[1]) + 1 : 0
if (scount == confirmBars and inBacktestRange)
    strategy.entry("Sell", strategy.short, comment="Short")
```

> Detail

https://www.fmz.com/strategy/438946

> Last Modified

2024-01-16 15:22:53
