
> 策略名称

OK确认无法提币交易对

> 策略作者

daniaoren

> 策略描述

自用的，简单列出所有目前OKEX无法提现的币，有时候挺有用的，需要自取



> 源码 (javascript)

``` javascript
function main() {
    var results = exchange.IO("api", "GET", "/api/account/v3/currencies", "" , "");
    var blacklist = []
    i = 0;
    var statusMsg = '';
	while (true)
    {
        if (results[i]["can_withdraw"] == "0"){
            Log(results[i]["currency"],"|",results[i]["name"], results[i]["can_deposit"]);
            statusMsg += results[i]["currency"] + " | " + results[i]["name"] + ' ' + results[i]["can_deposit"] + '\n';
            blacklist.push(results[i]);
        }
        i++;
        if (i >= results.length){
        	break;
        }
    }
    Log(blacklist.length);
    statusMsg = blacklist.length + '\n' + statusMsg;
    LogStatus(statusMsg);
    return blacklist;

}
```

> 策略出处

https://www.fmz.com/strategy/253278

> 更新时间

2021-02-10 15:29:08
