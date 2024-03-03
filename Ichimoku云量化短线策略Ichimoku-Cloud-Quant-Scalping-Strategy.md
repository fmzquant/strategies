
> Name

Ichimoku云量化短线策略Ichimoku-Cloud-Quant-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1735a46dc0abe867cf1.png)
[trans]

## 概述

Ichimoku云量化短线策略(Ichimoku Cloud Quant Scalping Strategy)是一个结合一目均衡表和平均方向指数的短线量化策略。该策略运用Ichimoku云指标判断趋势方向,配合ADX指标过滤非趋势市场,在趋势行情中进行短线操作。

## 策略原理

该策略主要由两部分组成:

1. Ichimoku云指标判断趋势方向

    - Conversion Line:最近7周期的中值线
    - Base Line:最近26周期的中值线 
    - Leading Span A:Conversion Line与Base Line的中点
    - Leading Span B:最近52周期的中值线
    
    当价格在云端上方时为多头趋势,下方为空头趋势。策略以Conversion Line的突破来判断趋势的转折。
    
2. ADX指标过滤非趋势市场

    ADX大于20时表示趋势行情,这时策略才产生交易信号。小于20时表示盘整,此时策略不交易。

交易规则:

- 多头进入:价格突破Conversion Line上方且ADX大于20 
- 空头进入:价格突破Conversion Line下方且ADX大于20
- 止损:150个点
- 止盈:200个点

## 优势分析

该策略具有以下优势:

1. 乘趋势而上,避免盘整。Ichimoku云指标可准确判断趋势方向和转折点,配合ADX指标过滤盘整市场,避免假突破。

2. 回撤控制。止损设置为150点,可有效控制单笔损失。

3. 盈亏比高。止盈为200点,止损为150点,盈亏比高达1.33,易于盈利。

4. 交易频率适中。只在趋势行情中交易,不会高频出入场。

## 风险分析

该策略也存在以下风险:  

1. 趋势判断失败风险。Ichimoku云指标判断趋势转向失败时会产生错误信号。可以适当延长参数周期进行优化。

2. 止损被追穿风险。快速行情中止损有可能被突破。可以设置移动止损或考虑增加止损范围。 

3. 夜盘和盘前交易风险。策略默认只在日盘交易,夜盘和盘前行情判断可能会失效。可以设置24小时交易或在盘前盘后单独制定交易策略。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. Ichimoku云指标参数优化。可以测试不同的转换线、基准线和备选线参数,找到最佳参数组合。

2. ADX参数和阈值优化。可以测试ADX的周期参数和滤波阈值,找到最优参数。
  
3. 止盈止损优化。可以根据历史数据回测确定最优止盈止损点位。

4. 移动止损策略。设置浮动止损以更好地跟踪趋势获利。

5. 趋势判断辅助指标。加入MACD,KD等指标辅助判断趋势,提高信号准确率。

6. 适应性优化。针对差异大的品种单独制定交易策略参数。

## 总结  

Ichimoku云量化短线策略整合Ichimoku云指标和ADX指标的优点,既可以准确判断趋势转折点,又能有效滤除盘整市场,避免假信号。该策略盈亏比高、回撤可控,适合跟踪趋势进行短线操作。通过参数优化、止损优化、辅助指标等手段,可以进一步提升策略稳定性和收益率。

||

## Overview  

The Ichimoku Cloud Quant Scalping Strategy is a short-term quantitative strategy integrating Ichimoku Cloud and Average Directional Index (ADX). It utilizes Ichimoku Cloud to determine the trend direction and ADX to filter non-trending markets for scalping during trending conditions.  

## Strategy Logic  

The strategy consists of two main components:  

1. Ichimoku Cloud to judge the trend direction  

    - Conversion Line: middle price of last 7 periods
    - Base Line: middle price of last 26 periods
    - Leading Span A: midpoint of Conversion Line and Base Line
    - Leading Span B: middle price of last 52 periods
    
    Price above the cloud indicates an uptrend while below means a downtrend. The strategy uses the breakout of Conversion Line to determine the reversal of the trend.
    
2. ADX to filter non-trending market

    Only taking signals when ADX is greater than 20, suggesting a trending market. No trade when ADX<20 during range-bound market.
    
Trade Rules:

- Long Entry: Price breaks above Conversion Line and ADX>20
- Short Entry: Price breaks below Conversion Line and ADX>20  
- Stop Loss: 150 ticks  
- Take Profit: 200 ticks

## Advantage Analysis   

The advantages of this strategy:  

1. Following the trend, avoiding ranges. Ichimoku Cloud can accurately determine trend direction and turning points. ADX filters range-bound market to prevent false breakout.  

2. Drawdown control. 150 ticks stop loss effectively limits per trade loss.

3. High profit factor. 200 ticks take profit vs 150 ticks stop loss gives a profit factor of 1.33, easy to gain profits.  

4. Appropriate trading frequency. Only trading when a trend emerges prevents over-trading.

## Risk Analysis

The risks are:

1. Trend determination failure risk. Incorrect signal when Ichimoku Cloud fails to detect trend reversal. Can optimize parameters to improve accuracy.  

2. Stop loss being hit risk. Stop loss can be penetrated during fast market. Can use trailing stop loss or wider stop loss range.

3. Overnight and premarket trading risk. Default setting only allows day trading. Judgement may fail during extended hours. Can enable 24H trading or customize strategies for extended sessions.

## Optimization Directions 

The potential optimization directions:  

1. Parameter tuning of Ichimoku Cloud to find the optimal setting.
  
2. ADX parameter and threshold optimization to determine the best values.
  
3. Profit target and stop loss optimization based on historical data.

4. Trailing stop loss to better follow the trend.  

5. Additional indicators like MACD and KD to assist trend determination.

6. Adaptive optimization for different products.
   
## Conclusion
  
The Ichimoku Cloud Quant Scalping Strategy integrates the advantages of Ichimoku Cloud and ADX to accurately determine trend reversal points and filter out range-bound markets. It has high profit factor, controllable drawdown, and is suitable for scalping along the trend. Further improvements on parameters, stop loss, auxiliary indicators can enhance the stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|7|Conversion Periods:|
|v_input_2|14|Length|
|v_input_3|20|threshold|
|v_input_4|true|Use Trading Session?|
|v_input_5|0400-1500|Trade Session:|
|v_input_6|true|Trade Size:|
|v_input_7|150|Stop Loss in ticks:|
|v_input_8|200|Take Profit in ticks:|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-13 00:00:00
end: 2023-12-20 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title='[STRATEGY][RS]Spot/Binary Scalper V0', shorttitle='IC', overlay=true, initial_capital=100000, currency=currency.USD)
//  ||  Adapted from:
//  ||      http://www.binaryoptionsedge.com/topic/1414-ta-spot-scalping-it-works-damn-good/?hl=singh

//  ||  Ichimoku cloud:
conversionPeriods = input(title='Conversion Periods:',  defval=7, minval=1),
basePeriods = 26//input(title='Base Periods',  defval=26, minval=1)
laggingSpan2Periods = 52//input(title='Lagging Span:',  defval=52, minval=1),
displacement = 26//input(title='Displacement:',  defval=26, minval=1)

f_donchian(_len) => avg(lowest(_len), highest(_len))

f_ichimoku_cloud(_conversion_periods, _base_periods, _lagging_span)=>
    _conversion_line = f_donchian(_conversion_periods)
    _base_line = f_donchian(_base_periods)
    _lead_line1 = avg(_conversion_line, _base_line)
    _lead_line2 = f_donchian(_lagging_span)
    [_conversion_line, _base_line, _lead_line1, _lead_line2]

[conversionLine, baseLine, leadLine1, leadLine2] = f_ichimoku_cloud(conversionPeriods, basePeriods, laggingSpan2Periods)

//ps0 = plot(title='A', series=leadLine1, color=green, linewidth=2)
//ps1 = plot(title='B', series=leadLine2, color=red, linewidth=2)
//fill(title='AB', plot1=ps0, plot2=ps1, color=blue, transp=80)
//plot(title='Base', series=baseLine, color=blue, linewidth=1, offset=displacement)
plot(title='Conversion', series=conversionLine, color=blue, linewidth=1)
//  ||----------------------------------------------------------------------------------------------------------------------------------------------||
//  ||  ADX
len = input(title="Length",  defval=14)
th = input(title="threshold",  defval=20)

TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0


SmoothedTrueRange = nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/len) + TrueRange
SmoothedDirectionalMovementPlus = nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/len) + DirectionalMovementPlus
SmoothedDirectionalMovementMinus = nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/len) + DirectionalMovementMinus

DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = abs(DIPlus-DIMinus) / (DIPlus+DIMinus)*100
ADX = sma(DX, len)
//  ||----------------------------------------------------------------------------------------------------------------------------------------------||
//  ||  Trade session:
USE_TRADESESSION = input(title='Use Trading Session?', type=bool, defval=true)
trade_session = input(title='Trade Session:', defval='0400-1500', confirm=false)
istradingsession = not USE_TRADESESSION ? false : not na(time('1', trade_session))
bgcolor(istradingsession?gray:na)
//  ||----------------------------------------------------------------------------------------------------------------------------------------------||
//  ||  Strategy:
trade_size = input(title='Trade Size:',  defval=1)
stop_loss_in_ticks = input(title='Stop Loss in ticks:',  defval=150)
take_profit_in_ticks = input(title='Take Profit in ticks:',  defval=200)

buy_icloud_signal = open < conversionLine and close > conversionLine
buy_adx_signal = DIPlus > 20
buy_signal = istradingsession and buy_icloud_signal and buy_adx_signal

sel_icloud_signal = open > conversionLine and close < conversionLine
sel_adx_signal = DIMinus > 20
sel_signal = istradingsession and sel_icloud_signal and sel_adx_signal


strategy.order('buy', long=true, qty=trade_size, comment='buy', when=buy_signal)
strategy.order('sel', long=false, qty=trade_size, comment='sel', when=sel_signal)

strategy.exit('exit buy', from_entry='buy', profit=take_profit_in_ticks, loss=stop_loss_in_ticks)
strategy.exit('exit sel', from_entry='sel', profit=take_profit_in_ticks, loss=stop_loss_in_ticks)

```

> Detail

https://www.fmz.com/strategy/436096

> Last Modified

2023-12-21 11:13:15
