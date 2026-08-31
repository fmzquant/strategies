
> Name

基于RSI极值与SMA均线过滤的趋势跟踪策略A-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/af1ac74b0f6970576d.png)


### Overview

This strategy combines the extremes of the Relative Strength Index (RSI) indicator and the filtering of the Simple Moving Average (SMA) to track trends. When the RSI reaches extreme overbought or oversold levels, long and short directions are determined based on the SMA direction. The strategy is suitable for US stock indexes, European indexes, Asian indexes, gold, silver and other varieties. Through simple RSI and SMA rules, it effectively captures trends. 

### Strategy Logic

1. Calculate the RSI indicator value, set the overbought threshold upper limit to 65, and the oversold threshold lower limit to 45.

2. Calculate the 200-day SMA to determine the trend direction. 

3. When RSI is below 45 (oversold) and price is above SMA, go long; when RSI is above 65 (overbought) and price is below SMA, go short.

4. When RSI is above 75 (strongly overbought) and price is above SMA, close long positions; when RSI is below 25 (strongly oversold) and price is below SMA, close short positions.

The strategy captures trends effectively by using RSI extremes to time entries and SMA direction for filtering. RSI extremes indicate potential reversals, while SMA direction ensures trades align with the trend. Together, they ensure reasonable trades and higher win rates.

### Advantages

1. Simple and clear strategy logic, easy to understand and master. 

2. Based on well-known RSI and SMA indicators, easy to implement.

3. RSI extremes indicate potential reversal points, SMA filters ensure directional correctness. 

4. Reasonable parameter settings avoid excessive trading.

5. Applicable to multiple products like indexes and commodities. 

6. Captures significant price swings during trends.

Compared to RSI alone, the strategy adds SMA trend filter to avoid blind long/short. Compared to SMA systems alone, the strategy improves timing efficiency by using RSI extremes. Overall, it combines the strengths of both for a practical trend following strategy.

### Risks and Solutions

1. SMA death cross poses trend reversal risks. Use shorter SMA periods for increased sensitivity.

2. RSI divergences risk missing trades. Add other indicators like MACD to detect anomalies.

3. Both RSI and SMA may generate false signals during ranging markets. Pause trading when range-bound market detected.

4. Improper parameter settings lead to overtrading or missed trades. Optimize parameters to find best combination.

5. Single product backtest insufficient to evaluate strategy. Validate across multiple products. 

6. Backtest ≠ live trading. Manage risk and capital in live trading.

### Improvement Directions

1. Optimize RSI periods for different products.

2. Optimize SMA periods, integrate multiple SMAs. 

3. Add stop loss for better risk control.

4. Add other indicators for multi-factor confirmation.

5. Improve entry timing with volatility indicators. 

6. Develop adaptive parameter system for dynamic optimization.

7. Test different capital management approaches for optimum.

8. Create strategy ensemble for different market conditions.

### Conclusion

The RSI extremes with SMA filter strategy combines the strengths of both for effective trend following. The logic is clear and parameters solid. It works across multiple products to significantly improve timing efficiency and win rate compared to RSI or SMA systems alone. There is room for improvements like parameter optimization and stop loss to further enhance robustness and adaptiveness. Overall, it provides trend traders with a very useful and effective tool.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI lenght|
|v_input_int_2|200|  SMA Lenght|
|v_input_float_1|5| stop loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-23 00:00:00
end: 2023-10-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
// © wielkieef

//@version=5

strategy('Relative Strength Index Extremes with 200-Day Moving Average Filte', overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.cash, default_qty_value=36000, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.01)

// Rsi
rsi_lenght = input.int(14, title='RSI lenght', minval=0)
rsi_up = ta.rma(math.max(ta.change(close), 0), rsi_lenght)
rsi_down = ta.rma(-math.min(ta.change(close), 0), rsi_lenght)
rsi_value = rsi_down == 0 ? 100 : rsi_up == 0 ? 0 : 100 - 100 / (1 + rsi_up / rsi_down)


//Sma
Length1 = input.int(200, title='  SMA Lenght', minval=1)
SMA1 = ta.sma(close, Length1)

//Strategy Logic
Long = rsi_value < 45 and close > SMA1
Long_exit = rsi_value > 75 and close > SMA1

Short = rsi_value > 65 and close < SMA1
Short_exit = rsi_value < 25 and close < SMA1


if Long
    strategy.entry('Long', strategy.long)

if Short
    strategy.entry('Short', strategy.short)

strategy.close_all(Long_exit or Short_exit)

pera(pcnt) =>
    strategy.position_size != 0 ? math.round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss = input.float(title=' stop loss', defval=5, minval=0.5)
los = pera(stoploss)

strategy.exit('SL', loss=los)



//by wielkieef


```

> Detail

https://www.fmz.com/strategy/430044

> Last Modified

2023-10-24 14:47:38
