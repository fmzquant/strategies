/*
策略出处: https://www.botvs.com/strategy/5541
策略名称: 股票证券查询买卖示例
策略作者: Zero
策略描述:

可以查询持仓, 合约详细信息, 出现not login错误表示还没有成功登陆服务器, not ready表示行情数据还没有接收到, 程序会自动重试


参数            默认值        描述
------------  ---------  ---------
Op            0          操作: 查询|买卖
ContractType  000001.SZ  合约名称
QueryTicker   false      查询行情
Direction     0          买卖方向: 买|卖
Num           100        手数
*/

// 重试函数, 程序启动需要时间来登陆验证
function EnsureCall(method) {
    var r;
    while (!(r = method.apply(this, Array.prototype.slice.call(arguments).slice(1)))) {
        Sleep(1000);
    }
    return r;
}

function main() {
    Log("账户", EnsureCall(exchange.GetAccount));
    Log("持仓", EnsureCall(exchange.GetPosition)); 
    Log("订单", EnsureCall(exchange.GetOrders)); 
    var ins = EnsureCall(exchange.SetContractType, ContractType);
    Log("交易所:", (ins.ExchangeID == "SZE" ? "深交所" : "上交所"), "合约:", ins.InstrumentName, "最小下单量:", ins.MinBuyVolume, "份, 最大下单量:", ins.MaxLimitOrderVolume);
    if (QueryTicker) {
        Log("合约行情:", EnsureCall(exchange.GetTicker));
        Log("盘口深度:", EnsureCall(exchange.GetDepth));
    }
    if (Op === 0) {
        return;
    }
    if (Direction === 0) {
        exchange.SetDirection("buy");
        exchange.Buy(Num); // 市价单只传一个购买数量, 如果想要加其它参数可以exchange.Buy(-1, Num, .....);
    } else {
        exchange.SetDirection("closebuy");
        exchange.Sell(Num);
    }
}
