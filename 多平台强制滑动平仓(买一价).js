/*
策略出处: https://www.botvs.com/strategy/99
策略名称: 多平台强制滑动平仓(买一价)
策略作者: Zero
策略描述:

支持多平台一块平仓, 有多少币卖多少币


参数             默认值    描述
-------------  -----  -------
RetryInterval  5      尝试间隔(秒)
SlidePrice     0.3    滑动值
KeepStock      false  保留币数
*/


function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(2000);
    }
    return account;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(2000);
    }
    return ticker;
}

function cancelAllOrders() {
    var orders = null;
    while (!(orders = exchange.GetOrders())) {
        Sleep(Interval);
    }
    
    if (orders.length > 0) {
        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
            if (j < (orders.length-1)) {
                Sleep(2000);
            }
        }
    }
}

function sellAll() {
    cancelAllOrders();
    var initAccount = GetAccount();
    Log(exchange.GetName(), exchange.GetCurrency(), initAccount);
    if (initAccount.Stocks == 0) {
        Log("空仓");
        return;
    }
    var remaind = initAccount.Stocks - KeepStock;
    var account = initAccount;
    while (remaind >= exchange.GetMinStock()) {
        var ticker = GetTicker();
        exchange.Sell(ticker.Buy - SlidePrice, remaind);
        Sleep(RetryInterval * 1000);
        cancelAllOrders();
        account = GetAccount();
        remaind = account.Stocks - KeepStock;
    }
    Log("平均卖出价", (account.Balance - initAccount.Balance) / (initAccount.Stocks - account.Stocks));
    Log(account);
}

function main() {
    for (var i = 0; i < exchanges.length; i++) {
        exchange = exchanges[i];
        sellAll();
    }
} 

