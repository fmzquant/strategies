
> Name

比较相对强度策略Comparative-Relative-Strength-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

比较相对强度策略是通过计算两个市场的相对强弱来产生交易信号。当被比较市场对基准市场显示出强势的时候,可以看作买入信号;而显露疲软时,为卖出信号。

具体交易逻辑是:

1. 选择被比较市场,例如特定股票

2. 选择基准市场,例如标普500指数

3. 计算被比较市场相对基准市场的强弱比

4. 当比率大于超买线时,做多该被比较市场

5. 当比率小于超卖区域时,做空该被比较市场

6. 设置回调线,价格回落时平仓

通过计算两个市场的相对强弱关系,该策略可以发现被低估的机会,也可避开被高估的局面。

## 策略优势

- 比较相对强弱,识别被低估机会

- 设置回调线,避免继续跟涨杀跌

- 操作规则简单清晰

## 策略风险

- 需要选择合适的比较基准市场

- 超买超卖区域需要优化判断

- 仅做多或做空无法获全市场机会

## 总结

比较相对强度策略通过比对两个市场的强弱来发现套利机会。但其参数设定和止损策略需要审慎评估。


||

## Strategy Logic 

The comparative relative strength strategy generates trades by comparing the relative strength of two markets. Outperformance of the comparison market versus the benchmark is seen as a buy signal, underperformance as a sell signal.

The logic is:

1. Select comparison market, e.g. a stock

2. Select benchmark market, e.g. S&P 500 index 

3. Compute ratio of comparison market vs benchmark 

4. Go long the comparison when ratio exceeds overbought level

5. Go short when ratio falls below oversold zone

6. Set pullback line to close positions when price falls back

By comparing relative strength, the strategy aims to uncover undervalued opportunities and avoid overvalued conditions.

## Advantages

- Compares relative strength to find undervaluation 

- Pullback line avoids chasing trends

- Simple and clear rules

## Risks

- Appropriate benchmark needs selection

- Overbought/oversold zones require optimization

- LONG/SHORT only misses full opportunities

## Summary

The relative strength strategy identifies arbitrage chances by comparing two markets. But parameter tuning and stop strategies require prudent assessment.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|BTC_USDT:swap|b|
|v_input_2|10|len|
|v_input_3|0.9988|BuyBand|
|v_input_4|0.996|SellBand|
|v_input_5|0.9975|CloseBand|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2023-09-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 10/03/2017
// Comparative Relative Strength Strategy for ES
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy("Comparative Relative Strength Strategy", shorttitle="CRS")
a = syminfo.tickerid 
b = input("BTC_USDT:swap") 
len = input(10) 
BuyBand = input(0.9988, step = 0.0001)
SellBand = input(0.9960, step = 0.0001)
CloseBand = input(0.9975, step = 0.0001)
reverse = input(false, title="Trade reverse")
hline(CloseBand, color=blue, linestyle=hline.style_dashed)
hline(SellBand, color=red, linestyle=hline.style_solid)
hline(BuyBand, color=green, linestyle=hline.style_solid)
as = security(a, timeframe.period, close) 
bs = security(b, timeframe.period, close) 
nRes = sma(as/bs, len)
pos = iff(nRes > BuyBand, 1,
	     iff(nRes < SellBand, -1,
	      iff(pos[1] == 1 and nRes < CloseBand, 0,
	       iff(pos[1] == -1 and nRes > CloseBand, 0, nz(pos[1], 0)))))
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	 
if (possig == 0)
    strategy.close("Long", when = possig == 0)	 
    strategy.close("Short", when = possig == 0)	 
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(as/bs, title="CRS", color=gray) 
plot(nRes, color=navy)
```

> Detail

https://www.fmz.com/strategy/426832

> Last Modified

2023-09-14 17:58:19
