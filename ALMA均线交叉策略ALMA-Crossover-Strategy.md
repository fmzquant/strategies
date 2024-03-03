
> Name

ALMA均线交叉策略ALMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

本策略采用快慢两个Arnaud Legoux移动平均(ALMA)进行交易信号判断。ALMA 是对传统移动平均线的改进,可减少滞后并平滑曲线。策略通过快速ALMA上穿慢速ALMA 生成买入信号,快速ALMA下穿慢速ALMA生成卖出信号,同时结合成交量过滤,形成较为稳定的交叉信号。

### 策略原理  

该策略的核心指标和交易规则如下:

1. 快速ALMA:期数较短,用于捕捉突破。

2. 慢速ALMA:期数较长,用于判断大趋势。

3. 成交量过滤:短期均量上穿长期均量时有效。 

4. 做多信号:快速ALMA上穿慢速ALMA且成交量过滤有效。

5. 平多信号:快速ALMA下穿慢速ALMA。

6. 做空信号:快速ALMA下穿慢速ALMA且成交量过滤有效。 

7. 平空信号:快速ALMA上穿慢速ALMA。

该策略简单直观,同时融合了趋势判断、突破捕捉和成交量验证等多种技术指标,形成了一个相对稳健的交易体系。快慢均线的配合可以有效判断趋势方向;ALMA算法的运用减小了滞后对交易的影响;成交量的加入避免了许多不确定的假突破。

### 优势分析

相比传统均线交叉策略,该策略主要有以下优势:

1. ALMA算法可减少滞后,提高信号质量。

2. 成交量过滤可避免假突破造成损失。

3. 快慢均线配合判断大趋势,避免反向交易。

4. 规则简单直观,容易理解实施。

5. 可灵活调整均线参数,适用于不同市场。

6. 资金管理设置合理,可控制单笔损失。

7. 可通过优化均线参数进一步提高策略效果。

8. 总体来说,相比传统均交策略,本策略稳定性和信号质量有所提高。

### 风险分析

尽管该策略有许多优点,但以下风险仍须注意:

1. 均线策略本质上易受震荡市错乱,产生多次亏损。

2. ALMA算法的参数设置会影响策略效果。

3. 成交量放大效应可能误导交易信号判断。

4. 存在一定的滞后,无法完全避免亏损。

5. Parametrics优化存在过拟合风险。 

6. 成交量异常情况下信号会失效。

7. 机器学习等算法可能获得更优结果。

8. 需关注收益回撤比指标,避免曲线过于锯齿。

### 优化方向 

考虑到上述风险因素,该策略可从以下几个方面进行优化:

1. 优化ALMA均线参数,提高反应敏感性。

2. 尝试不同的成交量计算方式。

3. 引入止损策略,严格控制单笔损失。

4. 结合其它指标构建立体化交易信号系统。 

5. 增加机器学习模块,实现更智能的信号调整。

6. 多品种部署,进行策略分散。

7. 优化资金管理策略,按不同市场调整仓位。

8. 研究策略健壮性,防止过拟合。

### 总结

本策略整体来说,相比传统均线交叉策略,通过ALMA算法和成交量验证提高了信号质量和稳定性。但交易策略优化是一个持续的过程,仍需关注风险,从多维度进行策略增强,使其能够适应更复杂的市场环境。

||

### Overview

This strategy uses two Arnaud Legoux Moving Averages (ALMA), one fast and one slow, to generate crossover signals. ALMA reduces lag and smooths the signal line compared to traditional MAs. Volume filter is added to improve signal accuracy. It is optimized for crypto but can be adjusted for other instruments. Alerts are included.

### Strategy Logic

The core indicators and rules are:

1. Fast ALMA: Shorter period to catch breakouts. 

2. Slow ALMA: Longer period to gauge the trend.

3. Volume filter: Valid when short EMA crosses above long EMA.

4. Buy signal: Fast ALMA crosses above slow ALMA and volume filter passes.

5. Sell signal: Fast ALMA crosses below slow ALMA.

6. Short signal: Fast ALMA crosses below slow ALMA and volume filter passes.

7. Cover signal: Fast ALMA crosses above slow ALMA.

The strategy combines trend, momentum and volume analysis for robust signals. ALMA reduces lagging while volume avoids false breakouts.

### Advantages

Compared to traditional moving average strategies, the main advantages are:

1. ALMA reduces lag and improves signal quality.

2. Volume filter avoids losses from false breakouts.

3. Fast/slow combo gauges the trend direction. 

4. Simple and intuitive rules, easy to implement.

5. Flexible tuning of MA parameters for different markets.

6. Reasonable risk management.

7. Further optimization potential through parameter tuning.

8. Overall improved stability and quality over traditional crossover strategies.

### Risks

Despite the merits, the following risks should be noted:

1. Crossover systems are intrinsically vulnerable to whipsaws.

2. ALMA performance depends on parameter tuning.

3. Volume spikes may mislead signal generation. 

4. Some lag always exists, cannot avoid all losses.

5. Overfitting risk from excessive optimization.

6. Signals fail when volume is abnormal. 

7. Machine learning techniques may generate better results.

8. Monitor reward/risk ratio to avoid excessive drawdowns.

### Enhancement

To address the risks, enhancements can be made in the following areas:

1. Optimize ALMA parameters for better sensitivity.

2. Experiment with different volume metrics. 

3. Introduce stop loss to control loss per trade.

4. Incorporate other indicators for robust signals.

5. Add machine learning module for smarter signal adjustment.

6. Deploy across multiple products for strategy diversification. 

7. Optimize position sizing models for different markets.

8. Research robustness to prevent overfitting. 

### Conclusion

In conclusion, compared to traditional crossover strategies, this strategy improves signal quality and robustness through the ALMA algorithm and volume filter. But strategy optimization is an iterative process. It is important to keep improving the strategy from multiple dimensions to adapt to changing markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Entry|
|v_input_2|true|Short Entry|
|v_input_float_1|0.85|Arnaud Legoux (ALMA) - Offset Value|
|v_input_int_1|6|Arnaud Legoux (ALMA) - Sigma Value|
|v_input_float_2|0.85|Arnaud Legoux (ALMA) - Offset Value|
|v_input_int_2|6|Arnaud Legoux (ALMA) - Sigma Value|
|v_input_int_4|10|Long Length|
|v_input_float_4|2|Short Take Profit|
|v_input_float_6|2.5|Short Stop Loss|
|v_input_3|100|(?ALMA Fast Length Settings)ALMA Lenghth 1|
|v_input_4|120|(?ALMA Slow Length Settings)ALMA Length 2|
|v_input_int_3|5|(?Volume Settings)Short Length|
|v_input_float_3|2|(?Take Profit Percentage)Long Take Profit|
|v_input_float_5|2.5|(?Stop Percentage)Long Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-16 00:00:00
end: 2023-09-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sarahann999
// Calculations for TP/SL based off: https://kodify.net/tradingview/orders/percentage-profit/
//@version=5
strategy("ALMA Cross", overlay=true)

//User Inputs
src= (close)
long_entry = input(true, title='Long Entry')
short_entry = input(true, title='Short Entry')

//Fast Settings
ALMA1 = input(100, "ALMA Lenghth 1", group= "ALMA Fast Length Settings")
alma_offset = input.float(defval=0.85, title='Arnaud Legoux (ALMA) - Offset Value', minval=0, step=0.01)
alma_sigma = input.int(defval=6, title='Arnaud Legoux (ALMA) - Sigma Value', minval=0)
Alma1 = ta.alma(src, ALMA1, alma_offset, alma_sigma)

//Slow Settings
ALMA2 = input(120, "ALMA Length 2", group = "ALMA Slow Length Settings")
alma_offset2 = input.float(defval=0.85, title='Arnaud Legoux (ALMA) - Offset Value', minval=0, step=0.01)
alma_sigma2 = input.int(defval=6, title='Arnaud Legoux (ALMA) - Sigma Value', minval=0)
Alma2 = ta.alma(src, ALMA2, alma_offset2, alma_sigma2)

//Volume
var cumVol = 0.
cumVol += nz(volume)
if barstate.islast and cumVol == 0
    runtime.error("No volume is provided by the data vendor.")
shortlen = input.int(5, minval=1, title = "Short Length", group= "Volume Settings")
longlen = input.int(10, minval=1, title = "Long Length")
short = ta.ema(volume, shortlen)
long = ta.ema(volume, longlen)
osc = 100 * (short - long) / long

//Define Cross Conditions
buy = ta.crossover(Alma1, Alma2)
sell = ta.crossunder(Alma1, Alma2)

//Calculate Take Profit Percentage
longProfitPerc = input.float(title="Long Take Profit", group='Take Profit Percentage',
     minval=0.0, step=0.1, defval=2) / 100
shortProfitPerc = input.float(title="Short Take Profit",
     minval=0.0, step=0.1, defval=2) / 100
     
// Figure out take profit price 1
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// Make inputs that set the stop %  1
longStopPerc = input.float(title="Long Stop Loss", group='Stop Percentage',
     minval=0.0, step=0.1, defval=2.5) / 100
shortStopPerc = input.float(title="Short Stop Loss",
     minval=0.0, step=0.1, defval=2.5) / 100

// Figure Out Stop Price
longStopPrice  = strategy.position_avg_price * (1 - longStopPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortStopPerc)

//Define Conditions
buySignal = buy and osc > 0
     and strategy.position_size == 0

//sellSignal 
sellSignal = sell and osc > 0
     and strategy.position_size == 0

// Submit entry orders
if buySignal and long_entry
    strategy.entry(id="Long", direction=strategy.long, alert_message="Enter Long")
    alert(message="BUY Trade Entry Alert", freq=alert.freq_once_per_bar)
    
if sellSignal and short_entry
    strategy.entry(id="Short", direction=strategy.short, alert_message="Enter Short")
    alert(message="SELL Trade Entry Alert", freq=alert.freq_once_per_bar)
    
// Submit exit orders based on take profit price
if (strategy.position_size > 0)
    strategy.exit(id="Long TP/SL", limit=longExitPrice, stop=longStopPrice, alert_message="Long Exit 1 at {{close}}")
if (strategy.position_size < 0)
    strategy.exit(id="Short TP/SL", limit=shortExitPrice, stop=shortStopPrice, alert_message="Short Exit 1 at {{close}}")

//Draw
plot(Alma1,"Alma Fast", color=color.purple, style=plot.style_circles)
plot(Alma2,"Alma Slow", color=#acb5c2, style=plot.style_circles)
```

> Detail

https://www.fmz.com/strategy/427669

> Last Modified

2023-09-23 15:11:02
