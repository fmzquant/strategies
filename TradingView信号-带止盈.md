
> Name

TradingView信号-带止盈

> Author

JKMCHEN

> Strategy Description

相关文章：https://www.fmz.com/digest-topic/9794

上面文章来自小小梦，讲的是原理。
我是以他的脚本为参考，用gpt-4修改出来的。添加了止盈，根据保证金控制开单数量。



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TakeProfitPercentage|0.3|止盈百分比|
|Leverage|5|杠杆（5-10）|


> Source (javascript)

``` javascript
////TradingView信号-带止盈 V 0.1.0

// 参数设置
//var TakeProfitPercentage = 0.3; // 止盈百分比
//var Leverage = 5; // 开仓倍率
var takeProfitOrderId;


// 全局变量
var position;
var baseMargin;
var assetPrecision;//获取资产精度，并将其存储在全局变量中：
var pricePrecision; // 在全局变量中添加一个新变量，用于存储价格精度
var DEFAULT_ASSET_PRECISION = 2;
var DEFAULT_PRICE_PRECISION = 2; // 在这里添加价格精度的默认值


// 添加一个新函数，用于将价格调整到合适的精度
function fixPricePrecision(price, precision) {
    return parseFloat(price.toFixed(precision));
}
// 添加一个新函数，用于获取价格精度
function getPricePrecision() {
    return DEFAULT_PRICE_PRECISION;
}
//将购买数量调整为合适的精度：
function fixAmountPrecision(amount, precision) {
    return parseFloat(amount.toFixed(precision));
}
//设定交易精度：
function getAssetPrecision() {
    return DEFAULT_ASSET_PRECISION;
}




function getMargin() {
    var account = exchange.GetAccount();
    return account.Balance + account.FrozenBalance;
}

function updatePosition() {
    position = exchange.GetPosition();
}

function updateMargin() {
    baseMargin = getMargin();
}

// 添加一个新函数用于检查止盈单是否已成交
function checkTakeProfitOrder() {
    var order = exchange.GetOrder(takeProfitOrderId);
    if (order.Status === ORDER_STATE_CLOSED || order.Status === ORDER_STATE_CANCELED) {
        Log("止盈单已成交或取消");
        takeProfitOrderId = null;
    }
}


function openLong() {
    try {
        var account = exchange.GetAccount();
        var ticker = exchange.GetTicker();
        var amount = (account.Balance * Leverage) / ticker.Buy;
        amount = fixAmountPrecision(amount, assetPrecision); // 调整精度

        exchange.SetDirection("buy"); // 设置交易方向为买入（开多）
        exchange.Buy(-1, amount);
        Log("开多量：", amount, "，开多价格：", ticker.Buy);

        var takeProfitPrice = ticker.Buy * (1 + TakeProfitPercentage/100);
        takeProfitPrice = fixPricePrecision(takeProfitPrice, pricePrecision); // 调整价格精度
        var takeProfitAmount = fixAmountPrecision(amount / 2, assetPrecision); // 调整数量精度
        exchange.SetDirection("closebuy"); // 设置止盈平多交易方向
        takeProfitOrderId = exchange.Sell(takeProfitPrice, takeProfitAmount);
        Log("挂止盈单，价格：", takeProfitPrice, "，数量：", takeProfitAmount);
    } catch (error) {
        Log("开多单失败：", error);
    }
}


function closeLong() {
    if (position.length === 0) return;

    // 取消止盈单
    if (takeProfitOrderId) {
        exchange.CancelOrder(takeProfitOrderId);
        Log("取消止盈单");
        takeProfitOrderId = null;
        Sleep(1000);
    }

    var ticker = exchange.GetTicker();
    exchange.SetDirection("closebuy"); // 设置交易方向为平仓
    exchange.Sell(-1, position[0].Amount);
    Log("平多量：", position[0].Amount, "，平多价格：", ticker.Sell);
}

function openShort() {
    try {
        var account = exchange.GetAccount();
        var ticker = exchange.GetTicker();
        var amount = (account.Balance * Leverage) / ticker.Sell;
        amount = fixAmountPrecision(amount, assetPrecision); // 调整精度

        exchange.SetDirection("sell"); // 设置交易方向为卖出（开空）
        exchange.Sell(-1, amount);
        Log("开空量：", amount, "，开空价格：", ticker.Sell);

        var takeProfitPrice = ticker.Sell * (1 - TakeProfitPercentage/100);
        takeProfitPrice = fixPricePrecision(takeProfitPrice, pricePrecision); // 调整价格精度
        var takeProfitAmount = fixAmountPrecision(amount / 2, assetPrecision); // 调整数量精度
        exchange.SetDirection("closesell"); // 设置止盈平空交易方向
        takeProfitOrderId = exchange.Buy(takeProfitPrice, takeProfitAmount);
        Log("挂止盈单，价格：", takeProfitPrice, "，数量：", takeProfitAmount);
    } catch (error) {
        Log("开空单失败：", error);
    }
}




function closeShort() {
    if (position.length === 0) return;

    // 取消止盈单
    if (takeProfitOrderId) {
        exchange.CancelOrder(takeProfitOrderId);
        Log("取消止盈单");
        takeProfitOrderId = null;
        Sleep(1000);
    }

    var ticker = exchange.GetTicker();
    exchange.SetDirection("closesell"); // 设置交易方向为平仓
    exchange.Buy(-1, position[0].Amount);
    Log("平空量：", position[0].Amount, "，平空价格：", ticker.Buy);
}

function tryCloseShort() {
    if (position.length > 0) {
        for (var i = 0; i < position.length; i++) {
            if (position[i].Type === PD_SHORT) {
                closeShort();
            }
        }
    }
}

function tryCloseLong() {
    if (position.length > 0) {
        for (var i = 0; i < position.length; i++) {
            if (position[i].Type === PD_LONG) {
                closeLong();
            }
        }
    }
}







function handleMessage(msg) {
    
    var commands = msg.split(',');
    for (var i = 0; i < commands.length; i++) {
        switch (commands[i]) {
            case "long":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseShort();
                Sleep(1000);
                openLong();
                break;
            case "short":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseLong();
                Sleep(1000);
                openShort();
                break;
            case "closelong":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseLong();
                break;
            case "closeshort":
                Log("收到消息：", msg); // 添加日志输出
                tryCloseShort();
                break;
        }
        Sleep(1000); // 在处理下一个命令之前暂停1秒
    }
}



function main() {
    exchange.SetContractType("swap");
    assetPrecision = getAssetPrecision(); // 获取资产精度
    pricePrecision = getPricePrecision(); // 获取价格精度
    
    
    updateMargin();
    Log("初始保证金：", baseMargin);
    
    while (true) {
        updatePosition();
        
        if (takeProfitOrderId) {
            checkTakeProfitOrder();
        }
        
        var command = GetCommand();
        if (command) {
            handleMessage(command);
        }
        
        Sleep(1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/410060

> Last Modified

2023-04-20 14:44:36
