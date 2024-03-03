
> Name

双机构量化反转追踪策略Reversal-Tracking-Strategy-with-Double-Mechanisms

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11b843c5242538a0f6f.png)
[trans]

#### 概述

本策略综合运用双机构指标的优势,采用123形态判断反转信号,辅以正量指数判断量能信号,实现对短线反转行情的捕捉。

#### 策略原理

1. 123形态判断反转信号

    - 使用9日Stoch指标的快线和慢线构建

    - 当收盘价连续两日下跌,第三日收盘价上涨时,并且Stoch快线低于50时,产生买入信号

    - 当收盘价连续两日上涨,第三日收盘价下跌时,并且Stoch快线高于50时,产生卖出信号

2. 正量指数判断量能信号 

    - 正量指数(PVI)通过比较前一日和今日的成交量变化判断量能

    - 当PVI上穿其N日移动平均线时,说明量能放大,产生买入信号

    - 当PVI下穿其N日移动平均线时,说明量能缩减,产生卖出信号

3. 双信号综合判断

    - 只有当123反转信号和PVI量能信号同向发出时,才产生交易信号

综上,该策略充分利用双机构指标的优势,能够有效识别短线量价反转机会。


#### 优势分析

1. 123形态判断,能够捕捉关键的短线反转点位

2. PVI量能指标,判断量价配合,避免假突破

3. Stoch指标参数优化,能过滤掉大部分躁动区域的无效信号

4. 双信号结合,可靠度较单一信号更高

5. 采用日内判断,避免隔夜风险,适合短线操作


#### 风险分析

1. 反转失败风险

    - 123形态反转信号并不总是有效,存在形态失败风险

2. 指标失效风险

    - 在某些异常行情下,Stoch和PVI等指标会失效

3. 双重信号遗漏风险

    - 同向双信号条件较为严苛,可能遗漏部分单边信号机会

4. 交易频率风险

    - 策略交易频率偏高,需要密切监控仓位和风控


#### 优化方向  

1. 参数优化空间大

    - Stoch窗口期、PVI周期数等参数存在优化空间

2. 可加入止损策略

    - 可结合移动止损保证策略胜率

3. 考虑加入过滤条件

    - 可测试加入均线、波动率等滤波指标

4. 优化双信号组合

    - 可测试更多双指标的组合套利


#### 总结

本策略通过 Stoch指标和 PVI 指标的组合,形成高可靠性的短线量价反转交易策略。相比单一指标,具有更高的胜率和正期望。通过参数优化和风控设置,可以进一步扩大夏普比率。总体来说,该策略利用双机构指标的优势,能够有效捕捉市场的短期反转机会,值得实盘验证优化。

|| 

#### Overview

This strategy combines the strengths of double mechanism indicators by using 123 pattern to determine reversal signals, and aided by Price Volume Index to determine momentum signals, in order to capture short-term reversal trends.

#### Strategy Logic

1. 123 pattern for reversal signal

    - Constructed with 9-day Stoch fast line and slow line

    - When close price falls for 2 consecutive days and rises on the 3rd day, and Stoch fast line is below 50, a buy signal is generated  

    - When close price rises for 2 consecutive days and falls on the 3rd day, and Stoch fast line is above 50, a sell signal is generated

2. Price Volume Index for momentum signal

    - PVI judges momentum by comparing volume change between previous and current day

    - When PVI crosses above its N-day moving average, momentum amplifies and a buy signal is generated

    - When PVI crosses below its N-day moving average, momentum declines and a sell signal is generated  

3. Dual signal combination

    - Trading signals are only generated when 123 reversal and PVI momentum signals agree

In summary, this strategy leverages the advantage of dual mechanism indicators to effectively identify short-term price-volume reversal opportunities.

#### Advantage Analysis  

1. 123 pattern catches key short-term reversal spots

2. PVI momentum judges coordinated price-volume action to avoid false breakouts

3. Parameter optimized Stoch filters out most noise signals in turbulent zones  

4. Dual signal reliability higher than single signals

5. Intraday design avoids overnight risks suitable for short-term trading

#### Risk Analysis

1. Failed reversal risk

    - 123 pattern reversal signals do not always succeed with pattern failure risks

2. Indicator failure risks  

    - Stoch, PVI and other indicators can fail in certain anomalous markets

3. Dual signal miss risk

    - Relatively stringent dual signal criteria may miss some single signal opportunities  

4. High trading frequency risks

    - Close monitoring of position sizing and risk control is needed for the high frequency strategy

#### Optimization Direction

1. Large parameter optimization space

    - Windows, cycles of Stoch, PVI etc. have optimization space

2. Can incorporate stop loss strategies

    - Mobile stop loss can ensure win rate  

3. Consider adding filter conditions

    - Tests can add moving average, volatility filters etc.  

4. Optimize dual signal portfolio

    - Test combinations of more dual indicator strategies

#### Summary

This strategy forms a high-reliability short-term price-volume reversal system through the combination of Stoch and PVI indicators. Compared to single indicators, it has higher win rate and positive expectancy. Sharpe ratio can be further improved via optimization and risk control. In conclusion, this strategy leverages the strengths of dual mechanism indicators to effectively capture short-term reversal opportunities in the market, and is worth live testing and optimization.[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Positive Volume Index ----|
|v_input_7|255|EMA_Len|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/04/2021
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// The theory behind the indexes is as follows: On days of increasing volume, 
// you can expect prices to increase, and on days of decreasing volume, you can 
// expect prices to decrease. This goes with the idea of the market being in-gear 
// and out-of-gear. Both PVI and NVI work in similar fashions: Both are a running 
// cumulative of values, which means you either keep adding or subtracting price 
// rate of change each day to the previous day`s sum. In the case of PVI, if today`s 
// volume is less than yesterday`s, don`t add anything; if today`s volume is greater, 
// then add today`s price rate of change. For NVI, add today`s price rate of change 
// only if today`s volume is less than yesterday`s.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos


PVI(EMA_Len) =>
    pos = 0.0
    xROC = roc(close, 1)
    nRes = 0.0
    nResEMA = 0.0
    nRes := iff(volume > volume[1], nz(nRes[1], 0) + xROC, nz(nRes[1], 0))
    nResEMA := ema(nRes, EMA_Len)
    pos := iff(nRes > nResEMA, 1,
        	 iff(nRes < nResEMA, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Positive Volume Index", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Positive Volume Index ----")
EMA_Len = input(255, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPVI = PVI(EMA_Len)
pos = iff(posReversal123 == 1 and posPVI == 1 , 1,
	   iff(posReversal123 == -1 and posPVI == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/437780

> Last Modified

2024-01-05 15:09:19
