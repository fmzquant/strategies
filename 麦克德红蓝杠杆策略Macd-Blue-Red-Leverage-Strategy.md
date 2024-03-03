
> Name

麦克德红蓝杠杆策略Macd-Blue-Red-Leverage-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c0ae4107854222d0ea.png)
 [trans]

## 概述

麦克德红蓝杠杆策略是一个利用麦克德指标判断趋势方向的量化交易策略。该策略通过计算快速移动平均线、慢速移动平均线和MACD信号线,结合麦克德组合指标判断未来价格走势,以此产生交易信号。

## 策略原理

该策略的核心指标是麦克德组合指标。麦克德指标由差离率(快速移动平均线与慢速移动平均线的差值)和信号线组成。当差离率上涨趋势加速时,代表着当前处于多头市场;当差离率下跌趋势加速时,代表着当前处于空头市场。

该策略运用麦克德指标判断大趋势方向的同时,结合 elder impulse系统判断specific entry 和 exit 时间。 elder impulse系统运用快慢均线和MACD的组合,绿色柱形代表着多头开始或加速,红色柱形代表着空头开始或加速,蓝色柱形代表着多空趋势变化的时间点。

根据这两个指标,我们可以确定 positional direction 和 tactical entries/exits。 若麦克德指标代表大的多头趋势,我们在 elder impulse系统Mint柱形出现时open long positions; 若麦克德指标代表大的空头趋势,我们在elder impulse系统红柱形出现时 open short positions。

## 策略优势

- 利用麦克德指标判断大趋势,提高盈利概率
  
  麦克德红蓝杠杆策略中,麦克德指标可有效反映市场供求关系和价格走势,利用双移动平均线的差值和差值的移动平均来判断大的走势。这为我们的entries提供了positional direction。
  
- Elder impulse系统提高entries精准度
  
  Elder impulse 系统综合运用均线差值、直方图和价格本身的信息,判断turning points。这为我们的战术entries提供了更精确的时机。
  
- 结合慢速均线作为止损点
  
  策略中采用慢速均线作为trailing stop loss,可根据趋势适当调整止损点。这有助于策略获取更大盈利,同时控制风险。
  

## 风险分析

- 趋势反转风险

  若市场发生较大方向性反转,麦克德指标判断错误的概率较大。必要时需适当调整参数或手动干预。

- 交易频率较高

  该策略交易频率较高,会产生更多交易成本。需评估盈亏比确保交易获得正收益。

- 止损风险

  止损过于宽松易造成较大亏损;止损过于严格易造成过频退出。需评估确保止损合理。
  

## 优化方向

- 参数优化

  可通过参数测试优化均线长度、信号线参数等,寻找最优参数组合。

- 结合其他指标

  可测试结合其他跳空、背离等指标识别转折点,提高 entries 效果。
  
- 增加自动止损机制

  可结合ATR动态止损或追踪止损,让止损更加智能化,有效控制风险。

## 总结

麦克德红蓝杠杆策略综合运用麦克德指标和Elder系统判断趋势方向和转折点。策略具有判断准确、entries精准、止损合理等优点。我们也需要防范可能的风险点,并继续优化该策略。总体来说,该策略值得进一步研究与应用。

||

## Overview  

The Macd Blue Red Leverage strategy is a quantitative trading strategy that utilizes the Macd indicator to determine the trend direction. This strategy calculates the fast moving average, slow moving average and MACD signal line, and uses the combination of Macd indicator to judge the future price movement, so as to generate trading signals.  

## Strategy Logic

The core indicator of this strategy is the combination of Macd indicator. The Macd indicator consists of the difference rate (the difference between fast and slow moving average) and signal line. When the uptrend of the difference rate accelerates, it represents a current bull market. When the downtrend of the difference rate accelerates, it represents a current bear market.

While this strategy uses the Macd indicator to determine the major trend direction, it also incorporates the Elder Impulse System to determine the specific entry and exit timing. The Elder Impulse System combines fast and slow moving averages and MACD to generate trade signals - green bars represent starting or accelerating uptrends, red bars represent starting or accelerating downtrends, and blue bars represent inflection points between uptrends and downtrends.  

With these two indicators, we can determine the positional direction and tactical entries/exits. For example, if the Macd indicator shows an major uptrend, we open long positions when the green bars appear in the Elder Impulse System. If the Macd indicator shows an major downtrend, we open short positions when the red bars appear in the Elder Impulse System.

## Advantages

- Using Macd to determine major trend improves profitability

  The Macd indicator in this strategy can effectively reflect the market supply-demand relationship and price movement. By leveraging the difference between two moving averages and the moving average of the difference, it helps determine the major trend. This provides the positional direction for our entries.   

- Elder Impulse System improves entry accuracy 
  
  The Elder Impulse System consolidates information of moving average difference, histogram, and price itself to determine turning points. This provides more precise timing for our tactical entries.
  
- Trailing stop loss based on slow MA 

  The strategy uses slow moving average as trailing stop loss, which can be adjusted according to the trend. This helps the strategy to acquire more profits while controlling risks.

## Risk Analysis  

- Trend reversal risk

  If a significant trend reversal occurs, the probability of Macd indicator judging incorrectly would be higher. Necessary parameter adjustment or manual intervention may be required.

- Higher trading frequency

  This strategy has a higher trading frequency, which leads to higher trading costs. The profit/loss ratio needs evaluation to ensure positive return of the trading.
  
- Stop loss risk

  A stop loss that is too loose may lead to higher losses, while a stop loss that is too tight may lead to premature exits. Reasonable stop loss needs evaluation.

## Improvement Areas

- Parameter optimization

  Parameters like moving average length, signal line parameters can be optimized to find the optimum combination.
  
- Incorporate other indicators

  Other indicators like gap or divergence can be tested to improve the accuracy of identifying inflection points and entries.
  
- Add automatic stop loss mechanism 

  Dynamic stop loss with ATR or trailing stop loss can be incorporated to make the stop loss more intelligent and effectively control risks.

## Summary  

The Macd Blue Red Leverage strategy integrates the Macd indicator and Elder Impulse System to determine trend direction and inflection points. This strategy has advantages like accurate judgement, precise entries, and reasonable stop loss. We also need to prevent possible risks, and continue to optimize this strategy. Overall speaking, this strategy deserves further research and application.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|useCustomResolution|
|v_input_2|D|customResolution|
|v_input_3|false|showColorBars|
|v_input_4|13|lengthEMA|
|v_input_5|12|fastLength|
|v_input_6|26|slowLength|
|v_input_7|9|signalLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-13 00:00:00
end: 2023-12-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Author: SudeepBisht
//@version=3
strategy("SB_Elder Impulse System", overlay=true)
useCustomResolution=input(false, type=bool)
customResolution=input("D")
source = request.security(syminfo.tickerid, useCustomResolution ? customResolution : timeframe.period, close)
showColorBars=input(false, type=bool)
lengthEMA = input(13)
fastLength = input(12, minval=1), slowLength=input(26,minval=1)
signalLength=input(9,minval=1)

calc_hist(source, fastLength, slowLength) =>
    fastMA = ema(source, fastLength)
    slowMA = ema(source, slowLength)
    macd = fastMA - slowMA
    signal = sma(macd, signalLength)
    macd - signal

get_color(emaSeries, macdHist) =>
    g_f = (emaSeries > emaSeries[1]) and (macdHist > macdHist[1])
    r_f = (emaSeries < emaSeries[1]) and (macdHist < macdHist[1])
    g_f ? green : r_f ? red : blue
    
b_color = get_color(ema(source, lengthEMA), calc_hist(source, fastLength, slowLength))    
//bgcolor(b_color, transp=0)
//barcolor(showColorBars ? b_color : na)

chk=b_color==green?1:b_color==red?-1:0


if (not na(chk))
    if(chk==1)
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
    if(chk==-1)
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")
    if(chk==0)
        strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/435982

> Last Modified

2023-12-20 15:51:37
