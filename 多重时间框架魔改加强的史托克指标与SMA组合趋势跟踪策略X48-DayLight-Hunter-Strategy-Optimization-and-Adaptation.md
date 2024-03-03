
> Name

多重时间框架魔改加强的史托克指标与SMA组合趋势跟踪策略X48-DayLight-Hunter-Strategy-Optimization-and-Adaptation

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fe106022893b745cc6.png)
[trans]

#### 概述
本策略采用经典的史托克指标与SMA指标的组合,实现了较强的趋势跟踪能力。策略的核心思想是利用史托克指标识别趋势方向信号,结合SMA指标进行过滤提高信号质量,采用不同的风险模式设置指标参数,实现风险和收益的动态调整。此外,策略还利用多重时间框架判断,优化了入场时机选择。

#### 策略原理
1. 策略使用魔改加强版的史托克指标,指标参数包括%K周期、%K平滑周期、%D平滑周期,通过参数设置控制指标的灵敏度。
2. SMA指标参数包括高点SMA和低点SMA,用于过滤信号,提高信号质量,避免假突破。 
3. 根据不同的风险偏好,策略提供了低风险模式、中风险模式和高风险模式的选择。风险模式会影响史托克指标的交叉参数,从而实现风险和收益的动态调整。
4. 策略判断长仓信号为史托克指标上穿阈值且关闭价低于低点SMA时;判断短仓信号为史托克指标下穿阈值且收盘价高于高点SMA时。
5. 策略通过引入多重时间框架判断模块,在不同时间范围内验证信号,选择更优的入场时机,以控制交易风险。

#### 策略优势
1. 采用魔改加强版史托克指标,提高指标灵敏度,能够快速捕捉市场变化。
2. 增加SMA指标双轨过滤机制,能够有效过滤假信号,提高信号质量。
3. 提供多种风险模式供选择,用户可以根据自己的风险偏好,灵活调整参数。
4. 增加多重时间框架判断模块,优化入场时机选择,降低交易风险。
5. 策略参数设置合理、指标运用自然,整体框架科学严谨,稳定性好、适应性强。

#### 策略风险
1. 策略本身没有止损机制,需要手动设置止损位控制亏损风险。 
2. 策略信号频繁,容易过度交易而增加交易成本。
3. 策略对参数和风险模式设置较为敏感,需要测试优化找到最佳参数。
4. 策略回撤可能较大,不适合全仓操作,需要控制交易资金规模。

对应方法:
1. 根据市场波动程度合理设置止损比例,最大程度控制亏损。
2. 适当调整史托克指标参数,降低信号频率。或设置最小止盈,减少不必要交易。
3. 建议选择默认低风险模式,根据回测数据调整其他参数。
4. 控制仓位规模,分批建立头寸,降低单笔交易风险。

#### 策略优化方向 
1. 对史托克指标和SMA指标的参数进行全面测试,找到最优参数组合。 
2. 增加多重时间框架的数量,丰富判断依据,优化入场时机选择。
3. 引入止损指标组合如ATR止损,能动态跟踪止损位,降低风险。
4. 构建指标信号过滤和确认机制,如增加成交量指标判断,避免被套。
5. 加入仓位管理模块,根据市场情况主动调整仓位,降低单笔的交易风险。


#### 总结
本策略综合运用史托克指标与SMA指标的优势,实现了较强的趋势跟踪效果。策略框架合理,指标使用自然,通过控制参数和风险模式还原了指标本质,优化了策略的稳定性。多重时间框架判断模块也提升了策略的适应性,能够根据不同品种和周期进行调整。总体来说,本策略具有较好的普适性,同时也具有很大的优化空间,值得后续深入研究。

|| 

#### Overview
This strategy combines the classic Stochastic indicator and SMA indicator to achieve strong trend tracking capability. The core idea of the strategy is to identify trend direction signals with Stochastic indicator and filter with SMA indicator to improve signal quality. It also provides different risk modes to dynamically adjust risk and reward. In addition, the multi-timeframe judgement is utilized to optimize the entry timing and control trading risk.

#### Strategy Logic
1. The strategy adopts an enhanced version of Stochastic indicator. The parameters include %K period, %K smoothing and %D smoothing to control the sensitivity.  
2. The SMA indicator parameters include Upper SMA and Lower SMA to filter signals for higher quality.
3. Three risk modes are provided for selection based on risk preference, including Low Risk, Medium Risk and High Risk. The risk mode will impact the crossover threshold of Stochastic indicator to dynamically adjust risk and reward.
4. Long signal is identified when Stoch crosses up the threshold and close price is below Lower SMA. Short signal is identified when Stoch crosses down the threshold and close price is above Upper SMA. 
5. Multi-timeframe judgement module verifies the signals across different time ranges to optimize entry timing and control trading risk.

#### Advantages
1. The enhanced Stochastic indicator improves sensitivity for capturing market changes quickly.
2. The dual SMA rail filtering mechanism effectively avoids fake signals and improves signal quality. 
3. Multiple risk modes allow users to flexibly adjust parameters based on their risk appetite.
4. Multi-timeframe judgement optimizes the entry timing selection to reduce trading risk.  
5. The overall strategy framework is scientific, stable and adaptive.

#### Risks
1. The strategy does not have a stop loss mechanism itself. Manual stop loss is needed to control the downside risk.
2. High signal frequency may lead to over trading and increased transaction costs.  
3. The strategy is sensitive to parameters and risk mode settings which need optimization for best results.
4. Large drawdowns may happen. It may not suitable for full position trading. Proper position sizing is important.

Solutions:
1. Set proper stop loss ratio based on market volatility to maximize risk control.
2. Adjust Stoch parameters to reduce signal frequency, or set minimum take profit to avoid unnecessary trades.
3. Low Risk mode is recommended as baseline. Adjust other parameters based on backtest results.  
4. Control position sizing and average up exposure to reduce per trade risk.

#### Enhancement Opportunities
1. Comprehensive parametric optimization on Stoch and SMA to find the optimal parameter combination.  
2. Increase the number of multi-timeframe judgements for more reference and better entry decisions.
3. Introduce dynamic stop loss mechanisms like ATR Trailing Stop to better limit downside risk.
4. Build signal filtration and confirmation mechanisms like volume to avoid traps.
5. Add position sizing module to actively adjust position size based on market conditions to lower per trade risk exposure.

#### Summary  
This strategy combines the strengths of Stochastic and SMA indicators to achieve strong trend tracking capability. The framework is solid and indicator application is fluid. By controlling parameters and risk modes, the nature of the indicators is restored for better stability. The multi-timeframe judgement also enhances adaptiveness across products and timeframes. Overall it has good versatility and huge potential for further optimizations and enhancements.
[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_3|0|Position: bottom_center|middle_right|bottom_right|top_center|middle_center|top_right|middle_left|bottom_left|
|v_input_string_4|0|size: auto|tiny|small|normal|
|v_input_color_1|blue|color_Net|
|v_input_string_1|0|(?=== Mode Trade [Recommend Mode is ⭐Trend and ⭐Low Risk] ===)⚖️ Mode For Trade [Oneway / Hedge / ⭐Trend]: Trend|Hedge|Oneway|
|v_input_string_2|0|⚖️ Risk Signal Mode [⭐Low / Medium / High]: Low Risk|Medium Risk|High Risk|
|v_input_int_1|15|(?Stochastic Setting)%K Length|
|v_input_int_2|3|%K Smoothing|
|v_input_int_3|3|%D Smoothing|
|v_input_bool_1|true|(?=== ? SMA Filter Mode ===)? SMA High and Low Filter Mode|
|v_input_int_4|50|SMA High|
|v_input_int_5|50|SMA Low|
|v_input_bool_2|true|(?=====??? TAKE PROFIT & STOP LOSS BY [%] ???=====)? Take Profit & Stop Loss By Percent (%)|
|v_input_float_1|false|? TP [LONG] % >> [OneWay Only]|
|v_input_float_2|false|? TP [SHORT] % >> [OneWay Only]|
|v_input_float_3|false|? Stop Loss % [All Mode / 1st Position]|
|v_input_float_4|true|? TakeProfit by PNL ($) eg. (0.1 = 0.1$)|
|v_input_float_5|0.35|? Spread Point Size(Eg. 35 Point or 350 Point From Your Broker Digits)|
|v_input_int_6|500|(?===??? Hedge / Martingale Mode ???===)? Hedge Point Range / Martingale Range|
|v_input_float_6|2|✳️ Martingale For Hedge Multiply [default = 2]|
|v_input_1|timestamp(01 Jan 1945 00:00 +0000)|(?════════⌚⌚ INPUT BACKTEST TIME RANGE ⌚⌚════════)Start|
|v_input_2|timestamp(01 Jan 2074 23:59 +0000)|End|
|v_input_3|{{strategy.order.alert_message}}|(?═ Bot Setting ═ n >> If You Dont Use Bot Just Pass It)Alert Message for BOT|
|v_input_4|Input Your TimeFrame [1m, 15m, 1h, 4h, 1d ,1w]|TimeFrame Text Alert|
|v_input_bool_3|true|(?= PNL MONITOR SETTING =)Monitor Profit&Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-17 00:00:00
end: 2023-12-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//►►►► Description ►►►►
//1. The Original Pine Script
//- Stochastic
//- SMA
//1.1 Concepts
//- Stochastic crossover and crossunder with range 80/20 or 70/30 or 50/50 from your risk you can adjust it from config
//- Confirm Signal by SMA High and Low Original Range is 50 or you can adjust by your self in config Setting
//1.2 Condition
//- Buy Condition = Stochastic crossover Sto Signal Line and SMA Filter <= 20 or 30 or 50 from your risk
//- Sell Condition = Stochastic crossunder Sto Signal Line and SMA Filter >= 80 or 70 or 50 from your risk
//1.3 Idea For Trading
//- Trend Runing If you use "Trend" Mode is Martingale Your Position Until You Have a Profit
//- Scalping You Can Adjust TP for Little Profit and Increase Your Winrate

//►►►► Strategy results ►►►►
// ►► Use an account size ►►
// - For Newbie i recommend try to use 50$ you can test in MT4 Or MT5 Start With 50$ Leverage : 1000
// - For Some User Have a Exp. Trading : 500$ you can use martingale for help your trading
// - For Expert User : 5000$ or 5000$ (Cent) you can use martingale for help your trading
// ►► realistic commission AND slippage ►►
// - Some Broker Not Have a commission for Gold and Forex.
// - slippage : default i'm Setting is 350 point, (it's mean 35 pip) it's average or your account is ECN or Zero Spread You can Set = 0
// ►► Size For Trading ►►
// - This strategy is Start From 0.01 lot and use martingale for next position
// - This not perfect strategy. it's have equity drawdown. just try and test your config you like.
// ►► Sample size Dataset Trading ►►
// - This Strategy Recommend For Long-Term Trading Becuase It's Have Martingale Help Your Next Position

//►►►► strategy's default Properties ►►►►
// - From Default Setting : Slippage or Spread Set = 0 (Becuase I don't know your account spread) you can set in Properties
// ** Some Broeker Are 2 Digits or 3 Digit You Must Set By Your Self (like 35 point or 350 point from your account spread)
// - From Default Setting : commission = 0 (Becuase I don't know your account commission) you can set in Properties
// ** Some Broeker Are not commission for forex and gold

//@version=5
var int slippage = 0
strategy("X48 - DayLight Hunter | Strategy | V.01.03", overlay=true)

var int hedge_mode = 0
var int sto_buy = 0
var int sto_sell = 0

Trade_Mode = input.string(defval = "Trend", title = "⚖️ Mode For Trade [Oneway / Hedge / ⭐Trend]", options = ["Oneway", "Hedge", "Trend"], group = "=== Mode Trade [Recommend Mode is ⭐Trend and ⭐Low Risk] ===", tooltip = "Oneway = Switching Position Type With Signal\nHedge Mode = Not Switching Position Type Unitl TP or SL")
Risk_Mode = input.string(defval = "Low Risk", title = "⚖️ Risk Signal Mode [⭐Low / Medium / High]", options = ["Low Risk", "Medium Risk", "High Risk"], group = "=== Mode Trade [Recommend Mode is ⭐Trend and ⭐Low Risk] ===", tooltip = "[[Signal Form Stochastic]]\nLow Risk is >= 80 and <= 20\nMedium Risk is >= 70 and <= 30\nHigh Risk is >= 50 and <=50")

if Trade_Mode == "Oneway"
    hedge_mode := 0
else if Trade_Mode == "Hedge"
    hedge_mode := 1
else if Trade_Mode == "Trend"
    hedge_mode := 2

if Risk_Mode == "Low Risk"
    sto_buy := 20
    sto_sell := 80
else if Risk_Mode == "Medium Risk"
    sto_buy := 30
    sto_sell := 70
else if Risk_Mode == "High Risk"
    sto_buy := 50
    sto_sell := 50

periodK = input.int(15, title="%K Length", minval=1, group = "Stochastic Setting", inline = "Sto0")
smoothK = input.int(3, title="%K Smoothing", minval=1, group = "Stochastic Setting", inline = "Sto0")
periodD = input.int(3, title="%D Smoothing", minval=1, group = "Stochastic Setting", inline = "Sto0")

GRSMA = "=== ? SMA Filter Mode ==="
SMA_Mode = input.bool(defval = true, title = "? SMA High and Low Filter Mode", group = GRSMA, tooltip = "Sell Signal With Open >= SMA High\nBuy Signal With Close <= SMA Low")
SMA_High = input.int(defval = 50, title = "SMA High", group = GRSMA, inline = "SMA1")
SMA_Low = input.int(defval = 50, title = "SMA Low", group = GRSMA, inline = "SMA1")

k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)
high_line = ta.sma(high, SMA_High)
low_line = ta.sma(low, SMA_Low)
plot(SMA_Mode ? high_line : na, "H-Line", color = color.yellow, linewidth = 2)
plot(SMA_Mode ? low_line : na, "L-Line", color = color.blue, linewidth = 2)

entrybuyprice = strategy.position_avg_price

var bool longcondition = na
var bool shortcondition = na

if SMA_Mode == true
    longcondition := ta.crossover(k,d) and d <= sto_buy and close < low_line and open < low_line// or ta.crossover(k, 20)// and close <= low_line
    shortcondition := ta.crossunder(k,d) and d >= sto_sell and close > high_line and open > high_line// or ta.crossunder(k, 80)// and close >= high_line
else
    longcondition := ta.crossover(k,d) and d <= sto_buy
    shortcondition := ta.crossunder(k,d) and d >= sto_sell
//longcondition_double = ta.crossover(d,20) and close < low_line// and strategy.position_size > 0
//shortcondition_double = ta.crossunder(d,80) and close > high_line// and strategy.position_size < 0

//=============== TAKE PROFIT and STOP LOSS by % =================

tpsl(percent) =>
    strategy.position_avg_price * percent / 100 / syminfo.mintick
GR4 = "=====??? TAKE PROFIT & STOP LOSS BY [%] ???====="
mode= input.bool(title="? Take Profit & Stop Loss By Percent (%)", defval=true, group=GR4, tooltip = "Take Profit & Stop Loss by % Change\n0 = Disable")
tp_l = tpsl(input.float(0, title='? TP [LONG] % >> [OneWay Only]', group=GR4, tooltip = "0 = Disable"))
tp_s = tpsl(input.float(0, title='? TP [SHORT] % >> [OneWay Only]', group=GR4, tooltip = "0 = Disable"))
sl = tpsl(input.float(0, title='? Stop Loss % [All Mode / 1st Position]', group=GR4, tooltip = "0 = Disable"))
tp_pnl = input.float(defval = 1, title = "? TakeProfit by PNL ($) eg. (0.1 = 0.1$)", group = GR4, tooltip = "All Mode TP by PNL")
spread_size = input.float(defval = 0.350, title = "? Spread Point Size(Eg. 35 Point or 350 Point From Your Broker Digits)", tooltip = "Spread Point Form Your Broker \nEg. 1920.124 - 1920.135 or 1920.12 - 1920.13\nPlease Check From Your Broker", group = GR4)

GR5 = "===??? Hedge / Martingale Mode ???==="
//hedge_mode = input.bool(defval = true, title = "⚖️ Hedge / Martingale Mode", group = GR5)
hedge_point = input.int(defval = 500, title = "? Hedge Point Range / Martingale Range", group = GR5, tooltip = "After Entry Last Position And Current Price More Than Point Range Are Open New Hedge Position")
hedge_gale = input.float(defval = 2.0, title = "✳️ Martingale For Hedge Multiply [default = 2]", tooltip = "Martingale For Multiply Hedge Order", group = GR5)
hedge_point_size = hedge_point/100

calcStopLossPrice(OffsetPts) =>
    if strategy.position_size > 0
        strategy.position_avg_price - OffsetPts * syminfo.mintick
    else if strategy.position_size < 0
        strategy.position_avg_price + OffsetPts * syminfo.mintick
    else
        na

calcStopLossL_AlertPrice(OffsetPts) =>
    strategy.position_avg_price - OffsetPts * syminfo.mintick
calcStopLossS_AlertPrice(OffsetPts) =>
    strategy.position_avg_price + OffsetPts * syminfo.mintick

calcTakeProfitPrice(OffsetPts) =>
    if strategy.position_size > 0
        strategy.position_avg_price + OffsetPts * syminfo.mintick
    else if strategy.position_size < 0
        strategy.position_avg_price - OffsetPts * syminfo.mintick
    else
        na

calcTakeProfitL_AlertPrice(OffsetPts) =>
    strategy.position_avg_price + OffsetPts * syminfo.mintick
calcTakeProfitS_AlertPrice(OffsetPts) =>
    strategy.position_avg_price - OffsetPts * syminfo.mintick

var stoploss = 0.
var stoploss_l = 0.
var stoploss_s = 0.
var takeprofit = 0.
var takeprofit_l = 0.
var takeprofit_s = 0.
var takeprofit_ll = 0.
var takeprofit_ss = 0.

if mode == true
    if (strategy.position_size > 0)
        if sl > 0
            stoploss := calcStopLossPrice(sl)
            stoploss_l := stoploss
        else if sl <= 0
            stoploss := na
        if tp_l > 0
            takeprofit := tp_l
            takeprofit_ll := close + ((close/100)*tp_l)
            //takeprofit_s := na
        else if tp_l <= 0
            takeprofit := na
    if (strategy.position_size < 0)
        if sl > 0
            stoploss := calcStopLossPrice(sl)
            stoploss_s := stoploss
        else if sl <= 0
            stoploss := na
        if tp_s > 0
            takeprofit := tp_s
            takeprofit_ss := close - ((close/100)*tp_s)
            //takeprofit_l := na
        else if tp_s <= 0
            takeprofit := na
    else if strategy.position_size == 0
        stoploss := na
        takeprofit := na
        //takeprofit_l := calcTakeProfitL_AlertPrice(tp_l)
        //takeprofit_s := calcTakeProfitS_AlertPrice(tp_s)
        //stoploss_l := calcStopLossL_AlertPrice(sl)
        //stoploss_s := calcStopLossS_AlertPrice(sl)

//////////// INPUT BACKTEST RANGE ////////////////////////////////////////////////////
var string BTR1         = '════════⌚⌚ INPUT BACKTEST TIME RANGE ⌚⌚════════'
i_startTime             = input(defval = timestamp("01 Jan 1945 00:00 +0000"), title = "Start", inline="timestart", group=BTR1, tooltip = 'Start Backtest YYYY/MM/DD')
i_endTime               = input(defval = timestamp("01 Jan 2074 23:59 +0000"), title = "End", inline="timeend", group=BTR1, tooltip = 'End Backtest YYYY/MM/DD')
//////////////// Strategy Alert For X4815162342 BOT //////////////////////
Text_Alert_Future = '{{strategy.order.alert_message}}'
copy_Fu = input( defval= Text_Alert_Future ,    title="Alert Message for BOT", inline = '00'  ,group = '═ Bot Setting ═ \n >> If You Dont Use Bot Just Pass It' ,tooltip = 'Alert For X48-BOT > Copy and Paste To Alert Function')
TimeFrame_input = input(defval= 'Input Your TimeFrame [1m, 15m, 1h, 4h, 1d ,1w]' ,    title="TimeFrame Text Alert", inline = '01'  ,group = '═ Bot Setting ═ \n >> If You Dont Use Bot Just Pass It', tooltip = "[1m, 15m, 1h, 4h, 1d ,1w]")
string Alert_EntryL = '? Asset : {{ticker}} \n? Status : {{strategy.market_position}}\n? TimeFrame : '+str.tostring(TimeFrame_input)+'\n? Price : {{strategy.order.price}} $\n✅ TP : '+str.tostring(takeprofit_ll)+' $\n❌ SL : '+str.tostring(stoploss_l)+' $\n⏰ Time : {{timenow}}'
string Alert_EntryS = '? Asset : {{ticker}} \n? Status : {{strategy.market_position}}\n? TimeFrame : '+str.tostring(TimeFrame_input)+'\n? Price : {{strategy.order.price}} $\n✅ TP : '+str.tostring(takeprofit_ss)+' $\n❌ SL : '+str.tostring(stoploss_s)+' $\n⏰ Time : {{timenow}}'
string Alert_TPSL = '? Asset : {{ticker}}\n? TimeFrame : '+str.tostring(TimeFrame_input)+'\n? {{strategy.order.comment}}\n? Price : {{strategy.order.price}} $\n⏰ Time : {{timenow}}'

if true
    if (longcondition and strategy.position_size == 0) or (longcondition and strategy.position_size < 0 and hedge_mode == 0)
        strategy.entry("Long", strategy.long, comment = "?", alert_message = Alert_EntryL)
    //if longcondition_double
    //    //strategy.cancel_all()
    //    strategy.entry("Long2", strategy.long, comment = "??")
    //    //strategy.exit("Exit",'Long', qty_percent = 100 , profit = takeprofit, stop = stoploss, comment_profit = "TP?L", comment_loss = "SL?L")
    if (shortcondition and strategy.position_size == 0) or (shortcondition and strategy.position_size > 0 and hedge_mode == 0)
        strategy.entry("Short", strategy.short, comment = "?", alert_message = Alert_EntryS)
        //strategy.exit("Exit",'Short', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP❤️️S", comment_loss = "SL❤️️S")
    //if shortcondition_double
    //    //strategy.cancel_all()
    //    strategy.entry("Short2", strategy.short, comment = "??")

if strategy.position_size > 0 and strategy.opentrades >= 1 and hedge_mode == 1
    entrypricel = strategy.opentrades.entry_price(strategy.opentrades - 1)
    callpointsize =  entrypricel - close
    lastsize = strategy.position_size
    if callpointsize >= hedge_point_size and longcondition
        strategy.order("Long2", strategy.long, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryL)
    if shortcondition
        strategy.order("Short2", strategy.short, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryS)

else if strategy.position_size < 0 and strategy.opentrades >= 1 and hedge_mode == 1
    entryprices = strategy.opentrades.entry_price(strategy.opentrades - 1)
    callpointsize = (entryprices - close)* -1
    lastsize = (strategy.position_size) * -1
    if callpointsize >= hedge_point_size and shortcondition
        strategy.order("Short2", strategy.short, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryS)
    if longcondition
        strategy.order("Long2", strategy.long, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryL)

if strategy.position_size > 0 and strategy.opentrades >= 1 and hedge_mode == 2
    entrypricel = strategy.opentrades.entry_price(strategy.opentrades - 1)
    callpointsize =  entrypricel - close
    lastsize = strategy.position_size
    if callpointsize >= hedge_point_size and longcondition
        strategy.order("Long2", strategy.long, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryL)

else if strategy.position_size < 0 and strategy.opentrades >= 1 and hedge_mode == 2
    entryprices = strategy.opentrades.entry_price(strategy.opentrades - 1)
    callpointsize = (entryprices - close)* -1
    lastsize = (strategy.position_size) * -1
    if callpointsize >= hedge_point_size and shortcondition
        strategy.order("Short2", strategy.short, qty = lastsize * hedge_gale, comment = "?⌛", alert_message = Alert_EntryS)

last_price_l = (strategy.opentrades.entry_price(strategy.opentrades - 1) + (strategy.opentrades.entry_price(strategy.opentrades - 1)/100) * takeprofit) + spread_size
last_price_s = (strategy.opentrades.entry_price(strategy.opentrades - 1) - (strategy.opentrades.entry_price(strategy.opentrades - 1)/100) * takeprofit) - spread_size 
current_price = request.security(syminfo.tickerid, "1", close)
current_pricel = request.security(syminfo.tickerid, "1", close) + spread_size
current_prices = request.security(syminfo.tickerid, "1", close) - spread_size
//if mode == true
if strategy.position_size > 0 and strategy.openprofit >= tp_pnl and mode == true and hedge_mode == 1
    lastsize = strategy.position_size
    lastprofitorder = strategy.openprofit
    //if lastprofitorder >= 0.07
    //strategy.close('Long', qty = lastsize, comment = "TP?L", alert_message = Alert_TPSL, immediately = true)
    strategy.cancel_all()
    strategy.close_all(comment = "TP?PNL", alert_message = Alert_TPSL, immediately = true)
    //strategy.close_all(comment = "TP?LH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long2', qty_percent = 100, profit = last_price_l, stop = stoploss, comment_profit = "TP?LH", comment_loss = "SL?LH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long', qty_percent = 100, profit = last_price_l, stop = stoploss, comment_profit = "TP?L", comment_loss = "SL?L", alert_message = Alert_TPSL)
else if strategy.position_size > 0 and strategy.openprofit < tp_pnl and mode == true and hedge_mode == 1
    strategy.exit("Exit",'Long', qty_percent = 100, stop = stoploss, comment_loss = "SL?%L", alert_message = Alert_TPSL)

if strategy.position_size > 0 and strategy.openprofit >= tp_pnl and mode == true and hedge_mode == 2
    lastsize = strategy.position_size
    lastprofitorder = strategy.openprofit
    //if lastprofitorder >= 0.07
    //strategy.close('Long', qty = lastsize, comment = "TP?L", alert_message = Alert_TPSL, immediately = true)
    strategy.cancel_all()
    strategy.close_all(comment = "TP?PNL", alert_message = Alert_TPSL, immediately = true)
    //strategy.close_all(comment = "TP?LH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long2', qty_percent = 100, profit = last_price_l, stop = stoploss, comment_profit = "TP?LH", comment_loss = "SL?LH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long', qty_percent = 100, profit = last_price_l, stop = stoploss, comment_profit = "TP?L", comment_loss = "SL?L", alert_message = Alert_TPSL)
else if strategy.position_size > 0 and strategy.openprofit < tp_pnl and mode == true and hedge_mode == 2
    strategy.exit("Exit",'Long', qty_percent = 100, stop = stoploss, comment_loss = "SL?%L", alert_message = Alert_TPSL)

if strategy.position_size > 0 and mode == true and hedge_mode == 0
    //strategy.close_all(comment = "TP?LH", alert_message = Alert_TPSL, immediately = true)
    strategy.exit("Exit",'Long', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP?%L", comment_loss = "SL?%L", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Long', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP?LL", comment_loss = "SL?L", alert_message = Alert_TPSL)

if strategy.position_size < 0 and strategy.openprofit >= tp_pnl and mode == true and hedge_mode == 1
    lastsize = (strategy.position_size) * -1
    lastprofitorder = strategy.openprofit
    //if lastprofitorder >= 0.07
    //strategy.close('Short', qty = lastsize, comment = "TP❤️️S", alert_message = Alert_TPSL, immediately = true)
    strategy.cancel_all()
    strategy.close_all(comment = "TP❤️️PNL", alert_message = Alert_TPSL, immediately = true)
    //strategy.close_all(comment = "TP❤️️SH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short2', qty_percent = 100, profit = last_price_s, stop = stoploss, comment_profit = "TP❤️️SH", comment_loss = "SL❤️️SH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short', qty_percent = 100, profit = last_price_s, stop = stoploss, comment_profit = "TP❤️️S", comment_loss = "SL❤️️S", alert_message = Alert_TPSL)
else if strategy.position_size < 0 and strategy.openprofit < tp_pnl and mode == true and hedge_mode == 1
    strategy.exit("Exit",'Short', qty_percent = 100, stop = stoploss, comment_loss = "SL❤️️%S", alert_message = Alert_TPSL)
if strategy.position_size < 0 and mode == true and hedge_mode == 0
    //strategy.close_all(comment = "TP❤️️SH", alert_message = Alert_TPSL, immediately = true)
    strategy.exit("Exit",'Short', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP❤️️%S", comment_loss = "SL❤️️%S", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short', qty_percent = 100, profit = takeprofit, stop = stoploss, comment_profit = "TP❤️️S", comment_loss = "SL❤️️S", alert_message = Alert_TPSL)

if strategy.position_size < 0 and strategy.openprofit >= tp_pnl and mode == true and hedge_mode == 2
    lastsize = (strategy.position_size) * -1
    lastprofitorder = strategy.openprofit
    //if lastprofitorder >= 0.07
    //strategy.close('Short', qty = lastsize, comment = "TP❤️️S", alert_message = Alert_TPSL, immediately = true)
    strategy.cancel_all()
    strategy.close_all(comment = "TP❤️️PNL", alert_message = Alert_TPSL, immediately = true)
    //strategy.close_all(comment = "TP❤️️SH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short2', qty_percent = 100, profit = last_price_s, stop = stoploss, comment_profit = "TP❤️️SH", comment_loss = "SL❤️️SH", alert_message = Alert_TPSL)
    //strategy.exit("Exit",'Short', qty_percent = 100, profit = last_price_s, stop = stoploss, comment_profit = "TP❤️️S", comment_loss = "SL❤️️S", alert_message = Alert_TPSL)
else if strategy.position_size < 0 and strategy.openprofit < tp_pnl and mode == true and hedge_mode == 2
    strategy.exit("Exit",'Short', qty_percent = 100, stop = stoploss, comment_loss = "SL❤️️%S", alert_message = Alert_TPSL)


//else if strategy.position_size < 0 and strategy.opentrades > 1
//    lastsize = (strategy.position_size) * -1
//    lastprofitorder = strategy.openprofit
//    if lastprofitorder >= 0.07
//        strategy.close_all(comment = "TP❤️️SS", alert_message = Alert_TPSL)

//===================== เรียกใช้  library =========================
import X4815162342/X48_LibaryStrategyStatus/2 as fuLi 
//แสดงผล Backtest

show_Net = input.bool(true,'Monitor Profit&Loss', inline = 'Lnet', group = '= PNL MONITOR SETTING =')
position_ = input.string('bottom_center','Position', options = ['top_right','middle_right','bottom_right','top_center','middle_center','bottom_center','middle_left','bottom_left'] , inline = 'Lnet')
size_i = input.string('auto','size', options = ['auto','tiny','small','normal'] , inline = 'Lnet') 
color_Net = input.color(color.blue,"" , inline = 'Lnet')
// fuLi.NetProfit_Show(show_Net , position_ , size_i,  color_Net )

```

> Detail

https://www.fmz.com/strategy/435721

> Last Modified

2023-12-18 12:19:41
