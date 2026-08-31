
> Name

玻尔兰德波带跟踪策略Bollinger-Band-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1faec17c3a825eb3de6.png)

### Overview

This strategy uses the Bollinger Band indicator combined with tracking stop loss to implement trend tracking trading. It goes short when the price breaks through the upper rail and goes long when the price breaks through the lower rail. By setting stop loss and take profit prices, profits can be locked. Meanwhile, this strategy also provides an optional reversal entry selection, which means making reverse orders when the price re-enters the band.

### Strategy Principle  

The strategy first calculates the middle rail, upper rail and lower rail of the Bollinger Band. The middle rail is the WMA with the length of Len, and the upper and lower rails represent the standard deviation multiplied by Deviation.

When the price breaks through the upper rail, go short; when the price breaks through the lower rail, go long. After opening position, set stop loss and take profit price. The stop loss price is the input Stop value, and take profit price is the input Limit value.

In addition, the strategy also provides the option for reversal opening. When “Reversal Entry” is checked, reverse orders will be made when the price re-enters the Bollinger Band, which belongs to MEAN REVERSION trading.

Whether it’s trend opening or reversal opening, the settings for stop loss and take profit are the same. There are two options for stop loss and take profit - fixed stop loss or trailing stop which will be adjusted according to price change.

### Advantage Analysis  

The strategy combines Bollinger Band indicator and tracking stop loss to effectively control risks while locking in trend profits. Reversal opening could reduce the probability of stop loss being triggered.

Bollinger Band upper and lower rails can clearly determine price breakthroughs. The banded trading method makes PnL results clear. Tracking stop loss adjusts stop loss position to prevent earned profits from being pulled back.

### Risk Analysis

The biggest risk of Bollinger Band strategy is trend reversal. After going short when price breaks through upper rail, price may appear V-shaped reversal, leading to quick stop loss. The long position faces similar situation.

Reversal opening may miss opportunities for trend continuation. Making reverse orders when price re-enters the band may reduce profits. 

In addition, improper parameter settings may also amplify risks. Len and Deviation need to be set cautiously, otherwise the risk of stop loss would increase.

### Optimization Direction  

The strategy can be optimized in the following aspects:

1. Add parameter adaptive functionality. Len and Deviation can be dynamically adjusted according to market volatility to make Bollinger Band closer to price.  

2. Add opening position filters. Additional conditions can be added such as trading volume surges and increase of trading transactions to avoid being pulled back.

3. Combine with other indicators’ filter signals. Judge trend tendency using indicators like MACD and KDJ to avoid wrong signals or missing signals.  

4. Add time restrictions. Only trading during certain period of time can reduce overnight risks.

### Summary  

The Bollinger Band tracking strategy determines price breakthroughs using Bollinger Band indicator. It locks profits by settings stop loss and take profit, and uses tracking stop loss to adjust risks. The strategy is simple and practical. Based on market conditions, trend trading or reversal trading can be selected. By optimizing parameters and adding filter conditions, risks could be further reduced to obtain more steady profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|Deviation|
|v_input_4|true|Trailing Stop(checked), Market stop(unchecked)|
|v_input_5|10000|Stop (in ticks)|
|v_input_6|20000|Limit Out|
|v_input_7|true|Reversal Entry(checked, Trend Entry(unchecked)|
|v_input_8|false|Limit Time of Day (Buying Side)|
|v_input_9|1600-0500|Start/Stop trades (Est time)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2024-02-26 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="BB Strategy (Basic)",overlay=true, initial_capital=25000, default_qty_value=1, commission_type=strategy.commission.cash_per_contract, commission_value=3.02)
len = input(20, minval=1, title="Length")
src = input(close, title="Source")
mult = input(2.0, "Deviation", minval=0.001, maxval=50)
//price_drop = input(.003, "When price drops (In Ticks) Enter Long", step=.001)
//price_climb = input(.003, "When price climbs (In Ticks) Enter Short", step=.001)
trail = input(true, "Trailing Stop(checked), Market stop(unchecked)")
stop = input(10000, "Stop (in ticks)", step=5)
limit = input(20000, "Limit Out", step=5)
//size = input(1, "Limit Position Size (pyramiding)", minval=1)
revt = input(true, "Reversal Entry(checked, Trend Entry(unchecked)")
timec = input(false, "Limit Time of Day (Buying Side)")

//calculations and plots
revti = if revt==false
    true
basis = wma(src, len)
dev = mult * stdev(src, len)
upper = basis + dev
lower = basis - dev
plot(basis, color=red)
p1 = plot(upper, color=teal)
p2 = plot(lower, color=teal)
fill(p1, p2)
u = crossover(high, upper) 
d = crossunder(low, lower)
//Time Session
sess = input("1600-0500", "Start/Stop trades (Est time)")
t = time(timeframe.period, sess)

//Orders
if(timec)
    strategy.entry("Enterlong", long=revt, when=d and t>1)
else
    strategy.entry("Enterlong", long=revt, when=d)
if(trail)
    strategy.exit("Exit","Enterlong", profit=limit, trail_points = 0, trail_offset = stop )
else
    strategy.exit("Exit","Enterlong", profit=limit, loss = stop )
    
if(timec)
    strategy.entry("Entershort", long=revti, when=u and t>1)
else
    strategy.entry("Entershort", long=revti, when=u)
if(trail)
    strategy.exit("Exit","Entershort", profit=limit, trail_points = 0, trail_offset = stop )
else
    strategy.exit("Exit","Entershort", profit=limit, loss = stop )
  


```

> Detail

https://www.fmz.com/strategy/442955

> Last Modified

2024-02-27 16:11:44
