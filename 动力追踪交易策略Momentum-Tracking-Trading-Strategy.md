
> Name

动力追踪交易策略Momentum-Tracking-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/171b9bff48b2b400e90.png)


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
