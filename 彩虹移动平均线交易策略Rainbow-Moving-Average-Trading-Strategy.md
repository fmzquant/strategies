
> Name

彩虹移动平均线交易策略Rainbow-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

彩虹移动平均线交易策略基于彩虹移动平均线指标设计。该策略通过构建包含7条移动平均线的彩虹移动平均线系统判断趋势方向,配合RSI指标过滤虚假信号,实现低风险交易入场。

## 策略原理

该策略主要通过以下几个步骤实现交易信号的产生:

1. 构建彩虹移动平均线系统。该系统包含7条移动平均线,其中第一条移动平均线周期为12,源数据为收盘价的平均值。其余6条移动平均线的周期依次递减3周期,源数据为前一条移动平均线的值。

2. 判断趋势方向。如果第一条移动平均线位于彩虹移动平均线的最上方,定义为上涨趋势;如果位于最下方,定义为下跌趋势;如果位于中间,定义为盘整。

3. 产生交易信号。当彩虹移动平均线系统的趋势从上涨变为下跌时,产生卖出信号;当趋势从下跌变为上涨时,产生买入信号;当趋势从盘整变为上涨或下跌时,平掉当前头寸。

4. RSI过滤器。仅当RSI指标显示情况正常时,才接受交易信号。第一个RSI指标要求位于过买过卖区域之间,避免假突破;第二个RSI要求不能位于中间区域,确保突破的动量足够。

## 策略优势

该策略具有以下优势:

1. 彩虹移动平均线系统可以准确判断趋势方向。多个移动平均线组合可以有效过滤市场噪音,识别趋势反转。

2. RSI指标双重过滤机制,可以有效过滤虚假突破信号,避免被套。第一个RSI确保位于正常区域,第二个RSI确保突破力度足够大。

3. 结合趋势和反转指标,可以在趋势发生转折时及时入场,又可以避免追涨杀跌。

4. 盘整阶段主动平仓,可以避免regionselection盘整市场的风险。

5. 该策略参数优化空间大,可以通过调整移动平均线周期、长度比例、RSI参数等,针对不同品种和周期进行优化,从而获得更好的效果。

## 策略风险

该策略主要存在以下风险:

1. 当趋势反转不明显时,可能产生错觉反转信号,从而造成交易亏损。可以适当调整移动平均线周期,使反转信号更加明确。

2. 标的出现长时间区域盘整时,会频繁打开和平仓,增加交易成本和滑点损耗。可以通过优化RSI参数,增加盘整阶段的过滤强度。 

3. 反转迟缓时,反转信号发出后,亏损扩大的时间和空间。可以加大移动平均线周期差异,使信号发出更及时。

4. 参数设定不当时,可能过滤掉部分正确信号,或使信号产生滞后。需要根据不同品种特点调整参数。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 移动平均线参数优化。可以优化移动平均线的周期长度、周期差异比例、移动平均方式(SMA或EMA)等参数,以获得更准确的趋势判断。

2. RSI参数优化。可以优化RSI的周期长度、过买区域、过卖区域、中立区域等参数,使过滤更加精确有效。

3. 时间周期优化。可以测试不同的时间周期,选择最适合该策略的时间周期,以获得最佳效果。

4. 品种优化。可以根据不同品种的特点,调整参数或规则,使策略对该品种效果最佳。

5. 增加止损止盈机制。可以根据回测结果,设定合理的止损止盈水平,控制单笔交易的风险和收益大小。

## 总结

彩虹移动平均线交易策略利用趋势判断和信号过滤相结合的方式,实现了在趋势转折点捕捉信号的效果。该策略具有判断准确、风险可控的特点,通过参数优化和规则完善,可以成为一个非常实用的量化交易策略。总体来说,该策略值得深入研究与应用。

||

## Overview

The Rainbow Moving Average trading strategy is designed based on the Rainbow Moving Average indicator. This strategy identifies trend direction through a rainbow moving average system with 7 moving averages, and filters out false signals with the RSI indicator to achieve low-risk entry.

## Strategy Logic

The strategy generates trading signals through the following steps:

1. Build the rainbow moving average system. It contains 7 moving averages. The first moving average has a period of 12 and takes the closing price as source data. The other 6 moving averages have progressively decreasing periods of 3, with previous moving average as source. 

2. Determine trend direction. If the first moving average is on top of the rainbow, define it as uptrend. If it's at the bottom, define it as downtrend. If it's in the middle, define it as consolidation.

3. Generate signals. When the trend changes from uptrend to downtrend, a sell signal is generated. When the trend changes from downtrend to uptrend, a buy signal is generated. When the trend changes from consolidation to uptrend or downtrend, close existing position. 

4. RSI filter. Only accept signals when RSI shows normal status. The first RSI should be between overbought and oversold zone to avoid false breakout. The second RSI should be outside of middle zone to ensure strong momentum.

## Advantages

The advantages of this strategy include:

1. The rainbow moving average system accurately identifies trend direction. Multiple moving averages combine to filter out market noise and spot trend reversal.

2. The dual RSI filter mechanism effectively avoids false breakout signals and being trapped. The first RSI ensures being in normal zone while the second RSI guarantees strong enough momentum.

3. Combining trend and reversal indicators allows timely entry at trend reversal, while avoiding chasing momentum. 

4. Active position closing during consolidation avoids the risk of range-bound markets.

5. The strategy offers large parameter optimization space, which can be tuned for different products and timeframes to achieve better results.

## Risks

The main risks of this strategy:

1. Unclear trend reversal may generate false signals and cause losses. Adjusting moving average periods can make reversal signals clearer.

2. Frequent opening and closing during long consolidation increases costs and slippage. Optimizing RSI parameters can strengthen filtration in consolidation.

3. Delayed reversal enlarges losses after initial signal. Increasing moving average period difference makes signals timelier. 

4. Improper parameter settings may filter out correct signals or cause signal lagging. Parameters need to be adjusted per product character.

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Moving average parameter optimization, including period length, period ratio, MA type etc, to make trend judgment more accurate.

2. RSI parameter optimization, including period, overbought/oversold levels, neutral zone etc, to make filtration more precise.

3. Timeframe optimization, to find the optimal timeframe.

4. Product optimization, to adjust parameters and rules to best fit different products. 

5. Adding stop loss and take profit to control risk and profit size.

## Conclusion

The Rainbow Moving Average trading strategy combines trend determination and signal filtering to capture reversal signals effectively. With accurate judgment and controllable risks, this strategy can become very practical after parameter tuning and logic refinement. Overall, it is worth in-depth research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hlc3|0|(?=== Rainbow Moving Average ===)Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_2|0|Type: SMA|EMA|
|v_input_3|12|Period|
|v_input_4|3|Displacement|
|v_input_5|blue|(?=== Trend Color ===)Up|
|v_input_6|red|Down|
|v_input_7|yellow|No|
|v_input_8|0|(?=== RSI Filter ===)Filter: Enable|Disable|
|v_input_9|12|(?Over Filter)Period|
|v_input_10|65|Overbought|
|v_input_11|35|Oversold|
|v_input_12|9|(?Middle Filter)Period|
|v_input_13|56|Upper|
|v_input_14|44|Lower|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//╔════════════════════════════════════════════════════════════════════════════╗
//║Rainbow Backtesting base on "Rainbow Moving Average" Strategy as below:     ║
//║1.Rainbow Moving Average setup                                              ║
//║- Source: source of 1st MA                                                  ║
//║- Type: SMA/EMA                                                             ║
//║- Period: period of 1st MA                                                  ║
//║- Displacement: period of 2nd MA to 7th MA with source is previous MA       ║
//║2.Trend Define                                                              ║
//║- Up Trend: Main MA moving at the top of Rainbow                            ║
//║- Down Trend: Main MA moving at the bottom of Rainbow                       ║
//║- Sideway: Main MA moving between the top and the bottom of Rainbow         ║
//║3.Signal                                                                    ║
//║- Buy Signal: When Rainbow change to Up Trend.                              ║
//║- Sell Signal: When Rainbow change to Down Trend.                           ║
//║- Exit: When Rainbow change to Sideway.                                     ║
//║4.RSI Filter                                                                ║
//║- "Enable": Only signals have 1st RSI moving between Overbought and Oversold║
//║and 2nd RSI moving outside Middle Channel are accepted.                     ║
//║- The filter may help trader avoid bull trap, bear trap and choppy market.  ║
//╚════════════════════════════════════════════════════════════════════════════╝

//@version=4
strategy("Rainbow Strategy Backtesting",overlay=false)
//++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++ Rainbow Moving Average +++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++
rainbow_tt="=== Rainbow Moving Average ==="
ma1_source=input(hlc3,title="Source",type=input.source, inline="set1", group=rainbow_tt)
rb_type=input("SMA",title="Type",options=["SMA","EMA"], inline="set1", group=rainbow_tt)
ma1_len=input(12,title="Period", inline="set2", group=rainbow_tt)
dis_len=input(3,title="Displacement", inline="set2", group=rainbow_tt,minval=2)
trend_tt="=== Trend Color ==="
up_col=input(color.new(color.blue,0),title="Up",inline="Color",group=trend_tt)
dn_col=input(color.new(color.red,0),title="Down",inline="Color",group=trend_tt)
sw_col=input(color.new(color.yellow,0),title="No",inline="Color",group=trend_tt)
//1st
ma1=rb_type=="SMA"?sma(ma1_source,ma1_len):ema(ma1_source,ma1_len)
//2nd
ma2=rb_type=="SMA"?sma(ma1,dis_len):ema(ma1,dis_len)
//3rd
ma3=rb_type=="SMA"?sma(ma2,dis_len):ema(ma2,dis_len)
//4
ma4=rb_type=="SMA"?sma(ma3,dis_len):ema(ma3,dis_len)
//5
ma5=rb_type=="SMA"?sma(ma4,dis_len):ema(ma4,dis_len)
//6
ma6=rb_type=="SMA"?sma(ma5,dis_len):ema(ma5,dis_len)
//7
ma7=rb_type=="SMA"?sma(ma6,dis_len):ema(ma6,dis_len)
//MinMax
rb_max=max(ma1,ma2,ma3,ma4,ma5,ma6,ma7)
rb_min=min(ma1,ma2,ma3,ma4,ma5,ma6,ma7)
dir_col=
       ma1==rb_max?up_col:
       ma1==rb_min?dn_col:
       sw_col
dir_style=shape.circle
plotshape(dir_col[1]==dir_col?0:na,title="Trend",style=dir_style,color=dir_col,location=location.absolute)
//++++++++++++++++++++++++++++++++++++++
//+++++++++++++ RSI Filter +++++++++++++
//++++++++++++++++++++++++++++++++++++++
rsi_tt="=== RSI Filter ==="
rsi_filter=input("Enable",title="Filter",options=["Enable","Disable"],inline="set",group=rsi_tt)
over_tt="Over Filter"
rsi_len_1=input(12,title="Period",inline="set",group=over_tt)
rsi_ovb=input(65,title="Overbought",inline="set",group=over_tt)
rsi_ovs=input(35,title="Oversold",inline="set",group=over_tt)
rsi_1=rsi(close,rsi_len_1)
mid_tt="Middle Filter"
rsi_len_2=input(9,title="Period",inline="set",group=mid_tt)
rsi_mid_top=input(56,title="Upper",inline="set",group=mid_tt)
rsi_mid_bot=input(44,title="Lower",inline="set",group=mid_tt)
rsi_2=rsi(close,rsi_len_2)
//Status
var rsi_status="None"
if (rsi_1>rsi_ovs and rsi_1<rsi_ovb) and (rsi_2[1]<rsi_mid_bot or rsi_2[1]>rsi_mid_top)
    rsi_status:="Normal"
else
    rsi_status:="None"
//Signal
BuySignal= 
       rsi_filter=="Disable"?
       dir_col[1]!=up_col
       and
       dir_col[0]==up_col
       :
       dir_col[1]!=up_col
       and
       dir_col[0]==up_col
       and
       rsi_status=="Normal"
       
SellSignal= 
       rsi_filter=="Disable"?
       dir_col[1]!=dn_col
       and
       dir_col[0]==dn_col
       :
       dir_col[1]!=dn_col
       and
       dir_col[0]==dn_col
       and
       rsi_status=="Normal"
       
exit=
       (dir_col[1]!=sw_col
       and
       dir_col[0]==sw_col)
buycol =
       BuySignal?
       up_col: na

sellcol =
       SellSignal?
       dn_col: na

exitcol =
       exit?
       sw_col: na

buy_style=shape.arrowup
sell_style=shape.arrowdown
exit_style=shape.square
plotshape(BuySignal?0:na,title="Buy",text="Buy",style=buy_style,color=buycol,location=location.absolute)
plotshape(SellSignal?0:na,title="Sell",text="Sell",style=sell_style,color=sellcol,location=location.absolute)
plotshape(exit?0:na,title="Exit",text="Exit",style=exit_style,color=exitcol,location=location.absolute)

filter=
       rsi_filter=="Enable"?
       dir_col[1]!=dir_col 
       and BuySignal==false 
       and SellSignal==false 
       and exit==false:
       na
filter_style=shape.xcross
filtercol=
       filter?
       dir_col:na
plotshape(filter?0:na,title="Filter",text="Filter",style=filter_style,color=filtercol,location=location.absolute)

//+++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++ Backtesting ++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++
strategy.entry("Long", strategy.long, when=BuySignal)
strategy.close("Long", when=exit or filter)
strategy.entry("Short", strategy.short, when=SellSignal)
strategy.close("Short", when=exit or filter)
//EOF
```

> Detail

https://www.fmz.com/strategy/428053

> Last Modified

2023-09-28 11:01:59
