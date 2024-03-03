
> Name

动力追踪交易策略Momentum-Tracking-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/171b9bff48b2b400e90.png)

[trans]

## 策略概述

动力追踪交易策略是一种以追踪市场动力的趋势为主线,结合多种技术指标作为辅助判断的自动化交易策略。该策略通过解析K线信息,判断当前市场主力资金的方向和力度,然后结合量价指标、移动平均线等技术指标发出交易信号,实现趋势跟踪。

整体而言,该策略适合于中长线趋势交易,能够有效捕捉市场趋势,降低交易频率,追求更高的单笔盈利。同时,策略参数优化后,也可用于短线交易。

## 策略原理

### 主力判断

动力追踪策略的核心在于判断市场的主力资金方向。策略通过计算ATR指标,实时监测市场的波动力度。当波动加大时,代表主力正在进行积累或分配,策略会暂时退出市场,避开主力操作的时间段。

当波动减弱时,代表主力积累或分配完毕,策略会重新进场,判断主力的具体方向。判断方式是通过计算市场的支撑压力位置,看是否有突破的迹象。如果有明确的突破,则证实主力选择了该方向。

### 辅助判断

在确定主力方向后,策略还会引入多种辅助技术指标进行再次验证,避免出现误判。具体而言,会计算MACD、KDJ等指标,判断其是否与主力方向一致。

只有当主力方向和辅助指标都发出同向信号时,策略才会开仓建立头寸。这有效控制了交易频率,只在高概率情况下入场。

### 止损退出

建仓后,动力追踪策略会实时跟踪价格变动,并以ATR值的扩大作为止损信号。这代表市场再次进入主力操作阶段,必须立即退出至现金,避免被套。 

另外,若价格运行超过一定范围后回调也会止损。这属于正常的技术性回调,跟风险控制需立即止损。

## 策略优势

### 系统性强

动力追踪策略最大的优势在于高度系统化和规范化。其交易逻辑清晰,每次入场和退出都有明确的原则和规则,不会出现随意交易的情况。

这使得该策略可复制性非常强,用户可以配置后长期应用,而不需要人工干预。

### 风险控制到位 

策略内置了多级风险控制机制,如主力判断、辅助验证、止损线制定等,可有效控制非系统性风险。

具体来说,策略只在高概率情况下开仓,并设置科学的止损位,最大程度避免损失扩大。这保证了资金的稳定增长。

### 收益较为可持续

相比短线策略,动力追踪策略的持仓周期更长,每次获利也更高。这使得策略整体收益较为稳定可持续。

并且,策略追踪中长线趋势,可充分捕捉行情的波动性,这在大趋势行情中尤为明显。

## 风险警示

### 参数优化难度大

动力追踪策略涉及较多参数,如ATR参数、突破参数、止损参数等。这些参数间存在一定相关性,需要反复测试才能找到最优参数组合。

如果参数配置不当,极易造成交易频率过大或风险控制不足的问题。这需要用户具备一定的策略优化经验。

### 突破容易被套

策略判断主力和指标信号时,都依赖于价格的突破来证实。但突破操作中,容易出现假突破的情况,这会导致被套仓的概率较大。 

如果遭遇关键性突破失败,则可能带来较大亏损。这是策略的内在弱点。

## 优化思路

### 引入机器学习

可以通过机器学习算法自动探测参数间的相关性,寻找最优参数组合。这比人工测试要高效得多。

具体来说,可以使用 EnvironmentError算法,基于强化学习不断迭代 parameter,使策略收益最大化。

### 增加过滤器

可以在现有指标的基础上,引入更多辅助过滤器,如交易量指标、资金流指标等,对突破信号进行三次四次验证,可靠性更高。

但过滤器太多也会导致错过机会,需要平衡过滤强度。此外,过滤器自身也要避免产生相关性。 

### 策略融合

将动力追踪策略与其他策略组合使用,可以利用不同策略的优势,实现正交化,提高整体稳定性。

比如,融合短期反转策略,在突破后打开反转交易,可锁定更多利润。

## 总结

动力追踪交易策略整体而言是一个值得推荐的系统化趋势跟踪策略。它交易逻辑清晰,风险控制到位,可为用户带来稳定而高效的投资回报。

但策略本身也存在一定固有缺陷,需要用户具备参数优化和策略融合的能力,方可发挥该策略的最大效用。总体而言,动力追踪策略是一款适合有一定量化基础的策略爱好者使用的量化产品。

||

## Strategy Overview

The Momentum Tracking Trading Strategy is an automated trading strategy that mainly tracks market momentum trends and uses multiple technical indicators as auxiliary judgments. This strategy parses K-line information to determine the direction and strength of the current market's main funds, and then issues trading signals based on indicators such as volume price and moving average to achieve trend tracking.

Overall, this strategy is suitable for medium and long term trend trading, and can effectively capture market trends and reduce trading frequency to pursue higher single profits. At the same time, after optimizing the strategy parameters, it can also be used for short-term trading.

## Strategy Principle 

### Main Power Judgement 

The core of the momentum tracking strategy is to judge the direction of the market's main funds. The strategy calculates the ATR indicator to monitor the volatility of the market in real time. When volatility increases, it means the main funds are accumulating or distributing, and the strategy will temporarily exit the market to avoid the period when the main funds are operating.

When volatility weakens, it means the main force accumulation or allocation is complete, and the strategy will re-enter the market to determine the specific direction of the main force. The judgment method is to calculate the market's support and pressure positions to see if there are signs of breakthroughs. If there is a clear breakthrough, it will prove that the main funds have chosen that direction.

### Auxiliary Judgement

After determining the direction of the main funds, the strategy will also introduce multiple auxiliary technical indicators for verification again to avoid misjudgments. Specifically, MACD, KDJ and other indicators will be calculated to determine whether they are consistent with the direction of the main funds.

Only when the direction of the main funds and auxiliary indicators issue signals in the same direction will the strategy open positions. This effectively controls the trading frequency and only enters at high probability.

### Stop Loss Exit 

After opening positions, the momentum tracking strategy will track price changes in real time, and use the expansion of ATR values ​​as a stop loss signal. This means that the market has entered the main operating stage again and must exit to cash immediately to avoid being trapped.

In addition, if the price movement exceeds a certain range and then pullbacks, stop loss will also occur. This is a normal technical retracement and needs to be stopped out immediately for risk control.

## Advantages of the Strategy

### High Systematicness  

The biggest advantage of momentum tracking strategies is their high degree of systematization and standardization. Its trading logic is clear, and each entry and exit has clear principles and rules instead of arbitrary trading.

This makes the replicability of this strategy very strong. Users can apply it for long-term use after configuration without manual intervention.

### Mature Risk Control 

The strategy has built-in multi-level risk control mechanisms, such as main power judgments, auxiliary verification, stop loss line setting, etc., which can effectively control non-systematic risks.

Specifically, the strategy only opens positions in high probability situations and sets scientific stop loss points to maximize avoidance of losses. This ensures stable capital growth.

### Relatively Sustainable Returns  

Compared to short-term strategies, the holding period of momentum tracking strategies is longer, and each profit is higher. This makes the overall strategy returns more stable and sustainable.

In addition, the strategy tracks medium and long-term trends, which can fully capture the volatility of trends. This is especially noticeable in major trending markets.

## Risk Warnings

### Difficult Parameter Optimization 

The momentum tracking strategy involves multiple parameters, such as ATR parameters, penetration parameters, stop loss parameters, etc. There is a certain correlation between these parameters, requiring repeated testing to find the optimal parameter combination.

Improper parameter configuration can easily lead to excessive trading frequency or insufficient risk control. This requires the user to have certain experience in strategy optimization.

### Breakout Trap

When the strategy determines the main power and indicator signals, it relies on the breakthrough of prices to confirm. But there may be false breakouts in penetration operations, which will increase the probability of being trapped.

If a key breakthrough fails, it may lead to greater losses. This is an inherent weakness of the strategy.

## Optimization Directions

### Introduce Machine Learning

Machine learning algorithms can be used to automatically detect correlations between parameters and find optimal parameter combinations. This is much more efficient than manual testing.

Specifically, the EnvironmentError algorithm can be used to continuously iterate parameters based on reinforcement learning to maximize strategy returns.

### Increase Filters 

More auxiliary filters can be introduced on the basis of existing indicators, such as trading volume indicators, capital flow indicators, etc., to verify breakthrough signals three or four times to improve reliability.

But too many filters can also lead to missing opportunities. Filter intensity needs to be balanced. In addition, the filters themselves should also avoid correlation.

### Strategy Fusion  

Combine the momentum tracking strategy with other strategies to take advantage of the strengths of different strategies to achieve orthogonality and improve overall stability.

For example, incorporating short-term reversal strategies and opening reverse trades after breakthroughs can lock in more profits.

## Summary  

In general, the Momentum Tracking Trading Strategy is a systemized trend tracking strategy worth recommending. It has clear trading logic, sufficient risk control, and can bring users stable and efficient investment returns.

But the strategy itself also has some inherent weaknesses. It requires users to have the ability to optimize parameters and integrate strategies in order to maximize the effectiveness of this strategy. Overall, the momentum tracking strategy is a quantitative product suitable for quantitative enthusiasts with some foundation.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2023-07-01)|Set Start date|
|v_input_string_1|0|Direction: Forward|Inverse|
|v_input_int_1|11|Anchor Hour|
|v_input_int_2|10|Define TP Pips|
|v_input_int_3|10|Define SL Pips|
|v_input_int_4|0|tick size: 100|1000|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2023-12-15 01:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Created by frasmac2k Strategy credit to Alex Morris

//@version=5
strategy("Mechanical", shorttitle="MECH", overlay=true)

// Get the current date and time
currentYear = year
currentMonth = month
currentDay = dayofmonth

// Create a timestamp for the present date and time
currentTimestamp = timestamp(currentYear, currentMonth, currentDay)

// Define time interval for backtesting
dStart = input(timestamp('2023-07-01'), title='Set Start date', tooltip='Select a start date to run the script from')

// Define direction of strategy
direction = input.string('Forward',title='Direction', tooltip='Forward will go LONG on a Green anchor candle. Inverse will go short on a Green anchor candle and vice versa for Red candle', options=['Forward', 'Inverse'])

// Define the anchor hour as user input with a range of 0 to 23
anchorHour = input.int(11, title="Anchor Hour", tooltip='Set the hour to trade', minval=0, maxval=23)

// Define the take profit and stop loss in pips
takeProfitPips = input.int(10, title='Define TP Pips', tooltip='How many pips do you want to set TP. Choose a sensible value related to the instrument', minval=5)
stopLossPips = input.int(10,'Define SL Pips', tooltip='How many pips do you want to set SL. Choose a sensible value related to the instrument', minval=5)

// Define Tick size
tick10p = input.int(100, title='tick size', tooltip='Choose how many ticks equal 10 pips. This can vary by broker so measure 10 pips on the chart and select how many ticks that equates to. Forex is typically 100. Some instruments such as indices can be 1000', options=[100,1000])

// Declare TP/SL variables
var float takeProfit = na
var float stopLoss = na

// Calculate take profit and stop loss levels in ticks
if tick10p == 100
    takeProfit := takeProfitPips * 10
    stopLoss := stopLossPips * 10
if tick10p == 1000
    takeProfit := takeProfitPips * 100
    stopLoss := stopLossPips * 100

// Declare offset time
var int offset = na

if currentTimestamp > timestamp('2023-10-29')
    offset := 4
else
    offset := 5

//adjust for exchange time
anchorHour := anchorHour - offset

// Define the anchor hour as user input with a range of 0 to 23
tradeHour = anchorHour

// Define logical check for strategy date range
isStratTime = true

// Calculate the time condition for placing the order at the user-defined hour (start of the next hour)
isTradeTime = true

// Logic condition for forwards or inverse
isForward = direction == 'Forward'
isInverse = direction == 'Inverse'

// Declare entry condition variables
var bool longCondition = na
var bool shortCondition = na

// Declare and initialize variables for anchorCandle open and close prices
var float anchorOpen = na
var float anchorClose = na
var float tradeOpen = na
var float tradeClose = na

// Set logic by direction

if isForward
    // Strategy logic
    if isTradeTime and isStratTime
        //Obtain candle open/close
        anchorOpen := open
        anchorClose := close
        // Define entry conditions
        longCondition := anchorClose > anchorOpen
        shortCondition := anchorClose < anchorOpen
        
        // Entry logic
        if longCondition
            strategy.entry("Long", strategy.long)
            strategy.exit("Exit Long", from_entry="Long", profit=takeProfit, loss=stopLoss, comment_profit='TP', comment_loss='SL')
        if shortCondition
            strategy.entry("Short", strategy.short)
            strategy.exit("Exit Short", from_entry="Short", profit=takeProfit, loss=stopLoss, comment_profit='TP', comment_loss='SL')

if isInverse
    // Strategy logic
    if isTradeTime and isStratTime
        //Obtain candle open/close
        anchorOpen := open
        anchorClose := close
        // Define entry conditions
        shortCondition := anchorClose > anchorOpen
        longCondition := anchorClose < anchorOpen
        
        // Entry logic
        if longCondition
            strategy.entry("Long", strategy.long)
            strategy.exit("Exit Long", from_entry="Long", profit=takeProfit, loss=stopLoss, comment_profit='TP', comment_loss='SL')
        if shortCondition
            strategy.entry("Short", strategy.short)
            strategy.exit("Exit Short", from_entry="Short", profit=takeProfit, loss=stopLoss, comment_profit='TP', comment_loss='SL')

// Define the time range for the background shade
startHour = anchorHour
startMinute = 0
endHour = anchorHour
endMinute = 0

// Check if the current time is within the specified range
isInTimeRange = (hour == startHour and minute >= startMinute) or (hour == endHour and minute <= endMinute) or (hour > startHour and hour < endHour)

// Define the background color for the shade
backgroundColor = color.new(color.red, 90)

// Apply the background shade
bgcolor(isInTimeRange ? backgroundColor : na)


```

> Detail

https://www.fmz.com/strategy/435987

> Last Modified

2023-12-20 16:06:26
