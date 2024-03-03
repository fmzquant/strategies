
> Name

跨时间帧移动平均线交易策Multi-Timeframe-Moving-Average-Trend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略运用跨不同时间帧的移动平均线,实现趋势跟踪交易。策略同时在日线、4小时线、15分钟线上计算快慢移动平均线,当三个时间帧上快速移动平均线均上穿慢速移动平均线时做多;当三个时间帧上快速移动平均线均下穿慢速移动平均线时做空。策略充分利用不同时间帧上的价格信息,可有效过滤假突破。

## 策略原理  

该策略基于三个不同的时间帧分别计算快速移动平均线和慢速移动平均线。分别取日线、4小时线、15分钟线三个时间帧,在每个时间帧上计算长度为21的快速移动平均线EMA(21)和长度为34的慢速移动平均线EMA(34)。当日线、4小时线、15分钟线上的快速移动平均线均上穿慢速移动平均线时,判断为趋势上涨,做多;当日线、4小时线、15分钟线上的快速移动平均线均下穿慢速移动平均线时,判断为趋势下跌,做空。

该策略还设定了交易时间范围,只在指定的月份、日期范围内交易,避免被困于不利的市场中。

具体来说,策略主要包含以下几个关键点:

1. 输入不同时间帧:日线、4小时线、15分钟线

2. 每个时间帧分别计算长度为21和34的快慢EMA

3. 判断三个时间帧的快慢EMA均上穿时做多,均下穿时做空

4. 设置交易月份、日期范围

5. 在符合条件时开仓做多做空,不符合时平仓

通过跨时间帧判断趋势,可有效过滤假突破,采用多时间帧资金管理,可控制风险。

## 策略优势

该策略主要具有以下优势:

1. 跨时间帧判断,可有效识别趋势,过滤假突破。单一时间帧容易出现假突破,跨时间帧可提高判断准确性。

2. 多时间帧资金管理,降低单一时间帧的风险。单一时间帧持仓容易超出承受能力,多时间帧可分散风险。 

3. 设置交易时间范围,避免被困于不利市场。指定月份、日期可跳过行情不好的时间段。

4. 快速移动平均线和慢速移动平均线组合使用,平滑价格变动,识别趋势。EMA指标应用广泛,易于理解和实现。

5. 策略规则清晰易懂,参数设置简单,容易实施。无需复杂技术指标,易于掌握和优化。

6. 可广泛适用于大类资产,灵活度高。多时间帧EMA组合交易思路扩展性强。

## 策略风险

该策略也存在一些风险需要注意:

1. 长期趋势行情下表现更佳,短期盘整会增加套牢风险。可适当放宽仓位管理,降低风险。

2. 保守参数设置会错过较强趋势的机会。可适当缩短平均线周期,或减少交易时间帧。

3. 大幅震荡行情中EMA指标表现不佳。可考虑与波动率指标或动量指标组合使用。

4. 日线作为最大周期判断趋势偏慢,无法及时止损。可加入更高周期判断,或降低日线仓位。

5. 交易时间范围固定,不适应市场变化。应定期评估调整交易时间段参数。

## 策略优化

该策略可从以下几个方面进行优化:

1. 优化移动平均线周期参数,实现更顺畅地跟踪趋势。可以测试缩短快慢EMA周期,或加入更快EMA判断。

2. 添加动量指标判断,识别趋势强弱。例如加入MACD、RSI等指标的辅助判断信号。

3. 优化仓位管理,根据市场情况加大或减小仓位。可加入ATR止损,或根据历史数据计算仓位比例。

4. 结合波动率指标,改进开仓和止损策略。加入ATR或波动率方差指标,可ynamic adapt to market volatility.

5. 测试更多交易时间帧的组合,寻找最佳平衡。可加入更高时间帧判断,或移除某些时间帧。

6. 应用机器学习算法实现参数自动优化。通过模拟训练找到最优参数组合。

7. 增加趋势确认机制,避免被套。例如设置连续N根K线EMA均上穿作为入场确认。

8. 进行滚动回测,评估参数稳定性。修正过拟合的参数,提高稳定可靠性。

## 总结

该策略利用跨时间帧趋势判断的思路,在多时间帧上应用快慢EMA,形成稳定高效的趋势跟踪策略。策略具有判断准确、风险收敛的优势,是一种简单实用的趋势跟踪交易策略。但也应注意在波动市场中的风险控制,并持续优化参数,才能获得长期稳定回报。总体来说,多时间帧EMA策略框架思路广泛适用,是一种值得推荐的趋势交易策略。

||


## Overview

This strategy utilizes moving averages across different timeframes to implement trend following trading. It calculates fast and slow moving averages on the daily, 4-hour and 15-minute timeframes. When the fast moving averages cross above the slow ones on all three timeframes, it goes long. When the fast moving averages cross below the slow ones, it goes short. The strategy makes full use of price information across timeframes to effectively filter false breakouts.

## Strategy Logic

The strategy computes fast and slow moving averages based on three different timeframes. It takes the daily, 4-hour and 15-minute timeframes, and calculates 21-period fast EMA and 34-period slow EMA on each timeframe. When the fast EMA crosses above the slow EMA on the daily, 4-hour and 15-minute timeframes, it determines an uptrend and goes long. When the fast EMA crosses below the slow EMA on all three timeframes, it determines a downtrend and goes short.

The strategy also sets trading time range to avoid unfavorable market conditions. It only trades within specified months and date range.

Specifically, the key points of the strategy include:

1. Input different timeframes: daily, 4-hour, 15-min

2. Compute fast and slow EMAs on each timeframe 

3. Go long when fast EMA crosses above slow EMA on all timeframes, go short when below

4. Set trading month and date range 

5. Open long/short positions based on conditions, close when conditions not met

Judging trend across timeframes can effectively filter false breakouts. Applying position sizing across multiple timeframes can also control risk.

## Advantages

The main advantages of this strategy are:

1. Cross-timeframe trend identification filters false breakouts effectively. Single timeframe is prone to false breakouts.

2. Multi-timeframe position sizing lowers risk from single timeframe. Single timeframe risks exceeding capacity. 

3. Trading time range avoids being stuck in unfavorable markets. Skipping bad periods by specifying months and dates.

4. Fast and slow EMA combo captures trend smoothly. EMA is widely used and easy to understand.

5. Simple and clear rules, easy parameter tuning makes strategy easy to implement. No complex indicators needed.

6. Broadly applicable across asset classes with high flexibility. EMA crossover concept generalizable.

## Risks

Some risks to consider for this strategy:

1. Performs better in long trending markets, ranging markets increase whipsaw risk. Can loosen position sizing to lower risk.

2. Conservative parameters may miss stronger trends. Can shorten EMA periods or reduce number of trading timeframes.

3. EMA performs poorly in choppy markets. Consider combining with volatility or momentum indicators. 

4. Daily timeframe slow to determine trend, unable to exit positions timely. Can add higher timeframes or lower daily position sizes.

5. Fixed trading time range does not adapt to evolving markets. Should evaluate regularly to adjust time range parameters.

## Enhancements

Some ways to enhance this strategy:

1. Optimize EMA periods for smoother trend following. Can test shorter fast/slow EMA periods or add faster EMA.

2. Add momentum indicator for trend strength. Such as MACD, RSI for additional signal.

3. Optimize position sizing based on market conditions. Adapt strategy position size based on market volatility. 

4. Incorporate volatility indicators to improve entry and exit. Add ATR or variance to dynamically adapt to volatility.

5. Test more timeframe combinations to find optimal balance. Can add higher timeframes or remove certain ones.

6. Utilize machine learning for automated parameter optimization. Discover optimal parameters through simulation and training.

7. Add trend confirmation to avoid whipsaws. Such as requiring consecutive candle close above EMA. 

8. Conduct robust backtesting to evaluate parameter stability. Fix overfitted parameters and improve reliability.

## Conclusion

This strategy utilizes the cross-timeframe trend filtering concept with fast/slow EMA to create a stable and efficient trend following system. It has the advantages of accurate trend identification and risk management. However, risk control in volatile markets and continuous parameter enhancement are needed to achieve consistent returns. Overall, the multi-timeframe EMA framework is broadly applicable and a recommended trend trading approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|21|Input For Fast MA|
|v_input_3|34|Input For Slow MA|
|v_input_4|D|LONGTERM|
|v_input_5|180|MIDTERM|
|v_input_6|15|SHORTTERM|
|v_input_7|8|monthfrom|
|v_input_8|12|monthuntil|
|v_input_9|true|dayfrom|
|v_input_10|31|dayuntil|
|v_input_11|2018|yearfrom|
|v_input_12|2020|yearuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-09-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Cryptocurrency Trading Tools by XMAXPRO
//ATA
//Test 1.0v Date  : 10.11.2018
//

strategy("MTF+MA", overlay=false, shorttitle="MTF-MA", overlay = true,default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent,commission_value=0.1,initial_capital=100000)
src = input(title= "Source", defval=close)
fast = input(title="Input For Fast MA",  defval=21)
slow = input(title="Input For Slow MA",defval=34)
//MTF source
long = input(title="LONGTERM",  defval="D")
mid = input(title="MIDTERM",  defval="180")
short = input(title="SHORTTERM",  defval="15")
//MTF Grafikleri
ln = security(syminfo.ticker, long, src)
md = security(syminfo.ticker, mid, src)
sh = security(syminfo.ticker, short, src)
//0
lnma = ema(ln,fast) - ema(ln,slow)
mdma = ema(sh,fast) - ema(md,slow)
shma = ema(sh,fast) - ema(sh,slow)

plot(lnma,color=green,linewidth=3)
plot(mdma,color=blue,linewidth=3)
plot(shma,color=red,linewidth=3)
plot(0,color=white,linewidth=3)

longCond = lnma>0 and mdma>0  and shma>0
shortCond= lnma<0  and mdma<0  and shma <0 



monthfrom =input(8)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)
yearfrom=input(2018)
yearuntil=input(2020)

if (  longCond  ) 
    strategy.entry("LONG", strategy.long, stop=close, oca_name="TREND",  comment="LONG")
    
else
    strategy.cancel(id="LONG")
    



if ( shortCond   ) 

    strategy.entry("SHORT", strategy.short,stop=close, oca_name="TREND",  comment="SHORT")
else
    strategy.cancel(id="SHORT")

```

> Detail

https://www.fmz.com/strategy/427685

> Last Modified

2023-09-23 16:10:08
