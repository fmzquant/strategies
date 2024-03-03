
> Name

Renko反转追踪策略Renko-Reversal-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

### 策略概述

Renko反转追踪策略是一种利用Renko图形来判断市场反转的短线策略。它通过监控相邻Renko颜色的变化来捕捉短期反转机会。当出现连续同色Renko后下一Renko变色时产生交易信号。

### 策略原理

1. 使用传统不修复Renko。

2. 监控相邻两Renko的颜色变化。

3. 当前一Renko和前两Renko颜色相同,当前Renko颜色反转时,产生信号。

4. 做多信号:两阴砖后出现一阳砖,看涨;

5. 做空信号:两阳砖后出现一阴砖,看跌。

6. 入场方式可选择市价单或止损单。

7. 设置止盈止损点位为Renko大小的一定倍数。

该策略核心为抓住Renko颜色反转造成的短期回调机会。连续同色Renko代表趋势形成,下一Renko变色预示可能的反转。

Renko大小和止盈止损系数可调整以优化策略效果。

### 策略优势

- Renko直接显示反转信息

- 规则简单清晰,易于操作

- 多空机会对称

- 可灵活调整Renko大小

- 止盈止损严格控制风险

### 风险警示

- 需要一定数量的连续Renko才能形成信号

- Renko大小直接影响收益和回撤

- 无法判断趋势持续时间

- 可能出现连续止损的情况

### 总结

Renko反转追踪策略对传统技术指标进行创新运用,通过直接Renko变色判断短期反转机会。该策略简单实用,可通过参数调整获得稳定收益,值得进行回测验证和实盘优化后应用。


||

### Strategy Overview

The Renko reversal tracking strategy is a short-term trading strategy that uses Renko bricks to identify market reversals. It captures short-term reversal opportunities by monitoring color changes between adjacent bricks. Trading signals are generated when the current brick color flips after consecutive same-colored bricks.

### Strategy Logic

1. Use traditional non-repainting Renko bricks. 

2. Monitor color changes between neighboring bricks.

3. Signals emerge when current brick color flips while previous two bricks share the same color.

4. Long signal: Bullish brick appears after two bearish bricks.

5. Short signal: Bearish brick appears after two bullish bricks.

6. Entry options: market order or stop order.

7. Set stop loss/take profit at brick size multiplied by a coefficient. 

The core is capitalizing on pullback opportunities caused by brick color flips. Consecutive same-colored bricks represent trend formation, and next brick flipping color indicates potential reversals.

Brick size and stop loss/take profit coefficients can be tuned for optimization.

### Advantages of the Strategy

- Bricks directly display reversal information 

- Simple and clear logic, easy to implement

- Symmetrical long and short opportunities 

- Flexible brick size adjustment

- Strict risk control with stop loss/take profit

### Risk Warnings

- Requires a certain number of consecutive bricks to form signals

- Brick size directly impacts profit/drawdown

- Hard to determine trend duration

- Consecutive stop loss may occur

### Conclusion

The Renko reversal tracking strategy innovatively applies traditional technical indicators by directly using brick color flips to identify short-term reversals. Simple and practical, this strategy can achieve steady returns through parameter tuning, and is worth backtesting, live optimization, and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Brick size multiplier: use high value to avoid SL and TP|
|v_input_2|true|Use stop orders instead of market orders|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-08 18:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Simple Renko strategy, very profitable. Thanks to vacalo69 for the idea.
//Rules when the strategy opens order at market as follows:
//- Buy when previous brick (-1) was bearish and previous brick (-2) was bearish too and actual brick close is bullish
//- Sell when previous brick (-1) was bullish and previous brick (-2) was bullish too and actual brick close is bearish
//Rules when the strategy send stop order are the same but this time a stop buy or stop sell is placed (better overall results).
//Note that strategy open an order only after that condition is met, at the beginning of next candle, so the actual close is not the actual price.
//Only input is the brick size multiplier for stop loss and take profit: SL and TP are placed at (brick size)x(multiplier) Or put it very high if you want startegy to close order on opposite signal.
//Adjust brick size considering: 
//- Strategy works well if there are three or more consecutive bricks of same "color"
//- Expected Profit
//- Drawdown
//- Time on trade
//
//Study with alerts, MT4 expert advisor and jforex automatic strategy are available at request.
//

strategy("Renko Strategy Open_Close", overlay=true, calc_on_every_tick=true, pyramiding=0,default_qty_type=strategy.percent_of_equity,default_qty_value=100,currency=currency.USD)

//INPUTS
Multiplier=input(1,minval=0, title='Brick size multiplier: use high value to avoid SL and TP')
UseStopOrders=input(true,title='Use stop orders instead of market orders')

//CALCULATIONS
BrickSize=abs(open[1]-close[1])
targetProfit = 0
targetSL = 0

//STRATEGY CONDITIONS
longCondition = open[1]>close[1] and close>open and open[1]<open[2]
shortCondition = open[1]<close[1] and close<open and open[1]>open[2]

//STRATEGY
if (longCondition and not UseStopOrders)
    strategy.entry("LongBrick", strategy.long)
    targetProfit=close+BrickSize*Multiplier
    targetSL=close-BrickSize
    strategy.exit("CloseLong","LongBrick", limit=targetProfit, stop=targetSL)
    
if (shortCondition and not UseStopOrders)
    strategy.entry("ShortBrick", strategy.short)
    targetProfit = close-BrickSize*Multiplier
    targetSL = close+BrickSize
    strategy.exit("CloseShort","ShortBrick", limit=targetProfit, stop=targetSL)

if (longCondition and UseStopOrders)
    strategy.entry("LongBrick_Stop", strategy.long, stop=open[2])
    targetProfit=close+BrickSize*Multiplier
    targetSL=close-BrickSize
    strategy.exit("CloseLong","LongBrick_Stop", limit=targetProfit, stop=targetSL)
    
if (shortCondition and UseStopOrders)
    strategy.entry("ShortBrick_Stop", strategy.short, stop=open[2])
    targetProfit = close-BrickSize*Multiplier
    targetSL = close+BrickSize
    strategy.exit("CloseShort","ShortBrick_Stop", limit=targetProfit, stop=targetSL)
```

> Detail

https://www.fmz.com/strategy/426927

> Last Modified

2023-09-15 16:28:21
