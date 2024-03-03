
> Name

双移动平均线突破策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11f8524c0dbfd7f5c72.png)

[trans]


## 概述

双移动平均线突破策略是一个较为典型的趋势跟踪策略。它通过计算两条不同周期的移动平均线,并以其交叉作为买入和卖出信号,来捕捉市场趋势的方向和力度。

## 策略原理

该策略主要基于两个移动平均线。第一个移动平均线的周期较短,可以更快地响应价格变化;第二个移动平均线周期较长,可以过滤掉部分噪音。当短期移动平均线上穿长期移动平均线时,视为买入信号;当短期移动平均线下穿长期移动平均线时,则为卖出信号。

具体来说,该策略计算了10周期的指数移动平均线(price1)和20周期的指数移动平均线(price2)。如果当前K线的开盘价和收盘价都高于两条移动平均线,则产生买入信号;如果当前K线的开盘价和收盘价都低于两条移动平均线,则产生卖出信号。

通过这样的设计,可以在趋势开始形成时较早地进入市场,并跟踪趋势;当趋势反转时,也可以尽早退出市场,有效控制风险。

## 策略优势

- 捕捉趋势早期,跟踪强劲趋势
- 双均线过滤,避免部分假突破
- K线开盘价和收盘价双确认,减少无效交易

## 策略风险

- 双均线策略容易产生较多的反向交易
- 双均线运行时可能出现频繁交叉信号
- 参数优化空间大,不当优化可能导致过拟合

## 策略优化方向  

- 测试不同参数组合,寻找最优参数
- 增加止损策略,降低单次损失大小  
- 增加过滤条件,减少无效交易
- 结合其他指标确认信号有效性

## 总结

本策略整体来说较为简单实用,通过双均线交叉原理捕捉趋势,是量化交易的一个基础策略。但该策略也存在一定的风险,需要进一步优化以适应不同市场环境。在参数调整、止损机制、信号过滤等方面都有优化空间,可以使策略更稳定可靠。

||


## Overview

The Dual Moving Average Crossover Strategy is a typical trend following strategy. It calculates two moving averages with different periods and uses their crossover as trading signals to capture the direction and momentum of market trends. 

## Strategy Logic

The strategy is mainly based on two moving averages. The first moving average has a shorter period and can respond to price changes faster. The second moving average has a longer period and can filter out some noise. When the short term moving average crosses over the long term moving average, it is considered a buy signal. When the short term moving average crosses below the long term moving average, it is considered a sell signal.

Specifically, this strategy calculates a 10-period exponential moving average (price1) and a 20-period exponential moving average (price2). If the open and close prices of the current bar are both higher than the two moving averages, a buy signal is generated. If the open and close prices are both lower than the two moving averages, a sell signal is generated.  

This design allows earlier entry when a trend starts to form and follows the trend. When the trend reverses, it can also exit the market early to effectively control risks.

## Advantages

- Catch trends early and follow strong trends 
- Dual MA crossover filters noise  
- Double confirmation from open and close prices reduces ineffective trades

## Risks

- Prone to whipsaws and reverse trades
- Frequent crossover signals may occur
- Large parameter tuning space may lead to overfitting

## Enhancement  

- Test different parameter sets to find optimum
- Add stop loss to limit loss size
- Add filters to reduce bad trades 
- Combine other indicators to confirm signals

## Summary

The strategy is relatively simple and practical, capturing trends with dual MA crossover, making it a fundamental quant strategy. But it also has some risks and needs further optimization for different market regimes. There is room for enhancing parameters, stops, filters etc. to make it more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|10|1st MA Length|
|v_input_3|0|1st MA Type: EMA|SMA|
|v_input_4|20|2nd MA Length|
|v_input_5|0|2nd MA Type: EMA|SMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//study(title="MA River CC v1", overlay = true)
strategy("MA River CC v1", overlay=true)
src = input(close, title="Source")

price = request.security(syminfo.tickerid, timeframe.period, src)
ma1 = input(10, title="1st MA Length")
type1 = input("EMA", "1st MA Type", options=["SMA", "EMA"])

ma2 = input(20, title="2nd MA Length")
type2 = input("EMA", "2nd MA Type", options=["SMA", "EMA"])

price1 = if (type1 == "SMA")
    sma(price, ma1)
else
    ema(price, ma1)
    
price2 = if (type2 == "SMA")
    sma(price, ma2)
else
    ema(price, ma2)


//plot(series=price, style=line,  title="Price", color=black, linewidth=1, transp=0)
plot(series=price1, style=line,  title="1st MA", color=blue, linewidth=2, transp=0)
plot(series=price2, style=line, title="2nd MA", color=green, linewidth=2, transp=0)


buy_entry = (open>price1 and open>price2) and (close>price1 and close>price2)  
sell_entry = (open<price1 and open<price2) and (close<price1 and close<price2)
buy_close = sell_entry
sell_close = buy_entry
//longCondition = crossover(price1, price2)    
if(buy_entry)
    strategy.entry("Long", strategy.long)
    
if(sell_entry)
    strategy.entry("Short", strategy.short)

strategy.close("Long" , when=buy_close)
strategy.close("Short",when=sell_close)


```

> Detail

https://www.fmz.com/strategy/432760

> Last Modified

2023-11-21 11:34:09
