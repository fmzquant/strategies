
> Name

基于随机运气的简单交易策略Simple-Trading-Strategy-Based-on-Random-Luck

> Author

ChaoZhang

> Strategy Description


[trans]  
本策略名称为“基于随机运气的简单交易策略”。该策略使用随机方法在每周首日产生做多或做空信号,通过大量重复测试评估随机交易的效果。

具体来说,策略的交易逻辑非常简单直白:

1. 每周一投掷一枚硬币,随机生成头或尾的结果。

2. 如果是头,则在当日做多;如果是尾,则在当日做空。

3. 做多时,设置止损为1倍ATR,止盈为1倍ATR;做空同理,实现1:1的风险回报比。

4. 持仓至本周末平仓。

该策略的优势在于回测大量年份的数据,可评估随机交易的平均胜率。交易规则极简单,可作为策略比较的基准线。

但随机交易无法利用市场规律,难以持续获得正收益。止盈止损固定也易造成亏损扩大。交易者仅可将其作为实验性策略,不能用于实盘。

总体来说,数据回测可以提示随机交易的效果,但不代表可实际运用的策略。交易者最终还是需要判断力与系统的交易技巧。



||



This strategy is named "Simple Trading Strategy Based on Random Luck". It uses random methods to generate long or short signals on the first trading day of each week, evaluating the performance of random trading through large amount of repetitive testing.

Specifically, the trading logic is very straightforward:

1. Flip a coin on every Monday, randomly generating heads or tails results. 

2. If heads, go long that day. If tails, go short that day.

3. Set stop loss at 1 x ATR and take profit at 1 x ATR when long, vice versa when short, achieving 1:1 risk-reward ratio.

4. Hold position until end of the week then close.

The advantage is backtesting many years of data to evaluate average win rate of random trading. The trading rules are extremely simple and can serve as a benchmark baseline for comparison.

But random trading cannot utilize market patterns and will unlikely generate sustained gains. Fixed stop loss and take profit also risk enlarging losses. Traders can only use it as an experimental strategy, not for live trading.

In conclusion, backtest results may suggest outcomes of random trading, but do not represent actually applicable strategies. Traders ultimately still need discretion and systematic trading techniques.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|ATR Period|
|v_input_2|2022|Year to Test|
|v_input_3|true|Day of Week|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-01-12 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("CoinFlip", overlay = true)

int result = int(math.random()+0.5)
atr_period = input(defval = 20, title = "ATR Period")
year_to_test = input(defval = 2022, title = "Year to Test")
day_of_week = input(defval = 1, title = "Day of Week")

atr = ta.atr(atr_period)

shouldSell = result == 0 and dayofweek == day_of_week
shouldBuy = result == 1 and dayofweek == day_of_week 

plotshape(result == 0 and dayofmonth == day_of_week, title="sell", location=location.abovebar, color=color.red, transp=0, style=shape.arrowdown)
plotshape(result == 1 and dayofmonth == day_of_week, title="buy", location=location.belowbar, color=color.lime, transp=0, style=shape.arrowup)


strategy.entry("short entry", strategy.short, 1000 / (1*atr), when=shouldSell and year == year_to_test)
strategy.entry("long entry", strategy.long,  1000  / (1*atr), when=shouldBuy and year == year_to_test)

strategy.exit("exit", "long entry", limit = close + 1*atr, stop = close - 1*atr, when = shouldBuy)
strategy.exit("exit", "short entry", limit = close - 1*atr, stop = close + 1*atr, when = shouldSell)


```

> Detail

https://www.fmz.com/strategy/426621

> Last Modified

2023-09-13 17:48:13
