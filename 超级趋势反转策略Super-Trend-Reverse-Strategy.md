
> Name

超级趋势反转策略Super-Trend-Reverse-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14489420dd56ced3993.png)

### Overview

The Super Trend reverse strategy is a reversal trading strategy that combines the Super Trend indicator and the RSI indicator. This strategy uses the Super Trend to determine the direction of the market trend, and then identifies reversal opportunities in combination with the RSI indicator to make transactions at trend reversal points.

### Strategy Principle  

The Super Trend reverse strategy consists of two main parts:

1. Super Trend indicator to judge market trend

    The Super Trend indicator calculates the price band based on the current price and the average true range over a certain period to determine the trend direction. When the price breaks through the upper rail, it is bullish; when the price breaks through the lower rail, it is bearish.
    
2. RSI indicator to identify reversals

    The RSI indicator judges whether it is currently overbought or oversold by comparing the number of up days and down days over a period of time. Combined with the Super Trend indicator, it can detect opportunities for trend reversal.
    
    In this strategy, by certain transformations, we get the processed RSI curve and set threshold lines. When the RSI curve breaks through the corresponding threshold, buy and sell signals are generated.

### Advantage Analysis

The Super Trend reverse strategy combines trend and reversal indicators to comprehensively consider the trend strength and overbought/oversold phenomena, so that it can open and close positions at relatively good locations to obtain better strategy returns.

The main advantages are:

1. Combining trend and reversal, trading at reversal points
2. Controllable drawdown, better risk control 
3. Large parameter optimization space, adjustable based on market

### Risk Analysis  

The Super Trend reverse strategy also has some risks, mainly including:

1. Reversal failure risk

    Reversal signals may be false signals and fail to reverse successfully, which may increase losses.

2. Parameter optimization risk

    Improper parameter optimization may cause overfitting of the strategy and inability to adapt to market changes.

3. Technical indicator lag

    All technical indicators have lags, possibly missing the best entry position.
    
To address these risks, we can further optimize and improve through combining other indicators, adjusting parameter optimization methods, etc.

### Optimization Directions

The Super Trend reverse strategy can be optimized in the following dimensions according to market and needs:

1. Optimize Super Trend parameters to adapt to different markets
2. Optimize or improve RSI reversal trigger logic
3. Add stop loss strategy to control single loss
4. Combine other indicators to determine reversal reliability 
5. Add trading volume indicator to avoid false breakouts

### Summary

The Super Trend reverse strategy combines the advantages of trend trading and reversal trading, allowing to go with the trend while opening positions at reversal points. By continuously testing and optimizing parameters and appropriately controlling risks, this strategy can obtain stable strategy returns. Its optimization space is also very large, adjustable based on actual market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Factor|
|v_input_2|14|RSI Main Period|
|v_input_3|5|RSI Smooth Period|
|v_input_4|2018|yearfrom|
|v_input_5|2039|yearuntil|
|v_input_6|6|monthfrom|
|v_input_7|12|monthuntil|
|v_input_8|true|dayfrom|
|v_input_9|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-21 00:00:00
end: 2023-12-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy(title = "Super-Trend-reverse Strategy", overlay = true)

// Super Trend Strategy
Factor=input(2,type =float, minval=1,maxval = 100)
Pd=10 //input(10,minval=1,maxval = 100)

// ST1

UP=hlc3-(Factor*atr(Pd))

DOWN=hlc3+(Factor*atr(Pd))

// ST1.2

TrendUp=na
TrendUp:=close[1]>TrendUp[1]? max(UP,TrendUp[1]) : UP

TrendDown=na
TrendDown:=close[1]<TrendDown[1]? min(DOWN,TrendDown[1]) : UP


Trend = na
Tsl = na


Trend := close[1] > TrendDown[1] ? 1: close[1] < TrendUp[1]? -1: nz(Trend[1],1)
Tsl := Trend==1 ? TrendUp: TrendDown


/////////////// Functions for Reverse //////////////////////////////

IF(input) => (exp(2*input)-1) / (exp(2*input)+1)

//////////////////////// RSI REVERSE /////////////////////

RSI_main = input(14, title="RSI Main Period")
RSI_smooth = input(5, title="RSI Smooth Period")

//Functions
RVS(input) => (exp(2*input)-1) / (exp(2*input)+1)

//RSI Calculation
raw_RSI=0.1*(rsi(close,RSI_main)-50)
wma_RSI=wma(raw_RSI,RSI_smooth)
RVS_RSI = RVS(wma_RSI)


threshold1 = RVS_RSI < 0.8? 1 : 0
threshold2 = -0.8




RSIbuy = (RVS_RSI<threshold2)
RSIsell = (RVS_RSI > threshold1)



////////////////////// RSI REVERSE ///////////////////////

// Conditions



longCond = na
shortCond = na
longCond :=  RSIbuy and crossover(close, Tsl)  
shortCond :=  RSIsell and crossunder(close, Tsl) 


yearfrom = input(2018)
yearuntil =input(2039)
monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  longCond  and   year >= yearfrom and year <= yearuntil and month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",  comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( shortCond and  year >= yearfrom and year <= yearuntil and month>=monthfrom and month <=monthuntil and dayofmonth>=dayfrom and dayofmonth < dayuntil ) 

    strategy.close("BUY")






```

> Detail

https://www.fmz.com/strategy/436880

> Last Modified

2023-12-28 15:50:35
