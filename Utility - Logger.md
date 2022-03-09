
> 策略名称

Utility - Logger

> 策略作者

btcvegas

> 策略描述

设置不同的level，控制日志输出等级

> 策略参数



|参数|默认值|描述|
|----|----|----|
|level|0|Logging Level: DEBUG|INFO|WARNING|ERROR|
|routeFilter|0|Route Filter: All|route1|route2|route3|route4|


> 源码 (javascript)

``` javascript


//var COLOR_ERROR = "#FF0000"
//var COLOR_WARN = "#FF0000"
//var COLOR_INFO = "#0000FF"
//var COLOR_DEBUG = "#000000"
var LEVER_PATTERN = {
    DEBUG: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3
}

$.changeLoggerLever = function(val){
    level = val
}

//var loggerLever = [LEVER_PATTERN.DEBUG, LEVER_PATTERN.INFO, LEVER_PATTERN.WARNING, LEVER_PATTERN.ERROR][level]
$.Error = function(msg, obj, route='route') {
    if (level == 0 || "route" + routeFilter == route){
        Log('[ERR] ', "[" + route.toUpperCase() + "]", msg, obj, '#0000FF')
    }
    
}

$.Warn = function(msg, obj, route='route') {
    if (routeFilter == 0 || "route" + routeFilter == route){
        if (level <= LEVER_PATTERN.WARNING) {
            Log('[WAR] ', "[" + route.toUpperCase() + "]", msg, obj, '#0000FF')
        }
    }
}

$.Info = function(msg, obj, route='route') {
    if (routeFilter == 0 || "route" + routeFilter == route){
        if (level <= LEVER_PATTERN.INFO) {
            Log('[INF] ', "[" + route.toUpperCase() + "]" , msg, obj, '#0000FF')
        }
    }

}

$.Debug = function(msg, obj, route='route') {
    if (routeFilter == 0 || "route" + routeFilter == route){
        if (level <= LEVER_PATTERN.DEBUG) {
            Log('[DBG] ', "[" + route.toUpperCase() + "]", msg, obj, '#0000FF')
        }
    }
}

var executedBlocksCross = []
var executedBlocksCrossIds = []
var executedTrades = []
var blocksLatency = []
var blocksLatencyV2 = []
var executedTradesTriangular = []
var positionHistory = []
var volumeHistory = []
var currentStatus = []

var tradesTable = {
    type: 'table',
    title: 'Executed Trades',
    cols: ['Timestamp', 'Label-Id', 'Contract', 'Exch-Id', 'Exchange', 'Side', 'Px', 'Amt', 'Fees'],
    rows: executedTrades
}

var latencyTable = {
    type: 'table',
    title: 'Timestamps',
    cols: ['Label-Id', 'Exch-Mkr', 'Creating-Mkr', 'Mkr-Live', 'Cancel-Mkr', 'Cancel-Exec', 'Creating-Tkr', 'Tkr-Live', 'Complete'],
    rows: blocksLatencyV2
}

var posTable = {
    type: 'table',
    title: 'Position History',
    cols: ['Timestamp', 'Exch1', 'Exch2', 'Exch1-Pos', 'Exch2-Pos', 'Exposure'],
    rows: positionHistory
}

var volumeTable = {
    type: 'table',
    title: 'Volume Traded',
    cols: ['Date', 'Exch1', 'Exch2', 'Exch1-Trade Amt', 'Exch2-Trade Amt', 'Exch1-Total Volume', 'Exch2-Total Volume'],
    rows: volumeHistory
}

var blocksTableIds = {
    type: 'table',
    title: 'Executed Blocks - Ids',
    cols: ['Date', 'Label-Id', 'Exch-B', 'Exch-S', 'MkrId', 'TkrId', 'Route'],
    rows: executedBlocksCrossIds
}

var blocksTable = {
    type: 'table',
    title: 'Executed Blocks',
    cols: ['Date', 'Label-Id', 'Exch-B', 'Sprd-%', 'Slip-%', 'Sprd-$', 'Val', 'B-Px', 'S-Px', 'B-Amt', 'S-Amt', 'Lc', 'Lat', 'Tries'],
    rows: executedBlocksCross
}

var tradesTable_triangular = {
    type: 'table',
    title: 'Executed Blocks',
    cols: ['Timestamp', 'Label-Id', 'Exc Sprd', 'Buy-Px', 'Sell-Px', 'Con-Px', 'Buy-Amt', 'Sell-Amt', 'Con-Amt', 'Mkr-Id', 'Tkr-Id', 'Con-Id', 'Loc', 'Lat-Exch', 'Lat-React'],
    rows: executedTradesTriangular
}

var currentStatusTable = {
    type: 'table',
    title: 'Current Status',
    cols: ['Timestamp', 'Variable Name', 'Route 1', 'Route 2', 'Route 3', 'Route 4'],
    rows: currentStatus
}

/*
    Logs the current status of the bot per route. Variables that it tracks:
    - Bot State
    - Taker Book
    - Maker Book

*/

$.logBotStatus = function(){
    currentStatus.push(
        [
            new Date().toLocaleString("da-DK"), // Timestamp
            "botState",
            _G("botStateroute1"),
            _G("botStateroute2"),
            _G("botStateroute3"),
            _G("botStateroute4")

        ]
    )
    LogStatus('`' + JSON.stringify([blocksTable, blocksTableIds, tradesTable, posTable, volumeTable, latencyTable, currentStatusTable]) + '`')

}

/* LOC, represents the part of the code that triggered the liquidation.
    0- Order creation -> order executed as taker.
    1- Order Status -> normal check via websocket.
    2- Order Cancellation -> order was executed while the bot was trying to cancel it.
    3- REST Update -> bot had to check status via rest.
*/

$.logArbProfit = function(makerTrade, takerTrade, conversionTrade, route) {
    if (makerTrade.side == 0 || makerTrade.side == "Buy"){
        buyTrade = makerTrade
        sellTrade = takerTrade
    }
    else if (makerTrade.side == 1 || makerTrade.side == "Sell"){
        buyTrade = takerTrade
        sellTrade = makerTrade
    }
    else if (takerTrade.side == 0 || takerTrade.side == "Buy"){
        buyTrade = takerTrade
        sellTrade = makerTrade
    }
    else if (takerTrade.side == 1 || takerTrade.side == "Sell"){
        buyTrade = makerTrade
        sellTrade = takerTrade
    }

    tradeSpread = 0
    if(conversionTrade){
        tradeSpread = tradeSpreadTriangular(makerTrade, takerTrade, conversionTrade)
    }
    else {
        tradeSpread = tradeSpreadCross(buyTrade, sellTrade, route)
    }

    if (tradeSpread > -50 && tradeSpread < 200){
        LogProfit(tradeSpread)
    }    
}

$.logBlockTrades = function(makerTrade, takerTrade, conversionTrade, labelId, loc, route, lat_mkr, lat_trk, lat_mkr_cancel, lat_cyc, tries, premiumTarget, discountTarget) {
    if (conversionTrade) {
        logTradesTriangular(makerTrade, takerTrade, conversionTrade, labelId, loc, lat)
    } 
    else if (takerTrade && makerTrade) {
        try {
            logTradesCross(makerTrade, takerTrade, labelId, loc, route, lat_trk, lat_cyc, tries, premiumTarget, discountTarget)
            $.logLatency(labelId, makerTrade.exchange, lat_mkr, lat_trk, lat_mkr_cancel, lat_cyc)
        }
        catch(e){
        
        }
        LogStatus('`' + JSON.stringify([blocksTable, blocksTableIds, tradesTable, posTable, volumeTable, latencyTable, currentStatusTable]) + '`')
    }
    else {
        $.Error("[Utility Logger] Cannot Log Trade", takerTrade)
    }
}

$.logExecutions = function(trade, exchange){
    var date = Date.now().toLocaleString()

    if (trade.DealAmount > 0){
        executedTrades.push(
            [
                date.substring(0, date.length - 3),
                trade.label,
                trade.contract,
                trade.Id,
                exchange,
                trade.Type,
                trade.AvgPrice,
                trade.DealAmount,
                trade.fees
            ]
        )
        LogStatus('`' + JSON.stringify([blocksTable, blocksTableIds, tradesTable, posTable, volumeTable, latencyTable, currentStatusTable]) + '`')
    }
}

$.logPosition = function(exch1, exch2, exh1pos, exch2pos){
    positionHistory.push(
        [
            new Date().toLocaleString("da-DK"),
            exch1, 
            exch2,
            exh1pos,
            exch2pos, 
            _N(exh1pos + exch2pos, 3)

        ]
    )
    LogStatus('`' + JSON.stringify([blocksTable, blocksTableIds, tradesTable, posTable, volumeTable, latencyTable, currentStatusTable]) + '`')
}

$.logVolume = function(exch1, exch2, amt1, amt2){

    var volExchange1 = _G("accumulatedVolume"+ exch1) + amt1
    var volExchange2 = _G("accumulatedVolume"+ exch2) + amt2

    volumeHistory.push(
        [
            new Date().toLocaleString("da-DK"),
            exch1, 
            exch2,
            _N(amt1, 2), 
            _N(amt2, 2),
            _N(volExchange1, 2),
            _N(volExchange2, 2)
        ]
    )
    
    _G("accumulatedVolume" + exch1, volExchange1), 
    _G("accumulatedVolume" + exch2, volExchange2)

    LogStatus('`' + JSON.stringify([blocksTable, blocksTableIds, tradesTable, posTable, volumeTable, latencyTable, currentStatusTable]) + '`')
}

/* Latencies measured.
    Send Maker Latency -> latency from sending the order to the maker exchange. Status CREATING_MAKER to RECEIVING_MAKER
    Cancel Maker Latency -> latency from trying to cancel the order at the maker exchange. Status SENDING_CANCEL to RECEIVING_CANCEL
    Execution Report Latency  -> order was executed while the bot was trying to cancel it. Status CANCELLED_EXECUTION to CREATING_TAKER
    Sending Taker Latency -> latencry from sending the liquidation order to taker exchange. Status CREATING_TAKER to TAKER_LIVE
    Reaction Latency -> Composite latency from moment of transaction notification to sending taker. CANCELLED_EXECUTION to TAKER_LIVE
    Full Cycle Latency -> Composite latency from moment of transaction notification to full taker liquidation. CANCELLED_EXECUTION to START.
*/

$.logLatency = function (labelId, exchange, lat_mkr, lat_tkr, lat_mkr_cancel, lat_cyc, lat_er=0, lat_react=0){
  
    blocksLatency.push(
        [
            labelId, 
            exchange.GetName(), 
            lat_mkr, 
            lat_mkr_cancel,
            lat_er, 
            lat_tkr,
            lat_react,
            lat_cyc
        ]
    )

    LogStatus('`' + JSON.stringify([blocksTable, blocksTableIds, tradesTable, posTable, volumeTable, latencyTable, currentStatusTable]) + '`')
}

$.logTimestamps = function(labelId, exchange, loc, creating_maker, maker_live, cancelling_maker, cancelled_execution, creating_taker, taker_live, process_execution){

    // If order is executed before the bot tries to cancel these status are irrelevante
    if (loc < 2){
        cancelling_maker = maker_live
        cancelled_execution = maker_live
    }

    blocksLatencyV2.push(
        [
            labelId, 
            exchange.GetName(),
            creating_maker, 
            maker_live - creating_maker,
            cancelling_maker - maker_live,
            cancelled_execution - cancelling_maker,
            creating_taker - cancelled_execution,
            taker_live - creating_taker,
            process_execution - taker_live

        ]
    )

    LogStatus('`' + JSON.stringify([blocksTable, tradesTable, posTable, volumeTable, latencyTable, currentStatusTable]) + '`')

}

function logTradesCross(makerTrade, takerTrade, labelId, loc, route, lat_tkr, lat_cyc, tries, premiumTarget, discountTarget){

    if (makerTrade.side == 0 || makerTrade.side == "Buy"){
        buyTrade = makerTrade
        sellTrade = takerTrade
        buyExchange = makerTrade.exchange.GetName()
        sellExchange = takerTrade.exchange.GetName()
    }
    else if (makerTrade.side == 1 || makerTrade.side == "Sell"){
        buyTrade = takerTrade
        sellTrade = makerTrade
        buyExchange = takerTrade.exchange.GetName()
        sellExchange = makerTrade.exchange.GetName()
    }
    else if (takerTrade.side == 0 || takerTrade.side == "Buy"){
        buyTrade = takerTrade
        sellTrade = makerTrade
        buyExchange = makerTrade.exchange.GetName()
        sellExchange = takerTrade.exchange.GetName()
    }
    else if (takerTrade.side == 1 || takerTrade.side == "Sell"){
        buyTrade = makerTrade
        sellTrade = takerTrade
        buyExchange = takerTrade.exchange.GetName()
        sellExchange = makerTrade.exchange.GetName()
    }

    if (route == "route1" || route == "route2"){
        targetSpread = premiumTarget
    }
    else if (route == "route3" || route == "route4"){
        targetSpread = discountTarget
    }
    else {
        targetSpread = 0
    }

    var executedSpread = tradeSpreadCross(buyTrade, sellTrade)
    
    var cur_date = new Date() 
    //cur_date.setHours(d.getHours() - 4) 

    executedBlocksCross.push(
        [
            cur_date.toLocaleString("ja-JP"), // Date
            labelId, // Label Id
            buyExchange, // Buy exchange 
            executedSpread, // Spread %
            tradeSlippage(executedSpread, targetSpread), // Slippage
            _N(sellTrade.price - buyTrade.price, 4), // Spread $
            tradeValueCross(buyTrade, sellTrade), // Value $
            _N(buyTrade.price, 4), // Buy Price
            _N(sellTrade.price, 4), // Sell Price
            buyTrade.size, // Buy Size
            sellTrade.size, // Sell Size
            loc, // Location of liquidation initiation
            lat_cyc, // Total Cycle duration
            tries // Number of tries to liquidate
        ]
    )

    executedBlocksCrossIds.push(
        [
            cur_date.toLocaleString("da-DK", { timeZone: 'America/New_York' }),
            labelId,
            buyExchange,
            sellExchange,
            makerTrade.id,
            takerTrade.id,
            route
        ]
    )
}

function tradeSpreadCross(buyTrade, sellTrade) {
    return _N(((sellTrade.price / buyTrade.price - 1) * 100), 2)
}

function tradeValueCross(buyTrade, sellTrade){
    return _N((sellTrade.price * sellTrade.size) - (buyTrade.price * buyTrade.size), 2)
}

function tradeSlippage(executedSpread, targetSpread){
    var result = executedSpread - targetSpread
    return _N(result, 2)
}

function logTradesTriangular(makerTrade, takerTrade, conversionTrade, labelId, loc, lat){
    conversionPrice = _N(conversionTrade.price, 6)
    conversionSize = conversionTrade.size
    conversionId = conversionTrade.id

    executedTradesTriangular.push(
        [Date.now(),
            labelId,
            (makerTrade.side == 0 || makerTrade.side == "Sell" || makerTrade.side == "sell") ? "Buy" : "Sell",
            tradeSpreadTriangular(makerTrade, takerTrade, conversionTrade),
            makerTrade.price,
            takerTrade.price,
            conversionPrice,
            makerTrade.size,
            takerTrade.size,
            conversionSize,
            makerTrade.id,
            takerTrade.id,
            conversionTrade.id, 
            loc,
            lat
        ]
    )
}

function tradeSpreadTriangular(makerTrade, takerTrade, conversionTrade){
    var result = 0
    // if it is a triangular arbitrage trade
    if (conversionTrade && makerTrade && takerTrade) {
        if ((makerTrade.side == 1 || makerTrade.side == "Sell" || makerTrade.side == "sell")) {
            result = _N(((makerTrade.price / (takerTrade.price * conversionTrade.price) - 1) * 100), 2)
        } 
        else {
            result = _N((((takerTrade.price * conversionTrade.price) / makerTrade.price - 1) * 100), 2)
        }
    }
}


```

> 策略出处

https://www.fmz.com/strategy/209236

> 更新时间

2021-12-19 05:56:24
