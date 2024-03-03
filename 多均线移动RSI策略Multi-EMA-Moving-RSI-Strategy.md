
> Name

多均线移动RSI策略Multi-EMA-Moving-RSI-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略利用多组移动平均线与RSI指标进行组合交易。当快速EMA下穿慢速EMA,并且RSI显示超卖时做空;当价格重新上穿均线时平仓。

具体交易逻辑:

1. 计算4组不同周期的指数移动平均线,例如9日、26日、100日和55日均线

2. 当9日EMA下穿26日EMA时,考虑做空信号

3. 同时,RSI指标低于阈值(如40)时激活做空信号,避免超卖反弹

4. 入场做空后,当价格上穿55日或100日EMA时平空仓

5. 可设置不同均线周期组合,优化参数

该策略充分利用多均线判断趋势,并辅助RSI指标来过滤假信号,在超卖点位做空。

## 策略优势 

- 多均线组合判断,提高准确性

- RSI指标避免超卖反弹的风险

- 较短均线做策略,较长均线止损,回撤控制

## 策略风险

- 需要反复测试确定合适的参数

- RSI参数设置需要审慎评估

- 仅做空策略,可能错过多头机会

## 总结

该策略综合运用多均线的优势,辅以RSI指标过滤信号。参数优化和止损设置对策略效果至关重要。但仅做空交易亦是一大局限。

||

## Strategy Logic

This strategy combines multiple moving averages with the RSI for trades. It goes short when a faster EMA crosses below a slower EMA, confirmed with RSI oversold.

The logic is:

1. Calculate 4 EMAs of differing periods, e.g. 9, 26, 100 and 55 periods

2. A short signal triggers when 9-period EMA crosses below 26-period EMA

3. Activate short only if RSI below threshold (e.g. 40) to avoid oversold bounce

4. After short entry, exit when price crosses above 55 or 100 EMA 

5. Different EMA combinations can be set for parameter optimization

The strategy utilizes multiple EMAs for trend and adds RSI for signal confirmation, going short at oversold levels. 

## Advantages

- Multiple EMAs improve accuracy 

- RSI avoids oversold bounce risk

- Faster EMA for entry, slower for stop loss

## Risks

- Extensive testing needed to find optimal parameters

- Careful evaluation of RSI parameters 

- SHORT only, so long opportunities missed

## Summary

This strategy combines the power of multiple EMAs with RSI confirmation and filtering. Parameter optimization and stop loss are critical. But being SHORT-only is a key limitation.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|EMA_L|
|v_input_int_2|26|EMA_L2|
|v_input_int_3|100|EMA_S|
|v_input_int_4|55|EMA_S2|
|v_input_int_5|5|RSI|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © YukalMoon

//@version=5
strategy(title="EMA SCALPEUR", overlay=true, initial_capital = 1000)


//// input controls

EMA_L = input.int (title = "EMA_L", defval = 9, minval = 1, maxval = 100, step =1)
EMA_L2 = input.int (title = "EMA_L2", defval = 26, minval = 1, maxval = 100, step =1)
EMA_S = input.int (title = "EMA_S", defval = 100, minval = 1, maxval = 100, step =1)
EMA_S2 = input.int (title = "EMA_S2", defval = 55, minval = 1, maxval = 100, step =1)
RSI1 = input.int (title = "RSI", defval = 5, minval = 1, maxval = 20 , step = 1)

/// mise en place de ema

RSI = ta.rsi(close, RSI1)

shortest = ta.ema(close, 9)
short = ta.ema(close, 26)
longer = ta.ema(close, 100)
longest = ta.ema(close, 55)

plot(shortest, color = color.red)
plot(short, color = color.orange)
plot(longer, color = color.aqua)
plot(longest, color = color.yellow)

plot(close)

//// trading indicators

EMA1 = ta.ema (close,EMA_L)
EMA2 = ta.ema (close,EMA_L2)
EMA3 = ta.ema (close, EMA_S)
EMA4 = ta.ema (close, EMA_S2)


//buy = ta.crossover(EMA1, EMA2) and RSI > 60 and RSI <70
sell = ta.crossunder(EMA1, EMA2) and RSI > 40

//buyexit = ta.crossunder(EMA3, EMA4)
sellexit = ta.crossover(EMA3, EMA4)

/////strategy


strategy.entry ("short", strategy.short, when = sell, comment = "ENTER-SHORT")


///// market exit


strategy.close ("short",  when = sellexit, comment = "EXIT-SHORT")












```

> Detail

https://www.fmz.com/strategy/426802

> Last Modified

2023-09-14 16:28:04
