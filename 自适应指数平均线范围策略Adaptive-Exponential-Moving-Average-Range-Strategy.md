
> Name

自适应指数平均线范围策略Adaptive-Exponential-Moving-Average-Range-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/128583a0312d75259a8.png)
[trans]
### 概述

该策略运用计算速度更快的指数线性加权平均线(EHMA)以及自适应通道来构建趋势跟随型策略。由于EHMA计算速度更快,可有效识别价格变化趋势,避免假突破产生不必要的交易信号。同时,自适应通道可以过滤掉部分价格震荡,只有价格突破通道时才会发出交易信号,降低无效交易的概率,提高盈利概率。

### 策略原理  

1. 根据参数Period计算指数线性加权平均线EHMA。EHMA计算速度快,可有效跟踪价格变化趋势。

2. 根据参数RangeWidth,在EHMA上下各扩张一个自适应通道。只有当价格高于上通道线或低于下通道线时,才认为趋势发生转变,发出交易信号。

3. 判断价格与通道的关系。价格上穿上通道线时做多,下穿下通道线时做空。价格下穿上通道线时平多仓,上穿下通道线时平空仓。

### 优势分析

相比普通移动平均线策略,该策略具有以下优势:

1. 使用EHMA算法计算平均线。EHMA对价格变化趋势的响应更加敏感,可有效识别趋势变化,避免假突破造成不必要交易。

2. 自适应通道可有效过滤价格震荡。只有价格确定趋势变化时才会产生交易信号。可过滤掉部分无效交易,提高盈利概率。

3. 可灵活调整通道宽度,适应不同市场环境。宽通道可过滤更多震荡,降低交易频率;窄通道可更早识别趋势变化,增加交易频率。

### 风险分析

该策略也存在以下风险:  

1. 依然无法完全避免假突破。价格可能出现断层,直接上穿或下穿通道带。需要适当调整参数,控制风险。

2. 通道过于宽泛时可能错过部分交易机会。可适当缩窄通道提高敏感度。

3. 通道过于窄小时则会增加无效交易次数。可适当扩大通道宽度提高稳定性。

### 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化参数Period。调整平均线计算周期,适应不同品种和周期图的特点。

2. 优化参数RangeWidth。根据市场波动程度和个人风险偏好,调整通道范围。

3. 增加止损策略。在持仓过程中,设定合理的止损点,有效控制单笔交易最大损失。

4. 结合其他指标过滤 Entries. 例如增加成交量的判断,降低 Entries 的无效率。  

5. 多品种化应用与参数优化。在更多品种和周期上进行测试,优化通用参数。

### 总结  

该策略整合 EHMA 指标和自适应通道指标,形成趋势跟随型策略。可有效识别市场趋势,同时过滤价格震荡,避免不必要交易。经过一系列参数优化与风险控制后,能够在多种品种与周期上稳定盈利。

||

### Overview  

This strategy uses the faster Exponential Hull Moving Average (EHMA) and an adaptive channel to build a trend following strategy. Since EHMA calculates faster, it can effectively identify price trend changes and avoid unnecessary trades caused by false breakouts. At the same time, the adaptive channel can filter out some price fluctuations. Trades are only triggered when the price breaks through the channel, reducing the probability of ineffective trades and increasing profitability.

### Strategy Principle    

1. Calculate the exponential weighted moving average EHMA based on the Period parameter. EHMA calculates faster and can track price trend changes effectively.   

2. Build an adaptive channel above and below the EHMA based on the RangeWidth parameter. Only when the price rises above the upper channel line or falls below the lower channel line, the trend is considered to have changed and trading signals are triggered.   

3. Determine the price relationship with the channel. Long when price breaks through the upper line, short when breaks through the lower line. Close long position when price crosses below upper line, close short position when price crosses above lower line.

### Advantage Analysis  

Compared with ordinary moving average strategies, this strategy has the following advantages:  

1. Use the EHMA algorithm to calculate the moving average. EHMA responds more sensitively to price changes and can identify trend changes effectively to avoid unnecessary trades caused by false breakouts.

2. The adaptive channel can filter out price fluctuations effectively. Trading signals are only triggered when the price trend has changed firmly. This could filter out some ineffective trades and improve profitability.   

3. The channel width can be adjusted flexibly to adapt to different market conditions. Wider channels can filter more fluctuations and reduce trading frequency. Narrower channels can identify trend changes earlier and increase trading frequency.

### Risk Analysis   

There are also some risks with this strategy:

1. False breakouts are still not completely avoidable. Prices may gap beyond the channel. Parameters need to adjusted properly to control risks.  

2. Some trading opportunities may be missed if the channel is too wide. Narrow down the channel reasonably to increase sensitivity.  

3. Too narrow channels can increase ineffective trades. Expand channel width appropriately to enhance stability.

### Optimization Directions   

This strategy can be optimized in the following aspects:  

1. Optimize the Period parameter. Adjust the moving average calculation cycle to adapt to different products and timeframes.

2. Optimize the RangeWidth parameter. Adjust the channel scope based on market volatility and personal risk preference. 

3. Add stop loss strategy. Set reasonable stop loss points during holding positions to effectively control maximum loss per trade.

4. Combine with other indicators for entries filtering. For example, add volume to reduce false entries.

5. Diversify strategy applications and optimize parameters. Test and optimize universal parameters across more products and timeframes.  

### Summary   

This strategy combines the EHMA indicator and adaptive channel indicator to form a trend following strategy. It can identify market trends effectively and filter out price fluctuations to avoid unnecessary trades. After a series of parameter optimization and risk control, stable profits can be achieved across various products and timeframes.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Position Type: Long|Both|Short|
|v_input_2|180|Length|
|v_input_3|0.02|Range Width|
|v_input_4|timestamp(2017-01-01T00:00:00)|startDate|
|v_input_5|timestamp(2029-01-01T00:00:00)|finishDate|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-25 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_1",1]]
*/

// Credit is due where credit is due:
// Hull Moving Average: developed by Alan Hull
// EHMA: coded by Twitter @borserman
// I've built on their work in an attempt to create a strategy more robust to fake moves
// @0xLetoII

//@version=4
strategy(
  title="EHMA Range Strategy",
  process_orders_on_close=true,
  explicit_plot_zorder=true,
  overlay=true, 
  initial_capital=1500, 
  default_qty_type=strategy.percent_of_equity, 
  commission_type=strategy.commission.percent, 
  commission_value=0.085,
  default_qty_value=100
  )
  

// Position Type
pos_type = input(defval = "Long", title="Position Type", options=["Both", "Long", "Short"])

// Inputs
Period = input(defval=180, title="Length")
RangeWidth = input(defval=0.02, step=0.01, title="Range Width")
sqrtPeriod = sqrt(Period)

// Function for the Borserman EMA
borserman_ema(x, y) =>
    alpha = 2 / (y + 1)
    sum = 0.0
    sum := alpha * x + (1 - alpha) * nz(sum[1])

// Calculate the Exponential Hull Moving Average
EHMA = borserman_ema(2 * borserman_ema(close, Period / 2) - borserman_ema(close, Period), sqrtPeriod)

// Create upper & lower bounds around the EHMA for broader entries & exits
upper = EHMA + (EHMA * RangeWidth)
lower = EHMA - (EHMA * RangeWidth)

// Plots
EHMAcolor = (close > EHMA ? color.green : color.red)
plot(EHMA, color=EHMAcolor, linewidth=2)
plot(lower, color=color.orange, linewidth=2)
plot(upper, color=color.blue, linewidth=2)


// Strategy
long = close > upper
exit_long = close < lower
short = close < lower
exit_short = close > upper


// Calculate start/end date and time condition
startDate  = input(timestamp("2017-01-01T00:00:00"))
finishDate = input(timestamp("2029-01-01T00:00:00"))
 
time_cond  = true


// Entries & Exits
if pos_type == "Both"
    strategy.entry("Long", strategy.long, comment="Long", when=long and time_cond)
    strategy.close("Long", comment="Exit Long", when=exit_long and time_cond)
    strategy.entry("Short", strategy.short, comment="Short", when=short and time_cond)
    strategy.close("Short", comment="Exit Short", when=exit_short and time_cond)
if pos_type == "Long"
    strategy.entry("Long", strategy.long, comment="Long", when=long and time_cond)
    strategy.close("Long", comment="Exit Long", when=exit_long and time_cond)
if pos_type == "Short"
    strategy.entry("Short", strategy.short, comment="Short", when=short and time_cond)
    strategy.close("Short", comment="Exit Short", when=exit_short and time_cond)
    
```

> Detail

https://www.fmz.com/strategy/442843

> Last Modified

2024-02-26 14:58:32
