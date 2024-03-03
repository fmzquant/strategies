
> Name

双移动均线反转策略Dual-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/7225e99b1a529be425.png)
[trans]

## 概述

这个策略使用2个指标来产生交易信号:2/20指数移动均线和平均真实波动范围反转指标。它结合了趋势跟随和短期反转两大策略思想,旨在发现反转机会。

## 原理

该策略由2部分组成:

1. 2/20指数移动均线。它计算最近20天的指数移动均线,当价格从上穿下或从下穿上移动均线时,产生交易信号。

2. 平均真实波动范围反转指标。它基于价格的平均真实波动范围计算停损位,当价格突破该停损位时,产生信号。这里使用的是3.5倍ATR作为止损位。  

这个策略整合了两者信号。当2/20EMA产生多头信号而ATR反转产生空头信号的时候,做空;当2/20EMA产生空头信号而ATR反转产生多头信号的时候,做多。

## 优势分析

这个策略结合了趋势跟随和反转两大思路,旨在发现价格反转的机会。具体优势有:

1. 2/20EMA能识别中期趋势,避免被市场噪音误导。

2. ATR反转指标能捕捉短期价格反转,把握反转机会。

3. 结合两者信号,能在中期趋势发生转折的时候提前捕捉,从而提高获利概率。

4. ATR止损位设置比较合理,有一定的风险控制效果。

5. 可自定义ATR倍数,适应不同品种特性。

6. 可选择正向或反向交易,适用于不同行情环境。

## 风险分析

该策略也存在以下风险:

1. 2/20EMA parameter较慢,可能错过短线机会。

2. ATR止损容易被突破打出,应适当宽松止损位。

3. 单一指标易产生错误信号,应结合更多因素过滤。

4. 需留意交易次数,防止过于频繁交易。

5. 需进行参数优化和回测,确认适合该品种。

6. 需严格遵守资金管理,控制单笔风险。

## 优化方向

该策略可从以下方面进行优化:

1. 调整EMA参数,寻找最佳参数组合

2. 优化ATR倍数大小,平衡止损幅度

3. 增加过滤条件,结合换手率、波动率等指标

4. 增加资金管理模块,动态调整仓位

5. 增加止损策略,如Chandelier Exit

6. 测试不同品种参数效果,找到最佳组合

7. 加入机器学习模型,利用大数据提升表现

8. 组合多个子策略,发掘更多Alpha

## 总结

该策略整合两大思路,具有一定的捕捉价格反转的能力。但也存在parameter选取不当带来的风险。可以从优化止损策略、增加过滤条件等方面进一步提升策略稳定性和盈利能力。

||


## Overview

This strategy uses 2 indicators to generate trading signals: 2/20 Exponential Moving Average and Average True Range Reversal. It combines the ideas of trend following and short-term reversal, aiming to capture reversal opportunities.  

## Principle 

The strategy consists of 2 parts:

1. 2/20 Exponential Moving Average. It calculates 20-day EMA and generates signals when price crosses EMA up or down.

2. Average True Range Reversal Indicator. It calculates stop loss level based on ATR, and generates signals when price breaks through the stop loss level. Here 3.5 x ATR is used as the stop level.

The strategy combines the signals from both. It goes short when 2/20 EMA gives long signal while ATR reversal gives short signal. It goes long when opposite signals generated.

## Advantage Analysis

The strategy combines trend following and reversal ideas, aiming to capture reversals. The advantages are:

1. 2/20 EMA identifies mid-term trend, avoids market noise. 

2. ATR reversal captures short-term reversals and opportunities.

3. Combining the signals captures trend reversal ahead of time and improves profitability. 

4. Reasonable ATR stop loss provides certain risk control.

5. Customizable ATR multiplier adapts to different products. 

6. Reversal option adapts to different market environments.

## Risk Analysis

The risks are:

1. 2/20 EMA is slow and may miss short-term chances.

2. ATR stop loss may be penetrated easily. Wider stop loss is needed.

3. Single indicator signal is unreliable. More filters are needed. 

4. Beware of over-trading.

5. Parameter tuning and backtest are needed to fit the product.

6. Strict capital management is needed to control risk per trade.

## Optimization Directions

The strategy can be improved from:

1. Tuning EMA parameters for best combination.

2. Optimizing ATR multiplier for better stop loss.

3. Adding filter conditions like volume and volatility. 

4. Adding capital management model for dynamic position sizing.

5. Adding other stop loss strategies like Chandelier Exit.

6. Testing parameters across different products.

7. Adding machine learning models for better performance. 

8. Combining multiple sub-strategies for more Alpha.

## Conclusion

The strategy combines two major ideas and has certain advantage of capturing reversals. But inappropriate parameter selection can also introduce risks. Further improvements on stop loss strategy and adding filters can enhance stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_int_2|5|(?●═════ Average True Range Reversed  ═════●)nATRPeriod|
|v_input_float_1|3.5|nATRMultip|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_3|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_4|true|From Month|
|v_input_int_5|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-27 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/04/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
// Average True Range Trailing Stops Strategy, by Sylvain Vervoort 
// The related article is copyrighted material from Stocks & Commodities Jun 2009 
// Please, use it only for learning or paper trading. Do not for real trading.
//
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos


ATRR(nATRPeriod,nATRMultip) =>
    pos = 0.0
    xATR = ta.atr(nATRPeriod)
    nLoss = nATRMultip * xATR
    xATRTrailingStop = 0.0
    xATRTrailingStop := close > nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), close - nLoss) :
                          close < nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), close + nLoss) : 
                          close > nz(xATRTrailingStop[1], 0) ? close - nLoss : close + nLoss
    pos:= close[1] < nz(xATRTrailingStop[1], 0) and close > nz(xATRTrailingStop[1], 0) ? 1 :
    	     close[1] > nz(xATRTrailingStop[1], 0) and close < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0) 
    pos

strategy(title='Combo 2/20 EMA & Average True Range Reversed', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════ Average True Range Reversed  ═════●'
nATRPeriod = input.int(5, group=I2)
nATRMultip = input.float(3.5, group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)
StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosATRR = ATRR(nATRPeriod,nATRMultip)
iff_1 = posEMA20 == -1 and prePosATRR == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosATRR == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/431003

> Last Modified

2023-11-03 16:51:18
