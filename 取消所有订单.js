/*
策略出处: https://www.botvs.com/strategy/280
策略名称: 取消所有订单
策略作者: Zero
策略描述:

取消所有订单

*/

var Interval = 1000;

function GetAccount(e) {
    if (typeof(e) == 'undefined') {
        e = exchange;
    }
    var account;
    while (!(account = e.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function cancelPending(e) {
    Log(e.GetName(), GetAccount(e));
    var ret = false;
    var isFutures = e.GetName().indexOf("796") != -1;
    while (true) {
        if (ret) {
            Sleep(Interval);
        }
        var orders = null;
        while (!(orders = e.GetOrders())) {
            Sleep(Interval);
        }

        if (orders.length == 0) {
            break;
        }

        for (var j = 0; j < orders.length; j++) {
            if (isFutures) {
                e.SetDirection(orders[j].Type == ORDER_TYPE_BUY ? "buy" : "sell");
            }
            e.CancelOrder(orders[j].Id, orders[j]);
            ret = true;
        }
    }
    Log(e.GetName(), GetAccount(e));
    return ret;
}

function main() {
    for (var i = 0; i < exchanges.length; i++) {
        cancelPending(exchanges[i]);
    }
}
