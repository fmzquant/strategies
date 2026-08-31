
> Name

Advanced-Dual-Moving-Average-Momentum-Trend-Following-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e81b9c4882a3deaaa5.png)

[trans]该策略是一个基于双均线系统的动量趋势跟踪策略,结合了快速均线与慢速均线的交叉信号,同时引入了过滤均线来优化入场时机,通过资金管理和风险控制,实现稳健的交易效果。

#### 策略原理
策略采用了11周期和31周期的简单移动平均线(SMA)作为主要信号系统,同时使用5周期均线作为过滤器。当快线(SMA11)上穿慢线(SMA31)且价格位于过滤均线之上时,系统产生做多信号;当快线下穿慢线时,系统平仓。策略通过设定固定的资金量来控制每次交易的规模,从而实现风险管理。

#### 策略优势
1. 信号系统简单清晰,易于理解和执行
2. 多重均线确认,能有效过滤虚假信号
3. 采用固定资金量交易,风险可控
4. 具备良好的趋势跟踪能力
5. 入场和出场逻辑明确,不易产生决策犹豫
6. 可以适应不同的市场环境

#### 策略风险
1. 震荡市场可能产生频繁交易
2. 均线系统存在一定滞后性
3. 固定资金量交易可能无法充分利用资金效率
4. 没有考虑市场波动率变化
5. 缺乏止损机制,可能面临较大回撤风险

#### 策略优化方向
1. 引入自适应的均线周期,根据市场波动率动态调整
2. 增加波动率过滤器,在高波动率环境下调整仓位
3. 设计动态的资金管理系统,提高资金使用效率
4. 加入止损和止盈机制,控制单笔交易风险
5. 考虑引入趋势强度指标,优化入场时机
6. 增加交易时间过滤,避免在不利时段交易

#### 总结
该策略通过多重均线系统构建了一个相对稳健的趋势跟踪系统。虽然存在一些固有的局限性,但通过合理的优化和改进,可以进一步提升策略的稳定性和盈利能力。建议交易者在实盘应用时,结合市场具体情况,对参数进行针对性调整。||

This strategy is a momentum trend following system based on dual moving averages, combining crossover signals from fast and slow moving averages with a filter line to optimize entry timing, achieving stable trading results through proper money management and risk control.

#### Strategy Principles
The strategy employs 11-period and 31-period Simple Moving Averages (SMA) as the main signal system, with a 5-period moving average as a filter. Long entry signals are generated when the fast line (SMA11) crosses above the slow line (SMA31) and price is above the filter average. Positions are closed when the fast line crosses below the slow line. The strategy implements risk management through fixed position sizing.

#### Strategy Advantages
1. Simple and clear signal system, easy to understand and execute
2. Multiple moving average confirmation reduces false signals
3. Fixed position sizing ensures controllable risk
4. Effective trend following capabilities
5. Clear entry and exit logic reduces decision hesitation
6. Adaptable to different market conditions

#### Strategy Risks
1. Frequent trading may occur in ranging markets
2. Inherent lag in moving average systems
3. Fixed position sizing may not optimize capital efficiency
4. Market volatility changes not considered
5. Lack of stop-loss mechanism may lead to significant drawdowns

#### Strategy Optimization Directions
1. Introduce adaptive moving average periods based on market volatility
2. Add volatility filters to adjust position sizing in high volatility environments
3. Design dynamic money management system to improve capital efficiency
4. Implement stop-loss and take-profit mechanisms to control single trade risk
5. Consider adding trend strength indicators to optimize entry timing
6. Include trading time filters to avoid unfavorable trading periods

#### Summary
The strategy builds a relatively robust trend following system through multiple moving averages. While it has some inherent limitations, stability and profitability can be further enhanced through appropriate optimization and improvements. Traders are advised to adjust parameters based on specific market conditions when implementing the strategy in live trading.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

strategy('Nifty 30m SMA Crossover Long', overlay=true)

start = timestamp(2020, 1, 1, 0, 0)
end = timestamp(2024, 12, 31, 0, 0)

SlowSma = ta.sma(close, 31)
FastSma = ta.sma(close, 11)
FilterSma = ta.sma(close, 5)

plot(SlowSma, title='Sma 31', color=color.new(color.green, 0))
plot(FastSma, title='Sma 11', color=color.new(color.red, 0))
plot(FilterSma, title='Filter Sma 5', color=color.new(color.black, 0))

// strategy 
LongEntry = FastSma > SlowSma and close > FilterSma
LongExit = FastSma < SlowSma

MyQty = 10000000 / close

// // Plot signals to chart
// plotshape(not LongExit and strategy.position_size > 0 and bIndicator, title='Hold', location=location.abovebar, color=color.new(color.blue, 0), style=shape.square, text='Hold', textcolor=color.new(color.blue, 0))
// plotshape(LongExit and bIndicator and strategy.position_size > 0, title='Exit', location=location.belowbar, color=color.new(color.red, 0), style=shape.triangledown, text='Sell', textcolor=color.new(color.red, 0))
// plotshape(LongEntry and strategy.position_size == 0 and bIndicator, '', shape.arrowup, location.abovebar, color.new(color.green, 0), text='Buy', textcolor=color.new(color.green, 0))
// plotshape(not LongEntry and strategy.position_size == 0 and bIndicator, '', shape.circle, location.belowbar, color.new(color.yellow, 0), text='Wait', textcolor=color.new(color.black, 0))


if time >= start and time < end
    strategy.entry('Enter Long', strategy.long, qty=1, when=LongEntry)
    strategy.close('Enter Long', when=LongExit)


```

> Detail

https://www.fmz.com/strategy/473157

> Last Modified

2024-11-27 16:54:54
