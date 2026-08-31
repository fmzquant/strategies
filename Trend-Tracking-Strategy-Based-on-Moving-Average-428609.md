
> Name

Trend-Tracking-Strategy-Based-on-Moving-Average-428609

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy identifies the current trend direction by calculating moving averages of different periods and generates trading signals combined with the RSI indicator. When the short period moving average crosses above the long period moving average, the trend is considered up and a buy signal is generated. When the short period moving average crosses below the long period moving average, the trend is considered reversed and a sell signal is generated. The RSI indicator is used to avoid false signals caused by minor price fluctuations.

## Strategy Logic

1. Calculate 10-day, 20-day, 50-day, 100-day and 200-day simple moving averages. 

2. Calculate 14-day RSI value.

3. When 10-day SMA crosses above 50-day SMA, and RSI is greater than 30, and 20-day SMA is greater than or equal to 100-day SMA or 50-day SMA is greater than or equal to 100-day SMA, buy.

4. Set stop loss price to entry price multiplied by (1 - stop loss percentage).

5. Sell when:
    - 10-day SMA crosses below 50-day SMA, and close is below 20-day SMA: trend reversal sell signal  
    - Close is below 95% of entry price: stop loss sell
    - Close is below stop loss price: trailing stop loss sell

This strategy judges market trend using moving averages and sets stop loss to control risks. RSI filters out false breakouts. It buys when short period SMA crosses above long period SMA, indicating an uptrend, and sets a stop loss line to control risks during holding period. It sells when a trend reversal signal occurs or stop loss price is triggered.

## Advantage Analysis 

- Using moving averages to determine trend direction, buying during uptrend avoids trading in range-bound markets
- Using multiple period moving averages avoids being misled by short-term price fluctuations  
- Combining with RSI filters out false signals
- Setting stop loss controls downside risk for each trade
- Using trailing stop loss to lock in profits

## Risk Analysis

- Moving averages have lag and may miss the best timing for price reversal
- Stop loss set too loose may lead to large losses for single trades
- Stop loss set too tight may cause too frequent stop loss triggers
- Trailing stop loss may exit too early missing larger profits  

Optimization can be done via adjusting moving average periods, stop loss levels etc. Also consider combining with other indicators to improve accuracy.

## Optimization Directions

- Adjust moving average periods to fit different market conditions
- Optimize RSI parameters to better identify overbought/oversold conditions
- Set reasonable static stop loss and trail stop levels based on instrument characteristics  
- Add other indicators to avoid false signals
- Dynamically adjust stop loss based on volatility etc
- Auto optimize parameters via machine learning

## Summary

The strategy has clear logic overall, using moving averages for trend determination and setting stop loss to control risks. It is a typical trend tracking strategy. Further improvements can be achieved via parameter tuning and adding other indicators. But no strategy is perfect, continuous adjustments and optimizations are needed to cope with market uncertainties, together with proper risk management.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.1|Trail Long Loss (%)|
|v_input_2|true|Start Date|
|v_input_3|true|Start Month|
|v_input_4|2020|Start Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("MA_Script", overlay=true)

// STEP 1:
// Configure trail stop level with input options (optional)
longTrailPerc=input(title="Trail Long Loss (%)", type=input.float, minval=0.0, step=0.05, defval=0.1)

// Configure backtest start date with inputs
startDate=input(title="Start Date", type=input.integer, defval=1, minval=1, maxval=31)
startMonth=input(title="Start Month", type=input.integer, defval=1, minval=1, maxval=12)
startYear=input(title="Start Year", type=input.integer, defval=2020, minval=1800, maxval=2100)

// See if this bar's time happened on/after start date
afterStartDate=(time >=timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0))

// Calculate Relative Strength Index
rsiValue=rsi(close, 14)

// Calculate moving averages
MA10_Val =sma(close, 10)
//plot(MA10_Val, color=color.yellow, linewidth=1)

MA20_Val =sma(close, 20)
plot(MA20_Val, color=color.green, linewidth=1)

MA50_Val =sma(close, 50)
plot(MA50_Val, color=color.red, linewidth=1)

MA100_Val =sma(close, 100)
plot(MA100_Val, color=color.blue, linewidth=1) 

MA200_Val =sma(close, 200)
plot(MA200_Val, color=color.purple, linewidth=1) 

// Calculate candlestick
C_BodyHi = max(close, open)
C_BodyLo = min(close, open)
C_Body = C_BodyHi - C_BodyLo
C_UpShadow = high - C_BodyHi
C_DnShadow = C_BodyLo - low

// STEP 2:
// Calculate entry trading conditions
buyCondition_1=crossover(MA10_Val, MA50_Val) and (rsiValue > 30) and ((MA20_Val >=  MA100_Val) or (MA50_Val >=  MA100_Val))
avg_price = (close + open)/2

// First Entry
if (afterStartDate)
    strategy.entry(id="Entry_Trade_1", long=true, limit=avg_price, when=buyCondition_1)

plotchar(afterStartDate and crossover(MA10_Val, MA50_Val), textcolor = color.blue, text = 'MA\n')

// Determine trail stop loss prices
longStopPrice=0.0

longStopPrice :=if (strategy.position_size > 0)
    stopValue=C_BodyHi * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0
plot(longStopPrice, color=color.orange, linewidth=1)

bought_1=strategy.position_size[0] > strategy.position_size[1]
entry_Point_1=valuewhen(bought_1, avg_price, 0)

// STEP 3:
// Calculate exit trading conditions
sellCondition_2=crossunder(MA10_Val, MA50_Val) and (close < MA20_Val)
sellCondition_3_temp=valuewhen((C_BodyHi >= entry_Point_1*1.2), 1, 0)
sellCondition_1=(entry_Point_1*0.95 > close) and (sellCondition_3_temp != 1)
sellCondition_3=(sellCondition_3_temp == 1) and (strategy.position_size > 0) and close <= longStopPrice
plotchar((sellCondition_3 == 1) and (strategy.position_size > 0) and close <= longStopPrice, textcolor = color.red, text = 'TS\n', show_last = 11)
plotchar(crossunder(MA10_Val, MA50_Val), textcolor = color.red, text = 'MA\n')

id_val = ""
stop_val = close
condition = false

if sellCondition_1
    id_val := "Exit By Stop Loss At 7%"
    stop_val := entry_Point_1*0.93
    condition := true
else if sellCondition_2
    id_val := "Exit By Take Profit based on MA"
    stop_val := close
    condition := true
else if sellCondition_3
    id_val := "Exit By Trailing Stop"
    stop_val := longStopPrice
    condition := true

// Submit exit orders for trail stop loss price
if (strategy.position_size > 0)
    //strategy.exit(id="Exit By Stop Loss At 7%", from_entry="Entry_Trade_1", stop=entry_Point_1*0.93, when=sellCondition_1)
    //strategy.exit(id="Exit By Take Profit based on MA", from_entry="Entry_Trade_1", stop=close, when=sellCondition_2)
    strategy.exit(id=id_val, from_entry="Entry_Trade_1", stop=stop_val, when=condition)
    
    

```

> Detail

https://www.fmz.com/strategy/428609

> Last Modified

2023-10-07 15:04:00
