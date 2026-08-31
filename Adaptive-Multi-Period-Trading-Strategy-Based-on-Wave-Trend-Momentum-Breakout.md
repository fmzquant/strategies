
> Name

Adaptive-Multi-Period-Trading-Strategy-Based-on-Wave-Trend-Momentum-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e6294d749a16565795.png)

[trans]
#### 概述
该策略是一个基于波浪趋势指标(WaveTrend)的动量交易系统,通过计算价格的动量变化来识别市场的超买超卖状态,并在关键价格水平突破时产生交易信号。策略使用了双重平滑处理的动量曲线(WT1和WT2)来过滤市场噪音,提高信号的可靠性。

#### 策略原理
策略的核心是通过以下步骤构建波浪趋势指标:
1. 使用HLC3价格作为基准,计算n1周期的指数移动平均(EMA)作为价格中枢
2. 计算价格与中枢的偏离度,并使用0.015作为标准化因子
3. 对偏离度进行n2周期的EMA平滑,得到主要趋势线WT1
4. 对WT1进行4周期的简单移动平均(SMA)平滑,得到信号线WT2
5. 在超买(60)和超卖(-60)水平处设置交易触发点
当WT1在超卖区域向上穿越WT2时,产生做多信号;当WT1在超买区域向下穿越WT2时,产生做空信号。

#### 策略优势
1. 信号生成机制稳健,通过双重平滑和超买超卖过滤显著减少虚假信号
2. 参数可调性强,交易者可以根据不同市场特征调整通道长度和均线周期
3. 结合了趋势跟踪和动量反转的优势,既能捕捉大趋势,又能在极端位置进行反转交易
4. 可视化效果出色,交易者可以直观理解市场状态和潜在交易机会

#### 策略风险
1. 在震荡市场中可能产生频繁的交易信号,增加交易成本
2. 固定的超买超卖阈值可能不适用于所有市场环境
3. 双重平滑处理可能导致信号滞后,在快速行情中错过最佳入场点
4. 需要合理设置止损以控制风险,策略本身没有集成完整的风险管理机制

#### 策略优化方向
1. 引入自适应的超买超卖阈值,根据市场波动率动态调整
2. 增加成交量确认机制,提高信号的可靠性
3. 集成趋势强度过滤器,在强趋势中减少反转交易
4. 添加时间过滤器,避免在市场波动性较低的时段交易
5. 开发完整的仓位管理系统,根据信号强度动态调整持仓规模

#### 总结
这是一个设计合理的趋势动量交易策略,通过波浪趋势指标有效捕捉市场的反转机会。策略的核心优势在于其稳健的信号生成机制和良好的可调性。通过建议的优化方向,可以进一步提升策略的稳定性和盈利能力。对于寻求中长期交易机会的投资者来说,这是一个值得考虑的交易系统。 || 

#### Overview
This strategy is a momentum trading system based on the WaveTrend indicator, which identifies market overbought and oversold conditions by calculating price momentum changes and generates trading signals at key price level breakouts. The strategy employs double-smoothed momentum curves (WT1 and WT2) to filter market noise and enhance signal reliability.

#### Strategy Principle
The core of the strategy builds the WaveTrend indicator through the following steps:
1. Uses HLC3 price as benchmark, calculating n1-period EMA as price center
2. Calculates price deviation from center, using 0.015 as normalization factor
3. Smooths deviation with n2-period EMA to get main trend line WT1
4. Smooths WT1 with 4-period SMA to get signal line WT2
5. Sets trading triggers at overbought (60) and oversold (-60) levels
Long signals are generated when WT1 crosses above WT2 in oversold territory; short signals when WT1 crosses below WT2 in overbought territory.

#### Strategy Advantages
1. Robust signal generation mechanism, significantly reducing false signals through double smoothing and overbought/oversold filtering
2. Strong parameter adaptability, allowing traders to adjust channel length and moving average periods for different market characteristics
3. Combines advantages of trend following and momentum reversal, capturing both major trends and reversal trades at extreme positions
4. Excellent visualization, enabling traders to intuitively understand market conditions and potential trading opportunities

#### Strategy Risks
1. May generate frequent trading signals in ranging markets, increasing transaction costs
2. Fixed overbought/oversold thresholds may not suit all market environments
3. Double smoothing process may lead to signal lag, missing optimal entry points in fast markets
4. Requires proper stop-loss settings for risk control, as strategy lacks integrated risk management mechanism

#### Strategy Optimization Directions
1. Introduce adaptive overbought/oversold thresholds, dynamically adjusting based on market volatility
2. Add volume confirmation mechanism to improve signal reliability
3. Integrate trend strength filter to reduce reversal trades during strong trends
4. Add time filter to avoid trading during low volatility periods
5. Develop complete position management system, dynamically adjusting position size based on signal strength

#### Summary
This is a well-designed trend momentum trading strategy that effectively captures market reversal opportunities through the WaveTrend indicator. The strategy's core strengths lie in its robust signal generation mechanism and good adaptability. Through the suggested optimization directions, the strategy's stability and profitability can be further enhanced. For investors seeking medium to long-term trading opportunities, this is a trading system worth considering.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy(title="WaveTrend [LazyBear] Strategy", shorttitle="WT_LB_Strategy", overlay=true)

// Pôvodné vstupné parametre
n1       = input.int(10,  title="Channel Length")
n2       = input.int(21,  title="Average Length")
obLevel1 = input.int(60,  title="Over Bought Level 1")
obLevel2 = input.int(53,  title="Over Bought Level 2")
osLevel1 = input.int(-60, title="Over Sold Level 1")
osLevel2 = input.int(-53, title="Over Sold Level 2")

// Výpočet WaveTrendu
ap   = hlc3
esa  = ta.ema(ap, n1)
d    = ta.ema(math.abs(ap - esa), n1)
ci   = (ap - esa) / (0.015 * d)
tci  = ta.ema(ci, n2)

// Vyhladené krivky
wt1  = tci
wt2  = ta.sma(wt1, 4)

// Plotovanie nulovej línie a OB/OS úrevní
plot(0,         color=color.gray, linewidth=1)
plot(obLevel1,  color=color.red)
plot(osLevel1,  color=color.green)
plot(obLevel2,  color=color.red)
plot(osLevel2,  color=color.green)

// Plot WaveTrendu
plot(wt1, color=color.green, title="WT1")
plot(wt2, color=color.red,   title="WT2")
plot(wt1 - wt2, color=color.blue, style=plot.style_area, title="WT Fill")

//------------------------------------------------------
// STRATEGY LOGIC (ukážková)
//------------------------------------------------------
if ta.crossover(wt1, wt2) and wt1 <= osLevel1
    strategy.close("Short")
    strategy.entry("Long", strategy.long)

if ta.crossunder(wt1, wt2) and wt1 >= obLevel1
    strategy.close("Long")
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/482427

> Last Modified

2025-02-18 13:52:37
