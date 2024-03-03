
> Name

30分钟震荡交易策略30-Minute-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

该策略旨在使用30分钟时间框架识别中短线的震荡机会。它综合运用移动平均线、RSI指标等来判断行情方向和入场时机。

主要交易逻辑:

1. 计算两条加权移动平均线周期不同的均线,比较二者方向

2. 计算RSI指标判断超买超卖现象

3. 当RSI指标出现超卖区域时,考虑该点位的震荡交易机会

4. 结合均线方向来确认具体的做多做空方向

5. 入场后设定合理止损来控制风险

该策略试图抓取中短线价格的反转机会,在严格的资金管理下,通过频繁交易实现资金的增长。

## 策略优势

- 30分钟能识别较短周期的震荡

- RSI判断超买超卖许多反转机会

- 加权移动平均线平滑价格

## 策略风险

- 需要频繁监控市场变化

- 反转不存在确定性,可能出现亏损

- 高频交易将增加交易成本

## 总结

该策略试图通过30分钟周期挖掘中短线震荡机会。但交易频率较高,需关注成本控制,并优化策略参数来实现持续盈利。


||


## Strategy Logic

This strategy aims to identify medium-term swing trades using the 30-minute timeframe. It combines moving averages, RSI and more to gauge direction and entry timing.

The key trading logic:

1. Compute two weighted moving averages of differing periods and compare their slope  

2. Use RSI indicator to identify overbought/oversold levels

3. Consider swing trade opportunities at extreme RSI levels

4. Confirm long/short direction using moving average slope 

5. Enter trades with reasonable stop loss for risk control

The strategy seeks to capture reversal opportunities in the medium-term, growing capital through frequent trading and strict risk management. 

## Advantages

- 30-minute timeframe identifies shorter-term swings

- RSI signals many reversal chances at extremes

- Weighted moving averages smooth prices

## Risks

- Requires constant market monitoring 

- Reversals not guaranteed, losses possible

- High frequency trading increases costs

## Summary

This strategy aims to uncover medium-term swing trades using 30-minute patterns. But higher trade frequency necessitates cost controls and parameter optimization for sustained profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|70|period|
|v_input_2|14|length|
|v_input_3|70|overSold|
|v_input_4|30|overBought|
|v_input_5|59|fastLength|
|v_input_6|82|fastLengthL|
|v_input_7|96|slowLength|
|v_input_8|95|slowLengthL|
|v_input_9|75|sl|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy("cowboy30minswing", overlay=true,default_qty_type=strategy.cash,default_qty_value=10000,scale=true,initial_capital=10000,currency=currency.USD)

//A Swing trading strategy that use a combination of indicators, rsi for target, hull for overall direction enad ema for entering the trade using the 30min


n=input(title="period",defval=70)

n2ma=2*wma(close,round(n/2))
nma=wma(close,n)
diff=n2ma-nma
sqn=round(sqrt(n))

n2ma1=2*wma(close[1],round(n/2))
nma1=wma(close[1],n)
diff1=n2ma1-nma1
sqn1=round(sqrt(n))

n1=wma(diff,sqn)
n2=wma(diff1,sqn)
c=n1>n2?green:red
ma=plot(n1,color=c)



// RSi and Moving averages

length = input( 14 )
overSold = input( 70)
overBought = input( 30)
point = 0.0001
dev= 2

fastLength = input(59)
fastLengthL = input(82)
slowLength = input(96)
slowLengthL = input(95)
price = close

mafast = ema(price, fastLength)
mafastL= ema(price, fastLengthL)
maslow = ema(price, slowLength)
maslowL = ema(price, slowLengthL)
vrsi = rsi(price, length)
cShort =  (crossunder(vrsi, overBought))

condDown = n2 >= n1
condUp = condDown != true



col =condUp ? lime : condDown ? red : yellow
plot(n1,color=col,linewidth=3)




 


sl = input(75)
Stop = sl * 10
Q = 100





//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
if condUp
    strategy.entry("Enter Long", strategy.long)
else if condDown
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/426824

> Last Modified

2023-09-14 17:44:03
