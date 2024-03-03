
> Name

反转追踪策略Parabolic-SAR-RSI-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

反转追踪策略基于“抛物线止损反转”和“相对强度指数”指标,通过识别价格的突破来产生交易信号。当价格突破上行或下行趋势线时,该策略会发出交易信号,采取相反的头寸。这可以抓住价格反转的机会。

## 策略原理

该策略主要使用两个技术指标:

1. 抛物线止损反转(Parabolic SAR):该指标会绘制一条抛物线,作为动态的止损线。当价格突破该线时,止损线的位置和方向都会被重置,从而产生买入或卖出信号。

2. 相对强度指数(RSI):该指标反映了一段时间内价格涨跌的速度和变化。当RSI高于超买线时为超买区,低于超卖区时为超卖区。 

具体来说,策略首先根据用户输入设置抛物线止损反转的初始值、步长和最大值。然后根据价格是否突破抛物线来判断买入和卖出时机:

- 当价格从上方突破抛物线时,产生卖出信号
- 当价格从下方突破抛物线时,产生买入信号

同时,策略还会监控RSI指标,判断是否处于超买超卖区。当RSI进入超买区时,会平掉多头头寸;当RSI进入超卖区时,会平掉空头头寸。

综合抛物线反转信号和RSI过滤信号,该策略可以在价格反转时及时做出相反操作,实现低买高卖的目标。

## 优势分析

该反转追踪策略主要有以下优势:

1.  Capture Price Reversal - 利用突破产生反转信号,可以在价格转向时及时做出相反操作,捕捉反转机会。

2.  Dynamic Stop Loss - 抛物线作为移动止损,可以根据实时价格动态调整止损位置,实现盈利保护。

3.  Adaptability - 策略参数可调整,适用于不同的市场环境,具有适应性。

4.  RSI Filter - RSI指标可过滤假突破,避免在非反转时错过做反操作。

5.  Easy to Implement - 使用简单指标,代码量少,易于实现和回测。

## 风险分析  

该策略也存在以下风险:

1. Whipsaw Risk - 若假突破导致止损反转产生错误信号,会产生反复亏损。

2. Over Optimization - 优化策略参数时可能过拟合数据而失去鲁棒性。

3. No Fundamental Basis - 纯技术指标驱动,忽略基本面信息。

4. Ignore Transaction Costs - 反复交易会增加交易成本。

5. Subject to Price Gaps - 价格跳空可能触发错误止损反转。

## 优化方向

该策略可以从以下几个方面进行优化:

1. Combine with other indicators - 结合其它指标确认突破信号,避免假突破。如加入成交量指标。

2. Parameter tuning - 对指标参数进行测试优化,找到最佳参数组合。

3. Position sizing - 根据市场情况调整仓位大小,控制风险。

4. Trade only on significant levels - 仅在关键支持阻力位置附近交易,避免过于频繁。

5. Consider fundamentals - 加入基本面因素,避免与大趋势背道而驰。

## 总结

反转追踪策略通过抛物线止损反转和RSI指标形成交易信号,在价格反转点捕捉反转机会。该策略动态调整止损,可捕捉突破产生的短线获利。但也存在追随噪音的风险。可以通过优化参数、提高决策质量等方式提升策略稳定性和盈利能力。

||

## Overview

The Parabolic SAR RSI reversal strategy generates trading signals based on the "Parabolic Stop and Reverse" and "Relative Strength Index" indicators to identify potential price reversals. It takes opposite positions when the price breaks the upside or downside trendlines. This allows catching opportunities from price reversals.

## Strategy Logic

The strategy mainly utilizes two technical indicators:

1. Parabolic SAR: Plots a parabolic SAR line as a dynamic stop-loss line. When the price breaks this line, the position and direction of the stop-loss line are reset, generating buy or sell signals.

2. RSI: Reflects the speed and change of price rises and falls over a period of time. Above 70 is the overbought zone and below 30 is the oversold zone.

Specifically, the strategy first sets the initial value, step, and maximum value of the Parabolic SAR based on user input. It then determines entry and exit timing according to whether the price breaks the SAR line:

- When the price breaks above the SAR line, a sell signal is generated.
- When the price breaks below the SAR line, a buy signal is generated.

Meanwhile, the strategy also monitors the RSI to determine if it is in the overbought/oversold zone. Long positions are closed when RSI enters the overbought zone. Short positions are closed when RSI enters the oversold zone.

By combining the SAR reversal signals and RSI filter signals, the strategy can make opposite moves in a timely manner when prices reverse to achieve buy low sell high.

## Advantage Analysis

The main advantages of this reversal tracking strategy are:

1. Capture Price Reversal - Uses breakouts to generate reversal signals and make opposite moves when prices reverse.

2. Dynamic Stop Loss - SAR acts as a moving stop loss that adjusts stop levels based on real-time prices to protect profits.

3. Adaptability - Adjustable parameters make the strategy adaptable to different market environments. 

4. RSI Filter - Filters out false breakouts and avoids wrong moves.

5. Easy to Implement - Uses simple indicators with little code, easy to implement and backtest.

## Risk Analysis

The risks include:

1. Whipsaw Risk - False breakouts cause wrong stop and reverse signals, leading to repeated losses.

2. Over Optimization - Optimizing parameters may lead to overfitting and lack of robustness. 

3. No Fundamental Basis - Driven purely by technical indicators, ignores fundamentals.

4. Ignore Transaction Costs - Frequent trading increases transaction costs.

5. Subject to Price Gaps - Gaps may trigger incorrect stop and reverse signals.

## Enhancement Opportunities 

The strategy can be enhanced from the following aspects:

1. Combine with other indicators - Confirm signals with other indicators to avoid false signals. Such as adding volume indicators.

2. Parameter tuning - Test and optimize parameters to find the optimal parameter combinations.

3. Position sizing - Adjust position size based on market conditions to control risk.

4. Trade at significant levels - Only trade around key support/resistance levels to reduce frequency.

5. Consider fundamentals - Add fundamental factors to avoid trading against major trends. 

## Conclusion

The reversal tracking strategy generates signals using SAR and RSI to capture reversals. It dynamically adjusts stops to capture short-term profits from breakouts. But it is also exposed to risks of following noise. Optimizing parameters, improving decision quality will enhance strategy stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|14|Length|
|v_input_3|82|RSI Overbought Level|
|v_input_4|21|RSI Oversold Level|
|v_input_5|0.007|SAR Start|
|v_input_6|0.017|SAR Increment|
|v_input_7|0.24|SAR Maximum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("SARSI",overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, commission_type = strategy.commission.percent, commission_value = 0.0675, initial_capital = 10000, currency = currency.USD, calc_on_order_fills = true, calc_on_every_tick = true) 

//study("SARSI",overlay = true)

src     = input(close, title="Source")
len     = input(14, minval=1, title="Length")
rob     = input(title="RSI Overbought Level", defval=82, minval=1, maxval=100)
ros     = input(title="RSI Oversold Level", defval=21, minval=1, maxval=100)
start   = input(title="SAR Start", defval=0.007, minval=0.001, maxval=10)
inc     = input(title="SAR Increment", defval=0.017, minval=0.001, maxval=100)
max     = input(title="SAR Maximum", defval=0.24, minval=0.01, maxval=10)
asar    = sar(start,inc,max)
xrsi    = rsi(close,len)
date    = timestamp(2018, 8, 1, 00, 00)
up      = crossunder(asar,src)
dn      = crossover(asar,src)

//ob      = crossunder(xrsi,rob)
//os      = crossover(xrsi,ros)

strategy.entry("long", strategy.long, when=up and time>=date, comment="Long")
strategy.entry("short", strategy.short, when=dn and time>=date, comment="Short")

//strategy.close("long", when=ob)
//strategy.close("short", when=os)

alertcondition(up,  "Long",  "Long Msg")
alertcondition(dn, "Short", "Short Msg")

//uptrend=plotshape(up,"uptrend",shape.triangleup,color=#48A498,transp=0, size = size.tiny, location = location.belowbar,text="฿")
//downtrend=plotshape(dn,"downtrend",shape.triangledown,color=#E25655,transp=0, size = size.tiny, location = location.abovebar,text="$")
//plotshape(ob,"overbuy",shape.triangleup,color=#48A498,transp=0, size = size.small, location = location.belowbar,text="0฿")
//plotshape(os,"oversell",shape.triangledown,color=#E25655,transp=0, size = size.small, location = location.abovebar,text="0$")

plot(asar, style=cross, color=gray, transp=0, linewidth=1, title="SAR")
```

> Detail

https://www.fmz.com/strategy/428699

> Last Modified

2023-10-08 14:21:17
