
> Name

Intelligent-Wave-Trend-Dollar-Cost-Averaging-Cyclical-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7e1aba399795ed063c.png)

[trans]
#### 策略概述
该策略是一个基于波浪趋势指标(Wave Trend)和分散投资(Dollar Cost Averaging)理念的智能交易系统。策略通过分析市场的波动趋势,在市场处于超卖区域时逐步建仓,在牛市确认时逐步获利了结。该策略结合了技术分析和风险管理的优点,能够在市场周期中持续稳定地积累仓位并获取收益。

#### 策略原理
策略的核心逻辑包含以下几个关键要素:
1. 使用HLC3价格平均值和指数移动平均(EMA)计算波浪趋势指标,识别市场的超买超卖状态
2. 通过神奇振荡器(Awesome Oscillator)判断大周期趋势,确定牛熊市状态
3. 在熊市期间,当价格处于超卖区域时分批建仓,建仓比例根据超卖程度动态调整
4. 在牛市启动时,系统会发出"黄金买入"信号,此时加大建仓力度
5. 在牛市期间,当价格进入超买区域时,系统会根据超买程度逐步减仓获利
6. 当出现熊市信号或市场顶部时,系统会清空所有持仓以锁定收益

#### 策略优势
1. 通过分散投资降低建仓成本,有效规避追高风险
2. 多重技术指标交叉验证,提高交易信号的可靠性
3. 仓位管理灵活,根据市场状态动态调整买卖数量
4. 具有较强的防守性,在熊市信号出现时及时止损
5. 策略逻辑清晰,参数可调整性强,适应不同市场环境

#### 策略风险
1. 在震荡市中可能产生频繁交易,增加交易成本
2. 分散建仓策略在单边快速上涨行情中可能错过最佳买点
3. 技术指标存在滞后性,在市场剧烈波动时可能反应不及时
4. 参数设置不当可能导致建仓或减仓时机不准确

#### 策略优化方向
1. 引入波动率指标,优化建仓和减仓的数量计算
2. 加入更多的市场情绪指标,提高趋势判断的准确性
3. 开发自适应参数系统,根据不同市场周期动态调整参数
4. 增加资金管理模块,实现更精细的仓位控制

#### 总结
这是一个将技术分析与风险管理有机结合的智能交易策略。通过波浪趋势指标和分散投资方法,在保护资金安全的同时,实现稳定的收益增长。策略的核心优势在于其在不同市场环境下的适应性,以及清晰的交易逻辑和风险控制机制。 ||

#### Strategy Overview
This strategy is an intelligent trading system based on Wave Trend indicators and Dollar Cost Averaging (DCA) principles. It analyzes market wave trends to gradually build positions in oversold areas and take profits during confirmed bull markets. The strategy combines the advantages of technical analysis and risk management to consistently accumulate positions and generate returns throughout market cycles.

#### Strategy Principles
The core logic includes the following key elements:
1. Uses HLC3 price average and Exponential Moving Average (EMA) to calculate Wave Trend indicators for identifying overbought and oversold conditions
2. Determines major cycle trends using the Awesome Oscillator to identify bull and bear markets
3. During bear markets, builds positions in batches when prices are in oversold territory, with position sizes adjusted dynamically based on oversold levels
4. Issues "Golden Buy" signals when bull markets begin, increasing position building
5. During bull markets, gradually takes profits when prices enter overbought territory
6. Closes all positions to secure profits when bear market signals or market top indicators appear

#### Strategy Advantages
1. Reduces entry costs through dollar cost averaging, effectively avoiding chase-high risks
2. Multiple technical indicators cross-validate to improve trading signal reliability
3. Flexible position management with dynamic adjustment of buy/sell quantities based on market conditions
4. Strong defensive capabilities with timely stop-loss during bear market signals
5. Clear strategy logic with adjustable parameters suitable for different market environments

#### Strategy Risks
1. May generate frequent trades in choppy markets, increasing transaction costs
2. DCA strategy might miss optimal entry points in rapid unidirectional uptrends
3. Technical indicators have inherent lag, potentially causing delayed reactions in volatile markets
4. Improper parameter settings may lead to inaccurate entry and exit timing

#### Strategy Optimization Directions
1. Introduce volatility indicators to optimize position sizing calculations
2. Add more market sentiment indicators to improve trend identification accuracy
3. Develop adaptive parameter systems that dynamically adjust based on different market cycles
4. Enhance money management modules for more precise position control

#### Summary
This is an intelligent trading strategy that effectively combines technical analysis with risk management. Through Wave Trend indicators and dollar cost averaging methods, it achieves stable returns while protecting capital safety. The strategy's core advantage lies in its adaptability to different market environments, clear trading logic, and risk control mechanisms.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5

// Copyright (c) 2024 Seth Ethington.
// All rights reserved.
//
// If this script provides you Bread then share the Dough!
// BTC (God's Money) Address: bc1qrpxvea8ze4ayj2vtr0slp774rulm898gyhe3ss
//
// Redistribution and use in source and binary forms, 
// whether you tweak it or not, is totally fine, 
// but only if you swear on your life that BTC is God's Money! 
// 
// If you're redistributing the source code, 
// you must keep the above copyright notice and, 
// more importantly, the sacred BTC address!
//


strategy(title="Cipher DCA Strategy", shorttitle="Cipher DCA", overlay=false, initial_capital=100, pyramiding=30, currency=currency.USD,  slippage=1, commission_type=strategy.commission.percent, commission_value=0.1, default_qty_type=strategy.percent_of_equity, process_orders_on_close=true)

// Input parameters for the starting date
startDate = input(timestamp("2019-01-01 00:00:00"), title="Start Date (YYYY-MM-DD HH:MM:SS)")


// Input parameters for the indicator
fastLength = input.int(4, title="Fast Wave Length", group="Wave Calculator")  // Length for EMA smoothing of the price channel
slowLength = input.int(33, title="Slow Wave Length", group="Wave Calculator")  // Length for EMA smoothing of the trend channel
wayOverBoughtLevel = input.float(33, title="Way OverBought Level", group="Wave Calculator")
overBoughtLevel = input.float(25, title="Over Bought Level", group="Wave Calculator")
wayOverSoldLevel = input.float(-33, title="Way Over Sold Level", group="Wave Calculator")
overSoldLevel = input.float(-25, title="Over Sold Level", group="Wave Calculator")
accumulatingLevel = input.float(0, title="Accumulating Level", group="Wave Calculator")


// Calculate the average price (HLC3 = (High + Low + Close) / 3)
averagePrice = hlc3

// Compute the smoothed average price (ESA: Exponential Smoothing Average)
exponentialSmoothingAverage = ta.ema(averagePrice, fastLength)

// Compute the deviation (D) between the price and the smoothed average
priceDeviation = ta.ema(math.abs(averagePrice - exponentialSmoothingAverage), fastLength)

// Compute the commodity index (CI) which is normalized price movement
commodityIndex = (averagePrice - exponentialSmoothingAverage) / (0.015 * priceDeviation)

// Smooth the commodity index to create Wave Trend 1 (WT1)
fastWaveTrend = ta.ema(commodityIndex, slowLength)
// //log.info("fastWaveTrend= " + str.tostring(fastWaveTrend))

// Further smooth WT1 using a simple moving average to create Wave Trend 2 (WT2)
slowWaveTrend = ta.sma(fastWaveTrend, 5)
// //log.info("slowWaveTrend= " + str.tostring(slowWaveTrend))


// Plot the center line (0) for reference
plot(0, color=color.white, title="Center Line")

// Plot overbought and oversold levels
plot(wayOverBoughtLevel, color=color.red, title="Way Overbought")
plot(overBoughtLevel, color=color.red, title="Overbought")
plot(overSoldLevel, color=color.green, title="Oversold")
plot(wayOverSoldLevel, color=color.green, title="Way Oversold")

// Plot WT1 and WT2 as filled areas for better visibility
plot(fastWaveTrend, style=plot.style_area, color=color.new(color.blue, 0), title="Fast Wave")
plot(slowWaveTrend, style=plot.style_area, color=color.new(color.navy, 30), title="Slow Wave")

// Highlight the difference between fastWave vs slowWave
waveTrendDifference = fastWaveTrend - slowWaveTrend

// //log.info("waveTrendDifference=" + str.tostring(waveTrendDifference))
plot(waveTrendDifference, color=color.new(color.yellow, 30),style=plot.style_area, title="WT1 - WT2 Difference") //No transparency

// Plot buy and sell signals at crossovers
isCrossover = ta.cross(fastWaveTrend, slowWaveTrend)
// //log.info("isCrossover=" + str.tostring(isCrossover))
plot(isCrossover ? slowWaveTrend : na, color=(slowWaveTrend - fastWaveTrend > 0 ? color.red : color.green), style=plot.style_circles, linewidth=4, title="Crossover Signals")

float waveTrend = na
if (slowWaveTrend > 0 and fastWaveTrend > 0) 
    waveTrend := math.max(slowWaveTrend, fastWaveTrend)
    // //log.info("Both trends are positive. waveTrend set to max value: " + str.tostring(waveTrend))
else if (slowWaveTrend < 0 and fastWaveTrend < 0)
    waveTrend := math.min(slowWaveTrend, fastWaveTrend)
    // //log.info("Both trends are negative. waveTrend set to min value: " + str.tostring(waveTrend))
else 
    waveTrend := 0
    // //log.info("Trends are mixed. waveTrend set to 0.")

// Time to Sell
isCrossingDown = waveTrendDifference < 0

// Time to Buy
isCrossingUp = waveTrendDifference > 0


//-----------------------------------------------------------


// Detect Bull Market and Bear Market using the Awesome Oscillator
// User input for AO thresholds
ao_threshold = input.float(-10, "AO Bull Market Threshold", minval=-50, maxval=50, step=1, group = "Bear and Bull Thresholds")
ao_cycletop_threshold = input.float(5, "AO Bear Market Threshold", minval=0, maxval=200, step=1, group = "Bear and Bull Thresholds")

// Define the Awesome Oscillator
ao = ta.sma(hl2, fastLength) - ta.sma(hl2, slowLength)

// Convert current bar time to the first day of the month for monthly calculations
currentMonthStart = timestamp(year, month, 1, 0, 0)
prevMonthStart = time - (time - currentMonthStart)

// Calculate AO for the start of the month and previous month
aoCurrentMonth = request.security(syminfo.tickerid, 'M', ao[0])
aoPrevMonth1    = request.security(syminfo.tickerid, 'M', ao[1])
aoPrevMonth2    = request.security(syminfo.tickerid, 'M', ao[2])

// Detect bull market based on monthly AO
isBullMarket = aoCurrentMonth > aoPrevMonth1 and aoPrevMonth1 > aoPrevMonth2 and aoCurrentMonth > ao_threshold

// Detect cycle top based on monthly AO
isBearMarket = aoCurrentMonth > ao_cycletop_threshold and aoPrevMonth1 > aoCurrentMonth

// Detect when a bull market is starting
var bool isBullMarketStarting = na
if (not isBullMarket[1] and isBullMarket)
    isBullMarketStarting := true
else
    isBullMarketStarting := false

// Logging
//log.info("isBullMarket is " + str.tostring(isBullMarket))
//log.info("isCycleTop is " + str.tostring(isBearMarket))

// Plot transparent overlays for Bull Market and Cycle Top
overlayColor = isBullMarket ? color.new(color.green, 80) : isBearMarket ? color.new(color.red, 60) : na
bgcolor(overlayColor, title="Market Condition Overlay")


//----------------------------------------------------------


// Calculate Potential Liquidations and Golden Buy Zones
volLength = input.int(20, "Volume Length", minval=1, group="Golden Buy Indicator")
volStdDevThreshold = input.float(2.0, "Volume Standard Diviation Threshold", step=0.1, group="Golden Buy Indicator")
aoWeeklyThreshold = input.int(0, "Awesome Oscillator Oversold Threshold", step=1, group="Golden Buy Indicator")


// Start Accumulating when the price is oversold or price action is flat
isStartAccumulating = waveTrend <= accumulatingLevel and not isBearMarket

// Start Selling when we are now in a Bull Market
isStartSelling = waveTrend > accumulatingLevel

// Calculate Overbought and Oversold Levels
isOverSold = waveTrend < overSoldLevel
isWayOverSold = waveTrend < wayOverSoldLevel
isOverBought = waveTrend > overBoughtLevel
isWayOverBought = waveTrend > wayOverBoughtLevel
//log.info("isOverSold= " + str.tostring(isOverSold) + " isWayOverSold= " + str.tostring(isWayOverSold) + " isOverBought= " + str.tostring(isOverBought) + " isWayOverBought= " + str.tostring(isWayOverBought))

//Weekly Awesome Oscillator to detect oversold levels
aoWeekly = request.security(syminfo.tickerid, "W", ao)

// Get standard deviation of volume over last 20 bars
volumeStDev = ta.stdev(volume, volLength)

// Detect volume spikes
volumeSpike = volume > (ta.sma(volume, volLength) + volStdDevThreshold * volumeStDev)

isGoldenBuyZone = volumeSpike and aoWeekly < aoWeeklyThreshold and not isBearMarket
plotshape(series=isGoldenBuyZone ? -60 : na, style=shape.triangleup, location=location.absolute, color=color.yellow, size=size.tiny, offset=0, title="Golden Buy Zone")

isMarketTop = volumeSpike and aoWeekly > -aoWeeklyThreshold and isBullMarket
plotshape(series=isMarketTop ? 60 : na, style=shape.triangledown, location=location.absolute, color=color.purple, size=size.tiny, offset=0, title="Market Top")



//---------------------------------------------------------

// Buying and Selling Input parameters for the indicator
isBullMarketStartingPercent = input.float(1.0, title="Starting a Bull Market Percent", step=0.01, group="Buy and Sell")
goldenBuyPercent = input.float(0.00006, title="Golden Buy Percent", step=0.01, group="Buy and Sell")
wayOverSoldPercent = input.float(0.00004, title="Way Over Sold Percent", step=0.01, group="Buy and Sell") 
overSoldPercent = input.float(0.00002, title="Over Sold Percent", step=0.01, group="Buy and Sell")
crossOverPercent = input.float(0.00002, title="Cross Over Percent", step=0.01, group="Buy and Sell")
overBoughtPercent = input.float(0.00005, title="Over Bought Percent", step=0.01, group="Buy and Sell")
wayOverBoughtPercent = input.float(0.00006, title="Way Over Bought Percent", step=0.01, group="Buy and Sell")

//Execute Buy and Sell Strategy
// Execute only if the bar's time is after the start date
if (true)
    if ((isCrossover and isCrossingUp and isStartAccumulating) or isGoldenBuyZone or isBullMarketStarting)
        if (isGoldenBuyZone) 
            strategy.entry("Golden Buy", strategy.long, qty = goldenBuyPercent * strategy.initial_capital)
            //log.info("Golden Buy " + str.tostring(goldenBuyPercent))
        else if (isBullMarketStarting)
            strategy.entry("Bull Buy", strategy.long, qty = isBullMarketStartingPercent * strategy.initial_capital)
            //log.info("Way Over Sold Buy " + str.tostring(wayOverSoldPercent))    
        else if (isWayOverSold) 
            strategy.entry(str.tostring(strategy.opentrades), strategy.long, qty = wayOverSoldPercent * strategy.initial_capital)
            //log.info("Way Over Sold Buy " + str.tostring(wayOverSoldPercent))
        else if (isOverSold)  
            strategy.entry(str.tostring(strategy.opentrades), strategy.long, qty = overSoldPercent * strategy.initial_capital)
            //log.info("Over Sold Buy " + str.tostring(overSoldPercent))
        else if (isCrossover)  
            strategy.entry(str.tostring(strategy.opentrades), strategy.long, qty = crossOverPercent * strategy.initial_capital)
            //log.info("Crossover Buy " + str.tostring(crossOverPercent))
    else if (isCrossover and isCrossingDown and isStartSelling) or isBearMarket or isMarketTop
        if (isBearMarket)
            strategy.close_all("Close all")
            //log.info("Closing All Open Positions")
        else if (isWayOverBought or isMarketTop) 
            int openTrades = strategy.opentrades  // Get the number of open trades
            int tradesToClose = math.floor(openTrades * wayOverBoughtPercent)
            //log.info("# of tradesToClose= " + str.tostring(tradesToClose))
    
            // Loop through and close 100% of the open trades determined
            for i = 0 to tradesToClose
                // Close the trade by referencing the correct index
                strategy.close(str.tostring(openTrades - 1 - i), qty_percent = 100)
                //log.info("Sell 100%: Closed trade # " + str.tostring(openTrades - 1 - i))
        else if (isOverBought) 
            int openTrades = strategy.opentrades  // Get the number of open trades
            int tradesToClose = math.floor(openTrades * overBoughtPercent) 
            //log.info("# of tradesToClose= " + str.tostring(tradesToClose))
    
            // Loop through and close 100% of the open trades determined
            for i = 0 to tradesToClose
                // Close the trade by referencing the correct index
                strategy.close(str.tostring(openTrades - 1 - i), qty_percent = 100)
                //log.info("Sell 100%: Closed trade # " + str.tostring(openTrades - 1 - i))
        else if (isStartSelling)
            strategy.close(str.tostring(strategy.opentrades - 1), qty_percent =50)
            //log.info("Sell 100% of Last Trade: Closed trade # " + str.tostring(strategy.opentrades - 1))
```

> Detail

https://www.fmz.com/strategy/475629

> Last Modified

2024-12-20 16:42:45
