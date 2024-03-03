
> Name

基于移动平均线的支撐阻力突破策略Moving-Average-Support-and-Resistance-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于移动平均线识别出关键的支撐和阻力价格区域,在这些区域发生突破时进行交易操作。策略简单有效,容易理解和实施。

## 策略原理

该策略使用长度为50周期的简单移动平均线SMA,来识别出关键的支撐和阻力区域。具体来说:

- 当收盘价从下方突破SMA时,取过去50周期内的最高价作为阻力位R
- 当收盘价从上方跌破SMA时,取过去50周期内的最低价作为支撐位S
- 收盘价超过阻力R时,做多
- 收盘价跌破支撐S时,做空

也就是说,该策略利用长度为50周期的SMA分割价格区域,当价格突破这些区域时,以相反方向进行交易。突破阻力做多,跌穿支撐做空。策略简单明了,容易操作。

## 优势分析

该策略具有以下优势:

1. 使用移动平均线识别支撐阻力具有一定的可靠性,可以有效过滤假突破。
2. 50周期长度不长不短,可以识别出较为重要的中期支撐阻力。
3. 仅使用SMA一条指标,系统开销小,容易实现。
4. 突破交易策略简单有效,容易操作。
5. 可配置参数少,不容易过度优化。

## 风险分析

该策略也存在以下风险:

1. 仍存在一定的假突破风险,移动平均线无法完全过滤。
2. 固定周期无法适应市场各个周期,可能错过较短周期的机会。
3. 突破后可能出现回调测试前高低,需要有一定的止损技巧。
4. 长期持仓时,需要关注更大级别的趋势方向。

针对这些风险,可以通过适当调整移动平均线周期,或加入趋势过滤指标等进行优化。同时做好止损管理非常重要。

## 优化方向

该策略可以考虑从以下几个方向进行优化:

1. 增加例如MACD等指标,辅助判断趋势方向和力度。
2. 加入MA周期的自适应优化,让周期能够动态调整。
3. 优化突破识别,例如要求同时突破MA和布林带上下轨等。
4. 增加止损机制,以控制单笔损失。
5. 尝试不同的MA周期参数,寻找最优参数组合。

通过这些优化,可以使策略更具弹性,在不同市场周期中都能发挥效果。

## 总结

整体来说,该策略利用简单移动平均线识别支撐阻力区域,进行价格突破操作,简单高效。优化空间也较大,可从多个维度进行改进。虽然存在一定的假突破风险,但配置合理的止损可以有效控制。该策略思路清晰易懂,非常适合作为初学者的入门策略来实践。

||


## Overview

This strategy identifies key support and resistance levels based on moving averages, and takes trades when price breaks through these levels. The strategy is simple and effective, easy to understand and implement.

## Strategy Logic

The strategy uses a Simple Moving Average (SMA) with a period of 50 to identify support and resistance zones. Specifically:

- When close price crosses above SMA from below, the highest high over the past 50 periods is taken as resistance R
- When close price crosses below SMA from above, the lowest low over the past 50 periods is taken as support S
- Go long when close exceeds resistance R
- Go short when close breaks support S

In other words, the strategy uses the 50-period SMA to divide price zones, and takes trades when price breaks out of these zones. It goes long on breakouts above resistance, and goes short on breakdowns below support. The strategy is straightforward and easy to execute.

## Advantage Analysis 

The strategy has the following advantages:

1. Using moving averages to identify support/resistance is reasonably reliable and can effectively filter false breakouts.
2. A period of 50 is neither too long nor too short, and can detect meaningful medium-term levels.
3. It uses only a single SMA indicator, resulting in low system overhead and easy implementation.
4. Breakout trading strategies are simple and effective. 
5. There are few tunable parameters, avoiding excessive optimization.

## Risk Analysis

The strategy also has the following risks:

1. There is still some risk of false breakouts that SMAs cannot completely filter out.
2. The fixed period cannot adapt to different market cycles, potentially missing shorter-term opportunities.  
3. There may be pullbacks and retests after initial breakouts, requiring prudent stop loss techniques.
4. Larger trend direction needs to be monitored for longer-term trades.

These risks can be addressed through optimizations like adjusting the SMA period, adding trend filter indicators, etc. Proper stop loss management is also very important.

## Optimization Directions

Some ways the strategy can be enhanced:

1. Add indicators like MACD to help gauge trend direction and momentum.  
2. Implement adaptive optimization of MA periods for dynamic adjustment.
3. Improve breakout detection, e.g. requiring concurrent break of MA and Bollinger Bands.
4. Incorporate stop loss mechanisms to control single trade loss.
5. Test different MA period parameters to find optimal combinations.

These improvements can make the strategy more robust across different market cycles.

## Summary

Overall, the strategy identifies support/resistance with SMAs and trades breakouts, keeping things simple and effective. There is also significant room for optimization across multiple dimensions. While false breakouts remain a risk, prudent stop loss usage can effectively control this. The strategy is easy to understand for beginners and great for gaining practical experience.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|回溯期數|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//--------------------------*
//-- This source code is subject to the terms of the Mozilla Public License 2.0
//-- 開源代碼受Mozilla公眾授權條款2.0版規範, 網址是https://mozilla.org/MPL/2.0/
//
//@version=4
//
//  作品: [LunaOwl] 支撐壓力策略第4版
//  英文: [LunaOwl] Support Resistance Strategy V4
//
////////////////////////////////
//     ~~!!*(๑╹◡╹๑) **       //
//  製作:  @LunaOwl 彭彭      //
//  日期:  2019年03月05日     //
//  修改:  2019年04月22日     //
//  四版:  2020年06月16日     //
//  發表:  2020年06月17日     //
////////////////////////////////

//==設定策略==//

strategy("[LunaOwl] 支撐壓力策略 [回測]",
     shorttitle          = "支撐壓力策略 [回測]",
     overlay             = true,
     calc_on_order_fills = false,
     calc_on_every_tick  = false,
     pyramiding          = 0,
     currency            = currency.NONE,
     initial_capital     = 10000,
     slippage            = 5,
     default_qty_value   = 100,
     default_qty_type    = strategy.percent_of_equity,
     commission_type     = strategy.commission.percent,
     commission_value    = 0.05
     )

LB = input(50, title = "回溯期數", type = input.integer)
R = valuewhen(cross(sma(close, LB),close), highest(high, LB), 1)
S = valuewhen(cross(close,sma(close, LB)),  lowest( low, LB), 1)

plot(R, title = "壓力", color = color.green)
plot(S, title = "支撐", color = color.red)

//==定義輸出結果==//

Trend_up = crossover(close, R) ? 1 : 0
Trend_dn = crossunder(close, S) ? -1 : 0

//==設定出場規則==//

Enter = Trend_up ==  1 and Trend_up[1] == 0 ? Trend_up : na
Exit  = Trend_dn == -1 and Trend_dn[1] == 0 ? Trend_dn : na
strategy.entry("多", strategy.long, when = Enter)
strategy.entry("空", strategy.short, when = Exit)
```

> Detail

https://www.fmz.com/strategy/428086

> Last Modified

2023-09-28 15:20:47
