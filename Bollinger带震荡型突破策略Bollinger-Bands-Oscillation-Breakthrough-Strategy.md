
> Name

Bollinger带震荡型突破策略Bollinger-Bands-Oscillation-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15384655626028da3a7.png)
[trans]


### 概述

该策略综合运用布林带指标和Aroon指标,通过振荡市场的震荡破坏来获利。策略在震荡趋势型市场中表现较好,能够在震荡突破之后及时入场,并设定止损止盈条件,在合适的时候退出仓位。

### 策略原理

该策略主要利用两个指标来识别交易机会和退出点。

首先是布林带。布林带由中轨、上轨和下轨组成。中轨是n日收盘价的简单移动平均线,上轨是中轨+k倍标准差,下轨是中轨-k倍标准差。当价格从下轨向上突破中轨时,为买入信号。当价格从上轨向下突破中轨时,为卖出信号。该策略使用布林带判断震荡趋势中的机会点,在中轨附近出现突破时入场。

其次是Aroon指标。Aroon指标反映价格在n日内达到最高值和最低值的相对强弱。Aroon指标可以判断趋势和机会。当Aroon Up主线大于设置的阈值时,认为行情趋势向上;当Aroon Down主线大于设置的阈值时,认为行情趋势向下。该策略使用Aroon指标的Up主线来确认行情处于上升趋势,Down主线来判断是否要止损退出。

综合这两个指标,该策略在布林带发生突破,Aroon Up主线高于阈值时买入。在止损线触发或Aroon Up主线低于设置值时平仓。

### 策略优势

1. 综合多个指标,提高决策的准确性。单一指标容易受到市场噪音的影响,该策略通过布林带和Aroon指标的组合,可以过滤假信号。

2. 及时捕捉趋势反转点。布林带具有较强的趋势识别能力,可以发现短期内突破中轨的机会点。Aroon指标判断长期趋势,避免在震荡行情中反复开仓。

3. 风险控制到位。止损策略和Aroon指标的Down主线控制了下行风险。同时,部分仓位交易也控制了单笔损失。

4. 适用于震荡行情,不容易产生大额亏损。相比趋势跟踪策略,该策略在震荡行情中表现更佳。

### 风险分析

1. 布林带存在差错。当市场突发事件造成大幅波动时,布林带会失效。

2. Aroon参数设置需要优化。不同市场需要调整Aroon参数,以达到最佳效果。

3. 止损过小容易出现再次触发。应适当放宽止损范围,避免止损线被触发后再次被触发。 

4. 需避免在强势趋势中使用。策略适用于震荡市场,在强势趋势市场中表现不佳,应注意避免。

### 优化方向

1. 优化布林带参数,采用自适应布林带。允许布林带参数根据市场变化调整,提高指标的灵活性。

2. 优化Aroon参数的动态设置。不同币种和交易周期需要调整Aroon参数,可以研究动态优化参数。

3. 增加其他指标过滤,如RSI指标来避免超买超卖。可以进一步提高策略决策的准确性。

4. 采用机器学习方法优化止损点。通过算法训练可以得到更优化的止损方式,最大程度减少止损被再次触发的概率。

5. 结合量能指标,避免假突破。如能量指标OBV,可以避免布林带发生的假突破信号。

### 总结

该策略总体上是一个典型的震荡型交易策略。它结合布林带指标和Aroon指标来识别交易机会,可以有效抓住市场的短期震荡。通过止损和部分仓位管理风险,适合于震荡行情。但需要注意参数优化和风险控制,避免使用于趋势性行情中。如果进一步优化,可以成为一个非常实用的量化策略。

||


## Overview

This strategy combines Bollinger Bands and Aroon indicator to profit from oscillation and breakthroughs in volatile markets. It works well in oscillating trending markets, able to get in timely after breakthroughs and set stop loss and take profit conditions to exit positions properly.

## Strategy Logic

The strategy mainly utilizes two indicators to identify trading opportunities and exit points. 

Firstly, the Bollinger Bands. It consists of a middle band, an upper band and a lower band. The middle band is a simple moving average of closing price over n periods. The upper band is the middle band + k standard deviations. The lower band is the middle band - k standard deviations. A upward breakthrough of the middle band from the lower band signals long entry. A downward breakthrough of the middle band from the upper band signals short entry. The strategy uses Bollinger Bands to identify opportunity points amid oscillation trends, entering around breakthroughs of the middle band.

Secondly, the Aroon indicator. It reflects the relative strength of highest and lowest price over n periods. Aroon can determine trends and opportunities. When Aroon Up line is higher than a threshold, it indicates an upward trend. When Aroon Down line is higher than a threshold, it indicates a downward trend. The strategy uses Aroon Up to confirm an uptrend and Aroon Down to determine stop loss.

Combining the two indicators, the strategy goes long when a Bollinger breakthrough happens and Aroon Up is higher than a threshold. It closes position when stop loss is triggered or Aroon Up drops below a set value.

## Advantages

1. Combining multiple indicators improves accuracy. Single indicator is susceptible to market noise. The combo of Bollinger Bands and Aroon can filter out false signals.

2. Timely catch trend reversals. Bollinger Bands has strong trend identification capability and can detect short term breakthrough opportunities. Aroon judges long term trend to avoid excessive trades in ranging markets.

3. Proper risk control. Stop loss and Aroon Down controls downside risk. Position sizing also limits per trade loss. 

4. Suits oscillating markets with less huge losses. Compared to trend following strategies, this strategy performs better in oscillating markets.

## Risks

1. Bollinger Bands can be inaccurate. Sudden market events can invalidate Bollinger Bands.

2. Aroon parameters need optimization. Different markets need adjusted Aroon parameters for best results.

3. Stop loss too tight causes repeated triggers. Stop loss range should be relaxed properly to avoid repeated touches.

4. Avoid strong trending markets. The strategy suits oscillating markets. It does poorly in strong trending markets.

## Optimizations

1. Optimize Bollinger parameters, use adaptive Bollinger Bands. Allow dynamic adjustment of parameters for better flexibility.

2. Optimize dynamic Aroon parameters. Different assets and timeframes need different Aroon parameters. Research dynamic optimization.

3. Add filters like RSI to avoid overbought/oversold. Further improves accuracy of strategy signals. 

4. Use machine learning to optimize stop loss. Algorithm training can find better stop loss methods to minimize repeated triggers.

5. Combine with volume like OBV to avoid false breakouts. Volume indicators can prevent false Bollinger breakout signals.

## Conclusion

Overall this is a typical oscillation trading strategy. It identifies trading opportunities by combining Bollinger Bands and Aroon, capable of capitalizing on short term market oscillations. With proper stop loss, risk management and parameter optimization, it is suitable for ranging markets. But optimization and risk control is needed to avoid applying it in trending markets. With further improvements, it can become a very practical quant strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2020|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|20|lengthBB|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|2|StdDev|
|v_input_11|false|Offset|
|v_input_12|288|lengthAr|
|v_input_13|90|Aroon Confirmation|
|v_input_14|70|Aroon Stop|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-28 21:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © relevantLeader16058

//@version=4
// strategy(shorttitle='Bollinger bands And Aroon Scalping',title='Bollinger bands And Aroon Scalping (by Coinrule)', overlay=true, initial_capital = 1000, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 30, commission_type=strategy.commission.percent, commission_value=0.1)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => time >= start and time <= finish ? true : false       // create function "within window of time"


// BB inputs and calculations
lengthBB = input(20, minval=1)
src = input(close, title="Source")
mult = input(2.0, minval=0.001, maxval=50, title="StdDev")
basis = sma(src, lengthBB)
dev = mult * stdev(src, lengthBB)
upper = basis + dev
lower = basis - dev
offset = input(0, "Offset", type = input.integer, minval = -500, maxval = 500)


lengthAr = input(288, minval=1)
AroonUP = 100 * (highestbars(high, lengthAr+1) + lengthAr)/lengthAr
AroonDown = 100 * (lowestbars(low, lengthAr+1) + lengthAr)/lengthAr


Confirmation = input(90, "Aroon Confirmation")
Stop = input(70, "Aroon Stop")

Bullish = crossunder (close, basis)
Bearish = crossunder (close, upper)

//Entry 

strategy.entry(id="long", long = true, when = Bullish and AroonUP > Confirmation and window())

//Exit

strategy.close("long", when = Bearish or AroonUP < Stop and window())



```

> Detail

https://www.fmz.com/strategy/430767

> Last Modified

2023-11-01 16:45:54
