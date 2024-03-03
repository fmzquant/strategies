
> Name

趋势追踪网格策略Trend-Following-Grid-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f6218f28d9ff096bad.png)
[trans]

#### 概述

该策略是一种只做多不做空,选择大趋势向上时段的趋势追踪网格策略。默认网格大小为1倍ATR,向下追踪建立1、2、3级网格进行追单,第5格止损。当空仓时如果价格突破上一网格,则整个网格向上移动追踪价格。

#### 策略原理

1. 使用EMA均线判断大趋势方向,EMA12大于EMA144则判断为大趋势向上
2. 只在大趋势向上时开仓做多
3. 网格大小默认为1倍ATR,可调整倍数
4. 向下追踪价格建立1、2、3级网格,分别开仓做多
5. 第5格设置止损点
6. 开仓后设置止损点和止盈点
7. 当价格上涨突破止盈点平仓
8. 当价格下跌触发止损点平仓
9. 当仓位全部平仓后,如果价格重新突破最后一个网格,则重新计算网格位置和数量,向上追踪

该策略通过EMA判断大趋势方向,再结合网格策略进行追踪,能够在大趋势向上行情中获得更大收益。网格设置多个价格点,分批建仓,能够降低单仓风险。止盈止损设置让利益能够得到锁定,也控制了最大亏损。当仓位全部平仓后,能够重新计算网格高点,实现再次开仓,从而将利润最大化。

#### 优势分析

1. 利用EMA判断大趋势方向,避免逆势开仓
2. 网格策略能够分批建仓,降低单仓风险
3. 止盈止损设置锁定利润,控制最大亏损
4. 仓位平仓后可以重新计算网格继续追涨,扩大获利空间

该策略主要优势在于把趋势交易和网格交易结合,既确保了趋势方向的正确性,也实现了网格策略的风险分散。此外,仓位平仓后重新计算网格可以无限追涨,从而在行情出现一波大涨时获得巨大利润。

#### 风险分析

1. 大趋势判断可能出错,进错方向
2. 行情出现大幅震荡,网格亏损过重
3. 亏损达到止损点过快,仓位全部平仓
4. 反弹后无法重新进入最佳入场点

主要的风险在于大趋势判断错误,这样会导致逆势建仓而大幅亏损。此外,如果行情出现剧烈震荡,多个网格同时被套牢的情况下亏损会加重。另外价格快速下跌触发止损也会导致仓位全部平仓,失去后续获利机会。价格反弹后很难再恰好进入初始最佳网格位置。

可以通过优化EMA参数提高大趋势判断准确性。调整网格间距和首单数量也可以控制总体亏损。止损点位置的设置需要考虑到行情波动频率。此外,也可以考虑部分仓位获利后就止盈了,而不是全部平仓。

#### 优化方向

该策略还可以从以下几个方向进行优化:

1. 优化EMA参数,提高大趋势判断的准确性
2. 调整网格间距和数量,优化获利风险比
3. 改进止盈止损逻辑,如部分仓位止盈、移动止损 等
4. 增加重新入场条件限制,避免反弹过程中过早重新入场
5. 结合更多指标判断入场时机,如K线形态、指标灵敏度等
6. 增加行情异常判断,避免异常行情中巨亏

通过这些优化措施,可以使策略在大行情中获得更大收益,同时可以控制风险,减少平常震荡走势中的损失。

#### 总结

该策略是趋势交易和网格交易的有机结合。它利用EMA判断大方向,再用网格策略分批建仓追涨。风险控制到位,有止盈止损和重新计算网格的追踪机制。总体来说,该策略能够在行情大趋势中获得不错的盈利,同时也控制了风险。如果进一步优化参数,提高判断准确性,收益可以更高。值得在实盘中进行详细测试和优化后投入使用。

||

#### Overview 

This strategy is a trend following grid strategy that only goes long and does not go short, choosing time periods when the major trend is up. The default grid size is 1xATR, building 1, 2, 3 grid levels downward for chasing orders, and the 5th grid stops loss. When the empty position reaches the previous grid, the entire grid moves up to track the price.

#### Strategy Logic

1. Use EMA lines to judge the major trend direction, EMA12 greater than EMA144 means the major trend is up
2. Only open long positions when the major trend is up  
3. The default grid size is 1xATR, the multiplier can be adjusted
4. Build 1, 2, 3 grid levels downward to track the price and open long positions separately  
5. Set the stop loss point at the 5th grid  
6. After opening positions, set stop loss points and take profit points
7. Close positions when the price breaks through the take profit point on rise
8. Close positions when the price hits the stop loss point on fall
9. After all positions are closed, if the price breaks through the last grid again, recalculate the grid location and quantity to track upwards

This strategy combines EMA to determine the major trend direction and grid trading to track the price. It can obtain greater returns in an uptrend. The grid sets multiple price points to open positions separately, which reduces the risk per position. The stop loss and take profit settings lock in profits and also limit maximum losses. After all positions are closed, the strategy can recalculate new high levels of grids to open positions again, maximizing profits.

#### Advantage Analysis

1. Use EMA to determine major trend direction, avoid opening positions against the trend 
2. Grid trading can open positions separately to reduce single position risk
3. Stop loss and take profit lock in profits, control maximum losses
4. After closing all positions, recalculating grids to continue chasing can expand profit space  

The main advantage is combining trend trading and grid trading, which ensures the correctness of trend direction and also achieves risk dispersion of grid trading. In addition, recalculating grids after closing positions allows unlimited chasing, obtaining huge profits when there is a big rally.

#### Risk Analysis

1. Major trend judgment may be wrong, entering in the wrong direction
2. Significant sideways volatility that causes heavy losses in grids  
3. Stop loss triggered too fast, closing all positions
4. Unable to re-enter optimal entry point after pullback

The main risk is the wrong judgment of major trend direction, which will lead to opening positions against the trend and huge losses. Also, if there is high sideways volatility with multiple grids being trapped, losses would be exacerbated. In addition, fast price drops may trigger stop loss and close all positions, losing subsequent profit opportunities. It would be hard to re-enter initial optimal grid levels after pullbacks.

Accuracy of major trend judgment can be improved by optimizing EMA parameters. Adjusting grid interval and size of first entry can also control overall losses. Stop loss position needs to consider market volatility frequency. Also, profit taking can be considered for partial positions instead of closing all positions.  

#### Optimization Directions

This strategy can also be optimized in the following aspects:

1. Optimize EMA parameters to improve accuracy of major trend judgment
2. Adjust grid intervals and quantities to optimize risk-reward ratio
3. Improve stop loss and take profit logic, e.g. partial take profit, trailing stop loss etc
4. Add more restrictions on re-entry conditions to avoid premature re-entry during pullbacks  
5. Incorporate more indicators to determine optimal entry timing, e.g. candlestick patterns, indicator sensitivity etc
6. Add outlier detection to avoid huge losses in anomalous market conditions

With these optimization measures, the strategy can obtain greater profits during significant trends, while also controlling risks and reducing losses in normal sideways volatility.  

#### Summary

This strategy combines trend trading and grid trading organically. It uses EMA to determine major direction and uses grid trading to open positions separately for chasing trends. With proper risk management including stop loss, take profit and grid recalculation mechanisms, this strategy can produce decent profits during major trends, while also controlling risks. Further optimizations on parameters and judgment accuracy can lead to higher profits. It is worth detailed testing and optimization for live trading.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|网格大小是多少倍ATR？|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © zxcvbnm3260

//@version=5
strategy("grid strategy long", overlay=true)


// 版本更新记录：
// v1.0 2021/11/09 只做多、不做空，选择大趋势向上的时间段。网格大小默认为1倍ATR，往下1、2、3个网格吃单，第5个网格止损。空仓时到达往上一个网格则网格整体抬升。（Only go long, not short, choose a time period when the general trend is up. The default grid size is 1x ATR, the next one, two, and three grids will take orders, and the fifth grid will stop loss. When the empty position reaches the upper grid, the grid as a whole rises.）


X_ATR = input.float(title='网格大小是多少倍ATR？', defval = 1)


// 1.基础变量
ema169 = ta.ema(close, 169)
ema144 = ta.ema(close, 144)
ema12 = ta.ema(close, 12)

ema576 = ta.ema(close, 576)
ema676 = ta.ema(close, 676)

plot(ema169, color=color.new(color.orange, 0), linewidth=2)
// plot(ema144, color=color.orange)
plot(ema12,  color=color.blue)
// plot(ema676, color=color.orange, linewidth=1)

mtr = math.max(high - low, math.abs(close[1] - high), math.abs(close[1] - low))
atr = ta.ema(mtr, 30)

is_0930 = hour(time, 'GMT-4') == 9  and minute(time, 'GMT-4') == 30
is_1500 = hour(time, 'GMT-4') == 15 and minute(time, 'GMT-4') == 00
is_1530 = hour(time, 'GMT-4') == 15 and minute(time, 'GMT-4') == 30

is_yangxian = close>open
is_yinxian = close<open

// 2.基本趋势标记

big_trend  = ema12 >= ema169 ? 1 : 0
big_trend2 = ema12 <= ema169 ? 1 : 0

// 背景的变色处理：
bgcolor(big_trend == 1 ? color.new(color.green, 90) : color.new(color.red, 90) )

// 3.网格点位初始化

grid_size = atr * X_ATR // 网格大小
        
price_entry1 = open - grid_size*1
price_entry2 = open - grid_size*2
price_entry3 = open - grid_size*3
price_stop_loss = open - grid_size*5

price_exit1 = price_entry1 + grid_size*1
price_exit2 = price_entry2 + grid_size*1
price_exit3 = price_entry3 + grid_size*1

qty1 = int(1000/price_entry1)
qty2 = int(1000/price_entry2)
qty3 = int(1000/price_entry3)


// 标出各种点位
slm_lines_time(time, price_entry1, price_entry2, price_entry3, price_stop_loss, price_exit1)=>
    time2 = time + 1000*3600*24*5
    line.new(time, price_stop_loss, time2, price_stop_loss, color=color.red, xloc = xloc.bar_time, width=2)  // 止损位
    line.new(time, price_entry1, time2, price_entry1, color=color.green, xloc = xloc.bar_time)  // 
    line.new(time, price_entry2, time2, price_entry2, color=color.green, xloc = xloc.bar_time)  // 
    line.new(time, price_entry3, time2, price_entry3, color=color.green, xloc = xloc.bar_time)  // 
    line.new(time, price_exit1,  time2, price_exit1,  color=color.green, xloc = xloc.bar_time, width=2)  // 

slm_lines(time, price_entry1, price_entry2, price_entry3, price_stop_loss, price_exit1)=>
    line.new(bar_index, price_stop_loss, bar_index[5], price_stop_loss, color=color.red, xloc = xloc.bar_index, width=2)  // 止损位
    line.new(bar_index, price_entry1, bar_index[5], price_entry1, color=color.green, xloc = xloc.bar_index)  // 
    line.new(bar_index, price_entry2, bar_index[5], price_entry2, color=color.green, xloc = xloc.bar_index)  // 
    line.new(bar_index, price_entry3, bar_index[5], price_entry3, color=color.green, xloc = xloc.bar_index)  // 
    line.new(bar_index, price_exit1,  bar_index[5], price_exit1,  color=color.green, xloc = xloc.bar_index, width=2)  // 


// 4.网格点位更新和下单

is_entry0 = big_trend==1 and year>=2020

var is_entry = false

// 未进场时：
if is_entry0 and not is_entry
    is_entry := true
    
    grid_size := atr * X_ATR // 网格大小
    
    price_entry1 := close - grid_size*1
    price_entry2 := close - grid_size*2
    price_entry3 := close - grid_size*3
    price_stop_loss := close - grid_size*5
    
    price_exit1 := price_entry1 + grid_size*1
    price_exit2 := price_entry2 + grid_size*1
    price_exit3 := price_entry3 + grid_size*1
    
    qty1 := int(1000/price_entry1)
    qty2 := int(1000/price_entry2)
    qty3 := int(1000/price_entry3)
    
    // slm_lines(time, price_entry1, price_entry2, price_entry3, price_stop_loss, price_exit1)
    
    strategy.entry("open1", strategy.long, qty1, limit = price_entry1)
    strategy.entry("open2", strategy.long, qty2, limit = price_entry2)
    strategy.entry("open3", strategy.long, qty3, limit = price_entry3)
    
    strategy.exit("close1", qty = qty1, limit = price_exit1, stop = price_stop_loss)
    strategy.exit("close2", qty = qty2, limit = price_exit2, stop = price_stop_loss)
    strategy.exit("close3", qty = qty3, limit = price_exit3, stop = price_stop_loss)

// 已进场的各类情况

// 1.止损
if is_entry and close <= price_stop_loss
    strategy.close_all()
    is_entry := false

// 2.网格抬升
if is_entry and close >= price_exit1
    is_entry := false
        



```

> Detail

https://www.fmz.com/strategy/434685

> Last Modified

2023-12-08 12:05:17
