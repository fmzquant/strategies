
> Name

RSI多空动量策略RSI-Momentum-Long-Short-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/170f858ca2195a0c150.png)

[trans]

## 概述

RSI多空动量策略是一种典型的以Larry Connors RSI指标为基础,使用RSI指标的超买超卖信号来决定买入卖出的动量策略。该策略主要判断价格是否处于超买或超卖状态,并以此作为买入卖出信号。

## 策略原理

该策略通过计算一段时间内的价格上涨动量和下跌动量,来构建RSI指标。当RSI指标低于超卖线10时视为超卖,当指标高于超买线90时视为超买。策略在RSI指标从低位上穿超卖线时产生买入信号,在RSI指标从高位下穿超买线时产生卖出信号。

策略额外加入了均线判断规则,要求5日均线高于200日均线时才能产生买入信号,5日均线低于200日均线时才能产生卖出信号。这可以过滤掉短期反弹造成的假信号。

另外,策略还增加了止盈机制。当持有多头头寸时,如果RSI指标上穿超买线90,会强制平掉所有多头;当持有空头头寸时,如果RSI指标下穿超卖线10,会强制平掉所有空头。这可以锁定盈利,避免亏损扩大。

## 策略优势

1. 使用RSI指标判断超买超卖状态,可以捕捉到价格反转的时机。

2. 增加均线过滤,可以减少短期噪音造成的错误交易。

3. 设置止盈机制,可以很好控制风险,避免亏损扩大。

4. 策略规则简单清晰,容易理解实现。

5. RSI是一种常用且实用的技术指标,许多股票和数字货币都适用。

## 策略风险

1. RSI指标存在反转失败的可能。价格超买超卖不一定会发生反转。

2. 均线过滤也可能过滤掉较好的交易机会。

3. 止盈设置不当也会过早止盈,无法持有较长线的趋势。

4. 需要适当调整参数,如计算RSI的周期长度、超买超卖阈值、均线参数等。

可通过优化参数、组合其他指标、适当宽松止盈以减少上述风险。

## 策略优化方向

1. 可以测试不同周期的RSI指标效果。

2. 可以增加其他指标,如KDJ、MACD等与RSI形成组合。

3. 可以根据市场情况调整超买超卖阈值。

4. 可以根据具体持仓时间调整止盈激活的RSI数值。

5. 可以添加止损策略,在亏损达到一定比例时止损。

6. 可以优化均线系统,改为动态追踪止损。

## 总结

RSI多空动量策略利用RSI指标判断超买超卖状态作为信号,加入均线和止盈规则进行筛选过滤,可以有效抓住短期反转机会。该策略简单实用,值得进一步测试优化,以适应更广泛的市场情况。总体来说,该策略提供了一个不错的思路,可以作为量化交易策略开发的参考。

|| 


## Overview

The RSI Momentum Long Short strategy is a typical momentum strategy based on the Larry Connors RSI indicator, using the overbought and oversold signals from RSI to determine entries and exits. The key is to identify whether the price is in overbought or oversold status and use that as trading signals.

## Strategy Logic

The strategy constructs RSI indicator by calculating the upside momentum and downside momentum of prices over a lookback period. RSI below oversold line 10 is considered oversold, while RSI above overbought line 90 is considered overbought. The strategy generates long signals when RSI crosses oversold line from below, and generates short signals when RSI crosses overbought line from above.

Additional moving average filters are added - only allowing long signals when 5day MA is above 200day MA, and short signals when 5day MA is below 200day MA. This helps filter out false signals from short-term rebounds. 

Profit taking mechanisms are also introduced. Existing long positions will be closed out when RSI crosses above overbought line 90. Existing short positions will be closed out when RSI crosses below oversold line 10. This locks in profits and avoids increasing losses.

## Advantages of the Strategy

1. Using RSI to identify overbought/oversold levels catches price reversal moments. 

2. Adding MA filters reduces false signals from short-term noise.

3. Profit-taking mechanics help control risks and limit losses.

4. Simple and clear rules, easy to understand and implement.

5. RSI is a widely used and practical indicator, suitable for many instruments.

## Risks of the Strategy

1. RSI overbought/oversold may not always result in reversal.

2. MA filters could also filter out good trading opportunities. 

3. Improper profit-taking settings give up trends too early.

4. Parameters like RSI lookback, overbought/oversold levels, MA settings need tuning.

Risks can be reduced via parameter optimization, combining other indicators, flexible profit-taking, etc.

## Enhancement Opportunities 

1. Test RSI with different lookback periods.

2. Add other indicators like KDJ, MACD to supplement RSI. 

3. Adjust overbought/oversold levels based on market regimes.

4. Fine tune profit-taking RSI levels based on holding period.

5. Incorporate stop loss strategies based on max loss percentage.

6. Optimize MA system, use dynamic trailing stop loss.

## Conclusion

The RSI Momentum Long Short Strategy catches short-term reversal opportunities by using RSI to identify overbought/oversold levels, filtered by MAs and profit-taking rules. The strategy is simple and practical, worth further testing and enhancement to adapt to diverse markets. Overall it provides a good framework that can serve as a reference for quantitative trading strategy development.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Entry area|
|v_input_2|90|overBought|
|v_input_3|10|overSold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-25 00:00:00
end: 2023-10-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//authour: SudeepBisht
//@version=3
//Based on Larry Connors RSI-2 Strategy - Lower RSI
strategy("SB_CM_RSI_2_Strategy_Version 2.0", overlay=true)

src = close
entry= input(defval=0,title="Entry area")
entry:=nz(entry[1])
overBought=input(90)
overSold=input(10)
//RSI CODE
up = rma(max(change(src), 0), 2)
down = rma(-min(change(src), 0), 2)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
//Criteria for Moving Avg rules
ma5 = sma(close,5)
ma200= sma(close, 200)

//Rule for RSI Color
col = close > ma200 and close < ma5 and rsi < 10 ? lime : close < ma200 and close > ma5 and rsi > 90 ? red : silver
chk= col==red?-1:col==lime?1:0

if (not na(rsi))
    if (crossover(rsi, overSold))
        if(chk[1]==1)
            strategy.entry("RsiLE", strategy.long, comment="RsiLE")
            entry:=1
    if (crossunder(rsi, overBought))
        if(chk[1]==-1)
            strategy.entry("RsiSE", strategy.short, comment="RsiSE")
            entry:=-1
        
if (not na(rsi))
    if (crossover(rsi, overSold) and entry==-1)
        strategy.close_all()
        //strategy.entry("RsiLE", strategy.long, comment="RsiLE")
        entry:=0
    if (crossunder(rsi, overBought) and entry==1)
        strategy.close_all()
        //strategy.entry("RsiSE", strategy.short, comment="RsiSE")
        entry:=0
        

```

> Detail

https://www.fmz.com/strategy/430271

> Last Modified

2023-10-26 17:05:40
