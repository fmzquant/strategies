
> Name

Golden-Cross-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4d231ecf1382eaf502.png)


## Overview

This strategy generates trading signals based on the golden cross of short-term and long-term moving averages to determine entry points, and sets stop loss points to exit positions. It is a typical trend following strategy. It is suitable for markets with obvious upward trends, allowing it to follow the trend and profit from upward momentum, and exit promptly when the trend reverses.

## Strategy Logic

The strategy mainly uses the crossover of short-term and long-term moving averages to determine market trend. The logic is as follows:

1. Calculate 3-day simple moving average short_ma as the short-term moving average.

2. Calculate 19-day simple moving average long_ma as the long-term moving average.

3. When short_ma crosses above long_ma, a long signal is generated. 

4. When price rises above entry price * (1 + stop loss %), close all positions. 

5. When short_ma crosses below long_ma, a short signal is generated.

6. Backtest within a specific date range to limit the strategy's operation period.

7. Trade only when the 100-day moving average trend_ma suggests an upward trend.

The strategy utilizes the golden cross of moving averages. During a sustained uptrend, long signals generated when short_ma crosses above long_ma allow it to capture opportunities. Short signals when short_ma crosses below long_ma help manage risks.

## Advantage Analysis 

The advantages of this strategy:

1. Simple and easy to understand logic based on moving average crossovers.

2. Clear entry and exit rules that follow the trend and manage risks.

3. Stop loss to lock in profits when trend reverses.

4. Only trade when overall trend is up to avoid false signals.

5. Customizable moving average periods adaptable to different markets. 

6. Backtest over specific periods allows validation.

## Risk Analysis

The risks of this strategy:

1. Sensitive to parameter tuning, different settings affect performance.

2. Curve fitted to historical data, ineffective in anomalies.

3. Unable to handle price gaps, risks exceeding stop loss. 

4. Prone to being whipsawed in ranging markets.

5. Only works in obvious trending markets, not for sideways.

6. Backtest period selection influences results.

## Enhancement Opportunities

The strategy can be improved in the following aspects:

1. Test different parameter sets to find optimum values.

2. Incorporate other indicators like MACD, Bollinger Bands to improve decisions.

3. Use dynamic trailing stop loss to better control risks.

4. Optimize entry, exit logic, like breakout entry.

5. Test robustness across different market conditions. 

6. Explore machine learning for parameter tuning and signal generation.

7. Add handling of price gaps and stop loss whipsaw scenarios.

## Conclusion

This simple and effective strategy captures uptrends using moving average crosses and manages risk via stop loss. It performs well in strong trending markets but has limitations. Further optimization and testing is needed to improve robustness. Overall it has clear logic, is easy to understand and implement, suitable for beginners to learn.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|단기 이평|
|v_input_int_2|19|장기 이평|
|v_input_float_1|3|최소수익률%|
|v_input_int_3|100|(?추세 이평) 추세 이평|
|v_input_bool_1|true|추세용 이평 사용|
|v_input_bool_2|true|(?기간 백테스트)특정 기간 백테스트|
|v_input_1|timestamp(1 Jan 2021)|시작날짜|
|v_input_2|timestamp(1 Jan 2022)|종료날짜|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Ta3MooChi
//@version=5
strategy("전략", overlay=true,process_orders_on_close = true, pyramiding = 100)

short_ma = ta.sma(close,input.int(3, "단기 이평", minval = 1))
long_ma = ta.sma(close, input.int(19,"장기 이평", minval = 1))

trend_ma = ta.sma(close, input.int(100," 추세 이평", minval = 20, group = "추세 이평"))
up_trend = (trend_ma > trend_ma[1])
use_trend_ma = input.bool(true, title = "추세용 이평 사용", group = "추세 이평" )
inTrendMa = not use_trend_ma or up_trend

useDateFilter = input.bool(true, title = "특정 기간 백테스트", group = "기간 백테스트")
backtestStartDate = input(timestamp("1 Jan 2021"), title = "시작날짜", group = "기간 백테스트")
backtestEndDate = input(timestamp("1 Jan 2022"), title = "종료날짜", group = "기간 백테스트")
inTradeWindow = true

longStopPerc = 1 + input.float(3, "최소수익률%", minval = 1)*0.01

longcondition = ta.crossover(short_ma, long_ma)
shortcondition = ta.crossunder(short_ma, long_ma)

if (longcondition) and inTradeWindow and inTrendMa
    strategy.entry("long", strategy.long)

if (shortcondition) and (close > strategy.position_avg_price*longStopPerc) and inTradeWindow
    strategy.close_all()

if not inTradeWindow and inTradeWindow[1]
    strategy.cancel_all()
    strategy.close_all(comment = "매매 종료")

plot(short_ma,color = color.yellow)
plot(long_ma,color = color.blue)
plot(trend_ma,color = color.gray)
    


```

> Detail

https://www.fmz.com/strategy/430773

> Last Modified

2023-11-01 17:02:14
