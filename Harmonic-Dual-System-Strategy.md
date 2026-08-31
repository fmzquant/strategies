
> Name

Harmonic-Dual-System-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/21af4b36e3dade168fe.png)

Overview

This strategy uses multiple harmonic moving averages to construct trading signals. It first calculates the harmonic moving averages from 1st to 6th order, and then combines these moving averages to build dual long/short trading signals. It goes short when the short-term signal line crosses below the long-term one, and goes long when the short-term signal line crosses above.

Strategy Logic  

The strategy first defines a harm_average function to calculate the n-period harmonic moving average. Then it calculates the harmonic moving averages from 1st to 6th order, namely T1 to T6. Among them, T1 is the 3-period harmonic moving average, T2 is the 3-period harmonic moving average of T1, and so on.

After that, it constructs a Balance curve, which synthetically considers the inverse of the cubic harmonic moving averages from T1 to T6. This can reflect both short-term and long-term factors at the same time.

Finally, according to T1 to T6, it builds dual long/short cross-trading signals, where X1 takes the minimum of T1, T2 and T3, and X2 takes the maximum of T4, T5 and T6. It goes long when X1 crosses above X2, and goes short when X1 crosses below X2. Here X1 reflects short-term factors and X2 reflects long-term factors.  

Advantage Analysis  

1. Using multiple harmonic moving averages can effectively filter market noise and improve signal quality

2. Building dual long/short trading signals can timely capture trend turning points  

3. The Balance curve synthetically considers multiple timeframes, which can accurately judge trend direction

4. Adopting cube averaging can further highlight the role of intermediate variables and enhance strategy stability

Risk Analysis   

1. Harmonic averages themselves have high laggingness, which may miss short-term reversal opportunities

2. Excessive optimization with multiple averages may reduce strategy robustness  

3. Cube computations may amplify intermediate noise to some extent, resulting in certain false signals  

4. Dual crosses have some degree of laggingness, unable to timely capture turning points

Optimization Directions  

1. More types or higher orders of harmonic averages can be tested  

2. Introduce dynamic adjustment of average days to optimize the averaging system

3. Test different power parameters like squares and logs  

4. Incorporate more auxiliary indicators to verify signal quality

Summary  

This strategy uses a multiple harmonic averaging system to construct dual long/short trading signals. Compared with single averaging systems, this strategy can better identify trends and filter out noise. Meanwhile, the dual crosses can also timely capture market turning points. However, the multiple averaging and cube computations also introduce some laggingness and noise amplification. In the future, introducing dynamic parameter tuning and more auxiliary indicators may improve strategy stability and timeliness.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Harmonic System Strategy", overlay=true)

harm_average(x,y,z) =>3 / (1 / x + 1 / y + 1 / z)
T1 = harm_average(close[1], close[2], close[3])
T2 = harm_average(T1, T1[1], T1[2])
T3 = harm_average(T2, T2[1], T2[2])
T4 = harm_average(T3, T3[1], T3[2])
T5 = harm_average(T4, T4[1], T4[2])
T6 = harm_average(T5, T5[1], T5[2])
Balance = 18 / (1 / T1 * 3 + 1 / T2 * 3 + 1 / T3 * 3 + 1 / T4 * 3 + 1 / T5 * 3 + 1 / T6 * 3)

plot(T1,linewidth=2, color=color.green,title="T1")
plot(T2,linewidth=1, color=color.blue,title="T2")
plot(T3,linewidth=1, color=color.blue,title="T3")
plot(Balance,linewidth=2, color=color.black,title="Balance")
plot(T4,linewidth=1, color=color.blue,title="T4")
plot(T5,linewidth=1, color=color.blue,title="T5")
plot(T6,linewidth=2, color=color.red,title="T6")

X1 = min(min(T1,T2),T3)
X2 = max(max(T4,T5),T6)
X3 = min(T1,T2)
X4 = max(T3,T4)

Buy=crossover(X1,X2)
Sell=crossunder(X3,X4)

if crossover(X1,X2)
    strategy.entry("Long", strategy.long, comment="Long")

if crossunder(X3,X4)
    strategy.entry("Short", strategy.short, comment="Short")

```

> Detail

https://www.fmz.com/strategy/442520

> Last Modified

2024-02-22 15:49:06
