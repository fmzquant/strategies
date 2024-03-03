
> Name

三重EMA移动平均突破策略Triple-EMA-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

三重EMA移动平均突破策略是一种利用三重指数移动平均线指标进行交易信号判断的量化策略。当价格突破三重EMA时产生交易信号,根据价格突破的方向进行做多或做空操作。该策略主要用于捕捉中短线价格的趋势变化。

### 策略原理

1. 计算三重EMA,公式为:3 x EMA(n) - 3 x EMA[EMA(n)] + EMA[EMA(EMA(n))]

2. 当价格上穿三重EMA时,做多

3. 当价格下穿三重EMA时,做空

4. 平仓信号为价格重新跌破或涨穿三重EMA

三重EMA对单一EMA指标进行迭代,能更快速地追踪价格变动的趋势和转折点。它保留了EMA本身的趋势跟踪特性,同时也提高了对曲线的平滑程度。

在使用该策略时,突破的有效性取决于EMA参数的设置。参数可根据市场调整,从而获得最佳的交易效果。 

### 策略优势

- 三重EMA计算方法简单直接

- 更快速地响应价格变化

- 平滑曲线,有效过滤震荡

- 易于判断趋势方向

- 参数可调整,适应行情

### 风险提示 

- 存在一定的价格追随滞后

- 需要谨防出现假突破

- EMA参数设置需要不断优化

- 无法判断趋势的长短

### 总结

三重EMA移动平均突破策略对MA指标进行创新运用,在捕捉中短线趋势变化时具有独特优势。通过调整参数可实现良好的交易效果。该策略值得进行回测验证和实盘调整优化后进行应用。


||


### Strategy Overview

The triple EMA breakout strategy is a quantitative strategy that uses the triple exponential moving average (EMA) indicator for trade signal generation. It produces trading signals when price breaks through the triple EMA and goes long or short based on the breakout direction. The strategy mainly aims to capture medium-short term trend changes.

### Strategy Logic

1. Calculate the triple EMA with the formula: 3 x EMA(n) - 3 x EMA[EMA(n)] + EMA[EMA(EMA(n))]

2. Go long when price breaks above the triple EMA.

3. Go short when price breaks below the triple EMA. 

4. Exit signals are generated when price breaks back below or above the triple EMA.

The triple EMA iterates on the single EMA for faster reaction to trend and turning points. It retains the trend following nature of EMAs while smoothing the curve.

The breakout validity depends on EMA parameter tuning, which can be adjusted for optimal trading performance.

### Advantages of the Strategy

- Simple and direct triple EMA calculation 

- Faster response to price changes

- Smoothed curve, effective oscillation filter

- Easy trend direction identification

- Adjustable parameters adaptable to market conditions

### Risk Warnings

- Potential price following lag exists

- Prevent false breakouts 

- EMA parameter optimization required

- Hard to determine trend duration

### Conclusion

The triple EMA breakout strategy innovatively applies the MA indicator for unique advantages in capturing medium-short term trend changes. Excellent trading results can be achieved through parameter tuning. The strategy is worth backtesting, live optimization, and integration for application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|26|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-04-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 14/08/2018
// This study plots the TEMA1 indicator. TEMA1 ia s triple MA (Moving Average),
// and is calculated as 3*MA - (3*MA(MA)) + (MA(MA(MA)))
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="TEMA1 Backtest", shorttitle="TEMA", overlay = true )
Length = input(26, minval=1)
reverse = input(false, title="Trade reverse")
xPrice = close
xEMA1 = ema(xPrice, Length)
xEMA2 = ema(xEMA1, Length)
xEMA3 = ema(xEMA2, Length)
nRes = 3 * xEMA1 - 3 * xEMA2 + xEMA3
pos = iff(close > nRes, 1,
       iff(close < nRes, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
```

> Detail

https://www.fmz.com/strategy/426906

> Last Modified

2023-12-01 14:58:23
