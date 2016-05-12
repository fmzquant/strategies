/*
策略出处: https://www.botvs.com/strategy/11604
策略名称: RSI_now_sb_ok
策略作者: tfboys
策略描述:

RSI简单买卖测试, 默认 70-100卖出,0-30买入


参数             默认值  描述
----------  ------  ---------
RSIPeriod     14    RSI周期
SlidePrice     0.3  下单滑动值
RSIBuyL       50    RSI买入点(低)
RSIBuyH       50    RSI买入点(高)
RSISellL      50    RSI卖出点(低)
RSISellH      50    RSI卖出点(高)
Interval    1000    出错重试(毫秒)
*/

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function cancelPendingOrders() {
    while (true) {
        var orders = exchange.GetOrders();
        if (orders) {
            if (orders.length == 0) {
                break;
            }
            for (var j = 0; j < orders.length; j++) {
                exchange.CancelOrder(orders[j].Id);
                Sleep(Interval);
            }
        } else {
            Sleep(Interval);
        }
    }
}

function LogProfitTotal(initAcnt, acnt, tck) {
	var prft = acnt.Balance - initAcnt.Balance + (acnt.Stocks - initAcnt.Stocks) * tck.Last;
	LogProfit(prft, "#ff0000");
}

var STATE_WAIT_IDLE     = 0;
var STATE_BUY           = 1;
var STATE_SELL          = 2;
var STATE_WAIT_BUY      = 3;
var STATE_WAIT_SELL     = 4;
var STATE_BUY_COVER  	= 5;
var STATE_SELL_COVER 	= 6;



var State = STATE_WAIT_IDLE;

var InitAccount = null;
var EnterAcnt = null;

function MustGetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function onTick(exchange) {
    var records = exchange.GetRecords();
    if (!records || records.length < (RSIPeriod + 5)) {
        return;
    }

    rsi = TA.RSI(records, RSIPeriod);
    var rsiValue0 = rsi[records.length - 1];
	var rsiValue1 = rsi[records.length - 2];
	var rsiValue2 = rsi[records.length - 3];
	
	//开仓条件判断
    if (State == STATE_WAIT_IDLE && rsiValue1 >= RSIBuyL && rsiValue2 <= RSIBuyH && rsiValue1 > rsiValue2) {
        State = STATE_BUY;
		EnterAcnt = MustGetAccount();
    } else if (State == STATE_WAIT_IDLE && rsiValue2 >= RSISellL && rsiValue1 <= RSISellH && rsiValue2 > rsiValue1) {
        State = STATE_SELL;
		EnterAcnt = MustGetAccount();
    } else if (State != STATE_BUY && State != STATE_SELL && State != STATE_WAIT_BUY && State != STATE_WAIT_SELL && State != STATE_BUY_COVER && State != STATE_SELL_COVER){
        return;
    }
    
    // Buy or Sell, Cancel pending orders first
    cancelPendingOrders();
    
    var account = MustGetAccount();
    var ticker = exchange.GetTicker();
    if (!account || !ticker) {
        return;
    }

	//执行开仓
    if (State == STATE_BUY) {
        var price = ticker.Last + SlidePrice;
        var amount = adjustFloat(account.Balance / price);
        if (amount >= exchange.GetMinStock()) {
			exchange.Buy(price, amount);
        }
		else
		{
        	// No money, wait sell and log profit
        	Log("<--- Buy");
        	State = STATE_WAIT_SELL;
			return;
		}
    } else if(State == STATE_SELL) {
        if (account.Stocks > exchange.GetMinStock()) {
            exchange.Sell(ticker.Last - SlidePrice, account.Stocks);
        } 
		else 
		{
            // No stocks, wait buy and log profit
            Log("<--- Sell");
            State = STATE_WAIT_BUY;
			return;
        }
    }

	if(State != STATE_WAIT_BUY && State != STATE_WAIT_SELL && State != STATE_BUY_COVER && State != STATE_SELL_COVER)
		return;

	//平仓条件判断
	if (State == STATE_WAIT_BUY && rsiValue1 >= RSIBuyL && rsiValue2 <= RSIBuyH && rsiValue1 > rsiValue2) {
		State = STATE_BUY_COVER;
	} else if(State == STATE_WAIT_SELL && rsiValue2 >= RSISellL && rsiValue1 <= RSISellH && rsiValue2 > rsiValue1) {
		State = STATE_SELL_COVER;
	}else if(State != STATE_BUY_COVER && State != STATE_SELL_COVER) {
		return;
	}

	//执行平仓
    if (State == STATE_BUY_COVER) {
        var price = ticker.Last + SlidePrice;
		var stkTB = adjustFloat(EnterAcnt.Stocks - account.Stocks);
		var stkCB = adjustFloat(account.Balance / price);
        var amount = (stkTB < stkCB) ? stkTB : stkCB;
		
        if (amount >= exchange.GetMinStock()) {
			exchange.Buy(price, amount);
        }
		else
		{
        	// No money, wait idle and log profit
        	Log("<--- covers");
        	LogProfitTotal(InitAccount, account, ticker);
        	Log(account);
        	State = STATE_WAIT_IDLE;
		}
    } else if(State == STATE_SELL_COVER) {
    	var stkS = account.Stocks - EnterAcnt.Stocks;
        if (stkS > exchange.GetMinStock()) {
            exchange.Sell(ticker.Last - SlidePrice, stkS);
        } 
		else 
		{
            // No stocks, wait idle and log profit
            Log("<--- coverb");
            LogProfitTotal(InitAccount, account, ticker);
            Log(account);
            State = STATE_WAIT_IDLE;
        }
    }
}

function main() {
    InitAccount = MustGetAccount();
    Log(InitAccount);
    
    while (true) {
        onTick(exchange);
        Sleep(Interval);
    }
}
