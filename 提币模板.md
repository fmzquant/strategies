
> Name

提币模板

> Author

不想努力了





> Source (javascript)

``` javascript


//checked
$.withdraw = function(e, currency, address, amount, fee, password) {
    var withdraw_id = null;
    var ret = null;
    var status = false;
    currency = currency.toLowerCase()
    switch (e.GetName()) {
        case "OKCoin_EN":
            ret = e.IO("api", "POST", "/api/v1/withdraw.do", "symbol="+currency.toLowerCase()+"_usd&chargefee=" + fee + "&trade_pwd=" + password + "&withdraw_address=" + address + "&withdraw_amount=" + amount);
            if (ret && typeof(ret.withdraw_id) !== 'undefined') {
                withdraw_id = ret.withdraw_id;
                status = true;
            } else {
                var err = GetLastError();
                if (err && err.indexOf('10031') !== -1) {
                    Log("OKCoin_EN 需6个网络确认后方能提现");
                }
            }
            break;
        case "Huobi":
            if (currency == "bch") {
                currency = "bcc"
            }
            var chain = currency;
            if (currency == 'usdt') {
                chain = 'trc20usdt';
            }
            ret = e.IO("api", "POST", "/v1/dw/withdraw/api/create", "currency="+currency+"&fee=" + fee + "&address=" + address + "&amount=" + amount + "&chain=" + chain);
            if (ret && typeof(ret.data) !== 'undefined') {
                withdraw_id = ret.data;
                status = true;
            }
            break;
        case "Bithumb":
            ret = e.IO("api", "POST", "/trade/btc_withdrawal", "currency="+currency.toUpperCase()+"&address=" + address + "&units=" + amount);
            if (ret && parseInt(ret.status) == 0) {
                withdraw_id = 9999;
                status = true;
            }
            break;
        case "GateIO":
            ret = e.IO("api", "POST", "/api2/1/private/withdraw", "currency="+currency+"&address=" + address + "&amount=" + amount);
            if (ret && parseInt(ret.code) == 0) {
                withdraw_id = 'w' + ret.withdrawid;
                status = true;
            }
            break;
        case "ZB":
            ret = e.IO("api", "POST", "/api/withdraw", "method=withdraw&itransfer=0&currency="+currency+"&receiveAddr=" + address + "&amount=" + amount+"&fees="+fee+"&safePwd="+password);
            if (ret && parseInt(ret.code) == 0) {
                withdraw_id = ret.id;
                status = true;
            }
            break;
        case "Bitfinex":
            var cMap = {
                "btc": "bitcoin",
                "ltc": "litecoin",
                "eth": "ethereum",
                "etc": "ethereumc",
                "zec": "zcash",
                "xmr": "monero",
                "omni": "mastercoin",
                "usd": "wire",
                "dash": "dash",
                "xrp": "ripple",
                "eos": "eos"};
            if (typeof(cMap[currency]) == 'undefined') {
                throw "bitfinex not support " + currency;
            }
            var withdraw_type = cMap[currency];
            ret = e.IO("api", "POST", "/v1/withdraw", "withdraw_type=" + withdraw_type + "&walletselected=exchange&address=" + address + "&amount='" + amount + "'");
            if (ret && ret.length == 1 && typeof(ret[0].withdrawal_id) !== 'undefined') {
                withdraw_id = ret[0].withdrawal_id;
                status = true;
            }
            break;
        case "Poloniex":
            var ext = "";
            if (currency == 'xrp') {
                //ext = '&paymentId=' + PXRPLabel;
            }
            if (currency.toLowerCase() == 'bts' && address.indexOf('_') == -1) {
                address = "poloniexwallet_" + address;
            }
            ret = e.IO("api", "POST", "withdraw", "amount=" + amount + "&currency="+currency.toUpperCase()+"&address=" + address+ext);
            if (ret && ret.response.indexOf('With') !== -1) {
                withdraw_id = 9999;
                status = true;
            }
            break
        case "Bittrex":
            ret = e.IO("api", "GET", "/api/v1.1/account/withdraw", "quantity=" + amount + "&currency="+currency.toUpperCase()+"&address=" + address);
            if (ret && ret.success) {
                withdraw_id = ret.result.uuid;
                status = true;
            }
            break
        case "Binance":
            ret = e.IO("api", "POST", "/wapi/v1/withdraw.html", "amount=" + amount + "&asset=" + currency + "&address=" + address);
            if (ret && ret.success) {
                withdraw_id = 9999;
                status = true;
            }
            break
        case "OKEX":
            ret = e.IO("api", "POST", "/api/v1/withdraw.do", "target=address&withdraw_amount=" + amount + "&symbol="+currency+"_usd&withdraw_address=" + address+"&chargefee="+fee+"&trade_pwd="+password);
            if (ret && ret.result) {
                withdraw_id = ret.withdraw_id;
                status = true;
            }
            break
        case "KuCoin":
        
            ret = e.IO();
        default:
            throw "不支持的操作";
    }
    return {info: ret, withdraw_id: withdraw_id, 'timestamp' : new Date().getTime(), 'status' : status}
}
$.CheckWithdrawStatusHB = function (e, currency ,id, start) {
    //HB
    var status = false;
    var ret = null;
    var txid = null;
    currency = currency.toLowerCase();
    ret = e.IO("api", "GET", "/v1/query/deposit-withdraw", "currency="+currency+"&type=" + 'withdraw' + "&size=" + 1 + "&direct=" + 'next');
    if (ret && typeof(ret.data) !== 'undefined') {

        if (id == ret.data[0].id) {
            status = ret.data[0].state == 'confirmed' ? true : false;
            txid = ret.data[0]['tx-hash'];
        }
    }
    return {info: ret, 'status': status, 'txid' : txid}
}
//checked
$.CheckWithdrawStatusGT = function (e,currency, id, start) {
    //GT
    ///v1/query/deposit-withdraw
    var status = false;
    var ret = null;
    var txid = null;
    currency = currency.toLowerCase()
    ret = e.IO("api", "POST", "/api2/1/private/depositsWithdrawals", "start="+_N(start/1000, 0)+"&end=" + new Date().getTime());
    if (ret && ret.result == 'true' && ret.withdraws.length > 0) {
        var withdraws = ret.withdraws;
        withdraws.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
        Log(withdraws[0])
        if (currency == withdraws[0].currency.toLowerCase() && withdraws[0].id == id) {
            status = withdraws[0].status == 'DONE' ? true : false;
            txid = withdraws[0].txid;
        }

    }

    return {info: ret, 'status': status, 'txid' : txid}
}
$.CheckDepositStatusHB = function (e,currency, txid, start) {
    //火币
    ///v1/query/deposit-withdraw
    var status = false;
    var ret = null;
    currency = currency.toLowerCase()    
    ret = e.IO("api", "GET", "/v1/query/deposit-withdraw", "currency="+currency+"&type=" + 'deposit' + "&size=" + 1 + "&direct=" + 'next');
    if (ret && typeof(ret.data) !== 'undefined') {
        if (txid == ret.data[0]["tx-hash"] || '0x'+txid == ret.data[0]["tx-hash"] || txid.slice(2, txid.length) == ret.data[0]["tx-hash"]) {
            status = ret.data[0].state == 'safe' ? true : false;
        }
    }
    return {info: ret, 'status': status}
}

//checked
$.CheckDepositStatusGT = function (e,currency, txid, start) {
    var status = false;
    var ret = null;
    currency = currency.toLowerCase()   
    // POST: https://api.gateio.life/api2/1/private/depositsWithdrawals
    ret = e.IO("api", "POST", "/api2/1/private/depositsWithdrawals", "start="+_N(start/1000, 0)+"&end=" + new Date().getTime());
    if (ret && ret.result == 'true' && ret.deposits.length > 0) {
        var deposit = ret.deposits;
        deposit.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
        Log(txid == deposit[0].txid || '0x'+txid == deposit[0].txid || txid.slice(2, txid.length) == deposit[0].txid)
        if (txid == deposit[0].txid || '0x'+txid == deposit[0].txid || txid.slice(2, txid.length) == deposit[0].txid) {
            status = deposit[0].status == 'DONE' ? true : false;
        }
    }
    return {info: ret, 'status': status}
}

$.GetWithdrawFeesLAMBHB = function (e, currency) {
    //api
    ///v2/reference/currencies
    //火币
    var fee = 0;
    var ret = null;
    currency = currency.toLowerCase()    
    ret = e.IO("api", "GET", "/v2/reference/currencies", "currency="+currency);
    if (ret && typeof(ret.data) !== 'undefined') {
            fee = ret.data[0]['chains'][0].transactFeeWithdraw;
    }
    return fee;
}
var addressUSDTHB = 'TBBGs4d41RLUqgbGDgbdVkc7JTWSiCcJK3';

function main() {
    var dataGT_HB = $.withdraw(exchanges[0], 'usdt',addressUSDTHB , 570, 0, '713858');
    Log(dataGT_HB)
}
```

> Detail

https://www.fmz.com/strategy/185887

> Last Modified

2020-02-22 09:29:56
