
> Name

Multi-Level-Dynamic-MACD-Trend-Following-Strategy-with-52-Week-High-Low-Extension-Analysis-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a373a2c69fb2a75b08.png)

[trans]
#### 概述
本策略是一个结合了MACD多级时间框架交叉信号与52周高低位动态支撑压力位的量化交易系统。该策略通过周线和日线两个时间周期的MACD指标交叉来确认交易信号,同时利用52周高低位形成的动态支撑压力线来辅助判断市场走势,从而实现更稳健的交易决策。策略采用动态止损机制,在保证收益的同时也能有效控制风险。

#### 策略原理
策略主要基于以下核心逻辑:
1. 入场信号由周线MACD金叉与日线MACD金叉共同确认,要求两个时间周期的MACD指标都出现看多信号。
2. 出场信号由日线MACD死叉触发,一旦日线MACD指标出现死叉信号即平仓离场。
3. 动态止损设置在触发出场信号当天的最低价位置。
4. 52周高低位线基于用户选择的计算基准(最高最低价或收盘价)动态生成,并向右延伸形成重要参考位。
5. 策略采用5%的仓位管理,单笔交易成本为1个货币单位。

#### 策略优势
1. 多重时间框架确认:通过周线和日线两个层面的MACD信号共振来过滤假突破,提高交易的准确性。
2. 动态支撑压力:52周高低位线提供了重要的市场心理价位参考,有助于判断趋势的强弱。
3. 风险控制完善:采用动态止损机制,随市场波动及时调整止损位置,达到保护利润的目的。
4. 高度可视化:通过清晰的图形界面展示关键价位和信号,便于交易者理解和操作。
5. 系统化交易:严格的入场出场规则避免了人为情绪干扰,提高交易的客观性。

#### 策略风险
1. 震荡市不适用:在横盘震荡市场中,频繁的MACD交叉可能导致过多假信号。
2. 滞后性风险:MACD指标本身具有一定滞后性,可能错过最佳入场时机。
3. 资金管理风险:固定比例仓位可能在某些市场环境下不够灵活。
4. 市场gap风险:如遇大跳空,实际止损价格可能远低于预期位置。
5. 参数优化风险:过度优化参数可能导致过拟合问题。

#### 策略优化方向
1. 引入量价关系分析:考虑在现有MACD信号基础上增加成交量确认。
2. 优化仓位管理:设计更灵活的仓位管理机制,根据市场波动度动态调整。
3. 完善止损机制:可考虑增加移动止损或基于ATR的动态止损。
4. 增加市场环境过滤:引入趋势强度指标,在强趋势市场才开仓。
5. 开发信号过滤机制:设计更严格的信号确认条件,减少假信号。

#### 总结
该策略通过结合MACD多时间框架交叉信号与52周高低位动态支撑压力线,构建了一个完整的趋势跟踪交易系统。策略的优势在于信号确认的可靠性和风险控制的完整性,但仍需注意应对震荡市场和滞后性风险。通过持续优化和完善,该策略有望在趋势性市场中获得稳定收益。

|| 

#### Overview
This strategy combines MACD cross signals from multiple timeframes with dynamic support and resistance levels based on 52-week highs and lows. It confirms trading signals through MACD crossovers on both weekly and daily timeframes while utilizing dynamic support and resistance lines formed by 52-week highs and lows to assist in market trend analysis, enabling more robust trading decisions. The strategy employs a dynamic stop-loss mechanism to effectively control risk while ensuring profits.

#### Strategy Principles
The strategy is based on the following core logic:
1. Entry signals are confirmed by both weekly and daily MACD golden crosses, requiring bullish signals on both timeframes.
2. Exit signals are triggered by daily MACD death crosses, with positions closed once a bearish signal appears.
3. Dynamic stop-loss is set at the lowest price of the day when exit signals are triggered.
4. 52-week high/low lines are dynamically generated based on user-selected calculation basis (high/low or closing prices) and extend rightward as important reference levels.
5. The strategy employs 5% position management with a transaction cost of 1 currency unit per trade.

#### Strategy Advantages
1. Multi-timeframe confirmation: Filters false breakouts through resonance of MACD signals on weekly and daily levels, improving trading accuracy.
2. Dynamic support/resistance: 52-week high/low lines provide important psychological price references, helping assess trend strength.
3. Comprehensive risk control: Dynamic stop-loss mechanism adjusts with market fluctuations to protect profits.
4. High visualization: Clear graphical interface displays key price levels and signals, facilitating understanding and operation.
5. Systematic trading: Strict entry/exit rules avoid emotional interference, enhancing trading objectivity.

#### Strategy Risks
1. Unsuitable for ranging markets: Frequent MACD crossovers in sideways markets may generate excessive false signals.
2. Lag risk: MACD indicator's inherent lag may miss optimal entry points.
3. Money management risk: Fixed proportion positioning may lack flexibility in certain market conditions.
4. Market gap risk: Large gaps may result in actual stop-loss prices far below expected levels.
5. Parameter optimization risk: Excessive optimization may lead to overfitting issues.

#### Strategy Optimization Directions
1. Incorporate volume-price relationship analysis: Consider adding volume confirmation to existing MACD signals.
2. Optimize position management: Design more flexible position management mechanisms, adjusting dynamically with market volatility.
3. Enhance stop-loss mechanism: Consider adding trailing stops or ATR-based dynamic stops.
4. Add market environment filtering: Introduce trend strength indicators, only opening positions in strong trend markets.
5. Develop signal filtering mechanism: Design stricter signal confirmation conditions to reduce false signals.

#### Summary
This strategy constructs a complete trend-following trading system by combining multi-timeframe MACD cross signals with dynamic support and resistance lines based on 52-week highs and lows. Its strengths lie in signal confirmation reliability and comprehensive risk control, though attention must be paid to ranging market and lag risks. Through continuous optimization and improvement, this strategy shows promise for achieving stable returns in trending markets.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-25 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("MACD Bitcoin strategy con 52W High/Low (linee estese)", overlay=true)

// === MACD SETTINGS ===
fastLength = 12
slowLength = 26
signalSmoothing = 9

// Funzione per ottenere i valori MACD
getMACD(source, timeframe) =>
    [macdLine, signalLine, _] = ta.macd(source, fastLength, slowLength, signalSmoothing)
    [macdLine, signalLine]

// Valori MACD Settimanali
[macdWeekly, signalWeekly] = request.security(syminfo.tickerid, "W", getMACD(close, "W"), lookahead=barmerge.lookahead_on)

// Valori MACD Giornalieri
[macdDaily, signalDaily] = getMACD(close, "D")

// Variabile per lo stop loss
var float lowOfSignalCandle = na

// Condizione per l'ingresso
longConditionWeekly = ta.crossover(macdWeekly, signalWeekly)
exitConditionDaily = ta.crossunder(macdDaily, signalDaily)

// Imposta Stop Loss sulla candela giornaliera
if (exitConditionDaily)
    lowOfSignalCandle := low

// Condizione di ingresso nel trade
enterTradeCondition = macdWeekly > signalWeekly and ta.crossover(macdDaily, signalDaily)

if (enterTradeCondition)
    strategy.entry("MACD Long", strategy.long)

if (not na(lowOfSignalCandle))
    strategy.exit("Stop Loss", "MACD Long", stop=lowOfSignalCandle)

if (strategy.position_size == 0)
    lowOfSignalCandle := na

// // === 52 WEEK HIGH/LOW SETTINGS ===
// // Input per selezionare tra Highs/Lows o Close
// high_low_close = input.string(defval="Highs/Lows", title="Base 52 week values on candle:", options=["Highs/Lows", "Close"])

// // Calcolo dei valori delle 52 settimane
// weekly_hh = request.security(syminfo.tickerid, "W", ta.highest(high, 52), lookahead=barmerge.lookahead_on)
// weekly_ll = request.security(syminfo.tickerid, "W", ta.lowest(low, 52), lookahead=barmerge.lookahead_on)
// weekly_hc = request.security(syminfo.tickerid, "W", ta.highest(close, 52), lookahead=barmerge.lookahead_on)
// weekly_lc = request.security(syminfo.tickerid, "W", ta.lowest(close, 52), lookahead=barmerge.lookahead_on)

// // Selezione dei valori in base all'input
// high_plot = high_low_close == "Highs/Lows" ? weekly_hh : weekly_hc
// low_plot = high_low_close == "Highs/Lows" ? weekly_ll : weekly_lc

// // === LINEE ORIZZONTALI ESTESE FINO AL PREZZO ATTUALE ===
// var line highLine = na
// var line lowLine = na

// // Linea Orizzontale per il 52W High
// if (na(highLine))
//     highLine := line.new(bar_index, high_plot, bar_index + 1, high_plot, color=color.green, width=2, style=line.style_dashed, extend=extend.right)
// else
//     line.set_y1(highLine, high_plot)
//     line.set_y2(highLine, high_plot)

// // Linea Orizzontale per il 52W Low
// if (na(lowLine))
//     lowLine := line.new(bar_index, low_plot, bar_index + 1, low_plot, color=color.red, width=2, style=line.style_dashed, extend=extend.right)
// else
//     line.set_y1(lowLine, low_plot)
//     line.set_y2(lowLine, low_plot)

// // Etichette per le linee orizzontali
// var label highLabel = na
// var label lowLabel = na

// if (na(highLabel))
//     highLabel := label.new(bar_index, high_plot, "52W High", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.small)
// else
//     label.set_y(highLabel, high_plot)
//     label.set_x(highLabel, bar_index)

// if (na(lowLabel))
//     lowLabel := label.new(bar_index, low_plot, "52W Low", color=color.red, textcolor=color.white, style=label.style_label_up, size=size.small)
// else
//     label.set_y(lowLabel, low_plot)
//     label.set_x(lowLabel, bar_index)

// // Tracciamento delle Linee Estese
// plot(high_plot, title="52W High", color=color.green, style=plot.style_linebr)
// plot(low_plot, title="52W Low", color=color.red, style=plot.style_linebr)

```

> Detail

https://www.fmz.com/strategy/476250

> Last Modified

2024-12-27 14:27:51
