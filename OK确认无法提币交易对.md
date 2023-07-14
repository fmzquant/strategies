
> Name

OK确认无法提币交易对

> Author

daniaoren

> Strategy Description

自用的，简单列出所有目前OKEX无法提现的币，有时候挺有用的，需要自取



> Source (javascript)

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

> Detail

https://www.fmz.com/strategy/253278

> Last Modified

2021-02-10 15:29:08
