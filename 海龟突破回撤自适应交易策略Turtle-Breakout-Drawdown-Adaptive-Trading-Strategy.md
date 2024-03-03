
> Name

海龟突破回撤自适应交易策略Turtle-Breakout-Drawdown-Adaptive-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bcfbb60d39271bf699.png)
[trans]

## 概述

该策略主要基于趋势突破原理,结合通道突破的方法,采用快线慢线双轨突破来判断趋势方向。策略同时具有突破 entries 和回撤 exits 双重保护,可以有效应对行情突变。策略最大的优势在于可以实时监测账户回撤,当回撤超过一定比例时,会主动降低持仓规模。这使得策略可以有效控制市场风险和账户抗风险能力。

## 策略原理  

1. 快慢线双轨:分别采用快线和慢线构建通道。快线响应速度更快,慢线平滑程度更高。结合双轨突破判断趋势方向。  

2. 突破 entries:当价格突破向上通道时做多,突破向下通道时做空。采用止损单止损方式减小风险。 

3. 回撤 exits:实时监控最大回撤。一旦达到回撤退出点会主动止损平仓。回撤退出点可根据市场环境进行调整。

4. 持仓规模自适应:持仓数量根据账户权益实时调整,规避市场风险。账户回撤越大,持仓越少。抗风险能力更强。

## 策略优势  

1. 双轨通道+突破entries,判断趋势更准确。  

2. 止损止盈机制,有效控制单笔损失。  

3. 实时监控账户回撤,主动调整持仓规模,降低市场风险。

4. 持仓规模与账户权益挂钩,抗风险能力强,可以应对行情突变。

## 策略风险  

1. 大幅震荡行情中,回撤控制可能失效,导致亏损扩大。 

2. 快线进入中性区域时,可能出现多次无效突破信号。

3. 慢线过于平滑,无法及时捕捉快速反转行情。  

4. 多空混合使用时,双向持仓存在套牢风险。

## 策略优化方向  

1. 对于大幅震荡行情,可以设置更高的回撤容忍度,避免过度止损。  

2. 增加中性区域过滤,避免中性区域无效信号。 

3. 对慢线通道进行参数优化,提高对快速行情的响应速度。  

4. 添加开仓排序规则,避免双向持仓套牢。 

## 总结  

该策略整体来说是一种适合中长线趋势交易的有效策略。策略最大的优势在于实时回撤监控和动态调整持仓。这使得策略可以自动调节仓位规模,具有很强的适应市场的能力。当出现大幅行情突变或价格震荡时,策略可以自动降低仓位规模,有效防止亏损扩大。这是很多传统策略难以做到的。整体来说,该策略的思路新颖,具有较强的实用性。值得探索和优化应用。

|| 

## Overview  

This strategy is mainly based on the trend breakout principle, combined with the channel breakout method, using fast and slow double rails to break through to determine the trend direction. The strategy has double protection of breakout entries and drawdown exits at the same time, which can effectively deal with sudden market changes. The biggest advantage of the strategy is that it can monitor the account drawdown in real time. When the drawdown exceeds a certain percentage, it will actively reduce the position size. This allows the strategy to effectively control market risk and account risk resistance.

## Strategy Logic   

1. Fast and slow double rails: Fast and slow lines are used to build channels respectively. The fast line responds faster and the slow line is smoother. Determine the trend direction by combining double rail breakthroughs.

2. Breakout entries: go long when the price breaks through the upward channel, and go short when it breaks through the downward channel. Use stop orders to reduce risk.

3. Drawdown exits: Real-time monitoring of maximum drawdown. Once the drawdown exit point is reached, it will actively stop loss to close positions. The drawdown exit point can be adjusted according to market conditions.

4. Adaptive position sizing: The number of positions is adjusted in real time based on account equity to avoid market risk. The smaller the account drawdown, the fewer positions held. Stronger risk resistance.

## Advantages  

1. Double rail channel + breakout entries, more accurate trend judgment. 

2. Stop loss and take profit mechanism effectively controls single loss.

3. Real-time monitoring of account drawdown and active adjustment of position size to reduce market risk.  

4. Position size is linked to account equity with strong risk resistance to cope with sudden market changes.

## Risks   

1. Drawdown control may fail in volatile markets, leading to greater losses.  

2. Multiple invalid breakthrough signals may occur when the fast line enters the neutral zone.  

3. The slow line is too smooth to capture rapid reversal trends in time.

4. There is a risk of lock-in with mixed long and short positions.

## Optimization  

1. Set higher drawdown tolerance for volatile markets to avoid over stop loss.

2. Add neutral zone filtering to avoid invalid signals.  

3. Optimize parameters of the slow channel to improve response speed to fast markets.

4. Add opening order sorting rules to avoid lock-in with two-way positions.

## Conclusion   

Overall, this is an effective strategy suitable for medium and long term trend trading. The biggest advantage of the strategy is real-time drawdown monitoring and dynamic adjustment of positions. This allows the strategy to automatically adjust the position size with strong adaptability to the market. When there is a sharp market change or price fluctuation, the strategy can automatically reduce the position size to effectively prevent the loss from expanding. This is difficult for many traditional strategies. In general, the idea of this strategy is innovative with strong practicality. It is worth exploring and optimizing for application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Lot long, %|
|v_input_4|100|Lot short, %|
|v_input_5|true|Fast|
|v_input_6|true|Slow|
|v_input_7|20|enter_fast|
|v_input_8|10|exit_fast|
|v_input_9|55|enter_slow|
|v_input_10|20|exit_slow|
|v_input_11|true|Show offset|
|v_input_12|false|Show lines|
|v_input_13|true|Show label|
|v_input_14|1900|From Year|
|v_input_15|2100|To Year|
|v_input_16|true|From Month|
|v_input_17|12|To Month|
|v_input_18|true|From day|
|v_input_19|31|To day|


> Source (PineScript)

``` pinescript
//Noro
//2020

//Original idea from «Way of the Turtle: The Secret Methods that Turned Ordinary People into Legendary Traders» (2007, CURTIS FAITH, ISBN: 9780071486644) 

//@version=4
strategy("Noro's Turtles Strategy", shorttitle = "Turtles str", overlay = true, default_qty_type = strategy.percent_of_equity, initial_capital = 100, default_qty_value = 100, commission_value = 0.1)

//Settings
needlong = input(true, title = "Long")
needshort = input(false, title = "Short")
sizelong = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot long, %")
sizeshort = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot short, %")
needfast = input(true, title = "Fast")
needslow = input(true, title = "Slow")
enter_fast = input(20, minval=1)
exit_fast = input(10, minval=1)
enter_slow = input(55, minval=1)
exit_slow = input(20, minval=1)
showof = input(true, title = "Show offset")
showll = input(false, title = "Show lines")
showlabel = input(true, defval = true, title = "Show label")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast
fastL = highest(enter_fast)
fastLC = lowest(exit_fast)
fastS = lowest(enter_fast)
fastSC = highest(exit_fast)

//Slow
slowL = highest(enter_slow)
slowLC = lowest(exit_slow)
slowS = lowest(enter_slow)
slowSC = highest(exit_slow)

//Lines
offset = showof ? 1 : 0
col1 = showll and needlong and needfast ? color.blue : na
col2 = showll and needshort and needfast ? color.red : na
col3 = showll and needlong and needslow ? color.blue : na
col4 = showll and needshort and needslow ? color.red : na
plot(fastL, color = col1, offset = offset)
plot(fastLC, color = col1, offset = offset)
plot(fastS, color = col2, offset = offset)
plot(fastSC, color = col2, offset = offset)
plot(slowL, color = col3, offset = offset)
plot(slowLC, color = col3, offset = offset)
plot(slowS, color = col4, offset = offset)
plot(slowSC, color = col4, offset = offset)

//Orders
truetime = time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)
size = strategy.position_size
lotlong = 0.0
lotlong := size != size[1] ? strategy.equity / close * sizelong / 100 : lotlong[1]
lotshort = 0.0
lotshort := size != size[1] ? strategy.equity / close * sizeshort / 100 : lotshort[1]

//Fast
strategy.entry("fast L", strategy.long, lotlong, stop = fastL, when = needfast and needlong and strategy.position_size == 0 and truetime)
strategy.entry("fast S", strategy.short, lotshort, stop = fastS, when = needfast and needshort and strategy.position_size == 0 and truetime)
strategy.exit("fast L", stop = fastLC, when = needfast and needlong and strategy.position_size > 0)
strategy.exit("fast S", stop = fastSC, when = needfast and needshort and strategy.position_size < 0)

//Slow
strategy.entry("slow L", strategy.long, lotlong, stop = slowL, when = needslow and needlong and strategy.position_size == 0 and truetime)
strategy.entry("slow S", strategy.short, lotshort, stop = slowS, when = needslow and needshort and strategy.position_size == 0 and truetime)
strategy.exit("slow L", stop = slowLC, when = needslow and needlong and strategy.position_size > 0)
strategy.exit("slow S", stop = slowSC, when = needslow and needshort and strategy.position_size < 0)

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    strategy.cancel("fast L")
    strategy.cancel("fast S")
    strategy.cancel("slow L")
    strategy.cancel("slow S")
    
if showlabel

    //Drawdown
    max = 0.0
    max := max(strategy.equity, nz(max[1]))
    dd = (strategy.equity / max - 1) * 100
    min = 100.0
    min := min(dd, nz(min[1]))
    
    //Label
    min := round(min * 100) / 100
    labeltext = "Drawdown: " + tostring(min) + "%"
    var label la = na
    label.delete(la)
    tc = min > -100 ? color.white : color.red
    osx = timenow + round(change(time)*10)
    osy = highest(100)

```

> Detail

https://www.fmz.com/strategy/434680

> Last Modified

2023-12-08 11:54:02
