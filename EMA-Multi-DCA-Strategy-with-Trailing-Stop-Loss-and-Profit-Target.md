
> Name

EMA-Multi-DCA-Strategy-with-Trailing-Stop-Loss-and-Profit-Target

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/a40a12f417cf42c672.png)
 ## Overview 
This strategy utilizes dynamic multiple EMAs as entry signals combined with trailing stop loss and profit target mechanisms for risk management. It takes advantage of the smoothing nature of EMAs to identify trends and control cost via multi-DCA entries. In addition, the integration of adaptive stop loss and profit taking features enhances the automation process.  

## Strategy Logic
### Indicators
- EMA5, EMA10, EMA20, EMA50, EMA100, EMA 200
- Average True Range (ATR)

### Entry Signals
Triggers long entry when price crosses or moves inside a range of selected EMA periods. Typical EMAs include 5, 10, 20, 50, 100, 200 periods. This strategy uses 1% range of EMA as the entry criteria.  

### Risk Management 
Incorporates multiple risk control mechanisms:
1. ATR Stop Loss: Close all positions when ATR exceeds threshold
2. Entry Frequency Limit: Control maximum number of entries  
3. Trailing Stop Loss: Dynamic stop loss based on price movement

### Profit Taking  
Set profit target price levels for exits  

## Advantages
1. Identify trends using EMAs with noise filtering  
2. Cost averaging via multi-DCA entries
3. Enhanced entry signals using EMA combos
4. Adaptive stop loss mechanism  
5. Take profit control for profit protection
   
## Risks & Improvements
1. EMAs tuning needs optimization for different markets
2. Excessive DCA entries may occupy too much capital
3. Stop loss percentage needs backtesting  

## Enhancement Strategies
1. Utilize advanced EMA systems for better trend identification
2. Multi-variable optimization of DCA frequency and stop loss percentage 
3. Incorporate machine learning models for price change forecasts  
4. Integrate position sizing module to manage overall capital utilization

## Conclusion
The strategy encompasses EMA trend detection, multi-DCA cost averaging, trailing stop loss, target profit taking and more. There remains ample potential in tuning parameters and enhancing risk controls. Overall, this highly adaptive and versatile strategy offers investors stable alpha generation capabilities.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Sell Threshold|
|v_input_2|3000|Buy Limit|
|v_input_3|true|Trailing Stop Percentage|
|v_input_4|3|Profit Target Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-12 00:00:00
end: 2024-01-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("EMA DCA Strategy with Trailing Stop and Profit Target", overlay=true )

// Define the investment amount for when the condition is met
investment_per_condition = 6

// Define the EMAs
ema5 = ema(close, 5)
ema10 = ema(close, 10)
ema20 = ema(close, 20)
ema50 = ema(close, 50)
ema100 = ema(close, 100)
ema200 = ema(close, 200)

// Define ATR sell threshold
atr_sell_threshold = input(title="ATR Sell Threshold", type=input.integer, defval=10, minval=1)

// Helper function to find if the price is within 1% of the EMA
isWithin1Percent(price, ema) =>
    ema_min = ema * 0.99
    ema_max = ema * 1.01
    price >= ema_min and price <= ema_max

// Control the number of buys
var int buy_count = 0
buy_limit = input(title="Buy Limit", type=input.integer, defval=3000)

// Calculate trailing stop and profit target levels
trail_percent = input(title="Trailing Stop Percentage", type=input.integer, defval=1, minval=0, maxval=10)
profit_target_percent = input(title="Profit Target Percentage", type=input.integer, defval=3, minval=1, maxval=10)

// Determine if the conditions are met and execute the strategy
checkConditionAndBuy(emaValue, emaName) =>
    var int local_buy_count = 0 // Create a local mutable variable
    if isWithin1Percent(close, emaValue) and local_buy_count < buy_limit
        strategy.entry("Buy at " + emaName, strategy.long, qty=investment_per_condition / close, alert_message ="Buy condition met for " + emaName)
        local_buy_count := local_buy_count + 1
        // alert("Buy Condition", "Buy condition met for ", freq_once_per_bar_close)
        
    local_buy_count // Return the updated local_buy_count

// Add ATR sell condition
atr_condition = atr(20) > atr_sell_threshold
if atr_condition
    strategy.close_all()
    buy_count := 0 // Reset the global buy_count when selling

// Strategy execution
buy_count := checkConditionAndBuy(ema5, "EMA5")
buy_count := checkConditionAndBuy(ema10, "EMA10")
buy_count := checkConditionAndBuy(ema20, "EMA20")
buy_count := checkConditionAndBuy(ema50, "EMA50")
buy_count := checkConditionAndBuy(ema100, "EMA100")
buy_count := checkConditionAndBuy(ema200, "EMA200")

// Calculate trailing stop level
trail_offset = close * trail_percent / 100
trail_level = close - trail_offset

// Set profit target level
profit_target_level = close * (1 + profit_target_percent / 100)

// Exit strategy: Trailing Stop and Profit Target
strategy.exit("TrailingStop", from_entry="Buy at EMA", trail_offset=trail_offset, trail_price=trail_level)
strategy.exit("ProfitTarget", from_entry="Buy at EMA",  when=close >= profit_target_level)

// Plot EMAs
plot(ema5, title="EMA 5", color=color.red)
plot(ema10, title="EMA 10", color=color.orange)
plot(ema20, title="EMA 20", color=color.yellow)
plot(ema50, title="EMA 50", color=color.green)
plot(ema100, title="EMA 100", color=color.blue)
plot(ema200, title="EMA 200", color=color.purple)

```

> Detail

https://www.fmz.com/strategy/439362

> Last Modified

2024-01-19 15:16:53
