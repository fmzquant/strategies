
> Name

基于均线和EMA的跨时间框架趋势策略Multi-Timeframe-Moving-Average-and-EMA-Based-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165a2c604b97a24919b.png)
[trans]
## 概述

本策略是一个利用均线和EMA实现跨时间框架趋势交易的策略。策略通过结合不同周期的SMA、EMA以及K线实体判断趋势方向,实现低风险的趋势追踪。

## 策略原理  

该策略主要基于三个周期不同的SMA均线比较,判断价格走势。另外辅助使用EMA判断实体方向。

具体来说,策略使用了3个周期的SMA均线,分别是3周期、8周期和10周期的SMA。价格在三条均线之下时视为处于跌势,当价格重新回升到均线上时,发出买入信号。

此外,策略还使用5周期的EMA辅助判断K线实体方向,确保买入时实体向上。

在持仓管理上,策略设定盈利次数或最大持仓周期作为止损方式。

## 优势分析

该策略结合不同时间周期的均线实现对趋势的判断,能够有效过滤市场噪音,追踪中长线趋势。策略参数经过优化,在历史回测中表现不俗。

另外,策略加入EMA判断,能够避免买入K线实体向下的情况,从而减少不必要的滑点损失。

总的来说,该策略稳定、可靠,适合中长线追踪使用。

## 风险及对策  

- 该策略对参数比较敏感,3个SMA周期或EMA周期设置不当会导致交易信号质量下降。需要针对不同品种进行参数优化。

- 策略没有考虑大幅度跳空或缺口的情况。如果遇到重大消息导致价格大幅跳空,则可能造成一定损失。可以设置价格止损来规避此风险。

## 优化方向  

- 可以考虑加入更多周期参数,形成多时间框架的EMA或SMA比较,使策略对趋势的判断更加准确。

- 可以测试一定幅度的价格止损设置,在保证盈利的前提下,降低极端行情的损失。

- 可以尝试引入机器学习对参数进行动态优化,使策略参数能根据实时市场情况进行调整。

## 总结  

该策略整体来说稳健可靠,利用均线比较判断趋势方向,再辅以EMA过滤信号。通过参数优化和风控设置,可以进一步提高策略胜率和盈利率。值得进一步研究和应用。

||

## Overview

This strategy utilizes moving averages (MA) and EMA across different timeframes to identify and trade trends. By combining SMA, EMA of various periods, as well as candlestick bodies, it can effectively filter market noise and trade intermediate to long term trends with low risk.

## Strategy Logic 

The core idea is based on comparison of 3 SMAs of different periods to determine price momentum. Additionally, EMA is used to check if candle body is pointing up.

Specifically, the strategy employs 3 SMAs - 3-, 8-, and 10-period SMA. When price is below all 3 SMAs, it is considered a downtrend. Long signal triggers when price crosses back above the SMAs.  

Also, a 5-period EMA checks if the candle body is pointing up before entering long trades.

For exit rules, maximum number of profitable closes or maximum duration is used as stop loss mechanism.

## Advantage Analysis

By combining MAs of various timeframes, this strategy can effectively filter market noise and capture intermediate to long term trends. Optimized parameters allow decent performance in historical backtests.

Using EMA to check candle body direction reduces unnecessary slippage from buying into falling candles.  

Overall this is a stable and reliable system suitable for trend following over weeks to months.

## Risks and Mitigations  

- The strategy is sensitive to parameters. Suboptimal choice of 3 SMA or 1 EMA periods can deteriorate signal quality. Parameters need to be optimized for different instruments.

- Gap risk is not handled. Sudden fundamental news that gap prices could cause losses. Price stop loss can help mitigate such risks.

## Enhancement Opportunities

- More timeframes of MAs or EMAs can be added to further improve trend accuracy.

- Moderate price stop loss can be tested to lock in profits while reducing losses in extreme moves.

- Machine learning can dynamically optimize parameters to adapt to evolving market conditions.

## Conclusion  

The strategy is robust and reliable overall, using MA crossovers to determine trend supplemented by EMA filter. Further parameter optimization and prudent risk controls can enhance win rate and profitability. Worthy of further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Quantity|
|v_input_2|3|SMA Period 01|
|v_input_3|8|SMA Period 02|
|v_input_4|10|SMA Period 03|
|v_input_5|5|EMA Period 01|
|v_input_6|5|Max Profit Close|
|v_input_7|10|Max Total Bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Free Strategy #02 (ES / SPY)", overlay=true)

// Inputs
Quantity = input(1, minval=1, title="Quantity")
SmaPeriod01 = input(3, minval=1, title="SMA Period 01")
SmaPeriod02 = input(8, minval=1, title="SMA Period 02")
SmaPeriod03 = input(10, minval=1, title="SMA Period 03")
EmaPeriod01 = input(5, minval=1, title="EMA Period 01")
MaxProfitCloses = input(5, minval=1, title="Max Profit Close")
MaxBars = input(10, minval=1, title="Max Total Bars")

// Misc Variables
src = close
BarsSinceEntry = 0
MaxProfitCount = 0
Sma01 = sma(close, SmaPeriod01)
Sma02 = sma(close, SmaPeriod02)
Sma03 = sma(close, SmaPeriod03)
Ema01 = ema(close, EmaPeriod01)

// Conditions
Cond00 = strategy.position_size == 0
Cond01 = close < Sma03
Cond02 = close <= Sma01
Cond03 = close[1] > Sma01[1]
Cond04 = open > Ema01
Cond05 = Sma02 < Sma02[1]

// Update Exit Variables
BarsSinceEntry := Cond00 ? 0 : nz(BarsSinceEntry[1]) + 1
MaxProfitCount := Cond00 ? 0 : (close > strategy.position_avg_price and BarsSinceEntry > 1) ? nz(MaxProfitCount[1]) + 1 : nz(MaxProfitCount[1])

// Entries
strategy.entry(id="L1", long=true, qty=Quantity, when=(Cond00 and Cond01 and Cond02 and Cond03 and Cond04 and Cond05))
 
// Exits
strategy.close("L1", (BarsSinceEntry - 1 >= MaxBars or MaxProfitCount >= MaxProfitCloses))
```

> Detail

https://www.fmz.com/strategy/442397

> Last Modified

2024-02-21 15:59:43
