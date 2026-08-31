
> Name

Dual-Moving-Average-Crossover-Trend-Following-Strategy-with-Dynamic-Stop-Loss-and-Take-Profit-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e7ecf2cad7b13aa3d3.png)

 

#### Overview
This strategy is a trend-following system based on technical analysis, primarily utilizing the crossover signals between the 50-period Exponential Moving Average (EMA) and 200-period Simple Moving Average (MA) to capture market trends. The strategy integrates a dynamic stop-loss and take-profit mechanism to control risks and secure profits, allowing it to both capture major trends and exit promptly during market reversals.

#### Strategy Principles
The core logic is based on the crossover of two moving averages: a buy signal is generated when the 50-period EMA crosses above the 200-period MA, while a sell signal is triggered when the 50-period EMA crosses below the 200-period MA. After each entry, the system automatically sets stop-loss levels (3 points from entry) and take-profit levels (7.5 points from entry). Additionally, positions are automatically closed when reverse signals appear to prevent holding positions against the market trend.

#### Strategy Advantages
1. Strong trend following capability: Effectively captures market trend transitions by combining fast and slow moving averages
2. Comprehensive risk control: Integrates dynamic stop-loss and take-profit mechanisms for effective risk management
3. High systematization: Clear trading signals and fixed exit points reduce subjective judgment interference
4. Strong adaptability: Strategy can be applied to different market environments and trading instruments
5. Simple operation: Clear entry and exit logic, convenient for execution and backtesting

#### Strategy Risks
1. Choppy market risk: False breakouts in ranging markets may lead to consecutive losses
2. Slippage risk: Actual execution prices may significantly deviate from theoretical prices during high volatility
3. Fixed stop-loss risk: Preset fixed stop-loss levels may not suit all market conditions
4. Trend reversal risk: Potential delayed exits during sudden trend reversals
5. Money management risk: Fixed stop-loss ranges may not be suitable for different account sizes

#### Optimization Directions
1. Incorporate volatility indicators: Dynamically adjust stop-loss and take-profit levels based on market volatility
2. Add trend confirmation indicators: Such as RSI or MACD to improve signal reliability
3. Optimize money management: Adjust position sizes based on account size and market volatility
4. Add market environment filters: Reduce trading frequency or pause trading in ranging markets
5. Improve exit mechanism: Implement trailing stops to maximize profits

#### Summary
This strategy combines a classic dual moving average crossover system with dynamic stop-loss and take-profit mechanisms to create a complete trend-following trading system. Its strengths lie in high systematization and comprehensive risk control, though practical application requires optimization based on specific market conditions and capital size. The strategy's stability and profitability can be further enhanced by adding more technical indicators and improving money management methods. For investors seeking steady returns, this serves as a valuable basic strategy framework to build upon.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-24 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5 
strategy("200 MA & 50 EMA Crossover Strategy with **Estimated** SL & TP", overlay=true) 

 // Parameters for the 200 MA and 50 EMA
ma200 = ta.sma(close, 200) // 200-period simple moving average 
ema50 = ta.ema(close, 50) // 50-period exponential moving average 

 // Plot the MA and EMA on the chart 
plot(ma200, color=color.blue, linewidth=2, title="200 MA") 
plot(ema50, color=color.red, linewidth=2, title="50 EMA") 

 // Define **estimated** stop loss and take profit values 
// SL = 3 points, TP = 7.5 points from the entry price 
sl_points = 3 
tp_points = 7.5 

 // Buy signal: when the 50 EMA crosses above the 200 MA (bullish crossover) 
if (ta.crossover(ema50, ma200)) 
    strategy.entry("Buy", strategy.long) 
 // Set **estimated** stop loss and take profit strategy.exit("Take Profit/Stop Loss", "Buy", stop=strategy.position_avg_price - sl_points, limit=strategy.position_avg_price + tp_points) 

 // Sell signal: when the 50 EMA crosses below the 200 MA (bearish crossover) 
if (ta.crossunder(ema50, ma200)) 
    strategy.entry("Sell", strategy.short) 
 // Set **estimated** stop loss and take profit strategy.exit("Take Profit/Stop Loss", "Sell", stop=strategy.position_avg_price + sl_points, limit=strategy.position_avg_price - tp_points) 

 // Optional: Close the position when an opposite signal appears 
if (strategy.position_size > 0 and ta.crossunder(ema50, ma200)) 
    strategy.close("Buy") 
if (strategy.position_size < 0 and ta.crossover(ema50, ma200)) 
    strategy.close("Sell")
```

> Detail

https://www.fmz.com/strategy/472971

> Last Modified

2024-11-25 17:24:33
