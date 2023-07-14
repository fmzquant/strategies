
> Name

API-测试新手入门

> Author

Zero

> Strategy Description

新手入门学习模板

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|message|Hello|回显的信息|
|running|true|布尔值|
|maxNumber|111|回显数字|
|ListIdx|0|下拉框: 第一|第二|第三|
|cond|123|条件显示1|


> Source (javascript)

``` javascript
function main() {
    Log(exchange.GetAccount());
    Log(message, running, maxNumber);
    Log('ListIdx :', ListIdx);
    LogProfit(100.3);
    Log("这是红色字体颜色", "#ff0000");
    Log("我是带背景色的", "#ffffff223344");
    LogProfit(90, "我也带背景色", "#ffffff0000ff");
}
```

> Detail

https://www.fmz.com/strategy/4

> Last Modified

2019-03-19 21:09:24
