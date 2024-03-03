
> Name

多指标自适应趋势交易策略Multi-indicator-Adaptive-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1dab7d3165f8a385cfb.png)
[trans]

## 概述

多指标自适应趋势交易策略是一个融合多个技术指标信号的量化交易策略。它可以自动识别市场趋势方向,并根据不同市场状态采用不同参数配置来产生交易信号。

该策略同时结合了移动平均线、Stoch RSI 指标、WaveTrend 指标等多个指标,形成交易信号。并且根据总体市场趋势的判断,对每个指标的配置参数进行动态切换,实现不同市场环境下的自适应交易。

总的来说,该策略具有较强的趋势跟踪能力和适应性。它可以减少交易频率并锁定较大的单边趋势获利。

## 策略原理

### 趋势判断

该策略使用长度为300周期的指数移动平均线来判断总体趋势方向。EMA线上涨为看涨趋势,EMA线下跌为看跌趋势。

当价格突破EMA线时,会触发反转卖点来锁定之前的多头头寸。这可以有效控制风险。

### 交易信号

在不同的市场趋势下,策略采用不同的参数配置来产生交易信号。

多头趋势下的交易信号包括:

- 移动平均线金叉和位置关系
- Stoch RSI指标信号
- WaveTrend指标信号

空头趋势下的交易信号包括:

- 移动平均线死叉和位置关系
- Stoch RSI指标信号 
- WaveTrend指标信号

用户可以选择开启或关闭不同指标的不同信号组合,从而实施自定义的交易规则逻辑。

每个信号都会产生+1的信号分数。当多个信号的分数总和等于用户设置的阈值时,会触发真实的交易信号。

### 止盈止损

该策略提供多种止盈止损方式,包括百分比止盈、百分比止损、价格突破等方式。这些参数也会根据不同的市场趋势而进行动态切换。

如果未实现盈利要求,策略也提供直接平仓的方式来控制持仓时间和风险。

## 优势分析

多指标自适应趋势交易策略具有以下优势:

1. 增强的趋势识别能力。该策略使用EMA等指标判断趋势,避免被市场中的假突破或短期调整误导;
2. 灵活性强。用户可以选择开启或关闭不同指标的不同信号,定制自己的交易规则;  
3. 自适应性强。策略能够自动识别不同市场状态,采用不同的参数来产生交易信号,无需人工干预;
4. 多种止盈止损方式。该策略提供了丰富的止损止盈工具来锁定利润和控制风险;
5. 减少交易频率。只在趋势明确的时候进行交易可以减少不必要的反复交易。

## 风险分析

多指标自适应趋势交易策略也存在以下风险:

1. 错过市场反转点。使用趋势交易策略无法及时捕捉到价格反转,可能错过短线获利机会;  
2. 突破失败风险。当价格突破EMA线产生交易信号但很快失败时,会造成损失;
3. 参数设置风险。用户需要对不同参数的意义有足够了解才能取得最佳回测结果;
4. 多空趋势识别风险。极端行情中,该策略也可能会错误判断多空趋势;
5. 指标失效风险。一些指标信号在不同品种和周期设置下也会出现效果不佳的情况。

可以通过适当调整EMA平均线长度,加大止损幅度等方法来解决部分风险。

## 优化方向  

该策略还可以从以下方面进行优化:

1. 增加基于机器学习的动态参数优化模块。使参数可以根据实时市场变化自动优化,而不是固定的预设值;
2. 增加模型组合投票机制。结合多个模型判断结果,选出最优判断来发出最终信号;  
3. 优化止损机制。可试验跟踪止损、移动止损等方式来锁定利润、控制风险;
4. 自定义信号权重。允许用户为不同信号设置不同权重,而不是简单的 0/1 判断,实现指标信号的可加权结合。

## 总结

多指标自适应趋势交易策略综合运用了趋势判断、多指标信号融合、动态参数切换等方法。它作为一款量化交易策略具有强大的适应性和定制性。可以减少不必要交易的同时最大化单边趋势的捕获。该策略是量化交易的优秀代表,值得深入研究与优化运用。

||

## Overview  

The multi-indicator adaptive trend trading strategy is a quantitative trading strategy that integrates signals from multiple technical indicators. It can automatically identify the trend direction of the market and generate trading signals with different configurations based on different market conditions.

The strategy combines indicators including moving averages, Stoch RSI, WaveTrend and so on to form trade signals. Also, it switches the parameter configurations of each indicator dynamically based on the judgement of overall market trend. This allows for adaptive trading under different market environments.

In overall, the strategy has strong capabilities of tracking trends and adaptivity. It can reduce trading frequency and capture large unidirectional trend profits.  

## Strategy Logic  

### Trend Judgement  

The strategy uses a 300-period exponential moving average to determine the overall trend direction. An upward EMA line signifies a bullish outlook, and a downward EMA line signifies a bearish outlook.  

When price breaks through the EMA line, it will trigger a reverse sell signal to lock in previous long positions. This can effectively control risks.   

### Trade Signals

Under different market trends, the strategy adopts different parameter configurations to generate trading signals.  

Trading signals under an uptrend include:  

- Moving average crossovers and positions  
- Stoch RSI signals  
- WaveTrend signals  

Trading signals under a downtrend include:   

- Moving average cross unders and positions 
- Stoch RSI signals  
- WaveTrend signals  

Users can enable or disable different signals from different indicators to implement customized trading logic.  

Each signal contributes +1 signal score. When the total score meets the threshold set by users, real trading signals will be triggered.   

### Profit Taking and Stop Loss

The strategy provides multiple ways of profit taking and stop loss, including percentage profit taking, percentage stop loss, price breakout, etc. These parameters also switch dynamically based on different market trends.  

If profit requirements are not met, the strategy also provides a way to directly close positions to control holding period and risks.   

## Advantage Analysis  

The multi-indicator adaptive trend trading strategy has the following advantages:  

1. Enhanced trend identification capability. The strategy uses EMA and other indicators to determine trends, avoiding being misguided by false breakouts or short-term corrections in the market.  
2. Great flexibility. Users can enable or disable different signals from different indicators to customize their own trading rules.   
3. Strong adaptivity. The strategy can automatically identify different market conditions and adopt different parameters to generate trading signals without manual intervention.  
4. Multiple profit taking and stop loss methods. The strategy provides abundant tools of profit taking and stop loss to lock in gains and control risks. 
5. Reduced trading frequency. Only trading when trends are clear can decrease unnecessary round-trip trading.  

## Risk Analysis   

The multi-indicator adaptive trend trading strategy also has the following risks:  

1. Missing market turning points. Trend trading strategies cannot capture price reversals in time and may miss short-term profit opportunities.   
2. Failed breakout risk. When prices break through the EMA line to generate signals but fail quickly, it will lead to losses.  
3. Parameter tuning risk. Users need sufficient understanding of the meaning of each parameter to achieve optimal backtesting results.  
4. Trend identification risk. The strategy may also wrongly identify trends in extreme market conditions.   
5. Indicator failure risk. Some indicator signals may underperform in different products and timeframes too.  

Some of the risks can be solved by properly adjusting the EMA length, expanding stop loss range, etc.  

## Optimization Directions   

The strategy can also be upgraded from the following aspects:  

1. Add dynamic parameter optimization module based on machine learning. So parameters can be automatically optimized based on real-time market changes, instead of fixed preset values.  
2. Add model ensemble voting mechanism. Combine judgements from multiple models and select the optimum as final signal.   
3. Optimize stop loss mechanism. Can try trailing stop loss, moving stop loss to better lock in profits and control risks.  
4. Customize signal weights. Allow users to set different weights for different signals rather than simple 0/1 logic. Achieve weighted combination of indicator signals.

## Summary  

The multi-indicator adaptive trend trading strategy integrates methods including trend judgment, fusion of multiple indicator signals, dynamic parameter switching. As a quantitative trading strategy, it has great adaptivity and customizability. It can reduce unnecessary trading while maximizing the capture of unilateral trends. The strategy is an outstanding representative of quantitative trading and deserves in-depth research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|(?SETUP GUIDE AT YouTube.com/c/ZacVaughnYT)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|(?POSITIONS)Trade Direction: LONG|SHORT|
|v_input_1|false|Only Trade with Trend|
|v_input_string_2|0|Trend MA: EMA|SMA|RMA|HMA|WMA|VWMA|
|v_input_int_3|300|mat_length|
|v_input_10|false|Sell After Trend Reverses|
|v_input_int_4|10|Sell After (bars)|
|v_input_2|true|(?UPTREND ? PROFIT & LOSS)Only Sell in Profit|
|v_input_float_1|3.6|Minimum Profit (%)|
|v_input_3|true|Use Take Profit|
|v_input_float_2|11.5|Take Profit (%)|
|v_input_4|true|Use Stop Loss|
|v_input_float_3|-7.5|Stop Loss (%)|
|v_input_5|false|Use Trade Expiration|
|v_input_int_1|200|Expire After (bars)|
|v_input_6|true|(?DOWNTREND ? PROFIT & LOSS)Only Sell in Profit|
|v_input_float_4|true|Minimum Profit (%)|
|v_input_7|false|Use Take Profit|
|v_input_float_5|15|Take Profit (%)|
|v_input_8|true|Use Stop Loss|
|v_input_float_6|-7.4|Stop Loss (%)|
|v_input_9|false|Use Trade Expiration|
|v_input_int_2|200|Expire After (bars)|
|v_input_11|false|(?UPTREND ? MOVING AVERAGE SIGNALS)Moving Average Cross|
|v_input_12|true|Moving Average Position|
|v_input_13|false|MA Histogram Reverse|
|v_input_string_3|0|MA 1: RMA|EMA|SMA|HMA|WMA|VWMA|
|v_input_int_5|7|UTma1_length|
|v_input_string_4|0|MA 2: HMA|EMA|RMA|SMA|WMA|VWMA|
|v_input_int_6|54|UTma2_length|
|v_input_14|false|(?DOWNTREND ? MOVING AVERAGE SIGNALS)Moving Average Cross|
|v_input_15|true|Moving Average Position|
|v_input_16|false|MA Histogram Reverse|
|v_input_string_5|0|MA 1: RMA|EMA|SMA|HMA|WMA|VWMA|
|v_input_int_7|7|DTma1_length|
|v_input_string_6|0|MA 2: HMA|EMA|RMA|SMA|WMA|VWMA|
|v_input_int_8|54|DTma2_length|
|v_input_17|false|(?UPTREND ? STOCH RSI SIGNALS)Stoch RSI Cross Signal|
|v_input_18|true|Use Buy/Sell Levels|
|v_input_int_9|61|Buy Below Level|
|v_input_int_10|13|Sell Above Level|
|v_input_19|false|Use Stoch RSI Position|
|v_input_20|false|Stoch RSI Divergence|
|v_input_int_13|12|RSI Length|
|v_input_int_14|20|Stochastic Length|
|v_input_21|false|(?DOWNTREND ? STOCH RSI SIGNALS)Stoch RSI Cross Signal|
|v_input_22|true|Use Buy/Sell Levels|
|v_input_int_11|61|Buy Below Level|
|v_input_int_12|13|Sell Above Level|
|v_input_23|false|Use Stoch RSI Position|
|v_input_24|false|Stoch RSI Divergence|
|v_input_int_15|12|RSI Length|
|v_input_int_16|20|Stochastic Length|
|v_input_25|false|(?UPTREND ? WAVETREND SIGNALS)WaveTrend Cross|
|v_input_26|true|WaveTrend Level|
|v_input_int_17|82|Buy Below Level|
|v_input_int_18|15|Sell Above Level|
|v_input_27|false|WaveTrend Position|
|v_input_28|false|WaveTrend Divergence|
|v_input_int_21|9|Channel Length|
|v_input_int_22|12|Average Length|
|v_input_29|false|(?DOWNTREND ? WAVETREND SIGNALS)WaveTrend Cross|
|v_input_30|false|WaveTrend Level|
|v_input_int_19|false|Buy Below Level|
|v_input_int_20|false|Sell Above Level|
|v_input_31|false|WaveTrend Position|
|v_input_32|false|WaveTrend Divergence|
|v_input_int_23|9|Channel Length|
|v_input_int_24|12|Average Length|
|v_input_33|true|(?Custom Alert Messages)Use ENTRY Alert|
|v_input_string_7|ENTRY|Entry Alert Message|
|v_input_34|true|Use EXIT Alert|
|v_input_string_8|EXIT|Exit Alert Message|
|v_input_35|true|Use TAKE Alert|
|v_input_string_9|TAKE|Take Profit Alert Message|
|v_input_36|true|Use STOP Alert|
|v_input_string_10|STOP|Stop Loss Alert Message|
|v_input_37|true|Use EXPIRE Alert|
|v_input_string_11|EXPIRE|Expire Trade Alert Message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-21 00:00:00
end: 2023-12-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

////////////////////////////////////////////////////////////////////////////////
//START▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

c="███████╗ █████╗  █████╗   ██╗   ██╗ █████╗ ██╗   ██╗ ██████╗ ██╗  ██╗███╗  ██╗"
o="╚════██║██╔══██╗██╔══██╗  ██║   ██║██╔══██╗██║   ██║██╔════╝ ██║  ██║████╗ ██║"
d="  ███╔═╝███████║██║  ╚═╝  ╚██╗ ██╔╝███████║██║   ██║██║  ██╗ ███████║██╔██╗██║"
e="██╔══╝  ██╔══██║██║  ██╗   ╚████╔╝ ██╔══██║██║   ██║██║  ╚██╗██╔══██║██║╚████║"
r="███████╗██║  ██║╚█████╔╝    ╚██╔╝  ██║  ██║╚██████╔╝╚██████╔╝██║  ██║██║ ╚███║"
s="╚══════╝╚═╝  ╚═╝ ╚════╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚══╝"

//@version=5
strategy("Instrument-Z", overlay=true, initial_capital=1600, default_qty_type=strategy.percent_of_equity, default_qty_value=90, commission_value=0.075)

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//BAR COLOR AND EMA AREA▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//BAR COLOR
bullCcolor = close > open ? #80cbc4 : na
bearCcolor = close < open ? #ef9a9a : na
bullC = close > open
bearC = close < open
bullE = bullC and bearC[1] and close > open[1] ? color.new(#ffffff, 100) : bullCcolor
bearE = bearC and bullC[1] and close < open[1] ? color.new(#ffffff, 100) : bearCcolor
barcolor(bullE)
barcolor(bearE)

//EMA 1
len1 = 10
ema1 = ta.ema(close, len1)
//EMA 2
len2 = 100
ema2 = ta.ema(close, len2)
//EMA COLORS
emacolor = ema1 > ema2 ? #26a69a : #ef5350
//EMA PLOTS
ema1line = plot(ema1, title="EMA 1", color=color.new(#ffffff, 100), editable=false)
ema2line = plot(ema2, title="EMA 2", color=color.new(#ffffff, 100), editable=false)
fill(ema1line, ema2line, title="EMA Area", color=color.new(emacolor, 90))

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//INITIAL OPTIONS▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

src = input.source(defval=close, title="Source", group="SETUP GUIDE AT YouTube.com/c/ZacVaughnYT")
//tfr = input.timeframe("", title="Resolution")
//request.security(syminfo.tickerid, tfr, expression, barmerge.gaps_on)

//POSITIONS
TradeDir = input.string("LONG", title="Trade Direction", options=["LONG", "SHORT"], group="POSITIONS")
TrendTrade = input(false, "Only Trade with Trend", group="POSITIONS")

//UPTREND PROFIT AND LOSS
UTsellProf = input(true, title="Only Sell in Profit", group="UPTREND ? PROFIT & LOSS")
UTminProf = input.float(title="Minimum Profit (%)", defval=3.6, minval=0, maxval=100,  step=.1, group="UPTREND ? PROFIT & LOSS") / 100
UTuseTP = input(true,  title="Use Take Profit", group="UPTREND ? PROFIT & LOSS")
UTTPperc = input.float(title="Take Profit (%)", defval=11.5, minval=0, maxval=1000, step=.1, group="UPTREND ? PROFIT & LOSS") / 100
UTuseSL = input(true,  title="Use Stop Loss", group="UPTREND ? PROFIT & LOSS")
UTSLperc = input.float(title="Stop Loss (%)", defval=-7.5, minval=-50, maxval=0, step=.1, group="UPTREND ? PROFIT & LOSS") / 100
UTuseTE = input(false, title="Use Trade Expiration", group="UPTREND ? PROFIT & LOSS")
UTTEbars = input.int(title="Expire After (bars)", defval=200, minval=1, maxval=10000, group="UPTREND ? PROFIT & LOSS")

//DOWNTREND PROFIT AND LOSS
DTsellProf = input(true, title="Only Sell in Profit", group="DOWNTREND ? PROFIT & LOSS")
DTminProf = input.float(title="Minimum Profit (%)", defval=1, minval=0, maxval=100,  step=.1, group="DOWNTREND ? PROFIT & LOSS") / 100
DTuseTP = input(false,  title="Use Take Profit", group="DOWNTREND ? PROFIT & LOSS")
DTTPperc = input.float(title="Take Profit (%)", defval=15, minval=0, maxval=1000, step=.1, group="DOWNTREND ? PROFIT & LOSS") / 100
DTuseSL = input(true,  title="Use Stop Loss", group="DOWNTREND ? PROFIT & LOSS")
DTSLperc = input.float(title="Stop Loss (%)", defval=-7.4, minval=-50, maxval=0, step=.1, group="DOWNTREND ? PROFIT & LOSS") / 100
DTuseTE = input(false, title="Use Trade Expiration", group="DOWNTREND ? PROFIT & LOSS")
DTTEbars = input.int(title="Expire After (bars)", defval=200, minval=1, maxval=10000, group="DOWNTREND ? PROFIT & LOSS")

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//TREND MOVING AVERAGE▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//TREND MA
ma(source, length, type) =>
     type == "SMA"  ? ta.sma(source, length) :
     type == "EMA"  ? ta.ema(source, length) :
     type == "RMA"  ? ta.rma(source, length) :
     type == "HMA"  ? ta.wma(2*ta.wma(source, length/2)-ta.wma(source, length), math.floor(math.sqrt(length))) :
     type == "WMA"  ? ta.wma(source, length) :
     type == "VWMA" ? ta.vwma(source, length) :
     na
mat_type   = input.string("EMA", "Trend MA", inline="Trend MA", options=["SMA", "EMA", "RMA", "HMA", "WMA", "VWMA"], group="POSITIONS")
mat_length = input.int(300, "", inline="Trend MA", minval=1, step=5, group="POSITIONS")
mat = ma(src, mat_length, mat_type)
matcolor = mat > mat[1] ? #26a69a : #ef5350
matline = plot(mat, color=color.new(matcolor, 50), linewidth=2, title="Trend MA")
matRevS = input(false, title="Sell After Trend Reverses", group="POSITIONS")
matRevSbars = input.int(10, "Sell After (bars)", group="POSITIONS")

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//CROSSING MOVING AVERAGES▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//UPTREND OPTIONS
//Cross
UTUsemaX = input(false, "Moving Average Cross", group="UPTREND ? MOVING AVERAGE SIGNALS")
UTReqmaXscore = UTUsemaX ? 1 : 0
//Position
UTUsemaP = input(true, "Moving Average Position", group="UPTREND ? MOVING AVERAGE SIGNALS")
UTReqmaPscore = UTUsemaP ? 1 : 0
//Histogram
UTUsemaH = input(false, "MA Histogram Reverse", group="UPTREND ? MOVING AVERAGE SIGNALS")
UTReqmaHscore = UTUsemaH ? 1 : 0

//DOWNTREND OPTIONS
//Cross
DTUsemaX = input(false, "Moving Average Cross", group="DOWNTREND ? MOVING AVERAGE SIGNALS")
DTReqmaXscore = DTUsemaX ? 1 : 0
//Position
DTUsemaP = input(true, "Moving Average Position", group="DOWNTREND ? MOVING AVERAGE SIGNALS")
DTReqmaPscore = DTUsemaP ? 1 : 0
//Histogram
DTUsemaH = input(false, "MA Histogram Reverse", group="DOWNTREND ? MOVING AVERAGE SIGNALS")
DTReqmaHscore = DTUsemaH ? 1 : 0

//UPTREND INPUTS
//MA1
UTma1_type   = input.string("RMA", "MA 1", inline="UT MA 1", options=["SMA", "EMA", "RMA", "HMA", "WMA", "VWMA"], group="UPTREND ? MOVING AVERAGE SIGNALS")
UTma1_length = input.int(7, "", inline="UT MA 1", minval=1, group="UPTREND ? MOVING AVERAGE SIGNALS")
UTma1 = ma(src, UTma1_length, UTma1_type)
UTma1Color = mat > mat[1] ? color.new(color.blue, 35) : color.new(color.blue, 100)
UTma1line = plot(UTma1, color=UTma1Color, title="UT MA 1")
//MA2
UTma2_type   = input.string("HMA", "MA 2", inline="UT MA 2", options=["SMA", "EMA", "RMA", "HMA", "WMA", "VWMA"], group="UPTREND ? MOVING AVERAGE SIGNALS")
UTma2_length = input.int(54, "", inline="UT MA 2", minval=1, group="UPTREND ? MOVING AVERAGE SIGNALS")
UTma2 = ma(src, UTma2_length, UTma2_type)
UTma2Color = mat > mat[1] ? color.new(color.purple, 35) : color.new(color.purple, 100)
UTma2line = plot(UTma2, color=UTma2Color, title="UT MA 2")
UTmahist = UTma1 - UTma2

//DOWNTREND INPUTS
//MA1
DTma1_type   = input.string("RMA", "MA 1", inline="DT MA 1", options=["SMA", "EMA", "RMA", "HMA", "WMA", "VWMA"], group="DOWNTREND ? MOVING AVERAGE SIGNALS")
DTma1_length = input.int(7, "", inline="DT MA 1", minval=1, group="DOWNTREND ? MOVING AVERAGE SIGNALS")
DTma1 = ma(src, DTma1_length, DTma1_type)
DTma1Color = mat > mat[1] ? color.new(color.blue, 100) : color.new(color.blue, 35)
DTma1line = plot(DTma1, color=DTma1Color, title="DT MA 1")
//MA2
DTma2_type   = input.string("HMA", "MA 2", inline="DT MA 2", options=["SMA", "EMA", "RMA", "HMA", "WMA", "VWMA"], group="DOWNTREND ? MOVING AVERAGE SIGNALS")
DTma2_length = input.int(54, "", inline="DT MA 2", minval=1, group="DOWNTREND ? MOVING AVERAGE SIGNALS")
DTma2 = ma(src, DTma2_length, DTma2_type)
DTma2Color = mat > mat[1] ? color.new(color.purple, 100) : color.new(color.purple, 35)
DTma2line = plot(DTma2, color=DTma2Color, title="DT MA 2")
DTmahist = DTma1 - DTma2

//UPTREND SIGNALS
UTmaXup = UTUsemaX and UTma1 > UTma2 and UTma1[1] < UTma2[1] ? 1 : 0
UTmaXdn = UTUsemaX and UTma1 < UTma2 and UTma1[1] > UTma2[1] ? 1 : 0
UTmaPup = UTUsemaP and UTma1 > UTma2 ? 1 : 0
UTmaPdn = UTUsemaP and UTma1 < UTma2 ? 1 : 0
UTmaHup = UTUsemaH and UTmahist > UTmahist[1] and UTmahist[1] < UTmahist[2] ? 1 : 0
UTmaHdn = UTUsemaH and UTmahist < UTmahist[1] and UTmahist[1] > UTmahist[2] ? 1 : 0

//DOWNTREND SIGNALS
DTmaXup = DTUsemaX and DTma1 > DTma2 and DTma1[1] < DTma2[1] ? 1 : 0
DTmaXdn = DTUsemaX and DTma1 < DTma2 and DTma1[1] > DTma2[1] ? 1 : 0
DTmaPup = DTUsemaP and DTma1 > DTma2 ? 1 : 0
DTmaPdn = DTUsemaP and DTma1 < DTma2 ? 1 : 0
DTmaHup = DTUsemaH and DTmahist > DTmahist[1] and DTmahist[1] < DTmahist[2] ? 1 : 0
DTmaHdn = DTUsemaH and DTmahist < DTmahist[1] and DTmahist[1] > DTmahist[2] ? 1 : 0

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//STOCHASTIC RSI▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//UPTREND OPTIONS
//Cross
UTUseSrsiX = input(false, "Stoch RSI Cross Signal", group="UPTREND ? STOCH RSI SIGNALS")
UTReqSrsiXscore = UTUseSrsiX ? 1 : 0
//Level
UTUseSrsiL = input(true, "Use Buy/Sell Levels", group="UPTREND ? STOCH RSI SIGNALS")
UTsablevelb = input.int(61, "Buy Below Level", group="UPTREND ? STOCH RSI SIGNALS")
UTsablevels = input.int(13, "Sell Above Level", group="UPTREND ? STOCH RSI SIGNALS")
UTReqSrsiLscore = UTUseSrsiL ? 1 : 0
//Position
UTUseSrsiP = input(false, "Use Stoch RSI Position", group="UPTREND ? STOCH RSI SIGNALS")
UTReqSrsiPscore = UTUseSrsiP ? 1 : 0
//Divergence
UTUseSrsiD = input(false, "Stoch RSI Divergence", group="UPTREND ? STOCH RSI SIGNALS")
UTReqSrsiDscore = UTUseSrsiD ? 1 : 0

//DOWNTREND OPTIONS
//Cross
DTUseSrsiX = input(false, "Stoch RSI Cross Signal", group="DOWNTREND ? STOCH RSI SIGNALS")
DTReqSrsiXscore = DTUseSrsiX ? 1 : 0
//Level
DTUseSrsiL = input(true, "Use Buy/Sell Levels", group="DOWNTREND ? STOCH RSI SIGNALS")
DTsablevelb = input.int(61, "Buy Below Level", group="DOWNTREND ? STOCH RSI SIGNALS")
DTsablevels = input.int(13, "Sell Above Level", group="DOWNTREND ? STOCH RSI SIGNALS")
DTReqSrsiLscore = DTUseSrsiL ? 1 : 0
//Position
DTUseSrsiP = input(false, "Use Stoch RSI Position", group="DOWNTREND ? STOCH RSI SIGNALS")
DTReqSrsiPscore = DTUseSrsiP ? 1 : 0
//Divergence
DTUseSrsiD = input(false, "Stoch RSI Divergence", group="DOWNTREND ? STOCH RSI SIGNALS")
DTReqSrsiDscore = DTUseSrsiD ? 1 : 0

//UPTREND INPUTS
//STOCH RSI
UTlengthRSI = input.int(12, "RSI Length", minval=1, group="UPTREND ? STOCH RSI SIGNALS")
UTlengthStoch = input.int(20, "Stochastic Length", minval=1, group="UPTREND ? STOCH RSI SIGNALS")
UTrsi1 = ta.rsi(src, UTlengthRSI)
UTrk = ta.sma(ta.stoch(UTrsi1, UTrsi1, UTrsi1, UTlengthStoch), 3)
UTrd = ta.sma(UTrk, 3)

//DOWNTREND INPUTS
//STOCH RSI
DTlengthRSI = input.int(12, "RSI Length", minval=1, group="DOWNTREND ? STOCH RSI SIGNALS")
DTlengthStoch = input.int(20, "Stochastic Length", minval=1, group="DOWNTREND ? STOCH RSI SIGNALS")
DTrsi1 = ta.rsi(src, DTlengthRSI)
DTrk = ta.sma(ta.stoch(DTrsi1, DTrsi1, DTrsi1, DTlengthStoch), 3)
DTrd = ta.sma(DTrk, 3)

//UPTREND DIVERGENCE
inRange(cond) =>
	bars = ta.barssince(cond == true)
	5 <= bars and bars <= 60
osc2 = UTrk
//Pivots
plFound2 = na(ta.pivotlow(osc2, 5, 2)) ? false : true
phFound2 = na(ta.pivothigh(osc2, 5, 2)) ? false : true
//Regular Bullish
oscHL2 = osc2[2] > ta.valuewhen(plFound2, osc2[2], 1) and inRange(plFound2[1])
priceLL2 = low[2] < ta.valuewhen(plFound2, low[2], 1)
bullCond2 = priceLL2 and oscHL2 and plFound2
//Hidden Bullish
oscLL2 = osc2[2] < ta.valuewhen(plFound2, osc2[2], 1) and inRange(plFound2[1])
priceHL2 = low[2] > ta.valuewhen(plFound2, low[2], 1)
hiddenBullCond2 = priceHL2 and oscLL2 and plFound2
//Regular Bearish
oscLH2 = osc2[2] < ta.valuewhen(phFound2, osc2[2], 1) and inRange(phFound2[1])
priceHH2 = high[2] > ta.valuewhen(phFound2, high[2], 1)
bearCond2 = priceHH2 and oscLH2 and phFound2
//Hidden Bearish
oscHH2 = osc2[2] > ta.valuewhen(phFound2, osc2[2], 1) and inRange(phFound2[1])
priceLH2 = high[2] < ta.valuewhen(phFound2, high[2], 1)
hiddenBearCond2 = priceLH2 and oscHH2 and phFound2

//DOWNTREND DIVERGENCE
osc3 = DTrk
//Pivots
plFound3 = na(ta.pivotlow(osc3, 5, 2)) ? false : true
phFound3 = na(ta.pivothigh(osc3, 5, 2)) ? false : true
//Regular Bullish
oscHL3 = osc3[2] > ta.valuewhen(plFound3, osc3[2], 1) and inRange(plFound3[1])
priceLL3 = low[2] < ta.valuewhen(plFound3, low[2], 1)
bullCond3 = priceLL3 and oscHL3 and plFound3
//Hidden Bullish
oscLL3 = osc3[2] < ta.valuewhen(plFound3, osc3[2], 1) and inRange(plFound3[1])
priceHL3 = low[2] > ta.valuewhen(plFound3, low[2], 1)
hiddenBullCond3 = priceHL3 and oscLL3 and plFound3
//Regular Bearish
oscLH3 = osc3[2] < ta.valuewhen(phFound3, osc3[2], 1) and inRange(phFound3[1])
priceHH3 = high[2] > ta.valuewhen(phFound3, high[2], 1)
bearCond3 = priceHH3 and oscLH3 and phFound3
//Hidden Bearish
oscHH3 = osc3[2] > ta.valuewhen(phFound3, osc3[2], 1) and inRange(phFound3[1])
priceLH3 = high[2] < ta.valuewhen(phFound3, high[2], 1)
hiddenBearCond3 = priceLH3 and oscHH3 and phFound3

//UPTREND SIGNALS
UTSrsiXup = UTUseSrsiX and UTrk > UTrd and UTrk[1] < UTrd[1] ? 1 : 0
UTSrsiXdn = UTUseSrsiX and UTrk < UTrd and UTrk[1] > UTrd[1] ? 1 : 0
UTSrsiLup = UTUseSrsiL and UTrk < UTsablevelb ? 1 : 0
UTSrsiLdn = UTUseSrsiL and UTrk > UTsablevels ? 1 : 0
UTSrsiPup = UTUseSrsiP and UTrk > UTrd ? 1 : 0
UTSrsiPdn = UTUseSrsiP and UTrk < UTrd ? 1 : 0
UTSrsiDup = UTUseSrsiD and bullCond2 ? 1 : 0
UTSrsiDdn = UTUseSrsiD and bearCond2 ? 1 : 0

//DOWNTREND SIGNALS
DTSrsiXup = DTUseSrsiX and DTrk > DTrd and DTrk[1] < DTrd[1] ? 1 : 0
DTSrsiXdn = DTUseSrsiX and DTrk < DTrd and DTrk[1] > DTrd[1] ? 1 : 0
DTSrsiLup = DTUseSrsiL and DTrk < DTsablevelb ? 1 : 0
DTSrsiLdn = DTUseSrsiL and DTrk > DTsablevels ? 1 : 0
DTSrsiPup = DTUseSrsiP and DTrk > DTrd ? 1 : 0
DTSrsiPdn = DTUseSrsiP and DTrk < DTrd ? 1 : 0
DTSrsiDup = DTUseSrsiD and bullCond3 ? 1 : 0
DTSrsiDdn = DTUseSrsiD and bearCond3 ? 1 : 0

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//WAVETREND▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//UPTREND OPTIONS
//Cross
UTUsewtX = input(false, "WaveTrend Cross", group="UPTREND ? WAVETREND SIGNALS")
UTReqwtXscore = UTUsewtX ? 1 : 0
//Level
UTUsewtL = input(true, "WaveTrend Level", group="UPTREND ? WAVETREND SIGNALS")
UTwablevelb = input.int(82, "Buy Below Level", group="UPTREND ? WAVETREND SIGNALS")
UTwablevels = input.int(15, "Sell Above Level", group="UPTREND ? WAVETREND SIGNALS")
UTReqwtLscore = UTUsewtL ? 1 : 0
//Position
UTUsewtP = input(false, "WaveTrend Position", group="UPTREND ? WAVETREND SIGNALS")
UTReqwtPscore = UTUsewtP ? 1 : 0
//Divergence
UTUsewtD = input(false, "WaveTrend Divergence", group="UPTREND ? WAVETREND SIGNALS")
UTReqwtDscore = UTUsewtD ? 1 : 0

//DOWNTREND OPTIONS
//Cross
DTUsewtX = input(false, "WaveTrend Cross", group="DOWNTREND ? WAVETREND SIGNALS")
DTReqwtXscore = DTUsewtX ? 1 : 0
//Level
DTUsewtL = input(false, "WaveTrend Level", group="DOWNTREND ? WAVETREND SIGNALS")
DTwablevelb = input.int(0, "Buy Below Level", group="DOWNTREND ? WAVETREND SIGNALS")
DTwablevels = input.int(0, "Sell Above Level", group="DOWNTREND ? WAVETREND SIGNALS")
DTReqwtLscore = DTUsewtL ? 1 : 0
//Position
DTUsewtP = input(false, "WaveTrend Position", group="DOWNTREND ? WAVETREND SIGNALS")
DTReqwtPscore = DTUsewtP ? 1 : 0
//Divergence
DTUsewtD = input(false, "WaveTrend Divergence", group="DOWNTREND ? WAVETREND SIGNALS")
DTReqwtDscore = DTUsewtD ? 1 : 0

//UPTREND INPUTS
//WT
UTlenC = input.int(9, title="Channel Length", group="UPTREND ? WAVETREND SIGNALS")
UTlenA = input.int(12, title="Average Length", group="UPTREND ? WAVETREND SIGNALS")
UTap = hlc3 
UTesa = ta.ema(UTap, UTlenC)
UTd1 = ta.ema(math.abs(UTap - UTesa), UTlenC)
UTci = (UTap - UTesa) / (0.015 * UTd1)
UTtci = ta.ema(UTci, UTlenA)
UTwt1 = UTtci
UTwt2 = ta.sma(UTwt1, 4)
UTwthist = UTwt2 - UTwt1

//DOWNTREND INPUTS
//WT
DTlenC = input.int(9, title="Channel Length", group="DOWNTREND ? WAVETREND SIGNALS")
DTlenA = input.int(12, title="Average Length", group="DOWNTREND ? WAVETREND SIGNALS")
DTap = hlc3 
DTesa = ta.ema(DTap, DTlenC)
DTd1 = ta.ema(math.abs(DTap - DTesa), DTlenC)
DTci = (DTap - DTesa) / (0.015 * DTd1)
DTtci = ta.ema(DTci, DTlenA)
DTwt1 = DTtci
DTwt2 = ta.sma(DTwt1, 4)
DTwthist = DTwt2 - DTwt1

//UPTREND DIVERGENCE
osc4 = UTwt1
//Pivots
plFound4 = na(ta.pivotlow(osc4, 5, 2)) ? false : true
phFound4 = na(ta.pivothigh(osc4, 5, 2)) ? false : true
//Regular Bullish
oscHL4 = osc4[2] > ta.valuewhen(plFound4, osc4[2], 1) and inRange(plFound4[1])
priceLL4 = low[2] < ta.valuewhen(plFound4, low[2], 1)
bullCond4 = priceLL4 and oscHL4 and plFound4
//Hidden Bullish
oscLL4 = osc4[2] < ta.valuewhen(plFound4, osc4[2], 1) and inRange(plFound4[1])
priceHL4 = low[2] > ta.valuewhen(plFound4, low[2], 1)
hiddenBullCond4 = priceHL4 and oscLL4 and plFound4
//Regular Bearish
oscLH4 = osc4[2] < ta.valuewhen(phFound4, osc4[2], 1) and inRange(phFound4[1])
priceHH4 = high[2] > ta.valuewhen(phFound4, high[2], 1)
bearCond4 = priceHH4 and oscLH4 and phFound4
//Hidden Bearish
oscHH4 = osc4[2] > ta.valuewhen(phFound4, osc4[2], 1) and inRange(phFound4[1])
priceLH4 = high[2] < ta.valuewhen(phFound4, high[2], 1)
hiddenBearCond4 = priceLH4 and oscHH4 and phFound4

//DOWNTREND DIVERGENCE
osc5 = DTwt1
//Pivots
plFound5 = na(ta.pivotlow(osc5, 5, 2)) ? false : true
phFound5 = na(ta.pivothigh(osc5, 5, 2)) ? false : true
//Regular Bullish
oscHL5 = osc5[2] > ta.valuewhen(plFound5, osc5[2], 1) and inRange(plFound5[1])
priceLL5 = low[2] < ta.valuewhen(plFound5, low[2], 1)
bullCond5 = priceLL5 and oscHL5 and plFound5
//Hidden Bullish
oscLL5 = osc5[2] < ta.valuewhen(plFound5, osc5[2], 1) and inRange(plFound5[1])
priceHL5 = low[2] > ta.valuewhen(plFound5, low[2], 1)
hiddenBullCond5 = priceHL5 and oscLL5 and plFound5
//Regular Bearish
oscLH5 = osc5[2] < ta.valuewhen(phFound5, osc5[2], 1) and inRange(phFound5[1])
priceHH5 = high[2] > ta.valuewhen(phFound5, high[2], 1)
bearCond5 = priceHH5 and oscLH5 and phFound5
//Hidden Bearish
oscHH5 = osc5[2] > ta.valuewhen(phFound5, osc5[2], 1) and inRange(phFound5[1])
priceLH5 = high[2] < ta.valuewhen(phFound5, high[2], 1)
hiddenBearCond5 = priceLH5 and oscHH5 and phFound5

//UPTREND SIGNALS
UTwtXup = UTUsewtX and UTwt1 > UTwt2 and UTwt1[1] < UTwt2[1] and UTwt1 < 0 ? 1 : 0
UTwtXdn = UTUsewtX and UTwt1 < UTwt2 and UTwt1[1] > UTwt2[1] and UTwt1 > 0 ? 1 : 0
UTwtLup = UTUsewtL and UTwt1 < UTwablevelb ? 1 : 0
UTwtLdn = UTUsewtL and UTwt1 > UTwablevels ? 1 : 0
UTwtPup = UTUsewtP and UTwt1 > UTwt2 ? 1 : 0
UTwtPdn = UTUsewtP and UTwt1 < UTwt2 ? 1 : 0
UTwtDup = UTUsewtD and bullCond4 ? 1 : 0
UTwtDdn = UTUsewtD and bearCond4 ? 1 : 0

//DOWNTREND SIGNALS
DTwtXup = DTUsewtX and DTwt1 > DTwt2 and DTwt1[1] < DTwt2[1] and DTwt1 < 0 ? 1 : 0
DTwtXdn = DTUsewtX and DTwt1 < DTwt2 and DTwt1[1] > DTwt2[1] and DTwt1 > 0 ? 1 : 0
DTwtLup = DTUsewtL and DTwt1 < DTwablevelb ? 1 : 0
DTwtLdn = DTUsewtL and DTwt1 > DTwablevels ? 1 : 0
DTwtPup = DTUsewtP and DTwt1 > DTwt2 ? 1 : 0
DTwtPdn = DTUsewtP and DTwt1 < DTwt2 ? 1 : 0
DTwtDup = DTUsewtD and bullCond5 ? 1 : 0
DTwtDdn = DTUsewtD and bearCond5 ? 1 : 0

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//COLLECT SIGNALS▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//UT REQUIRED SCORES
UTReqScore = UTReqmaXscore + UTReqmaPscore + UTReqmaHscore + UTReqSrsiXscore + UTReqSrsiLscore + UTReqSrsiPscore + UTReqSrsiDscore + UTReqwtXscore + UTReqwtLscore + UTReqwtPscore + UTReqwtDscore
//DT REQUIRED SCORES
DTReqScore = DTReqmaXscore + DTReqmaPscore + DTReqmaHscore + DTReqSrsiXscore + DTReqSrsiLscore + DTReqSrsiPscore + DTReqSrsiDscore + DTReqwtXscore + DTReqwtLscore + DTReqwtPscore + DTReqwtDscore

//UT SIGNAL SCORES
UTSigB = UTmaXup + UTmaPup + UTmaHup + UTSrsiXup + UTSrsiLup + UTSrsiPup + UTSrsiDup + UTwtXup + UTwtLup + UTwtPup + UTwtDup
UTSigS = UTmaXdn + UTmaPdn + UTmaHdn + UTSrsiXdn + UTSrsiLdn + UTSrsiPdn + UTSrsiDdn + UTwtXdn + UTwtLdn + UTwtPdn + UTwtDdn
//DT SIGNAL SCORES
DTSigB = DTmaXup + DTmaPup + DTmaHup + DTSrsiXup + DTSrsiLup + DTSrsiPup + DTSrsiDup + DTwtXup + DTwtLup + DTwtPup + DTwtDup
DTSigS = DTmaXdn + DTmaPdn + DTmaHdn + DTSrsiXdn + DTSrsiLdn + DTSrsiPdn + DTSrsiDdn + DTwtXdn + DTwtLdn + DTwtPdn + DTwtDdn

//UT BUY AND SELL
UTNormB = UTSigB == UTReqScore ? 1 : na
UTNormS = UTSigS == UTReqScore ? 1 : na
//DT BUY AND SELL
DTNormB = DTSigB == DTReqScore ? 1 : na
DTNormS = DTSigS == DTReqScore ? 1 : na

//CHECK TREND DIRECTION
UpTrend = mat > mat[1]
BCond = UpTrend ? UTNormB : DTNormB
SCond = UpTrend ? UTNormS : DTNormS

//FINALIZE
LongEntryFinal  = TrendTrade ? BCond and mat > mat[1] : BCond
LongExitFinal   = TrendTrade ? SCond and mat > mat[1] : SCond
ShortEntryFinal = TrendTrade ? SCond and mat < mat[1] : SCond
ShortExitFinal  = TrendTrade ? BCond and mat < mat[1] : BCond

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//STOP LOSS & TAKE PROFIT▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//UT MINIMUM PROFIT
UTmpconvertL = strategy.position_avg_price * (1 + UTminProf)
UTmpconvertS = strategy.position_avg_price * (1 - UTminProf)
UTmpdefineL = TradeDir == "LONG" ? (UTmpconvertL < close and strategy.openprofit > 0) and UTsellProf : na
UTmpdefineS = TradeDir == "SHORT" ? (UTmpconvertS > close and strategy.openprofit > 0) and UTsellProf : na
UTSPL = LongExitFinal and UTmpdefineL
UTSPS = ShortExitFinal and UTmpdefineS
//DT MINIMUM PROFIT
DTmpconvertL = strategy.position_avg_price * (1 + DTminProf)
DTmpconvertS = strategy.position_avg_price * (1 - DTminProf)
DTmpdefineL = TradeDir == "LONG" ? (DTmpconvertL < close and strategy.openprofit > 0) and DTsellProf : na
DTmpdefineS = TradeDir == "SHORT" ? (DTmpconvertS > close and strategy.openprofit > 0) and DTsellProf : na
DTSPL = LongExitFinal and DTmpdefineL
DTSPS = ShortExitFinal and DTmpdefineS
//COLLECT
sellProf = UpTrend ? UTsellProf : DTsellProf
SPL = UpTrend ? UTSPL : DTSPL
SPS = UpTrend ? UTSPS : DTSPS

//UT TAKE PROFIT
UTtpconvertL = strategy.position_avg_price * (1 + UTTPperc)
UTtpconvertS = strategy.position_avg_price * (1 - UTTPperc)
UTTPL = TradeDir == "LONG" ? (UTtpconvertL < close) and UTuseTP : na
UTTPS = TradeDir == "SHORT" ? (UTtpconvertS > close) and UTuseTP : na
//DT TAKE PROFIT
DTtpconvertL = strategy.position_avg_price * (1 + DTTPperc)
DTtpconvertS = strategy.position_avg_price * (1 - DTTPperc)
DTTPL = TradeDir == "LONG" ? (DTtpconvertL < close) and DTuseTP : na
DTTPS = TradeDir == "SHORT" ? (DTtpconvertS > close) and DTuseTP : na
//COLLECT
TPL = UpTrend ? UTTPL : DTTPL
TPS = UpTrend ? UTTPS : DTTPS

//UT STOP LOSS
UTslconvertL = strategy.position_avg_price * (1 + UTSLperc)
UTslconvertS = strategy.position_avg_price * (1 - UTSLperc)
UTSLL = TradeDir == "LONG" ? (UTslconvertL > close) and UTuseSL : na
UTSLS = TradeDir == "SHORT" ? (UTslconvertS < close) and UTuseSL : na
//DT STOP LOSS
DTslconvertL = strategy.position_avg_price * (1 + DTSLperc)
DTslconvertS = strategy.position_avg_price * (1 - DTSLperc)
DTSLL = TradeDir == "LONG" ? (DTslconvertL > close) and DTuseSL : na
DTSLS = TradeDir == "SHORT" ? (DTslconvertS < close) and DTuseSL : na
//COLLECT
SLL = UpTrend ? UTSLL : DTSLL
SLS = UpTrend ? UTSLS : DTSLS

//UT TRADE EXPIRE
entrypos = strategy.opentrades == 1 and strategy.opentrades[1] < 1
UTexpirebars = UTuseTE ? UTTEbars : 1000000
UTTE =  ta.barssince(entrypos) >= UTexpirebars
//DT TRADE EXPIRE
DTexpirebars = DTuseTE ? DTTEbars : 1000000
DTTE =  ta.barssince(entrypos) >= DTexpirebars
//COLLECT
TE = UpTrend ? UTTE : DTTE

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//PLOTSHAPES▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//LONG
plotshape((TradeDir == "LONG") and LongEntryFinal, location=location.belowbar, style=shape.arrowup,   color=color.new(#26a69a, 100), text="⌃", textcolor=#26a69a, size=size.tiny, title="Long BUY Label")
plotshape((TradeDir == "LONG") and LongExitFinal,  location=location.abovebar, style=shape.arrowdown, color=color.new(#ef5350, 100), text="⌄", textcolor=#ef5350, size=size.tiny, title="Long SELL Label")
//SHORT
plotshape((TradeDir == "SHORT") and ShortEntryFinal, location=location.abovebar, style=shape.arrowdown, color=color.new(#ef5350, 100), text="⌄", textcolor=#ef5350, size=size.tiny, title="Short SELL Label")
plotshape((TradeDir == "SHORT") and ShortExitFinal,  location=location.belowbar, style=shape.arrowup,   color=color.new(#26a69a, 100), text="⌃", textcolor=#26a69a, size=size.tiny, title="Short BUY Label")

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//STRATEGY TRADES▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

//LONG
if (TradeDir == "LONG") and LongEntryFinal
	strategy.entry("inLong", strategy.long, comment="LEn")
if (TradeDir == "LONG") and sellProf ? SPL : LongExitFinal
	strategy.close("inLong", comment="LEx")

//SHORT
if (TradeDir == "SHORT") and ShortEntryFinal
	strategy.entry("inShort", strategy.short, comment="SEn")
if (TradeDir == "SHORT") and sellProf ? SPS : ShortExitFinal
	strategy.close("inShort", comment="SEx")

//TAKE
if TPL
    strategy.close("inLong", comment="TP")
if TPS
    strategy.close("inShort", comment="TP")
//STOP
if SLL
    strategy.close("inLong", comment="SL")
if SLS
    strategy.close("inShort", comment="SL")
//EXPIRE
if TE
    strategy.close_all(comment="TE")
	
//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
//ALERTS▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼

useentryalert  = input(defval=true, title="Use ENTRY Alert", group="Custom Alert Messages")
entrystring    = input.string(title="Entry Alert Message", defval="ENTRY", confirm=false, group="Custom Alert Messages")
useexitalert   = input(defval=true, title="Use EXIT Alert", group="Custom Alert Messages")
exitstring     = input.string(title="Exit Alert Message", defval="EXIT", confirm=false, group="Custom Alert Messages")
usetakealert   = input(defval=true, title="Use TAKE Alert", group="Custom Alert Messages")
takestring     = input.string(title="Take Profit Alert Message", defval="TAKE", confirm=false, group="Custom Alert Messages")
usestopalert   = input(defval=true, title="Use STOP Alert", group="Custom Alert Messages")
stopstring     = input.string(title="Stop Loss Alert Message", defval="STOP", confirm=false, group="Custom Alert Messages")
useexpirealert = input(defval=true, title="Use EXPIRE Alert", group="Custom Alert Messages")
expirestring   = input.string(title="Expire Trade Alert Message", defval="EXPIRE", confirm=false, group="Custom Alert Messages")

//LONG
if ((TradeDir == "LONG") and LongEntryFinal) and useentryalert
	alert("{\"message_type\": \"bot\",  \"bot_id\": 7040545,  \"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",  \"delay_seconds\": 0}", alert.freq_once_per_bar)
if (TradeDir == "LONG") and (UTsellProf ? SPL : LongExitFinal) and useexitalert
	alert("{\"action\": \"close_at_market_price\",  \"message_type\": \"bot\",  \"bot_id\": 7040545,  \"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",  \"delay_seconds\": 0}", alert.freq_once_per_bar)
//SHORT
if ((TradeDir == "SHORT") and ShortEntryFinal) and useentryalert
	alert("{\"action\": \"close_at_market_price\",  \"message_type\": \"bot\",  \"bot_id\": 7040545,  \"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",  \"delay_seconds\": 0}", alert.freq_once_per_bar)
if (TradeDir == "SHORT") and (UTsellProf ? SPL : ShortExitFinal) and useexitalert
	alert("{\"action\": \"close_at_market_price\",  \"message_type\": \"bot\",  \"bot_id\": 7040545,  \"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",  \"delay_seconds\": 0}", alert.freq_once_per_bar)
//OTHER
if TPL or TPS and usetakealert
    alert("{\"action\": \"close_at_market_price\",  \"message_type\": \"bot\",  \"bot_id\": 7040545,  \"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",  \"delay_seconds\": 0}", alert.freq_once_per_bar)
if SLL or SLS and usestopalert
    alert("{\"action\": \"close_at_market_price\",  \"message_type\": \"bot\",  \"bot_id\": 7040545,  \"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",  \"delay_seconds\": 0}", alert.freq_once_per_bar)
if TE and useexpirealert
    alert("{\"action\": \"close_at_market_price\",  \"message_type\": \"bot\",  \"bot_id\": 7040545,  \"email_token\": \"9b842a1b-9cb4-48ac-9ed4-524c98557e5f\",  \"delay_seconds\": 0}", alert.freq_once_per_bar)

//END▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
////////////////////////////////////////////////////////////////////////////////
```

> Detail

https://www.fmz.com/strategy/436908

> Last Modified

2023-12-28 17:59:58
