
> Name

Bitcoin-Trading-Strategy-Based-on-Chinese-Zodiac-Calendar

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12ecc3c9901faecad3a.png)

### Overview

This strategy combines the 12 Chinese Zodiac animals' cycle in the traditional Chinese lunar calendar to generate three key signals: Bullish, Bearish and Sitting on the Fence. These signals offer Bitcoin traders a unique perspective on market conditions: 

Bullish signal indicates a potential uptrend in Bitcoin market, suggesting opportunities for long positions.  

Bearish signal warns of a potential downturn, advising caution or considering short positions.   

Sitting on the fence signal recommends a neutral stance, ideal for times of uncertainty.

This strategy exclusively targets Bitcoin traders, harnessing the power of Chinese Zodiac to inform BTC trading decisions. Explore this innovative approach to unlock new insights for your Bitcoin trading journey.

### Strategy Logic  

The core logic of this strategy calculates the remainder of the K-line year divided by 12 to determine which Chinese zodiac year the bar is located in. According to historical data, years of Rat, Ox, Tiger, Rabbit, Dragon and Snake have seen Bitcoin market in upward trends; while years of Horse, Goat, Monkey, Rooster, Dog and Pig have seen downward trends. Therefore, the strategy gives out different trading signals based on the calculated remainder.

When the remainder of the year is 0, 1, 4, 5, 8, or 9, they are zodiac years with upward trends. The strategy will display a "Bullish" signal and suggest taking long positions to profit from Bitcoin market rises.   

When the remainder is 2, 6 or 10, they are zodiac years with downward trends. The strategy will display a "Bearish" signal and suggest taking short positions to profit from drops in Bitcoin market.

When the remainder is 3, 7 or 11, they are uncertain zodiac years. The strategy will display a "Sitting on the Fence" signal and suggest refraining from opening positions blindly to avoid unnecessary losses.

### Advantage Analysis 

The biggest advantage of this strategy is that it provides a completely different perspective from technical analysis or fundamental analysis. The Chinese zodiac culture has a long history and incorporates ancient Chinese wisdom on market and economic cycles. The identification of zodiac years relies on pattern recognition of historical cycles instead of rigid formulas. This offers valuable references for Bitcoin trading decisions.  

This trading strategy features simplicity, low code volume, minimal resource consumption and wide applicability to different trading systems. It requires no complex calculation or parameter optimization, lowering the difficulty of implementation for more traders to utilize it.  

### Risk Analysis

The biggest risk is that the accuracy of zodiac year judgment cannot be strictly verified or quantified. The historical wisdom contained in the Chinese zodiac culture is hard to prove with data. Therefore, it should be used prudently as reference, not as the sole reliance for trading decisions.  

Another risk is that while zodiac years have higher upward probability in general, occasional reversals may still occur in individual years. This requires traders to incorporate more information for sound judgment, not just rely on one trading signal.  

Over-reliance on the trading signals can also easily lead to herding effect, incurring huge systemic risks. Adequate attention should be given to this aspect.

### Optimization Directions 

There are two main directions to optimize this strategy:

First, enrich the zodiac year judgment rules. More Chinese classical theories like Yin Yang five elements, San Qi Liu Xiong can be integrated to form a more well-rounded assessment of zodiac years that better aligns with Chinese cultural traditions.   

Second, combine with other factors or models. Relying solely on zodiac years has its limitations in ensuring accurate decisions. The strategy should be used together with technical indicators, economic environment evaluation models etc to create a more robust system and reduce errors.   

### Conclusion

The Bitcoin trading strategy based on Chinese zodiac calendar pioneers an innovative strategic perspective. It provides valuable references for trading decisions by enabling traders to break out of the frameworks of technical and fundamental analysis, to examine the market from a higher dimension. But its limitations should also be acknowledged to avoid risks associated with over-reliance. Only as one important reference factor instead of the sole basis for decisions, and only when used in combination with other models and indicators, can the zodiac calendar produce its maximum utility.





> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2022-12-31 05:20:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Chinese Zodiac Calendar Strategy", shorttitle="CZC Strategy", overlay=true)

// Calculate digit of year for each bar
yearDigit = year % 12

// Define trading conditions based on the year's digit
isBullYear = yearDigit == 0 or yearDigit == 1 or yearDigit == 4 or yearDigit == 5 or yearDigit == 8 or yearDigit == 9
isBearYear = yearDigit == 2 or yearDigit == 6 or yearDigit == 10
isFlatYear = yearDigit == 3 or yearDigit == 7 or yearDigit == 11

// Set the label color based on trading conditions
labelColor = isBullYear ? color.green : (isBearYear ? color.red : color.yellow)

// Set the text for the trading label based on trading conditions
tradingConditionText = isBullYear ? 'Bull' : (isBearYear ? 'Bear' : 'Flat')

// Set the background color based on trading conditions
bgcolor(isBullYear ? color.new(color.green, 90) : na)
bgcolor(isBearYear ? color.new(color.red, 90) : na)
bgcolor(isFlatYear ? color.new(color.yellow, 90) : na)

// Place or close orders based on trading conditions and create labels
if (isBullYear)
//    label.new(bar_index, low, text=tradingConditionText, color=color.green, xloc=xloc.bar_index, yloc=yloc.belowbar, style=label.style_label_up, size=size.small)
    strategy.entry("Bull", strategy.long)
    strategy.close("Bear")

if (isBearYear)
//    label.new(bar_index, high, text=tradingConditionText, color=color.red, xloc=xloc.bar_index, yloc=yloc.abovebar, style=label.style_label_down, size=size.small)
    strategy.entry("Bear", strategy.short)
    strategy.close("Bull")

if (isFlatYear)
//    label.new(bar_index, high, text=tradingConditionText, color=color.yellow, xloc=xloc.bar_index, yloc=yloc.abovebar, style=label.style_label_center, size=size.small)
    strategy.close("Bull")
    strategy.close("Bear")
```

> Detail

https://www.fmz.com/strategy/432784

> Last Modified

2023-11-21 14:50:26
