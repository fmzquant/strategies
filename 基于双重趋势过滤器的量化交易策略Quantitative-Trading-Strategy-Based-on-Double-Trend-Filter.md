
> Name

基于双重趋势过滤器的量化交易策略Quantitative-Trading-Strategy-Based-on-Double-Trend-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4519923478ba5e7f04.png)
[trans]

## 概述

这是一个利用双重趋势过滤器进行量化交易的策略。该策略同时结合全局趋势过滤器和本地趋势过滤器,确保只在趋势方向正确时开仓。此外,策略还设置了其他多个过滤条件,如RSI过滤器、价格过滤器、斜率过滤器等,用来进一步提高交易信号的可靠性。在出场方面,策略preset了止损价位和止盈价位。总体而言,这是一个稳定、精准的量化交易策略。

## 策略原理

该策略的核心逻辑基于双重趋势过滤器。全局趋势过滤器基于高周期EMA判断市场总体走势,本地趋势过滤器基于低周期EMA判断局部走势。只有当两者判断趋势一致时,才会开仓。

具体来说,策略通过计算BTCUSDT的EMA线,判断总体市场处于上升趋势还是下降趋势,这就是全局趋势过滤器。同时,策略计算本合约的EMA线,判断局部市场的走势,这是本地趋势过滤器。当两者判断趋势一致时,再结合其他多个辅助过滤器,策略会产生交易信号并预设止盈止损价格开仓。

在确定交易信号后,策略会立即下单开仓。同时,策略预先设置好止盈价格和止损价格。当价格触发止盈或止损时,策略会自动止盈或止损。

## 优势分析

这是一个稳定可靠的量化交易策略,主要优势有:

1. 采用双重趋势过滤机制,能过滤掉大部分假信号,使交易信号更加可靠精准。

2. 结合多个辅助过滤器,如RSI过滤器、价格过滤器等,进一步提高信号质量。

3. 自动运算止盈止损价位,无需人工监控,降低交易风险。

4. 策略参数可以自定义调整,适应更多交易品种,有较强适应性。

5. 策略思路清晰易理解,便于优化改进,有较大拓展空间。

## 风险分析

尽管该策略有许多优势,但仍存在一定的交易风险,主要集中在:

1. 双重趋势过滤器确定入场时点不精准。可以通过调整过滤器参数进行优化。

2. 止盈止损价格设定不准确,可能过早止盈或止损。可以测试不同参数组合寻找最优解。  

3. 交易品种和周期的选择不当,可能导致策略无效。建议针对不同交易品种分别进行参数调优和测试。

4. 存在一定的过拟合风险。需要在更多市场环境中进行回测,确保策略稳健性。

## 优化方向  

该策略主要可以从以下几个方向进行优化:

1. 调整双重过滤器的参数,找到最佳参数组合;

2. 测试并选择最佳的辅助过滤器; 

3. 优化止盈止损算法,使其更加智能化;

4. 尝试引入机器学习等手段,实现策略的动态调参;

5. 在更多交易品种和更长周期内进行回测,提高策略的稳定性。

## 总结

该策略整体来说是一个稳定、精准、易于优化的量化交易策略。它采用双重趋势过滤器结合多个辅助过滤器产生交易信号,可以过滤掉大部分噪音,使信号更加精准可靠。同时,策略内置止盈止损设定,可以降低交易风险。这是一个非常有实战价值的策略,在优化和验证后,可以直接投入实盘运用。它也具有很大的拓展潜力,是一款值得深入研究的量化策略。

||

## Overview

This is a quantitative trading strategy that utilizes double trend filters. The strategy combines both global trend filter and local trend filter to ensure entering positions only when the trend direction is correct. In addition, the strategy sets multiple other filters such as RSI filter, price filter, slope filter etc. to further improve reliability of trading signals. On the exit side, the strategy presets stop loss price and take profit price. Overall, this is a stable and precise quantitative trading strategy.   

## Strategy Logic

The core logic of this strategy is based on the double trend filters. The global trend filter judges overall market trend based on high-period EMA, while the local trend filter judges local trend based on low-period EMA. Only when both filters suggest the same trend direction, the strategy will enter positions.   

Specifically, the strategy calculates BTCUSDT's EMA to determine if the overall market is in an upward or downward trend. This is the global trend filter. At the same time, the strategy calculates EMA of the underlying contract to determine local trend. This is the local trend filter. Only when both filters agree on the same trend direction, combined with other auxiliary filters, the strategy will generate trading signals and preset stop loss and take profit prices for entering positions.

Once determining a tradable signal, the strategy will immediately place orders to enter positions. Meanwhile, stop loss price and take profit price are preset. When price touches either of them, the strategy will automatically exit positions with stop loss or take profit. 

## Advantage Analysis 

This is a stable and reliable quantitative trading strategy with the following main advantages:

1. Adopting double trend filtering mechanism to filter out most false signals and make trading signals more reliable.  

2. Combining multiple auxiliary filters like RSI filter and price filter to further improve signal quality.

3. Automatically calculating stop loss and take profit price to lower trading risks without manual monitoring.   

4. Customizable strategy parameters to adapt more trading instruments with better adaptability.

5. Clear strategy logic easy to understand, and with greater potential for optimization.

## Risk Analysis   

Although with many advantages, there are still some trading risks mainly in:  

1. Double trend filters may fail to determine accurate entry timing. Parameters can be optimized. 

2. Inaccurate stop loss and take profit price setting may lead to premature exit. Different parameter sets can be tested to find optimum.   

3. Improper selection of trading instruments and timeframes may make the strategy ineffective. Parameter optimization and testing are suggested separately for different trading instruments.  

4. There are some overfitting risks. More backtests in diverse market environments are needed to ensure robustness.

## Optimization Directions   

The main directions for optimizing this strategy include:

1. Adjust parameters of double filters to find optimum combination.  

2. Test and select the best auxiliary filters.  

3. Optimize the stop loss and take profit algorithms to make them more intelligent.

4. Try introducing machine learning models for dynamic parameter tuning.
  
5. More backtests on more instruments and longer time spans to improve stability.  

## Conclusion

In conclusion, this is an overall stable, accurate and easily optimizable quantitative trading strategy. It produces trading signals by combining double trend filters and multiple auxiliary filters, filtering out most noise and generating more reliable signals. Also, the inbuilt stop loss and take profit presetting helps lower trading risks. This is a strategy with great practical value. After optimization and validation, it can be directly applied for live trading. Moreover, it has huge potential for expansions and is worth in-depth researching.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show WaveTrend|
|v_input_2|true|Show Buy dots|
|v_input_3|true|Show Gold dots|
|v_input_4|true|Show Sell dots|
|v_input_5|true|Show Div. dots|
|v_input_6|true|Show Fast WT|
|v_input_7|9|WT Channel Length|
|v_input_8|12|WT Average Length|
|v_input_9_hlc3|0|WT MA Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_10|3|WT MA Length|
|v_input_11|53|WT Overbought Level 1|
|v_input_12|60|WT Overbought Level 2|
|v_input_13|100|WT Overbought Level 3|
|v_input_14|-53|WT Oversold Level 1|
|v_input_15|-60|WT Oversold Level 2|
|v_input_16|-75|WT Oversold Level 3|
|v_input_17|true|Show WT Regular Divergences|
|v_input_18|false|Show WT Hidden Divergences|
|v_input_19|true|Not apply OB/OS Limits on Hidden Divergences|
|v_input_20|45|WT Bearish Divergence min|
|v_input_21|-65|WT Bullish Divergence min|
|v_input_22|false|Show 2nd WT Regular Divergences|
|v_input_23|15|WT 2nd Bearish Divergence|
|v_input_24|-40|WT 2nd Bullish Divergence 15 min|
|v_input_25|true|Show MFI|
|v_input_26|60|MFI Period|
|v_input_27|150|MFI Area multiplier|
|v_input_28|2.5|MFI Area Y Pos|
|v_input_29|false|Show RSI|
|v_input_30_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_31|14|RSI Length|
|v_input_32|30|RSI Oversold|
|v_input_33|60|RSI Overbought|
|v_input_34|false|Show RSI Regular Divergences|
|v_input_35|false|Show RSI Hidden Divergences|
|v_input_36|60|RSI Bearish Divergence min|
|v_input_37|30|RSI Bullish Divergence min|
|v_input_38|true|Show Stochastic RSI|
|v_input_39|true| Use Log?|
|v_input_40|false|Use Average of both K & D|
|v_input_41_close|0|Stochastic RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_42|14|Stochastic RSI Length|
|v_input_43|14|RSI Length |
|v_input_44|3|Stochastic RSI K Smooth|
|v_input_45|3|Stochastic RSI D Smooth|
|v_input_46|false|Show Stoch Regular Divergences|
|v_input_47|false|Show Stoch Hidden Divergences|
|v_input_48|false|Show Schaff TC line|
|v_input_49_close|0|Schaff TC Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_50|10|Schaff TC|
|v_input_51|23|Schaff TC Fast Lenght|
|v_input_52|50|Schaff TC Slow Length|
|v_input_53|0.5|Schaff TC Factor|
|v_input_54|false|Show Sommi flag|
|v_input_55|false|Show Sommi F. Wave|
|v_input_56|720|Sommi F. Wave timeframe|
|v_input_57|false|F. Wave Bear Level (less than)|
|v_input_58|false|F. Wave Bull Level (more than)|
|v_input_59|false|WT Bear Level (more than)|
|v_input_60|false|WT Bull Level (less than)|
|v_input_61|false|Money flow Bear Level (less than)|
|v_input_62|false|Money flow Bull Level (more than)|
|v_input_63|false|Show Sommi diamond|
|v_input_64|60|HTF Candle Res. 1|
|v_input_65|240|HTF Candle Res. 2|
|v_input_66|false|WT Bear Level (More than)|
|v_input_67|false|WT Bull Level (Less than)|
|v_input_68|false|Show MACD Colors|
|v_input_69|240|MACD Colors MACD TF|
|v_input_70|false|Dark mode|
|v_input_71|true|(?Trend Settings)Use Global trend?|
|v_input_72|0|Global trend timeframe: 5|60|D|
|v_input_73|1700|Global trend length|
|v_input_74|20|Local trend filter length|
|v_input_75|0|Local trend filter timeframe: 60|D|5|
|v_input_76|true|Only divergencies for long|
|v_input_77|true|Only divergencies for short|
|v_input_78|false|Sommi diamond alerts|
|v_input_79|false|Cancel all positions if price crosses local sma? (yellow line)|
|v_input_85|false|RSI filter ON|
|v_input_86|false|Price filter ON|
|v_input_87|1000|Long Price filter from|
|v_input_88|1200|Long Price filter to|
|v_input_89|1000|Short Price filter from|
|v_input_90|1200|Short Price filter to|
|v_input_91|true|Use Local trend?|
|v_input_80|0.95|(?TP/SL Settings)TP long|
|v_input_81|0.95|TP long div|
|v_input_82|0.95|TP short|
|v_input_83|5|SL long|
|v_input_84|5|SL short|
|v_input_92|false|(?Slope Settings)Use Slope filter?|
|v_input_93|-0.3|Slope number long|
|v_input_94|0.16|Slope number short|
|v_input_95|300|Slope period|
|v_input_96|true|(?Position Settings)Only long?|
|v_input_97|true|Only short?|
|v_input_98|false|(?Volume Settings)Volume filter?|
|v_input_99|3700|Volume no more than:|
|v_input_100|600|Volume no less than:|
|v_input_101|false|(?Shift Settings)Shift open position?|
|v_input_102|0.5|How many % to shift?|
|v_input_103|false|(?Cancel Settings)Cancel position in #bars?|
|v_input_104|96|Number of bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=4

strategy(title = 'Cipher_B', overlay=true )

// PARAMETERS {

// WaveTrend
wtShow = input(true, title = 'Show WaveTrend', type = input.bool)
wtBuyShow = input(true, title = 'Show Buy dots', type = input.bool)
wtGoldShow = input(true, title = 'Show Gold dots', type = input.bool)
wtSellShow = input(true, title = 'Show Sell dots', type = input.bool)
wtDivShow = input(true, title = 'Show Div. dots', type = input.bool)
vwapShow = input(true, title = 'Show Fast WT', type = input.bool)
wtChannelLen = input(9, title = 'WT Channel Length', type = input.integer)
wtAverageLen = input(12, title = 'WT Average Length', type = input.integer)
wtMASource = input(hlc3, title = 'WT MA Source', type = input.source)
wtMALen = input(3, title = 'WT MA Length', type = input.integer)

// WaveTrend Overbought & Oversold lines
obLevel = input(53, title = 'WT Overbought Level 1', type = input.integer)
obLevel2 = input(60, title = 'WT Overbought Level 2', type = input.integer)
obLevel3 = input(100, title = 'WT Overbought Level 3', type = input.integer)
osLevel = input(-53, title = 'WT Oversold Level 1', type = input.integer)
osLevel2 = input(-60, title = 'WT Oversold Level 2', type = input.integer)
osLevel3 = input(-75, title = 'WT Oversold Level 3', type = input.integer)

// Divergence WT
wtShowDiv = input(true, title = 'Show WT Regular Divergences', type = input.bool)
wtShowHiddenDiv = input(false, title = 'Show WT Hidden Divergences', type = input.bool)
showHiddenDiv_nl = input(true, title = 'Not apply OB/OS Limits on Hidden Divergences', type = input.bool)
wtDivOBLevel = input(45, title = 'WT Bearish Divergence min', type = input.integer)
wtDivOSLevel = input(-65, title = 'WT Bullish Divergence min', type = input.integer)

// Divergence extra range
wtDivOBLevel_addshow = input(false, title = 'Show 2nd WT Regular Divergences', type = input.bool)
wtDivOBLevel_add = input(15, title = 'WT 2nd Bearish Divergence', type = input.integer)
wtDivOSLevel_add = input(-40, title = 'WT 2nd Bullish Divergence 15 min', type = input.integer)

// RSI+MFI
rsiMFIShow = input(true, title = 'Show MFI', type = input.bool)
rsiMFIperiod = input(60,title = 'MFI Period', type = input.integer)
rsiMFIMultiplier = input(150, title = 'MFI Area multiplier', type = input.float)
rsiMFIPosY = input(2.5, title = 'MFI Area Y Pos', type = input.float)

// RSI
rsiShow = input(false, title = 'Show RSI', type = input.bool)
rsiSRC = input(close, title = 'RSI Source', type = input.source)
rsiLen = input(14, title = 'RSI Length', type = input.integer)
rsiOversold = input(30, title = 'RSI Oversold', minval = 50, maxval = 100, type = input.integer)
rsiOverbought = input(60, title = 'RSI Overbought', minval = 0, maxval = 50, type = input.integer)

// Divergence RSI
rsiShowDiv = input(false, title = 'Show RSI Regular Divergences', type = input.bool)
rsiShowHiddenDiv = input(false, title = 'Show RSI Hidden Divergences', type = input.bool)
rsiDivOBLevel = input(60, title = 'RSI Bearish Divergence min', type = input.integer)
rsiDivOSLevel = input(30, title = 'RSI Bullish Divergence min', type = input.integer)

// RSI Stochastic
stochShow = input(true, title = 'Show Stochastic RSI', type = input.bool)
stochUseLog = input(true, title=' Use Log?', type = input.bool)
stochAvg = input(false, title='Use Average of both K & D', type = input.bool)
stochSRC = input(close, title = 'Stochastic RSI Source', type = input.source)
stochLen = input(14, title = 'Stochastic RSI Length', type = input.integer)
stochRsiLen = input(14, title = 'RSI Length ', type = input.integer)
stochKSmooth = input(3, title = 'Stochastic RSI K Smooth', type = input.integer)
stochDSmooth = input(3, title = 'Stochastic RSI D Smooth', type = input.integer)

// Divergence stoch
stochShowDiv = input(false, title = 'Show Stoch Regular Divergences', type = input.bool)
stochShowHiddenDiv = input(false, title = 'Show Stoch Hidden Divergences', type = input.bool)

// Schaff Trend Cycle
tcLine = input(false, title="Show Schaff TC line", type=input.bool)
tcSRC = input(close, title = 'Schaff TC Source', type = input.source)
tclength = input(10, title="Schaff TC", type=input.integer)
tcfastLength = input(23, title="Schaff TC Fast Lenght", type=input.integer)
tcslowLength = input(50, title="Schaff TC Slow Length", type=input.integer)
tcfactor = input(0.5, title="Schaff TC Factor", type=input.float)

// Sommi Flag
sommiFlagShow = input(false, title = 'Show Sommi flag', type = input.bool)
sommiShowVwap = input(false, title = 'Show Sommi F. Wave', type = input.bool)
sommiVwapTF = input('720', title = 'Sommi F. Wave timeframe', type = input.string)
sommiVwapBearLevel = input(0, title = 'F. Wave Bear Level (less than)', type = input.integer)
sommiVwapBullLevel = input(0, title = 'F. Wave Bull Level (more than)', type = input.integer)
soomiFlagWTBearLevel = input(0, title = 'WT Bear Level (more than)', type = input.integer) 
soomiFlagWTBullLevel = input(0, title = 'WT Bull Level (less than)', type = input.integer) 
soomiRSIMFIBearLevel = input(0, title = 'Money flow Bear Level (less than)', type = input.integer) 
soomiRSIMFIBullLevel = input(0, title = 'Money flow Bull Level (more than)', type = input.integer) 

// Sommi Diamond
sommiDiamondShow = input(false, title = 'Show Sommi diamond', type = input.bool)
sommiHTCRes = input('60', title = 'HTF Candle Res. 1', type = input.string)
sommiHTCRes2 = input('240', title = 'HTF Candle Res. 2', type = input.string)
soomiDiamondWTBearLevel = input(0, title = 'WT Bear Level (More than)', type = input.integer)
soomiDiamondWTBullLevel = input(0, title = 'WT Bull Level (Less than)', type = input.integer)

// macd Colors
macdWTColorsShow = input(false, title = 'Show MACD Colors', type = input.bool)
macdWTColorsTF = input('240', title = 'MACD Colors MACD TF', type = input.string)

darkMode = input(false, title = 'Dark mode', type = input.bool)


// Colors
colorRed = #ff0000
colorPurple = #e600e6
colorGreen = #3fff00
colorOrange = #e2a400
colorYellow = #ffe500
colorWhite = #ffffff
colorPink = #ff00f0
colorBluelight = #31c0ff

colorWT1 = #90caf9
colorWT2 = #0d47a1

colorWT2_ = #131722

colormacdWT1a = #4caf58
colormacdWT1b = #af4c4c
colormacdWT1c = #7ee57e
colormacdWT1d = #ff3535

colormacdWT2a = #305630
colormacdWT2b = #310101
colormacdWT2c = #132213
colormacdWT2d = #770000

// } PARAMETERS


// FUNCTIONS {
  
// Divergences 
f_top_fractal(src) => src[4] < src[2] and src[3] < src[2] and src[2] > src[1] and src[2] > src[0]
f_bot_fractal(src) => src[4] > src[2] and src[3] > src[2] and src[2] < src[1] and src[2] < src[0]
f_fractalize(src) => f_top_fractal(src) ? 1 : f_bot_fractal(src) ? -1 : 0

f_findDivs(src, topLimit, botLimit, useLimits) =>
    fractalTop = f_fractalize(src) > 0 and (useLimits ? src[2] >= topLimit : true) ? src[2] : na
    fractalBot = f_fractalize(src) < 0 and (useLimits ? src[2] <= botLimit : true) ? src[2] : na
    highPrev = valuewhen(fractalTop, src[2], 0)[2]
    highPrice = valuewhen(fractalTop, high[2], 0)[2]
    lowPrev = valuewhen(fractalBot, src[2], 0)[2]
    lowPrice = valuewhen(fractalBot, low[2], 0)[2]
    bearSignal = fractalTop and high[2] > highPrice and src[2] < highPrev
    bullSignal = fractalBot and low[2] < lowPrice and src[2] > lowPrev
    bearDivHidden = fractalTop and high[2] < highPrice and src[2] > highPrev
    bullDivHidden = fractalBot and low[2] > lowPrice and src[2] < lowPrev
    [fractalTop, fractalBot, lowPrev, bearSignal, bullSignal, bearDivHidden, bullDivHidden]
        
// RSI+MFI
f_rsimfi(_period, _multiplier, _tf) => security(syminfo.tickerid, _tf, sma(((close - open) / (high - low)) * _multiplier, _period) - rsiMFIPosY)
   
// WaveTrend
f_wavetrend(src, chlen, avg, malen, tf) =>
    tfsrc = security(syminfo.tickerid, tf, src)
    esa = ema(tfsrc, chlen)
    de = ema(abs(tfsrc - esa), chlen)
    ci = (tfsrc - esa) / (0.015 * de)
    wt1 = security(syminfo.tickerid, tf, ema(ci, avg))
    wt2 = security(syminfo.tickerid, tf, sma(wt1, malen))
    wtVwap = wt1 - wt2
    wtOversold = wt2 <= osLevel
    wtOverbought = wt2 >= obLevel
    wtCross = cross(wt1, wt2)
    wtCrossUp = wt2 - wt1 <= 0
    wtCrossDown = wt2 - wt1 >= 0
    wtCrosslast = cross(wt1[2], wt2[2])
    wtCrossUplast = wt2[2] - wt1[2] <= 0
    wtCrossDownlast = wt2[2] - wt1[2] >= 0
    [wt1, wt2, wtOversold, wtOverbought, wtCross, wtCrossUp, wtCrossDown, wtCrosslast, wtCrossUplast, wtCrossDownlast, wtVwap]

// Schaff Trend Cycle
f_tc(src, length, fastLength, slowLength) =>
    ema1 = ema(src, fastLength)
    ema2 = ema(src, slowLength)
    macdVal = ema1 - ema2	
    alpha = lowest(macdVal, length)
    beta = highest(macdVal, length) - alpha
    gamma = (macdVal - alpha) / beta * 100
    gamma := beta > 0 ? gamma : nz(gamma[1])
    delta = gamma
    delta := na(delta[1]) ? delta : delta[1] + tcfactor * (gamma - delta[1])
    epsilon = lowest(delta, length)
    zeta = highest(delta, length) - epsilon
    eta = (delta - epsilon) / zeta * 100
    eta := zeta > 0 ? eta : nz(eta[1])
    stcReturn = eta
    stcReturn := na(stcReturn[1]) ? stcReturn : stcReturn[1] + tcfactor * (eta - stcReturn[1])
    stcReturn

// Stochastic RSI
f_stochrsi(_src, _stochlen, _rsilen, _smoothk, _smoothd, _log, _avg) =>
    src = _log ? log(_src) : _src
    rsi = rsi(src, _rsilen)
    kk = sma(stoch(rsi, rsi, rsi, _stochlen), _smoothk)
    d1 = sma(kk, _smoothd)
    avg_1 = avg(kk, d1)
    k = _avg ? avg_1 : kk
    [k, d1]

// MACD
f_macd(src, fastlen, slowlen, sigsmooth, tf) =>
    fast_ma = security(syminfo.tickerid, tf, ema(src, fastlen))
    slow_ma = security(syminfo.tickerid, tf, ema(src, slowlen))
    macd = fast_ma - slow_ma,
    signal = security(syminfo.tickerid, tf, sma(macd, sigsmooth))
    hist = macd - signal
    [macd, signal, hist]
// MACD Colors on WT    
f_macdWTColors(tf) =>
    hrsimfi = f_rsimfi(rsiMFIperiod, rsiMFIMultiplier, tf)
    [macd, signal, hist] = f_macd(close, 28, 42, 9, macdWTColorsTF)
    macdup = macd >= signal
    macddown = macd <= signal
    macdWT1Color = macdup ? hrsimfi > 0 ? colormacdWT1c : colormacdWT1a : macddown ? hrsimfi < 0 ? colormacdWT1d : colormacdWT1b : na
    macdWT2Color = macdup ? hrsimfi < 0 ? colormacdWT2c : colormacdWT2a : macddown ? hrsimfi < 0 ? colormacdWT2d : colormacdWT2b : na 
    [macdWT1Color, macdWT2Color]
    
// Get higher timeframe candle
f_getTFCandle(_tf) => 
    _open  = security(heikinashi(syminfo.tickerid), _tf, open, barmerge.gaps_off, barmerge.lookahead_off)
    _close = security(heikinashi(syminfo.tickerid), _tf, close, barmerge.gaps_off, barmerge.lookahead_off)
    _high  = security(heikinashi(syminfo.tickerid), _tf, high, barmerge.gaps_off, barmerge.lookahead_off)
    _low   = security(heikinashi(syminfo.tickerid), _tf, low, barmerge.gaps_off, barmerge.lookahead_off)
    hl2   = (_high + _low) / 2.0
    newBar = change(_open)
    candleBodyDir = _close > _open
    [candleBodyDir, newBar]

// Sommi flag
f_findSommiFlag(tf, wt1, wt2, rsimfi, wtCross, wtCrossUp, wtCrossDown) =>    
    [hwt1, hwt2, hwtOversold, hwtOverbought, hwtCross, hwtCrossUp, hwtCrossDown, hwtCrosslast, hwtCrossUplast, hwtCrossDownlast, hwtVwap] = f_wavetrend(wtMASource, wtChannelLen, wtAverageLen, wtMALen, tf)      
    
    bearPattern = rsimfi < soomiRSIMFIBearLevel and
                   wt2 > soomiFlagWTBearLevel and 
                   wtCross and 
                   wtCrossDown and 
                   hwtVwap < sommiVwapBearLevel
                   
    bullPattern = rsimfi > soomiRSIMFIBullLevel and 
                   wt2 < soomiFlagWTBullLevel and 
                   wtCross and 
                   wtCrossUp and 
                   hwtVwap > sommiVwapBullLevel
    
    [bearPattern, bullPattern, hwtVwap]
    
f_findSommiDiamond(tf, tf2, wt1, wt2, wtCross, wtCrossUp, wtCrossDown) =>
    [candleBodyDir, newBar] = f_getTFCandle(tf)
    [candleBodyDir2, newBar2] = f_getTFCandle(tf2)
    bearPattern = wt2 >= soomiDiamondWTBearLevel and
                   wtCross and
                   wtCrossDown and
                   not candleBodyDir and
                   not candleBodyDir2                   
    bullPattern = wt2 <= soomiDiamondWTBullLevel and
                   wtCross and
                   wtCrossUp and
                   candleBodyDir and
                   candleBodyDir2 
    [bearPattern, bullPattern]
 
// } FUNCTIONS  

// CALCULATE INDICATORS {

// RSI
rsi = rsi(rsiSRC, rsiLen)
rsiColor = rsi <= rsiOversold ? colorGreen : rsi >= rsiOverbought ? colorRed : colorPurple

// RSI + MFI Area
rsiMFI = f_rsimfi(rsiMFIperiod, rsiMFIMultiplier, timeframe.period)
rsiMFIColor = rsiMFI > 0 ? #3ee145 : #ff3d2e

// Calculates WaveTrend
[wt1, wt2, wtOversold, wtOverbought, wtCross, wtCrossUp, wtCrossDown, wtCross_last, wtCrossUp_last, wtCrossDown_last, wtVwap] = f_wavetrend(wtMASource, wtChannelLen, wtAverageLen, wtMALen, timeframe.period)
 
// Stochastic RSI
[stochK, stochD] = f_stochrsi(stochSRC, stochLen, stochRsiLen, stochKSmooth, stochDSmooth, stochUseLog, stochAvg)

// Schaff Trend Cycle
tcVal = f_tc(tcSRC, tclength, tcfastLength, tcslowLength)

// Sommi flag
[sommiBearish, sommiBullish, hvwap] = f_findSommiFlag(sommiVwapTF, wt1, wt2, rsiMFI, wtCross,  wtCrossUp, wtCrossDown)

//Sommi diamond
[sommiBearishDiamond, sommiBullishDiamond] = f_findSommiDiamond(sommiHTCRes, sommiHTCRes2, wt1, wt2, wtCross, wtCrossUp, wtCrossDown)

// macd colors
[macdWT1Color, macdWT2Color] = f_macdWTColors(macdWTColorsTF)

// WT Divergences
[wtFractalTop, wtFractalBot, wtLow_prev, wtBearDiv, wtBullDiv, wtBearDivHidden, wtBullDivHidden] = f_findDivs(wt2, wtDivOBLevel, wtDivOSLevel, true)
    
[wtFractalTop_add, wtFractalBot_add, wtLow_prev_add, wtBearDiv_add, wtBullDiv_add, wtBearDivHidden_add, wtBullDivHidden_add] =  f_findDivs(wt2, wtDivOBLevel_add, wtDivOSLevel_add, true)
[wtFractalTop_nl, wtFractalBot_nl, wtLow_prev_nl, wtBearDiv_nl, wtBullDiv_nl, wtBearDivHidden_nl, wtBullDivHidden_nl] =  f_findDivs(wt2, 0, 0, false)

wtBearDivHidden_ = showHiddenDiv_nl ? wtBearDivHidden_nl : wtBearDivHidden
wtBullDivHidden_ = showHiddenDiv_nl ? wtBullDivHidden_nl : wtBullDivHidden

wtBearDivColor = (wtShowDiv and wtBearDiv) or (wtShowHiddenDiv and wtBearDivHidden_) ? colorRed : na
wtBullDivColor = (wtShowDiv and wtBullDiv) or (wtShowHiddenDiv and wtBullDivHidden_) ? colorGreen : na

wtBearDivColor_add = (wtShowDiv and (wtDivOBLevel_addshow and wtBearDiv_add)) or (wtShowHiddenDiv and (wtDivOBLevel_addshow and wtBearDivHidden_add)) ? #9a0202 : na
wtBullDivColor_add = (wtShowDiv and (wtDivOBLevel_addshow and wtBullDiv_add)) or (wtShowHiddenDiv and (wtDivOBLevel_addshow and wtBullDivHidden_add)) ? #1b5e20 : na

// RSI Divergences
[rsiFractalTop, rsiFractalBot, rsiLow_prev, rsiBearDiv, rsiBullDiv, rsiBearDivHidden, rsiBullDivHidden] = f_findDivs(rsi, rsiDivOBLevel, rsiDivOSLevel, true)
[rsiFractalTop_nl, rsiFractalBot_nl, rsiLow_prev_nl, rsiBearDiv_nl, rsiBullDiv_nl, rsiBearDivHidden_nl, rsiBullDivHidden_nl] = f_findDivs(rsi, 0, 0, false)

rsiBearDivHidden_ = showHiddenDiv_nl ? rsiBearDivHidden_nl : rsiBearDivHidden
rsiBullDivHidden_ = showHiddenDiv_nl ? rsiBullDivHidden_nl : rsiBullDivHidden

rsiBearDivColor = (rsiShowDiv and rsiBearDiv) or (rsiShowHiddenDiv and rsiBearDivHidden_) ? colorRed : na
rsiBullDivColor = (rsiShowDiv and rsiBullDiv) or (rsiShowHiddenDiv and rsiBullDivHidden_) ? colorGreen : na
 
// Stoch Divergences
[stochFractalTop, stochFractalBot, stochLow_prev, stochBearDiv, stochBullDiv, stochBearDivHidden, stochBullDivHidden] = f_findDivs(stochK, 0, 0, false)

stochBearDivColor = (stochShowDiv and stochBearDiv) or (stochShowHiddenDiv and stochBearDivHidden) ? colorRed : na
stochBullDivColor = (stochShowDiv and stochBullDiv) or (stochShowHiddenDiv and stochBullDivHidden) ? colorGreen : na


// Small Circles WT Cross
signalColor = wt2 - wt1 > 0 ? color.red : color.lime

// Buy signal.
buySignal = wtCross and wtCrossUp and wtOversold

buySignalDiv = (wtShowDiv and wtBullDiv) or 
               (wtShowDiv and wtBullDiv_add) or 
               (stochShowDiv and stochBullDiv) or 
               (rsiShowDiv and rsiBullDiv)
    
buySignalDiv_color = wtBullDiv ? colorGreen : 
                     wtBullDiv_add ? color.new(colorGreen, 60) : 
                     rsiShowDiv ? colorGreen : na

// Sell signal
sellSignal = wtCross and wtCrossDown and wtOverbought
             
sellSignalDiv = (wtShowDiv and wtBearDiv) or 
               (wtShowDiv and wtBearDiv_add) or
               (stochShowDiv and stochBearDiv) or
               (rsiShowDiv and rsiBearDiv)
                    
sellSignalDiv_color = wtBearDiv ? colorRed : 
                     wtBearDiv_add ? color.new(colorRed, 60) : 
                     rsiBearDiv ? colorRed : na

// Gold Buy 
lastRsi = valuewhen(wtFractalBot, rsi[2], 0)[2]
wtGoldBuy = ((wtShowDiv and wtBullDiv) or (rsiShowDiv and rsiBullDiv)) and
           wtLow_prev <= osLevel3 and
           wt2 > osLevel3 and
           wtLow_prev - wt2 <= -5 and
           lastRsi < 30           
          
// } CALCULATE INDICATORS


// DRAW {
bgcolor(darkMode ? color.new(#000000, 80) : na)
zLine = plot(0, color = color.new(colorWhite, 50))

//  MFI BAR 
rsiMfiBarTopLine = plot(rsiMFIShow ? -95 : na, title = 'MFI Bar TOP Line', transp = 100)
rsiMfiBarBottomLine = plot(rsiMFIShow ? -99 : na, title = 'MFI Bar BOTTOM Line', transp = 100)
fill(rsiMfiBarTopLine, rsiMfiBarBottomLine, title = 'MFI Bar Colors', color = rsiMFIColor, transp = 75)

Global=input(title="Use Global trend?", defval=true, type=input.bool,  group="Trend Settings")
regimeFilter_frame=input(title="Global trend timeframe", defval="5", options=['D','60','5'],  group="Trend Settings")
regimeFilter_length=input(title="Global trend length", defval=1700, type=input.integer,  group="Trend Settings")
localFilter_length=input(title="Local trend filter length", defval=20, type=input.integer,  group="Trend Settings")
localFilter_frame=input(title="Local trend filter timeframe", defval="60", options=['D','60', '5'],  group="Trend Settings")

Div_1=input(title="Only divergencies for long", defval=true, type=input.bool,  group="Trend Settings")
Div_2=input(title="Only divergencies for short", defval=true, type=input.bool,  group="Trend Settings")

sommi_diamond_on=input(title="Sommi diamond alerts", defval=false, type=input.bool,  group="Trend Settings")

Cancel_all=input(title="Cancel all positions if price crosses local sma? (yellow line)", defval=false, type=input.bool,  group="Trend Settings")

a_1=input(title="TP long", defval=0.95,step=0.5, type=input.float,  group="TP/SL Settings")

a_1_div=input(title="TP long div", defval=0.95,step=0.5, type=input.float,  group="TP/SL Settings")

a_2=input(title="TP short", defval=0.95,step=1, type=input.float,  group="TP/SL Settings")

b_1=input(title="SL long", defval=5,step=0.1, type=input.float,  group="TP/SL Settings")
b_2=input(title="SL short", defval=5,step=0.1, type=input.float,  group="TP/SL Settings")

RSI_filter_checkbox = input(title="RSI filter ON", defval=false, type=input.bool,  group="Trend Settings")
Price_filter_checkbox=input(title="Price filter ON", defval=false, type=input.bool,  group="Trend Settings")
Price_filter_1_long=input(title="Long Price filter from", defval=1000, type=input.integer,  group="Trend Settings")
Price_filter_2_long=input(title="Long Price filter to", defval=1200, type=input.integer,  group="Trend Settings")

Price_filter_1_short=input(title="Short Price filter from", defval=1000, type=input.integer,  group="Trend Settings")
Price_filter_2_short=input(title="Short Price filter to", defval=1200, type=input.integer,  group="Trend Settings")

Local_filter_checkbox=input(title="Use Local trend?", defval=true, type=input.bool,  group="Trend Settings")

slope_checkbox = input(title="Use Slope filter?", defval=false, type=input.bool,  group="Slope Settings")
slope_number_long = input(title="Slope number long", defval=-0.3,step=0.01, type=input.float,  group="Slope Settings")
slope_number_short = input(title="Slope number short", defval=0.16,step=0.01, type=input.float,  group="Slope Settings")
slope_period = input(title="Slope period", defval=300, type=input.integer,  group="Slope Settings")

long_on = input(title="Only long?", defval=true, type=input.bool,  group="Position Settings")
short_on = input(title="Only short?", defval=true, type=input.bool,  group="Position Settings")

volume_ETH_spot_checkbox = input(title="Volume filter?", defval=false, type=input.bool,  group="Volume Settings")
volume_ETH_spot_number_more = input(title="Volume no more than:", defval=3700, type=input.integer,  group="Volume Settings")
volume_ETH_spot_number_less = input(title="Volume no less than:", defval=600, type=input.integer,  group="Volume Settings")

limit_checkbox = input(title="Shift open position?", defval=false, type=input.bool,  group="Shift Settings")
limit_shift = input(title="How many % to shift?", defval=0.5,step=0.01, type=input.float,  group="Shift Settings")

cancel_in =  input(title="Cancel position in #bars?", defval=false, type=input.bool,  group="Cancel Settings")
cancel_in_num =  input(title="Number of bars", defval=96, type=input.integer,  group="Cancel Settings")
//Name of ticker
_str=tostring(syminfo.ticker)
_chars = str.split(_str, "")
int _len = array.size(_chars)
int _beg = max(0, _len - 4)
string[] _substr = array.new_string(0)
if _beg < _len
    _substr := array.slice(_chars, 0, _beg)
string _return = array.join(_substr, "")

//Hour sma
basis = security(syminfo.tickerid, localFilter_frame, ema(close, localFilter_length))
plot(basis, title="Local trend curve", color=color.yellow, style=plot.style_linebr)

//Trend calculation with EMA
f_sec(_market, _res, _exp) => security(_market, _res, _exp[barstate.isconfirmed ? 0 : 1])
ema = sma(close, regimeFilter_length) 
emaValue = f_sec("BTC_USDT:swap", regimeFilter_frame, ema)
marketPrice = f_sec("BTC_USDT:swap", regimeFilter_frame, close)
regimeFilter = Global?(marketPrice > emaValue or marketPrice[1] > emaValue[1]):true
reverse_regime=Global?(marketPrice < emaValue or marketPrice[1] < emaValue[1]):true
bgcolor(Global?regimeFilter ? color.green : color.red:color.yellow)

//Local trend
regimeFilter_local = Local_filter_checkbox ? close > basis: true //or close[1] > basis[1]
reverse_regime_local = Local_filter_checkbox ? close < basis: true //or close[1] < basis[1]

//RSI filter
up = rma(max(change(close), 0), 14)
down = rma(-min(change(close), 0), 14)
rsi_ = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
rsiMA = ema(rsi_,12)

//local incline

sma =security(syminfo.tickerid, '60', ema(close, 15))
slope = (sma - sma[slope_period]) / slope_period
slope_filter_long = slope_checkbox? slope > slope_number_long : true
slope_filter_short = slope_checkbox? slope < slope_number_short : true


var long_check = true
var short_check = true
if RSI_filter_checkbox
    long_check:= rsiMA<40
    short_check:= rsiMA>60
//
validlow  =  Div_1 ? buySignalDiv or wtGoldBuy  :  buySignal or buySignalDiv or wtGoldBuy 
validhigh =   Div_2 ? sellSignalDiv  :  sellSignal or sellSignalDiv

//check volume of ETHUSDT
volume_ETH_spot = volume
volume_ETH_spot_filter = volume_ETH_spot_checkbox? volume_ETH_spot < volume_ETH_spot_number_more and volume_ETH_spot > volume_ETH_spot_number_less : true

// Check if we have confirmation for our setup
var Price_long = true
if Price_filter_checkbox
    Price_long:=close>Price_filter_1_long and close<Price_filter_2_long

var Price_short = true
if Price_filter_checkbox
    Price_short:=close>Price_filter_1_short and close<Price_filter_2_short


validlong = sommi_diamond_on  ? sommiBullishDiamond and strategy.position_size == 0 and barstate.isconfirmed and regimeFilter_local and regimeFilter  :  validlow and strategy.position_size == 0 and barstate.isconfirmed and regimeFilter_local and Price_long and long_check and slope_filter_long and volume_ETH_spot_filter
validshort = sommi_diamond_on ? sommiBearishDiamond and strategy.position_size == 0 and barstate.isconfirmed and reverse_regime_local and reverse_regime  :  validhigh and strategy.position_size == 0 and barstate.isconfirmed and reverse_regime_local and Price_short and short_check and slope_filter_short and volume_ETH_spot_filter


// Save trade stop & target & position size if a valid setup is detected
var tradeStopPrice = 0.0
var tradeTargetPrice = 0.0
var TP=0.0
var limit_price=0.0
//Detect valid long setups & trigger alert
if validlong 
    if buySignalDiv or wtGoldBuy
        limit_price:=limit_checkbox? close*(1-limit_shift*0.01) : close
        tradeStopPrice :=  limit_price*(1-b_1*0.01)
        tradeTargetPrice := limit_price*(1+a_1_div*0.01)
        TP:= a_1_div
    
    else
        limit_price:=limit_checkbox? close*(1-limit_shift*0.01) : close
        tradeStopPrice :=  limit_price*(1-b_1*0.01)
        tradeTargetPrice := limit_price*(1+a_1*0.01)
        TP:= a_1

// if validlong 
//     if buySignalDiv or wtGoldBuy
//         limit_price:=close 
//         tradeStopPrice :=  limit_price*(1-b_1*0.01)
//         tradeTargetPrice := limit_price*(1+a_1_div*0.01)
//         TP:= a_1_div
    
//     else
//         limit_price:=close
//         tradeStopPrice :=  limit_price*(1-b_1*0.01)
//         tradeTargetPrice := limit_price*(1+a_1*0.01)
//         TP:= a_1
// Detect valid short setups & trigger alert
if validshort 
    limit_price:=limit_checkbox? close*(1+limit_shift*0.01) : close
    tradeStopPrice :=  limit_price*(1+b_2*0.01)
    tradeTargetPrice  := limit_price*(1-a_2*0.01)
    TP:= a_2

// if validshort 
//     limit_price:= close
//     tradeStopPrice :=  limit_price*(1+b_2*0.01)
//     tradeTargetPrice  := limit_price*(1-a_2*0.01)
//     TP:= a_2

if cancel_in and barssince(validlong) == cancel_in_num or barssince(validshort) == cancel_in_num
    strategy.cancel_all()
if long_on 
    strategy.entry (id="Long", long=strategy.long, limit=limit_price, when=validlong, comment='{\n'    + '  "name": "",\n'    + '  "secret": "",\n'    + '  "side": "buy",\n'    + '  "symbol": '+'"'+_return+'"'+',\n'    + '  "positionSide": "long"\n'    + '}')
if short_on
    strategy.entry (id="Short", long=strategy.short, limit=limit_price, when=validshort,comment='{\n'    + '  "name": "",\n'    + '  "secret": "",\n'    + '  "side": "sell",\n'    + '  "symbol": '+'"'+_return+'"'+',\n'    + '  "positionSide": "short",\n'    + '  "sl": {\n'    + '    "enabled": true\n'    + '  }\n'    + '}')
//    condition:=true
// if Cancel_all and strategy.position_size > 0 and (reverse_regime_local or reverse_regime)
//     strategy.close_all(when=strategy.position_size != 0, comment='{\n'     + '  "name": "",\n'     + '  "secret": "",\n'     + '  "side": "sell",\n'     + '  "symbol": '+'"'+_return+'"'+',\n'     + '  "positionSide": "flat"\n'     + '}')




if Cancel_all and strategy.position_size > 0 and reverse_regime_local
    strategy.close_all(when=strategy.position_size != 0, comment='{\n'
     + '  "name": "",\n'
     + '  "secret": "",\n'
     + '  "side": "sell",\n'
     + '  "symbol": '+'"'+_return+'"'+',\n'
     + '  "positionSide": "flat"\n'
     + '}')

if Cancel_all and strategy.position_size < 0 and regimeFilter_local
    strategy.close_all(when=strategy.position_size != 0, comment='{\n'
     + '  "name": "",\n'
     + '  "secret": "",\n'
     + '  "side": "buy",\n'
     + '  "symbol": '+'"'+_return+'"'+',\n'
     + '  "positionSide": "flat"\n'
     + '}')
     
if cancel_in and strategy.position_size > 0 and barssince(validlong) > cancel_in_num
    strategy.close_all(when=strategy.position_size != 0, comment='{\n'
     + '  "name": "",\n'
     + '  "secret": "",\n'
     + '  "side": "sell",\n'
     + '  "symbol": '+'"'+_return+'"'+',\n'
     + '  "positionSide": "flat"\n'
     + '}')

if cancel_in and strategy.position_size < 0 and barssince(validshort) > cancel_in_num
    strategy.close_all(when=strategy.position_size != 0, comment='{\n'
     + '  "name": "",\n'
     + '  "secret": "",\n'
     + '  "side": "buy",\n'
     + '  "symbol": '+'"'+_return+'"'+',\n'
     + '  "positionSide": "flat"\n'
     + '}')

// Exit trades whenever our stop or target is hit
strategy.exit(id="Long Exit", from_entry="Long", limit=tradeTargetPrice, stop=tradeStopPrice, when=strategy.position_size > 0)
strategy.exit(id="Short Exit", from_entry="Short", limit=tradeTargetPrice,stop=tradeStopPrice, when=strategy.position_size < 0)
```

> Detail

https://www.fmz.com/strategy/436622

> Last Modified

2023-12-26 12:18:54
