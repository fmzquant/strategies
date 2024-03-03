
> Name

基于-SAR-的趋势追踪型量化策略Speculation-Gulf-Trend-Follow-Strategy-Based-on-SAR

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1656a3a9b0db00011d3.png)
[trans]

## 概述

投机鸿沟策略是一个追踪趋势的量化交易策略,它使用 SAR 平滑曲线作为主要的交易信号,辅以 EMA、挤压动量和波动性震荡器等多种过滤器,通过配置 SAR 参数来识别趋势反转点,实现低风险趋势跟踪。这是一个非常适合中长线投资的策略。

## 策略原理

该策略使用抛物线 SAR 作为主要的交易信号指标。SAR 能够有效判断价格趋势的反转点,当 SAR 符号发生改变时,意味着趋势发生转折。此策略一般在 SAR 翻转时发出买入或卖出信号。

另外,策略还提供了 SAR 突破选项。也就是在 SAR 尚未完全翻转之前,价格已经突破最后一个 SAR 值的情况下产生信号。这可以进一步追求策略的灵敏度。 

为了过滤假信号,该策略还引入了 EMA、挤压动量和波动性震荡器三个辅助过滤器,可单独使用也可组合使用,用以确认价格趋势和交易信号的可靠性。

最后,策略提供了固定止损、固定止盈和风险回报比例止损等三种止损止盈方式。这使得策略可以灵活适应不同类型交易品种的特点。

## 优势分析

1. SAR 能够准确判断价格趋势反转,并能及时捕捉新的价格趋势,适合中长线趋势追踪。

2. 多重过滤器设置降低了假突破的概率,提高信号可靠性。

3. 配置简单灵活,可自定义参数以适应不同交易品种。

4. 提供多种止盈止损方式,可以追求风险回报的平衡。

5. 可直接连接交易机器人,实现自动化交易。

## 风险分析

1. 在非趋势性市场下,可能出现增多的假信号和无效交易。

2. SAR 参数设置不当也会影响信号判断的准确性。

3. 作为趋势跟踪策略,大幅震荡市场中容易达到止损线。

针对以上风险,可适当调整 SAR 参数或过滤器参数,降低无效交易的概率。也可以适当放宽止损限制,以承受更大的行情波动。

## 优化方向  

1. SAR 参数优化。可以通过历史回测数据优化 SAR 的步长和增量参数,获得更稳定和高效的交易策略。

2. 引入趋势判断指标。为策略添加 MACD、DMI 等辅助判断指标,提高对趋势的判断能力。

3. 优化风险回报比。调整固定止盈止损百分比和风险回报比率参数,适当承担更高风险以获取更高收益。

4. 添加外汇品种。目前策略只支持数字货币交易,可以扩展支持外汇、商品和证券市场品种。

## 总结  

投机鸿沟是一个非常实用的追踪趋势型量化策略。它响应灵敏,信号判断可靠,通过止损止盈管理可以获取长期稳定收益。适当的参数和规则优化可以进一步提高策略的效率。这是一个值得长期使用的高效量化策略。

|| 

## Overview  

The Speculation Gulf strategy is a quantitative trading strategy that tracks trends. It uses the SAR Parabolic curve as the main trading signal, with additional EMA, Squeeze Momentum and Volatility Oscillator filters to identify trend reversal points with SAR parameters, and achieve low-risk trend tracking. This strategy is well suited for medium-to-long term investing.  

## Strategy Logic  

The strategy uses Parabolic SAR as the primary trading signal indicator. SAR can effectively determine price trend reversal points. When the SAR sign changes, it means the trend has reversed. This strategy generally generates buy or sell signals when the SAR flips.

In addition, the strategy also provides a SAR breakout option - generating signals when the price breaks through the last SAR value before SAR fully flips. This further improves the sensitivity of the strategy.

To filter false signals, the strategy also introduces EMA, Squeeze Momentum and Volatility Oscillator as three auxiliary filters, which can be used alone or in combination to confirm the reliability of price trends and trading signals.  

Finally, the strategy provides three types of stop loss methods - fixed stop loss, fixed take profit and risk reward ratio stop loss. This allows the strategy to flexibly adapt to the characteristics of different types of trading instruments.

## Advantage Analysis  

1. SAR can accurately determine price trend reversals and timely capture new price trends, suitable for medium and long term trend tracking.  

2. Multiple filters reduce the probability of false breakouts and improve signal reliability.  

3. Simple and flexible configuration, customizable parameters to suit different trading instruments.  

4. Provides multiple types of take profit and stop loss to balance risk and reward.  

5. Can directly connect to trading bots for automated trading.

## Risk Analysis   

1. In non-trending markets, there may be increased occurrences of false signals and ineffective trades.  

2. Improper SAR parameter settings also affect the accuracy of signal judgments.

3. As a trend following strategy, significant fluctuations in the market can easily hit the stop loss line.  

To address the above risks, appropriately adjust the SAR parameters or filter parameters to reduce the probability of invalid trades. Stop loss limits can also be moderately relaxed to withstand greater market fluctuations.  

## Optimization Directions   

1. SAR Parameter Optimization. Optimize the SAR increment and step parameters through historical backtest data to obtain a more stable and efficient trading strategy.  

2. Introduce Trend Judgment Indicators. Add auxiliary trend judgment indicators like MACD and DMI to improve trend judgment capabilities.   

3. Optimize risk-return ratio. Adjust fixed stop loss percentage and risk-return ratio to take on higher risks for higher returns.

4. Support more instruments. Currently only crypto is supported, can be extended to support Forex, commodity and securities trading instruments.   

## Conclusion   

The Speculation Gulf strategy is a very practical trend following quantitative strategy. It has responsive signals, reliable judgments and can achieve long-term steady returns through stop loss management. With appropriate parameter and rules optimization, the efficiency of the strategy can be further improved. This is an efficient quantitative strategy worth using long term.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Time Filters)Start date|
|v_input_1|timestamp(01 Jan 2022 00:00 UTC)|initialDate|
|v_input_bool_2|true|End date|
|v_input_2|timestamp(31 Dec 2029 23:59 UTC)|finalDate|
|v_input_float_1|0.02|(?SAR PARABOLIC =========================================)Start|
|v_input_float_2|0.02|Increment|
|v_input_float_3|0.2|Maximo|
|v_input_string_1|0|(?SAR TRADE SIGNAL ====================================== )SAR Trade Signal: SAR Flip|SAR Breakout|
|v_input_int_1|4|Bars|
|v_input_bool_8|false|Show Breakout Point|
|v_input_bool_3|true|(?Moving Average ========================================)Moving Average Filter|
|v_input_string_2|0|Type: Ema|Sma|
|v_input_source_1_close|0|  Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|100|Length|
|v_input_bool_4|true|(?VOLATILITY OSCILLATOR =================================)Volatility Oscillator Filter|
|v_input_int_3|100|Volatility Oscillator|
|v_input_bool_5|true|(?SQUEEZE MOMENTUM =====================================)Squeeze Momentum Filter|
|v_input_int_4|20|Bollinger Bands Length|
|v_input_float_4|2|Boliinger Bands Mult|
|v_input_int_5|20|Keltner Channel Length|
|v_input_float_5|1.5|Keltner Channel Mult|
|v_input_3|true|Use TrueRange (KC)|
|v_input_string_3|0|(?Take Profit ==================================================)Take Profit and Stop Loss: SAR Flip|Fixed % TP/SL|Risk Reward TP/SL|
|v_input_float_6|1.5|Fixed TP %|
|v_input_float_7|true|Fixed Long SL %|
|v_input_float_8|true|Risk Reward TP|
|v_input_bool_6|false|Show RR Stop Loss|
|v_input_bool_7|false|(?Traling Profit ===============================================)Enable Trailing|
|v_input_float_9|0.1|Trailing Take Profit Deviation %|
|v_input_string_4||(?Alert Message For Bot =========================================)Strategy Entry Message|
|v_input_string_5||Strategy Exit Message|
|v_input_string_6||Strategy Close Message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-23 00:00:00
end: 2023-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//VERSION =================================================================================================================
//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// This strategy is intended to study.
// It can also be used to signal a bot to open a deal by providing the Bot ID, email token and trading pair in the strategy settings screen.
// As currently written, this strategy uses a SAR PARABOLIC to send signal, and EMA, Squeeze Momentum, Volatility Oscilator as filter.
// There are two enter point, when SAR Flips, or Breakout Point - the last SAR Value before it Flips.
// There are tree options for exit: SAR Flips, Fixed Stop Loss ande Fixed Take Profit in % and Risk Reward tha can be set, 0.5/1, 1/1, 1/2 etc.
//Autor M4TR1X_BR

//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//STRATEGY ================================================================================================================

strategy(title = 'BT-SAR Ema, Squeeze, Voltatility',
         shorttitle = 'SAR ESV',
         overlay = true)


//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// INPUTS =================================================================================================================

// TIME INPUTS
usefromDate = input.bool(defval = true, title = 'Start date', inline = '0', group = "Time Filters")
initialDate = input(defval = timestamp('01 Jan 2022 00:00 UTC'), title = '', inline = "0",group = 'Time Filters',tooltip="This start date is in the time zone of the exchange ")
usetoDate = input.bool(defval = true, title = 'End date', inline = '1', group = "Time Filters")
finalDate = input(defval = timestamp('31 Dec 2029 23:59 UTC'), title = '', inline = "1",group = 'Time Filters',tooltip="This end date is in the time zone of the exchange")

// TIME LOGIC 
inTradeWindow = true


// SAR PARABOLIC INPUTS ==================================================================================================
string sargroup=  "SAR PARABOLIC ========================================="
start = input.float(defval=0.02,title='Start',inline='',group = sargroup)
increment = input.float(defval=0.02,title='Increment',inline='',group = sargroup)
maximum = input.float(defval=0.2,title='Maximo',inline='',group = sargroup)

// SAR PARABOLIC LOGIC 
out = ta.sar(start, increment, maximum)


// SAR FLIP OR BREAKOUT OPTIONS
string bkgroup ='SAR TRADE SIGNAL ====================================== '
sarTradeSignal =input.string(defval='SAR Flip',title='SAR Trade Signal', options= ['SAR Flip','SAR Breakout'],group=bkgroup, tooltip='SAR Flip: Once the parabolic SAR flips it will send a signal, SAR Breakout: Will wait the price cross last Sar Value before it flips.')
nBars = input.int(defval=4,title='Bars',group=bkgroup, tooltip ='Define the number of bars for a entry when the price cross breakout point')

float sarBreakoutPoint= ta.valuewhen((close[1] < out[1])  and (close > out),out[1],0)   //Get Sar Breakout Point
bool check = (close[1] < out[1])  and (close > out)                                     //Verify when sar flips
bool BreakoutPrice = sarTradeSignal=='SAR Breakout'? (ta.barssince(check) < nBars) and ((open < sarBreakoutPoint) and (close > sarBreakoutPoint)): (ta.barssince(check) < nBars) and (close > out)
barcolor (check? color.yellow:na,title="Signal Bar color" )


// MOVING AVERAGES INPUTS ================================================================================================
string magroup =  "Moving Average ========================================"
useEma = input.bool(defval = true, title = 'Moving Average Filter',inline='', group= magroup,tooltip='This will enable or disable Exponential Moving Average Filter on Strategy')
emaType=input.string (defval='Ema',title='Type',options=['Ema','Sma'],inline='', group= magroup)
emaSource = input.source(defval=close,title="  Source",inline="", group= magroup)
emaLength = input.int(defval=100,title="Length",minval=0,inline='', group= magroup)

// MOVING AVERAGE LOGIC
float ema = emaType=='Ema'? ta.ema(emaSource,emaLength): ta.sma(emaSource,emaLength)


// VOLATILITY OSCILLATOR =================================================================================================
string vogroup =  "VOLATILITY OSCILLATOR ================================="
useVltFilter=input.bool(defval=true,title="Volatility Oscillator Filter",inline='',group= vogroup,tooltip='This will enable or disable Volatility Oscillator filter on Strategy')
vltFilterLength = input.int(defval=100,title="Volatility Oscillator",inline='',group=vogroup)
vltFilterSpike = close - open
vltFilterX = ta.stdev(vltFilterSpike,vltFilterLength)
vltFilterY = ta.stdev(vltFilterSpike,vltFilterLength) * -1


// SQUEEZE MOMENTUM INPUTS ==============================================================================================
string sqzgroup = "SQUEEZE MOMENTUM =====================================" 
useSqzFilter=input.bool(defval=true,title="Squeeze Momentum Filter",inline='',group= sqzgroup, tooltip='This will enable or disable Squeeze Momentum filter on Strategy')
sqzFilterlength = input.int(defval=20, title='Bollinger Bands Length',inline='',group= sqzgroup)
sqzFiltermult = input.float(defval=2.0, title='Boliinger Bands Mult',inline='',group= sqzgroup)
keltnerLength = input.int(defval=20, title='Keltner Channel Length',inline='',group= sqzgroup)
keltnerMult = input.float(defval=1.5, title='Keltner Channel Mult',inline='',group= sqzgroup)
useTrueRange = input(true, title='Use TrueRange (KC)', inline='',group= sqzgroup)


// CALCULATE BOLLINGER BANDS
sqzFilterSrc = close
basis = ta.sma(sqzFilterSrc, sqzFilterlength)
dev = keltnerMult * ta.stdev(sqzFilterSrc, sqzFilterlength)
upperBB = basis + dev
lowerBB = basis - dev

// CALCULATE KELTNER CHANNEL 
sma = ta.sma(sqzFilterSrc, keltnerLength)
range_1 = useTrueRange ? ta.tr : high - low
rangema = ta.sma(range_1, keltnerLength)
upperKC = sma + rangema * keltnerMult
lowerKC = sma - rangema * keltnerMult


// CHECK IF BOLLINGER BANDS IS IN OR OUT OF KELTNER CHANNEL
sqzOn = lowerBB > lowerKC and upperBB < upperKC
sqzOff = lowerBB < lowerKC and upperBB > upperKC
noSqz = sqzOn == false and sqzOff == false

// SQUEEZE MOMENTUM LOGIC
val = ta.linreg(sqzFilterSrc - math.avg(math.avg(ta.highest(high, keltnerLength), ta.lowest(low, keltnerLength)),ta.sma(close, keltnerLength)), keltnerLength, 0)


// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// TAKE PROFIT STOP LOSS INPUTS =========================================================================================

string tkpgroup='Take Profit =================================================='
tpType = input.string(defval = 'SAR Flip', title='Take Profit and Stop Loss', options=['SAR Flip','Fixed % TP/SL', 'Risk Reward TP/SL'], group=tkpgroup )
longTakeProfitPerc = input.float(defval = 1.5, title = 'Fixed TP %', minval = 0.05, step = 0.5, group=tkpgroup, tooltip = 'The percentage increase to set the take profit price target.')/100

longLossPerc = input.float(defval=1.0, title="Fixed Long SL %", minval=0.1, step=0.5, group = tkpgroup, tooltip = 'The percentage increase to set the Long Stop Loss price target.') * 0.01
//shortLossPerc = input.float(defval=1.5, title="Fixed Short SL (%)", minval=0.1, step=0.5, group = tkpgroup, tooltip = 'The percentage increase to set the Short Stop Loss price target.') * 0.01

longTakeProfitRR = input.float(defval = 1, title = 'Risk Reward TP', minval = 0.25, step = 0.25, group=tkpgroup, tooltip = 'The Risk Reward parameter.')
var plotStopLossRR = input.bool(defval=false, title='Show RR Stop Loss', group=tkpgroup)
//enableStopLossRR = input.bool(defval = false, title = 'Enable Risk Reward TP',group=tkpgroup, tooltip = 'Enable Variable Stop Loss.')

string trpgroup='Traling Profit ==============================================='
enableTrailing = input.bool(defval = false, title = 'Enable Trailing',group=trpgroup, tooltip = 'Enable or disable the trailing for take profit.')
trailingTakeProfitDeviationPerc = input.float(defval = 0.1, title = 'Trailing Take Profit Deviation %', minval = 0.01, maxval = 100, step = 0.01, group=trpgroup, tooltip = 'The step to follow the price when the take profit limit is reached.') / 100


// BOT MESSAGES
string msgroup='Alert Message For Bot ========================================='
messageEntry = input.string("", title="Strategy Entry Message",group=msgroup)
messageExit  =input.string("",title="Strategy Exit Message",group=msgroup)
messageClose = input.string("", title="Strategy Close Message",group=msgroup)

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// POSITIONS =============================================================================================================

//VERIFY IF THE BUY FILTERS ARE ON OR OFF 
bool emaFilterBuy = useEma? (close > ema):(close >= ema) or (close <= ema)                      
bool volatilityFilterBuy = useVltFilter? (vltFilterSpike > vltFilterX) : (vltFilterSpike >= 0) or (vltFilterSpike <= 0)                  
bool sqzFilterBuy = useSqzFilter? (val > val[1]): (val >= val[1] or val <=val[1])                                      
bool sarflip = (close > out)


//LONG / SHORT POSITIONS LOGIC
//Var 'check' will verify if the SAR flips and if the exit price occurs it will limit in bars number a new entry on the same signal.
bool limitEntryNumbers = (ta.barssince(check) < nBars) 
bool openLongPosition =   sarTradeSignal == 'SAR Flip'? (sarflip and emaFilterBuy and volatilityFilterBuy and sqzFilterBuy and limitEntryNumbers) :sarTradeSignal=='SAR Breakout'? (BreakoutPrice and emaFilterBuy and volatilityFilterBuy and sqzFilterBuy): na
bool openShortPosition = na
bool closeLongPosition= tpType=='SAR Flip'? (close < out):na
bool closeShortPosition=na


// CHEK OPEN POSITONS =====================================================================================================
// open signal when not already into a position
bool validOpenLongPosition = openLongPosition and strategy.opentrades.size(strategy.opentrades - 1) <= 0
bool longIsActive = validOpenLongPosition or strategy.opentrades.size(strategy.opentrades - 1) > 0


// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// TAKE PROFIT STOP LOSS CONFIG ==========================================================================================

// FIXED TAKE PROFIT IN %

float posSize = strategy.opentrades.entry_price(strategy.opentrades - 1) //Get the entry price

var float longTakeProfitPrice = na
longTakeProfitPrice := if (longIsActive)
    if (openLongPosition and not (strategy.opentrades.size(strategy.opentrades - 1) > 0))
        posSize * (1 + longTakeProfitPerc)
    else
        nz(longTakeProfitPrice[1], close * (1 + longTakeProfitPerc))
else
    na

longTrailingTakeProfitStepTicks = longTakeProfitPrice * trailingTakeProfitDeviationPerc / syminfo.mintick

// FIXED STOP LOSS IN %
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
//shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)


// TAKE PROFIT BY RISK/REWARD
// Set stop loss
tta = not (strategy.opentrades.size(strategy.opentrades - 1) > 0)
float lastb = ta.valuewhen(check and tta,ta.lowest(low,5),0) - (10 * syminfo.mintick)

// TAKE PROFIT CALCULATION
float stopLossRisk = (posSize - lastb)
float takeProfitRR = posSize + (longTakeProfitRR * stopLossRisk)


// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// POSITION ORDERS =====================================================================================================

// LOGIC ===============================================================================================================
// getting into LONG position
if (openLongPosition) and (inTradeWindow)
    strategy.entry(id = 'Long Entry', direction = strategy.long, alert_message=messageEntry)

//submit exit orders for trailing take profit price 
if (longIsActive) and (inTradeWindow)
    strategy.exit(id = 'Long Take Profit', from_entry = 'Long Entry', limit = enableTrailing ? na : tpType=='Fixed % TP/SL'? longTakeProfitPrice: tpType == 'Risk Reward TP/SL'? takeProfitRR:na, trail_price = enableTrailing ? longTakeProfitPrice : na, trail_offset = enableTrailing ? longTrailingTakeProfitStepTicks : na, stop = tpType =='Fixed % TP/SL' ? longStopPrice: tpType == 'Risk Reward TP/SL'? lastb:na) //, alert_message='{  "action": "close_at_market_price",  "message_type": "bot",  "bot_id": 9330698,  "email_token": "392265bc-84eb-4a54-a99c-758383ff9449",  "delay_seconds": 0,"pair":"USDT_{{ticker}}" }')

if (closeLongPosition)
    strategy.close(id = 'Long Entry', alert_message='{  "action": "close_at_market_price",  "message_type": "bot",  "bot_id": 9330698,  "email_token": "392265bc-84eb-4a54-a99c-758383ff9449",  "delay_seconds": 0,"pair":"USDT_{{ticker}}" }')
                                                   

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// PLOTS ===============================================================================================================

// TRADE WINDOW ========================================================================================================
bgcolor(color = inTradeWindow ? color.new(#089981,90):na, title = 'Time Window')


// SAR PARABOLIC
var sarColor = color.new(#00bcd4,0)
plot(out, "ParabolicSAR", color=sarColor, linewidth=1,style=plot.style_cross)


//BREAKOUT LINE
var plotBkPoint = input.bool(defval=false, title='Show Breakout Point', group=bkgroup)
plot(series = (sarTradeSignal=='SAR Breakout' and plotBkPoint == true)? sarBreakoutPoint:na, title = 'Breakout line', color =color.new(#ffeb3b,50) , linewidth = 1, style = plot.style_linebr, offset = 0)


// EMA/SMA 
var emafilterColor = color.new(color.white, 0)
plot(series=useEma? ema:na, title = 'EMA Filter', color = emafilterColor, linewidth = 2, style = plot.style_line)


// ENTRY PRICE
var posColor = color.new(#2962ff, 0)
plot(series = strategy.opentrades.entry_price(strategy.opentrades - 1), title = 'Position', color = posColor, linewidth = 1, style = plot.style_linebr,offset=0)


// FIXED TAKE PROFIT 
var takeProfitColor = color.new(#ba68c8, 0)
plot(series = tpType=='Fixed % TP/SL'? longTakeProfitPrice:na, title = 'Fixed TP', color = takeProfitColor, linewidth = 1, style = plot.style_linebr, offset = 0)


// FIXED STOP LOSS
var stopLossColor = color.new(#ff0000, 0)
plot(series = tpType=='Fixed % TP/SL' ? longStopPrice:na, title = 'Fixed SL', color = stopLossColor, linewidth = 1, style = plot.style_linebr, offset = 0)


// RISK REWARD TAKE PROFIT
var takeProfitRRColor = color.new(#ba68c8, 0)
plot(series=tpType == 'Risk Reward TP/SL'? takeProfitRR:na,title='Risk Reward TP',color=takeProfitRRColor,linewidth=1,style=plot.style_linebr)

// STOP LOSS RISK REWARD
plot(series = (check and plotStopLossRR)? lastb:na, title = 'Last Bottom', color =color.new(#ff0000,0), linewidth = 2, style = plot.style_linebr, offset = 0)


// ======================================================================================================================










```

> Detail

https://www.fmz.com/strategy/433017

> Last Modified

2023-11-23 16:26:17
