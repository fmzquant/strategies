
> Name

乖离矩阵趋势跟随策略Divergence-Matrix-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13db2478b0620f99063.png)
[trans]

## 概述
乖离矩阵趋势跟随策略是一个结合趋势、乖离和均线的量化交易策略。该策略运用双RSI指标判断市场趋势方向,结合矩阵均线设置进场信号。矩阵均线会根据价格的乖离程度来调整仓位规模。整体而言,该策略的优点是运用多个指标确认交易信号,可以有效避免假突破,同时矩阵均线机制可以锁定更高收益。

## 策略原理
乖离矩阵趋势跟随策略主要由以下几部分组成:

1. 双RSI判断趋势

   使用快速RSI和慢速RSI判断市场趋势方向。当快速RSI出现超买或超卖时,结合慢速RSI判断趋势方向。

2. 矩阵均线生成交易信号

   根据进场价格设置一组矩阵均线,当价格触及某均线时,相应调整仓位。这样可以在趋势中获利较多。

3. 双向交易

   默认为双向交易。可选择只做多不做空。

具体交易逻辑是:

1. 使用快速RSI判断市场临时的超买超卖情况。

2. 使用慢速RSI判断市场中长期的趋势方向。

3. 当快速RSI出现超买超卖,同时慢速RSI显示趋势转折时,根据慢速RSI的多空判断做相应方向的仓位。

4. 建仓后,设定一组矩阵均线。这组矩阵均线围绕进场价设置,间距大小由”矩阵区间百分比”参数设定。

5. 当价格触及矩阵均线时,相应调整持仓量。如向上突破均线,则增加多单;向下跌破,则减少空单。

6. 当价格出现较大的调整时,仓位会被重置到初始水平。

以上是该策略的主要交易逻辑。通过矩阵均线,可以在趋势中锁定更多利润。

## 策略优势

乖离矩阵趋势跟随策略具有以下几个优势:

1. 双RSI判断信号更可靠。快速RSI避免假突破,慢速RSI确保大趋势正确。

2. 矩阵均线追踪趋势获利。根据价格乖离程度调整仓位,可以持续获利。

3. 支持双向交易。默认双向交易,也可仅做多。可适应更多市场环境。

4. 仓位重置机制控制风险。当价格出现明显调整时重置仓位,可以及时止损。

5. 参数设置灵活。用户可以根据历史数据、交易品种等选择最佳参数组合。

6. 代码结构清晰。各部分职责明确划分,易于理解、优化和扩展。

总的来说,该策略最大的优势在于利用多种机制提高信号质量,在控制风险的同时追求更高收益。这是一种风险收益兼顾的交易策略。

## 策略风险

乖离矩阵趋势跟随策略也存在一些风险,主要集中在以下几点:

1. 双RSI判断失效风险。当市场处于震荡调整时,RSI经常发出假信号。这时需要审时度势,适当调整参数或暂停交易。

2. 矩阵均线方式不当风险。如果矩阵参数设置不当,仓位调整可能过于激进,从而加大亏损。需谨慎测试参数。 

3. 仓位过度放大风险。调整仓位幅度过大也会导致亏损扩大。最大仓位参数需要审慎设置。

4. 趋势反转风险。当趋势发生反转时,如果不及时平仓,会面临较大亏损。这需要关注较长周期的趋势指标。

5. 代码优化空间有限风险。该策略已经比较成熟,继续优化空间有限。如果市场环境发生较大变化,整体交易逻辑需要重新评估。  

对策略进行评估和优化,是降低这些风险的关键。比如调整参数组合、监控较长周期指标等手段,都可以在一定程度上规避风险。

## 策略优化方向 

乖离矩阵趋势跟随策略还有进一步优化的空间:

1. 优化双RSI参数。可以测试更多参数组合,选择判断最准确的RSI周期数值。

2. 自定义矩阵均线设置。允许用户根据不同品种参数化设置矩阵均线参数,使之更符合该品种的特点。

3. 增加止损机制。如设定离场均线,当价格跌破该均线时止损。

4. 增加仓位比例规则。更科学合理的调整仓位规模和速度,防止仓位过度放大。

5. 结合其他指标。可再引入MACD、KD等其他指标进行辅助判断,提升信号准确性。

6. 优化代码结构。继续提高代码的可扩展性、可维护性和执行效率。

## 总结

乖离矩阵趋势跟随策略是一个多机制综合的量化交易策略。它主要运用双RSI判断趋势方向,矩阵均线追踪趋势获利的思路。相比单一指标策略,该策略可以提供更加稳定和高效的交易信号。通过参数调整和优化扩展,该策略可以适应更多不同的市场环境,具有很强的适用性。总体而言,该策略风险收益平衡良好,值得投资者积极应用和持续优化。

|| 

## Overview  

The Divergence Matrix Trend Following Strategy is a quantitative trading strategy that combines trend, divergence, and moving average analysis. This strategy uses dual RSI indicators to judge market trend direction and matrix moving averages to generate entry signals. The matrix moving averages adjust position sizing based on the degree of price divergence. Overall, the advantage of this strategy is to confirm trading signals with multiple indicators, which can effectively avoid false breakouts. Meanwhile, the matrix mechanism can lock in higher returns.

## Strategy Logic  

The Divergence Matrix Trend Following Strategy consists of the following main parts:

1. Dual RSI for trend judging

   Use fast RSI and slow RSI to determine market trend direction. When the fast RSI shows overbought or oversold levels, check the slow RSI for trend direction.  

2. Matrix moving average for trading signals

   Set up a group of matrix moving averages based on the entry price. When the price touches a moving average line, adjust the position accordingly. This allows more profits to be captured in trends.

3. Bi-directional trading

   Default is bi-directional trading. Can choose to only go long.

The specific trading logic is:

1. Use fast RSI to spot temporary overbought/oversold levels in the market.

2. Use slow RSI to determine the mid-to-long term trend direction of the market.  

3. When fast RSI shows extremes and slow RSI signals trend reversal, take positions based on the long/short trend by slow RSI.

4. After entering positions, set up a group of matrix moving averages. These matrix lines are based around the entry price, with interval size defined in the "Matrix Interval %" parameter.
   
5. When price touches a matrix line, adjust position size accordingly. For example, increase longs on upward breakouts, reduce shorts on downward breakdowns.  

6. When price sees large adjustments, positions will be reset to initial levels.  

The above describes the main trading logic of this strategy. The matrix mechanism allows more trend profits to be locked in.  

## Advantages

The Divergence Matrix Trend Following Strategy has the following advantages:

1. Dual RSI signals are more reliable. Fast RSI avoids false breakouts and slow RSI ensures the major trend is correct.
   
2. Matrix moving averages profit from trends. Adjusting position size based on price divergence allows sustained profits to be captured.
   
3. Supports bi-directional trading. Default is dual directional trading, but can also go long only. This adapts to more market environments.  

4. Position reset mechanism controls risks. Resetting positions when price sees large adjustments allows timely stop losses.

5. Flexible parameter settings. Users can select optimal parameter combinations based on historical data, trading instruments etc.  

6. Clean code structure. Clear separation of responsibilities makes the code easy to understand, optimize and extend.

In summary, the biggest edge of this strategy is to improve signal quality through multiple mechanisms while pursuing higher returns under controlled risks. This is a strategy balancing risk and reward.

## Risks

The Divergence Matrix Trend Following Strategy also has some risks, mainly in the following areas:

1. Failure risk of dual RSI signals. When the market is range-bound, RSI often gives false signals. Manual intervention is needed to adjust parameters or suspend trading.

2. Improper matrix moving average risk. If matrix parameters are not set properly, position adjustments can be too aggressive, thus magnifying losses. Conservative parameter testing is a must. 

3. Risk of over-leveraged positions. Excessive position size adjustments will also expand losses. The maximum position size parameter needs to be set prudently.  

4. Trend reversal risk. If failing to close positions promptly when trend reverses, large losses may be incurred. This calls for monitoring longer-term trend indicators.  

5. Limited optimization space risk. This strategy is already quite mature. Continued optimization potential is limited. Major upgrades may be needed if market regimes change drastically.   

Assessing and optimizing the strategy is key to mitigating these risks - adjusting parameters, monitoring longer-term indicators etc, can alleviate risks to some extent.

## Enhancement Opportunities  

There is room for further enhancement of the Divergence Matrix Trend Following Strategy:  

1. Optimize dual RSI parameters. Test more parameter combinations and select RSI periods with highest accuracy.

2. Customizable matrix lines. Allow users to parameterize matrix settings based on different instruments to better suit their characteristics.  

3. Add stop loss mechanisms. For example, set up exit lines to stop out positions if price breaks those lines.

4. Add more scientific position sizing rules. Manage position size adjustments in a more gradual fashion to prevent over-leveraging. 

5. Incorporate other indicators. Introduce additional indicators like MACD, KD etc. to improve signal accuracy.

6. Optimize code structure. Further improve extensibility, maintainability and execution efficiency of the code.

## Conclusion  

The Divergence Matrix Trend Following Strategy is a sophisticated quantitative trading strategy combining multiple mechanisms - using dual RSI for trend direction and matrix lines to profit from trends. Compared to single-indicator strategies, it provides more stable and efficient trading signals. With parameter tuning and optimization extensions, this strategy can adapt to more market conditions and regimes, making it highly versatile. Overall, this strategy strikes a good balance between risk and return, and deserves active application and continued enhancement by investors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Entry Size|
|v_input_2|10000|Max Size|
|v_input_3|2|Matrix Interval %|
|v_input_4|false|Matrix Overwrite $|
|v_input_5|1000|Adjustment Size|
|v_input_6|true|Trade Short|
|v_input_7|14|RSI Periods|
|v_input_8|65|RSI Overbought|
|v_input_9|30|RSI Oversold|
|v_input_10|D|Resolution Trend|
|v_input_11|14|RSI Trend Periods|
|v_input_12|64|RSI Trend Overbought|
|v_input_13|30|RSI Trend Oversold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("The Matrix 7.0 Strategy", overlay=false)

//Matrix Settings 
entry_size = input(title="Entry Size", defval = 1)
max_size = input(title="Max Size", defval = 10000)
matrix = input(title="Matrix Interval %", defval = 2)
matrix_price_overwrite = input(title="Matrix Overwrite $", defval = 0.0)
adjustment = input(title="Adjustment Size", defval = 1000)
trade_short = input(title="Trade Short", type=bool, defval = true)

//RSI Settings
periods = input(title="RSI Periods", defval = 14)
overbought_short = input(title="RSI Overbought", defval = 65)
oversold_short = input(title="RSI Oversold", defval = 30)

//RSI Trend Settings
resolution_long = input(title="Resolution Trend", defval = "D")
periods_long = input(title="RSI Trend Periods", defval = 14)
overbought_long = input(title="RSI Trend Overbought", defval = 64)
oversold_long = input(title="RSI Trend Oversold", defval = 30)

//Round Off to 2 decimals
round2(x) =>
    a = x * 10 * 10
    a := floor(a + 0.5)
    a := a / 10 / 10
    a

//RSI Function
RSI = rsi(close, periods)

//RSI Market Function
rsi_oversold = RSI < oversold_short
rsi_overbought = RSI > overbought_short

market_rsi = 0.0
market_rsi := if (rsi_oversold)
    RSI - oversold_short
else
    if (rsi_overbought)
        RSI - overbought_short
    else
        0

//RSI Trend Function
rsi_long = request.security(syminfo.tickerid,resolution_long,rsi(close,periods_long))
trend_rsi_long = rsi_long < oversold_long
trend_rsi_short = rsi_long > overbought_long
trend_rsi = 0
trend_rsi := if (trend_rsi_short)
    -1
else
    if (trend_rsi_long)
        1
    else
        trend_rsi[1] 

// // Shorter time resolution to make "close" crosses give faster positives.
// short_resolution = security(tickerid, "1", close)
// quick = round2(short_resolution) //ROUND OFF TO 2 DECIMAL PLACES.

//Declare Other Variables
entry_price = 0.0
entry_price := nz(entry_price[1])

position_size = 0.0
position_size := nz(position_size[1])

last_traded_price = 0.0
last_traded_price := nz(last_traded_price[1])


matrix_price = 0.0
if matrix_price_overwrite > 0.0
    matrix_price := matrix_price_overwrite
else
    matrix_price := round2((matrix/100) * entry_price)

level = 0
level := nz(level[1])

level_price = entry_price
if not na(level_price[1])
    level_price := level_price[1]

// Calculate Level
if close > level_price 
    level_change = floor((high - level_price)/matrix_price)
    level := level + level_change
else
    if close < level_price 
        level_change = ceil((low - level_price)/matrix_price)
        level := level + level_change
        
// Calculate Level Price   
level_price := (level * matrix_price) + entry_price

// Calculate Matrix Position
matrix_position = 0.0

if position_size > 0
    matrix_position :=  ((-1 * level) * adjustment) + entry_size
else
    if position_size < 0
        matrix_position :=  ((-1 * level) * adjustment) - entry_size
    
//Trend Entry or Reversal Conditions
trend_reversal_up = trend_rsi == 1 and (trend_rsi[1] == -1 or trend_rsi == 0) and position_size <= 0
trend_reversal_down = trend_rsi == -1 and (trend_rsi[1] == 1 or trend_rsi == 0) and position_size >= 0 and trade_short == true
flatten_position = trend_rsi == -1 and (trend_rsi[1] == 1 or trend_rsi == 0) and position_size >= 0 and trade_short == false

//Reset Conditions
reset_long = (position_size > 0) and (close - entry_price > matrix_price) and (market_rsi < 0) and (position_size != entry_size) 
reset_short = (position_size < 0) and (entry_price - close > matrix_price) and (market_rsi > 0) and (position_size != (-1 * entry_size)) 

//Adjustment Conditions
increase_long = (position_size > 0) and (matrix_position > position_size) and (market_rsi < 0) and (matrix_position <= max_size) 
decrease_long = (position_size > 0) and (matrix_position < position_size) and (market_rsi > 0) 
increase_short = (position_size < 0) and (matrix_position < position_size) and (market_rsi > 0) and (matrix_position >= (-1 * max_size)) 
decrease_short = (position_size < 0) and (matrix_position > position_size) and (market_rsi < 0)  

//Transactions
//Trend Reversals
if trend_reversal_up
    strategy.entry("OL", strategy.long, qty=entry_size)
    position_size := entry_size
    matrix_position := entry_size
    level := 0
else
    if trend_reversal_down 
        strategy.entry("OS", strategy.short, qty=entry_size)
        position_size := -1 * entry_size
        matrix_position := -1 * entry_size   
        level := 0
        
    //Reset Positions    
    else
        if reset_long
            order = entry_size - position_size[1]
            strategy.order("RL", strategy.long, qty=order)
            position_size := entry_size
            matrix_position := entry_size
            level := 0
        else
            if reset_short
                order = position_size[1] - (-1* entry_size)
                strategy.order("RS", strategy.short, qty=order)
                position_size := -1 * entry_size
                matrix_position := -1 * entry_size
                level := 0

    //Position Adjustments
            else    
                if increase_long
                    order = matrix_position - position_size[1]
                    strategy.order("IL", strategy.long, qty=order)
                    position_size := position_size[1] + order
                else
                    if decrease_long
                        order = position_size[1] - matrix_position
                        strategy.order("DL", strategy.short, qty=order)
                        position_size := position_size[1] - order
                    else
                        if increase_short
                            order = position_size[1] - matrix_position
                            strategy.order("IS", strategy.short, qty=order)
                            position_size := position_size[1] - order
                        else
                            if decrease_short
                                order = matrix_position - position_size[1]
                                strategy.order("DS", strategy.long, qty=order)
                                position_size := position_size[1] + order
                            else 
                                if flatten_position
                                    strategy.close_all()
                                    position_size := 0.0
                                    matrix_position := 0.0
                                    level := 0

//Grouped Actions
if trend_reversal_up or trend_reversal_down or reset_short or reset_long
    entry_price := round2(close)
    last_traded_price := round2(close)

if increase_long or decrease_long or increase_short or decrease_short
    last_traded_price := round2(close)

// //RSI Trend & Adjustment Moments. (strategy)
p1 = plot(market_rsi, color = trend_rsi > 0 ? green : red, linewidth = 4, title='Market', transp =0)
p2 = plot(trend_rsi, color = trend_rsi > 0 ? green : red, linewidth = 4, title='Trend', transp = 0)
fill(p1,p2, color=trend_rsi > 0 ? green : red, transp=0)
p3 = plot((rsi_long - 50) *2, color = white, title="Trend Index")
fill(p2,p3, color=white)
hline((overbought_long -50) * 2)
hline((oversold_long -50) * 2)

//Position Plots (strategy)
plot(matrix_position / 100, title='Matrix', color=white, linewidth = 4)
plot(position_size / 100, title='Position', color=blue, linewidth = 4)
plot(strategy.position_size / 100, title='Strategy', color=orange, linewidth = 4)

// //Price Plots (study)
// plot(level_price, title="Matrix Level Price", linewidth=4)
// plot(last_traded_price, title="Last Traded Price", linewidth=2, color=orange)
// plot(entry_price + (4 * matrix_price), title='Adjustment 4', color=white, linewidth = 1)
// plot(entry_price + (3 * matrix_price), title='Adjustment 3', color=white, linewidth = 1)
// plot(entry_price + (2 * matrix_price), title='Adjustment 2', color=white, linewidth = 1)
// plot(entry_price + matrix_price, title='Adjustment 1', color=white, linewidth = 1)
// plot(entry_price, title='Entry Price', color=white, linewidth = 3)
// plot(entry_price - matrix_price, title='Adjustment -1', color=white, linewidth = 1)
// plot(entry_price - (2 * matrix_price), title='Adjustment -2', color=white, linewidth = 1)
// plot(entry_price - (3 * matrix_price), title='Adjustment -3', color=white, linewidth = 1)
// plot(entry_price - (4 * matrix_price), title='Adjustment -4', color=white, linewidth = 1)


// //Alerts (study only)
// alertcondition(trend_reversal_up, title='Trend Reversal Up', message='Market Oversold, Lets Buy')
// alertcondition(trend_reversal_down, title='Trend Reversal Down', message='Market Overbought, Lets Sell')
// alertcondition(reset_long, title='Reset Long', message='Higher Bottom, Lets Buy')
// alertcondition(reset_short, title='Reset Short', message='Lower Top, Lets Sell')
// alertcondition(increase_long, title='Increase Long', message='Price Dropped, Lets Buy')
// alertcondition(decrease_long, title='Decrease Long', message='Price Spiked, Lets Sell')
// alertcondition(increase_short, title='Increase Short', message='Price Spiked, Lets Sell')
// alertcondition(decrease_short, title='Decrease Short', message='Price Dropped, Lets Buy')

// //Grouped Conditions
// condition_buy = trend_reversal_up or increase_long or decrease_short or reset_long
// condition_sell = trend_reversal_down or decrease_long or increase_short or reset_short
// adjustment_matrix = trend_reversal_up or increase_long or decrease_short or trend_reversal_down or decrease_long or increase_short or reset_long or reset_short

// //Grouped Alerts
// alertcondition(condition_buy, title='Condition Buy', message='You Need to Buy')
// alertcondition(condition_sell, title='Condition Sell', message='You Need to Sell!')
// alertcondition(adjustment_matrix, title='Adjustment Matrix', message='You Need to Adjust')


```

> Detail

https://www.fmz.com/strategy/435153

> Last Modified

2023-12-12 17:05:27
