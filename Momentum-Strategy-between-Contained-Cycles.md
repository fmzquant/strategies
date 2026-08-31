
> Name

Momentum-Strategy-between-Contained-Cycles

> Author

ChaoZhang

> Strategy Description


### Overview

The core idea of this strategy is to determine the trend direction using the "contained between cycles" candlestick pattern and use it as the entry signal. When a contained between cycles pattern appears that contains the previous candlestick, we can infer that this is a point where the trend is reversing, at which point we can go long on a breakout above the previous high or go short on a breakout below the previous low, with proper stop loss and take profit setup.

### Strategy Logic

1. Check if the contained between cycles pattern occurs. The specific logic is: the current candle's high is lower than the previous candle's high, and the current candle's low is higher than the previous candle's low.

2. Determine if the previous candle was bullish or bearish. If the close was higher than the open, it was bullish. If the close was lower than the open, it was bearish.

3. If the previous candle was bullish and the contained pattern occurs, place a buy stop order at the previous candle's high plus 10% of its range. 

4. If the previous candle was bearish and the contained pattern occurs, place a sell stop order at the previous candle's low minus 10% of its range.

5. Once the stop order is triggered and position is opened, set the stop loss and take profit. The stop loss and take profit distances are a certain percentage of the previous candle's range.

6. If another inside bar pattern forms, close existing positions first and then place new pending orders.

### Advantage Analysis

The advantages of this strategy include:

1. It utilizes the inherent logic of candlesticks and provides an accurate entry timing. The contained pattern often implies upcoming trend reversal or acceleration.

2. The rules are simple and easy to follow for actual trading.

3. The stop loss and take profit based on previous candle's range helps control risk.

4. New pending orders are placed each time a qualified pattern appears, allowing us to follow the new trend.

### Risk Analysis

There are also some risks:

1. The contained pattern does not always result in trend reversal or acceleration. There are some false signals.

2. The stop loss distance may be too small to withstand large fluctuations in the market.

3. The take profit target may be too wide, preventing timely profits.

4. The strategy relies more on trending markets. The profit potential is limited during consolidation.

5. The high trading frequency leads to large transaction costs.

Solutions:

1. Add other indicators to confirm the signals and reduce false signals.

2. Widen the stop loss slightly but not more than 50% of the previous candle's range.

3. Shorten the take profit target to around 50% of the previous candle's range.

4. Optimize capital management, reduce individual position size for ranging markets.

5. Loosen the entry criteria to reduce trading frequency.

### Optimization Directions

Some ways to optimize the strategy:

1. Add a trend indicator like MACD to determine trend direction, avoiding whipsaws during consolidation.

2. Use more advanced stop loss techniques like trailing stop or profit protection stop loss.

3. Test different stop loss and take profit ratios to find the optimal parameters.

4. Add re-entry logic to capture the trend again after stop loss.

5. Optimize the position sizing based on market volatility. 

6. Optimize capital management, such as fixed fractional position sizing.

7. Test the strategy on different products and timeframes.

### Conclusion

In summary, this is a strategy that uses the contained between cycles pattern to determine trend turning points and place pending orders to capture trend reversals. It has the advantages of clear entry signals, simple rules, and controllable risks, but also has some false signal risks and room for optimization. We can further improve its stability and profitability by combining trend filters, optimizing stops, adjusting position sizes etc. It is more suitable for trending markets, and needs to be optimized and tested for different market conditions before actual usage to maximize its effectiveness.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|From Year|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|9999|To Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|10|Stop Buy Order Percentage From Previous Candle's Range|
|v_input_8|20|Stop Loss Distance from High/Low of Previous Candle|
|v_input_9|80|Take Profit Distance from High/Low of Previous Candle|
|v_input_10|2|Percentage Of EQUITY to risk per trade|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

// Inside Bar Momentum Strategy
// As defined on Babypips.com
// https://www.babypips.com/trading/forex-inside-bar-20170113

// strategy("Babypips: Inside Bar Momentum Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=5)

From_Year  = input(defval = 2018, title = "From Year")
From_Month = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
From_Day   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
To_Year    = input(defval = 9999, title = "To Year")
To_Month   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
To_Day     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
Start  = timestamp(From_Year, From_Month, From_Day, 00, 00)  // backtest start window
Finish = timestamp(To_Year, To_Month, To_Day, 23, 59)        // backtest finish window
Window = true

Stop_Buy_Perc  = input(10, "Stop Buy Order Percentage From Previous Candle's Range")/100
Stop_Loss_Perc = input(20, "Stop Loss Distance from High/Low of Previous Candle")/100
Take_Prof_Perc = input(80, "Take Profit Distance from High/Low of Previous Candle")/100

Risk = input(2, "Percentage Of EQUITY to risk per trade", step=0.1, minval=0, maxval=100)/100

Inside_Bar = high[1] > high[0] and low[1] < low[0]
Prev_Range = high[1] - low[1]
Bullish = open[1] < close[1]
Bearish = open[1] > close[1]

// Get Key Levels 
Long_Stop_Buy_Level   = high[1] + (Prev_Range * Stop_Buy_Perc)
Short_Stop_Buy_Level  = low[1]  - (Prev_Range * Stop_Buy_Perc)
Long_Stop_Loss_Level  = high[1] - (Prev_Range * Stop_Loss_Perc)
Short_Stop_Loss_Level = low[1]  + (Prev_Range * Stop_Loss_Perc)
Long_Take_Prof_Level  = high[1] + (Prev_Range * Take_Prof_Perc)
Short_Take_Prof_Level = low[1]  - (Prev_Range * Take_Prof_Perc)

// Position Sizing
long_qty = floor((strategy.equity * Risk) / (Long_Stop_Buy_Level - Long_Stop_Loss_Level))
short_qty = floor((strategy.equity * Risk) / (Short_Stop_Loss_Level - Short_Stop_Buy_Level))

// -------------------------- LONG CONDITIONS --------------------------------//
// The first candlestick must be bullish (green or white) and if the second 
// candlestick is completely contained by the first, set a buy stop order at 
// the first candle’s high plus 10% of its range (high minus low).

// Place the stop loss at the first candle’s high minus 20% of its range 
// and set the target at the first candle’s high plus 80% of its range

// If another inside bar pattern forms, the current position should be closed 
// or the pending buy/sell order must be canceled and entry orders must be 
// updated to the latest candles.

Long_Condition = Window and Inside_Bar and Bullish
if (Long_Condition)
    // Incase we still have a buy stop order in the market
    strategy.cancel_all()
    // Close any existing positions according to the rules
    strategy.close_all()
    strategy.entry("Bullish IB", strategy.long, stop=Long_Stop_Buy_Level)
    strategy.exit("Bullish Exit","Bullish IB", stop=Long_Stop_Loss_Level, limit=Long_Take_Prof_Level)
    
// -------------------------- SHORT CONDITIONS -------------------------------//
// The first candlestick must be bearish (red or black) and if the second 
// candlestick is completely contained by the first, set a sell stop order at 
// the first candle’s low minus 10% of its range (high minus low).

// Place the stop loss at the first candle’s low plus 20% of its range and 
// set the target at the first candle’s low minus 80% of its range.

// If another inside bar pattern forms, the current position should be closed 
// or the pending buy/sell order must be canceled and entry orders must be 
// updated to the latest candles.

Short_Condition = Window and Inside_Bar and Bearish
if (Short_Condition)
    // Incase we still have a buy stop order in the market
    strategy.cancel_all()
    // Close any existing positions according to the rules
    strategy.close_all()
    strategy.entry("Bearish IB", strategy.short, stop=Short_Stop_Buy_Level)
    strategy.exit("Bearish Exit","Bearish IB", stop=Short_Stop_Loss_Level, limit=Short_Take_Prof_Level)
    
// ----------------------------- PLOTTING ------------------------------------//
plotshape(Inside_Bar, style=shape.arrowdown, location=location.abovebar, color=purple)

```

> Detail

https://www.fmz.com/strategy/427378

> Last Modified

2023-09-20 14:59:37
