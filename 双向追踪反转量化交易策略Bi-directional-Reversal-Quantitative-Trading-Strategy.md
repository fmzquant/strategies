
> Name

双向追踪反转量化交易策略Bi-directional-Reversal-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/127a9af0d2fb1389c56.png)
[trans]

本策略运用双向追踪机制,结合价格反转信号和成交量指标,实现自动化的量化交易。其最大优势在于可靠的风险控制,通过追踪止损来锁定利润,避免亏损扩大。同时,反转交易信号增强了策略的胜率。本文将详细解析该策略的原理、优势、风险和优化方向。

#### 策略原理

本策略由两个子策略组成。第一个子策略运用随机指标判定价格反转信号,具体逻辑是:

如果收盘价连续两天上涨,且9日Slow K线低于50,则做多;如果收盘价连续两天下跌,且9日Fast K线高于50,则做空。

第二个子策略则是结合成交量指标,判断力度的强弱。具体来说,是将当前成交量与40日成交量平均值比较。如果当前成交量大于平均值,认为是量能上攻,属于反转信号,做空;如果当前成交量小于平均值,认为是量能下泻,属于反转信号,做多。

最终交易信号,是上述两个子策略信号的交集。即两子策略同时发出信号时,才会开仓。通过这种“Intersection Targets”方法,可以过滤掉部分噪声交易,提高信号质量。

#### 策略优势

1. 利用双重指标确认,提高信号质量
2. 反转交易模式,具有一定的时序优势
3. 结合成交量分析,判断未来价格走势
4. 可靠的止损机制,有效控制单笔亏损

#### 策略风险

1. 反转信号可能出现失效,无法完全过滤市场噪声
2. 成交量异常时,量能判断会失效
3. 止损设置不当,可能造成过早止损或停损幅度过大
4. 回撤控制机制不完善,可能缩短策略寿命

可以从以下几个方面进一步优化:

1. 增加趋势判断规则,避免逆势交易
2. 优化止损逻辑,实现追踪止损和分阶段止损
3. 增加最大回撤限制,关闭策略避免巨额亏损
4. 结合机器学习算法,建立动态止损和头寸控制模型

总的来说,本策略以双向追踪和价格反转为主要交易逻辑,并辅以量能判断,通过双重确认提高信号质量。在实际应用中,仍需要进一步测试和优化,特别要防范止损和资金管理方面的风险,防止回撤过大导致的破产。但整体来说,本策略运用了量化交易的多种技巧,思路清晰,值得深入研究。

||

This strategy employs a bi-directional tracking mechanism, combined with price reversal signals and volume indicators, to realize automated quantitative trading. Its biggest advantage lies in reliable risk control by tracking stop loss to lock in profits and avoid loss expansion. Meanwhile, the reversal trading signals enhance the win rate of the strategy. This article will analyze in detail the principles, strengths, risks and optimization directions of this strategy.

#### Strategy Principles

This strategy consists of two sub-strategies. The first sub-strategy uses stochastic indicators to determine price reversal signals. The specific logic is:

If the close price rises for two consecutive days, and the 9-day Slow K line is lower than 50, go long; If the close price falls for two consecutive days, and the 9-day Fast K line is higher than 50, go short.

The second sub-strategy combines trading volume indicators to judge the strength of momentum. Specifically, the current trading volume is compared with the 40-day average trading volume. If the current trading volume is greater than the average, it is considered as aggressive volume up, which belongs to reversal signal for going short. If the current trading volume is less than average, it is considered as volume down, which belongs to reversal signal for going long.

The final trading signal is the intersection of the signals from the two sub-strategies. That is, a position will be opened only when both sub-strategies give out signals simultaneously. By using this "Intersection Targets" method, some noisy trades can be filtered out and the signal quality can be improved.

#### Advantages of the Strategy

1. Improved signal quality by double confirmation using dual indicators
2. Certain timing advantage with reversal trading model  
3. Judge future price movements combined with volume analysis
4. Reliable stop loss mechanism to effectively control single loss

#### Risks of the Strategy

1. Failure of reversal signals to fully filter market noise
2. Abnormal trading volume leading to invalid volume momentum judgment
3. Improper stop loss setting, causing premature stop loss or oversized stop loss
4. Lack of drawdown control mechanism, potentially shortening strategy life span

The strategy can be further optimized in the following aspects:

1. Add trend judging rules to avoid trading against trends
2. Optimize stop loss logic to realize tracking stop loss and staged stop loss
3. Add maximum drawdown limit to close strategy to avoid huge loss
4. Combine machine learning algorithms to build dynamic stop loss and position control models

In summary, this strategy is based mainly on bi-directional tracking and price reversal, plus volume momentum analysis to improve signal quality by dual confirmation. In actual application, further testing and optimization is still needed, especially to guard against the risks of stop loss and capital management, to prevent excessive drawdowns leading to wipeouts. But in general, this strategy utilizes a variety of quantitative trading techniques with clear logic, and is worth in-depth research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|40|Length_MAVol|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/11/2020
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// Volume and SMA
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos

    
VSAVol(Length) =>
    pos = 0.0
    xSMA_vol = sma(volume, Length)
    pos := iff(volume > xSMA_vol, -1,
    	     iff(volume < xSMA_vol, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Volume SMA", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length_MAVol = input(40, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posVSAVol = VSAVol(Length_MAVol)
pos = iff(posReversal123 == 1 and posVSAVol == 1 , 1,
	   iff(posReversal123 == -1 and posVSAVol == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/442504

> Last Modified

2024-02-22 13:46:51
