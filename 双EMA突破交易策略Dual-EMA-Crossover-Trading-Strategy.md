
> Name

双EMA突破交易策略Dual-EMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1889edd98f9a1e91cc2.png)

[trans]


## 概述

双EMA突破交易策略是一种利用两条不同周期的EMA均线进行买卖信号判断的趋势跟踪策略。该策略同时结合了额外的EMA指标进行交易信号过滤,可在趋势行情中获取较好的入场时机。

## 原理

该策略使用快线EMA(9周期)和慢线EMA(21周期)的金叉死叉来判断买入和卖出时机。当快线上穿慢线时产生买入信号,当快线下穿慢线时产生卖出信号。为了过滤假信号,策略还引入了辅助EMA(5周期)和另外两条EMA(1周期、4周期)。只有在快慢线发生金叉死叉的同时,辅助EMA处于快慢线之间,而且1周期EMA高于4周期EMA时,才会触发真正的交易信号。 

当交易信号触发后,策略会根据ATR值来设置止损位和止盈位。TP1为ATR的6倍,用于获取较快速度的部分利润。若价格未触发TP1,当快线EMA重新跨过辅助EMA时,会直接将仓位平掉,实现TP2止盈。

## 优势

- 使用双EMA组合过滤假信号,可提高交易信号质量
- 辅助EMA指标可进一步验证趋势方向,减少反向操作风险
- 双止盈设计,既可快速获利,也可持续跟踪趋势获利
- ATR动态止损止盈可根据市场波动性进行调整,降低风险

## 风险及优化

- EMA指标容易造成曲线拟合,交易信号可能滞后
- 短周期EMA组合可能产生更多噪音交易信号
- 短线操作易受突发事件影响,止损风险较大

优化方向:

- 测试多组EMA参数组合,寻找更优参数
- 增加其他指标验证,如交易量、波动率等
- 适当放宽止损范围,降低止损被触发概率
- 优化双止盈设置比例,平衡获利速度和资金利用效率

## 总结

双EMA突破交易策略利用两条EMA的交叉进行趋势判断,辅以多重EMA过滤及ATR动态止盈止损,可有效跟踪趋势获利。但EMA曲线拟合、止损风险等问题需要注意。通过参数优化、风险管理等措施,可以获得更稳定的交易表现。该策略适合有一定基础的交易者在趋势行情中使用,以获取较高的资金利用效率。

[/trans]


## Overview

The dual EMA crossover trading strategy utilizes two EMA lines of different periods to generate buy and sell signals by identifying trend direction. It also incorporates additional EMA indicators for signal filtering, allowing better entry timing in trending markets. 

## Principles

The strategy uses a fast EMA line (9 periods) and a slow EMA line (21 periods) to determine entries. A golden cross where the fast EMA crosses above the slow EMA generates a buy signal, while a death cross with the fast EMA crossing below the slow EMA produces a sell signal. To filter out false signals, the strategy also employs an auxiliary EMA (5 periods) and two more EMAs (1 period, 4 periods). A real trading signal is only triggered when the fast and slow EMAs cross while the auxiliary EMA is between the two, and the 1-period EMA is above the 4-period EMA.

Once a trading signal is triggered, the strategy utilizes ATR values to set stop loss and take profit levels. TP1 is set at 6 x ATR for faster profit taking. If price doesn't hit TP1, the strategy will close the position directly when the fast EMA crosses back over the auxiliary EMA, realizing TP2.

## Advantages

- Dual EMA design filters false signals and improves signal quality 
- Auxiliary EMA adds trend direction verification, reducing reverse trade risks
- Dual take profit allows fast profit and sustained trend following  
- Dynamic ATR stop loss/take profit adjusts to market volatility

## Risks and Improvements 

- EMAs can lag prices and generate late signals 
- Shorter EMA combos may produce more noise
- Tighter stops face larger sudden event risks

Improvement directions:

- Test multiple EMA combos for better parameters
- Add other confirmation indicators like volume, volatility etc.  
- Widen stop loss to lower stop out odds
- Optimize take profit ratios for profit vs capital efficiency

## Conclusion

The dual EMA crossover strategy leverages EMA crosses for trend direction, along with multiple EMA filtering and dynamic ATR stop loss/profit taking. This allows effective trend following and profit harvesting. However, EMA fitting limitations and stop loss risks require caution. Proper optimization, risk management etc. can lead to more robust performance. The strategy suits experienced traders to achieve high capital efficiency in trending markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast EMA|
|v_input_2|21|Slow EMA|
|v_input_3|5|Exit EMA|
|v_input_4|true|FastConf EMA|
|v_input_5|4|SlowConf EMA|
|v_input_6|0|What trades should be taken : : BOTH|SHORT|LONG|NONE|
|v_input_7|true|Stop Loss (ATR)|
|v_input_8|6|Take Profit 1 (ATR)|
|v_input_9|timestamp(01 Sep 2002 13:30 +0000)|Backtesting Start Time|
|v_input_10|timestamp(30 Sep 2099 19:30 +0000)|Backtesting End Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-09 00:00:00
end: 2023-04-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// @author ADHDCRYPT0

//@version=4
strategy(title = "EMA double crossover", shorttitle = "(TEST) double cross over", overlay = true, default_qty_value = 100, initial_capital = 1000,default_qty_type=strategy.percent_of_equity, pyramiding=0, process_orders_on_close=true)


// Variables
ema_len1 = input(9 , title="Fast EMA")
ema_len2 = input(21, title="Slow EMA")
ema_len3 = input(5, title="Exit EMA")
ema_len4 = input(1, title="FastConf EMA")
ema_len5 = input(4, title="SlowConf EMA")

fastEMA = ema(open, ema_len1)
slowEMA = ema(open, ema_len2)
exitEMA = ema(open, ema_len3)
conf1EMA = ema(open, ema_len4)
conf2EMA = ema(open, ema_len5)
plot(fastEMA, title='fastEMA', transp=0, color=color.green)
plot(slowEMA, title='slowEMA', transp=0, color=color.red  )
plot(exitEMA, title='exitEMA', transp=0, color=color.orange)
plot(conf1EMA, title='conf1EMA', transp=0, color=color.blue)
plot(conf2EMA, title='conf2EMA', transp=0, color=color.black)

vol = volume 
volma = sma(volume,7)
vol_cond = vol>volma

atr = atr(5)


// Entry Conditions and vol_cond
long = crossover(fastEMA, slowEMA) and (conf1EMA > conf2EMA) and (fastEMA < exitEMA)
short= crossunder(fastEMA, slowEMA) and (conf1EMA < conf2EMA) and (fastEMA > exitEMA)

tradeType = input("BOTH", title="What trades should be taken : ", options=["LONG", "SHORT", "BOTH", "NONE"])

pos = 0.0

if tradeType=="BOTH"
    pos:= long? 1 : short? -1 : pos[1]
if tradeType=="LONG"
    pos:= long? 1 : pos[1]
if tradeType=="SHORT"
    pos:=short? -1 : pos[1]

longCond  = long  and (pos[1]!= 1 or na(pos[1]))
shortCond = short and (pos[1]!=-1 or na(pos[1]))

// EXIT FUNCTIONS //
sl  = input(1, title="Stop Loss (ATR)", minval=0)
tp  = input(6, title="Take Profit 1 (ATR)", minval=0)

// Simple Stop Loss + 2 Take Profits
sl_long   =  valuewhen(longCond , low - atr * sl, 0)
sl_short  =  valuewhen(shortCond, high+ atr * sl, 0)

tp_long  = valuewhen(longCond , high + atr * tp, 0)
tp_short = valuewhen(shortCond, low  - atr * tp, 0)


long_exit = crossover(fastEMA, exitEMA) and pos[1]==1
short_exit= crossover(exitEMA, fastEMA) and pos[1]==-1

if long_exit or short_exit
	pos:=0


// Position Adjustment
long_sl  = low <sl_long [1] and pos[1]==1
short_sl = high>sl_short[1] and pos[1]==-1

if long_sl or short_sl
    pos:=0
    
//  Strategy Backtest Limiting Algorithm
i_startTime = input(defval = timestamp("01 Sep 2002 13:30 +0000"), title = "Backtesting Start Time", type = input.time)
i_endTime = input(defval = timestamp("30 Sep 2099 19:30 +0000"), title = "Backtesting End Time", type = input.time)
timeCond = true


// Make sure we are within the bar range, Set up entries and exit conditions
if strategy.equity >0
    strategy.entry("long" , strategy.long , when=longCond  and timeCond and tradeType!="SHORT" , alert_message="INSERT MESSAGE HERE")
    strategy.entry("short", strategy.short, when=shortCond and timeCond and tradeType!="LONG" , alert_message="INSERT MESSAGE HERE")
    
    strategy.exit("SL/TP1", from_entry = "long" , stop=sl_long , limit=tp_long , alert_message="INSERT MESSAGE HERE")
    strategy.exit("SL/TP1", from_entry = "short", stop=sl_short, limit=tp_short, alert_message="INSERT MESSAGE HERE")

    strategy.exit("SL", from_entry = "long" , stop=sl_long, alert_message="INSERT MESSAGE HERE")
    strategy.exit("SL", from_entry = "short", stop=sl_short, alert_message="INSERT MESSAGE HERE")
    
    strategy.close("long", when=long_exit , comment="TP2", alert_message="INSERT MESSAGE HERE")
    strategy.close("short", when=short_exit, comment="TP2", alert_message="INSERT MESSAGE HERE")

```

> Detail

https://www.fmz.com/strategy/429391

> Last Modified

2023-10-16 16:24:00
