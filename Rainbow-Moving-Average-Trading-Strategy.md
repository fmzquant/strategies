
> Name

Rainbow-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


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
