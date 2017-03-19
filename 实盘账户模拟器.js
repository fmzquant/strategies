/*
策略出处: https://www.botvs.com/strategy/35977
策略名称: 实盘账户模拟器
策略作者: 小小梦
策略描述:

实盘 账户模拟器
用于在实盘环境中，模拟交易，不真实下单。
减少测试成本。


参数                   默认值                       描述
-------------------  ------------------------  -------
VirtualExchangeList  0, 3, 10000; 1, 4, 15000  模拟交易所列表
isUse                true                      是否启用
*/

/*参数
*/
//功能函数
var VirtualIndex = 0;
var Originals = [];
var Accounts = [];
var VirtualOrderID = 0;
var VirtualOrders = [];
var BUY = 0;
var SELL = 1;

// 功能函数
function CalcMarketOrderDealPrice(Amount, current_e_Index, direction){
    var depth = null;
    var dealPrice = null;
    while(true){
        depth = exchanges[current_e_Index].GetDepth();
        if(depth && depth.Asks.length !== 0 && depth.Bids.length !== 0){
            break;
        }
        Sleep(500);
    }
    var deep = null;
    var sumAmount = 0;
    var sumPay = 0;
    direction == BUY ? deep = depth.Asks : deep = depth.Bids;
    for(var i = 0 ; i < deep.length ; i++){
        sumAmount += deep[i].Amount;
        if(Amount < sumAmount){
            sumPay += (Amount - (sumAmount - deep[i].Amount));
            dealPrice = _N(sumPay / Amount);
        }
        sumPay += deep[i].Amount * deep[i].Price;
    }
    return dealPrice;
}

var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};

function init(){
    if(isUse){
        var maxlenth = exchanges.length;
        var VE_str = VirtualExchangeList.split(';');
        var VES = [];
        if(maxlenth < VE_str.length){
            throw "VirtualExchangeList 参数 与 添加的交易所 不匹配！--> VirtualExchangeList:" + VirtualExchangeList;
        }
    
        for(var i = 0 ; i < VE_str.length; i++){
            var ele_array = VE_str[i].split(',');
        
            if(ele_array.length !== 3 || isNaN(Number(ele_array[0])) || isNaN(Number(ele_array[1])) || isNaN(Number(ele_array[2]))){
                throw "VirtualExchangeList 参数错误： " + ele_array;
            }
            var VE = {
                exchangeIndex : Number(ele_array[0]),
                VirtualStocks : Number(ele_array[1]),
                VirtualBalance : Number(ele_array[2]),
            };
            VES.push(VE);
        }
        for(var x = 0 ; x < VES.length ; x++){
            $.OpenVirtual(exchanges[VES[x].exchangeIndex], VES[x].VirtualStocks, VES[x].VirtualBalance);
            Log("初始化交易所模拟账户，名称：", exchanges[VES[x].exchangeIndex].GetName(), "模拟账户信息：", _C(exchanges[VES[x].exchangeIndex].GetAccount), "手续费：",exchanges[VES[x].exchangeIndex].GetFee());
        }
    }
}

// 导出函数 
$.OpenVirtual = function(e, Stocks, Balance){
    var obj = {};
    if(typeof(e) !== "object"){
        throw "需要模拟的交易所对象错误，e参数类型：" + typeof(e);
    }
    if(e.GetName() === 'undefined'){
        throw "参数e 不是交易所对象：";
    }

    VirtualIndex++;
    e.VirtualIndex = VirtualIndex;

    var Original = {
        IndexOn_exchanges : null,
        Name : null,
        GetAccount : null,
        Buy : null,
        Sell : null,
        GetOrder : null,
        Go : null,
        Fee : null,
    };

    var current_e_Index = null;
    for(var i = 0; i < exchanges.length; i++){
        if(exchanges[i].VirtualIndex === VirtualIndex){
            current_e_Index = i;
        }
    }

    // 储存原始 引用, 其它数据
    Original.IndexOn_exchanges = current_e_Index;
    Original.GetAccount = e.GetAccount;
    Original.Buy = e.Buy;
    Original.Sell = e.Sell;
    Original.GetOrder = e.GetOrder;
    Original.Go = e.Go;
    Original.Name = e.GetName();
    Original.Fee = e.GetFee();
    
    var Account = {
        Stocks: Stocks,      // Stocks
        FrozenStocks : 0,    // FrozenStocks
        Balance : Balance,   // Balance
        FrozenBalance : 0    // FrozenBalance
    };

    Accounts[current_e_Index] = Account;
    Originals[current_e_Index] = Original;

    // 替换API
    exchanges[current_e_Index].GetAccount = function(){
        // 需要深拷贝
        return cloneObj(Accounts[current_e_Index]);     // clone
    }

    exchanges[current_e_Index].Buy = function(Price, Amount){
        // 处理默认参数
        var args = arguments;
        var parm = "";
        if(args && args.length > 2){
            for(var j = 2 ; j < args.length; j++){
                parm += args[j];
            }
        }
        
        if(Price == -1){   // 处理市价单
            // 输出Log
            Log(Originals[current_e_Index].Name, "　　　　　　　　　　　　　　买入　　" + "市价单" + "　　　" + Amount + "　　" + parm + "#007FFF"); // blue
            var dealPrice = CalcMarketOrderDealPrice(Amount, current_e_Index, BUY); // 根据市价单下单量计算盘口 可吃单的实际成交价。
            

            if(dealPrice * Amount > Accounts[current_e_Index].Balance){
                Log("错误：没有足够的钱买:", "数量：", Amount, Accounts[current_e_Index]);
                return;
            }
            // 更新账户数据
            Accounts[current_e_Index].Stocks += (Amount - Originals[current_e_Index].Fee.Buy * Amount); // 扣除手续费
            Accounts[current_e_Index].Balance -= Amount * dealPrice;

            // 返回ID 
            if(VirtualOrderID > Number.MAX_VALUE - 100){
                VirtualOrderID = 0;
            }
            VirtualOrderID++;
        
            // 模拟产生order
            var order = {"Id": VirtualOrderID, "Price": Price, "Amount": Amount, "DealAmount": Amount, "Type": 0, "Status": 1, "AvgPrice": dealPrice};
            VirtualOrders.push(order);

            return VirtualOrderID;
        }else{  // 限价单处理的有问题
            // 输出Log
            Log(Originals[current_e_Index].Name, "　　　　　　　　　　　　　　买入　　" + Price + "　　　" + Amount + "　　" + parm + "#007FFF"); // blue

            var ticker = _C(exchanges[current_e_Index].GetTicker);
            if(Price > ticker.Last + 10 || Price < ticker.Last - 10){
                Log("错误：下单价格无效，当前最后成交价：", ticker.Last, "ticker:", ticker);
                return;
            }
            if(Price * Amount > Accounts[current_e_Index].Balance){
                Log("错误：下单价格无效，没有足够的钱买, Price:", Price, "数量：", Amount);
                return;
            }
            // 更新账户数据
            Accounts[current_e_Index].Stocks += Amount;
            Accounts[current_e_Index].Balance -= Amount * Price;

            // 返回ID 
            if(VirtualOrderID > Number.MAX_VALUE - 100){
                VirtualOrderID = 0;
            }
            VirtualOrderID++;
        
            // 模拟产生order
            var order = {"Id": VirtualOrderID, "Price": Price, "Amount": Amount, "DealAmount": Amount, "Type": 0, "Status": 1, "AvgPrice": Price};
            VirtualOrders.push(order);

            return VirtualOrderID;
        }
    }

    exchanges[current_e_Index].Sell = function(Price, Amount){
        //Log("测试Sell"); // 测试
        // 处理默认参数
        var args = arguments;
        var parm = "";
        if(args && args.length > 2){
            for(var j = 2 ; j < args.length; j++){
                parm += args[j];
            }
        }

        if(Price == -1){  // 处理市价单
            // 输出Log
            Log(Originals[current_e_Index].Name, "　　　　　　　　　　　　　　卖出　　" + "市价单" + "　　　" + Amount + "　　" + parm + "#32CD32"); // green
            var dealPrice = CalcMarketOrderDealPrice(Amount, current_e_Index, SELL); // 根据市价单下单量计算盘口 可吃单的实际成交价。

            if(Amount > Accounts[current_e_Index].Stocks){
                Log("错误：没有足够的 标的物:", "数量：", Amount, Accounts[current_e_Index]);
                return;
            }
            // 更新账户数据
            Accounts[current_e_Index].Stocks -= Amount;
            Accounts[current_e_Index].Balance += (Amount * dealPrice - Originals[current_e_Index].Fee.Sell * Amount * dealPrice); // 扣除手续费

            // 返回ID
            if(VirtualOrderID > Number.MAX_VALUE - 100){
                VirtualOrderID = 0;
            }
            VirtualOrderID++;

            // 模拟产生order
            var order = {"Id": VirtualOrderID, "Price": Price, "Amount": Amount, "DealAmount": Amount, "Type": 1, "Status": 1, "AvgPrice": dealPrice};
            VirtualOrders.push(order);

            return VirtualOrderID;
        }else{ // 限价单处理的有问题
            // 输出Log
            Log(Originals[current_e_Index].Name, "　　　　　　　　　　　　　　卖出　　" + Price + "　　　" + Amount + "　　" + parm + "#32CD32"); // green

            var ticker = _C(exchanges[current_e_Index].GetTicker);
            if(Price > ticker.Last + 10 || Price < ticker.Last - 10){
                Log("错误：下单价格无效，当前最后成交价：", ticker.Last, "ticker:", ticker);
                return;
            }
            if(Amount > Accounts[current_e_Index].Stocks){
                Log("错误：下单价格无效，没有足够的 标的物, Price:", Price, "数量：", Amount);
                return;
            }
            // 更新账户数据
            Accounts[current_e_Index].Stocks -= Amount;
            Accounts[current_e_Index].Balance += Amount * Price;

            // 返回ID
            if(VirtualOrderID > Number.MAX_VALUE - 100){
                VirtualOrderID = 0;
            }
            VirtualOrderID++;

            // 模拟产生order
            var order = {"Id": VirtualOrderID, "Price": Price, "Amount": Amount, "DealAmount": Amount, "Type": 1, "Status": 1, "AvgPrice": Price};
            VirtualOrders.push(order);

            return VirtualOrderID;
        }
    }

    exchanges[current_e_Index].GetOrder = function(OrderId){
        if(VirtualOrders.length > 300){
            VirtualOrders.shift();
        }
        for(var i = 0 ; i < VirtualOrders.length ; i++){
            if(OrderId == VirtualOrders[i].Id){
                return VirtualOrders[i];
            }
        }
        Log("错误：查询无此ID订单", OrderId);
        return null;
    }

    exchanges[current_e_Index].Go = function(arg1){
        var args = arguments;
        if(arg1 == "Buy" || arg1 == "Sell" || arg1 == "GetAccount" || arg1 == "GetOrder"){
            var GoObj = {};
            if(arg1 == "Buy"){
                GoObj.wait = function(time){
                    return exchanges[current_e_Index].Buy(args[1], args[2]);
                }
                return GoObj;
            }else if(arg1 == "Sell"){
                GoObj.wait = function(time){
                    return exchanges[current_e_Index].Sell(args[1], args[2]);
                }
                return GoObj;
            }else if(arg1 == "GetAccount"){
                GoObj.wait = function(time){
                    return exchanges[current_e_Index].GetAccount();
                }
                return GoObj;
            }else if(arg1 == "GetOrder"){
                GoObj.wait = function(time){
                    return exchanges[current_e_Index].GetOrder(args[1]);
                }
                return GoObj;
            }
        }else{
            // exchanges[current_e_Index].Go = Originals[current_e_Index].Go;
            // Log(current_e_Index, Originals[current_e_Index].Go, arg1, args); // ceshi
            if(args.length === 3){
                return Originals[current_e_Index].Go(arg1, args[1], args[2]);
            }else if(args.length === 2){
                return Originals[current_e_Index].Go(arg1, args[1]);
            }else if(args.length === 1){
                return Originals[current_e_Index].Go(arg1);
            }
        }
    }

};

$.CloseVirtual = function(e){
    
};

$.SetSloid = function(){

};

// 测试
function main(){
    Log(exchange.GetAccount())
    Log(exchange.Go("GetDepth").wait())
    $.OpenVirtual(exchange, 20, 300);
    var initAccount = exchange.GetAccount();
    Log(initAccount);
    Log(exchange.Go("GetDepth").wait())
}

/*
1、order 的结构  {"Id": 3, "Price": 1111, "Amount": 12, "DealAmount": 12, "Type": 1, "Status": 1, "AvgPrice": 0}   // 0 Buy   1 Sell
*/
