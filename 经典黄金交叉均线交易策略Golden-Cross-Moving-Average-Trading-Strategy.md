
> Name

经典黄金交叉均线交易策略Golden-Cross-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/186f56e4d4deb092469.png)
[trans]

### 概述

黄金交叉均线交易策略(Golden Cross Moving Average Trading Strategy)是一种比较经典的量化交易策略。该策略运用不同周期的移动平均线,判断市场趋势做多做空。当短期移动平均线上穿较长周期移动平均线时,视为买入信号;当短期移动平均线下穿长期移动平均线时,视为卖出信号。

### 策略原理

该策略基于三条不同周期的简单移动平均线(SMA):50日线、100日线和200日线。具体交易逻辑如下:

1. 入场信号:当50日移动平均线上穿100日移动平均线时,做多入场。

2. 出场信号:当50日移动平均线下穿100日移动平均线时,平仓离场;或者当收盘价低于100日移动平均线时,离场;或者当100日移动平均线下穿200日移动平均线时,离场。 

3. 止盈止损:设定移动止盈和固定止损。

该策略利用了移动平均线能够有效判断市场平均价格的特点,当短期平均线上穿长期平均线时,被视为市场步入上升趋势的信号,因此做多;当短期平均线下穿长期平均线时,则被视为市场步入下降通道,因此离场。通过这样的方式,可以有效捕捉市场趋势。

### 策略优势

1. 操作简单,容易实现。仅需使用三条不同周期的移动平均线即可构建该策略逻辑。

2. 具有较强的稳定性。移动平均线本身具有去噪功能,可以有效滤除市场随机波动对交易的影响,使得信号更加稳定可靠。

3. 容易掌握大趋势。移动平均线能够有效反映市场平均价格变化趋势,通过长短周期线的交叉来判断大的行情变化。

4. 可定制化程度高。可以自行确定移动平均线的周期组合,实现不同程度的风险控制。

### 策略风险

1. 可能产生较多的虚假信号。当短期和长期移动平均线过于接近时,可能出现频繁的交叉,产生大量无效信号。

2. 无法对突发事件做出快速响应。移动平均线对价格变化响应较为缓慢,无法对市场的突发消息和重大事件做出实时反应。

3. 无法获利市场中的小级别波动。移动平均线的去噪特性也意味着无法捕捉到市场中的小级别波动来获利。

4. 参数设置较为主观。移动平均线周期的选择比较主观,需要根据不同市场确定最佳参数。

### 策略优化方向

1. 增加过滤条件,避免产生过多虚假信号。例如设置价格波动范围作为过滤器,只有在突破一定幅度时才产生交易信号。

2. 结合其他指标进行组合。例如与波动率指标、成交量指标等组合使用,可以提高信号的准确率。

3. 增加自适应优化模块。通过机器学习等技术来动态优化移动平均线的周期参数,使其能够自适应外部市场环境的变化。

4. 结合深度学习模型。使用更为先进的深度学习模型取代移动平均线,具有更强大的特征提取和建模能力。

### 总结
黄金交叉均线交易策略是一个比较典型的趋势跟随策略。它反映了市场价格的平均变化趋势,简单实用,适合初学者学习。同时,该策略也存在一定的缺陷,可以从提高信号质量、与其他技术指标组合、引入自适应机制等多个方面进行优化,使策略适应更加复杂的市场环境。总的来说,该策略具有很高的参考和学习价值。

||


### Overview

The Golden Cross Moving Average Trading Strategy is a classic quantitative trading strategy. This strategy uses moving averages of different periods to determine market trends for long and short positions. When the short-term moving average crosses above the longer-term moving average, it is considered a buy signal. When the short-term moving average crosses below the long-term moving average, it is considered a sell signal.

### Strategy Logic

This strategy is based on three simple moving averages (SMA) of different periods: 50-day, 100-day and 200-day. The specific trading logic is as follows:

1. Entry signal: when the 50-day moving average crosses above the 100-day moving average, go long. 

2. Exit signal: when the 50-day moving average crosses below the 100-day moving average, close positions; or when the close price is below the 100-day moving average, exit; or when the 100-day moving average crosses below the 200-day moving average, exit.

3. Take profit and stop loss: set trailing take profit and fixed stop loss.

This strategy utilizes the ability of moving averages to effectively determine market average price trends. The crossover of short-term and long-term averages is viewed as the market entering an upward or downward trend, hence the long or exit signals. This allows the strategy to effectively capture market trends.


### Advantages

1. Simple to implement. It only requires three moving averages of different periods.

2. Highly stable. Moving averages have noise filtering abilities that reduce the impact of market randomness on trades and make signals more reliable.

3. Easy to capture major trends. Moving averages effectively reflect changes in the average market price trend, using crossovers between short and long-term lines to determine major trend changes.

4. Highly customizable. The moving average periods can be adjusted for different levels of risk control.

### Risks

1. May generate many false signals. Frequent crossovers can happen when the short and long-term averages are too close, resulting in excessive invalid signals.

2. Slow to respond to sudden events. Moving averages respond to price changes slowly and cannot instantly react to market news and major events. 

3. Unable to profit from minor fluctuations. The noise filtering also means missing out on profits from minor market swings.

4. Subjective parameter selection. The appropriate moving average periods are largely subjective and dependent on the specific market.

### Enhancement Opportunities 

1. Add filters to reduce false signals, such as price range filters to limit signals to movements above a certain magnitude.

2. Incorporate other indicators for combinational strategies, which can improve signal accuracy, e.g. volatility or volume indicators.

3. Add adaptive optimization modules to dynamically optimize moving average periods based on machine learning algorithms, enabling adaptation to evolving market conditions.

4. Incorporate advanced deep learning models instead of moving averages for superior feature extraction and modeling capabilities.

### Conclusion
The Golden Cross Moving Average Trading Strategy is a typical trend following strategy. It reflects average market price trends simply and practically, suitable for beginners. However, it also has some flaws that can be improved through enhancing signal quality, combining with other technical indicators, introducing adaptive mechanisms, etc to adapt to more complex markets. Overall, this is a strategy with high reference and learning value.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|300|Take Profit Price (% Gain)|
|v_input_2|25|Stop Loss (% Loss)|
|v_input_3|true|Start Date|
|v_input_4|true|Start Month|
|v_input_5|2018|Start Year|
|v_input_6|true|End Date|
|v_input_7|true|End Month|
|v_input_8|2031|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2023-12-10 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © CJDeegan

//@version=4
strategy(title = "[LIVE] Golden Cross", overlay=true)

// ------------Functions------------

//Percent to Decimal Conversion
perToDec(a) => a * 0.01
//Price Difference to Tick
diffToTick(a,b) => (a - b) / syminfo.mintick 

    
// ------------Strategy Inputs------------
takeProfitInput = input(300, "Take Profit Price (% Gain)")
stopLossInput = input(25, "Stop Loss (% Loss)")


startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer,
     defval=2018, minval=1800, maxval=2100)

endDate = input(title="End Date", type=input.integer,
     defval=1, minval=1, maxval=31)
endMonth = input(title="End Month", type=input.integer,
     defval=1, minval=1, maxval=12)
endYear = input(title="End Year", type=input.integer,
     defval=2031, minval=1800, maxval=2100)

inDateRange = (time >= timestamp(syminfo.timezone, startYear,
         startMonth, startDate, 0, 0)) and
     (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))
     

// ------------Populate Indicators------------

//EMA
sma50 = sma(close,50)
sma100 = sma(close,100)
sma200 = sma(close,200)


// ------------Entry Logic------------
//Guards
entryGuard = true
//Triggers
entryTrigger = crossover(sma50,sma100)
//Conditions
entryCondition = entryGuard and entryTrigger
//Calculations
//Execution
if (inDateRange and entryCondition)
    strategy.entry("Long", strategy.long, when = entryCondition, comment = "Entry")

//------------Exit Logic------------

//Guards
//Triggers
exitTrigger = crossunder(sma50,sma100) or close < sma100 or crossunder(sma100,sma200)
//Conditions
exitCondition = exitTrigger

//Calculations
//Take Profit
takeProfitPrice = strategy.position_avg_price + (strategy.position_avg_price * perToDec(takeProfitInput))
//Take Profit Ticks
takeProfitTicks = diffToTick(takeProfitPrice, strategy.position_avg_price)
//StopLoss
stopLossPrice = strategy.position_avg_price - (strategy.position_avg_price * perToDec(stopLossInput))

//Execution
if (inDateRange)
    strategy.close("Long", when = exitCondition, comment = "Sell Trigger")
    strategy.exit("Exit", "Long", comment="Stop", profit=takeProfitTicks, stop=stopLossPrice)

//Plots
plot(sma50, "SMA 50", color = color.blue)
plot(sma100, "SMA 100", color = color.green)
plot(sma200, "SMA 200", color = color.yellow)
entry = plot(strategy.position_size <= 0 ? na : strategy.position_avg_price, "Entry Price", color = color.yellow, style = plot.style_linebr)
profit = plot(strategy.position_size <= 0 ? na : takeProfitPrice, "Take Profit (Price)", color = color.green, style = plot.style_linebr)
stop = plot(strategy.position_size <= 0 ? na : stopLossPrice, "Stop Loss", color = color.red, style = plot.style_linebr)
fill(entry,profit, color=color.green)
fill(entry,stop, color=color.red)

```

> Detail

https://www.fmz.com/strategy/434957

> Last Modified

2023-12-11 11:37:36
