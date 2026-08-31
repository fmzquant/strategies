
> Name

Binance-Account-Universal-Transfer-Tool

> Author

wenzhang.





> Source (javascript)

``` javascript
function userUniversalTransfer(type, amount) {
    let ret = null;
    const param =
      "type=" +
      type +
      "&asset=USDT" +
      "&amount=" +
      amount.toString() +
      "&timestamp=" +
      new Date().getTime().toString();

    exchange.SetBase("https://api.binance.com");
    ret = exchange.IO("api", "POST", "/sapi/v1/asset/transfer", param);
    exchange.SetBase("https://fapi.binance.com");

    if (ret) {
      switch (type) {
        case "MAIN_UMFUTURE":
          Log(`已将 ${amount.toFixed(3)} USDT 从现货钱包划至U本位合约钱包`);
          break;

        case "UMFUTURE_MAIN":
          Log(`已将 ${amount.toFixed(3)} USDT 从U本位合约钱包划至现货钱包`);
          break;
      }
    } else {
      Log("资金划转失败！");
    }
  }
```

> Detail

https://www.fmz.com/strategy/446356

> Last Modified

2024-03-28 00:17:46
