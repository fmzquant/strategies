
> Name

动量反转短线交易策略-Momentum-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/139be9673b8ec283a53.png)


## Overview  

This is a very simple short-term trading strategy that is mainly suitable for index futures daily trading. It only goes long when the index is in a long-term uptrend channel and there is a short-term reversal signal.   

## Principles  

The strategy mainly uses moving averages and RSI indicators to determine trends and overbought/oversold conditions. The specific trading signals are: the index closing price rebounds from the long-term 200-day moving average and remains above it as the long-term trend judgment; the closing price breaks below the 10-day moving average as the short-term adjustment signal; RSI3 less than 30 as the oversold signal. When the above three conditions are met, it is believed that the probability of a short-term reversal is relatively large, so go long.

After taking a position, exits are based on stop loss, take profit and short-term trend judgments. If the closing price stands back above the 10-day MA, judging that the short-term adjustment has ended, take profit actively; if the closing price hits a new low, stop out with a loss; take profit when the closing price rises 10%.

## Advantage Analysis   

The strategy has the following advantages:

1. Simple logic, easy to understand and implement, suitable for beginners;  
2. Make full use of the long-term uptrend of the index to avoid trading against the trend;
3. Use the RSI indicator to determine the short-term reversal point to increase the profit probability;  
4. There are stop loss and take profit mechanisms to control risks;
5. Low data requirements, daily data is enough, suitable for zero-cost implementation.

## Risk Analysis   

The strategy also has some risks:   

1. Sustained declines in bear markets will lead to losses; 
2. Failed reversals can cause significant losses;
3. Improper parameter settings can also affect results, such as incorrect moving average periods;  
4. Trading frequency may be low, unable to capture all adjustments; 
5. Limited profit upside, not much higher than market index returns.

In response to the above risks, methods such as optimizing cycle parameters, adjusting stop-loss ratios, adding other indicator judgments, etc. can be used to improve the strategy.

## Optimization Directions

The strategy can be optimized in the following aspects:  

1. Increase multifactor judgments of long-term and short-term trends, such as MACD and KD to improve judgment accuracy;   
2. Add trading volume analysis, such as going long when trading volume surges;
3. Optimize parameter settings through Walk Forward Analysis and other methods to find the best parameters;
4. Combine more reversal factors,such as Fibonacci retracement levels, support and resistance levels to determine the reversal levels;
5. Comprehensively consider profit ratio optimization, such as adjusting positions and stop-loss ratios to achieve higher returns.  

## Summary  

In summary, this is a very simple and practical short-term trading strategy. It combines the long-term uptrend and short-term pullback reversal of the index to obtain excess returns while controlling risks. By continuously optimizing and parameter tuning, better results can be achieved.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|200|(?パラメータ)長期移動平均BASE200/period of long term sma|
|v_input_int_2|10|長期移動平均BASE10/period of short term sma|
|v_input_int_3|5|損切の割合％/stoploss percentages|
|v_input_int_4|20|利食いの割合％/take profit percentages|
|v_input_1|timestamp(01 Jan 2000 13:30 +0000)|(?期間)バックテストを始める日/start trade day|
|v_input_2|timestamp(1 Jan 2099 19:30 +0000)|バックテスを終わる日/finish date day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-11 00:00:00
end: 2024-01-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tsujimoto0403

//@version=5
strategy("simple pull back", overlay=true,default_qty_type=strategy.percent_of_equity,
     default_qty_value=100)

//input value 
malongperiod=input.int(200,"長期移動平均BASE200/period of long term sma",group = "パラメータ")
mashortperiod=input.int(10,"長期移動平均BASE10/period of short term sma",group = "パラメータ")
stoprate=input.int(5,title = "損切の割合％/stoploss percentages",group = "パラメータ")
profit=input.int(20,title = "利食いの割合％/take profit percentages",group = "パラメータ")
startday=input(title="バックテストを始める日/start trade day", defval=timestamp("01 Jan 2000 13:30 +0000"), group="期間")
endday=input(title="バックテスを終わる日/finish date day", defval=timestamp("1 Jan 2099 19:30 +0000"), group="期間")


//polt indicators that we use 
malong=ta.sma(close,malongperiod)
mashort=ta.sma(close,mashortperiod)

plot(malong,color=color.aqua,linewidth = 2)
plot(mashort,color=color.yellow,linewidth = 2)

//date range 
datefilter = true

//open conditions
if close>malong and close<mashort and strategy.position_size == 0 and datefilter and ta.rsi(close,3)<30 
    strategy.entry(id="long", direction=strategy.long)
    
//sell conditions 
strategy.exit(id="cut",from_entry="long",stop=(1-0.01*stoprate)*strategy.position_avg_price,limit=(1+0.01*profit)*strategy.position_avg_price)


if close>mashort and close<low[1] and strategy.position_size>0
    strategy.close(id ="long")
        



```

> Detail

https://www.fmz.com/strategy/439187

> Last Modified

2024-01-18 11:26:40
