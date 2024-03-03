
> Name

突破均线的趋势追踪策略Breakthrough-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aacf7c5d1d564378b3.png)
[trans]

## 概述

该策略结合了移动平均线,幅度指标和抛物线转向指标,实现了对趋势的判断和突破点的确认,属于典型的趋势追踪策略。当判断到处于上升趋势且价格突破最高点时会建立做多头寸,实现趋势追踪;当判断趋势反转时会平仓止损。

## 策略原理

该策略使用双EMA判断价格趋势,使用SMA辅助判断。当快线EMA在慢线EMA之上,并且快线SMA在慢线SMA之上时,认为处于上升趋势。

使用抛物线转向指标PSAR判断价格反转点。当PSAR下穿价格最高点时,说明价格可能反转下跌,此时平仓止损。

当判断为上升趋势且PSAR上穿价格最高点时,说明价格继续上涨,此时做多追踪趋势。

## 优势分析

- 使用双EMA结合SMA判断趋势,可过滤假突破。
- PSAR可有效判断反转点,实现快速止损。
- 能够有效识别趋势转折点,及时建仓追踪。
- 规则清晰易操作。

## 风险分析

- 趋势判断存在错误的可能。
- 策略对交易品种参数需要优化,否则 chasing risk 可能较大。
- 存在未考虑交易成本的问题。

**解决方法:**

- 优化EMA和SMA参数,提高判断准确率。  
- 针对不同品种优化PSAR参数。
- 加入交易成本考量。

## 优化方向  

- 加入更多指标判断趋势,如BOLL,MACD等。
- 对品种参数进行训练和优化。  
- 考虑加入止损策略。
- 优化建仓和止损逻辑。

## 总结

该策略整体来说属于较为典型的趋势追踪策略。优点是规则较为清晰简单,能够识别趋势转折;缺点是对参数比较敏感,存在一定的 chasing risk。总体来说值得进一步优化和调整后实盘验证,主要优化方向在于参数优化、止损策略加入等。

||


## Overview

This strategy combines moving average, amplitude index and parabolic SAR indicator to judge the trend and confirm breakthrough points. It belongs to a typical trend following strategy. It will establish long position to track the trend when identifying an uptrend and price breakthrough. It will close position for stop loss when judging trend reversal.

## Principles  

The strategy uses double EMA to judge price trend and uses SMA as assistance. When fast EMA is above slow EMA and fast SMA is above slow SMA, it considers there is an uptrend.  

It uses parabolic SAR indicator to judge price reversal points. When PSAR goes below the highest price, it means price may reverse downwards. At this time it will close position for stop loss.

When judging an uptrend and PSAR goes above highest price, it means price keeps going up. At this time it will long to track the trend.

## Advantages

- Use double EMA with SMA to judge trend, which can filter false breakthrough.
- PSAR can effectively determine reversal points for quick stop loss.  
- Can effectively identify trend reversal points for timely establishing position to track.
- Simple and clear rules.

## Risks 

- Trend judgement may be wrong.
- The strategy needs parameter optimization for different products, otherwise chasing risk may be high.
- No consideration for trading cost.

**Solutions:**

- Optimize EMA and SMA parameters to improve judgement accuracy.
- Optimize PSAR parameters for different products.  
- Add in trading cost.

## Optimization

- Add more indicators like BOLL, MACD etc to judge trend.
- Train and optimize parameters for different products.
- Consider adding stop loss strategy.
- Optimize logics for opening position and stop loss.

## Summary  

The strategy belongs to a typical trend following strategy. The advantages are clear and simple rules and ability to identify trend reversal for timely position opening. The disadvantages are sensitivity to parameters and certain chasing risk. Overall it is worth further optimization and adjustment for live trading verification. The main optimization directions are parameter optimization, adding stop loss strategy etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|PSAR_start|
|v_input_2|0.02|PSAR_increment|
|v_input_3|0.2|PSAR_maximum|
|v_input_4|20|EMA_fast|
|v_input_5|40|EMA_slow|
|v_input_6|100|SMA_fast|
|v_input_7|200|SMA_slow|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-27 00:00:00
end: 2023-12-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Buy Dip MA & PSAR", overlay=true)

PSAR_start = input(0.02)
PSAR_increment = input(0.02)
PSAR_maximum = input(0.2)

EMA_fast = input(20)
EMA_slow = input(40)
SMA_fast = input(100)
SMA_slow = input(200)

emafast = ema(close, EMA_fast)
emaslow = ema(close, EMA_slow)
smafast = sma(close, SMA_fast)
smaslow = sma(close, SMA_slow)

psar = sar(PSAR_start, PSAR_increment, PSAR_maximum)
uptrend = emafast > emaslow and smafast > smaslow
breakdown = not uptrend

if (psar >= high and uptrend)
    strategy.entry("Buy", strategy.long, stop=psar, comment="Buy")
else
    strategy.cancel("Buy")

if (psar <= low)
    strategy.exit("Close", "Buy", stop=psar, comment="Close")
else
    strategy.cancel("Close")

if (breakdown)
    strategy.close("Buy")


plot(emafast, color=blue)
plot(emaslow, color=red)
```

> Detail

https://www.fmz.com/strategy/436879

> Last Modified

2023-12-28 15:47:21
