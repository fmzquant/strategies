
> Name

超级趋势-LSMA-多头策略Super-Trend-LSMA-Long-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/87561cd9539da79509.png)

[trans]

### 概述

超级趋势 LSMA 多头策略是一种结合超级趋势指标和 LSMA 移动平均线的多头策略。它适用于股票、加密货币等长期趋势市场,在较大时间框架下效果更佳。

### 策略原理

该策略的交易规则如下:

多头入场信号:当超级趋势指标发出做多信号,且收盘价高于 LSMA 移动平均线时,做多入场。  

多头出场信号:当超级趋势指标发出做空信号时,平仓多单。

即利用超级趋势判断大趋势方向,再利用 LSMA 判断具体入场点。

### 优势分析

这种策略结合了趋势跟踪和移动平均线,既可以抓住大趋势,又可以利用均线过滤错位现象,从而避免被套。相比单一使用趋势指标或均线指标,可以更好地控制风险。

另外,超级趋势本身就具有一定的滞后性,再结合 LSMA 的平滑特点,可以有效过滤市场噪音,避免被假突破误导。

### 风险分析

该策略最大的风险在于无法准确判断趋势反转点。当趋势发生转变时,由于超级趋势和 LSMA 的滞后性,可能导致亏损扩大。此时需要及时止损来控制风险。

另外,参数设置也会影响策略表现。如果 ATR 参数或因子参数设置不当,则超级趋势判断效果会打折扣;如果 LSMA 周期设置过短,则滤波效果差,容易被噪音影响。因此参数优化至关重要。

### 优化方向 

该策略可以从以下几个方面进行优化:

1. 利用机器学习算法自动优化参数,使参数更符合不同市场环境。

2. 增加止损机制。当亏损达到事先设定的止损幅度时,强制平仓止损。

3. 增加仓位管理模块。当大趋势形成时,适当加大仓位;当判断趋势结束时,减小仓位。

4. 增加更多过滤指标。例如波动率指标、量能指标等,避免趋势反转的风险。

5. 利用深度学习模型判断趋势,替代简单的超级趋势判定,使趋势判断更加智能化。

### 总结

超级趋势 LSMA 多头策略整合了趋势跟踪指标与均线指标的优点,既可以抓住较长时间内的大方向,又可以利用均线过滤噪声。通过参数优化、止损机制、风控模块的加强,可以使该策略的盈利能力和风险控制能力进一步提升,成为一个非常实用的量化策略。

||

### Overview

The Super Trend LSMA Long Strategy is a long strategy that combines the Super Trend indicator with the LSMA moving average. It is suitable for long-term trending markets such as stocks and cryptocurrencies, and works better under larger time frames.  

### Strategy Logic

The trading rules of this strategy are as follows:

Long entry signal: When the Super Trend indicator gives a long signal and the closing price is above the LSMA moving average, go long.  

Long exit signal: When the Super Trend indicator gives a short signal, close the long position.

That is, the Super Trend is used to determine the overall trend direction, while the LSMA is used to determine specific entry points.

### Advantage Analysis 

This strategy combines trend following with moving averages. It can both catch the big trend and use the moving average to filter out false signals, thus avoiding being trapped. Compared with using only a single trend indicator or moving average, it has better risk control.

In addition, the Super Trend itself has some laggingness. Combined with the smoothing feature of LSMA, it can effectively filter out market noise and avoid being misled by false breakouts.

### Risk Analysis

The biggest risk of this strategy is the inability to accurately determine trend reversal points. Due to the lagging of Super Trend and LSMA, losses may be magnified when the trend changes. Timely stop loss should be used to control risks.

In addition, parameter settings also affect strategy performance. If ATR parameters or factor parameters are set improperly, the effectiveness of Super Trend will be compromised. If the LSMA period is set too short, the filtering effect will be poor and it will be vulnerable to noise. Therefore, parameter optimization is crucial.

### Optimization Directions

This strategy can be optimized in the following aspects:

1. Use machine learning algorithms to automatically optimize parameters to better suit different market environments. 

2. Add stop loss mechanisms. Mandatory liquidation when losses reach a pre-set stop loss level.

3. Add position management module. Appropriately increase positions when major trends form, and reduce positions when trends end.

4. Add more filtering indicators, such as volatility indicators, volume indicators etc, to avoid trend reversal risks.

5. Use deep learning models instead of simple Super Trend to judge trends, making trend determination more intelligent.

### Conclusion

The Super Trend LSMA Long Strategy integrates the advantages of trend tracking indicators and moving average indicators. It can catch the big picture over longer periods of time, and use moving averages to filter out noise. With parameter optimization, stop loss mechanisms, stronger risk control modules, the profitability and risk control capabilities of this strategy can be further enhanced, making it a very practical quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ATR Length|
|v_input_2|3|Factor|
|v_input_3|true|From Day|
|v_input_4|true|From Month|
|v_input_5|2010|From Year|
|v_input_6|31|To Day|
|v_input_7|12|To Month|
|v_input_8|2031|To Year|
|v_input_9|101|Length LSMA|
|v_input_10_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "Supertrend LSMA long Strategy", overlay = true,  pyramiding=1,initial_capital = 100, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.1)


atrPeriod = input(14, "ATR Length")
factor = input(3, "Factor")

//Time
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2010, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2031, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = time >= startDate and time <= finishDate

//LSMA
lengthx = input(title="Length LSMA", type=input.integer, defval=101)
offset = 0//input(title="Offset", type=input.integer, defval=0)
src = input(close, title="Source")
lsma = linreg(src, lengthx, offset)



[_, direction] = supertrend(factor, atrPeriod)

if(time_cond)
    if change(direction) < 0 and close > lsma
        strategy.entry("long", strategy.long)
    
    if change(direction) > 0 //and close < lsma
        strategy.close("long")
        //strategy.entry("short", strategy.short)

//strategy.close("long",when=close<lsma)
//strategy.close("short",when=change(direction) < 0 )

    
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/435707

> Last Modified

2023-12-18 10:43:14
