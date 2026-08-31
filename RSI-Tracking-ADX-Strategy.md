
> Name

RSI-Tracking-ADX-Strategy

> Author

ChaoZhang

> Strategy Description



## Summary 

The RSI Tracking ADX strategy is a trend following strategy that combines the RSI indicator and the ADX indicator. It uses the RSI indicator to determine overbought and oversold conditions, and the ADX indicator to gauge trend strength, allowing entries during uptrends when not overbought and exits when trends weaken or become overbought.

## Strategy Logic

The strategy mainly utilizes a combination of the RSI indicator and the ADX indicator to determine entries and exits.

Entry conditions:

1. 20-day SMA rising;

2. ADX rising more than 0.2 from previous day, indicating strengthening trend; 

3. RSI below 85 to avoid overbought state;

Or:

1. 20-day SMA rising;

2. ADX rising but less than 0.2, indicating mild trend;

3. RSI below 50, room for rebound.

Exit conditions:

1. RSI above 75, overbought state;

2. ADX mild rise, weak trend;

Or: 

1. RSI above 75, overbought state;

2. ADX sharp rise, strong trend;

Or:

20-day SMA turning down.

The strategy uses RSI for overbought/oversold and ADX for trend to enter during uptrends when not overbought and exit when overbought or trend weakens. This allows following medium to long term uptrends.

## Advantages

The main advantages of this strategy are:

1. Combining RSI and ADX allows more accurate trend and overbought/oversold readings for better entries and exits.

2. ADX gauges trend strength to avoid whipsaw exits during consolidation.  

3. RSI uses loose parameters to follow medium to long term trends and reduce excessive trading.

4. Simple logic and easy implementation, suitable for long term holdings.

5. Configurable parameters allow flexibility.

## Risks

The main risks are:

1. ADX lag may miss trend turning points leading to larger losses.

2. Stop loss may trigger late during cliff-like price drops, enlarging losses.

3. RSI parameters too loose may cause overbought holdings for too long.

4. ADX parameters too sensitive may wrongly trigger exits during weak trends.  

5. Stocks may behave abnormally during market regime shifts.

Risk management:

1. Use shorter ADX periods for sensitivity.

2. Tighter stop loss to limit losses.

3. Shorten RSI periods to avoid prolonged overbought holdings.

4. Avoid ADX parameters too sensitive.

5. Manually override during significant market shifts.

## Enhancements

The strategy can be optimized by:

1. Testing RSI periods for better parameters.

2. Optimizing ADX periods for trend capturing ability.

3. Adding other indicators like MACD for confirmation.

4. Testing moving average combinations to improve entries. 

5. Adding profit taking and stop losses to enhance risk-reward ratio.

6. Judging market regimes to manually override at turning points.

## Conclusion

The RSI Tracking ADX strategy is an effective yet simple trend following strategy. It synergizes the strengths of RSI and ADX for accurate trend and overbought/oversold analysis. The logic is straightforward and easy to implement with optimization flexibility. Caution is needed against ADX lag and stop loss setting. Overall it is suitable for medium to long term trend tracking and can provide steady profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ADX Smoothing|
|v_input_2|14|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-03 00:00:00
end: 2023-10-09 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Copyright by Reed Asset Management registered in Shanghai, China
//该策略为上海蘆田资产管理有限公司制
//@version=2
strategy("[蘆田策略]ADX+RSI", overlay=true)

//ADX
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
	minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) => 
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)

sig = adx(dilen, adxlen)

plot(sig, color=red, title="ADX")

//ADX+RSI Strategy Long Entry
longEntry1 = sma(close, 20) > sma(close, 20)[1] //check if the ADX is rising
longEntry2 = (adx(14, 14) - adx(14, 14)[1]) > 0.2
longEntry3 = rsi(close, 14) < 85
longEntry4 = (adx(14, 14) - adx(14, 14)[1]) > 0
longEntry5 = (adx(14, 14) - adx(14, 14)[1] ) < 0.2
longEntry6 = rsi(close, 14) < 50

longCondition1 = longEntry1 and longEntry2 and longEntry3
longCondition2 = longEntry1 and longEntry4 and longEntry5 and longEntry6
if(longCondition1 or longCondition2)
    strategy.entry("long", strategy.long)

//ADX+RSI Strategy Long Exit
longExit1 = rsi(close, 9) > 75
longExit2 = (adx(14, 14) - adx(14, 14)[1]) > 0
longExit3 = (adx(14, 14) - adx(14, 14)[1] ) < 0.2
longExit4 = (adx(14, 14) - adx(14, 14)[1]) > 0.2
longExit5 = sma(close, 20) < sma(close,20)[1]

longExitCondition1 = longExit1 and longExit2 and longExit3
longExitCondition2 = longExit1 and longExit4
longStop1 = strategy.position_avg_price + 4 * tr
longExitCondition3 = longExit5
longStop2 = sma(close, 20)

strategy.close_all(when = longExitCondition1)
if (longExitCondition2)
    strategy.exit("exit", "long", stop = longStop1)
if (longExitCondition3)
    strategy.exit("exit", "long", stop = longStop2)
    

//Strategy

```

> Detail

https://www.fmz.com/strategy/428853

> Last Modified

2023-10-10 10:32:48
