
> Name

Turtle-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1114fdb46cb1fc73f9a.png)

### Overview

The Turtle Trading Strategy is a trend following strategy that tracks momentum breakouts. It was developed by famous trader Richard Dennis in the 1980s to prove that traders could be nurtured by rules rather than born. The core idea of the strategy is to track price breakouts and follow trends, while strictly adhering to money management principles to limit downside risk.  

### Strategy Logic

The Turtle Trading Strategy uses two parameters N and N/2 to construct channels. Specifically, it calculates the highest and lowest prices over the most recent N days and N/2 days. When the price exceeds the N-day channel, a long position is established. When the price falls below the N/2-day channel, the position is closed. Similarly, when the price breaks the N-day channel to the downside, a short position is established, and closed when the price rises above the N/2-day channel. The goal is to follow price trends while controlling risk.

In the code, N corresponds to `enter_slow` and N/2 corresponds to `enter_fast`. The highest prices (`slowL` and `fastL`) and lowest prices (`slowS` and `fastS`) over the most recent 55 days and 20 days are calculated separately. Long positions are opened when the price exceeds the 55-day channel (`enterL2`) and closed when the price falls below the 20-day channel (`exitL1`). Short positions are opened when the price breaks the 55-day channel downwards (`enterS2`) and closed when the price rises above the 20-day channel (`exitS1`).

### Advantage Analysis 

The biggest advantage of the Turtle Trading Strategy is risk control. By establishing positions on price breakouts and stopping out quickly on pullbacks, it effectively controls losses on individual trades. The use of fixed fractional position sizing further reduces risk.  

Another advantage is simple parameter selection. The entire strategy has just 4 parameters that are easy to understand and tune. The parameters themselves are also quite stable, without needing frequent optimization.

### Risk Analysis

The biggest risk of the Turtle Trading Strategy is the inability to track long-term trends. It may miss entry opportunities when trends start to form. Also, in choppy price oscillation environments, the strategy will trigger frequent entries and exits, increasing transaction costs and slippage risks.

In addition, the fixed parameter settings could perform very differently across products and market regimes, requiring manual tuning based on experience. 

### Enhancement Opportunities 

The Turtle Trading Strategy can be enhanced in several ways:

1. Add adaptive capabilities to parameters N and N/2 based on market volatility and signal frequency to make the system more robust across scenarios. 

2. Incorporate trend detection rules before entry to avoid wrong-way entries in choppy markets. 

3. Adopt a multi-timeframe approach to confirm trends on higher periods and enter trades on lower periods.

4. Optimize stop loss rules with trailing stops or time-based stops to reduce drawdowns.

### Conclusion
The Turtle Trading Strategy effectively tracks trends by a simple breakout system. Risk control is its biggest strength, thanks to quick stops and fixed fractional position sizing. At the same time, we see multiple dimensions along which the strategy can be extended and optimized to suit more instruments and market conditions. Overall, it provides a risk-controlled way to capture price trends that is an important reference for quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2011|Backtest Start Year|
|v_input_2|12|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2030|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7|false|Color Background?|
|v_input_8|true|Enable Shorting?|
|v_input_9|20|enter_fast|
|v_input_10|10|exit_fast|
|v_input_11|55|enter_slow|
|v_input_12|20|exit_slow|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-24 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//oringinally coded by tmr0, modified by timchep
//original idea from «Way of the Turtle: The Secret Methods that Turned Ordinary People into Legendary Traders» (2007) CURTIS FAITH
strategy("Turtles", shorttitle = "Turtles", overlay=true, pyramiding=1, default_qty_type= strategy.percent_of_equity, default_qty_value = 100)
//////////////////////////////////////////////////////////////////////
// Component Code Start
testStartYear = input(2011, "Backtest Start Year")
testStartMonth = input(12, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2030, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=false)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
// Component Code Stop
//////////////////////////////////////////////////////////////////////

shortingEnabled = input(title="Enable Shorting?", type=bool, defval=true)

enter_fast = input(20, minval=1)
exit_fast = input(10, minval=1)
enter_slow = input(55, minval=1)
exit_slow = input(20, minval=1)

fastL = highest(enter_fast)
fastLC = lowest(exit_fast)
fastS = lowest(enter_fast)
fastSC = highest(exit_fast)

slowL = highest(enter_slow)
slowLC = lowest(exit_slow)
slowS = lowest(enter_slow)
slowSC = highest(exit_slow)

enterL1 = high > fastL[1] 
exitL1 = low <= fastLC[1] 
enterS1 = low < fastS[1]
exitS1 = high >= fastSC[1]

enterL2 = high > slowL[1] 
exitL2 = low <= slowLC[1] 
enterS2 = low < slowS[1]
exitS2 = high >= slowSC[1]


if testPeriod()
    strategy.entry("fast L", strategy.long, when = enterL1) 
    
    if not enterL1
        strategy.entry("slow L", strategy.long, when = enterL2)
        
    strategy.close("fast L", when = exitL1)
    strategy.close("slow L", when = exitL2)

if shortingEnabled and testPeriod()
    strategy.entry("fast S", strategy.short, when = enterS1)
    if not enterS2
        strategy.entry("slow S", strategy.short, when = enterS2)
        
    strategy.close("fast S", when = exitS1)
    strategy.close("slow S", when = exitS2)
```

> Detail

https://www.fmz.com/strategy/436543

> Last Modified

2023-12-25 17:12:05
