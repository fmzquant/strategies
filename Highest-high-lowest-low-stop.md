
> Name

Highest-high-lowest-low-stop

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Highest High Lookback|
|v_input_2|20|Lowest Low Lookback|


> Source (PineScript)

``` pinescript
//@version=3
strategy(title="Highest high/lowest low stop", overlay=true)

// STEP 1:
// Make inputs for length of highest high and lowest low
hiLen = input(title="Highest High Lookback", type=input.integer,
     defval=20, minval=2)

loLen = input(title="Lowest Low Lookback", type=input.integer,
     defval=20, minval=2)

// STEP 2:
// Calculate recent extreme high and low
hiHighs = highest(high, hiLen)[1]
loLows  = lowest(low, loLen)[1]

// Plot stop values for visual confirmation
plot(series=(strategy.position_size > 0) ? loLows : na,
     style=circles, color=green, linewidth=3,
     title="Lowest Low Stop")

plot(series=(strategy.position_size < 0) ? hiHighs : na,
     style=circles, color=red, linewidth=3,
     title="Highest High Stop")

// Trading conditions for this example strategy
higherCloses = (close > close[1]) and
     (close[1] > close[2]) and (close[2] > close[3])
lowerCloses = (close < close[1]) and
     (close[1] < close[2]) and (close[2] < close[3])
isFlat = (strategy.position_size == 0)

// Submit entry orders
if (isFlat and higherCloses)
    strategy.entry(id="EL", long=true)

if (isFlat and lowerCloses)
    strategy.entry(id="ES", long=false)

// STEP 3:
// Submit stops based on highest high and lowest low
if (strategy.position_size > 0)
    strategy.exit(id="XL HH", stop=loLows)

if (strategy.position_size < 0)
    strategy.exit(id="XS LL", stop=hiHighs)
```

> Detail

https://www.fmz.com/strategy/395962

> Last Modified

2023-01-07 21:10:04
