/*
策略出处: https://www.botvs.com/strategy/796
策略名称: 新手入门之 - 下买单卖单
策略作者: Zero
策略描述:

新手入门之 - 下买单卖单


参数     默认值    描述
-----  -----  -----------
Type   0      订单类型: 买单|卖单
Price  25.08  价格
Num    true   数量
*/

function main() {
    Log('账户信息:', exchange.GetAccount());
    Type == 0 ? exchange.Buy(Price, Num) : exchange.Sell(Price, Num);
}
