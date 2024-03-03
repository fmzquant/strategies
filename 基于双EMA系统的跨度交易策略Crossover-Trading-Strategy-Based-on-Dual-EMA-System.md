
> Name

基于双EMA系统的跨度交易策略Crossover-Trading-Strategy-Based-on-Dual-EMA-System

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略通过计算一快一慢两个EMA指标,根据其交叉情况产生买入和卖出信号,属于典型的趋势跟踪策略。当快线上穿慢线时做多,下穿时平多头;当快线下穿慢线时做空,上穿时平空头。

### 策略原理

策略分别计算一快一慢两个EMA均线,分别周期为13和50。当快线从下向上突破慢线时产生买入信号做多;当快线从上向下跌破慢线时产生卖出信号做空。

做多后,如果快线重新跌破慢线,则产生平多头信号;做空后,如果快线重新突破慢线,则产生平空头信号。

### 优势分析

该策略采用常见的双EMA系统,根据不同期限EMA的交叉情况判断行情趋势和入场点位。双EMA配合运用,可以有效过滤噪音,识别趋势。

操作简单直观,易于实现自动化。且仅需要根据价格信息即可实现,不需要考虑其他复杂因素。可自由调整EMA周期,适应不同市场环境。

### 风险分析

双EMA交叉系统对曲折变化的趋势识别效果一般。在震荡区间市场中,EMA交叉信号频繁,容易被套牢。仅考虑价格因素,而未综合考虑其他要素。

可适当扩大EMA周期间隔,减少交叉频率。也可以加入成交量或波动率等指标进行辅助判断。此外,优化止损策略也可以降低被套风险。

### 优化方向

1. 测试优化EMA周期参数,找到最优参数。

2. 增加量能指标或波动率指标等判断规则。

3. 结合突破信号等,设定更严格的入场条件。

4. 应用机器学习预测价格趋势,辅助EMA判定信号质量。

5. 优化止损策略,如移动止损、平均止损等方式。

6. 动态调整仓位,优化资金管理。

### 总结

该策略属于典型的双EMA交叉系统,通过简单的指标组合判断趋势。优点是易于实现,但也容易产生误信号。结合更多指标以及参数优化可以提高策略稳定性。总体来说,其提供了一个简洁的趋势跟踪策略模板。

||

### Overview

This strategy computes one fast and one slow EMA indicators, generating buy and sell signals based on their crossover situation, belonging to a typical trend following strategy. It goes long when the fast line crosses above the slow line, and flattens longs when the fast line crosses below the slow line. Conversely, it goes short when the fast line crosses below the slow line, and flattens shorts when the fast line crosses above the slow line.

### Strategy Logic 

The strategy computes one fast and one slow EMA lines, with periods of 13 and 50 respectively. When the fast line breaks out upwards crossing the slow line, a buy signal is generated to go long. When the fast line breaks downwards crossing below the slow line, a sell signal is generated to go short.

After going long, if the fast line recrosses below the slow line, a flatten long signal is generated. After going short, if the fast line recrosses above the slow line, a flatten short signal is generated.

### Advantage Analysis

The strategy adopts the common dual EMA system, judging trend and entry points based on crossover situations between different timeframe EMAs. The dual EMAs can effectively filter noise and identify trends when used together.

The operations are simple and intuitive, easy to automate. It only needs price information, without considering other complex factors. The EMA periods can be freely adjusted to adapt to different market environments.

### Risk Analysis

The dual EMA crossover system has mediocre performance in identifying intricate trends. In ranging markets, EMA crossover signals may be frequent, risking whipsaws. Only price factors are considered without incorporating other elements.

Increasing the interval between the EMA periods could reduce crossover frequency. Volume or volatility indicators could also help provide additional insight. Optimizing stop loss strategies may also lower whipsaw risks.

### Optimization Directions

1. Test and optimize EMA period parameters to find the optimal settings.

2. Add volume, volatility or other judgement rules. 

3. Incorporate breakout signals etc to set more stringent entry conditions.

4. Apply machine learning to predict trends and aid EMA signal quality determination.

5. Optimize stop loss strategies such as trailing stops, average stops etc.

6. Dynamically adjust position sizing to optimize capital management.

### Summary

The strategy belongs to the typical dual EMA crossover system, gauging trends by simple indicator combinations. It is easy to implement but also prone to false signals. Combining more indicators and parameter optimization can improve robustness. Overall it provides a concise trend following strategy template.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|LSEMA|
|v_input_2|50|LLEMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-09-12 22:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © himanshumahalle

//@version=4
strategy("CROSS_ALGO SYSTEM")


// INPUT CONTROLS

lengthSEMA= input(title="LSEMA", type = input.integer, defval=13,minval=1,maxval=100,step=1)
lengthLEMA= input(title="LLEMA", type = input.integer, defval=50,minval=1,maxval=100,step=1)

//INDICATOR

SEMA= ema(close,lengthSEMA)
LEMA= ema(close,lengthLEMA)

// BUY AND SELL

buy = crossover(SEMA,LEMA)
sell = crossunder(SEMA,LEMA)

//EXITS

buyexit = crossunder(SEMA,LEMA)
sellexit = crossover(SEMA,LEMA)


//EXECUTION

strategy.entry("long",strategy.long,when=buy,comment = "Buy")
strategy.entry("short",strategy.short,when=sell,comment = "Sell")

strategy.close("long",when= buyexit , comment= "Sell")
strategy.close("short",when= sellexit , comment= "Buy")



```

> Detail

https://www.fmz.com/strategy/427348

> Last Modified

2023-09-20 11:39:40
