
> Name

基于Stoch和EMA指标的趋势跟踪量化策略Stochastic-and-Moving-Average-Crossover-Trend-Following-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14a6ce95456462b04b6.png)
[trans]
## 概述

该策略主要利用Stoch指标在超买超卖区域发生的交叉作为入场信号,同时结合EMA指标判断当前趋势方向,只在EMA持续上升的趋势中进行做多操作,在EMA持续下跌的趋势中进行做空操作,属于典型的趋势跟踪策略。

## 策略原理

该策略主要由三部分组成:

1. EMA指标判断趋势方向

   使用一快一慢两个不同参数的EMA,当快EMA位于慢EMA之上时判断为上升趋势,当快EMA位于慢EMA之下时判断为下跌趋势。

2. Stoch指标判断买卖信号

   Stoch指标由%K线和%D线组成,%K线在超买区之上与%D线发生黄金交叉时产生买入信号,%K线在超卖区之下与%D线发生死亡交叉时产生卖出信号。该策略仅在Stoch指标交叉发生在超买超卖区域时才发出交易信号。

3. 风险管理机制

   该策略同时设定了止损和止盈机制。在持有做多仓位时,如果价格跌破设定的止损位则会止损平仓;如果价格涨破设定的止盈位则会止盈平仓。做空仓位同理。

整体来说,该策略属于比较典型的量化交易策略,利用指标组合判断趋势方向和交易信号,同时辅以严格的风险管理规则,可以有效减少交易风险。

## 优势分析

该策略主要具有以下优势:

1. 利用EMA判断主次级别的趋势,避免在震荡不明的市场中被套。

2. Stoch指标的特点在于其能够很好地反映目前是否处在超买或者超卖区域,因此结合交叉信号的产生可以进行超买超卖区域交易。

3. 该策略明确了做多和做空的可能产生的环境,使信号产生得到进一步过滤,降低错误信号的概率,同时也避免在复杂的市场中盲目开仓。

4. 严格的风险管理机制有助于控制单次交易的损失,既控制了整体的最大回撤,同时也为盈利交易留出了足够的空间。

## 风险分析

该策略也存在一定的风险:

1. EMA、Stoch等指标都存在一定的滞后性,这会导致该策略难以及时抓住市场反转的机会。

2. 单纯依赖指标容易对市场形成先入为主的判断,从而错过市场实际提供的交易机会。

3. 风险管理机制本身也可能成为策略盈利空间的限制,在大趋势中止损和止盈位的设置需要特别慎重。

4. 在参数选择上该策略也存在一定的风险,不同参数对结果的影响需要通过大量的回测和优化来获得最佳参数组合。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 尝试不同类型的EMA,例如加权移动平均线、 Hull MA等指标来判断趋势,进行比较分析。

2. 尝试结合其他指标来产生交易信号,例如MACD、KDJ等,构建多指标的交易体系。 

3. 优化止损和止盈的设置,使其更加适应市场的实际波动情况。可以设定更宽松的止损位和更严格的止盈位。

4. 测试不同品种和不同周期下该策略表现的差异性,寻找最佳品种和周期组合。

5. 考虑加入机器学习或神经网络模型来辅助判断趋势方向和交易信号,实现策略的智能化。

## 总结

总的来说,该策略利用常见指标进行组合,构建了一套比较成熟的趋势跟踪交易策略。它既考虑了趋势判断和具体交易信号的产生,也设置了风险管理机制。通过继续优化,相信该策略可以取得更好的实盘效果。与此同时,我们也要意识到单一策略的局限性,继续学习和探索市场奥秘,才能取得长期稳定的收益。

||

## Overview  

This strategy mainly utilizes the crosses of the Stoch indicator in the overbought/oversold area as entry signals, while judging the current trend direction with the EMA indicator. It only goes long in an uptrend determined by EMA and goes short in a downtrend, which is a typical trend following strategy.

## Principles  

The strategy consists of three main parts:

1. EMA to determine the trend direction

   Using one fast and one slow EMA, when the fast EMA is above the slow EMA, it is determined as an upward trend. When the fast EMA is below the slow EMA, it is determined as a downward trend.

2. Stoch to generate trading signals 

   The Stoch indicator consists of %K and %D lines. When %K crosses above %D in the overbought area, it generates a buy signal. When %K crosses below %D in the oversold area, it generates a sell signal. This strategy only takes Stoch crossover signals when they happen in the overbought/oversold zones.  

3. Risk management mechanism

   The strategy also sets stop loss and take profit levels. When holding a long position, if the price breaks the stop loss level, it will exit the trade. If the price breaks the take profit level, it will close the position for profit. The same logic applies to short positions.   

In general, this is a typical quantitative trading strategy that uses a combination of indicators to determine trend direction and trading signals, supplemented by strict risk management rules to reduce trading risk.

## Advantage Analysis

The main advantages of this strategy are:

1. Using EMA to determine the major and minor trends avoids being trapped in a sideways market.  

2. The strength of the Stoch indicator lies in its ability to accurately reflect overbought/oversold levels. Combining this with crossover signals allows overbought/oversold zone trading.

3. The strategy specifies the possible long and short scenarios clearly, which further filters the signals and avoids blindly opening positions in a complex market.  

4. The strict risk management helps control the loss of individual trades, limits max drawdown while still giving profitable trades room to run.

## Risk Analysis  

There are also some risks with this strategy:

1. Indicators like EMA and Stoch have lagging nature, making it hard for this strategy to timely catch market reversals.

2. Purely relying on indicators can establish bias easily, thus missing trading opportunities actually provided by the market.

3. The risk management mechanism itself can also limit the profit potential by setting premature stop loss and take profit.

4. There are risks associated with parameter selection. Extensive backtesting and optimization is needed to find the optimal parameters.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Try different types of EMA for trend determination, like WMA, Hull MA etc and compare results.  

2. Combine other indicators to generate trading signals, e.g. MACD, KDJ to build a multi-indicator system.

3. Optimize stop loss and take profit settings to better adapt to market volatility. Can set wider stop loss and tighter take profit.

4. Test performance variance across different products and time frames to find optimal combination.

5. Consider introducing machine learning models to aid trend and signal judgment to make the strategy more intelligent.

## Conclusion  

In conclusion, this strategy combines commonly used indicators to form a relatively mature trend following system, taking into account trend determination, trading signals, and risk management. With further optimization, I believe this strategy can achieve better live trading results. At the same time, we should also be aware of limitations of single strategies and continue to learn market intricacies in pursuit of long-term steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|════════════ INDICATORS ════════════|
|v_input_2|55|Fast MA Period|
|v_input_3|89|Slow MA Period|
|v_input_4|14|Stochastic Length|
|v_input_5|6|%K Smooth|
|v_input_6|3|%D Smooth|
|v_input_7|true|Highlight Stoch Cross?|
|v_input_8|true|Highlight Trend?|
|v_input_9|true|═══════════════ FROM ═══════════════|
|v_input_10|true|From day|
|v_input_11|true|From month|
|v_input_12|2019|From year|
|v_input_13|true|════════════════ TO ════════════════|
|v_input_14|31|To day|
|v_input_15|12|To month|
|v_input_16|2020|To year|
|v_input_17|true|═════════════ STRATEGY ═════════════|
|v_input_18|true|Include Short Positions?|
|v_input_19|true|User Take Profit?|
|v_input_20|8|Take Profit (%)|
|v_input_21|false|User Stop Loss?|
|v_input_22|2|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
//by Wugamlo
//Strategy combining Stochastic Crosses in the Overbought/Oversold Area with a trend determined by two EMAs
//Default setup seems to work best on 4HR timeframe for BTC 

strategy(title = "Strategy Stoch/EMA Cross", shorttitle = "Strategy Stoch/EMA Cross", overlay = true, pyramiding = 0, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.USD, commission_value=0.01,commission_type=strategy.commission.percent, initial_capital=1000)

// === GENERAL INPUTS ===
SectionInd      = input(defval = true ,title = "════════════ INDICATORS ════════════")
maFastLength    = input(defval = 55,   title = "Fast MA Period", minval = 1)
maSlowLength    = input(defval = 89,   title = "Slow MA Period", minval = 1)
StochLength     = input(defval = 14,   title = "Stochastic Length", minval=1)
smoothK         = input(defval = 6,    title = "%K Smooth", minval=1)
smoothD         = input(defval = 3,    title = "%D Smooth", minval=1)
overbought      = 80
oversold        = 20
HighlightOBOS   = input(defval = true, title = "Highlight Stoch Cross?")
HighlightTrend  = input(defval = true, title = "Highlight Trend?")

//DATE AND TIME
SectionFrom     = input(defval = true ,title = "═══════════════ FROM ═══════════════")
fromDay         = input(defval = 01,   title = "From day", minval=1)
fromMonth       = input(defval = 1,    title = "From month", minval=1)
fromYear        = input(defval = 2019, title = "From year", minval=2014)
SectionTo       = input(defval = true, title = "════════════════ TO ════════════════")
toDay           = input(defval = 31,   title = "To day", minval=1)
toMonth         = input(defval = 12,    title = "To month", minval=1)
toYear          = input(defval = 2020, title = "To year", minval=2014)

// === STRATEGY RELATED INPUTS ===
SectionStra     = input(defval = true ,title = "═════════════ STRATEGY ═════════════")

// Include Shorts or only trade Long Positions?
includeShorts   = input(defval = true, title = "Include Short Positions?")


// Risk Management inputs
useTakeProfit   = input(defval = true,  title = "User Take Profit?")
inpTakeProfit   = input(defval = 8,     title = "Take Profit (%)", minval = 0)
useStopLoss     = input(defval = false, title = "User Stop Loss?")
inpStopLoss     = input(defval = 2,     title = "Stop Loss (%)", minval = 0)

StopLossPerc    = inpStopLoss * 0.01
TakeProfitPerc  = inpTakeProfit * 0.01


// === EMA SERIES SETUP ===
maFast = ema(close, maFastLength)
maSlow = ema(close, maSlowLength)
diff   = maFast - maSlow

// === STOCHASTIC SETUP ===
k      = sma(stoch(close, high, low, StochLength), smoothK)
d      = sma(k, smoothD)

// Stochastic Long/Short Entry determination
stochLong  = crossover(k,d)  and (k < oversold)
stochShort = crossunder(k,d) and (k > overbought)

// Stochastic Long/Short Exit determination
stochLongEx  = crossover (k, overbought)
stochShortEx = crossunder(k, oversold)


// === PLOTTING EMAs ===
fast = plot(maFast, title = "Fast MA", color = yellow, linewidth = 1, style = line, transp = 10)
slow = plot(maSlow, title = "Slow MA", color = white,  linewidth = 1, style = line, transp = 10)


// === Vertical Coloring for Crosses in Overbought/Oversold zone and for MA Trend Zones ===
b_color = stochLong ? green : stochShort ? red : na
bgcolor(HighlightOBOS ? b_color : na, title="Overbought / Oversold", transp=65)   //Highlight the Overbought/Oversold Stoch Crossings
t_color = diff>=0 ? green : diff<0 ? red : na
bgcolor(HighlightTrend ? t_color : na, title="Trend up / Trend down", transp=75)  //Highlight the EMA Trend


// === STRATEGY LOGIC ===
// Time Restriction
timeInRange = true


// === STRATEGY - LONG POSITION EXECUTION ===
if stochLong and (diff >=0) and timeInRange    //Open Long when Stoch crossing in Oversold area and EMATrend is up
    strategy.entry(id = "Long", long = true)
if stochLong and (diff <0) and timeInRange     //Close Long when another Long Stoch cross signal is given after Trend has changed to down (avoid fake signals)
    strategy.close(id = "Long")
if stochLongEx and timeInRange                 //Close Long when Stoch is getting Overbought 
    strategy.close(id = "Long")


// === STRATEGY - SHORT POSITION EXECUTION ===
if stochShort and (diff <0) and timeInRange and includeShorts  //Open Short when Stoch crossing in Overbought area and EMA Trend is down
    strategy.entry(id = "Short", long = false)
if stochShort and (diff >=0) and timeInRange                   //Close Short when another Short Stoch cross signal is given after Trend has changed to up (avoid fake signals)
    strategy.close(id = "Short")
if stochShortEx and timeInRange                                //Close Short when Stoch is getting Oversold 
    strategy.close(id = "Short")

        
// === STRATEGY RISK MANAGEMENT EXECUTION ===
//Stop Loss
if useStopLoss    //Exit when Stop Loss is hit
    strategy.exit("Exit Long SL",   from_entry = "Long",  loss = close * StopLossPerc / syminfo.mintick )
    strategy.exit("Exit Short SL",  from_entry = "Short", loss = close * StopLossPerc / syminfo.mintick )

//Take Profit
if useTakeProfit  //Exit when Take Profit Limit is hit
    strategy.exit("Exit Long TP",   from_entry = "Long",  profit = close * TakeProfitPerc / syminfo.mintick)
    strategy.exit("Exit Short TP",  from_entry = "Short", profit = close * TakeProfitPerc / syminfo.mintick)



```

> Detail

https://www.fmz.com/strategy/441100

> Last Modified

2024-02-05 15:27:03
