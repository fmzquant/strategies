
> Name

基于归一化MACD的量化交易策略Quantitative-Trading-Strategy-Based-on-Normalized-MACD

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种基于归一化MACD指标的量化交易策略。该策略对经典MACD策略进行了优化,以提高信号质量。

一、策略原理

该策略的核心思路是对传统MACD指标进行归一化处理,以降低误差率。具体步骤如下:

1. 计算短期和长期Hull移动平均线,根据其交叉关系判断大趋势;

2. 计算MACD指标的差值; 

3. 对MACD指标进行一定周期内的归一化处理;

4. 计算归一化MACD的均线,形成交易触发器;

5. 当归一化MACD上穿触发器均线时做多,下穿时做空;

6. 结合均线关系进行过滤,避免错失大趋势;

7. 设置止损止盈点,控制单笔交易风险。

归一化处理可以缩小MACD差值的绝对幅度,从而减少噪声,提高信号质量。趋势过滤也避免因局部调整而反向操作。止损止盈控制了单笔亏损。

二、策略优势

该策略相比简单MACD策略,最大的优势就是进行了归一化处理,这可以有效降低MACD的误差率,提高信号准确度。

另一个优势是加入了趋势判断的过滤器,避免在趋势中反向操作。这增强了策略的稳定性。

最后,设置止损止盈条件,也让每笔交易的风险收益可控,实现积极的资金管理。

三、潜在风险

尽管该策略进行了优化,但实际运用中也应注意以下风险:

首先是参数优化难度较大,不恰当设置可能导致过拟合。

其次,止损设置过于接近有可能被突破导致损失扩大。

最后,在趋势突变时,信号可能存在滞后,无法及时反应。

四、内容总结

本文详细介绍了一种对MACD指标进行归一化处理的量化交易策略。该策略对经典MACD策略进行了改进,可以有效提高信号质量,并加入风险管理机制。但依然需要注意参数优化难度及止损设置等问题。总体来说,该策略提供了一种可行的MACD策略优化思路。

||

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

[/trans]

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
