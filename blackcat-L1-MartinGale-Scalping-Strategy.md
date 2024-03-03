
> Name

blackcat-L1-MartinGale-Scalping-Strategy

> Author

Zer3192

> Strategy Description

MartinGale（马丁格尔）策略是一种在交易中常用的流行的资金管理策略。它通常用于在交易者通过在每次亏损后增加头寸规模来寻求恢复。所以，MartinGale不是指具体一个策略，而是一类补仓，加仓的策略的统称。

在MartinGale策略中，交易者在每次亏损交易之后会将头寸规模加倍。这样做的目的是希望最终会出现一次盈利交易，以恢复之前的亏损并产生利润。

MartinGale策略背后的理念是利用平均法则。通过在每次亏损后增加头寸规模，该策略假设最终会出现一次盈利交易，这不仅会弥补之前的亏损，还会产生利润。对于寻求快速从亏损中恢复的交易者来说，这可能特别吸引人。

然而，需要注意的是，MartinGale策略存在着重大风险。如果交易者经历了持续的亏损阶段或缺乏足够的资金，该策略可能导致巨额亏损。该策略依赖于盈利交易会在一定时间内发生的假设，这是危险的，因为无法保证在特定时间范围内会出现盈利交易。
考虑实施MartinGale策略的交易者应仔细评估自己的风险承受能力，并充分了解潜在的缺点。建立一个可靠的风险管理计划以减轻潜在的损失非常重要。此外，交易者应意识到该策略可能并不适用于所有市场情况，并且可能需要根据市场波动进行调整。

总而言之，MartinGale策略是一种资金管理策略，它涉及在每次亏损后增加头寸规模，以试图从亏损阶段中恢复。虽然它可以提供快速恢复的潜力，但也存在着交易者在实施这种交易方法之前应仔细考虑的重大风险。

虽然并不是很认同这种交易观点，但是有人私信说也聊聊这个话题，就写了个简单的38线框架，做短线的MartinGale。

MartinGale抢帽子策略是一种通过频繁交易来产生利润的交易策略。它利用移动平均线的交叉来生成入场和出场信号。该策略使用TradingView的Pine脚本语言实现。

该策略首先定义了输入变量，如止盈和止损水平，以及交易模式（多头、空头或双向）。然后，它设置了一个规则，只有在交易模式设置为“多头”时才允许进场。

策略逻辑使用简单移动平均线（SMA）的交叉信号和交叉信号定义。它计算了短期SMA（SMA3）和长期SMA（SMA8），并在图表上绘制它们。crossoverSignal和crossunderSignal变量用于跟踪交叉和交叉事件的发生，而crossoverState和crossunderState变量确定交叉和交叉条件的状态。

策略执行基于当前持仓大小。如果持仓大小为零（没有持仓），策略会检查交叉和交叉事件。如果发生交叉事件并且交易模式允许多头进场，则会进入多头持仓。入场价格、止损价格、止盈价格和止损价格是基于当前收盘价格和SMA8值计算的。类似地，如果发生交叉事件并且交易模式允许空头进场，则会进入空头持仓，并进行相应的价格计算。
如果存在多头持仓并且当前收盘价格达到止盈价格或止损价格，并且发生交叉事件，则会平仓多头持仓。入场价格、止损价格、止盈价格和止损价格将被重置为零。

同样，如果存在空头持仓并且当前收盘价格达到止盈价格或止损价格，并且发生交叉事件，则会平仓空头持仓，并重置价格变量。

该策略还使用plotshape函数在图表上绘制入场和出场点。它显示一个指向上的三角形表示买入入场，一个指向下的三角形表示买入出场，一个指向下的三角形表示卖出入场，一个指向上的三角形表示卖出出场。

总体而言，MartinGale剃头策略旨在通过利用短期移动平均线的交叉来捕捉小幅利润。它通过止盈和止损水平实现风险管理，并允许不同的交易模式以适应不同的市场条件。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.03|Take Profit|
|v_input_2|0.95|Stop Loss|
|v_input_string_1|0|Trading Mode: Long|Short|BiDir|


> Source (PineScript)

``` pinescript
//@version=5
 strategy('[blackcat] L1 MartinGale Scalping Strategy', overlay=true, pyramiding = 5)
 
 // Define input variables
// martingaleMultiplier = input(2, title="加倍倍数")
 takeProfit = input(1.03, title='Take Profit')
 stopLoss = input(0.95, title='Stop Loss')
 inputTradingMode = input.string(defval='Long', options=['Long', 'Short', 'BiDir'], title='Trading Mode')
 
 //The purpose of this rule is to forbid short entries, only long etries will be placed. The rule affects the following function: 'entry'.
strategy.risk.allow_entry_in(inputTradingMode == 'Long' ? strategy.direction.long : inputTradingMode == 'Short' ? strategy.direction.short : strategy.direction.all)

// Define strategy logic 
entryPrice = 0.0
stopPrice = 0.0
takeProfitPrice = 0.0
stopLossPrice = 0.0

// Define SMA crossover and crossunder signals
sma3 = ta.sma(close, 3)
sma8 = ta.sma(close, 8)
plot(sma3, color=color.yellow)
plot(sma8, color=color.fuchsia)
crossoverSignal = ta.crossover(sma3, sma8)
crossunderSignal = ta.crossunder(sma3, sma8)
crossoverState = sma3 > sma8
crossunderState = sma3 < sma8

if strategy.position_size == 0
    if crossoverState
       strategy.entry('Buy',strategy.long)
       entryPrice := close
       stopPrice := close - stopLoss * sma8[1]
       takeProfitPrice := close + takeProfit * sma8[1]
       stopLossPrice := stopPrice
       stopLossPrice
    if crossunderState
        strategy.entry('Sell', strategy.short)
        entryPrice := close
        stopPrice := close + stopLoss *  sma8[1]
        takeProfitPrice := close - takeProfit *  sma8[1]
        stopLossPrice := stopPrice
        stopLossPrice

if strategy.position_size > 0
    if (close > takeProfitPrice or close < stopLossPrice) and crossunderState
        strategy.close('Buy')
        entryPrice := 0.0
        stopPrice := 0.0
        takeProfitPrice := 0.0
        stopLossPrice := 0.0
        stopLossPrice
    else
        strategy.entry('Buy', strategy.long)
        entryPrice := close
        stopPrice := close - stopLoss *  sma8[1]
        takeProfitPrice := close + takeProfit *  sma8[1]
        stopLossPrice := stopPrice
        stopLossPrice

if strategy.position_size < 0
    if (close > takeProfitPrice or close < stopLossPrice) and crossoverState
        strategy.close('Sell')
        entryPrice := 0.0
        stopPrice := 0.0
        takeProfitPrice := 0.0
        stopLossPrice := 0.0
        stopLossPrice
    else
        strategy.entry('Sell', strategy.short)
        entryPrice := close
        stopPrice := close + stopLoss *  sma8[1]
        takeProfitPrice := close - takeProfit *  sma8[1]
        stopLossPrice := stopPrice
        stopLossPrice

// Plot entry and exit points
plotshape(strategy.position_size > 0 and crossoverSignal, 'Buy Entry', shape.triangleup, location.belowbar, color.new(color.green, 0), size=size.small)
plotshape(strategy.position_size > 0 and (close >= takeProfitPrice or close <= stopLossPrice), 'Buy Exit', shape.triangledown, location.abovebar, color.new(color.red, 0), size=size.small)
plotshape(strategy.position_size < 0 and crossunderSignal, 'Sell Entry', shape.triangledown, location.abovebar, color.new(color.red, 0), size=size.small)
plotshape(strategy.position_size < 0 and (close >= takeProfitPrice or close <= stopLossPrice), 'Sell Exit', shape.triangleup, location.belowbar, color.new(color.green, 0), size=size.small)
```

> Detail

https://www.fmz.com/strategy/428756

> Last Modified

2023-11-03 17:27:45
