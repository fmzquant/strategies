
> Name

双RSI指标突破策略Dual-RSI-Indicator-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

双RSI指标突破策略运用两个相对强弱指数(RSI)指标进行交易,一个快速RSI和一个慢速RSI,两者可以同方向交易。

具体逻辑是:

1. 分别计算快速RSI(例如16周期)和慢速RSI(例如31周期)

2. 当快速RSI低于超卖线(如30)时生成买入信号

3. 当慢速RSI低于超卖线(如30)时也生成买入信号

4. 快速RSI和慢速RSI可以在同一天同时发出买入信号

5. 快速RSI上穿70时平仓

6. 慢速RSI上穿68时平仓

7. 设置回撤止损线

双RSI指标能在超买超卖区域发现较佳机会。快慢速线结合可以实现多级进场,跟踪趋势运行。止损可控制风险。

## 策略优势

- 快慢RSI互相验证,减少假信号

- 多级进场可按次充分跟踪趋势

- 设置不同的利润取利点和止损点

- 回撤止损进一步控制风险

## 策略风险

- 需反复测试优化RSI参数

- 双重入场会增大交易风险系数

- 止损过于接近,可能被震出

## 总结

双RSI指标策略综合运用双时间轴指标,在控制风险前提下,实现多点进场以跟踪趋势。参数优化和严格止损是关键所在。总体而言,该策略适合追踪中长线方向性行情。


||

## Strategy Logic

The Dual RSI strategy trades using two Relative Strength Index (RSI) indicators, a fast RSI and a slow RSI, both allowing trades in the same direction.

The logic is:

1. Calculate a fast RSI (e.g. 16 period) and slow RSI (e.g. 31 period)

2. Long signals are generated when the fast RSI crosses below oversold level (e.g. 30)

3. Long signals also triggered when the slow RSI crosses below oversold level 

4. Fast and slow RSI can both signal longs on the same day

5. Fast RSI closing above 70 exits the trade 

6. Slow RSI closing above 68 exits the trade

7. A trailing stop loss is set

The dual RSI identifies opportunities in overbought/oversold regions. Combining fast and slow lines allows multi-step entries to ride trends. The stop loss controls risk.

## Advantages

- Fast/slow RSI validate and reduce false signals

- Multi-step entries to fully capitalize on trends

- Different profit take and stop loss levels 

- Trailing stop further manages risk

## Risks

- Requires optimization of the RSI parameters

- Dual entries increase risk exposure

- Stop loss too close risks getting stopped out

## Summary

The dual RSI strategy utilizes two timeframes for entries while controlling risk. Parameter optimization and strict stops are key. Overall it suits trend-following of mid- to long-term directional moves.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|16|FastRSILen|
|v_input_2|31|SlowRSILen|
|v_input_3|91|overSold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//  @version=4
//  © HermanBrummer
//  This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

strategy("DUAL RSI", "RSI", 1, pyramiding=2)
///     USES TWO RSI'S BOTH OF THEM CAN TRADE IN THE SAME DIRECTION AT THE SAME TIME -- ONE SLOW RSI, AND ONE FAST RSI
///     BOTH RSI'S HAVE DIFFERENT LENGHTS ONE IS FAST AND HAS A SETTTING OF 16 ONE IS SLOW AND HAS A SETTING OF 31
///     BOTH RSI'S HAVE DIFERENT EXIT PARAMETERS
///     PYRAMIDING ALLOWS THE SYSTEM TO BUY ONE DO ONE SLOW RSI AND ONE FAST RSI BUY ON THE SAME DAY
///     FASTRSI     EXITS AT 70 RSI LEVEL
///     SLOW RSI    EXITS AT 68 RSI LEVEL


FastRSILen      = input( 16 )
SlowRSILen      = input( 31 )

overSold        = input( 91 )

FastRsi         = rsi(ohlc4, FastRSILen)
SlowRsi         = rsi(ohlc4, SlowRSILen)

aboveMaFilter   = close > sma(close, 200)
StopLossLine    = strategy.position_avg_price * .90

plot(StopLossLine, "StopLossLine", #ff0000)
// plot(FastRsi, "FastRsi", color.yellow, 2)
// plot(SlowRsi, "SlowRsi", color.purple, 2)

FastBuy         = FastRsi < overSold and aboveMaFilter //and strategy.position_size != 1
SlowBuy         = SlowRsi < overSold and aboveMaFilter //and strategy.position_size != 1


//     FAST_BUY
strategy.entry("Fast Enter", true, when=FastBuy)
    
if  FastRsi > 70    /// SELLS IF RSI == 75
    strategy.close("Fast Enter", comment="Fast Exit")
    
strategy.exit("Stop Loss", "Fast Enter", stop=StopLossLine)       



// // ///     SLOW_BUY
strategy.entry("Slow Enter", true, when=SlowBuy)
    
strategy.exit("Stop Loss", "Slow Enter", stop=StopLossLine)       

if  SlowRsi > 68    /// SELLS IF RSI == 68
    strategy.close("Slow Enter", comment="Slow Exit")












```

> Detail

https://www.fmz.com/strategy/426781

> Last Modified

2023-09-14 15:34:46
