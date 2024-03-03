
> Name

黄金交叉与死叉双均线交叉交易策略Double-Hull-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


本策略主要利用两条不同时间段的Hull移动平均线的交叉来判断行情趋势,并进行长短做空操作。

### 策略原理

该策略使用两条Hull移动平均线,分别是60周期和175周期的。其中:

1. hullma是60周期的Hull移动平均线,通过wma函数计算。

2. ahullma是175周期的Hull移动平均线,通过wma函数计算。

3. 当hullma从下往上突破ahullma时,产生黄金交叉,做多信号。

4. 当hullma从上往下跌破ahullma时,产生死叉,做空信号。

5. longCondition和shortCondition分别判断做多和做空条件。

6. 通过strategy.entry函数进行做多做空操作。

该策略运用交叉原理,判断短期均线和长期均线的交叉来捕捉行情短期和长期趋势的变化,以获利。

### 优势分析

1. 使用Hull移动平均线,能更快捕捉价格变化。

2. 双均线交叉原理简单易懂,容易操作。

3. 60周期和175周期组合,能捕捉中短期趋势。

4. 可自定义周期参数,适应不同市场和品种。

5. 可灵活运用在日内和持仓交易。

### 风险分析

1. 双均线交叉具有一定滞后性,入场时机不准。

2. 短周期均线头假信号可能较多。

3. 震荡行情中可能出现频繁交叉导致亏损。

4. 周期设置不当,无法捕捉趋势变化。

5. 需适当优化周期参数,不同品种需要调整。

可通过结合其他指标过滤信号,优化周期参数,适当放宽止损来缓解风险。

### 优化方向 

1. 测试不同均线组合,寻找最佳周期。

2. 加入趋势指数等指标进行过滤。

3. 优化止损策略,降低频繁停损。 

4. 不同品种可调整周期参数。

5. 可加入机器学习等算法,动态优化参数。

### 总结

该策略利用黄金交叉与死叉原理,通过双Hull移动平均线交叉来判断行情趋势,属于典型的短期双均线交易策略。优点是思路简单,易于操作,能捕捉较快速的短期趋势。但也存在较高的假信号风险和滞后问题。可通过参数优化、指标过滤等方法来改进,是一种值得学习研究的短线交易策略。该策略可灵活运用于日内和持仓交易,也可在数字货币和传统品种中广泛使用。总体来说,该策略适合进行短线操作,在合理使用的前提下,可获得不错的投资回报。

|| 

This strategy mainly uses the crossover of two Hull Moving Averages of different timeframes to determine market trends and make long and short trades.

### Strategy Logic

The strategy uses two Hull Moving Averages, one is 60 periods and the other is 175 periods. Where:

1. hullma is the 60-period Hull Moving Average, calculated by the wma function. 

2. ahullma is the 175-period Hull Moving Average, calculated by the wma function.

3. When hullma crosses ahullma upward, a golden cross occurs, giving a long signal.

4. When hullma crosses ahullma downward, a death cross occurs, giving a short signal.

5. longCondition and shortCondition determine the long and short entry conditions respectively. 

6. The strategy.entry function is used to execute long and short trades.

The strategy utilizes the crossover principle to capture trend changes using the crossovers between short-term and long-term moving averages, for profit.

### Advantage Analysis

1. Hull Moving Average responds faster to price changes.

2. Crossover principle is simple and easy to implement. 

3. The 60- and 175-period combination captures medium-term trends.

4. Customizable period parameters for different markets.

5. Applicable for intraday and position trading.

### Risk Analysis

1. Crossovers have some lag in signals.

2. More false signals from short-term MA. 

3. Frequent crossovers may cause losses in range-bound markets. 

4. Wrong period settings cannot capture trend changes.

5. Need parameter optimization for different symbols.

Risks can be mitigated by adding filters, optimizing parameters, allowing wider stops.

### Optimization Directions

1. Test different MA combinations to find optimal periods.

2. Add trend indicators for signal filtering. 

3. Optimize stop loss strategy to reduce frequent stops.

4. Adjust periods for different symbols. 

5. Add machine learning to dynamically optimize parameters.

### Summary

This strategy utilizes golden cross and death cross principles to determine trends using double Hull Moving Average crossovers. It is a typical short-term dual moving average system. The pros are simple logic and easy implementation, catching fast short-term trends. The cons are high false signals and lagging issues. Improvements can be made via parameter optimization, signal filtering etc. It is a worthwhile short-term trading strategy to study. The strategy can be flexibly applied for intraday and position trading across different markets. Overall, it is suitable for short-term trading and can generate good returns if used properly.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|HULL MA 1 LENGTH|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|175|HULL MA 2 LENGTH|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "Hull MA", shorttitle="Junior2", overlay = true)

//HULL MA 1

length = input(60, minval=1,title="HULL MA 1 LENGTH")
src = input(close, title="Source")
hullma = wma(2*wma(src, length/2)-wma(src, length), round(sqrt(length)))

plot(hullma, color=color.green)

//HULLMA 2

alength = input(175, minval=1,title="HULL MA 2 LENGTH")
asrc = input(close, title="Source")
ahullma = wma(2*wma(asrc, alength/2)-wma(asrc, alength), round(sqrt(alength)))

plot(ahullma, color=color.green)

c1up= crossover(hullma,ahullma)
c1down= crossunder(hullma,ahullma)

longCondition = c1up
if longCondition

    strategy.entry("L", strategy.long)


shortCondition = c1down 
if shortCondition

    strategy.entry("S", strategy.short)

plot(close)
```

> Detail

https://www.fmz.com/strategy/428969

> Last Modified

2023-10-11 14:49:54
