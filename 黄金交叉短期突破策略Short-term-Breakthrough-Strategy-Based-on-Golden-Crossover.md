
> Name

黄金交叉短期突破策略Short-term-Breakthrough-Strategy-Based-on-Golden-Crossover

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/efb3ae6a0d4daf0d14.png)
[trans]

## 概述

该策略是一个基于移动平均线的短期追踪策略。它使用长期和短期移动平均线的黄金交叉作为买入信号,死叉作为卖出信号,并结合RSI指标过滤假信号。这是一个典型的短线交易策略,适合高频日内交易。

## 策略原理

该策略使用 200 期长期简单移动平均线 malong 和 21 期短期指数移动平均线 mashort。当价格上穿长期均线且 RSI 指标小于 20 时产生买入信号;当价格下穿短期均线且 RSI 指标大于 80 时产生卖出信号。为过滤假信号,它还设置了附加条件:只有价格低于短期均线且高于前一根K线的最低价时才会平仓做多头仓位;只有价格高于短期均线且低于前一根K线的最高价时才会平仓做空头仓位。

该策略同时设置了 1% 的止损和 1% 的止盈。也即做多头仓位止损价为买入价格的 99%,止盈价为买入价格的 101%;做空头仓位则相反,这确保了每个交易都有严格的风险控制。

## 策略优势

该策略最大的优势在于其短期追踪特性。移动平均线的黄金/死叉组合被证明是有效识别短期趋势转折的技术指标。结合 RSI 极值过滤,可以有效识别短期反转机会,及时调整仓位。这种高频交易策略可以充分捕捉价格的短期波动,实现盈利。

另一个优势在于该策略设置了严格的止损机制。无论做多还是做空,止损点都设置为买入/卖出价格的 1% 以下,可以快速止损,防止亏损扩大。止盈也类似设置为 1%,确保盈利后及时止盈。

## 策略风险 

该策略最大的风险在于容易产生过度交易。当价格在均线附近震荡时,会频繁触发开仓平仓,不利于持仓成本和手续费的控制。这时需要适当放宽指标参数,减少无谓交易。

另一个风险是移动平均线容易发出假信号。当价格出现剧烈波动时,实际趋势并未转变,但是移动平均线可能发出错误信号。这时则需要依赖 RSI 极值过滤来避免追顶撤底。可以测试优化 RSI 参数,使过滤更加严格。

## 策略优化方向

该策略可以从以下几个方面进一步优化:

1. 增加其他指标过滤,如KD,MACD等,结合更多指标判断市场实际走势,避免假信号。

2. 优化移动平均线参数,测试不同周期参数对策略效果的影响。

3. 优化止损止盈参数,适当扩大止损范围来减少止损被触发的概率。

4. 增加交易时间过滤,只在活跃交易时段开仓,避免隔夜风险。

5. 增加日内循环及空仓期过滤逻辑,降低无谓交易频率,减少费用支出。

## 总结

本策略总体而言是一个典型的短期追踪策略。它利用移动平均线的黄金/死叉组合判断短期趋势,并辅以 RSI 指标过滤假信号。策略具有高频日内交易的优势,可以充分捕捉价格的短期波动。但也存在一定的假信号风险和过度交易风险。通过参数优化及增加其他指标可以进一步完善该策略,提高策略稳定盈利的能力。

||

## Overview

This is a short-term tracking strategy based on moving averages. It uses the golden crossover of long-term and short-term moving averages as buy signals, and the death cross as sell signals. Combined with the RSI indicator to filter false signals, this is a typical short-term trading strategy suitable for high-frequency intraday trading.

## Strategy Logic

The strategy uses a 200-period simple moving average malong as the long-term line and a 21-period exponential moving average mashort as the short-term line. It generates buy signals when the price crosses above the long-term line and the RSI is below 20. Sell signals are generated when the price crosses below the short-term line and the RSI exceeds 80. To filter false signals, additional criteria are set: long positions are closed only when the price is below the short-term line and above the lowest price of the previous bar; short positions are closed only when the price is above the short-term line and below the highest price of the previous bar. 

The strategy also sets a 1% stop loss and 1% take profit. That is, the stop loss for long positions is set at 99% of the entry price, and take profit is at 101% of the entry price. For short positions it is the opposite. This ensures strict risk control for every trade.

## Advantages

The biggest advantage of this strategy lies in its short-term tracking capability. The golden/death cross combinations of moving averages are proven effective technical indicators for identifying short-term trend changes. Combined with RSI extreme value filtering, they can effectively detect short-term reversal opportunities and promptly adjust positions. Such high frequency strategies can fully capture short-term price fluctuations and realize profits.

Another advantage is the strict stop loss mechanism set in the strategy. Whether long or short, the stop loss is set at 1% below the entry/exit price, which allows quick stop loss to prevent loss enlargement. Similarly take profit is set at 1% to lock in gains in a timely manner after profiting. 

## Risks

The biggest risk of this strategy is that it may result in excessive trading. When the price oscillates near the moving averages, it tends to frequently trigger openings and closings, which is not conducive to controlling carry costs and transaction fees. In this case, appropriate relaxation of indicator parameters is needed to reduce unnecessary trading.

Another risk lies in the false signals of the moving averages. When prices experience sharp fluctuations, the actual trend may not change, but the moving average can still give wrong signals. This is when RSI extreme value filtering needs to be relied on to avoid chasing tops and bottoms. The RSI parameters can be tested and optimized to make the filtering more strict.

## Optimization Directions 

The following aspects of the strategy can be further optimized:

1. Add other indicators for filtering, such as KD, MACD etc, to determine the actual market trend based on multiple indicators, avoiding false signals.  

2. Optimize moving average parameters by testing different cycle parameters for performance impact.

3. Optimize stop loss and take profit parameters to appropriately expand stop loss range to reduce the probability of being stopped out.  

4. Add trading session filters to take positions only during active trading hours to minimize overnight risks.

5. Add intraday cycle and empty warehouse filters to reduce unnecessary trading frequency and expense costs.

## Conclusion

In summary, this is a typical short-term tracking strategy. It utilizes the golden/death cross combinations of moving averages to determine short-term trends, supplemented by RSI indicators to filter false signals. The strategy has the advantage of high frequency intraday trading that can fully capture short-term price fluctuations. But it also has certain risks of false signals and excessive trading. Further improvements can be made through parameter optimization and integrating more indicators to enhance the steady profitability of the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|200|(?Parameters)Long Term SMA Period|
|v_input_int_2|21|Short Term SMA Period|
|v_input_int_3|true|Take Profit Percentage|
|v_input_1|timestamp(01 Jan 2000 13:30 +0000)|(?Period)Start Trade Day|
|v_input_2|timestamp(1 Jan 2099 19:30 +0000)|End Trade Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-27 00:00:00
end: 2024-02-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("simple pull back", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input values
malongperiod = input.int(200, "Long Term SMA Period", group="Parameters")
mashortperiod = input.int(21, "Short Term SMA Period", group="Parameters")
stoprate = 1  // Set the stop loss percentage to 1%
profit = input.int(1, "Take Profit Percentage", group="Parameters") // Change the take profit percentage to 1%
startday = input(title="Start Trade Day", defval=timestamp("01 Jan 2000 13:30 +0000"), group="Period")
endday = input(title="End Trade Day", defval=timestamp("1 Jan 2099 19:30 +0000"), group="Period")

// Plotting indicators
malong = ta.sma(close, malongperiod)
mashort = ta.ema(close, mashortperiod)

plot(malong, color=color.aqua, linewidth=2)
plot(mashort, color=color.yellow, linewidth=2)

// Date range
datefilter = true

// Long entry condition
if close > malong and close < mashort and strategy.position_size == 0 and datefilter and ta.rsi(close, 3) < 20
    strategy.entry("Long", strategy.long)

// Short entry condition
if close < malong and close > mashort and strategy.position_size == 0 and datefilter and ta.rsi(close, 3) > 80
    strategy.entry("Short", strategy.short)

// Exit conditions with 1% stop loss and 1% take profit
strategy.exit("Cut", "Long", stop=(1 - 0.01 * stoprate) * strategy.position_avg_price, limit=(1 + 0.01 * profit) * strategy.position_avg_price)

if close > mashort and close < low[1] and strategy.position_size > 0
    strategy.close("Long")
if close < mashort and close > high[1] and strategy.position_size < 0
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/442973

> Last Modified

2024-02-27 17:46:55
