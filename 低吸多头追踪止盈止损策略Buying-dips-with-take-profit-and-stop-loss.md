
> Name

低吸多头追踪止盈止损策略Buying-dips-with-take-profit-and-stop-loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1034f3de2e7c578798c.png)

[trans]


## 概述

该策略通过追踪价格的最低点,在价格低吸后立即做多,通过动态跟踪止盈和止损点来锁定利润和控制风险。

## 策略原理

该策略的核心逻辑是利用ATR指标计算动态止盈和止损位置。具体来说,当收盘价低于过去n天的最低价时(代码中设置为7天)触发做多信号;在持有多头仓位期间,将以ATR指标作为基础计算动态止盈和止损价格(通过ATR倍数参数设置),并在图表上实时显示。当价格触及止盈点或止损点时从而实现利润锁定或风险控制。

该策略运用了最简单的低吸做多策略相结合动态止损止盈的思想,做到了及时捕捉机会,同时控制风险。

## 优势分析

该策略的主要优势有:

1. 利用动态ATR指标来设置止盈止损,可以根据市场波动幅度来调整盈亏位置,避免止盈止损过于固定带来不必要的损失或失去更大利润机会。这也是该策略的最大亮点。

2. 低吸做多策略在行情震荡调整的时候有较高的胜率,基本面好的股票在短期异常跌破支持位时大概率会有反弹和修复。

3. 通过ATR数值来估算止盈止损比例合适,可以根据市场环境和个人风险承受能力灵活设置。

4. 代码逻辑简单清晰,容易理解,参数设置也比较直观,适合作为策略学习的范例。


## 风险分析

该策略的主要风险有: 

1. 无法判断低吸反弹的幅度和力度,存在一定盈利缺口的风险。可以通过调整ATR指标参数来设置不同止盈幅度。

2. 存在被套住的风险。当价格跌破支持位后继续下跌时,将面临较大亏损风险。可以适当缩小仓位规模和减小止损ATR倍数来降低单笔损失。

3. 停损点过于靠近也可能被震出场外。应适当放宽ATR倍数以防止无谓止损。

4. 回测数据拟合风险。应测试不同市场环境下的数据,同时做好冲击成本设置。


## 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化支持位和反弹信号判断。可以换用更为精细和可靠的指标来判断反弹信号,如KDJ指标或布林带通道等。

2. 优化仓位管理策略。可以通过改进的仓位管理模块,根据市场波动率等情况动态调整仓位。

3. 可设置跟踪止损模块。在价格运行一定幅度后开始收紧止损距离,锁定部分利润。

4. 添加同向验证模块。当拟买入股票所在板块或大盘也同步下跌到支撑位置时,进一步验证买入信号的可靠性。


## 总结  

本策略采用低吸做多思路,结合ATR动态跟踪的止盈止损机制,能有效把握行情反转修复的机会,同时也能利用止盈止损来管理交易风险。虽然优化空间较大,但作为策略学习入门风格简单易懂。可以在此基础上进一步改进,使策略更为通用可靠。

|| 

## Overview  

This strategy buys the dip and takes profit for a high win rate by dynamically tracking the price lows, going long after price dips, and locking in profits and controlling risks through adaptive take profit and stop loss.  

## Principles  

The core logic of this strategy is to use the ATR indicator to calculate dynamic take profit and stop loss positions. Specifically, a long signal is triggered when the closing price is below the lowest low of the past n days (set to 7 days in the code); during long positions, take profit and stop loss prices will be calculated dynamically based on the ATR indicator (set through ATR multiples) and displayed on the chart in real time. Profit taking or risk control can be achieved when price hits the take profit or stop loss points.

The strategy combines the simplest buying dip approach with the idea of dynamic stop loss/take profit to capture opportunities in a timely manner while controlling risks.  

## Advantages  

The main advantages of this strategy are:

1. Using dynamic ATR indicators to set stop loss and take profit can adjust P/L levels based on market volatility, avoiding unnecessary losses or missing greater profit opportunities due to overly fixed stop loss/profit taking. This is the biggest highlight of the strategy.  

2. Buying dip strategies tend to have higher win rates during market consolidations when prices dip below support levels abnormally and likely to bounce back.  

3. Estimating take profit/stop loss ratios through ATR values is reasonable and can be flexibly set according to market conditions and personal risk tolerance.

4. The code logic is simple and clear, easy to understand. Parameter settings are also intuitive. It is suitable as an exemplary strategy for learning.

## Risks   

The main risks of this strategy are:

1. Unable to determine the amplitude and strength of the rebound after the dip. There is a risk that profit expectations fall short. This can be addressed by adjusting ATR parameters to set different take profit ranges.  

2. Risk of being trapped in losses when prices break supports and continue to fall, facing greater loss. This can be mitigated by reducing position sizing and lowering stop loss ATR multiplier to cap losses.

3. Stop loss being too tight may also get knocked out unnecessarily. ATR multiples should be set more loosely to avoid unnecessary stop outs.   

4. Backtest overfit risks. Testing under different market conditions is necessary, with proper slippage/commission settings.

## Enhancement  

The strategy can be enhanced in the following aspects:  

1. Optimizing support level and signal determination. More sophisticated indicators like KDJ or Bollinger Bands can be used to judge reversal signals more reliably.  

2. Optimizing position sizing rules. Dynamically adjust position sizes based on market volatility etc. 

3. Implement trailing stop loss module. Tighten stops after prices advance by certain range, to lock in partial profits.  

4. Adding confluence filters. Enter long only if corresponding sector/the broad market also reaches support, verifying signal reliability.  

## Conclusion   

This strategy captures mean-reversion opportunities through buying dips, with take profit/stop loss for risk control. Despite room for more sophistication, it is simple enough for beginners to understand and learn from. Further improvements can enhance robustness and adaptability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|ATR Period|
|v_input_2|2|ATR SL Multiple|
|v_input_3|true|ATR TP Multiple|
|v_input_4|7|Channel Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-16 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © racer8
//@version=4
strategy("Buy-The-Dip", overlay=true)

atn = input(15, "ATR Period")
atr = sma(tr,atn)[1]
bought = strategy.position_size[0] > strategy.position_size[1]

slm = input(2.0,"ATR SL Multiple",minval=0)
StopPrice  = strategy.position_avg_price - slm*atr              // determines stop loss's price 
FixedStopPrice = valuewhen(bought,StopPrice,0)                  // stores original StopPrice  
plot(FixedStopPrice,"Stop Loss",color=color.red,linewidth=2,style=plot.style_cross)

tpm = input(1.0,"ATR TP Multiple",minval=0)
TakePrice  = strategy.position_avg_price + tpm*atr              // determines Take Profit's price 
FixedTakePrice = valuewhen(bought,TakePrice,0)                  // stores original TakePrice  
plot(FixedTakePrice,"Take Profit",color=color.green,linewidth=2,style=plot.style_cross)

nn = input(7,"Channel Length")
ll = lowest(low,nn)

if close<ll[1]
    strategy.entry("Buy",strategy.long)
if strategy.position_size > 0
    strategy.exit(id="XL SL", stop=FixedStopPrice, limit=FixedTakePrice)    // commands stop loss order to exit!

plot(ll,color=color.orange)
```

> Detail

https://www.fmz.com/strategy/433022

> Last Modified

2023-11-23 16:50:01
