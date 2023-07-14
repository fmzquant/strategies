
> Name

coingecko_crawler

> Author

linsilence



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|isDebug|false|debug|


> Source (javascript)

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

> Detail

https://www.fmz.com/strategy/279269

> Last Modified

2021-05-08 20:58:24
