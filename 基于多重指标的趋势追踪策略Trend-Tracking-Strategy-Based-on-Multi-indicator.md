
> Name

基于多重指标的趋势追踪策略Trend-Tracking-Strategy-Based-on-Multi-indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11653b664cff670a19b.png)


## Overview

This strategy identifies trends by combining multiple indicators such as RSI, MA, EMA and Bollinger Bands to implement trend tracking. When a relatively ascending downtrend is identified, the strategy will establish a long position. On the contrary, when a relatively descending uptrend is identified, the strategy will establish a short position.

## Principle  

The core logic of this strategy is to identify price trends by combining RSI, MA, EMA and Bollinger Bands. Specifically, it simultaneously plots two MA lines, one set to 10 periods and the other set to 5 periods. At the same time, two EMA lines are drawn with parameters of 30 and 20 respectively. The RSI indicator parameter is set to 7.

When the closing price breaks below the 5-period MA line, 20-period EMA line and lower rail, while the RSI indicator breaks below the 25 overbought line, the strategy judges that prices are relatively ascending and will enter a long position.

On the contrary, when the closing price breaks above the 10-period MA line, 30-period EMA line and upper rail, while the RSI indicator breaks above the 75 oversold line, the strategy judges that prices are relatively descending and will enter a short position.

As you can see, this strategy identifies potential trends by combining the logic of price breaking the moving average and RSI indicator reversal, and then tracks that trend.

## Advantage Analysis  

The biggest advantage of this strategy is that it uses multiple indicators to identify trends, which can effectively reduce false signals. Specifically, the price must break through the moving average and Bollinger Bands simultaneously to trigger trading signals, and the RSI indicator must also undergo a Langarde turnaround, which filters out a lot of noise.

In addition, the strategy tracks relatively clear trends rather than short-term noise, which also increases the probability of profit. In general, this strategy has advantages such as flexible configuration, difficulty being arbitraged, and high probability of profit.

## Risk Analysis

It should be noted that no strategy can be 100% profitable, and this strategy is no exception. The main risk is that the combination judgment of multiple indicators goes wrong, resulting in wrong trades. In addition, sudden events can also invalidate the strategy.

To reduce risks, indicators parameters can be adjusted appropriately to optimize profitability. In addition, setting stop loss points to control single loss is also very necessary. Of course, unavoidable systemic risks require psychological preparation from investors.

## Optimization

The main optimizations for this strategy are:

1. Test combinations of more types of indicators to find better multi-indicator combinations;  

2. Optimize indicator parameters to improve strategy stability;

3. Increase machine learning models to assist judgment and improve accuracy;  

4. Increase adaptive stop-loss mechanisms to control risks;

5. Backtest optimization to improve stability and profitability.

## Conclusion

This strategy designed a set of relatively ascending tracking mechanism based on RSI, MA, EMA and Bollinger Bands, and enters directional positionss after judging price trends by combining multiple indicators. The integration of multiple indicators to judge can effectively reduce misjudgment probability and filter noise to a certain extent, tracking relatively clear trends. Of course, risk management also needs attention. Overall, this strategy has great optimization space, and can achieve better results with machine learning and other means.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|1.5|mult|
|v_input_4|75|Rsi yüksek|
|v_input_5|25|Rsi düşük|
|v_input_6|7|Rsi zaman|
|v_input_7|10|Ma üst|
|v_input_8|5|Ma alt|
|v_input_9|30|Ema üst|
|v_input_10|20|Ema alt|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-16 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © lepstick-TC
//@version=4
strategy("1", overlay=true)
length = input(5, minval=1)
src = input(close, title="Source")
mult = input(1.5, minval=0.001, maxval=50)
basis = sma(src, length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev
plot(basis, color=color.red)
p1 = plot(upper, color=color.blue)
p2 = plot(lower, color=color.blue)
fill(p1, p2)
rsicok=input(75,minval=0,title="Rsi yüksek")
rsiaz=input(25,maxval=50,title="Rsi düşük")
rsizaman=input(7,minval=0,title="Rsi zaman")
smadeger=input(10,minval=0,title="Ma üst")
smadeger2=input(5,minval=0,title="Ma alt")
emadeger=input(30,minval=0,title="Ema üst")
emadeger2=input(20,minval=0,title="Ema alt")
myrsi=rsi(close,rsizaman)
myrsi2=rsi(close,rsiaz)
myrsi3=rsi(close,rsicok)
myma=sma(close,smadeger)
myma2=sma(close,smadeger2)
myema=ema(close,emadeger)
myema2=ema(close,emadeger2)
mycond =myrsi >rsicok and close> myma and close>myema
mycond2=myrsi<rsiaz and close<myma2 and close<myema2
barcolor(mycond? #2196F3: na)
barcolor(mycond2? #FF9800: na)
plot(myma,title="Ma yüksek",color=color.black,linewidth=0)
plot(myma2,title="Ma düşük",color=color.blue,linewidth=0)
plot(myema,title="Ema yüksek",color=color.yellow,linewidth=0)
plot(myema2,title="Ema düşük",color=color.gray,linewidth=0)
idunno =close< sma(close,smadeger2) and close < sma(close,smadeger) and close<ema(close,emadeger)and close<ema(close,emadeger2)and crossunder(close,lower)and crossunder(myrsi,myrsi2)and crossunder(close,basis) 
plotchar(idunno,char="A",color=#808000 ,location=location.belowbar) 
idunno2 =close> sma(close,smadeger2) and close> sma(close,smadeger) and close>ema(close,emadeger)and close>ema(close,emadeger2)and crossover(close,upper)and crossover(myrsi,myrsi3)and crossover(close,basis)
plotchar(idunno2,char="S",color=#787B86 ,location=location.abovebar)
strategy.entry("Al",true,when =idunno)
strategy.entry("Sat",false,when = idunno2)
strategy.close("Al",when=ema(close,emadeger)and crossover(open,upper))
strategy.close("Sat",when=sma(close,smadeger2)and crossunder(open,lower))
//strategy.exit("Al çıkış","Al",limit=upper)
//strategy.exit("Sat çıkış","Sat",limit=lower)
//strategy.exit("Al çıkış","Al",trail_points=close*0.1/syminfo.mintick,trail_offset=close*0.005/syminfo.mintick)
//strategy.exit("Sat çıkış","Sat",trail_points=close*0.1/syminfo.mintick,trail_offset=close*0.005/syminfo.mintick)

```

> Detail

https://www.fmz.com/strategy/433012

> Last Modified

2023-11-23 15:43:02
