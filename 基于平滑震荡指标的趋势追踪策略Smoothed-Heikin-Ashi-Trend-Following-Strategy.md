
> Name

基于平滑震荡指标的趋势追踪策略Smoothed-Heikin-Ashi-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/125f998bbb33dbf8404.png)
[trans]

## 概述

该策略基于平滑震荡指标来识别价格趋势,并采用趋势追踪方式进行交易。当价格突破指标线时做多头,当价格跌破指标线时做空头。

## 策略原理

该策略使用自定义的平滑震荡指标来识别价格趋势。指标计算当前K线的反转收盘价,即能使盈亏和轨迹图颜色发生反转的理论价格。然后对该反转收盘价进行平滑处理,得到最终的平滑震荡指标线。当价格高于(低于)指标线时,表示行情处于上升(下跌)趋势。

策略以突破指标线作为建仓信号。当价格突破指标线时做多,当价格跌破指标线时做空。止损线设置为入场价的一定百分比,以锁定利润并控制风险。

## 策略优势

1. 使用自定义指标识别趋势,回测表现较好
2. 采用趋势追踪,大致符合量化趋势交易理论
3. 设置止损有利于风险控制

## 风险分析

1. 指标存在一定程度回溯,可能导致策略表现不佳
2. 仅基于单一指标,容易产生错误信号
3. 止损设置存在优化空间,可能出现超止损现象

## 优化方向

1. 考虑结合其他指标过滤交易信号,如布林带、RSI等
2. 测试不同的指标参数设置
3. 对止损方式进行测试和优化
4. 更多测试不同品种和周期的数据

## 总结

该策略整体思路清晰,采用自定义指标识别趋势并以趋势追踪的方式进行交易。从回测结果来看,策略表现较好,具有一定的实盘运用潜力。但仅依赖单一指标且存在一定回溯,信号质量仍待验证。此外,止损机制也需要进一步测试和优化。总的来说,该策略概念可行,但仍需做更多工作来提升实盘运用能力。

|| 

## Overview

This strategy identifies price trends using a custom smoothed oscillator indicator and trades based on trend following principles. It goes long when price breaks above the indicator line and goes short when price breaks below the line. 

## Strategy Logic

The strategy employs a custom smoothed oscillator that computes the reverse close price required to flip the Heikin Ashi candle color from red to green and vice versa. This reverse close is then smoothed using moving averages to obtain the final oscillator line. Price trading above (below) the line signals an uptrend (downtrend).

The strategy enters trades based on breakouts of the indicator line. Long trades are initiated when price breaks above the line while short trades are initiated on breakdowns below the line. Stop losses are set at a fixed percentage from the entry price to lock in profits and control risk.

## Advantages

1. Custom indicator identifies trends with good backtest results 
2. Trend following approach aligns with quantitative theories
3. Stop loss implementation promotes risk management

## Risks

1. Potential for repainting leading to poor live performance
2. Reliance on a single indicator risks bad signals  
3. Stop loss setting requires further optimization 

## Enhancement Opportunities

1. Incorporate additional filters like Bollinger Bands, RSI etc. 
2. Test different indicator parameters
3. Optimize stop loss placement  
4. More testing across instruments and timeframes

## Conclusion

The strategy demonstrates a clear trend following approach using a custom oscillator indicator. Backtest results are encouraging, indicating potential for live trading. However sole dependence on one repainting indicator and lack of signal quality verification are concerns. Stop loss mechanics also require additional testing and tuning. Overall the strategy concept looks feasible but more work is needed to make it reliably deployable for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use smoothing Heikin Ashi|
|v_input_string_1|0|Method: SMA|EMA|HMA|VWMA|RMA|
|v_input_2|10|Smoothing period|
|v_input_3|true|Show Info Box|
|v_input_4|2|Prices Decimal Places|
|v_input_5|5|Info Box Offset|
|v_input_6|false|Repaint -  Keep on for live / Off for backtest|
|v_input_float_1|true|Long Stop Loss (%)|
|v_input_float_2|true|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-19 00:00:00
end: 2023-12-26 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// © TraderHalai
// This is a backtest of the Smoothed Heikin Ashi Trend indicator, which computes the reverse candle close price required to flip a heikin ashi trend from red to green and vice versa. Original indicator can be found on the scripts section of my profile.

// Default testing parameters are 10% of equity position size, with a 1% stop loss on short and long strategy.opentrades.commission

// This particular back test uses this indicator as a Trend trading tool with a tight stop loss. The equity curve as tested seems promising but requires further work to refine. Note in an actual trading setup, you may wish to use this with volatilty filters as most of the losses are in sideways, low volatility markets.


//@version=5
strategy("Smoothed Heikin Ashi Trend on Chart - TraderHalai BACKTEST", " SHA Trend - BACKTEST", overlay=true)
//Inputs

i_useSmooth =       input ( true, "Use smoothing Heikin Ashi")
i_smoothingMethod = input.string("SMA", "Method", options=["SMA", "EMA", "HMA", "VWMA", "RMA"])
i_smoothingPeriod = input ( 10, "Smoothing period")

i_infoBox   =       input ( true, "Show Info Box"        )
i_decimalP  =       input ( 2,    "Prices Decimal Places") 
i_boxOffSet =       input ( 5,    "Info Box Offset"      )
i_repaint   =       input (false,  "Repaint -  Keep on for live / Off for backtest")

i_longLossPerc = input.float(title="Long Stop Loss (%)",minval=0.0, step=0.1, defval=1) * 0.01

i_shortLossPerc = input.float(title="Short Stop Loss (%)", minval=0.0, step=0.1, defval=1) * 0.01


timeperiod = timeframe.period

//Security functions to avoid repaint, as per PineCoders
f_secureSecurity(_symbol, _res, _src) => request.security(_symbol, _res, _src[1], lookahead = barmerge.lookahead_on)
f_security(_symbol, _res, _src, _repaint) => request.security(_symbol, _res, _src[_repaint ? 0 : barstate.isrealtime ? 1 : 0])[_repaint ? 0 : barstate.isrealtime ? 0 : 1]
f_secSecurity2(_symbol, _res, _src) => request.security(_symbol, _res, _src[1])


candleClose = f_security(syminfo.tickerid, timeperiod, close, i_repaint)
candleOpen = f_security(syminfo.tickerid, timeperiod, open, i_repaint)
candleLow = f_security(syminfo.tickerid, timeperiod, low, i_repaint)
candleHigh = f_security(syminfo.tickerid, timeperiod, high, i_repaint)

haTicker = ticker.heikinashi(syminfo.tickerid)
haClose = f_security(haTicker, timeperiod, close, i_repaint)
haOpen = f_security(haTicker, timeperiod, open, i_repaint)
haLow = f_security(haTicker, timeperiod, low, i_repaint)
haHigh= f_security(haTicker, timeperiod, high, i_repaint)


reverseClose = (2 * (haOpen[1] + haClose[1])) - candleHigh - candleLow - candleOpen

if(reverseClose < candleLow)
    reverseClose := (candleLow + reverseClose) / 2

if(reverseClose > candleHigh)
    reverseClose := (candleHigh + reverseClose) / 2
    
//Smoothing
    
smaSmoothed = ta.sma(reverseClose, i_smoothingPeriod)
emaSmoothed = ta.ema(reverseClose, i_smoothingPeriod)
hmaSmoothed = ta.hma(reverseClose, i_smoothingPeriod)
vwmaSmoothed = ta.vwma(reverseClose, i_smoothingPeriod)
rmaSmoothed = ta.rma(reverseClose, i_smoothingPeriod)

shouldApplySmoothing = i_useSmooth and i_smoothingPeriod > 1 

smoothedReverseClose = reverseClose

if(shouldApplySmoothing)
    if(i_smoothingMethod == "SMA")
        smoothedReverseClose := smaSmoothed
    else if(i_smoothingMethod == "EMA")
        smoothedReverseClose := emaSmoothed
    else if(i_smoothingMethod == "HMA")
        smoothedReverseClose := hmaSmoothed
    else if(i_smoothingMethod == "VWMA")
        smoothedReverseClose := vwmaSmoothed
    else if(i_smoothingMethod == "RMA")
        smoothedReverseClose := rmaSmoothed
    else 
        smoothedReverseClose := reverseClose // Default to non-smoothed for invalid smoothing type
    
haBull = candleClose >= smoothedReverseClose
haCol = haBull ? color.green : color.red


//Overall trading strategy
if(ta.crossover(candleClose, smoothedReverseClose))
    strategy.entry("LONG", strategy.long, stop=smoothedReverseClose)
else
    strategy.cancel("LONG")

if(ta.crossunder(candleClose, smoothedReverseClose))
    strategy.entry("SHORT", strategy.short, stop=smoothedReverseClose)
else
    strategy.cancel("SHORT")
    

longStopPrice  = strategy.position_avg_price * (1 - i_longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + i_shortLossPerc)



plot(series=(strategy.position_size > 0) ? longStopPrice : na,
     color=color.red, style=plot.style_cross,
     linewidth=2, title="Long Stop Loss")
plot(series=(strategy.position_size < 0) ? shortStopPrice : na,
     color=color.red, style=plot.style_cross,
     linewidth=2, title="Short Stop Loss")
     
plot(smoothedReverseClose, color=haCol)

if (strategy.position_size > 0)
    strategy.exit(id="XL STP", stop=longStopPrice)

if (strategy.position_size < 0)
    strategy.exit(id="XS STP", stop=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/436768

> Last Modified

2023-12-27 15:41:37
