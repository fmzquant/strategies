
> Name

易经模古市场分析策略Ichimoku-Cloud-Market-Analysis-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

易经模古市场分析策略是一种运用易经模古指标进行趋势判断和交易信号产生的量化交易策略。该策略根据价格突破云带,以及天线和基线的黄金交叉来判断牛熊趋势,并详细设定入场和出场的交易逻辑。该策略兼具趋势跟踪和震荡捕捉的功能。

### 策略原理

易经模古市场分析策略使用以下关键指标:

- 天线:7-9周期的移动平均线,代表短期趋势。 

- 基线:22-26周期的移动平均线,代表中期趋势。

- 云带:由前方线和后方线组成,代表长期趋势的支持和阻力区域。

- 致寸线:代表延迟后的当期价格。

交易信号的判断标准如下:

- 多头信号:价格和致寸线上穿云带,且天线上穿基线时,做多。

- 空头信号:价格和致寸线下穿云带,且天线下穿基线时,做空。

- 出场信号:价格触发与入场方向相反的交易信号时,平仓。

该策略的优势在于同时关注短中长三个周期的趋势态势,避免被单一周期误导。云带区域可起到强力的支持和阻力作用。而黄金交叉则可产生较准确的交易信号。

### 策略优势

- 同时关注多周期趋势,判断力强

- 云带区域形成支撑和阻力

- 黄金交叉产生精准信号 

- 结合趋势和震荡,系统性强

- 参数可调整,适应市场变化

### 风险警示

- 交易信号可能出现滞后

- 云带范围过窄或过宽会误判趋势

- 需要适当调整周期参数

- 该策略较复杂,需要一定学习成本

### 总结

易经模古市场分析策略综合运用多种指标判断趋势方向,在产生交易信号时及时入场。该策略同时兼顾趋势和震荡,可适用于多种市场环境。但需要注意指标参数的调整,并防止交易信号的滞后。如果掌握其运用,可以产生稳定的交易系统。


||


### Strategy Overview 

The Ichimoku Cloud market analysis strategy is a quantitative trading strategy that uses Ichimoku Cloud indicators for trend determination and trade signal generation. It identifies bullish and bearish trends based on price breakouts of the cloud bands and golden crosses of the Tenkan and Kijun lines, with detailed entry and exit trade logic. The strategy combines both trend following and swing catching capabilities.

### Strategy Logic

The Ichimoku Cloud strategy utilizes the following key indicators:

- Tenkan Line: 7-9 period moving average, representing short-term trend. 

- Kijun Line: 22-26 period moving average, representing medium-term trend.

- Cloud Bands: Consisting of Leading Span and Lagging Span, representing long-term trend support and resistance zones. 

- Chikou Line: The lagging current price.

The criteria for trade signals are:

- Long signal: When price and Chikou Line break above the cloud and Tenkan crosses above Kijun.

- Short signal: When price and Chikou Line break below the cloud and Tenkan crosses below Kijun. 

- Exit signal: When price triggers the opposite signal of entry direction.

The advantage of this strategy is considering the trends of short, medium and long three periods to avoid being misled by a single period. The cloud bands can act as strong support and resistance levels. The golden crossovers also generate relatively accurate trade signals.

### Advantages of the Strategy

- Considers multi-period trends for robust judgment 

- Cloud bands form support and resistance 

- Golden crosses generate precise signals

- Combines trend and swing, systematical strength 

- Adjustable parameters adaptable to market changes

### Risk Warnings

- Trade signals may have time lags

- Overly narrow or wide cloud range may misjudge trends

- Period parameters need proper adjustments

- Relatively complex system requires some learning

### Conclusion

The Ichimoku Cloud strategy comprehensively uses multiple indicators for trend direction and timely entry when signals emerge. It balances trend and swing, adaptable to various market environments. But parameter tuning and lagging signal prevention are important. When mastered, it can form a robust trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|ICHIMOKU KYNKO HYO|
|v_input_2|5.9|MULTIPLIER|
|v_input_3|0|SETTINGS: OCCIDENTAL 7-22-44-22|ORIENTAL 9-26-52-26|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-14 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Xaviz

//#####©ÉÉÉÉ¶N###############################################
//####*..´´´´´´,,,»ëN########################################
//###ë..´´´´´´,,,,,,''%©#####################################
//###'´´´´´´,,,,,,,'''''?¶###################################
//##o´´´´´´,,,,,,,''''''''*©#################################
//##'´´´´´,,,,,,,'''''''^^^~±################################
//#±´´´´´,,,,,,,''''''''^í/;~*©####æ%;í»~~~~;==I±N###########
//#»´´´´,,,,,,'''''''''^;////;»¶X/í~~/~~~;=~~~~~~~~*¶########
//#'´´´,,,,,,''''''''^^;////;%I^~/~~/~~~=~~~;=?;~~~~;?ë######
//©´´,,,,,,,''''''''^^~/////X~/~~/~~/~~»í~~=~~~~~~~~~~^;É####
//¶´,,,,,,,''''''''^^^;///;%;~/~~;í~~»~í?~?~~~?I/~~~~?*=íÑ###
//N,,,,,,,'''''''^^^^^///;;o/~~;;~~;£=»í»;IX/=~~~~~~^^^^'*æ##
//#í,,,,,''''''''^^^^^;;;;;o~»~~~~íX//~/»~;í?IíI»~~^/*?'''=N#
//#%,,,'''''''''^^^^^^í;;;;£;~~~//»I»/£X/X/»í*&~~~^^^^'^*~'É#
//#©,,''''''''^^^^^^^^~;;;;&/~/////*X;í;o*í»~=*?*===^'''''*£#
//##&''''''''^^^^^^^^^^~;;;;X=í~~~»;;;/~;í»~»±;^^^^^';=''''É#
//##N^''''''^^^^^^^^^^~~~;;;;/£;~~/»~~»~~///o~~^^^^''''?^',æ#
//###Ñ''''^^^^^^^^^^^~~~~~;;;;;í*X*í»;~~IX?~~^^^^/?'''''=,=##
//####X'''^^^^^^^^^^~~~~~~~~;;íííííí~~í*=~~~~Ií^'''=''''^»©##
//#####£^^^^^^^^^^^~~~~~~~~~~~íííííí~~~~~*~^^^;/''''='',,N###
//######æ~^^^^^^^^~~~~~~~~~~~~~~íííí~~~~~^*^^^'=''''?',,§####
//########&^^^^^^~~~~~~~~~~~~~~~~~~~~~~~^^=^^''=''''?,íN#####
//#########N?^^~~~~~~~~~~~~~~~~~~~~~~~~^^^=^''^?''';í@#######
//###########N*~~~~~~~~~~~~~~~~~~~~~~~^^^*'''^='''/É#########
//##############@;~~~~~~~~~~~~~~~~~~~^^~='''~?'';É###########
//#################É=~~~~~~~~~~~~~~^^^*~'''*~?§##############
//#####################N§£I/~~~~~~»*?~»o§æN##################

//@version=4
strategy("EASYMOKU INDICATOR", overlay = true, initial_capital = 10000, currency = "USD", commission_value = 0.04)

// Initial Ichimoku inputs
Act_IKH = input(true, "ICHIMOKU KYNKO HYO")
Multiplier = input(5.9, "MULTIPLIER", minval = 0.1, type = input.float, step = 0.1)
Settings_input = input("OCCIDENTAL 7-22-44-22", "SETTINGS", options = ["ORIENTAL 9-26-52-26", "OCCIDENTAL 7-22-44-22"])
Settings(_oriental,_occidental) => round(((Settings_input == "ORIENTAL 9-26-52-26") ? _oriental : _occidental)*Multiplier)
tenkanPeriods = Settings(9,7)
kijunPeriods = Settings(26,22)
sekouBPeriods = Settings(52,44)
displacement = Settings(26,22)

// Ichimoku Calculations
donchian(_len) => avg(lowest(_len), highest(_len))
tenkan = donchian(tenkanPeriods)
kijun = donchian(kijunPeriods)
senkouA = avg(tenkan, kijun)
senkouB = donchian(sekouBPeriods)

// KUMO Conditions
var bool KUMO_Cond = na
KUMO_Cond := (close > senkouA[displacement-1] and close > senkouB[displacement-1]) ? 1 : (close < senkouA[displacement-1] and close < senkouB[displacement-1]) ? 0 : na

// CHIKOU Conditions
var bool CHIKOU_Cond = na
CHIKOU_Cond := (close > senkouA[2*displacement] and close > senkouB[2*displacement]) ? 1 : (close < senkouA[2*displacement] and close < senkouB[2*displacement]) ? 0 : na

// TENKAN & KIJUN Crossings Conditions
var bool TENKAN_KIJUN = na
TENKAN_KIJUN := crossover(tenkan,kijun) ? 1 : crossunder(tenkan,kijun) ? -1 : nz(TENKAN_KIJUN[1])

// Plottings
t = plot(Act_IKH ? tenkan : na, color = color.lime, linewidth = 2, title = "TENKAN SEN")
k = plot(Act_IKH ? kijun : na, color = color.red, linewidth = 2, title = "KIJUN SEN")
c = plot(Act_IKH ? close : na, offset = -displacement+1, color = color.aqua, title = "CHIKOU SPAN")
sA = plot(Act_IKH ? senkouA : na, offset = displacement-1, color = color.green, title = "SENKOU A")
sB = plot(Act_IKH ? senkouB : na, offset = displacement-1, color = color.red, title = "SENKOU B")
fill(sA, sB, title = "KUMO", color = senkouA > senkouB ? color.green : color.red)

// Bar colors according to Ichimoku Conditions    
barcolor(KUMO_Cond == 1 and CHIKOU_Cond == 1 ? color.lime : KUMO_Cond == 0 and CHIKOU_Cond == 0 ? color.red : color.orange)

// Strategy
if KUMO_Cond == 1 and CHIKOU_Cond == 1
    strategy.entry("LONG", strategy.long, when = TENKAN_KIJUN == 1)
    strategy.close("LONG", comment = "XLONG", when = TENKAN_KIJUN == -1)
if KUMO_Cond == 0 and CHIKOU_Cond == 0
    strategy.entry("SHORT", strategy.short, when = TENKAN_KIJUN == -1)
    strategy.close("SHORT", comment = "XSHORT", when = TENKAN_KIJUN == 1)
```

> Detail

https://www.fmz.com/strategy/426901

> Last Modified

2023-12-01 14:58:48
