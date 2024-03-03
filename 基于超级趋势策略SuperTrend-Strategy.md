
> Name

基于超级趋势策略SuperTrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1654f0e82a49dc4a3ee.png)
[trans]
## 概述
本策略运用超趋势指标来判断价格趋势,并在趋势转换时进入做多或做空头寸。该策略允许调整ATR周期和ATR乘数来优化参数。此外,该策略还提供了选项来更改ATR计算方法,从而产生略有不同的结果。 

策略还内置了回测日期范围设置和只在某些时间段内交易的功能。这对于日内交易股票尤其有用。当启用时间范围选项时,可选择在时间段开始时立即进入当前头寸,或等待趋势转换后再进入首单。

该策略也可基于百分比设置止损位和止盈位。在大多数情况下,由于超趋势本身提供的基于ATR的止损,不需要额外设置止损。因此可以仅启用止盈位来优化退出机制。

最后,该策略具有自定义的交易入场和退出的警报信息功能,可用于自动交易服务。

## 策略原理

超趋势策略基于以下主要原理运行:

1. 计算ATR值:可以选择使用SMA计算,也可以使用内置的ATR指标计算。SMA版本的公式为:
    ```
    atr2 = sma(tr, Periods) 
    ```

2. 计算上轨和下轨:上轨为价格减去ATR乘数与ATR的乘积,下轨为价格加上ATR乘数与ATR的乘积。
    ```
    up = close - (Multiplier * atr)
    dn = close + (Multiplier * atr)
    ```

3. 判断价格与上下轨的关系,计算趋势方向。当价格上穿下轨时趋势为多头,当价格下穿上轨时趋势为空头。
    ```
    trend := trend == -1 and close > dn ? 1 : trend == 1 and close < up ? -1 : trend 
    ```

4. 在趋势转换时产生交易信号,如从多头转为空头时产生卖出信号:
    ```
    sellSignal = trend == -1 and trend[1] == 1
    ```

5. 根据交易信号和其他条件过滤,选择是否入场。

6. 设置止损和止盈以锁定利润或规避风险。

以上是超趋势策略的关键要点,结合参数优化,可以获得较好的交易结果。

## 策略优势

本超趋势策略有以下几个优势:

1. 超趋势指标本身能有效判断价格趋势,是一种常用的跟踪止损工具。

2. ATR参数可调,可以优化到不同品种获得最佳参数组合。SMA计算方式也提供了另一种选择。

3. 可设置回测和实盘交易的时间范围,适应不同交易时段需求。

4. 提供选择立即进入首单或等待信号的选项,可根据品种特点选择。 

5. 内置的止损止盈设定可以提高策略抗风险能力或锁定更多利润。

6. 自定义的交易提示信息,可集成至自动或机器人交易系统,实现无人值守。

## 策略风险

本策略也存在一些风险:

1. 超趋势指标可能产生较多虚假信号,需要结合其他指标过滤。

2. ATR参数不当可能导致交易频繁或错过趋势。需要参数优化得到最佳平衡。

3. 停损点过近可能过早退出有利头寸,止盈点过远可能无法锁定足够利润。

4. 时间范围设定不当,可能错过主要交易时段或无谓占用保证金。

针对以上风险,可以通过适当调整参数或添加过滤条件来解决,提高策略稳定性。

## 策略优化方向 

本策略可从以下几个方面进行进一步优化:

1. 尝试不同的ATR周期参数,找到合适的平衡点。一般10-20之间比较理想。

2. 测试不同的ATR乘数参数,一般2-5比较适合,可逐步调整找到最佳值。 

3. 尝试添加其他指标判断多空向,如MACD,KD等,过滤假信号。

4. 对止损止盈参数进行优化,找到最优参数组合。可引入动态止盈止损。

5. 测试不同的交易时间范围设置。日内短线品种适合较短时间段。

6. 尝试自动选择合约,跟踪高流动性或波动率较大的标的。

## 总结

本超趋势策略整体来说是一种较为常见和实用的趋势跟踪策略。它具有参数可调、高效跟踪趋势的特点,也存在一定的风险需要规避。通过参数优化和 CONDITIONS 添加,可以将该策略优化为一个可靠的量化交易系统,获得稳定的Alpha。

||

## Overview
This strategy uses the Supertrend indicator to determine price trends and enters long or short positions when the trends change. The strategy allows adjusting the ATR period and multiplier to optimize parameters. It also provides the option to change the ATR calculation method for slightly different results. 

The strategy has built-in backtesting date ranges and the ability to trade only within certain times of the day and close all trades at the end of that timeframe. This is especially useful for day trading stocks. When the timeframe option is enabled, you can choose to enter the current position immediately when the timeframe starts, or wait for a trend change to enter the first position.

The strategy also allows you to specify percentage based stop loss and take profit levels. In most cases, the ATR based stop provided by Supertrend itself makes an additional stop loss unnecessary. So you could enable only take profit to optimize the exit mechanism.

Finally, there are custom alert fields for entry and exit messages to be used with automated trading services. 

## Strategy Logic

The Supertrend strategy is based on the following key principles:

1. Calculate the ATR value: Can choose between SMA calculation or built-in ATR indicator. SMA formula:
    ```
    atr2 = sma(tr, Periods)
    ```

2. Calculate upper and lower bands. Upper band is close minus ATR multiplier times ATR. Lower band is close plus multiplier times ATR.

    ```
    up = close - (Multiplier * atr) 
    dn = close + (Multiplier * atr)
    ```

3. Determine trend direction by comparing price to bands. Uptrend when price crosses above lower band. Downtrend when price crosses below upper band.
    
    ```
    trend := trend == -1 and close > dn ? 1 : trend == 1 and close < up ? -1 : trend
    ```

4. Generate trading signals on trend change, e.g. sell signal when changing from uptrend to downtrend:

    ```
    sellSignal = trend == -1 and trend[1] == 1 
    ```

5. Filter entry based on signals and additional conditions.

6. Use stop loss and take profit to lock in profits or limit risks.

These are the key working principles behind the Supertrend strategy. Combined with parameter optimization, it can produce good trading results.

## Advantages

The Supertrend strategy has several advantages:

1. Supertrend itself effectively identifies trends and is commonly used for trailing stops. 

2. Customizable ATR parameters can be optimized across products for best fit. SMA calculation provides another option.

3. Configurable backtest and live trading time ranges suit different trading sessions.

4. Option to enter first trade immediately or wait for signal caters to different products.

5. Built-in stop loss and take profit helps improve risk management or lock in more profits.

6. Customizable trade alerts for integration with automated trading systems and bots.

## Risks

There are also some risks to consider:

1. Supertrend can produce false signals which need to be filtered with additional conditions.

2. Improper ATR parameters may lead to over-trading or missing trends. Requires optimization for best balance.

3. Stop loss too close may prematurely exit profitable trades. Take profit too loose may leave money on the table. 

4. Poor timeframe configuration can miss trading sessions or tie up margin unnecessarily.

These risks can be addressed through appropriate adjustments to parameters or additional filters to improve robustness.

## Optimization Opportunities

Some ways the strategy can be further optimized:

1. Test different ATR periods to find the right balance, typically 10-20 works well. 

2. Try different ATR multiplier values, generally 2-5 is appropriate, adjust to find optimum.

3. Add filters like MACD, RSI etc. to reduce false signals. 

4. Optimize stop loss and take profit levels for best results. Consider dynamic trailing mechanisms.

5. Test different trading time ranges. Shorter durations suit intraday and high frequency strategies.  

6. Implement auto symbol selection to track high momentum or volatility.

## Conclusion
Overall this is a fairly common and practical trend following strategy. It efficiently tracks trends with customizable parameters, but also has inherent risks to manage. With optimization and additional conditions, it can be refined into a robust quant trading system with consistent alpha.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Period|
|v_input_2_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_3|3|ATR Multiplier|
|v_input_4|true|Change ATR Calculation Method ?|
|v_input_5|true|Enter First Trade ASAP|
|v_input_6|false|Wait To Enter First Trade|
|v_input_7|timestamp(2021-01-01T00:00:00)|Backtesting Start Date|
|v_input_8|timestamp(2021-12-31T00:00:00)|Backtesting End Date|
|v_input_9||Time Frame To Enter Trades|
|v_input_10|false|Enable Close Trade At End Of Time Frame|
|v_input_11|false|Enable Stop Loss|
|v_input_12|false|Enable Take Profit|
|v_input_13|5|Stop Loss %|
|v_input_14|10|Take Profit %|
|v_input_15||Long Entry message|
|v_input_16||Short Entry message|
|v_input_17||Close Long message|
|v_input_18||Close Short message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © REV0LUTI0N

//@version=4

// Strategy
strategy("Supertrend Strategy", overlay=true, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash)
Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR= input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)
enableentry = input(true, title="Enter First Trade ASAP")
waitentry = input(false, title="Wait To Enter First Trade")

atr2 = sma(tr, Periods)
atr= changeATR ? atr(Periods) : atr2
up=src-(Multiplier*atr)
up1 = nz(up[1],up)
up := close[1] > up1 ? max(up,up1) : up
dn=src+(Multiplier*atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

upPlot = plot(trend == 1 ? up : na, title="Up Trend", style=plot.style_linebr, linewidth=2, color=color.green)
Long = (trend == 1 ? up : na)
buySignal = trend == 1 and trend[1] == -1

dnPlot = plot(trend == 1 ? na : dn, title="Down Trend", style=plot.style_linebr, linewidth=2, color=color.red)
Short = (trend == 1 ? na : dn)
sellSignal = trend == -1 and trend[1] == 1

// Strategy Backtesting
startDate  = input(timestamp("2021-01-01T00:00:00"), type = input.time, title='Backtesting Start Date')
finishDate = input(timestamp("2021-12-31T00:00:00"), type = input.time, title='Backtesting End Date')

time_cond  = true

//Time Restriction Settings
startendtime = input("", title='Time Frame To Enter Trades')
enableclose = input(false, title='Enable Close Trade At End Of Time Frame')
timetobuy = (time(timeframe.period, startendtime))
timetoclose = na(time(timeframe.period, startendtime))

// Stop Loss & Take Profit % Based
enablesl = input(false, title='Enable Stop Loss')
enabletp = input(false, title='Enable Take Profit')
stopTick = input(5.0, title='Stop Loss %', type=input.float, step=0.1) / 100
takeTick = input(10.0, title='Take Profit %', type=input.float, step=0.1) / 100

longStop = strategy.position_avg_price * (1 - stopTick)
shortStop = strategy.position_avg_price * (1 + stopTick)
shortTake = strategy.position_avg_price * (1 - takeTick)
longTake = strategy.position_avg_price * (1 + takeTick)

plot(strategy.position_size > 0 and enablesl ? longStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Fixed SL")
plot(strategy.position_size < 0 and enablesl ? shortStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Short Fixed SL")
plot(strategy.position_size > 0 and enabletp ? longTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Long Take Profit")
plot(strategy.position_size < 0 and enabletp ? shortTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Short Take Profit")

// Alert messages
message_enterlong  = input("", title="Long Entry message")
message_entershort = input("", title="Short Entry message")
message_closelong = input("", title="Close Long message")
message_closeshort = input("", title="Close Short message")

// Strategy Execution
if Long and time_cond and timetobuy and enableentry
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
    
if Short and time_cond and timetobuy and enableentry
    strategy.entry("Short", strategy.short, alert_message = message_entershort)
    
if buySignal and time_cond and timetobuy and waitentry
    strategy.entry("Long", strategy.long, alert_message = message_enterlong)
    
if sellSignal and time_cond and timetobuy and waitentry
    strategy.entry("Short", strategy.short, alert_message = message_entershort)
    
if strategy.position_size > 0 and timetoclose and enableclose
    strategy.close_all(alert_message = message_closelong)
if strategy.position_size < 0 and timetoclose and enableclose
    strategy.close_all(alert_message = message_closeshort)
    
if strategy.position_size > 0 and enablesl and time_cond
    strategy.exit(id="Close Long", stop=longStop, limit=longTake, alert_message = message_closelong)
if strategy.position_size < 0 and enablesl and time_cond
    strategy.exit(id="Close Short", stop=shortStop, limit=shortTake, alert_message = message_closeshort)
    
if strategy.position_size > 0 and enabletp and time_cond
    strategy.exit(id="Close Long", stop=longStop, limit=longTake, alert_message = message_closelong)
if strategy.position_size < 0 and enabletp and time_cond
    strategy.exit(id="Close Short", stop=shortStop, limit=shortTake, alert_message = message_closeshort)





```

> Detail

https://www.fmz.com/strategy/440798

> Last Modified

2024-02-02 11:11:48
