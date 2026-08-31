
> Name

Triple-EMA-and-Fisher-Transform-Trend-Momentum-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8a58adb79b787179365.png)
![IMG](https://www.fmz.com/upload/asset/2d901d8fb7d74c85aeb73.png)


[trans]
#### 概述
这个策略结合了三重指数移动平均线(TEMA)和Fisher Transform这两个技术指标,通过识别趋势和动量信号来确定入场和出场时机。TEMA作为一种低延迟的趋势跟踪指标,能够有效识别市场趋势方向,而Fisher Transform通过将价格变化转换为高斯正态分布,提供了更清晰的动量信号。策略采用交叉信号作为交易触发条件,结合了趋势跟踪和动量分析的优势。

#### 策略原理
策略的核心逻辑建立在两个主要指标之上:
1. TEMA指标采用三重指数移动平均计算方法,通过"3×EMA - 3×EMA(EMA) + EMA(EMA(EMA))"的公式降低了传统移动平均线的滞后性,默认周期为21。
2. Fisher Transform指标将价格数据转换为正态分布,默认参数为10,通过对高低点价格进行标准化处理后应用对数变换,使得信号更加明确。

交易规则如下:
- 做多条件:价格上穿TEMA线且Fisher Transform上穿0轴
- 做空条件:价格下穿TEMA线且Fisher Transform下穿0轴  
- 多单出场:价格下穿TEMA线或Fisher Transform下穿0轴
- 空单出场:价格上穿TEMA线或Fisher Transform上穿0轴

#### 策略优势
1. 信号可靠性高:通过结合趋势和动量指标,能够有效过滤虚假信号
2. 延迟性低:TEMA相比传统移动平均线具有更快的响应速度
3. 信号明确:Fisher Transform的正态分布特性使得交易信号更加清晰
4. 风险控制完善:设置了明确的止损条件
5. 参数可调:可根据不同市场环境调整指标参数
6. 可视化效果好:提供了清晰的图表展示

#### 策略风险
1. 震荡市场风险:在横盘震荡行情下可能产生频繁的假突破信号
2. 滞后性风险:虽然TEMA降低了滞后性,但仍然存在一定程度的延迟
3. 参数敏感性:不同参数设置可能导致策略表现差异较大
4. 市场环境依赖:策略在趋势明显的市场中表现更好

#### 策略优化方向
1. 引入波动率过滤:可以添加ATR指标过滤低波动率环境下的交易信号
2. 优化出场机制:可以考虑加入移动止损或利润保护机制
3. 增加时间过滤:可以根据不同时间段的市场特性调整交易策略
4. 加入成交量确认:结合成交量指标提高信号可靠性
5. 动态参数优化:根据市场状态动态调整指标参数

#### 总结
这是一个结合趋势和动量分析的完整交易策略,通过TEMA和Fisher Transform的配合使用,既保证了趋势跟踪能力,又提供了清晰的动量确认信号。策略设计合理,具有较好的实用性,但在实际应用中需要注意市场环境的适应性,并根据具体情况进行参数优化。通过建议的优化方向,策略的稳定性和可靠性还可以进一步提升。|| 

#### Overview
This strategy combines the Triple Exponential Moving Average (TEMA) and Fisher Transform indicators to identify trend and momentum signals for entry and exit timing. TEMA serves as a low-lag trend following indicator for effective trend direction identification, while Fisher Transform converts price movements into a Gaussian normal distribution for clearer momentum signals. The strategy uses crossover signals as trading triggers, combining the advantages of trend following and momentum analysis.

#### Strategy Principles
The core logic is built on two main indicators:
1. TEMA uses a triple exponential moving average calculation method, reducing the lag of traditional moving averages through the formula "3×EMA - 3×EMA(EMA) + EMA(EMA(EMA))", with a default period of 21.
2. Fisher Transform converts price data into a normal distribution with a default parameter of 10, applying logarithmic transformation after normalizing high-low prices for clearer signals.

Trading rules are:
- Long Entry: Price crosses above TEMA and Fisher Transform crosses above 0
- Short Entry: Price crosses below TEMA and Fisher Transform crosses below 0
- Long Exit: Price crosses below TEMA or Fisher Transform crosses below 0
- Short Exit: Price crosses above TEMA or Fisher Transform crosses above 0

#### Strategy Advantages
1. High Signal Reliability: Effectively filters false signals by combining trend and momentum indicators
2. Low Latency: TEMA provides faster response compared to traditional moving averages
3. Clear Signals: Fisher Transform's normal distribution characteristics provide clearer trading signals
4. Robust Risk Control: Implements clear stop-loss conditions
5. Adjustable Parameters: Can be tuned for different market conditions
6. Good Visualization: Provides clear chart display

#### Strategy Risks
1. Choppy Market Risk: May generate frequent false breakout signals in sideways markets
2. Lag Risk: Though reduced, some degree of delay still exists
3. Parameter Sensitivity: Different parameter settings may lead to varying strategy performance
4. Market Environment Dependence: Strategy performs better in trending markets

#### Strategy Optimization Directions
1. Introduce Volatility Filter: Add ATR indicator to filter signals in low volatility environments
2. Optimize Exit Mechanism: Consider adding trailing stops or profit protection mechanisms
3. Add Time Filters: Adjust trading strategy based on different time period characteristics
4. Include Volume Confirmation: Incorporate volume indicators to improve signal reliability
5. Dynamic Parameter Optimization: Adjust indicator parameters based on market conditions

#### Summary
This is a comprehensive trading strategy combining trend and momentum analysis. Through the complementary use of TEMA and Fisher Transform, it ensures trend following capability while providing clear momentum confirmation signals. The strategy design is rational and practical, but attention must be paid to market environment adaptability and parameter optimization in actual application. Through the suggested optimization directions, the strategy's stability and reliability can be further enhanced.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-19 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Triple EMA (TEMA) + Fisher Transform Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// ==== Triple EMA (TEMA) Settings ====
temaLength = input.int(21, title="TEMA Length", minval=1)

// Implementácia Triple EMA (TEMA)
// TEMA = 3 * EMA(close, length) - 3 * EMA(EMA(close, length), length) + EMA(EMA(EMA(close, length), length), length)
ema1 = ta.ema(close, temaLength)
ema2 = ta.ema(ema1, temaLength)
ema3 = ta.ema(ema2, temaLength)
tema = 3 * ema1 - 3 * ema2 + ema3
plot(tema, color=color.blue, title="TEMA")

// ==== Fisher Transform Settings ====
fisherLength = input.int(10, title="Fisher Length", minval=1)
fisherSmooth = input.int(1, title="Fisher Smoothing", minval=1)  // Zvyčajne sa používa 1 alebo 2

// Výpočet Fisher Transform
// Krok 1: Normalizácia ceny
price = (high + low) / 2
maxPrice = ta.highest(price, fisherLength)
minPrice = ta.lowest(price, fisherLength)
value = 0.5 * (2 * ((price - minPrice) / (maxPrice - minPrice)) - 1)
value := math.min(math.max(value, -0.999), 0.999)  // Orezanie hodnoty pre stabilitu

// Krok 2: Výpočet Fisher Transform
var float fisher = na
fisher := 0.5 * math.log((1 + value) / (1 - value)) + 0.5 * nz(fisher[1])
fisher := fisherSmooth > 1 ? ta.sma(fisher, fisherSmooth) : fisher
plot(fisher, color=color.red, title="Fisher Transform", linewidth=2)

// ==== Strategie Podmienky ====
 // Long Condition: Cena prekročí TEMA smerom nahor a Fisher Transform prekročí 0 smerom nahor
longCondition = ta.crossover(close, tema) and ta.crossover(fisher, 0)
if (longCondition)
    strategy.entry("Long", strategy.long)

 // Short Condition: Cena prekročí TEMA smerom nadol a Fisher Transform prekročí 0 smerom nadol
shortCondition = ta.crossunder(close, tema) and ta.crossunder(fisher, 0)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Exit Long Condition: Cena prekročí TEMA smerom nadol alebo Fisher Transform prekročí 0 smerom nadol
exitLong = ta.crossunder(close, tema) or ta.crossunder(fisher, 0)
if (exitLong)
    strategy.close("Long")

// Exit Short Condition: Cena prekročí TEMA smerom nahor alebo Fisher Transform prekročí 0 smerom nahor
exitShort = ta.crossover(close, tema) or ta.crossover(fisher, 0)
if (exitShort)
    strategy.close("Short")

// ==== Voliteľné: Vykreslenie Zero Line pre Fisher Transform ====
hline(0, "Zero Line", color=color.gray, linestyle=hline.style_dotted)

```

> Detail

https://www.fmz.com/strategy/482919

> Last Modified

2025-02-20 17:41:02
