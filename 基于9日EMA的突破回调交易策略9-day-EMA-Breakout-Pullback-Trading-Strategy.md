
> Name

基于9日EMA的突破回调交易策略9-day-EMA-Breakout-Pullback-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略利用9日EMA作为判断指标,根据价格对EMA的突破情况判断行情方向,属于典型的趋势跟踪策略。当价格突破EMA时入场做多/空,等待价格回调后止盈。

### 策略原理

计算9日EMA均线,以其作为多空分界线。当K线开盘价在EMA线下方而收盘价上方时,认为发生向上突破,此时做多入场;当开盘价在EMA线上方而收盘价下方时,认为发生向下突破,此时做空入场。 

入场后设置止盈单,止盈价设置在该K线的最高价或最低价附近,即上涨突破止盈价为前一K线高点,下跌突破止盈价为前一K线低点。等待价格达到止盈点后结束交易。

### 优势分析

该策略利用EMA均线判断趋势方向,并在价格突破EMA时入场,可以有效跟踪趋势。止盈点靠近入场点位,适合捕捉短线回调。策略操作简单直接,容易实现自动化。

EMA周期可自定义,适应性较强。止盈策略直接高效,避免久持亏损单。回测数据显示,在趋势明显的阶段,策略表现良好。

### 风险分析

该策略仅使用单一EMA指标,在震荡行情中难以识别趋势方向,存在产生过多误信号的可能。止盈点靠近入场点位,仓位时间过短也无法充分捕捉趋势行情。

可以适当调整EMA周期参数,也可以加入其他技术指标进行辅助判断。优化止盈策略,如移动止盈、动态止盈等也可提高策略稳定性。资金管理方面控制单笔仓位规模也可降低风险。

### 优化方向

1. 测试优化EMA参数,找到更适合的周期参数。

2. 增加量能指标、波动率指标等判断规则。

3. 优化止盈策略,如引入移动止盈、动态止盈等。

4. 结合更多技术指标,形成策略组合。

5. 应用机器学习等方法判断行情趋势方向。 

6. 进行严格的资金管理,控制单笔仓位规模。

### 总结

该策略为简单的EMA突破回调交易策略,优点是思路清晰、易于实现,但仅依靠单一EMA指标效果有限。通过引入多种技术指标优化可以提高稳定性。总体来说,其为量化交易提供了一个基础的策略思路。

||


### Overview

This strategy uses the 9-day EMA as the judgement indicator, determining market direction based on price breakouts of the EMA, belonging to a typical trend following strategy. It enters long/short on EMA breakouts, and exits for profit when price pulls back.

### Strategy Logic

The 9-day EMA line is computed for trend judgement. When price opens below and closes above the EMA, an upward breakout is identified for going long. When price opens above and closes below the EMA, a downward breakout is identified for going short.

After entry, take profit stops are set near the high/low of that bar, i.e. take profit for upside breakouts is the high of previous bar, and for downside breakouts is the low of previous bar. Trades are closed when price hits the take profit levels.

### Advantage Analysis  

The strategy uses EMA to determine trends and enters on EMA breakouts, effectively tracking trends. The nearby take profit points aim to capture short-term pullbacks. The strategy logic is simple and direct, easy to automate.

The EMA period is customizable for flexibility. The direct stop profit approach avoids holding losing trades for too long. Backtests show good performance during obvious trending periods.

### Risk Analysis

The reliance on a single EMA indicator makes trend identification difficult during ranging markets, with the risk of excessive false signals. The nearby stop profits also fail to capture adequate trend moves.

Tuning the EMA period, or incorporating additional technical indicators could help improve judgement. Optimizing the stop profit, via trail stops, dynamic exits etc, could also aid stability. Controlling per trade position sizes via capital management would further limit risks.

### Optimization Directions

1. Test and optimize EMA parameters to find more suitable periods.

2. Add volume, volatility or other judgement rules.

3. Optimize stop profit strategies, such as trail stops, dynamic exits. 

4. Combine more technical indicators to form an ensemble system.

5. Apply machine learning for trend direction forecasting.

6. Adopt strict capital management to control per trade position sizing. 

### Summary

The strategy is a simple EMA breakout pullback system, which is clear and easy to implement, but limited relying on single EMA. Incorporating more technical indicators could improve robustness. Overall it provides a basic quant trading strategy idea.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("larry willians teste2", overlay=true)

//Window of time
start     = timestamp(2019, 00, 00, 00, 00)  // backtest start window
finish    = timestamp(2019, 12, 31, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"  

ema9=ema(close,9) // Ema de 9 periodos

//Condições de compra
c1= (open< ema9 and close > ema9) //abrir abaixo da ema9 e fechar acima da ema9

if(window())
    if(c1)
        strategy.entry("Compra", true, stop = high) // Coloca ordem stopgain no topo anterior
    else
        strategy.cancel("Compra") // Cancela a ordem se o proximo candle não "pegar"
        
//codições de venda
v1= (open> ema9 and close < ema9) // abrir acima da ema9 e fechar abaixo ema9

if(window())
    if (v1)
        strategy.exit("Venda", from_entry = "Compra", stop = low) // Saida da entrada com stop no fundo anterior
    else
        strategy.cancel("Venda") //Cancela a ordem se o proximo candle não "pegar"


```

> Detail

https://www.fmz.com/strategy/427353

> Last Modified

2023-09-20 11:45:21
