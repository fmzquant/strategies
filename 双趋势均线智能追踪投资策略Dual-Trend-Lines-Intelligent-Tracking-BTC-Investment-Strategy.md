
> Name

双趋势均线智能追踪投资策略Dual-Trend-Lines-Intelligent-Tracking-BTC-Investment-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157bc32bf38e4509773.png)

[trans]

### 概述

该策略主要用于自动化BTC的长线投资。通过双EMA和LSMA的交叉来判断趋势方向,并使用ATR指标计算动态止损,实现对BTC多头趋势的有效跟踪。

### 策略原理

1. 使用25期EMA和100期LSMA构成双均线,它们的交叉用来判断行情趋势。EMA快速响应价格变化,LSMA滤波假突破。

2. 当快速EMA上穿缓慢LSMA时判断为仍处于多头趋势,这时做多;反之当快速EMA下穿缓慢LSMA时判断为进入空头,此时平仓。

3. 进入做多后,使用ATR指标计算的动态止损不断调整,实现对BTC上涨趋势的有效跟踪。具体来说,止损线初始点为进场价格,之后每次调整都会向上滑移固定比例的ATR幅度。

4. 止损线能够有效锁定BTC上涨带来的浮盈,同时防止止损点过于靠近最新价格导致频繁止损。此外,策略还设置了两个不同比例的移动止盈,用于锁定更多利润。

### 优势分析

1. 使用双均线判断趋势更可靠,能有效防止产生假信号。

2. ATR动态跟踪止损,既能锁定大部分利润,也可避免频繁小止损。

3. 无论多头行情是否结束,只要均线发出退出信号就会止损了结,风险控制到位。

4. 自动化程度高,无需人工干预,便于实盘长时间运行。

### 风险分析 

1. 仍需关注突发重大消息面,避免巨额滑点损失。

2. 虽然双均线结合能减少假信号,但在震荡行情中也难以完全避免。

3. ATR参数设置不当也会影响止损效果,需要根据不同品种调整。

4. 均线周期不合理或者未能及时更新也会导致信号产生滞后。

5. 保证服务器稳定性,避免异常宕机导致自动交易中断。

### 优化方向

1. 可以尝试加入更多指标判断趋势,如布林带。或者使用机器学习模型预测价格。

2. ATR动态止损的计算方法还可进行调整优化,使止损更平滑。

3. 可以添加基于交易量、日内轮动 FEATURE的报警机制来防范重大消息面的冲击。

4. 不同币种参数不尽相同,可以使用更多历史数据训练出个性化参数。

### 总结

本策略总体来说是一个非常实用的BTC自动投资程序。使用双EMA判断大趋势非常可靠,再辅以ATR跟踪止损,既可以获得不错的盈利,有效期也可以拉的很长。随着参数不断优化调整,本策略的效果还大有提升空间,非常值得实盘验证。

||

### Overview

This strategy is mainly used for the automated long-term investment in BTC. It uses the crossover of dual EMA and LSMA to determine the trend direction and uses the ATR indicator to calculate a dynamic stop loss to effectively track the BTC bullish trend.

### Strategy Logic

1. Use 25-period EMA and 100-period LSMA to form a dual moving average. Their crossover is used to determine the market trend. The EMA responds quickly to price changes while the LSMA filters out false breakouts.  

2. When the fast EMA crosses above the slow LSMA, it is determined that the uptrend is still intact and long positions are taken. On the contrary, when the fast EMA crosses below the slow LSMA, it is determined that a downtrend has begun and existing positions are closed.

3. After taking long positions, the dynamic stop loss calculated using the ATR indicator keeps adjusting to effectively track the uptrend of BTC. Specifically, the initial point of the stop loss line is the entry price. After that, each adjustment will slide up by a fixed percentage of the ATR amplitude.  

4. The stop loss line can effectively lock in the floating profit brought by the BTC uptrend, while preventing the stop loss point from getting too close to the latest price to avoid frequent stop loss. In addition, the strategy also sets two moving stop profits of different proportions to lock in more profits.

### Advantage Analysis  

1. Using dual moving averages to determine the trend is more reliable and can effectively prevent false signals.

2. The ATR dynamic trailing stop loss can lock in most profits while avoiding frequent small stop losses.  

3. No matter whether the bullish trend ends or not, as long as the moving average issues an exit signal, the position will be stopped out to control risks.

4. The strategy has a high degree of automation without manual intervention, making it suitable for long-term live trading.

### Risk Analysis

1. Still need to pay attention to sudden major news to avoid huge slippage losses.  

2. Although the combination of dual moving averages can reduce false signals, it is still difficult to completely avoid them in range-bound markets.

3. Improper parameter settings of ATR can also affect the stop loss effect. Adjustments are needed based on different products. 

4. Unreasonable moving average periods or failure to update them in time can lead to signal lag.

5. Ensure server stability to avoid abnormal crashes that interrupt automated trading.

### Optimization Directions  

1. More indicators such as Bollinger Bands can be added to determine the trend. Machine learning models can also be used to predict prices.

2. The calculation method of the ATR dynamic stop loss can also be adjusted and optimized to make the stop loss smoother.  

3. Trading volume based alert mechanisms and intraday rotation features can be added to guard against impacts from major news.

4. Parameters vary for different coins. More historical data can be used to train personalized parameters.

### Summary  

Overall, this is a very practical automated BTC investment program. Using dual EMAs to determine the major trend is very reliable. With ATR trailing stop loss, it can achieve decent profits and the validity period can be very long. As parameters continue to be optimized, there is still much room for improvement in the performance of this strategy. It is well worth live trading verification.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|What trades should be taken : : LONG|SHORT|BOTH|NONE|
|v_input_2|0|First Trend Line : : TEMA|LSMA|EMA|SMA|
|v_input_3|0|First Trend Line : : LSMA|TEMA|EMA|SMA|
|v_input_4|25|Length of the First Trend Line|
|v_input_5|100|Length of the Second Trend Line|
|v_input_6|15|Long Take Profit 1 %|
|v_input_7|20|Long Take Profit 1 Qty|
|v_input_8|30|Long Take Profit 2%|
|v_input_9|20|Long Take Profit 2 Qty|
|v_input_10|5|stop loss in %|
|v_input_11|3.5|SL Mutiplier|
|v_input_12|8|ATR period|
|v_input_13_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|2016|Backtest Start Year|
|v_input_15|true|Backtest Start Month|
|v_input_16|true|Backtest Start Day|
|v_input_17|9999|Backtest Stop Year|
|v_input_18|12|Backtest Stop Month|
|v_input_19|31|Backtest Stop Day|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wunderbit Trading

//@version=4
strategy("Automated Bitcoin (BTC) Investment Strategy", overlay=true, initial_capital=5000,pyramiding = 0, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100,  commission_type=strategy.commission.percent,commission_value=0.1)

////////////  Functions

Atr(p) =>
    atr = 0.
    Tr = max(high - low, max(abs(high - close[1]), abs(low - close[1])))
    atr := nz(atr[1] + (Tr - atr[1])/p,Tr)

//TEMA
TEMA(series, length) =>
    if (length > 0)
        ema1 = ema(series, length)
        ema2 = ema(ema1, length)
        ema3 = ema(ema2, length)
        (3 * ema1) - (3 * ema2) + ema3
    else
        na
tradeType = input("LONG", title="What trades should be taken : ", options=["LONG", "SHORT", "BOTH", "NONE"])

///////////////////////////////////////////////////
/// INDICATORS
source=close

/// TREND
trend_type1 = input("TEMA", title ="First Trend Line : ", options=["LSMA", "TEMA","EMA","SMA"])
trend_type2 = input("LSMA", title ="First Trend Line : ", options=["LSMA", "TEMA","EMA","SMA"])

trend_type1_length=input(25, "Length of the First Trend Line")
trend_type2_length=input(100, "Length of the Second Trend Line")

leadLine1 = if trend_type1=="LSMA"
    linreg(close, trend_type1_length, 0)
else if trend_type1=="TEMA"
    TEMA(close,trend_type1_length)
else if trend_type1 =="EMA"
    ema(close,trend_type1_length)
else
    sma(close,trend_type1_length)

leadLine2 = if trend_type2=="LSMA"
    linreg(close, trend_type2_length, 0)
else if trend_type2=="TEMA"
    TEMA(close,trend_type2_length)
else if trend_type2 =="EMA"
    ema(close,trend_type2_length)
else
    sma(close,trend_type2_length)

p3 = plot(leadLine1, color= #53b987, title="EMA", transp = 50, linewidth = 1)
p4 = plot(leadLine2, color= #eb4d5c, title="SMA", transp = 50, linewidth = 1)
fill(p3, p4, transp = 60, color = leadLine1 > leadLine2 ? #53b987 : #eb4d5c)

//Upward Trend
UT=crossover(leadLine1,leadLine2)
DT=crossunder(leadLine1,leadLine2)

// TP/ SL/  FOR LONG
// TAKE PROFIT AND STOP LOSS
long_tp1_inp = input(15, title='Long Take Profit 1 %', step=0.1)/100
long_tp1_qty = input(20, title="Long Take Profit 1 Qty", step=1)

long_tp2_inp = input(30, title='Long Take Profit 2%', step=0.1)/100
long_tp2_qty = input(20, title="Long Take Profit 2 Qty", step=1)

long_take_level_1 = strategy.position_avg_price * (1 + long_tp1_inp)
long_take_level_2 = strategy.position_avg_price * (1 + long_tp2_inp)

long_sl_input = input(5, title='stop loss in %', step=0.1)/100
long_sl_input_level = strategy.position_avg_price * (1 - long_sl_input)

// Stop Loss
multiplier = input(3.5, "SL Mutiplier", minval=1, step=0.1)
ATR_period=input(8,"ATR period", minval=1, step=1)

// Strategy
//LONG STRATEGY CONDITION

SC = input(close, "Source", input.source)
SL1 = multiplier * Atr(ATR_period)  // Stop Loss
Trail1 = 0.0
Trail1 :=  iff(SC < nz(Trail1[1], 0) and SC[1] < nz(Trail1[1], 0), min(nz(Trail1[1], 0), SC + SL1), iff(SC > nz(Trail1[1], 0), SC - SL1, SC + SL1))
Trail1_high=highest(Trail1,50)

// iff(SC > nz(Trail1[1], 0) and SC[1] > nz(Trail1[1], 0), max(nz(Trail1[1], 0), SC - SL1),

entry_long=crossover(leadLine1,leadLine2) and Trail1_high < close
exit_long = close < Trail1_high or crossover(leadLine2,leadLine1) or close < long_sl_input_level

///// BACKTEST PERIOD ///////
testStartYear = input(2016, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(9999, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

if testPeriod()
    if tradeType=="LONG" or tradeType=="BOTH"
        if strategy.position_size == 0 or strategy.position_size > 0
            strategy.entry("long", strategy.long, comment="b8f60da7_ENTER-LONG_BINANCE_BTC/USDT_b8f60da7-BTC-Investment_4H", when=entry_long)
            strategy.exit("TP1", "long", qty_percent=long_tp1_qty, limit=long_take_level_1)
            strategy.exit("TP2", "long", qty_percent=long_tp2_qty, limit=long_take_level_2)
            strategy.close("long", when=exit_long, comment="b8f60da7_EXIT-LONG_BINANCE_BTC/USDT_b8f60da7-BTC-Investment_4H" )


// LONG POSITION

plot(strategy.position_size > 0 ? long_take_level_1 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="1st Long Take Profit")
plot(strategy.position_size > 0 ? long_take_level_2 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="2nd Long Take Profit")
plot(strategy.position_size > 0 ? Trail1_high : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Stop Loss")
```

> Detail

https://www.fmz.com/strategy/432889

> Last Modified

2023-11-22 15:18:53
