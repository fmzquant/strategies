
> Name

量化交易双向S-R策略TD-Sequential-Dual-Direction-S-R-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ef31ab46610ecf0e96.png)
[trans]
## 概述

本策略通过跟踪价格的连续上涨或下跌期数来识别支撑阻力位,然后结合移动平均线作为进场和止损信号来构建长仓和短仓交易策略。该策略可以同时做多做空,也可只做单边。

## 原理

1. 支撑阻力位识别
    - 当收盘价连续4天高于前4天的收盘价时,记录该点为下行支撑位
    - 当收盘价连续4天低于前4天的收盘价时,记录该点为上行阻力位
2. 信号生成
    - 在识别到支撑位后,如果价格上涨期数达到设置的长仓阈值(默认9天),产生做多信号
    - 在识别到阻力位后,如果价格下跌期数达到设置的短仓阈值(默认9天),产生做空信号
3. 移动平均线过滤和止损
    - 进场时要求价格高于或低于设置期限的移动平均线,用来过滤信号
    - 止损位设置为进场时的移动平均线

## 优势

1. 使用支撑阻力位判断较为可靠,不会被短期波动误导
2. 结合移动平均线过滤可以减少假信号
3. 双向交易,可以提高操作频率,增加盈利机会
4. 参数可调,可以根据不同品种和市场情况优化

## 风险与解决方法

1. 在趋势市场中,短期内可能出现多次亏损交易
    - 可以适当调高移动平均线周期,减少交易频率
2. 支持位或阻力位判断失误的概率
    - 可以适当调整判定支撑阻力位的长度阈值
3. 大幅震荡市场中,止损可能过于频繁被触发
    - 可以适当放宽止损范围
    - 增加趋势判断指标

## 优化方向  

1. 加入更多技术指标判断,提高策略稳定性  
    - 增加趋势、动量等判断指标
2. 优化支撑阻力位判断逻辑
    - 测试不同参数对结论的影响  
3. 针对具体品种和周期进行参数优化
    - 不同品种参数可调范围不一样  
4. 开发自适应止损机制
    - 根据市场波动程度动态调整止损幅度

## 总结

本策略整体来说较为简单可靠,通过对支撑阻力位的正确判断可以在较大概率上捕捉价格反转机会。同时结合移动平均线确保了进入的时机,避免被套。最后,本策略方向判断相对保守,但具备较强的适应性和扩展性,用户可以根据自己对市场的理解选择合适的参数进行优化,从而获得更出色的表现。

||

## Overview  

This strategy identifies support and resistance levels by tracking the consecutive up and down bars of prices, and combines moving averages as entry and stop loss signals to construct long and short trading strategies. The strategy can go both long and short, or only one side.

## Principles  

1. S/R identification  
    - When the close price is higher than the close of 4 days ago for 4 consecutive days, mark the point as a downside support  
    - When the close price is lower than the close of 4 days ago for 4 consecutive days, mark the point as a upside resistance
2. Signal generation 
    - After identifying a support level, if the up bar count reaches the threshold (default 9 days), generate long signal
    - After identifying a resistance level, if the down bar count reaches the threshold (default 9 days), generate short signal  
3. MA filter and stop loss
    - Require price to cross the MA line on entry, to filter signals
    - Set stop loss to the MA line at entry  

## Advantages

1. Judgment based on S/R is relatively reliable, not easily misled by short-term fluctuations  
2. Combining MA filter can reduce false signals
3. Go both long and short to improve frequency and profit opportunities  
4. Parameters adjustable, can be optimized for different products and market situations

## Risks and Solutions

1. May suffer consecutive losses in trending markets
    - Increase MA period to reduce trade frequency
2. Probability of wrong S/R judgement 
    - Fine tune thresholds for S/R identification
3. Stop loss may be triggered too often in whipsaw markets
    - Loosen stop loss range 
    - Add trend indicator

## Optimization Directions   

1. Add more technical indicators to improve robustness
    - Trend, momentum etc.
2. Optimize S/R identification logic 
    - Test impact of different parameters  
3. Parameter tuning for specific products and timeframes
    - Adjustable range varies across products
4. Develop adaptive stop loss mechanism 
    - Dynamically adjust stop loss based on market volatility

## Conclusion

The strategy is relatively simple and reliable. By correctly identifying S/R levels it captures price reversal opportunities with high probability. Combining with MA ensures proper entry timing and avoids traps. Finally, the directional judgement is conservative but adaptable. Users can optimize parameters according to their market understanding and achieve even better results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Long Only or Short Only or Both?: Both|Long Only|Short Only|
|v_input_2|9|TD Sequential Long Price Flip|
|v_input_3|9|TD Sequential Short Price Flip|
|v_input_4|0|Long MA: SMA|EMA|VWMA|
|v_input_5|0|Short MA: SMA|EMA|VWMA|
|v_input_6|10|Long MA Exit Length|
|v_input_7|10|Short MA Exit Length|
|v_input_8|0|Long Trend Filter?: Above|Below|Don't Include|
|v_input_9|0|Short Trend Filter?: Below|Above|Don't Include|
|v_input_10|0|Trend MA: SMA|EMA|VWMA|
|v_input_11|200|Trend MA Length|
|v_input_12|true|Profit Target On/Off|
|v_input_13|true|Profit Target %|
|v_input_14|true|Stop Loss On/Off|
|v_input_15|-1|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-30 00:00:00
end: 2024-02-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © GlobalMarketSignals

//@version=4
strategy("GMS: TD Sequential Strategy", overlay=true)

LongShort     = input(title="Long Only or Short Only or Both?", type=input.string, defval="Both", options=["Both", "Long Only", "Short Only"])
PriceFlipL    = input(title="TD Sequential Long Price Flip", type = input.integer ,defval=9)
PriceFlipS    = input(title="TD Sequential Short Price Flip", type = input.integer ,defval=9)
MAs1          = input(title="Long MA", type=input.string, defval="SMA", options=["SMA", "EMA", "VWMA"])
MAs2          = input(title="Short MA", type=input.string, defval="SMA", options=["SMA", "EMA", "VWMA"])
SMAlenL       = input(title="Long MA Exit Length", type = input.integer ,defval=10)
SMAlenS       = input(title="Short MA Exit Length", type = input.integer ,defval=10)
AboveBelowL   = input(title="Long Trend Filter?", type=input.string, defval="Above", options=["Above", "Below", "Don't Include"])
AboveBelowS   = input(title="Short Trend Filter?", type=input.string, defval="Below", options=["Above", "Below", "Don't Include"])
TLma          = input(title="Trend MA", type=input.string, defval="SMA", options=["SMA", "EMA", "VWMA"])
TrendLength   = input(title="Trend MA Length", type = input.integer ,defval=200)
PTbutton      = input(title="Profit Target On/Off", type=input.bool, defval=true)
ProfitTarget  = input(title="Profit Target %", type=input.float, defval=1, step=0.1, minval=0)
SLbutton      = input(title="Stop Loss On/Off", type=input.bool, defval=true)
StopLoss      = input(title="Stop Loss %", type=input.float, defval=-1, step=0.1, maxval=0)

//PROFIT TARGET & STOPLOSS

if PTbutton == true and SLbutton == true
    strategy.exit("EXIT", profit=((close*(ProfitTarget*0.01))/syminfo.mintick), loss=((close*(StopLoss*-0.01))/syminfo.mintick))
else
    if PTbutton == true and SLbutton == false
        strategy.exit("PT EXIT", profit=((close*(ProfitTarget*0.01))/syminfo.mintick))
    else
        if PTbutton == false and SLbutton == true
            strategy.exit("SL EXIT", loss=((close*(StopLoss*-0.01))/syminfo.mintick))
        else    
            strategy.cancel("PT EXIT")

// S/R Code By johan.gradin (lines 36-46)
// Buy setup//
priceflip1 = barssince(close>close[4])
buysetup = close<close[4] and priceflip1
buy = buysetup and barssince(priceflip1!=9)
buyovershoot = barssince(priceflip1!=13) and buysetup
// Sell Setup //
priceflip = barssince(close<close[4])
sellsetup = close>close[4] and priceflip
sell = sellsetup and barssince(priceflip!=9)
sellovershoot = sellsetup and barssince(priceflip!=13)


///////
/////// SMA
///////

if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "SMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "SMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and  close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "SMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "SMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "SMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close<sma(close,TrendLength))
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "SMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "SMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "SMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and  close<sma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "SMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "SMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "SMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close<sma(close,TrendLength))
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "SMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))  

///////
/////// EMA
///////

if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "EMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "EMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and  close<sma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "EMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) )
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "EMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<ema(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "EMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close<sma(close,TrendLength))
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "EMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) )
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "EMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "EMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and  close<sma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "EMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) )
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "EMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<ema(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "EMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close<sma(close,TrendLength))
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "EMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) )
    strategy.close("SHORT",  when = close<ema(close,SMAlenS)) 



///////
/////// VWMA
///////

if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "VWMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "VWMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and  close<sma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "VWMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) )
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "VWMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<vwma(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "VWMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close<sma(close,TrendLength))
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "VWMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "VWMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and close>sma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "VWMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and  close<sma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "VWMA" and TLma == "SMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) )
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "VWMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close>sma(close,TrendLength))
    strategy.close("SHORT", when = close<vwma(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "VWMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close<sma(close,TrendLength))
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "VWMA" and TLma == "SMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS)) 

    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////
/////// SMA
///////


if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "SMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and close>ema(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "SMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and  close<ema(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "SMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "SMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close>ema(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "SMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close<ema(close,TrendLength))
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "SMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "SMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and close>ema(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "SMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and  close<ema(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "SMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "SMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close>ema(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "SMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close<ema(close,TrendLength))
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "SMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))  

///////
/////// EMA
///////

if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "EMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and close>ema(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "EMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and  close<ema(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "EMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) )
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "EMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close>ema(close,TrendLength))
    strategy.close("SHORT", when = close<ema(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "EMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close<ema(close,TrendLength))
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "EMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) )
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "EMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and close>ema(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "EMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and  close<ema(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "EMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) )
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "EMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close>ema(close,TrendLength))
    strategy.close("SHORT", when = close<ema(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "EMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close<ema(close,TrendLength))
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "EMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) )
    strategy.close("SHORT",  when = close<ema(close,SMAlenS)) 



///////
/////// VWMA
///////

if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "VWMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and close>ema(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "VWMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and  close<ema(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "VWMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) )
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "VWMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close>ema(close,TrendLength))
    strategy.close("SHORT", when = close<vwma(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "VWMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close<ema(close,TrendLength))
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "VWMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "VWMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and close>ema(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "VWMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and  close<ema(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "VWMA" and TLma == "EMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) )
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "VWMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close>ema(close,TrendLength))
    strategy.close("SHORT", when = close<vwma(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "VWMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close<ema(close,TrendLength))
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "VWMA" and TLma == "EMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS)) 

    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////
/////// SMA
///////


if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "SMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and close>vwma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "SMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and  close<vwma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "SMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "SMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close>vwma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "SMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close<vwma(close,TrendLength))
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "SMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "SMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and close>vwma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "SMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) and  close<vwma(close,TrendLength))
    strategy.close("LONG", when = close>sma(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "SMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<sma(close,SMAlenL) )
    strategy.close("LONG", when = close>sma(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "SMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close>vwma(close,TrendLength))
    strategy.close("SHORT", when = close<sma(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "SMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) and close<vwma(close,TrendLength))
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "SMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>sma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<sma(close,SMAlenS))  

///////
/////// EMA
///////

if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "EMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and close>vwma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "EMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and  close<vwma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "EMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) )
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "EMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close>vwma(close,TrendLength))
    strategy.close("SHORT", when = close<ema(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "EMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close<vwma(close,TrendLength))
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "EMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) )
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "EMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and close>vwma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "EMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) and  close<vwma(close,TrendLength))
    strategy.close("LONG", when = close>ema(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "EMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<ema(close,SMAlenL) )
    strategy.close("LONG", when = close>ema(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "EMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close>vwma(close,TrendLength))
    strategy.close("SHORT", when = close<ema(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "EMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) and close<vwma(close,TrendLength))
    strategy.close("SHORT",  when = close<ema(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "EMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>ema(close,SMAlenS) )
    strategy.close("SHORT",  when = close<ema(close,SMAlenS)) 



///////
/////// VWMA
///////

if LongShort =="Long Only" and AboveBelowL == "Above" and MAs1 == "VWMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and close>vwma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
if LongShort =="Long Only" and  AboveBelowL == "Below" and MAs1 == "VWMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and  close<vwma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))

if LongShort =="Long Only" and  AboveBelowL == "Don't Include" and MAs1 == "VWMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) )
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
///////
    
if LongShort =="Short Only" and  AboveBelowS == "Above" and MAs2 == "VWMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close>vwma(close,TrendLength))
    strategy.close("SHORT", when = close<vwma(close,SMAlenS))
    
if LongShort =="Short Only" and  AboveBelowS == "Below" and MAs2 == "VWMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close<vwma(close,TrendLength))
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

if LongShort =="Short Only" and  AboveBelowS == "Don't Include" and MAs2 == "VWMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

///////
    
if LongShort =="Both" and AboveBelowL == "Above" and MAs1 == "VWMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and close>vwma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
if LongShort =="Both" and  AboveBelowL == "Below" and MAs1 == "VWMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) and  close<vwma(close,TrendLength))
    strategy.close("LONG", when = close>vwma(close,SMAlenL))

if LongShort =="Both" and  AboveBelowL == "Don't Include" and MAs1 == "VWMA" and TLma == "VWMA"
    strategy.entry("LONG", true, when = buysetup and barssince(priceflip1!=PriceFlipL) and close<vwma(close,SMAlenL) )
    strategy.close("LONG", when = close>vwma(close,SMAlenL))
    
    
if LongShort =="Both" and  AboveBelowS == "Above" and MAs2 == "VWMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close>vwma(close,TrendLength))
    strategy.close("SHORT", when = close<vwma(close,SMAlenS))
    
if LongShort =="Both" and  AboveBelowS == "Below" and MAs2 == "VWMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) and close<vwma(close,TrendLength))
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS))

if LongShort =="Both" and  AboveBelowS == "Don't Include" and MAs2 == "VWMA" and TLma == "VWMA"
    strategy.entry("SHORT", false, when = sellsetup and barssince(priceflip!=PriceFlipS) and close>vwma(close,SMAlenS) )
    strategy.close("SHORT",  when = close<vwma(close,SMAlenS)) 

    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
```

> Detail

https://www.fmz.com/strategy/441163

> Last Modified

2024-02-06 12:13:22
