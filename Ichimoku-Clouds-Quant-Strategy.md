
> Name

Ichimoku-Clouds-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/153b14ed8bc9c5ea17a.png)

## Overview

This strategy is based on the Ichimoku Clouds indicator, combining the Tenkan line, Kijun line, leading line and cloud charts to identify trading signals and automate trading. It integrates both the standard Ichimoku model and the customization functionality of the TradingView strategy tester, suitable for both novice and experienced traders.  

## Strategy Logic

The strategy utilizes the standard Ichimoku model, including the Tenkan line, Kijun line, leading line, Senkou A and Senkou B. It identifies trading signals by comparing crosses between these lines.  

Specifically, a bullish signal is generated when the Tenkan line crosses above the Kijun line, and a bearish signal when the Tenkan crosses below. Additionally, the relative position of the crossing Tenkan line to the cloud charts is checked to categorize the signals as strong, neutral or weak. For example, if the Tenkan is above both Senkou lines during the cross, it is a strong bullish signal.

The strategy provides extensive customization parameters for users to freely combine entry and exit signals to build their own trading systems.  

## Advantages

1. Combines the advanced technical analysis of Ichimoku with the customizability of TradingView strategy tester  
2. Provides various parameter settings for different trading styles
3. Real-time visualized cloud charts for clear trend identification  
4. Parameters can be optimized through backtesting for better performance  

## Risks

1. Ichimoku models tend to generate false signals, needs confirmation from candlesticks  
2. Too many parameter options, easy to confuse novice traders
3. Cloud charts have lagging nature, not ideal for chasing surges  
4. Backtest ≠ live performance, remain cautious when live trading

## Enhancement Opportunities

1. Optimize parameters to find best combination
2. Add filters with other indicators to screen false signals
3. Incorporate stop loss/profit taking to control risk per trade
4. Consider impacts of products, timeframes etc.  
5. Real-trade validation and parameter tuning  

## Conclusion  

As a new generation of technical analysis tools, Ichimoku combined with TradingView's visualization and strategy development capabilities provides powerful support for quant trading. This strategy fully utilizes both to build an automated trading system. Despite needing further enhancements, it has already demonstrated great application potential. With continuous improvements in parameter tuning and functionality expansion, it is likely to become one of the mainstream quant strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|yourBotSourceUuid|(?Trading Bot Settings)sourceUuid:|
|v_input_string_2|yourBotSecretToken|secretToken:|
|v_input_1|timestamp(2023-01-01T00:00:00)|(?Trading Period Settings)Trade Start Date/Time|
|v_input_2|timestamp(2025-01-01T00:00:00)|Trade Stop Date/Time|
|v_input_string_3|0|(?Trading Mode Settings)Trading Mode: Long|Short|
|v_input_string_4|0|(?Long Mode Signals - set up if Trading Mode: Long)Select Entry Signal (Long): Bullish All|Bullish Strong|Bullish Neutral|Bullish Weak|Bullish Strong and Neutral|Bullish Neutral and Weak|Bullish Strong and Weak|None|
|v_input_string_5|0|Select Exit Signal (Long): Bearish Weak|Bearish Strong|Bearish Neutral|None|Bearish Strong and Neutral|Bearish Neutral and Weak|Bearish Strong and Weak|Bearish All|
|v_input_string_6|0|(?Short Mode Signals - set up if Trading Mode: Short)Select Entry Signal (Short): None|Bearish Strong|Bearish Neutral|Bearish Weak|Bearish Strong and Neutral|Bearish Neutral and Weak|Bearish Strong and Weak|Bearish All|
|v_input_string_7|0|Select Exit Signal (Short): None|Bullish Strong|Bullish Neutral|Bullish Weak|Bullish Strong and Neutral|Bullish Neutral and Weak|Bullish Strong and Weak|Bullish All|
|v_input_float_1|false|(?Risk Management)Take Profit, % (0 - disabled)|
|v_input_float_2|false|Stop Loss, % (0 - disabled)|
|v_input_int_1|9|(?Indicator Settings)Tenkan|
|v_input_int_2|26|Kijun|
|v_input_int_3|52|Chikou|
|v_input_int_4|26|Offset|
|v_input_3|false|(?Display Settings)Show Tenkan Line|
|v_input_4|false|Show Kijun Line|
|v_input_5|true|Show Senkou A Line|
|v_input_6|true|Show Senkou B Line|
|v_input_7|false|Show Chikou Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-25 00:00:00
end: 2024-01-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

//  -----------------------------------------------------------------------------
//  Copyright © 2024 Skyrex, LLC. All rights reserved.
//  -----------------------------------------------------------------------------

//  Version: v2.1
//  Release:  Jan 22, 2024

strategy(title = "Advanced Ichimoku Clouds Strategy Long and Short", 
         shorttitle = "Ichimoku Strategy Long and Short", 
         overlay = true, 
         format = format.inherit, 
         pyramiding = 1, 
         calc_on_order_fills = false, 
         calc_on_every_tick = true, 
         default_qty_type = strategy.percent_of_equity, 
         default_qty_value = 100, 
         initial_capital = 10000, 
         currency = currency.NONE,  
         commission_type = strategy.commission.percent, 
         commission_value = 0.1,
         slippage = 5)

// Trading bot settings
sourceUuid = input.string(title = "sourceUuid:", defval = "yourBotSourceUuid", group = "Trading Bot Settings")
secretToken = input.string(title = "secretToken:", defval = "yourBotSecretToken", group = "Trading Bot Settings")

// Trading Period Settings
lookBackPeriodStart = input(title = "Trade Start Date/Time", defval = timestamp('2023-01-01T00:00:00'), group = "Trading Period Settings")
lookBackPeriodStop = input(title = "Trade Stop Date/Time", defval = timestamp('2025-01-01T00:00:00'), group = "Trading Period Settings")

// Trading Mode settings
tradingMode = input.string("Long", "Trading Mode", options = ["Long", "Short"], group = "Trading Mode Settings")

// Long Mode Signal Options
entrySignalOptionsLong = input.string("Bullish All", "Select Entry Signal (Long)", options = ["None", "Bullish Strong", "Bullish Neutral", "Bullish Weak", "Bullish Strong and Neutral", "Bullish Neutral and Weak", "Bullish Strong and Weak", "Bullish All"], group = "Long Mode Signals - set up if Trading Mode: Long")
exitSignalOptionsLong = input.string("Bearish Weak", "Select Exit Signal (Long)", options = ["None", "Bearish Strong", "Bearish Neutral", "Bearish Weak", "Bearish Strong and Neutral", "Bearish Neutral and Weak", "Bearish Strong and Weak", "Bearish All"], group = "Long Mode Signals - set up if Trading Mode: Long")

// Short Mode Signal Options
entrySignalOptionsShort = input.string("None", "Select Entry Signal (Short)", options = ["None", "Bearish Strong", "Bearish Neutral", "Bearish Weak", "Bearish Strong and Neutral", "Bearish Neutral and Weak", "Bearish Strong and Weak", "Bearish All"], group = "Short Mode Signals - set up if Trading Mode: Short")
exitSignalOptionsShort = input.string("None", "Select Exit Signal (Short)", options = ["None", "Bullish Strong", "Bullish Neutral", "Bullish Weak", "Bullish Strong and Neutral", "Bullish Neutral and Weak", "Bullish Strong and Weak", "Bullish All"], group = "Short Mode Signals - set up if Trading Mode: Short")

// Risk Management Settings
takeProfitPct = input.float(0, "Take Profit, % (0 - disabled)", minval = 0, step = 0.1, group = "Risk Management")
stopLossPct = input.float(0, "Stop Loss, % (0 - disabled)", minval = 0, step = 0.1, group = "Risk Management")

// Indicator Settings
tenkanPeriods = input.int(9, "Tenkan", minval=1, group="Indicator Settings")
kijunPeriods = input.int(26, "Kijun", minval=1, group="Indicator Settings")
chikouPeriods = input.int(52, "Chikou", minval=1, group="Indicator Settings")
displacement = input.int(26, "Offset", minval=1, group="Indicator Settings")

// Display Settings
showTenkan = input(false, "Show Tenkan Line", group = "Display Settings")
showKijun = input(false, "Show Kijun Line", group = "Display Settings")
showSenkouA = input(true, "Show Senkou A Line", group = "Display Settings")
showSenkouB = input(true, "Show Senkou B Line", group = "Display Settings")
showChikou = input(false, "Show Chikou Line", group = "Display Settings")

// Function to convert percentage to price points based on entry price
pctToPoints(pct) => 
    strategy.position_avg_price * pct / 100

// Colors and Transparency Level
transparencyLevel = 90
colorGreen = color.new(#36a336, 23)
colorRed = color.new(#d82727, 47)
colorTenkanViolet = color.new(#9400D3, 0)
colorKijun = color.new(#fdd8a0, 0)
colorLime = color.new(#006400, 0)
colorMaroon = color.new(#8b0000, 0)
colorGreenTransparent = color.new(colorGreen, transparencyLevel)
colorRedTransparent = color.new(colorRed, transparencyLevel)

// Ichimoku Calculations
donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
tenkan = donchian(tenkanPeriods)
kijun = donchian(kijunPeriods)
senkouA = math.avg(tenkan, kijun)
senkouB = donchian(chikouPeriods)
displacedSenkouA = senkouA[displacement - 1]
displacedSenkouB = senkouB[displacement - 1]

// Plot Ichimoku Lines
plot(showTenkan ? tenkan : na, color=colorTenkanViolet, title = "Tenkan", linewidth=2)
plot(showKijun ? kijun : na, color=colorKijun, title = "Kijun", linewidth=2)
plot(showChikou ? close : na, offset=-displacement, color = colorLime, title = "Chikou", linewidth=1)
p1 = plot(showSenkouA ? senkouA : na, offset=displacement - 1, color=colorGreen, title = "Senkou A", linewidth=2)
p2 = plot(showSenkouB ? senkouB : na, offset=displacement - 1, color=colorRed, title = "Senkou B", linewidth=2)
fill(p1, p2, color=senkouA > senkouB ? colorGreenTransparent : colorRedTransparent)

// Signal Calculations
bullishSignal = ta.crossover(tenkan, kijun)
bearishSignal = ta.crossunder(tenkan, kijun)
bullishSignalValues = bullishSignal ? tenkan : na
bearishSignalValues = bearishSignal ? tenkan : na

strongBullishSignal = bullishSignalValues > displacedSenkouA and bullishSignalValues > displacedSenkouB
neutralBullishSignal = ((bullishSignalValues > displacedSenkouA and bullishSignalValues < displacedSenkouB) or (bullishSignalValues < displacedSenkouA and bullishSignalValues > displacedSenkouB))
weakBullishSignal = bullishSignalValues < displacedSenkouA and bullishSignalValues < displacedSenkouB

strongBearishSignal = bearishSignalValues < displacedSenkouA and bearishSignalValues < displacedSenkouB
neutralBearishSignal = ((bearishSignalValues > displacedSenkouA and bearishSignalValues < displacedSenkouB) or (bearishSignalValues < displacedSenkouA and bearishSignalValues > displacedSenkouB))
weakBearishSignal = bearishSignalValues > displacedSenkouA and bearishSignalValues > displacedSenkouB

// Functions to determine entry and exit conditions for Long and Short
isEntrySignalLong() =>
    entryCondition = false
    if entrySignalOptionsLong == "None"
        entryCondition := false
    else if entrySignalOptionsLong == "Bullish Strong"
        entryCondition := strongBullishSignal
    else if entrySignalOptionsLong == "Bullish Neutral"
        entryCondition := neutralBullishSignal
    else if entrySignalOptionsLong == "Bullish Weak"
        entryCondition := weakBullishSignal
    else if entrySignalOptionsLong == "Bullish Strong and Neutral"
        entryCondition := strongBullishSignal or neutralBullishSignal
    else if entrySignalOptionsLong == "Bullish Neutral and Weak"
        entryCondition := neutralBullishSignal or weakBullishSignal
    else if entrySignalOptionsLong == "Bullish Strong and Weak"
        entryCondition := strongBullishSignal or weakBullishSignal
    else if entrySignalOptionsLong == "Bullish All"
        entryCondition := strongBullishSignal or neutralBullishSignal or weakBullishSignal
    entryCondition

isExitSignalLong() =>
    exitCondition = false
    if exitSignalOptionsLong == "None"
        exitCondition := false
    else if exitSignalOptionsLong == "Bearish Strong"
        exitCondition := strongBearishSignal
    else if exitSignalOptionsLong == "Bearish Neutral"
        exitCondition := neutralBearishSignal
    else if exitSignalOptionsLong == "Bearish Weak"
        exitCondition := weakBearishSignal
    else if exitSignalOptionsLong == "Bearish Strong and Neutral"
        exitCondition := strongBearishSignal or neutralBearishSignal
    else if exitSignalOptionsLong == "Bearish Neutral and Weak"
        exitCondition := neutralBearishSignal or weakBearishSignal
    else if exitSignalOptionsLong == "Bearish Strong and Weak"
        exitCondition := strongBearishSignal or weakBearishSignal
    else if exitSignalOptionsLong == "Bearish All"
        exitCondition := strongBearishSignal or neutralBearishSignal or weakBearishSignal
    exitCondition

isEntrySignalShort() =>
    entryCondition = false
    if entrySignalOptionsShort == "None"
        entryCondition := false
    else if entrySignalOptionsShort == "Bearish Strong"
        entryCondition := strongBearishSignal
    else if entrySignalOptionsShort == "Bearish Neutral"
        entryCondition := neutralBearishSignal
    else if entrySignalOptionsShort == "Bearish Weak"
        entryCondition := weakBearishSignal
    else if entrySignalOptionsShort == "Bearish Strong and Neutral"
        entryCondition := strongBearishSignal or neutralBearishSignal
    else if entrySignalOptionsShort == "Bearish Neutral and Weak"
        entryCondition := neutralBearishSignal or weakBearishSignal
    else if entrySignalOptionsShort == "Bearish Strong and Weak"
        entryCondition := strongBearishSignal or weakBearishSignal
    else if entrySignalOptionsShort == "Bearish All"
        entryCondition := strongBearishSignal or neutralBearishSignal or weakBearishSignal
    entryCondition

isExitSignalShort() =>
    exitCondition = false
    if exitSignalOptionsShort == "None"
        exitCondition := false
    else if exitSignalOptionsShort == "Bullish Strong"
        exitCondition := strongBullishSignal
    else if exitSignalOptionsShort == "Bullish Neutral"
        exitCondition := neutralBullishSignal
    else if exitSignalOptionsShort == "Bullish Weak"
        exitCondition := weakBullishSignal
    else if exitSignalOptionsShort == "Bullish Strong and Neutral"
        exitCondition := strongBullishSignal or neutralBullishSignal
    else if exitSignalOptionsShort == "Bullish Neutral and Weak"
        exitCondition := neutralBullishSignal or weakBullishSignal
    else if exitSignalOptionsShort == "Bullish Strong and Weak"
        exitCondition := strongBullishSignal or weakBullishSignal
    else if exitSignalOptionsShort == "Bullish All"
        exitCondition := strongBullishSignal or neutralBullishSignal or weakBullishSignal
    exitCondition

// Strategy logic for entries and exits
if true
    if tradingMode == "Long"
        takeProfitLevelLong = strategy.position_avg_price * (1 + takeProfitPct / 100)
        stopLossLevelLong = strategy.position_avg_price * (1 - stopLossPct / 100)

        if isEntrySignalLong()
            strategy.entry(id = "entry1", direction = strategy.long, alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "entry1",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '"\n}')
        if (takeProfitPct > 0 and close >= takeProfitLevelLong) or (stopLossPct > 0 and close <= stopLossLevelLong) or (exitSignalOptionsLong != "None" and isExitSignalLong())
            strategy.close(id = "entry1", alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "close",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '"\n}')

    else if tradingMode == "Short"
        takeProfitLevelShort = strategy.position_avg_price * (1 - takeProfitPct / 100)
        stopLossLevelShort = strategy.position_avg_price * (1 + stopLossPct / 100)

        if isEntrySignalShort()
            strategy.entry(id = "entry1", direction = strategy.short, alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "entry1",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '"\n}')
        if (takeProfitPct > 0 and close <= takeProfitLevelShort) or (stopLossPct > 0 and close >= stopLossLevelShort) or (exitSignalOptionsShort != "None" and isExitSignalShort())
            strategy.close(id = "entry1", alert_message = '{\n"base": "' + syminfo.basecurrency + '",\n"quote": "' + syminfo.currency + '",\n"position": "close",\n"price": "' + str.tostring(close) + '",\n"sourceUuid": "' + sourceUuid + '",\n"secretToken": "' + secretToken + '"\n}')
            
```

> Detail

https://www.fmz.com/strategy/440712

> Last Modified

2024-02-01 14:25:49
