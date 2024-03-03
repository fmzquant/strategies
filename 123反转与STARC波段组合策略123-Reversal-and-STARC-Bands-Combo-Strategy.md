
> Name

123反转与STARC波段组合策略123-Reversal-and-STARC-Bands-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b0f209daa7e4876f96.png)
[trans]

### 概述

本策略通过组合123反转策略和STARC波段策略,实现更准确的交易信号产生。123反转策略通过K线反转形态判断底部反弹机会。STARC波段策略则利用价格突破波段上下轨来判断趋势方向。组合使用两种策略可以使交易信号更加可靠,同时也可以利用两种策略的优势。

### 策略原理

#### 123反转策略

该策略来源于Ulf Jensen的《我如何在期货市场上获得三倍收益》一书中第183页的内容。其交易思想是当价格出现向下反转时,视为底部反弹机会进场做多;当价格出现向上反转时,视为趋势反转机会进场做空。具体规则是:

多头信号:当收盘价连续两日高于前一日的收盘价,且9日移动平均慢速K线低于50时,做多。
空头信号:当收盘价连续两日低于前一日的收盘价,且9日移动平均快速K线高于50时,做空。

#### STARC波段策略 

该策略通过绘制价格短期简单移动平均线的上下波段来判断趋势方向。上轨通过在移动平均线上加上平均真实波动范围(ATR)构建。下轨通过从移动平均线上减去ATR构建。当价格突破上轨时看多,突破下轨时看空。

STARC代表“斯托勒平均范围通道”。该指标由其发明者Manning Stoller命名。

### 优势分析

组合使用123反转策略和STARC波段策略,可以提高交易信号的准确性。123反转策略可以捕捉反转机会。STARC波段策略可以判断价格趋势方向。两者互为补充,可以减少假信号,提高胜率。

此外,123反转策略可以使策略在市场突破新高或新低后避免追高杀跌。STARC波段策略可以利用ATR自适应波段范围来应对市场的变化。

### 风险分析

本策略最大的风险在于无法完全避免亏损单和连续亏损的出现。尽管通过组合两种策略可以减少假信号,但不排除在特定市况下策略会产生错误判断。此时需要及时止损来控制亏损。

另一个风险在于参数设置不当可能导致策略效果不佳。需要根据不同品种和周期进行参数测试和优化,使参数切合该品种的特点。

### 优化方向

本策略还有进一步优化的空间:

1. 增加止损策略,可以设置价格止损或指标止损来避免大单亏损;

2. 增加开仓条件,如增加量价确认,避免不利价格开仓;

3. 进行参数优化,寻找最适合该品种和周期的参数组合;

4. 增加动态出场思路,根据市场变化调整持仓。

### 总结

本策略通过组合运用123反转策略和STARC波段策略,综合了两种策略判断趋势反转和方向的优势。可以有效减少假信号,提高交易效率。同时也优化了单一使用任何一种策略存在的问题。通过持续优化,本策略可以成为一个稳定可靠的量化交易策略。
||


### Overview  

This strategy generates more accurate trading signals by combining the 123 Reversal strategy and the STARC Bands strategy. The 123 Reversal strategy judges bottom rebound opportunities through K-line reversal patterns. The STARC Bands strategy uses price breakouts of bands to determine trend direction. Using both strategies can make trading signals more reliable while utilizing the advantages of each strategy.

### Strategy Logic

#### 123 Reversal Strategy

This strategy originated from page 183 of the book "How I Tripled My Money in The Futures Market" by Ulf Jensen. The trading idea is to take long positions when prices show downward reversals as opportunities for bottom rebounds, and take short positions when prices show upward reversals as opportunities for trend reversals. The specific rules are: 

Long signal: When the closing price is higher than the previous day's closing price for two consecutive days, and the 9-day moving average of slow K-line is below 50, go long.  

Short signal: When the closing price is lower than the previous day's closing price for two consecutive days, and the 9-day moving average of fast K-line is above 50, go short.

#### STARC Bands Strategy  

This strategy judges trend direction by plotting bands around a short-term simple moving average of the price. The upper band is constructed by adding average true range (ATR) above the moving average. The lower band is constructed by subtracting ATR from the moving average. Breaking above the upper band indicates an uptrend, while breaking below the lower band indicates a downtrend.  

STARC stands for Stoller Average Range Channels. The indicator is named after its creator, Manning Stoller.

### Advantage Analysis  

Using both 123 Reversal and STARC Bands strategies improves the accuracy of trading signals. The 123 Reversal strategy captures reversal opportunities. The STARC Bands strategy judges trend direction. The two strategies complement each other to reduce false signals and improve win rate.  

In addition, the 123 Reversal strategy helps avoid chasing new highs or lows after market breakouts. The STARC Bands strategy utilizes adaptive ATR bands to accommodate market changes.

### Risk Analysis

The biggest risk of this strategy is the inability to completely avoid losing trades and consecutive losses. Although combining the two strategies can reduce false signals, incorrect judgments may still occur under certain market conditions. Timely stop losses should be used then to control losses.  

Another risk lies in improper parameter settings that may lead to poor strategy performance. Parameters need to be tested and optimized according to different products and timeframes to fit their characteristics.  

### Optimization Directions  

There is room for further optimization of this strategy:

1. Add stop loss strategies, such as price stops or indicator stops to avoid large losing trades;  

2. Add entry conditions like price confirmation to avoid unfavorable entry prices;

3. Conduct parameter optimization to find the most suitable parameter combinations for the product and timeframe;  

4. Add dynamic exit ideas to adjust positions based on market changes.

### Summary  

This strategy combines the 123 Reversal and STARC Bands strategies, utilizing both strategies’ advantages in judging trend reversals and direction. It can effectively reduce false signals and improve trading efficiency. It also optimizes problems existing in using either strategy alone. Through continuous optimization, this strategy can become a stable and reliable quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- STARC Bands ----|
|v_input_7|5|LengthMA|
|v_input_8|15|LengthATR|
|v_input_9|1.33|K|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-03 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/07/2021
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
// A type of technical indicator that is created by plotting two bands around 
// a short-term simple moving average (SMA) of an underlying asset's price. 
// The upper band is created by adding a value of the average true range 
// (ATR) - a popular indicator used by technical traders - to the moving average. 
// The lower band is created by subtracting a value of the ATR from the SMA.
// STARC is an acronym for Stoller Average Range Channels. The indicator is 
// named after its creator, Manning Stoller.
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


STARC(LengthMA,LengthATR,K) =>
    pos = 0.0
    xMA = sma(close, LengthMA)
    xATR = atr(LengthATR)
    xSTARCBandUp = xMA + xATR * K
    xSTARCBandDn = xMA - xATR * K
    pos := iff(close > xSTARCBandUp, 1,
             iff(close < xSTARCBandDn, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & STARC Bands", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- STARC Bands ----")
LengthMA = input(5, minval=1)
LengthATR = input(15, minval=1)
K = input(1.33, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSTARC = STARC(LengthMA,LengthATR,K)
pos = iff(posReversal123 == 1 and posSTARC == 1 , 1,
	   iff(posReversal123 == -1 and posSTARC == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434165

> Last Modified

2023-12-04 13:38:30
