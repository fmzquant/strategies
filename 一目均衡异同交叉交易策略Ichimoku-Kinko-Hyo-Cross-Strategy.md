
> Name

一目均衡异同交叉交易策略Ichimoku-Kinko-Hyo-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/166e96896b91985be55.png)
[trans]


### 概述

一目均衡异同交叉交易策略通过计算一目均衡的天坛线和基准线的交叉情况,结合价格与云盘的关系,形成交易信号,实现获利。该策略融合了趋势交易和反转交易的优点,既可以跟随趋势运行,也可以捕捉反转机会,是一种非常通用且实用的交易策略。

### 策略原理   

1. 计算一目均衡的组成要素:

    - 天坛线(Tenkan-Sen):最近9根K线的中点

    - 基准线(Kijun-Sen):最近26根K线的中点 

    - 先行线(Senkou Span A):天坛线和基准线的平均值

    - 迟行线(Senkou Span B):最近52根K线的中点

2. 观察以下交易信号的组合:

    - 天坛线和基准线的交叉(黄金交叉和死亡交叉)

    - 云盘(由先行线和迟行线组成)之上的收盘价或之下的收盘价

    - 延迟26周期的K线(Chikou Span)对比当期K线的方向

3. 当观察到以下交易信号时,可以进行开仓操作:

    - 多头信号:天坛线上穿基准线(黄金交叉)且收盘价高于云盘 且 Chikou Span 高于延迟26周期的收盘价

    - 空头信号:天坛线下穿基准线(死亡交叉)且收盘价低于云盘 且 Chikou Span 低于延迟26周期的收盘价  

4. 当观察到相反方向的交易信号时,可以进行平仓操作。

### 策略优势

1. 结合趋势交易和反转交易的优点,既可以跟随趋势,也可以捕捉反转。

2. 使用均线的交叉形成交易信号,可以增强信号的可靠性,避免假突破。

3. 综合多个交易信号,可以有效过滤市场噪音,锁定高概率机会。

4. 延迟线Chikou Span可以避免陷入剧烈震荡市的回调。

5. 云盘区域提供支撑和阻力,可以更精确确定入场和止盈位置。

### 策略风险

1. 参数设置不当可能导致交易频率过高或信号不明显。

2. 趋势突变时,可能产生较大亏损。

3. 震荡盘整困难期,交易信号明显减少,实现盈利难度较大。

4. 云盘区域过于宽阔时,入场信号可能出现滞后。

5. 多因子综合判断,提高了判定难度,实盘操作难度较大。

可以通过优化参数,合理控制仓位规模,设置止损位置,选择流动性好的交易品种等方法来控制风险。

### 策略优化方向

1. 优化均线参数,使交易频率和获利率达到最佳状态。

2. 增加趋势判断指标,避免趋势突变带来的亏损。

3. 增加波动率指标,控制交易风险。

4. 优化开仓仓位规模和止损位置。

5. 添加交易量能量指标,确保充足流动性。

6. 测试不同品种的参数设置。

7. 增加机器学习算法,根据回测数据自动优化参数。

### 总结

一目均衡异同交叉策略综合运用均线交叉、延迟线和云盘区域等多种技术指标形成交易信号,可以有效识别趋势方向,在重要支撑阻力区域开仓,是一种较为稳健可靠的交易策略。通过参数优化和严格的资金管理,可以进一步提高策略的稳定性和收益性。该策略易于理解和实现,值得实盘验证与应用。

||


### Overview

The Ichimoku Kinko Hyo Cross strategy generates trading signals by observing the crossovers between Tenkan-Sen and Kijun-Sen lines of the Ichimoku system, combined with the price level versus the Cloud. This strategy incorporates both trend following and reversal trading, making it a versatile and practical trading strategy.

### Strategy Logic

1. Calculate the Ichimoku components:

    - Tenkan-Sen: Midpoint of last 9 bars

    - Kijun-Sen: Midpoint of last 26 bars

    - Senkou Span A: Average of Tenkan-Sen and Kijun-Sen

    - Senkou Span B: Midpoint of last 52 bars

2. Observe the combination of following trading signals:

    - Crossover between Tenkan-Sen and Kijun-Sen (Golden Cross and Death Cross)

    - Close price above or below the Cloud (Senkou Span A and B)

    - Chikou Span compared to close price 26 bars ago

3. Entry signals:

    - Long: Tenkan-Sen crosses above Kijun-Sen (Golden Cross) and close above Cloud and Chikou Span above close 26 bars ago

    - Short: Tenkan-Sen crosses below Kijun-Sen (Death Cross) and close below Cloud and Chikou Span below close 26 bars ago
    
4. Exit signals when opposite signal occurs.

### Advantages

1. Combines trend following and reversal trading.

2. Crossovers ensure signal reliability and avoid false breakouts. 

3. Multiple signal confirmation filters out market noise.

4. Chikou Span avoids whipsaws.

5. Cloud provides support and resistance for entries and exits.

### Risks

1. Improper parameters may cause overtrading or unclear signals.

2. Trend reversals can lead to large losses.  

3. Fewer trading opportunities during range-bound markets.

4. Delayed entry signals if Cloud is too wide. 

5. High signal complexity increases implementation difficulty.

Risks can be mitigated through parameter optimization, position sizing, stop losses, liquid products, etc.

### Enhancements

1. Optimize moving average periods for ideal frequency and profitability.

2. Add trend filter to avoid trend reversal losses.

3. Add volatility filter to control risk. 

4. Optimize entry size and stop loss placement.

5. Add volume filter to ensure liquidity.

6. Test parameters across different products.

7. Employ machine learning to auto-optimize parameters based on backtests.

### Conclusion

The Ichimoku Kinko Hyo Cross strategy combines various technical analysis tools like moving average crossovers, delayed lines, and Cloud bands to identify high-probability entries in trending or reversal scenarios. Proper optimization and risk management can further improve its stability and profitability. The strategy is easy to understand and implement, making it worth live testing and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Tenkan-Sen Bars|
|v_input_2|26|Kijun-Sen Bars|
|v_input_3|52|Senkou-Span B Bars|
|v_input_4|26|Chikou-Span Offset|
|v_input_5|26|Senkou-Span Offset|
|v_input_6|true|Long Entry|
|v_input_7|true|Short Entry|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Ichimoku Kinko Hyo: Basic Strategy", overlay=true)

//Inputs
ts_bars = input(9, minval=1, title="Tenkan-Sen Bars")
ks_bars = input(26, minval=1, title="Kijun-Sen Bars")
ssb_bars = input(52, minval=1, title="Senkou-Span B Bars")
cs_offset = input(26, minval=1, title="Chikou-Span Offset")
ss_offset = input(26, minval=1, title="Senkou-Span Offset")
long_entry = input(true, title="Long Entry")
short_entry = input(true, title="Short Entry")

middle(len) => avg(lowest(len), highest(len))

// Ichimoku Components
tenkan = middle(ts_bars)
kijun = middle(ks_bars)
senkouA = avg(tenkan, kijun)
senkouB = middle(ssb_bars)

// Plot Ichimoku Kinko Hyo
plot(tenkan, color=#0496ff, title="Tenkan-Sen")
plot(kijun, color=#991515, title="Kijun-Sen")
plot(close, offset=-cs_offset+1, color=#459915, title="Chikou-Span")
sa=plot(senkouA, offset=ss_offset-1, color=green, title="Senkou-Span A")
sb=plot(senkouB, offset=ss_offset-1, color=red, title="Senkou-Span B")
fill(sa, sb, color = senkouA > senkouB ? green : red, title="Cloud color")

ss_high = max(senkouA[ss_offset-1], senkouB[ss_offset-1])
ss_low = min(senkouA[ss_offset-1], senkouB[ss_offset-1])

// Entry/Exit Signals
tk_cross_bull = tenkan > kijun
tk_cross_bear = tenkan < kijun
cs_cross_bull = mom(close, cs_offset-1) > 0
cs_cross_bear = mom(close, cs_offset-1) < 0
price_above_kumo = close > ss_high
price_below_kumo = close < ss_low

bullish = tk_cross_bull and cs_cross_bull and price_above_kumo
bearish = tk_cross_bear and cs_cross_bear and price_below_kumo

strategy.entry("Long", strategy.long, when=bullish and long_entry)
strategy.entry("Short", strategy.short, when=bearish and short_entry)

strategy.close("Long", when=bearish and not short_entry)
strategy.close("Short", when=bullish and not long_entry)
```

> Detail

https://www.fmz.com/strategy/430672

> Last Modified

2023-10-31 15:00:43
