/*
策略出处: https://www.botvs.com/strategy/10991
策略名称: 模板库使用例子
策略作者: Zero
策略描述:

模板库使用例子


参数        默认值  描述
------  -----  --------
OType     0    买或卖: 买|卖
Amount    0.5  下单量
*/


function main() {
    Log(OType === 0 ? $.Buy(Amount) : $.Sell(Amount));
}
