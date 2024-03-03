
> Name

多时序RSI网格交易策略Multi-Period-RSI-Grid-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11fc2e6fa4ac9623b35.png)
[trans]

## 概述

该策略运用7个不同周期的RSI指标来判断市场趋势,在RSI指标震荡的情况下建立网格仓位,实现高效率的网格交易。策略名称取为“Multi-Period RSI Grid Trading Strategy”,简称“MPRSI 网格策略”。

## 策略原理  

1. 策略使用7个不同周期(1分钟、5分钟、15分钟、30分钟、1小时、2小时和1日)的RSI指标。当全部7个RSI指标同时低于超买线时,产生买入信号;当全部7个RSI指标同时高于超卖线时,产生卖出信号。  

2. 根据买入和卖出信号,在当前价格附近建立固定百分比价格间距的20个定单。比如建仓价格100美元,订单间距2%,则订单价格为98美元、96美元......一直到60美元。  

3. 当价格触及某一个订单价格时,就会成交建立仓位。当有利润时,会以设置的止盈百分比止盈。

## 策略优势  

1. 多指标组合判断市场趋势,避免曲解。7个周期覆盖短期和中长期趋势变化,判断精确。  

2. RSI指标具有可靠的超买超卖判断能力,避免建仓追高杀低。 

3. 网格定单高效建仓,避免追涨杀跌。盘整行情中,分批建仓成本优化。

4. 设置止盈止损,有利于资金管理,降低极端行情的亏损风险。

## 策略风险与解决  

1. 价格剧烈波动可能穿透网格。解决方法是合理设置网格间距,并追加流动资金。  

2. 停损点过于靠近可能增加了不必要的滑点。解决方法是根据市场波动率设置合理的止损点。

3. 部分RSI指标可能产生错误讯号。 解决方法是过滤掉某些特定周期的RSI指标。

## 策略优化方向  

1. 可以测试不同的参数组合和其他指标判断逻辑,优化建仓和止盈止损策略。  

2. 可以结合波动率指标自动调整网格间距。高波动时扩大间距,低波动时缩小间距。

3. 可以添加资金管理模块,根据账户资金动态调整最大持仓量、网格间距等参数。

## 总结  

该策略整合多时间周期RSI指标判断市场趋势,在行情震荡时高效建立网格仓位。策略具有成本优化、止盈止损、风险控制等多重优势,适合那些想要利用行情震荡套利,且具有一定风险承受能力的投资者。该策略还有进一步改进和优化的空间,投资者可以根据自己的风险偏好进行调整。

||


## Overview  

This strategy uses 7 RSI indicators with different timeframes to determine market trends and establish grid positions for efficient grid trading when the RSI indicators are fluctuating. The strategy is named "Multi-Period RSI Grid Trading Strategy", or "MPRSI Grid Strategy" for short.  

## Strategy Logic

1. The strategy uses 7 RSI indicators with different timeframes (1 minute, 5 minutes, 15 minutes, 30 minutes, 1 hour, 2 hours and 1 day). When all 7 RSI indicators are simultaneously lower than the overbought line, a buy signal is generated. When all 7 RSI indicators are simultaneously higher than the oversold line, a sell signal is generated.

2. Based on the buy and sell signals, 20 orders with fixed percentage price intervals are placed around the current price. For example, if the entry price is $100 and the interval between orders is 2%, the order prices would be $98, $96... down to $60.  

3. When the price hits one of the order prices, an order is filled and a position is established. Profit taking occurs when a set percentage take profit is hit.

## Advantages of the Strategy

1. Using multiple indicators avoids misinterpreting the market trend. The 7 timeframes cover short-term and medium-long term trend changes for accurate judgments.   

2. The RSI indicator reliably identifies overbought and oversold levels, avoiding buying highs and selling lows.  

3. Grid orders efficiently enter positions, avoiding chasing rallies and declines. Gradual entries across flat markets allows optimization of entry costs.  

4. Take profit and stop loss settings aid risk management and reduce loss exposure during extreme moves.

## Risks & Solutions

1. Sharp price moves could penetrate the grid. This can be addressed by reasonably setting grid intervals and adding to margins.  

2. Stop losses placed too closely may incur unnecessary slippage costs. Reasonably wide stops based on volatility is optimal.

3. Some RSI indicators could generate incorrect signals. Filtering certain RSI timeframes can isolate the issues.

## Optimization Directions 

1. Different combinations of parameters and alternate judgment logics can be tested to refine entry and exit strategies.  

2. Incorporate volatility metrics to automatically adjust grid intervals, with wider intervals during higher volatility environments. 

3. Add capital management modules to dynamically alter maximum position sizing, grid intervals etc based on account equity.

## Conclusion

This strategy combines multi-timeframe RSI indicators to determine market trends, efficiently establishing grid positions during ranging markets. The advantages of cost optimization, taking profits, cutting losses and risk controls make it suitable for traders seeking to capitalize on ranging markets while tolerating defined risks. Further refinements and optimizations are possible to suit specific risk appetites.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source RSI: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|1|Bot period|
|v_input_3_ohlc4|0|Source Bot: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_4|0|Trade Direction: Long Bot|Short Bot|
|v_input_5|1|(?indicators)RSI-1 period|
|v_input_6|14|RSI-1 Length|
|v_input_7|5|RSI-2 period|
|v_input_8|14|RSI-2 Length|
|v_input_9|15|RSI-3 period|
|v_input_10|14|RSI-3 Length|
|v_input_11|30|RSI-4 period|
|v_input_12|14|RSI-4 Length|
|v_input_13|60|RSI-5 period|
|v_input_14|14|RSI-5 Length|
|v_input_15|120|RSI-6 period|
|v_input_16|14|RSI-6 Length|
|v_input_17|1D|RSI-7 period|
|v_input_18|14|RSI-7 Length|
|v_input_19|0.5|(?Long Bot)Long Bot Take Profit (%)|
|v_input_20|2|Long Bot Step orders (%)|
|v_input_21|100|RSI-1 <|
|v_input_22|100|RSI-2 <|
|v_input_23|100|RSI-3 <|
|v_input_24|100|RSI-4 <|
|v_input_25|100|RSI-5 <|
|v_input_26|100|RSI-6 <|
|v_input_27|100|RSI-7 <|
|v_input_28|0.5|(?Short Bot)Short Bot Take Profit (%)|
|v_input_29|2|Short Bot Step orders (%)|
|v_input_30|false|RSI-1 >|
|v_input_31|false|RSI-2 >|
|v_input_32|false|RSI-3 >|
|v_input_33|false|RSI-4 >|
|v_input_34|false|RSI-5 >|
|v_input_35|false|RSI-6 >|
|v_input_36|false|RSI-7 >|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-22 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["MinLot",0.001,358374]]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rrolik66

//@version=4
strategy(title="7-RSI strategy", overlay=true)

// inputs
src = input(close, "Source RSI", type = input.source)
bot_res = input(title="Bot period", type=input.resolution, defval="1")
srcin_bot = input(ohlc4, "Source Bot", type = input.source)
src_bot = security(syminfo.tickerid, bot_res, srcin_bot)

tradeDirection = input(title="Trade Direction", type=input.string,
     options=["Long Bot", "Short Bot"], defval="Long Bot")


rsi1_res = input(title="RSI-1 period", type=input.resolution, defval="1", group="indicators")
rsi1_Len = input(14, minval=1, title="RSI-1 Length", group="indicators")
rsi2_res = input(title="RSI-2 period", type=input.resolution, defval="5", group="indicators")
rsi2_Len = input(14, minval=1, title="RSI-2 Length", group="indicators")
rsi3_res = input(title="RSI-3 period", type=input.resolution, defval="15", group="indicators")
rsi3_Len = input(14, minval=1, title="RSI-3 Length", group="indicators")
rsi4_res = input(title="RSI-4 period", type=input.resolution, defval="30", group="indicators")
rsi4_Len = input(14, minval=1, title="RSI-4 Length", group="indicators")
rsi5_res = input(title="RSI-5 period", type=input.resolution, defval="60", group="indicators")
rsi5_Len = input(14, minval=1, title="RSI-5 Length", group="indicators")
rsi6_res = input(title="RSI-6 period", type=input.resolution, defval="120", group="indicators")
rsi6_Len = input(14, minval=1, title="RSI-6 Length", group="indicators")
rsi7_res = input(title="RSI-7 period", type=input.resolution, defval="1D", group="indicators")
rsi7_Len = input(14, minval=1, title="RSI-7 Length", group="indicators")

longProfitPerc = input(title="Long Bot Take Profit (%)",
     type=input.float, minval=0.0, step=0.05, defval=0.5, group="Long Bot") * 0.01
st_long_orders = input(title="Long Bot Step orders (%)",
     type=input.float, minval=0.0, step=0.1, defval=2.0, group="Long Bot") * 0.01

rsi1_low = input(100, title="RSI-1 <", group="Long Bot")
rsi2_low = input(100, title="RSI-2 <", group="Long Bot")
rsi3_low = input(100, title="RSI-3 <", group="Long Bot")
rsi4_low = input(100, title="RSI-4 <", group="Long Bot")
rsi5_low = input(100, title="RSI-5 <", group="Long Bot")
rsi6_low = input(100, title="RSI-6 <", group="Long Bot")
rsi7_low = input(100, title="RSI-7 <", group="Long Bot")

shortProfitPerc = input(title="Short Bot Take Profit (%)",
     type=input.float, minval=0.0, step=0.05, defval=0.5, group="Short Bot") * 0.01
st_short_orders = input(title="Short Bot Step orders (%)",
     type=input.float, minval=0.0, step=0.1, defval=2.0, group="Short Bot") * 0.01

rsi1_up = input(0, title="RSI-1 >", group="Short Bot")
rsi2_up = input(0, title="RSI-2 >", group="Short Bot")
rsi3_up = input(0, title="RSI-3 >", group="Short Bot")
rsi4_up = input(0, title="RSI-4 >", group="Short Bot")
rsi5_up = input(0, title="RSI-5 >", group="Short Bot")
rsi6_up = input(0, title="RSI-6 >", group="Short Bot")
rsi7_up = input(0, title="RSI-7 >", group="Short Bot")

//indicators
rsi1 = rsi(src, rsi1_Len)
rsi1_sec = security(syminfo.tickerid, rsi1_res, rsi1)
rsi2 = rsi(src, rsi2_Len)
rsi2_sec = security(syminfo.tickerid, rsi2_res, rsi2)
rsi3 = rsi(src, rsi3_Len)
rsi3_sec = security(syminfo.tickerid, rsi3_res, rsi3)
rsi4 = rsi(src, rsi4_Len)
rsi4_sec = security(syminfo.tickerid, rsi4_res, rsi4)
rsi5 = rsi(src, rsi5_Len)
rsi5_sec = security(syminfo.tickerid, rsi5_res, rsi5)
rsi6 = rsi(src, rsi6_Len)
rsi6_sec = security(syminfo.tickerid, rsi6_res, rsi6)
rsi7 = rsi(src, rsi7_Len)
rsi7_sec = security(syminfo.tickerid, rsi7_res, rsi7)

//RSI
rsi1_up_signal = rsi1_sec > rsi1_up
rsi1_low_signal = rsi1_sec < rsi1_low
rsi2_up_signal = rsi2_sec > rsi2_up
rsi2_low_signal = rsi2_sec < rsi2_low
rsi3_up_signal = rsi3_sec > rsi3_up
rsi3_low_signal = rsi3_sec < rsi3_low
rsi4_up_signal = rsi4_sec > rsi4_up
rsi4_low_signal = rsi4_sec < rsi4_low
rsi5_up_signal = rsi5_sec > rsi5_up
rsi5_low_signal = rsi5_sec < rsi5_low
rsi6_up_signal = rsi6_sec > rsi6_up
rsi6_low_signal = rsi6_sec < rsi6_low
rsi7_up_signal = rsi7_sec > rsi7_up
rsi7_low_signal = rsi7_sec < rsi7_low


//Buy & Sell
Buy = rsi1_low_signal and rsi2_low_signal and rsi3_low_signal and rsi4_low_signal and rsi5_low_signal and rsi6_low_signal and rsi7_low_signal
Sell = rsi1_up_signal and rsi2_up_signal and rsi3_up_signal and rsi4_up_signal and rsi5_up_signal and rsi6_up_signal and rsi7_up_signal

// input into trading conditions
longOK  = (tradeDirection == "Long Bot")
shortOK = (tradeDirection == "Short Bot")

// in entry orders price
longEntryPrice1 = src_bot * (1 - (st_long_orders))
longEntryPrice2 = src_bot * (1 - (st_long_orders*2))
longEntryPrice3 = src_bot * (1 - (st_long_orders*3))
longEntryPrice4 = src_bot * (1 - (st_long_orders*4))
longEntryPrice5 = src_bot * (1 - (st_long_orders*5))
longEntryPrice6 = src_bot * (1 - (st_long_orders*6))
longEntryPrice7 = src_bot * (1 - (st_long_orders*7))
longEntryPrice8 = src_bot * (1 - (st_long_orders*8))
longEntryPrice9 = src_bot * (1 - (st_long_orders*9))
longEntryPrice10 = src_bot * (1 - (st_long_orders*10))
longEntryPrice11 = src_bot * (1 - (st_long_orders*11))
longEntryPrice12 = src_bot * (1 - (st_long_orders*12))
longEntryPrice13 = src_bot * (1 - (st_long_orders*13))
longEntryPrice14 = src_bot * (1 - (st_long_orders*14))
longEntryPrice15 = src_bot * (1 - (st_long_orders*15))
longEntryPrice16 = src_bot * (1 - (st_long_orders*16))
longEntryPrice17 = src_bot * (1 - (st_long_orders*17))
longEntryPrice18 = src_bot * (1 - (st_long_orders*18))
longEntryPrice19 = src_bot * (1 - (st_long_orders*19))

shortEntryPrice1 = src_bot * (1 + st_short_orders)
shortEntryPrice2 = src_bot * (1 + (st_short_orders*2))
shortEntryPrice3 = src_bot * (1 + (st_short_orders*3))
shortEntryPrice4 = src_bot * (1 + (st_short_orders*4))
shortEntryPrice5 = src_bot * (1 + (st_short_orders*5))
shortEntryPrice6 = src_bot * (1 + (st_short_orders*6))
shortEntryPrice7 = src_bot * (1 + (st_short_orders*7))
shortEntryPrice8 = src_bot * (1 + (st_short_orders*8))
shortEntryPrice9 = src_bot * (1 + (st_short_orders*9))
shortEntryPrice10 = src_bot * (1 + (st_short_orders*10))
shortEntryPrice11 = src_bot * (1 + (st_short_orders*11))
shortEntryPrice12 = src_bot * (1 + (st_short_orders*12))
shortEntryPrice13 = src_bot * (1 + (st_short_orders*13))
shortEntryPrice14 = src_bot * (1 + (st_short_orders*14))
shortEntryPrice15 = src_bot * (1 + (st_short_orders*15))
shortEntryPrice16 = src_bot * (1 + (st_short_orders*16))
shortEntryPrice17 = src_bot * (1 + (st_short_orders*17))
shortEntryPrice18 = src_bot * (1 + (st_short_orders*18))
shortEntryPrice19 = src_bot * (1 + (st_short_orders*19))

// take profit price
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// take profit values for confirmation
plot(series=(strategy.position_size > 0) ? longExitPrice : na,
     color=color.green, style=plot.style_circles,
     linewidth=3, title="Long Take Profit")
plot(series=(strategy.position_size < 0) ? shortExitPrice : na,
     color=color.red, style=plot.style_circles,
     linewidth=3, title="Short Take Profit")


// entry orders

if (strategy.position_size == 0)
    strategy.order(id="Long0", long=true, limit=src_bot, when=longOK and Buy)
	strategy.order(id="Long1", long=true, limit=longEntryPrice1, when=longOK and Buy)
	strategy.order(id="Long2", long=true, limit=longEntryPrice2, when=longOK and Buy)
	strategy.order(id="Long3", long=true, limit=longEntryPrice3, when=longOK and Buy)
	strategy.order(id="Long4", long=true, limit=longEntryPrice4, when=longOK and Buy)
	strategy.order(id="Long5", long=true, limit=longEntryPrice5, when=longOK and Buy)
	strategy.order(id="Long6", long=true, limit=longEntryPrice6, when=longOK and Buy)
	strategy.order(id="Long7", long=true, limit=longEntryPrice7, when=longOK and Buy)
	strategy.order(id="Long8", long=true, limit=longEntryPrice8, when=longOK and Buy)
	strategy.order(id="Long9", long=true, limit=longEntryPrice9, when=longOK and Buy)
	strategy.order(id="Long10", long=true, limit=longEntryPrice10, when=longOK and Buy)
	strategy.order(id="Long11", long=true, limit=longEntryPrice11, when=longOK and Buy)
	strategy.order(id="Long12", long=true, limit=longEntryPrice12, when=longOK and Buy)
	strategy.order(id="Long13", long=true, limit=longEntryPrice13, when=longOK and Buy)
	strategy.order(id="Long14", long=true, limit=longEntryPrice14, when=longOK and Buy)
	strategy.order(id="Long15", long=true, limit=longEntryPrice15, when=longOK and Buy)
	strategy.order(id="Long16", long=true, limit=longEntryPrice16, when=longOK and Buy)
	strategy.order(id="Long17", long=true, limit=longEntryPrice17, when=longOK and Buy)
	strategy.order(id="Long18", long=true, limit=longEntryPrice18, when=longOK and Buy)
	strategy.order(id="Long19", long=true, limit=longEntryPrice19, when=longOK and Buy)

if (strategy.position_size == 0)
    strategy.order(id="Short0", long=false, limit=src_bot, when=shortOK and Sell)
	strategy.order(id="Short1", long=false, limit=shortEntryPrice1, when=shortOK and Sell)
	strategy.order(id="Short2", long=false, limit=shortEntryPrice2, when=shortOK and Sell)
	strategy.order(id="Short3", long=false, limit=shortEntryPrice3, when=shortOK and Sell)
	strategy.order(id="Short4", long=false, limit=shortEntryPrice4, when=shortOK and Sell)
	strategy.order(id="Short5", long=false, limit=shortEntryPrice5, when=shortOK and Sell)
	strategy.order(id="Short6", long=false, limit=shortEntryPrice6, when=shortOK and Sell)
	strategy.order(id="Short7", long=false, limit=shortEntryPrice7, when=shortOK and Sell)
	strategy.order(id="Short8", long=false, limit=shortEntryPrice8, when=shortOK and Sell)
	strategy.order(id="Short9", long=false, limit=shortEntryPrice9, when=shortOK and Sell)
	strategy.order(id="Short10", long=false, limit=shortEntryPrice10, when=shortOK and Sell)
	strategy.order(id="Short11", long=false, limit=shortEntryPrice11, when=shortOK and Sell)
	strategy.order(id="Short12", long=false, limit=shortEntryPrice12, when=shortOK and Sell)
	strategy.order(id="Short13", long=false, limit=shortEntryPrice13, when=shortOK and Sell)
	strategy.order(id="Short14", long=false, limit=shortEntryPrice14, when=shortOK and Sell)
	strategy.order(id="Short15", long=false, limit=shortEntryPrice15, when=shortOK and Sell)
	strategy.order(id="Short16", long=false, limit=shortEntryPrice16, when=shortOK and Sell)
	strategy.order(id="Short17", long=false, limit=shortEntryPrice17, when=shortOK and Sell)
	strategy.order(id="Short18", long=false, limit=shortEntryPrice18, when=shortOK and Sell)
	strategy.order(id="Short19", long=false, limit=shortEntryPrice19, when=shortOK and Sell)

// exit position based on take profit price

if (strategy.position_size > 0)
    strategy.order(id="exit_Long", long=false, limit=longExitPrice, qty=strategy.position_size)

if (strategy.position_size < 0)
    strategy.order(id="exit_Short", long=true, limit=shortExitPrice, qty=abs(strategy.position_size))

```

> Detail

https://www.fmz.com/strategy/433030

> Last Modified

2023-11-23 17:50:13
