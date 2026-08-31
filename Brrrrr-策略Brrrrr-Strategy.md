
> Name

Brrrrr-策略Brrrrr-Strategy

> Author

ChaoZhang

> Strategy Description



Stock “Brrrrr” Strategy Introduction  

This "Brrrrr" strategy is a trading strategy that aims to profit by going long or short cryptocurrencies based on monitoring stablecoin issuance changes. The name comes from the sound "Brrrrr" that represents money printing, reflecting how the strategy operates by tracking stablecoin printing to determine crypto price movements.

The basic principle is: when stablecoins are issued, Bitcoin price rises; when stablecoins are burned, Bitcoin price falls. Based on this, we can go long Bitcoin when stablecoins are printed and close position or short Bitcoin when stablecoins are burned.

To filter out excessive invalid signals, the strategy adopts Donchian Channel techniques. Only when stablecoin issuance exceeds the highest level in the past 50 days will a long signal trigger. Only when issuance falls below the lowest level in the past 50 days will a close or short signal trigger.

The advantage of this strategy is capturing the market dynamic of stablecoin impacts on crypto prices, and filtering some noise through technical indicators to give relatively accurate trade signals around major trend turning points. But risks exist as it relies on a single variable, and stablecoin issuance is unpredictable. 

In summary, the stock “Brrrrr” strategy is an interesting trading strategy worth further testing and optimizing based on monitoring stablecoin issuance, but traders should be cautious not to bet the farm on it. Combining more variables and indicators may further improve the strategy.



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
