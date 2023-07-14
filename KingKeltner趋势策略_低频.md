
> Name

KingKeltner趋势策略_低频

> Author

ipqhjjybj





> Source (javascript)

``` javascript
/*
策略出处: vnpy
策略名称: KingKeltner趋势策略
策略作者: ipqhjjybj
策略描述:
趋势跟踪策略

*/

KK_Length  			=	11	   // 计算通道中值的窗口数
kkDev 				=   1.3    // 计算通道宽度的偏差   
trailingPrcnt 		=   15    // 移动止损
LoopInterval  		=   60 	   // 轮询间隔(秒)
SlidePrice          =	0.3    // 滑动价(元)
function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function CancelPendingOrders() {
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(Interval);
        }

        if (orders.length == 0) {
            return;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id, orders[j]);
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
}

function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}

var intraTradeHigh		= 0;		// 移动最高价
var intraTradeLow		= 99999999; // 移动最低价
var LastBuyPrice		= 0;		// 上一次买的价格
var LastSellPrice		= 0;		// 上一次卖的价格
var minMoney			= 100;		// 如果资金小于该数值，则不买入
var LastRecord 			= null;		// 初始化上一个记录
function onTick(exchange) {

	var ticker = GetTicker();
    // Buy or Sell, Cancel pending orders first
    CancelPendingOrders();
    var account = GetAccount();

    if (true) {
        var records = exchange.GetRecords();
        if (!records || records.length < (KK_Length + 3)) {
            return;
        }
        // Price not change
        var newLast = records[records.length-1];
        if ((!LastRecord) || (LastRecord.Time == newLast.Time && LastRecord.Close == newLast.Close)) {
            LastRecord = newLast;
            return;
        }
        LastRecord = newLast;

        //Log(newLast);
        var kk_ATR = TA.ATR(records , KK_Length);
        var kk_Mid = TA.MA(records, KK_Length);
        var kk_Up  = kk_Mid[kk_Mid.length-1] + kk_ATR[kk_ATR.length-1] * kkDev;
        //var kk_Down= kk_Mid - kk_ATR * kkDev

        //Log("LastRecord.Close",LastRecord.Close ,"kk_up",kk_Up,"intraTradeHigh",intraTradeHigh);
        if( account.Stocks <= exchange.GetMinStock() ){
        	if(LastRecord.Close > kk_Up){
        		Log("start buy");
        		var price = ticker.Last + SlidePrice;
		        var amount = adjustFloat(account.Balance / price);
		        if (account.Balance > minMoney && amount >= exchange.GetMinStock()) {
		        	if (exchange.Buy(price, amount, "做多")) {
		        		intraTradeHigh = LastRecord.High
        				intraTradeLow  = LastRecord.Low
		        		LastBuyPrice = LastHighPrice = price;
		        	}
		        } 
        	}
        }
        else if( exchange.GetMinStock() < account.Stocks ){
        	Log("Close",LastRecord.Close, "intraTradeHigh",intraTradeHigh ,"intraTradeHigh * ( 1 - trailingPrcnt)",intraTradeHigh * ( 1 - trailingPrcnt/100.0))
        	intraTradeHigh = Math.max(intraTradeHigh , LastRecord.High)
        	intraTradeLow  = LastRecord.Low
        	if(LastRecord.Close < intraTradeHigh * ( 1 - trailingPrcnt/100.0)){	// 移动止损
        		Log("start sell");
        		var price = ticker.Last - SlidePrice;
		    	var sellAmount = account.Stocks;
		    	if (sellAmount > exchange.GetMinStock()) {
		    		exchange.Sell(ticker.Last - SlidePrice, sellAmount, "卖出");
		    		LastSellPrice = LastLowPrice = price;
		    	} 
        	}
        }
    }
}


function main() {
    InitAccount = GetAccount();
    Log(exchange.GetName(), exchange.GetCurrency(), InitAccount);

    LoopInterval = Math.max(LoopInterval, 1);  
    while (true) {
        onTick(exchange);
        Sleep(LoopInterval*1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/42283

> Last Modified

2017-06-02 23:06:08
