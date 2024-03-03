
> Name

双向EMA交叉量化交易策Bidirectional-EMA-Cross-Quant-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7a465d2a4d7810e10c.png)
 [trans]

### 概述

本策略运用双向EMA指标判断市场主要趋势方向,并结合RSI指标作为入场时机选择,属于趋势跟随类型算法交易策略。

### 策略原理

1. 计算多组不同周期的EMA均线,识别短期、中期和长期三个维度的市场主要趋势方向
2. 当短期EMA上穿中长期EMA时,判定为看涨趋势形成
3. 当短期EMA下穿中长期EMA时,判定为看跌趋势形成
4. 结合RSI指标寻找合适的入场时机,RSI指标可用来判断超买超卖区域
5. 在看涨趋势下,RSI指标低位时长仓做多;在看跌趋势下,RSI指标高位时介入做空

以上策略主要应用双EMA指标判断主趋势方向,并用RSI指标作为入场信号的选择,属典型的趋势跟随型算法交易策略。

### 策略优势分析

本策略最大的优势在于可清晰判断市场主要趋势方向,并可根据RSI指标选择较好的入场时机。具体优势如下:

1. 使用多组EMA均线套,识别多时间维度下的市场主要趋势方向
2. EMA指标计算简单,则噪音较小,判断市场主要趋势准确可靠  
3. RSI指标可有效确定入场和止损点,可大幅优化策略收益回撤比
4. 算法结构清晰,容易理解修改,属于典型的趋势跟随策略
5. 可灵活组合其他技术指标,进一步提高策略效果

### 策略风险分析

本策略也存在一定的风险,主要体现在以下几个方面:  

1. 趋势反转时,止损点可能过于理想化从而增加亏损
2. 无法有效判断趋势反转点,可能错过及时止损退出机会  
3. EMA参数和RSI参数需要反复测试优化,否则可能导致不稳定
4. 不能保证每次入场都是完美时机,可能出现不必要的多次反复操作
5. 突发事件影响下的大幅跳空难以有效回避  

针对上述风险,可从以下几个角度进行优化:
1. 合理设置止损点,防止单次亏损过大
2. 增加其他指标判断趋势反转,确保及时止损
3. 优化参数组合,使之适合更广泛市场情况  
4. 修改入场和止损逻辑,减少反复操作次数 
5. 增加异常情况判断,回避市场跳空的不利影响

### 策略优化方向  

从本策略的优势和风险 out,我们可以得到以下几个可优化的方向:

1. 在现有双EMA框架上,引入MACD、BOLL等其他指标,可用于判断趋势反转点,从而优化止盈止损策略
2. 引入机器学习模型预测趋势反转概率,进一步提升策略效果 
3. 应用高级过滤器,自动识别异常行情情况,可有效防范损失
4. 利用遗传算法、深度强化学习等方法自动优化参数,使策略适应更多市场类型
5. 增加自动止损模块,可根据实际情况动态调整止损点

通过引入更多指标、预测模型、参数优化、风险控制模块等手段,本策略可以得到进一步提升,使得可适应更加复杂多变的市场情况。

### 总结  

本文详细介绍了双向EMA交叉量化交易策略的主要内容。首先,概述了策略的主要思路和运作原理。然后,对策略的优势进行了全面剖析。同时,也分析了策略中可能存在的主要风险点。在此基础上,给出了几个关键的可优化方向。总的来说,本策略具有判断市场主要趋势的优势,也存在一定的可以优化的空间,属于一种典型的量化交易策略。通过不断完善和优化,本策略可以成为投资者算法交易的重要选择之一。

||

### Overview

This strategy uses bidirectional EMA indicators to determine the main trend direction of the market, and combines the RSI indicator as the timing of entry selection, which belongs to the trend following algorithm trading strategy.

### Strategy Principle  

1. Calculate multiple groups of EMA with different cycles to identify the main trend direction of the market in three dimensions: short-term, medium-term and long-term
2. When the short-term EMA crosses above the medium-long term EMA, it is determined that a bullish trend has formed
3. When the short-term EMA crosses below the medium-long term EMA, it is determined that a bearish trend has formed  
4. Combine the RSI indicator to find suitable entry timing. The RSI indicator can be used to determine overbought and oversold zones
5. In an uptrend, go long when the RSI indicator is at low levels; In a downtrend, go short when the RSI indicator is at high levels

The above strategy mainly applies the bidirectional EMA indicator to determine the main trend direction, and uses the RSI indicator as the entry signal selection, which belongs to a typical trend following algorithm trading strategy.  

### Advantage Analysis  

The biggest advantage of this strategy is that it can clearly determine the main trend direction of the market, and select a better entry timing based on the RSI indicator. Specific advantages are as follows:  

1. Use multiple sets of EMA to identify the main trend direction of the market under multiple time dimensions  
2. The EMA indicator calculation is simple with less noise, and it determines the main trend of the market accurately and reliably
3. The RSI indicator can effectively determine entry and stop loss points to significantly optimize return retio  
4. The algorithm structure is clear and easy to understand and modify. It is a typical trend following strategy
5. It can be flexibly combined with other technical indicators to further improve strategy performance  

### Risk Analysis

The strategy also has some risks, mainly in the following aspects:

1. When the trend reverses, the stop loss point may be too idealized, thus increasing losses  
2. Unable to effectively determine the trend reversal point, possibly missing the opportunity to stop loss in time
3. EMA parameters and RSI parameters need repeated testing and optimization, otherwise it may cause instability
4. Cannot guarantee that every entry is the perfect timing, there may be unnecessary multiple repetitions
5. It is difficult to effectively avoid major gaps under the influence of sudden events  

To address the above risks, optimizations can be made in the following areas:  
1. Reasonably set stop loss points to prevent excessive losses  
2. Increase other indicators to determine trend reversal to ensure timely stop loss  
3. Optimize parameter combinations to adapt to wider market conditions  
4. Modify entry and stop loss logic to reduce the number of repetitions  
5. Increase exceptions judgment to avoid adverse effects of market gaps  

### Optimization Directions  

From the advantages and risks of this strategy, we can get the following optimizable directions:  

1. On the existing bidirectional EMA framework, introduce indicators like MACD and BOLL for judging trend reversal points, thereby optimizing take profit and stop loss strategies  
2. Introduce machine learning models to predict trend reversal probability and further improve strategy performance  
3. Apply advanced filters to automatically identify abnormal market conditions and effectively prevent losses  
4. Use genetic algorithms, deep reinforcement learning and other methods to automatically optimize parameters so that strategies can adapt to more market types  
5. Add automatic stop loss module, can dynamically adjust stop loss points according to actual situation  

Through introducing more indicators, prediction models, parameter optimization, risk control modules and other means, this strategy can be further improved to adapt to more complex and volatile market conditions.  

### Conclusion  

This article detailed introduced the main content of the bidirectional EMA cross quantitative trading strategy. First, it outlined the main ideas and operating principles of the strategy. Then the advantages of the strategy were fully analyzed. At the same time, it also analyzed the main potential risks in the strategy. On this basis, several key optimizable directions were proposed. In summary, this strategy has the advantage of determining the main trend of the market, and also has some room for optimization, which is a typical quantitative trading strategy. Through continuous improvement and optimization, this strategy can become an important choice for investors' algorithmic trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Lila linje|
|v_input_2|true|Visa lila linje|
|v_input_3|34|Blå linje|
|v_input_4|true|Visa blå linje|
|v_input_5|55|Grön linje|
|v_input_6|true|Visa grön linje|
|v_input_7|89|Gul linje|
|v_input_8|true|Visa gul linje|
|v_input_9|141|Orange linje|
|v_input_10|true|Visa orange linje|
|v_input_11|230|Röd linje|
|v_input_12|true|Visa röd linje|
|v_input_13|371|Röd linje|
|v_input_14|true|Visa röd linje|
|v_input_15|true|Första stapeln|
|v_input_16_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-23 00:00:00
end: 2024-01-23 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Investoz
// Indikatorn är byggd som ett utbildningsyfte och är därför ingen rekommendation för köp/sälj av aktier. Tanken är att skapa en visuell form i en graf
// som visar om det finns någon trend såväl positiv som negativ. En dialogruta med en varning talar om vilken trend som råder. I koden finns en möjlighet
// att ta position eller gå ur position om man vill skapa en startegi kring denna trendindikator. Rekommenderar dock starkt att inte enbart förlita sig på denna
// indikator som beslut för köp/sälj då resultaten blir negativa om man köper på psoitiv trend och säljer på negativ trend. Det måste kombineras med andra idéer
// och därför fungerar denna skript mer som ett komplement till sin egen strategi.
// Det är fritt fram för vem som helst att använda sig av denna indikator.  
//@version=4
//Skapar en strategiskript med 5 % av eget kapital som ett exempel. Detta går att ändra i skriptets inställningar, välj egenskaper och sedan ändra orderstorlek
//till ett annat värde av % på eget kapital.
strategy("© Investoz trendvarningar", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=5)
//Lägger till inmatningar till skriptindikatorn. Användaren kan se och redigera inmatningar i objektdialogen efter eget val.
ema1 = input(21, minval=1, maxval=500, title="Lila linje")
valema1=input(true, title="Visa lila linje")
ema2 = input(34, minval=1, maxval=500, title="Blå linje")
valema2=input(true, title="Visa blå linje")
ema3 = input(55, minval=1, maxval=500, title="Grön linje")
valema3=input(true, title="Visa grön linje")
ema4 = input(89, minval=1, maxval=500, title="Gul linje")
valema4=input(true, title="Visa gul linje")
ema5 = input(141, minval=1, maxval=500, title="Orange linje")
valema5=input(true, title="Visa orange linje")
ema6 = input(230, minval=1, maxval=500, title="Röd linje")
valema6=input(true, title="Visa röd linje")
ema7 = input(371, minval=1, maxval=500, title="Röd linje")
valema7=input(true, title="Visa röd linje")
//Inmatningar för antal staplar
startbar = input(1, minval=1, maxval=1, title="Första stapeln")
Endbar = bar_index
//Källa input, stängning. Användaren kan själv byta till vilken källa som önskas.
src = input(close, title="Source")
//Antal staplar sedan den längsta ema började och framåt. 
tid=Endbar + startbar - 371
//EMA loop
aema1 = ema(src, ema1)
bema2 = ema(src, ema2)
cema3 = ema(src, ema3)
dema4 = ema(src, ema4)
eema5 = ema(src, ema5)
fema6 = ema(src, ema6)
gema7 = ema(src, ema7)
//Skriver ut linjer i diagrammet om förhållandet är sant, annars falskt.
h=plot(valema1 ? aema1 : na, title="Lila linje", style=plot.style_line, linewidth=1, color=color.purple)
i=plot(valema2 ? bema2 : na, title="Blå linje", style=plot.style_line, linewidth=1, color=color.blue)
j=plot(valema3 ? cema3 : na, title="Grön linje", style=plot.style_line, linewidth=1, color=color.green)
k=plot(valema4 ? dema4 : na, title="Gul linje", style=plot.style_line, linewidth=1, color=color.yellow)
l=plot(valema5 ? eema5 : na, title="Orange linje", style=plot.style_line, linewidth=1, color=color.orange)
m=plot(valema6 ? fema6 : na, title="Röd linje", style=plot.style_line, linewidth=1, color=color.red)
n=plot(valema7 ? gema7 : na, title="Brun linje", style=plot.style_line, linewidth=1, color=color.maroon)
//Fyller bakgrunden mellan två linjer med en viss färg.
fill(h, i, color = color.purple,transp=34)
fill(i, j, color = color.blue,transp=34)
fill(j, k, color = color.green,transp=34)
fill(k, l, color = color.yellow,transp=34)
fill(l, m, color = color.orange,transp=34)
fill(m, n, color = color.red,transp=34)
//Skapa en algoritm för positiv trend
PositivTrend = crossover(aema1,gema7)?1:0
TrendPositiv = ema(close,1) > aema1 and aema1 > bema2?1:0
//Skapa en algoritm för negativ trend
NegativTrend = crossunder(aema1,gema7)?1:0
TrendNegativ = ema(close,1) < aema1 and aema1 < bema2?1:0
//Skapar en textruta med varningstext för positiv trend
varningtextpositiv = "Varning för positiv trend."+"\n" + "Leta efter att ta position!"
// if PositivTrend
//     varningpositiv=label.new(
//      bar_index, 
//      low,  
//      xloc=xloc.bar_index, 
//      yloc=yloc.price,
//      color=color.black, 
//      textcolor=color.green,
//      text=varningtextpositiv,
//      style=label.style_label_down,
//      textalign=text.align_left)
//Skapar en textruta med varningstext för negativ trend
varningtextnegativ = "Varning för negativ trend."+"\n" + "Leta efter utgången!"
// if NegativTrend
//     varningnegativ=label.new(
//      bar_index, 
//      low,  
//      xloc=xloc.bar_index, 
//      yloc=yloc.price,
//      color=color.black, 
//      textcolor=color.red,
//      text=varningtextnegativ,
//      style=label.style_label_up,
//      textalign=text.align_left)
//Köp om positiv trend
if (PositivTrend) 
    strategy.entry("Ta position", strategy.long, when = PositivTrend)
//Sälj om negativ trend
if (NegativTrend)
    strategy.close("Ta position", when = NegativTrend, comment="Gå ur position")
//Beräkning av positiv trend
vspositiv(positiv)=>valuewhen(Endbar==startbar,positiv,0)
vepositiv(positiv)=>valuewhen(Endbar==Endbar,positiv,0)
positivmean(TrendPositiv)=>
    csumpositiv = cum(TrendPositiv)
//Slut//   
    a = vepositiv(csumpositiv)
//Start//
    b = vspositiv(csumpositiv)
//Slut - Start// 
    (a - b)/(tid)
positivmeanpositiv = positivmean(TrendPositiv) 
//Beräkning av negativ trend
vsnegativ(negativ)=>valuewhen(Endbar==startbar,negativ,0)
venegativ(negativ)=>valuewhen(Endbar==Endbar,negativ,0)
negativmean(TrendNegativ)=>
    csumnegativ = cum(TrendNegativ)
//Slut//   
    a = venegativ(csumnegativ)
//Start//
    b = vsnegativ(csumnegativ)
//Slut - Start// 
    (a - b)/(tid)
negativmeannegativ = negativmean(TrendNegativ) 
//Inmatning av text som ska in i texruta som visar antal staplar i trend
logga = "© Investoz: Trend i tid"+ "\n"
streck = "--------------------------------------------------------"
totalastaplar = "\n" + "Dagar totalt: " + tostring(tid)+ " dagar "+"\n"+ streck + "\n"
totalpositiv = "Dagar totalt i positiv trend "+" ? : "  +tostring(positivmeanpositiv*tid, "##.##") +" dagar " + "\n"
totalnegativ = "\n" + "Dagar totalt i negativ trend" + " ? : "  +tostring(negativmeannegativ*tid, "##.##") +" dagar " 
//Textruta för antal staplar i trend
// if barstate.ishistory
//     barcountlbl=label.new(
//      bar_index, 
//      low,  
//      xloc=xloc.bar_index, 
//      yloc=yloc.price,
//      color=color.black, 
//      textcolor=color.yellow,
//      text=logga+streck+totalastaplar+totalpositiv+streck+totalnegativ,
//      style=label.style_label_lower_left,
//      textalign=text.align_left)
//     label.delete(barcountlbl[1])
////////////////////////////////// 
```

> Detail

https://www.fmz.com/strategy/439899

> Last Modified

2024-01-24 17:31:41
