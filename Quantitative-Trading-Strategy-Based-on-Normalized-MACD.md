
> Name

Quantitative-Trading-Strategy-Based-on-Normalized-MACD

> Author

ChaoZhang

> Strategy Description



This article explains in detail a quantitative trading strategy based on normalized MACD indicator. It optimizes the classic MACD strategy to improve signal quality.

I. Strategy Logic

The core idea of this strategy is to normalize the traditional MACD indicator to reduce error rates. The specific steps are:

1. Calculate short and long period Hull moving averages and use their crossover for trend direction. 

2. Calculate the MACD difference.

3. Normalize the MACD over a certain period.

4. Calculate the moving average of normalized MACD as the trigger. 

5. Go long when normalized MACD crosses above trigger, and go short when crosses below.

6. Add trend filtering to avoid missing major moves. 

7. Set stop loss and take profit to control risk per trade.

Normalizing reduces the absolute magnitude of MACD differences, lowering noise for higher signal quality. Trend filtering avoids false reversals against the major trend. Stop loss and take profit controls loss per trade.

II. Advantages of the Strategy

Compared to simple MACD strategies, the biggest advantage is the normalization, which can effectively reduce MACD errors and improve signal accuracy. 

Another advantage is the addition of trend filtering to avoid false reversals. This enhances the stability of the strategy.

Lastly, the stop loss and take profit settings also ensures controllable risk-reward per trade for prudent money management.

III. Potential Weaknesses

Despite the optimizations, the following risks should be noted when trading in practice:

Firstly, the large parameter optimization difficulty may lead to overfitting if set inappropriately. 

Secondly, stop loss set too close risks being stopped out prematurely.

Lastly, signals may lag during trend transitions, failing to react in time.

IV. Summary 

In summary, this article has explained a quantitative trading strategy that normalizes the MACD indicator. It improves the classic MACD strategy to effectively enhance signal quality and incorporates risk management mechanisms. But parameter optimization difficulty and stop loss setting still need to be handled with prudence. Overall, it provides a viable approach to optimize MACD strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_ohlc4|0|p: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_2|21|HullMA cross|
|v_input_3|34|Trigger|
|v_input_4|50|Normalize|
|v_input_5|-420|Stop Loss in $|
|v_input_6|31|Target Point in $|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Normalized MACD but heavily modified by SeaSide420. Normalized MACD v420
strategy("Normalized MACD (v420)",shorttitle="NmacD(v420)",overlay=true, default_qty_type=strategy.percent_of_equity, max_bars_back=1440, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0) 
p=input(ohlc4)
jah=input(title="HullMA cross",defval=21)
tsp = input(34,title='Trigger')
np = input(50,title='Normalize')
SL = input(defval=-420.00, title="Stop Loss in $", step=1)
TP = input(defval=31.00, title="Target Point in $", step=1)
ot=1
n2ma=2*wma(p,round(jah/2))
nma=wma(p,jah)
diff=n2ma-nma
sqn=round(sqrt(jah))
n2ma1=2*wma(p[2],round(jah/2))
nma1=wma(p[2],jah)
diff1=n2ma1-nma1
sqn1=round(sqrt(jah))
n1=wma(diff,sqn)
n2=wma(diff1,sqn)
sh=n1
lon=n2
ratio = min(sh,lon)/max(sh,lon)
Mac = (iff(sh>lon,2-ratio,ratio)-1)
MacNorm = ((Mac-lowest(Mac, np)) /(highest(Mac, np)-lowest(Mac, np)+.000001)*2)- 1
MacNorm2 = iff(np<2,Mac,MacNorm)
Trigger = wma(MacNorm2, tsp)
Hist =(MacNorm2-Trigger)
Hist2= Hist>1?1:Hist<-1?-1:Hist
teh=MacNorm2+MacNorm2[2]-MacNorm2[1]
closelong = strategy.openprofit<SL or strategy.openprofit>TP or teh[1]<Trigger[1] and n1<n2[1]
if (closelong)
    strategy.close("Long")
closeshort = strategy.openprofit<SL or strategy.openprofit>TP or  teh[1]>Trigger[1] and n1>n2[1]
if (closeshort)
    strategy.close("Short")
longCondition = Trigger<0 and teh>Trigger and MacNorm>Trigger and strategy.opentrades<ot 
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = Trigger>0 and teh<Trigger and MacNorm<Trigger and strategy.opentrades<ot 
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/426846

> Last Modified

2023-09-14 20:01:07
