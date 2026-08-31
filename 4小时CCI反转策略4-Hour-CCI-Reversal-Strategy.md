
> Name

4小时CCI反转策略4-Hour-CCI-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description



### Overview

This is a reversal trading strategy based on the CCI indicator. It will open reverse trades when the CCI indicator shows overbought or oversold levels. Overall, this strategy utilizes the overbought and oversold features of the CCI indicator to capture price reversal opportunities.

### Strategy Logic

Firstly, this strategy is based on the CCI indicator. The CCI indicator formula is:

CCI = (Typical Price - Simple Moving Average) / (0.015 * Standard Deviation)

Where,
Typical Price = (Highest + Lowest + Close) / 3
Simple Moving Average = Moving average of Typical Price over past N days  
Standard Deviation = Square root of variance of Typical Price over past N days

This strategy uses a 11-period CCI indicator. And -150 is set as the oversold level, while 150 as the overbought level.

On every bar close, the 11-period CCI indicator will be checked. If CCI crosses below -150, a long signal is generated. If CCI crosses above 150, a short signal is generated.

After receiving the signal, market order will be used to open position. 1% profit target and 0.5% stop loss are set.

### Advantage Analysis  

1. Using CCI indicator can effectively capture price reversal opportunities
2. CCI parameters are adjustable for optimization
3. Fixed profit target and stop loss ratio effectively controls risk 
4. Simple and clear strategy logic, easy to understand and implement

### Risk Analysis

1. CCI indicator may generate lots of false signals, entry signals may not be reliable
- Solution: Optimize CCI parameters, add filter with other indicators

2. Fixed profit target and stop loss ratio may not suit different products
- Solution: Add dynamic profit target and stop loss 

3. Strategy relies solely on CCI, risk of ineffectiveness is high
- Solution: Combine multiple indicators to improve robustness 

4. No consideration on trading cost, live performance may suffer
- Solution: Add slippage control, reduce trading frequency

### Optimization Directions

1. Optimize CCI parameters to find better parameter combinations
2. Add other indicators like MACD, KDJ for signal filtering 
3. Develop dynamic profit target and stop loss instead of fixed ratio
4. Optimize strategy to lower trading frequency, reducing trading cost impact
5. Conduct backtesting optimization to find best parameter combination for live trading

### Summary

The 4-hour CCI reversal strategy is a simple strategy utilizing CCI indicator for reversal trading. It has the advantage of clear logic and easy implementation. But it also has weaknesses like unreliable CCI signals and inflexible profit target/stop loss. Further improvements can be made by optimizing CCI parameters, adding filter indicators, developing dynamic exits, etc. Overall this strategy provides a CCI-based idea for quantitative trading, but requires further optimization before live application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|11|length|
|v_input_2|-150|overSold|
|v_input_3|150|overBought|
|v_input_4|15|Timeframe|
|v_input_5|16|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-10-12 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("4H CCI Strategy", overlay=true)
length = input( 11 )
overSold = input( -150 )
overBought = input( +150 )
price1 = high
price2 = low
ucci = cci(price1, length)
dcci = cci(price2, length)
vcci = cci(ohlc4, 11)

resCustom = input(title="Timeframe", defval="15")
Length = input(16, minval=1)
xPrice = request.security(syminfo.tickerid, resCustom, hlc3)
xvnoise = abs(xPrice - xPrice[1])
nfastend = 0.666
nslowend = 0.0645
nsignal = abs(xPrice - xPrice[Length])
nnoise = sum(xvnoise, Length)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
nAMA = nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))
basis1 = nAMA
slope = change(basis1,1)

if (not na(vcci))
    if (crossover(dcci, overSold))
        strategy.entry("CCILE", strategy.long, comment="CCILE")
        strategy.exit("exit", "CCILE", profit = 0.01, loss = 0.005)
    if (crossunder(ucci, overBought))
        strategy.entry("CCISE", strategy.short, comment="CCISE")
        strategy.exit("exit", "CCISE", profit = 0.01, loss = 0.005)
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/429145

> Last Modified

2023-10-13 15:29:05
