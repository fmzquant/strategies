
> Name

双向ATR波浪交易策略Dual-ATR-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/142b2a7468e6ecec468.png)

[trans]
## 概述

双向ATR波浪交易策略是一种趋势跟踪策略,结合均线、ATR和多个技术指标,在趋势方向建立之后进行趋势跟踪交易。

## 策略原理

该策略使用Kijun线作为主要的均线指标,判断价格趋势方向。策略同时结合ATR通道,限制价格活动范围。当价格接近上轨时不做多,当价格接近下轨时不做空,避免追高杀跌。 

当Kijun线发生向上突破时产生买入信号,当发生向下突破时产生卖出信号。为过滤误信号,策略还引入多个技术指标进行确认,包括Aroon指标、RSI指标、MACD指标和PSAR指标。满足所有指标的确认条件时,才生成买入和卖出信号。

入市后,策略采用止损和止盈方式管理仓位。止损点为0.5 ATR,止盈点为0.5%。当价格再次突破Kijun线反向时,选择立即止损退出。

## 策略优势

- 使用Kijun线判断趋势方向,避免被震荡市场套牢
- ATR通道限制价格活动范围,有利控制风险
- 多个技术指标确认,可大幅过滤误信号
- 结合止损止盈风险管理,有利锁定盈利

## 策略风险

- 多个指标确认造成信号延迟,可能错失趋势开始阶段
- 止损点过小可能频繁被止损出场
- Kijun线和ATR参数不合理可能导致频繁错误信号
- 依赖参数优化和历史数据拟合结果,实盘可能效果不佳

## 优化方向

- 尝试更先进的趋势判断指标,如Ichimoku云图等
- 调整止损止盈点,优化盈亏比
- 测试不同市场的最佳参数组合
- 增加自动调参功能,根据实时市场调整参数
- 测试不同Confirmation指标组合的效果

## 总结

双向ATR波浪交易策略综合使用均线、ATR通道以及多个辅助技术指标,在确定趋势方向后进行趋势跟踪操作。相比单一指标策略,可以大大提高信号质量和获利概率。同时止损止盈机制控制风险。通过参数优化和组合测试,该策略可望取得稳定的盈利。但需要注意过于依赖历史数据的问题,实盘效果仍需验证。持续优化是确保策略效果的关键。


||



## Overview

The Dual ATR Channel trend following strategy is a trend tracking strategy that combines moving averages, ATR channels and multiple technical indicators to follow the trend after it has been established. 

## How It Works

The strategy uses the Kijun line as the main moving average indicator to determine the trend direction. It also incorporates ATR channels to limit the price activity range - not going long when price is near the upper band and not going short when price is near the lower band to avoid chasing new highs and selling lows.

When the Kijun line has an upward crossover, a buy signal is generated. When a downward crossover happens, a sell signal is triggered. To filter out false signals, the strategy also employs multiple technical indicators for confirmation, including Aroon, RSI, MACD and PSAR. A buy or sell signal is only triggered when all the confirmation conditions are met.

Once in a trade, the strategy uses stop loss and take profit to manage positions. The stop loss is set at 0.5 ATR and take profit at 0.5%. When the price crosses the Kijun line in the opposite direction again, the position will be closed immediately.

## Advantages

- Using Kijun line to determine trend avoids being whipsawed by range-bound markets
- ATR channels limit price activity for better risk control 
- Multiple confirmations greatly reduce false signals
- Incorporating stop loss and take profit locks in profits while managing risks

## Risks

- Delayed signals from multiple confirmations, possibly missing early trend moves
- Small stop loss may get stopped out frequently  
- Poor Kijun and ATR parameters may generate many wrong signals
- Reliance on parameter optimization and curve fitting, may not work well in live trading

## Improvement Opportunities

- Test more advanced trend indicators like Ichimoku clouds
- Optimize stop loss and take profit points for better risk reward ratio
- Find optimal parameters for different markets
- Add dynamic adjustment of parameters based on live market conditions
- Test different combinations of confirmation indicators  
- Continuously optimize to ensure robustness of strategy

## Conclusion

The dual ATR channel trend following strategy combines moving averages, ATR channels and multiple technical indicators to trade in the direction of the trend once established. Compared to single indicator strategies, it can greatly improve signal quality and win rate. The stop loss and take profit mechanisms also control risk. Through parameter optimization and combinatorial testing, this strategy has the potential to achieve steady profits. But its reliance on historical data is a concern and live performance requires further verification. Continuous optimization is key to ensuring robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Baseline Type: Kijun|EMA|DEMA|TEMA|WMA|VWMA|SMA|SMMA|HMA|LSMA|ALMA|McGinley|
|v_input_2|20|Baseline Length|
|v_input_3|12|Baseline Length Fast|
|v_input_4|false|* Least Squares (LSMA) Only - Offset Value|
|v_input_5|0.85|* Arnaud Legoux (ALMA) Only - Offset Value|
|v_input_6|6|* Arnaud Legoux (ALMA) Only - Sigma Value|
|v_input_7|14|ATR Length|
|v_input_8|true|donttradeoutside_atrcave|
|v_input_9|8|Length Aroon|
|v_input_10|false|dont_use_macd|
|v_input_11|13|Fast Length|
|v_input_12|26|Slow Length|
|v_input_13|9|Signal Smoothing|
|v_input_14|false|dont_use_rsi|
|v_input_15|14|RSI Length|
|v_input_16|false|dont_use_psar|
|v_input_17|0.03|psar_start|
|v_input_18|0.018|psar_increment|
|v_input_19|0.11|psar_maximum|
|v_input_20|false|use_exit|
|v_input_21|0.5|SL|
|v_input_22|0.005|TP|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-27 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy(title="NoNonsense Forex", overlay=true, default_qty_value=100000, initial_capital=100)

//////////////////////
////// BASELINE //////
//////////////////////
ma_slow_type = input(title="Baseline Type", type=input.string, defval="Kijun", options=["ALMA", "EMA", "DEMA", "TEMA", "WMA", "VWMA", "SMA", "SMMA", "HMA", "LSMA", "Kijun", "McGinley"])
ma_slow_src = close //input(title="MA Source", type=input.source, defval=close)
ma_slow_len = input(title="Baseline Length", type=input.integer, defval=20)
ma_slow_len_fast = input(title="Baseline Length Fast", type=input.integer, defval=12)

lsma_offset  = input(defval=0, title="* Least Squares (LSMA) Only - Offset Value", minval=0)
alma_offset  = input(defval=0.85, title="* Arnaud Legoux (ALMA) Only - Offset Value", minval=0, step=0.01)
alma_sigma   = input(defval=6, title="* Arnaud Legoux (ALMA) Only - Sigma Value", minval=0)

ma(type, src, len) =>
    float result = 0
    if type=="SMA" // Simple
        result := sma(src, len)
    if type=="EMA" // Exponential
        result := ema(src, len)
    if type=="DEMA" // Double Exponential
        e = ema(src, len)
        result := 2 * e - ema(e, len)
    if type=="TEMA" // Triple Exponential
        e = ema(src, len)
        result := 3 * (e - ema(e, len)) + ema(ema(e, len), len)
    if type=="WMA" // Weighted
        result := wma(src, len)
    if type=="VWMA" // Volume Weighted
        result := vwma(src, len) 
    if type=="SMMA" // Smoothed
        w = wma(src, len)
        result := na(w[1]) ? sma(src, len) : (w[1] * (len - 1) + src) / len
    if type=="HMA" // Hull
        result := wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))
    if type=="LSMA" // Least Squares
        result := linreg(src, len, lsma_offset)
    if type=="ALMA" // Arnaud Legoux
        result := alma(src, len, alma_offset, alma_sigma)
    if type=="Kijun" //Kijun-sen
        kijun = avg(lowest(len), highest(len))
        result :=kijun
    if type=="McGinley"
        mg = 0.0
        mg := na(mg[1]) ? ema(src, len) : mg[1] + (src - mg[1]) / (len * pow(src/mg[1], 4))
        result :=mg
    result

baseline = ma(ma_slow_type, ma_slow_src, ma_slow_len)
plot(baseline, title='Baseline', color=rising(baseline,1) ? color.green : falling(baseline,1) ? color.maroon : na, linewidth=3)

//////////////////
////// ATR ///////
//////////////////
atrlength=input(14, title="ATR Length")
one_atr=rma(tr(true), atrlength)
upper_atr_band=baseline+one_atr
lower_atr_band=baseline-one_atr
plot(upper_atr_band, color=color.gray, style=plot.style_areabr, transp=95, histbase=50000, title='ATR Cave')
plot(lower_atr_band, color=color.gray, style=plot.style_areabr, transp=95, histbase=0, title='ATR Cave')
plot(upper_atr_band, color=close>upper_atr_band ? color.fuchsia : na, style=plot.style_line, linewidth=5, transp=50, title='Close above ATR cave')
plot(lower_atr_band, color=close<lower_atr_band ? color.fuchsia : na, style=plot.style_line, linewidth=5, transp=50, title='Close below ATR cave')
donttradeoutside_atrcave=input(true)
too_high = close>upper_atr_band and donttradeoutside_atrcave
too_low = close<lower_atr_band and donttradeoutside_atrcave

////////////////////////////
////// CONFIRMATION 1 ////// the trigger actually
////////////////////////////
lenaroon = input(8, minval=1, title="Length Aroon")
c1upper = 100 * (highestbars(high, lenaroon+1) + lenaroon)/lenaroon
c1lower = 100 * (lowestbars(low, lenaroon+1) + lenaroon)/lenaroon
c1CrossUp=crossover(c1upper,c1lower)
c1CrossDown=crossunder(c1upper,c1lower)


////////////////////////////////
////// CONFIRMATION: MACD //////
////////////////////////////////
dont_use_macd=input(false)
macd_fast_length = input(title="Fast Length", type=input.integer, defval=13)
macd_slow_length = input(title="Slow Length", type=input.integer, defval=26)
macd_signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
macd_fast_ma = ema(close, macd_fast_length)
macd_slow_ma = ema(close, macd_slow_length)
macd = macd_fast_ma - macd_slow_ma
macd_signal = ema(macd, macd_signal_length)
macd_hist = macd - macd_signal

macdLong=macd_hist>0 or dont_use_macd
macdShort=macd_hist<0 or dont_use_macd

/////////////////////////////
///// CONFIRMATION: RSI /////
/////////////////////////////
dont_use_rsi=input(false)
lenrsi = input(14, minval=1, title="RSI Length") //14
up = rma(max(change(close), 0), lenrsi)
down = rma(-min(change(close), 0), lenrsi)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
rsiLong=rsi>50 or dont_use_rsi
rsiShort=rsi<50 or dont_use_rsi

//////////////////////////////
///// CONFIRMATION: PSAR /////
//////////////////////////////
dont_use_psar=input(false)
psar_start = input(0.03, step=0.01)
psar_increment = input(0.018, step=0.001)
psar_maximum = input(0.11, step=0.01) //default 0.08
psar = sar(psar_start, psar_increment, psar_maximum)

plot(psar, style=plot.style_cross, color=color.blue, title='PSAR')
psarLong=close>psar or dont_use_psar
psarShort=close<psar or dont_use_psar

/////////////////////////
///// CONFIRMATIONS /////
/////////////////////////
Long_Confirmations=psarLong and rsiLong and macdLong
Short_Confirmations=psarShort and rsiShort and macdShort

GoLong=c1CrossUp and Long_Confirmations and not too_high
GoShort=c1CrossDown and Short_Confirmations and not too_low

////////////////////
///// STRATEGY /////
////////////////////

use_exit=input(false)
KillLong=c1CrossDown and use_exit
KillShort=c1CrossUp and use_exit

SL=input(0.5, step=0.1)/syminfo.mintick
TP=input(0.005, step=0.001)/syminfo.mintick

strategy.entry("nnL", strategy.long, when = GoLong)
strategy.entry("nnS", strategy.short, when = GoShort)
strategy.exit("XL-nn", from_entry = "nnL", loss = SL, profit=TP)
strategy.exit("XS-nn", from_entry = "nnS", loss = SL, profit=TP)
strategy.close("nnL", when = KillLong)
strategy.close("nnS", when = KillShort)


```

> Detail

https://www.fmz.com/strategy/430744

> Last Modified

2023-11-01 11:40:07
