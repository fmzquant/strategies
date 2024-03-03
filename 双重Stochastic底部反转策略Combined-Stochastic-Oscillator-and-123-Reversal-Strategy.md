
> Name

双重Stochastic底部反转策略Combined-Stochastic-Oscillator-and-123-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16654670e61fbbc65ea.png)

[trans]

### 概述

本策略结合了123底部反转和Stochastic指标,实现在股价出现底部反转的同时,Stochastic指标也出现底部反转时,产生买入信号。该策略可以有效识别股价反转的底部,双重指标过滤可以降低交易频率,提高信号的准确性。

### 策略原理

1. 123底部反转策略

    - 如果收盘价高于前两天的收盘价,并且9日Stochastic指标的快速线低于慢速线且快速线低于50,则产生买入信号

    - 如果收盘价低于前两天的收盘价,并且9日Stochastic指标的快速线高于慢速线且快速线高于50,则产生卖出信号

2. Stochastic指标策略

    - 如果Stochastic快速线上穿上轨(默认20),产生买入信号

    - 如果Stochastic快速线下穿下轨(默认80),产生卖出信号

3. 双重信号过滤

    只有当123反转策略和Stochastic策略同时产生买入信号时,才会产生最终的买入信号,卖出信号同理。这可以有效过滤掉一些错误信号,提高信号质量。

### 策略优势

1. 双重指标确认,可以过滤掉大量噪音,提高信号的准确率。

2. 123反转策略可以捕捉到价格反转的底部和顶部。Stochastic指标确认有助于避免假突破。

3. Stochastic指标可以有效识别超买超卖区域,与123反转策略形成完美配合。

4. 参数优化空间大,可以通过调整参数来获得更好的策略效果。

5. 策略逻辑简单清晰,容易理解实现,适合量化交易初学者学习。

### 策略风险

1. 双重过滤信号可能错过一些机会,降低了交易频率。

2. Stochastic指标容易产生假信号,需要谨慎判断指标实际走势。

3. 需要优化参数,如果参数设置不当也会影响策略效果。

4. 只适用于具有明显反转特征的市场,不适用于持续上升或下跌的市场。

5. 需要严格遵守策略信号,避免自行判断产生的偏差。

风险解决:优化参数设置,严格遵循策略信号,适时调整策略适用的市场环境。

### 策略优化方向

1. 优化Stochastic指标的参数,提高指标的稳定性。

2. 增加止损策略,在亏损达到一定比例时止损退出。

3. 添加过滤条件,如成交量的确认,可以进一步提高信号质量。 

4. 测试不同的反转策略与Stochastic指标的组合效果。

5. 增加机器学习算法,利用历史数据对参数进行训练和优化。

6. 将策略应用在不同市场,测试跨市场稳定性。

7. 探索其他技术指标与Stochastic指标的组合,寻找更好的配对方案。

### 总结

本策略通过双重Stochastic指标和123反转形态进行组合,实现了对底部反转机会的有效捕捉。相比单一指标,多指标组合可以明显提高信号的质量和胜率。虽然仍存在一定改进空间,但整体来说该策略逻辑简单,易于掌握,非常适合初学者实盘演练。通过反复测试和优化,可以使策略参数更加稳健,从而获得更持续的正收益。

|| 


### Overview

This strategy combines the 123 reversal pattern and Stochastic oscillator to generate buy signals when the price shows bottom reversal and the Stochastic oscillator also reversed from the bottom. It can effectively identify bottom reversals and the double confirmation filters can reduce trading frequency and improve signal accuracy.

### Strategy Logic

1. 123 Reversal Strategy

    - Buy signal is generated if the closing price is higher than previous 2 days’ closing price, and 9-day Stochastic fast line is below slow line and below 50.

    - Sell signal is generated if the closing price is lower than previous 2 days’ closing price, and 9-day Stochastic fast line is above slow line and above 50.

2. Stochastic Oscillator Strategy 

    - Buy signal is generated if Stochastic %K line crossed above upper band (default 20).

    - Sell signal is generated if Stochastic %K line crossed below lower band (default 80).
    
3. Dual Confirmation

    Buy signal is only generated when both 123 reversal and Stochastic strategies give buy signal. Sell signal is similar. This dual confirmation can filter out false signals and improve accuracy.

### Advantages

1. Dual confirmation filters out noise and improves signal accuracy.

2. 123 reversal catches bottom and top reversals. Stochastic avoids false breakouts.

3. Stochastic identifies overbought and oversold effectively, great match with 123 reversal.

4. High optimization flexibility with parameters tuning.

5. Simple logic, easy to understand, good for beginners.

### Risks

1. Dual confirmation may miss some chances and reduce trading frequency.  

2. Stochastic may generate false signals, needs careful examination.

3. Proper parameter tuning is needed, improper settings affect performance.

4. Only works for markets with reversal pattern, not for persistent trends.

5. Strictly follow strategy signals, avoid biases from own judgement.

Risk Solutions: Optimize parameters, strictly follow signals, adjust applicable market condition.

### Optimization Directions 

1. Optimize Stochastic parameters for more stability.

2. Add stop loss strategy.

3. Add filters like volume confirmation to improve signal quality.

4. Test combinations of different reversal strategies and Stochastic.

5. Utilize machine learning to train and optimize parameters.

6. Apply strategy on different markets to test robustness.

7. Explore combinations with other indicators.

### Conclusion

This strategy combines Stochastic oscillator and 123 reversal pattern, which effectively catches bottom reversal opportunities. Compared to single indicator, the multi-indicator combination significantly improves signal quality and win rate. Although there is still room for improvement, the overall logic is simple and easy to grasp, making it ideal for beginner’s live trading practice. With repeated testing and optimization, the parameters can become more robust for consistent positive results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Stochastic ----|
|v_input_7|7|LengthS|
|v_input_8|3|DLengthS|
|v_input_9|20|UpBand|
|v_input_10|80|DownBand|
|v_input_11|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-25 00:00:00
end: 2023-10-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 07/07/2021
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
// This back testing strategy generates a long trade at the Open of the following 
// bar when the %K line crosses up UpBand line.
// It generates a short trade at the Open of the following bar when the %K line 
// crosses down DownBand line.
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


Stochastic(Length,DLength,UpBand,DownBand) =>
    pos = 0.0
    vFast = stoch(close, high, low, Length)
    vSlow = sma(vFast, DLength)
    pos := iff(vFast > UpBand, 1,
	         iff(vFast < DownBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Stochastic", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Stochastic ----")
LengthS = input(7, minval=1)
DLengthS = input(3, minval=1)
UpBand = input(20, minval=1)
DownBand = input(80, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posStochastic = Stochastic(LengthS,DLengthS,UpBand,DownBand)
pos = iff(posReversal123 == 1 and posStochastic == 1 , 1,
	   iff(posReversal123 == -1 and posStochastic == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/430269

> Last Modified

2023-10-26 17:00:27
