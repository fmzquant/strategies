
> Name

自适应ATR均线交易策略Adaptive-ATR-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10fe0e7ff3644e82d07.png)
[trans]

## 概述

本策略融合自适应ATR均线指标和趋势跟踪,用于发现市场中的趋势并进行趋势交易。该策略运用Hull移动平均平滑ATR,形成平滑的ATR均线,再根据价格与ATR均线的关系发出交易信号。ATR均线能够有效过滤市场Noise,识别出较大的趋势。本策略还设置了固定止损止盈点,控制每单的风险收益比。总体来说,该策略通过自适应ATR均线指标追踪趋势,并采用严格的风险管理规则,旨在实现稳定的盈利增长。

## 策略原理  

本策略的核心指标是ATR均线。ATR指标是Measuring Volatility的一个重要工具,它能够测量市场的波动性和股价的实际变动幅度。ATR均线则是对ATR指标进行平滑处理,形成均线之后,再与价格进行比较,判断价格趋势。

具体来说,该策略首先计算出TR(True Range),即当日最高价与最低价之间的差价,并取前一日Close与当前最高最低价之间的最大差价。然后应用Hull移动平均方法对TR进行平滑,计算出自适应的ATR均线。ATR均线能够有效过滤市场中高频的Noise,只捕捉到较大的价格波动。 

在计算出ATR均线后,该策略将价格与ATR均线进行对比。当价格上穿ATR均线时,说明价格开始进入上升趋势,该策略则进行Long开仓;当价格下穿ATR均线时,说明价格开始进入下跌趋势,该策略则进行Short开仓。

此外,该策略还设置了固定的止损止盈范围。每次开仓后,设定固定的止损点和止盈点,当价格触及止损点时止损出场,触及止盈点时止盈出场。这能够限制每单的损失,同时锁定盈利。

综合来说,该策略融合自适应ATR均线指标和严格的风险管理措施,旨在抓住较大的价格趋势,同时控制每单损失,实现稳定的盈利增长。

## 优势分析

该策略主要具有以下优势:

1. 使用自适应ATR均线指标,能够有效识别出价格中较大的趋势,过滤市场Noise,防止被套。

2. 应用Hull移动平均方法计算ATR均线,使ATR均线更为平滑,避免被高频震荡误导。

3. 设置固定止损止盈点,能够限制单笔损失,同时锁定盈利,保证每单交易的风险收益比。

4. 采用趋势跟踪的交易方式,能够持续捕捉价格趋势,增强盈利的可能性。

5. 策略逻辑简单清晰,容易理解,参数设置灵活,适合不同品种和市场环境。

6. 可在任何品种中进行趋势跟踪,具有较强的适应性。

## 风险分析

该策略主要存在以下风险:

1. ATR均线发出错误信号的可能性。价格可能出现剧烈波动,导致ATR均线判断失误,产生错误信号。

2. 止损点过小可能增加止损被触发的概率。需要确保止损点设置合理,给予价格足够的波动空间。

3. 固定止盈目标可能过早止盈,未能持续捕捉趋势行情。可考虑根据ATR动态调整止盈点。

4. 突发事件导致价格剧烈跳空,触发止损。此时需要暂停交易,防止巨额损失。

5. 当趋势反转时,如果未及时平仓,可能会被反向套牢。需要及时判断趋势结束信号。

6.  Parameters需要针对不同品种和市场环境进行优化,否则会影响策略表现。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化ATR均线的参数,包括ATR计算长度period和平滑参数。不同参数组合会对ATR均线产生影响。

2. 优化止损止盈策略,可以考虑根据ATR动态调整止损止盈点,而不是固定设置。

3. 增加趋势判断规则,结合其它指标判断趋势反转信号,避免被反转套牢。

4. 根据不同品种和市场环境对参数进行测试和优化,找到最优参数。

5. 增加对突发事件的判断,在大幅跳空时暂停交易,控制损失。

6. 优化入场时机选择,可以考虑在回调时入场,而不是在冲高时入场,降低风险。

7. 进行参数组合优化,测试不同ATR长度和平滑参数的组合,找到最佳匹配。

## 总结

本策略整体采用自适应ATR均线指标发现趋势,并以固定止损止盈的方式进行趋势跟踪交易。ATR均线能有效识别趋势,固定止损止盈控制风险收益比。该策略优点是逻辑简单清晰,容易理解;可根据参数调整适用于不同品种。但也存在ATR均线判断失误、止损点设置不当等风险。未来可通过优化ATR均线参数、止损止盈策略、增加趋势判断等方式进一步提升策略表现。

||


## Overview

This strategy combines adaptive ATR moving average indicator and trend following for discovering trends in the market and trading along the trend. It uses Hull moving average to smooth ATR and form smooth ATR moving averages, then generates trading signals based on price's relationship with the ATR moving averages. ATR moving averages can effectively filter market noise and identify significant trends. The strategy also sets fixed stop loss and take profit points to control risk/reward ratio per trade. Overall, this strategy aims to follow trends identified by adaptive ATR moving averages and achieve steady profit growth through strict risk management.

## Strategy Logic

The core indicator of this strategy is ATR moving average. ATR is an important volatility measurement tool, which measures market volatility and price fluctuations. ATR moving average is the smoothed ATR formed into a moving average line for comparison with price to determine trend.

Specifically, the strategy first calculates True Range, which is the difference between high and low prices of the day, and the maximum difference between previous close and current highest/lowest price. Then it applies Hull moving average method to smooth the TR and obtain adaptive ATR moving averages. The ATR moving averages can filter out high frequency market noise and only capture significant price swings.

After calculating the ATR moving averages, the strategy compares price with the ATR moving averages. When price crosses above the ATR moving average, it signals an upward trend, and the strategy goes long. When price crosses below the ATR moving average, it signals a downward trend, and the strategy goes short. 

In addition, fixed stop loss and take profit ranges are set after each trade. When price hits the stop loss level, the trade is stopped out. When price hits the take profit level, profit is taken. This limits the loss and locks in profit for each trade.

In summary, this strategy combines adaptive ATR moving averages and strict risk management to follow significant trends and control loss per trade, in order to achieve steady profit growth.

## Advantage Analysis 

The main advantages of this strategy are:

1. Using adaptive ATR moving averages to effectively identify significant trends and filter market noise to avoid being trapped.

2. Applying Hull moving average method to calculate smoother ATR moving averages, avoiding being misled by high frequency fluctuations.

3. Setting fixed stop loss and take profit to limit loss per trade and lock in profits, ensuring risk/reward ratio.

4. Trend following trading style can keep capturing trends and increase profit potential.

5. Simple and clear logic, easy to understand. Flexible parameter settings suit different products and markets. 

6. Can be applied in any product for trend following. Highly adaptable.

## Risk Analysis

The main risks of this strategy are:

1. Possibility of false signals from ATR moving averages. Prices may fluctuate violently and cause errors in ATR moving average signals.

2. Stop loss being too tight increases chance of being stopped out. Ensure stop loss allows enough price movement.

3. Fixed take profit may exit too early, unable to capture full trends. Consider dynamic take profit based on ATR. 

4. Sudden price spikes hitting stop loss. Need to pause trading during such events to prevent huge losses.

5. Failure to exit timely when trend reverses can lead to losses from reverse trend. Need to identify trend reversal signals.

6. Parameters need optimization for different products and markets. Otherwise it may affect strategy performance.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize parameters of ATR moving average, including ATR period and smoothing parameters, which affect the ATR moving average.

2. Optimize stop loss and take profit strategy. Consider dynamic stops and targets based on ATR, instead of fixed values.

3. Add rules to determine trend reversal, combining other indicators, to avoid being trapped by reversals.

4. Test and optimize parameters for different products and market environments to find optimal parameters.

5. Add detection of extreme events, pause trading when huge price spikes occur to control loss. 

6. Optimize entry timing, consider entering on pullbacks instead of breakouts to lower risk.

7. Parameter combination optimization, test different combinations of ATR period and smoothing parameters to find best match.

## Conclusion

In summary, this strategy uses adaptive ATR moving averages to identify trends, and trades the trends with fixed stop loss and take profit. ATR moving averages effectively identify trends, and fixed stops and targets control risk/reward. The advantages are simple and clear logic, easy to understand, adaptable to different products through parameter tuning. But risks include false signals, improper stop loss setting exist. Future improvements can be made through optimizing ATR moving average parameters, stop loss/take profit strategies, adding trend reversal detection etc. to further improve strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2_close|0|price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|50|Stop loss|
|v_input_4|150|Take profit|
|v_input_5|9|From Month|
|v_input_6|true|From Day|
|v_input_7|2018|From Year|
|v_input_8|true|To Month|
|v_input_9|true|To Day|
|v_input_10|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("ATR(Hull)", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills= false, calc_on_every_tick=true, pyramiding=0)
length = input(title="Length", defval=14, minval=1)
price = input(close)
SL = input(50, title="Stop loss")
TP = input(150, title="Take profit")
FromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12) 
FromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31) 
FromYear = input(defval = 2018, title = "From Year", minval = 2017) 
ToMonth = input(defval = 1, title = "To Month", minval = 1, maxval = 12) 
ToDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31) 
ToYear = input(defval = 9999, title = "To Year", minval = 2017) 
start = timestamp(FromYear, FromMonth, FromDay, 00, 00) 
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59) 
window() => true
p=price[1]
func_hma(style, length)=>
    return = wma((2*wma(p,length/2))-wma(p,length),round(sqrt(length)))
ATR=func_hma(tr(true), length)    
plot(ATR[0], title="ATR1",color=green,transp=0)
plot(ATR[1], title="ATR2",color=red,transp=0)
if (ATR>ATR[1])
    strategy.entry("long",strategy.long,comment="Long",when=window())
if (ATR<ATR[1])
    strategy.entry("short",strategy.short,comment="Short",when=window())
//strategy.close_all(when=strategy.openprofit<-eqSL and window())
//strategy.close_all(when=strategy.openprofit>eqTP and window())
strategy.exit("exit", "long", profit = TP, loss = SL)
strategy.exit("exit", "short", profit = TP, loss = SL)
```

> Detail

https://www.fmz.com/strategy/430892

> Last Modified

2023-11-02 16:51:14
