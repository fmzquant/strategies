
> Name

交易黄金时段策略Golden-Trade-Hour-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
## 概述

交易黄金时段策略通过历史数据回测,自动判断每天哪个时段最适合买入和卖出,并在对应的时段发出交易信号。该策略利用ROC指标计算K线在不同时段的涨跌幅度,进而评估不同时段的交易效果,找出最佳买入和卖出时段。

## 策略原理

1. 使用现有时间得到当前小时数now_hour。

2. 使用ROC指标计算出每小时的K线涨跌幅度indicator。

3. 计算indicator与now_hour的累积乘积buy_hourXindicator_cum。

4. 计算indicator的累积和buy_indicator_cum。

5. 最佳买入时段buy_hour = buy_hourXindicator_cum / buy_indicator_cum。

6. 同理计算最佳卖出时段sell_hour。

7. 比较now_hour与buy_hour和sell_hour,判断当前时段是否最佳买入或卖出时段。

8. 在最佳买入和卖出时段发出对应的信号。

9. 用不同背景颜色实时显示最佳买入卖出时段。

## 优势分析

该策略最大的优势是能够自动判断每天最适合交易的时段。不需要人工观察历史数据来判断最佳交易时段,节省大量时间和精力。同时,该策略可以根据实时数据调整最佳交易时段,对市场变化做出快速反应。相比固定的交易时段,该策略更具优势。

另外,该策略有效利用了ROC指标。通过计算每小时K线的涨跌幅度,可以更准确判断不同时段的交易效果。ROC指标对异方波动较敏感,能反映市场变化。

## 风险分析

该策略最大的风险在于ROC指标本身的局限性。ROC仅考虑价格变化率,对交易量变化不敏感。同时ROC对盘整范围窄的市场效果不好。如果遇到横盘整理的市场,ROC指标效果会打折扣。

此外,策略用于回测历史数据求出最佳交易时段。但历史规律未必适用于当前市场。市场可能发生结构性变化,原有的交易规律不再适用。这需要针对当前市场行情调整参数,而不能完全依赖回测结果。

对此,可以考虑结合其他指标进行复合计算,如交易量,获得更全面的市场状态判断。同时需要针对当前市场行情进行参数调整测试,确保交易信号符合新的市场状态。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 尝试其他指标替换ROC指标,如交易量,寻找更合适的指标计算时段强弱。

2. 增加其他过滤条件,利用均线,震荡指标等判断局部趋势,避免不合理交易。

3. 优化时间周期参数,测试不同的时间周期参数对结果的影响。

4. 增加止损机制,设置合理的止损点,控制交易风险。

5. 结合机器学习方法,利用更大数据量求解最优交易时段。

## 总结

该交易黄金时段策略总体来说是一种可行且有效的方法。它利用ROC指标自动判断每天最佳的买入卖出时段,节省大量时间和精力。但我们也要注意ROC指标和历史回测的局限性,针对当前市场行情调整参数。此外,该策略还有很多提升空间,可以从多方面进行优化,使得信号更加准确可靠。如果用于实盘,建议严格遵守止损规则,控制交易风险。

|| 

## Overview

The golden trade hour strategy automatically determines the best hours to buy and sell each day by backtesting historical data. It utilizes the ROC indicator to calculate the rise and fall percentage of candlesticks in different hours and thereby evaluate the trading performance to find the optimal buy and sell hours.

## Strategy Principle  

1. Use the current time to get the current hour now_hour.

2. Use the ROC indicator to calculate the hourly rise and fall percentage of candlesticks indicator.

3. Calculate the cumulative product of indicator and now_hour as buy_hourXindicator_cum. 

4. Calculate the cumulative sum of indicator as buy_indicator_cum.

5. The best buy hour buy_hour = buy_hourXindicator_cum / buy_indicator_cum.

6. Similarly calculate the best sell hour sell_hour.  

7. Compare now_hour with buy_hour and sell_hour to determine if the current hour is the optimal buy or sell hour.

8. Send corresponding signals during the optimal buy and sell hours.

9. Use different background colors to display the optimal buy and sell hours in real time.

## Advantage Analysis

The biggest advantage of this strategy is the ability to automatically determine the best trading hours of the day. It saves a lot of time and effort from manually observing historical data to judge the optimal trading hours. Also, the strategy can adjust the optimal trading hours in real time based on live data to respond quickly to market changes. This strategy has more advantages compared to fixed trading hours.

In addition, the strategy makes good use of the ROC indicator. By calculating the hourly rise and fall percentage of candlesticks, it can more accurately judge the trading performance of different periods. The ROC indicator is sensitive to asymmetric fluctuations and can reflect market changes.

## Risk Analysis

The biggest risk of this strategy lies in the limitations of the ROC indicator itself. ROC only considers price changes and is insensitive to changes in trading volume. Also, ROC does not perform well in range-bound markets with narrow bands. If encountering sideways range-bound markets, the effectiveness of the ROC indicator will be discounted.

In addition, the strategy uses backtesting of historical data to determine the optimal trading hours. But historical patterns may not apply to the current market. Structural changes may occur in the market, and original trading rules may no longer apply. This requires adjusting parameters based on current market conditions rather than purely relying on backtesting results.

To address this, we can consider combining other indicators such as trading volume to obtain a more comprehensive judgment of market conditions. Also we need to test parameter adjustments based on current market conditions to ensure trading signals align with new market states.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Try other indicators to replace the ROC indicator, such as trading volume, to find more suitable indicators for calculating hourly strength and weakness.

2. Add other filtering conditions using moving averages, oscillators etc to judge local trends and avoid unreasonable trading. 

3. Optimize the time period parameters and test the impact of different time periods on results.

4. Add stop loss mechanisms and set reasonable stop loss points to control trading risks.

5. Combine machine learning methods and larger data sets to solve the optimal trading hours.

## Summary

In summary, the golden trade hour strategy is a feasible and effective approach. It uses the ROC indicator to automatically determine the optimal intraday buy and sell hours, saving much time and effort. But we should also note the limitations of the ROC indicator and historical backtesting, and adjust parameters based on current market conditions. Furthermore, there is still much room for improvement by optimizing this strategy in many aspects to generate more accurate and reliable signals. If used for live trading, it is recommended to strictly follow stop loss rules to control trading risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|timezone: Europe/London|America/Los_Angeles|America/Chicago|America/Phoenix|America/Toronto|America/Vancouver|America/Argentina|America/El_Salvador|America/Sao_Paulo|America/Bogota|Europe/Moscow|Europe/Athens|Europe/Berlin|America/New_York|Europe/Madrid|Europe/Paris|Europe/Warsaw|Australia/Sydney|Australia/Brisbane|Australia/Adelaide|Australia/ACT|Asia/Almaty|Asia/Ashkhabad|Asia/Tokyo|Asia/Taipei|Asia/Singapore|Asia/Shanghai|Asia/Seoul|Asia/Tehran|Asia/Dubai|Asia/Kolkata|Asia/Hong_Kong|Asia/Bangkok|Pacific/Auckland|Pacific/Chatham|Pacific/Fakaofo|Pacific/Honolulu|
|v_input_source_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|true|ROC Timeperiod|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mablue (Masoud Azizi)

//@version=5
strategy("Trade Hour V3",overlay=false)
timezone = input.string("Europe/London",options=["America/New_York","America/Los_Angeles","America/Chicago","America/Phoenix","America/Toronto","America/Vancouver","America/Argentina" ,"America/El_Salvador","America/Sao_Paulo","America/Bogota","Europe/Moscow","Europe/Athens","Europe/Berlin","Europe/London","Europe/Madrid","Europe/Paris","Europe/Warsaw","Australia/Sydney","Australia/Brisbane","Australia/Adelaide","Australia/ACT","Asia/Almaty","Asia/Ashkhabad","Asia/Tokyo","Asia/Taipei","Asia/Singapore","Asia/Shanghai","Asia/Seoul","Asia/Tehran","Asia/Dubai","Asia/Kolkata","Asia/Hong_Kong","Asia/Bangkok","Pacific/Auckland","Pacific/Chatham","Pacific/Fakaofo","Pacific/Honolulu"]	)
source = input.source(close)
tp = input.int(1,"ROC Timeperiod")

now_hour = hour(time,timezone)

indicator = ta.roc(source,tp)

buy_hourXindicator_cum = ta.cum(indicator* now_hour)
buy_indicator_cum = ta.cum(indicator)
buy_hour = buy_hourXindicator_cum/buy_indicator_cum

sell_hourXindicator_cum = ta.cum( (1/indicator ) * now_hour)
sell_indicator_cum = ta.cum(1/indicator)
sell_hour = sell_hourXindicator_cum/sell_indicator_cum

plot(buy_hour,color=color.green)
plot(sell_hour,color=color.red)
plot(now_hour,color=color.gray,display=display.none)


bool isLongBestHour = now_hour==math.round(buy_hour)
bool isShortBestHour = now_hour==math.round(sell_hour)

bgcolor(isLongBestHour ? color.new(color.green,80) : na)
bgcolor(isShortBestHour ? color.new(color.red,80) : na)
strategy.order("buy", strategy.long, when =isLongBestHour)
strategy.order("sell", strategy.short, when = isShortBestHour)
```

> Detail

https://www.fmz.com/strategy/427263

> Last Modified

2023-09-19 16:03:52
