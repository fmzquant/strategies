
> Name

多因子驱动趋势追踪策略Multifactor-Driven-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a2d435d9c8a513d0a6.png)
 [trans]
## 概述

本策略通过结合移动平均聚散指标(MACD)和随机相对强弱指标(Stoch RSI)两个因子来判断行情趋势方向,在趋势向上时做多,趋势向下时做空,属于趋势追踪类型策略。

## 策略原理

本策略使用了MACD和Stoch RSI两个指标判断市场趋势方向。

MACD指标是由快线(ema快线)和慢线(ema慢线)及其差值组成,其反映了短期和长期平均线的聚合和分离状况。当快线上穿慢线时为买入信号,快线下穿慢线时为卖出信号。 

Stoch RSI指标结合了RSI指标和Stoch指标的优点,可以显示市场的超买超卖现象。Stoch RSI大于Stoch RSI信号线时为买入信号,小于信号线时为卖出信号。

本策略在日线和4小时线上使用MACD和Stoch RSI判断市场趋势方向。当日线和4小时线上的两个指标同时发出买入信号时,做多;当两个指标同时发出卖出信号时,做空。这样可以有效过滤假信号,提高信号的可靠性。

## 策略优势

1. 结合双重因子判断市场走势,可以有效过滤假信号,提高信号准确率

2. 在高低时间轴(日线和4小时线)验证信号,避免被套利

3. 追踪趋势运行,避开震荡市

4. 策略思路清晰简单,容易理解执行

## 风险与解决

1. 无法有效判断趋势转折点,可能原地反转止损
- 适当调整参数优化,或增加其他指标判断

2. 单一合约无法分散市场系统性风险
- 增加其他合约或者股票进行分散投资

3. 无法判断突发重大事件的影响
- 结合基本面分析,增强风险防范意识

## 优化方向  

1. 调整MACD和Stoch RSI的参数,优化买卖点

2. 增加移动止损策略,锁定盈利

3. 增加资金管理模块,控制单笔仓位

4. 结合更多因子判断,增加信号准确率

5. 采用机器学习方法动态优化参数

## 总结

本策略通过双因子模型判断行情趋势方向,结合高低时间轴验证信号,是一种较为稳定可靠的趋势追踪策略。具备一定的风险防范能力和容错空间。后期通过参数优化、止损策略、资金管理等模块的加入,可望获得更好的策略表现。

||

## Summary

This strategy combines the Moving Average Convergence Divergence (MACD) indicator and the Stochastic Relative Strength Index (Stoch RSI) indicator to determine market trend direction, going long when the trend is up and going short when the trend is down. It belongs to the trend trading strategy category.

## Strategy Logic  

This strategy utilizes the MACD and Stoch RSI indicators to determine market trend direction.

The MACD indicator consists of the fast EMA line, slow EMA line and the difference between them, reflecting the convergence and divergence of short-term and long-term moving averages. When the fast line crosses above the slow line, it is a buy signal. When the fast line crosses below the slow line, it is a sell signal.

The Stoch RSI indicator combines the strengths of both the RSI and Stoch indicators to show overbought and oversold levels in the market. When Stoch RSI is greater than the Stoch RSI signal line, it is a buy signal. When it is lower than the signal line, it is a sell signal.

This strategy uses MACD and Stoch RSI on the daily and 4-hour timeframes to determine market trend. When both indicators generate buy signals on the daily and 4-hour charts, go long. When both generate sell signals, go short. This can effectively filter out false signals and improve reliability.  

## Advantages

1. Combining double factors to judge market moves can filter false signals effectively and improve signal accuracy  

2. Validating signals across high and low timeframes (daily and 4H) avoids getting whipsawed  

3. Following trends avoids choppy markets  

4. Simple and clear strategy logic, easy to understand and execute

## Risks and Solutions

1. Inability to effectively determine trend reversal points may cause stop loss being triggered  
- Optimize parameters or add other indicators to judge

2. Single contract cannot diversify market systematic risks  
- Increase other contracts or stocks to diversify

3. Cannot determine impact of sudden big events
- Combine fundamental analysis to enhance risk awareness  

## Optimization Directions   

1. Adjust MACD and Stoch RSI parameters to optimize entry and exit points

2. Add trailing stop strategies to lock in profits  

3. Add position sizing to control per trade risk 

4. Add more factors to judge to improve signal accuracy  

5. Use machine learning methods to dynamically optimize parameters

## Summary

This strategy determines trend direction via a dual factor model and validates signals across timeframes. It is a relatively stable and reliable trend following strategy, with certain risk management capabilities and room for error. Its performance can be further enhanced by adding parameters optimization, stop loss, position sizing and other modules.

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
|v_input_10|true|Trade Size in USD:|
|v_input_11|true|Perform buy trading?|
|v_input_12|true|Perform sell trading?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-09 00:00:00
end: 2024-01-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title='[RS]Khizon (UGAZ) Strategy V0', shorttitle='K', overlay=false, pyramiding=0, initial_capital=100000, currency=currency.USD)
//  ||  Inputs:
macd_src = input(title='MACD Source:',  defval=close)
macd_fast = input(title='MACD Fast Length:',  defval=12)
macd_slow = input(title='MACD Slow Length:',  defval=26)
macd_signal_smooth = input(title='MACD Signal Smoothing:',  defval=9)
srsi_src = input(title='SRSI Source:',  defval=close)
srsi_rsi_length = input(title='SRSI RSI Length:',  defval=14)
srsi_stoch_length = input(title='SRSI Stoch Length:',  defval=14)
srsi_smooth = input(title='SRSI Smoothing:',  defval=3)
srsi_signal_smooth = input(title='SRSI Signal Smoothing:',  defval=3)
//  ||  Strategy Inputs:
trade_size = input(title='Trade Size in USD:', type=float, defval=1)
buy_trade = input(title='Perform buy trading?', type=bool, defval=true)
sel_trade = input(title='Perform sell trading?', type=bool, defval=true)
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

sel_open = sel_trade and not daily_trigger and not h4_trigger
buy_open = buy_trade and daily_trigger and h4_trigger
sel_close = not buy_trade and daily_trigger and h4_trigger
buy_close = not sel_trade and not daily_trigger and not h4_trigger
strategy.entry('sel', long=false, qty=trade_size, comment='sel', when=sel_open)
strategy.close('sel', when=sel_close)
strategy.entry('buy', long=true, qty=trade_size, comment='buy', when=buy_open)
strategy.close('buy', when=buy_close)

```

> Detail

https://www.fmz.com/strategy/439065

> Last Modified

2024-01-17 14:02:22
