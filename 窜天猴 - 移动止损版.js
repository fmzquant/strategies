/*
策略出处: https://www.botvs.com/strategy/13594
策略名称: 窜天猴 - 移动止损版
策略作者: Zero
策略描述:

普及下移动止损的概念, 策略学习使用, 实盘慎用 !


参数                  默认值  描述
----------------  -----  ---------
FastPeriod         5     入市快线周期
SlowPeriod        15     入市慢线周期
EnterPeriod        2     入市观察期
PositionRatio      0.8   仓位比例
TrailingStopLoss   0.02  移动止损(百分比)
StopLoss           0.01  止损(百分比)
Interval          10     轮询周期(秒)
*/

function main() {
    var STATE_IDLE  = -1;
    var state = STATE_IDLE;
    var initAccount = $.GetAccount();
    Log(initAccount);
    var pos = null;
    var table = {
        type : 'table',
        title : '账户信息',
        cols : ['阶段', '钱', '币'],
        rows : [['初始', initAccount.Balance, initAccount.Stocks], ['当前', 0, 0]],
    };
    while (true) {
        var status = '';
        var nowAccount = null;
        if (state === STATE_IDLE) {
            var n = $.Cross(FastPeriod, SlowPeriod);
            if (Math.abs(n) >= EnterPeriod) {
                var opAmount = parseFloat((initAccount.Stocks * PositionRatio).toFixed(3));
                pos = n > 0 ? $.Buy(opAmount) : $.Sell(opAmount);
                if (pos) {
                    opAmount = pos.amount;
                    pos.stopLossPrice = n > 0 ? (pos.price * (1-StopLoss)) : (pos.price * (1 + StopLoss));
                    pos.holdProfitPrice = n > 0 ? (pos.price * (1+TrailingStopLoss)) : (pos.price * (1 - TrailingStopLoss));
                    state = n > 0 ? PD_LONG : PD_SHORT;
                    Log("开仓详情", pos, "交叉周期", n);
                }
            }
        } else {
            var ticker = exchange.GetTicker();
            if (!ticker) {
                Sleep(Interval*1000);
                continue;
            }
            var dynamicProfit = 0;
            var shouldCover = false;
            var enableTS = false;
            if (state === PD_LONG) {
                dynamicProfit = (ticker.Last - pos.price) * pos.amount;
                if (ticker.Last > pos.holdProfitPrice) {
                    pos.stopLossPrice = pos.holdProfitPrice * (1-StopLoss);
                    pos.holdProfitPrice += (pos.price * TrailingStopLoss);
                    enableTS = true;
                }
                shouldCover = ticker.Last < pos.stopLossPrice;
            } else {
                dynamicProfit = (pos.price - ticker.Last) * pos.amount;
                if (ticker.Last < pos.holdProfitPrice) {
                    pos.stopLossPrice = pos.holdProfitPrice * (1+StopLoss);
                    pos.holdProfitPrice -= (pos.price * TrailingStopLoss);
                    enableTS = true;
                }
                shouldCover = ticker.Last > pos.stopLossPrice;
            }
            if (enableTS) {
                Log("触发移动止损, 锁定利润百分比:", _N(Math.abs((pos.price-ticker.Last)/pos.price)) + '%', "当前价格:", ticker.Last, "持仓盈亏:", dynamicProfit);
            }
            status = ["持仓类型", (state === PD_LONG ? "多仓" : "空仓"), "持仓均价:", pos.price, "数量:", pos.amount, "浮动盈亏:", _N(dynamicProfit), "止损价:", pos.stopLossPrice].join(' ');
            if (status.length > 0) {
                status += '\n';
            }
            if (shouldCover) {
                Log("止损, 持仓均价:", pos.price, "数量:", pos.amount, "浮动盈亏:", _N(dynamicProfit), "最后成交价:", ticker.Last);
                nowAccount = $.GetAccount();
                var obj = state === PD_LONG ? $.Sell(nowAccount.Stocks - initAccount.Stocks) : $.Buy(initAccount.Stocks - nowAccount.Stocks);
                state = STATE_IDLE;
                nowAccount = $.GetAccount();
                LogProfit(nowAccount.Balance - initAccount.Balance, '钱:', nowAccount.Balance, '币:', nowAccount.Stocks, '平仓详情:', obj, "交叉周期", n);
            }
        }
        if (!nowAccount) {
            nowAccount = $.GetAccount();
        }
        if (nowAccount.Balance !== table.rows[1][1] || nowAccount.Stocks !== table.rows[1][2]) {
            table.rows[1] = ['当前 #ff0000', nowAccount.Balance, nowAccount.Stocks];
        }
        status += '`'+JSON.stringify(table)+'`';
        LogStatus(status);
            
        Sleep(Interval*1000);
    }
}
