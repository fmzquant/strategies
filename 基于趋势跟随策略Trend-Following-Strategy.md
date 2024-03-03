
> Name

基于趋势跟随策略Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1468aa7244f7540d194.png)
[trans]

## 概述

该策略基于趋势跟随的原理,使用Parabolic SAR指标判断市场趋势方向,并结合 barcolor 指标来可视化显示价格的牛熊状态,在趋势向上时做多,趋势向下时做空,以捕捉市场趋势所带来的利润。

## 策略原理  

该策略主要通过Parabolic SAR指标来判断市场趋势的方向。Parabolic SAR又称抛物线转向指标,它由两个参数组成,Step代表SAR点移动步长,Max代表SAR点最大步长。当市场处于趋势状态时,SAR点会紧贴价格并随着趋势的延续不断向上或者向下移动,当趋势反转时,SAR点会穿过价格并出现在价格另一侧。因此,通过比较SAR点和K线的高低关系,就可以判断目前的趋势方向。

具体来说,当SAR点位于K线最低价之下时,代表目前处于上涨趋势,该策略会在这个时候做多;当SAR点上方穿过K线最高点时,代表趋势发生反转,这时该策略会平掉多单;相反,当SAR点位于K线最高价之上时,代表目前处于下跌趋势,该策略会在这个时候做空;当SAR点下方穿过K线最低点时,代表趋势反转,这时该策略会平掉空单。

为了更直观的判断目前的趋势状况,该策略还采用了barcolor指标对K线进行着色。当收盘价高于SAR点时,K线显示为绿色,代表上涨趋势;当收盘价低于SAR点时,K线显示为红色,代表下跌趋势。

## 策略优势分析  

该策略最大的优势在于能够准确地捕捉市场趋势,并跟踪趋势进行交易,避免被频繁的市场noise干扰。具体优势如下:

1. 使用Parabolic SAR指标判断趋势,SAR点的设计非常精妙,能够快速而精确地捕捉趋势反转。

2. 采用barcolor指标直观显示目前的牛熊状态,一目了然。

3. 交易信号来自趋势本身而不是其他因素,不会被短期价格震荡误导。 

4. 采用趋势跟踪止损,及时止损而不会过于敏感,防止被套。

5. 保持交易方向一致,不做反向操作,有利于避免不必要的交易。

6. 交易规则简单清晰,容易理解和实现,适合新手学习。

## 策略风险分析

该策略最大的风险在于:

1. 无法确定具体的入场时机和出场时机,容易错过趋势早期和趋势末期的机会。 

2. 在盘整行情中停止交易且持有仓位,无法获利也无法止损,存在被套的风险。

3. 无法限制单笔交易的盈亏比例,单笔损失可能过大。

4. 只做单边交易,多头行情和空头行情只能捕捉其中一种。

5. 没有考虑大级别的趋势判断,存在与大趋势对冲的风险。

6.  parametric optimal solution is found.

为了解决上述风险,可以从以下几个方面进行优化:

1. 结合其他指标确定入场和出场的具体时机。

2. 加入趋势揭示指标,避免在盘整中打开仓位。

3. 设置风险管理规则,限制单笔损失。

4. 优化做多做空的切换逻辑,捕捉更多交易机会。

5. 加入多时间框架分析,判断大级别趋势方向。

## 策略优化方向  

该策略还可进一步从以下几个方面进行优化:

1. 优化Parabolic SAR参数的设定,使其更好地适应不同品种和周期。

2. 结合移动平均线等指标过滤入场时机。

3. 加入突破入场策略,在趋势启动后及时入场。

4. 优化止损策略,避免止损过于敏感或过于迟钝。

5. 加入止盈策略,在利润达到一定水平后主动止盈。

6. 优化资金管理策略,提高策略的风险调整收益。

7. 多时间框架优化,确保大级别趋势与交易方向一致。 

8. 引入机器学习等技术,动态优化参数。

## 总结

该策略通过Parabolic SAR指标判断趋势方向,并在趋势启动后立即跟随趋势进行交易。策略优点是交易信号来自趋势本身,不易受到市场noise的干扰。但也存在无法限制单笔交易风险、错过进入时机等问题。未来的优化方向包括设置止盈止损策略、优化参数设定、加入过滤器等,使策略在回测和实盘中都能获得更好的表现。

||
## Overview

This strategy is based on the principle of trend following. It uses the Parabolic SAR indicator to determine the market trend direction and combines the barcolor indicator to visualize the bull/bear state of prices. It goes long when the trend goes up and goes short when the trend goes down, aiming to capture profits from market trends.

## Strategy Logic

The strategy mainly uses the Parabolic SAR indicator to judge the market trend direction. Parabolic SAR, also known as the parabolic stop and reverse indicator, consists of two parameters: Step, which represents the step of SAR point movement, and Max, which represents the max step allowed for SAR points. When the market is in a trend, SAR points will stick close to prices and move up or down continuously along with the trend. When the trend reverses, SAR points will cross prices and appear on the other side. Therefore, by comparing SAR points with high/low prices, the current trend direction can be determined. 

Specifically, when SAR points are below the lowest price, it indicates an uptrend, and the strategy will go long. When SAR points cross above the highest price, it signifies a trend reversal, and the strategy will close long positions. Conversely, when SAR points are above the highest price, it signals a downtrend, and the strategy will go short. When SAR points cross below the lowest price, it represents a reversal, and the strategy will close short positions.

To visually determine the current trend condition more intuitively, the strategy also uses the barcolor indicator to color the bars. Green bars represent an uptrend when the close is higher than SAR points, while red bars signify a downtrend when the close is lower.

## Advantage Analysis

The biggest advantage of this strategy is that it can accurately capture market trends and follow the trends to trade, avoiding interference from frequent market noises. The specific advantages are:

1. Using Parabolic SAR to determine trends, the design of SAR points is ingenious and can quickly and precisely capture trend reversals.

2. Adopting the barcolor indicator to visually display the current bull/bear state in an intuitive manner.

3. Trade signals come from the trend itself instead of other factors, avoiding being misguided by short-term price fluctuations.

4. Employing trend tracking stops loss, timely stopping out without being too sensitive, preventing being caught in traps.

5. Maintaining consistent trade direction, avoiding unnecessary reverse trades, being beneficial for simplicity. 

6. The trading rules are simple and clear, easy to understand and implement, suitable for beginners to learn.

## Risk Analysis

The biggest risks of this strategy are:

1. Unable to determine specific entry and exit points, likely to miss early and late trend opportunities.

2. Stop trading and hold positions during consolidation, unable to profit or stop loss, with the risk of being caught.

3. Unable to limit the risk/reward ratio of each trade, single trade loss could be too big. 

4. Only doing unilateral trades, only able to capture either uptrends or downtrends. 

5. Not considering the analysis of greater trend, carries the risk of trading against the major trend.

To address these risks, optimizations can be made in the following aspects:

1. Combine other indicators to determine specific entry and exit points.

2. Add trend discovering indicators to avoid opening positions during consolidation.

3. Set risk management rules to limit per trade loss. 

4. Optimize the long/short switching logic to capture more trading opportunities.

5. Add multi-timeframe analysis to determine the major trend direction.

## Optimization Directions

This strategy can be further optimized in the following aspects:

1. Optimize the Parabolic SAR parameters to better suit different products and timeframes.

2. Add filters like moving averages to filter entry points. 

3. Incorporate breakout strategies to get in a trend early after trend starts.

4. Optimize stop loss strategies to avoid being too sensitive or too insensitive.

5. Add profit taking strategies to actively take profit when reaching a certain level.

6. Enhance money management strategies to improve risk-adjusted returns.

7. Multi-timeframe optimizations to ensure major trend alignment with trade direction.

8. Introduce machine learning etc. to dynamically optimize parameters.

## Summary

This strategy determines the trend direction with the Parabolic SAR indicator and follows the trend immediately after it starts. The advantage is trade signals come from the trend itself, less susceptible to market noises. But it also has weaknesses like unable to limit per trade risks and missing entry points. Future optimizations include setting stop loss/take profit, parameter tuning, adding filters etc. to improve strategy performance in backtests and live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Trend Code|
|v_input_2|true|From Day|
|v_input_3|true|From Month|
|v_input_4|2019|From Year|
|v_input_5|true|To Day|
|v_input_6|true|To Month|
|v_input_7|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend Trader Strategy (Trend Code)", shorttitle="Trend Trader Strategy (Trend Code)", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

//Inputs
TrendCode = input(5, title = "Trend Code")

////////////////////////////////////////////////////////////////////////////////
// BACKTESTING RANGE
 
// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2019, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true
 
////////////////////////////////////////////////////////////////////////////////

//Parabolic SAR
psar = sar(0.02, 0.02, TrendCode * 0.005)


//Plot PSAR
plot(psar, title="PSAR", color = color.teal , trackprice=true)

//Barcolor
barcolor(close > psar ? color.green : color.red, title = "Bar Color")

if (psar >= high and time_cond)
    strategy.entry("long", strategy.long, stop=psar, comment="long")
else
    strategy.cancel("long")

if (psar <= low and time_cond)
    strategy.entry("short", strategy.short, stop=psar, comment="short")
else
    strategy.cancel("short")
        
if (not time_cond)
    strategy.close_all()





 

```

> Detail

https://www.fmz.com/strategy/431219

> Last Modified

2023-11-06 10:09:02
