
> Name

自适应三重超级趋势策略Adaptive-Triple-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/173bb9ea90d80c37f90.png)

## Overview  

The Adaptive Triple Supertrend Strategy is a trend-following trading approach that harnesses the power of three Supertrend indicators to identify potential market trends and capitalize on them. With a focus on adaptability and precision, this strategy aims to provide traders with clear entry and exit signals while managing risk effectively. By combining multiple Supertrend indicators with defined parameters, the strategy seeks to capture trends across various market conditions, making it a versatile tool for traders seeking profitable opportunities in both traditional and cryptocurrency markets.

## Strategy Logic  

The core idea behind the Adaptive Triple Supertrend Strategy is to combine multiple Supertrend indicators to identify market trends, go long when the trends agree, and exit positions when trends reverse.   

Specifically, the strategy utilizes three Supertrend indicators:  

1. Supertrend 1: ATR Period = 12, Factor = 3
2. Supertrend 2: ATR Period = 10, Factor = 1  
3. Supertrend 3: ATR Period = 11, Factor = 2

When all three Supertrend indicators simultaneously show a bullish (green) signal, the strategy will open a long position within a defined date range (Jan 1, 2023 to Oct 1, 2023). When any one of the Supertrend indicators shows a bearish (red) signal, the strategy will exit the long position. In addition, the strategy sets a 10% take profit and 1% stop loss to lock in profits and manage risk.

So the specific trade logic is:  

1. Open long when all three Supertrends show bullish signals within the date range   
2. Monitor Supertrends for reversal signals while in a long position
3. Exit long if any Supertrend turns bearish  
4. Take profit at 10% or stop loss at 1%  

This logic aims to capture profits from bull trends within the date range while controlling downside risk with the stop loss.  

## Advantage Analysis   

The Adaptive Triple Supertrend Strategy has several key advantages:

1. Combining multiple Supertrends gives more accurate trend judgement and reduces false signals  
2. Supertrend itself filters noise, reducing oscillation impacts   
3. Parameters can be tuned to adapt to different market environments  
4. Take profit and stop loss settings lock in profits and cut losses when trends reverse  
5. Can capture outsized gains in bull markets and avoid huge drawdowns in bear markets

In summary, this strategy works excellently as a core trend following strategy to assist manual trading. By providing high quality trade signals to profit from major trends while controlling risk, it is an important tool for quantitative trading.  

## Risk Analysis  

Despite its many strengths, the Adaptive Triple Supertrend Strategy has some key risks to note:  

1. Huge market swings can cause wrong signals  
2. Poor parameter tuning impacts performance   
3. Small stop loss may fail to control risk  
4. Bad long entry timing can lead to losses  

These risks can be mitigated by:

1. Adding other indicators to judge oscillations   
2. Optimizing parameters for different markets
3. Increasing stop loss percentage to ensure effectiveness  
4. Using more stable indicators for entry signals  

## Enhancement Opportunities

As a versatile trend following strategy, the Adaptive Triple Supertrend has much room for enhancement:  

1. Dynamic optimization of Supertrend parameters   
2. Adding other indicators to improve entry timing   
3. Further optimizing take profit and stop loss based on backtests
4. Trying breakout for entry with Supertrend for trend direction  
5. Packaging strategy as function for easy plug-and-play
  
With these optimizations, the strategy can maintain steady performance across more market environments and achieve higher profit factors. This presents exciting research directions going forwards.  

## Conclusion  

The Adaptive Triple Supertrend Strategy is a valuable quantitative strategy. By combining multiple Supertrend indicators to determine trends and setting take profit/stop loss to control risk, it aims to steadily track major trends for outsized gains. Despite some risks, these can be alleviated via parameter optimization and auxiliary indicators. The strategy can be used standalone or combined with others. It also has significant enhancement potential for even better performance. As such, this is a quality strategy worth continual research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|3|Factor 1|
|v_input_1|12|ATR Length 1|
|v_input_float_2|true|Factor 2|
|v_input_2|10|ATR Length 2|
|v_input_float_3|2|Factor 3|
|v_input_3|11|ATR Length 3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-25 00:00:00
end: 2024-01-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom Supertrend Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=15, shorttitle="Supertrend Strategy")

// Define the parameters for Supertrend 1
factor1 = input.float(3.0, "Factor 1", step = 0.01)
atrPeriod1 = input(12, "ATR Length 1")

// Define the parameters for Supertrend 2
factor2 = input.float(1.0, "Factor 2", step = 0.01)
atrPeriod2 = input(10, "ATR Length 2")

// Define the parameters for Supertrend 3
factor3 = input.float(2.0, "Factor 3", step = 0.01)
atrPeriod3 = input(11, "ATR Length 3")

[_, direction1] = ta.supertrend(factor1, atrPeriod1)
[_, direction2] = ta.supertrend(factor2, atrPeriod2)
[_, direction3] = ta.supertrend(factor3, atrPeriod3)

// Define the start and end dates as Unix timestamps (in seconds)
start_date = timestamp("2023-01-01T00:00:00")
end_date = timestamp("2023-10-01T00:00:00")

// Determine Buy and Sell conditions within the specified date range
in_date_range = true
buy_condition = direction1 > 0 and direction2 > 0 and direction3 > 0 and in_date_range
sell_condition = direction1 < 0 or direction2 < 0 or direction3 < 0

// Track the position with a variable
var isLong = false

if buy_condition and not isLong
    strategy.entry("Long Entry", strategy.long)
    isLong := true

if sell_condition and isLong
    // Define take profit and stop loss percentages
    take_profit_percentage = 10 // Increased to 10%
    stop_loss_percentage = 1

    // Calculate take profit and stop loss levels
    take_profit_level = close * (1 + take_profit_percentage / 100)
    stop_loss_level = close * (1 - stop_loss_percentage / 100)

    // Exit the long position with take profit and stop loss
    strategy.exit("Take Profit/Stop Loss", from_entry="Long Entry", limit=take_profit_level, stop=stop_loss_level)
    isLong := false
```

> Detail

https://www.fmz.com/strategy/440109

> Last Modified

2024-01-26 16:33:37
