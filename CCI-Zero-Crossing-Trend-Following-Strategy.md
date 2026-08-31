
> Name

CCI-Zero-Crossing-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the zero crossings of the CCI indicator as entry and exit signals to capture the trend direction. It goes long when the CCI breaks above zero from the negative zone, and goes short when the CCI breaks below zero from the positive zone, to follow the trend.

## Strategy Logic

- Use 20 periods for the CCI indicator.
- When CCI crosses above 0, go long with stop loss at -100.
- When CCI crosses below 0, go short with stop loss at 100.
- Exit when CCI crosses zero again.

The core logic is to capture the zero crossings of CCI as signals of trend changes. When CCI goes from negative to positive zone, it indicates prices have moved out of oversold and may start an uptrend. When CCI goes from positive to negative zone, it indicates prices have moved out of overbought and may start a downtrend. The strategy enters on the crossings and sets reasonable stop loss to control risk.

## Advantage Analysis 

- Using CCI zero crossings to determine trend direction is a classical application of the indicator.
- Appropriate CCI length filters out noise and catches major trend change points.
- Only one entry per trend, with stops. Reduces overtrading, concentrates funds for big wins.
- CCI parameters and stop distance are optimized for better universality.

## Risk Analysis

- CCI may give false crossing signals, causing unnecessary losses.
- Improper stop loss distance may be too wide or too narrow. 
- Wrong CCI length may filter out useful shorter period opportunities.
- Time lag risk exists. CCI may lag behind actual trend forming, causing late entry.

Solutions:

- Add other indicators for confirmation, avoid false CCI crossings.
- Dynamically adjust stop distance.
- Optimize CCI length to catch trends across timeframes. 
- Relax entry rules, don't strictly require CCI zero crossings.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Optimize CCI parameter length to find best setting. Test different lengths and evaluate profitability and win rate.

2. Add other indicators like KDJ, MACD for confirmation, avoid false CCI signals. Require persistent breakout of price levels or concurring signals.

3. Dynamically adjust stop loss distance based on market volatility. Tighter stops mean timely stops but may be too sensitive. Wider stops allow holding trends but increase loss if stopped out.

4. Relax entry rules to reduce missed entries. Start scaling in as CCI approaches zero crossing, instead of waiting for exact cross. 

5. Add trend exit rules to maximize profits. New exits when trend reverses, like price pulling back certain percentage.

## Conclusion

This strategy uses CCI zero crossings to determine trend direction and enter on the crossings with reasonable stop loss, effectively following trends. Further optimizations on confirmation, parameter tuning, entry rules, and exits can enhance it into a stable trend following strategy. Traders can adopt appropriate stop distance, holding period based on risk preference, and profit using this strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|CCI Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("CCI Level Zero Strategy (by Marcoweb) v1.0", shorttitle="CCI_L_Z_Strat_v1.0", overlay=true)

///////////// CCI
CCIlength = input(20, minval=1, title="CCI Period Length") 
CCIoverSold = -100
CCIoverBought = 100
CCIzeroLine = 0
CCI = cci(hlc3, CCIlength)
price = hlc3
vcci = cci(price, CCIlength)

source = close
buyEntry = crossover(source, CCIzeroLine)
sellEntry = crossunder(source, CCIzeroLine)
plot(CCI, color=black,title="CCI")
p1 = plot(CCIoverSold, color=blue,title="-100")
p2 = plot(CCIoverBought, color=red,title="100")
p3 = plot(CCIzeroLine, color=orange,title="0")


///////////// CCI 0Trend v1.0 Strategy 
if (not na(vcci))

    if (crossover(CCI, CCIzeroLine))
        strategy.entry("CCI_L", strategy.long, stop=CCIoverSold,  comment="CCI_L")
    else
        strategy.cancel(id="CCI_L")
        
    if (crossunder(CCI, CCIzeroLine))
        strategy.entry("CCI_S", strategy.short, stop=CCIoverBought,  comment="CCI_S")
    else
        strategy.cancel(id="CCI_S")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/428098

> Last Modified

2023-09-28 16:00:36
