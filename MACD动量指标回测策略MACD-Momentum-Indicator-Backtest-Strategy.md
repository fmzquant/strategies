
> Name

MACD动量指标回测策略MACD-Momentum-Indicator-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略结合MACD动量指标和RSI超买超卖指标,在MACD发生金叉/死叉时验证RSI是否也完成了对应的触底/触顶回转,从而产生更可靠的交易信号。属于典型的短期反转策略思路。

## 策略原理

1. 计算MACD指标的DIFF、DEA和MACD柱。当DIFF上穿DEA时产生金叉信号,下穿时死叉信号。

2. 计算RSI指标,判断是否触底反弹或触顶回落。并设置回看窗口判断最近阶段是否出现过触底或触顶。

3. 当MACD金叉时,如果RSI在回看窗口内完成了触底反弹,则产生看多信号。当MACD死叉时,如果RSI完成了触顶回落,则看空信号。

4. 入场后设置止损点以控制风险。

## 策略优势

1. MACD判断趋势转折时机灵敏。RSI判断超买超卖状况有效。

2. 同时验证MACD和RSI令牌,可过滤假信号。

3. 回看窗口判断增加信号的可靠性。

4. 设置止损有助于风险管理。

## 策略风险

1. MACD和RSI均存在一定滞后,可能错过最优入场点。

2. 同时等待两指标信号出现的概率较小,信号较少。

3. 没有考虑大级别趋势方向,容易被套。

4. 止损设置不当可能过于宽松或严格。

对应解决方法:

1. 调整MACD和RSI参数,降低滞后概率。

2. 适当扩大指标的有效区间,提供更多信号。

3. 增加趋势过滤,避免逆势入场。

4. 测试不同的止损参数设置,找到最优点。

## 策略优化方向

1. 测试SMA等其他均线的效果。

2. 增加移动止损,让止损更灵活。

3. 添加趋势力指标,判断入场的优劣。

4. 引入机器学习预测指标走势。

5. 结合更多因子优化入场时机选择。

## 总结

该策略利用MACD和RSI两个指标的配合,在筛选出可靠的反转信号后入场。策略思路清晰、参数调整灵活,可从指标选择、趋势判断、止损方式等方面进行扩展,在保持稳定的基础上获取更多交易机会。但需要注意防止由于过度优化而丧失稳健性。

|| 

## Overview 

This strategy combines the MACD momentum indicator with the RSI overbought/oversold indicator. When MACD crosses up or down, it checks if RSI also completes the corresponding bottoming/topping reversal over the lookback period to generate more reliable trading signals. Typical short-term mean reversion strategy logic.

## Strategy Logic

1. Calculate MACD DIFF, DEA and histogram. Crossover of DIFF above DEA gives bullish crossover signal, and crossover below gives death cross signal.

2. Calculate RSI to identify oversold bounces and overbought selloffs. Lookback window checks if recent bottoming or topping has occurred.

3. When MACD bullish crossover happens, if RSI has bounced off oversold within lookback window, long signal is generated. On MACD death cross, short signal is generated if RSI topped over lookback window.

4. Stop loss set after entry to control risk.

## Advantages 

1. MACD sensitively identifies trend changes. RSI effectively judges overbought/oversold levels.

2. Requiring both MACD and RSI signals filters out false signals.

3. Lookback window improves signal reliability.

4. Stop loss aids risk management.

## Risks

1. Lagging of MACD and RSI may cause missed optimal entries.

2. Lower probability of dual-indicator signal means fewer trades.

3. No consideration of larger trend direction risks being trapped.

4. Poor stop loss tuning may be too wide or too tight. 

Possible Solutions:

1. Adjust MACD and RSI parameters to reduce lag.

2. Widen indicator threshold ranges to provide more signals.

3. Add trend filter to avoid counter-trend entries.

4. Test different stop loss parameters for optimal levels.

## Optimization Directions

1. Test SMA and other moving averages. 

2. Add trailing stop loss for flexible stops.

3. Incorporate trend strength to judge entry quality.

4. Use machine learning to predict indicator movements.

5. Combine more factors to optimize entry timing.

## Summary

This strategy filters for reliable reversal signals using coordinated MACD and RSI. The logic is clear and parameters flexible for enhancements like indicator selection, trend filters, stop loss techniques etc to acquire more trades while maintaining stability, but over-optimization risks need to be avoided.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(13 Jun 2022)|Start Date|
|v_input_2|timestamp(13 Jun 2024)|Start Date|
|v_input_3_close|0|(?RSI Settings)RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|14|Length|
|v_input_5|30|Over Sold Threshold|
|v_input_6|70|Over Bought Threshold|
|v_input_7|7|RSI cross lookback period|
|v_input_8_close|0|(?MACD Settings)MACD Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|12|Fast Length|
|v_input_10|26|Slow Length|
|v_input_int_1|9|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|
|v_input_11|15|(?Stop Loss Settings)Long Stop Loss (%)|
|v_input_12|15|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-24 00:00:00
end: 2023-09-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//based on Range Strat - MACD/RSI 
// strategy("MACD/RSI - edited", 
//      overlay=true,
//      default_qty_type=strategy.percent_of_equity,
//      default_qty_value=10, precision=2, initial_capital=100000,
//      pyramiding=2,
//      commission_value=0.05)

//Backtest date range
StartDate = input(timestamp("13 Jun 2022"), title="Start Date")
EndDate = input(timestamp("13 Jun 2024"), title="Start Date")
inDateRange = true

// RSI Input Settings
rsisrc = input(title="RSI Source", defval=close, group="RSI Settings")
length = input(title="Length", defval=14, group="RSI Settings" )
overSold = input(title="Over Sold Threshold", defval=30, group="RSI Settings" )
overBought = input(title="Over Bought Threshold", defval=70, group="RSI Settings" )
rsi_lookback = input(title="RSI cross lookback period", defval=7, group="RSI Settings")

// Calculating RSI
vrsi = ta.rsi(rsisrc, length)
co = ta.crossover(vrsi, overSold)
cu = ta.crossunder(vrsi, overBought)

// Function looking for a happened condition during lookback period
f_somethingHappened(_cond, _lookback) =>
    bool _crossed = false
    for i = 1 to _lookback
        if _cond[i]
            _crossed := true
    _crossed


coCheck = f_somethingHappened(co, rsi_lookback)
cuCheck = f_somethingHappened(cu, rsi_lookback)

// MACD Input Settings
macdsrc = input(title="MACD Source", defval=close, group="MACD Settings")
fast_length = input(title="Fast Length", defval=12, group="MACD Settings")
slow_length = input(title="Slow Length", defval=26, group="MACD Settings")
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9, group="MACD Settings")
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"], group="MACD Settings")
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"], group="MACD Settings")


// Calculating MACD
fast_ma = sma_source == "SMA" ? ta.sma(macdsrc, fast_length) : ta.ema(macdsrc, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(macdsrc, slow_length) : ta.ema(macdsrc, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
delta = macd - signal

MACDcrossover = ta.crossover(delta, 0)
MACDcrossunder = ta.crossunder(delta, 0)

// Stop Loss Input Settings
longLossPerc = input(title="Long Stop Loss (%)", defval=15, group="Stop Loss Settings") * 0.01
shortLossPerc = input(title="Short Stop Loss (%)", defval=15, group="Stop Loss Settings") * 0.01

// Calculating Stop Loss
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)



// Strategy Entry
if (not na(vrsi))
	if (inDateRange and MACDcrossover and coCheck)
		strategy.entry("LONG", strategy.long, comment="LONG")
	if (inDateRange and MACDcrossunder and cuCheck)
		strategy.entry("SHORT", strategy.short, comment="SHORT")

// Submit exit orders based on calculated stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="LONG STOP", stop=longStopPrice)
if (strategy.position_size < 0)
    strategy.exit(id="SHORT STOP", stop=shortStopPrice)
```

> Detail

https://www.fmz.com/strategy/427733

> Last Modified

2023-09-24 13:21:54
