
> Name

Full-Crypto-Swing-ALMA-Cross-MACD-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15778d51bf600c9d1b7.png)

## Overview  
This strategy is based on the golden cross and dead cross signals of the double ALMA moving average lines, combined with the long and short signals of the MACD indicator, to achieve automatic long and short positions. The strategy is suitable for time frames of 4 hours or more, and the test data is BNB/USDT ranging from 2017 to the present, with a commission rate set at 0.03%.

## Strategy Principle   
The strategy uses fast and slow lines constructed from the ALMA to build the double moving average. The fast line length is 20 and the slow line is 40, both adopting an offset of 0.9 and a standard deviation of 5. When the fast line crosses over the slow line, a long signal is generated. When the fast line crosses below the slow line, a short signal is generated.   

At the same time, the strategy incorporates the histogram signal of the MACD indicator. Only when the MACD histogram is positive (rising), the long signal is valid; only when the MACD histogram is negative (falling), the short signal is valid.  

The strategy also sets take profit and stop loss conditions. The long take profit is 2 times and the stop loss is 0.2 times; the short take profit is 0.05 times and the stop loss is 1 time.

## Advantage Analysis  
The strategy combines the trend judgment of the double moving average and the energy judgment of the MACD indicator, which can effectively filter false signals and improve the accuracy of entry. The take profit and stop loss settings are reasonable to maximize locking in profits and avoid huge losses.  

The backtest data is adopted since 2017, covering multiple bulls and bears conversion cycles. The strategy still performs well across periods. This proves that the strategy adapts to both the linearity and non-linearity characteristics of the market.   

## Risk Analysis
The strategy has the following risks:  

1. The double moving average itself has lagging effect, possibly missing short-term opportunities  
2. When the MACD histogram is zero, the strategy will not generate signals
3. The take profit and stop loss ratios are preset, may deviate from the actual market  

Solutions:   

1. Appropriately shorten the moving average cycle to improve sensitivity to the short term   
2. Optimize MACD parameters to make the histogram fluctuation more frequent  
3. Dynamically adjust the take profit and stop loss settings  

## Optimization Directions   
The strategy can also be optimized in the following aspects:  

1. Try different types of moving averages to find better smoothing effects  
2. Optimize parameters of moving averages and MACD to fit different products and cycles  
3. Add additional conditions such as trading volume changes to filter signals
4. Adjust take profit and stop loss ratios in real time for better adaptability  

## Conclusion  
The strategy successfully combines the trend judgment of moving averages and the auxiliary judgment of MACD, and sets reasonable take profits and stop losses, which can obtain stable returns in various market conditions. The stability and profitability of the strategy can be further enhanced by continuous optimization of parameter settings, adding additional filtering conditions, etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|true|From Month|
|v_input_3|2010|From Year|
|v_input_4|31|To Day|
|v_input_5|12|To Month|
|v_input_6|2031|To Year|
|v_input_7|false|Use Heikin Ashi Candles in Algo Calculations|
|v_input_8|20|Length Size Fast|
|v_input_9|40|Length Size Slow|
|v_input_10|0.9|Offset|
|v_input_11|5|Sigma|
|v_input_12|6|Fast Length|
|v_input_13|25|Slow Length|
|v_input_14|9|Signal Smoothing|
|v_input_15|2|takeProfit_long|
|v_input_16|0.2|stopLoss_long|
|v_input_17|0.05|takeProfit_short|
|v_input_18|true|stopLoss_short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-04 00:00:00
end: 2023-12-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy(title = "Full Crypto Swing Strategy ALMA Cross", overlay = true,  pyramiding=1,initial_capital = 1, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.03)

//time condition
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2010, title = "From Year", minval = 1970)
 //monday and session 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2031, title = "To Year", minval = 1970)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = time >= startDate and time <= finishDate

UseHAcandles    = input(false, title="Use Heikin Ashi Candles in Algo Calculations")

haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low

//alma fast and slow
src = haClose
windowsize = input(title="Length Size Fast", type=input.integer, defval=20)
windowsize2 = input(title="Length Size Slow", type=input.integer, defval=40)
offset = input(title="Offset", type=input.float, defval=0.9, step=0.05)
sigma = input(title="Sigma", type=input.float, defval=5)
outfast=alma(src, windowsize, offset, sigma)
outslow=alma(src, windowsize2, offset, sigma)

//macd
fast_length = input(title="Fast Length", type=input.integer, defval=6)
slow_length = input(title="Slow Length", type=input.integer, defval=25)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)

// Calculating
fast_ma = ema(src, fast_length)
slow_ma =  ema(src, slow_length)
macd = fast_ma - slow_ma
signal = ema(macd, signal_length)
hist = macd - signal

long=crossover(outfast,outslow) and hist > hist[1] and time_cond
short=crossunder(outfast,outslow) and hist < hist[1] and time_cond

takeProfit_long=input(2.0, step=0.005)
stopLoss_long=input(0.2, step=0.005)
takeProfit_short=input(0.05, step=0.005)
stopLoss_short=input(1.0, step=0.005)

strategy.entry("long",1,when=long)
strategy.entry("short",0,when=short)

strategy.exit("short_tp/sl", "long", profit=close * takeProfit_long / syminfo.mintick, loss=close * stopLoss_long / syminfo.mintick, comment='LONG EXIT',  alert_message = 'closeshort')
strategy.exit("short_tp/sl", "short", profit=close * takeProfit_short / syminfo.mintick, loss=close * stopLoss_short / syminfo.mintick, comment='SHORT EXIT',  alert_message = 'closeshort')
```

> Detail

https://www.fmz.com/strategy/434285

> Last Modified

2023-12-05 10:24:34
