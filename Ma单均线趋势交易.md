
> 策略名称

Ma单均线趋势交易

> 策略作者

ipqhjjybj





> 源码 (javascript)

``` javascript
/*
策略出处: internet
策略名称: MA 单均线趋势策略
策略作者: ipqhjjybj
策略描述: 均线向上做多，均线向下做空 , bitcoin只做多
趋势跟踪策略

*/

MA_Length  			=	120	   // 计算通道中值的窗口数  
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

var minMoney			= 100;		// 如果资金小于该数值，则不买入
var LastRecord 			= null;		// 初始化上一个记录


function onTick(exchange) {

	var ticker = GetTicker();
    // Buy or Sell, Cancel pending orders first
    CancelPendingOrders();
    var account = GetAccount();

    if (true) {
        var records = exchange.GetRecords();
        if (!records || records.length < (MA_Length + 3)) {
            return;
        }
        // Price not change
        var newLast = records[records.length-1];
        if ((!LastRecord) || (LastRecord.Time == newLast.Time && LastRecord.Close == newLast.Close)) {
            LastRecord = newLast;
            return;
        }
        LastRecord = newLast;

        var kk_MA = TA.MA(records , MA_Length);

        var ma_inc = kk_MA[kk_MA.length-1] / kk_MA[kk_MA.length-2];

        Log( "kk_MA 1", kk_MA[kk_MA.length-1] , "kk_MA 2", kk_MA[kk_MA.length-2] )
        //Log(newLast);
        // var kk_ATR = TA.ATR(records , KK_Length);
        // var kk_Mid = TA.MA(records, KK_Length);
        // var kk_Up  = kk_Mid[kk_Mid.length-1] + kk_ATR[kk_ATR.length-1] * kkDev;
        //var kk_Down= kk_Mid - kk_ATR * kkDev

        //Log("LastRecord.Close",LastRecord.Close ,"kk_up",kk_Up,"intraTradeHigh",intraTradeHigh);
        if( account.Stocks <= exchange.GetMinStock() ){
        	if(ma_inc > 1.000001){

        		var price = ticker.Last + SlidePrice;
		        var amount = adjustFloat(account.Balance / price);
		        if (account.Balance > minMoney && amount >= exchange.GetMinStock()) {
		        	Log("start buy");
		        	if (exchange.Buy(price, amount, "做多")) {
		        		LastBuyPrice = LastHighPrice = price;
		        	}
		        } 
        	}
        }
        else if( exchange.GetMinStock() < account.Stocks ){
        	if(ma_inc < 0.999999){	// 移动止损
        		var price = ticker.Last - SlidePrice;
		    	var sellAmount = account.Stocks;
		    	if (sellAmount > exchange.GetMinStock()) {
		    		Log("start sell");
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

> 策略出处

https://www.fmz.com/strategy/42451

> 更新时间

2017-06-04 21:55:07
