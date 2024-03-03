
> Name

双波尔线量化期权策略Dual-Bollinger-Quant-Options-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双波尔线量化期权策略是一种利用双波尔线通道及RSI指标来产生交易信号的期权交易策略。该策略检测市场出现剧烈单边行情后反转的情况,尽管信号较少但值得一试。建议用5分钟周期,每次交易5根K线,即25分钟。

## 策略原理

该策略同时使用两组不同参数的波尔带。第一组波尔带参数长度为20,标准差倍数为2。第二组波尔带参数长度为20,标准差倍数为3。

当价格低于第二组波尔带下轨且RSI(14)<=20时生成买入信号;当价格高于第二组波尔带上轨且RSI(14)>=80时生成卖出信号。

根据波尔带理论,价格超出波尔带上下轨表示当前趋势反转的可能性较大。结合RSI过买过卖信号可以提高效率。使用双波尔带可以利用不同参数捕捉更多反转机会。

## 优势分析

- 利用双波尔带提高捕捉反转机会的概率

该策略使用参数不同的两组波尔带,可以在波动加剧时更容易捕捉到价格反转信号。相比单一波尔带,有效提高了反转交易的可实现性。

- RSI指标避免假突破,过滤无效信号 

RSI指标可有效判断市场是否处于超买超卖状态,过滤掉部分无效突破信号。RSI可与波尔带互补,提高信号的可靠性。

- 适合捕捉剧烈行情反转

双波尔带结合RSI可在市场出现剧烈单边突破后迅速捕捉反转机会。这类反转信号获利空间大但出现频率不高,适合利用期权进行交易。

- 交易频率低,回撤可控

该策略交易频率不高,可以有效控制交易回撤和滑点成本。不追求高频交易也更符合期权交易的特点。

## 风险分析

- 信号较少,存在长时间无交易的可能

由于该策略以捕捉反转为主,在持续趋势行情中信号可能较少。需要承受一定时间内无交易的风险。

- 波动不足时难以产生信号

在市场波动平缓时,价格难以突破波尔带上下轨,从而导致交易信号不足。这需要承受一段时间无交易的风险。

- 反转失败的风险

## 优化方向

- 优化波尔带参数

可以测试不同长度和标准差倍数的参数组合,找到最佳参数提高策略效果。

- 加入其他指标过滤

可以测试加入MACD,KD等其他指标来辅助过滤交易信号,提高信号质量。

- 优化期权合约选择

根据市场波动情况选择合适的期权合约,能够将策略效果发挥到最大。

- 优化交易时间段选择

通过测试可以找到最佳的交易时间段,避免无效信号,提高策略效果。

## 总结

双波尔线量化期权策略总体来说是一个效果尚可的低频反转交易策略。它利用双波尔带提高了捕捉概率,加入RSI指标提高了信号质量。但该策略交易频率较低,无法高频交易,也存在一定的反转失败风险。通过参数优化和加入其他过滤指标等方式还可进一步提高该策略的效果。总体来说,该策略适合追求稳定收益而非高频交易的量化交易者。


||

## Overview

The Dual Bollinger Quant Options Strategy is an options trading strategy that utilizes double Bollinger Bands and the RSI indicator to generate trading signals. It detects market reversals after aggressive one-sided moves. Although signals are less frequent, it is worth trying. Use 5-minute timeframe and trade for 5 candles, i.e. 25 minutes.

## Strategy Logic

The strategy uses two sets of Bollinger Bands with different parameters simultaneously. The first BBs has length of 20 and multiplier of 2. The second BBs has length of 20 and multiplier of 3. 

A buy signal is generated when price closes below the lower band of the second BBs and RSI(14) <= 20. A sell signal is generated when price closes above the upper band of the second BBs and RSI(14) >= 80.

According to Bollinger Bands theory, closing outside the bands indicates a higher chance of trend reversal. Combining with RSI overbought/oversold signals improves efficiency. Using double BBs captures more reversal opportunities with different parameters.

## Advantage Analysis

- Improved probability of catching reversals with double BBs

The dual BBs increase the chance of catching reversal signals during increased volatility. Using two sets of parameters is more likely to detect reversals than a single BB.

- RSI filters false breaks and invalid signals

RSI effectively judges overbought/oversold levels, filtering some invalid breakout signals. It complements BBs well and improves signal reliability.

- Suitable for catching sharp reversals 

The dual BBs with RSI can quickly capture reversal opportunities after aggressive one-sided moves. Such signals have large profit potential but less frequency, suitable for options trading.

- Low frequency trading controls drawdowns

The low trading frequency effectively controls drawdowns and slippage costs. It also suits the characteristics of options trading.

## Risk Analysis

- Possibility of prolonged no trading

As the strategy focuses on catching reversals, signals may be sparse during persistent trends. There is risk of no trading for some period.

- Difficult to generate signals when volatility is low

When volatility is low, price may fail to breakout of the BB bands, leading to insufficient signals. This carries risk of no trading for some duration.

- Failed reversal risk

Capturing reversals carries the risk of failed reversal. The price may reverse again after giving signal, causing losses. Proper position sizing and stop loss can help manage such risk.

## Optimization Directions 

- Optimize BB parameters

Test different combinations of length and multiplier to find optimal parameters for better performance.

- Add other indicators as filters 

Test adding MACD, KD etc. to filter trading signals and improve quality.

- Optimize options contracts selection

Choose suitable options contracts according to market volatility to maximize strategy performance.

- Optimize trading session selection

Testing can find the best trading sessions to avoid invalid signals and improve results.

## Conclusion

The Dual Bollinger Quant Options Strategy is an average-performing low-frequency mean reversion strategy overall. It improves capture rate with dual BBs and signal quality with RSI. But the low frequency trading limits high frequency trading. There are also risks of failed reversals. Further improvements can be made through optimizations and adding filters. It suits quant traders seeking steady returns over high frequency trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length1|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|20|length2|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_2|3|StdDev|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-27 00:00:00
end: 2023-09-26 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Trade_by_DB


//@version=5
strategy("Double Bollinger Binary Options", overlay=true, margin_long=100, margin_short=100)

// Bollinger bands #1 (20,2)
length1 = input.int(20, minval=1)
src1 = input(close, title="Source")
mult1 = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basis1 = ta.sma(src1, length1)
dev1 = mult1 * ta.stdev(src1, length1)
upper1 = basis1 + dev1
lower1 = basis1 - dev1

//Bollinger bands #2
length2 = input.int(20, minval=1)
src2 = input(close, title="Source")
mult2 = input.float(3.0, minval=0.001, maxval=50, title="StdDev")
basis2 = ta.sma(src2, length2)
dev2 = mult2 * ta.stdev(src2, length2)
upper2 = basis2 + dev2
lower2 = basis2 - dev2


//Buy Condition
buy = close < lower2 and ta.rsi(close,14) <=20
sell = close > upper2 and ta.rsi(close,14) >=80

// plotshape(buy, style = shape.arrowup , color = color.green, location = location.belowbar)
// plotshape(sell, style = shape.arrowdown , color = color.red, location = location.abovebar)





if (buy)
    strategy.entry("CALL", strategy.long)


if (sell)
    strategy.entry("PUT", strategy.short)

```

> Detail

https://www.fmz.com/strategy/427986

> Last Modified

2023-09-27 16:19:30
