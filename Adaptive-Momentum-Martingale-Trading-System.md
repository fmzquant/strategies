
> Name

Adaptive-Momentum-Martingale-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b5312aeacc2ccd6f5c.png)

[trans]
#### 策略概述
该策略是一个结合了自适应动量和马丁格尔仓位管理的全自动交易系统。它采用多层技术指标进行市场分析,包括自编码器平滑处理、CNN模拟动量特征提取以及基于波动率的交易信号过滤。系统通过马丁格尔方法动态调整仓位大小,在固定止盈止损的基础上实现风险收益的平衡。

#### 策略原理
策略运作基于三个核心模块:
1. 数据预处理模块 - 使用SMA实现类自编码器的价格平滑,过滤市场噪音。
2. 信号生成模块 - 通过计算价格与长期均线差值模拟CNN特征提取,结合波动率阈值筛选高概率交易机会。
3. 仓位管理模块 - 实现马丁格尔式的仓位调整,在连续亏损时按比例增加仓位,盈利后恢复基准仓位。

#### 策略优势
1. 信号生成的可靠性 - 通过多层技术指标和波动率过滤提高交易信号质量。
2. 风险管理的完整性 - 具备止盈止损、最大仓位限制等多重保护机制。
3. 自适应能力强 - 能根据市场状态动态调整交易策略。
4. 操作逻辑清晰 - 入场、出场条件明确,便于回测和优化。

#### 策略风险
1. 马丁格尔风险 - 连续亏损可能导致仓位快速增长,需要严格控制最大仓位。
2. 趋势反转风险 - 动量信号在市场剧烈波动时可能失效。
3. 参数敏感性 - 多个关键参数的设置会显著影响策略表现。

#### 策略优化方向
1. 信号优化 - 引入机器学习模型提升信号准确度。
2. 风控增强 - 添加回撤控制、持仓时间限制等风控手段。
3. 自适应参数 - 开发参数自适应机制,提高策略稳定性。
4. 多品种适应 - 扩展策略适用范围,实现多品种交易。

#### 总结
该策略通过结合现代量化交易技术和经典的马丁格尔方法,构建了一个兼具理论基础和实用性的交易系统。虽然存在一定风险,但通过合理的参数设置和严格的风险控制,该策略有望在数字货币市场中获得稳定收益。 || 

#### Strategy Overview
This strategy is a fully automated trading system that combines adaptive momentum and Martingale position management. It utilizes multiple technical indicators for market analysis, including autoencoder smoothing, CNN-simulated momentum feature extraction, and volatility-based trade signal filtering. The system dynamically adjusts position sizes using the Martingale method while maintaining a balance between risk and reward through fixed take-profit and stop-loss levels.

#### Strategy Principles
The strategy operates on three core modules:
1. Data Preprocessing Module - Uses SMA to achieve autoencoder-like price smoothing and filter market noise.
2. Signal Generation Module - Simulates CNN feature extraction by calculating price differences with long-term moving averages, combined with volatility thresholds to screen high-probability trading opportunities.
3. Position Management Module - Implements Martingale-style position adjustment, increasing position size proportionally after consecutive losses and reverting to baseline after profits.

#### Strategy Advantages
1. Signal Generation Reliability - Enhances trading signal quality through multiple technical indicators and volatility filtering.
2. Comprehensive Risk Management - Features multiple protection mechanisms including take-profit, stop-loss, and maximum position limits.
3. Strong Adaptability - Dynamically adjusts trading strategy based on market conditions.
4. Clear Operational Logic - Well-defined entry and exit conditions facilitate backtesting and optimization.

#### Strategy Risks
1. Martingale Risk - Consecutive losses may lead to rapid position growth, requiring strict maximum position control.
2. Trend Reversal Risk - Momentum signals may fail during extreme market volatility.
3. Parameter Sensitivity - Multiple key parameters significantly impact strategy performance.

#### Strategy Optimization Directions
1. Signal Enhancement - Incorporate machine learning models to improve signal accuracy.
2. Risk Control Enhancement - Add drawdown control and position duration limits.
3. Adaptive Parameters - Develop parameter adaptation mechanisms to improve strategy stability.
4. Multi-Asset Adaptation - Expand strategy applicability for multi-asset trading.

#### Summary
This strategy combines modern quantitative trading techniques with the classical Martingale method to create a trading system with both theoretical foundation and practicality. While certain risks exist, through proper parameter setting and strict risk control, the strategy shows promise for achieving stable returns in the cryptocurrency market.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-06 00:00:00
end: 2025-01-04 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Adaptive Crypto Trading Strategy with Martingale", shorttitle = "ACTS_w_MG_V1",overlay=true)

// Inputs
smoothing_length = input.int(14, title="Smoothing Length (Autoencoder)")
momentum_window = input.int(21, title="Momentum Window (CNN)")
volatility_threshold = input.float(0.02, title="Volatility Threshold (GAN Simulation)")
take_profit = input.float(0.05, title="Take Profit (%)")
stop_loss = input.float(0.02, title="Stop Loss (%)")

// Martingale Inputs
base_lot_size = input.float(1, title="Base Lot Size")  // Initial trade size
multiplier = input.float(2, title="Martingale Multiplier")  // Lot size multiplier after a loss
max_lot_size = input.float(2, title="Maximum Lot Size")  // Cap on lot size
var float lot_size = base_lot_size  // Initialize the lot size

// Step 1: Data Smoothing (Autoencoder)
smoothed_price = ta.sma(close, smoothing_length)

// Step 2: Feature Extraction (Momentum - CNN Simulation)
momentum = ta.sma(close, momentum_window) - close
volatility = ta.stdev(close, momentum_window)

// Step 3: Entry Conditions (GAN-Inspired Pattern Detection)
long_condition = (momentum > 0 and volatility > volatility_threshold)
short_condition = (momentum < 0 and volatility > volatility_threshold)

// Martingale Logic
if (strategy.closedtrades > 0)
    if (strategy.closedtrades.profit(strategy.closedtrades - 1) < 0)
        lot_size := math.min(lot_size * multiplier, max_lot_size)  // Increase lot size after a loss, but cap it
    else
        lot_size := base_lot_size  // Reset lot size after a win or on the first trade

// Step 4: Take Profit and Stop Loss Management
long_take_profit = close * (1 + take_profit)
long_stop_loss = close * (1 - stop_loss)
short_take_profit = close * (1 - take_profit)
short_stop_loss = close * (1 + stop_loss)

// Execute Trades
if (long_condition)
    strategy.entry("Long", strategy.long, qty=lot_size, stop=long_stop_loss, limit=long_take_profit)

if (short_condition)
    strategy.entry("Short", strategy.short, qty=lot_size, stop=short_stop_loss, limit=short_take_profit)


```

> Detail

https://www.fmz.com/strategy/477517

> Last Modified

2025-01-06 11:01:12
