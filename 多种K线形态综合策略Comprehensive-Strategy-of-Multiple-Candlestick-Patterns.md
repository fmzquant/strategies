
> Name

多种K线形态综合策略Comprehensive-Strategy-of-Multiple-Candlestick-Patterns

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/116a43c599c66fdbe4a.png)
[trans]
该策略的主要思想是同时检测多种常见的K线形态,包括锤头线、启明星线等[10]多种形态,当检测到这些形态时,判断为价格反转信号,做出相应的买入或者卖出操作。

### 策略原理

本策略主要基于以下原理:

1. 使用K线形态判断价格趋势和关键反转点。K线图能清晰显示价格的打开、收盘、最高和最低点,从中可以识别出许多重要的价格形态,判断价格趋势和关键的反转点。

2. 同时判断多种K线形态。任何单一的K线形态都可能存在误判,所以本策略综合判断多种K线形态,包括启明星、黄昏之星等10多种形态,提高判断的准确性。

3. 根据形态类型判断做多做空方向。判断出不同K线形态后,根据其代表的多空意义,产生相应的做多或者做空信号。

具体来说,本策略主要按以下流程运行:

1. 输入参数:首先输入一些判断K线形态的参数,如实体部分大小判断阈值、影线部分大小判断阈值等。

2. 趋势判断:计算不同周期的SMA,判断价格总体上处于上涨趋势还是下跌趋势,这对判断K线形态的意义非常重要。

3. K线形态扫描:扫描数据,判断是否出现上涨的K线形态(如启明星、锤头线等)或者下跌的K线形态(如黄昏之星、垂死十字等)。

4. 交易信号:当上涨形态出现时,产生做多信号;当下跌形态出现时,产生做空信号。

5. 持仓管理:设置止损位置,以控制风险。

### 策略优势

本策略主要有以下优势:

1. 利用K线形态判断价格关键点,判断准确;

2. 综合多种K线形态,提高判断准确性,减少误判概率;

3. 自动扫描形态,快速捕捉交易机会;

4. 可方便地根据形态参数进行优化,提高盈利能力。

### 策略风险

本策略也存在一些风险:

1. 单一K线形态判断存在误判风险,需要组合判断来减少;

2. 无法完全避免极端行情的剧烈波动带来的损失;

3. 需要优化输入参数,以取得最佳交易结果。

对策方法如下:

1. 采用多种K线形态的组合判断,降低误判概率;

2. 设置止损位置,严格控制单笔损失大小;

3. 详细测试不同参数对交易结果的影响,优化参数以减少损失,提高收益。

### 策略优化方向 

本策略主要可以从以下方向进行优化:

1. 增加或减少判断的K线形态种类。如果某些形态误判较多,可以删除;如果新增的形态判断效果良好,可以添加。

2. 优化K线形态的参数阈值。可以测试修改实体部分和影线部分的参数,找到最佳判断阈值。

3. 优化止损位置。可以测试不同的止损位置,找到最大限度减少单笔损失的最佳止损点。

4. 测试不同的趋势判断指标。可以尝试SMA、EMA等其他指标来判断价格趋势。

5. 增加参数组合优化功能。建立参数空间,自动测试不同参数组合的交易结果。

通过上述优化方向的改进,可以持续提高策略的交易业绩。

### 总结

本策略综合判断多种K线形态,自动扫描价格数据,利用不同形态判断价格趋势和关键反转点,通过做多做空操作获利。它反应灵敏,可以快速捕捉交易机会,自动化程度高,使用方便,是一种高效的量化交易策略。

本策略可以通过调整判断形态的种类和参数、优化止损点以及改进趋势判断指标等手段进一步提升策略业绩,是一种值得长期修改和使用的有效的量化策略。

||

The main idea of this strategy is to detect multiple common candlestick patterns simultaneously, including hammer, morning star and [10] other patterns. When these patterns are detected, it is judged as a price reversal signal to make corresponding buy or sell operations.

### Strategy Principle 

The main principles of this strategy are:

1. Use candlestick patterns to judge price trends and key reversal points. Candlestick charts can clearly display the open, close, highest and lowest prices, from which many important price patterns can be identified to judge price trends and key reversal points.

2. Judge multiple candlestick patterns simultaneously. Any single candlestick pattern may have misjudgements, so this strategy comprehensively judges more than 10 patterns including morning star, evening star, etc. to improve judgement accuracy.

3. Determine long and short directions based on pattern types. After identifying different candlestick patterns, corresponding long or short signals are generated according to their bullish or bearish implications. 

Specifically, this strategy mainly runs according to the following process:

1. Input parameters: First input some parameters to judge candlestick patterns, such as threshold values for the size of the real body and shadow.

2. Trend judgement: Calculate the SMAs of different cycles to judge whether the overall price is in an upward or downward trend, which is very important for interpreting the meaning of candlestick patterns.

3. Candlestick pattern scanning: Scan the data to determine whether bullish patterns (such as morning star, hammer, etc.) or bearish patterns (such as evening star, hanging man, etc.) appear.

4. Trading signals: When bullish patterns appear, long signals are generated; when bearish patterns appear, short signals are generated.

5. Position management: Set stop loss position to control risks.

### Strategy Advantages

The main advantages of this strategy are:

1. Accurately judge key price points using candlestick patterns;

2. Improve judgment accuracy and reduce misjudgements by combining multiple candlestick patterns; 

3. Automatically scan patterns and quickly capture trading opportunities;

4. Convenient to optimize parameters to improve profitability.

### Strategy Risks

There are also some risks with this strategy:

1. There are misjudgement risks with single candlestick patterns, requiring combination judgements to reduce;

2. Extreme market volatility that causes huge losses cannot be completely avoided;

3. Input parameters need to be optimized for the best trading results.

The countermeasures are:

1. Use combined judgements of multiple candlestick patterns to reduce misjudgement probability;

2. Set stop loss position to strictly control the size of single losses;  

3. Test impacts of different parameters on trading results comprehensively, and optimize parameters to reduce losses and increase returns.

### Strategy Optimization Directions

The main optimization directions for this strategy are:

1. Increase or reduce the types of candlestick patterns to judge. Patterns that have more misjudgements can be removed while patterns that are newly added and perform well can be kept.

2. Optimize the threshold values of candlestick pattern parameters. Test modifying the parameters for real body and shadow to find the optimal judgement threshold values.  

3. Optimize stop loss position. Test different stop loss positions to find the optimal point that maximally reduces single losses.

4. Test different indicators to judge price trends, such as SMA, EMA etc.

5. Add parameter combination optimization functions. Build parameter space to automatically test trading results under different parameter combinations.

Through the above optimization directions, the trading performance of the strategy can be continuously improved.

### Summary 

This strategy comprehensively judges multiple candlestick patterns, automatically scans price data, utilizes different patterns to judge price trends and key reversal points, and makes profits via long and short operations. It reacts sensitively and can quickly capture trading opportunities with high degree of automation. Easy to use, it is an efficient quantitative trading strategy.

This strategy can be further enhanced by adjusting determination patterns and parameters, optimizing stop loss points and improving trend determination indicators. It is an effective quantitative strategy worth continuous modifications and long term usage.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.015|Stop Loss|
|v_input_2|0|Detect Trend Based On: SMA50|SMA50, SMA200|No detection|
|v_input_3|0|Pattern Type: Both|Bearish|Bullish|
|v_input_4|true|Abandoned Baby|
|v_input_5|true|Dark Cloud Cover|
|v_input_6|true|Doji|
|v_input_7|true|Doji Star|
|v_input_8|true|Downside Tasuki Gap|
|v_input_9|true|Dragonfly Doji|
|v_input_10|true|Engulfing|
|v_input_11|true|Evening Doji Star|
|v_input_12|true|Evening Star|
|v_input_13|true|Falling Three Methods|
|v_input_14|true|Falling Window|
|v_input_15|true|Gravestone Doji|
|v_input_16|true|Hammer|
|v_input_17|true|Hanging Man|
|v_input_18|true|Harami Cross|
|v_input_19|true|Harami|
|v_input_20|true|Inverted Hammer|
|v_input_21|true|Kicking|
|v_input_22|false|Long Lower Shadow|
|v_input_23|false|Long Upper Shadow|
|v_input_24|true|Marubozu Black|
|v_input_25|true|Marubozu White|
|v_input_26|true|Morning Doji Star|
|v_input_27|true|Morning Star|
|v_input_28|true|On Neck|
|v_input_29|true|Piercing|
|v_input_30|true|Rising Three Methods|
|v_input_31|true|Rising Window|
|v_input_32|true|Shooting Star|
|v_input_33|false|Spinning Top Black|
|v_input_34|false|Spinning Top White|
|v_input_35|true|Three Black Crows|
|v_input_36|true|Three White Soldiers|
|v_input_37|true|Tri-Star|
|v_input_38|true|Tweezer Bottom|
|v_input_39|true|Tweezer Top|
|v_input_40|true|Upside Tasuki Gap|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-14 00:00:00
end: 2023-12-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(shorttitle="All Candlestick Patterns Strategy", title="All Candlestick Patterns Strategy", overlay=true, initial_capital=600)

//custom script
stopLoss = input(0.015, minval=0.0001, step=0.0025, title="Stop Loss"),

var _tradeDirection = ""

if (strategy.position_size != 0)
    _tradeDirection := ""
//custom script end

C_DownTrend = true
C_UpTrend = true
var trendRule1 = "SMA50"
var trendRule2 = "SMA50, SMA200"
var trendRule = input(trendRule1, "Detect Trend Based On", options=[trendRule1, trendRule2, "No detection"])

if trendRule == trendRule1
	priceAvg = sma(close, 50)
	C_DownTrend := close < priceAvg
	C_UpTrend := close > priceAvg

if trendRule == trendRule2
	sma200 = sma(close, 200)
	sma50 = sma(close, 50)
	C_DownTrend := close < sma50 and sma50 < sma200
	C_UpTrend := close > sma50 and sma50 > sma200
C_Len = 14 // ema depth for bodyAvg
C_ShadowPercent = 5.0 // size of shadows
C_ShadowEqualsPercent = 100.0
C_DojiBodyPercent = 5.0
C_Factor = 2.0 // shows the number of times the shadow dominates the candlestick body

C_BodyHi = max(close, open)
C_BodyLo = min(close, open)
C_Body = C_BodyHi - C_BodyLo
C_BodyAvg = ema(C_Body, C_Len)
C_SmallBody = C_Body < C_BodyAvg
C_LongBody = C_Body > C_BodyAvg
C_UpShadow = high - C_BodyHi
C_DnShadow = C_BodyLo - low
C_HasUpShadow = C_UpShadow > C_ShadowPercent / 100 * C_Body
C_HasDnShadow = C_DnShadow > C_ShadowPercent / 100 * C_Body
C_WhiteBody = open < close
C_BlackBody = open > close
C_Range = high-low
C_IsInsideBar = C_BodyHi[1] > C_BodyHi and C_BodyLo[1] < C_BodyLo
C_BodyMiddle = C_Body / 2 + C_BodyLo
C_ShadowEquals = C_UpShadow == C_DnShadow or (abs(C_UpShadow - C_DnShadow) / C_DnShadow * 100) < C_ShadowEqualsPercent and (abs(C_DnShadow - C_UpShadow) / C_UpShadow * 100) < C_ShadowEqualsPercent
C_IsDojiBody = C_Range > 0 and C_Body <= C_Range * C_DojiBodyPercent / 100
C_Doji = C_IsDojiBody and C_ShadowEquals

CandleType = input(title = "Pattern Type", defval="Both", options=["Bullish", "Bearish", "Both"])

patternLabelPosLow = low - (atr(30) * 0.6)
patternLabelPosHigh = high + (atr(30) * 0.6)


AbandonedBabyInput = input(title = "Abandoned Baby" ,defval=true) 

DarkCloudCoverInput = input(title = "Dark Cloud Cover" ,defval=true) 

DojiInput = input(title = "Doji" ,defval=true) 

DojiStarInput = input(title = "Doji Star" ,defval=true) 

DownsideTasukiGapInput = input(title = "Downside Tasuki Gap" ,defval=true) 

DragonflyDojiInput = input(title = "Dragonfly Doji" ,defval=true) 

EngulfingInput = input(title = "Engulfing" ,defval=true) 

EveningDojiStarInput = input(title = "Evening Doji Star" ,defval=true) 

EveningStarInput = input(title = "Evening Star" ,defval=true) 

FallingThreeMethodsInput = input(title = "Falling Three Methods" ,defval=true) 

FallingWindowInput = input(title = "Falling Window" ,defval=true) 

GravestoneDojiInput = input(title = "Gravestone Doji" ,defval=true) 

HammerInput = input(title = "Hammer" ,defval=true) 

HangingManInput = input(title = "Hanging Man" ,defval=true) 

HaramiCrossInput = input(title = "Harami Cross" ,defval=true) 

HaramiInput = input(title = "Harami" ,defval=true) 

InvertedHammerInput = input(title = "Inverted Hammer" ,defval=true) 

KickingInput = input(title = "Kicking" ,defval=true) 

LongLowerShadowInput = input(title = "Long Lower Shadow" ,defval=false) 

LongUpperShadowInput = input(title = "Long Upper Shadow" ,defval=false) 

MarubozuBlackInput = input(title = "Marubozu Black" ,defval=true) 

MarubozuWhiteInput = input(title = "Marubozu White" ,defval=true) 

MorningDojiStarInput = input(title = "Morning Doji Star" ,defval=true) 

MorningStarInput = input(title = "Morning Star" ,defval=true) 

OnNeckInput = input(title = "On Neck" ,defval=true) 

PiercingInput = input(title = "Piercing" ,defval=true) 

RisingThreeMethodsInput = input(title = "Rising Three Methods" ,defval=true) 

RisingWindowInput = input(title = "Rising Window" ,defval=true) 

ShootingStarInput = input(title = "Shooting Star" ,defval=true) 

SpinningTopBlackInput = input(title = "Spinning Top Black" ,defval=false) 

SpinningTopWhiteInput = input(title = "Spinning Top White" ,defval=false) 

ThreeBlackCrowsInput = input(title = "Three Black Crows" ,defval=true) 

ThreeWhiteSoldiersInput = input(title = "Three White Soldiers" ,defval=true) 

TriStarInput = input(title = "Tri-Star" ,defval=true) 

TweezerBottomInput = input(title = "Tweezer Bottom" ,defval=true) 

TweezerTopInput = input(title = "Tweezer Top" ,defval=true) 

UpsideTasukiGapInput = input(title = "Upside Tasuki Gap" ,defval=true) 

C_OnNeckBearishNumberOfCandles = 2
C_OnNeckBearish = false
if C_DownTrend and C_BlackBody[1] and C_LongBody[1] and C_WhiteBody and open < close[1] and C_SmallBody and C_Range!=0 and abs(close-low[1])<=C_BodyAvg*0.05
	C_OnNeckBearish := true
if C_OnNeckBearish  and  OnNeckInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishOnNeck = "On Neck\nOn Neck is a two-line continuation pattern found in a downtrend. The first candle is long and red, the second candle is short and has a green body. The closing price of the second candle is close or equal to the first candle's low price. The pattern hints at a continuation of a downtrend, and penetrating the low of the green candlestick is sometimes considered a confirmation. "
    label.new(bar_index, patternLabelPosHigh, text="ON", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishOnNeck)




		
C_RisingWindowBullishNumberOfCandles = 2
C_RisingWindowBullish = false
if C_UpTrend[1] and (C_Range!=0 and C_Range[1]!=0) and low > high[1]
	C_RisingWindowBullish := true
if C_RisingWindowBullish  and  RisingWindowInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishRisingWindow = "Rising Window\nRising Window is a two-candle bullish continuation pattern that forms during an uptrend. Both candles in the pattern can be of any type with the exception of the Four-Price Doji. The most important characteristic of the pattern is a price gap between the first candle's high and the second candle's low. That gap (window) between two bars signifies support against the selling pressure."
    _tradeDirection := "bullish"
    label.new(bar_index, patternLabelPosLow, text="RW", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishRisingWindow)
C_FallingWindowBearishNumberOfCandles = 2
C_FallingWindowBearish = false
if C_DownTrend[1] and (C_Range!=0 and C_Range[1]!=0) and high < low[1]
	C_FallingWindowBearish := true
if C_FallingWindowBearish  and  FallingWindowInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishFallingWindow = "Falling Window\nFalling Window is a two-candle bearish continuation pattern that forms during a downtrend. Both candles in the pattern can be of any type, with the exception of the Four-Price Doji. The most important characteristic of the pattern is a price gap between the first candle's low and the second candle's high. The existence of this gap (window) means that the bearish trend is expected to continue."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="FW", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishFallingWindow)
C_FallingThreeMethodsBearishNumberOfCandles = 5
C_FallingThreeMethodsBearish = false

if C_DownTrend[4] and (C_LongBody[4] and C_BlackBody[4]) and (C_SmallBody[3] and C_WhiteBody[3] and open[3]>low[4] and close[3]<high[4]) and (C_SmallBody[2] and C_WhiteBody[2] and open[2]>low[4] and close[2]<high[4]) and (C_SmallBody[1] and C_WhiteBody[1] and open[1]>low[4] and close[1]<high[4]) and (C_LongBody and C_BlackBody and close<close[4])
	C_FallingThreeMethodsBearish := true

if C_FallingThreeMethodsBearish  and  FallingThreeMethodsInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishFallingThreeMethods = "Falling Three Methods\nFalling Three Methods is a five-candle bearish pattern that signifies a continuation of an existing downtrend. The first candle is long and red, followed by three short green candles with bodies inside the range of the first candle. The last candle is also red and long and it closes below the close of the first candle. This decisive fifth strongly bearish candle hints that bulls could not reverse the prior downtrend and that bears have regained control of the market."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="FTM", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishFallingThreeMethods)
C_RisingThreeMethodsBullishNumberOfCandles = 5
C_RisingThreeMethodsBullish = false
if C_UpTrend[4] and (C_LongBody[4] and C_WhiteBody[4]) and (C_SmallBody[3] and C_BlackBody[3] and open[3]<high[4] and close[3]>low[4]) and (C_SmallBody[2] and C_BlackBody[2] and open[2]<high[4] and close[2]>low[4]) and (C_SmallBody[1] and C_BlackBody[1] and open[1]<high[4] and close[1]>low[4]) and (C_LongBody and C_WhiteBody and close>close[4])
	C_RisingThreeMethodsBullish := true

if C_RisingThreeMethodsBullish  and  RisingThreeMethodsInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishRisingThreeMethods = "Rising Three Methods\nRising Three Methods is a five-candle bullish pattern that signifies a continuation of an existing uptrend. The first candle is long and green, followed by three short red candles with bodies inside the range of the first candle. The last candle is also green and long and it closes above the close of the first candle. This decisive fifth strongly bullish candle hints that bears could not reverse the prior uptrend and that bulls have regained control of the market."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="RTM", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishRisingThreeMethods)
C_TweezerTopBearishNumberOfCandles = 2
C_TweezerTopBearish = false
if C_UpTrend[1] and (not C_IsDojiBody or (C_HasUpShadow and C_HasDnShadow)) and abs(high-high[1]) <= C_BodyAvg*0.05 and C_WhiteBody[1] and C_BlackBody and C_LongBody[1]
	C_TweezerTopBearish := true

if C_TweezerTopBearish  and  TweezerTopInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishTweezerTop = "Tweezer Top\nTweezer Top is a two-candle pattern that signifies a potential bearish reversal. The pattern is found during an uptrend. The first candle is long and green, the second candle is red, and its high is nearly identical to the high of the previous candle. The virtually identical highs, together with the inverted directions, hint that bears might be taking over the market."
	_tradeDirection := "bearish"
		


				
    label.new(bar_index, patternLabelPosHigh, text="TT", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishTweezerTop)
C_TweezerBottomBullishNumberOfCandles = 2
C_TweezerBottomBullish = false
if C_UpTrend[1] and (not C_IsDojiBody or (C_HasUpShadow and C_HasDnShadow)) and abs(low-low[1]) <= C_BodyAvg*0.05 and C_BlackBody[1] and C_WhiteBody and C_LongBody[1]
	C_TweezerBottomBullish := true

if C_TweezerBottomBullish  and  TweezerBottomInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishTweezerBottom = "Tweezer Bottom\nTweezer Bottom is a two-candle pattern that signifies a potential bullish reversal. The pattern is found during a downtrend. The first candle is long and red, the second candle is green, its lows nearly identical to the low of the previous candle. The virtually identical lows together with the inverted directions hint that bulls might be taking over the market."
	_tradeDirection := "bullish"



		
    label.new(bar_index, patternLabelPosLow, text="TB", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishTweezerBottom)
C_DarkCloudCoverBearishNumberOfCandles = 2
C_DarkCloudCoverBearish = false
if (C_UpTrend[1] and C_WhiteBody[1] and C_LongBody[1]) and (C_BlackBody and open >= high[1] and  close < C_BodyMiddle[1] and close > open[1])
	C_DarkCloudCoverBearish := true

if C_DarkCloudCoverBearish  and  DarkCloudCoverInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishDarkCloudCover = "Dark Cloud Cover\nDark Cloud Cover is a two-candle bearish reversal candlestick pattern found in an uptrend. The first candle is green and has a larger than average body. The second candle is red and opens above the high of the prior candle, creating a gap, and then closes below the midpoint of the first candle. The pattern shows a possible shift in the momentum from the upside to the downside, indicating that a reversal might happen soon."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosHigh, text="DCC", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishDarkCloudCover)
C_DownsideTasukiGapBearishNumberOfCandles = 3
C_DownsideTasukiGapBearish = false	
if C_LongBody[2] and C_SmallBody[1] and C_DownTrend and C_BlackBody[2] and C_BodyHi[1] < C_BodyLo[2] and C_BlackBody[1] and C_WhiteBody and C_BodyHi <= C_BodyLo[2] and C_BodyHi >= C_BodyHi[1]
	C_DownsideTasukiGapBearish := true

if C_DownsideTasukiGapBearish  and  DownsideTasukiGapInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishDownsideTasukiGap = "Downside Tasuki Gap\nDownside Tasuki Gap is a three-candle pattern found in a downtrend that usually hints at the continuation of the downtrend. The first candle is long and red, followed by a smaller red candle with its opening price that gaps below the body of the previous candle. The third candle is green and it closes inside the gap created by the first two candles, unable to close it fully. The bull’s inability to close that gap hints that the downtrend might continue."
    _tradeDirection := "bearish"
    
    
    
    
    
    label.new(bar_index, patternLabelPosHigh, text="DTG", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishDownsideTasukiGap)
C_UpsideTasukiGapBullishNumberOfCandles = 3
C_UpsideTasukiGapBullish = false
if C_LongBody[2] and C_SmallBody[1] and C_UpTrend and C_WhiteBody[2] and C_BodyLo[1] > C_BodyHi[2] and C_WhiteBody[1] and C_BlackBody and C_BodyLo >= C_BodyHi[2] and C_BodyLo <= C_BodyLo[1]
	C_UpsideTasukiGapBullish := true

if C_UpsideTasukiGapBullish  and  UpsideTasukiGapInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishUpsideTasukiGap = "Upside Tasuki Gap\nUpside Tasuki Gap is a three-candle pattern found in an uptrend that usually hints at the continuation of the uptrend. The first candle is long and green, followed by a smaller green candle with its opening price that gaps above the body of the previous candle. The third candle is red and it closes inside the gap created by the first two candles, unable to close it fully. The bear’s inability to close the gap hints that the uptrend might continue."
	_tradeDirection := "bullish"



				
    label.new(bar_index, patternLabelPosLow, text="UTG", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishUpsideTasukiGap)
C_EveningDojiStarBearishNumberOfCandles = 3
C_EveningDojiStarBearish = false
if C_LongBody[2] and C_IsDojiBody[1] and C_LongBody and C_UpTrend and C_WhiteBody[2] and C_BodyLo[1] > C_BodyHi[2] and C_BlackBody and C_BodyLo <= C_BodyMiddle[2] and C_BodyLo > C_BodyLo[2] and C_BodyLo[1] > C_BodyHi
	C_EveningDojiStarBearish := true

if C_EveningDojiStarBearish  and  EveningDojiStarInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishEveningDojiStar = "Evening Doji Star\nThis candlestick pattern is a variation of the Evening Star pattern. It is bearish and continues an uptrend with a long-bodied, green candle day. It is then followed by a gap and a Doji candle and concludes with a downward close. The close would be below the first day’s midpoint. It is more bearish than the regular evening star pattern because of the existence of the Doji."
	_tradeDirection := "bearish"



				
    label.new(bar_index, patternLabelPosHigh, text="EDS", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishEveningDojiStar)
C_DojiStarBearishNumberOfCandles = 2
C_DojiStarBearish = false
if C_UpTrend and C_WhiteBody[1] and C_LongBody[1] and C_IsDojiBody and C_BodyLo > C_BodyHi[1]
	C_DojiStarBearish := true

if C_DojiStarBearish  and  DojiStarInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishDojiStar = "Doji Star\nThis is a bearish reversal candlestick pattern that is found in an uptrend and consists of two candles. First comes a long green candle, followed by a Doji candle (except 4-Price Doji) that opens above the body of the first one, creating a gap. It is considered a reversal signal with confirmation during the next trading day."
	_tradeDirection := "bearish"



		
    label.new(bar_index, patternLabelPosHigh, text="DS", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishDojiStar)
C_DojiStarBullishNumberOfCandles = 2
C_DojiStarBullish = false
if C_DownTrend and C_BlackBody[1] and C_LongBody[1] and C_IsDojiBody and C_BodyHi < C_BodyLo[1]
	C_DojiStarBullish := true

if C_DojiStarBullish  and  DojiStarInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishDojiStar = "Doji Star\nThis is a bullish reversal candlestick pattern that is found in a downtrend and consists of two candles. First comes a long red candle, followed by a Doji candle (except 4-Price Doji) that opens below the body of the first one, creating a gap. It is considered a reversal signal with confirmation during the next trading day."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="DS", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishDojiStar)
C_MorningDojiStarBullishNumberOfCandles = 3
C_MorningDojiStarBullish = false
if C_LongBody[2] and C_IsDojiBody[1] and C_LongBody and C_DownTrend and C_BlackBody[2] and C_BodyHi[1] < C_BodyLo[2] and C_WhiteBody and C_BodyHi >= C_BodyMiddle[2] and C_BodyHi < C_BodyHi[2] and C_BodyHi[1] < C_BodyLo
	C_MorningDojiStarBullish := true

if C_MorningDojiStarBullish  and  MorningDojiStarInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishMorningDojiStar = "Morning Doji Star\nThis candlestick pattern is a variation of the Morning Star pattern. A three-day bullish reversal pattern, which consists of three candlesticks will look something like this: The first being a long-bodied red candle that extends the current downtrend. Next comes a Doji that gaps down on the open. After that comes a long-bodied green candle, which gaps up on the open and closes above the midpoint of the body of the first day. It is more bullish than the regular morning star pattern because of the existence of the Doji."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="MDS", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishMorningDojiStar)
C_PiercingBullishNumberOfCandles = 2
C_PiercingBullish = false
if (C_DownTrend[1] and C_BlackBody[1] and C_LongBody[1]) and (C_WhiteBody and open <= low[1] and close > C_BodyMiddle[1] and close < open[1])
	C_PiercingBullish := true

if C_PiercingBullish  and  PiercingInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishPiercing = "Piercing\nPiercing is a two-candle bullish reversal candlestick pattern found in a downtrend. The first candle is red and has a larger than average body. The second candle is green and opens below the low of the prior candle, creating a gap, and then closes above the midpoint of the first candle. The pattern shows a possible shift in the momentum from the downside to the upside, indicating that a reversal might happen soon."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="P", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishPiercing)
C_HammerBullishNumberOfCandles = 1
C_HammerBullish = false
if C_SmallBody and C_Body > 0 and C_BodyLo > hl2 and C_DnShadow >= C_Factor * C_Body and not C_HasUpShadow
    if C_DownTrend
        C_HammerBullish := true

if C_HammerBullish  and  HammerInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishHammer = "Hammer\nHammer candlesticks form when a security moves lower after the open, but continues to rally into close above the intraday low. The candlestick that you are left with will look like a square attached to a long stick-like figure. This candlestick is called a Hammer if it happens to form during a decline."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="H", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishHammer)
C_HangingManBearishNumberOfCandles = 1
C_HangingManBearish = false
if C_SmallBody and C_Body > 0 and C_BodyLo > hl2 and C_DnShadow >= C_Factor * C_Body and not C_HasUpShadow
	if C_UpTrend
	    C_HangingManBearish := true

if C_HangingManBearish  and  HangingManInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishHangingMan = "Hanging Man\nWhen a specified security notably moves lower after the open, but continues to rally to close above the intraday low, a Hanging Man candlestick will form. The candlestick will resemble a square, attached to a long stick-like figure. It is referred to as a Hanging Man if the candlestick forms during an advance."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="HM", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishHangingMan)
C_ShootingStarBearishNumberOfCandles = 1
C_ShootingStarBearish = false
if C_SmallBody and C_Body > 0 and C_BodyHi < hl2 and C_UpShadow >= C_Factor * C_Body and not C_HasDnShadow
	if C_UpTrend
	    C_ShootingStarBearish := true

if C_ShootingStarBearish  and  ShootingStarInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishShootingStar = "Shooting Star\nThis single day pattern can appear during an uptrend and opens high, while it closes near its open. It trades much higher as well. It is bearish in nature, but looks like an Inverted Hammer."
    _tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="SS", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishShootingStar)
C_InvertedHammerBullishNumberOfCandles = 1
C_InvertedHammerBullish = false
if C_SmallBody and C_Body > 0 and C_BodyHi < hl2 and C_UpShadow >= C_Factor * C_Body and not C_HasDnShadow
    if C_DownTrend
        C_InvertedHammerBullish := true

if C_InvertedHammerBullish  and  InvertedHammerInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishInvertedHammer = "Inverted Hammer\nIf in a downtrend, then the open is lower. When it eventually trades higher, but closes near its open, it will look like an inverted version of the Hammer Candlestick. This is a one-day bullish reversal pattern."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="IH", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishInvertedHammer)
C_MorningStarBullishNumberOfCandles = 3
C_MorningStarBullish = false
if C_LongBody[2] and C_SmallBody[1] and C_LongBody
    if C_DownTrend and C_BlackBody[2] and C_BodyHi[1] < C_BodyLo[2] and C_WhiteBody and C_BodyHi >= C_BodyMiddle[2] and C_BodyHi < C_BodyHi[2] and C_BodyHi[1] < C_BodyLo
        C_MorningStarBullish := true

if C_MorningStarBullish  and  MorningStarInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishMorningStar = "Morning Star\nA three-day bullish reversal pattern, which consists of three candlesticks will look something like this: The first being a long-bodied red candle that extends the current downtrend. Next comes a short, middle candle that gaps down on the open. After comes a long-bodied green candle, which gaps up on the open and closes above the midpoint of the body of the first day."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="MS", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishMorningStar)
C_EveningStarBearishNumberOfCandles = 3
C_EveningStarBearish = false
if C_LongBody[2] and C_SmallBody[1] and C_LongBody
    if C_UpTrend and C_WhiteBody[2] and C_BodyLo[1] > C_BodyHi[2] and C_BlackBody and C_BodyLo <= C_BodyMiddle[2] and C_BodyLo > C_BodyLo[2] and C_BodyLo[1] > C_BodyHi
        C_EveningStarBearish := true

if C_EveningStarBearish  and  EveningStarInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishEveningStar = "Evening Star\nThis candlestick pattern is bearish and continues an uptrend with a long-bodied, green candle day. It is then followed by a gapped and small-bodied candle day, and concludes with a downward close. The close would be below the first day’s midpoint."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="ES", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishEveningStar)
C_MarubozuWhiteBullishNumberOfCandles = 1
C_MarubozuShadowPercentWhite = 5.0
C_MarubozuWhiteBullish = C_WhiteBody and C_LongBody and C_UpShadow <= C_MarubozuShadowPercentWhite/100*C_Body and C_DnShadow <= C_MarubozuShadowPercentWhite/100*C_Body and C_WhiteBody

if C_MarubozuWhiteBullish  and  MarubozuWhiteInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishMarubozuWhite = "Marubozu White\nA Marubozu White Candle is a candlestick that does not have a shadow that extends from its candle body at either the open or the close. Marubozu is Japanese for “close-cropped” or “close-cut.” Other sources may call it a Bald or Shaven Head Candle."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="MW", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishMarubozuWhite)
C_MarubozuBlackBearishNumberOfCandles = 1
C_MarubozuShadowPercentBearish = 5.0
C_MarubozuBlackBearish = C_BlackBody and C_LongBody and C_UpShadow <= C_MarubozuShadowPercentBearish/100*C_Body and C_DnShadow <= C_MarubozuShadowPercentBearish/100*C_Body and C_BlackBody

if C_MarubozuBlackBearish  and  MarubozuBlackInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishMarubozuBlack = "Marubozu Black\nThis is a candlestick that has no shadow, which extends from the red-bodied candle at the open, the close, or even at both. In Japanese, the name means “close-cropped” or “close-cut.” The candlestick can also be referred to as Bald or Shaven Head."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="MB", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishMarubozuBlack)
C_DojiNumberOfCandles = 1
C_DragonflyDoji = C_IsDojiBody and C_UpShadow <= C_Body
C_GravestoneDojiOne = C_IsDojiBody and C_DnShadow <= C_Body

if C_Doji and not C_DragonflyDoji and not C_GravestoneDojiOne and DojiInput
    var ttDoji = "Doji\nWhen the open and close of a security are essentially equal to each other, a doji candle forms. The length of both upper and lower shadows may vary, causing the candlestick you are left with to either resemble a cross, an inverted cross, or a plus sign. Doji candles show the playout of buyer-seller indecision in a tug-of-war of sorts. As price moves either above or below the opening level during the session, the close is either at or near the opening level."
    


				
		
    label.new(bar_index, patternLabelPosLow, text="D", style=label.style_label_up, color = color.gray, textcolor=color.white, tooltip = ttDoji)
C_GravestoneDojiBearishNumberOfCandles = 1
C_GravestoneDojiBearish = C_IsDojiBody and C_DnShadow <= C_Body

if C_GravestoneDojiBearish  and  GravestoneDojiInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishGravestoneDoji = "Gravestone Doji\nWhen a doji is at or is close to the day’s low point, a doji line will develop."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="GD", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishGravestoneDoji)
C_DragonflyDojiBullishNumberOfCandles = 1
C_DragonflyDojiBullish = C_IsDojiBody and C_UpShadow <= C_Body

if C_DragonflyDojiBullish  and  DragonflyDojiInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishDragonflyDoji = "Dragonfly Doji\nSimilar to other Doji days, this particular Doji also regularly appears at pivotal market moments. This is a specific Doji where both the open and close price are at the high of a given day."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="DD", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishDragonflyDoji)
C_HaramiCrossBullishNumberOfCandles = 2
C_HaramiCrossBullish = C_LongBody[1] and C_BlackBody[1] and C_DownTrend[1] and C_IsDojiBody and high <= C_BodyHi[1] and low >= C_BodyLo[1]

if C_HaramiCrossBullish  and  HaramiCrossInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishHaramiCross = "Harami Cross\nThis candlestick pattern is a variation of the Harami Bullish pattern. It is found during a downtrend. The two-day candlestick pattern consists of a Doji candle that is entirely encompassed within the body of what was once a red-bodied candle."
	_tradeDirection := "bullish"



		
    label.new(bar_index, patternLabelPosLow, text="HC", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishHaramiCross)
C_HaramiCrossBearishNumberOfCandles = 2
C_HaramiCrossBearish = C_LongBody[1] and C_WhiteBody[1] and C_UpTrend[1] and C_IsDojiBody and high <= C_BodyHi[1] and low >= C_BodyLo[1]

if C_HaramiCrossBearish  and  HaramiCrossInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishHaramiCross = "Harami Cross\nThis candlestick pattern is a variation of the Harami Bearish pattern. It is found during an uptrend. This is a two-day candlestick pattern with a Doji candle that is entirely encompassed within the body that was once a green-bodied candle. The Doji shows that some indecision has entered the minds of sellers, and the pattern hints that the trend might reverse."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="HC", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishHaramiCross)
C_HaramiBullishNumberOfCandles = 2
C_HaramiBullish = C_LongBody[1] and C_BlackBody[1] and C_DownTrend[1] and C_WhiteBody and C_SmallBody and high <= C_BodyHi[1] and low >= C_BodyLo[1]

if C_HaramiBullish  and  HaramiInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishHarami = "Harami\nThis two-day candlestick pattern consists of a small-bodied green candle that is entirely encompassed within the body of what was once a red-bodied candle."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="BH", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishHarami)
C_HaramiBearishNumberOfCandles = 2
C_HaramiBearish = C_LongBody[1] and C_WhiteBody[1] and C_UpTrend[1] and C_BlackBody and C_SmallBody and high <= C_BodyHi[1] and low >= C_BodyLo[1]

if C_HaramiBearish  and  HaramiInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishHarami = "Harami\nThis is a two-day candlestick pattern with a small, red-bodied candle that is entirely encompassed within the body that was once a green-bodied candle."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="BH", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishHarami)
C_LongLowerShadowBullishNumberOfCandles = 1
C_LongLowerShadowPercent = 75.0
C_LongLowerShadowBullish = C_DnShadow > C_Range/100*C_LongLowerShadowPercent

if C_LongLowerShadowBullish  and  LongLowerShadowInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishLongLowerShadow = "Long Lower Shadow\nTo indicate seller domination of the first part of a session, candlesticks will present with long lower shadows and short upper shadows, consequently lowering prices."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="LLS", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishLongLowerShadow)
C_LongUpperShadowBearishNumberOfCandles = 1
C_LongShadowPercent = 75.0
C_LongUpperShadowBearish = C_UpShadow > C_Range/100*C_LongShadowPercent

if C_LongUpperShadowBearish  and  LongUpperShadowInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishLongUpperShadow = "Long Upper Shadow\nTo indicate buyer domination of the first part of a session, candlesticks will present with long upper shadows, as well as short lower shadows, consequently raising bidding prices."
	_tradeDirection := "bearish"
	
	
	
	
	
    label.new(bar_index, patternLabelPosHigh, text="LUS", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishLongUpperShadow)
C_SpinningTopWhiteNumberOfCandles = 1
C_SpinningTopWhitePercent = 34.0
C_IsSpinningTopWhite = C_DnShadow >= C_Range / 100 * C_SpinningTopWhitePercent and C_UpShadow >= C_Range / 100 * C_SpinningTopWhitePercent and not C_IsDojiBody
C_SpinningTopWhite = C_IsSpinningTopWhite and C_WhiteBody

if C_SpinningTopWhite and SpinningTopWhiteInput
    var ttSpinningTopWhite = "Spinning Top White\nWhite spinning tops are candlestick lines that are small, green-bodied, and possess shadows (upper and lower) that end up exceeding the length of candle bodies. They often signal indecision between buyer and seller."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="STW", style=label.style_label_up, color = color.gray, textcolor=color.white, tooltip = ttSpinningTopWhite)
C_SpinningTopBlackNumberOfCandles = 1
C_SpinningTopBlackPercent = 34.0
C_IsSpinningTop = C_DnShadow >= C_Range / 100 * C_SpinningTopBlackPercent and C_UpShadow >= C_Range / 100 * C_SpinningTopBlackPercent and not C_IsDojiBody
C_SpinningTopBlack = C_IsSpinningTop and C_BlackBody

if C_SpinningTopBlack and SpinningTopBlackInput
    var ttSpinningTopBlack = "Spinning Top Black\nBlack spinning tops are candlestick lines that are small, red-bodied, and possess shadows (upper and lower) that end up exceeding the length of candle bodies. They often signal indecision."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosLow, text="STB", style=label.style_label_up, color = color.gray, textcolor=color.white, tooltip = ttSpinningTopBlack)
C_ThreeWhiteSoldiersBullishNumberOfCandles = 3
C_3WSld_ShadowPercent = 5.0
C_3WSld_HaveNotUpShadow = C_Range * C_3WSld_ShadowPercent / 100 > C_UpShadow
C_ThreeWhiteSoldiersBullish = false
if C_LongBody and C_LongBody[1] and C_LongBody[2]
    if C_WhiteBody and C_WhiteBody[1] and C_WhiteBody[2]
        C_ThreeWhiteSoldiersBullish := close > close[1] and close[1] > close[2] and open < close[1] and open > open[1] and open[1] < close[2] and open[1] > open[2] and C_3WSld_HaveNotUpShadow and C_3WSld_HaveNotUpShadow[1] and C_3WSld_HaveNotUpShadow[2]

if C_ThreeWhiteSoldiersBullish  and  ThreeWhiteSoldiersInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishThreeWhiteSoldiers = "Three White Soldiers\nThis bullish reversal pattern is made up of three long-bodied, green candles in immediate succession. Each one opens within the body before it and the close is near to the daily high."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="3WS", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishThreeWhiteSoldiers)
C_ThreeBlackCrowsBearishNumberOfCandles = 3
C_3BCrw_ShadowPercent = 5.0
C_3BCrw_HaveNotDnShadow = C_Range * C_3BCrw_ShadowPercent / 100 > C_DnShadow
C_ThreeBlackCrowsBearish = false
if C_LongBody and C_LongBody[1] and C_LongBody[2]
    if C_BlackBody and C_BlackBody[1] and C_BlackBody[2]
        C_ThreeBlackCrowsBearish := close < close[1] and close[1] < close[2] and open > close[1] and open < open[1] and open[1] > close[2] and open[1] < open[2] and C_3BCrw_HaveNotDnShadow and C_3BCrw_HaveNotDnShadow[1] and C_3BCrw_HaveNotDnShadow[2]

if C_ThreeBlackCrowsBearish  and  ThreeBlackCrowsInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishThreeBlackCrows = "Three Black Crows\nThis is a bearish reversal pattern that consists of three long, red-bodied candles in immediate succession. For each of these candles, each day opens within the body of the day before and closes either at or near its low."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="3BC", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishThreeBlackCrows)
C_EngulfingBullishNumberOfCandles = 2
C_EngulfingBullish = C_DownTrend and C_WhiteBody and C_LongBody and C_BlackBody[1] and C_SmallBody[1] and close >= open[1] and open <= close[1] and ( close > open[1] or open < close[1] )

if C_EngulfingBullish  and  EngulfingInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishEngulfing = "Engulfing\nAt the end of a given downward trend, there will most likely be a reversal pattern. To distinguish the first day, this candlestick pattern uses a small body, followed by a day where the candle body fully overtakes the body from the day before, and closes in the trend’s opposite direction. Although similar to the outside reversal chart pattern, it is not essential for this pattern to completely overtake the range (high to low), rather only the open and the close."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="BE", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishEngulfing)
C_EngulfingBearishNumberOfCandles = 2
C_EngulfingBearish = C_UpTrend and C_BlackBody and C_LongBody and C_WhiteBody[1] and C_SmallBody[1] and close <= open[1] and open >= close[1] and ( close < open[1] or open > close[1] )

if C_EngulfingBearish  and  EngulfingInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishEngulfing = "Engulfing\nAt the end of a given uptrend, a reversal pattern will most likely appear. During the first day, this candlestick pattern uses a small body. It is then followed by a day where the candle body fully overtakes the body from the day before it and closes in the trend’s opposite direction. Although similar to the outside reversal chart pattern, it is not essential for this pattern to fully overtake the range (high to low), rather only the open and the close."
	_tradeDirection := "bearish"



		
    label.new(bar_index, patternLabelPosHigh, text="BE", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishEngulfing)
C_AbandonedBabyBullishNumberOfCandles = 3
C_AbandonedBabyBullish = C_DownTrend[2] and C_BlackBody[2] and C_IsDojiBody[1] and low[2] > high[1] and C_WhiteBody and high[1] < low

if C_AbandonedBabyBullish  and  AbandonedBabyInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishAbandonedBaby = "Abandoned Baby\nThis candlestick pattern is quite rare as far as reversal patterns go. The first of the pattern is a large down candle. Next comes a doji candle that gaps below the candle before it. The doji candle is then followed by another candle that opens even higher and swiftly moves to the upside."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="AB", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishAbandonedBaby)
C_AbandonedBabyBearishNumberOfCandles = 3
C_AbandonedBabyBearish = C_UpTrend[2] and C_WhiteBody[2] and C_IsDojiBody[1] and high[2] < low[1] and C_BlackBody and low[1] > high

if C_AbandonedBabyBearish  and  AbandonedBabyInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishAbandonedBaby = "Abandoned Baby\nA bearish abandoned baby is a specific candlestick pattern that often signals a downward reversal trend in terms of security price. It is formed when a gap appears between the lowest price of a doji-like candle and the candlestick of the day before. The earlier candlestick is green, tall, and has small shadows. The doji candle is also tailed by a gap between its lowest price point and the highest price point of the candle that comes next, which is red, tall and also has small shadows. The doji candle shadows must completely gap either below or above the shadows of the first and third day in order to have the abandoned baby pattern effect."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="AB", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishAbandonedBaby)
C_TriStarBullishNumberOfCandles = 3
C_3DojisBullish = C_Doji[2] and C_Doji[1] and C_Doji
C_BodyGapUpBullish = C_BodyHi[1] < C_BodyLo
C_BodyGapDnBullish = C_BodyLo[1] > C_BodyHi
C_TriStarBullish = C_3DojisBullish and C_DownTrend[2] and C_BodyGapDnBullish[1] and C_BodyGapUpBullish

if C_TriStarBullish  and  TriStarInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishTriStar = "Tri-Star\nA bullish TriStar candlestick pattern can form when three doji candlesticks materialize in immediate succession at the tail-end of an extended downtrend. The first doji candle marks indecision between bull and bear. The second doji gaps in the direction of the leading trend. The third changes the attitude of the market once the candlestick opens in the direction opposite to the trend. Each doji candle has a shadow, all comparatively shallow, which signify an interim cutback in volatility."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="3S", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishTriStar)
C_TriStarBearishNumberOfCandles = 3
C_3Dojis = C_Doji[2] and C_Doji[1] and C_Doji
C_BodyGapUp = C_BodyHi[1] < C_BodyLo
C_BodyGapDn = C_BodyLo[1] > C_BodyHi
C_TriStarBearish = C_3Dojis and C_UpTrend[2] and C_BodyGapUp[1] and C_BodyGapDn

if C_TriStarBearish  and  TriStarInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishTriStar = "Tri-Star\nThis particular pattern can form when three doji candlesticks appear in immediate succession at the end of an extended uptrend. The first doji candle marks indecision between bull and bear. The second doji gaps in the direction of the leading trend. The third changes the attitude of the market once the candlestick opens in the direction opposite to the trend. Each doji candle has a shadow, all comparatively shallow, which signify an interim cutback in volatility."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="3S", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishTriStar)
C_KickingBullishNumberOfCandles = 2
C_MarubozuShadowPercent = 5.0
C_Marubozu = C_LongBody and C_UpShadow <= C_MarubozuShadowPercent/100*C_Body and C_DnShadow <= C_MarubozuShadowPercent/100*C_Body
C_MarubozuWhiteBullishKicking = C_Marubozu and C_WhiteBody
C_MarubozuBlackBullish = C_Marubozu and C_BlackBody
C_KickingBullish = C_MarubozuBlackBullish[1] and C_MarubozuWhiteBullishKicking and high[1] < low

if C_KickingBullish  and  KickingInput and (("Bullish" == CandleType) or CandleType == "Both")

    var ttBullishKicking = "Kicking\nThe first day candlestick is a bearish marubozu candlestick with next to no upper or lower shadow and where the price opens at the day’s high and closes at the day’s low. The second day is a bullish marubozu pattern, with next to no upper or lower shadow and where the price opens at the day’s low and closes at the day’s high. Additionally, the second day gaps up extensively and opens above the opening price of the day before. This gap or window, as the Japanese call it, lies between day one and day two’s bullish candlesticks."
	_tradeDirection := "bullish"


				
    label.new(bar_index, patternLabelPosLow, text="K", style=label.style_label_up, color = color.blue, textcolor=color.white, tooltip = ttBullishKicking)
C_KickingBearishNumberOfCandles = 2
C_MarubozuBullishShadowPercent = 5.0
C_MarubozuBearishKicking = C_LongBody and C_UpShadow <= C_MarubozuBullishShadowPercent/100*C_Body and C_DnShadow <= C_MarubozuBullishShadowPercent/100*C_Body
C_MarubozuWhiteBearish = C_MarubozuBearishKicking and C_WhiteBody
C_MarubozuBlackBearishKicking = C_MarubozuBearishKicking and C_BlackBody
C_KickingBearish = C_MarubozuWhiteBearish[1] and C_MarubozuBlackBearishKicking and low[1] > high

if C_KickingBearish  and  KickingInput and (("Bearish" == CandleType) or CandleType == "Both")

    var ttBearishKicking = "Kicking\nA bearish kicking pattern will occur, subsequently signaling a reversal for a new downtrend. The first day candlestick is a bullish marubozu. The second day gaps down extensively and opens below the opening price of the day before. There is a gap between day one and two’s bearish candlesticks."
	_tradeDirection := "bearish"


				
    label.new(bar_index, patternLabelPosHigh, text="K", style=label.style_label_down, color = color.red, textcolor=color.white, tooltip = ttBearishKicking)
    var ttAllCandlestickPatterns = "All Candlestick Patterns\n"
    label.new(bar_index, patternLabelPosLow, text="Collection", style=label.style_label_up, color = color.gray, textcolor=color.white, tooltip = ttAllCandlestickPatterns)



strategy.entry("long", strategy.long, when=_tradeDirection =="bullish")
strategy.close("long", when = _tradeDirection =="bearish" or (close < open and close < strategy.position_avg_price * (1 - stopLoss)) or close > strategy.position_avg_price)
strategy.entry("short", strategy.short, when=_tradeDirection =="bearish")
strategy.close("short", when = _tradeDirection =="bullish" or (close > open and close > strategy.position_avg_price * (1 + stopLoss)) or close < strategy.position_avg_price)

```

> Detail

https://www.fmz.com/strategy/435487

> Last Modified

2023-12-15 12:03:17
