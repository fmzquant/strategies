/*
策略出处: https://www.botvs.com/strategy/30512
策略名称: 国外知名策略R-Breaker (复制)
策略作者: dillonchen
策略描述:

根据国外知名策略R-Breaker改写，当天收盘时不平仓。默认K线周期选择1天效果最佳。


参数       默认值    描述
-------  -----  ----------
NPeriod  true   计算周期
f1       0.47   中轨上下顶部区间系数
f2       0.07   中轨上下区间系数
f3       0.25   上下轨系数
Gain     false  上次或初始收益
*/

function onTick() {
    var records = _C(exchange.GetRecords);
    var ticker = _C(exchange.GetTicker);
    var account = _C(exchange.GetAccount);

    var H = TA.Highest(records, NPeriod, 'High');
    var C = TA.Lowest(records, 1, 'Close');
    var L = TA.Lowest(records, NPeriod, 'Low');


    var ssetup = H + f1 * (C - L);
    var senter = ((1 + f2) / 2) * (H + C) - f2 * L;
    var benter = ((1 + f2) / 2) * (L + C) - f2 * H;
    var bsetup = L - f1 * (H - C);
    var bbreak = ssetup + f3 * (ssetup - bsetup);
    var sbreak = bsetup - f3 * (ssetup - bsetup);


    LogStatus('账户信息:', account, '\n最新价: ', ticker.Last, '状态：', state, '\n上轨: ', bbreak, '中轨顶', ssetup, '中轨上：', senter, '中轨下：', benter, '中轨底', bsetup, '下轨: ', sbreak);

    income = (account.Balance + account.FrozenBalance) + (account.Stocks + account.FrozenStocks) * ticker.Last - initBalance - initStocks * initticker + Gain;

    if (ticker.Last > ssetup) {
        state = 1;
    } else if (ticker.Last >= bsetup && ticker.Last <= ssetup) {
        state = 0;
    } else if (ticker.Last < bsetup && account.Stocks < 0.01) {
        state = -1;
    }

    //做多
    if (ticker.Last > bbreak && account.Balance / ticker.Last >= 0.01) {
        Log('开始做多');
        $.Buy(account.Balance / ticker.Last);
        Log('保持多仓');
//        LogProfit(income);
        state = 1;
    }

    //做空
    else if (state === 1 && ticker.Last < senter && account.Stocks >= 0.01) {
        Log('开始做空');
        $.Sell(account.Stocks);
        Log('保持空仓');
        LogProfit(income);
    }


    //做多
    if (state === -1 && ticker.Last > benter && account.Balance / ticker.Last >= 0.01) {
        Log('开始做多');
        $.Buy(account.Balance / ticker.Last);
        Log('保持多仓');
//        LogProfit(income);
    }

    //做空
    else if (ticker.Last < sbreak && account.Stocks >= 0.01) {
        Log('开始做空');
        $.Sell(account.Stocks);
        Log('保持空仓');
        LogProfit(income);
        state = -1;
    }

}

function main() {
    var account = _C(exchange.GetAccount);
    var ticker = _C(exchange.GetTicker);
    initticker = ticker.Last;
    initBalance = account.Balance;
    initStocks = account.Stocks;
    state = 0;
    biaoji = 0;

    if (initStocks < 0.01 || (initBalance / initticker < 0.01)) {
        Log('账户必须有钱又有币，请重新设置!#ff0000');
        onexit();
    }
    LogProfit(Gain);
    Log('上次或初始收益');

    while (true) {
        onTick();
        Sleep(1000);
    }
}
