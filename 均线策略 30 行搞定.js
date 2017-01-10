/*
策略出处: https://www.botvs.com/strategy/12348
策略名称: 均线策略 30 行搞定
策略作者: Zero
策略描述:

"Talk is cheap. Show me the code"

教学性质, 实盘慎用.


注: ` 策略使用了交易模板类库`

`希望新手从此策略入门, 一步步学习编写策略, 并体验到模拟与真实环境对交易系统的影响`

https://dn-filebox.qbox.me/fb4d0c7d773ca83e9d0230927705d419dc0bbeaa.png


参数              默认值    描述
--------------  -----  -------
FastPeriod      5      入市快线周期
SlowPeriod      15     入市慢线周期
EnterPeriod     2      入市观察期
ExitFastPeriod  7      离市快线周期
ExitSlowPeriod  15     离市慢线周期
ExitPeriod      true   离市观察期
PositionRatio   0.8    仓位比例
Interval        10     轮询周期(秒)
*/

function main() {
    var STATE_IDLE  = -1;
    var state = STATE_IDLE;
    var initAccount = $.GetAccount();
    Log(initAccount);
    while (true) {
        if (state === STATE_IDLE) {
            var n = $.Cross(FastPeriod, SlowPeriod);
            if (Math.abs(n) >= EnterPeriod) {
                var opAmount = parseFloat((initAccount.Stocks * PositionRatio).toFixed(3));
                var obj = n > 0 ? $.Buy(opAmount) : $.Sell(opAmount);
                if (obj) {
                    opAmount = obj.amount;
                    state = n > 0 ? PD_LONG : PD_SHORT;
                    Log("开仓详情", obj, "交叉周期", n);
                }
            }
        } else {
            var n = $.Cross(ExitFastPeriod, ExitSlowPeriod);
            if (Math.abs(n) >= ExitPeriod && ((state === PD_LONG && n < 0) || (state === PD_SHORT && n > 0))) {
                var nowAccount = $.GetAccount();
                var obj = state === PD_LONG ? $.Sell(nowAccount.Stocks - initAccount.Stocks) : $.Buy(initAccount.Stocks - nowAccount.Stocks);
                state = STATE_IDLE;
                nowAccount = $.GetAccount();
                LogProfit(nowAccount.Balance - initAccount.Balance, '钱:', nowAccount.Balance, '币:', nowAccount.Stocks, '平仓详情:', obj, "交叉周期", n);
            }
        }
        Sleep(Interval*1000);
    }
}
