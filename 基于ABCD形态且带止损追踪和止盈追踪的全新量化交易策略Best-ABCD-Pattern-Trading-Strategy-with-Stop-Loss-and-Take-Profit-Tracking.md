
> Name

基于ABCD形态且带止损追踪和止盈追踪的全新量化交易策略Best-ABCD-Pattern-Trading-Strategy-with-Stop-Loss-and-Take-Profit-Tracking

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a75f9643f0b0d15320.png)
[trans]
### 一、策略概述

该策略名称为“最佳ABCD形态交易策略(带止损追踪和止盈追踪)”。它是一个基于明确的ABCD价格形态模型进行交易操作的量化策略。主要思想是识别出完整的ABCD形态模型后,根据形态的方向做多做空,并设置止损和止盈追踪来管理头寸。

### 二、策略原理  

1. 使用布林辅助判断法识别价格的顶底分型点,得到价格的ZigZag曲线。

2. 在ZigZag曲线上识别完整的ABCD形态模型,A、B、C、D四点需满足一定的比例关系。识别到符合条件的ABCD形态后,做多或做空。

3. 做多做空后设置止损追踪来控制风险。止损开始时使用固定止损,当盈利达到一定比例后转为移动止损以锁定部分利润。

4. 同样,对止盈线也进行追踪设置,以在获得足够利润后及时止盈,避免利润回吐。止盈追踪也分两阶段,先使用固定止盈获取部分利润,之后转为移动止盈继续追踪价格。

5. 当价格触发移动止损或止盈时,平掉头寸,完成一次交易循环。

### 三、策略优势分析  

1. 使用布林辅助判断法识别ZigZag曲线,避免了传统ZigZag曲线的回溯问题,使交易信号更可靠。

2. ABCD形态交易模型成熟稳定,交易机会比较充裕。并且ABCD形态方向明确,容易判断入市方向。

3. 设置两阶段的止损止盈追踪,可以更好的控制风险和获得利润。移动止损止盈让策略适应更加灵活。

4. 策略参数设计合理,止损止盈百分比、移动启动百分比都可以自定义,使用起来很灵活。

5. 该策略可用于任何品种,包括外汇、加密货币和股票指数等。

### 四、策略风险分析  

1. ABCD形态虽然较为明确,但交易机会相对有限,不能保证足够的交易频率。

2. 在震荡行情中,可能出现止损止盈频繁被触发的情况。这时需要适当调整参数,扩大止损止盈范围。

3. 需要关注交易品种本身的流动性。流动性较差的标的,止损止盈难以准确执行。

4. 策略对交易成本比较敏感,需要选择手续费低廉的券商和账户。

5. 部分参数可以继续优化,比如移动止损和止盈的启动条件可以测试更多取值,找到最佳点位。

### 五、策略优化方向  

1. 可以结合其他指标,设置更多过滤条件,避免部分HW形态。这可以减少无效交易的出现。

2. 增加对市场三段式结构的判断,只在第三段行情中寻找交易机会。这可以提高策略胜率。  

3. 测试优化起始资金规模,找到最佳的起始资金水平。Too big too small都不利于获得最优回报率。

4. 可以测试样本外数据,验证参数健壮性。这对掌握策略中长期稳定性非常必要。

5. 继续优化移动止损/盈启动条件和滑点大小,提高策略执行效率。SETTINGS优化永无止境。

### 六、策略总结  

该策略主要依赖于ABCD价格形态进行判断和入市。设置两阶段式的止损止盈追踪来管理风险和收益。策略较为成熟稳定,但交易频率可能偏低。我们可以通过增加过滤条件来获得更高效的交易机会。此外,继续对参数和资金规模进行优化,也能进一步提升策略的稳定盈利能力。总体而言,该策略思路清晰,易于理解实现,是一款值得深入研究和应用的量化交易策略。

||

I. Strategy Overview  

This strategy is named "Best ABCD Pattern Strategy (with Stop Loss and Take Profit Tracking)". It is a quantitative strategy that trades based on a clear ABCD price pattern model. The main idea is to go long or short according to the direction of the ABCD pattern after identifying a complete ABCD model, and set stop loss and take profit tracking to manage positions.

II. Strategy Principle   

1. Identify the extremum points of price using Bollinger Bands to get the ZigZag line.  

2. Recognize complete ABCD patterns on the ZigZag line. Points A, B, C and D need to meet certain proportional relationships. Go long or go short after identifying eligible ABCD patterns.

3. Set trailing stop loss after opening positions to control risks. Use fixed stop loss first, turn to trailing stop loss to lock in some profits after reaching a certain profit level.  

4. Similarly, trailing take profit is also set to secure enough profits in time and avoid losses. Trailing take profit also works in two stages: fixed take profit first and then trailing take profit.

5. Close positions when price hits the trailing stop loss or take profit to finish a trade cycle.

III. Advantage Analysis

1. Using Bollinger Bands to identify ZigZag line avoids repainting problems of traditional ZigZag, making trading signals more reliable.  

2. ABCD pattern trading model is mature and stable with adequate trading opportunities. Also it is easy to determine the position direction.

3. The two-stage trailing stop loss and take profit settings help better control risks and secure profits. Trailing features provide flexibility.  

4. Reasonable parameter design as percentages of stop loss, take profit and trailing activation are all customizable for flexibility.

5. The strategy can be used for any trading instruments, including forex, crypto currencies, stock indices, etc.

IV. Risk Analysis  

1. Trading opportunities for ABCD patterns are still limited compared to other strategies, not ensuring enough frequency.

2. During ranging markets, stop loss and take profit may get triggered frequently. Parameters need adjustments like widening stop loss/profit ranges.

3. Liquidity of the trading instruments needs attention. Slippage needs consideration for illiquid products.  

4. The strategy is sensitive to transaction costs. Brokers and accounts with low commission rates are preferred.

5. Some parameters can be further optimized, like the activation levels for trailing stop loss and take profit. More values can be tested to find the optimum.

V. Optimization Directions  

1. Combining with other indicators to add more filters avoids some false signals and reduces inefficient trades.

2. Add judgement on the three-section market structure, only taking trades in the third section. This can improve the win rate.

3. Test and optimize the initial capital to find the optimum level. Both too big and too small sizes hurt return rates.  

4. Carry out walk-forward analysis with out-of-sample data to examine the robustness of parameters over long term. 

5. Continue optimizing activation conditions and slippage sizes of trailing stop loss and take profit to improve efficiency. Optimization of settings never ends.


VI. Strategy Summary

The strategy mainly relies on ABCD pattern for market timing and entries. Two-stage trailing stop loss and take profit settings are used to manage risks and profits. The strategy is relatively mature and stable but trading frequency may be low. We can obtain more efficient trading opportunities by adding filters and conditions. Also further parameter tuning and capital sizing can improve its profit stability. Overall speaking, this is a strategy with clear logic and easy to understand, worth in-depth research and application in actual quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|filter Bill Williams Fractals?|
|v_input_2|true|Use stop Loss|
|v_input_3|3|Trail Loss (%)|
|v_input_4|true|Use stop Loss Trigger|
|v_input_5|2|SL Trigger (%)|
|v_input_6|true|Use take profit|
|v_input_7|true|Trailing Profit (%)|
|v_input_8|true|Use Take Profit Trigger|
|v_input_9|3|Take Profit Trigger (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-11 00:00:00
end: 2024-02-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// @author=Daveatt - BEST

// ABCD Pattern Strat

StrategyName        = "BEST ABCD Pattern Strategy (Trailing SL + TP)"
ShortStrategyName   = "BEST ABCD Strategy (Trailing)" 

strategy(title=StrategyName, shorttitle=ShortStrategyName, overlay=true )

filterBW = input(false, title="filter Bill Williams Fractals?")

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////// UTILITIES ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//  ||-----------------------------------------------------------------------------------------------------||
//  ||---   Fractal Recognition Functions:  ---------------------------------------------------------------||
isRegularFractal(mode, _high, _low) =>
    ret = mode == 1 ? _high[4] < _high[3] and _high[3] < _high[2] and _high[2] > _high[1] and _high[1] > _high[0] :
     mode == -1 ? _low[4] > _low[3] and _low[3] > _low[2] and _low[2] < _low[1] and _low[1] < _low[0] : false

isBWFractal(mode, _high, _low) =>
    ret = mode == 1 ? _high[4] < _high[2] and _high[3] <= _high[2] and _high[2] >= _high[1] and _high[2] > _high[0] :
     mode == -1 ? _low[4] > _low[2] and _low[3] >= _low[2] and _low[2] <= _low[1] and _low[2] < _low[0] : false

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////////////////// ABCD PATTERN ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

f_abcd()=>

    _r = timeframe.period
    _g = barmerge.gaps_off
    _l = barmerge.lookahead_on

    _high = high
    _low = low

    filteredtopf = filterBW ? isRegularFractal(1, _high, _low) : isBWFractal(1, _high, _low)
    filteredbotf = filterBW ? isRegularFractal(-1, _high, _low) : isBWFractal(-1, _high, _low)

    //  ||---   ZigZag:
    istop = filteredtopf
    isbot = filteredbotf
    topcount = barssince(istop)
    botcount = barssince(isbot)

    zigzag = (istop and topcount[1] > botcount[1] ? _high[2] :
     isbot and topcount[1] < botcount[1] ? _low[2] : na)

    x = valuewhen(zigzag, zigzag, 4) 
    a = valuewhen(zigzag, zigzag, 3) 
    b = valuewhen(zigzag, zigzag, 2) 
    c = valuewhen(zigzag, zigzag, 1) 
    d = valuewhen(zigzag, zigzag, 0)

    xab = (abs(b-a)/abs(x-a))
    xad = (abs(a-d)/abs(x-a))
    abc = (abs(b-c)/abs(a-b))
    bcd = (abs(c-d)/abs(b-c))

    // ABCD Part
    _abc = abc >= 0.382 and abc <= 0.886
    _bcd = bcd >= 1.13 and bcd <= 2.618
    
    _bull_abcd = _abc and _bcd and d < c 
    _bear_abcd = _abc and _bcd and d > c

    _bull   = _bull_abcd and not _bull_abcd[1]
    _bear   = _bear_abcd and not _bear_abcd[1]

    [_bull, _bear, zigzag]

lapos_x = timenow + round(change(time)*12)

[isLong, isShort, zigzag]  = f_abcd()

plot(zigzag, title= 'ZigZag', color=color.black, offset=-2)
plotshape(isLong, style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), size=size.normal, text="ABCD", textcolor=color.white)
plotshape(isShort, style=shape.labeldown, location=location.abovebar, color=color.new(color.maroon, 0), size=size.normal, text="ABCD", textcolor=color.white)


long_entry_price    = valuewhen(isLong, close, 0)
short_entry_price   = valuewhen(isShort, close, 0)

sinceNUP = barssince(isLong)
sinceNDN = barssince(isShort)

buy_trend   = sinceNDN > sinceNUP
sell_trend  = sinceNDN < sinceNUP

change_trend = (buy_trend and sell_trend[1]) or (sell_trend and buy_trend[1])

entry_price  = buy_trend ? long_entry_price : short_entry_price

///////////////////////////////
//======[ Trailing STOP ]======//
///////////////////////////////

// use SL?
useSL = input(true, "Use stop Loss")
// Configure trail stop level with input
StopTrailPerc = input(title="Trail Loss (%)", type=input.float, minval=0.0, step=0.1, defval=3) * 0.01
// Will trigger the take profit trailing once reached
use_SL_Trigger = input(true, "Use stop Loss Trigger")
StopTrailTrigger   = input(2.0, "SL Trigger (%)",minval=0,step=0.5,type=input.float) * 0.01


StopLossPriceTrigger = 0.0
StopLossPriceTrigger := if (use_SL_Trigger)
    if buy_trend
        entry_price * (1 + StopTrailTrigger) 
    else
        entry_price * (1 - StopTrailTrigger)
else
    -1


var SL_Trigger_Long_HIT = false
SL_Trigger_Long_HIT := useSL and use_SL_Trigger and buy_trend and high >= StopLossPriceTrigger
 ? true : SL_Trigger_Long_HIT[1]


var SL_Trigger_Short_HIT = false
SL_Trigger_Short_HIT := useSL and use_SL_Trigger and sell_trend and low <= StopLossPriceTrigger
 ? true : SL_Trigger_Short_HIT[1]


display_long_SL_trigger     = useSL and buy_trend  and use_SL_Trigger 
 and SL_Trigger_Long_HIT == false and StopLossPriceTrigger != -1
display_short_SL_trigger    = useSL and sell_trend and use_SL_Trigger 
 and SL_Trigger_Short_HIT == false and StopLossPriceTrigger != -1
display_SL_trigger          = display_long_SL_trigger or display_short_SL_trigger

plot(display_SL_trigger ? StopLossPriceTrigger : na, title='SLPriceTrigger', transp=0, 
 color=color.maroon, style=plot.style_circles, linewidth=3)


// Determine trail stop loss prices
longStopPrice = 0.0, shortStopPrice = 0.0

longStopPrice := if useSL and buy_trend
    stopValue = low * (1 - StopTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0

shortStopPrice := if useSL and sell_trend
    stopValue = high * (1 + StopTrailPerc)
    min(stopValue, shortStopPrice[1])
else
    999999

//////////////////////////////////////////////////////////////////////////////////////////
//*** STOP LOSS HIT CONDITIONS  ***//
//////////////////////////////////////////////////////////////////////////////////////////

cond_long_stop_loss_hit  = useSL and buy_trend and crossunder(low, longStopPrice[1]) 
 and (SL_Trigger_Long_HIT or use_SL_Trigger == false)
cond_short_stop_loss_hit = useSL and sell_trend and crossover(high, shortStopPrice[1]) 
 and (SL_Trigger_Short_HIT or use_SL_Trigger == false)


// Plot stop loss values for confirmation
plot(series=useSL and buy_trend and low >= longStopPrice 
 and (SL_Trigger_Long_HIT or use_SL_Trigger == false)
 ? longStopPrice : na,
 color=color.fuchsia, style=plot.style_cross,
 linewidth=2, title="Long Trail Stop")

plot(series=useSL and sell_trend and high <= shortStopPrice 
 and (SL_Trigger_Short_HIT or use_SL_Trigger == false)
 ? shortStopPrice : na,
 color=color.fuchsia, style=plot.style_cross,
 linewidth=2, title="Short Trail Stop")


///////////////////////////////
//======[ Take Profit ]======//
///////////////////////////////

// Use TP?
useTP = input(true, "Use take profit")
// TP trailing
ProfitTrailPerc     = input(1.0, "Trailing Profit (%)",minval=0,step=0.5,type=input.float) * 0.01

use_TP_Trigger = input(true, "Use Take Profit Trigger")
// Will trigger the take profit trailing once reached
takeProfitTrigger   = input(3.0, "Take Profit Trigger (%)",minval=0,step=0.5,type=input.float) * 0.01


// ttp := ttp>tp ? tp : ttp

takeprofitPriceTrigger = 0.0
takeprofitPriceTrigger := if (use_TP_Trigger)
    if (buy_trend)
        entry_price * (1 + takeProfitTrigger) 
    else
        entry_price * (1 - takeProfitTrigger)
else
    -1

//plot(entry_price, title='entry_price', transp=100)

var TP_Trigger_Long_HIT = false
TP_Trigger_Long_HIT := useTP and use_TP_Trigger and buy_trend and high >= takeprofitPriceTrigger
 ? true : TP_Trigger_Long_HIT[1]


var TP_Trigger_Short_HIT = false
TP_Trigger_Short_HIT := useTP and use_TP_Trigger and sell_trend and low <= takeprofitPriceTrigger
 ? true : TP_Trigger_Short_HIT[1]


display_long_TP_trigger     = useTP and buy_trend  and TP_Trigger_Long_HIT == false 
 and takeprofitPriceTrigger != -1
display_short_TP_trigger    = useTP and sell_trend and TP_Trigger_Short_HIT == false 
 and takeprofitPriceTrigger != -1
display_TP_trigger          = display_long_TP_trigger or display_short_TP_trigger


//???
// @hugo: Will display the TP trigger as long as not hit
// once the TP trigger is hit, the TP trailing will activate
plot(display_TP_trigger ? takeprofitPriceTrigger : na, title='takeprofitPriceTrigger', transp=0, color=color.orange, 
 style=plot.style_cross, linewidth=3)

longTrailTP= 0.0, shortTrailTP = 0.0

// Trailing Profit
// Start trailing once trigger is reached
longTrailTP := if useTP and buy_trend 
    tpValue = high * (1 + ProfitTrailPerc)
    max(tpValue, longTrailTP[1])
else
    0

shortTrailTP := if useTP and sell_trend
    tpValue = low * (1 - ProfitTrailPerc)
    min(tpValue, shortTrailTP[1])
else
    999999

//plot(longTrailTP, title='debug longTrailTP', transp=100)
//plot(shortTrailTP, title='debug shortTrailTP', transp=100)

//////////////////////////////////////////////////////////////////////////////////////////
//*** TRAILING TAKE PROFIT HIT CONDITIONS TO BE USED IN ALERTS  ***//
//////////////////////////////////////////////////////////////////////////////////////////


//???
// @hugo: I use crossover/crossunder for the alerts to trigger the events only once
cond_long_trail_tp_hit      = useTP and buy_trend   and crossover(high, longTrailTP[1]) 
 and (TP_Trigger_Long_HIT or use_TP_Trigger == false)
cond_short_trail_tp_hit     = useTP and sell_trend  and crossunder(low, shortTrailTP[1]) 
 and (TP_Trigger_Short_HIT or use_TP_Trigger == false)
// ???


// Plot take profits values for confirmation
// Display the trailing TP until not hit
plot(series= useTP and buy_trend and high <= longTrailTP and 
 (TP_Trigger_Long_HIT or use_TP_Trigger == false) ? longTrailTP : na,
 color=color.aqua, style=plot.style_circles,
 linewidth=2, title="Long Trail TP")

plot(series= useTP and sell_trend and low >= shortTrailTP and 
 (TP_Trigger_Short_HIT or use_TP_Trigger == false) ? shortTrailTP : na,
 color=color.aqua, style=plot.style_circles,
 linewidth=2, title="Short Trail TP")

close_long  = cond_long_trail_tp_hit or cond_long_stop_loss_hit
close_short = cond_short_trail_tp_hit or cond_short_stop_loss_hit


strategy.entry("Long", 1, when=isLong)
strategy.close("Long", when=close_long)

strategy.entry("Short", 0,  when=isShort)
strategy.close("Short", when=close_short)

if change_trend
    SL_Trigger_Long_HIT := false
    SL_Trigger_Short_HIT := false
    TP_Trigger_Long_HIT := false
    TP_Trigger_Short_HIT := false
```

> Detail

https://www.fmz.com/strategy/442091

> Last Modified

2024-02-19 11:25:29
