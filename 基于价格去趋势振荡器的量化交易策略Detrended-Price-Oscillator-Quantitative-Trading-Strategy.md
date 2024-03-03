
> Name

基于价格去趋势振荡器的量化交易策略Detrended-Price-Oscillator-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略概述

本策略名称为“基于价格去趋势振荡器的量化交易策略”(Detrended Price Oscillator Quantitative Trading Strategy)。该策略通过构建价格去趋势振荡器指标,并以其为基础发出交易信号,属于典型的技术指标策略。

## 策略原理

该策略的核心是价格去趋势振荡器(DPO)指标。DPO指标类似于移动平均线,可以滤除价格中较长周期的趋势,使得价格中的周期性波动更加明显。具体来说,DPO指标是将价格与其N日简单移动平均线进行对比,当价格高于移动平均线时,DPO为正;当价格低于移动平均线时,DPO为负。这样就得到了一个振荡在0轴左右的指标。我们可以以DPO指标的正负来判断价格相对于趋势的涨跌。

本策略设置参数N为14,构建14日DPO指标。当DPO指标为正,则发出做多信号;当DPO指标为负,则发出做空信号。

## 策略优势

- DPO指标本质上是一种滤波指标,可以有效识别价格中的中短线周期。这对发现比较隐蔽的交易机会很有帮助。
- DPO指标构建简单,容易理解,参数选择也比较灵活。
- 相对价格本身,DPO指标的形态比较标准,容易判断,适合制定规则。

## 策略风险

- 如大多数技术指标策略一样,DPO策略容易产生多次无谓的交易信号。这可能带来不必要的滑点和交易成本。
- DPO指标对参数N很敏感,不同的参数选择会导致策略效果差异很大。必须经过大量测试找到最佳参数。
- 在趋势行情中,DPO策略的持仓时间可能会过长,无法及时止损,存在一定的失血风险。

为降低风险,可以考虑以下几个方面进行优化:
1. 加入止损机制,控制单笔损失。
2. 调整参数N的值,寻找最优参数。
3. 结合趋势指标,避免在明确趋势下仍按原策略交易。

## 总结

本策略基于价格去趋势振荡器指标发出交易信号。该指标通过与移动平均线比较,滤除价格中的长周期趋势,使得价格周期性特征更加明显。这有助于发现一些不易察觉的交易机会。同时也存在参数选择敏感、止损及过滤等问题。通过不断优化,该策略的效果还有很大提升空间。

||

## Strategy Overview

The strategy is named "Detrended Price Oscillator Quantitative Trading Strategy". It generates trading signals based on the Detrended Price Oscillator indicator, which is a typical technical indicator strategy.  

## Strategy Logic

The core of this strategy is the Detrended Price Oscillator (DPO) indicator. DPO is similar to moving average, which can filter out longer-term trends in prices to make cyclical fluctuations more pronounced. Specifically, DPO compares prices with their N-day simple moving average. When the price is above the moving average, DPO is positive; when the price is below the moving average, DPO is negative. This results in an oscillator fluctuating around the 0 axis. We can use the positive/negative of DPO to judge the rise/fall of prices relative to the trend.

This strategy sets the parameter N to 14 and constructs a 14-day DPO indicator. When DPO is positive, a long signal is issued. When DPO is negative, a short signal is issued.

## Advantages

- DPO is essentially a filtering indicator that can effectively identify medium-term cycles in prices. This is very helpful for discovering relatively concealed trading opportunities. 
- DPO has simple construction and is easy to understand. The parameter selection is also relatively flexible.
- Compared to the price itself, the DPO indicator pattern is more standardized and easier to judge, making it suitable for formulating rules.

## Risks

- Like most technical indicator strategies, the DPO strategy tends to generate unnecessary trading signals frequently. This may introduce unnecessary slippage and transaction costs.
- DPO is very sensitive to the parameter N. Different parameter selections can lead to very different strategy efficacy. Extensive testing is needed to find the optimal parameter.
- In trending markets, the holding period of DPO strategies may be too long to stop loss in time, posing some risk of blood loss.

To mitigate risks, optimization can be considered in the following aspects:

1. Add stop loss mechanisms to control single loss.

2. Adjust the value of parameter N to find the optimal parameter. 

3. Incorporate trend indicators to avoid trading against significant trends.

## Conclusion  

This strategy generates trading signals based on the Detrended Price Oscillator indicator. By comparing with moving averages, this indicator filters out long-term trends in prices to make price cyclic characteristics more pronounced. This helps to discover some concealed trading opportunities. At the same time, it also faces problems like parameter sensitivity, filtering, etc. There is still large room for efficacy improvement through continuous optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|close|Price|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-16 00:00:00
end: 2023-11-20 08:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 31/03/2017
// The Detrend Price Osc indicator is similar to a moving average, 
// in that it filters out trends in prices to more easily identify 
// cycles. The indicator is an attempt to define cycles in a trend 
// by drawing a moving average as a horizontal straight line and 
// placing prices along the line according to their relation to a 
// moving average. It provides a means of identifying underlying 
// cycles not apparent when the moving average is viewed within a 
// price chart. Cycles of a longer duration than the Length (number 
// of bars used to calculate the Detrend Price Osc) are effectively 
// filtered or removed by the oscillator.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Detrended Price Oscillator", shorttitle="DPO")
Length = input(14, minval=1)
Series = input(title="Price",  defval="close")
reverse = input(false, title="Trade reverse")
hline(0, color=green, linestyle=line)
xPrice = close
xsma = sma(xPrice, Length)
nRes = xPrice - xsma
pos = iff(nRes > 0, 1,
	     iff(nRes < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nRes, color=red, title="Detrended Price Oscillator")
```

> Detail

https://www.fmz.com/strategy/433079

> Last Modified

2023-11-24 11:22:30
