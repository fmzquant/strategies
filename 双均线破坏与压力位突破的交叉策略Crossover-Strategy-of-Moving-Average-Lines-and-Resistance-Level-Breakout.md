
> Name

双均线破坏与压力位突破的交叉策略Crossover-Strategy-of-Moving-Average-Lines-and-Resistance-Level-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c03a19729a6000745e.png)
 [trans]
## 概述

本策略综合利用双移动平均线交叉技术与压力位突破技术,设定买入信号与卖出信号,实现自动交易。当短期均线从下向上突破中期均线,并且股价突破压力位时产生买入信号;当股价上涨15%时设置止盈,下跌3%时设置止损。该策略可自动识别市场趋势,在技术指标信号出现时自动入场,并设置止盈止损来控制风险,属于较为成熟的量化交易策略。

## 策略原理

本策略主要基于以下几个技术指标与条件判断来产生交易信号:

1. 双均线交叉技术:计算20日、44日简单移动平均线,当20日均线上穿44日均线时判断为市场处于上升趋势,产生买入信号。

2. 压力位突破技术:图表显示股价曾多次接近但未能突破的位置被称为压力位。当股价成功突破压力位后,预示着价格进入新的上升阶段。本策略判断股价突破前一交易日最高价的0.7%范围则可视为突破压力位。  

3. 超买超卖指标RSI:相对强弱指数,判断市场是超买还是超卖的技术指标。本策略设定14日RSI指标大于50时为超买信号。

4. 成交量分析:成交量突破过去10日平均成交量预示着市场出现更加强劲的买盘或卖盘。

5. 买入信号:短期均线上穿中期均线且股价突破压力位,市场为超买状态,且成交量高于过去10日平均成交量,则产生买入信号。

6. 卖出信号:设置止盈止损标准,若股价较买入价格上涨15%则止盈;若下跌3%则止损。

该策略综合运用多种技术指标判断市场结构,并在其指示趋势出现时自动产生交易信号,属于较为成熟完整的量化交易策略。

## 策略优势

1. 利用均线技术判断市场结构,能稳定捕捉市场趋势;

2. 结合成交量分析,避免在成交量不匹配的假突破中打开仓位;  

3. 设置止盈止损退出机制,可以很好控制单笔交易的风险收益比,避免亏损扩大;

4. 总体来说,该策略对市场结构判断准确,交易规则严谨,风险控制到位,是一个效果较好的量化策略。

## 策略风险

1. 双均线交易系统对参数设置较为敏感,不同时段参数需要调整;

2. 纯粹追踪趋势的策略,无法对突发事件作出反应,如重大利空消息面前难免遭遇止损;

3. 虽然设置了止盈止损,但交易次数较多时止损次数亦不可避免较多,存在获利水平参差不齐的风险。

4. 从长期看,技术指标发出信号的时点往往已经略过市场反转的最佳点位。

## 策略优化方向 

1. 可采用参数优化方法寻找最佳双均线参数组合,优化止盈止损水平;

2. 增加其他指标判断,如布林带判明盘整范围、MACD判明超买超卖等,提升发出信号时点;  

3. 增加基本面或消息面判断,避免重大负面消息造成止损;

4. 优化资金管理策略,如固定数量交易、固定资金比例交易等,控制单笔风险。

## 总结

本策略整体运作顺畅,判断准确且交易规则严谨,风险控制到位,属于效果较好的量化策略之一。但技术面交易策略对市场结构的判断仍有局限,优化空间在于增加其他指标判断和基本面消息面的综合考量,此外进一步优化止盈止损设定及资金管理策略亦为重点。总体而言,本策略作为技术指标策略已经达到较高水平,但下一步仍需要朝基本面 Messages 驱动全市场周期策略的方向继续优化。

||

## Overview

This strategy integrates the techniques of moving average crossover and resistance level breakout to set up buying and selling signals for automated trading. When the short-term moving average crosses over the medium-term moving average from below, and the stock price breaks through the resistance level, a buy signal is generated. The strategy sets take-profit at 15% price increase and stop-loss at 3% price decrease to control risks. This mature quantitative trading strategy can automatically identify market trends and get into positions when technical signals emerge, with proper risk management.

## Strategy Principles  

The strategy generates trading signals mainly based on the following technical indicators and judgements:

1. Moving average crossover technique: 20-day and 44-day simple moving averages are calculated. When the 20-day SMA crosses over the 44-day line, it is judged that the market is in an upward trend, generating a buy signal.

2. Resistance level breakout technique: Price levels that the stock price has repeatedly reached but failed to break through are called resistance levels. Breaking through them indicates the price is entering a new uptrend. This strategy regards a breakout above 0.7% of previous close as a resistance breakout. 

3. RSI Oscillator: Relative Strength Index, a momentum indicator for identifying overbought and oversold conditions. This strategy uses the 14-day RSI value above 50 as an overbought signal.  

4. Volume analysis: Volume exceeding past 10-day average often suggests stronger buying or selling interest and momentum in price movement.

5. Buy signals: Triggered when the short SMA crosses over medium SMA, with overbought RSI value and higher than average trading volume, indicating an upward trend.

6. Sell signals: 15% take-profit from entry price, 3% stop-loss.

This mature quantitative trading strategy integrates multiple technical analysis methods to identify market structure and trend, automatically generating trading signals during trend formations, with proper risk management.

## Advantages of the Strategy

1. Captures market trends smoothly with moving average technique.

2. Avoids opening positions during false breakouts by incorporating volume analysis. 

3. Effective risk control by setting stop-loss and take-profit, optimizing risk-reward ratio.

4. Overall excellent market structure judgement, rigorous trading rules and risk control make this a robust quantitative trading strategy.


## Risks of the Strategy

1. Double moving average systems can be sensitive to parameter tuning for different periods.

2. Trend following systems cannot respond swiftly to sudden fundamental events, facing stop loss risks.

3. Although with stop loss set up, high trading frequency leads to unavoidable number of stop loss executions, resulting in uneven profit levels.

4. Signals from technical indicators often lag behind the best reversal points of the markets.

## Optimization Directions

1. Optimize parameters like moving average lengths, stop loss/profit target by parameter tuning methods to find optimum.

2. Add other technical indicators like Bollinger Bands for range detection, MACD for spotting divergences etc. to improve signal accuracy.  

3. Incorporate fundamental and event driven signals to avoid stop loss triggered by negative news.

4. Optimize money management by fixed quantity, fixed percentage methods to control per trade risks.

## Conclusion
This strategy demonstrates smooth operations, accurate judgements and rigorous trading rules, representing one of the more effective quantitative trading techniques. But technical analysis alone has limitations in reading markets, so further improvements lie in incorporating more indicators and fundamental/event signals, optimizing stop loss/profit taking levels and money management mechanisms. In summary, this strategy has reached high level among technical analysis strategies, but should head towards fundamental/event driven cycles trading strategies in next evolution steps.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Advanced Strategy with Conditional Stop Loss", overlay=true)

// Parameters
ma_length_20 = 20
ma_length_44 = 44
ma_length_100 = 100
rsi_length = 14
volume_length = 10
profit_target = 1.15 // 15% above the buy price
stop_loss_target = 0.97 // 3% below the buy price
wait_candles = 10 // Number of candles to wait after selling, unless MA cross condition met

// Indicators
moving_average_20 = ta.sma(close, ma_length_20)
moving_average_44 = ta.sma(close, ma_length_44)
moving_average_100 = ta.sma(close, ma_length_100)
rsi = ta.rsi(close, rsi_length)
volumeAvg = ta.sma(volume, volume_length)

// Variables to manage the wait period after a sell
var int last_sell_candle = 0

// Update last sell candle
if (strategy.position_size[1] > 0 and strategy.position_size == 0)
    last_sell_candle := bar_index

// Trend identification
uptrend = close > moving_average_20
above_ma20_by_1_percent = close > moving_average_20 * 1.01
ma_cross = ta.crossover(moving_average_20, moving_average_44) or ta.crossunder(moving_average_20, moving_average_44)
close_near_high = (close >= high * 0.993) and (close <= high)

// Buy condition (only in uptrend, above 1% from 20-day MA, and respecting new filter)
can_buy_after_cross = ma_cross and close > high[1]
can_buy_after_wait = (bar_index - last_sell_candle) > wait_candles
buy_condition = (can_buy_after_cross or can_buy_after_wait) and uptrend and above_ma20_by_1_percent and close > moving_average_44 and close > moving_average_100 and close > high[1] and rsi > 50 and volume > volumeAvg and not close_near_high

// Entry
if (buy_condition and strategy.position_size == 0)
    strategy.entry("Buy", strategy.long)

// Exit conditions
if (strategy.position_size > 0)
    // Profit target
    profit_level = strategy.position_avg_price * profit_target
    strategy.exit("Take Profit", "Buy", limit=profit_level)

    // Dynamic Stop Loss - Check on every bar if the price has dropped 3% below the buy price
    stop_loss_level = strategy.position_avg_price * stop_loss_target
    if (low < stop_loss_level)
        strategy.close("Buy", comment="Stop Loss")

// Plotting
plot(moving_average_20, color=color.green, title="20-Day Moving Average")
plot(moving_average_44, color=color.blue, title="44-Day Moving Average")
plot(moving_average_100, color=color.red, title="100-Day Moving Average")

```

> Detail

https://www.fmz.com/strategy/440535

> Last Modified

2024-01-31 14:34:16
