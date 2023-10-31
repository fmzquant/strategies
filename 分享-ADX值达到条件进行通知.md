
> Name

分享-ADX值达到条件进行通知

> Author

作手君TradeMan

> Strategy Description

为回馈FMZ平台与社区，进行策略&代码&思路&模板的分享

简介：
调用ADX指标，达到一定条件进行FMZ通讯通知
可以顺序轮询多交易对

欢迎合作交流，共同学习进步~
v：haiyanyydss

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|P_interval_time|1000|轮询间隔(毫秒)|
|P_contract|quarter|合约|
|P_adx_len|50|ADX参数|
|P_adx_val|10|微信通知触发值（ADX大于此值）|


> Source (javascript)

``` javascript
/*backtest
start: 2020-01-01 00:00:00
end: 2021-02-02 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_OKCoin","currency":"ETH_USD"},{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["P_contract","quarter|quarter"],["P_contract_value","10|100"]]
*/

/*
为回馈FMZ平台与社区，进行策略&代码&思路&模板的分享

简介：
调用ADX指标，达到一定条件进行FMZ通讯通知
可以顺序轮询多交易对

欢迎合作交流，共同学习进步~
v：haiyanyydss
*/

function getPara(val, i){
    val = ""+val;
    var ret = val.split("|").length>i?val.split("|")[i]:val.split("|")[val.split("|").length-1];
    return ret.trim();
}

function Trade(e){
    this.e = e;
    this.last_alert_time = 0;
    this.ontick = function(){
        var records = _C(this.e.GetRecords);
        var last_record = records[records.length-1];
        var adx = talib.ADX(records, this.adx_len);
        if(this.last_alert_time < last_record.Time && adx[adx.length-1] > this.adx_val){
            this.last_alert_time = last_record.Time;
            Log(this.e.GetCurrency(), this.contract, "adx值超过"+this.adx_val , new Date(), "@");
        }
    }
}

function main() {
    LogReset();
    var tradeArr = [];
    for(var i in exchanges){
        var trade = new Trade(exchanges[i]);  
        trade.adx_len = 1*getPara(P_adx_len, i);
        trade.adx_val = 1*getPara(P_adx_val, i);
        trade.contract = getPara(P_contract, i);
        trade.e.SetContractType(trade.contract);
        tradeArr.push(trade)
    }
    
    while (true) {
        for(var i in tradeArr){
            Sleep(P_interval_time);
            tradeArr[i].ontick();
        }
    }
}

```

> Detail

https://www.fmz.com/strategy/396762

> Last Modified

2023-02-09 09:48:46
