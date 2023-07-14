
> Name

Shannons-Demon

> Author

FawkesPan



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|DELAY|30|平衡间隔|
|DS|1.04|Sell|
|DB|1.08|Buy|
|RSIB|80|RSI Buy|
|RSIS|20|RSI Sell|


> Source (javascript)

``` javascript
/*

 Shannon's Demon Demo Code

 Copyright 2018 FawkesPan
 Contact : i@fawkex.me / Telegram@FawkesPan

 Do What the Fuck You Want To Public License

*/


function onTick(){
    var Account = exchange.GetAccount();
    var Depth = exchange.GetDepth();
    var Buy = Depth.Asks[1].Price;
    var Sell = Depth.Bids[1].Price;
    var StockValue = Account.Stocks * Buy;
    var TotalValue = Account.Balance + StockValue;
    var Half = TotalValue / 2;
    var Records = exchange.GetRecords(PERIOD_M1);
    var RSI = TA.RSI(Records, 14);
    //Log("StockValue:", StockValue ," TotalValue:", TotalValue);
    var LastRSI = RSI[RSI.length -1];
    //Log(LastRSI);
    if (StockValue / Half > DS && LastRSI > RSIS) {
        Log("StockValue:", StockValue ," TotalValue:", TotalValue);
        Log("StockValue Too High. Re Balancing...");
        var ToBeSold = (Account.Stocks * Buy - Account.Balance) / 2 / Buy;
        Log(exchange.Sell(Buy,ToBeSold));
        Sleep(DELAY*1000*5);
    }
    if (Half / StockValue > DB && LastRSI < RSIB) {
        Log("StockValue:", StockValue ," TotalValue:", TotalValue);
        Log("StockValue Too Low. Re Balancing...");
        var ToBeBought = (Account.Balance - Account.Stocks * Buy) / 2 / Sell;
        Log(exchange.Buy(Sell,ToBeBought));
        Sleep(DELAY*1000*5);
    }
}
function main(){
    while(true){
        onTick();
        Sleep(DELAY*1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/64455

> Last Modified

2018-08-30 03:04:37
