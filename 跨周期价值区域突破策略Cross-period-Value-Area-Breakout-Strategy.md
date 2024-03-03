
> Name

跨周期价值区域突破策略Cross-period-Value-Area-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11f7335e1a172edba84.png)
[trans]

### 概述

本策略的核心思想是结合不同周期的RSI指标判断当前价格区域,发现较大周期RSI指标出现突破时,在较小周期采取相应的买入或卖出操作。该策略综合利用了不同周期技术指标的优势,通过多个时间维度判断当前价格的相对价值,寻找较优的入场点位。

### 策略原理  

本策略主要通过以下几个步骤判断价格区域并寻找交易机会:

1. 计算较大周期(例如日线)的RSI指标的最高点(Swing High)和最低点(Swing Low)
2. 判断较大周期RSI在给定回看周期内是否出现最高或最低点
3. 如果出现突破,则在较小周期(例如5分钟线)判断价格走势(多头或空头),采取相应的买入或卖出操作

例如,当日线RSI指标出现突破新高时,我们判断目前处于多头行情,而如果日线RSI出现突破新低时,则判断目前处于空头行情,在这两种情况下我们分别在5分钟线上采取买入和卖出操作。

### 优势分析

相比传统仅关注一个时间周期的策略,本策略具有以下几个优势:

1. 评估当前价格的相对价值更准确。日线等较大周期指标可以过滤短期市场噪音,判断大周期趋势和价值区域。

2. 结合不同时间周期指标,提高信号的可靠性。只依赖单一周期指标容易出现错误信号,而多个周期指标同步发出信号则更加可靠。

3. 更有效抓取短期机会。日线等大周期突破为我们指明大的方向,而我们只需要在5分钟等短周期寻找机会就可以获利。

4. 回撤更小。跨时间周期结合,有助于避免被套。当大周期指标发生转折时,我们将及时止损退出。

### 风险分析  

本策略的主要风险在于:

1. 大周期指标判断错误。当日线RSI等指标无法有效判断价值区域时,会导致信号产生错误。这需要优化RSI的参数设定。  

2. 小周期行情与大周期判断不符。有时候小周期价格走势会对抗大周期趋势,这时需要设定止损来控制损失。

3. 资金管理不当。如果风险管理不当,单次损失过大,会导致难以恢复。这需要合理设定仓位管理。

### 优化方向

本策略的优化空间还很大,主要可以从以下几个方面入手:  

1. 周期参数优化。可以测试更多的周期组合,寻找最佳参数。

2. RSI参数优化。可以调整RSI的参数看看是否可以提高判断准确性。

3. 增加其他指标。可以加入更多指标进行组合,例如加上均线判断趋势方向。  

4. 优化止损机制。可以根据回撤情况动态调整止损点。

5. 优化仓位管理。可以更科学合理的管理每次交易的具体仓位。

### 总结  

本策略通过评估跨周期的RSI指标看涨情况,实现不同时间维度之间的价值套利。这种跨周期判断的思路值得进一步挖掘,我们可以通过参数优化、止损优化、组合优化等方法不断完善,使得策略更具优势。总的来说,本策略具有独特的思路和很大的优化空间。

||

### Overview  

The core idea of this strategy is to determine the current price range by combining RSI indicators of different cycles, and to take corresponding buy or sell actions in smaller cycles when there is a breakout in larger cycle RSI. This strategy takes advantage of technical indicators across different periods to judge the relative value of current price from multiple time dimensions and locate better entry points.   

### Strategy Logic  

The main steps for this strategy to determine price range and find trading opportunities are:  

1. Calculate the RSI Swing High and Swing Low based on larger cycle (e.g. daily). 
2. Determine if the larger cycle RSI made a new high or low within the lookback period.  
3. If there is a breakout, judge the price trend (bullish or bearish) in smaller cycle (e.g. 5 min) and take corresponding buy or sell actions.   

For example, when the daily RSI breakout its previous high, we judge that it is currently a bull market. And when the daily RSI break below its previous low, we judge it as a bear market. Under both cases we take long and short actions respectively in the 5 min chart.    

### Advantage Analysis    

Compared with traditional strategies that only focus on one period, this strategy has the following advantages:   

1. More accurate assessment of current relative price value. Larger cycles like daily can filter out short-term market noise and determine overall trend and value area.  

2. Combining indicators across periods improves signal reliability. Relying solely on single period indicator can generate false signals more easily, while concurrent signals from multiple periods is more reliable.   

3. More effectively capitalizing short-term opportunities. Large cycle breakout points out overall direction, while we only need to locate opportunity in small cycles like 5 mins to profit.  

4. Smaller drawdowns. Combining cross periods helps avoid being trapped. We can exit quickly when large cycle indicators start to reverse.  

### Risk Analysis   

The main risks of this strategy lies in:  

1. Wrong judgement in large cycle indicators. Ineffective value area determination in daily RSI etc can lead to faulty signals. Parameter tuning of RSI is needed to improve accuracy.  

2. Divergence between small cycle price move and large cycle determination. Sometimes short-term moves counteract big picture trends. We need to set proper stop loss to control the loss.  

3. Improper risk management. Excessive loss in single trade due to poor position sizing could lead to unrecoverable drawdown. Reasonable sizing rules must be implemented.

### Optimization Directions   

There is still large room to improve this strategy, mainly from the following aspects:   

1. Period parameter tuning. Test more period combinations to find optimal parameters.  

2. RSI parameter tuning. Adjust RSI lookback etc parameters to improve judgement accuracy.
3. Add more indicators. Bring in more indicators like MA to assist judging trend direction.   
4. Improve stop loss mechanism. Dynamically adjust stop loss points based on drawdown conditions.
5. Optimize position sizing rules. Manage specific position sizes for each trade more scientifically.  

### Conclusion  

This strategy realizes cross period arbitrage between different time dimensions by assessing bullish condition in cross period RSIs. Such idea of cross period judgement deserves further exploitation. We can keep improving it via parameter tuning, stop loss optimization, indicator combinations to make it more advantageous. Overall speaking, this strategy has a unique idea and huge potential to be enhanced.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Look Back Period (2nd Timeframe)|
|v_input_2|180|Second Momentum Timeframe|
|v_input_3|true|Breaks in lines|
|v_input_4|11|Bars back to check for a swing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy("Swing MTF", shorttitle="Swing MTF", overlay=false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 10000, slippage = 5)
//
otf_period = input(defval=2, title="Look Back Period (2nd Timeframe)")
otf = input(defval="180", title="Second Momentum Timeframe")

// Function to dectect a new bar
is_newbar(res) =>
    t = time(res)
    change(t) != 0 ? true : false

// Check how many bars are in our upper timeframe
since_new_bar = barssince(is_newbar(otf))
otf_total_bars = na
otf_total_bars := since_new_bar == 0 ? since_new_bar[1] : otf_total_bars[1]

//Calculate RSI Values
ctf_rsi = rsi(open, otf_period)

breakline=input(title="Breaks in lines", defval = true, type=bool)

so = request.security(syminfo.tickerid, otf, rsi(open, otf_period))
sc = request.security(syminfo.tickerid, otf, rsi(close, otf_period))


final_otf_so = na
final_otf_so := barstate.isrealtime ? since_new_bar == otf_total_bars ? so : final_otf_so[1] : so

final_otf_sc = na
final_otf_sc := barstate.isrealtime ? since_new_bar == otf_total_bars ? sc : final_otf_sc[1] : sc

barsback = input(11, title='Bars back to check for a swing')
// showsig = input(false, title='Show Signal Markers')
 
swing_detection(index)=>
    swing_high = false
    swing_low = false
    start = (index*2) - 1 // -1 so we have an even number of
    swing_point_high = final_otf_so[index]
    swing_point_low = final_otf_sc[index]
    
    //Swing Highs
    for i = 0 to start
        swing_high := true
        if i < index 
            if final_otf_so[i] > swing_point_high 
                swing_high := false
                break
        // Have to do checks before pivot and after seperately because we can get
        // two highs of the same value in a row. Notice the > and >= difference
        if i > index
            if final_otf_so[i] >= swing_point_high 
                swing_high := false
                break
        
    //Swing lows
    for i = 0 to start
        swing_low := true
        if i < index
            if final_otf_sc[i] < swing_point_low 
                swing_low := false
                break  
        // Have to do checks before pivot and after seperately because we can get
        // two lows of the same value in a row. Notice the > and >= difference
        if i > index
            if final_otf_sc[i] <= swing_point_low 
                swing_low := false
                break 
        
    [swing_high, swing_low]
 
// Check for a swing
[swing_high, swing_low] = swing_detection(barsback)
 

long =  final_otf_so > final_otf_sc
short = final_otf_so < final_otf_sc

if swing_low and long
    strategy.entry("My Long Entry Id", strategy.long)


if swing_high and short
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/435088

> Last Modified

2023-12-12 10:58:22
