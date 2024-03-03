
> Name

动量反转指数策略Relative-Momentum-Index-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12591b9386780ef286c.png)

[trans]

### 概述

动量反转指数(Relative Momentum Index,RMI)策略是基于动量指数的改良策略。该策略通过计算一段时间内价格变化的动量,判断市场是否处于超买或超卖状态,以捕捉反转机会。

### 策略原理

RMI策略的计算公式如下:

```
xMom = xPrice - xPrice[Length]  //计算Length周期内的价格变动
xMU = 如果xMom >= 0:之前xMU减去xMU/Length加上xMom;否则:之前xMU 
xMD = 如果xMom <= 0:之前xMD减去xMD/Length加上xMom的绝对值;否则:0
RM = xMU / xMD  
RMI = 100 * (RM / (1 + RM))
```

该策略首先计算Length周期内的价格变动xMom。如果xMom>=0,表示价格上涨,则xMU累加xMom;如果xMom<0,表示价格下跌,则xMD累加xMom的绝对值。RM是xMU和xMD的比值,代表涨跌力度。RMI对RM做归一化处理,得到0-100之间的指数。

当RMI高于阈值SellZone时,表示超买,做空;当RMI低于阈值BuyZone时,表示超卖,做多。

### 策略优势

- RMI指数相比RSI指数,更加灵敏,能更早捕捉价格反转机会。
- RMI对涨跌力度进行度量,不会受到震荡行情的影响。
- RMI以动量为基础,能更准确判断超买超卖状态。

### 策略风险

- 和其他反转策略一样,RMI策略存在被套利的风险。强势行情下买点会被突破。
- RMI参数需要针对不同品种进行优化,否则效果可能不佳。
- 需要合理设置超买超卖阈值,否则会产生过多虚假信号。

可通过适当放宽止损点位、优化参数组合、与趋势策略组合等方式降低风险。

### 策略优化

RMI策略可从以下几个方面进行优化:

- 优化Length参数,选择能最大化策略收益的周期长度。
- 优化超买超卖阈值,降低虚假信号概率。
- 增加止损机制,控制单笔损失。
- 与趋势跟踪或均线策略组合,提高胜率。
- 根据不同品种特点选择合适的交易时段,提高策略稳定性。

### 总结

RMI策略通过测量价格动量变化,进行反转操作,可有效捕捉短线回调机会。相比RSI策略,RMI策略更灵敏,不受震荡影响。但该策略仍存在被套期风险,需优化参数并配合趋势策略使用,才能发挥最大效果。

||


### Overview

The Relative Momentum Index (RMI) strategy is an improved version based on the momentum index. It calculates price momentum over a period to determine if the market is overbought or oversold, in order to capture reversal opportunities.

### Strategy Logic

The RMI calculation formula is as follows:

```
xMom = xPrice - xPrice[Length]  // Price change over Length periods
xMU = If xMom >= 0: previous xMU minus xMU/Length plus xMom; else: previous xMU
xMD = If xMom <= 0: previous xMD minus xMD/Length plus absolute value of xMom; else: 0 
RM = xMU / xMD
RMI = 100 * (RM / (1 + RM))
```

First calculate the price change xMom over Length periods. If xMom>=0, meaning price rises, accumulate it into xMU; if xMom<0, meaning price drops, accumulate its absolute value into xMD. RM is the ratio between xMU and xMD, representing the momentum of ups and downs. RMI normalizes RM into the range of 0-100.

When RMI is higher than the threshold SellZone, the market is overbought, go short. When RMI is lower than BuyZone, the market is oversold, go long.

### Advantages

- Compared to RSI, RMI is more sensitive and can capture reversal opportunities earlier.
- RMI measures the momentum of ups and downs, less affected by consolidation. 
- Based on momentum, RMI can better determine overbought/oversold status.

### Risks

- Like other reversal strategies, RMI has the risk of being stopped out by strong trends. Long signals may get breached.
- RMI parameters need to be optimized for different products, otherwise the results may be poor.
- Overbought/oversold thresholds need to be set reasonably, otherwise too many false signals may occur.

Risks can be reduced by widening stop loss, optimizing parameters, combining with trend strategies etc.

### Improvement

RMI strategy can be improved from the following aspects:

- Optimize Length parameter to maximize return.
- Optimize overbought/oversold thresholds to reduce false signals.  
- Add stop loss to control single loss.
- Combine with trend following or moving average strategies to increase winning rate.
- Select appropriate trading sessions based on product characteristics to improve stability.

### Conclusion

RMI strategy captures short-term pullback opportunities by measuring price momentum change. Compared to RSI, RMI is more sensitive and robust to consolidation. But risks of being stopped out exist. Parameters need to be optimized and combined with trend strategies to maximize performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|40|BuyZone|
|v_input_3|70|SellZone|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-10-21 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/10/2017
// The Relative Momentum Index (RMI) was developed by Roger Altman. Impressed 
// with the Relative Strength Index's sensitivity to the number of look-back 
// periods, yet frustrated with it's inconsistent oscillation between defined 
// overbought and oversold levels, Mr. Altman added a momentum component to the RSI.
// As mentioned, the RMI is a variation of the RSI indicator. Instead of counting 
// up and down days from close to close as the RSI does, the RMI counts up and down 
// days from the close relative to the close x-days ago where x is not necessarily 
// 1 as required by the RSI). So as the name of the indicator reflects, "momentum" is 
// substituted for "strength".   
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Relative Momentum Index", shorttitle="RMI")
xPrice = close
Length = input(20, minval=1)
BuyZone = input(40, minval=1)
SellZone = input(70, minval=1)
reverse = input(false, title="Trade reverse")
// hline(0, color=gray, linestyle=dashed)
// hline(SellZone, color=red, linestyle=line)
// hline(BuyZone, color=green, linestyle=line)
xMom = xPrice - xPrice[Length]
xMU = iff(xMom >= 0, nz(xMU[1], 1) - (nz(xMU[1],1) / Length) + xMom, nz(xMU[1], 1))
xMD = iff(xMom <= 0, nz(xMD[1], 1) - (nz(xMD[1],1) / Length) + abs(xMom), nz(xMD[1], 0))
RM = xMU / xMD
nRes = 100 * (RM / (1+RM))
pos = iff(nRes < BuyZone, 1,
	   iff(nRes > SellZone, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(nRes, color=blue, title="RMI")
```

> Detail

https://www.fmz.com/strategy/430902

> Last Modified

2023-11-02 17:21:45
