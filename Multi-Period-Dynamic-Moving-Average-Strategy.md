
> Name

Multi-Period-Dynamic-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15eee6e8915e8d2c948.png)


This strategy dynamically selects different types of moving averages across multiple timeframes to generate trading signals. 

### Strategy Logic

The strategy allows selecting from SMA, EMA, TEMA, WMA and HMA moving averages, with customizable period lengths. Different types of moving averages will be plotted dynamically based on selection. It goes long when the closing price breaks above the moving average, and goes short when the closing price breaks below.

Specifically, the strategy first defines the backtest period based on input parameters. It then calculates five types of moving averages:

- SMA Simple Moving Average
- EMA Exponential Moving Average
- TEMA Triple Exponential Moving Average  
- WMA Weighted Moving Average
- HMA Hull Moving Average

The corresponding moving average is plotted based on selection. It goes long when the closing price is above the moving average, and goes short when below.

By combining different types of moving averages, the strategy can smooth price data and filter out market noise to generate more reliable trading signals. Customizable period lengths allow trading different trends across timeframes.

### Advantages

- Combines multiple moving averages for greater reliability 
- Customizable periods suit different trading timeframes
- Dynamic switching of averages allows flexible optimization
- Simple and intuitive trend following suitable for beginners

### Risks

- Lagging of moving averages may miss trend turning points
- Overfitting with fixed parameters, underperformance in live trading likely
- Aggressive long/short signals impact capital usage efficiency 

Risks can be reduced by:

- Adding other indicators to determine entries more precisely 
- Real-trade optimization of parameters for different market regimes
- Optimizing position sizing based on account size and risk management

### Enhancement Opportunities

The strategy can be improved in several aspects:

1. Add other filters for more stable signals

   e.g. volume indicators to avoid false breakouts without volume confirmation.

2. Optimize entry and exit logic

   Set price channels and stop losses to reduce unnecessary losses.

3. Dynamic moving average periods

   Use longer periods in strong trends and shorter periods during consolidations.

4. Improve money management

   Adjust position sizes based on drawdowns and profit taking.

### Conclusion

The strategy combines various moving averages across timeframes to generate relatively stable trend following effects. With ample room for optimizations in entries, exits, parameters and money management, it can be improved for better real-world performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100000000|Buy quantity|
|v_input_2|2017|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|false|Backtest Start Hour|
|v_input_6|false|Backtest Start Minute|
|v_input_7|2099|Backtest Stop Year|
|v_input_8|true|Backtest Stop Month|
|v_input_9|30|Backtest Stop Day|
|v_input_10|true|Color Background?|
|v_input_11|0|Select MA: SMA|EMA|TEMA|WMA|HMA|
|v_input_12|7|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-20 00:00:00
end: 2023-10-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("MA_strategy ", shorttitle="MA_strategy", overlay=true, initial_capital=100000)

qty = input(100000000, "Buy quantity")

testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testStartHour = input(0, "Backtest Start Hour")
testStartMin = input(0, "Backtest Start Minute")

testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,testStartMin)

testStopYear = input(2099, "Backtest Stop Year")
testStopMonth = input(1, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)


testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false


ma1 = input( "SMA",title="Select MA", options=["SMA", "EMA","TEMA", "WMA","HMA"])


len1 = input(7, minval=1, title="Period")

s=sma(close,len1)

e=ema(close,len1)


xEMA1 = ema(close, len1)
xEMA2 = ema(xEMA1, len1)
xEMA3 = ema(xEMA2, len1)
t = 3 * xEMA1 - 3 * xEMA2 + xEMA3


f_hma(_src, _length)=>
    _return = wma((2 * wma(_src, _length / 2)) - wma(_src, _length), round(sqrt(_length)))

h = f_hma(close, len1)

w = wma(close, len1)

ma = ma1 == "SMA"?s:ma1=="EMA"?e:ma1=="WMA"?w:ma1=="HMA"?h:ma1=="TEMA"?t:na

buy= close>ma
sell= close<ma

alertcondition(buy, title='buy', message='buy')
alertcondition(sell, title='sell', message='sell')

ordersize=floor(strategy.equity/close)

if testPeriod()
    strategy.entry("long",strategy.long,ordersize,when=buy)
    strategy.close("long", when = sell )


    
  








```

> Detail

https://www.fmz.com/strategy/430366

> Last Modified

2023-10-27 16:07:16
