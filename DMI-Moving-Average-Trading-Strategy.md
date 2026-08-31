
> Name

DMI-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



Recently I have developed a new quantitative trading strategy mainly based on the DMI indicator to identify bottoms and tops in the market. This article will explain in detail the rationale, advantages and potential risks of this trading strategy.

## Strategy Logic  

The DMI indicator, short for Average Directional Movement Index, was created by Welles Wilder in the 1970s to gauge the trend and strength of the market. The DMI consists of three lines:

- +DI: representing the strength of uptrend
- -DI: representing the strength of downtrend
- ADX: representing the overall trend strength

When +DI crosses above -DI, it indicates strengthening uptrend and long position can be considered. When -DI crosses above +DI, it signals strengthening downtrend and short position can be considered.

The core logic of this strategy is:

1. Go long when +DI drops below 10 and -DI rises above 40
2. Go short when -DI drops below 10 and +DI rises above 40

That is to say, when the reverse DI diverges significantly from the forward DI, it can be judged that the current trend is likely to reverse, and reverse trading position can be taken appropriately. 

To filter noise, this strategy adopts moving average of DI with parameters set as:

- Period of +DI and -DI is 11
- Smoothing period of ADX is 11

By tuning the moving average parameters, the frequency of trading signals can be adjusted.

This strategy is mainly applied to trading NIFTY50 index options. It can also be used on other products. Specifically for trading, choose at-the-money options, set stop loss at 20%, add positions if loss exceeds 10%, but stop out if loss expands over 20% of initial capital.

## Advantages of the Strategy

Compared to simple DI cross strategies, this strategy uses DI moving averages to filter noise and reduce trades, thus lowering transaction costs and slippage. 

Compared to pure trend following strategies, this strategy is more precise at catching trend reversal points, enabling timely entries around turns.

The strategy optimization is simple with flexible parameters for performance tuning.

## Risk Warnings

This strategy only provides directional signals. Specific requirements on stop loss and take profit should be set according to personal risk preference.

DMI may produce many false signals during range-bound periods. Avoid using this strategy in non-trending markets.

DI crossovers cannot fully predict trend reversals. There could be some timing errors. Other indicators should be used to validate the trading signals.

## Conclusion

By screening with DI moving averages, this strategy can effectively identify trend reversal opportunities. Compared to other trend following strategies, it has the advantage of stronger reversal recognition abilities. Overall, this strategy has flexible parameter tuning and can be used as a module in quantitative trading systems. Pay attention to false signals and properly assess the market regime when using it.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|11|ADX Smoothing|
|v_input_int_2|11|DI Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-05 00:00:00
end: 2023-09-12 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © email_analysts
// This code gives indication on the chart to go long based on DMI and exit based on RSI. 
//Default value has been taken as 14 for DMI+ and 6 for RSI.
//@version=5
strategy(title="DMI Strategy", overlay=false)
lensig = input.int(11, title="ADX Smoothing", minval=1, maxval=50)
len = input.int(11, minval=1, title="DI Length")
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = ta.rma(ta.tr, len)
plus = fixnan(100 * ta.rma(plusDM, len) / trur)
minus = fixnan(100 * ta.rma(minusDM, len) / trur)
sum = plus + minus
adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), lensig)
//plot(adx, color=#F50057, title="ADX")
plot(plus, color=color.green, title="+DI")
plot(minus, color=color.red, title="-DI")
hlineup = hline(40, color=#787B86)
hlinelow = hline(10, color=#787B86)

buy = plus < 10 and minus > 40
if buy
    strategy.entry('long', strategy.long)

sell = plus > 40 and minus < 10
if sell
    strategy.entry('short', strategy.short)


```

> Detail

https://www.fmz.com/strategy/426579

> Last Modified

2023-09-13 14:42:19
