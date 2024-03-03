
> Name

动量指标追踪短期价格变动策略-Price-Volume-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/115acb884d36056be41.png)
[trans]
## 

### 概述

该策略运用动量指标追踪短期价格变动,判断市场趋势方向,进行买入和卖出操作。策略名称为“Price Volume Trend Strategy”,反映了策略运用价格变动和成交量变动判断趋势的思路。

### 策略原理

该策略首先计算价格的动量。通过计算当前周期价格较上一周期价格的差值,可以反映最新一个周期内价格的绝对变动。正值表示价格上涨,负值表示价格下跌。然后计算这个差值的移动平均值,滤波处理,得到平均动量指标。 

当最新价格大于平均动量时,表示价格在上涨;当最新价格小于平均动量时,表示价格在下跌。根据这个指标判断价格趋势方向。结合成交量放大过滤,实际交易中只选择成交量较大的信号。

根据判断出的价格上涨和下跌趋势,进行相应的买入和卖出操作。

### 优势分析

- 策略判断趋势迅速,能快速捕捉短期价格变动,适合短线操作
- 通过成交量过滤,避免被虚假突破误导
- 实现了追涨杀跌的操作逻辑
- 交易频率高,适合积极的投资者

### 风险分析

- 容易受到市场异常波动的影响,存在一定的假信号风险
- 交易频繁带来的滑点风险
- 可能错过中长线趋势,长期盈利能力有待验证

### 优化方向

- 调整动量指标参数,优化判断效果
- 优化成交量过滤参数,提高信号质量
- 增加止损机制,控制单笔损失
- 结合更多因子判断,确保多因子驱动

### 总结 

该策略overall通过动量指标追踪价格短期变动趋势,快速判断买入和卖出时机。优点是操作迅速,追涨杀跌;缺点是信号质量和长期盈利能力有待考量。通过参数调整、风控机制增强,该策略可以成为高频策略的重要组成部分,与其他低频策略组合使用。

||

### Overview

This strategy uses momentum indicators to track short-term price movements and determine market trend directions for buy and sell operations. The strategy name "Price Volume Trend Strategy" reflects the idea of using price changes and volume changes to judge the trend.  

### Principles  

The strategy first calculates the momentum of prices. By calculating the difference between the current period price and the previous period price, it can reflect the absolute change in prices over the latest period. A positive value indicates a price increase, and a negative value indicates a price decrease. Then the moving average of this difference value is calculated for filtering to obtain the average momentum indicator.   

When the latest price is greater than the average momentum, it indicates that the price is rising. When the latest price is less than the average momentum, it indicates that the price is falling. Determine the price trend direction based on this indicator. Combined with volume amplification filtering, only signals with relatively large trading volumes are selected in actual trading.  

According to the identified upward and downward price trends, corresponding buy and sell operations are carried out.  

### Advantage Analysis  

- The strategy judges trends quickly and can quickly capture short-term price movements, which is suitable for short-term operations  
- Avoid being misled by false breakouts through volume filtering  
- Implemented the operating logic of chasing rises and killing falls  
- High trading frequency, suitable for aggressive investors  

### Risk Analysis  

- Vulnerable to the impact of abnormal market fluctuations, with certain false signal risks  
- Slippage risks caused by frequent trading  
- May miss medium and long term trends, and long-term profitability needs to be verified  

### Optimization Directions  

- Adjust the parameters of momentum indicators to optimize judgment effects  
- Optimize volume filtering parameters to improve signal quality  
- Increase stop-loss mechanisms to control single loss  
- Incorporate more factors to ensure multi-factor driven  

### Conclusion  

The strategy overall tracks short-term price change trends through momentum indicators, and quickly determines entry and exit timing. The advantages are fast operation, chasing rises and killing falls. The disadvantages are signal quality and long-term profitability need to be examined. Through parameter adjustments and enhanced risk control mechanisms, the strategy can become an important component of high-frequency strategies, combined with other low-frequency strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2019|From Year|
|v_input_4|12|To Month|
|v_input_5|31|To Day|
|v_input_6|2020|To Year|
|v_input_7|true|strength toggle |
|v_input_8|600|strength elimination|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-18 00:00:00
end: 2023-12-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © russtic

//@version=2

strategy("HA smoothed eliminator v2  ",pyramiding=1, slippage=10, default_qty_type=strategy.percent_of_equity, 
     commission_type=strategy.commission.percent, commission_value=0.075, overlay=true, 
     default_qty_value=100, initial_capital=1000)

FromMonth1 = input(defval=1, title="From Month", minval=1, maxval=12)
FromDay1 = input(defval=1, title="From Day", minval=1, maxval=31)
FromYear1 = input(defval=2019, title="From Year", minval=2010)
ToMonth1 = input(defval=12, title="To Month", minval=1, maxval=12)
ToDay1 = input(defval=31, title="To Day", minval=1, maxval=31)
ToYear1 = input(defval=2020, title="To Year", minval=2010)
start1 = timestamp(FromYear1, FromMonth1, FromDay1, 00, 00)
finish1 = timestamp(ToYear1, ToMonth1, ToDay1, 23, 59)
window1() => true
    
t1 = time(timeframe.period, "0300-1200")
t2 = time(timeframe.period, "0930-1700")
London = na(t1) ? na : green
NY = na(t2) ? na : red

bgcolor(London, title="London")
bgcolor(NY, title="New York")
///////////////////////////
// HA smoothed

len=(1 )
o=ema(open,len)
c=ema(close,len)
h=ema(high,len)
l=ema(low,len)

haclose = (o+h+l+c)/4
haopen = na(haopen[1]) ? (o + c)/2 : (haopen[1] + haclose[1]) / 2
hahigh = max (h, max(haopen,haclose))
halow = min (l, min(haopen,haclose))

len2=(len)
o2=ema(haopen, len2)
c2=ema(haclose, len2)
h2=ema(hahigh, len2)
l2=ema(halow, len2)

buy= (o2<c2) 

closebuy= (o2>c2)

sell= (o2>c2)

closesell= (o2<c2)

//
/// END NEW SCRIPT 

//
//
//                  MERGE SCRIPTS
a1= o2<c2
b1=o2>c2
is_uptrend = (a1)// and (p> 0)
is_downtrend =  (b1)// and (p <0)
barcolor(b1 ? red: a1 ? lime : blue)

//end


// =========================start     PVT -GIVES EACH BAR A VALUE
facton = (true)//, title="arrow elimination (factor) on ")
Length1 = 2//input(2, title="PVT Length", minval=1)

xPrice = close//input(title="Source", type=source, defval=close)
xsma = wma(xPrice, Length1) 
nRes = xPrice - xsma  
pos = iff(nRes > 0, 1,
	     iff(nRes < 0, -1, nz(pos[1], 0))) 
forex= input(true, title = 'strength toggle ')
forexyes = (forex == true)? 10000 : (forex == false)? 1: na

plot(nRes*forexyes , color=aqua, title="strength", transp=100)
// =========================         end pvt
//
//=============================     start factor // ELIMINATES  weak signals
//                  start trend
//
factor = input(600.00, title = "strength elimination") 
factor1 = factor - (factor*2)//input(-100.00, title = "sell strength elimination ") 
facton1 = (facton == true) and is_uptrend == 1 and nRes*forexyes>factor ? 1 : (facton == true) and is_downtrend == 1 and nRes*forexyes<factor1 ? -1 : (facton == false)
// ==================== =====
// 
//===========================    end factor
nRestrend = (nRes*forexyes)
//=========================== plot arrows 
plot1 = iff(is_uptrend[1] == 1, 0 , 1)  
plot2 = iff(is_downtrend[1]  == 1, 0 , 1)
uparrowcond =  is_downtrend ? false : nz(uparrowcond[1], false) == true ? uparrowcond[1] : (facton1 and is_uptrend and nRes*forexyes>factor)
downarrowcond =  is_uptrend ? false : nz(downarrowcond[1], false) == true ? downarrowcond[1] : (facton1 and is_downtrend and nRes*forexyes<factor1)
//prevarrowstate = uparrowcond  ? 1 : downarrowcond ? -1 : nz(prevarrowstate[1], 0)


candledir = (open < close)? 1: (open>close)? -1 : na // ONLY OPENS ON SAME BAR DIRECTION AS SIGNAL



up=nz(uparrowcond[1], false) == false and ( is_uptrend and nRes*forexyes>factor) and candledir ? 1:na
dn=nz(downarrowcond[1], false) == false and ( is_downtrend and nRes*forexyes<factor1) and candledir? -1:na



sig=0
if up==1 
    sig:=1
else
    if dn==-1
        sig:=-1
    else
        sig:=sig[1]
plotarrow(sig[1]!=1 and sig==1?1:na, title="BUY ARROW", colorup=lime, maxheight=80, minheight=50, transp=0)// up arrow 
plotarrow(sig[1]!=-1 and sig==-1?-1:na, title="SELL ARROW", colordown=red, maxheight=80, minheight=50, transp=0)// down arrow

//========================= alert condition
alertcondition(sig[1]!=1 and sig==1?1:na, title="BUY eliminator", message="BUY " ) 
alertcondition(sig[1]!=-1 and sig==-1?-1:na, title="SELL eliminator",  message="SELL ") 


strategy.entry("B", true, when=(sig[1]!=1 and sig==1?1:na) and window1())
strategy.entry("S", false,when=(sig[1]!=-1 and sig==-1?-1:na) and window1())







```

> Detail

https://www.fmz.com/strategy/436497

> Last Modified

2023-12-25 13:09:48
