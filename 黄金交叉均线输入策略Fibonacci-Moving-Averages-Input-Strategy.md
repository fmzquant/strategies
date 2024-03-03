
> Name

黄金交叉均线输入策略Fibonacci-Moving-Averages-Input-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15a60950a840cd2bcd2.png)
[trans]

## 概述

黄金交叉均线输入策略是一种基于移动平均线的交叉信号或下穿信号来生成交易信号的策略。当短期移动平均线上穿长期移动平均线时,产生多头黄金交叉信号。当短期移动平均线下穿长期移动平均线时,产生空头死亡交叉信号。一般市场共识使用的均线参数是50日线和200日线。

黄金交叉均线输入策略允许您自由选择交叉均线的参数。为了视觉显示效果,我绘制了从1到987等多条斐波那契移动平均线,但实际使用时,只需要选择少数均线,观察是否有明显的交叉信号,然后将这些参数输入到长仓或短仓设置中即可。

例如,该策略中的长仓或短仓设置输入为:

多头信号:
34日EMA交叉144日EMA 

空头信号:  
55日SMA下穿144日EMA

可以看出,该策略可以自由匹配4个不同均线的参数,既可以选择EMA,也可以选择SMA。

默认颜色设置:
上涨均线为绿色
下跌均线为红色

默认可视化斐波那契均线设置:
1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181日均线

默认可视化均线设置:
50, 100, 150, 200日均线

默认长仓或短仓设置:
多头信号:
34日EMA交叉144日EMA

空头信号:
55日SMA下穿144日EMA

## 原理

该策略的核心逻辑是基于两个移动平均线的交叉信号来产生交易信号。

其中,移动平均线是一种用来分析市场趋势的技术指标。它计算一定时期内的收盘价的平均值,能够有效地过滤市场波动。移动平均线分为简单移动平均线SMA和指数移动平均线EMA。

SMA即对某一周期的收盘价进行简单算术平均。EMA则对收盘价进行指数平滑移动平均,给予最近价格更高的权重。EMA能更快地响应价格变动。

当短期均线上穿长期均线时,被视为市场趋势转为看涨,产生买入信号。这被称为“黄金交叉”。反之,当短期均线下穿长期均线时,被视为市场趋势转为看跌,产生卖出信号。这被称为“死亡交叉”。

该策略的灵活之处在于,可以自主设置4个均线的参数。默认参数是34日EMA上穿144日EMA为多头信号,55日SMA下穿144日EMA为空头信号。这些参数都可以在输入框中自由设置。

另外,该策略绘制了多条斐波那契数列的移动平均线,这能够从更多时间维度观察趋势变化。同时也绘制了常用的50日、100日、150日、200日均线。这些均线都是参考用,重要的是要进入长仓或短仓设置框中输入的交叉均线参数。

## 优势

这种基于均线交叉的策略优势有:

1. 使用移动平均线能有效过滤市场噪音,识别趋势方向

2. 交易信号来自均线交叉具有一定的可靠性

3. 可以自由选择长短均线组合,优化参数

4. 结合多条不同周期的均线,能在更大时间维度识别趋势

5. 可同时采用EMA和SMA,根据品种特性选择最优参数

6. 视觉上直观形象,通过多颜色均线交叉清晰可见

7. 实现简单,容易掌握,适合初学者

8. 可灵活应用于不同品种,具有一定的普适性

## 风险

该策略也存在一些风险:

1. 在震荡市中,均线可能产生大量不确定信号,导致超短线交易,增加交易频率和手续费负担。

2. 选取的参数不合适可能导致错误信号,应选择合适的长短均线组合并验证效果。 

3. 在趋势剧烈反转时,均线交叉信号会滞后,无法及时反应价格变化。

4. 均线交叉并不能完全避免亏损,需要合理设置止损点。

5. 需防止过度优化导致的曲线拟合。应在不同市场周期中测试参数稳定性。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 测试不同的长短均线组合,寻找最佳参数,可基于历史数据反复回测。

2. 尝试调整均线类型,比较SMA和EMA的效果差异。品种趋势更明显可选择SMA,品种波动更剧烈可选择EMA。

3. 结合其他指标如KDJ、MACD等过滤假信号,提高信号质量。

4. 增加止损策略,以控制单笔亏损风险。可设定移动止损或追踪止损。

5. 优化资金管理策略,如根据回撤情况调整仓位等,控制整体风险敞口。

6. 测试在不同品种及不同周期中的稳定性,评估参数健壮性。必要时可针对品种微调参数。

## 总结

黄金交叉均线输入策略整体来说是一种可靠性较高的趋势跟踪策略。它以简单直观的均线交叉作为交易信号,通过参数优化可以适应不同品种。结合止损和资金管理可以控制风险。但需要注意防止过度优化和趋势反转的滞后问题。如果参数选择恰当,且交易者有极强的纪律,这可以成为一种高效稳定的盈利策略。


||

## Overview

The Fibonacci Moving Averages Input strategy is based on moving average crossover or crossunder signals to generate trading signals. When the short-term moving average crosses above the long-term moving average, a bullish golden cross signal is generated. When the short-term moving average crosses below the long-term moving average, a bearish death cross signal is generated. The commonly used moving averages are the 50-day and 200-day moving averages.

The Fibonacci Moving Averages Input (FibMAI) strategy allows you to choose any value for your bullish or bearish crosses. For visual display, I have plotted Fibonacci moving averages including 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987 while hiding the candlesticks. But to use this indicator, I only enable a couple of MA's to check if there's a notable crossover or crossunder pattern, then backtest those values into the FibMAI strategy Long or Short settings input.

For example, the Long or Short settings input for this NQ1! day chart is:

Bullish =
FibEMA34
crossover
FibEMA144

Bearish =
FibEMA55
crossunder
FibSMA144

As you can see, you can mix and match 4 different MA values, either Exponential or Simple.

Default color settings:
Rising value = green color
Falling value = red color

Default Visual FibMA settings:
FibEMA 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181

Default Visual MA settings: 
SMA 50, 100, 150, 200

Default Long or Short settings:
Bullish = 
FibEMA34
crossover
FibEMA144

Bearish =
FibEMA55 
crossunder
FibSMA144

## Principle 

The core logic of this strategy is based on crossover signals between two moving averages to generate trading signals.

Moving averages are technical indicators used to analyze market trends. They calculate the average closing price over a certain period and can effectively filter market fluctuations. There are two types of moving averages - Simple Moving Average (SMA) and Exponential Moving Average (EMA).

SMA is the simple arithmetic average of closing prices over a period. EMA applies exponential smoothing to closing prices, giving more weight to recent prices. EMA reacts more quickly to price changes.

When the short-term moving average crosses above the long-term moving average, it signals a bullish trend change and generates a buy signal. This is called a "golden cross". Conversely, when the short-term moving average crosses below the long-term moving average, it signals a bearish trend change and generates a sell signal. This is called a "death cross".

The flexibility of this strategy lies in the ability to manually set the parameters for the 4 moving averages. The default parameters are 34-period EMA crossing above 144-period EMA for bullish signal, and 55-period SMA crossing below 144-period EMA for bearish signal. These parameters can be freely adjusted in the input boxes.

In addition, the strategy plots multiple Fibonacci sequence moving averages across different timeframes. Common moving averages like 50-day, 100-day, 150-day and 200-day are also plotted. These serve as references, while the key is the crossover moving averages entered in the Long/Short settings.

## Advantages

The advantages of this moving average crossover strategy include:

1. Using moving averages filters market noise and identifies trend direction

2. Crossover signals have a certain degree of reliability

3. Customizable long and short moving average combinations for parameter optimization

4. Incorporates multiple timeframes to identify trends

5. Can use both EMA and SMA based on instrument characteristics 

6. Visually intuitive with colored moving average crosses

7. Simple to understand and suitable for beginners

8. Flexibly applied across different instruments with universality

## Risks

There are also some risks to this strategy:

1. Too many whipsaw signals during choppy markets, leading to over-trading

2. Incorrect signals if unsuitable moving average combinations are used

3. Lag in signals during extreme trend reversals, unable to reflect price changes in time

4. Moving average crosses do not completely avoid losses, need reasonable stop loss

5. Over-optimization causing curve fitting. Parameters need to be robust across market cycles.

6. Parameters may need fine-tuning for different instruments

## Optimization Directions

Some ways to optimize this strategy:

1. Test different long and short moving average combinations to find optimal parameters using backtesting

2. Try adjusting moving average types, compare SMA and EMA performances. Use SMA for instruments with clearer trends, and EMA for more volatile instruments.

3. Incorporate other indicators like KDJ, MACD to filter false signals and improve quality

4. Add stop loss strategies to control loss on single trades, such as trailing stop loss

5. Optimize money management strategies, like adjusting position sizing based on drawdown

6. Test parameter stability across different instruments and timeframes to evaluate robustness

## Conclusion

Overall, the Fibonacci Moving Averages Input strategy is a reliable trend following system. It uses simple and intuitive moving average crosses for trade signals, and can be adapted to different instruments through parameter optimization. With proper stop loss and money management, risks can be controlled. Over-optimization and lagging trend reversal signals should be avoided. With well-chosen parameters and trading discipline, this can be an efficient and stable profit-generating strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_ohlc4|0|source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_int_1|34|long|
|v_input_3|true|crossover EMA or SMA|
|v_input_int_2|144|crossover|
|v_input_4|true|short EMA or SMA|
|v_input_int_3|55|short|
|v_input_5|false|crossunder EMA or SMA|
|v_input_int_4|144|crossunder|
|v_input_7|true|MA1|
|v_input_int_5|true|ma Length|
|v_input_8|true|MA2|
|v_input_int_6|2|ma Length|
|v_input_9|true|MA3|
|v_input_int_7|3|ma Length|
|v_input_10|true|MA5|
|v_input_int_8|5|ma Length|
|v_input_11|true|MA8|
|v_input_int_9|8|ma Length|
|v_input_12|true|MA13|
|v_input_int_10|13|ma Length|
|v_input_13|true|MA21|
|v_input_int_11|21|ma Length|
|v_input_14|true|MA34|
|v_input_int_12|34|ma Length|
|v_input_15|true|MA55|
|v_input_int_13|55|ma Length|
|v_input_16|true|MA89|
|v_input_int_14|89|ma Length|
|v_input_17|true|MA144|
|v_input_int_15|144|ma Length|
|v_input_18|true|MA233|
|v_input_int_16|233|ma Length|
|v_input_19|true|MA377|
|v_input_int_17|377|ma Length|
|v_input_20|true|MA610|
|v_input_int_18|610|ma Length|
|v_input_21|true|MA987|
|v_input_int_19|987|ma Length|
|v_input_22|true|MA1597|
|v_input_int_20|1597|ma Length|
|v_input_23|true|MA2584|
|v_input_int_21|2584|ma Length|
|v_input_24|true|MA4181|
|v_input_int_22|4181|ma Length|
|v_input_26|true|MA50|
|v_input_int_23|50|ma Length|
|v_input_27|true|MA100|
|v_input_int_24|100|ma Length|
|v_input_28|true|MA150|
|v_input_int_25|150|ma Length|
|v_input_29|true|MA200|
|v_input_int_26|200|ma Length|
|v_input_2|true|(?Long or Short Settings)long EMA or SMA|
|v_input_6|true|(?Visual FibMA Settings)Fib EMA or SMA|
|v_input_25|false|(?Visual MA Settings)EMA or SMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-25 00:00:00
end: 2023-10-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Options360 : Fibonacci MAI (Moving Averages Input) beta 10/15/22
// © Options360 original public release = 2/25/23
// * This script uses altered pieces of code from my @Options360 "Fibonacci MA7" indicator*
// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811
////
strategy(title="Fibonacci Moving Averages Input", shorttitle = "FibMAI", overlay=true)

src = input(ohlc4, 'source')
//
string  GRP = "Long or Short Settings"
exponential1 = input(true, title="long EMA or SMA", tooltip="EMA checked or SMA unchecked", group = GRP)
long = input.int(34, minval=1, title="long", tooltip="Signal Moving average long input")
long1 = exponential1 ? ta.ema(src, long) : ta.sma(src, long)

exponential2 = input(true, title="crossover EMA or SMA", tooltip="EMA checked or SMA unchecked")
longer = input.int(144, minval=1, title="crossover", tooltip="Crossed over Moving average long input")
long2 = exponential2 ? ta.ema(src, longer) : ta.sma(src, longer)

exponential3 = input(true, title="short EMA or SMA", tooltip="EMA checked or SMA unchecked")
short = input.int(55, minval=1, title="short", tooltip="Signal Moving average short input")
short1 = exponential3 ? ta.ema(src, short) : ta.sma(src, short)

exponential4 = input(false, title="crossunder EMA or SMA", tooltip="EMA checked or SMA unchecked")
shorter = input.int(144, minval=1, title="crossunder", tooltip="Crossed under Moving average short input")
short2 = exponential4 ? ta.ema(src, shorter) : ta.sma(src, shorter)
//
string  GRP2 = "Visual FibMA Settings"
exponential = input(true, title="Fib EMA or SMA", tooltip="EMA checked or SMA unchecked", group = GRP2)
//
smaplot11 = input (true, title="MA1")
len11 = input.int(1, minval=1, title="ma Length")
out11 = exponential ? ta.ema(src, len11) : ta.sma(src, len11)
up11 = out11 > out11[1]
down11 = out11 < out11[1]
mycolor11 = up11 ? #3cfe12 : down11 ? #ff0202 : #008eff
plot(out11 and smaplot11 ? out11 :na, title="1", color=mycolor11, linewidth=1)

smaplot18 = input (true, title="MA2")
len18 = input.int(2, minval=1, title="ma Length")
out18 = exponential ? ta.ema(src, len18) : ta.sma(src, len18)
up18 = out18 > out18[1]
down18 = out18 < out18[1]
mycolor18 = up18 ? #3cfe12 : down18 ? #ff0202 : #008eff
plot(out18 and smaplot18 ? out18 :na , title="2", color=mycolor18, linewidth=1)

smaplot13 = input (true, title="MA3")
len13 = input.int(3, minval=1, title="ma Length")
out13 = exponential ? ta.ema(src, len13) : ta.sma(src, len13)
up13 = out13 > out13[1]
down13 = out13 < out13[1]
mycolor13 = up13 ? #3cfe12 : down13 ? #ff0202 : #008eff
plot(out13 and smaplot13 ? out13 :na , title="3", color=mycolor11, linewidth=1)

smaplot9 = input (true, title="MA5")
len9 = input.int(5, minval=1, title="ma Length")
out9 = exponential ? ta.ema(src, len9) : ta.sma(src, len9)
up9 = out9 > out9[1]
down9 = out9 < out9[1]
mycolor9 = up9 ? #3cfe12 : down9 ? #ff0202 : #008eff
plot(out9 and smaplot9 ? out9 :na , title="5", color=mycolor9, linewidth=1)

smaplot8 = input (true, title="MA8")
len8 = input.int(8, minval=1, title="ma Length")
out8 = exponential ? ta.ema(src, len8) : ta.sma(src, len8)
up8 = out8 > out8[1]
down8 = out8 < out8[1]
mycolor8 = up8 ? #3cfe12 : down8 ? #ff0202 : #008eff
plot(out8 and smaplot8 ? out8 :na , title="8", color=mycolor8, linewidth=1)

smaplot7 = input (true, title="MA13")
len7 = input.int(13, minval=1, title="ma Length")
out7 = exponential ? ta.ema(src, len7) : ta.sma(src, len7)
up7 = out7 > out7[1]
down7 = out7 < out7[1]
mycolor7 = up7 ? #3cfe12 : down7 ? #ff0202 : #008eff
plot(out7 and smaplot7 ? out7 :na , title="13", color=mycolor7, linewidth=1)

smaplot = input (true, title="MA21")
len = input.int(21, minval=1, title="ma Length")
out = exponential ? ta.ema(src, len) : ta.sma(src, len)
up = out > out[1]
down = out < out[1]
mycolor = up ? #3cfe12 : down ? #ff0202 : #008eff
plot(out and smaplot ? out :na, title="21", color=mycolor, linewidth=1)

smaplot2 = input (true, title="MA34")
len2 = input.int(34, minval=1, title="ma Length")
out2 = exponential ? ta.ema(src, len2) : ta.sma(src, len2)
up2 = out2 > out2[1]
down2 = out2 < out2[1]
mycolor2 = up2 ? #3cfe12 : down2 ? #ff0202 : #008eff
plot(out2 and smaplot2 ? out2 :na , title="34", color=mycolor2, linewidth=1)

smaplot3 = input (true, title="MA55")
len3 = input.int(55, minval=1, title="ma Length")
out3 = exponential ? ta.ema(src, len3) : ta.sma(src, len3)
up3 = out3 > out3[1]
down3 = out3 < out3[1]
mycolor3 = up3 ? #3cfe12 : down3 ? #ff0202 : #008eff
plot(out3 and smaplot3 ? out3 :na, title="55", color=mycolor3, linewidth=1)

smaplot4 = input (true, title="MA89")
len4 = input.int(89, minval=1, title="ma Length")
out4 = exponential ? ta.ema(src, len4) : ta.sma(src, len4)
up4 = out4 > out4[1]
down4 = out4 < out4[1]
mycolor4 = up4 ? #3cfe12 : down4 ? #ff0202 : #008eff
plot(out4 and smaplot4 ? out4 :na , title="89", color=mycolor4, linewidth=1)

smaplot5 = input (true, title="MA144")
len5 = input.int(144, minval=1, title="ma Length")
out5 = exponential ? ta.ema(src, len5) : ta.sma(src, len5)
up5 = out5 > out5[1]
down5 = out5 < out5[1]
mycolor5 = up5 ? #3cfe12 : down5 ? #ff0202 : #008eff
plot(out5 and smaplot5 ? out5 :na, title="144", color=mycolor5, linewidth=1)

smaplot6 = input (true, title="MA233")
len6 = input.int(233, minval=1, title="ma Length")
out6 = exponential ? ta.ema(src, len6) : ta.sma(src, len6)
up6 = out6 > out6[1]
down6 = out6 < out6[1]
mycolor6 = up6 ? #3cfe12 : down6 ? #ff0202 : #008eff
plot(out6 and smaplot6 ? out6 :na , title="233", color=mycolor6, linewidth=1)

smaplot10 = input (true, title="MA377")
len10 = input.int(377, minval=1, title="ma Length")
out10 = exponential ? ta.ema(src, len10) : ta.sma(src, len10)
up10 = out10 > out10[1]
down10 = out10 < out10[1]
mycolor10 = up10 ? #3cfe12 : down10 ? #ff0202 : #008eff
plot(out10 and smaplot10 ? out10 :na , title="377", color=mycolor10, linewidth=1)

smaplot14 = input (true, title="MA610")
len14 = input.int(610, minval=1, title="ma Length")
out14 = exponential ? ta.ema(src, len14) : ta.sma(src, len14)
up14 = out14 > out14[1]
down14 = out14 < out14[1]
mycolor14 = up14 ? #3cfe12 : down14 ? #ff0202 : #008eff
plot(out14 and smaplot14 ? out14 :na , title="610", color=mycolor14, linewidth=1)

smaplot15 = input (true, title="MA987")
len15 = input.int(987, minval=1, title="ma Length")
out15 = exponential ? ta.ema(src, len15) : ta.sma(src, len15)
up15 = out15 > out15[1]
down15 = out15 < out15[1]
mycolor15 = up15 ? #3cfe12 : down15 ? #ff0202 : #008eff
plot(out15 and smaplot15 ? out15 :na , title="987", color=mycolor15, linewidth=1)

smaplot16 = input (true, title="MA1597")
len16 = input.int(1597, minval=1, title="ma Length")
out16 = exponential ? ta.ema(src, len16) : ta.sma(src, len16)
up16 = out16 > out16[1]
down16 = out16 < out16[1]
mycolor16 = up16 ? #3cfe12 : down16 ? #ff0202 : #008eff
plot(out16 and smaplot16 ? out16 :na , title="1597", color=mycolor16, linewidth=1)

smaplot17 = input (true, title="MA2584")
len17 = input.int(2584, minval=1, title="ma Length")
out17 = exponential ? ta.ema(src, len17) : ta.sma(src, len17)
up17 = out17 > out17[1]
down17 = out17 < out17[1]
mycolor17 = up17 ? #3cfe12 : down17 ? #ff0202 : #008eff
plot(out17 and smaplot17 ? out17 :na , title="2584", color=mycolor17, linewidth=1)

smaplot19 = input (true, title="MA4181")
len19 = input.int(4181, minval=1, title="ma Length")
out19 = exponential ? ta.ema(src, len19) : ta.sma(src, len19)
up19 = out19 > out19[1]
down19 = out19 < out19[1]
mycolor19 = up19 ? #3cfe12 : down19 ? #ff0202 : #008eff
plot(out19 and smaplot19 ? out19 :na , title="4181", color=mycolor19, linewidth=1)
//
string  GRP3 = "Visual MA Settings"
exponential5 = input(false, title="EMA or SMA", tooltip="EMA checked or SMA unchecked", group = GRP3)

smaplot50 = input (true, title="MA50")
len50 = input.int(50, minval=1, title="ma Length")
ma50 = exponential5 ? ta.ema(src, len50) : ta.sma(src, len50)
up50 = ma50 > ma50[1]
down50 = ma50 < ma50[1]
mycolor50 = up50 ? #3cfe12 : down50 ? #ff0202 : #008eff
plot(ma50 and smaplot50 ? ma50 :na , title="50", color=mycolor50, linewidth=1)

smaplot100 = input (true, title="MA100")
len100 = input.int(100, minval=1, title="ma Length")
ma100 = exponential5 ? ta.ema(src, len100) : ta.sma(src, len100)
up100 = ma100 > ma100[1]
down100 = ma100 < ma100[1]
mycolor100 = up100 ? #3cfe12 : down100 ? #ff0202 : #008eff
plot(ma100 and smaplot100 ? ma100 :na , title="100", color=mycolor100, linewidth=1)

smaplot150 = input (true, title="MA150")
len150 = input.int(150, minval=1, title="ma Length")
ma150 = exponential5 ? ta.ema(src, len150) : ta.sma(src, len150)
up150 = ma150 > ma150[1]
down150 = ma150 < ma150[1]
mycolor150 = up150 ? #3cfe12 : down150 ? #ff0202 : #008eff
plot(ma150 and smaplot150 ? ma150 :na , title="150", color=mycolor150, linewidth=1)

smaplot200 = input (true, title="MA200")
len200 = input.int(200, minval=1, title="ma Length")
ma200 = exponential5 ? ta.ema(src, len200) : ta.sma(src, len200)
up200 = ma200 > ma200[1]
down200 = ma200 < ma200[1]
mycolor200 = up200 ? #3cfe12 : down200 ? #ff0202 : #008eff
plot(ma200 and smaplot200 ? ma200 :na , title="200", color=mycolor200, linewidth=1)
//
if (ta.crossover(long1, long2))
	strategy.entry("maL", strategy.long, comment="maLong")
if (ta.crossunder(short1, short2))
	strategy.entry("maS", strategy.short, comment="maShort")
////
```

> Detail

https://www.fmz.com/strategy/430766

> Last Modified

2023-11-01 16:42:41
