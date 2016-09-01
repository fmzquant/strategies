/*
策略出处: https://www.botvs.com/strategy/358
策略名称: 高频交易策略之 - Penny Jump
策略作者: Zero
策略描述:

今天假设有一个笨笨的大型机构投资人（共同基金，银行，退休基金….），他想要买进一只股票，但又不想挂市价买进，所以就在市场里面挂了一张要买进的大单。这时候所有市场里面的人都会看的到limit order book里面有人挂进了大单准备要买进这只股票。

假设市场本来的order book是200 | $1.01 x $1.03 | 200，然后突然这个笨笨的机构投资人进来挂了一张3000股$1.01 的买单，这时候order book会变成3,200 | $1.01 x $1.03 | 200。而我们通常称这个笨笨的机构投资人为”大象，elephant”，而高频交易者知道$1.01的价位有支撑的买单，所以便会把他们的bid price提高1美分到$1.02，而这样的策略就叫做Penny Jump。因为高频交易者知道往下一档的地方，有一只”大象”在支撑着。所以如果价格往上涨到$1.03 x $1.05的话，他就可以马上赚取$0.01的利润。

如果高频交易商买进这只股票之后，就算价格没有往上涨的话，因为下面有一只大象在支撑着，所以他也可以很快的反手用$1.01的价位卖给这只大象。

对于高频交易商来说，他们获利的方法其实也很简单，就是由市场上的微结构(microstrucutre)来推测交易对手的意图，然后抢先他人一步建立部位。然后在短时间之内赚取微小利润，再迅速离开市场。

对于这只大象来说，他因为在市场里面挂了一张巨量的买单，所以暴露了他的交易意图，自然就变成高频交易者猎杀的目标。

而在现实的股票交易世界里面，应该很少有这种笨笨的机构投资人会明目张胆的在市场上挂出巨量的买单（或卖单）。反而常见的是大型机构投资人，想要出脱一只股票，所以故意挂出巨量的买单来制造假象，来吸引高频交易者进场来推升股价，然后再一股脑的把货倒出来，而这就是交易世界里面的尔虞我 诈。

对于高频交易商来说，一旦这个策略被看穿而被”对作,Gaming”，则他们就又会回头来”反对作”，发展策略来吃这种机构投资人”对作”的豆腐。

附图: 

https://dn-filebox.qbox.me/33ecc8cd888b2918dcfb4044913c3c89a4cd4061.jpg


参数              默认值    描述
--------------  -----  ----------
Interval        2000   出错重试间隔(毫秒)
Lot             0.01   手数
DisableLog      false  关闭订单跟踪
ElephantAmount  10     大象级别(BTC)
ElephantSpace   0.2    大象距离(元)
LockCount       true   大象确定次数
PennyTick       0.1    跳
WaitInterval    5000   买单超时(毫秒)
CheckInterval   300    快速检测间隔(毫秒)
ProfitTick      5      利润跳数
STTick          true   止损跳数
*/


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
