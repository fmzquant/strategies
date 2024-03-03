
> Name

Renko反转价格突破交易策略Renko-Reversal-Price-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略名称为Renko反转价格突破交易策略。该策略通过Renko线图形态分析,判断价格可能反转的时间点,在突破关键价格时入场。

策略运作原理:
1. 使用Renko线图(Renko Bar),显示价格走势。
2. 分析Renko线前4根K线的收盘价与开盘价关系。
3. 当前4根线的收盘价出现显著反转信号时,判断趋势可能反转。
4. 当Renko线的收盘价突破开盘价时,产生交易信号。

具体交易规则:
1. 如果最近4根Renko线收盘价出现较大上涨,而当前收盘价又低于开盘价,则做空。
2. 如果最近4根Renko线收盘价出现较大下跌,而当前收盘价又高于开盘价,则做多。
3. 入场后使用固定交易量进行交易。

该策略优势:
1. 使用Renko线减少市场噪音,识别反转机会。
2. 依靠多根K线判断,避免假信号。 
3. 策略逻辑简单清晰,容易实施。

该策略风险:
1. Renko线设置不当,导致漏失交易机会。
2. 固定交易量,无资金管理措施。
3. 容易受到滑点和交易费用的影响。 

总之,Renko反转价格突破交易策略通过Renko线的图形分析发现反转机会,在关键点入场,追求较高的盈亏比。但交易者需要注意优化Renko线设置,并配合合理的资金管理手段,以控制实盘中的风险。

||

This strategy is called the Renko Reversal Price Breakout Trading Strategy. It identifies potential reversal points through Renko chart pattern analysis and enters trades when prices break critical levels.   

How the strategy works:
1. Use Renko Bars to plot price action. 
2. Analyze the relationship between open and close prices of the last 4 Renko bars.
3. When close prices of last 4 bars show significant reversal signal, a trend reversal may occur.
4. Trade signals are generated when Renko close prices break above/below open prices.

Trading rules:
1. If last 4 Renko bars' close shows significant rise but current close is below open, go short.
2. If last 4 Renko bars' close shows significant fall but current close is above open, go long.
3. Use fixed trade size after entry.

Advantages of this strategy:
1. Renko bars reduce noise and identify reversal opportunities. 
2. Relying on multiple bars prevents false signals.
3. Simple and clear logic, easy to implement.

Risks of this strategy:
1. Improper Renko settings may cause missed trades.  
2. Fixed trade size, no risk management.  
3. Prone to slippage and trading costs.

In summary, the Renko Reversal Price Breakout Trading Strategy identifies reversals through Renko chart analysis and enters at key points, pursuing high risk-reward ratios. But traders need to optimize Renko settings and apply proper risk management for controlling risks in live trading.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title='[STRATEGY][RS]Renko V0', shorttitle='S', overlay=true, pyramiding=0, initial_capital=100000, currency=currency.USD)
trade_size = 1

ro = open
rc = close
buy_entry = rc[4] < ro[4] and rc[3] > ro[3] and rc[2] > ro[2] and rc[1] > ro[1] and rc > ro
sel_entry = rc[4] > ro[4] and rc[3] < ro[3] and rc[2] < ro[2] and rc[1] < ro[1] and rc < ro

strategy.entry('buy', long=strategy.long, qty=trade_size, comment='buy', when=buy_entry)
strategy.entry('sell', long=strategy.short, qty=trade_size, comment='sell', when=sel_entry)
```

> Detail

https://www.fmz.com/strategy/426932

> Last Modified

2023-09-15 16:27:29
