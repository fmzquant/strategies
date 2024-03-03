
> Name

4小时CCI反转策略4-Hour-CCI-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略是基于CCI指标进行反转交易的策略。它会在CCI指标出现超买超卖区时,进行反向交易。整体来说,该策略利用CCI指标的超买超卖特征,捕捉价格反转机会进行交易。

### 策略原理

首先,该策略基于CCI指标。其中CCI指标的计算公式为:

CCI = (Typical Price - 简单移动平均) / (0.015 * 均方差)

其中,
Typical Price = (最高价 + 最低价 + 收盘价)/3
简单移动平均 = 过去N天的Typical Price的移动平均
均方差 = 过去N天Typical Price偏差的平方和的均值

该策略使用长度为11的CCI指标。并设置了-150为超卖区,150为超买区。

在每根K线收盘时,会对长度为11的CCI指标进行检测。如果CCI下穿-150,则发出做多信号;如果CCI上穿150,则发出做空信号。

收到信号后,以市价单开仓。并设置了1%的止盈,0.5%的止损。

### 策略优势

1. 使用CCI指标,可以有效捕捉价格反转机会
2. CCI参数可调,可以测试出较优参数
3. 采用固定比例止盈止损,可以有效控制风险
4. 策略逻辑简单清晰,容易理解实现

### 风险及解决方案

1. CCI指标可产生大量假信号,进入市场的信号不一定可靠
- 解决方案:优化CCI的参数,结合其他指标过滤

2. 固定止盈止损比例,不同品种参数不一定合理
- 解决方案:加入动态止盈止损

3. 策略只基于CCI,风险单一,容易失效
- 解决方案:多种指标组合,提高稳定性

4. 没有考虑交易成本,实盘效果可能不佳
- 解决方案:加入滑点控制,降低交易频率

### 优化方向

1. 优化CCI的参数,找到更优参数组合
2. 加入如MACD,KDJ等其他指标,进行过滤进场
3. 开发动态止盈止损机制,而不是简单固定比例
4. 优化策略,使得交易频率降低,以减少交易成本影响
5. 进行回测优化,找到最优参数组合,为实盘交易做准备

### 总结

4小时CCI反转策略整体来说是一个利用CCI指标进行反转交易的简单策略。它具有策略逻辑清晰,易于实现的优点。但也存在CCI信号不稳定,止盈止损不够灵活等缺点。通过优化CCI参数,加入过滤指标,以及开发动态止盈止损等,可以进一步增强该策略的效果。总体上,该策略为量化交易提供了一个基于CCI指标的思路,但需要进一步优化方能实盘应用。

||


### Overview

This is a reversal trading strategy based on the CCI indicator. It will open reverse trades when the CCI indicator shows overbought or oversold levels. Overall, this strategy utilizes the overbought and oversold features of the CCI indicator to capture price reversal opportunities.

### Strategy Logic

Firstly, this strategy is based on the CCI indicator. The CCI indicator formula is:

CCI = (Typical Price - Simple Moving Average) / (0.015 * Standard Deviation)

Where,
Typical Price = (Highest + Lowest + Close) / 3
Simple Moving Average = Moving average of Typical Price over past N days  
Standard Deviation = Square root of variance of Typical Price over past N days

This strategy uses a 11-period CCI indicator. And -150 is set as the oversold level, while 150 as the overbought level.

On every bar close, the 11-period CCI indicator will be checked. If CCI crosses below -150, a long signal is generated. If CCI crosses above 150, a short signal is generated.

After receiving the signal, market order will be used to open position. 1% profit target and 0.5% stop loss are set.

### Advantage Analysis  

1. Using CCI indicator can effectively capture price reversal opportunities
2. CCI parameters are adjustable for optimization
3. Fixed profit target and stop loss ratio effectively controls risk 
4. Simple and clear strategy logic, easy to understand and implement

### Risk Analysis

1. CCI indicator may generate lots of false signals, entry signals may not be reliable
- Solution: Optimize CCI parameters, add filter with other indicators

2. Fixed profit target and stop loss ratio may not suit different products
- Solution: Add dynamic profit target and stop loss 

3. Strategy relies solely on CCI, risk of ineffectiveness is high
- Solution: Combine multiple indicators to improve robustness 

4. No consideration on trading cost, live performance may suffer
- Solution: Add slippage control, reduce trading frequency

### Optimization Directions

1. Optimize CCI parameters to find better parameter combinations
2. Add other indicators like MACD, KDJ for signal filtering 
3. Develop dynamic profit target and stop loss instead of fixed ratio
4. Optimize strategy to lower trading frequency, reducing trading cost impact
5. Conduct backtesting optimization to find best parameter combination for live trading

### Summary

The 4-hour CCI reversal strategy is a simple strategy utilizing CCI indicator for reversal trading. It has the advantage of clear logic and easy implementation. But it also has weaknesses like unreliable CCI signals and inflexible profit target/stop loss. Further improvements can be made by optimizing CCI parameters, adding filter indicators, developing dynamic exits, etc. Overall this strategy provides a CCI-based idea for quantitative trading, but requires further optimization before live application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|11|length|
|v_input_2|-150|overSold|
|v_input_3|150|overBought|
|v_input_4|15|Timeframe|
|v_input_5|16|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-10-12 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("4H CCI Strategy", overlay=true)
length = input( 11 )
overSold = input( -150 )
overBought = input( +150 )
price1 = high
price2 = low
ucci = cci(price1, length)
dcci = cci(price2, length)
vcci = cci(ohlc4, 11)

resCustom = input(title="Timeframe", defval="15")
Length = input(16, minval=1)
xPrice = request.security(syminfo.tickerid, resCustom, hlc3)
xvnoise = abs(xPrice - xPrice[1])
nfastend = 0.666
nslowend = 0.0645
nsignal = abs(xPrice - xPrice[Length])
nnoise = sum(xvnoise, Length)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
nAMA = nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))
basis1 = nAMA
slope = change(basis1,1)

if (not na(vcci))
    if (crossover(dcci, overSold))
        strategy.entry("CCILE", strategy.long, comment="CCILE")
        strategy.exit("exit", "CCILE", profit = 0.01, loss = 0.005)
    if (crossunder(ucci, overBought))
        strategy.entry("CCISE", strategy.short, comment="CCISE")
        strategy.exit("exit", "CCISE", profit = 0.01, loss = 0.005)
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/429145

> Last Modified

2023-10-13 15:29:05
