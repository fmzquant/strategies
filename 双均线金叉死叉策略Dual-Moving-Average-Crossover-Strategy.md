
> Name

双均线金叉死叉策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy generates trading signals based on the crossover of two moving averages with different periods.

### Strategy Logic

The strategy allows users to choose the type and length of moving averages. The types include SMA, EMA, VWMA, etc. The length determines the period of the moving averages. 

Two moving averages are calculated based on the user's selection. If the faster line crosses above the slower line, a golden cross is formed and a buy signal is generated. If the faster line crosses below the slower line, a death cross is formed and a sell signal is generated.

When the short-term average price is above the long-term average price, it is considered an uptrend and long positions should be taken. When the short-term price is below the long-term price, it is considered a downtrend and short positions should be taken.

### Advantage Analysis

- The strategy logic is simple and clear, easy to understand and implement.
- Moving averages can effectively filter market noise and identify trends. 
- The MA type and parameters can be flexibly chosen to adapt to different products and timeframes.
- Easy to optimize by combining various indicators.

### Risk Analysis

- May generate multiple false signals when the market is ranging.
- Inappropriate parameter selection may lead to poor strategy performance.
- Signals are lagging, unable to timely capture turning points.
- Exposed to sudden price shocks.

Risks can be managed by optimizing parameters, combining other indicators for signal generation, implementing stop loss/take profit, etc.

### Optimization Directions

- Test different types and length of MAs to find optimal parameters.
- Add other indicators for signal filtering, e.g. volume, volatility indicators.
- Add stop loss/take profit logic to reduce drawdown. 
- Incorporate trend evaluation to avoid unsuitable market conditions.
- Optimize money management such as position sizing, risk budgeting.

### Conclusion

The strategy has a simple and clear logic of generating signals with dual MAs crossover. It allows flexible parameter tuning and combinations with other strategies for optimization, but risks of ranging markets should be monitored and money management is crucial. Overall it is a strategy worth considering.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|MA length|
|v_input_2|true|Type|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-09 00:00:00
end: 2023-09-13 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's MAs Tests", shorttitle = "MAs tests", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)


len = input(30, defval = 30, minval = 2, maxval = 1000, title = "MA length")
type = input(1, defval = 1, minval = 1, maxval = 7, title = "Type")
src = input(close, defval = close, title = "Source")

//DEMA
dema = 2 * ema(src, len) - ema(ema(close, len), len)

//TEMA
xPrice = close
xEMA1 = ema(src, len)
xEMA2 = ema(xEMA1, len)
xEMA3 = ema(xEMA2, len)
tema = 3 * xEMA1 - 3 * xEMA2 + xEMA3

//KAMA
xvnoise = abs(src - src[1])
nfastend = 0.20
nslowend = 0.05
nsignal = abs(src - src[len])
nnoise = sum(xvnoise, len)
nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
kama = nz(kama[1]) + nsmooth * (src - nz(kama[1]))

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

ma = type == 1 ? sma(src, len) : type == 2 ? ema(src, len) : type == 3 ? vwma(src, len) : type == 4 ? dema : type == 5 ? tema : type == 6 ? kama : type == 7 ? center : 0

plot(ma, color = blue, linewidth = 3, transp = 0)

trend = low > ma ? 1 : high < ma ? -1 : trend[1]

longCondition = trend == 1 and trend[1] == -1
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = trend == -1 and trend[1] == 1
if (shortCondition)
    strategy.entry("Short", strategy.short)
    
    
    
    
```

> Detail

https://www.fmz.com/strategy/427090

> Last Modified

2023-09-17 22:35:07
