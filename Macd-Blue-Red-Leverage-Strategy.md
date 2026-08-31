
> Name

Macd-Blue-Red-Leverage-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c0ae4107854222d0ea.png)

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
