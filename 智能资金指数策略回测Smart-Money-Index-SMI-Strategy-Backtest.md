
> Name

智能资金指数策略回测Smart-Money-Index-SMI-Strategy-Backtest

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略是基于智能资金指数(SMI)的量化交易策略。该指数反映了机构资金的运作情况,通过观察SMI指标的变化来判断市场未来的可能趋势。属于基于投资者情绪进行交易的策略类型。

## 策略原理

该策略的核心指标是智能资金指数(SMI)。其计算公式为:

SMI = SMA(今日收盘价 - 今日开盘价 + 昨日收盘价 - 昨日开盘价,N)

其中N为参数周期数。

SMI反映了机构资金的流入流出情况。当SMI上涨意味着资金净流入,说明智能资金看涨;当SMI下跌意味着资金净流出,说明智能资金看跌。

交易策略则是当SMI上涨做多,SMI下跌做空。通过这样来跟随智能资金的操作方向。

## 策略优势

- 基于智能资金指数,捕捉机构资金操作
- SMI指标计算简单,易于实现
- 反映投资者情绪,对市场变化敏感
- 可在多品种和多时间框架使用
- 参数可优化,适应能力强

## 策略风险

- SMI指标本身可能出现滞后
- 仅基于单一指标,容易被套
- 无法区分多空市场,需辅以技术分析
- 无法有效控制止损,存在较大回撤
- 需针对品种和周期优化参数

可以通过以下措施来降低风险:

- 优化SMI的周期参数
- 结合图形技术指标进行确认
- 设置止损止盈规则,控制风险
- 根据不同品种和周期进行参数优化
- 适当调整仓位管理系统

## 优化方向

该策略可以从以下几个方面进行优化:

1. 测试计算SMI的最佳周期数

2. 在SMI信号基础上加入MACD等指标过滤

3. 加入移动止损或固定点位止损 

4. 根据不同品种分别寻找optimal123参数

5. 对冲基金等不同周期分析寻找最佳周期

6. 根据市场波动程度调整仓位大小

## 总结

本策略通过智能资金指数反映市场参与者情绪,进行趋势跟踪交易。这可以及时捕捉到机构资金的操作方向。但SMI本身可能滞后,需进行优化;并且仅依赖单一指标容易被套,需要加入辅助技术指标进行过滤。通过参数调整、止损完善、动态仓位等方法,可以使该策略更稳健可靠。

|| 

## Overview

This is a quantitative trading strategy based on the Smart Money Index (SMI). The index reflects activities of institutional funds and is used to forecast potential market trends by analyzing SMI movements. It belongs to trading strategies based on investor sentiment analysis.

## Strategy Logic

The core indicator is the Smart Money Index (SMI). Its calculation formula is:

SMI = SMA(Today's close - Today's open + Yesterday's close - Yesterday's open, N)

Where N is the parameter period. 

The SMI reflects inflows and outflows of smart money. Rising SMI indicates net inflows, meaning smart money is bullish. Falling SMI indicates net outflows, meaning smart money is bearish.

The trading strategy goes long when SMI rises and goes short when SMI falls, to follow the movements of smart money.

## Advantages

- Based on SMI, captures smart money activities
- Simple SMI calculation, easy to implement
- Reflects investor sentiment, sensitive to market changes
- Applicable across products and timeframes
- Parameter tunable for adaptability 

## Risks

- SMI itself may lag
- Prone to whipsaws relying on single indicator
- Cannot differentiate bull/bear markets, needs TA
- No effective stops, large drawdowns 
- Parameters need optimization by product and timeframe

Risks can be reduced by:

- Optimizing SMI parameter period
- Adding technical indicators for confirmation 
- Implementing stop loss/profit rules for risk control
- Parameter tuning based on product and timeframe
- Adjusting position sizing system

## Enhancement Directions

The strategy can be improved by:

1. Finding optimal SMI calculation period

2. Adding filters like MACD on SMI signals

3. Incorporating moving or fixed stops

4. Product-specific parameter optimization

5. Identifying ideal periods for different timeframes like hedge funds

6. Adjusting position sizes by market volatility

## Summary

This strategy uses the Smart Money Index to reflect market participant sentiment for trend trading. It can capture moves of institutional funds in a timely manner. However, SMI may lag and sole reliance on one indicator can be risky. Improvements can be made through parameter tuning, adding filters, implementing stops, and dynamic position sizing. This can make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|18|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 01/08/2018
// Attention:
// If you would to use this indicator on the ES, you should have intraday data 60min in your account.
//
// Smart money index (SMI) or smart money flow index is a technical analysis indicator demonstrating investors sentiment. 
// The index was invented and popularized by money manager Don Hays.[1] The indicator is based on intra-day price patterns.
// The main idea is that the majority of traders (emotional, news-driven) overreact at the beginning of the trading day 
// because of the overnight news and economic data. There is also a lot of buying on market orders and short covering at the opening. 
// Smart, experienced investors start trading closer to the end of the day having the opportunity to evaluate market performance.
// Therefore, the basic strategy is to bet against the morning price trend and bet with the evening price trend. The SMI may be calculated 
// for many markets and market indices (S&P 500, DJIA, etc.)
//
// The SMI sends no clear signal whether the market is bullish or bearish. There are also no fixed absolute or relative readings signaling 
// about the trend. Traders need to look at the SMI dynamics relative to that of the market. If, for example, SMI rises sharply when the 
// market falls, this fact would mean that smart money is buying, and the market is to revert to an uptrend soon. The opposite situation 
// is also true. A rapidly falling SMI during a bullish market means that smart money is selling and that market is to revert to a downtrend 
// soon. The SMI is, therefore, a trend-based indicator.
// Some analysts use the smart money index to claim that precious metals such as gold will continually maintain value in the future.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Smart Money Index (SMI) Backtest", shorttitle="Smart Money Index")
Length = input(18, minval=1)
reverse = input(false, title="Trade reverse")
xcloseH1 = security(syminfo.tickerid, "60", close[1])
xopenH1 =  security(syminfo.tickerid, "60", open[1])
nRes = nz(nRes[1], 1) - (open - close) + (xopenH1 - xcloseH1)
xSmaRes = sma(nRes, Length)
pos = iff(xSmaRes > nRes, 1,
       iff(xSmaRes < nRes, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xSmaRes, color=red, title="SMASMI")
plot(nRes, color=green, title="SMI")
```

> Detail

https://www.fmz.com/strategy/427518

> Last Modified

2023-09-21 21:14:02
