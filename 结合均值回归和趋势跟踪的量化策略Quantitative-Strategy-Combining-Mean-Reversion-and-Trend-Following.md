
> Name

结合均值回归和趋势跟踪的量化策略Quantitative-Strategy-Combining-Mean-Reversion-and-Trend-Following

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种同时运用均值回归和趋势跟踪技术的量化交易策略。该策略旨在趋势行情中进行反向交易,以及跟踪趋势进行同向交易。

一、策略原理

该策略主要通过简单移动平均线和RSI指标产生交易信号:

1. 当价格低于200周期移动平均线时,判断目前处于下行阶段;

2. 当RSI指标低于20时,进行逆势的均值回归交易; 

3. 当价格高于200周期移动平均线时,判断目前处于上行阶段;

4. 当价格上穿移动平均线时,进行顺势的趋势跟踪交易。

5. 平仓条件为RSI高于80或价格跌破移动平均线一定幅度。

6. 可分别设置均值回归和趋势跟踪的交易仓位。

该策略综合运用均值回归和趋势跟踪技术,在不同阶段进行适当操作。

二、策略优势

该策略主要具有以下优势:

1. 结合两种不同技术,可以提高策略的适应性;

2. 在趋势和震荡市场中均可找到交易机会;

3. 可以通过调整仓位控制不同模式下的风险。

4. 参数设置简单,易于实施。

三、潜在风险

但该策略也存在以下风险:

1. 移动平均线和RSI等指标易受假突破影响;

2. 两种交易模式的切换可能存在滞后;

3. 需要付出一定回撤以获取长期收益。

四、内容总结

本文详细介绍了一种利用均值回归和趋势跟踪技术的量化交易策略。该策略可以在不同市场阶段进行交易,提高适应性。但也需要防范指标失效和模式切换滞后的风险。总体来说,它提供了一种灵活结合不同技术的策略思路。

||

This article explains in detail a quantitative trading strategy that combines both mean reversion and trend following techniques. It aims to trade counter-trend during trending markets and ride the momentum during trending markets.

I. Strategy Logic  

The strategy mainly uses Simple Moving Average and RSI indicator to generate trading signals:

1. When price is below 200-period SMA, it judges the current market as downtrend.

2. When RSI is below 20, it takes counter-trend mean reversion trades.

3. When price is above 200-period SMA, it judges the current market as uptrend. 

4. When price crosses above SMA, it takes trend-following trades.

5. Exits are triggered when RSI exceeds 80 or price drops below SMA by a certain percentage.

6. Position sizing for mean reversion and trend following can be adjusted separately. 

The strategy combines mean reversion and trend following techniques and applies them in different market stages.

II. Advantages of the Strategy

The main advantages are:

1. Combining two techniques improves strategy adaptiveness.

2. It can find trading opportunities in trending and ranging markets.

3. Risks can be controlled by adjusting position sizing. 

4. Simple parameter settings make it easy to implement.

III. Potential Risks

However, the risks are:

1. Indicators like SMA and RSI are susceptible to false breakouts.

2. Switching between two modes may lag. 

3. Certain drawdowns need to be endured for long term gains.

IV. Summary  

In summary, this article has explained a quantitative strategy utilizing mean reversion and trend following techniques. It can trade in different market stages to improve adaptiveness. But risks like indicator failure and delayed mode switching need to be managed. Overall, it provides a flexible approach to combine different techniques.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(1 Feb 2000 12:00)|Starting Date|
|v_input_bool_1|true|enableMeanReversion|
|v_input_bool_2|true|enableTrendfollowing|
|v_input_float_1|true|trendPositionFactor|
|v_input_float_2|0.5|meanReversionPositionFactor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2023-04-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © I11L

//@version=5
strategy("Mean Reversion and Trendfollowing", overlay=true, pyramiding=1, default_qty_value=100000, initial_capital=100000, default_qty_type=strategy.cash, process_orders_on_close=false, calc_on_every_tick=false)

// Input for the starting date
start_date = input(timestamp("1 Feb 2000 12:00"), title="Starting Date")
enableMeanReversion = input.bool(true)
enableTrendfollowing = input.bool(true)
trendPositionFactor = input.float(1)
meanReversionPositionFactor = input.float(0.5)

// Convert the input string to a timestamp
start_ts = timestamp(year(start_date), month(start_date), dayofmonth(start_date), 0, 0)

// Check if the current bar's time is greater than or equal to the start timestamp
start_condition = time >= start_ts

var tradeOrigin = ""

sma200 = ta.sma(close,200)
rsi2 = ta.rsi(close,2)

isMeanReversionMode = close < sma200 or not(enableTrendfollowing)
isTrendfollowingMode = close > sma200 or not(enableMeanReversion)

isRsiBuy = rsi2 < 20 and enableMeanReversion
isRsiClose = rsi2 > 80 and enableMeanReversion

isSmaBuy = close > sma200 and enableTrendfollowing
isSmaClose = close < sma200 * 0.95 and enableTrendfollowing

isBuy = (isMeanReversionMode and isRsiBuy) or (isTrendfollowingMode and isSmaBuy)

positionSizeFactor = isSmaBuy ? trendPositionFactor : meanReversionPositionFactor

// Only execute the strategy after the starting date
if (start_condition)
    if (isBuy and strategy.opentrades == 0)
        tradeOrigin := isSmaBuy ? "SMA" : "RSI"
        strategy.entry("My Long Entry Id", strategy.long, qty=(strategy.equity / close) * positionSizeFactor, comment=str.tostring(positionSizeFactor))
    isClose = tradeOrigin == "SMA" ? isSmaClose : isRsiClose
    if (isClose)
        strategy.exit("Exit", limit = close)

plot(sma200)
plot(sma200 * 0.95, color=color.orange)
```

> Detail

https://www.fmz.com/strategy/426856

> Last Modified

2023-09-14 20:45:20
