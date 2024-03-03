
> Name

均线交叉和MACD过滤的海因阿修蜡烛策略V3Heiken-Ashi-Moving-Average-Crossover-Strategy-with-MACD-Filter-V3

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1019fb6adcaf3a9e43a.png)

[trans]

## 概述

本策略通过计算海因阿修蜡烛的移动均线交叉来产生交易信号,并结合MACD作为过滤条件,实现了一个较为稳定的交易系统。

## 策略原理

1. 计算海因阿修蜡烛的开盘价和收盘价
2. 计算快速移动均线(EMA)和慢速移动均线(SMA)
3. 当快速移动均线上穿慢速移动均线时,产生买入信号
4. 当快速移动均线下穿慢速移动均线时,产生卖出信号
5. 如果启用MACD过滤,只有当MACD柱上穿0轴时才产生买入信号,MACD柱下穿0轴时才产生卖出信号

## 优势分析

1. 海因阿修蜡烛能有效滤除市场噪音,使得移动均线交叉信号更可靠
2. 结合不同周期的均线,可以采用多重确认,避免假突破
3. MACD过滤有助于进一步避免假信号,提高信号质量
4. 采用海因阿修蜡烛计算均线,可以降低 Scientistå1⁄4 è ́±è ̄ã2022å1 ́11æ10æ¥10:33

本V3版本的海因阿修蜡烛策略,通过计算海因阿修蜡烛的移动均线交叉来产生交易信号,并结合MACD作为过滤条件,相比V1和V2版本有了很大的改进。

总体来说,该策略具有以下优势:

1. 海因阿修蜡烛能有效滤除市场噪音,使得移动均线交叉信号更清晰可靠。

2. 采用快慢均线组合,可以避免被单一均线的假突破欺骗。

3. 加入MACD过滤机制,可以进一步避免假信号,提高入场的准确率。

4. 采用不同周期的均线,实现多时间框架的确认,这也提高了信号的可靠性。

5. 使用海因阿修蜡烛计算均线,可以减少由普通K线带来的回撤。

6. 该策略参数设置合理,操作频率适中,无需高频交易也可以获得稳定收益。

但是该策略也存在一些风险需要注意:

1. 在震荡行情中,可能会出现多次调整仓位的反复交易。

2. MACD作为过滤指标也可能出现失效的情况,导致假信号的产生。

3. 均线系统对参数设置比较敏感,需要谨慎测试最佳参数组合。

4. 长期持有仓位时,需要关注突发事件带来的重大行情变化。

5. 仍需人工判断大级别趋势,避免逆势交易带来的损失。

总的来说,该策略作为一个较成熟的均线策略,在参数调整合理的前提下,可以获得稳定的投资收益。但交易者仍需关注风险,适时调整仓位,并结合趋势判断来运用该策略。

||


## Overview

This strategy generates trading signals by calculating the moving average crossover of Heiken Ashi candles, combined with MACD as a filter condition. It implements a relatively stable trading system.

## Strategy Logic

1. Calculate the open and close prices of Heiken Ashi candles.

2. Calculate fast moving average (EMA) and slow moving average (SMA). 

3. When fast MA crosses above slow MA, a buy signal is generated.

4. When fast MA crosses below slow MA, a sell signal is generated.

5. If MACD filter is enabled, buy signals are only generated when MACD histogram crosses above 0 line, and sell signals are only generated when MACD histogram crosses below 0 line.

## Advantage Analysis 

1. Heiken Ashi candles effectively filter out market noise, making MA crossover signals more reliable.

2. Combining MAs of different periods avoids false breakouts from single MA. 

3. MACD filter further avoids false signals and improves signal quality.

4. Using Heiken Ashi to calculate MA reduces drawdowns from regular candles. 

5. The strategy has reasonable parameters and moderate trading frequency, allowing stable profits without high frequency trading.

## Risk Analysis

However, some risks need to be noticed:

1. Repeated position adjustments may occur in ranging markets.

2. MACD filter may fail in some cases, resulting in false signals.

3. MA systems are sensitive to parameter tuning, requiring careful optimization.

4. Long holding positions need to monitor events that may cause significant market changes. 

5. Manual judgement of major trends is still needed to avoid losses from counter-trend trading.

In conclusion, this is a relatively mature MA strategy that can provide steady profits with proper parameter tuning. But traders still need to watch out for risks, adjust positions accordingly, and combine trend analysis when applying it.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|60|Heikin Ashi Candle Time Frame|
|v_input_2|true|Heikin Ashi Candle Time Frame Shift|
|v_input_3|180|Heikin Ashi EMA Time Frame|
|v_input_4|false|Heikin Ashi EMA Time Frame Shift|
|v_input_5|true|Heikin Ashi EMA Period|
|v_input_6|true|Heikin Ashi EMA Shift|
|v_input_7|30|Slow EMA Period|
|v_input_8|true|Slow EMA Shift|
|v_input_9|false|With MACD filter|
|v_input_10|15|MACD Time Frame|
|v_input_11|true|MACD Shift|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Heiken-Ashi Strategy  V3 by wziel

// strategy("Heiken-Ashi Strategy  V3",shorttitle="WZIV3",overlay=true,default_qty_value=10000,initial_capital=10000,currency=currency.USD)
res = input(title="Heikin Ashi Candle Time Frame",  defval="60")
hshift = input(1,title="Heikin Ashi Candle Time Frame Shift")
res1 = input(title="Heikin Ashi EMA Time Frame",  defval="180")
mhshift = input(0,title="Heikin Ashi EMA Time Frame Shift")
fama = input(1,"Heikin Ashi EMA Period")
test = input(1,"Heikin Ashi EMA Shift")
sloma = input(30,"Slow EMA Period")
slomas = input(1,"Slow EMA Shift")
macdf = input(false,title="With MACD filter")
res2 = input(title="MACD Time Frame",  defval="15")
macds = input(1,title="MACD Shift")




//Heikin Ashi Open/Close Price
ha_t = heikinashi(syminfo.tickerid)
ha_open = security(ha_t, res, open[hshift])
ha_close = security(ha_t, res, close[hshift])
mha_close = security(ha_t, res1, close[mhshift])

//macd
[macdLine, signalLine, histLine] = macd(close, 12, 26, 9)
macdl = security(ha_t,res2,macdLine[macds])
macdsl= security(ha_t,res2,signalLine[macds])

//Moving Average
fma = ema(mha_close[test],fama)
sma = ema(ha_close[slomas],sloma)
plot(fma,title="MA",color=lime,linewidth=2,style=line)
plot(sma,title="SMA",color=red,linewidth=2,style=line)


//Strategy
golong =  crossover(fma,sma) and (macdl > macdsl or macdf == false )
goshort =   crossunder(fma,sma) and (macdl < macdsl or macdf == false )

strategy.entry("Buy",strategy.long,when = golong)
strategy.entry("Sell",strategy.short,when = goshort)




```

> Detail

https://www.fmz.com/strategy/430121

> Last Modified

2023-10-25 11:26:17
