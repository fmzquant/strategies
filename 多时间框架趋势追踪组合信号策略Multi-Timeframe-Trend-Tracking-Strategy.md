
> Name

多时间框架趋势追踪组合信号策略Multi-Timeframe-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16b784a24e2c97c28cb.png)
 [trans]

## 概述

这个策略利用多重时间框架的技术指标组合信号,识别趋势方向,实现趋势追踪。它结合了RSI、Stoch、Stoch RSI和CCI等多种指标,在1分钟、5分钟、15分钟、1小时、4小时和1天的时间框架内寻找指标符合条件的组合信号,从而判断目前overall的趋势方向。

## 策略原理

这个策略的核心逻辑在于判断不同时间框架内技术指标的组合情况。对于每个时间框架,策略都判断RSI、Stoch、Stoch RSI和CCI等指标是否在设定的范围内并且是否处于上升趋势。如果一个时间框架内所有的指标都满足条件,则为该时间框架提供一个“通过”信号。

在1分钟、5分钟、15分钟、1小时、4小时和1天内,任何通过的时间框架都会提供一个追踪overall趋势的正面信号。当1分钟、5分钟、15分钟、1小时、4小时和1天所有的时间框架都“通过”审查时,才会触发真正的买入信号。

也就是说,一个时间段内,如果所有时间框架的趋势判断都是正确的,那么整体趋势判断就十分可靠,这时才会开仓做多。通过判断多个时间框架内指标的组合趋势信号,可以更准确地判断overall趋势,过滤错误信号,降低交易频率。

## 策略优势分析

1. 利用多重时间框架指标组合信号,可以显著减少错误信号,降低交易频率。

2. 通过观察多个短期和长期时间框架的趋势一致性,可以更准确判断overall趋势方向。

3. 合理的参数设置可以在一定程度上控制回撤。止损和止盈设置可以锁定部分利润,降低风险。 

4. 允许自定义指标参数组合,可以针对不同市场调整参数,提高适应性。

## 策略风险分析

1. 由于追踪overall趋势,当趋势反转时难以及时止损,存在较大回撤风险。

2. 参数设置不当可能错过趋势机会或增加交易频率。需要经过大量回测优化参数。

3. 多重时间框架判断可能错过短期趋势机会。可以适当优化,允许个别时间框架不符合也可以产生信号。

## 策略优化方向

1. 优化每个时间框架内技术指标的参数设置,找到最佳参数组合。

2. 测试仅根据部分时间框架判断就产生信号的效果。譬如1分钟和15分钟同向就可以判断为买入机会。

3. 添加新的技术指标,丰富多时间框架判断的指标种类。可以考虑MACD,KD,布林带等指标。

4. 测试不同的止损止盈水平,找到最优参数。止损范围太小可能增加止损风险,太大则可能错失利润机会。

## 总结

这个策略主要创新之处在于利用多重时间框架内技术指标信号的组合,判断overall趋势方向。确保短期和长期趋势判断一致,然后再选择建仓时机。这可以明显减少错误信号,锁定趋势交易机会。通过参数优化,可以获得非常出色的回撤指标。总体来说,这是一个相对稳定、适合长线持仓的低风险趋势追踪策略。

||

## Overview

This strategy utilizes a combination of technical indicators across multiple timeframes to identify the trend direction for trend tracking. It combines RSI, Stoch, Stoch RSI, CCI and other indicators across the 1-min, 5-min, 15-min, 1-hour, 4-hour, and 1-day timeframes to look for combined signals meeting the criteria, thereby judging the overall current trend direction.  

## Strategy Logic

The core logic of this strategy lies in judging the combination of indicators across different timeframes. For each timeframe, the strategy checks whether indicators like RSI, Stoch, Stoch RSI, CCI etc. are within a set range and in an uptrend. If all the indicators in a timeframe meet the criteria, then that timeframe provides a “pass” signal.

Within the 1-min, 5-min, 15-min, 1-hour, 4-hour, and 1-day periods, any timeframe that passes provides a positive signal for tracking the overall trend. Only when all timeframes including the 1-min, 5-min, 15-min, 1-hour, 4-hour, and 1-day pass the “examination” will an actual buy signal be triggered. 

In other words, if the trend judgments across all timeframes in a period are correct, then the overall trend judgment becomes very reliable, and that’s when a position will be opened for long. By judging the combined trend signals from indicators across multiple timeframes, the overall trend can be determined more precisely, filtering out false signals and reducing trading frequency.

## Advantage Analysis  

1. Using combined signals from indicators across multiple timeframes can significantly reduce false signals and lower trading frequency.

2. By observing trend consistency across multiple short-term and long-term timeframes, the overall trend direction can be determined more precisely.  

3. Reasonable parameter settings can control drawdowns to some extent. Stop loss and take profit settings may lock in partial profits, lowering risks.

4. Allowing customizable combinations of indicator parameters enables tuning for different markets to improve adaptability.

## Risk Analysis

1. Since this strategy tracks the overall trend, when trends reverse it may fail to exit positions in time, posing sizable drawdown risks.

2. Inadequate parameter settings may miss trend opportunities or increase trading frequency. Extensive backtests are needed to optimize parameters.

3. Judgments across multiple timeframes may miss short-term trend opportunities. Optimization can be helpful, by allowing signals even if criteria aren’t fully met on some timeframes.

## Optimization Directions  

1. Optimize parameters for technical indicators on each timeframe to find the optimum combination.

2. Test the effect of allowing signals based on judgments from only some timeframes. For instance, alignment of 1-min and 15-min may be sufficient for a buy.

3. Incorporate new technical indicators to enrich the types of indicators used for multi-timeframe judgments. MACD, KD, Bollinger Bands etc. can be considered. 

4. Test stop loss and take profit levels to find optimum parameters. If stop loss range is too small, stop loss risks may increase; if too wide, profit opportunities may be missed.

## Conclusion

The main innovation of this strategy lies in utilizing the combined signals from technical indicators across multiple timeframes to determine the overall trend direction. Ensuring short-term and long-term trend alignments before choosing entry timing can significantly reduce false signals and capture trend trading opportunities. Through parameter optimization, superb drawdown metrics can be obtained. Overall, this is a relatively stable, low-risk trend tracking strategy suitable for long-term holdings.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|  INTELLITRADER BACKTESTER  |
|v_input_2|false|▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔|
|v_input_3|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  PC ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_4|false|Use Percent Change (On / Off)|
|v_input_5|-200|Perc.Change - 1m - Min|
|v_input_6|200|Perc.Change - 1m - Max|
|v_input_7|-200|Perc.Change - 5m - Min|
|v_input_8|200|Perc.Change - 5m - Max|
|v_input_9|-200|Perc.Change - 15m - Min|
|v_input_10|200|Perc.Change - 15m - Max|
|v_input_11|-200|Perc.Change - 1h - Min|
|v_input_12|200|Perc.Change - 1h - Max|
|v_input_13|-200|Perc.Change - 4h - Min|
|v_input_14|200|Perc.Change - 4h - Max|
|v_input_15|-200|Perc.Change - 1d - Min|
|v_input_16|200|Perc.Change - 1d - Max|
|v_input_17|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  1m ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_18|20|RSI 7 - Min|
|v_input_19|80|RSI 7 - Max|
|v_input_20|false|RSI 7 ? (On / Off)|
|v_input_21|false|RSI 7 Raising? (On / Off)|
|v_input_22|20|RSI 14 - Min|
|v_input_23|80|RSI 14 - Max|
|v_input_24|false|RSI 14 ? (On / Off)|
|v_input_25|false|RSI 14 Raising? (On / Off)|
|v_input_26|20|STOCH 14 3 3 - Min|
|v_input_27|80|STOCH 14 3 3 - Max|
|v_input_28|false|STOCH 14 3 3 ? (On / Off)|
|v_input_29|false|STOCH 14 3 3 Raising? (On / Off)|
|v_input_30|20|STOCHRSI 14 14 3 3 - Min|
|v_input_31|80|STOCHRSI 14 14 3 3 - Max|
|v_input_32|false|STOCHRSI 14 14 3 3 ? (On / Off)|
|v_input_33|false|STOCHRSI 14 14 3 3 Raising? (On / Off)|
|v_input_34|20|CCI 20 - Min|
|v_input_35|80|CCI 20 - Max|
|v_input_36|false|CCI 20 ? (On / Off)|
|v_input_37|false|CCII 20 Raising? (On / Off)|
|v_input_38|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  5m ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_39|20|RSI 7 - Min|
|v_input_40|80|RSI 7 - Max|
|v_input_41|false|RSI 7 ? (On / Off)|
|v_input_42|false|RSI 7 Raising? (On / Off)|
|v_input_43|20|RSI 14 - Min|
|v_input_44|80|RSI 14 - Max|
|v_input_45|false|RSI 14 ? (On / Off)|
|v_input_46|false|RSI 14 Raising? (On / Off)|
|v_input_47|20|STOCH 14 3 3 - Min|
|v_input_48|80|STOCH 14 3 3 - Max|
|v_input_49|false|STOCH 14 3 3 ? (On / Off)|
|v_input_50|false|STOCH 14 3 3 Raising? (On / Off)|
|v_input_51|20|STOCHRSI 14 14 3 3 - Min|
|v_input_52|80|STOCHRSI 14 14 3 3 - Max|
|v_input_53|false|STOCHRSI 14 14 3 3 ? (On / Off)|
|v_input_54|false|STOCHRSI 14 14 3 3 Raising? (On / Off)|
|v_input_55|20|CCI 20 - Min|
|v_input_56|80|CCI 20 - Max|
|v_input_57|false|CCI 20 ? (On / Off)|
|v_input_58|false|CCII 20 Raising? (On / Off)|
|v_input_59|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  15m ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_60|20|RSI 7 - Min|
|v_input_61|80|RSI 7 - Max|
|v_input_62|false|RSI 7 ? (On / Off)|
|v_input_63|false|RSI 7 Raising? (On / Off)|
|v_input_64|20|RSI 14 - Min|
|v_input_65|80|RSI 14 - Max|
|v_input_66|false|RSI 14 ? (On / Off)|
|v_input_67|false|RSI 14 Raising? (On / Off)|
|v_input_68|20|STOCH 14 3 3 - Min|
|v_input_69|80|STOCH 14 3 3 - Max|
|v_input_70|false|STOCH 14 3 3 ? (On / Off)|
|v_input_71|false|STOCH 14 3 3 Raising? (On / Off)|
|v_input_72|20|STOCHRSI 14 14 3 3 - Min|
|v_input_73|80|STOCHRSI 14 14 3 3 - Max|
|v_input_74|false|STOCHRSI 14 14 3 3 ? (On / Off)|
|v_input_75|false|STOCHRSI 14 14 3 3 Raising? (On / Off)|
|v_input_76|20|CCI 20 - Min|
|v_input_77|80|CCI 20 - Max|
|v_input_78|false|CCI 20 ? (On / Off)|
|v_input_79|false|CCII 20 Raising? (On / Off)|
|v_input_80|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  1h ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_81|20|RSI 7 - Min|
|v_input_82|80|RSI 7 - Max|
|v_input_83|false|RSI 7 ? (On / Off)|
|v_input_84|false|RSI 7 Raising? (On / Off)|
|v_input_85|20|RSI 14 - Min|
|v_input_86|80|RSI 14 - Max|
|v_input_87|false|RSI 14 ? (On / Off)|
|v_input_88|false|RSI 14 Raising? (On / Off)|
|v_input_89|20|STOCH 14 3 3 - Min|
|v_input_90|80|STOCH 14 3 3 - Max|
|v_input_91|false|STOCH 14 3 3 ? (On / Off)|
|v_input_92|false|STOCH 14 3 3 Raising? (On / Off)|
|v_input_93|20|STOCHRSI 14 14 3 3 - Min|
|v_input_94|80|STOCHRSI 14 14 3 3 - Max|
|v_input_95|false|STOCHRSI 14 14 3 3 ? (On / Off)|
|v_input_96|false|STOCHRSI 14 14 3 3 Raising? (On / Off)|
|v_input_97|20|CCI 20 - Min|
|v_input_98|80|CCI 20 - Max|
|v_input_99|false|CCI 20 ? (On / Off)|
|v_input_100|false|CCII 20 Raising? (On / Off)|
|v_input_101|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  4h ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_102|20|RSI 7 - Min|
|v_input_103|80|RSI 7 - Max|
|v_input_104|false|RSI 7 ? (On / Off)|
|v_input_105|false|RSI 7 Raising? (On / Off)|
|v_input_106|20|RSI 14 - Min|
|v_input_107|80|RSI 14 - Max|
|v_input_108|false|RSI 14 ? (On / Off)|
|v_input_109|false|RSI 14 Raising? (On / Off)|
|v_input_110|20|STOCH 14 3 3 - Min|
|v_input_111|80|STOCH 14 3 3 - Max|
|v_input_112|false|STOCH 14 3 3 ? (On / Off)|
|v_input_113|false|STOCH 14 3 3 Raising? (On / Off)|
|v_input_114|20|STOCHRSI 14 14 3 3 - Min|
|v_input_115|80|STOCHRSI 14 14 3 3 - Max|
|v_input_116|false|STOCHRSI 14 14 3 3 ? (On / Off)|
|v_input_117|false|STOCHRSI 14 14 3 3 Raising? (On / Off)|
|v_input_118|20|CCI 20 - Min|
|v_input_119|80|CCI 20 - Max|
|v_input_120|false|CCI 20 ? (On / Off)|
|v_input_121|false|CCII 20 Raising? (On / Off)|
|v_input_122|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  1d ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_123|20|RSI 7 - Min|
|v_input_124|80|RSI 7 - Max|
|v_input_125|false|RSI 7 ? (On / Off)|
|v_input_126|false|RSI 7 Raising? (On / Off)|
|v_input_127|20|RSI 14 - Min|
|v_input_128|80|RSI 14 - Max|
|v_input_129|false|RSI 14 ? (On / Off)|
|v_input_130|false|RSI 14 Raising? (On / Off)|
|v_input_131|20|STOCH 14 3 3 - Min|
|v_input_132|80|STOCH 14 3 3 - Max|
|v_input_133|false|STOCH 14 3 3 ? (On / Off)|
|v_input_134|false|STOCH 14 3 3 Raising? (On / Off)|
|v_input_135|20|STOCHRSI 14 14 3 3 - Min|
|v_input_136|80|STOCHRSI 14 14 3 3 - Max|
|v_input_137|false|STOCHRSI 14 14 3 3 ? (On / Off)|
|v_input_138|false|STOCHRSI 14 14 3 3 Raising? (On / Off)|
|v_input_139|20|CCI 20 - Min|
|v_input_140|80|CCI 20 - Max|
|v_input_141|false|CCI 20 ? (On / Off)|
|v_input_142|false|CCII 20 Raising? (On / Off)|
|v_input_143|2018|Backtest Start Year|
|v_input_144|9|Backtest Start Month|
|v_input_145|15|Backtest Start Day|
|v_input_146|9999|Backtest Stop Year|
|v_input_147|12|Backtest Stop Month|
|v_input_148|31|Backtest Stop Day|
|v_input_149|false|Trailing Stop|
|v_input_150|3|Trailing Stop (%)|
|v_input_151|true|Take Profit|
|v_input_152|true|Take Profit (%)|
|v_input_153|false|Trailing Profit (%)|
|v_input_154|true|Stop Loss|
|v_input_155|3|Stop Loss (%)|
|v_input_156|false|Turn ON Tradingview Alerts ? |
|v_input_157|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻ S/R Lines  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_158|false|Show S/R Lines|
|v_input_159|6|VolumeMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-11 00:00:00
end: 2024-01-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Intellitrader - Buy - BACKTESTER", overlay = true)
//study("APEX - Tester - Buy/Sell Strategies - Basic ", overlay = true)
source_main             = close
/////////////////////////////////////////////////
// BUY STRATEGIES - SELECTION 
/////////////////////////////////////////////////
puppy_sep           = input(false, title="  INTELLITRADER BACKTESTER  ")
buy1_sep            = input(false, title="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔" )

/// ******************* Percentage Change ***************************
pc_pc             = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  PC ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
pc_Use            = input(false, title="Use Percent Change (On / Off)")
pc_min_1m         = input(-200, title="Perc.Change - 1m - Min")
pc_max_1m         = input(200,  title="Perc.Change - 1m - Max")
pc_min_5m         = input(-200, title="Perc.Change - 5m - Min")
pc_max_5m         = input(200,  title="Perc.Change - 5m - Max")
pc_min_15m        = input(-200, title="Perc.Change - 15m - Min")
pc_max_15m        = input(200,  title="Perc.Change - 15m - Max")
pc_min_1h         = input(-200, title="Perc.Change - 1h - Min")
pc_max_1h         = input(200,  title="Perc.Change - 1h - Max")
pc_min_4h         = input(-200, title="Perc.Change - 4h - Min")
pc_max_4h         = input(200,  title="Perc.Change - 4h - Max")
pc_min_1d         = input(-200, title="Perc.Change - 1d - Min")
pc_max_1d         = input(200,  title="Perc.Change - 1d - Max")

pc_1m  = request.security(syminfo.tickerid, "1", close-close[1]/close[1]*100 )
pc_5m  = request.security(syminfo.tickerid, "5", close-close[1]/close[1]*100 )
pc_15m = request.security(syminfo.tickerid, "15", close-close[1]/close[1]*100 )
pc_1h  = request.security(syminfo.tickerid, "60", close-close[1]/close[1]*100 )
pc_4h  = request.security(syminfo.tickerid, "240", close-close[1]/close[1]*100 )
pc_1d  = request.security(syminfo.tickerid, "1440", close-close[1]/close[1]*100 )

pc_1m_switch  = pc_min_1m <= pc_1m and pc_max_1m  >= pc_1m
pc_5m_switch  = pc_min_5m <= pc_5m and pc_max_5m  >= pc_5m
pc_15m_switch = pc_min_15m <= pc_15m and pc_max_15m >= pc_15m
pc_1h_switch  = pc_min_1h <= pc_1h and pc_max_1h  >= pc_1h
pc_4h_switch  = pc_min_4h <= pc_4h and pc_max_4h  >= pc_4h
pc_1d_switch  = pc_min_1d <= pc_1d and pc_max_1d  >= pc_1d

pc_logic = true
if pc_Use
    pc_logic := false
    if pc_1m_switch and pc_5m_switch and pc_15m_switch and pc_1h_switch and pc_4h_switch and pc_1d_switch
        pc_logic := true

/// ******************* 1m ***************************
ma_sep_1m           = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  1m ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
rsi7_min_1m         = input(20, title="RSI 7 - Min")
rsi7_max_1m         = input(80, title="RSI 7 - Max")
rsi7_Use_1m         = input(false, title="RSI 7 ? (On / Off)")
rsi7_Raising_1m     = input(false, title="RSI 7 Raising? (On / Off)")

rsi14_min_1m        = input(20, title="RSI 14 - Min")
rsi14_max_1m        = input(80, title="RSI 14 - Max")
rsi14_Use_1m        = input(false, title="RSI 14 ? (On / Off)")
rsi14_Raising_1m    = input(false, title="RSI 14 Raising? (On / Off)") 

stoch_min_1m        = input(20, title="STOCH 14 3 3 - Min")
stoch_max_1m        = input(80, title="STOCH 14 3 3 - Max")
stoch_Use_1m        = input(false, title="STOCH 14 3 3 ? (On / Off)")
stoch_Raising_1m    = input(false, title="STOCH 14 3 3 Raising? (On / Off)")

stochrsi_min_1m     = input(20, title="STOCHRSI 14 14 3 3 - Min")
stochrsi_max_1m     = input(80, title="STOCHRSI 14 14 3 3 - Max")
stochrsi_Use_1m     = input(false, title="STOCHRSI 14 14 3 3 ? (On / Off)")
stochrsi_Raising_1m = input(false, title="STOCHRSI 14 14 3 3 Raising? (On / Off)") 

cci_min_1m          = input(20, title="CCI 20 - Min")
cci_max_1m          = input(80, title="CCI 20 - Max")
cci_Use_1m          = input(false, title="CCI 20 ? (On / Off)")
cci_Raising_1m      = input(false, title="CCII 20 Raising? (On / Off)")

rsi14_1m            = request.security(syminfo.tickerid, "1", rsi(close,14) )
rsi7_1m             = request.security(syminfo.tickerid, "1", rsi(close,7) )
stoch_1m            = request.security(syminfo.tickerid, "1", sma(sma(stoch(close, high, low, 14), 3), 3))
stochrsi_1m         = request.security(syminfo.tickerid, "1", sma(sma(stoch(rsi(close,14), rsi(close,14), rsi(close,14), 14), 3), 3))
cci_1m              = request.security(syminfo.tickerid, "1", cci(close,20) )

rsi7_1m_logic        = true
rsi7_1m_raisinglogic = true
if rsi7_Use_1m
    rsi7_1m_logic = false
    rsi7_1m_raisinglogic = rsi7_Raising_1m?rising(rsi7_1m,1):true
    if rsi7_1m>rsi7_min_1m and rsi7_1m<rsi7_max_1m and rsi7_1m_raisinglogic
        rsi7_1m_logic = true

rsi14_1m_logic        = true
rsi14_1m_raisinglogic = true
if rsi14_Use_1m
    rsi14_1m_logic = false
    rsi14_1m_raisinglogic = rsi14_Raising_1m?rising(rsi14_1m,1):true
    if rsi14_1m>rsi14_min_1m and rsi14_1m<rsi14_max_1m and rsi14_1m_raisinglogic
        rsi14_1m_logic = true

stoch_1m_logic        = true
stoch_1m_raisinglogic = true
if stoch_Use_1m
    stoch_1m_logic = false
    stoch_1m_raisinglogic = stoch_Raising_1m?rising(stoch_1m,1):true
    if stoch_1m>stoch_min_1m and stoch_1m<stoch_max_1m and stoch_1m_raisinglogic
        stoch_1m_logic = true

stochrsi_1m_logic        = true
stochrsi_1m_raisinglogic = true
if stochrsi_Use_1m
    stochrsi_1m_logic = false
    stochrsi_1m_raisinglogic = stochrsi_Raising_1m?rising(stochrsi_1m,1):true
    if stochrsi_1m>stochrsi_min_1m and stochrsi_1m<stochrsi_max_1m and stochrsi_1m_raisinglogic
        stochrsi_1m_logic = true

cci_1m_logic        = true
cci_1m_raisinglogic = true
if cci_Use_1m
    cci_1m_logic = false
    cci_1m_raisinglogic = cci_Raising_1m?rising(cci_1m,1):true
    if cci_1m>cci_min_1m and cci_1m<cci_max_1m and cci_1m_raisinglogic
        cci_1m_logic = true

bool_1m = false
bool_1m := rsi7_1m_logic and rsi7_1m_raisinglogic and
 rsi14_1m_logic and rsi14_1m_raisinglogic and
 stoch_1m_logic and stoch_1m_raisinglogic and
 stochrsi_1m_logic and stochrsi_1m_raisinglogic and
 cci_1m_logic and cci_1m_raisinglogic

if not rsi7_Use_1m and not rsi14_Use_1m and not stoch_Use_1m and not stochrsi_Use_1m and not cci_Use_1m
    bool_1m = false

/// ******************* 5m ***************************
ma_sep_5m           = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  5m ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
rsi7_min_5m         = input(20, title="RSI 7 - Min")
rsi7_max_5m         = input(80, title="RSI 7 - Max")
rsi7_Use_5m         = input(false, title="RSI 7 ? (On / Off)")
rsi7_Raising_5m     = input(false, title="RSI 7 Raising? (On / Off)")

rsi14_min_5m        = input(20, title="RSI 14 - Min")
rsi14_max_5m        = input(80, title="RSI 14 - Max")
rsi14_Use_5m        = input(false, title="RSI 14 ? (On / Off)")
rsi14_Raising_5m    = input(false, title="RSI 14 Raising? (On / Off)") 

stoch_min_5m        = input(20, title="STOCH 14 3 3 - Min")
stoch_max_5m        = input(80, title="STOCH 14 3 3 - Max")
stoch_Use_5m        = input(false, title="STOCH 14 3 3 ? (On / Off)")
stoch_Raising_5m    = input(false, title="STOCH 14 3 3 Raising? (On / Off)")

stochrsi_min_5m     = input(20, title="STOCHRSI 14 14 3 3 - Min")
stochrsi_max_5m     = input(80, title="STOCHRSI 14 14 3 3 - Max")
stochrsi_Use_5m     = input(false, title="STOCHRSI 14 14 3 3 ? (On / Off)")
stochrsi_Raising_5m = input(false, title="STOCHRSI 14 14 3 3 Raising? (On / Off)") 

cci_min_5m          = input(20, title="CCI 20 - Min")
cci_max_5m          = input(80, title="CCI 20 - Max")
cci_Use_5m          = input(false, title="CCI 20 ? (On / Off)")
cci_Raising_5m      = input(false, title="CCII 20 Raising? (On / Off)")

rsi14_5m            = request.security(syminfo.tickerid, "5", rsi(close,14) )
rsi7_5m             = request.security(syminfo.tickerid, "5", rsi(close,7) )
stoch_5m            = request.security(syminfo.tickerid, "5", sma(sma(stoch(close, high, low, 14), 3), 3))
stochrsi_5m         = request.security(syminfo.tickerid, "5", sma(sma(stoch(rsi(close,14), rsi(close,14), rsi(close,14), 14), 3), 3))
cci_5m              = request.security(syminfo.tickerid, "5", cci(close,20) )

rsi7_5m_logic        = true
rsi7_5m_raisinglogic = true
if rsi7_Use_5m
    rsi7_5m_logic = false
    rsi7_5m_raisinglogic = rsi7_Raising_5m?rising(rsi7_5m,1):true
    if rsi7_5m>rsi7_min_5m and rsi7_5m<rsi7_max_5m and rsi7_5m_raisinglogic
        rsi7_5m_logic = true

rsi14_5m_logic        = true
rsi14_5m_raisinglogic = true
if rsi14_Use_5m
    rsi14_5m_logic = false
    rsi14_5m_raisinglogic = rsi14_Raising_5m?rising(rsi14_5m,1):true
    if rsi14_5m>rsi14_min_5m and rsi14_5m<rsi14_max_5m and rsi14_5m_raisinglogic
        rsi14_5m_logic = true

stoch_5m_logic        = true
stoch_5m_raisinglogic = true
if stoch_Use_5m
    stoch_5m_logic = false
    stoch_5m_raisinglogic = stoch_Raising_5m?rising(stoch_5m,1):true
    if stoch_5m>stoch_min_5m and stoch_5m<stoch_max_5m and stoch_5m_raisinglogic
        stoch_5m_logic = true

stochrsi_5m_logic        = true
stochrsi_5m_raisinglogic = true
if stochrsi_Use_5m
    stochrsi_5m_logic = false
    stochrsi_5m_raisinglogic = stochrsi_Raising_5m?rising(stochrsi_5m,1):true
    if stochrsi_5m>stochrsi_min_5m and stochrsi_5m<stochrsi_max_5m and stochrsi_5m_raisinglogic
        stochrsi_5m_logic = true

cci_5m_logic        = true
cci_5m_raisinglogic = true
if cci_Use_5m
    cci_5m_logic = false
    cci_5m_raisinglogic = cci_Raising_5m?rising(cci_5m,1):true
    if cci_5m>cci_min_5m and cci_5m<cci_max_5m and cci_5m_raisinglogic
        cci_5m_logic = true

bool_5m = false
bool_5m := rsi7_5m_logic and rsi7_5m_raisinglogic and
 rsi14_5m_logic and rsi14_5m_raisinglogic and
 stoch_5m_logic and stoch_5m_raisinglogic and
 stochrsi_5m_logic and stochrsi_5m_raisinglogic and
 cci_5m_logic and cci_5m_raisinglogic

if not rsi7_Use_5m and not rsi14_Use_5m and not stoch_Use_5m and not stochrsi_Use_5m and not cci_Use_5m
    bool_5m = false

/// ******************* 15m ***************************
ma_sep_15m           = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  15m ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
rsi7_min_15m         = input(20, title="RSI 7 - Min")
rsi7_max_15m         = input(80, title="RSI 7 - Max")
rsi7_Use_15m         = input(false, title="RSI 7 ? (On / Off)")
rsi7_Raising_15m     = input(false, title="RSI 7 Raising? (On / Off)")

rsi14_min_15m        = input(20, title="RSI 14 - Min")
rsi14_max_15m        = input(80, title="RSI 14 - Max")
rsi14_Use_15m        = input(false, title="RSI 14 ? (On / Off)")
rsi14_Raising_15m    = input(false, title="RSI 14 Raising? (On / Off)") 

stoch_min_15m        = input(20, title="STOCH 14 3 3 - Min")
stoch_max_15m        = input(80, title="STOCH 14 3 3 - Max")
stoch_Use_15m        = input(false, title="STOCH 14 3 3 ? (On / Off)")
stoch_Raising_15m    = input(false, title="STOCH 14 3 3 Raising? (On / Off)")

stochrsi_min_15m     = input(20, title="STOCHRSI 14 14 3 3 - Min")
stochrsi_max_15m     = input(80, title="STOCHRSI 14 14 3 3 - Max")
stochrsi_Use_15m     = input(false, title="STOCHRSI 14 14 3 3 ? (On / Off)")
stochrsi_Raising_15m = input(false, title="STOCHRSI 14 14 3 3 Raising? (On / Off)") 

cci_min_15m          = input(20, title="CCI 20 - Min")
cci_max_15m          = input(80, title="CCI 20 - Max")
cci_Use_15m          = input(false, title="CCI 20 ? (On / Off)")
cci_Raising_15m      = input(false, title="CCII 20 Raising? (On / Off)")

rsi14_15m            = request.security(syminfo.tickerid, "15", rsi(close,14) )
rsi7_15m             = request.security(syminfo.tickerid, "15", rsi(close,7) )
stoch_15m            = request.security(syminfo.tickerid, "15", sma(sma(stoch(close, high, low, 14), 3), 3))
stochrsi_15m         = request.security(syminfo.tickerid, "15", sma(sma(stoch(rsi(close,14), rsi(close,14), rsi(close,14), 14), 3), 3))
cci_15m              = request.security(syminfo.tickerid, "15", cci(close,20) )

rsi7_15m_logic        = true
rsi7_15m_raisinglogic = true
if rsi7_Use_15m
    rsi7_15m_logic = false
    rsi7_15m_raisinglogic = rsi7_Raising_15m?rising(rsi7_15m,1):true
    if rsi7_15m>rsi7_min_15m and rsi7_15m<rsi7_max_15m and rsi7_15m_raisinglogic
        rsi7_15m_logic = true

rsi14_15m_logic        = true
rsi14_15m_raisinglogic = true
if rsi14_Use_15m
    rsi14_15m_logic = false
    rsi14_15m_raisinglogic = rsi14_Raising_15m?rising(rsi14_15m,1):true
    if rsi14_15m>rsi14_min_15m and rsi14_15m<rsi14_max_15m and rsi14_15m_raisinglogic
        rsi14_15m_logic = true

stoch_15m_logic        = true
stoch_15m_raisinglogic = true
if stoch_Use_15m
    stoch_15m_logic = false
    stoch_15m_raisinglogic = stoch_Raising_15m?rising(stoch_15m,1):true
    if stoch_15m>stoch_min_15m and stoch_15m<stoch_max_15m and stoch_15m_raisinglogic
        stoch_15m_logic = true

stochrsi_15m_logic        = true
stochrsi_15m_raisinglogic = true
if stochrsi_Use_15m
    stochrsi_15m_logic = false
    stochrsi_15m_raisinglogic = stochrsi_Raising_15m?rising(stochrsi_15m,1):true
    if stochrsi_15m>stochrsi_min_15m and stochrsi_15m<stochrsi_max_15m and stochrsi_15m_raisinglogic
        stochrsi_15m_logic = true

cci_15m_logic        = true
cci_15m_raisinglogic = true
if cci_Use_15m
    cci_15m_logic = false
    cci_15m_raisinglogic = cci_Raising_15m?rising(cci_15m,1):true
    if cci_15m>cci_min_15m and cci_15m<cci_max_15m and cci_15m_raisinglogic
        cci_15m_logic = true

bool_15m = false
bool_15m := rsi7_15m_logic and rsi7_15m_raisinglogic and
 rsi14_15m_logic and rsi14_15m_raisinglogic and
 stoch_15m_logic and stoch_15m_raisinglogic and
 stochrsi_15m_logic and stochrsi_15m_raisinglogic and
 cci_15m_logic and cci_15m_raisinglogic

if not rsi7_Use_15m and not rsi14_Use_15m and not stoch_Use_15m and not stochrsi_Use_15m and not cci_Use_15m
    bool_15m = false

/// ******************* 1h ***************************
ma_sep_1h           = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  1h ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
rsi7_min_1h         = input(20, title="RSI 7 - Min")
rsi7_max_1h         = input(80, title="RSI 7 - Max")
rsi7_Use_1h         = input(false, title="RSI 7 ? (On / Off)")
rsi7_Raising_1h     = input(false, title="RSI 7 Raising? (On / Off)")

rsi14_min_1h        = input(20, title="RSI 14 - Min")
rsi14_max_1h        = input(80, title="RSI 14 - Max")
rsi14_Use_1h        = input(false, title="RSI 14 ? (On / Off)")
rsi14_Raising_1h    = input(false, title="RSI 14 Raising? (On / Off)") 

stoch_min_1h        = input(20, title="STOCH 14 3 3 - Min")
stoch_max_1h        = input(80, title="STOCH 14 3 3 - Max")
stoch_Use_1h        = input(false, title="STOCH 14 3 3 ? (On / Off)")
stoch_Raising_1h    = input(false, title="STOCH 14 3 3 Raising? (On / Off)")

stochrsi_min_1h     = input(20, title="STOCHRSI 14 14 3 3 - Min")
stochrsi_max_1h     = input(80, title="STOCHRSI 14 14 3 3 - Max")
stochrsi_Use_1h     = input(false, title="STOCHRSI 14 14 3 3 ? (On / Off)")
stochrsi_Raising_1h = input(false, title="STOCHRSI 14 14 3 3 Raising? (On / Off)") 

cci_min_1h          = input(20, title="CCI 20 - Min")
cci_max_1h          = input(80, title="CCI 20 - Max")
cci_Use_1h          = input(false, title="CCI 20 ? (On / Off)")
cci_Raising_1h      = input(false, title="CCII 20 Raising? (On / Off)")

rsi14_1h            = request.security(syminfo.tickerid, "60", rsi(close,14) )
rsi7_1h             = request.security(syminfo.tickerid, "60", rsi(close,7) )
stoch_1h            = request.security(syminfo.tickerid, "60", sma(sma(stoch(close, high, low, 14), 3), 3))
stochrsi_1h         = request.security(syminfo.tickerid, "60", sma(sma(stoch(rsi(close,14), rsi(close,14), rsi(close,14), 14), 3), 3))
cci_1h              = request.security(syminfo.tickerid, "60", cci(close,20) )

rsi7_1h_logic        = true
rsi7_1h_raisinglogic = true
if rsi7_Use_1h
    rsi7_1h_logic = false
    rsi7_1h_raisinglogic = rsi7_Raising_1h?rising(rsi7_1h,1):true
    if rsi7_1h>rsi7_min_1h and rsi7_1h<rsi7_max_1h and rsi7_1h_raisinglogic
        rsi7_1h_logic = true

rsi14_1h_logic        = true
rsi14_1h_raisinglogic = true
if rsi14_Use_1h
    rsi14_1h_logic = false
    rsi14_1h_raisinglogic = rsi14_Raising_1h?rising(rsi14_1h,1):true
    if rsi14_1h>rsi14_min_1h and rsi14_1h<rsi14_max_1h and rsi14_1h_raisinglogic
        rsi14_1h_logic = true

stoch_1h_logic        = true
stoch_1h_raisinglogic = true
if stoch_Use_1h
    stoch_1h_logic = false
    stoch_1h_raisinglogic = stoch_Raising_1h?rising(stoch_1h,1):true
    if stoch_1h>stoch_min_1h and stoch_1h<stoch_max_1h and stoch_1h_raisinglogic
        stoch_1h_logic = true

stochrsi_1h_logic        = true
stochrsi_1h_raisinglogic = true
if stochrsi_Use_1h
    stochrsi_1h_logic = false
    stochrsi_1h_raisinglogic = stochrsi_Raising_1h?rising(stochrsi_1h,1):true
    if stochrsi_1h>stochrsi_min_1h and stochrsi_1h<stochrsi_max_1h and stochrsi_1h_raisinglogic
        stochrsi_1h_logic = true

cci_1h_logic        = true
cci_1h_raisinglogic = true
if cci_Use_1h
    cci_1h_logic = false
    cci_1h_raisinglogic = cci_Raising_1h?rising(cci_1h,1):true
    if cci_1h>cci_min_1h and cci_1h<cci_max_1h and cci_1h_raisinglogic
        cci_1h_logic = true

bool_1h = false
bool_1h := rsi7_1h_logic and rsi7_1h_raisinglogic and
 rsi14_1h_logic and rsi14_1h_raisinglogic and
 stoch_1h_logic and stoch_1h_raisinglogic and
 stochrsi_1h_logic and stochrsi_1h_raisinglogic and
 cci_1h_logic and cci_1h_raisinglogic

if not rsi7_Use_1h and not rsi14_Use_1h and not stoch_Use_1h and not stochrsi_Use_1h and not cci_Use_1h
    bool_1h = false

/// ******************* 4h ***************************
ma_sep_4h           = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  4h ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
rsi7_min_4h         = input(20, title="RSI 7 - Min")
rsi7_max_4h         = input(80, title="RSI 7 - Max")
rsi7_Use_4h         = input(false, title="RSI 7 ? (On / Off)")
rsi7_Raising_4h     = input(false, title="RSI 7 Raising? (On / Off)")

rsi14_min_4h        = input(20, title="RSI 14 - Min")
rsi14_max_4h        = input(80, title="RSI 14 - Max")
rsi14_Use_4h        = input(false, title="RSI 14 ? (On / Off)")
rsi14_Raising_4h    = input(false, title="RSI 14 Raising? (On / Off)") 

stoch_min_4h        = input(20, title="STOCH 14 3 3 - Min")
stoch_max_4h        = input(80, title="STOCH 14 3 3 - Max")
stoch_Use_4h        = input(false, title="STOCH 14 3 3 ? (On / Off)")
stoch_Raising_4h    = input(false, title="STOCH 14 3 3 Raising? (On / Off)")

stochrsi_min_4h     = input(20, title="STOCHRSI 14 14 3 3 - Min")
stochrsi_max_4h     = input(80, title="STOCHRSI 14 14 3 3 - Max")
stochrsi_Use_4h     = input(false, title="STOCHRSI 14 14 3 3 ? (On / Off)")
stochrsi_Raising_4h = input(false, title="STOCHRSI 14 14 3 3 Raising? (On / Off)") 

cci_min_4h          = input(20, title="CCI 20 - Min")
cci_max_4h          = input(80, title="CCI 20 - Max")
cci_Use_4h          = input(false, title="CCI 20 ? (On / Off)")
cci_Raising_4h      = input(false, title="CCII 20 Raising? (On / Off)")

rsi14_4h            = request.security(syminfo.tickerid, "240", rsi(close,14) )
rsi7_4h             = request.security(syminfo.tickerid, "240", rsi(close,7) )
stoch_4h            = request.security(syminfo.tickerid, "240", sma(sma(stoch(close, high, low, 14), 3), 3))
stochrsi_4h         = request.security(syminfo.tickerid, "240", sma(sma(stoch(rsi(close,14), rsi(close,14), rsi(close,14), 14), 3), 3))
cci_4h              = request.security(syminfo.tickerid, "240", cci(close,20) )

rsi7_4h_logic        = true
rsi7_4h_raisinglogic = true
if rsi7_Use_4h
    rsi7_4h_logic = false
    rsi7_4h_raisinglogic = rsi7_Raising_4h?rising(rsi7_4h,1):true
    if rsi7_4h>rsi7_min_4h and rsi7_4h<rsi7_max_4h and rsi7_4h_raisinglogic
        rsi7_4h_logic = true

rsi14_4h_logic        = true
rsi14_4h_raisinglogic = true
if rsi14_Use_4h
    rsi14_4h_logic = false
    rsi14_4h_raisinglogic = rsi14_Raising_4h?rising(rsi14_4h,1):true
    if rsi14_4h>rsi14_min_4h and rsi14_4h<rsi14_max_4h and rsi14_4h_raisinglogic
        rsi14_4h_logic = true

stoch_4h_logic        = true
stoch_4h_raisinglogic = true
if stoch_Use_4h
    stoch_4h_logic = false
    stoch_4h_raisinglogic = stoch_Raising_4h?rising(stoch_4h,1):true
    if stoch_4h>stoch_min_4h and stoch_4h<stoch_max_4h and stoch_4h_raisinglogic
        stoch_4h_logic = true

stochrsi_4h_logic        = true
stochrsi_4h_raisinglogic = true
if stochrsi_Use_4h
    stochrsi_4h_logic = false
    stochrsi_4h_raisinglogic = stochrsi_Raising_4h?rising(stochrsi_4h,1):true
    if stochrsi_4h>stochrsi_min_4h and stochrsi_4h<stochrsi_max_4h and stochrsi_4h_raisinglogic
        stochrsi_4h_logic = true

cci_4h_logic        = true
cci_4h_raisinglogic = true
if cci_Use_4h
    cci_4h_logic = false
    cci_4h_raisinglogic = cci_Raising_4h?rising(cci_4h,1):true
    if cci_4h>cci_min_4h and cci_4h<cci_max_4h and cci_4h_raisinglogic
        cci_4h_logic = true

bool_4h = false
bool_4h := rsi7_4h_logic and rsi7_4h_raisinglogic and
 rsi14_4h_logic and rsi14_4h_raisinglogic and
 stoch_4h_logic and stoch_4h_raisinglogic and
 stochrsi_4h_logic and stochrsi_4h_raisinglogic and
 cci_4h_logic and cci_4h_raisinglogic

if not rsi7_Use_4h and not rsi14_Use_4h and not stoch_Use_4h and not stochrsi_Use_4h and not cci_Use_4h
    bool_4h = false

/// ******************* 1d ***************************
ma_sep_1d           = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  1d ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
rsi7_min_1d         = input(20, title="RSI 7 - Min")
rsi7_max_1d         = input(80, title="RSI 7 - Max")
rsi7_Use_1d         = input(false, title="RSI 7 ? (On / Off)")
rsi7_Raising_1d     = input(false, title="RSI 7 Raising? (On / Off)")

rsi14_min_1d        = input(20, title="RSI 14 - Min")
rsi14_max_1d        = input(80, title="RSI 14 - Max")
rsi14_Use_1d        = input(false, title="RSI 14 ? (On / Off)")
rsi14_Raising_1d    = input(false, title="RSI 14 Raising? (On / Off)") 

stoch_min_1d        = input(20, title="STOCH 14 3 3 - Min")
stoch_max_1d        = input(80, title="STOCH 14 3 3 - Max")
stoch_Use_1d        = input(false, title="STOCH 14 3 3 ? (On / Off)")
stoch_Raising_1d    = input(false, title="STOCH 14 3 3 Raising? (On / Off)")

stochrsi_min_1d     = input(20, title="STOCHRSI 14 14 3 3 - Min")
stochrsi_max_1d     = input(80, title="STOCHRSI 14 14 3 3 - Max")
stochrsi_Use_1d     = input(false, title="STOCHRSI 14 14 3 3 ? (On / Off)")
stochrsi_Raising_1d = input(false, title="STOCHRSI 14 14 3 3 Raising? (On / Off)") 

cci_min_1d          = input(20, title="CCI 20 - Min")
cci_max_1d          = input(80, title="CCI 20 - Max")
cci_Use_1d          = input(false, title="CCI 20 ? (On / Off)")
cci_Raising_1d      = input(false, title="CCII 20 Raising? (On / Off)")

rsi14_1d            = request.security(syminfo.tickerid, "1440", rsi(close,14) )
rsi7_1d             = request.security(syminfo.tickerid, "1440", rsi(close,7) )
stoch_1d            = request.security(syminfo.tickerid, "1440", sma(sma(stoch(close, high, low, 14), 3), 3))
stochrsi_1d         = request.security(syminfo.tickerid, "1440", sma(sma(stoch(rsi(close,14), rsi(close,14), rsi(close,14), 14), 3), 3))
cci_1d              = request.security(syminfo.tickerid, "1440", cci(close,20) )

rsi7_1d_logic        = true
rsi7_1d_raisinglogic = true
if rsi7_Use_1d
    rsi7_1d_logic = false
    rsi7_1d_raisinglogic = rsi7_Raising_1d?rising(rsi7_1d,1):true
    if rsi7_1d>rsi7_min_1d and rsi7_1d<rsi7_max_1d and rsi7_1d_raisinglogic
        rsi7_1d_logic = true

rsi14_1d_logic        = true
rsi14_1d_raisinglogic = true
if rsi14_Use_1d
    rsi14_1d_logic = false
    rsi14_1d_raisinglogic = rsi14_Raising_1d?rising(rsi14_1d,1):true
    if rsi14_1d>rsi14_min_1d and rsi14_1d<rsi14_max_1d and rsi14_1d_raisinglogic
        rsi14_1d_logic = true

stoch_1d_logic        = true
stoch_1d_raisinglogic = true
if stoch_Use_1d
    stoch_1d_logic = false
    stoch_1d_raisinglogic = stoch_Raising_1d?rising(stoch_1d,1):true
    if stoch_1d>stoch_min_1d and stoch_1d<stoch_max_1d and stoch_1d_raisinglogic
        stoch_1d_logic = true

stochrsi_1d_logic        = true
stochrsi_1d_raisinglogic = true
if stochrsi_Use_1d
    stochrsi_1d_logic = false
    stochrsi_1d_raisinglogic = stochrsi_Raising_1d?rising(stochrsi_1d,1):true
    if stochrsi_1d>stochrsi_min_1d and stochrsi_1d<stochrsi_max_1d and stochrsi_1d_raisinglogic
        stochrsi_1d_logic = true

cci_1d_logic        = true
cci_1d_raisinglogic = true
if cci_Use_1d
    cci_1d_logic = false
    cci_1d_raisinglogic = cci_Raising_1d?rising(cci_1d,1):true
    if cci_1d>cci_min_1d and cci_1d<cci_max_1d and cci_1d_raisinglogic
        cci_1d_logic = true

bool_1d = false
bool_1d := rsi7_1d_logic and rsi7_1d_raisinglogic and
 rsi14_1d_logic and rsi14_1d_raisinglogic and
 stoch_1d_logic and stoch_1d_raisinglogic and
 stochrsi_1d_logic and stochrsi_1d_raisinglogic and
 cci_1d_logic and cci_1d_raisinglogic

if not rsi7_Use_1d and not rsi14_Use_1d and not stoch_Use_1d and not stochrsi_Use_1d and not cci_Use_1d
    bool_1d = false

//// Big old logic
buy  = bool_1m and bool_5m and bool_15m and bool_1h and bool_4h and bool_1d and pc_logic
sell = false

//////////////////////////////////////////////////////////////////////////////////////////
//*** This Trade Management Section of code is a modified version of that found in   ***//
//*** "How to automate this strategy for free using a chrome extension" by CryptoRox ***//
//*** Modifications and tradeState engine by JustUncleL.                             ***// 
//////////////////////////////////////////////////////////////////////////////////////////
//

///////////////////////////////////////////////
//* Backtesting Period Selector | Component *//
///////////////////////////////////////////////

//* https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
//* https://www.tradingview.com/u/pbergden/ *//
//* Modifications made by JustUncleL*//

testStartYear   = input(2018, "Backtest Start Year",minval=1980)
testStartMonth  = input(9, "Backtest Start Month",minval=1,maxval=12)
testStartDay    = input(15, "Backtest Start Day",minval=1,maxval=31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear    = input(9999, "Backtest Stop Year",minval=1980)
testStopMonth   = input(12, "Backtest Stop Month",minval=1,maxval=12)
testStopDay     = input(31, "Backtest Stop Day",minval=1,maxval=31)
testPeriodStop  = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

//////////////////////////
//* Strategy Component *//
//////////////////////////
high_ = high
low_  = low

AQUA = #00FFFFFF
BLUE = #0000FFFF
RED  = #FF0000FF
LIME = #00FF00FF
GRAY = #808080FF
DARKRED   = #8B0000FF
DARKGREEN = #006400FF
//
//fastExit  = input(false,title="Use Opposite Trade as a Close Signal")
//clrBars   = input(true,title="Colour Candles to Trade Order state")

fastExit = true
clrBars  = false
 
//orderType = input("LongsOnly",title="What type of Orders", options=["Longs+Shorts","LongsOnly","ShortsOnly","Flip"])
orderType = "LongsOnly"
//
isLong   = (orderType != "ShortsOnly")
isShort  = (orderType != "LongsOnly")

//////////////////////////////////////////////////
//* Put Entry and special Exit conditions here *//
//////////////////////////////////////////////////

//////////////////////////
//* tradeState Engine  *//
INACTIVE    = 0   // No trades open
ACTIVELONG  = 1   // Long Trade Started
ACTIVESHORT = -1  // Short Trade Started
//
//////////////////////////

// Keep track of current trade state
longClose = false, longClose := nz(longClose[1],false)
shortClose = false, shortClose := nz(shortClose[1],false)
tradeState = INACTIVE, tradeState := nz(tradeState[1])
tradeState := tradeState==INACTIVE ?   buy==1 and (barstate.isconfirmed or barstate.ishistory) and isLong and not longClose and not shortClose? ACTIVELONG :
                               sell==1  and (barstate.isconfirmed or barstate.ishistory) and isShort and not longClose and not shortClose? ACTIVESHORT : 
                          tradeState : tradeState

//Entry Triggers, this happens when tradeState changes from neutral to active
longCondition  = false
shortCondition = false
longCondition  := change(tradeState) and tradeState==ACTIVELONG
shortCondition := change(tradeState) and tradeState==ACTIVESHORT
if orderType=="Flip"
    temp = longCondition
    longCondition  := shortCondition
    shortCondition := temp
//end if

//SPECIAL Exit Condition.
// Exit on Average Fast/Slow MA cross over, force no repaint
longExitC  =  sell ? 1 : 0
shortExitC = 0

// Exit Trigger without SL set and trade Actine
longExit = change(longExitC) and longExitC==1 and tradeState==1
shortExit = change(shortExitC) and shortExitC==1 and tradeState==-1

// -- debugs
//plotchar(tradeState,"tradeState at Event",location=location.bottom, color=na)
//plotchar(longCondition, title="longCondition",color=na)
//plotchar(shortCondition, title="shortCondition",color=na)
//plotchar(tradeState, title="tradeState",color=na)
// -- /debugs

/////////////////////////////////////
//======[ Deal Entry Prices ]======//
/////////////////////////////////////

last_open_longCondition = na
last_open_shortCondition = na
last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? close : nz(last_open_shortCondition[1])

//////////////////////////////////
//======[ Position State ]======//
//////////////////////////////////

in_longCondition  = tradeState == ACTIVELONG
in_shortCondition = tradeState == ACTIVESHORT

/////////////////////////////////
//======[ Trailing Stop ]======//
/////////////////////////////////

// This Trailing Stop Starts as soon as trade is Started
isTS = input(false, "Trailing Stop")
ts   = input(3.0, "Trailing Stop (%)", minval=0,step=0.1, type=float) /100

// Initialise and track highs and lows
short_ts = false, long_ts = false
last_high = 0.0, last_high := nz(last_high[1],na)
last_low = 0.0, last_low := nz(last_low[1],na)
last_high_short = 0.0, last_high_short := nz(last_high_short[1],na)
last_low_long = 0.0, last_low_long := nz(last_low_long[1],na)

// LONGS TSL
if in_longCondition == true
    last_high :=  (na(last_high) or high_ > last_high) ? high_ : last_high
    last_low_long :=  (na(last_low_long) or low_ < last_low_long) ? low_ : last_low_long
    long_ts :=  isTS and (low_ <= last_high - last_high * ts)
//else
if in_longCondition == false
    long_ts := false
    last_high := na
    last_low_long := na
//end if

//SHORTS TSL
if in_shortCondition == true
    last_low := (na(last_low) or low_ < last_low) ? low_ : last_low
    last_high_short := (na(last_high_short) or high_ > last_high_short) ? high_ : last_high_short
    short_ts := isTS and (high_ >= last_low + last_low * ts)
if in_shortCondition == false
    short_ts := false
    last_low := na
    last_high_short := na
//end if

///////////////////////////////
//======[ Take Profit ]======//
///////////////////////////////

isTP = input(true, "Take Profit")
tp   = input(1.0, "Take Profit (%)",minval=0,step=0.1,type=float) / 100
ttp  = input(0.0, "Trailing Profit (%)",minval=0,step=0.1,type=float) / 100
ttp := ttp>tp ? tp : ttp

long_tp  = isTP and in_longCondition  and (last_high >= last_open_longCondition + last_open_longCondition * tp)  and (low_ <= last_high - last_high * ttp)
short_tp = isTP and in_shortCondition and (last_low <= last_open_shortCondition - last_open_shortCondition * tp) and (high_ >= last_low + last_low * ttp)

/////////////////////////////
//======[ Stop Loss ]======//
/////////////////////////////

isSL     = input(true, "Stop Loss")
sl       = input(3.0, "Stop Loss (%)", minval=0,step=0.1, type=float) / 100
long_sl  =  isSL and in_longCondition and (low_ <= last_open_longCondition - last_open_longCondition * sl)
short_sl = isSL and in_shortCondition and (high_ >= last_open_shortCondition + last_open_shortCondition * sl)

////////////////////////////////////
//======[ Stop on Opposite ]======//
////////////////////////////////////

//NOTE Short exit signal is non-repainting, no need to force it, if Pyramiding keep going
long_sos = (fastExit or (not isTS and not isSL)) and longExit and in_longCondition
short_sos = (fastExit or (not isTS and not isSL)) and shortExit and in_shortCondition 

/////////////////////////////////
//======[ Close Signals ]======//
/////////////////////////////////

// Create a single close for all the different closing conditions, all conditions here are non-repainting
longClose  := isLong and (long_tp or long_sl or long_ts or long_sos) and not longCondition
shortClose := isShort and (short_tp or short_sl or short_ts or short_sos) and not shortCondition

///////////////////////////////
//======[ Plot Colors ]======//
///////////////////////////////

longCloseCol = na
shortCloseCol = na
longCloseCol := long_tp ? green : long_sl ? maroon : long_ts ? purple : long_sos ? orange :longCloseCol[1]
shortCloseCol := short_tp ? green : short_sl ? maroon : short_ts ? purple : short_sos ? orange : shortCloseCol[1]
//
tpColor = isTP and in_longCondition ? lime : isTP and in_shortCondition ? lime : na
slColor = isSL and in_longCondition ? red : isSL and in_shortCondition ? red : na

//////////////////////////////////
//======[ Strategy Plots ]======//
//////////////////////////////////

//LONGS
plot(isTS and in_longCondition?
     last_high - last_high * ts : na, "Buy Trailing", fuchsia, style=2, linewidth=1,offset=1)
plot(isTP and in_longCondition and last_high < last_open_longCondition + last_open_longCondition * tp ? 
     last_open_longCondition + last_open_longCondition * tp : na, "Long TP Active", tpColor, style=3,join=false, linewidth=1,offset=1)
plot(isTP and in_longCondition and last_high >= last_open_longCondition +  last_open_longCondition * tp ? 
     last_high - last_high * ttp : na, "Buy Trailing", black, style=2, linewidth=1,offset=1)
plot(isSL and in_longCondition and last_low_long > last_open_longCondition - last_open_longCondition * sl ? 
     last_open_longCondition - last_open_longCondition * sl : na, "Long SL", slColor, style=3,join=false, linewidth=1,offset=1)

//SHORTS
plot(isTS and in_shortCondition?
     last_low + last_low * ts : na, "Short Trailing", fuchsia, style=2, linewidth=1,offset=1)
plot(isTP and in_shortCondition and last_low > last_open_shortCondition - last_open_shortCondition * tp ? 
     last_open_shortCondition - last_open_shortCondition * tp : na, "Short TP Active", tpColor, style=3,join=false, linewidth=1,offset=1)
plot(isTP and in_shortCondition and last_low <= last_open_shortCondition -  last_open_shortCondition * tp ? 
     last_low + last_low * ttp : na, "Short Trailing", black, style=2, linewidth=1,offset=1)
plot(isSL and in_shortCondition and last_high_short < last_open_shortCondition + last_open_shortCondition * sl ? 
     last_open_shortCondition + last_open_shortCondition * sl : na, "Short SL", slColor, style=3,join=false, linewidth=1,offset=1)

// Colour code the candles for Profit/Loss: Profit=LIGHT colour,  Loss=DARK colour 
bclr = not clrBars ? na : tradeState==INACTIVE ? GRAY : 
                          in_longCondition ? close<last_open_longCondition? DARKGREEN : LIME :
                          in_shortCondition ? close>last_open_shortCondition? DARKRED : RED : GRAY
barcolor(bclr,title="Trade State Bar Colouring")

///////////////////////////////
//======[ Alert Plots ]======//
///////////////////////////////

//BUY SELL APEX
//plotshape(longCondition?close:na, title="Buy", color=green, textcolor=green, transp=0, 
//         style=shape.triangleup, location=location.belowbar, size=size.small,text="Buy",offset=0)
//plotshape(longClose?close:na,    title="Sell", color=longCloseCol, textcolor=white, transp=0, 
//          style=shape.labeldown, location=location.abovebar, size=size.small,text="Sell",offset=0)
          
// //SHORTS
// plotshape(shortCondition?close:na, title="Short", color=red, textcolor=red, transp=0, 
//           style=shape.triangledown, location=location.abovebar, size=size.small,text="SHORT",offset=0)
// plotshape(shortClose?close:na, title="Short Close", color=shortCloseCol, textcolor=white, transp=0, 
//           style=shape.labelup, location=location.belowbar, size=size.small,text="Short",offset=0)

// Autoview alert syntax - This assumes you are trading coins BUY and SELL on Binance Exchange
// WARNING*** Only use Autoview to automate a strategy after you've sufficiently backtested and forward tested the strategy.
// You can learn more about the syntax here:
//      http://autoview.with.pink/#syntax and you can watch this video here: https://www.youtube.com/watch?v=epN5Tjinuxw

// For the opens you will want to trigger BUY orders on LONGS (eg ETHBTC) with alert option "Once Per Bar Close"
// and SELL orders on SHORTS (eg BTCUSDT)
//      b=buy q=0.001 e=binance s=ethbtc  u=currency t=market  ( LONG )
// or   b=sell q=0.001 e=binance s=btcusdt t=market ( SHORT )
alerts = input(false,  title="Turn ON Tradingview Alerts ? ")
alertcondition(alerts?longCondition:na, "Buy", "BUY")
//alertcondition(shortCondition, "Open Short", "SHORT")

// For the closes you will want to trigger these alerts on condition with alert option "Once Per Bar"
// (NOTE: with Renko you can only use "Once Per Bar Close" option)
//      b=sell q=99% e=binance s=ethbtc t=market  ( CLOSE LONGS )
// or   b=buy q=99% e=binance s=btcusdt  u=currency t=market  ( CLOSE SHORTS )
// This gets it as it happens and typically results in a better exit live than in the backtest. 
// It works really well for counteracting some market slippage
alertcondition(alerts?longClose:na, "Sell", "SELL")
//alertcondition(shortClose, "Close Shorts", "CLOSE SHORTS")

////////////////////////////////////////////
//======[ Strategy Entry and Exits ]======//
////////////////////////////////////////////

if testPeriod() and isLong
    strategy.entry("Long", 1, when=longCondition)
    strategy.close("Long", when=longClose )

//if testPeriod() and isShort
//    strategy.entry("Short", 0,  when=shortCondition)
//    strategy.close("Short", when=shortClose )
    
// --- Debugs
//plotchar(longExit,title="longExit",location=location.bottom,color=na)
//plotchar(longCondition,title="longCondition",location=location.bottom,color=na)
//plotchar(in_longCondition,title="in_longCondition",location=location.bottom,color=na)
//plotchar(longClose,title="longClose",location=location.bottom,color=na,color=na)
//plotchar(buy,title="buy",location=location.bottom,color=na)
// --- /Debugs

///////////////////////////////////
//======[ Reset Variables ]======//
///////////////////////////////////

if longClose or shortClose
    tradeState := INACTIVE
    in_longCondition := false
    in_shortCondition := false
    last_low := na
    last_low_long := na
    last_high := na
    last_high_short := na

// EOF


//-- SUPPORT/RESISTANCE LINES    by:ByDipsOnly and Allcoast ----------------------------------------------------------------------------- 
sr_sep             = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻ S/R Lines  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
show_SPlines_input = input(false, "Show S/R Lines")
tf = timeframe.period

vamp = input(title="VolumeMA", defval=6)
vam = sma(volume, vamp)

upside = high[3]>high[4] and high[4]>high[5] and high[2]<high[3] and high[1]<high[2] and volume[3]>vam[3]
downside = low[3]<low[4] and low[4]<low[5] and low[2]>low[3] and low[1]>low[2] and volume[3]>vam[3]


calcup() =>
    fractalup = na
    fractalup := upside ? high[3] : fractalup[1]

calcdown() =>
    fractaldown = na
    fractaldown := downside ? low[3] : fractaldown[1]

fuptf = request.security(syminfo.tickerid,tf == "current" ? period : tf, calcup())
fdowntf = request.security(syminfo.tickerid,tf == "current" ? period : tf, calcdown())

plotup = show_SPlines_input==true?fuptf:na
plotdown = show_SPlines_input==true?fdowntf:na
plot(plotup, "FractalUp", color=yellow, linewidth=1, style=cross, transp=0, offset =-3, join=false)
plot(plotdown, "FractalDown", color=blue, linewidth=1, style=cross, transp=0, offset=-3, join=false)

fractalupalert = na
fractalup = na
fractalup := upside ? high[3] : fractalup[1]
fractalupalert := high[3] > open or fractalup[1] > open
alertcondition(show_SPlines_input?fractalupalert:na, title="R Line", message='R Line')
//-- END SUPPORT/RESISTANCE LINES -------------------------------------------------------------------------------------------

```

> Detail

https://www.fmz.com/strategy/439199

> Last Modified

2024-01-18 12:01:23
