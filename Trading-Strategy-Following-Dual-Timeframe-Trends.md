
> Name

Trading-Strategy-Following-Dual-Timeframe-Trends

> Author

ChaoZhang

> Strategy Description



[trans]
双重趋势跟随交易策略
双重趋势跟随交易策略通过在多个时间周期判断趋势方向,实现在趋势开始时及早进入市场。该策略同时使用MACD和随机指数平滑移动平均线(SRSI)作为判断指标,在日线和4小时线形成一致信号时发出交易指令。

策略原理:

1. 在日线上计算MACD和SRSI指标,当MACD上穿信号线且SRSI%K上穿信号线时,判断为看涨信号。

2. 在4小时线上计算MACD和SRSI指标,当MACD上穿信号线且SRSI%K上穿信号线时,判断为看涨信号。 

3. 仅在日线和4小时线上的看涨信号同时出现时,做多入场。

4. 若日线和4小时线上的看涨信号同时消失,平多仓位。

5. 若日线和4小时线上的看跌信号(MACD和SRSI指标下穿)同时出现,做空入场。

6. 若日线和4小时线上的看跌信号同时消失,平空仓位。

7. 持续监控双重信号,实现趋势跟随。

该策略的优势是能在趋势开始早期就进入市场,通过双重过滤提高信号的可靠性,避免在震荡期错
||
Trading Strategy Following Dual Timeframe Trends

This trading strategy identifies trend direction across multiple timeframes to get into trends early. It uses both MACD and Stochastic RSI (SRSI) as indicators, and enters trades when consistent signals are triggered on the daily and 4-hour timeframes.

Strategy Logic:

1. Calculate MACD and SRSI on the daily chart. When MACD crosses above signal and SRSI %K crosses above signal, it is considered a bullish signal.

2. Calculate MACD and SRSI on the 4-hour chart. When MACD crosses above signal and SRSI %K crosses above signal, it is considered a bullish signal.

3. Only go long when both daily and 4-hour bullish signals appear together. 

4. If both daily and 4-hour bullish signals disappear, close long positions.

5. If both daily and 4-hour bearish signals (MACD and SRSI crossing below) appear together, go short. 

6. If both daily and 4-hour bearish signals disappear, close short positions.

7. Continuously monitor dual signals to follow trends.

The advantage of this strategy is getting into trends early as they develop by using dual filters to improve signal reliability and avoid false signals during choppy periods. The use of two timeframes provides greater confidence in the trend direction.

However, a potential risk is that strong trends can build on one timeframe before confirming on the second, thus missing initial entries. Parameters like MACD lengths need to be optimized to capture trends early while minimizing false signals. Overly sensitive parameters may cause over-trading.

Overall, the Dual Timeframe Trends Following strategy aims to capture trend moves in early stages. The dual confirmation helps avoid whipsaws but may occasionally miss initial entries. Careful parameter tuning and risk management is required.

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
|v_input_8|14|SRSI Smoothing:|
|v_input_9|14|SRSI Signal Smoothing:|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy(title='[RS]Khizon (DWTI) Strategy V0', shorttitle='K', overlay=false, pyramiding=0, initial_capital=100000, currency=currency.USD)
trade_size = 10000
//  ||  Inputs:
macd_src = input(title='MACD Source:',  defval=close)
macd_fast = input(title='MACD Fast Length:',  defval=12)
macd_slow = input(title='MACD Slow Length:',  defval=26)
macd_signal_smooth = input(title='MACD Signal Smoothing:',  defval=9)
srsi_src = input(title='SRSI Source:',  defval=close)
srsi_rsi_length = input(title='SRSI RSI Length:',  defval=14)
srsi_stoch_length = input(title='SRSI Stoch Length:',  defval=14)
srsi_smooth = input(title='SRSI Smoothing:',  defval=14)
srsi_signal_smooth = input(title='SRSI Signal Smoothing:',  defval=14)
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
daily_trigger = security('USOIL', 'D', f_macd_trigger(macd_src, macd_fast, macd_slow, macd_signal_smooth) and f_srsi_trigger(srsi_src, srsi_rsi_length, srsi_stoch_length, srsi_smooth, srsi_signal_smooth))
h4_trigger = security('USOIL', '240', f_macd_trigger(macd_src, macd_fast, macd_slow, macd_signal_smooth) and f_srsi_trigger(srsi_src, srsi_rsi_length, srsi_stoch_length, srsi_smooth, srsi_signal_smooth))

plot(0, style=circles, color=daily_trigger?blue:na, linewidth=4, transp=65)
plot(0, style=circles, color=h4_trigger?navy:na, linewidth=2, transp=0)

sel_open = daily_trigger and h4_trigger
buy_open = not daily_trigger and not h4_trigger

strategy.entry('sel', long=false,  comment='sel', when=sel_open)
strategy.entry('buy', long=true,  comment='buy', when=buy_open)

```

> Detail

https://www.fmz.com/strategy/426474

> Last Modified

2023-09-12 14:22:39
