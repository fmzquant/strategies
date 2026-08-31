
> Name

Dynamic-Trend-Following-ATR-Multi-Period-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16eb13a57812da9b795.png)

[trans]
#### 概述
该策略是一个基于ATR(平均真实波幅)指标的动态趋势跟踪系统,结合了多周期分析和投资组合管理功能。策略通过跟踪价格与ATR通道的相对位置,在不同时间周期上捕捉趋势变化,同时根据用户设定的交易数量动态管理仓位。策略设计兼顾了趋势跟踪的稳定性和交易时机的灵活性。

#### 策略原理
策略的核心逻辑基于以下几个关键要素:
1. 使用ATR指标建立动态止损通道,通道宽度由ATR周期和敏感度参数共同决定
2. 通过EMA与ATR通道的交叉确定买卖信号
3. 支持在5分钟到2小时等多个时间周期上运行
4. 结合投资组合跟踪机制,根据当前持仓动态调整买卖数量
5. 可选择使用平滑K线(Heikin Ashi)来降低虚假信号

#### 策略优势
1. 适应性强 - 通过ATR动态调整通道宽度,能够适应不同市场环境
2. 风险可控 - 内置止损机制,通过ATR通道提供动态止损位
3. 操作灵活 - 支持多周期分析,可根据不同品种特点选择合适的时间周期
4. Position管理 - 通过投资组合跟踪实现仓位的动态管理
5. 信号稳定 - 可选择平滑K线降低噪音,提高信号质量

#### 策略风险
1. 趋势依赖性 - 在震荡市场可能产生频繁交易
2. 滞后性 - 使用均线和ATR带来一定的信号滞后
3. 参数敏感 - ATR周期和敏感度参数的选择对策略表现影响较大
4. 资金管理 - 需要合理设置每次交易的数量,避免过度持仓
5. 市场适应性 - 不同市场环境下表现可能存在差异

#### 策略优化方向
1. 信号过滤
- 增加趋势强度确认指标
- 引入成交量分析
- 考虑加入波动率过滤器

2. 仓位管理
- 基于波动率动态调整持仓规模
- 实现分批建仓和减仓
- 加入最大回撤控制

3. 止损优化
- 结合支撑阻力位设置止损
- 实现移动止损
- 优化止损距离计算方法

#### 总结
该策略是一个结合了技术分析和投资组合管理的完整交易系统。通过ATR动态通道和多周期分析提供稳定的趋势跟踪能力,同时考虑了实际交易中的仓位管理需求。策略的优化重点应该放在信号质量提升和风险控制完善上,通过参数优化和功能扩展可以进一步提高策略的实用性。||

#### Overview
This strategy is a dynamic trend following system based on the ATR (Average True Range) indicator, combining multi-period analysis and portfolio management capabilities. The strategy tracks the relative position between price and ATR channel to capture trend changes across different timeframes while dynamically managing positions according to user-defined trading quantities. The strategy design balances trend following stability with trading timing flexibility.

#### Strategy Principle
The core logic of the strategy is based on the following key elements:
1. Uses ATR indicator to establish dynamic stop-loss channel, with channel width determined by ATR period and sensitivity parameters
2. Determines buy/sell signals through crossovers between EMA and ATR channel
3. Supports operation across multiple timeframes from 5 minutes to 2 hours
4. Incorporates portfolio tracking mechanism to dynamically adjust buy/sell quantities based on current positions
5. Optional use of Heikin Ashi candles to reduce false signals

#### Strategy Advantages
1. High Adaptability - Dynamically adjusts channel width through ATR to adapt to different market conditions
2. Controlled Risk - Built-in stop-loss mechanism provides dynamic stop-loss levels through ATR channel
3. Operational Flexibility - Supports multi-period analysis, allowing selection of appropriate timeframes for different instruments
4. Position Management - Achieves dynamic position management through portfolio tracking
5. Signal Stability - Optional smoothed candles to reduce noise and improve signal quality

#### Strategy Risks
1. Trend Dependency - May generate frequent trades in ranging markets
2. Lag - Use of moving averages and ATR introduces some signal delay
3. Parameter Sensitivity - Strategy performance heavily influenced by choice of ATR period and sensitivity parameters
4. Money Management - Requires appropriate setting of trade quantities to avoid over-position
5. Market Adaptability - Performance may vary across different market conditions

#### Strategy Optimization Directions
1. Signal Filtering
- Add trend strength confirmation indicators
- Introduce volume analysis
- Consider adding volatility filters

2. Position Management
- Dynamically adjust position size based on volatility
- Implement scaled entry and exit
- Add maximum drawdown control

3. Stop Loss Optimization
- Incorporate support/resistance levels for stop placement
- Implement trailing stops
- Optimize stop distance calculation method

#### Summary
This strategy is a complete trading system combining technical analysis and portfolio management. It provides stable trend following capabilities through ATR dynamic channels and multi-period analysis while considering position management needs in actual trading. Strategy optimization should focus on improving signal quality and enhancing risk control. Further practicality can be achieved through parameter optimization and feature expansion.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-10 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='ADET GİRMELİ Trend İz Süren Stop Strategy', overlay=true, overlay=true,default_qty_type = strategy.fixed, default_qty_value = 1)

// Inputs
a = input(9, title='Key Value. "This changes the sensitivity"')
c = input(3, title='ATR Period')
h = input(false, title='Signals from Heikin Ashi Candles')

xATR = ta.atr(c)
nLoss = a * xATR

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATRTrailingStop)
below = ta.crossover(xATRTrailingStop, ema)

buy = src > xATRTrailingStop and above
sell = src < xATRTrailingStop and below

barbuy = src > xATRTrailingStop
barsell = src < xATRTrailingStop
// Alım ve Satım Sinyalleri
buySignal = src > xATRTrailingStop and above
sellSignal = src < xATRTrailingStop and below

// Kullanıcı girişi
sell_quantity = input.int(1, title="Sell Quantity", minval=1)
buy_quantity = input.int(1, title="Buy Quantity", minval=1)

// Portföy miktarı (örnek simülasyon verisi)
var portfolio_quantity = 0

// Sinyal üretimi (örnek sinyal, gerçek stratejinizle değiştirin)
indicator_signal = (src > xATRTrailingStop and above) ? "buy" : 
                   (src < xATRTrailingStop and below) ? "sell" : "hold"

// Şartlara göre al/sat
if indicator_signal == "buy" and portfolio_quantity < buy_quantity
    strategy.entry("Buy Order", strategy.long, qty=buy_quantity)
    portfolio_quantity := portfolio_quantity + buy_quantity

if indicator_signal == "sell" and portfolio_quantity >= sell_quantity
    strategy.close("Buy Order", qty=sell_quantity)
    portfolio_quantity := portfolio_quantity - sell_quantity
// Plot buy and sell signals
plotshape(buy, title='Buy', text='Buy', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.white, 0), size=size.tiny)
plotshape(sell, title='Sell', text='Sell', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)

// Bar coloring
barcolor(barbuy ? color.rgb(6, 250, 14) : na)
barcolor(barsell ? color.red : na)

// Alerts
alertcondition(buy, 'UT Long', 'UT Long')
alertcondition(sell, 'UT Short', 'UT Short')

// Strategy Entry and Exit
if buy
    strategy.entry('Long', strategy.long)
if sell
    strategy.entry('Short', strategy.short)

// Optional Exit Conditions
if sell
    strategy.close('Long')
if buy
    strategy.close('Short')

// ///TARAMA///


// gurupSec = input.string(defval='1', options=['1', '2', '3', '4', '5','6','7'], group='Taraması yapılacak 40\'arlı gruplardan birini seçin', title='Grup seç')
// per = input.timeframe(defval='', title='PERİYOT',group = "Tarama yapmak istediğiniz periyotu seçin")
// loc = input.int(defval=20, title='Konum Ayarı', minval = -100,maxval = 200 , step = 5,  group='Tablonun konumunu belirleyin')




// func() =>
//     //ÖRNEK BİR FONKSİYON AŞAĞIDA YAZILMIŞTIR. SİZ DE İSTEDİĞİNİZ KOŞULLAR İÇİN TARAMA YAZABİLİRSİNİZ.
//     //rsi = ta.rsi(close,14)
//     //cond = rsi <= 30
//     //[close,cond]

     
//     ////value = ta.cci(close,length23)
//     cond = buySignal or sellSignal
//     [close,cond]


// c1 = input.symbol(title='1', defval='BIST:BRYAT',group = "1. Grup Hisseleri")
// c2 = input.symbol(title='2', defval='BIST:TARKM')
// c3 = input.symbol(title='3', defval='BIST:TNZTP')
// c4 = input.symbol(title='4', defval='BIST:ERBOS')
// c5 = input.symbol(title='5', defval='BIST:BFREN')
// c6 = input.symbol(title='6', defval='BIST:ALARK')
// c7 = input.symbol(title='7', defval='BIST:ISMEN')
// c8 = input.symbol(title='8', defval='BIST:CVKMD')
// c9 = input.symbol(title='9', defval='BIST:TTRAK')
// c10 = input.symbol(title='10', defval='BIST:ASELS')
// c11 = input.symbol(title='11', defval='BIST:ATAKP')
// c12 = input.symbol(title='12', defval='BIST:MGROS')
// c13 = input.symbol(title='13', defval='BIST:BRSAN')
// c14 = input.symbol(title='14', defval='BIST:ALFAS')
// c15 = input.symbol(title='15', defval='BIST:CWENE')
// c16 = input.symbol(title='16', defval='BIST:THYAO')
// c17 = input.symbol(title='17', defval='BIST:EREGL')
// c18 = input.symbol(title='18', defval='BIST:TUPRS')
// c19 = input.symbol(title='19', defval='BIST:YYLGD')
// c20 = input.symbol(title='20', defval='BIST:KLSER')
// c21 = input.symbol(title='21', defval='BIST:MIATK')
// c22 = input.symbol(title='22', defval='BIST:ASTOR')
// c23 = input.symbol(title='23', defval='BIST:DOAS')
// c24 = input.symbol(title='24', defval='BIST:ERCB')
// c25 = input.symbol(title='25', defval='BIST:REEDR')
// c26 = input.symbol(title='26', defval='BIST:DNISI')
// c27 = input.symbol(title='27', defval='BIST:ARZUM')
// c28 = input.symbol(title='28', defval='BIST:EBEBK')
// c29 = input.symbol(title='29', defval='BIST:KLKIM')
// c30 = input.symbol(title='30', defval='BIST:ONCSM')
// c31 = input.symbol(title='31', defval='BIST:SOKE')
// c32 = input.symbol(title='32', defval='BIST:GUBRF')
// c33 = input.symbol(title='33', defval='BIST:KONTR')
// c34 = input.symbol(title='34', defval='BIST:DAPGM')
// c35 = input.symbol(title='35', defval='BIST:BVSAN')
// c36 = input.symbol(title='36', defval='BIST:ODAS')
// c37 = input.symbol(title='37', defval='BIST:OYAKC')
// c38 = input.symbol(title='38', defval='BIST:KRPLS')
// c39 = input.symbol(title='39', defval='BIST:BOBET')






// [v1,s1] = request.security(c1, per, func())
// [v2,s2] = request.security(c2, per, func())
// [v3,s3] = request.security(c3, per, func())
// [v4,s4] = request.security(c4, per, func())
// [v5,s5] = request.security(c5, per, func())
// [v6,s6] = request.security(c6, per, func())
// [v7,s7] = request.security(c7, per, func())
// [v8,s8] = request.security(c8, per, func())
// [v9,s9] = request.security(c9, per, func())
// [v10,s10] = request.security(c10, per, func())
// [v11,s11] = request.security(c11, per, func())
// [v12,s12] = request.security(c12, per, func())
// [v13,s13] = request.security(c13, per, func())
// [v14,s14] = request.security(c14, per, func())
// [v15,s15] = request.security(c15, per, func())
// [v16,s16] = request.security(c16, per, func())
// [v17,s17] = request.security(c17, per, func())
// [v18,s18] = request.security(c18, per, func())
// [v19,s19] = request.security(c19, per, func())
// [v20,s20] = request.security(c20, per, func())
// [v21,s21] = request.security(c21, per, func())
// [v22,s22] = request.security(c22, per, func())
// [v23,s23] = request.security(c23, per, func())
// [v24,s24] = request.security(c24, per, func())
// [v25,s25] = request.security(c25, per, func())
// [v26,s26] = request.security(c26, per, func())
// [v27,s27] = request.security(c27, per, func())
// [v28,s28] = request.security(c28, per, func())
// [v29,s29] = request.security(c29, per, func())
// [v30,s30] = request.security(c30, per, func())
// [v31,s31] = request.security(c31, per, func())
// [v32,s32] = request.security(c32, per, func())
// [v33,s33] = request.security(c33, per, func())
// [v34,s34] = request.security(c34, per, func())
// [v35,s35] = request.security(c35, per, func())
// [v36,s36] = request.security(c36, per, func())
// [v37,s37] = request.security(c37, per, func())
// [v38,s38] = request.security(c38, per, func())
// [v39,s39] = request.security(c39, per, func())


// roundn(x, n) =>
//     mult = 1
//     if n != 0
//         for i = 1 to math.abs(n) by 1
//             mult *= 10
//             mult

//     n >= 0 ? math.round(x * mult) / mult : math.round(x / mult) * mult


// scr_label = 'A/G İZSÜREN\n'
// scr_label := s1 ? scr_label + syminfo.ticker(c1) + ' ' + str.tostring(roundn(v1, 2)) + '\n' : scr_label
// scr_label := s2 ? scr_label + syminfo.ticker(c2) + ' ' + str.tostring(roundn(v2, 2)) + '\n' : scr_label
// scr_label := s3 ? scr_label + syminfo.ticker(c3) + ' ' + str.tostring(roundn(v3, 2)) + '\n' : scr_label
// scr_label := s4 ? scr_label + syminfo.ticker(c4) + ' ' + str.tostring(roundn(v4, 2)) + '\n' : scr_label
// scr_label := s5 ? scr_label + syminfo.ticker(c5) + ' ' + str.tostring(roundn(v5, 2)) + '\n' : scr_label
// scr_label := s6 ? scr_label + syminfo.ticker(c6) + ' ' + str.tostring(roundn(v6, 2)) + '\n' : scr_label
// scr_label := s7 ? scr_label + syminfo.ticker(c7) + ' ' + str.tostring(roundn(v7, 2)) + '\n' : scr_label
// scr_label := s8 ? scr_label + syminfo.ticker(c8) + ' ' + str.tostring(roundn(v8, 2)) + '\n' : scr_label
// scr_label := s9 ? scr_label + syminfo.ticker(c9) + ' ' + str.tostring(roundn(v9, 2)) + '\n' : scr_label
// scr_label := s10 ? scr_label + syminfo.ticker(c10) + ' ' + str.tostring(roundn(v10, 2)) + '\n' : scr_label
// scr_label := s11 ? scr_label + syminfo.ticker(c11) + ' ' + str.tostring(roundn(v11, 2)) + '\n' : scr_label
// scr_label := s12 ? scr_label + syminfo.ticker(c12) + ' ' + str.tostring(roundn(v12, 2)) + '\n' : scr_label
// scr_label := s13 ? scr_label + syminfo.ticker(c13) + ' ' + str.tostring(roundn(v13, 2)) + '\n' : scr_label
// scr_label := s14 ? scr_label + syminfo.ticker(c14) + ' ' + str.tostring(roundn(v14, 2)) + '\n' : scr_label
// scr_label := s15 ? scr_label + syminfo.ticker(c15) + ' ' + str.tostring(roundn(v15, 2)) + '\n' : scr_label
// scr_label := s16 ? scr_label + syminfo.ticker(c16) + ' ' + str.tostring(roundn(v16, 2)) + '\n' : scr_label
// scr_label := s17 ? scr_label + syminfo.ticker(c17) + ' ' + str.tostring(roundn(v17, 2)) + '\n' : scr_label
// scr_label := s18 ? scr_label + syminfo.ticker(c18) + ' ' + str.tostring(roundn(v18, 2)) + '\n' : scr_label
// scr_label := s19 ? scr_label + syminfo.ticker(c19) + ' ' + str.tostring(roundn(v19, 2)) + '\n' : scr_label
// scr_label := s20 ? scr_label + syminfo.ticker(c20) + ' ' + str.tostring(roundn(v20, 2)) + '\n' : scr_label
// scr_label := s21 ? scr_label + syminfo.ticker(c21) + ' ' + str.tostring(roundn(v21, 2)) + '\n' : scr_label
// scr_label := s22 ? scr_label + syminfo.ticker(c22) + ' ' + str.tostring(roundn(v22, 2)) + '\n' : scr_label
// scr_label := s23 ? scr_label + syminfo.ticker(c23) + ' ' + str.tostring(roundn(v23, 2)) + '\n' : scr_label
// scr_label := s24 ? scr_label + syminfo.ticker(c24) + ' ' + str.tostring(roundn(v24, 2)) + '\n' : scr_label
// scr_label := s25 ? scr_label + syminfo.ticker(c25) + ' ' + str.tostring(roundn(v25, 2)) + '\n' : scr_label
// scr_label := s26 ? scr_label + syminfo.ticker(c26) + ' ' + str.tostring(roundn(v26, 2)) + '\n' : scr_label
// scr_label := s27 ? scr_label + syminfo.ticker(c27) + ' ' + str.tostring(roundn(v27, 2)) + '\n' : scr_label
// scr_label := s28 ? scr_label + syminfo.ticker(c28) + ' ' + str.tostring(roundn(v28, 2)) + '\n' : scr_label
// scr_label := s29 ? scr_label + syminfo.ticker(c29) + ' ' + str.tostring(roundn(v29, 2)) + '\n' : scr_label
// scr_label := s30 ? scr_label + syminfo.ticker(c30) + ' ' + str.tostring(roundn(v30, 2)) + '\n' : scr_label
// scr_label := s31 ? scr_label + syminfo.ticker(c31) + ' ' + str.tostring(roundn(v31, 2)) + '\n' : scr_label
// scr_label := s32 ? scr_label + syminfo.ticker(c32) + ' ' + str.tostring(roundn(v32, 2)) + '\n' : scr_label
// scr_label := s33 ? scr_label + syminfo.ticker(c33) + ' ' + str.tostring(roundn(v33, 2)) + '\n' : scr_label
// scr_label := s34 ? scr_label + syminfo.ticker(c34) + ' ' + str.tostring(roundn(v34, 2)) + '\n' : scr_label
// scr_label := s35 ? scr_label + syminfo.ticker(c35) + ' ' + str.tostring(roundn(v35, 2)) + '\n' : scr_label
// scr_label := s36 ? scr_label + syminfo.ticker(c36) + ' ' + str.tostring(roundn(v36, 2)) + '\n' : scr_label
// scr_label := s37 ? scr_label + syminfo.ticker(c37) + ' ' + str.tostring(roundn(v37, 2)) + '\n' : scr_label
// scr_label := s38 ? scr_label + syminfo.ticker(c38) + ' ' + str.tostring(roundn(v38, 2)) + '\n' : scr_label
// scr_label := s39 ? scr_label + syminfo.ticker(c39) + ' ' + str.tostring(roundn(v39, 2)) + '\n' : scr_label


// var panel = table.new(position = position.top_right,columns = 10,rows = 10,bgcolor = color.green,frame_color = color.white,border_color = color.red)



// if barstate.islast
//     table.cell(panel,0,0,text = str.tostring(scr_label))
// //------------------------------------------------------


```

> Detail

https://www.fmz.com/strategy/474865

> Last Modified

2024-12-12 16:00:56
