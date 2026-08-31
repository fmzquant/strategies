
> Name

Quantitative-Trading-Strategy-Based-on-Double-EMA-and-Price-Volatility-Index

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/8251baa71aa5d47209.png)
 ## Overview  

This strategy is called "Moving Average Indicator and Price Volatility Combination Strategy". It combines the double exponential moving average (DEMA) and the price volatility index to generate a comprehensive trading signal.  

## Principle  

The strategy consists of two parts:  

1. DEMA indicator. This indicator calculates the 20-day and 2-day exponential moving averages. It generates trading signals when the price breaks through the 2-day line from above or breaks through the 20-day line from below.  

2. (Highest Price - Lowest Price)/Close Price Volatility Index. This index reflects the fluctuation range of prices within one period. Here we calculate the 16-day simple moving average of the volatility index over the past 20 bars. When the current bar's volatility is higher or lower than this average value, it generates trading signals.

The signals from the two parts are combined. If DEMA and volatility index give signals at the same time, the final long or short trading orders will be generated.

## Advantage Analysis 

The strategy has the following advantages:

1. Combining multiple indicators can reduce false signals and improve signal reliability.  

2. The 20-day line can effectively identify medium-to-long term trends, and the 2-day line can capture short-term fluctuations, making the combination adaptable to different market environments.

3. The volatility index can effectively reflect market volatility and trading opportunities.  

4. By adjusting parameters, it can adapt to different products and cycle markets.

## Risk Analysis   

The strategy also has some risks:

1. In low volatility trends, the volatility index may generate wrong signals. Filtering with other liquidity indicators may help.

2. In rapid one-way markets, double EMAs may lag. Shortening parameters appropriately or combining with other indicators may help.  

3. The increased complexity of multiple indicators also increases the risk of over-optimization. Comprehensive backtesting and parameter stability testing are required.

## Optimization Directions  

The strategy can also be optimized in the following aspects:  

1. Adding stop loss mechanisms can effectively control per order loss.

2. Optimize parameters for different products and cycles to improve adaptability. 

3. Increasing liquidity and volatility indicators to improve signal quality.  

4. Adding machine learning algorithms to achieve dynamic parameter and weight adjustment.

## Conclusion  

By combining double EMAs and volatility indexes, this strategy can achieve good trading performance in both trending and volatile markets. There are also certain risks that require further optimization and improvement. But overall, the strategy idea is clear and has practical value.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_1|20|(?●═════ H-L/C Histogram  ═════●)Look Back|
|v_input_2|false|% change|
|v_input_3|16|SMA Length|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_2|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_3|true|From Month|
|v_input_int_4|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-17 00:00:00
end: 2023-12-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/04/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
//  This histogram displays (high-low)/close
//  Can be applied to any time frame.
//
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos


HLCH(input_barsback,input_percentorprice,input_smalength) =>
    pos = 0.0
    xPrice = (high-low)/close
    xPriceHL = (high-low)
    xPrice1 = input_percentorprice ? xPrice * 100: xPriceHL
    xPrice1SMA = ta.sma(math.abs(xPrice1), input_smalength)
    pos := xPrice1SMA[input_barsback] > math.abs(xPrice1) ? 1 :
    	     xPrice1SMA[input_barsback] < math.abs(xPrice1) ? -1 : nz(pos[1], 0)
    pos

strategy(title='Combo 2/20 EMA & (H-L)/C Histogram', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════ (H-L)/C Histogram  ═════●'
input_barsback = input(20, title="Look Back", group=I2)
input_percentorprice = input(false, title="% change", group=I2)
input_smalength = input(16, title="SMA Length", group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)
StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosHLCH = HLCH(input_barsback,input_percentorprice,input_smalength)
iff_1 = posEMA20 == -1 and prePosHLCH == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosHLCH == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/435713

> Last Modified

2023-12-18 11:26:49
