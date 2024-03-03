
> Name

动量跟踪均线反转策略A-Momentum-Tracking-Mean-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ec8e6941fb3f845836.png)
 [trans]

## 概述

这个策略采用移动平均线、布林带、RSI、随机指标等多个指标,结合多时间框架分析,设计出一个综合利用动量指标判断市场反转的策略。

## 策略原理

该策略的核心逻辑是跟踪短期和长期移动平均线的交叉来判断底部和顶部,同时辅助参考动量指标如RSI、随机指标等的极端值来判断超买超卖现象。

具体来说,它会分别绘制两个不同参数的移动平均线,一个较短期判断当前趋势,一个较长期判断主要趋势。当短期移动平均线从下方上穿越长期移动平均线时,认为行情反转,产生买入信号;当从上方下穿时,产生卖出信号。

此外,策略还会结合RSI指标查看它是否进入超卖区域,以及随机指标查看K线是否进入超卖区域等来判断底部特征。针对顶部特征,也会利用这两个指标的反向逻辑来判断。

在出场方面,策略同时使用止盈、止损、跟踪止损来管理头寸。

## 优势分析

这是一个结合趋势跟踪和反转识别的策略,同时兼顾动量指标的实用策略。它具有以下几个优势:

1. 移动平均线的交叉系统是一个简单有效判断反转的方法。双均线策略容易操作,历史效果良好。

2. 结合RSI等指标来判断反转信号的可靠性,避免在非底部非顶部位置产生误导信号。

3. 止盈、止损和跟踪止损机制帮助锁定利润,控制风险。

## 风险分析 

尽管该策略有许多优点,但也存在一些风险需要注意:

1. 双均线策略容易在震荡行情中被套住。如果行情长期盘整,会频繁打开又平掉头寸。

2. RSI等指标并不能完全避免错误信号的出现。例如快速突破上一波高点会让RSI无法进入超买区域等。

3. 止损点过宽会增加亏损风险。止损幅度需要根据具体品种来调整。

## 优化方向

该策略还有许多可优化的地方:  

1. 可以测试不同类型的移动平均线,寻找最匹配的均线指标。

2. 可以加入更多辅助指标,如MACD,KD,布林带等来丰富策略逻辑。

3. 可以通过机器学习等方式来自动优化头寸管理参数,使止损止盈更为智能化。

4. 不同品种的参数可以单独优化,以适应各品种的特点。

## 总结

综上所述,动量跟踪均线反转策略是一个简单实用的量化策略。它利用均线系统判断市场反转点,辅助以动量指标确认信号可靠性,并采用智能化的头寸管理来锁定利润和控制风险。该策略易于理解和实施,值得练习和优化,是交易者学习量化交易的好起点。

|| 

## Overview  

This strategy uses multiple indicators including moving averages, Bollinger Bands, RSI and Stochastics across different timeframes to design a strategy that utilizes momentum indicators to determine market reversals.

## How It Works

The core logic of this strategy is to track crosses of short-term and long-term moving averages to identify bottoms and tops, while referring to momentum indicators like RSI and Stochastics for additional confirmation of overbought and oversold conditions.

Specifically, it plots two moving averages with different parameters, a shorter one to determine the current trend and a longer one for the major trend. When the shorter moving average crosses above the longer moving average from below, it signals a reversal and generates a buy signal. When crossing down, it generates a sell signal. 

In addition, the strategy also checks whether RSI has entered the oversold territory and if the Stochastics K line has entered the oversold area to confirm bottoming signals. The reverse logic is used to confirm topping signals.

On the exit side, the strategy uses take profit, stop loss and trailing stop mechanisms to manage positions.

## Advantage Analysis  

This is a strategy combining trend following and reversal identification, while also incorporating momentum indicators. The main advantages are:

1. Crossovers of moving averages are simple yet effective ways to identify reversals. Dual moving average strategies are easy to implement and have good historical performance.

2. Combining indicators like RSI adds reliability to reversal signals, avoiding false signals at non-bottoms or non-tops.  

3. Take profit, stop loss and trailing stop mechanisms help lock in profits and control risk.

## Risk Analysis

Despite its advantages, some risks to note include:

1. Dual moving average strategies can get whipsawed in ranging markets, frequently opening and closing positions when prices oscillate in sideways moves.

2. Indicators like RSI cannot fully prevent incorrect signals. For example, quickly breaking previous highs could stop RSI from reaching overbought territory.

3. Stop loss levels set too wide increase risk of larger losses. Stop loss percentages need to be adjusted based on the specifics of each market.

## Optimization Directions

Some ways this strategy can be further optimized:

1. Different types of moving averages can be tested to find the best fit for the strategy.

2. More complementary indicators like MACD, KDJ, Bollinger Bands can be added to enrich the logic.

3. Machine learning can be used to automatically optimize position sizing and profit taking/stopping parameters. 

4. Parameters can be separately optimized for different products based on their characteristics.

## Conclusion  

In summary, the Momentum Tracking Mean Reversion Strategy is a simple yet practical quant strategy. It uses moving average crossovers to determine reversal points, confirms signal reliability with momentum indicators, and manages positions intelligently to lock in profits and control risk. Easy to understand and implement, it is a good starting point for traders to learn algorithmic trading strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|  APEX Tester Buy/Sell Basic v01  |
|v_input_2|false|▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔|
|v_input_3|false|******** BUY STRATEGIES ********|
|v_input_4|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MA  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_5|8|MA length - short|
|v_input_6|9|MA length - long|
|v_input_7|false|Check to turn ON Different Time Frame|
|v_input_8|5|MA - Different Time Frame|
|v_input_9|0|MA Type: T3|EMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|SMA|
|v_input_10|0|Detector: Short Crosses Above Long|Short Above Long|Price Cross Above Short|Price Above Short|Price Cross Above Long|Price Above Long|Price Above Both|Price Below Both|
|v_input_11|false|Use Moving Average ? (On / Off)|
|v_input_12|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  BB  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_13|10|BB length|
|v_input_14|2.1|BB std|
|v_input_15|false|Check to turn ON Different Time Frame|
|v_input_16|3|BB - Time Frame|
|v_input_17|0|MA: T3|EMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|SMA|
|v_input_18|0|Detector: Price Cross Below|Price Below|Price Cross Above|Price Above|
|v_input_19|true|Use BB ? (On / Off)|
|v_input_20|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  RSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_21|2|RSI length|
|v_input_22|false|Check to turn ON Different Time Frame|
|v_input_23|3|STOCH - Time Frame|
|v_input_24|12|RSI Oversold|
|v_input_25|0|Detector: Signal Below Oversold|Cross Below Oversold|Signal Above Oversold|Cross Above Oversold|
|v_input_26|true|Use RSI ? (On / Off)|
|v_input_27|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  STOCH  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_28|false|Check to turn ON Different Time Frame|
|v_input_29|3|STOCH - Time Frame|
|v_input_30|12|STOCH fast K|
|v_input_31|true|STOCH slow K|
|v_input_32|0|STOCH slow K: EMA|SMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|T3|
|v_input_33|true|STOCH slow D|
|v_input_34|0|STOCH slow D: EMA|SMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|T3|
|v_input_35|10|STOCH Oversold Treashold|
|v_input_36|0|Detector: Signal Below Oversold|Cross Below Oversold|Cross Above Oversold|
|v_input_37|true|Use STOCH ? (On / Off)|
|v_input_38|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  SRSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_39|false|Check to turn ON Different Time Frame|
|v_input_40|3|SRSI - Time Frame|
|v_input_41|14|RSI length|
|v_input_42|14|Time Period|
|v_input_43|3|Fast K|
|v_input_44|3|Slow D(or Fast)|
|v_input_45|30|STOCHRSI Oversold Treashold|
|v_input_46|0|Detector: K Below Oversold|K Cross Above D|K Cross Above Oversold|K Cross Below Oversold|K Cross Above D and Oversold|K Above Oversold|
|v_input_47|false|Use STOCHRSI (On / Off)?|
|v_input_48|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MACD  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_49|12|MACD fast|
|v_input_50|26|MACD slow|
|v_input_51|9|MACD signal|
|v_input_52|false|Check to turn ON Different Time Frame|
|v_input_53|3|MACD - Time Frame|
|v_input_54|0|Detector: MACD Cross Above Signal|MACD Above Signal|MACD Below Signal|MACD Above Treshold|MACD Below Treshold|Centerline Cross Upward|Centerline Cross Downward|
|v_input_55|false|Treshold|
|v_input_56|false|Use MACD (On / Off)?|
|v_input_57|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  CCI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_58|14|CCI Length|
|v_input_59|100|CCI Treshold|
|v_input_60|false|Check to turn ON Different Time Frame|
|v_input_61|3|CCI - Time Frame|
|v_input_62|0|Detector: Signal Below Treshold|Signal Above Treshold|Signal Cross Below Treshold|Signal Cross Above Treshold|
|v_input_63|false|Use CCI (On / Off)?|
|v_input_64|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  VWAP  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_65|false|Check to turn ON Different Time Frame|
|v_input_66|5|VWAP - Time Frame|
|v_input_67|0|Detector: Price Above|Price Cross Above|Price Cross Below|Price Below|
|v_input_68|false|Use VWAP (On / Off)?|
|v_input_69|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻Perc.Chan.⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_70|-2|Drop Percent|
|v_input_71|false|Check to turn ON Different Time Frame|
|v_input_72|3|Percent Change - Time Frame|
|v_input_73|false|Use Percent Change (On / Off)?|
|v_input_74|false|▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔|
|v_input_75|false|******** SELL STRATEGIES ********|
|v_input_76|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MA  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_77|10|MA length - short|
|v_input_78|20|MA length - long|
|v_input_79|false|Check to turn ON Different Time Frame|
|v_input_80|5|MA - Different Time Frame|
|v_input_81|0|MA Type: EMA|SMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|T3|
|v_input_82|0|Detector: Short Crosses Below Long|Short Below Long|Short Above Long|Price Cross Below Short|Price Below Short|Price Cross Below Long|Price Below Long|Price Above Both MA|Price Below Both MA|
|v_input_83|true|Use Moving Average ? (On / Off)|
|v_input_84|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  BB  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_85|10|BB length|
|v_input_86|2.1|BB std|
|v_input_87|false|Check to turn ON Different Time Frame|
|v_input_88|3|BB - Time Frame|
|v_input_89|0|MA: T3|EMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|SMA|
|v_input_90|0|Detector: Price Cross Below|Price Above|Price Cross Above|Price Below|
|v_input_91|false|Use BB ? (On / Off)|
|v_input_92|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  RSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_93|2|RSI length|
|v_input_94|false|Check to turn ON Different Time Frame|
|v_input_95|3|STOCH - Time Frame|
|v_input_96|12|RSI Overbought|
|v_input_97|0|Detector: Signal Above Overbought|Cross Below Overbought|Signal Below Overbought|Cross Above Overbought|
|v_input_98|false|Use RSI ? (On / Off)|
|v_input_99|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  STOCH  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_100|false|Check to turn ON Different Time Frame|
|v_input_101|3|STOCH - Time Frame|
|v_input_102|12|STOCH fast K|
|v_input_103|true|STOCH slow K|
|v_input_104|0|STOCH slow K: EMA|SMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|T3|
|v_input_105|true|STOCH slow D|
|v_input_106|0|STOCH slow D: EMA|SMA|WMA|DEMA|TEMA|TRIMA|KAMA|MAMA|T3|
|v_input_107|10|STOCH Overbought Treashold|
|v_input_108|0|Detector: Signal Above Overbought|Cross Below Overbought|Cross Above Overbought|
|v_input_109|false|Use STOCH ? (On / Off)|
|v_input_110|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  SRSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_111|false|Check to turn ON Different Time Frame|
|v_input_112|3|SRSI - Time Frame|
|v_input_113|14|RSI length|
|v_input_114|14|Time Period|
|v_input_115|3|Fast K|
|v_input_116|3|Slow D(or Fast)|
|v_input_117|30|STOCHRSI Overbought Treashold|
|v_input_118|0|Detector: K Above Overbought|K Cross Above D|K Cross Above Overbought|K Cross Below Overbought|K Below Overbought|K Cross Above D and Overbought|
|v_input_119|false|Use STOCHRSI (On / Off)?|
|v_input_120|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MACD  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_121|12|MACD fast|
|v_input_122|26|MACD slow|
|v_input_123|9|MACD signal|
|v_input_124|false|Check to turn ON Different Time Frame|
|v_input_125|3|MACD - Time Frame|
|v_input_126|0|Detector: MACD Cross Below Signal|MACD Above Signal|MACD Below Signal|MACD Above Treshold|MACD Below Treshold|Centerline Cross Upward|Centerline Cross Downward|
|v_input_127|false|Treshold|
|v_input_128|false|Use MACD (On / Off)?|
|v_input_129|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  CCI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_130|14|CCI Length|
|v_input_131|100|CCI Treshold|
|v_input_132|false|Check to turn ON Different Time Frame|
|v_input_133|3|CCI - Time Frame|
|v_input_134|0|Detector: Signal Below Treshold|Signal Above Treshold|Signal Cross Below Treshold|Signal Cross Above Treshold|
|v_input_135|false|Use CCI (On / Off)?|
|v_input_136|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  VWAP  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_137|false|Check to turn ON Different Time Frame|
|v_input_138|5|VWAP - Time Frame|
|v_input_139|0|Detector: Price Above|Price Cross Above|Price Cross Below|Price Below|
|v_input_140|false|Use VWAP (On / Off)?|
|v_input_141|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻Perc.Chan.⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_142|2|Rise Percent|
|v_input_143|false|Check to turn ON Different Time Frame|
|v_input_144|3|Percent Change - Time Frame|
|v_input_145|false|Use Percent Change (On / Off)?|
|v_input_146|false|▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔|
|v_input_147|false|******** STRATEGY SETTINGS ********|
|v_input_148|2018|Backtest Start Year|
|v_input_149|9|Backtest Start Month|
|v_input_150|20|Backtest Start Day|
|v_input_151|false|Trailing Stop|
|v_input_152|3|Trailing Stop (%)|
|v_input_153|true|Take Profit|
|v_input_154|true|Take Profit (%)|
|v_input_155|false|Trailing Profit (%)|
|v_input_156|true|Stop Loss|
|v_input_157|2|Stop Loss (%)|
|v_input_158|false|⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻ S/R Lines  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻|
|v_input_159|true|Show S/R Lines|
|v_input_160|6|VolumeMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-18 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("APEX - Tester - Buy/Sell Strategies - Basic - BACKTESTER", overlay = true)
//study("APEX - Tester - Buy/Sell Strategies - Basic ", overlay = true)
source_main             = close
/////////////////////////////////////////////////
// BUY STRATEGIES - SELECTION 
/////////////////////////////////////////////////
puppy_sep               = input(false, title="  APEX Tester Buy/Sell Basic v01  ")
buy1_sep                = input(false, title="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔" )
buy2_sep                = input(false, title="******** BUY STRATEGIES ********")
ma_sep                  = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MA  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
ma_length_short         = input(8,  minval=1, title="MA length - short")
ma_length_long          = input(9,  minval=1, title="MA length - long")
ma_useRes               = input(false, title="Check to turn ON Different Time Frame")
ma_candle_period        = input("5", title="MA - Different Time Frame")
ma_type                 = input("T3", title="MA Type", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
ma_detector             = input("Short Crosses Above Long", title="Detector", options=["Short Crosses Above Long",
 "Short Above Long","Price Cross Above Short","Price Above Short","Price Cross Above Long","Price Above Long","Price Above Both","Price Below Both"])
ma_use                  = input(false, title="Use Moving Average ? (On / Off)")

bb_sep                  = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  BB  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
bb_length               = input(10,  minval=1, title="BB length")
bb_std                  = input(2.1, minval=0, type = float,  title="BB std")
bb_useDifferentRes      = input(false, title="Check to turn ON Different Time Frame")
bb_candle_period        = input("3",  title="BB - Time Frame")
bb_type                 = input("T3", title="MA", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
bb_detector             = input("Price Cross Below", title="Detector", options=["Price Cross Below", "Price Below", "Price Cross Above", "Price Above"])
bb_use                  = input(true, title="Use BB ? (On / Off)")

rsi_sep                 = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  RSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
rsi_length              = input(2,  minval=1, title="RSI length")
rsi_useDifferentRes     = input(false, title="Check to turn ON Different Time Frame")
rsi_candle_period       = input("3",  title="STOCH - Time Frame")
rsi_oversold            = input(defval = 12 , title = "RSI Oversold",  minval=0)
rsi_detector            = input("Signal Below Oversold", title="Detector", options=["Signal Below Oversold", "Cross Below Oversold", "Signal Above Oversold", "Cross Above Oversold"])
rsi_use                 = input(true, title="Use RSI ? (On / Off)")

stoch_sep               = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  STOCH  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
stoch_useDifferentRes   = input(false, title="Check to turn ON Different Time Frame")
stoch_candle_period     = input("3",  title="STOCH - Time Frame")
stoch_length_fk         = input(12,  minval=1, title="STOCH fast K")
stoch_length_sk         = input(1,   minval=1, title="STOCH slow K")
stoch_type_sk           = input("EMA", title="STOCH slow K", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
stoch_length_sd         = input(1,   minval=1, title="STOCH slow D")
stoch_type_sd           = input("EMA", title="STOCH slow D", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
stoch_oversold          = input(defval = 10 , title = "STOCH Oversold Treashold",  minval=0)
stoch_detector          = input("Signal Below Oversold", title="Detector", options=["Signal Below Oversold", "Cross Below Oversold", "Cross Above Oversold"])
stoch_use               = input(true, title="Use STOCH ? (On / Off)")

srsi_sep                = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  SRSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
stochrsi_useDifferentRes= input(false, title="Check to turn ON Different Time Frame")
stochrsi_candle_period  = input("3",  title="SRSI - Time Frame")
stochrsi_len            = input(14,  minval=1, title="RSI length")
stochrsi_stoch          = input(14,  minval=1, title="Time Period")
stochrsi_length_fk      = input(3,  minval=1, title="Fast K")
stochrsi_length_sd      = input(3,   minval=1, title="Slow D(or Fast)")
stochrsi_oversold       = input(defval = 30 , title = "STOCHRSI Oversold Treashold",  minval=0)
stochrsi_detector       = input("K Below Oversold", title="Detector", options=["K Cross Above D and Oversold", "K Cross Above D", "K Cross Above Oversold",
 "K Cross Below Oversold","K Below Oversold","K Above Oversold"])
stochrsi_use            = input(false, title="Use STOCHRSI (On / Off)?")

macd_sep                = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MACD  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
macd_fast               = input(12,     title="MACD fast")
macd_slow               = input(26,     title="MACD slow")
macd_signal             = input(9,      title="MACD signal")
macd_useDifferentRes    = input(false, title="Check to turn ON Different Time Frame")
macd_candle_period      = input("3", title="MACD - Time Frame")
macd_detector           = input("MACD Cross Above Signal", title="Detector", options=["MACD Cross Above Signal", "MACD Above Signal", "MACD Below Signal", 
 "MACD Above Treshold", "MACD Below Treshold", "Centerline Cross Upward", "Centerline Cross Downward"])
macd_treshold           = input(defval = 0 , title = "Treshold", type = float)
macd_use                = input(false, title="Use MACD (On / Off)?")

cci_sep                 = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  CCI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
cci_len                 = input(14,      title="CCI Length")
cci_treshold            = input(100,     title="CCI Treshold")
cci_useDifferentRes     = input(false, title="Check to turn ON Different Time Frame")
cci_candle_period       = input("3",  title="CCI - Time Frame")
cci_detector            = input("Signal Below Treshold", title="Detector", options=["Signal Cross Above Treshold", "Signal Above Treshold", "Signal Cross Below Treshold", "Signal Below Treshold"])
cci_use                 = input(false, title="Use CCI (On / Off)?")

vwap_sep                = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  VWAP  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
vwap_useRes             = input(false, title="Check to turn ON Different Time Frame")
vwap_candle_period      = input("5", title="VWAP - Time Frame")
vwap_detector           = input("Price Above", title="Detector", options=["Price Cross Above","Price Above","Price Cross Below","Price Below"])
vwap_use                = input(false, title="Use VWAP (On / Off)?")

pc_sep                  = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻Perc.Chan.⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
pc_change               = input(-2,  type=float,    title="Drop Percent")
pc_useDifferentRes      = input(false, title="Check to turn ON Different Time Frame")
pc_candle_period        = input("3",  title="Percent Change - Time Frame")
pc_use                  = input(false, title="Use Percent Change (On / Off)?")

///////////////////////////////////////////////
// SELL STRATEGIES - SELECTION
///////////////////////////////////////////////
sell0_sep                    = input(false, title="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔" )
sell1_sep                    = input(false, title="******** SELL STRATEGIES ********")
sell_ma_sep                  = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MA  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_ma_length_short         = input(10,  minval=1, title="MA length - short")
sell_ma_length_long          = input(20,  minval=1, title="MA length - long")
sell_ma_useRes               = input(false, title="Check to turn ON Different Time Frame")
sell_ma_candle_period        = input("5", title="MA - Different Time Frame")
sell_ma_type                 = input("EMA", title="MA Type", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
sell_ma_detector             = input("Short Crosses Below Long", title="Detector", options=["Short Crosses Below Long",
 "Short Below Long","Short Above Long","Price Cross Below Short","Price Below Short","Price Cross Below Long","Price Below Long","Price Above Both MA","Price Below Both MA"])
sell_ma_use                  = input(true, title="Use Moving Average ? (On / Off)")

sell_bb_sep                  = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  BB  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_bb_length               = input(10,  minval=1, title="BB length")
sell_bb_std                  = input(2.1, minval=0, type = float,  title="BB std")
sell_bb_useDifferentRes      = input(false, title="Check to turn ON Different Time Frame")
sell_bb_candle_period        = input("3",  title="BB - Time Frame")
sell_bb_type                 = input("T3", title="MA", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
sell_bb_detector             = input("Price Cross Below", title="Detector", options=["Price Cross Above", "Price Above","Price Cross Below", "Price Below"])
sell_bb_use                  = input(false, title="Use BB ? (On / Off)")

sell_rsi_sep                 = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  RSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_rsi_length              = input(2,  minval=1, title="RSI length")
sell_rsi_useDifferentRes     = input(false, title="Check to turn ON Different Time Frame")
sell_rsi_candle_period       = input("3",  title="STOCH - Time Frame")
sell_rsi_overbought          = input(defval = 12 , title = "RSI Overbought",  minval=0)
sell_rsi_detector            = input("Signal Above Overbought", title="Detector", options=["Signal Below Overbought", "Cross Below Overbought", "Signal Above Overbought", "Cross Above Overbought"])
sell_rsi_use                 = input(false, title="Use RSI ? (On / Off)")

sell_stoch_sep                = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  STOCH  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_stoch_useDifferentRes    = input(false, title="Check to turn ON Different Time Frame")
sell_stoch_candle_period      = input("3",  title="STOCH - Time Frame")
sell_stoch_length_fk          = input(12,  minval=1, title="STOCH fast K")
sell_stoch_length_sk          = input(1,   minval=1, title="STOCH slow K")
sell_stoch_type_sk            = input("EMA", title="STOCH slow K", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
sell_stoch_length_sd          = input(1,   minval=1, title="STOCH slow D")
sell_stoch_type_sd            = input("EMA", title="STOCH slow D", options=["SMA", "EMA", "WMA", "DEMA", "TEMA", "TRIMA", "KAMA", "MAMA", "T3"])
sell_stoch_overbought         = input(defval = 10 , title = "STOCH Overbought Treashold",  minval=0)
sell_stoch_detector           = input("Signal Above Overbought", title="Detector", options=["Signal Above Overbought", "Cross Below Overbought", "Cross Above Overbought"])
sell_stoch_use                = input(false, title="Use STOCH ? (On / Off)")

sell_stochrsi_sep             = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  SRSI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_stochrsi_useDifferentRes = input(false, title="Check to turn ON Different Time Frame")
sell_stochrsi_candle_period   = input("3",  title="SRSI - Time Frame")
sell_stochrsi_len             = input(14,  minval=1, title="RSI length")
sell_stochrsi_stoch           = input(14,  minval=1, title="Time Period")
sell_stochrsi_length_fk       = input(3,  minval=1, title="Fast K")
sell_stochrsi_length_sd       = input(3,   minval=1, title="Slow D(or Fast)")
sell_stochrsi_overbought      = input(defval = 30 , title = "STOCHRSI Overbought Treashold",  minval=0)
sell_stochrsi_detector        = input("K Above Overbought", title="Detector", options=["K Cross Above D and Overbought", "K Cross Above D", "K Cross Above Overbought",
 "K Cross Below Overbought","K Below Overbought","K Above Overbought"])
sell_stochrsi_use             = input(false, title="Use STOCHRSI (On / Off)?")

sell_macd_sep                = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  MACD  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_macd_fast               = input(12,     title="MACD fast")
sell_macd_slow               = input(26,     title="MACD slow")
sell_macd_signal             = input(9,      title="MACD signal")
sell_macd_useDifferentRes    = input(false, title="Check to turn ON Different Time Frame")
sell_macd_candle_period      = input("3", title="MACD - Time Frame")
sell_macd_detector           = input("MACD Cross Below Signal", title="Detector", options=["MACD Cross Below Signal", "MACD Above Signal", "MACD Below Signal", 
 "MACD Above Treshold", "MACD Below Treshold", "Centerline Cross Upward", "Centerline Cross Downward"])
sell_macd_treshold           = input(defval = 0 , title = "Treshold", type = float)
sell_macd_use                = input(false, title="Use MACD (On / Off)?")

sell_cci_sep                 = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  CCI  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_cci_len                 = input(14,      title="CCI Length")
sell_cci_treshold            = input(100,     title="CCI Treshold")
sell_cci_useDifferentRes     = input(false, title="Check to turn ON Different Time Frame")
sell_cci_candle_period       = input("3",  title="CCI - Time Frame")
sell_cci_detector            = input("Signal Below Treshold", title="Detector", options=["Signal Cross Above Treshold", "Signal Above Treshold", "Signal Cross Below Treshold", "Signal Below Treshold"])
sell_cci_use                 = input(false, title="Use CCI (On / Off)?")

sell_vwap_sep                = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻  VWAP  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_vwap_useRes             = input(false, title="Check to turn ON Different Time Frame")
sell_vwap_candle_period      = input("5", title="VWAP - Time Frame")
sell_vwap_detector           = input("Price Above", title="Detector", options=["Price Cross Above","Price Above","Price Cross Below","Price Below"])
sell_vwap_use                = input(false, title="Use VWAP (On / Off)?")

sell_pc_sep                  = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻Perc.Chan.⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
sell_pc_change               = input(2,  type=float,    title="Rise Percent")
sell_pc_useDifferentRes      = input(false, title="Check to turn ON Different Time Frame")
sell_pc_candle_period        = input("3",  title="Percent Change - Time Frame")
sell_pc_use                  = input(false, title="Use Percent Change (On / Off)?")
strat1_sep                   = input(false, title="▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔" )
strat2_sep                   = input(false, title="******** STRATEGY SETTINGS ********")

///////////////////////////////////////////////
// GLOBAL FUNCTIONS
///////////////////////////////////////////////

kama(src, len)=>
    xvnoise = abs(src - src[1])
    nfastend = 0.666
    nslowend = 0.0645
    nsignal = abs(src - src[len])
    nnoise = sum(xvnoise, len)
    nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
    nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2)
    nAMA = 0.0
    nAMA := nz(nAMA[1]) + nsmooth * (src - nz(nAMA[1]))

mama(src, len)=>
    fl=0.5
    sl=0.05
    pi = 3.1415926
    sp = (4*src + 3*src[1] + 2*src[2] + src[3]) / 10.0
    p  = 0.0
    i2 = 0.0
    q2 = 0.0
    dt = (.0962*sp + .5769*nz(sp[2]) - .5769*nz(sp[4])- .0962*nz(sp[6]))*(.075*nz(p[1]) + .54)
    q1 = (.0962*dt + .5769*nz(dt[2]) - .5769*nz(dt[4])- .0962*nz(dt[6]))*(.075*nz(p[1]) + .54)
    i1 = nz(dt[3])
    jI = (.0962*i1 + .5769*nz(i1[2]) - .5769*nz(i1[4])- .0962*nz(i1[6]))*(.075*nz(p[1]) + .54)
    jq = (.0962*q1 + .5769*nz(q1[2]) - .5769*nz(q1[4])- .0962*nz(q1[6]))*(.075*nz(p[1]) + .54)
    i2_ = i1 - jq
    q2_ = q1 + jI
    i2 := .2*i2_ + .8*nz(i2[1])
    q2 := .2*q2_ + .8*nz(q2[1])
    re_ = i2*nz(i2[1]) + q2*nz(q2[1])
    im_ = i2*nz(q2[1]) - q2*nz(i2[1])
    re = 0.0
    im = 0.0
    re := .2*re_ + .8*nz(re[1])
    im := .2*im_ + .8*nz(im[1])
    p1 = iff(im!=0 and re!=0, 2*pi/atan(im/re), nz(p[1]))
    p2 = iff(p1 > 1.5*nz(p1[1]), 1.5*nz(p1[1]), iff(p1 < 0.67*nz(p1[1]), 0.67*nz(p1[1]), p1))
    p3 = iff(p2<6, 6, iff (p2 > 50, 50, p2))
    p := .2*p3 + .8*nz(p3[1])
    spp  = 0.0
    spp := .33*p + .67*nz(spp[1])
    phase = 180/pi * atan(q1 / i1)
    dphase_ = nz(phase[1]) - phase
    dphase = iff(dphase_< 1, 1, dphase_)
    alpha_ = fl / dphase
    alpha = iff(alpha_ < sl, sl, iff(alpha_ > fl, fl, alpha_))
    mama = 0.0
    mama := alpha*src + (1 - alpha)*nz(mama[1])
    
t3(src, len)=>
    xe1_1 = ema(src,    len)
    xe2_1 = ema(xe1_1,  len)
    xe3_1 = ema(xe2_1,  len)
    xe4_1 = ema(xe3_1,  len)
    xe5_1 = ema(xe4_1,  len)
    xe6_1 = ema(xe5_1,  len)
    b_1 = 0.7
    c1_1 = -b_1*b_1*b_1
    c2_1 = 3*b_1*b_1+3*b_1*b_1*b_1
    c3_1 = -6*b_1*b_1-3*b_1-3*b_1*b_1*b_1
    c4_1 = 1+3*b_1+b_1*b_1*b_1+3*b_1*b_1
    nT3Average_1 = c1_1 * xe6_1 + c2_1 * xe5_1 + c3_1 * xe4_1 + c4_1 * xe3_1

variant(type, src, len) =>
    v1 = sma(src, len)                                                  // Simple
    v2 = ema(src, len)                                                  // Exponential
    v3 = 2 * v2 - ema(v2, len)                                          // Double Exponential
    v4 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential
    v5 = wma(src, len)                                                  // Weighted
    v6 = sma(sma(src, ceil(len / 2)), floor(len / 2) + 1)               // TRIMA
    v7 = kama(src, len)                                                 // KAMA
    v8 = mama(src, len)                                                 // MAMA
    v9 = t3(src, len)                                                   // T3
    type=="EMA"?v2 : type=="DEMA"?v3 : type=="TEMA"?v4 : type=="WMA"?v5 : type=="TRIMA"?v6 : type=="KAMA"?v7 : type=="MAMA"?v8 : type=="T3"?v9 : v1
    
calc_cci(src, len, res) => 
    cci_ma     = sma(src, len)
    cci        = (src - cci_ma) / (0.015 * dev(src, len))
    cci_res    = request.security(syminfo.tickerid, res, cci)

calc_macd(macd_fast, macd_slow, src, res) => 
    macd       = ema(src, macd_fast) - ema(src, macd_slow)
    res_macd   = request.security(syminfo.tickerid, res, macd)    

///////////////////////////////////////////////
// BUY STRATEGIES LOGIC
///////////////////////////////////////////////

//RSI
rsi     = rsi(source_main, rsi_length)
per_rsi = rsi_useDifferentRes?request.security(syminfo.tickerid, rsi_candle_period, rsi):rsi

rsiBelow       = false
rsiCrossBelow  = false
rsiCrossAbove  = false
rsiAbove       = false

rsiBelow      := per_rsi<rsi_oversold
rsiCrossBelow := crossunder(per_rsi, rsi_oversold)
rsiCrossAbove := crossover(per_rsi, rsi_oversold)
rsiAbove      := per_rsi>rsi_oversold

rsiBuy = rsi_use ? (
 rsi_detector=="Signal Below Oversold"?rsiBelow:
 rsi_detector=="Cross Below Oversold"?rsiCrossBelow:
 rsi_detector=="Cross Above Oversold"?rsiCrossAbove:
 rsi_detector=="Signal Above Oversold"?rsiAbove:
 false ) : true

//STOCH
stoch_k = variant(stoch_type_sk, stoch(source_main, high, low, stoch_length_fk), stoch_length_sk)
stoch_d = variant(stoch_type_sd, stoch_k, stoch_length_sd)
per_stoch_k = stoch_useDifferentRes?request.security(syminfo.tickerid, stoch_candle_period, stoch_k):stoch_k
per_stoch_d = stoch_useDifferentRes?request.security(syminfo.tickerid, stoch_candle_period, stoch_d):stoch_d

stochBelow       = false
stochCrossBelow  = false
stochCrossAbove  = false

stochBelow      := per_stoch_k<stoch_oversold
stochCrossBelow := crossunder(per_stoch_k, stoch_oversold)
stochCrossAbove := crossover(per_stoch_k, stoch_oversold)

stochBuy = stoch_use ? (
 stoch_detector=="Signal Below Oversold"?stochBelow:
 stoch_detector=="Cross Below Oversold"?stochCrossBelow:
 stoch_detector=="Cross Above Oversold"?stochCrossAbove: 
 false ) : true

//STOCHRSI
stochrsi_rsi     = rsi(source_main, stochrsi_len)
stochrsi_stoch_k = sma(stoch(stochrsi_rsi, stochrsi_rsi, stochrsi_rsi, stochrsi_stoch), stochrsi_length_fk)
stochrsi_stoch_d = sma(stochrsi_stoch_k, stochrsi_length_sd)
per_stochrsi_k   = stochrsi_useDifferentRes?request.security(syminfo.tickerid, stochrsi_candle_period, stochrsi_stoch_k):stochrsi_stoch_k
per_stochrsi_d   = stochrsi_useDifferentRes?request.security(syminfo.tickerid, stochrsi_candle_period, stochrsi_stoch_d):stochrsi_stoch_d

stochrsiKDCrossOversold     = false
stochrsiKDCross             = false
stochrsiKCrossAboveOversold = false
stochrsiKCrossBelowOversold = false
stochrsiKBelowOversold      = false
stochrsiKAboveOversold      = false

stochrsiKDCrossOversold     := crossover(per_stochrsi_k, per_stochrsi_d) and per_stochrsi_k<stochrsi_oversold
stochrsiKDCross             := crossover(per_stochrsi_k, per_stochrsi_d)
stochrsiKCrossAboveOversold := crossover(per_stochrsi_k, stochrsi_oversold)
stochrsiKCrossBelowOversold := crossunder(per_stochrsi_k, stochrsi_oversold)
stochrsiKBelowOversold      := per_stochrsi_k<stochrsi_oversold
stochrsiKAboveOversold      := per_stochrsi_k>stochrsi_oversold

stochrsiBuy = stochrsi_use ? (
 stochrsi_detector=="K Cross Above D and Oversold"?stochrsiKDCrossOversold:
 stochrsi_detector=="K Cross Above D"?stochrsiKDCross:
 stochrsi_detector=="K Cross Above Oversold"?stochrsiKCrossAboveOversold:
 stochrsi_detector=="K Cross Below Oversold"?stochrsiKCrossBelowOversold:
 stochrsi_detector=="K Below Oversold"?stochrsiKBelowOversold:
 stochrsi_detector=="K Above Oversold"?stochrsiKAboveOversold: 
 false ) : true

//CCI
per_cci = calc_cci(hlc3, cci_len, cci_candle_period)

cciBelow      = false
cciCrossBelow = false
cciCrossAbove = false
cciAbove      = false

cciBelow      := per_cci<cci_treshold
cciCrossBelow := crossover(per_cci, cci_treshold)
cciCrossAbove := crossunder(cci_treshold, per_cci)
cciAbove      := per_cci>cci_treshold

cciBuy  = cci_use ? (
 cci_detector=="Signal Below Treshold"?cciBelow:
 cci_detector=="Signal Cross Belove Treshold"?cciCrossBelow:
 cci_detector=="Signal Cross Above Treshold"?cciCrossAbove:
 cci_detector=="Signal Above Treshold"?cciAbove:
 false ) : true 

//MACD
fastMA  = ema(source_main, macd_fast)
slowMA  = ema(source_main, macd_slow)
macd    = fastMA - slowMA
signal  = sma(macd, macd_signal)
delta   = macd - signal

outmacd   = request.security(syminfo.tickerid, macd_candle_period, macd)
outsignal = request.security(syminfo.tickerid, macd_candle_period, signal)
outdelta  = request.security(syminfo.tickerid, macd_candle_period, delta)

plot_macd   = macd_useDifferentRes?outmacd:macd
plot_signal = macd_useDifferentRes?outsignal:signal
plot_delta  = macd_useDifferentRes?outdelta:delta

MACDCrossAboveSignal = false
CenterlineCrossUpwards = false
CenterlineCrossDownwards = false
MACDAboveSignal = false
MACDBelowSignal = false
MACDAboveTreshold = false
MACDBelowTreshold = false

MACDCrossAboveSignal     := crossunder(plot_signal, plot_macd)
CenterlineCrossUpwards   := crossover(plot_delta, 0)
CenterlineCrossDownwards := crossunder(plot_delta, 0)
MACDAboveSignal          := plot_macd > plot_signal
MACDBelowSignal          := plot_macd < plot_signal
MACDAboveTreshold        := plot_macd > macd_treshold
MACDBelowTreshold        := plot_macd < macd_treshold

macdBuy=macd_use ? (
 macd_detector=="MACD Cross Above Signal"?MACDCrossAboveSignal:
 macd_detector=="Centerline Cross Upwards"?CenterlineCrossUpwards:
 macd_detector=="Centerline Cross Downwards"?CenterlineCrossDownwards:
 macd_detector=="MACD above Signal"?MACDAboveSignal:
 macd_detector=="MACD below Signal"?MACDBelowSignal:
 macd_detector=="MACD above Treshold"?MACDAboveTreshold:
 macd_detector=="MACD below Treshold"?MACDBelowTreshold:
 false ) : true

//BB
bb_basis     = variant(bb_type, source_main, bb_length)
bb_dev       = bb_std * stdev(source_main, bb_length)
bb_upper     = bb_basis + bb_dev
bb_lower     = bb_basis - bb_dev
per_lower_bb = bb_useDifferentRes?request.security(syminfo.tickerid, bb_candle_period, bb_lower):bb_lower
per_upper_bb = bb_useDifferentRes?request.security(syminfo.tickerid, bb_candle_period, bb_upper):bb_upper
per_bb_basis = bb_useDifferentRes?request.security(syminfo.tickerid, bb_candle_period, bb_basis):bb_basis

bbBelow      = false
bbCrossBelow = false
bbCrossAbove = false
bbAbove      = false

bbBelow      := per_lower_bb>close or per_lower_bb>low
bbAbove      := per_lower_bb<high  or per_lower_bb<close
bbCrossAbove := crossover(source_main, per_lower_bb)
bbCrossBelow := crossunder(source_main, per_lower_bb)

bbBuy = stochrsi_use ? (
 bb_detector=="Price Cross Below"?bbCrossBelow:
 bb_detector=="Price Below"?bbBelow:
 bb_detector=="Price Cross Above"?bbCrossAbove:
 bb_detector=="Price Above"?bbAbove:false ) : true

plot(per_bb_basis,  color=green, linewidth=2)
p1 = plot(per_upper_bb, color=green)
p2 = plot(per_lower_bb, color=green)
fill(p1, p2)

//MA Calculation 
ma_short     = variant(ma_type, source_main, ma_length_short)
ma_long      = variant(ma_type, source_main, ma_length_long)
per_ma_short = ma_useRes?request.security(syminfo.tickerid, ma_candle_period, ma_short):ma_short
per_ma_long  = ma_useRes?request.security(syminfo.tickerid, ma_candle_period, ma_long ):ma_long 

p1ma = plot(ma_use?per_ma_short:na, color=green)
p2ma = plot(ma_use?per_ma_long:na , color=red)

ShortCrossesAboveLong  = false
ShortAboveLong         = false
PriceCrossesAboveShort = false
PriceAboveShort        = false
PriceCrossesAboveLong  = false
PriceAboveLong         = false
PriceAboveBoth         = false
PriceBelowBoth         = false

ShortCrossesAboveLong  := crossover(per_ma_short, per_ma_long)
ShortAboveLong         := per_ma_short > per_ma_long
PriceCrossesAboveShort := ( close > per_ma_short or high > per_ma_short ) and low < per_ma_short
PriceAboveShort        := close > per_ma_short or high > per_ma_short 
PriceCrossesAboveLong  := ( close > per_ma_long or high > per_ma_long ) and low < per_ma_long
PriceAboveLong         := close > per_ma_long or high > per_ma_long
PriceAboveBoth         := ( close > per_ma_long or high > per_ma_long ) and (close > per_ma_short or high > per_ma_short )
PriceBelowBoth         := ( close < per_ma_long or low < per_ma_long ) and (close < per_ma_short or low < per_ma_short )        

maBuy = ma_use ? ( ma_detector=="Short Crosses Above Long"?ShortCrossesAboveLong:
 ma_detector=="Short Above Long"?ShortAboveLong:
 ma_detector=="Price Cross Above Short"?PriceCrossesAboveShort:
 ma_detector=="Price Above Short"?PriceAboveShort:
 ma_detector=="Price Crosses Above Long"?PriceCrossesAboveLong:
 ma_detector=="Price Above Long"?PriceAboveLong:
 ma_detector=="Price Above Both"?PriceAboveBoth:
 ma_detector=="Price Below Both"?PriceBelowBoth:
 false ) : true

//VWAP
var_vwap = vwap(hlc3)
per_vwap = vwap_useRes?request.security(syminfo.tickerid,vwap_candle_period,var_vwap):var_vwap

PriceCrossAbove = false
PriceAbove      = false
PriceCrossBelow = false
PriceBelow      = false

PriceCrossAbove := ( close > per_vwap or high > per_vwap ) and low < per_vwap
PriceAbove      := close > per_vwap or high > per_vwap
PriceCrossBelow := ( close < per_vwap or low < per_vwap ) and high > per_vwap
PriceBelow      := close < per_vwap or low < per_vwap

vwapBuy  = false
vwapBuy := vwap_use ?( 
 vwap_detector=="Price Cross Above"?PriceCrossAbove:
 vwap_detector=="Price Above"?PriceAbove:
 vwap_detector=="Price Cross Below"?PriceCrossBelow:
 vwap_detector=="Price Below"?PriceBelow:false ) : true

//PC
price_change      = (close - close[1])/close[1]*100
per_price_change  = pc_useDifferentRes?request.security(syminfo.tickerid, pc_candle_period, price_change):price_change 

pcBuy = false
pcBuy := pc_use ? ( per_price_change < pc_change ) : true

///////////////////////////////////////////////
// SELL STRATEGIES LOGIC
///////////////////////////////////////////////

//SELL RSI
sell_rsi     = rsi(source_main, sell_rsi_length)
sell_per_rsi = sell_rsi_useDifferentRes?request.security(syminfo.tickerid, sell_rsi_candle_period, sell_rsi):sell_rsi

sell_rsiBelow       = false
sell_rsiCrossBelow  = false
sell_rsiCrossAbove  = false
sell_rsiAbove       = false

sell_rsiBelow      := sell_per_rsi<sell_rsi_overbought
sell_rsiCrossBelow := crossunder(sell_per_rsi, sell_rsi_overbought)
sell_rsiCrossAbove := crossover(sell_per_rsi, sell_rsi_overbought)
sell_rsiAbove      := sell_per_rsi>sell_rsi_overbought

sell_rsiBuy = sell_rsi_use ? (
 sell_rsi_detector=="Signal Below Overbought"?sell_rsiBelow:
 sell_rsi_detector=="Cross Below Overbought"?sell_rsiCrossBelow:
 sell_rsi_detector=="Cross Above Overbought"?sell_rsiCrossAbove:
 sell_rsi_detector=="Signal Above Overbought"?sell_rsiAbove:
 false ) : true

//SELL STOCH
sell_stoch_k = variant(sell_stoch_type_sk, stoch(source_main, high, low, sell_stoch_length_fk), sell_stoch_length_sk)
sell_stoch_d = variant(sell_stoch_type_sd, sell_stoch_k, sell_stoch_length_sd)
sell_per_stoch_k = sell_stoch_useDifferentRes?request.security(syminfo.tickerid, sell_stoch_candle_period, sell_stoch_k):sell_stoch_k
sell_per_stoch_d = sell_stoch_useDifferentRes?request.security(syminfo.tickerid, sell_stoch_candle_period, sell_stoch_d):sell_stoch_d

sell_stochAbove       = false
sell_stochBelow       = false
sell_stochCrossAbove  = false

sell_stochAbove      := sell_per_stoch_k>sell_stoch_overbought
sell_stochBelow      := sell_per_stoch_k<sell_stoch_overbought
sell_stochCrossAbove := crossover(sell_per_stoch_k, sell_stoch_overbought)

sell_stochBuy = sell_stoch_use ? (
 sell_stoch_detector=="Signal Above Overbought"?sell_stochAbove:
 sell_stoch_detector=="Signal Below Overbought"?sell_stochBelow:
 sell_stoch_detector=="Cross Above Overbought"?sell_stochCrossAbove: 
 false ) : true

//SELL STOCHRSI
sell_stochrsi_rsi     = rsi(source_main, sell_stochrsi_len)
sell_stochrsi_stoch_k = sma(stoch(sell_stochrsi_rsi, sell_stochrsi_rsi, sell_stochrsi_rsi, sell_stochrsi_stoch), sell_stochrsi_length_fk)
sell_stochrsi_stoch_d = sma(sell_stochrsi_stoch_k, sell_stochrsi_length_sd)
sell_per_stochrsi_k   = sell_stochrsi_useDifferentRes?request.security(syminfo.tickerid, sell_stochrsi_candle_period, sell_stochrsi_stoch_k):sell_stochrsi_stoch_k
sell_per_stochrsi_d   = sell_stochrsi_useDifferentRes?request.security(syminfo.tickerid, sell_stochrsi_candle_period, sell_stochrsi_stoch_d):sell_stochrsi_stoch_d

sell_stochrsiKDCrossOverbought     = false
sell_stochrsiKDCross               = false
sell_stochrsiKCrossAboveOverbought = false
sell_stochrsiKCrossBelowOverbought = false
sell_stochrsiKBelowOverbought      = false
sell_stochrsiKAboveOverbought      = false

sell_stochrsiKDCrossOverbought     := crossover(sell_per_stochrsi_k, sell_per_stochrsi_d) and sell_per_stochrsi_k>sell_stochrsi_overbought
sell_stochrsiKDCross               := crossover(sell_per_stochrsi_k, sell_per_stochrsi_d)
sell_stochrsiKCrossAboveOverbought := crossover(sell_per_stochrsi_k, sell_stochrsi_overbought)
sell_stochrsiKCrossBelowOverbought := crossunder(sell_per_stochrsi_k, sell_stochrsi_overbought)
sell_stochrsiKBelowOverbought      := sell_per_stochrsi_k<sell_stochrsi_overbought
sell_stochrsiKAboveOverbought      := sell_per_stochrsi_k>sell_stochrsi_overbought

sell_stochrsiBuy = sell_stochrsi_use ? (
 sell_stochrsi_detector=="K Cross Below D and Overbought"?sell_stochrsiKDCrossOverbought:
 sell_stochrsi_detector=="K Cross Below D"?sell_stochrsiKDCross:
 sell_stochrsi_detector=="K Cross Above Overbought"?sell_stochrsiKCrossAboveOverbought:
 sell_stochrsi_detector=="K Cross Below Overbought"?sell_stochrsiKCrossBelowOverbought:
 sell_stochrsi_detector=="K Below Overbought"?sell_stochrsiKBelowOverbought:
 sell_stochrsi_detector=="K Above Overbought"?sell_stochrsiKAboveOverbought: 
 false ) : true

//SELL CCI
sell_per_cci = calc_cci(hlc3, sell_cci_len, sell_cci_candle_period)

sell_cciBelow      = false
sell_cciCrossBelow = false
sell_cciCrossAbove = false
sell_cciAbove      = false

sell_cciBelow      := sell_per_cci<sell_cci_treshold
sell_cciCrossBelow := crossunder(sell_per_cci, sell_cci_treshold)
sell_cciCrossAbove := crossover(sell_cci_treshold, sell_per_cci)
sell_cciAbove      := sell_per_cci>sell_cci_treshold

sell_cciBuy  = sell_cci_use ? (
 sell_cci_detector=="Signal Below Treshold"?sell_cciBelow:
 sell_cci_detector=="Signal Cross Belove Treshold"?sell_cciCrossBelow:
 sell_cci_detector=="Signal Cross Above Treshold"?sell_cciCrossAbove:
 sell_cci_detector=="Signal Above Treshold"?sell_cciAbove:
 false ) : true 

//SELL MACD
sell_fastMA  = ema(close, sell_macd_fast)
sell_slowMA  = ema(close, sell_macd_slow)
sell_macd    = sell_fastMA - sell_slowMA
sell_signal  = sma(sell_macd, sell_macd_signal)
sell_delta   = sell_macd - sell_signal

sell_outmacd   = request.security(syminfo.tickerid, sell_macd_candle_period, sell_macd)
sell_outsignal = request.security(syminfo.tickerid, sell_macd_candle_period, sell_signal)
sell_outdelta  = request.security(syminfo.tickerid, sell_macd_candle_period, sell_delta)

sell_plot_macd   = sell_macd_useDifferentRes?sell_outmacd:sell_macd
sell_plot_signal = sell_macd_useDifferentRes?sell_outsignal:sell_signal
sell_plot_delta  = sell_macd_useDifferentRes?sell_outdelta:sell_delta

sell_MACDCrossBelowSignal = false
sell_CenterlineCrossUpwards = false
sell_CenterlineCrossDownwards = false
sell_MACDAboveSignal = false
sell_MACDBelowSignal = false
sell_MACDAboveTreshold = false
sell_MACDBelowTreshold = false

sell_MACDCrossBelowSignal     := crossover(sell_plot_signal, sell_plot_macd)
sell_CenterlineCrossUpwards   := crossover(sell_plot_delta, 0.0)
sell_CenterlineCrossDownwards := crossunder(sell_plot_delta, 0.0)
sell_MACDAboveSignal          := sell_plot_macd > sell_plot_signal
sell_MACDBelowSignal          := sell_plot_macd < sell_plot_signal
sell_MACDAboveTreshold        := sell_plot_macd > sell_macd_treshold
sell_MACDBelowTreshold        := sell_plot_macd < sell_macd_treshold

sell_macdBuy=sell_macd_use ? (
 sell_macd_detector=="MACD Cross Below Signal"?sell_MACDCrossBelowSignal:
 sell_macd_detector=="Centerline Cross Upwards"?sell_CenterlineCrossUpwards:
 sell_macd_detector=="Centerline Cross Downwards"?sell_CenterlineCrossDownwards:
 sell_macd_detector=="MACD above Signal"?sell_MACDAboveSignal:
 sell_macd_detector=="MACD below Signal"?sell_MACDBelowSignal:
 sell_macd_detector=="MACD above Treshold"?sell_MACDAboveTreshold:
 sell_macd_detector=="MACD below Treshold"?sell_MACDBelowTreshold:
 false ) : true

//SELL BB
sell_bb_basis     = variant(bb_type, source_main, sell_bb_length)
sell_bb_dev       = sell_bb_std * stdev(source_main, sell_bb_length)
sell_bb_upper     = sell_bb_basis + sell_bb_dev
sell_bb_lower     = sell_bb_basis - sell_bb_dev
sell_per_lower_bb = sell_bb_useDifferentRes?request.security(syminfo.tickerid, sell_bb_candle_period, sell_bb_lower):sell_bb_lower
sell_per_upper_bb = sell_bb_useDifferentRes?request.security(syminfo.tickerid, sell_bb_candle_period, sell_bb_upper):sell_bb_upper
sell_per_bb_basis = sell_bb_useDifferentRes?request.security(syminfo.tickerid, sell_bb_candle_period, sell_bb_basis):sell_bb_basis

sell_bbBelow      = false
sell_bbCrossBelow = false
sell_bbCrossAbove = false
sell_bbAbove      = false

sell_bbBelow      := sell_per_upper_bb>close or sell_per_upper_bb>low
sell_bbAbove      := sell_per_upper_bb<high  or sell_per_upper_bb<close
sell_bbCrossAbove := crossover(source_main, sell_per_upper_bb)
sell_bbCrossBelow := crossunder(source_main, sell_per_upper_bb)

sell_bbBuy = sell_bb_use ? (
 sell_bb_detector=="Price Cross Below"?sell_bbCrossBelow:
 sell_bb_detector=="Price Below"?sell_bbBelow:
 sell_bb_detector=="Price Cross Above"?sell_bbCrossAbove:
 sell_bb_detector=="Price Above"?sell_bbAbove:false ) : true

//SELL MA Calculation 
sell_ma_short     = variant(sell_ma_type, source_main, sell_ma_length_short)
sell_ma_long      = variant(sell_ma_type, source_main, sell_ma_length_long)
sell_per_ma_short = sell_ma_useRes?request.security(syminfo.tickerid, sell_ma_candle_period, sell_ma_short):sell_ma_short
sell_per_ma_long  = sell_ma_useRes?request.security(syminfo.tickerid, sell_ma_candle_period, sell_ma_long ):sell_ma_long 

sell_p1ma = plot(sell_ma_use?sell_per_ma_short:na, color=green)
sell_p2ma = plot(sell_ma_use?sell_per_ma_long:na , color=red)

sell_ShortCrossesBelowLong   = false
sell_ShortBelowLong          = false
sell_ShortAboveLong          = false
sell_PriceCrossesBelowShort  = false
sell_PriceBelowShort         = false
sell_PriceCrossesBelowLong   = false
sell_PriceBelowLong          = false
sell_PriceAboveBoth          = false
sell_PriceBelowBoth          = false

sell_ShortCrossesBelowLong  := crossunder(sell_per_ma_short, sell_per_ma_long)
sell_ShortBelowLong         := sell_per_ma_short < sell_per_ma_long
sell_ShortAboveLong         := sell_per_ma_short > sell_per_ma_long
sell_PriceCrossesBelowShort := ( close > sell_per_ma_short or high > sell_per_ma_short ) and low < sell_per_ma_short
sell_PriceBelowShort        := close > sell_per_ma_short or high > sell_per_ma_short 
sell_PriceCrossesBelowLong  := ( close > sell_per_ma_long or high > sell_per_ma_long ) and low < sell_per_ma_long
sell_PriceBelowLong         := close > sell_per_ma_long or high > sell_per_ma_long
sell_PriceAboveBoth         := ( close > sell_per_ma_long or high > sell_per_ma_long ) and (close > sell_per_ma_short or high > sell_per_ma_short )
sell_PriceBelowBoth         := ( close < sell_per_ma_long or low < sell_per_ma_long ) and (close < sell_per_ma_short or low < sell_per_ma_short )        

sell_maBuy = sell_ma_use ? ( 
 sell_ma_detector=="Short Crosses Below Long"?sell_ShortCrossesBelowLong:
 sell_ma_detector=="Short Below Long"?sell_ShortBelowLong :
 sell_ma_detector=="Price Cross Below Short"?sell_PriceCrossesBelowShort:
 sell_ma_detector=="Price Below Short"?sell_PriceBelowShort:
 sell_ma_detector=="Price Cross Below Long"?sell_PriceBelowShort:
 sell_ma_detector=="Price Below Long"?sell_PriceCrossesBelowLong: 
 sell_ma_detector=="Price Above Both"?sell_PriceAboveBoth:
 sell_ma_detector=="Price Below Both"?sell_PriceBelowBoth:
 false ) : true

//SELL VWAP
sell_var_vwap = vwap(hlc3)
sell_per_vwap = sell_vwap_useRes?request.security(syminfo.tickerid,sell_vwap_candle_period,sell_var_vwap):sell_var_vwap

sell_PriceCrossAbove = false
sell_PriceAbove      = false
sell_PriceCrossBelow = false
sell_PriceBelow      = false

sell_PriceCrossAbove := ( close > sell_per_vwap or high > sell_per_vwap ) and low < sell_per_vwap
sell_PriceAbove      := close > sell_per_vwap or high > sell_per_vwap
sell_PriceCrossBelow := ( close < sell_per_vwap or low < sell_per_vwap ) and high > sell_per_vwap
sell_PriceBelow      := close < sell_per_vwap or low < sell_per_vwap

sell_vwapBuy  = false
sell_vwapBuy := sell_vwap_use ?( 
 sell_vwap_detector=="Price Cross Above"?sell_PriceCrossAbove:
 sell_vwap_detector=="Price Above"?sell_PriceAbove:
 sell_vwap_detector=="Price Cross Below"?sell_PriceCrossBelow:
 sell_vwap_detector=="Price Below"?sell_PriceBelow:false ) : true

//PC
sell_price_change      = (close - close[1])/close[1]*100
sell_per_price_change  = sell_pc_useDifferentRes?request.security(syminfo.tickerid, sell_pc_candle_period, sell_price_change):sell_price_change 

sell_pcBuy = false
sell_pcBuy := sell_pc_use ? ( sell_per_price_change > sell_pc_change ) : true

///////////////////////////////////////////////
// MAIN LOGIC
///////////////////////////////////////////////
allBuy = false
allBuy := rsiBuy and bbBuy and stochBuy and stochrsiBuy and cciBuy and macdBuy and maBuy and vwapBuy and pcBuy

allSell = false
allSell := sell_rsiBuy and sell_bbBuy and sell_stochBuy and sell_stochrsiBuy and sell_cciBuy and sell_macdBuy and sell_maBuy and sell_vwapBuy and sell_pcBuy

buy  = allBuy
sell = (
 sell_pc_use?sell_pcBuy:false or
 sell_vwap_use?sell_vwapBuy:false or 
 sell_rsi_use?sell_rsiBuy:false or
 sell_ma_use?sell_maBuy:false or
 sell_bb_use?sell_bbBuy:false or
 sell_cci_use?sell_cciBuy:false or
 sell_macd_use?sell_macdBuy:false or
 sell_stoch_use?sell_stochBuy:false or
 sell_stochrsi_use?sell_stochrsiBuy:false ) ? true : false

//////////////////////////////////////////////////////////////////////////////////////////
//*** This Trade Management Section of code is a modified version of that found in   ***//
//*** "How to automate this strategy for free using a chrome extension" by CryptoRox ***//
//*** Modifications and tradeState engine by JustUncleL.                             ***// 
//////////////////////////////////////////////////////////////////////////////////////////
//

///////////////////////////////////////////////
//* Backtesting Period Selector | Component *//
///////////////////////////////////////////////

// * https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
// * https://www.tradingview.com/u/pbergden/ *//
// * Modifications made by JustUncleL*//

testStartYear = input(2018, "Backtest Start Year",minval=1980)
testStartMonth = input(9, "Backtest Start Month",minval=1,maxval=12)
testStartDay = input(20, "Backtest Start Day",minval=1,maxval=31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = 9999 //input(9999, "Backtest Stop Year",minval=1980)
testStopMonth = 12 // input(12, "Backtest Stop Month",minval=1,maxval=12)
testStopDay = 31 //input(31, "Backtest Stop Day",minval=1,maxval=31)
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => time >= testPeriodStart and time <= testPeriodStop ? true : false

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
sl       = input(2.0, "Stop Loss (%)", minval=0,step=0.1, type=float) / 100
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

// //LONGS
// plotshape(longCondition?close:na, title="Buy", color=green, textcolor=green, transp=0, 
//           style=shape.triangleup, location=location.belowbar, size=size.small,text="Buy",offset=0)
// plotshape(longClose?close:na,    title="Sell", color=longCloseCol, textcolor=white, transp=0, 
//           style=shape.labeldown, location=location.abovebar, size=size.small,text="Sell",offset=0)
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
//alertcondition(longCondition, "Open Long", "LONG")
//alertcondition(shortCondition, "Open Short", "SHORT")

// For the closes you will want to trigger these alerts on condition with alert option "Once Per Bar"
// (NOTE: with Renko you can only use "Once Per Bar Close" option)
//      b=sell q=99% e=binance s=ethbtc t=market  ( CLOSE LONGS )
// or   b=buy q=99% e=binance s=btcusdt  u=currency t=market  ( CLOSE SHORTS )
// This gets it as it happens and typically results in a better exit live than in the backtest. 
// It works really well for counteracting some market slippage
//alertcondition(longClose, "Close Longs", "CLOSE LONGS")
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

//-- SUPPORT/RESISTANCE LINES    by:ByDipsOnly ----------------------------------------------------------------------------- 
sr_sep             = input(false, title="⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻ S/R Lines  ⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻⎻")
show_SPlines_input = input(true, "Show S/R Lines")
tf = timeframe.period

vamp = input(title="VolumeMA",  defval=6)
vam = sma(volume, vamp)

upside = high[3]>high[4] and high[4]>high[5] and high[2]<high[3] and high[1]<high[2] and volume[3]>vam[3]
downside = low[3]<low[4] and low[4]<low[5] and low[2]>low[3] and low[1]>low[2] and volume[3]>vam[3]


calcup() =>
    fractalup = na
    fractalup := upside ? high[3] : fractalup[1]

calcdown() =>
    fractaldown = na
    fractaldown := downside ? low[3] : fractaldown[1]

fuptf = request.security(syminfo.tickerid,tf == "current" ? timeframe.period : tf, calcup())
fdowntf = request.security(syminfo.tickerid,tf == "current" ? timeframe.period : tf, calcdown())

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

https://www.fmz.com/strategy/435880

> Last Modified

2023-12-19 14:42:26
