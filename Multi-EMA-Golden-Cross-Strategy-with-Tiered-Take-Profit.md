
> Name

Multi-EMA-Golden-Cross-Strategy-with-Tiered-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15c6d44f30f5f8daac7.png)

[trans]
#### 概述
该策略是一个基于多重指数移动平均线(EMA)的趋势跟踪交易系统。它使用EMA25、EMA50和EMA100三条均线形成的黄金交叉来确认强势上涨趋势,并在价格突破EMA25时分批进场。策略采用动态止损和分批止盈的方式来管理风险和获利。

#### 策略原理
策略的核心逻辑包括以下几个关键部分:
1. 趋势确认:使用三条不同周期(25,50,100)的EMA,当短期均线位于中期均线之上,中期均线位于长期均线之上时,形成黄金交叉形态,确认上涨趋势。
2. 入场信号:在形成黄金交叉的基础上,当收盘价向上突破EMA25时,分两批各50%的仓位进场做多。
3. 止损设置:基于过去20个周期的最低价设置动态止损,并添加一个额外的缓冲区间(0.0003)来避免假突破。
4. 分批止盈:设置两个不同倍数(1.0和1.5倍)的止盈目标,第一批仓位在达到较低的止盈目标时离场,第二批仓位在达到较高的止盈目标时离场。
5. 趋势终结保护:当价格跌破EMA100时,为防止趋势逆转带来的损失,会触发所有仓位的平仓信号。

#### 策略优势
1. 多重确认机制:通过多重均线的配合使用,能够有效过滤假信号,提高交易的可靠性。
2. 动态风险管理:止损位基于实时市场波动进行动态调整,适应性更强。
3. 分批建仓和止盈:通过分批操作,既能锁定部分利润,又能让利润继续奔跑,实现收益的最大化。
4. 趋势保护机制:设置了长期均线作为趋势逆转的警戒线,能够及时止损,避免大幅回撤。

#### 策略风险
1. 滞后性风险:均线指标本身具有滞后性,可能导致入场时机偏晚,错过最佳买点。
2. 震荡市风险:在横盘震荡市场中,频繁的假突破可能导致连续止损。
3. 固定止损缓冲区风险:使用固定的止损缓冲区可能不适合所有市场环境。
4. 资金管理风险:固定的50%仓位分配可能不够灵活。

#### 策略优化方向
1. 动态参数优化:可以根据市场波动率自动调整均线周期和止损缓冲区。
2. 市场环境过滤:添加趋势强度和波动率指标,在不同市场环境下调整策略参数。
3. 仓位管理优化:基于波动率和账户净值来动态调整仓位大小。
4. 入场时机优化:可以结合其他技术指标(如RSI、MACD等)来优化入场时机。
5. 止盈方式优化:可以引入移动止盈机制,更好地保护已有利润。

#### 总结
该策略通过多重均线组合和分批操作方式,构建了一个较为完整的趋势跟踪交易系统。策略的优势在于结合了趋势跟踪和风险管理的多个关键要素,但仍需要根据实际市场情况进行参数优化和规则改进。通过建议的优化方向,策略有望在不同市场环境下都能保持稳定的表现。 || 

#### Overview
This strategy is a trend-following trading system based on multiple Exponential Moving Averages (EMAs). It uses three EMAs (25, 50, and 100) to form a golden cross pattern confirming strong upward trends, and enters positions when price breaks above EMA25. The strategy employs dynamic stop-loss and tiered take-profit mechanisms for risk and profit management.

#### Strategy Principles
The core logic includes several key components:
1. Trend Confirmation: Uses three EMAs of different periods (25,50,100), forming a golden cross pattern when the shorter-term EMA is above the medium-term EMA, which is above the longer-term EMA.
2. Entry Signal: After the golden cross formation, enters long positions in two 50% batches when the closing price breaks above EMA25.
3. Stop-Loss Setting: Sets dynamic stop-loss based on the lowest price of the past 20 periods, with an additional buffer zone (0.0003) to avoid false breakouts.
4. Tiered Take-Profit: Establishes two different take-profit targets (1.0x and 1.5x), exiting the first position at the lower target and the second at the higher target.
5. Trend Protection: Triggers position closure when price falls below EMA100 to protect against trend reversals.

#### Strategy Advantages
1. Multiple Confirmation Mechanism: Effectively filters false signals through the use of multiple EMAs.
2. Dynamic Risk Management: Stop-loss levels adjust dynamically based on market volatility.
3. Tiered Position Building and Profit-Taking: Maximizes profits while securing partial gains through staged operations.
4. Trend Protection Mechanism: Uses long-term EMA as a trend reversal warning line to prevent significant drawdowns.

#### Strategy Risks
1. Lag Risk: EMA indicators have inherent lag, potentially leading to delayed entries.
2. Range-Bound Market Risk: Frequent false breakouts in sideways markets may cause consecutive losses.
3. Fixed Buffer Risk: Using a fixed stop-loss buffer may not suit all market conditions.
4. Position Sizing Risk: Fixed 50% position allocation may lack flexibility.

#### Optimization Directions
1. Dynamic Parameter Optimization: Automatically adjust EMA periods and stop-loss buffer based on market volatility.
2. Market Environment Filtering: Add trend strength and volatility indicators to adjust parameters in different market conditions.
3. Position Management Optimization: Dynamically adjust position sizes based on volatility and account equity.
4. Entry Timing Optimization: Incorporate additional technical indicators (RSI, MACD, etc.) to optimize entry timing.
5. Take-Profit Optimization: Introduce trailing stop mechanisms for better profit protection.

#### Summary
The strategy builds a comprehensive trend-following trading system through multiple EMAs and tiered operations. Its strength lies in combining key elements of trend following and risk management, though it requires parameter optimization and rule improvements based on actual market conditions. Through the suggested optimization directions, the strategy has the potential to maintain stable performance across different market environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Golden Cross with Customizable TP/SL", overlay=true)

// Parameters for EMA
ema_short_length = 25
ema_mid_length = 50
ema_long_length = 100

// Parameters for stop-loss and take-profit
lookback_bars = input.int(20, title="Lookback bars for lowest low")
pip_buffer = input.float(0.0003, title="Stop-loss buffer (pips)")  // Fixed default pip value (e.g., 3 pips for 5-digit pairs)
tp_multiplier1 = input.float(1.0, title="Take-profit multiplier 1")
tp_multiplier2 = input.float(1.5, title="Take-profit multiplier 2")

// Calculate EMAs
ema25 = ta.ema(close, ema_short_length)
ema50 = ta.ema(close, ema_mid_length)
ema100 = ta.ema(close, ema_long_length)

// Golden Cross condition (EMA25 > EMA50 > EMA100)
golden_cross = ema25 > ema50 and ema50 > ema100

// Entry condition: Candle crosses above EMA25 after a golden cross
cross_above_ema25 = ta.crossover(close, ema25)
entry_condition = golden_cross and cross_above_ema25

// Stop-loss and take-profit calculation
lowest_low = ta.lowest(low, lookback_bars)
var float entry_price = na
var float stop_loss = na
var float take_profit1 = na
var float take_profit2 = na

if (entry_condition)
    entry_price := close
    stop_loss := lowest_low - pip_buffer
    take_profit1 := entry_price + (entry_price - stop_loss) * tp_multiplier1
    take_profit2 := entry_price + (entry_price - stop_loss) * tp_multiplier2
    strategy.entry("Buy1", strategy.long, qty=0.5)  // First 50%
    strategy.entry("Buy2", strategy.long, qty=0.5)  // Second 50%

// Separate exit conditions for each entry
cross_below_ema100 = ta.crossunder(close, ema100)
exit_condition1 = close >= take_profit1
exit_condition2 = close >= take_profit2
exit_condition_sl = close <= stop_loss

if (exit_condition1 or cross_below_ema100)
    strategy.close("Buy1")
if (exit_condition2 or cross_below_ema100 or exit_condition_sl)
    strategy.close("Buy2")

// Plot EMAs
plot(ema25, color=color.blue, title="EMA 25")
plot(ema50, color=color.orange, title="EMA 50")
plot(ema100, color=color.red, title="EMA 100")

```

> Detail

https://www.fmz.com/strategy/475633

> Last Modified

2024-12-20 16:54:43
