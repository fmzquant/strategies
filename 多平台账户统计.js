/*
策略出处: https://www.botvs.com/strategy/7827
策略名称: 多平台账户统计
策略作者: 数·狂
策略描述:

多平台账户统计


参数           默认值    描述
-----------  -----  ---------------------
Interval     20     检测间隔（秒）
Type         0      显示类型: 总资产|净资产|总钱数|总币数
coverStocks  false  平仓总币数
Thr          0.1    报告阈值
*/

function EnsureCall(e, method) {
    var r;
    while (!(r = e[method].apply(this, Array.prototype.slice.call(arguments).slice(2)))) {
        Sleep(Interval);
    }
    return r;
}

var lastReport = 0;

function onTick() {
    var allBalance = 0;
    var allStocks = 0;
    var asset = 0;
    for (var i = 0; i < exchanges.length; i++) {
        var account = EnsureCall(exchanges[i],"GetAccount");
        var ticker = EnsureCall(exchanges[i],"GetTicker");
        allBalance += account.Balance + account.FrozenBalance;
        allStocks += account.Stocks + account.FrozenStocks;
        asset += (account.Balance + account.FrozenBalance) + (account.Stocks + account.FrozenStocks) * ticker.Last;
    }
    
    if (Type === 0 && Math.abs(asset - lastReport) >= Thr) {
        LogProfit(asset, "总钱:", allBalance, "总币:", allStocks, "总资产:", asset);
        lastReport = asset;
    }
    else if (Type == 1) {
        var netAsset = asset - coverStocks * (asset - allBalance) / allStocks;
        if (Math.abs(netAsset - lastReport) >= Thr) {
            LogProfit(netAsset, "总钱:", allBalance, "总币:", allStocks, "总资产:", asset);
            lastReport = netAsset;
        }
    }
    else if (Type == 2 && Math.abs(allBalance - lastReport) >= Thr){
        LogProfit(allBalance, "总钱:", allBalance, "总币:", allStocks, "总资产:", asset);
        lastReport = allBalance;
    }
    else if (Type == 3 && Math.abs(allStocks - lastReport) >= Thr) {
        LogProfit(allStocks, "总钱:", allBalance, "总币:", allStocks, "总资产:", asset);
        lastReport = allStocks;
    }
    
}

function main() {
    while (1) {
        onTick();
        Sleep(Interval*1000);
    }
}

