
> Name

高效震荡突破双安全盈亏策略Efficient-Oscillation-Breakthrough-Dual-Stop-Profit-and-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12a9971cd6c5260a969.png)
[trans]

## 概述
该策略是一个基于通道指标和突破原理设计的高效双向交易策略。它可以在股票和数字货币的1分钟时间框架下实现高胜率的双向交易。

## 策略原理
策略使用SMA指标构建通道。当价格突破通道时,进行买入或卖出。同时设置止盈和止损,以锁定盈利和控制风险。

具体来说,策略计算通道的上轨和下轨。上轨是收盘价的10周期简单移动平均线再乘以1.02;下轨是最低价的10周期简单移动平均线再除以1.02。当收盘价突破上轨时,做多;当收盘价跌破下轨时,做空。

做多后会设置两个止盈价位,第一个为1%,第二个为3%,同时设置3%的止损。做空也是同理设置盈亏位。该策略可以通过突破原理实现较高的进入胜率,通过双止盈可以锁定更多盈利,通过止损控制单笔亏损。

## 优势分析
这种基于通道指标的突破策略,具有进入信号明确、操作频率较高、可锁定多级别盈利等优势。具体优势有:

1. 使用通道指标,可以识别股价的震荡范围,选择突破点位入场,从而获得较高的获胜概率。

2. 在1分钟级别操盘,可以捕捉更多机会,满足速度交易者的需求。

3. 设置两个止盈点,可以在行情好转时锁定更多利润。比一般的单一止盈收益更高。

4. 止损设置较大,给予行情一定运行空间,避免过早止损。

## 风险分析
这类突破策略最大的风险在于容易形成虚假突破导致亏损。另外,止损较大也会增加亏损风险。主要风险点如下:  

1. 突破信号可能是虚假突破,无法继续运行达到止盈或止损。这是技术分析中常见的问题。可以通过优化参数尽量避免。

2. 止损点设的较大,3%的单笔损失对于部分人来说可能难以承受。可以根据自身情况适当调整止损点。

3. 该策略更适合短线交易和盯盘操作。如果不能及时监控市场,建议降低仓位规模。

## 优化方向 
这类基于趋势突破思路的策略,主要可以从以下几个方面进行优化:

1.测试更多指标构建通道,寻找更加可靠的通道指标,以减少虚假突破。

2.优化移动平均线周期参数,找到最佳参数组合。

3.测试更复杂的进场机制,如增加量能指标等过滤条件。

4.可以根据不同品种特点,设定不同的参数组合进行适配,实现参数自适应。

5.加入自动止损保本机制,可以随行情时间推移动态调整止损点。

## 总结
这是一个基于通道指标设计的高效双向交易策略。它利用突破原理进入市场,双止盈锁定盈利,止损控制风险,可以通过优化获得较好的投资效果。但交易者仍需警惕虚假突破等技术分析风险。

||

## Overview
This is a highly efficient dual-directional trading strategy designed based on channel indicators and breakout principles. It can achieve high win-rate dual-directional trading on stocks and cryptocurrencies in 1-minute timeframes.

## Strategy Logic  
The strategy uses SMA indicators to build channels. It enters long when price breaks out above the channel and enters short when prices breaks out below the channel. Take profit and stop loss are also set to lock in profits and control risks.   

Specifically, the strategy calculates the upper and lower rail of the channel. The upper rail is the 10-period SMA of close price multiplied by 1.02; The lower rail is the 10-period SMA of lowest price divided by 1.02. Go long when close price breaks out above upper rail, go short when close price breaks below lower rail.

After going long, two take profit levels are set at 1% and 3% respectively, with a 3% stop loss. Going short has similar profit/loss settings. Through breakout principles the strategy can achieve relatively high entry win rate; through dual take profits it can lock in more profits; through stop loss it controls per trade loss amount.  

## Advantage Analysis
Channel breakout strategies like this have advantages like clear entry signals, high operation frequency, multi-level profit taking, etc. The main advantages are:  

1. Using channel indicators to identify price oscillation range and picking breakout points to enter can obtain relatively high win rate.

2. Operating on 1-minute chart to capture more opportunities and suit need for speed trading.

3. Having two take profit levels allows locking in more profits when trend goes well. Higher reward compared to just one take profit target.  

4. Relatively wide stop loss gives the price movement some space, avoiding premature stop loss.

## Risk Analysis   
The biggest risk with such breakout strategies is false breakouts leading to losses. Also, large stop loss can increase loss risks. Main risk points:

1. Breakout signals may be false breakouts and fail to reach take profit or stop loss. A common issue in technical analysis. Parameter optimization can help avoid.  

2. Stop loss threshold at 3% could be hard for some traders to withstand. Adjust based on personal risk tolerance.

3. This strategy suits more short-term trading and needs monitoring. Reduce positions if unable to watch the markets.  

## Optimization Directions
Trend breakout strategies like this can optimize mainly in below aspects:  

1. Test more indicators to build channels and find more reliable ones to reduce false breakouts.

2. Optimize moving average parameter tuning, discover best parameter combinations. 

3. Test more complex entry mechanisms, like adding volume filters etc.  

4. Set parameter combos adaptive to different products' characteristics to achieve parameter self-adaption.

5. Add auto stop loss mechanisms that dynamically adjust stop loss over time.

## Conclusion  
This is an efficient dual-directional trading strategy built upon channel indicators. It enters markets through breakout principles, dual take profits to lock in rewards, stop loss to control risks. Further optimization can achieve even better results. But traders still need to beware risks like false breakouts.  


[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Period|
|v_input_2|10|Length|
|v_input_3|true|Multiplier|
|v_input_4|true|Take Profit 1 (%)|
|v_input_5|20|Take Profit 2 (%)|
|v_input_6|3|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-25 00:00:00
end: 2024-01-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Erweiterte SSL Channel Strategy mit 2 TPs, SL und BE", overlay=true)

period = input(title="Period", defval=10)
len = input(title="Length", defval=10)
multiplier = input(title="Multiplier", defval=1.0, minval=1.0)
tp1Percent = input(title="Take Profit 1 (%)", defval=1.0) / 100
tp2Percent = input(title="Take Profit 2 (%)", defval=20.0) / 100
slPercent = input(title="Stop Loss (%)", defval=3.0) / 100

var float tp1Price = na
var float tp2Price = na
var float slPrice = na
var bool tp1Reached = false

smaHigh = sma(high * multiplier, len)
smaLow = sma(low / multiplier, len)

Hlv = 0
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : nz(Hlv[1])
sslDown = Hlv < 0 ? smaHigh : smaLow
sslUp = Hlv < 0 ? smaLow : smaHigh

plot(sslDown, linewidth=2, color=color.red)
plot(sslUp, linewidth=2, color=color.lime)

longCondition = crossover(close, sslUp)
shortCondition = crossunder(close, sslDown)

if (longCondition)
    strategy.entry("Long", strategy.long)
    tp1Price := strategy.position_avg_price * (1 + tp1Percent)
    tp2Price := strategy.position_avg_price * (1 + tp2Percent)
    slPrice := strategy.position_avg_price * (1 - slPercent)
    tp1Reached := false

if (shortCondition)
    strategy.entry("Short", strategy.short)
    tp1Price := strategy.position_avg_price * (1 - tp1Percent)
    tp2Price := strategy.position_avg_price * (1 - tp2Percent)
    slPrice := strategy.position_avg_price * (1 + slPercent)
    tp1Reached := false

// Take Profit, Break-even und Stop-Loss Logik
if (strategy.position_size > 0) // Long-Positionen
    if (not tp1Reached and close >= tp1Price)
        strategy.close("Long", qty_percent = 50)
        strategy.exit("BE Long", "Long", stop = strategy.position_avg_price)
        tp1Reached := true
    if (tp1Reached and close < tp1Price)
        strategy.exit("BE Long", "Long", stop = strategy.position_avg_price)
    if (close >= tp2Price)
        strategy.close("Long", qty_percent = 100)
    if (not tp1Reached)
        strategy.exit("SL Long", "Long", stop = slPrice)

if (strategy.position_size < 0) // Short-Positionen
    if (not tp1Reached and close <= tp1Price)
        strategy.close("Short", qty_percent = 50)
        strategy.exit("BE Short", "Short", stop = strategy.position_avg_price)
        tp1Reached := true
    if (tp1Reached and close > tp1Price)
        strategy.exit("BE Short", "Short", stop = strategy.position_avg_price)
    if (close <= tp2Price)
        strategy.close("Short", qty_percent = 100)
    if (not tp1Reached)
        strategy.exit("SL Short", "Short", stop = slPrice)

```

> Detail

https://www.fmz.com/strategy/440719

> Last Modified

2024-02-01 14:46:00
