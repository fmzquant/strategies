
> Name

量化交易策略-开仓量化趋势跟踪Quantitative-Trading-Strategy-Quantity-Trend-Tracking-Opening

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e59caf2947ce810521.png)


### Overview

This strategy realizes the automatic opening operation of discovering quantity trends by tracking price movement trends and combined with changes in trading volume. The strategy uses the moving average system to judge the price change trend, and then combines the change of trading volume in the same direction as the opening confirmation signal.

### Strategy Principle

The core logic of the quantitative trading strategy quantity trend tracking opening is based on tracking the matching relationship between price movement trends and changes in trading volume. Specifically, the strategy uses the difference between the closing price and the opening price as the price change, and then multiplies it by the trading volume of the day to obtain the price and volume joint curve. This joint curve can reflect the price change trend and trading volume accompanies the relationship at the same time. Then calculate the moving average of this joint curve as the quantitative trend benchmark. When the joint curve penetrates its moving average, a buy signal is generated. When it falls below its moving average, a sell signal is generated, thereby realizing the opening operation of quantitative tracking of price trend changes.

### Advantage Analysis  

This strategy combines price movement trends and changes in trading volume to effectively filter out some price-insensitive false trends and reduce opening risks and improve opening accuracy. Compared with pure price technical indicators, the effect of quantitative tracking is better. This strategy also uses the moving average system to set dynamic benchmark lines, which can automatically adapt to changes in market conditions and has high flexibility.

### Risk Analysis

This strategy mainly relies on the price-volume relationship to determine the reasonableness of the quantitative trend. If the relationship between price and volume becomes unmatched, it will lead to an increase in misjudgment risks. In addition, improper setting of moving average parameters will also affect strategy effectiveness. Need to be optimized and tested for different varieties and market environments.

### Optimization Direction  

Consider joining more filters to optimize strategies, such as using volatility indicators to determine trend quality, introducing sentiment indicators to determine market psychology, and so on. It is also possible to test the change in strategy effectiveness under different moving average systems to find the optimal parameter portfolio. Adding machine learning model training to judge rules is also the direction for follow-up optimization.

### Summary   

This quantitative trading strategy realizes automatic opening based on tracking and judging the price trend and trading volume relationship, by quantifying matching price trends with trading enthusiasm, it can effectively filter out invalid signals and improve the success rate of opening. There is still a lot of room for optimization of strategies, which is worth continuing research and improvement.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1||resolution|
|v_input_timeframe_2|D|resolution|
|v_input_1|20|L for Vol|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2024-01-11 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © avsr90

//@version=5
strategy(title="Lp-Op vol",shorttitle="LPV", max_bars_back = 5000,overlay=false,format=format.volume )

//Resolutions

Resn=input.timeframe(defval="",title="resolution")
Resn1=input.timeframe(defval="D",title="resolution")

//Intraday Open and Last Price and Last price- Open Price calculations.

Last_Price=math.round_to_mintick(close)
Open_Price = request.security(syminfo.tickerid ,Resn1,close[1],barmerge.gaps_off, barmerge.lookahead_on) 
Op_Cl=math.round_to_mintick(Last_Price-Open_Price)


//length from Intra Day Open Price 
 
Nifnum= ta.change(Open_Price)
Length_Intraday=int(math.max(1, nz(ta.barssince(Nifnum)) + 1))

//Input for Length for Volume 

Length_Vol=input(defval=20, title="L for Vol")

// Last Price- Open price Volume, Average Intraday Last price-Open Price Volume 
//and  Volume Bars  calculations.

Op_Cl_Vol=(Op_Cl*volume)
Avg_Vol_Opcl=ta.sma(Op_Cl_Vol,Length_Intraday)
Vol_Bars=ta.sma(volume,Length_Vol)

//Plots 
plot(Op_Cl_Vol,color=Op_Cl_Vol>0 ? color.green:color.red,title="OPCLV")
plot(Avg_Vol_Opcl, title="Avg Vol", color=color.fuchsia)
plot(Vol_Bars, title="Vol Bars", color=color.yellow)

//Strategy parameters 

startst=timestamp(2015,10,1)

strategy.entry("lo",strategy.long,when= ta.crossover(Op_Cl_Vol,Avg_Vol_Opcl) and ta.crossover(volume,Vol_Bars))
strategy.entry("sh",strategy.short,when=ta.crossunder(Op_Cl_Vol,Avg_Vol_Opcl)and ta.crossunder(volume,Vol_Bars )) 


```

> Detail

https://www.fmz.com/strategy/438500

> Last Modified

2024-01-12 14:46:04
