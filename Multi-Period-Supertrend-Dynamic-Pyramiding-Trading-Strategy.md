
> Name

Multi-Period-Supertrend-Dynamic-Pyramiding-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/956735a2190eb23a06.png)

#### Overview
This is a pyramiding trading strategy based on multiple Supertrend indicators. It identifies high-probability trading opportunities using three Supertrend indicators with different periods and multipliers. The strategy employs dynamic pyramiding entries allowing up to three positions, combined with dynamic stop-loss and flexible exit conditions to maximize profits while controlling risks.

#### Strategy Principles
The strategy utilizes three Supertrend indicators with different parameter settings: fast, medium, and slow. Entry signals are based on the crossovers and trend directions of these indicators, implementing a three-layer pyramiding approach: first entry when fast indicator points down while medium points up and slow points down; second entry through breakout when both fast and medium indicators point down; third entry through breakout when price makes new highs. Exits are managed through multiple mechanisms including dynamic stop-loss, average price stop, and overall trend reversal.

#### Strategy Advantages
1. Multiple confirmation mechanism improves trading accuracy
2. Pyramiding approach significantly amplifies profits in trending markets
3. Dynamic stop-loss mechanism protects profits while allowing trends to develop
4. Flexible exit mechanisms adapt well to different market conditions
5. Percentage-based position sizing adapts to different capital sizes

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. Pyramiding can lead to larger drawdowns during sudden trend reversals
3. Multiple indicators may result in delayed signals
4. Parameter optimization faces overfitting risks
It's recommended to implement strict money management and backtesting to control these risks.

#### Optimization Directions
1. Add market environment filters to dynamically adjust parameters based on volatility
2. Optimize entry spacing and position size allocation
3. Introduce additional technical indicators to filter false signals
4. Develop adaptive parameter mechanisms to adapt to market changes
5. Enhance exit mechanisms by adding profit targets and time-based stops

#### Summary
The strategy captures trending opportunities through multiple Supertrend indicators and pyramiding entries, while controlling risks with dynamic stop-loss and flexible exit mechanisms. Despite certain limitations, with continuous optimization and strict risk control, the strategy shows good practical application value.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy('4Vietnamese 3x Supertrend', overlay=true, max_bars_back=1000, initial_capital = 10000000000, slippage = 2, commission_type = strategy.commission.percent, commission_value = 0.013, default_qty_type=strategy.percent_of_equity, default_qty_value = 33.33, pyramiding = 3, margin_long = 0, margin_short = 0)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Inputs

// Supertrend Settings
STATRLENGTH1 = input.int(10, title='Fast Supertrend ATR Length', group='SUPERTREND SETTINGS')
STATRMULT1 = input.float(1, title='Fast Supertrend ATR Multiplier', group='SUPERTREND SETTINGS')
STATRLENGTH2 = input.int(11, title='Medium Supertrend ATR Length', group='SUPERTREND SETTINGS')
STATRMULT2 = input.float(2, title='Medium Supertrend ATR Multiplier', group='SUPERTREND SETTINGS')
STATRLENGTH3 = input.int(12, title='Slow Supertrend ATR Length', group='SUPERTREND SETTINGS')
STATRMULT3 = input.float(3, title='Slow Supertrend ATR Multiplier', group='SUPERTREND SETTINGS')

isUseHighestOf2RedCandleSetup = input.bool(false, group = "Setup Filters")


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Calculations 
[superTrend1, dir1] = ta.supertrend(STATRMULT1, STATRLENGTH1)
[superTrend2, dir2] = ta.supertrend(STATRMULT2, STATRLENGTH2)
[superTrend3, dir3] = ta.supertrend(STATRMULT3, STATRLENGTH3)

// directionST1 = dir1 == 1 and dir1[1] == 1 ? false : dir1 == -1 and dir1[1] == -1 ? true : false
// directionST2 = dir2 == 1 and dir2[1] == 1 ? false : dir2 == -1 and dir2[1] == -1 ? true : false
// directionST3 = dir3 == 1 and dir3[1] == 1 ? false : dir3 == -1 and dir3[1] == -1 ? true : false


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Calculate highest from supertrend1 uptrend
var float highestGreen = 0
if dir1 < 0 and highestGreen == 0 and (isUseHighestOf2RedCandleSetup ? close < open : true)
    highestGreen := high
if highestGreen > 0 and (isUseHighestOf2RedCandleSetup ? close < open : true)
    if high > highestGreen
        highestGreen := high
if dir1 >= 0
    highestGreen := 0


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Entry SL
var entrySL4Long1 = false
var entrySL4Long2 = false
var entrySL4Long3 = false

isUseEntrySL = input.bool(true, group = "Entry SL Option")
dataToCalculate = input.source(low, group = "Entry SL Option")

if isUseEntrySL and (dir1 > 0 and dir2 < 0 and dir3 < 0)
    if strategy.opentrades >= 1
        if dataToCalculate > strategy.opentrades.entry_price(0)
            entrySL4Long1 := true
        else 
            entrySL4Long1 := false

        if entrySL4Long1 and close > strategy.opentrades.entry_price(0)
            strategy.exit('exit1', from_entry = 'long1', stop = strategy.opentrades.entry_price(0))

    if strategy.opentrades >= 2 
        if dataToCalculate > strategy.opentrades.entry_price(1)
            entrySL4Long2 := true
        else 
            entrySL4Long2 := false
    
        if entrySL4Long2 and close > strategy.opentrades.entry_price(1)
            strategy.exit('exit2', from_entry = 'long2', stop = strategy.opentrades.entry_price(1))   

    if strategy.opentrades >= 3 
        if dataToCalculate > strategy.opentrades.entry_price(2) 
            entrySL4Long3 := true
        else 
            entrySL4Long3 := false
    
        if entrySL4Long3 and close >  strategy.opentrades.entry_price(2)
            strategy.exit('exit3', from_entry = 'long3', stop = strategy.opentrades.entry_price(2))

if strategy.closedtrades > strategy.closedtrades[1]
    if strategy.closedtrades.exit_id(strategy.closedtrades-1) == 'exit3'
        entrySL4Long3 := false
    if strategy.closedtrades.exit_id(strategy.closedtrades-1) == 'exit2'
        entrySL4Long2 := false
    if strategy.closedtrades.exit_id(strategy.closedtrades-1) == 'exit1'
        entrySL4Long1 := false

    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Entry
if dir3 < 0
    if dir2 > 0 and dir1 < 0
        strategy.entry('long1', strategy.long)
    else if dir2 < 0
        strategy.entry('long2', strategy.long, stop=superTrend1)
else
    if dir1 < 0 and highestGreen > 0
        strategy.entry('long3', strategy.long, stop=highestGreen)


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Exit
isUseAllDowntrendExit = input.bool(true, group = "Exit Type")
if isUseAllDowntrendExit and dir3 > 0 and dir2 > 0 and dir1 > 0 and close < open
    strategy.close_all()

isUseAvgPriceInLoss = input.bool(true, group = "Exit Type")
if isUseAvgPriceInLoss and strategy.position_avg_price > close //and strategy.position_avg_price <= close[1]
    //  and (dir1 > 0 or dir2 > 0 or dir3 > 0)
    //  and strategy.opentrades >= 1  
    //  and strategy.opentrades >= 3  
    strategy.close_all()

isUseAllPositionsInLoss = input.bool(false, group = "Exit Type")
if isUseAllPositionsInLoss
      and (
       false
         or (strategy.opentrades == 1 and ((not na(strategy.opentrades.entry_price(0))) and strategy.opentrades.entry_price(0) > close))

         or (strategy.opentrades == 1 and ((not na(strategy.opentrades.entry_price(0))) and strategy.opentrades.entry_price(0) > close)
             and ((not na(strategy.opentrades.entry_price(1))) and strategy.opentrades.entry_price(1) > close))

         or (strategy.opentrades == 1 and ((not na(strategy.opentrades.entry_price(0))) and strategy.opentrades.entry_price(0) > close)
             and ((not na(strategy.opentrades.entry_price(1))) and strategy.opentrades.entry_price(1) > close)
             and ((not na(strategy.opentrades.entry_price(2))) and strategy.opentrades.entry_price(2) > close))
         )
    strategy.close_all()


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Plot
plot(superTrend1, title='Fast Supertrend',      color=dir1 == 1 and dir1[1] == 1 ? color.red : dir1 == -1 and dir1[1] == -1 ? color.green : na)
plot(superTrend2, title='Medium Supertrend',    color=dir2 == 1 and dir2[1] == 1 ? color.red : dir2 == -1 and dir2[1] == -1 ? color.green : na)
plot(superTrend3, title='Slow Supertrend',      color=dir3 == 1 and dir3[1] == 1 ? color.red : dir3 == -1 and dir3[1] == -1 ? color.green : na)

```

> Detail

https://www.fmz.com/strategy/477615

> Last Modified

2025-01-06 17:02:35
