
> Name

动量砖策略Momentum-Brick-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d1b3cbff17bd4e2ca.png)

The strategy judges the market momentum change based on the formation of simulated bricks and long or short on the brick direction.  

### Strategy Logic 

The core logic is to simulate brick formation by calculating the ATR and closing price relationship. Specifically, two variables Brick1 and Brick2 are defined.  

Brick1 is calculated by: if closing price exceeds Brick1 previous value + ATR, Brick1 = Brick1 previous value + ATR; if closing price is below Brick1 previous - ATR, Brick1 is Brick1 previous - ATR value; otherwise, Brick1 inherits Brick1 previous value.

Brick2 is calculated by: if Brick1 is not equal to Brick1 previous value, then Brick2 = Brick1 previous value; otherwise, inherit Brick2 previous value.

This simulates the brick formation. When Brick1 rises more than an ATR, an upward brick forms; when Brick1 falls more than an ATR, a downward brick forms. Brick2 just records the position of the previous brick.

When Brick1 and Brick2 go up across, it means the brick expands upward, judged as long. When Brick1 and Brick2 go down across, it means the brick shrinks downward, judged as short.

### Advantage

1. Use ATR to determine brick formation, avoid fixed brick size, can adapt dynamically to market fluctuation
2. Identify momentum changes through crossover of bricks  
3. The sensitivity to market momentum judgment can be adjusted by different ATR cycles
4. Visualize the formation and crossover of bricks to intuitively determine market trends

### Risk

1. ATR size selection will affect strategy returns. Too small ATR results in too many invalid signals. Too large ATR causes too few bricks and potential loss of opportunity.
2. The actual trend may not follow the brick pattern. Brick crossover signals may be negated by market reversals.
3. Need to be highly sensitive to transactions costs. Frequent trading based on brick crossover will greatly reduce net profit.  

Solutions include parameter optimization to find optimal ATR cycle, adjust stop profit loss strategy to reduce loss from invalid signals, properly increase transaction varieties to reduce cost impact on returns.


### Optimization
1. Combine with other indicators for signal filtering to avoid invalid signals, for example volume and volatility indicators  
2. Add trend filtering, issue signals only in the trend direction to avoid reversal loss 
3. Adopt full sample parameter optimization during test period to find optimal parameters automatically

## Summary
The strategy judges short-term trends and momentum in the markets through dynamically simulating brick crossover, with intuitive visualization. There is much room for optimization through parameter tuning and signal filtering to further enhance stability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2025|Backtest Stop Year|
|v_input_5|true|Backtest Stop Month|
|v_input_6|true|Backtest Stop Day|
|v_input_7|false|Color Background?|
|v_input_8|true|Margin?|
|v_input_9|D|Resolution of ATR|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4


///Component Code Start
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(2025, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)



/// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=input.bool, defval=false)
testPeriodBackgroundColor = testPeriodBackground and time >= testPeriodStart and time <= testPeriodStop ? 
   #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
/// Component Code Stop


//Zack_the_Lego (original AUTHOR) made into strategy by mkonsap
strategy("Flex Renko Emulator", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)
margin = input(true, title="Margin?")
Margin = margin ? margin : false
res = input(type=input.resolution, defval="D", title="Resolution of ATR")
xATR = atr(14)
//TF = x78tf ? "78" : "39"
BrickSize = security(syminfo.tickerid, res, xATR)

//Brick1 =  close >  nz(Brick1[1]) + BrickSize ? nz(Brick1[1]) + BrickSize : close <
                    //nz(Brick1[1]) - BrickSize ?
                        //nz(Brick1[1]) - BrickSize
                            //: nz(Brick1[1]))


Brick1() =>
    s1 = 0.0
    s1 := close > nz(s1[1]) + BrickSize ? nz(s1[1]) + BrickSize : 
       close < nz(s1[1]) - BrickSize ? nz(s1[1]) - BrickSize : nz(s1[1])
    s1


Brick2() =>
    s2 = 0.0
    Brick1_1 = Brick1()
    s2 := Brick1() != Brick1()[1] ? Brick1_1[1] : nz(s2[1])
    s2

colorer = Brick1() > Brick2() ? color.green : color.red
p1 = plot(Brick1(), color=colorer, linewidth=4, title="Renko")
p2 = plot(Brick2(), color=colorer, linewidth=4, title="Renko")
fill(p1, p2, color=color.purple, transp=50)




mylong = crossover(Brick1(), Brick2())
myshort = crossunder(Brick1(), Brick2())

last_long = float(na)
last_short = float(na)
last_long := mylong ? time : nz(last_long[1])
last_short := myshort ? time : nz(last_short[1])

in_long = last_long > last_short ? 2 : 0
in_short = last_short > last_long ? 2 : 0

mylong2 = crossover(Brick1(), Brick2())
myshort2 = crossunder(Brick1(), Brick2())

last_long2 = float(na)
last_short2 = float(na)
last_long2 := mylong2 ? time : nz(last_long2[1])
last_short2 := myshort2 ? time : nz(last_short2[1])

in_long2 = last_long2 > last_short2 ? 0 : 0
in_short2 = last_short2 > last_long2 ? 0 : 0


condlongx = in_long + in_long2
condlong = crossover(condlongx, 1.9)
condlongclose = crossunder(condlongx, 1.9)

condshortx = in_short + in_short2
condshort = crossover(condshortx, 1.9)
condshortclose = crossunder(condshortx, 1.9)


// === STRATEGY - LONG POSITION EXECUTION WITH CLOSE ORDERS ===
//enterLong() => crossover(condlongx, 1.9) and testPeriod() and strategy.position_size <= 0
//exitLong()  => crossunder(condlongx, 1.9) and testPeriod() and strategy.position_size > 0
//strategy.entry(id = "Long", long = true, when = enterLong())
//strategy.close(id = "Long", when = exitLong())
// === STRATEGY - SHORT POSITION EXECUTION WITH CLOSE ORDER===
//enterShort() => crossover(condshortx, 1.9) and testPeriod() and strategy.position_size >= 0 and Margin
//exitShort() => crossunder(condshortx, 1.9)  and testPeriod() and strategy.position_size < 0
//strategy.entry(id = "Short", long = false, when = enterShort())
//strategy.close(id = "Short", when = exitShort())   
//END


///STRATEGY ONLY LONG AND SHORT/////
if crossover(condlongx, 1.9) and testPeriod() and strategy.position_size <= 0
    strategy.entry("Long", strategy.long, comment="Long")

if crossover(condshortx, 1.9) and testPeriod() and strategy.position_size >= 0
    strategy.close("Long", when=not Margin)

if crossover(condshortx, 1.9) and testPeriod() and strategy.position_size >= 0
    strategy.entry("Short", strategy.short, comment="Short", when=Margin)

/////// END ////

```

> Detail

https://www.fmz.com/strategy/442126

> Last Modified

2024-02-19 15:32:17
