
> Name

双均线交叉交易策略Double-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

双均线交叉交易策略通过计算两条不同参数设置的均线,并通过均线的交叉进行买入和卖出操作。该策略简单直接,适合中短期交易。

### 策略原理

该策略主要通过输入快速均线周期、慢速均线周期、均线类型等参数,计算快速均线和慢速均线。当快速均线上穿慢速均线时,进行买入操作;当快速均线下穿慢速均线时,进行卖出操作。

该策略的核心逻辑是:

1. 输入参数:快速均线周期maLen1,慢速均线周期maLen2,均线类型maTypeChoice

2. 根据输入参数计算快速均线maValue1和慢速均线maValue2

3. 比较两条均线大小关系,定义买入和卖出条件:

    - 买入条件:maValue1上穿maValue2

    - 卖出条件:maValue1下穿maValue2

4. 在买入和卖出条件成立时,进行相应的交易操作

5. 可视化显示均线,并用不同颜色区分均线大小关系

6. 发送买入和卖出信号提示

### 策略优势

- 使用双均线交叉原理,避免被单一均线震荡误导

- 均线参数可调,可适应不同周期操作

- 交易逻辑简单直接,容易理解实现

- 可自定义买入卖出信号提示,实时掌握交易时机

- 可视化显示均线走势,形成直观交易指标

- 可通过参数优化找到最佳参数组合

- 可用于回测寻找最优参数,也可用于实盘交易

### 策略风险

- 均线交叉容易产生错误信号,应结合趋势和形态进行判断

- 双均线震荡时,容易频繁开仓造成交易费用损失

- 参数不当可导致过于频繁或不频繁交易

- 突发事件可能导致剧烈行情,无法止损

- 大周期突破时,短周期指标可能失效

- 需要频繁监控,无法全自动实现

风险解决方法:

- 结合趋势指标,避免震荡劈头交易

- 结合形态指标,确认信号有效性

- 优化参数,使交易频率达到合理水平

- 设置止损止盈点,控制单笔损失

- 多时间段验证参数稳定性

- 采用时间或信号过滤,避免假突破

### 策略优化方向 

- 测试不同均线参数,寻找最优参数

- 测试不同均线类型,选择产生信号最准确的均线

- 结合趋势指标,避免不顺趋势交易

- 结合波动指标,判断合适出场时机

- 加入时间或信号过滤,减少错误信号

- 设置滑点控制,优化实盘交易效果

- 多品种多周期验证稳定性

- 加入自动止损止盈策略

- 探索机器学习等技术提升回测效果

### 总结

双均线交叉策略是一个非常典型的技术指标策略。它利用快慢均线交叉原理产生交易信号,通过参数优化可以获得不错的回测结果。但该策略也存在一定的风险,需要配合趋势、形态等其他技术指标来进行验证,降低错误信号率。此外,实盘交易中还需要考虑滑点控制等交易细节。总体来说,双均线交叉策略适合中短期操作,是理解和实现简单的首选交易策略之一。通过不断优化和验证,可以将该策略运用于实盘,获得稳定收益。

|| 

### Overview

The double moving average crossover trading strategy generates trading signals by calculating two moving averages with different parameter settings and trading when the moving averages cross over. This simple and straightforward strategy is suitable for medium-term trading.

### Strategy Logic

The core logic of this strategy is:

1. Input parameters: faster MA period maLen1, slower MA period maLen2, MA type maTypeChoice

2. Calculate faster MA maValue1 and slower MA maValue2 based on input parameters 

3. Define buy and sell conditions by comparing the two MAs:

    - Buy when maValue1 crosses above maValue2
    
    - Sell when maValue1 crosses below maValue2
    
4. Execute trades at buy and sell signals

5. Visualize MAs in different colors based on their relationship

6. Send buy and sell alert signals 

### Advantages

- Utilizes dual MA crossover system, avoids false signals from single MA

- Customizable MA periods suit different trading horizons 

- Simple and straightforward logic, easy to understand and implement

- Customizable signal alerts for timely execution

- Visualized MA trends form intuitive trading indicator

- Optimizable parameters to find best combination 

- Applicable for backtesting and live trading

### Risks

- MA crosses may generate false signals, need extra trend and pattern confirmation

- Whipsaws around MA crossover incur unnecessary trading costs

- Improper parameters lead to over-trading or sparse trading

- Extreme events cause huge price swings, unable to limit losses

- Long-term trend breaks invalidate short-term indicators 

- Requires frequent monitoring, not fully automatable

Risk Management:

- Add trend filter to avoid trading against trend 

- Add pattern filter to confirm signal validity

- Optimize parameters for reasonable trading frequency

- Set stop loss/take profit to limit losses

- Robustness test across long time frames

- Price and time filters to avoid false breakouts

### Optimization Directions

- Test different MA parameters to find optimum

- Test different MA types for most accurate signals

- Add trend filter to avoid counter-trend trades

- Add volatility filter to identify proper exit points

- Add price/time filter to reduce false signals

- Implement slippage control for real trading

- Robustness test across instruments and timeframes

- Integrate auto stop loss/take profit

- Explore machine learning to improve strategy

### Conclusion

The dual moving average crossover is a classic technical indicator strategy. It generates signals from MA crosses and can produce good backtest results through optimization. However, risks like false signals remain, requiring additional filters. Real trading also needs execution details like slippage control. Overall, the strategy suits medium-term trading as a simple and intuitive choice. With continuous improvements and robustness validation, this strategy can achieve stable returns in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|MA Type: EMA|WMA|SMA|
|v_input_2_close|0|MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|15|MA Length|
|v_input_4|95|MA Length|
|v_input_5|true|(?Strategy Tester)Strategy Tester [ON/OFF]|
|v_input_6|2200-1200|Daily trading time session (in Exchange GMT)|
|v_input_7|2200-2201|Start Time|
|v_input_8|2500|Max daily loss|
|v_input_9|12000|Max daily loss|
|v_input_10|true|Contract size|
|v_input_11|true|First trade on session start [ON/OFF]|
|v_input_12|false|Fixed TP/SL PIPS [ON/OFF]|
|v_input_13|10|TP|
|v_input_14|10|SL|
|v_input_15|true|(?Date Range)From Day|
|v_input_16|true|From Month|
|v_input_17|2020|From Year|
|v_input_18|true|Thru Day|
|v_input_19|true|Thru Month|
|v_input_20|2112|Thru Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-05 00:00:00
end: 2023-10-05 22:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// © sehweijun
//study( title="Arch1tect's New Toy", shorttitle="Arch1tect's New Toy", overlay=true, resolution="")
// strategy( title="Arch1tect's New Toy (Strategy Tester Version)", shorttitle="Arch1tect's New Toy (Strategy Tester Version)", overlay=true, initial_capital = 100000, commission_value=0.07, commission_type=strategy.commission.cash_per_contract)

maTypeChoice = input( "EMA", title="MA Type", options=["EMA", "WMA", "SMA"] )
maSrc = input( close, title="MA Source" )
maLen1 = input( 15, minval=1, title="MA Length" )
maLen2 = input( 95, minval=1, title="MA Length" )

maValue1 = if ( maTypeChoice == "EMA" )
    ema( maSrc, maLen1 )
else if ( maTypeChoice == "WMA" )
    wma( maSrc, maLen1 )
else if ( maTypeChoice == "SMA" )
    sma( maSrc, maLen1 )
else
    0
    
maValue2 = if ( maTypeChoice == "EMA" )
    ema( maSrc, maLen2 )
else if ( maTypeChoice == "WMA" )
    wma( maSrc, maLen2 )
else if ( maTypeChoice == "SMA" )
    sma( maSrc, maLen2 )
else
    0

buySignal = crossover( maValue1, maValue2 )
sellSignal = crossunder( maValue1, maValue2 )

mainMAColour = ( maValue1 > maValue2 ) ? color.green : color.red 

plot( maValue1, title="Arch1tect's New Toy", color=mainMAColour, offset=0, linewidth=4 )
//plot( maValue2, title="Arch1tect's Filter", color=color.black, offset=0, linewidth=2 )

var color buyCandleColour = #00ff0a
var color sellCandleColour = #ff1100

barcolor( buySignal ? buyCandleColour : sellSignal ? sellCandleColour : na, title="Signal Bar Colour" )
bgcolor( color=buySignal ? buyCandleColour : sellSignal ? sellCandleColour : na, transp=85, title="Signal Background Colour")

alertcondition( buySignal or sellSignal, title="Signal change!", message="Signal change!")
alertcondition( buySignal, title="Buy signal!", message="Buy signal!")
alertcondition( sellSignal, title="Sell signal!", message="Sell signal!")

// Strategy Tester
stratTesterOn    = input( title="Strategy Tester [ON/OFF]", group="Strategy Tester", type=input.bool, defval=true)
entryTime        = input( "2200-1200", title = "Daily trading time session (in Exchange GMT)", group="Strategy Tester", type = input.session )
startTime        = input( "2200-2201", title = "Start Time", group="Strategy Tester", type = input.session )
maxDailyLoss     = input( 2500, title = "Max daily loss", group="Strategy Tester", type = input.integer )
maxTotalDrawdown = input( 12000, title = "Max daily loss", group="Strategy Tester", type = input.integer )
contractSize     = input( 1, title = "Contract size", group="Strategy Tester", type = input.integer )

tradeOnStartSess = input( title="First trade on session start [ON/OFF]", group="Strategy Tester", type=input.bool, defval=true)

fixedTPSL        = input( title="Fixed TP/SL PIPS [ON/OFF]", group="Strategy Tester", type=input.bool, defval=false)
fixedTPValue     = input ( 10.00, minval=0.01, type=input.float, title="TP", group="Strategy Tester" )
fixedSLValue     = input ( 10.00, minval=0.01, type=input.float, title="SL", group="Strategy Tester" )

fromDay          = input(defval = 1,    title = "From Day", group="Date Range", type = input.integer, minval = 1, maxval = 31)
fromMonth        = input(defval = 1,    title = "From Month", group="Date Range", type = input.integer, minval = 1, maxval = 12)
fromYear         = input(defval = 2020, title = "From Year", group="Date Range", type = input.integer, minval = 1970)
thruDay          = input(defval = 1,    title = "Thru Day", group="Date Range", type = input.integer, minval = 1, maxval = 31)
thruMonth        = input(defval = 1,    title = "Thru Month", group="Date Range", type = input.integer, minval = 1, maxval = 12)
thruYear         = input(defval = 2112, title = "Thru Year", group="Date Range", type = input.integer, minval = 1970)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"

// strategy.risk.max_intraday_loss( maxDailyLoss, strategy.cash )
// strategy.risk.max_drawdown( maxTotalDrawdown, strategy.cash )

isTime(_position) =>
    range = time( timeframe.period, _position + ':1234567' )
bgcolor( color=isTime( entryTime ) and stratTesterOn and window() ? color.yellow : na, title="Daily trading time session (in Exchange GMT)", transp=75 )

if ( stratTesterOn and window() )
    if ( buySignal and isTime( entryTime ) )
        if ( not fixedTPSL )
            strategy.close_all()
            strategy.entry( "Buy", strategy.long, contractSize )
        
        if ( fixedTPSL and strategy.position_size == 0 )
            strategy.entry( "Buy", strategy.long, contractSize )
            strategy.exit( "TP/SL", "Buy", stop=close[0]-fixedSLValue, limit=close[0]+fixedTPValue )
        
    if ( sellSignal and isTime( entryTime ))
        if ( not fixedTPSL )
            strategy.close_all()
            strategy.entry( "Sell", strategy.short, contractSize )
        
        if ( fixedTPSL and strategy.position_size == 0  )
            strategy.entry( "Sell", strategy.short, contractSize )
            strategy.exit( "TP/SL", "Sell", stop=close[0]+fixedSLValue, limit=close[0]-fixedTPValue )
    
    if ( isTime( startTime ) and tradeOnStartSess and strategy.position_size == 0 )
        if ( maValue1 > maValue2 )
            strategy.entry( "Buy", strategy.long, contractSize )
            
            if ( fixedTPSL )
                strategy.exit( "TP/SL", "Buy", stop=close[0]-fixedSLValue, limit=close[0]+fixedTPValue )
        else
            strategy.entry( "Sell", strategy.short, contractSize ) 
            
            if ( fixedTPSL )
                strategy.exit( "TP/SL", "Sell", stop=close[0]+fixedSLValue, limit=close[0]-fixedTPValue )
    
    strategy.close_all( when=not isTime( entryTime ) )

plot( strategy.equity )
```

> Detail

https://www.fmz.com/strategy/429147

> Last Modified

2023-10-13 15:40:49
