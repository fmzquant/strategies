
> Name

基于AlphaTrend的跨期策略AlphaTrend-Cross-Period-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy is based on the AlphaTrend indicator, which combines the advantages of RSI and MFI indicators and can achieve good results in both bullish and bearish trending markets. The strategy mainly judges the direction of the trend by whether the price breaks through the AlphaTrend curve.

## Strategy Logic

1. Calculate the ATR indicator to measure market volatility
2. Use RSI to determine market direction if no volume data; use MFI if volume data exists
3. Calculate upper and lower bands based on ATR and market direction
4. Compute AlphaTrend curve, which incorporates dynamic upper and lower bands
5. Generate buy and sell signals when price crosses above or below the AlphaTrend curve

The strategy relies mainly on the AlphaTrend curve to determine the price trend direction. It takes into account ATR, RSI/MFI, and can track the trend effectively. When price penetrates the curve, it signals a change in the trend and forms the entry point.

## Advantages

1. AlphaTrend combines the strengths of RSI and MFI, adaptable to both bull and bear markets
2. Dynamic upper and lower bands automatically adjust based on market volatility
3. Incorporates both price and volume information, avoiding false signals  
4. Breakout approach clearly identifies trend direction
5. Simple and easy to understand logic

In summary, this strategy works for both bullish and bearish markets, filters out market noise effectively, identifies trends accurately, and is an efficient trend following strategy.

## Risks

1. AlphaTrend curve may have false breakouts, requiring confirmation from other indicators
2. Many false signals may occur during market consolidation
3. Ineffective results from poor parameter tuning
4. Stop loss may be taken out during spikes, incurring large losses

To address the risks, stop loss can control single trade loss; combine with other indicators to avoid false signals; adjust parameters based on different markets.

## Enhancement Opportunities 

1. Test different parameter combinations for optimized settings
2. Incorporate other indicators to form confirmation conditions
3. Employ dynamic or trailing stop loss to control risks
4. Trade on different timeframes (5m, 15m, etc) based on market conditions
5. Refine entry timing system for more precise entry

Further optimizations can be done by testing on different markets and parameters so that the strategy is adaptable to more market conditions.

## Conclusion

Overall this AlphaTrend strategy is a simple and efficient trend following system. It incorporates both price and volume information to adapt to bullish and bearish markets. The breakout mechanism provides clear entry signals. With proper risk control, it can achieve good results. Further testing and enhancement can help stabilize its profitability over more market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|1.5|Multiplier|
|v_input_1|15|Common Period|
|v_input_2|false|Change calculation (no volume data)?|
|v_input_3|timestamp(01 Jan 2014 00:00 +0000)|(?Backtesting)Backtesting Start Time|
|v_input_4|timestamp(01 Jan 2100 23:59 +0000)|Backtesting End Time|
|v_input_string_1||(?PV Settings)Exchange|
|v_input_string_2||Symbol|
|v_input_string_3||Account|
|v_input_string_4||PV Alert Name Longs|
|v_input_string_5||PV Alert Name Shorts|
|v_input_bool_1|false|Test Alerts|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-26 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// author © KivancOzbilgic
// developer © KivancOzbilgic
// pv additions, simplification and strategy conversion @ treigen
//@version=5
strategy('AlphaTrend For ProfitView', overlay=true, calc_on_every_tick=true, process_orders_on_close=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1, initial_capital=1000)
coeff = input.float(1.5, 'Multiplier', step=0.1)
AP = input(15, 'Common Period')
ATR = ta.sma(ta.tr, AP)
novolumedata = input(title='Change calculation (no volume data)?', defval=false)

i_startTime = input(defval = timestamp("01 Jan 2014 00:00 +0000"), title = "Backtesting Start Time", inline="timestart", group='Backtesting')
i_endTime = input(defval = timestamp("01 Jan 2100 23:59 +0000"), title = "Backtesting End Time", inline="timeend", group='Backtesting')
timeCond = true

pv_ex = input.string('', title='Exchange', tooltip='Leave empty to use the chart ticker instead (Warning: May differ from actual market name in some instances)', group='PV Settings')
pv_sym = input.string('', title='Symbol', tooltip='Leave empty to use the chart ticker instead (Warning: May differ from actual market name in some instances)', group='PV Settings')
pv_acc = input.string("", title="Account", group='PV Settings')
pv_alert_long = input.string("", title="PV Alert Name Longs", group='PV Settings')
pv_alert_short = input.string("", title="PV Alert Name Shorts", group='PV Settings')
pv_alert_test = input.bool(false, title="Test Alerts", tooltip="Will immediately execute the alerts, so you may see what it sends. The first line on these test alerts will be excluded from any real alert triggers" ,group='PV Settings')

upT = low - ATR * coeff
downT = high + ATR * coeff
AlphaTrend = 0.0
AlphaTrend := (novolumedata ? ta.rsi(close, AP) >= 50 : ta.mfi(hlc3, AP) >= 50) ? upT < nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : upT : downT > nz(AlphaTrend[1]) ? nz(AlphaTrend[1]) : downT


k1 = plot(AlphaTrend, color=color.new(#0022FC, 0), linewidth=3)
k2 = plot(AlphaTrend[2], color=color.new(#FC0400, 0), linewidth=3)

buySignalk = ta.crossover(AlphaTrend, AlphaTrend[2])
sellSignalk = ta.crossunder(AlphaTrend, AlphaTrend[2])

var exsym = ""
if barstate.isfirst
    exsym := pv_ex == "" ? "" : "ex=" + pv_ex + ","
    exsym := pv_sym == "" ? exsym : exsym + "sym=" + pv_sym + ","


if barstate.isconfirmed and timeCond 
    if strategy.position_size <= 0 and buySignalk
        strategy.entry("Buy", strategy.long)
        alert(pv_alert_long + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar_close)
    if strategy.position_size >= 0 and sellSignalk
        strategy.entry("Sell", strategy.short)
        alert(pv_alert_short + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar_close)


//  Only used for testing/debugging alert messages
if pv_alert_test
    alert("<![Alert Test]!>\n" + pv_alert_long + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar)
    alert("<![Alert Test]!>\n" + pv_alert_short + "(" + exsym + "acc=" + pv_acc + ")", alert.freq_once_per_bar)

```

> Detail

https://www.fmz.com/strategy/428055

> Last Modified

2023-09-28 11:05:27
