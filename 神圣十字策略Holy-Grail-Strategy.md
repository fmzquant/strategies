
> Name

神圣十字策略Holy-Grail-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d37574303a15711b36.png)
[trans]

神圣十字策略(Holy Grail Strategy)是一个结合双均线系统和ADX指标的量化交易策略。它旨在识别趋势的方向和力度,并在趋势发生转折时进行交易。

### 策略原理

该策略同时使用20日指数移动平均线(EMA)和ADX指标来识别入场时机。具体来说,它会在以下两种情况下发出交易信号:

1. 当ADX值低于30时(表示趋势较弱),并且价格从下方突破20日EMA时,做多;

2. 当ADX值高于30时(表示趋势较强),并且价格从上方突破20日EMA时,做空。

可以看出,该策略依赖ADX判断趋势的力度和方向,再结合移动平均线的支持阻力来寻找反转机会。它融合了趋势跟随和逆势交易的理念。

### 优势分析

神圣十字策略最大的优势在于,它同时考量了趋势的方向和力度,可以有效避开假突破,从而减少止损的概率。具体来说,该策略有以下几个优势:

1. 使用双均线系统,可以有效识别趋势;
2. 借助ADX评估趋势力度,可以避开盘整和无效突破; 
3. 结合反转及趋势交易理念,既可以捕捉趋势,也可以在拐点位置反转;
4. 操作规则清晰简单,容易实施。

### 风险分析

神圣十字策略也存在一些风险,主要集中在以下几个方面:

1. ADX作为辅助判断指标,也会发出错误信号;
2. 双均线交叉无法完全避免小升浪造成的亏损;  
3. 参数设置(如ADX目标值、均线周期等)不当可能导致信号过于频繁或保守。

为降低上述风险,可以调整参数组合以达到最佳效果,也可以设置止损来控制单笔损失。此外,让策略在不同品种和周期上进行回测,也很有必要。

### 优化方向 

神圣十字策略还有许多优化的方向:

1. 尝试不同类型的移动平均线,如加权移动平均线等;
2. ADX值目标线可以作为参数进行优化;
3. 可以测试不同周期参数,如10日、30日EMA;
4. 可以加入其他辅助指标,如RSI、布林带等来确认交易信号。

调整参数或加入新指标都有可能提高策略的盈利率或胜率。但任何优化都需要足够的回测以确保其稳健性。

### 总结

总的来说,神圣十字策略结合双均线和ADX指标的优点,使用清晰的交易规则来捕捉趋势转折。它有望取得不错的效果。但交易者仍需要对参数组合和止损规则进行优化,从而适应不同的市场环境。此外,无论如何改进,也无法完全避免止损,这是每一个交易策略都会面临的困境。
||

## Holy Grail Strategy

The Holy Grail strategy is a quantitative trading strategy that combines a dual moving average system with the ADX indicator. It aims to identify the direction and strength of the trend and trade at trend reversals.  

### Strategy Principle 

The strategy uses both the 20-day exponential moving average (EMA) and the ADX indicator to identify entry opportunities. Specifically, it will issue trading signals in the following two cases:

1. When the ADX value is below 30 (indicating a weaker trend), and the price breaks through the 20-day EMA from below, go long;  

2. When the ADX value is above 30 (indicating a stronger trend), and the price breaks through the 20-day EMA from above, go short.

It can be seen that this strategy relies on the ADX to judge the strength and direction of the trend, and then combines the support and resistance of the moving average to look for reversal opportunities. It integrates the concepts of trend following and mean reversion.

### Advantage Analysis

The biggest advantage of the Holy Grail strategy is that it takes into account both the direction and strength of the trend, which can effectively avoid false breakouts and reduce the probability of stop loss. Specifically, this strategy has the following advantages:

1. Using a dual moving average system can effectively identify trends; 
2. With the help of ADX to evaluate the strength of the trend, invalid breakouts can be avoided;
3. Combining reversal and trend trading concepts can both capture trends and reverse at turning points; 
4. The operation rules are clear and simple, easy to implement.

### Risk Analysis  

The Holy Grail strategy also has some risks, mainly in the following areas:  

1. ADX as an auxiliary judgment indicator will also issue wrong signals;  
2. Crossovers of double moving averages cannot completely avoid losses caused by small rallies;   
3. Improper parameter settings (such as ADX target values, moving average periods, etc.) may cause signals to be too frequent or conservative.

To reduce the above risks, parameters can be adjusted to achieve the best effect. Stop loss can also be set to control single losses. In addition, it is also necessary to test strategies on different varieties and cycles.

### Optimization Directions

There are still many optimization directions for the Holy Grail strategy:

1. Try different types of moving averages, such as weighted moving averages, etc. 
2. The ADX target value can be optimized as a parameter;
3. Different cycle parameters can be tested, such as 10-day, 30-day EMA;
4. Other auxiliary indicators can be added, such as RSI, Bollinger Bands, etc. to confirm trading signals.  

Adjusting parameters or adding new indicators may increase the profitability or win rate of the strategy. But any optimization requires sufficient backtesting to ensure its robustness.  

### Summary  

In summary, the Holy Grail strategy combines the advantages of double moving averages and the ADX indicator, and uses clear trading rules to capture trend reversals. It has the potential to perform well. However, traders still need to optimize parameter combinations and stop loss rules to adapt to different market environments. Moreover, no matter how improved, it is impossible to completely avoid stop loss, which is a dilemma faced by every trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Backtest Start Year|
|v_input_2|4|Backtest Start Month|
|v_input_3|15|Backtest Start Day|
|v_input_4|2018|Backtest Stop Year|
|v_input_5|5|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|14|DI Length|
|v_input_9|14|ADX Smoothing|
|v_input_10|30| ADX Target Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-24 00:00:00
end: 2023-11-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("LAT Holy Grail v3", overlay=true)

/////////////TEST TIME ////////////////////////
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(4, "Backtest Start Month")
testStartDay = input(15, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(5, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
//////////////////////////////////////////////////////////////////////

myema= ema(close, 20)
plot(myema, color=green, title="eMA", linewidth=3)



//longCondition = (crossover(close, myema)) //and adx3 < target
//if (longCondition)
    //strategy.entry("My Long Entry Id", strategy.long)

//shortCondition = (crossunder(close, myema)) //and adx3 > target
//if (shortCondition)
    //strategy.entry("My Short Entry Id", strategy.short)
    
    //////////////////////////////////////////////////////////
    ///////////////////////////////////////   DMI  ///////////////////////////////////////////////
len3 = input(14, minval=1, title="DI Length")                           /////////////////////
lensig3 = input(14, title="ADX Smoothing", minval=1, maxval=50)         ////////////////////
up3 = change(high)                                                      ///////////////////
down3 = -change(low)                                                    //////////////////
plusDM3 = na(up3) ? na : (up3 > down3 and up3 > 0 ? up3 : 0)            /////////////////
minusDM3 = na(down3) ? na : (down3 > up3 and down3 > 0 ? down3 : 0)     ////////////////
trur3 = rma(tr, len3)                                                   ///////////////
plus3 = fixnan(100 * rma(plusDM3, len3) / trur3)                        //////////////
minus3 = fixnan(100 * rma(minusDM3, len3) / trur3)                      /////////////
sum3 = plus3 + minus3                                                   ////////////
adx3 = 100 * rma(abs(plus3 - minus3) / (sum3 == 0 ? 1 : sum3), lensig3) ///////////
//plot(plus3, color=green, style=circles, linewidth=2, title="+DI")     //////////
//plot(minus3, color=red, style=circles, linewidth=2, title="-DI")      /////////
plot(adx3, color=aqua, style=line, linewidth=3, title="ADX")            ////////
target = input(30, title=" ADX Target Line")                            ///////
plot(target, color=yellow, title="ADX Target Line")                     //////
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                        
plot(hl2)


///////////////////////////////////////////////  eMA SIGNAL LINE   ///////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////// HOLY GRAIL STRATEGY ///////////////////////////////////////////////////////////////////

if (adx3 <= target) and crossover(close, myema)
    strategy.entry("HolyGrail", strategy.long, comment="Long")
 
if (adx3 >= target) and crossunder(close, myema)
    strategy.entry("HolyGrail", strategy.short, comment="Short")
    

```

> Detail

https://www.fmz.com/strategy/433936

> Last Modified

2023-12-01 15:27:39
