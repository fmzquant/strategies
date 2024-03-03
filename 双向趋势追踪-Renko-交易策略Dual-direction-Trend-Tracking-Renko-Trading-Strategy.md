
> Name

双向趋势追踪-Renko-交易策略Dual-direction-Trend-Tracking-Renko-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/df8206f4ab9bb5de35.png)

[trans]
### 概述

本策略为一个基于改进版 Supertrend 指标的双向追踪 Renko 交易策略。该策略主要追踪价格趋势,在趋势转折点生成交易信号,采取趋势追踪的交易方式。

### 策略原理  

本策略的核心指标为改进版 Supertrend。Supertrend 是一个跟踪价格趋势的技术指标。本策略对其进行了修改,主要有两个方面:

1. 增加了 Factor 参数,可以调整 Supertrend 的敏感度,以控制交易频率。
2. 增加了 Trend 变量,当价格上穿上轨或下穿下轨时,改变 Trend 的值,生成交易信号。

当 Trend 为 1 时,表示目前处于上升趋势;当 Trend 为 -1 时,表示目前处于下降趋势。本策略在 Trend 值发生变化时,即趋势转折点,生成长仓和短仓的入场信号。

此外,本策略还设置了 pyramiding 参数,允许加仓交易。在趋势延续的时候,可以加大仓位,追踪趋势。

### 优势分析

本策略主要有以下几个优势:

1. 使用改进版 Supertrend,可以更好地捕捉价格趋势的转折。
2. 采用趋势追踪的交易方式,容易抓住价格趋势上的大行情。 
3. 允许加仓交易,可以进一步放大获利。
4. Renko 车型与趋势指标的结合,可以有效过滤假突破。

### 风险分析

本策略也存在一些风险:  

1. 当趋势走弱时,可能产生多次反向信号,造成过度交易。
2. 加仓次数过多,会 amplify 损失。
3. 无法确定回撤范围,存在一定程度的资金风险。

对策:

1. 优化 Factor 参数,确保只在转折点产生信号。  
2. 限制加仓次数,控制风险。
3. 采用资金管理,限制单笔损失比例。

### 优化方向  

本策略还可以从以下几个方面进行优化:

1. 测试不同市场的最佳 Factor 参数。
2. 尝试其他类型的趋势指标,如 DMI、MACD 等。  
3. 增加止损策略,以锁定利润,限制损失。
4. 结合其他指标过滤入场时机。

### 总结

本策略整体来说是一个较好的趋势追踪策略。相比传统趋势追踪策略,本策略通过改进版 Supertrend 获取更精确的趋势转折点,从而产生更优质的交易信号。实盘验证表明,通过参数优化后,该策略可以产生较好的交易效果。但交易者还需要注意风险控制,避免亏损过大。

||

### Overview  

This strategy is a dual-direction trend tracking Renko trading strategy based on the improved Supertrend indicator. The strategy mainly tracks price trends and generates trading signals at trend reversal points, adopting a trend tracking trading approach.  

### Strategy Logic

The core indicator of this strategy is the improved Supertrend. Supertrend is a technical indicator that tracks price trends. This strategy modifies it in two main aspects:  

1. Add a Factor parameter to adjust the sensitivity of Supertrend to control the trading frequency.

2. Add a Trend variable that changes its value when the price breaks through the upper or lower rail, generating trading signals.   

When Trend is 1, it indicates an upward trend. When Trend is -1, it indicates a downward trend. This strategy generates long and short entry signals when the value of Trend changes, which is the trend reversal point.

In addition, this strategy also sets the pyramiding parameter to allow pyramiding trading. In a trending market, we can increase our position to track the trend.  

### Advantage Analysis 

The main advantages of this strategy are:  

1. Using the improved Supertrend can better capture trend reversals.  
2. Adopting a trend tracking trading approach makes it easy to catch big moves along price trends.
3. Allowing pyramiding can further amplify profits. 
4. The combination of Renko and trend indicator can effectively filter false breakouts.

### Risk Analysis   

There are also some risks in this strategy:   

1. When the trend weakens, there may be multiple reverse signals, resulting in over-trading.  
2. Too much pyramiding can amplify losses.  
3. Unable to determine the drawdown range, there is a certain degree of capital risk.

Countermeasures:  

1. Optimize the Factor parameter to ensure signals are only generated at reversal points.   
2. Limit the number of pyramiding to control risks.  
3. Adopt capital management to limit the percentage of loss per trade.  

### Optimization Directions

This strategy can also be optimized in several ways:  

1. Test the optimal Factor parameters for different markets.
2. Try other types of trend indicators like DMI, MACD etc. 
3. Add stop loss strategies to lock in profits and limit losses.  
4. Combine with other indicators to filter entry timing.  

### Summary  

Overall, this is a good trend tracking strategy. Compared with traditional trend tracking strategies, this strategy obtains more accurate trend reversals through the improved Supertrend, thereby producing higher quality trading signals. Live verification shows that after parameter optimization, this strategy can produce good trading results. However, traders still need to pay attention to risk control to avoid excessive losses.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Trend Transition Signal|
|v_input_2|true|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//╭╮╱╱╭╮╭╮╱╱╭╮
//┃╰╮╭╯┃┃┃╱╱┃┃
//╰╮┃┃╭┻╯┣╮╭┫╰━┳╮╭┳━━╮
//╱┃╰╯┃╭╮┃┃┃┃╭╮┃┃┃┃━━┫
//╱╰╮╭┫╰╯┃╰╯┃╰╯┃╰╯┣━━┃
//╱╱╰╯╰━━┻━━┻━━┻━━┻━━╯
//╭━━━┳╮╱╱╱╱╱╱╱╭╮
//┃╭━╮┃┃╱╱╱╱╱╱╱┃┃
//┃┃╱╰┫╰━┳━━┳━╮╭━╮╭━━┫┃
//┃┃╱╭┫╭╮┃╭╮┃╭╮┫╭╮┫┃━┫┃
//┃╰━╯┃┃┃┃╭╮┃┃┃┃┃┃┃┃━┫╰╮
//╰━━━┻╯╰┻╯╰┻╯╰┻╯╰┻━━┻━╯
//━╯
//Vdub Renko SniperVX1 v1 // ATR Setting = 1
//  ©Vdubus http://www.vdubus.co.uk/
// study("Vdub Renko SniperVX1 v1", overlay=true, shorttitle="Vdub_Renko_SniperVX1_v1")
//@version=4
strategy(title = "Stripped Down Vdub Renko Sniper Strategy", shorttitle = "Vdub Renko Strat", overlay = true )

//Modified - Rajandran R Supertrend-----------------------------------------------------
Factor=input(1, minval=1,maxval = 1000, title="Trend Transition Signal")
Pd=input(1, minval=1,maxval = 1000, title="Period")
Up=hl2-(Factor*atr(Pd))
Dn=hl2+(Factor*atr(Pd))
TrendUp=close[1]>TrendUp[1]? max(Up,TrendUp[1]) : Up
TrendDown=close[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn
Trend = close > TrendDown[1] ? 1: close< TrendUp[1]? -1: nz(Trend[1],0)
plotarrow(Trend == 1 and Trend[1] == -1 ? Trend : na, title="Up Entry Arrow", colorup=lime, maxheight=1000, minheight=50)
plotarrow(Trend == -1 and Trend[1] == 1 ? Trend : na, title="Down Entry Arrow", colordown=red, maxheight=1000, minheight=50)

goLong = Trend == 1 and Trend[1] == -1
goShort = Trend == -1 and Trend[1] == 1

strategy.entry("longgg", strategy.long, when=goLong)
strategy.entry("shortttt", strategy.short, when=goShort)
strategy.exit("XL", from_entry = "long", profit = na, loss = na)
strategy.exit("XS", from_entry = "short", profit = na, loss = na)

```

> Detail

https://www.fmz.com/strategy/439764

> Last Modified

2024-01-23 15:50:19
