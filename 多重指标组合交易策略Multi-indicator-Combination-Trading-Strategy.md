
> Name

多重指标组合交易策略Multi-indicator-Combination-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c0fcffbdd5befe089c.png)

[trans]


### 概述

该策略通过组合使用CCI、ADX、AO三个指标来实现多空判断和交易信号产生。其中,CCI用于判断市场是否超买超卖,ADX用于判断趋势方向,AO用于辅助判定震荡市场。多重指标组合可以提高交易系统的稳定性和效率。

### 策略原理

1. CCI指标用于判断市场是否超买超卖。当CCI低于-100时为超卖,高于100时为超买。此策略在CCI小于0时做多。

2. ADX指标判断趋势力度。DI+代表上涨趋势力度,DI-代表下跌趋势力度。ADX代表平均趋势力度。此策略在DI+低于25时做多。 

3. AO指标判断多空动能。AO由快速SMA减去慢速SMA构成。AO上涨代表当前多头力量增强,AO下跌代表空头力量增强。此策略在AO低于0时做多。

4. 综合以上多个指标,形成交易策略为:当CCI < 0 且 DI+ < 25且AO < 0时做多;当DI+ > 25时平仓。

5. 动态计算订单数量为账户权益除以close价格并下取整,实现随账户权益变动调整订单数量。

6. 使用strategy.entry发出做多信号,strategy.close发出平仓信号。

### 优势分析

1. 使用CCI判断超买超卖状况,可以有效过滤震荡行情带来的虚假信号。

2. ADX指标判断趋势存在及力度,能够捕捉到较强的趋势信号。

3. AO指标能帮助判断趋势的热度和动能,避免在震荡行情中交易。

4. 多指标组合可以相互验证信号,增强信号的可靠性,有效减少虚假信号。

5. 动态计算订单数量可以随账户权益变化调整仓位规模,具有较强的资金管理意识。

6. 策略逻辑清晰简单,容易理解和跟踪。

### 风险分析

1. CCI指标对vsdk震荡行情识别能力较弱,可能产生错误信号。

2. ADX指标有滞后性,可能错过趋势转折点。

3. AO指标对曲折盘整的判断效果不佳。

4. 多指标组合虽可提高信号可靠性,但指标设置不当也可能造成过多过滤导致错失交易机会。

5. DYNAMICAOR与市场波动性相关,需根据不同品种及市场环境调整参数。

6. 策略回撤可能较大,需要严格资金管理以控制风险。

### 优化方向

1. 优化CCI参数以识别不同市场的超买超卖区域。

2. 优化ADX参数以捕捉不同品种和市场环境下的趋势转换。 

3. 调整AO参数识别不同波动 environments下的真实趋势。

4. 测试不同的指标权重组合,寻找最优参数。 

5. 增加止损策略来控制回撤。

6. 结合交易量指标来避免虚假突破。

7. 根据不同品种特点调整固定仓位。

### 总结

本策略通过CCI、ADX和AO三个指标的组合,形成比较可靠的做多信号。同时结合动态计算订单数量和仓位管理,可以有效控制风险。策略思路简单清晰,容易理解,适合初学者跟踪学习。但该策略对震荡行情识别能力较弱,优化空间还很大,需要进一步测试调整以适应不同品种和市场环境。

||

### Overview

This strategy combines CCI, ADX and AO indicators to generate trading signals for long and short positions. CCI identifies overbought and oversold levels, ADX determines trend strength and direction, and AO assists in oscillating markets. The multi-indicator combination improves the stability and efficiency of the trading system.

### Strategy Logic

1. CCI indicates overbought above 100 and oversold below -100. This strategy goes long when CCI is below 0.

2. ADX measures trend strength. DI+ shows uptrend strength, DI- shows downtrend strength. ADX is the average trend strength. This strategy goes long when DI+ is below 25.

3. AO is fast SMA minus slow SMA. Rising AO represents strengthening bullish momentum, and falling AO represents strengthening bearish momentum. This strategy goes long when AO is below 0.

4. The trading rules are: Go long when CCI < 0 and DI+ < 25 and AO < 0; Close long when DI+ > 25. 

5. Dynamically calculate order size as equity divided by close price and rounded down, to adjust orders as account equity changes.

6. Use strategy.entry for long signals, and strategy.close for exit signals.

### Advantages

1. CCI filters noise from ranging markets, reducing false signals.

2. ADX identifies stronger trends early.

3. AO avoids trading choppy markets. 

4. Multiple indicators verify signals, increasing reliability.

5. Dynamic position sizing manages risk effectively.

6. Simple and clear logic, easy to follow.

### Risks

1. CCI struggles identifying vkosd ranges.

2. ADX has lag in catching trend turns. 

3. AO struggles with choppy consolidation. 

4. Poor indicator settings lead to over-filtering and missed trades.

5. Dynamic sizing dependent on volatility and markets.

6. Potential for large drawdowns, requiring strict risk management.

### Enhancements

1. Optimize CCI parameters for different markets.

2. Optimize ADX parameters to catch trend changes.

3. Adjust AO parameters for volatility environments. 

4. Test combinations to find optimal indicator weighting.

5. Add stop loss for drawdown control.

6. Incorporate volume for false breakout avoidance. 

7. Customize fixed position sizing by instrument.

### Conclusion

This strategy combines CCI, ADX and AO to generate fairly reliable long signals. Dynamic sizing and position management control risk. The logic is simple and clear for beginners to follow. But it struggles in ranging markets, with significant optimization potential required for different markets. Further testing and tuning is needed for robustness across instruments and environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|buywhenadxabove|
|v_input_2|10|buywhendiplusbelow|
|v_input_3|false|buywhenccibelow|
|v_input_4|false|buywhenawesomeoscillatorbelow|
|v_input_5|25|sellwhendiplusabove|
|v_input_6|20|numberofbarsforcci|
|v_input_7|14|ADX Smoothing|
|v_input_8|14|DI Length|
|v_input_9|34|Length Slow|
|v_input_10|5|Length Fast|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Strategy Niel", shorttitle="Strategy Niel", max_bars_back=2000, initial_capital=1000)

//Input variables
buywhenadxabove = input(25)
buywhendiplusbelow = input(10)
buywhenccibelow = input(0)
buywhenawesomeoscillatorbelow = input(0)
sellwhendiplusabove = input(25)

//CCI script
numberofbarsforcci = input(20)
CCI = cci(close,numberofbarsforcci)

//+DI and ADX
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
	minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) => 
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	[adx, plus, minus]

[sig, up, down] = adx(dilen, adxlen)

//plot(sig, color=red, title="ADX")
//plot(up, color=blue, title="+DI")
//plot(down, color=orange, title="-DI")


//Awesome Oscillator
nLengthSlow = input(34, minval=1, title="Length Slow")
nLengthFast = input(5, minval=1, title="Length Fast")
xSMA1_hl2 = sma(hl2, nLengthFast)
xSMA2_hl2 = sma(hl2, nLengthSlow)
xSMA1_SMA2 = xSMA1_hl2 - xSMA2_hl2
cClr = xSMA1_SMA2 > xSMA1_SMA2[1] ? blue : red
//plot(xSMA1_SMA2, style=histogram, linewidth=1, color=cClr)

buy = sig > buywhenadxabove and up < buywhendiplusbelow  and CCI < buywhenccibelow and xSMA1_SMA2 < buywhenawesomeoscillatorbelow 

ordersize=floor(strategy.equity/close) // Floor returns largest integer, strategy.equity gives total equity remaining - allows to dynamically calculate the order size as the account equity increases or decreases.
strategy.entry("long",strategy.long,ordersize,when= buy) //strategy.entry let's you enter the market variables id ("long"), strategy.long (long position entry), size of the order and when the order should happen
bought = strategy.position_size[0] > strategy.position_size[1]
entry_price = valuewhen(bought, open, 0)
sell = up > sellwhendiplusabove 
strategy.close("long", when=sell ) //strategy.close let's you close your position with variables id ('long') and when this should happen



```

> Detail

https://www.fmz.com/strategy/430245

> Last Modified

2023-10-26 15:22:28
