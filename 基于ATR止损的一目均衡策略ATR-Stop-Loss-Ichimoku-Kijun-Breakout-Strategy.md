
> Name

基于ATR止损的一目均衡策略ATR-Stop-Loss-Ichimoku-Kijun-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种应用ATR作为止损、均线作为入场的量化交易策略。该策略同时结合威廉指标进行信号验证,以控制交易风险。

一、策略原理

该策略的核心指标包括:

1. ATR作为止损指标,它能动态反映市场波动程度;

2. 一目均衡线判断趋势方向提供入场信号;

3. 威廉指标进行额外验证,避免假入场。

具体交易逻辑如下:

当价格跌破一目均衡线而后收复时,做多;当价格突破均线而后跌破时,做空。这可以进行趋势追踪。

同时,检查威廉指标是否与方向一致,若不一致则放弃入场。这可以过滤假信号。

每次入场时候,设置以ATR计算的止损点。ATR能动态反映市场波动程度,进而设置合理的止损幅度。

当止损或止盈水平触发时,平仓盈利。

二、策略优势

该策略主要优势如下:

首先,ATR止损根据市场波动度设置风险控制,可以有效规避大额亏损;

其次,均线入场结合威廉指标验证,可以提高信号质量;

最后,止损止盈设置也使每单交易具有定义的风险回报。

三、潜在风险

然而,我们也应考虑以下风险:

首先,在趋势突变时,均线信号可能滞后,无法及时反应;

其次,止损过于激进可能造成止损被突破;

最后,参数优化不当也可能导致过拟合。

四、内容总结

本文详细介绍了一种以ATR为止损、均线为入场依据的量化交易策略。它可以通过动态止损和信号过滤实现良好的风险控制效果。但我们也要防范趋势突变、止损被突破等问题的发生。总体来说,该策略提供了一种简单有效的趋势跟踪方法。

||

This article explains in detail a quantitative trading strategy that uses ATR for stop loss and Kijun-Sen breakouts for entry, with additional signal validation using the Williams %R indicator to control trading risk.

I. Strategy Logic

The core indicators of this strategy include:

1. ATR as the stop loss indicator, which dynamically reflects market volatility.

2. Ichimoku Kijun-Sen line to determine trend direction and provide entry signals. 

3. Williams %R for additional signal validation to avoid false entries.

The specific trade logic is:

Take long positions when price breaks below and recovers back above the Kijun-Sen line. Take short positions when price breaks above and falls back below the line. This allows trend following. 

At the same time, check if Williams %R agrees with the direction, if not, skip entry. This filters false signals.

Set the stop loss at ATR calculated levels for each entry. ATR dynamically reflects market volatility, enabling reasonable stop loss sizing.

When the stop loss or take profit gets triggered, close positions for profit.

II. Advantages of the Strategy

The main advantages of this strategy are:

Firstly, ATR stop loss sets risk control according to market volatility, effectively avoiding large losses.

Secondly, Kijun-Sen entries with Williams %R validation improves signal quality. 

Lastly, the stop loss and take profit settings also define risk-reward for each trade.

III. Potential Weaknesses 

However, the following risks should also be considered:

Firstly, Kijun-Sen signals may lag during trend transitions, failing to react in time.

Secondly, stop loss set too aggressively risks being stopped out prematurely. 

Lastly, improper parameter optimization can also lead to overfitting issues.

IV. Summary

In summary, this article has explained a quantitative trading strategy using ATR for stop loss and Kijun-Sen for entry signals. It can achieve effective risk control through dynamic stops and signal filtering. But risks like trend transitions and stop loss invalidation need to be prevented. Overall, it provides a simple and effective trend following methodology.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Average True Range Period|
|v_input_2|20|Kijun Sen Period|
|v_input_3|true|Use W%R?|
|v_input_4|true|Williams % Range Period|
|v_input_5|-25|%R Upper Level|
|v_input_6|-75|%R Lower Level|
|v_input_7|false|Is this a 2 digit pair? (JPY, XAU, XPD...|
|v_input_8|5|Risk %|
|v_input_9|30|Equity Protection %|
|v_input_10|1.5|Average True Range multiplier|
|v_input_11|150|Target TP in Points|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy("NNFX ft. ATR, Kijun-Sen, %R","NNFX-2",true,pyramiding=1,calc_on_order_fills=true,calc_on_every_tick=true,initial_capital = 1000, currency="USD",slippage=5,commission_type=strategy.commission.cash_per_contract,commission_value=0.000035)
strategy.initial_capital = 50000    
//INDICATOR---------------------------------------------------------------------    
    //Average True Range (1. RISK)
atr_period = input(14, "Average True Range Period")
atr = atr(atr_period)

    //Ichimoku Cloud - Kijun Sen (2. BASELINE)
ks_period = input(20, "Kijun Sen Period")
kijun_sen = (highest(high,ks_period) + lowest(low,ks_period))/2
base_long = open < kijun_sen and close > kijun_sen
base_short = open > kijun_sen and close < kijun_sen

    //Williams Percent Range (3. Confirmation#1)
use_wpr = input(true,"Use W%R?")
wpr_len = input(1, "Williams % Range Period")
wpr = -100*(highest(high,wpr_len) - close)/(highest(high,wpr_len) - lowest(low,wpr_len))
wpr_up = input(-25, "%R Upper Level")
wpr_low = input(-75, "%R Lower Level")
conf1_long = wpr >= wpr_up
conf1_short = wpr <= wpr_low
if(use_wpr == false)
    conf1_long := true
    conf1_short := true
//TRADE LOGIC-------------------------------------------------------------------
    //Long Entry
    //if -> WPR crosses below -39 AND MACD line is less than signal line
l_en = base_long and conf1_long
    //Long Exit
    //if -> WPR crosses above -14
l_ex = close < kijun_sen
    //Short Entry
    //if -> WPR crosses above -39 AND MACD line is greater than signal line
s_en = base_short and conf1_short
    //Short Exit
    //if -> WPR crosses under -14
s_ex = close > kijun_sen
    
//MONEY MANAGEMENT--------------------------------------------------------------
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
isTwoDigit = input(false,"Is this a 2 digit pair? (JPY, XAU, XPD...")
risk = input(5,"Risk %")/100           //risk % per trade
equity_protector = input(30,"Equity Protection %")/100  //equity protection %
stop = atr*100000*input(1.5,"Average True Range multiplier")    //Stop level
if(isTwoDigit)
    stop := stop/100
target = input(150, "Target TP in Points")  //TP level
    //Calculate current DD and determine if stopout is necessary
equity_stopout = false
if(floating<0 and abs(floating/balance)>equity_protector)
    equity_stopout := true
    
    //Calculate the size of the next trade
temp01 = balance * risk     //Risk in USD
temp02 = temp01/stop        //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = temp03 - temp03%1000 //Normalize to 1000s (Trade size)
if(size < 1000)
    size := 1000            //Set min. lot size

//TRADE EXECUTION---------------------------------------------------------------
strategy.close_all(equity_stopout)      //Close all trades w/equity protector
is_open = strategy.opentrades > 0

if(true)
    strategy.entry("l_en",true,oca_name="a",when=l_en and not is_open)  //Long entry
    strategy.entry("s_en",false,oca_name="a",when=s_en and not is_open) //Short entry
    
    strategy.exit("S/L","l_en",loss=stop, profit=target)      //Long exit (stop loss)
    strategy.close("l_en",when=l_ex)            //Long exit (exit condition)
    strategy.exit("S/L","s_en",loss=stop, profit=target)      //Short exit (stop loss)
    strategy.close("s_en",when=s_ex)            //Short exit (exit condition)
    
//PLOTTING----------------------------------------------------------------------
plot(kijun_sen,"Kijun-Sen",color.blue,2)
```

> Detail

https://www.fmz.com/strategy/426847

> Last Modified

2023-09-14 20:06:11
