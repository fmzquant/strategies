
> Name

布林带跨度交易策略Bollinger-Band-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15d8d64ac021fd2c2a8.png)

[trans]

### 概述

该策略基于布林带的上下轨,判断价格突破布林带上轨时做多,突破下轨时做空,属于趋势跟踪类型策略。

### 策略原理

该策略使用布林带中的中轨、上轨、下轨来判断极端价格范围。中轨是过去25个周期收盘价的简单移动平均线,上下轨线分别是中轨线上下一个标准差的距离。当价格从上轨线下穿或者从下轨线上穿时,说明价格出现了突破,属于异常价格行为,这时可以做出交易决策。

如果价格低于下轨线时,买入做多;如果价格高于上轨线时,卖出做空。做多时候,设置止损线为入场价乘以止损因子,止盈线为入场价乘以止盈因子。

该策略还加入了一些辅助规则,比如24小时内只允许发出一个信号,避免无谓的交易。

### 策略优势

1. 使用布林带判断异常价格范围,属于趋势跟踪策略,能够捕捉价格趋势
2. 按照止损止盈原则设置了相关参数,可以控制单笔损失
3. 加入了一些辅助规则,避免重复信号和无谓交易

### 策略风险

1. 布林带范围并不能完全代表价格趋势,可能出现错误信号
2. 突破信号时机选择不当可能导致亏损
3. 趋势市没有趋势的时间长短和涨跌动能难以预测,可能导致不必要的买入

风险控制措施:

1. 调整布林带参数,优化突破信号时机
2. 结合其他指标判断大趋势
3. 根据不同品种和市场情况设定止损止盈幅度

### 策略优化方向  

1. 可以考虑布林带参数自适应优化,使布林带更贴近当前市场状态
2. 可以结合其他指标,判断趋势信号的可靠性,避免错误信号
3. 可以结合机器学习模型,自动识别最佳的买入卖出时机

### 总结

该策略整体来说属于简单的趋势跟踪策略,使用布林带判断价格异常并跟踪趋势,在参数优化、风险控制和信号过滤方面还有优化空间,但核心思路简单清晰,适合作为策略学习入门。

||

### Overview

This strategy is based on the upper and lower rails of the Bollinger Bands to determine when the price breaks through the upper rail of the Bollinger Bands to go long and breaks through the lower rail to go short. It belongs to the trend tracking type of strategy.

### Strategy Logic

This strategy uses the middle / upper / lower rail of the Bollinger Bands to determine extreme price ranges. The middle rail is the simple moving average of closing prices over the past 25 periods. The upper and lower rails are one standard deviation above and below the middle rail. When the price breaks through the upper or lower rail, it indicates that there is a breakout and abnormal price behavior, which can be used to make trading decisions.  

If the price is below the lower rail, go long. If the price is above the upper rail, go short. When going long, set the stop loss to the entry price multiplied by the stop loss factor and take profit to the entry price multiplied by the take profit factor.

The strategy also incorporates some auxiliary rules, such as allowing only one signal per 24 hours to avoid unnecessary trading.

### Advantages of the Strategy

1. Using Bollinger Bands to determine abnormal price ranges belongs to trend tracking strategies that can capture price trends.
2. Stop loss and take profit parameters are set according to principles to control single loss.
3. Some auxiliary rules are added to avoid duplicate signals and unnecessary trading.

### Risks of the Strategy  

1. Bollinger Bands cannot fully represent price trends, and there may be false signals.  
2. Improper timing of breakout signals can lead to losses.
3. The duration and momentum of trend or non-trend markets are difficult to predict, which may lead to unnecessary long positions.

Risk Management:

1. Adjust Bollinger Band parameters to optimize breakout signal timing.
2. Incorporate other indicators to determine the major trend.  
3. Set stop loss and take profit range according to different products and market conditions.

### Optimization Directions

1. Consider adaptive optimization of Bollinger Band parameters to make them fit better to current market conditions.
2. Incorporate other indicators to judge reliability of trend signals and avoid false signals.
3. Incorporate machine learning models to automatically identify optimal long and short timing.

### Conclusion

In summary, this is a simple trend tracking strategy using Bollinger Bands to determine abnormal prices and track trends. There is room for improvement in parameter optimization, risk control and signal filtering, but the core idea is simple and clear, making it suitable as a beginner strategy for learning.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|Leverage (x)|
|v_input_float_2|true|Risk Capital per Trade (%)|
|v_input_float_3|2|TP_Factor|
|v_input_bool_1|false|invertBuyLogic|
|v_input_int_1|25|lookbackDistance|
|v_input_float_4|2|devMult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-18 00:00:00
end: 2023-12-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("I11L OIL Bot",overlay=true, initial_capital=1000000,default_qty_value=1000000,default_qty_type=strategy.cash,commission_type=strategy.commission.percent,commission_value=0.00)

leverage = input.float(1,"Leverage (x)",step=1)
SL_Factor = 1 - input.float(1,"Risk Capital per Trade (%)", minval=0.1, maxval=100, step=0.05) / 100 / leverage
TP_Factor = input.float(2, step=0.1)
invertBuyLogic = input.bool(false)
 
lookbackDistance = input.int(25)
devMult = input.float(2,step=0.1)

var lastSellHour = 0
var disableAdditionalBuysThisDay = false


if(time > lastSellHour + 1000 * 60 * 60 * 6)
    disableAdditionalBuysThisDay := false
if(strategy.position_size != strategy.position_size[1])
    disableAdditionalBuysThisDay := true
    lastSellHour := time

source = close

//Trade Logic
basis = ta.sma(source, lookbackDistance)
dev = devMult * ta.stdev(source, lookbackDistance)
upper = basis + dev
lower = basis - dev
isBuy = ta.crossunder(source, upper)
isBuyInverted = ta.crossover(source, lower)

plot(upper, color=color.white)
plot(lower, color=color.white)

strategy.initial_capital = 50000

if((invertBuyLogic ? isBuyInverted : isBuy) and not(disableAdditionalBuysThisDay))
    strategy.entry("Long", strategy.long, (strategy.initial_capital / close) * leverage)

if(strategy.position_size > 0)
    strategy.exit("SL Long", "Long", stop=strategy.position_avg_price * SL_Factor)
    strategy.close("Long",  when=close > strategy.position_avg_price * (1 + (1 - SL_Factor) * TP_Factor), comment="TP Long")




```

> Detail

https://www.fmz.com/strategy/435869

> Last Modified

2023-12-19 14:08:45
