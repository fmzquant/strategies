
> Name

Brrrrr-策略Brrrrr-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
股票"Brrrrr"策略是一种基于监控稳定币发行量变化,通过做多做空加密货币实现盈利的交易策略。该策略的名称来源于"Brrrrr"(即打印机运作的声音),意在表达策略的运作原理是通过追踪稳定币印制来判断加密货币的价格变动。

该策略的基本原理是:当稳定币增发时,比特币价格上涨;当稳定币回收燃烧时,比特币价格下跌。根据这一原理,我们可以在稳定币增发时做多比特币,在稳定币回收燃烧时平仓或者直接做空比特币。

为了过滤掉过多的无效信号,该策略采用唐奇安通道技术。只有当稳定币发行量超过近期50天内的最高值时,才触发做多信号。只有当稳定币发行量低于近期50天内的最低值时,才触发平仓或者做空信号。

该策略的优势在于捕捉到了稳定币发行对加密货币价格的影响这一市场规律,通过技术指标过滤了部分噪音,可以在大的趋势转折点给出较准确的交易信号。但该策略仅基于单一变量,且稳定币增发缩减难以预测,存在一定的当头风险。

总的来说,股票"Brrrrr"策略是一个基于监控稳定币发行的有趣的交易策略,值得进一步测试优化,但交易者需要谨慎对待,不能孤注一掷。通过组合其他多种变量和技术指标,或许可以进一步增强该策略的效果。


||

Stock “Brrrrr” Strategy Introduction  

This "Brrrrr" strategy is a trading strategy that aims to profit by going long or short cryptocurrencies based on monitoring stablecoin issuance changes. The name comes from the sound "Brrrrr" that represents money printing, reflecting how the strategy operates by tracking stablecoin printing to determine crypto price movements.

The basic principle is: when stablecoins are issued, Bitcoin price rises; when stablecoins are burned, Bitcoin price falls. Based on this, we can go long Bitcoin when stablecoins are printed and close position or short Bitcoin when stablecoins are burned.

To filter out excessive invalid signals, the strategy adopts Donchian Channel techniques. Only when stablecoin issuance exceeds the highest level in the past 50 days will a long signal trigger. Only when issuance falls below the lowest level in the past 50 days will a close or short signal trigger.

The advantage of this strategy is capturing the market dynamic of stablecoin impacts on crypto prices, and filtering some noise through technical indicators to give relatively accurate trade signals around major trend turning points. But risks exist as it relies on a single variable, and stablecoin issuance is unpredictable. 

In summary, the stock “Brrrrr” strategy is an interesting trading strategy worth further testing and optimizing based on monitoring stablecoin issuance, but traders should be cautious not to bet the farm on it. Combining more variables and indicators may further improve the strategy.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use short|
|v_input_int_1|50|len|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title = "Brrrrr strategy", shorttitle = "Brrrrr", overlay = false, default_qty_type = strategy.percent_of_equity, initial_capital = 100, default_qty_value = 100, commission_type = strategy.commission.percent, commission_value = 0.1)

//Settings
short = input(true, title = "Use short")
len = input.int(50, minval = 1, maxval = 1000)

//BRRRRR (USDT Printing)
brrrrr = request.security("GLASSNODE:USDT_SUPPLY", "D", close)

//Donchian channel
h = ta.highest(brrrrr, len)
l = ta.lowest(brrrrr, len)

//Lines
plot(h, color = color.lime)
plot(brrrrr)
plot(l, color = color.red)

//Trading
if brrrrr > h[1]
    strategy.entry("Long", strategy.long)
if brrrrr < l[1]
    if short
        strategy.entry("Short", strategy.short)
    if short == false
        strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/426582

> Last Modified

2023-09-13 14:53:16
