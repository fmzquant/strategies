
> Name

滑动平均线捕捉策略Momentum-Capture-Strategy-Based-on-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fac89e782e34ce4f0a.png)
[trans]


## 概述

本策略运用滑动平均线技术作为主要交易信号,结合海肯烛形指标检测市场趋势反转,捕捉短期价格动量的策略。策略优化自古斯塔沃·布拉努的海肯均线策略,通过去除重漆功能,实现无滞后信号输出。

## 策略原理

1. 计算海肯收盘价nAMAn,作为价格主线。

2. 计算海肯收盘价的快速移动平均线fma和慢速移动平均线sma。

3. 当fma上穿sma时生成买入信号;当fma下穿sma时生成卖出信号。

4. 该策略去除了原策略中的重漆功能,能够实时生成交易信号,避免回测数据失真。

## 优势分析

1. 结合海肯烛形指标,能更准确判断市场趋势反转点。

2. 应用双平均线组合,能有效过滤假突破。

3. 无滞后信号输出,实盘表现可靠。

4. 参数优化灵活,可针对不同品种进行调整。

5. 策略逻辑简单清晰,容易理解实现。

6. 可配置成全自动交易策略,降低人为操作风险。

## 风险分析 

1. 海肯均线对价格震荡市场表现不佳。

2. 双均线交易策略容易产生较多虚假信号。

3. 平均线参数设置不当,会错过趋势或者增大回撤。

4. 实盘有交易费用,会对净利产生一定影响。

5. 需要严格的止损方式,控制单笔亏损。

6. 机械交易策略有回撤风险,需掌握好资金管理。

对应风险管理措施:

1. 结合波动率指标,避开震荡区间。 

2. 增加过滤条件,确保交易信号质量。

3. 参数测试优化,选择合适的均线组合。

4. 调整交易频率,降低交易成本影响。 

5. 设置合理的止损位,控制单笔亏损。

6. 优化资金管理,严格控制仓位规模。

## 策略优化方向

1. 优化双均线参数组合,提高信号质量。

2. 增加趋势过滤指标,避开震荡区间。

3. 结合成交量指标,确保趋势可靠性。 

4. 设置动态止损和跟踪止盈,优化利润收集。

5. 整合资金管理模块,控制仓位规模。

6. 增加算法交易模块,实现全自动化。

## 总结

本策略整合海肯均线趋势判断和双均线组合过滤技术,实现了一个简单实用的短期趋势追踪策略。策略信号生成实时可靠,实盘表现良好。通过参数优化、风控措施设置以及算法交易模块扩展,可以将其优化为一个值得信赖的全自动交易策略。

||

## Overview

This strategy uses moving average as the main trading signal, combined with Heikin-Ashi to detect trend reversal, aiming to capture short-term price momentum. It is optimized from Gustavo Bramao's Heikin Ashi MA strategy by removing the repainting function to generate non-lagging signals.  

## Strategy Logic

1. Calculate Heikin-Ashi close price nAMAn as the price baseline.

2. Calculate fast moving average fma and slow moving average sma based on nAMAn.

3. Generate buy signal when fma crosses over sma, and sell signal when fma crosses below sma. 

4. The repainting is removed in this strategy to generate real-time trading signals and avoid backtesting bias.

## Advantage Analysis

1. Heikin-Ashi helps determine trend reversal points more accurately.

2. The MA crossover filters out false signals effectively. 

3. No lagging in signal generation ensures reliable live performance.

4. Flexible parameter tuning adaptable for different products. 

5. Simple and clear logic, easy to understand and implement.

6. Can be automated completely to minimize manual trading risks.

## Risk Analysis

1. Poor performance in range-bound market with price whipsaws.

2. Prone to generating false signals with dual MA crossover. 

3. Inappropriate MA parameters may cause missing trends or increasing drawdown.

4. Trading cost impacts net profit in live trading.

5. Strict stop loss required to control single trade loss. 

6. Mechanical trading strategies have inherent drawdown risks and require proper capital management.

Risk Management Solutions:

1. Add volatility filter to avoid range-bound market.

2. Add filters to ensure signal quality. 

3. Optimize MA parameters through thorough testing.

4. Adjust trading frequency to reduce cost impact.

5. Set proper stop loss to control loss in single trades.

6. Optimize capital management to control position sizing.

## Enhancement Directions

1. Optimize MA parameters to improve signal quality.

2. Add trend filter to avoid whipsaw market.

3. Incorporate volume indicators to confirm trend.

4. Implement dynamic stop loss and profit taking to optimize profit capturing.

5. Integrate capital management module to control position sizing. 

6. Add algorithmic trading module for full automation.

## Summary

This strategy integrates Heikin-Ashi and MA crossover techniques to create a simple and practical short-term trend following strategy. It generates reliable real-time trading signals and shows good performance in live trading. Further optimizations on parameters, risk management, and algorithmic trading modules can turn it into a fully automated strategy that is trustworthy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1|D|Heikin Ashi EMA Time Frame|
|v_input_1|false|Heikin Ashi EMA Shift|
|v_input_2|20|Slow EMA Period|
|v_input_int_1|5|Length|
|v_input_3_hlc3|0|xPrice: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_float_1|2.5|Fastend|
|v_input_4|20|Slowend|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-25 00:00:00
end: 2023-10-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//Heikin/Kaufman by Gustavo v5
// strategy('Heikin Ashi EMA v5 no repaint ', shorttitle='Heikin Ashi EMA v5 no repaint', overlay=true, max_bars_back=500, default_qty_value=1000, initial_capital=100000, currency=currency.EUR)


// Settings - H/K
res1 = input.timeframe(title='Heikin Ashi EMA Time Frame', defval='D')
test = input(0, 'Heikin Ashi EMA Shift')
sloma = input(20, 'Slow EMA Period')
nAMA = hlc3

//Kaufman MA
Length = input.int(5, minval=1)
xPrice = input(hlc3)
xvnoise = math.abs(xPrice - xPrice[1])
Fastend = input.float(2.5, step=.5)
Slowend = input(20)
nfastend = 2 / (Fastend + 1)
nslowend = 2 / (Slowend + 1)
nsignal = math.abs(xPrice - xPrice[Length])
nnoise = math.sum(xvnoise, Length)
nefratio = nnoise != 0 ? nsignal / nnoise : 0
nsmooth = math.pow(nefratio * (nfastend - nslowend) + nslowend, 2)
nAMAn = nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))

//Heikin Ashi Open/Close Price
ha_t = ticker.heikinashi(syminfo.tickerid)
ha_close = request.security(ha_t, timeframe.period, nAMAn)
mha_close = request.security(ha_t, res1, hlc3)

//Moving Average
fma = ta.ema(mha_close[test], 1)
sma = ta.ema(ha_close, sloma)
plot(fma, title='MA', color=color.new(color.black, 0), linewidth=2, style=plot.style_line)
plot(sma, title='SMA', color=color.new(color.red, 0), linewidth=2, style=plot.style_line)

//Strategy
golong = ta.crossover(fma, sma)
goshort = ta.crossunder(fma, sma)

strategy.entry('Buy', strategy.long, when=golong)
strategy.entry('Sell', strategy.short,when=goshort)


```

> Detail

https://www.fmz.com/strategy/430753

> Last Modified

2023-11-01 15:55:51
