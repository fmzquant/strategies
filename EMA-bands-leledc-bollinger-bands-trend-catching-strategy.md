
> Name

EMA-bands-leledc-bollinger-bands-trend-catching-strategy

> Author

ChaoZhang

> Strategy Description

The basics:
In its simplest form, this strategy is a positional trend following strategy which enters long when price breaks out above "middle" EMA bands and closes or flips short when price breaks down below "middle" EMA bands. The top and bottom of the middle EMA bands are calculated from the EMA of candle highs and lows, respectively.

The idea is that entering trades on breakouts of the high EMAs and low EMAs rather than the typical EMA based on candle closes gives a bit more confirmation of trend strength and minimizes getting chopped up. To further reduce getting chopped up, the strategy defaults to close on crossing the opposite EMA band ( ie . long on break above high EMA middle band and close below low EMA middle band).

This strategy works on all markets on all timeframes, but as a trend following strategy it works best on markets prone to trending such as crypto and tech stocks. On lower timeframes, longer EMAs tend to work best (I've found good results on EMA lengths even has high up to 1000), while 4H charts and above tend to work better with EMA lengths 21 and below.

As an added filter to confirm the trend, a second EMA can be used. Inputting a slower EMA filter can ensure trades are entered in accordance with longer term trends, inputting a faster EMA filter can act as confirmation of breakout strength.

Bar coloring can be enabled to quickly visually identify a trend's direction for confluence with other indicators or strategies.


The goods:
Waiting for the trend to flip before closing a trade (especially when a longer base EMA is used) often leaves money on the table. This script combines a number of ways to identify when a trend is exhausted for backtesting the best early exits.

"Delayed bars inside middle bands" - When a number of candle's in a row open and close between the middle EMA bands, it could be a sign the trend is weak, or that the breakout was not the start of a new trend. Selecting this will close out positions after a number of bars has passed

"Leledc bars" - Originally introduced by glaz, this is a price action indicator that highlights a candle after a number of bars in a row close the same direction and result in greatest high/low over a period. It often triggers when a strong trend has paused before further continuation, or it marks the end of a trend. To mitigate closing on false Leledc signals, this strategy has two options: 1. Introducing requirement for increased volume on the Leledc bars can help filter out Leledc signals that happen mid trend. 2. Closing after a number of Leledc bars appear after position opens. These two options work great in isolation but don't perform well together in my testing.

"Bollinger Bands exhaustion bars" - These bars are highlighted when price closes back inside the Bollinger Bands and RSI is within specified overbought/sold zones. The idea is that a trend is overextended when price trades beyond the Bollinger Bands . When price closes back inside the bands it's likely due for mean reversion back to the base EMA in which this strategy will ideally re-enter a position. Since the added RSI requirements often make this indicator too strict to trigger a large enough sample size to backtest, I've found it best to use "non-standard" settings for both the bands and the RSI as seen in the default settings.

"Buy/Sell zones" - Similar to the idea behind using Bollinger Bands exhaustion bars as a closing signal. Instead of calculating off of standard deviations, the Buy/Sell zones are calculated off multiples of the middle EMA bands. When trading beyond these zones and subsequently failing back inside, price may be due for mean reversion back to the base EMA . No RSI filter is used for Buy/Sell zones.

If any early close conditions are selected, it's often worth enabling trade re-entry on "middle EMA band bounce". Instead of waiting for a candle to close back inside the middle EMA bands, this feature will re-enter position on only a wick back into the middle bands as will sometimes happen when the trend is strong.

Any and all of the early close conditions can be combined. Experimenting with these, I've found can result in less net profit but higher win-rates and sharpe ratios as less time is spent in trades.


The deadly:
The trend is your friend. But wouldn't it be nice to catch the trends early? In ranging markets (or when using slower base EMAs in this strategy), waiting for confirmation of a breakout of the EMA bands at best will cause you to miss half the move, at worst will result in getting consistently chopped up. Enabling "counter-trend" trades on this strategy will allow the strategy to enter positions on the opposite side of the EMA bands on either a Leledc bar or Bollinger Bands exhaustion bar. There is a filter requiring either a high/low (for Leledc) or open (for BB bars) outside the selected inner or outer Buy/Sell zone. There are also a number of different close conditions for the counter-trend trades to experiment with and backtest.

There are two ways I've found best to use counter-trend trades
1. Mean reverting scalp trades when a trend is clearly overextended. Selecting from the first 5 counter-trend closing conditions on the dropdown list will usually close the trades out quickly, with less profit but less risk.
2. Trying to catch trends early. Selecting any of the close conditions below the first 5 can cause the strategy to behave as if it's entering into a new trend (from the wrong side).

This feature can be deadly effective in profiting from every move price makes, or deadly to the strategy's PnL if not set correctly. Since counter-trend trades open opposite the middle bands, a stop-loss is recommended to reduce risk. If stop-losses for counter-trend trades are disabled, the strategy will hold a position open often until liquidation in a trending market if th trade is offsides. Note that using a slower base EMA makes counter-trend stop-losses even more necessary as it can reduce the effectiveness of the Buy/Sell zone filter for opening the trades as price can spend a long time trending outside the zones. If faster EMAs (34 and below) are used with "Inner" Buy/Zone filter selected, the first few closing conditions will often trigger almost immediately closing the trade at a loss.


The niche:
I've added a feature to default into longs or shorts. Enabling these with other features (aside from the basic long/short on EMA middle band breakout) tends to break the strategy one way or another. Enabling default long works to simulate trying to acquire more of the asset rather than the base currency. Enabling default short can have positive results for those high FDV, high inflation coins that go down-only for months at a time. Otherwise, I use default short as a hedge for coins that I hold and stake spot. I gain the utility and APR of staking while reducing the risk of holding the underlying asset by maintaining a net neutral position *most* of the time.


Disclaimer:
This script is intended for experimenting and backtesting different strategies around EMA bands. Use this script for your live trading at your own risk. I am a rookie coder, as such there may be errors in the code that cause the strategy to behave not as intended. As far as I can tell it doesn't repaint, but I cannot guarantee that it does not. That being said if there's any question, improvements, or errors you've found, drop a comment below!

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/12ed8fdcb889021572e.jpg) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|34|EMA Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|true|(?Open Conditions)Enable middle EMA band breakout: Long|
|v_input_bool_2|true|Enable middle EMA band breakdown: Short|
|v_input_bool_5|false|Enable default positioning: Long|
|v_input_bool_6|false|Enable default positioning: Short|
|v_input_bool_7|false|Enable middle EMA band bounce re-entry: Long|
|v_input_bool_8|false|Enable middle EMA band bounce re-entry: Short|
|v_input_bool_9|false|Use slow EMA filter|
|v_input_int_3|200|Slow EMA Length|
|v_input_string_1|0|(?Close Conditions)Close on crosses through middle EMA bands: Opposite band|Nearest band|Delayed bars inside|
|v_input_int_2|4|Delayed close no. of bars|
|v_input_bool_10|false|Close on Leledc bars|
|v_input_string_4|0|Which Leledc bar?: First|Second|Third|Fourth|Fifth|
|v_input_bool_11|false|Close on Bollinger Band exhaustion bars|
|v_input_string_5|0|Which BB exhaustion bar?: First|Second|Third|
|v_input_bool_12|false|Close on loss of Buy/Sell zone|
|v_input_string_9|0|Which Buy/Sell zone?: Inner|Outer|
|v_input_bool_3|false|(?Counter Trade Settings)Enable counter-trend trades: Long|
|v_input_string_2|0|Trigger: Leledc|BB Exhaustion|
|v_input_bool_4|false|Enable counter-trend trades: Short|
|v_input_string_3|0|Trigger: Leledc|BB Exhaustion|
|v_input_string_6|0|Leledc/BB must be outside which Buy/Sell zone to open: Inner|Outer|
|v_input_string_7|0|Closing conditions for counter-trend longs: Cross Top Middle Band|Cross Inner Buy Zone|Touch Inner Buy Zone|Cross Bottom Middle Band|Touch Bottom Middle Band|Cross Outer Buy Zone|Touch Top Middle Band|Cross Inner Sell Zone|Touch Inner Sell Zone|Cross Outer Sell Zone|Touch Outer Sell Zone|First Leledc|First BB Exhaustion|
|v_input_string_8|0|Closing conditions for counter-trend shorts: First Leledc|Cross Inner Sell Zone|Touch Inner Sell Zone|Cross Top Middle Band|Touch Top Middle Band|Cross Bottom Middle Band|Touch Bottom Middle Band|Cross Inner Buy Zone|Touch Inner Buy Zone|Cross Outer Buy Zone|Touch Outer Buy Zone|Cross Outer Sell Zone|First BB Exhaustion|
|v_input_float_1|10|Flat stop-loss % for counter-trend longs|
|v_input_float_2|10|Flat stop-loss % for counter-trend shorts|
|v_input_bool_13|false|(?Visual Elements)Show Slow EMA|
|v_input_1|true|Show Leledc Exhausion Bars|
|v_input_3|true|Enable Bollinger Bands exhaustion bar coloring|
|v_input_4|false|Enable Bollinger bands exhaustion bar background coloring|
|v_input_bool_15|false|Enable Buy/Sell zone failure bar coloring|
|v_input_bool_16|false|Enable Trend Bar Color|
|v_input_int_4|20|(?Bollinger Bands Exhaustion Bar Settings)Bollinger Bands SMA Period Length|
|v_input_float_3|1.8|Bollinger Bands Standard Deviation|
|v_input_int_5|8|RSI Period Length|
|v_input_int_6|30|RSI Oversold Value|
|v_input_int_7|70|RSI Overbought value|
|v_input_bool_14|false|(?Leledc Exhaustion Bar Settings)Require Volume breakout for Leledc bars|
|v_input_float_4|1.5|Volume Multiplier|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|6|Bar count no|
|v_input_7|30|Highest / Lowest|
|v_input_8|true|bindexSindex|
|v_input_9|4|Close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-08 00:00:00
end: 2022-05-07 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © danielx888
// Credits to Joy_Bangla for the Leledc exhaustion bar code
// Credits to VishvaP for the 34 EMA bands code
// Credits to SlumdogTrader for the BB exhaustion code (edited for functionality)

//@version=5
//strategy(title='EMA bands + leledc + bollinger bands trend catching strategy w/ countertrend scalp', shorttitle='Trend Pooristics', overlay=true, initial_capital = 1000, commission_value= 0.036, pyramiding= 0, default_qty_type= strategy.percent_of_equity, default_qty_value= 100, margin_long=0, margin_short=0, max_bars_back=200)

EMAlength = input.int(title='EMA Length', defval=34, minval=1, step=1)

//get user inputs
needLong = input.bool(true, title = "Enable middle EMA band breakout: Long", group="Open Conditions")
needShort = input.bool(true, title = "Enable middle EMA band breakdown: Short", group="Open Conditions")
midClose = input.string('Opposite band', title='Close on crosses through middle EMA bands', tooltip='Selecting -Delayed bars inside- will delay closing positions by the specified amount of bars if candles close inside the middle EMA bands but do not breakout the opposite side.', options=['Nearest band', 'Opposite band', 'Delayed bars inside'], group='Close Conditions')
needCTlong = input.bool(false, title = "Enable counter-trend trades: Long", tooltip='Does not work with -default positioning: short- enabled',  group="Counter Trade Settings")
CTlongType = input.string('Leledc', title = 'Trigger', options=['Leledc', 'BB Exhaustion'], group='Counter Trade Settings')
needCTshort = input.bool(false, title = "Enable counter-trend trades: Short", tooltip='Does not work with -default positioning: long- enabled', group="Counter Trade Settings")
CTshortType = input.string('Leledc', title = 'Trigger', options=['Leledc', 'BB Exhaustion'], group='Counter Trade Settings')
alwaysLong = input.bool(false, title = "Enable default positioning: Long", tooltip='Does not work with -Default to short- also selected. Works best when early close conditions are used', group = 'Open Conditions')
alwaysShort = input.bool(false, title = "Enable default positioning: Short", tooltip='Does not work with -Default to long- also selected. Works best when early close conditions are used', group = 'Open Conditions')
s_longBounce = input.bool(false, 'Enable middle EMA band bounce re-entry: Long', tooltip='Works best when early close conditions are used', group= 'Open Conditions')
s_shortBounce = input.bool(false, 'Enable middle EMA band bounce re-entry: Short', tooltip='Works best when early close conditions are used', group= 'Open Conditions')
numBars = input.int(4, title='Delayed close no. of bars', minval=1, maxval=10, step=1, group='Close Conditions')
useSlowEMA = input.bool(false, title='Use slow EMA filter',tooltip='Has no effect on counter-trend trades', group='Open Conditions')
useLele = input.bool(false, title='Close on Leledc bars', group='Close Conditions')
string whichLele = input.string('First', title='Which Leledc bar?', options=['First', 'Second', 'Third', 'Fourth', 'Fifth'], group='Close Conditions')
useBBExtend = input.bool(false, title='Close on Bollinger Band exhaustion bars', tooltip='Bollinger Band Exhaustion bars are candles that close back inside the Bollinger Bands when RSI is overbought or oversold. Settings for both can be changed under the -Bollinger Bands Exhaustion Bar Settings- header.', group='Close Conditions')
string whichBBext = input.string('First', title='Which BB exhaustion bar?', options=['First', 'Second', 'Third'], group='Close Conditions')
reverBandClose = input.bool(false, title='Close on loss of Buy/Sell zone', group='Close Conditions')
whichCTband = input.string(defval = 'Inner', title = 'Leledc/BB must be outside which Buy/Sell zone to open', options=['Inner', 'Outer'], group="Counter Trade Settings")
i_CTlongCloseCond = input.string(title='Closing conditions for counter-trend longs', defval='Cross Top Middle Band', tooltip='-Cross- type close conditions market close position on candle closes above selected region \n\n-Touch- type enable trailing limit orders that follow the selected region', options=['Cross Outer Buy Zone', 'Cross Inner Buy Zone', 'Touch Inner Buy Zone', 'Cross Bottom Middle Band', 'Touch Bottom Middle Band', 'Cross Top Middle Band', 'Touch Top Middle Band', 'Cross Inner Sell Zone', 'Touch Inner Sell Zone', 'Cross Outer Sell Zone', 'Touch Outer Sell Zone', 'First Leledc', 'First BB Exhaustion'], group='Counter Trade Settings')
i_CTshortCloseCond = input.string(title='Closing conditions for counter-trend shorts', defval='First Leledc', tooltip='-Cross- type close conditions market close position on candle closes below selected region \n\n-Touch- type enable trailing limit orders that follow the selected region',options=['Cross Outer Sell Zone', 'Cross Inner Sell Zone', 'Touch Inner Sell Zone', 'Cross Top Middle Band', 'Touch Top Middle Band', 'Cross Bottom Middle Band', 'Touch Bottom Middle Band', 'Cross Inner Buy Zone', 'Touch Inner Buy Zone', 'Cross Outer Buy Zone', 'Touch Outer Buy Zone', 'First Leledc', 'First BB Exhaustion'], group='Counter Trade Settings')
i_CTlongSL = input.float(10, 'Flat stop-loss % for counter-trend longs', 0, 100, 0.1, 'Input 0 to disable stop-loss for counter-trend trades. Enabling stop-loss will not apply to middle band breakout, bounce, or default positional trades',group='Counter Trade Settings')
i_CTshortSL = input.float(10, 'Flat stop-loss % for counter-trend shorts', 0, 100, 0.1, 'Input 0 to disable stop-loss for counter-trend trades. Enabling stop-loss will not apply to middle band breakout, bounce, or default positional trades',group='Counter Trade Settings')


// calculate and plot slow EMA
showSlowEMA = input.bool(false, title='Show Slow EMA', group='Visual Elements')
slowEMAlen = input.int(200, title='Slow EMA Length', step=1, minval=1, group='Open Conditions')
slowEMA = ta.ema(close, slowEMAlen)
plot(showSlowEMA ? slowEMA : na)


maj = input(true, 'Show Leledc Exhausion Bars', group='Visual Elements')


//*****************************
// SlumdogTrader's Bollinger Bands + RSI Double Strategy - Profit Trailer
//====================================================================================================//

///////////// Bollinger Bands Settings
BBlength = input.int(20, minval=1, title='Bollinger Bands SMA Period Length', group='Bollinger Bands Exhaustion Bar Settings')
BBmult = input.float(1.8, minval=0.001, maxval=50, title='Bollinger Bands Standard Deviation', group='Bollinger Bands Exhaustion Bar Settings')
price = input(close, title='Source')
BBbasis = ta.sma(price, BBlength)
BBdev = BBmult * ta.stdev(price, BBlength)
BBupper = BBbasis + BBdev
BBlower = BBbasis - BBdev
source = close
buyEntry = ta.crossover(source, BBlower)
sellEntry = ta.crossunder(source, BBupper)
plot(BBbasis, color=color.new(color.aqua, 0), title='BBs SMA Basis Line', display=display.none)
p1 = plot(BBupper, color=color.new(color.silver, 0), title='BBs Upper Line', display=display.none)
p2 = plot(BBlower, color=color.new(color.silver, 0), title='BBs Lower Line', display=display.none)
//fill(p1, p2, display=display.none)

///////////// RSI Settings
RSIlength = input.int(8, minval=1, step=1, title='RSI Period Length', group='Bollinger Bands Exhaustion Bar Settings')
RSIos = input.int(30, minval=0, maxval=50, step=1,title='RSI Oversold Value', group='Bollinger Bands Exhaustion Bar Settings')
RSIob = input.int(70, minval=50, maxval=100, step=1, title='RSI Overbought value', group='Bollinger Bands Exhaustion Bar Settings')
vrsi = ta.rsi(price, RSIlength)
RSIoverSold = vrsi < RSIos
RSIoverBought = vrsi > RSIob

///////////// Colour Settings
switch1 = input(true, title='Enable Bollinger Bands exhaustion bar coloring', group='Visual Elements')
switch2 = input(false, title='Enable Bollinger bands exhaustion bar background coloring', tooltip='Enabling this can help visualize when dialing in Bollinger Bands and RSI settings', group='Visual Elements')
OSOBcolor = RSIoverBought and price[1] > BBupper and price < BBupper ? color.yellow : RSIoverSold and price[1] < BBlower and price > BBlower ? color.blue : na
bgcolor(switch2 ? color.new(OSOBcolor,70) : na)


///////////// RSI + Bollinger Bands Strategy
//if not na(vrsi)
//
//    if ta.crossover(vrsi, RSIoverSold) and ta.crossover(source, BBlower)
//        strategy.entry('RSI_BB_L', strategy.long, stop=BBlower, oca_type=strategy.oca.cancel, comment='RSI_BB_L')
//    else
//        strategy.cancel(id='RSI_BB_L')
//
//    if ta.crossunder(vrsi, RSIoverBought) and ta.crossunder(source, BBupper)
//        strategy.entry('RSI_BB_S', strategy.short, stop=BBupper, oca_type=strategy.oca.cancel, comment='RSI_BB_S')
//    else
//        strategy.cancel(id='RSI_BB_S')
//
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
//====================================================================================================//
//*****************************


//*****************************
// © Joy_Bangla Leledc Exhaustion V4
//====================================================================================================//
//min = input(false, 'Minor Leledc Exhaustion Bar ::  Show')
i_leleVol = input.bool(false, 'Require Volume breakout for Leledc bars', group='Leledc Exhaustion Bar Settings')
i_volMult = input.float(1.5,'Volume Multiplier', 0.1,20,0.1, group='Leledc Exhaustion Bar Settings')
leleVol = volume > ta.sma(volume,100)*i_volMult

leledcSrc = input(close, 'Source', group='Leledc Exhaustion Bar Settings')
maj_qual = input(6, 'Bar count no', group='Leledc Exhaustion Bar Settings')
maj_len = input(30, 'Highest / Lowest', group='Leledc Exhaustion Bar Settings')
//min_qual = input(5, 'Minor Leledc Exhausion Bar ::  Bar count no')
//min_len = input(5, 'Minor Leledc Exhausion Bar ::  Bar count no')
bindexSindex = input(1, 'bindexSindex', group='Leledc Exhaustion Bar Settings')
closeVal = input(4, 'Close', group='Leledc Exhaustion Bar Settings')

lele(qual, len) =>
    bindex = 0
    sindex = 0
    bindex := nz(bindex[bindexSindex], 0)
    sindex := nz(sindex[bindexSindex], 0)
    ret = 0
    if close > close[closeVal]
        bindex += 1
        bindex
    if close < close[closeVal]
        sindex += 1
        sindex
    
    if i_leleVol and not leleVol
        ret := 0
        ret
    else
        if bindex > qual and close < open and high >= ta.highest(high, len)
            bindex := 0
            ret := -1
            ret
        if sindex > qual and close > open and low <= ta.lowest(low, len)
            sindex := 0
            ret := 1
            ret
    return_1 = ret
    return_1

major = lele(maj_qual, maj_len)
//minor = lele(min_qual, min_len)

plotchar(maj ? major == -1 ? high : na : na, char='•', location=location.absolute, color=color.new(color.red, 0), size=size.small)
plotchar(maj ? major == 1 ? low : na : na, char='•', location=location.absolute, color=color.new(color.lime, 0), size=size.small)

//plotchar(min ? minor == 1 ? high : na : na, char='x', location=location.absolute, color=color.new(color.red, 0), size=size.small)
//plotchar(min ? minor == -1 ? low : na : na, char='x', location=location.absolute, color=color.new(color.lime, 0), size=size.small)

//leledcMajorBullish = major == 1 ? low : na
//leledcMajorBearish = major == -1 ? high : na

//leledcMinorBullish = minor == 1 ? low : na
//leledcMinorBearish = minor == -1 ? high : na

//==============================================//

//alertcondition(leledcMajorBullish, title='Major Bullish Leledc', message='Major Bullish Leledc')
//alertcondition(leledcMajorBearish, title='Major Bearish Leledc', message='Major Bearish Leledc')

//alertcondition(leledcMinorBullish, title='Minor Bullish Leledc', message='Minor Bullish Leledc')
//alertcondition(leledcMinorBearish, title='Minor Bearish Leledc', message='Minor Bearish Leledc')
//====================================================================================================//
//*****************************


//*****************************
// © VishvaP 34 EMA Bands v2
//====================================================================================================//

//Constants
//price = close
highShortEMA = ta.ema(high, EMAlength)
lowShortEMA = ta.ema(low, EMAlength)
EMA = ta.ema(close, EMAlength)

//==============================================//

//1D Bands [Not Used]
//bandsHigh = highShortEMA * math.phi
//bandsLow = lowShortEMA * math.rphi

//==============================================//

//Lower reversion zone bands (buy zone)
shortbandsHigh = ((highShortEMA - EMA) * math.phi) * math.pi + EMA
shortbandsLow = (-(EMA - lowShortEMA) * math.phi) * math.pi + EMA

//Lower reversion zone bands smoothed
shortbandsHighEMA = ta.wma(shortbandsHigh, 8)
shortbandsLowEMA = ta.wma(shortbandsLow, 8)

//==============================================//

//Higher reversion zone bands (sell zone)
phiExtensionHigh = ((highShortEMA - EMA) * math.phi) * (math.phi + 4) + EMA
phiExtensionLow = (-(EMA - lowShortEMA) * math.phi) * (math.phi + 4) + EMA

//Higher reversion zone bands smoothed
phiExtensionHighEMA = ta.wma(phiExtensionHigh, 8)
phiExtensionLowEMA = ta.wma(phiExtensionLow, 8)

//==============================================//

//Median zone bands [plot]
highP1 = plot(highShortEMA, color = color.new(color.blue, 100), title = "Top median zone")
lowP1 = plot(lowShortEMA, color = color.new(color.blue, 100), title = "Bottom median zone")
plot(EMA, color = color.new(color.gray, 100), title = "EMA")

//1D bands [not used]
//highP2 = plot(bandsHigh)
//lowP2 = plot(bandsLow)

//Lower reversion zone bands [plot]
highP3 = plot(shortbandsHighEMA, color = color.new(color.yellow, 100), title = "Lower sell zone")
lowP3 = plot(shortbandsLowEMA, color = color.new(color.teal, 100), title = "Higher buy zone")

//Higher reversion zone bands [plot]
phiPlotHigh = plot(phiExtensionHighEMA, color = color.new(color.red, 100), title = "Top sell zone")
phiPlotLow = plot(phiExtensionLowEMA, color = color.new(color.green, 100), title = "Bottom buy zone")


//==============================================//

//Sell zone region [fill]
//fill(phiPlotHigh, highP3, color.new(color.red, 85), title = "Sell zone")

//Buy zone region [fill]
//fill(lowP3, phiPlotLow, color.new(color.green, 85), title = "Buy zone")

//Median zone region [fill]
//fill(highP1, lowP1, color.new(color.gray, 70), title = "Median zone")
//====================================================================================================//
//*****************************

//assign bands for counter trend entry
float CTbandTop = na
float CTbandBottom = na 

if whichCTband == 'Inner'
    CTbandTop := shortbandsHighEMA
    CTbandBottom := shortbandsLowEMA
else 
    CTbandTop := phiExtensionHighEMA
    CTbandBottom := phiExtensionLowEMA

//build variables for open/closing conditions on crosses of middle EMA bands
crossUpTopMB = open < highShortEMA and close > highShortEMA
wiggleUpTopMB = open > highShortEMA and close > highShortEMA and close[1] <= highShortEMA[1]
crossDownTopMB = open > highShortEMA and close < highShortEMA
wiggleDownTopMB = open < highShortEMA and close < highShortEMA and close[1] >= highShortEMA[1]

crossUpBotMB = open < lowShortEMA and close > lowShortEMA
wiggleUpBotMB = open > lowShortEMA and close > lowShortEMA and close[1] <= lowShortEMA[1]
crossDownBotMB = open > lowShortEMA and close < lowShortEMA
wiggleDownBotMB = open < lowShortEMA and close < lowShortEMA and close[1] >= lowShortEMA[1]

crossUpBotInnerRB = open < shortbandsLowEMA and close > shortbandsLowEMA
wiggleUpBotInnerRB = open > shortbandsLowEMA and close > shortbandsLowEMA and close[1] <= shortbandsLowEMA[1]
crossUpBotOuterRB = open < phiExtensionLowEMA and close > phiExtensionLowEMA
wiggleUpBotOuterRB = open > phiExtensionLowEMA and close > phiExtensionLowEMA and close[1] <= phiExtensionLowEMA[1]

crossUpTopInnerRB = open < shortbandsHighEMA and close > shortbandsHighEMA
wiggleUpTopInnerRB = open > shortbandsHighEMA and close > shortbandsHighEMA and close[1] <= shortbandsHighEMA[1]
crossUpTopOuterRB = open < phiExtensionHighEMA and close > phiExtensionHighEMA
wiggleUpTopOuterRB = open > phiExtensionHighEMA and close > phiExtensionHighEMA and close[1] <= phiExtensionHighEMA[1]

crossDownBotInnerRB = open > shortbandsLowEMA and close < shortbandsLowEMA
wiggleDownBotInnerRB = open < shortbandsLowEMA and close < shortbandsLowEMA and close[1] >= shortbandsLowEMA[1]
crossDownBotOuterRB = open > phiExtensionLowEMA and close < phiExtensionLowEMA
wiggleDownBotOuterRB = open < phiExtensionLowEMA and close < phiExtensionLowEMA and close[1] >= phiExtensionLowEMA[1]

crossDownTopInnerRB = open > shortbandsHighEMA and close < shortbandsHighEMA
wiggleDownTopInnerRB = open < shortbandsHighEMA and close < shortbandsHighEMA and close[1] >= shortbandsHighEMA[1]
crossDownTopOuterRB = open > phiExtensionHighEMA and close < phiExtensionHighEMA
wiggleDownTopOuterRB = open < phiExtensionHighEMA and close < phiExtensionHighEMA and close[1] >= phiExtensionHighEMA[1]

longBounce = open > highShortEMA and close > highShortEMA and low < highShortEMA
shortBounce = open < lowShortEMA and close < lowShortEMA and high > lowShortEMA

//build variables for counter trend trades closing conditions
CTlongCloseCond = (i_CTlongCloseCond == 'Cross Inner Sell Zone' ? (crossUpTopInnerRB or wiggleUpTopInnerRB) : (i_CTlongCloseCond == 'Cross Outer Sell Zone' ? (crossUpTopOuterRB or wiggleUpTopOuterRB) : (i_CTlongCloseCond == 'Cross Top Middle Band' ? (crossUpTopMB or wiggleUpTopMB) : (i_CTlongCloseCond == 'Cross Bottom Middle Band' ? (crossUpBotMB or wiggleUpBotMB) : (i_CTlongCloseCond == 'Cross Inner Buy Zone' ? (crossUpBotInnerRB or wiggleUpBotInnerRB) : (i_CTlongCloseCond == 'Cross Outer Buy Zone' ? (crossUpBotOuterRB or crossUpBotOuterRB) : (i_CTlongCloseCond == 'First Leledc' ? major == -1 : (i_CTlongCloseCond == 'First BB Exhaustion' ? OSOBcolor == color.yellow : na))))))))
CTlongTP = (i_CTlongCloseCond == 'Touch Inner Buy Zone' ? shortbandsLowEMA : (i_CTlongCloseCond == 'Touch Top Middle Band' ? highShortEMA : (i_CTlongCloseCond == 'Touch Bottom Middle Band' ? lowShortEMA : (i_CTlongCloseCond == 'Touch Inner Sell Zone' ? shortbandsHighEMA : (i_CTlongCloseCond == 'Touch Outer Sell Zone' ? phiExtensionHighEMA : na)))))

CTshortCloseCond =  (i_CTshortCloseCond == 'Cross Inner Buy Zone' ? (crossDownBotInnerRB or wiggleDownBotInnerRB) : (i_CTshortCloseCond == 'Cross Outer Buy Zone' ? (crossDownBotOuterRB or wiggleDownBotOuterRB) : (i_CTshortCloseCond == 'Cross Bottom Middle Band' ? (crossDownBotMB or wiggleDownBotMB) : (i_CTshortCloseCond == 'Cross Top Middle Band' ? (crossDownTopMB or wiggleDownTopMB) : (i_CTshortCloseCond == 'Cross Inner Sell Zone' ? (crossDownTopInnerRB or wiggleDownTopInnerRB) : (i_CTshortCloseCond == 'Cross Outer Sell Zone' ? (crossDownTopOuterRB or crossDownTopOuterRB) : (i_CTshortCloseCond == 'First Leledc' ? major == 1 : (i_CTshortCloseCond == 'First BB Exhaustion' ? OSOBcolor == color.blue : na))))))))
CTshortTP = (i_CTshortCloseCond == 'Touch Inner Sell Zone' ? shortbandsHighEMA : (i_CTshortCloseCond == 'Touch Bottom Middle Band' ? lowShortEMA : (i_CTshortCloseCond == 'Touch Top Middle Band' ? highShortEMA : (i_CTshortCloseCond == 'Touch Inner Buy Zone' ? shortbandsLowEMA : (i_CTshortCloseCond == 'Touch Outer Buy Zone' ? phiExtensionLowEMA : na)))))

shortMidBreak = crossDownBotMB or wiggleDownBotMB
longMidBreak = crossUpTopMB or wiggleUpTopMB

//==============================================//
//longs open
if needLong
    if useSlowEMA
        if longMidBreak and close > slowEMA and open < highShortEMA
            strategy.entry('Long', strategy.long)
    else if longMidBreak
        strategy.entry('Long', strategy.long)
if strategy.position_size == 0 and s_longBounce
    if useSlowEMA
        if close > slowEMA and longBounce
            strategy.entry('Long', strategy.long)
    else if longBounce
        strategy.entry('Long', strategy.long)
//shorts open
if needShort
    if useSlowEMA
        if shortMidBreak and close < slowEMA and open > lowShortEMA
            strategy.entry('Short', strategy.short)
    else if shortMidBreak
        strategy.entry('Short', strategy.short)
if strategy.position_size == 0 and s_shortBounce
    if useSlowEMA
        if close < slowEMA and shortBounce
            strategy.entry('Short', strategy.short)
    else if shortBounce
        strategy.entry('Short', strategy.short)
//==============================================//

//calculate how many leledc bars between current bar and current position entry
int countLongLele = 0
int countShortLele = 0
int numLele = switch whichLele
    'First' => 1
    'Second' => 2
    'Third' => 3
    'Fourth' => 4
    'Fifth' => 5
int i = 0

//count leles for longs
if strategy.position_size > 0
    if useLele and numLele > 1
        while i <= 200
            if strategy.position_size[i] <= 0
                break
            if bar_index[i] == 0
                break
            if major[i] == -1
                countLongLele += 1 
            if countLongLele == numLele
                break
            i += 1
//count leles for shorts
if strategy.position_size < 0 
    if useLele and numLele > 1
        while i <= 200
            if strategy.position_size[i] >= 0
                break
            if bar_index[i] == 0
                break
            if major[i] == 1
                countShortLele += 1
            if countShortLele == numLele
                break
            i += 1

//countBullLeles() =>
//    count = 0
//    int n = 0
//    while n <= 200 and strategy.position_size[n] > 0
//        if major[n] == -1
//            count += 1
//    return_1 = count
//    return_1
//countBearLeles() =>
//    count = 0
//    int n = 0
//    while n <= 200 and strategy.position_size[n] < 0
//        if major[n] == 1
//            count += 1
//    return_1 = count
//    return_1

//calculate how many BB extension bars between current bar and current position entry
int countLongBBs = 0
int countShortBBs = 0
int numBBs = switch whichBBext
    'First' => 1
    'Second' => 2
    'Third' => 3
int n = 0

//count BB Extension bars for longs
if strategy.position_size > 0
    if useBBExtend and numBBs > 1
        while n <= 200
            if strategy.position_size[n] <= 0
                break
            if bar_index[n] == 0
                break
            if OSOBcolor[n] == color.yellow
                countLongBBs += 1 
            if countLongBBs == numBBs
                break
            n+= 1
//count BB Extension bars for shorts
if strategy.position_size < 0
    if useBBExtend and numBBs > 1
        while n <= 200
            if strategy.position_size[n] >= 0
                break
            if bar_index[n] == 0
                break
            if OSOBcolor[n] == color.blue
                countShortBBs += 1 
            if countShortBBs == numBBs
                break
            n+= 1

//identify bars crossing under extreme overbought/oversold reversion bands for strategy exits and color
showReverBars = input.bool(title='Enable Buy/Sell zone failure bar coloring', defval=false, group='Visual Elements')
whichReverBand = input.string(title='Which Buy/Sell zone?', defval='Inner', options=['Inner', 'Outer'], group='Close Conditions')

float reverBandTop = na
float reverBandBottom = na
if whichReverBand == 'Inner'
    reverBandTop := shortbandsHighEMA
    reverBandBottom := shortbandsLowEMA
else 
    reverBandTop := phiExtensionHighEMA
    reverBandBottom := phiExtensionLowEMA
crossUpRB = open < reverBandBottom and close > reverBandBottom
wiggleUpRB = open > reverBandBottom and close > reverBandBottom and close[1] <= reverBandBottom[1]
crossDownRB = open > reverBandTop and close < reverBandTop
wiggleDownRB = open < reverBandTop and close < reverBandTop and close[1] >= reverBandTop[1]

reverBarColor = crossDownRB or (wiggleDownRB and not crossDownRB[1]) ? color.orange : crossUpRB or (wiggleUpRB and not crossUpRB[1]) ? color.purple : na

//return true after specified number of bars (numBars) closes inside the mid bands but no breakout
inMid = close > lowShortEMA and close < highShortEMA and open > lowShortEMA and open < highShortEMA

isAllMid() =>
    AllMid = true
    for t = 0 to numBars by 1
        if longMidBreak[t] or shortMidBreak[t]
            AllMid := false
    AllMid

//==============================================//
//longs close
if strategy.position_size > 0
    if reverBandClose
        if reverBarColor == color.orange
            strategy.close('Long', comment = 'Close Long')
    if useBBExtend and numBBs == 1
        if OSOBcolor == color.yellow
            strategy.close('Long', comment = 'Close Long')
            if needCTshort and CTshortType == 'BB Exhaustion'
                if open > CTbandTop
                    strategy.entry(id='Counter Trend Short', comment = 'CT Short', direction=strategy.short)
    if useBBExtend and numBBs > 1
        if countLongBBs == numBBs  
            strategy.close('Long', comment = 'Close Long')
            if needCTshort and CTshortType == 'BB Exhaustion'
                if open > CTbandTop
                    strategy.entry(id='Counter Trend Short', comment = 'CT Short', direction=strategy.short)
    if useLele and numLele == 1
        if major == -1
            strategy.close('Long', comment = 'Close Long')
            if needCTshort and CTshortType == 'Leledc'
                if high > CTbandTop
                    strategy.entry(id='Counter Trend Short', comment = 'CT Short', direction=strategy.short)
    if useLele and numLele > 1
        if countLongLele == numLele
            strategy.close('Long', comment = 'Close Long')
            if needCTshort and CTshortType == 'Leledc'
                if high > CTbandTop
                    strategy.entry(id='Counter Trend Short', comment = 'CT Short', direction=strategy.short)
    if midClose == 'Nearest band'
        if crossDownTopMB or wiggleDownTopMB
            strategy.close('Long', comment = 'Close Long')
    if midClose == 'Opposite band'
        if crossDownBotMB or wiggleDownBotMB
            strategy.close('Long', comment = 'Close Long')
    if midClose == 'Delayed bars inside'
        if crossDownBotMB or wiggleDownBotMB
            strategy.close('Long', comment = 'Close Long')
        if isAllMid()
            if open[numBars] > highShortEMA and close[numBars] < highShortEMA and inMid
                strategy.close('Long', comment = 'Close Long')

//shorts close 
if strategy.position_size < 0
    if reverBandClose
        if reverBarColor == color.purple
            strategy.close('Short', comment = 'Close Short')
    if useBBExtend and numBBs == 1
        if OSOBcolor == color.blue
            strategy.close('Short', comment = 'Close Short')
            if needCTlong and CTlongType == 'BB Exhaustion'
                if open < CTbandBottom
                    strategy.entry(id='Counter Trend Long', comment = 'CT Long', direction=strategy.long)
    if useBBExtend and numBBs > 1
        if countShortBBs == numBBs
            strategy.close('Short', comment = 'Close Short')
            if needCTlong and CTlongType == 'BB Exhaustion'
                if open < CTbandBottom
                    strategy.entry(id='Counter Trend Long', comment = 'CT Long', direction=strategy.long)
    if useLele and numLele == 1
        if major == 1
            strategy.close('Short', comment = 'Close Short')
            if needCTlong and CTlongType == 'Leledc'
                if low < CTbandBottom
                    strategy.entry(id='Counter Trend Long', comment= 'CT Long', direction=strategy.long)
    if useLele and numLele > 1
        if countShortLele == numLele
            strategy.close('Short', comment = 'Close Short')
            if needCTlong and CTlongType == 'Leledc'
                if low < CTbandBottom
                    strategy.entry(id='Counter Trend Long', comment= 'CT Long', direction=strategy.long)
    if midClose == 'Nearest band'
        if crossUpBotMB or wiggleUpBotMB
            strategy.close('Short', comment = 'Close Short')
    if midClose == 'Opposite band'
        if crossUpTopMB or wiggleUpTopMB
            strategy.close('Short', comment = 'Close Short')
    if midClose == 'Delayed bars inside'
        if crossUpTopMB or wiggleUpTopMB
            strategy.close('Short', comment = 'Close Short')
        if isAllMid() 
            if open[numBars] < lowShortEMA and close[numBars] > lowShortEMA and inMid
                strategy.close('Short', comment = 'Close Short')
//==============================================//

//counter trend opens and closes
CTlongSL = strategy.position_avg_price * (1 - i_CTlongSL / 100)
CTshortSL = strategy.position_avg_price * (1 + i_CTshortSL / 100)

//CT longs open
if needCTlong and strategy.position_size == 0
    if CTlongType == 'Leledc'
        if major == 1
            if low < CTbandBottom
                strategy.entry(id='Counter Trend Long', comment = 'CT Long', direction = strategy.long)
    else
        if OSOBcolor == color.blue
            strategy.entry(id='Counter Trend Long', comment = 'CT Long', direction = strategy.long)
//CT longs closed
if strategy.position_size > 0 and strategy.opentrades.entry_id(strategy.opentrades - 1) == 'Counter Trend Long'
    if i_CTlongSL > 0
        if na(CTlongTP)
            strategy.exit(id='Counter Trend Long', stop=CTlongSL, comment = 'CT Long SL')
        else
            strategy.exit(id='Counter Trend Long', stop=CTlongSL, limit=CTlongTP, comment = 'CT Long TP/SL')
    else if i_CTlongSL == 0
        strategy.exit(id='Counter Trend Long', limit=CTlongTP, comment = 'CT Long TP')
    if CTlongCloseCond
        strategy.close(id='Counter Trend Long', comment = 'Close CT Long')

//CT shorts open
if needCTshort and strategy.position_size == 0
    if CTshortType == 'Leledc'
        if major == -1
            if high > CTbandTop
                strategy.entry(id='Counter Trend Short', comment = 'CT Short', direction=strategy.short)
    else
        if OSOBcolor == color.yellow
            strategy.entry(id='Counter Trend Short', comment= 'CT Short', direction=strategy.short)
//CT shorts closed
if strategy.position_size < 0 and strategy.opentrades.entry_id(strategy.opentrades - 1) == 'Counter Trend Short'
    if i_CTshortSL > 0
        if na(CTshortTP)
            strategy.exit(id='Counter Trend Short', stop=CTshortSL, comment = 'CT Short SL')
        else
            strategy.exit(id='Counter Trend Short', stop=CTshortSL, limit=CTshortTP, comment = 'CT Short TP/SL')
    else if i_CTshortSL == 0
        strategy.exit(id='Counter Trend Short', limit=CTshortTP, comment = 'CT Short TP')
    if CTshortCloseCond
        strategy.close(id='Counter Trend Short', comment = "Close CT Short")

//default position
if alwaysLong and not alwaysShort and strategy.position_size == 0 
    if useSlowEMA
        if close > slowEMA
            strategy.entry(id='Default Long', comment = 'Default Long', direction=strategy.long)
    else
        strategy.entry(id='Default Long', comment='Default Long', direction=strategy.long)
if alwaysShort and not alwaysLong and strategy.position_size == 0 
    if useSlowEMA
        if close < slowEMA
            strategy.entry(id='Default Short', comment = 'Default Short', direction=strategy.short)
    else
        strategy.entry(id='Default Short', comment='Default Short', direction=strategy.short)
     
//set bar colors 
trendColor = input.bool(title='Enable Trend Bar Color', tooltip='Color bars green when above mid bands, red when below, and gray when inside. Dark green and dark red bars signal a position is kept open from the delayed close settings.', defval=false, group='Visual Elements')
var colorBar = color.new(color.white, 50)
if trendColor
    if switch1
        if showReverBars
            if reverBarColor == color.purple or reverBarColor == color.orange
                colorBar := reverBarColor
            else if OSOBcolor == color.yellow or OSOBcolor == color.blue
                colorBar := OSOBcolor
            else if close > highShortEMA
                if (alwaysShort or needCTshort) and strategy.position_size < 0
                    colorBar := color.new(color.red, 0)
                else
                    colorBar := color.new(color.green, 0)
            else if close < lowShortEMA
                if (alwaysLong or needCTlong) and strategy.position_size > 0
                    colorBar := color.new(color.green, 0)
                else
                    colorBar := color.new(color.red, 0)
            else if strategy.position_size > 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
                colorBar := color.new(#0a6136, 20)
            else if strategy.position_size < 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
                colorBar := color.new(#600008, 20)
            else
                colorBar := color.new(color.gray, 0)
        else
            if OSOBcolor == color.yellow or OSOBcolor == color.blue
                colorBar := OSOBcolor
            else if close > highShortEMA
                if (alwaysShort or needCTshort) and strategy.position_size < 0
                    colorBar := color.new(color.red, 0)    
                else    
                    colorBar := color.new(color.green, 0)
            else if close < lowShortEMA
                if (alwaysLong or needCTlong) and strategy.position_size > 0
                    colorBar := color.new(color.green, 0)
                else
                    colorBar := color.new(color.red, 0)
            else if strategy.position_size > 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
                colorBar := color.new(#0a6136, 20)
            else if strategy.position_size < 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
                colorBar := color.new(#600008, 20)
            else
                colorBar := color.new(color.gray, 0)
    else if showReverBars
        if reverBarColor == color.purple or reverBarColor == color.orange
            colorBar := reverBarColor
        else if close > highShortEMA
            if (alwaysShort or needCTshort) and strategy.position_size < 0
                colorBar := color.new(color.red, 0)
            else
                colorBar := color.new(color.green, 0)
        else if close < lowShortEMA
            if (alwaysLong or needCTlong) and strategy.position_size > 0
                colorBar := color.new(color.green, 0)
            else    
                colorBar := color.new(color.red, 0)
        else if strategy.position_size > 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
            colorBar := color.new(#0a6136, 20)
        else if strategy.position_size < 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
            colorBar := color.new(#600008, 20)
        else
            colorBar := color.new(color.gray, 0)
    else
        if close > highShortEMA
            if (alwaysShort or needCTshort) and strategy.position_size < 0
                colorBar := color.new(color.red, 0)
            else    
                colorBar := color.new(color.green, 0)
        else if close < lowShortEMA
            if (alwaysLong or needCTlong) and strategy.position_size > 0
                colorBar := color.new(color.green, 0)
            else    
                colorBar := color.new(color.red, 0)
        else if strategy.position_size > 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
            colorBar := color.new(#0a6136, 20)
        else if strategy.position_size < 0 and (midClose == 'Delayed bars inside' or midClose == 'Opposite band')
            colorBar := color.new(#600008, 20)
        else
            colorBar := color.new(color.gray, 0)
else if switch1 
    if showReverBars
        if reverBarColor == color.purple or reverBarColor == color.orange
            colorBar := reverBarColor
        else if OSOBcolor == color.yellow or OSOBcolor == color.blue
            colorBar := OSOBcolor
        else 
            colorBar := na
    else
        if OSOBcolor == color.yellow or OSOBcolor == color.blue
            colorBar := OSOBcolor
        else 
            colorBar := na
else if showReverBars
    if reverBarColor == color.purple or reverBarColor == color.orange
        colorBar := reverBarColor
    else
        colorBar := na
else
    colorBar := na

//barcolor(colorBar)


```

> Detail

https://www.fmz.com/strategy/362022

> Last Modified

2022-05-09 16:48:15
