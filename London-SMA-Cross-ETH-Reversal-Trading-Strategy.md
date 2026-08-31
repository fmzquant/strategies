
> Name

London-SMA-Cross-ETH-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ac3b422ff1ab0df349.png)
 

## Overview

The strategy is named "London Session SMA Cross ETH Reversal Trading Strategy". The main idea of this strategy is to utilize the high liquidity during the London session, combined with the golden cross and dead cross signals of the SMA lines, to conduct reversal trading on the mainstream digital currency trading pair ETH/USDT.  

## Strategy Principle

The core logic of this strategy is to first determine the trading hours of the London session, then calculate the SMA line of a certain cycle, and finally judge whether the price has golden cross or dead cross with the SMA during the London session. Specifically, the strategy first defines the start and end time of the London session, and then sets the length parameter of the SMA line to 50 periods. On this basis, the strategy uses the ta.sma() function to calculate the 50-period SMA line. Next, the strategy judges whether the current price is in the London session and within the backtesting time range. If these two conditions are met, use the ta.crossover() and ta.crossunder() functions to determine if the price and the SMA line have a golden cross or dead cross. When a golden cross occurs, go long; when a dead cross occurs, go short.  

The key advantage of this strategy is that it utilizes the high liquidity of the London session for trading, which can obtain better entry opportunities. At the same time, the golden cross and dead cross signals of the SMA line are classic and effective technical indicator signals. Therefore, this combination can filter false signals to a certain extent and improve the stability and profitability of the strategy.

## Advantages of the Strategy  

1. Utilize the high liquidity of the London session to obtain better entry opportunities  
2. The golden cross and dead cross of SMA lines are classic and effective technical indicator signals  
3. The combination use can improve signal quality and filter false signals
4. Adopt reversal trading method, suitable for short-term trading  
5. High capital utilization, profits can be amplified through leverage

## Risks and Solutions

The strategy also has some risks, mainly including:

1. Golden cross and dead cross signals may be frequently hit in a trending market  
2. Improper SMA period setting may generate too many false signals 
3. Reversal trading is prone to get trapped in range-bound markets  

The following methods can be used to control and resolve these risks:  

1. Incorporate trend indicators to avoid using during trend consolidation  
2. Optimize SMA parameters to find the best trading cycle  
3. Set stop loss to control single loss

## Optimization Directions 

The following aspects of the strategy can be optimized:

1. Other indicators can be introduced for combination, such as RSI, KD, etc., to form multi-indicator filtering rules to improve signal quality  
2. The cycle parameter of the SMA line can be optimized to find the best trading cycle  
3. Longer time cycle moving averages can be introduced based on the SMA to form multi-moving average cross combinations  
4. Optimize trading sessions to test which sessions perform best  
5. Introduce machine learning algorithms to train and filter signals

## Conclusion

In general, this strategy realizes a relatively simple and practical short-term reversal trading strategy through trading in high liquidity sessions and combining classic technical indicator of moving average crosses. The advantages of this strategy include high capital utilization, simple technical indicators and easy implementation. But there are also certain risks, the parameters, stop loss and trading sessions need to be tested and optimized in order to obtain better steady profitability.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|SMA Length|
|v_input_source_1_close|0|SMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-11 00:00:00
end: 2024-01-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("London SMA Strategy ", overlay=true)

// Define London session times
london_session_start_hour = 6
london_session_start_minute = 59
london_session_end_hour = 15
london_session_end_minute = 59

// Define SMA input parameters
sma_length = input.int(50, title="SMA Length")
sma_source = input.source(close, title="SMA Source")

// Calculate SMA
sma = ta.sma(sma_source, sma_length)

// Convert input values to timestamps
london_session_start_timestamp = timestamp(year, month, dayofmonth, london_session_start_hour, london_session_start_minute)
london_session_end_timestamp = timestamp(year, month, dayofmonth, london_session_end_hour, london_session_end_minute)

// Define backtesting time range
start_date = timestamp(2021, 1, 1, 0, 0)
end_date = timenow

// Filter for London session and backtesting time range
in_london_session = time >= london_session_start_timestamp and time <= london_session_end_timestamp
in_backtesting_range = time >= start_date and time <= end_date

// Long condition: Close price crosses above SMA during London session
long_condition = ta.crossover(close, sma)

// Short condition: Close price crosses below SMA during London session
short_condition = ta.crossunder(close, sma)

// Plot SMA for reference
plot(sma, title="SMA", color=color.blue)

// Strategy entries and exits
if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/439262

> Last Modified

2024-01-18 16:08:26
