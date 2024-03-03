
> Name

多周期动态均线策略Multi-Period-Dynamic-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15eee6e8915e8d2c948.png)

[trans]


本策略通过动态选择不同类型的移动平均线,并结合多个时间周期,实现交易信号的产生。

### 策略原理

该策略允许选择 SMA、EMA、TEMA、WMA、HMA 五种移动平均线指标,并设置均线的周期长度。策略会根据选择动态绘制不同类型的均线。当收盘价上涨突破均线时,做多;当收盘价下跌突破均线时,做空。

具体来说,策略首先根据输入参数定义回测周期。然后计算五种均线指标:

- SMA 简单移动平均线
- EMA 指数移动平均线  
- TEMA 三指数移动平均线
- WMA 加权移动平均线
- HMA Hull移动平均线

根据选择,绘制相应的均线。当收盘价高于均线时,做多;收盘价低于均线时,做空。

该策略通过组合使用不同类型的均线,可以平滑价格数据,过滤市场噪音,产生较为可靠的交易信号。而允许自定义均线周期长度,可以针对不同周期的趋势进行交易。

### 策略优势

- 组合使用多种均线指标,可靠性较高
- 可自定义均线周期,适用于不同周期操作
- 动态切换均线类型,优化参数灵活
- 简单直观的趋势跟踪策略,容易实现

### 策略风险

- 均线产生滞后,可能错过趋势转折点
- 固定参数容易过拟合,实盘效果可能弱于回测
- 多头阶段积极做多,空头阶段积极做空,容易影响资金使用效率

可以通过优化以下方面来降低风险:

- 结合其他指标判断趋势,确定更准确的入场时机
- 实盘优化参数,调整均线周期适应不同市场环境
- 优化仓位管理,根据资金规模和风险控制适当调整仓位

### 优化方向 

该策略可以从以下几个方向进行优化:

1. 增加其他指标过滤,形成更稳定的交易信号

   例如可以加入量能指标,只有在成交量放大的情况下才产生交易信号,过滤掉一些假突破。

2. 优化出入场逻辑

   可以设置通道,只有在价格突破通道时才入场;设置止损线,价格触碰止损线后平仓。这可以减少不必要的损失。

3. 动态调整均线周期

   可以根据市场状况动态调整均线周期,在趋势更明显时使用长周期均线,在盘整时使用短周期均线。

4. 优化资金管理策略

   可以根据回撤情况调整仓位大小,在回撤时减小仓位,在盈利时适度加大仓位。

### 总结

该策略通过组合应用多种均线指标,结合多个时间周期,形成较为稳定的趋势跟踪效果。策略优化空间较大,可以从入场过滤、出场方式、参数优化等方面进行改进,使策略在实盘中获得更好的效果。

||

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

[/trans]

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
