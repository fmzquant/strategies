/*
策略出处: https://www.botvs.com/strategy/9837
策略名称: 商品期货主力合约过滤
策略作者: Zero
策略描述:

可参考API文档里的商品期货扩展函数

效果如下:
 https://dn-filebox.qbox.me/bb2c0a8754481751eb966b4b08d7564b4dca70f6.png

*/

function main() {
    var filter = ['au', 'CF', 'MA'];
    var products = [];
    Log("等待连接到交易服务器");
    while (!exchange.IO("status")) Sleep(1000);
    Log("开始获取所有合约");
    var instruments = _C(exchange.IO, "instruments");
    Log("合约列表获取成功");
    var len = 0;
    for (var instrumentId in instruments) {
        len++;
    }
    Log("合约列表长度为:", len);
    for (var instrumentId in instruments) {
        if (instruments[instrumentId].IsTrading) {
            var found = false;
            for (var i = 0; i < filter.length; i++) {
                if (instruments[instrumentId].ProductID == filter[i]) {
                    found = true;
                }
            }
            if (!found) {
                continue;
            }
            if (typeof(products[instruments[instrumentId].ProductID]) === 'undefined') {
                products[instruments[instrumentId].ProductID] = [];
            }
            products[instruments[instrumentId].ProductID].push(instrumentId);
        }
    }
    for (var product in products) {
        var ss = products[product];
        Log("订阅", product, "的", ss.length, "种合约, 以识别主力合约");
        var vol = 0,
            volIdx = 0;
        for (var i = 0; i < ss.length; i++) {
            _C(exchange.SetContractType, ss[i]);
        }
        Sleep(5000);
        for (var i = 0; i < ss.length; i++) {
            _C(exchange.SetContractType, ss[i]);
            var ticker = exchange.GetTicker();

            if (ticker) {
                var obj = JSON.parse(exchange.GetRawJSON());
                if (obj.OpenInterest > vol) {
                    vol = obj.OpenInterest;
                    volIdx = i;
                }
            }
        }
        // 取消订阅行情(之后此合约K线将停止收集), 当然也可以不取消, 这里演示用
        for (var i = 0; i < ss.length; i++) {
            _C(exchange.SetContractType, "-" + ss[i]);
        }
        Log("主力合约为", ss[volIdx], "持仓", vol, '#ff0000');
    }
}
