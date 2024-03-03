
> Name

随机震荡策略Random-Oscillation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/179b87946ff09328a99.png)

[trans]

## 概述

随机震荡策略综合运用了一股寄与均线交叉、MACD指标以及Hull移动平均等多种技术指标,形成较为科学和系统的交易决策体系。该策略致力于在震荡行情中捕捉趋势转换点,以求发现并抓住行情中的潜在机会。

## 策略原理

首先,该策略同时采用了一股寄的转折线和基准线指标。其中,转折线以9周期内的最高价和最低价的平均值计算,基准线以24周期内的最高价和最低价的平均值计算。当价格从基准线下方上穿时,为买入信号;从基准线上方下穿时,为卖出信号。

其次,MACD作为一个重要的趋势跟踪指标,也被该策略所采用。MACD通过计算短期ema(12日)和长期ema(24日)的差值,再计算信号线(9日ema)。当MACD从下向上穿过信号线时,为买入信号;从上向下穿过信号线时,为卖出信号。

再者,Hull移动平均被引入该策略,以减少移动平均线的滞后性,提高价格转折信号的灵敏度。其计算方法是:以一半周期的WMA乘2,减去完整周期的WMA,再计算开方周期WMA。快速Hull MA和慢速Hull MA的交叉作为辅助的买卖信号。

最后,该策略综合以上多种指标的结果,形成较为可靠的交易决策系统。当一股寄、MACD和Hull MA等多个指标发出同向信号时,才会产生实际的买入和卖出操作。

## 策略优势

- 多指标组合,综合运用一股寄、MACD和Hull MA三种指标,形成较强的决策力。

- 减少假信号,不同指标之间可以进行验证,降低单一指标误判的概率。

- 提高操作效率,只在多个指标一致时出手,避免频繁交易。 

- 可调参数,指标参数可以根据市场调整,提高策略适应性。

- 降低滞后,Hull MA改进移动平均计算,可更早捕捉价格变化。

## 策略风险

- 多空混战行情风险较大,容易产生错误信号。

- 指标参数设置不当也会影响策略表现。

- 过于注重指标反转信号,可能错过趋势行情。

- Hull MA较新指标,长期有效性有待验证。

- 交易频率可能偏低,无法及时抓住全部机会。

## 优化方向 

- 可以测试添加其他指标,如Bollinger Bands,进一步优化决策系统。

- 可调整指标参数,找到最优参数组合。

- 可以引入动态止损机制来控制单笔损失。

- 可以结合趋势判断指标,避免错过趋势机会。

- 优化仓位管理,不同市场调整交易频率和仓位。

## 总结

随机震荡策略综合运用多种指标和技术分析方法,在震荡行情中寻找交易机会。它具有指标组合优势、减少假信号、提高操作效率等特点。但也存在一定的风险,需要进一步测试和优化,以适应更广泛的市场情况,在风险和收益之间找到最佳平衡点。总体来说,该策略是一个可靠、实用的震荡交易策略。

||


## Overview

The Random Oscillation Strategy integrates multiple technical indicators, including Ichimoku Kinko Hyo, MACD and Hull Moving Average, to form a systematic trading decision system. It aims to capture trend reversal points and potential opportunities during oscillating markets.

## Strategy Logic

Firstly, the Tenkan-sen and Kijun-sen of Ichimoku Kinko Hyo are adopted. Tenkan-Sen is calculated as the mean of the highest high and lowest low over the past 9 periods. Kijun-Sen is the mean of the highest high and lowest low over the past 24 periods. The crossovers of price and Kijun-sen act as trading signals.

Secondly, the MACD indicator is incorporated as an important trend-following momentum indicator. It shows the relationship between two EMAs of prices. Crossovers of MACD and its signal line generate trading signals.

Thirdly, the Hull Moving Average is introduced to improve the lagging issue of moving averages and increase sensitivity of catching price reversals. It is calculated using WMAs of half, full and square root periods. Crossovers between fast and slow Hull MAs also act as auxiliary signals.

Lastly, the strategy combines all indicators above to form a robust trading system. Actual entries and exits only occur when multiple indicators give unanimous signals. 

## Advantages

- Diversification via multiple indicators reduces single point failure.

- Integration provides stronger decision power through holistic model.

- Decreased false signals as every signal is verified by others.

- Improved efficiency by only acting on high-conviction signals.

- Customizable parameters to adapt the strategy to changing markets.

- Reduced lag and quicker response from Hull Moving Average.

## Risks

- Higher risk in ranging, choppy markets with increased false signals.

- Ineffective if indicator parameters are not properly optimized. 

- Potentially misses trending moves by focusing on reversals.

- Hull MA is relatively new and unproven in the long run.

- Infrequent trading could miss some opportunities.

## Enhancement

- Adding more indicators like Bollinger Bands could further optimize the system.

- Parameter tuning to find the optimal combination for different assets and timeframes.

- Introduce dynamic stops to control single trade loss.

- Incorporate trend filters to avoid missing trend rides.

- Optimize position sizing by adjusting frequency and size based on market conditions.

## Conclusion

The Random Oscillation Strategy combines multiple technical analysis techniques to capture opportunities in range-bound markets. It offers the advantages of indicator integration, reduced false signals and improved efficiency. But it also carries inherent risks that require further optimization and adaption. Overall, it represents a robust, practical approach for trading oscillating markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Double HullMA|
|v_input_2|9|Tenkan Sen Periods|
|v_input_3|24|Kijun Sen Periods|
|v_input_4|51|Senkou Span B Periods|
|v_input_5|24|Displacement|
|v_input_6|9|MACD_Length|
|v_input_7|12|MACD_fastLength|
|v_input_8|24|MACD_slowLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-11-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Ichimoku Kinko Hyo + HULL-MA_X + MacD", shorttitle="@m", overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=1000, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)

keh=input(title="Double HullMA",defval=12, minval=1)

n2ma=2*wma(close,round(keh/2))
nma=wma(close,keh)
diff=n2ma-nma
sqn=round(sqrt(keh))
n2ma1=2*wma(close[1],round(keh/2))
nma1=wma(close[1],keh)
diff1=n2ma1-nma1
sqn1=round(sqrt(keh))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
b=n1>n2?lime:red
c=n1>n2?green:red
d=n1>n2?red:green

TenkanSenPeriods = input(9, minval=1, title="Tenkan Sen Periods")
KijunSenPeriods = input(24, minval=1, title="Kijun Sen Periods")
SenkouSpanBPeriods = input(51, minval=1, title="Senkou Span B Periods")
displacement = input(24, minval=1, title="Displacement")
donchian(len) => avg(lowest(len), highest(len))
TenkanSen = donchian(TenkanSenPeriods)
KijunSen = donchian(KijunSenPeriods)
SenkouSpanA = avg(TenkanSen, KijunSen)
SenkouSpanB = donchian(SenkouSpanBPeriods)
LS=close, offset = -displacement

MACD_Length = input(9)
MACD_fastLength = input(12)
MACD_slowLength = input(24)
MACD = ema(close, MACD_fastLength) - ema(close, MACD_slowLength)
aMACD = ema(MACD, MACD_Length)

a1=plot(n1,color=c)
a2=plot(n2,color=c)
plot(cross(n1, n2) ? n1 : na, style = circles, color=b, linewidth = 4)
plot(cross(n1, n2) ? n1 : na, style = line, color=d, linewidth = 3)
plot(TenkanSen, color=blue, title="Tenkan Sen", linewidth = 2)
plot(KijunSen, color=maroon, title="Kijun Sen", linewidth = 3)
plot(close, offset = -displacement, color=orange, title="Chikou Span", linewidth = 2)
p1=plot (SenkouSpanA, offset = displacement, color=green,  title="Senkou Span A", linewidth = 2)
p2=plot (SenkouSpanB, offset = displacement, color=red,  title="Senkou Span B", linewidth = 3)
fill(p1, p2, color = SenkouSpanA > SenkouSpanB ? green : red)

closelong = n1<n2 and close<n2 and (MACD<aMACD or TenkanSen<KijunSen or close<KijunSen)
if (closelong)
    strategy.close("Long")

closeshort = n1>n2 and close>n2 and (MACD>aMACD or TenkanSen>KijunSen or close>KijunSen)
if (closeshort)
    strategy.close("Short")

longCondition = n1>n2 and close>n2 and MACD>aMACD and (TenkanSen>KijunSen or close>KijunSen) 
if (longCondition)
    strategy.entry("Long",strategy.long)

shortCondition = n1<n2 and close<n2 and MACD<aMACD and (TenkanSen<KijunSen or close<KijunSen)
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/431211

> Last Modified

2023-11-06 09:30:27
