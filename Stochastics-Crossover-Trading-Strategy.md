
> Name

Stochastics-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This strategy uses stochastics crossover between K and D lines to generate trading signals, a typical stochastics trading strategy.

## Strategy Logic

1. Calculate stochastics K and D lines over a given period.

2. K line crossover above D line generates buy signals.

3. K line crossover below D line generates sell signals.

4. Can set backtest date range to test strategy effectiveness.

5. Simple and clear rules trading stochastics crossover.

## Advantages

1. Stochastics sensitive to overbought and oversold levels.

2. K and D lines form easy trading signals.

3. Backtest verifies strategy performance.

4. Stochastics easy to compute and implement.

5. Concise code easy for further development.

## Risks

1. Crossovers may generate false signals. 

2. No stop loss or take profit in place.

3. Fails to differentiate trends and ranges.

4. Backtest carries look-ahead bias.

5. Real trading performance may differ from backtest.

## Enhancement

1. Test parameters to find optimum values.

2. Add trend filter for additional validation. 

3. Build in stop loss and take profit mechanisms.

4. Incorporate other factors for signal confirmation.

5. Handle backtest data to eliminate biases.

6. Paper trade to optimize parameters for live trading.

## Conclusion

This strategy trades simple stochastics crossovers, easy to implement but requires refinements for stability. Enhancing it via parameter tuning, risk controls etc can transform it into a robust quant trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|35|K|
|v_input_2|21|D|
|v_input_3|21|Smooth|
|v_input_4|2020|開始年|
|v_input_5|true|開始月|
|v_input_6|true|開始日|
|v_input_7|2030|終了年|
|v_input_8|12|終了月|
|v_input_9|31|終了日|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © utanico

//@version=4
strategy(title="Stochastic", overlay=true, shorttitle="Stoch")
periodK = input(35, title="K", minval=1)
periodD = input(21, title="D", minval=1)
smoothK = input(21, title="Smooth", minval=1)
startYear = input(type=input.integer, title = "開始年", defval = 2020)
startMonth = input(type=input.integer, title = "開始月", defval = 1)
startDay = input(type=input.integer, title = "開始日", defval = 1)
endYear = input(type=input.integer, title = "終了年", defval = 2030)
endMonth = input(type=input.integer, title = "終了月", defval = 12)
endDay = input(type=input.integer, title = "終了日", defval = 31)

//開始日時
test_start = timestamp(startYear, startMonth, startDay, 00, 00)
//終了日時
test_end   = timestamp(endYear, endMonth, endDay, 00, 00)
//テスト期間の指定
is_test = true

k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)

if (is_test)
    if (k > d)
        strategy.entry("Stoch_LE", strategy.long, comment="Stoch_LE")
    //if (strategy.opentrades > 0 and k < d)
        //strategy.close("Stoch_LE",comment="CloseLONG")
    if (k < d)
        strategy.entry("Stoch_SE", strategy.short, comment="Stoch_SE")
    //if (strategy.opentrades < 0 and k > d)
        //strategy.close("Stoch_SE",comment="CloseShort")
```

> Detail

https://www.fmz.com/strategy/427396

> Last Modified

2023-09-20 17:05:17
