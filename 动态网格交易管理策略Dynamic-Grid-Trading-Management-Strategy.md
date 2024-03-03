
> Name

动态网格交易管理策略Dynamic-Grid-Trading-Management-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/94167a8e43301ded56.png)
[trans]

### 概述
动态网格交易管理策略（Dynamic Grid Trading Management Strategy）是一种基于价格变动的交易策略。它利用了市场波动性，通过在不同价格水平设置买入和卖出点，以达到优化投资组合的目的。该策略适用于各种市场条件，特别适合于长期持有、现货交易和无杠杆的摆动交易。

### 策略原理
动态网格交易管理策略的核心在于使用基于时间周期的枢轴点来确定网格级别。它通过设置多个买入和卖出点，实现在价格下跌时买入，在价格上涨时卖出的策略。当市场价格下跌时，策略会持续买入，以降低平均买入成本。当市场价格上涨超过平均买入价格时，策略开始卖出，若价格持续上涨，则持续卖出，从而实现利润。

### 策略优势
1. **适应市场波动**：该策略能有效适应市场波动，无论是牛市还是熊市均可运用。
2. **风险分散**：通过在不同价格级别进行交易，分散了单一价格点买入或卖出的风险。
3. **长期收益**：适合长期持有策略，通过平均成本效应，长期可能获得稳定收益。

### 策略风险
1. **市场极端行为**：在极端市场行为下，如剧烈波动或市场崩溃，该策略可能会面临较大风险。
2. **策略优化需求**：策略需要根据市场情况不断调整和优化，以适应不同的市场环境。

### 策略优化方向
1. **参数调整**：根据市场变化，调整网格大小和交易频率，以适应不同的市场波动。
2. **风险控制**：引入更精细的风险管理机制，如设置止损点，以避免极端市场条件下的大幅损失。

### 总结
动态网格交易管理策略是一种灵活的交易策略，适用于多种市场环境。它通过在不同价格级别进行买卖，旨在降低风险并实现长期收益。然而，由于市场的不可预测性，策略需要不断的调整和优化以适应市场变化。总体而言，该策略为追求长期稳定收益的投资者提供了一个有吸引力的选择。

||

### Overview
The Dynamic Grid Trading Management Strategy is a market fluctuation-based trading approach. Utilizing market volatility, it sets buying and selling points at different price levels to optimize the portfolio. This strategy is adaptable to various market conditions, particularly suitable for long-term holdings, spot trading, and swing trading without leverage.

### Principle of the Strategy
The essence of the Dynamic Grid Trading Management Strategy is to use pivot points based on time periods to determine grid levels. It sets multiple buying and selling points, buying when the market price falls, and selling when it rises. Continuous buying during a market downturn lowers the average cost of acquisition. When the market price exceeds the average buying price, the strategy begins to sell, continuing to do so if the price keeps rising, thereby realizing profits.

### Advantages of the Strategy
1. **Adap

ts to Market Fluctuations**: The strategy effectively adapts to market swings, applicable in both bull and bear markets.
2. **Risk Diversification**: Trades at different price levels diversify the risk of buying or selling at a single price point.
3. **Long-term Gains**: Suitable for long-term holding strategies, potentially yielding stable returns over time due to the average cost effect.

### Risks of the Strategy
1. **Extreme Market Behavior**: In extreme market conditions, such as drastic fluctuations or market crashes, the strategy may face significant risks.
2. **Need for Strategy Optimization**: The strategy requires continuous adjustment and optimization according to market conditions.

### Directions for Optimization
1. **Parameter Adjustment**: Adjusting grid size and trading frequency according to market changes can accommodate different market volatilities.
2. **Risk Control**: Introducing finer risk management mechanisms, like setting stop-loss points, to avoid substantial losses in extreme market conditions.

### Conclusion
The Dynamic Grid Trading Management Strategy is a versatile trading approach, applicable to various market environments. By trading at different price levels, it aims to reduce risk and achieve long-term gains. However, due to market unpredictability, the strategy requires ongoing adjustments and optimizations to adapt to market changes. Overall, this strategy offers an attractive option for investors seeking long-term, stable returns.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0| 》 WIDTH TYPE: PRICE|% PP|
|v_input_2|500| 》 WIDTH|
|v_input_3|0| 》 PP PERIOD: Month|Week|15D|Day|
|v_input_4|0| 》 BUY TYPE: CASH|CONTRACTS|% EQUITY|
|v_input_5|10000| 》 QUANTITY TO BUY|
|v_input_6|0| 》 SELL TYPE: CONTRACTS|CASH|% EQUITY|
|v_input_7|2| 》 QUANTITY TO SELL|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-27 00:00:00
end: 2023-12-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © XaviZ

//@version=4
strategy(title = "CoGrid Management", shorttitle = "CoGrid?", overlay = true, pyramiding = 1000, default_qty_value = 0)

// ———————————————————— Inputs

WOption             = input('PRICE',        " 》 WIDTH TYPE",                                                   options = ['PRICE','% PP'])
Width               = input(500,            " 》 WIDTH",                type = input.float,     minval = 0)
ppPeriod            = input('Month',        " 》 PP PERIOD",                                                    options = ['Day','Week','15D','Month'])
BuyType             = input("CASH",         " 》 BUY TYPE",                                                     options = ["CONTRACTS","CASH","% EQUITY"])
BuyQ                = input(10000,          " 》 QUANTITY TO BUY",      type = input.float,     minval = 0)
SellType            = input('CONTRACTS',    " 》 SELL TYPE",                                                    options = ["CONTRACTS","CASH","% EQUITY"])
SellQ               = input(2,              " 》 QUANTITY TO SELL",     type = input.float,     minval = 0)

// ———————————————————— Vars

// ————— Buy Price & Sell Price
var float OpenPrice = na
OpenPrice := nz(OpenPrice[1])

// ————— Final Buy Price & Final Sell Price
var float FinalBuyPrice = na
FinalBuyPrice  := nz(FinalBuyPrice[1])
var float FinalSellPrice = na
FinalSellPrice := nz(FinalSellPrice[1])
var float FinalOpenPrice = na
FinalOpenPrice := nz(FinalOpenPrice[1])

// ————— Average Price
var int nBuys = na
nBuys := nz(nBuys[1])
var int nSells = na
nSells := nz(nSells[1])
var float sumBuy = na
sumBuy := nz(sumBuy[1])
var float sumSell = na
sumSell := nz(sumSell[1])
var float sumQtyBuy = na
sumQtyBuy := nz(sumQtyBuy[1])
var float sumQtySell = na
sumQtySell := nz(sumQtySell[1])
var float AveragePrice = na
AveragePrice := nz(AveragePrice[1])

// ————— Fibonacci Pivots Level Calculation
var float PP = na

// ————— Origin from Rounded Pivot Points or last Sell
var float PPdownOrigin = na

// ————— Origin from Rounded Position Price
var float PPupOrigin = na

// ————— Final Buy & Sell Conditions
var bool BuyCondition = na
BuyCondition := nz(BuyCondition[1])
var bool SellCondition = na
SellCondition := nz(SellCondition[1])

// ————— Backtest
BuyFactor           = BuyType  == "CONTRACTS"   ? 1 : BuyType == "% EQUITY" ? (100 / (strategy.equity / close)) : close
SellFactor          = SellType == "CASH"        ? close : 1
BuyQuanTity         = BuyQ  / BuyFactor
SellQuanTity        = SellQ / SellFactor

// ———————————————————— Pivot Points

// ————— Pivot Points Period
res                 = ppPeriod == '15D' ? '15D' : ppPeriod == 'Week' ? 'W' : ppPeriod == 'Day' ? 'D' : 'M'

// ————— High, Low, Close Calc. 
// "Function to securely and simply call `security()` so that it never repaints and never looks ahead" (@PineCoders)
f_secureSecurity(_symbol, _res, _src) => security(_symbol, _res, _src[1], lookahead = barmerge.lookahead_on)

phigh               = f_secureSecurity(syminfo.tickerid, res, high)
plow                = f_secureSecurity(syminfo.tickerid, res, low)
pclose              = f_secureSecurity(syminfo.tickerid, res, close)

// ————— Fibonacci Pivots Level Calculation
PP                  := (phigh + plow + pclose) / 3

// ———————————————————— Grid Strategy

// ————— Width between levels
float GridWidth     = WOption == 'PRICE' ? Width : PP * (Width/100)

// ————— Origin from Rounded Pivot Points
PPdownOrigin        := floor(PP / GridWidth) * GridWidth

// ————— Origin from Rounded Average Position Price
PPupOrigin          := nz(PPupOrigin[1])

// ————— Grid Calculation
fGrid(_1, _2, _n) =>
    _a = _1, _b = _2, _c = 0.0
    for _i = 1 to _n
        if _i == 1
            _c := _a
        else
            _c := _a + _b
        _a := _c

// ————— Initial Open Price
fOpenPrice() =>
    var float _ldown = na
    var bool _pb = na
    var float _lup = na
    var bool  _ps = na
    var float _OpenPrice = na
    _OpenPrice := nz(_OpenPrice[1])
    for _i = 1 to 15
        _ldown := fGrid(PPdownOrigin, -GridWidth, _i)
        _lup := fGrid(PPupOrigin, GridWidth, _i)
        _pb := crossunder(low, _ldown) and high >= _ldown
        _ps := crossover(high, _lup) and low <= _lup
        if _pb
            _OpenPrice := _ldown
        if _ps
            _OpenPrice := _lup
    _OpenPrice
    
OpenPrice := fOpenPrice()

// ————— Buy at better Price
fBuyCondition(_n) =>
    var float _ldown = na
    _ldown := nz(_ldown[1])
    var bool _pb = na
    _pb := nz(_pb[1])
    var bool _BuyCondition = na
    _BuyCondition := nz(_BuyCondition[1])
    for _i = 1 to _n
        _ldown := fGrid(PPdownOrigin, -GridWidth, _i)
        _pb := crossunder(low, _ldown) and high >= _ldown
        _BuyCondition := nz(nBuys) == 0 ? _pb and _ldown < (fixnan(OpenPrice[1]) - GridWidth / 4)  : _pb and _ldown < (fixnan(FinalOpenPrice[1]) - GridWidth / 4)
    _BuyCondition

// ————— Sell at better Price
fSellCondition(_n) =>
    var float _lup = na
    _lup := nz(_lup[1])
    var bool  _ps = na
    _ps := nz(_ps[1])
    var bool _SellCondition = na
    _SellCondition := nz(_SellCondition[1])
    for _i = 1 to _n
        _lup := fGrid(PPupOrigin, GridWidth, _i)
        _ps  := crossover(high, _lup) and low <= _lup
        _SellCondition := nz(nSells) == 0 ? _ps and _lup > (fixnan(OpenPrice[1]) + GridWidth / 4) : _ps and _lup > (fixnan(FinalOpenPrice[1]) + GridWidth / 4)
    _SellCondition

// ————— Final Open Price
fFinalOpenPrice() =>
    var float _ldown = na
    _ldown := nz(_ldown[1])
    var float _lup = na
    _lup := nz(_lup[1])
    var float _FinalBuyPrice = na
    _FinalBuyPrice := nz(_FinalBuyPrice[1])
    var float _FinalSellPrice = na
    _FinalSellPrice := nz(_FinalSellPrice[1])
    var float _FinalOpenPrice = na
    _FinalOpenPrice := nz(_FinalOpenPrice[1])
    for _i = 1 to 15
        _ldown := fGrid(PPdownOrigin, -GridWidth, _i)
        _lup := fGrid(PPupOrigin, GridWidth, _i)
        if fBuyCondition(_i)
            _FinalBuyPrice  := _ldown
            _FinalOpenPrice := _ldown
        if fSellCondition(_i)
            _FinalSellPrice := _lup
            _FinalOpenPrice := _lup
    [_FinalBuyPrice,_FinalSellPrice,_FinalOpenPrice]

[_FinalBuyPrice,_FinalSellPrice,_FinalOpenPrice] = fFinalOpenPrice()
FinalBuyPrice := _FinalBuyPrice, FinalSellPrice := _FinalSellPrice, FinalOpenPrice := _FinalOpenPrice

// ————— Average Price & Backtest
for _i = 1 to 15
    if fBuyCondition(_i)
        nBuys           := nBuys + 1
        nSells          := na
        sumBuy          := FinalOpenPrice * BuyQuanTity + nz(sumBuy[1])
        sumQtyBuy       := BuyQuanTity + nz(sumQtyBuy[1])
        AveragePrice    := sumBuy / sumQtyBuy
        strategy.entry("BUY", strategy.long, qty = BuyQuanTity)
        
    if fSellCondition(_i)
        nBuys           := na
        nSells          := nSells + 1
        sumBuy          := na
        sumQtyBuy       := na
        strategy.close("BUY", qty = SellType != "% EQUITY" ? SellQuanTity : na, qty_percent = (SellType == "% EQUITY" ? SellQuanTity : na), comment = "SELL")

// ————— Origin from Rounded Pivot Points or last Sell                      
PPdownOrigin := (WOption == 'PRICE') ? 
     (fixnan(FinalSellPrice[1]) <= PP ? (floor(fixnan(FinalSellPrice[1]) / GridWidth) * GridWidth) - GridWidth : floor(PP / GridWidth) * GridWidth) :
     (fixnan(FinalSellPrice[1]) <= PP ? fixnan(FinalSellPrice[1]) - GridWidth : PP)

// ————— Origin from Rounded Average Buy Price
PPupOrigin := WOption == 'PRICE' ?
     ((ceil(fixnan(AveragePrice[1]) / GridWidth) * GridWidth) + GridWidth) :
     (fixnan(AveragePrice[1]) + GridWidth)
     
// ———————————————————— Plotting

// ————— Plotting Pivot Points
plot(PP, title  = "PP", style = plot.style_circles, color = color.aqua, linewidth = 2)

// ————— Plotting the average price
plot(nBuys > 1 ? AveragePrice[1] : na, title = "Average Price", style = plot.style_circles, color = color.fuchsia, linewidth = 2)

// ————— Buy Conditions                                                 ————— Sell Conditions
pb1  = fBuyCondition(1)  ? fGrid(PPdownOrigin, -GridWidth, 1)   : na,   ps1  = fSellCondition(1)  ? fGrid(PPupOrigin, GridWidth, 1)   : na
pb2  = fBuyCondition(2)  ? fGrid(PPdownOrigin, -GridWidth, 2)   : na,   ps2  = fSellCondition(2)  ? fGrid(PPupOrigin, GridWidth, 2)   : na
pb3  = fBuyCondition(3)  ? fGrid(PPdownOrigin, -GridWidth, 3)   : na,   ps3  = fSellCondition(3)  ? fGrid(PPupOrigin, GridWidth, 3)   : na
pb4  = fBuyCondition(4)  ? fGrid(PPdownOrigin, -GridWidth, 4)   : na,   ps4  = fSellCondition(4)  ? fGrid(PPupOrigin, GridWidth, 4)   : na
pb5  = fBuyCondition(5)  ? fGrid(PPdownOrigin, -GridWidth, 5)   : na,   ps5  = fSellCondition(5)  ? fGrid(PPupOrigin, GridWidth, 5)   : na
pb6  = fBuyCondition(6)  ? fGrid(PPdownOrigin, -GridWidth, 6)   : na,   ps6  = fSellCondition(6)  ? fGrid(PPupOrigin, GridWidth, 6)   : na
pb7  = fBuyCondition(7)  ? fGrid(PPdownOrigin, -GridWidth, 7)   : na,   ps7  = fSellCondition(7)  ? fGrid(PPupOrigin, GridWidth, 7)   : na
pb8  = fBuyCondition(8)  ? fGrid(PPdownOrigin, -GridWidth, 8)   : na,   ps8  = fSellCondition(8)  ? fGrid(PPupOrigin, GridWidth, 8)   : na
pb9  = fBuyCondition(9)  ? fGrid(PPdownOrigin, -GridWidth, 9)   : na,   ps9  = fSellCondition(9)  ? fGrid(PPupOrigin, GridWidth, 9)   : na
pb10 = fBuyCondition(10) ? fGrid(PPdownOrigin, -GridWidth, 10)  : na,   ps10 = fSellCondition(10) ? fGrid(PPupOrigin, GridWidth, 10)  : na
pb11 = fBuyCondition(11) ? fGrid(PPdownOrigin, -GridWidth, 11)  : na,   ps11 = fSellCondition(11) ? fGrid(PPupOrigin, GridWidth, 11)  : na
pb12 = fBuyCondition(12) ? fGrid(PPdownOrigin, -GridWidth, 12)  : na,   ps12 = fSellCondition(12) ? fGrid(PPupOrigin, GridWidth, 12)  : na
pb13 = fBuyCondition(13) ? fGrid(PPdownOrigin, -GridWidth, 13)  : na,   ps13 = fSellCondition(13) ? fGrid(PPupOrigin, GridWidth, 13)  : na
pb14 = fBuyCondition(14) ? fGrid(PPdownOrigin, -GridWidth, 14)  : na,   ps14 = fSellCondition(14) ? fGrid(PPupOrigin, GridWidth, 14)  : na
pb15 = fBuyCondition(15) ? fGrid(PPdownOrigin, -GridWidth, 15)  : na,   ps15 = fSellCondition(15) ? fGrid(PPupOrigin, GridWidth, 15)  : na

// ————— Buy Level Conditions
lb1  = low < fGrid(PPdownOrigin, -GridWidth, 1)   and PP > fGrid(PPdownOrigin, -GridWidth, 1)  ? fGrid(PPdownOrigin, -GridWidth, 1)   : na
lb2  = low < fGrid(PPdownOrigin, -GridWidth, 2)   and PP > fGrid(PPdownOrigin, -GridWidth, 2)  ? fGrid(PPdownOrigin, -GridWidth, 2)   : na
lb3  = low < fGrid(PPdownOrigin, -GridWidth, 3)   and PP > fGrid(PPdownOrigin, -GridWidth, 3)  ? fGrid(PPdownOrigin, -GridWidth, 3)   : na
lb4  = low < fGrid(PPdownOrigin, -GridWidth, 4)   and PP > fGrid(PPdownOrigin, -GridWidth, 4)  ? fGrid(PPdownOrigin, -GridWidth, 4)   : na
lb5  = low < fGrid(PPdownOrigin, -GridWidth, 5)   and PP > fGrid(PPdownOrigin, -GridWidth, 5)  ? fGrid(PPdownOrigin, -GridWidth, 5)   : na
lb6  = low < fGrid(PPdownOrigin, -GridWidth, 6)   and PP > fGrid(PPdownOrigin, -GridWidth, 6)  ? fGrid(PPdownOrigin, -GridWidth, 6)   : na
lb7  = low < fGrid(PPdownOrigin, -GridWidth, 7)   and PP > fGrid(PPdownOrigin, -GridWidth, 7)  ? fGrid(PPdownOrigin, -GridWidth, 7)   : na
lb8  = low < fGrid(PPdownOrigin, -GridWidth, 8)   and PP > fGrid(PPdownOrigin, -GridWidth, 8)  ? fGrid(PPdownOrigin, -GridWidth, 8)   : na
lb9  = low < fGrid(PPdownOrigin, -GridWidth, 9)   and PP > fGrid(PPdownOrigin, -GridWidth, 9)  ? fGrid(PPdownOrigin, -GridWidth, 9)   : na
lb10 = low < fGrid(PPdownOrigin, -GridWidth, 10)  and PP > fGrid(PPdownOrigin, -GridWidth, 10) ? fGrid(PPdownOrigin, -GridWidth, 10)  : na
lb11 = low < fGrid(PPdownOrigin, -GridWidth, 11)  and PP > fGrid(PPdownOrigin, -GridWidth, 11) ? fGrid(PPdownOrigin, -GridWidth, 11)  : na
lb12 = low < fGrid(PPdownOrigin, -GridWidth, 12)  and PP > fGrid(PPdownOrigin, -GridWidth, 12) ? fGrid(PPdownOrigin, -GridWidth, 12)  : na
lb13 = low < fGrid(PPdownOrigin, -GridWidth, 13)  and PP > fGrid(PPdownOrigin, -GridWidth, 13) ? fGrid(PPdownOrigin, -GridWidth, 13)  : na
lb14 = low < fGrid(PPdownOrigin, -GridWidth, 14)  and PP > fGrid(PPdownOrigin, -GridWidth, 14) ? fGrid(PPdownOrigin, -GridWidth, 14)  : na
lb15 = low < fGrid(PPdownOrigin, -GridWidth, 15)  and PP > fGrid(PPdownOrigin, -GridWidth, 15) ? fGrid(PPdownOrigin, -GridWidth, 15)  : na

// ————— Sell Level Conditions
ls1  = high > fGrid(PPupOrigin, GridWidth, 1)   and PP < fGrid(PPupOrigin, GridWidth, 1)  ? fGrid(PPupOrigin, GridWidth, 1)   : na
ls2  = high > fGrid(PPupOrigin, GridWidth, 2)   and PP < fGrid(PPupOrigin, GridWidth, 2)  ? fGrid(PPupOrigin, GridWidth, 2)   : na
ls3  = high > fGrid(PPupOrigin, GridWidth, 3)   and PP < fGrid(PPupOrigin, GridWidth, 3)  ? fGrid(PPupOrigin, GridWidth, 3)   : na
ls4  = high > fGrid(PPupOrigin, GridWidth, 4)   and PP < fGrid(PPupOrigin, GridWidth, 4)  ? fGrid(PPupOrigin, GridWidth, 4)   : na
ls5  = high > fGrid(PPupOrigin, GridWidth, 5)   and PP < fGrid(PPupOrigin, GridWidth, 5)  ? fGrid(PPupOrigin, GridWidth, 5)   : na
ls6  = high > fGrid(PPupOrigin, GridWidth, 6)   and PP < fGrid(PPupOrigin, GridWidth, 6)  ? fGrid(PPupOrigin, GridWidth, 6)   : na
ls7  = high > fGrid(PPupOrigin, GridWidth, 7)   and PP < fGrid(PPupOrigin, GridWidth, 7)  ? fGrid(PPupOrigin, GridWidth, 7)   : na
ls8  = high > fGrid(PPupOrigin, GridWidth, 8)   and PP < fGrid(PPupOrigin, GridWidth, 8)  ? fGrid(PPupOrigin, GridWidth, 8)   : na
ls9  = high > fGrid(PPupOrigin, GridWidth, 9)   and PP < fGrid(PPupOrigin, GridWidth, 9)  ? fGrid(PPupOrigin, GridWidth, 9)   : na
ls10 = high > fGrid(PPupOrigin, GridWidth, 10)  and PP < fGrid(PPupOrigin, GridWidth, 10) ? fGrid(PPupOrigin, GridWidth, 10)  : na
ls11 = high > fGrid(PPupOrigin, GridWidth, 11)  and PP < fGrid(PPupOrigin, GridWidth, 11) ? fGrid(PPupOrigin, GridWidth, 11)  : na
ls12 = high > fGrid(PPupOrigin, GridWidth, 12)  and PP < fGrid(PPupOrigin, GridWidth, 12) ? fGrid(PPupOrigin, GridWidth, 12)  : na
ls13 = high > fGrid(PPupOrigin, GridWidth, 13)  and PP < fGrid(PPupOrigin, GridWidth, 13) ? fGrid(PPupOrigin, GridWidth, 13)  : na
ls14 = high > fGrid(PPupOrigin, GridWidth, 14)  and PP < fGrid(PPupOrigin, GridWidth, 14) ? fGrid(PPupOrigin, GridWidth, 14)  : na
ls15 = high > fGrid(PPupOrigin, GridWidth, 15)  and PP < fGrid(PPupOrigin, GridWidth, 15) ? fGrid(PPupOrigin, GridWidth, 15)  : na

// ————— Buy Shapes
plotshape(pb1,  title = "Buy 1",  style = shape.diamond, location = location.absolute, color = color.lime, text = "1",  size = size.tiny)
plotshape(pb2,  title = "Buy 2",  style = shape.diamond, location = location.absolute, color = color.lime, text = "2",  size = size.tiny)
plotshape(pb3,  title = "Buy 3",  style = shape.diamond, location = location.absolute, color = color.lime, text = "3",  size = size.tiny)
plotshape(pb4,  title = "Buy 4",  style = shape.diamond, location = location.absolute, color = color.lime, text = "4",  size = size.tiny)
plotshape(pb5,  title = "Buy 5",  style = shape.diamond, location = location.absolute, color = color.lime, text = "5",  size = size.tiny)
plotshape(pb6,  title = "Buy 6",  style = shape.diamond, location = location.absolute, color = color.lime, text = "6",  size = size.tiny)
plotshape(pb7,  title = "Buy 7",  style = shape.diamond, location = location.absolute, color = color.lime, text = "7",  size = size.tiny)
plotshape(pb8,  title = "Buy 8",  style = shape.diamond, location = location.absolute, color = color.lime, text = "8",  size = size.tiny)
plotshape(pb9,  title = "Buy 9",  style = shape.diamond, location = location.absolute, color = color.lime, text = "9",  size = size.tiny)
plotshape(pb10, title = "Buy 10", style = shape.diamond, location = location.absolute, color = color.lime, text = "10", size = size.tiny)
plotshape(pb11, title = "Buy 11", style = shape.diamond, location = location.absolute, color = color.lime, text = "11", size = size.tiny)
plotshape(pb12, title = "Buy 12", style = shape.diamond, location = location.absolute, color = color.lime, text = "12", size = size.tiny)
plotshape(pb13, title = "Buy 13", style = shape.diamond, location = location.absolute, color = color.lime, text = "13", size = size.tiny)
plotshape(pb14, title = "Buy 14", style = shape.diamond, location = location.absolute, color = color.lime, text = "14", size = size.tiny)
plotshape(pb15, title = "Buy 15", style = shape.diamond, location = location.absolute, color = color.lime, text = "15", size = size.tiny)

// ————— Sell Shapes
plotshape(ps1,  title = "Sell 1",  style = shape.diamond, location = location.absolute, color = color.orange, text = "1",  size = size.tiny)
plotshape(ps2,  title = "Sell 2",  style = shape.diamond, location = location.absolute, color = color.orange, text = "2",  size = size.tiny)
plotshape(ps3,  title = "Sell 3",  style = shape.diamond, location = location.absolute, color = color.orange, text = "3",  size = size.tiny)
plotshape(ps4,  title = "Sell 4",  style = shape.diamond, location = location.absolute, color = color.orange, text = "4",  size = size.tiny)
plotshape(ps5,  title = "Sell 5",  style = shape.diamond, location = location.absolute, color = color.orange, text = "5",  size = size.tiny)
plotshape(ps6,  title = "Sell 6",  style = shape.diamond, location = location.absolute, color = color.orange, text = "6",  size = size.tiny)
plotshape(ps7,  title = "Sell 7",  style = shape.diamond, location = location.absolute, color = color.orange, text = "7",  size = size.tiny)
plotshape(ps8,  title = "Sell 8",  style = shape.diamond, location = location.absolute, color = color.orange, text = "8",  size = size.tiny)
plotshape(ps9,  title = "Sell 9",  style = shape.diamond, location = location.absolute, color = color.orange, text = "9",  size = size.tiny)
plotshape(ps10, title = "Sell 10", style = shape.diamond, location = location.absolute, color = color.orange, text = "10", size = size.tiny)
plotshape(ps11, title = "Sell 11", style = shape.diamond, location = location.absolute, color = color.orange, text = "11", size = size.tiny)
plotshape(ps12, title = "Sell 12", style = shape.diamond, location = location.absolute, color = color.orange, text = "12", size = size.tiny)
plotshape(ps13, title = "Sell 13", style = shape.diamond, location = location.absolute, color = color.orange, text = "13", size = size.tiny)
plotshape(ps14, title = "Sell 14", style = shape.diamond, location = location.absolute, color = color.orange, text = "14", size = size.tiny)
plotshape(ps15, title = "Sell 15", style = shape.diamond, location = location.absolute, color = color.orange, text = "15", size = size.tiny)

// ————— Plotting Lines under PP                                                        // ————— Plotting Lines above PP
plot(lb1,  title = "Level down 1",  style = plot.style_circles, color = color.green),   plot(ls1,  title = "Level up 1",  style = plot.style_circles, color = color.red)
plot(lb2,  title = "Level down 2",  style = plot.style_circles, color = color.green),   plot(ls2,  title = "Level up 2",  style = plot.style_circles, color = color.red)
plot(lb3,  title = "Level down 3",  style = plot.style_circles, color = color.green),   plot(ls3,  title = "Level up 3",  style = plot.style_circles, color = color.red)
plot(lb4,  title = "Level down 4",  style = plot.style_circles, color = color.green),   plot(ls4,  title = "Level up 4",  style = plot.style_circles, color = color.red)
plot(lb5,  title = "Level down 5",  style = plot.style_circles, color = color.green),   plot(ls5,  title = "Level up 5",  style = plot.style_circles, color = color.red)
plot(lb6,  title = "Level down 6",  style = plot.style_circles, color = color.green),   plot(ls6,  title = "Level up 6",  style = plot.style_circles, color = color.red)
plot(lb7,  title = "Level down 7",  style = plot.style_circles, color = color.green),   plot(ls7,  title = "Level up 7",  style = plot.style_circles, color = color.red)
plot(lb8,  title = "Level down 8",  style = plot.style_circles, color = color.green),   plot(ls8,  title = "Level up 8",  style = plot.style_circles, color = color.red)
plot(lb9,  title = "Level down 9",  style = plot.style_circles, color = color.green),   plot(ls9,  title = "Level up 9",  style = plot.style_circles, color = color.red)
plot(lb10, title = "Level down 10", style = plot.style_circles, color = color.green),   plot(ls10, title = "Level up 10", style = plot.style_circles, color = color.red)
plot(lb11, title = "Level down 11", style = plot.style_circles, color = color.green),   plot(ls11, title = "Level up 11", style = plot.style_circles, color = color.red)
plot(lb12, title = "Level down 12", style = plot.style_circles, color = color.green),   plot(ls12, title = "Level up 12", style = plot.style_circles, color = color.red)
plot(lb13, title = "Level down 13", style = plot.style_circles, color = color.green),   plot(ls13, title = "Level up 13", style = plot.style_circles, color = color.red)
plot(lb14, title = "Level down 14", style = plot.style_circles, color = color.green),   plot(ls14, title = "Level up 14", style = plot.style_circles, color = color.red)
plot(lb15, title = "Level down 15", style = plot.style_circles, color = color.green),   plot(ls15, title = "Level up 15", style = plot.style_circles, color = color.red)

// by XaviZ?
```

> Detail

https://www.fmz.com/strategy/434185

> Last Modified

2023-12-04 15:43:44
