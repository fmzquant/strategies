
> Name

随机指标双轨突破策略Stochastic-Oscillator-Band-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

随机指标双轨突破策略是根据随机指标的两条轨道线进行交易操作的策略。其交易信号来源于随机指标快线对慢线及上下轨的突破。

该策略的具体逻辑是:

1. 计算一定周期内(例如7日)的随机指标的快线和慢线

2. 设置快线的上下两条轨道线(例如上轨80,下轨20)

3. 当快线从下方突破上轨时,做多

4. 当快线从上方突破下轨时,做空

5. 可选择反向交易信号,即做多变做空,做空变做多

通过快线突破上下轨来捕捉趋势,并以慢线作为支撑和压力,能够有效过滤假突破。此外,可以通过调整参数来适应不同周期。

## 策略优势

- 规则简单直观,容易实现

- 随机指标能较好地判断超买超卖现象

- 上下轨加慢线能有效过滤假突破

## 策略风险

- 速度差指标滞后,可能漏失机会

- 需要反复优化参数,适应市场环境

- 上下轨需要谨慎设置,避免过于频繁交易

## 总结

随机指标双轨突破策略通过快慢线轨道之间的突破来捕捉趋势机会。设置合理的参数能有效把握市场节奏,但需注意指标本身的滞后性问题。可考虑结合其他指标进行验证,以提高策略稳定性。


||

## Strategy Logic

The Stochastic Oscillator band breakout strategy generates trades based on the fast line of the Stochastic Oscillator breaking through upper and lower bands. 

The logic is:

1. Calculate the fast and slow Stochastic Oscillator lines over a lookback period (e.g. 7 days)

2. Set upper and lower bands for the fast line (e.g. 80 and 20) 

3. Go long when the fast line breaks above the upper band

4. Go short when the fast line breaks below the lower band

5. Optionally reverse the signals (longs become shorts, shorts become longs)

Breakouts of the bands with the slow Stochastic line as support/resistance can effectively filter false breaks. Parameters can also be tuned to suit different cycles.

## Advantages

- Simple and intuitive rules  

- Stochastics effective for overbought/oversold

- Bands + slow line filter false breaks

## Risks

- Lagging stochastics may miss opportunities

- Requires parameter optimization for market adaption 

- Band settings need caution to avoid over-trading

## Summary

The Stochastic breakout strategy capitalizes on trend opportunities using fast/slow line band breaks. With well-tuned parameters, it can effectively capture market rhythm but lag is a key risk to note. Combining with other confirming indicators can improve strategy robustness. 

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Length|
|v_input_2|3|DLength|
|v_input_3|20|UpBand|
|v_input_4|80|DownBand|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/10/2017
// This back testing strategy generates a long trade at the Open of the following 
// bar when the %K line crosses up UpBand line.
// It generates a short trade at the Open of the following bar when the %K line 
// crosses down DownBand line.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Strategy Stochastic", shorttitle="Strategy Stochastic")
Length = input(7, minval=1)
DLength = input(3, minval=1)
UpBand = input(20, minval=1)
DownBand = input(80, minval=1)
reverse = input(false, title="Trade reverse")
hline(50, color=black, linestyle=hline.style_dashed)
hline(UpBand, color=red, linestyle=hline.style_solid)
hline(DownBand, color=green, linestyle=hline.style_solid)
vFast = stoch(close, high, low, Length)
vSlow = sma(vFast, DLength)
pos = iff(vFast > UpBand, 1,
	   iff(vFast < DownBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(vSlow, color=blue, title="D")
plot(vFast, color=red, title="K")
```

> Detail

https://www.fmz.com/strategy/426780

> Last Modified

2023-09-14 15:31:25
