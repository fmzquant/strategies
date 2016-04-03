/*
策略出处: https://www.botvs.com/strategy/71
策略名称: 平台API测试
策略作者: Zero
策略描述:

平台API测试, 可以添加多个平台，测试接口是否正常.

*/

function main() {
    Log("ALL Platform", exchanges.length);
    for (var i = 0; i < exchanges.length; i++) {
        var ex = exchanges[i];
        Log(ex.GetName(), ex.GetCurrency(), ex.GetFee());
        Log(ex.GetAccount());
        Log(ex.GetDepth());
        var depth = ex.GetDepth();
        if (depth) {
            Log("Depth", depth.Asks.length);
        } else {
             Log("Depth NULL");
        }
        Log('ticker', ex.GetTicker());
        Log(ex.CancelOrder(123));
        var orders = ex.GetOrders();
        if (orders) {
            Log("orders", orders.length);
        } else {
             Log("orders NULL");
        }
    }
}
