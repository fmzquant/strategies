
> Name

Cross-Period-Momentum-EMA-Strategy-with-RSI-and-Dynamic-ATR-Stop-Loss

> Author

ChaoZhang

> Strategy Description

#### Overview
This strategy is a comprehensive intraday trading system that combines multiple technical indicators. It primarily uses the crossover signals of fast and slow Exponential Moving Averages (EMA) as the main entry criteria, incorporates the Relative Strength Index (RSI) for momentum filtering, and utilizes the Average True Range (ATR) for dynamic stop-loss placement, forming a complete trading system. Through strict risk control and dynamic profit/loss settings, the strategy aims to capture short-term market fluctuations.

#### Strategy Principles
The core logic includes the following aspects:
1. Trend Determination: Using 9-period and 21-period EMA crossovers to identify market trend direction
2. Momentum Filtering: Employing 14-period RSI for overbought/oversold judgments to prevent counter-trend entries
3. Risk Control: Setting dynamic stop-loss levels based on 14-period ATR with a multiplier of 1.5
4. Profit Targets: Setting dynamic take-profit levels at 2 times ATR from entry point

Specific trading rules:
- Long Entry: Fast EMA crosses above Slow EMA with RSI below 70
- Short Entry: Fast EMA crosses below Slow EMA with RSI above 30
- Stop-Loss: Long positions set at 1.5 times ATR below entry, short positions at 1.5 times ATR above entry
- Take-Profit: Dynamic levels set at 2 times ATR from entry price

#### Strategy Advantages
1. Multiple Indicator Confirmation: Combines trend and momentum indicators for improved signal reliability
2. Dynamic Risk Management: Adapts stop-loss levels to market volatility using ATR
3. Systematic Trading: Clear entry and exit conditions reduce subjective judgment
4. Reasonable Risk-Reward Ratio: Balanced profit and loss settings for long-term stability
5. High Adaptability: Parameters can be adjusted for different market characteristics

#### Strategy Risks
1. Rapid Oscillation Risk: May generate frequent false breakout signals in ranging markets
2. Slippage Impact: Intraday trading requires high execution efficiency
3. Parameter Sensitivity: Optimal parameters may vary across different market environments
4. Transaction Costs: Frequent trading may incur higher costs

Risk Control Suggestions:
- Conduct thorough historical data backtesting
- Consider adding trading filters
- Control position sizing appropriately
- Regular parameter effectiveness evaluation

#### Strategy Optimization Directions
1. Enhanced Market Environment Filtering:
- Add volatility indicators to judge market characteristics
- Dynamically adjust parameters based on market conditions

2. Refined Trading Rules:
- Consider adding time filters
- Implement volume confirmation mechanisms
- Optimize profit/loss ratios

3. Strengthened Risk Control:
- Implement dynamic position sizing
- Add maximum drawdown controls
- Design comprehensive money management plans

#### Summary
This strategy constructs a relatively complete trading system by combining EMA trend following, RSI momentum filtering, and ATR dynamic risk control. Its main feature is the synergistic effect of multiple technical indicators while emphasizing risk management. While there is room for optimization, the overall design philosophy aligns with systematic quantitative trading principles. Traders are advised to conduct thorough parameter optimization and backtesting before live implementation, while making appropriate adjustments based on their risk tolerance and money management requirements.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-10 00:00:00
end: 2025-02-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Day Trading EMA/RSI Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=200)

// Ulazni parametri
fastEmaPeriod   = input.int(9, "Fast EMA Period", minval=1)
slowEmaPeriod   = input.int(21, "Slow EMA Period", minval=1)
rsiPeriod       = input.int(14, "RSI Period", minval=1)
rsiOversold     = input.int(30, "RSI Oversold Level")
rsiOverbought   = input.int(70, "RSI Overbought Level")
atrPeriod       = input.int(14, "ATR Period", minval=1)
atrMultiplier   = input.float(1.5, "ATR Multiplier za Stop Loss", step=0.1)
takeProfitFactor= input.float(2.0, "Take Profit Factor", step=0.1)

// Izračun indikatora
fastEMA = ta.ema(close, fastEmaPeriod)
slowEMA = ta.ema(close, slowEmaPeriod)
rsiValue = ta.rsi(close, rsiPeriod)
atrValue = ta.atr(atrPeriod)

// Definicija trenda: ako je fastEMA iznad slowEMA, smatramo da je trend uzlazan, inače silazni.
trendUp   = fastEMA > slowEMA
trendDown = fastEMA < slowEMA

// Uvjeti za ulaz:
// Ulaz u long poziciju: crossover fastEMA i slowEMA, uz filtriranje da RSI nije prekupovan (manje od rsiOverbought)
longCondition  = ta.crossover(fastEMA, slowEMA) and (rsiValue < rsiOverbought)
// Ulaz u short poziciju: crossunder fastEMA i slowEMA, uz filtriranje da RSI nije preprodavan (više od rsiOversold)
shortCondition = ta.crossunder(fastEMA, slowEMA) and (rsiValue > rsiOversold)

// Definicija dinamičnih stop-loss razina (ATR-based)
stopLossLong  = close - (atrMultiplier * atrValue)
stopLossShort = close + (atrMultiplier * atrValue)

// Izvršenje naloga
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", stop=stopLossLong, limit=close + (takeProfitFactor * atrValue))

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", "Short", stop=stopLossShort, limit=close - (takeProfitFactor * atrValue))

// Plotanje indikatora za preglednost
plot(fastEMA, title="Fast EMA", color=color.green)
plot(slowEMA, title="Slow EMA", color=color.red)

```

> Detail

https://www.fmz.com/strategy/481349

> Last Modified

2025-02-10 14:34:58
