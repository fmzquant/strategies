
> Name

趋势强度确认策略Trend-Strength-Confirm-Bars-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f71003009473fb8ebf.png)
[trans]
概述:
该策略通过连续N根K线收盘价的方向判断趋势方向,当连续N根K线收盘价符合条件时产生交易信号。其中N的大小由confirmBars输入参数设定。该策略主要利用连续N根K线收盘价的方向判定趋势的力度,N越大表示需要更多K线确认趋势,可过滤假突破情况,但同时也可能错过趋势初期。

原理:
策略通过跟踪最后一根K线与前一根K线的收盘价大小关系,判断价格上涨或下跌的力度。具体来说,它定义了两个变量bcount和scount,分别记录连续收盘价上涨和连续收盘价下跌的根数。

当bcount达到confirmBars设置的数值时,表示连续confirmBars根K线收盘价上涨,产生买入信号。当scount达到confirmBars设置的数值时,表示连续confirmBars根K线收盘价下跌,产生卖出信号。

这样通过判断连续若干根K线的收盘价方向,可有效过滤短期市场波动的噪音,只在较大力度的趋势下产生交易信号。

优势分析:
1. 可有效过滤噪音,确认趋势
该策略要求连续N根K线收盘价符合条件时才产生交易信号,可过滤正常市场波动对交易的影响,确保只在较强势的趋势下打开仓位。

2. 参数可调节过滤力度
通过调整confirmBars的参数大小,可控制对价格波动的过滤力度。参数越大,对噪音的过滤效果越好,但也容易错过趋势的初期机会。

风险分析:
1. 可能错过趋势初期机会 
策略要求连续多根K线收盘价符合才产生信号,因此常常会错过趋势的初期机会,无法及时追踪趋势。

2. 容易突破止损
当确认根数confirmBars设置过大时,在趋势前期容易被反向短线误导,导致止损被突破退出。

优化方向:
1. 结合其他指标过滤假突破
可结合其他技术指标,如布林带、RSI等对买卖信号进行二次过滤,减少被假突破的可能。

2. 动态调整参数
也可以尝试根据市场情况动态调整confirmBars参数,在震荡市场时增大参数值,过滤噪音;而在趋势明显时减小参数值,追踪趋势。

总结:
该策略通过判断连续若干根K线的收盘价方向,达到过滤震荡、确认趋势的效果。它可以有效地减少因短期市场波动所引发的错误交易,只在趋势明显时产生交易信号。通过调整confirmBars的参数大小,用户可以自行平衡过滤效果与捕捉趋势机会之间的关系。但该策略容易在趋势初期就被止损出场,无法持续跟踪趋势。建议结合其他指标进行优化,或尝试动态调整参数以追求更佳回报。

||

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

[/trans]

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
