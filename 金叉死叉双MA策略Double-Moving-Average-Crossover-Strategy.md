
> Name

金叉死叉双MA策略Double-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6930d91716e4ea0611.png)
[trans]

## 概述

该策略是一个基于双移动平均线的交易策略。它会根据用户设定的长短两根移动平均线进行金叉和死叉操作,即快速移动平均线上穿或下穿慢速移动平均线时发出交易信号。当快速MA上穿慢速MA时,做多;当快速MA下穿慢速MA时,做空。

## 策略原理

该策略的核心逻辑基于双移动平均线的交叉原理。何为移动平均线,是将一定时间周期内的收盘价做算术平均而得到的平均价。移动平均线能够有效地滤除随机性噪音,反映更清晰的价格趋势。

该策略中短期MA代表价格的短期趋势,长期MA代表价格的长期趋势。短期MA比长期MA对价格变化更加敏感,能更快捕捉到价格反转。当短期MA上穿长期MA时,代表短期趋势转为上涨,做多;当短期MA下穿长期MA时,代表短期趋势转为空头,做空。

具体来说,策略通过ta.sma计算指定周期的简单移动平均线,以此作为交易信号。用户可自定义两个MA参数,即长线周期long_period和短线周期short_period。策略使用ta.crossover和ta.crossunder来判断MA的黄金交叉和死叉。当短MA上穿长MA,即金叉出现时,做多;当短MA下穿长MA,即死叉出现时,做空。

## 策略优势

该策略具有以下几点优势:

1. 操作简单,容易掌握。
2. 可自定义参数,适应多种市场环境。
3. 采用双MA交叉原理,有效过滤噪音,捕捉趋势反转。
4. 敏感度高,能及时捕捉价格转折点。

## 策略风险

该策略也存在一些风险:

1. 双MA间距过小易产生错误信号。
2. 截断MA周期不当,错过主要趋势。
3. 反转不一定代表趋势转折,可能出现虚假信号。
4. 需要适当调整参数以避免过优化。

针对上述风险,可通过调整MA参数、设置止损止盈、或结合其他指标进行优化。

## 优化空间

该策略可从以下几个方面进行优化:

1. 优化MA周期参数,采用自适应MA周期。
2. 增加成交量过滤,避免虚假突破。 
3. 结合其它技术指标,如MACD、KDJ等进行组合。
4. 添加止损止盈逻辑,控制单笔损失。
5. 代码结构优化,增加模块化后期扩展空间。

## 总结

该策略整体来说非常适合作为量化交易的入门策略。它只需要简单的双MA参数即可运行,操作简单,容易理解,能直观反映市场反转时机。同时策略留有较大的优化空间,可根据实际需要调整参数或添增其他逻辑来进行改进。

||

## Overview

This is a trading strategy based on double moving averages crossover. It generates buy and sell signals when two moving averages of different lengths cross over. Specifically, it goes long when the faster MA crosses above the slower MA, and goes short when the faster MA crosses below the slower MA.  

## Strategy Logic

The core logic of this strategy lies in the crossover principles between two moving averages. A moving average is the arithmetic average price over a specified time period. It helps filter out market noise and reveal clearer price trends.

In this strategy, the shorter-term MA captures short-term trends while the longer-term MA captures long-term trends. As the short-term MA is more sensitive in responding to the latest price changes, crossing over the long-term MA signals a trend reversal ahead. 

Specifically, the strategy calculates the MAs using ta.sma over the long_period and short_period defined by users. It then uses ta.crossover and ta.crossunder to detect the golden crossover and death crossover between the two MAs. When the short MA crosses above the long MA, go long. When the short MA crosses below, go short.

## Advantages  

The main advantages of this strategy include:

1. Simple logic, easy to follow.  
2. Customizable parameters adaptable to various markets.
3. MA crossover filters out noise, capturing trend reversal.  
4. High sensitivity in capturing price inflection points.

## Risks

There are also several risks:   

1. Too small gap between MAs causes false signals.
2. Wrong MA periods miss major trends. 
3. Reversals do not always imply trend changes.
4. Parameters need adjustment to avoid overfitting.  

To mitigate the risks, parameters can be tuned, stop loss and take profit can be incorporated, or other technical indicators can be added.

## Optimization

There is room for further optimization:

1. Optimize adaptive MA periods.  
2. Add volume filter to avoid false breakout.
3. Incorporate other indicators like MACD, KDJ. 
4. Add stop loss/take profit to limit loss.
5. Improve code structure for better scalability.

## Conclusion

In conclusion, this is an ideal starter strategy for algorithmic trading, thanks to its simplicity in logic and parameters while still able to effectively capture market reversals. At the same time, it has great potential for optimizations to fit various trading needs.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Long Period|
|v_input_2|5|Short Period|
|v_input_string_1|0|MA type: SMA|EMA|
|v_input_3|true|Stop Loss (%)|
|v_input_4|2|Take Profit (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Cross 2 Moving Average Strategy", shorttitle="2MA Cross", overlay=true)

// User-defined input for moving averages
long_period = input(20, title="Long Period")
short_period = input(5, title="Short Period")
type_ma = input.string("SMA", title = "MA type", options = ["SMA", "EMA"])

// Calculating moving averages
long_ma = ta.sma(close, long_period)
short_ma = ta.sma(close, short_period)

// Plot moving averages
plot(long_ma, title="Long Moving Average", color=color.red)
plot(short_ma, title="Short Moving Average", color=color.green)

// Strategy logic for crossing of moving averages
longCondition = ta.crossover(short_ma, long_ma)
shortCondition = ta.crossunder(short_ma, long_ma)

// Entry orders
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Optional: Add stop loss and take profit
stop_loss_perc = input(1, title="Stop Loss (%)") / 100
take_profit_perc = input(2, title="Take Profit (%)") / 100

strategy.exit("Exit Long", from_entry="Long", stop=close*(1-stop_loss_perc), limit=close*(1+take_profit_perc))
strategy.exit("Exit Short", from_entry="Short", stop=close*(1+stop_loss_perc), limit=close*(1-take_profit_perc))

```

> Detail

https://www.fmz.com/strategy/440517

> Last Modified

2024-01-31 11:29:45
