
> Name

多指标买卖策略Multi-Indicator-Buy-and-Sell-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16fe6ff2c466ab20b61.png)

[trans]


### 概述

本策略通过结合均线指标、超买超卖指标以及波动率指标,在超跌反弹的情况下进行逢低买入,在超买回落的情况下进行逢高卖出,实现趋势跟踪。

### 策略原理

当RSI和Stoch指标同时处于超卖区域,而AO震荡器出现反转信号时建立仓位。具体来说,当RSI和Stoch均处于低位(低于30和20),而AO从负转正时做多;当RSI和Stoch均处于高位(高于70和80),而AO从正转负时做空。止损和止盈根据ATR指标的数值设定,使其能够根据市场波动调整止损止盈位置。

本策略主要使用了四个指标:

- AO震荡器:反映价格变动的动量,可用于判断趋势反转。
- RSI相对强弱指标:反映超买超卖情况。低于30为超卖区域。
- StochStochastic:反映超买超卖区域。低于20为超卖区域。  
- ATR平均真实波幅:反映近期价格波动幅度。

当AO出现反转信号,并且RSI和Stoch同时处于超卖区域时,说明价格可能出现反转,这时可以介入建立仓位。ATR指标则用于设定止损止盈价格,根据市场波动性调整止损止盈幅度,避免被套。

### 策略优势

- 使用多个指标确认信号,避免因单一指标造成的错误交易。
- 根据市场波动性设定止损止盈幅度,可以有效控制单笔损失。
- 策略交易逻辑简单清晰,容易理解实现。
- 利用超买超卖情况介入,可以及时捕捉反转机会。

### 风险及解决

- AO指标容易产生假信号,需要与RSI和Stoch指标组合使用,避免错误交易。
- 固定的参数设置可能无法适应市场的变化,需要优化参数。
- 停损点过于接近,可能会被频繁止损。可以适当放宽止损范围,或使用离场策略。
- 固定的止盈点,可能会过早离场或inlineCallbacks。可以使用移动止盈或分批离场。

为减小这些风险,可以从以下几个方面进行优化:

1. 优化参数,使其更能适应不同周期及品种的市场。
2. 改进止损机制,例如移动止损、离场分批等。 
3. 优化入场条件,避免因为单指标造成错误信号。
4. 优化止盈方式,例如移动止盈或根据趋势分段止盈。

### 策略优化方向 

本策略可以从以下几个方面进行优化:

1. 优化参数设置。可以通过遍历寻优等方法找到更优参数组合。

2. 增加过滤条件。可以在入场时增加额外指标的确认,避免假信号。

3. 优化止损机制。可以使用移动止损、离场分批等方式,控制风险。

4. 优化止盈方式。可以使用移动止盈、根据趋势分段止盈等方式,锁定更多利润。

5. 增加自动止盈。例如接近重要整数关口时止盈,避免冲高回落。

6. 优化资金管理。例如根据风险变化调整仓位大小,控制最大损失。

7. 针对特定品种/周期进行测试优化。参数及止损止盈方式应针对不同品种及周期进行优化。

8. 增加对突发事件的处理。例如important news时避开交易,或快速止损。

### 总结

本策略综合运用了均线系统、超买超卖系统及波动率系统,在价值低估时逢低买入,价值高估时逢高卖出,具有较强的趋势跟踪能力。但也存在一些参数设置固定、止损机制不完善等问题。我们可以从优化参数设置、完善止损机制、增加滤波条件等方面进行多角度的优化,使策略更稳健可靠。在实盘运用时,也需要结合回测结果针对具体品种和周期进行测试优化,才能发挥策略最大效用,获得稳定收益。


||

### Overview

This strategy combines moving average, overbought-oversold and volatility rate indicators to buy on dips when oversold and sell on rallies when overbought, in order to track trends.

### Strategy Logic

Take positions when RSI and Stoch are both in oversold/overbought zones and AO oscillator shows reversal signal. Specifically, go long when RSI and Stoch are low (below 30 and 20) and AO turns from negative to positive; go short when RSI and Stoch are high (above 70 and 80) and AO turns from positive to negative. Set stop loss and take profit based on ATR value to adjust loss/profit levels according to market volatility.

The strategy mainly uses four indicators:

- AO oscillator: reflects price momentum, can be used to identify trend reversal.  
- RSI: reflects overbought/oversold levels. Below 30 is oversold zone.
- Stoch: reflects overbought/oversold zones. Below 20 is oversold zone.
- ATR: reflects recent price volatility.

When AO shows reversal signal and RSI & Stoch are both in oversold/overbought zones, price may reverse. Take positions at this time. Use ATR to set stop loss and take profit prices to avoid being trapped by adjusting loss/profit range based on volatility.

### Advantages

- Use multiple indicators to confirm signals, avoiding wrong trades from single indicator.
- Set stop loss/profit based on volatility to control single loss.
- Simple and clear logic, easy to understand and implement.  
- Take advantage of overbought/oversold situations to capture reversals.

### Risks and Solutions

- AO may generate false signals. Needs to combine with RSI and Stoch to avoid wrong trades.
- Fixed parameters may fail to adapt to market changes. Parameters need to be optimized.
- Stop loss too close may trigger frequent stops. Can loosen stop range or use exit strategies.  
- Fixed take profit may exit too early or late. Can use adaptive take profit or partial exits.

To reduce risks, optimize in below aspects:

1. Optimize parameters to adapt to different periods and instruments.
2. Improve stop loss methods like trailing stop, partial exits.
3. Optimize entry rules to avoid false signals.
4. Optimize take profit ways like adaptive take profit, segmented by trends.

### Optimization Directions

Below aspects can be optimized for the strategy:

1. Optimize parameter settings by traversing different values.

2. Add filter conditions on entry to avoid false signals.  

3. Optimize stop loss methods like trailing stop loss.

4. Optimize take profit ways like adaptive take profit.

5. Add automatic take profit near key levels to avoid pullback.

6. Optimize money management adjusting position size by risk.

7. Test and optimize parameters and stop/profit levels based on different instruments and timeframes.

8. Handle extreme events like avoiding trades during news or fast cut loss.

### Summary

This strategy combines moving average, overbought-oversold and volatility systems to buy low and sell high, with strong trend following ability. But some problems like fixed parameters and improper stop loss exist. We can optimize from various aspects like parameter tuning, improving stop loss, adding filters to make it more robust. In real trading, need to test and optimize based on specific instruments and periods to maximize its efficacy and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Fast Length|
|v_input_2|34|Slow length|
|v_input_3|14|K|
|v_input_4|3|D|
|v_input_5|3|smooth|
|v_input_6_close|0|rsi source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|10|rsi length|
|v_input_8|14|ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-10-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("Buy&Sell Strategy depends on AO+Stoch+RSI+ATR by SerdarYILMAZ", shorttitle="Buy&Sell Strategy")
// Created by Serdar YILMAZ
// This strategy is just for training, its purpose is just learning code in pine script.
// Don't make buy or sell decision with this strategy.
// Bu strateji sadece pine script'te kodlamanın nasıl yapildigini ogrenmek icindir.
// Bu stratejiye dayanarak, kesinlikle al-sat islemleri yapmayin.

//AO

fast=input(title="Fast Length",type=input.integer,defval=5)
slow=input(title="Slow length",type=input.integer,defval=34)

awesome=(sma(hl2,fast)-sma(hl2,slow))*1000

plot(awesome, style=plot.style_histogram, color=(awesome>awesome[1]?color.green:color.red))

//Stoch

K=input(title="K",type=input.integer,defval=14)
D=input(title="D",type=input.integer,defval=3)
smooth=input(title="smooth",type=input.integer,defval=3)

k=sma(stoch(close,high,low,K),D)
d=sma(k,smooth)

hline(80)
hline(20)

plot(k,color=color.blue)

//RSI

rsisource=input(title="rsi source",type=input.source,defval=close)
rsilength=input(title="rsi length",type=input.integer,defval=10)

rsi=rsi(rsisource,rsilength)

hline(70,color=color.orange)
hline(30,color=color.orange)

plot(rsi,color=color.orange)

//ATR

atrlen=input(title="ATR Length", type=input.integer,defval=14)

atrvalue=rma(tr,atrlen)

plot(atrvalue*1000,color=color.green)

LongCondition=k<20 and rsi<30 and awesome>awesome[1]
ShortCondition=k>80 and rsi>70 and awesome<awesome[1]
if (LongCondition)
    stoploss=low-atrvalue
    takeprofit=close+atrvalue
    strategy.entry("Long Position", strategy.long)
    strategy.exit("TP/SL",stop=stoploss,limit=takeprofit)
    
if (ShortCondition)
    stoploss=high+atrvalue
    takeprofit=close-atrvalue
    strategy.entry("Short Position",strategy.short)
    strategy.exit("TP/SL",stop=stoploss,limit=takeprofit)
    
    

    
    



```

> Detail

https://www.fmz.com/strategy/429567

> Last Modified

2023-10-18 11:36:38
