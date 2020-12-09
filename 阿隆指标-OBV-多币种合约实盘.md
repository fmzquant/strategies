
> 策略名称

阿隆指标-OBV-多币种合约实盘

> 策略作者

没有如果

> 策略描述

这个策略只适用于OKEX的 USDT 永续合约；
如果需要用于其它合约自行 修改代码；
代码单纯分享，没有写的太严谨，有空再优化；

策略原理是 阿隆指标 OBV背离；实盘跑过一段时间

> 策略参数



|参数|默认值|描述|
|----|----|----|
|CONTRACT_TYPE|swap|合约类似|
|MARGIN_LEVEL|true|杠杆倍数|
|CONTRACT_VALUE|100|单张合约价值|
|PRICE_PRECISION|2|价格精度|
|AROON_POINT_DIFFERENTIAL_RATIO|0.017|价格差值比例|


> 源码 (javascript)

``` javascript

//账号初始币值
if (_G('account_stocks') != null) {
    var ACCOUNT_STOCKS = _G('account_stocks');
} else {
    var ACCOUNT_STOCKS = 0;
}

var TICKER = null;

//收益
if (_G('profit_number') != null) {
    var Profit_number = _G('profit_number');
} else {
    var Profit_number = 0;
}

if (_G('Interval_type_history') != null) {
    var Interval_type = JSON.parse(_G('Interval_type_history'));
} else {
    var Interval_type = new Object();
}


if (_G('aroon_record_history') != null) {
    var Aroon_Record_History = JSON.parse(_G('aroon_record_history'));
} else {
    var Aroon_Record_History = new Object();
}




if (_G('open_position_action_history') != null) {
    var open_position_action = JSON.parse(_G('open_position_action_history'));
} else {
    var open_position_action = new Object();
}


if (_G('max_position_profitratio') != null) {
    var MAX_POSITION_PROFITRATIO =JSON.parse(_G('max_position_profitratio'));
} else {
    var MAX_POSITION_PROFITRATIO = new Object();
}



//记录各个合约的面值
var CONTRACT_VAL = {
    ADA_USDT:100,
    ALGO_USDT:10,
    ATOM_USDT:1,
    BCH_USDT:0.1,
    BSV_USDT:1,
    BTC_USDT:0.01,
    COMP_USDT:0.1,
    DASH_USDT:0.1,
    DOGE_USDT:1000,
    EOS_USDT:10,
    ETC_USDT:10,
    ETH_USDT:0.1,
    IOST_USDT:1000,
    IOTA_USDT:10,
    KNC_USDT:1,
    LINK_USDT:1,
    LTC_USDT:1,
    NEO_USDT:1,
    ONT_USDT:10,
    QTUM_USDT:1,
    THETA_USDT:10,
    TRX_USDT:1000,
    XLM_USDT:100,
    XMR_USDT:0.1,
    XRP_USDT:100,
    XTZ_USDT:1,
    ZEC_USDT:0.1,
}






//记录平仓状态
var CLOSE_POSITION_STATUS = false;

var MACD = {};
var LINE_TYPE = {};

//状态栏显示持仓信息
var TABLE = {
    type: 'table',
    title: '持仓信息',
    cols: ['币种',"余额",'持仓类型','开仓价格','实时价格','强平价格','持仓手数','持仓成本','盈亏值','盈亏比例','持仓峰值','阿隆类型','阿隆up','阿隆dn','OBV_2','OBV_20','动作'],
    rows: [
        ['未开仓', '', '', '', '', '', '', '', '', '']
    ]
};

var TABLE1 = {
    type: 'table',
    title: 'aroon交点信息',
    cols: ['币种','aroon类型','aroon交点时间','收盘价','上根K线收盘价','差值比例'],
    rows: [
        ['未开仓', '', '', '', '', '', '', '', '', '']
    ]
};

//更新状态栏表格信息
function update_table(table,table1) {
    TABLE.rows = table;
    TABLE1.rows = table1;
    LogStatus(
        '`' + JSON.stringify(TABLE) + '`\n' +
        '`' + JSON.stringify(TABLE1) + '`'
    );
}


var RetryInterval = 500; //容错重试间隔(毫秒)
var Debug = true; //显示重试记录
var EnableErrorFilter = false; //屏蔽常见网络错误信息
//容错API列表
var ApiList = 'GetAccount,GetDepth,GetTicker,GetRecords,GetTrades,GetOrders,SetContractType';
// 模板初始化时调用
function init() {
    // 过滤常见错误
    if (EnableErrorFilter) {
        SetErrorFilter("502:|503:|tcp|character|connection|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused");
    }
    // 重定义需要容错的函数
    var names = ApiList.split(',');
    _.each(exchanges, function(e) {
        _.each(names, function(name) {
            if (typeof(e[name]) !== 'function') {
                throw "尝试容错 " + name + " 失败, 请确认存在此API并且输入正确.";
            }
            var old = e[name];
            e[name] = function() {
                var r;
                while (!(r = old.apply(this, Array.prototype.slice.call(arguments)))) {
                    if (Debug) {
                        Log(e.GetLabel(), name, "调用失败", RetryInterval, "毫秒后重试...");
                    }
                    Sleep(RetryInterval);
                }
                return r;
            };
        });
    });
    Log("容错机制开启", names);
}


// 取消所有未完成的挂单
function CancelPendingOrders(e) {
    while (true) { // 循环
        var orders = _C(e.GetOrders);
        var processed = 0;
        orders.forEach(function (order,index) {
            e.CancelOrder(order.Id, order);
            processed++;
            Sleep(2000);
        });
        if(processed == 0){
            break
        }
    }
}


/*
 * 获取持仓信息
 * */
function get_position(e,ticker_last) {
    var position_array = {
                //开仓价格
                position_price:0,
                //持仓类型
                position_type: null,
                //持仓手数
                position_amount: 0,
                //强平价格
                position_liquidationPrice: 0,
                //持仓成本
                position_posCost: 0,
                //可平仓量
                position_avail_qty:0,
                position_profitRatio:0,
                position_profit:0,
    };
    //持仓信息
    var position_data = _C(e.GetPosition);
    if(position_data.length>0){
        position_data.forEach(function (position,index) {
            position_array = {
                //开仓价格
                position_price: position.Price,
                //持仓类型
                position_type: position.Type,
                //持仓手数
                position_amount: position.Amount,
                //强平价格
                position_liquidationPrice: position.Info.liquidation_price,
                //持仓成本
                position_posCost: position.Margin,
                //可平仓量
                position_avail_qty:position.Info.avail_position,
            };
            //持仓盈利比例
            if(position.Type == 1){
                position_array.position_profitRatio =_N((position.Price-ticker_last)/position.Price*position.MarginLevel,4);
            }else if(position.Type == 0){
                position_array.position_profitRatio =_N((ticker_last-position.Price)/position.Price*position.MarginLevel,4);
            }
            //持仓收益
            position_array.position_profit = position_array.position_profitRatio*position_array.position_posCost;
        });
    }
    return position_array;
}



//验证是不是json
function is_json(data,key){
    try {
        if(key == 'position'&&JSON.parse(data)){
            return true
        }else if(key == 'json'&& JSON.parse(data)){
            return true
        }else if(key == 'all_account'&& data.balance != undefined){
            return true
        }else if(key == 'wallet'&& data.length>0){
            return true
        }
    }catch (e) {
    }
    return false;
}


/*
*  获取账户资产估值
* */
function getAssetValuation(){
    var data = null;
    while(true){
        var all_account = exchanges[0].IO("api", "GET", "/api/account/v3/asset-valuation?account_type=0&valuation_currency=usd");
        if(is_json(all_account,'all_account') == true){
            data = all_account;
            break;
        }
        Sleep(1000);
    }
    return data;
}


/*
*  获取资金账户USDT余额
* */
function getAllAccount(){
    var data = null;
    while(true){
        var all_account = exchanges[0].IO("api", "GET", "/api/account/v3/wallet/USDT");
        if(is_json(all_account,'wallet') == true){
            data = all_account[0];
            break;
        }
        Sleep(1000);
    }
    return data;
}




//创建交易所对象
function create_exchange(e) {
    this.e = e;
    this.currency = this.e.GetCurrency();
    //行情信息
    this.ticker = _C(this.e.GetTicker);
    this.position = get_position(this.e,this.ticker.Last);
    this.account = _C(this.e.GetAccount);

    //迁移货币
    this.transfer_account = function transfer(instrument_id,amount) {
        var data = {
            "currency":'usdt',
            "amount":amount,
            "from":9,
            "to":6,
            "instrument_id":instrument_id,
        };
        var transfer = this.e.IO("api","POST","/api/account/v3/transfer",data);
        Log(instrument_id,'----转出货币----',transfer);
    }

    this.transfer_swap = function transfer(to_instrument_id,amount) {
        var data = {
            "currency":'usdt',
            "amount":amount,
            "from":6,
            "to":9,
            "to_instrument_id":to_instrument_id
        };
        var transfer = this.e.IO("api","POST","/api/account/v3/transfer",data);
        Log(to_instrument_id,'----转入货币----',transfer);
    }


    //depth
    this.depth = function depth() {
        var depth_action = true;
        var depth = _C(this.e.GetDepth);
        if(Math.abs(depth.Bids[0].Price - depth.Asks[0].Price)/this.ticker.Last >0.005){
            depth_action = false;
        }
        return depth_action;
    };

    //sell
    this.sell = function sell(price,order_qty,type) {
        var order_id = null;
        var price = Math.abs(price);
        var order_qty = Math.abs(order_qty);
        while (true) {
            //市价交易
            if (type == 'market') {
                //回测试专用
                var depth = _C(this.e.GetDepth);
                //order_id = this.e.Sell(depth.Bids[0].Price, order_qty);
                order_id = this.e.Sell(-1, order_qty,depth.Bids[0].Price);
            }else {
                order_id = this.e.Sell(price,order_qty);
            }

            if (order_id != null) {
                break;
            }
            Sleep(1000);
        }
        return order_id;
    };

    this.buy = function buy(price, order_qty, type) {
        var order_id = null;
        var price = Math.abs(price);
        var order_qty = Math.abs(order_qty);
        while (true) {
            //市价交易
            if (type == 'market') {
                //回测试专用
                var depth = _C(this.e.GetDepth);
                //order_id = this.e.Buy(depth.Asks[0].Price,order_qty);
                order_id = this.e.Buy(-1, order_qty,depth.Asks[0].Price);
            }else {
                order_id = this.e.Buy(price, order_qty);
            }

            if (order_id != null) {
                break;
            }
            Sleep(1000);
        }

        return order_id;
    };

    this.open_position = function(action, order_qty) {

        if (action == 'buy') {
            this.e.SetDirection("buy");
            var order_id = this.buy(false, order_qty, 'market');
        } else if (action == 'sell') {
            this.e.SetDirection("sell");
            var order_id = this.sell(false, order_qty, 'market');
        }
        return order_id;
    };


    this.add_position = function(order_qty) {
        //做多
        if (this.position.position_type == 0) {
            this.e.SetDirection("buy");
            var order_id = this.buy(false, order_qty, 'market');
        //做空
        } else if (this.position.position_type == 1) {
            this.e.SetDirection("sell");
            var order_id = this.sell(false, order_qty, 'market');
        }
        return order_id;
    };


    this.close_position = function(close_position_price,order_qty,type) {
        //强制获取一次持仓信息，防止无持仓情况下去平仓
        var position_temp = get_position(this.e,this.ticker.Last);
        if(position_temp == null||position_temp.position_avail_qty ==0){
            return false;
        }
        order_qty = position_temp.position_avail_qty;

        var close_order_id = null;
        //如果当前持仓是空仓
        if(this.position.position_type == 1) {
            this.e.SetDirection("closesell");
            if(type =='market'){
                close_order_id = this.buy(close_position_price, order_qty,'market');
            }else{
                close_order_id = this.buy(close_position_price, order_qty,'limit');
            }
        } else if(this.position.position_type == 0)  {
            this.e.SetDirection("closebuy");
            if(type =='market'){
                close_order_id = this.sell(close_position_price, order_qty,'market');
            }else{
                close_order_id = this.sell(close_position_price, order_qty,'limit');
            }
        }
        CLOSE_POSITION_STATUS = true;
    };
}

function onexit() {
    //收益
    _G('profit_number', Profit_number);
    _G('account_stocks', ACCOUNT_STOCKS);
    _G('Interval_type_history',JSON.stringify(Interval_type));
    _G('open_position_action_history',JSON.stringify(open_position_action));
    _G('max_position_profitratio',JSON.stringify(MAX_POSITION_PROFITRATIO));
    _G('aroon_record_history',JSON.stringify(Aroon_Record_History));
    Log('退出扫尾函数');
}


function main() {
    // LogProfitReset();
    // LogReset();
    // _G(null);
    // return false;

    _CDelay(1500);
    //设置交易所参数
    for(var i =0; i<exchanges.length; i++){
        exchanges[i].IO("currency",exchanges[i].GetCurrency()+'T');
        exchanges[i].SetContractType(CONTRACT_TYPE);
        exchanges[i].SetMarginLevel(MARGIN_LEVEL);
        Sleep(500);
        Log(exchanges[i].GetCurrency());
    }
    while (true) {
        //记录初始账户金额
        if (ACCOUNT_STOCKS == 0) {
            var asset_valuation = getAssetValuation();
            ACCOUNT_STOCKS = asset_valuation.balance;
        }

        //计算收益
        if(CLOSE_POSITION_STATUS == true){
            Sleep(3000);
            var asset_valuation = getAssetValuation();
            Profit_number = asset_valuation.balance - ACCOUNT_STOCKS;
            LogProfit(Profit_number);
            CLOSE_POSITION_STATUS = false;
        }
        var close_position_action = false;
        var current_record_s = _C(exchanges[0].GetRecords);
        current_record_s = current_record_s[current_record_s.length -1];
        var time = new Date().getTime();
        temp_time = 420000;
        if(current_record_s.Time+temp_time <time ){
            close_position_action = true;
        }

        var table = [];
        var table_1 = [];
        exchanges.forEach(function(e,index){

            var current_exchange = new create_exchange(e);
            var current_currency = current_exchange.currency;
            var current_record = _C(current_exchange.e.GetRecords);
            var current_record_1 = current_record[current_record.length -1];
            var current_record_4 = current_record[current_record.length -6];
            var current_record_2 = current_record[current_record.length -2];
            var aroon = talib.AROON(current_record, 20);
            var aroon_up = aroon[1];
            var aroon_dn = aroon[0];
            aroon_up_2 = aroon_up[aroon_up.length -2];
            aroon_dn_2 = aroon_dn[aroon_dn.length -2];
            aroon_up = aroon_up[aroon_up.length -1];
            aroon_dn = aroon_dn[aroon_dn.length -1];
            var obv_arr = talib.OBV(current_record,14);

            //aroon 切换时 更新状态
            if(aroon_up>aroon_dn&&Interval_type[current_currency] !='buy'){
                if(
                    current_exchange.position.position_type ==null
                    &&Interval_type[current_currency] !=undefined
                    ||
                    current_exchange.position.position_type !=0
                    &&Interval_type[current_currency] !=undefined
                ){
                    open_position_action[current_currency] = true;
                }

                Aroon_Record_History[current_currency] = current_record_1;
                Interval_type[current_currency] = 'buy';

            }else if(aroon_up<aroon_dn&&Interval_type[current_currency] !='sell'){
                if(
                    current_exchange.position.position_type ==null
                    &&Interval_type[current_currency] !=undefined
                    ||
                    current_exchange.position.position_type !=1
                    &&Interval_type[current_currency] !=undefined
                ){
                    open_position_action[current_currency] = true;
                }
                Aroon_Record_History[current_currency] = current_record_1;
                Interval_type[current_currency] = 'sell';
            }

            //不断更新aroon交点K线的信息
            if(Aroon_Record_History[current_currency].Time ==current_record_1.Time){
                Aroon_Record_History[current_currency] =current_record_1;
            }

            var aroon_action = null;
            if(
                Interval_type[current_currency] == 'sell'
             //   &&obv_arr[obv_arr.length-2]<obv_arr[obv_arr.length-20]
                &&current_record_2.Time>Aroon_Record_History[current_currency].Time
                &&current_record_2.Close>=Aroon_Record_History[current_currency].Close*(1+AROON_POINT_DIFFERENTIAL_RATIO)
                &&current_exchange.depth() == true
                &&close_position_action == true
            ){
                aroon_action = 'sell'
            }else if(
                Interval_type[current_currency] == 'buy'
            //    &&obv_arr[obv_arr.length-2] > obv_arr[obv_arr.length-20]
                &&current_record_2.Time>Aroon_Record_History[current_currency].Time
                &&Aroon_Record_History[current_currency].Close*(1-AROON_POINT_DIFFERENTIAL_RATIO)>=current_record_2.Close
                &&current_exchange.depth() == true
                &&close_position_action == true
            ){
                aroon_action = 'buy'
            }

            //判断有没有建仓
            if (
                current_exchange.position.position_type ==null
                &&open_position_action[current_currency] == true
                &&aroon_action != null
      
            ) {
                var all_account = getAllAccount();
                //将资金账户转入资金到交易账号
                if(current_exchange.account.Balance<7&&all_account.available>7){
                    current_exchange.transfer_swap(current_exchange.account.Info.info.underlying.toLowerCase(),7);
                }
                current_exchange.account = _C(current_exchange.e.GetAccount);
                if(current_exchange.account.Balance >= 7){
                    var order_qty = Math.floor((current_exchange.account.Balance*MARGIN_LEVEL*0.93)/(current_exchange.ticker.Last*1.02*CONTRACT_VAL[current_currency]));
                    if(
                        aroon_action == 'buy'
                        &&order_qty>1
                    ){
                        current_exchange.open_position('buy',order_qty,true);
                        open_position_action[current_currency] = false;
                    }else if(
                        aroon_action == 'sell'
                        &&order_qty>1
                    ){
                        current_exchange.open_position('sell',order_qty,true);
                        open_position_action[current_currency] = false;
                    }
                    MAX_POSITION_PROFITRATIO[current_currency] = 0;
                }
            }
            //已建仓
            else if(current_exchange.position.position_type!=null){

                //更新持仓峰值
                if(current_exchange.position.position_profitRatio>MAX_POSITION_PROFITRATIO[current_currency]){
                    MAX_POSITION_PROFITRATIO[current_currency] = current_exchange.position.position_profitRatio;
                }
                if(
                    (MAX_POSITION_PROFITRATIO[current_currency] > 0.25&&MAX_POSITION_PROFITRATIO[current_currency]<=0.55
                     && MAX_POSITION_PROFITRATIO[current_currency]-current_exchange.position.position_profitRatio>0.11)
                    ||
                    (MAX_POSITION_PROFITRATIO[current_currency] > 0.55&& MAX_POSITION_PROFITRATIO[current_currency]-current_exchange.position.position_profitRatio>0.14)
                    ||
                    current_exchange.position.position_profitRatio < -0.4
                ){
                    current_exchange.close_position(false,current_exchange.position.position_amount,'market');
                }
            }
            //将余币迁移到资金账户
            else if(
                current_exchange.account.Balance>0.1
                ||current_exchange.account.Info.info.margin_frozen>0.1
            ){
                CancelPendingOrders(current_exchange.e)
                current_exchange.account = _C(current_exchange.e.GetAccount);
                //转出货币
                if(current_exchange.account.Info.info.max_withdraw>0.1){
                    current_exchange.transfer_account(current_exchange.account.Info.info.underlying.toLowerCase(),current_exchange.account.Info.info.max_withdraw)  
                }
                MAX_POSITION_PROFITRATIO[current_currency] = 0;
            }

            table.push(
                [
                    current_currency,
                    _N(current_exchange.account.Balance,2),
                    current_exchange.position.position_type == 0 ? '多仓' : '空仓',
                    current_exchange.position.position_price,
                    current_exchange.ticker.Last,
                    current_exchange.position.position_liquidationPrice,
                    current_exchange.position.position_amount,
                    _N(current_exchange.position.position_posCost,4),
                    _N(current_exchange.position.position_profit,4),
                    _N(current_exchange.position.position_profitRatio,4),
                    MAX_POSITION_PROFITRATIO[current_currency],
                    Interval_type[current_currency],
                    aroon_up,
                    aroon_dn,
                    obv_arr[obv_arr.length-2],
                    obv_arr[obv_arr.length-20],
                    aroon_action
                ]
            );


            table_1.push([
                current_currency,
                Interval_type[current_currency],
                _D(Aroon_Record_History[current_currency].Time),
                Aroon_Record_History[current_currency].Close,
                current_record_2.Close,
                current_record_2.Time>Aroon_Record_History[current_currency].Time?_N(Math.abs(Aroon_Record_History[current_currency].Close-current_record_2.Close)/current_exchange.ticker.Last,4):null
            ]);

            Sleep(1000);
        })
        //更新状态栏表格信息
        update_table(table,table_1);
        Sleep(2000);
    }

    
}
```

> 策略出处

https://www.fmz.com/strategy/219781

> 更新时间

2020-10-14 15:48:57
