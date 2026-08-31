
> Name

双移动平均线和RSI指标的多空交叉策略Swing-Dual-Moving-Average-and-RSI-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17075ed24b72b396dd3.png)

This strategy integrates dual moving average and RSI indicator to construct a crossover trading strategy between long and short positions. It can capture mid-to-long term trends while avoiding unnecessary noise trading with short-term indicators.  

#### Strategy Logic

This strategy adopts two sets of moving averages, consisting of fast moving average (EMA 59 and EMA 82) and slow moving average (EMA 96 and EMA 95). It goes long when price crosses above fast EMA, and goes short when price crosses below fast EMA. Meanwhile, the overbought and oversold area of RSI indicator is used to confirm trading signals and stop-loss.  

Specifically, when fast EMA breaks above slow EMA, a long signal is generated. If RSI is below 30 (oversold area) at this time, go long. When fast EMA breaks below slow EMA, a short signal is produced. If RSI surpasses 70 (overbought area) at this point, go short.

The advantage of using dual moving average is to better recognize changes in mid-to-long term trends. RSI filters out some noise trading from false breakouts.  

#### Advantages

- Capture mid-to-long term trends with dual moving averages  
- Filter noise trading with RSI indicator
- Combine trend following and mean reversion trading
- Simple and clear logic  

#### Risk Analysis 

- In largely range-bound markets, moving average signals may be subject to whipsaws
- RSI indicator also fails in certain market conditions
- Stop loss placement needs prudence to avoid too loose or too tight

#### Enhancement Areas

- Test longer cycle moving average combinations  
- Try different parameter tuning e.g. thresholds of RSI overbought/oversold areas
- Add additional filters like trading volume  
- Optimize stop loss strategies, incorporate dynamic stop loss with ATR etc.  

#### Summary
This strategy integrates the trend following of dual moving averages and mean reversion trading of RSI indicator. The dual EMAs track mid-to-long term trend directions, while RSI confirms validity of trading signals and stop loss. This is a simple and practical crossover strategy between long and short. It can be adapted to different market environments through parameter tuning and optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|500|period|
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
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Swing Hull/rsi/EMA Strategy", overlay=true,default_qty_type=strategy.cash,default_qty_value=10000,scale=true,initial_capital=10000,currency=currency.USD)

//A Swing trading strategy that use a combination of indicators, rsi for target, hull for overall direction enad ema for entering the martket.
// hull ma copied from syrowof HullMA who copied from mohamed982 :) thanks both
// Performance 

n=input(title="period",defval=500)

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
closeLong =  (crossover(vrsi, overSold))
closeShort = cShort 


// Strategy Logic
longCondition = n1> n2
shortCondition = longCondition != true

col =condUp ? lime : condDown ? red : yellow
plot(n1,color=col,linewidth=3)


if (not na(vrsi))
    if shortCondition    
        if (price[0] < maslow[0] and price[1] > mafast[1]) //cross entry
            strategy.entry("SYS-SHORT", strategy.short, comment="short")
strategy.close("SYS-SHORT", when=closeShort) //output logic

if (not na(vrsi))
    if longCondition // swing condition          
        if (price[0] < mafast[0] and price[1] > mafast[1]) //cross entry
            strategy.entry("SYS-LONG", strategy.long, comment="long")
strategy.close("SYS-LONG", when=closeLong) //output logic


// Stop Loss 


sl = input(75)
Stop = sl * 10
Q = 100


strategy.exit("Out Long", "SYS-LONG", qty_percent=Q, loss=Stop)
strategy.exit("Out Short", "SYS-SHORT", qty_percent=Q, loss=Stop)



//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/440702

> Last Modified

2024-02-01 11:48:51
