
> Name

海龟突破EMA交叉策略Turtle-Breakout-EMA-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/170968c8b86961cddb2.png)

## Overview

This strategy uses two EMA lines of different periods to identify trend reversals through their crossovers as entry and exit signals. The strategy is simple and easy to implement.  

## Strategy Logic

The strategy calculates two EMA lines using ta.ema, one with length 10 for short term and one with length 20 for long term trend. It identifies EMA crossovers and crossunders using ta.crossover and ta.crossunder to determine entry and exit points. When the short EMA crosses over the long EMA, it goes long. When the short EMA crosses under the long EMA, it goes short. This way the EMA crossovers are used to capture turning points in the trend.

The strategy also uses a variable lastCrossTime to record the time of the last crossover to avoid repeated signals. On each valid crossover, it closes all current positions first, then opens a new position in the direction of the crossover. After opening the position, take profit and stop loss are set to exit.

## Advantages

1. The strategy logic is simple and clear, easy to understand and implement.

2. Using EMA crossovers to identify trend reversal points is a commonly used effective technical indicator strategy.

3. Adopting EMAs of different periods helps improve sensitivity to short term moves while still catching big trends.

4. Take profit and stop loss helps control the risk and reward of each trade. 

5. The lastCrossTime variable filters duplicate signals and avoids unnecessary trades.

## Risks

1. EMA crossovers can generate false signals, with some whipsaw risk.

2. Fixed TP and SL may fail to adapt to changing market conditions. Dynamic levels should be used.

3. Systems relying solely on EMA crossover can suffer losses in ranging markets. 

4. Trading costs like spread are not considered which impacts actual performance.

5. The strategy works better in trending rather than ranging markets.

Improvements can be made via optimizing TP/SL, adding filters, combining other indicators etc. Strict risk control and avoiding large single trade loss is essential for live trading.

## Enhancement

1. Test and optimize EMA periods to find better combinations.

2. Add other indicators like KDJ, MACD etc. to improve signal quality and avoid whipsaws.

3. Use dynamic take profit and stop loss, such as trailing stop along the trend.

4. Consider trading volume to confirm the signals.

5. Incorporate price action patterns like breakouts to strengthen signals. 

6. Account for trading costs like spread and optimize TP/SL levels accordingly.

## Conclusion

The strategy identifies trend reversals using EMA crossovers in a simple and straightforward way. TP/SL are used to control risks and rewards. It is easy to implement but EMA crossovers have whipsaw risks. Further optimizations can be done by tuning parameters, adding filters and combining other indicators to improve robustness. It performs better in trending rather than ranging markets. Strict risk management and optimal TP/SL sizing is crucial for live trading. Overall it serves as a basic trend following system and is a good starting point for algorithmic trading education.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Length EMA Short|
|v_input_int_2|20|Length EMA Long|
|v_input_int_3|true|Lot Size|
|v_input_int_4|600|Take Profit Level|
|v_input_int_5|200|Stop Loss Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-30 00:00:00
end: 2023-11-06 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('XXXquang', overlay=true)

// Sử dụng hàm input.int() và input.float() để tạo các trường nhập liệu với giới hạn giá trị
length1 = input.int(10, title="Length EMA Short", minval=1)
length2 = input.int(20, title="Length EMA Long", minval=1)
lotSize = input.int(1, title="Lot Size", minval=1)

takeProfitLevel = input.int(600, title="Take Profit Level", minval=1)
stopLossLevel = input.int(200, title="Stop Loss Level", minval=1)

ema1 = ta.ema(close, length1)
ema2 = ta.ema(close, length2)

var float lastCrossTime = na

if ta.crossover(ema1, ema2)
    if na(lastCrossTime)
        strategy.close_all()
    strategy.entry('Buy Order', strategy.long, qty=lotSize)
    strategy.exit('Exit Buy', 'Buy Order', profit=takeProfitLevel / syminfo.pointvalue, loss=stopLossLevel / syminfo.pointvalue)
    lastCrossTime := timenow

if ta.crossunder(ema1, ema2)
    if na(lastCrossTime)
        strategy.close_all()
    strategy.entry('Sell Order', strategy.short, qty=lotSize)
    strategy.exit('Exit Sell', 'Sell Order', profit=takeProfitLevel / syminfo.pointvalue, loss=stopLossLevel / syminfo.pointvalue)
    lastCrossTime := timenow

plot(ema1, title='EMA Short', color=color.new(color.blue, 0), linewidth=2)
plot(ema2, title='EMA Long', color=color.new(color.red, 0), linewidth=2)

```

> Detail

https://www.fmz.com/strategy/431400

> Last Modified

2023-11-07 15:40:08
