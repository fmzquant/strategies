
> Name

趋势突破策略Extremely-Overfit-Trend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略旨在捕捉加密货币市场中的强劲趋势,采用多重通道和移动平均线来识别趋势形成的信号,并结合量能指标过滤假突破,同时运用自适应止损来锁定盈利,可实现在趋势市场中获利。

## 策略原理

该策略使用了快速通道、慢速通道和快速移动平均线三者结合来识别趋势。快速通道参数设置较敏感,用于捕捉短期价格波动;慢速通道参数较缓和,用于判断大趋势;快速移动平均线参数介于两者之间,当其突破通道时产生交易信号。 

具体来说,它首先计算快速通道的上下轨,及移动平均线。当价格突破上轨时,如果慢速通道的下轨也处于移动平均线之上,则产生做多信号;反之,突破下轨时判断慢速通道的上轨是否在移动平均线之下,则产生做空信号。

此外,它还检测K线形态,要求数根K线顺序排列以过滤假突破;并计算价格变动率指标,避免行情被困在通道内震荡;加入交易量指标来确保突破时量能跟随。

对于止损方面,该策略使用的是自适应止损。根据最近一段时间的波动情况,动态调整止损幅度。这可以在保证止损的同时,尽可能追溯更多的趋势行情。

## 优势分析

该策略最大的优势在于形成交易信号的判断规则较为严格,可以有效过滤掉非趋势性的假突破,真正捕捉到行情趋势转折点。具体来说,主要有以下几个方面:

1. 多重通道及移动平均线组合,判断标准较严,可以减少误判概率。

2. K线顺序排列校验,避免单根异动K线产生错误信号。

3. 结合价格变动率指标,可以判断是否进入盘整,避免错过反转机会。

4.	加入量能指标判断,只有量随价一起出现才会产生信号,避免无效突破。

5.	自适应止损机制,可以在保证止损的前提下,最大限度锁定趋势利润。

所以,该策略整体来说具有配置优化,决策严谨,止损自适应等特点,非常适合捕捉趋势行情。

## 风险分析

尽管该策略在过滤假突破和截取趋势方面做了很多优化,但仍存在一些风险需要注意:

1.	参数设置过于复杂,不同参数组合效果差异较大,需要经过大量测试找到最佳参数,不当设置可能产生过多错误信号。

2.	快速平均线和通道间隙过小时,容易产生频繁开仓平仓,不利于持久跟踪趋势。

3.	自适应止损机制中止损幅度计算依赖简单标准差,对极端行情可能止损过小。

4.	过于依赖技术指标,在基本面突发重大变化时难以响应。

5. 该策略属于趋势跟踪策略,在盘整震荡市场中表现较差。

针对这些风险,建议采取以下措施加以控制:

1.	做充分回测,确定最佳参数组合,也可以考虑使用机器学习等方法进行参数优化。

2.	适当放宽通道间距,移平均线周期也可以适当加长,减少不必要开仓频率。

3.	可以考虑引入对冲基金等更先进的波动率计算模型。 

4.	适时参考基本面信息,避免仅凭技术指标交易。

5. 增加对市场状态的判断,在震荡市中暂停交易。

## 优化方向 

该策略还有以下几点可以进一步优化:

1. 增加机器学习算法,实现参数自动优化。可以记录不同市场环境下的参数表现,建立查询表,实现动态优化。

2. 增加对市场状态的判断,如增加判断行情是趋势还是震荡的模块,在震荡市场中暂停交易,避免不必要损失。

3. 优化止损策略,可以考虑跟踪止损、比例止损等其他止损方式。

4.	加入基本面因素,当重大基本面事件发生时发出警告,避免仅凭技术指标造成损失。

5. 进行组合优化,将该策略与其他非相关策略组合,可以进一步扩散风险。

6.	加入量化交易框架,自动执行信号,并实现严格的风险控制。

## 总结

综上所述,该策略总体来说非常适合捕捉加密货币市场中的趋势机会。它使用多重通道及移动平均线产生交易信号,并有效地过滤掉了假突破的噪声,成功锁定了趋势利润。但仍需注意参数优化、止损方式、市场状态判断等问题。如果能够不断完善,有望获取稳定的投资回报。它为量化交易策略的设计提供了一个很好的示例。

|| 

## Summary  

This strategy aims to capture strong trends in cryptocurrency markets by using multiple channels and moving averages to identify trend signals, and combines volume indicators to filter false breakouts while adaptively stopping losses to lock in profits, allowing profits to be made in trending markets.

## Strategy Principle 

The strategy uses a combination of fast channel, slow channel and fast moving average to identify trends. The fast channel parameters are more sensitive for capturing short-term price fluctuations; the slow channel parameters are more moderate for judging the major trend; the fast moving average parameters are in between, generating trading signals when it breaks through the channel.

Specifically, it first calculates the upper and lower rails of the fast channel, and the moving average. When the price breaks through the upper rail, if the lower rail of the slow channel is also above the moving average, a long signal is generated; conversely, when it breaks through the lower rail, it checks if the upper rail of the slow channel is below the moving average, generating a short signal.

In addition, it detects the K-line pattern, requiring multiple K-lines to be arranged in sequence to filter false breakouts; and calculates the price change rate indicator to determine if it has entered a consolidation to avoid missing reversal opportunities; and incorporates volume indicators to ensure volume follows price at breakout. 

For stop loss, the strategy uses adaptive stops loss. Based on recent volatility, it dynamically adjusts the stop loss percentage. This allows locking in as much of the trend profit as possible while ensuring effective stop loss.

## Advantage Analysis

The biggest advantage of this strategy is that the criteria for generating trading signals are relatively strict, which can effectively filter out non-trend false breakouts and truly capture turning points in market trends. Specifically, there are several main aspects:

1. The combination of multiple channels and moving averages has stricter criteria and can reduce misjudgment probability.

2. K-line sequence validation avoids wrong signals from a single aberrant K-line. 

3. Incorporating price change rate indicator can determine if it has entered consolidation to avoid missing reversal opportunities.

4. Adding volume indicator judgment ensures signals are generated only when volume follows price, avoiding ineffective breakout. 

5. Adaptive stop loss mechanism can maximize locking in trend profits while ensuring stop loss.

So in general, this strategy has the characteristics of optimized configuration, prudent decision making, adaptive stop loss, making it very suitable for capturing trending opportunities.

## Risk Analysis

Although this strategy has done a lot of optimization in filtering false breakouts and capturing trends, there are still some risks to note:

1. The complex parameter settings can lead to large differences between parameter combinations, requiring extensive testing to find the optimal parameters, otherwise it may generate too many false signals.

2. When the gap between fast moving average and channel is too small, it tends to generate frequent entries and exits, which is not conducive to persistently tracking trends.

3. The stop loss percentage calculation in the adaptive stop loss mechanism relies on simple standard deviation, which may lead to insufficient stop loss in extreme market conditions. 

4. It relies heavily on technical indicators and may fail to respond to major fundamental changes.

5. As a trend following strategy, it underperforms in range-bound choppy markets.

To control these risks, the following measures are recommended:

1. Do sufficient backtesting to determine optimal parameter combinations, or consider using machine learning for parameter optimization.

2. Moderately widen channel intervals, lengthen moving average periods to reduce unnecessary entries.

3. Consider introducing more advanced volatility models like hedge fund methods.

4. Refer to fundamental information in a timely manner to avoid purely technical trading. 

5. Increase judgment on market states and pause trading in choppy markets.

## Optimization

The strategy can be further optimized in the following ways:

1. Introduce machine learning algorithms to achieve automatic parameter optimization, by recording parameter performance in different market environments to build a lookup table for dynamic optimization.

2. Add judgment on market states, such as adding modules to determine if the market is trending or choppy, and pause trading in choppy markets to avoid unnecessary losses.

3. Optimize stop loss strategies, such as trailing stop loss, proportional stop loss etc.

4. Incorporate fundamental factors to send out alerts when major fundamental events occur, avoiding losses purely based on technical indicators.

5. Conduct portfolio optimization, combining this strategy with other unrelated strategies to further diversify risks. 

6. Introduce quantitative trading framework for automated signal execution and strict risk control.

## Conclusion

In summary, this strategy is very suitable for capturing trending opportunities in cryptocurrency markets. It uses multiple channels and moving averages to generate trading signals, and effectively filters out false breakout noise and successfully locks in trend profits. But parameters optimization, stop loss methods, market state judgement etc still need attention. With continuous improvement, it has potential for steady investment returns. It provides a great example for quantitative strategy design.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|go long?|
|v_input_2|true|go short?|
|v_input_3|-40|Restrictiveness (higher = make fewer trades)|
|v_input_4|6|2fastChannelLength|
|v_input_5|3.2|fastChannelMargin|
|v_input_6|6|slowChannelLength|
|v_input_7|1.5|slowChannelMargin|
|v_input_8|4|fastHMAlength|
|v_input_9|3|stopLoss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Extremely Overfit", overlay=true, commission_type=strategy.commission.percent, commission_value=.16, default_qty_type=strategy.percent_of_equity, default_qty_value=100, pyramiding = 1)
price = close

goLong = input(title="go long?", type=input.bool, defval=true)
goShort = input(title="go short?", type=input.bool, defval=true)
//trendRestrict = input(title="basic trend restriction?", type=input.bool, defval=false)
dynamicRestrict = true //input(title="dynamic trend restriction?", type=input.bool, defval=true)
longtrendimpt = true //input(title="additional weight on long-term trends?", type=input.bool, defval=true)
volRestrict = true //input(title="volume restriction?", type=input.bool, defval=true)
conservativeClose = false //input(title="conservative order closing?", type=input.bool, defval=false)

Restrictiveness = input ( -40,step=10,title ="Restrictiveness (higher = make fewer trades)")
volatilityImportance = 3.2 //input( 3.2, step = 0.1, minval = 0)
fastChannelLength = input( 6 )
fastChannelMargin = input ( 3.2, step = 0.1, minval = 0)
slowChannelLength = input ( 6, step = 1, minval = 0)
slowChannelMargin = input ( 1.5, step = 0.1, minval = 0)
fastHMAlength = input (4, step = 1, minval = 0)
stopLoss = input( 3, step = 0.1, minval = 0)
//altClosePeriod = input( 27, step = 1, minval = 1)
//altCloseFactor = input( 4.9, step = 0.1)
stopLossFlexibility = 50 //input(50, step=10, title="effect of volatility on SL?")
volumeMAlength = 14 //input ( 14, step = 1, minval = 1)
volumeVolatilityCutoff = 3.8 // ( 3.8, step = 1, minval = 0)
trendSensitivity = 3.8 //input ( 3.8, step = 0.1)
obvLookback = 10 //input(10, step = 10, minval = 10)
obvCorrThreshold = 0.89 //input(0.89, step = 0.01)
ROClength = 80 //input( 80, step = 10)
ROCcutoff = 5.6 //input( 5.6, step=0.1)

trendRestrict = false
//trendLookback = input ( 360, step = 10, minval = 10)
//longTrendLookback = input(720, step = 10, minval = 10)
//longTrendImportance = input(1.5, step = 0.05)
trendLookback = 360
longTrendLookback = 720
longTrendImportance = 1.5

//conservativeness = input( 2.4, step = 0.1)
conservativeness = 0
//trendPower = input( 0, step=1)
trendPower = 0
//conservativenessLookback = input( 650, step = 10, minval = 0)
conservativenessLookback = 10
//consAffectFactor = input( 0.85,step=0.01)
consAffectFactor = 0.85
//volatilityLookback = input(50, step=1, minval=2)
volatilityLookback = int(50)
recentVol = stdev(price,volatilityLookback)/sqrt(volatilityLookback)

//price channel

fastChannel = ema(price, fastChannelLength)
fastChannelUB = fastChannel * (1 + (float(fastChannelMargin) / 1000)) + (recentVol * (float(volatilityImportance) * (1 + (Restrictiveness/100))))
fastChannelLB = fastChannel * (1 - (float(fastChannelMargin) / 1000)) - (recentVol * (float(volatilityImportance) * (1 + (Restrictiveness/100))))
fchU = ((fastChannelUB < open) and (fastChannelUB < close))
fchL = ((fastChannelLB > open) and (fastChannelLB > close))
//plot(fastChannelUB)
//plot(fastChannelLB)

//slow channel
//slowChannelLBmargin = input ( 2, step = 0.1, minval = 0 )
slowChannel = ema(ema(price,slowChannelLength),slowChannelLength)
slowChannelUB = slowChannel * (1 + (float(slowChannelMargin) / 2000)) + (recentVol * (float(volatilityImportance) * (1 + (Restrictiveness/100))))
slowChannelLB = slowChannel * (1 - (float(slowChannelMargin) / 2000)) - (recentVol * (float(volatilityImportance) * (1 + (Restrictiveness/100))))
schU = ((slowChannelUB < close))
schL = ((slowChannelLB > close))
cschU = (((slowChannelUB * (1 + conservativeness)) < close))
cschL = (((slowChannelUB * (1 - conservativeness)) > close))
//plot(slowChannel,color = #00FF00)
//plot(slowChannelUB,color = #00FF00)
//plot(slowChannelLB,color = #00FF00)


fastHMA = hma(price,fastHMAlength)
fastAboveUB = (fastHMA > slowChannelUB)
fastBelowLB = (fastHMA < slowChannelLB)
//plot(fastHMA, color = 	#FF0000, linewidth = 2)

//consecutive candles
//consecutiveCandlesReq = input(1, step = 1, minval = 1, maxval = 4)
consecutiveCandlesReq = 1
consecutiveBullReq = float(consecutiveCandlesReq)
consecutiveBearReq = float(consecutiveCandlesReq)
cbull = ((close[0] > close[1]) and (consecutiveBullReq == 1)) or (((close[0] > close[1]) and (close[1] > close[2])) and consecutiveBullReq == 2) or (((close[0] > close[1]) and (close[1] > close[2]) and (close[2] > close[3])) and consecutiveBullReq == 3) or (((close[0] > close[1]) and (close[1] > close[2]) and (close[2] > close[3]) and (close[3] > close[4])) and consecutiveBullReq == 4)
cbear = ((close[0] < close[1]) and (consecutiveBearReq == 1)) or (((close[0] < close[1]) and (close[1] < close[2])) and consecutiveBearReq == 2) or (((close[0] < close[1]) and (close[1] < close[2]) and (close[2] < close[3])) and consecutiveBearReq == 3) or (((close[0] < close[1]) and (close[1] < close[2]) and (close[2] < close[3]) and (close[3] < close[4])) and consecutiveBearReq == 4)

//trend detection
//trendCutoff = input(0, step = 0.1)
trendCutoff = 0
trendDetectionPct = float(trendCutoff/100)
trendVal = float((close[0] - close[trendLookback])/close[0])
trendUp = (trendVal > (0 + trendDetectionPct))
trendDown = (trendVal < (0 - trendDetectionPct))
//plot(trendVal+36.5,linewidth=2)

// peak indicators
peakHigh = ((fastHMA > fastChannelUB) and (fastChannelLB > slowChannelUB))
peakLow = ((fastHMA < fastChannelLB) and (fastChannelUB < slowChannelLB))
TpeakHigh = (fastHMA > fastChannelUB) and (fastChannelUB > slowChannelUB)
TpeakLow = (fastHMA < fastChannelUB) and (fastChannelLB < slowChannelLB)
//TpeakHigh = (fastHMA > fastChannelUB) and (fastChannelLB > avg(slowChannelUB,slowChannelLB))
//TpeakLow = (fastHMA < fastChannelUB) and (fastChannelUB < avg(slowChannelLB,slowChannelUB))
//TpeakHigh = ((crossover(fastHMA,fastChannelUB)) and (fastChannelLB > slowChannelUB))
//TpeakLow = ((crossover(fastChannelLB,fastHMA)) and (fastChannelUB < slowChannelLB))
//TpeakHigh = (fastHMA > (fastChannelUB * (1 + (trendPower/800)))) and (fastChannelUB > (slowChannelUB * (1 + (trendPower/800))))
//TpeakLow = (fastHMA < (fastChannelUB * (1 - (trendPower/800)))) and (fastChannelLB < (slowChannelLB * (1 - (trendPower/800))))
//TpeakHigh = (fastHMA > (fastChannelUB * (1 + (trendPower/800)))) and (avg(fastChannelUB,fastChannelLB) > (slowChannelUB * (1 + (trendPower/800))))
//TpeakLow = (fastHMA < (fastChannelUB * (1 - (trendPower/800)))) and (avg(fastChannelLB,fastChannelUB) < (slowChannelLB * (1 - (trendPower/800))))
//plot(fastChannelUB * (1 + (trendPower/700)), color=#FF69B4)

// and for closing...
closeLong = (crossover(fastHMA,fastChannelUB) and (fastChannelLB > slowChannelUB))
closeShort = (crossover(fastChannelLB,fastHMA) and (fastChannelUB < slowChannelLB))
//closeLong = (crossover(fastHMA,fastChannelUB) and (fastChannelLB > slowChannelUB)) or (roc(price,altClosePeriod) > altCloseFactor)
//closeShort = (crossover(fastChannelLB,fastHMA) and (fastChannelUB < slowChannelLB))  or (roc(price,altClosePeriod) < (altCloseFactor) * -1)
//closeLong = (crossover(fastHMA,fastChannelUB) and (fastChannelLB > slowChannelUB)) or (((price - fastChannelUB) > (altCloseFactor * abs(((fastChannelUB - fastChannelLB)/2) - ((slowChannelUB - slowChannelLB)/2)))) and (fastChannelLB > slowChannelUB))
//closeShort = (crossover(fastChannelLB,fastHMA) and (fastChannelUB < slowChannelLB)) or (((fastChannelLB - price) > (altCloseFactor * abs(((fastChannelUB - fastChannelLB)/2) - ((slowChannelUB - slowChannelLB)/2)))) and (fastChannelUB < slowChannelLB))
//closeLong = crossover(fastHMA,fastChannelUB) and ((fastChannelLB[0] - fastChannelLB[1]) < (slowChannelUB[0] - slowChannelUB[1]))
//closeShort = crossover(fastChannelLB,fastHMA) and ((fastChannelUB[0] - fastChannelUB[1]) > (slowChannelLB[0] - slowChannelLB[1]))


//stop-loss
priceDev = stdev(price,trendLookback) * (1 + stopLossFlexibility/5)
stopLossMod = stopLoss * (1 + (priceDev/price))
//longStopPrice  = strategy.position_avg_price * (1 - (stopLoss/100))
//shortStopPrice = strategy.position_avg_price * (1 + (stopLoss/100))
longStopPrice  = strategy.position_avg_price * (1 - (stopLossMod/100))
shortStopPrice = strategy.position_avg_price * (1 + (stopLossMod/100))


// volume
volumeMA = ema(volume,volumeMAlength)
volumeDecrease = ((not volRestrict ) or (volumeMA[0] < ema(volumeMA[1] * (1 - (volumeVolatilityCutoff/100)),5)))
volumeCutoff = ema(volumeMA[1] * (1 - (volumeVolatilityCutoff/100)),5)
//plot(volumeMA)
//plot(volumeCutoff)

// detect volatility
//trendinessLookback = input ( 600, step = 10, minval = 0)
trendinessLookback = trendLookback
trendiness = (stdev(price,trendinessLookback)/price) * (1 - (Restrictiveness/100))
longtermTrend = ((price - price[longTrendLookback])/price)
//dynamicTrendDetected = (dynamicRestrict and (abs(trendiness * 100) < trendSensitivity))
dynamicTrendDetected = (longtrendimpt and (dynamicRestrict and (abs(trendiness * 100) < (trendSensitivity+(longtermTrend * longTrendImportance))))) or (not longtrendimpt and ((dynamicRestrict and (abs(trendiness * 100) < trendSensitivity))))

// adapt conservativeness to volatility

//consVal = sma(((stdev(price,conservativenessLookback))/price)*100,25)
consVal = sma(((stdev(price,conservativenessLookback))/price)*100,25)
cVnorm = sma(avg(consVal,3),60)
cVal = consVal - cVnorm

//conservativenessMod = conservativeness * (cVal * consAffectFactor)
conservativenessMod = conservativeness * (consVal * consAffectFactor)
//plot(consVal,linewidth=4)
//plot(cVnorm,color = #00FF00)
//plot(cVal,linewidth=2)

// ROC cutoff (for CLOSING)
//rocCloseLong = (ema(roc(price,ROClength),10) > ROCcutoff)
//rocCloseShort = (ema(roc(price,ROClength),10) < (ROCcutoff * -1))
ROCval = roc(price,ROClength)
ROCema = ema(ROCval,30)
ROCabs = abs(ROCema)
ROCallow = ROCabs < ROCcutoff
ROCallowLong = (ROCabs < ROCcutoff)  or ((ROCabs >= ROCcutoff) and ((fastChannelLB < slowChannelLB) and (fastHMA < fastChannelLB)))
ROCallowShort = (ROCabs < ROCcutoff) or ((ROCabs >= ROCcutoff) and ((fastChannelUB > slowChannelUB) and (fastHMA > fastChannelUB)))
//plot(ROCallow)

// obv
evidence_obv = (correlation(price,obv[0],obvLookback))
obvAllow = evidence_obv > obvCorrThreshold


//if (not na(vrsi))
if trendRestrict or dynamicTrendDetected
    //if (strategy.position_size == 0)
    if not (strategy.position_size < 0)
        if trendUp
        	//if cbear and schL and fchL and trendUp and goLong
        	if cbear and TpeakLow and volumeDecrease and ROCallow and goLong and obvAllow
        	//if cbear and peakLow and rocHigh and volumeDecrease and goLong
        		strategy.entry("Long", strategy.long, comment="Long")
    if not (strategy.position_size > 0)
        if trendDown
        	//if cbull and schU and fchU and trendDown and goShort
        	if cbull and TpeakHigh and volumeDecrease and ROCallow and goShort and obvAllow
        	//if cbull and peakHigh and rocLow and volumeDecrease and goShort
        		strategy.entry("Short", strategy.short, comment="Short")
else
    //if (strategy.position_size == 0)
    if not (strategy.position_size < 0)
        //if cbear and peakLow and goLong
    	//if cbear and peakLow and volumeDecrease and ROCallow and goLong
    	if TpeakLow and goLong and obvAllow
    		strategy.entry("Long", strategy.long, comment="Long")
    if not (strategy.position_size > 0)
        //if cbull and peakHigh and goShort
    	//if cbull and peakHigh and volumeDecrease and ROCallow and goShort
    	if TpeakHigh and goShort and obvAllow
    		strategy.entry("Short", strategy.short, comment="Short")

if conservativeClose
    //pkHigh = ((fastHMA > fastChannelUB) and (fastChannelUB > (slowChannelUB * (1 + conservativeness/1000))))
    //pkLow = ((fastHMA < fastChannelLB) and (fastChannelLB < (slowChannelLB * (1 - conservativeness/1000))))
    //pkHigh = ((fastHMA > fastChannelUB) and (fastChannelUB > (slowChannelUB * (1 + conservativenessMod/1000))))
    //pkLow = ((fastHMA < fastChannelLB) and (fastChannelLB < (slowChannelLB * (1 - conservativenessMod/1000))))
    pkHigh = ((fastHMA > fastChannelUB) and (fastChannelUB > (slowChannelUB * (1 + ((conservativenessMod/1000) * (1 - Restrictiveness/100))))))
    pkLow = ((fastHMA < fastChannelLB) and (fastChannelLB < (slowChannelLB * (1 - ((conservativenessMod/1000) * (1 - Restrictiveness/100))))))
    
    if (strategy.position_size > 0)
        //if fastAboveUB
        //if pkHigh and closeLong
        if closeLong
    		strategy.close("Long", comment="closeLong")
    if (strategy.position_size < 0)
        //if fastBelowLB
        //if pkLow and closeShort
        if closeShort
    		strategy.close("Short", comment="closeShort")
else
    if (strategy.position_size > 0)
        //if fastAboveUB
        if peakHigh
    		strategy.close("Long", comment="closeLong")
    if (strategy.position_size < 0)
        //if fastBelowLB
        if peakLow
    		strategy.close("Short", comment="closeShort")

if (strategy.position_size > 0)
    strategy.exit(id="Long", stop=longStopPrice, comment="stopLong")

if (strategy.position_size < 0)
    strategy.exit(id="Short", stop=shortStopPrice, comment="stopShort")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)











```

> Detail

https://www.fmz.com/strategy/428094

> Last Modified

2023-09-28 15:54:32
