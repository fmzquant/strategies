
> Name

短线跟踪趋势打压震荡策略EMA-Tracking-Trend-Suppressing-Oscillation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce258fdd16c6a1c581.png)
[trans]

## 概述

该策略综合利用了指标EMA、趋势跟踪策略TTS和舒弗特趋势周期STC三者指标的优势,形成了一个较强的短线跟踪趋势的策略。具体来说,策略会同时判断三个指标的多空信号是否一致,如果一致就产生交易信号;如果不一致,则不进行买卖。这样可以过滤掉一些假信号,使得策略更加可靠。

## 策略原理

该策略主要由三部分组成:EMA平滑指标、TTS趋势跟踪策略和STC舒弗特趋势周期指标。

首先,计算200周期的EMA指数移动平均线,判断价格是否低于或高于该EMA线,如果价格低于该线,则EMA指标给出空头信号;-1;如果价格高于该线,EMA指标给出多头信号:1。

其次,计算TTS趋势跟踪策略的相关参数,根据价格突破上下轨,判断行情趋势方向。如果价格突破上轨,产生多头信号1;如果价格突破下轨,产生空头信号-1。

最后,计算舒弗特趋势周期STC指标,该指标反映了价格中枢的变化趋势。如果STC指标上涨,产生多头信号1;如果STC指标下跌,产生空头信号-1。

在得到三个指标的judgment信号后,策略会判断它们是否一致。只有当三个指标judgment信号全部一致时,才会产生实际的交易信号。这可以有效过滤掉一些假信号,使策略更可靠。

如果确定产生交易信号后,就进行做多或做空的委托,并设置止盈止损点。

## 策略优势

1. 该策略综合运用了三种不同类型的指标,可以有效判断市场趋势方向。

2. 利用三种指标judgment信号的一致性判断来过滤假信号,可以减少不必要的交易,使策略更可靠。

3. 设置合理的止盈止损点,可以锁定盈利,避免亏损扩大。

4. 选取的参数均经过优化,可以适应大部分股票及外汇品种。

5. 交易逻辑清晰简洁,易于理解与修改。

## 策略风险

1. 三种指标judgment之间不一致时,会出现 dimers,容易错过交易机会。可以考虑优化judgment规则。

2. STC指标对参数敏感度较高,不同的品种需要调整参数。

3. 衰退行情中,止损可能被突破,造成较大亏损。可以考虑实时优化止损点。

4. 无法有效判断横盘整理的行情,整理区间入场可能造成套牢。

## 策略优化

1. 可以测试更多指标的组合,寻找更强的judgment规则。例如加入RSI指标等。

2. 优化STC指标的指标参数,使其更适合不同品种。加入自适应参数优化模块。

3. 增加自适应止损模块,可以根据行情实时优化设置止损点。

4. 增强平仓模块,判断是否进入横盘整理,避免套牢。

5. 针对高频交易进行算法优化,降低系统延迟,提升委托成功率。

## 总结

该策略综合运用EMA、TTS和STC三个指标判断行情趋势方向, judgment规则设置为三者一致时产生交易信号,这样可以有效过滤假信号。策略优化空间还很大,通过测试更多指标组合、加入自适应算法、优化高频交易模块等手段,进一步强化该策略在跟踪趋势过程中的表现。相比于简单追随均线等传统策略,该策略可以更加智能地判断市场,在抓住趋势的同时尽量避免被套。

||

## Overview

This strategy combines the advantages of three indicators: EMA, Trend Tracking Strategy (TTS) and Schaff Trend Cycle (STC) to form a strong short-term trend tracking strategy. Specifically, the strategy will judge whether the buy and sell signals of the three indicators are consistent. If they are consistent, trading signals will be generated; otherwise no trades will be made. This filters out some false signals and makes the strategy more reliable. 

## Strategy Principle  

The strategy consists of three main parts: EMA indicator, TTS trend tracking strategy and STC indicator.

Firstly, the 200-period EMA exponential moving average line is calculated. If the price is below this EMA line, the EMA indicator gives a sell signal: -1; if the price is above the line, the EMA indicator gives a buy signal: 1.

Secondly, the relevant parameters of the TTS trend tracking strategy are calculated. According to the price breakouts of the upper and lower rails, the market trend direction is determined. If the price breaks through the upper rail, a buy signal 1 is generated; if the price breaks through the lower rail, a sell signal -1 is generated.

Finally, the Schaff Trend Cycle (STC) indicator is calculated, which reflects the change trend of the price consolidation. If the STC indicator rises, it generates a buy signal 1; if the STC indicator falls, it generates a sell signal -1.

After obtaining the judgment signals from the three indicators, the strategy will determine whether they are consistent. Only when all three indicator judgment signals are consistent will actual trading signals be generated. This can effectively filter out some false signals and make the strategy more reliable. 

Once determining to generate trading signals, long or short positions will be opened and stop-profit/stop-loss points will be set.

## Advantages

1. The strategy combines three different types of indicators to effectively determine market trend direction.

2. Using the consistency of judgment signals from three indicators to filter out false signals can reduce unnecessary trades and make the strategy more reliable.

3. Setting reasonable stop-profit/stop-loss points can lock in profits and prevent losses from expanding.

4. The optimized parameters are suitable for most stocks and forex products. 

5. Simple and easy-to-understand trading logic.

## Risks

1. Inconsistency between indicator judgments may cause loss of trading opportunities. Judgment rules can be further optimized.

2. STC indicator is sensitive to parameters. Different products need parameter tuning.

3. In downtrends, stop loss may be penetrated, causing huge losses. Adaptive stop loss can be considered.  

4. Sideway consolidations cannot be effectively identified, leading to trap positions.

## Enhancements

1. Test more indicator combinations to find stronger judgment rules, e.g. adding RSI indicator.

2. Optimize STC parameters for better adaptation across different products. Add adaptive parameter optimization module.

3. Increase adaptive stop loss module to optimize stop loss points dynamically.  

4. Enhance position closing module to identify sideway ranges and avoid traps.

5. Optimize algorithms for high frequency trading, reducing latency and improving order fulfillment rates.

## Conclusion

The strategy combines EMA, TTS and STC indicators to determine market direction, with consistent judgments from all three triggering trades, effectively filtering out false signals. There is still large room for optimizations, e.g. testing more indicator combinations, adding adaptive algorithms, optimizing high frequency trading modules, etc, to further strengthen trend tracking capability. Compared to traditional strategies simply following moving averages, this strategy can judge markets more intelligently, capture trends while avoiding traps.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|0.1|(?Strategy)Profit %|
|v_input_int_1|21|(?Trend Trader Strategy)Length|
|v_input_float_2|3|Multiplier|
|v_input_int_2|12|(?Schaff Trend Cycle)Length|
|v_input_int_3|26|FastLength|
|v_input_int_4|50|SlowLength|
|v_input_float_3|0.5|AAA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-04-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ajahanbin1374

//@version=5
strategy(title = "EMA + TTS + STC", shorttitle = "EMA + TTS + STC", overlay = true, calc_on_order_fills=false, calc_on_every_tick = false, initial_capital = 100, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, commission_value = 0.01)

////////////////////////////////////////////////////////////
// Strategy entry
////////////////////////////////////////////////////////////
profit = input.float(defval = 0.1, minval = 0.0, title="Profit %", step=0.01, group = "Strategy") * 0.01

////////////////////////////////////////////////////////////
// Emponential Moving Average
////////////////////////////////////////////////////////////
ema = ta.ema(close, 200)
posEma = close < ema ? -1 : 1

////////////////////////////////////////////////////////////
// Trend Trader Strategy
////////////////////////////////////////////////////////////
Length = input.int(21, minval=1, group="Trend Trader Strategy")
Multiplier = input.float(3, minval=0.000001, group="Trend Trader Strategy")
avgTR = ta.wma(ta.atr(1), Length)
highestC = ta.highest(Length)
lowestC = ta.lowest(Length)
hiLimit = highestC[1] - avgTR[1] * Multiplier
loLimit = lowestC[1] + avgTR[1] * Multiplier
ret = 0.0
posTts = 0.0
ret:= close > hiLimit and close > loLimit ? hiLimit :
         close < loLimit and close < hiLimit ? loLimit : nz(ret[1], close)
posTts:=  close > ret ? 1 :close < ret ? -1 : nz(posTts[1], 0)


////////////////////////////////////////////////////////////
// Schaff Trend Cycle (STC)
////////////////////////////////////////////////////////////
EEEEEE = input.int(12, 'Length', group ="Schaff Trend Cycle")
BBBB = input.int(26, 'FastLength', group ="Schaff Trend Cycle")
BBBBB = input.int(50, 'SlowLength', group ="Schaff Trend Cycle")

AAAA(BBB, BBBB, BBBBB) =>
    fastMA = ta.ema(BBB, BBBB)
    slowMA = ta.ema(BBB, BBBBB)
    AAAA = fastMA - slowMA
    AAAA

AAAAA(EEEEEE, BBBB, BBBBB) =>
    AAA = input.float(0.5, group ="Schaff Trend Cycle")
    var CCCCC = 0.0
    var DDD = 0.0
    var DDDDDD = 0.0
    var EEEEE = 0.0
    BBBBBB = AAAA(close, BBBB, BBBBB)
    CCC = ta.lowest(BBBBBB, EEEEEE)
    CCCC = ta.highest(BBBBBB, EEEEEE) - CCC
    CCCCC := CCCC > 0 ? (BBBBBB - CCC) / CCCC * 100 : nz(CCCCC[1])
    DDD := na(DDD[1]) ? CCCCC : DDD[1] + AAA * (CCCCC - DDD[1])
    DDDD = ta.lowest(DDD, EEEEEE)
    DDDDD = ta.highest(DDD, EEEEEE) - DDDD
    DDDDDD := DDDDD > 0 ? (DDD - DDDD) / DDDDD * 100 : nz(DDDDDD[1])
    EEEEE := na(EEEEE[1]) ? DDDDDD : EEEEE[1] + AAA * (DDDDDD - EEEEE[1])
    EEEEE

mAAAAA = AAAAA(EEEEEE, BBBB, BBBBB)
mColor = mAAAAA > mAAAAA[1] ? color.new(color.green, 20) : color.new(color.red, 20)
posStc = mAAAAA > mAAAAA[1] ? 1 : -1

////////////////////////////////////////////////////////////
// Strategy entry
////////////////////////////////////////////////////////////
pos = posEma == 1 and posTts == 1 and posStc == 1 ? 1 : posEma == -1 and posTts == -1 and posStc == -1 ? -1 : 0

currentPostition = strategy.position_size > 0 ? 1 : strategy.position_size < 0 ? -1 : 0
noOpenPosition = strategy.position_size == 0

signal = pos != pos[1] and pos == 1 and noOpenPosition ? 1 : pos != pos[1] and pos == -1 and noOpenPosition ? -1 : 0

stopPriceForLong = math.min(close * (1 - profit), low[1] * 0.9998, low[2] * 0.9998)
limitPriceForLong = close + (close - stopPriceForLong)
stopPriceForShort = math.max(close * (1 + profit), high[1] * 1.0002, high[2] * 1.0002)
limitPriceForShort = close - (stopPriceForShort - close)

if signal == 1
    strategy.entry(id="L", direction=strategy.long)
    strategy.exit(id='EL', from_entry='L', limit=limitPriceForLong, stop=stopPriceForLong)
if signal == -1
    strategy.entry(id="S", direction=strategy.short)
    strategy.exit(id='ES', from_entry='S', limit=limitPriceForShort, stop=stopPriceForShort)

////////////////////////////////////////////////////////////
// Plots - Debuger
////////////////////////////////////////////////////////////
plotchar(signal, title='singal', char = '')
plotchar(posEma, title='posEma', char = '')
plotchar(posTts, title='posTts', char = '')
plotchar(pos, title='pos', char = '')
plotchar(currentPostition, title = 'currentPostition', char='')
plotchar(stopPriceForLong, title = "stopPriceForLong", char ='')
plotchar(limitPriceForLong, title = 'limitPriceForLong', char='')
plotchar(stopPriceForShort, title = "stopPriceForShort", char ='')
plotchar(limitPriceForShort, title = 'limitPriceForShort', char='')

////////////////////////////////////////////////////////////
// Plots
////////////////////////////////////////////////////////////
plot(ret, color=color.new(color.black, 0), title='Trend Trader Strategy')
plotchar(mAAAAA, color=mColor, title='STC', location = location.bottom, char='-', size=size.normal)
plot(series = ema, title = "ema")

```

> Detail

https://www.fmz.com/strategy/435133

> Last Modified

2023-12-12 15:52:37
