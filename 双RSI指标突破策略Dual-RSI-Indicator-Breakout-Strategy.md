
> Name

双RSI指标突破策略Dual-RSI-Indicator-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description



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
