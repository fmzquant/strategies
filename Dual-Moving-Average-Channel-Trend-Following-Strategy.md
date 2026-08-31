
> Name

Dual-Moving-Average-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15c43bdb6d16c085df1.png)


#### Overview

This strategy is a trend-following system based on dual moving averages and channels. It utilizes crossover signals from short-term and long-term moving averages, combined with channels formed by exponential moving averages (EMAs), to capture market trends and execute trades. The strategy is applicable to both long and short positions, employing stop-loss and take-profit mechanisms for risk and profit management.

#### Strategy Principle

The core logic of the strategy includes the following key components:

1. Two Simple Moving Averages (SMAs) as primary trend indicators: 55-period and 300-period SMAs.
2. Two Exponential Moving Averages (EMAs) forming a trading channel: 576-period and 676-period EMAs.
3. Long entry signals are triggered when the short-term SMA crosses above the long-term SMA or EMA; short entry signals occur when the short-term SMA crosses below the long-term SMA or EMA.
4. Fixed-point stop-loss and take-profit strategy, with stop-loss set at 1/70 of the entry price and take-profit at 1/140 of the entry price.
5. A trailing stop mechanism is activated when profit reaches 300 points to protect accumulated gains.
6. The strategy includes exit conditions, such as automatic position closure when price hits stop-loss or take-profit levels.

#### Strategy Advantages

1. Multi-indicator integration: Combining multiple moving averages and EMA channels enhances trend identification accuracy.
2. Bidirectional trading: The strategy can profit in both bullish and bearish markets, improving capital efficiency.
3. Risk management: Employs fixed-point stop-loss and take-profit, effectively controlling risk for each trade.
4. Profit protection: Utilizes trailing stop mechanism to lock in partial profits during sustained trends.
5. Flexibility: Strategy parameters are adjustable to adapt to different market conditions.

#### Strategy Risks

1. Ranging market risk: In sideways markets, frequent false signals may lead to consecutive losses.
2. Slippage risk: In highly volatile markets, actual execution prices may significantly deviate from ideal prices.
3. Overtrading: Frequent trading signals may result in excessive transaction costs.
4. Parameter sensitivity: Strategy performance may be highly sensitive to parameter settings, potentially requiring frequent adjustments for different market environments.

#### Strategy Optimization Directions

1. Incorporate volatility indicators: Consider adding ATR (Average True Range) to dynamically adjust stop-loss and take-profit levels, adapting to varying market volatility.
2. Enhance trend strength filtering: Introduce ADX (Average Directional Index) to filter out weak trend signals, reducing losses from false breakouts.
3. Optimize entry timing: Consider combining RSI (Relative Strength Index) or MACD (Moving Average Convergence Divergence) to improve entry timing and increase win rate.
4. Refine money management: Implement dynamic position sizing, adjusting trade sizes based on account equity and market volatility.
5. Extend backtesting period: Conduct longer-term backtests to verify strategy stability across different market environments.

#### Conclusion

This dual moving average channel trend-following strategy provides a comprehensive trading system by combining multiple technical indicators. It not only captures major trends but also incorporates risk management and profit protection mechanisms. While some potential risks exist, through continuous optimization and parameter adjustment, the strategy has the potential to perform well under various market conditions. Future optimization should focus on improving signal quality, enhancing risk management, and increasing strategy adaptability.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-26 00:00:00
end: 2024-09-24 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RC BTC Vegas 5min free ", overlay=true )

// 定义输入参数
short_ma_length = input.int(55, title="Short MA Length")
long_ma_length = input.int(300, title="Long MA Length")

ema1_length = input.int(576, title="EMA 1 Length")
ema2_length = input.int(676, title="EMA 2 Length")
// 计算移动平均线 
short_ma = ta.sma(close, short_ma_length)
long_ma = ta.sma(close, long_ma_length)
ema1 = ta.ema(close, ema1_length)
ema2 = ta.ema(close, ema2_length)
// 确定买入和卖出信号 
enter_long = ta.crossover(short_ma +5 , ema1)
enter_long2 = ta.crossover(short_ma +5 , long_ma)
enter_long3 =ta.crossover(long_ma+5  , ema1)

exit_long = ta.crossunder(short_ma -5, ema1) 
exit_long2 = ta.crossunder(short_ma -5, long_ma) 
exit_long3 = ta.crossunder(long_ma-5 , ema1)

// 记录进场价格
var float long_stop_loss = na
var float long_take_profit = na

if (enter_long or exit_long  )
    long_stop_loss := close

if (enter_long or exit_long)
    long_take_profit := close

// 根据进场价格计算止损和止盈点数 
stop_loss_points = long_stop_loss /70
take_profit_points  = long_take_profit /140
// 设置固定点数的止损和止
Along_stop_loss = close - stop_loss_points
Along_take_profit = close + take_profit_points
short_stop_loss = close + stop_loss_points
short_take_profit = close - take_profit_points

// 检查持仓利润是否达到300点
long_profit_target_reached = (strategy.position_size > 0 and (close - strategy.position_avg_price) >= take_profit_points)
short_profit_target_reached = (strategy.position_size < 0 and (strategy.position_avg_price - close) >= take_profit_points)

// 即时止损和止盈检查
long_stop_loss_hit = (strategy.position_size > 0 and close <= strategy.position_avg_price - stop_loss_points)
long_take_profit_hit = (strategy.position_size > 0 and close >= strategy.position_avg_price + take_profit_points)
short_stop_loss_hit = (strategy.position_size < 0 and close >= strategy.position_avg_price + stop_loss_points)
short_take_profit_hit = (strategy.position_size < 0 and close <= strategy.position_avg_price - take_profit_points)
// 上一根K棒的止盈止损检查
long_stop_loss_hit_prev = (strategy.position_size > 0 and low[1] <= strategy.position_avg_price - stop_loss_points)
long_take_profit_hit_prev = (strategy.position_size > 0 and high[1]>= strategy.position_avg_price + take_profit_points)
short_stop_loss_hit_prev = (strategy.position_size < 0 and high[1] >= strategy.position_avg_price + stop_loss_points)
short_take_profit_hit_prev = (strategy.position_size < 0 and low[1] <= strategy.position_avg_price - take_profit_points)

// 创建警报条件
alertcondition(long_stop_loss_hit, title="Long Stop Loss Hit", message="Long position stop loss hit")
alertcondition(long_take_profit_hit, title="Long Take Profit Hit", message="Long position take profit hit")
alertcondition(short_stop_loss_hit, title="Short Stop Loss Hit", message="Short position stop loss hit")
alertcondition(short_take_profit_hit, title="Short Take Profit Hit", message="Short position take profit hit")
// 移动止损输入
initialProfitLevel = input.float(9, title="Initial Profit Level (points)")
trailingStopIncrement = input.float(3, title="Trailing Stop Increment (points)")
if (close - long_take_profit >= 150)
    strategy.exit("多單移平", from_entry="Buy", trail_price=close+5 , trail_offset=5  )
if (close - long_take_profit <= -150)
    strategy.exit("空單移平", from_entry="Sell", trail_price=close-5 , trail_offset=5)

// 执行多单交易
if (enter_long or enter_long2  )
    strategy.entry("Buy", strategy.long, qty=1 , comment = "做多")

if (long_stop_loss_hit or long_take_profit_hit  ) 
    strategy.close("Buy",comment = "多單平倉")
//死亡交叉才跟著做空就打開
if (exit_long  or exit_long2  )
    strategy.entry("Sell" ,strategy.short, qty=1 , comment = "做空")

// 执行空单交易
if ( short_take_profit_hit or short_stop_loss_hit ) 
    strategy.close("Sell",comment = "空單平倉")

// 绘制移动平均线
plot(short_ma, title="Short MA", color=color.blue)
plot(long_ma, title="Long MA", color=color.red)

// 绘制进场和出场点
plotshape(series=enter_long, location=location.belowbar, color=color.green, style=shape.labelup, text="做多")
plotshape(series=exit_long , location=location.abovebar, color=color.red, style=shape.labeldown, text="做空") 
plotshape(series=long_take_profit_hit , location=location.abovebar, color=color.yellow, style=shape.labeldown, text="多單止盈")  
plotshape(series=short_take_profit_hit , location=location.abovebar, color=color.yellow, style=shape.labeldown, text="空單止盈") 
plotshape(series=short_stop_loss_hit , location=location.abovebar, color=color.black, style=shape.labeldown, text="空單止損") 
plotshape(series=long_stop_loss_hit , location=location.abovebar, color=color.black, style=shape.labeldown, text="多單止損") 
 
// 绘制止盈和止损点
plot(series=enter_long ? Along_take_profit : na, title="Take Profit", color=color.green, linewidth=2, style=plot.style_linebr)
plot(series=enter_long ? Along_stop_loss : na, title="Stop Loss", color=color.red, linewidth=2, style=plot.style_linebr)

```

> Detail

https://www.fmz.com/strategy/468338

> Last Modified

2024-09-26 16:28:19
