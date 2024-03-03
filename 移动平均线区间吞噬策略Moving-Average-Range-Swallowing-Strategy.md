
> Name

移动平均线区间吞噬策略Moving-Average-Range-Swallowing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dfe26570fa746231d5.png)
 [trans]

## 概述

移动平均线区间吞噬策略是一个基于移动平均线的趋势跟踪策略。它通过计算两条移动平均线的交叉来判断价格趋势,并结合区间管理来追踪趋势,实现盈利。

## 策略原理

该策略使用两条移动平均线:快线和慢线。快线参数较小,响应价格变化更加敏感;慢线参数较大,趋势判断更可靠。当快线从下方上穿慢线时,做多;当快线从上方下穿慢线时,做空。 

另外,该策略引入多条辅助移动平均线,用来判断主要趋势方向,避免出现错配。此外,还使用Highest和Lowest函数结合ATR来计算动态止损,锁定盈利。

对每笔交易,该策略可以选择固定数量下单,或者按照参数设定的最大损失百分比动态计算仓位。后者可以使每笔交易的风险控制在一定范围内。

## 优势分析

- 利用双移动平均线系统,可以有效跟踪价格趋势
-  introdu多条辅助均线和方向过滤条件,可以减少噪音交易
- 动态计算止损位和调整仓位,可以限制每笔交易的最大损失
- 仓位管理系统能够指数增长盈利,而最大回撤控制在一定范围内

## 风险分析

- 双移动平均线策略容易在盘整期被套利
- 辅助均线和过滤器条件可能错过部分交易机会
- 市场剧烈波动时,止损可能被突破,造成较大损失
- 仓位过大时,极端行情可能造成巨额损失

可以通过优化移动平均线的参数,调整辅助均线的权重,修改止损幅度等方法来减小这些风险。同时严格控制仓位管理规则,降低单笔损失的影响。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 测试更多类型的移动平均线组合,寻找最优参数
2. 添加趋势强度指标,避免趋势逆转造成损失
3. 研究自适应止损算法,使止损更加智能化
4. 优化仓位管理方案,在盈利和风险之间取得平衡

## 总结

移动平均线区间吞噬策略总体来说是一个非常实用的量化交易策略。它同时兼具趋势跟踪和风险控制的优点,适合长线持仓。通过参数调整和功能扩展的优化,可以使该策略更加稳健和智能化,从而获得更持续的盈利能力。

||

## Overview

The Moving Average Range Swallowing Strategy is a trend following strategy based on moving averages. It determines price trends by calculating crossovers between two moving averages and uses range management to track trends for profit.

## Strategy Logic

The strategy uses two moving averages: a fast line and a slow line. The fast line has a smaller parameter and is more sensitive to price changes. The slow line has a larger parameter and determines trends more reliably. It goes long when the fast line crosses above the slow line, and goes short when the fast line crosses below the slow line.

It also introduces multiple auxiliary moving averages to judge the main trend direction to avoid mismatches. In addition, it uses the Highest and Lowest functions together with ATR to calculate dynamic stop loss to lock in profits.

For each trade, the strategy can choose to place orders with a fixed quantity or dynamically calculate the position size based on the maximum loss percentage set in parameters. The latter can keep the risk of each trade within a certain range.   

## Advantage Analysis  

- The dual moving average system can effectively track price trends
- Auxiliary moving averages and directional filters reduce noise trades  
- Dynamic stop loss and position sizing limit max loss per trade
- Position sizing system enables exponential profit growth while capping drawdowns

## Risk Analysis

- Double MA strategies tend to experience consolidation pinch
- Auxiliary MAs and filters may miss some trading opportunities  
- Stop loss may be penetrated during extreme volatility leading to large losses
- Excessive position sizes during extreme moves can lead to huge losses

These risks can be reduced by optimizing MA parameters, adjusting weights of auxiliary MAs, modifying stop loss ranges etc. In addition, strict position sizing rules minimize damage from single trade losses.   

## Optimization Directions

The strategy can be optimized in the following aspects:  

1. Test more combinations of moving averages to find optimum parameters
2. Add trend strength indicators to avoid losses from trend reversals  
3. Research adaptive stop loss algorithms to make stops more intelligent
4. Optimize position sizing schemes to balance profitability and risk  

## Summary  

Overall, the Moving Average Range Swallowing Strategy is a very practical quantitative trading strategy. It combines both trend following and risk control capabilities, suitable for long term holdings. By optimizing parameters and functionality, the strategy can be made more robust and intelligent for sustained profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Strategy Direction|
|v_input_2|false|Position Management|
|v_input_3|5|Risk Per Trade % (for PSMGMT)|
|v_input_4|true|Use Swing Lo/Hi Stop Loss & Take Profit|
|v_input_5|10|Swing Lo/Hi Lookback|
|v_input_6|false|SL Expander|
|v_input_7|false|Use MA4 as Bull / Bear filter|
|v_input_8|false|----------------MA Selector-----------------|
|v_input_9|9|MA1 Period|
|v_input_10|0|MA1 Type: EMA|SMA|RMA|WMA|HMA|ALMA|
|v_input_11|21|MA2 Period|
|v_input_12|0|MA2 Type: EMA|SMA|RMA|WMA|HMA|ALMA|
|v_input_13|50|MA3 Period|
|v_input_14|0|MA3 Type: SMA|RMA|EMA|WMA|HMA|ALMA|
|v_input_15|100|MA4 Period|
|v_input_16|0|MA4 Type: SMA|RMA|EMA|WMA|HMA|ALMA|
|v_input_17|0|x: close|MA2|MA3|MA4|MA1|
|v_input_18|0|y: MA1|MA2|MA3|MA4|close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// This is a simple crossover Moving Average strategy, good for long term crypto trades. 
// It buys when the MA "X" crosses up the MA "Y", viceversa for shorts. 
// Both MAs are selectable from the Inputs section in the front panel. 
// There is also a Position Management option thats 
// sizes positions to have the same USD risk (using leverage) on each trade,
// based on the percentage distance to the stop loss level.
// If you turn this option on you will see how the profit 
// grows exponentially while the drawdown percentage almost remains the same.

strategy("4 MA Strat", overlay=true, pyramiding=1, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, 
     commission_value = 0.04, 
     initial_capital=100, 
     process_orders_on_close=false)

direction = input(0, title = "Strategy Direction", type=input.integer, minval=-1, maxval=1)
strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

//Inputs
PSMGMT=input(defval=false, title="Position Management")
risk_per_trade=input(defval=5, title="Risk Per Trade % (for PSMGMT)", step=0.5)*.01

//SL & TP Inputs
i_SL=input(true, title="Use Swing Lo/Hi Stop Loss & Take Profit")
i_SwingLookback=input(10, title="Swing Lo/Hi Lookback")
i_SLExpander=input(defval=0, step=1, title="SL Expander")

i_MAFilter=input(false, title="Use MA4 as Bull / Bear filter")

//MA Type Selector
MAtype = input(false, title="----------------MA Selector-----------------")
MA1Period = input(9, title="MA1 Period")
MA1Type = input(title="MA1 Type", defval="EMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "ALMA"])
MA2Period = input(21, title="MA2 Period")
MA2Type = input(title="MA2 Type", defval="EMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "ALMA"])
MA3Period = input(50, title="MA3 Period")
MA3Type = input(title="MA3 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "ALMA"])
MA4Period = input(100, title="MA4 Period")
MA4Type = input(title="MA4 Type", defval="SMA", options=["RMA", "SMA", "EMA", "WMA", "HMA", "ALMA"])

//MA Selector 
MA1 = if MA1Type == "SMA"
    sma(close, MA1Period)
else
    if MA1Type == "EMA"
        ema(close, MA1Period)
    else
        if MA1Type == "WMA"
            wma(close, MA1Period)
        else
            if MA1Type == "RMA"
                rma(close, MA1Period)
            else
                if MA1Type == "HMA"
                    hma(close, MA1Period)
                else
                    if MA1Type == "ALMA"
                        alma(close, MA1Period, 0.85, 6)
                    
MA2 = if MA2Type == "SMA"
    sma(close, MA2Period)
else
    if MA2Type == "EMA"
        ema(close, MA2Period)
    else
        if MA2Type == "WMA"
            wma(close, MA2Period)
        else
            if MA2Type == "RMA"
                rma(close, MA2Period)
            else
                if MA2Type == "HMA"
                    hma(close, MA2Period)
                else
                    if MA2Type == "ALMA"
                        alma(close, MA2Period, 0.85, 6)
                            
MA3 = if MA3Type == "SMA"
    sma(close, MA3Period)
else
    if MA3Type == "EMA"
        ema(close, MA3Period)
    else
        if MA3Type == "WMA"
            wma(close, MA3Period)
        else
            if MA3Type == "RMA"
                rma(close, MA3Period)
            else
                if MA3Type == "HMA"
                    hma(close, MA3Period)
                else
                    if MA3Type == "ALMA"
                        alma(close, MA3Period, 0.85, 6)
                    
MA4 = if MA4Type == "SMA"
    sma(close, MA4Period)
else
    if MA4Type == "EMA"
        ema(close, MA4Period)
    else
        if MA4Type == "WMA"
            wma(close, MA4Period)
        else
            if MA4Type == "RMA"
                rma(close, MA4Period)
            else
                if MA4Type == "HMA"
                    hma(close, MA4Period)
                else
                    if MA4Type == "ALMA"
                        alma(close, MA4Period, 0.85, 6)
                    
// X Y Logic
x=input(title="x", defval="close", options=["MA1", "MA2", "MA3", "MA4", "close"])
y=input(title="y", defval="MA1", options=["MA1", "MA2", "MA3", "MA4", "close"])

X = if x == "MA1"
    MA1
else
    if x == "MA2"
        MA2
    else
        if x == "MA3"
            MA3
        else
            if x == "MA4"
                MA4
            else
                if x == "close"
                    close
                    
Y = if y == "MA1"
    MA1
else
    if y == "MA2"
        MA2
    else
        if y == "MA3"
            MA3
        else
            if y == "MA4"
                MA4
            else
                if y == "close"
                    close

//SL & TP Calculations
SwingLow=lowest(i_SwingLookback)
SwingHigh=highest(i_SwingLookback)
bought=strategy.position_size != strategy.position_size[1]
LSL=valuewhen(bought, SwingLow, 0)-((valuewhen(bought, atr(14), 0)/5)*i_SLExpander)
SSL=valuewhen(bought, SwingHigh, 0)+((valuewhen(bought, atr(14), 0)/5)*i_SLExpander)
islong=strategy.position_size > 0
isshort=strategy.position_size < 0
SL= islong ? LSL : isshort ? SSL : na

//Position Management Calculations
capital=strategy.equity
distance_to_long_stop_loss=1-(LSL/strategy.position_avg_price)
distance_to_short_stop_loss=(SSL/strategy.position_avg_price)-1
PS=(capital*risk_per_trade)/distance_to_long_stop_loss
SPS=(capital*risk_per_trade)/distance_to_short_stop_loss
PSqty=PS/close
SPSqty=SPS/close

//Strategy Calculations
MAFilter=close > MA4
BUY = crossover(X , Y) 
SELL = crossunder(X , Y) 
BUY2 = crossover(X , Y) and MAFilter
SELL2 = crossunder(X , Y) and not MAFilter

//Entries
strategy.entry("long", true, qty=PSMGMT ? PSqty : na, when=not i_MAFilter ? BUY : BUY2)
strategy.entry("short", false, qty=PSMGMT ? SPSqty : na, when=not i_MAFilter ? SELL : SELL2)

//Exits
if i_SL //and SL != na
    strategy.exit("longexit", "long", stop=LSL)
    strategy.exit("shortexit", "short", stop=SSL)
if i_MAFilter
    strategy.close("long", when=SELL)
    strategy.close("short", when=BUY)


//Plots
plot(i_SL ? SL : na, color=color.red, style=plot.style_cross, title="SL")
plot(MA1, color=color.green, linewidth=1, title="MA1")
plot(MA2, color=color.yellow, linewidth=2, title="MA2")
plot(MA3, color=color.red, linewidth=3, title="MA3")
plot(MA4, color=color.white, linewidth=3, title="MA4")
plotshape(BUY ? 1 : na, style=shape.triangleup, location=location.belowbar, color=color.green, title="Bullish Setup")
plotshape(SELL ? 1 : na, style=shape.triangledown, location=location.abovebar, color=color.red, title="Bearish Setup")


//Debugging Plots
plot(LSL, transp=100, title="SwingLow")
plot(bought ? 1:0, transp=100, title="bought")
plot(PSqty, title="PSqty", transp=100)
plot(SPSqty, title="SPSqty", transp=100)
plot(PS, title="PS", transp=100)
plot(SPS, title="SPS", transp=100)
plot(distance_to_long_stop_loss, title="distance to LSL", transp=100)
plot(distance_to_short_stop_loss, title="distance to SSL", transp=100)
plot(capital, title="equity", transp=100)
```

> Detail

https://www.fmz.com/strategy/439223

> Last Modified

2024-01-18 14:56:24
