
> Name

双均线交叉短线策略Dual-Moving-Average-Crossover-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d191446175cf1e7518.png)



### Overview

The Dual Moving Average Crossover is a simple and effective scalping strategy that uses crossover signals between price and moving averages as entry and exit signals to capture short-term trend movements.

### Strategy Logic

The strategy employs two moving averages of different periods - a shorter-term MA line and a longer-term MA line. It generates buy signals when the shorter period MA crosses above the longer period MA from below. Sell signals are generated when the shorter MA crosses below the longer MA from above.

The strategy first defines the variable 'length' to specify the period of the longer MA line as 50. It then defines 'price' as the closing price and calculates the MA value of length 50 and stores it in the 'ma' variable. It further defines 'bcond' to check if price is above ma value. If yes, 'bcount' is incremented by 1, otherwise reset to 0. When 'bcond' triggers 'confirmBars' times consecutively (default 2), a buy signal is generated. Sell signals are generated similarly when price falls below ma.

To filter out some invalid signals, additional filters like 'clc', 'clc0' and 'clc1' are added which check the price relationship between the current and previous bars. Trade signals are generated only when these conditions are met. 

Finally, existing positions are closed out when price crosses the MA lines in reverse.

### Advantages

- Simple logic, easy to understand and implement.
- Captures short-term trends effectively using MA system. 
- Added filters reduce interference from invalid signals.
- Fixed stop loss mechanism controls loss on single trade.

### Risks

- Prone to whipsaws in ranging markets, leading to extra costs.
- Fixed parameters like MA periods may not suit all market conditions.
- Fixed stop loss may exit early in strong trending moves beyond stop level.

The risks can be mitigated by using dynamic MA periods based on volatility, trailing stops or percentage stops, etc.

### Enhancements

The strategy can be improved in several ways:

1. Optimize MA parameters dynamically based on volatility. 

2. Add extra filters like volume spike to improve signal quality.

3. Use floating or percentage stops to reduce premature stop outs.

4. Combine with other indicators like MACD, RSI for multicondition validation. 

5. Add automated risk management like dynamic position sizing to control loss per trade.

6. Use machine learning for more accurate signal generation model.

### Conclusion

The dual MA crossover strategy is an effective system for short-term trading. Fine tuning parameters, managing risks and combining with other tools can further enhance its profitability. Overall it is simple to understand and implement for scalping smaller intraday moves.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|length|
|v_input_2|2|confirmBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("MovingAvg Cross", overlay=true)
length = input(50)
confirmBars = input(2)
price = close

ma = sma(price, length)

bcond = price > ma

bcount = 0
bcount := bcond ? nz(bcount[1]) + 1 : 0

clc=close[0]>close[1]
clc0=close[0]>open[0]
clc1=close[1]>open[1]

if clc and clc0 and clc1 and (bcount == confirmBars)
    strategy.entry("buy", strategy.long)


scond = price < ma
scount = 0
scount := scond ? nz(scount[1]) + 1 : 0

csc=close[0]<close[1]
csc0=close[0]<open[0]
csc1=close[1]<open[1]

if csc and csc0 and csc1 and (scount == confirmBars)
    strategy.entry("sell", strategy.short)

strategy.close("buy", when=scond)
strategy.close("sell",when=bcond)
    
plot(ma, color=color.red)
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

```

> Detail

https://www.fmz.com/strategy/430549

> Last Modified

2023-10-30 11:19:48
