
> 策略名称

coingecko_crawler

> 策略作者

linsilence



> 策略参数



|参数|默认值|描述|
|----|----|----|
|isDebug|false|debug|


> 源码 (javascript)

``` javascript
  

const URL_API = 'https://api.coingecko.com/api/v3/coins/markets';

$.Grab_Symbols_Marketcap = function (count) {
    const param = `vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false`;
    const ret = JSON.parse(HttpQuery(URL_API + '?' + param));
    if (isDebug) Log('grab_marketcap 1 ret: ', ret);

    let symbos = [];
    ret.forEach(e => {
        symbos.push(e.symbol.toUpperCase());
    });
    if (isDebug) Log('grab_marketcap 2 ret: ', symbos);
    return symbos;
};

function main() {
    const s = $.Grab_Symbols_Marketcap(4);
    Log(s);
}
```

> 策略出处

https://www.fmz.com/strategy/279269

> 更新时间

2021-05-08 20:58:24
