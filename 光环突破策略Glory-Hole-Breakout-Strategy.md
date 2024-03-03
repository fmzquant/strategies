
> Name

光环突破策略Glory-Hole-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157be87a48d6302da71.png)

[trans]

## 概述

光环突破策略是一种趋势跟踪策略,它结合了移动平均线和ADX指标来判断价格走势和趋势强度,在突破移动平均线时进入场内。该策略简单实用,能有效跟踪趋势,获利潜力大。

## 策略原理

该策略主要基于三个指标:

1. SMA移动平均线:计算一定周期的收盘价的简单移动平均值,判断价格趋势方向。

2. ADX平均趋向指数:测量趋势的强度,ADX越高表示趋势越明显。

3. 光环条件:当收盘价高于开盘价,而收盘价接近最低价时为看涨光环,当收盘价低于开盘价,而收盘价接近最高价时为看跌光环。

策略逻辑:

1. 计算N周期的SMA值,判断价格总体趋势。

2. 计算M周期的ADX值,判断趋势强度。只有在ADX高于设定阈值时才产生交易信号。

3. 当价格形成看涨光环,并且收盘价高于SMA,且ADX高于阈值时,做多。

4. 当价格形成看跌光环,并且收盘价低于SMA,且ADX高于阈值时,做空。

5. 止损或止盈退出仓位。

## 策略优势

1. 结合趋势方向和强度指标,能有效跟踪趋势。

2. 光环条件过滤掉大部分无效突破,提高entries的胜率。

3. 采用SMA而非EMA,有利于把握中长线趋势。

4. ADX指标避免在无明显趋势时交易,有利于把握高概率操作。

5. 策略规则简单清晰易于实现。

## 策略风险

1. SMA系滞后指标,可能出现早期入场或晚期入场导致stops被触发。可以适当优化SMA周期参数。

2. ADX作用是过滤震荡市,但在趋势反转时可能误判产生损失。可以降低ADX条件形成的风险。

3. 光环虽可过滤假突破,但实际操作中仍需注意风险管理,适当调整止损位置。

4. 策略未考虑多空平衡因素,需要人工干预或优化 logic。

## 策略优化方向

1. 优化SMA和ADX的参数,找到最佳参数组合。

2. 增加其他指标判断趋势,如布林带,KDJ等,提高entry质量。 

3. 增加平仓条件,如趋势反转,回撤比例等,完善exit logic。

4. 增加对多空比例的判断,避免单边交易过度。

5. 优化止损策略,改进固定止损为追踪止损或分批止损。

6. 优化资金管理策略,更好的控制单笔风险。

## 总结

光环突破策略整合移动平均线和ADX指标判断趋势方向和强度,在光环条件过滤下产生交易信号,是一种简单实用的趋势跟踪策略。该策略具有把握趋势、过滤噪音的优势,但也存在趋势判断滞后、止损风险等问题。我们可以通过优化参数、完善enter和exit逻辑、改进风险管理等手段,进一步提升策略的效率和稳定性。


|| 


## Overview

The Glory Hole breakout strategy is a trend following strategy that combines moving average and ADX indicators to determine price trend and strength, and enters the market when price breaks through the moving average. This simple and practical strategy can effectively track trends and has high profit potential.

## Strategy Logic

The strategy is mainly based on three indicators:

1. SMA: Simple moving average to determine price trend direction. 

2. ADX: Average directional movement index to measure trend strength. Higher ADX indicates stronger trend.

3. Glory Hole Condition: Bullish when close > open and close near low. Bearish when close < open and close near high.

The trading logic is:

1. Calculate N-period SMA to determine overall trend.

2. Calculate M-period ADX to determine trend strength. Trade only if ADX is above threshold.

3. Go long when bullish glory hole forms, close > SMA and ADX > threshold. 

4. Go short when bearish glory hole forms, close < SMA and ADX > threshold.

5. Exit with stop loss or take profit.

## Advantages

1. Combines trend direction and strength for effective trend following.

2. Glory hole filters out false breakouts and improves entry quality.

3. SMA captures mid to long term trends better than EMA. 

4. ADX avoids trading in no-trend zones, ensuring high probability setups.

5. Simple and clear rules easy to implement.

## Risks

1. SMA lag may cause premature or delayed entries leading to stopped out trades. Optimize SMA Period.

2. ADX may wrongly judge trend reversal as no-trend zone. Lower ADX threshold to manage risk.

3. Despite glory hole, tight risk management needed for real trades. Adjust stop loss properly. 

4. Lack of long/short balance logic. Manual intervention or optimization needed.


## Enhancement Opportunities 

1. Optimize SMA and ADX parameters to find best combination.

2. Add other trend indicators like Bollinger or KDJ to improve entry quality.

3. Add exit logic like trend reversal or drawdown percentage to refine exits.

4. Add long/short ratio judgement to avoid excessive one-sided trades.

5. Optimize stop loss from fixed to trailing or staggered.

6. Optimize risk management for better single trade risk control.

## Summary

The Glory Hole strategy integrates SMA and ADX to determine trend direction and strength. It generates signals on glory hole condition to effectively track trends. The strategy has the advantage of capturing trends and filtering noise, but also lagging trend determination and stop loss risks. Further improvements in parameter optimization, enter/exit logic, and risk management will enhance its efficiency and stability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|SMA|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|30|ADX Tradelevel|
|v_input_4|14|ADX Smoothing|
|v_input_5|14|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-18 00:00:00
end: 2023-10-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Glory Hole with SMA + ADX", overlay=true)
len = input(20, minval=1, title="SMA")
src = input(close, title="Source")
ADXlevel = input(30, minval=1, title="ADX Tradelevel")
out = sma(src, len)

//adx
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
	minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) => 
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)

sig = adx(dilen, adxlen)

plot(out, title="SMA", color=blue)

bullish = ((out<close) and (out<open) and (out>low) and (sig>ADXlevel))
bearish = ((out>close) and (out>open) and (out<high) and (sig>ADXlevel))


if (bullish)
    strategy.entry("Buy", strategy.long)

if (bearish)
    strategy.entry("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/430124

> Last Modified

2023-10-25 11:35:36
