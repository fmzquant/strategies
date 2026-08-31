
> Name

Welles-Wilders-Trend-Balance-Point-System

> Author

ChaoZhang

> Strategy Description



### Overview

This is the original Trend Balance Point System created by Welles Wilder in 1978, with rules found in his book New Concepts in Technical Trading Systems. It identifies trend with momentum and sets stops/targets in a structured way to form a robust trend following system.

### Strategy Logic

The key components and rules are:

1. Momentum indicator: Calculates price change over N periods to determine trend.

2. Long condition: Momentum rising over current and previous two periods. 

3. Short condition: Momentum falling over current and previous two periods.

4. Stop loss: Previous day's average price ± previous day's range.

5. Take profit: 2 * previous day's average price - previous day low (long) or high (short).

6. Exits with stop or target after entry.

The strategy directly uses momentum for trend identification and a structured stop/target approach to control risk and form a robust trend following system.

### Advantages

Compared to other trend following strategies, the main advantages are:

1. Simple momentum calculation, easy to implement.

2. Multi-period combo filters noise. 

3. Structured stop/target is robust.

4. Limits loss per trade.

5. Drawdown controllable, profit taking clear.

6. Easy to operate flexibly.

7. Adjustable parameters for different markets. 

8. Intuitive and simple logic.

9. Overall good stability and risk control.

### Risks

However, the risks are:

1. Momentum lag may miss key turns.

2. Performance relies on parameter tuning.

3. No volume filter, risk of being trapped.

4. Stop/target settings are rigid, may fail in practice. 

5. Limited backtest period, need to verify long-term robustness. 

6. Fixed size lacks dynamic adjustment.

7. Limited optimization space, uncertain alpha. 

8. Need to monitor reward/risk ratios and curve fitting.

### Enhancements

In light of the analysis, enhancements may involve:

1. Testing different momentum calculations. 

2. Adding volume confirmation.

3. Optimizing stop/target parameters.

4. Introducing machine learning for dynamic signals.

5. Evaluating robustness across products and timeframes.

6. Constructing dynamic position sizing models. 

7. Setting maximum tolerable drawdown limit.

8. Optimizing risk management strategies.

9. Continual backtesting to prevent overfitting.

### Conclusion

In summary, this is a relatively simple and direct trend following system. But continual optimizations and robustness testing are key for any strategy to stay adaptive. Through systematic efforts, strategy performance and stability can be enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Momentum Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-09-22 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © 2020 X-Trader.net

//@version=3
strategy("Trend Balance Point System by Welles Wilder", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 10000)

MomPer = input(2, "Momentum Period")

isLong = strategy.position_size > 0
isShort = strategy.position_size < 0

longTrigger = mom(close, MomPer)[1] > mom(close, MomPer)[2] and mom(close, MomPer)[1] > mom(close, MomPer)[3]
shortTrigger = mom(close, MomPer)[1] < mom(close, MomPer)[2] and mom(close, MomPer)[1] < mom(close, MomPer)[3]

longEntry = (not isLong) and longTrigger 
shortEntry = (not isShort) and shortTrigger

longStop = valuewhen(longEntry, ((high[1]+low[1]+close[1])/3 - (high[1]-low[1])), 0)
longTP = valuewhen(longEntry, (2*(high[1]+low[1]+close[1])/3 - low[1]), 0)
shortStop = valuewhen(shortEntry, ((high[1]+low[1]+close[1])/3 + (high[1]-low[1])), 0)
shortTP = valuewhen(shortEntry, (2*(high[1]+low[1]+close[1])/3 - high[1]), 0)

strategy.entry(id = "Long", long = true, when = longEntry)
strategy.exit("Exit Long", "Long", profit = longTP, loss = longStop, when = isLong) 

strategy.entry(id = "Short", long = false, when = shortEntry)
strategy.exit("Exit Short", "Short", profit = shortTP, loss = shortStop, when = isShort) 


```

> Detail

https://www.fmz.com/strategy/427674

> Last Modified

2023-09-23 15:30:58
