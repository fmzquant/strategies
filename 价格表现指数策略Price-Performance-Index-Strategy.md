
> Name

价格表现指数策略Price-Performance-Index-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略运用价格表现指数(PPI)判断市场趋势方向,当PPI上涨时做多,下跌时做空。PPI通过计算一定周期价格变化百分比,判断价格动能和未来方向。

## 策略原理

主要逻辑:

- PPI计算一定周期(默认14日)的价格变化百分比

- 当PPI上涨时,说明价格在上升,做多

- 当PPI下跌时,说明价格在下降,做空

- 可选择反向交易信号

PPI的上涨表明价格在积累动能向上,下跌则代表价格动能向下。以一定参数跟踪PPI曲线,可捕捉中长线价格趋势。

## 策略优势

- 使用简单指标判断价格趋势和动量

-  Parameter可自由配置,适应多种品种

- 交易逻辑清晰直观

- 可反向交易,兼顾多种市场环境

## 策略风险 

- 无法滤除短期噪音,容易假突破

- 未考虑仓位管理和止损

- 参数不当可能错过趋势或者过度交易

应对方法:

- 优化参数,平衡稳定性和敏感度

- 增加止损策略,控制单笔损失

- 考虑仓位管理,降低单笔风险

## 策略优化方向

- 测试不同品种的参数组合

- 结合其他指标过滤假信号

- 开发动态仓位管理机制

- 增加移动止损或时间止损 

- 利用机器学习判断信号质量

## 总结

该策略基于价格表现指数判断趋势,具有简单性与通用性。通过参数优化、风控措施等进一步提升,可成为一个稳定的量化交易策略。它提供了基于简单指标判断趋势的有效思路。

|| 

## Overview

This strategy uses the Price Performance Index (PPI) to determine market trend direction - going long when PPI rises and short when it falls. PPI calculates price change percentage over a period to gauge price momentum and future direction.

## Strategy Logic

Main logic:

- PPI calculates percentage price change over a period (default 14 days) 

- When PPI rises, it indicates increasing price - go long

- When PPI falls, it indicates decreasing price - go short

- Option to reverse trade signals

Rising PPI shows accumulating upward momentum, falling PPI shows downward momentum. Tracking PPI with proper parameters can capture medium-long term trends.

## Advantages

- Simple indicator to determine price trend and momentum

- Customizable parameters fit various products

- Clear and intuitive trading logic 

- Reversal trading adapts to different market environments

## Risks

- Unable to filter out short-term noise, prone to false breakouts

- No position sizing or stop loss management 

- Poor parameters may miss trends or over-trade

Mitigations:

- Optimize parameters to balance stability and sensitivity

- Add stop loss to control loss per trade

- Consider position sizing to lower risk per trade

## Enhancement Opportunities

- Test parameter combinations for different products 

- Add other filters to screen false signals

- Develop dynamic position sizing mechanism 

- Add trailing or time-based stop loss

- ML to judge signal quality

## Conclusion

This strategy determines trend by price performance index, with simplicity and universality. Further improvements in parameters, risk controls etc. can make it a robust quant strategy. It provides an effective approach of using simple indicators for trend detection.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Period|
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
//  Copyright by HPotter v1.0 23/03/2018
// The Performance indicator or a more familiar term, KPI (key performance indicator), 
// is an industry term that measures the performance. Generally used by organizations, 
// they determine whether the company is successful or not, and the degree of success. 
// It is used on a business’ different levels, to quantify the progress or regress of a 
// department, of an employee or even of a certain program or activity. For a manager 
// it’s extremely important to determine which KPIs are relevant for his activity, and 
// what is important almost always depends on which department he wants to measure the 
// performance for.  So the indicators set for the financial team will be different than 
// the ones for the marketing department and so on.
//
// Similar to the KPIs companies use to measure their performance on a monthly, quarterly 
// and yearly basis, the stock market makes use of a performance indicator as well, although 
// on the market, the performance index is calculated on a daily basis. The stock market 
// performance indicates the direction of the stock market as a whole, or of a specific stock 
// and gives traders an overall impression over the future security prices, helping them decide 
// the best move. A change in the indicator gives information about future trends a stock could 
// adopt, information about a sector or even on the whole economy. The financial sector is the 
// most relevant department of the economy and the indicators provide information on its overall 
// health, so when a stock price moves upwards, the indicators are a signal of good news. On the 
// other hand, if the price of a particular stock decreases, that is because bad news about its 
// performance are out and they generate negative signals to the market, causing the price to go 
// downwards. One could state that the movement of the security prices and consequently, the movement 
// of the indicators are an overall evaluation of a country’s economic trend.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Perfomance index Backtest")
Period = input(14, minval=1)
reverse = input(false, title="Trade reverse")
xKPI = (close - close[Period]) * 100 / close[Period]
clr = iff(xKPI > 0, green, red)
p1 = plot(xKPI, color=blue, title="KPI")
p2 = plot(0, color=blue, title="0")
pos = iff(xKPI > 0, 1,
       iff(xKPI < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
fill(p1,p2,color=clr)
```

> Detail

https://www.fmz.com/strategy/427485

> Last Modified

2023-09-21 16:19:31
