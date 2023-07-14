
> Name

获取OK期货实时限价

> Author

数·狂

> Strategy Description

获取OK期货实时限价，仅实盘有效。
代码仅供学习，作者不保证程序正确性，据此交易后果自负。



> Source (javascript)

``` javascript
$.GetLimit = function(currStr, contract) {
    var url = "https://www.okcoin.com/api/v1/future_price_limit.do?symbol=" + currStr + "_usd&contract_type=" + contract;
    var httpResp = HttpQuery(url);
    if (httpResp.indexOf("false") != -1) return null;
    var parsedResp;
    try {
        parsedResp = JSON.parse(httpResp);
    } catch (e) {
        return null;
    }
    return parsedResp;
};

function main() {
    var limit = $.GetLimit('btc', 'quarter'); // 获取 比特币 季度 合约限价
    Log(limit.high, limit.low); // 最高买入、最低卖出限价
    limit = $.GetLimit('ltc', 'this_week'); // 获取 莱特币 当周 合约限价
    Log(limit.high, limit.low); // 最高买入、最低卖出限价
    limit = $.GetLimit('btc', 'next_week'); // 获取 比特币 次周 合约限价
    Log(limit.high, limit.low); // 最高买入、最低卖出限价
    
}
```

> Detail

https://www.fmz.com/strategy/17028

> Last Modified

2016-06-19 11:15:05
