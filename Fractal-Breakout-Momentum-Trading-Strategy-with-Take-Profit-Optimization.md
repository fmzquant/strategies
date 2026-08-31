
> Name

Fractal-Breakout-Momentum-Trading-Strategy-with-Take-Profit-Optimization

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1037a76181e8ef8b361.png)

[trans]
#### 概述
该策略是一个基于价格分型理论的趋势跟踪交易系统，通过识别市场中的顶底分型结构，结合固定点数的触发条件和止盈设置，实现自动化交易。策略核心是在底分型上方设置多单入场点，顶分型下方设置空单入场点，同时配合相应的止盈点位进行风险控制。

#### 策略原理
策略的核心逻辑包含以下几个关键步骤：
1. 分型识别：通过比较连续三根K线的高低点来识别顶底分型。当中间K线的低点低于两侧K线时形成底分型；当中间K线的高点高于两侧K线时形成顶分型。
2. 入场条件：在识别到底分型后，在其上方107个点位设置多单触发价格；在识别到顶分型后，在其下方107个点位设置空单触发价格。
3. 止盈设置：开仓后在入场价格的基础上设置相同点数（107点）的止盈位。
4. 持仓管理：系统会持续跟踪最新的分型位置，并相应更新入场触发价格。

#### 策略优势
1. 客观性强：策略基于明确的数学定义来识别市场结构，避免了主观判断带来的偏差。
2. 风险可控：采用固定点数的止盈设置，让每笔交易的盈利目标明确且风险可控。
3. 适应性好：策略可以在不同的市场环境下运行，特别适合波动性较大的市场。
4. 自动化程度高：整个交易过程从信号识别到执行都是自动化的，减少了人为干预。

#### 策略风险
1. 假突破风险：市场可能出现短期突破后立即反转的情况，导致止损出场。
2. 震荡市风险：在横盘震荡市场中，频繁的顶底分型可能导致过多的交易信号。
3. 固定点数风险：使用固定的入场和止盈点数可能不适合所有市场环境。
4. 滑点风险：在高波动性市场中，可能面临严重的滑点问题。

#### 策略优化方向
1. 动态点数优化：可以根据市场波动率动态调整入场触发点数和止盈点数。
2. 趋势过滤：增加趋势判断指标，只在主趋势方向开仓。
3. 市场环境识别：添加市场环境判断机制，在不同市场状态下采用不同的参数设置。
4. 仓位管理优化：引入动态仓位管理系统，根据账户净值和市场风险度调整开仓量。

#### 总结
该策略通过结合分型理论和动量突破思想，构建了一个完整的交易系统。策略的优势在于其客观性和自动化程度高，但也存在一定的市场环境适应性问题。通过增加动态参数调整和市场环境识别等优化措施，可以进一步提升策略的稳定性和盈利能力。在实盘交易中，建议投资者根据自身风险承受能力和资金规模来调整参数设置。 ||

#### Overview
This strategy is a trend-following trading system based on price fractal theory, which identifies market fractal structures and combines fixed-point trigger conditions with take-profit settings for automated trading. The core strategy involves setting long entry points above bottom fractals and short entry points below top fractals, along with corresponding take-profit levels for risk control.

#### Strategy Principles
The core logic includes the following key steps:
1. Fractal Identification: Identifies top and bottom fractals by comparing three consecutive candlesticks. A bottom fractal forms when the middle candlestick's low is lower than its adjacent ones; a top fractal forms when the middle candlestick's high is higher than its adjacent ones.
2. Entry Conditions: Sets buy trigger price 107 pips above identified bottom fractals; sets sell trigger price 107 pips below identified top fractals.
3. Take Profit Setup: Places take-profit levels 107 pips from entry price.
4. Position Management: Continuously tracks the latest fractal positions and updates entry trigger prices accordingly.

#### Strategy Advantages
1. Objectivity: Uses clear mathematical definitions to identify market structure, avoiding subjective judgment bias.
2. Risk Control: Employs fixed-point take-profit settings for clear profit targets and controllable risk.
3. Adaptability: Can operate in various market environments, particularly suitable for highly volatile markets.
4. High Automation: The entire trading process from signal identification to execution is automated, reducing human intervention.

#### Strategy Risks
1. False Breakout Risk: Markets may quickly reverse after short-term breakouts, triggering stop losses.
2. Choppy Market Risk: Frequent top and bottom fractals in ranging markets may generate excessive trading signals.
3. Fixed Point Risk: Using fixed entry and take-profit points may not suit all market conditions.
4. Slippage Risk: May face significant slippage issues in highly volatile markets.

#### Strategy Optimization
1. Dynamic Point Optimization: Adjust entry trigger and take-profit points based on market volatility.
2. Trend Filtering: Add trend identification indicators to trade only in the primary trend direction.
3. Market Environment Recognition: Implement market state identification mechanisms to use different parameters in different market conditions.
4. Position Management Optimization: Introduce dynamic position sizing based on account equity and market risk levels.

#### Summary
This strategy combines fractal theory with momentum breakout concepts to build a complete trading system. Its strengths lie in objectivity and high automation, though it faces some market adaptability challenges. Through optimization measures like dynamic parameter adjustment and market environment recognition, the strategy's stability and profitability can be further enhanced. In live trading, investors should adjust parameters based on their risk tolerance and capital size.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-09 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Fractal Buy/Sell Strategy with 107 Pips Target", overlay=true)

// 输入参数
trigger_pips = input.int(107, title="Entry Distance (Pips)")  // 入场点距离底分型或顶分型的距离
take_profit_pips = input.int(107, title="Take Profit (Pips)") // 止盈点数

pip_value = syminfo.mintick * 10 // 点值（每点等于多少价格单位）

// 计算分型
is_bottom_fractal = low[1] < low[2] and low[1] < low[0] // 判断是否为底分型
is_top_fractal = high[1] > high[2] and high[1] > high[0] // 判断是否为顶分型

// 存储分型位置
var float last_bottom_fractal = na
var float last_top_fractal = na

// 更新分型值
if is_bottom_fractal
    last_bottom_fractal := low[1]
    
if is_top_fractal
    last_top_fractal := high[1]

// 计算开盘价格
bottom_trigger_price = na(last_bottom_fractal) ? na : last_bottom_fractal + trigger_pips * pip_value
top_trigger_price = na(last_top_fractal) ? na : last_top_fractal - trigger_pips * pip_value

// 交易逻辑：底分型多单和顶分型空单
if not na(last_bottom_fractal)
    if close <= bottom_trigger_price
        strategy.entry("Buy", strategy.long)
        strategy.exit("Take Profit", from_entry="Buy", limit=bottom_trigger_price + take_profit_pips * pip_value)
        
if not na(last_top_fractal)
    if close >= top_trigger_price
        strategy.entry("Sell", strategy.short)
        strategy.exit("Take Profit", from_entry="Sell", limit=top_trigger_price - take_profit_pips * pip_value)

// 绘制分型和触发价格
plotshape(series=is_bottom_fractal, style=shape.triangleup, location=location.belowbar, color=color.green, title="Bottom Fractal")
plotshape(series=is_top_fractal, style=shape.triangledown, location=location.abovebar, color=color.red, title="Top Fractal")
plot(bottom_trigger_price, title="Buy Trigger", color=color.green, linewidth=1)
plot(top_trigger_price, title="Sell Trigger", color=color.red, linewidth=1)
```

> Detail

https://www.fmz.com/strategy/474706

> Last Modified

2024-12-11 17:20:09
