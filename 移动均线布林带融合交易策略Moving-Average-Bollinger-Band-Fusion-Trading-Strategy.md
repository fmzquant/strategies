
> Name

移动均线布林带融合交易策略Moving-Average-Bollinger-Band-Fusion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines moving averages and Bollinger Bands for dual indicator signal validation to determine and trade trends. Fast and slow moving average crosses provide long/short signals, with Bollinger Band breaks as additional confirmation to improve stability. 

## Strategy Logic

Fast and slow moving averages are calculated. When the fast line crosses above the slow line, a long signal is generated. Below gives a short signal. Bollinger Band upper and lower bands are also calculated. Moving average signals are only confirmed when price also breaks the Bollinger Bands. This avoids whipsaws from false breakouts.

## Advantages

- Dual indicator validation avoids false signals
- Moving averages determine main trend direction  
- Bollinger Bands confirm quality of breakout
- Ability to go both long and short provides flexibility

## Risks

- Moving averages and Bollinger Bands have lag
- Dual conditions limit trade frequency, unsuitable for high frequency trading
- Exact reversal points cannot be accurately determined
- Poor parameter tuning risks missing opportunities

Risks can be managed by shortening moving average and Bollinger periods or optimizing parameter combinations.

## Enhancements

- Test different moving average and Bollinger parameter combinations
- Consider adding stop loss strategies to control losses
- Optimize logic rules for dual validation
- Test robustness across different products

## Conclusion

This strategy validates signals with dual indicators to reduce false signals, suitable for medium/long-term holding. Further refinements like parameter optimization can improve performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|24|Bollinger Period Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MA-Zorrillo",overlay=true)

ma_short= sma(close,8)
ma_long= sma(close,89)

entry_ma = crossover (ma_short,ma_long)
exit_ma = crossunder (ma_short,ma_long) 


BBlength = input(24, minval=1,title="Bollinger Period Length")
BBmult = 2 // input(2.0, minval=0.001, maxval=50,title="Bollinger Bands Standard Deviation")
BBbasis = sma(close, BBlength)
BBdev = BBmult * stdev(close, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev

source = close
entry_bb = crossover(source, BBlower)
exit_bb = crossunder(source, BBupper)


vs_entry = false
vs_exit = false
for i = 0 to 63
    if (entry_bb[i])
        vs_entry :=  true
    if (exit_bb[i])
        vs_exit :=  true
        

entry = entry_ma and vs_entry
exit =  exit_ma and vs_exit

strategy.entry(id="long_ma",long=true,when=entry)
strategy.close(id="long_ma", when=exit)

strategy.entry(id="short_ma",long=false,when=exit)
strategy.close(id="short_ma",when=entry)

```

> Detail

https://www.fmz.com/strategy/427142

> Last Modified

2023-09-18 16:08:43
