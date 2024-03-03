
> Name

反转与资金流动量组合策略-Reversal-and-Money-Flow-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

该策略通过结合123反转形态与资金流动量指标,实现趋势追踪与反转交易。

### 策略原理 

首先,通过123反转形态判断价格反转点。具体来说,如果前两天收盘价下跌,第三天收盘价上涨,且随机指标低于阈值,产生买入信号;如果前两天收盘价上涨,第三天收盘价下跌,且随机指标高于阈值,产生卖出信号。

其次,计算快线和慢线的资金流动量指标。快线由近期资金流动量的指数移动平均线组成,慢线为较长周期的指数移动平均线。如果快线高于慢线,判断为资金流入,产生买入信号;反之则产生卖出信号。

最后,结合123反转形态与资金流动量指标的信号,如果两者信号一致,则产生交易信号。

### 优势分析

- 组合多个信号,可以提高信号的可靠性。
- 123反转形态可以捕捉反转点,资金流动量指标判断资金流向。
- 可通过调整参数来优化不同品种和周期的表现。
- 可单独使用其中一个信号进行交易。

### 风险分析

- 123反转形态可能产生假信号。
- 资金流动量存在滞后性,无法及时捕捉转折点。
- 多重信号组合,策略逻辑相对复杂。
- 需要优化参数以避免过度交易。

可通过提高反转形态的可靠性,设置资金流动量指标的灵敏度,以及加入止损逻辑来控制风险。

### 优化方向

- 测试不同参数组合,找到最佳的参数。
- 调整买入和卖出阈值,降低错误交易概率。
- 添加其他技术指标,提高信号质量。
- 加入止损机制,控制单笔损失。
- 优化资金管理策略,控制整体风险敞口。

### 总结

该策略整合反转交易与趋势追踪的优点,可以有效识别市场转折点。但需要注意参数调优以及风险控制,在跟踪趋势的同时防止产生过多错误信号。如果用好,可以成为高效的交易策略之一。

||

This strategy combines 123 reversal patterns and money flow indicator to identify trend reversals. 

### Strategy Logic

Firstly, 123 reversal patterns are used to detect potential reversal points. Specifically, a buy signal is generated when prices close down in the first two days and then close up on the third day, with stochastic oscillator below the threshold. A sell signal is generated when prices close up in the first two days and then close down on the third day, with stochastic oscillator above the threshold.

Secondly, fast and slow lines of money flow indicator are calculated. The fast line consists of short period exponential moving average of money flow, while the slow line is longer period EMA. When the fast line is above the slow line, it indicates money inflow and generates a buy signal. The opposite suggests money outflow and generates a sell signal.

Finally, when both the 123 reversal and money flow signals agree, a trading signal is generated. 

### Advantage Analysis 

- Combining multiple signals improves reliability.
- 123 reversals detect turning points and money flow indicates fund flows.
- Parameters can be adjusted for different products and timeframes.
- Individual signals can also be used independently.

### Risk Analysis

- 123 reversals may generate false signals.  
- Money flow has lagging effect, unable to capture turning points timely.
- Complex logic with multiple combined signals.
- Need parameter tuning to prevent overtrading.

Risks can be managed by improving reversal reliability, tuning money flow sensitivity, implementing stop loss, etc.

### Optimization Directions

- Test different parameter sets to find optimal values.
- Adjust buy/sell thresholds to reduce incorrect trades.
- Add other technical indicators to improve signal quality. 
- Implement stop loss to control single trade loss.
- Optimize money management strategies to manage overall risk.

### Conclusion

The strategy integrates the advantages of reversal trading and trend following. It can effectively identify market turning points. However, parameter tuning and risk control are necessary to avoid excessive false signals when tracking trends. If used properly, it can become an efficient trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Money Flow ----|
|v_input_7|3|Fast|
|v_input_8|10|Slow|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-17 00:00:00
end: 2023-09-16 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/02/2021
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
//    Indicator plots Money Flow Indicator (Chaikin). This indicator looks 
//    to improve on Larry William's Accumulation Distribution formula that 
//    compared the closing price with the opening price. In the early 1970's, 
//    opening prices for stocks stopped being transmitted by the exchanges. 
//    This made it difficult to calculate Williams' formula. The Chaikin 
//    Oscillator uses the average price of the bar calculated as follows 
//    (High + Low) /2 instead of the Open.
//    The indicator subtracts a 10 period exponential moving average of the 
//    AccumDist function from a 3 period exponential moving average of the 
//    AccumDist function.  
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


MFI(Fast,Slow) =>
    pos = 0.0
    lenMax = max(Fast, Slow)
    lenMin = min(Fast, Slow)
    xDiv = (high - low) * volume
    SumMax = sum(iff(xDiv > 0, (close - open) / (high - low) * volume , 0) , lenMax)
    SumMin = sum(iff(xDiv > 0, (close - open) / (high - low) * volume , 0) , lenMin)
    emaMax = ema(SumMax, lenMax)
    emaMin = ema(SumMin, lenMin)
    nRes = emaMax - emaMin
    pos:= iff(nRes > 0, 1,
           iff(nRes < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Money Flow Indicator", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Money Flow ----")
Fast = input(3, minval=1)
Slow = input(10, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMFI = MFI(Fast,Slow)
pos = iff(posReversal123 == 1 and posMFI == 1 , 1,
	   iff(posReversal123 == -1 and posMFI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427091

> Last Modified

2023-09-17 22:58:03
