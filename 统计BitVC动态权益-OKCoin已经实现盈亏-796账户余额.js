/*
策略出处: https://www.botvs.com/strategy/1483
策略名称: 统计BitVC动态权益-OKCoin已经实现盈亏-796账户余额
策略作者: Zero
策略描述:

利用2.67版本新增加的GetRawJSON函数, 可以返回最后一次REST API请求返回的原始信息, 来解析平台的扩展参数


参数            默认值  描述
----------  -----  -------
LoopIntval     30  检测周期(秒)
*/

function main() {
    var eName = exchange.GetName();
    var coin = exchange.GetCurrency().toLowerCase();
    var isBitVC = eName == "Futures_BitVC";
    var isOKCoin = eName == "Futures_OKCoin";
    var is796 = eName == "Futures_796";
    if (!isBitVC && !isOKCoin && !is796) {
        throw "该策略为 BitVC/OKCoin/796 期货专用策略";
    }
    if (parseFloat(Version()) < 2.67) {
        throw "要求托管者2.67版本以上";
    }
    
    var lastVal = 0;
    LoopIntval = Math.max(LoopIntval, 1);
    Log(isBitVC ? "BitVC动态权益" : "OKCoin已实现盈亏", "将显示为收益曲线, 有变化后更新");
    while (true) {
        var account;
        while (!(account = exchange.GetAccount())) {
            Sleep(300);
        }
        // GetRawJSON返回GetAccount的原始信息
        var js = exchange.GetRawJSON();
        try {
            var obj = JSON.parse(js);
            var v = 0;
            if (isBitVC) {
                v = obj.dynamicRights;
            } else if (isOKCoin) {
                for (var i = 0; i < obj.info[coin].contracts.length; i++) {
                    v += obj.info[coin].contracts[i].profit;
                }        
            } else if (is796) {
                v = account.Stocks;
            }
            if (v != lastVal) {
                lastVal = v;
                LogProfit(lastVal, 'Stocks:', account.Stocks, 'FrozenStocks:', account.FrozenStocks);
            }
        } catch(e) {
            Log(e);
        }
        Sleep(LoopIntval * 1000);
    }
}
