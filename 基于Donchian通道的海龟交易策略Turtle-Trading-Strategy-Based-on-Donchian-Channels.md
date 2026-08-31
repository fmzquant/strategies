
> Name

基于Donchian通道的海龟交易策略Turtle-Trading-Strategy-Based-on-Donchian-Channels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14635fc82214fdaede9.png)

## Overview  

The name of this strategy is “Turtle Trading Strategy Based on Donchian Channels”. It borrows the main idea from the famous “Turtle Trading Rules” and uses Donchian Channels to determine market trends, combined with moving averages for filtration, realizing a relatively simple trend following strategy.  

## Strategy Principle  

The main indicator for judgment of this strategy is Donchian Channel. The Donchian Channel consists of the fluctuating range of the highest and lowest prices in the N-day period. If the price breaks through the upper rail of the channel, it will be a long signal; if it breaks through the lower rail of the channel, it will be a short signal. This strategy uses fast Donchian Channel (10 days) to issue signals and slow Donchian Channel (20 days) to stop loss.

In addition, this strategy also introduces two moving average lines (50-day line and 125-day line) to filter signals. Only when the fast moving average line crosses above the slow moving average line, long positions will be traded; Only when the fast moving average line crosses below the slow moving average line, short positions will be traded. This can effectively filter out some false signals.  

The opening conditions of this strategy are: the price breaks through the upper rail of Donchian Channel, and the fast moving average line crosses above the slow moving average line. When both conditions are met, long positions will be opened; The price breaks through the lower rail of Donchian Channel, and the fast moving average line crosses below the slow moving average line, then open short positions. The closing conditions are when the price touches the opposite slow Donchian Channel boundaries.

## Advantage Analysis  

The advantages of this strategy are:

1. Using Donchian Channel to determine the trend direction, the backtest effect is better to successfully capture the big trend;  

2. Adding the filter of moving average can filter out some false signals and avoid losses;

3. The combination of fast and slow Donchain Channels and moving averages can balance the trading frequency and stop loss accuracy;  

4. The risk is well controlled with stop loss mechanism to control single loss.

## Risk Analysis   

Some risks of this strategy:  

1. In the shock market, there may be more small losing orders;

2. When trend reversal occurs, the filtering of moving averages will increase opening costs;  

3. In steep markets, stop loss may be chased.

Countermeasures and solutions:

1. Appropriately adjust parameters, shorten Donchian cycle, reduce moving average cycle to adapt to different markets.

2. Increase judgment on major trend to avoid building positions against major trend.   

## Optimization Directions

The strategy can be optimized in the following aspects:  

1. Increase the strength of breakthrough. For example, introduce volume, open positions only when the volume enlarges;

2. Increase the judgment of hot areas. Combine with support, pressure, bands, patterns and so on to avoid hot areas when opening positions;

3. Optimize stop loss strategies. Introduce tracking stop loss, volatility stop loss, time stop loss etc. to make stop loss smarter.

## Summary  

In general, this strategy is a very typical and simple trend following strategy. It realizes good backtest results by determining direction through Donchian Channel and filtering signals through moving averages. This strategy is suitable for investors who chase big trends, with good risk control and easy to implement in real trading. By optimizing some parameters and rules, the win rate and profitability can be further improved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|From Year|
|v_input_2|2100|To Year|
|v_input_3|true|From Month|
|v_input_4|12|To Month|
|v_input_5|21|From day|
|v_input_6|31|To day|
|v_input_7|20|ATR|
|v_input_8|true|Long|
|v_input_9|true|Short|
|v_input_10|true|Stop LOSS|
|v_input_11|20|Donchian_slow|
|v_input_12|10|Donchian_fast|
|v_input_13|125|Slow_EMA|
|v_input_14|50|Fast_EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// Coded by Vladkos
strategy("Donchian strategy with filter", overlay=true,default_qty_type = strategy.percent_of_equity, default_qty_value = 4,pyramiding=5)

fromyear = input(2017, defval = 2018, minval = 1800, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(21, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")
term = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59))
ATR=input(20,minval=1)
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
needstoploss= input(true,defval=true,title="Stop LOSS")
///////////ATR
tra=atr(ATR)


////////////Переменные
Donchian_slow=input(20,minval=1)
Donchian_fast=input(10,minval=1)
Slow_EMA=input(125,minval=1)
Fast_EMA=input(50,minval=1)

/////////// Медленный Дончан
lower = lowest(Donchian_slow)
upper = highest(Donchian_slow)
basis = avg(upper, lower)
plot(lower,color=blue)
plot(upper,color=blue)

/////////// быстрый Дончан
lowerF = lowest(Donchian_fast)
upperF = highest(Donchian_fast)
basisF = avg(upperF, lowerF)
plot(lowerF,color=red)
plot(upperF,color=red)

////////// Скользящие средние
ema_S=ema(close,Slow_EMA)
ema_F=ema(close,Fast_EMA)
plot(ema_S,color=red)
plot(ema_F,color=green)

///////// Условия сделок
long_condition= close>=upper[1] and ema_F>ema_S  
long_exit= close<lowerF[1]

short_condition=close<=lower[1] and ema_F<ema_S
short_exit=close>upperF[1]

////////// Отправка ордеров
strategy.entry("Long",strategy.long,when=long_condition and term and needlong==true)
strategy.exit("stop loss","Long",stop=strategy.position_avg_price-(tra*2),when= (needstoploss==true))
strategy.close("Long",when=long_exit and (time < timestamp(toyear, tomonth, today, 23, 59)))
    
strategy.entry("Short",strategy.short,when=short_condition and term and (needshort==true))
strategy.exit("stoploss","Short",stop=strategy.position_avg_price+(tra*2),when= (needstoploss==true))
strategy.close("Short",when=short_exit and (time < timestamp(toyear, tomonth, today, 23, 59)))

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()





```

> Detail

https://www.fmz.com/strategy/436476

> Last Modified

2023-12-25 10:57:52
