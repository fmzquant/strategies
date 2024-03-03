
> Name

RSI均线移动止损止盈策略RSI-Moving-Average-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略融合RSI指标和移动平均线,进行趋势判断和交易信号产生,并采用移动止损止盈方式来锁定利润和控制风险。属于典型的趋势跟踪交易策略。

策略原理:

1. 计算RSI指标,判断超买超卖情况。RSI高于50为多头信号。

2. 计算快慢移动平均线, golden cross 形态为多头信号。

3. RSI连续上涨也可作为追踪做多的交易信号。

4. 在入场后,设置移动止损线和止盈线。

5. 止损线固定跟踪价格下方,止盈线固定跟踪价格上方。

6. 价格触及止损止盈线则平仓。

该策略的优势:

1. RSI指标判断超买超卖,避免追高杀跌。

2. 移动平均线识别趋势方向。组合提高判断准确性。

3. 移动止损止盈方式,可根据实时价格变化调整止损位置。

该策略的风险:

1. RSI指标和均线在震荡行情中易产生错误信号。

2. 移动止损止盈需要谨慎设定幅度,过大过小均有问题。

3. 无法限制单笔亏损大小,有产生大亏损的风险。

总之,该策略汇集RSI和均线指标的优点,并采用移动止损止盈方式进行风险管理。在参数优化和风险控制方面提高,可获得较好效果。

||

This strategy combines RSI and moving averages for trend bias and adds trailing stops for risk management. It aims to follow trends with adaptive exits.

Strategy Logic:

1. Calculate RSI to judge overbought/oversold levels. RSI above 50 signals bullishness. 

2. Compute fast and slow moving averages, golden cross signals bull trend.

3. Consistent RSI rise also signals long entry.

4. After entry, set trailing stop loss and take profit lines.

5. Stop loss trail below price, take profit trail above.

6. Exit when price hits stop or take profit.

Advantages:

1. RSI avoids chasing tops and bottoms.

2. Moving averages identify trend direction. Combination improves accuracy.

3. Trailing stops/profits adjust dynamically to price.

Risks:

1. RSI and MAs prone to false signals in ranging markets.

2. Trailing stop width requires prudent calibration, too wide or too narrow problematic.

3. Unable to limit loss size, risks large losing trades. 

In summary, this strategy combines RSI and MAs then uses trailing stops for risk management. With robust optimization and risk controls, it can achieve good results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_2|14|length|
|v_input_float_1|2|Trail Long Loss (%)|
|v_input_float_2|true|Trail Short Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-06 00:00:00
end: 2023-09-12 00:00:00
period: 4d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI and MA Strategy with Trailing Stop Loss and Take Profit",
         overlay=true,
         initial_capital=1000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=100,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2022, 1, 1, 0, 0)
notInTrade = strategy.position_size <= 0

//==================================Buy Conditions============================================

//RSI
length = input(14)
rsi = ta.rsi(close, length)
buyCondition1 = rsi > 50

//MA
SMA9 = ta.sma(close, 9)
SMA50 = ta.sma(close, 50)
SMA100 = ta.sma(close, 100)
plot(SMA9, color = color.green)
plot(SMA50, color = color.orange)
plot(SMA100, color = color.blue)
buyCondition2 = SMA9 > SMA50//ta.crossover(SMA9, SMA100)

//RSI Increase
increase = 5
buyCondition3 = (rsi > rsi[1] + increase)


if (buyCondition1 and buyCondition2 and buyCondition3 and timePeriod) //and buyCondition
    strategy.entry("Long", strategy.long)

//==================================Sell Conditions============================================

//Trailing Stop Loss and Take Profit
longTrailPerc = input.float(title='Trail Long Loss (%)', minval=0.0, step=0.1, defval=2) * 0.01
shortTrailPerc = input.float(title='Trail Short Loss (%)', minval=0.0, step=0.1, defval=1) * 0.01

longStopPrice = 0.0
shortStopPrice = 0.0

longStopPrice := if strategy.position_size > 0
    stopValue = close * (1 - longTrailPerc)
    math.max(stopValue, longStopPrice[1])
else
    0

shortStopPrice := if strategy.position_size < 0
    stopValue = close * (1 + shortTrailPerc)
    math.min(stopValue, shortStopPrice[1])
else
    999999


strategy.exit(id="Exit", stop = longStopPrice, limit = shortStopPrice)
```

> Detail

https://www.fmz.com/strategy/426576

> Last Modified

2023-09-13 14:26:43
