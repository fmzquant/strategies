
> Name

RSI追踪ADX策略RSI-Tracking-ADX-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

RSI追踪ADX策略是一个融合RSI指标和ADX指标的长线趋势跟踪策略。该策略通过RSI指标判断行情超买超卖与否,结合ADX指标判断当前趋势强弱,实现在趋势向上且不超买的情况下进行长仓入场,在趋势转弱或超买时进行平仓退出的长线持仓策略。

## 策略原理

该策略主要使用RSI指标和ADX指标的组合来判断入场和退出时机。

入场条件:
1. 20日SMA上涨;
2. ADX比前一天上涨超过0.2,表示趋势增强;
3. RSI小于85,避免超买;

或者:

1. 20日SMA上涨;  
2. ADX上涨但幅度小于0.2,表示趋势温和;
3. RSI小于50,有反弹空间。

退出条件:
1. RSI大于75,表示超买;
2. ADX小幅上涨,趋势温和; 

或者:

1. RSI大于75,表示超买;
2. ADX大幅上涨,趋势强劲;

或者:

20日SMA转为下跌。

该策略通过RSI判断超买超卖,结合ADX判断趋势,实现在趋势向上不超买情况下买入,在超买或趋势转弱时退出,整体实现追踪中长线向上趋势的效果。

## 策略优势

该策略主要有以下优势:

1. 结合RSI和ADX两个指标,可以更准确判断趋势和超买超卖情况,入场出场更为精确。

2. 通过ADX判断趋势强弱,可以减少因震荡市弱势出场。

3. RSI设置较宽松的参数,追踪中长线趋势,减少频繁交易。

4. 策略操作简单,容易实施,适合长线持仓。

5. 可配置参数灵活,可调整的空间大。

## 策略风险

该策略也存在一定风险:

1. ADX指标存在滞后,可能错过趋势转换点导致损失扩大。

2. 股价出现断崖式下跌时,止损可能较迟触发,扩大损失。

3. 入场时RSI参数设置过宽松,可能导致超买持仓时间过长。 

4. ADX参数设置过敏感,可能造成趋势较弱时错误出场。

5. 大盘异常时,个股也可能出现反向运作。

对应风险管理:

1. 适当缩短ADX参数,使其更灵敏。

2. 设置更严格的止损线,避免扩大损失。

3. 适当收紧RSI参数,防止超买持仓时间过长。

4. ADX参数不要设置过敏感,防止错误出场。

5. 在大盘发生转折时,适当暂停策略,手动干预。

## 策略优化

该策略可以从以下几个方面进行优化:

1. 优化RSI参数设置,测试不同周期参数对策略效果的影响。

2. 优化ADX参数组合,测试DI和ADX周期参数对策略捕捉趋势能力的影响。

3. 测试加入MACD等其他指标作为辅助判断。

4. 测试不同均线组合优化入场时机。

5. 测试加入止盈止损策略,提高策略收益风险比。

6. 对大盘指数状态进行判断,在大盘转折时手动暂停策略。

## 总结

RSI追踪ADX策略整体是一个较为简单实用的长线趋势跟踪策略。它同时结合RSI和ADX两个指标的优势,在趋势判断和超买超卖判断上较为准确。策略操作简单,容易实施,也具有一定的参数优化空间。但也需要注意ADX滞后问题和止损设置问题。总体来说,该策略非常适合追踪中长线趋势,可以为投资者带来稳定收益。

|| 


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

[/trans]

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
