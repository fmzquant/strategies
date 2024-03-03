
> Name

ATR可调节跟踪止损策略ATR-Adjustable-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a11fe258364185305a.png)

[trans]


本策略采用ATR指标计算动态止损线,实现风险控制的目的。

#### 概述

该策略使用ATR指标计算动态止损线,当价格上涨时,止损线会随价格上涨而上调,实现利润的锁定。当价格下跌时,止损线保持不变,避免止损退出。ATR指标能够测量市场的波动性和风险,乘以系数后生成止损线,从而控制每单的风险敞口。

#### 原理

该策略使用ATR指标和Highest函数组合计算动态止损线。具体计算公式如下:

```pine
TS=highest(high-Mult*atr(Atr),Hhv)
```

其中,Atr代表ATR周期参数,Hhv代表Highest函数查找周期参数,Mult代表ATR系数。

该公式的计算思路是,先计算出ATR指标的值,再乘以系数Mult,得到止损缓存区的范围。然后通过Highest函数查找过去Hhv周期内的最高价,再减去止损缓存区间范围,得到动态的止损线TS。

当价格上涨时,最高价会不断创新高,从而带动止损线向上移动,实现利润的锁定。当价格下跌时,止损线会保持之前的高点,避免了止损退出。

#### 优势

1. 动态止损,及时锁定利润

该策略中的止损线是动态调整的,能够跟踪价格上涨后的最高点,实现利润的及时锁定。相比固定止损更具优势。

2. 避免无谓止损

当价格出现正常回调或止损过密时,固定止损线很容易被触发停止交易。该策略能够在价格下跌时保持止损线不变,避免无谓的止损退出。

3. 可调节止损幅度

通过调节ATR周期参数和系数参数,可以控制止损线调整的灵敏度,实现不同程度的止损。

4. 风险可控

止损线的范围由ATR动态计算,能够根据市场波动性设定合理的止损幅度,从而控制每单的风险敞口。

#### 风险

1. 行情剧烈波动时止损过于激进

当行情出现剧烈波动时,ATR会快速上涨,止损线也会快速上移,增加无谓止损的概率。此时需要适当调整ATR周期参数,降低止损线调整的敏感度。

2. 大幅度行情反转时难以应对

该策略难以应对大幅度的行情反转,此时止损线可能会过于滞后,应及时降低仓位规避风险。

3. 参数优化难度较大

ATR周期、Highest周期和系数参数需要综合优化,优化难度较大。建议采用步进优化法多组合测试。

#### 优化思路

1. 优化ATR周期参数

适当增大ATR周期参数,可以减少止损线过于频繁调整的情况,但会增加单笔损失。

2. 优化Highest周期参数 

增大Highest周期参数可以让止损线更稳定,但需要权衡跟踪速度。

3. 测试不同的ATR系数

根据不同品种的特点选择合适的ATR系数,增大系数将止损幅度,减小系数降低单笔损失。

4. 结合趋势 indictor

结合趋势指标辅助决策,可以减少止损线被反转清除的概率。

#### 总结

该策略整体具有动态止损、风险可控的优点,适用于趋势行情。但需要注意防止行情剧烈波动带来的风险,同时参数优化难度较大。通过合理的参数设置和优化,以及辅助技术分析,可以将该策略运用于实盘交易中。
||

This strategy uses the ATR indicator to calculate a dynamic stop loss line for risk control.

#### Overview 

The strategy uses the ATR indicator to calculate a dynamic stop loss line. When prices rise, the stop loss line will move up with prices to lock in profits. When prices fall, the stop loss line remains unchanged to avoid being stopped out. The ATR indicator can measure market volatility and risk. Multiplying it by a coefficient generates the stop loss line, thus controlling the risk exposure per trade.

#### Principles

The strategy uses the ATR indicator and Highest function to calculate the dynamic stop loss line. The specific formula is:

```pine
TS=highest(high-Mult*atr(Atr),Hhv) 
```

Where Atr is the ATR period parameter, Hhv is the lookback period parameter of the Highest function, and Mult is the ATR coefficient.

The logic is to first calculate the ATR value, then multiply it by the Mult coefficient to get the range of the stop loss buffer zone. Then use the Highest function to find the highest high in the past Hhv periods, and subtract the stop loss buffer zone to obtain the dynamic stop loss line TS.

When prices rise, the highest high will be constantly updated, driving the stop loss line to move up and locking in profits. When prices fall, the stop loss line will maintain the previous high point to avoid being stopped out.

#### Advantages

1. Dynamic stop loss for timely profit taking

The stop loss line adjusts dynamically to track the highest point after price rises, allowing timely profit taking. This is superior to fixed stop loss.

2. Avoid unnecessary stop loss

Fixed stop loss lines can easily be triggered by normal pullbacks or overtight stops. This strategy keeps the stop loss unchanged during price declines to avoid unnecessary stops.

3. Adjustable stop loss range 

By tuning the ATR period and multiplier parameters, the sensitivity of the stop loss adjustment can be controlled for different degrees of stops.

4. Controllable risk

The ATR dynamically calculates the stop loss range, allowing reasonable stop loss ranges according to market volatility for risk control per trade.

#### Risks

1. Stop loss too aggressive during high volatility

When volatility spikes, ATR rises quickly and drives the stop loss line up rapidly, increasing the chance of unnecessary stops. The ATR period can be adjusted to make the line less sensitive.

2. Difficult to adapt to sharp reversals

The strategy struggles to adapt to sharp reversals. The stop loss line may lag too much and needs timely position reduction.

3. Difficult optimization

Optimizing the ATR period, Highest period and multiplier parameters together can be challenging. Stepped parameter sweep testing is recommended.

#### Optimization

1. Optimize ATR Period

Increase ATR period to reduce overly frequent stop line adjustment, but at the cost of larger loss per stop.

2. Optimize Highest Period

Increase Highest period to make the line more stable, but balance tracking speed.

3. Test different ATR coefficients

Choose proper ATR multipliers according to instrument characteristics. Larger multipliers widen stops, smaller ones decrease loss per stop.

4. Add trend filter

Adding a trend filter reduces the chance of stops being triggered by reversals.

#### Summary

The strategy has the advantage of dynamic stops and controllable risks. It fits trending markets but watch out for volatility spikes and difficult parameter optimization. With proper settings, optimization and additional techniques, it can be applied for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Atr Period|
|v_input_2|10|HHV Period|
|v_input_3|2.5|Multiplier|
|v_input_4|true|Barcolor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-17 00:00:00
end: 2023-10-24 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ceyhun

//@version=4
strategy("ATR Trailing Stoploss Strategy ",overlay=true)

Atr=input(defval=5,title="Atr Period",minval=1,maxval=500)
Hhv=input(defval=10,title="HHV Period",minval=1,maxval=500)
Mult=input(defval=2.5,title="Multiplier",minval=0.1)
Barcolor=input(true,title="Barcolor")

TS=highest(high-Mult*atr(Atr),Hhv),barssince(close>highest(high-Mult*atr(Atr),Hhv) and close>close)
Color=iff(close>TS,color.green,iff(close<TS,color.red,color.black))
barcolor(Barcolor? Color:na)

plot(TS,color=Color,linewidth=3,title="ATR Trailing Stoploss")

Buy  = crossover(close,TS)
Sell = crossunder(close,TS)

if Buy
    strategy.entry("Buy", strategy.long, comment="Buy")
    
if Sell
    strategy.entry("Sell", strategy.short, comment="Sell")
```

> Detail

https://www.fmz.com/strategy/430150

> Last Modified

2023-10-25 15:08:04
