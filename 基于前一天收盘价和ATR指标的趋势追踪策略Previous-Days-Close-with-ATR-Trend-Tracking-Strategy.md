
> Name

基于前一天收盘价和ATR指标的趋势追踪策略Previous-Days-Close-with-ATR-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1767cffa0bc8a78a8d2.png)
[trans]

### 概述

本策略基于前一天的收盘价以及ATR指标设定多空头开仓价位和止损价位,实现对趋势的追踪。当价格突破开仓价位时开仓做多做空,止损或止盈后清仓。

### 策略原理

本策略使用前一天的收盘价、最高价、最低价以及ATR指标计算入场价位和止损价位。具体计算公式如下:

多头开仓价位 TPup = 前一天收盘价 + ATR \* 0.8
空头开仓价位 TPdown = 前一天收盘价 - ATR \* 0.8  

多头止损价位 slup = 前一天收盘价 + ATR \* 0.2
空头止损价位 sldown = 前一天收盘价 - ATR \* 0.2

多头止盈价位 profitlevelup = 前一天最低价 + ATR \* 1.7  
空头止盈价位 profitleveldown = 前一天最高价 - ATR \* 1.7

当价格突破多头开仓价位 TPup 时,按照 10 手数做多;当价格突破空头开仓价位 TPdown 时,按照 10 手数做空。之后设置止损和止盈,价格触及止损价位后止损清仓,触及止盈价位后止盈清仓。

### 优势分析

本策略主要优势有:

1. 使用ATR指标设定动态的开仓价位和止损价位,可以根据市场波动度进行调整,使交易更加适应市场环境。

2. 利用前一天收盘价确定方向,再结合ATR指标确定具体的交易价位,避免被噪音太多的实时价格误导。

3. 同时设置止损和止盈机制,可以很好控制单笔交易的风险。

### 风险分析

本策略主要风险有:  

1. ATR指标设定的价位可能过于理想化,无法真正反映市场情况,导致频繁止损。可以适当调整ATR参数或加大止损幅度。

2. 前一天收盘价无法确定未来趋势,如果出现剧烈反转,会误导交易方向选择。可以考虑结合其他指标确认趋势。  

3. 止损和止盈位置可能被操纵触发,无法真正止损。可以设置成分批止损,避免被套。

### 优化方向  

本策略可以从以下几个方面进行优化:

1. 优化ATR参数,使交易价位更符合市场波动性。

2. 增加趋势判断机制,避免交易反转市。例如结合MA等指标。

3. 调整止盈幅度,在保持盈利性的同时减少盈利点被触发的概率。  

4. 设置成分批止损和止盈,降低被套和损失的概率。

5. 增加仓位管理机制,可以加大趋势阶段的仓位。

### 总结  

本策略基于前一天收盘价和ATR指标设定动态的交易价位,实现对趋势的有效跟踪。同时设置止损和止盈机制控制单笔交易的风险。优化方向包括参数优化、判断机制增加、止盈调整以及仓位管理等。总体来说,本策略较好地实现了追趋势交易的效果。

||

### Overview  

This strategy sets long and short entry price levels and stop loss price levels based on previous day's close price and ATR indicator to track the trend. It goes long or short when price breaks through the entry price levels, and flattens positions on stop loss or take profit.

### Strategy Logic  

This strategy uses previous day's close price, high price, low price and ATR indicator to calculate entry price levels and stop loss levels. The specific formulas are as follows:

Long entry price level TPup = Previous day's close + ATR * 0.8  
Short entry price level TPdown = Previous day's close - ATR * 0.8

Long stop loss level slup = Previous day's close + ATR * 0.2  
Short stop loss level sldown = Previous day's close - ATR * 0.2  

Long take profit level profitlevelup = Previous day's low + ATR * 1.7   
Short take profit level profitleveldown = Previous day's high - ATR * 1.7  

When price breaks through TPup, go long 10 lots. When price breaks through TPdown, go short 10 lots. Then set stop loss and take profit. Exit positions on stop loss trigger or take profit trigger.

### Advantage Analysis   

The main advantages of this strategy are:  

1. Using ATR indicator to set dynamic entry price levels and stop loss levels based on market volatility, making trades more adaptive to market conditions.  

2. Using previous day's close to determine direction and combining with ATR indicator to identify specific trade levels, avoiding being misled by too much real-time price noise.

3. Setting both stop loss and take profit mechanisms to effectively control the risk of each trade.  

### Risk Analysis

The main risks of this strategy are:

1. The price levels set by ATR may be too idealistic to truly reflect market conditions, leading to frequent stop loss triggers. Parameters of ATR can be adjusted or stop loss range can be widened.  

2. Previous day's close cannot determine future trends. Drastic reversals may mislead directional choices. Other indicators can be combined to confirm trends.

3. Stop loss and take profit may be manipulated to trigger, failing to truly stop loss. Batch stop loss can be used to avoid being trapped.  

### Optimization Directions   

This strategy can be optimized in the following aspects:

1. Optimize ATR parameters to make trade levels fit better with market volatility.  

2. Add trend judging mechanisms to avoid trading reversals, e.g. combining with MA indicators.

3. Adjust take profit range, keeping profitability while reducing probability of profit taking triggers.   

4. Set batch stop loss and profit taking to reduce probability of being trapped or losing.

5. Add position sizing mechanism to increase positions in trending phases.  

### Conclusion  

This strategy sets dynamic trade levels based on previous day's close and ATR to effectively track trends. It also uses stop loss and take profit to control single trade risks. Optimization directions include parameter tuning, judging mechanism enhancement, take profit adjustment and position sizing etc. In general, this strategy achieves good trend following effects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|lookback length of ATR|
|v_input_2|0.8|Entry level for ATR|
|v_input_3|1.7|Exit level for ATR|
|v_input_4|0.2|Stop loss level for ATR|
|v_input_5|2014|Backtest Starting year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("PC with ATR Strategy (by Zhipengcfel)", shorttitle="PC_ATR", pyramiding=1, overlay=true)

// Zhipengcfel's Previous day's close with ATR Strategy
//
// Version 1.0
// @copyright Idea by Zhipengcfel on June 29, 2017.

//Previous day's close plus ATR strategy. 
//Buy (if breaking PC+ATR*0.8) or sell (if breaking PC-0.8*ATR). 

//This is just a demo vision and can not be used for real auto trading



///////////// ATR value
ATRlength = input(14, minval=1, title="lookback length of ATR")
//ATR = atr(ATRlength)
ATR = request.security(syminfo.tickerid, 'D', atr(ATRlength))

///////////// Entry levels and target levels
entr = input(0.8, minval=0.1, step = 0.05, title="Entry level for ATR")
tplevel = input(1.7, minval=0.1, step = 0.05, title="Exit level for ATR")
yesterday = request.security(syminfo.tickerid, 'D', close[1])
dl = request.security(syminfo.tickerid, 'D', low[1])
dh = request.security(syminfo.tickerid, 'D', high[1])
TPup = yesterday+entr*ATR
TPdown = yesterday-entr*ATR
profitlevelup = dl+tplevel*ATR
profitleveldown = dh-tplevel*ATR

///////////// Stop loss level
sl = input( 0.2  ,minval=0.01, step = 0.05, title="Stop loss level for ATR") //82 for 2, 83 for 3 and more positions
slup = yesterday+sl*ATR
sldown = yesterday-sl*ATR

///////////// Starting year to backtest
yer = input( 2014  , title="Backtest Starting year")


///////////// strategy: PC + ATR
if (close > TPup) and (close < profitlevelup)
    strategy.entry("LONG", strategy.long, 10, comment="Buy", when = year > yer, oca_name="My oca")
    strategy.exit("Stopped", "LONG",  stop = slup, limit= profitlevelup, oca_name="My oca")
            

if (close < TPdown) and (close > profitleveldown)
    strategy.entry("SHORT", strategy.short, 10, comment="Sell", when = year > yer, oca_name="My oca")
    strategy.exit("Stopped", "SHORT", stop = sldown, limit= profitleveldown, oca_name="My oca")
 
```

> Detail

https://www.fmz.com/strategy/440536

> Last Modified

2024-01-31 14:39:09
