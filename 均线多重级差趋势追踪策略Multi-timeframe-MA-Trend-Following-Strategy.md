
> Name

均线多重级差趋势追踪策略Multi-timeframe-MA-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10292efb98de1ca2948.png)
[trans]

### 概述

该策略基于均线的多时间框架级差,追踪中长线趋势,采用级差仓位追涨模式,实现资金的指数增长。策略最大优势是能抓住中长线趋势,进行分批分阶段的追涨,从而获取超额收益。

### 策略原理  

1. 基于9日均线,100日均线和200日均线构建多时间框架。
2. 当短周期均线从下向上突破长周期均线时产生买入信号。
3. 采用7级差仓位追涨模式,每次开新仓时判断之前的仓位是否已满,如果已经有6个仓位了,则不再增仓。
4. 每个仓位设置固定止盈止损点为3%,进行风险控制。

以上就是该策略的基本交易逻辑。

### 策略优势

1. 能够有效抓住中长线趋势,最大程度享受行情的指数级增长。
2. 采用多时间周期均线进行级差,能够有效避免被短线市场噪音干扰。 
3. 设置固定止盈止损点,有效控制每个仓位的风险。
4. 采用级差追涨模式,分批建仓,能够把握趋势机会,获得超额收益。

### 策略风险及解决方法

1. 存在被终结的风险。如果行情出现转势,无法及时止损退出,可能面临巨额亏损。解决方法是缩短均线周期,加快止损速度。  
2. 存在仓位风险。如果突发事件导致亏损超过承受范围,会面临追加保证金或爆仓的风险。解决方法是适当减少初始仓位比例。
3. 存在亏损过大的风险。如果行情剧烈下跌,级差追涨转为空头,可能亏损高达700%以上。解决方法是加大固定止损比例,加快止损速度。

### 策略优化方向  

1. 可以测试不同参数的均线组合,寻找更优参数。  
2. 可以优化建仓的仓位数。测试不同的级差仓位数,找到最优解。
3. 可以测试固定止损止盈的设置。适当放大止盈范围,追求更高收益率。

### 总结

该策略总体来说非常适合捕捉行情中长线趋势,采用分批分阶段追涨的方式,能获得风险收益比极高的超额收益。同时也存在一定操作风险,需要通过调整参数等方法加以控制,在获利和风险之间找到平衡。总的来说,该策略非常值得实盘验证,根据实盘结果进一步调整优化。

||

### Overview  

This strategy is based on the multi-timeframe moving average crossover to track middle-long term trends. It adopts a pyramiding position to chase rises and achieve exponential capital growth. The biggest advantage is being able to catch the mid-long term trends and pyramid entries in batches and stages to obtain excess returns.

### Strategy Logic

1. Build multiple timeframes based on 9-day MA, 100-day MA and 200-day MA.  
2. Generate buy signals when shorter period MA crosses above longer period MA. 
3. Adopt 7 staged pyramiding entries. Check existing positions before adding new entry, stop pyramiding when 6 positions already opened.  
4. Set fixed 3% TP/SL for risk control.  

Above is the basic trading logic.  

### Advantages

1. Effectively catch mid-long term trends and enjoy exponential growth.
2. Multi-timeframe MA crossover avoids short-term noise.
3. Fixed TP/SL controls risk for each position. 
4. Pyramid entries in batches to obtain excess returns.

### Risks & Solutions

1. Risk of huge loss if fail to cut loss in trend reversal. Solution is to shorten MA periods and quicken stop loss.
2. Risk of margin call if loss beyond tolerance. Solution is to lower initial position size.  
3. Risk of over 700% loss if strong downtrend. Solution is to raise fixed stop loss percentage.

### Optimization Directions 

1. Test different MA combinations to find optimal parameters.
2. Optimize pyramiding stages quantity. Test to find best number.  
3. Test fixed TP/SL settings. Expand TP range for higher profitability.

### Summary

The strategy is very suitable to catch mid-long term trends. Pyramid entries in batches can achieve very high risk-reward ratio. There are also some operation risks, which should be controlled by parameter tuning. Overall this is a promising strategy worth live trading verification and further optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|9|MAfast|
|v_input_9|100|MAslow|
|v_input_10|200|MAlong|
|v_input_11|3|ProfitTarget_Percent|
|v_input_12|3|LossTarget_Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2024-01-03 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
    // © Coinrule
    
//@version=3
strategy(shorttitle='Pyramiding Entry On Early Trends',title='Pyramiding Entry On Early Trends (by Coinrule)', overlay=false, pyramiding= 7, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 20, commission_type=strategy.commission.percent, commission_value=0.1)
    
    
//Backtest dates
fromMonth = input(defval = 1,  title = "From Month")     
fromDay   = input(defval = 10,    title = "From Day")       
fromYear  = input(defval = 2020, title = "From Year")       
thruMonth = input(defval = 1,    title = "Thru Month")     
thruDay   = input(defval = 1,    title = "Thru Day")     
thruYear  = input(defval = 2112, title = "Thru Year")       
    
showDate  = input(defval = true, title = "Show Date Range")
    
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"
    
    
//MA inputs and calculations
inSignal=input(9, title='MAfast')
inlong1=input(100, title='MAslow')
inlong2=input(200, title='MAlong')
    
MAfast= sma(close, inSignal)
MAslow= sma(close, inlong1)
MAlong= sma(close, inlong2)
    
    
Bullish = crossover(close, MAfast) 
    
longsignal = (Bullish and MAfast > MAslow and MAslow < MAlong and window())
    
//set take profit
    
ProfitTarget_Percent = input(3)
Profit_Ticks = (close * (ProfitTarget_Percent / 100)) / syminfo.mintick
    
//set take profit
    
LossTarget_Percent = input(3)
Loss_Ticks = (close * (LossTarget_Percent / 100)) / syminfo.mintick
    
    
//Order Placing
    
strategy.entry("Entry 1", strategy.long, when = (strategy.opentrades == 0) and longsignal)
    
strategy.entry("Entry 2", strategy.long, when = (strategy.opentrades == 1) and longsignal)
        
strategy.entry("Entry 3", strategy.long, when = (strategy.opentrades == 2) and longsignal)
    
strategy.entry("Entry 4", strategy.long, when = (strategy.opentrades == 3) and longsignal)
    
strategy.entry("Entry 5", strategy.long, when = (strategy.opentrades == 4) and longsignal)
        
strategy.entry("Entry 6", strategy.long, when = (strategy.opentrades == 5) and longsignal)
        
strategy.entry("Entry 7", strategy.long, when = (strategy.opentrades == 6) and longsignal)
    
    
    
if (strategy.position_size > 0)
    strategy.exit(id="Exit 1", from_entry = "Entry 1", profit = Profit_Ticks, loss = Loss_Ticks)
    strategy.exit(id="Exit 2", from_entry = "Entry 2", profit = Profit_Ticks, loss = Loss_Ticks)
    strategy.exit(id="Exit 3", from_entry = "Entry 3", profit = Profit_Ticks, loss = Loss_Ticks)
    strategy.exit(id="Exit 4", from_entry = "Entry 4", profit = Profit_Ticks, loss = Loss_Ticks)
    strategy.exit(id="Exit 5", from_entry = "Entry 5", profit = Profit_Ticks, loss = Loss_Ticks)
    strategy.exit(id="Exit 6", from_entry = "Entry 6", profit = Profit_Ticks, loss = Loss_Ticks)
    strategy.exit(id="Exit 7", from_entry = "Entry 7", profit = Profit_Ticks, loss = Loss_Ticks)
     

```

> Detail

https://www.fmz.com/strategy/437684

> Last Modified

2024-01-04 17:43:17
