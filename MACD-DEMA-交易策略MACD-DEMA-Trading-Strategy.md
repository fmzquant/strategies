
> Name

MACD-DEMA-交易策略MACD-DEMA-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This strategy combines the MACD and DEMA dual-rail indicators to generate trading signals from crossovers. It captures turning points of the MACD indicator and uses DEMA for filtering to achieve better entries.

## Strategy Principle

1. Calculate fast line DEMAfast as DEMA value of price with period length fastmacd.

2. Calculate slow line DEMAslow as DEMA value of price with period length slowmacd. 

3. MACD Line is difference between fast and slow lines: DEMAfast - DEMAslow.

4. Signal line is DEMA value of MACD line with period signalmacd.

5. Crossovers between MACD and signal lines generate trade signals: long on golden cross, short on death cross.

6. Add date filters to only generate signals within specified date range.

## Advantage Analysis

The main advantages of this strategy are:

1. Combining MACD and DEMA complements the indicators. MACD captures turns, DEMA filters to improve signal quality.

2. DEMA dual rails design reduces lagging and noise of MACD indicator.

3. MACD crossover signals are easy to interpret, clean and simple.

4. Flexible setting of date filters caters to different strategy needs.

5. MACD parameters can be optimized for flexibility across market conditions.

## Risk Analysis

Main risks of this strategy:

1. MACD struggles as trend following indicator in choppy sideways markets. 

2. Crossovers may generate false signals, needs effective filtering.

3. Stop loss strategy not robust, prone to oversized stops.

4. Parameter optimization not comprehensive enough, big performance difference across products.

5. Date filters too rigid, needs dynamic adjustment.

Solutions:

1. Add momentum indicator to avoid sideways market. 

2. Add price conditions to filter out false crosses.

3. Set reasonable initial and trailing stop loss. 

4. Test parameters across products, dynamic optimization.

5. Adjust filter dates based on real-time conditions.

## Optimization Directions

Some potential improvements for the strategy:

1. Add volume filter for crossover signals.

2. Optimize MACD parameter combinations across different products.

3. Add stop strategies like fixed or trailing stop loss. 

4. Dynamically adjust stop loss based on market volatility.

5. Track trend strength for position sizing.

## Summary

The MACD DEMA strategy combines the strengths of both indicators, using crossovers to capture trends. But MACD is inherently lagging, beware of false signals. Also optimize stops to avoid unreasonable liquidation. For live trading, cautious entry based on optimized parameters and continuous improvements are recommended.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|MACD Fast  Line Length|
|v_input_2|26|MACD Slow Line Length|
|v_input_3|9|Signal Line Length|
|v_input_4|2018|yearfrom|
|v_input_5|2019|yearuntil|
|v_input_6|true|monthfrom|
|v_input_7|12|monthuntil|
|v_input_8|true|dayfrom|
|v_input_9|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(" MACD DEMA STRATEGY ", overlay=true)

source=close
price=source



fastmacd = input(12,title='MACD Fast  Line Length')
slowmacd = input(26,title='MACD Slow Line Length')
signalmacd = input(9,title='Signal Line Length')

macdslowline1 = ema(close,slowmacd)
macdslowline2 = ema(macdslowline1,slowmacd)
DEMAslow = ((2 * macdslowline1) - macdslowline2 )

macdfastline1 = ema(close,fastmacd)
macdfastline2 = ema(macdfastline1,fastmacd)
DEMAfast = ((2 * macdfastline1) - macdfastline2)

MACDLine = (DEMAfast - DEMAslow)

SignalLine1 = ema(MACDLine, signalmacd)
SignalLine2 = ema(SignalLine1, signalmacd)
SignalLine = ((2 * SignalLine1) - SignalLine2 )


MACDSignal = SignalLine-MACDLine


colorbar= MACDSignal>0?green:red




yearfrom = input(2018)
yearuntil =input(2019)
monthfrom =input(1)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)







if ( crossover(MACDLine,SignalLine) ) 
    strategy.entry("MMAL", strategy.long, stop=close, oca_name="TREND",  comment="AL")
    
else
    strategy.cancel(id="MMAL")


if (  crossunder(MACDLine,SignalLine) ) 

    strategy.entry("MMSAT", strategy.short,stop=close, oca_name="TREND",  comment="SAT")
else
    strategy.cancel(id="MMSAT")
    
    
    
    
    
    
    
    
    
    
    
    

```

> Detail

https://www.fmz.com/strategy/427265

> Last Modified

2023-09-19 16:10:19
