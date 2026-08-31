
> Name

Configurable-Multi-MA-Crossover-Voting-System

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy allows flexible configuration of multiple fast/slow moving average pairs. It goes long when all fast MAs crossover above slow MAs, and exits when any fast MA crosses below slow MA. The voting mechanism with multiple MAs aims to form robust position holding decisions. 

### Strategy Logic

The key components and rules are:

1. Multiple fast/slow MAs: Using SMA, WMA, VWMA etc.

2. Long signal: All fast MAs crossing above slow MAs. 

3. Exit signal: Any fast MA crossing below slow MA.

4. Profit/loss points: Fixed points based on ATR.

5. Configurable: Flexible configuration of multiple MA pairs.

The voting-based entry with multiple MAs improves signal reliability. Custom configurations provide flexibility.

### Advantages

Compared to single MA strategies, the advantages are:

1. Multiple MAs provide more comprehensive trend assessment.

2. Voting avoids false signals from noise.

3. Large tuning space from custom MA configurations.

4. Support for different MA types enhances adaptability.

5. Defined profit/loss points control per trade risk/reward. 

6. Works better on longer timeframes, less curve whipsaws.

7. Simple and intuitive logic, easy to implement and operate.

8. Overall more stable with greater longevity versus single MA.

### Risks

However, some risks exist:

1. Increased complexity with multiple MAs. 

2. Risks of over-optimization.

3. Fundamental lagging in identifying trend changes.

4. No volume considered, risks being trapped.

5. Profit/loss points may cause unnecessary exits.

6. Performance subject to changing market regimes.

7. Need to monitor reward/risk ratios and curve smoothness.

8. Robustness across instruments requires validation.

### Enhancements

Based on the analysis, enhancements may involve:

1. Testing parameter robustness across different instruments. 

2. Adding volume or volatility confirmation.

3. Optimizing profit/loss points.

4. Setting maximum tolerable drawdown limit.

5. Constructing dynamic position sizing models.

6. Evaluating effect from introducing machine learning.

7. Monitoring maximum drawdown and curve smoothness.

8. Continual iterations to avoid overfitting.

### Conclusion

The configurable multi-MA approach forms a robust position holding mechanism. But preventing overfitting and dynamic adaptations to changing markets are key for any strategy's longevity. Only through rigorous ongoing optimizations and testing can a quant strategy sustain success.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|2x4,3x5,4x6|Crossover Config|
|v_input_source_1_high|0|source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_2|0|Moving Average Type: WMA|SMA|VWMA|
|v_input_1|14|ATR Period|
|v_input_2|10|Profit ATR x|
|v_input_3|5|Loss ATR x|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-16 00:00:00
end: 2023-09-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © levieux

//@version=5
strategy(title='Configurable Multi MA Crossover Voting System', shorttitle='Configurable Multi MA Crossover Voting System', initial_capital=1000, overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)
crossoverConfig= input.string(defval="2x4,3x5,4x6", title="Crossover Config")
source= input.source(high)
maType= input.string("WMA", title="Moving Average Type", options=["WMA","SMA","VWMA"])
atrPeriod= input(14, title="ATR Period")
profitAtr = input(10, title="Profit ATR x")
lossAtr = input(5, title="Loss ATR x")


ma(src,length,type) => 
    float ma = switch type
	    "SMA" => ta.sma(src, length)
	    "WMA" => ta.wma(src, length)
	    "VWMA" => ta.vwma(src, length)

crossoverGroups= str.split(crossoverConfig, ",")
crossoverCount= array.size(crossoverGroups)
crossovers= array.new_string(crossoverCount)
positions= array.new_int(crossoverCount, 0)
longVotes= 0
for i= 0 to crossoverCount-1
    crossover= str.tostring(array.get(crossoverGroups, i))
    crossoverBoundaries= str.split(crossover, "x")
    int fastLength= math.round(str.tonumber(array.get(crossoverBoundaries, 0)))
    int slowLength= math.round(str.tonumber(array.get(crossoverBoundaries, 1)))
    wmaFast= ma(source,fastLength,maType)
    wmaSlow= ma(source,slowLength,maType)
    if wmaFast>wmaSlow
        longVotes:= longVotes + 1
        array.set(positions, i, 1)

longCondition= longVotes==crossoverCount and strategy.position_size==0


//profitTicks = profitAtr*ta.atr(atrPeriod)/syminfo.mintick
//lossTicks = lossAtr*ta.atr(atrPeriod)/syminfo.mintick
profitPrice= close+profitAtr*ta.atr(atrPeriod)
lossPrice= close-lossAtr*ta.atr(atrPeriod)

if strategy.position_size>0
    profitPrice:= profitPrice[1]
    lossPrice:= lossPrice[1]

plot(profitPrice, color=color.green)
plot(lossPrice, color=color.red)

if longCondition and profitPrice>0
    strategy.entry("Long", strategy.long)

if longVotes<crossoverCount and strategy.position_size>0 and (high>profitPrice or low<lossPrice)
    strategy.close("Long")
    
longVotes:= 0
```

> Detail

https://www.fmz.com/strategy/427680

> Last Modified

2023-09-23 15:52:06
