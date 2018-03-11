/*
策略出处: https://www.botvs.com/strategy/62140
策略名称: 数字货币现货交易类库c++
策略作者: 小小梦
策略描述:

使用了botvs最新支持的c++编写策略，如果使用有问题，欢迎在下面留言，我会经常来巡逻的！
如果托管者在2017年12月之后没有更新，请更新下托管者


参数              默认值  描述
----------  -------  -----------------------
OpMode        0      下单方式: 吃单|挂单
MaxSpace      0.5    挂单失效距离
SlidePrice    0.1    下单滑动价(元)
MaxAmount     0.8    开仓最大单次下单量
RetryDelay  500      失败重试(毫秒)
MAType        0      均线算法: EMA|MA|AMA(自适应均线)
MinStock      0.001  最小交易量
*/

#include <math.h>
#include <string>
#include <cctype>  
#include <algorithm>

using namespace std;
double min(double a, double b, double c){
    double d = a < b ? a : b;
    return d < c ? d : c;
}

struct withdraw_ret{
    json ret;
    string withdraw_id;
};

withdraw_ret withdraw (Exchange &e, string &currency, string &address,string &amount, string &fee, string &password){
    string withdraw_id;
    json ret;
    transform(currency.begin(), currency.end(), currency.begin(),::tolower);
    if(e.GetName() == "OKCoin_EN"){
        ret = e.IO("api", "POST", "/api/v1/withdraw.do", "symbol="+currency+"_usd&chargefee=" + fee + "&trade_pwd=" + password + "&withdraw_address=" + address + "&withdraw_amount=" + amount);
        if (!ret.is_null() && !ret.is_boolean() && !(ret["withdraw_id"].is_null())) {
            withdraw_id = ret["withdraw_id"];
        } else {
            string err = GetLastError();
            if (!err.empty() && err.find("10031") != -1) {
                Log("OKCoin_EN 需6个网络确认后方能提现");
            }
        }
    } else if(e.GetName() == "Huobi"){
        if (currency == "bch") {
            currency = "bcc";
        }
        ret = e.IO("api", "POST", "/v1/dw/withdraw-virtual/create", "currency="+currency+"&fee=" + fee + "&address=" + address + "&amount=" + amount);
        if (!ret.is_null() && !ret.is_boolean() && !ret["withdraw_id"].is_null()) {
            withdraw_id = ret["data"];
        }
    } else if(e.GetName() == "Bithumb"){
        string cu;
        transform(currency.begin(), currency.end(), cu.begin(),::toupper);
        ret = e.IO("api", "POST", "/trade/btc_withdrawal", "currency="+cu+"&address=" + address + "&units=" + amount);
        if (!ret.is_null() && !ret.is_boolean() && ret["status"].get<string>() == "0") {
            withdraw_id = "9999";
        }
    } else if(e.GetName() == "GateIO"){
        ret = e.IO("api", "POST", "/api2/1/private/withdraw", "currency="+currency+"&address=" + address + "&amount=" + amount);
        if (!ret.is_null() && !ret.is_boolean() && ret["code"].get<string>() == "0") {
            withdraw_id = "9999";
        }
    } else if(e.GetName() == "ZB"){
        ret = e.IO("api", "POST", "/api/withdraw", "method=withdraw&itransfer=0&currency="+currency+"&receiveAddr=" + address + "&amount=" + amount+"&fees="+fee+"&safePwd="+password);
        if (!ret.is_null() && !ret.is_boolean() && ret["code"].get<string>() == "0") {
            withdraw_id = ret["id"];
        }
    } else if(e.GetName() == "Bitfinex"){
        vector<string> cMap = {"btc","ltc","eth","zec","etc","xmr","omni","usd","dash","xrp","eos"};
        vector<string> cMap2 = {"bitcoin","litecoin","litecoin","ethereum","ethereumc","zcash","monero","mastercoin","wire","dash","ripple","eos"};
        int cMap_index = -1;
        for(int i = 0;i<cMap.size();i++){
            if(cMap[i] == currency){
                cMap_index = i;
                break;
            }
        }
        Log(cMap_index);
        if(cMap_index == -1){
            Log("bitfinex not support ");
            return {ret, withdraw_id};
        }
        string withdraw_type = cMap2[cMap_index];
        ret = e.IO("api", "POST", "/v1/withdraw", "withdraw_type=" + withdraw_type + "&walletselected=exchange&address=" + address + "&amount=" + amount);
        if (!(ret.is_null()) && !ret.is_boolean() && ret.size() == 1) {
            withdraw_id = ret[0]["withdrawal_id"];
        }
    } else if(e.GetName() == "Poloniex"){
        string ext = "";
        if (currency == "bts" && address.find("_") == -1) {
            address = "poloniexwallet_" + address;
        }
        ret = e.IO("api", "POST", "withdraw", "amount=" + amount + "&currency="+currency+"&address=" + address+ext);
        if (!ret.is_null() && !ret.is_boolean()) {
            string s = ret["response"];
            if(s.find("with") != -1){
                withdraw_id = "9999";
            }
        }
    } else if(e.GetName() == "Bittrex"){
        string cu;
        transform(currency.begin(), currency.end(), cu.begin(),::toupper);
        ret = e.IO("api", "GET", "/api/v1.1/account/withdraw", "quantity=" + amount + "&currency="+cu+"&address=" + address);
        if (!ret.is_null() && !ret.is_boolean() && ret["success"].get<string>() == "true") {
            withdraw_id = ret["result"]["uuid"];
        }
    } else if(e.GetName() == "Binance"){
        ret = e.IO("api", "POST", "/wapi/v1/withdraw.html", "amount=" + amount + "&asset=" + currency + "&address=" + address);
        if (!ret.is_null() && !ret.is_boolean() && ret["success"].get<string>() == "true") {
            withdraw_id = "9999";
        }
    } else if("OKEX"){
        ret = e.IO("api", "POST", "/api/v1/withdraw.do", "target=address&withdraw_amount=" + amount + "&symbol="+currency+"_usd&withdraw_address=" + address+"&chargefee="+fee+"&trade_pwd="+password);
        if (!ret.is_null() && !ret.is_boolean() && ret["result"].get<string>() == "true") {
            withdraw_id = ret["withdraw_id"];
        }
    } else{
        throw("不支持的操作");
    }
    return {ret, withdraw_id};
}

void CancelPendingOrders(Exchange &e,size_t orderType){
    while(true){
        auto orders = e.GetOrders();
        if(orders.size() <= 0){
            Sleep(RetryDelay);
            continue;
        }
        size_t processed = 0;
        for(size_t j = 0;j < orders.size();j++){
            if(typeid(orderType) == typeid(size_t) && orders[j].Type != orderType){
                continue;
            }
            e.CancelOrder(orders[j].Id, orders[j]);
            processed++;
            if (j < (orders.size() - 1)) {
                Sleep(RetryDelay);
            }
        }
        if (processed == 0) {
            break;
        }
    }
}

Account GetAccount(Exchange &e, bool waitFrozen = false){
    Account account;
    bool alreadyAlert = false;
    while(true){
        account = _C(e.GetAccount);
        if (!waitFrozen || (account.FrozenStocks < MinStock && account.FrozenBalance < 0.01)) {
            break;
        }
        if (!alreadyAlert) {
            alreadyAlert = true;
            Log("发现账户有冻结的钱或币", account);
        }
        Sleep(RetryDelay);
    }
    return account;
}

Order StripOrders(Exchange &e, TId &orderId){
    Order order;
    while(true){
        size_t dropped = 0;
        auto orders = _C(e.GetOrders);
        for(size_t i = 0; i < orders.size(); i++){
            if (orders[i].Id.s == orderId.s) {
                order = orders[i];
            } else{
                string extra;
                if (orders[i].DealAmount > 0) {
                    extra = "成交: " + to_string(orders[i].DealAmount);
                } else{
                    extra = "未成交";
                }
                e.CancelOrder(orders[i].Id, orders[i].Type == ORDER_TYPE_BUY ? "买单" : "卖单", extra);
                dropped++;
            }
        }
        if(dropped == 0){
            break;
        }
        Sleep(RetryDelay);
    }
    return order;
}

MarketOrder Trade(Exchange &e,size_t tradeType,double tradeAmount,size_t mode,double slidePrice,double maxAmount,double maxSpace,size_t retryDelay) {
    auto initAccount = GetAccount(e, true);
    auto nowAccount = initAccount;
    TId orderId;
    double prePrice = 0;
    double dealAmount = 0;
    double diffMoney = 0;
    bool isFirst = true;
    //0为买，1为卖
    size_t tradeFunc = tradeType == ORDER_TYPE_BUY ? 0 : 1;
    bool isBuy = tradeType == ORDER_TYPE_BUY;
    while(true){
        auto ticker = _C(e.GetTicker);
        double tradePrice = 0.0;
        if(isBuy){
            tradePrice = _N((mode == 0 ? ticker.Sell : ticker.Buy) + slidePrice, 4);
        } else{
            tradePrice = _N((mode == 0 ? ticker.Buy : ticker.Sell) - slidePrice, 4);
        }
        if(orderId.Valid){
            if (isFirst) {
                isFirst = false;
            } else {
                nowAccount = GetAccount(e, true);
            }
            double doAmount = 0.0;
            if (isBuy) {
                diffMoney = _N(initAccount.Balance - nowAccount.Balance, 4);
                dealAmount = _N(nowAccount.Stocks - initAccount.Stocks, 4);
                doAmount = min(maxAmount, tradeAmount - dealAmount, _N((nowAccount.Balance - 10) / tradePrice, 4));
            } else{
                diffMoney = _N(nowAccount.Balance - initAccount.Balance, 4);
                dealAmount = _N(initAccount.Stocks - nowAccount.Stocks, 4);
                doAmount = min(maxAmount, tradeAmount - dealAmount, nowAccount.Stocks);
            }
            if (doAmount < MinStock) {
                break;
            }
            prePrice = tradePrice;
            if(tradeFunc == 0){
                orderId = e.Buy(tradePrice, doAmount, ticker);
            } else {
                orderId = e.Sell(tradePrice, doAmount, ticker);
            }
            if (!orderId) {
                CancelPendingOrders(e, tradeType);
            }
        } else{
            if (mode == 0 || (abs(tradePrice - prePrice) > maxSpace)) {
                orderId.Valid = false;
            }
            auto order = StripOrders(e, orderId);
            if (order.is_null()) {
                orderId.Valid = false;
            }
        }
        Sleep(retryDelay);
    }
    if (dealAmount <= 0) {
        MarketOrder ret;
        return ret;
    }
    return { _N(diffMoney / dealAmount, 4), dealAmount };
}

MarketOrder Buy(Exchange &e, double amount){
    return Trade(e, ORDER_TYPE_BUY, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
}

MarketOrder Buy(double e, double amount){
    amount = e;
    return Trade(exchange, ORDER_TYPE_BUY, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
}

MarketOrder Sell(Exchange &e,double amount) {
    return Trade(e, ORDER_TYPE_SELL, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
}

MarketOrder Sell(double e,double amount) {
    amount = e;
    return Trade(exchange, ORDER_TYPE_SELL, amount, OpMode, SlidePrice, MaxAmount, MaxSpace, RetryDelay);
}

size_t Cross(size_t a, size_t b){
    size_t crossNum = 0;
    vector<double> arr1;
    vector<double> arr2;
    Records records;
    while (true) {
        records = _C(exchange.GetRecords);
        if (records.size() > a && records.size() > b) {
            break;
        }
        Sleep(RetryDelay);
    }
    if(MAType == 0){
        arr1 = TA.EMA(records, a);
        arr2 = TA.EMA(records, b);
    } else if(MAType == 1){
        arr1 = TA.MA(records, a);
        arr2 = TA.MA(records, b);
    } else{
        arr1 = talib.KAMA(records, a);
        arr2 = talib.KAMA(records, b);
    }
    if(sizeof(arr1) != sizeof(arr2)){
        Log("array length not equal");
        throw("array length not equal");
    }
    crossNum = _Cross(arr1, arr2);
    return crossNum;
}

void main(){
    auto i = exchange.IO("api", "GET", "/v1/pubticker/btcusd", "");
    Log(i["bid"]);
    
}
