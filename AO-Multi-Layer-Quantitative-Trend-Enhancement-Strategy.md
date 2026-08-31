
> Name

AO-Multi-Layer-Quantitative-Trend-Enhancement-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a369652f535f12c112.png)


#### Overview
This strategy is a multi-layer trading system based on momentum and trend following. It combines Williams Alligator, Williams Fractals, Awesome Oscillator (AO), and Exponential Moving Average (EMA) to identify high-probability long opportunities. The strategy employs a layered capital deployment mechanism, gradually increasing positions as trends strengthen, with the capability to hold up to 5 positions simultaneously, each using 10% of capital.

#### Strategy Principles
The strategy utilizes multiple filtering mechanisms to ensure trading direction accuracy. First, it uses EMA for long-term trend judgment, seeking long opportunities only when price is above EMA. Second, it judges short-term trends through the combination of Williams Alligator and Fractals, confirming an uptrend when an up fractal breakout occurs above the Alligator's teeth line. Finally, after trend confirmation, the strategy looks for AO indicator's "saucer" long signals for specific entry timing. The system uses only 10% of capital per trade and can open up to 5 long positions as the trend strengthens. When the fractal and Alligator combination indicates trend reversal, all positions are closed.

#### Strategy Advantages
1. Multi-layer filtering mechanism effectively reduces false signals
2. Scientific capital management with progressive position building
3. Trend-following characteristics enable capturing major trends
4. No fixed stop-loss, using technical indicators for dynamic trend end determination
5. System has good configurability for different market conditions
6. Backtesting shows good profit factor and average returns

#### Strategy Risks
1. May generate consecutive false signals in ranging markets
2. Potential significant drawdowns during trend reversals
3. Multiple filtering conditions might miss some trading opportunities
4. In capital management, consecutive position building may bring risks during volatile periods
5. EMA parameter selection significantly impacts strategy performance

To reduce these risks, it's recommended to:
- Optimize parameters for different market environments
- Consider adding volatility filters
- Establish stricter position building conditions
- Set maximum drawdown limits

#### Strategy Optimization Directions
1. Introduce ATR indicator for volatility filtering
2. Add volume analysis to improve signal reliability
3. Develop dynamic parameter adaptation mechanism
4. Perfect profit-taking mechanism for timely exits when trends weaken
5. Add market state recognition module for different parameter sets in different market environments

#### Summary
This is a well-designed trend-following strategy that achieves good returns while maintaining safety through the combination of multiple technical indicators. The strategy's innovation lies in its multi-layer trend confirmation mechanism and progressive capital management method. While there are areas for optimization, it is overall a trading system worth trying.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-04 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Skyrexio

//@version=6
//_______ <licence>
strategy(title = "MultiLayer Awesome Oscillator Saucer Strategy [Skyrexio]", 
         shorttitle = "AO Saucer", 
         overlay = true, 
         format = format.inherit, 
         pyramiding = 5, 
         calc_on_order_fills = false, 
         calc_on_every_tick = false, 
         default_qty_type = strategy.percent_of_equity, 
         default_qty_value = 10, 
         initial_capital = 10000, 
         currency = currency.NONE,  
         commission_type = strategy.commission.percent, 
         commission_value = 0.1,
         slippage = 5,
         use_bar_magnifier = true)


//_______ <constant_declarations>
var const color skyrexGreen               = color.new(#2ECD99, 0)
var const color skyrexGray                = color.new(#F2F2F2, 0)
var const color skyrexWhite               = color.new(#FFFFFF, 0)


//________<variables declarations>
var int trend                             = 0
var float upFractalLevel                  = na
var float upFractalActivationLevel        = na
var float downFractalLevel                = na
var float downFractalActivationLevel      = na
var float saucerActivationLevel           = na
bool highCrossesUpfractalLevel            = ta.crossover(high, upFractalActivationLevel)
bool lowCrossesDownFractalLevel           = ta.crossunder(low, downFractalActivationLevel)
var int signalsQtyInRow                   = 0


//_______ <inputs>
// Trading bot settings
sourceUuid               = input.string(title = "sourceUuid:", defval = "yourBotSourceUuid", group = "?Trading Bot Settings?")
secretToken              = input.string(title = "secretToken:", defval = "yourBotSecretToken", group = "?Trading Bot Settings?")


// Trading period settings
lookBackPeriodStart      = input(title = "Trade Start Date/Time", defval = timestamp('2023-01-01T00:00:00'), group = "?Trading Period Settings?")
lookBackPeriodStop       = input(title = "Trade Stop Date/Time", defval = timestamp('2025-01-01T00:00:00'), group = "?Trading Period Settings?")


// Strategy settings
EMaLength                = input.int(100, minval = 10, step = 10, title = "EMA Length", group = "?Strategy settings?")


//_______ <function_declarations>
//@function       Used to calculate Simple moving average for Alligator
//@param src      Sourse for smma Calculations
//@param length   Number of bars to calculate smma
//@returns        The calculated smma value 
smma(src, length) =>
    var float smma = na
    sma_value = ta.sma(src, length)
    smma := na(smma) ? sma_value : (smma * (length - 1) + src) / length
    smma

//_______ <calculations>


//Upfractal calculation 
upFractalPrice = ta.pivothigh(2, 2)
upFractal = not na(upFractalPrice) 


//Downfractal calculation 
downFractalPrice = ta.pivotlow(2, 2)
downFractal = not na(downFractalPrice)


//Calculating Alligator's teeth 
teeth = smma(hl2, 8)[5]


//Calculating upfractal and downfractal levels
if upFractal 
    upFractalLevel := upFractalPrice
else
    upFractalLevel := upFractalLevel[1]


if downFractal
    downFractalLevel := downFractalPrice
else
    downFractalLevel := downFractalLevel[1]


//Calculating upfractal activation level, downfractal activation level to approximate the trend and this current trend 
if upFractalLevel > teeth
    upFractalActivationLevel := upFractalLevel

if highCrossesUpfractalLevel
    trend := 1
    upFractalActivationLevel := na 
    downFractalActivationLevel := downFractalLevel


if downFractalLevel < teeth
    downFractalActivationLevel := downFractalLevel

if lowCrossesDownFractalLevel
    trend := -1
    downFractalActivationLevel := na 
    upFractalActivationLevel := upFractalLevel


if trend == 1
    upFractalActivationLevel := na

if trend == -1
    downFractalActivationLevel := na


//Calculating filter EMA 
filterEMA = ta.ema(close, EMaLength)


//Сalculating AO saucer signal
ao = ta.sma(hl2,5) - ta.sma(hl2,34)
diff = ao - ao[1]
saucerSignal = ao > ao[1] and ao[1] < ao[2] and ao > 0 and ao[1] > 0 and ao[2] > 0 and trend == 1 and close > filterEMA


//Calculating sauser activation level
if saucerSignal
    saucerActivationLevel := high    
else 
    saucerActivationLevel := saucerActivationLevel[1]


if not na(saucerActivationLevel[1]) and high < saucerActivationLevel[1] and diff > 0
    saucerActivationLevel := high
    saucerSignal := true
    

if (high > saucerActivationLevel[1] and not na(saucerActivationLevel)) or diff < 0
    saucerActivationLevel := na 


//Calculating number of valid saucer signal in current trading cycle 
if saucerSignal and not saucerSignal[1]
    signalsQtyInRow := signalsQtyInRow + 1


if not na(saucerActivationLevel[1]) and diff < 0 and na(saucerActivationLevel) and not (strategy.opentrades[1] <= strategy.opentrades - 1)
    signalsQtyInRow := signalsQtyInRow - 1


if trend == -1 and trend[1] == 1 
    signalsQtyInRow := 0


//_______ <strategy_calls>
//Defining trade close condition
closeCondition =  trend[1] == 1 and trend == -1


//Cancel stop buy order if current Awesome oscillator column lower, than prevoius 
if diff < 0 
    strategy.cancel_all()

//Strategy entry
if (signalsQtyInRow == 1 and not na(saucerActivationLevel)) 
    strategy.entry(id = "entry1", direction = strategy.long, stop = saucerActivationLevel + syminfo.mintick,  alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "entry1",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '",\n"timestamp": "' + str.tostring(timenow) + '"\n}')

if (signalsQtyInRow == 2 and not na(saucerActivationLevel)) 
    strategy.entry(id = "entry2", direction = strategy.long, stop = saucerActivationLevel + syminfo.mintick,  alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "entry2",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '",\n"timestamp": "' + str.tostring(timenow) + '"\n}')

if (signalsQtyInRow == 3 and not na(saucerActivationLevel)) 
    strategy.entry(id = "entry3", direction = strategy.long, stop = saucerActivationLevel + syminfo.mintick,  alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "entry3",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '",\n"timestamp": "' + str.tostring(timenow) + '"\n}')

if (signalsQtyInRow == 4 and not na(saucerActivationLevel)) 
    strategy.entry(id = "entry4", direction = strategy.long, stop = saucerActivationLevel + syminfo.mintick,  alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "entry4",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '",\n"timestamp": "' + str.tostring(timenow) + '"\n}')

if (signalsQtyInRow == 5 and not na(saucerActivationLevel)) 
    strategy.entry(id = "entry5", direction = strategy.long, stop = saucerActivationLevel + syminfo.mintick,  alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "entry5",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '",\n"timestamp": "' + str.tostring(timenow) + '"\n}')

//Strategy exit 
if (closeCondition)
    strategy.close_all(alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "close",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '",\n"timestamp": "' + str.tostring(timenow) + '"\n}')


//_______ <visuals>
//Plotting shapes for adding to current long trades
gradPercent = if strategy.opentrades == 2
    90
else if strategy.opentrades == 3
    80
else if strategy.opentrades == 4
    70
else if strategy.opentrades == 5
    60

pricePlot = plot(close, title="Price", color=color.new(color.blue, 100))
teethPlot = plot(strategy.opentrades > 1 ? teeth : na, title="Teeth", color= skyrexGreen, style=plot.style_linebr, linewidth = 2)
fill(pricePlot, teethPlot, color = color.new(skyrexGreen, gradPercent))
if strategy.opentrades != 1 and  strategy.opentrades[1] == strategy.opentrades - 1
    label.new(bar_index, teeth, style = label.style_label_up, color = color.lime, size = size.tiny, text="Buy More", textcolor = color.black, text_formatting = text.format_bold)


//_______ <alerts>

```

> Detail

https://www.fmz.com/strategy/474035

> Last Modified

2024-12-05 15:01:48
