
> Name

逆向工程RSI策略Reverse-Engineering-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/169f3667150e464014e.png)
[trans]

## 概述

逆向工程RSI策略是一种基于RSI指标的交易策略。该策略通过模拟RSI指标的计算过程,反向推导出价格,从而产生交易信号。

## 策略原理  

该策略的核心思路是:

1. 计算RSI指标中的K值、ExpPer周期、AUC上涨序列和ADC下跌序列。

2. 根据RSI的参数设置、ADC、AUC序列值等反向计算得到nVal。

3. 根据nVal加到价格上,反向求得nRes。

4. 比较nRes和当前close价格,产生长仓和短仓信号。

具体来说,策略首先计算出RSI中的一些关键参数,包括K值、ExpPer周期、AUC上涨序列和ADC下跌序列。其中,K值为平滑因子,ExpPer为RSI参数设置的两倍减1。

然后根据这些参数,策略反向推导价格。首先计算一个关键变量nVal,它等于(WildPer - 1) *(ADC_ Value / (100 - Value) - AUC)。  该公式反向推导RSI的计算过程。

接着将nVal加到当前close价格上,得到反向工程的价格nRes。 最后,如果nRes高于当前close价格则产生短仓信号,如果nRes低于当前close价格则产生长仓信号。

## 优势分析

该策略主要有以下优势:

1. 利用RSI指标的计算过程进行逆向推导,思路新颖,具有一定的创新性。

2. 反向工程价格,产生与市场相反的交易信号,可以实现做空的效果,扩大了策略的应用范围。

3. RSI是一种成熟和常用的交易指标,参数设置合理,可靠性较高,风险较低。

4. 策略思路清晰易懂,参数较少,易于实现,适合量化交易的要求。

## 风险分析  

该策略也存在一些风险:  

1. 反向工程价格仅仅依据RSI计算,如果RSI发出错误信号,则策略信号也会失效。

2. 反向信号与市场总体走势可能不一致,需要关注大市场的环境。

3. RSI参数设置需要经验,如果不当可能导致过于频繁交易或发出错误信号。

4. 反向操作做空风险高,需要严格的资金管理,防止爆仓。

可以通过优化RSI参数,结合其他指标,严格资金管理来控制风险。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化RSI的参数WildPer和Value,使其更好地适应市场行情。

2. 增加止损策略,以锁定利润,减少亏损。

3. 结合其他指标如MACD进行优化,使信号更加准确可靠。  

4. 添加开仓过滤条件,避免不必要的失误交易。

5. 优化资金管理策略,严格控制单笔交易的资金量,防止超出可承受损失。

## 总结

逆向工程RSI策略通过反向推导RSI指标的计算过程,生成与市场相反的交易信号。该策略思路独特,具有一定创新性,可以实现做空,扩大策略应用范围。但也存在反向操作的风险,需要进行适当优化和风险控制。总体来说,该策略为量化交易提供了新的思路和工具。

||


## Overview

The Reverse Engineering RSI strategy is a trading strategy based on the RSI indicator. This strategy deduces the price inversely by simulating the calculation process of the RSI indicator to generate trading signals.

## Strategy Logic

The core idea of this strategy is:  

1. Calculate the K value, ExpPer period, AUC rising sequence and ADC falling sequence in the RSI indicator.

2. Inversely calculate nVal based on RSI parameter settings, ADC, AUC sequence values, etc.  

3. Add nVal to the price to inversely deduce nRes.

4. Compare nRes with the current close price to generate long and short signals.

Specifically, the strategy first calculates some key parameters in RSI, including the K value, ExpPer period, AUC rising sequence and ADC falling sequence. Among them, the K value is the smoothing factor, and ExpPer is twice the RSI parameter setting minus 1.

Then, according to these parameters, the strategy deduces the price inversely. First, a key variable nVal is calculated, which equals (WildPer - 1) * (ADC_Value / (100 - Value) - AUC). This formula deduces the RSI calculation process inversely.  

Then add nVal to the current close price to get the reverse engineered price nRes. Finally, if nRes is higher than the current close price, a short signal is generated. If nRes is lower than the current close price, a long signal is generated.

## Advantage Analysis 

The main advantages of this strategy are:

1. It innovatively deduces the RSI calculation process inversely. The logic is novel and innovative to some extent. 

2. The reverse engineered price generates trading signals opposite to the market, which enables short selling to expand the application scope of the strategy.

3. RSI is a mature and commonly used trading indicator with reasonable parameter settings and high reliability and low risk.  

4. The strategy logic is clear and easy to understand. The few parameters make it easy to implement and meet the requirements of quantitative trading.

## Risk Analysis

There are also some risks to this strategy:

1. The reverse engineered price relies solely on RSI calculations. If RSI sends wrong signals, the strategy signals will also fail.

2. The reverse signals may not be consistent with the overall market trend. The overall environment needs attention.

3. RSI parameter setting requires experience. Improper settings may lead to over-frequent trading or wrong signals. 

4. Short selling with reverse operations has high risks. Strict money management is required to prevent account blowups.

The risks can be controlled by optimizing RSI parameters, combining other indicators, and strict money management.

## Optimization Directions

The strategy can be optimized in the following aspects:  

1. Optimize the RSI parameters WildPer and Value to better adapt to market conditions.

2. Add stop loss strategies to lock in profits and reduce losses.  

3. Combine with other indicators like MACD to generate more accurate and reliable signals.

4. Add open position filters to avoid unnecessary losing trades.  

5. Optimize money management strategies to strictly control the capital per trade to prevent losses beyond affordable range.

## Conclusion  

The Reverse Engineering RSI strategy generates trading signals opposite to the market by deducing the RSI calculation process inversely. The strategy has unique logic and certain innovation, enabling short selling to expand its application scope. But there are also risks of reverse operations that need proper optimization and risk control. Overall, the strategy provides new ideas and tools for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Value|
|v_input_2|14|WildPer|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/10/2017
// The related article is copyrighted material from
// Stocks & Commodities.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Reverse Engineering RSI, by Giorgos Siligardos", overlay = true)
Value = input(50, minval=1)
WildPer = input(14,minval=1)
reverse = input(false, title="Trade reverse")
ExpPer = 2 * WildPer - 1
K = 2 / (ExpPer + 1)
AUC = iff(close > close[1], K * (close - close[1]) + (1 - K) * nz(AUC[1], 1), (1-K) * nz(AUC[1], 1))
ADC = iff(close > close[1], (1-K) * nz(ADC[1], 1), K * (close[1] - close) + (1 - K) * nz(ADC[1], 1))
nVal = (WildPer - 1) * (ADC * Value / (100 - Value) - AUC)
nRes = iff(nVal >= 0, close + nVal, close + nVal * (100 - Value) / Value)
pos = iff(nRes > close, -1,
	   iff(nRes < close, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="Reverse Engineering RSI")
```

> Detail

https://www.fmz.com/strategy/433569

> Last Modified

2023-11-28 15:50:07
