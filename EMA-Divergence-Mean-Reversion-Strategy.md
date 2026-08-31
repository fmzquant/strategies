
> Name

EMA-Divergence-Mean-Reversion-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d850713e148d17c8a629.png)
![IMG](https://www.fmz.com/upload/asset/2d948dac3df7ff0bb78b8.png)



[trans]
#### 概述
这是一个基于均值回归原理的交易策略，利用价格与50周期指数移动平均线(EMA)之间的显著偏离来确定交易机会。该策略专门针对高波动性市场设计，旨在通过买入价格大幅低于EMA的底部并在价格恢复至EMA上方时卖出，从而获利。策略主要跟踪价格与EMA之间的百分比差异，当这种差异超过特定阈值时触发交易信号。

#### 策略原理
该策略的核心逻辑基于均值回归理论，即价格在短期内可能会偏离其均值，但长期来看会倾向于回归至均值。具体来说，策略使用50周期EMA作为价格的参考均值，当价格显著低于该均值（超过10%）时，视为买入机会；当价格回升至EMA上方且有盈利时，则触发卖出信号。计算方式如下：
1. 使用50周期EMA作为基准线
2. 计算价格与EMA的偏离百分比：`diff_perct = ((ema20 - close) / ema20) * 100`
3. 计算最高价与EMA的偏离百分比：`diff_perct2 = ((high - ema20) / ema20) * 100`
4. 当`diff_perct > 10`时（即价格比EMA低10%以上），触发买入信号
5. 当`diff_perct2 > 0`（即最高价高于EMA）且当前交易盈利大于1时，触发卖出信号

#### 策略优势
1. **明确的入场条件**：策略设定了具体的价格偏离阈值（10%），提供了清晰的入场信号，减少了主观判断的干扰。
2. **利用市场过度反应**：该策略旨在捕捉市场过度恐慌或下跌的机会，这些时候资产价格往往被低估。
3. **自动化执行**：策略可完全自动化，无需实时盯盘，降低了情绪干扰。
4. **灵活的资金管理**：策略使用现金分配方式而非固定单位，使资金利用更加灵活。
5. **简单易懂**：相比复杂的多指标策略，该策略逻辑简单，易于理解和调整。
6. **风险控制**：只有在已有盈利的情况下才会触发卖出，有助于保护已获利润。

#### 策略风险
1. **趋势风险**：在强烈的下跌趋势中，价格可能持续偏离EMA而不回归，导致"接飞刀"现象，造成持续亏损。
2. **参数敏感性**：10%的偏离阈值可能不适用于所有市场条件，在低波动性环境中可能难以触发，而在高波动性环境中可能过于频繁交易。
3. **缺乏止损机制**：代码中没有明确的止损设置，在市场持续恶化时可能导致较大损失。
4. **依赖EMA准确性**：策略假设EMA是价格的有效均值参考，但这在某些市场条件下可能不成立。
5. **流动性风险**：在流动性较低的市场中，买入或卖出订单可能面临滑点或不能完全执行的风险。
6. **盈利阈值固定**：盈利阈值设定为固定值1，没有考虑不同市场波动率下的适应性调整。

#### 优化方向
1. **动态偏离阈值**：将10%的固定偏离阈值改为基于近期波动性的动态阈值，例如使用ATR（Average True Range）指标调整入场条件。
2. **增加止损机制**：引入基于时间或价格的止损条件，例如设置最大持仓时间或最大允许亏损比例。
3. **多周期确认**：结合更长周期（如日线或周线）的趋势判断，避免在主要趋势反向时入场。
4. **分批建仓与平仓**：实现分级买入和分批卖出，而不是一次性建立或平仓所有仓位，以分散风险。
5. **增加过滤条件**：添加额外的技术指标（如RSI或MACD）作为过滤条件，提高交易信号的质量。
6. **自适应EMA周期**：尝试使用自适应的EMA周期，而不是固定的50周期，使策略更能适应变化的市场条件。
7. **回测优化**：在不同的市场周期和条件下进行广泛回测，找出最优参数组合。

#### 总结
这个50周期EMA背离均值回归策略是一个基于技术分析的自动化交易系统，通过捕捉价格与均线的显著偏离来寻找交易机会。该策略简单直观，适合波动性较大的市场环境，但也存在一定的风险，特别是在强势趋势市场中。通过增加止损机制、动态参数调整和多指标确认等优化措施，可以显著提高策略的稳健性和盈利能力。理想情况下，该策略适合作为更全面交易系统的一部分，而非单独使用。 || 

#### Overview
This is a mean reversion trading strategy that capitalizes on significant deviations between price and the 50-period Exponential Moving Average (EMA). Specifically designed for volatile markets, the strategy aims to profit by buying when prices fall substantially below the EMA and selling when they recover above it. The strategy primarily tracks the percentage difference between price and EMA, triggering trading signals when this difference exceeds specific thresholds.

#### Strategy Principle
The core logic is based on the mean reversion theory, which suggests that while prices may deviate from their mean in the short term, they tend to revert to it over time. The strategy uses a 50-period EMA as a reference point for the mean price. When the price falls significantly below this average (over 10%), it's considered a buying opportunity. When the price recovers above the EMA and shows a profit, it triggers a sell signal. The calculation is as follows:
1. Uses a 50-period EMA as the baseline
2. Calculates the percentage deviation of price from EMA: `diff_perct = ((ema20 - close) / ema20) * 100`
3. Calculates the percentage deviation of high price from EMA: `diff_perct2 = ((high - ema20) / ema20) * 100`
4. When `diff_perct > 10` (i.e., price is more than 10% below EMA), a buy signal is triggered
5. When `diff_perct2 > 0` (i.e., high price is above EMA) and the current trade is profitable (profit > 1), a sell signal is triggered

#### Strategy Advantages
1. **Clear Entry Conditions**: The strategy sets a specific price deviation threshold (10%), providing clear entry signals and reducing subjective judgment interference.
2. **Capitalizes on Market Overreactions**: The strategy aims to capture opportunities during excessive market panic or downturns when asset prices are often undervalued.
3. **Automated Execution**: The strategy can be fully automated, eliminating the need for constant monitoring and reducing emotional interference.
4. **Flexible Capital Management**: The strategy uses cash allocation rather than fixed units, allowing for more flexible capital utilization.
5. **Simplicity**: Compared to complex multi-indicator strategies, this strategy is straightforward, easy to understand, and adjust.
6. **Risk Control**: The sell signal is only triggered when there is already a profit, helping to protect realized gains.

#### Strategy Risks
1. **Trend Risk**: In strong downtrend markets, prices may continuously deviate from the EMA without reverting, leading to the "catching falling knives" phenomenon and sustained losses.
2. **Parameter Sensitivity**: The 10% deviation threshold may not be suitable for all market conditions, potentially failing to trigger in low-volatility environments or triggering too frequently in high-volatility ones.
3. **Lack of Stop-Loss Mechanism**: The code doesn't include explicit stop-loss settings, which could lead to significant losses if the market deteriorates continuously.
4. **Dependence on EMA Accuracy**: The strategy assumes the EMA is an effective reference for price, which may not hold true under certain market conditions.
5. **Liquidity Risk**: In less liquid markets, buy or sell orders may face slippage or incomplete execution.
6. **Fixed Profit Threshold**: The profit threshold is set at a fixed value of 1, without considering adaptive adjustments based on different market volatilities.

#### Optimization Directions
1. **Dynamic Deviation Threshold**: Replace the fixed 10% deviation threshold with a dynamic one based on recent volatility, perhaps using the Average True Range (ATR) indicator.
2. **Add Stop-Loss Mechanism**: Introduce time-based or price-based stop-loss conditions, such as maximum holding time or maximum allowable loss percentage.
3. **Multi-Timeframe Confirmation**: Incorporate trend judgments from longer timeframes (such as daily or weekly) to avoid entering positions against the primary trend.
4. **Staged Position Building and Closing**: Implement graduated buying and staged selling instead of establishing or closing all positions at once to distribute risk.
5. **Additional Filtering Conditions**: Add extra technical indicators (such as RSI or MACD) as filtering conditions to improve signal quality.
6. **Adaptive EMA Period**: Experiment with an adaptive EMA period instead of a fixed 50-period to better adjust to changing market conditions.
7. **Backtesting Optimization**: Conduct extensive backtesting under different market cycles and conditions to find optimal parameter combinations.

#### Summary
The 50-Period EMA Divergence Mean Reversion Strategy is an automated trading system based on technical analysis that seeks trading opportunities by capturing significant deviations between price and moving averages. The strategy is simple and intuitive, suitable for markets with higher volatility, but also carries certain risks, especially in strong trending markets. By adding stop-loss mechanisms, dynamic parameter adjustments, and multi-indicator confirmations, the strategy's robustness and profitability can be significantly enhanced. Ideally, this strategy would serve as part of a more comprehensive trading system rather than being used in isolation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-26 00:00:00
end: 2025-03-25 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("SUIBTC 2H - EMA dip public",overlay=true,initial_capital=100,default_qty_value=100, default_qty_type = strategy.cash,process_orders_on_close=false,calc_on_every_tick=false)


BuyTrigger = input.bool(false)
SellTrigger = input.bool(false)

src = input(open, title="Source")
offset = input.int(title="Offset", defval=5, minval=-500, maxval=500)

ema20 = ta.ema(close, 50)
plot(ema20, title="ema20", color=color.yellow, linewidth=3)




diff_perct = ((ema20 - close) / ema20) * 100
diff_perct2 = ((high -  ema20) / ema20) * 100





if ( diff_perct > 10)   
    BuyTrigger := true 

if(  diff_perct2 > 0 and strategy.openprofit > 1)
    SellTrigger := true 
    

    

notInTrade = strategy.position_size <= 0
inTrade = strategy.position_size > 0


timeSinceLastTrade_ms = time - strategy.opentrades.entry_time(0)


if (BuyTrigger and notInTrade )
    strategy.order("long", strategy.long , oca_name = 'audusdt' , when = BuyTrigger ,limit = open, comment = "buy: SUIBTC EMA Dip")
 
if (SellTrigger and inTrade )
    strategy.close(id="long" , qty_percent = 100,  comment = "sell: SUIBTC EMA Dip")
 
```

> Detail

https://www.fmz.com/strategy/488281

> Last Modified

2025-03-26 15:34:19
