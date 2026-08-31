
> Name

EMA-SMA多指标综合趋势跟踪策略-EMA-SMA-Multi-Indicator-Comprehensive-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/116934b58302b030c5b.png)


#### Overview

This strategy is a comprehensive trend following system based on multiple technical indicators, primarily designed for the 1-hour timeframe. It combines moving averages, momentum indicators, and oscillators to assess market trends by calculating the position of multiple indicators relative to the current price. The core idea of the strategy is to buy when most indicators show bullish signals and sell when most indicators show bearish signals. This approach aims to capture strong market trends while reducing the risk of false signals through the integration of multiple indicators.

#### Strategy Principles

The core of this strategy is to calculate the position of multiple technical indicators relative to the current price and make trading decisions based on the combined signals of these indicators. Specifically:

1. Moving Averages: Calculates 6 different periods (10, 20, 30, 50, 100, 200) of EMA and SMA, determining whether they are above or below the closing price.

2. RSI: Uses 14-period RSI, considering RSI > 50 as a bullish signal and RSI < 50 as a bearish signal.

3. Stochastic Oscillator: Uses 14-period stochastic, with K line > 80 considered bullish and < 20 considered bearish.

4. CCI: Uses 20-period CCI, with values > 100 considered bullish and < -100 considered bearish.

5. Momentum: Calculates 10-period momentum, with positive values considered bullish and negative values bearish.

6. MACD: Uses 12-26-9 parameter MACD, with positive histogram considered bullish and negative histogram bearish.

The strategy calculates the number of all bullish signals (above_count) and all bearish signals (below_count), then computes their difference (below_count - above_count). This difference is used as the main trading signal:

- When the difference is greater than the set entry_long threshold, open a long position.
- When the difference is less than the set entry_short threshold, open a short position.
- When the difference is less than the close_long threshold, close the long position.
- When the difference is greater than the close_short threshold, close the short position.

This method allows the strategy to judge the strength and direction of market trends based on the combined signals of multiple indicators, thus making more robust trading decisions.

#### Strategy Advantages

1. Multi-indicator comprehensive analysis: By combining multiple technical indicators, the strategy can more comprehensively evaluate market trends, reducing the risk of false signals that might come from a single indicator.

2. High adaptability: The strategy uses different types of indicators (trend following, momentum, and oscillators), enabling it to maintain effectiveness in various market environments.

3. Flexible parameter settings: Users can adjust entry and exit thresholds according to their risk preferences and market views, making the strategy more personalized.

4. Trend following capability: By synthesizing signals from multiple indicators, the strategy has the potential to capture strong market trends, thus obtaining considerable profits.

5. Risk management: The strategy includes logic for closing positions, which can help exit trades in a timely manner when market trends reverse, aiding in risk control.

6. Visualization: The strategy plots the difference between above_count and below_count on the chart, allowing traders to visually observe changes in market trend strength.

#### Strategy Risks

1. Lag: Due to the use of multiple moving averages and other lagging indicators, the strategy may react slowly to trend reversals, leading to delayed entries or exits.

2. Overtrading: In oscillating markets, indicators may frequently give contradictory signals, leading to excessive trading and increased transaction costs.

3. False breakout risk: In sideways markets, indicators may misinterpret small fluctuations as the beginning of trends, resulting in incorrect trading signals.

4. Parameter sensitivity: The strategy's performance may be very sensitive to the setting of entry and exit thresholds. Improper parameter settings may lead to poor strategy performance.

5. Lack of stop-loss mechanism: The current strategy does not have a clear stop-loss mechanism, which may face significant losses under extreme market conditions.

6. Ignoring fundamental factors: The strategy is entirely based on technical indicators and does not consider fundamental factors that may affect the market.

#### Strategy Optimization Directions

1. Introduce adaptive parameters: Consider using adaptive mechanisms to dynamically adjust entry and exit thresholds to adapt to different market environments. This can be achieved by analyzing historical volatility or using machine learning algorithms.

2. Add stop-loss mechanism: Introduce stop-loss mechanisms based on ATR or fixed percentages to limit the maximum loss of a single trade and improve risk management capabilities.

3. Optimize indicator combination: Try using feature selection algorithms to determine the most effective combination of indicators, removing redundant or underperforming indicators to improve strategy efficiency.

4. Introduce time filters: Consider adding time filters to avoid trading during periods of low market volatility, such as only trading in the first few hours after market opening.

5. Integrate market sentiment indicators: Introduce market sentiment indicators such as the VIX index or trading volume to better judge market environments and improve strategy adaptability.

6. Optimize moving average periods: Experiment with different combinations of moving average periods or use adaptive moving averages to improve the strategy's adaptability to different time frames.

7. Add trend strength filtering: Introduce trend strength indicators like ADX, only trading when the trend is strong enough to reduce false signals in oscillating markets.

8. Implement partial position management: Adjust position size based on signal strength instead of simple all-in-all-out trading. This can better manage risk and optimize capital utilization.

#### Summary

The EMA/SMA Multi-Indicator Comprehensive Trend Following Strategy is an integrated trading system based on multiple technical indicators, aiming to capture market trends by analyzing combined signals from multiple indicators. The main advantages of this strategy lie in its comprehensive market analysis capability and flexible parameter settings, allowing it to adapt to different market environments. However, the strategy also has some potential risks, such as lag and the possibility of overtrading.

By implementing the suggested optimization directions, such as introducing adaptive parameters, strengthening risk management mechanisms, and optimizing indicator combinations, the robustness and profitability of the strategy can be further improved. Ultimately, this strategy provides traders with a comprehensive market analysis tool, but its successful application still requires the trader's experience and continuous optimization efforts.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-28 00:00:00
end: 2024-06-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA/SMA Above-Below Close with Multiple Indicators", overlay=true)

// EMA and SMA calculations
ema10 = ta.ema(close, 10)
sma10 = ta.sma(close, 10)

ema20 = ta.ema(close, 20)
sma20 = ta.sma(close, 20)

ema30 = ta.ema(close, 30)
sma30 = ta.sma(close, 30)

ema50 = ta.ema(close, 50)
sma50 = ta.sma(close, 50)

ema100 = ta.ema(close, 100)
sma100 = ta.sma(close, 100)

ema200 = ta.ema(close, 200)
sma200 = ta.sma(close, 200)





// Indicators calculations
rsi = ta.rsi(close, 14)
stochK = ta.stoch(close, high, low, 14)
stochD = ta.sma(stochK, 3)
cci = ta.cci(close, 20)
momentum = ta.mom(close, 10)
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)
macdHist = macdLine - signalLine
bullPower = high - ta.ema(close, 13)
bearPower = low - ta.ema(close, 13)



// Calculate the number of plots above and below close
above_count = (ema10 > close ? 1 : 0) + (sma10 > close ? 1 : 0) + 
              (ema20 > close ? 1 : 0) + (sma20 > close ? 1 : 0) + 
              (ema30 > close ? 1 : 0) + (sma30 > close ? 1 : 0) + 
              (ema50 > close ? 1 : 0) + (sma50 > close ? 1 : 0) + 
              (ema100 > close ? 1 : 0) + (sma100 > close ? 1 : 0) + 
              (ema200 > close ? 1 : 0) + (sma200 > close ? 1 : 0) + 
              (rsi > 50 ? 1 : 0) + (stochK > 80 ? 1 : 0) + (cci > 100 ? 1 : 0) + 
//              (adx > 25 and close > open ? 1 : 0) + (ao > 0 ? 1 : 0) + 
              (momentum > 0 ? 1 : 0) + (macdHist > 0 ? 1 : 0)
   //           (stochRsi > 0.8 ? 1 : 0) + (willr > -20 ? 1 : 0) + 
         //     (bullPower > 0 ? 1 : 0) + (uo > 50 ? 1 : 0)

below_count = (ema10 < close ? 1 : 0) + (sma10 < close ? 1 : 0) + 
              (ema20 < close ? 1 : 0) + (sma20 < close ? 1 : 0) + 
              (ema30 < close ? 1 : 0) + (sma30 < close ? 1 : 0) + 
              (ema50 < close ? 1 : 0) + (sma50 < close ? 1 : 0) + 
              (ema100 < close ? 1 : 0) + (sma100 < close ? 1 : 0) + 
              (ema200 < close ? 1 : 0) + (sma200 < close ? 1 : 0) + 
              (rsi < 50 ? 1 : 0) + (stochK < 20 ? 1 : 0) + (cci < -100 ? 1 : 0) + 
      //        (adx > 25 and close < open ? 1 : 0) + (ao < 0 ? 1 : 0) + 
              (momentum < 0 ? 1 : 0) + (macdHist < 0 ? 1 : 0)
       //       (stochRsi < 0.2 ? 1 : 0) + (willr < -80 ? 1 : 0) + 
         //     (bearPower < 0 ? 1 : 0) + (uo < 50 ? 1 : 0)

// Plot the difference between above_count and below_count
plot(below_count - above_count, title="Above-Below Count", color=color.orange, linewidth=2)

// Zero line
hline(0, "Zero Line", color=color.red, linewidth=2)

// Strategy
entry_long = input(12, title="entry long")
entry_short = input(-12, title="entry short")

close_long = input(-9, title="close long")
close_short = input(9, title="close short")

if (below_count - above_count > close_short)
    strategy.close("Sell")

if (below_count - above_count < close_long)
    strategy.close("Buy")
// Buy signal
if (below_count - above_count > entry_long)
//    strategy.close("Sell")
    strategy.entry("Buy", strategy.long)

// Sell (or close short) signal
if (below_count - above_count < entry_short)
//    strategy.close("Buy")
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/455353

> Last Modified

2024-06-28 15:00:20
