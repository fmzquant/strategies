
> Name

基于轨迹平均振幅的多时igkeit交易策略Gyroscopic-Bands-Strategy-Based-on-Multi-Time-Frame-and-Average-Amplitude

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4109adb0f8112a8410.png)

## Overview

This strategy is named "Gyroscopic Bands Strategy Based on Multi Time Frame and Average Amplitude". Its main idea is to construct trading signals based on the average amplitude between the price and a particle that fits the price trajectory.  

## Strategy Logic

The strategy first defines a particle that fits the price trajectory. Under the influence of gravity and inertia, the trajectory of the particle will oscillate around the price. Then we calculate the average deviation between the particle and the price, and use it to construct upper and lower bands. When the price breaks through the upper or lower band, trading signals are generated.  

Specifically, the particle position formula defined in the strategy is:  

```
pos:=if pos<close  
     nz(pos[1])+grav+traj
else
     nz(pos[1])-(grav)+traj 
```

Here `grav` represents the gravity term that makes the particle close to the price; `traj` represents the inertia term that keeps the particle's movement trend. The combination of these two items makes the particle oscillate around the price.  

Then we calculate the average deviation `avgdist` between the price and the particle, and use it to construct upper and lower bands:  

```
bbl=pos-sma(avgdist,varb)
bbh=pos+sma(avgdist,varb)  
```

Finally, go long when the price is greater than the upper band, and go short when less than the lower band.  

## Advantages  

Compared with traditional moving average strategies, this strategy has the following advantages:  

1. Use particle trajectories to better simulate price fluctuations;  
2. The upper and lower bands can be adaptively adjusted based on historical average amplitude, which is conducive to capturing breakthroughs;
3. Multi time frame design can switch between high and low time frames to capture more trading opportunities.  

## Risks   

This strategy also has some risks:   

1. Improper parameter settings of particle motion may cause false signals or miss signals;  
2. Signal conflicts may occur when switching between multiple time frames;
3. Breakthrough signals of upper and lower bands may increase stop loss risk.   

Corresponding risk management measures include: optimizing parameters to reduce false signals, defining clear time frame timing rules, setting appropriate stop loss positions, etc.  

## Optimization Directions   

This strategy can be optimized in the following aspects:  

1. Optimize particle motion related parameters to fit the price trajectory;  
2. Increase the number of time frame layers to confirm signals at higher time frames;  
3. Add volatility indicators to avoid signals during violent market fluctuations;   
4. Optimize stop loss strategies to reduce single stop loss.  

## Conclusion   

This strategy improves the moving average strategy by introducing price trajectory fitting. It has features like adaptive parameters, multi time frames, stop loss optimization, etc. The key is to find a suitable particle motion equation to simulate the price. Although further testing and optimization is needed, the basic idea is feasible and worth further research.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|leverage|
|v_input_2|4|variable a (10 to the power of __ |
|v_input_3|12|variable b|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-17 00:00:00
end: 2023-11-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//2 revert
strategy("Jomy's Gyroscopic Bands",precision=8,commission_value=.03,overlay=true,initial_capital =10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100,  pyramiding=0)//,calc_on_order_fills= true, calc_on_every_tick=false) 
leverage=input(1,"leverage")
a=0
a:= if volume > -1
    nz(a[1])+1
else
    nz(a)
    
vara=input(4.0,"variable a (10 to the power of __ ",step=.5)
vara:=pow(10,vara)
varb=input(12,"variable b")
pos=0.0
pos:=if a<=5
    close
else
    nz(pos[1])
grav=1/sqrt((close*close))*vara
traj=0.0
traj:=(nz(close[1])-nz(close[2])+nz(traj[1])*varb)/(varb+1)
pos:=if pos<close
    nz(pos[1])+grav+traj
else
    nz(pos[1])-(grav)+traj

plot(pos,color=color.white)
plot(close)

avgdist=abs(close-pos)
bbl=pos-sma(avgdist,varb)
bbh=pos+sma(avgdist,varb)

plbbh=plot(bbh,color=color.red)
plbbl=plot(bbl,color=color.red)

long = close>pos
short = close<pos

fill(plbbh,plbbl,color=long?color.lime:color.red)
//bgcolor(close>bbh?color.lime:close<bbl?color.red:na,transp=90)

strategy.entry("Long1",strategy.long,when=long,qty=(strategy.equity*leverage/open)) 
strategy.close("Long1",when=not long)
strategy.entry("Short1",strategy.short,when=short,qty=(strategy.equity*leverage/open)) 
strategy.close("Short1",when=not short)


//plot(strategy.equity,color=color.lime,linewidth=4)
```

> Detail

https://www.fmz.com/strategy/433147

> Last Modified

2023-11-24 17:29:39
