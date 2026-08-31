
> Name

Mean-Reversion-Bollinger-Bands-Trading-Strategy-with-Rational-Return-Signal

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1efe4c5d9655f94dee3.png)

[trans]
#### 概述
本策略是一个基于布林带和价格均值回归原理的量化交易系统。通过监测价格与移动平均线之间的偏离程度,结合布林带上下轨的突破信号,在市场出现超买超卖后期待价格回归均值时进行交易。策略采用百分比阈值来衡量价格偏离程度,通过设定合理的触发条件来过滤虚假信号,提高交易的准确性。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 使用20日移动平均线作为中轨,配合2倍标准差构建布林带通道
2. 引入3.5%的价格偏离阈值来识别显著偏离
3. 通过is_outside变量跟踪价格是否处于偏离状态
4. 当价格回归布林带区间内时,将触发交易信号
5. 具体交易规则为:
   - 当价格从偏离状态回归且突破上轨时做多
   - 当价格从偏离状态回归且突破下轨时做空

#### 策略优势
1. 均值回归逻辑稳健
   - 基于价格终将回归均值的统计规律
   - 通过偏离阈值确保交易机会的显著性
2. 风险控制完善
   - 布林带提供了清晰的波动区间参考
   - 偏离状态跟踪避免在剧烈波动中交易
3. 参数可调节性强
   - 布林带参数可根据品种特性调整
   - 偏离阈值可根据风险偏好设定

#### 策略风险
1. 趋势市场失效风险
   - 在强趋势市场中可能产生频繁假信号
   - 建议增加趋势过滤器识别市场状态
2. 参数敏感性风险
   - 参数设置不当可能影响策略表现
   - 需要通过历史数据回测优化参数
3. 滑点成本风险
   - 频繁交易可能带来较高交易成本
   - 建议增加持仓时间限制和成本控制

#### 策略优化方向
1. 增加市场环境识别
   - 引入趋势强度指标如ADX
   - 根据市场状态动态调整参数
2. 完善止盈止损机制
   - 设置基于ATR的动态止损
   - 引入移动止盈保护利润
3. 优化交易频率
   - 增加最小持仓时间限制
   - 设置交易间隔控制成本

#### 总结
该策略通过布林带和均值回归原理捕捉市场超买超卖机会,结合合理的偏离阈值和状态跟踪机制,有效控制交易风险。策略框架具有良好的可扩展性,通过参数优化和功能完善可以适应不同市场环境。建议在实盘应用中注意风险控制,根据具体品种特性进行参数调整。 || 

#### Overview
This strategy is a quantitative trading system based on Bollinger Bands and price mean reversion principles. It monitors price deviation from the moving average, combined with Bollinger Bands breakout signals, to trade when expecting price regression after market overbought/oversold conditions. The strategy uses percentage thresholds to measure price deviation and sets reasonable trigger conditions to filter false signals and improve trading accuracy.

#### Strategy Principles
The core logic is based on the following key elements:
1. Uses 20-day moving average as middle band, with 2 standard deviations to construct Bollinger Bands
2. Introduces 3.5% price deviation threshold to identify significant divergence
3. Tracks price deviation status through is_outside variable
4. Triggers trading signals when price returns within Bollinger Bands
5. Specific trading rules:
   - Long when price returns from deviation and breaks above upper band
   - Short when price returns from deviation and breaks below lower band

#### Strategy Advantages
1. Robust Mean Reversion Logic
   - Based on statistical principle of price returning to mean
   - Ensures trading opportunity significance through deviation threshold
2. Comprehensive Risk Control
   - Bollinger Bands provide clear volatility range reference
   - Deviation status tracking avoids trading during extreme volatility
3. Strong Parameter Adjustability
   - Bollinger Bands parameters adjustable to instrument characteristics
   - Deviation threshold can be set according to risk preference

#### Strategy Risks
1. Trend Market Ineffectiveness Risk
   - May generate frequent false signals in strong trend markets
   - Recommend adding trend filter to identify market conditions
2. Parameter Sensitivity Risk
   - Improper parameter settings may affect strategy performance
   - Requires parameter optimization through historical data backtesting
3. Slippage Cost Risk
   - Frequent trading may incur high transaction costs
   - Recommend adding position time limits and cost controls

#### Strategy Optimization Directions
1. Add Market Environment Recognition
   - Introduce trend strength indicators like ADX
   - Dynamically adjust parameters based on market conditions
2. Improve Stop-Loss and Take-Profit Mechanisms
   - Set dynamic stops based on ATR
   - Introduce trailing stops to protect profits
3. Optimize Trading Frequency
   - Add minimum position holding time
   - Set trading interval to control costs

#### Summary
This strategy captures market overbought/oversold opportunities through Bollinger Bands and mean reversion principles, effectively controlling trading risks with reasonable deviation thresholds and status tracking mechanisms. The strategy framework has good scalability and can adapt to different market environments through parameter optimization and functionality improvements. It's recommended to focus on risk control in live trading and adjust parameters according to specific instrument characteristics.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-06 00:00:00
end: 2025-01-04 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estratégia com Bandas de Bollinger e Sinal de Retorno", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=200)

// Configurações das Bandas de Bollinger
length = input.int(20, title="Período da média")
mult = input.float(2.0, title="Desvio padrão")
bbBasis = ta.sma(close, length)
bbUpper = bbBasis + mult * ta.stdev(close, length)
bbLower = bbBasis - mult * ta.stdev(close, length)

// Configuração para a distância da média
percent_threshold = input.float(3.5, title="Distância da média (%)") / 100

dist_from_mean = 0.0
trigger_condition = false
if not na(bbBasis)
    dist_from_mean := math.abs(close - bbBasis) / bbBasis
    trigger_condition := dist_from_mean >= percent_threshold

// Variáveis para identificar o estado do afastamento
var bool is_outside = false
var color candle_color = color.new(color.white, 0)

if trigger_condition
    is_outside := true

if is_outside and close <= bbUpper and close >= bbLower
    is_outside := false
    candle_color := color.new(color.blue, 0) // Atribui uma cor válida
else
    candle_color := color.new(color.white, 0)

// Aplicar cor às velas
barcolor(candle_color)

// Plotar Bandas de Bollinger
plot(bbBasis, color=color.yellow, title="Média")
plot(bbUpper, color=color.red, title="Banda Superior")
plot(bbLower, color=color.green, title="Banda Inferior")

// Lógica de entrada e saída
longCondition = not is_outside and close > bbUpper
if (longCondition)
    strategy.entry("Buy", strategy.long)

shortCondition = not is_outside and close < bbLower
if (shortCondition)
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/477583

> Last Modified

2025-01-06 15:33:01
