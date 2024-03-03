
> Name

EMA-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
EMA交易策略

该策略基于EMA均线进行判断,具体交易规则如下:

- 如果前一天收盘价高于EMA均线,则第二天开盘做多入场。

- 如果当前K线收盘价低于EMA均线,则平掉多单。

该策略的优点是:

- 使用EMA判断趋势方向
- 规则简单清晰,容易实现
- 可自定义EMA周期进行优化

但该策略也存在一些问题:

- 在盘整时容易产生错误信号
- 入场时机较晚,容易被套
- 没有止损设置,存在亏损风险
- 没有考虑交易频率和资金管理

总体来说,EMA策略更适用于趋势行情,但需要谨慎使用,应加入止损和过滤条件来优化该策略。

||EMA Trading Strategy 

This strategy trades based on EMA analysis, with the following rules:

- Enter long if previous day's close is above EMA

- Exit long if current candle closes below EMA

Advantages of this strategy:

- Uses EMA to determine trend direction
- Simple and clear rules, easy to implement  
- Customizable EMA period for optimization

Potential issues:

- Prone to false signals during range-bound markets
- Late entry, risks being caught in whipsaws
- No stop loss, risks uncontrolled losses
- No trade frequency or position sizing rules 

Overall, the EMA strategy works better in trending markets but should be used cautiously. Adding stops and filters would help optimize the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|
|v_input_2|2000|Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ericdwyang

//@version=5
strategy("EMA Strat", overlay=true, margin_long=100, margin_short=100)

// EMA Variables
emaInput = input(21, "Length")
ema = ta.ema(close, emaInput)

// Variable Declaration
p = 0

start = false

// Start Date
yearInput = input(2000, "Year")
if (time >= timestamp(2000,01,01,01,01))
    start := true


// Check first candle relative to EMA
if (close > ema and start == true)
    p += 1
    strategy.entry("Long", strategy.long, comment = "Entry")
    

// Candle close above EMA (p + 1, count reset to 0)
above = close[1] > ema[1]
if (above)
    p += 1



// Candle close below EMA (reset p to 0, count -1)
below = close < ema
if (below)
    p := 0
    strategy.close("Long", comment = "Flat")

// // Exit Position
// if (redCount == -2)
//     strategy.close("Long", comment = "Flat")
    
// goLong = p[1] == 0 and p == 1
// flatten = p == 0
    
// // Restablish long    
// if (goLong and start == true)
//     strategy.entry("Long", strategy.long, comment = "Entry")
    

plot(p)
plot(ema)

    
```

> Detail

https://www.fmz.com/strategy/426338

> Last Modified

2023-09-11 12:02:56
