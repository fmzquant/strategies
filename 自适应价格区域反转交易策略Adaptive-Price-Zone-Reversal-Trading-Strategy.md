
> Name

自适应价格区域反转交易策略Adaptive-Price-Zone-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/da367d272e7d1fd27c.png)

[trans]

## 一、策略概述

本策略名称为**自适应价格区域反转交易策略**。该策略运用自适应价格区域(Adaptive Price Zone,APZ)指标识别价格区域,在突破该区域时产生交易信号。APZ指标基于双指数移动平均线和波动率计算上、下价格区域边界。当价格突破区域边界时,表明价位可能反转,从而产生交易机会。

本策略主要适用于震荡行情,特别是盘整行情。它可用于日内短线交易或自动交易系统的一部分,适用于所有可交易资产。总体而言,该策略利用APZ指标提供的辅助判断,在价格区域边界附近进行反转交易。

## 二、策略原理  

本策略使用APZ指标判断价格区域,具体计算方法如下:

1. 计算最近n周期(默认20周期)的最高价与最低价之差xHL
2. 使用双指数移动平均线计算平滑后的收盘价xVal1和xHL的平滑值xVal2,计算周期取平方根后的整数(默认为20的平方根取整=4)
3. 计算上轨= xVal1 + nBandPct * xVal2
4. 计算下轨= xVal1 - nBandPct * xVal2

这样得到的上下轨构成自适应价格区域。当价格突破该区域时,产生交易信号。突破信号判断规则如下:  

1. 当价格低于下轨时,做多信号
2. 当价格高于上轨时,做空信号

此外,本策略还提供反向交易开关参数reverse。打开反向交易后,做多做空信号与上述规则相反。

综上,本策略使用APZ指标判断自适应价格区域,在价格突破区域边界时产生反转交易信号,属于典型的趋势反转跟踪策略。

## 三、策略优势分析

本策略主要有以下几个优势:

1. 利用APZ指标可自适应确定价格区域,避免人为设定支持阻力位
2. 可突破价格区域边界进行反转交易,捕捉短期价格调整机会  
3. 可通过反向交易参数进行看跌交易
4. 交易频率较高,可捕捉更多短线机会
5. 可灵活配合止损策略控制风险

## 四、策略风险分析  

本策略也存在一些风险,主要集中在以下几个方面:  

1. APZ参数设置不当可能错过价格反转机会
2. 震荡行情中存在多次假突破的可能性  
3. 缺乏止损策略可能造成大额亏损

对策建议如下:

1. 调整APZ参数,找到合适平滑周期
2. 结合其他指标过滤假突破  
3. 增加移动止损以控制单笔亏损

## 五、策略优化方向  

本策略可从以下几个方面进行优化:

1. 结合波动率指标判断底部买入,顶部卖出
2. 增加区间突破强度条件,如大量放量
3. 仅在特定时间段交易,如美国盘中
4. 结合均线系统确定大市趋势方向
5. 设置价格进场区,避免无谓买卖

## 六、总结  

本策略总体来说属于短线反转策略,通过APZ指标捕捉价格区域,在区间边界附近进行反转交易。策略优点是交易频率高,可捕捉较多短线机会,并可自适应调整价格区域。但也存在一定假突破风险,需运用其他工具配合进行优化控制。

||

## 1. Strategy Overview  

The strategy is named **Adaptive Price Zone Reversal Trading Strategy**. It uses the Adaptive Price Zone (APZ) indicator to identify price zones and generates trading signals when prices break out of the zones. The APZ indicator calculates upper and lower zone boundaries based on double exponential moving averages and volatility. When prices break through the boundaries, it indicates potential price reversals and trading opportunities.

The strategy is mainly suitable for range-bound markets, especially consolidation markets. It can be used for intraday or short-term trading as part of automated trading systems, and is applicable to all tradable assets. In summary, it utilizes the assistances of APZ indicator and makes reversal trades around price zone boundaries.  

## 2. Strategy Logic

The strategy uses the APZ indicator to determine price zones, with specific calculations as follows:

1. Calculate the difference between highest high and lowest low over the past n periods (default 20 periods), called xHL
2. Use double exponential moving average to calculate the smoothed close price xVal1 and smoothed xHL called xVal2, with smoothing period being the rounded integer of the square root of n (square root of 20 rounded = 4)  
3. Calculate Upper Band = xVal1 + nBandPct * xVal2
4. Calculate Lower Band = xVal1 - nBandPct * xVal2

The Upper Band and Lower Band make up the adaptive price zone. Trading signals are generated when prices break through this zone. The signal rules are as follows:

1. When price drops below the Lower Band, a long signal is generated
2. When price rises above the Upper Band, a short signal is generated  

In addition, a reverse trading switch parameter called “reverse” is included. When reverse trading is enabled, the long and short signals work in the opposite way of the above rules.

In summary, this strategy uses the APZ indicator to determine adaptive price zones, and generates reversal trading signals when prices break out of the zone boundaries. It belongs to a typical trend reversal tracking strategy.

## 3. Advantage Analysis 

The main advantages of this strategy are:

1. The APZ indicator can adaptively determine price zones, avoiding manual setting of support and resistance
2. It can make reversal trades when price breaks zone boundaries, capturing short-term price adjustment opportunities
3. It allows downside trading through the reverse trading parameter
4. It has relatively high trading frequency to capture more short-term opportunities 
5. It can be flexibly combined with stop loss strategies to control risks

## 4. Risk Analysis

There are also some risks with this strategy, mainly in the following areas:

1. Improper APZ parameter setting may miss price reversal opportunities
2. There are possibilities of multiple false breakouts in ranging markets
3. Lack of stop loss strategies may lead to huge losses  

The suggested mitigations are:

1. Adjust APZ parameters to find suitable smoothing periods
2. Use other indicators to filter out false breakouts
3. Add moving stop loss to control losses for single trades

## 5. Optimization Directions

The strategy can be optimized in the following aspects:

1. Combine with volatility indicators to determine bottom buys and top sells
2. Add requirements on breakout strength, such as heavy volume
3. Only trade in specific sessions, like US midday
4. Incorporate moving average systems to determine overall market trend  
5. Set up price zones for entry, avoiding unnecessary buys and sells

## 6. Summary   

In summary, this is a short-term reversal strategy which captures price zones using the APZ indicator and makes reversal trades around zone boundaries. The advantages are high trading frequency and ability to adaptively adjust price zones. But there are also risks of false breakouts that need to be addressed through optimizations and additional tools.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|nPeriods|
|v_input_2|2|nBandPct|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-05 00:00:00
end: 2023-12-11 08:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/01/2020
//
// The adaptive price zone (APZ) is a volatility-based technical indicator that helps investors 
// identify possible market turning points, which can be especially useful in a sideways-moving 
// market. It was created by technical analyst Lee Leibfarth in the article “Identify the 
// Turning Point: Trading With An Adaptive Price Zone,” which appeared in the September 2006 issue 
// of the journal Technical Analysis of Stocks and Commodities.
// This indicator attempts to signal significant price movements by using a set of bands based on 
// short-term, double-smoothed exponential moving averages that lag only slightly behind price changes. 
// It can help short-term investors and day traders profit in volatile markets by signaling price 
// reversal points, which can indicate potentially lucrative times to buy or sell. The APZ can be 
// implemented as part of an automated trading system and can be applied to the charts of all tradeable assets.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////

strategy(title="Adaptive Price Zone Backtest", shorttitle="APZ", overlay = true)
nPeriods = input(20, minval=1)
nBandPct = input(2, minval=0)
reverse = input(false, title="Trade reverse")
xHL = high - low
nP = ceil(sqrt(nPeriods))
xVal1 = ema(ema(close,nP), nP)
xVal2 = ema(ema(xHL,nP), nP)
UpBand = nBandPct * xVal2 + xVal1
DnBand = xVal1 - nBandPct * xVal2
pos = 0
pos := iff(low < DnBand , 1,
	   iff(high > UpBand, -1, pos[1])) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/435264

> Last Modified

2023-12-13 16:33:33
