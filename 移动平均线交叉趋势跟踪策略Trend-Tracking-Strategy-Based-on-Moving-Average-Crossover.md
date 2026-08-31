
> Name

移动平均线交叉趋势跟踪策略Trend-Tracking-Strategy-Based-on-Moving-Average-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13e1811ad82bbdcccfe.png)

## Overview  

This strategy calculates EMA lines of different cycles to determine their crossover situation and uses the RSI indicator to judge the market trend, so as to implement trend tracking trading. The core idea is: generating buy signals when the short-term EMA line crosses over the longer-cycle EMA line from the bottom; generating sell signals when the short-term EMA crosses below the longer-cycle EMA line. By using such EMA crossover signals, the strategy tracks the market trend.

## Strategy Principle

This strategy mainly utilizes the fast and slow properties of EMA and calculates 5 EMA lines of different cycles, including 9-day, 21-day, 51-day, 100-day and 200-day line. The short-cycle EMA line can respond to price changes faster, while longer-cycle EMA lines are relatively insensitive to noise and can reflect market trend.

When the short-cycle EMA line crosses over the longer-cycle EMA line from the bottom, it indicates the price starts rising and triggers the buy signal. When the short-cycle EMA crosses below the longer-cycle EMA, it indicates the price starts declining and triggers the sell signal. Therefore, by judging the crossover situations of EMA lines, we can determine the uptrend or downtrend of the market.

In addition, this strategy also introduces the RSI indicator for auxiliary judgement. Buy signals will only be triggered when RSI is greater than 65, and sell signals only when RSI is less than 40. This helps filter out some wrong signals and avoid being misguided by huge price swings.

## Advantages  

The biggest advantage of this strategy is that it can effectively track the market trend. By utilizing the fast and slow properties of EMA to set up multiple groups of EMA lines and judging their crossover situations, it can capture the mid-long term trend of the market. This kind of trend tracking strategy has a relatively high winning rate and suits long-term holding.

In addition, this strategy also introduces the RSI indicator for assistance judgement, which can effectively filter out noise and avoid being misguided by short-term market fluctuations, thus improving the reliability of trading signals. The RSI parameter is set to 14 so that it can capture relatively significant overbought/oversold situations.

In conclusion, this strategy combines the strengths of moving average trend tracking and RSI overbought/oversold judgement. It can not only capture market trends but also filter out wrong signals effectively, making itself a trend tracking strategy with relatively high reliability.

## Risks

The biggest risk of this strategy is there will be some lag. EMA itself has some lagging attribute when responding to price changes, especially longer-cycle EMA. This means the generation of buy and sell signals will be delayed. In case of sharp price reversion, huge floating loss may occur.  

Also, when the market is fluctuating within range, crossover signals between EMA lines will occur frequently. The RSI parameter of 14 may filter out too many signals, leading to missing trading opportunities.

To reduce the risks above, we may shorten the period of longer-cycle EMA appropriately and loosen the overbought/oversold threshold of RSI to make the signal more sensitive. Of course this exposes to higher false signal risks. Adjustments on parameters need to be made based on real market situations to find the optimal balance point.

## Optimization Directions

This strategy can be optimized from the following aspects:

1. Optimize EMA period parameters. Trying more combinations of EMA periods to find the best signal sensitivity and reliability. 

2. Optimize RSI parameters. Properly enlarge the overbought/oversold range to trigger signals more frequently or narrow it down to reduce false signals.

3. Add stop loss mechanisms such as moving stop loss or pending orders to lock in profit and reduce loss risk.

4. Incorporate other indicators like KDJ, MACD to improve signal reliability.

5. Optimize position management dynamically based on market volatility.

## Conclusion

This strategy calculates multiple groups of EMA lines to determine crossover situations combined with RSI indicator to effectively capture and track market trends. By integrating the ideas of trend tracking and overbought/oversold judgement, it can capture mid-long term trends with effective false signal filtering. After parameter optimization and strategy integration, it can form a steady and efficient quantitative trading system, representing a typical case of moving average strategies and indicator fusion strategies.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Ravikant_sharma

//@version=5

strategy('new', overlay=true)

start = timestamp(1990, 1, 1, 0, 0)
end = timestamp(2023, 12, 12, 23, 59)
ema0 = ta.ema(close, 9)
ema1 = ta.ema(close, 21)
ema2 = ta.ema(close, 51)
ema3 = ta.ema(close, 100)
ema4 = ta.ema(close, 200)

rsi2=ta.rsi(ta.sma(close,14),14)
plot(ema0, '9', color.new(color.green, 0))
plot(ema1, '21', color.new(color.black, 0))
plot(ema2, '51', color.new(color.red, 0))
plot(ema3, '200', color.new(color.blue, 0))   

//plot(ema4, '100', color.new(color.gray, 0)) 


//LongEntry = (  ta.crossover(ema0,ema3)  or  ta.crossover(ema0,ema2) or  ta.crossunder(ema2,ema3) ) // ta.crossover(ema0,ema1) //
LongEntry=false
if ta.crossover(ema0,ema1) 
    if rsi2>65
        LongEntry:=true
if ta.crossover(ema1,ema2)
    if rsi2>65
        LongEntry:=true
        
LongExit =  ta.crossunder(ema0,ema2) or close >(strategy.position_avg_price*1.25) or rsi2 <40 or close < (strategy.position_avg_price*0.98)



if true
    if(LongEntry and rsi2>60)
        strategy.entry('Long', strategy.long, 1)
    if(LongExit)
        strategy.close('Long') 


```

> Detail

https://www.fmz.com/strategy/441152

> Last Modified

2024-02-06 11:37:23
