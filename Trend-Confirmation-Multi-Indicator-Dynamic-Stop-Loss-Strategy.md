
> Name

Trend-Confirmation-Multi-Indicator-Dynamic-Stop-Loss-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d86d379b8179a6592780.png)
![IMG](https://www.fmz.com/upload/asset/2d8d1ef18c02cb4e4612c.png)

[trans]
#### 概述
这是一个结合了多个技术指标的趋势跟踪策略,主要通过SMA(简单移动平均线)、MACD(移动平均线收敛发散指标)和ADX(平均趋向指数)三个指标的协同配合,在周线级别上进行交易。该策略采用动态止损机制,通过摆动低点(Swing Low)的识别来优化风险管理,实现更精确的仓位控制。

#### 策略原理
策略的核心逻辑基于三重验证机制:
1. 通过SMA(30)判断整体趋势方向,价格在均线上方代表上升趋势
2. 使用MACD(9,18,9)捕捉价格动能,要求MACD线在信号线上方且为正值
3. 借助ADX(14)确认趋势强度,ADX大于25表示趋势充分
4. 在满足以上三个条件时开仓做多
5. 通过识别次低点设置动态止损,当价格跌破SMA时清仓

#### 策略优势
1. 多重指标交叉验证,显著降低虚假信号的影响
2. 采用周线级别交易,避免日内波动干扰
3. 动态止损机制,通过摆动低点自适应调整止损位
4. ADX过滤弱趋势,提高交易质量
5. 风险管理全面,包含趋势反转和止损两重保护

#### 策略风险
1. 多重指标可能导致信号滞后,在快速行情中错过机会
2. 周线级别操作可能面临较大回撤
3. 摆动低点识别在剧烈波动中可能不稳定
4. 需要较长时间积累足够的价格数据
5. 在震荡市场中可能产生频繁假信号

#### 策略优化方向
1. 可考虑引入自适应指标参数,根据市场波动度动态调整
2. 增加成交量指标验证,提高信号可靠性
3. 开发更智能的Swing Low识别算法
4. 加入市场环境分类,针对不同市场状态采用不同参数
5. 优化止损逻辑,考虑引入移动止损

#### 总结
该策略通过多重技术指标的协同作用,构建了一个稳健的趋势跟踪系统。动态止损机制提供了良好的风险控制,适合追踪中长期趋势。策略的主要优势在于信号可靠性高,风险管理完善,但同时也面临信号滞后等挑战。通过进一步优化参数自适应性和市场环境识别,该策略有望获得更好的表现。 || 

#### Overview
This is a trend-following strategy that combines multiple technical indicators, primarily utilizing SMA (Simple Moving Average), MACD (Moving Average Convergence Divergence), and ADX (Average Directional Index) for trading on weekly charts. The strategy employs a dynamic stop-loss mechanism through Swing Low identification to optimize risk management and achieve more precise position control.

#### Strategy Principles
The core logic is based on a triple verification mechanism:
1. Using SMA(30) to determine overall trend direction, with price above the moving average indicating an uptrend
2. Employing MACD(9,18,9) to capture price momentum, requiring MACD line above signal line and positive
3. Utilizing ADX(14) to confirm trend strength, with ADX above 25 indicating sufficient trend
4. Entering long positions when all three conditions are met
5. Setting dynamic stop-loss through second-lowest swing point identification, closing positions when price breaks below SMA

#### Strategy Advantages
1. Multiple indicator cross-validation significantly reduces false signals
2. Weekly timeframe trading avoids daily noise
3. Dynamic stop-loss mechanism adapts to market conditions through swing low points
4. ADX filtering removes weak trends, improving trade quality
5. Comprehensive risk management with both trend reversal and stop-loss protection

#### Strategy Risks
1. Multiple indicators may lead to delayed signals in fast-moving markets
2. Weekly timeframe operations may face larger drawdowns
3. Swing low identification may become unstable in volatile conditions
4. Requires substantial historical data for reliable operation
5. May generate frequent false signals in ranging markets

#### Strategy Optimization Directions
1. Consider implementing adaptive indicator parameters based on market volatility
2. Add volume indicator verification to improve signal reliability
3. Develop more sophisticated Swing Low identification algorithms
4. Incorporate market environment classification with different parameters for different market states
5. Optimize stop-loss logic by introducing trailing stops

#### Summary
This strategy builds a robust trend-following system through the synergy of multiple technical indicators. The dynamic stop-loss mechanism provides effective risk control, suitable for tracking medium to long-term trends. While the strategy's main strengths lie in high signal reliability and comprehensive risk management, it faces challenges such as signal lag. Further optimization in parameter adaptivity and market environment recognition could potentially enhance its performance.
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-20 00:00:00
end: 2024-03-12 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("Invest SMA|MACD|ADX Long Weekly Strategy (BtTL)", overlay=true)

// SMA Inputs
smaLength = input.int(30, title="SMA Länge")
// MACD Inputs
macdFastLength = input.int(9, title="MACD schnelle Periode")
macdSlowLength = input.int(18, title="MACD langsame Perside")
macdSignalLength = input.int(9, title="MACD Signal Smoothing")
//ADX Inputs
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Länge")

// SMA-Berechnung
smaValue = ta.sma(close, smaLength)
isAboveSMA = close > smaValue
isBelowSMA = close < smaValue

// MACD-Berechnung
[macdLine, signalLine, _] = ta.macd(close, macdFastLength, macdSlowLength, macdSignalLength)
isMACDBuy = macdLine > signalLine and macdLine > 0

// Swing-Low Berechnung (5-Kerzen)
isSwingLow = low[2] > low[1] and low[3] > low[1] and low[1] < low and low[1] < low[4]
var float lastSwingLow = na
var float secondLastSwingLow = na

// Wenn ein neuer Swing-Low gefunden wird
if (isSwingLow[1])
    secondLastSwingLow := lastSwingLow
    lastSwingLow := low[1]

//ADX ermitteln
[pDI,mDI,ADX] = ta.dmi(dilen, adxlen)
IsInTrend = ADX > 25

// Einstiegskondition mit MACD und SMA
longCondition = isAboveSMA and isMACDBuy and IsInTrend
if (longCondition)
    strategy.entry("Long", strategy.long)

// Ausstiegskondition am vorletzten Swing-Low
if (isBelowSMA and na(secondLastSwingLow) == false)
    strategy.exit("Exit", from_entry="Long", stop=secondLastSwingLow)

// Reset bei Position schließen
if(strategy.position_size <= 0)
    secondLastSwingLow := na
    lastSwingLow := na

// Plots
plot(smaValue, title="SMA 30", color=#063eda, linewidth=2)
plot(na(lastSwingLow) ? na : lastSwingLow, title="Last Swing Low", color=#ffb13b, linewidth=1, style=plot.style_circles)
plot(na(secondLastSwingLow) ? na : secondLastSwingLow, title="Second Last Swing Low", color=color.red, linewidth=1, style=plot.style_circles)
```

> Detail

https://www.fmz.com/strategy/482793

> Last Modified

2025-02-20 11:19:58
