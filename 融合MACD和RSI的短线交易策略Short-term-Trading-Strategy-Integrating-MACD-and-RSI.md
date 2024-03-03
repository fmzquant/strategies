
> Name

融合MACD和RSI的短线交易策略Short-term-Trading-Strategy-Integrating-MACD-and-RSI

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“融合MACD和RSI的短线交易策略”。该策略综合运用MACD和RSI两个指标的信号,对短线周期内的市场变动进行捕捉,以获利。

MACD即指数平滑移动平均线。它由快线、慢线和柱状差离线组成。当快线上穿慢线时,代表短期价格变动的动能开始增强,产生买入信号;当快线下穿慢线时,动能衰减,产生卖出信号。

RSI即相对强弱指标。它反映价格的超买超卖情况。RSI低于20时为超卖,高于80时为超买。超买区是价格下跌的预警;超卖区是价格反弹的预警。

本策略的交易信号来源于两部分:

第一,MACD快慢线交叉和差离柱变化。当差离柱从负向正转折,说明价格短期内存在增长动能,可以买入。当差离柱从正向负转折,说明动能减弱,应卖出。

第二,RSI的超买超卖。结合RSI可以过滤部分MACD产生的假信号。只在RSI低位时买入,RSI高位时卖出,可以提高成功率。

本策略的优势是综合两种指标优势,提高了交易信号准确性。及时捕捉短期变动,具有灵敏度。但MACD和RSI参数需要优化,避免过度交易。止损点位也需要设定合理,控制单笔交易亏损。

总之,本策略适用于短线周期的机动交易,能够抓住市场短期反转带来的获利机会。但需要积极的风险管理措施辅助,并密切跟踪市场走势,以便及时调整策略参数。



||

This strategy is named “Short-term Trading Strategy Integrating MACD and RSI”. It combines the signals from the MACD and RSI indicators to capture market fluctuations over short timeframes for profit.

MACD stands for Moving Average Convergence Divergence. It consists of the fast line, slow line, and histogram. When the fast line crosses above the slow line, it signals strengthening short-term price momentum and generates a buy signal. When the fast line crosses below the slow line, it signals weakening momentum and generates a sell signal.

RSI stands for Relative Strength Index. It reflects overbought and oversold conditions of prices. RSI below 20 is oversold, and above 80 is overbought. Overbought zones are warnings of potential price drops, while oversold zones warn of potential bounces.

This strategy’s trade signals come from two aspects:

First, MACD line crossovers and histogram changes. When the histogram changes from negative to positive, it shows increasing momentum in price in the short run, indicating opportunities to buy. When histogram changes from positive to negative, it shows fading momentum and suggests selling.

Second, RSI overbought/oversold levels. Combining RSI helps filter some false signals from MACD. Buying only when RSI is low and selling only when RSI is high improves accuracy.

The advantage of this strategy is combining the strengths of the two indicators for more accurate trade signals, and sensitively capturing short-term fluctuations. But MACD and RSI parameters need optimization to prevent overtrading. Stop loss levels also need to be reasonable to control single trade loss.

In summary, this strategy suits nimble short-term trading, catching profit opportunities from short-term reversals. But active risk management and close market monitoring are required to adjust parameters timely.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2019|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|2020|To Year|
|v_input_7|20|RSI Oversold|
|v_input_8|80|RSI Overbought|
|v_input_9|14|RSI Length|
|v_input_10|12|MACD fast|
|v_input_11|26|MACD slow|
|v_input_12|9|MACD length|
|v_input_13|10|Stop Loss (price %)|
|v_input_14|50|Take Profit (price %)|
|v_input_15|2|Take Position Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-06 00:00:00
end: 2023-09-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Uraynium V3", overlay=false, pyramiding = 0, calc_on_every_tick=true, precision=1, currency="USD", default_qty_value=10, default_qty_type=strategy.cash,initial_capital=100,commission_type=strategy.commission.percent,commission_value=0.1) 
// === INPUT BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2019, title = "From Year", minval = 2017)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 2020, title = "To Year", minval = 2017)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
inTimeframe()  => true

overSold      = input( 20 , minval = 1, title = "RSI Oversold")
overBought    = input( 80 , minval = 1, title = "RSI Overbought")
rsiLength     = input(14, minval = 1, title = "RSI Length")
fastLength    = input(12, minval = 1, title = "MACD fast")
slowlength    = input(26, minval = 1, title = "MACD slow")
MACDLength    = input( 9, minval = 1, title = "MACD length")
stopLoss      = input(   10, minval = 1, title = "Stop Loss (price %)")
takeProfit    = input(   50, minval = 1, title = "Take Profit (price %)")
triggerPosLvl = input(    2, minval = 1 ,title ="Take Position Threshold", type=input.float)
src = close

// === CALC ===

stopLossValue        = close*(stopLoss/100)/syminfo.mintick
takeProfitValue      = close*(takeProfit/100)/syminfo.mintick

vrsi = rsi(src, rsiLength)
//avgRSI = vrsi*0.5 + vrsi[1]*0.25 + vrsi[2]*0.125 + vrsi[3]*0.0625
avgRSI = (4*vrsi + 3*vrsi + 2*vrsi[2] + vrsi[3])/10
[macdLine, signalLine, histLine] = macd(src, fastLength, slowlength, MACDLength)


MACDdelta         = signalLine - macdLine
isMACDRunLong     = signalLine > macdLine
isMACDRunShort    = macdLine < signalLine
isMACDSwitchLong  = crossover(MACDdelta, 0)
isMACDSwitchShort = crossunder(MACDdelta, 0)
isMACDCross       = crossover(MACDdelta, 0) or crossunder(MACDdelta, 0)

buySignal =  (histLine-histLine[1]) + (avgRSI - avgRSI[1])

// === ACTION ===
isPosLong    = strategy.position_size > 0
isPosShort   = strategy.position_size < 0
isNoMarginPos= strategy.position_size == 0
entryLong  = (isNoMarginPos or isPosShort) and ( buySignal >  triggerPosLvl )
entryShort = (isNoMarginPos or isPosLong ) and ( buySignal < -triggerPosLvl ) 

if inTimeframe()
    strategy.entry("Long" , strategy.long,  comment="Entry Long",  when=entryLong )
    strategy.entry("Short", strategy.short, comment="Entry Short", when=entryShort)
    strategy.entry("Long" , strategy.long,  comment="Switch Long", when=entryLong)
    strategy.entry("Short", strategy.short, comment="Switch Short",when=entryShort)
    strategy.exit("Stop (long SL/TP)",  loss=stopLossValue, profit=takeProfitValue, when=entryLong )  
    strategy.exit("Stop (short SL/TP)", loss=stopLossValue, profit=takeProfitValue, when=entryShort)  
    strategy.close("Long" , when=entryShort)
    strategy.close("Short", when=entryLong)    

// === DRAW ===
posColor = isNoMarginPos ?  color.black : isPosLong ? color.green : color.red
plot(100, color=posColor,style=plot.style_area, transp=90, histbase=0)
        
plot(buySignal+overBought, color=color.green)
plot(50+macdLine/4, color=color.yellow)
plot(50+signalLine/4, color=color.orange)
histColor = histLine[1]-histLine > 0 ? color.red : color.green
plot(overSold+histLine/2, color=histColor, style=plot.style_histogram, histbase=overSold, transp=50, linewidth=2)

rsicolor = avgRSI>overBought ? color.red : avgRSI<overSold ? color.green : color.blue
plot(avgRSI,color=rsicolor, linewidth=2)
//plot(vrsi,color=color.purple, linewidth=2)
hline(overBought, color=color.red)
hline(overSold, color=color.green)
hline(50, color=color.gray)

```

> Detail

https://www.fmz.com/strategy/426585

> Last Modified

2023-09-13 14:59:32
