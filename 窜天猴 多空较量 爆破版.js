/*
策略出处: https://www.botvs.com/strategy/13597
策略名称: 窜天猴 多空较量 爆破版
策略作者: Zero
策略描述:

- 依靠多空力量做为开仓条件
- 固定的止盈止损点
- 名子是乱起的, 学习使用, 实盘慎用


参数             默认值    描述
-------------  -----  ---------
DepthLevel     5      盘口统计深度
EnterPeriod    2      观察周期
CalcInterval   10     观察轮询周期(秒)
DiffRatio      2.1    币量倍数
PositionRatio  0.8    仓位比例
StopProfit     0.02   止盈(百分比)
StopLoss       0.01   止损(百分比)
Interval       true   价格轮询周期(秒)
*/

function calcDepth(orders) {
    var base = parseInt(orders[0].Price);
    var allAmount = 0;
    var n = 0;
    for (var i = 0; i < orders.length && n < DepthLevel; i++) {
        var p = parseInt(orders[i].Price);
        if (p != base) {
            n++;
            base = p;
        }
        allAmount += orders[i].Amount;
    }
    return allAmount;
}

function main() {
    var STATE_IDLE  = -1;
    var state = STATE_IDLE;
    var initAccount = $.GetAccount();
    Log(initAccount);
    var pos = null;
    while (true) {
        Sleep(Interval*1000);
        if (state === STATE_IDLE) {
            var n = 0;
            while (Math.abs(n) < EnterPeriod) {
                var depth = exchange.GetDepth();
                if (!depth || depth.Asks.length < DepthLevel || depth.Bids.length < DepthLevel) {
                    Sleep(Interval * 1000);
                    continue;
                }

                var asksAmount = calcDepth(depth.Asks);
                var bidsAmount = calcDepth(depth.Bids);
                var ratio = Math.max(asksAmount/bidsAmount, bidsAmount/asksAmount);
                if (ratio > DiffRatio) {
                    if (asksAmount > bidsAmount) {
                        n = n < 0 ? 0 : n+1;
                    } else {
                        n = n > 0 ? 0 : n-1;
                    }
                } else {
                    n = 0;
                }
                LogStatus("买量:", _N(asksAmount), "卖量:", _N(bidsAmount), "比例: ", _N(ratio * 100, 4) + '%', "持续周期:", n);
                Sleep(CalcInterval * 1000);
            }
            var opAmount = parseFloat((initAccount.Stocks * PositionRatio).toFixed(3));
            pos = n > 0 ? $.Buy(opAmount) : $.Sell(opAmount);
            if (pos) {
                opAmount = pos.amount;
                pos.stopLossPrice = n > 0 ? (pos.price * (1-StopLoss)) : (pos.price * (1 + StopLoss));
                pos.stopProfitPrice = n > 0 ? (pos.price * (1+StopProfit)) : (pos.price * (1 - StopProfit));
                state = n > 0 ? PD_LONG : PD_SHORT;
                Log("开仓详情", pos);
            }
        } else {
            var ticker = exchange.GetTicker();
            if (!ticker) {
                continue;
            }
            var dynamicProfit = (state === PD_LONG ? (ticker.Last - pos.price) : (pos.price - pos.price)) * pos.amount;
            LogStatus("持仓类型", (state === PD_LONG ? "多仓" : "空仓"), "持仓均价:", pos.price, "数量:", pos.amount, "浮动盈亏:", _N(dynamicProfit), "止损价:", pos.stopLossPrice, "止盈价:", pos.stopProfitPrice);
            if ((state === PD_LONG && ((ticker.Last > pos.stopProfitPrice) || (ticker.Last < pos.stopLossPrice))) ||
                (state === PD_SHORT && ((ticker.Last < pos.stopProfitPrice) || (ticker.Last > pos.stopLossPrice))) ){
                Log("止损, 持仓均价:", pos.price, "数量:", pos.amount, "浮动盈亏:", _N(dynamicProfit), "最后成交价:", ticker.Last);
                var nowAccount = $.GetAccount();
                var obj = state === PD_LONG ? $.Sell(nowAccount.Stocks - initAccount.Stocks) : $.Buy(initAccount.Stocks - nowAccount.Stocks);
                state = STATE_IDLE;
                nowAccount = $.GetAccount();
                LogProfit(nowAccount.Balance - initAccount.Balance, '钱:', nowAccount.Balance, '币:', nowAccount.Stocks, '平仓详情:', obj, "交叉周期", n);
            }
        }
    }
}
