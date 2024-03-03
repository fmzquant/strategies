
> Name

多时间周期均线交易策略Four-Exponential-Moving-Averages-and-Volume-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略结合多种不同参数设置的EMA均线以及EOM量能指标,实现多时间周期的趋势判断,构建长线和短线共同判断的交易策略。该策略旨在利用不同周期均线的多时间周期共振,发掘更长效的趋势走势。

## 策略原理

该策略使用4组不同周期的参数EMA均线,分别是13周期、21周期、50周期和180周期的EMA。这4组EMA均线构建了多个时间维度,用于判断价格趋势和发掘更长效的趋势模式。

策略使用EOM量能指标来确认趋势。EOM指标结合了交易量和价格波动幅度,可以有效判断买卖力道。策略判断EOM大于0时为多头市场,EOM小于0时为空头市场。

策略设置两个选项,选项1是当短期EMA站上长期EMA时做多,短期EMA站下长期EMA时平仓。选项2是当短期EMA上穿中期EMA时做多,短期EMA下穿中期EMA时平仓。两个选项可以更全面判断趋势的确认。

## 策略优势

- 利用多时间周期EMA判断趋势,能发掘更长线的趋势模式
- EOM量能指标有效判断买卖力道,避免被暂时回调误导
- 两种可选入场方式,可以更全面确认趋势
- 采用分层换手止损,降低单笔损失

## 策略风险

- EMA均线具有滞后性,可能错过快速反转
- 量能指标可能发出错误信号
- 多重条件判断造成入场不明确
- 分层换手止损可能过于机械化

## 优化方向

- 可以测试更多组合的参数EMA周期,寻找最优参数
- 可以加入其他指标进行入场确认,如MACD等
- 可以采用移动止损来追踪趋势运行
- 可以根据市场状态调整定位仓位比例

## 总结

本策略整合多时间周期EMA判断和量能指标过滤,实现了趋势跟踪和 Noise去除。优化空间还很大,通过测试不同参数组合和加入更多指标可以进一步提高策略稳定性。同时,采用动态止损和仓位管理也可以大幅优化策略表现。

|| 

## Overview

This strategy combines multiple EMAs with different parameter settings and the EOM volume indicator to determine trends across multiple timeframes and build a trading strategy with both long-term and short-term judgments. It aims to leverage the multi-timeframe resonance of different period moving averages to uncover longer-lasting trend patterns.

## Strategy Logic

The strategy uses 4 groups of EMAs with different period parameters - 13, 21, 50 and 180. These 4 EMAs establish multiple time dimensions to determine price trends and uncover longer-term trend patterns.

The strategy uses the EOM volume indicator to confirm trends. The EOM combines trading volume and price volatility range to effectively gauge buying and selling pressure. The strategy determines long conditions when EOM is above 0 and short conditions when EOM is below 0.

The strategy has two options. Option 1 goes long when shorter EMA crosses above longer EMA and closes long when shorter EMA crosses below longer EMA. Option 2 goes long when shorter EMA crosses above intermediate EMA and closes long when shorter EMA crosses below intermediate EMA. The two options allow more comprehensive trend confirmation.

## Advantages

- Using multi-timeframe EMAs to determine trends can uncover longer-term trend patterns
- EOM volume indicator effectively gauges buying/selling pressure, avoiding false signals from temporary pullbacks  
- Two optional entry methods enable more comprehensive trend confirmation
- Scaling out with layered exits reduces single exit exposure

## Risks

- EMAs have lag and may miss fast reversals
- Volume indicators can give false signals 
- Multiple condition criteria creates unclear entry
- Layered exits may be too mechanistic 

## Enhancement Opportunities

- Test more EMA period combinations to find optimal parameters
- Add other indicators like MACD for entry confirmation
- Adopt dynamic trailing stop loss to follow trends
- Adjust position sizing based on market conditions

## Summary

This strategy integrates multi-timeframe EMA trend determination and volume indicator filtering to achieve trend following and noise removal. There is still large room for optimization by testing different parameter combinations and adding more indicators to further improve robustness. Meanwhile, dynamic stop loss and position sizing can also significantly optimize performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|ema1l|
|v_input_2|21|ema2l|
|v_input_3|50|ema3l|
|v_input_4|180|ema4l|
|v_input_5|14|length|
|v_input_6|10000|Divisor|
|v_input_7|true|option1|
|v_input_8|false|option2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-02 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SoftKill21

//@version=4
strategy("4x ema + volume", overlay=true,initial_capital = 1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent , commission_value=0.1 )

//ema x 4
ema1l=input(13)
ema2l=input(21)
ema3l=input(50)
ema4l=input(180)

ema1=ema(close,ema1l)
ema2=ema(close,ema2l)
ema3=ema(close,ema3l)
ema4=ema(close,ema4l)

long1 = close > ema1 and ema1 > ema2 and ema2> ema3 and ema3 > ema4
long2 = crossover(ema1,ema2) and crossover(ema1,ema3)

short1 = close < ema1 and ema1 < ema2 and ema2< ema3 and ema3 < ema4
short2= crossunder(ema1,ema2) and crossunder(ema1,ema3)


//eom
length = input(14, minval=1)
div = input(10000, title="Divisor", minval=1)
eom = sma(div * change(hl2) * (high - low) / volume, length)


option1=input(true)
option2=input(false)

if(option1)
    strategy.entry("long",1,when=long1 and eom>0)
    strategy.close("long",when=short1 and eom<0)
 
if(option2)
    strategy.entry("long",1,when=long2 and eom>0)
    strategy.close("long",when=short2 and eom<0)   
```

> Detail

https://www.fmz.com/strategy/428787

> Last Modified

2023-10-09 15:05:47
