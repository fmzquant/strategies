
> Name

双HULL移动平均策略Double-HULL-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 策略原理：
双HULL移动平均策略是一种基于Alan HULL创建的HULL移动平均线指标的交易策略。该策略使用两条HULL移动平均线，一条长期线和一条短期线，来判断买入和卖出的时机。HULL移动平均线是一种改进的移动平均线，通过对价格进行加权平均来减少滞后性。长期线和短期线的交叉点用于产生买入和卖出信号。

HULL移动平均线的计算公式如下：
```
HmaL = wma(2*wma(close, round(PDL/2)) - wma(close, PDL), round(sqrt(PDL)))
HmaS = wma(2*wma(close, round(PDS/2)) - wma(close, PDS), round(sqrt(PDS)))
```

其中，PDL代表长期周期，PDS代表短期周期。策略通过比较短期线和长期线的数值来判断买入和卖出的条件。

## 优势分析：
1. 减少滞后性：HULL移动平均线相较于传统的移动平均线具有更少的滞后性，能够更快地反应价格趋势的变化，提供更准确的买卖信号。
2. 简单易懂：该策略使用两条移动平均线进行交叉判断，逻辑相对简单，易于理解和实施。
3. 高度可定制化：策略中的周期参数可以根据具体市场和交易品种进行调整，使策略更适应不同的交易环境。

## 风险分析：
1. 市场震荡：在市场震荡阶段，移动平均线可能会频繁交叉，导致频繁的买卖信号，容易产生错误信号，造成交易频繁和损失。
2. 滑点和延迟：策略的执行受到滑点和延迟的影响，特别是在高频交易中，这可能会导致执行价格与预期价格不一致，影响交易结果。
3. 单一指标依赖：该策略仅依赖于HULL移动平均线指标，没有结合其他技术指标或者市场情报，可能无法全面捕捉市场的变化和趋势。

## 总结：
双HULL移动平均策略是一种基于HULL移动平均线的交易策略，通过比较短期线和长期线的交叉点来判断买入和卖出的时机。该策略具有减少滞后性、简单易懂和高度可定制化的优势，但也存在市场震荡、滑点和延迟以及单一指标依赖的风险。在实际应用中，可以根据具体情况对策略进行调整和优化，结合其他技术指标和风险管理方法，以提高交易的成功率和盈利能力。


||


## Strategy Overview:
The Double HULL Moving Average Strategy is a trading strategy based on the HULL Moving Average (HMA) indicator created by Alan HULL. The strategy utilizes two HMA lines, a longer-term line and a shorter-term line, to determine entry and exit points. The HMA is an improved moving average that reduces lag by applying weighted averaging to the price data. The crossover of the shorter-term and longer-term lines is used to generate buy and sell signals.

The calculation formula for the HMA is as follows:
```
HmaL = wma(2 * wma(close, round(PDL/2)) - wma(close, PDL), round(sqrt(PDL)))
HmaS = wma(2 * wma(close, round(PDS/2)) - wma(close, PDS), round(sqrt(PDS)))
```

Here, PDL represents the longer-term period, and PDS represents the shorter-term period. The strategy compares the values of the shorter-term and longer-term lines to determine the conditions for buying and selling.

## Advantages:
1. Reduced lag: The HMA has less lag compared to traditional moving averages, enabling it to respond faster to changes in price trends and provide more accurate signals for buying and selling.
2. Simplicity: The strategy uses two moving average lines for crossover analysis, making it relatively simple to understand and implement.
3. High customization: The strategy's period parameters can be adjusted based on specific markets and trading instruments, making it more adaptable to different market conditions.

## Risks:
1. Market volatility: During periods of market volatility, the moving average lines may cross frequently, resulting in frequent signals that can generate false signals and lead to excessive trading and losses.
2. Slippage and latency: The execution of the strategy is subject to slippage and latency, especially in high-frequency trading, which can cause executed prices to deviate from expected prices and affect trading outcomes.
3. Dependency on a single indicator: The strategy relies solely on the HMA indicator without incorporating other technical indicators or market intelligence, which may limit its ability to capture the full range of market changes and trends.

## Conclusion:
The Double HULL Moving Average Strategy is a trading strategy based on the HULL Moving Average indicator. It utilizes the crossover of shorter-term and longer-term HMA lines to determine entry and exit points. The strategy offers advantages such as reduced lag, simplicity, and high customization. However, it also carries risks related to market volatility, slippage and latency, and reliance on a single indicator. In practical applications, the strategy can be adjusted and optimized based on specific circumstances, incorporating other technical indicators and risk management methods to enhance trading success and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|LongerPeriod|
|v_input_2|8|ShorterPeriod|
|v_input_3|2019|From Year|
|v_input_4|true|From Month|
|v_input_5|true|From Day|
|v_input_6|9999|To Year|
|v_input_7|12|To Month|
|v_input_8|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Credit Indicator from KIVANC
// author and idea: KIVANC @fr3762 on twitter
// creator: Alan HULL
// 
strategy("Double HULL Moving Average Strategy", overlay=true)
PDL=input(title="LongerPeriod", defval=21, minval=1,maxval=500)
PDS=input(title="ShorterPeriod",  defval=8, minval=1,maxval=500)

// === INPUT BACKTEST RANGE ===
FromYear  = input(defval = 2019, title = "From Year", minval = 2009)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 2009)
ToMonth   = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 31, title = "To Day", minval = 1, maxval = 31)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

HmaL=wma(2*wma(close,round(PDL/2))-wma(close,PDL),round(sqrt(PDL)))
HmaS=wma(2*wma(close,round(PDS/2))-wma(close,PDS),round(sqrt(PDS)))
plot(HmaL,color=red, linewidth=2)
plot(HmaS,color=blue, linewidth=2)

Buy = HmaS > HmaL
Sell = HmaS < HmaL

strategy.entry("Buy",true,when=window() and Buy)
strategy.close_all(when=window() and Sell)
```

> Detail

https://www.fmz.com/strategy/426933

> Last Modified

2023-09-15 16:43:45
