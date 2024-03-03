
> Name

关键反转信号回测策略Key-Reversal-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f8b1eb494fd58b991f.png)
[trans]
#### 概述

关键反转信号回测策略通过识别股票价格的关键反转信号,判断当前趋势是否反转,以捕捉趋势反转后的价格运行方向。该策略基于“关键反转日”的理论,在发现关键反转信号时做多做空,通过配置止盈止损来锁定利润。

#### 策略原理

关键反转信号回测策略的核心逻辑是识别关键反转日。根据股票的价格走势,我们可以判断目前的趋势方向。当出现关键反转信号时,说明趋势可能发生反转。

具体来说,对于股票上涨趋势,如果当天的最低价创新低,但收盘价接近前一日的最低价,那么这一天就是关键反转日。这意味着多头力量正在减弱,承压能力下降,说明上涨趋势可能反转为下跌。策略会在关键反转日开仓做空。

相反,对于股票下跌趋势,如果当天创新低,但收盘价接近前一日的最高价。那么这也是一个关键反转日,说明空头力量减弱,下跌趋势可能反转为上涨。策略会在关键反转日开仓做多。

通过判断关键反转日并追踪后续行情,策略能捕捉到价格反转后的运行。

#### 优势分析

关键反转信号回测策略的主要优势有:

1. 捕捉趋势反转,盈利空间大。关键反转信号往往预示着趋势变化方向,通过判断反转信号并跟踪后续运行,能够获得比较大的盈利空间。

2. 规则清晰,容易回测验证。关键反转日的判断规则非常清晰,价格创新高或新低的同时,与前一日收盘价构成反转形态。这使得策略容易回测,也能减少误判。

3. 灵活调整,易于优化。止盈止损点位的设置非常灵活,可以按照市场情况和个人风险偏好进行调整,对策略进行优化,降低亏损风险。

#### 风险分析

关键反转信号回测策略也存在一些风险:

1. 反转信号误判风险。股票价格常有短期调整,并不是所有的关键反转信号都预示着趋势反转,可能带来误判。通过优化参数,调整止盈止损条件可以降低误判概率。

2. 反转不成或反转后继续反转的风险。即使判断准确,价格反转后也可能再次调头反转或者原趋势继续运行。这时就面临亏损风险。通过及时止损来控制亏损。

3. 回测偏差。任何规则和信号在实盘中表现都可能与回测结果存在偏差,无法完全重现回测获利情况。

#### 优化方向

关键反转信号回测策略主要可优化的方向:

1. 优化止盈止损的设置。可以基于更多的历史数据来计算合适的止盈止损点位。

2. 增加过滤条件,结合其他技术指标过滤误判。例如可以结合成交量来确认反转信号,避免被套利操作误导。

3. 优化反转后的跟踪策略。反转后价格运行也有一定规律可循,设定后续跟踪策略,进一步扩大收益。

4. 结合机器学习模型判断信号质量。训练模型评估每一个关键反转信号的可靠性,避免追踪质量较差的信号。

#### 总结

关键反转信号策略通过判断关键反转日,捕捉价格趋势反转机会。策略规则简单清晰,容易实现。反转后趋势持续运行空间大,但是也存在一定的误判风险。通过不断优化参数和过滤条件,降低误判概率,能够获得较为可靠的效果。

||

#### Overview
The key reversal backtest strategy identifies key reversal signals in stock prices to determine if the current trend is reversing, in order to capture the price movement direction after the trend reversal. The strategy is based on the theory of "key reversal day". It goes long or short when detecting key reversal signals, and locks in profits by configuring take profit and stop loss.

#### Strategy Principle 
The core logic of the key reversal backtest strategy is to identify the key reversal day. According to the price movement of the stock, we can judge the current trend direction. The emergence of a key reversal signal indicates that the trend may reverse.

Specifically, for an uptrend, if the lowest price of the day breaks the new low over a period of time, but the close price is near the previous day's low, then this day is a key reversal day. This means that the bullish power is weakening and the bearish pressure is increasing, indicating the uptrend may reverse into a downtrend. The strategy will open short position on the key reversal day.

On the contrary, for a downtrend, if the lowest price of the day breaks the new low, but the close price is near the previous day's high. This is also a key reversal day, indicating that bearish power is diminishing and the downtrend may reverse into an uptrend. The strategy will open long position on the key reversal day. 

By identifying the key reversal day and tracking the subsequent price movement, the strategy is able to capture the run after the price reversal.

#### Advantage Analysis
The main advantages of the key reversal backtest strategy are:

1. Capture trend reversal with large profit space. Key reversal signals often imply a change in trend direction. By judging reversal signals and tracking subsequent runs, relatively large profits can be obtained.

2. Clear rules easy to backtest. The criteria for determining key reversal days are very clear, with the new high/low price reversing the closing price of the previous day. This makes the strategy easy to backtest and helps avoid misjudgments. 

3. Flexible adjustment for optimization. Take profit and stop loss levels are very flexible and can be adjusted according to market conditions and personal risk preferences for strategy optimization to reduce risk of loss.

#### Risk Analysis
The key reversal backtest strategy also has some risks:

1. Risk of misjudging reversal signals. Stock prices often have short-term adjustments. Not all key reversal signals imply a trend reversal, which may lead to misjudgments. The probability of misjudgment can be reduced by optimizing parameters and adjusting profit taking and stop loss conditions.

2. Risk of failure to reverse or reverse again after reversal. Even with an accurate judgment, prices after reversal may turn around again or the original trend may continue. This faces the risk of losses. Manage losses in a timely manner by stop loss.

3. Backtest bias. The performance of any rules and signals in live trading may deviate from backtest results and fail to reproduce backtest profits.

#### Optimization Directions
The main optimization directions for the key reversal backtest strategy:

1. Optimize take profit and stop loss settings. Calculate appropriate levels based on more historical data.

2. Add filter conditions combined with other technical indicators to avoid misjudgments. For example, confirm reversal signals with trading volume to avoid misleading by arbitrage operations.

3. Optimize tracking strategy after reversal. Price movements after reversal also have certain rules to follow. Set up subsequent tracking strategies to further increase returns.

4. Use machine learning models to judge signal quality. Train models to evaluate the reliability of each key reversal signal and avoid tracking poor quality signals.

#### Summary
The key reversal signal strategy captures price trend reversal opportunities by identifying key reversal days. The strategy rules are simple and clear, and easy to implement. The trend after reversal has large space to run, but there are also certain risks of misjudgment. By continuously optimizing parameters and filter criteria to reduce misjudgment, relatively reliable results can be obtained.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Enter the number of bars over which to look for a new low in prices.|
|v_input_2|20|Take Profit pip|
|v_input_3|10|Stop Loss pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-18 00:00:00
end: 2024-01-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/01/2020
//
// A key reversal is a one-day trading pattern that may signal the reversal of a trend. 
// Other frequently-used names for key reversal include "one-day reversal" and "reversal day."
// How Does a Key Reversal Work?
// Depending on which way the stock is trending, a key reversal day occurs when:
// In an uptrend -- prices hit a new high and then close near the previous day's lows.
// In a downtrend -- prices hit a new low, but close near the previous day's highs
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Key Reversal Up Backtest", shorttitle="KRU Backtest", overlay = true) 
nLength = input(1, minval=1, title="Enter the number of bars over which to look for a new low in prices.")
input_takeprofit = input(20, title="Take Profit pip", step=0.01)
input_stoploss = input(10, title="Stop Loss pip", step=0.01)
xLL = lowest(low[1], nLength)
C1 = iff(low < xLL and close > close[1], true, false)
plotshape(C1, style=shape.triangleup, size = size.small, color=color.green, location = location.belowbar )
posprice = 0.0
pos = 0
barcolor(nz(pos[1], 0) == -1 ? color.red: nz(pos[1], 0) == 1 ? color.green : color.blue ) 
posprice := iff(C1== true, close, nz(posprice[1], 0)) 
pos := iff(posprice > 0, 1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == 1)
    strategy.entry("Long", strategy.long)
posprice := iff(low <= posprice - input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
```

> Detail

https://www.fmz.com/strategy/440103

> Last Modified

2024-01-26 16:11:28
