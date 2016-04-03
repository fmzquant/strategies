/*
策略出处: https://www.botvs.com/strategy/639
策略名称: 阶梯下单 - 可设置触发价格
策略作者: Zero
策略描述:

阶梯下单, 可买可卖, 程序依次按下单间隔下够指定数目的买单或者卖单, 如果是买单，刚第一个单为价格最高的单，后面的单依次价格递减，卖单第一个为最便宜的卖单，后面的价格依次增加


参数             默认值    描述
-------------  -----  ----------
OpType         0      下买单: 买单|卖单
StartPrice     20     下单初始价
PriceDiff      0.2    下单间隔
OrderNum       10     下单次数
Amount         0.8    每个订单币的数量
EnableTrigger  false  使用触发条件
TriggerPrice   18     触发价
*/

function adjustFloat(v) {
    return Math.floor(parseFloat(v.toFixed(10))*1000)/1000;
}

function GetAccount(e) {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(1000);
    }
    return ticker;
}

function main() {
    var ticker = GetTicker();
    var InitPrice = ticker.Last;
    if (EnableTrigger) {
        Log('当前价格: ', InitPrice, InitPrice > TriggerPrice ? '价格跌破' : '价格涨超', TriggerPrice, '时触发阶梯下单');
        while (true) {
            if (InitPrice > TriggerPrice && ticker.Last < TriggerPrice) {
                Log('当前价格', ticker.Last, '价格跌破 ', TriggerPrice, '元, 开始下单');
                break;
            } else if (InitPrice < TriggerPrice && ticker.Last > TriggerPrice) {
                Log('当前价格', ticker.Last, '价格涨超 ', TriggerPrice, '元, 开始下单');
                break;
            }
            ticker = GetTicker();
            Sleep(1000);
        }
    }
    var account = GetAccount();
    var needMoney = 0;
    var needStocks = 0;
    for (var i = 0; i < OrderNum; i++) {
        needMoney += (StartPrice - (i * PriceDiff)) * Amount;
        needStocks += Amount;
    }

    if (OpType == 0) {
        if (needMoney > account.Balance) {
            throw "没有足够的钱下单";
        }
        for (var i = 0; i < OrderNum; i++) {
            exchange.Buy(adjustFloat(StartPrice - (i * PriceDiff)), Amount);
        }
    } else {
        if (needStocks > account.Stocks) {
            throw "没有足够的币下单";
        }
        for (var i = 0; i < OrderNum; i++) {
            exchange.Sell(adjustFloat(StartPrice + (i * PriceDiff)), Amount);
        }        
    }
    Log("全部委托完成");
}
