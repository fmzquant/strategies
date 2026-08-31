
> Name

Multi-EMA-Cross-with-Volume-Price-Momentum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f59785e5e4803fc436.png)

[trans]
这是一个基于多重均线交叉指标和量价指标的综合动量交易策略。该策略根据快速和慢速指数移动平均线(EMA)交叉、成交量加权平均价(VWAP)和超级趋势(SuperTrend)等多个指标的配合来生成交易信号,同时还结合了日内交易时间窗口和价格变动幅度等条件来控制进场和出场。

#### 策略原理
策略采用5日和13日EMA作为主要的趋势判断指标,当快速EMA上穿慢速EMA且收盘价位于VWAP之上时,触发多头信号;当快速EMA下穿慢速EMA且收盘价位于VWAP之下时,触发空头信号。同时策略还引入了SuperTrend指标作为趋势确认和止损的依据。策略针对不同的交易日设置了不同的进场条件,包括价格与前一交易日收盘价的变动幅度、当日最高最低价的波动区间等。

#### 策略优势
1. 多重技术指标的配合使用提高了交易信号的可靠性
2. 针对不同交易日设置差异化的进场条件,更好地适应市场特征
3. 采用动态的止盈止损机制,可以有效控制风险
4. 结合日内交易时间窗口的限制,避免了高波动时段的风险
5. 通过前期高低点和价格波动幅度的约束,降低了追高杀低的风险

#### 策略风险
1. 快速波动行情下可能出现虚假信号
2. 趋势反转初期可能出现滞后
3. 参数优化可能存在过拟合风险
4. 交易成本可能影响策略收益
5. 市场高度波动时期可能面临较大回撤

#### 策略优化方向
1. 可以考虑引入成交量分析指标,进一步确认趋势强度
2. 优化不同交易日的参数设置,提高策略适应性
3. 增加更多的市场情绪指标,提高预判准确性
4. 完善止盈止损机制,提高资金利用效率
5. 考虑加入波动率指标,优化仓位管理

#### 总结
该策略通过多重技术指标的综合运用,实现了趋势跟踪和动量交易的结合。策略设计充分考虑了市场的多样性,针对不同交易日采用了差异化的交易规则。通过严格的风险控制和灵活的止盈止损机制,策略展现出较好的实战应用价值。未来可以通过引入更多的技术指标和优化参数设置来提升策略的稳定性和盈利能力。 || 

This is a comprehensive momentum trading strategy based on multiple exponential moving average (EMA) crossovers and volume-price indicators. The strategy generates trading signals by combining various indicators including fast and slow EMAs, Volume Weighted Average Price (VWAP), and SuperTrend, while incorporating intraday trading windows and price movement thresholds to control entry and exit points.

#### Strategy Principles
The strategy utilizes 5-day and 13-day EMAs as primary trend indicators. Long positions are triggered when the fast EMA crosses above the slow EMA with closing price above VWAP, while short positions are triggered when the fast EMA crosses below the slow EMA with closing price below VWAP. The strategy also incorporates the SuperTrend indicator for trend confirmation and stop-loss determination. Different entry conditions are set for different trading days, including price movement relative to the previous day's close and the day's high-low range.

#### Strategy Advantages
1. Multiple technical indicators enhance trading signal reliability
2. Differentiated entry conditions for different trading days better adapt to market characteristics
3. Dynamic profit-taking and stop-loss mechanisms effectively control risk
4. Intraday trading window restrictions avoid high volatility periods
5. Previous high-low points and price movement constraints reduce the risk of chasing highs and lows

#### Strategy Risks
1. False signals may occur in rapidly fluctuating markets
2. Potential lag during initial trend reversals
3. Parameter optimization may face overfitting risks
4. Trading costs may impact strategy returns
5. Significant drawdowns possible during highly volatile market periods

#### Strategy Optimization Directions
1. Consider incorporating volume analysis indicators to further confirm trend strength
2. Optimize parameters for different trading days to improve strategy adaptability
3. Add more market sentiment indicators to enhance predictive accuracy
4. Refine profit-taking and stop-loss mechanisms to improve capital efficiency
5. Consider adding volatility indicators to optimize position management

#### Summary
This strategy achieves a combination of trend following and momentum trading through the comprehensive use of multiple technical indicators. The strategy design fully considers market diversity by adopting differentiated trading rules for different trading days. Through strict risk control and flexible profit-taking and stop-loss mechanisms, the strategy demonstrates good practical application value. Future improvements can enhance strategy stability and profitability by introducing additional technical indicators and optimizing parameter settings.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//@version=6
strategy("S1", overlay=true)
fastEMA = ta.ema(close, 5)
slowEMA = ta.ema(close,13)
ema9 = ta.ema(close, 9)
ema100 = ta.ema(close, 100)
ema5 = ta.ema(close, 5)
ema200 = ta.ema(close, 200)

ma = ta.sma(close, 50)

mult = input.float(defval=3)
len = input.int(defval=11)
[superTrend, dir] = ta.supertrend(mult, len)
vwap1= ta.vwap(hlc3)

plot(slowEMA,color = color.green)
plot(fastEMA,color = color.black)
plot(vwap1, color = color.blue)

var dailyTaskDone = false
var gapdown = false
var gapup = false
var runup = 0.0
var biggapdown = false
var biggapup = false
var prevDayClose = 0.0
var todayLow = 0.0
var todayHigh = 0.0
var noBuyNow = false
var noSellNow = false
var buyPrice = 0.0
var sellPrice = 0.0
var todayBuyDone = false
var todaySellDone = false
var dragonflyDoji = false
var candleCount = 0
var candleCount1 = 0
var lastTrade = 9
var lastFiveCandles = false
var lastSevenCandlesS = false
var fiveEMACC = 0
candleCount := candleCount + 1
candleCount1 := candleCount1 + 1

if fiveEMACC > 0
    fiveEMACC := fiveEMACC + 1

if fiveEMACC == 6
    fiveEMACC := 0

if strategy.openprofit == 0
    candleCount := 0

if hour == 9 and minute ==15
    prevDayClose := close[1]
    todayLow := low
    todayHigh := high
    lastTrade := 9
    
if hour == 9 and minute ==15 and (open - close[1]) >  close*0.01
    gapup := true
    
if hour == 9 and minute ==15 and (open - close[1]) <  close*0.005*-1
    gapdown := true

if hour == 9 and minute ==15 and (close - close[1]) > 200
    biggapup := true
    
if hour == 9 and minute ==15 and (close - close[1]) < 200
    biggapdown := true

if low < todayLow
    todayLow := low
    candleCount1 := 0
if high > todayHigh
    todayHigh := high

if close > todayLow + 200
    noBuyNow := true
    
if close < todayHigh - 200//0.01*close
    noSellNow := false

lastFiveCandles := (close[4]<open[4] or close[3]<open[3] or close[2] < open[2] or close[1]<open[1])
lastSevenCandlesS := (close[6]>open[6] or close[5]>open[5] or close[4]>open[4] or close[3]>open[3] or close[2] > open[2] or close[1]>open[1])
if hour == 15
    dailyTaskDone := false
    gapdown := false
    gapup := false
    biggapup := false
    biggapdown := false
    noBuyNow := false
    noSellNow := false
    todayLow := 0.0
    todayHigh := 0.0
    buyPrice  := 0.0
    sellPrice := 0.0
    todayBuyDone := false
    todaySellDone := false
    dragonflyDoji := false
    lastTrade := 9

// if fastEMA < slowEMA and lastTrade == 1 and strategy.openprofit==0
//     lastTrade := 9


if fastEMA > slowEMA and lastTrade == 0 and strategy.openprofit==0
    lastTrade := 9
    
buy =  (dayofweek==dayofweek.thursday and (fastEMA - slowEMA > close*0.001) and close > vwap1 and close[1] > vwap1[1]) or 
       (dayofweek==dayofweek.monday and (fastEMA - slowEMA > close*0.001) and close > vwap1 and close[1] > vwap1[1] and close-prevDayClose < close*0.011) or 
       (dayofweek==dayofweek.tuesday and (fastEMA - slowEMA > close*0.001) and close > vwap1 and close[1] > vwap1[1] and lastFiveCandles  and close-prevDayClose < close*0.015 and close-todayLow < close*0.012) or
       (dayofweek==dayofweek.wednesday and (fastEMA - slowEMA > close*0.001) and close > vwap1 and close-prevDayClose < close*0.015 and (hour!=9 or minute>=35) and close-todayLow < close*0.012) or
       (dayofweek==dayofweek.friday and ((fastEMA - slowEMA > close*0.001))and close > vwap1 and close[1] > vwap1[1] and (hour!=9 or minute>=35))
       
sell=  (dayofweek==dayofweek.thursday and (hour!=9 or minute>=35) and ((slowEMA - fastEMA > close*0.00089)) and close < vwap1  and lastSevenCandlesS and close[1] < vwap1[1]) or 
       (dayofweek==dayofweek.monday and ((slowEMA - fastEMA > close*0.00089)) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and todayHigh-close < close*0.008 and todayHigh-close[1] < close * 0.01 ) or 
       (dayofweek==dayofweek.tuesday and  (hour!=9 or minute>=35) and (open - low < 2*(high-close)) and (close-open<10)  and not dragonflyDoji  and (slowEMA - fastEMA > close*0.00089) and close < vwap1 and close[1] < vwap1[1]  and prevDayClose-close<close*0.012 and todayHigh-close < close*0.009 and todayHigh-close[1] < close * 0.009) or
       (dayofweek==dayofweek.wednesday  and  (hour!=9 or minute>=40) and close<open and (slowEMA - fastEMA > close*0.00089) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and (close-todayLow>30 or candleCount1<1) ) or 
       (dayofweek==dayofweek.friday and ((slowEMA - fastEMA > close*0.00089)) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and (hour!=9 or minute>=55) ) 

// buy =  (dayofweek==dayofweek.thursday and (fastEMA > slowEMA) and close > vwap1 and close[1] > vwap1[1]) or 
//        (dayofweek==dayofweek.monday and (fastEMA > slowEMA) and close > vwap1 and close[1] > vwap1[1] and close-prevDayClose < close*0.011) or 
//        (dayofweek==dayofweek.tuesday and (fastEMA > slowEMA) and close > vwap1 and close[1] > vwap1[1] and lastFiveCandles  and close-prevDayClose < close*0.015 and close-todayLow < close*0.012) or
//        (dayofweek==dayofweek.wednesday and (fastEMA > slowEMA) and close > vwap1 and close-prevDayClose < close*0.015 and (hour!=9 or minute>=35) and close-todayLow < close*0.012) or
//        (dayofweek==dayofweek.friday and ((fastEMA > slowEMA))and close > vwap1 and close[1] > vwap1[1] and (hour!=9 or minute>=35))
       
// sell=  (dayofweek==dayofweek.thursday and (hour!=9 or minute>=35) and ((slowEMA > fastEMA)) and close < vwap1  and lastSevenCandlesS and close[1] < vwap1[1]) or 
//        (dayofweek==dayofweek.monday and ((slowEMA > fastEMA)) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and todayHigh-close < close*0.008 and todayHigh-close[1] < close * 0.01 ) or 
//        (dayofweek==dayofweek.tuesday and  (hour!=9 or minute>=35) and (open - low < 2*(high-close)) and (close-open<10)  and not dragonflyDoji  and (slowEMA > fastEMA) and close < vwap1 and close[1] < vwap1[1]  and prevDayClose-close<close*0.012 and todayHigh-close < close*0.009 and todayHigh-close[1] < close * 0.009) or
//        (dayofweek==dayofweek.wednesday  and  (hour!=9 or minute>=40) and close<open and (slowEMA > fastEMA) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and (close-todayLow>30 or candleCount1<1) ) or 
//        (dayofweek==dayofweek.friday and ((slowEMA > fastEMA)) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and (hour!=9 or minute>=55) ) 

dragonflyDoji:= false

// (slowEMA - fastEMA > close*0.00089 or (slowEMA-fastEMA>close*0.00049 and (high[2]>vwap or high[1]>vwap)))
if sellPrice != 0 and runup < sellPrice - low
    runup := sellPrice - low


if buyPrice != 0 and runup < high - buyPrice
    //ourlabel = label.new(x=bar_index, y=na, text=tostring(runup), yloc=yloc.belowbar)
    runup := high - buyPrice
    
        
NoBuySellTime = (hour == 15) or ((hour==14 and minute>=25)) or (hour==9 and minute<=35) or hour >= 14
//(fiveEMACC > 0 and low < fastEMA and close < vwap1)
buyexit     =  fastEMA<slowEMA or (close<superTrend and close < vwap1 and close[1] < vwap1[1]) //or strategy.openprofit > 400 or strategy.openprofit < -5000
sellexit =  slowEMA<fastEMA or (close > vwap1 and close[1] > vwap1[1] and close>superTrend) //or strategy.openprofit > 400 or strategy.openprofit < -5000

exitPosition =  (dayofweek==dayofweek.thursday and buyPrice!=0.0 and (high - buyPrice) > 50) or (dayofweek==dayofweek.thursday and sellPrice!=0.0 and (sellPrice - low) > 80) or (dayofweek==dayofweek.monday and buyPrice !=0.0 and high-buyPrice > 30) or (dayofweek==dayofweek.monday and sellPrice!=0.0 and (sellPrice - low) > 30) or (dayofweek!=dayofweek.thursday and dayofweek!=dayofweek.monday  and buyPrice!=0.0 and (high - buyPrice) > 30) or  (dayofweek!=dayofweek.thursday  and dayofweek!=dayofweek.monday and sellPrice!=0.0 and (sellPrice - low) > 30)
//code such that 2 fastema is > than 2 slowema
//exitPosition =  (sellPrice!=0 and runup >21 and strategy.openprofit < -2000) or (candleCount > 18 and strategy.openprofit > 50 and strategy.openprofit < 1000) or (dayofweek==dayofweek.thursday and buyPrice!=0.0 and (high - buyPrice) > buyPrice * 0.007) or (dayofweek==dayofweek.thursday and sellPrice!=0.0 and (sellPrice - low) > sellPrice * 0.007) or (dayofweek==dayofweek.monday and buyPrice !=0.0 and high-buyPrice > 30) or (dayofweek!=dayofweek.thursday and dayofweek!=dayofweek.monday  and buyPrice!=0.0 and (high - buyPrice) > buyPrice * 0.002) or  (dayofweek!=dayofweek.thursday  and sellPrice!=0.0 and (sellPrice - low) > sellPrice * 0.002)
//(runup >21 and strategy.openprofit < -2000) or
if  buy and fastEMA>vwap1 and (not todayBuyDone or lastTrade != 1) and not NoBuySellTime// and not dailyTaskDone //and (dayofweek==dayofweek.friday or (close-prevDayClose)<150)//and not biggapup
    strategy.entry("buy", strategy.long)
    //dailyTaskDone := true
    if buyPrice == 0.0 
        fiveEMACC := 1

    buyPrice := close
    //ourlabel = label.new(x=bar_index, y=na, text=tostring(todayLow + 500), yloc=yloc.belowbar9
    todayBuyDone := true
    lastTrade := 1
    runup := 0.0

if  sell and (not todaySellDone or lastTrade != 0) and not NoBuySellTime// and not dailyTaskDone // and dayofweek!=dayofweek.friday //and (dayofweek==dayofweek.friday or (prevDayClose-close)<150)//and not biggapdown
    strategy.entry("sell", strategy.short)
    //dailyTaskDone := true
    if sellPrice == 0.0 
        fiveEMACC := 1
    sellPrice := close
    todaySellDone := true
    lastTrade := 0
    runup := 0.0

// if ((fastEMA-slowEMA>18 and close>vwap and close[1]>vwap[1] and (not todayBuyDone or candleCount>12)) or (slowEMA-fastEMA>10 and close < vwap and close[1]<vwap[1] and (not todaySellDone or candleCount > 12))) and strategy.openprofit==0
// ourlabel = label.new(x=bar_index, y=na, text=tostring(abs(prevDayClose-close)), yloc=yloc.belowbar)
    
IntraDay_SquareOff = minute >=15 and hour >= 15
if true and (IntraDay_SquareOff or exitPosition)
    strategy.close("buy")
    strategy.close("sell")
    buyPrice := 0
    sellPrice := 0
    runup := 0.0
if  buyexit
    strategy.close("buy")
    buyPrice := 0
if sellexit
    strategy.close("sell")
    sellPrice := 0

buy1 =  ((dayofweek==dayofweek.thursday and (fastEMA - slowEMA > close*0.001) and close > vwap1 and close[1] > vwap1[1]) or 
       (dayofweek==dayofweek.monday and (fastEMA - slowEMA > close*0.0013) and close > vwap1 and close[1] > vwap1[1]) or 
       (dayofweek==dayofweek.tuesday and (fastEMA - slowEMA > close*0.0013) and close > vwap1 and close[1] > vwap1[1] and not gapup) or
       (dayofweek==dayofweek.wednesday and (fastEMA - slowEMA > close*0.0013) and close > vwap1 and close[1] > vwap1[1] and close-prevDayClose < close*0.0085) or
       (dayofweek==dayofweek.friday and (fastEMA - slowEMA > close*0.0013) and close > vwap1 and close[1] > vwap1[1] and close - todayLow < close*0.012))
       and dayofweek!=dayofweek.friday and (not todayBuyDone or lastTrade != 1) and not NoBuySellTime// and not dailyTaskDone //and (dayofweek==dayofweek.friday or (close-prevDayClose)<150)//and not biggapup


       
sell1=  ((dayofweek==dayofweek.thursday and (slowEMA - fastEMA > close*0.00079) and close < vwap1 and close[1] < vwap1[1]) or 
       (dayofweek==dayofweek.monday and (slowEMA - fastEMA > close*0.00079) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and todayHigh-close < close*0.01 and todayHigh-close[1] < close * 0.01) or 
       (dayofweek==dayofweek.tuesday and (slowEMA - fastEMA > close*0.00079) and close < vwap1 and close[1] < vwap1[1] and not gapdown and not dragonflyDoji and todayHigh-close < close*0.009 and todayHigh-close[1] < close * 0.009) or
       (dayofweek==dayofweek.wednesday and (slowEMA - fastEMA > close*0.00079) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and prevDayClose-close < 0.005*close) or 
       (dayofweek==dayofweek.friday and (slowEMA - fastEMA > close*0.00079) and close < vwap1 and close[1] < vwap1[1] and not dragonflyDoji and prevDayClose-close < 0.005*close)) and 
       dayofweek!=dayofweek.friday and (not todaySellDone or lastTrade != 0) and not NoBuySellTime// and not dailyTaskDone
        
// if buy1 and strategy.openprofit==0
//     ourlabel = label.new(x=bar_index, y=na, text=tostring(fastEMA - slowEMA), yloc=yloc.belowbar)
// if sell1 and strategy.openprofit==0
//     ourlabel = label.new(x=bar_index, y=na, text=tostring(slowEMA - fastEMA), yloc=yloc.belowbar)

// buy =  ((fastEMA > slowEMA and fastEMA[1] < slowEMA[1]) and (fastEMA - slowEMA) > 10) or  ((fastEMA > slowEMA and fastEMA[1] > slowEMA[1] and fastEMA[2] < slowEMA[2]) and (fastEMA - slowEMA) > 20) 
// sell=  ((fastEMA < slowEMA and fastEMA[1] > slowEMA[1] ) and (slowEMA - fastEMA) > 10) or ((fastEMA < slowEMA and fastEMA[1] < slowEMA[1] and fastEMA[2] > slowEMA[2]) and (slowEMA - fastEMA) > 20)

// buy =  (fastEMA > slowEMA and fastEMA[1] < slowEMA[1]) 
// sell=  (fastEMA < slowEMA and fastEMA[1] > slowEMA[1] )


// buy =  ((fastEMA > slowEMA and fastEMA[1] < slowEMA[1]) and (fastEMA - slowEMA) > 10) or  ((fastEMA > slowEMA and fastEMA[1] > slowEMA[1] and fastEMA[2] < slowEMA[2]) and (fastEMA - slowEMA) > 1) 
// sell=  ((fastEMA < slowEMA and fastEMA[1] > slowEMA[1] ) and (slowEMA - fastEMA) > 5)


// buy =  fastEMA > slowEMA and fastEMA[1] > slowEMA[1] and fastEMA[2] < slowEMA[2]
// sell=  fastEMA < slowEMA and fastEMA[1] < slowEMA[1] and fastEMA[2] > slowEMA[2]

//Daily chart
// buyexit = (close + 40 < slowEMA)//rsi > 65 and fastEMA > ema9 // fastEMA > ema9// close < fastEMA//(rsi > 65 and close < fastEMA and fastEMA > ema3 and close > ema200)  //strategy.openprofit < -10000 and slowEMA > ema3 and slowEMA[1] < ema3[1] and 1==2
// sellexit = (close - 40  > slowEMA)//rsi < 35 // and close > ema200) or (rsi < 35 and close < ema200 and fastEMA < ema3) //strategy.openprofit < -10000 and fastEMA < ema3 and fastEMA[1] > ema3[1] and 1==2


// buyexit = (close < superTrend)// and (close < vwap1 and close[1] < vwap1[1] and close < close[1])//and close[2] < vwap1[2]//rsi > 65 and close < fastEMA// fastEMA > ema9// close < fastEMA//(rsi > 65 and close < fastEMA and fastEMA > ema3 and close > ema200)  //strategy.openprofit < -10000 and slowEMA > ema3 and slowEMA[1] < ema3[1] and 1==2
// sellexit = (close > superTrend)// and (close > vwap1 and close[1] > vwap1[1] and close > close[1]) //and close[2] > vwap1[2]//rsi < 35// and close > ema200) or (rsi < 35 and close < ema200 and fastEMA < ema3) //strategy.openprofit < -10000 and fastEMA < ema3 and fastEMA[1] > ema3[1] and 1==2

// buyexit = (close < superTrend and close < vwap1 and close[1] < vwap1[1] and close[1] < superTrend[1]) //or strategy.openprofit > 400 or strategy.openprofit < -5000
// sellexit =  (close > superTrend and close > vwap1 and close[1] > vwap1[1] and close[1] > superTrend[1]) //or strategy.openprofit > 400 or strategy.openprofit < -5000


```

> Detail

https://www.fmz.com/strategy/477591

> Last Modified

2025-01-06 16:07:59
