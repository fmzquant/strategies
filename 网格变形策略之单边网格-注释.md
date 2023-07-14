
> Name

网格变形策略之单边网格-注释

> Author

hk量

> Strategy Description

网格可以自定义方向
先买后卖:
网格会从首价格开始向下挂买单, 每个买单间隔 "价格间隔" 这个参数, 挂单数量为"单笔数量",  挂够 "总数量" 个买单, 有任意买单成交以后, 程序会在买价基础上加 "价差(元)" 这个参数的的值的价格挂出卖单, 卖出, 卖出以后，重新按原来这个网格的价格挂买入单
先卖后买:
操作刚好相反

策略最大的风险就是单边行情, 价格波动超出网格范围.

网格带有自动止损和移动功能


// 小小梦  梦回
// https://www.fmz.com/bbs-topic/334  汇总之 - 发明者量化 视频教学与图文教学
//https://www.fmz.com/bbs-topic/1069 网格变形策略之单边网格 (注释版)


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|OpType|0|网格方向: 先买后卖|先卖后买|
|FirstPriceAuto|true|首价格自动|
|FirstPrice|100|首价格|
|AllNum|10|总数量|
|PriceGrid|true|价格间隔|
|PriceDiff|2|价差(元)|
|AmountType|0|订单大小: 买卖同量|自定义量|
|AmountOnce|0.1|单笔数量|
|BAmountOnce|0.1|买单大小|
|SAmountOnce|0.1|卖单大小|
|AmountCoefficient|*1|量差|
|AmountDot|3|量小数点最长位数|
|EnableProtectDiff|false|开启价差保护|
|ProtectDiff|20|入市价差保护|
|CancelAllWS|true|停止时取消所有挂单|
|CheckInterval|2000|轮询间隔|
|Interval|1300|失败重试间隔|
|RestoreProfit|false|恢复上次盈利|
|LastProfit|false|上次盈利|
|ProfitAsOrg|false|上次盈利算入均价|
|EnableAccountCheck|true|启用资金检验|
|EnableStopLoss|false|开启止损|
|StopLoss|100|最大浮动亏损(元)|
|StopLossMode|0|止损后操作: 回收并退出|回收再撒网|
|EnableStopWin|false|开启止盈|
|StopWin|120|最大浮动盈利(元)|
|StopWinMode|0|止盈后操作: 回收并退出|回收再撒网|
|AutoMove|false|自动移动|
|MaxDistance|20|最大距离(元)|
|MaxIdle|7200|最大空闲(秒)|
|EnableDynamic|false|开启动态挂单|
|DynamicMax|30|订单失效距离(元)|
|ResetData|true|启动时清空所有数据|
|Precision|5|价格小数位长度|
|XPrecision|5|下单量小数位长度|
|MinStock|0.001|最小交易量|




|Button|Default|Description|
|----|----|----|
|收网|__button__|停止并平衡到初始状态|


> Source (javascript)

``` javascript



 

/*backtest
start: 2021-08-27 00:00:00
end: 2021-08-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Huobi","currency":"BTC_USDT"}]
args: [["OpType",1]]
*/


// 小小梦  梦回
// https://www.fmz.com/bbs-topic/334  汇总之 - 发明者量化 视频教学与图文教学
//https://www.fmz.com/bbs-topic/1069 网格变形策略之单边网格 (注释版)

/*  界面参数 （代码中体现为全局变量）
变量                                  描述                  类型                       默认值         
OpType                              网格方向                下拉框(selected)           先买后卖|先卖后买
FirstPriceAuto                      首价格自动               布尔型(true/false)         true
FirstPrice@!FirstPriceAuto          首价格                  数字型(number)             100
AllNum                              总数量                  数字型(number)             10
PriceGrid                           价格间隔                数字型(number)              1
PriceDiff                           价差(元)                数字型(number)              2
AmountType                          订单大小                下拉框(selected)           买卖同量|自定义量
AmountOnce@AmountType==0            单笔数量                数字型(number)             0.1
BAmountOnce@AmountType==1           买单大小                数字型(number)             0.1
SAmountOnce@AmountType==1           卖单大小                数字型(number)             0.1
AmountCoefficient@AmountType==0     量差                    字符串(string)             *1
AmountDot                           量小数点最长位数          数字型(number)             3
EnableProtectDiff                   开启价差保护             布尔型(true/false)         false
ProtectDiff@EnableProtectDiff       入市价差保护             数字型(number)              20
CancelAllWS                         停止时取消所有挂单        布尔型(true/false)         true
CheckInterval                       轮询间隔                数字型(number)              2000
Interval                            失败重试间隔             数字型(number)              1300
RestoreProfit                       恢复上次盈利             布尔型(true/false)          false
LastProfit@RestoreProfit            上次盈利                数字型(number)               0
ProfitAsOrg@RestoreProfit           上次盈利算入均价          布尔型(true/false)          false
EnableAccountCheck                  启用资金检验             布尔型(true/false)          true
EnableStopLoss@EnableAccountCheck   开启止损                布尔型(true/false)          false
StopLoss@EnableStopLoss             最大浮动亏损(元)         数字型(number)              100
StopLossMode@EnableStopLoss         止损后操作              下拉框(selected)             回收并退出|回收再撒网
EnableStopWin@EnableAccountCheck    开启止盈                布尔型(true/false)           false
StopWin@EnableStopWin               最大浮动盈利(元)         数字型(number)               120
StopWinMode@EnableStopWin           止盈后操作               下拉框(selected)            回收并退出|回收再撒网
AutoMove@EnableAccountCheck         自动移动                 布尔型(true/false)          false
MaxDistance@AutoMove                最大距离(元)             数字型(number)               20
MaxIdle@AutoMove                    最大空闲(秒)             数字型(number)               7200
EnableDynamic                       开启动态挂单              布尔型(true/false)          false
DynamicMax@EnableDynamic            订单失效距离(元)          数字型(number)               30
ResetData                           启动时清空所有数据         布尔型(true/false)           true
Precision                           价格小数位长度            数字型(number)                5
*/

function hasOrder(orders, orderId) //
{                           // 检测 参数 orders 中 是否有  ID 为 orderId 的订单
    for (var i = 0; i < orders.length; i++) //
    {                  // 遍历 orders 检测 是否 有相同的 id ， 找到 返回 true
        if (orders[i].Id == orderId) //
        {
            return true;
        }
    }
    return false;                                              // 全部遍历完 ，没有触发 if 则 没有找到 ID 为 orderId 的订单， 返回 false
}


function cancelPending() //
{                                      // 取消所有挂单 函数
    var ret = false;                                            // 设置 返回成功  标记变量
    while (true) //
    {                                              // while 循环
        if (ret) //
        {                                              // 如果 ret 为 true 则 Sleep 一定时间
            Sleep(Interval);
        }
        var orders = _C(exchange.GetOrders);                    // 调用  API 获取 交易所 未完成的订单信息
        if (orders.length == 0) //
        {                               // 如果返回的是  空数组， 即 交易所 没有未完成的订单。
            break;                                              // 跳出 while 循环
        }

        for (var j = 0; j < orders.length; j++) //
        {               // 遍历 未完成的 订单数组， 并根据索引j 逐个使用  orders[j].Id 去 取消订单。
            exchange.CancelOrder(orders[j].Id, orders[j]);
            ret = true;                                         // 一旦有取消操作， ret 赋值 为 true 。用于触发 以上 Sleep ， 等待后重新 exchange.GetOrders 检测 
        }
    }
    return ret;                                                 // 返回 ret
}

function valuesToString(values, pos) //
{                      // 值 转换 为字符串
    var result = '';                                        // 声明一个用于返回的  空字符串  result
    if (typeof (pos) === 'undefined') //
    {                      // 如果 没有传入  pos 这个参数 ，给 pos 赋值 0
        pos = 0;
    }
    for (var i = pos; i < values.length; i++) //
    {             // 根据 传入的 pos 处理 values 数组
        if (i > pos) //
        {                                      // 除了第一次 循环 之后 在result 字符串后 加上 ' ' 一个空格
            result += ' ';
        }
        if (values[i] === null) //
        {                           // 如果 values （函数 参数列表 数组） 当前的索引的 元素 为 null 则 result 添加 'null'字符串
            result += 'null';
        }//
        else if (typeof (values[i]) == 'undefined') //
        {      // 如果 是 未定义的， 则添加 'undefined'
            result += 'undefined';
        }//
        else //
        {                                            // 剩余类型 做 switch 检测 分别处理
            switch (values[i].constructor.name) //
            {           // 检查 values[i] 的 constructor 的 name 属性， 即类型 名称
                case 'Date':
                case 'Number':
                case 'String':
                case 'Function':
                    result += values[i].toString();         // 如果是 日期类型、数值类型、字符串类型、函数类型 ，调用其 toString 函数 转换为字符串 后，添加
                    break;
                default:
                    result += JSON.stringify(values[i]);    // 其他情况 则 使用JSON.stringify 函数 转换为 JSON 字符串 添加到 result 
                    break;
            }
        }
    }
    return result;                                          // 返回 result
}

function Trader() //
{                                                 // Trader 函数 ，使用闭包。
    var vId = 0;                                                    // 订单递增ID
    var orderBooks = [];                                            // 订单薄
    var hisBooks = [];                                              // 历史订单薄
    var orderBooksLen = 0;                                          // 订单薄长度
    this.Buy = function (price, amount, extra) //
    {                     // 买函数， 参数： 价格 、数量、扩展信息
        if (typeof (extra) === 'undefined') //
        {                        // 如果参数 extra 未传入，即 typeof 返回 undefined 
            extra = '';                                             // 给 extra 赋值空字符串
        }//
        else //
        {
            extra = valuesToString(arguments, 2);                   // 调用 this.Buy 函数 时传入的参数 arguments ，传入 valuesToString函数中
        }
        vId++;                                                      // 
        var orderId = "V" + vId;                                    //
        orderBooks[orderId] = //
        {                                     // 向订单薄 数组中添加 属性 orderId, 用构造的 对象 对其初始化。
            Type: ORDER_TYPE_BUY,                                   // 构造的对象  Type 属性:  类型    买单
            Status: ORDER_STATE_PENDING,                            //                       状态    挂起
            Id: 0,                                                  //                       订单ID  0
            Price: price,                                           //                       价格    参数 price
            Amount: amount,                                         //                       订单量   参数 amount 
            Extra: extra                                            //                       扩展信息  经valuesToString 处理过的字符串。
        };
        orderBooksLen++;                                            // 订单薄的长度 累计加1
        return orderId;                                             // 返回 本次构造的订单的  orderId （非交易所订单ID ，别混淆。）
    };
    this.Sell = function (price, amount, extra) //
    {                    // 和 thie.Buy 基本类似， 构造卖单。
        if (typeof (extra) === 'undefined') //
        {
            extra = '';
        }//
        else //
        {
            extra = valuesToString(arguments, 2);
        }
        vId++;
        var orderId = "V" + vId;
        orderBooks[orderId] = //
        {
            Type: ORDER_TYPE_SELL,
            Status: ORDER_STATE_PENDING,
            Id: 0,
            Price: price,
            Amount: amount,
            Extra: extra
        };
        orderBooksLen++;
        return orderId;
    };
    this.GetOrders = function () //
    {                                   // 获取未完成的订单信息
        var orders = _C(exchange.GetOrders);                        // 调用 API GetOrders 获取 未完成的订单信息 赋值给 orders
        for (orderId in orderBooks) //
        {                               // 遍历 Trader 对象中的 orderBooks 
            var order = orderBooks[orderId];                        // 根据 orderId 取出 订单
            if (order.Status !== ORDER_STATE_PENDING) //
            {             // 如果 order 的状态不等于  挂起状态 ，就跳过本次循环
                continue;
            }
            var found = false;                                      // 初始化 found 变量（标记 是否找到） 为 true
            for (var i = 0; i < orders.length; i++) //
            {               // 遍历 API 返回的未完成的订单的数据  
                if (orders[i].Id == order.Id) //
                {                     // 找到 和 orderBooks 中 未完成订单 ， id 相同的订单时，给found 赋值 true，代表找到。 
                    found = true;
                    break;                                          // 跳出当前循环
                }
            }
            if (!found) //
            {                                           // 如果 没有找到，则 向 orders push  orderBooks[orderId]。
                orders.push(orderBooks[orderId]);                   // 为何要这样 push ?
            }
        }
        return orders;                                              // 返回 orders
    }
    this.GetOrder = function (orderId) //
    {                             // 获取订单
        if (typeof (orderId) === 'number') //
        {                         // 如果传入的 参数 orderId 是数值类型 
            return exchange.GetOrder(orderId);                      // 调用 API GetOrder 根据 orderId 获取 订单信息并返回。
        }
        if (typeof (hisBooks[orderId]) !== 'undefined') //
        {            // typeof(hisBooks[orderId]) 如果不等于 未定义的
            return hisBooks[orderId];                               // 返回 hisBooks 中 属性为 orderId 的数据
        }
        if (typeof (orderBooks[orderId]) !== 'undefined') //
        {          // 同上， orderBooks 中如果有 属性为 orderId的值存在， 返回这个数据。
            return orderBooks[orderId];
        }
        return null;                                                // 如果不符合上述条件触发， 返回 null
    };
    this.Len = function () //
    {                                         // 返回 Trader 的 orderBookLen 变量， 即返回订单薄长度。
        return orderBooksLen;
    };
    this.RealLen = function () //
    {                                     // 返回 订单薄中 激活订单数量。
        var n = 0;                                                  // 初始计数 为 0
        for (orderId in orderBooks) //
        {                               // 遍历 订单薄
            if (orderBooks[orderId].Id > 0) //
            {                       // 如果 在遍历中 当前 的订单的 Id 大于0 ，即 非初始时的0， 表明订单已下单，该订单已经激活。
                n++;                                                // 累计 已经激活的订单
            }
        }
        return n;                                                   // 返回 n值， 即返回 真实 订单薄长度。（已激活订单数量）
    };
    this.Poll = function (ticker, priceDiff) //
    {                       // 
        var orders = _C(exchange.GetOrders);                        // 获取 所有未完成的订单
        for (orderId in orderBooks) //
        {                               // 遍历 订单薄
            var order = orderBooks[orderId];                        // 取出当前 的订单 赋值给 order
            if (order.Id > 0) //
            {                                     // 如果订单 为 激活状态，即 order.Id 不为0（已经下过单）
                var found = false;                                  // 变量 found（标记找到） 为 false
                for (var i = 0; i < orders.length; i++) //
                {           // 在交易所返回的 未完成订单信息中 查找 相同的订单号
                    if (order.Id == orders[i].Id) //
                    {                 // 如果查找到， 给found 赋值 true ，代表已找到。
                        found = true;
                    }
                }
                if (!found) //
                {                                       // 如果当前的 orderId 代表的订单 没有在 交易所返回的未完成订单数组orders中找到对应的。
                    order.Status = ORDER_STATE_CLOSED;              // 给 orderBooks 中对应 orderId 的订单（即当前的order变量）更新，Status 属性更新为 ORDER_STATE_CLOSED （即 已关闭） 
                    hisBooks[orderId] = order;                      // 完成的订单 记录在 历史订单薄里，即 hisBooks ，统一，且唯一的订单号 orderId
                    delete (orderBooks[orderId]);                    // 删除 订单薄的 名为 orderId值的 属性。（完成的订单 从中 删除）
                    orderBooksLen--;                                // 订单薄 长度自减
                    continue;                                       // 以下代码 跳过继续循环。
                }
            }
            var diff = _N(order.Type == ORDER_TYPE_BUY ? (ticker.Buy - order.Price) : (order.Price - ticker.Sell));
            // diff 为 当前订单薄 中 订单的  计划开仓价和 当前实时开仓价格的差值。

            var pfn = order.Type == ORDER_TYPE_BUY ? exchange.Buy : exchange.Sell;   // 根据订单的类型，给 pfn 赋值相应的  API 函数 引用。
            // 即 如果 order 的类型是买单 ， pfn 就是  exchange.Buy 函数的引用， 卖单同理。

            if (order.Id == 0 && diff <= priceDiff) //
            {                                // 如果 订单薄中的订单 order 没有激活（即Id 等于0 ） 并且 当前价格距离 订单计划价格 小于等于 参数传入的 priceDiff
                var realId = pfn(order.Price, order.Amount, order.Extra + "(距离: " + diff + (order.Type == ORDER_TYPE_BUY ? (" 买一: " + ticker.Buy) : (" 卖一: " + ticker.Sell)) + ")");
                // 执行下单函数 ，参数传入 价格、数量、 订单扩展信息 + 挂单距离 + 行情数据（买一 或者 卖一），返回 交易所 订单id

                if (typeof (realId) === 'number') //
                {    // 如果 返回的  realId 是数值类型
                    order.Id = realId;                // 赋值给 订单薄 当前的订单  order的 Id 属性。
                }
            }//
            else if (order.Id > 0 && diff > (priceDiff + 1)) //
            {  // 如果订单 处于激活状态， 并且 当前距离 大于 参数传入的 距离
                var ok = true;                                    // 声明一个 用于标记的变量   初始 true 
                do //
                {                                              // 先执行 do 再判断 while
                    ok = true;                                    // ok 赋值 true
                    exchange.CancelOrder(order.Id, "不必要的" + (order.Type == ORDER_TYPE_BUY ? "买单" : "卖单"), "委托价:", order.Price, "量:", order.Amount, ", 距离:", diff, order.Type == ORDER_TYPE_BUY ? ("买一: " + ticker.Buy) : ("卖一: " + ticker.Sell));
                    // 取消 当前 超出 范围的挂单， 在取消订单这条日志后 打印 当前订单的信息、当前 距离 diff。

                    Sleep(200);                                   // 等待 200 毫秒
                    orders = _C(exchange.GetOrders);              // 调用 API 获取 交易所 中 未完成的订单。
                    for (var i = 0; i < orders.length; i++) //
                    {     // 遍历 这些未完成的订单。
                        if (orders[i].Id == order.Id) //
                        {           // 如果找到 取消的订单 还在 交易所未完成的订单数组中
                            ok = false;                           // 给 ok 这个变量赋值 false ， 即没有 取消成功
                        }
                    }
                } while (!ok);                                    // 如果 ok 为 false，则 !ok 为 true ，while 就会继续重复循环，继续取消这个订单，并检测是否取消成功
                order.Id = 0;                                     // 给 order.Id 赋值 0 , 代表 当前这个订单 是未激活的。
            }
        }
    };
}

function balanceAccount(orgAccount, initAccount) //
{               // 平衡账户 函数   参数 策略启动时最初始的账户信息 ， 本次撒网前初始账户信息
    cancelPending();                                             // 调用自定义函数  cancelPending()  取消所有挂单。
    var nowAccount = _C(exchange.GetAccount);                    // 声明一个  变量  nowAccount 用来记录 此刻 账户的最新信息。
    var slidePrice = 0.2;                                        // 设置下单时 的滑价 为 0.2
    var ok = true;                                               // 标记变量 初始  true
    while (true) //
    {                                               // while 循环
        var diff = _N(nowAccount.Stocks - initAccount.Stocks);   // 计算出 当前 账户 和  初始账户 的币差 diff
        if (Math.abs(diff) < exchange.GetMinStock()) //
        {           // 如果 币差的绝对值 小于 交易所 的最小交易量，break 跳出循环，不进行平衡操作。
            break;
        }
        var depth = _C(exchange.GetDepth);                       // 获取 交易所深度信息  赋值给 声明的 depth 变量 
        var books = diff > 0 ? depth.Bids : depth.Asks;          // 根据 币差 的大于0 或者 小于 0 ，提取 depth 中的 买单数组 或者 卖单数组（等于0 不会处理，在判断小于GetMinStock 的时候已经break）
        // 币差大于0 要卖出平衡，所以看买单数组，  币差小于0 相反。
        var n = 0;                                               // 声明 n 初始为 0
        var price = 0;                                           // 声明 price 初始 0
        for (var i = 0; i < books.length; i++) //
        {                 // 遍历 买单 或者 卖单 数组
            n += books[i].Amount;                                // 根据 遍历的索引 i ， 累计每次的 订单的Amount （订单量）
            if (n >= Math.abs(diff)) //
            {                           // 如果 累计的 订单量 n 大于等于 币差，则：
                price = books[i].Price;                          // 获取 当前索引的订单的 价格，赋值给 price
                break;                                           // 跳出 当前 for 遍历循环
            }
        }
        var pfn = diff > 0 ? exchange.Sell : exchange.Buy;       // 根据 币差 大于0 或者 小于 0 ， 将 下卖单 API(exchange.Sell) 或者 下买单 API(exchange.Buy) 引用传递给 声明的 pfn
        var amount = Math.abs(diff);                             // 将要平衡操作的 下单量 为 diff 即 币差，   赋值给 声明的 amount 变量
        var price = diff > 0 ? (price - slidePrice) : (price + slidePrice);    // 根据币差 决定的 买卖方向 ，在 price 的基础上 增加 或者 减去 滑价（滑价是为了更容易成交），再赋值给 price
        Log("开始平衡", (diff > 0 ? "卖出" : "买入"), amount, "个币");            // 输出 日志 平衡的 币数。
        if (diff > 0) //
        {                                                        // 根据币差 决定的 买卖方向 ， 检测账户币数 或者 钱数是否足够。
            amount = Math.min(nowAccount.Stocks, amount);                      // 确保下单量 amount 不会超过 当前 账户 的可用币数。
        }//
        else //
        {
            amount = Math.min(nowAccount.Balance / price, amount);             // 确保下单量 amount 不会超过 当前 账户 的可用钱数。
        }
        if (amount < exchange.GetMinStock()) //
        {                                 // 检测 最终下单数量 是否 小于 交易所 允许的最小下单量
            Log("资金不足, 无法平衡到初始状态");                                    // 如果 下单量过小，则打印 信息。
            ok = false;                                                         // 标记 平衡失败
            break;                                                              // 跳出 while 循环
        }
        pfn(price, amount);                                                     // 执行 下单 API (pfn 引用)
        Sleep(1000);                                                            // 暂停 1 秒
        cancelPending();                                                        // 取消所有挂单。
        nowAccount = _C(exchange.GetAccount);                                   // 获取当前 最新账户信息
    }
    if (ok) //
    {                                                                   // 当 ok 为 true （平衡成功） 时执行 花括号内代码
        LogProfit(_N(nowAccount.Balance - orgAccount.Balance));                 // 用传入的参数 orgAccount （平衡前的账户信息）的Balance 属性 减去当前的 账户信息的 Balance 属性，即 钱数之差， 
        // 也就是 盈亏 （因币数不变，略有误差 因为有些很小的 量不能平衡）
        Log("平衡完成", nowAccount);                                              // 输出日志 平衡完成。
    }
}

var STATE_WAIT_OPEN = 0;                                                        // 用于 fishTable 中每个 节点的  状态
var STATE_WAIT_COVER = 1;                                                       // ...
var STATE_WAIT_CLOSE = 2;                                                       // ...
var ProfitCount = 0;                                                            // 盈亏次数 记录
var BuyFirst = true;                                                            // 初始 界面参数
var IsSupportGetOrder = true;                                                   // 交易所 是否支持  GetOrder API 函数, 全局变量， 用于 main 函数开始的判断
var LastBusy = 0;                                                               // 记录上次 处理的时间对象

function setBusy() //
{                            // 设置 Busy 时间
    LastBusy = new Date();                      // 给 LastBusy 赋值当前的时间对象
}

function isTimeout() //
{                                                          // 判断是否超时
    if (MaxIdle <= 0) //
    {                                                         // 最大空闲时间（基于 是否自动 移动网格）， 如果 最大空闲时间 MaxIdle 设置小于等于0
        return false;                                                           // 返回 false， 不判断 超时。即 总是返回false 未超时。
    }
    var now = new Date();                                                       // 获取当前时间对象
    if (((now.getTime() - LastBusy.getTime()) / 1000) >= MaxIdle) //
    {             // 使用当前时间对象的 getTime 函数 获取时间戳 与 LastBusy 的时间戳 计算差值，
        // 除以1000 算出 两个时间对象间 相差的秒数。 判断是否大于 最大空闲时间MaxIdle
        LastBusy = now;                                                         // 如果是大于，  更新 LastBusy 为当前时间对象 now
        return true;                                                            // 返回 true ，即超时。
    }
    return false;                                                               // 返回 false 未超时
}

function onexit() //
{                             // 程序 退出 时的收尾函数。
    if (CancelAllWS) //
    {                          // 设置了 停止时取消所有挂单，则 调用 cancelPending() 函数 取消所有挂单
        Log("正在退出, 尝试取消所有挂单");
        cancelPending();
    }
    Log("策略成功停止");
    Log(_C(exchange.GetAccount));               // 打印退出程序时的  账户持仓信息。
}


function fishing(orgAccount, fishCount) //
{    // 撒网  参数 ： 账户信息 ，撒网次数
    setBusy();                               // 设置 LastBuys 为当前 时间戳
    var account = _C(exchange.GetAccount);   // 声明一个  account  变量 ， 获取当前 账户信息  并 赋值。
    Log(account);                            // 输出  本次调用 fishing 函数 开始 时的账户信息。
    var InitAccount = account;               // 声明一个 变量 InitAccount 并用 account 赋值。 此处是 记录 本次 撒网 前的 初始账户资金，用于计算 浮动盈亏。
    var ticker = _C(exchange.GetTicker);     // 获取 行情 赋值给 声明的 ticker 变量
    var amount = _N(AmountOnce);             // 根据 界面参数 单笔数量，使用 _N 处理小数位（_N 默认 保留2位），赋值给 amount 。
    var amountB = [amount];                  // 声明一个 变量 叫  amountB  是一个数组，用 amount 初始化 一个元素
    var amountS = [amount];                  // 声明一个 变量 叫  amountS  ...
    if (typeof (AmountType) !== 'undefined' && AmountType == 1) //
    {     // 按自定义量 ，订单大小类型 这个界面参数如果不是未定义的，
        //并且 AmountType 在界面上设定为 自定义量，即AmountType 值为 1 （下拉框的索引） 
        for (var idx = 0; idx < AllNum; idx++) //
        {      // AllNum 总数量。 如果是设置自定义量， 根据总数量 循环一定次数 给amountB/amountS 即买卖单量数组赋值
            amountB[idx] = BAmountOnce;               // 使用界面参数  给买单量数组 赋值
            amountS[idx] = SAmountOnce;               // ...         给卖单...
        }
    }//
    else //
    {                                          // 其它
        for (var idx = 1; idx < AllNum; idx++) //
        {      // 根据网格总数量 循环。
            switch (AmountCoefficient[0]) //
            {           // 根据界面参数 差量 这个字符串的 第一个 字符，即 AmountCoefficient[0] 是 '+'、'-'、'*'、'/'
                case '+':                             // 根据 界面参数 进行 构造 下单量加法递增的网格。
                    amountB[idx] = amountB[idx - 1] + parseFloat(AmountCoefficient.substring(1));
                    break;
                case '-':                             // ... 
                    amountB[idx] = amountB[idx - 1] - parseFloat(AmountCoefficient.substring(1));
                    break;
                case '*':
                    amountB[idx] = amountB[idx - 1] * parseFloat(AmountCoefficient.substring(1));
                    break;
                case '/':
                    amountB[idx] = amountB[idx - 1] / parseFloat(AmountCoefficient.substring(1));
                    break;
            }
            amountB[idx] = _N(amountB[idx], AmountDot);   // 买单 、买单 量相同，处理好数据小数位。
            amountS[idx] = amountB[idx];                  // 赋值。
        }
    }
    if (FirstPriceAuto) //
    {                                 // 如果界面参数设置了 首价格自动 为 true ，执行 if 花括号内代码。
        FirstPrice = BuyFirst ? _N(ticker.Buy - PriceGrid, Precision) : _N(ticker.Sell + PriceGrid, Precision);
        // 界面参数  FirstPrice 根据 BuyFirst全局变量（声明初始为true，在main开始已经根据OpType赋值）设定第一个价格，用此刻行情 ticker 和 界面参数 PriceGrid 价格间距去设定。 
    }
    // Initialize fish table    初始化网格
    var fishTable = //
        {};                         // 声明一个 网格对象
    var uuidTable = //
        {};                         // 识别码 表格对象
    var needStocks = 0;                         // 所需币数 变量
    var needMoney = 0;                          // 所需 钱  变量
    var actualNeedMoney = 0;                    // 实际需要的 钱
    var actualNeedStocks = 0;                   // 实际需要的 币
    var notEnough = false;                      // 资金不足 标记变量， 初始设置为false
    var canNum = 0;                             // 可用 网格
    for (var idx = 0; idx < AllNum; idx++) //
    {    // 根据 网格数 AllNum 去遍历 构造。
        var price = _N((BuyFirst ? FirstPrice - (idx * PriceGrid) : FirstPrice + (idx * PriceGrid)), Precision);
        // 遍历构造时，当前的索引idx 的 价格 设置 根据 BuyFirst 去设置。 每个索引价格 之间的间距 为 PriceGrid .
        needStocks += amountS[idx];                      // 卖出所需 币数 随着 循环逐步 累计。（由 卖单量数组逐个累计到 needStocks）
        needMoney += price * amountB[idx];               // 买入所需 钱数 随着 循环逐步 累计。（.... 买单量数组逐个累计...）
        if (BuyFirst) //
        {                                  // 处理 先买 
            if (_N(needMoney) <= _N(account.Balance)) //
            {  // 如果 网格所需的钱 小于 账户上的可用钱数
                actualNeedMondy = needMoney;             // 赋值给 实际所需要的钱数
                actualNeedStocks = needStocks;           // 赋值给 实际所需要的币数    该出有些问题？
                canNum++;                                // 累计 可用网格数
            }//
            else //
            {                                     // _N(needMoney) <= _N(account.Balance) 该条件不满足，则设置 资金不足标记变量 为 true
                notEnough = true;
            }
        }//
        else //
        {                                         // 处理 先卖
            if (_N(needStocks) <= _N(account.Stocks)) //
            {  // 检测 所需币数 是不是 小于 账户 可用币数
                actualNeedMondy = needMoney;             // 赋值
                actualNeedStocks = needStocks;
                canNum++;                                // 累计可用网格数
            }//
            else //
            {
                notEnough = true;                        // 不满足资金条件 ，就设置  true
            }
        }
        fishTable[idx] = STATE_WAIT_OPEN;                // 根据当前索引idx，设置网格对象的idx成员（网格结点）的状态，初始为STATE_WAIT_OPEN（等待开仓）
        uuidTable[idx] = -1;                             // 编号对象 也根据当前 idx 初始化 自己的idx 值（对应 fishTable 的节点）为 -1
    }
    if (!EnableAccountCheck && (canNum < AllNum)) //
    {      // 如果不启用资金检验， 并且 可开 节点 小于 界面参数设置的网格数量（节点总数）时。
        Log("警告, 当前资金只可做", canNum, "个网格, 全网共需", (BuyFirst ? needMoney : needStocks), "请保持资金充足");   // Log 输出 警告信息。
        canNum = AllNum;                                                                                          // 更新可开数量 为界面参数的设置
    }
    if (BuyFirst) //
    {                                                                         // 先买
        if (EnableProtectDiff && (FirstPrice - ticker.Sell) > ProtectDiff) //
        {                // 开启差价保护 并且 入市价格 减去 此刻卖一 大于 入市差价保护
            throw "首次买入价比市场卖1价高" + _N(FirstPrice - ticker.Sell, Precision) + ' 元';  // 抛出错误 信息。
        }//
        else if (EnableAccountCheck && account.Balance < _N(needMoney)) //
        {                 // 如果启用资金检验  并且 账户 可用钱数 小于 网格所需资金钱数。
            if (fishCount == 1) //
            {                                                           // 如果是第一次撒网
                throw "资金不足, 需要" + _N(needMoney) + "元";                                // 抛出错误 资金不足
            }//
            else //
            {
                Log("资金不足, 需要", _N(needMoney), "元, 程序只做", canNum, "个网格 #ff0000");  // 如果不是 第一次 撒网， 输出提示信息。
            }
        }//
        else //
        {                                                                            // 其他情况， 没有开启 资金检验 、差价保护 等
            Log('预计动用资金: ', _N(needMoney), "元");                                        // 输出 预计动用资金。
        }
    }//
    else //
    {                                                                                // 先卖， 一下类似 先买
        if (EnableProtectDiff && (ticker.Buy - FirstPrice) > ProtectDiff) //
        {
            throw "首次卖出价比市场买1价高 " + _N(ticker.Buy - FirstPrice, Precision) + ' 元';
        }//
        else if (EnableAccountCheck && account.Stocks < _N(needStocks)) //
        {
            if (fishCount == 1) //
            {
                throw "币数不足, 需要 " + _N(needStocks) + " 个币";
            }//
            else //
            {
                Log("资金不足, 需要", _N(needStocks), "个币, 程序只做", canNum, "个网格 #ff0000");
            }
        }//
        else //
        {
            Log('预计动用币数: ', _N(needStocks), "个, 约", _N(needMoney), "元");
        }
    }

    var trader = new Trader();                                          // 构造一个 Trader 对象， 赋值给 此处声明的 trader 变量。
    var OpenFunc = BuyFirst ? exchange.Buy : exchange.Sell;             // 根据 是否先买后卖 ，设定开仓函数OpenFunc 是 引用 exchange.Buy 还是 exchange.Sell
    var CoverFunc = BuyFirst ? exchange.Sell : exchange.Buy;            // 同上
    if (EnableDynamic) //
    {                                                // 根据界面参数 EnableDynamic (是否动态挂单) 是否开启， 去再次 设定 OpenFunc/CoverFunc
        OpenFunc = BuyFirst ? trader.Buy : trader.Sell;                 // 引用 trader 对象的 成员函数 Buy 用于 动态挂单 （主要是由于一些交易所 限制挂单数量，所以就需要虚拟动态挂单）
        CoverFunc = BuyFirst ? trader.Sell : trader.Buy;                // 同上
    }
    var ts = new Date();                                                // 创建此刻时间对象（赋值给ts），用于记录此刻时间。
    var preMsg = "";                                                    // 声明一个 变量 用于记录 上次信息， 初始 空字符串
    var profitMax = 0;                                                  // 最大收益 
    while (true) //
    {                                                      // 网格 撒网后的 主要 逻辑
        var now = new Date();                                           // 记录 当前循环 开始的时的时间
        var table = null;                                               // 声明一个 变量
        if (now.getTime() - ts.getTime() > 5000) //
        {                      // 计算当前 时间 now 和 记录的时间 ts 之间的差值 是否大于 5000 毫秒
            if (typeof (GetCommand) == 'function' && GetCommand() == "收网") //
            {         // 检测是否 接收到 策略 交互控件 命令  “收网”，停止并平衡到初始状态
                Log("开始执行命令进行收网操作");                                          // 输出 信息 
                balanceAccount(orgAccount, InitAccount);                              // 执行平衡函数 ，平衡币数 到初始状态
                return false;                                                         // 本次 撒网函数  fishing 返回 false
            }
            ts = now;                                                                 // 用当前时间 now 更新 ts，用于下次比对时间
            var nowAccount = _C(exchange.GetAccount);                                 // 声明 nowAccount 变量  并初始为当前最新 账户信息。
            var ticker = _C(exchange.GetTicker);                                      // 声明 ticker 变量 并初始为当前行情信息
            if (EnableDynamic) //
            {                                                      // 如果开启动态挂单
                trader.Poll(ticker, DynamicMax);                                      // 调用 trader 对象的 Poll 函数 ，根据 当前 ticker 行情，和 界面参数 DynamicMax（订单失效距离）检测 并 处理 所有订单。
            }
            var amount_diff = (nowAccount.Stocks + nowAccount.FrozenStocks) - (InitAccount.Stocks + InitAccount.FrozenStocks);  // 计算当前的 币差
            var money_diff = (nowAccount.Balance + nowAccount.FrozenBalance) - (InitAccount.Balance + InitAccount.FrozenBalance); // 计算当前的 钱差
            var floatProfit = _N(money_diff + (amount_diff * ticker.Last));           // 计算 当前 本次撒网 的浮动盈亏
            var floatProfitAll = _N((nowAccount.Balance + nowAccount.FrozenBalance - orgAccount.Balance - orgAccount.FrozenBalance) + ((nowAccount.Stocks + nowAccount.FrozenStocks - orgAccount.Stocks - orgAccount.FrozenStocks) * ticker.Last));
            // 计算 总体的浮动盈亏

            var isHold = Math.abs(amount_diff) >= exchange.GetMinStock();             // 如果 此刻 币差 绝对值 大于 交易所最小 交易量 ，代表已经持仓
            if (isHold) //
            {                                                             // 已经持仓 则执行  setBusy() 函数，该函数会给 LastBusy 更新时间。
                setBusy();                                                            // 即  开仓后开始  启动开仓机制。
            }

            profitMax = Math.max(floatProfit, profitMax);                             // 刷新 最大浮动盈亏
            if (EnableAccountCheck && EnableStopLoss) //
            {                               // 如果启动账户检测 并且 启动 止损
                if ((profitMax - floatProfit) >= StopLoss) //
                {                          // 如果 最大浮动盈亏 减去 当前浮动盈亏 大于等于 最大浮动亏损值，则执行 花括号内代码
                    Log("当前浮动盈亏", floatProfit, "利润最高点: ", profitMax, "开始止损");   // 输出信息
                    balanceAccount(orgAccount, InitAccount);                          // 平衡账户
                    if (StopLossMode == 0) //
                    {                                          // 根据 止损模式 处理， 如果 StopLossMode 等于 0 ，即 止损后退出程序。
                        throw "止损退出";                                               // 抛出错误 “止损退出”  策略停止。
                    }//
                    else //
                    {
                        return true;                                                   // 除了 止损后退出模式，  即 ： 止损后重新撒网。
                    }
                }
            }
            if (EnableAccountCheck && EnableStopWin) //
            {                                 // 如果开启了 检测账户 并且 开启了 止盈
                if (floatProfit > StopWin) //
                {                                           // 如果 浮动盈亏 大于 止盈
                    Log("当前浮动盈亏", floatProfit, "开始止盈");                         // 输出日志
                    balanceAccount(orgAccount, InitAccount);                           // 平衡账户 恢复初始 （止盈）
                    if (StopWinMode == 0) //
                    {                                            // 根据止盈模式 处理。
                        throw "止盈退出";                                                // 止盈后退出
                    }//
                    else //
                    {
                        return true;                                                    // 止盈后 返回 true ， 继续撒网
                    }
                }
            }
            var distance = 0;                                                           // 声明 一个 变量 用来 记录 距离
            if (EnableAccountCheck && AutoMove) //
            {                                       // 如果开启 账户检测 并且 网格自动移动
                if (BuyFirst) //
                {                                                         // 如果是 先买后卖 
                    distance = ticker.Last - FirstPrice;                                // 给 distance 赋值 ： 当前的价格 减去 首价格,算出距离 
                }//
                else //
                {                                                                // 其他情况 ： 先卖后买
                    distance = FirstPrice - ticker.Last;                                // 给 distance 赋值 ： 首价格 减去 当前价格，算出距离
                }
                var refish = false;                                                     // 是否重新撒网 标记变量
                if (!isHold && isTimeout()) //
                {                                           // 如果没有持仓（isHold 为 false） 并且 超时（isTimeout 返回 true）
                    Log("空仓过久, 开始移动网格");
                    refish = true;                                                      // 标记 重新撒网 
                }
                if (distance > MaxDistance) //
                {                                           // 如果 当前 的距离 大于 界面参数设定的最大距离， 标记 重新撒网
                    Log("价格超出网格区间过多, 开始移动网格, 当前距离: ", _N(distance, Precision), "当前价格:", ticker.Last);
                    refish = true;
                }
                if (refish) //
                {                                                           // 如果 refish 是 true ,则执行 平衡函数 
                    balanceAccount(orgAccount, InitAccount);
                    return true;                                                        // 本次 撒网函数 返回 true
                }
            }

            var holdDirection, holdAmount = "--",                                       // 声明 三个 变量，持仓方向、持仓数量、持仓价格
                holdPrice = "--";
            if (isHold) //
            {                                                               // 持仓时
                if (RestoreProfit && ProfitAsOrg) //
                {                                     // 如果 开启 恢复上次盈利 并且 上次盈利算入均价
                    if (BuyFirst) //
                    {                                                     // 如果是先买后卖 
                        money_diff += LastProfit;                                       // 把上次盈利 加入 money_diff ，即 上次收益 折合入 钱差（在先买的情况，钱差为负值，即花费的），折合入开仓成本。
                    }//
                    else //
                    {                                                            // 如果是先卖后买
                        money_diff -= LastProfit;                                       // 先卖后买 钱差 为 正值 , why - ?
                    }
                }

                // 处理先买后卖
                holdAmount = amount_diff;                                               // 币差 赋值 给持仓数量 （此刻币差 即 持仓）
                holdPrice = (-money_diff) / amount_diff;                                // 用 钱差 除以 币差 算出 持仓均价， 
                // 注意 ： 如果 money_diff 为 负值 ，则amount_diff 一定为正值，所以一定要在 money_diff 前加 负号，这样算出的价格才是 正数
                // 处理先卖后买
                if (!BuyFirst) //
                {                                                        // 如果是 先卖后买 则触发 更新 持仓量 和 持仓均价
                    holdAmount = -amount_diff;                                          // 币差为负数  ，所以取反
                    holdPrice = (money_diff) / -amount_diff;                            // 计算持仓均价。
                }
                holdAmount = _N(holdAmount, 4);                                         // 持仓量，保留4位小数。
                holdPrice = _N(holdPrice, Precision);                                   // 持仓均价， 保留 Precision 位小数。
                holdDirection = BuyFirst ? "多" : "空";                                  // 根据 先买后卖 或者 先卖后买 给 holdDirection 赋值 多 或者 空
            }//
            else //
            {                                                                    // 如果 isHold 为false ,给holdDirection 赋值 "--"
                holdDirection = "--";
            }
            table = //
            {                                                                   // 给声明 的 table 变量 赋值一个 对象，用于在 发明者量化 机器人 状态栏上显示 表格信息
                type: 'table',                                                          // 详见 API 文档 LogStatus 函数， 这里给 type 属性 初始化 'table' 用于在状态栏显示成表格
                title: '运行状态',                                                        // 表格的 标题
                cols: ['动用资金', '持有仓位', '持仓大小', '持仓均价', '总浮动盈亏', '当前网格盈亏', '撒网次数', '网格偏移', '真实委托', '最新币价'],   // 表格的 列名
                rows: [                                                                                                                   // 表格的 逐行的数据
                    [_N(actualNeedMondy, 4), holdDirection, holdAmount, holdPrice, _N(floatProfitAll, 4) + ' ( ' + _N(floatProfitAll * 100 / actualNeedMondy, 4) + ' % )', floatProfit, fishCount, (AutoMove && distance > 0) ? ((BuyFirst ? "向上" : "向下") + "偏离: " + _N(distance) + " 元") : "--", trader.RealLen(), ticker.Last]
                    // 一行数据
                ]
            };

        }                                                                               // 每间隔 5 秒处理 一些任务， 并更新 机器人状态栏 表格对象 table 

        var orders = _C(trader.GetOrders);                                              // 获取 所有未完成的订单
        if (table) //
        {                                                                    // 如果 table 已经被 赋值表格对象
            if (!EnableDynamic) //
            {                                                       // 如果没有开启动态挂单
                table.rows[0][8] = orders.length;                                       // 在状态栏 表格 第一行 第9列 位置 更新 挂单数组的长度
            }
            LogStatus('`' + JSON.stringify(table) + '`');                               // 调用 发明者量化 平台 API LogStatus 显示 设置的状态栏表格
        }
        for (var idx = 0; idx < canNum; idx++) //
        {                                        // 遍历 可用的 网格节点数量。
            var openPrice = _N((BuyFirst ? FirstPrice - (idx * PriceGrid) : FirstPrice + (idx * PriceGrid)), Precision);        // 随着 节点 索引 idx 遍历，构造每个节点的 开仓价 （方向由 先买后卖，或者先卖后买 决定） 
            var coverPrice = _N((BuyFirst ? openPrice + PriceDiff : openPrice - PriceDiff), Precision);     // 开仓平仓价差，即 每个节点的盈利空间
            var state = fishTable[idx];                                                                     // 赋值 渔网 节点的状态
            var fishId = uuidTable[idx];                                                                    // 编号

            // 此处判断作用为： 过滤 未完成的订单
            if (hasOrder(orders, fishId)) //
            {                                                                 // 如果 所有未完成订单，即挂单数组 中有ID为 fishId 的订单
                continue;                                                                                   // 跳过本次循环  继续循环
            }

            if (fishId != -1 && IsSupportGetOrder) //
            {                                                        // 网格 节点 id 不等于 初始值，即下过订单，并且 交易所支持 GetOrder
                var order = trader.GetOrder(fishId);                                                        // 获取 该 fishId 号 的订单
                // 此处判断作用为： 过滤 没有找到订单 的 网格节点，以下判断(state == STATE_WAIT_COVER) 等等 的逻辑不会触发
                if (!order) //
                {                                                                               // 如果 !order 为真 即获取订单失败 
                    Log("获取订单信息失败, ID: ", fishId);                                                     // 输出日志
                    continue;                                                                               // 跳过本次循环 继续循环
                }
                // 此处判断作用为： 过滤 处于挂起状态，未成交，或者 未完全成交的 网格节点， 以下判断(state == STATE_WAIT_COVER) 等等 的逻辑不会触发
                if (order.Status == ORDER_STATE_PENDING) //
                {                                                  // 如果订单状态 是在交易所 挂起状态
                    //Log("订单状态为未完成, ID: ", fishId);
                    continue;                                                                               // 跳过本次循环 继续循环
                }
            }

            if (state == STATE_WAIT_COVER) //
            {                                                                // 如果 当前节点 状态是 等待平仓
                var coverId = CoverFunc(coverPrice, (BuyFirst ? amountS[idx] : amountB[idx]), (BuyFirst ? '完成买单:' : '完成卖单:'), openPrice, '量:', (BuyFirst ? amountB[idx] : amountS[idx]));
                // 调用 平仓 函数 CoverFunc 挂出 平仓单

                if (typeof (coverId) === 'number' || typeof (coverId) === 'string') //
                {        // 判断 如果 平仓函数 返回的 Id 为 数值（由 发明者量化 API 直接返回） 或者 字符串（由 trader 对象的 Buy/Sell函数返回）
                    fishTable[idx] = STATE_WAIT_CLOSE;                                     // 已经挂出  平仓单， 更新状态为 ：  STATE_WAIT_CLOSE 即等待 节点任务完成
                    uuidTable[idx] = coverId;                                              // 把 订单号 储存在 uuidTable 对应的 idx 位置上。
                }
            }//
            else if (state == STATE_WAIT_OPEN || state == STATE_WAIT_CLOSE) //
            {            // 如果状态是 等待开仓 或者 等待完成
                var openId = OpenFunc(openPrice, BuyFirst ? amountB[idx] : amountS[idx]);  // 下开仓单。
                if (typeof (openId) === 'number' || typeof (openId) === 'string') //
                {          // 判断是否下单成功
                    fishTable[idx] = STATE_WAIT_COVER;                                     // 更新状态 为等待平仓
                    uuidTable[idx] = openId;                                               // 记录当前 节点 订单ID
                    if (state == STATE_WAIT_CLOSE) //
                    {                                       // 如果是等待完成 （开仓订单下了后 才会触发）
                        ProfitCount++;                                                     // 累计盈利次数
                        var account = _C(exchange.GetAccount);                             // 获取当前账户信息
                        var ticker = _C(exchange.GetTicker);                               // 获取当前行情信息
                        var initNet = _N(((InitAccount.Stocks + InitAccount.FrozenStocks) * ticker.Buy) + InitAccount.Balance + InitAccount.FrozenBalance, 8);
                        // 计算 初始 资产 净值
                        var nowNet = _N(((account.Stocks + account.FrozenStocks) * ticker.Buy) + account.Balance + account.FrozenBalance, 8);
                        // 计算 当前 资产 净值
                        var actualProfit = _N(((nowNet - initNet)) * 100 / initNet, 8);    // 计算 收益率
                        if (AmountType == 0) //
                        {                                             // 根据 买卖同量  ， 自定义量  不同的处理。
                            var profit = _N((ProfitCount * amount * PriceDiff) + LastProfit, 8);      // 计算： 所有盈利节点的 盈亏 和 上次撒网盈亏 之和 即 总盈亏
                            Log((BuyFirst ? '完成卖单:' : '完成买单:'), coverPrice, '量:', (BuyFirst ? amountS[idx] : amountB[idx]), '平仓收益', profit);
                            // 输出 订单完成信息
                        }//
                        else //
                        {
                            Log((BuyFirst ? '完成卖单:' : '完成买单:'), coverPrice, '量:', (BuyFirst ? amountS[idx] : amountB[idx]));
                        }
                    }
                }
            }
        }
        Sleep(CheckInterval);                        // 网格逻辑 主要 while 循环检测， 每次 暂停一定时间 CheckInterval 即：检测间隔
    }
    return true;                                     // 本次撒网完成 返回 true
}

function main() //
{                                    // 策略主函数，程序从这里开始执行。
    if (ResetData) //
    {                                 // RestData 为界面参数， 默认 true ， 控制 启动时 是否清空所有数据。默认全部清空。
        LogProfitReset();                            // 执行 API LogProfitReset 函数，清空 所有收益。
        LogReset();                                  // 执行 API LogReset 函数， 清空 所有日志。
    }
    // exchange.SetMaxDigits(Precision)              // 已废弃,使用 exchange.SetPrecision 代替。
    exchange.SetPrecision(Precision, 3)              // exchange.SetPrecision(2, 3); // 设置价格小数位精度为2位, 品种下单量小数位精度为3位
    // Precision 为界面参数。

    if (typeof (AmountType) === 'undefined') //
    {        // 订单 数量类型， 0：“买卖同量” ，  1：“自定义量”  ， 检测 如果该参数是 未定义的，默认设置 0 。
        AmountType = 0;                              // typeof 会 检测 AmountType 的类型， 如果是 undefined  即 “未定义” ，则给 AmountType 赋值 0。
    }
    if (typeof (AmountDot) === 'undefined') //
    {         // 订单量 小数点 最长位数 AmountDot 如果是 未定义的， 设置 AmountDot 为 3 。
        AmountDot = 3;                               // 其实已经由 exchange.SetPrecision(Precision, 3) 设置过了，在底层会截断处理。
    }
    if (typeof (EnableDynamic) === 'undefined') //
    {     // 检测 是否 开启动态挂单 参数，  如果 EnableDynamic 是未定义的， 设置 为 false 即 不开启。
        EnableDynamic = false;
    }
    if (typeof (AmountCoefficient) === 'undefined') //
    { // 如果未定义， 默认设置   "*1"
        AmountCoefficient = "*1";
    }
    if (typeof (EnableAccountCheck) === 'undefined') //
    {// 如果未定义， 启用资金检验 参数 设置为 true ，即 开启。
        EnableAccountCheck = true;
    }
    BuyFirst = (OpType == 0);                        // 根据 OpType 的设置 去 给BuyFirst 赋值， OpType 设置网格类型， 0： 先买后卖， 1： 先卖后买
    IsSupportGetOrder = exchange.GetName().indexOf('itstamp') == -1;    // 检测 交易所 名称， 如果是  Bitstamp  则提醒
    if (!IsSupportGetOrder) //
    {
        Log(exchange.GetName(), "不支持GetOrder, 可能影响策略稳定性.");
    }

    SetErrorFilter("502:|503:|S_U_001|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|refused|EOF|When");
    // SetErrorFilter  过滤错误信息  

    exchange.SetRate(1);
    Log('已经禁用汇率转换, 当前货币为', exchange.GetBaseCurrency());    // 禁用汇率转换

    if (!RestoreProfit) //
    {     //  恢复上次盈利 若果是  false 则 给 LastProfit 赋值 0 ， 即不恢复。
        LastProfit = 0;
    }

    var orgAccount = _C(exchange.GetAccount);     // 获取账户信息，    此处记录 策略开始运行时的 初始账户信息 ，用于 计算一些收益，如： 总体浮动盈亏 等。本策略有几个参数 都是 该变量传入。
    var fishCount = 1;                            // 撒网次数 初始1
    while (true) //
    {                                // 策略 主循环
        if (!fishing(orgAccount, fishCount)) //
        {    // 撒网函数 fishing
            break;
        }
        fishCount++;                              // 撒网次数 累计
        Log("第", fishCount, "次重新撒网...");      // 输出 撒网信息。
        FirstPriceAuto = true;                    // 重置 首价格自动 为true
        Sleep(1000);                              // 轮询间隔 1000毫秒
    }
}
```

> Detail

https://www.fmz.com/strategy/311968

> Last Modified

2021-09-03 14:37:13
