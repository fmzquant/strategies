
> Name

多时间框架交替Parabolic-SAR策略Alternating-Timeframe-Parabolic-SAR-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165624863f43b24e3db.png)

[trans]


## 概述

本策略的核心思想是利用Parabolic SAR这一Momentum Indicators指标在不同时间周期上的交替运用,实现在不同时间周期捕捉市场趋势的转折。该策略同时在多个时间周期监测Parabolic SAR信号,一旦较高时间周期 SAR 信号发出,则进入相应的做多或做空头寸。

## 策略原理

首先,该策略在不同的时间周期(15分钟,日线,周线,月线)分别计算Parabolic SAR的值。 

其次,策略监测周线SAR值,一旦周SAR上穿最近高点,则做多;一旦周SAR下穿最近低点,则做空。

最后,策略采用周线SAR作为止损点。具体来说,如果已做多,则以周线SAR作为该做多头寸的止损点;如果已做空,则以周线SAR作为该做空头寸的止损点。

这样,策略就实现了在较高时间周期发出信号时进场,采取较低时间周期止损的思路。监测周线SAR信号可以更准确判断趋势转折点,减少假突破带来的损失;而采用15分钟SAR作为止损,可以快速止损,避免在反转来临时承担过多损失。

## 优势分析

这种多时间框架交替使用Parabolic SAR的策略,具有以下优势:

1. 利用不同时间周期 SAR 的优势。周线SAR可准确判断趋势转折,降低假突破带来的亏损风险;15分钟SAR可快速止损,控制单笔损失。

2. 策略灵活度高。可根据不同品种、市场情况调整SAR的参数,优化策略效果。

3. 策略交易频率低。只在较高时间框架SAR发出信号时才入场,避免过度交易。

4. 资金利用效率高。仅在判断到较大概率走势反转时才部署资金,有效避免资金长期闲置。

5. 容易掌控风险。采用固定止损点,可以清晰计算每个头寸的风险敞口。

## 风险分析

该策略也存在一些风险:

1. SAR参数设置不当,可能导致止损过于宽松或过于紧密,进而影响策略效果。

2. 标的可能出现剧烈价格跳动,直接突破策略设置的止损线,造成较大亏损。

3. 若仅凭借SAR信号进行交易,可能错过趋势中的其他具有统计优势的交易机会。

4. 多时间框架下,不同周期SAR可能发出冲突信号,需要处理信号优先级问题。

5. 周期选择不当,短周期噪音过大或长周期滞后识别转折点,均可能影响策略效果。

## 优化方向

该策略可从以下几个方面进行优化:

1. 优化SAR参数设置,降低whipsaw情况发生概率。可以通过回测多次调整参数,找到最优参数组合。

2. 增加止损策略,如移动止损、级差止损等,进一步控制单笔损失。

3. 结合其它指标,如MACD、KDJ等,寻找更多证据确定趋势转折,减少错误交易概率。 

4. 增加资金管理策略,如固定资金利用率、固定盈亏比等,控制每个头寸规模,总体控制策略风险。

5. 优化时间周期设置,测试不同周期组合下策略效果,找到最佳周期匹配。

## 总结

本策略基于Parabolic SAR指标在不同时间周期的交替使用,在较高时间框架判断趋势转折点,较低时间框架进行止损,实现不同时间周期的优势互补。该策略有效降低了whipsaw现象带来的交易频率和假突破带来的风险。通过参数优化、止损策略、资金管理等手段进一步完善,可以获得非常出色的策略效果。


||


## Overview

The core idea of this strategy is to use the Parabolic SAR, one of the Momentum Indicators, alternately across different timeframes to capture trend reversals in the market. The strategy monitors Parabolic SAR signals simultaneously on multiple timeframes, and enters a corresponding long or short position once a SAR signal is triggered on a higher timeframe.

## Strategy Logic

Firstly, the strategy calculates Parabolic SAR values separately on different timeframes (15m, D, W, M).

Secondly, the strategy monitors the weekly SAR value. It goes long when the weekly SAR rises above the recent high, and goes short when the weekly SAR falls below the recent low. 

Finally, the strategy uses the weekly SAR as the stop loss. Specifically, if already long, the weekly SAR is set as the stop loss for that long position; if already short, the weekly SAR is set as the stop loss for that short position.

This way, the strategy enters based on signals from higher timeframes, and stops out on lower timeframes. Monitoring weekly SAR signals can more accurately identify trend reversals, while stopping out on 15m SAR can realize quick cut losses to avoid excessive drawdowns when reversals come.

## Advantage Analysis 

This Parabolic SAR alternating timeframe strategy has the following edges:

1. Utilizes the advantages of SAR on different timeframes. Weekly SAR can accurately identify trend reversals and reduce whipsaw losses; 15m SAR allows quick stop loss management.

2. High flexibility. SAR parameters can be adjusted for different products and market conditions to optimize strategy performance. 

3. Low trading frequency. Only enters on signals from higher timeframe SAR, avoiding overtrading.

4. High capital utilization efficiency. Deploys capital only when high probability reversal is identified, avoiding capital sitting idle.

5. Easy risk control. Adopting fixed stop loss points allows clear calculation of risk exposure for each position.

## Risk Analysis

This strategy also has some risks:

1. Improper SAR parameter setting may lead to stop loss being too wide or too tight, thus impacting strategy performance.

2. Sharp price spikes may directly penetrate the stop loss level, leading to large losses.

3. Relying solely on SAR signals may miss other statistically profitable opportunities during trends. 

4. Conflicting signals may arise from SAR on different timeframes. Signal priority needs to be handled.

5. Improper timeframe selection, too much noise on lower periods or lag in identifying reversals on higher periods, may both impact strategy efficacy. 

## Optimization Directions

The strategy can be improved in the following aspects:

1. Optimize SAR parameters to reduce whipsaw occurrences. Multiple backtests can be run to find optimal parameter combinations.

2. Add stop loss strategies like trailing stop, staggered stop loss etc to further control single trade loss.

3. Incorporate other indicators like MACD, KDJ to find more evidence for trend reversals, reducing trading errors.

4. Add capital management strategies like fixed fractional position sizing, fixed risk-reward ratio etc to size each position and control overall strategy risk. 

5. Optimize timeframe combinations by testing strategy performance under different period settings to find best match.

## Conclusion

This strategy utilizes Parabolic SAR alternately across timeframes, identifying reversal points on higher periods and stopping out on lower periods, achieving synergistic effect. It effectively reduces whipsaw trades and risk from false breakouts. With further enhancements like parameter optimization, stop loss strategies and capital management, outstanding strategy results can be achieved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Resolution|
|v_input_2|D|Resolution|
|v_input_3|W|Resolution|
|v_input_4|M|Resolution|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-10-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy ("SAR alternating timeframe", overlay=true)

//resolution
res1=input("15", title="Resolution")
res2=input("D", title="Resolution")
res3=input("W", title="Resolution")
res4=input("M", title="Resolution")

//output functions
out = sar(0.02,0.02,0.2)

// Security
SAR1 = request.security(syminfo.tickerid, res1, out)
SAR2 = request.security(syminfo.tickerid, res2, out)
SAR3 = request.security(syminfo.tickerid, res3, out)
SAR4 = request.security(syminfo.tickerid, res4, out)

//Plots
//plot(SAR1 , title="SAR 15", color = red, linewidth = 2)
//plot(SAR2 , title="SAR D", color = green, linewidth = 3)
plot(SAR3 , title="SAR W", color =blue, linewidth = 4)
//plot(SAR4 , title="SAR W", color =purple, linewidth = 5))


/////////////////////////////////////////////////////////////////////
//trade
if (SAR3 >= high)
    strategy.entry("ParLE", strategy.long, stop=SAR3, comment="ParLE")
else
    strategy.cancel("ParLE")

if (SAR3 <= low)
    strategy.entry("ParSE", strategy.short, stop=SAR3, comment="ParSE")
else
    strategy.cancel("ParSE")


```

> Detail

https://www.fmz.com/strategy/429688

> Last Modified

2023-10-19 18:08:47
