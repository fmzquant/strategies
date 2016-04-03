/*
策略出处: https://www.botvs.com/strategy/443
策略名称: 监视并显示多个平台的全部资产总和的变化
策略作者: Zero
策略描述:

监视并显示多个平台的全部资产总和, 账户资金发生变化时才会从新显示, 所有平台的钱和币将换算成净资产显示到收益曲线里


参数              默认值  描述
------------  -----  --------
Interval       1000  失败重试(毫秒)
TickInterval   5000  监控频率(毫秒)
*/

var LastState = null;

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function getExchangesState() {
    var isUpdate = false;
    var allBalance = 0;
    var allNetStocks = 0;
    var Cache = [];
    var CurrencyCache = [];
    for (var i = 0; i < exchanges.length; i++) {
        var account = null;
        var ticker = null;
        while (!(account = exchanges[i].GetAccount())) {
            Sleep(Interval);
        }
        while (!(ticker = exchanges[i].GetTicker())) {
            Sleep(Interval);
        }        
        var name = typeof(exchanges[i].GetLabel) == 'undefined' ? exchanges[i].GetName() : exchanges[i].GetLabel();
        var currency = exchanges[i].GetCurrency();
        if (typeof(CurrencyCache[currency]) == 'undefined') {
            CurrencyCache[currency] = 0;
        }
        CurrencyCache[currency] = adjustFloat(CurrencyCache[currency] + account.Stocks + account.FrozenStocks);
        if (typeof(Cache[name]) == 'undefined') {
            Cache[name] = true;
            allBalance += account.Balance + account.FrozenBalance;
        }
        allNetStocks += (account.Stocks + account.FrozenStocks) * ticker.Last;
    }
    var update = false;
    var str = "";
    for (var currency in CurrencyCache) {
        str += ' '+currency + ': ' + CurrencyCache[currency];
        if (LastState != null) {
            if (LastState.CurrencyCache[currency] != CurrencyCache[currency]) {
                update = true;
            }
        }
    }
    allBalance = adjustFloat(allBalance);
    if (LastState != null) {
        if (LastState.allBalance != allBalance) {
            update = true;
        }
    }
    
    return {allStocks: str, Net: adjustFloat(allNetStocks + allBalance), CurrencyCache: CurrencyCache, allBalance: allBalance, update: (LastState == null) || update};
}

function main() {
    Log("所有平台的钱和币将换算成净资产显示到收益曲线里");
    while (true) {
        var state = getExchangesState();
        if (state.update) {
            LastState = state;
            Log('总钱: ', state.allBalance, '总币: ', state.allStocks);
            LogProfit(state.Net);
        }
        Sleep(Math.max(TickInterval, 100));
    }
}
