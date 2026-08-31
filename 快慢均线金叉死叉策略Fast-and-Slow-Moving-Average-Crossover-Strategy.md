
> Name

快慢均线金叉死叉策略Fast-and-Slow-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description



### Strategy Overview

The fast and slow moving average crossover strategy is a quantitative trading strategy that generates trading signals by comparing fast and slow moving averages. It goes long when the fast MA crosses above the slow MA, and goes short when the fast MA crosses below the slow MA. The strategy aims to capture trend turning points on the medium-short term timeframe.

### Strategy Logic

1. Calculate the fast MA, typically 5-10 period EMA. 

2. Calculate the slow MA, typically 20-60 period SMA.

3. Go long when fast MA crosses above slow MA. 

4. Go short when fast MA crosses below slow MA.

5. Initiate new trades at each crossover.

The fast MA reacts swiftly to price changes and reflects the latest trend. The slow MA filters out low frequency noises and captures the major trend. Crossovers signal potential trend reversals for improved trading accuracy.

The flexible parameter settings can be optimized for different periods and market environments. 

### Advantages of the Strategy

- Fast and slow MAs combine for trend identification

- Clear and simple crossover signals

- Period optimization for different markets

- Easy to program and backtest

- Combinable with other indicators 

### Risk Warnings  

- Potential lagging of moving averages

- Possible false breakout signals 

- Prevent excessive trading frequency

- Entry and exit levels unclear

### Conclusion

The fast and slow MA crossover strategy judges trend turning points by comparing different MA periods, and is a classical and common quantitative trading approach. Parameters can be tuned and combined with other indicators to control risks and improve returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|fastLength|
|v_input_2|40|slowlength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Cruzameto 2MM", overlay=true)

fastLength = input(9)
slowlength = input(40)
//MACDLength = input(9)

delta = ema(close, fastLength) - sma(close, slowlength)
//aMACD = ema(MACD, MACDLength)
//delta = MACD - aMACD

if (crossover(delta, 0))
    strategy.entry("Compra", strategy.long, comment="2MM")

if (crossunder(delta, 0))
    strategy.entry("Venda", strategy.short, comment="2MM")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/426908

> Last Modified

2023-12-01 14:57:24
