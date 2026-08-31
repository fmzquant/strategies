
> Name

Adaptive-RSI-Oscillator-Dynamic-Trading-Strategy-with-Threshold-Optimization

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d3c942f250ad19bde2.png)


#### Overview
This strategy is an adaptive trading system based on the Relative Strength Index (RSI), which optimizes trade signal generation through dynamic adjustment of overbought and oversold thresholds. The core innovation lies in the introduction of Bufi's Adaptive Threshold (BAT) method, which dynamically adjusts RSI trigger thresholds based on market trends and price volatility, thereby improving the effectiveness of traditional RSI strategies.

#### Strategy Principles
The core concept is upgrading traditional fixed-threshold RSI systems to dynamic threshold systems. Implementation details:
1. Using short-period RSI to calculate market overbought/oversold conditions
2. Calculating price trend slope through linear regression
3. Measuring price volatility using standard deviation
4. Integrating trend and volatility information to dynamically adjust RSI thresholds
5. Raising thresholds in uptrends and lowering them in downtrends
6. Reducing threshold sensitivity when prices deviate significantly from means

The strategy includes two risk control mechanisms:
- Fixed-period position closing
- Maximum loss stop-loss

#### Strategy Advantages
1. Strong Dynamic Adaptability:
- Automatically adjusts trading thresholds based on market conditions
- Avoids drawbacks of fixed parameters in different market environments

2. Comprehensive Risk Control:
- Maximum holding time limits
- Capital stop-loss protection
- Percentage-based position management

3. Improved Signal Quality:
- Reduces false signals in oscillating markets
- Enhances trend capture capability
- Balances sensitivity and stability

#### Strategy Risks
1. Parameter Sensitivity:
- BAT coefficient selection affects strategy performance
- RSI period settings require thorough testing
- Adaptive length parameters need optimization

2. Market Environment Dependence:
- May miss opportunities in high volatility markets
- Significant slippage possible during extreme volatility
- Parameters need adjustment for different markets

3. Technical Limitations:
- Relies on historical data for threshold calculation
- Potential lag in signal generation
- Trading costs need consideration

#### Strategy Optimization Directions
1. Parameter Optimization:
- Introduce adaptive parameter selection mechanisms
- Dynamically adjust parameters for different market cycles
- Add automatic parameter optimization functionality

2. Signal Optimization:
- Incorporate additional technical indicators for validation
- Add market cycle identification functionality
- Optimize entry timing determination

3. Risk Control Optimization:
- Implement dynamic stop-loss mechanisms
- Optimize position management strategies
- Add drawdown control mechanisms

#### Summary
This innovative adaptive trading strategy addresses the limitations of traditional RSI strategies through dynamic threshold optimization. The strategy comprehensively considers market trends and volatility, featuring strong adaptability and risk control capabilities. While challenges exist in parameter optimization, continuous improvement and optimization make this strategy promising for actual trading. Traders are advised to conduct thorough backtesting and parameter optimization before live implementation, with appropriate adjustments based on specific market characteristics.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PineCodersTASC

//  TASC Issue: October 2024
//     Article: Overbought/Oversold
//              Oscillators: Useless Or Just Misused
//  Article By: Francesco P. Bufi
//    Language: TradingView's Pine Script™ v5
// Provided By: PineCoders, for tradingview.com

//@version=5
title  ='TASC 2024.10 Adaptive Oscillator Threshold'
stitle = 'AdapThrs'
strategy(title, stitle, false, default_qty_type = strategy.percent_of_equity,
         default_qty_value = 10, slippage = 5)

// --- Inputs ---
string sys    = input.string("BAT", "System", options=["Traditional", "BAT"])
int rsiLen    = input.int(2, "RSI Length", 1)
int buyLevel  = input.int(14, "Buy Level", 0)
int adapLen   = input.int(8, "Adaptive Length", 2) 
float adapK   = input.float(6, "Adaptive Coefficient")
int exitBars  = input.int(28, "Fixed-Bar Exit", 1, group = "Strategy Settings")
float DSL     = input.float(1600, "Dollar Stop-Loss", 0, group = "Strategy Settings")

// --- Functions --- 
//  Bufi's Adaptive Threshold
BAT(float price, int length) =>
    float sd = ta.stdev(price, length)
    float lr = ta.linreg(price, length, 0)
    float slope = (lr - price[length]) / (length + 1)
    math.min(0.5, math.max(-0.5, slope / sd))

// --- Calculations ---
float osc = ta.rsi(close, rsiLen)

// Strategy entry rules
// - Traditional system
if sys == "Traditional" and osc < buyLevel
    strategy.entry("long", strategy.long)
// - BAT system 
float thrs = buyLevel * adapK * BAT(close, adapLen)
if sys == "BAT" and osc < thrs
    strategy.entry("long", strategy.long)

// Strategy exit rules
// - Fixed-bar exit
int nBar = bar_index - strategy.opentrades.entry_bar_index(0)
if exitBars > 0 and nBar >= exitBars
    strategy.close("long", "exit")
// - Dollar stop-loss
if DSL > 0 and strategy.opentrades.profit(0) <= - DSL
    strategy.close("long", "Stop-loss", immediately = true)

// Visuals
rsiColor  = #1b9e77
thrsColor = #d95f02
rsiLine   = plot(osc, "RSI", rsiColor, 1)
thrsLine  = plot(sys == "BAT" ? thrs : buyLevel, "Threshold", thrsColor, 1)
zeroLine  = plot(0.0, "Zero", display = display.none)
fill(zeroLine, thrsLine, sys == "BAT" ? thrs : buyLevel, 0.0, color.new(thrsColor, 60), na)

```

> Detail

https://www.fmz.com/strategy/471710

> Last Modified

2024-11-12 16:07:32
