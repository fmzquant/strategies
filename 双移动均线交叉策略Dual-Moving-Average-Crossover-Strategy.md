
> Name

双移动均线交叉策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7d375b3b01892cbe1e.png)


## Overview

The Dual Moving Average Crossover strategy judges the price trend direction by calculating moving averages of different periods, and realizes trend following. It goes long when the short period MA crosses over the long period MA, and goes short when the short period MA crosses below the long period MA. It is a typical trend following strategy.

## Strategy Logic

This strategy is based on 9, 21 and 50 period Exponential Moving Averages (EMA). The 9 period EMA represents the short term trend, 21 period EMA represents the medium term trend, and 50 period EMA represents the long term trend. 

When the 9 period EMA crosses over the 21 period EMA, it signals an uptrend in the short term, thus going long. When the 9 period EMA crosses below the 21 period EMA, it signals a downtrend in the short term, thus going short. The crossover() function is used here to determine the crossover between the MAs.

The logic for long/short entry, take profit and stop loss is configured. The entry condition is the crossover of the MAs. Long take profit is entry price * (1 + input take profit ratio), short take profit is entry price * (1 - input take profit ratio). Long stop loss is entry price * (1 - input stop loss ratio), short stop loss is entry price * (1 + input stop loss ratio).

Some filters are also added, like trend filter to avoid sideways, and equity filter to avoid trading when strategy equity is too low. These filters can help avoid some false signals.

In summary, this strategy uses dual EMA crossovers to determine price trend direction, with proper take profit and stop loss logic, which can capture mid to long term trends. But as a single factor strategy, the signals may not be stable enough and can be further optimized.

## Advantage Analysis  

- Using dual MA crossovers to determine trend direction, the logic is simple and easy to understand.

- Adopting EMAs of different periods can judge short and long term trends.

- Take profit and stop loss logic locks in profit and controls risk.

- Filters help avoid some false signals to some extent.

- Parameters can be freely configured, periods can be optimized for different market environments.

## Risk Analysis

- As a single factor strategy, trading signals may not be stable enough. Whipsaws may occur during price consolidations.

- When crossover happens, price may have already run up/down a stretch, with risk of buying high and selling low.

- Trading costs are not considered, actual returns could be lower.

- No stop loss in place, risks unlimited loss in extreme market conditions.

Solutions:

1. Optimize MA periods for more stable signals.

2. Add other indicators to filter signals. 

3. Increase trade size to lower cost impact.

4. Set proper stop loss to limit maximum loss.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize MA periods to find best combinations, or use adaptive optimization to dynamically select best periods.

2. Add other technical indicators like MACD, KD etc to filter signals and improve quality, or use machine learning to score signals and filter false ones.

3. Incorporate volume analysis. Do not take signal if volume is insufficient on MA crossover.

4. Check price fluctuations before crossover happens. Crossover in ranging market may be false signal.

5. Build dynamic stop loss mechanisms like trailing stop loss, Chandelier Exit etc, to reduce stop loss distance but keep it effective.

6. Optimize position sizing like fixed/dynamic/leveraged, to achieve more reasonable profit/loss ratios. 

7. Comprehensively consider trading costs, slippage. Optimize take profit/stop loss ratios to ensure profitability in live trading.

## Conclusion

The overall structure of this strategy is sound, with simple logic of dual EMA crossover to determine trend direction, coupled with take profit and stop loss logic to capture trends. As a single factor strategy, it can be further optimized on parameters, signal filters etc to make it more robust. With proper stop loss and position sizing, risks can be further reduced. Overall, it provides a solid trend following strategy framework, which can achieve consistent profits after optimizations and adjustments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|include longs?|
|v_input_2|true|condition two?|
|v_input_3|true|condition three?|
|v_input_4|true|include shorts?|
|v_input_5|true|condition two?|
|v_input_6|true|condition three?|
|v_input_7|200|lookback for average range (bars)|
|v_input_8|true|filter trades if range is less than (%)|
|v_input_9|40|filter trades if equity is below ema()|
|v_input_10|true|sideways filter?|
|v_input_11|true|equity filter?|
|v_input_12|true|long TP %|
|v_input_13|0.4|long SL %|
|v_input_14|true|short TP %|
|v_input_15|0.4|short SL %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TradingMentalist

//@version=4
strategy("Initial template",initial_capital=1000, overlay=true, pyramiding=0, commission_type=strategy.commission.percent, commission_value=0.04, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.USD)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////inputs
//turn on/off longs/shorts / extraneous conditions
longinc=input(true, title="include longs?")
lConSw2=input(true, title="condition two?")
lConSw3=input(true, title="condition three?")
shotinc=input(true, title="include shorts?")
sConSw2=input(true, title="condition two?")
sConSw3=input(true, title="condition three?")

//turn on/off / adjust trade filters (average range/average equity)
sidein2     = input(200, step=10, title='lookback for average range (bars)')
sidein      = input(1, title='filter trades if range is less than (%)')/100
equityIn    = input(40, title='filter trades if equity is below ema()')
sidewayssw  = input(true, title='sideways filter?')
equitysw    = input(true, title='equity filter?')
longtpin    = input(1,step=0.1, title='long TP %')/100
longslin    = input(0.4,step=0.1, title='long SL %')/100
shorttpin   = input(1,step=0.1, title='short TP %')/100
shortslin   = input(0.4,step=0.1, title='short SL %')/100

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////filters
//(leave as is)
side1       = (close[1] + close[sidein2]) / 2
side2       = close[1] - close[sidein2] 
side3       = side2 / side1
notsideways = side3 > sidein
equityMa    = equitysw ? ema(strategy.equity, equityIn) : 0
equityCon   = strategy.equity >= equityMa

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////indicators
ma1 = ema(close, 9)
ma2 = ema(close, 21)
ma3 = ema(close, 50)

plot(ma1, color=color.new(#E8B6B0,50))
plot(ma2, color=color.new(#B0E8BE,50))
plot(ma3, color=color.new(#00EEFF,50))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////conditions
//adjust conditions
//-------------------------------------------
longCondition1  = crossover(ma2,ma3)
longCondition2  = close[5] > close[10]
longCondition3  = close[1] > close[2]

shortCondition1 = crossover(ma3,ma2)
shortCondition2 = close[5] < close[10]
shortCondition3 = close[1] < close[2]

closelong       = shortCondition1
closeshort      = longCondition1
//-------------------------------------------

//(leave as is)
longCondition1in  = longCondition1
longCondition2in  = lConSw2 ? longCondition2 : true
longCondition3in  = lConSw3 ? longCondition3 : true
shortCondition1in = shortCondition1
shortCondition2in = sConSw2 ? shortCondition2: true
shortCondition3in = sConSw3 ? shortCondition3: true
longConditions    = longCondition1in and longCondition2in and longCondition3in
shortConditions   = shortCondition1in and shortCondition2in and shortCondition3in

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////execution
//(leave as is)
long            = sidewayssw ? notsideways and equityCon and longConditions : equityCon and longConditions
short           = sidewayssw ? notsideways and equityCon and shortConditions : equityCon and shortConditions

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////risk
//(leave as is)
longtplevel     = strategy.position_avg_price * (1 + longtpin)
longsllevel     = strategy.position_avg_price * (1 - longslin)
shorttplevel    = strategy.position_avg_price * (1 - shorttpin)
shortsllevel    = strategy.position_avg_price * (1 + shortslin)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////timeframe
//adjust timeframe
//-------------------------------------------
startyear   = 2000
startmonth  = 1
startday    = 1

stopyear    = 9999
stopmonth   = 12
stopday     = 31
//-------------------------------------------

//(leave as is)
startperiod = timestamp(startyear,startmonth,startday,0,0)
periodstop  = timestamp(stopyear,stopmonth,stopday,0,0)
timeframe()    =>
    time >= startperiod and time <= periodstop ? true : false

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////orders
//comments are empty characters for clear chart
if timeframe()
    if longinc
        if strategy.position_size == 0 or strategy.position_size > 0 
            strategy.entry(id="long", long=true, when=long, comment=" ")
            strategy.exit("stop","long", limit=longtplevel, stop=longsllevel,comment=" ")
            strategy.close(id="long", when=closelong, comment = " ")
    if shotinc
        if strategy.position_size == 0 or strategy.position_size < 0 
            strategy.entry(id="short", long=false, when=short, comment = " ")
            strategy.exit("stop","short", limit=shorttplevel, stop=shortsllevel,comment = " ")
            strategy.close(id="short", when=closeshort, comment = " ")
```

> Detail

https://www.fmz.com/strategy/432363

> Last Modified

2023-11-16 17:50:52
