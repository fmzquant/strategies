
> Name

移动平均线百分比反转策略Moving-Average-Percentage-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

移动平均线百分比反转策略通过计算价格与移动平均线的百分比差距来判断买卖时机。 当价格与移动平均线的差距达到一定百分比时产生交易信号。

具体来说,策略的交易逻辑是:

1. 计算价格与长度为N的移动平均线的差额
2. 将差额转换为百分比形式,即差额除以价格
3. 当百分比差距大于预设上限(如5%)时,做空
4. 当百分比差距小于预设下限(如-3%)时,做多
5. 可选择反转信号,即做多反转为做空,做空反转为做多

若N取14,上限设定为5%,下限设定为-3%,则:

- 当价格较14日移动平均线高出5%时,做空
- 当价格较14日移动平均线低出3%时,做多

通过调整N、上下限参数,可以控制策略的敏感度。

## 策略优势 

- 使用百分比形式,避免受价格绝对数值的影响
- 可根据市场调整参数,适用于不同周期
- 采用BREAK策略,可以较早捕捉趋势转折

## 策略风险

- 百分比差值无法确定趋势方向
- 容易发出错误信号,需进行过滤
- 移动平均线滞后,无法及时捕捉转折

## 总结

移动平均线百分比策略通过计算价格与移动平均线的百分比差距来判断买卖点位,采用BREAK策略,旨在捕捉趋势的转折点。通过调整参数可以适应不同的市场环境。但也存在一定的滞后性与误报风险,需要进行优化过滤。

||

## Strategy Logic 

The moving average percentage reversal strategy generates trading signals by calculating the percentage differential between price and a moving average. 

Trades are taken when the percentage gap between price and the MA reaches preset levels.

Specifically, the logic is:

1. Calculate the absolute difference between price and an N-period MA
2. Convert the difference to percentage terms, i.e. divide by price
3. Go short when the percentage gap exceeds an upper threshold (e.g. 5%) 
4. Go long when the percentage gap falls below a lower threshold (e.g. -3%)
5. Optionally reverse signals (longs become shorts, shorts become longs)

E.g. with N=14, upper limit=5%, lower limit=-3%:

- Go short when price is >5% above the 14-day MA
- Go long when price is <3% below the 14-day MA

Parameters N, upper/lower limits can adjust sensitivity.

## Advantages

- Percentage gaps account for changing price levels  
- Adjustable parameters suit different cycles
- BREAK strategy aims to catch trend turning points early

## Risks

- Percentage gaps alone cannot confirm trend direction
- Prone to false signals, needs additional filters
- MAs lagging, may not catch reversals promptly

## Summary

The MA percentage strategy uses the percentage gap between price and MA to identify potential turning points, with a BREAK approach. Adjustable parameters can adapt to varying market conditions, but lag and whipsaws are risks needing mitigation.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|0.54|SellZone|
|v_input_3|0.03|BuyZone|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/07/2018
// Percent difference between price and MA
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Percent difference between price and MA Backtest")
Length = input(14, minval=1)
SellZone = input(0.54, minval=0.01, step = 0.01)
BuyZone = input(0.03, minval=0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
hline(BuyZone, color=green, linestyle=line)
hline(SellZone, color=red, linestyle=line)
xSMA = sma(close, Length)
nRes = abs(close - xSMA) * 100 / close
pos = iff(nRes < BuyZone, 1,
       iff(nRes > SellZone, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=blue, title="PD MA")
```

> Detail

https://www.fmz.com/strategy/426774

> Last Modified

2023-09-14 14:53:53
