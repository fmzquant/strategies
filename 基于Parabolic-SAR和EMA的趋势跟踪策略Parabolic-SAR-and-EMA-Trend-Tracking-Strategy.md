
> Name

基于Parabolic-SAR和EMA的趋势跟踪策略Parabolic-SAR-and-EMA-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c7b50a4b4fc28793ea.png)
[trans]

#### 概述

该策略主要思想是同时利用Parabolic SAR和EMA两个指标来识别趋势方向和入市时机。其中,Parabolic SAR用于判断当前趋势方向,EMA用于辅助确定具体的入市时机。当SAR在价格上方时为熊市,当SAR在价格下方时为牛市。入市时则要求价格突破EMA才认为趋势开始形成,此时跟随趋势方向入市。

#### 策略原理  

该策略的核心指标是Parabolic SAR,它是一个能够跟踪价格并判断趋势反转的技术分析工具。其计算公式较为复杂,但原理较为简单直观。SAR指标通过不断调整自己的位置,始终保持在价格的背后,当价格反转时,它会立即调整位置到价格的另一侧。因此,只需要观察SAR指标相对价格的位置,就可以判断目前的趋势方向。  

辅助该策略的另一个指标是EMA。与SAR不同,EMA更适合判断趋势的持续性。通过要求价格需突破EMA之后才入场,可以有效过滤掉部分噪声。且EMA还可用于确认反转信号。例如当价格跌破上升趋势的EMA时,很可能是趋势反转的信号。

综上,该策略的具体交易规则如下:

1. 使用SAR判断趋势方向,SAR在价格上方为熊市,在价格下方为牛市
2. 在牛市中,当价格大于EMA时做多;在熊市中,当价格小于EMA时做空
3. 止损点设置为SAR的值,以控制风险

通过Parabolic SAR判断大趋势,再利用EMA过滤误导信号,既可以锁定趋势又可控制风险,实现了对趋势的有效跟踪。

#### 优势分析

该策略具有以下几点主要优势:

1. 跟踪趋势能力强。SAR对于趋势反转的判断非常灵敏,可有效锁定趋势方向。
2. 准确率较高。EMA可过滤噪声,避免被套。
3. 风险控制到位。通过SAR设置止损点,可控制单笔损失。
4. 实施难度不高。策略规则简单明确,容易理解和实施。

总的来说,该策略集成了多个指标的优点,在抓住趋势的同时也做到了有效的风险控制,是一种表现稳定、易于掌握的趋势跟踪策略。

#### 风险分析

尽管该策略有诸多优势,但在实际运行中也还是存在一定的风险需要防范,主要风险有:  

1. 趋势反转风险。当趋势发生反转时,该策略无法及时止损,可能造成较大损失。
2. 震荡行情风险。在震荡行情中,策略会产生多次小额损失。
3. 参数优化风险。SAR和EMA的参数设置会影响策略表现,需要反复测试找到最优参数。  

为降低上述风险,可以从以下几个方面进行优化:

1. 结合其他指标判断趋势反转时机,设置更加灵敏的止损点。
2. 增加过滤器,避免震荡行情的频繁开仓。
3. 利用遗传算法等手段对参数组合进行优化,找到最优参数。

#### 优化方向  

进一步优化该策略,可以考虑从以下几个方面入手:  

1. 优化参数设置。可以通过更系统的方法如遗传算法对EMA和SAR的参数进行测试和优化,找到最优参数组合。

2. 增加趋势判断工具。可以加入MACD、布林带等其他指标来确认趋势,提高准确性。  

3. 设置动态止损。可以根据ATR等指标设置动态的止损点,让止损更加灵活。

4. 考虑交易成本。引入滑点和手续费参数,优化净利润而非绝对收益。

5. 分层入场出场。可以设置更复杂的多级入场出场机制,在趋势不同阶段进行分批建仓或止损。

通过上述几点优化后,策略在跟踪趋势的同时,可望获得更高稳定性、更精准判断和更强风险控制能力,从而获得 mejor 绩效。

#### 总结  

基于Parabolic SAR和EMA的趋势跟踪策略,集成了多个指标判断趋势方向和入场时机的优势,通过设置SAR作为止损点,风险控制到位,是一种表现相对稳定的量化策略。该策略具有判断准确率高、易于掌握等优点,值得投资者参考学习。但也存在一定的风险,需要对参数和止损方式进行进一步优化,才能获得更佳的绩效。

||

#### Overview

The main idea of ​​this strategy is to use both the Parabolic SAR and EMA indicators to identify the trend direction and timing of entering the market. Parabolic SAR is used to determine the current trend direction, and EMA is used to assist in determining the specific timing of entering the market. When SAR is above price, it is a bear market. When SAR is below price, it is a bull market. When entering the market, it also requires the price to break through the EMA before the trend is considered to be forming. At this time, follow the trend direction to enter the market.

#### Strategy Principle   

The core indicator of this strategy is Parabolic SAR, which is a technical analysis tool that can track prices and judge trend reversals. Its calculation formula is more complicated, but the principle is simple and intuitive. The SAR indicator constantly adjusts its position to always stay behind the price. When the price reverses, it will immediately adjust its position to the other side of the price. Therefore, just observe the position of the SAR indicator relative to the price to judge the current trend direction.

Another indicator assisting this strategy is EMA. Unlike SAR, EMA is more suitable for judging the sustainability of trends. By requiring the price to break through the EMA before entering the market, some noise can be effectively filtered out. And EMA can also be used to confirm reversal signals. For example, when the price breaks through the rising trend EMA, it is likely to be a signal of trend reversal.

In summary, the specific trading rules of this strategy are as follows:  

1. Use SAR to determine the trend direction. SAR above price is bearish market and below price is bullish market  
2. Go long when price is greater than EMA in a bull market; go short when price is less than EMA in a bear market
3. Set stop loss to SAR value to control risk

By determining the major trend through Parabolic SAR and filtering misleading signals with EMA, it is possible to lock in the trend while controlling risk and achieving effective trend tracking.  

#### Advantage Analysis  

This strategy has the following main advantages:

1. Strong trend tracking capability. SAR is very sensitive to judging trend reversals and can effectively lock in trend directions.  
2. High accuracy. EMA filters noise and avoids traps.
3. Proper risk control. Setting stop loss with SAR controls single loss.
4. Easy to implement. The strategy rules are simple and clear, easy to understand and implement.   

In general, this strategy integrates the advantages of multiple indicators, while capturing the trend it also achieves effective risk control, and it is a stable trend tracking strategy that is easy to master.

#### Risk Analysis   

Although the strategy has many advantages, there are still certain risks that need to be guarded against during actual operation. The main risks are:

1. Trend reversal risk. When a trend reversal occurs, the strategy cannot stop loss in time, which may cause greater losses.  
2. Range-bound market risk. In range-bound markets, the strategy will incur multiple small losses.
3. Parameter optimization risk. The parameter settings of SAR and EMA affect strategy performance and need to be repeatedly tested to find the optimal parameters.   

To reduce the above risks, optimization can be carried out in the following aspects:  

1. Combine other indicators to determine the timing of trend reversal and set a more sensitive stop loss point.  
2. Add filters to avoid frequent opening in volatile markets.  
3. Use genetic algorithms and other means to optimize parameter combinations and find the optimal parameters.  

#### Optimization Direction   

To further optimize this strategy, consider the following aspects:

1. Optimize parameter settings. Methods such as genetic algorithms can be used to test and optimize the parameters of EMA and SAR to find the optimal parameter combination.  

2. Add trend judgment tools. Other indicators such as MACD and Bollinger Bands can be added to confirm the trend and improve accuracy.

3. Set dynamic stop loss. Set dynamic stop loss points based on indicators such as ATR for more flexible stops.  

4. Consider trading costs. Introduce slippage and commission parameters to optimize net profits rather than absolute returns.  

5. Multi-level entry and exit. More complex multi-level entry and exit mechanisms can be set to build positions or stop losses in stages at different trend stages.

With the above optimizations, while tracking the trend, the strategy can be expected to obtain higher stability, more accurate judgment and stronger risk control capabilities, thereby achieving melhor performance.  

#### Summary  

The Parabolic SAR and EMA trend tracking strategy integrates the advantages of multiple indicators to judge trend direction and timing of entry. With SAR set as stop loss point, risk is under control. It is a relatively stable quantitative strategy. This strategy has advantages such as high judgment accuracy and easy mastery. But there are also certain risks. Further optimization of parameters and stop loss methods is needed to achieve melhor performance. It is worth investors' reference and learning.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|EMA Length|
|v_input_2|false|EMA Offset %|
|v_input_3|0.015|start|
|v_input_4|0.005|increment|
|v_input_5|0.2|maximum|
|v_input_6|true|From Day|
|v_input_7|true|From Month|
|v_input_8|2019|From Year|
|v_input_9|true|To Day|
|v_input_10|true|To Month|
|v_input_11|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Parabolic SAR Strategy w/ EMA", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)


emalength = input(100 , "EMA Length")
emaoffset = input(0.00, "EMA Offset %")
start = input(0.015)
increment = input(0.005)
maximum = input(0.2)

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

psar = sar(start, increment, maximum)
ema = ema(close, emalength)
offset = (emaoffset / 100) * ema

// Signals
psar_long  = high[1] < psar[2] and high > psar[1] 
psar_short = low[1]  > psar[2] and low  < psar[1] 

// Plot PSAR
plotshape(psar, location = location.absolute, style = shape.cross, size = size.tiny, color = low < psar[1] and not psar_long ? green : red)

//Plot EMA
plot(ema)

if(psar_long)
    strategy.close("Short")
    
if(psar_short)
    strategy.close("Long")

if (psar < low and time_cond and close > ema + offset)
    strategy.entry("Long", strategy.long, comment="Long", stop = psar)
   
if (psar > high and time_cond and close < ema - offset)
    strategy.entry("Short", strategy.short, comment="Short", stop = psar)

if (not time_cond)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/436225

> Last Modified

2023-12-22 13:04:55
