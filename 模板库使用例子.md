
> Name

模板库使用例子

> Author

Zero

> Strategy Description

模板库使用例子

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|OType|0|买或卖: 买|卖|
|Amount|0.5|下单量|


> Source (javascript)

``` javascript

function main() {
    Log(OType === 0 ? $.Buy(Amount) : $.Sell(Amount));
}
```

> Detail

https://www.fmz.com/strategy/10991

> Last Modified

2016-02-20 22:13:47
