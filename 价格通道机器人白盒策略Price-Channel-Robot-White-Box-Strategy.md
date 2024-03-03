
> Name

价格通道机器人白盒策略Price-Channel-Robot-White-Box-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b8ca85bd0157792ac6.png)
[trans]
### 概述

价格通道机器人白盒策略是一种基于价格通道指标的简单的机械化交易策略。它使用价格通道的上下限来判断入场和出场时机。该策略 longtime 为多头,shortime 为空头。

### 策略原理  

价格通道机器人白盒策略的核心逻辑是:

1. 使用highest和lowest函数计算最近len根K线的最高价和最低价,定义为价格通道的上限和下限
2. 计算价格通道中间价:(最高价+最低价)/2
3. 当价格上穿价格通道上限时,开多仓
4. 当价格下破价格通道下限时,开空仓  
5. 当价格回落到价格通道中间价时,平仓

该策略还具有一些可配置的参数:

- 价格通道长度len:默认50根K线
- 开仓类型:多头、空头可单独配置
- 开仓量:默认为账户权益的100%
- 止损:可选择是否使用价格通道中间价作为止损
- 交易时间:可配置只在指定日期范围内交易

通过这些参数的调整,可以使策略更好地适应不同品种和市场环境。

### 优势分析

价格通道机器人白盒策略具有以下优势:

1. 策略逻辑简单,容易理解和实现
2. 充分利用价格通道指标判断趋势和反转
3. 可配置的参数较多,适应性强  
4. 内置止损机制,可以限制亏损
5. 支持时间过滤,避免重大事件的影响

总的来说,该策略是一个简单实用的趋势追踪策略,在参数调优后,可以获得不错的效果。

### 风险分析

价格通道机器人白盒策略也存在一些风险:  

1. 价格通道指标对参数len敏感,不同时间周期和品种需要独立测试和优化
2. 追踪止损有被套利的风险,需要根据市场波动率调整止损距离
3. 在横盘和震荡行情下,会产生较多无谓交易,增加交易成本和滑点损失

为了降低这些风险,需要从以下几个方面进行优化:

1. 使用Walk Forward Analysis方法自动优化参数
2. 在止损价格加入缓冲区,避免被套利的概率
3. 增加趋势判断指标,避免横盘震荡市场的交易

### 优化方向 

价格通道机器人白盒策略还有进一步优化的空间:

1. 增加对大周期趋势的判断,避免逆势交易
2. 结合不同品种之间的价差来设定参数,利用套利机会
3. 在止损价格中加入随机缓冲区,降低被套利概率
4. 根据市场波动率动态调整价格通道参数len
5. 针对特定品种使用深度学习方法训练agent优化策略  

通过这些优化手段,有望进一步提高策略的稳定性和盈利能力。

### 总结

价格通道机器人白盒策略是一个简单但实用的追踪趋势策略。它通过价格通道指标判断趋势方向和反转点,并以此制定交易决策。该策略易于理解和实现,在参数调优后能够获得不错回报。同时也存在一定的风险,需要对参数和止损进行优化以降低风险。总体来说,该策略具有广阔的应用前景和优化潜力,值得探索和实践。

||

### Overview

The Price Channel Robot White Box Strategy is a simple mechanical trading strategy based on the price channel indicator. It uses the upper and lower limits of the price channel to determine entry and exit points. The strategy goes long on uptrend and goes short on downtrend.  

### Strategy Logic

The core logic of the Price Channel Robot White Box Strategy is:  

1. Use highest and lowest functions to calculate the highest high and lowest low of recent len bars, defined as upper and lower limits of the price channel
2. Calculate middle price of price channel: (highest high + lowest low) / 2
3. Go long when price breaks above the upper limit of price channel  
4. Go short when price breaks below the lower limit of price channel
5. Close position when price pulls back to the middle price of price channel

The strategy also has some configurable parameters:  

- Price channel length len: default 50 bars
- Trade direction: long, short can be configured separately  
- Trade size: default 100% of account equity
- Stop loss: option to use middle price as stop loss
- Trading hours: only trade within configured date range  

By adjusting these parameters, the strategy can be better adapted to different products and market environments.   

### Advantage Analysis

The Price Channel Robot White Box Strategy has the following advantages:  

1. Simple logic, easy to understand and implement
2. Make full use of price channel indicator to determine trend and reversal  
3. Highly configurable parameters for better adaptability 
4. Built-in stop loss mechanism to limit losses
5. Support time filter to avoid impacts of major events  

In summary, it is a simple yet practical trend following strategy, which can achieve decent results after parameter tuning.

### Risk Analysis  

The Price Channel Robot White Box Strategy also has some risks:   

1. Price channel indicator is sensitive to parameter len, independent testing and optimization needed for different timeframes and products  
2. Tracking stop loss has risk of being stopped out prematurely, stop loss distance needs adjustment based on market volatility
3. Excessive meaningless trades during range-bound and sideways markets, increasing transaction costs and slippage  

To reduce these risks, optimization needs to be done in the following aspects:  

1. Use Walk Forward Analysis to auto optimize parameters  
2. Add buffer zone to stop loss price to avoid being stopped out
3. Add trend filter to avoid trading in sideways market  

### Optimization Directions

There is room for further optimization of the Price Channel Robot White Box Strategy:  

1. Add judgement of higher timeframe trend to avoid counter trend trading  
2. Use price spread between correlated products to set parameters and utilize arbitrage opportunities
3. Add random buffer to stop loss price to reduce chance of stopped out
4. Dynamically adjust price channel parameter len based on market volatility  
5. Train agent with deep learning methods to optimize strategy for specific products   

These optimization techniques could help further improve the stability and profitability of the strategy.  

### Summary  

The Price Channel Robot White Box Strategy is a simple yet practical trend following strategy. It identifies trend direction and reversal points using the price channel indicator to make trading decisions. The strategy is easy to understand and implement, and can achieve decent returns after parameter tuning. There are also certain risks that need to be mitigated through optimizing parameters and stop loss. Overall, the strategy has broad application prospects and optimization potential, worth exploring and practicing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|Stop-loss|
|v_input_4|100|Lot, %|
|v_input_5|50|Price Channel Length|
|v_input_6|true|Show lines|
|v_input_7|false|Show Background|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-21 00:00:00
end: 2024-02-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro

//@version=4
strategy(title = "Robot WhiteBox Channel", shorttitle = "Robot WhiteBox Channel", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, commission_value = 0.1)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
needstop = input(true, defval = true, title = "Stop-loss")
lotsize = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
len = input(50, minval = 1, title = "Price Channel Length")
showll = input(true, defval = true, title = "Show lines")
showbg = input(false, defval = false, title = "Show Background")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Price Channel
h = highest(high, len)
l = lowest(low, len)
center = (h + l) / 2

//Lines
pccol = showll ? color.black : na
slcol = showll ? color.red : na
plot(h, offset = 1, color = pccol)
plot(center, offset = 1, color = slcol)
plot(l, offset = 1, color = pccol)

//Background
size = strategy.position_size
bgcol = showbg == false ? na : size > 0 ? color.lime : size < 0 ? color.red : na
bgcolor(bgcol, transp = 70)

//Trading
truetime = time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)
lot = 0.0
lot := size != size[1] ? strategy.equity / close * lotsize / 100 : lot[1]
if h > 0
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, stop = h, when = strategy.position_size <= 0 and truetime)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, stop = l, when = strategy.position_size >= 0 and truetime)
    strategy.entry("S Stop", strategy.long, 0, stop = center, when = strategy.position_size[1] <= 0 and needstop)
    strategy.entry("L Stop", strategy.short, 0, stop = center, when = strategy.position_size[1] >= 0 and needstop)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    strategy.cancel("Long")
    strategy.cancel("Short")
```

> Detail

https://www.fmz.com/strategy/443040

> Last Modified

2024-02-28 17:51:14
