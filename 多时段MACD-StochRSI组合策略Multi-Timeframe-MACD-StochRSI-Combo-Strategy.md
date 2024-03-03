
> Name

多时段MACD-StochRSI组合策略Multi-Timeframe-MACD-StochRSI-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略融合运用MACD指标和StochRSI指标在多个时间周期进行判断,提高交易决策的稳定性和可靠性。属于典型的多时间轴组合策略。

策略原理:

1. 在日线和4小时周期计算MACD和StochRSI指标。

2. 当日线和4小时周期的多头指标同时出现做多信号时,进行做多操作。

3. 当日线和4小时周期的空头指标同时出现做空信号时,进行做空操作。

4. 在一个方向入场后,等待另一方向指标出现才可平仓。

5. 通过多时间轴组合,进行指标结果验证,减少错误交易。

该策略的优势:

1. 多时段组合判断,可提高信号的稳定性。

2. MACD与StochRSI可相互验证,提高准确率。

3. 清晰的入场和出场规则,便于回测和实盘。

该策略的风险:

1. 多时间轴组合判断存在滞后问题。

2. 指标参数优化较为复杂,需同时考量多个周期。

3. 交易频率可能较低,无法充分捕捉市场机会。

总之,该策略通过多个周期指标组合进行判断,可在一定程度上提高信号质量,但需注意参数优化和滞后问题,寻求回报与风险之间的平衡。

||

This strategy combines the MACD and StochRSI indicators across multiple timeframes for improved reliability in trade signals. It is a typical multi-timeframe combination approach.

Strategy Logic:

1. Calculate MACD and StochRSI on daily and 4-hour periods.

2. Enter long when both bullish signals align on daily and 4-hour. 

3. Enter short when both bearish signals align on daily and 4-hour.

4. Hold position until opposite signals appear on both timeframes.

5. Cross-validation via multi-timeframe improves accuracy.

Advantages:

1. Multi-timeframe analysis improves signal stability.

2. MACD and StochRSI verify each other.

3. Clear entry and exit rules ease testing and execution.

Risks:

1. Multi-timeframe combinations lag trade entries. 

2. Complex parameter optimization across periods.

3. Potentially fewer trades Unable to fully capitalize on all market opportunities.

In summary, this multi-timeframe approach can improve signal quality but requires balancing optimization and lag against risk-adjusted returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|MACD Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|12|MACD Fast Length:|
|v_input_3|26|MACD Slow Length:|
|v_input_4|9|MACD Signal Smoothing:|
|v_input_5_close|0|SRSI Source:: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|14|SRSI RSI Length:|
|v_input_7|14|SRSI Stoch Length:|
|v_input_8|3|SRSI Smoothing:|
|v_input_9|3|SRSI Signal Smoothing:|
|v_input_10|true|Trade Size in BTC:|
|v_input_11|true|Perform buy trading?|
|v_input_12|true|Perform sell trading?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy(title='[RS]Khizon (DGAZ) Strategy V0', shorttitle='K', overlay=false, pyramiding=0, initial_capital=100000, currency=currency.USD)
//  ||  Inputs:
macd_src = input(title='MACD Source:',  defval=close)
macd_fast = input(title='MACD Fast Length:', defval=12)
macd_slow = input(title='MACD Slow Length:', defval=26)
macd_signal_smooth = input(title='MACD Signal Smoothing:', defval=9)
srsi_src = input(title='SRSI Source:',  defval=close)
srsi_rsi_length = input(title='SRSI RSI Length:', defval=14)
srsi_stoch_length = input(title='SRSI Stoch Length:', defval=14)
srsi_smooth = input(title='SRSI Smoothing:', defval=3)
srsi_signal_smooth = input(title='SRSI Signal Smoothing:', defval=3)
//  ||  Strategy Inputs:
trade_size = input(title='Trade Size in BTC:',  defval=1)
buy_trade = input(title='Perform buy trading?',  defval=true)
sel_trade = input(title='Perform sell trading?',  defval=true)
//  ||  MACD(close, 12, 26, 9):     ||---------------------------------------------||
f_macd_trigger(_src, _fast, _slow, _signal_smooth)=>
    _macd = ema(_src, _fast) - ema(_src, _slow)
    _signal = sma(_macd, _signal_smooth)
    _return_trigger = _macd >= _signal ? true : false
//  ||  Stoch RSI(close, 14, 14, 3, 3)  ||-----------------------------------------||
f_srsi_trigger(_src, _rsi_length, _stoch_length, _smooth, _signal_smooth)=>
    _rsi = rsi(_src, _rsi_length)
    _stoch = sma(stoch(_rsi, _rsi, _rsi, _stoch_length), _smooth)
    _signal = sma(_stoch, _signal_smooth)
    _return_trigger = _stoch >= _signal ? true : false
//  ||-----------------------------------------------------------------------------||
//  ||-----------------------------------------------------------------------------||
//  ||  Check Directional Bias from daily timeframe:
daily_trigger = security('NGAS', 'D', f_macd_trigger(macd_src, macd_fast, macd_slow, macd_signal_smooth) and f_srsi_trigger(srsi_src, srsi_rsi_length, srsi_stoch_length, srsi_smooth, srsi_signal_smooth))
h4_trigger = security('NGAS', '240', f_macd_trigger(macd_src, macd_fast, macd_slow, macd_signal_smooth) and f_srsi_trigger(srsi_src, srsi_rsi_length, srsi_stoch_length, srsi_smooth, srsi_signal_smooth))

plot(title='D1T', series=daily_trigger?0:na, style=circles, color=blue, linewidth=4, transp=65)
plot(title='H4T', series=h4_trigger?0:na, style=circles, color=navy, linewidth=2, transp=0)

sel_open = sel_trade and daily_trigger and h4_trigger
buy_open = buy_trade and not daily_trigger and not h4_trigger
sel_close = not buy_trade and not daily_trigger and not h4_trigger
buy_close = not sel_trade and daily_trigger and h4_trigger

strategy.entry('sel', long=false, qty=trade_size, comment='sel', when=sel_open)
strategy.close('sel', when=sel_close)
strategy.entry('buy', long=true, qty=trade_size, comment='buy', when=buy_open)
strategy.close('buy', when=buy_close)
```

> Detail

https://www.fmz.com/strategy/426558

> Last Modified

2023-09-13 12:05:46
