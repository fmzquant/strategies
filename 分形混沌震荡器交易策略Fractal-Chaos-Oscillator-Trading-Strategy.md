
> Name

分形混沌震荡器交易策略Fractal-Chaos-Oscillator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算分形混沌震荡器(Fractal Chaos Oscillator, FCO)指标来判断市场趋势方向,实现趋势跟踪。FCO通过比较局部极大值和极小值的变化判断价格走势,数值范围在-1到1之间,数值越高表示趋势越明显。当FCO达到较高值时做多,达到较低值时做空。

## 策略原理 

通过寻找特定K线形态判断局部极大值和极小值。比较相邻两组极值的变化,计算出FCO指标。例如,当最新一组极大极小值与前一组不相同时,FCO为1,表示价格上涨趋势变强。根据FCO值判断趋势方向,数值越高时做多,数值越低时做空。

## 优势分析

- FCO指标判断趋势方向简单有效
- 无需复杂参数设置,使用方便
- 可在短线实现盈利,适合日内交易
- 可根据需要选择做多或做空

## 风险分析

- 分型识别不完全准确,可能错过转折点
- 无法准确判断趋势反转点,存在亏损风险
- 日内交易频繁,手续费负担较重

可适当优化参数,或结合其他指标来判断趋势反转。

## 优化方向

- 测试不同的分型周期参数
- 优化FCO的做多做空阈值
- 结合移动均线等指标判定趋势反转
- 在不同品种中测试参数健壮性

## 总结 

FCO策略通过简单的指标判断趋势方向,适合短线交易。可通过参数优化等方法提升效果。是一种易于实现的趋势跟踪策略思路。

||

## Overview

This strategy uses the Fractal Chaos Oscillator (FCO) indicator to determine market trend direction for trend following. FCO compares changes in local highs and lows to judge price movement, with values between -1 and 1. Higher values indicate stronger trends. Go long when FCO reaches high values, and short when reaching low values.

## Strategy Logic

Identify local highs and lows by looking for specific candlestick patterns. Compare changes between adjacent groups of highs/lows to calculate the FCO indicator. For example, if the latest high/low group differs from the previous group, FCO is 1, indicating uptrend strength increasing. Determine trend direction based on FCO value - go long on higher values and short on lower values.

## Advantages

- FCO effectively judges trend direction simply
- No complex parameters required, easy to use
- Profitable for short-term intraday trading  
- Flexibility to go long or short as needed

## Risks

- Pattern identification not fully accurate, may miss turns
- Cannot accurately determine trend reversal, risks losses
- Frequent intraday trading increases transaction costs

Risks can be reduced via parameter optimization and adding reversal indicators.

## Enhancement Opportunities

- Test different periods for pattern identification
- Optimize FCO long/short thresholds 
- Add moving averages etc. to determine trend reversal
- Test robustness across different products

## Conclusion

FCO strategy simplifies trend direction judgment for short-term trading. Performance can be improved via parameter tuning. An easily implemented trend following concept.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Pattern|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/02/2018
//   The value of Fractal Chaos Oscillator is calculated as the difference between 
// the most subtle movements of the market. In general, its value moves between 
// -1.000 and 1.000. The higher the value of the Fractal Chaos Oscillator, the 
// more one can say that it follows a certain trend – an increase in prices trend, 
// or a decrease in prices trend.
//
//   Being an indicator expressed in a numeric value, traders say that this is an 
// indicator that puts a value on the trendiness of the markets. When the FCO reaches 
// a high value, they initiate the “buy” operation, contrarily when the FCO reaches a 
// low value, they signal the “sell” action. This is an excellent indicator to use in 
// intra-day trading.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
fractalUp(pattern) =>
    p = high[pattern+1]
    okl = 1
    okr = 1
	for i = pattern to 1
		okl := iff(high[i] < high[i+1] and okl == 1 , 1, 0)
	for i = pattern+2 to pattern*2+1
		okr := iff(high[i] < high[i-1] and okr == 1, 1, 0)
	res = iff(okl == 1 and okr == 1, p, res[1])
    res

fractalDn(pattern) =>
    p = low[pattern+1]
    okl = 1
    okr = 1
	for i = pattern to 1
		okl := iff(low[i] > low[i+1] and okl == 1 , 1, 0)
	for i = pattern+2 to pattern*2+1
		okr := iff(low[i] > low[i-1] and okr == 1, 1, 0)
	res = iff(okl == 1 and okr == 1, p, res[1])
    res

strategy(title="Fractal Chaos Oscillator", overlay = false)
Pattern = input(1, minval=1)
reverse = input(false, title="Trade reverse")
xUpper = fractalUp(Pattern)
xLower = fractalDn(Pattern)
xRes = iff(xUpper != xUpper[1], 1, 
         iff(xLower != xLower[1], -1, 0))
pos = iff(xRes == 1, 1,
       iff(xRes == -1, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )           
plot(xRes, color=blue, title="FCO")
```

> Detail

https://www.fmz.com/strategy/427136

> Last Modified

2023-09-18 15:10:09
