
> Name

双通道算法自动交易策略Double-Channel-Kitchen-Algorithm-Trading-Strategy-Focusing-on-Wealth-Growth

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略“双通道厨房”采用Supertrend和StochRSI两个指标,分析不同时间周期的价格趋势和超买超卖情况,以识别潜在的买入和卖出信号。该策略旨在跟随主要趋势方向进行交易,在中长线上捕捉价格的主要方向。

## 策略原理

该策略使用1小时和4小时两个时间周期的Supertrend指标判断价格趋势方向。当两个时间周期的Supertrend都呈同一个方向时,我们可以认为出现了一个较强的价格趋势。

另外,策略利用StochRSI指标判断是否存在超买超卖情况。StochRSI指标结合了RSI和Stochastic Oscillator两个指标的优点。当StochRSI指标线段上穿超买线时,表示价格可能存在超卖现象;当StochRSI指标线段下穿超卖线时,表示价格可能存在超买现象。

在双Supertrend确认价格趋势方向的同时,如果StochRSI也显示了超买超卖现象,那么这时就是一个较好的买入或卖出时机。为了进一步验证信号,策略还设置了一个回溯期,在StochRSI显示超买超卖信号后,需要回溯一定的K线数量,如果在这段时间内价格走势确认StochRSI的信号,那么就会触发买入或卖出。

整体来说,该策略综合利用双时间框架的Supertrend判断大趋势,以及StochRSI判断局部调整的方法,在中长线上进行趋势跟踪型交易。

## 策略优势

- 利用多时间周期指标进行判断,可以有效过滤错误信号
- 综合Supertrend和StochRSI指标的优点,进行趋势判断和超买超卖判定
- 设置回溯期进行信号验证,可以避免不必要的交易
- 采用中长线操作策略,可以减少过于频繁交易带来的滑点损失
- 容易理解的双指标组合,参数调整灵活

## 策略风险

- 大盘震荡时期,中长线趋势不明显,可能出现较多错误信号
- 回溯期过长,可能错过较好的买入/卖出时机
- StochRSI参数设置不当,可能出现错误的超买超卖信号
- Supertrend参数设置不当,可能判断错误的趋势方向
- 机械地跟随指标信号,容易忽略重大基本面变化

优化方法:

- 优化StochRSI和Supertrend的参数组合
- 不同大盘环境下,调整回溯周期长度
- 结合交易量等指标进行验证
- 关注重要基本面消息,必要时主动干预

## 策略优化方向

- 增加更多不同时间周期的Supertrend指标,形成多级筛选
- 将StochRSI指标替换为其他超买超卖类型指标,如KD,RSI等
- 增加移动止损策略,根据趋势争取更大收益
- 结合重要的均线指标,如30周期均线等判断大趋势
- 开发自动参数优化程序,使策略更具鲁棒性

## 总结

“双通道厨房”策略充分利用Supertrend判断大趋势和StochRSI判断局部调整的方法,实现了一种可靠的趋势跟踪策略。该策略以中长线操作为主,可以有效避免过于频繁交易带来的收益损失。通过参数优化和组合指标验证等手段,该策略可以获得稳定的正收益。但投资者仍需关注重大基本面变化,避免机械地跟随指标信号。总体来说,该策略为积极的投资者在具有一定风险意识的前提下获得正收益提供了一种有效的技术分析方法。

||

## Overview 

The "Double Channel Kitchen" strategy uses Supertrend and StochRSI indicators to analyze price trends and overbought/oversold conditions in different timeframes, in order to identify potential buy and sell signals. This strategy aims to trade along the major trend direction and capture the primary price movement over the medium to long term.

## Strategy Logic

The strategy employs the Supertrend indicator in both 1-hour and 4-hour timeframes to determine the price trend direction. When the Supertrends in both timeframes point in the same direction, it signifies a relatively strong price trend.

In addition, the StochRSI indicator is used to detect overbought/oversold conditions. The StochRSI combines the strengths of both the RSI and Stochastic Oscillator indicators. When the StochRSI line crosses above the overbought threshold, it indicates a possible oversold condition in price. When the StochRSI line crosses below the oversold threshold, it flags a potential overbought condition. 

Together with the dual Supertrend confirmation of the price trend, if the StochRSI also shows overbought/oversold signals, it presents a good opportunity to buy or sell. To further verify the signal, a lookback period is implemented where after the StochRSI overbought/oversold signal, the price movement in the past few bars is checked - if it confirms the StochRSI signal, then a buy or sell will be triggered.

In summary, this strategy uses the dual time frame Supertrend to determine the major trend, and StochRSI to identify local reversals, to carry out trend-following trades over the medium to long term.

## Advantages of the Strategy

- Using indicators across multiple timeframes helps to filter out false signals 
- Combines the strengths of Supertrend and StochRSI for trend and overbought/oversold analysis
- Lookback verification avoids unnecessary trades 
- Medium to long term operations avoid excessive trading and slippage
- Easy to understand dual-indicator setup, with flexible parameter tuning

## Risks of the Strategy

- Choppy markets without clear mid-long term trends can generate false signals
- Excessive lookback period may cause missing good entry opportunities 
- Poor StochRSI parameter settings may lead to incorrect overbought/oversold signals
- Improper Supertrend parameters can cause wrong trend direction judgement
- Mechanical signals following overlooks major fundamental changes

Improvements:

- Optimize combinations of StochRSI and Supertrend parameters
- Adjust lookback period based on different market conditions
- Add volume indicators for signal verification
- Monitor key fundamental news events, manual intervention when necessary

## Enhancement Areas

- Add more Supertrend indicators across different timeframes for multi-stage screening 
- Replace StochRSI with other overbought/oversold indicators e.g. KD, RSI
- Incorporate trailing stop loss strategies to ride trends
- Combine key moving averages e.g. 30-period MA to determine major trends
- Develop auto parameter optimization for robustness

## Conclusion

The "Double Channel Kitchen" strategy effectively utilizes the Supertrend for major trend and StochRSI for local reversals, to implement a reliable trend following system. It focuses on medium-long term holdings to avoid excessive trading and slippage. Through parameter optimization, combining indicators, this strategy can achieve steady positive results. However investors should still watch out for major fundamental changes, instead of just mechanically following indicator signals. Overall, this strategy offers an effective technical analysis approach for active investors to generate positive returns with proper risk awareness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 January 2017 13:30 +0000)|(? ################# BACKTEST DATE ################ )Start_Time|
|v_input_2|timestamp(30 April 2024 19:30 +0000)|End_Time|
|v_input_3|10|(? #################  Supertrend  ################ )ATR Length|
|v_input_4|3|Factor|
|v_input_string_1|0|Short Time Period: 07 1h|02 3m|03 5m|04 15m|05 30m|06 45m|01 1m|08 2h|09 3h|10 4h|11 1D|12 1W|
|v_input_string_2|0|Long Time Period: 10 4h|02 3m|03 5m|04 15m|05 30m|06 45m|07 1h|08 2h|09 3h|01 1m|11 1D|12 1W|
|v_input_float_1|15|(? #################  Stoch RSI   ################ )Stoch Rsi Low Limit|
|v_input_float_2|85|Stoch Rsi Up Limit|
|v_input_int_1|20|Stoch Rsi retroactive length|
|v_input_int_2|3|Stochastic RSI K|
|v_input_int_3|14|RSI Length|
|v_input_int_4|14|Stochastic Length|
|v_input_5_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_3|20000|(? #################  Strategy Settings  ################ )Dollar Cost Per Position |
|v_input_string_3|0|Trade_direction: BOTH|SHORT|LONG|
|v_input_6|Long Open|Long Open Message|
|v_input_7|Short Open|Short Open Message|
|v_input_8|Long Close|Long Close Message|
|v_input_9|Short Close|Short Close Message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-09 00:00:00
end: 2023-10-09 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Baby_whale_to_moon

//@version=5
strategy('Kitchen [ilovealgotrading]', overlay=true, format=format.price, initial_capital = 1000)

// BACKTEST DATE
Start_Time = input(defval=timestamp('01 January 2017 13:30 +0000'), title='Start_Time', group = " ################# BACKTEST DATE ################ " )
End_Time = input(defval=timestamp('30 April 2024 19:30 +0000'), title='End_Time', group = " ################# BACKTEST DATE ################ " )

// supertrend 
atrPeriod = input(10, 'ATR Length', group = " #################  Supertrend  ################ ")
factor = input(3, 'Factor', group = " #################  Supertrend  ################ ")

time1 = input.string(title='Short Time Period', defval='07 1h', options=['01 1m','02 3m','03 5m',  '04 15m', '05 30m', '06 45m', '07 1h', '08 2h', '09 3h', '10 4h', '11 1D', '12 1W' ], group = " #################  Supertrend  ################ ",tooltip = "this timeframe is the value of our short-time supertrend indicator")
time2 = input.string(title='Long Time Period', defval='10 4h', options=[ '01 1m','02 3m','03 5m', '04 15m', '05 30m', '06 45m', '07 1h', '08 2h', '09 3h', '10 4h', '11 1D', '12 1W' ], group = " #################  Supertrend  ################ ",tooltip = "this timeframe is the value of our long-time supertrend indicator")


res(Resolution) =>
    if Resolution == '00 Current'
        timeframe.period
    else
        if Resolution == '01 1m'
            '1'
        else
            if Resolution == '02 3m'
                '3'
            else
                if Resolution == '03 5m'
                    '5'
                else
                    if Resolution == '04 15m'
                        '15'
                    else
                        if Resolution == '05 30m'
                            '30'
                        else
                            if Resolution == '06 45m'
                                '45'
                            else
                                if Resolution == '07 1h'
                                    '60'
                                else
                                    if Resolution == '08 2h'
                                        '120'
                                    else
                                        if Resolution == '09 3h'
                                            '180'
                                        else
                                            if Resolution == '10 4h'
                                                '240'
                                            else
                                                if Resolution == '11 1D'
                                                    '1D'
                                                else
                                                    if Resolution == '12 1W'
                                                        '1W'
                                                    else
                                                        if Resolution == '13 1M'
                                                            '1M'


// supertrend Long time period 
[supertrend2, direction2] = request.security(syminfo.tickerid, res(time2), ta.supertrend(factor, atrPeriod))
bodyMiddle4 = plot((open + close) / 2, display=display.none)
upTrend2 = plot(direction2 < 0 ? supertrend2 : na, 'Up Trend', color=color.new(color.green, 0), style=plot.style_linebr, linewidth=2)
downTrend2 = plot(direction2 < 0 ? na : supertrend2, 'Down Trend', color=color.new(color.red, 0), style=plot.style_linebr, linewidth=2)

// supertrend short time period 
[supertrend1, direction1] = request.security(syminfo.tickerid, res(time1), ta.supertrend(factor, atrPeriod))
bodyMiddle = plot((open + close) / 2, display=display.none)
upTrend = plot(direction1 < 0 ? supertrend1 : na, 'Up Trend', color=color.new(color.yellow, 0), style=plot.style_linebr)
downTrend = plot(direction1 < 0 ? na : supertrend1, 'Down Trend', color=color.new(color.orange, 0), style=plot.style_linebr)


// Stochastic RSI
low_limit_stoch_rsi = input.float(title = 'Stoch Rsi Low Limit', step=0.5, defval=15, group = " #################  Stoch RSI   ################ ", tooltip = "when Stock rsi value crossover Low Limit value we get Long")
up_limit_stoch_rsi = input.float(title = 'Stoch Rsi Up Limit', step=0.5, defval=85, group = " #################  Stoch RSI   ################ ", tooltip = "when Stock rsi value crossunder Up Limit value we get Short")
stocrsi_back_length = input.int(20, 'Stoch Rsi retroactive length', minval=1, group = " #################  Stoch RSI   ################ ", tooltip = "How many candles are left behind, even if there is a buy or sell signal, it will be valid now")
smoothK = input.int(3, 'Stochastic RSI K', minval=1, group = " #################  Stoch RSI   ################ ")
lengthRSI = input.int(14, 'RSI Length', minval=1, group = " #################  Stoch RSI   ################ ")
lengthStoch = input.int(14, 'Stochastic Length', minval=1, group = " #################  Stoch RSI   ################ ")
src_rsi = input(close, title='RSI Source', group = " #################  Stoch RSI   ################ ")
rsi1 = request.security(syminfo.tickerid, '240', ta.rsi(src_rsi, lengthRSI))
k = request.security(syminfo.tickerid, '240', ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK))

// Strategy settings 
dollar = input.float(title='Dollar Cost Per Position ', defval=20000, group = " #################  Strategy Settings  ################ ")
trade_direction = input.string(title='Trade_direction', group = " #################  Strategy Settings  ################ ", options=['LONG', 'SHORT', 'BOTH'], defval='BOTH')
Long_message_open = input('Long Open', title = "Long Open Message", group = " #################  Strategy Settings  ################ ", tooltip = "if you write your alert window this code {{strategy.order.alert_message}} .When trigger Long signal you will get dynamically what you pasted here for Long Open Message ")
Short_message_open = input('Short Open', title = "Short Open Message", group = " #################  Strategy Settings  ################ ", tooltip = "if you write your alert window this code {{strategy.order.alert_message}} .When trigger Long signal you will get dynamically what you pasted here for Short Open Message ")
Long_message_close = input('Long Close', title = "Long Close Message", group = " #################  Strategy Settings  ################ ", tooltip = "if you write your alert window this code {{strategy.order.alert_message}} .When trigger Long signal you will get dynamically what you pasted here for Long Close Message ")
Short_message_close = input('Short Close', title = "Short Close Message", group = " #################  Strategy Settings  ################ ", tooltip = "if you write your alert window this code {{strategy.order.alert_message}} .When trigger Long signal you will get dynamically what you pasted here for Short Close Message ")

Time_interval = true
bgcolor(Time_interval ? color.rgb(255, 235, 59, 95) : na)

back_long = 0
back_short = 0

for i = 1 to stocrsi_back_length by 1
    if ta.crossover(k, low_limit_stoch_rsi)[i] == true 
        back_long += i
        back_long
    if ta.crossunder(k, up_limit_stoch_rsi)[i] == true 
        back_short += i
        back_short

// bgcolor(back_long>0?color.rgb(153, 246, 164, 54):na)
// bgcolor(back_short>0?color.rgb(246, 153, 153, 54):na)

buy_signal = false
sell_signal = false

if direction2 < 0 and direction1 < 0 and back_long > 0
    buy_signal := true
    buy_signal

if direction2 > 0 and direction1 > 0 and back_short > 0
    sell_signal := true
    sell_signal


//bgcolor(buy_signal  ? color.new(color.lime,90) : na ,title="BUY bgcolor")
plotshape( buy_signal[1] == false and  strategy.opentrades == 0 and Time_interval and buy_signal  ? supertrend2 : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white)

//bgcolor(sell_signal  ? color.new(color.red,90) : na ,title="SELL bgcolor")
plotshape(sell_signal[1] == false and strategy.opentrades == 0 and Time_interval and sell_signal  ? supertrend2 : na , title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white)


// Strategy entries 
if strategy.opentrades == 0 and Time_interval and buy_signal and ( trade_direction == 'LONG' or trade_direction == 'BOTH')
    strategy.entry('Long_Open', strategy.long, qty=dollar / close, alert_message=Long_message_open)

if strategy.opentrades == 0 and Time_interval and sell_signal and ( trade_direction == 'SHORT' or trade_direction == 'BOTH')
    strategy.entry('Short_Open', strategy.short, qty=dollar / close, alert_message=Short_message_open)


// Strategy Close
if close < supertrend1 and strategy.position_size > 0 
    strategy.exit('Long_Close',from_entry = "Long_Open", stop=close, qty_percent=100, alert_message=Long_message_close)

if close > supertrend1 and strategy.position_size < 0 
    strategy.exit('Short_Close',from_entry = "Short_Open", stop=close, qty_percent=100, alert_message=Short_message_close)


```

> Detail

https://www.fmz.com/strategy/428894

> Last Modified

2023-10-10 15:25:53
