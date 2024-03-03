
> Name

Ultra-Long-Period-RSI-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
超长周期RSI反转策略

该策略通过计算超长周期RSI指标,并根据其与阈值的交叉情况形成交易信号。

具体来说,它采用了一个非常长周期的RSI参数,典型设置为50-100周期。当RSI指标上穿超卖区时,产生买入信号;当RSI指标下穿超买区时,产生卖出信号。

这种策略的优势在于超长周期RSI可以更准确地判断行情趋势,过滤掉短期市场噪音,避免被套。但是RSI指标本身存在滞后性,无法及时发现趋势反转。另外,参数设置需要针对不同品种进行优化。

总的来说,超长周期RSI反转策略适合中长线持仓。它虽然表现不错,但交易者仍需关注趋势转换风险,适时止损保障资金。只有做到全面风险管理,才能长期获得稳定收益。

||

This strategy uses an ultra long period RSI indicator to generate trading signals based on RSI crossover with thresholds. 

Specifically, it adopts a very long RSI period, typically 50-100. Long signals are triggered when RSI crosses above oversold level. Short signals are generated on RSI crossing below overbought level.

The advantage of this strategy is the ultra long RSI can more precisely determine trend, filtering out short-term noise and avoiding whipsaws. However, RSI itself has lagging issues and cannot promptly detect reversals. Also, parameter tuning is required for different products.

In summary, the ultra long RSI reversal strategy suits medium-long term holding. Despite decent performance, attention is still required on trend change risks and timely stop loss to protect capital. Only with comprehensive risk management can steady profits be achieved in the long run.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|65|length|
|v_input_2|40|overSold|
|v_input_3|60|overBought|
|v_input_4_close|0|price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-03 00:00:00
end: 2023-09-10 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Kozlod - RSI Strategy - 1 minute", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)


// Inputs
length     = input(65)
overSold   = input(40)
overBought = input(60)
price      = input(close)

// RSI
vrsi = rsi(price, length)

if (crossover(vrsi, overSold))
    strategy.entry("RsiLE", strategy.long, comment="RsiLE")
if (crossunder(vrsi, overBought))
    strategy.entry("RsiSE", strategy.short, comment="RsiSE")

```

> Detail

https://www.fmz.com/strategy/426391

> Last Modified

2023-09-11 17:36:19
