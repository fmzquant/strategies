
> Name

Penny-Jump

> Author

Zero

> Strategy Description

Assume a large institutional investor such as a mutual fund, bank, or pension fund wants to buy a stock but does not want to use a market order. Instead, it places a very large bid in the order book. Everyone in the market can then see that there is a sizable limit order waiting to buy the stock.

Suppose the original order book is 200 | $1.01 x $1.03 | 200. If that investor suddenly posts a bid for 3,000 shares at $1.01, the order book becomes 3,200 | $1.01 x $1.03 | 200. This large passive buyer is often called an "elephant." High-frequency traders know there is strong support at $1.01, so they step ahead of the elephant by raising their bid one tick to $1.02. That tactic is called Penny Jump. If the market then moves up to $1.03 x $1.05, they can quickly earn $0.01.

Even if the price does not rise after the high-frequency trader buys, the elephant below still provides support, so the trader may still be able to sell back to the elephant at $1.01.

For high-frequency traders, the profit model is straightforward: infer counterparty intent from market microstructure, establish a position ahead of slower participants, capture a small profit quickly, and exit fast.

For the elephant, posting such a large visible order reveals its trading intent and naturally turns it into a target for high-frequency traders.

In real equity markets, truly naive institutions rarely expose themselves so openly with a huge buy or sell order. More often, a large participant that wants to unload stock may intentionally place a large bid to create a false impression, lure high-frequency traders into pushing the price higher, and then sell into that strength. This is part of the strategic deception common in trading.

And once high-frequency traders realize they are being gamed, they in turn adapt and develop strategies to profit from those institutions again.

Illustration:

https://dn-filebox.qbox.me/33ecc8cd888b2918dcfb4044913c3c89a4cd4061.jpg

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Interval|2000|Retry interval after error (ms)|
|Lot|0.01|Lot size|
|DisableLog|false|Disable order tracking logs|
|ElephantAmount|10|Elephant threshold (BTC)|
|ElephantSpace|0.2|Elephant distance (quote currency)|
|LockCount|true|Elephant confirmation count|
|PennyTick|0.1|Jump tick|
|WaitInterval|5000|Buy order timeout (ms)|
|CheckInterval|300|Fast check interval (ms)|
|ProfitTick|5|Profit ticks|
|STTick|true|Stop-loss ticks|


> Source (javascript)

``` javascript

var Counter = {
    i: 0,
    w: 0,
    f: 0
};

// Variables
var InitAccount = null;

function CancelAll() {
    while (true) {
        var orders = _C(exchange.GetOrders);
        if (orders.length == 0) {
            break;
        }
        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
        }
        Sleep(Interval);
    }
}

function updateStatus(msg) {
    LogStatus("调戏次数:", Counter.i, "成功:", Counter.w, "失败:", Counter.f, "\n"+msg+"#0000ff\n"+new Date());
}

function main() {
    if (DisableLog) {
        EnableLog(false);
    }
    CancelAll();
    InitAccount = _C(exchange.GetAccount);
    Log(InitAccount);
    var i = 0;
    var locks = 0;
    while (true) {
        Sleep(Interval);
        var depth = _C(exchange.GetDepth);
        if (depth.Asks.length === 0 || depth.Bids.length === 0) {
            continue;
        }
        updateStatus("搜索大象中.... 买一: " + depth.Bids[0].Price + ",  卖一:" + depth.Asks[0].Price + ", 锁定次数: " + locks);
        var askPrice = 0;
        for (i = 0; i < depth.Asks.length; i++) {
            if (depth.Asks[i].Amount >= Lot) {
                askPrice = depth.Asks[i].Price;
                break;
            }
        }
        if (askPrice === 0) {
            continue;
        }
        var elephant = null;
        // skip Bids[0]
        for (i = 1; i < depth.Bids.length; i++) {
            if ((askPrice - depth.Bids[i].Price) > ElephantSpace) {
                break;
            }
            if (depth.Bids[i].Amount >= ElephantAmount) {
                elephant = depth.Bids[i];
                break;
            }
        }

        if (!elephant) {
            locks = 0;
            continue;
        }
        locks++;
        if (locks < LockCount) {
            continue;
        }
        locks = 0;

        updateStatus("调戏大象中....大象在第" + i + "档, " + JSON.stringify(elephant));
        exchange.Buy(elephant.Price + PennyTick, Lot, "Bids[" + i + "]", elephant);
        var ts = new Date().getTime();
        while (true) {
            Sleep(CheckInterval);
            var orders = _C(exchange.GetOrders);
            if (orders.length == 0) {
                break;
            }
            if ((new Date().getTime() - ts) > WaitInterval) {
                for (var i = 0; i < orders.length; i++) {
                    exchange.CancelOrder(orders[i].Id);
                }
            }
        }
        var account = _C(exchange.GetAccount);
        var opAmount = _N(account.Stocks - InitAccount.Stocks);
        if (opAmount < 0.001) {
            Counter.f++;
            Counter.i++;
            continue;
        }
        updateStatus("买单得手: " + opAmount +", 开始出手...");
        exchange.Sell(elephant.Price + (PennyTick * ProfitTick), opAmount);
        var success = true;
        while (true) {
            var depth = _C(exchange.GetDepth);
            if (depth.Bids.length > 0 && depth.Bids[0].Price <= (elephant.Price-(STTick*PennyTick))) {
                success = false;
                updateStatus("没有得手, 开始止损, 当前买一: " + depth.Bids[0].Price);
                CancelAll();
                account = _C(exchange.GetAccount);
                var opAmount = _N(account.Stocks - InitAccount.Stocks);
                if (opAmount < 0.001) {
                    break;
                }
                exchange.Sell(depth.Bids[0].Price, opAmount);
            }
            var orders = _C(exchange.GetOrders);
            if (orders.length === 0) {
                break;
            }
            Sleep(CheckInterval);
        }
        if (success) {
            Counter.w++;
        } else {
            Counter.f++;
        }
        Counter.i++;
        var account = _C(exchange.GetAccount);
        LogProfit(account.Balance - InitAccount.Balance, account);
    }
}
```

> Detail

https://www.fmz.com/strategy/358

> Last Modified

2016-08-27 10:37:36
