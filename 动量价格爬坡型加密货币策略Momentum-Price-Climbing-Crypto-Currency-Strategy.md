
> Name

动量价格爬坡型加密货币策略Momentum-Price-Climbing-Crypto-Currency-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bbc7404a1070b432cc.png)
[trans]
### 概述

该策略是一个简单高效的适用于加密货币的短线交易爬坡策略,也可用于中长线趋势交易。其主要组成部分包括价格震荡指标、漩涡指标以及止损止盈的风险管理机制。

### 策略原理

该策略的入场条件为:
1. 价格震荡指标为正,表示价格在爬坡;
2. 漩涡指标VIP上穿VIM,表明趋势向上; 
3. 当前K线收盘价高于前两根K线的最高价,也意味着价格在向上突破。

当以上三个条件同时满足时做多头入场。

该策略的出场条件为: 
1. 价格震荡指标为负,表示价格在回落,做多头出场;
2. 漩涡指标VIP下穿VIM,表明趋势向下,做多头出场;
3. 达到止盈或止损条件。

### 策略优势 

该策略结合了价格震荡指标和漩涡指标来判断价格趋势和突破信号,能够有效捕捉价格上涨阶段,具有如下优势:

1. 使用价格震荡指标判断价格爬坡方向,避免在盘整时错交易;
2. 漩涡指标判断趋势方向,有助于确定大趋势;  
3. K线收盘价突破判断力度,可减少假突破机会;
4. 风险管理机制设置止盈止损点,有效控制每单交易风险;
5. 可灵活调整参数,适用于不同周期和品种。


### 策略风险

尽管该策略整体来说比较稳定,但也存在一定的风险需要注意:

1. 错过长线大趋势的风险。如果用在过于短线周期,可能错过更大的行情机会;
2. 假突破的风险。当价格出现剧烈波动时,短期内可能出现一些误导型走势,容易诱发假信号;  
3. 参数不当导致过于频繁交易的风险。参数设置不当可能导致交易频繁,增加交易成本和滑点损失。

可通过调整持仓周期、组合更多指标过滤信号、优化参数设置等方式来防范和化解上述风险。

### 策略优化方向 

该策略还可从以下几个方向进行优化:

1. 增加更多指标判断,如波动率、量能指标等,提高信号的质量; 
2. 优化参数设置,使其更符合不同品种和周期的特点;  
3. 增加机器学习模型判断,利用大数据泛化预测价格走势;
4. 在高级平台中加入自动止损、追踪止盈功能,使交易更加自动化。

通过上述优化,可以进一步提升策略的胜率、盈利水平、稳定性。

### 总结

该策略整体较为简洁有效,能够捕捉价格爬坡上涨阶段,在加密货币中具有不错的盈利潜力。虽然仍有进一步优化的空间,但作为一个量化交易的入门策略已经较为出色。总体来说,该策略适合追求高频率盈利的加密货币短线和中线交易者。

||

### Overview

This strategy is a simple and efficient short-term trading climb strategy suitable for cryptocurrencies, and can also be used for medium and long-term trend trading. Its main components include price fluctuation index, vortex indicator and risk management mechanism of stop loss and take profit.

### Strategy Principle 

The entry conditions for this strategy are:

1. The price fluctuation index is positive, indicating that the price is climbing;  

2. The VIP of the vortex indicator crosses above the VIM, indicating an upward trend;

3. The closing price of the current K line is higher than the highest price of the previous two K lines, which also means the price is breaking upwards.

When the above three conditions are met at the same time, go long to enter the market.  

The exit conditions for this strategy are:

1. The price fluctuation index is negative, indicating that the price is falling back, exit long positions;

2. The VIP of the vortex indicator crosses below the VIM, indicating a downward trend, exit long positions;  

3. Reaching the stop loss or take profit condition.

### Advantages of the Strategy

This strategy combines the price fluctuation index and vortex indicator to judge price trends and breakthrough signals, and can effectively capture the upside price movement, with the following advantages:  

1. Using the price fluctuation index to determine if the price is climbing, avoids wrong trading during consolidation;

2. Vortex indicator to judge the trend direction, helps identify overall market trends;   

3. Closing price breakthrough judges the momentum that could reduce fake breakouts;

4. Risk management mechanisms set stop loss and take profit points to effectively control the risk per trade;

5. Flexibility to adjust parameters suitable for different cycles and trading products.

### Risks of the Strategy

Although the strategy is generally stable, there are still some risks to note:

1. Missing major trend: using an overly short-term cycle may miss bigger market opportunities;  

2. Fake breakout risk: prices may have misleading moves during sharp fluctuations, tending to trigger false signals;

3. Excessive trading risk: improper parameter settings can lead to overly frequent trading, increasing transaction costs and slippage losses.  

These risks could be prevented and resolved by adjusting holding cycle, combining more indicators to filter signals, optimizing parameter settings etc.

### Directions for Strategy Optimization  

The strategy can also be optimized in the following aspects:  

1. Add more technical indicators for judgement, such as volatility, volume indicators etc. to improve signal quality;

2. Optimize parameter settings to better suit different products and cycles;   

3. Increase machine learning models to generalize price movement predictions based on big data;  

4. Add auto stop loss, trailing stop profit functions on advanced platforms for increased automation.

Through the above optimizations, the win rate, profit level and stability of the strategy can be further improved.

### Summary  

The strategy is relatively simple and efficient overall, able to capture upside price climbing phases with decent profit potential for crypto currencies. Although there is room for further optimization, it already works well as an introductory quantitative trading strategy. In summary, this strategy suits crypto currency traders looking for high frequency short and medium-term profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|Number of candles|
|v_input_2|14|Length VORTEX|
|v_input_3|0.1|TP Long|
|v_input_4|0.1|SL Long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-02-03 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99
//@version=4
strategy(title="Crypto Price Scalper", shorttitle="Scalper Crypto", overlay=true)

inputcc = input(60, title="Number of candles")


low9=lowest(low,inputcc)
high9=highest(high,inputcc)



plotlow = ((close - low9) / low9) * 100

plothigh = ((close - high9) / high9) * 100

plotg = (plotlow +plothigh)/2

center=0.0


period_ = input(14, title="Length VORTEX", minval=2)
VMP = sum( abs( high - low[1]), period_ )
VMM = sum( abs( low - high[1]), period_ )
STR = sum( atr(1), period_ )
VIP = VMP / STR
VIM = VMM / STR


long= crossover(plotg,center) and close > high[2] and crossover(VIP,VIM)
short= crossunder(plotg,center) and crossunder(VIP,VIM)

tplong=input(0.1, title="TP Long", step=0.01)
sllong=input(0.1, title="SL Long", step=0.01)
strategy.entry("long",1,when=long)

strategy.exit("closelong", "long" , profit = close * tplong / syminfo.mintick, loss = close * sllong / syminfo.mintick, alert_message = "closelong")

strategy.close("long",when=short)




```

> Detail

https://www.fmz.com/strategy/440994

> Last Modified

2024-02-04 15:38:17
