
> Name

Dynamic-DCA-based-Cryptocurrency-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d87668986448175d4858.png)
![IMG](https://www.fmz.com/upload/asset/2d90fdc309b085a7c667d.png)


[trans]
#### 概述
这是一个专为加密货币市场设计的量化交易策略,充分利用加密货币市场的高波动性特征,通过智能的成本平均法(DCA)在价格回调时动态加仓。策略在15分钟时间框架上运行,能够有效应对加密货币市场的快速波动,同时规避过度交易带来的风险。

#### 策略原理
策略主要包含四个核心模块：
1. 智能入场系统：基于OHLC4加权均价进行首次建仓,适应加密货币市场的高波动特性
2. 动态补仓机制：在价格回调时触发安全订单,补仓量随深度增加而放大,充分利用市场波动
3. 风险管理系统：通过金字塔式加仓和灵活杠杆调整来优化风险收益比
4. 快速止盈控制：针对加密货币市场的快速波动特点设计的止盈机制,包含手续费优化

#### 策略优势
1. 市场适应性：专门针对加密货币市场的高波动特性进行优化
2. 风险分散：通过动态分批建仓降低加密货币市场的突发性风险
3. 套利效率：充分利用加密货币市场的价格波动获取收益
4. 自动化执行：支持多个主流加密货币交易所的API接入
5. 资金效率：通过智能杠杆管理提高加密货币交易的资金利用效率

#### 策略风险
1. 市场风险：加密货币市场的极端波动可能导致较大回撤
2. 流动性风险：部分小市值加密货币可能面临流动性不足问题
3. 杠杆风险：加密货币市场的高波动性增加了杠杆交易的风险
4. 技术风险：依赖交易所API的稳定性和网络连接质量
5. 监管风险：加密货币市场的政策变化可能影响策略执行

#### 策略优化方向
1. 波动度自适应：引入加密货币市场特有的波动率指标来动态调整参数
2. 多币种协同：开发多币种联动交易逻辑,分散单一币种风险
3. 市场情绪过滤：集成加密货币市场情绪指标,优化入场时机
4. 交易成本优化：通过智能路由和交易所选择降低成本
5. 风险预警机制：建立基于市场异常波动的预警系统

#### 总结
该策略通过创新的DCA方法和动态风险管理,为加密货币交易提供了一个全面的自动化解决方案。虽然加密货币市场存在较高风险,但通过精心设计的风控机制和市场适应性优化,策略能够在大多数市场环境下保持稳定性。未来优化将着重于提升策略对加密货币市场特殊性的适应能力。 || 

#### Overview
This is a quantitative trading strategy specifically designed for the cryptocurrency market, leveraging its high volatility characteristics through intelligent Dollar-Cost Averaging (DCA) with dynamic position scaling during price retracements. Operating on a 15-minute timeframe, it effectively handles rapid cryptocurrency market fluctuations while avoiding overtrading risks.

#### Strategy Principles
The strategy consists of four core modules:
1. Smart Entry System: Initial position based on OHLC4 weighted average price, adapted to cryptocurrency market volatility
2. Dynamic Accumulation Mechanism: Triggers safety orders during price retracements, scaling position size with depth to utilize market volatility
3. Risk Management System: Optimizes risk-reward ratio through pyramiding and flexible leverage adjustment
4. Rapid Take-Profit Control: Designed for cryptocurrency market's quick fluctuations, including fee optimization

#### Strategy Advantages
1. Market Adaptability: Specifically optimized for cryptocurrency market's high volatility
2. Risk Diversification: Reduces sudden risks in cryptocurrency markets through dynamic staged positioning
3. Arbitrage Efficiency: Effectively captures profits from cryptocurrency price volatility
4. Automated Execution: Supports API integration with major cryptocurrency exchanges
5. Capital Efficiency: Improves capital utilization through intelligent leverage management

#### Strategy Risks
1. Market Risk: Extreme cryptocurrency volatility may lead to significant drawdowns
2. Liquidity Risk: Some small-cap cryptocurrencies may face insufficient liquidity
3. Leverage Risk: High cryptocurrency volatility increases leverage trading risks
4. Technical Risk: Depends on exchange API stability and network connection quality
5. Regulatory Risk: Cryptocurrency market policy changes may affect strategy execution

#### Strategy Optimization Directions
1. Volatility Adaptation: Introduce cryptocurrency-specific volatility indicators for dynamic parameter adjustment
2. Multi-coin Synergy: Develop multi-cryptocurrency trading logic to diversify single-coin risk
3. Market Sentiment Filtering: Integrate cryptocurrency market sentiment indicators to optimize entry timing
4. Transaction Cost Optimization: Reduce costs through smart routing and exchange selection
5. Risk Alert Mechanism: Establish warning system based on market abnormal fluctuations

#### Summary
The strategy provides a comprehensive automated solution for cryptocurrency trading through innovative DCA methods and dynamic risk management. While cryptocurrency markets carry high risks, the strategy maintains stability in most market conditions through carefully designed risk control mechanisms and market adaptability optimization. Future improvements will focus on enhancing strategy adaptation to cryptocurrency market specificities.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2020-08-29 15:00:00
end: 2025-02-18 17:22:45
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"TRB_USDT"}]
*/

//@version=5
strategy('Autotrade.it DCA', overlay=true, pyramiding=999, default_qty_type=strategy.cash, initial_capital=10000, commission_value=0.02)

// Date Ranges
from_month = 1
from_day = 1
from_year = 2021
to_month = 1
to_day = 1
to_year = 9999
start = timestamp(from_year, from_month, from_day, 00, 00)  // backtest start window
finish = timestamp(to_year, to_month, to_day, 23, 59)  // backtest finish window
window = time >= start and time <= finish ? true : false  // create function "within window of time"

source_type = 'OHLC4'
source_function(type) =>
    if type == 'Close'
        close
    else if type == 'Open'
        open
    else if type == 'High'
        high
    else if type == 'Low'
        low
    else if type == 'HL2'
        hl2
    else if type == 'HL3'
        hlc3
    else if type == 'OHLC4'
        ohlc4
    else if type == 'Median Body'
        (open + close) / 2
    else if type == 'Weighted Close'
        (high + low + 2 * close) / 4
    else if type == 'Trend Biased'
        close > open ? (high + close) / 2 : (low + close) / 2
    else if type == 'Trend Biased Extreme'
        close > open ? high : low
truncate(number, decimals) =>
    factor = math.pow(10, decimals)
    int(number * factor) / factor
// Strategy Inputs
price_deviation = input.float(1.0, title='Price deviation to open safety orders (%)', minval=0.0) / 100
take_profit = 1.0 / 100
base_order = 10.0
safe_order = 10.0
safe_order_volume_scale = 1.1
safe_order_step_scale = 1.1
max_safe_order = 30

var current_so = 0
var initial_order = 0.0
var previous_high_value = 0.0
var original_ttp_value = 0.0
// Calculate our key levels
take_profit_level = strategy.position_avg_price * (1 + take_profit)
startTrade = input.int(defval=1, title='Trade Start')
margin = input.float(title='Margin', defval=1, step=1, tooltip='USDT')
leverage = input.int(title='Leverage', defval=50, tooltip='it only used on futures trade')
multi = 1.125
var float multiplier = 1
symbol = str.replace_all(syminfo.ticker, '.P', '')
var float totalMargin = 0.0
var bool isTrade =false
var float totalPrice = 0.0
var int totalTrade = 0
var float totalQtys = 0
var float sellPrice = 0
var float sellQty = 0


// // First Position
if strategy.position_size == 0 and window and source_function(source_type) > 0 and previous_high_value == 0.0
    strategy.entry('No Position', strategy.long, qty=base_order / source_function(source_type))
    initial_order := source_function(source_type)
    current_so := 1
    previous_high_value := 0.0
    original_ttp_value := 0
    original_ttp_value

threshold = 0.0
if safe_order_step_scale == 1.0
    threshold := initial_order - initial_order * price_deviation * safe_order_step_scale * current_so
    threshold
else
    threshold := initial_order - initial_order * ((price_deviation * math.pow(safe_order_step_scale, current_so) - price_deviation) / (safe_order_step_scale - 1))
    threshold

// Average Down
if current_so > 0 and source_function(source_type) <= threshold and current_so <= max_safe_order and previous_high_value == 0.0
    if(startTrade<=current_so)
        margin := math.round(margin * multiplier * 100) / 100
        multiplier *= multi
        totalMargin += margin
        avePrice = (totalPrice/totalTrade)
        qty = margin*leverage/close
        isTrade := true
        totalPrice+=close
        totalTrade+=1
        totalQtys+=qty
        alert('{"category": "linear", "mode": 3, "tradeMode": 0, "symbol": "' + str.tostring(symbol) + '", "leverage": "' + str.tostring(leverage) + '", "side": "Buy", "orderType": "Market", "marketUnit": "quoteCoin", "qty": "' + str.tostring(margin) + '", "reduceOnly": false, "positionIdx": 1 }')
        strategy.entry('Trade # ' + str.tostring(current_so) +"---Margin: $" + str.tostring(margin), direction=strategy.long, qty=safe_order * math.pow(safe_order_volume_scale, current_so - 1) / source_function(source_type))
    else
        strategy.entry('Trade # ' + str.tostring(current_so) +" No position", direction=strategy.long, qty=safe_order * math.pow(safe_order_volume_scale, current_so - 1) / source_function(source_type))
    current_so += 1
    current_so


// Take Profit!
if take_profit_level <= source_function(source_type) and strategy.position_size > 0 or previous_high_value > 0.0
    if(isTrade)
        avePrice = totalMargin * leverage / totalQtys * 1.002  // Include fee directly
        percentGain = math.round((close - avePrice) / avePrice * 100 * 100) / 100
        gain = math.round(percentGain * leverage * totalMargin / 100 * 100) / 100
        isTrade := false
        sellPrice := avePrice*0.95
        sellQty := totalMargin * leverage/sellPrice
        loop = current_so-1
        testQty = sellQty/loop
        strategy.close_all(comment= "Take Profit: $" + str.tostring(gain))
        alert('{"category": "linear", "mode": 3, "tradeMode": 0, "symbol": "' + str.tostring(symbol) + '", "leverage": "' + str.tostring(testQty) + '", "side": "Sell", "orderType": "Market", "marketUnit": "baseCoin", "qty": "' + str.tostring(sellQty) + '", "reduceOnly": true, "positionIdx": 1, "loop": "' + str.tostring(loop) + '" }')
                    
    else
        strategy.close_all(comment='No Position')
    current_so := 0
    previous_high_value := 0
    original_ttp_value := 0
    multiplier:=1
    totalMargin:=0.0
    totalPrice:=0
    totalTrade:=0
    totalQtys:=0


```

> Detail

https://www.fmz.com/strategy/482672

> Last Modified

2025-02-27 17:56:06
