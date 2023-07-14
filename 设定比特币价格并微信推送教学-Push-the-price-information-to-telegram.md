
> Name

设定比特币价格并微信推送教学-Push-the-price-information-to-telegram

> Author

小草

> Strategy Description

教学策略：
当币价高于或低于设定值后，自动推送一条消息到微信。可设定最小推送间隔。

When the price of the currency is higher or lower than the set value, a message is automatically pushed to WeChat or telegram. The minimum push interval can be set.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|Currency|BTC_USDT|trading pair|
|UpPrice|5500|when price is higher than|
|LowPrice|5000|when price is lower than|
|Interval|10|interval|


> Source (javascript)

``` javascript
/*
This stragegy will sent a message to your telegram when the price is higher or lower than
the set price.
All stragegy must has a main function as the entrance.
*/
function main() {
     //change symbol,will cover the default exchange which was set when start a bot.Currency is a strategy arguments
    exchange.IO("currency", Currency)   
    var lastPushTime = 0    //the variable of last push timestamp.
    while(true){    //run a infinite loop, which is the basic structure
        var ticker = _C(exchange.GetTicker) // for information about GetTicker, check on https://fmz-docs.readthedocs.io/en/latest/code_Instruction/Market%20API.html#getticker
        if(ticker.Last > UpPrice || ticker.Last < LowPrice){    //ticker.Last represents the last deal price
            if(Date.now() - lastPushTime > 300*1000){    //only push once in 5 mins, Date.now() return ms.
                lastPushTime = Date.now()    //update lastPushTime
                Log(Currency, 'Price is: ', ticker.Last, '@')    //Log the price on the bot's page and sent the message. '@' in the end means push message
            }
        }
        Log(Currency, 'Price is: ', ticker.Last) //just log the price
        Sleep(Interval*1000)    //check the last price again after Interval seconds
    }
}
```

> Detail

https://www.fmz.com/strategy/125482

> Last Modified

2019-07-03 16:18:51
