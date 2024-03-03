
> Name

基于均线和威廉指标的日线策略Daily-FX-Strategy-Based-on-Moving-Average-and-Williams-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a72434a65ae0f75d5b.png)
 [trans]
## 概述

本策略结合使用均线、ATR指标和威廉指标,针对GBP/JPY这个外汇品种进行日线级别的交易。策略先通过均线判断价格趋势和可能的反转点,然后利用威廉指标进一步确认交易信号,同时用ATR指标计算止损位和交易量。

## 策略原理

1. 使用20日线的均线(基线)判断价格整体趋势,价格从均线下方上扫为买入信号,从均线上方下破为卖出信号
2. 威廉指标用来确认价格反转。指标上穿-35时为买入确认,下穿-70时为卖出确认
3. ATR指标计算过去2天的平均波动范围。该数值乘以系数后设定为止损距离
4. 按照账户权益的50%进行风险控制。交易量按照止损距离和风险比例计算
5. 进入长仓后,止损点为价格低点减去止损距离。止盈点为入场点加100点。Exiting logic用于进一步确认退出信号
6. 进入短仓后,止损和止盈同上。Exiting logic用于进一步确认退出信号

## 优势分析

1. 综合使用均线判断趋势和指标确认进场,可以有效过滤假突破带来的损失
2. ATR动态止损可以据市场波动幅度设定合理的止损距离
3. 风险控制和动态交易量计算可以最大限度控制单笔损失
4. Exiting logic结合均线判断能进一步确认退出时机,避免过早停利

## 风险分析

1. 均线判断产生错误信号的概率较大,需要指标进一步确认
2. 指标本身也会产生错误信号,无法完全避免亏损的发生
3. 该策略更适合趋势品种,对于范围波动品种效果可能较差
4. 风险控制的比例设置不当也可能影响策略收益

可以通过调整均线周期,组合更多指标,或人工干预交易等方法进一步优化和改进。

## 总结

该策略结合趋势判断和指标过滤,针对GBP/JPY日线级别交易进行方法设计。同时运用动态止损、风险控制等手段控制交易风险。优化空间还很大,通过参数调整和方法组合可以进一步改进策略效果。

||

# Overview

This strategy combines moving average, ATR indicator and Williams indicator for  daily FX trading. It first judges price trend and potential reversal points through moving average, then uses Williams indicator to further confirm trading signals, and leverages ATR indicator to calculate stop loss and position sizing.  

## Strategy Logic

1. Use 20-day moving average (baseline) to determine overall trend. Price crossing from below to above is buy signal, while crossing from above to below is sell signal.
2. Williams indicator is used to confirm price reversal. Indicator crossing above -35 is buy confirmation, while crossing below -70 is sell confirmation.
3. ATR indicator calculates average of price range over last 2 days. The value multiplied by a factor is set as stop loss distance.
4. Position sizing is based on 50% risk of account equity. Trade size is calculated based on stop loss distance and risk percentage.  
5. After entering long position, stop loss is set at price low minus stop loss distance. Take profit is set at entry price plus 100 points. Exiting logic further confirms exit signals.
6. Similarly for short position, stop loss and take profit are set the same way. Exiting logic also used to confirm exits.

## Advantage Analysis 

1. Combining trend judgment by moving average and confirmation by indicator can effectively avoid losses from false breakouts. 
2. Dynamic stop loss by ATR can set reasonable stop distance based on market volatility.
3. Risk control and dynamic position sizing can maximize control over single trade loss.  
4. Exiting logic combined with moving average can help further confirm good exit timing and avoid premature profit taking.

## Risk Analysis

1. Moving average signals may have higher probability of being wrong, needing further confirmation from indicators.
2. Indicators themselves can also generate wrong signals, unable to completely avoid losses.
3. This strategy fits trending pairs better, may have poorer results for range-bound pairs.   
4. Improper risk control ratio settings can also impact strategy profitability.

Methods like adjusting moving average period, combining more indicators, manual intervention etc. can help further optimize and improve strategy. 

## Conclusion

This strategy combines trend judgment and indicator filter for  daily trading. It also leverages dynamic stop loss, risk control and other means to control trading risk. Much room for optimization exists by parameter tuning and method combination to further improve strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Use Heikin Ashi Candles in Algo Calculations|
|v_input_2|true|Is this a 2 digit pair? (JPY, XAU, XPD...|
|v_input_3|50|Risk %|
|v_input_4|30|Equity Protection %|
|v_input_5|true|Average True Range multiplier|
|v_input_6|100|Target TP in Points|
|v_input_7|true|From Day|
|v_input_8|true|From Month|
|v_input_9|2000|From Year|
|v_input_10|31|To Day|
|v_input_11|12|To Month|
|v_input_12|2021|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-29 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("GBPJPY DAILY FX",initial_capital = 1000,currency="USD", overlay=true)

UseHAcandles    = input(false, title="Use Heikin Ashi Candles in Algo Calculations")
//
// === /INPUTS ===

// === BASE FUNCTIONS ===

haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low

//INDICATOR---------------------------------------------------------------------    
    //Average True Range (1. RISK)
atr_period = 2
atr = atr(atr_period)



    //Ichimoku Cloud - Kijun Sen (2. BASELINE)
ks_period = 20
kijun_sen = (highest(haHigh,ks_period) + lowest(haLow,ks_period))/2
base_long = haOpen < kijun_sen and haClose > kijun_sen
base_short = haOpen > kijun_sen and haClose < kijun_sen

    //Williams Percent Range (3. Confirmation#1)
use_wpr = true
wpr_len = 4
wpr = -100*(highest(haHigh,wpr_len) - haClose)/(highest(haHigh,wpr_len) - lowest(haLow,wpr_len))
wpr_up = -35
wpr_low = -70
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
l_ex = haClose < kijun_sen
    //Short Entry
    //if -> WPR crosses above -39 AND MACD line is greater than signal line
s_en = base_short and conf1_short
    //Short Exit
    //if -> WPR crosses under -14
s_ex = haClose > kijun_sen
    
strategy.initial_capital = 50000
//MONEY MANAGEMENT--------------------------------------------------------------
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
isTwoDigit = input(true,"Is this a 2 digit pair? (JPY, XAU, XPD...")
risk = input(50,"Risk %")/100           //risk % per trade
equity_protector = input(30,"Equity Protection %")/100  //equity protection %
stop = atr*100000*input(1,"Average True Range multiplier")    //Stop level
if(isTwoDigit)
    stop := stop/100
target = input(100, "Target TP in Points")  //TP level
    //Calculate current DD and determine if stopout is necessary
equity_stopout = false
if(floating<0 and abs(floating/balance)>equity_protector)
    equity_stopout := true
    
    //Calculate the size of the next trade
temp01 = balance * risk     //Risk in USD
temp02 = temp01/stop        //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = temp03 - temp03%1000 //Normalize to 1000s (Trade size)
if(size < 1)
    size := 1            //Set min. lot size

//TRADE EXECUTION---------------------------------------------------------------
strategy.close_all(equity_stopout)      //Close all trades w/equity protector
is_open = strategy.opentrades > 0

fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2000, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2021, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true

if(time_cond)
    strategy.entry("l_en",true,1,oca_name="a",when=l_en and not is_open)  //Long entry
    strategy.entry("s_en",false,1,oca_name="a",when=s_en and not is_open) //Short entry
    
    strategy.exit("S/L","l_en",loss=stop, profit=target)      //Long exit (stop loss)
    strategy.close("l_en",when=l_ex)            //Long exit (exit condition)
    strategy.exit("S/L","s_en",loss=stop, profit=target)      //Short exit (stop loss)
    strategy.close("s_en",when=s_ex)            //Short exit (exit condition)

```

> Detail

https://www.fmz.com/strategy/440336

> Last Modified

2024-01-29 14:35:48
