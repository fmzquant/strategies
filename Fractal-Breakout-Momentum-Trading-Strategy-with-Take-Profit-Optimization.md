
> Name

Fractal-Breakout-Momentum-Trading-Strategy-with-Take-Profit-Optimization

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1037a76181e8ef8b361.png)

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
This strategy combines fractal theory with momentum breakout concepts to build a complete trading system. Its strengths lie in objectivity and high automation, though it faces some market adaptability challenges. Through optimization measures like dynamic parameter adjustment and market environment recognition, the strategy's stability and profitability can be further enhanced. In live trading, investors should adjust parameters based on their risk tolerance and capital size.

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
