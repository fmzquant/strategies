
> Name

Double-Smoothed-Moving-Average-Trend-Following-Strategy-Based-on-Modified-Heikin-Ashi

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19feea8a444a60a8389.png)

[trans]
#### 概述
本策略是一个基于改良型平安江氏K线(Heikin-Ashi)的趋势跟踪系统。通过对传统平安江氏K线进行双重指数移动平均(EMA)平滑处理,有效降低市场噪音,提供更清晰的趋势信号。策略采用仅做多方式运作,在上升趋势中持有头寸,下跌趋势中平仓观望,通过高效的趋势捕捉来获取市场收益。

#### 策略原理
策略的核心逻辑包含以下几个关键步骤:
1. 对OHLC价格数据进行首次EMA平滑处理
2. 利用平滑后的价格计算改良型平安江氏K线
3. 对计算所得的平安江氏K线进行二次EMA平滑
4. 通过平滑后的开盘价与收盘价比较判断K线颜色变化
5. 在K线由红转绿时产生买入信号,由绿转红时产生卖出信号
6. 采用账户总值100%仓位进行交易

#### 策略优势
1. 双重平滑处理显著降低假信号
2. 仅做多策略降低了做空风险
3. 趋势确认后才进场,提高胜率
4. 完整的信号系统支持自动化交易
5. 灵活的时间周期选择满足不同交易需求
6. 简单明确的进出场规则便于执行
7. 支持不同市场条件下的资金管理

#### 策略风险
1. 趋势反转初期可能形成较大回撤
2. 震荡市场中可能产生连续虚假信号
3. 全仓位交易方式增加资金风险
4. 入场信号滞后可能错过部分涨幅
5. 不同时间周期表现差异较大

#### 策略优化方向
1. 引入趋势强度过滤器,降低震荡市假信号
2. 增加动态持仓量管理,优化资金利用
3. 添加移动止损功能,控制回撤风险
4. 结合其他技术指标确认信号有效性
5. 开发自适应参数体系提高策略稳定性

#### 总结
该策略通过双重平滑处理和改良型平安江氏K线为核心,构建了一个稳健的趋势跟踪系统。策略设计简洁明了,易于理解和执行,同时提供了多个优化方向以适应不同市场环境。虽然存在一定的滞后性和回撤风险,但通过合理的资金管理和风险控制措施,该策略能够为投资者提供一个可靠的趋势跟踪工具。 || 

#### Overview
This strategy is a trend following system based on modified Heikin-Ashi candlesticks. By applying double Exponential Moving Average (EMA) smoothing to traditional Heikin-Ashi candlesticks, it effectively reduces market noise and provides clearer trend signals. The strategy operates in a long-only mode, holding positions during uptrends and staying out of the market during downtrends, capturing market returns through efficient trend detection.

#### Strategy Principles
The core logic includes the following key steps:
1. Initial EMA smoothing of OHLC price data
2. Calculation of modified Heikin-Ashi candlesticks using smoothed prices
3. Secondary EMA smoothing of the calculated Heikin-Ashi candlesticks
4. Color change determination through comparison of smoothed open and close prices
5. Generation of buy signals when candles change from red to green, and sell signals when changing from green to red
6. Trading with 100% of account equity position sizing

#### Strategy Advantages
1. Double smoothing significantly reduces false signals
2. Long-only approach eliminates short-selling risks
3. Entry after trend confirmation improves win rate
4. Complete signal system supports automated trading
5. Flexible timeframe selection meets different trading needs
6. Simple and clear entry/exit rules facilitate execution
7. Supports money management under different market conditions

#### Strategy Risks
1. Potential large drawdowns during trend reversals
2. Multiple false signals possible in ranging markets
3. Full position trading increases capital risk
4. Delayed entry signals may miss initial price movements
5. Performance varies significantly across different timeframes

#### Strategy Optimization Directions
1. Introduce trend strength filters to reduce false signals in ranging markets
2. Implement dynamic position sizing to optimize capital utilization
3. Add trailing stop loss functionality to control drawdown risk
4. Incorporate additional technical indicators for signal confirmation
5. Develop adaptive parameter system to improve strategy stability

#### Summary
The strategy builds a robust trend following system using double smoothing and modified Heikin-Ashi candlesticks as its core components. The strategy design is clean and straightforward, easy to understand and execute, while providing multiple optimization directions to adapt to different market environments. Although it has certain lag and drawdown risks, through proper money management and risk control measures, this strategy can provide investors with a reliable trend following tool.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Smoothed Heiken Ashi Strategy Long Only", overlay=true, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input.int(10, title="EMA Length")
len2 = input.int(10, title="Smoothing Length")
start_date = input(defval=timestamp("2020-01-01"), title="Backtest Start Date")

o = ta.ema(open, len)
c = ta.ema(close, len)
h = ta.ema(high, len)
l = ta.ema(low, len)

haclose = (o + h + l + c) / 4
var float haopen = na
haopen := na(haopen[1]) ? (o + c) / 2 : (haopen[1] + haclose[1]) / 2
hahigh = math.max(h, math.max(haopen, haclose))
halow = math.min(l, math.min(haopen, haclose))

o2 = ta.ema(haopen, len2)
c2 = ta.ema(haclose, len2)
h2 = ta.ema(hahigh, len2)
l2 = ta.ema(halow, len2)

col = o2 > c2 ? color.red : color.lime

// Plot candles without visible wicks
plotcandle(o2, o2, c2, c2, title="Heikin Smoothed", color=col, wickcolor=color.new(col, 100))

// Delayed Buy and Sell signals
colorChange = col != col[1]
buySignal = colorChange[1] and col[1] == color.lime
sellSignal = colorChange[1] and col[1] == color.red

plotshape(buySignal, title="Buy Signal", location=location.belowbar, color=color.lime, style=shape.triangleup, size=size.small)
plotshape(sellSignal, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Strategy entry and exit
if (true)
    if (buySignal)
        strategy.entry("Long", strategy.long)
    if (sellSignal)
        strategy.close("Long")

// Add a vertical line at the start date
// if (time == start_date)
//     line.new(x1=bar_index, y1=low, x2=bar_index, y2=high, color=color.blue, width=2)

// Alert conditions
alertcondition(colorChange[1], title="Color Change Alert", message="Heiken Ashi Candle Color Changed")
alertcondition(buySignal, title="Buy Signal Alert", message="Buy Signal: Color changed from Red to Green")
alertcondition(sellSignal, title="Sell Signal Alert", message="Sell Signal: Color changed from Green to Red")
```

> Detail

https://www.fmz.com/strategy/473354

> Last Modified

2024-11-29 15:03:37
