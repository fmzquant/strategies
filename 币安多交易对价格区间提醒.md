
> Name

币安多交易对价格区间提醒

> Author

轻轻的云

> Strategy Description

因为Aicoin的IOS版不是会员，不能用了，没有价格提醒了，所以琢磨自己弄个。

但是对代码实在是不懂弄，就照着梦大的代码复制粘贴了一通， https://www.fmz.com/digest-topic/8512
我英文不好，所以上限下限我用的拼音，其他的英文都是复制梦大的。[呲牙]
感谢梦大[抱拳][握手]！！！

有知道还有什么APP可以像Aicoin那样提醒价格帮忙告诉小弟一下，谢谢。

这个默认是合约交易的，支持USDT BUSD。设置上限下限，最新价高于上限或者低于下限就会发送消息通知。
如果需要现货的，在参数中把【合约交易】的对勾去掉就可以了。然后添加交易所选择现货币安。
需要把FMZ绑定推送，我是绑定的QQ邮箱，然后QQ邮箱设置特殊提示音，同时绑定微信，就会有两次提醒了。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|B_sleeptime|30|轮询时间（秒）|
|symbols|ETH_BUSD,ETC_USDT,LTC_USDT|交易对|
|B_shangxian|3000,100,200|价格上限|
|B_xiaxian|2000,50,100|价格下限|
|B_heyue|true|合约交易|


> Source (javascript)

``` javascript
var arrSymbols = symbols.split(",")
var arrshangxian = B_shangxian.split(",")
var arrxiaxian = B_xiaxian.split(",")
var shang = parseFloat(arrshangxian[i])
var xia = parseFloat(arrxiaxian[i])

function main() {
    if (B_chongzhi) {
        LogReset()
        LogVacuum()
        Log("重置所有数据", "#FF0000")
    }
    while (true) {
        for (var i = 0; i < arrSymbols.length; i++) {
            var symbol = arrSymbols[i]
            if (B_heyue == true) {
                exchange.SetContractType("swap")
            }
            exchange.SetCurrency(symbol)
            var ticker = _C(exchange.GetTicker).Last
            Log("交易对：", symbol, "最新价：", ticker)
            if (ticker > shang || ticker < xia) {
                Log(symbol, "价格跳出区间，当前最新价格：", ticker, "#FF0000", "@")
            }
            Sleep(B_sleeptime * 1000)
        }
        Sleep(5 * 1000)

    }
}
```

> Detail

https://www.fmz.com/strategy/342165

> Last Modified

2022-04-21 22:45:14
