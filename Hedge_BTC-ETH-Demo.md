
> Name

Hedge_BTC-ETH-Demo

> Author

发明者量化-小小梦

> Strategy Description

A cross-asset hedging concept demo for BTC and ETH.

It plots the price ratio to analyze how the ratio changes and to look for potential arbitrage opportunities.

The feasibility of the strategy is still unknown, but anyone interested is welcome to study it further.

by littleDream
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Mode|0|Mode: BOLL|SMA|


> Source (javascript)

``` javascript
/*exchanges
A : BTC
B : ETH
*/

var RateUpDateTime = new Date().getTime()
var UpDateCyc = 60 * 60 * 1000
var SumInCyc = 0
var AddCounts = 1
var RateArray = []

var BTC_hold_amount = 0
var ETH_hold_amount = 0

var IDLE = 0
var PLUS = 1
var STATE = IDLE

var fee_btc = {
    buy : 0.2,    // 0.2 % , 千分之四
    sell : 0.2
}

var fee_eth = {
    buy : 0.2,
    sell : 0.2
}

var ModeStr = ["BOLL", "SMA"][Mode]

function CalcPriceForNoFee(price, fee, type){
    if(type == "buy"){
        return price * (1 - fee / 100)
    }else if(type == "sell"){
        return price * (1 + fee / 100)
    }
}

function loop(nowTime){
    var depthA = exchanges[0].GetDepth()
    var depthB = exchanges[1].GetDepth()
    var sma120 = null
    var sma10 = null
    
    var boll = null
    
    if(!depthA || !depthB || depthA.Asks.length == 0 || depthA.Bids.length == 0 || depthB.Asks.length == 0 || depthB.Bids.length == 0){
        return    
    }
    
    var Rate = CalcPriceForNoFee((depthA.Bids[0].Price + depthA.Asks[0].Price) / 2, 0.2, "buy") / CalcPriceForNoFee((depthB.Bids[0].Price + depthB.Asks[0].Price) / 2, 0.2, "sell") 
        
    if(nowTime - RateUpDateTime > UpDateCyc){
        RateArray.push(Rate)
        
        $.PlotLine("avgRate", RateArray[RateArray.length - 2], RateUpDateTime)
        
        if(RateArray.length > 60){
            if(ModeStr == "SMA"){
                sma120 = talib.SMA(RateArray, 60)
                sma10 = talib.SMA(RateArray, 10)
            
                $.PlotLine("sma120", sma120[sma120.length - 2], RateUpDateTime)
                $.PlotLine("sma10", sma10[sma10.length - 2], RateUpDateTime)
            }else if(ModeStr == "BOLL"){            
                boll = TA.BOLL(RateArray, 20, 2.5)
                $.PlotLine("up", boll[0][boll[0].length - 2], RateUpDateTime)
                $.PlotLine("down", boll[2][boll[2].length - 2], RateUpDateTime)
            }
        }
        
        RateUpDateTime += UpDateCyc
        SumInCyc = 0
        AddCounts = 1
    }else{
        SumInCyc += Rate
        AddCounts++
        
        RateArray[RateArray.length - 1] = (SumInCyc / AddCounts)
        
        $.PlotLine("avgRate", RateArray[RateArray.length - 1], RateUpDateTime)
        if(RateArray.length > 60){
            if(ModeStr == "SMA"){
                sma120 = talib.SMA(RateArray, 60)
                sma10 = talib.SMA(RateArray, 10)
            
                $.PlotLine("sma120", sma120[sma120.length - 1], RateUpDateTime)
                $.PlotLine("sma10", sma10[sma10.length - 1], RateUpDateTime)
            }else if(ModeStr == "BOLL"){          
                boll = TA.BOLL(RateArray, 20, 2.5)
                $.PlotLine("up", boll[0][boll[0].length - 1], RateUpDateTime)
                $.PlotLine("down", boll[2][boll[2].length - 1], RateUpDateTime)
            }
        }
    }
    
    if(ModeStr == "SMA"){
        if(STATE == IDLE && (sma120 && sma10) && sma120[sma120.length - 2] > sma10[sma10.length - 2] && sma120[sma120.length - 1] < sma10[sma10.length - 1]){
            // PLUS
            var SellInfo = $.Sell(exchanges[1], 5)
            var sumMoney = SellInfo.price * SellInfo.amount
            var amount = _N(sumMoney / depthA.Asks[0].Price, 2)
            var BuyInfo = $.Buy(exchanges[0], amount)
        
            ETH_hold_amount = SellInfo.amount
            BTC_hold_amount = amount
            STATE = PLUS
            // throw "stop"  // ceshi
        }
    
        if(STATE == PLUS && (sma120 && sma10) && sma120[sma120.length - 2] < sma10[sma10.length - 2] && sma120[sma120.length - 1] > sma10[sma10.length - 1]){
            // COVER
            var BuyInfo = $.Buy(exchanges[1], ETH_hold_amount)
            var SellInfo = $.Sell(exchanges[0], BTC_hold_amount)
        
            ETH_hold_amount = 0
            BTC_hold_amount = 0
            STATE = IDLE
            Log(exchanges[0].GetAccount(), exchanges[1].GetAccount())
        }
    }
}




function main() {
    var AccountA = exchanges[0].GetAccount()
    var AccountB = exchanges[1].GetAccount()
    
    Log("AccountA:", AccountA, "AccountB:", AccountB)
    
    while(true){
        var beginTime = new Date().getTime()
        loop(beginTime)
        Sleep(500)
    }

}
```

> Detail

https://www.fmz.com/strategy/48536

> Last Modified

2017-07-25 13:19:52
