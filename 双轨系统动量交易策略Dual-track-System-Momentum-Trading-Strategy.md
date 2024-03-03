
> Name

双轨系统动量交易策略Dual-track-System-Momentum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14d89ebcb1837aa119c.png)

[trans]


## 概述

本策略采用MACD和Stoch RSI两种指标进行组合,构建双轨交易系统,实现趋势跟踪和超跌超买判断。策略同时在日线和4小时线构建指标,实现多时间框架的判断,降低误判概率。

## 策略原理

策略组合运用MACD和Stoch RSI两种不同类型的技术指标,进行配置。MACD为差动指标,判断价格变化速度;Stoch RSI为超买超卖指标,判断价格相对强弱。

策略首先在日线和4小时线分别构建MACD和Stoch RSI指标,进行趋势和超买超卖判断。当两时间周期的指标同时发出买入/卖出信号时,进行对应的买入/卖出操作。

具体来说,构建MACD指标,DIF线和DEA线构成金叉死叉进行判断;构建Stoch RSI指标,K线和D线构成金叉死叉进行判断。当两组指标同时金叉时产生买入信号,同时死叉时产生卖出信号。

这样,策略综合运用双轨指标和多时间框架判断,对价格变化速度和相对强弱进行全面判断,有助于提高决策准确性,获取更佳回报。

## 优势分析

本策略具有以下几点优势:

1. 组合双轨指标,进行全面判断,提高决策准确性
2. 运用多时间框架,降低误判概率
3. 采用趋势跟踪和超买超卖判断,综合考量价格变化速度和相对强弱
4. 指标参数可调整,适应不同品种和市场环境
5. 代码结构清晰,易于理解和拓展

## 风险分析

本策略也存在一些风险:

1. 市场存在系统性风险,无法完全规避
2. 指标参数设置不当可能导致交易频繁或错过良机
3. 双轨指标同时发出错误信号的概率存在,但低于单一指标
4. 无法应对急剧变化的市场,如重大黑天鹅事件

对策:

1. 优化参数,调整买卖交易条件,降低误判
2. 结合更多指标进行组合,增加判断依据
3. 增加止损策略,控制单次亏损风险

## 优化方向 

本策略还可从以下几个方面进行优化:

1. 增加更多指标进行组合,构建多指标策略
2. 增加机器学习算法,实现动态参数优化
3. 结合情绪指标、消息面等更多因素判断市场状况
4. 增加止损、止盈策略,优化资金管理
5. 扩展更多交易品种,寻找更佳交易机会

## 总结

本策略通过双轨指标和多时间框架判断的组合运用,对价格变化速度和相对强弱进行全面判断,可以有效获取市场趋势,改进单一指标的误判缺陷。同时也具有参数调整灵活、易于理解与扩展等优点。后续可通过多指标组合、动态参数优化、情绪指标引入等方式进行拓展与优化,进一步提高策略绩效。

||

## Overview

This strategy combines the MACD and Stoch RSI indicators to build a dual-rail trading system for trend tracking and oversold/overbought judgment. The strategy also builds indicators on the daily and 4-hour timeframes to make multi-timeframe judgments to reduce misjudgment probability.

## Strategy Principle 

The strategy combines the MACD and Stoch RSI indicators, which are different types of technical indicators, for configuration. MACD is a momentum indicator that judges price change velocity; Stoch RSI is an overbought/oversold indicator that judges relative price strength.

The strategy first constructs the MACD and Stoch RSI indicators on the daily and 4-hour timeframes respectively for trend and overbought/oversold judgments. When signals are triggered on both timeframes, corresponding buy/sell operations are performed.  

Specifically, the MACD indicator is constructed with the DIF and DEA lines forming golden/dead crosses for judgment; the Stoch RSI indicator is constructed with the K and D lines forming golden/dead crosses for judgment. When both indicator pairs have golden crosses, buy signals are generated; when both have dead crosses, sell signals are generated.

Thus, by comprehensively applying the dual-indicator system and multi-timeframe judgments, the strategy judges price velocity and relative strength thoroughly, which helps improve decision accuracy and gain better returns.

## Advantage Analysis

This strategy has the following advantages:

1. Combining dual-indicator system for comprehensive judgment and higher decision accuracy  
2. Applying multi-timeframe to reduce misjudgment probability
3. Adopting trend tracking and overbought/oversold judgment for consideration of both price velocity and relative strength  
4. Flexible indicator parameters adjustable for different products and market environments
5. Clean code structure easy to understand and expand

## Risk Analysis

There are also some risks with this strategy:  

1. There exist systemic market risks that cannot be fully avoided  
2. Inappropriate indicator parameter settings may lead to overtrading or missing opportunities
3. Dual indicators may still give concurrent wrong signals, but less likely than single ones  
4. Unable to cope with drastic market changes like black swan events  

Countermeasures:

1. Optimize parameters and adjust trading conditions to reduce misjudgments  
2. Incorporate more indicators for combined judgments  
3. Add stop loss mechanisms to control single loss risk  

## Optimization Directions

This strategy can also be improved in the following aspects:

1. Incorporate more indicators for multi-indicator strategies  
2. Add machine learning algorithms for dynamic parameter optimization
3. Combine sentiment indicators, news etc. for more comprehensive market condition judgments 
4. Add stop loss, take profit strategies to optimize money management
5. Expand to more trading products to discover better opportunities  

## Conclusion

By combined application of the dual-indicator system and multi-timeframe judgments, this strategy judges price velocity and relative strength thoroughly, which can effectively capture market trends and improve deficiencies of single indicators. It also has advantages like flexible parameter tuning, easy understanding and expansion. Further expansions by multi-indicator combination, dynamic parameter optimization, sentiment indicator incorporation etc. can help boost strategy performance.
[trans]

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
start: 2023-11-14 00:00:00
end: 2023-11-15 10:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title='[RS]Khizon (UWTI) Strategy V0', shorttitle='K', overlay=false, pyramiding=0, initial_capital=100000, currency=currency.USD)
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
daily_trigger = security('USOIL', 'D', f_macd_trigger(macd_src, macd_fast, macd_slow, macd_signal_smooth) and f_srsi_trigger(srsi_src, srsi_rsi_length, srsi_stoch_length, srsi_smooth, srsi_signal_smooth))
h4_trigger = security('USOIL', '240', f_macd_trigger(macd_src, macd_fast, macd_slow, macd_signal_smooth) and f_srsi_trigger(srsi_src, srsi_rsi_length, srsi_stoch_length, srsi_smooth, srsi_signal_smooth))

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

https://www.fmz.com/strategy/432892

> Last Modified

2023-11-22 15:26:28
