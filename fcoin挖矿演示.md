
> 策略名称

fcoin挖矿演示

> 策略作者

张超

> 策略描述

看到官方api群里开源的python版本,虽然很简单了,但是还有很多人架不起来环境
出问题的原因也有很多种,不太适合新手
本着开源共享的精神,我也开源一份,请大家斧正

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Amount|10|下单量|
|Wait|true|等待间隔(秒)|


> 源码 (javascript)

``` javascript
function DealOrder(orderType, sellPrice) {
    var ticker = _C(exchange.GetTicker);
    var action = orderType == ORDER_TYPE_BUY ? 'Buy' : 'Sell';
    _C(exchange[action], (orderType == ORDER_TYPE_SELL ? sellPrice : ticker.Last), Amount);
    var recentPrice = ticker.Last;
    while (true) {
        Sleep(Wait*1000);
        var orders = _C(exchange.GetOrders);
        if (orders == 0) {
            break;
        }
        ticker = _C(exchange.GetTicker);
        _.each(orders, function(o) {
            if (o.DealAmount == 0 && ((o.Type == ORDER_TYPE_SELL && ticker.Last >= sellPrice && ticker.Last != recentPrice) || (ticker.Last != recentPrice && o.Type == ORDER_TYPE_BUY))) {
                exchange.CancelOrder(o.Id);
                recentPrice = ticker.Last
                _C(exchange[action], ticker.Last, Amount);
            }
        });
    }
    return recentPrice;
}
function main() {
    while (true) {
        DealOrder(ORDER_TYPE_SELL, DealOrder(ORDER_TYPE_BUY));
        Sleep(1000);
    }
}

```

> 策略出处

https://www.fmz.com/strategy/97791

> 更新时间

2018-06-12 10:28:01
