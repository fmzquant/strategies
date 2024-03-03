
> Name

平滑移动平均止损策略Smooth-Moving-Average-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1059b731b9559423842.png)
 [trans]

### 概述

该策略利用平滑移动平均线和平均真实价格范围计算两个止损价位,在突破止损价位时进行反向开仓,实现趋势跟踪止损。策略适合高波动的数字货币交易,可以有效锁定盈利,避免亏损扩大。

### 策略原理

1. 计算最近n周期的平均真实价格波动范围atr,并用RMA方法进行平滑
2. 多头止损价位为最高价减去atr,空头止损价位为最低价加上atr
3. 当价格突破向上止损线时做空,突破向下止损线时做多
4. 止损线会随着价格运行不断更新,实现动态跟踪

该策略通过计算ATR确定合理的止损范围,再结合RMA方法平滑止损线,避免被价格小幅震荡触发止损。当趋势产生转折时,能够快速识别信号,按反向价格突破止损线的方式建立头寸。

### 优势分析

1. 平滑移动止损线,有效过滤噪音,避免虚假信号
2. 动态跟踪止损点,可锁定大部分趋势获利
3. 参数稳定,适合中长线持仓
4. 实现全自动交易,无需人工干预

### 风险分析

1. 止损幅度可能过大,应适当调整ATR周期和倍数
2. 当趋势不明显时,可能出现较多平仓次数
3. 应注意合理设置入场条件,避免追涨杀跌

可通过适当缩短ATR周期或减小ATR倍数来缩小止损幅度,或者增加其他过滤条件来减少不必要开仓。注意控制实际杠杆和仓位规模,应对市场剧烈变动。

### 优化方向 

1. 在ATR参数基础上,可以添加其他指标判断趋势
2. 优化开仓逻辑,设定更严格的突破过滤条件 
3. 增加移动止盈功能
4. 结合机器学习算法实现止损线优化

综合其他 oscillator 指标判断趋势方向,避免在震荡期无效开仓。优化入场逻辑,确保止损线突破后价格能持续运行一定幅度。加入移动止盈线以锁定更多利润。使用机器学习训练更优的止损函数。

### 总结
该策略通过计算平滑移动平均止损线,实现对高波动数字货币市场的动态跟踪止损,能够有效控制风险。策略参数较为稳定,适合自动化交易。可在此基础上进行多维度优化,结合更多指标和算法提高效果。

||

### Overview

This strategy uses smooth moving average lines and average true range to calculate two stop loss price levels. It opens reverse positions when prices break through the stop loss levels to achieve stop loss trailing of trends. The strategy is suitable for highly volatile cryptocurrency trading and can effectively lock in profits and avoid losses.

### Strategy Logic

1. Calculate the average true price range atr of the recent n periods and smooth it using the RMA method
2. The long stop loss price level is the highest price minus atr, and the short stop loss price level is the lowest price plus atr  
3. When the price breaks through the upper stop loss line, go short; when it breaks through the lower stop loss line, go long
4. The stop loss lines are constantly updated as the price moves to achieve dynamic trailing

This strategy determines a reasonable stop loss range through ATR calculation and then uses the RMA method to smooth the stop loss lines to avoid triggering stops by small price fluctuations. When a trend reversal occurs, it can quickly identify signals and establish positions by breaking the stop loss lines in the reverse direction.  

### Advantage Analysis

1. Smooth moving stop loss lines effectively filter noise and avoid false signals
2. Dynamically trailing stop loss points can lock in most trend profits  
3. Stable parameters, suitable for medium and long-term holdings
4. Achieves fully automated trading without manual intervention

### Risk Analysis  

1. The stop loss range may be too large and the ATR period and multiplier should be adjusted accordingly
2. There may be more frequent closing of positions when the trend is unclear
3. Appropriate entry conditions should be set to avoid chasing rises and falls

The stop loss range can be reduced by appropriately shortening the ATR period or reducing the ATR multiplier, or additional filters can be added to reduce unnecessary opening of positions. Pay attention to controlling actual leverage and position sizing to cope with drastic market changes.

### Optimization Directions

1. Other indicators can be added on the basis of ATR parameters to determine the trend
2. Optimize the opening logic and set stricter breakout filters  
3. Add moving profit taking functions 
4. Optimize stop loss lines with machine learning algorithms

Judging the trend direction with other oscillator indicators can avoid ineffective opening during consolidation. Optimize entry logic to ensure price can continue running for a certain range after breaking through the stop loss line. Add moving profit taking lines to lock in more profits. Use machine learning to train better stop loss functions.

### Summary
This strategy dynamically trails highly volatile cryptocurrency markets with smooth moving average stop loss lines to effectively control risks. The strategy parameters are relatively stable, making it suitable for automated trading. It can be optimized across multiple dimensions by combining more indicators and algorithms to improve performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|數據來源: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|ATR 周期|
|v_input_3|2.618|ATR 乘數|
|v_input_4|2017|設定範圍：年|
|v_input_5|11|＿＿＿＿＿月|
|v_input_6|true|＿＿＿＿＿日|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-31 00:00:00
end: 2024-01-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
//  作品: [LunaOwl] 超級趨勢2
//
////////////////////////////////
//     ~~!!*(๑╹◡╹๑) **       //
//  製作: @LunaOwl 彭彭       //
//  第1版: 2019年05月29日     //
//  第2版: 2019年06月12日     //
//  微調:  2019年10月26日     //
//  第3版: 2020年02月12日     //
////////////////////////////////
//
//
//超級趨勢的缺點：
//--1.止損距離可能相當大, 請自己調整週期
//--2.市場沒有存在明顯趨勢的時候表現不佳
//
//超級趨勢的優點：
//--1.具有可以參考的移動止損線, 適合新手
//--2.市場存在明顯趨勢的時候表現會很不錯
//
//使用須知：
//--1.每筆交易都需要下移動止損單, 絕對要下
//--2.中途被針掃出場時不要急著再進去
//--3.當錯失機會不要追高追低, 等待下次機會
//--4.實質槓桿比率不要太高, 不要輕忽市場變化
//--5.訂單進出場都建議分成五份、十份區間掛單
//--6.不要妄圖賺到市場上的每一分錢
//
//稍做更新：
//--1.平均真實區間利用了遞迴均線減少雜訊
//--2.針對高波動率的小幣市場，中期順勢策略應該以減少雜訊為重點
//--3.研究國外交易策略後，它們常用平滑因子過濾隨機走勢
//--4.績效上和其它平均法比較並沒有突出，但優點是參數變動穩定性
//--5.我選擇四小時線回測小幣市場，並且選擇經歷過牛熊市的以太坊

//==設定研究==//

//study(title = "[LunaOwl] 超級趨勢2", shorttitle = "[LunaOwl] 超級趨勢2", overlay = true)

//==設定策略==//

strategy(
     title               = "[LunaOwl] 超級趨勢2",
     shorttitle          = "[LunaOwl] 超級趨勢2",
     format              = format.inherit,
     overlay             = true,
     calc_on_order_fills = true,
     calc_on_every_tick  = false,
     pyramiding          =  0,      
     currency            = currency.USD,    
     initial_capital     = 10000,
     slippage            = 10,
     default_qty_value   = 100,
     default_qty_type    = strategy.percent_of_equity,
     commission_value    = 0.1
     )

//==設定參數==//

src = input(close, "數據來源")

length = input(
     title  = "ATR 周期", 
     type   = input.integer,
     minval = 1,
     maxval = 4,
     defval = 1
     )

//可以設定的精度為小數點後三位

mult = input(
     title  = "ATR 乘數", 
     type   = input.float,
     minval = 1.000, 
     maxval = 9.000,
     defval = 2.618,
     step   = 0.001
     )
     
atr = mult * atr(length) 
atr_rma = rma(atr, 14)  //平均真實區間添加遞回均線

//==算法邏輯==//

LongStop      = hl2 - atr_rma
LongStopPrev  = nz(LongStop[1], LongStop)
LongStop     := close[1] > LongStopPrev ? max(LongStop, LongStopPrev) : LongStop
 
ShortStop     = hl2 + atr_rma
ShortStopPrev = nz(ShortStop[1], ShortStop)
ShortStop    := close[1] < ShortStopPrev ? min(ShortStop, ShortStopPrev) : ShortStop

dir  = 1
dir := nz(dir[1], dir)
dir := dir == -1 and close > ShortStopPrev ? 1 :
       dir ==  1 and close < LongStopPrev ? -1 : 
       dir

LongStop_data  = dir == 1 ? LongStop : na
ShortStop_data = dir == 1 ? na : ShortStop

LongMark  = dir ==  1 and dir[1] == -1 ? LongStop : na
ShortMark = dir == -1 and dir[1] == 1 ? ShortStop : na

LongColor  = #0D47A1  //普魯士藍
ShortColor = #B71C1C  //酒紅色

//==設置止損線==//

plot(LongStop_data,
     title     = "移動止損線",
     style     = plot.style_linebr,
     color     = LongColor,
     linewidth = 1
     )
     
plot(ShortStop_data,
     title     = "移動止損線",
     style     = plot.style_linebr,
     color     = ShortColor,
     linewidth = 1 
     )

//==設定K線顏色==//

barcolor(dir == 1 ? LongColor : ShortColor, title = "K線顏色")

//==設定快訊通知==//

alertcondition(LongMark,
     title   = "多頭標記", 
     message = "多頭標記: 行情可能出現潛在變化，請注意個人的對沖或空頭部位，留意風險。")
     
alertcondition(ShortMark,
     title   = "空頭標記", 
     message = "空頭標記: 行情可能出現潛在變化，請注意個人的現貨或多單持倉狀況，留意風險。")

// - 設定日期範圍 - //

test_Year   = input(2017, title = "設定範圍：年", minval = 1, maxval = 2140) 
test_Month  = input(  11, title = "＿＿＿＿＿月", minval = 1, maxval =   12)
test_Day    = input(  01, title = "＿＿＿＿＿日", minval = 1, maxval =   31)
test_Period = timestamp( test_Year, test_Month, test_Day, 0, 0)

// - 買賣條件 - //

Long = src > LongStop_data
strategy.entry("多頭進場", strategy.long, when = Long)
strategy.close("多頭出場", when = Long) 

Short = src < ShortStop_data
strategy.entry("空頭進場", strategy.short, when = Short)
strategy.close("空頭回補", when = Short) 
```

> Detail

https://www.fmz.com/strategy/440534

> Last Modified

2024-01-31 14:25:29
