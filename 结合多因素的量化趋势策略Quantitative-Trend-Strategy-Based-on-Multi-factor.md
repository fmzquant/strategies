
> Name

结合多因素的量化趋势策略Quantitative-Trend-Strategy-Based-on-Multi-factor

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/bb20fc9398e1e42373.png)
[trans]

## 概述

这个策略综合考虑了成交量,波动幅度,收盘位置,趋势等多种因素,对交易机会进行识别,属于典型的多因子量化策略。

## 策略原理

这个策略的核心思路是结合成交量异常突破、收盘位置、波动幅度等多种因素来识别买卖点。

具体来说,策略会计算过去一段时间内的平均成交量,当当前周期的成交量出现明显异常突破就可能预示着趋势的转变。此外,如果收盘价格接近波动幅度的上沿或下沿,也意味着目前的趋势可能逆转。结合成交量和收盘位置这两个因素,可以初步判断买卖点。

为了验证买卖点,该策略还会结合波动幅度指标来判断。如果波动突破过去一段时间的平均值,就会形成买卖信号的第一条件。然后,如果上涨周期的收盘价格在波动幅度的下半段,且成交量增大,则产生卖出信号。相反,如果下跌周期的收盘价格在波动幅度的上半段,且成交量减小,则产生买入信号。

此外,该策略还会结合均线指标判断整体趋势,如果出现了中长线上的趋势改变,也会作为产生买卖信号的条件。

通过上述多种指标的结合,这个策略能够全面判断市场的买卖时机。

## 策略优势

该策略最主要的优势在于综合考虑多种因素来决策,使结果更加可靠。具体来说,主要有以下几个方面的优势:

1. 考虑成交量异常突破,可以提前检测到趋势转变的迹象。
2. 通过波动幅度和收盘位置判断真实趋势,避免被短期市场噪音误导。
3. 结合中长期均线判断整体趋势方向,确保策略符合大市趋势运行。
4. 多因子综合判断使策略更加稳定和可靠,避免出现大额亏损。

## 策略风险

该策略也存在一些风险需要注意:

1. 多因子结合判断较为复杂, parameter tuning较难。
2. 不能完全避免被假突破误导产生不必要的交易。
3. 如果判断主趋势错误,整体运行效果会打折扣。
4. 波动率参数设置需要根据不同市场环境调整。

## 优化方向

该策略还有以下几个主要的优化方向:

1. 使用机器学习等方法自动优化 parameter。
2. 加入止损策略管理风险。
3. 结合更多因子如资金流向等判断主趋势。 
4. 设计自适应波动率参数。

## 总结

该策略综合考虑多种因素识别交易机会。策略优势在于判断全面,稳定可靠;主要风险在参数确定和主趋势判断错误;未来可通过机器学习等方式进行参数优化。总体而言,该策略思路合理,实盘效果值得期待。

||

## Overview 

This strategy comprehensively considers factors like trading volume, volatility, closing price position, trend, etc. to identify trading opportunities. It belongs to the typical multi-factor quantitative strategy.

## Strategy Principle  

The core idea of this strategy is to identify entry and exit points by combining abnormal breakthroughs in trading volume, closing position, volatility range and other factors.  

Specifically, the strategy calculates the average trading volume over a period of time. When the current period's trading volume shows significant abnormal breakthrough, it may indicate a trend reversal. In addition, if the closing price is near the upper or lower limit of the volatility range, it also implies a possible trend reversal. By combining trading volume and closing position, potential entry and exit points can be initially judged.

To verify the trading signals, this strategy also takes volatility range into consideration. If the current volatility breaks through the average level over a period, it forms the first condition of trading signals. Then if the closing price of an up bar falls in the lower half of the volatility range with increasing volume, a sell signal is generated. On the contrary, if the closing price of a down bar lies in higher half of the volatility range with decreasing volume, then a buy signal is produced.

In addition, this strategy also employs moving average to determine the overall trend. Reversal of the medium-long term trend will also act as a condition for producing trading signals.

By integrating above indicators, this strategy can effectively identify entry and exit points of the market.  

## Advantages

The biggest advantage of this strategy is that it takes multiple factors into account for decision making, making the trading signals more reliable. Main advantages are:

1. Detect signs of trend reversal early by abnormal trading volume.  
2. Determine real trend by volatility range and closing position, avoiding short-term noises.
3. Ensure strategy align with major trend by checking medium-long term moving average. 
4. Reducing losses by verifying signals from multiple aspects.

## Risks

There are also several risks of this strategy:

1. Complex to optimize parameters with multiple factors.  
2. Unable to completely avoid false signals.
3. Wrong major trend judgment can negatively impact overall performance.  
4. Volatility parameters need adjustments among varying market environments.

## Optimization Directions 

Major aspects that this strategy can be optimized:

1. Use machine learning models to auto tune parameters.
2. Add stop loss mechanisms to control risks.
3. Integrate more factors like money flows to determine major trends.
4. Design adaptive volatility parameter.

## Conclusion

This strategy identifies trading chances by taking various factors into account. The advantages lie in comprehensive signaling mechanisms and steady performance, while main risks come from parameter tuning and inaccurate major trend prediction. Some techniques like machine learning can be applied for further optimization in the future. Overall speaking, this is a strategy with sound rationale and promising practical performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|short term min periods|
|v_input_2|8|short term max periods|
|v_input_3|10|long term min periods|
|v_input_4|40|long term max periods|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2024-01-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("volume spread analysis ", overlay=true)

volavg = sma(volume,40)
c= close
l=low
h=high
v=volume

volmean 			= 	stdev(volavg,30) 
volupband3 			= 	volavg + 3*volmean 
volupband2 			= 	volavg + 2*volmean 
volupband1 			= 	volavg + 1*volmean 
voldnband1 			= 	volavg -1*volmean 
voldnband2 			= 	volavg -2*volmean 
midprice			=	(high+low)/2
spread				=	(high-low)
avgspread			=	sma(spread,80)
avgspreadbar     	=   spread > avgspread
widerangebar		=	spread>(1.5*avgspread)
narrowrangebar	    =	spread<(0.7*avgspread)
lowvolume			=	volume<volume[1] and volume<volume[2]
upbar				=	close>close[1] 
downbar			    =	close<close[1] 
highvolume			=	volume>volume[1] and volume[1]>volume[2]
closefactor		    =	close-low
clsposition 		=	spread/closefactor

closeposition		=	iff(closefactor==0,avgspread,clsposition)
vb					=	volume>volavg or volume>volume[1]
upclose			    =	close>=((spread*0.7)+low)// close is above 70% of the bar
downclose			=	close<=((spread*0.3)+low)// close is below the 30% of the bar
aboveclose			=	close>((spread*0.5)+low)// close is between 50% and 70% of the bar
belowclose			=	close<((spread*0.5)+low)// close is between 50% and 30% of the bar
midclose			=	close>((spread*0.3)+low) and c<((spread*0.7)+l)// close is between 30% and 70% of the bar
verylowclose		=	closeposition>4//close is below 25% of the bar
veryhighclose		=	closeposition<1.35// close is above 80% of the bar
closepos			= 	iff(close<=((spread*0.2)+low),1,iff(close<=((spread*0.4)+low),2,iff(close<=((spread*0.6)+low),3,iff(close<=((spread*0.8)+low),4,5))))
                    // 1 = downclose, 2 = belowclose, 3 = midclose, 4 = aboveclose, 5 = upclose
volpos				=  	iff(volume>volavg*2,1,iff(volume>volavg*1.3,2,iff(volume>volavg,3,iff(volume<volavg and volume>volavg*0.7,4,5))))
                    //// 1 = very high, 2 = high, 3 = above average, 4 = less than average, 5 = low
freshgndhi          =  close > highestbars(h,5)
freshgndlo          =  close < lowestbars(l,5)



//========================trend estimation =========================
//jtrend=sma(close,5)
//trendlongterm     =  linreg(jtrend,40) 
//trendmediumterm   =  linreg(jtrend,10) 
//trendshortterm    =  linreg(jtrend,3)
//tls=linreg(jtrend,3)

minperiodsrwist = input(title="short term min periods",  defval=2, minval=1)
maxperiodsrwist = input(title="short term max periods",  defval=8, minval=1)


minperiodsrwilt = input(title="long term min periods",  defval=10, minval=1)
maxperiodsrwilt = input(title="long term max periods",  defval=40, minval=1)

rwhmins = (high - nz(low[minperiodsrwist])) / (atr(minperiodsrwist) * sqrt(minperiodsrwist))
rwhmaxs = (high - nz(low[maxperiodsrwist])) / (atr(maxperiodsrwist) * sqrt(maxperiodsrwist))
rwhs = max( rwhmins, rwhmaxs )

rwlmins = (nz(high[minperiodsrwist]) - low) / (atr(minperiodsrwist) * sqrt(minperiodsrwist))
rwlmaxs = (nz(high[maxperiodsrwist]) - low) / (atr(maxperiodsrwist) * sqrt(maxperiodsrwist))
rwls = max( rwlmins, rwlmaxs )


rwhminl = (high - nz(low[minperiodsrwilt])) / (atr(minperiodsrwilt) * sqrt(minperiodsrwilt))
rwhmaxl = (high - nz(low[maxperiodsrwilt])) / (atr(maxperiodsrwilt) * sqrt(maxperiodsrwilt))
rwhl = max( rwhminl, rwhmaxl )

rwlminl = (nz(high[minperiodsrwilt]) - low) / (atr(minperiodsrwilt) * sqrt(minperiodsrwilt))
rwlmaxl = (nz(high[maxperiodsrwilt]) - low) / (atr(maxperiodsrwilt) * sqrt(maxperiodsrwilt))
rwll = max( rwlminl, rwlmaxl )





ground = rwhs
sky    = rwls  
j      = rwhs-rwls
k      = rwhl-rwll
j2     = rwhl 
k2     = rwll  
ja     = cross(j,1) 
jb     = cross(1,j) 
jc     = cross(-1,j)
jd     = cross(j,-1)
j2a    = cross(j2,1)
j2b    = cross(1,j2)
k2a    = cross(k2,1)
k2b    = cross(1,k2)
upmajoron   = j > 1 and ja[1]
upmajoroff  = j < 1 and jb[1]
upminoron   = j2 > 1 and j2a[1]
upminoroff  = j2 < 1 and j2b[1]
dnmajoron   = j < -1 and jc[1]
dnmajoroff  = j > -1 and jd[1]
dnminoron   = k2 > 1 and k2a[1]
dnminoroff  = k2 < 1 and k2b[1]
upimd       = iff(ground > 1, 1,0)
dnimd       = iff(sky > 1, 1, 0)
upmajor     = iff(j>1,1,iff(j<(-1),-1,0))
upminor     = iff(j2>1,1,-1)
dnminor     = iff(k2>1,1,-1)
//======================================================================|

Buy_stop = lowest(low[1],5) - atr(20)[1]
plot(Buy_stop, color=red, title="buy_stoploss")
Sell_stop = highest(high[1],5) + atr(20)[1] 
plot(Sell_stop, color=green, title="sell_stoploss")

//======================================================================| 

//upthrustbar		=	widerangebar and downclose  and upimd==1 and high>high[1]  //wrb and uhs and fresh ground
nut              	=       widerangebar and downclose  and freshgndhi and highvolume // new signal
bc               	=       widerangebar and aboveclose and volume == highest(volume,60) and upmajor==1  // new signal
upthrustbar		=	widerangebar and (closepos==1 or closepos==2) and upminor>0 and high>high[1] and (upimd>0or upmajor>0) and volpos <4// after minor up trend
upthrustbartrue		=	widerangebar and closepos==1 and upmajor>0 and high>high[1] and volpos <4//occurs after a major uptrend
upthrustcond1		=	upthrustbar[1] and downbar and not narrowrangebar 
upthrustcond2		=	upthrustbar[1] and downbar and volpos == 2
upthrustcond3		=	upthrustbar and volpos ==1
toprevbar		=	volume[1]>volavg  and upbar[1] and widerangebar[1] and downbar and downclose and widerangebar and upmajor>0 and high==highest(high,10)
pseudoupthrust		=	upbar[1] and high>high[1] and volume[1]>1.5*volavg and downbar and downclose and  not upthrustbar
pseudoutcond		=	pseudoupthrust[1] and downbar and downclose and not upthrustbar
trendchange		=	upbar[1] and high==highest(high,5) and downbar and (downclose or midclose) and volume>volavg and upmajor>0 and upimd>0 and not widerangebar and not pseudoupthrust 
nodemandbarut		=	upbar and narrowrangebar and lowvolume and closepos> 3 and ((upminor>0 and upimd>0)or (upminor<0 and upminor>0))//in a up market
nodemandbardt		=	upbar and narrowrangebar and lowvolume and closepos> 3 and (upminor<=0or upimd<=0)// in a down or sidewayss market
nosupplybar		=	downbar and narrowrangebar and lowvolume  and closepos<3 and ((upminor<1 and upimd<1)or (upminor>0 and upimd<1))
lowvoltest		=   	low==lowest(low,5) and upclose and lowvolume//lowvolume and l<low[1] and upclose
lowvoltest1		= 	low==lowest(low,5) and volume<volavg and low<low[1] and upclose and upminor>0 and upmajor>0// and widerangebar
lowvoltest2		= 	lowvoltest[1] and upbar and upclose
sellcond1		=	(upthrustcond1 or upthrustcond2 or upthrustcond3) 
sellcond2		=	sellcond1[1]==0
sellcond		=	sellcond1 and sellcond2
strengthdown0		= 	upmajor<0 and volpos<4 and downbar[1] and upbar and closepos>3 and upminor<0 and upimd<=0// strength after a long down trend
strengthdown		= 	volpos<4 and downbar[1] and upbar and closepos>3 and upimd<=00 and upminor<0// strength after a down trend
strengthdown1		= 	upmajor<0 and volume>(volavg*1.5) and downbar[1] and upbar and closepos>3 and upminor<0 and upimd<=0//strength after downtrend . high volume
strengthdown2		=	upimd<=0 and volume[1]<volavg  and upbar and veryhighclose and volpos<4
buycond1		= 	strengthdown or strengthdown1
buycond			= 	upbar  and buycond1[1]
stopvolume		= 	low==lowest(low,5)  and (upclose or midclose) and v>1.5*volavg and upmajor<0
revupthrust		=	upmajor<0 and upbar and upclose and volume>volume[1] and volume>volavg and  widerangebar and downbar[1] and downclose[1] and upminor<0
effortup		=	high>high[1] and low>low[1] and close>close[1] and close>=((high-low)*0.7+low) and spread>avgspread and volpos<4//and open<=((high-low)*0.3+low) 
effortupfail		=	effortup[1] and (upthrustbar or upthrustcond1 or upthrustcond2 or upthrustcond3 or (downbar and avgspreadbar))
effortdown		=	high<high[1] and low<low[1] and close<close[1] and  close<=((high-low)*0.25+low) and widerangebar and volume>volume[1]//o>=((high-low)*0.75+
effortdownfail  	=  	effortdown[1] and ((upbar and avgspreadbar)or revupthrust or buycond1)
upflag           	=  	(sellcond or buycond or effortup or effortupfail or stopvolume or effortdown or effortdownfail or revupthrust or nodemandbardt or nodemandbarut or nosupplybar or lowvoltest	or lowvoltest1 or lowvoltest2 or bc)
bullbar			=	(volume>volavg or volume>volume[1]) and closeposition <2 and upbar and not upflag
bearbar			=	vb  and downclose and downbar and spread>avgspread and not upflag 
buy =	(upbar and revupthrust[1])or lowvoltest2
burely				=	strengthdown1 and stopvolume[1]or (upbar and revupthrust[1])or lowvoltest2
//buy				=	effortup and lowvoltest2[1] 
//sell			=	upthrustbartrue
sell			=	effortup[1] and effortupfail and upthrustcond3 and upthrustbartrue and toprevbar

strategy.entry("simpleBuy", strategy.long, when= (upbar and revupthrust[1])or lowvoltest2 )
strategy.close("simpleBuy",when=upthrustbartrue )
    
//strategy.entry("simpleSell", strategy.short,when= upthrustbartrue )
//strategy.close("simpleSell",when= (upbar and revupthrust[1])or lowvoltest2)
    




//|============================================================================================|
//data = close >= open
//plotshape(true, style=shape.flag, color=data ? green : red)

plotshape((upthrustbar or upthrustbartrue)	,title="upthrustbaro"	,style=shape.arrowdown		,size=size.huge,color=red	)
//plotshape(toprevbar					        ,title="toprevbar"  	,style=shape.flag		,size=size.small,color=blue	)
//plotshape((pseudoupthrust)			    	,title="(pseudoupthrus"	,style=shape.circle		,size=size.small,color=blue	)
//plotshape((upthrustcond1 or upthrustcond2)	,title="upthrustcond1"	,style=shape.triangleup		,size=size.small,color=red	)
plotshape(trendchange		    			,title="trendchange"	,style=shape.xcross		,size=size.small,color=red	)
//plotshape((nodemandbardt)		    		,title="(nodemandbardt"	,style=shape.square		,size=size.small,color=orange	)
//plotshape(nosupplybar				    	,title="nosupplybar"	,style=shape.cross		,size=size.small,color=blue)
plotshape(revupthrust				    	,title="revupthrust"	,style=shape.arrowup		,size=size.huge,color=green	)
//plotshape((upthrustbar	or	upthrustbartrue)	,title="upthrustbaro"	,style=shape.cross		,size=size.small,color=red	)
//plotshape((upthrustcond1	or	upthrustcond2)	,title="upthrustcond1"	,style=shape.triangledown	,size=size.small,color=white	)
//plotshape((pseudoupthrust)				,title="(pseudoupthrus"	,style=shape.arrowup		,size=size.small,color=blue	)
//plotshape(nodemandbarut					,title="nodemandbarut"	,style=shape.labelup		,size=size.small,color=orange	)
//plotshape(nodemandbarut					,title="nodemandbarut"	,style=shape.labeldown		,size=size.small,color=yellow	)
//plotshape(nodemandbardt					,title="nodemandbardt"	,style=shape.diamond      	,size=size.small,color=yellow	)
//plotshape(nosupplybar					,title="nosupplybar"	,style=shape.xcross		,size=size.small,color=blue	)
plotshape(lowvoltest					,title="lowvoltest"	,style=shape.triangleup		,size=size.small,color=blue	)
//plotshape(lowvoltest2					,title="lowvoltest2"	,style=shape.triangledown	,size=size.small,color=yellow	)
//plotshape(strengthdown					,title="strengthdown"	,style=shape.flag		,size=size.small,color=green)
//plotshape(strengthdown					,title="strengthdown"	,style=shape.circle		,size=size.small,color=lime	)
//plotshape(strengthdown2					,title="strengthdown2"	,style=shape.arrowup		,size=size.small,color=silver	)
//plotshape(strengthdown2					,title="strengthdown2"	,style=shape.arrowdown		,size=size.small,color=red	)
//plotshape(stopvolume					,title="stopvolume"	,style=shape.labelup		,size=size.small,color=green	)
//plotshape(stopvolume					,title="stopvolume"	,style=shape.labeldown		,size=size.small,color=yellow	)
plotshape(effortup					,title="effortup"	,style=shape.diamond      	,size=size.small,color=lime	)
plotshape(effortupfail					,title="effortupfail"	,style=shape.xcross		,size=size.small,color=blue	)
//plotshape(effortupfail					,title="effortupfail"	,style=shape.cross		,size=size.small,color=white	)
plotshape(effortdown					,title="effortdown"	,style=shape.triangledown		,size=size.small,color=red	)
plotshape(effortdownfail				,title="effortdownfail"	,style=shape.xcross	,size=size.small,color=green	)
//plotshape(effortdownfail				,title="effortdownfail"	,style=shape.flag		,size=size.small,color=white	)
//plotshape(buycond					,title="buycond"	,style=shape.circle		,size=size.small,color=green	)
//plotshape(sellcond					,title="sellcond"	,style=shape.arrowup		,size=size.small,color=orange	)
//plotshape((nut)						,title="(nut)"		,style=shape.arrowdown		,size=size.small,color=lime	)
//plotshape((bc	)					,title="(bc"		,style=shape.labelup		,size=size.small,color=red	)
//plotshape(buy						,title="buy"		,style=shape.labeldown		,size=size.small,color=white	)









```

> Detail

https://www.fmz.com/strategy/438455

> Last Modified

2024-01-12 11:09:40
