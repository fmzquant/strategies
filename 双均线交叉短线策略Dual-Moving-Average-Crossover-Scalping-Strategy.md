
> Name

双均线交叉短线策略Dual-Moving-Average-Crossover-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d191446175cf1e7518.png)

[trans]

### 概述

双均线交叉短线策略是一种简单高效的短线交易策略。该策略利用价格与移动平均线的交叉信号作为买入卖出信号,在短线内捕捉价格的趋势性波动。

### 策略原理

双均线交叉策略使用两个不同周期的移动平均线,一条较短期的MA线和一条较长期的MA线。当短期MA线从下方向上突破长期MA线时生成买入信号;当短期MA线从上方向下跌破长期MA线时生成卖出信号。

该策略先定义变量length指定长周期MA的长度为50,然后定义price为收盘价,计算长度为length的MA线值,并保存到ma变量中。再定义bcond判断price是否高于ma值,如果是则bcount加1,否则归零。如果bcond连续触发confirmBars次数(默认为2),则生成买入信号。相反,当price低于ma时,按同样逻辑生成卖出信号。

为过滤掉部分无效信号,策略增加了三个过滤条件clc,clc0和clc1。这三个条件判断当前周期与前一周期的收盘价大小关系,以及当前周期收盘价与开盘价的大小关系,如果同时满足则允许生成信号。

最后,当价格重新跌破上轨或重新突破下轨时,分别平掉相应的多仓或空仓头寸。

### 策略优势

- 策略思路简单,容易理解实现。
- 利用均线系统的趋势跟踪特性,能够有效捕捉价格中短期趋势。
- 增加过滤条件,可以减少无效信号的干扰。
- 采用固定止损退出机制,可以很好控制单笔损失。

### 策略风险

- 双均线交叉策略容易在震荡市中产生虚假信号,从而过度交易带来额外的交易费用和滑点损失。
- 固定周期的参数设置如均线长度,可能无法适应市场各个阶段的特点,产生优化空间。
- 固定止损无法根据市场波动调整止损点,在大于止损点的单边大行情中可能过早止损。

为降低风险,可以考虑根据市场波动率动态调整均线参数;也可以采用游离止损或百分比止损,使止损点能够灵活调整。

### 策略优化

该策略可以从以下几个方面进行优化:

1. 优化均线系统参数,比如根据市场波动率等指标动态调整均线长度。

2. 增加附加过滤条件,如成交量突增等,以提高信号质量。

3. 优化止损策略,采用浮动止损或百分比止损等方式,减少止损过早的概率。 

4. 结合其他指标,如MACD、RSI等,进行多因子验证,提高信号有效性。

5. 增加自动风险管理策略,例如动态调整仓位规模,控制单笔损失。

6. 针对买入卖出信号加入机器学习方法,建立更准确的信号判断模型。

### 总结

双均线交叉短线策略整体是一个非常实用的短线交易策略,具有操作简单,容易实现等优点。但需注意控制震荡市的假信号,并进行动态参数优化等改进,才能发挥该策略最大效用。结合止损管理和风险控制手段,可以进一步提高策略的稳定性。

|| 


### Overview

The Dual Moving Average Crossover is a simple and effective scalping strategy that uses crossover signals between price and moving averages as entry and exit signals to capture short-term trend movements.

### Strategy Logic

The strategy employs two moving averages of different periods - a shorter-term MA line and a longer-term MA line. It generates buy signals when the shorter period MA crosses above the longer period MA from below. Sell signals are generated when the shorter MA crosses below the longer MA from above.

The strategy first defines the variable 'length' to specify the period of the longer MA line as 50. It then defines 'price' as the closing price and calculates the MA value of length 50 and stores it in the 'ma' variable. It further defines 'bcond' to check if price is above ma value. If yes, 'bcount' is incremented by 1, otherwise reset to 0. When 'bcond' triggers 'confirmBars' times consecutively (default 2), a buy signal is generated. Sell signals are generated similarly when price falls below ma.

To filter out some invalid signals, additional filters like 'clc', 'clc0' and 'clc1' are added which check the price relationship between the current and previous bars. Trade signals are generated only when these conditions are met. 

Finally, existing positions are closed out when price crosses the MA lines in reverse.

### Advantages

- Simple logic, easy to understand and implement.
- Captures short-term trends effectively using MA system. 
- Added filters reduce interference from invalid signals.
- Fixed stop loss mechanism controls loss on single trade.

### Risks

- Prone to whipsaws in ranging markets, leading to extra costs.
- Fixed parameters like MA periods may not suit all market conditions.
- Fixed stop loss may exit early in strong trending moves beyond stop level.

The risks can be mitigated by using dynamic MA periods based on volatility, trailing stops or percentage stops, etc.

### Enhancements

The strategy can be improved in several ways:

1. Optimize MA parameters dynamically based on volatility. 

2. Add extra filters like volume spike to improve signal quality.

3. Use floating or percentage stops to reduce premature stop outs.

4. Combine with other indicators like MACD, RSI for multicondition validation. 

5. Add automated risk management like dynamic position sizing to control loss per trade.

6. Use machine learning for more accurate signal generation model.

### Conclusion

The dual MA crossover strategy is an effective system for short-term trading. Fine tuning parameters, managing risks and combining with other tools can further enhance its profitability. Overall it is simple to understand and implement for scalping smaller intraday moves.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|length|
|v_input_2|2|confirmBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("MovingAvg Cross", overlay=true)
length = input(50)
confirmBars = input(2)
price = close

ma = sma(price, length)

bcond = price > ma

bcount = 0
bcount := bcond ? nz(bcount[1]) + 1 : 0

clc=close[0]>close[1]
clc0=close[0]>open[0]
clc1=close[1]>open[1]

if clc and clc0 and clc1 and (bcount == confirmBars)
    strategy.entry("buy", strategy.long)


scond = price < ma
scount = 0
scount := scond ? nz(scount[1]) + 1 : 0

csc=close[0]<close[1]
csc0=close[0]<open[0]
csc1=close[1]<open[1]

if csc and csc0 and csc1 and (scount == confirmBars)
    strategy.entry("sell", strategy.short)

strategy.close("buy", when=scond)
strategy.close("sell",when=bcond)
    
plot(ma, color=color.red)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

```

> Detail

https://www.fmz.com/strategy/430549

> Last Modified

2023-10-30 11:19:48
