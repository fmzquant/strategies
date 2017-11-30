/*
策略出处: https://www.botvs.com/strategy/57333
策略名称: bitfinex保证金交易
策略作者: 7meter
策略描述:



*/

var bitfinexIndex = 0;
var basecurrency;
var quotecurrency;

function init(){
    for(var i = 0;i<exchanges.length;i++){
        if(exchanges[i].GetName() == "Bitfinex"){
            bitfinexIndex = i
        }
    }
    var st = exchanges[bitfinexIndex].GetCurrency().split("_")
    basecurrency = st[0]
    quotecurrency = st[1]
}

$.bitfinexSell = function(price, amount){
    var message = "symbol=" + basecurrency + quotecurrency + "&amount=" + amount.toString() + "&price=" + price.toString() + "&side=sell" + "&type=limit"
    id = exchanges[bitfinexIndex].IO("api", "POST", "/v1/order/new", message)
    return id.order_id
}

$.bitfinexBuy = function(price, amount){
    var message = "symbol=" + basecurrency + quotecurrency + "&amount=" + amount.toString() + "&price=" + price.toString() + "&side=buy" + "&type=fill-or-kill"
    var id = exchanges[bitfinexIndex].IO("api", "POST", "/v1/order/new", message)
    return id.order_id
}

$.bitfinexGetPosition = function(){
    var position = exchanges[bitfinexIndex].IO("api", "POST", "/v1/positions")
    return position
}

//返回margin钱包一共可以交易多少USD（虚拟币会换成美元加入计算）
$.marginBalance = function(){
    var balance = exchanges[bitfinexIndex].IO("api", "POST", "/v1/margin_infos")
    return balance[0].tradable_balance;
}
