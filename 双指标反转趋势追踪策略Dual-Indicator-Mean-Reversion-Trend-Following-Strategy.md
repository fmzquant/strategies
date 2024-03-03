
> Name

双指标反转趋势追踪策略Dual-Indicator-Mean-Reversion-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12285df40e668473675.png)
[trans]
### 概述

该策略通过结合移平均线指标和市场交易便利指数这两个指标的信号,在判断到价格反转的时候进行买入或卖出操作,属于反转类交易策略。

### 策略原理  

该策略使用了两个指标进行信号判断。第一个指标是移平均线指标,具体为随机指标的快线和慢线的组合。当价格连续两个日内下跌,同时快线高于慢线时产生卖出信号;当价格连续两个日内上涨,同时快线低于慢线时产生买入信号。这样通过判断价格反转和随机指标的快慢线位置关系,预测价格可能反转的时机。   

第二个指标是市场交易便利指数。该指数通过计算价格波动范围与成交量的关系,来判断市场的流动性和价格运行的效率。指数上升表明市场交易顺畅,运行效率高,可以判断为趋势行情;指数下降则表明市场流动性变差,运行效率降低,可能进入盘整震荡行情。   

本策略通过结合两个指标的判断逻辑,在双指标同时发出买入或卖出信号时,对应产生买入和卖出操作。

### 策略优势

- 通过双指标确认,可以提高信号准确率,避免假信号
- 反转指标和趋势判断指标的组合,可以在反转的同时判断大趋势,避免逆势操作  
- 无须频繁调参,降低了人为干预程度

### 风险及解决方法

- 如果行情进入长期单边上涨或下跌,将难以捕捉反转机会,无法进入场内
- 可以适当放宽反转指标的参数,增加买入和卖出的机会
- 也可以加大持仓规模,通过追踪趋势获取更多利润

- 反转信号可能出现误差,使策略失效  
- 可以通过优化指标参数或增加确认周期来减少假信号  

### 优化方向  

- 可以测试更多参数组合,寻找最佳指标参数
- 可以增加或变更反转指标,测试不同指标的反转效果
- 可以增加止损策略,控制单笔损失  
- 可以结合机器学习算法,利用大数据训练出更准确的反转模型

### 总结  

该策略结合了反转指标和趋势判断指标,在价格出现反转预警时进场,同时判断大趋势,避免逆势操作。通过双指标互证,可以有效减少假信号。但策略也存在行情单边行情时无获利机会和误判反转信号的风险。通过参数优化、止损策略、指标升级以及机器学习等方式还可进一步优化。

||

### Overview  

This strategy generates buy and sell signals by combining a moving average indicator and a market facilitation index. It belongs to the mean reversion trading strategy category.  

### Principles  

The strategy utilizes two indicators for signal generation. The first one is the moving average indicator, specifically the combination of fast line and slow line of Stochastic Oscillator. It produces sell signal when price closes down for two consecutive days and the fast line is above the slow line. It produces buy signal when price closes up for two consecutive days and the fast line is below the slow line. By monitoring price reversal and the relationship between fast line and slow line, it aims to predict potential turning points of the price trend.  

The second indicator is the market facilitation index. It measures the efficiency of price movement by calculating the relationship between price range and volume. When the index rises, it indicates improving market liquidity and higher operation efficiency, signaling a trending market. When the index declines, it shows worsening liquidity and decreasing efficiency, implying a potential sideways ranging market or trend reversal.  

This strategy generates actual buy and sell orders when both indicators issue concordant trading signals simultaneously.  

### Advantages  

- Improved signal accuracy by requiring confirmation from two indicators, avoiding false signals  
- Combination of mean reversion indicator and trend judging indicator helps avoiding trading against major trend 
- Reduced needs for frequent parameter tuning and less manual intervention 

### Risks and Solutions  

- Difficult to capitalize on reversal opportunities if prolonged one-way uptrend or downtrend, unable to enter the market
- Can relax parameters of mean reversion indicator to increase chances of capturing buy and sell signals
- Can also scale up position size to ride the trend to compensate profits

- Inaccurate reversal signals may invalidate the strategy 
- Can optimize parameters or add signal confirmation stages to filter out false signals   

### Enhancement Areas  

- Test more parameter combinations to find optimum settings  
- Explore more mean reversion indicators, evaluate performance of different indicators
- Introduce stop loss to constrain single trade loss 
- Incorporate machine learning models trained on big data to generate more accurate reversal signals  

### Summary   

This strategy combines a mean reversion indicator and a trend judging indicator, entering the market when reversal signal emerges while respecting the major trend direction. Using dual indicator confirmation effectively eliminates false signals. Although risks exist during prolonged one-side trends and erroneous reversal signals. Further optimizations can be done via parameter tuning, stop loss, indicator upgrades and machine learning models.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- MFI ----|
|v_input_7|6.2|SellZone|
|v_input_8|true|BuyZone|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 02/02/2021
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
// The Market Facilitation Index is an indicator that relates price range to 
// volume and measures the efficency of price movement. Use the indicator to 
// determine if the market is trending. If the Market Facilitation Index increased, 
// then the market is facilitating trade and is more efficient, implying that the 
// market is trending. If the Market Facilitation Index decreased, then the market 
// is becoming less efficient, which may indicate a trading range is developing that 
// may be a trend reversal.
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


MFI(BuyZone,SellZone) =>
    pos = 0.0
    xmyVol = volume
    xmyhigh = high
    xmylow = low
    nRes = (xmyhigh - xmylow) / xmyVol * 10000
    pos := iff(nRes > BuyZone, 1,
             iff(nRes < SellZone, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & Market Facilitation Index", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- MFI ----")
SellZone = input(6.2, minval=0.01, step = 0.01)
BuyZone = input(1, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMFI = MFI(BuyZone,SellZone)
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

https://www.fmz.com/strategy/440688

> Last Modified

2024-02-01 10:55:30
